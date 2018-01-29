(function () {
var table = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var noop = function () {
  };
  var noarg = function (f) {
    return function () {
      return f();
    };
  };
  var compose = function (fa, fb) {
    return function () {
      return fa(fb.apply(null, arguments));
    };
  };
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var identity = function (x) {
    return x;
  };
  var tripleEquals = function (a, b) {
    return a === b;
  };
  var curry = function (f) {
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var not = function (f) {
    return function () {
      return !f.apply(null, arguments);
    };
  };
  var die = function (msg) {
    return function () {
      throw new Error(msg);
    };
  };
  var apply = function (f) {
    return f();
  };
  var call = function (f) {
    f();
  };
  var never = constant(false);
  var always = constant(true);
  var $_bypfqijijd08mdsd = {
    noop: noop,
    noarg: noarg,
    compose: compose,
    constant: constant,
    identity: identity,
    tripleEquals: tripleEquals,
    curry: curry,
    not: not,
    die: die,
    apply: apply,
    call: call,
    never: never,
    always: always
  };

  var never$1 = $_bypfqijijd08mdsd.never;
  var always$1 = $_bypfqijijd08mdsd.always;
  var none = function () {
    return NONE;
  };
  var NONE = function () {
    var eq = function (o) {
      return o.isNone();
    };
    var call = function (thunk) {
      return thunk();
    };
    var id = function (n) {
      return n;
    };
    var noop = function () {
    };
    var me = {
      fold: function (n, s) {
        return n();
      },
      is: never$1,
      isSome: never$1,
      isNone: always$1,
      getOr: id,
      getOrThunk: call,
      getOrDie: function (msg) {
        throw new Error(msg || 'error: getOrDie called on none.');
      },
      or: id,
      orThunk: call,
      map: none,
      ap: none,
      each: noop,
      bind: none,
      flatten: none,
      exists: never$1,
      forall: always$1,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
      toString: $_bypfqijijd08mdsd.constant('none()')
    };
    if (Object.freeze)
      Object.freeze(me);
    return me;
  }();
  var some = function (a) {
    var constant_a = function () {
      return a;
    };
    var self = function () {
      return me;
    };
    var map = function (f) {
      return some(f(a));
    };
    var bind = function (f) {
      return f(a);
    };
    var me = {
      fold: function (n, s) {
        return s(a);
      },
      is: function (v) {
        return a === v;
      },
      isSome: always$1,
      isNone: never$1,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      or: self,
      orThunk: self,
      map: map,
      ap: function (optfab) {
        return optfab.fold(none, function (fab) {
          return some(fab(a));
        });
      },
      each: function (f) {
        f(a);
      },
      bind: bind,
      flatten: constant_a,
      exists: bind,
      forall: bind,
      filter: function (f) {
        return f(a) ? me : NONE;
      },
      equals: function (o) {
        return o.is(a);
      },
      equals_: function (o, elementEq) {
        return o.fold(never$1, function (b) {
          return elementEq(a, b);
        });
      },
      toArray: function () {
        return [a];
      },
      toString: function () {
        return 'some(' + a + ')';
      }
    };
    return me;
  };
  var from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
  var $_7bux4mjhjd08mdsb = {
    some: some,
    none: none,
    from: from
  };

  var rawIndexOf = function () {
    var pIndexOf = Array.prototype.indexOf;
    var fastIndex = function (xs, x) {
      return pIndexOf.call(xs, x);
    };
    var slowIndex = function (xs, x) {
      return slowIndexOf(xs, x);
    };
    return pIndexOf === undefined ? slowIndex : fastIndex;
  }();
  var indexOf = function (xs, x) {
    var r = rawIndexOf(xs, x);
    return r === -1 ? $_7bux4mjhjd08mdsb.none() : $_7bux4mjhjd08mdsb.some(r);
  };
  var contains = function (xs, x) {
    return rawIndexOf(xs, x) > -1;
  };
  var exists = function (xs, pred) {
    return findIndex(xs, pred).isSome();
  };
  var range = function (num, f) {
    var r = [];
    for (var i = 0; i < num; i++) {
      r.push(f(i));
    }
    return r;
  };
  var chunk = function (array, size) {
    var r = [];
    for (var i = 0; i < array.length; i += size) {
      var s = array.slice(i, i + size);
      r.push(s);
    }
    return r;
  };
  var map = function (xs, f) {
    var len = xs.length;
    var r = new Array(len);
    for (var i = 0; i < len; i++) {
      var x = xs[i];
      r[i] = f(x, i, xs);
    }
    return r;
  };
  var each = function (xs, f) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var eachr = function (xs, f) {
    for (var i = xs.length - 1; i >= 0; i--) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var partition = function (xs, pred) {
    var pass = [];
    var fail = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      var arr = pred(x, i, xs) ? pass : fail;
      arr.push(x);
    }
    return {
      pass: pass,
      fail: fail
    };
  };
  var filter = function (xs, pred) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        r.push(x);
      }
    }
    return r;
  };
  var groupBy = function (xs, f) {
    if (xs.length === 0) {
      return [];
    } else {
      var wasType = f(xs[0]);
      var r = [];
      var group = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        var type = f(x);
        if (type !== wasType) {
          r.push(group);
          group = [];
        }
        wasType = type;
        group.push(x);
      }
      if (group.length !== 0) {
        r.push(group);
      }
      return r;
    }
  };
  var foldr = function (xs, f, acc) {
    eachr(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var foldl = function (xs, f, acc) {
    each(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var find = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return $_7bux4mjhjd08mdsb.some(x);
      }
    }
    return $_7bux4mjhjd08mdsb.none();
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return $_7bux4mjhjd08mdsb.some(i);
      }
    }
    return $_7bux4mjhjd08mdsb.none();
  };
  var slowIndexOf = function (xs, x) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (xs[i] === x) {
        return i;
      }
    }
    return -1;
  };
  var push = Array.prototype.push;
  var flatten = function (xs) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (!Array.prototype.isPrototypeOf(xs[i]))
        throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
      push.apply(r, xs[i]);
    }
    return r;
  };
  var bind = function (xs, f) {
    var output = map(xs, f);
    return flatten(output);
  };
  var forall = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      var x = xs[i];
      if (pred(x, i, xs) !== true) {
        return false;
      }
    }
    return true;
  };
  var equal = function (a1, a2) {
    return a1.length === a2.length && forall(a1, function (x, i) {
      return x === a2[i];
    });
  };
  var slice = Array.prototype.slice;
  var reverse = function (xs) {
    var r = slice.call(xs, 0);
    r.reverse();
    return r;
  };
  var difference = function (a1, a2) {
    return filter(a1, function (x) {
      return !contains(a2, x);
    });
  };
  var mapToObject = function (xs, f) {
    var r = {};
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      r[String(x)] = f(x, i);
    }
    return r;
  };
  var pure = function (x) {
    return [x];
  };
  var sort = function (xs, comparator) {
    var copy = slice.call(xs, 0);
    copy.sort(comparator);
    return copy;
  };
  var head = function (xs) {
    return xs.length === 0 ? $_7bux4mjhjd08mdsb.none() : $_7bux4mjhjd08mdsb.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? $_7bux4mjhjd08mdsb.none() : $_7bux4mjhjd08mdsb.some(xs[xs.length - 1]);
  };
  var $_aga3rgjgjd08mds5 = {
    map: map,
    each: each,
    eachr: eachr,
    partition: partition,
    filter: filter,
    groupBy: groupBy,
    indexOf: indexOf,
    foldr: foldr,
    foldl: foldl,
    find: find,
    findIndex: findIndex,
    flatten: flatten,
    bind: bind,
    forall: forall,
    exists: exists,
    contains: contains,
    equal: equal,
    reverse: reverse,
    chunk: chunk,
    difference: difference,
    mapToObject: mapToObject,
    pure: pure,
    sort: sort,
    range: range,
    head: head,
    last: last
  };

  var keys = function () {
    var fastKeys = Object.keys;
    var slowKeys = function (o) {
      var r = [];
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          r.push(i);
        }
      }
      return r;
    };
    return fastKeys === undefined ? slowKeys : fastKeys;
  }();
  var each$1 = function (obj, f) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      f(x, i, obj);
    }
  };
  var objectMap = function (obj, f) {
    return tupleMap(obj, function (x, i, obj) {
      return {
        k: i,
        v: f(x, i, obj)
      };
    });
  };
  var tupleMap = function (obj, f) {
    var r = {};
    each$1(obj, function (x, i) {
      var tuple = f(x, i, obj);
      r[tuple.k] = tuple.v;
    });
    return r;
  };
  var bifilter = function (obj, pred) {
    var t = {};
    var f = {};
    each$1(obj, function (x, i) {
      var branch = pred(x, i) ? t : f;
      branch[i] = x;
    });
    return {
      t: t,
      f: f
    };
  };
  var mapToArray = function (obj, f) {
    var r = [];
    each$1(obj, function (value, name) {
      r.push(f(value, name));
    });
    return r;
  };
  var find$1 = function (obj, pred) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      if (pred(x, i, obj)) {
        return $_7bux4mjhjd08mdsb.some(x);
      }
    }
    return $_7bux4mjhjd08mdsb.none();
  };
  var values = function (obj) {
    return mapToArray(obj, function (v) {
      return v;
    });
  };
  var size = function (obj) {
    return values(obj).length;
  };
  var $_f3n2vcjkjd08mdsy = {
    bifilter: bifilter,
    each: each$1,
    map: objectMap,
    mapToArray: mapToArray,
    tupleMap: tupleMap,
    find: find$1,
    keys: keys,
    values: values,
    size: size
  };

  function Immutable () {
    var fields = arguments;
    return function () {
      var values = new Array(arguments.length);
      for (var i = 0; i < values.length; i++)
        values[i] = arguments[i];
      if (fields.length !== values.length)
        throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
      var struct = {};
      $_aga3rgjgjd08mds5.each(fields, function (name, i) {
        struct[name] = $_bypfqijijd08mdsd.constant(values[i]);
      });
      return struct;
    };
  }

  var typeOf = function (x) {
    if (x === null)
      return 'null';
    var t = typeof x;
    if (t === 'object' && Array.prototype.isPrototypeOf(x))
      return 'array';
    if (t === 'object' && String.prototype.isPrototypeOf(x))
      return 'string';
    return t;
  };
  var isType = function (type) {
    return function (value) {
      return typeOf(value) === type;
    };
  };
  var $_aucheejpjd08mdtb = {
    isString: isType('string'),
    isObject: isType('object'),
    isArray: isType('array'),
    isNull: isType('null'),
    isBoolean: isType('boolean'),
    isUndefined: isType('undefined'),
    isFunction: isType('function'),
    isNumber: isType('number')
  };

  var sort$1 = function (arr) {
    return arr.slice(0).sort();
  };
  var reqMessage = function (required, keys) {
    throw new Error('All required keys (' + sort$1(required).join(', ') + ') were not specified. Specified keys were: ' + sort$1(keys).join(', ') + '.');
  };
  var unsuppMessage = function (unsupported) {
    throw new Error('Unsupported keys for object: ' + sort$1(unsupported).join(', '));
  };
  var validateStrArr = function (label, array) {
    if (!$_aucheejpjd08mdtb.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_aga3rgjgjd08mds5.each(array, function (a) {
      if (!$_aucheejpjd08mdtb.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_aga3rgjgjd08mds5.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_ei8ae2jojd08mdt6 = {
    sort: sort$1,
    reqMessage: reqMessage,
    unsuppMessage: unsuppMessage,
    validateStrArr: validateStrArr,
    invalidTypeMessage: invalidTypeMessage,
    checkDupes: checkDupes
  };

  function MixedBag (required, optional) {
    var everything = required.concat(optional);
    if (everything.length === 0)
      throw new Error('You must specify at least one required or optional field.');
    $_ei8ae2jojd08mdt6.validateStrArr('required', required);
    $_ei8ae2jojd08mdt6.validateStrArr('optional', optional);
    $_ei8ae2jojd08mdt6.checkDupes(everything);
    return function (obj) {
      var keys = $_f3n2vcjkjd08mdsy.keys(obj);
      var allReqd = $_aga3rgjgjd08mds5.forall(required, function (req) {
        return $_aga3rgjgjd08mds5.contains(keys, req);
      });
      if (!allReqd)
        $_ei8ae2jojd08mdt6.reqMessage(required, keys);
      var unsupported = $_aga3rgjgjd08mds5.filter(keys, function (key) {
        return !$_aga3rgjgjd08mds5.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_ei8ae2jojd08mdt6.unsuppMessage(unsupported);
      var r = {};
      $_aga3rgjgjd08mds5.each(required, function (req) {
        r[req] = $_bypfqijijd08mdsd.constant(obj[req]);
      });
      $_aga3rgjgjd08mds5.each(optional, function (opt) {
        r[opt] = $_bypfqijijd08mdsd.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? $_7bux4mjhjd08mdsb.some(obj[opt]) : $_7bux4mjhjd08mdsb.none());
      });
      return r;
    };
  }

  var $_2806jejljd08mdt0 = {
    immutable: Immutable,
    immutableBag: MixedBag
  };

  var dimensions = $_2806jejljd08mdt0.immutable('width', 'height');
  var grid = $_2806jejljd08mdt0.immutable('rows', 'columns');
  var address = $_2806jejljd08mdt0.immutable('row', 'column');
  var coords = $_2806jejljd08mdt0.immutable('x', 'y');
  var detail = $_2806jejljd08mdt0.immutable('element', 'rowspan', 'colspan');
  var detailnew = $_2806jejljd08mdt0.immutable('element', 'rowspan', 'colspan', 'isNew');
  var extended = $_2806jejljd08mdt0.immutable('element', 'rowspan', 'colspan', 'row', 'column');
  var rowdata = $_2806jejljd08mdt0.immutable('element', 'cells', 'section');
  var elementnew = $_2806jejljd08mdt0.immutable('element', 'isNew');
  var rowdatanew = $_2806jejljd08mdt0.immutable('element', 'cells', 'section', 'isNew');
  var rowcells = $_2806jejljd08mdt0.immutable('cells', 'section');
  var rowdetails = $_2806jejljd08mdt0.immutable('details', 'section');
  var bounds = $_2806jejljd08mdt0.immutable('startRow', 'startCol', 'finishRow', 'finishCol');
  var $_575rkcjrjd08mdtl = {
    dimensions: dimensions,
    grid: grid,
    address: address,
    coords: coords,
    extended: extended,
    detail: detail,
    detailnew: detailnew,
    rowdata: rowdata,
    elementnew: elementnew,
    rowdatanew: rowdatanew,
    rowcells: rowcells,
    rowdetails: rowdetails,
    bounds: bounds
  };

  var fromHtml = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    if (!div.hasChildNodes() || div.childNodes.length > 1) {
      console.error('HTML does not have a single root node', html);
      throw 'HTML must have a single root node';
    }
    return fromDom(div.childNodes[0]);
  };
  var fromTag = function (tag, scope) {
    var doc = scope || document;
    var node = doc.createElement(tag);
    return fromDom(node);
  };
  var fromText = function (text, scope) {
    var doc = scope || document;
    var node = doc.createTextNode(text);
    return fromDom(node);
  };
  var fromDom = function (node) {
    if (node === null || node === undefined)
      throw new Error('Node cannot be null or undefined');
    return { dom: $_bypfqijijd08mdsd.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return $_7bux4mjhjd08mdsb.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_7kgirujvjd08mdum = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_eueumdjwjd08mdur = {
    ATTRIBUTE: 2,
    CDATA_SECTION: 4,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    ELEMENT: 1,
    TEXT: 3,
    PROCESSING_INSTRUCTION: 7,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    NOTATION: 12
  };

  var ELEMENT = $_eueumdjwjd08mdur.ELEMENT;
  var DOCUMENT = $_eueumdjwjd08mdur.DOCUMENT;
  var is = function (element, selector) {
    var elem = element.dom();
    if (elem.nodeType !== ELEMENT)
      return false;
    else if (elem.matches !== undefined)
      return elem.matches(selector);
    else if (elem.msMatchesSelector !== undefined)
      return elem.msMatchesSelector(selector);
    else if (elem.webkitMatchesSelector !== undefined)
      return elem.webkitMatchesSelector(selector);
    else if (elem.mozMatchesSelector !== undefined)
      return elem.mozMatchesSelector(selector);
    else
      throw new Error('Browser lacks native selectors');
  };
  var bypassSelector = function (dom) {
    return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT || dom.childElementCount === 0;
  };
  var all = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? [] : $_aga3rgjgjd08mds5.map(base.querySelectorAll(selector), $_7kgirujvjd08mdum.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? $_7bux4mjhjd08mdsb.none() : $_7bux4mjhjd08mdsb.from(base.querySelector(selector)).map($_7kgirujvjd08mdum.fromDom);
  };
  var $_2c5fpcjujd08mdug = {
    all: all,
    is: is,
    one: one
  };

  var toArray = function (target, f) {
    var r = [];
    var recurse = function (e) {
      r.push(e);
      return f(e);
    };
    var cur = f(target);
    do {
      cur = cur.bind(recurse);
    } while (cur.isSome());
    return r;
  };
  var $_3upsq2jyjd08mdv3 = { toArray: toArray };

  var global = typeof window !== 'undefined' ? window : Function('return this;')();

  var path = function (parts, scope) {
    var o = scope !== undefined && scope !== null ? scope : global;
    for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
      o = o[parts[i]];
    return o;
  };
  var resolve = function (p, scope) {
    var parts = p.split('.');
    return path(parts, scope);
  };
  var step = function (o, part) {
    if (o[part] === undefined || o[part] === null)
      o[part] = {};
    return o[part];
  };
  var forge = function (parts, target) {
    var o = target !== undefined ? target : global;
    for (var i = 0; i < parts.length; ++i)
      o = step(o, parts[i]);
    return o;
  };
  var namespace = function (name, target) {
    var parts = name.split('.');
    return forge(parts, target);
  };
  var $_64xm8dk2jd08mdvf = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_64xm8dk2jd08mdvf.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_ct0a9yk1jd08mdvc = { getOrDie: getOrDie };

  var node = function () {
    var f = $_ct0a9yk1jd08mdvc.getOrDie('Node');
    return f;
  };
  var compareDocumentPosition = function (a, b, match) {
    return (a.compareDocumentPosition(b) & match) !== 0;
  };
  var documentPositionPreceding = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
  };
  var documentPositionContainedBy = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY);
  };
  var $_5j404nk0jd08mdvb = {
    documentPositionPreceding: documentPositionPreceding,
    documentPositionContainedBy: documentPositionContainedBy
  };

  var cached = function (f) {
    var called = false;
    var r;
    return function () {
      if (!called) {
        called = true;
        r = f.apply(null, arguments);
      }
      return r;
    };
  };
  var $_ej32htk5jd08mdvl = { cached: cached };

  var firstMatch = function (regexes, s) {
    for (var i = 0; i < regexes.length; i++) {
      var x = regexes[i];
      if (x.test(s))
        return x;
    }
    return undefined;
  };
  var find$2 = function (regexes, agent) {
    var r = firstMatch(regexes, agent);
    if (!r)
      return {
        major: 0,
        minor: 0
      };
    var group = function (i) {
      return Number(agent.replace(r, '$' + i));
    };
    return nu(group(1), group(2));
  };
  var detect = function (versionRegexes, agent) {
    var cleanedAgent = String(agent).toLowerCase();
    if (versionRegexes.length === 0)
      return unknown();
    return find$2(versionRegexes, cleanedAgent);
  };
  var unknown = function () {
    return nu(0, 0);
  };
  var nu = function (major, minor) {
    return {
      major: major,
      minor: minor
    };
  };
  var $_552cvbk8jd08mdvt = {
    nu: nu,
    detect: detect,
    unknown: unknown
  };

  var edge = 'Edge';
  var chrome = 'Chrome';
  var ie = 'IE';
  var opera = 'Opera';
  var firefox = 'Firefox';
  var safari = 'Safari';
  var isBrowser = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown$1 = function () {
    return nu$1({
      current: undefined,
      version: $_552cvbk8jd08mdvt.unknown()
    });
  };
  var nu$1 = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isEdge: isBrowser(edge, current),
      isChrome: isBrowser(chrome, current),
      isIE: isBrowser(ie, current),
      isOpera: isBrowser(opera, current),
      isFirefox: isBrowser(firefox, current),
      isSafari: isBrowser(safari, current)
    };
  };
  var $_2gu0rmk7jd08mdvn = {
    unknown: unknown$1,
    nu: nu$1,
    edge: $_bypfqijijd08mdsd.constant(edge),
    chrome: $_bypfqijijd08mdsd.constant(chrome),
    ie: $_bypfqijijd08mdsd.constant(ie),
    opera: $_bypfqijijd08mdsd.constant(opera),
    firefox: $_bypfqijijd08mdsd.constant(firefox),
    safari: $_bypfqijijd08mdsd.constant(safari)
  };

  var windows = 'Windows';
  var ios = 'iOS';
  var android = 'Android';
  var linux = 'Linux';
  var osx = 'OSX';
  var solaris = 'Solaris';
  var freebsd = 'FreeBSD';
  var isOS = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown$2 = function () {
    return nu$2({
      current: undefined,
      version: $_552cvbk8jd08mdvt.unknown()
    });
  };
  var nu$2 = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isWindows: isOS(windows, current),
      isiOS: isOS(ios, current),
      isAndroid: isOS(android, current),
      isOSX: isOS(osx, current),
      isLinux: isOS(linux, current),
      isSolaris: isOS(solaris, current),
      isFreeBSD: isOS(freebsd, current)
    };
  };
  var $_84m002k9jd08mdvv = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_bypfqijijd08mdsd.constant(windows),
    ios: $_bypfqijijd08mdsd.constant(ios),
    android: $_bypfqijijd08mdsd.constant(android),
    linux: $_bypfqijijd08mdsd.constant(linux),
    osx: $_bypfqijijd08mdsd.constant(osx),
    solaris: $_bypfqijijd08mdsd.constant(solaris),
    freebsd: $_bypfqijijd08mdsd.constant(freebsd)
  };

  function DeviceType (os, browser, userAgent) {
    var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
    var isiPhone = os.isiOS() && !isiPad;
    var isAndroid3 = os.isAndroid() && os.version.major === 3;
    var isAndroid4 = os.isAndroid() && os.version.major === 4;
    var isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true;
    var isTouch = os.isiOS() || os.isAndroid();
    var isPhone = isTouch && !isTablet;
    var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
    return {
      isiPad: $_bypfqijijd08mdsd.constant(isiPad),
      isiPhone: $_bypfqijijd08mdsd.constant(isiPhone),
      isTablet: $_bypfqijijd08mdsd.constant(isTablet),
      isPhone: $_bypfqijijd08mdsd.constant(isPhone),
      isTouch: $_bypfqijijd08mdsd.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_bypfqijijd08mdsd.constant(iOSwebview)
    };
  }

  var detect$1 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return $_aga3rgjgjd08mds5.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$1(browsers, userAgent).map(function (browser) {
      var version = $_552cvbk8jd08mdvt.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$1(oses, userAgent).map(function (os) {
      var version = $_552cvbk8jd08mdvt.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_bgkfo3kbjd08mdw1 = {
    detectBrowser: detectBrowser,
    detectOs: detectOs
  };

  var addToStart = function (str, prefix) {
    return prefix + str;
  };
  var addToEnd = function (str, suffix) {
    return str + suffix;
  };
  var removeFromStart = function (str, numChars) {
    return str.substring(numChars);
  };
  var removeFromEnd = function (str, numChars) {
    return str.substring(0, str.length - numChars);
  };
  var $_cttxh4kejd08mdwa = {
    addToStart: addToStart,
    addToEnd: addToEnd,
    removeFromStart: removeFromStart,
    removeFromEnd: removeFromEnd
  };

  var first = function (str, count) {
    return str.substr(0, count);
  };
  var last$1 = function (str, count) {
    return str.substr(str.length - count, str.length);
  };
  var head$1 = function (str) {
    return str === '' ? $_7bux4mjhjd08mdsb.none() : $_7bux4mjhjd08mdsb.some(str.substr(0, 1));
  };
  var tail = function (str) {
    return str === '' ? $_7bux4mjhjd08mdsb.none() : $_7bux4mjhjd08mdsb.some(str.substring(1));
  };
  var $_byqfdnkfjd08mdwb = {
    first: first,
    last: last$1,
    head: head$1,
    tail: tail
  };

  var checkRange = function (str, substr, start) {
    if (substr === '')
      return true;
    if (str.length < substr.length)
      return false;
    var x = str.substr(start, start + substr.length);
    return x === substr;
  };
  var supplant = function (str, obj) {
    var isStringOrNumber = function (a) {
      var t = typeof a;
      return t === 'string' || t === 'number';
    };
    return str.replace(/\${([^{}]*)}/g, function (a, b) {
      var value = obj[b];
      return isStringOrNumber(value) ? value : a;
    });
  };
  var removeLeading = function (str, prefix) {
    return startsWith(str, prefix) ? $_cttxh4kejd08mdwa.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_cttxh4kejd08mdwa.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_cttxh4kejd08mdwa.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_cttxh4kejd08mdwa.addToEnd(str, prefix);
  };
  var contains$1 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_byqfdnkfjd08mdwb.head(str).bind(function (head) {
      return $_byqfdnkfjd08mdwb.tail(str).map(function (tail) {
        return head.toUpperCase() + tail;
      });
    }).getOr(str);
  };
  var startsWith = function (str, prefix) {
    return checkRange(str, prefix, 0);
  };
  var endsWith = function (str, suffix) {
    return checkRange(str, suffix, str.length - suffix.length);
  };
  var trim = function (str) {
    return str.replace(/^\s+|\s+$/g, '');
  };
  var lTrim = function (str) {
    return str.replace(/^\s+/g, '');
  };
  var rTrim = function (str) {
    return str.replace(/\s+$/g, '');
  };
  var $_6o5rnpkdjd08mdw8 = {
    supplant: supplant,
    startsWith: startsWith,
    removeLeading: removeLeading,
    removeTrailing: removeTrailing,
    ensureLeading: ensureLeading,
    ensureTrailing: ensureTrailing,
    endsWith: endsWith,
    contains: contains$1,
    trim: trim,
    lTrim: lTrim,
    rTrim: rTrim,
    capitalize: capitalize
  };

  var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
  var checkContains = function (target) {
    return function (uastring) {
      return $_6o5rnpkdjd08mdw8.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_6o5rnpkdjd08mdw8.contains(uastring, 'edge/') && $_6o5rnpkdjd08mdw8.contains(uastring, 'chrome') && $_6o5rnpkdjd08mdw8.contains(uastring, 'safari') && $_6o5rnpkdjd08mdw8.contains(uastring, 'applewebkit');
        return monstrosity;
      }
    },
    {
      name: 'Chrome',
      versionRegexes: [
        /.*?chrome\/([0-9]+)\.([0-9]+).*/,
        normalVersionRegex
      ],
      search: function (uastring) {
        return $_6o5rnpkdjd08mdw8.contains(uastring, 'chrome') && !$_6o5rnpkdjd08mdw8.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_6o5rnpkdjd08mdw8.contains(uastring, 'msie') || $_6o5rnpkdjd08mdw8.contains(uastring, 'trident');
      }
    },
    {
      name: 'Opera',
      versionRegexes: [
        normalVersionRegex,
        /.*?opera\/([0-9]+)\.([0-9]+).*/
      ],
      search: checkContains('opera')
    },
    {
      name: 'Firefox',
      versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
      search: checkContains('firefox')
    },
    {
      name: 'Safari',
      versionRegexes: [
        normalVersionRegex,
        /.*?cpu os ([0-9]+)_([0-9]+).*/
      ],
      search: function (uastring) {
        return ($_6o5rnpkdjd08mdw8.contains(uastring, 'safari') || $_6o5rnpkdjd08mdw8.contains(uastring, 'mobile/')) && $_6o5rnpkdjd08mdw8.contains(uastring, 'applewebkit');
      }
    }
  ];
  var oses = [
    {
      name: 'Windows',
      search: checkContains('win'),
      versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'iOS',
      search: function (uastring) {
        return $_6o5rnpkdjd08mdw8.contains(uastring, 'iphone') || $_6o5rnpkdjd08mdw8.contains(uastring, 'ipad');
      },
      versionRegexes: [
        /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
        /.*cpu os ([0-9]+)_([0-9]+).*/,
        /.*cpu iphone os ([0-9]+)_([0-9]+).*/
      ]
    },
    {
      name: 'Android',
      search: checkContains('android'),
      versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'OSX',
      search: checkContains('os x'),
      versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
    },
    {
      name: 'Linux',
      search: checkContains('linux'),
      versionRegexes: []
    },
    {
      name: 'Solaris',
      search: checkContains('sunos'),
      versionRegexes: []
    },
    {
      name: 'FreeBSD',
      search: checkContains('freebsd'),
      versionRegexes: []
    }
  ];
  var $_7275jwkcjd08mdw4 = {
    browsers: $_bypfqijijd08mdsd.constant(browsers),
    oses: $_bypfqijijd08mdsd.constant(oses)
  };

  var detect$2 = function (userAgent) {
    var browsers = $_7275jwkcjd08mdw4.browsers();
    var oses = $_7275jwkcjd08mdw4.oses();
    var browser = $_bgkfo3kbjd08mdw1.detectBrowser(browsers, userAgent).fold($_2gu0rmk7jd08mdvn.unknown, $_2gu0rmk7jd08mdvn.nu);
    var os = $_bgkfo3kbjd08mdw1.detectOs(oses, userAgent).fold($_84m002k9jd08mdvv.unknown, $_84m002k9jd08mdvv.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_f9ssj3k6jd08mdvm = { detect: detect$2 };

  var detect$3 = $_ej32htk5jd08mdvl.cached(function () {
    var userAgent = navigator.userAgent;
    return $_f9ssj3k6jd08mdvm.detect(userAgent);
  });
  var $_3c5abbk4jd08mdvj = { detect: detect$3 };

  var eq = function (e1, e2) {
    return e1.dom() === e2.dom();
  };
  var isEqualNode = function (e1, e2) {
    return e1.dom().isEqualNode(e2.dom());
  };
  var member = function (element, elements) {
    return $_aga3rgjgjd08mds5.exists(elements, $_bypfqijijd08mdsd.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_5j404nk0jd08mdvb.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_3c5abbk4jd08mdvj.detect().browser;
  var contains$2 = browser.isIE() ? ieContains : regularContains;
  var $_2bcch9jzjd08mdv4 = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains$2,
    is: $_2c5fpcjujd08mdug.is
  };

  var owner = function (element) {
    return $_7kgirujvjd08mdum.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_7kgirujvjd08mdum.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_7kgirujvjd08mdum.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return $_7bux4mjhjd08mdsb.from(dom.parentNode).map($_7kgirujvjd08mdum.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_aga3rgjgjd08mds5.findIndex(kin, function (elem) {
        return $_2bcch9jzjd08mdv4.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_aucheejpjd08mdtb.isFunction(isRoot) ? isRoot : $_bypfqijijd08mdsd.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_7kgirujvjd08mdum.fromDom(rawParent);
      ret.push(parent);
      if (stop(parent) === true)
        break;
      else
        dom = rawParent;
    }
    return ret;
  };
  var siblings = function (element) {
    var filterSelf = function (elements) {
      return $_aga3rgjgjd08mds5.filter(elements, function (x) {
        return !$_2bcch9jzjd08mdv4.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return $_7bux4mjhjd08mdsb.from(dom.offsetParent).map($_7kgirujvjd08mdum.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return $_7bux4mjhjd08mdsb.from(dom.previousSibling).map($_7kgirujvjd08mdum.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return $_7bux4mjhjd08mdsb.from(dom.nextSibling).map($_7kgirujvjd08mdum.fromDom);
  };
  var prevSiblings = function (element) {
    return $_aga3rgjgjd08mds5.reverse($_3upsq2jyjd08mdv3.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_3upsq2jyjd08mdv3.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_aga3rgjgjd08mds5.map(dom.childNodes, $_7kgirujvjd08mdum.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return $_7bux4mjhjd08mdsb.from(children[index]).map($_7kgirujvjd08mdum.fromDom);
  };
  var firstChild = function (element) {
    return child(element, 0);
  };
  var lastChild = function (element) {
    return child(element, element.dom().childNodes.length - 1);
  };
  var childNodesCount = function (element) {
    return element.dom().childNodes.length;
  };
  var hasChildNodes = function (element) {
    return element.dom().hasChildNodes();
  };
  var spot = $_2806jejljd08mdt0.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_3zqsofjxjd08mdus = {
    owner: owner,
    defaultView: defaultView,
    documentElement: documentElement,
    parent: parent,
    findIndex: findIndex$1,
    parents: parents,
    siblings: siblings,
    prevSibling: prevSibling,
    offsetParent: offsetParent,
    prevSiblings: prevSiblings,
    nextSibling: nextSibling,
    nextSiblings: nextSiblings,
    children: children,
    child: child,
    firstChild: firstChild,
    lastChild: lastChild,
    childNodesCount: childNodesCount,
    hasChildNodes: hasChildNodes,
    leaf: leaf
  };

  var firstLayer = function (scope, selector) {
    return filterFirstLayer(scope, selector, $_bypfqijijd08mdsd.constant(true));
  };
  var filterFirstLayer = function (scope, selector, predicate) {
    return $_aga3rgjgjd08mds5.bind($_3zqsofjxjd08mdus.children(scope), function (x) {
      return $_2c5fpcjujd08mdug.is(x, selector) ? predicate(x) ? [x] : [] : filterFirstLayer(x, selector, predicate);
    });
  };
  var $_1uvtmmjtjd08mdu8 = {
    firstLayer: firstLayer,
    filterFirstLayer: filterFirstLayer
  };

  var name = function (element) {
    var r = element.dom().nodeName;
    return r.toLowerCase();
  };
  var type = function (element) {
    return element.dom().nodeType;
  };
  var value = function (element) {
    return element.dom().nodeValue;
  };
  var isType$1 = function (t) {
    return function (element) {
      return type(element) === t;
    };
  };
  var isComment = function (element) {
    return type(element) === $_eueumdjwjd08mdur.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_eueumdjwjd08mdur.ELEMENT);
  var isText = isType$1($_eueumdjwjd08mdur.TEXT);
  var isDocument = isType$1($_eueumdjwjd08mdur.DOCUMENT);
  var $_c0avgfkhjd08mdwm = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var rawSet = function (dom, key, value) {
    if ($_aucheejpjd08mdtb.isString(value) || $_aucheejpjd08mdtb.isBoolean(value) || $_aucheejpjd08mdtb.isNumber(value)) {
      dom.setAttribute(key, value + '');
    } else {
      console.error('Invalid call to Attr.set. Key ', key, ':: Value ', value, ':: Element ', dom);
      throw new Error('Attribute value was not simple');
    }
  };
  var set = function (element, key, value) {
    rawSet(element.dom(), key, value);
  };
  var setAll = function (element, attrs) {
    var dom = element.dom();
    $_f3n2vcjkjd08mdsy.each(attrs, function (v, k) {
      rawSet(dom, k, v);
    });
  };
  var get = function (element, key) {
    var v = element.dom().getAttribute(key);
    return v === null ? undefined : v;
  };
  var has = function (element, key) {
    var dom = element.dom();
    return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
  };
  var remove = function (element, key) {
    element.dom().removeAttribute(key);
  };
  var hasNone = function (element) {
    var attrs = element.dom().attributes;
    return attrs === undefined || attrs === null || attrs.length === 0;
  };
  var clone = function (element) {
    return $_aga3rgjgjd08mds5.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has(source, attr) && !has(destination, attr))
      set(destination, attr, get(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_c0avgfkhjd08mdwm.isElement(source) || !$_c0avgfkhjd08mdwm.isElement(destination))
      return;
    $_aga3rgjgjd08mds5.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_1vcp6tkgjd08mdwf = {
    clone: clone,
    set: set,
    setAll: setAll,
    get: get,
    has: has,
    remove: remove,
    hasNone: hasNone,
    transfer: transfer
  };

  var inBody = function (element) {
    var dom = $_c0avgfkhjd08mdwm.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_ej32htk5jd08mdvl.cached(function () {
    return getBody($_7kgirujvjd08mdum.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_7kgirujvjd08mdum.fromDom(body);
  };
  var $_en6z86kkjd08mdwr = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var all$1 = function (predicate) {
    return descendants($_en6z86kkjd08mdwr.body(), predicate);
  };
  var ancestors = function (scope, predicate, isRoot) {
    return $_aga3rgjgjd08mds5.filter($_3zqsofjxjd08mdus.parents(scope, isRoot), predicate);
  };
  var siblings$1 = function (scope, predicate) {
    return $_aga3rgjgjd08mds5.filter($_3zqsofjxjd08mdus.siblings(scope), predicate);
  };
  var children$1 = function (scope, predicate) {
    return $_aga3rgjgjd08mds5.filter($_3zqsofjxjd08mdus.children(scope), predicate);
  };
  var descendants = function (scope, predicate) {
    var result = [];
    $_aga3rgjgjd08mds5.each($_3zqsofjxjd08mdus.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants(x, predicate));
    });
    return result;
  };
  var $_f05p7kkjjd08mdwo = {
    all: all$1,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var all$2 = function (selector) {
    return $_2c5fpcjujd08mdug.all(selector);
  };
  var ancestors$1 = function (scope, selector, isRoot) {
    return $_f05p7kkjjd08mdwo.ancestors(scope, function (e) {
      return $_2c5fpcjujd08mdug.is(e, selector);
    }, isRoot);
  };
  var siblings$2 = function (scope, selector) {
    return $_f05p7kkjjd08mdwo.siblings(scope, function (e) {
      return $_2c5fpcjujd08mdug.is(e, selector);
    });
  };
  var children$2 = function (scope, selector) {
    return $_f05p7kkjjd08mdwo.children(scope, function (e) {
      return $_2c5fpcjujd08mdug.is(e, selector);
    });
  };
  var descendants$1 = function (scope, selector) {
    return $_2c5fpcjujd08mdug.all(selector, scope);
  };
  var $_727gtckijd08mdwn = {
    all: all$2,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
    return is(scope, a) ? $_7bux4mjhjd08mdsb.some(scope) : $_aucheejpjd08mdtb.isFunction(isRoot) && isRoot(scope) ? $_7bux4mjhjd08mdsb.none() : ancestor(scope, a, isRoot);
  }

  var first$1 = function (predicate) {
    return descendant($_en6z86kkjd08mdwr.body(), predicate);
  };
  var ancestor = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_aucheejpjd08mdtb.isFunction(isRoot) ? isRoot : $_bypfqijijd08mdsd.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_7kgirujvjd08mdum.fromDom(element);
      if (predicate(el))
        return $_7bux4mjhjd08mdsb.some(el);
      else if (stop(el))
        break;
    }
    return $_7bux4mjhjd08mdsb.none();
  };
  var closest = function (scope, predicate, isRoot) {
    var is = function (scope) {
      return predicate(scope);
    };
    return ClosestOrAncestor(is, ancestor, scope, predicate, isRoot);
  };
  var sibling = function (scope, predicate) {
    var element = scope.dom();
    if (!element.parentNode)
      return $_7bux4mjhjd08mdsb.none();
    return child$1($_7kgirujvjd08mdum.fromDom(element.parentNode), function (x) {
      return !$_2bcch9jzjd08mdv4.eq(scope, x) && predicate(x);
    });
  };
  var child$1 = function (scope, predicate) {
    var result = $_aga3rgjgjd08mds5.find(scope.dom().childNodes, $_bypfqijijd08mdsd.compose(predicate, $_7kgirujvjd08mdum.fromDom));
    return result.map($_7kgirujvjd08mdum.fromDom);
  };
  var descendant = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_7kgirujvjd08mdum.fromDom(element.childNodes[i])))
          return $_7bux4mjhjd08mdsb.some($_7kgirujvjd08mdum.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return $_7bux4mjhjd08mdsb.none();
    };
    return descend(scope.dom());
  };
  var $_743771kmjd08mdwx = {
    first: first$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };

  var first$2 = function (selector) {
    return $_2c5fpcjujd08mdug.one(selector);
  };
  var ancestor$1 = function (scope, selector, isRoot) {
    return $_743771kmjd08mdwx.ancestor(scope, function (e) {
      return $_2c5fpcjujd08mdug.is(e, selector);
    }, isRoot);
  };
  var sibling$1 = function (scope, selector) {
    return $_743771kmjd08mdwx.sibling(scope, function (e) {
      return $_2c5fpcjujd08mdug.is(e, selector);
    });
  };
  var child$2 = function (scope, selector) {
    return $_743771kmjd08mdwx.child(scope, function (e) {
      return $_2c5fpcjujd08mdug.is(e, selector);
    });
  };
  var descendant$1 = function (scope, selector) {
    return $_2c5fpcjujd08mdug.one(selector, scope);
  };
  var closest$1 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_2c5fpcjujd08mdug.is, ancestor$1, scope, selector, isRoot);
  };
  var $_ay6dmzkljd08mdwu = {
    first: first$2,
    ancestor: ancestor$1,
    sibling: sibling$1,
    child: child$2,
    descendant: descendant$1,
    closest: closest$1
  };

  var lookup = function (tags, element, _isRoot) {
    var isRoot = _isRoot !== undefined ? _isRoot : $_bypfqijijd08mdsd.constant(false);
    if (isRoot(element))
      return $_7bux4mjhjd08mdsb.none();
    if ($_aga3rgjgjd08mds5.contains(tags, $_c0avgfkhjd08mdwm.name(element)))
      return $_7bux4mjhjd08mdsb.some(element);
    var isRootOrUpperTable = function (element) {
      return $_2c5fpcjujd08mdug.is(element, 'table') || isRoot(element);
    };
    return $_ay6dmzkljd08mdwu.ancestor(element, tags.join(','), isRootOrUpperTable);
  };
  var cell = function (element, isRoot) {
    return lookup([
      'td',
      'th'
    ], element, isRoot);
  };
  var cells = function (ancestor) {
    return $_1uvtmmjtjd08mdu8.firstLayer(ancestor, 'th,td');
  };
  var notCell = function (element, isRoot) {
    return lookup([
      'caption',
      'tr',
      'tbody',
      'tfoot',
      'thead'
    ], element, isRoot);
  };
  var neighbours = function (selector, element) {
    return $_3zqsofjxjd08mdus.parent(element).map(function (parent) {
      return $_727gtckijd08mdwn.children(parent, selector);
    });
  };
  var neighbourCells = $_bypfqijijd08mdsd.curry(neighbours, 'th,td');
  var neighbourRows = $_bypfqijijd08mdsd.curry(neighbours, 'tr');
  var firstCell = function (ancestor) {
    return $_ay6dmzkljd08mdwu.descendant(ancestor, 'th,td');
  };
  var table = function (element, isRoot) {
    return $_ay6dmzkljd08mdwu.closest(element, 'table', isRoot);
  };
  var row = function (element, isRoot) {
    return lookup(['tr'], element, isRoot);
  };
  var rows = function (ancestor) {
    return $_1uvtmmjtjd08mdu8.firstLayer(ancestor, 'tr');
  };
  var attr = function (element, property) {
    return parseInt($_1vcp6tkgjd08mdwf.get(element, property), 10);
  };
  var grid$1 = function (element, rowProp, colProp) {
    var rows = attr(element, rowProp);
    var cols = attr(element, colProp);
    return $_575rkcjrjd08mdtl.grid(rows, cols);
  };
  var $_915052jsjd08mdtp = {
    cell: cell,
    firstCell: firstCell,
    cells: cells,
    neighbourCells: neighbourCells,
    table: table,
    row: row,
    rows: rows,
    notCell: notCell,
    neighbourRows: neighbourRows,
    attr: attr,
    grid: grid$1
  };

  var fromTable = function (table) {
    var rows = $_915052jsjd08mdtp.rows(table);
    return $_aga3rgjgjd08mds5.map(rows, function (row) {
      var element = row;
      var parent = $_3zqsofjxjd08mdus.parent(element);
      var parentSection = parent.bind(function (parent) {
        var parentName = $_c0avgfkhjd08mdwm.name(parent);
        return parentName === 'tfoot' || parentName === 'thead' || parentName === 'tbody' ? parentName : 'tbody';
      });
      var cells = $_aga3rgjgjd08mds5.map($_915052jsjd08mdtp.cells(row), function (cell) {
        var rowspan = $_1vcp6tkgjd08mdwf.has(cell, 'rowspan') ? parseInt($_1vcp6tkgjd08mdwf.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_1vcp6tkgjd08mdwf.has(cell, 'colspan') ? parseInt($_1vcp6tkgjd08mdwf.get(cell, 'colspan'), 10) : 1;
        return $_575rkcjrjd08mdtl.detail(cell, rowspan, colspan);
      });
      return $_575rkcjrjd08mdtl.rowdata(element, cells, parentSection);
    });
  };
  var fromPastedRows = function (rows, example) {
    return $_aga3rgjgjd08mds5.map(rows, function (row) {
      var cells = $_aga3rgjgjd08mds5.map($_915052jsjd08mdtp.cells(row), function (cell) {
        var rowspan = $_1vcp6tkgjd08mdwf.has(cell, 'rowspan') ? parseInt($_1vcp6tkgjd08mdwf.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_1vcp6tkgjd08mdwf.has(cell, 'colspan') ? parseInt($_1vcp6tkgjd08mdwf.get(cell, 'colspan'), 10) : 1;
        return $_575rkcjrjd08mdtl.detail(cell, rowspan, colspan);
      });
      return $_575rkcjrjd08mdtl.rowdata(row, cells, example.section());
    });
  };
  var $_48r5ifjqjd08mdte = {
    fromTable: fromTable,
    fromPastedRows: fromPastedRows
  };

  var key = function (row, column) {
    return row + ',' + column;
  };
  var getAt = function (warehouse, row, column) {
    var raw = warehouse.access()[key(row, column)];
    return raw !== undefined ? $_7bux4mjhjd08mdsb.some(raw) : $_7bux4mjhjd08mdsb.none();
  };
  var findItem = function (warehouse, item, comparator) {
    var filtered = filterItems(warehouse, function (detail) {
      return comparator(item, detail.element());
    });
    return filtered.length > 0 ? $_7bux4mjhjd08mdsb.some(filtered[0]) : $_7bux4mjhjd08mdsb.none();
  };
  var filterItems = function (warehouse, predicate) {
    var all = $_aga3rgjgjd08mds5.bind(warehouse.all(), function (r) {
      return r.cells();
    });
    return $_aga3rgjgjd08mds5.filter(all, predicate);
  };
  var generate = function (list) {
    var access = {};
    var cells = [];
    var maxRows = list.length;
    var maxColumns = 0;
    $_aga3rgjgjd08mds5.each(list, function (details, r) {
      var currentRow = [];
      $_aga3rgjgjd08mds5.each(details.cells(), function (detail, c) {
        var start = 0;
        while (access[key(r, start)] !== undefined) {
          start++;
        }
        var current = $_575rkcjrjd08mdtl.extended(detail.element(), detail.rowspan(), detail.colspan(), r, start);
        for (var i = 0; i < detail.colspan(); i++) {
          for (var j = 0; j < detail.rowspan(); j++) {
            var cr = r + j;
            var cc = start + i;
            var newpos = key(cr, cc);
            access[newpos] = current;
            maxColumns = Math.max(maxColumns, cc + 1);
          }
        }
        currentRow.push(current);
      });
      cells.push($_575rkcjrjd08mdtl.rowdata(details.element(), currentRow, details.section()));
    });
    var grid = $_575rkcjrjd08mdtl.grid(maxRows, maxColumns);
    return {
      grid: $_bypfqijijd08mdsd.constant(grid),
      access: $_bypfqijijd08mdsd.constant(access),
      all: $_bypfqijijd08mdsd.constant(cells)
    };
  };
  var justCells = function (warehouse) {
    var rows = $_aga3rgjgjd08mds5.map(warehouse.all(), function (w) {
      return w.cells();
    });
    return $_aga3rgjgjd08mds5.flatten(rows);
  };
  var $_dfmfqzkojd08mdx8 = {
    generate: generate,
    getAt: getAt,
    findItem: findItem,
    filterItems: filterItems,
    justCells: justCells
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_cefhypkqjd08mdxs = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_aucheejpjd08mdtb.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_cefhypkqjd08mdxs.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_cefhypkqjd08mdxs.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$1 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_f3n2vcjkjd08mdsy.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_f3n2vcjkjd08mdsy.each(css, function (v, k) {
      v.fold(function () {
        internalRemove(dom, k);
      }, function (value) {
        internalSet(dom, k, value);
      });
    });
  };
  var get$1 = function (element, property) {
    var dom = element.dom();
    var styles = window.getComputedStyle(dom);
    var r = styles.getPropertyValue(property);
    var v = r === '' && !$_en6z86kkjd08mdwr.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_cefhypkqjd08mdxs.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
  };
  var getRaw = function (element, property) {
    var dom = element.dom();
    var raw = getUnsafeProperty(dom, property);
    return $_7bux4mjhjd08mdsb.from(raw).filter(function (r) {
      return r.length > 0;
    });
  };
  var getAllRaw = function (element) {
    var css = {};
    var dom = element.dom();
    if ($_cefhypkqjd08mdxs.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_7kgirujvjd08mdum.fromTag(tag);
    set$1(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$1 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_1vcp6tkgjd08mdwf.has(element, 'style') && $_6o5rnpkdjd08mdw8.trim($_1vcp6tkgjd08mdwf.get(element, 'style')) === '') {
      $_1vcp6tkgjd08mdwf.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_1vcp6tkgjd08mdwf.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_1vcp6tkgjd08mdwf.remove : $_1vcp6tkgjd08mdwf.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_cefhypkqjd08mdxs.isSupported(sourceDom) && $_cefhypkqjd08mdxs.isSupported(targetDom)) {
      targetDom.style.cssText = sourceDom.style.cssText;
    }
  };
  var reflow = function (e) {
    return e.dom().offsetWidth;
  };
  var transferOne$1 = function (source, destination, style) {
    getRaw(source, style).each(function (value) {
      if (getRaw(destination, style).isNone())
        set$1(destination, style, value);
    });
  };
  var transfer$1 = function (source, destination, styles) {
    if (!$_c0avgfkhjd08mdwm.isElement(source) || !$_c0avgfkhjd08mdwm.isElement(destination))
      return;
    $_aga3rgjgjd08mds5.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_ewbqy7kpjd08mdxi = {
    copy: copy,
    set: set$1,
    preserve: preserve,
    setAll: setAll$1,
    setOptions: setOptions,
    remove: remove$1,
    get: get$1,
    getRaw: getRaw,
    getAllRaw: getAllRaw,
    isValidValue: isValidValue,
    reflow: reflow,
    transfer: transfer$1
  };

  var before = function (marker, element) {
    var parent = $_3zqsofjxjd08mdus.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_3zqsofjxjd08mdus.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_3zqsofjxjd08mdus.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_3zqsofjxjd08mdus.firstChild(parent);
    firstChild.fold(function () {
      append(parent, element);
    }, function (v) {
      parent.dom().insertBefore(element.dom(), v.dom());
    });
  };
  var append = function (parent, element) {
    parent.dom().appendChild(element.dom());
  };
  var appendAt = function (parent, element, index) {
    $_3zqsofjxjd08mdus.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_cxkc4ckrjd08mdxu = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap
  };

  var before$1 = function (marker, elements) {
    $_aga3rgjgjd08mds5.each(elements, function (x) {
      $_cxkc4ckrjd08mdxu.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_aga3rgjgjd08mds5.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_cxkc4ckrjd08mdxu.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_aga3rgjgjd08mds5.each(elements.slice().reverse(), function (x) {
      $_cxkc4ckrjd08mdxu.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_aga3rgjgjd08mds5.each(elements, function (x) {
      $_cxkc4ckrjd08mdxu.append(parent, x);
    });
  };
  var $_3acda0ktjd08mdy1 = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_aga3rgjgjd08mds5.each($_3zqsofjxjd08mdus.children(element), function (rogue) {
      remove$2(rogue);
    });
  };
  var remove$2 = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_3zqsofjxjd08mdus.children(wrapper);
    if (children.length > 0)
      $_3acda0ktjd08mdy1.before(wrapper, children);
    remove$2(wrapper);
  };
  var $_56z3hjksjd08mdxz = {
    empty: empty,
    remove: remove$2,
    unwrap: unwrap
  };

  var stats = $_2806jejljd08mdt0.immutable('minRow', 'minCol', 'maxRow', 'maxCol');
  var findSelectedStats = function (house, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    var minRow = totalRows;
    var minCol = totalColumns;
    var maxRow = 0;
    var maxCol = 0;
    $_f3n2vcjkjd08mdsy.each(house.access(), function (detail) {
      if (isSelected(detail)) {
        var startRow = detail.row();
        var endRow = startRow + detail.rowspan() - 1;
        var startCol = detail.column();
        var endCol = startCol + detail.colspan() - 1;
        if (startRow < minRow)
          minRow = startRow;
        else if (endRow > maxRow)
          maxRow = endRow;
        if (startCol < minCol)
          minCol = startCol;
        else if (endCol > maxCol)
          maxCol = endCol;
      }
    });
    return stats(minRow, minCol, maxRow, maxCol);
  };
  var makeCell = function (list, seenSelected, rowIndex) {
    var row = list[rowIndex].element();
    var td = $_7kgirujvjd08mdum.fromTag('td');
    $_cxkc4ckrjd08mdxu.append(td, $_7kgirujvjd08mdum.fromTag('br'));
    var f = seenSelected ? $_cxkc4ckrjd08mdxu.append : $_cxkc4ckrjd08mdxu.prepend;
    f(row, td);
  };
  var fillInGaps = function (list, house, stats, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    for (var i = 0; i < totalRows; i++) {
      var seenSelected = false;
      for (var j = 0; j < totalColumns; j++) {
        if (!(i < stats.minRow() || i > stats.maxRow() || j < stats.minCol() || j > stats.maxCol())) {
          var needCell = $_dfmfqzkojd08mdx8.getAt(house, i, j).filter(isSelected).isNone();
          if (needCell)
            makeCell(list, seenSelected, i);
          else
            seenSelected = true;
        }
      }
    }
  };
  var clean = function (table, stats) {
    var emptyRows = $_aga3rgjgjd08mds5.filter($_1uvtmmjtjd08mdu8.firstLayer(table, 'tr'), function (row) {
      return row.dom().childElementCount === 0;
    });
    $_aga3rgjgjd08mds5.each(emptyRows, $_56z3hjksjd08mdxz.remove);
    if (stats.minCol() === stats.maxCol() || stats.minRow() === stats.maxRow()) {
      $_aga3rgjgjd08mds5.each($_1uvtmmjtjd08mdu8.firstLayer(table, 'th,td'), function (cell) {
        $_1vcp6tkgjd08mdwf.remove(cell, 'rowspan');
        $_1vcp6tkgjd08mdwf.remove(cell, 'colspan');
      });
    }
    $_1vcp6tkgjd08mdwf.remove(table, 'width');
    $_1vcp6tkgjd08mdwf.remove(table, 'height');
    $_ewbqy7kpjd08mdxi.remove(table, 'width');
    $_ewbqy7kpjd08mdxi.remove(table, 'height');
  };
  var extract = function (table, selectedSelector) {
    var isSelected = function (detail) {
      return $_2c5fpcjujd08mdug.is(detail.element(), selectedSelector);
    };
    var list = $_48r5ifjqjd08mdte.fromTable(table);
    var house = $_dfmfqzkojd08mdx8.generate(list);
    var stats = findSelectedStats(house, isSelected);
    var selector = 'th:not(' + selectedSelector + ')' + ',td:not(' + selectedSelector + ')';
    var unselectedCells = $_1uvtmmjtjd08mdu8.filterFirstLayer(table, 'th,td', function (cell) {
      return $_2c5fpcjujd08mdug.is(cell, selector);
    });
    $_aga3rgjgjd08mds5.each(unselectedCells, $_56z3hjksjd08mdxz.remove);
    fillInGaps(list, house, stats, isSelected);
    clean(table, stats);
    return table;
  };
  var $_1am1u7jjjd08mdsg = { extract: extract };

  var clone$1 = function (original, deep) {
    return $_7kgirujvjd08mdum.fromDom(original.dom().cloneNode(deep));
  };
  var shallow = function (original) {
    return clone$1(original, false);
  };
  var deep = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_7kgirujvjd08mdum.fromTag(tag);
    var attributes = $_1vcp6tkgjd08mdwf.clone(original);
    $_1vcp6tkgjd08mdwf.setAll(nu, attributes);
    return nu;
  };
  var copy$1 = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_3zqsofjxjd08mdus.children(deep(original));
    $_3acda0ktjd08mdy1.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_cxkc4ckrjd08mdxu.before(original, nu);
    var children = $_3zqsofjxjd08mdus.children(original);
    $_3acda0ktjd08mdy1.append(nu, children);
    $_56z3hjksjd08mdxz.remove(original);
    return nu;
  };
  var $_2fxlt8kvjd08mdym = {
    shallow: shallow,
    shallowAs: shallowAs,
    deep: deep,
    copy: copy$1,
    mutate: mutate
  };

  function NodeValue (is, name) {
    var get = function (element) {
      if (!is(element))
        throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
      return getOption(element).getOr('');
    };
    var getOptionIE10 = function (element) {
      try {
        return getOptionSafe(element);
      } catch (e) {
        return $_7bux4mjhjd08mdsb.none();
      }
    };
    var getOptionSafe = function (element) {
      return is(element) ? $_7bux4mjhjd08mdsb.from(element.dom().nodeValue) : $_7bux4mjhjd08mdsb.none();
    };
    var browser = $_3c5abbk4jd08mdvj.detect().browser;
    var getOption = browser.isIE() && browser.version.major === 10 ? getOptionIE10 : getOptionSafe;
    var set = function (element, value) {
      if (!is(element))
        throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
      element.dom().nodeValue = value;
    };
    return {
      get: get,
      getOption: getOption,
      set: set
    };
  }

  var api = NodeValue($_c0avgfkhjd08mdwm.isText, 'text');
  var get$2 = function (element) {
    return api.get(element);
  };
  var getOption = function (element) {
    return api.getOption(element);
  };
  var set$2 = function (element, value) {
    api.set(element, value);
  };
  var $_cls6xmkyjd08mdyv = {
    get: get$2,
    getOption: getOption,
    set: set$2
  };

  var getEnd = function (element) {
    return $_c0avgfkhjd08mdwm.name(element) === 'img' ? 1 : $_cls6xmkyjd08mdyv.getOption(element).fold(function () {
      return $_3zqsofjxjd08mdus.children(element).length;
    }, function (v) {
      return v.length;
    });
  };
  var isEnd = function (element, offset) {
    return getEnd(element) === offset;
  };
  var isStart = function (element, offset) {
    return offset === 0;
  };
  var NBSP = '\xA0';
  var isTextNodeWithCursorPosition = function (el) {
    return $_cls6xmkyjd08mdyv.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_aga3rgjgjd08mds5.contains(elementsWithCursorPosition, $_c0avgfkhjd08mdwm.name(elem));
  };
  var $_6xf70nkxjd08mdyt = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var first$3 = function (element) {
    return $_743771kmjd08mdwx.descendant(element, $_6xf70nkxjd08mdyt.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_6xf70nkxjd08mdyt.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_3zqsofjxjd08mdus.children(element);
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (predicate(child))
          return $_7bux4mjhjd08mdsb.some(child);
        var res = descend(child);
        if (res.isSome())
          return res;
      }
      return $_7bux4mjhjd08mdsb.none();
    };
    return descend(scope);
  };
  var $_br7rmnkwjd08mdyp = {
    first: first$3,
    last: last$2
  };

  var cell$1 = function () {
    var td = $_7kgirujvjd08mdum.fromTag('td');
    $_cxkc4ckrjd08mdxu.append(td, $_7kgirujvjd08mdum.fromTag('br'));
    return td;
  };
  var replace = function (cell, tag, attrs) {
    var replica = $_2fxlt8kvjd08mdym.copy(cell, tag);
    $_f3n2vcjkjd08mdsy.each(attrs, function (v, k) {
      if (v === null)
        $_1vcp6tkgjd08mdwf.remove(replica, k);
      else
        $_1vcp6tkgjd08mdwf.set(replica, k, v);
    });
    return replica;
  };
  var pasteReplace = function (cellContent) {
    return cellContent;
  };
  var newRow = function (doc) {
    return function () {
      return $_7kgirujvjd08mdum.fromTag('tr', doc.dom());
    };
  };
  var cloneFormats = function (oldCell, newCell, formats) {
    var first = $_br7rmnkwjd08mdyp.first(oldCell);
    return first.map(function (firstText) {
      var formatSelector = formats.join(',');
      var parents = $_727gtckijd08mdwn.ancestors(firstText, formatSelector, function (element) {
        return $_2bcch9jzjd08mdv4.eq(element, oldCell);
      });
      return $_aga3rgjgjd08mds5.foldr(parents, function (last, parent) {
        var clonedFormat = $_2fxlt8kvjd08mdym.shallow(parent);
        $_cxkc4ckrjd08mdxu.append(last, clonedFormat);
        return clonedFormat;
      }, newCell);
    }).getOr(newCell);
  };
  var cellOperations = function (mutate, doc, formatsToClone) {
    var newCell = function (prev) {
      var doc = $_3zqsofjxjd08mdus.owner(prev.element());
      var td = $_7kgirujvjd08mdum.fromTag($_c0avgfkhjd08mdwm.name(prev.element()), doc.dom());
      var formats = formatsToClone.getOr([
        'strong',
        'em',
        'b',
        'i',
        'span',
        'font',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'div'
      ]);
      var lastNode = formats.length > 0 ? cloneFormats(prev.element(), td, formats) : td;
      $_cxkc4ckrjd08mdxu.append(lastNode, $_7kgirujvjd08mdum.fromTag('br'));
      $_ewbqy7kpjd08mdxi.copy(prev.element(), td);
      $_ewbqy7kpjd08mdxi.remove(td, 'height');
      if (prev.colspan() !== 1)
        $_ewbqy7kpjd08mdxi.remove(prev.element(), 'width');
      mutate(prev.element(), td);
      return td;
    };
    return {
      row: newRow(doc),
      cell: newCell,
      replace: replace,
      gap: cell$1
    };
  };
  var paste = function (doc) {
    return {
      row: newRow(doc),
      cell: cell$1,
      replace: pasteReplace,
      gap: cell$1
    };
  };
  var $_ebfxzykujd08mdy4 = {
    cellOperations: cellOperations,
    paste: paste
  };

  var fromHtml$1 = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    return $_3zqsofjxjd08mdus.children($_7kgirujvjd08mdum.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_aga3rgjgjd08mds5.map(tags, function (x) {
      return $_7kgirujvjd08mdum.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_aga3rgjgjd08mds5.map(texts, function (x) {
      return $_7kgirujvjd08mdum.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_aga3rgjgjd08mds5.map(nodes, $_7kgirujvjd08mdum.fromDom);
  };
  var $_9yhfonl0jd08mdz1 = {
    fromHtml: fromHtml$1,
    fromTags: fromTags,
    fromText: fromText$1,
    fromDom: fromDom$1
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

  function DomUniverse () {
    var clone = function (element) {
      return $_7kgirujvjd08mdum.fromDom(element.dom().cloneNode(false));
    };
    var isBoundary = function (element) {
      if (!$_c0avgfkhjd08mdwm.isElement(element))
        return false;
      if ($_c0avgfkhjd08mdwm.name(element) === 'body')
        return true;
      return $_aga3rgjgjd08mds5.contains(TagBoundaries, $_c0avgfkhjd08mdwm.name(element));
    };
    var isEmptyTag = function (element) {
      if (!$_c0avgfkhjd08mdwm.isElement(element))
        return false;
      return $_aga3rgjgjd08mds5.contains([
        'br',
        'img',
        'hr',
        'input'
      ], $_c0avgfkhjd08mdwm.name(element));
    };
    var comparePosition = function (element, other) {
      return element.dom().compareDocumentPosition(other.dom());
    };
    var copyAttributesTo = function (source, destination) {
      var as = $_1vcp6tkgjd08mdwf.clone(source);
      $_1vcp6tkgjd08mdwf.setAll(destination, as);
    };
    return {
      up: $_bypfqijijd08mdsd.constant({
        selector: $_ay6dmzkljd08mdwu.ancestor,
        closest: $_ay6dmzkljd08mdwu.closest,
        predicate: $_743771kmjd08mdwx.ancestor,
        all: $_3zqsofjxjd08mdus.parents
      }),
      down: $_bypfqijijd08mdsd.constant({
        selector: $_727gtckijd08mdwn.descendants,
        predicate: $_f05p7kkjjd08mdwo.descendants
      }),
      styles: $_bypfqijijd08mdsd.constant({
        get: $_ewbqy7kpjd08mdxi.get,
        getRaw: $_ewbqy7kpjd08mdxi.getRaw,
        set: $_ewbqy7kpjd08mdxi.set,
        remove: $_ewbqy7kpjd08mdxi.remove
      }),
      attrs: $_bypfqijijd08mdsd.constant({
        get: $_1vcp6tkgjd08mdwf.get,
        set: $_1vcp6tkgjd08mdwf.set,
        remove: $_1vcp6tkgjd08mdwf.remove,
        copyTo: copyAttributesTo
      }),
      insert: $_bypfqijijd08mdsd.constant({
        before: $_cxkc4ckrjd08mdxu.before,
        after: $_cxkc4ckrjd08mdxu.after,
        afterAll: $_3acda0ktjd08mdy1.after,
        append: $_cxkc4ckrjd08mdxu.append,
        appendAll: $_3acda0ktjd08mdy1.append,
        prepend: $_cxkc4ckrjd08mdxu.prepend,
        wrap: $_cxkc4ckrjd08mdxu.wrap
      }),
      remove: $_bypfqijijd08mdsd.constant({
        unwrap: $_56z3hjksjd08mdxz.unwrap,
        remove: $_56z3hjksjd08mdxz.remove
      }),
      create: $_bypfqijijd08mdsd.constant({
        nu: $_7kgirujvjd08mdum.fromTag,
        clone: clone,
        text: $_7kgirujvjd08mdum.fromText
      }),
      query: $_bypfqijijd08mdsd.constant({
        comparePosition: comparePosition,
        prevSibling: $_3zqsofjxjd08mdus.prevSibling,
        nextSibling: $_3zqsofjxjd08mdus.nextSibling
      }),
      property: $_bypfqijijd08mdsd.constant({
        children: $_3zqsofjxjd08mdus.children,
        name: $_c0avgfkhjd08mdwm.name,
        parent: $_3zqsofjxjd08mdus.parent,
        isText: $_c0avgfkhjd08mdwm.isText,
        isComment: $_c0avgfkhjd08mdwm.isComment,
        isElement: $_c0avgfkhjd08mdwm.isElement,
        getText: $_cls6xmkyjd08mdyv.get,
        setText: $_cls6xmkyjd08mdyv.set,
        isBoundary: isBoundary,
        isEmptyTag: isEmptyTag
      }),
      eq: $_2bcch9jzjd08mdv4.eq,
      is: $_2bcch9jzjd08mdv4.is
    };
  }

  var leftRight = $_2806jejljd08mdt0.immutable('left', 'right');
  var bisect = function (universe, parent, child) {
    var children = universe.property().children(parent);
    var index = $_aga3rgjgjd08mds5.findIndex(children, $_bypfqijijd08mdsd.curry(universe.eq, child));
    return index.map(function (ind) {
      return {
        before: $_bypfqijijd08mdsd.constant(children.slice(0, ind)),
        after: $_bypfqijijd08mdsd.constant(children.slice(ind + 1))
      };
    });
  };
  var breakToRight = function (universe, parent, child) {
    return bisect(universe, parent, child).map(function (parts) {
      var second = universe.create().clone(parent);
      universe.insert().appendAll(second, parts.after());
      universe.insert().after(parent, second);
      return leftRight(parent, second);
    });
  };
  var breakToLeft = function (universe, parent, child) {
    return bisect(universe, parent, child).map(function (parts) {
      var prior = universe.create().clone(parent);
      universe.insert().appendAll(prior, parts.before().concat([child]));
      universe.insert().appendAll(parent, parts.after());
      universe.insert().before(parent, prior);
      return leftRight(prior, parent);
    });
  };
  var breakPath = function (universe, item, isTop, breaker) {
    var result = $_2806jejljd08mdt0.immutable('first', 'second', 'splits');
    var next = function (child, group, splits) {
      var fallback = result(child, $_7bux4mjhjd08mdsb.none(), splits);
      if (isTop(child))
        return result(child, group, splits);
      else {
        return universe.property().parent(child).bind(function (parent) {
          return breaker(universe, parent, child).map(function (breakage) {
            var extra = [{
                first: breakage.left,
                second: breakage.right
              }];
            var nextChild = isTop(parent) ? parent : breakage.left();
            return next(nextChild, $_7bux4mjhjd08mdsb.some(breakage.right()), splits.concat(extra));
          }).getOr(fallback);
        });
      }
    };
    return next(item, $_7bux4mjhjd08mdsb.none(), []);
  };
  var $_bnk3q8l9jd08me18 = {
    breakToLeft: breakToLeft,
    breakToRight: breakToRight,
    breakPath: breakPath
  };

  var all$3 = function (universe, look, elements, f) {
    var head = elements[0];
    var tail = elements.slice(1);
    return f(universe, look, head, tail);
  };
  var oneAll = function (universe, look, elements) {
    return elements.length > 0 ? all$3(universe, look, elements, unsafeOne) : $_7bux4mjhjd08mdsb.none();
  };
  var unsafeOne = function (universe, look, head, tail) {
    var start = look(universe, head);
    return $_aga3rgjgjd08mds5.foldr(tail, function (b, a) {
      var current = look(universe, a);
      return commonElement(universe, b, current);
    }, start);
  };
  var commonElement = function (universe, start, end) {
    return start.bind(function (s) {
      return end.filter($_bypfqijijd08mdsd.curry(universe.eq, s));
    });
  };
  var $_cd327qlajd08me1f = { oneAll: oneAll };

  var eq$1 = function (universe, item) {
    return $_bypfqijijd08mdsd.curry(universe.eq, item);
  };
  var unsafeSubset = function (universe, common, ps1, ps2) {
    var children = universe.property().children(common);
    if (universe.eq(common, ps1[0]))
      return $_7bux4mjhjd08mdsb.some([ps1[0]]);
    if (universe.eq(common, ps2[0]))
      return $_7bux4mjhjd08mdsb.some([ps2[0]]);
    var finder = function (ps) {
      var topDown = $_aga3rgjgjd08mds5.reverse(ps);
      var index = $_aga3rgjgjd08mds5.findIndex(topDown, eq$1(universe, common)).getOr(-1);
      var item = index < topDown.length - 1 ? topDown[index + 1] : topDown[index];
      return $_aga3rgjgjd08mds5.findIndex(children, eq$1(universe, item));
    };
    var startIndex = finder(ps1);
    var endIndex = finder(ps2);
    return startIndex.bind(function (sIndex) {
      return endIndex.map(function (eIndex) {
        var first = Math.min(sIndex, eIndex);
        var last = Math.max(sIndex, eIndex);
        return children.slice(first, last + 1);
      });
    });
  };
  var ancestors$2 = function (universe, start, end, _isRoot) {
    var isRoot = _isRoot !== undefined ? _isRoot : $_bypfqijijd08mdsd.constant(false);
    var ps1 = [start].concat(universe.up().all(start));
    var ps2 = [end].concat(universe.up().all(end));
    var prune = function (path) {
      var index = $_aga3rgjgjd08mds5.findIndex(path, isRoot);
      return index.fold(function () {
        return path;
      }, function (ind) {
        return path.slice(0, ind + 1);
      });
    };
    var pruned1 = prune(ps1);
    var pruned2 = prune(ps2);
    var shared = $_aga3rgjgjd08mds5.find(pruned1, function (x) {
      return $_aga3rgjgjd08mds5.exists(pruned2, eq$1(universe, x));
    });
    return {
      firstpath: $_bypfqijijd08mdsd.constant(pruned1),
      secondpath: $_bypfqijijd08mdsd.constant(pruned2),
      shared: $_bypfqijijd08mdsd.constant(shared)
    };
  };
  var subset = function (universe, start, end) {
    var ancs = ancestors$2(universe, start, end);
    return ancs.shared().bind(function (shared) {
      return unsafeSubset(universe, shared, ancs.firstpath(), ancs.secondpath());
    });
  };
  var $_89eckdlbjd08me1m = {
    subset: subset,
    ancestors: ancestors$2
  };

  var sharedOne = function (universe, look, elements) {
    return $_cd327qlajd08me1f.oneAll(universe, look, elements);
  };
  var subset$1 = function (universe, start, finish) {
    return $_89eckdlbjd08me1m.subset(universe, start, finish);
  };
  var ancestors$3 = function (universe, start, finish, _isRoot) {
    return $_89eckdlbjd08me1m.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$1 = function (universe, parent, child) {
    return $_bnk3q8l9jd08me18.breakToLeft(universe, parent, child);
  };
  var breakToRight$1 = function (universe, parent, child) {
    return $_bnk3q8l9jd08me18.breakToRight(universe, parent, child);
  };
  var breakPath$1 = function (universe, child, isTop, breaker) {
    return $_bnk3q8l9jd08me18.breakPath(universe, child, isTop, breaker);
  };
  var $_a3hq3ol8jd08me17 = {
    sharedOne: sharedOne,
    subset: subset$1,
    ancestors: ancestors$3,
    breakToLeft: breakToLeft$1,
    breakToRight: breakToRight$1,
    breakPath: breakPath$1
  };

  var universe = DomUniverse();
  var sharedOne$1 = function (look, elements) {
    return $_a3hq3ol8jd08me17.sharedOne(universe, function (universe, element) {
      return look(element);
    }, elements);
  };
  var subset$2 = function (start, finish) {
    return $_a3hq3ol8jd08me17.subset(universe, start, finish);
  };
  var ancestors$4 = function (start, finish, _isRoot) {
    return $_a3hq3ol8jd08me17.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$2 = function (parent, child) {
    return $_a3hq3ol8jd08me17.breakToLeft(universe, parent, child);
  };
  var breakToRight$2 = function (parent, child) {
    return $_a3hq3ol8jd08me17.breakToRight(universe, parent, child);
  };
  var breakPath$2 = function (child, isTop, breaker) {
    return $_a3hq3ol8jd08me17.breakPath(universe, child, isTop, function (u, p, c) {
      return breaker(p, c);
    });
  };
  var $_4sfkvxl5jd08me0c = {
    sharedOne: sharedOne$1,
    subset: subset$2,
    ancestors: ancestors$4,
    breakToLeft: breakToLeft$2,
    breakToRight: breakToRight$2,
    breakPath: breakPath$2
  };

  var inSelection = function (bounds, detail) {
    var leftEdge = detail.column();
    var rightEdge = detail.column() + detail.colspan() - 1;
    var topEdge = detail.row();
    var bottomEdge = detail.row() + detail.rowspan() - 1;
    return leftEdge <= bounds.finishCol() && rightEdge >= bounds.startCol() && (topEdge <= bounds.finishRow() && bottomEdge >= bounds.startRow());
  };
  var isWithin = function (bounds, detail) {
    return detail.column() >= bounds.startCol() && detail.column() + detail.colspan() - 1 <= bounds.finishCol() && detail.row() >= bounds.startRow() && detail.row() + detail.rowspan() - 1 <= bounds.finishRow();
  };
  var isRectangular = function (warehouse, bounds) {
    var isRect = true;
    var detailIsWithin = $_bypfqijijd08mdsd.curry(isWithin, bounds);
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        isRect = isRect && $_dfmfqzkojd08mdx8.getAt(warehouse, i, j).exists(detailIsWithin);
      }
    }
    return isRect ? $_7bux4mjhjd08mdsb.some(bounds) : $_7bux4mjhjd08mdsb.none();
  };
  var $_7ri4q1lejd08me23 = {
    inSelection: inSelection,
    isWithin: isWithin,
    isRectangular: isRectangular
  };

  var getBounds = function (detailA, detailB) {
    return $_575rkcjrjd08mdtl.bounds(Math.min(detailA.row(), detailB.row()), Math.min(detailA.column(), detailB.column()), Math.max(detailA.row() + detailA.rowspan() - 1, detailB.row() + detailB.rowspan() - 1), Math.max(detailA.column() + detailA.colspan() - 1, detailB.column() + detailB.colspan() - 1));
  };
  var getAnyBox = function (warehouse, startCell, finishCell) {
    var startCoords = $_dfmfqzkojd08mdx8.findItem(warehouse, startCell, $_2bcch9jzjd08mdv4.eq);
    var finishCoords = $_dfmfqzkojd08mdx8.findItem(warehouse, finishCell, $_2bcch9jzjd08mdv4.eq);
    return startCoords.bind(function (sc) {
      return finishCoords.map(function (fc) {
        return getBounds(sc, fc);
      });
    });
  };
  var getBox = function (warehouse, startCell, finishCell) {
    return getAnyBox(warehouse, startCell, finishCell).bind(function (bounds) {
      return $_7ri4q1lejd08me23.isRectangular(warehouse, bounds);
    });
  };
  var $_6wf9uwlfjd08me27 = {
    getAnyBox: getAnyBox,
    getBox: getBox
  };

  var moveBy = function (warehouse, cell, row, column) {
    return $_dfmfqzkojd08mdx8.findItem(warehouse, cell, $_2bcch9jzjd08mdv4.eq).bind(function (detail) {
      var startRow = row > 0 ? detail.row() + detail.rowspan() - 1 : detail.row();
      var startCol = column > 0 ? detail.column() + detail.colspan() - 1 : detail.column();
      var dest = $_dfmfqzkojd08mdx8.getAt(warehouse, startRow + row, startCol + column);
      return dest.map(function (d) {
        return d.element();
      });
    });
  };
  var intercepts = function (warehouse, start, finish) {
    return $_6wf9uwlfjd08me27.getAnyBox(warehouse, start, finish).map(function (bounds) {
      var inside = $_dfmfqzkojd08mdx8.filterItems(warehouse, $_bypfqijijd08mdsd.curry($_7ri4q1lejd08me23.inSelection, bounds));
      return $_aga3rgjgjd08mds5.map(inside, function (detail) {
        return detail.element();
      });
    });
  };
  var parentCell = function (warehouse, innerCell) {
    var isContainedBy = function (c1, c2) {
      return $_2bcch9jzjd08mdv4.contains(c2, c1);
    };
    return $_dfmfqzkojd08mdx8.findItem(warehouse, innerCell, isContainedBy).bind(function (detail) {
      return detail.element();
    });
  };
  var $_746nvmldjd08me1v = {
    moveBy: moveBy,
    intercepts: intercepts,
    parentCell: parentCell
  };

  var moveBy$1 = function (cell, deltaRow, deltaColumn) {
    return $_915052jsjd08mdtp.table(cell).bind(function (table) {
      var warehouse = getWarehouse(table);
      return $_746nvmldjd08me1v.moveBy(warehouse, cell, deltaRow, deltaColumn);
    });
  };
  var intercepts$1 = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_746nvmldjd08me1v.intercepts(warehouse, first, last);
  };
  var nestedIntercepts = function (table, first, firstTable, last, lastTable) {
    var warehouse = getWarehouse(table);
    var startCell = $_2bcch9jzjd08mdv4.eq(table, firstTable) ? first : $_746nvmldjd08me1v.parentCell(warehouse, first);
    var lastCell = $_2bcch9jzjd08mdv4.eq(table, lastTable) ? last : $_746nvmldjd08me1v.parentCell(warehouse, last);
    return $_746nvmldjd08me1v.intercepts(warehouse, startCell, lastCell);
  };
  var getBox$1 = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_6wf9uwlfjd08me27.getBox(warehouse, first, last);
  };
  var getWarehouse = function (table) {
    var list = $_48r5ifjqjd08mdte.fromTable(table);
    return $_dfmfqzkojd08mdx8.generate(list);
  };
  var $_bcf4sslcjd08me1r = {
    moveBy: moveBy$1,
    intercepts: intercepts$1,
    nestedIntercepts: nestedIntercepts,
    getBox: getBox$1
  };

  var lookupTable = function (container, isRoot) {
    return $_ay6dmzkljd08mdwu.ancestor(container, 'table');
  };
  var identified = $_2806jejljd08mdt0.immutableBag([
    'boxes',
    'start',
    'finish'
  ], []);
  var identify = function (start, finish, isRoot) {
    var getIsRoot = function (rootTable) {
      return function (element) {
        return isRoot(element) || $_2bcch9jzjd08mdv4.eq(element, rootTable);
      };
    };
    if ($_2bcch9jzjd08mdv4.eq(start, finish)) {
      return $_7bux4mjhjd08mdsb.some(identified({
        boxes: $_7bux4mjhjd08mdsb.some([start]),
        start: start,
        finish: finish
      }));
    } else {
      return lookupTable(start, isRoot).bind(function (startTable) {
        return lookupTable(finish, isRoot).bind(function (finishTable) {
          if ($_2bcch9jzjd08mdv4.eq(startTable, finishTable)) {
            return $_7bux4mjhjd08mdsb.some(identified({
              boxes: $_bcf4sslcjd08me1r.intercepts(startTable, start, finish),
              start: start,
              finish: finish
            }));
          } else if ($_2bcch9jzjd08mdv4.contains(startTable, finishTable)) {
            var ancestorCells = $_727gtckijd08mdwn.ancestors(finish, 'td,th', getIsRoot(startTable));
            var finishCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : finish;
            return $_7bux4mjhjd08mdsb.some(identified({
              boxes: $_bcf4sslcjd08me1r.nestedIntercepts(startTable, start, startTable, finish, finishTable),
              start: start,
              finish: finishCell
            }));
          } else if ($_2bcch9jzjd08mdv4.contains(finishTable, startTable)) {
            var ancestorCells = $_727gtckijd08mdwn.ancestors(start, 'td,th', getIsRoot(finishTable));
            var startCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : start;
            return $_7bux4mjhjd08mdsb.some(identified({
              boxes: $_bcf4sslcjd08me1r.nestedIntercepts(finishTable, start, startTable, finish, finishTable),
              start: start,
              finish: startCell
            }));
          } else {
            return $_4sfkvxl5jd08me0c.ancestors(start, finish).shared().bind(function (lca) {
              return $_ay6dmzkljd08mdwu.closest(lca, 'table', isRoot).bind(function (lcaTable) {
                var finishAncestorCells = $_727gtckijd08mdwn.ancestors(finish, 'td,th', getIsRoot(lcaTable));
                var finishCell = finishAncestorCells.length > 0 ? finishAncestorCells[finishAncestorCells.length - 1] : finish;
                var startAncestorCells = $_727gtckijd08mdwn.ancestors(start, 'td,th', getIsRoot(lcaTable));
                var startCell = startAncestorCells.length > 0 ? startAncestorCells[startAncestorCells.length - 1] : start;
                return $_7bux4mjhjd08mdsb.some(identified({
                  boxes: $_bcf4sslcjd08me1r.nestedIntercepts(lcaTable, start, startTable, finish, finishTable),
                  start: startCell,
                  finish: finishCell
                }));
              });
            });
          }
        });
      });
    }
  };
  var retrieve = function (container, selector) {
    var sels = $_727gtckijd08mdwn.descendants(container, selector);
    return sels.length > 0 ? $_7bux4mjhjd08mdsb.some(sels) : $_7bux4mjhjd08mdsb.none();
  };
  var getLast = function (boxes, lastSelectedSelector) {
    return $_aga3rgjgjd08mds5.find(boxes, function (box) {
      return $_2c5fpcjujd08mdug.is(box, lastSelectedSelector);
    });
  };
  var getEdges = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_ay6dmzkljd08mdwu.descendant(container, firstSelectedSelector).bind(function (first) {
      return $_ay6dmzkljd08mdwu.descendant(container, lastSelectedSelector).bind(function (last) {
        return $_4sfkvxl5jd08me0c.sharedOne(lookupTable, [
          first,
          last
        ]).map(function (tbl) {
          return {
            first: $_bypfqijijd08mdsd.constant(first),
            last: $_bypfqijijd08mdsd.constant(last),
            table: $_bypfqijijd08mdsd.constant(tbl)
          };
        });
      });
    });
  };
  var expandTo = function (finish, firstSelectedSelector) {
    return $_ay6dmzkljd08mdwu.ancestor(finish, 'table').bind(function (table) {
      return $_ay6dmzkljd08mdwu.descendant(table, firstSelectedSelector).bind(function (start) {
        return identify(start, finish).bind(function (identified) {
          return identified.boxes().map(function (boxes) {
            return {
              boxes: $_bypfqijijd08mdsd.constant(boxes),
              start: $_bypfqijijd08mdsd.constant(identified.start()),
              finish: $_bypfqijijd08mdsd.constant(identified.finish())
            };
          });
        });
      });
    });
  };
  var shiftSelection = function (boxes, deltaRow, deltaColumn, firstSelectedSelector, lastSelectedSelector) {
    return getLast(boxes, lastSelectedSelector).bind(function (last) {
      return $_bcf4sslcjd08me1r.moveBy(last, deltaRow, deltaColumn).bind(function (finish) {
        return expandTo(finish, firstSelectedSelector);
      });
    });
  };
  var $_ftkztil4jd08mdzq = {
    identify: identify,
    retrieve: retrieve,
    shiftSelection: shiftSelection,
    getEdges: getEdges
  };

  var retrieve$1 = function (container, selector) {
    return $_ftkztil4jd08mdzq.retrieve(container, selector);
  };
  var retrieveBox = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_ftkztil4jd08mdzq.getEdges(container, firstSelectedSelector, lastSelectedSelector).bind(function (edges) {
      var isRoot = function (ancestor) {
        return $_2bcch9jzjd08mdv4.eq(container, ancestor);
      };
      var firstAncestor = $_ay6dmzkljd08mdwu.ancestor(edges.first(), 'thead,tfoot,tbody,table', isRoot);
      var lastAncestor = $_ay6dmzkljd08mdwu.ancestor(edges.last(), 'thead,tfoot,tbody,table', isRoot);
      return firstAncestor.bind(function (fA) {
        return lastAncestor.bind(function (lA) {
          return $_2bcch9jzjd08mdv4.eq(fA, lA) ? $_bcf4sslcjd08me1r.getBox(edges.table(), edges.first(), edges.last()) : $_7bux4mjhjd08mdsb.none();
        });
      });
    });
  };
  var $_93z7lgl3jd08mdzh = {
    retrieve: retrieve$1,
    retrieveBox: retrieveBox
  };

  var selected = 'data-mce-selected';
  var selectedSelector = 'td[' + selected + '],th[' + selected + ']';
  var attributeSelector = '[' + selected + ']';
  var firstSelected = 'data-mce-first-selected';
  var firstSelectedSelector = 'td[' + firstSelected + '],th[' + firstSelected + ']';
  var lastSelected = 'data-mce-last-selected';
  var lastSelectedSelector = 'td[' + lastSelected + '],th[' + lastSelected + ']';
  var $_1hcpf9lgjd08me2b = {
    selected: $_bypfqijijd08mdsd.constant(selected),
    selectedSelector: $_bypfqijijd08mdsd.constant(selectedSelector),
    attributeSelector: $_bypfqijijd08mdsd.constant(attributeSelector),
    firstSelected: $_bypfqijijd08mdsd.constant(firstSelected),
    firstSelectedSelector: $_bypfqijijd08mdsd.constant(firstSelectedSelector),
    lastSelected: $_bypfqijijd08mdsd.constant(lastSelected),
    lastSelectedSelector: $_bypfqijijd08mdsd.constant(lastSelectedSelector)
  };

  var generate$1 = function (cases) {
    if (!$_aucheejpjd08mdtb.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_aga3rgjgjd08mds5.each(cases, function (acase, count) {
      var keys = $_f3n2vcjkjd08mdsy.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_aucheejpjd08mdtb.isArray(value)) {
        throw new Error('case arguments must be an array');
      }
      constructors.push(key);
      adt[key] = function () {
        var argLength = arguments.length;
        if (argLength !== value.length) {
          throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
        }
        var args = new Array(argLength);
        for (var i = 0; i < args.length; i++)
          args[i] = arguments[i];
        var match = function (branches) {
          var branchKeys = $_f3n2vcjkjd08mdsy.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_aga3rgjgjd08mds5.forall(constructors, function (reqKey) {
            return $_aga3rgjgjd08mds5.contains(branchKeys, reqKey);
          });
          if (!allReqd)
            throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
          return branches[key].apply(null, args);
        };
        return {
          fold: function () {
            if (arguments.length !== cases.length) {
              throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + arguments.length);
            }
            var target = arguments[count];
            return target.apply(null, args);
          },
          match: match,
          log: function (label) {
            console.log(label, {
              constructors: constructors,
              constructor: key,
              params: args
            });
          }
        };
      };
    });
    return adt;
  };
  var $_3089nolijd08me2k = { generate: generate$1 };

  var type$1 = $_3089nolijd08me2k.generate([
    { none: [] },
    { multiple: ['elements'] },
    { single: ['selection'] }
  ]);
  var cata = function (subject, onNone, onMultiple, onSingle) {
    return subject.fold(onNone, onMultiple, onSingle);
  };
  var $_a1cx8clhjd08me2i = {
    cata: cata,
    none: type$1.none,
    multiple: type$1.multiple,
    single: type$1.single
  };

  var selection = function (cell, selections) {
    return $_a1cx8clhjd08me2i.cata(selections.get(), $_bypfqijijd08mdsd.constant([]), $_bypfqijijd08mdsd.identity, $_bypfqijijd08mdsd.constant([cell]));
  };
  var unmergable = function (cell, selections) {
    var hasSpan = function (elem) {
      return $_1vcp6tkgjd08mdwf.has(elem, 'rowspan') && parseInt($_1vcp6tkgjd08mdwf.get(elem, 'rowspan'), 10) > 1 || $_1vcp6tkgjd08mdwf.has(elem, 'colspan') && parseInt($_1vcp6tkgjd08mdwf.get(elem, 'colspan'), 10) > 1;
    };
    var candidates = selection(cell, selections);
    return candidates.length > 0 && $_aga3rgjgjd08mds5.forall(candidates, hasSpan) ? $_7bux4mjhjd08mdsb.some(candidates) : $_7bux4mjhjd08mdsb.none();
  };
  var mergable = function (table, selections) {
    return $_a1cx8clhjd08me2i.cata(selections.get(), $_7bux4mjhjd08mdsb.none, function (cells, _env) {
      if (cells.length === 0) {
        return $_7bux4mjhjd08mdsb.none();
      }
      return $_93z7lgl3jd08mdzh.retrieveBox(table, $_1hcpf9lgjd08me2b.firstSelectedSelector(), $_1hcpf9lgjd08me2b.lastSelectedSelector()).bind(function (bounds) {
        return cells.length > 1 ? $_7bux4mjhjd08mdsb.some({
          bounds: $_bypfqijijd08mdsd.constant(bounds),
          cells: $_bypfqijijd08mdsd.constant(cells)
        }) : $_7bux4mjhjd08mdsb.none();
      });
    }, $_7bux4mjhjd08mdsb.none);
  };
  var $_fhlwnfl2jd08mdza = {
    mergable: mergable,
    unmergable: unmergable,
    selection: selection
  };

  var noMenu = function (cell) {
    return {
      element: $_bypfqijijd08mdsd.constant(cell),
      mergable: $_7bux4mjhjd08mdsb.none,
      unmergable: $_7bux4mjhjd08mdsb.none,
      selection: $_bypfqijijd08mdsd.constant([cell])
    };
  };
  var forMenu = function (selections, table, cell) {
    return {
      element: $_bypfqijijd08mdsd.constant(cell),
      mergable: $_bypfqijijd08mdsd.constant($_fhlwnfl2jd08mdza.mergable(table, selections)),
      unmergable: $_bypfqijijd08mdsd.constant($_fhlwnfl2jd08mdza.unmergable(cell, selections)),
      selection: $_bypfqijijd08mdsd.constant($_fhlwnfl2jd08mdza.selection(cell, selections))
    };
  };
  var notCell$1 = function (element) {
    return noMenu(element);
  };
  var paste$1 = $_2806jejljd08mdt0.immutable('element', 'clipboard', 'generators');
  var pasteRows = function (selections, table, cell, clipboard, generators) {
    return {
      element: $_bypfqijijd08mdsd.constant(cell),
      mergable: $_7bux4mjhjd08mdsb.none,
      unmergable: $_7bux4mjhjd08mdsb.none,
      selection: $_bypfqijijd08mdsd.constant($_fhlwnfl2jd08mdza.selection(cell, selections)),
      clipboard: $_bypfqijijd08mdsd.constant(clipboard),
      generators: $_bypfqijijd08mdsd.constant(generators)
    };
  };
  var $_16zmzpl1jd08mdz3 = {
    noMenu: noMenu,
    forMenu: forMenu,
    notCell: notCell$1,
    paste: paste$1,
    pasteRows: pasteRows
  };

  var extractSelected = function (cells) {
    return $_915052jsjd08mdtp.table(cells[0]).map($_2fxlt8kvjd08mdym.deep).map(function (replica) {
      return [$_1am1u7jjjd08mdsg.extract(replica, $_1hcpf9lgjd08me2b.attributeSelector())];
    });
  };
  var serializeElement = function (editor, elm) {
    return editor.selection.serializer.serialize(elm.dom(), {});
  };
  var registerEvents = function (editor, selections, actions, cellSelection) {
    editor.on('BeforeGetContent', function (e) {
      var multiCellContext = function (cells) {
        e.preventDefault();
        extractSelected(cells).each(function (elements) {
          e.content = $_aga3rgjgjd08mds5.map(elements, function (elm) {
            return serializeElement(editor, elm);
          }).join('');
        });
      };
      if (e.selection === true) {
        $_a1cx8clhjd08me2i.cata(selections.get(), $_bypfqijijd08mdsd.noop, multiCellContext, $_bypfqijijd08mdsd.noop);
      }
    });
    editor.on('BeforeSetContent', function (e) {
      if (e.selection === true && e.paste === true) {
        var cellOpt = $_7bux4mjhjd08mdsb.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        cellOpt.each(function (domCell) {
          var cell = $_7kgirujvjd08mdum.fromDom(domCell);
          var table = $_915052jsjd08mdtp.table(cell);
          table.bind(function (table) {
            var elements = $_aga3rgjgjd08mds5.filter($_9yhfonl0jd08mdz1.fromHtml(e.content), function (content) {
              return $_c0avgfkhjd08mdwm.name(content) !== 'meta';
            });
            if (elements.length === 1 && $_c0avgfkhjd08mdwm.name(elements[0]) === 'table') {
              e.preventDefault();
              var doc = $_7kgirujvjd08mdum.fromDom(editor.getDoc());
              var generators = $_ebfxzykujd08mdy4.paste(doc);
              var targets = $_16zmzpl1jd08mdz3.paste(cell, elements[0], generators);
              actions.pasteCells(table, targets).each(function (rng) {
                editor.selection.setRng(rng);
                editor.focus();
                cellSelection.clear(table);
              });
            }
          });
        });
      }
    });
  };
  var $_4l2jlkjfjd08mdrk = { registerEvents: registerEvents };

  var makeTable = function () {
    return $_7kgirujvjd08mdum.fromTag('table');
  };
  var tableBody = function () {
    return $_7kgirujvjd08mdum.fromTag('tbody');
  };
  var tableRow = function () {
    return $_7kgirujvjd08mdum.fromTag('tr');
  };
  var tableHeaderCell = function () {
    return $_7kgirujvjd08mdum.fromTag('th');
  };
  var tableCell = function () {
    return $_7kgirujvjd08mdum.fromTag('td');
  };
  var render = function (rows, columns, rowHeaders, columnHeaders) {
    var table = makeTable();
    $_ewbqy7kpjd08mdxi.setAll(table, {
      'border-collapse': 'collapse',
      width: '100%'
    });
    $_1vcp6tkgjd08mdwf.set(table, 'border', '1');
    var tbody = tableBody();
    $_cxkc4ckrjd08mdxu.append(table, tbody);
    var trs = [];
    for (var i = 0; i < rows; i++) {
      var tr = tableRow();
      for (var j = 0; j < columns; j++) {
        var td = i < rowHeaders || j < columnHeaders ? tableHeaderCell() : tableCell();
        if (j < columnHeaders) {
          $_1vcp6tkgjd08mdwf.set(td, 'scope', 'row');
        }
        if (i < rowHeaders) {
          $_1vcp6tkgjd08mdwf.set(td, 'scope', 'col');
        }
        $_cxkc4ckrjd08mdxu.append(td, $_7kgirujvjd08mdum.fromTag('br'));
        $_ewbqy7kpjd08mdxi.set(td, 'width', 100 / columns + '%');
        $_cxkc4ckrjd08mdxu.append(tr, td);
      }
      trs.push(tr);
    }
    $_3acda0ktjd08mdy1.append(tbody, trs);
    return table;
  };
  var $_geapj6lljd08me2v = { render: render };

  var $_476y61lkjd08me2t = { render: $_geapj6lljd08me2v.render };

  var get$3 = function (element) {
    return element.dom().innerHTML;
  };
  var set$3 = function (element, content) {
    var owner = $_3zqsofjxjd08mdus.owner(element);
    var docDom = owner.dom();
    var fragment = $_7kgirujvjd08mdum.fromDom(docDom.createDocumentFragment());
    var contentElements = $_9yhfonl0jd08mdz1.fromHtml(content, docDom);
    $_3acda0ktjd08mdy1.append(fragment, contentElements);
    $_56z3hjksjd08mdxz.empty(element);
    $_cxkc4ckrjd08mdxu.append(element, fragment);
  };
  var getOuter = function (element) {
    var container = $_7kgirujvjd08mdum.fromTag('div');
    var clone = $_7kgirujvjd08mdum.fromDom(element.dom().cloneNode(true));
    $_cxkc4ckrjd08mdxu.append(container, clone);
    return get$3(container);
  };
  var $_d853zelmjd08me35 = {
    get: get$3,
    set: set$3,
    getOuter: getOuter
  };

  var placeCaretInCell = function (editor, cell) {
    editor.selection.select(cell.dom(), true);
    editor.selection.collapse(true);
  };
  var selectFirstCellInTable = function (editor, tableElm) {
    $_ay6dmzkljd08mdwu.descendant(tableElm, 'td,th').each($_bypfqijijd08mdsd.curry(placeCaretInCell, editor));
  };
  var insert = function (editor, columns, rows) {
    var tableElm;
    var renderedHtml = $_476y61lkjd08me2t.render(rows, columns, 0, 0);
    $_1vcp6tkgjd08mdwf.set(renderedHtml, 'id', '__mce');
    var html = $_d853zelmjd08me35.getOuter(renderedHtml);
    editor.insertContent(html);
    tableElm = editor.dom.get('__mce');
    editor.dom.setAttrib(tableElm, 'id', null);
    editor.$('tr', tableElm).each(function (index, row) {
      editor.fire('newrow', { node: row });
      editor.$('th,td', row).each(function (index, cell) {
        editor.fire('newcell', { node: cell });
      });
    });
    editor.dom.setAttribs(tableElm, editor.settings.table_default_attributes || {});
    editor.dom.setStyles(tableElm, editor.settings.table_default_styles || {});
    selectFirstCellInTable(editor, $_7kgirujvjd08mdum.fromDom(tableElm));
    return tableElm;
  };
  var $_1rnf7sljjd08me2n = { insert: insert };

  function Dimension (name, getOffset) {
    var set = function (element, h) {
      if (!$_aucheejpjd08mdtb.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_cefhypkqjd08mdxs.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_ewbqy7kpjd08mdxi.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_aga3rgjgjd08mds5.foldl(properties, function (acc, property) {
        var val = $_ewbqy7kpjd08mdxi.get(element, property);
        var value = val === undefined ? 0 : parseInt(val, 10);
        return isNaN(value) ? acc : acc + value;
      }, 0);
    };
    var max = function (element, value, properties) {
      var cumulativeInclusions = aggregate(element, properties);
      var absoluteMax = value > cumulativeInclusions ? value - cumulativeInclusions : 0;
      return absoluteMax;
    };
    return {
      set: set,
      get: get,
      getOuter: getOuter,
      aggregate: aggregate,
      max: max
    };
  }

  var api$1 = Dimension('height', function (element) {
    return $_en6z86kkjd08mdwr.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
  });
  var set$4 = function (element, h) {
    api$1.set(element, h);
  };
  var get$4 = function (element) {
    return api$1.get(element);
  };
  var getOuter$1 = function (element) {
    return api$1.getOuter(element);
  };
  var setMax = function (element, value) {
    var inclusions = [
      'margin-top',
      'border-top-width',
      'padding-top',
      'padding-bottom',
      'border-bottom-width',
      'margin-bottom'
    ];
    var absMax = api$1.max(element, value, inclusions);
    $_ewbqy7kpjd08mdxi.set(element, 'max-height', absMax + 'px');
  };
  var $_6v4uarlrjd08me4i = {
    set: set$4,
    get: get$4,
    getOuter: getOuter$1,
    setMax: setMax
  };

  var api$2 = Dimension('width', function (element) {
    return element.dom().offsetWidth;
  });
  var set$5 = function (element, h) {
    api$2.set(element, h);
  };
  var get$5 = function (element) {
    return api$2.get(element);
  };
  var getOuter$2 = function (element) {
    return api$2.getOuter(element);
  };
  var setMax$1 = function (element, value) {
    var inclusions = [
      'margin-left',
      'border-left-width',
      'padding-left',
      'padding-right',
      'border-right-width',
      'margin-right'
    ];
    var absMax = api$2.max(element, value, inclusions);
    $_ewbqy7kpjd08mdxi.set(element, 'max-width', absMax + 'px');
  };
  var $_6myg1vltjd08me4n = {
    set: set$5,
    get: get$5,
    getOuter: getOuter$2,
    setMax: setMax$1
  };

  var platform = $_3c5abbk4jd08mdvj.detect();
  var needManualCalc = function () {
    return platform.browser.isIE() || platform.browser.isEdge();
  };
  var toNumber = function (px, fallback) {
    var num = parseFloat(px);
    return isNaN(num) ? fallback : num;
  };
  var getProp = function (elm, name, fallback) {
    return toNumber($_ewbqy7kpjd08mdxi.get(elm, name), fallback);
  };
  var getCalculatedHeight = function (cell) {
    var paddingTop = getProp(cell, 'padding-top', 0);
    var paddingBottom = getProp(cell, 'padding-bottom', 0);
    var borderTop = getProp(cell, 'border-top-width', 0);
    var borderBottom = getProp(cell, 'border-bottom-width', 0);
    var height = cell.dom().getBoundingClientRect().height;
    var boxSizing = $_ewbqy7kpjd08mdxi.get(cell, 'box-sizing');
    var borders = borderTop + borderBottom;
    return boxSizing === 'border-box' ? height : height - paddingTop - paddingBottom - borders;
  };
  var getWidth = function (cell) {
    return getProp(cell, 'width', $_6myg1vltjd08me4n.get(cell));
  };
  var getHeight = function (cell) {
    return needManualCalc() ? getCalculatedHeight(cell) : getProp(cell, 'height', $_6v4uarlrjd08me4i.get(cell));
  };
  var $_3crwynlqjd08me49 = {
    getWidth: getWidth,
    getHeight: getHeight
  };

  var genericSizeRegex = /(\d+(\.\d+)?)(\w|%)*/;
  var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
  var pixelBasedSizeRegex = /(\d+(\.\d+)?)px|em/;
  var setPixelWidth = function (cell, amount) {
    $_ewbqy7kpjd08mdxi.set(cell, 'width', amount + 'px');
  };
  var setPercentageWidth = function (cell, amount) {
    $_ewbqy7kpjd08mdxi.set(cell, 'width', amount + '%');
  };
  var setHeight = function (cell, amount) {
    $_ewbqy7kpjd08mdxi.set(cell, 'height', amount + 'px');
  };
  var getHeightValue = function (cell) {
    return $_ewbqy7kpjd08mdxi.getRaw(cell, 'height').getOrThunk(function () {
      return $_3crwynlqjd08me49.getHeight(cell) + 'px';
    });
  };
  var convert = function (cell, number, getter, setter) {
    var newSize = $_915052jsjd08mdtp.table(cell).map(function (table) {
      var total = getter(table);
      return Math.floor(number / 100 * total);
    }).getOr(number);
    setter(cell, newSize);
    return newSize;
  };
  var normalizePixelSize = function (value, cell, getter, setter) {
    var number = parseInt(value, 10);
    return $_6o5rnpkdjd08mdw8.endsWith(value, '%') && $_c0avgfkhjd08mdwm.name(cell) !== 'table' ? convert(cell, number, getter, setter) : number;
  };
  var getTotalHeight = function (cell) {
    var value = getHeightValue(cell);
    if (!value)
      return $_6v4uarlrjd08me4i.get(cell);
    return normalizePixelSize(value, cell, $_6v4uarlrjd08me4i.get, setHeight);
  };
  var get$6 = function (cell, type, f) {
    var v = f(cell);
    var span = getSpan(cell, type);
    return v / span;
  };
  var getSpan = function (cell, type) {
    return $_1vcp6tkgjd08mdwf.has(cell, type) ? parseInt($_1vcp6tkgjd08mdwf.get(cell, type), 10) : 1;
  };
  var getRawWidth = function (element) {
    var cssWidth = $_ewbqy7kpjd08mdxi.getRaw(element, 'width');
    return cssWidth.fold(function () {
      return $_7bux4mjhjd08mdsb.from($_1vcp6tkgjd08mdwf.get(element, 'width'));
    }, function (width) {
      return $_7bux4mjhjd08mdsb.some(width);
    });
  };
  var normalizePercentageWidth = function (cellWidth, tableSize) {
    return cellWidth / tableSize.pixelWidth() * 100;
  };
  var choosePercentageSize = function (element, width, tableSize) {
    if (percentageBasedSizeRegex.test(width)) {
      var percentMatch = percentageBasedSizeRegex.exec(width);
      return parseFloat(percentMatch[1]);
    } else {
      var fallbackWidth = $_6myg1vltjd08me4n.get(element);
      var intWidth = parseInt(fallbackWidth, 10);
      return normalizePercentageWidth(intWidth, tableSize);
    }
  };
  var getPercentageWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var width = $_6myg1vltjd08me4n.get(cell);
      var intWidth = parseInt(width, 10);
      return normalizePercentageWidth(intWidth, tableSize);
    }, function (width) {
      return choosePercentageSize(cell, width, tableSize);
    });
  };
  var normalizePixelWidth = function (cellWidth, tableSize) {
    return cellWidth / 100 * tableSize.pixelWidth();
  };
  var choosePixelSize = function (element, width, tableSize) {
    if (pixelBasedSizeRegex.test(width)) {
      var pixelMatch = pixelBasedSizeRegex.exec(width);
      return parseInt(pixelMatch[1], 10);
    } else if (percentageBasedSizeRegex.test(width)) {
      var percentMatch = percentageBasedSizeRegex.exec(width);
      var floatWidth = parseFloat(percentMatch[1]);
      return normalizePixelWidth(floatWidth, tableSize);
    } else {
      var fallbackWidth = $_6myg1vltjd08me4n.get(element);
      return parseInt(fallbackWidth, 10);
    }
  };
  var getPixelWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var width = $_6myg1vltjd08me4n.get(cell);
      var intWidth = parseInt(width, 10);
      return intWidth;
    }, function (width) {
      return choosePixelSize(cell, width, tableSize);
    });
  };
  var getHeight$1 = function (cell) {
    return get$6(cell, 'rowspan', getTotalHeight);
  };
  var getGenericWidth = function (cell) {
    var width = getRawWidth(cell);
    return width.bind(function (width) {
      if (genericSizeRegex.test(width)) {
        var match = genericSizeRegex.exec(width);
        return $_7bux4mjhjd08mdsb.some({
          width: $_bypfqijijd08mdsd.constant(match[1]),
          unit: $_bypfqijijd08mdsd.constant(match[3])
        });
      } else {
        return $_7bux4mjhjd08mdsb.none();
      }
    });
  };
  var setGenericWidth = function (cell, amount, unit) {
    $_ewbqy7kpjd08mdxi.set(cell, 'width', amount + unit);
  };
  var $_eeedaelpjd08me3r = {
    percentageBasedSizeRegex: $_bypfqijijd08mdsd.constant(percentageBasedSizeRegex),
    pixelBasedSizeRegex: $_bypfqijijd08mdsd.constant(pixelBasedSizeRegex),
    setPixelWidth: setPixelWidth,
    setPercentageWidth: setPercentageWidth,
    setHeight: setHeight,
    getPixelWidth: getPixelWidth,
    getPercentageWidth: getPercentageWidth,
    getGenericWidth: getGenericWidth,
    setGenericWidth: setGenericWidth,
    getHeight: getHeight$1,
    getRawWidth: getRawWidth
  };

  var halve = function (main, other) {
    var width = $_eeedaelpjd08me3r.getGenericWidth(main);
    width.each(function (width) {
      var newWidth = width.width() / 2;
      $_eeedaelpjd08me3r.setGenericWidth(main, newWidth, width.unit());
      $_eeedaelpjd08me3r.setGenericWidth(other, newWidth, width.unit());
    });
  };
  var $_4krt1zlojd08me3p = { halve: halve };

  var attached = function (element, scope) {
    var doc = scope || $_7kgirujvjd08mdum.fromDom(document.documentElement);
    return $_743771kmjd08mdwx.ancestor(element, $_bypfqijijd08mdsd.curry($_2bcch9jzjd08mdv4.eq, doc)).isSome();
  };
  var windowOf = function (element) {
    var dom = element.dom();
    if (dom === dom.window)
      return element;
    return $_c0avgfkhjd08mdwm.isDocument(element) ? dom.defaultView || dom.parentWindow : null;
  };
  var $_1nipoqlyjd08me5c = {
    attached: attached,
    windowOf: windowOf
  };

  var r = function (left, top) {
    var translate = function (x, y) {
      return r(left + x, top + y);
    };
    return {
      left: $_bypfqijijd08mdsd.constant(left),
      top: $_bypfqijijd08mdsd.constant(top),
      translate: translate
    };
  };

  var boxPosition = function (dom) {
    var box = dom.getBoundingClientRect();
    return r(box.left, box.top);
  };
  var firstDefinedOrZero = function (a, b) {
    return a !== undefined ? a : b !== undefined ? b : 0;
  };
  var absolute = function (element) {
    var doc = element.dom().ownerDocument;
    var body = doc.body;
    var win = $_1nipoqlyjd08me5c.windowOf($_7kgirujvjd08mdum.fromDom(doc));
    var html = doc.documentElement;
    var scrollTop = firstDefinedOrZero(win.pageYOffset, html.scrollTop);
    var scrollLeft = firstDefinedOrZero(win.pageXOffset, html.scrollLeft);
    var clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
    var clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);
    return viewport(element).translate(scrollLeft - clientLeft, scrollTop - clientTop);
  };
  var relative = function (element) {
    var dom = element.dom();
    return r(dom.offsetLeft, dom.offsetTop);
  };
  var viewport = function (element) {
    var dom = element.dom();
    var doc = dom.ownerDocument;
    var body = doc.body;
    var html = $_7kgirujvjd08mdum.fromDom(doc.documentElement);
    if (body === dom)
      return r(body.offsetLeft, body.offsetTop);
    if (!$_1nipoqlyjd08me5c.attached(element, html))
      return r(0, 0);
    return boxPosition(dom);
  };
  var $_2vv40slxjd08me5a = {
    absolute: absolute,
    relative: relative,
    viewport: viewport
  };

  var rowInfo = $_2806jejljd08mdt0.immutable('row', 'y');
  var colInfo = $_2806jejljd08mdt0.immutable('col', 'x');
  var rtlEdge = function (cell) {
    var pos = $_2vv40slxjd08me5a.absolute(cell);
    return pos.left() + $_6myg1vltjd08me4n.getOuter(cell);
  };
  var ltrEdge = function (cell) {
    return $_2vv40slxjd08me5a.absolute(cell).left();
  };
  var getLeftEdge = function (index, cell) {
    return colInfo(index, ltrEdge(cell));
  };
  var getRightEdge = function (index, cell) {
    return colInfo(index, rtlEdge(cell));
  };
  var getTop = function (cell) {
    return $_2vv40slxjd08me5a.absolute(cell).top();
  };
  var getTopEdge = function (index, cell) {
    return rowInfo(index, getTop(cell));
  };
  var getBottomEdge = function (index, cell) {
    return rowInfo(index, getTop(cell) + $_6v4uarlrjd08me4i.getOuter(cell));
  };
  var findPositions = function (getInnerEdge, getOuterEdge, array) {
    if (array.length === 0)
      return [];
    var lines = $_aga3rgjgjd08mds5.map(array.slice(1), function (cellOption, index) {
      return cellOption.map(function (cell) {
        return getInnerEdge(index, cell);
      });
    });
    var lastLine = array[array.length - 1].map(function (cell) {
      return getOuterEdge(array.length - 1, cell);
    });
    return lines.concat([lastLine]);
  };
  var negate = function (step, _table) {
    return -step;
  };
  var height = {
    delta: $_bypfqijijd08mdsd.identity,
    positions: $_bypfqijijd08mdsd.curry(findPositions, getTopEdge, getBottomEdge),
    edge: getTop
  };
  var ltr = {
    delta: $_bypfqijijd08mdsd.identity,
    edge: ltrEdge,
    positions: $_bypfqijijd08mdsd.curry(findPositions, getLeftEdge, getRightEdge)
  };
  var rtl = {
    delta: negate,
    edge: rtlEdge,
    positions: $_bypfqijijd08mdsd.curry(findPositions, getRightEdge, getLeftEdge)
  };
  var $_3aczk7lwjd08me4u = {
    height: height,
    rtl: rtl,
    ltr: ltr
  };

  var $_765swylvjd08me4s = {
    ltr: $_3aczk7lwjd08me4u.ltr,
    rtl: $_3aczk7lwjd08me4u.rtl
  };

  function TableDirection (directionAt) {
    var auto = function (table) {
      return directionAt(table).isRtl() ? $_765swylvjd08me4s.rtl : $_765swylvjd08me4s.ltr;
    };
    var delta = function (amount, table) {
      return auto(table).delta(amount, table);
    };
    var positions = function (cols, table) {
      return auto(table).positions(cols, table);
    };
    var edge = function (cell) {
      return auto(cell).edge(cell);
    };
    return {
      delta: delta,
      edge: edge,
      positions: positions
    };
  }

  var getGridSize = function (table) {
    var input = $_48r5ifjqjd08mdte.fromTable(table);
    var warehouse = $_dfmfqzkojd08mdx8.generate(input);
    return warehouse.grid();
  };
  var $_c50n8qm0jd08me5h = { getGridSize: getGridSize };

  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };

  var base = function (handleUnsupported, required) {
    return baseWith(handleUnsupported, required, {
      validate: $_aucheejpjd08mdtb.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_ei8ae2jojd08mdt6.validateStrArr('required', required);
    $_ei8ae2jojd08mdt6.checkDupes(required);
    return function (obj) {
      var keys = $_f3n2vcjkjd08mdsy.keys(obj);
      var allReqd = $_aga3rgjgjd08mds5.forall(required, function (req) {
        return $_aga3rgjgjd08mds5.contains(keys, req);
      });
      if (!allReqd)
        $_ei8ae2jojd08mdt6.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_aga3rgjgjd08mds5.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_ei8ae2jojd08mdt6.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_aga3rgjgjd08mds5.filter(keys, function (key) {
      return !$_aga3rgjgjd08mds5.contains(required, key);
    });
    if (unsupported.length > 0)
      $_ei8ae2jojd08mdt6.unsuppMessage(unsupported);
  };
  var allowExtra = $_bypfqijijd08mdsd.noop;
  var $_c7j65gm4jd08me6c = {
    exactly: $_bypfqijijd08mdsd.curry(base, handleExact),
    ensure: $_bypfqijijd08mdsd.curry(base, allowExtra),
    ensureWith: $_bypfqijijd08mdsd.curry(baseWith, allowExtra)
  };

  var elementToData = function (element) {
    var colspan = $_1vcp6tkgjd08mdwf.has(element, 'colspan') ? parseInt($_1vcp6tkgjd08mdwf.get(element, 'colspan'), 10) : 1;
    var rowspan = $_1vcp6tkgjd08mdwf.has(element, 'rowspan') ? parseInt($_1vcp6tkgjd08mdwf.get(element, 'rowspan'), 10) : 1;
    return {
      element: $_bypfqijijd08mdsd.constant(element),
      colspan: $_bypfqijijd08mdsd.constant(colspan),
      rowspan: $_bypfqijijd08mdsd.constant(rowspan)
    };
  };
  var modification = function (generators, _toData) {
    contract(generators);
    var position = Cell($_7bux4mjhjd08mdsb.none());
    var toData = _toData !== undefined ? _toData : elementToData;
    var nu = function (data) {
      return generators.cell(data);
    };
    var nuFrom = function (element) {
      var data = toData(element);
      return nu(data);
    };
    var add = function (element) {
      var replacement = nuFrom(element);
      if (position.get().isNone())
        position.set($_7bux4mjhjd08mdsb.some(replacement));
      recent = $_7bux4mjhjd08mdsb.some({
        item: element,
        replacement: replacement
      });
      return replacement;
    };
    var recent = $_7bux4mjhjd08mdsb.none();
    var getOrInit = function (element, comparator) {
      return recent.fold(function () {
        return add(element);
      }, function (p) {
        return comparator(element, p.item) ? p.replacement : add(element);
      });
    };
    return {
      getOrInit: getOrInit,
      cursor: position.get
    };
  };
  var transform = function (scope, tag) {
    return function (generators) {
      var position = Cell($_7bux4mjhjd08mdsb.none());
      contract(generators);
      var list = [];
      var find = function (element, comparator) {
        return $_aga3rgjgjd08mds5.find(list, function (x) {
          return comparator(x.item, element);
        });
      };
      var makeNew = function (element) {
        var cell = generators.replace(element, tag, { scope: scope });
        list.push({
          item: element,
          sub: cell
        });
        if (position.get().isNone())
          position.set($_7bux4mjhjd08mdsb.some(cell));
        return cell;
      };
      var replaceOrInit = function (element, comparator) {
        return find(element, comparator).fold(function () {
          return makeNew(element);
        }, function (p) {
          return comparator(element, p.item) ? p.sub : makeNew(element);
        });
      };
      return {
        replaceOrInit: replaceOrInit,
        cursor: position.get
      };
    };
  };
  var merging = function (generators) {
    contract(generators);
    var position = Cell($_7bux4mjhjd08mdsb.none());
    var combine = function (cell) {
      if (position.get().isNone())
        position.set($_7bux4mjhjd08mdsb.some(cell));
      return function () {
        var raw = generators.cell({
          element: $_bypfqijijd08mdsd.constant(cell),
          colspan: $_bypfqijijd08mdsd.constant(1),
          rowspan: $_bypfqijijd08mdsd.constant(1)
        });
        $_ewbqy7kpjd08mdxi.remove(raw, 'width');
        $_ewbqy7kpjd08mdxi.remove(cell, 'width');
        return raw;
      };
    };
    return {
      combine: combine,
      cursor: position.get
    };
  };
  var contract = $_c7j65gm4jd08me6c.exactly([
    'cell',
    'row',
    'replace',
    'gap'
  ]);
  var $_e2oytm2jd08me5y = {
    modification: modification,
    transform: transform,
    merging: merging
  };

  var blockList = [
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
    'table',
    'thead',
    'tfoot',
    'tbody',
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
  var isList = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_aga3rgjgjd08mds5.contains([
      'ol',
      'ul'
    ], tagName);
  };
  var isBlock = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_aga3rgjgjd08mds5.contains(blockList, tagName);
  };
  var isFormatting = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_aga3rgjgjd08mds5.contains([
      'address',
      'pre',
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], tagName);
  };
  var isHeading = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_aga3rgjgjd08mds5.contains([
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], tagName);
  };
  var isContainer = function (universe, item) {
    return $_aga3rgjgjd08mds5.contains([
      'div',
      'li',
      'td',
      'th',
      'blockquote',
      'body',
      'caption'
    ], universe.property().name(item));
  };
  var isEmptyTag = function (universe, item) {
    return $_aga3rgjgjd08mds5.contains([
      'br',
      'img',
      'hr',
      'input'
    ], universe.property().name(item));
  };
  var isFrame = function (universe, item) {
    return universe.property().name(item) === 'iframe';
  };
  var isInline = function (universe, item) {
    return !(isBlock(universe, item) || isEmptyTag(universe, item)) && universe.property().name(item) !== 'li';
  };
  var $_1gv2q6m7jd08me77 = {
    isBlock: isBlock,
    isList: isList,
    isFormatting: isFormatting,
    isHeading: isHeading,
    isContainer: isContainer,
    isEmptyTag: isEmptyTag,
    isFrame: isFrame,
    isInline: isInline
  };

  var universe$1 = DomUniverse();
  var isBlock$1 = function (element) {
    return $_1gv2q6m7jd08me77.isBlock(universe$1, element);
  };
  var isList$1 = function (element) {
    return $_1gv2q6m7jd08me77.isList(universe$1, element);
  };
  var isFormatting$1 = function (element) {
    return $_1gv2q6m7jd08me77.isFormatting(universe$1, element);
  };
  var isHeading$1 = function (element) {
    return $_1gv2q6m7jd08me77.isHeading(universe$1, element);
  };
  var isContainer$1 = function (element) {
    return $_1gv2q6m7jd08me77.isContainer(universe$1, element);
  };
  var isEmptyTag$1 = function (element) {
    return $_1gv2q6m7jd08me77.isEmptyTag(universe$1, element);
  };
  var isFrame$1 = function (element) {
    return $_1gv2q6m7jd08me77.isFrame(universe$1, element);
  };
  var isInline$1 = function (element) {
    return $_1gv2q6m7jd08me77.isInline(universe$1, element);
  };
  var $_akewm6jd08me6z = {
    isBlock: isBlock$1,
    isList: isList$1,
    isFormatting: isFormatting$1,
    isHeading: isHeading$1,
    isContainer: isContainer$1,
    isEmptyTag: isEmptyTag$1,
    isFrame: isFrame$1,
    isInline: isInline$1
  };

  var merge = function (cells) {
    var isBr = function (el) {
      return $_c0avgfkhjd08mdwm.name(el) === 'br';
    };
    var advancedBr = function (children) {
      return $_aga3rgjgjd08mds5.forall(children, function (c) {
        return isBr(c) || $_c0avgfkhjd08mdwm.isText(c) && $_cls6xmkyjd08mdyv.get(c).trim().length === 0;
      });
    };
    var isListItem = function (el) {
      return $_c0avgfkhjd08mdwm.name(el) === 'li' || $_743771kmjd08mdwx.ancestor(el, $_akewm6jd08me6z.isList).isSome();
    };
    var siblingIsBlock = function (el) {
      return $_3zqsofjxjd08mdus.nextSibling(el).map(function (rightSibling) {
        if ($_akewm6jd08me6z.isBlock(rightSibling))
          return true;
        if ($_akewm6jd08me6z.isEmptyTag(rightSibling)) {
          return $_c0avgfkhjd08mdwm.name(rightSibling) === 'img' ? false : true;
        }
      }).getOr(false);
    };
    var markCell = function (cell) {
      return $_br7rmnkwjd08mdyp.last(cell).bind(function (rightEdge) {
        var rightSiblingIsBlock = siblingIsBlock(rightEdge);
        return $_3zqsofjxjd08mdus.parent(rightEdge).map(function (parent) {
          return rightSiblingIsBlock === true || isListItem(parent) || isBr(rightEdge) || $_akewm6jd08me6z.isBlock(parent) && !$_2bcch9jzjd08mdv4.eq(cell, parent) ? [] : [$_7kgirujvjd08mdum.fromTag('br')];
        });
      }).getOr([]);
    };
    var markContent = function () {
      var content = $_aga3rgjgjd08mds5.bind(cells, function (cell) {
        var children = $_3zqsofjxjd08mdus.children(cell);
        return advancedBr(children) ? [] : children.concat(markCell(cell));
      });
      return content.length === 0 ? [$_7kgirujvjd08mdum.fromTag('br')] : content;
    };
    var contents = markContent();
    $_56z3hjksjd08mdxz.empty(cells[0]);
    $_3acda0ktjd08mdy1.append(cells[0], contents);
  };
  var $_3p9mdzm5jd08me6e = { merge: merge };

  var shallow$1 = function (old, nu) {
    return nu;
  };
  var deep$1 = function (old, nu) {
    var bothObjects = $_aucheejpjd08mdtb.isObject(old) && $_aucheejpjd08mdtb.isObject(nu);
    return bothObjects ? deepMerge(old, nu) : nu;
  };
  var baseMerge = function (merger) {
    return function () {
      var objects = new Array(arguments.length);
      for (var i = 0; i < objects.length; i++)
        objects[i] = arguments[i];
      if (objects.length === 0)
        throw new Error('Can\'t merge zero objects');
      var ret = {};
      for (var j = 0; j < objects.length; j++) {
        var curObject = objects[j];
        for (var key in curObject)
          if (curObject.hasOwnProperty(key)) {
            ret[key] = merger(ret[key], curObject[key]);
          }
      }
      return ret;
    };
  };
  var deepMerge = baseMerge(deep$1);
  var merge$1 = baseMerge(shallow$1);
  var $_36d0dsm9jd08me7p = {
    deepMerge: deepMerge,
    merge: merge$1
  };

  var cat = function (arr) {
    var r = [];
    var push = function (x) {
      r.push(x);
    };
    for (var i = 0; i < arr.length; i++) {
      arr[i].each(push);
    }
    return r;
  };
  var findMap = function (arr, f) {
    for (var i = 0; i < arr.length; i++) {
      var r = f(arr[i], i);
      if (r.isSome()) {
        return r;
      }
    }
    return $_7bux4mjhjd08mdsb.none();
  };
  var liftN = function (arr, f) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      if (x.isSome()) {
        r.push(x.getOrDie());
      } else {
        return $_7bux4mjhjd08mdsb.none();
      }
    }
    return $_7bux4mjhjd08mdsb.some(f.apply(null, r));
  };
  var $_boq1o3majd08me7r = {
    cat: cat,
    findMap: findMap,
    liftN: liftN
  };

  var addCell = function (gridRow, index, cell) {
    var cells = gridRow.cells();
    var before = cells.slice(0, index);
    var after = cells.slice(index);
    var newCells = before.concat([cell]).concat(after);
    return setCells(gridRow, newCells);
  };
  var mutateCell = function (gridRow, index, cell) {
    var cells = gridRow.cells();
    cells[index] = cell;
  };
  var setCells = function (gridRow, cells) {
    return $_575rkcjrjd08mdtl.rowcells(cells, gridRow.section());
  };
  var mapCells = function (gridRow, f) {
    var cells = gridRow.cells();
    var r = $_aga3rgjgjd08mds5.map(cells, f);
    return $_575rkcjrjd08mdtl.rowcells(r, gridRow.section());
  };
  var getCell = function (gridRow, index) {
    return gridRow.cells()[index];
  };
  var getCellElement = function (gridRow, index) {
    return getCell(gridRow, index).element();
  };
  var cellLength = function (gridRow) {
    return gridRow.cells().length;
  };
  var $_d94q4pmdjd08me89 = {
    addCell: addCell,
    setCells: setCells,
    mutateCell: mutateCell,
    getCell: getCell,
    getCellElement: getCellElement,
    mapCells: mapCells,
    cellLength: cellLength
  };

  var getColumn = function (grid, index) {
    return $_aga3rgjgjd08mds5.map(grid, function (row) {
      return $_d94q4pmdjd08me89.getCell(row, index);
    });
  };
  var getRow = function (grid, index) {
    return grid[index];
  };
  var findDiff = function (xs, comp) {
    if (xs.length === 0)
      return 0;
    var first = xs[0];
    var index = $_aga3rgjgjd08mds5.findIndex(xs, function (x) {
      return !comp(first.element(), x.element());
    });
    return index.fold(function () {
      return xs.length;
    }, function (ind) {
      return ind;
    });
  };
  var subgrid = function (grid, row, column, comparator) {
    var restOfRow = getRow(grid, row).cells().slice(column);
    var endColIndex = findDiff(restOfRow, comparator);
    var restOfColumn = getColumn(grid, column).slice(row);
    var endRowIndex = findDiff(restOfColumn, comparator);
    return {
      colspan: $_bypfqijijd08mdsd.constant(endColIndex),
      rowspan: $_bypfqijijd08mdsd.constant(endRowIndex)
    };
  };
  var $_6zvn38mcjd08me82 = { subgrid: subgrid };

  var toDetails = function (grid, comparator) {
    var seen = $_aga3rgjgjd08mds5.map(grid, function (row, ri) {
      return $_aga3rgjgjd08mds5.map(row.cells(), function (col, ci) {
        return false;
      });
    });
    var updateSeen = function (ri, ci, rowspan, colspan) {
      for (var r = ri; r < ri + rowspan; r++) {
        for (var c = ci; c < ci + colspan; c++) {
          seen[r][c] = true;
        }
      }
    };
    return $_aga3rgjgjd08mds5.map(grid, function (row, ri) {
      var details = $_aga3rgjgjd08mds5.bind(row.cells(), function (cell, ci) {
        if (seen[ri][ci] === false) {
          var result = $_6zvn38mcjd08me82.subgrid(grid, ri, ci, comparator);
          updateSeen(ri, ci, result.rowspan(), result.colspan());
          return [$_575rkcjrjd08mdtl.detailnew(cell.element(), result.rowspan(), result.colspan(), cell.isNew())];
        } else {
          return [];
        }
      });
      return $_575rkcjrjd08mdtl.rowdetails(details, row.section());
    });
  };
  var toGrid = function (warehouse, generators, isNew) {
    var grid = [];
    for (var i = 0; i < warehouse.grid().rows(); i++) {
      var rowCells = [];
      for (var j = 0; j < warehouse.grid().columns(); j++) {
        var element = $_dfmfqzkojd08mdx8.getAt(warehouse, i, j).map(function (item) {
          return $_575rkcjrjd08mdtl.elementnew(item.element(), isNew);
        }).getOrThunk(function () {
          return $_575rkcjrjd08mdtl.elementnew(generators.gap(), true);
        });
        rowCells.push(element);
      }
      var row = $_575rkcjrjd08mdtl.rowcells(rowCells, warehouse.all()[i].section());
      grid.push(row);
    }
    return grid;
  };
  var $_acmnkzmbjd08me7u = {
    toDetails: toDetails,
    toGrid: toGrid
  };

  var setIfNot = function (element, property, value, ignore) {
    if (value === ignore)
      $_1vcp6tkgjd08mdwf.remove(element, property);
    else
      $_1vcp6tkgjd08mdwf.set(element, property, value);
  };
  var render$1 = function (table, grid) {
    var newRows = [];
    var newCells = [];
    var renderSection = function (gridSection, sectionName) {
      var section = $_ay6dmzkljd08mdwu.child(table, sectionName).getOrThunk(function () {
        var tb = $_7kgirujvjd08mdum.fromTag(sectionName, $_3zqsofjxjd08mdus.owner(table).dom());
        $_cxkc4ckrjd08mdxu.append(table, tb);
        return tb;
      });
      $_56z3hjksjd08mdxz.empty(section);
      var rows = $_aga3rgjgjd08mds5.map(gridSection, function (row) {
        if (row.isNew()) {
          newRows.push(row.element());
        }
        var tr = row.element();
        $_56z3hjksjd08mdxz.empty(tr);
        $_aga3rgjgjd08mds5.each(row.cells(), function (cell) {
          if (cell.isNew()) {
            newCells.push(cell.element());
          }
          setIfNot(cell.element(), 'colspan', cell.colspan(), 1);
          setIfNot(cell.element(), 'rowspan', cell.rowspan(), 1);
          $_cxkc4ckrjd08mdxu.append(tr, cell.element());
        });
        return tr;
      });
      $_3acda0ktjd08mdy1.append(section, rows);
    };
    var removeSection = function (sectionName) {
      $_ay6dmzkljd08mdwu.child(table, sectionName).bind($_56z3hjksjd08mdxz.remove);
    };
    var renderOrRemoveSection = function (gridSection, sectionName) {
      if (gridSection.length > 0) {
        renderSection(gridSection, sectionName);
      } else {
        removeSection(sectionName);
      }
    };
    var headSection = [];
    var bodySection = [];
    var footSection = [];
    $_aga3rgjgjd08mds5.each(grid, function (row) {
      switch (row.section()) {
      case 'thead':
        headSection.push(row);
        break;
      case 'tbody':
        bodySection.push(row);
        break;
      case 'tfoot':
        footSection.push(row);
        break;
      }
    });
    renderOrRemoveSection(headSection, 'thead');
    renderOrRemoveSection(bodySection, 'tbody');
    renderOrRemoveSection(footSection, 'tfoot');
    return {
      newRows: $_bypfqijijd08mdsd.constant(newRows),
      newCells: $_bypfqijijd08mdsd.constant(newCells)
    };
  };
  var copy$2 = function (grid) {
    var rows = $_aga3rgjgjd08mds5.map(grid, function (row) {
      var tr = $_2fxlt8kvjd08mdym.shallow(row.element());
      $_aga3rgjgjd08mds5.each(row.cells(), function (cell) {
        var clonedCell = $_2fxlt8kvjd08mdym.deep(cell.element());
        setIfNot(clonedCell, 'colspan', cell.colspan(), 1);
        setIfNot(clonedCell, 'rowspan', cell.rowspan(), 1);
        $_cxkc4ckrjd08mdxu.append(tr, clonedCell);
      });
      return tr;
    });
    return rows;
  };
  var $_36nl99mejd08me8e = {
    render: render$1,
    copy: copy$2
  };

  var repeat = function (repititions, f) {
    var r = [];
    for (var i = 0; i < repititions; i++) {
      r.push(f(i));
    }
    return r;
  };
  var range$1 = function (start, end) {
    var r = [];
    for (var i = start; i < end; i++) {
      r.push(i);
    }
    return r;
  };
  var unique = function (xs, comparator) {
    var result = [];
    $_aga3rgjgjd08mds5.each(xs, function (x, i) {
      if (i < xs.length - 1 && !comparator(x, xs[i + 1])) {
        result.push(x);
      } else if (i === xs.length - 1) {
        result.push(x);
      }
    });
    return result;
  };
  var deduce = function (xs, index) {
    if (index < 0 || index >= xs.length - 1)
      return $_7bux4mjhjd08mdsb.none();
    var current = xs[index].fold(function () {
      var rest = $_aga3rgjgjd08mds5.reverse(xs.slice(0, index));
      return $_boq1o3majd08me7r.findMap(rest, function (a, i) {
        return a.map(function (aa) {
          return {
            value: aa,
            delta: i + 1
          };
        });
      });
    }, function (c) {
      return $_7bux4mjhjd08mdsb.some({
        value: c,
        delta: 0
      });
    });
    var next = xs[index + 1].fold(function () {
      var rest = xs.slice(index + 1);
      return $_boq1o3majd08me7r.findMap(rest, function (a, i) {
        return a.map(function (aa) {
          return {
            value: aa,
            delta: i + 1
          };
        });
      });
    }, function (n) {
      return $_7bux4mjhjd08mdsb.some({
        value: n,
        delta: 1
      });
    });
    return current.bind(function (c) {
      return next.map(function (n) {
        var extras = n.delta + c.delta;
        return Math.abs(n.value - c.value) / extras;
      });
    });
  };
  var $_4ichjjmhjd08me9u = {
    repeat: repeat,
    range: range$1,
    unique: unique,
    deduce: deduce
  };

  var columns = function (warehouse) {
    var grid = warehouse.grid();
    var cols = $_4ichjjmhjd08me9u.range(0, grid.columns());
    var rows = $_4ichjjmhjd08me9u.range(0, grid.rows());
    return $_aga3rgjgjd08mds5.map(cols, function (col) {
      var getBlock = function () {
        return $_aga3rgjgjd08mds5.bind(rows, function (r) {
          return $_dfmfqzkojd08mdx8.getAt(warehouse, r, col).filter(function (detail) {
            return detail.column() === col;
          }).fold($_bypfqijijd08mdsd.constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.colspan() === 1;
      };
      var getFallback = function () {
        return $_dfmfqzkojd08mdx8.getAt(warehouse, 0, col);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var decide = function (getBlock, isSingle, getFallback) {
    var inBlock = getBlock();
    var singleInBlock = $_aga3rgjgjd08mds5.find(inBlock, isSingle);
    var detailOption = singleInBlock.orThunk(function () {
      return $_7bux4mjhjd08mdsb.from(inBlock[0]).orThunk(getFallback);
    });
    return detailOption.map(function (detail) {
      return detail.element();
    });
  };
  var rows$1 = function (warehouse) {
    var grid = warehouse.grid();
    var rows = $_4ichjjmhjd08me9u.range(0, grid.rows());
    var cols = $_4ichjjmhjd08me9u.range(0, grid.columns());
    return $_aga3rgjgjd08mds5.map(rows, function (row) {
      var getBlock = function () {
        return $_aga3rgjgjd08mds5.bind(cols, function (c) {
          return $_dfmfqzkojd08mdx8.getAt(warehouse, row, c).filter(function (detail) {
            return detail.row() === row;
          }).fold($_bypfqijijd08mdsd.constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.rowspan() === 1;
      };
      var getFallback = function () {
        return $_dfmfqzkojd08mdx8.getAt(warehouse, row, 0);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var $_63mwg8mgjd08me9f = {
    columns: columns,
    rows: rows$1
  };

  var col = function (column, x, y, w, h) {
    var blocker = $_7kgirujvjd08mdum.fromTag('div');
    $_ewbqy7kpjd08mdxi.setAll(blocker, {
      position: 'absolute',
      left: x - w / 2 + 'px',
      top: y + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_1vcp6tkgjd08mdwf.setAll(blocker, {
      'data-column': column,
      'role': 'presentation'
    });
    return blocker;
  };
  var row$1 = function (row, x, y, w, h) {
    var blocker = $_7kgirujvjd08mdum.fromTag('div');
    $_ewbqy7kpjd08mdxi.setAll(blocker, {
      position: 'absolute',
      left: x + 'px',
      top: y - h / 2 + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_1vcp6tkgjd08mdwf.setAll(blocker, {
      'data-row': row,
      'role': 'presentation'
    });
    return blocker;
  };
  var $_clhcxsmijd08mea2 = {
    col: col,
    row: row$1
  };

  var css = function (namespace) {
    var dashNamespace = namespace.replace(/\./g, '-');
    var resolve = function (str) {
      return dashNamespace + '-' + str;
    };
    return { resolve: resolve };
  };
  var $_7v9ib7mkjd08meaa = { css: css };

  var styles = $_7v9ib7mkjd08meaa.css('ephox-snooker');
  var $_og3rumjjd08mea7 = { resolve: styles.resolve };

  function Toggler (turnOff, turnOn, initial) {
    var active = initial || false;
    var on = function () {
      turnOn();
      active = true;
    };
    var off = function () {
      turnOff();
      active = false;
    };
    var toggle = function () {
      var f = active ? off : on;
      f();
    };
    var isOn = function () {
      return active;
    };
    return {
      on: on,
      off: off,
      toggle: toggle,
      isOn: isOn
    };
  }

  var read = function (element, attr) {
    var value = $_1vcp6tkgjd08mdwf.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add = function (element, attr, id) {
    var old = read(element, attr);
    var nu = old.concat([id]);
    $_1vcp6tkgjd08mdwf.set(element, attr, nu.join(' '));
  };
  var remove$3 = function (element, attr, id) {
    var nu = $_aga3rgjgjd08mds5.filter(read(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_1vcp6tkgjd08mdwf.set(element, attr, nu.join(' '));
    else
      $_1vcp6tkgjd08mdwf.remove(element, attr);
  };
  var $_7p6ftamojd08meaj = {
    read: read,
    add: add,
    remove: remove$3
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$7 = function (element) {
    return $_7p6ftamojd08meaj.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_7p6ftamojd08meaj.add(element, 'class', clazz);
  };
  var remove$4 = function (element, clazz) {
    return $_7p6ftamojd08meaj.remove(element, 'class', clazz);
  };
  var toggle = function (element, clazz) {
    if ($_aga3rgjgjd08mds5.contains(get$7(element), clazz)) {
      remove$4(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_1ylekbmnjd08meah = {
    get: get$7,
    add: add$1,
    remove: remove$4,
    toggle: toggle,
    supports: supports
  };

  var add$2 = function (element, clazz) {
    if ($_1ylekbmnjd08meah.supports(element))
      element.dom().classList.add(clazz);
    else
      $_1ylekbmnjd08meah.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_1ylekbmnjd08meah.supports(element) ? element.dom().classList : $_1ylekbmnjd08meah.get(element);
    if (classList.length === 0) {
      $_1vcp6tkgjd08mdwf.remove(element, 'class');
    }
  };
  var remove$5 = function (element, clazz) {
    if ($_1ylekbmnjd08meah.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_1ylekbmnjd08meah.remove(element, clazz);
    cleanClass(element);
  };
  var toggle$1 = function (element, clazz) {
    return $_1ylekbmnjd08meah.supports(element) ? element.dom().classList.toggle(clazz) : $_1ylekbmnjd08meah.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_1ylekbmnjd08meah.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_1ylekbmnjd08meah.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_1ylekbmnjd08meah.add(element, clazz);
    };
    return Toggler(off, on, has$1(element, clazz));
  };
  var has$1 = function (element, clazz) {
    return $_1ylekbmnjd08meah.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_frd0lomljd08mead = {
    add: add$2,
    remove: remove$5,
    toggle: toggle$1,
    toggler: toggler,
    has: has$1
  };

  var resizeBar = $_og3rumjjd08mea7.resolve('resizer-bar');
  var resizeRowBar = $_og3rumjjd08mea7.resolve('resizer-rows');
  var resizeColBar = $_og3rumjjd08mea7.resolve('resizer-cols');
  var BAR_THICKNESS = 7;
  var clear = function (wire) {
    var previous = $_727gtckijd08mdwn.descendants(wire.parent(), '.' + resizeBar);
    $_aga3rgjgjd08mds5.each(previous, $_56z3hjksjd08mdxz.remove);
  };
  var drawBar = function (wire, positions, create) {
    var origin = wire.origin();
    $_aga3rgjgjd08mds5.each(positions, function (cpOption, i) {
      cpOption.each(function (cp) {
        var bar = create(origin, cp);
        $_frd0lomljd08mead.add(bar, resizeBar);
        $_cxkc4ckrjd08mdxu.append(wire.parent(), bar);
      });
    });
  };
  var refreshCol = function (wire, colPositions, position, tableHeight) {
    drawBar(wire, colPositions, function (origin, cp) {
      var colBar = $_clhcxsmijd08mea2.col(cp.col(), cp.x() - origin.left(), position.top() - origin.top(), BAR_THICKNESS, tableHeight);
      $_frd0lomljd08mead.add(colBar, resizeColBar);
      return colBar;
    });
  };
  var refreshRow = function (wire, rowPositions, position, tableWidth) {
    drawBar(wire, rowPositions, function (origin, cp) {
      var rowBar = $_clhcxsmijd08mea2.row(cp.row(), position.left() - origin.left(), cp.y() - origin.top(), tableWidth, BAR_THICKNESS);
      $_frd0lomljd08mead.add(rowBar, resizeRowBar);
      return rowBar;
    });
  };
  var refreshGrid = function (wire, table, rows, cols, hdirection, vdirection) {
    var position = $_2vv40slxjd08me5a.absolute(table);
    var rowPositions = rows.length > 0 ? hdirection.positions(rows, table) : [];
    refreshRow(wire, rowPositions, position, $_6myg1vltjd08me4n.getOuter(table));
    var colPositions = cols.length > 0 ? vdirection.positions(cols, table) : [];
    refreshCol(wire, colPositions, position, $_6v4uarlrjd08me4i.getOuter(table));
  };
  var refresh = function (wire, table, hdirection, vdirection) {
    clear(wire);
    var list = $_48r5ifjqjd08mdte.fromTable(table);
    var warehouse = $_dfmfqzkojd08mdx8.generate(list);
    var rows = $_63mwg8mgjd08me9f.rows(warehouse);
    var cols = $_63mwg8mgjd08me9f.columns(warehouse);
    refreshGrid(wire, table, rows, cols, hdirection, vdirection);
  };
  var each$2 = function (wire, f) {
    var bars = $_727gtckijd08mdwn.descendants(wire.parent(), '.' + resizeBar);
    $_aga3rgjgjd08mds5.each(bars, f);
  };
  var hide = function (wire) {
    each$2(wire, function (bar) {
      $_ewbqy7kpjd08mdxi.set(bar, 'display', 'none');
    });
  };
  var show = function (wire) {
    each$2(wire, function (bar) {
      $_ewbqy7kpjd08mdxi.set(bar, 'display', 'block');
    });
  };
  var isRowBar = function (element) {
    return $_frd0lomljd08mead.has(element, resizeRowBar);
  };
  var isColBar = function (element) {
    return $_frd0lomljd08mead.has(element, resizeColBar);
  };
  var $_1f5494mfjd08me8x = {
    refresh: refresh,
    hide: hide,
    show: show,
    destroy: clear,
    isRowBar: isRowBar,
    isColBar: isColBar
  };

  var fromWarehouse = function (warehouse, generators) {
    return $_acmnkzmbjd08me7u.toGrid(warehouse, generators, false);
  };
  var deriveRows = function (rendered, generators) {
    var findRow = function (details) {
      var rowOfCells = $_boq1o3majd08me7r.findMap(details, function (detail) {
        return $_3zqsofjxjd08mdus.parent(detail.element()).map(function (row) {
          var isNew = $_3zqsofjxjd08mdus.parent(row).isNone();
          return $_575rkcjrjd08mdtl.elementnew(row, isNew);
        });
      });
      return rowOfCells.getOrThunk(function () {
        return $_575rkcjrjd08mdtl.elementnew(generators.row(), true);
      });
    };
    return $_aga3rgjgjd08mds5.map(rendered, function (details) {
      var row = findRow(details.details());
      return $_575rkcjrjd08mdtl.rowdatanew(row.element(), details.details(), details.section(), row.isNew());
    });
  };
  var toDetailList = function (grid, generators) {
    var rendered = $_acmnkzmbjd08me7u.toDetails(grid, $_2bcch9jzjd08mdv4.eq);
    return deriveRows(rendered, generators);
  };
  var findInWarehouse = function (warehouse, element) {
    var all = $_aga3rgjgjd08mds5.flatten($_aga3rgjgjd08mds5.map(warehouse.all(), function (r) {
      return r.cells();
    }));
    return $_aga3rgjgjd08mds5.find(all, function (e) {
      return $_2bcch9jzjd08mdv4.eq(element, e.element());
    });
  };
  var run = function (operation, extract, adjustment, postAction, genWrappers) {
    return function (wire, table, target, generators, direction) {
      var input = $_48r5ifjqjd08mdte.fromTable(table);
      var warehouse = $_dfmfqzkojd08mdx8.generate(input);
      var output = extract(warehouse, target).map(function (info) {
        var model = fromWarehouse(warehouse, generators);
        var result = operation(model, info, $_2bcch9jzjd08mdv4.eq, genWrappers(generators));
        var grid = toDetailList(result.grid(), generators);
        return {
          grid: $_bypfqijijd08mdsd.constant(grid),
          cursor: result.cursor
        };
      });
      return output.fold(function () {
        return $_7bux4mjhjd08mdsb.none();
      }, function (out) {
        var newElements = $_36nl99mejd08me8e.render(table, out.grid());
        adjustment(table, out.grid(), direction);
        postAction(table);
        $_1f5494mfjd08me8x.refresh(wire, table, $_3aczk7lwjd08me4u.height, direction);
        return $_7bux4mjhjd08mdsb.some({
          cursor: out.cursor,
          newRows: newElements.newRows,
          newCells: newElements.newCells
        });
      });
    };
  };
  var onCell = function (warehouse, target) {
    return $_915052jsjd08mdtp.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell);
    });
  };
  var onPaste = function (warehouse, target) {
    return $_915052jsjd08mdtp.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell).map(function (details) {
        return $_36d0dsm9jd08me7p.merge(details, {
          generators: target.generators,
          clipboard: target.clipboard
        });
      });
    });
  };
  var onPasteRows = function (warehouse, target) {
    var details = $_aga3rgjgjd08mds5.map(target.selection(), function (cell) {
      return $_915052jsjd08mdtp.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = $_boq1o3majd08me7r.cat(details);
    return cells.length > 0 ? $_7bux4mjhjd08mdsb.some($_36d0dsm9jd08me7p.merge({ cells: cells }, {
      generators: target.generators,
      clipboard: target.clipboard
    })) : $_7bux4mjhjd08mdsb.none();
  };
  var onMergable = function (warehouse, target) {
    return target.mergable();
  };
  var onUnmergable = function (warehouse, target) {
    return target.unmergable();
  };
  var onCells = function (warehouse, target) {
    var details = $_aga3rgjgjd08mds5.map(target.selection(), function (cell) {
      return $_915052jsjd08mdtp.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = $_boq1o3majd08me7r.cat(details);
    return cells.length > 0 ? $_7bux4mjhjd08mdsb.some(cells) : $_7bux4mjhjd08mdsb.none();
  };
  var $_a8t5uvm8jd08me7c = {
    run: run,
    toDetailList: toDetailList,
    onCell: onCell,
    onCells: onCells,
    onPaste: onPaste,
    onPasteRows: onPasteRows,
    onMergable: onMergable,
    onUnmergable: onUnmergable
  };

  var value$1 = function (o) {
    var is = function (v) {
      return o === v;
    };
    var or = function (opt) {
      return value$1(o);
    };
    var orThunk = function (f) {
      return value$1(o);
    };
    var map = function (f) {
      return value$1(f(o));
    };
    var each = function (f) {
      f(o);
    };
    var bind = function (f) {
      return f(o);
    };
    var fold = function (_, onValue) {
      return onValue(o);
    };
    var exists = function (f) {
      return f(o);
    };
    var forall = function (f) {
      return f(o);
    };
    var toOption = function () {
      return $_7bux4mjhjd08mdsb.some(o);
    };
    return {
      is: is,
      isValue: $_bypfqijijd08mdsd.constant(true),
      isError: $_bypfqijijd08mdsd.constant(false),
      getOr: $_bypfqijijd08mdsd.constant(o),
      getOrThunk: $_bypfqijijd08mdsd.constant(o),
      getOrDie: $_bypfqijijd08mdsd.constant(o),
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: each,
      bind: bind,
      exists: exists,
      forall: forall,
      toOption: toOption
    };
  };
  var error = function (message) {
    var getOrThunk = function (f) {
      return f();
    };
    var getOrDie = function () {
      return $_bypfqijijd08mdsd.die(message)();
    };
    var or = function (opt) {
      return opt;
    };
    var orThunk = function (f) {
      return f();
    };
    var map = function (f) {
      return error(message);
    };
    var bind = function (f) {
      return error(message);
    };
    var fold = function (onError, _) {
      return onError(message);
    };
    return {
      is: $_bypfqijijd08mdsd.constant(false),
      isValue: $_bypfqijijd08mdsd.constant(false),
      isError: $_bypfqijijd08mdsd.constant(true),
      getOr: $_bypfqijijd08mdsd.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_bypfqijijd08mdsd.noop,
      bind: bind,
      exists: $_bypfqijijd08mdsd.constant(false),
      forall: $_bypfqijijd08mdsd.constant(true),
      toOption: $_7bux4mjhjd08mdsb.none
    };
  };
  var $_8j00r8mrjd08meba = {
    value: value$1,
    error: error
  };

  var measure = function (startAddress, gridA, gridB) {
    if (startAddress.row() >= gridA.length || startAddress.column() > $_d94q4pmdjd08me89.cellLength(gridA[0]))
      return $_8j00r8mrjd08meba.error('invalid start address out of table bounds, row: ' + startAddress.row() + ', column: ' + startAddress.column());
    var rowRemainder = gridA.slice(startAddress.row());
    var colRemainder = rowRemainder[0].cells().slice(startAddress.column());
    var colRequired = $_d94q4pmdjd08me89.cellLength(gridB[0]);
    var rowRequired = gridB.length;
    return $_8j00r8mrjd08meba.value({
      rowDelta: $_bypfqijijd08mdsd.constant(rowRemainder.length - rowRequired),
      colDelta: $_bypfqijijd08mdsd.constant(colRemainder.length - colRequired)
    });
  };
  var measureWidth = function (gridA, gridB) {
    var colLengthA = $_d94q4pmdjd08me89.cellLength(gridA[0]);
    var colLengthB = $_d94q4pmdjd08me89.cellLength(gridB[0]);
    return {
      rowDelta: $_bypfqijijd08mdsd.constant(0),
      colDelta: $_bypfqijijd08mdsd.constant(colLengthA - colLengthB)
    };
  };
  var fill = function (cells, generator) {
    return $_aga3rgjgjd08mds5.map(cells, function () {
      return $_575rkcjrjd08mdtl.elementnew(generator.cell(), true);
    });
  };
  var rowFill = function (grid, amount, generator) {
    return grid.concat($_4ichjjmhjd08me9u.repeat(amount, function (_row) {
      return $_d94q4pmdjd08me89.setCells(grid[grid.length - 1], fill(grid[grid.length - 1].cells(), generator));
    }));
  };
  var colFill = function (grid, amount, generator) {
    return $_aga3rgjgjd08mds5.map(grid, function (row) {
      return $_d94q4pmdjd08me89.setCells(row, row.cells().concat(fill($_4ichjjmhjd08me9u.range(0, amount), generator)));
    });
  };
  var tailor = function (gridA, delta, generator) {
    var fillCols = delta.colDelta() < 0 ? colFill : $_bypfqijijd08mdsd.identity;
    var fillRows = delta.rowDelta() < 0 ? rowFill : $_bypfqijijd08mdsd.identity;
    var modifiedCols = fillCols(gridA, Math.abs(delta.colDelta()), generator);
    var tailoredGrid = fillRows(modifiedCols, Math.abs(delta.rowDelta()), generator);
    return tailoredGrid;
  };
  var $_72tudmmqjd08meaz = {
    measure: measure,
    measureWidth: measureWidth,
    tailor: tailor
  };

  var merge$2 = function (grid, bounds, comparator, substitution) {
    if (grid.length === 0)
      return grid;
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        $_d94q4pmdjd08me89.mutateCell(grid[i], j, $_575rkcjrjd08mdtl.elementnew(substitution(), false));
      }
    }
    return grid;
  };
  var unmerge = function (grid, target, comparator, substitution) {
    var first = true;
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < $_d94q4pmdjd08me89.cellLength(grid[0]); j++) {
        var current = $_d94q4pmdjd08me89.getCellElement(grid[i], j);
        var isToReplace = comparator(current, target);
        if (isToReplace === true && first === false) {
          $_d94q4pmdjd08me89.mutateCell(grid[i], j, $_575rkcjrjd08mdtl.elementnew(substitution(), true));
        } else if (isToReplace === true) {
          first = false;
        }
      }
    }
    return grid;
  };
  var uniqueCells = function (row, comparator) {
    return $_aga3rgjgjd08mds5.foldl(row, function (rest, cell) {
      return $_aga3rgjgjd08mds5.exists(rest, function (currentCell) {
        return comparator(currentCell.element(), cell.element());
      }) ? rest : rest.concat([cell]);
    }, []);
  };
  var splitRows = function (grid, index, comparator, substitution) {
    if (index > 0 && index < grid.length) {
      var rowPrevCells = grid[index - 1].cells();
      var cells = uniqueCells(rowPrevCells, comparator);
      $_aga3rgjgjd08mds5.each(cells, function (cell) {
        var replacement = $_7bux4mjhjd08mdsb.none();
        for (var i = index; i < grid.length; i++) {
          for (var j = 0; j < $_d94q4pmdjd08me89.cellLength(grid[0]); j++) {
            var current = grid[i].cells()[j];
            var isToReplace = comparator(current.element(), cell.element());
            if (isToReplace) {
              if (replacement.isNone()) {
                replacement = $_7bux4mjhjd08mdsb.some(substitution());
              }
              replacement.each(function (sub) {
                $_d94q4pmdjd08me89.mutateCell(grid[i], j, $_575rkcjrjd08mdtl.elementnew(sub, true));
              });
            }
          }
        }
      });
    }
    return grid;
  };
  var $_8y8zfsmsjd08mebd = {
    merge: merge$2,
    unmerge: unmerge,
    splitRows: splitRows
  };

  var isSpanning = function (grid, row, col, comparator) {
    var candidate = $_d94q4pmdjd08me89.getCell(grid[row], col);
    var matching = $_bypfqijijd08mdsd.curry(comparator, candidate.element());
    var currentRow = grid[row];
    return grid.length > 1 && $_d94q4pmdjd08me89.cellLength(currentRow) > 1 && (col > 0 && matching($_d94q4pmdjd08me89.getCellElement(currentRow, col - 1)) || col < currentRow.length - 1 && matching($_d94q4pmdjd08me89.getCellElement(currentRow, col + 1)) || row > 0 && matching($_d94q4pmdjd08me89.getCellElement(grid[row - 1], col)) || row < grid.length - 1 && matching($_d94q4pmdjd08me89.getCellElement(grid[row + 1], col)));
  };
  var mergeTables = function (startAddress, gridA, gridB, generator, comparator) {
    var startRow = startAddress.row();
    var startCol = startAddress.column();
    var mergeHeight = gridB.length;
    var mergeWidth = $_d94q4pmdjd08me89.cellLength(gridB[0]);
    var endRow = startRow + mergeHeight;
    var endCol = startCol + mergeWidth;
    for (var r = startRow; r < endRow; r++) {
      for (var c = startCol; c < endCol; c++) {
        if (isSpanning(gridA, r, c, comparator)) {
          $_8y8zfsmsjd08mebd.unmerge(gridA, $_d94q4pmdjd08me89.getCellElement(gridA[r], c), comparator, generator.cell);
        }
        var newCell = $_d94q4pmdjd08me89.getCellElement(gridB[r - startRow], c - startCol);
        var replacement = generator.replace(newCell);
        $_d94q4pmdjd08me89.mutateCell(gridA[r], c, $_575rkcjrjd08mdtl.elementnew(replacement, true));
      }
    }
    return gridA;
  };
  var merge$3 = function (startAddress, gridA, gridB, generator, comparator) {
    var result = $_72tudmmqjd08meaz.measure(startAddress, gridA, gridB);
    return result.map(function (delta) {
      var fittedGrid = $_72tudmmqjd08meaz.tailor(gridA, delta, generator);
      return mergeTables(startAddress, fittedGrid, gridB, generator, comparator);
    });
  };
  var insert$1 = function (index, gridA, gridB, generator, comparator) {
    $_8y8zfsmsjd08mebd.splitRows(gridA, index, comparator, generator.cell);
    var delta = $_72tudmmqjd08meaz.measureWidth(gridB, gridA);
    var fittedNewGrid = $_72tudmmqjd08meaz.tailor(gridB, delta, generator);
    var secondDelta = $_72tudmmqjd08meaz.measureWidth(gridA, fittedNewGrid);
    var fittedOldGrid = $_72tudmmqjd08meaz.tailor(gridA, secondDelta, generator);
    return fittedOldGrid.slice(0, index).concat(fittedNewGrid).concat(fittedOldGrid.slice(index, fittedOldGrid.length));
  };
  var $_4bz0lfmpjd08meaq = {
    merge: merge$3,
    insert: insert$1
  };

  var insertRowAt = function (grid, index, example, comparator, substitution) {
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_d94q4pmdjd08me89.mapCells(grid[example], function (ex, c) {
      var withinSpan = index > 0 && index < grid.length && comparator($_d94q4pmdjd08me89.getCellElement(grid[index - 1], c), $_d94q4pmdjd08me89.getCellElement(grid[index], c));
      var ret = withinSpan ? $_d94q4pmdjd08me89.getCell(grid[index], c) : $_575rkcjrjd08mdtl.elementnew(substitution(ex.element(), comparator), true);
      return ret;
    });
    return before.concat([between]).concat(after);
  };
  var insertColumnAt = function (grid, index, example, comparator, substitution) {
    return $_aga3rgjgjd08mds5.map(grid, function (row) {
      var withinSpan = index > 0 && index < $_d94q4pmdjd08me89.cellLength(row) && comparator($_d94q4pmdjd08me89.getCellElement(row, index - 1), $_d94q4pmdjd08me89.getCellElement(row, index));
      var sub = withinSpan ? $_d94q4pmdjd08me89.getCell(row, index) : $_575rkcjrjd08mdtl.elementnew(substitution($_d94q4pmdjd08me89.getCellElement(row, example), comparator), true);
      return $_d94q4pmdjd08me89.addCell(row, index, sub);
    });
  };
  var splitCellIntoColumns = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleCol + 1;
    return $_aga3rgjgjd08mds5.map(grid, function (row, i) {
      var isTargetCell = i === exampleRow;
      var sub = isTargetCell ? $_575rkcjrjd08mdtl.elementnew(substitution($_d94q4pmdjd08me89.getCellElement(row, exampleCol), comparator), true) : $_d94q4pmdjd08me89.getCell(row, exampleCol);
      return $_d94q4pmdjd08me89.addCell(row, index, sub);
    });
  };
  var splitCellIntoRows = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleRow + 1;
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_d94q4pmdjd08me89.mapCells(grid[exampleRow], function (ex, i) {
      var isTargetCell = i === exampleCol;
      return isTargetCell ? $_575rkcjrjd08mdtl.elementnew(substitution(ex.element(), comparator), true) : ex;
    });
    return before.concat([between]).concat(after);
  };
  var deleteColumnsAt = function (grid, start, finish) {
    var rows = $_aga3rgjgjd08mds5.map(grid, function (row) {
      var cells = row.cells().slice(0, start).concat(row.cells().slice(finish + 1));
      return $_575rkcjrjd08mdtl.rowcells(cells, row.section());
    });
    return $_aga3rgjgjd08mds5.filter(rows, function (row) {
      return row.cells().length > 0;
    });
  };
  var deleteRowsAt = function (grid, start, finish) {
    return grid.slice(0, start).concat(grid.slice(finish + 1));
  };
  var $_c3vxr0mtjd08mebj = {
    insertRowAt: insertRowAt,
    insertColumnAt: insertColumnAt,
    splitCellIntoColumns: splitCellIntoColumns,
    splitCellIntoRows: splitCellIntoRows,
    deleteRowsAt: deleteRowsAt,
    deleteColumnsAt: deleteColumnsAt
  };

  var replaceIn = function (grid, targets, comparator, substitution) {
    var isTarget = function (cell) {
      return $_aga3rgjgjd08mds5.exists(targets, function (target) {
        return comparator(cell.element(), target.element());
      });
    };
    return $_aga3rgjgjd08mds5.map(grid, function (row) {
      return $_d94q4pmdjd08me89.mapCells(row, function (cell) {
        return isTarget(cell) ? $_575rkcjrjd08mdtl.elementnew(substitution(cell.element(), comparator), true) : cell;
      });
    });
  };
  var notStartRow = function (grid, rowIndex, colIndex, comparator) {
    return $_d94q4pmdjd08me89.getCellElement(grid[rowIndex], colIndex) !== undefined && (rowIndex > 0 && comparator($_d94q4pmdjd08me89.getCellElement(grid[rowIndex - 1], colIndex), $_d94q4pmdjd08me89.getCellElement(grid[rowIndex], colIndex)));
  };
  var notStartColumn = function (row, index, comparator) {
    return index > 0 && comparator($_d94q4pmdjd08me89.getCellElement(row, index - 1), $_d94q4pmdjd08me89.getCellElement(row, index));
  };
  var replaceColumn = function (grid, index, comparator, substitution) {
    var targets = $_aga3rgjgjd08mds5.bind(grid, function (row, i) {
      var alreadyAdded = notStartRow(grid, i, index, comparator) || notStartColumn(row, index, comparator);
      return alreadyAdded ? [] : [$_d94q4pmdjd08me89.getCell(row, index)];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var replaceRow = function (grid, index, comparator, substitution) {
    var targetRow = grid[index];
    var targets = $_aga3rgjgjd08mds5.bind(targetRow.cells(), function (item, i) {
      var alreadyAdded = notStartRow(grid, index, i, comparator) || notStartColumn(targetRow, i, comparator);
      return alreadyAdded ? [] : [item];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var $_2zoam5mujd08mebn = {
    replaceColumn: replaceColumn,
    replaceRow: replaceRow
  };

  var none$1 = function () {
    return folder(function (n, o, l, m, r) {
      return n();
    });
  };
  var only = function (index) {
    return folder(function (n, o, l, m, r) {
      return o(index);
    });
  };
  var left = function (index, next) {
    return folder(function (n, o, l, m, r) {
      return l(index, next);
    });
  };
  var middle = function (prev, index, next) {
    return folder(function (n, o, l, m, r) {
      return m(prev, index, next);
    });
  };
  var right = function (prev, index) {
    return folder(function (n, o, l, m, r) {
      return r(prev, index);
    });
  };
  var folder = function (fold) {
    return { fold: fold };
  };
  var $_7lr3aimxjd08mec2 = {
    none: none$1,
    only: only,
    left: left,
    middle: middle,
    right: right
  };

  var neighbours$1 = function (input, index) {
    if (input.length === 0)
      return $_7lr3aimxjd08mec2.none();
    if (input.length === 1)
      return $_7lr3aimxjd08mec2.only(0);
    if (index === 0)
      return $_7lr3aimxjd08mec2.left(0, 1);
    if (index === input.length - 1)
      return $_7lr3aimxjd08mec2.right(index - 1, index);
    if (index > 0 && index < input.length - 1)
      return $_7lr3aimxjd08mec2.middle(index - 1, index, index + 1);
    return $_7lr3aimxjd08mec2.none();
  };
  var determine = function (input, column, step, tableSize) {
    var result = input.slice(0);
    var context = neighbours$1(input, column);
    var zero = function (array) {
      return $_aga3rgjgjd08mds5.map(array, $_bypfqijijd08mdsd.constant(0));
    };
    var onNone = $_bypfqijijd08mdsd.constant(zero(result));
    var onOnly = function (index) {
      return tableSize.singleColumnWidth(result[index], step);
    };
    var onChange = function (index, next) {
      if (step >= 0) {
        var newNext = Math.max(tableSize.minCellWidth(), result[next] - step);
        return zero(result.slice(0, index)).concat([
          step,
          newNext - result[next]
        ]).concat(zero(result.slice(next + 1)));
      } else {
        var newThis = Math.max(tableSize.minCellWidth(), result[index] + step);
        var diffx = result[index] - newThis;
        return zero(result.slice(0, index)).concat([
          newThis - result[index],
          diffx
        ]).concat(zero(result.slice(next + 1)));
      }
    };
    var onLeft = onChange;
    var onMiddle = function (prev, index, next) {
      return onChange(index, next);
    };
    var onRight = function (prev, index) {
      if (step >= 0) {
        return zero(result.slice(0, index)).concat([step]);
      } else {
        var size = Math.max(tableSize.minCellWidth(), result[index] + step);
        return zero(result.slice(0, index)).concat([size - result[index]]);
      }
    };
    return context.fold(onNone, onOnly, onLeft, onMiddle, onRight);
  };
  var $_fk4v4kmwjd08mebw = { determine: determine };

  var getSpan$1 = function (cell, type) {
    return $_1vcp6tkgjd08mdwf.has(cell, type) && parseInt($_1vcp6tkgjd08mdwf.get(cell, type), 10) > 1;
  };
  var hasColspan = function (cell) {
    return getSpan$1(cell, 'colspan');
  };
  var hasRowspan = function (cell) {
    return getSpan$1(cell, 'rowspan');
  };
  var getInt = function (element, property) {
    return parseInt($_ewbqy7kpjd08mdxi.get(element, property), 10);
  };
  var $_coboqcmzjd08mecm = {
    hasColspan: hasColspan,
    hasRowspan: hasRowspan,
    minWidth: $_bypfqijijd08mdsd.constant(10),
    minHeight: $_bypfqijijd08mdsd.constant(10),
    getInt: getInt
  };

  var getRaw$1 = function (cell, property, getter) {
    return $_ewbqy7kpjd08mdxi.getRaw(cell, property).fold(function () {
      return getter(cell) + 'px';
    }, function (raw) {
      return raw;
    });
  };
  var getRawW = function (cell) {
    return getRaw$1(cell, 'width', $_eeedaelpjd08me3r.getPixelWidth);
  };
  var getRawH = function (cell) {
    return getRaw$1(cell, 'height', $_eeedaelpjd08me3r.getHeight);
  };
  var getWidthFrom = function (warehouse, direction, getWidth, fallback, tableSize) {
    var columns = $_63mwg8mgjd08me9f.columns(warehouse);
    var backups = $_aga3rgjgjd08mds5.map(columns, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return $_aga3rgjgjd08mds5.map(columns, function (cellOption, c) {
      var columnCell = cellOption.filter($_bypfqijijd08mdsd.not($_coboqcmzjd08mecm.hasColspan));
      return columnCell.fold(function () {
        var deduced = $_4ichjjmhjd08me9u.deduce(backups, c);
        return fallback(deduced);
      }, function (cell) {
        return getWidth(cell, tableSize);
      });
    });
  };
  var getDeduced = function (deduced) {
    return deduced.map(function (d) {
      return d + 'px';
    }).getOr('');
  };
  var getRawWidths = function (warehouse, direction) {
    return getWidthFrom(warehouse, direction, getRawW, getDeduced);
  };
  var getPercentageWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, $_eeedaelpjd08me3r.getPercentageWidth, function (deduced) {
      return deduced.fold(function () {
        return tableSize.minCellWidth();
      }, function (cellWidth) {
        return cellWidth / tableSize.pixelWidth() * 100;
      });
    }, tableSize);
  };
  var getPixelWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, $_eeedaelpjd08me3r.getPixelWidth, function (deduced) {
      return deduced.getOrThunk(tableSize.minCellWidth);
    }, tableSize);
  };
  var getHeightFrom = function (warehouse, direction, getHeight, fallback) {
    var rows = $_63mwg8mgjd08me9f.rows(warehouse);
    var backups = $_aga3rgjgjd08mds5.map(rows, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return $_aga3rgjgjd08mds5.map(rows, function (cellOption, c) {
      var rowCell = cellOption.filter($_bypfqijijd08mdsd.not($_coboqcmzjd08mecm.hasRowspan));
      return rowCell.fold(function () {
        var deduced = $_4ichjjmhjd08me9u.deduce(backups, c);
        return fallback(deduced);
      }, function (cell) {
        return getHeight(cell);
      });
    });
  };
  var getPixelHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, $_eeedaelpjd08me3r.getHeight, function (deduced) {
      return deduced.getOrThunk($_coboqcmzjd08mecm.minHeight);
    });
  };
  var getRawHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, getRawH, getDeduced);
  };
  var $_3pm6ijmyjd08mec5 = {
    getRawWidths: getRawWidths,
    getPixelWidths: getPixelWidths,
    getPercentageWidths: getPercentageWidths,
    getPixelHeights: getPixelHeights,
    getRawHeights: getRawHeights
  };

  var total = function (start, end, measures) {
    var r = 0;
    for (var i = start; i < end; i++) {
      r += measures[i] !== undefined ? measures[i] : 0;
    }
    return r;
  };
  var recalculateWidth = function (warehouse, widths) {
    var all = $_dfmfqzkojd08mdx8.justCells(warehouse);
    return $_aga3rgjgjd08mds5.map(all, function (cell) {
      var width = total(cell.column(), cell.column() + cell.colspan(), widths);
      return {
        element: cell.element,
        width: $_bypfqijijd08mdsd.constant(width),
        colspan: cell.colspan
      };
    });
  };
  var recalculateHeight = function (warehouse, heights) {
    var all = $_dfmfqzkojd08mdx8.justCells(warehouse);
    return $_aga3rgjgjd08mds5.map(all, function (cell) {
      var height = total(cell.row(), cell.row() + cell.rowspan(), heights);
      return {
        element: cell.element,
        height: $_bypfqijijd08mdsd.constant(height),
        rowspan: cell.rowspan
      };
    });
  };
  var matchRowHeight = function (warehouse, heights) {
    return $_aga3rgjgjd08mds5.map(warehouse.all(), function (row, i) {
      return {
        element: row.element,
        height: $_bypfqijijd08mdsd.constant(heights[i])
      };
    });
  };
  var $_baplk8n0jd08mecs = {
    recalculateWidth: recalculateWidth,
    recalculateHeight: recalculateHeight,
    matchRowHeight: matchRowHeight
  };

  var percentageSize = function (width, element) {
    var floatWidth = parseFloat(width);
    var pixelWidth = $_6myg1vltjd08me4n.get(element);
    var getCellDelta = function (delta) {
      return delta / pixelWidth * 100;
    };
    var singleColumnWidth = function (width, _delta) {
      return [100 - width];
    };
    var minCellWidth = function () {
      return $_coboqcmzjd08mecm.minWidth() / pixelWidth * 100;
    };
    var setTableWidth = function (table, _newWidths, delta) {
      var total = floatWidth + delta;
      $_eeedaelpjd08me3r.setPercentageWidth(table, total);
    };
    return {
      width: $_bypfqijijd08mdsd.constant(floatWidth),
      pixelWidth: $_bypfqijijd08mdsd.constant(pixelWidth),
      getWidths: $_3pm6ijmyjd08mec5.getPercentageWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: minCellWidth,
      setElementWidth: $_eeedaelpjd08me3r.setPercentageWidth,
      setTableWidth: setTableWidth
    };
  };
  var pixelSize = function (width) {
    var intWidth = parseInt(width, 10);
    var getCellDelta = $_bypfqijijd08mdsd.identity;
    var singleColumnWidth = function (width, delta) {
      var newNext = Math.max($_coboqcmzjd08mecm.minWidth(), width + delta);
      return [newNext - width];
    };
    var setTableWidth = function (table, newWidths, _delta) {
      var total = $_aga3rgjgjd08mds5.foldr(newWidths, function (b, a) {
        return b + a;
      }, 0);
      $_eeedaelpjd08me3r.setPixelWidth(table, total);
    };
    return {
      width: $_bypfqijijd08mdsd.constant(intWidth),
      pixelWidth: $_bypfqijijd08mdsd.constant(intWidth),
      getWidths: $_3pm6ijmyjd08mec5.getPixelWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: $_coboqcmzjd08mecm.minWidth,
      setElementWidth: $_eeedaelpjd08me3r.setPixelWidth,
      setTableWidth: setTableWidth
    };
  };
  var chooseSize = function (element, width) {
    if ($_eeedaelpjd08me3r.percentageBasedSizeRegex().test(width)) {
      var percentMatch = $_eeedaelpjd08me3r.percentageBasedSizeRegex().exec(width);
      return percentageSize(percentMatch[1], element);
    } else if ($_eeedaelpjd08me3r.pixelBasedSizeRegex().test(width)) {
      var pixelMatch = $_eeedaelpjd08me3r.pixelBasedSizeRegex().exec(width);
      return pixelSize(pixelMatch[1]);
    } else {
      var fallbackWidth = $_6myg1vltjd08me4n.get(element);
      return pixelSize(fallbackWidth);
    }
  };
  var getTableSize = function (element) {
    var width = $_eeedaelpjd08me3r.getRawWidth(element);
    return width.fold(function () {
      var fallbackWidth = $_6myg1vltjd08me4n.get(element);
      return pixelSize(fallbackWidth);
    }, function (width) {
      return chooseSize(element, width);
    });
  };
  var $_2ji5oan1jd08mecx = { getTableSize: getTableSize };

  var getWarehouse$1 = function (list) {
    return $_dfmfqzkojd08mdx8.generate(list);
  };
  var sumUp = function (newSize) {
    return $_aga3rgjgjd08mds5.foldr(newSize, function (b, a) {
      return b + a;
    }, 0);
  };
  var getTableWarehouse = function (table) {
    var list = $_48r5ifjqjd08mdte.fromTable(table);
    return getWarehouse$1(list);
  };
  var adjustWidth = function (table, delta, index, direction) {
    var tableSize = $_2ji5oan1jd08mecx.getTableSize(table);
    var step = tableSize.getCellDelta(delta);
    var warehouse = getTableWarehouse(table);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var deltas = $_fk4v4kmwjd08mebw.determine(widths, index, step, tableSize);
    var newWidths = $_aga3rgjgjd08mds5.map(deltas, function (dx, i) {
      return dx + widths[i];
    });
    var newSizes = $_baplk8n0jd08mecs.recalculateWidth(warehouse, newWidths);
    $_aga3rgjgjd08mds5.each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    if (index === warehouse.grid().columns() - 1) {
      tableSize.setTableWidth(table, newWidths, step);
    }
  };
  var adjustHeight = function (table, delta, index, direction) {
    var warehouse = getTableWarehouse(table);
    var heights = $_3pm6ijmyjd08mec5.getPixelHeights(warehouse, direction);
    var newHeights = $_aga3rgjgjd08mds5.map(heights, function (dy, i) {
      return index === i ? Math.max(delta + dy, $_coboqcmzjd08mecm.minHeight()) : dy;
    });
    var newCellSizes = $_baplk8n0jd08mecs.recalculateHeight(warehouse, newHeights);
    var newRowSizes = $_baplk8n0jd08mecs.matchRowHeight(warehouse, newHeights);
    $_aga3rgjgjd08mds5.each(newRowSizes, function (row) {
      $_eeedaelpjd08me3r.setHeight(row.element(), row.height());
    });
    $_aga3rgjgjd08mds5.each(newCellSizes, function (cell) {
      $_eeedaelpjd08me3r.setHeight(cell.element(), cell.height());
    });
    var total = sumUp(newHeights);
    $_eeedaelpjd08me3r.setHeight(table, total);
  };
  var adjustWidthTo = function (table, list, direction) {
    var tableSize = $_2ji5oan1jd08mecx.getTableSize(table);
    var warehouse = getWarehouse$1(list);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var newSizes = $_baplk8n0jd08mecs.recalculateWidth(warehouse, widths);
    $_aga3rgjgjd08mds5.each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    var total = $_aga3rgjgjd08mds5.foldr(widths, function (b, a) {
      return a + b;
    }, 0);
    if (newSizes.length > 0) {
      tableSize.setElementWidth(table, total);
    }
  };
  var $_bis5r8mvjd08mebr = {
    adjustWidth: adjustWidth,
    adjustHeight: adjustHeight,
    adjustWidthTo: adjustWidthTo
  };

  var prune = function (table) {
    var cells = $_915052jsjd08mdtp.cells(table);
    if (cells.length === 0)
      $_56z3hjksjd08mdxz.remove(table);
  };
  var outcome = $_2806jejljd08mdt0.immutable('grid', 'cursor');
  var elementFromGrid = function (grid, row, column) {
    return findIn(grid, row, column).orThunk(function () {
      return findIn(grid, 0, 0);
    });
  };
  var findIn = function (grid, row, column) {
    return $_7bux4mjhjd08mdsb.from(grid[row]).bind(function (r) {
      return $_7bux4mjhjd08mdsb.from(r.cells()[column]).bind(function (c) {
        return $_7bux4mjhjd08mdsb.from(c.element());
      });
    });
  };
  var bundle = function (grid, row, column) {
    return outcome(grid, findIn(grid, row, column));
  };
  var uniqueRows = function (details) {
    return $_aga3rgjgjd08mds5.foldl(details, function (rest, detail) {
      return $_aga3rgjgjd08mds5.exists(rest, function (currentDetail) {
        return currentDetail.row() === detail.row();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.row() - detailB.row();
    });
  };
  var uniqueColumns = function (details) {
    return $_aga3rgjgjd08mds5.foldl(details, function (rest, detail) {
      return $_aga3rgjgjd08mds5.exists(rest, function (currentDetail) {
        return currentDetail.column() === detail.column();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.column() - detailB.column();
    });
  };
  var insertRowBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row();
    var newGrid = $_c3vxr0mtjd08mebj.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsBefore = function (grid, details, comparator, genWrappers) {
    var example = details[0].row();
    var targetIndex = details[0].row();
    var rows = uniqueRows(details);
    var newGrid = $_aga3rgjgjd08mds5.foldl(rows, function (newGrid, _row) {
      return $_c3vxr0mtjd08mebj.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertRowAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row() + detail.rowspan();
    var newGrid = $_c3vxr0mtjd08mebj.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsAfter = function (grid, details, comparator, genWrappers) {
    var rows = uniqueRows(details);
    var example = rows[rows.length - 1].row();
    var targetIndex = rows[rows.length - 1].row() + rows[rows.length - 1].rowspan();
    var newGrid = $_aga3rgjgjd08mds5.foldl(rows, function (newGrid, _row) {
      return $_c3vxr0mtjd08mebj.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertColumnBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column();
    var newGrid = $_c3vxr0mtjd08mebj.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsBefore = function (grid, details, comparator, genWrappers) {
    var columns = uniqueColumns(details);
    var example = columns[0].column();
    var targetIndex = columns[0].column();
    var newGrid = $_aga3rgjgjd08mds5.foldl(columns, function (newGrid, _row) {
      return $_c3vxr0mtjd08mebj.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var insertColumnAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column() + detail.colspan();
    var newGrid = $_c3vxr0mtjd08mebj.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsAfter = function (grid, details, comparator, genWrappers) {
    var example = details[details.length - 1].column();
    var targetIndex = details[details.length - 1].column() + details[details.length - 1].colspan();
    var columns = uniqueColumns(details);
    var newGrid = $_aga3rgjgjd08mds5.foldl(columns, function (newGrid, _row) {
      return $_c3vxr0mtjd08mebj.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var makeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_2zoam5mujd08mebn.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var makeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_2zoam5mujd08mebn.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_2zoam5mujd08mebn.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_2zoam5mujd08mebn.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoColumns$1 = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_c3vxr0mtjd08mebj.splitCellIntoColumns(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoRows$1 = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_c3vxr0mtjd08mebj.splitCellIntoRows(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var eraseColumns = function (grid, details, comparator, _genWrappers) {
    var columns = uniqueColumns(details);
    var newGrid = $_c3vxr0mtjd08mebj.deleteColumnsAt(grid, columns[0].column(), columns[columns.length - 1].column());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var eraseRows = function (grid, details, comparator, _genWrappers) {
    var rows = uniqueRows(details);
    var newGrid = $_c3vxr0mtjd08mebj.deleteRowsAt(grid, rows[0].row(), rows[rows.length - 1].row());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var mergeCells = function (grid, mergable, comparator, _genWrappers) {
    var cells = mergable.cells();
    $_3p9mdzm5jd08me6e.merge(cells);
    var newGrid = $_8y8zfsmsjd08mebd.merge(grid, mergable.bounds(), comparator, $_bypfqijijd08mdsd.constant(cells[0]));
    return outcome(newGrid, $_7bux4mjhjd08mdsb.from(cells[0]));
  };
  var unmergeCells = function (grid, unmergable, comparator, genWrappers) {
    var newGrid = $_aga3rgjgjd08mds5.foldr(unmergable, function (b, cell) {
      return $_8y8zfsmsjd08mebd.unmerge(b, cell, comparator, genWrappers.combine(cell));
    }, grid);
    return outcome(newGrid, $_7bux4mjhjd08mdsb.from(unmergable[0]));
  };
  var pasteCells = function (grid, pasteDetails, comparator, genWrappers) {
    var gridify = function (table, generators) {
      var list = $_48r5ifjqjd08mdte.fromTable(table);
      var wh = $_dfmfqzkojd08mdx8.generate(list);
      return $_acmnkzmbjd08me7u.toGrid(wh, generators, true);
    };
    var gridB = gridify(pasteDetails.clipboard(), pasteDetails.generators());
    var startAddress = $_575rkcjrjd08mdtl.address(pasteDetails.row(), pasteDetails.column());
    var mergedGrid = $_4bz0lfmpjd08meaq.merge(startAddress, grid, gridB, pasteDetails.generators(), comparator);
    return mergedGrid.fold(function () {
      return outcome(grid, $_7bux4mjhjd08mdsb.some(pasteDetails.element()));
    }, function (nuGrid) {
      var cursor = elementFromGrid(nuGrid, pasteDetails.row(), pasteDetails.column());
      return outcome(nuGrid, cursor);
    });
  };
  var gridifyRows = function (rows, generators, example) {
    var pasteDetails = $_48r5ifjqjd08mdte.fromPastedRows(rows, example);
    var wh = $_dfmfqzkojd08mdx8.generate(pasteDetails);
    return $_acmnkzmbjd08me7u.toGrid(wh, generators, true);
  };
  var pasteRowsBefore = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[0].row();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_4bz0lfmpjd08meaq.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var pasteRowsAfter = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[pasteDetails.cells.length - 1].row() + pasteDetails.cells[pasteDetails.cells.length - 1].rowspan();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_4bz0lfmpjd08meaq.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var resize = $_bis5r8mvjd08mebr.adjustWidthTo;
  var $_9v25t8m1jd08me5k = {
    insertRowBefore: $_a8t5uvm8jd08me7c.run(insertRowBefore, $_a8t5uvm8jd08me7c.onCell, $_bypfqijijd08mdsd.noop, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification),
    insertRowsBefore: $_a8t5uvm8jd08me7c.run(insertRowsBefore, $_a8t5uvm8jd08me7c.onCells, $_bypfqijijd08mdsd.noop, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification),
    insertRowAfter: $_a8t5uvm8jd08me7c.run(insertRowAfter, $_a8t5uvm8jd08me7c.onCell, $_bypfqijijd08mdsd.noop, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification),
    insertRowsAfter: $_a8t5uvm8jd08me7c.run(insertRowsAfter, $_a8t5uvm8jd08me7c.onCells, $_bypfqijijd08mdsd.noop, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification),
    insertColumnBefore: $_a8t5uvm8jd08me7c.run(insertColumnBefore, $_a8t5uvm8jd08me7c.onCell, resize, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification),
    insertColumnsBefore: $_a8t5uvm8jd08me7c.run(insertColumnsBefore, $_a8t5uvm8jd08me7c.onCells, resize, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification),
    insertColumnAfter: $_a8t5uvm8jd08me7c.run(insertColumnAfter, $_a8t5uvm8jd08me7c.onCell, resize, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification),
    insertColumnsAfter: $_a8t5uvm8jd08me7c.run(insertColumnsAfter, $_a8t5uvm8jd08me7c.onCells, resize, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification),
    splitCellIntoColumns: $_a8t5uvm8jd08me7c.run(splitCellIntoColumns$1, $_a8t5uvm8jd08me7c.onCell, resize, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification),
    splitCellIntoRows: $_a8t5uvm8jd08me7c.run(splitCellIntoRows$1, $_a8t5uvm8jd08me7c.onCell, $_bypfqijijd08mdsd.noop, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification),
    eraseColumns: $_a8t5uvm8jd08me7c.run(eraseColumns, $_a8t5uvm8jd08me7c.onCells, resize, prune, $_e2oytm2jd08me5y.modification),
    eraseRows: $_a8t5uvm8jd08me7c.run(eraseRows, $_a8t5uvm8jd08me7c.onCells, $_bypfqijijd08mdsd.noop, prune, $_e2oytm2jd08me5y.modification),
    makeColumnHeader: $_a8t5uvm8jd08me7c.run(makeColumnHeader, $_a8t5uvm8jd08me7c.onCell, $_bypfqijijd08mdsd.noop, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.transform('row', 'th')),
    unmakeColumnHeader: $_a8t5uvm8jd08me7c.run(unmakeColumnHeader, $_a8t5uvm8jd08me7c.onCell, $_bypfqijijd08mdsd.noop, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.transform(null, 'td')),
    makeRowHeader: $_a8t5uvm8jd08me7c.run(makeRowHeader, $_a8t5uvm8jd08me7c.onCell, $_bypfqijijd08mdsd.noop, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.transform('col', 'th')),
    unmakeRowHeader: $_a8t5uvm8jd08me7c.run(unmakeRowHeader, $_a8t5uvm8jd08me7c.onCell, $_bypfqijijd08mdsd.noop, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.transform(null, 'td')),
    mergeCells: $_a8t5uvm8jd08me7c.run(mergeCells, $_a8t5uvm8jd08me7c.onMergable, $_bypfqijijd08mdsd.noop, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.merging),
    unmergeCells: $_a8t5uvm8jd08me7c.run(unmergeCells, $_a8t5uvm8jd08me7c.onUnmergable, resize, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.merging),
    pasteCells: $_a8t5uvm8jd08me7c.run(pasteCells, $_a8t5uvm8jd08me7c.onPaste, resize, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification),
    pasteRowsBefore: $_a8t5uvm8jd08me7c.run(pasteRowsBefore, $_a8t5uvm8jd08me7c.onPasteRows, $_bypfqijijd08mdsd.noop, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification),
    pasteRowsAfter: $_a8t5uvm8jd08me7c.run(pasteRowsAfter, $_a8t5uvm8jd08me7c.onPasteRows, $_bypfqijijd08mdsd.noop, $_bypfqijijd08mdsd.noop, $_e2oytm2jd08me5y.modification)
  };

  var getBody$1 = function (editor) {
    return $_7kgirujvjd08mdum.fromDom(editor.getBody());
  };
  var getIsRoot = function (editor) {
    return function (element) {
      return $_2bcch9jzjd08mdv4.eq(element, getBody$1(editor));
    };
  };
  var removePxSuffix = function (size) {
    return size ? size.replace(/px$/, '') : '';
  };
  var addSizeSuffix = function (size) {
    if (/^[0-9]+$/.test(size)) {
      size += 'px';
    }
    return size;
  };
  var $_8t28ydn2jd08med6 = {
    getBody: getBody$1,
    getIsRoot: getIsRoot,
    addSizeSuffix: addSizeSuffix,
    removePxSuffix: removePxSuffix
  };

  var onDirection = function (isLtr, isRtl) {
    return function (element) {
      return getDirection(element) === 'rtl' ? isRtl : isLtr;
    };
  };
  var getDirection = function (element) {
    return $_ewbqy7kpjd08mdxi.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_9bhpdn4jd08medc = {
    onDirection: onDirection,
    getDirection: getDirection
  };

  var ltr$1 = { isRtl: $_bypfqijijd08mdsd.constant(false) };
  var rtl$1 = { isRtl: $_bypfqijijd08mdsd.constant(true) };
  var directionAt = function (element) {
    var dir = $_9bhpdn4jd08medc.getDirection(element);
    return dir === 'rtl' ? rtl$1 : ltr$1;
  };
  var $_2a1j9fn3jd08med9 = { directionAt: directionAt };

  function TableActions (editor, lazyWire) {
    var isTableBody = function (editor) {
      return $_c0avgfkhjd08mdwm.name($_8t28ydn2jd08med6.getBody(editor)) === 'table';
    };
    var lastRowGuard = function (table) {
      var size = $_c50n8qm0jd08me5h.getGridSize(table);
      return isTableBody(editor) === false || size.rows() > 1;
    };
    var lastColumnGuard = function (table) {
      var size = $_c50n8qm0jd08me5h.getGridSize(table);
      return isTableBody(editor) === false || size.columns() > 1;
    };
    var fireNewRow = function (node) {
      editor.fire('newrow', { node: node.dom() });
      return node.dom();
    };
    var fireNewCell = function (node) {
      editor.fire('newcell', { node: node.dom() });
      return node.dom();
    };
    var cloneFormatsArray;
    if (editor.settings.table_clone_elements !== false) {
      if (typeof editor.settings.table_clone_elements === 'string') {
        cloneFormatsArray = editor.settings.table_clone_elements.split(/[ ,]/);
      } else if (Array.isArray(editor.settings.table_clone_elements)) {
        cloneFormatsArray = editor.settings.table_clone_elements;
      }
    }
    var cloneFormats = $_7bux4mjhjd08mdsb.from(cloneFormatsArray);
    var execute = function (operation, guard, mutate, lazyWire) {
      return function (table, target) {
        var dataStyleCells = $_727gtckijd08mdwn.descendants(table, 'td[data-mce-style],th[data-mce-style]');
        $_aga3rgjgjd08mds5.each(dataStyleCells, function (cell) {
          $_1vcp6tkgjd08mdwf.remove(cell, 'data-mce-style');
        });
        var wire = lazyWire();
        var doc = $_7kgirujvjd08mdum.fromDom(editor.getDoc());
        var direction = TableDirection($_2a1j9fn3jd08med9.directionAt);
        var generators = $_ebfxzykujd08mdy4.cellOperations(mutate, doc, cloneFormats);
        return guard(table) ? operation(wire, table, target, generators, direction).bind(function (result) {
          $_aga3rgjgjd08mds5.each(result.newRows(), function (row) {
            fireNewRow(row);
          });
          $_aga3rgjgjd08mds5.each(result.newCells(), function (cell) {
            fireNewCell(cell);
          });
          return result.cursor().map(function (cell) {
            var rng = editor.dom.createRng();
            rng.setStart(cell.dom(), 0);
            rng.setEnd(cell.dom(), 0);
            return rng;
          });
        }) : $_7bux4mjhjd08mdsb.none();
      };
    };
    var deleteRow = execute($_9v25t8m1jd08me5k.eraseRows, lastRowGuard, $_bypfqijijd08mdsd.noop, lazyWire);
    var deleteColumn = execute($_9v25t8m1jd08me5k.eraseColumns, lastColumnGuard, $_bypfqijijd08mdsd.noop, lazyWire);
    var insertRowsBefore = execute($_9v25t8m1jd08me5k.insertRowsBefore, $_bypfqijijd08mdsd.always, $_bypfqijijd08mdsd.noop, lazyWire);
    var insertRowsAfter = execute($_9v25t8m1jd08me5k.insertRowsAfter, $_bypfqijijd08mdsd.always, $_bypfqijijd08mdsd.noop, lazyWire);
    var insertColumnsBefore = execute($_9v25t8m1jd08me5k.insertColumnsBefore, $_bypfqijijd08mdsd.always, $_4krt1zlojd08me3p.halve, lazyWire);
    var insertColumnsAfter = execute($_9v25t8m1jd08me5k.insertColumnsAfter, $_bypfqijijd08mdsd.always, $_4krt1zlojd08me3p.halve, lazyWire);
    var mergeCells = execute($_9v25t8m1jd08me5k.mergeCells, $_bypfqijijd08mdsd.always, $_bypfqijijd08mdsd.noop, lazyWire);
    var unmergeCells = execute($_9v25t8m1jd08me5k.unmergeCells, $_bypfqijijd08mdsd.always, $_bypfqijijd08mdsd.noop, lazyWire);
    var pasteRowsBefore = execute($_9v25t8m1jd08me5k.pasteRowsBefore, $_bypfqijijd08mdsd.always, $_bypfqijijd08mdsd.noop, lazyWire);
    var pasteRowsAfter = execute($_9v25t8m1jd08me5k.pasteRowsAfter, $_bypfqijijd08mdsd.always, $_bypfqijijd08mdsd.noop, lazyWire);
    var pasteCells = execute($_9v25t8m1jd08me5k.pasteCells, $_bypfqijijd08mdsd.always, $_bypfqijijd08mdsd.noop, lazyWire);
    return {
      deleteRow: deleteRow,
      deleteColumn: deleteColumn,
      insertRowsBefore: insertRowsBefore,
      insertRowsAfter: insertRowsAfter,
      insertColumnsBefore: insertColumnsBefore,
      insertColumnsAfter: insertColumnsAfter,
      mergeCells: mergeCells,
      unmergeCells: unmergeCells,
      pasteRowsBefore: pasteRowsBefore,
      pasteRowsAfter: pasteRowsAfter,
      pasteCells: pasteCells
    };
  }

  var copyRows = function (table, target, generators) {
    var list = $_48r5ifjqjd08mdte.fromTable(table);
    var house = $_dfmfqzkojd08mdx8.generate(list);
    var details = $_a8t5uvm8jd08me7c.onCells(house, target);
    return details.map(function (selectedCells) {
      var grid = $_acmnkzmbjd08me7u.toGrid(house, generators, false);
      var slicedGrid = grid.slice(selectedCells[0].row(), selectedCells[selectedCells.length - 1].row() + selectedCells[selectedCells.length - 1].rowspan());
      var slicedDetails = $_a8t5uvm8jd08me7c.toDetailList(slicedGrid, generators);
      return $_36nl99mejd08me8e.copy(slicedDetails);
    });
  };
  var $_4cpuugn6jd08medv = { copyRows: copyRows };

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var getTDTHOverallStyle = function (dom, elm, name) {
    var cells = dom.select('td,th', elm);
    var firstChildStyle;
    var checkChildren = function (firstChildStyle, elms) {
      for (var i = 0; i < elms.length; i++) {
        var currentStyle = dom.getStyle(elms[i], name);
        if (typeof firstChildStyle === 'undefined') {
          firstChildStyle = currentStyle;
        }
        if (firstChildStyle !== currentStyle) {
          return '';
        }
      }
      return firstChildStyle;
    };
    firstChildStyle = checkChildren(firstChildStyle, cells);
    return firstChildStyle;
  };
  var applyAlign = function (editor, elm, name) {
    if (name) {
      editor.formatter.apply('align' + name, {}, elm);
    }
  };
  var applyVAlign = function (editor, elm, name) {
    if (name) {
      editor.formatter.apply('valign' + name, {}, elm);
    }
  };
  var unApplyAlign = function (editor, elm) {
    Tools.each('left center right'.split(' '), function (name) {
      editor.formatter.remove('align' + name, {}, elm);
    });
  };
  var unApplyVAlign = function (editor, elm) {
    Tools.each('top middle bottom'.split(' '), function (name) {
      editor.formatter.remove('valign' + name, {}, elm);
    });
  };
  var $_dj5hx6najd08mee6 = {
    applyAlign: applyAlign,
    applyVAlign: applyVAlign,
    unApplyAlign: unApplyAlign,
    unApplyVAlign: unApplyVAlign,
    getTDTHOverallStyle: getTDTHOverallStyle
  };

  var buildListItems = function (inputList, itemCallback, startItems) {
    var appendItems = function (values, output) {
      output = output || [];
      Tools.each(values, function (item) {
        var menuItem = { text: item.text || item.title };
        if (item.menu) {
          menuItem.menu = appendItems(item.menu);
        } else {
          menuItem.value = item.value;
          if (itemCallback) {
            itemCallback(menuItem);
          }
        }
        output.push(menuItem);
      });
      return output;
    };
    return appendItems(inputList, startItems || []);
  };
  var updateStyleField = function (editor, evt) {
    var dom = editor.dom;
    var rootControl = evt.control.rootControl;
    var data = rootControl.toJSON();
    var css = dom.parseStyle(data.style);
    if (evt.control.name() === 'style') {
      rootControl.find('#borderStyle').value(css['border-style'] || '')[0].fire('select');
      rootControl.find('#borderColor').value(css['border-color'] || '')[0].fire('change');
      rootControl.find('#backgroundColor').value(css['background-color'] || '')[0].fire('change');
      rootControl.find('#width').value(css.width || '').fire('change');
      rootControl.find('#height').value(css.height || '').fire('change');
    } else {
      css['border-style'] = data.borderStyle;
      css['border-color'] = data.borderColor;
      css['background-color'] = data.backgroundColor;
      css.width = data.width ? $_8t28ydn2jd08med6.addSizeSuffix(data.width) : '';
      css.height = data.height ? $_8t28ydn2jd08med6.addSizeSuffix(data.height) : '';
    }
    rootControl.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));
  };
  var extractAdvancedStyles = function (dom, elm) {
    var css = dom.parseStyle(dom.getAttrib(elm, 'style'));
    var data = {};
    if (css['border-style']) {
      data.borderStyle = css['border-style'];
    }
    if (css['border-color']) {
      data.borderColor = css['border-color'];
    }
    if (css['background-color']) {
      data.backgroundColor = css['background-color'];
    }
    data.style = dom.serializeStyle(css);
    return data;
  };
  var createStyleForm = function (editor) {
    var createColorPickAction = function () {
      var colorPickerCallback = editor.settings.color_picker_callback;
      if (colorPickerCallback) {
        return function (evt) {
          return colorPickerCallback.call(editor, function (value) {
            evt.control.value(value).fire('change');
          }, evt.control.value());
        };
      }
    };
    return {
      title: 'Advanced',
      type: 'form',
      defaults: { onchange: $_bypfqijijd08mdsd.curry(updateStyleField, editor) },
      items: [
        {
          label: 'Style',
          name: 'style',
          type: 'textbox'
        },
        {
          type: 'form',
          padding: 0,
          formItemDefaults: {
            layout: 'grid',
            alignH: [
              'start',
              'right'
            ]
          },
          defaults: { size: 7 },
          items: [
            {
              label: 'Border style',
              type: 'listbox',
              name: 'borderStyle',
              width: 90,
              onselect: $_bypfqijijd08mdsd.curry(updateStyleField, editor),
              values: [
                {
                  text: 'Select...',
                  value: ''
                },
                {
                  text: 'Solid',
                  value: 'solid'
                },
                {
                  text: 'Dotted',
                  value: 'dotted'
                },
                {
                  text: 'Dashed',
                  value: 'dashed'
                },
                {
                  text: 'Double',
                  value: 'double'
                },
                {
                  text: 'Groove',
                  value: 'groove'
                },
                {
                  text: 'Ridge',
                  value: 'ridge'
                },
                {
                  text: 'Inset',
                  value: 'inset'
                },
                {
                  text: 'Outset',
                  value: 'outset'
                },
                {
                  text: 'None',
                  value: 'none'
                },
                {
                  text: 'Hidden',
                  value: 'hidden'
                }
              ]
            },
            {
              label: 'Border color',
              type: 'colorbox',
              name: 'borderColor',
              onaction: createColorPickAction()
            },
            {
              label: 'Background color',
              type: 'colorbox',
              name: 'backgroundColor',
              onaction: createColorPickAction()
            }
          ]
        }
      ]
    };
  };
  var $_3zj6ornbjd08mee8 = {
    createStyleForm: createStyleForm,
    buildListItems: buildListItems,
    updateStyleField: updateStyleField,
    extractAdvancedStyles: extractAdvancedStyles
  };

  function styleTDTH(dom, elm, name, value) {
    if (elm.tagName === 'TD' || elm.tagName === 'TH') {
      dom.setStyle(elm, name, value);
    } else {
      if (elm.children) {
        for (var i = 0; i < elm.children.length; i++) {
          styleTDTH(dom, elm.children[i], name, value);
        }
      }
    }
  }
  var extractDataFromElement = function (editor, tableElm) {
    var dom = editor.dom;
    var data = {
      width: dom.getStyle(tableElm, 'width') || dom.getAttrib(tableElm, 'width'),
      height: dom.getStyle(tableElm, 'height') || dom.getAttrib(tableElm, 'height'),
      cellspacing: dom.getStyle(tableElm, 'border-spacing') || dom.getAttrib(tableElm, 'cellspacing'),
      cellpadding: dom.getAttrib(tableElm, 'data-mce-cell-padding') || dom.getAttrib(tableElm, 'cellpadding') || $_dj5hx6najd08mee6.getTDTHOverallStyle(editor.dom, tableElm, 'padding'),
      border: dom.getAttrib(tableElm, 'data-mce-border') || dom.getAttrib(tableElm, 'border') || $_dj5hx6najd08mee6.getTDTHOverallStyle(editor.dom, tableElm, 'border'),
      borderColor: dom.getAttrib(tableElm, 'data-mce-border-color'),
      caption: !!dom.select('caption', tableElm)[0],
      class: dom.getAttrib(tableElm, 'class')
    };
    Tools.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(tableElm, 'align' + name)) {
        data.align = name;
      }
    });
    if (editor.settings.table_advtab !== false) {
      Tools.extend(data, $_3zj6ornbjd08mee8.extractAdvancedStyles(dom, tableElm));
    }
    return data;
  };
  var applyDataToElement = function (editor, tableElm, data) {
    var dom = editor.dom;
    var attrs = {};
    var styles = {};
    attrs.class = data.class;
    styles.height = $_8t28ydn2jd08med6.addSizeSuffix(data.height);
    if (dom.getAttrib(tableElm, 'width') && !editor.settings.table_style_by_css) {
      attrs.width = $_8t28ydn2jd08med6.removePxSuffix(data.width);
    } else {
      styles.width = $_8t28ydn2jd08med6.addSizeSuffix(data.width);
    }
    if (editor.settings.table_style_by_css) {
      styles['border-width'] = $_8t28ydn2jd08med6.addSizeSuffix(data.border);
      styles['border-spacing'] = $_8t28ydn2jd08med6.addSizeSuffix(data.cellspacing);
      Tools.extend(attrs, {
        'data-mce-border-color': data.borderColor,
        'data-mce-cell-padding': data.cellpadding,
        'data-mce-border': data.border
      });
    } else {
      Tools.extend(attrs, {
        border: data.border,
        cellpadding: data.cellpadding,
        cellspacing: data.cellspacing
      });
    }
    if (editor.settings.table_style_by_css) {
      if (tableElm.children) {
        for (var i = 0; i < tableElm.children.length; i++) {
          styleTDTH(dom, tableElm.children[i], {
            'border-width': $_8t28ydn2jd08med6.addSizeSuffix(data.border),
            'border-color': data.borderColor,
            'padding': $_8t28ydn2jd08med6.addSizeSuffix(data.cellpadding)
          });
        }
      }
    }
    if (data.style) {
      Tools.extend(styles, dom.parseStyle(data.style));
    } else {
      styles = Tools.extend({}, dom.parseStyle(dom.getAttrib(tableElm, 'style')), styles);
    }
    attrs.style = dom.serializeStyle(styles);
    dom.setAttribs(tableElm, attrs);
  };
  var onSubmitTableForm = function (editor, tableElm, evt) {
    var dom = editor.dom;
    var captionElm;
    var data;
    $_3zj6ornbjd08mee8.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    if (data.class === false) {
      delete data.class;
    }
    editor.undoManager.transact(function () {
      if (!tableElm) {
        tableElm = $_1rnf7sljjd08me2n.insert(editor, data.cols || 1, data.rows || 1);
      }
      applyDataToElement(editor, tableElm, data);
      captionElm = dom.select('caption', tableElm)[0];
      if (captionElm && !data.caption) {
        dom.remove(captionElm);
      }
      if (!captionElm && data.caption) {
        captionElm = dom.create('caption');
        captionElm.innerHTML = !Env.ie ? '<br data-mce-bogus="1"/>' : '\xA0';
        tableElm.insertBefore(captionElm, tableElm.firstChild);
      }
      $_dj5hx6najd08mee6.unApplyAlign(editor, tableElm);
      if (data.align) {
        $_dj5hx6najd08mee6.applyAlign(editor, tableElm, data.align);
      }
      editor.focus();
      editor.addVisual();
    });
  };
  var open = function (editor, isProps) {
    var dom = editor.dom;
    var tableElm, colsCtrl, rowsCtrl, classListCtrl, data = {}, generalTableForm;
    if (isProps === true) {
      tableElm = dom.getParent(editor.selection.getStart(), 'table');
      if (tableElm) {
        data = extractDataFromElement(editor, tableElm);
      }
    } else {
      colsCtrl = {
        label: 'Cols',
        name: 'cols'
      };
      rowsCtrl = {
        label: 'Rows',
        name: 'rows'
      };
    }
    if (editor.settings.table_class_list) {
      if (data.class) {
        data.class = data.class.replace(/\s*mce\-item\-table\s*/g, '');
      }
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_3zj6ornbjd08mee8.buildListItems(editor.settings.table_class_list, function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'table',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    generalTableForm = {
      type: 'form',
      layout: 'flex',
      direction: 'column',
      labelGapCalc: 'children',
      padding: 0,
      items: [
        {
          type: 'form',
          labelGapCalc: false,
          padding: 0,
          layout: 'grid',
          columns: 2,
          defaults: {
            type: 'textbox',
            maxWidth: 50
          },
          items: editor.settings.table_appearance_options !== false ? [
            colsCtrl,
            rowsCtrl,
            {
              label: 'Width',
              name: 'width',
              onchange: $_bypfqijijd08mdsd.curry($_3zj6ornbjd08mee8.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_bypfqijijd08mdsd.curry($_3zj6ornbjd08mee8.updateStyleField, editor)
            },
            {
              label: 'Cell spacing',
              name: 'cellspacing'
            },
            {
              label: 'Cell padding',
              name: 'cellpadding'
            },
            {
              label: 'Border',
              name: 'border'
            },
            {
              label: 'Caption',
              name: 'caption',
              type: 'checkbox'
            }
          ] : [
            colsCtrl,
            rowsCtrl,
            {
              label: 'Width',
              name: 'width',
              onchange: $_bypfqijijd08mdsd.curry($_3zj6ornbjd08mee8.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_bypfqijijd08mdsd.curry($_3zj6ornbjd08mee8.updateStyleField, editor)
            }
          ]
        },
        {
          label: 'Alignment',
          name: 'align',
          type: 'listbox',
          text: 'None',
          values: [
            {
              text: 'None',
              value: ''
            },
            {
              text: 'Left',
              value: 'left'
            },
            {
              text: 'Center',
              value: 'center'
            },
            {
              text: 'Right',
              value: 'right'
            }
          ]
        },
        classListCtrl
      ]
    };
    if (editor.settings.table_advtab !== false) {
      editor.windowManager.open({
        title: 'Table properties',
        data: data,
        bodyType: 'tabpanel',
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalTableForm
          },
          $_3zj6ornbjd08mee8.createStyleForm(editor)
        ],
        onsubmit: $_bypfqijijd08mdsd.curry(onSubmitTableForm, editor, tableElm)
      });
    } else {
      editor.windowManager.open({
        title: 'Table properties',
        data: data,
        body: generalTableForm,
        onsubmit: $_bypfqijijd08mdsd.curry(onSubmitTableForm, editor, tableElm)
      });
    }
  };
  var $_djpbofn8jd08medz = { open: open };

  var extractDataFromElement$1 = function (editor, elm) {
    var dom = editor.dom;
    var data = {
      height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
      scope: dom.getAttrib(elm, 'scope'),
      class: dom.getAttrib(elm, 'class')
    };
    data.type = elm.parentNode.nodeName.toLowerCase();
    Tools.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'align' + name)) {
        data.align = name;
      }
    });
    if (editor.settings.table_row_advtab !== false) {
      Tools.extend(data, $_3zj6ornbjd08mee8.extractAdvancedStyles(dom, elm));
    }
    return data;
  };
  var switchRowType = function (dom, rowElm, toType) {
    var tableElm = dom.getParent(rowElm, 'table');
    var oldParentElm = rowElm.parentNode;
    var parentElm = dom.select(toType, tableElm)[0];
    if (!parentElm) {
      parentElm = dom.create(toType);
      if (tableElm.firstChild) {
        if (tableElm.firstChild.nodeName === 'CAPTION') {
          dom.insertAfter(parentElm, tableElm.firstChild);
        } else {
          tableElm.insertBefore(parentElm, tableElm.firstChild);
        }
      } else {
        tableElm.appendChild(parentElm);
      }
    }
    parentElm.appendChild(rowElm);
    if (!oldParentElm.hasChildNodes()) {
      dom.remove(oldParentElm);
    }
  };
  function onSubmitRowForm(editor, rows, evt) {
    var dom = editor.dom;
    var data;
    function setAttrib(elm, name, value) {
      if (value) {
        dom.setAttrib(elm, name, value);
      }
    }
    function setStyle(elm, name, value) {
      if (value) {
        dom.setStyle(elm, name, value);
      }
    }
    $_3zj6ornbjd08mee8.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      Tools.each(rows, function (rowElm) {
        setAttrib(rowElm, 'scope', data.scope);
        setAttrib(rowElm, 'style', data.style);
        setAttrib(rowElm, 'class', data.class);
        setStyle(rowElm, 'height', $_8t28ydn2jd08med6.addSizeSuffix(data.height));
        if (data.type !== rowElm.parentNode.nodeName.toLowerCase()) {
          switchRowType(editor.dom, rowElm, data.type);
        }
        if (rows.length === 1) {
          $_dj5hx6najd08mee6.unApplyAlign(editor, rowElm);
        }
        if (data.align) {
          $_dj5hx6najd08mee6.applyAlign(editor, rowElm, data.align);
        }
      });
      editor.focus();
    });
  }
  var open$1 = function (editor) {
    var dom = editor.dom;
    var tableElm, cellElm, rowElm, classListCtrl, data;
    var rows = [];
    var generalRowForm;
    tableElm = dom.getParent(editor.selection.getStart(), 'table');
    cellElm = dom.getParent(editor.selection.getStart(), 'td,th');
    Tools.each(tableElm.rows, function (row) {
      Tools.each(row.cells, function (cell) {
        if (dom.getAttrib(cell, 'data-mce-selected') || cell === cellElm) {
          rows.push(row);
          return false;
        }
      });
    });
    rowElm = rows[0];
    if (!rowElm) {
      return;
    }
    if (rows.length > 1) {
      data = {
        height: '',
        scope: '',
        class: '',
        align: '',
        type: rowElm.parentNode.nodeName.toLowerCase()
      };
    } else {
      data = extractDataFromElement$1(editor, rowElm);
    }
    if (editor.settings.table_row_class_list) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_3zj6ornbjd08mee8.buildListItems(editor.settings.table_row_class_list, function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'tr',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    generalRowForm = {
      type: 'form',
      columns: 2,
      padding: 0,
      defaults: { type: 'textbox' },
      items: [
        {
          type: 'listbox',
          name: 'type',
          label: 'Row type',
          text: 'Header',
          maxWidth: null,
          values: [
            {
              text: 'Header',
              value: 'thead'
            },
            {
              text: 'Body',
              value: 'tbody'
            },
            {
              text: 'Footer',
              value: 'tfoot'
            }
          ]
        },
        {
          type: 'listbox',
          name: 'align',
          label: 'Alignment',
          text: 'None',
          maxWidth: null,
          values: [
            {
              text: 'None',
              value: ''
            },
            {
              text: 'Left',
              value: 'left'
            },
            {
              text: 'Center',
              value: 'center'
            },
            {
              text: 'Right',
              value: 'right'
            }
          ]
        },
        {
          label: 'Height',
          name: 'height'
        },
        classListCtrl
      ]
    };
    if (editor.settings.table_row_advtab !== false) {
      editor.windowManager.open({
        title: 'Row properties',
        data: data,
        bodyType: 'tabpanel',
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalRowForm
          },
          $_3zj6ornbjd08mee8.createStyleForm(editor)
        ],
        onsubmit: $_bypfqijijd08mdsd.curry(onSubmitRowForm, editor, rows)
      });
    } else {
      editor.windowManager.open({
        title: 'Row properties',
        data: data,
        body: generalRowForm,
        onsubmit: $_bypfqijijd08mdsd.curry(onSubmitRowForm, editor, rows)
      });
    }
  };
  var $_9hcvbgncjd08meed = { open: open$1 };

  var updateStyles = function (elm, cssText) {
    elm.style.cssText += ';' + cssText;
  };
  var extractDataFromElement$2 = function (editor, elm) {
    var dom = editor.dom;
    var data = {
      width: dom.getStyle(elm, 'width') || dom.getAttrib(elm, 'width'),
      height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
      scope: dom.getAttrib(elm, 'scope'),
      class: dom.getAttrib(elm, 'class')
    };
    data.type = elm.nodeName.toLowerCase();
    Tools.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'align' + name)) {
        data.align = name;
      }
    });
    Tools.each('top middle bottom'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'valign' + name)) {
        data.valign = name;
      }
    });
    if (editor.settings.table_cell_advtab !== false) {
      Tools.extend(data, $_3zj6ornbjd08mee8.extractAdvancedStyles(dom, elm));
    }
    return data;
  };
  var onSubmitCellForm = function (editor, cells, evt) {
    var dom = editor.dom;
    var data;
    function setAttrib(elm, name, value) {
      if (value) {
        dom.setAttrib(elm, name, value);
      }
    }
    function setStyle(elm, name, value) {
      if (value) {
        dom.setStyle(elm, name, value);
      }
    }
    $_3zj6ornbjd08mee8.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      Tools.each(cells, function (cellElm) {
        setAttrib(cellElm, 'scope', data.scope);
        if (cells.length === 1) {
          setAttrib(cellElm, 'style', data.style);
        } else {
          updateStyles(cellElm, data.style);
        }
        setAttrib(cellElm, 'class', data.class);
        setStyle(cellElm, 'width', $_8t28ydn2jd08med6.addSizeSuffix(data.width));
        setStyle(cellElm, 'height', $_8t28ydn2jd08med6.addSizeSuffix(data.height));
        if (data.type && cellElm.nodeName.toLowerCase() !== data.type) {
          cellElm = dom.rename(cellElm, data.type);
        }
        if (cells.length === 1) {
          $_dj5hx6najd08mee6.unApplyAlign(editor, cellElm);
          $_dj5hx6najd08mee6.unApplyVAlign(editor, cellElm);
        }
        if (data.align) {
          $_dj5hx6najd08mee6.applyAlign(editor, cellElm, data.align);
        }
        if (data.valign) {
          $_dj5hx6najd08mee6.applyVAlign(editor, cellElm, data.valign);
        }
      });
      editor.focus();
    });
  };
  var open$2 = function (editor) {
    var cellElm, data, classListCtrl, cells = [];
    cells = editor.dom.select('td[data-mce-selected],th[data-mce-selected]');
    cellElm = editor.dom.getParent(editor.selection.getStart(), 'td,th');
    if (!cells.length && cellElm) {
      cells.push(cellElm);
    }
    cellElm = cellElm || cells[0];
    if (!cellElm) {
      return;
    }
    if (cells.length > 1) {
      data = {
        width: '',
        height: '',
        scope: '',
        class: '',
        align: '',
        style: '',
        type: cellElm.nodeName.toLowerCase()
      };
    } else {
      data = extractDataFromElement$2(editor, cellElm);
    }
    if (editor.settings.table_cell_class_list) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_3zj6ornbjd08mee8.buildListItems(editor.settings.table_cell_class_list, function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'td',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    var generalCellForm = {
      type: 'form',
      layout: 'flex',
      direction: 'column',
      labelGapCalc: 'children',
      padding: 0,
      items: [
        {
          type: 'form',
          layout: 'grid',
          columns: 2,
          labelGapCalc: false,
          padding: 0,
          defaults: {
            type: 'textbox',
            maxWidth: 50
          },
          items: [
            {
              label: 'Width',
              name: 'width',
              onchange: $_bypfqijijd08mdsd.curry($_3zj6ornbjd08mee8.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_bypfqijijd08mdsd.curry($_3zj6ornbjd08mee8.updateStyleField, editor)
            },
            {
              label: 'Cell type',
              name: 'type',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'Cell',
                  value: 'td'
                },
                {
                  text: 'Header cell',
                  value: 'th'
                }
              ]
            },
            {
              label: 'Scope',
              name: 'scope',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Row',
                  value: 'row'
                },
                {
                  text: 'Column',
                  value: 'col'
                },
                {
                  text: 'Row group',
                  value: 'rowgroup'
                },
                {
                  text: 'Column group',
                  value: 'colgroup'
                }
              ]
            },
            {
              label: 'H Align',
              name: 'align',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Left',
                  value: 'left'
                },
                {
                  text: 'Center',
                  value: 'center'
                },
                {
                  text: 'Right',
                  value: 'right'
                }
              ]
            },
            {
              label: 'V Align',
              name: 'valign',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
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
              ]
            }
          ]
        },
        classListCtrl
      ]
    };
    if (editor.settings.table_cell_advtab !== false) {
      editor.windowManager.open({
        title: 'Cell properties',
        bodyType: 'tabpanel',
        data: data,
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalCellForm
          },
          $_3zj6ornbjd08mee8.createStyleForm(editor)
        ],
        onsubmit: $_bypfqijijd08mdsd.curry(onSubmitCellForm, editor, cells)
      });
    } else {
      editor.windowManager.open({
        title: 'Cell properties',
        data: data,
        body: generalCellForm,
        onsubmit: $_bypfqijijd08mdsd.curry(onSubmitCellForm, editor, cells)
      });
    }
  };
  var $_bpk0rdndjd08meen = { open: open$2 };

  var each$3 = Tools.each;
  var clipboardRows = $_7bux4mjhjd08mdsb.none();
  var getClipboardRows = function () {
    return clipboardRows.fold(function () {
      return;
    }, function (rows) {
      return $_aga3rgjgjd08mds5.map(rows, function (row) {
        return row.dom();
      });
    });
  };
  var setClipboardRows = function (rows) {
    var sugarRows = $_aga3rgjgjd08mds5.map(rows, $_7kgirujvjd08mdum.fromDom);
    clipboardRows = $_7bux4mjhjd08mdsb.from(sugarRows);
  };
  var registerCommands = function (editor, actions, cellSelection, selections) {
    var isRoot = $_8t28ydn2jd08med6.getIsRoot(editor);
    var eraseTable = function () {
      var cell = $_7kgirujvjd08mdum.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
      var table = $_915052jsjd08mdtp.table(cell, isRoot);
      table.filter($_bypfqijijd08mdsd.not(isRoot)).each(function (table) {
        var cursor = $_7kgirujvjd08mdum.fromText('');
        $_cxkc4ckrjd08mdxu.after(table, cursor);
        $_56z3hjksjd08mdxz.remove(table);
        var rng = editor.dom.createRng();
        rng.setStart(cursor.dom(), 0);
        rng.setEnd(cursor.dom(), 0);
        editor.selection.setRng(rng);
      });
    };
    var getSelectionStartCell = function () {
      return $_7kgirujvjd08mdum.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
    };
    var getTableFromCell = function (cell) {
      return $_915052jsjd08mdtp.table(cell, isRoot);
    };
    var actOnSelection = function (execute) {
      var cell = getSelectionStartCell();
      var table = getTableFromCell(cell);
      table.each(function (table) {
        var targets = $_16zmzpl1jd08mdz3.forMenu(selections, table, cell);
        execute(table, targets).each(function (rng) {
          editor.selection.setRng(rng);
          editor.focus();
          cellSelection.clear(table);
        });
      });
    };
    var copyRowSelection = function (execute) {
      var cell = getSelectionStartCell();
      var table = getTableFromCell(cell);
      return table.bind(function (table) {
        var doc = $_7kgirujvjd08mdum.fromDom(editor.getDoc());
        var targets = $_16zmzpl1jd08mdz3.forMenu(selections, table, cell);
        var generators = $_ebfxzykujd08mdy4.cellOperations($_bypfqijijd08mdsd.noop, doc, $_7bux4mjhjd08mdsb.none());
        return $_4cpuugn6jd08medv.copyRows(table, targets, generators);
      });
    };
    var pasteOnSelection = function (execute) {
      clipboardRows.each(function (rows) {
        var clonedRows = $_aga3rgjgjd08mds5.map(rows, function (row) {
          return $_2fxlt8kvjd08mdym.deep(row);
        });
        var cell = getSelectionStartCell();
        var table = getTableFromCell(cell);
        table.bind(function (table) {
          var doc = $_7kgirujvjd08mdum.fromDom(editor.getDoc());
          var generators = $_ebfxzykujd08mdy4.paste(doc);
          var targets = $_16zmzpl1jd08mdz3.pasteRows(selections, table, cell, clonedRows, generators);
          execute(table, targets).each(function (rng) {
            editor.selection.setRng(rng);
            editor.focus();
            cellSelection.clear(table);
          });
        });
      });
    };
    each$3({
      mceTableSplitCells: function () {
        actOnSelection(actions.unmergeCells);
      },
      mceTableMergeCells: function () {
        actOnSelection(actions.mergeCells);
      },
      mceTableInsertRowBefore: function () {
        actOnSelection(actions.insertRowsBefore);
      },
      mceTableInsertRowAfter: function () {
        actOnSelection(actions.insertRowsAfter);
      },
      mceTableInsertColBefore: function () {
        actOnSelection(actions.insertColumnsBefore);
      },
      mceTableInsertColAfter: function () {
        actOnSelection(actions.insertColumnsAfter);
      },
      mceTableDeleteCol: function () {
        actOnSelection(actions.deleteColumn);
      },
      mceTableDeleteRow: function () {
        actOnSelection(actions.deleteRow);
      },
      mceTableCutRow: function (grid) {
        clipboardRows = copyRowSelection();
        actOnSelection(actions.deleteRow);
      },
      mceTableCopyRow: function (grid) {
        clipboardRows = copyRowSelection();
      },
      mceTablePasteRowBefore: function (grid) {
        pasteOnSelection(actions.pasteRowsBefore);
      },
      mceTablePasteRowAfter: function (grid) {
        pasteOnSelection(actions.pasteRowsAfter);
      },
      mceTableDelete: eraseTable
    }, function (func, name) {
      editor.addCommand(name, func);
    });
    each$3({
      mceInsertTable: $_bypfqijijd08mdsd.curry($_djpbofn8jd08medz.open, editor),
      mceTableProps: $_bypfqijijd08mdsd.curry($_djpbofn8jd08medz.open, editor, true),
      mceTableRowProps: $_bypfqijijd08mdsd.curry($_9hcvbgncjd08meed.open, editor),
      mceTableCellProps: $_bypfqijijd08mdsd.curry($_bpk0rdndjd08meen.open, editor)
    }, function (func, name) {
      editor.addCommand(name, function (ui, val) {
        func(val);
      });
    });
  };
  var $_fxmrgyn5jd08mede = {
    registerCommands: registerCommands,
    getClipboardRows: getClipboardRows,
    setClipboardRows: setClipboardRows
  };

  var only$1 = function (element) {
    var parent = $_7bux4mjhjd08mdsb.from(element.dom().documentElement).map($_7kgirujvjd08mdum.fromDom).getOr(element);
    return {
      parent: $_bypfqijijd08mdsd.constant(parent),
      view: $_bypfqijijd08mdsd.constant(element),
      origin: $_bypfqijijd08mdsd.constant(r(0, 0))
    };
  };
  var detached = function (editable, chrome) {
    var origin = $_bypfqijijd08mdsd.curry($_2vv40slxjd08me5a.absolute, chrome);
    return {
      parent: $_bypfqijijd08mdsd.constant(chrome),
      view: $_bypfqijijd08mdsd.constant(editable),
      origin: origin
    };
  };
  var body$1 = function (editable, chrome) {
    return {
      parent: $_bypfqijijd08mdsd.constant(chrome),
      view: $_bypfqijijd08mdsd.constant(editable),
      origin: $_bypfqijijd08mdsd.constant(r(0, 0))
    };
  };
  var $_9o8q9knfjd08mef5 = {
    only: only$1,
    detached: detached,
    body: body$1
  };

  function Event (fields) {
    var struct = $_2806jejljd08mdt0.immutable.apply(null, fields);
    var handlers = [];
    var bind = function (handler) {
      if (handler === undefined) {
        throw 'Event bind error: undefined handler';
      }
      handlers.push(handler);
    };
    var unbind = function (handler) {
      handlers = $_aga3rgjgjd08mds5.filter(handlers, function (h) {
        return h !== handler;
      });
    };
    var trigger = function () {
      var event = struct.apply(null, arguments);
      $_aga3rgjgjd08mds5.each(handlers, function (handler) {
        handler(event);
      });
    };
    return {
      bind: bind,
      unbind: unbind,
      trigger: trigger
    };
  }

  var create = function (typeDefs) {
    var registry = $_f3n2vcjkjd08mdsy.map(typeDefs, function (event) {
      return {
        bind: event.bind,
        unbind: event.unbind
      };
    });
    var trigger = $_f3n2vcjkjd08mdsy.map(typeDefs, function (event) {
      return event.trigger;
    });
    return {
      registry: registry,
      trigger: trigger
    };
  };
  var $_2vfjlwnijd08mefo = { create: create };

  var mode = $_c7j65gm4jd08me6c.exactly([
    'compare',
    'extract',
    'mutate',
    'sink'
  ]);
  var sink = $_c7j65gm4jd08me6c.exactly([
    'element',
    'start',
    'stop',
    'destroy'
  ]);
  var api$3 = $_c7j65gm4jd08me6c.exactly([
    'forceDrop',
    'drop',
    'move',
    'delayDrop'
  ]);
  var $_ap2co6nmjd08meh0 = {
    mode: mode,
    sink: sink,
    api: api$3
  };

  var styles$1 = $_7v9ib7mkjd08meaa.css('ephox-dragster');
  var $_2rj5exnojd08mehd = { resolve: styles$1.resolve };

  function Blocker (options) {
    var settings = $_36d0dsm9jd08me7p.merge({ 'layerClass': $_2rj5exnojd08mehd.resolve('blocker') }, options);
    var div = $_7kgirujvjd08mdum.fromTag('div');
    $_1vcp6tkgjd08mdwf.set(div, 'role', 'presentation');
    $_ewbqy7kpjd08mdxi.setAll(div, {
      position: 'fixed',
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%'
    });
    $_frd0lomljd08mead.add(div, $_2rj5exnojd08mehd.resolve('blocker'));
    $_frd0lomljd08mead.add(div, settings.layerClass);
    var element = function () {
      return div;
    };
    var destroy = function () {
      $_56z3hjksjd08mdxz.remove(div);
    };
    return {
      element: element,
      destroy: destroy
    };
  }

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_bypfqijijd08mdsd.constant(target),
      'x': $_bypfqijijd08mdsd.constant(x),
      'y': $_bypfqijijd08mdsd.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_bypfqijijd08mdsd.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_7kgirujvjd08mdum.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_bypfqijijd08mdsd.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_bypfqijijd08mdsd.curry(unbind, element, event, wrapped, useCapture) };
  };
  var bind$1 = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, false);
  };
  var capture = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, true);
  };
  var unbind = function (element, event, handler, useCapture) {
    element.dom().removeEventListener(event, handler, useCapture);
  };
  var $_9ojwk7nqjd08mehk = {
    bind: bind$1,
    capture: capture
  };

  var filter$1 = $_bypfqijijd08mdsd.constant(true);
  var bind$2 = function (element, event, handler) {
    return $_9ojwk7nqjd08mehk.bind(element, event, filter$1, handler);
  };
  var capture$1 = function (element, event, handler) {
    return $_9ojwk7nqjd08mehk.capture(element, event, filter$1, handler);
  };
  var $_c3vkagnpjd08mehg = {
    bind: bind$2,
    capture: capture$1
  };

  var compare = function (old, nu) {
    return r(nu.left() - old.left(), nu.top() - old.top());
  };
  var extract$1 = function (event) {
    return $_7bux4mjhjd08mdsb.some(r(event.x(), event.y()));
  };
  var mutate$1 = function (mutation, info) {
    mutation.mutate(info.left(), info.top());
  };
  var sink$1 = function (dragApi, settings) {
    var blocker = Blocker(settings);
    var mdown = $_c3vkagnpjd08mehg.bind(blocker.element(), 'mousedown', dragApi.forceDrop);
    var mup = $_c3vkagnpjd08mehg.bind(blocker.element(), 'mouseup', dragApi.drop);
    var mmove = $_c3vkagnpjd08mehg.bind(blocker.element(), 'mousemove', dragApi.move);
    var mout = $_c3vkagnpjd08mehg.bind(blocker.element(), 'mouseout', dragApi.delayDrop);
    var destroy = function () {
      blocker.destroy();
      mup.unbind();
      mmove.unbind();
      mout.unbind();
      mdown.unbind();
    };
    var start = function (parent) {
      $_cxkc4ckrjd08mdxu.append(parent, blocker.element());
    };
    var stop = function () {
      $_56z3hjksjd08mdxz.remove(blocker.element());
    };
    return $_ap2co6nmjd08meh0.sink({
      element: blocker.element,
      start: start,
      stop: stop,
      destroy: destroy
    });
  };
  var MouseDrag = $_ap2co6nmjd08meh0.mode({
    compare: compare,
    extract: extract$1,
    sink: sink$1,
    mutate: mutate$1
  });

  function InDrag () {
    var previous = $_7bux4mjhjd08mdsb.none();
    var reset = function () {
      previous = $_7bux4mjhjd08mdsb.none();
    };
    var update = function (mode, nu) {
      var result = previous.map(function (old) {
        return mode.compare(old, nu);
      });
      previous = $_7bux4mjhjd08mdsb.some(nu);
      return result;
    };
    var onEvent = function (event, mode) {
      var dataOption = mode.extract(event);
      dataOption.each(function (data) {
        var offset = update(mode, data);
        offset.each(function (d) {
          events.trigger.move(d);
        });
      });
    };
    var events = $_2vfjlwnijd08mefo.create({ move: Event(['info']) });
    return {
      onEvent: onEvent,
      reset: reset,
      events: events.registry
    };
  }

  function NoDrag (anchor) {
    var onEvent = function (event, mode) {
    };
    return {
      onEvent: onEvent,
      reset: $_bypfqijijd08mdsd.noop
    };
  }

  function Movement () {
    var noDragState = NoDrag();
    var inDragState = InDrag();
    var dragState = noDragState;
    var on = function () {
      dragState.reset();
      dragState = inDragState;
    };
    var off = function () {
      dragState.reset();
      dragState = noDragState;
    };
    var onEvent = function (event, mode) {
      dragState.onEvent(event, mode);
    };
    var isOn = function () {
      return dragState === inDragState;
    };
    return {
      on: on,
      off: off,
      isOn: isOn,
      onEvent: onEvent,
      events: inDragState.events
    };
  }

  var adaptable = function (fn, rate) {
    var timer = null;
    var args = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
        args = null;
      }
    };
    var throttle = function () {
      args = arguments;
      if (timer === null) {
        timer = setTimeout(function () {
          fn.apply(null, args);
          timer = null;
          args = null;
        }, rate);
      }
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var first$4 = function (fn, rate) {
    var timer = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    var throttle = function () {
      var args = arguments;
      if (timer === null) {
        timer = setTimeout(function () {
          fn.apply(null, args);
          timer = null;
          args = null;
        }, rate);
      }
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var last$3 = function (fn, rate) {
    var timer = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    var throttle = function () {
      var args = arguments;
      if (timer !== null)
        clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(null, args);
        timer = null;
        args = null;
      }, rate);
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var $_g9sbvfnvjd08meic = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var setup = function (mutation, mode, settings) {
    var active = false;
    var events = $_2vfjlwnijd08mefo.create({
      start: Event([]),
      stop: Event([])
    });
    var movement = Movement();
    var drop = function () {
      sink.stop();
      if (movement.isOn()) {
        movement.off();
        events.trigger.stop();
      }
    };
    var throttledDrop = $_g9sbvfnvjd08meic.last(drop, 200);
    var go = function (parent) {
      sink.start(parent);
      movement.on();
      events.trigger.start();
    };
    var mousemove = function (event, ui) {
      throttledDrop.cancel();
      movement.onEvent(event, mode);
    };
    movement.events.move.bind(function (event) {
      mode.mutate(mutation, event.info());
    });
    var on = function () {
      active = true;
    };
    var off = function () {
      active = false;
    };
    var runIfActive = function (f) {
      return function () {
        var args = Array.prototype.slice.call(arguments, 0);
        if (active) {
          return f.apply(null, args);
        }
      };
    };
    var sink = mode.sink($_ap2co6nmjd08meh0.api({
      forceDrop: drop,
      drop: runIfActive(drop),
      move: runIfActive(mousemove),
      delayDrop: runIfActive(throttledDrop.throttle)
    }), settings);
    var destroy = function () {
      sink.destroy();
    };
    return {
      element: sink.element,
      go: go,
      on: on,
      off: off,
      destroy: destroy,
      events: events.registry
    };
  };
  var $_3d1205nrjd08mehq = { setup: setup };

  var transform$1 = function (mutation, options) {
    var settings = options !== undefined ? options : {};
    var mode = settings.mode !== undefined ? settings.mode : MouseDrag;
    return $_3d1205nrjd08mehq.setup(mutation, mode, options);
  };
  var $_8cgyg9nkjd08megj = { transform: transform$1 };

  function Mutation () {
    var events = $_2vfjlwnijd08mefo.create({
      'drag': Event([
        'xDelta',
        'yDelta'
      ])
    });
    var mutate = function (x, y) {
      events.trigger.drag(x, y);
    };
    return {
      mutate: mutate,
      events: events.registry
    };
  }

  function BarMutation () {
    var events = $_2vfjlwnijd08mefo.create({
      drag: Event([
        'xDelta',
        'yDelta',
        'target'
      ])
    });
    var target = $_7bux4mjhjd08mdsb.none();
    var delegate = Mutation();
    delegate.events.drag.bind(function (event) {
      target.each(function (t) {
        events.trigger.drag(event.xDelta(), event.yDelta(), t);
      });
    });
    var assign = function (t) {
      target = $_7bux4mjhjd08mdsb.some(t);
    };
    var get = function () {
      return target;
    };
    return {
      assign: assign,
      get: get,
      mutate: delegate.mutate,
      events: events.registry
    };
  }

  var any = function (selector) {
    return $_ay6dmzkljd08mdwu.first(selector).isSome();
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_ay6dmzkljd08mdwu.ancestor(scope, selector, isRoot).isSome();
  };
  var sibling$2 = function (scope, selector) {
    return $_ay6dmzkljd08mdwu.sibling(scope, selector).isSome();
  };
  var child$3 = function (scope, selector) {
    return $_ay6dmzkljd08mdwu.child(scope, selector).isSome();
  };
  var descendant$2 = function (scope, selector) {
    return $_ay6dmzkljd08mdwu.descendant(scope, selector).isSome();
  };
  var closest$2 = function (scope, selector, isRoot) {
    return $_ay6dmzkljd08mdwu.closest(scope, selector, isRoot).isSome();
  };
  var $_7xgiudnyjd08meiq = {
    any: any,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var resizeBarDragging = $_og3rumjjd08mea7.resolve('resizer-bar-dragging');
  function BarManager (wire, direction, hdirection) {
    var mutation = BarMutation();
    var resizing = $_8cgyg9nkjd08megj.transform(mutation, {});
    var hoverTable = $_7bux4mjhjd08mdsb.none();
    var getResizer = function (element, type) {
      return $_7bux4mjhjd08mdsb.from($_1vcp6tkgjd08mdwf.get(element, type));
    };
    mutation.events.drag.bind(function (event) {
      getResizer(event.target(), 'data-row').each(function (_dataRow) {
        var currentRow = $_coboqcmzjd08mecm.getInt(event.target(), 'top');
        $_ewbqy7kpjd08mdxi.set(event.target(), 'top', currentRow + event.yDelta() + 'px');
      });
      getResizer(event.target(), 'data-column').each(function (_dataCol) {
        var currentCol = $_coboqcmzjd08mecm.getInt(event.target(), 'left');
        $_ewbqy7kpjd08mdxi.set(event.target(), 'left', currentCol + event.xDelta() + 'px');
      });
    });
    var getDelta = function (target, direction) {
      var newX = $_coboqcmzjd08mecm.getInt(target, direction);
      var oldX = parseInt($_1vcp6tkgjd08mdwf.get(target, 'data-initial-' + direction), 10);
      return newX - oldX;
    };
    resizing.events.stop.bind(function () {
      mutation.get().each(function (target) {
        hoverTable.each(function (table) {
          getResizer(target, 'data-row').each(function (row) {
            var delta = getDelta(target, 'top');
            $_1vcp6tkgjd08mdwf.remove(target, 'data-initial-top');
            events.trigger.adjustHeight(table, delta, parseInt(row, 10));
          });
          getResizer(target, 'data-column').each(function (column) {
            var delta = getDelta(target, 'left');
            $_1vcp6tkgjd08mdwf.remove(target, 'data-initial-left');
            events.trigger.adjustWidth(table, delta, parseInt(column, 10));
          });
          $_1f5494mfjd08me8x.refresh(wire, table, hdirection, direction);
        });
      });
    });
    var handler = function (target, direction) {
      events.trigger.startAdjust();
      mutation.assign(target);
      $_1vcp6tkgjd08mdwf.set(target, 'data-initial-' + direction, parseInt($_ewbqy7kpjd08mdxi.get(target, direction), 10));
      $_frd0lomljd08mead.add(target, resizeBarDragging);
      $_ewbqy7kpjd08mdxi.set(target, 'opacity', '0.2');
      resizing.go(wire.parent());
    };
    var mousedown = $_c3vkagnpjd08mehg.bind(wire.parent(), 'mousedown', function (event) {
      if ($_1f5494mfjd08me8x.isRowBar(event.target()))
        handler(event.target(), 'top');
      if ($_1f5494mfjd08me8x.isColBar(event.target()))
        handler(event.target(), 'left');
    });
    var isRoot = function (e) {
      return $_2bcch9jzjd08mdv4.eq(e, wire.view());
    };
    var mouseover = $_c3vkagnpjd08mehg.bind(wire.view(), 'mouseover', function (event) {
      if ($_c0avgfkhjd08mdwm.name(event.target()) === 'table' || $_7xgiudnyjd08meiq.ancestor(event.target(), 'table', isRoot)) {
        hoverTable = $_c0avgfkhjd08mdwm.name(event.target()) === 'table' ? $_7bux4mjhjd08mdsb.some(event.target()) : $_ay6dmzkljd08mdwu.ancestor(event.target(), 'table', isRoot);
        hoverTable.each(function (ht) {
          $_1f5494mfjd08me8x.refresh(wire, ht, hdirection, direction);
        });
      } else if ($_en6z86kkjd08mdwr.inBody(event.target())) {
        $_1f5494mfjd08me8x.destroy(wire);
      }
    });
    var destroy = function () {
      mousedown.unbind();
      mouseover.unbind();
      resizing.destroy();
      $_1f5494mfjd08me8x.destroy(wire);
    };
    var refresh = function (tbl) {
      $_1f5494mfjd08me8x.refresh(wire, tbl, hdirection, direction);
    };
    var events = $_2vfjlwnijd08mefo.create({
      adjustHeight: Event([
        'table',
        'delta',
        'row'
      ]),
      adjustWidth: Event([
        'table',
        'delta',
        'column'
      ]),
      startAdjust: Event([])
    });
    return {
      destroy: destroy,
      refresh: refresh,
      on: resizing.on,
      off: resizing.off,
      hideBars: $_bypfqijijd08mdsd.curry($_1f5494mfjd08me8x.hide, wire),
      showBars: $_bypfqijijd08mdsd.curry($_1f5494mfjd08me8x.show, wire),
      events: events.registry
    };
  }

  function TableResize (wire, vdirection) {
    var hdirection = $_3aczk7lwjd08me4u.height;
    var manager = BarManager(wire, vdirection, hdirection);
    var events = $_2vfjlwnijd08mefo.create({
      beforeResize: Event(['table']),
      afterResize: Event(['table']),
      startDrag: Event([])
    });
    manager.events.adjustHeight.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = hdirection.delta(event.delta(), event.table());
      $_bis5r8mvjd08mebr.adjustHeight(event.table(), delta, event.row(), hdirection);
      events.trigger.afterResize(event.table());
    });
    manager.events.startAdjust.bind(function (event) {
      events.trigger.startDrag();
    });
    manager.events.adjustWidth.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = vdirection.delta(event.delta(), event.table());
      $_bis5r8mvjd08mebr.adjustWidth(event.table(), delta, event.column(), vdirection);
      events.trigger.afterResize(event.table());
    });
    return {
      on: manager.on,
      off: manager.off,
      hideBars: manager.hideBars,
      showBars: manager.showBars,
      destroy: manager.destroy,
      events: events.registry
    };
  }

  var createContainer = function () {
    var container = $_7kgirujvjd08mdum.fromTag('div');
    $_ewbqy7kpjd08mdxi.setAll(container, {
      position: 'static',
      height: '0',
      width: '0',
      padding: '0',
      margin: '0',
      border: '0'
    });
    $_cxkc4ckrjd08mdxu.append($_en6z86kkjd08mdwr.body(), container);
    return container;
  };
  var get$8 = function (editor, container) {
    return editor.inline ? $_9o8q9knfjd08mef5.body($_8t28ydn2jd08med6.getBody(editor), createContainer()) : $_9o8q9knfjd08mef5.only($_7kgirujvjd08mdum.fromDom(editor.getDoc()));
  };
  var remove$6 = function (editor, wire) {
    if (editor.inline) {
      $_56z3hjksjd08mdxz.remove(wire.parent());
    }
  };
  var $_bonnihnzjd08meiu = {
    get: get$8,
    remove: remove$6
  };

  function ResizeHandler (editor) {
    var selectionRng = $_7bux4mjhjd08mdsb.none();
    var resize = $_7bux4mjhjd08mdsb.none();
    var wire = $_7bux4mjhjd08mdsb.none();
    var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
    var startW, startRawW;
    var isTable = function (elm) {
      return elm.nodeName === 'TABLE';
    };
    var getRawWidth = function (elm) {
      return editor.dom.getStyle(elm, 'width') || editor.dom.getAttrib(elm, 'width');
    };
    var lazyResize = function () {
      return resize;
    };
    var lazyWire = function () {
      return wire.getOr($_9o8q9knfjd08mef5.only($_7kgirujvjd08mdum.fromDom(editor.getBody())));
    };
    var destroy = function () {
      resize.each(function (sz) {
        sz.destroy();
      });
      wire.each(function (w) {
        $_bonnihnzjd08meiu.remove(editor, w);
      });
    };
    editor.on('init', function () {
      var direction = TableDirection($_2a1j9fn3jd08med9.directionAt);
      var rawWire = $_bonnihnzjd08meiu.get(editor);
      wire = $_7bux4mjhjd08mdsb.some(rawWire);
      if (editor.settings.object_resizing && editor.settings.table_resize_bars !== false && (editor.settings.object_resizing === true || editor.settings.object_resizing === 'table')) {
        var sz = TableResize(rawWire, direction);
        sz.on();
        sz.events.startDrag.bind(function (event) {
          selectionRng = $_7bux4mjhjd08mdsb.some(editor.selection.getRng());
        });
        sz.events.afterResize.bind(function (event) {
          var table = event.table();
          var dataStyleCells = $_727gtckijd08mdwn.descendants(table, 'td[data-mce-style],th[data-mce-style]');
          $_aga3rgjgjd08mds5.each(dataStyleCells, function (cell) {
            $_1vcp6tkgjd08mdwf.remove(cell, 'data-mce-style');
          });
          selectionRng.each(function (rng) {
            editor.selection.setRng(rng);
            editor.focus();
          });
          editor.undoManager.add();
        });
        resize = $_7bux4mjhjd08mdsb.some(sz);
      }
    });
    editor.on('ObjectResizeStart', function (e) {
      if (isTable(e.target)) {
        startW = e.width;
        startRawW = getRawWidth(e.target);
      }
    });
    editor.on('ObjectResized', function (e) {
      if (isTable(e.target)) {
        var table = e.target;
        if (percentageBasedSizeRegex.test(startRawW)) {
          var percentW = parseFloat(percentageBasedSizeRegex.exec(startRawW)[1]);
          var targetPercentW = e.width * percentW / startW;
          editor.dom.setStyle(table, 'width', targetPercentW + '%');
        } else {
          var newCellSizes_1 = [];
          Tools.each(table.rows, function (row) {
            Tools.each(row.cells, function (cell) {
              var width = editor.dom.getStyle(cell, 'width', true);
              newCellSizes_1.push({
                cell: cell,
                width: width
              });
            });
          });
          Tools.each(newCellSizes_1, function (newCellSize) {
            editor.dom.setStyle(newCellSize.cell, 'width', newCellSize.width);
            editor.dom.setAttrib(newCellSize.cell, 'width', null);
          });
        }
      }
    });
    return {
      lazyResize: lazyResize,
      lazyWire: lazyWire,
      destroy: destroy
    };
  }

  var none$2 = function (current) {
    return folder$1(function (n, f, m, l) {
      return n(current);
    });
  };
  var first$5 = function (current) {
    return folder$1(function (n, f, m, l) {
      return f(current);
    });
  };
  var middle$1 = function (current, target) {
    return folder$1(function (n, f, m, l) {
      return m(current, target);
    });
  };
  var last$4 = function (current) {
    return folder$1(function (n, f, m, l) {
      return l(current);
    });
  };
  var folder$1 = function (fold) {
    return { fold: fold };
  };
  var $_7gwf66o2jd08mek3 = {
    none: none$2,
    first: first$5,
    middle: middle$1,
    last: last$4
  };

  var detect$4 = function (current, isRoot) {
    return $_915052jsjd08mdtp.table(current, isRoot).bind(function (table) {
      var all = $_915052jsjd08mdtp.cells(table);
      var index = $_aga3rgjgjd08mds5.findIndex(all, function (x) {
        return $_2bcch9jzjd08mdv4.eq(current, x);
      });
      return index.map(function (ind) {
        return {
          index: $_bypfqijijd08mdsd.constant(ind),
          all: $_bypfqijijd08mdsd.constant(all)
        };
      });
    });
  };
  var next = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_7gwf66o2jd08mek3.none(current);
    }, function (info) {
      return info.index() + 1 < info.all().length ? $_7gwf66o2jd08mek3.middle(current, info.all()[info.index() + 1]) : $_7gwf66o2jd08mek3.last(current);
    });
  };
  var prev = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_7gwf66o2jd08mek3.none();
    }, function (info) {
      return info.index() - 1 >= 0 ? $_7gwf66o2jd08mek3.middle(current, info.all()[info.index() - 1]) : $_7gwf66o2jd08mek3.first(current);
    });
  };
  var $_eqvpaso1jd08mejt = {
    next: next,
    prev: prev
  };

  var adt = $_3089nolijd08me2k.generate([
    { 'before': ['element'] },
    {
      'on': [
        'element',
        'offset'
      ]
    },
    { after: ['element'] }
  ]);
  var cata$1 = function (subject, onBefore, onOn, onAfter) {
    return subject.fold(onBefore, onOn, onAfter);
  };
  var getStart = function (situ) {
    return situ.fold($_bypfqijijd08mdsd.identity, $_bypfqijijd08mdsd.identity, $_bypfqijijd08mdsd.identity);
  };
  var $_731hqvo4jd08mek8 = {
    before: adt.before,
    on: adt.on,
    after: adt.after,
    cata: cata$1,
    getStart: getStart
  };

  var type$2 = $_3089nolijd08me2k.generate([
    { domRange: ['rng'] },
    {
      relative: [
        'startSitu',
        'finishSitu'
      ]
    },
    {
      exact: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    }
  ]);
  var range$2 = $_2806jejljd08mdt0.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$2.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart$1 = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_7kgirujvjd08mdum.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_731hqvo4jd08mek8.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart$1(selection);
    return $_3zqsofjxjd08mdus.defaultView(start);
  };
  var $_2tqwvwo3jd08mek4 = {
    domRange: type$2.domRange,
    relative: type$2.relative,
    exact: type$2.exact,
    exactFromRange: exactFromRange,
    range: range$2,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_3zqsofjxjd08mdus.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_7kgirujvjd08mdum.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_2bcch9jzjd08mdv4.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_gcwvt7o6jd08mekm = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_aga3rgjgjd08mds5.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_7kgirujvjd08mdum.fromDom(fragment);
  };
  var $_axysawo7jd08meko = { fromElements: fromElements };

  var selectNodeContents = function (win, element) {
    var rng = win.document.createRange();
    selectNodeContentsUsing(rng, element);
    return rng;
  };
  var selectNodeContentsUsing = function (rng, element) {
    rng.selectNodeContents(element.dom());
  };
  var isWithin$1 = function (outerRange, innerRange) {
    return innerRange.compareBoundaryPoints(outerRange.END_TO_START, outerRange) < 1 && innerRange.compareBoundaryPoints(outerRange.START_TO_END, outerRange) > -1;
  };
  var create$1 = function (win) {
    return win.document.createRange();
  };
  var setStart = function (rng, situ) {
    situ.fold(function (e) {
      rng.setStartBefore(e.dom());
    }, function (e, o) {
      rng.setStart(e.dom(), o);
    }, function (e) {
      rng.setStartAfter(e.dom());
    });
  };
  var setFinish = function (rng, situ) {
    situ.fold(function (e) {
      rng.setEndBefore(e.dom());
    }, function (e, o) {
      rng.setEnd(e.dom(), o);
    }, function (e) {
      rng.setEndAfter(e.dom());
    });
  };
  var replaceWith = function (rng, fragment) {
    deleteContents(rng);
    rng.insertNode(fragment.dom());
  };
  var relativeToNative = function (win, startSitu, finishSitu) {
    var range = win.document.createRange();
    setStart(range, startSitu);
    setFinish(range, finishSitu);
    return range;
  };
  var exactToNative = function (win, start, soffset, finish, foffset) {
    var rng = win.document.createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var deleteContents = function (rng) {
    rng.deleteContents();
  };
  var cloneFragment = function (rng) {
    var fragment = rng.cloneContents();
    return $_7kgirujvjd08mdum.fromDom(fragment);
  };
  var toRect = function (rect) {
    return {
      left: $_bypfqijijd08mdsd.constant(rect.left),
      top: $_bypfqijijd08mdsd.constant(rect.top),
      right: $_bypfqijijd08mdsd.constant(rect.right),
      bottom: $_bypfqijijd08mdsd.constant(rect.bottom),
      width: $_bypfqijijd08mdsd.constant(rect.width),
      height: $_bypfqijijd08mdsd.constant(rect.height)
    };
  };
  var getFirstRect = function (rng) {
    var rects = rng.getClientRects();
    var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_7bux4mjhjd08mdsb.some(rect).map(toRect) : $_7bux4mjhjd08mdsb.none();
  };
  var getBounds$1 = function (rng) {
    var rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_7bux4mjhjd08mdsb.some(rect).map(toRect) : $_7bux4mjhjd08mdsb.none();
  };
  var toString = function (rng) {
    return rng.toString();
  };
  var $_9yktt2o8jd08meku = {
    create: create$1,
    replaceWith: replaceWith,
    selectNodeContents: selectNodeContents,
    selectNodeContentsUsing: selectNodeContentsUsing,
    relativeToNative: relativeToNative,
    exactToNative: exactToNative,
    deleteContents: deleteContents,
    cloneFragment: cloneFragment,
    getFirstRect: getFirstRect,
    getBounds: getBounds$1,
    isWithin: isWithin$1,
    toString: toString
  };

  var adt$1 = $_3089nolijd08me2k.generate([
    {
      ltr: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    },
    {
      rtl: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    }
  ]);
  var fromRange = function (win, type, range) {
    return type($_7kgirujvjd08mdum.fromDom(range.startContainer), range.startOffset, $_7kgirujvjd08mdum.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_bypfqijijd08mdsd.constant(rng),
          rtl: $_7bux4mjhjd08mdsb.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_ej32htk5jd08mdvl.cached(function () {
            return $_9yktt2o8jd08meku.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_ej32htk5jd08mdvl.cached(function () {
            return $_7bux4mjhjd08mdsb.some($_9yktt2o8jd08meku.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_ej32htk5jd08mdvl.cached(function () {
            return $_9yktt2o8jd08meku.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_ej32htk5jd08mdvl.cached(function () {
            return $_7bux4mjhjd08mdsb.some($_9yktt2o8jd08meku.exactToNative(win, finish, foffset, start, soffset));
          })
        };
      }
    });
  };
  var doDiagnose = function (win, ranges) {
    var rng = ranges.ltr();
    if (rng.collapsed) {
      var reversed = ranges.rtl().filter(function (rev) {
        return rev.collapsed === false;
      });
      return reversed.map(function (rev) {
        return adt$1.rtl($_7kgirujvjd08mdum.fromDom(rev.endContainer), rev.endOffset, $_7kgirujvjd08mdum.fromDom(rev.startContainer), rev.startOffset);
      }).getOrThunk(function () {
        return fromRange(win, adt$1.ltr, rng);
      });
    } else {
      return fromRange(win, adt$1.ltr, rng);
    }
  };
  var diagnose = function (win, selection) {
    var ranges = getRanges(win, selection);
    return doDiagnose(win, ranges);
  };
  var asLtrRange = function (win, selection) {
    var diagnosis = diagnose(win, selection);
    return diagnosis.match({
      ltr: function (start, soffset, finish, foffset) {
        var rng = win.document.createRange();
        rng.setStart(start.dom(), soffset);
        rng.setEnd(finish.dom(), foffset);
        return rng;
      },
      rtl: function (start, soffset, finish, foffset) {
        var rng = win.document.createRange();
        rng.setStart(finish.dom(), foffset);
        rng.setEnd(start.dom(), soffset);
        return rng;
      }
    });
  };
  var $_5u9ku1o9jd08mel1 = {
    ltr: adt$1.ltr,
    rtl: adt$1.rtl,
    diagnose: diagnose,
    asLtrRange: asLtrRange
  };

  var searchForPoint = function (rectForOffset, x, y, maxX, length) {
    if (length === 0)
      return 0;
    else if (x === maxX)
      return length - 1;
    var xDelta = maxX;
    for (var i = 1; i < length; i++) {
      var rect = rectForOffset(i);
      var curDeltaX = Math.abs(x - rect.left);
      if (y > rect.bottom) {
      } else if (y < rect.top || curDeltaX > xDelta) {
        return i - 1;
      } else {
        xDelta = curDeltaX;
      }
    }
    return 0;
  };
  var inRect = function (rect, x, y) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };
  var $_57wfkzocjd08melj = {
    inRect: inRect,
    searchForPoint: searchForPoint
  };

  var locateOffset = function (doc, textnode, x, y, rect) {
    var rangeForOffset = function (offset) {
      var r = doc.dom().createRange();
      r.setStart(textnode.dom(), offset);
      r.collapse(true);
      return r;
    };
    var rectForOffset = function (offset) {
      var r = rangeForOffset(offset);
      return r.getBoundingClientRect();
    };
    var length = $_cls6xmkyjd08mdyv.get(textnode).length;
    var offset = $_57wfkzocjd08melj.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_boq1o3majd08me7r.findMap(rects, function (rect) {
      return $_57wfkzocjd08melj.inRect(rect, x, y) ? $_7bux4mjhjd08mdsb.some(rect) : $_7bux4mjhjd08mdsb.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_1wvzihodjd08mell = { locate: locate };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_3zqsofjxjd08mdus.children(node);
    return $_boq1o3majd08me7r.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_57wfkzocjd08melj.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : $_7bux4mjhjd08mdsb.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_c0avgfkhjd08mdwm.isText(node) ? $_1wvzihodjd08mell.locate : searchInChildren;
    return locator(doc, node, x, y);
  };
  var locate$1 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return locateNode(doc, node, boundedX, boundedY);
  };
  var $_91imhgobjd08melc = { locate: locate$1 };

  var COLLAPSE_TO_LEFT = true;
  var COLLAPSE_TO_RIGHT = false;
  var getCollapseDirection = function (rect, x) {
    return x - rect.left < rect.right - x ? COLLAPSE_TO_LEFT : COLLAPSE_TO_RIGHT;
  };
  var createCollapsedNode = function (doc, target, collapseDirection) {
    var r = doc.dom().createRange();
    r.selectNode(target.dom());
    r.collapse(collapseDirection);
    return r;
  };
  var locateInElement = function (doc, node, x) {
    var cursorRange = doc.dom().createRange();
    cursorRange.selectNode(node.dom());
    var rect = cursorRange.getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_br7rmnkwjd08mdyp.first : $_br7rmnkwjd08mdyp.last;
    return f(node).map(function (target) {
      return createCollapsedNode(doc, target, collapseDirection);
    });
  };
  var locateInEmpty = function (doc, node, x) {
    var rect = node.dom().getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    return $_7bux4mjhjd08mdsb.some(createCollapsedNode(doc, node, collapseDirection));
  };
  var search = function (doc, node, x) {
    var f = $_3zqsofjxjd08mdus.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_6ravheoejd08melp = { search: search };

  var caretPositionFromPoint = function (doc, x, y) {
    return $_7bux4mjhjd08mdsb.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
      if (pos.offsetNode === null)
        return $_7bux4mjhjd08mdsb.none();
      var r = doc.dom().createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse();
      return $_7bux4mjhjd08mdsb.some(r);
    });
  };
  var caretRangeFromPoint = function (doc, x, y) {
    return $_7bux4mjhjd08mdsb.from(doc.dom().caretRangeFromPoint(x, y));
  };
  var searchTextNodes = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return $_91imhgobjd08melc.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_7kgirujvjd08mdum.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_6ravheoejd08melp.search(doc, elem, x);
      };
      return $_3zqsofjxjd08mdus.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_7kgirujvjd08mdum.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_2tqwvwo3jd08mek4.range($_7kgirujvjd08mdum.fromDom(rng.startContainer), rng.startOffset, $_7kgirujvjd08mdum.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_9h4xrloajd08mel9 = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_9yktt2o8jd08meku.create(win);
    var self = $_2c5fpcjujd08mdug.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_727gtckijd08mdwn.descendants(ancestor, selector));
    return $_aga3rgjgjd08mds5.filter(elements, function (elem) {
      $_9yktt2o8jd08meku.selectNodeContentsUsing(innerRange, elem);
      return $_9yktt2o8jd08meku.isWithin(outerRange, innerRange);
    });
  };
  var find$3 = function (win, selection, selector) {
    var outerRange = $_5u9ku1o9jd08mel1.asLtrRange(win, selection);
    var ancestor = $_7kgirujvjd08mdum.fromDom(outerRange.commonAncestorContainer);
    return $_c0avgfkhjd08mdwm.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_7z4j9jofjd08melv = { find: find$3 };

  var beforeSpecial = function (element, offset) {
    var name = $_c0avgfkhjd08mdwm.name(element);
    if ('input' === name)
      return $_731hqvo4jd08mek8.after(element);
    else if (!$_aga3rgjgjd08mds5.contains([
        'br',
        'img'
      ], name))
      return $_731hqvo4jd08mek8.on(element, offset);
    else
      return offset === 0 ? $_731hqvo4jd08mek8.before(element) : $_731hqvo4jd08mek8.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_731hqvo4jd08mek8.before, beforeSpecial, $_731hqvo4jd08mek8.after);
    var finish = finishSitu.fold($_731hqvo4jd08mek8.before, beforeSpecial, $_731hqvo4jd08mek8.after);
    return $_2tqwvwo3jd08mek4.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_2tqwvwo3jd08mek4.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_7kgirujvjd08mdum.fromDom(rng.startContainer);
        var finish = $_7kgirujvjd08mdum.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_w07emogjd08mem0 = {
    beforeSpecial: beforeSpecial,
    preprocess: preprocess,
    preprocessRelative: preprocessRelative,
    preprocessExact: preprocessExact
  };

  var doSetNativeRange = function (win, rng) {
    $_7bux4mjhjd08mdsb.from(win.getSelection()).each(function (selection) {
      selection.removeAllRanges();
      selection.addRange(rng);
    });
  };
  var doSetRange = function (win, start, soffset, finish, foffset) {
    var rng = $_9yktt2o8jd08meku.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_7z4j9jofjd08melv.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_5u9ku1o9jd08mel1.diagnose(win, relative).match({
      ltr: function (start, soffset, finish, foffset) {
        doSetRange(win, start, soffset, finish, foffset);
      },
      rtl: function (start, soffset, finish, foffset) {
        var selection = win.getSelection();
        if (selection.extend) {
          selection.collapse(start.dom(), soffset);
          selection.extend(finish.dom(), foffset);
        } else {
          doSetRange(win, finish, foffset, start, soffset);
        }
      }
    });
  };
  var setExact = function (win, start, soffset, finish, foffset) {
    var relative = $_w07emogjd08mem0.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_w07emogjd08mem0.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_2tqwvwo3jd08mek4.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_9yktt2o8jd08meku.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_w07emogjd08mem0.preprocess(selection);
    return $_5u9ku1o9jd08mel1.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return $_7bux4mjhjd08mdsb.some($_2tqwvwo3jd08mek4.range($_7kgirujvjd08mdum.fromDom(firstRng.startContainer), firstRng.startOffset, $_7kgirujvjd08mdum.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return $_7bux4mjhjd08mdsb.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_7kgirujvjd08mdum.fromDom(selection.anchorNode);
    var focusNode = $_7kgirujvjd08mdum.fromDom(selection.focusNode);
    return $_gcwvt7o6jd08mekm.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? $_7bux4mjhjd08mdsb.some($_2tqwvwo3jd08mek4.range($_7kgirujvjd08mdum.fromDom(selection.anchorNode), selection.anchorOffset, $_7kgirujvjd08mdum.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_9yktt2o8jd08meku.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_9yktt2o8jd08meku.selectNodeContents(win, element);
    return $_2tqwvwo3jd08mek4.range($_7kgirujvjd08mdum.fromDom(rng.startContainer), rng.startOffset, $_7kgirujvjd08mdum.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : $_7bux4mjhjd08mdsb.none();
  };
  var get$9 = function (win) {
    return getExact(win).map(function (range) {
      return $_2tqwvwo3jd08mek4.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect$1 = function (win, selection) {
    var rng = $_5u9ku1o9jd08mel1.asLtrRange(win, selection);
    return $_9yktt2o8jd08meku.getFirstRect(rng);
  };
  var getBounds$2 = function (win, selection) {
    var rng = $_5u9ku1o9jd08mel1.asLtrRange(win, selection);
    return $_9yktt2o8jd08meku.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_9h4xrloajd08mel9.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_5u9ku1o9jd08mel1.asLtrRange(win, selection);
    return $_9yktt2o8jd08meku.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$2 = function (win, selection) {
    var rng = $_5u9ku1o9jd08mel1.asLtrRange(win, selection);
    return $_9yktt2o8jd08meku.cloneFragment(rng);
  };
  var replace$1 = function (win, selection, elements) {
    var rng = $_5u9ku1o9jd08mel1.asLtrRange(win, selection);
    var fragment = $_axysawo7jd08meko.fromElements(elements, win.document);
    $_9yktt2o8jd08meku.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_5u9ku1o9jd08mel1.asLtrRange(win, selection);
    $_9yktt2o8jd08meku.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_2bcch9jzjd08mdv4.eq(start, finish) && soffset === foffset;
  };
  var $_gbnuyho5jd08meke = {
    setExact: setExact,
    getExact: getExact,
    get: get$9,
    setRelative: setRelative,
    toNative: toNative,
    setToElement: setToElement,
    clear: clear$1,
    clone: clone$2,
    replace: replace$1,
    deleteAt: deleteAt,
    forElement: forElement,
    getFirstRect: getFirstRect$1,
    getBounds: getBounds$2,
    getAtPoint: getAtPoint,
    findWithin: findWithin,
    getAsString: getAsString,
    isCollapsed: isCollapsed
  };

  var VK = tinymce.util.Tools.resolve('tinymce.util.VK');

  var forward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_eqvpaso1jd08mejt.next(cell), lazyWire);
  };
  var backward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_eqvpaso1jd08mejt.prev(cell), lazyWire);
  };
  var getCellFirstCursorPosition = function (editor, cell) {
    var selection = $_2tqwvwo3jd08mek4.exact(cell, 0, cell, 0);
    return $_gbnuyho5jd08meke.toNative(selection);
  };
  var getNewRowCursorPosition = function (editor, table) {
    var rows = $_727gtckijd08mdwn.descendants(table, 'tr');
    return $_aga3rgjgjd08mds5.last(rows).bind(function (last) {
      return $_ay6dmzkljd08mdwu.descendant(last, 'td,th').map(function (first) {
        return getCellFirstCursorPosition(editor, first);
      });
    });
  };
  var go = function (editor, isRoot, cell, actions, lazyWire) {
    return cell.fold($_7bux4mjhjd08mdsb.none, $_7bux4mjhjd08mdsb.none, function (current, next) {
      return $_br7rmnkwjd08mdyp.first(next).map(function (cell) {
        return getCellFirstCursorPosition(editor, cell);
      });
    }, function (current) {
      return $_915052jsjd08mdtp.table(current, isRoot).bind(function (table) {
        var targets = $_16zmzpl1jd08mdz3.noMenu(current);
        editor.undoManager.transact(function () {
          actions.insertRowsAfter(table, targets);
        });
        return getNewRowCursorPosition(editor, table);
      });
    });
  };
  var rootElements = [
    'table',
    'li',
    'dl'
  ];
  var handle$1 = function (event, editor, actions, lazyWire) {
    if (event.keyCode === VK.TAB) {
      var body_1 = $_8t28ydn2jd08med6.getBody(editor);
      var isRoot_1 = function (element) {
        var name = $_c0avgfkhjd08mdwm.name(element);
        return $_2bcch9jzjd08mdv4.eq(element, body_1) || $_aga3rgjgjd08mds5.contains(rootElements, name);
      };
      var rng = editor.selection.getRng();
      if (rng.collapsed) {
        var start = $_7kgirujvjd08mdum.fromDom(rng.startContainer);
        $_915052jsjd08mdtp.cell(start, isRoot_1).each(function (cell) {
          event.preventDefault();
          var navigation = event.shiftKey ? backward : forward;
          var rng = navigation(editor, isRoot_1, cell, actions, lazyWire);
          rng.each(function (range) {
            editor.selection.setRng(range);
          });
        });
      }
    }
  };
  var $_9bj79qo0jd08meja = { handle: handle$1 };

  var response = $_2806jejljd08mdt0.immutable('selection', 'kill');
  var $_4i2dthokjd08men1 = { response: response };

  var isKey = function (key) {
    return function (keycode) {
      return keycode === key;
    };
  };
  var isUp = isKey(38);
  var isDown = isKey(40);
  var isNavigation = function (keycode) {
    return keycode >= 37 && keycode <= 40;
  };
  var $_32za8noljd08men4 = {
    ltr: {
      isBackward: isKey(37),
      isForward: isKey(39)
    },
    rtl: {
      isBackward: isKey(39),
      isForward: isKey(37)
    },
    isUp: isUp,
    isDown: isDown,
    isNavigation: isNavigation
  };

  var convertToRange = function (win, selection) {
    var rng = $_5u9ku1o9jd08mel1.asLtrRange(win, selection);
    return {
      start: $_bypfqijijd08mdsd.constant($_7kgirujvjd08mdum.fromDom(rng.startContainer)),
      soffset: $_bypfqijijd08mdsd.constant(rng.startOffset),
      finish: $_bypfqijijd08mdsd.constant($_7kgirujvjd08mdum.fromDom(rng.endContainer)),
      foffset: $_bypfqijijd08mdsd.constant(rng.endOffset)
    };
  };
  var makeSitus = function (start, soffset, finish, foffset) {
    return {
      start: $_bypfqijijd08mdsd.constant($_731hqvo4jd08mek8.on(start, soffset)),
      finish: $_bypfqijijd08mdsd.constant($_731hqvo4jd08mek8.on(finish, foffset))
    };
  };
  var $_26vmomonjd08menk = {
    convertToRange: convertToRange,
    makeSitus: makeSitus
  };

  var isSafari = $_3c5abbk4jd08mdvj.detect().browser.isSafari();
  var get$10 = function (_doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
    var y = doc.body.scrollTop || doc.documentElement.scrollTop;
    return r(x, y);
  };
  var to = function (x, y, _doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var win = doc.defaultView;
    win.scrollTo(x, y);
  };
  var by = function (x, y, _doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var win = doc.defaultView;
    win.scrollBy(x, y);
  };
  var setToElement$1 = function (win, element) {
    var pos = $_2vv40slxjd08me5a.absolute(element);
    var doc = $_7kgirujvjd08mdum.fromDom(win.document);
    to(pos.left(), pos.top(), doc);
  };
  var preserve$1 = function (doc, f) {
    var before = get$10(doc);
    f();
    var after = get$10(doc);
    if (before.top() !== after.top() || before.left() !== after.left()) {
      to(before.left(), before.top(), doc);
    }
  };
  var capture$2 = function (doc) {
    var previous = $_7bux4mjhjd08mdsb.none();
    var save = function () {
      previous = $_7bux4mjhjd08mdsb.some(get$10(doc));
    };
    var restore = function () {
      previous.each(function (p) {
        to(p.left(), p.top(), doc);
      });
    };
    save();
    return {
      save: save,
      restore: restore
    };
  };
  var intoView = function (element, alignToTop) {
    if (isSafari && $_aucheejpjd08mdtb.isFunction(element.dom().scrollIntoViewIfNeeded)) {
      element.dom().scrollIntoViewIfNeeded(false);
    } else {
      element.dom().scrollIntoView(alignToTop);
    }
  };
  var intoViewIfNeeded = function (element, container) {
    var containerBox = container.dom().getBoundingClientRect();
    var elementBox = element.dom().getBoundingClientRect();
    if (elementBox.top < containerBox.top) {
      intoView(element, true);
    } else if (elementBox.bottom > containerBox.bottom) {
      intoView(element, false);
    }
  };
  var scrollBarWidth = function () {
    var scrollDiv = $_7kgirujvjd08mdum.fromHtml('<div style="width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;"></div>');
    $_cxkc4ckrjd08mdxu.after($_en6z86kkjd08mdwr.body(), scrollDiv);
    var w = scrollDiv.dom().offsetWidth - scrollDiv.dom().clientWidth;
    $_56z3hjksjd08mdxz.remove(scrollDiv);
    return w;
  };
  var $_fcxkp3oojd08mens = {
    get: get$10,
    to: to,
    by: by,
    preserve: preserve$1,
    capture: capture$2,
    intoView: intoView,
    intoViewIfNeeded: intoViewIfNeeded,
    setToElement: setToElement$1,
    scrollBarWidth: scrollBarWidth
  };

  function WindowBridge (win) {
    var elementFromPoint = function (x, y) {
      return $_7bux4mjhjd08mdsb.from(win.document.elementFromPoint(x, y)).map($_7kgirujvjd08mdum.fromDom);
    };
    var getRect = function (element) {
      return element.dom().getBoundingClientRect();
    };
    var getRangedRect = function (start, soffset, finish, foffset) {
      var sel = $_2tqwvwo3jd08mek4.exact(start, soffset, finish, foffset);
      return $_gbnuyho5jd08meke.getFirstRect(win, sel).map(function (structRect) {
        return $_f3n2vcjkjd08mdsy.map(structRect, $_bypfqijijd08mdsd.apply);
      });
    };
    var getSelection = function () {
      return $_gbnuyho5jd08meke.get(win).map(function (exactAdt) {
        return $_26vmomonjd08menk.convertToRange(win, exactAdt);
      });
    };
    var fromSitus = function (situs) {
      var relative = $_2tqwvwo3jd08mek4.relative(situs.start(), situs.finish());
      return $_26vmomonjd08menk.convertToRange(win, relative);
    };
    var situsFromPoint = function (x, y) {
      return $_gbnuyho5jd08meke.getAtPoint(win, x, y).map(function (exact) {
        return {
          start: $_bypfqijijd08mdsd.constant($_731hqvo4jd08mek8.on(exact.start(), exact.soffset())),
          finish: $_bypfqijijd08mdsd.constant($_731hqvo4jd08mek8.on(exact.finish(), exact.foffset()))
        };
      });
    };
    var clearSelection = function () {
      $_gbnuyho5jd08meke.clear(win);
    };
    var selectContents = function (element) {
      $_gbnuyho5jd08meke.setToElement(win, element);
    };
    var setSelection = function (sel) {
      $_gbnuyho5jd08meke.setExact(win, sel.start(), sel.soffset(), sel.finish(), sel.foffset());
    };
    var setRelativeSelection = function (start, finish) {
      $_gbnuyho5jd08meke.setRelative(win, start, finish);
    };
    var getInnerHeight = function () {
      return win.innerHeight;
    };
    var getScrollY = function () {
      var pos = $_fcxkp3oojd08mens.get($_7kgirujvjd08mdum.fromDom(win.document));
      return pos.top();
    };
    var scrollBy = function (x, y) {
      $_fcxkp3oojd08mens.by(x, y, $_7kgirujvjd08mdum.fromDom(win.document));
    };
    return {
      elementFromPoint: elementFromPoint,
      getRect: getRect,
      getRangedRect: getRangedRect,
      getSelection: getSelection,
      fromSitus: fromSitus,
      situsFromPoint: situsFromPoint,
      clearSelection: clearSelection,
      setSelection: setSelection,
      setRelativeSelection: setRelativeSelection,
      selectContents: selectContents,
      getInnerHeight: getInnerHeight,
      getScrollY: getScrollY,
      scrollBy: scrollBy
    };
  }

  var sync = function (container, isRoot, start, soffset, finish, foffset, selectRange) {
    if (!($_2bcch9jzjd08mdv4.eq(start, finish) && soffset === foffset)) {
      return $_ay6dmzkljd08mdwu.closest(start, 'td,th', isRoot).bind(function (s) {
        return $_ay6dmzkljd08mdwu.closest(finish, 'td,th', isRoot).bind(function (f) {
          return detect$5(container, isRoot, s, f, selectRange);
        });
      });
    } else {
      return $_7bux4mjhjd08mdsb.none();
    }
  };
  var detect$5 = function (container, isRoot, start, finish, selectRange) {
    if (!$_2bcch9jzjd08mdv4.eq(start, finish)) {
      return $_ftkztil4jd08mdzq.identify(start, finish, isRoot).bind(function (cellSel) {
        var boxes = cellSel.boxes().getOr([]);
        if (boxes.length > 0) {
          selectRange(container, boxes, cellSel.start(), cellSel.finish());
          return $_7bux4mjhjd08mdsb.some($_4i2dthokjd08men1.response($_7bux4mjhjd08mdsb.some($_26vmomonjd08menk.makeSitus(start, 0, start, $_6xf70nkxjd08mdyt.getEnd(start))), true));
        } else {
          return $_7bux4mjhjd08mdsb.none();
        }
      });
    }
  };
  var update = function (rows, columns, container, selected, annotations) {
    var updateSelection = function (newSels) {
      annotations.clear(container);
      annotations.selectRange(container, newSels.boxes(), newSels.start(), newSels.finish());
      return newSels.boxes();
    };
    return $_ftkztil4jd08mdzq.shiftSelection(selected, rows, columns, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(updateSelection);
  };
  var $_8r720qopjd08menz = {
    sync: sync,
    detect: detect$5,
    update: update
  };

  var nu$3 = $_2806jejljd08mdt0.immutableBag([
    'left',
    'top',
    'right',
    'bottom'
  ], []);
  var moveDown = function (caret, amount) {
    return nu$3({
      left: caret.left(),
      top: caret.top() + amount,
      right: caret.right(),
      bottom: caret.bottom() + amount
    });
  };
  var moveUp = function (caret, amount) {
    return nu$3({
      left: caret.left(),
      top: caret.top() - amount,
      right: caret.right(),
      bottom: caret.bottom() - amount
    });
  };
  var moveBottomTo = function (caret, bottom) {
    var height = caret.bottom() - caret.top();
    return nu$3({
      left: caret.left(),
      top: bottom - height,
      right: caret.right(),
      bottom: bottom
    });
  };
  var moveTopTo = function (caret, top) {
    var height = caret.bottom() - caret.top();
    return nu$3({
      left: caret.left(),
      top: top,
      right: caret.right(),
      bottom: top + height
    });
  };
  var translate = function (caret, xDelta, yDelta) {
    return nu$3({
      left: caret.left() + xDelta,
      top: caret.top() + yDelta,
      right: caret.right() + xDelta,
      bottom: caret.bottom() + yDelta
    });
  };
  var getTop$1 = function (caret) {
    return caret.top();
  };
  var getBottom = function (caret) {
    return caret.bottom();
  };
  var toString$1 = function (caret) {
    return '(' + caret.left() + ', ' + caret.top() + ') -> (' + caret.right() + ', ' + caret.bottom() + ')';
  };
  var $_6ksmkzosjd08mep7 = {
    nu: nu$3,
    moveUp: moveUp,
    moveDown: moveDown,
    moveBottomTo: moveBottomTo,
    moveTopTo: moveTopTo,
    getTop: getTop$1,
    getBottom: getBottom,
    translate: translate,
    toString: toString$1
  };

  var getPartialBox = function (bridge, element, offset) {
    if (offset >= 0 && offset < $_6xf70nkxjd08mdyt.getEnd(element))
      return bridge.getRangedRect(element, offset, element, offset + 1);
    else if (offset > 0)
      return bridge.getRangedRect(element, offset - 1, element, offset);
    return $_7bux4mjhjd08mdsb.none();
  };
  var toCaret = function (rect) {
    return $_6ksmkzosjd08mep7.nu({
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom
    });
  };
  var getElemBox = function (bridge, element) {
    return $_7bux4mjhjd08mdsb.some(bridge.getRect(element));
  };
  var getBoxAt = function (bridge, element, offset) {
    if ($_c0avgfkhjd08mdwm.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_c0avgfkhjd08mdwm.isText(element))
      return getPartialBox(bridge, element, offset).map(toCaret);
    else
      return $_7bux4mjhjd08mdsb.none();
  };
  var getEntireBox = function (bridge, element) {
    if ($_c0avgfkhjd08mdwm.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_c0avgfkhjd08mdwm.isText(element))
      return bridge.getRangedRect(element, 0, element, $_6xf70nkxjd08mdyt.getEnd(element)).map(toCaret);
    else
      return $_7bux4mjhjd08mdsb.none();
  };
  var $_4db1jqotjd08mepa = {
    getBoxAt: getBoxAt,
    getEntireBox: getEntireBox
  };

  var traverse = $_2806jejljd08mdt0.immutable('item', 'mode');
  var backtrack = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : sidestep;
    return universe.property().parent(item).map(function (p) {
      return traverse(p, transition);
    });
  };
  var sidestep = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : advance;
    return direction.sibling(universe, item).map(function (p) {
      return traverse(p, transition);
    });
  };
  var advance = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : advance;
    var children = universe.property().children(item);
    var result = direction.first(children);
    return result.map(function (r) {
      return traverse(r, transition);
    });
  };
  var successors = [
    {
      current: backtrack,
      next: sidestep,
      fallback: $_7bux4mjhjd08mdsb.none()
    },
    {
      current: sidestep,
      next: advance,
      fallback: $_7bux4mjhjd08mdsb.some(backtrack)
    },
    {
      current: advance,
      next: advance,
      fallback: $_7bux4mjhjd08mdsb.some(sidestep)
    }
  ];
  var go$1 = function (universe, item, mode, direction, rules) {
    var rules = rules !== undefined ? rules : successors;
    var ruleOpt = $_aga3rgjgjd08mds5.find(rules, function (succ) {
      return succ.current === mode;
    });
    return ruleOpt.bind(function (rule) {
      return rule.current(universe, item, direction, rule.next).orThunk(function () {
        return rule.fallback.bind(function (fb) {
          return go$1(universe, item, fb, direction);
        });
      });
    });
  };
  var $_2fma2boyjd08meq5 = {
    backtrack: backtrack,
    sidestep: sidestep,
    advance: advance,
    go: go$1
  };

  var left$1 = function () {
    var sibling = function (universe, item) {
      return universe.query().prevSibling(item);
    };
    var first = function (children) {
      return children.length > 0 ? $_7bux4mjhjd08mdsb.some(children[children.length - 1]) : $_7bux4mjhjd08mdsb.none();
    };
    return {
      sibling: sibling,
      first: first
    };
  };
  var right$1 = function () {
    var sibling = function (universe, item) {
      return universe.query().nextSibling(item);
    };
    var first = function (children) {
      return children.length > 0 ? $_7bux4mjhjd08mdsb.some(children[0]) : $_7bux4mjhjd08mdsb.none();
    };
    return {
      sibling: sibling,
      first: first
    };
  };
  var $_81n96zozjd08meqb = {
    left: left$1,
    right: right$1
  };

  var hone = function (universe, item, predicate, mode, direction, isRoot) {
    var next = $_2fma2boyjd08meq5.go(universe, item, mode, direction);
    return next.bind(function (n) {
      if (isRoot(n.item()))
        return $_7bux4mjhjd08mdsb.none();
      else
        return predicate(n.item()) ? $_7bux4mjhjd08mdsb.some(n.item()) : hone(universe, n.item(), predicate, n.mode(), direction, isRoot);
    });
  };
  var left$2 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_2fma2boyjd08meq5.sidestep, $_81n96zozjd08meqb.left(), isRoot);
  };
  var right$2 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_2fma2boyjd08meq5.sidestep, $_81n96zozjd08meqb.right(), isRoot);
  };
  var $_g8ctzdoxjd08meq2 = {
    left: left$2,
    right: right$2
  };

  var isLeaf = function (universe, element) {
    return universe.property().children(element).length === 0;
  };
  var before$2 = function (universe, item, isRoot) {
    return seekLeft(universe, item, $_bypfqijijd08mdsd.curry(isLeaf, universe), isRoot);
  };
  var after$3 = function (universe, item, isRoot) {
    return seekRight(universe, item, $_bypfqijijd08mdsd.curry(isLeaf, universe), isRoot);
  };
  var seekLeft = function (universe, item, predicate, isRoot) {
    return $_g8ctzdoxjd08meq2.left(universe, item, predicate, isRoot);
  };
  var seekRight = function (universe, item, predicate, isRoot) {
    return $_g8ctzdoxjd08meq2.right(universe, item, predicate, isRoot);
  };
  var walkers = function () {
    return {
      left: $_81n96zozjd08meqb.left,
      right: $_81n96zozjd08meqb.right
    };
  };
  var walk = function (universe, item, mode, direction, _rules) {
    return $_2fma2boyjd08meq5.go(universe, item, mode, direction, _rules);
  };
  var $_6jzzk8owjd08mepx = {
    before: before$2,
    after: after$3,
    seekLeft: seekLeft,
    seekRight: seekRight,
    walkers: walkers,
    walk: walk,
    backtrack: $_2fma2boyjd08meq5.backtrack,
    sidestep: $_2fma2boyjd08meq5.sidestep,
    advance: $_2fma2boyjd08meq5.advance
  };

  var universe$2 = DomUniverse();
  var gather = function (element, prune, transform) {
    return $_6jzzk8owjd08mepx.gather(universe$2, element, prune, transform);
  };
  var before$3 = function (element, isRoot) {
    return $_6jzzk8owjd08mepx.before(universe$2, element, isRoot);
  };
  var after$4 = function (element, isRoot) {
    return $_6jzzk8owjd08mepx.after(universe$2, element, isRoot);
  };
  var seekLeft$1 = function (element, predicate, isRoot) {
    return $_6jzzk8owjd08mepx.seekLeft(universe$2, element, predicate, isRoot);
  };
  var seekRight$1 = function (element, predicate, isRoot) {
    return $_6jzzk8owjd08mepx.seekRight(universe$2, element, predicate, isRoot);
  };
  var walkers$1 = function () {
    return $_6jzzk8owjd08mepx.walkers();
  };
  var walk$1 = function (item, mode, direction, _rules) {
    return $_6jzzk8owjd08mepx.walk(universe$2, item, mode, direction, _rules);
  };
  var $_4xyd2oovjd08mepu = {
    gather: gather,
    before: before$3,
    after: after$4,
    seekLeft: seekLeft$1,
    seekRight: seekRight$1,
    walkers: walkers$1,
    walk: walk$1
  };

  var JUMP_SIZE = 5;
  var NUM_RETRIES = 100;
  var adt$2 = $_3089nolijd08me2k.generate([
    { 'none': [] },
    { 'retry': ['caret'] }
  ]);
  var isOutside = function (caret, box) {
    return caret.left() < box.left() || Math.abs(box.right() - caret.left()) < 1 || caret.left() > box.right();
  };
  var inOutsideBlock = function (bridge, element, caret) {
    return $_743771kmjd08mdwx.closest(element, $_akewm6jd08me6z.isBlock).fold($_bypfqijijd08mdsd.constant(false), function (cell) {
      return $_4db1jqotjd08mepa.getEntireBox(bridge, cell).exists(function (box) {
        return isOutside(caret, box);
      });
    });
  };
  var adjustDown = function (bridge, element, guessBox, original, caret) {
    var lowerCaret = $_6ksmkzosjd08mep7.moveDown(caret, JUMP_SIZE);
    if (Math.abs(guessBox.bottom() - original.bottom()) < 1)
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() > caret.bottom())
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() === caret.bottom())
      return adt$2.retry($_6ksmkzosjd08mep7.moveDown(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_6ksmkzosjd08mep7.translate(lowerCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var adjustUp = function (bridge, element, guessBox, original, caret) {
    var higherCaret = $_6ksmkzosjd08mep7.moveUp(caret, JUMP_SIZE);
    if (Math.abs(guessBox.top() - original.top()) < 1)
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() < caret.top())
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() === caret.top())
      return adt$2.retry($_6ksmkzosjd08mep7.moveUp(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_6ksmkzosjd08mep7.translate(higherCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var upMovement = {
    point: $_6ksmkzosjd08mep7.getTop,
    adjuster: adjustUp,
    move: $_6ksmkzosjd08mep7.moveUp,
    gather: $_4xyd2oovjd08mepu.before
  };
  var downMovement = {
    point: $_6ksmkzosjd08mep7.getBottom,
    adjuster: adjustDown,
    move: $_6ksmkzosjd08mep7.moveDown,
    gather: $_4xyd2oovjd08mepu.after
  };
  var isAtTable = function (bridge, x, y) {
    return bridge.elementFromPoint(x, y).filter(function (elm) {
      return $_c0avgfkhjd08mdwm.name(elm) === 'table';
    }).isSome();
  };
  var adjustForTable = function (bridge, movement, original, caret, numRetries) {
    return adjustTil(bridge, movement, original, movement.move(caret, JUMP_SIZE), numRetries);
  };
  var adjustTil = function (bridge, movement, original, caret, numRetries) {
    if (numRetries === 0)
      return $_7bux4mjhjd08mdsb.some(caret);
    if (isAtTable(bridge, caret.left(), movement.point(caret)))
      return adjustForTable(bridge, movement, original, caret, numRetries - 1);
    return bridge.situsFromPoint(caret.left(), movement.point(caret)).bind(function (guess) {
      return guess.start().fold($_7bux4mjhjd08mdsb.none, function (element, offset) {
        return $_4db1jqotjd08mepa.getEntireBox(bridge, element, offset).bind(function (guessBox) {
          return movement.adjuster(bridge, element, guessBox, original, caret).fold($_7bux4mjhjd08mdsb.none, function (newCaret) {
            return adjustTil(bridge, movement, original, newCaret, numRetries - 1);
          });
        }).orThunk(function () {
          return $_7bux4mjhjd08mdsb.some(caret);
        });
      }, $_7bux4mjhjd08mdsb.none);
    });
  };
  var ieTryDown = function (bridge, caret) {
    return bridge.situsFromPoint(caret.left(), caret.bottom() + JUMP_SIZE);
  };
  var ieTryUp = function (bridge, caret) {
    return bridge.situsFromPoint(caret.left(), caret.top() - JUMP_SIZE);
  };
  var checkScroll = function (movement, adjusted, bridge) {
    if (movement.point(adjusted) > bridge.getInnerHeight())
      return $_7bux4mjhjd08mdsb.some(movement.point(adjusted) - bridge.getInnerHeight());
    else if (movement.point(adjusted) < 0)
      return $_7bux4mjhjd08mdsb.some(-movement.point(adjusted));
    else
      return $_7bux4mjhjd08mdsb.none();
  };
  var retry = function (movement, bridge, caret) {
    var moved = movement.move(caret, JUMP_SIZE);
    var adjusted = adjustTil(bridge, movement, caret, moved, NUM_RETRIES).getOr(moved);
    return checkScroll(movement, adjusted, bridge).fold(function () {
      return bridge.situsFromPoint(adjusted.left(), movement.point(adjusted));
    }, function (delta) {
      bridge.scrollBy(0, delta);
      return bridge.situsFromPoint(adjusted.left(), movement.point(adjusted) - delta);
    });
  };
  var $_3sxnvgoujd08mepg = {
    tryUp: $_bypfqijijd08mdsd.curry(retry, upMovement),
    tryDown: $_bypfqijijd08mdsd.curry(retry, downMovement),
    ieTryUp: ieTryUp,
    ieTryDown: ieTryDown,
    getJumpSize: $_bypfqijijd08mdsd.constant(JUMP_SIZE)
  };

  var adt$3 = $_3089nolijd08me2k.generate([
    { 'none': ['message'] },
    { 'success': [] },
    { 'failedUp': ['cell'] },
    { 'failedDown': ['cell'] }
  ]);
  var isOverlapping = function (bridge, before, after) {
    var beforeBounds = bridge.getRect(before);
    var afterBounds = bridge.getRect(after);
    return afterBounds.right > beforeBounds.left && afterBounds.left < beforeBounds.right;
  };
  var verify = function (bridge, before, beforeOffset, after, afterOffset, failure, isRoot) {
    return $_ay6dmzkljd08mdwu.closest(after, 'td,th', isRoot).bind(function (afterCell) {
      return $_ay6dmzkljd08mdwu.closest(before, 'td,th', isRoot).map(function (beforeCell) {
        if (!$_2bcch9jzjd08mdv4.eq(afterCell, beforeCell)) {
          return $_4sfkvxl5jd08me0c.sharedOne(isRow, [
            afterCell,
            beforeCell
          ]).fold(function () {
            return isOverlapping(bridge, beforeCell, afterCell) ? adt$3.success() : failure(beforeCell);
          }, function (sharedRow) {
            return failure(beforeCell);
          });
        } else {
          return $_2bcch9jzjd08mdv4.eq(after, afterCell) && $_6xf70nkxjd08mdyt.getEnd(afterCell) === afterOffset ? failure(beforeCell) : adt$3.none('in same cell');
        }
      });
    }).getOr(adt$3.none('default'));
  };
  var isRow = function (elem) {
    return $_ay6dmzkljd08mdwu.closest(elem, 'tr');
  };
  var cata$2 = function (subject, onNone, onSuccess, onFailedUp, onFailedDown) {
    return subject.fold(onNone, onSuccess, onFailedUp, onFailedDown);
  };
  var $_4lacqpp0jd08meqe = {
    verify: verify,
    cata: cata$2,
    adt: adt$3
  };

  var point = $_2806jejljd08mdt0.immutable('element', 'offset');
  var delta = $_2806jejljd08mdt0.immutable('element', 'deltaOffset');
  var range$3 = $_2806jejljd08mdt0.immutable('element', 'start', 'finish');
  var points = $_2806jejljd08mdt0.immutable('begin', 'end');
  var text = $_2806jejljd08mdt0.immutable('element', 'text');
  var $_axurcrp2jd08mer6 = {
    point: point,
    delta: delta,
    range: range$3,
    points: points,
    text: text
  };

  var inAncestor = $_2806jejljd08mdt0.immutable('ancestor', 'descendants', 'element', 'index');
  var inParent = $_2806jejljd08mdt0.immutable('parent', 'children', 'element', 'index');
  var childOf = function (element, ancestor) {
    return $_743771kmjd08mdwx.closest(element, function (elem) {
      return $_3zqsofjxjd08mdus.parent(elem).exists(function (parent) {
        return $_2bcch9jzjd08mdv4.eq(parent, ancestor);
      });
    });
  };
  var indexInParent = function (element) {
    return $_3zqsofjxjd08mdus.parent(element).bind(function (parent) {
      var children = $_3zqsofjxjd08mdus.children(parent);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var indexOf$1 = function (elements, element) {
    return $_aga3rgjgjd08mds5.findIndex(elements, $_bypfqijijd08mdsd.curry($_2bcch9jzjd08mdv4.eq, element));
  };
  var selectorsInParent = function (element, selector) {
    return $_3zqsofjxjd08mdus.parent(element).bind(function (parent) {
      var children = $_727gtckijd08mdwn.children(parent, selector);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var descendantsInAncestor = function (element, ancestorSelector, descendantSelector) {
    return $_ay6dmzkljd08mdwu.closest(element, ancestorSelector).bind(function (ancestor) {
      var descendants = $_727gtckijd08mdwn.descendants(ancestor, descendantSelector);
      return indexOf$1(descendants, element).map(function (index) {
        return inAncestor(ancestor, descendants, element, index);
      });
    });
  };
  var $_8rx4wvp3jd08mer9 = {
    childOf: childOf,
    indexOf: indexOf$1,
    indexInParent: indexInParent,
    selectorsInParent: selectorsInParent,
    descendantsInAncestor: descendantsInAncestor
  };

  var isBr = function (elem) {
    return $_c0avgfkhjd08mdwm.name(elem) === 'br';
  };
  var gatherer = function (cand, gather, isRoot) {
    return gather(cand, isRoot).bind(function (target) {
      return $_c0avgfkhjd08mdwm.isText(target) && $_cls6xmkyjd08mdyv.get(target).trim().length === 0 ? gatherer(target, gather, isRoot) : $_7bux4mjhjd08mdsb.some(target);
    });
  };
  var handleBr = function (isRoot, element, direction) {
    return direction.traverse(element).orThunk(function () {
      return gatherer(element, direction.gather, isRoot);
    }).map(direction.relative);
  };
  var findBr = function (element, offset) {
    return $_3zqsofjxjd08mdus.child(element, offset).filter(isBr).orThunk(function () {
      return $_3zqsofjxjd08mdus.child(element, offset - 1).filter(isBr);
    });
  };
  var handleParent = function (isRoot, element, offset, direction) {
    return findBr(element, offset).bind(function (br) {
      return direction.traverse(br).fold(function () {
        return gatherer(br, direction.gather, isRoot).map(direction.relative);
      }, function (adjacent) {
        return $_8rx4wvp3jd08mer9.indexInParent(adjacent).map(function (info) {
          return $_731hqvo4jd08mek8.on(info.parent(), info.index());
        });
      });
    });
  };
  var tryBr = function (isRoot, element, offset, direction) {
    var target = isBr(element) ? handleBr(isRoot, element, direction) : handleParent(isRoot, element, offset, direction);
    return target.map(function (tgt) {
      return {
        start: $_bypfqijijd08mdsd.constant(tgt),
        finish: $_bypfqijijd08mdsd.constant(tgt)
      };
    });
  };
  var process = function (analysis) {
    return $_4lacqpp0jd08meqe.cata(analysis, function (message) {
      return $_7bux4mjhjd08mdsb.none('BR ADT: none');
    }, function () {
      return $_7bux4mjhjd08mdsb.none();
    }, function (cell) {
      return $_7bux4mjhjd08mdsb.some($_axurcrp2jd08mer6.point(cell, 0));
    }, function (cell) {
      return $_7bux4mjhjd08mdsb.some($_axurcrp2jd08mer6.point(cell, $_6xf70nkxjd08mdyt.getEnd(cell)));
    });
  };
  var $_9k6xf0p1jd08meqp = {
    tryBr: tryBr,
    process: process
  };

  var MAX_RETRIES = 20;
  var platform$1 = $_3c5abbk4jd08mdvj.detect();
  var findSpot = function (bridge, isRoot, direction) {
    return bridge.getSelection().bind(function (sel) {
      return $_9k6xf0p1jd08meqp.tryBr(isRoot, sel.finish(), sel.foffset(), direction).fold(function () {
        return $_7bux4mjhjd08mdsb.some($_axurcrp2jd08mer6.point(sel.finish(), sel.foffset()));
      }, function (brNeighbour) {
        var range = bridge.fromSitus(brNeighbour);
        var analysis = $_4lacqpp0jd08meqe.verify(bridge, sel.finish(), sel.foffset(), range.finish(), range.foffset(), direction.failure, isRoot);
        return $_9k6xf0p1jd08meqp.process(analysis);
      });
    });
  };
  var scan = function (bridge, isRoot, element, offset, direction, numRetries) {
    if (numRetries === 0)
      return $_7bux4mjhjd08mdsb.none();
    return tryCursor(bridge, isRoot, element, offset, direction).bind(function (situs) {
      var range = bridge.fromSitus(situs);
      var analysis = $_4lacqpp0jd08meqe.verify(bridge, element, offset, range.finish(), range.foffset(), direction.failure, isRoot);
      return $_4lacqpp0jd08meqe.cata(analysis, function () {
        return $_7bux4mjhjd08mdsb.none();
      }, function () {
        return $_7bux4mjhjd08mdsb.some(situs);
      }, function (cell) {
        if ($_2bcch9jzjd08mdv4.eq(element, cell) && offset === 0)
          return tryAgain(bridge, element, offset, $_6ksmkzosjd08mep7.moveUp, direction);
        else
          return scan(bridge, isRoot, cell, 0, direction, numRetries - 1);
      }, function (cell) {
        if ($_2bcch9jzjd08mdv4.eq(element, cell) && offset === $_6xf70nkxjd08mdyt.getEnd(cell))
          return tryAgain(bridge, element, offset, $_6ksmkzosjd08mep7.moveDown, direction);
        else
          return scan(bridge, isRoot, cell, $_6xf70nkxjd08mdyt.getEnd(cell), direction, numRetries - 1);
      });
    });
  };
  var tryAgain = function (bridge, element, offset, move, direction) {
    return $_4db1jqotjd08mepa.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, move(box, $_3sxnvgoujd08mepg.getJumpSize()));
    });
  };
  var tryAt = function (bridge, direction, box) {
    if (platform$1.browser.isChrome() || platform$1.browser.isSafari() || platform$1.browser.isFirefox() || platform$1.browser.isEdge())
      return direction.otherRetry(bridge, box);
    else if (platform$1.browser.isIE())
      return direction.ieRetry(bridge, box);
    else
      return $_7bux4mjhjd08mdsb.none();
  };
  var tryCursor = function (bridge, isRoot, element, offset, direction) {
    return $_4db1jqotjd08mepa.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, box);
    });
  };
  var handle$2 = function (bridge, isRoot, direction) {
    return findSpot(bridge, isRoot, direction).bind(function (spot) {
      return scan(bridge, isRoot, spot.element(), spot.offset(), direction, MAX_RETRIES).map(bridge.fromSitus);
    });
  };
  var $_ant0gnorjd08meow = { handle: handle$2 };

  var any$1 = function (predicate) {
    return $_743771kmjd08mdwx.first(predicate).isSome();
  };
  var ancestor$3 = function (scope, predicate, isRoot) {
    return $_743771kmjd08mdwx.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest$3 = function (scope, predicate, isRoot) {
    return $_743771kmjd08mdwx.closest(scope, predicate, isRoot).isSome();
  };
  var sibling$3 = function (scope, predicate) {
    return $_743771kmjd08mdwx.sibling(scope, predicate).isSome();
  };
  var child$4 = function (scope, predicate) {
    return $_743771kmjd08mdwx.child(scope, predicate).isSome();
  };
  var descendant$3 = function (scope, predicate) {
    return $_743771kmjd08mdwx.descendant(scope, predicate).isSome();
  };
  var $_6vy1yyp4jd08merj = {
    any: any$1,
    ancestor: ancestor$3,
    closest: closest$3,
    sibling: sibling$3,
    child: child$4,
    descendant: descendant$3
  };

  var detection = $_3c5abbk4jd08mdvj.detect();
  var inSameTable = function (elem, table) {
    return $_6vy1yyp4jd08merj.ancestor(elem, function (e) {
      return $_3zqsofjxjd08mdus.parent(e).exists(function (p) {
        return $_2bcch9jzjd08mdv4.eq(p, table);
      });
    });
  };
  var simulate = function (bridge, isRoot, direction, initial, anchor) {
    return $_ay6dmzkljd08mdwu.closest(initial, 'td,th', isRoot).bind(function (start) {
      return $_ay6dmzkljd08mdwu.closest(start, 'table', isRoot).bind(function (table) {
        if (!inSameTable(anchor, table))
          return $_7bux4mjhjd08mdsb.none();
        return $_ant0gnorjd08meow.handle(bridge, isRoot, direction).bind(function (range) {
          return $_ay6dmzkljd08mdwu.closest(range.finish(), 'td,th', isRoot).map(function (finish) {
            return {
              start: $_bypfqijijd08mdsd.constant(start),
              finish: $_bypfqijijd08mdsd.constant(finish),
              range: $_bypfqijijd08mdsd.constant(range)
            };
          });
        });
      });
    });
  };
  var navigate = function (bridge, isRoot, direction, initial, anchor, precheck) {
    if (detection.browser.isIE()) {
      return $_7bux4mjhjd08mdsb.none();
    } else {
      return precheck(initial, isRoot).orThunk(function () {
        return simulate(bridge, isRoot, direction, initial, anchor).map(function (info) {
          var range = info.range();
          return $_4i2dthokjd08men1.response($_7bux4mjhjd08mdsb.some($_26vmomonjd08menk.makeSitus(range.start(), range.soffset(), range.finish(), range.foffset())), true);
        });
      });
    }
  };
  var firstUpCheck = function (initial, isRoot) {
    return $_ay6dmzkljd08mdwu.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_ay6dmzkljd08mdwu.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_727gtckijd08mdwn.descendants(table, 'tr');
        if ($_2bcch9jzjd08mdv4.eq(startRow, rows[0])) {
          return $_4xyd2oovjd08mepu.seekLeft(table, function (element) {
            return $_br7rmnkwjd08mdyp.last(element).isSome();
          }, isRoot).map(function (last) {
            var lastOffset = $_6xf70nkxjd08mdyt.getEnd(last);
            return $_4i2dthokjd08men1.response($_7bux4mjhjd08mdsb.some($_26vmomonjd08menk.makeSitus(last, lastOffset, last, lastOffset)), true);
          });
        } else {
          return $_7bux4mjhjd08mdsb.none();
        }
      });
    });
  };
  var lastDownCheck = function (initial, isRoot) {
    return $_ay6dmzkljd08mdwu.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_ay6dmzkljd08mdwu.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_727gtckijd08mdwn.descendants(table, 'tr');
        if ($_2bcch9jzjd08mdv4.eq(startRow, rows[rows.length - 1])) {
          return $_4xyd2oovjd08mepu.seekRight(table, function (element) {
            return $_br7rmnkwjd08mdyp.first(element).isSome();
          }, isRoot).map(function (first) {
            return $_4i2dthokjd08men1.response($_7bux4mjhjd08mdsb.some($_26vmomonjd08menk.makeSitus(first, 0, first, 0)), true);
          });
        } else {
          return $_7bux4mjhjd08mdsb.none();
        }
      });
    });
  };
  var select = function (bridge, container, isRoot, direction, initial, anchor, selectRange) {
    return simulate(bridge, isRoot, direction, initial, anchor).bind(function (info) {
      return $_8r720qopjd08menz.detect(container, isRoot, info.start(), info.finish(), selectRange);
    });
  };
  var $_7w1g9voqjd08meo8 = {
    navigate: navigate,
    select: select,
    firstUpCheck: firstUpCheck,
    lastDownCheck: lastDownCheck
  };

  var findCell = function (target, isRoot) {
    return $_ay6dmzkljd08mdwu.closest(target, 'td,th', isRoot);
  };
  function MouseSelection (bridge, container, isRoot, annotations) {
    var cursor = $_7bux4mjhjd08mdsb.none();
    var clearState = function () {
      cursor = $_7bux4mjhjd08mdsb.none();
    };
    var mousedown = function (event) {
      annotations.clear(container);
      cursor = findCell(event.target(), isRoot);
    };
    var mouseover = function (event) {
      cursor.each(function (start) {
        annotations.clear(container);
        findCell(event.target(), isRoot).each(function (finish) {
          $_ftkztil4jd08mdzq.identify(start, finish, isRoot).each(function (cellSel) {
            var boxes = cellSel.boxes().getOr([]);
            if (boxes.length > 1 || boxes.length === 1 && !$_2bcch9jzjd08mdv4.eq(start, finish)) {
              annotations.selectRange(container, boxes, cellSel.start(), cellSel.finish());
              bridge.selectContents(finish);
            }
          });
        });
      });
    };
    var mouseup = function () {
      cursor.each(clearState);
    };
    return {
      mousedown: mousedown,
      mouseover: mouseover,
      mouseup: mouseup
    };
  }

  var $_795d4jp6jd08merq = {
    down: {
      traverse: $_3zqsofjxjd08mdus.nextSibling,
      gather: $_4xyd2oovjd08mepu.after,
      relative: $_731hqvo4jd08mek8.before,
      otherRetry: $_3sxnvgoujd08mepg.tryDown,
      ieRetry: $_3sxnvgoujd08mepg.ieTryDown,
      failure: $_4lacqpp0jd08meqe.adt.failedDown
    },
    up: {
      traverse: $_3zqsofjxjd08mdus.prevSibling,
      gather: $_4xyd2oovjd08mepu.before,
      relative: $_731hqvo4jd08mek8.before,
      otherRetry: $_3sxnvgoujd08mepg.tryUp,
      ieRetry: $_3sxnvgoujd08mepg.ieTryUp,
      failure: $_4lacqpp0jd08meqe.adt.failedUp
    }
  };

  var rc = $_2806jejljd08mdt0.immutable('rows', 'cols');
  var mouse = function (win, container, isRoot, annotations) {
    var bridge = WindowBridge(win);
    var handlers = MouseSelection(bridge, container, isRoot, annotations);
    return {
      mousedown: handlers.mousedown,
      mouseover: handlers.mouseover,
      mouseup: handlers.mouseup
    };
  };
  var keyboard = function (win, container, isRoot, annotations) {
    var bridge = WindowBridge(win);
    var clearToNavigate = function () {
      annotations.clear(container);
      return $_7bux4mjhjd08mdsb.none();
    };
    var keydown = function (event, start, soffset, finish, foffset, direction) {
      var keycode = event.raw().which;
      var shiftKey = event.raw().shiftKey === true;
      var handler = $_ftkztil4jd08mdzq.retrieve(container, annotations.selectedSelector()).fold(function () {
        if ($_32za8noljd08men4.isDown(keycode) && shiftKey) {
          return $_bypfqijijd08mdsd.curry($_7w1g9voqjd08meo8.select, bridge, container, isRoot, $_795d4jp6jd08merq.down, finish, start, annotations.selectRange);
        } else if ($_32za8noljd08men4.isUp(keycode) && shiftKey) {
          return $_bypfqijijd08mdsd.curry($_7w1g9voqjd08meo8.select, bridge, container, isRoot, $_795d4jp6jd08merq.up, finish, start, annotations.selectRange);
        } else if ($_32za8noljd08men4.isDown(keycode)) {
          return $_bypfqijijd08mdsd.curry($_7w1g9voqjd08meo8.navigate, bridge, isRoot, $_795d4jp6jd08merq.down, finish, start, $_7w1g9voqjd08meo8.lastDownCheck);
        } else if ($_32za8noljd08men4.isUp(keycode)) {
          return $_bypfqijijd08mdsd.curry($_7w1g9voqjd08meo8.navigate, bridge, isRoot, $_795d4jp6jd08merq.up, finish, start, $_7w1g9voqjd08meo8.firstUpCheck);
        } else {
          return $_7bux4mjhjd08mdsb.none;
        }
      }, function (selected) {
        var update = function (attempts) {
          return function () {
            var navigation = $_boq1o3majd08me7r.findMap(attempts, function (delta) {
              return $_8r720qopjd08menz.update(delta.rows(), delta.cols(), container, selected, annotations);
            });
            return navigation.fold(function () {
              return $_ftkztil4jd08mdzq.getEdges(container, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(function (edges) {
                var relative = $_32za8noljd08men4.isDown(keycode) || direction.isForward(keycode) ? $_731hqvo4jd08mek8.after : $_731hqvo4jd08mek8.before;
                bridge.setRelativeSelection($_731hqvo4jd08mek8.on(edges.first(), 0), relative(edges.table()));
                annotations.clear(container);
                return $_4i2dthokjd08men1.response($_7bux4mjhjd08mdsb.none(), true);
              });
            }, function (_) {
              return $_7bux4mjhjd08mdsb.some($_4i2dthokjd08men1.response($_7bux4mjhjd08mdsb.none(), true));
            });
          };
        };
        if ($_32za8noljd08men4.isDown(keycode) && shiftKey)
          return update([rc(+1, 0)]);
        else if ($_32za8noljd08men4.isUp(keycode) && shiftKey)
          return update([rc(-1, 0)]);
        else if (direction.isBackward(keycode) && shiftKey)
          return update([
            rc(0, -1),
            rc(-1, 0)
          ]);
        else if (direction.isForward(keycode) && shiftKey)
          return update([
            rc(0, +1),
            rc(+1, 0)
          ]);
        else if ($_32za8noljd08men4.isNavigation(keycode) && shiftKey === false)
          return clearToNavigate;
        else
          return $_7bux4mjhjd08mdsb.none;
      });
      return handler();
    };
    var keyup = function (event, start, soffset, finish, foffset) {
      return $_ftkztil4jd08mdzq.retrieve(container, annotations.selectedSelector()).fold(function () {
        var keycode = event.raw().which;
        var shiftKey = event.raw().shiftKey === true;
        if (shiftKey === false)
          return $_7bux4mjhjd08mdsb.none();
        if ($_32za8noljd08men4.isNavigation(keycode))
          return $_8r720qopjd08menz.sync(container, isRoot, start, soffset, finish, foffset, annotations.selectRange);
        else
          return $_7bux4mjhjd08mdsb.none();
      }, $_7bux4mjhjd08mdsb.none);
    };
    return {
      keydown: keydown,
      keyup: keyup
    };
  };
  var $_839hsojjd08mems = {
    mouse: mouse,
    keyboard: keyboard
  };

  var add$3 = function (element, classes) {
    $_aga3rgjgjd08mds5.each(classes, function (x) {
      $_frd0lomljd08mead.add(element, x);
    });
  };
  var remove$7 = function (element, classes) {
    $_aga3rgjgjd08mds5.each(classes, function (x) {
      $_frd0lomljd08mead.remove(element, x);
    });
  };
  var toggle$2 = function (element, classes) {
    $_aga3rgjgjd08mds5.each(classes, function (x) {
      $_frd0lomljd08mead.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_aga3rgjgjd08mds5.forall(classes, function (clazz) {
      return $_frd0lomljd08mead.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_aga3rgjgjd08mds5.exists(classes, function (clazz) {
      return $_frd0lomljd08mead.has(element, clazz);
    });
  };
  var getNative = function (element) {
    var classList = element.dom().classList;
    var r = new Array(classList.length);
    for (var i = 0; i < classList.length; i++) {
      r[i] = classList.item(i);
    }
    return r;
  };
  var get$11 = function (element) {
    return $_1ylekbmnjd08meah.supports(element) ? getNative(element) : $_1ylekbmnjd08meah.get(element);
  };
  var $_9ix1qpp9jd08mes9 = {
    add: add$3,
    remove: remove$7,
    toggle: toggle$2,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$11
  };

  var addClass = function (clazz) {
    return function (element) {
      $_frd0lomljd08mead.add(element, clazz);
    };
  };
  var removeClass = function (clazz) {
    return function (element) {
      $_frd0lomljd08mead.remove(element, clazz);
    };
  };
  var removeClasses = function (classes) {
    return function (element) {
      $_9ix1qpp9jd08mes9.remove(element, classes);
    };
  };
  var hasClass = function (clazz) {
    return function (element) {
      return $_frd0lomljd08mead.has(element, clazz);
    };
  };
  var $_5li0nzp8jd08mes8 = {
    addClass: addClass,
    removeClass: removeClass,
    removeClasses: removeClasses,
    hasClass: hasClass
  };

  var byClass = function (ephemera) {
    var addSelectionClass = $_5li0nzp8jd08mes8.addClass(ephemera.selected());
    var removeSelectionClasses = $_5li0nzp8jd08mes8.removeClasses([
      ephemera.selected(),
      ephemera.lastSelected(),
      ephemera.firstSelected()
    ]);
    var clear = function (container) {
      var sels = $_727gtckijd08mdwn.descendants(container, ephemera.selectedSelector());
      $_aga3rgjgjd08mds5.each(sels, removeSelectionClasses);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      $_aga3rgjgjd08mds5.each(cells, addSelectionClass);
      $_frd0lomljd08mead.add(start, ephemera.firstSelected());
      $_frd0lomljd08mead.add(finish, ephemera.lastSelected());
    };
    return {
      clear: clear,
      selectRange: selectRange,
      selectedSelector: ephemera.selectedSelector,
      firstSelectedSelector: ephemera.firstSelectedSelector,
      lastSelectedSelector: ephemera.lastSelectedSelector
    };
  };
  var byAttr = function (ephemera) {
    var removeSelectionAttributes = function (element) {
      $_1vcp6tkgjd08mdwf.remove(element, ephemera.selected());
      $_1vcp6tkgjd08mdwf.remove(element, ephemera.firstSelected());
      $_1vcp6tkgjd08mdwf.remove(element, ephemera.lastSelected());
    };
    var addSelectionAttribute = function (element) {
      $_1vcp6tkgjd08mdwf.set(element, ephemera.selected(), '1');
    };
    var clear = function (container) {
      var sels = $_727gtckijd08mdwn.descendants(container, ephemera.selectedSelector());
      $_aga3rgjgjd08mds5.each(sels, removeSelectionAttributes);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      $_aga3rgjgjd08mds5.each(cells, addSelectionAttribute);
      $_1vcp6tkgjd08mdwf.set(start, ephemera.firstSelected(), '1');
      $_1vcp6tkgjd08mdwf.set(finish, ephemera.lastSelected(), '1');
    };
    return {
      clear: clear,
      selectRange: selectRange,
      selectedSelector: ephemera.selectedSelector,
      firstSelectedSelector: ephemera.firstSelectedSelector,
      lastSelectedSelector: ephemera.lastSelectedSelector
    };
  };
  var $_dg8svp7jd08mery = {
    byClass: byClass,
    byAttr: byAttr
  };

  function CellSelection$1 (editor, lazyResize) {
    var handlerStruct = $_2806jejljd08mdt0.immutableBag([
      'mousedown',
      'mouseover',
      'mouseup',
      'keyup',
      'keydown'
    ], []);
    var handlers = $_7bux4mjhjd08mdsb.none();
    var annotations = $_dg8svp7jd08mery.byAttr($_1hcpf9lgjd08me2b);
    editor.on('init', function (e) {
      var win = editor.getWin();
      var body = $_8t28ydn2jd08med6.getBody(editor);
      var isRoot = $_8t28ydn2jd08med6.getIsRoot(editor);
      var syncSelection = function () {
        var sel = editor.selection;
        var start = $_7kgirujvjd08mdum.fromDom(sel.getStart());
        var end = $_7kgirujvjd08mdum.fromDom(sel.getEnd());
        var startTable = $_915052jsjd08mdtp.table(start);
        var endTable = $_915052jsjd08mdtp.table(end);
        var sameTable = startTable.bind(function (tableStart) {
          return endTable.bind(function (tableEnd) {
            return $_2bcch9jzjd08mdv4.eq(tableStart, tableEnd) ? $_7bux4mjhjd08mdsb.some(true) : $_7bux4mjhjd08mdsb.none();
          });
        });
        sameTable.fold(function () {
          annotations.clear(body);
        }, $_bypfqijijd08mdsd.noop);
      };
      var mouseHandlers = $_839hsojjd08mems.mouse(win, body, isRoot, annotations);
      var keyHandlers = $_839hsojjd08mems.keyboard(win, body, isRoot, annotations);
      var handleResponse = function (event, response) {
        if (response.kill()) {
          event.kill();
        }
        response.selection().each(function (ns) {
          var relative = $_2tqwvwo3jd08mek4.relative(ns.start(), ns.finish());
          var rng = $_5u9ku1o9jd08mel1.asLtrRange(win, relative);
          editor.selection.setRng(rng);
        });
      };
      var keyup = function (event) {
        var wrappedEvent = wrapEvent(event);
        if (wrappedEvent.raw().shiftKey && $_32za8noljd08men4.isNavigation(wrappedEvent.raw().which)) {
          var rng = editor.selection.getRng();
          var start = $_7kgirujvjd08mdum.fromDom(rng.startContainer);
          var end = $_7kgirujvjd08mdum.fromDom(rng.endContainer);
          keyHandlers.keyup(wrappedEvent, start, rng.startOffset, end, rng.endOffset).each(function (response) {
            handleResponse(wrappedEvent, response);
          });
        }
      };
      var checkLast = function (last) {
        return !$_1vcp6tkgjd08mdwf.has(last, 'data-mce-bogus') && $_c0avgfkhjd08mdwm.name(last) !== 'br' && !($_c0avgfkhjd08mdwm.isText(last) && $_cls6xmkyjd08mdyv.get(last).length === 0);
      };
      var getLast = function () {
        var body = $_7kgirujvjd08mdum.fromDom(editor.getBody());
        var lastChild = $_3zqsofjxjd08mdus.lastChild(body);
        var getPrevLast = function (last) {
          return $_3zqsofjxjd08mdus.prevSibling(last).bind(function (prevLast) {
            return checkLast(prevLast) ? $_7bux4mjhjd08mdsb.some(prevLast) : getPrevLast(prevLast);
          });
        };
        return lastChild.bind(function (last) {
          return checkLast(last) ? $_7bux4mjhjd08mdsb.some(last) : getPrevLast(last);
        });
      };
      var keydown = function (event) {
        var wrappedEvent = wrapEvent(event);
        lazyResize().each(function (resize) {
          resize.hideBars();
        });
        if (event.which === 40) {
          getLast().each(function (last) {
            if ($_c0avgfkhjd08mdwm.name(last) === 'table') {
              if (editor.settings.forced_root_block) {
                editor.dom.add(editor.getBody(), editor.settings.forced_root_block, editor.settings.forced_root_block_attrs, '<br/>');
              } else {
                editor.dom.add(editor.getBody(), 'br');
              }
            }
          });
        }
        var rng = editor.selection.getRng();
        var startContainer = $_7kgirujvjd08mdum.fromDom(editor.selection.getStart());
        var start = $_7kgirujvjd08mdum.fromDom(rng.startContainer);
        var end = $_7kgirujvjd08mdum.fromDom(rng.endContainer);
        var direction = $_2a1j9fn3jd08med9.directionAt(startContainer).isRtl() ? $_32za8noljd08men4.rtl : $_32za8noljd08men4.ltr;
        keyHandlers.keydown(wrappedEvent, start, rng.startOffset, end, rng.endOffset, direction).each(function (response) {
          handleResponse(wrappedEvent, response);
        });
        lazyResize().each(function (resize) {
          resize.showBars();
        });
      };
      var wrapEvent = function (event) {
        var target = $_7kgirujvjd08mdum.fromDom(event.target);
        var stop = function () {
          event.stopPropagation();
        };
        var prevent = function () {
          event.preventDefault();
        };
        var kill = $_bypfqijijd08mdsd.compose(prevent, stop);
        return {
          target: $_bypfqijijd08mdsd.constant(target),
          x: $_bypfqijijd08mdsd.constant(event.x),
          y: $_bypfqijijd08mdsd.constant(event.y),
          stop: stop,
          prevent: prevent,
          kill: kill,
          raw: $_bypfqijijd08mdsd.constant(event)
        };
      };
      var isLeftMouse = function (raw) {
        return raw.button === 0;
      };
      var isLeftButtonPressed = function (raw) {
        if (raw.buttons === undefined) {
          return true;
        }
        return (raw.buttons & 1) !== 0;
      };
      var mouseDown = function (e) {
        if (isLeftMouse(e)) {
          mouseHandlers.mousedown(wrapEvent(e));
        }
      };
      var mouseOver = function (e) {
        if (isLeftButtonPressed(e)) {
          mouseHandlers.mouseover(wrapEvent(e));
        }
      };
      var mouseUp = function (e) {
        if (isLeftMouse) {
          mouseHandlers.mouseup(wrapEvent(e));
        }
      };
      editor.on('mousedown', mouseDown);
      editor.on('mouseover', mouseOver);
      editor.on('mouseup', mouseUp);
      editor.on('keyup', keyup);
      editor.on('keydown', keydown);
      editor.on('nodechange', syncSelection);
      handlers = $_7bux4mjhjd08mdsb.some(handlerStruct({
        mousedown: mouseDown,
        mouseover: mouseOver,
        mouseup: mouseUp,
        keyup: keyup,
        keydown: keydown
      }));
    });
    var destroy = function () {
      handlers.each(function (handlers) {
      });
    };
    return {
      clear: annotations.clear,
      destroy: destroy
    };
  }

  function Selections (editor) {
    var get = function () {
      var body = $_8t28ydn2jd08med6.getBody(editor);
      return $_93z7lgl3jd08mdzh.retrieve(body, $_1hcpf9lgjd08me2b.selectedSelector()).fold(function () {
        if (editor.selection.getStart() === undefined) {
          return $_a1cx8clhjd08me2i.none();
        } else {
          return $_a1cx8clhjd08me2i.single(editor.selection);
        }
      }, function (cells) {
        return $_a1cx8clhjd08me2i.multiple(cells);
      });
    };
    return { get: get };
  }

  var each$4 = Tools.each;
  var addButtons = function (editor) {
    var menuItems = [];
    each$4('inserttable tableprops deletetable | cell row column'.split(' '), function (name) {
      if (name === '|') {
        menuItems.push({ text: '-' });
      } else {
        menuItems.push(editor.menuItems[name]);
      }
    });
    editor.addButton('table', {
      type: 'menubutton',
      title: 'Table',
      menu: menuItems
    });
    function cmd(command) {
      return function () {
        editor.execCommand(command);
      };
    }
    editor.addButton('tableprops', {
      title: 'Table properties',
      onclick: $_bypfqijijd08mdsd.curry($_djpbofn8jd08medz.open, editor, true),
      icon: 'table'
    });
    editor.addButton('tabledelete', {
      title: 'Delete table',
      onclick: cmd('mceTableDelete')
    });
    editor.addButton('tablecellprops', {
      title: 'Cell properties',
      onclick: cmd('mceTableCellProps')
    });
    editor.addButton('tablemergecells', {
      title: 'Merge cells',
      onclick: cmd('mceTableMergeCells')
    });
    editor.addButton('tablesplitcells', {
      title: 'Split cell',
      onclick: cmd('mceTableSplitCells')
    });
    editor.addButton('tableinsertrowbefore', {
      title: 'Insert row before',
      onclick: cmd('mceTableInsertRowBefore')
    });
    editor.addButton('tableinsertrowafter', {
      title: 'Insert row after',
      onclick: cmd('mceTableInsertRowAfter')
    });
    editor.addButton('tabledeleterow', {
      title: 'Delete row',
      onclick: cmd('mceTableDeleteRow')
    });
    editor.addButton('tablerowprops', {
      title: 'Row properties',
      onclick: cmd('mceTableRowProps')
    });
    editor.addButton('tablecutrow', {
      title: 'Cut row',
      onclick: cmd('mceTableCutRow')
    });
    editor.addButton('tablecopyrow', {
      title: 'Copy row',
      onclick: cmd('mceTableCopyRow')
    });
    editor.addButton('tablepasterowbefore', {
      title: 'Paste row before',
      onclick: cmd('mceTablePasteRowBefore')
    });
    editor.addButton('tablepasterowafter', {
      title: 'Paste row after',
      onclick: cmd('mceTablePasteRowAfter')
    });
    editor.addButton('tableinsertcolbefore', {
      title: 'Insert column before',
      onclick: cmd('mceTableInsertColBefore')
    });
    editor.addButton('tableinsertcolafter', {
      title: 'Insert column after',
      onclick: cmd('mceTableInsertColAfter')
    });
    editor.addButton('tabledeletecol', {
      title: 'Delete column',
      onclick: cmd('mceTableDeleteCol')
    });
  };
  var addToolbars = function (editor) {
    var isTable = function (table) {
      var selectorMatched = editor.dom.is(table, 'table') && editor.getBody().contains(table);
      return selectorMatched;
    };
    var toolbarItems = editor.settings.table_toolbar;
    if (toolbarItems === '' || toolbarItems === false) {
      return;
    }
    if (!toolbarItems) {
      toolbarItems = 'tableprops tabledelete | ' + 'tableinsertrowbefore tableinsertrowafter tabledeleterow | ' + 'tableinsertcolbefore tableinsertcolafter tabledeletecol';
    }
    editor.addContextToolbar(isTable, toolbarItems);
  };
  var $_9z5mdqpbjd08mesh = {
    addButtons: addButtons,
    addToolbars: addToolbars
  };

  var addMenuItems = function (editor, selections) {
    var targets = $_7bux4mjhjd08mdsb.none();
    var tableCtrls = [];
    var cellCtrls = [];
    var mergeCtrls = [];
    var unmergeCtrls = [];
    var noTargetDisable = function (ctrl) {
      ctrl.disabled(true);
    };
    var ctrlEnable = function (ctrl) {
      ctrl.disabled(false);
    };
    var pushTable = function () {
      var self = this;
      tableCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        ctrlEnable(self);
      });
    };
    var pushCell = function () {
      var self = this;
      cellCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        ctrlEnable(self);
      });
    };
    var pushMerge = function () {
      var self = this;
      mergeCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        self.disabled(targets.mergable().isNone());
      });
    };
    var pushUnmerge = function () {
      var self = this;
      unmergeCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        self.disabled(targets.unmergable().isNone());
      });
    };
    var setDisabledCtrls = function () {
      targets.fold(function () {
        $_aga3rgjgjd08mds5.each(tableCtrls, noTargetDisable);
        $_aga3rgjgjd08mds5.each(cellCtrls, noTargetDisable);
        $_aga3rgjgjd08mds5.each(mergeCtrls, noTargetDisable);
        $_aga3rgjgjd08mds5.each(unmergeCtrls, noTargetDisable);
      }, function (targets) {
        $_aga3rgjgjd08mds5.each(tableCtrls, ctrlEnable);
        $_aga3rgjgjd08mds5.each(cellCtrls, ctrlEnable);
        $_aga3rgjgjd08mds5.each(mergeCtrls, function (mergeCtrl) {
          mergeCtrl.disabled(targets.mergable().isNone());
        });
        $_aga3rgjgjd08mds5.each(unmergeCtrls, function (unmergeCtrl) {
          unmergeCtrl.disabled(targets.unmergable().isNone());
        });
      });
    };
    editor.on('init', function () {
      editor.on('nodechange', function (e) {
        var cellOpt = $_7bux4mjhjd08mdsb.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        targets = cellOpt.bind(function (cellDom) {
          var cell = $_7kgirujvjd08mdum.fromDom(cellDom);
          var table = $_915052jsjd08mdtp.table(cell);
          return table.map(function (table) {
            return $_16zmzpl1jd08mdz3.forMenu(selections, table, cell);
          });
        });
        setDisabledCtrls();
      });
    });
    var generateTableGrid = function () {
      var html = '';
      html = '<table role="grid" class="mce-grid mce-grid-border" aria-readonly="true">';
      for (var y = 0; y < 10; y++) {
        html += '<tr>';
        for (var x = 0; x < 10; x++) {
          html += '<td role="gridcell" tabindex="-1"><a id="mcegrid' + (y * 10 + x) + '" href="#" ' + 'data-mce-x="' + x + '" data-mce-y="' + y + '"></a></td>';
        }
        html += '</tr>';
      }
      html += '</table>';
      html += '<div class="mce-text-center" role="presentation">1 x 1</div>';
      return html;
    };
    var selectGrid = function (editor, tx, ty, control) {
      var table = control.getEl().getElementsByTagName('table')[0];
      var x, y, focusCell, cell, active;
      var rtl = control.isRtl() || control.parent().rel === 'tl-tr';
      table.nextSibling.innerHTML = tx + 1 + ' x ' + (ty + 1);
      if (rtl) {
        tx = 9 - tx;
      }
      for (y = 0; y < 10; y++) {
        for (x = 0; x < 10; x++) {
          cell = table.rows[y].childNodes[x].firstChild;
          active = (rtl ? x >= tx : x <= tx) && y <= ty;
          editor.dom.toggleClass(cell, 'mce-active', active);
          if (active) {
            focusCell = cell;
          }
        }
      }
      return focusCell.parentNode;
    };
    var insertTable = editor.settings.table_grid === false ? {
      text: 'Table',
      icon: 'table',
      context: 'table',
      onclick: $_bypfqijijd08mdsd.curry($_djpbofn8jd08medz.open, editor)
    } : {
      text: 'Table',
      icon: 'table',
      context: 'table',
      ariaHideMenu: true,
      onclick: function (e) {
        if (e.aria) {
          this.parent().hideAll();
          e.stopImmediatePropagation();
          $_djpbofn8jd08medz.open(editor);
        }
      },
      onshow: function () {
        selectGrid(editor, 0, 0, this.menu.items()[0]);
      },
      onhide: function () {
        var elements = this.menu.items()[0].getEl().getElementsByTagName('a');
        editor.dom.removeClass(elements, 'mce-active');
        editor.dom.addClass(elements[0], 'mce-active');
      },
      menu: [{
          type: 'container',
          html: generateTableGrid(),
          onPostRender: function () {
            this.lastX = this.lastY = 0;
          },
          onmousemove: function (e) {
            var target = e.target;
            var x, y;
            if (target.tagName.toUpperCase() === 'A') {
              x = parseInt(target.getAttribute('data-mce-x'), 10);
              y = parseInt(target.getAttribute('data-mce-y'), 10);
              if (this.isRtl() || this.parent().rel === 'tl-tr') {
                x = 9 - x;
              }
              if (x !== this.lastX || y !== this.lastY) {
                selectGrid(editor, x, y, e.control);
                this.lastX = x;
                this.lastY = y;
              }
            }
          },
          onclick: function (e) {
            var self = this;
            if (e.target.tagName.toUpperCase() === 'A') {
              e.preventDefault();
              e.stopPropagation();
              self.parent().cancel();
              editor.undoManager.transact(function () {
                $_1rnf7sljjd08me2n.insert(editor, self.lastX + 1, self.lastY + 1);
              });
              editor.addVisual();
            }
          }
        }]
    };
    function cmd(command) {
      return function () {
        editor.execCommand(command);
      };
    }
    var tableProperties = {
      text: 'Table properties',
      context: 'table',
      onPostRender: pushTable,
      onclick: $_bypfqijijd08mdsd.curry($_djpbofn8jd08medz.open, editor, true)
    };
    var deleteTable = {
      text: 'Delete table',
      context: 'table',
      onPostRender: pushTable,
      cmd: 'mceTableDelete'
    };
    var row = {
      text: 'Row',
      context: 'table',
      menu: [
        {
          text: 'Insert row before',
          onclick: cmd('mceTableInsertRowBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Insert row after',
          onclick: cmd('mceTableInsertRowAfter'),
          onPostRender: pushCell
        },
        {
          text: 'Delete row',
          onclick: cmd('mceTableDeleteRow'),
          onPostRender: pushCell
        },
        {
          text: 'Row properties',
          onclick: cmd('mceTableRowProps'),
          onPostRender: pushCell
        },
        { text: '-' },
        {
          text: 'Cut row',
          onclick: cmd('mceTableCutRow'),
          onPostRender: pushCell
        },
        {
          text: 'Copy row',
          onclick: cmd('mceTableCopyRow'),
          onPostRender: pushCell
        },
        {
          text: 'Paste row before',
          onclick: cmd('mceTablePasteRowBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Paste row after',
          onclick: cmd('mceTablePasteRowAfter'),
          onPostRender: pushCell
        }
      ]
    };
    var column = {
      text: 'Column',
      context: 'table',
      menu: [
        {
          text: 'Insert column before',
          onclick: cmd('mceTableInsertColBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Insert column after',
          onclick: cmd('mceTableInsertColAfter'),
          onPostRender: pushCell
        },
        {
          text: 'Delete column',
          onclick: cmd('mceTableDeleteCol'),
          onPostRender: pushCell
        }
      ]
    };
    var cell = {
      separator: 'before',
      text: 'Cell',
      context: 'table',
      menu: [
        {
          text: 'Cell properties',
          onclick: cmd('mceTableCellProps'),
          onPostRender: pushCell
        },
        {
          text: 'Merge cells',
          onclick: cmd('mceTableMergeCells'),
          onPostRender: pushMerge
        },
        {
          text: 'Split cell',
          onclick: cmd('mceTableSplitCells'),
          onPostRender: pushUnmerge
        }
      ]
    };
    editor.addMenuItem('inserttable', insertTable);
    editor.addMenuItem('tableprops', tableProperties);
    editor.addMenuItem('deletetable', deleteTable);
    editor.addMenuItem('row', row);
    editor.addMenuItem('column', column);
    editor.addMenuItem('cell', cell);
  };
  var $_d5fcwpcjd08mesl = { addMenuItems: addMenuItems };

  function Plugin(editor) {
    var self = this;
    var resizeHandler = ResizeHandler(editor);
    var cellSelection = CellSelection$1(editor, resizeHandler.lazyResize);
    var actions = TableActions(editor, resizeHandler.lazyWire);
    var selections = Selections(editor);
    $_fxmrgyn5jd08mede.registerCommands(editor, actions, cellSelection, selections);
    $_4l2jlkjfjd08mdrk.registerEvents(editor, selections, actions, cellSelection);
    $_d5fcwpcjd08mesl.addMenuItems(editor, selections);
    $_9z5mdqpbjd08mesh.addButtons(editor);
    $_9z5mdqpbjd08mesh.addToolbars(editor);
    editor.on('PreInit', function () {
      editor.serializer.addTempAttr($_1hcpf9lgjd08me2b.firstSelected());
      editor.serializer.addTempAttr($_1hcpf9lgjd08me2b.lastSelected());
    });
    if (editor.settings.table_tab_navigation !== false) {
      editor.on('keydown', function (e) {
        $_9bj79qo0jd08meja.handle(e, editor, actions, resizeHandler.lazyWire);
      });
    }
    editor.on('remove', function () {
      resizeHandler.destroy();
      cellSelection.destroy();
    });
    self.insertTable = function (columns, rows) {
      return $_1rnf7sljjd08me2n.insert(editor, columns, rows);
    };
    self.setClipboardRows = $_fxmrgyn5jd08mede.setClipboardRows;
    self.getClipboardRows = $_fxmrgyn5jd08mede.getClipboardRows;
  }
  PluginManager.add('table', Plugin);
  function Plugin$1 () {
  }

  return Plugin$1;

}());
})()
