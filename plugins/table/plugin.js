/**
 * TinyMCE version 8.11.0 (2026-11-25)
 */

(function () {
    'use strict';

    var global$3 = tinymce.util.Tools.resolve('tinymce.PluginManager');

    /* eslint-disable @typescript-eslint/no-wrapper-object-types */
    const getPrototypeOf = Object.getPrototypeOf;
    const hasProto = (v, constructor, predicate) => {
        if (predicate(v, constructor.prototype)) {
            return true;
        }
        else {
            // String-based fallback time
            return v.constructor?.name === constructor.name;
        }
    };
    const typeOf = (x) => {
        const t = typeof x;
        if (x === null) {
            return 'null';
        }
        else if (t === 'object' && Array.isArray(x)) {
            return 'array';
        }
        else if (t === 'object' && hasProto(x, String, (o, proto) => proto.isPrototypeOf(o))) {
            return 'string';
        }
        else {
            return t;
        }
    };
    const isType$1 = (type) => (value) => typeOf(value) === type;
    const isSimpleType = (type) => (value) => typeof value === type;
    const eq$1 = (t) => (a) => t === a;
    const is$3 = (value, constructor) => isObject(value) && hasProto(value, constructor, (o, proto) => getPrototypeOf(o) === proto);
    const isString = isType$1('string');
    const isObject = isType$1('object');
    const isPlainObject = (value) => is$3(value, Object);
    const isArray = isType$1('array');
    const isBoolean = isSimpleType('boolean');
    const isUndefined = eq$1(undefined);
    const isNullable = (a) => a === null || a === undefined;
    const isNonNullable = (a) => !isNullable(a);
    const isFunction = isSimpleType('function');
    const isNumber = isSimpleType('number');

    const noop = () => { };
    /** Compose two unary functions. Similar to compose, but avoids using Function.prototype.apply. */
    const compose1 = (fbc, fab) => (a) => fbc(fab(a));
    const constant = (value) => {
        return () => {
            return value;
        };
    };
    const identity = (x) => {
        return x;
    };
    const tripleEquals = (a, b) => {
        return a === b;
    };
    function curry(fn, ...initialArgs) {
        return (...restArgs) => {
            const all = initialArgs.concat(restArgs);
            return fn.apply(null, all);
        };
    }
    const not = (f) => (t) => !f(t);
    const call = (f) => {
        f();
    };
    const never = constant(false);
    const always = constant(true);

    /**
     * The `Optional` type represents a value (of any type) that potentially does
     * not exist. Any `Optional<T>` can either be a `Some<T>` (in which case the
     * value does exist) or a `None` (in which case the value does not exist). This
     * module defines a whole lot of FP-inspired utility functions for dealing with
     * `Optional` objects.
     *
     * Comparison with null or undefined:
     * - We don't get fancy null coalescing operators with `Optional`
     * - We do get fancy helper functions with `Optional`
     * - `Optional` support nesting, and allow for the type to still be nullable (or
     * another `Optional`)
     * - There is no option to turn off strict-optional-checks like there is for
     * strict-null-checks
     */
    class Optional {
        tag;
        value;
        // Sneaky optimisation: every instance of Optional.none is identical, so just
        // reuse the same object
        static singletonNone = new Optional(false);
        // The internal representation has a `tag` and a `value`, but both are
        // private: able to be console.logged, but not able to be accessed by code
        constructor(tag, value) {
            this.tag = tag;
            this.value = value;
        }
        // --- Identities ---
        /**
         * Creates a new `Optional<T>` that **does** contain a value.
         */
        static some(value) {
            return new Optional(true, value);
        }
        /**
         * Create a new `Optional<T>` that **does not** contain a value. `T` can be
         * any type because we don't actually have a `T`.
         */
        static none() {
            return Optional.singletonNone;
        }
        /**
         * Perform a transform on an `Optional` type. Regardless of whether this
         * `Optional` contains a value or not, `fold` will return a value of type `U`.
         * If this `Optional` does not contain a value, the `U` will be created by
         * calling `onNone`. If this `Optional` does contain a value, the `U` will be
         * created by calling `onSome`.
         *
         * For the FP enthusiasts in the room, this function:
         * 1. Could be used to implement all of the functions below
         * 2. Forms a catamorphism
         */
        fold(onNone, onSome) {
            if (this.tag) {
                return onSome(this.value);
            }
            else {
                return onNone();
            }
        }
        /**
         * Determine if this `Optional` object contains a value.
         */
        isSome() {
            return this.tag;
        }
        /**
         * Determine if this `Optional` object **does not** contain a value.
         */
        isNone() {
            return !this.tag;
        }
        // --- Functor (name stolen from Haskell / maths) ---
        /**
         * Perform a transform on an `Optional` object, **if** there is a value. If
         * you provide a function to turn a T into a U, this is the function you use
         * to turn an `Optional<T>` into an `Optional<U>`. If this **does** contain
         * a value then the output will also contain a value (that value being the
         * output of `mapper(this.value)`), and if this **does not** contain a value
         * then neither will the output.
         */
        map(mapper) {
            if (this.tag) {
                return Optional.some(mapper(this.value));
            }
            else {
                return Optional.none();
            }
        }
        // --- Monad (name stolen from Haskell / maths) ---
        /**
         * Perform a transform on an `Optional` object, **if** there is a value.
         * Unlike `map`, here the transform itself also returns an `Optional`.
         */
        bind(binder) {
            if (this.tag) {
                return binder(this.value);
            }
            else {
                return Optional.none();
            }
        }
        // --- Traversable (name stolen from Haskell / maths) ---
        /**
         * For a given predicate, this function finds out if there **exists** a value
         * inside this `Optional` object that meets the predicate. In practice, this
         * means that for `Optional`s that do not contain a value it returns false (as
         * no predicate-meeting value exists).
         */
        exists(predicate) {
            return this.tag && predicate(this.value);
        }
        /**
         * For a given predicate, this function finds out if **all** the values inside
         * this `Optional` object meet the predicate. In practice, this means that
         * for `Optional`s that do not contain a value it returns true (as all 0
         * objects do meet the predicate).
         */
        forall(predicate) {
            return !this.tag || predicate(this.value);
        }
        filter(predicate) {
            if (!this.tag || predicate(this.value)) {
                return this;
            }
            else {
                return Optional.none();
            }
        }
        // --- Getters ---
        /**
         * Get the value out of the inside of the `Optional` object, using a default
         * `replacement` value if the provided `Optional` object does not contain a
         * value.
         */
        getOr(replacement) {
            return this.tag ? this.value : replacement;
        }
        /**
         * Get the value out of the inside of the `Optional` object, using a default
         * `replacement` value if the provided `Optional` object does not contain a
         * value.  Unlike `getOr`, in this method the `replacement` object is also
         * `Optional` - meaning that this method will always return an `Optional`.
         */
        or(replacement) {
            return this.tag ? this : replacement;
        }
        /**
         * Get the value out of the inside of the `Optional` object, using a default
         * `replacement` value if the provided `Optional` object does not contain a
         * value. Unlike `getOr`, in this method the `replacement` value is
         * "thunked" - that is to say that you don't pass a value to `getOrThunk`, you
         * pass a function which (if called) will **return** the `value` you want to
         * use.
         */
        getOrThunk(thunk) {
            return this.tag ? this.value : thunk();
        }
        /**
         * Get the value out of the inside of the `Optional` object, using a default
         * `replacement` value if the provided Optional object does not contain a
         * value.
         *
         * Unlike `or`, in this method the `replacement` value is "thunked" - that is
         * to say that you don't pass a value to `orThunk`, you pass a function which
         * (if called) will **return** the `value` you want to use.
         *
         * Unlike `getOrThunk`, in this method the `replacement` value is also
         * `Optional`, meaning that this method will always return an `Optional`.
         */
        orThunk(thunk) {
            return this.tag ? this : thunk();
        }
        /**
         * Get the value out of the inside of the `Optional` object, throwing an
         * exception if the provided `Optional` object does not contain a value.
         *
         * WARNING:
         * You should only be using this function if you know that the `Optional`
         * object **is not** empty (otherwise you're throwing exceptions in production
         * code, which is bad).
         *
         * In tests this is more acceptable.
         *
         * Prefer other methods to this, such as `.each`.
         */
        getOrDie(message) {
            if (!this.tag) {
                throw new Error(message ?? 'Called getOrDie on None');
            }
            else {
                return this.value;
            }
        }
        // --- Interop with null and undefined ---
        /**
         * Creates an `Optional` value from a nullable (or undefined-able) input.
         * Null, or undefined, is converted to `None`, and anything else is converted
         * to `Some`.
         */
        static from(value) {
            return isNonNullable(value) ? Optional.some(value) : Optional.none();
        }
        /**
         * Converts an `Optional` to a nullable type, by getting the value if it
         * exists, or returning `null` if it does not.
         */
        getOrNull() {
            return this.tag ? this.value : null;
        }
        /**
         * Converts an `Optional` to an undefined-able type, by getting the value if
         * it exists, or returning `undefined` if it does not.
         */
        getOrUndefined() {
            return this.value;
        }
        // --- Utilities ---
        /**
         * If the `Optional` contains a value, perform an action on that value.
         * Unlike the rest of the methods on this type, `.each` has side-effects. If
         * you want to transform an `Optional<T>` **into** something, then this is not
         * the method for you. If you want to use an `Optional<T>` to **do**
         * something, then this is the method for you - provided you're okay with not
         * doing anything in the case where the `Optional` doesn't have a value inside
         * it. If you're not sure whether your use-case fits into transforming
         * **into** something or **doing** something, check whether it has a return
         * value. If it does, you should be performing a transform.
         */
        each(worker) {
            if (this.tag) {
                worker(this.value);
            }
        }
        /**
         * Turn the `Optional` object into an array that contains all of the values
         * stored inside the `Optional`. In practice, this means the output will have
         * either 0 or 1 elements.
         */
        toArray() {
            return this.tag ? [this.value] : [];
        }
        /**
         * Turn the `Optional` object into a string for debugging or printing. Not
         * recommended for production code, but good for debugging. Also note that
         * these days an `Optional` object can be logged to the console directly, and
         * its inner value (if it exists) will be visible.
         */
        toString() {
            return this.tag ? `some(${this.value})` : 'none()';
        }
    }

    const nativeSlice = Array.prototype.slice;
    const nativeIndexOf = Array.prototype.indexOf;
    const nativePush = Array.prototype.push;
    const rawIndexOf = (ts, t) => nativeIndexOf.call(ts, t);
    const contains$1 = (xs, x) => rawIndexOf(xs, x) > -1;
    const exists = (xs, pred) => {
        for (let i = 0, len = xs.length; i < len; i++) {
            const x = xs[i];
            if (pred(x, i)) {
                return true;
            }
        }
        return false;
    };
    const range = (num, f) => {
        const r = [];
        for (let i = 0; i < num; i++) {
            r.push(f(i));
        }
        return r;
    };
    const map = (xs, f) => {
        // pre-allocating array size when it's guaranteed to be known
        // http://jsperf.com/push-allocated-vs-dynamic/22
        const len = xs.length;
        const r = new Array(len);
        for (let i = 0; i < len; i++) {
            const x = xs[i];
            r[i] = f(x, i);
        }
        return r;
    };
    // Unwound implementing other functions in terms of each.
    // The code size is roughly the same, and it should allow for better optimisation.
    // const each = function<T, U>(xs: T[], f: (x: T, i?: number, xs?: T[]) => void): void {
    const each$1 = (xs, f) => {
        for (let i = 0, len = xs.length; i < len; i++) {
            const x = xs[i];
            f(x, i);
        }
    };
    const eachr = (xs, f) => {
        for (let i = xs.length - 1; i >= 0; i--) {
            const x = xs[i];
            f(x, i);
        }
    };
    const partition = (xs, pred) => {
        const pass = [];
        const fail = [];
        for (let i = 0, len = xs.length; i < len; i++) {
            const x = xs[i];
            const arr = pred(x, i) ? pass : fail;
            arr.push(x);
        }
        return { pass, fail };
    };
    const filter$1 = (xs, pred) => {
        const r = [];
        for (let i = 0, len = xs.length; i < len; i++) {
            const x = xs[i];
            if (pred(x, i)) {
                r.push(x);
            }
        }
        return r;
    };
    const foldr = (xs, f, acc) => {
        eachr(xs, (x, i) => {
            acc = f(acc, x, i);
        });
        return acc;
    };
    const foldl = (xs, f, acc) => {
        each$1(xs, (x, i) => {
            acc = f(acc, x, i);
        });
        return acc;
    };
    const findUntil = (xs, pred, until) => {
        for (let i = 0, len = xs.length; i < len; i++) {
            const x = xs[i];
            if (pred(x, i)) {
                return Optional.some(x);
            }
            else if (until(x, i)) {
                break;
            }
        }
        return Optional.none();
    };
    const find$1 = (xs, pred) => {
        return findUntil(xs, pred, never);
    };
    const flatten$1 = (xs) => {
        // Note, this is possible because push supports multiple arguments:
        // http://jsperf.com/concat-push/6
        // Note that in the past, concat() would silently work (very slowly) for array-like objects.
        // With this change it will throw an error.
        const r = [];
        for (let i = 0, len = xs.length; i < len; ++i) {
            // Ensure that each value is an array itself
            if (!isArray(xs[i])) {
                throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
            }
            nativePush.apply(r, xs[i]);
        }
        return r;
    };
    const bind = (xs, f) => flatten$1(map(xs, f));
    const forall = (xs, pred) => {
        for (let i = 0, len = xs.length; i < len; ++i) {
            const x = xs[i];
            if (pred(x, i) !== true) {
                return false;
            }
        }
        return true;
    };
    const reverse = (xs) => {
        const r = nativeSlice.call(xs, 0);
        r.reverse();
        return r;
    };
    const mapToObject = (xs, f) => {
        const r = {};
        for (let i = 0, len = xs.length; i < len; i++) {
            const x = xs[i];
            r[String(x)] = f(x, i);
        }
        return r;
    };
    const get$5 = (xs, i) => i >= 0 && i < xs.length ? Optional.some(xs[i]) : Optional.none();
    const head = (xs) => get$5(xs, 0);
    const last = (xs) => get$5(xs, xs.length - 1);
    const findMap = (arr, f) => {
        for (let i = 0; i < arr.length; i++) {
            const r = f(arr[i], i);
            if (r.isSome()) {
                return r;
            }
        }
        return Optional.none();
    };
    const unique = (xs, comparator) => {
        const r = [];
        const isDuplicated = isFunction(comparator) ?
            (x) => exists(r, (i) => comparator(i, x)) :
            (x) => contains$1(r, x);
        for (let i = 0, len = xs.length; i < len; i++) {
            const x = xs[i];
            if (!isDuplicated(x)) {
                r.push(x);
            }
        }
        return r;
    };

    // There are many variations of Object iteration that are faster than the 'for-in' style:
    // http://jsperf.com/object-keys-iteration/107
    //
    // Use the native keys if it is available (IE9+), otherwise fall back to manually filtering
    const keys = Object.keys;
    const hasOwnProperty = Object.hasOwnProperty;
    const each = (obj, f) => {
        const props = keys(obj);
        for (let k = 0, len = props.length; k < len; k++) {
            const i = props[k];
            const x = obj[i];
            f(x, i);
        }
    };
    const objAcc = (r) => (x, i) => {
        r[i] = x;
    };
    const internalFilter = (obj, pred, onTrue, onFalse) => {
        each(obj, (x, i) => {
            (pred(x, i) ? onTrue : onFalse)(x, i);
        });
    };
    const filter = (obj, pred) => {
        const t = {};
        internalFilter(obj, pred, objAcc(t), noop);
        return t;
    };
    const mapToArray = (obj, f) => {
        const r = [];
        each(obj, (value, name) => {
            r.push(f(value, name));
        });
        return r;
    };
    const values = (obj) => {
        return mapToArray(obj, identity);
    };
    const size = (obj) => {
        return keys(obj).length;
    };
    const get$4 = (obj, key) => {
        return has(obj, key) ? Optional.from(obj[key]) : Optional.none();
    };
    const has = (obj, key) => hasOwnProperty.call(obj, key);
    const hasNonNullableKey = (obj, key) => has(obj, key) && obj[key] !== undefined && obj[key] !== null;
    const isEmpty$1 = (r) => {
        for (const x in r) {
            if (hasOwnProperty.call(r, x)) {
                return false;
            }
        }
        return true;
    };

    /*
     * Generates a church encoded ADT (https://en.wikipedia.org/wiki/Church_encoding)
     * For syntax and use, look at the test code.
     */
    const generate$1 = (cases) => {
        // validation
        if (!isArray(cases)) {
            throw new Error('cases must be an array');
        }
        if (cases.length === 0) {
            throw new Error('there must be at least one case');
        }
        const constructors = [];
        // adt is mutated to add the individual cases
        const adt = {};
        each$1(cases, (acase, count) => {
            const keys$1 = keys(acase);
            // validation
            if (keys$1.length !== 1) {
                throw new Error('one and only one name per case');
            }
            const key = keys$1[0];
            const value = acase[key];
            // validation
            if (adt[key] !== undefined) {
                throw new Error('duplicate key detected:' + key);
            }
            else if (key === 'cata') {
                throw new Error('cannot have a case named cata (sorry)');
            }
            else if (!isArray(value)) {
                // this implicitly checks if acase is an object
                throw new Error('case arguments must be an array');
            }
            constructors.push(key);
            //
            // constructor for key
            //
            adt[key] = (...args) => {
                const argLength = args.length;
                // validation
                if (argLength !== value.length) {
                    throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
                }
                const match = (branches) => {
                    const branchKeys = keys(branches);
                    if (constructors.length !== branchKeys.length) {
                        throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
                    }
                    const allReqd = forall(constructors, (reqKey) => {
                        return contains$1(branchKeys, reqKey);
                    });
                    if (!allReqd) {
                        throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
                    }
                    return branches[key].apply(null, args);
                };
                //
                // the fold function for key
                //
                return {
                    fold: (...foldArgs) => {
                        // runtime validation
                        if (foldArgs.length !== cases.length) {
                            throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + foldArgs.length);
                        }
                        const target = foldArgs[count];
                        return target.apply(null, args);
                    },
                    match,
                    // NOTE: Only for debugging.
                    log: (label) => {
                        // eslint-disable-next-line no-console
                        console.log(label, {
                            constructors,
                            constructor: key,
                            params: args
                        });
                    }
                };
            };
        });
        return adt;
    };
    const Adt = {
        generate: generate$1
    };

    const Cell = (initial) => {
        let value = initial;
        const get = () => {
            return value;
        };
        const set = (v) => {
            value = v;
        };
        return {
            get,
            set
        };
    };

    /**
     * **Is** the value stored inside this Optional object equal to `rhs`?
     */
    const is$2 = (lhs, rhs, comparator = tripleEquals) => lhs.exists((left) => comparator(left, rhs));
    const cat = (arr) => {
        const r = [];
        const push = (x) => {
            r.push(x);
        };
        for (let i = 0; i < arr.length; i++) {
            arr[i].each(push);
        }
        return r;
    };
    /*
    Notes on the lift functions:
    - We used to have a generic liftN, but we were concerned about its type-safety, and the below variants were faster in microbenchmarks.
    - The getOrDie calls are partial functions, but are checked beforehand. This is faster and more convenient (but less safe) than folds.
    - && is used instead of a loop for simplicity and performance.
    */
    const lift2 = (oa, ob, f) => oa.isSome() && ob.isSome() ? Optional.some(f(oa.getOrDie(), ob.getOrDie())) : Optional.none();
    const bindFrom = (a, f) => (a !== undefined && a !== null) ? f(a) : Optional.none();
    const flatten = (oot) => oot.bind(identity);
    // This can help with type inference, by specifying the type param on the none case, so the caller doesn't have to.
    const someIf = (b, a) => b ? Optional.some(a) : Optional.none();

    const singleton = (doRevoke) => {
        const subject = Cell(Optional.none());
        const revoke = () => subject.get().each(doRevoke);
        const clear = () => {
            revoke();
            subject.set(Optional.none());
        };
        const isSet = () => subject.get().isSome();
        const get = () => subject.get();
        const set = (s) => {
            revoke();
            subject.set(Optional.some(s));
        };
        return {
            clear,
            isSet,
            get,
            set
        };
    };
    const unbindable = () => singleton((s) => s.unbind());

    const removeFromStart = (str, numChars) => {
        return str.substring(numChars);
    };

    const checkRange = (str, substr, start) => substr === '' || str.length >= substr.length && str.substr(start, start + substr.length) === substr;
    const removeLeading = (str, prefix) => {
        return startsWith(str, prefix) ? removeFromStart(str, prefix.length) : str;
    };
    const contains = (str, substr, start = 0, end) => {
        const idx = str.indexOf(substr, start);
        if (idx !== -1) {
            return isUndefined(end) ? true : idx + substr.length <= end;
        }
        else {
            return false;
        }
    };
    /** Does 'str' start with 'prefix'?
     *  Note: all strings start with the empty string.
     *        More formally, for all strings x, startsWith(x, "").
     *        This is so that for all strings x and y, startsWith(y + x, y)
     */
    const startsWith = (str, prefix) => {
        return checkRange(str, prefix, 0);
    };
    const blank = (r) => (s) => s.replace(r, '');
    /** removes all leading and trailing spaces */
    const trim = blank(/^\s+|\s+$/g);
    const isNotEmpty = (s) => s.length > 0;
    const isEmpty = (s) => !isNotEmpty(s);
    const toInt = (value, radix = 10) => {
        const num = parseInt(value, radix);
        return isNaN(num) ? Optional.none() : Optional.some(num);
    };
    const toFloat = (value) => {
        const num = parseFloat(value);
        return isNaN(num) ? Optional.none() : Optional.some(num);
    };

    const cached = (f) => {
        let called = false;
        let r;
        return (...args) => {
            if (!called) {
                called = true;
                r = f.apply(null, args);
            }
            return r;
        };
    };

    const validSectionList = ['tfoot', 'thead', 'tbody', 'colgroup'];
    const isValidSection = (parentName) => contains$1(validSectionList, parentName);
    const grid = (rows, columns) => ({
        rows,
        columns
    });
    const detail = (element, rowspan, colspan) => ({
        element,
        rowspan,
        colspan
    });
    const extended = (element, rowspan, colspan, row, column, isLocked) => ({
        element,
        rowspan,
        colspan,
        row,
        column,
        isLocked
    });
    const rowdetail = (element, cells, section) => ({
        element,
        cells,
        section
    });
    const bounds = (startRow, startCol, finishRow, finishCol) => ({
        startRow,
        startCol,
        finishRow,
        finishCol
    });
    const columnext = (element, colspan, column) => ({
        element,
        colspan,
        column
    });
    const colgroup = (element, columns) => ({
        element,
        columns
    });

    const fromHtml = (html, scope) => {
        const doc = scope || document;
        const div = doc.createElement('div');
        div.innerHTML = html;
        if (!div.hasChildNodes() || div.childNodes.length > 1) {
            const message = 'HTML does not have a single root node';
            // eslint-disable-next-line no-console
            console.error(message, html);
            throw new Error(message);
        }
        return fromDom$1(div.childNodes[0]);
    };
    const fromTag = (tag, scope) => {
        const doc = scope || document;
        const node = doc.createElement(tag);
        return fromDom$1(node);
    };
    const fromText = (text, scope) => {
        const doc = scope || document;
        const node = doc.createTextNode(text);
        return fromDom$1(node);
    };
    const fromDom$1 = (node) => {
        // TODO: Consider removing this check, but left atm for safety
        if (node === null || node === undefined) {
            throw new Error('Node cannot be null or undefined');
        }
        return {
            dom: node
        };
    };
    const fromPoint = (docElm, x, y) => Optional.from(docElm.dom.elementFromPoint(x, y)).map(fromDom$1);
    // tslint:disable-next-line:variable-name
    const SugarElement = {
        fromHtml,
        fromTag,
        fromText,
        fromDom: fromDom$1,
        fromPoint
    };

    const COMMENT = 8;
    const DOCUMENT = 9;
    const DOCUMENT_FRAGMENT = 11;
    const ELEMENT = 1;
    const TEXT = 3;

    const is$1 = (element, selector) => {
        const dom = element.dom;
        if (dom.nodeType !== ELEMENT) {
            return false;
        }
        else {
            const elem = dom;
            if (elem.matches !== undefined) {
                return elem.matches(selector);
            }
            else if (elem.msMatchesSelector !== undefined) {
                return elem.msMatchesSelector(selector);
            }
            else if (elem.webkitMatchesSelector !== undefined) {
                return elem.webkitMatchesSelector(selector);
            }
            else if (elem.mozMatchesSelector !== undefined) {
                // cast to any as mozMatchesSelector doesn't exist in TS DOM lib
                return elem.mozMatchesSelector(selector);
            }
            else {
                throw new Error('Browser lacks native selectors');
            } // unfortunately we can't throw this on startup :(
        }
    };
    const bypassSelector = (dom) => 
    // Only elements, documents and shadow roots support querySelector
    // shadow root element type is DOCUMENT_FRAGMENT
    dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT && dom.nodeType !== DOCUMENT_FRAGMENT ||
        // IE fix for complex queries on empty nodes: http://jsfiddle.net/spyder/fv9ptr5L/
        dom.childElementCount === 0;
    const all$1 = (selector, scope) => {
        const base = scope === undefined ? document : scope.dom;
        return bypassSelector(base) ? [] : map(base.querySelectorAll(selector), SugarElement.fromDom);
    };
    const one = (selector, scope) => {
        const base = scope === undefined ? document : scope.dom;
        return bypassSelector(base) ? Optional.none() : Optional.from(base.querySelector(selector)).map(SugarElement.fromDom);
    };

    const eq = (e1, e2) => e1.dom === e2.dom;
    const is = is$1;

    const DeviceType = (os, browser, userAgent, mediaMatch) => {
        const isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
        const isiPhone = os.isiOS() && !isiPad;
        const isMobile = os.isiOS() || os.isAndroid();
        const isTouch = isMobile || !mediaMatch('(any-pointer:fine)');
        const isTablet = isiPad || !isiPhone && isMobile && mediaMatch('(min-device-width:768px)');
        const isPhone = isiPhone || isMobile && !isTablet;
        const iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
        const isDesktop = !isPhone && !isTablet && !iOSwebview;
        return {
            isiPad: constant(isiPad),
            isiPhone: constant(isiPhone),
            isTablet: constant(isTablet),
            isPhone: constant(isPhone),
            isTouch: constant(isTouch),
            isAndroid: os.isAndroid,
            isiOS: os.isiOS,
            isWebView: constant(iOSwebview),
            isDesktop: constant(isDesktop)
        };
    };

    const firstMatch = (regexes, s) => {
        for (let i = 0; i < regexes.length; i++) {
            const x = regexes[i];
            if (x.test(s)) {
                return x;
            }
        }
        return undefined;
    };
    const find = (regexes, agent) => {
        const r = firstMatch(regexes, agent);
        if (!r) {
            return { major: 0, minor: 0 };
        }
        const group = (i) => {
            return Number(agent.replace(r, '$' + i));
        };
        return nu$2(group(1), group(2));
    };
    const detect$4 = (versionRegexes, agent) => {
        const cleanedAgent = String(agent).toLowerCase();
        if (versionRegexes.length === 0) {
            return unknown$2();
        }
        return find(versionRegexes, cleanedAgent);
    };
    const unknown$2 = () => {
        return nu$2(0, 0);
    };
    const nu$2 = (major, minor) => {
        return { major, minor };
    };
    const Version = {
        nu: nu$2,
        detect: detect$4,
        unknown: unknown$2
    };

    const detectBrowser$1 = (browsers, userAgentData) => {
        return findMap(userAgentData.brands, (uaBrand) => {
            const lcBrand = uaBrand.brand.toLowerCase();
            return find$1(browsers, (browser) => lcBrand === browser.brand?.toLowerCase())
                .map((info) => ({
                current: info.name,
                version: Version.nu(parseInt(uaBrand.version, 10), 0)
            }));
        });
    };

    const detect$3 = (candidates, userAgent) => {
        const agent = String(userAgent).toLowerCase();
        return find$1(candidates, (candidate) => {
            return candidate.search(agent);
        });
    };
    // They (browser and os) are the same at the moment, but they might
    // not stay that way.
    const detectBrowser = (browsers, userAgent) => {
        return detect$3(browsers, userAgent).map((browser) => {
            const version = Version.detect(browser.versionRegexes, userAgent);
            return {
                current: browser.name,
                version
            };
        });
    };
    const detectOs = (oses, userAgent) => {
        return detect$3(oses, userAgent).map((os) => {
            const version = Version.detect(os.versionRegexes, userAgent);
            return {
                current: os.name,
                version
            };
        });
    };

    const normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
    const checkContains = (target) => {
        return (uastring) => {
            return contains(uastring, target);
        };
    };
    const browsers = [
        // This is legacy Edge
        {
            name: 'Edge',
            versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
            search: (uastring) => {
                return contains(uastring, 'edge/') && contains(uastring, 'chrome') && contains(uastring, 'safari') && contains(uastring, 'applewebkit');
            }
        },
        // This is Google Chrome and Chromium Edge
        {
            name: 'Chromium',
            brand: 'Chromium',
            versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, normalVersionRegex],
            search: (uastring) => {
                return contains(uastring, 'chrome') && !contains(uastring, 'chromeframe');
            }
        },
        {
            name: 'IE',
            versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
            search: (uastring) => {
                return contains(uastring, 'msie') || contains(uastring, 'trident');
            }
        },
        // INVESTIGATE: Is this still the Opera user agent?
        {
            name: 'Opera',
            versionRegexes: [normalVersionRegex, /.*?opera\/([0-9]+)\.([0-9]+).*/],
            search: checkContains('opera')
        },
        {
            name: 'Firefox',
            versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
            search: checkContains('firefox')
        },
        {
            name: 'Safari',
            versionRegexes: [normalVersionRegex, /.*?cpu os ([0-9]+)_([0-9]+).*/],
            search: (uastring) => {
                return (contains(uastring, 'safari') || contains(uastring, 'mobile/')) && contains(uastring, 'applewebkit');
            }
        }
    ];
    const oses = [
        {
            name: 'Windows',
            search: checkContains('win'),
            versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
        },
        {
            name: 'iOS',
            search: (uastring) => {
                return contains(uastring, 'iphone') || contains(uastring, 'ipad');
            },
            versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
        },
        {
            name: 'Android',
            search: checkContains('android'),
            versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
        },
        {
            name: 'macOS',
            search: checkContains('mac os x'),
            versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
        },
        {
            name: 'Linux',
            search: checkContains('linux'),
            versionRegexes: []
        },
        { name: 'Solaris',
            search: checkContains('sunos'),
            versionRegexes: []
        },
        {
            name: 'FreeBSD',
            search: checkContains('freebsd'),
            versionRegexes: []
        },
        {
            name: 'ChromeOS',
            search: checkContains('cros'),
            versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
        }
    ];
    const PlatformInfo = {
        browsers: constant(browsers),
        oses: constant(oses)
    };

    const edge = 'Edge';
    const chromium = 'Chromium';
    const ie = 'IE';
    const opera = 'Opera';
    const firefox = 'Firefox';
    const safari = 'Safari';
    const unknown$1 = () => {
        return nu$1({
            current: undefined,
            version: Version.unknown()
        });
    };
    const nu$1 = (info) => {
        const current = info.current;
        const version = info.version;
        const isBrowser = (name) => () => current === name;
        return {
            current,
            version,
            isEdge: isBrowser(edge),
            isChromium: isBrowser(chromium),
            // NOTE: isIe just looks too weird
            isIE: isBrowser(ie),
            isOpera: isBrowser(opera),
            isFirefox: isBrowser(firefox),
            isSafari: isBrowser(safari)
        };
    };
    const Browser = {
        unknown: unknown$1,
        nu: nu$1};

    const windows = 'Windows';
    const ios = 'iOS';
    const android = 'Android';
    const linux = 'Linux';
    const macos = 'macOS';
    const solaris = 'Solaris';
    const freebsd = 'FreeBSD';
    const chromeos = 'ChromeOS';
    // Though there is a bit of dupe with this and Browser, trying to
    // reuse code makes it much harder to follow and change.
    const unknown = () => {
        return nu({
            current: undefined,
            version: Version.unknown()
        });
    };
    const nu = (info) => {
        const current = info.current;
        const version = info.version;
        const isOS = (name) => () => current === name;
        return {
            current,
            version,
            isWindows: isOS(windows),
            // TODO: Fix capitalisation
            isiOS: isOS(ios),
            isAndroid: isOS(android),
            isMacOS: isOS(macos),
            isLinux: isOS(linux),
            isSolaris: isOS(solaris),
            isFreeBSD: isOS(freebsd),
            isChromeOS: isOS(chromeos)
        };
    };
    const OperatingSystem = {
        unknown,
        nu};

    const detect$2 = (userAgent, userAgentDataOpt, mediaMatch) => {
        const browsers = PlatformInfo.browsers();
        const oses = PlatformInfo.oses();
        const browser = userAgentDataOpt.bind((userAgentData) => detectBrowser$1(browsers, userAgentData))
            .orThunk(() => detectBrowser(browsers, userAgent))
            .fold(Browser.unknown, Browser.nu);
        const os = detectOs(oses, userAgent).fold(OperatingSystem.unknown, OperatingSystem.nu);
        const deviceType = DeviceType(os, browser, userAgent, mediaMatch);
        return {
            browser,
            os,
            deviceType
        };
    };
    const PlatformDetection = {
        detect: detect$2
    };

    const mediaMatch = (query) => window.matchMedia(query).matches;
    // IMPORTANT: Must be in a thunk, otherwise rollup thinks calling this immediately
    // causes side effects and won't tree shake this away
    // Note: navigator.userAgentData is not part of the native typescript types yet
    let platform = cached(() => PlatformDetection.detect(window.navigator.userAgent, Optional.from((window.navigator.userAgentData)), mediaMatch));
    const detect$1 = () => platform();

    const name = (element) => {
        const r = element.dom.nodeName;
        return r.toLowerCase();
    };
    const type = (element) => element.dom.nodeType;
    const isType = (t) => (element) => type(element) === t;
    const isComment = (element) => type(element) === COMMENT || name(element) === '#comment';
    const isElement = isType(ELEMENT);
    const isText = isType(TEXT);
    const isDocument = isType(DOCUMENT);
    const isDocumentFragment = isType(DOCUMENT_FRAGMENT);
    const isTag = (tag) => (e) => isElement(e) && name(e) === tag;

    /**
     * The document associated with the current element
     * NOTE: this will throw if the owner is null.
     */
    const owner = (element) => SugarElement.fromDom(element.dom.ownerDocument);
    /**
     * If the element is a document, return it. Otherwise, return its ownerDocument.
     * @param dos
     */
    const documentOrOwner = (dos) => isDocument(dos) ? dos : owner(dos);
    const parent = (element) => Optional.from(element.dom.parentNode).map(SugarElement.fromDom);
    const parentElement = (element) => Optional.from(element.dom.parentElement).map(SugarElement.fromDom);
    const parents = (element, isRoot) => {
        const stop = isFunction(isRoot) ? isRoot : never;
        // This is used a *lot* so it needs to be performant, not recursive
        let dom = element.dom;
        const ret = [];
        while (dom.parentNode !== null && dom.parentNode !== undefined) {
            const rawParent = dom.parentNode;
            const p = SugarElement.fromDom(rawParent);
            ret.push(p);
            if (stop(p) === true) {
                break;
            }
            else {
                dom = rawParent;
            }
        }
        return ret;
    };
    const prevSibling = (element) => Optional.from(element.dom.previousSibling).map(SugarElement.fromDom);
    const nextSibling = (element) => Optional.from(element.dom.nextSibling).map(SugarElement.fromDom);
    const children$3 = (element) => map(element.dom.childNodes, SugarElement.fromDom);
    const child$3 = (element, index) => {
        const cs = element.dom.childNodes;
        return Optional.from(cs[index]).map(SugarElement.fromDom);
    };
    const firstChild = (element) => child$3(element, 0);

    /**
     * Is the element a ShadowRoot?
     *
     * Note: this is insufficient to test if any element is a shadow root, but it is sufficient to differentiate between
     * a Document and a ShadowRoot.
     */
    const isShadowRoot = (dos) => isDocumentFragment(dos) && isNonNullable(dos.dom.host);
    const getRootNode = (e) => SugarElement.fromDom(e.dom.getRootNode());
    /** If this element is in a ShadowRoot, return it. */
    const getShadowRoot = (e) => {
        const r = getRootNode(e);
        return isShadowRoot(r) ? Optional.some(r) : Optional.none();
    };
    /** Return the host of a ShadowRoot.
     *
     * This function will throw if Shadow DOM is unsupported in the browser, or if the host is null.
     * If you actually have a ShadowRoot, this shouldn't happen.
     */
    const getShadowHost = (e) => SugarElement.fromDom(e.dom.host);

    const before = (marker, element) => {
        const parent$1 = parent(marker);
        parent$1.each((v) => {
            v.dom.insertBefore(element.dom, marker.dom);
        });
    };
    const after$1 = (marker, element) => {
        const sibling = nextSibling(marker);
        sibling.fold(() => {
            const parent$1 = parent(marker);
            parent$1.each((v) => {
                append$1(v, element);
            });
        }, (v) => {
            before(v, element);
        });
    };
    const prepend = (parent, element) => {
        const firstChild$1 = firstChild(parent);
        firstChild$1.fold(() => {
            append$1(parent, element);
        }, (v) => {
            parent.dom.insertBefore(element.dom, v.dom);
        });
    };
    const append$1 = (parent, element) => {
        parent.dom.appendChild(element.dom);
    };
    const wrap = (element, wrapper) => {
        before(element, wrapper);
        append$1(wrapper, element);
    };

    const after = (marker, elements) => {
        each$1(elements, (x, i) => {
            const e = i === 0 ? marker : elements[i - 1];
            after$1(e, x);
        });
    };
    const append = (parent, elements) => {
        each$1(elements, (x) => {
            append$1(parent, x);
        });
    };

    const rawSet = (dom, key, value) => {
        /*
         * JQuery coerced everything to a string, and silently did nothing on text node/null/undefined.
         *
         * We fail on those invalid cases, only allowing numbers and booleans.
         */
        if (isString(value) || isBoolean(value) || isNumber(value)) {
            dom.setAttribute(key, value + '');
        }
        else {
            // eslint-disable-next-line no-console
            console.error('Invalid call to Attribute.set. Key ', key, ':: Value ', value, ':: Element ', dom);
            throw new Error('Attribute value was not simple');
        }
    };
    const set$2 = (element, key, value) => {
        rawSet(element.dom, key, value);
    };
    const setAll = (element, attrs) => {
        const dom = element.dom;
        each(attrs, (v, k) => {
            rawSet(dom, k, v);
        });
    };
    const get$3 = (element, key) => {
        const v = element.dom.getAttribute(key);
        // undefined is the more appropriate value for JS, and this matches JQuery
        return v === null ? undefined : v;
    };
    const getOpt = (element, key) => Optional.from(get$3(element, key));
    const remove$2 = (element, key) => {
        element.dom.removeAttribute(key);
    };
    const clone = (element) => foldl(element.dom.attributes, (acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
    }, {});

    const remove$1 = (element) => {
        const dom = element.dom;
        if (dom.parentNode !== null) {
            dom.parentNode.removeChild(dom);
        }
    };
    const unwrap = (wrapper) => {
        const children = children$3(wrapper);
        if (children.length > 0) {
            after(wrapper, children);
        }
        remove$1(wrapper);
    };

    const fromDom = (nodes) => map(nodes, SugarElement.fromDom);

    // some elements, such as mathml, don't have style attributes
    // others, such as angular elements, have style attributes that aren't a CSSStyleDeclaration
    const isSupported = (dom) => dom.style !== undefined && isFunction(dom.style.getPropertyValue);

    // Node.contains() is very, very, very good performance
    // http://jsperf.com/closest-vs-contains/5
    const inBody = (element) => {
        // Technically this is only required on IE, where contains() returns false for text nodes.
        // But it's cheap enough to run everywhere and Sugar doesn't have platform detection (yet).
        const dom = isText(element) ? element.dom.parentNode : element.dom;
        // use ownerDocument.body to ensure this works inside iframes.
        // Normally contains is bad because an element "contains" itself, but here we want that.
        if (dom === undefined || dom === null || dom.ownerDocument === null) {
            return false;
        }
        const doc = dom.ownerDocument;
        return getShadowRoot(SugarElement.fromDom(dom)).fold(() => doc.body.contains(dom), compose1(inBody, getShadowHost));
    };
    const getBody$1 = (doc) => {
        const b = doc.dom.body;
        if (b === null || b === undefined) {
            throw new Error('Body is not available yet');
        }
        return SugarElement.fromDom(b);
    };

    const internalSet = (dom, property, value) => {
        // This is going to hurt. Apologies.
        // JQuery coerces numbers to pixels for certain property names, and other times lets numbers through.
        // we're going to be explicit; strings only.
        if (!isString(value)) {
            // eslint-disable-next-line no-console
            console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
            throw new Error('CSS value must be a string: ' + value);
        }
        // removed: support for dom().style[property] where prop is camel case instead of normal property name
        if (isSupported(dom)) {
            dom.style.setProperty(property, value);
        }
    };
    const internalRemove = (dom, property) => {
        /*
         * IE9 and above - MDN doesn't have details, but here's a couple of random internet claims
         *
         * http://help.dottoro.com/ljopsjck.php
         * http://stackoverflow.com/a/7901886/7546
         */
        if (isSupported(dom)) {
            dom.style.removeProperty(property);
        }
    };
    const set$1 = (element, property, value) => {
        const dom = element.dom;
        internalSet(dom, property, value);
    };
    /*
     * NOTE: For certain properties, this returns the "used value" which is subtly different to the "computed value" (despite calling getComputedStyle).
     * Blame CSS 2.0.
     *
     * https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
     */
    const get$2 = (element, property) => {
        const dom = element.dom;
        /*
         * IE9 and above per
         * https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle
         *
         * Not in numerosity, because it doesn't memoize and looking this up dynamically in performance critical code would be horrendous.
         *
         * JQuery has some magic here for IE popups, but we don't really need that.
         * It also uses element.ownerDocument.defaultView to handle iframes but that hasn't been required since FF 3.6.
         */
        const styles = window.getComputedStyle(dom);
        const r = styles.getPropertyValue(property);
        // jquery-ism: If r is an empty string, check that the element is not in a document. If it isn't, return the raw value.
        // Turns out we do this a lot.
        return (r === '' && !inBody(element)) ? getUnsafeProperty(dom, property) : r;
    };
    // removed: support for dom().style[property] where prop is camel case instead of normal property name
    // empty string is what the browsers (IE11 and Chrome) return when the propertyValue doesn't exists.
    const getUnsafeProperty = (dom, property) => isSupported(dom) ? dom.style.getPropertyValue(property) : '';
    /*
     * Gets the raw value from the style attribute. Useful for retrieving "used values" from the DOM:
     * https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
     *
     * Returns NONE if the property isn't set, or the value is an empty string.
     */
    const getRaw$2 = (element, property) => {
        const dom = element.dom;
        const raw = getUnsafeProperty(dom, property);
        return Optional.from(raw).filter((r) => r.length > 0);
    };
    const remove = (element, property) => {
        const dom = element.dom;
        internalRemove(dom, property);
        if (is$2(getOpt(element, 'style').map(trim), '')) {
            // No more styles left, remove the style attribute as well
            remove$2(element, 'style');
        }
    };

    const Dimension = (name, getOffset) => {
        const set = (element, h) => {
            if (!isNumber(h) && !h.match(/^[0-9]+$/)) {
                throw new Error(name + '.set accepts only positive integer values. Value was ' + h);
            }
            const dom = element.dom;
            if (isSupported(dom)) {
                dom.style[name] = h + 'px';
            }
        };
        /*
         * jQuery supports querying width and height on the document and window objects.
         *
         * TBIO doesn't do this, so the code is removed to save space, but left here just in case.
         */
        /*
        var getDocumentWidth = (element) => {
          var dom = element.dom;
          if (Node.isDocument(element)) {
            var body = dom.body;
            var doc = dom.documentElement;
            return Math.max(
              body.scrollHeight,
              doc.scrollHeight,
              body.offsetHeight,
              doc.offsetHeight,
              doc.clientHeight
            );
          }
        };
      
        var getWindowWidth = (element) => {
          var dom = element.dom;
          if (dom.window === dom) {
            // There is no offsetHeight on a window, so use the clientHeight of the document
            return dom.document.documentElement.clientHeight;
          }
        };
      */
        const get = (element) => {
            const r = getOffset(element);
            // zero or null means non-standard or disconnected, fall back to CSS
            if (r <= 0 || r === null) {
                const css = get$2(element, name);
                // ugh this feels dirty, but it saves cycles
                return parseFloat(css) || 0;
            }
            return r;
        };
        // in jQuery, getOuter replicates (or uses) box-sizing: border-box calculations
        // although these calculations only seem relevant for quirks mode, and edge cases TBIO doesn't rely on
        const getOuter = get;
        const aggregate = (element, properties) => foldl(properties, (acc, property) => {
            const val = get$2(element, property);
            const value = val === undefined ? 0 : parseInt(val, 10);
            return isNaN(value) ? acc : acc + value;
        }, 0);
        const max = (element, value, properties) => {
            const cumulativeInclusions = aggregate(element, properties);
            // if max-height is 100px and your cumulativeInclusions is 150px, there is no way max-height can be 100px, so we return 0.
            const absoluteMax = value > cumulativeInclusions ? value - cumulativeInclusions : 0;
            return absoluteMax;
        };
        return {
            set,
            get,
            getOuter,
            aggregate,
            max
        };
    };

    const toNumber = (px, fallback) => toFloat(px).getOr(fallback);
    const getProp = (element, name, fallback) => toNumber(get$2(element, name), fallback);
    const calcContentBoxSize = (element, size, upper, lower) => {
        const paddingUpper = getProp(element, `padding-${upper}`, 0);
        const paddingLower = getProp(element, `padding-${lower}`, 0);
        const borderUpper = getProp(element, `border-${upper}-width`, 0);
        const borderLower = getProp(element, `border-${lower}-width`, 0);
        return size - paddingUpper - paddingLower - borderUpper - borderLower;
    };
    const getCalculatedWidth = (element, boxSizing) => {
        const dom = element.dom;
        const width = dom.getBoundingClientRect().width || dom.offsetWidth;
        return calcContentBoxSize(element, width, 'left', 'right');
    };
    const getWidth = (element) => getProp(element, 'width', element.dom.offsetWidth);
    const getInnerWidth = (element) => getCalculatedWidth(element);

    const api$1 = Dimension('width', (element) => {
        const dom = element.dom;
        return inBody(element) ? dom.getBoundingClientRect().width : dom.offsetWidth;
    });
    const get$1 = (element) => api$1.get(element);
    const getOuter = (element) => api$1.getOuter(element);
    const getInner = getInnerWidth;
    const getRuntime = getWidth;

    const r = (left, top) => {
        const translate = (x, y) => r(left + x, top + y);
        return {
            left,
            top,
            translate
        };
    };
    // tslint:disable-next-line:variable-name
    const SugarPosition = r;

    const boxPosition = (dom) => {
        const box = dom.getBoundingClientRect();
        return SugarPosition(box.left, box.top);
    };
    // Avoids falsy false fallthrough
    const firstDefinedOrZero = (a, b) => {
        if (a !== undefined) {
            return a;
        }
        else {
            return b !== undefined ? b : 0;
        }
    };
    const absolute = (element) => {
        const doc = element.dom.ownerDocument;
        const body = doc.body;
        const win = doc.defaultView;
        const html = doc.documentElement;
        if (body === element.dom) {
            return SugarPosition(body.offsetLeft, body.offsetTop);
        }
        const scrollTop = firstDefinedOrZero(win?.pageYOffset, html.scrollTop);
        const scrollLeft = firstDefinedOrZero(win?.pageXOffset, html.scrollLeft);
        const clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
        const clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);
        return viewport(element).translate(scrollLeft - clientLeft, scrollTop - clientTop);
    };
    const viewport = (element) => {
        const dom = element.dom;
        const doc = dom.ownerDocument;
        const body = doc.body;
        if (body === dom) {
            return SugarPosition(body.offsetLeft, body.offsetTop);
        }
        if (!inBody(element)) {
            return SugarPosition(0, 0);
        }
        return boxPosition(dom);
    };

    const NodeValue = (is, name) => {
        const get = (element) => {
            if (!is(element)) {
                throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
            }
            return getOption(element).getOr('');
        };
        const getOption = (element) => is(element) ? Optional.from(element.dom.nodeValue) : Optional.none();
        const set = (element, value) => {
            if (!is(element)) {
                throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
            }
            element.dom.nodeValue = value;
        };
        return {
            get,
            getOption,
            set
        };
    };

    const api = NodeValue(isText, 'text');
    const get = (element) => api.get(element);
    const set = (element, value) => api.set(element, value);

    const onDirection = (isLtr, isRtl) => (element) => getDirection(element) === 'rtl' ? isRtl : isLtr;
    const getDirection = (element) => get$2(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';

    var ClosestOrAncestor = (is, ancestor, scope, a, isRoot) => {
        if (is(scope, a)) {
            return Optional.some(scope);
        }
        else if (isFunction(isRoot) && isRoot(scope)) {
            return Optional.none();
        }
        else {
            return ancestor(scope, a, isRoot);
        }
    };

    const ancestor$1 = (scope, predicate, isRoot) => {
        let element = scope.dom;
        const stop = isFunction(isRoot) ? isRoot : never;
        while (element.parentNode) {
            element = element.parentNode;
            const el = SugarElement.fromDom(element);
            if (predicate(el)) {
                return Optional.some(el);
            }
            else if (stop(el)) {
                break;
            }
        }
        return Optional.none();
    };
    const closest$2 = (scope, predicate, isRoot) => {
        // This is required to avoid ClosestOrAncestor passing the predicate to itself
        const is = (s, test) => test(s);
        return ClosestOrAncestor(is, ancestor$1, scope, predicate, isRoot);
    };
    const child$2 = (scope, predicate) => {
        const pred = (node) => predicate(SugarElement.fromDom(node));
        const result = find$1(scope.dom.childNodes, pred);
        return result.map(SugarElement.fromDom);
    };

    const ancestor = (scope, selector, isRoot) => ancestor$1(scope, (e) => is$1(e, selector), isRoot);
    const child$1 = (scope, selector) => child$2(scope, (e) => is$1(e, selector));
    const descendant = (scope, selector) => one(selector, scope);
    // Returns Some(closest ancestor element (sugared)) matching 'selector' up to isRoot, or None() otherwise
    const closest$1 = (scope, selector, isRoot) => {
        const is = (element, selector) => is$1(element, selector);
        return ClosestOrAncestor(is, ancestor, scope, selector, isRoot);
    };

    const closest = (target) => closest$1(target, '[contenteditable]');
    const isEditable = (element, assumeEditable = false) => {
        if (inBody(element)) {
            return element.dom.isContentEditable;
        }
        else {
            // Find the closest contenteditable element and check if it's editable
            return closest(element).fold(constant(assumeEditable), (editable) => getRaw$1(editable) === 'true');
        }
    };
    const getRaw$1 = (element) => element.dom.contentEditable;

    const children$2 = (scope, predicate) => filter$1(children$3(scope), predicate);
    const descendants$1 = (scope, predicate) => {
        let result = [];
        // Recurse.toArray() might help here
        each$1(children$3(scope), (x) => {
            if (predicate(x)) {
                result = result.concat([x]);
            }
            result = result.concat(descendants$1(x, predicate));
        });
        return result;
    };

    const children$1 = (scope, selector) => 
    // It may surprise you to learn this is exactly what JQuery does
    // TODO: Avoid all the wrapping and unwrapping
    children$2(scope, (e) => is$1(e, selector));
    const descendants = (scope, selector) => all$1(selector, scope);

    const child = (scope, selector) => child$1(scope, selector).isSome();

    const units = {
        // we don't really support all of these different ways to express a length
        unsupportedLength: [
            'em',
            'ex',
            'cap',
            'ch',
            'ic',
            'rem',
            'lh',
            'rlh',
            'vw',
            'vh',
            'vi',
            'vb',
            'vmin',
            'vmax',
            'cm',
            'mm',
            'Q',
            'in',
            'pc',
            'pt',
            'px'
        ],
        // these are the length values we do support
        fixed: ['px', 'pt'],
        relative: ['%'],
        empty: ['']
    };
    // Built from https://tc39.es/ecma262/#prod-StrDecimalLiteral
    // Matches a float followed by a trailing set of characters
    const pattern = (() => {
        const decimalDigits = '[0-9]+';
        const signedInteger = '[+-]?' + decimalDigits;
        const exponentPart = '[eE]' + signedInteger;
        const dot = '\\.';
        const opt = (input) => `(?:${input})?`;
        const unsignedDecimalLiteral = [
            'Infinity',
            decimalDigits + dot + opt(decimalDigits) + opt(exponentPart),
            dot + decimalDigits + opt(exponentPart),
            decimalDigits + opt(exponentPart)
        ].join('|');
        const float = `[+-]?(?:${unsignedDecimalLiteral})`;
        return new RegExp(`^(${float})(.*)$`);
    })();
    const isUnit = (unit, accepted) => exists(accepted, (acc) => exists(units[acc], (check) => unit === check));
    const parse = (input, accepted) => {
        const match = Optional.from(pattern.exec(input));
        return match.bind((array) => {
            const value = Number(array[1]);
            const unitRaw = array[2];
            if (isUnit(unitRaw, accepted)) {
                return Optional.some({
                    value,
                    unit: unitRaw
                });
            }
            else {
                return Optional.none();
            }
        });
    };

    const zero = (array) => map(array, constant(0));
    const surround = (sizes, startIndex, endIndex, results, f) => f(sizes.slice(0, startIndex)).concat(results).concat(f(sizes.slice(endIndex)));
    // Clamp positive or negative delta so that a column/row cannot be reduced past its min size
    const clampDeltaHelper = (predicate) => (sizes, index, delta, minCellSize) => {
        if (!predicate(delta)) {
            return delta;
        }
        else {
            const newSize = Math.max(minCellSize, sizes[index] - Math.abs(delta));
            const diff = Math.abs(newSize - sizes[index]);
            return delta >= 0 ? diff : -diff;
        }
    };
    const clampNegativeDelta = clampDeltaHelper((delta) => delta < 0);
    const clampDelta = clampDeltaHelper(always);
    // Distribute the column/rows and try to preserve the table size
    const preserveTable = () => {
        // Calculations for the inner columns/rows
        const calcLeftEdgeDeltas = (sizes, index, next, delta, minCellSize) => {
            const idx = delta >= 0 ? next : index;
            const clampedDelta = clampDelta(sizes, idx, delta, minCellSize);
            // negative delta -> deltas becomes [ neg, pos ], positive delta -> deltas becomes [ pos, neg ]
            return surround(sizes, index, next + 1, [clampedDelta, -clampedDelta], zero);
        };
        const calcMiddleDeltas = (sizes, _prev, index, next, delta, minCellSize) => calcLeftEdgeDeltas(sizes, index, next, delta, minCellSize);
        const resizeTable = (resizer, delta, isLastColumn) => {
            if (isLastColumn) {
                resizer(delta);
            }
        };
        // Calculations for the last column/row resizer
        const calcRightEdgeDeltas = (sizes, _prev, _index, delta, _minCellSize, isRelative) => {
            if (isRelative) {
                return zero(sizes);
            }
            else {
                // Distribute the delta amongst all of the columns/rows
                const diff = delta / sizes.length;
                return map(sizes, constant(diff));
            }
        };
        const clampTableDelta = (sizes, index, delta, minCellSize, isLastColumn) => {
            // Don't clamp the last resizer using normal methods
            // Need to allow table width to be reduced past the last column position to allow for distributive resizing
            if (isLastColumn) {
                if (delta >= 0) {
                    return delta;
                }
                else {
                    // Clamp delta so that none of the columns/rows can reduce below their min size
                    const maxDelta = foldl(sizes, (a, b) => a + b - minCellSize, 0);
                    return Math.max(-maxDelta, delta);
                }
            }
            else {
                return clampNegativeDelta(sizes, index, delta, minCellSize);
            }
        };
        const calcRedestributedWidths = (sizes, _totalWidth, _pixelDelta, _isRelative) => ({
            delta: 0,
            newSizes: sizes,
        });
        return {
            resizeTable,
            clampTableDelta,
            calcLeftEdgeDeltas,
            calcMiddleDeltas,
            calcRightEdgeDeltas,
            calcRedestributedWidths
        };
    };

    const getAttrValue = (cell, name, fallback = 0) => getOpt(cell, name).map((value) => parseInt(value, 10)).getOr(fallback);
    const getSpan = (cell, type) => getAttrValue(cell, type, 1);
    const hasColspan = (cellOrCol) => {
        if (isTag('col')(cellOrCol)) {
            return getAttrValue(cellOrCol, 'span', 1) > 1;
        }
        else {
            return getSpan(cellOrCol, 'colspan') > 1;
        }
    };
    const minWidth = constant(10);

    const firstLayer = (scope, selector) => {
        return filterFirstLayer(scope, selector, always);
    };
    const filterFirstLayer = (scope, selector, predicate) => {
        return bind(children$3(scope), (x) => {
            if (is$1(x, selector)) {
                return predicate(x) ? [x] : [];
            }
            else {
                return filterFirstLayer(x, selector, predicate);
            }
        });
    };

    // lookup inside this table
    const lookup = (tags, element, isRoot = never) => {
        // If the element we're inspecting is the root, we definitely don't want it.
        if (isRoot(element)) {
            return Optional.none();
        }
        // This looks a lot like SelectorFind.closest, with one big exception - the isRoot check.
        // The code here will look for parents if passed a table, SelectorFind.closest with that specific isRoot check won't.
        if (contains$1(tags, name(element))) {
            return Optional.some(element);
        }
        const isRootOrUpperTable = (elm) => is$1(elm, 'table') || isRoot(elm);
        return ancestor(element, tags.join(','), isRootOrUpperTable);
    };
    /*
     * Identify the optional cell that element represents.
     */
    const cell = (element, isRoot) => lookup(['td', 'th'], element, isRoot);
    const cells = (ancestor) => firstLayer(ancestor, 'th,td');
    const columns$1 = (ancestor) => {
        if (is$1(ancestor, 'colgroup')) {
            return children$1(ancestor, 'col');
        }
        else {
            return bind(columnGroups(ancestor), (columnGroup) => children$1(columnGroup, 'col'));
        }
    };
    const table = (element, isRoot) => closest$1(element, 'table', isRoot);
    const rows = (ancestor) => firstLayer(ancestor, 'tr');
    const columnGroups = (ancestor) => table(ancestor).fold(constant([]), (table) => children$1(table, 'colgroup'));

    const isHeaderCell = isTag('th');
    const getRowHeaderType = (isHeaderRow, isHeaderCells) => {
        if (isHeaderRow && isHeaderCells) {
            return 'sectionCells';
        }
        else if (isHeaderRow) {
            return 'section';
        }
        else {
            return 'cells';
        }
    };
    const getRowType$1 = (row) => {
        // Header rows can use a combination of theads and ths - want to detect the different combinations
        const isHeaderRow = row.section === 'thead';
        const isHeaderCells = is$2(findCommonCellType(row.cells), 'th');
        if (row.section === 'tfoot') {
            return { type: 'footer' };
        }
        else if (isHeaderRow || isHeaderCells) {
            return { type: 'header', subType: getRowHeaderType(isHeaderRow, isHeaderCells) };
        }
        else {
            return { type: 'body' };
        }
    };
    const findCommonCellType = (cells) => {
        const headerCells = filter$1(cells, (cell) => isHeaderCell(cell.element));
        if (headerCells.length === 0) {
            return Optional.some('td');
        }
        else if (headerCells.length === cells.length) {
            return Optional.some('th');
        }
        else {
            return Optional.none();
        }
    };
    const findCommonRowType = (rows) => {
        const rowTypes = map(rows, (row) => getRowType$1(row).type);
        const hasHeader = contains$1(rowTypes, 'header');
        const hasFooter = contains$1(rowTypes, 'footer');
        if (!hasHeader && !hasFooter) {
            return Optional.some('body');
        }
        else {
            const hasBody = contains$1(rowTypes, 'body');
            if (hasHeader && !hasBody && !hasFooter) {
                return Optional.some('header');
            }
            else if (!hasHeader && !hasBody && hasFooter) {
                return Optional.some('footer');
            }
            else {
                return Optional.none();
            }
        }
    };

    const fromRowsOrColGroups = (elems, getSection) => map(elems, (row) => {
        if (name(row) === 'colgroup') {
            const cells = map(columns$1(row), (column) => {
                const colspan = getAttrValue(column, 'span', 1);
                return detail(column, 1, colspan);
            });
            return rowdetail(row, cells, 'colgroup');
        }
        else {
            const cells$1 = map(cells(row), (cell) => {
                const rowspan = getAttrValue(cell, 'rowspan', 1);
                const colspan = getAttrValue(cell, 'colspan', 1);
                return detail(cell, rowspan, colspan);
            });
            return rowdetail(row, cells$1, getSection(row));
        }
    });
    const getParentSection = (group) => parent(group).map((parent) => {
        const parentName = name(parent);
        return isValidSection(parentName) ? parentName : 'tbody';
    }).getOr('tbody');
    /*
     * Takes a DOM table and returns a list of list of:
       element: row element
       cells: (id, rowspan, colspan) structs
     */
    const fromTable$1 = (table) => {
        const rows$1 = rows(table);
        const columnGroups$1 = columnGroups(table);
        const elems = [...columnGroups$1, ...rows$1];
        return fromRowsOrColGroups(elems, getParentSection);
    };

    const LOCKED_COL_ATTR = 'data-snooker-locked-cols';
    const getLockedColumnsFromTable = (table) => getOpt(table, LOCKED_COL_ATTR)
        .bind((lockedColStr) => Optional.from(lockedColStr.match(/\d+/g)))
        .map((lockedCols) => mapToObject(lockedCols, always));

    const key = (row, column) => {
        return row + ',' + column;
    };
    const getAt = (warehouse, row, column) => Optional.from(warehouse.access[key(row, column)]);
    const findItem = (warehouse, item, comparator) => {
        const filtered = filterItems(warehouse, (detail) => {
            return comparator(item, detail.element);
        });
        return filtered.length > 0 ? Optional.some(filtered[0]) : Optional.none();
    };
    const filterItems = (warehouse, predicate) => {
        const all = bind(warehouse.all, (r) => {
            return r.cells;
        });
        return filter$1(all, predicate);
    };
    const generateColumns = (rowData) => {
        const columnsGroup = {};
        let index = 0;
        each$1(rowData.cells, (column) => {
            const colspan = column.colspan;
            range(colspan, (columnIndex) => {
                const colIndex = index + columnIndex;
                columnsGroup[colIndex] = columnext(column.element, colspan, colIndex);
            });
            index += colspan;
        });
        return columnsGroup;
    };
    /*
     * From a list of list of Detail, generate three pieces of information:
     *  1. the grid size
     *  2. a data structure which can efficiently identify which cell is in which row,column position
     *  3. a list of all cells in order left-to-right, top-to-bottom
     */
    const generate = (list) => {
        // list is an array of objects, made by cells and elements
        // elements: is the TR
        // cells: is an array of objects representing the cells in the row.
        //        It is made of:
        //          colspan (merge cell)
        //          element
        //          rowspan (merge cols)
        const access = {};
        const cells = [];
        const tableOpt = head(list).map((rowData) => rowData.element).bind(table);
        const lockedColumns = tableOpt.bind(getLockedColumnsFromTable).getOr({});
        let maxRows = 0;
        let maxColumns = 0;
        let rowCount = 0;
        const { pass: colgroupRows, fail: rows } = partition(list, (rowData) => rowData.section === 'colgroup');
        // Handle rows first
        each$1(rows, (rowData) => {
            const currentRow = [];
            each$1(rowData.cells, (rowCell) => {
                let start = 0;
                // If this spot has been taken by a previous rowspan, skip it.
                while (access[key(rowCount, start)] !== undefined) {
                    start++;
                }
                const isLocked = hasNonNullableKey(lockedColumns, start.toString());
                const current = extended(rowCell.element, rowCell.rowspan, rowCell.colspan, rowCount, start, isLocked);
                // Occupy all the (row, column) positions that this cell spans for.
                for (let occupiedColumnPosition = 0; occupiedColumnPosition < rowCell.colspan; occupiedColumnPosition++) {
                    for (let occupiedRowPosition = 0; occupiedRowPosition < rowCell.rowspan; occupiedRowPosition++) {
                        const rowPosition = rowCount + occupiedRowPosition;
                        const columnPosition = start + occupiedColumnPosition;
                        const newpos = key(rowPosition, columnPosition);
                        access[newpos] = current;
                        maxColumns = Math.max(maxColumns, columnPosition + 1);
                    }
                }
                currentRow.push(current);
            });
            maxRows++;
            cells.push(rowdetail(rowData.element, currentRow, rowData.section));
            rowCount++;
        });
        // Handle colgroups
        // Note: Currently only a single colgroup is supported so just use the last one
        const { columns, colgroups } = last(colgroupRows).map((rowData) => {
            const columns = generateColumns(rowData);
            const colgroup$1 = colgroup(rowData.element, values(columns));
            return {
                colgroups: [colgroup$1],
                columns
            };
        }).getOrThunk(() => ({
            colgroups: [],
            columns: {}
        }));
        const grid$1 = grid(maxRows, maxColumns);
        return {
            grid: grid$1,
            access,
            all: cells,
            columns,
            colgroups
        };
    };
    const fromTable = (table) => {
        const list = fromTable$1(table);
        return generate(list);
    };
    const justCells = (warehouse) => bind(warehouse.all, (w) => w.cells);
    const justColumns = (warehouse) => values(warehouse.columns);
    const hasColumns = (warehouse) => keys(warehouse.columns).length > 0;
    const getColumnAt = (warehouse, columnIndex) => Optional.from(warehouse.columns[columnIndex]);
    const Warehouse = {
        fromTable,
        generate,
        getAt,
        findItem,
        filterItems,
        justCells,
        justColumns,
        hasColumns,
        getColumnAt
    };

    /*
     * Identify for each column, a cell that has colspan 1. Note, this
     * may actually fail, and future work will be to calculate column
     * sizes that are only available through the difference of two
     * spanning columns.
     */
    const columns = (warehouse, isValidCell = always) => {
        const grid = warehouse.grid;
        const cols = range(grid.columns, identity);
        const rowsArr = range(grid.rows, identity);
        return map(cols, (col) => {
            const getBlock = () => bind(rowsArr, (r) => Warehouse.getAt(warehouse, r, col)
                .filter((detail) => detail.column === col)
                .toArray());
            const isValid = (detail) => detail.colspan === 1 && isValidCell(detail.element);
            const getFallback = () => Warehouse.getAt(warehouse, 0, col);
            return decide(getBlock, isValid, getFallback);
        });
    };
    const decide = (getBlock, isValid, getFallback) => {
        const inBlock = getBlock();
        const validInBlock = find$1(inBlock, isValid);
        const detailOption = validInBlock.orThunk(() => Optional.from(inBlock[0]).orThunk(getFallback));
        return detailOption.map((detail) => detail.element);
    };

    const deduce = (xs, index) => {
        if (index < 0 || index >= xs.length - 1) {
            return Optional.none();
        }
        const current = xs[index].fold(() => {
            const rest = reverse(xs.slice(0, index));
            return findMap(rest, (a, i) => a.map((aa) => ({ value: aa, delta: i + 1 })));
        }, (c) => Optional.some({ value: c, delta: 0 }));
        const next = xs[index + 1].fold(() => {
            const rest = xs.slice(index + 1);
            return findMap(rest, (a, i) => a.map((aa) => ({ value: aa, delta: i + 1 })));
        }, (n) => Optional.some({ value: n, delta: 1 }));
        return current.bind((c) => next.map((n) => {
            const extras = n.delta + c.delta;
            return Math.abs(n.value - c.value) / extras;
        }));
    };

    const colInfo = (col, x) => ({
        col,
        x
    });
    const rtlEdge = (cell) => {
        const pos = absolute(cell);
        return pos.left + getOuter(cell);
    };
    const ltrEdge = (cell) => {
        return absolute(cell).left;
    };
    const getLeftEdge = (index, cell) => {
        return colInfo(index, ltrEdge(cell));
    };
    const getRightEdge = (index, cell) => {
        return colInfo(index, rtlEdge(cell));
    };
    const findPositions = (getInnerEdge, getOuterEdge, array) => {
        if (array.length === 0) {
            return [];
        }
        const lines = map(array.slice(1), (cellOption, index) => {
            return cellOption.map((cell) => {
                return getInnerEdge(index, cell);
            });
        });
        const lastLine = array[array.length - 1].map((cell) => {
            return getOuterEdge(array.length - 1, cell);
        });
        return lines.concat([lastLine]);
    };
    const negate = (step) => {
        return -step;
    };
    const ltr = {
        delta: identity,
        edge: ltrEdge,
        positions: (optElements) => findPositions(getLeftEdge, getRightEdge, optElements)
    };
    const rtl = {
        delta: negate,
        edge: rtlEdge,
        positions: (optElements) => findPositions(getRightEdge, getLeftEdge, optElements)
    };
    const detect = onDirection(ltr, rtl);
    const width = {
        delta: (amount, table) => detect(table).delta(amount, table),
        positions: (cols, table) => detect(table).positions(cols, table),
        edge: (cell) => detect(cell).edge(cell)
    };

    const rPercentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
    const isCol$1 = isTag('col');
    const getPercentSize = (elm, outerGetter, innerGetter) => {
        const relativeParent = parentElement(elm).getOrThunk(() => getBody$1(owner(elm)));
        return outerGetter(elm) / innerGetter(relativeParent) * 100;
    };
    const setPixelWidth = (cell, amount) => {
        set$1(cell, 'width', amount + 'px');
    };
    const setPercentageWidth = (cell, amount) => {
        set$1(cell, 'width', amount + '%');
    };
    const getRaw = (element, prop) => {
        // Try to use the style first, otherwise attempt to get the value from an attribute
        return getRaw$2(element, prop).orThunk(() => {
            return getOpt(element, prop).map((val) => val + 'px');
        });
    };
    const getRawWidth = (element) => getRaw(element, 'width');
    // Get a percentage size for a percentage parent table
    const getPercentageWidth = (cell) => getPercentSize(cell, get$1, getInner);
    const getPixelWidth = (cell) => 
    // For col elements use the computed width as col elements aren't affected by borders, padding, etc...
    isCol$1(cell) ? Math.round(get$1(cell)) : getRuntime(cell);
    const getPercentTableWidth = (table) => getPercentSize(table, get$1, getInner) + '%';
    const percentageBasedSizeRegex = constant(rPercentageBasedSizeRegex);

    const isCol = isTag('col');
    const justCols = (warehouse) => map(Warehouse.justColumns(warehouse), (column) => Optional.from(column.element));
    // Col elements don't have valid computed widths/positions in all browsers, so treat them as invalid in that case
    const isValidColumn = (cell) => {
        const browser = detect$1().browser;
        const supportsColWidths = browser.isChromium() || browser.isFirefox();
        return isCol(cell) ? supportsColWidths : true;
    };
    const getDimension = (cellOpt, index, backups, filter, getter, fallback) => cellOpt.filter(filter).fold(
    // Can't just read the width of a cell, so calculate.
    () => fallback(deduce(backups, index)), (cell) => getter(cell));
    const getWidthFrom = (warehouse, table, getWidth, fallback) => {
        // Only treat a cell as being valid for a column representation if it has a raw width, otherwise we won't be able to calculate the expected width.
        // This is needed as one cell may have a width but others may not, so we need to try and use one with a specified width first.
        const columnCells = columns(warehouse);
        const columns$1 = Warehouse.hasColumns(warehouse) ? justCols(warehouse) : columnCells;
        const backups = [Optional.some(width.edge(table))].concat(map(width.positions(columnCells, table), (pos) => pos.map((p) => p.x)));
        // Only use the width of cells that have no column span (or colspan 1)
        const colFilter = not(hasColspan);
        return map(columns$1, (cellOption, c) => {
            return getDimension(cellOption, c, backups, colFilter, (column) => {
                if (isValidColumn(column)) {
                    return getWidth(column);
                }
                else {
                    // Invalid column so fallback to trying to get the computed width from the cell
                    const cell = bindFrom(columnCells[c], identity);
                    return getDimension(cell, c, backups, colFilter, (cell) => fallback(Optional.some(Math.round(get$1(cell)))), fallback);
                }
            }, fallback);
        });
    };
    const getPercentageWidths = (warehouse, table, tableSize) => {
        return getWidthFrom(warehouse, table, getPercentageWidth, (deduced) => {
            return deduced.fold(() => {
                return tableSize.minCellWidth();
            }, (cellWidth) => {
                return cellWidth / tableSize.pixelWidth() * 100;
            });
        });
    };
    const getPixelWidths = (warehouse, table, tableSize) => {
        return getWidthFrom(warehouse, table, getPixelWidth, (deduced) => {
            // Minimum cell width when all else fails.
            return deduced.getOrThunk(tableSize.minCellWidth);
        });
    };

    const widthLookup = (table, getter) => () => {
        // Use the actual width if attached, otherwise fallback to the raw width
        if (inBody(table)) {
            return getter(table);
        }
        else {
            return parseFloat(getRaw$2(table, 'width').getOr('0'));
        }
    };
    const noneSize = (table) => {
        const getWidth = widthLookup(table, get$1);
        const zero = constant(0);
        const getWidths = (warehouse, tableSize) => getPixelWidths(warehouse, table, tableSize);
        // Note: The 3 delta functions below return 0 to signify a change shouldn't be made
        // however this is currently not used, so may need changing if ever used
        return {
            width: getWidth,
            pixelWidth: getWidth,
            getWidths,
            getCellDelta: zero,
            singleColumnWidth: constant([0]),
            minCellWidth: zero,
            setElementWidth: noop,
            adjustTableWidth: noop,
            isRelative: true,
            label: 'none'
        };
    };
    const percentageSize = (table) => {
        const getFloatWidth = widthLookup(table, (elem) => parseFloat(getPercentTableWidth(elem)));
        const getWidth = widthLookup(table, get$1);
        const getCellDelta = (delta) => delta / getWidth() * 100;
        // If we have one column in a percent based table, that column should be 100% of the width of the table.
        const singleColumnWidth = (w, _delta) => [100 - w];
        // Get the width of a 10 pixel wide cell over the width of the table as a percentage
        const minCellWidth = () => minWidth() / getWidth() * 100;
        const adjustTableWidth = (delta) => {
            const currentWidth = getFloatWidth();
            const change = delta / 100 * currentWidth;
            const newWidth = currentWidth + change;
            setPercentageWidth(table, newWidth);
        };
        const getWidths = (warehouse, tableSize) => getPercentageWidths(warehouse, table, tableSize);
        return {
            width: getFloatWidth,
            pixelWidth: getWidth,
            getWidths,
            getCellDelta,
            singleColumnWidth,
            minCellWidth,
            setElementWidth: setPercentageWidth,
            adjustTableWidth,
            isRelative: true,
            label: 'percent'
        };
    };
    const pixelSize = (table) => {
        const getWidth = widthLookup(table, get$1);
        const getCellDelta = identity;
        const singleColumnWidth = (w, delta) => {
            const newNext = Math.max(minWidth(), w + delta);
            return [newNext - w];
        };
        const adjustTableWidth = (delta) => {
            const newWidth = getWidth() + delta;
            setPixelWidth(table, newWidth);
        };
        const getWidths = (warehouse, tableSize) => getPixelWidths(warehouse, table, tableSize);
        return {
            width: getWidth,
            pixelWidth: getWidth,
            getWidths,
            getCellDelta,
            singleColumnWidth,
            minCellWidth: minWidth,
            setElementWidth: setPixelWidth,
            adjustTableWidth,
            isRelative: false,
            label: 'pixel'
        };
    };
    const chooseSize = (element, width) => {
        const percentMatch = percentageBasedSizeRegex().exec(width);
        if (percentMatch !== null) {
            return percentageSize(element);
        }
        else {
            return pixelSize(element);
        }
    };
    const getTableSize = (table) => {
        const width = getRawWidth(table);
        return width.fold(() => noneSize(table), (w) => chooseSize(table, w));
    };
    const TableSize = {
        getTableSize,
        pixelSize,
        percentageSize,
        noneSize
    };

    const findInWarehouse = (warehouse, element) => findMap(warehouse.all, (r) => find$1(r.cells, (e) => eq(element, e.element)));
    const extractCells = (warehouse, target, predicate) => {
        const details = map(target.selection, (cell$1) => {
            return cell(cell$1)
                .bind((lc) => findInWarehouse(warehouse, lc))
                .filter(predicate);
        });
        const cells = cat(details);
        return someIf(cells.length > 0, cells);
    };
    const onMergable = (_warehouse, target) => target.mergable;
    const onUnmergable = (_warehouse, target) => target.unmergable;
    const onCells = (warehouse, target) => extractCells(warehouse, target, always);
    const isUnlockedTableCell = (warehouse, cell) => findInWarehouse(warehouse, cell).exists((detail) => !detail.isLocked);
    const allUnlocked = (warehouse, cells) => forall(cells, (cell) => isUnlockedTableCell(warehouse, cell));
    // If any locked columns are present in the selection, then don't want to be able to merge
    const onUnlockedMergable = (warehouse, target) => onMergable(warehouse, target).filter((mergeable) => allUnlocked(warehouse, mergeable.cells));
    // If any locked columns are present in the selection, then don't want to be able to unmerge
    const onUnlockedUnmergable = (warehouse, target) => onUnmergable(warehouse, target).filter((cells) => allUnlocked(warehouse, cells));

    const adt = Adt.generate([
        { none: [] },
        { only: ['index'] },
        { left: ['index', 'next'] },
        { middle: ['prev', 'index', 'next'] },
        { right: ['prev', 'index'] }
    ]);
    const ColumnContext = {
        ...adt
    };

    /*
     * Based on the column index, identify the context
     */
    const neighbours = (input, index) => {
        if (input.length === 0) {
            return ColumnContext.none();
        }
        if (input.length === 1) {
            return ColumnContext.only(0);
        }
        if (index === 0) {
            return ColumnContext.left(0, 1);
        }
        if (index === input.length - 1) {
            return ColumnContext.right(index - 1, index);
        }
        if (index > 0 && index < input.length - 1) {
            return ColumnContext.middle(index - 1, index, index + 1);
        }
        return ColumnContext.none();
    };
    /*
     * Calculate the offsets to apply to each column width (not the absolute widths themselves)
     * based on a resize at column: column of step: step
     */
    const determine = (input, column, step, tableSize, resize) => {
        const result = input.slice(0);
        const context = neighbours(input, column);
        const onNone = constant(map(result, constant(0)));
        const onOnly = (index) => tableSize.singleColumnWidth(result[index], step);
        const onLeft = (index, next) => resize.calcLeftEdgeDeltas(result, index, next, step, tableSize.minCellWidth(), tableSize.isRelative);
        const onMiddle = (prev, index, next) => resize.calcMiddleDeltas(result, prev, index, next, step, tableSize.minCellWidth(), tableSize.isRelative);
        // Applies to the last column bar
        const onRight = (prev, index) => resize.calcRightEdgeDeltas(result, prev, index, step, tableSize.minCellWidth(), tableSize.isRelative);
        return context.fold(onNone, onOnly, onLeft, onMiddle, onRight);
    };

    // Returns the sum of elements of measures in the half-open range [start, end)
    // Measures is in pixels, treated as an array of integers or integers in string format.
    // NOTE: beware of accumulated rounding errors over multiple columns - could result in noticeable table width changes
    const total = (start, end, measures) => {
        let r = 0;
        for (let i = start; i < end; i++) {
            r += measures[i] !== undefined ? measures[i] : 0;
        }
        return r;
    };
    // Returns an array of all cells in warehouse with updated cell-widths, using
    // the array 'widths' of the representative widths of each column of the table 'warehouse'
    const recalculateWidthForCells = (warehouse, widths) => {
        const all = Warehouse.justCells(warehouse);
        return map(all, (cell) => {
            // width of a spanning cell is sum of widths of representative columns it spans
            const width = total(cell.column, cell.column + cell.colspan, widths);
            return {
                element: cell.element,
                width,
                colspan: cell.colspan
            };
        });
    };
    const recalculateWidthForColumns = (warehouse, widths) => {
        const groups = Warehouse.justColumns(warehouse);
        return map(groups, (column, index) => ({
            element: column.element,
            width: widths[index],
            colspan: column.colspan
        }));
    };

    const recalculate = (warehouse, widths) => {
        if (Warehouse.hasColumns(warehouse)) {
            return recalculateWidthForColumns(warehouse, widths);
        }
        else {
            return recalculateWidthForCells(warehouse, widths);
        }
    };
    const recalculateAndApply = (warehouse, widths, tableSize) => {
        // Set the width of each cell based on the column widths
        const newSizes = recalculate(warehouse, widths);
        each$1(newSizes, (cell) => {
            tableSize.setElementWidth(cell.element, cell.width);
        });
    };
    const adjustWidth = (table, delta, index, resizing, tableSize) => {
        const warehouse = Warehouse.fromTable(table);
        const step = tableSize.getCellDelta(delta);
        const widths = tableSize.getWidths(warehouse, tableSize);
        const isLastColumn = index === warehouse.grid.columns - 1;
        const clampedStep = resizing.clampTableDelta(widths, index, step, tableSize.minCellWidth(), isLastColumn);
        // Calculate all of the new widths for columns
        const deltas = determine(widths, index, clampedStep, tableSize, resizing);
        const newWidths = map(deltas, (dx, i) => dx + widths[i]);
        recalculateAndApply(warehouse, newWidths, tableSize);
        resizing.resizeTable(tableSize.adjustTableWidth, clampedStep, isLastColumn);
    };

    var TagBoundaries = [
        'body',
        'p',
        'div',
        'article',
        'aside',
        'figcaption',
        'figure',
        'footer',
        'header',
        'nav',
        'section',
        'ol',
        'ul',
        'li',
        'table',
        'thead',
        'tbody',
        'tfoot',
        'caption',
        'tr',
        'td',
        'th',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'pre',
        'address'
    ];

    var DomUniverse = () => {
        const clone$1 = (element) => {
            return SugarElement.fromDom(element.dom.cloneNode(false));
        };
        const document = (element) => documentOrOwner(element).dom;
        const isBoundary = (element) => {
            if (!isElement(element)) {
                return false;
            }
            if (name(element) === 'body') {
                return true;
            }
            return contains$1(TagBoundaries, name(element));
        };
        const isEmptyTag = (element) => {
            if (!isElement(element)) {
                return false;
            }
            return contains$1(['br', 'img', 'hr', 'input'], name(element));
        };
        const isNonEditable = (element) => isElement(element) && get$3(element, 'contenteditable') === 'false';
        const comparePosition = (element, other) => {
            return element.dom.compareDocumentPosition(other.dom);
        };
        const copyAttributesTo = (source, destination) => {
            const as = clone(source);
            setAll(destination, as);
        };
        const isSpecial = (element) => {
            const tag = name(element);
            return contains$1([
                'script', 'noscript', 'iframe', 'noframes', 'noembed', 'title', 'style', 'textarea', 'xmp'
            ], tag);
        };
        const getLanguage = (element) => isElement(element) ? getOpt(element, 'lang') : Optional.none();
        return {
            up: constant({
                selector: ancestor,
                closest: closest$1,
                predicate: ancestor$1,
                all: parents
            }),
            down: constant({
                selector: descendants,
                predicate: descendants$1
            }),
            styles: constant({
                get: get$2,
                getRaw: getRaw$2,
                set: set$1,
                remove: remove
            }),
            attrs: constant({
                get: get$3,
                set: set$2,
                remove: remove$2,
                copyTo: copyAttributesTo
            }),
            insert: constant({
                before: before,
                after: after$1,
                afterAll: after,
                append: append$1,
                appendAll: append,
                prepend: prepend,
                wrap: wrap
            }),
            remove: constant({
                unwrap: unwrap,
                remove: remove$1
            }),
            create: constant({
                nu: SugarElement.fromTag,
                clone: clone$1,
                text: SugarElement.fromText
            }),
            query: constant({
                comparePosition,
                prevSibling: prevSibling,
                nextSibling: nextSibling
            }),
            property: constant({
                children: children$3,
                name: name,
                parent: parent,
                document,
                isText: isText,
                isComment: isComment,
                isElement: isElement,
                isSpecial,
                getLanguage,
                getText: get,
                setText: set,
                isBoundary,
                isEmptyTag,
                isNonEditable
            }),
            eq: eq,
            is: is
        };
    };

    const all = (universe, look, elements, f) => {
        const head = elements[0];
        const tail = elements.slice(1);
        return f(universe, look, head, tail);
    };
    /**
     * Check if look returns the same element for all elements, and return it if it exists.
     */
    const oneAll = (universe, look, elements) => {
        return elements.length > 0 ?
            all(universe, look, elements, unsafeOne) :
            Optional.none();
    };
    const unsafeOne = (universe, look, head, tail) => {
        const start = look(universe, head);
        return foldr(tail, (b, a) => {
            const current = look(universe, a);
            return commonElement(universe, b, current);
        }, start);
    };
    const commonElement = (universe, start, end) => {
        return start.bind((s) => {
            return end.filter(curry(universe.eq, s));
        });
    };

    const sharedOne$1 = oneAll;

    const universe = DomUniverse();
    const sharedOne = (look, elements) => {
        return sharedOne$1(universe, (_universe, element) => {
            return look(element);
        }, elements);
    };

    const opGetRowsType = (table, target) => {
        const house = Warehouse.fromTable(table);
        const details = onCells(house, target);
        return details.bind((selectedCells) => {
            const lastSelectedCell = selectedCells[selectedCells.length - 1];
            const minRowRange = selectedCells[0].row;
            const maxRowRange = lastSelectedCell.row + lastSelectedCell.rowspan;
            const selectedRows = house.all.slice(minRowRange, maxRowRange);
            return findCommonRowType(selectedRows);
        }).getOr('');
    };
    const getRowsType = opGetRowsType;

    // Note, something is *within* if it is completely contained within the bounds.
    const isWithin = (bounds, detail) => {
        return (detail.column >= bounds.startCol &&
            (detail.column + detail.colspan - 1) <= bounds.finishCol &&
            detail.row >= bounds.startRow &&
            (detail.row + detail.rowspan - 1) <= bounds.finishRow);
    };
    const isRectangular = (warehouse, bounds) => {
        let isRect = true;
        const detailIsWithin = curry(isWithin, bounds);
        for (let i = bounds.startRow; i <= bounds.finishRow; i++) {
            for (let j = bounds.startCol; j <= bounds.finishCol; j++) {
                isRect = isRect && Warehouse.getAt(warehouse, i, j).exists(detailIsWithin);
            }
        }
        return isRect ? Optional.some(bounds) : Optional.none();
    };

    const getBounds = (detailA, detailB) => {
        return bounds(Math.min(detailA.row, detailB.row), Math.min(detailA.column, detailB.column), Math.max(detailA.row + detailA.rowspan - 1, detailB.row + detailB.rowspan - 1), Math.max(detailA.column + detailA.colspan - 1, detailB.column + detailB.colspan - 1));
    };
    const getAnyBox = (warehouse, startCell, finishCell) => {
        const startCoords = Warehouse.findItem(warehouse, startCell, eq);
        const finishCoords = Warehouse.findItem(warehouse, finishCell, eq);
        return startCoords.bind((sc) => {
            return finishCoords.map((fc) => {
                return getBounds(sc, fc);
            });
        });
    };
    const getBox$1 = (warehouse, startCell, finishCell) => {
        return getAnyBox(warehouse, startCell, finishCell).bind((bounds) => {
            return isRectangular(warehouse, bounds);
        });
    };

    const getBox = (table, first, last) => {
        const warehouse = getWarehouse(table);
        return getBox$1(warehouse, first, last);
    };
    // Private method ... keep warehouse in snooker, please.
    const getWarehouse = Warehouse.fromTable;

    /*
     NOTE: This file is partially duplicated in the following locations:
      - models/dom/table/core/TableUtils.ts
      - advtable
     Make sure that if making changes to this file, the other files are updated as well
     */
    const getNodeName = (elm) => elm.nodeName.toLowerCase();
    const getBody = (editor) => SugarElement.fromDom(editor.getBody());
    const getIsRoot = (editor) => (element) => eq(element, getBody(editor));
    const removeDataStyle = (table) => {
        const removeStyleAttribute = (element) => remove$2(element, 'data-mce-style');
        removeStyleAttribute(table);
        each$1(cells(table), removeStyleAttribute);
        each$1(columns$1(table), removeStyleAttribute);
        each$1(rows(table), removeStyleAttribute);
    };
    const removePxSuffix = (size) => size ? size.replace(/px$/, '') : '';
    const addPxSuffix = (size) => /^\d+(\.\d+)?$/.test(size) ? size + 'px' : size;
    const getSelectionStart = (editor) => SugarElement.fromDom(editor.selection.getStart());
    const getSelectionEnd = (editor) => SugarElement.fromDom(editor.selection.getEnd());
    const isInEditableContext = (cell) => closest$2(cell, isTag('table')).forall(isEditable);

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    const getTDTHOverallStyle = (dom, elm, name) => {
        const cells = dom.select('td,th', elm);
        let firstChildStyle;
        for (let i = 0; i < cells.length; i++) {
            const currentStyle = dom.getStyle(cells[i], name);
            if (isUndefined(firstChildStyle)) {
                firstChildStyle = currentStyle;
            }
            if (firstChildStyle !== currentStyle) {
                return '';
            }
        }
        return firstChildStyle;
    };
    const setAlign = (editor, elm, name) => {
        // Alignment formats may not use the same styles so ensure to remove any existing horizontal alignment format first
        global$2.each('left center right'.split(' '), (align) => {
            if (align !== name) {
                editor.formatter.remove('align' + align, {}, elm);
            }
        });
        if (name) {
            editor.formatter.apply('align' + name, {}, elm);
        }
    };
    const setVAlign = (editor, elm, name) => {
        // Alignment formats may not use the same styles so ensure to remove any existing vertical alignment format first
        global$2.each('top middle bottom'.split(' '), (align) => {
            if (align !== name) {
                editor.formatter.remove('valign' + align, {}, elm);
            }
        });
        if (name) {
            editor.formatter.apply('valign' + name, {}, elm);
        }
    };

    /*
     NOTE: This file is duplicated in the following locations:
      - core/api/TableEvents.ts
      - models/dom/table/api/Events.ts
      - advtable
     Make sure that if making changes to this file, the other files are updated as well
     */
    const fireTableModified = (editor, table, data) => {
        editor.dispatch('TableModified', { ...data, table });
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.Env');

    const appearanceFields = ['cellspacing', 'cellpadding', 'borderwidth', 'caption'];
    const isAppearanceOptions = (value) => isPlainObject(value) && forall(appearanceFields, (field) => {
        const fieldValue = value[field];
        return isUndefined(fieldValue) || isBoolean(fieldValue);
    });
    const defaultTableToolbar = 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol';
    const defaultCellBorderWidths = range(5, (i) => {
        const size = `${i + 1}px`;
        return { title: size, value: size };
    });
    const defaultCellBorderStyles = map(['Solid', 'Dotted', 'Dashed', 'Double', 'Groove', 'Ridge', 'Inset', 'Outset', 'None', 'Hidden'], (type) => {
        return { title: type, value: type.toLowerCase() };
    });
    // Note: This is also contained in the core Options.ts file
    const defaultWidth = '100%';
    const getPixelForcedWidth = (editor) => {
        // Determine the inner size of the parent block element where the table will be inserted
        const dom = editor.dom;
        const parentBlock = dom.getParent(editor.selection.getStart(), dom.isBlock) ?? editor.getBody();
        return getInner(SugarElement.fromDom(parentBlock)) + 'px';
    };
    // Note: This is also contained in the core Options.ts file
    const determineDefaultStyles = (editor, defaultStyles) => {
        if (isResponsiveForced(editor) || !shouldStyleWithCss(editor)) {
            return defaultStyles;
        }
        else if (isPixelsForced(editor)) {
            return { ...defaultStyles, width: getPixelForcedWidth(editor) };
        }
        else {
            return { ...defaultStyles, width: defaultWidth };
        }
    };
    // Note: This is also contained in the core Options.ts file
    const determineDefaultAttributes = (editor, defaultAttributes) => {
        if (isResponsiveForced(editor) || shouldStyleWithCss(editor)) {
            return defaultAttributes;
        }
        else if (isPixelsForced(editor)) {
            return { ...defaultAttributes, width: getPixelForcedWidth(editor) };
        }
        else {
            return { ...defaultAttributes, width: defaultWidth };
        }
    };
    const option = (name) => (editor) => editor.options.get(name);
    const register = (editor) => {
        const registerOption = editor.options.register;
        registerOption('table_border_widths', {
            processor: 'object[]',
            default: defaultCellBorderWidths
        });
        registerOption('table_border_styles', {
            processor: 'object[]',
            default: defaultCellBorderStyles
        });
        registerOption('table_cell_advtab', {
            processor: 'boolean',
            default: true
        });
        registerOption('table_row_advtab', {
            processor: 'boolean',
            default: true
        });
        registerOption('table_advtab', {
            processor: 'boolean',
            default: true
        });
        registerOption('table_appearance_options', {
            processor: (value) => {
                // Accept boolean value as applied to all options
                if (isBoolean(value)) {
                    return { valid: true, value: mapToObject(appearanceFields, constant(value)) };
                }
                else if (isAppearanceOptions(value)) {
                    return { valid: true, value: mapToObject(appearanceFields, (field) => value[field] !== false) };
                }
                else {
                    return { valid: false, message: `Must be a boolean or an object with boolean values for: ${appearanceFields.join(', ')}.` };
                }
            },
            default: true
        });
        registerOption('table_grid', {
            processor: 'boolean',
            // Table grid relies on hover, which isn't available on touch devices so use the dialog instead
            default: !global$1.deviceType.isTouch()
        });
        registerOption('table_cell_class_list', {
            processor: 'object[]',
            default: []
        });
        registerOption('table_row_class_list', {
            processor: 'object[]',
            default: []
        });
        registerOption('table_class_list', {
            processor: 'object[]',
            default: []
        });
        registerOption('table_toolbar', {
            processor: 'string',
            default: defaultTableToolbar
        });
        registerOption('table_background_color_map', {
            processor: 'object[]',
            default: []
        });
        registerOption('table_border_color_map', {
            processor: 'object[]',
            default: []
        });
    };
    const getTableSizingMode = option('table_sizing_mode');
    const getTableBorderWidths = option('table_border_widths');
    const getTableBorderStyles = option('table_border_styles');
    const hasAdvancedCellTab = option('table_cell_advtab');
    const hasAdvancedRowTab = option('table_row_advtab');
    const hasAdvancedTableTab = option('table_advtab');
    const getAppearanceOptions = option('table_appearance_options');
    const hasTableGrid = option('table_grid');
    const shouldStyleWithCss = option('table_style_by_css');
    const getCellClassList = option('table_cell_class_list');
    const getRowClassList = option('table_row_class_list');
    const getTableClassList = option('table_class_list');
    const getToolbar = option('table_toolbar');
    const getTableBackgroundColorMap = option('table_background_color_map');
    const getTableBorderColorMap = option('table_border_color_map');
    const isPixelsForced = (editor) => getTableSizingMode(editor) === 'fixed';
    const isResponsiveForced = (editor) => getTableSizingMode(editor) === 'responsive';
    const getDefaultStyles = (editor) => {
        // Note: The we don't rely on the default here as we need to dynamically lookup the widths based on the current editor state
        const options = editor.options;
        const defaultStyles = options.get('table_default_styles');
        return options.isSet('table_default_styles') ? defaultStyles : determineDefaultStyles(editor, defaultStyles);
    };
    const getDefaultAttributes = (editor) => {
        // Note: The we don't rely on the default here as we need to dynamically lookup the widths based on the current editor state
        const options = editor.options;
        const defaultAttributes = options.get('table_default_attributes');
        return options.isSet('table_default_attributes') ? defaultAttributes : determineDefaultAttributes(editor, defaultAttributes);
    };

    const lookupTable = (container) => {
        return ancestor(container, 'table');
    };
    const retrieve$1 = (container, selector) => {
        const sels = descendants(container, selector);
        return sels.length > 0 ? Optional.some(sels) : Optional.none();
    };
    const getEdges = (container, firstSelectedSelector, lastSelectedSelector) => {
        return descendant(container, firstSelectedSelector).bind((first) => {
            return descendant(container, lastSelectedSelector).bind((last) => {
                return sharedOne(lookupTable, [first, last]).map((table) => {
                    return {
                        first,
                        last,
                        table
                    };
                });
            });
        });
    };

    // Explicitly calling CellSelection.retrieve so that we can see the API signature.
    const retrieve = (container, selector) => {
        return retrieve$1(container, selector);
    };
    const retrieveBox = (container, firstSelectedSelector, lastSelectedSelector) => {
        return getEdges(container, firstSelectedSelector, lastSelectedSelector).bind((edges) => {
            const isRoot = (ancestor) => {
                return eq(container, ancestor);
            };
            const sectionSelector = 'thead,tfoot,tbody,table';
            const firstAncestor = ancestor(edges.first, sectionSelector, isRoot);
            const lastAncestor = ancestor(edges.last, sectionSelector, isRoot);
            return firstAncestor.bind((fA) => {
                return lastAncestor.bind((lA) => {
                    return eq(fA, lA) ? getBox(edges.table, edges.first, edges.last) : Optional.none();
                });
            });
        });
    };

    const selection = identity;
    const unmergable = (selectedCells) => {
        const hasSpan = (elem, type) => getOpt(elem, type).exists((span) => parseInt(span, 10) > 1);
        const hasRowOrColSpan = (elem) => hasSpan(elem, 'rowspan') || hasSpan(elem, 'colspan');
        return selectedCells.length > 0 && forall(selectedCells, hasRowOrColSpan) ? Optional.some(selectedCells) : Optional.none();
    };
    const mergable = (table, selectedCells, ephemera) => {
        if (selectedCells.length <= 1) {
            return Optional.none();
        }
        else {
            return retrieveBox(table, ephemera.firstSelectedSelector, ephemera.lastSelectedSelector)
                .map((bounds) => ({ bounds, cells: selectedCells }));
        }
    };

    /*
     NOTE: This file is duplicated in the following locations:
      - models/dom/table/selection/Ephemera.ts
      - advtable
     Make sure that if making changes to this file, the other files are updated as well
     */
    const strSelected = 'data-mce-selected';
    const strFirstSelected = 'data-mce-first-selected';
    const strFirstSelectedSelector = 'td[' + strFirstSelected + '],th[' + strFirstSelected + ']';
    const strLastSelected = 'data-mce-last-selected';
    const strLastSelectedSelector = 'td[' + strLastSelected + '],th[' + strLastSelected + ']';
    const ephemera = {
        selected: strSelected,
        firstSelectedSelector: strFirstSelectedSelector,
        lastSelectedSelector: strLastSelectedSelector
    };

    /*
     NOTE: This file is partially duplicated in the following locations:
      - models/dom/table/selection/TableSelection.ts
      - advtable
     Make sure that if making changes to this file, the other files are updated as well
     */
    const getSelectionCellFallback = (element) => table(element).bind((table) => retrieve(table, ephemera.firstSelectedSelector)).fold(constant(element), (cells) => cells[0]);
    const getSelectionFromSelector = (selector) => (initCell, isRoot) => {
        const cellName = name(initCell);
        const cell = cellName === 'col' || cellName === 'colgroup' ? getSelectionCellFallback(initCell) : initCell;
        return closest$1(cell, selector, isRoot);
    };
    const getSelectionCellOrCaption = getSelectionFromSelector('th,td,caption');
    const getSelectionCell = getSelectionFromSelector('th,td');
    const getCellsFromSelection = (editor) => fromDom(editor.model.table.getSelectedCells());
    const getRowsFromSelection = (selected, selector) => {
        const cellOpt = getSelectionCell(selected);
        const rowsOpt = cellOpt.bind((cell) => table(cell))
            .map((table) => rows(table));
        return lift2(cellOpt, rowsOpt, (cell, rows) => filter$1(rows, (row) => exists(fromDom(row.dom.cells), (rowCell) => get$3(rowCell, selector) === '1' || eq(rowCell, cell)))).getOr([]);
    };

    const verticalAlignValues = [
        {
            text: 'None',
            value: ''
        },
        {
            text: 'Top',
            value: 'top'
        },
        {
            text: 'Middle',
            value: 'middle'
        },
        {
            text: 'Bottom',
            value: 'bottom'
        }
    ];

    const hexColour = (value) => ({
        value: normalizeHex(value)
    });
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const isHexString = (hex) => shorthandRegex.test(hex) || longformRegex.test(hex);
    const normalizeHex = (hex) => removeLeading(hex, '#').toUpperCase();
    const fromString$1 = (hex) => isHexString(hex) ? Optional.some({ value: normalizeHex(hex) }) : Optional.none();
    const toHex = (component) => {
        const hex = component.toString(16);
        return (hex.length === 1 ? '0' + hex : hex).toUpperCase();
    };
    const fromRgba = (rgbaColour) => {
        const value = toHex(rgbaColour.red) + toHex(rgbaColour.green) + toHex(rgbaColour.blue);
        return hexColour(value);
    };

    const rgbRegex = /^\s*rgb\s*\(\s*(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)\s*\)\s*$/i;
    // This regex will match rgba(0, 0, 0, 0.5) or rgba(0, 0, 0, 50%) , or without commas
    const rgbaRegex = /^\s*rgba\s*\(\s*(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*((?:\d?\.\d+|\d+)%?)\s*\)\s*$/i;
    const rgbaColour = (red, green, blue, alpha) => ({
        red,
        green,
        blue,
        alpha
    });
    const fromStringValues = (red, green, blue, alpha) => {
        const r = parseInt(red, 10);
        const g = parseInt(green, 10);
        const b = parseInt(blue, 10);
        const a = parseFloat(alpha);
        return rgbaColour(r, g, b, a);
    };
    const fromString = (rgbaString) => {
        const rgbMatch = rgbRegex.exec(rgbaString);
        if (rgbMatch !== null) {
            return Optional.some(fromStringValues(rgbMatch[1], rgbMatch[2], rgbMatch[3], '1'));
        }
        const rgbaMatch = rgbaRegex.exec(rgbaString);
        if (rgbaMatch !== null) {
            return Optional.some(fromStringValues(rgbaMatch[1], rgbaMatch[2], rgbaMatch[3], rgbaMatch[4]));
        }
        return Optional.none();
    };

    const anyToHex = (color) => fromString$1(color)
        .orThunk(() => fromString(color).map(fromRgba))
        .getOrThunk(() => {
        // Not dealing with Hex or RGBA so use a canvas to parse the color
        const canvas = document.createElement('canvas');
        canvas.height = 1;
        canvas.width = 1;
        const canvasContext = canvas.getContext('2d');
        // all valid colors after this point
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        // invalid colors will be shown as white - the first assignment will pass and the second may be ignored
        canvasContext.fillStyle = '#FFFFFF';
        canvasContext.fillStyle = color;
        canvasContext.fillRect(0, 0, 1, 1);
        const rgba = canvasContext.getImageData(0, 0, 1, 1).data;
        const r = rgba[0];
        const g = rgba[1];
        const b = rgba[2];
        const a = rgba[3];
        return fromRgba(rgbaColour(r, g, b, a));
    });
    const rgbaToHexString = (color) => fromString(color)
        .map(fromRgba)
        .map((h) => '#' + h.value)
        .getOr(color);

    const onSetupToggle = (editor, formatName, formatValue) => {
        return (api) => {
            const boundCallback = unbindable();
            const isNone = isEmpty(formatValue);
            const init = () => {
                const selectedCells = getCellsFromSelection(editor);
                const checkNode = (cell) => editor.formatter.match(formatName, { value: formatValue }, cell.dom, isNone);
                // If value is empty (A None-entry in the list), check if the format is not set at all. Otherwise, check if the format is set to the correct value.
                if (isNone) {
                    api.setActive(!exists(selectedCells, checkNode));
                    boundCallback.set(editor.formatter.formatChanged(formatName, (match) => api.setActive(!match), true));
                }
                else {
                    api.setActive(forall(selectedCells, checkNode));
                    boundCallback.set(editor.formatter.formatChanged(formatName, api.setActive, false, { value: formatValue }));
                }
            };
            // The editor may or may not have been setup yet, so check for that
            editor.initialized ? init() : editor.on('init', init);
            return boundCallback.clear;
        };
    };
    const isListGroup = (item) => hasNonNullableKey(item, 'menu');
    const buildListItems = (items) => map(items, (item) => {
        // item.text is not documented - maybe deprecated option we can delete??
        const text = item.text || item.title || '';
        if (isListGroup(item)) {
            return {
                text,
                items: buildListItems(item.menu)
            };
        }
        else {
            return {
                text,
                value: item.value
            };
        }
    });
    const buildClassList = (classList) => {
        if (!classList.length) {
            return Optional.none();
        }
        return Optional.some(buildListItems([{ text: 'Select...', value: 'mce-no-match' }, ...classList]));
    };
    const buildMenuItems = (editor, items, format, onAction) => map(items, (item) => {
        // item.text is not documented - maybe deprecated option we can delete??
        const text = item.text || item.title;
        if (isListGroup(item)) {
            return {
                type: 'nestedmenuitem',
                text,
                getSubmenuItems: () => buildMenuItems(editor, item.menu, format, onAction)
            };
        }
        else {
            return {
                text,
                type: 'togglemenuitem',
                onAction: () => onAction(item.value),
                onSetup: onSetupToggle(editor, format, item.value)
            };
        }
    });
    const applyTableCellStyle = (editor, style) => (value) => {
        editor.execCommand('mceTableApplyCellStyle', false, { [style]: value });
    };
    const filterNoneItem = (list) => bind(list, (item) => {
        if (isListGroup(item)) {
            return [{ ...item, menu: filterNoneItem(item.menu) }];
        }
        else {
            return isNotEmpty(item.value) ? [item] : [];
        }
    });
    const generateMenuItemsCallback = (editor, items, format, onAction) => (callback) => callback(buildMenuItems(editor, items, format, onAction));
    const buildColorMenu = (editor, colorList, style) => {
        const colorMap = map(colorList, (entry) => ({
            text: entry.title,
            value: '#' + anyToHex(entry.value).value,
            type: 'choiceitem'
        }));
        return [{
                type: 'fancymenuitem',
                fancytype: 'colorswatch',
                initData: {
                    colors: colorMap.length > 0 ? colorMap : undefined,
                    allowCustomColors: false
                },
                onAction: (data) => {
                    const value = data.value === 'remove' ? '' : data.value;
                    editor.execCommand('mceTableApplyCellStyle', false, { [style]: value });
                }
            }];
    };
    const changeRowHeader = (editor) => () => {
        const currentType = editor.queryCommandValue('mceTableRowType');
        const newType = currentType === 'header' ? 'body' : 'header';
        editor.execCommand('mceTableRowType', false, { type: newType });
    };
    const changeColumnHeader = (editor) => () => {
        const currentType = editor.queryCommandValue('mceTableColType');
        const newType = currentType === 'th' ? 'td' : 'th';
        editor.execCommand('mceTableColType', false, { type: newType });
    };

    const getClassList$1 = (editor) => buildClassList(getCellClassList(editor))
        .map((items) => ({
        name: 'class',
        type: 'listbox',
        label: 'Class',
        items
    }));
    const children = [
        {
            name: 'width',
            type: 'input',
            label: 'Width'
        },
        {
            name: 'celltype',
            type: 'listbox',
            label: 'Cell type',
            items: [
                { text: 'Cell', value: 'td' },
                { text: 'Header cell', value: 'th' }
            ]
        },
        {
            name: 'scope',
            type: 'listbox',
            label: 'Scope',
            items: [
                { text: 'None', value: '' },
                { text: 'Row', value: 'row' },
                { text: 'Column', value: 'col' },
                { text: 'Row group', value: 'rowgroup' },
                { text: 'Column group', value: 'colgroup' }
            ]
        },
        {
            name: 'halign',
            type: 'listbox',
            label: 'Horizontal align',
            items: [
                { text: 'None', value: '' },
                { text: 'Left', value: 'left' },
                { text: 'Center', value: 'center' },
                { text: 'Right', value: 'right' }
            ]
        },
        {
            name: 'valign',
            type: 'listbox',
            label: 'Vertical align',
            items: verticalAlignValues
        }
    ];
    const getItems$2 = (editor) => children.concat(getClassList$1(editor).toArray());

    const getAdvancedTab = (editor, dialogName) => {
        const emptyBorderStyle = [{ text: 'Select...', value: '' }];
        const advTabItems = [
            {
                name: 'borderstyle',
                type: 'listbox',
                label: 'Border style',
                items: emptyBorderStyle.concat(buildListItems(getTableBorderStyles(editor)))
            },
            {
                name: 'bordercolor',
                type: 'colorinput',
                label: 'Border color'
            },
            {
                name: 'backgroundcolor',
                type: 'colorinput',
                label: 'Background color'
            }
        ];
        const borderWidth = {
            name: 'borderwidth',
            type: 'input',
            label: 'Border width'
        };
        const items = dialogName === 'cell' ? [borderWidth].concat(advTabItems) : advTabItems;
        return {
            title: 'Advanced',
            name: 'advanced',
            items
        };
    };

    // The get node is required here because it can be transformed
    // when switching between tags (e.g. th and td)
    const normal = (editor, element) => {
        const dom = editor.dom;
        const setAttrib = (attr, value) => {
            dom.setAttrib(element, attr, value);
        };
        const setStyle = (prop, value) => {
            dom.setStyle(element, prop, value);
        };
        const setFormat = (formatName, value) => {
            // Remove format if given an empty string
            if (value === '') {
                editor.formatter.remove(formatName, { value: null }, element, true);
            }
            else {
                editor.formatter.apply(formatName, { value }, element);
            }
        };
        return {
            setAttrib,
            setStyle,
            setFormat
        };
    };
    const DomModifier = {
        normal
    };

    const rgbToHex = (value) => startsWith(value, 'rgb') ? rgbaToHexString(value) : value;
    const extractAdvancedStyles = (elm) => {
        const element = SugarElement.fromDom(elm);
        return {
            borderwidth: getRaw$2(element, 'border-width').getOr(''),
            borderstyle: getRaw$2(element, 'border-style').getOr(''),
            bordercolor: getRaw$2(element, 'border-color').map(rgbToHex).getOr(''),
            backgroundcolor: getRaw$2(element, 'background-color').map(rgbToHex).getOr('')
        };
    };
    const getSharedValues = (data) => {
        // TODO surely there's a better way to do this??
        // Mutates baseData to return an object that contains only the values
        // that were the same across all objects in data
        const baseData = data[0];
        const comparisonData = data.slice(1);
        each$1(comparisonData, (items) => {
            each$1(keys(baseData), (key) => {
                each(items, (itemValue, itemKey) => {
                    const comparisonValue = baseData[key];
                    if (comparisonValue !== '' && key === itemKey) {
                        if (comparisonValue !== itemValue) {
                            baseData[key] = key === 'class' ? 'mce-no-match' : '';
                        }
                    }
                });
            });
        });
        return baseData;
    };
    // The extractDataFrom... functions are in this file partly for code reuse and partly so we can test them,
    // because some of these are crazy complicated
    const getAlignment = (formats, formatName, editor, elm) => find$1(formats, (name) => !isUndefined(editor.formatter.matchNode(elm, formatName + name))).getOr('');
    const getHAlignment = curry(getAlignment, ['left', 'center', 'right'], 'align');
    const getVAlignment = curry(getAlignment, ['top', 'middle', 'bottom'], 'valign');
    const extractDataFromSettings = (editor, hasAdvTableTab) => {
        const style = getDefaultStyles(editor);
        const attrs = getDefaultAttributes(editor);
        const extractAdvancedStyleData = () => ({
            borderstyle: get$4(style, 'border-style').getOr(''),
            bordercolor: rgbToHex(get$4(style, 'border-color').getOr('')),
            backgroundcolor: rgbToHex(get$4(style, 'background-color').getOr(''))
        });
        const defaultData = {
            height: '',
            width: '100%',
            cellspacing: '',
            cellpadding: '',
            caption: false,
            class: '',
            align: '',
            border: ''
        };
        const getBorder = () => {
            const borderWidth = style['border-width'];
            if (shouldStyleWithCss(editor) && borderWidth) {
                return { border: borderWidth };
            }
            return get$4(attrs, 'border').fold(() => ({}), (border) => ({ border }));
        };
        const advStyle = (hasAdvTableTab ? extractAdvancedStyleData() : {});
        const getCellPaddingCellSpacing = () => {
            const spacing = get$4(style, 'border-spacing').or(get$4(attrs, 'cellspacing')).fold(() => ({}), (cellspacing) => ({ cellspacing }));
            const padding = get$4(style, 'border-padding').or(get$4(attrs, 'cellpadding')).fold(() => ({}), (cellpadding) => ({ cellpadding }));
            return {
                ...spacing,
                ...padding
            };
        };
        const data = {
            ...defaultData,
            ...style,
            ...attrs,
            ...advStyle,
            ...getBorder(),
            ...getCellPaddingCellSpacing()
        };
        return data;
    };
    const getRowType = (elm) => table(SugarElement.fromDom(elm)).map((table) => {
        const target = { selection: fromDom(elm.cells) };
        return getRowsType(table, target);
    }).getOr('');
    const extractDataFromTableElement = (editor, elm, hasAdvTableTab) => {
        const getBorder = (dom, elm) => {
            // Cases (in order to check):
            // 1. shouldStyleWithCss - extract border-width style if it exists
            // 2. !shouldStyleWithCss && border attribute - set border attribute as value
            // 3. !shouldStyleWithCss && nothing on the table - grab styles from the first th or td
            const optBorderWidth = getRaw$2(SugarElement.fromDom(elm), 'border-width');
            if (shouldStyleWithCss(editor) && optBorderWidth.isSome()) {
                return optBorderWidth.getOr('');
            }
            return dom.getAttrib(elm, 'border') || getTDTHOverallStyle(editor.dom, elm, 'border-width')
                || getTDTHOverallStyle(editor.dom, elm, 'border') || '';
        };
        const dom = editor.dom;
        const cellspacing = shouldStyleWithCss(editor) ?
            dom.getStyle(elm, 'border-spacing') || dom.getAttrib(elm, 'cellspacing') :
            dom.getAttrib(elm, 'cellspacing') || dom.getStyle(elm, 'border-spacing');
        const cellpadding = shouldStyleWithCss(editor) ?
            getTDTHOverallStyle(dom, elm, 'padding') || dom.getAttrib(elm, 'cellpadding') :
            dom.getAttrib(elm, 'cellpadding') || getTDTHOverallStyle(dom, elm, 'padding');
        return {
            width: dom.getStyle(elm, 'width') || dom.getAttrib(elm, 'width'),
            height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
            cellspacing: cellspacing ?? '',
            cellpadding: cellpadding ?? '',
            border: getBorder(dom, elm),
            caption: !!dom.select('caption', elm)[0],
            class: dom.getAttrib(elm, 'class', ''),
            align: getHAlignment(editor, elm),
            ...(hasAdvTableTab ? extractAdvancedStyles(elm) : {})
        };
    };
    const extractDataFromRowElement = (editor, elm, hasAdvancedRowTab) => {
        const dom = editor.dom;
        return {
            height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
            class: dom.getAttrib(elm, 'class', ''),
            type: getRowType(elm),
            align: getHAlignment(editor, elm),
            ...(hasAdvancedRowTab ? extractAdvancedStyles(elm) : {})
        };
    };
    const extractDataFromCellElement = (editor, cell, hasAdvancedCellTab, column) => {
        const dom = editor.dom;
        const colElm = column.getOr(cell);
        const getStyle = (element, style) => dom.getStyle(element, style) || dom.getAttrib(element, style);
        return {
            width: getStyle(colElm, 'width'),
            scope: dom.getAttrib(cell, 'scope'),
            celltype: getNodeName(cell),
            class: dom.getAttrib(cell, 'class', ''),
            halign: getHAlignment(editor, cell),
            valign: getVAlignment(editor, cell),
            ...(hasAdvancedCellTab ? extractAdvancedStyles(cell) : {})
        };
    };

    const getSelectedCells = (table, cells) => {
        const warehouse = Warehouse.fromTable(table);
        const allCells = Warehouse.justCells(warehouse);
        const filtered = filter$1(allCells, (cellA) => exists(cells, (cellB) => eq(cellA.element, cellB)));
        return map(filtered, (cell) => ({
            element: cell.element.dom,
            column: Warehouse.getColumnAt(warehouse, cell.column).map((col) => col.element.dom)
        }));
    };
    const getTargetPixelWidth = (tableSize, width) => parse(width, ['fixed', 'relative', 'empty'])
        .filter(({ value, unit }) => tableSize.label !== 'none' && unit !== 'pt' && value >= 0)
        .map(({ value, unit }) => unit === '%' ? value / 100 * tableSize.pixelWidth() : value);
    const resizeColumns = (table, selectedCells, target, tableSize) => {
        const warehouse = Warehouse.fromTable(table);
        const selectedDetails = bind(selectedCells, (cell) => Warehouse.findItem(warehouse, cell, eq).toArray());
        const ranges = unique(selectedDetails, (a, b) => a.column === b.column && a.colspan === b.colspan);
        const toPixels = (width) => tableSize.label === 'percent' ? width / 100 * tableSize.pixelWidth() : width;
        each$1(ranges, (range) => {
            const widths = tableSize.getWidths(Warehouse.fromTable(table), tableSize);
            const end = range.column + range.colspan - 1;
            const width = foldl(widths.slice(range.column, end + 1), (acc, w) => acc + w, 0);
            const delta = target - toPixels(width);
            if (end < widths.length - 1) {
                adjustWidth(table, delta, end, preserveTable(), tableSize);
            }
            else if (range.column > 0) {
                adjustWidth(table, -delta, range.column - 1, preserveTable(), tableSize);
            }
        });
        return ranges.length > 0;
    };
    const setColumnWidths = (table, selectedCells, width) => {
        const tableSize = TableSize.getTableSize(table);
        return getTargetPixelWidth(tableSize, width).exists((target) => {
            const isApplied = resizeColumns(table, selectedCells, target, tableSize);
            if (isApplied) {
                removeDataStyle(table);
            }
            return isApplied;
        });
    };
    const updateSimpleProps$1 = (modifier, data, shouldUpdate) => {
        if (shouldUpdate('scope')) {
            modifier.setAttrib('scope', data.scope);
        }
        if (shouldUpdate('class') && data.class !== 'mce-no-match') {
            modifier.setAttrib('class', data.class);
        }
    };
    const updateAdvancedProps$1 = (modifier, data, shouldUpdate) => {
        if (shouldUpdate('backgroundcolor')) {
            modifier.setFormat('tablecellbackgroundcolor', data.backgroundcolor);
        }
        if (shouldUpdate('bordercolor')) {
            modifier.setFormat('tablecellbordercolor', data.bordercolor);
        }
        if (shouldUpdate('borderstyle')) {
            modifier.setFormat('tablecellborderstyle', data.borderstyle);
        }
        if (shouldUpdate('borderwidth')) {
            modifier.setFormat('tablecellborderwidth', addPxSuffix(data.borderwidth));
        }
    };
    const applyStyleData$1 = (editor, cells, data, wasChanged, isColumnResized) => {
        const isSingleCell = cells.length === 1;
        each$1(cells, (item) => {
            const cellElm = item.element;
            const shouldOverrideCurrentValue = isSingleCell ? always : wasChanged;
            const modifier = DomModifier.normal(editor, cellElm);
            updateSimpleProps$1(modifier, data, shouldOverrideCurrentValue);
            if (!isColumnResized && shouldOverrideCurrentValue('width')) {
                const colModifier = item.column.map((col) => DomModifier.normal(editor, col)).getOr(modifier);
                colModifier.setStyle('width', addPxSuffix(data.width));
            }
            if (hasAdvancedCellTab(editor)) {
                updateAdvancedProps$1(modifier, data, shouldOverrideCurrentValue);
            }
            // Apply alignment
            if (wasChanged('halign')) {
                setAlign(editor, cellElm, data.halign);
            }
            // Apply vertical alignment
            if (wasChanged('valign')) {
                setVAlign(editor, cellElm, data.valign);
            }
        });
    };
    const applyStructureData$1 = (editor, data) => {
        // Switch cell type if applicable. Note that we specifically tell the command to not fire events
        // as we'll batch the events and fire a `TableModified` event at the end of the updates.
        editor.execCommand('mceTableCellType', false, { type: data.celltype, no_events: true });
    };
    const applyCellData = (editor, cells, oldData, data) => {
        const modifiedData = filter(data, (value, key) => oldData[key] !== value);
        if (size(modifiedData) > 0 && cells.length >= 1) {
            // Retrieve the table before the cells are modified as there is a case where cells
            // are replaced and the reference will be lost when trying to fire events.
            table(cells[0]).each((table) => {
                const selectedCells = getSelectedCells(table, cells);
                // style modified if there's at least one other change apart from 'celltype' and 'scope'
                const styleModified = size(filter(modifiedData, (_value, key) => key !== 'scope' && key !== 'celltype')) > 0;
                const structureModified = has(modifiedData, 'celltype');
                // Update the cells styling using the dialog data
                if (styleModified || has(modifiedData, 'scope')) {
                    const isColumnResized = has(modifiedData, 'width') && setColumnWidths(table, cells, data.width);
                    applyStyleData$1(editor, selectedCells, data, curry(has, modifiedData), isColumnResized);
                }
                // Update the cells structure using the dialog data
                if (structureModified) {
                    applyStructureData$1(editor, data);
                }
                fireTableModified(editor, table.dom, {
                    structure: structureModified,
                    style: styleModified,
                });
            });
        }
    };
    const onSubmitCellForm = (editor, cells, oldData, api) => {
        const data = api.getData();
        api.close();
        editor.undoManager.transact(() => {
            applyCellData(editor, cells, oldData, data);
            editor.focus();
        });
    };
    const getData$1 = (editor, cells) => {
        const cellsData = table(cells[0]).map((table) => map(getSelectedCells(table, cells), (item) => extractDataFromCellElement(editor, item.element, hasAdvancedCellTab(editor), item.column)));
        return getSharedValues(cellsData.getOrDie());
    };
    const open$2 = (editor) => {
        const cells = getCellsFromSelection(editor);
        // Check if there are any cells to operate on
        if (cells.length === 0) {
            return;
        }
        const data = getData$1(editor, cells);
        const dialogTabPanel = {
            type: 'tabpanel',
            tabs: [
                {
                    title: 'General',
                    name: 'general',
                    items: getItems$2(editor)
                },
                getAdvancedTab(editor, 'cell')
            ]
        };
        const dialogPanel = {
            type: 'panel',
            items: [
                {
                    type: 'grid',
                    columns: 2,
                    items: getItems$2(editor)
                }
            ]
        };
        editor.windowManager.open({
            title: 'Cell Properties',
            size: 'normal',
            body: hasAdvancedCellTab(editor) ? dialogTabPanel : dialogPanel,
            buttons: [
                {
                    type: 'cancel',
                    name: 'cancel',
                    text: 'Cancel'
                },
                {
                    type: 'submit',
                    name: 'save',
                    text: 'Save',
                    primary: true
                }
            ],
            initialData: data,
            onSubmit: curry(onSubmitCellForm, editor, cells, data)
        });
    };

    const getClassList = (editor) => buildClassList(getRowClassList(editor))
        .map((items) => ({
        name: 'class',
        type: 'listbox',
        label: 'Class',
        items
    }));
    const formChildren = [
        {
            type: 'listbox',
            name: 'type',
            label: 'Row type',
            items: [
                { text: 'Header', value: 'header' },
                { text: 'Body', value: 'body' },
                { text: 'Footer', value: 'footer' }
            ]
        },
        {
            type: 'listbox',
            name: 'align',
            label: 'Alignment',
            items: [
                { text: 'None', value: '' },
                { text: 'Left', value: 'left' },
                { text: 'Center', value: 'center' },
                { text: 'Right', value: 'right' }
            ]
        },
        {
            label: 'Height',
            name: 'height',
            type: 'input'
        }
    ];
    const getItems$1 = (editor) => formChildren.concat(getClassList(editor).toArray());

    const updateSimpleProps = (modifier, data, shouldUpdate) => {
        if (shouldUpdate('class') && data.class !== 'mce-no-match') {
            modifier.setAttrib('class', data.class);
        }
        if (shouldUpdate('height')) {
            modifier.setStyle('height', addPxSuffix(data.height));
        }
    };
    const updateAdvancedProps = (modifier, data, shouldUpdate) => {
        if (shouldUpdate('backgroundcolor')) {
            modifier.setStyle('background-color', data.backgroundcolor);
        }
        if (shouldUpdate('bordercolor')) {
            modifier.setStyle('border-color', data.bordercolor);
        }
        if (shouldUpdate('borderstyle')) {
            modifier.setStyle('border-style', data.borderstyle);
        }
    };
    const applyStyleData = (editor, rows, data, wasChanged) => {
        const isSingleRow = rows.length === 1;
        const shouldOverrideCurrentValue = isSingleRow ? always : wasChanged;
        each$1(rows, (rowElm) => {
            const rowCells = children$1(SugarElement.fromDom(rowElm), 'td,th');
            const modifier = DomModifier.normal(editor, rowElm);
            updateSimpleProps(modifier, data, shouldOverrideCurrentValue);
            if (hasAdvancedRowTab(editor)) {
                updateAdvancedProps(modifier, data, shouldOverrideCurrentValue);
            }
            // TINY-10617: Simplify number of height styles when applying height on tr
            if (wasChanged('height')) {
                each$1(rowCells, (cell) => {
                    editor.dom.setStyle(cell.dom, 'height', null);
                });
            }
            if (wasChanged('align')) {
                setAlign(editor, rowElm, data.align);
            }
        });
    };
    const applyStructureData = (editor, data) => {
        // Switch cell type if applicable. Note that we specifically tell the command to not fire events
        // as we'll batch the events and fire a `TableModified` event at the end of the updates.
        editor.execCommand('mceTableRowType', false, { type: data.type, no_events: true });
    };
    const applyRowData = (editor, rows, oldData, data) => {
        const modifiedData = filter(data, (value, key) => oldData[key] !== value);
        if (size(modifiedData) > 0) {
            const typeModified = has(modifiedData, 'type');
            // style modified if there's at least one other change apart from 'type'
            const styleModified = typeModified ? size(modifiedData) > 1 : true;
            // Update the rows styling using the dialog data
            if (styleModified) {
                applyStyleData(editor, rows, data, curry(has, modifiedData));
            }
            // Update the rows structure using the dialog data
            if (typeModified) {
                applyStructureData(editor, data);
            }
            table(SugarElement.fromDom(rows[0])).each((table) => fireTableModified(editor, table.dom, {
                structure: typeModified,
                style: styleModified
            }));
        }
    };
    const onSubmitRowForm = (editor, rows, oldData, api) => {
        const data = api.getData();
        api.close();
        editor.undoManager.transact(() => {
            applyRowData(editor, rows, oldData, data);
            editor.focus();
        });
    };
    const open$1 = (editor) => {
        const rows = getRowsFromSelection(getSelectionStart(editor), ephemera.selected);
        // Check if there are any rows to operate on
        if (rows.length === 0) {
            return;
        }
        // Get current data and find shared values between rows
        const rowsData = map(rows, (rowElm) => extractDataFromRowElement(editor, rowElm.dom, hasAdvancedRowTab(editor)));
        const data = getSharedValues(rowsData);
        const dialogTabPanel = {
            type: 'tabpanel',
            tabs: [
                {
                    title: 'General',
                    name: 'general',
                    items: getItems$1(editor)
                },
                getAdvancedTab(editor, 'row')
            ]
        };
        const dialogPanel = {
            type: 'panel',
            items: [
                {
                    type: 'grid',
                    columns: 2,
                    items: getItems$1(editor)
                }
            ]
        };
        editor.windowManager.open({
            title: 'Row Properties',
            size: 'normal',
            body: hasAdvancedRowTab(editor) ? dialogTabPanel : dialogPanel,
            buttons: [
                {
                    type: 'cancel',
                    name: 'cancel',
                    text: 'Cancel'
                },
                {
                    type: 'submit',
                    name: 'save',
                    text: 'Save',
                    primary: true
                }
            ],
            initialData: data,
            onSubmit: curry(onSubmitRowForm, editor, map(rows, (r) => r.dom), data)
        });
    };

    const getItems = (editor, classes, insertNewTable) => {
        const rowColCountItems = !insertNewTable ? [] : [
            {
                type: 'input',
                name: 'cols',
                label: 'Cols',
                inputMode: 'numeric'
            },
            {
                type: 'input',
                name: 'rows',
                label: 'Rows',
                inputMode: 'numeric'
            }
        ];
        const alwaysItems = [
            {
                type: 'input',
                name: 'width',
                label: 'Width'
            },
            {
                type: 'input',
                name: 'height',
                label: 'Height'
            }
        ];
        const appearanceOptions = getAppearanceOptions(editor);
        const appearanceItem = (field, spec) => appearanceOptions[field] ? [spec] : [];
        const appearanceItems = [
            ...appearanceItem('cellspacing', {
                type: 'input',
                name: 'cellspacing',
                label: 'Cell spacing',
                inputMode: 'numeric'
            }),
            ...appearanceItem('cellpadding', {
                type: 'input',
                name: 'cellpadding',
                label: 'Cell padding',
                inputMode: 'numeric'
            }),
            ...appearanceItem('borderwidth', {
                type: 'input',
                name: 'border',
                label: 'Border width'
            }),
            ...appearanceItem('caption', {
                type: 'label',
                label: 'Caption',
                items: [
                    {
                        type: 'checkbox',
                        name: 'caption',
                        label: 'Show caption'
                    }
                ]
            })
        ];
        const alignmentItem = [
            {
                type: 'listbox',
                name: 'align',
                label: 'Alignment',
                items: [
                    { text: 'None', value: '' },
                    { text: 'Left', value: 'left' },
                    { text: 'Center', value: 'center' },
                    { text: 'Right', value: 'right' }
                ]
            }
        ];
        const classListItem = classes.length > 0 ? [
            {
                name: 'class',
                type: 'listbox',
                label: 'Class',
                items: classes
            }
        ] : [];
        return rowColCountItems.concat(alwaysItems).concat(appearanceItems).concat(alignmentItem).concat(classListItem);
    };

    // Explore the layers of the table till we find the first layer of tds or ths
    const styleTDTH = (dom, elm, name, value) => {
        if (elm.tagName === 'TD' || elm.tagName === 'TH') {
            if (isString(name) && isNonNullable(value)) {
                dom.setStyle(elm, name, value);
            }
            else {
                dom.setStyles(elm, name);
            }
        }
        else {
            if (elm.children) {
                for (let i = 0; i < elm.children.length; i++) {
                    styleTDTH(dom, elm.children[i], name, value);
                }
            }
        }
    };
    const defaultKeyToField = {
        'border': 'border',
        'border-width': 'border',
        'cellspacing': 'cellspacing',
        'border-spacing': 'cellspacing',
        'cellpadding': 'cellpadding'
    };
    const getApplicableDefaults = (defaults, data) => filter(defaults, (_value, key) => get$4(defaultKeyToField, key).forall((field) => isNonNullable(data[field])));
    const applyDataToElement = (editor, tableElm, data, shouldApplyOnCell) => {
        const dom = editor.dom;
        const attrs = {};
        const styles = {};
        const shouldStyleWithCss$1 = shouldStyleWithCss(editor);
        const hasAdvancedTableTab$1 = hasAdvancedTableTab(editor);
        const borderIsZero = isNonNullable(data.border) && parseFloat(data.border) === 0;
        if (!isUndefined(data.class) && data.class !== 'mce-no-match') {
            attrs.class = data.class;
        }
        styles.height = addPxSuffix(data.height);
        // TINY-12797: Make sure only CSS width or attribute is applied based on `table_style_by_css` option
        if (shouldStyleWithCss$1) {
            styles.width = addPxSuffix(data.width);
            attrs.width = null;
        }
        else {
            attrs.width = removePxSuffix(data.width);
            styles.width = '';
        }
        if (shouldStyleWithCss$1) {
            if (isNonNullable(data.border)) {
                if (borderIsZero) {
                    attrs.border = 0;
                    styles['border-width'] = '';
                }
                else {
                    styles['border-width'] = addPxSuffix(data.border);
                    attrs.border = 1;
                }
            }
            if (isNonNullable(data.cellspacing)) {
                styles['border-spacing'] = addPxSuffix(data.cellspacing);
            }
        }
        else {
            if (isNonNullable(data.border)) {
                attrs.border = borderIsZero ? 0 : data.border;
            }
            if (isNonNullable(data.cellpadding)) {
                attrs.cellpadding = data.cellpadding;
            }
            if (isNonNullable(data.cellspacing)) {
                attrs.cellspacing = data.cellspacing;
            }
        }
        // TINY-9837: Relevant data are applied on child TD/THs only if they have been modified since the previous dialog submission
        if (shouldStyleWithCss$1 && tableElm.children) {
            const cellStyles = {};
            if (borderIsZero) {
                cellStyles['border-width'] = '';
            }
            else if (shouldApplyOnCell.border && isNonNullable(data.border)) {
                cellStyles['border-width'] = addPxSuffix(data.border);
            }
            if (shouldApplyOnCell.cellpadding && isNonNullable(data.cellpadding)) {
                cellStyles.padding = addPxSuffix(data.cellpadding);
            }
            if (hasAdvancedTableTab$1 && shouldApplyOnCell.bordercolor) {
                cellStyles['border-color'] = data.bordercolor;
            }
            if (!isEmpty$1(cellStyles)) {
                for (let i = 0; i < tableElm.children.length; i++) {
                    styleTDTH(dom, tableElm.children[i], cellStyles);
                }
            }
        }
        if (hasAdvancedTableTab$1) {
            const advData = data;
            styles['background-color'] = advData.backgroundcolor;
            styles['border-color'] = advData.bordercolor;
            styles['border-style'] = advData.borderstyle;
        }
        dom.setStyles(tableElm, { ...getApplicableDefaults(getDefaultStyles(editor), data), ...styles });
        dom.setAttribs(tableElm, { ...getApplicableDefaults(getDefaultAttributes(editor), data), ...attrs });
    };
    const onSubmitTableForm = (editor, tableElm, oldData, api) => {
        const dom = editor.dom;
        const data = api.getData();
        const modifiedData = filter(data, (value, key) => oldData[key] !== value);
        api.close();
        editor.undoManager.transact(() => {
            if (!tableElm) {
                const cols = toInt(data.cols).getOr(1);
                const rows = toInt(data.rows).getOr(1);
                // Cases 1 & 3 - inserting a table
                editor.execCommand('mceInsertTable', false, { rows, columns: cols });
                tableElm = getSelectionCell(getSelectionStart(editor), getIsRoot(editor))
                    .bind((cell) => table(cell, getIsRoot(editor)))
                    .map((table) => table.dom)
                    .getOrDie();
            }
            if (size(modifiedData) > 0) {
                const applicableCellProperties = {
                    border: has(modifiedData, 'border'),
                    bordercolor: has(modifiedData, 'bordercolor'),
                    cellpadding: has(modifiedData, 'cellpadding')
                };
                applyDataToElement(editor, tableElm, data, applicableCellProperties);
                // Toggle caption on/off
                const captionElm = dom.select('caption', tableElm)[0];
                if (isNonNullable(data.caption) && (captionElm && !data.caption || !captionElm && data.caption)) {
                    editor.execCommand('mceTableToggleCaption');
                }
                setAlign(editor, tableElm, data.align);
            }
            editor.focus();
            editor.addVisual();
            if (size(modifiedData) > 0) {
                const captionModified = has(modifiedData, 'caption');
                // style modified if there's at least one other change apart from 'caption'
                const styleModified = captionModified ? size(modifiedData) > 1 : true;
                fireTableModified(editor, tableElm, { structure: captionModified, style: styleModified });
            }
        });
    };
    const open = (editor, insertNewTable) => {
        let tableElm;
        let data = extractDataFromSettings(editor, hasAdvancedTableTab(editor));
        // Cases for creation/update of tables:
        // 1. isNew == true - called by mceInsertTable - we are inserting a new table so we don't care what the selection's parent is,
        //    and we need to add cols and rows input fields to the dialog
        // 2. isNew == false && selection parent is a table - update the table
        // 3. isNew == false && selection parent isn't a table - open dialog with default values and insert a table
        if (insertNewTable) {
            // Case 1 - isNew == true. We're inserting a new table so use defaults and add cols and rows + adv properties.
            data.cols = '1';
            data.rows = '1';
            if (hasAdvancedTableTab(editor)) {
                data.borderstyle = '';
                data.bordercolor = '';
                data.backgroundcolor = '';
            }
        }
        else {
            tableElm = getSelectionCellOrCaption(getSelectionStart(editor), getIsRoot(editor))
                .bind((cellOrCaption) => table(cellOrCaption, getIsRoot(editor)))
                .map((table) => table.dom)
                .getOrNull();
            if (tableElm) {
                // Case 2 - isNew == false && table parent
                data = extractDataFromTableElement(editor, tableElm, hasAdvancedTableTab(editor));
            }
            else {
                // Case 3 - isNew == false && non-table parent. data is set to basic defaults so just add the adv properties if needed
                if (hasAdvancedTableTab(editor)) {
                    data.borderstyle = '';
                    data.bordercolor = '';
                    data.backgroundcolor = '';
                }
            }
        }
        const classes = buildClassList(getTableClassList(editor));
        if (classes.isSome()) {
            if (data.class) {
                data.class = data.class.replace(/\s*mce\-item\-table\s*/g, '');
            }
        }
        const generalPanel = {
            type: 'grid',
            columns: 2,
            items: getItems(editor, classes.getOr([]), insertNewTable)
        };
        const nonAdvancedForm = () => ({
            type: 'panel',
            items: [generalPanel]
        });
        const advancedForm = () => ({
            type: 'tabpanel',
            tabs: [
                {
                    title: 'General',
                    name: 'general',
                    items: [generalPanel]
                },
                getAdvancedTab(editor, 'table')
            ]
        });
        const dialogBody = hasAdvancedTableTab(editor) ? advancedForm() : nonAdvancedForm();
        editor.windowManager.open({
            title: 'Table Properties',
            size: 'normal',
            body: dialogBody,
            onSubmit: curry(onSubmitTableForm, editor, tableElm, data),
            buttons: [
                {
                    type: 'cancel',
                    name: 'cancel',
                    text: 'Cancel'
                },
                {
                    type: 'submit',
                    name: 'save',
                    text: 'Save',
                    primary: true
                }
            ],
            initialData: data
        });
    };

    const registerCommands = (editor) => {
        const runAction = (f) => {
            if (isInEditableContext(getSelectionStart(editor))) {
                f();
            }
        };
        // Register dialog commands
        each({
            // AP-101 TableDialog.open renders a slightly different dialog if isNew is true
            mceTableProps: curry(open, editor, false),
            mceTableRowProps: curry(open$1, editor),
            mceTableCellProps: curry(open$2, editor),
            mceInsertTableDialog: curry(open, editor, true),
        }, (func, name) => editor.addCommand(name, () => runAction(func)));
    };

    /*
     NOTE: This file is partially duplicated in the following locations:
      - models/dom/table/queries/TableTargets.ts
      - advtable
     Make sure that if making changes to this file, the other files are updated as well
     */
    const noMenu = (cell) => ({
        element: cell,
        mergable: Optional.none(),
        unmergable: Optional.none(),
        selection: [cell]
    });
    const forMenu = (selectedCells, table, cell) => ({
        element: cell,
        mergable: mergable(table, selectedCells, ephemera),
        unmergable: unmergable(selectedCells),
        selection: selection(selectedCells)
    });

    const getSelectionTargets = (editor) => {
        const targets = Cell(Optional.none());
        const changeHandlers = Cell([]);
        let selectionDetails = Optional.none();
        const isCaption = isTag('caption');
        const isDisabledForSelection = (key) => selectionDetails.forall((details) => !details[key]);
        const getStart = () => getSelectionCellOrCaption(getSelectionStart(editor), getIsRoot(editor));
        const getEnd = () => getSelectionCellOrCaption(getSelectionEnd(editor), getIsRoot(editor));
        const findTargets = () => getStart().bind((startCellOrCaption) => flatten(lift2(table(startCellOrCaption), getEnd().bind(table), (startTable, endTable) => {
            if (eq(startTable, endTable)) {
                if (isCaption(startCellOrCaption)) {
                    return Optional.some(noMenu(startCellOrCaption));
                }
                else {
                    return Optional.some(forMenu(getCellsFromSelection(editor), startTable, startCellOrCaption));
                }
            }
            return Optional.none();
        })));
        const getExtractedDetails = (targets) => {
            const tableOpt = table(targets.element);
            return tableOpt.map((table) => {
                const warehouse = Warehouse.fromTable(table);
                const selectedCells = onCells(warehouse, targets).getOr([]);
                const locked = foldl(selectedCells, (acc, cell) => {
                    if (cell.isLocked) {
                        acc.onAny = true;
                        if (cell.column === 0) {
                            acc.onFirst = true;
                        }
                        else if (cell.column + cell.colspan >= warehouse.grid.columns) {
                            acc.onLast = true;
                        }
                    }
                    return acc;
                }, { onAny: false, onFirst: false, onLast: false });
                return {
                    mergeable: onUnlockedMergable(warehouse, targets).isSome(),
                    unmergeable: onUnlockedUnmergable(warehouse, targets).isSome(),
                    locked
                };
            });
        };
        const resetTargets = () => {
            // Reset the targets
            targets.set(cached(findTargets)());
            // Reset the selection details
            selectionDetails = targets.get().bind(getExtractedDetails);
            // Trigger change handlers
            each$1(changeHandlers.get(), call);
        };
        const setupHandler = (handler) => {
            // Execute the handler to set the initial state
            handler();
            // Register the handler so we can update the state when resetting targets
            changeHandlers.set(changeHandlers.get().concat([handler]));
            return () => {
                changeHandlers.set(filter$1(changeHandlers.get(), (h) => h !== handler));
            };
        };
        const onSetup = (api, isDisabled) => setupHandler(() => targets.get().fold(() => {
            api.setEnabled(false);
        }, (targets) => {
            api.setEnabled(!isDisabled(targets) && editor.selection.isEditable());
        }));
        const onSetupWithToggle = (api, isDisabled, isActive) => setupHandler(() => targets.get().fold(() => {
            api.setEnabled(false);
            api.setActive(false);
        }, (targets) => {
            api.setEnabled(!isDisabled(targets) && editor.selection.isEditable());
            api.setActive(isActive(targets));
        }));
        const isDisabledFromLocked = (lockedDisable) => selectionDetails.exists((details) => details.locked[lockedDisable]);
        const onSetupTable = (api) => onSetup(api, (_) => false);
        const onSetupCellOrRow = (api) => onSetup(api, (targets) => isCaption(targets.element));
        const onSetupColumn = (lockedDisable) => (api) => onSetup(api, (targets) => isCaption(targets.element) || isDisabledFromLocked(lockedDisable));
        const onSetupPasteable = (getClipboardData) => (api) => onSetup(api, (targets) => isCaption(targets.element) || getClipboardData().isNone());
        const onSetupPasteableColumn = (getClipboardData, lockedDisable) => (api) => onSetup(api, (targets) => isCaption(targets.element) || getClipboardData().isNone() || isDisabledFromLocked(lockedDisable));
        const onSetupMergeable = (api) => onSetup(api, (_targets) => isDisabledForSelection('mergeable'));
        const onSetupUnmergeable = (api) => onSetup(api, (_targets) => isDisabledForSelection('unmergeable'));
        const onSetupTableWithCaption = (api) => {
            return onSetupWithToggle(api, never, (targets) => {
                const tableOpt = table(targets.element, getIsRoot(editor));
                return tableOpt.exists((table) => child(table, 'caption'));
            });
        };
        const onSetupTableHeaders = (command, headerType) => (api) => {
            return onSetupWithToggle(api, (targets) => isCaption(targets.element), () => editor.queryCommandValue(command) === headerType);
        };
        const onSetupTableRowHeaders = onSetupTableHeaders('mceTableRowType', 'header');
        const onSetupTableColumnHeaders = onSetupTableHeaders('mceTableColType', 'th');
        editor.on('NodeChange ExecCommand TableSelectorChange', resetTargets);
        return {
            onSetupTable,
            onSetupCellOrRow,
            onSetupColumn,
            onSetupPasteable,
            onSetupPasteableColumn,
            onSetupMergeable,
            onSetupUnmergeable,
            resetTargets,
            onSetupTableWithCaption,
            onSetupTableRowHeaders,
            onSetupTableColumnHeaders,
            targets: targets.get
        };
    };

    var global = tinymce.util.Tools.resolve('tinymce.FakeClipboard');

    /*
     NOTE: This file is duplicated in the following locations:
      - models/dom/table/api/Clipboard.ts
     Make sure that if making changes to this file, the other files are updated as well
     */
    const tableTypeBase = 'x-tinymce/dom-table-';
    const tableTypeRow = tableTypeBase + 'rows';
    const tableTypeColumn = tableTypeBase + 'columns';
    const getData = (type) => {
        const items = global.read() ?? [];
        return findMap(items, (item) => Optional.from(item.getType(type)));
    };
    const getRows = () => getData(tableTypeRow);
    const getColumns = () => getData(tableTypeColumn);

    const onSetupEditable$1 = (editor) => (api) => {
        const nodeChanged = () => {
            api.setEnabled(editor.selection.isEditable());
        };
        editor.on('NodeChange', nodeChanged);
        nodeChanged();
        return () => {
            editor.off('NodeChange', nodeChanged);
        };
    };
    const addButtons = (editor, selectionTargets) => {
        editor.ui.registry.addMenuButton('table', {
            tooltip: 'Table',
            icon: 'table',
            onSetup: onSetupEditable$1(editor),
            fetch: (callback) => callback('inserttable | cell row column | advtablesort | tableprops deletetable')
        });
        const cmd = (command) => () => editor.execCommand(command);
        // TODO: TINY-8172 Unwind this when an alternative solution is found
        const addButtonIfRegistered = (name, spec) => {
            if (editor.queryCommandSupported(spec.command)) {
                editor.ui.registry.addButton(name, {
                    ...spec,
                    onAction: isFunction(spec.onAction) ? spec.onAction : cmd(spec.command)
                });
            }
        };
        // TODO: TINY-8172 Unwind this when an alternative solution is found
        const addToggleButtonIfRegistered = (name, spec) => {
            if (editor.queryCommandSupported(spec.command)) {
                editor.ui.registry.addToggleButton(name, {
                    ...spec,
                    onAction: isFunction(spec.onAction) ? spec.onAction : cmd(spec.command)
                });
            }
        };
        addButtonIfRegistered('tableprops', {
            tooltip: 'Table properties',
            command: 'mceTableProps',
            icon: 'table',
            onSetup: selectionTargets.onSetupTable
        });
        addButtonIfRegistered('tabledelete', {
            tooltip: 'Delete table',
            command: 'mceTableDelete',
            icon: 'table-delete-table',
            onSetup: selectionTargets.onSetupTable
        });
        addButtonIfRegistered('tablecellprops', {
            tooltip: 'Cell properties',
            command: 'mceTableCellProps',
            icon: 'table-cell-properties',
            onSetup: selectionTargets.onSetupCellOrRow
        });
        addButtonIfRegistered('tablemergecells', {
            tooltip: 'Merge cells',
            command: 'mceTableMergeCells',
            icon: 'table-merge-cells',
            onSetup: selectionTargets.onSetupMergeable
        });
        addButtonIfRegistered('tablesplitcells', {
            tooltip: 'Split cell',
            command: 'mceTableSplitCells',
            icon: 'table-split-cells',
            onSetup: selectionTargets.onSetupUnmergeable
        });
        addButtonIfRegistered('tableinsertrowbefore', {
            tooltip: 'Insert row before',
            command: 'mceTableInsertRowBefore',
            icon: 'table-insert-row-above',
            onSetup: selectionTargets.onSetupCellOrRow
        });
        addButtonIfRegistered('tableinsertrowafter', {
            tooltip: 'Insert row after',
            command: 'mceTableInsertRowAfter',
            icon: 'table-insert-row-after',
            onSetup: selectionTargets.onSetupCellOrRow
        });
        addButtonIfRegistered('tabledeleterow', {
            tooltip: 'Delete row',
            command: 'mceTableDeleteRow',
            icon: 'table-delete-row',
            onSetup: selectionTargets.onSetupCellOrRow
        });
        addButtonIfRegistered('tablerowprops', {
            tooltip: 'Row properties',
            command: 'mceTableRowProps',
            icon: 'table-row-properties',
            onSetup: selectionTargets.onSetupCellOrRow
        });
        addButtonIfRegistered('tableinsertcolbefore', {
            tooltip: 'Insert column before',
            command: 'mceTableInsertColBefore',
            icon: 'table-insert-column-before',
            onSetup: selectionTargets.onSetupColumn("onFirst" /* LockedDisable.onFirst */)
        });
        addButtonIfRegistered('tableinsertcolafter', {
            tooltip: 'Insert column after',
            command: 'mceTableInsertColAfter',
            icon: 'table-insert-column-after',
            onSetup: selectionTargets.onSetupColumn("onLast" /* LockedDisable.onLast */)
        });
        addButtonIfRegistered('tabledeletecol', {
            tooltip: 'Delete column',
            command: 'mceTableDeleteCol',
            icon: 'table-delete-column',
            onSetup: selectionTargets.onSetupColumn("onAny" /* LockedDisable.onAny */)
        });
        addButtonIfRegistered('tablecutrow', {
            tooltip: 'Cut row',
            command: 'mceTableCutRow',
            icon: 'cut-row',
            onSetup: selectionTargets.onSetupCellOrRow
        });
        addButtonIfRegistered('tablecopyrow', {
            tooltip: 'Copy row',
            command: 'mceTableCopyRow',
            icon: 'duplicate-row',
            onSetup: selectionTargets.onSetupCellOrRow
        });
        addButtonIfRegistered('tablepasterowbefore', {
            tooltip: 'Paste row before',
            command: 'mceTablePasteRowBefore',
            icon: 'paste-row-before',
            onSetup: selectionTargets.onSetupPasteable(getRows)
        });
        addButtonIfRegistered('tablepasterowafter', {
            tooltip: 'Paste row after',
            command: 'mceTablePasteRowAfter',
            icon: 'paste-row-after',
            onSetup: selectionTargets.onSetupPasteable(getRows)
        });
        addButtonIfRegistered('tablecutcol', {
            tooltip: 'Cut column',
            command: 'mceTableCutCol',
            icon: 'cut-column',
            onSetup: selectionTargets.onSetupColumn("onAny" /* LockedDisable.onAny */)
        });
        addButtonIfRegistered('tablecopycol', {
            tooltip: 'Copy column',
            command: 'mceTableCopyCol',
            icon: 'duplicate-column',
            onSetup: selectionTargets.onSetupColumn("onAny" /* LockedDisable.onAny */)
        });
        addButtonIfRegistered('tablepastecolbefore', {
            tooltip: 'Paste column before',
            command: 'mceTablePasteColBefore',
            icon: 'paste-column-before',
            onSetup: selectionTargets.onSetupPasteableColumn(getColumns, "onFirst" /* LockedDisable.onFirst */)
        });
        addButtonIfRegistered('tablepastecolafter', {
            tooltip: 'Paste column after',
            command: 'mceTablePasteColAfter',
            icon: 'paste-column-after',
            onSetup: selectionTargets.onSetupPasteableColumn(getColumns, "onLast" /* LockedDisable.onLast */)
        });
        addButtonIfRegistered('tableinsertdialog', {
            tooltip: 'Insert table',
            command: 'mceInsertTableDialog',
            icon: 'table',
            onSetup: onSetupEditable$1(editor)
        });
        const tableClassList = filterNoneItem(getTableClassList(editor));
        if (tableClassList.length !== 0 && editor.queryCommandSupported('mceTableToggleClass')) {
            editor.ui.registry.addMenuButton('tableclass', {
                icon: 'table-classes',
                tooltip: 'Table styles',
                fetch: generateMenuItemsCallback(editor, tableClassList, 'tableclass', (value) => editor.execCommand('mceTableToggleClass', false, value)),
                onSetup: selectionTargets.onSetupTable
            });
        }
        const tableCellClassList = filterNoneItem(getCellClassList(editor));
        if (tableCellClassList.length !== 0 && editor.queryCommandSupported('mceTableCellToggleClass')) {
            editor.ui.registry.addMenuButton('tablecellclass', {
                icon: 'table-cell-classes',
                tooltip: 'Cell styles',
                fetch: generateMenuItemsCallback(editor, tableCellClassList, 'tablecellclass', (value) => editor.execCommand('mceTableCellToggleClass', false, value)),
                onSetup: selectionTargets.onSetupCellOrRow
            });
        }
        // TODO: TINY-8172 Unwind this when an alternative solution is found
        if (editor.queryCommandSupported('mceTableApplyCellStyle')) {
            editor.ui.registry.addMenuButton('tablecellvalign', {
                icon: 'vertical-align',
                tooltip: 'Vertical align',
                fetch: generateMenuItemsCallback(editor, verticalAlignValues, 'tablecellverticalalign', applyTableCellStyle(editor, 'vertical-align')),
                onSetup: selectionTargets.onSetupCellOrRow
            });
            editor.ui.registry.addMenuButton('tablecellborderwidth', {
                icon: 'border-width',
                tooltip: 'Border width',
                fetch: generateMenuItemsCallback(editor, getTableBorderWidths(editor), 'tablecellborderwidth', applyTableCellStyle(editor, 'border-width')),
                onSetup: selectionTargets.onSetupCellOrRow
            });
            editor.ui.registry.addMenuButton('tablecellborderstyle', {
                icon: 'border-style',
                tooltip: 'Border style',
                fetch: generateMenuItemsCallback(editor, getTableBorderStyles(editor), 'tablecellborderstyle', applyTableCellStyle(editor, 'border-style')),
                onSetup: selectionTargets.onSetupCellOrRow
            });
            editor.ui.registry.addMenuButton('tablecellbackgroundcolor', {
                icon: 'cell-background-color',
                tooltip: 'Background color',
                fetch: (callback) => callback(buildColorMenu(editor, getTableBackgroundColorMap(editor), 'background-color')),
                onSetup: selectionTargets.onSetupCellOrRow
            });
            editor.ui.registry.addMenuButton('tablecellbordercolor', {
                icon: 'cell-border-color',
                tooltip: 'Border color',
                fetch: (callback) => callback(buildColorMenu(editor, getTableBorderColorMap(editor), 'border-color')),
                onSetup: selectionTargets.onSetupCellOrRow
            });
        }
        addToggleButtonIfRegistered('tablecaption', {
            tooltip: 'Table caption',
            icon: 'table-caption',
            command: 'mceTableToggleCaption',
            onSetup: selectionTargets.onSetupTableWithCaption
        });
        addToggleButtonIfRegistered('tablerowheader', {
            tooltip: 'Row header',
            icon: 'table-top-header',
            command: 'mceTableRowType',
            onAction: changeRowHeader(editor),
            onSetup: selectionTargets.onSetupTableRowHeaders
        });
        addToggleButtonIfRegistered('tablecolheader', {
            tooltip: 'Column header',
            icon: 'table-left-header',
            command: 'mceTableColType',
            onAction: changeColumnHeader(editor),
            onSetup: selectionTargets.onSetupTableColumnHeaders
        });
    };
    const addToolbars = (editor) => {
        const isEditableTable = (table) => editor.dom.is(table, 'table') && editor.getBody().contains(table) && editor.dom.isEditable(table.parentNode);
        const toolbar = getToolbar(editor);
        if (toolbar.length > 0) {
            editor.ui.registry.addContextToolbar('table', {
                predicate: isEditableTable,
                items: toolbar,
                scope: 'node',
                position: 'node'
            });
        }
    };

    const onSetupEditable = (editor) => (api) => {
        const nodeChanged = () => {
            api.setEnabled(editor.selection.isEditable());
        };
        editor.on('NodeChange', nodeChanged);
        nodeChanged();
        return () => {
            editor.off('NodeChange', nodeChanged);
        };
    };
    const addMenuItems = (editor, selectionTargets) => {
        const cmd = (command) => () => editor.execCommand(command);
        // TODO: TINY-8172 Unwind this when an alternative solution is found
        const addMenuIfRegistered = (name, spec) => {
            if (editor.queryCommandSupported(spec.command)) {
                editor.ui.registry.addMenuItem(name, {
                    ...spec,
                    onAction: isFunction(spec.onAction) ? spec.onAction : cmd(spec.command)
                });
                return true;
            }
            else {
                return false;
            }
        };
        // TODO: TINY-8172 Unwind this when an alternative solution is found
        const addToggleMenuIfRegistered = (name, spec) => {
            if (editor.queryCommandSupported(spec.command)) {
                editor.ui.registry.addToggleMenuItem(name, {
                    ...spec,
                    onAction: isFunction(spec.onAction) ? spec.onAction : cmd(spec.command)
                });
            }
        };
        const insertTableAction = (data) => {
            editor.execCommand('mceInsertTable', false, {
                rows: data.numRows,
                columns: data.numColumns
            });
        };
        const hasRowMenuItems = [
            addMenuIfRegistered('tableinsertrowbefore', {
                text: 'Insert row before',
                icon: 'table-insert-row-above',
                command: 'mceTableInsertRowBefore',
                onSetup: selectionTargets.onSetupCellOrRow
            }),
            addMenuIfRegistered('tableinsertrowafter', {
                text: 'Insert row after',
                icon: 'table-insert-row-after',
                command: 'mceTableInsertRowAfter',
                onSetup: selectionTargets.onSetupCellOrRow
            }),
            addMenuIfRegistered('tabledeleterow', {
                text: 'Delete row',
                icon: 'table-delete-row',
                command: 'mceTableDeleteRow',
                onSetup: selectionTargets.onSetupCellOrRow
            }),
            addMenuIfRegistered('tablerowprops', {
                text: 'Row properties',
                icon: 'table-row-properties',
                command: 'mceTableRowProps',
                onSetup: selectionTargets.onSetupCellOrRow
            }),
            addMenuIfRegistered('tablecutrow', {
                text: 'Cut row',
                icon: 'cut-row',
                command: 'mceTableCutRow',
                onSetup: selectionTargets.onSetupCellOrRow
            }),
            addMenuIfRegistered('tablecopyrow', {
                text: 'Copy row',
                icon: 'duplicate-row',
                command: 'mceTableCopyRow',
                onSetup: selectionTargets.onSetupCellOrRow
            }),
            addMenuIfRegistered('tablepasterowbefore', {
                text: 'Paste row before',
                icon: 'paste-row-before',
                command: 'mceTablePasteRowBefore',
                onSetup: selectionTargets.onSetupPasteable(getRows)
            }),
            addMenuIfRegistered('tablepasterowafter', {
                text: 'Paste row after',
                icon: 'paste-row-after',
                command: 'mceTablePasteRowAfter',
                onSetup: selectionTargets.onSetupPasteable(getRows)
            }),
        ];
        const hasColumnMenuItems = [
            addMenuIfRegistered('tableinsertcolumnbefore', {
                text: 'Insert column before',
                icon: 'table-insert-column-before',
                command: 'mceTableInsertColBefore',
                onSetup: selectionTargets.onSetupColumn("onFirst" /* LockedDisable.onFirst */)
            }),
            addMenuIfRegistered('tableinsertcolumnafter', {
                text: 'Insert column after',
                icon: 'table-insert-column-after',
                command: 'mceTableInsertColAfter',
                onSetup: selectionTargets.onSetupColumn("onLast" /* LockedDisable.onLast */)
            }),
            addMenuIfRegistered('tabledeletecolumn', {
                text: 'Delete column',
                icon: 'table-delete-column',
                command: 'mceTableDeleteCol',
                onSetup: selectionTargets.onSetupColumn("onAny" /* LockedDisable.onAny */)
            }),
            addMenuIfRegistered('tablecutcolumn', {
                text: 'Cut column',
                icon: 'cut-column',
                command: 'mceTableCutCol',
                onSetup: selectionTargets.onSetupColumn("onAny" /* LockedDisable.onAny */)
            }),
            addMenuIfRegistered('tablecopycolumn', {
                text: 'Copy column',
                icon: 'duplicate-column',
                command: 'mceTableCopyCol',
                onSetup: selectionTargets.onSetupColumn("onAny" /* LockedDisable.onAny */)
            }),
            addMenuIfRegistered('tablepastecolumnbefore', {
                text: 'Paste column before',
                icon: 'paste-column-before',
                command: 'mceTablePasteColBefore',
                onSetup: selectionTargets.onSetupPasteableColumn(getColumns, "onFirst" /* LockedDisable.onFirst */)
            }),
            addMenuIfRegistered('tablepastecolumnafter', {
                text: 'Paste column after',
                icon: 'paste-column-after',
                command: 'mceTablePasteColAfter',
                onSetup: selectionTargets.onSetupPasteableColumn(getColumns, "onLast" /* LockedDisable.onLast */)
            }),
        ];
        const hasCellMenuItems = [
            addMenuIfRegistered('tablecellprops', {
                text: 'Cell properties',
                icon: 'table-cell-properties',
                command: 'mceTableCellProps',
                onSetup: selectionTargets.onSetupCellOrRow
            }),
            addMenuIfRegistered('tablemergecells', {
                text: 'Merge cells',
                icon: 'table-merge-cells',
                command: 'mceTableMergeCells',
                onSetup: selectionTargets.onSetupMergeable
            }),
            addMenuIfRegistered('tablesplitcells', {
                text: 'Split cell',
                icon: 'table-split-cells',
                command: 'mceTableSplitCells',
                onSetup: selectionTargets.onSetupUnmergeable
            }),
        ];
        if (!hasTableGrid(editor)) {
            editor.ui.registry.addMenuItem('inserttable', {
                text: 'Table',
                icon: 'table',
                onAction: cmd('mceInsertTableDialog'),
                onSetup: onSetupEditable(editor)
            });
        }
        else {
            editor.ui.registry.addNestedMenuItem('inserttable', {
                text: 'Table',
                icon: 'table',
                getSubmenuItems: () => [{ type: 'fancymenuitem', fancytype: 'inserttable', onAction: insertTableAction }],
                onSetup: onSetupEditable(editor)
            });
        }
        // TINY-3636: We want a way to use the dialog even when tablegrid true.
        // If tablegrid false then inserttable and inserttabledialog are the same,
        // but that's preferrable to breaking things at this point.
        editor.ui.registry.addMenuItem('inserttabledialog', {
            text: 'Insert table',
            icon: 'table',
            onAction: cmd('mceInsertTableDialog'),
            onSetup: onSetupEditable(editor)
        });
        addMenuIfRegistered('tableprops', {
            text: 'Table properties',
            onSetup: selectionTargets.onSetupTable,
            command: 'mceTableProps'
        });
        addMenuIfRegistered('deletetable', {
            text: 'Delete table',
            icon: 'table-delete-table',
            onSetup: selectionTargets.onSetupTable,
            command: 'mceTableDelete'
        });
        // if any of the row menu items returned true
        if (contains$1(hasRowMenuItems, true)) {
            editor.ui.registry.addNestedMenuItem('row', {
                type: 'nestedmenuitem',
                text: 'Row',
                getSubmenuItems: constant('tableinsertrowbefore tableinsertrowafter tabledeleterow tablerowprops | tablecutrow tablecopyrow tablepasterowbefore tablepasterowafter')
            });
        }
        if (contains$1(hasColumnMenuItems, true)) {
            editor.ui.registry.addNestedMenuItem('column', {
                type: 'nestedmenuitem',
                text: 'Column',
                getSubmenuItems: constant('tableinsertcolumnbefore tableinsertcolumnafter tabledeletecolumn | tablecutcolumn tablecopycolumn tablepastecolumnbefore tablepastecolumnafter')
            });
        }
        if (contains$1(hasCellMenuItems, true)) {
            editor.ui.registry.addNestedMenuItem('cell', {
                type: 'nestedmenuitem',
                text: 'Cell',
                getSubmenuItems: constant('tablecellprops tablemergecells tablesplitcells')
            });
        }
        editor.ui.registry.addContextMenu('table', {
            update: () => {
                // context menu fires before node change, so check the selection here first
                selectionTargets.resetTargets();
                // ignoring element since it's monitored elsewhere
                return selectionTargets.targets().fold(constant(''), (targets) => {
                    // If clicking in a caption, then we shouldn't show the cell/row/column options
                    if (name(targets.element) === 'caption') {
                        return 'tableprops deletetable';
                    }
                    else {
                        return 'cell row column | advtablesort | tableprops deletetable';
                    }
                });
            }
        });
        const tableClassList = filterNoneItem(getTableClassList(editor));
        if (tableClassList.length !== 0 && editor.queryCommandSupported('mceTableToggleClass')) {
            editor.ui.registry.addNestedMenuItem('tableclass', {
                icon: 'table-classes',
                text: 'Table styles',
                getSubmenuItems: () => buildMenuItems(editor, tableClassList, 'tableclass', (value) => editor.execCommand('mceTableToggleClass', false, value)),
                onSetup: selectionTargets.onSetupTable
            });
        }
        const tableCellClassList = filterNoneItem(getCellClassList(editor));
        if (tableCellClassList.length !== 0 && editor.queryCommandSupported('mceTableCellToggleClass')) {
            editor.ui.registry.addNestedMenuItem('tablecellclass', {
                icon: 'table-cell-classes',
                text: 'Cell styles',
                getSubmenuItems: () => buildMenuItems(editor, tableCellClassList, 'tablecellclass', (value) => editor.execCommand('mceTableCellToggleClass', false, value)),
                onSetup: selectionTargets.onSetupCellOrRow
            });
        }
        // TODO: TINY-8172 Unwind this when an alternative solution is found
        if (editor.queryCommandSupported('mceTableApplyCellStyle')) {
            editor.ui.registry.addNestedMenuItem('tablecellvalign', {
                icon: 'vertical-align',
                text: 'Vertical align',
                getSubmenuItems: () => buildMenuItems(editor, verticalAlignValues, 'tablecellverticalalign', applyTableCellStyle(editor, 'vertical-align')),
                onSetup: selectionTargets.onSetupCellOrRow
            });
            editor.ui.registry.addNestedMenuItem('tablecellborderwidth', {
                icon: 'border-width',
                text: 'Border width',
                getSubmenuItems: () => buildMenuItems(editor, getTableBorderWidths(editor), 'tablecellborderwidth', applyTableCellStyle(editor, 'border-width')),
                onSetup: selectionTargets.onSetupCellOrRow
            });
            editor.ui.registry.addNestedMenuItem('tablecellborderstyle', {
                icon: 'border-style',
                text: 'Border style',
                getSubmenuItems: () => buildMenuItems(editor, getTableBorderStyles(editor), 'tablecellborderstyle', applyTableCellStyle(editor, 'border-style')),
                onSetup: selectionTargets.onSetupCellOrRow
            });
            editor.ui.registry.addNestedMenuItem('tablecellbackgroundcolor', {
                icon: 'cell-background-color',
                text: 'Background color',
                getSubmenuItems: () => buildColorMenu(editor, getTableBackgroundColorMap(editor), 'background-color'),
                onSetup: selectionTargets.onSetupCellOrRow
            });
            editor.ui.registry.addNestedMenuItem('tablecellbordercolor', {
                icon: 'cell-border-color',
                text: 'Border color',
                getSubmenuItems: () => buildColorMenu(editor, getTableBorderColorMap(editor), 'border-color'),
                onSetup: selectionTargets.onSetupCellOrRow
            });
        }
        addToggleMenuIfRegistered('tablecaption', {
            icon: 'table-caption',
            text: 'Table caption',
            command: 'mceTableToggleCaption',
            onSetup: selectionTargets.onSetupTableWithCaption
        });
        addToggleMenuIfRegistered('tablerowheader', {
            text: 'Row header',
            icon: 'table-top-header',
            command: 'mceTableRowType',
            onAction: changeRowHeader(editor),
            onSetup: selectionTargets.onSetupTableRowHeaders
        });
        addToggleMenuIfRegistered('tablecolheader', {
            text: 'Column header',
            icon: 'table-left-header',
            command: 'mceTableColType',
            onAction: changeColumnHeader(editor),
            onSetup: selectionTargets.onSetupTableRowHeaders
        });
    };

    const PLUGIN_CODE = 'table';
    var Plugin = () => {
        global$3.add(PLUGIN_CODE, (editor) => {
            const selectionTargets = getSelectionTargets(editor);
            register(editor);
            registerCommands(editor);
            addMenuItems(editor, selectionTargets);
            addButtons(editor, selectionTargets);
            addToolbars(editor);
            return {
                getMetadata: () => ({ name: 'Table', type: 'opensource', slug: PLUGIN_CODE })
            };
        });
    };

    Plugin();
    /** *****
     * DO NOT EXPORT ANYTHING
     *
     * IF YOU DO ROLLUP WILL LEAVE A GLOBAL ON THE PAGE
     *******/

})();
