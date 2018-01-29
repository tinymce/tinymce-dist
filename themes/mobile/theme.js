(function () {
var mobile = (function () {
  'use strict';

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
  var $_8zkcijwbjd08mgn8 = {
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

  var never$1 = $_8zkcijwbjd08mgn8.never;
  var always$1 = $_8zkcijwbjd08mgn8.always;
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
      toString: $_8zkcijwbjd08mgn8.constant('none()')
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
  var $_4izgwbwajd08mgn6 = {
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
    return r === -1 ? $_4izgwbwajd08mgn6.none() : $_4izgwbwajd08mgn6.some(r);
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
        return $_4izgwbwajd08mgn6.some(x);
      }
    }
    return $_4izgwbwajd08mgn6.none();
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return $_4izgwbwajd08mgn6.some(i);
      }
    }
    return $_4izgwbwajd08mgn6.none();
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
    return xs.length === 0 ? $_4izgwbwajd08mgn6.none() : $_4izgwbwajd08mgn6.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? $_4izgwbwajd08mgn6.none() : $_4izgwbwajd08mgn6.some(xs[xs.length - 1]);
  };
  var $_453g14w9jd08mgmy = {
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
  var $_dxz276wejd08mgnd = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_dxz276wejd08mgnd.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_4peh7owdjd08mgnb = { getOrDie: getOrDie };

  var node = function () {
    var f = $_4peh7owdjd08mgnb.getOrDie('Node');
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
  var $_7vyi6bwcjd08mgna = {
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
  var $_2crir4whjd08mgni = { cached: cached };

  var firstMatch = function (regexes, s) {
    for (var i = 0; i < regexes.length; i++) {
      var x = regexes[i];
      if (x.test(s))
        return x;
    }
    return undefined;
  };
  var find$1 = function (regexes, agent) {
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
    return find$1(versionRegexes, cleanedAgent);
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
  var $_74sm8xwkjd08mgnp = {
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
      version: $_74sm8xwkjd08mgnp.unknown()
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
  var $_fzzly2wjjd08mgnl = {
    unknown: unknown$1,
    nu: nu$1,
    edge: $_8zkcijwbjd08mgn8.constant(edge),
    chrome: $_8zkcijwbjd08mgn8.constant(chrome),
    ie: $_8zkcijwbjd08mgn8.constant(ie),
    opera: $_8zkcijwbjd08mgn8.constant(opera),
    firefox: $_8zkcijwbjd08mgn8.constant(firefox),
    safari: $_8zkcijwbjd08mgn8.constant(safari)
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
      version: $_74sm8xwkjd08mgnp.unknown()
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
  var $_tts8vwljd08mgnt = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_8zkcijwbjd08mgn8.constant(windows),
    ios: $_8zkcijwbjd08mgn8.constant(ios),
    android: $_8zkcijwbjd08mgn8.constant(android),
    linux: $_8zkcijwbjd08mgn8.constant(linux),
    osx: $_8zkcijwbjd08mgn8.constant(osx),
    solaris: $_8zkcijwbjd08mgn8.constant(solaris),
    freebsd: $_8zkcijwbjd08mgn8.constant(freebsd)
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
      isiPad: $_8zkcijwbjd08mgn8.constant(isiPad),
      isiPhone: $_8zkcijwbjd08mgn8.constant(isiPhone),
      isTablet: $_8zkcijwbjd08mgn8.constant(isTablet),
      isPhone: $_8zkcijwbjd08mgn8.constant(isPhone),
      isTouch: $_8zkcijwbjd08mgn8.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_8zkcijwbjd08mgn8.constant(iOSwebview)
    };
  }

  var detect$1 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return $_453g14w9jd08mgmy.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$1(browsers, userAgent).map(function (browser) {
      var version = $_74sm8xwkjd08mgnp.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$1(oses, userAgent).map(function (os) {
      var version = $_74sm8xwkjd08mgnp.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_d2qpp1wnjd08mgo2 = {
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
  var $_375zvowqjd08mgoh = {
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
    return str === '' ? $_4izgwbwajd08mgn6.none() : $_4izgwbwajd08mgn6.some(str.substr(0, 1));
  };
  var tail = function (str) {
    return str === '' ? $_4izgwbwajd08mgn6.none() : $_4izgwbwajd08mgn6.some(str.substring(1));
  };
  var $_90drm3wrjd08mgoj = {
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
    return startsWith(str, prefix) ? $_375zvowqjd08mgoh.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_375zvowqjd08mgoh.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_375zvowqjd08mgoh.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_375zvowqjd08mgoh.addToEnd(str, prefix);
  };
  var contains$1 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_90drm3wrjd08mgoj.head(str).bind(function (head) {
      return $_90drm3wrjd08mgoj.tail(str).map(function (tail) {
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
  var $_3btv0xwpjd08mgoe = {
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
      return $_3btv0xwpjd08mgoe.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_3btv0xwpjd08mgoe.contains(uastring, 'edge/') && $_3btv0xwpjd08mgoe.contains(uastring, 'chrome') && $_3btv0xwpjd08mgoe.contains(uastring, 'safari') && $_3btv0xwpjd08mgoe.contains(uastring, 'applewebkit');
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
        return $_3btv0xwpjd08mgoe.contains(uastring, 'chrome') && !$_3btv0xwpjd08mgoe.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_3btv0xwpjd08mgoe.contains(uastring, 'msie') || $_3btv0xwpjd08mgoe.contains(uastring, 'trident');
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
        return ($_3btv0xwpjd08mgoe.contains(uastring, 'safari') || $_3btv0xwpjd08mgoe.contains(uastring, 'mobile/')) && $_3btv0xwpjd08mgoe.contains(uastring, 'applewebkit');
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
        return $_3btv0xwpjd08mgoe.contains(uastring, 'iphone') || $_3btv0xwpjd08mgoe.contains(uastring, 'ipad');
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
  var $_878k0mwojd08mgo7 = {
    browsers: $_8zkcijwbjd08mgn8.constant(browsers),
    oses: $_8zkcijwbjd08mgn8.constant(oses)
  };

  var detect$2 = function (userAgent) {
    var browsers = $_878k0mwojd08mgo7.browsers();
    var oses = $_878k0mwojd08mgo7.oses();
    var browser = $_d2qpp1wnjd08mgo2.detectBrowser(browsers, userAgent).fold($_fzzly2wjjd08mgnl.unknown, $_fzzly2wjjd08mgnl.nu);
    var os = $_d2qpp1wnjd08mgo2.detectOs(oses, userAgent).fold($_tts8vwljd08mgnt.unknown, $_tts8vwljd08mgnt.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_2id14pwijd08mgnk = { detect: detect$2 };

  var detect$3 = $_2crir4whjd08mgni.cached(function () {
    var userAgent = navigator.userAgent;
    return $_2id14pwijd08mgnk.detect(userAgent);
  });
  var $_dymoxnwgjd08mgng = { detect: detect$3 };

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
    return { dom: $_8zkcijwbjd08mgn8.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return $_4izgwbwajd08mgn6.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_3visdkwtjd08mgor = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_dnrobswujd08mgp0 = {
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

  var ELEMENT = $_dnrobswujd08mgp0.ELEMENT;
  var DOCUMENT = $_dnrobswujd08mgp0.DOCUMENT;
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
    return bypassSelector(base) ? [] : $_453g14w9jd08mgmy.map(base.querySelectorAll(selector), $_3visdkwtjd08mgor.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? $_4izgwbwajd08mgn6.none() : $_4izgwbwajd08mgn6.from(base.querySelector(selector)).map($_3visdkwtjd08mgor.fromDom);
  };
  var $_7fzh2owsjd08mgok = {
    all: all,
    is: is,
    one: one
  };

  var eq = function (e1, e2) {
    return e1.dom() === e2.dom();
  };
  var isEqualNode = function (e1, e2) {
    return e1.dom().isEqualNode(e2.dom());
  };
  var member = function (element, elements) {
    return $_453g14w9jd08mgmy.exists(elements, $_8zkcijwbjd08mgn8.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_7vyi6bwcjd08mgna.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_dymoxnwgjd08mgng.detect().browser;
  var contains$2 = browser.isIE() ? ieContains : regularContains;
  var $_ctdo1gw8jd08mgmp = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains$2,
    is: $_7fzh2owsjd08mgok.is
  };

  var isSource = function (component, simulatedEvent) {
    return $_ctdo1gw8jd08mgmp.eq(component.element(), simulatedEvent.event().target());
  };
  var $_5qrlqtw7jd08mgml = { isSource: isSource };

  var $_6gw9slwxjd08mgph = {
    contextmenu: $_8zkcijwbjd08mgn8.constant('contextmenu'),
    touchstart: $_8zkcijwbjd08mgn8.constant('touchstart'),
    touchmove: $_8zkcijwbjd08mgn8.constant('touchmove'),
    touchend: $_8zkcijwbjd08mgn8.constant('touchend'),
    gesturestart: $_8zkcijwbjd08mgn8.constant('gesturestart'),
    mousedown: $_8zkcijwbjd08mgn8.constant('mousedown'),
    mousemove: $_8zkcijwbjd08mgn8.constant('mousemove'),
    mouseout: $_8zkcijwbjd08mgn8.constant('mouseout'),
    mouseup: $_8zkcijwbjd08mgn8.constant('mouseup'),
    mouseover: $_8zkcijwbjd08mgn8.constant('mouseover'),
    focusin: $_8zkcijwbjd08mgn8.constant('focusin'),
    keydown: $_8zkcijwbjd08mgn8.constant('keydown'),
    input: $_8zkcijwbjd08mgn8.constant('input'),
    change: $_8zkcijwbjd08mgn8.constant('change'),
    focus: $_8zkcijwbjd08mgn8.constant('focus'),
    click: $_8zkcijwbjd08mgn8.constant('click'),
    transitionend: $_8zkcijwbjd08mgn8.constant('transitionend'),
    selectstart: $_8zkcijwbjd08mgn8.constant('selectstart')
  };

  var alloy = { tap: $_8zkcijwbjd08mgn8.constant('alloy.tap') };
  var $_30aqx5wwjd08mgpa = {
    focus: $_8zkcijwbjd08mgn8.constant('alloy.focus'),
    postBlur: $_8zkcijwbjd08mgn8.constant('alloy.blur.post'),
    receive: $_8zkcijwbjd08mgn8.constant('alloy.receive'),
    execute: $_8zkcijwbjd08mgn8.constant('alloy.execute'),
    focusItem: $_8zkcijwbjd08mgn8.constant('alloy.focus.item'),
    tap: alloy.tap,
    tapOrClick: $_dymoxnwgjd08mgng.detect().deviceType.isTouch() ? alloy.tap : $_6gw9slwxjd08mgph.click,
    longpress: $_8zkcijwbjd08mgn8.constant('alloy.longpress'),
    sandboxClose: $_8zkcijwbjd08mgn8.constant('alloy.sandbox.close'),
    systemInit: $_8zkcijwbjd08mgn8.constant('alloy.system.init'),
    windowScroll: $_8zkcijwbjd08mgn8.constant('alloy.system.scroll'),
    attachedToDom: $_8zkcijwbjd08mgn8.constant('alloy.system.attached'),
    detachedFromDom: $_8zkcijwbjd08mgn8.constant('alloy.system.detached'),
    changeTab: $_8zkcijwbjd08mgn8.constant('alloy.change.tab'),
    dismissTab: $_8zkcijwbjd08mgn8.constant('alloy.dismiss.tab')
  };

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
  var $_erilttwzjd08mgpl = {
    isString: isType('string'),
    isObject: isType('object'),
    isArray: isType('array'),
    isNull: isType('null'),
    isBoolean: isType('boolean'),
    isUndefined: isType('undefined'),
    isFunction: isType('function'),
    isNumber: isType('number')
  };

  var shallow = function (old, nu) {
    return nu;
  };
  var deep = function (old, nu) {
    var bothObjects = $_erilttwzjd08mgpl.isObject(old) && $_erilttwzjd08mgpl.isObject(nu);
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
  var deepMerge = baseMerge(deep);
  var merge = baseMerge(shallow);
  var $_25kgk5wyjd08mgpk = {
    deepMerge: deepMerge,
    merge: merge
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
  var find$2 = function (obj, pred) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      if (pred(x, i, obj)) {
        return $_4izgwbwajd08mgn6.some(x);
      }
    }
    return $_4izgwbwajd08mgn6.none();
  };
  var values = function (obj) {
    return mapToArray(obj, function (v) {
      return v;
    });
  };
  var size = function (obj) {
    return values(obj).length;
  };
  var $_1xoayfx0jd08mgpm = {
    bifilter: bifilter,
    each: each$1,
    map: objectMap,
    mapToArray: mapToArray,
    tupleMap: tupleMap,
    find: find$2,
    keys: keys,
    values: values,
    size: size
  };

  var emit = function (component, event) {
    dispatchWith(component, component.element(), event, {});
  };
  var emitWith = function (component, event, properties) {
    dispatchWith(component, component.element(), event, properties);
  };
  var emitExecute = function (component) {
    emit(component, $_30aqx5wwjd08mgpa.execute());
  };
  var dispatch = function (component, target, event) {
    dispatchWith(component, target, event, {});
  };
  var dispatchWith = function (component, target, event, properties) {
    var data = $_25kgk5wyjd08mgpk.deepMerge({ target: target }, properties);
    component.getSystem().triggerEvent(event, target, $_1xoayfx0jd08mgpm.map(data, $_8zkcijwbjd08mgn8.constant));
  };
  var dispatchEvent = function (component, target, event, simulatedEvent) {
    component.getSystem().triggerEvent(event, target, simulatedEvent.event());
  };
  var dispatchFocus = function (component, target) {
    component.getSystem().triggerFocus(target, component.element());
  };
  var $_f6t3w1wvjd08mgp1 = {
    emit: emit,
    emitWith: emitWith,
    emitExecute: emitExecute,
    dispatch: dispatch,
    dispatchWith: dispatchWith,
    dispatchEvent: dispatchEvent,
    dispatchFocus: dispatchFocus
  };

  var generate = function (cases) {
    if (!$_erilttwzjd08mgpl.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_453g14w9jd08mgmy.each(cases, function (acase, count) {
      var keys = $_1xoayfx0jd08mgpm.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_erilttwzjd08mgpl.isArray(value)) {
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
          var branchKeys = $_1xoayfx0jd08mgpm.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_453g14w9jd08mgmy.forall(constructors, function (reqKey) {
            return $_453g14w9jd08mgmy.contains(branchKeys, reqKey);
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
  var $_dv5x6ax4jd08mgqe = { generate: generate };

  var adt = $_dv5x6ax4jd08mgqe.generate([
    { strict: [] },
    { defaultedThunk: ['fallbackThunk'] },
    { asOption: [] },
    { asDefaultedOptionThunk: ['fallbackThunk'] },
    { mergeWithThunk: ['baseThunk'] }
  ]);
  var defaulted = function (fallback) {
    return adt.defaultedThunk($_8zkcijwbjd08mgn8.constant(fallback));
  };
  var asDefaultedOption = function (fallback) {
    return adt.asDefaultedOptionThunk($_8zkcijwbjd08mgn8.constant(fallback));
  };
  var mergeWith = function (base) {
    return adt.mergeWithThunk($_8zkcijwbjd08mgn8.constant(base));
  };
  var $_dlh1w7x3jd08mgq8 = {
    strict: adt.strict,
    asOption: adt.asOption,
    defaulted: defaulted,
    defaultedThunk: adt.defaultedThunk,
    asDefaultedOption: asDefaultedOption,
    asDefaultedOptionThunk: adt.asDefaultedOptionThunk,
    mergeWith: mergeWith,
    mergeWithThunk: adt.mergeWithThunk
  };

  var value = function (o) {
    var is = function (v) {
      return o === v;
    };
    var or = function (opt) {
      return value(o);
    };
    var orThunk = function (f) {
      return value(o);
    };
    var map = function (f) {
      return value(f(o));
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
      return $_4izgwbwajd08mgn6.some(o);
    };
    return {
      is: is,
      isValue: $_8zkcijwbjd08mgn8.constant(true),
      isError: $_8zkcijwbjd08mgn8.constant(false),
      getOr: $_8zkcijwbjd08mgn8.constant(o),
      getOrThunk: $_8zkcijwbjd08mgn8.constant(o),
      getOrDie: $_8zkcijwbjd08mgn8.constant(o),
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
      return $_8zkcijwbjd08mgn8.die(message)();
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
      is: $_8zkcijwbjd08mgn8.constant(false),
      isValue: $_8zkcijwbjd08mgn8.constant(false),
      isError: $_8zkcijwbjd08mgn8.constant(true),
      getOr: $_8zkcijwbjd08mgn8.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_8zkcijwbjd08mgn8.noop,
      bind: bind,
      exists: $_8zkcijwbjd08mgn8.constant(false),
      forall: $_8zkcijwbjd08mgn8.constant(true),
      toOption: $_4izgwbwajd08mgn6.none
    };
  };
  var $_2y9mlbx8jd08mgr7 = {
    value: value,
    error: error
  };

  var comparison = $_dv5x6ax4jd08mgqe.generate([
    {
      bothErrors: [
        'error1',
        'error2'
      ]
    },
    {
      firstError: [
        'error1',
        'value2'
      ]
    },
    {
      secondError: [
        'value1',
        'error2'
      ]
    },
    {
      bothValues: [
        'value1',
        'value2'
      ]
    }
  ]);
  var partition$1 = function (results) {
    var errors = [];
    var values = [];
    $_453g14w9jd08mgmy.each(results, function (result) {
      result.fold(function (err) {
        errors.push(err);
      }, function (value) {
        values.push(value);
      });
    });
    return {
      errors: errors,
      values: values
    };
  };
  var compare = function (result1, result2) {
    return result1.fold(function (err1) {
      return result2.fold(function (err2) {
        return comparison.bothErrors(err1, err2);
      }, function (val2) {
        return comparison.firstError(err1, val2);
      });
    }, function (val1) {
      return result2.fold(function (err2) {
        return comparison.secondError(val1, err2);
      }, function (val2) {
        return comparison.bothValues(val1, val2);
      });
    });
  };
  var $_c5n33ax9jd08mgra = {
    partition: partition$1,
    compare: compare
  };

  var mergeValues = function (values, base) {
    return $_2y9mlbx8jd08mgr7.value($_25kgk5wyjd08mgpk.deepMerge.apply(undefined, [base].concat(values)));
  };
  var mergeErrors = function (errors) {
    return $_8zkcijwbjd08mgn8.compose($_2y9mlbx8jd08mgr7.error, $_453g14w9jd08mgmy.flatten)(errors);
  };
  var consolidateObj = function (objects, base) {
    var partitions = $_c5n33ax9jd08mgra.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : mergeValues(partitions.values, base);
  };
  var consolidateArr = function (objects) {
    var partitions = $_c5n33ax9jd08mgra.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : $_2y9mlbx8jd08mgr7.value(partitions.values);
  };
  var $_9ul9qmx7jd08mgr0 = {
    consolidateObj: consolidateObj,
    consolidateArr: consolidateArr
  };

  var narrow = function (obj, fields) {
    var r = {};
    $_453g14w9jd08mgmy.each(fields, function (field) {
      if (obj[field] !== undefined && obj.hasOwnProperty(field))
        r[field] = obj[field];
    });
    return r;
  };
  var indexOnKey = function (array, key) {
    var obj = {};
    $_453g14w9jd08mgmy.each(array, function (a) {
      var keyValue = a[key];
      obj[keyValue] = a;
    });
    return obj;
  };
  var exclude = function (obj, fields) {
    var r = {};
    $_1xoayfx0jd08mgpm.each(obj, function (v, k) {
      if (!$_453g14w9jd08mgmy.contains(fields, k)) {
        r[k] = v;
      }
    });
    return r;
  };
  var $_6s1w8oxajd08mgrb = {
    narrow: narrow,
    exclude: exclude,
    indexOnKey: indexOnKey
  };

  var readOpt = function (key) {
    return function (obj) {
      return obj.hasOwnProperty(key) ? $_4izgwbwajd08mgn6.from(obj[key]) : $_4izgwbwajd08mgn6.none();
    };
  };
  var readOr = function (key, fallback) {
    return function (obj) {
      return readOpt(key)(obj).getOr(fallback);
    };
  };
  var readOptFrom = function (obj, key) {
    return readOpt(key)(obj);
  };
  var hasKey = function (obj, key) {
    return obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null;
  };
  var $_b6sjerxbjd08mgrf = {
    readOpt: readOpt,
    readOr: readOr,
    readOptFrom: readOptFrom,
    hasKey: hasKey
  };

  var wrap = function (key, value) {
    var r = {};
    r[key] = value;
    return r;
  };
  var wrapAll = function (keyvalues) {
    var r = {};
    $_453g14w9jd08mgmy.each(keyvalues, function (kv) {
      r[kv.key] = kv.value;
    });
    return r;
  };
  var $_93d3hmxcjd08mgri = {
    wrap: wrap,
    wrapAll: wrapAll
  };

  var narrow$1 = function (obj, fields) {
    return $_6s1w8oxajd08mgrb.narrow(obj, fields);
  };
  var exclude$1 = function (obj, fields) {
    return $_6s1w8oxajd08mgrb.exclude(obj, fields);
  };
  var readOpt$1 = function (key) {
    return $_b6sjerxbjd08mgrf.readOpt(key);
  };
  var readOr$1 = function (key, fallback) {
    return $_b6sjerxbjd08mgrf.readOr(key, fallback);
  };
  var readOptFrom$1 = function (obj, key) {
    return $_b6sjerxbjd08mgrf.readOptFrom(obj, key);
  };
  var wrap$1 = function (key, value) {
    return $_93d3hmxcjd08mgri.wrap(key, value);
  };
  var wrapAll$1 = function (keyvalues) {
    return $_93d3hmxcjd08mgri.wrapAll(keyvalues);
  };
  var indexOnKey$1 = function (array, key) {
    return $_6s1w8oxajd08mgrb.indexOnKey(array, key);
  };
  var consolidate = function (objs, base) {
    return $_9ul9qmx7jd08mgr0.consolidateObj(objs, base);
  };
  var hasKey$1 = function (obj, key) {
    return $_b6sjerxbjd08mgrf.hasKey(obj, key);
  };
  var $_96dvjsx6jd08mgqy = {
    narrow: narrow$1,
    exclude: exclude$1,
    readOpt: readOpt$1,
    readOr: readOr$1,
    readOptFrom: readOptFrom$1,
    wrap: wrap$1,
    wrapAll: wrapAll$1,
    indexOnKey: indexOnKey$1,
    hasKey: hasKey$1,
    consolidate: consolidate
  };

  var json = function () {
    return $_4peh7owdjd08mgnb.getOrDie('JSON');
  };
  var parse = function (obj) {
    return json().parse(obj);
  };
  var stringify = function (obj, replacer, space) {
    return json().stringify(obj, replacer, space);
  };
  var $_ggze9axfjd08mgrt = {
    parse: parse,
    stringify: stringify
  };

  var formatObj = function (input) {
    return $_erilttwzjd08mgpl.isObject(input) && $_1xoayfx0jd08mgpm.keys(input).length > 100 ? ' removed due to size' : $_ggze9axfjd08mgrt.stringify(input, null, 2);
  };
  var formatErrors = function (errors) {
    var es = errors.length > 10 ? errors.slice(0, 10).concat([{
        path: [],
        getErrorInfo: function () {
          return '... (only showing first ten failures)';
        }
      }]) : errors;
    return $_453g14w9jd08mgmy.map(es, function (e) {
      return 'Failed path: (' + e.path.join(' > ') + ')\n' + e.getErrorInfo();
    });
  };
  var $_7w7xvgxejd08mgro = {
    formatObj: formatObj,
    formatErrors: formatErrors
  };

  var nu$3 = function (path, getErrorInfo) {
    return $_2y9mlbx8jd08mgr7.error([{
        path: path,
        getErrorInfo: getErrorInfo
      }]);
  };
  var missingStrict = function (path, key, obj) {
    return nu$3(path, function () {
      return 'Could not find valid *strict* value for "' + key + '" in ' + $_7w7xvgxejd08mgro.formatObj(obj);
    });
  };
  var missingKey = function (path, key) {
    return nu$3(path, function () {
      return 'Choice schema did not contain choice key: "' + key + '"';
    });
  };
  var missingBranch = function (path, branches, branch) {
    return nu$3(path, function () {
      return 'The chosen schema: "' + branch + '" did not exist in branches: ' + $_7w7xvgxejd08mgro.formatObj(branches);
    });
  };
  var unsupportedFields = function (path, unsupported) {
    return nu$3(path, function () {
      return 'There are unsupported fields: [' + unsupported.join(', ') + '] specified';
    });
  };
  var custom = function (path, err) {
    return nu$3(path, function () {
      return err;
    });
  };
  var toString = function (error) {
    return 'Failed path: (' + error.path.join(' > ') + ')\n' + error.getErrorInfo();
  };
  var $_4ftb0gxdjd08mgrl = {
    missingStrict: missingStrict,
    missingKey: missingKey,
    missingBranch: missingBranch,
    unsupportedFields: unsupportedFields,
    custom: custom,
    toString: toString
  };

  var typeAdt = $_dv5x6ax4jd08mgqe.generate([
    {
      setOf: [
        'validator',
        'valueType'
      ]
    },
    { arrOf: ['valueType'] },
    { objOf: ['fields'] },
    { itemOf: ['validator'] },
    {
      choiceOf: [
        'key',
        'branches'
      ]
    }
  ]);
  var fieldAdt = $_dv5x6ax4jd08mgqe.generate([
    {
      field: [
        'name',
        'presence',
        'type'
      ]
    },
    { state: ['name'] }
  ]);
  var $_gdw5qexgjd08mgru = {
    typeAdt: typeAdt,
    fieldAdt: fieldAdt
  };

  var adt$1 = $_dv5x6ax4jd08mgqe.generate([
    {
      field: [
        'key',
        'okey',
        'presence',
        'prop'
      ]
    },
    {
      state: [
        'okey',
        'instantiator'
      ]
    }
  ]);
  var output = function (okey, value) {
    return adt$1.state(okey, $_8zkcijwbjd08mgn8.constant(value));
  };
  var snapshot = function (okey) {
    return adt$1.state(okey, $_8zkcijwbjd08mgn8.identity);
  };
  var strictAccess = function (path, obj, key) {
    return $_b6sjerxbjd08mgrf.readOptFrom(obj, key).fold(function () {
      return $_4ftb0gxdjd08mgrl.missingStrict(path, key, obj);
    }, $_2y9mlbx8jd08mgr7.value);
  };
  var fallbackAccess = function (obj, key, fallbackThunk) {
    var v = $_b6sjerxbjd08mgrf.readOptFrom(obj, key).fold(function () {
      return fallbackThunk(obj);
    }, $_8zkcijwbjd08mgn8.identity);
    return $_2y9mlbx8jd08mgr7.value(v);
  };
  var optionAccess = function (obj, key) {
    return $_2y9mlbx8jd08mgr7.value($_b6sjerxbjd08mgrf.readOptFrom(obj, key));
  };
  var optionDefaultedAccess = function (obj, key, fallback) {
    var opt = $_b6sjerxbjd08mgrf.readOptFrom(obj, key).map(function (val) {
      return val === true ? fallback(obj) : val;
    });
    return $_2y9mlbx8jd08mgr7.value(opt);
  };
  var cExtractOne = function (path, obj, field, strength) {
    return field.fold(function (key, okey, presence, prop) {
      var bundle = function (av) {
        return prop.extract(path.concat([key]), strength, av).map(function (res) {
          return $_93d3hmxcjd08mgri.wrap(okey, strength(res));
        });
      };
      var bundleAsOption = function (optValue) {
        return optValue.fold(function () {
          var outcome = $_93d3hmxcjd08mgri.wrap(okey, strength($_4izgwbwajd08mgn6.none()));
          return $_2y9mlbx8jd08mgr7.value(outcome);
        }, function (ov) {
          return prop.extract(path.concat([key]), strength, ov).map(function (res) {
            return $_93d3hmxcjd08mgri.wrap(okey, strength($_4izgwbwajd08mgn6.some(res)));
          });
        });
      };
      return function () {
        return presence.fold(function () {
          return strictAccess(path, obj, key).bind(bundle);
        }, function (fallbackThunk) {
          return fallbackAccess(obj, key, fallbackThunk).bind(bundle);
        }, function () {
          return optionAccess(obj, key).bind(bundleAsOption);
        }, function (fallbackThunk) {
          return optionDefaultedAccess(obj, key, fallbackThunk).bind(bundleAsOption);
        }, function (baseThunk) {
          var base = baseThunk(obj);
          return fallbackAccess(obj, key, $_8zkcijwbjd08mgn8.constant({})).map(function (v) {
            return $_25kgk5wyjd08mgpk.deepMerge(base, v);
          }).bind(bundle);
        });
      }();
    }, function (okey, instantiator) {
      var state = instantiator(obj);
      return $_2y9mlbx8jd08mgr7.value($_93d3hmxcjd08mgri.wrap(okey, strength(state)));
    });
  };
  var cExtract = function (path, obj, fields, strength) {
    var results = $_453g14w9jd08mgmy.map(fields, function (field) {
      return cExtractOne(path, obj, field, strength);
    });
    return $_9ul9qmx7jd08mgr0.consolidateObj(results, {});
  };
  var value$1 = function (validator) {
    var extract = function (path, strength, val) {
      return validator(val).fold(function (err) {
        return $_4ftb0gxdjd08mgrl.custom(path, err);
      }, $_2y9mlbx8jd08mgr7.value);
    };
    var toString = function () {
      return 'val';
    };
    var toDsl = function () {
      return $_gdw5qexgjd08mgru.typeAdt.itemOf(validator);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var getSetKeys = function (obj) {
    var keys = $_1xoayfx0jd08mgpm.keys(obj);
    return $_453g14w9jd08mgmy.filter(keys, function (k) {
      return $_96dvjsx6jd08mgqy.hasKey(obj, k);
    });
  };
  var objOnly = function (fields) {
    var delegate = obj(fields);
    var fieldNames = $_453g14w9jd08mgmy.foldr(fields, function (acc, f) {
      return f.fold(function (key) {
        return $_25kgk5wyjd08mgpk.deepMerge(acc, $_96dvjsx6jd08mgqy.wrap(key, true));
      }, $_8zkcijwbjd08mgn8.constant(acc));
    }, {});
    var extract = function (path, strength, o) {
      var keys = $_erilttwzjd08mgpl.isBoolean(o) ? [] : getSetKeys(o);
      var extra = $_453g14w9jd08mgmy.filter(keys, function (k) {
        return !$_96dvjsx6jd08mgqy.hasKey(fieldNames, k);
      });
      return extra.length === 0 ? delegate.extract(path, strength, o) : $_4ftb0gxdjd08mgrl.unsupportedFields(path, extra);
    };
    return {
      extract: extract,
      toString: delegate.toString,
      toDsl: delegate.toDsl
    };
  };
  var obj = function (fields) {
    var extract = function (path, strength, o) {
      return cExtract(path, o, fields, strength);
    };
    var toString = function () {
      var fieldStrings = $_453g14w9jd08mgmy.map(fields, function (field) {
        return field.fold(function (key, okey, presence, prop) {
          return key + ' -> ' + prop.toString();
        }, function (okey, instantiator) {
          return 'state(' + okey + ')';
        });
      });
      return 'obj{\n' + fieldStrings.join('\n') + '}';
    };
    var toDsl = function () {
      return $_gdw5qexgjd08mgru.typeAdt.objOf($_453g14w9jd08mgmy.map(fields, function (f) {
        return f.fold(function (key, okey, presence, prop) {
          return $_gdw5qexgjd08mgru.fieldAdt.field(key, presence, prop);
        }, function (okey, instantiator) {
          return $_gdw5qexgjd08mgru.fieldAdt.state(okey);
        });
      }));
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var arr = function (prop) {
    var extract = function (path, strength, array) {
      var results = $_453g14w9jd08mgmy.map(array, function (a, i) {
        return prop.extract(path.concat(['[' + i + ']']), strength, a);
      });
      return $_9ul9qmx7jd08mgr0.consolidateArr(results);
    };
    var toString = function () {
      return 'array(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_gdw5qexgjd08mgru.typeAdt.arrOf(prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var setOf = function (validator, prop) {
    var validateKeys = function (path, keys) {
      return arr(value$1(validator)).extract(path, $_8zkcijwbjd08mgn8.identity, keys);
    };
    var extract = function (path, strength, o) {
      var keys = $_1xoayfx0jd08mgpm.keys(o);
      return validateKeys(path, keys).bind(function (validKeys) {
        var schema = $_453g14w9jd08mgmy.map(validKeys, function (vk) {
          return adt$1.field(vk, vk, $_dlh1w7x3jd08mgq8.strict(), prop);
        });
        return obj(schema).extract(path, strength, o);
      });
    };
    var toString = function () {
      return 'setOf(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_gdw5qexgjd08mgru.typeAdt.setOf(validator, prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var anyValue = value$1($_2y9mlbx8jd08mgr7.value);
  var arrOfObj = $_8zkcijwbjd08mgn8.compose(arr, obj);
  var $_97mhrux5jd08mgql = {
    anyValue: $_8zkcijwbjd08mgn8.constant(anyValue),
    value: value$1,
    obj: obj,
    objOnly: objOnly,
    arr: arr,
    setOf: setOf,
    arrOfObj: arrOfObj,
    state: adt$1.state,
    field: adt$1.field,
    output: output,
    snapshot: snapshot
  };

  var strict = function (key) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.strict(), $_97mhrux5jd08mgql.anyValue());
  };
  var strictOf = function (key, schema) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.strict(), schema);
  };
  var strictFunction = function (key) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.strict(), $_97mhrux5jd08mgql.value(function (f) {
      return $_erilttwzjd08mgpl.isFunction(f) ? $_2y9mlbx8jd08mgr7.value(f) : $_2y9mlbx8jd08mgr7.error('Not a function');
    }));
  };
  var forbid = function (key, message) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.asOption(), $_97mhrux5jd08mgql.value(function (v) {
      return $_2y9mlbx8jd08mgr7.error('The field: ' + key + ' is forbidden. ' + message);
    }));
  };
  var strictArrayOf = function (key, prop) {
    return strictOf(key, prop);
  };
  var strictObjOf = function (key, objSchema) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.strict(), $_97mhrux5jd08mgql.obj(objSchema));
  };
  var strictArrayOfObj = function (key, objFields) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.strict(), $_97mhrux5jd08mgql.arrOfObj(objFields));
  };
  var option = function (key) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.asOption(), $_97mhrux5jd08mgql.anyValue());
  };
  var optionOf = function (key, schema) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.asOption(), schema);
  };
  var optionObjOf = function (key, objSchema) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.asOption(), $_97mhrux5jd08mgql.obj(objSchema));
  };
  var optionObjOfOnly = function (key, objSchema) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.asOption(), $_97mhrux5jd08mgql.objOnly(objSchema));
  };
  var defaulted$1 = function (key, fallback) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.defaulted(fallback), $_97mhrux5jd08mgql.anyValue());
  };
  var defaultedOf = function (key, fallback, schema) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.defaulted(fallback), schema);
  };
  var defaultedObjOf = function (key, fallback, objSchema) {
    return $_97mhrux5jd08mgql.field(key, key, $_dlh1w7x3jd08mgq8.defaulted(fallback), $_97mhrux5jd08mgql.obj(objSchema));
  };
  var field = function (key, okey, presence, prop) {
    return $_97mhrux5jd08mgql.field(key, okey, presence, prop);
  };
  var state = function (okey, instantiator) {
    return $_97mhrux5jd08mgql.state(okey, instantiator);
  };
  var $_1mrawkx2jd08mgq2 = {
    strict: strict,
    strictOf: strictOf,
    strictObjOf: strictObjOf,
    strictArrayOf: strictArrayOf,
    strictArrayOfObj: strictArrayOfObj,
    strictFunction: strictFunction,
    forbid: forbid,
    option: option,
    optionOf: optionOf,
    optionObjOf: optionObjOf,
    optionObjOfOnly: optionObjOfOnly,
    defaulted: defaulted$1,
    defaultedOf: defaultedOf,
    defaultedObjOf: defaultedObjOf,
    field: field,
    state: state
  };

  var chooseFrom = function (path, strength, input, branches, ch) {
    var fields = $_96dvjsx6jd08mgqy.readOptFrom(branches, ch);
    return fields.fold(function () {
      return $_4ftb0gxdjd08mgrl.missingBranch(path, branches, ch);
    }, function (fs) {
      return $_97mhrux5jd08mgql.obj(fs).extract(path.concat(['branch: ' + ch]), strength, input);
    });
  };
  var choose = function (key, branches) {
    var extract = function (path, strength, input) {
      var choice = $_96dvjsx6jd08mgqy.readOptFrom(input, key);
      return choice.fold(function () {
        return $_4ftb0gxdjd08mgrl.missingKey(path, key);
      }, function (chosen) {
        return chooseFrom(path, strength, input, branches, chosen);
      });
    };
    var toString = function () {
      return 'chooseOn(' + key + '). Possible values: ' + $_1xoayfx0jd08mgpm.keys(branches);
    };
    var toDsl = function () {
      return $_gdw5qexgjd08mgru.typeAdt.choiceOf(key, branches);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var $_15nisrxijd08mgs2 = { choose: choose };

  var anyValue$1 = $_97mhrux5jd08mgql.value($_2y9mlbx8jd08mgr7.value);
  var arrOfObj$1 = function (objFields) {
    return $_97mhrux5jd08mgql.arrOfObj(objFields);
  };
  var arrOfVal = function () {
    return $_97mhrux5jd08mgql.arr(anyValue$1);
  };
  var arrOf = $_97mhrux5jd08mgql.arr;
  var objOf = $_97mhrux5jd08mgql.obj;
  var objOfOnly = $_97mhrux5jd08mgql.objOnly;
  var setOf$1 = $_97mhrux5jd08mgql.setOf;
  var valueOf = function (validator) {
    return $_97mhrux5jd08mgql.value(validator);
  };
  var extract = function (label, prop, strength, obj) {
    return prop.extract([label], strength, obj).fold(function (errs) {
      return $_2y9mlbx8jd08mgr7.error({
        input: obj,
        errors: errs
      });
    }, $_2y9mlbx8jd08mgr7.value);
  };
  var asStruct = function (label, prop, obj) {
    return extract(label, prop, $_8zkcijwbjd08mgn8.constant, obj);
  };
  var asRaw = function (label, prop, obj) {
    return extract(label, prop, $_8zkcijwbjd08mgn8.identity, obj);
  };
  var getOrDie$1 = function (extraction) {
    return extraction.fold(function (errInfo) {
      throw new Error(formatError(errInfo));
    }, $_8zkcijwbjd08mgn8.identity);
  };
  var asRawOrDie = function (label, prop, obj) {
    return getOrDie$1(asRaw(label, prop, obj));
  };
  var asStructOrDie = function (label, prop, obj) {
    return getOrDie$1(asStruct(label, prop, obj));
  };
  var formatError = function (errInfo) {
    return 'Errors: \n' + $_7w7xvgxejd08mgro.formatErrors(errInfo.errors) + '\n\nInput object: ' + $_7w7xvgxejd08mgro.formatObj(errInfo.input);
  };
  var choose$1 = function (key, branches) {
    return $_15nisrxijd08mgs2.choose(key, branches);
  };
  var $_6eo7r6xhjd08mgrx = {
    anyValue: $_8zkcijwbjd08mgn8.constant(anyValue$1),
    arrOfObj: arrOfObj$1,
    arrOf: arrOf,
    arrOfVal: arrOfVal,
    valueOf: valueOf,
    setOf: setOf$1,
    objOf: objOf,
    objOfOnly: objOfOnly,
    asStruct: asStruct,
    asRaw: asRaw,
    asStructOrDie: asStructOrDie,
    asRawOrDie: asRawOrDie,
    getOrDie: getOrDie$1,
    formatError: formatError,
    choose: choose$1
  };

  var nu$4 = function (parts) {
    if (!$_96dvjsx6jd08mgqy.hasKey(parts, 'can') && !$_96dvjsx6jd08mgqy.hasKey(parts, 'abort') && !$_96dvjsx6jd08mgqy.hasKey(parts, 'run'))
      throw new Error('EventHandler defined by: ' + $_ggze9axfjd08mgrt.stringify(parts, null, 2) + ' does not have can, abort, or run!');
    return $_6eo7r6xhjd08mgrx.asRawOrDie('Extracting event.handler', $_6eo7r6xhjd08mgrx.objOfOnly([
      $_1mrawkx2jd08mgq2.defaulted('can', $_8zkcijwbjd08mgn8.constant(true)),
      $_1mrawkx2jd08mgq2.defaulted('abort', $_8zkcijwbjd08mgn8.constant(false)),
      $_1mrawkx2jd08mgq2.defaulted('run', $_8zkcijwbjd08mgn8.noop)
    ]), parts);
  };
  var all$1 = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_453g14w9jd08mgmy.foldl(handlers, function (acc, handler) {
        return acc && f(handler).apply(undefined, args);
      }, true);
    };
  };
  var any = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_453g14w9jd08mgmy.foldl(handlers, function (acc, handler) {
        return acc || f(handler).apply(undefined, args);
      }, false);
    };
  };
  var read = function (handler) {
    return $_erilttwzjd08mgpl.isFunction(handler) ? {
      can: $_8zkcijwbjd08mgn8.constant(true),
      abort: $_8zkcijwbjd08mgn8.constant(false),
      run: handler
    } : handler;
  };
  var fuse = function (handlers) {
    var can = all$1(handlers, function (handler) {
      return handler.can;
    });
    var abort = any(handlers, function (handler) {
      return handler.abort;
    });
    var run = function () {
      var args = Array.prototype.slice.call(arguments, 0);
      $_453g14w9jd08mgmy.each(handlers, function (handler) {
        handler.run.apply(undefined, args);
      });
    };
    return nu$4({
      can: can,
      abort: abort,
      run: run
    });
  };
  var $_2j304sx1jd08mgpp = {
    read: read,
    fuse: fuse,
    nu: nu$4
  };

  var derive = $_96dvjsx6jd08mgqy.wrapAll;
  var abort = function (name, predicate) {
    return {
      key: name,
      value: $_2j304sx1jd08mgpp.nu({ abort: predicate })
    };
  };
  var can = function (name, predicate) {
    return {
      key: name,
      value: $_2j304sx1jd08mgpp.nu({ can: predicate })
    };
  };
  var preventDefault = function (name) {
    return {
      key: name,
      value: $_2j304sx1jd08mgpp.nu({
        run: function (component, simulatedEvent) {
          simulatedEvent.event().prevent();
        }
      })
    };
  };
  var run = function (name, handler) {
    return {
      key: name,
      value: $_2j304sx1jd08mgpp.nu({ run: handler })
    };
  };
  var runActionExtra = function (name, action, extra) {
    return {
      key: name,
      value: $_2j304sx1jd08mgpp.nu({
        run: function (component) {
          action.apply(undefined, [component].concat(extra));
        }
      })
    };
  };
  var runOnName = function (name) {
    return function (handler) {
      return run(name, handler);
    };
  };
  var runOnSourceName = function (name) {
    return function (handler) {
      return {
        key: name,
        value: $_2j304sx1jd08mgpp.nu({
          run: function (component, simulatedEvent) {
            if ($_5qrlqtw7jd08mgml.isSource(component, simulatedEvent))
              handler(component, simulatedEvent);
          }
        })
      };
    };
  };
  var redirectToUid = function (name, uid) {
    return run(name, function (component, simulatedEvent) {
      component.getSystem().getByUid(uid).each(function (redirectee) {
        $_f6t3w1wvjd08mgp1.dispatchEvent(redirectee, redirectee.element(), name, simulatedEvent);
      });
    });
  };
  var redirectToPart = function (name, detail, partName) {
    var uid = detail.partUids()[partName];
    return redirectToUid(name, uid);
  };
  var runWithTarget = function (name, f) {
    return run(name, function (component, simulatedEvent) {
      component.getSystem().getByDom(simulatedEvent.event().target()).each(function (target) {
        f(component, target, simulatedEvent);
      });
    });
  };
  var cutter = function (name) {
    return run(name, function (component, simulatedEvent) {
      simulatedEvent.cut();
    });
  };
  var stopper = function (name) {
    return run(name, function (component, simulatedEvent) {
      simulatedEvent.stop();
    });
  };
  var $_eexaurw6jd08mgmg = {
    derive: derive,
    run: run,
    preventDefault: preventDefault,
    runActionExtra: runActionExtra,
    runOnAttached: runOnSourceName($_30aqx5wwjd08mgpa.attachedToDom()),
    runOnDetached: runOnSourceName($_30aqx5wwjd08mgpa.detachedFromDom()),
    runOnInit: runOnSourceName($_30aqx5wwjd08mgpa.systemInit()),
    runOnExecute: runOnName($_30aqx5wwjd08mgpa.execute()),
    redirectToUid: redirectToUid,
    redirectToPart: redirectToPart,
    runWithTarget: runWithTarget,
    abort: abort,
    can: can,
    cutter: cutter,
    stopper: stopper
  };

  var markAsBehaviourApi = function (f, apiName, apiFunction) {
    return f;
  };
  var markAsExtraApi = function (f, extraName) {
    return f;
  };
  var markAsSketchApi = function (f, apiFunction) {
    return f;
  };
  var getAnnotation = $_4izgwbwajd08mgn6.none;
  var $_2c9oeoxjjd08mgs6 = {
    markAsBehaviourApi: markAsBehaviourApi,
    markAsExtraApi: markAsExtraApi,
    markAsSketchApi: markAsSketchApi,
    getAnnotation: getAnnotation
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
      $_453g14w9jd08mgmy.each(fields, function (name, i) {
        struct[name] = $_8zkcijwbjd08mgn8.constant(values[i]);
      });
      return struct;
    };
  }

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
    if (!$_erilttwzjd08mgpl.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_453g14w9jd08mgmy.each(array, function (a) {
      if (!$_erilttwzjd08mgpl.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_453g14w9jd08mgmy.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_7rj0q5xpjd08mgst = {
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
    $_7rj0q5xpjd08mgst.validateStrArr('required', required);
    $_7rj0q5xpjd08mgst.validateStrArr('optional', optional);
    $_7rj0q5xpjd08mgst.checkDupes(everything);
    return function (obj) {
      var keys = $_1xoayfx0jd08mgpm.keys(obj);
      var allReqd = $_453g14w9jd08mgmy.forall(required, function (req) {
        return $_453g14w9jd08mgmy.contains(keys, req);
      });
      if (!allReqd)
        $_7rj0q5xpjd08mgst.reqMessage(required, keys);
      var unsupported = $_453g14w9jd08mgmy.filter(keys, function (key) {
        return !$_453g14w9jd08mgmy.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_7rj0q5xpjd08mgst.unsuppMessage(unsupported);
      var r = {};
      $_453g14w9jd08mgmy.each(required, function (req) {
        r[req] = $_8zkcijwbjd08mgn8.constant(obj[req]);
      });
      $_453g14w9jd08mgmy.each(optional, function (opt) {
        r[opt] = $_8zkcijwbjd08mgn8.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? $_4izgwbwajd08mgn6.some(obj[opt]) : $_4izgwbwajd08mgn6.none());
      });
      return r;
    };
  }

  var $_2h5zjyxmjd08mgsp = {
    immutable: Immutable,
    immutableBag: MixedBag
  };

  var nu$5 = $_2h5zjyxmjd08mgsp.immutableBag(['tag'], [
    'classes',
    'attributes',
    'styles',
    'value',
    'innerHtml',
    'domChildren',
    'defChildren'
  ]);
  var defToStr = function (defn) {
    var raw = defToRaw(defn);
    return $_ggze9axfjd08mgrt.stringify(raw, null, 2);
  };
  var defToRaw = function (defn) {
    return {
      tag: defn.tag(),
      classes: defn.classes().getOr([]),
      attributes: defn.attributes().getOr({}),
      styles: defn.styles().getOr({}),
      value: defn.value().getOr('<none>'),
      innerHtml: defn.innerHtml().getOr('<none>'),
      defChildren: defn.defChildren().getOr('<none>'),
      domChildren: defn.domChildren().fold(function () {
        return '<none>';
      }, function (children) {
        return children.length === 0 ? '0 children, but still specified' : String(children.length);
      })
    };
  };
  var $_9ygbf2xljd08mgsm = {
    nu: nu$5,
    defToStr: defToStr,
    defToRaw: defToRaw
  };

  var fields = [
    'classes',
    'attributes',
    'styles',
    'value',
    'innerHtml',
    'defChildren',
    'domChildren'
  ];
  var nu$6 = $_2h5zjyxmjd08mgsp.immutableBag([], fields);
  var derive$1 = function (settings) {
    var r = {};
    var keys = $_1xoayfx0jd08mgpm.keys(settings);
    $_453g14w9jd08mgmy.each(keys, function (key) {
      settings[key].each(function (v) {
        r[key] = v;
      });
    });
    return nu$6(r);
  };
  var modToStr = function (mod) {
    var raw = modToRaw(mod);
    return $_ggze9axfjd08mgrt.stringify(raw, null, 2);
  };
  var modToRaw = function (mod) {
    return {
      classes: mod.classes().getOr('<none>'),
      attributes: mod.attributes().getOr('<none>'),
      styles: mod.styles().getOr('<none>'),
      value: mod.value().getOr('<none>'),
      innerHtml: mod.innerHtml().getOr('<none>'),
      defChildren: mod.defChildren().getOr('<none>'),
      domChildren: mod.domChildren().fold(function () {
        return '<none>';
      }, function (children) {
        return children.length === 0 ? '0 children, but still specified' : String(children.length);
      })
    };
  };
  var clashingOptArrays = function (key, oArr1, oArr2) {
    return oArr1.fold(function () {
      return oArr2.fold(function () {
        return {};
      }, function (arr2) {
        return $_96dvjsx6jd08mgqy.wrap(key, arr2);
      });
    }, function (arr1) {
      return oArr2.fold(function () {
        return $_96dvjsx6jd08mgqy.wrap(key, arr1);
      }, function (arr2) {
        return $_96dvjsx6jd08mgqy.wrap(key, arr2);
      });
    });
  };
  var merge$1 = function (defnA, mod) {
    var raw = $_25kgk5wyjd08mgpk.deepMerge({
      tag: defnA.tag(),
      classes: mod.classes().getOr([]).concat(defnA.classes().getOr([])),
      attributes: $_25kgk5wyjd08mgpk.merge(defnA.attributes().getOr({}), mod.attributes().getOr({})),
      styles: $_25kgk5wyjd08mgpk.merge(defnA.styles().getOr({}), mod.styles().getOr({}))
    }, mod.innerHtml().or(defnA.innerHtml()).map(function (innerHtml) {
      return $_96dvjsx6jd08mgqy.wrap('innerHtml', innerHtml);
    }).getOr({}), clashingOptArrays('domChildren', mod.domChildren(), defnA.domChildren()), clashingOptArrays('defChildren', mod.defChildren(), defnA.defChildren()), mod.value().or(defnA.value()).map(function (value) {
      return $_96dvjsx6jd08mgqy.wrap('value', value);
    }).getOr({}));
    return $_9ygbf2xljd08mgsm.nu(raw);
  };
  var $_bzfvkmxkjd08mgsc = {
    nu: nu$6,
    derive: derive$1,
    merge: merge$1,
    modToStr: modToStr,
    modToRaw: modToRaw
  };

  var executeEvent = function (bConfig, bState, executor) {
    return $_eexaurw6jd08mgmg.runOnExecute(function (component) {
      executor(component, bConfig, bState);
    });
  };
  var loadEvent = function (bConfig, bState, f) {
    return $_eexaurw6jd08mgmg.runOnInit(function (component, simulatedEvent) {
      f(component, bConfig, bState);
    });
  };
  var create = function (schema, name, active, apis, extra, state) {
    var configSchema = $_6eo7r6xhjd08mgrx.objOfOnly(schema);
    var schemaSchema = $_1mrawkx2jd08mgq2.optionObjOf(name, [$_1mrawkx2jd08mgq2.optionObjOfOnly('config', schema)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var createModes = function (modes, name, active, apis, extra, state) {
    var configSchema = modes;
    var schemaSchema = $_1mrawkx2jd08mgq2.optionObjOf(name, [$_1mrawkx2jd08mgq2.optionOf('config', modes)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var wrapApi = function (bName, apiFunction, apiName) {
    var f = function (component) {
      var args = arguments;
      return component.config({ name: $_8zkcijwbjd08mgn8.constant(bName) }).fold(function () {
        throw new Error('We could not find any behaviour configuration for: ' + bName + '. Using API: ' + apiName);
      }, function (info) {
        var rest = Array.prototype.slice.call(args, 1);
        return apiFunction.apply(undefined, [
          component,
          info.config,
          info.state
        ].concat(rest));
      });
    };
    return $_2c9oeoxjjd08mgs6.markAsBehaviourApi(f, apiName, apiFunction);
  };
  var revokeBehaviour = function (name) {
    return {
      key: name,
      value: undefined
    };
  };
  var doCreate = function (configSchema, schemaSchema, name, active, apis, extra, state) {
    var getConfig = function (info) {
      return $_96dvjsx6jd08mgqy.hasKey(info, name) ? info[name]() : $_4izgwbwajd08mgn6.none();
    };
    var wrappedApis = $_1xoayfx0jd08mgpm.map(apis, function (apiF, apiName) {
      return wrapApi(name, apiF, apiName);
    });
    var wrappedExtra = $_1xoayfx0jd08mgpm.map(extra, function (extraF, extraName) {
      return $_2c9oeoxjjd08mgs6.markAsExtraApi(extraF, extraName);
    });
    var me = $_25kgk5wyjd08mgpk.deepMerge(wrappedExtra, wrappedApis, {
      revoke: $_8zkcijwbjd08mgn8.curry(revokeBehaviour, name),
      config: function (spec) {
        var prepared = $_6eo7r6xhjd08mgrx.asStructOrDie(name + '-config', configSchema, spec);
        return {
          key: name,
          value: {
            config: prepared,
            me: me,
            configAsRaw: $_2crir4whjd08mgni.cached(function () {
              return $_6eo7r6xhjd08mgrx.asRawOrDie(name + '-config', configSchema, spec);
            }),
            initialConfig: spec,
            state: state
          }
        };
      },
      schema: function () {
        return schemaSchema;
      },
      exhibit: function (info, base) {
        return getConfig(info).bind(function (behaviourInfo) {
          return $_96dvjsx6jd08mgqy.readOptFrom(active, 'exhibit').map(function (exhibitor) {
            return exhibitor(base, behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr($_bzfvkmxkjd08mgsc.nu({}));
      },
      name: function () {
        return name;
      },
      handlers: function (info) {
        return getConfig(info).bind(function (behaviourInfo) {
          return $_96dvjsx6jd08mgqy.readOptFrom(active, 'events').map(function (events) {
            return events(behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr({});
      }
    });
    return me;
  };
  var $_gnbzfw5jd08mglx = {
    executeEvent: executeEvent,
    loadEvent: loadEvent,
    create: create,
    createModes: createModes
  };

  var base = function (handleUnsupported, required) {
    return baseWith(handleUnsupported, required, {
      validate: $_erilttwzjd08mgpl.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_7rj0q5xpjd08mgst.validateStrArr('required', required);
    $_7rj0q5xpjd08mgst.checkDupes(required);
    return function (obj) {
      var keys = $_1xoayfx0jd08mgpm.keys(obj);
      var allReqd = $_453g14w9jd08mgmy.forall(required, function (req) {
        return $_453g14w9jd08mgmy.contains(keys, req);
      });
      if (!allReqd)
        $_7rj0q5xpjd08mgst.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_453g14w9jd08mgmy.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_7rj0q5xpjd08mgst.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_453g14w9jd08mgmy.filter(keys, function (key) {
      return !$_453g14w9jd08mgmy.contains(required, key);
    });
    if (unsupported.length > 0)
      $_7rj0q5xpjd08mgst.unsuppMessage(unsupported);
  };
  var allowExtra = $_8zkcijwbjd08mgn8.noop;
  var $_asxw7nxsjd08mgt0 = {
    exactly: $_8zkcijwbjd08mgn8.curry(base, handleExact),
    ensure: $_8zkcijwbjd08mgn8.curry(base, allowExtra),
    ensureWith: $_8zkcijwbjd08mgn8.curry(baseWith, allowExtra)
  };

  var BehaviourState = $_asxw7nxsjd08mgt0.ensure(['readState']);

  var init = function () {
    return BehaviourState({
      readState: function () {
        return 'No State required';
      }
    });
  };
  var $_ginglqxqjd08mgsw = { init: init };

  var derive$2 = function (capabilities) {
    return $_96dvjsx6jd08mgqy.wrapAll(capabilities);
  };
  var simpleSchema = $_6eo7r6xhjd08mgrx.objOfOnly([
    $_1mrawkx2jd08mgq2.strict('fields'),
    $_1mrawkx2jd08mgq2.strict('name'),
    $_1mrawkx2jd08mgq2.defaulted('active', {}),
    $_1mrawkx2jd08mgq2.defaulted('apis', {}),
    $_1mrawkx2jd08mgq2.defaulted('extra', {}),
    $_1mrawkx2jd08mgq2.defaulted('state', $_ginglqxqjd08mgsw)
  ]);
  var create$1 = function (data) {
    var value = $_6eo7r6xhjd08mgrx.asRawOrDie('Creating behaviour: ' + data.name, simpleSchema, data);
    return $_gnbzfw5jd08mglx.create(value.fields, value.name, value.active, value.apis, value.extra, value.state);
  };
  var modeSchema = $_6eo7r6xhjd08mgrx.objOfOnly([
    $_1mrawkx2jd08mgq2.strict('branchKey'),
    $_1mrawkx2jd08mgq2.strict('branches'),
    $_1mrawkx2jd08mgq2.strict('name'),
    $_1mrawkx2jd08mgq2.defaulted('active', {}),
    $_1mrawkx2jd08mgq2.defaulted('apis', {}),
    $_1mrawkx2jd08mgq2.defaulted('extra', {}),
    $_1mrawkx2jd08mgq2.defaulted('state', $_ginglqxqjd08mgsw)
  ]);
  var createModes$1 = function (data) {
    var value = $_6eo7r6xhjd08mgrx.asRawOrDie('Creating behaviour: ' + data.name, modeSchema, data);
    return $_gnbzfw5jd08mglx.createModes($_6eo7r6xhjd08mgrx.choose(value.branchKey, value.branches), value.name, value.active, value.apis, value.extra, value.state);
  };
  var $_voa9kw4jd08mglm = {
    derive: derive$2,
    revoke: $_8zkcijwbjd08mgn8.constant(undefined),
    noActive: $_8zkcijwbjd08mgn8.constant({}),
    noApis: $_8zkcijwbjd08mgn8.constant({}),
    noExtra: $_8zkcijwbjd08mgn8.constant({}),
    noState: $_8zkcijwbjd08mgn8.constant($_ginglqxqjd08mgsw),
    create: create$1,
    createModes: createModes$1
  };

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

  var name = function (element) {
    var r = element.dom().nodeName;
    return r.toLowerCase();
  };
  var type = function (element) {
    return element.dom().nodeType;
  };
  var value$2 = function (element) {
    return element.dom().nodeValue;
  };
  var isType$1 = function (t) {
    return function (element) {
      return type(element) === t;
    };
  };
  var isComment = function (element) {
    return type(element) === $_dnrobswujd08mgp0.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_dnrobswujd08mgp0.ELEMENT);
  var isText = isType$1($_dnrobswujd08mgp0.TEXT);
  var isDocument = isType$1($_dnrobswujd08mgp0.DOCUMENT);
  var $_9323z1xxjd08mgti = {
    name: name,
    type: type,
    value: value$2,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var rawSet = function (dom, key, value) {
    if ($_erilttwzjd08mgpl.isString(value) || $_erilttwzjd08mgpl.isBoolean(value) || $_erilttwzjd08mgpl.isNumber(value)) {
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
    $_1xoayfx0jd08mgpm.each(attrs, function (v, k) {
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
    return $_453g14w9jd08mgmy.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has(source, attr) && !has(destination, attr))
      set(destination, attr, get(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_9323z1xxjd08mgti.isElement(source) || !$_9323z1xxjd08mgti.isElement(destination))
      return;
    $_453g14w9jd08mgmy.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_auw0hixwjd08mgt8 = {
    clone: clone,
    set: set,
    setAll: setAll,
    get: get,
    has: has,
    remove: remove,
    hasNone: hasNone,
    transfer: transfer
  };

  var read$1 = function (element, attr) {
    var value = $_auw0hixwjd08mgt8.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add = function (element, attr, id) {
    var old = read$1(element, attr);
    var nu = old.concat([id]);
    $_auw0hixwjd08mgt8.set(element, attr, nu.join(' '));
  };
  var remove$1 = function (element, attr, id) {
    var nu = $_453g14w9jd08mgmy.filter(read$1(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_auw0hixwjd08mgt8.set(element, attr, nu.join(' '));
    else
      $_auw0hixwjd08mgt8.remove(element, attr);
  };
  var $_8pboq6xzjd08mgtm = {
    read: read$1,
    add: add,
    remove: remove$1
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$1 = function (element) {
    return $_8pboq6xzjd08mgtm.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_8pboq6xzjd08mgtm.add(element, 'class', clazz);
  };
  var remove$2 = function (element, clazz) {
    return $_8pboq6xzjd08mgtm.remove(element, 'class', clazz);
  };
  var toggle = function (element, clazz) {
    if ($_453g14w9jd08mgmy.contains(get$1(element), clazz)) {
      remove$2(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_7mj7wlxyjd08mgtk = {
    get: get$1,
    add: add$1,
    remove: remove$2,
    toggle: toggle,
    supports: supports
  };

  var add$2 = function (element, clazz) {
    if ($_7mj7wlxyjd08mgtk.supports(element))
      element.dom().classList.add(clazz);
    else
      $_7mj7wlxyjd08mgtk.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_7mj7wlxyjd08mgtk.supports(element) ? element.dom().classList : $_7mj7wlxyjd08mgtk.get(element);
    if (classList.length === 0) {
      $_auw0hixwjd08mgt8.remove(element, 'class');
    }
  };
  var remove$3 = function (element, clazz) {
    if ($_7mj7wlxyjd08mgtk.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_7mj7wlxyjd08mgtk.remove(element, clazz);
    cleanClass(element);
  };
  var toggle$1 = function (element, clazz) {
    return $_7mj7wlxyjd08mgtk.supports(element) ? element.dom().classList.toggle(clazz) : $_7mj7wlxyjd08mgtk.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_7mj7wlxyjd08mgtk.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_7mj7wlxyjd08mgtk.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_7mj7wlxyjd08mgtk.add(element, clazz);
    };
    return Toggler(off, on, has$1(element, clazz));
  };
  var has$1 = function (element, clazz) {
    return $_7mj7wlxyjd08mgtk.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_5tvqrbxujd08mgt5 = {
    add: add$2,
    remove: remove$3,
    toggle: toggle$1,
    toggler: toggler,
    has: has$1
  };

  var swap = function (element, addCls, removeCls) {
    $_5tvqrbxujd08mgt5.remove(element, removeCls);
    $_5tvqrbxujd08mgt5.add(element, addCls);
  };
  var toAlpha = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.alpha(), swapConfig.omega());
  };
  var toOmega = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.omega(), swapConfig.alpha());
  };
  var clear = function (component, swapConfig, swapState) {
    $_5tvqrbxujd08mgt5.remove(component.element(), swapConfig.alpha());
    $_5tvqrbxujd08mgt5.remove(component.element(), swapConfig.omega());
  };
  var isAlpha = function (component, swapConfig, swapState) {
    return $_5tvqrbxujd08mgt5.has(component.element(), swapConfig.alpha());
  };
  var isOmega = function (component, swapConfig, swapState) {
    return $_5tvqrbxujd08mgt5.has(component.element(), swapConfig.omega());
  };
  var $_9b6e5dxtjd08mgt2 = {
    toAlpha: toAlpha,
    toOmega: toOmega,
    isAlpha: isAlpha,
    isOmega: isOmega,
    clear: clear
  };

  var SwapSchema = [
    $_1mrawkx2jd08mgq2.strict('alpha'),
    $_1mrawkx2jd08mgq2.strict('omega')
  ];

  var Swapping = $_voa9kw4jd08mglm.create({
    fields: SwapSchema,
    name: 'swapping',
    apis: $_9b6e5dxtjd08mgt2
  });

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
  var $_359sszy4jd08mguf = { toArray: toArray };

  var owner = function (element) {
    return $_3visdkwtjd08mgor.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_3visdkwtjd08mgor.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_3visdkwtjd08mgor.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return $_4izgwbwajd08mgn6.from(dom.parentNode).map($_3visdkwtjd08mgor.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_453g14w9jd08mgmy.findIndex(kin, function (elem) {
        return $_ctdo1gw8jd08mgmp.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_erilttwzjd08mgpl.isFunction(isRoot) ? isRoot : $_8zkcijwbjd08mgn8.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_3visdkwtjd08mgor.fromDom(rawParent);
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
      return $_453g14w9jd08mgmy.filter(elements, function (x) {
        return !$_ctdo1gw8jd08mgmp.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return $_4izgwbwajd08mgn6.from(dom.offsetParent).map($_3visdkwtjd08mgor.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return $_4izgwbwajd08mgn6.from(dom.previousSibling).map($_3visdkwtjd08mgor.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return $_4izgwbwajd08mgn6.from(dom.nextSibling).map($_3visdkwtjd08mgor.fromDom);
  };
  var prevSiblings = function (element) {
    return $_453g14w9jd08mgmy.reverse($_359sszy4jd08mguf.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_359sszy4jd08mguf.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_453g14w9jd08mgmy.map(dom.childNodes, $_3visdkwtjd08mgor.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return $_4izgwbwajd08mgn6.from(children[index]).map($_3visdkwtjd08mgor.fromDom);
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
  var spot = $_2h5zjyxmjd08mgsp.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_4uhv6ey3jd08mgu3 = {
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

  var before = function (marker, element) {
    var parent = $_4uhv6ey3jd08mgu3.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_4uhv6ey3jd08mgu3.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_4uhv6ey3jd08mgu3.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_4uhv6ey3jd08mgu3.firstChild(parent);
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
    $_4uhv6ey3jd08mgu3.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap$2 = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_u7ngdy2jd08mgu1 = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap$2
  };

  var before$1 = function (marker, elements) {
    $_453g14w9jd08mgmy.each(elements, function (x) {
      $_u7ngdy2jd08mgu1.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_453g14w9jd08mgmy.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_u7ngdy2jd08mgu1.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_453g14w9jd08mgmy.each(elements.slice().reverse(), function (x) {
      $_u7ngdy2jd08mgu1.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_453g14w9jd08mgmy.each(elements, function (x) {
      $_u7ngdy2jd08mgu1.append(parent, x);
    });
  };
  var $_47o1kzy6jd08mguk = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_453g14w9jd08mgmy.each($_4uhv6ey3jd08mgu3.children(element), function (rogue) {
      remove$4(rogue);
    });
  };
  var remove$4 = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_4uhv6ey3jd08mgu3.children(wrapper);
    if (children.length > 0)
      $_47o1kzy6jd08mguk.before(wrapper, children);
    remove$4(wrapper);
  };
  var $_7x8x1ny5jd08mguh = {
    empty: empty,
    remove: remove$4,
    unwrap: unwrap
  };

  var inBody = function (element) {
    var dom = $_9323z1xxjd08mgti.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_2crir4whjd08mgni.cached(function () {
    return getBody($_3visdkwtjd08mgor.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_3visdkwtjd08mgor.fromDom(body);
  };
  var $_9fqzedy7jd08mgun = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var fireDetaching = function (component) {
    $_f6t3w1wvjd08mgp1.emit(component, $_30aqx5wwjd08mgpa.detachedFromDom());
    var children = component.components();
    $_453g14w9jd08mgmy.each(children, fireDetaching);
  };
  var fireAttaching = function (component) {
    var children = component.components();
    $_453g14w9jd08mgmy.each(children, fireAttaching);
    $_f6t3w1wvjd08mgp1.emit(component, $_30aqx5wwjd08mgpa.attachedToDom());
  };
  var attach = function (parent, child) {
    attachWith(parent, child, $_u7ngdy2jd08mgu1.append);
  };
  var attachWith = function (parent, child, insertion) {
    parent.getSystem().addToWorld(child);
    insertion(parent.element(), child.element());
    if ($_9fqzedy7jd08mgun.inBody(parent.element()))
      fireAttaching(child);
    parent.syncComponents();
  };
  var doDetach = function (component) {
    fireDetaching(component);
    $_7x8x1ny5jd08mguh.remove(component.element());
    component.getSystem().removeFromWorld(component);
  };
  var detach = function (component) {
    var parent = $_4uhv6ey3jd08mgu3.parent(component.element()).bind(function (p) {
      return component.getSystem().getByDom(p).fold($_4izgwbwajd08mgn6.none, $_4izgwbwajd08mgn6.some);
    });
    doDetach(component);
    parent.each(function (p) {
      p.syncComponents();
    });
  };
  var detachChildren = function (component) {
    var subs = component.components();
    $_453g14w9jd08mgmy.each(subs, doDetach);
    $_7x8x1ny5jd08mguh.empty(component.element());
    component.syncComponents();
  };
  var attachSystem = function (element, guiSystem) {
    $_u7ngdy2jd08mgu1.append(element, guiSystem.element());
    var children = $_4uhv6ey3jd08mgu3.children(guiSystem.element());
    $_453g14w9jd08mgmy.each(children, function (child) {
      guiSystem.getByDom(child).each(fireAttaching);
    });
  };
  var detachSystem = function (guiSystem) {
    var children = $_4uhv6ey3jd08mgu3.children(guiSystem.element());
    $_453g14w9jd08mgmy.each(children, function (child) {
      guiSystem.getByDom(child).each(fireDetaching);
    });
    $_7x8x1ny5jd08mguh.remove(guiSystem.element());
  };
  var $_9ab6qsy1jd08mgtr = {
    attach: attach,
    attachWith: attachWith,
    detach: detach,
    detachChildren: detachChildren,
    attachSystem: attachSystem,
    detachSystem: detachSystem
  };

  var fromHtml$1 = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    return $_4uhv6ey3jd08mgu3.children($_3visdkwtjd08mgor.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_453g14w9jd08mgmy.map(tags, function (x) {
      return $_3visdkwtjd08mgor.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_453g14w9jd08mgmy.map(texts, function (x) {
      return $_3visdkwtjd08mgor.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_453g14w9jd08mgmy.map(nodes, $_3visdkwtjd08mgor.fromDom);
  };
  var $_qpncycjd08mgv5 = {
    fromHtml: fromHtml$1,
    fromTags: fromTags,
    fromText: fromText$1,
    fromDom: fromDom$1
  };

  var get$2 = function (element) {
    return element.dom().innerHTML;
  };
  var set$1 = function (element, content) {
    var owner = $_4uhv6ey3jd08mgu3.owner(element);
    var docDom = owner.dom();
    var fragment = $_3visdkwtjd08mgor.fromDom(docDom.createDocumentFragment());
    var contentElements = $_qpncycjd08mgv5.fromHtml(content, docDom);
    $_47o1kzy6jd08mguk.append(fragment, contentElements);
    $_7x8x1ny5jd08mguh.empty(element);
    $_u7ngdy2jd08mgu1.append(element, fragment);
  };
  var getOuter = function (element) {
    var container = $_3visdkwtjd08mgor.fromTag('div');
    var clone = $_3visdkwtjd08mgor.fromDom(element.dom().cloneNode(true));
    $_u7ngdy2jd08mgu1.append(container, clone);
    return get$2(container);
  };
  var $_c574qmybjd08mgv4 = {
    get: get$2,
    set: set$1,
    getOuter: getOuter
  };

  var clone$1 = function (original, deep) {
    return $_3visdkwtjd08mgor.fromDom(original.dom().cloneNode(deep));
  };
  var shallow$1 = function (original) {
    return clone$1(original, false);
  };
  var deep$1 = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_3visdkwtjd08mgor.fromTag(tag);
    var attributes = $_auw0hixwjd08mgt8.clone(original);
    $_auw0hixwjd08mgt8.setAll(nu, attributes);
    return nu;
  };
  var copy = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_4uhv6ey3jd08mgu3.children(deep$1(original));
    $_47o1kzy6jd08mguk.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_u7ngdy2jd08mgu1.before(original, nu);
    var children = $_4uhv6ey3jd08mgu3.children(original);
    $_47o1kzy6jd08mguk.append(nu, children);
    $_7x8x1ny5jd08mguh.remove(original);
    return nu;
  };
  var $_8wzteaydjd08mgv8 = {
    shallow: shallow$1,
    shallowAs: shallowAs,
    deep: deep$1,
    copy: copy,
    mutate: mutate
  };

  var getHtml = function (element) {
    var clone = $_8wzteaydjd08mgv8.shallow(element);
    return $_c574qmybjd08mgv4.getOuter(clone);
  };
  var $_962vx7yajd08mgv0 = { getHtml: getHtml };

  var element = function (elem) {
    return $_962vx7yajd08mgv0.getHtml(elem);
  };
  var $_c4961ry9jd08mguz = { element: element };

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
    return $_4izgwbwajd08mgn6.none();
  };
  var liftN = function (arr, f) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      if (x.isSome()) {
        r.push(x.getOrDie());
      } else {
        return $_4izgwbwajd08mgn6.none();
      }
    }
    return $_4izgwbwajd08mgn6.some(f.apply(null, r));
  };
  var $_cqt7vbyejd08mgva = {
    cat: cat,
    findMap: findMap,
    liftN: liftN
  };

  var unknown$3 = 'unknown';
  var debugging = true;
  var CHROME_INSPECTOR_GLOBAL = '__CHROME_INSPECTOR_CONNECTION_TO_ALLOY__';
  var eventsMonitored = [];
  var path$1 = [
    'alloy/data/Fields',
    'alloy/debugging/Debugging'
  ];
  var getTrace = function () {
    if (debugging === false)
      return unknown$3;
    var err = new Error();
    if (err.stack !== undefined) {
      var lines = err.stack.split('\n');
      return $_453g14w9jd08mgmy.find(lines, function (line) {
        return line.indexOf('alloy') > 0 && !$_453g14w9jd08mgmy.exists(path$1, function (p) {
          return line.indexOf(p) > -1;
        });
      }).getOr(unknown$3);
    } else {
      return unknown$3;
    }
  };
  var logHandler = function (label, handlerName, trace) {
  };
  var ignoreEvent = {
    logEventCut: $_8zkcijwbjd08mgn8.noop,
    logEventStopped: $_8zkcijwbjd08mgn8.noop,
    logNoParent: $_8zkcijwbjd08mgn8.noop,
    logEventNoHandlers: $_8zkcijwbjd08mgn8.noop,
    logEventResponse: $_8zkcijwbjd08mgn8.noop,
    write: $_8zkcijwbjd08mgn8.noop
  };
  var monitorEvent = function (eventName, initialTarget, f) {
    var logger = debugging && (eventsMonitored === '*' || $_453g14w9jd08mgmy.contains(eventsMonitored, eventName)) ? function () {
      var sequence = [];
      return {
        logEventCut: function (name, target, purpose) {
          sequence.push({
            outcome: 'cut',
            target: target,
            purpose: purpose
          });
        },
        logEventStopped: function (name, target, purpose) {
          sequence.push({
            outcome: 'stopped',
            target: target,
            purpose: purpose
          });
        },
        logNoParent: function (name, target, purpose) {
          sequence.push({
            outcome: 'no-parent',
            target: target,
            purpose: purpose
          });
        },
        logEventNoHandlers: function (name, target) {
          sequence.push({
            outcome: 'no-handlers-left',
            target: target
          });
        },
        logEventResponse: function (name, target, purpose) {
          sequence.push({
            outcome: 'response',
            purpose: purpose,
            target: target
          });
        },
        write: function () {
          if ($_453g14w9jd08mgmy.contains([
              'mousemove',
              'mouseover',
              'mouseout',
              $_30aqx5wwjd08mgpa.systemInit()
            ], eventName))
            return;
          console.log(eventName, {
            event: eventName,
            target: initialTarget.dom(),
            sequence: $_453g14w9jd08mgmy.map(sequence, function (s) {
              if (!$_453g14w9jd08mgmy.contains([
                  'cut',
                  'stopped',
                  'response'
                ], s.outcome))
                return s.outcome;
              else
                return '{' + s.purpose + '} ' + s.outcome + ' at (' + $_c4961ry9jd08mguz.element(s.target) + ')';
            })
          });
        }
      };
    }() : ignoreEvent;
    var output = f(logger);
    logger.write();
    return output;
  };
  var inspectorInfo = function (comp) {
    var go = function (c) {
      var cSpec = c.spec();
      return {
        '(original.spec)': cSpec,
        '(dom.ref)': c.element().dom(),
        '(element)': $_c4961ry9jd08mguz.element(c.element()),
        '(initComponents)': $_453g14w9jd08mgmy.map(cSpec.components !== undefined ? cSpec.components : [], go),
        '(components)': $_453g14w9jd08mgmy.map(c.components(), go),
        '(bound.events)': $_1xoayfx0jd08mgpm.mapToArray(c.events(), function (v, k) {
          return [k];
        }).join(', '),
        '(behaviours)': cSpec.behaviours !== undefined ? $_1xoayfx0jd08mgpm.map(cSpec.behaviours, function (v, k) {
          return v === undefined ? '--revoked--' : {
            config: v.configAsRaw(),
            'original-config': v.initialConfig,
            state: c.readState(k)
          };
        }) : 'none'
      };
    };
    return go(comp);
  };
  var getOrInitConnection = function () {
    if (window[CHROME_INSPECTOR_GLOBAL] !== undefined)
      return window[CHROME_INSPECTOR_GLOBAL];
    else {
      window[CHROME_INSPECTOR_GLOBAL] = {
        systems: {},
        lookup: function (uid) {
          var systems = window[CHROME_INSPECTOR_GLOBAL].systems;
          var connections = $_1xoayfx0jd08mgpm.keys(systems);
          return $_cqt7vbyejd08mgva.findMap(connections, function (conn) {
            var connGui = systems[conn];
            return connGui.getByUid(uid).toOption().map(function (comp) {
              return $_96dvjsx6jd08mgqy.wrap($_c4961ry9jd08mguz.element(comp.element()), inspectorInfo(comp));
            });
          });
        }
      };
      return window[CHROME_INSPECTOR_GLOBAL];
    }
  };
  var registerInspector = function (name, gui) {
    var connection = getOrInitConnection();
    connection.systems[name] = gui;
  };
  var $_1x8vhay8jd08mguq = {
    logHandler: logHandler,
    noLogger: $_8zkcijwbjd08mgn8.constant(ignoreEvent),
    getTrace: getTrace,
    monitorEvent: monitorEvent,
    isDebugging: $_8zkcijwbjd08mgn8.constant(debugging),
    registerInspector: registerInspector
  };

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

  function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
    return is(scope, a) ? $_4izgwbwajd08mgn6.some(scope) : $_erilttwzjd08mgpl.isFunction(isRoot) && isRoot(scope) ? $_4izgwbwajd08mgn6.none() : ancestor(scope, a, isRoot);
  }

  var first$1 = function (predicate) {
    return descendant($_9fqzedy7jd08mgun.body(), predicate);
  };
  var ancestor = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_erilttwzjd08mgpl.isFunction(isRoot) ? isRoot : $_8zkcijwbjd08mgn8.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_3visdkwtjd08mgor.fromDom(element);
      if (predicate(el))
        return $_4izgwbwajd08mgn6.some(el);
      else if (stop(el))
        break;
    }
    return $_4izgwbwajd08mgn6.none();
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
      return $_4izgwbwajd08mgn6.none();
    return child$1($_3visdkwtjd08mgor.fromDom(element.parentNode), function (x) {
      return !$_ctdo1gw8jd08mgmp.eq(scope, x) && predicate(x);
    });
  };
  var child$1 = function (scope, predicate) {
    var result = $_453g14w9jd08mgmy.find(scope.dom().childNodes, $_8zkcijwbjd08mgn8.compose(predicate, $_3visdkwtjd08mgor.fromDom));
    return result.map($_3visdkwtjd08mgor.fromDom);
  };
  var descendant = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_3visdkwtjd08mgor.fromDom(element.childNodes[i])))
          return $_4izgwbwajd08mgn6.some($_3visdkwtjd08mgor.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return $_4izgwbwajd08mgn6.none();
    };
    return descend(scope.dom());
  };
  var $_cmjc72yijd08mgvh = {
    first: first$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };

  var any$1 = function (predicate) {
    return $_cmjc72yijd08mgvh.first(predicate).isSome();
  };
  var ancestor$1 = function (scope, predicate, isRoot) {
    return $_cmjc72yijd08mgvh.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest$1 = function (scope, predicate, isRoot) {
    return $_cmjc72yijd08mgvh.closest(scope, predicate, isRoot).isSome();
  };
  var sibling$1 = function (scope, predicate) {
    return $_cmjc72yijd08mgvh.sibling(scope, predicate).isSome();
  };
  var child$2 = function (scope, predicate) {
    return $_cmjc72yijd08mgvh.child(scope, predicate).isSome();
  };
  var descendant$1 = function (scope, predicate) {
    return $_cmjc72yijd08mgvh.descendant(scope, predicate).isSome();
  };
  var $_6wx5dfyhjd08mgvg = {
    any: any$1,
    ancestor: ancestor$1,
    closest: closest$1,
    sibling: sibling$1,
    child: child$2,
    descendant: descendant$1
  };

  var focus = function (element) {
    element.dom().focus();
  };
  var blur = function (element) {
    element.dom().blur();
  };
  var hasFocus = function (element) {
    var doc = $_4uhv6ey3jd08mgu3.owner(element).dom();
    return element.dom() === doc.activeElement;
  };
  var active = function (_doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    return $_4izgwbwajd08mgn6.from(doc.activeElement).map($_3visdkwtjd08mgor.fromDom);
  };
  var focusInside = function (element) {
    var doc = $_4uhv6ey3jd08mgu3.owner(element);
    var inside = active(doc).filter(function (a) {
      return $_6wx5dfyhjd08mgvg.closest(a, $_8zkcijwbjd08mgn8.curry($_ctdo1gw8jd08mgmp.eq, element));
    });
    inside.fold(function () {
      focus(element);
    }, $_8zkcijwbjd08mgn8.noop);
  };
  var search = function (element) {
    return active($_4uhv6ey3jd08mgu3.owner(element)).filter(function (e) {
      return element.dom().contains(e.dom());
    });
  };
  var $_6h5kwkygjd08mgvc = {
    hasFocus: hasFocus,
    focus: focus,
    blur: blur,
    active: active,
    search: search,
    focusInside: focusInside
  };

  var ThemeManager = tinymce.util.Tools.resolve('tinymce.ThemeManager');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var openLink = function (target) {
    var link = document.createElement('a');
    link.target = '_blank';
    link.href = target.href;
    link.rel = 'noreferrer noopener';
    var nuEvt = document.createEvent('MouseEvents');
    nuEvt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    document.body.appendChild(link);
    link.dispatchEvent(nuEvt);
    document.body.removeChild(link);
  };
  var $_mihqmymjd08mgvs = { openLink: openLink };

  var isSkinDisabled = function (editor) {
    return editor.settings.skin === false;
  };
  var $_3ie2n9ynjd08mgvt = { isSkinDisabled: isSkinDisabled };

  var formatChanged = 'formatChanged';
  var orientationChanged = 'orientationChanged';
  var dropupDismissed = 'dropupDismissed';
  var $_ceaddvyojd08mgvu = {
    formatChanged: $_8zkcijwbjd08mgn8.constant(formatChanged),
    orientationChanged: $_8zkcijwbjd08mgn8.constant(orientationChanged),
    dropupDismissed: $_8zkcijwbjd08mgn8.constant(dropupDismissed)
  };

  var chooseChannels = function (channels, message) {
    return message.universal() ? channels : $_453g14w9jd08mgmy.filter(channels, function (ch) {
      return $_453g14w9jd08mgmy.contains(message.channels(), ch);
    });
  };
  var events = function (receiveConfig) {
    return $_eexaurw6jd08mgmg.derive([$_eexaurw6jd08mgmg.run($_30aqx5wwjd08mgpa.receive(), function (component, message) {
        var channelMap = receiveConfig.channels();
        var channels = $_1xoayfx0jd08mgpm.keys(channelMap);
        var targetChannels = chooseChannels(channels, message);
        $_453g14w9jd08mgmy.each(targetChannels, function (ch) {
          var channelInfo = channelMap[ch]();
          var channelSchema = channelInfo.schema();
          var data = $_6eo7r6xhjd08mgrx.asStructOrDie('channel[' + ch + '] data\nReceiver: ' + $_c4961ry9jd08mguz.element(component.element()), channelSchema, message.data());
          channelInfo.onReceive()(component, data);
        });
      })]);
  };
  var $_7jovnuyrjd08mgwb = { events: events };

  var menuFields = [
    $_1mrawkx2jd08mgq2.strict('menu'),
    $_1mrawkx2jd08mgq2.strict('selectedMenu')
  ];
  var itemFields = [
    $_1mrawkx2jd08mgq2.strict('item'),
    $_1mrawkx2jd08mgq2.strict('selectedItem')
  ];
  var schema = $_6eo7r6xhjd08mgrx.objOfOnly(itemFields.concat(menuFields));
  var itemSchema = $_6eo7r6xhjd08mgrx.objOfOnly(itemFields);
  var $_bf7882yujd08mgx0 = {
    menuFields: $_8zkcijwbjd08mgn8.constant(menuFields),
    itemFields: $_8zkcijwbjd08mgn8.constant(itemFields),
    schema: $_8zkcijwbjd08mgn8.constant(schema),
    itemSchema: $_8zkcijwbjd08mgn8.constant(itemSchema)
  };

  var initSize = $_1mrawkx2jd08mgq2.strictObjOf('initSize', [
    $_1mrawkx2jd08mgq2.strict('numColumns'),
    $_1mrawkx2jd08mgq2.strict('numRows')
  ]);
  var itemMarkers = function () {
    return $_1mrawkx2jd08mgq2.strictOf('markers', $_bf7882yujd08mgx0.itemSchema());
  };
  var menuMarkers = function () {
    return $_1mrawkx2jd08mgq2.strictOf('markers', $_bf7882yujd08mgx0.schema());
  };
  var tieredMenuMarkers = function () {
    return $_1mrawkx2jd08mgq2.strictObjOf('markers', [$_1mrawkx2jd08mgq2.strict('backgroundMenu')].concat($_bf7882yujd08mgx0.menuFields()).concat($_bf7882yujd08mgx0.itemFields()));
  };
  var markers = function (required) {
    return $_1mrawkx2jd08mgq2.strictObjOf('markers', $_453g14w9jd08mgmy.map(required, $_1mrawkx2jd08mgq2.strict));
  };
  var onPresenceHandler = function (label, fieldName, presence) {
    var trace = $_1x8vhay8jd08mguq.getTrace();
    return $_1mrawkx2jd08mgq2.field(fieldName, fieldName, presence, $_6eo7r6xhjd08mgrx.valueOf(function (f) {
      return $_2y9mlbx8jd08mgr7.value(function () {
        $_1x8vhay8jd08mguq.logHandler(label, fieldName, trace);
        return f.apply(undefined, arguments);
      });
    }));
  };
  var onHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_dlh1w7x3jd08mgq8.defaulted($_8zkcijwbjd08mgn8.noop));
  };
  var onKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_dlh1w7x3jd08mgq8.defaulted($_4izgwbwajd08mgn6.none));
  };
  var onStrictHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_dlh1w7x3jd08mgq8.strict());
  };
  var onStrictKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_dlh1w7x3jd08mgq8.strict());
  };
  var output$1 = function (name, value) {
    return $_1mrawkx2jd08mgq2.state(name, $_8zkcijwbjd08mgn8.constant(value));
  };
  var snapshot$1 = function (name) {
    return $_1mrawkx2jd08mgq2.state(name, $_8zkcijwbjd08mgn8.identity);
  };
  var $_6uz7ybytjd08mgwm = {
    initSize: $_8zkcijwbjd08mgn8.constant(initSize),
    itemMarkers: itemMarkers,
    menuMarkers: menuMarkers,
    tieredMenuMarkers: tieredMenuMarkers,
    markers: markers,
    onHandler: onHandler,
    onKeyboardHandler: onKeyboardHandler,
    onStrictHandler: onStrictHandler,
    onStrictKeyboardHandler: onStrictKeyboardHandler,
    output: output$1,
    snapshot: snapshot$1
  };

  var ReceivingSchema = [$_1mrawkx2jd08mgq2.strictOf('channels', $_6eo7r6xhjd08mgrx.setOf($_2y9mlbx8jd08mgr7.value, $_6eo7r6xhjd08mgrx.objOfOnly([
      $_6uz7ybytjd08mgwm.onStrictHandler('onReceive'),
      $_1mrawkx2jd08mgq2.defaulted('schema', $_6eo7r6xhjd08mgrx.anyValue())
    ])))];

  var Receiving = $_voa9kw4jd08mglm.create({
    fields: ReceivingSchema,
    name: 'receiving',
    active: $_7jovnuyrjd08mgwb
  });

  var updateAriaState = function (component, toggleConfig) {
    var pressed = isOn(component, toggleConfig);
    var ariaInfo = toggleConfig.aria();
    ariaInfo.update()(component, ariaInfo, pressed);
  };
  var toggle$2 = function (component, toggleConfig, toggleState) {
    $_5tvqrbxujd08mgt5.toggle(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var on = function (component, toggleConfig, toggleState) {
    $_5tvqrbxujd08mgt5.add(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var off = function (component, toggleConfig, toggleState) {
    $_5tvqrbxujd08mgt5.remove(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var isOn = function (component, toggleConfig) {
    return $_5tvqrbxujd08mgt5.has(component.element(), toggleConfig.toggleClass());
  };
  var onLoad = function (component, toggleConfig, toggleState) {
    var api = toggleConfig.selected() ? on : off;
    api(component, toggleConfig, toggleState);
  };
  var $_eo0eekyxjd08mgxb = {
    onLoad: onLoad,
    toggle: toggle$2,
    isOn: isOn,
    on: on,
    off: off
  };

  var exhibit = function (base, toggleConfig, toggleState) {
    return $_bzfvkmxkjd08mgsc.nu({});
  };
  var events$1 = function (toggleConfig, toggleState) {
    var execute = $_gnbzfw5jd08mglx.executeEvent(toggleConfig, toggleState, $_eo0eekyxjd08mgxb.toggle);
    var load = $_gnbzfw5jd08mglx.loadEvent(toggleConfig, toggleState, $_eo0eekyxjd08mgxb.onLoad);
    return $_eexaurw6jd08mgmg.derive($_453g14w9jd08mgmy.flatten([
      toggleConfig.toggleOnExecute() ? [execute] : [],
      [load]
    ]));
  };
  var $_cae6mlywjd08mgx8 = {
    exhibit: exhibit,
    events: events$1
  };

  var updatePressed = function (component, ariaInfo, status) {
    $_auw0hixwjd08mgt8.set(component.element(), 'aria-pressed', status);
    if (ariaInfo.syncWithExpanded())
      updateExpanded(component, ariaInfo, status);
  };
  var updateSelected = function (component, ariaInfo, status) {
    $_auw0hixwjd08mgt8.set(component.element(), 'aria-selected', status);
  };
  var updateChecked = function (component, ariaInfo, status) {
    $_auw0hixwjd08mgt8.set(component.element(), 'aria-checked', status);
  };
  var updateExpanded = function (component, ariaInfo, status) {
    $_auw0hixwjd08mgt8.set(component.element(), 'aria-expanded', status);
  };
  var tagAttributes = {
    button: ['aria-pressed'],
    'input:checkbox': ['aria-checked']
  };
  var roleAttributes = {
    'button': ['aria-pressed'],
    'listbox': [
      'aria-pressed',
      'aria-expanded'
    ],
    'menuitemcheckbox': ['aria-checked']
  };
  var detectFromTag = function (component) {
    var elem = component.element();
    var rawTag = $_9323z1xxjd08mgti.name(elem);
    var suffix = rawTag === 'input' && $_auw0hixwjd08mgt8.has(elem, 'type') ? ':' + $_auw0hixwjd08mgt8.get(elem, 'type') : '';
    return $_96dvjsx6jd08mgqy.readOptFrom(tagAttributes, rawTag + suffix);
  };
  var detectFromRole = function (component) {
    var elem = component.element();
    if (!$_auw0hixwjd08mgt8.has(elem, 'role'))
      return $_4izgwbwajd08mgn6.none();
    else {
      var role = $_auw0hixwjd08mgt8.get(elem, 'role');
      return $_96dvjsx6jd08mgqy.readOptFrom(roleAttributes, role);
    }
  };
  var updateAuto = function (component, ariaInfo, status) {
    var attributes = detectFromRole(component).orThunk(function () {
      return detectFromTag(component);
    }).getOr([]);
    $_453g14w9jd08mgmy.each(attributes, function (attr) {
      $_auw0hixwjd08mgt8.set(component.element(), attr, status);
    });
  };
  var $_e3wnv8yzjd08mgxl = {
    updatePressed: updatePressed,
    updateSelected: updateSelected,
    updateChecked: updateChecked,
    updateExpanded: updateExpanded,
    updateAuto: updateAuto
  };

  var ToggleSchema = [
    $_1mrawkx2jd08mgq2.defaulted('selected', false),
    $_1mrawkx2jd08mgq2.strict('toggleClass'),
    $_1mrawkx2jd08mgq2.defaulted('toggleOnExecute', true),
    $_1mrawkx2jd08mgq2.defaultedOf('aria', { mode: 'none' }, $_6eo7r6xhjd08mgrx.choose('mode', {
      'pressed': [
        $_1mrawkx2jd08mgq2.defaulted('syncWithExpanded', false),
        $_6uz7ybytjd08mgwm.output('update', $_e3wnv8yzjd08mgxl.updatePressed)
      ],
      'checked': [$_6uz7ybytjd08mgwm.output('update', $_e3wnv8yzjd08mgxl.updateChecked)],
      'expanded': [$_6uz7ybytjd08mgwm.output('update', $_e3wnv8yzjd08mgxl.updateExpanded)],
      'selected': [$_6uz7ybytjd08mgwm.output('update', $_e3wnv8yzjd08mgxl.updateSelected)],
      'none': [$_6uz7ybytjd08mgwm.output('update', $_8zkcijwbjd08mgn8.noop)]
    }))
  ];

  var Toggling = $_voa9kw4jd08mglm.create({
    fields: ToggleSchema,
    name: 'toggling',
    active: $_cae6mlywjd08mgx8,
    apis: $_eo0eekyxjd08mgxb
  });

  var format = function (command, update) {
    return Receiving.config({
      channels: $_96dvjsx6jd08mgqy.wrap($_ceaddvyojd08mgvu.formatChanged(), {
        onReceive: function (button, data) {
          if (data.command === command) {
            update(button, data.state);
          }
        }
      })
    });
  };
  var orientation = function (onReceive) {
    return Receiving.config({ channels: $_96dvjsx6jd08mgqy.wrap($_ceaddvyojd08mgvu.orientationChanged(), { onReceive: onReceive }) });
  };
  var receive = function (channel, onReceive) {
    return {
      key: channel,
      value: { onReceive: onReceive }
    };
  };
  var $_cnlikcz0jd08mgxw = {
    format: format,
    orientation: orientation,
    receive: receive
  };

  var prefix = 'tinymce-mobile';
  var resolve$1 = function (p) {
    return prefix + '-' + p;
  };
  var $_ete72zz1jd08mgy0 = {
    resolve: resolve$1,
    prefix: $_8zkcijwbjd08mgn8.constant(prefix)
  };

  var exhibit$1 = function (base, unselectConfig) {
    return $_bzfvkmxkjd08mgsc.nu({
      styles: {
        '-webkit-user-select': 'none',
        'user-select': 'none',
        '-ms-user-select': 'none',
        '-moz-user-select': '-moz-none'
      },
      attributes: { 'unselectable': 'on' }
    });
  };
  var events$2 = function (unselectConfig) {
    return $_eexaurw6jd08mgmg.derive([$_eexaurw6jd08mgmg.abort($_6gw9slwxjd08mgph.selectstart(), $_8zkcijwbjd08mgn8.constant(true))]);
  };
  var $_aqr04zz4jd08mgya = {
    events: events$2,
    exhibit: exhibit$1
  };

  var Unselecting = $_voa9kw4jd08mglm.create({
    fields: [],
    name: 'unselecting',
    active: $_aqr04zz4jd08mgya
  });

  var focus$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_6h5kwkygjd08mgvc.focus(component.element());
      focusConfig.onFocus()(component);
    }
  };
  var blur$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_6h5kwkygjd08mgvc.blur(component.element());
    }
  };
  var isFocused = function (component) {
    return $_6h5kwkygjd08mgvc.hasFocus(component.element());
  };
  var $_ea6w75z8jd08mgyp = {
    focus: focus$1,
    blur: blur$1,
    isFocused: isFocused
  };

  var exhibit$2 = function (base, focusConfig) {
    if (focusConfig.ignore())
      return $_bzfvkmxkjd08mgsc.nu({});
    else
      return $_bzfvkmxkjd08mgsc.nu({ attributes: { 'tabindex': '-1' } });
  };
  var events$3 = function (focusConfig) {
    return $_eexaurw6jd08mgmg.derive([$_eexaurw6jd08mgmg.run($_30aqx5wwjd08mgpa.focus(), function (component, simulatedEvent) {
        $_ea6w75z8jd08mgyp.focus(component, focusConfig);
        simulatedEvent.stop();
      })]);
  };
  var $_en19w6z7jd08mgyo = {
    exhibit: exhibit$2,
    events: events$3
  };

  var FocusSchema = [
    $_6uz7ybytjd08mgwm.onHandler('onFocus'),
    $_1mrawkx2jd08mgq2.defaulted('ignore', false)
  ];

  var Focusing = $_voa9kw4jd08mglm.create({
    fields: FocusSchema,
    name: 'focusing',
    active: $_en19w6z7jd08mgyo,
    apis: $_ea6w75z8jd08mgyp
  });

  var $_6inwuyzejd08mgzg = {
    BACKSPACE: $_8zkcijwbjd08mgn8.constant([8]),
    TAB: $_8zkcijwbjd08mgn8.constant([9]),
    ENTER: $_8zkcijwbjd08mgn8.constant([13]),
    SHIFT: $_8zkcijwbjd08mgn8.constant([16]),
    CTRL: $_8zkcijwbjd08mgn8.constant([17]),
    ALT: $_8zkcijwbjd08mgn8.constant([18]),
    CAPSLOCK: $_8zkcijwbjd08mgn8.constant([20]),
    ESCAPE: $_8zkcijwbjd08mgn8.constant([27]),
    SPACE: $_8zkcijwbjd08mgn8.constant([32]),
    PAGEUP: $_8zkcijwbjd08mgn8.constant([33]),
    PAGEDOWN: $_8zkcijwbjd08mgn8.constant([34]),
    END: $_8zkcijwbjd08mgn8.constant([35]),
    HOME: $_8zkcijwbjd08mgn8.constant([36]),
    LEFT: $_8zkcijwbjd08mgn8.constant([37]),
    UP: $_8zkcijwbjd08mgn8.constant([38]),
    RIGHT: $_8zkcijwbjd08mgn8.constant([39]),
    DOWN: $_8zkcijwbjd08mgn8.constant([40]),
    INSERT: $_8zkcijwbjd08mgn8.constant([45]),
    DEL: $_8zkcijwbjd08mgn8.constant([46]),
    META: $_8zkcijwbjd08mgn8.constant([
      91,
      93,
      224
    ]),
    F10: $_8zkcijwbjd08mgn8.constant([121])
  };

  var cycleBy = function (value, delta, min, max) {
    var r = value + delta;
    if (r > max)
      return min;
    else
      return r < min ? max : r;
  };
  var cap = function (value, min, max) {
    if (value <= min)
      return min;
    else
      return value >= max ? max : value;
  };
  var $_ci8ox7zjjd08mh0a = {
    cycleBy: cycleBy,
    cap: cap
  };

  var all$2 = function (predicate) {
    return descendants($_9fqzedy7jd08mgun.body(), predicate);
  };
  var ancestors = function (scope, predicate, isRoot) {
    return $_453g14w9jd08mgmy.filter($_4uhv6ey3jd08mgu3.parents(scope, isRoot), predicate);
  };
  var siblings$1 = function (scope, predicate) {
    return $_453g14w9jd08mgmy.filter($_4uhv6ey3jd08mgu3.siblings(scope), predicate);
  };
  var children$1 = function (scope, predicate) {
    return $_453g14w9jd08mgmy.filter($_4uhv6ey3jd08mgu3.children(scope), predicate);
  };
  var descendants = function (scope, predicate) {
    var result = [];
    $_453g14w9jd08mgmy.each($_4uhv6ey3jd08mgu3.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants(x, predicate));
    });
    return result;
  };
  var $_4n6aj9zljd08mh0c = {
    all: all$2,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var all$3 = function (selector) {
    return $_7fzh2owsjd08mgok.all(selector);
  };
  var ancestors$1 = function (scope, selector, isRoot) {
    return $_4n6aj9zljd08mh0c.ancestors(scope, function (e) {
      return $_7fzh2owsjd08mgok.is(e, selector);
    }, isRoot);
  };
  var siblings$2 = function (scope, selector) {
    return $_4n6aj9zljd08mh0c.siblings(scope, function (e) {
      return $_7fzh2owsjd08mgok.is(e, selector);
    });
  };
  var children$2 = function (scope, selector) {
    return $_4n6aj9zljd08mh0c.children(scope, function (e) {
      return $_7fzh2owsjd08mgok.is(e, selector);
    });
  };
  var descendants$1 = function (scope, selector) {
    return $_7fzh2owsjd08mgok.all(selector, scope);
  };
  var $_48w1m3zkjd08mh0b = {
    all: all$3,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  var first$2 = function (selector) {
    return $_7fzh2owsjd08mgok.one(selector);
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_cmjc72yijd08mgvh.ancestor(scope, function (e) {
      return $_7fzh2owsjd08mgok.is(e, selector);
    }, isRoot);
  };
  var sibling$2 = function (scope, selector) {
    return $_cmjc72yijd08mgvh.sibling(scope, function (e) {
      return $_7fzh2owsjd08mgok.is(e, selector);
    });
  };
  var child$3 = function (scope, selector) {
    return $_cmjc72yijd08mgvh.child(scope, function (e) {
      return $_7fzh2owsjd08mgok.is(e, selector);
    });
  };
  var descendant$2 = function (scope, selector) {
    return $_7fzh2owsjd08mgok.one(selector, scope);
  };
  var closest$2 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_7fzh2owsjd08mgok.is, ancestor$2, scope, selector, isRoot);
  };
  var $_edahi9zmjd08mh0g = {
    first: first$2,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var dehighlightAll = function (component, hConfig, hState) {
    var highlighted = $_48w1m3zkjd08mh0b.descendants(component.element(), '.' + hConfig.highlightClass());
    $_453g14w9jd08mgmy.each(highlighted, function (h) {
      $_5tvqrbxujd08mgt5.remove(h, hConfig.highlightClass());
      component.getSystem().getByDom(h).each(function (target) {
        hConfig.onDehighlight()(component, target);
      });
    });
  };
  var dehighlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    $_5tvqrbxujd08mgt5.remove(target.element(), hConfig.highlightClass());
    if (wasHighlighted)
      hConfig.onDehighlight()(component, target);
  };
  var highlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    dehighlightAll(component, hConfig, hState);
    $_5tvqrbxujd08mgt5.add(target.element(), hConfig.highlightClass());
    if (!wasHighlighted)
      hConfig.onHighlight()(component, target);
  };
  var highlightFirst = function (component, hConfig, hState) {
    getFirst(component, hConfig, hState).each(function (firstComp) {
      highlight(component, hConfig, hState, firstComp);
    });
  };
  var highlightLast = function (component, hConfig, hState) {
    getLast(component, hConfig, hState).each(function (lastComp) {
      highlight(component, hConfig, hState, lastComp);
    });
  };
  var highlightAt = function (component, hConfig, hState, index) {
    getByIndex(component, hConfig, hState, index).fold(function (err) {
      throw new Error(err);
    }, function (firstComp) {
      highlight(component, hConfig, hState, firstComp);
    });
  };
  var highlightBy = function (component, hConfig, hState, predicate) {
    var items = $_48w1m3zkjd08mh0b.descendants(component.element(), '.' + hConfig.itemClass());
    var itemComps = $_cqt7vbyejd08mgva.cat($_453g14w9jd08mgmy.map(items, function (i) {
      return component.getSystem().getByDom(i).toOption();
    }));
    var targetComp = $_453g14w9jd08mgmy.find(itemComps, predicate);
    targetComp.each(function (c) {
      highlight(component, hConfig, hState, c);
    });
  };
  var isHighlighted = function (component, hConfig, hState, queryTarget) {
    return $_5tvqrbxujd08mgt5.has(queryTarget.element(), hConfig.highlightClass());
  };
  var getHighlighted = function (component, hConfig, hState) {
    return $_edahi9zmjd08mh0g.descendant(component.element(), '.' + hConfig.highlightClass()).bind(component.getSystem().getByDom);
  };
  var getByIndex = function (component, hConfig, hState, index) {
    var items = $_48w1m3zkjd08mh0b.descendants(component.element(), '.' + hConfig.itemClass());
    return $_4izgwbwajd08mgn6.from(items[index]).fold(function () {
      return $_2y9mlbx8jd08mgr7.error('No element found with index ' + index);
    }, component.getSystem().getByDom);
  };
  var getFirst = function (component, hConfig, hState) {
    return $_edahi9zmjd08mh0g.descendant(component.element(), '.' + hConfig.itemClass()).bind(component.getSystem().getByDom);
  };
  var getLast = function (component, hConfig, hState) {
    var items = $_48w1m3zkjd08mh0b.descendants(component.element(), '.' + hConfig.itemClass());
    var last = items.length > 0 ? $_4izgwbwajd08mgn6.some(items[items.length - 1]) : $_4izgwbwajd08mgn6.none();
    return last.bind(component.getSystem().getByDom);
  };
  var getDelta = function (component, hConfig, hState, delta) {
    var items = $_48w1m3zkjd08mh0b.descendants(component.element(), '.' + hConfig.itemClass());
    var current = $_453g14w9jd08mgmy.findIndex(items, function (item) {
      return $_5tvqrbxujd08mgt5.has(item, hConfig.highlightClass());
    });
    return current.bind(function (selected) {
      var dest = $_ci8ox7zjjd08mh0a.cycleBy(selected, delta, 0, items.length - 1);
      return component.getSystem().getByDom(items[dest]);
    });
  };
  var getPrevious = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, -1);
  };
  var getNext = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, +1);
  };
  var $_8tvwghzijd08mgzv = {
    dehighlightAll: dehighlightAll,
    dehighlight: dehighlight,
    highlight: highlight,
    highlightFirst: highlightFirst,
    highlightLast: highlightLast,
    highlightAt: highlightAt,
    highlightBy: highlightBy,
    isHighlighted: isHighlighted,
    getHighlighted: getHighlighted,
    getFirst: getFirst,
    getLast: getLast,
    getPrevious: getPrevious,
    getNext: getNext
  };

  var HighlightSchema = [
    $_1mrawkx2jd08mgq2.strict('highlightClass'),
    $_1mrawkx2jd08mgq2.strict('itemClass'),
    $_6uz7ybytjd08mgwm.onHandler('onHighlight'),
    $_6uz7ybytjd08mgwm.onHandler('onDehighlight')
  ];

  var Highlighting = $_voa9kw4jd08mglm.create({
    fields: HighlightSchema,
    name: 'highlighting',
    apis: $_8tvwghzijd08mgzv
  });

  var dom = function () {
    var get = function (component) {
      return $_6h5kwkygjd08mgvc.search(component.element());
    };
    var set = function (component, focusee) {
      component.getSystem().triggerFocus(focusee, component.element());
    };
    return {
      get: get,
      set: set
    };
  };
  var highlights = function () {
    var get = function (component) {
      return Highlighting.getHighlighted(component).map(function (item) {
        return item.element();
      });
    };
    var set = function (component, element) {
      component.getSystem().getByDom(element).fold($_8zkcijwbjd08mgn8.noop, function (item) {
        Highlighting.highlight(component, item);
      });
    };
    return {
      get: get,
      set: set
    };
  };
  var $_cbxweqzgjd08mgzq = {
    dom: dom,
    highlights: highlights
  };

  var inSet = function (keys) {
    return function (event) {
      return $_453g14w9jd08mgmy.contains(keys, event.raw().which);
    };
  };
  var and = function (preds) {
    return function (event) {
      return $_453g14w9jd08mgmy.forall(preds, function (pred) {
        return pred(event);
      });
    };
  };
  var is$1 = function (key) {
    return function (event) {
      return event.raw().which === key;
    };
  };
  var isShift = function (event) {
    return event.raw().shiftKey === true;
  };
  var isControl = function (event) {
    return event.raw().ctrlKey === true;
  };
  var $_bvrwqdzpjd08mh0o = {
    inSet: inSet,
    and: and,
    is: is$1,
    isShift: isShift,
    isNotShift: $_8zkcijwbjd08mgn8.not(isShift),
    isControl: isControl,
    isNotControl: $_8zkcijwbjd08mgn8.not(isControl)
  };

  var basic = function (key, action) {
    return {
      matches: $_bvrwqdzpjd08mh0o.is(key),
      classification: action
    };
  };
  var rule = function (matches, action) {
    return {
      matches: matches,
      classification: action
    };
  };
  var choose$2 = function (transitions, event) {
    var transition = $_453g14w9jd08mgmy.find(transitions, function (t) {
      return t.matches(event);
    });
    return transition.map(function (t) {
      return t.classification;
    });
  };
  var $_4wb7kgzojd08mh0l = {
    basic: basic,
    rule: rule,
    choose: choose$2
  };

  var typical = function (infoSchema, stateInit, getRules, getEvents, getApis, optFocusIn) {
    var schema = function () {
      return infoSchema.concat([
        $_1mrawkx2jd08mgq2.defaulted('focusManager', $_cbxweqzgjd08mgzq.dom()),
        $_6uz7ybytjd08mgwm.output('handler', me),
        $_6uz7ybytjd08mgwm.output('state', stateInit)
      ]);
    };
    var processKey = function (component, simulatedEvent, keyingConfig, keyingState) {
      var rules = getRules(component, simulatedEvent, keyingConfig, keyingState);
      return $_4wb7kgzojd08mh0l.choose(rules, simulatedEvent.event()).bind(function (rule) {
        return rule(component, simulatedEvent, keyingConfig, keyingState);
      });
    };
    var toEvents = function (keyingConfig, keyingState) {
      var otherEvents = getEvents(keyingConfig, keyingState);
      var keyEvents = $_eexaurw6jd08mgmg.derive(optFocusIn.map(function (focusIn) {
        return $_eexaurw6jd08mgmg.run($_30aqx5wwjd08mgpa.focus(), function (component, simulatedEvent) {
          focusIn(component, keyingConfig, keyingState, simulatedEvent);
          simulatedEvent.stop();
        });
      }).toArray().concat([$_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.keydown(), function (component, simulatedEvent) {
          processKey(component, simulatedEvent, keyingConfig, keyingState).each(function (_) {
            simulatedEvent.stop();
          });
        })]));
      return $_25kgk5wyjd08mgpk.deepMerge(otherEvents, keyEvents);
    };
    var me = {
      schema: schema,
      processKey: processKey,
      toEvents: toEvents,
      toApis: getApis
    };
    return me;
  };
  var $_6paqr9zfjd08mgzl = { typical: typical };

  var cyclePrev = function (values, index, predicate) {
    var before = $_453g14w9jd08mgmy.reverse(values.slice(0, index));
    var after = $_453g14w9jd08mgmy.reverse(values.slice(index + 1));
    return $_453g14w9jd08mgmy.find(before.concat(after), predicate);
  };
  var tryPrev = function (values, index, predicate) {
    var before = $_453g14w9jd08mgmy.reverse(values.slice(0, index));
    return $_453g14w9jd08mgmy.find(before, predicate);
  };
  var cycleNext = function (values, index, predicate) {
    var before = values.slice(0, index);
    var after = values.slice(index + 1);
    return $_453g14w9jd08mgmy.find(after.concat(before), predicate);
  };
  var tryNext = function (values, index, predicate) {
    var after = values.slice(index + 1);
    return $_453g14w9jd08mgmy.find(after, predicate);
  };
  var $_avj6orzqjd08mh0s = {
    cyclePrev: cyclePrev,
    cycleNext: cycleNext,
    tryPrev: tryPrev,
    tryNext: tryNext
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_90mcp0ztjd08mh1a = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_erilttwzjd08mgpl.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_90mcp0ztjd08mh1a.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_90mcp0ztjd08mh1a.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$2 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_1xoayfx0jd08mgpm.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_1xoayfx0jd08mgpm.each(css, function (v, k) {
      v.fold(function () {
        internalRemove(dom, k);
      }, function (value) {
        internalSet(dom, k, value);
      });
    });
  };
  var get$3 = function (element, property) {
    var dom = element.dom();
    var styles = window.getComputedStyle(dom);
    var r = styles.getPropertyValue(property);
    var v = r === '' && !$_9fqzedy7jd08mgun.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_90mcp0ztjd08mh1a.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
  };
  var getRaw = function (element, property) {
    var dom = element.dom();
    var raw = getUnsafeProperty(dom, property);
    return $_4izgwbwajd08mgn6.from(raw).filter(function (r) {
      return r.length > 0;
    });
  };
  var getAllRaw = function (element) {
    var css = {};
    var dom = element.dom();
    if ($_90mcp0ztjd08mh1a.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_3visdkwtjd08mgor.fromTag(tag);
    set$2(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$5 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_auw0hixwjd08mgt8.has(element, 'style') && $_3btv0xwpjd08mgoe.trim($_auw0hixwjd08mgt8.get(element, 'style')) === '') {
      $_auw0hixwjd08mgt8.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_auw0hixwjd08mgt8.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_auw0hixwjd08mgt8.remove : $_auw0hixwjd08mgt8.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy$1 = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_90mcp0ztjd08mh1a.isSupported(sourceDom) && $_90mcp0ztjd08mh1a.isSupported(targetDom)) {
      targetDom.style.cssText = sourceDom.style.cssText;
    }
  };
  var reflow = function (e) {
    return e.dom().offsetWidth;
  };
  var transferOne$1 = function (source, destination, style) {
    getRaw(source, style).each(function (value) {
      if (getRaw(destination, style).isNone())
        set$2(destination, style, value);
    });
  };
  var transfer$1 = function (source, destination, styles) {
    if (!$_9323z1xxjd08mgti.isElement(source) || !$_9323z1xxjd08mgti.isElement(destination))
      return;
    $_453g14w9jd08mgmy.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_62cv66zsjd08mh10 = {
    copy: copy$1,
    set: set$2,
    preserve: preserve,
    setAll: setAll$1,
    setOptions: setOptions,
    remove: remove$5,
    get: get$3,
    getRaw: getRaw,
    getAllRaw: getAllRaw,
    isValidValue: isValidValue,
    reflow: reflow,
    transfer: transfer$1
  };

  function Dimension (name, getOffset) {
    var set = function (element, h) {
      if (!$_erilttwzjd08mgpl.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_90mcp0ztjd08mh1a.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_62cv66zsjd08mh10.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_453g14w9jd08mgmy.foldl(properties, function (acc, property) {
        var val = $_62cv66zsjd08mh10.get(element, property);
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

  var api = Dimension('height', function (element) {
    return $_9fqzedy7jd08mgun.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
  });
  var set$3 = function (element, h) {
    api.set(element, h);
  };
  var get$4 = function (element) {
    return api.get(element);
  };
  var getOuter$1 = function (element) {
    return api.getOuter(element);
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
    var absMax = api.max(element, value, inclusions);
    $_62cv66zsjd08mh10.set(element, 'max-height', absMax + 'px');
  };
  var $_oqlu3zrjd08mh0y = {
    set: set$3,
    get: get$4,
    getOuter: getOuter$1,
    setMax: setMax
  };

  var create$2 = function (cyclicField) {
    var schema = [
      $_1mrawkx2jd08mgq2.option('onEscape'),
      $_1mrawkx2jd08mgq2.option('onEnter'),
      $_1mrawkx2jd08mgq2.defaulted('selector', '[data-alloy-tabstop="true"]'),
      $_1mrawkx2jd08mgq2.defaulted('firstTabstop', 0),
      $_1mrawkx2jd08mgq2.defaulted('useTabstopAt', $_8zkcijwbjd08mgn8.constant(true)),
      $_1mrawkx2jd08mgq2.option('visibilitySelector')
    ].concat([cyclicField]);
    var isVisible = function (tabbingConfig, element) {
      var target = tabbingConfig.visibilitySelector().bind(function (sel) {
        return $_edahi9zmjd08mh0g.closest(element, sel);
      }).getOr(element);
      return $_oqlu3zrjd08mh0y.get(target) > 0;
    };
    var findInitial = function (component, tabbingConfig) {
      var tabstops = $_48w1m3zkjd08mh0b.descendants(component.element(), tabbingConfig.selector());
      var visibles = $_453g14w9jd08mgmy.filter(tabstops, function (elem) {
        return isVisible(tabbingConfig, elem);
      });
      return $_4izgwbwajd08mgn6.from(visibles[tabbingConfig.firstTabstop()]);
    };
    var findCurrent = function (component, tabbingConfig) {
      return tabbingConfig.focusManager().get(component).bind(function (elem) {
        return $_edahi9zmjd08mh0g.closest(elem, tabbingConfig.selector());
      });
    };
    var isTabstop = function (tabbingConfig, element) {
      return isVisible(tabbingConfig, element) && tabbingConfig.useTabstopAt()(element);
    };
    var focusIn = function (component, tabbingConfig, tabbingState) {
      findInitial(component, tabbingConfig).each(function (target) {
        tabbingConfig.focusManager().set(component, target);
      });
    };
    var goFromTabstop = function (component, tabstops, stopIndex, tabbingConfig, cycle) {
      return cycle(tabstops, stopIndex, function (elem) {
        return isTabstop(tabbingConfig, elem);
      }).fold(function () {
        return tabbingConfig.cyclic() ? $_4izgwbwajd08mgn6.some(true) : $_4izgwbwajd08mgn6.none();
      }, function (target) {
        tabbingConfig.focusManager().set(component, target);
        return $_4izgwbwajd08mgn6.some(true);
      });
    };
    var go = function (component, simulatedEvent, tabbingConfig, cycle) {
      var tabstops = $_48w1m3zkjd08mh0b.descendants(component.element(), tabbingConfig.selector());
      return findCurrent(component, tabbingConfig).bind(function (tabstop) {
        var optStopIndex = $_453g14w9jd08mgmy.findIndex(tabstops, $_8zkcijwbjd08mgn8.curry($_ctdo1gw8jd08mgmp.eq, tabstop));
        return optStopIndex.bind(function (stopIndex) {
          return goFromTabstop(component, tabstops, stopIndex, tabbingConfig, cycle);
        });
      });
    };
    var goBackwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_avj6orzqjd08mh0s.cyclePrev : $_avj6orzqjd08mh0s.tryPrev;
      return go(component, simulatedEvent, tabbingConfig, navigate);
    };
    var goForwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_avj6orzqjd08mh0s.cycleNext : $_avj6orzqjd08mh0s.tryNext;
      return go(component, simulatedEvent, tabbingConfig, navigate);
    };
    var execute = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      return tabbingConfig.onEnter().bind(function (f) {
        return f(component, simulatedEvent);
      });
    };
    var exit = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      return tabbingConfig.onEscape().bind(function (f) {
        return f(component, simulatedEvent);
      });
    };
    var getRules = $_8zkcijwbjd08mgn8.constant([
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.and([
        $_bvrwqdzpjd08mh0o.isShift,
        $_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.TAB())
      ]), goBackwards),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.TAB()), goForwards),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.ESCAPE()), exit),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.and([
        $_bvrwqdzpjd08mh0o.isNotShift,
        $_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.ENTER())
      ]), execute)
    ]);
    var getEvents = $_8zkcijwbjd08mgn8.constant({});
    var getApis = $_8zkcijwbjd08mgn8.constant({});
    return $_6paqr9zfjd08mgzl.typical(schema, $_ginglqxqjd08mgsw.init, getRules, getEvents, getApis, $_4izgwbwajd08mgn6.some(focusIn));
  };
  var $_4ku6k0zdjd08mgz4 = { create: create$2 };

  var AcyclicType = $_4ku6k0zdjd08mgz4.create($_1mrawkx2jd08mgq2.state('cyclic', $_8zkcijwbjd08mgn8.constant(false)));

  var CyclicType = $_4ku6k0zdjd08mgz4.create($_1mrawkx2jd08mgq2.state('cyclic', $_8zkcijwbjd08mgn8.constant(true)));

  var inside = function (target) {
    return $_9323z1xxjd08mgti.name(target) === 'input' && $_auw0hixwjd08mgt8.get(target, 'type') !== 'radio' || $_9323z1xxjd08mgti.name(target) === 'textarea';
  };
  var $_7qxh4kzxjd08mh1r = { inside: inside };

  var doDefaultExecute = function (component, simulatedEvent, focused) {
    $_f6t3w1wvjd08mgp1.dispatch(component, focused, $_30aqx5wwjd08mgpa.execute());
    return $_4izgwbwajd08mgn6.some(true);
  };
  var defaultExecute = function (component, simulatedEvent, focused) {
    return $_7qxh4kzxjd08mh1r.inside(focused) && $_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.SPACE())(simulatedEvent.event()) ? $_4izgwbwajd08mgn6.none() : doDefaultExecute(component, simulatedEvent, focused);
  };
  var $_5p668pzyjd08mh1w = { defaultExecute: defaultExecute };

  var schema$1 = [
    $_1mrawkx2jd08mgq2.defaulted('execute', $_5p668pzyjd08mh1w.defaultExecute),
    $_1mrawkx2jd08mgq2.defaulted('useSpace', false),
    $_1mrawkx2jd08mgq2.defaulted('useEnter', true),
    $_1mrawkx2jd08mgq2.defaulted('useControlEnter', false),
    $_1mrawkx2jd08mgq2.defaulted('useDown', false)
  ];
  var execute = function (component, simulatedEvent, executeConfig, executeState) {
    return executeConfig.execute()(component, simulatedEvent, component.element());
  };
  var getRules = function (component, simulatedEvent, executeConfig, executeState) {
    var spaceExec = executeConfig.useSpace() && !$_7qxh4kzxjd08mh1r.inside(component.element()) ? $_6inwuyzejd08mgzg.SPACE() : [];
    var enterExec = executeConfig.useEnter() ? $_6inwuyzejd08mgzg.ENTER() : [];
    var downExec = executeConfig.useDown() ? $_6inwuyzejd08mgzg.DOWN() : [];
    var execKeys = spaceExec.concat(enterExec).concat(downExec);
    return [$_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet(execKeys), execute)].concat(executeConfig.useControlEnter() ? [$_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.and([
        $_bvrwqdzpjd08mh0o.isControl,
        $_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.ENTER())
      ]), execute)] : []);
  };
  var getEvents = $_8zkcijwbjd08mgn8.constant({});
  var getApis = $_8zkcijwbjd08mgn8.constant({});
  var ExecutionType = $_6paqr9zfjd08mgzl.typical(schema$1, $_ginglqxqjd08mgsw.init, getRules, getEvents, getApis, $_4izgwbwajd08mgn6.none());

  var flatgrid = function (spec) {
    var dimensions = Cell($_4izgwbwajd08mgn6.none());
    var setGridSize = function (numRows, numColumns) {
      dimensions.set($_4izgwbwajd08mgn6.some({
        numRows: $_8zkcijwbjd08mgn8.constant(numRows),
        numColumns: $_8zkcijwbjd08mgn8.constant(numColumns)
      }));
    };
    var getNumRows = function () {
      return dimensions.get().map(function (d) {
        return d.numRows();
      });
    };
    var getNumColumns = function () {
      return dimensions.get().map(function (d) {
        return d.numColumns();
      });
    };
    return BehaviourState({
      readState: $_8zkcijwbjd08mgn8.constant({}),
      setGridSize: setGridSize,
      getNumRows: getNumRows,
      getNumColumns: getNumColumns
    });
  };
  var init$1 = function (spec) {
    return spec.state()(spec);
  };
  var $_g12k64100jd08mh27 = {
    flatgrid: flatgrid,
    init: init$1
  };

  var onDirection = function (isLtr, isRtl) {
    return function (element) {
      return getDirection(element) === 'rtl' ? isRtl : isLtr;
    };
  };
  var getDirection = function (element) {
    return $_62cv66zsjd08mh10.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_6cqoqz102jd08mh2h = {
    onDirection: onDirection,
    getDirection: getDirection
  };

  var useH = function (movement) {
    return function (component, simulatedEvent, config, state) {
      var move = movement(component.element());
      return use(move, component, simulatedEvent, config, state);
    };
  };
  var west = function (moveLeft, moveRight) {
    var movement = $_6cqoqz102jd08mh2h.onDirection(moveLeft, moveRight);
    return useH(movement);
  };
  var east = function (moveLeft, moveRight) {
    var movement = $_6cqoqz102jd08mh2h.onDirection(moveRight, moveLeft);
    return useH(movement);
  };
  var useV = function (move) {
    return function (component, simulatedEvent, config, state) {
      return use(move, component, simulatedEvent, config, state);
    };
  };
  var use = function (move, component, simulatedEvent, config, state) {
    var outcome = config.focusManager().get(component).bind(function (focused) {
      return move(component.element(), focused, config, state);
    });
    return outcome.map(function (newFocus) {
      config.focusManager().set(component, newFocus);
      return true;
    });
  };
  var $_3tu3h1101jd08mh2f = {
    east: east,
    west: west,
    north: useV,
    south: useV,
    move: useV
  };

  var indexInfo = $_2h5zjyxmjd08mgsp.immutableBag([
    'index',
    'candidates'
  ], []);
  var locate = function (candidates, predicate) {
    return $_453g14w9jd08mgmy.findIndex(candidates, predicate).map(function (index) {
      return indexInfo({
        index: index,
        candidates: candidates
      });
    });
  };
  var $_bw34pm104jd08mh2t = { locate: locate };

  var visibilityToggler = function (element, property, hiddenValue, visibleValue) {
    var initial = $_62cv66zsjd08mh10.get(element, property);
    if (initial === undefined)
      initial = '';
    var value = initial === hiddenValue ? visibleValue : hiddenValue;
    var off = $_8zkcijwbjd08mgn8.curry($_62cv66zsjd08mh10.set, element, property, initial);
    var on = $_8zkcijwbjd08mgn8.curry($_62cv66zsjd08mh10.set, element, property, value);
    return Toggler(off, on, false);
  };
  var toggler$1 = function (element) {
    return visibilityToggler(element, 'visibility', 'hidden', 'visible');
  };
  var displayToggler = function (element, value) {
    return visibilityToggler(element, 'display', 'none', value);
  };
  var isHidden = function (dom) {
    return dom.offsetWidth <= 0 && dom.offsetHeight <= 0;
  };
  var isVisible = function (element) {
    var dom = element.dom();
    return !isHidden(dom);
  };
  var $_8ot7le105jd08mh2y = {
    toggler: toggler$1,
    displayToggler: displayToggler,
    isVisible: isVisible
  };

  var locateVisible = function (container, current, selector) {
    var filter = $_8ot7le105jd08mh2y.isVisible;
    return locateIn(container, current, selector, filter);
  };
  var locateIn = function (container, current, selector, filter) {
    var predicate = $_8zkcijwbjd08mgn8.curry($_ctdo1gw8jd08mgmp.eq, current);
    var candidates = $_48w1m3zkjd08mh0b.descendants(container, selector);
    var visible = $_453g14w9jd08mgmy.filter(candidates, $_8ot7le105jd08mh2y.isVisible);
    return $_bw34pm104jd08mh2t.locate(visible, predicate);
  };
  var findIndex$2 = function (elements, target) {
    return $_453g14w9jd08mgmy.findIndex(elements, function (elem) {
      return $_ctdo1gw8jd08mgmp.eq(target, elem);
    });
  };
  var $_84axww103jd08mh2j = {
    locateVisible: locateVisible,
    locateIn: locateIn,
    findIndex: findIndex$2
  };

  var withGrid = function (values, index, numCols, f) {
    var oldRow = Math.floor(index / numCols);
    var oldColumn = index % numCols;
    return f(oldRow, oldColumn).bind(function (address) {
      var newIndex = address.row() * numCols + address.column();
      return newIndex >= 0 && newIndex < values.length ? $_4izgwbwajd08mgn6.some(values[newIndex]) : $_4izgwbwajd08mgn6.none();
    });
  };
  var cycleHorizontal = function (values, index, numRows, numCols, delta) {
    return withGrid(values, index, numCols, function (oldRow, oldColumn) {
      var onLastRow = oldRow === numRows - 1;
      var colsInRow = onLastRow ? values.length - oldRow * numCols : numCols;
      var newColumn = $_ci8ox7zjjd08mh0a.cycleBy(oldColumn, delta, 0, colsInRow - 1);
      return $_4izgwbwajd08mgn6.some({
        row: $_8zkcijwbjd08mgn8.constant(oldRow),
        column: $_8zkcijwbjd08mgn8.constant(newColumn)
      });
    });
  };
  var cycleVertical = function (values, index, numRows, numCols, delta) {
    return withGrid(values, index, numCols, function (oldRow, oldColumn) {
      var newRow = $_ci8ox7zjjd08mh0a.cycleBy(oldRow, delta, 0, numRows - 1);
      var onLastRow = newRow === numRows - 1;
      var colsInRow = onLastRow ? values.length - newRow * numCols : numCols;
      var newCol = $_ci8ox7zjjd08mh0a.cap(oldColumn, 0, colsInRow - 1);
      return $_4izgwbwajd08mgn6.some({
        row: $_8zkcijwbjd08mgn8.constant(newRow),
        column: $_8zkcijwbjd08mgn8.constant(newCol)
      });
    });
  };
  var cycleRight = function (values, index, numRows, numCols) {
    return cycleHorizontal(values, index, numRows, numCols, +1);
  };
  var cycleLeft = function (values, index, numRows, numCols) {
    return cycleHorizontal(values, index, numRows, numCols, -1);
  };
  var cycleUp = function (values, index, numRows, numCols) {
    return cycleVertical(values, index, numRows, numCols, -1);
  };
  var cycleDown = function (values, index, numRows, numCols) {
    return cycleVertical(values, index, numRows, numCols, +1);
  };
  var $_e1987u106jd08mh32 = {
    cycleDown: cycleDown,
    cycleUp: cycleUp,
    cycleLeft: cycleLeft,
    cycleRight: cycleRight
  };

  var schema$2 = [
    $_1mrawkx2jd08mgq2.strict('selector'),
    $_1mrawkx2jd08mgq2.defaulted('execute', $_5p668pzyjd08mh1w.defaultExecute),
    $_6uz7ybytjd08mgwm.onKeyboardHandler('onEscape'),
    $_1mrawkx2jd08mgq2.defaulted('captureTab', false),
    $_6uz7ybytjd08mgwm.initSize()
  ];
  var focusIn = function (component, gridConfig, gridState) {
    $_edahi9zmjd08mh0g.descendant(component.element(), gridConfig.selector()).each(function (first) {
      gridConfig.focusManager().set(component, first);
    });
  };
  var findCurrent = function (component, gridConfig) {
    return gridConfig.focusManager().get(component).bind(function (elem) {
      return $_edahi9zmjd08mh0g.closest(elem, gridConfig.selector());
    });
  };
  var execute$1 = function (component, simulatedEvent, gridConfig, gridState) {
    return findCurrent(component, gridConfig).bind(function (focused) {
      return gridConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var doMove = function (cycle) {
    return function (element, focused, gridConfig, gridState) {
      return $_84axww103jd08mh2j.locateVisible(element, focused, gridConfig.selector()).bind(function (identified) {
        return cycle(identified.candidates(), identified.index(), gridState.getNumRows().getOr(gridConfig.initSize().numRows()), gridState.getNumColumns().getOr(gridConfig.initSize().numColumns()));
      });
    };
  };
  var handleTab = function (component, simulatedEvent, gridConfig, gridState) {
    return gridConfig.captureTab() ? $_4izgwbwajd08mgn6.some(true) : $_4izgwbwajd08mgn6.none();
  };
  var doEscape = function (component, simulatedEvent, gridConfig, gridState) {
    return gridConfig.onEscape()(component, simulatedEvent);
  };
  var moveLeft = doMove($_e1987u106jd08mh32.cycleLeft);
  var moveRight = doMove($_e1987u106jd08mh32.cycleRight);
  var moveNorth = doMove($_e1987u106jd08mh32.cycleUp);
  var moveSouth = doMove($_e1987u106jd08mh32.cycleDown);
  var getRules$1 = $_8zkcijwbjd08mgn8.constant([
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.LEFT()), $_3tu3h1101jd08mh2f.west(moveLeft, moveRight)),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.RIGHT()), $_3tu3h1101jd08mh2f.east(moveLeft, moveRight)),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.UP()), $_3tu3h1101jd08mh2f.north(moveNorth)),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.DOWN()), $_3tu3h1101jd08mh2f.south(moveSouth)),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.and([
      $_bvrwqdzpjd08mh0o.isShift,
      $_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.TAB())
    ]), handleTab),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.and([
      $_bvrwqdzpjd08mh0o.isNotShift,
      $_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.TAB())
    ]), handleTab),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.ESCAPE()), doEscape),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.SPACE().concat($_6inwuyzejd08mgzg.ENTER())), execute$1)
  ]);
  var getEvents$1 = $_8zkcijwbjd08mgn8.constant({});
  var getApis$1 = {};
  var FlatgridType = $_6paqr9zfjd08mgzl.typical(schema$2, $_g12k64100jd08mh27.flatgrid, getRules$1, getEvents$1, getApis$1, $_4izgwbwajd08mgn6.some(focusIn));

  var horizontal = function (container, selector, current, delta) {
    return $_84axww103jd08mh2j.locateVisible(container, current, selector, $_8zkcijwbjd08mgn8.constant(true)).bind(function (identified) {
      var index = identified.index();
      var candidates = identified.candidates();
      var newIndex = $_ci8ox7zjjd08mh0a.cycleBy(index, delta, 0, candidates.length - 1);
      return $_4izgwbwajd08mgn6.from(candidates[newIndex]);
    });
  };
  var $_44z691108jd08mh3k = { horizontal: horizontal };

  var schema$3 = [
    $_1mrawkx2jd08mgq2.strict('selector'),
    $_1mrawkx2jd08mgq2.defaulted('getInitial', $_4izgwbwajd08mgn6.none),
    $_1mrawkx2jd08mgq2.defaulted('execute', $_5p668pzyjd08mh1w.defaultExecute),
    $_1mrawkx2jd08mgq2.defaulted('executeOnMove', false)
  ];
  var findCurrent$1 = function (component, flowConfig) {
    return flowConfig.focusManager().get(component).bind(function (elem) {
      return $_edahi9zmjd08mh0g.closest(elem, flowConfig.selector());
    });
  };
  var execute$2 = function (component, simulatedEvent, flowConfig) {
    return findCurrent$1(component, flowConfig).bind(function (focused) {
      return flowConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$1 = function (component, flowConfig) {
    flowConfig.getInitial()(component).or($_edahi9zmjd08mh0g.descendant(component.element(), flowConfig.selector())).each(function (first) {
      flowConfig.focusManager().set(component, first);
    });
  };
  var moveLeft$1 = function (element, focused, info) {
    return $_44z691108jd08mh3k.horizontal(element, info.selector(), focused, -1);
  };
  var moveRight$1 = function (element, focused, info) {
    return $_44z691108jd08mh3k.horizontal(element, info.selector(), focused, +1);
  };
  var doMove$1 = function (movement) {
    return function (component, simulatedEvent, flowConfig) {
      return movement(component, simulatedEvent, flowConfig).bind(function () {
        return flowConfig.executeOnMove() ? execute$2(component, simulatedEvent, flowConfig) : $_4izgwbwajd08mgn6.some(true);
      });
    };
  };
  var getRules$2 = function (_) {
    return [
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.LEFT().concat($_6inwuyzejd08mgzg.UP())), doMove$1($_3tu3h1101jd08mh2f.west(moveLeft$1, moveRight$1))),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.RIGHT().concat($_6inwuyzejd08mgzg.DOWN())), doMove$1($_3tu3h1101jd08mh2f.east(moveLeft$1, moveRight$1))),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.ENTER()), execute$2),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.SPACE()), execute$2)
    ];
  };
  var getEvents$2 = $_8zkcijwbjd08mgn8.constant({});
  var getApis$2 = $_8zkcijwbjd08mgn8.constant({});
  var FlowType = $_6paqr9zfjd08mgzl.typical(schema$3, $_ginglqxqjd08mgsw.init, getRules$2, getEvents$2, getApis$2, $_4izgwbwajd08mgn6.some(focusIn$1));

  var outcome = $_2h5zjyxmjd08mgsp.immutableBag([
    'rowIndex',
    'columnIndex',
    'cell'
  ], []);
  var toCell = function (matrix, rowIndex, columnIndex) {
    return $_4izgwbwajd08mgn6.from(matrix[rowIndex]).bind(function (row) {
      return $_4izgwbwajd08mgn6.from(row[columnIndex]).map(function (cell) {
        return outcome({
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          cell: cell
        });
      });
    });
  };
  var cycleHorizontal$1 = function (matrix, rowIndex, startCol, deltaCol) {
    var row = matrix[rowIndex];
    var colsInRow = row.length;
    var newColIndex = $_ci8ox7zjjd08mh0a.cycleBy(startCol, deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var cycleVertical$1 = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_ci8ox7zjjd08mh0a.cycleBy(startRow, deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_ci8ox7zjjd08mh0a.cap(colIndex, 0, colsInNextRow - 1);
    return toCell(matrix, nextRowIndex, nextColIndex);
  };
  var moveHorizontal = function (matrix, rowIndex, startCol, deltaCol) {
    var row = matrix[rowIndex];
    var colsInRow = row.length;
    var newColIndex = $_ci8ox7zjjd08mh0a.cap(startCol + deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var moveVertical = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_ci8ox7zjjd08mh0a.cap(startRow + deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_ci8ox7zjjd08mh0a.cap(colIndex, 0, colsInNextRow - 1);
    return toCell(matrix, nextRowIndex, nextColIndex);
  };
  var cycleRight$1 = function (matrix, startRow, startCol) {
    return cycleHorizontal$1(matrix, startRow, startCol, +1);
  };
  var cycleLeft$1 = function (matrix, startRow, startCol) {
    return cycleHorizontal$1(matrix, startRow, startCol, -1);
  };
  var cycleUp$1 = function (matrix, startRow, startCol) {
    return cycleVertical$1(matrix, startCol, startRow, -1);
  };
  var cycleDown$1 = function (matrix, startRow, startCol) {
    return cycleVertical$1(matrix, startCol, startRow, +1);
  };
  var moveLeft$2 = function (matrix, startRow, startCol) {
    return moveHorizontal(matrix, startRow, startCol, -1);
  };
  var moveRight$2 = function (matrix, startRow, startCol) {
    return moveHorizontal(matrix, startRow, startCol, +1);
  };
  var moveUp = function (matrix, startRow, startCol) {
    return moveVertical(matrix, startCol, startRow, -1);
  };
  var moveDown = function (matrix, startRow, startCol) {
    return moveVertical(matrix, startCol, startRow, +1);
  };
  var $_fhan3r10ajd08mh41 = {
    cycleRight: cycleRight$1,
    cycleLeft: cycleLeft$1,
    cycleUp: cycleUp$1,
    cycleDown: cycleDown$1,
    moveLeft: moveLeft$2,
    moveRight: moveRight$2,
    moveUp: moveUp,
    moveDown: moveDown
  };

  var schema$4 = [
    $_1mrawkx2jd08mgq2.strictObjOf('selectors', [
      $_1mrawkx2jd08mgq2.strict('row'),
      $_1mrawkx2jd08mgq2.strict('cell')
    ]),
    $_1mrawkx2jd08mgq2.defaulted('cycles', true),
    $_1mrawkx2jd08mgq2.defaulted('previousSelector', $_4izgwbwajd08mgn6.none),
    $_1mrawkx2jd08mgq2.defaulted('execute', $_5p668pzyjd08mh1w.defaultExecute)
  ];
  var focusIn$2 = function (component, matrixConfig) {
    var focused = matrixConfig.previousSelector()(component).orThunk(function () {
      var selectors = matrixConfig.selectors();
      return $_edahi9zmjd08mh0g.descendant(component.element(), selectors.cell());
    });
    focused.each(function (cell) {
      matrixConfig.focusManager().set(component, cell);
    });
  };
  var execute$3 = function (component, simulatedEvent, matrixConfig) {
    return $_6h5kwkygjd08mgvc.search(component.element()).bind(function (focused) {
      return matrixConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var toMatrix = function (rows, matrixConfig) {
    return $_453g14w9jd08mgmy.map(rows, function (row) {
      return $_48w1m3zkjd08mh0b.descendants(row, matrixConfig.selectors().cell());
    });
  };
  var doMove$2 = function (ifCycle, ifMove) {
    return function (element, focused, matrixConfig) {
      var move = matrixConfig.cycles() ? ifCycle : ifMove;
      return $_edahi9zmjd08mh0g.closest(focused, matrixConfig.selectors().row()).bind(function (inRow) {
        var cellsInRow = $_48w1m3zkjd08mh0b.descendants(inRow, matrixConfig.selectors().cell());
        return $_84axww103jd08mh2j.findIndex(cellsInRow, focused).bind(function (colIndex) {
          var allRows = $_48w1m3zkjd08mh0b.descendants(element, matrixConfig.selectors().row());
          return $_84axww103jd08mh2j.findIndex(allRows, inRow).bind(function (rowIndex) {
            var matrix = toMatrix(allRows, matrixConfig);
            return move(matrix, rowIndex, colIndex).map(function (next) {
              return next.cell();
            });
          });
        });
      });
    };
  };
  var moveLeft$3 = doMove$2($_fhan3r10ajd08mh41.cycleLeft, $_fhan3r10ajd08mh41.moveLeft);
  var moveRight$3 = doMove$2($_fhan3r10ajd08mh41.cycleRight, $_fhan3r10ajd08mh41.moveRight);
  var moveNorth$1 = doMove$2($_fhan3r10ajd08mh41.cycleUp, $_fhan3r10ajd08mh41.moveUp);
  var moveSouth$1 = doMove$2($_fhan3r10ajd08mh41.cycleDown, $_fhan3r10ajd08mh41.moveDown);
  var getRules$3 = $_8zkcijwbjd08mgn8.constant([
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.LEFT()), $_3tu3h1101jd08mh2f.west(moveLeft$3, moveRight$3)),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.RIGHT()), $_3tu3h1101jd08mh2f.east(moveLeft$3, moveRight$3)),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.UP()), $_3tu3h1101jd08mh2f.north(moveNorth$1)),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.DOWN()), $_3tu3h1101jd08mh2f.south(moveSouth$1)),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.SPACE().concat($_6inwuyzejd08mgzg.ENTER())), execute$3)
  ]);
  var getEvents$3 = $_8zkcijwbjd08mgn8.constant({});
  var getApis$3 = $_8zkcijwbjd08mgn8.constant({});
  var MatrixType = $_6paqr9zfjd08mgzl.typical(schema$4, $_ginglqxqjd08mgsw.init, getRules$3, getEvents$3, getApis$3, $_4izgwbwajd08mgn6.some(focusIn$2));

  var schema$5 = [
    $_1mrawkx2jd08mgq2.strict('selector'),
    $_1mrawkx2jd08mgq2.defaulted('execute', $_5p668pzyjd08mh1w.defaultExecute),
    $_1mrawkx2jd08mgq2.defaulted('moveOnTab', false)
  ];
  var execute$4 = function (component, simulatedEvent, menuConfig) {
    return menuConfig.focusManager().get(component).bind(function (focused) {
      return menuConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$3 = function (component, menuConfig, simulatedEvent) {
    $_edahi9zmjd08mh0g.descendant(component.element(), menuConfig.selector()).each(function (first) {
      menuConfig.focusManager().set(component, first);
    });
  };
  var moveUp$1 = function (element, focused, info) {
    return $_44z691108jd08mh3k.horizontal(element, info.selector(), focused, -1);
  };
  var moveDown$1 = function (element, focused, info) {
    return $_44z691108jd08mh3k.horizontal(element, info.selector(), focused, +1);
  };
  var fireShiftTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_3tu3h1101jd08mh2f.move(moveUp$1)(component, simulatedEvent, menuConfig) : $_4izgwbwajd08mgn6.none();
  };
  var fireTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_3tu3h1101jd08mh2f.move(moveDown$1)(component, simulatedEvent, menuConfig) : $_4izgwbwajd08mgn6.none();
  };
  var getRules$4 = $_8zkcijwbjd08mgn8.constant([
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.UP()), $_3tu3h1101jd08mh2f.move(moveUp$1)),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.DOWN()), $_3tu3h1101jd08mh2f.move(moveDown$1)),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.and([
      $_bvrwqdzpjd08mh0o.isShift,
      $_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.TAB())
    ]), fireShiftTab),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.and([
      $_bvrwqdzpjd08mh0o.isNotShift,
      $_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.TAB())
    ]), fireTab),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.ENTER()), execute$4),
    $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.SPACE()), execute$4)
  ]);
  var getEvents$4 = $_8zkcijwbjd08mgn8.constant({});
  var getApis$4 = $_8zkcijwbjd08mgn8.constant({});
  var MenuType = $_6paqr9zfjd08mgzl.typical(schema$5, $_ginglqxqjd08mgsw.init, getRules$4, getEvents$4, getApis$4, $_4izgwbwajd08mgn6.some(focusIn$3));

  var schema$6 = [
    $_6uz7ybytjd08mgwm.onKeyboardHandler('onSpace'),
    $_6uz7ybytjd08mgwm.onKeyboardHandler('onEnter'),
    $_6uz7ybytjd08mgwm.onKeyboardHandler('onShiftEnter'),
    $_6uz7ybytjd08mgwm.onKeyboardHandler('onLeft'),
    $_6uz7ybytjd08mgwm.onKeyboardHandler('onRight'),
    $_6uz7ybytjd08mgwm.onKeyboardHandler('onTab'),
    $_6uz7ybytjd08mgwm.onKeyboardHandler('onShiftTab'),
    $_6uz7ybytjd08mgwm.onKeyboardHandler('onUp'),
    $_6uz7ybytjd08mgwm.onKeyboardHandler('onDown'),
    $_6uz7ybytjd08mgwm.onKeyboardHandler('onEscape'),
    $_1mrawkx2jd08mgq2.option('focusIn')
  ];
  var getRules$5 = function (component, simulatedEvent, executeInfo) {
    return [
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.SPACE()), executeInfo.onSpace()),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.and([
        $_bvrwqdzpjd08mh0o.isNotShift,
        $_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.ENTER())
      ]), executeInfo.onEnter()),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.and([
        $_bvrwqdzpjd08mh0o.isShift,
        $_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.ENTER())
      ]), executeInfo.onShiftEnter()),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.and([
        $_bvrwqdzpjd08mh0o.isShift,
        $_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.TAB())
      ]), executeInfo.onShiftTab()),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.and([
        $_bvrwqdzpjd08mh0o.isNotShift,
        $_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.TAB())
      ]), executeInfo.onTab()),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.UP()), executeInfo.onUp()),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.DOWN()), executeInfo.onDown()),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.LEFT()), executeInfo.onLeft()),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.RIGHT()), executeInfo.onRight()),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.SPACE()), executeInfo.onSpace()),
      $_4wb7kgzojd08mh0l.rule($_bvrwqdzpjd08mh0o.inSet($_6inwuyzejd08mgzg.ESCAPE()), executeInfo.onEscape())
    ];
  };
  var focusIn$4 = function (component, executeInfo) {
    return executeInfo.focusIn().bind(function (f) {
      return f(component, executeInfo);
    });
  };
  var getEvents$5 = $_8zkcijwbjd08mgn8.constant({});
  var getApis$5 = $_8zkcijwbjd08mgn8.constant({});
  var SpecialType = $_6paqr9zfjd08mgzl.typical(schema$6, $_ginglqxqjd08mgsw.init, getRules$5, getEvents$5, getApis$5, $_4izgwbwajd08mgn6.some(focusIn$4));

  var $_86yuv4zbjd08mgyw = {
    acyclic: AcyclicType.schema(),
    cyclic: CyclicType.schema(),
    flow: FlowType.schema(),
    flatgrid: FlatgridType.schema(),
    matrix: MatrixType.schema(),
    execution: ExecutionType.schema(),
    menu: MenuType.schema(),
    special: SpecialType.schema()
  };

  var Keying = $_voa9kw4jd08mglm.createModes({
    branchKey: 'mode',
    branches: $_86yuv4zbjd08mgyw,
    name: 'keying',
    active: {
      events: function (keyingConfig, keyingState) {
        var handler = keyingConfig.handler();
        return handler.toEvents(keyingConfig, keyingState);
      }
    },
    apis: {
      focusIn: function (component) {
        component.getSystem().triggerFocus(component.element(), component.element());
      },
      setGridSize: function (component, keyConfig, keyState, numRows, numColumns) {
        if (!$_96dvjsx6jd08mgqy.hasKey(keyState, 'setGridSize')) {
          console.error('Layout does not support setGridSize');
        } else {
          keyState.setGridSize(numRows, numColumns);
        }
      }
    },
    state: $_g12k64100jd08mh27
  });

  var field$1 = function (name, forbidden) {
    return $_1mrawkx2jd08mgq2.defaultedObjOf(name, {}, $_453g14w9jd08mgmy.map(forbidden, function (f) {
      return $_1mrawkx2jd08mgq2.forbid(f.name(), 'Cannot configure ' + f.name() + ' for ' + name);
    }).concat([$_1mrawkx2jd08mgq2.state('dump', $_8zkcijwbjd08mgn8.identity)]));
  };
  var get$5 = function (data) {
    return data.dump();
  };
  var $_8tr5o010djd08mh4k = {
    field: field$1,
    get: get$5
  };

  var unique = 0;
  var generate$1 = function (prefix) {
    var date = new Date();
    var time = date.getTime();
    var random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
  };
  var $_1rgeik10gjd08mh59 = { generate: generate$1 };

  var premadeTag = $_1rgeik10gjd08mh59.generate('alloy-premade');
  var apiConfig = $_1rgeik10gjd08mh59.generate('api');
  var premade = function (comp) {
    return $_96dvjsx6jd08mgqy.wrap(premadeTag, comp);
  };
  var getPremade = function (spec) {
    return $_96dvjsx6jd08mgqy.readOptFrom(spec, premadeTag);
  };
  var makeApi = function (f) {
    return $_2c9oeoxjjd08mgs6.markAsSketchApi(function (component) {
      var args = Array.prototype.slice.call(arguments, 0);
      var spi = component.config(apiConfig);
      return f.apply(undefined, [spi].concat(args));
    }, f);
  };
  var $_4l6tow10fjd08mh4y = {
    apiConfig: $_8zkcijwbjd08mgn8.constant(apiConfig),
    makeApi: makeApi,
    premade: premade,
    getPremade: getPremade
  };

  var adt$2 = $_dv5x6ax4jd08mgqe.generate([
    { required: ['data'] },
    { external: ['data'] },
    { optional: ['data'] },
    { group: ['data'] }
  ]);
  var fFactory = $_1mrawkx2jd08mgq2.defaulted('factory', { sketch: $_8zkcijwbjd08mgn8.identity });
  var fSchema = $_1mrawkx2jd08mgq2.defaulted('schema', []);
  var fName = $_1mrawkx2jd08mgq2.strict('name');
  var fPname = $_1mrawkx2jd08mgq2.field('pname', 'pname', $_dlh1w7x3jd08mgq8.defaultedThunk(function (typeSpec) {
    return '<alloy.' + $_1rgeik10gjd08mh59.generate(typeSpec.name) + '>';
  }), $_6eo7r6xhjd08mgrx.anyValue());
  var fDefaults = $_1mrawkx2jd08mgq2.defaulted('defaults', $_8zkcijwbjd08mgn8.constant({}));
  var fOverrides = $_1mrawkx2jd08mgq2.defaulted('overrides', $_8zkcijwbjd08mgn8.constant({}));
  var requiredSpec = $_6eo7r6xhjd08mgrx.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var externalSpec = $_6eo7r6xhjd08mgrx.objOf([
    fFactory,
    fSchema,
    fName,
    fDefaults,
    fOverrides
  ]);
  var optionalSpec = $_6eo7r6xhjd08mgrx.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var groupSpec = $_6eo7r6xhjd08mgrx.objOf([
    fFactory,
    fSchema,
    fName,
    $_1mrawkx2jd08mgq2.strict('unit'),
    fPname,
    fDefaults,
    fOverrides
  ]);
  var asNamedPart = function (part) {
    return part.fold($_4izgwbwajd08mgn6.some, $_4izgwbwajd08mgn6.none, $_4izgwbwajd08mgn6.some, $_4izgwbwajd08mgn6.some);
  };
  var name$1 = function (part) {
    var get = function (data) {
      return data.name();
    };
    return part.fold(get, get, get, get);
  };
  var asCommon = function (part) {
    return part.fold($_8zkcijwbjd08mgn8.identity, $_8zkcijwbjd08mgn8.identity, $_8zkcijwbjd08mgn8.identity, $_8zkcijwbjd08mgn8.identity);
  };
  var convert = function (adtConstructor, partSpec) {
    return function (spec) {
      var data = $_6eo7r6xhjd08mgrx.asStructOrDie('Converting part type', partSpec, spec);
      return adtConstructor(data);
    };
  };
  var $_eertgd10kjd08mh62 = {
    required: convert(adt$2.required, requiredSpec),
    external: convert(adt$2.external, externalSpec),
    optional: convert(adt$2.optional, optionalSpec),
    group: convert(adt$2.group, groupSpec),
    asNamedPart: asNamedPart,
    name: name$1,
    asCommon: asCommon,
    original: $_8zkcijwbjd08mgn8.constant('entirety')
  };

  var placeholder = 'placeholder';
  var adt$3 = $_dv5x6ax4jd08mgqe.generate([
    {
      single: [
        'required',
        'valueThunk'
      ]
    },
    {
      multiple: [
        'required',
        'valueThunks'
      ]
    }
  ]);
  var isSubstitute = function (uiType) {
    return $_453g14w9jd08mgmy.contains([placeholder], uiType);
  };
  var subPlaceholder = function (owner, detail, compSpec, placeholders) {
    if (owner.exists(function (o) {
        return o !== compSpec.owner;
      }))
      return adt$3.single(true, $_8zkcijwbjd08mgn8.constant(compSpec));
    return $_96dvjsx6jd08mgqy.readOptFrom(placeholders, compSpec.name).fold(function () {
      throw new Error('Unknown placeholder component: ' + compSpec.name + '\nKnown: [' + $_1xoayfx0jd08mgpm.keys(placeholders) + ']\nNamespace: ' + owner.getOr('none') + '\nSpec: ' + $_ggze9axfjd08mgrt.stringify(compSpec, null, 2));
    }, function (newSpec) {
      return newSpec.replace();
    });
  };
  var scan = function (owner, detail, compSpec, placeholders) {
    if (compSpec.uiType === placeholder)
      return subPlaceholder(owner, detail, compSpec, placeholders);
    else
      return adt$3.single(false, $_8zkcijwbjd08mgn8.constant(compSpec));
  };
  var substitute = function (owner, detail, compSpec, placeholders) {
    var base = scan(owner, detail, compSpec, placeholders);
    return base.fold(function (req, valueThunk) {
      var value = valueThunk(detail, compSpec.config, compSpec.validated);
      var childSpecs = $_96dvjsx6jd08mgqy.readOptFrom(value, 'components').getOr([]);
      var substituted = $_453g14w9jd08mgmy.bind(childSpecs, function (c) {
        return substitute(owner, detail, c, placeholders);
      });
      return [$_25kgk5wyjd08mgpk.deepMerge(value, { components: substituted })];
    }, function (req, valuesThunk) {
      var values = valuesThunk(detail, compSpec.config, compSpec.validated);
      return values;
    });
  };
  var substituteAll = function (owner, detail, components, placeholders) {
    return $_453g14w9jd08mgmy.bind(components, function (c) {
      return substitute(owner, detail, c, placeholders);
    });
  };
  var oneReplace = function (label, replacements) {
    var called = false;
    var used = function () {
      return called;
    };
    var replace = function () {
      if (called === true)
        throw new Error('Trying to use the same placeholder more than once: ' + label);
      called = true;
      return replacements;
    };
    var required = function () {
      return replacements.fold(function (req, _) {
        return req;
      }, function (req, _) {
        return req;
      });
    };
    return {
      name: $_8zkcijwbjd08mgn8.constant(label),
      required: required,
      used: used,
      replace: replace
    };
  };
  var substitutePlaces = function (owner, detail, components, placeholders) {
    var ps = $_1xoayfx0jd08mgpm.map(placeholders, function (ph, name) {
      return oneReplace(name, ph);
    });
    var outcome = substituteAll(owner, detail, components, ps);
    $_1xoayfx0jd08mgpm.each(ps, function (p) {
      if (p.used() === false && p.required()) {
        throw new Error('Placeholder: ' + p.name() + ' was not found in components list\nNamespace: ' + owner.getOr('none') + '\nComponents: ' + $_ggze9axfjd08mgrt.stringify(detail.components(), null, 2));
      }
    });
    return outcome;
  };
  var singleReplace = function (detail, p) {
    var replacement = p;
    return replacement.fold(function (req, valueThunk) {
      return [valueThunk(detail)];
    }, function (req, valuesThunk) {
      return valuesThunk(detail);
    });
  };
  var $_et865e10ljd08mh6c = {
    single: adt$3.single,
    multiple: adt$3.multiple,
    isSubstitute: isSubstitute,
    placeholder: $_8zkcijwbjd08mgn8.constant(placeholder),
    substituteAll: substituteAll,
    substitutePlaces: substitutePlaces,
    singleReplace: singleReplace
  };

  var combine = function (detail, data, partSpec, partValidated) {
    var spec = partSpec;
    return $_25kgk5wyjd08mgpk.deepMerge(data.defaults()(detail, partSpec, partValidated), partSpec, { uid: detail.partUids()[data.name()] }, data.overrides()(detail, partSpec, partValidated), { 'debug.sketcher': $_96dvjsx6jd08mgqy.wrap('part-' + data.name(), spec) });
  };
  var subs = function (owner, detail, parts) {
    var internals = {};
    var externals = {};
    $_453g14w9jd08mgmy.each(parts, function (part) {
      part.fold(function (data) {
        internals[data.pname()] = $_et865e10ljd08mh6c.single(true, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        var partSpec = detail.parts()[data.name()]();
        externals[data.name()] = $_8zkcijwbjd08mgn8.constant(combine(detail, data, partSpec[$_eertgd10kjd08mh62.original()]()));
      }, function (data) {
        internals[data.pname()] = $_et865e10ljd08mh6c.single(false, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        internals[data.pname()] = $_et865e10ljd08mh6c.multiple(true, function (detail, _partSpec, _partValidated) {
          var units = detail[data.name()]();
          return $_453g14w9jd08mgmy.map(units, function (u) {
            return data.factory().sketch($_25kgk5wyjd08mgpk.deepMerge(data.defaults()(detail, u), u, data.overrides()(detail, u)));
          });
        });
      });
    });
    return {
      internals: $_8zkcijwbjd08mgn8.constant(internals),
      externals: $_8zkcijwbjd08mgn8.constant(externals)
    };
  };
  var $_9zr0ur10jjd08mh5t = { subs: subs };

  var generate$2 = function (owner, parts) {
    var r = {};
    $_453g14w9jd08mgmy.each(parts, function (part) {
      $_eertgd10kjd08mh62.asNamedPart(part).each(function (np) {
        var g = doGenerateOne(owner, np.pname());
        r[np.name()] = function (config) {
          var validated = $_6eo7r6xhjd08mgrx.asRawOrDie('Part: ' + np.name() + ' in ' + owner, $_6eo7r6xhjd08mgrx.objOf(np.schema()), config);
          return $_25kgk5wyjd08mgpk.deepMerge(g, {
            config: config,
            validated: validated
          });
        };
      });
    });
    return r;
  };
  var doGenerateOne = function (owner, pname) {
    return {
      uiType: $_et865e10ljd08mh6c.placeholder(),
      owner: owner,
      name: pname
    };
  };
  var generateOne = function (owner, pname, config) {
    return {
      uiType: $_et865e10ljd08mh6c.placeholder(),
      owner: owner,
      name: pname,
      config: config,
      validated: {}
    };
  };
  var schemas = function (parts) {
    return $_453g14w9jd08mgmy.bind(parts, function (part) {
      return part.fold($_4izgwbwajd08mgn6.none, $_4izgwbwajd08mgn6.some, $_4izgwbwajd08mgn6.none, $_4izgwbwajd08mgn6.none).map(function (data) {
        return $_1mrawkx2jd08mgq2.strictObjOf(data.name(), data.schema().concat([$_6uz7ybytjd08mgwm.snapshot($_eertgd10kjd08mh62.original())]));
      }).toArray();
    });
  };
  var names = function (parts) {
    return $_453g14w9jd08mgmy.map(parts, $_eertgd10kjd08mh62.name);
  };
  var substitutes = function (owner, detail, parts) {
    return $_9zr0ur10jjd08mh5t.subs(owner, detail, parts);
  };
  var components = function (owner, detail, internals) {
    return $_et865e10ljd08mh6c.substitutePlaces($_4izgwbwajd08mgn6.some(owner), detail, detail.components(), internals);
  };
  var getPart = function (component, detail, partKey) {
    var uid = detail.partUids()[partKey];
    return component.getSystem().getByUid(uid).toOption();
  };
  var getPartOrDie = function (component, detail, partKey) {
    return getPart(component, detail, partKey).getOrDie('Could not find part: ' + partKey);
  };
  var getParts = function (component, detail, partKeys) {
    var r = {};
    var uids = detail.partUids();
    var system = component.getSystem();
    $_453g14w9jd08mgmy.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]);
    });
    return $_1xoayfx0jd08mgpm.map(r, $_8zkcijwbjd08mgn8.constant);
  };
  var getAllParts = function (component, detail) {
    var system = component.getSystem();
    return $_1xoayfx0jd08mgpm.map(detail.partUids(), function (pUid, k) {
      return $_8zkcijwbjd08mgn8.constant(system.getByUid(pUid));
    });
  };
  var getPartsOrDie = function (component, detail, partKeys) {
    var r = {};
    var uids = detail.partUids();
    var system = component.getSystem();
    $_453g14w9jd08mgmy.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]).getOrDie();
    });
    return $_1xoayfx0jd08mgpm.map(r, $_8zkcijwbjd08mgn8.constant);
  };
  var defaultUids = function (baseUid, partTypes) {
    var partNames = names(partTypes);
    return $_96dvjsx6jd08mgqy.wrapAll($_453g14w9jd08mgmy.map(partNames, function (pn) {
      return {
        key: pn,
        value: baseUid + '-' + pn
      };
    }));
  };
  var defaultUidsSchema = function (partTypes) {
    return $_1mrawkx2jd08mgq2.field('partUids', 'partUids', $_dlh1w7x3jd08mgq8.mergeWithThunk(function (spec) {
      return defaultUids(spec.uid, partTypes);
    }), $_6eo7r6xhjd08mgrx.anyValue());
  };
  var $_fyge8g10ijd08mh5e = {
    generate: generate$2,
    generateOne: generateOne,
    schemas: schemas,
    names: names,
    substitutes: substitutes,
    components: components,
    defaultUids: defaultUids,
    defaultUidsSchema: defaultUidsSchema,
    getAllParts: getAllParts,
    getPart: getPart,
    getPartOrDie: getPartOrDie,
    getParts: getParts,
    getPartsOrDie: getPartsOrDie
  };

  var prefix$1 = 'alloy-id-';
  var idAttr = 'data-alloy-id';
  var $_9254j110njd08mh6y = {
    prefix: $_8zkcijwbjd08mgn8.constant(prefix$1),
    idAttr: $_8zkcijwbjd08mgn8.constant(idAttr)
  };

  var prefix$2 = $_9254j110njd08mh6y.prefix();
  var idAttr$1 = $_9254j110njd08mh6y.idAttr();
  var write = function (label, elem) {
    var id = $_1rgeik10gjd08mh59.generate(prefix$2 + label);
    $_auw0hixwjd08mgt8.set(elem, idAttr$1, id);
    return id;
  };
  var writeOnly = function (elem, uid) {
    $_auw0hixwjd08mgt8.set(elem, idAttr$1, uid);
  };
  var read$2 = function (elem) {
    var id = $_9323z1xxjd08mgti.isElement(elem) ? $_auw0hixwjd08mgt8.get(elem, idAttr$1) : null;
    return $_4izgwbwajd08mgn6.from(id);
  };
  var find$3 = function (container, id) {
    return $_edahi9zmjd08mh0g.descendant(container, id);
  };
  var generate$3 = function (prefix) {
    return $_1rgeik10gjd08mh59.generate(prefix);
  };
  var revoke = function (elem) {
    $_auw0hixwjd08mgt8.remove(elem, idAttr$1);
  };
  var $_90bcgv10mjd08mh6p = {
    revoke: revoke,
    write: write,
    writeOnly: writeOnly,
    read: read$2,
    find: find$3,
    generate: generate$3,
    attribute: $_8zkcijwbjd08mgn8.constant(idAttr$1)
  };

  var getPartsSchema = function (partNames, _optPartNames, _owner) {
    var owner = _owner !== undefined ? _owner : 'Unknown owner';
    var fallbackThunk = function () {
      return [$_6uz7ybytjd08mgwm.output('partUids', {})];
    };
    var optPartNames = _optPartNames !== undefined ? _optPartNames : fallbackThunk();
    if (partNames.length === 0 && optPartNames.length === 0)
      return fallbackThunk();
    var partsSchema = $_1mrawkx2jd08mgq2.strictObjOf('parts', $_453g14w9jd08mgmy.flatten([
      $_453g14w9jd08mgmy.map(partNames, $_1mrawkx2jd08mgq2.strict),
      $_453g14w9jd08mgmy.map(optPartNames, function (optPart) {
        return $_1mrawkx2jd08mgq2.defaulted(optPart, $_et865e10ljd08mh6c.single(false, function () {
          throw new Error('The optional part: ' + optPart + ' was not specified in the config, but it was used in components');
        }));
      })
    ]));
    var partUidsSchema = $_1mrawkx2jd08mgq2.state('partUids', function (spec) {
      if (!$_96dvjsx6jd08mgqy.hasKey(spec, 'parts')) {
        throw new Error('Part uid definition for owner: ' + owner + ' requires "parts"\nExpected parts: ' + partNames.join(', ') + '\nSpec: ' + $_ggze9axfjd08mgrt.stringify(spec, null, 2));
      }
      var uids = $_1xoayfx0jd08mgpm.map(spec.parts, function (v, k) {
        return $_96dvjsx6jd08mgqy.readOptFrom(v, 'uid').getOrThunk(function () {
          return spec.uid + '-' + k;
        });
      });
      return uids;
    });
    return [
      partsSchema,
      partUidsSchema
    ];
  };
  var base$1 = function (label, partSchemas, partUidsSchemas, spec) {
    var ps = partSchemas.length > 0 ? [$_1mrawkx2jd08mgq2.strictObjOf('parts', partSchemas)] : [];
    return ps.concat([
      $_1mrawkx2jd08mgq2.strict('uid'),
      $_1mrawkx2jd08mgq2.defaulted('dom', {}),
      $_1mrawkx2jd08mgq2.defaulted('components', []),
      $_6uz7ybytjd08mgwm.snapshot('originalSpec'),
      $_1mrawkx2jd08mgq2.defaulted('debug.sketcher', {})
    ]).concat(partUidsSchemas);
  };
  var asRawOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, spec, partUidsSchemas);
    return $_6eo7r6xhjd08mgrx.asRawOrDie(label + ' [SpecSchema]', $_6eo7r6xhjd08mgrx.objOfOnly(baseS.concat(schema)), spec);
  };
  var asStructOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, partUidsSchemas, spec);
    return $_6eo7r6xhjd08mgrx.asStructOrDie(label + ' [SpecSchema]', $_6eo7r6xhjd08mgrx.objOfOnly(baseS.concat(schema)), spec);
  };
  var extend = function (builder, original, nu) {
    var newSpec = $_25kgk5wyjd08mgpk.deepMerge(original, nu);
    return builder(newSpec);
  };
  var addBehaviours = function (original, behaviours) {
    return $_25kgk5wyjd08mgpk.deepMerge(original, behaviours);
  };
  var $_et3qj810ojd08mh71 = {
    asRawOrDie: asRawOrDie$1,
    asStructOrDie: asStructOrDie$1,
    addBehaviours: addBehaviours,
    getPartsSchema: getPartsSchema,
    extend: extend
  };

  var single = function (owner, schema, factory, spec) {
    var specWithUid = supplyUid(spec);
    var detail = $_et3qj810ojd08mh71.asStructOrDie(owner, schema, specWithUid, [], []);
    return $_25kgk5wyjd08mgpk.deepMerge(factory(detail, specWithUid), { 'debug.sketcher': $_96dvjsx6jd08mgqy.wrap(owner, spec) });
  };
  var composite = function (owner, schema, partTypes, factory, spec) {
    var specWithUid = supplyUid(spec);
    var partSchemas = $_fyge8g10ijd08mh5e.schemas(partTypes);
    var partUidsSchema = $_fyge8g10ijd08mh5e.defaultUidsSchema(partTypes);
    var detail = $_et3qj810ojd08mh71.asStructOrDie(owner, schema, specWithUid, partSchemas, [partUidsSchema]);
    var subs = $_fyge8g10ijd08mh5e.substitutes(owner, detail, partTypes);
    var components = $_fyge8g10ijd08mh5e.components(owner, detail, subs.internals());
    return $_25kgk5wyjd08mgpk.deepMerge(factory(detail, components, specWithUid, subs.externals()), { 'debug.sketcher': $_96dvjsx6jd08mgqy.wrap(owner, spec) });
  };
  var supplyUid = function (spec) {
    return $_25kgk5wyjd08mgpk.deepMerge({ uid: $_90bcgv10mjd08mh6p.generate('uid') }, spec);
  };
  var $_c50pby10hjd08mh5a = {
    supplyUid: supplyUid,
    single: single,
    composite: composite
  };

  var singleSchema = $_6eo7r6xhjd08mgrx.objOfOnly([
    $_1mrawkx2jd08mgq2.strict('name'),
    $_1mrawkx2jd08mgq2.strict('factory'),
    $_1mrawkx2jd08mgq2.strict('configFields'),
    $_1mrawkx2jd08mgq2.defaulted('apis', {}),
    $_1mrawkx2jd08mgq2.defaulted('extraApis', {})
  ]);
  var compositeSchema = $_6eo7r6xhjd08mgrx.objOfOnly([
    $_1mrawkx2jd08mgq2.strict('name'),
    $_1mrawkx2jd08mgq2.strict('factory'),
    $_1mrawkx2jd08mgq2.strict('configFields'),
    $_1mrawkx2jd08mgq2.strict('partFields'),
    $_1mrawkx2jd08mgq2.defaulted('apis', {}),
    $_1mrawkx2jd08mgq2.defaulted('extraApis', {})
  ]);
  var single$1 = function (rawConfig) {
    var config = $_6eo7r6xhjd08mgrx.asRawOrDie('Sketcher for ' + rawConfig.name, singleSchema, rawConfig);
    var sketch = function (spec) {
      return $_c50pby10hjd08mh5a.single(config.name, config.configFields, config.factory, spec);
    };
    var apis = $_1xoayfx0jd08mgpm.map(config.apis, $_4l6tow10fjd08mh4y.makeApi);
    var extraApis = $_1xoayfx0jd08mgpm.map(config.extraApis, function (f, k) {
      return $_2c9oeoxjjd08mgs6.markAsExtraApi(f, k);
    });
    return $_25kgk5wyjd08mgpk.deepMerge({
      name: $_8zkcijwbjd08mgn8.constant(config.name),
      partFields: $_8zkcijwbjd08mgn8.constant([]),
      configFields: $_8zkcijwbjd08mgn8.constant(config.configFields),
      sketch: sketch
    }, apis, extraApis);
  };
  var composite$1 = function (rawConfig) {
    var config = $_6eo7r6xhjd08mgrx.asRawOrDie('Sketcher for ' + rawConfig.name, compositeSchema, rawConfig);
    var sketch = function (spec) {
      return $_c50pby10hjd08mh5a.composite(config.name, config.configFields, config.partFields, config.factory, spec);
    };
    var parts = $_fyge8g10ijd08mh5e.generate(config.name, config.partFields);
    var apis = $_1xoayfx0jd08mgpm.map(config.apis, $_4l6tow10fjd08mh4y.makeApi);
    var extraApis = $_1xoayfx0jd08mgpm.map(config.extraApis, function (f, k) {
      return $_2c9oeoxjjd08mgs6.markAsExtraApi(f, k);
    });
    return $_25kgk5wyjd08mgpk.deepMerge({
      name: $_8zkcijwbjd08mgn8.constant(config.name),
      partFields: $_8zkcijwbjd08mgn8.constant(config.partFields),
      configFields: $_8zkcijwbjd08mgn8.constant(config.configFields),
      sketch: sketch,
      parts: $_8zkcijwbjd08mgn8.constant(parts)
    }, apis, extraApis);
  };
  var $_88109v10ejd08mh4q = {
    single: single$1,
    composite: composite$1
  };

  var events$4 = function (optAction) {
    var executeHandler = function (action) {
      return $_eexaurw6jd08mgmg.run($_30aqx5wwjd08mgpa.execute(), function (component, simulatedEvent) {
        action(component);
        simulatedEvent.stop();
      });
    };
    var onClick = function (component, simulatedEvent) {
      simulatedEvent.stop();
      $_f6t3w1wvjd08mgp1.emitExecute(component);
    };
    var onMousedown = function (component, simulatedEvent) {
      simulatedEvent.cut();
    };
    var pointerEvents = $_dymoxnwgjd08mgng.detect().deviceType.isTouch() ? [$_eexaurw6jd08mgmg.run($_30aqx5wwjd08mgpa.tap(), onClick)] : [
      $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.click(), onClick),
      $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.mousedown(), onMousedown)
    ];
    return $_eexaurw6jd08mgmg.derive($_453g14w9jd08mgmy.flatten([
      optAction.map(executeHandler).toArray(),
      pointerEvents
    ]));
  };
  var $_8zpnou10pjd08mh7g = { events: events$4 };

  var factory = function (detail, spec) {
    var events = $_8zpnou10pjd08mh7g.events(detail.action());
    var optType = $_96dvjsx6jd08mgqy.readOptFrom(detail.dom(), 'attributes').bind($_96dvjsx6jd08mgqy.readOpt('type'));
    var optTag = $_96dvjsx6jd08mgqy.readOptFrom(detail.dom(), 'tag');
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: detail.components(),
      events: events,
      behaviours: $_25kgk5wyjd08mgpk.deepMerge($_voa9kw4jd08mglm.derive([
        Focusing.config({}),
        Keying.config({
          mode: 'execution',
          useSpace: true,
          useEnter: true
        })
      ]), $_8tr5o010djd08mh4k.get(detail.buttonBehaviours())),
      domModification: {
        attributes: $_25kgk5wyjd08mgpk.deepMerge(optType.fold(function () {
          return optTag.is('button') ? { type: 'button' } : {};
        }, function (t) {
          return {};
        }), { role: detail.role().getOr('button') })
      },
      eventOrder: detail.eventOrder()
    };
  };
  var Button = $_88109v10ejd08mh4q.single({
    name: 'Button',
    factory: factory,
    configFields: [
      $_1mrawkx2jd08mgq2.defaulted('uid', undefined),
      $_1mrawkx2jd08mgq2.strict('dom'),
      $_1mrawkx2jd08mgq2.defaulted('components', []),
      $_8tr5o010djd08mh4k.field('buttonBehaviours', [
        Focusing,
        Keying
      ]),
      $_1mrawkx2jd08mgq2.option('action'),
      $_1mrawkx2jd08mgq2.option('role'),
      $_1mrawkx2jd08mgq2.defaulted('eventOrder', {})
    ]
  });

  var getAttrs = function (elem) {
    var attributes = elem.dom().attributes !== undefined ? elem.dom().attributes : [];
    return $_453g14w9jd08mgmy.foldl(attributes, function (b, attr) {
      if (attr.name === 'class')
        return b;
      else
        return $_25kgk5wyjd08mgpk.deepMerge(b, $_96dvjsx6jd08mgqy.wrap(attr.name, attr.value));
    }, {});
  };
  var getClasses = function (elem) {
    return Array.prototype.slice.call(elem.dom().classList, 0);
  };
  var fromHtml$2 = function (html) {
    var elem = $_3visdkwtjd08mgor.fromHtml(html);
    var children = $_4uhv6ey3jd08mgu3.children(elem);
    var attrs = getAttrs(elem);
    var classes = getClasses(elem);
    var contents = children.length === 0 ? {} : { innerHtml: $_c574qmybjd08mgv4.get(elem) };
    return $_25kgk5wyjd08mgpk.deepMerge({
      tag: $_9323z1xxjd08mgti.name(elem),
      classes: classes,
      attributes: attrs
    }, contents);
  };
  var sketch = function (sketcher, html, config) {
    return sketcher.sketch($_25kgk5wyjd08mgpk.deepMerge({ dom: fromHtml$2(html) }, config));
  };
  var $_c7awb110rjd08mh7n = {
    fromHtml: fromHtml$2,
    sketch: sketch
  };

  var dom$1 = function (rawHtml) {
    var html = $_3btv0xwpjd08mgoe.supplant(rawHtml, { prefix: $_ete72zz1jd08mgy0.prefix() });
    return $_c7awb110rjd08mh7n.fromHtml(html);
  };
  var spec = function (rawHtml) {
    var sDom = dom$1(rawHtml);
    return { dom: sDom };
  };
  var $_3iuzq510qjd08mh7l = {
    dom: dom$1,
    spec: spec
  };

  var forToolbarCommand = function (editor, command) {
    return forToolbar(command, function () {
      editor.execCommand(command);
    }, {});
  };
  var getToggleBehaviours = function (command) {
    return $_voa9kw4jd08mglm.derive([
      Toggling.config({
        toggleClass: $_ete72zz1jd08mgy0.resolve('toolbar-button-selected'),
        toggleOnExecute: false,
        aria: { mode: 'pressed' }
      }),
      $_cnlikcz0jd08mgxw.format(command, function (button, status) {
        var toggle = status ? Toggling.on : Toggling.off;
        toggle(button);
      })
    ]);
  };
  var forToolbarStateCommand = function (editor, command) {
    var extraBehaviours = getToggleBehaviours(command);
    return forToolbar(command, function () {
      editor.execCommand(command);
    }, extraBehaviours);
  };
  var forToolbarStateAction = function (editor, clazz, command, action) {
    var extraBehaviours = getToggleBehaviours(command);
    return forToolbar(clazz, action, extraBehaviours);
  };
  var forToolbar = function (clazz, action, extraBehaviours) {
    return Button.sketch({
      dom: $_3iuzq510qjd08mh7l.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-' + clazz + ' ${prefix}-icon"></span>'),
      action: action,
      buttonBehaviours: $_25kgk5wyjd08mgpk.deepMerge($_voa9kw4jd08mglm.derive([Unselecting.config({})]), extraBehaviours)
    });
  };
  var $_9w4shzz2jd08mgy1 = {
    forToolbar: forToolbar,
    forToolbarCommand: forToolbarCommand,
    forToolbarStateAction: forToolbarStateAction,
    forToolbarStateCommand: forToolbarStateCommand
  };

  var reduceBy = function (value, min, max, step) {
    if (value < min)
      return value;
    else if (value > max)
      return max;
    else if (value === min)
      return min - 1;
    else
      return Math.max(min, value - step);
  };
  var increaseBy = function (value, min, max, step) {
    if (value > max)
      return value;
    else if (value < min)
      return min;
    else if (value === max)
      return max + 1;
    else
      return Math.min(max, value + step);
  };
  var capValue = function (value, min, max) {
    return Math.max(min, Math.min(max, value));
  };
  var snapValueOfX = function (bounds, value, min, max, step, snapStart) {
    return snapStart.fold(function () {
      var initValue = value - min;
      var extraValue = Math.round(initValue / step) * step;
      return capValue(min + extraValue, min - 1, max + 1);
    }, function (start) {
      var remainder = (value - start) % step;
      var adjustment = Math.round(remainder / step);
      var rawSteps = Math.floor((value - start) / step);
      var maxSteps = Math.floor((max - start) / step);
      var numSteps = Math.min(maxSteps, rawSteps + adjustment);
      var r = start + numSteps * step;
      return Math.max(start, r);
    });
  };
  var findValueOfX = function (bounds, min, max, xValue, step, snapToGrid, snapStart) {
    var range = max - min;
    if (xValue < bounds.left)
      return min - 1;
    else if (xValue > bounds.right)
      return max + 1;
    else {
      var xOffset = Math.min(bounds.right, Math.max(xValue, bounds.left)) - bounds.left;
      var newValue = capValue(xOffset / bounds.width * range + min, min - 1, max + 1);
      var roundedValue = Math.round(newValue);
      return snapToGrid && newValue >= min && newValue <= max ? snapValueOfX(bounds, newValue, min, max, step, snapStart) : roundedValue;
    }
  };
  var $_3218wd10wjd08mh8p = {
    reduceBy: reduceBy,
    increaseBy: increaseBy,
    findValueOfX: findValueOfX
  };

  var changeEvent = 'slider.change.value';
  var isTouch = $_dymoxnwgjd08mgng.detect().deviceType.isTouch();
  var getEventSource = function (simulatedEvent) {
    var evt = simulatedEvent.event().raw();
    if (isTouch && evt.touches !== undefined && evt.touches.length === 1)
      return $_4izgwbwajd08mgn6.some(evt.touches[0]);
    else if (isTouch && evt.touches !== undefined)
      return $_4izgwbwajd08mgn6.none();
    else if (!isTouch && evt.clientX !== undefined)
      return $_4izgwbwajd08mgn6.some(evt);
    else
      return $_4izgwbwajd08mgn6.none();
  };
  var getEventX = function (simulatedEvent) {
    var spot = getEventSource(simulatedEvent);
    return spot.map(function (s) {
      return s.clientX;
    });
  };
  var fireChange = function (component, value) {
    $_f6t3w1wvjd08mgp1.emitWith(component, changeEvent, { value: value });
  };
  var moveRightFromLedge = function (ledge, detail) {
    fireChange(ledge, detail.min());
  };
  var moveLeftFromRedge = function (redge, detail) {
    fireChange(redge, detail.max());
  };
  var setToRedge = function (redge, detail) {
    fireChange(redge, detail.max() + 1);
  };
  var setToLedge = function (ledge, detail) {
    fireChange(ledge, detail.min() - 1);
  };
  var setToX = function (spectrum, spectrumBounds, detail, xValue) {
    var value = $_3218wd10wjd08mh8p.findValueOfX(spectrumBounds, detail.min(), detail.max(), xValue, detail.stepSize(), detail.snapToGrid(), detail.snapStart());
    fireChange(spectrum, value);
  };
  var setXFromEvent = function (spectrum, detail, spectrumBounds, simulatedEvent) {
    return getEventX(simulatedEvent).map(function (xValue) {
      setToX(spectrum, spectrumBounds, detail, xValue);
      return xValue;
    });
  };
  var moveLeft$4 = function (spectrum, detail) {
    var newValue = $_3218wd10wjd08mh8p.reduceBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var moveRight$4 = function (spectrum, detail) {
    var newValue = $_3218wd10wjd08mh8p.increaseBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var $_f5lwv610vjd08mh8j = {
    setXFromEvent: setXFromEvent,
    setToLedge: setToLedge,
    setToRedge: setToRedge,
    moveLeftFromRedge: moveLeftFromRedge,
    moveRightFromLedge: moveRightFromLedge,
    moveLeft: moveLeft$4,
    moveRight: moveRight$4,
    changeEvent: $_8zkcijwbjd08mgn8.constant(changeEvent)
  };

  var platform = $_dymoxnwgjd08mgng.detect();
  var isTouch$1 = platform.deviceType.isTouch();
  var edgePart = function (name, action) {
    return $_eertgd10kjd08mh62.optional({
      name: '' + name + '-edge',
      overrides: function (detail) {
        var touchEvents = $_eexaurw6jd08mgmg.derive([$_eexaurw6jd08mgmg.runActionExtra($_6gw9slwxjd08mgph.touchstart(), action, [detail])]);
        var mouseEvents = $_eexaurw6jd08mgmg.derive([
          $_eexaurw6jd08mgmg.runActionExtra($_6gw9slwxjd08mgph.mousedown(), action, [detail]),
          $_eexaurw6jd08mgmg.runActionExtra($_6gw9slwxjd08mgph.mousemove(), function (l, det) {
            if (det.mouseIsDown().get())
              action(l, det);
          }, [detail])
        ]);
        return { events: isTouch$1 ? touchEvents : mouseEvents };
      }
    });
  };
  var ledgePart = edgePart('left', $_f5lwv610vjd08mh8j.setToLedge);
  var redgePart = edgePart('right', $_f5lwv610vjd08mh8j.setToRedge);
  var thumbPart = $_eertgd10kjd08mh62.required({
    name: 'thumb',
    defaults: $_8zkcijwbjd08mgn8.constant({ dom: { styles: { position: 'absolute' } } }),
    overrides: function (detail) {
      return {
        events: $_eexaurw6jd08mgmg.derive([
          $_eexaurw6jd08mgmg.redirectToPart($_6gw9slwxjd08mgph.touchstart(), detail, 'spectrum'),
          $_eexaurw6jd08mgmg.redirectToPart($_6gw9slwxjd08mgph.touchmove(), detail, 'spectrum'),
          $_eexaurw6jd08mgmg.redirectToPart($_6gw9slwxjd08mgph.touchend(), detail, 'spectrum')
        ])
      };
    }
  });
  var spectrumPart = $_eertgd10kjd08mh62.required({
    schema: [$_1mrawkx2jd08mgq2.state('mouseIsDown', function () {
        return Cell(false);
      })],
    name: 'spectrum',
    overrides: function (detail) {
      var moveToX = function (spectrum, simulatedEvent) {
        var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
        $_f5lwv610vjd08mh8j.setXFromEvent(spectrum, detail, spectrumBounds, simulatedEvent);
      };
      var touchEvents = $_eexaurw6jd08mgmg.derive([
        $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.touchstart(), moveToX),
        $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.touchmove(), moveToX)
      ]);
      var mouseEvents = $_eexaurw6jd08mgmg.derive([
        $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.mousedown(), moveToX),
        $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.mousemove(), function (spectrum, se) {
          if (detail.mouseIsDown().get())
            moveToX(spectrum, se);
        })
      ]);
      return {
        behaviours: $_voa9kw4jd08mglm.derive(isTouch$1 ? [] : [
          Keying.config({
            mode: 'special',
            onLeft: function (spectrum) {
              $_f5lwv610vjd08mh8j.moveLeft(spectrum, detail);
              return $_4izgwbwajd08mgn6.some(true);
            },
            onRight: function (spectrum) {
              $_f5lwv610vjd08mh8j.moveRight(spectrum, detail);
              return $_4izgwbwajd08mgn6.some(true);
            }
          }),
          Focusing.config({})
        ]),
        events: isTouch$1 ? touchEvents : mouseEvents
      };
    }
  });
  var SliderParts = [
    ledgePart,
    redgePart,
    thumbPart,
    spectrumPart
  ];

  var onLoad$1 = function (component, repConfig, repState) {
    repConfig.store().manager().onLoad(component, repConfig, repState);
  };
  var onUnload = function (component, repConfig, repState) {
    repConfig.store().manager().onUnload(component, repConfig, repState);
  };
  var setValue = function (component, repConfig, repState, data) {
    repConfig.store().manager().setValue(component, repConfig, repState, data);
  };
  var getValue = function (component, repConfig, repState) {
    return repConfig.store().manager().getValue(component, repConfig, repState);
  };
  var $_32zjci110jd08mh92 = {
    onLoad: onLoad$1,
    onUnload: onUnload,
    setValue: setValue,
    getValue: getValue
  };

  var events$5 = function (repConfig, repState) {
    var es = repConfig.resetOnDom() ? [
      $_eexaurw6jd08mgmg.runOnAttached(function (comp, se) {
        $_32zjci110jd08mh92.onLoad(comp, repConfig, repState);
      }),
      $_eexaurw6jd08mgmg.runOnDetached(function (comp, se) {
        $_32zjci110jd08mh92.onUnload(comp, repConfig, repState);
      })
    ] : [$_gnbzfw5jd08mglx.loadEvent(repConfig, repState, $_32zjci110jd08mh92.onLoad)];
    return $_eexaurw6jd08mgmg.derive(es);
  };
  var $_dq510r10zjd08mh91 = { events: events$5 };

  var memory = function () {
    var data = Cell(null);
    var readState = function () {
      return {
        mode: 'memory',
        value: data.get()
      };
    };
    var isNotSet = function () {
      return data.get() === null;
    };
    var clear = function () {
      data.set(null);
    };
    return BehaviourState({
      set: data.set,
      get: data.get,
      isNotSet: isNotSet,
      clear: clear,
      readState: readState
    });
  };
  var manual = function () {
    var readState = function () {
    };
    return BehaviourState({ readState: readState });
  };
  var dataset = function () {
    var data = Cell({});
    var readState = function () {
      return {
        mode: 'dataset',
        dataset: data.get()
      };
    };
    return BehaviourState({
      readState: readState,
      set: data.set,
      get: data.get
    });
  };
  var init$2 = function (spec) {
    return spec.store().manager().state(spec);
  };
  var $_32ycg3113jd08mh9e = {
    memory: memory,
    dataset: dataset,
    manual: manual,
    init: init$2
  };

  var setValue$1 = function (component, repConfig, repState, data) {
    var dataKey = repConfig.store().getDataKey();
    repState.set({});
    repConfig.store().setData()(component, data);
    repConfig.onSetValue()(component, data);
  };
  var getValue$1 = function (component, repConfig, repState) {
    var key = repConfig.store().getDataKey()(component);
    var dataset = repState.get();
    return $_96dvjsx6jd08mgqy.readOptFrom(dataset, key).fold(function () {
      return repConfig.store().getFallbackEntry()(key);
    }, function (data) {
      return data;
    });
  };
  var onLoad$2 = function (component, repConfig, repState) {
    repConfig.store().initialValue().each(function (data) {
      setValue$1(component, repConfig, repState, data);
    });
  };
  var onUnload$1 = function (component, repConfig, repState) {
    repState.set({});
  };
  var DatasetStore = [
    $_1mrawkx2jd08mgq2.option('initialValue'),
    $_1mrawkx2jd08mgq2.strict('getFallbackEntry'),
    $_1mrawkx2jd08mgq2.strict('getDataKey'),
    $_1mrawkx2jd08mgq2.strict('setData'),
    $_6uz7ybytjd08mgwm.output('manager', {
      setValue: setValue$1,
      getValue: getValue$1,
      onLoad: onLoad$2,
      onUnload: onUnload$1,
      state: $_32ycg3113jd08mh9e.dataset
    })
  ];

  var getValue$2 = function (component, repConfig, repState) {
    return repConfig.store().getValue()(component);
  };
  var setValue$2 = function (component, repConfig, repState, data) {
    repConfig.store().setValue()(component, data);
    repConfig.onSetValue()(component, data);
  };
  var onLoad$3 = function (component, repConfig, repState) {
    repConfig.store().initialValue().each(function (data) {
      repConfig.store().setValue()(component, data);
    });
  };
  var ManualStore = [
    $_1mrawkx2jd08mgq2.strict('getValue'),
    $_1mrawkx2jd08mgq2.defaulted('setValue', $_8zkcijwbjd08mgn8.noop),
    $_1mrawkx2jd08mgq2.option('initialValue'),
    $_6uz7ybytjd08mgwm.output('manager', {
      setValue: setValue$2,
      getValue: getValue$2,
      onLoad: onLoad$3,
      onUnload: $_8zkcijwbjd08mgn8.noop,
      state: $_ginglqxqjd08mgsw.init
    })
  ];

  var setValue$3 = function (component, repConfig, repState, data) {
    repState.set(data);
    repConfig.onSetValue()(component, data);
  };
  var getValue$3 = function (component, repConfig, repState) {
    return repState.get();
  };
  var onLoad$4 = function (component, repConfig, repState) {
    repConfig.store().initialValue().each(function (initVal) {
      if (repState.isNotSet())
        repState.set(initVal);
    });
  };
  var onUnload$2 = function (component, repConfig, repState) {
    repState.clear();
  };
  var MemoryStore = [
    $_1mrawkx2jd08mgq2.option('initialValue'),
    $_6uz7ybytjd08mgwm.output('manager', {
      setValue: setValue$3,
      getValue: getValue$3,
      onLoad: onLoad$4,
      onUnload: onUnload$2,
      state: $_32ycg3113jd08mh9e.memory
    })
  ];

  var RepresentSchema = [
    $_1mrawkx2jd08mgq2.defaultedOf('store', { mode: 'memory' }, $_6eo7r6xhjd08mgrx.choose('mode', {
      memory: MemoryStore,
      manual: ManualStore,
      dataset: DatasetStore
    })),
    $_6uz7ybytjd08mgwm.onHandler('onSetValue'),
    $_1mrawkx2jd08mgq2.defaulted('resetOnDom', false)
  ];

  var me = $_voa9kw4jd08mglm.create({
    fields: RepresentSchema,
    name: 'representing',
    active: $_dq510r10zjd08mh91,
    apis: $_32zjci110jd08mh92,
    extra: {
      setValueFrom: function (component, source) {
        var value = me.getValue(source);
        me.setValue(component, value);
      }
    },
    state: $_32ycg3113jd08mh9e
  });

  var isTouch$2 = $_dymoxnwgjd08mgng.detect().deviceType.isTouch();
  var SliderSchema = [
    $_1mrawkx2jd08mgq2.strict('min'),
    $_1mrawkx2jd08mgq2.strict('max'),
    $_1mrawkx2jd08mgq2.defaulted('stepSize', 1),
    $_1mrawkx2jd08mgq2.defaulted('onChange', $_8zkcijwbjd08mgn8.noop),
    $_1mrawkx2jd08mgq2.defaulted('onInit', $_8zkcijwbjd08mgn8.noop),
    $_1mrawkx2jd08mgq2.defaulted('onDragStart', $_8zkcijwbjd08mgn8.noop),
    $_1mrawkx2jd08mgq2.defaulted('onDragEnd', $_8zkcijwbjd08mgn8.noop),
    $_1mrawkx2jd08mgq2.defaulted('snapToGrid', false),
    $_1mrawkx2jd08mgq2.option('snapStart'),
    $_1mrawkx2jd08mgq2.strict('getInitialValue'),
    $_8tr5o010djd08mh4k.field('sliderBehaviours', [
      Keying,
      me
    ]),
    $_1mrawkx2jd08mgq2.state('value', function (spec) {
      return Cell(spec.min);
    })
  ].concat(!isTouch$2 ? [$_1mrawkx2jd08mgq2.state('mouseIsDown', function () {
      return Cell(false);
    })] : []);

  var api$1 = Dimension('width', function (element) {
    return element.dom().offsetWidth;
  });
  var set$4 = function (element, h) {
    api$1.set(element, h);
  };
  var get$6 = function (element) {
    return api$1.get(element);
  };
  var getOuter$2 = function (element) {
    return api$1.getOuter(element);
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
    var absMax = api$1.max(element, value, inclusions);
    $_62cv66zsjd08mh10.set(element, 'max-width', absMax + 'px');
  };
  var $_7qh6mb117jd08mha2 = {
    set: set$4,
    get: get$6,
    getOuter: getOuter$2,
    setMax: setMax$1
  };

  var isTouch$3 = $_dymoxnwgjd08mgng.detect().deviceType.isTouch();
  var sketch$1 = function (detail, components, spec, externals) {
    var range = detail.max() - detail.min();
    var getXCentre = function (component) {
      var rect = component.element().dom().getBoundingClientRect();
      return (rect.left + rect.right) / 2;
    };
    var getThumb = function (component) {
      return $_fyge8g10ijd08mh5e.getPartOrDie(component, detail, 'thumb');
    };
    var getXOffset = function (slider, spectrumBounds, detail) {
      var v = detail.value().get();
      if (v < detail.min()) {
        return $_fyge8g10ijd08mh5e.getPart(slider, detail, 'left-edge').fold(function () {
          return 0;
        }, function (ledge) {
          return getXCentre(ledge) - spectrumBounds.left;
        });
      } else if (v > detail.max()) {
        return $_fyge8g10ijd08mh5e.getPart(slider, detail, 'right-edge').fold(function () {
          return spectrumBounds.width;
        }, function (redge) {
          return getXCentre(redge) - spectrumBounds.left;
        });
      } else {
        return (detail.value().get() - detail.min()) / range * spectrumBounds.width;
      }
    };
    var getXPos = function (slider) {
      var spectrum = $_fyge8g10ijd08mh5e.getPartOrDie(slider, detail, 'spectrum');
      var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
      var sliderBounds = slider.element().dom().getBoundingClientRect();
      var xOffset = getXOffset(slider, spectrumBounds, detail);
      return spectrumBounds.left - sliderBounds.left + xOffset;
    };
    var refresh = function (component) {
      var pos = getXPos(component);
      var thumb = getThumb(component);
      var thumbRadius = $_7qh6mb117jd08mha2.get(thumb.element()) / 2;
      $_62cv66zsjd08mh10.set(thumb.element(), 'left', pos - thumbRadius + 'px');
    };
    var changeValue = function (component, newValue) {
      var oldValue = detail.value().get();
      var thumb = getThumb(component);
      if (oldValue !== newValue || $_62cv66zsjd08mh10.getRaw(thumb.element(), 'left').isNone()) {
        detail.value().set(newValue);
        refresh(component);
        detail.onChange()(component, thumb, newValue);
        return $_4izgwbwajd08mgn6.some(true);
      } else {
        return $_4izgwbwajd08mgn6.none();
      }
    };
    var resetToMin = function (slider) {
      changeValue(slider, detail.min());
    };
    var resetToMax = function (slider) {
      changeValue(slider, detail.max());
    };
    var uiEventsArr = isTouch$3 ? [
      $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.touchstart(), function (slider, simulatedEvent) {
        detail.onDragStart()(slider, getThumb(slider));
      }),
      $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.touchend(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
      })
    ] : [
      $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.mousedown(), function (slider, simulatedEvent) {
        simulatedEvent.stop();
        detail.onDragStart()(slider, getThumb(slider));
        detail.mouseIsDown().set(true);
      }),
      $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.mouseup(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
        detail.mouseIsDown().set(false);
      })
    ];
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_25kgk5wyjd08mgpk.deepMerge($_voa9kw4jd08mglm.derive($_453g14w9jd08mgmy.flatten([
        !isTouch$3 ? [Keying.config({
            mode: 'special',
            focusIn: function (slider) {
              return $_fyge8g10ijd08mh5e.getPart(slider, detail, 'spectrum').map(Keying.focusIn).map($_8zkcijwbjd08mgn8.constant(true));
            }
          })] : [],
        [me.config({
            store: {
              mode: 'manual',
              getValue: function (_) {
                return detail.value().get();
              }
            }
          })]
      ])), $_8tr5o010djd08mh4k.get(detail.sliderBehaviours())),
      events: $_eexaurw6jd08mgmg.derive([
        $_eexaurw6jd08mgmg.run($_f5lwv610vjd08mh8j.changeEvent(), function (slider, simulatedEvent) {
          changeValue(slider, simulatedEvent.event().value());
        }),
        $_eexaurw6jd08mgmg.runOnAttached(function (slider, simulatedEvent) {
          detail.value().set(detail.getInitialValue()());
          var thumb = getThumb(slider);
          refresh(slider);
          detail.onInit()(slider, thumb, detail.value().get());
        })
      ].concat(uiEventsArr)),
      apis: {
        resetToMin: resetToMin,
        resetToMax: resetToMax,
        refresh: refresh
      },
      domModification: { styles: { position: 'relative' } }
    };
  };
  var $_d31rfe116jd08mh9q = { sketch: sketch$1 };

  var Slider = $_88109v10ejd08mh4q.composite({
    name: 'Slider',
    configFields: SliderSchema,
    partFields: SliderParts,
    factory: $_d31rfe116jd08mh9q.sketch,
    apis: {
      resetToMin: function (apis, slider) {
        apis.resetToMin(slider);
      },
      resetToMax: function (apis, slider) {
        apis.resetToMax(slider);
      },
      refresh: function (apis, slider) {
        apis.refresh(slider);
      }
    }
  });

  var button = function (realm, clazz, makeItems) {
    return $_9w4shzz2jd08mgy1.forToolbar(clazz, function () {
      var items = makeItems();
      realm.setContextToolbar([{
          label: clazz + ' group',
          items: items
        }]);
    }, {});
  };
  var $_532hms118jd08mha4 = { button: button };

  var BLACK = -1;
  var makeSlider = function (spec) {
    var getColor = function (hue) {
      if (hue < 0) {
        return 'black';
      } else if (hue > 360) {
        return 'white';
      } else {
        return 'hsl(' + hue + ', 100%, 50%)';
      }
    };
    var onInit = function (slider, thumb, value) {
      var color = getColor(value);
      $_62cv66zsjd08mh10.set(thumb.element(), 'background-color', color);
    };
    var onChange = function (slider, thumb, value) {
      var color = getColor(value);
      $_62cv66zsjd08mh10.set(thumb.element(), 'background-color', color);
      spec.onChange(slider, thumb, color);
    };
    return Slider.sketch({
      dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-slider ${prefix}-hue-slider-container"></div>'),
      components: [
        Slider.parts()['left-edge']($_3iuzq510qjd08mh7l.spec('<div class="${prefix}-hue-slider-black"></div>')),
        Slider.parts().spectrum({
          dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-slider-gradient-container"></div>'),
          components: [$_3iuzq510qjd08mh7l.spec('<div class="${prefix}-slider-gradient"></div>')],
          behaviours: $_voa9kw4jd08mglm.derive([Toggling.config({ toggleClass: $_ete72zz1jd08mgy0.resolve('thumb-active') })])
        }),
        Slider.parts()['right-edge']($_3iuzq510qjd08mh7l.spec('<div class="${prefix}-hue-slider-white"></div>')),
        Slider.parts().thumb({
          dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_voa9kw4jd08mglm.derive([Toggling.config({ toggleClass: $_ete72zz1jd08mgy0.resolve('thumb-active') })])
        })
      ],
      onChange: onChange,
      onDragStart: function (slider, thumb) {
        Toggling.on(thumb);
      },
      onDragEnd: function (slider, thumb) {
        Toggling.off(thumb);
      },
      onInit: onInit,
      stepSize: 10,
      min: 0,
      max: 360,
      getInitialValue: spec.getInitialValue,
      sliderBehaviours: $_voa9kw4jd08mglm.derive([$_cnlikcz0jd08mgxw.orientation(Slider.refresh)])
    });
  };
  var makeItems = function (spec) {
    return [makeSlider(spec)];
  };
  var sketch$2 = function (realm, editor) {
    var spec = {
      onChange: function (slider, thumb, color) {
        editor.undoManager.transact(function () {
          editor.formatter.apply('forecolor', { value: color });
          editor.nodeChanged();
        });
      },
      getInitialValue: function () {
        return BLACK;
      }
    };
    return $_532hms118jd08mha4.button(realm, 'color', function () {
      return makeItems(spec);
    });
  };
  var $_e5b73g10sjd08mh80 = {
    makeItems: makeItems,
    sketch: sketch$2
  };

  var schema$7 = $_6eo7r6xhjd08mgrx.objOfOnly([
    $_1mrawkx2jd08mgq2.strict('getInitialValue'),
    $_1mrawkx2jd08mgq2.strict('onChange'),
    $_1mrawkx2jd08mgq2.strict('category'),
    $_1mrawkx2jd08mgq2.strict('sizes')
  ]);
  var sketch$3 = function (rawSpec) {
    var spec = $_6eo7r6xhjd08mgrx.asRawOrDie('SizeSlider', schema$7, rawSpec);
    var isValidValue = function (valueIndex) {
      return valueIndex >= 0 && valueIndex < spec.sizes.length;
    };
    var onChange = function (slider, thumb, valueIndex) {
      if (isValidValue(valueIndex)) {
        spec.onChange(valueIndex);
      }
    };
    return Slider.sketch({
      dom: {
        tag: 'div',
        classes: [
          $_ete72zz1jd08mgy0.resolve('slider-' + spec.category + '-size-container'),
          $_ete72zz1jd08mgy0.resolve('slider'),
          $_ete72zz1jd08mgy0.resolve('slider-size-container')
        ]
      },
      onChange: onChange,
      onDragStart: function (slider, thumb) {
        Toggling.on(thumb);
      },
      onDragEnd: function (slider, thumb) {
        Toggling.off(thumb);
      },
      min: 0,
      max: spec.sizes.length - 1,
      stepSize: 1,
      getInitialValue: spec.getInitialValue,
      snapToGrid: true,
      sliderBehaviours: $_voa9kw4jd08mglm.derive([$_cnlikcz0jd08mgxw.orientation(Slider.refresh)]),
      components: [
        Slider.parts().spectrum({
          dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-slider-size-container"></div>'),
          components: [$_3iuzq510qjd08mh7l.spec('<div class="${prefix}-slider-size-line"></div>')]
        }),
        Slider.parts().thumb({
          dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_voa9kw4jd08mglm.derive([Toggling.config({ toggleClass: $_ete72zz1jd08mgy0.resolve('thumb-active') })])
        })
      ]
    });
  };
  var $_btaro211ajd08mha7 = { sketch: sketch$3 };

  var ancestor$3 = function (scope, transform, isRoot) {
    var element = scope.dom();
    var stop = $_erilttwzjd08mgpl.isFunction(isRoot) ? isRoot : $_8zkcijwbjd08mgn8.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_3visdkwtjd08mgor.fromDom(element);
      var transformed = transform(el);
      if (transformed.isSome())
        return transformed;
      else if (stop(el))
        break;
    }
    return $_4izgwbwajd08mgn6.none();
  };
  var closest$3 = function (scope, transform, isRoot) {
    var current = transform(scope);
    return current.orThunk(function () {
      return isRoot(scope) ? $_4izgwbwajd08mgn6.none() : ancestor$3(scope, transform, isRoot);
    });
  };
  var $_fr2ajm11cjd08mhan = {
    ancestor: ancestor$3,
    closest: closest$3
  };

  var candidates = [
    '9px',
    '10px',
    '11px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '24px',
    '32px',
    '36px'
  ];
  var defaultSize = 'medium';
  var defaultIndex = 2;
  var indexToSize = function (index) {
    return $_4izgwbwajd08mgn6.from(candidates[index]);
  };
  var sizeToIndex = function (size) {
    return $_453g14w9jd08mgmy.findIndex(candidates, function (v) {
      return v === size;
    });
  };
  var getRawOrComputed = function (isRoot, rawStart) {
    var optStart = $_9323z1xxjd08mgti.isElement(rawStart) ? $_4izgwbwajd08mgn6.some(rawStart) : $_4uhv6ey3jd08mgu3.parent(rawStart);
    return optStart.map(function (start) {
      var inline = $_fr2ajm11cjd08mhan.closest(start, function (elem) {
        return $_62cv66zsjd08mh10.getRaw(elem, 'font-size');
      }, isRoot);
      return inline.getOrThunk(function () {
        return $_62cv66zsjd08mh10.get(start, 'font-size');
      });
    }).getOr('');
  };
  var getSize = function (editor) {
    var node = editor.selection.getStart();
    var elem = $_3visdkwtjd08mgor.fromDom(node);
    var root = $_3visdkwtjd08mgor.fromDom(editor.getBody());
    var isRoot = function (e) {
      return $_ctdo1gw8jd08mgmp.eq(root, e);
    };
    var elemSize = getRawOrComputed(isRoot, elem);
    return $_453g14w9jd08mgmy.find(candidates, function (size) {
      return elemSize === size;
    }).getOr(defaultSize);
  };
  var applySize = function (editor, value) {
    var currentValue = getSize(editor);
    if (currentValue !== value) {
      editor.execCommand('fontSize', false, value);
    }
  };
  var get$7 = function (editor) {
    var size = getSize(editor);
    return sizeToIndex(size).getOr(defaultIndex);
  };
  var apply$1 = function (editor, index) {
    indexToSize(index).each(function (size) {
      applySize(editor, size);
    });
  };
  var $_gav76811bjd08mhad = {
    candidates: $_8zkcijwbjd08mgn8.constant(candidates),
    get: get$7,
    apply: apply$1
  };

  var sizes = $_gav76811bjd08mhad.candidates();
  var makeSlider$1 = function (spec) {
    return $_btaro211ajd08mha7.sketch({
      onChange: spec.onChange,
      sizes: sizes,
      category: 'font',
      getInitialValue: spec.getInitialValue
    });
  };
  var makeItems$1 = function (spec) {
    return [
      $_3iuzq510qjd08mh7l.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-small-font ${prefix}-icon"></span>'),
      makeSlider$1(spec),
      $_3iuzq510qjd08mh7l.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-large-font ${prefix}-icon"></span>')
    ];
  };
  var sketch$4 = function (realm, editor) {
    var spec = {
      onChange: function (value) {
        $_gav76811bjd08mhad.apply(editor, value);
      },
      getInitialValue: function () {
        return $_gav76811bjd08mhad.get(editor);
      }
    };
    return $_532hms118jd08mha4.button(realm, 'font-size', function () {
      return makeItems$1(spec);
    });
  };
  var $_9eq14a119jd08mha5 = {
    makeItems: makeItems$1,
    sketch: sketch$4
  };

  var record = function (spec) {
    var uid = $_96dvjsx6jd08mgqy.hasKey(spec, 'uid') ? spec.uid : $_90bcgv10mjd08mh6p.generate('memento');
    var get = function (any) {
      return any.getSystem().getByUid(uid).getOrDie();
    };
    var getOpt = function (any) {
      return any.getSystem().getByUid(uid).fold($_4izgwbwajd08mgn6.none, $_4izgwbwajd08mgn6.some);
    };
    var asSpec = function () {
      return $_25kgk5wyjd08mgpk.deepMerge(spec, { uid: uid });
    };
    return {
      get: get,
      getOpt: getOpt,
      asSpec: asSpec
    };
  };
  var $_4gwcwf11ejd08mhb2 = { record: record };

  function create$3(width, height) {
    return resize(document.createElement('canvas'), width, height);
  }
  function clone$2(canvas) {
    var tCanvas, ctx;
    tCanvas = create$3(canvas.width, canvas.height);
    ctx = get2dContext(tCanvas);
    ctx.drawImage(canvas, 0, 0);
    return tCanvas;
  }
  function get2dContext(canvas) {
    return canvas.getContext('2d');
  }
  function get3dContext(canvas) {
    var gl = null;
    try {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    } catch (e) {
    }
    if (!gl) {
      gl = null;
    }
    return gl;
  }
  function resize(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
  var $_b9toch11hjd08mhbr = {
    create: create$3,
    clone: clone$2,
    resize: resize,
    get2dContext: get2dContext,
    get3dContext: get3dContext
  };

  function getWidth(image) {
    return image.naturalWidth || image.width;
  }
  function getHeight(image) {
    return image.naturalHeight || image.height;
  }
  var $_61tqv11ijd08mhbs = {
    getWidth: getWidth,
    getHeight: getHeight
  };

  var promise = function () {
    var Promise = function (fn) {
      if (typeof this !== 'object')
        throw new TypeError('Promises must be constructed via new');
      if (typeof fn !== 'function')
        throw new TypeError('not a function');
      this._state = null;
      this._value = null;
      this._deferreds = [];
      doResolve(fn, bind(resolve, this), bind(reject, this));
    };
    var asap = Promise.immediateFn || typeof setImmediate === 'function' && setImmediate || function (fn) {
      setTimeout(fn, 1);
    };
    function bind(fn, thisArg) {
      return function () {
        fn.apply(thisArg, arguments);
      };
    }
    var isArray = Array.isArray || function (value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    };
    function handle(deferred) {
      var me = this;
      if (this._state === null) {
        this._deferreds.push(deferred);
        return;
      }
      asap(function () {
        var cb = me._state ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (me._state ? deferred.resolve : deferred.reject)(me._value);
          return;
        }
        var ret;
        try {
          ret = cb(me._value);
        } catch (e) {
          deferred.reject(e);
          return;
        }
        deferred.resolve(ret);
      });
    }
    function resolve(newValue) {
      try {
        if (newValue === this)
          throw new TypeError('A promise cannot be resolved with itself.');
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
          var then = newValue.then;
          if (typeof then === 'function') {
            doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
            return;
          }
        }
        this._state = true;
        this._value = newValue;
        finale.call(this);
      } catch (e) {
        reject.call(this, e);
      }
    }
    function reject(newValue) {
      this._state = false;
      this._value = newValue;
      finale.call(this);
    }
    function finale() {
      for (var i = 0, len = this._deferreds.length; i < len; i++) {
        handle.call(this, this._deferreds[i]);
      }
      this._deferreds = null;
    }
    function Handler(onFulfilled, onRejected, resolve, reject) {
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.resolve = resolve;
      this.reject = reject;
    }
    function doResolve(fn, onFulfilled, onRejected) {
      var done = false;
      try {
        fn(function (value) {
          if (done)
            return;
          done = true;
          onFulfilled(value);
        }, function (reason) {
          if (done)
            return;
          done = true;
          onRejected(reason);
        });
      } catch (ex) {
        if (done)
          return;
        done = true;
        onRejected(ex);
      }
    }
    Promise.prototype['catch'] = function (onRejected) {
      return this.then(null, onRejected);
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
      var me = this;
      return new Promise(function (resolve, reject) {
        handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
      });
    };
    Promise.all = function () {
      var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);
      return new Promise(function (resolve, reject) {
        if (args.length === 0)
          return resolve([]);
        var remaining = args.length;
        function res(i, val) {
          try {
            if (val && (typeof val === 'object' || typeof val === 'function')) {
              var then = val.then;
              if (typeof then === 'function') {
                then.call(val, function (val) {
                  res(i, val);
                }, reject);
                return;
              }
            }
            args[i] = val;
            if (--remaining === 0) {
              resolve(args);
            }
          } catch (ex) {
            reject(ex);
          }
        }
        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };
    Promise.resolve = function (value) {
      if (value && typeof value === 'object' && value.constructor === Promise) {
        return value;
      }
      return new Promise(function (resolve) {
        resolve(value);
      });
    };
    Promise.reject = function (value) {
      return new Promise(function (resolve, reject) {
        reject(value);
      });
    };
    Promise.race = function (values) {
      return new Promise(function (resolve, reject) {
        for (var i = 0, len = values.length; i < len; i++) {
          values[i].then(resolve, reject);
        }
      });
    };
    return Promise;
  };
  var Promise = window.Promise ? window.Promise : promise();

  function Blob (parts, properties) {
    var f = $_4peh7owdjd08mgnb.getOrDie('Blob');
    return new f(parts, properties);
  }

  function FileReader () {
    var f = $_4peh7owdjd08mgnb.getOrDie('FileReader');
    return new f();
  }

  function Uint8Array (arr) {
    var f = $_4peh7owdjd08mgnb.getOrDie('Uint8Array');
    return new f(arr);
  }

  var requestAnimationFrame = function (callback) {
    var f = $_4peh7owdjd08mgnb.getOrDie('requestAnimationFrame');
    f(callback);
  };
  var atob = function (base64) {
    var f = $_4peh7owdjd08mgnb.getOrDie('atob');
    return f(base64);
  };
  var $_4esycy11njd08mhby = {
    atob: atob,
    requestAnimationFrame: requestAnimationFrame
  };

  function loadImage(image) {
    return new Promise(function (resolve) {
      function loaded() {
        image.removeEventListener('load', loaded);
        resolve(image);
      }
      if (image.complete) {
        resolve(image);
      } else {
        image.addEventListener('load', loaded);
      }
    });
  }
  function imageToBlob(image) {
    return loadImage(image).then(function (image) {
      var src = image.src;
      if (src.indexOf('blob:') === 0) {
        return anyUriToBlob(src);
      }
      if (src.indexOf('data:') === 0) {
        return dataUriToBlob(src);
      }
      return anyUriToBlob(src);
    });
  }
  function blobToImage(blob) {
    return new Promise(function (resolve, reject) {
      var blobUrl = URL.createObjectURL(blob);
      var image = new Image();
      var removeListeners = function () {
        image.removeEventListener('load', loaded);
        image.removeEventListener('error', error);
      };
      function loaded() {
        removeListeners();
        resolve(image);
      }
      function error() {
        removeListeners();
        reject('Unable to load data of type ' + blob.type + ': ' + blobUrl);
      }
      image.addEventListener('load', loaded);
      image.addEventListener('error', error);
      image.src = blobUrl;
      if (image.complete) {
        loaded();
      }
    });
  }
  function anyUriToBlob(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        if (this.status == 200) {
          resolve(this.response);
        }
      };
      xhr.onerror = function () {
        var _this = this;
        var corsError = function () {
          var obj = new Error('No access to download image');
          obj.code = 18;
          obj.name = 'SecurityError';
          return obj;
        };
        var genericError = function () {
          return new Error('Error ' + _this.status + ' downloading image');
        };
        reject(this.status === 0 ? corsError() : genericError());
      };
      xhr.send();
    });
  }
  function dataUriToBlobSync(uri) {
    var data = uri.split(',');
    var matches = /data:([^;]+)/.exec(data[0]);
    if (!matches)
      return $_4izgwbwajd08mgn6.none();
    var mimetype = matches[1];
    var base64 = data[1];
    var sliceSize = 1024;
    var byteCharacters = $_4esycy11njd08mhby.atob(base64);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);
    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);
      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = Uint8Array(bytes);
    }
    return $_4izgwbwajd08mgn6.some(Blob(byteArrays, { type: mimetype }));
  }
  function dataUriToBlob(uri) {
    return new Promise(function (resolve, reject) {
      dataUriToBlobSync(uri).fold(function () {
        reject('uri is not base64: ' + uri);
      }, resolve);
    });
  }
  function uriToBlob(url) {
    if (url.indexOf('blob:') === 0) {
      return anyUriToBlob(url);
    }
    if (url.indexOf('data:') === 0) {
      return dataUriToBlob(url);
    }
    return null;
  }
  function canvasToBlob(canvas, type, quality) {
    type = type || 'image/png';
    if (HTMLCanvasElement.prototype.toBlob) {
      return new Promise(function (resolve) {
        canvas.toBlob(function (blob) {
          resolve(blob);
        }, type, quality);
      });
    } else {
      return dataUriToBlob(canvas.toDataURL(type, quality));
    }
  }
  function canvasToDataURL(getCanvas, type, quality) {
    type = type || 'image/png';
    return getCanvas.then(function (canvas) {
      return canvas.toDataURL(type, quality);
    });
  }
  function blobToCanvas(blob) {
    return blobToImage(blob).then(function (image) {
      revokeImageUrl(image);
      var context, canvas;
      canvas = $_b9toch11hjd08mhbr.create($_61tqv11ijd08mhbs.getWidth(image), $_61tqv11ijd08mhbs.getHeight(image));
      context = $_b9toch11hjd08mhbr.get2dContext(canvas);
      context.drawImage(image, 0, 0);
      return canvas;
    });
  }
  function blobToDataUri(blob) {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }
  function blobToBase64(blob) {
    return blobToDataUri(blob).then(function (dataUri) {
      return dataUri.split(',')[1];
    });
  }
  function revokeImageUrl(image) {
    URL.revokeObjectURL(image.src);
  }
  var $_8y5iks11gjd08mhbf = {
    blobToImage: blobToImage,
    imageToBlob: imageToBlob,
    blobToDataUri: blobToDataUri,
    blobToBase64: blobToBase64,
    dataUriToBlobSync: dataUriToBlobSync,
    canvasToBlob: canvasToBlob,
    canvasToDataURL: canvasToDataURL,
    blobToCanvas: blobToCanvas,
    uriToBlob: uriToBlob
  };

  var blobToImage$1 = function (image) {
    return $_8y5iks11gjd08mhbf.blobToImage(image);
  };
  var imageToBlob$1 = function (blob) {
    return $_8y5iks11gjd08mhbf.imageToBlob(blob);
  };
  var blobToDataUri$1 = function (blob) {
    return $_8y5iks11gjd08mhbf.blobToDataUri(blob);
  };
  var blobToBase64$1 = function (blob) {
    return $_8y5iks11gjd08mhbf.blobToBase64(blob);
  };
  var dataUriToBlobSync$1 = function (uri) {
    return $_8y5iks11gjd08mhbf.dataUriToBlobSync(uri);
  };
  var uriToBlob$1 = function (uri) {
    return $_4izgwbwajd08mgn6.from($_8y5iks11gjd08mhbf.uriToBlob(uri));
  };
  var $_dlpyrf11fjd08mhba = {
    blobToImage: blobToImage$1,
    imageToBlob: imageToBlob$1,
    blobToDataUri: blobToDataUri$1,
    blobToBase64: blobToBase64$1,
    dataUriToBlobSync: dataUriToBlobSync$1,
    uriToBlob: uriToBlob$1
  };

  var addImage = function (editor, blob) {
    $_dlpyrf11fjd08mhba.blobToBase64(blob).then(function (base64) {
      editor.undoManager.transact(function () {
        var cache = editor.editorUpload.blobCache;
        var info = cache.create($_1rgeik10gjd08mh59.generate('mceu'), blob, base64);
        cache.add(info);
        var img = editor.dom.createHTML('img', { src: info.blobUri() });
        editor.insertContent(img);
      });
    });
  };
  var extractBlob = function (simulatedEvent) {
    var event = simulatedEvent.event();
    var files = event.raw().target.files || event.raw().dataTransfer.files;
    return $_4izgwbwajd08mgn6.from(files[0]);
  };
  var sketch$5 = function (editor) {
    var pickerDom = {
      tag: 'input',
      attributes: {
        accept: 'image/*',
        type: 'file',
        title: ''
      },
      styles: {
        visibility: 'hidden',
        position: 'absolute'
      }
    };
    var memPicker = $_4gwcwf11ejd08mhb2.record({
      dom: pickerDom,
      events: $_eexaurw6jd08mgmg.derive([
        $_eexaurw6jd08mgmg.cutter($_6gw9slwxjd08mgph.click()),
        $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.change(), function (picker, simulatedEvent) {
          extractBlob(simulatedEvent).each(function (blob) {
            addImage(editor, blob);
          });
        })
      ])
    });
    return Button.sketch({
      dom: $_3iuzq510qjd08mh7l.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-image ${prefix}-icon"></span>'),
      components: [memPicker.asSpec()],
      action: function (button) {
        var picker = memPicker.get(button);
        picker.element().dom().click();
      }
    });
  };
  var $_hnjms11djd08mhau = { sketch: sketch$5 };

  var get$8 = function (element) {
    return element.dom().textContent;
  };
  var set$5 = function (element, value) {
    element.dom().textContent = value;
  };
  var $_90xxsq11qjd08mhcd = {
    get: get$8,
    set: set$5
  };

  var isNotEmpty = function (val) {
    return val.length > 0;
  };
  var defaultToEmpty = function (str) {
    return str === undefined || str === null ? '' : str;
  };
  var noLink = function (editor) {
    var text = editor.selection.getContent({ format: 'text' });
    return {
      url: '',
      text: text,
      title: '',
      target: '',
      link: $_4izgwbwajd08mgn6.none()
    };
  };
  var fromLink = function (link) {
    var text = $_90xxsq11qjd08mhcd.get(link);
    var url = $_auw0hixwjd08mgt8.get(link, 'href');
    var title = $_auw0hixwjd08mgt8.get(link, 'title');
    var target = $_auw0hixwjd08mgt8.get(link, 'target');
    return {
      url: defaultToEmpty(url),
      text: text !== url ? defaultToEmpty(text) : '',
      title: defaultToEmpty(title),
      target: defaultToEmpty(target),
      link: $_4izgwbwajd08mgn6.some(link)
    };
  };
  var getInfo = function (editor) {
    return query(editor).fold(function () {
      return noLink(editor);
    }, function (link) {
      return fromLink(link);
    });
  };
  var wasSimple = function (link) {
    var prevHref = $_auw0hixwjd08mgt8.get(link, 'href');
    var prevText = $_90xxsq11qjd08mhcd.get(link);
    return prevHref === prevText;
  };
  var getTextToApply = function (link, url, info) {
    return info.text.filter(isNotEmpty).fold(function () {
      return wasSimple(link) ? $_4izgwbwajd08mgn6.some(url) : $_4izgwbwajd08mgn6.none();
    }, $_4izgwbwajd08mgn6.some);
  };
  var unlinkIfRequired = function (editor, info) {
    var activeLink = info.link.bind($_8zkcijwbjd08mgn8.identity);
    activeLink.each(function (link) {
      editor.execCommand('unlink');
    });
  };
  var getAttrs$1 = function (url, info) {
    var attrs = {};
    attrs.href = url;
    info.title.filter(isNotEmpty).each(function (title) {
      attrs.title = title;
    });
    info.target.filter(isNotEmpty).each(function (target) {
      attrs.target = target;
    });
    return attrs;
  };
  var applyInfo = function (editor, info) {
    info.url.filter(isNotEmpty).fold(function () {
      unlinkIfRequired(editor, info);
    }, function (url) {
      var attrs = getAttrs$1(url, info);
      var activeLink = info.link.bind($_8zkcijwbjd08mgn8.identity);
      activeLink.fold(function () {
        var text = info.text.filter(isNotEmpty).getOr(url);
        editor.insertContent(editor.dom.createHTML('a', attrs, editor.dom.encode(text)));
      }, function (link) {
        var text = getTextToApply(link, url, info);
        $_auw0hixwjd08mgt8.setAll(link, attrs);
        text.each(function (newText) {
          $_90xxsq11qjd08mhcd.set(link, newText);
        });
      });
    });
  };
  var query = function (editor) {
    var start = $_3visdkwtjd08mgor.fromDom(editor.selection.getStart());
    return $_edahi9zmjd08mh0g.closest(start, 'a');
  };
  var $_780m1k11pjd08mhc6 = {
    getInfo: getInfo,
    applyInfo: applyInfo,
    query: query
  };

  var events$6 = function (name, eventHandlers) {
    var events = $_eexaurw6jd08mgmg.derive(eventHandlers);
    return $_voa9kw4jd08mglm.create({
      fields: [$_1mrawkx2jd08mgq2.strict('enabled')],
      name: name,
      active: { events: $_8zkcijwbjd08mgn8.constant(events) }
    });
  };
  var config = function (name, eventHandlers) {
    var me = events$6(name, eventHandlers);
    return {
      key: name,
      value: {
        config: {},
        me: me,
        configAsRaw: $_8zkcijwbjd08mgn8.constant({}),
        initialConfig: {},
        state: $_voa9kw4jd08mglm.noState()
      }
    };
  };
  var $_ejtkif11sjd08mhcv = {
    events: events$6,
    config: config
  };

  var getCurrent = function (component, composeConfig, composeState) {
    return composeConfig.find()(component);
  };
  var $_44n5gt11ujd08mhd2 = { getCurrent: getCurrent };

  var ComposeSchema = [$_1mrawkx2jd08mgq2.strict('find')];

  var Composing = $_voa9kw4jd08mglm.create({
    fields: ComposeSchema,
    name: 'composing',
    apis: $_44n5gt11ujd08mhd2
  });

  var factory$1 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_25kgk5wyjd08mgpk.deepMerge({
        tag: 'div',
        attributes: { role: 'presentation' }
      }, detail.dom()),
      components: detail.components(),
      behaviours: $_8tr5o010djd08mh4k.get(detail.containerBehaviours()),
      events: detail.events(),
      domModification: detail.domModification(),
      eventOrder: detail.eventOrder()
    };
  };
  var Container = $_88109v10ejd08mh4q.single({
    name: 'Container',
    factory: factory$1,
    configFields: [
      $_1mrawkx2jd08mgq2.defaulted('components', []),
      $_8tr5o010djd08mh4k.field('containerBehaviours', []),
      $_1mrawkx2jd08mgq2.defaulted('events', {}),
      $_1mrawkx2jd08mgq2.defaulted('domModification', {}),
      $_1mrawkx2jd08mgq2.defaulted('eventOrder', {})
    ]
  });

  var factory$2 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      behaviours: $_25kgk5wyjd08mgpk.deepMerge($_voa9kw4jd08mglm.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: detail.getInitialValue()()
          }
        }),
        Composing.config({ find: $_4izgwbwajd08mgn6.some })
      ]), $_8tr5o010djd08mh4k.get(detail.dataBehaviours())),
      events: $_eexaurw6jd08mgmg.derive([$_eexaurw6jd08mgmg.runOnAttached(function (component, simulatedEvent) {
          me.setValue(component, detail.getInitialValue()());
        })])
    };
  };
  var DataField = $_88109v10ejd08mh4q.single({
    name: 'DataField',
    factory: factory$2,
    configFields: [
      $_1mrawkx2jd08mgq2.strict('uid'),
      $_1mrawkx2jd08mgq2.strict('dom'),
      $_1mrawkx2jd08mgq2.strict('getInitialValue'),
      $_8tr5o010djd08mh4k.field('dataBehaviours', [
        me,
        Composing
      ])
    ]
  });

  var get$9 = function (element) {
    return element.dom().value;
  };
  var set$6 = function (element, value) {
    if (value === undefined)
      throw new Error('Value.set was undefined');
    element.dom().value = value;
  };
  var $_hl3sv120jd08mhdz = {
    set: set$6,
    get: get$9
  };

  var schema$8 = [
    $_1mrawkx2jd08mgq2.option('data'),
    $_1mrawkx2jd08mgq2.defaulted('inputAttributes', {}),
    $_1mrawkx2jd08mgq2.defaulted('inputStyles', {}),
    $_1mrawkx2jd08mgq2.defaulted('type', 'input'),
    $_1mrawkx2jd08mgq2.defaulted('tag', 'input'),
    $_1mrawkx2jd08mgq2.defaulted('inputClasses', []),
    $_6uz7ybytjd08mgwm.onHandler('onSetValue'),
    $_1mrawkx2jd08mgq2.defaulted('styles', {}),
    $_1mrawkx2jd08mgq2.option('placeholder'),
    $_1mrawkx2jd08mgq2.defaulted('eventOrder', {}),
    $_8tr5o010djd08mh4k.field('inputBehaviours', [
      me,
      Focusing
    ]),
    $_1mrawkx2jd08mgq2.defaulted('selectOnFocus', true)
  ];
  var behaviours = function (detail) {
    return $_25kgk5wyjd08mgpk.deepMerge($_voa9kw4jd08mglm.derive([
      me.config({
        store: {
          mode: 'manual',
          initialValue: detail.data().getOr(undefined),
          getValue: function (input) {
            return $_hl3sv120jd08mhdz.get(input.element());
          },
          setValue: function (input, data) {
            var current = $_hl3sv120jd08mhdz.get(input.element());
            if (current !== data) {
              $_hl3sv120jd08mhdz.set(input.element(), data);
            }
          }
        },
        onSetValue: detail.onSetValue()
      }),
      Focusing.config({
        onFocus: detail.selectOnFocus() === false ? $_8zkcijwbjd08mgn8.noop : function (component) {
          var input = component.element();
          var value = $_hl3sv120jd08mhdz.get(input);
          input.dom().setSelectionRange(0, value.length);
        }
      })
    ]), $_8tr5o010djd08mh4k.get(detail.inputBehaviours()));
  };
  var dom$2 = function (detail) {
    return {
      tag: detail.tag(),
      attributes: $_25kgk5wyjd08mgpk.deepMerge($_96dvjsx6jd08mgqy.wrapAll([{
          key: 'type',
          value: detail.type()
        }].concat(detail.placeholder().map(function (pc) {
        return {
          key: 'placeholder',
          value: pc
        };
      }).toArray())), detail.inputAttributes()),
      styles: detail.inputStyles(),
      classes: detail.inputClasses()
    };
  };
  var $_6euvv911zjd08mhdm = {
    schema: $_8zkcijwbjd08mgn8.constant(schema$8),
    behaviours: behaviours,
    dom: dom$2
  };

  var factory$3 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_6euvv911zjd08mhdm.dom(detail),
      components: [],
      behaviours: $_6euvv911zjd08mhdm.behaviours(detail),
      eventOrder: detail.eventOrder()
    };
  };
  var Input = $_88109v10ejd08mh4q.single({
    name: 'Input',
    configFields: $_6euvv911zjd08mhdm.schema(),
    factory: factory$3
  });

  var exhibit$3 = function (base, tabConfig) {
    return $_bzfvkmxkjd08mgsc.nu({
      attributes: $_96dvjsx6jd08mgqy.wrapAll([{
          key: tabConfig.tabAttr(),
          value: 'true'
        }])
    });
  };
  var $_exsagp122jd08mhe1 = { exhibit: exhibit$3 };

  var TabstopSchema = [$_1mrawkx2jd08mgq2.defaulted('tabAttr', 'data-alloy-tabstop')];

  var Tabstopping = $_voa9kw4jd08mglm.create({
    fields: TabstopSchema,
    name: 'tabstopping',
    active: $_exsagp122jd08mhe1
  });

  var clearInputBehaviour = 'input-clearing';
  var field$2 = function (name, placeholder) {
    var inputSpec = $_4gwcwf11ejd08mhb2.record(Input.sketch({
      placeholder: placeholder,
      onSetValue: function (input, data) {
        $_f6t3w1wvjd08mgp1.emit(input, $_6gw9slwxjd08mgph.input());
      },
      inputBehaviours: $_voa9kw4jd08mglm.derive([
        Composing.config({ find: $_4izgwbwajd08mgn6.some }),
        Tabstopping.config({}),
        Keying.config({ mode: 'execution' })
      ]),
      selectOnFocus: false
    }));
    var buttonSpec = $_4gwcwf11ejd08mhb2.record(Button.sketch({
      dom: $_3iuzq510qjd08mh7l.dom('<button class="${prefix}-input-container-x ${prefix}-icon-cancel-circle ${prefix}-icon"></button>'),
      action: function (button) {
        var input = inputSpec.get(button);
        me.setValue(input, '');
      }
    }));
    return {
      name: name,
      spec: Container.sketch({
        dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-input-container"></div>'),
        components: [
          inputSpec.asSpec(),
          buttonSpec.asSpec()
        ],
        containerBehaviours: $_voa9kw4jd08mglm.derive([
          Toggling.config({ toggleClass: $_ete72zz1jd08mgy0.resolve('input-container-empty') }),
          Composing.config({
            find: function (comp) {
              return $_4izgwbwajd08mgn6.some(inputSpec.get(comp));
            }
          }),
          $_ejtkif11sjd08mhcv.config(clearInputBehaviour, [$_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.input(), function (iContainer) {
              var input = inputSpec.get(iContainer);
              var val = me.getValue(input);
              var f = val.length > 0 ? Toggling.off : Toggling.on;
              f(iContainer);
            })])
        ])
      })
    };
  };
  var hidden = function (name) {
    return {
      name: name,
      spec: DataField.sketch({
        dom: {
          tag: 'span',
          styles: { display: 'none' }
        },
        getInitialValue: function () {
          return $_4izgwbwajd08mgn6.none();
        }
      })
    };
  };
  var $_3kncca11rjd08mhce = {
    field: field$2,
    hidden: hidden
  };

  var nativeDisabled = [
    'input',
    'button',
    'textarea'
  ];
  var onLoad$5 = function (component, disableConfig, disableState) {
    if (disableConfig.disabled())
      disable(component, disableConfig, disableState);
  };
  var hasNative = function (component) {
    return $_453g14w9jd08mgmy.contains(nativeDisabled, $_9323z1xxjd08mgti.name(component.element()));
  };
  var nativeIsDisabled = function (component) {
    return $_auw0hixwjd08mgt8.has(component.element(), 'disabled');
  };
  var nativeDisable = function (component) {
    $_auw0hixwjd08mgt8.set(component.element(), 'disabled', 'disabled');
  };
  var nativeEnable = function (component) {
    $_auw0hixwjd08mgt8.remove(component.element(), 'disabled');
  };
  var ariaIsDisabled = function (component) {
    return $_auw0hixwjd08mgt8.get(component.element(), 'aria-disabled') === 'true';
  };
  var ariaDisable = function (component) {
    $_auw0hixwjd08mgt8.set(component.element(), 'aria-disabled', 'true');
  };
  var ariaEnable = function (component) {
    $_auw0hixwjd08mgt8.set(component.element(), 'aria-disabled', 'false');
  };
  var disable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_5tvqrbxujd08mgt5.add(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeDisable : ariaDisable;
    f(component);
  };
  var enable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_5tvqrbxujd08mgt5.remove(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeEnable : ariaEnable;
    f(component);
  };
  var isDisabled = function (component) {
    return hasNative(component) ? nativeIsDisabled(component) : ariaIsDisabled(component);
  };
  var $_g4ooie127jd08mhf1 = {
    enable: enable,
    disable: disable,
    isDisabled: isDisabled,
    onLoad: onLoad$5
  };

  var exhibit$4 = function (base, disableConfig, disableState) {
    return $_bzfvkmxkjd08mgsc.nu({ classes: disableConfig.disabled() ? disableConfig.disableClass().map($_453g14w9jd08mgmy.pure).getOr([]) : [] });
  };
  var events$7 = function (disableConfig, disableState) {
    return $_eexaurw6jd08mgmg.derive([
      $_eexaurw6jd08mgmg.abort($_30aqx5wwjd08mgpa.execute(), function (component, simulatedEvent) {
        return $_g4ooie127jd08mhf1.isDisabled(component, disableConfig, disableState);
      }),
      $_gnbzfw5jd08mglx.loadEvent(disableConfig, disableState, $_g4ooie127jd08mhf1.onLoad)
    ]);
  };
  var $_chxn0e126jd08mhey = {
    exhibit: exhibit$4,
    events: events$7
  };

  var DisableSchema = [
    $_1mrawkx2jd08mgq2.defaulted('disabled', false),
    $_1mrawkx2jd08mgq2.option('disableClass')
  ];

  var Disabling = $_voa9kw4jd08mglm.create({
    fields: DisableSchema,
    name: 'disabling',
    active: $_chxn0e126jd08mhey,
    apis: $_g4ooie127jd08mhf1
  });

  var owner$1 = 'form';
  var schema$9 = [$_8tr5o010djd08mh4k.field('formBehaviours', [me])];
  var getPartName = function (name) {
    return '<alloy.field.' + name + '>';
  };
  var sketch$6 = function (fSpec) {
    var parts = function () {
      var record = [];
      var field = function (name, config) {
        record.push(name);
        return $_fyge8g10ijd08mh5e.generateOne(owner$1, getPartName(name), config);
      };
      return {
        field: field,
        record: function () {
          return record;
        }
      };
    }();
    var spec = fSpec(parts);
    var partNames = parts.record();
    var fieldParts = $_453g14w9jd08mgmy.map(partNames, function (n) {
      return $_eertgd10kjd08mh62.required({
        name: n,
        pname: getPartName(n)
      });
    });
    return $_c50pby10hjd08mh5a.composite(owner$1, schema$9, fieldParts, make, spec);
  };
  var make = function (detail, components, spec) {
    return $_25kgk5wyjd08mgpk.deepMerge({
      'debug.sketcher': { 'Form': spec },
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_25kgk5wyjd08mgpk.deepMerge($_voa9kw4jd08mglm.derive([me.config({
          store: {
            mode: 'manual',
            getValue: function (form) {
              var optPs = $_fyge8g10ijd08mh5e.getAllParts(form, detail);
              return $_1xoayfx0jd08mgpm.map(optPs, function (optPThunk, pName) {
                return optPThunk().bind(Composing.getCurrent).map(me.getValue);
              });
            },
            setValue: function (form, values) {
              $_1xoayfx0jd08mgpm.each(values, function (newValue, key) {
                $_fyge8g10ijd08mh5e.getPart(form, detail, key).each(function (wrapper) {
                  Composing.getCurrent(wrapper).each(function (field) {
                    me.setValue(field, newValue);
                  });
                });
              });
            }
          }
        })]), $_8tr5o010djd08mh4k.get(detail.formBehaviours())),
      apis: {
        getField: function (form, key) {
          return $_fyge8g10ijd08mh5e.getPart(form, detail, key).bind(Composing.getCurrent);
        }
      }
    });
  };
  var $_3s1e2129jd08mhff = {
    getField: $_4l6tow10fjd08mh4y.makeApi(function (apis, component, key) {
      return apis.getField(component, key);
    }),
    sketch: sketch$6
  };

  var revocable = function (doRevoke) {
    var subject = Cell($_4izgwbwajd08mgn6.none());
    var revoke = function () {
      subject.get().each(doRevoke);
    };
    var clear = function () {
      revoke();
      subject.set($_4izgwbwajd08mgn6.none());
    };
    var set = function (s) {
      revoke();
      subject.set($_4izgwbwajd08mgn6.some(s));
    };
    var isSet = function () {
      return subject.get().isSome();
    };
    return {
      clear: clear,
      isSet: isSet,
      set: set
    };
  };
  var destroyable = function () {
    return revocable(function (s) {
      s.destroy();
    });
  };
  var unbindable = function () {
    return revocable(function (s) {
      s.unbind();
    });
  };
  var api$2 = function () {
    var subject = Cell($_4izgwbwajd08mgn6.none());
    var revoke = function () {
      subject.get().each(function (s) {
        s.destroy();
      });
    };
    var clear = function () {
      revoke();
      subject.set($_4izgwbwajd08mgn6.none());
    };
    var set = function (s) {
      revoke();
      subject.set($_4izgwbwajd08mgn6.some(s));
    };
    var run = function (f) {
      subject.get().each(f);
    };
    var isSet = function () {
      return subject.get().isSome();
    };
    return {
      clear: clear,
      isSet: isSet,
      set: set,
      run: run
    };
  };
  var value$3 = function () {
    var subject = Cell($_4izgwbwajd08mgn6.none());
    var clear = function () {
      subject.set($_4izgwbwajd08mgn6.none());
    };
    var set = function (s) {
      subject.set($_4izgwbwajd08mgn6.some(s));
    };
    var on = function (f) {
      subject.get().each(f);
    };
    var isSet = function () {
      return subject.get().isSome();
    };
    return {
      clear: clear,
      set: set,
      isSet: isSet,
      on: on
    };
  };
  var $_daqe5q12ajd08mhfm = {
    destroyable: destroyable,
    unbindable: unbindable,
    api: api$2,
    value: value$3
  };

  var SWIPING_LEFT = 1;
  var SWIPING_RIGHT = -1;
  var SWIPING_NONE = 0;
  var init$3 = function (xValue) {
    return {
      xValue: xValue,
      points: []
    };
  };
  var move = function (model, xValue) {
    if (xValue === model.xValue) {
      return model;
    }
    var currentDirection = xValue - model.xValue > 0 ? SWIPING_LEFT : SWIPING_RIGHT;
    var newPoint = {
      direction: currentDirection,
      xValue: xValue
    };
    var priorPoints = function () {
      if (model.points.length === 0) {
        return [];
      } else {
        var prev = model.points[model.points.length - 1];
        return prev.direction === currentDirection ? model.points.slice(0, model.points.length - 1) : model.points;
      }
    }();
    return {
      xValue: xValue,
      points: priorPoints.concat([newPoint])
    };
  };
  var complete = function (model) {
    if (model.points.length === 0) {
      return SWIPING_NONE;
    } else {
      var firstDirection = model.points[0].direction;
      var lastDirection = model.points[model.points.length - 1].direction;
      return firstDirection === SWIPING_RIGHT && lastDirection === SWIPING_RIGHT ? SWIPING_RIGHT : firstDirection === SWIPING_LEFT && lastDirection === SWIPING_LEFT ? SWIPING_LEFT : SWIPING_NONE;
    }
  };
  var $_6yelh712bjd08mhfs = {
    init: init$3,
    move: move,
    complete: complete
  };

  var sketch$7 = function (rawSpec) {
    var navigateEvent = 'navigateEvent';
    var wrapperAdhocEvents = 'serializer-wrapper-events';
    var formAdhocEvents = 'form-events';
    var schema = $_6eo7r6xhjd08mgrx.objOf([
      $_1mrawkx2jd08mgq2.strict('fields'),
      $_1mrawkx2jd08mgq2.defaulted('maxFieldIndex', rawSpec.fields.length - 1),
      $_1mrawkx2jd08mgq2.strict('onExecute'),
      $_1mrawkx2jd08mgq2.strict('getInitialValue'),
      $_1mrawkx2jd08mgq2.state('state', function () {
        return {
          dialogSwipeState: $_daqe5q12ajd08mhfm.value(),
          currentScreen: Cell(0)
        };
      })
    ]);
    var spec = $_6eo7r6xhjd08mgrx.asRawOrDie('SerialisedDialog', schema, rawSpec);
    var navigationButton = function (direction, directionName, enabled) {
      return Button.sketch({
        dom: $_3iuzq510qjd08mh7l.dom('<span class="${prefix}-icon-' + directionName + ' ${prefix}-icon"></span>'),
        action: function (button) {
          $_f6t3w1wvjd08mgp1.emitWith(button, navigateEvent, { direction: direction });
        },
        buttonBehaviours: $_voa9kw4jd08mglm.derive([Disabling.config({
            disableClass: $_ete72zz1jd08mgy0.resolve('toolbar-navigation-disabled'),
            disabled: !enabled
          })])
      });
    };
    var reposition = function (dialog, message) {
      $_edahi9zmjd08mh0g.descendant(dialog.element(), '.' + $_ete72zz1jd08mgy0.resolve('serialised-dialog-chain')).each(function (parent) {
        $_62cv66zsjd08mh10.set(parent, 'left', -spec.state.currentScreen.get() * message.width + 'px');
      });
    };
    var navigate = function (dialog, direction) {
      var screens = $_48w1m3zkjd08mh0b.descendants(dialog.element(), '.' + $_ete72zz1jd08mgy0.resolve('serialised-dialog-screen'));
      $_edahi9zmjd08mh0g.descendant(dialog.element(), '.' + $_ete72zz1jd08mgy0.resolve('serialised-dialog-chain')).each(function (parent) {
        if (spec.state.currentScreen.get() + direction >= 0 && spec.state.currentScreen.get() + direction < screens.length) {
          $_62cv66zsjd08mh10.getRaw(parent, 'left').each(function (left) {
            var currentLeft = parseInt(left, 10);
            var w = $_7qh6mb117jd08mha2.get(screens[0]);
            $_62cv66zsjd08mh10.set(parent, 'left', currentLeft - direction * w + 'px');
          });
          spec.state.currentScreen.set(spec.state.currentScreen.get() + direction);
        }
      });
    };
    var focusInput = function (dialog) {
      var inputs = $_48w1m3zkjd08mh0b.descendants(dialog.element(), 'input');
      var optInput = $_4izgwbwajd08mgn6.from(inputs[spec.state.currentScreen.get()]);
      optInput.each(function (input) {
        dialog.getSystem().getByDom(input).each(function (inputComp) {
          $_f6t3w1wvjd08mgp1.dispatchFocus(dialog, inputComp.element());
        });
      });
      var dotitems = memDots.get(dialog);
      Highlighting.highlightAt(dotitems, spec.state.currentScreen.get());
    };
    var resetState = function () {
      spec.state.currentScreen.set(0);
      spec.state.dialogSwipeState.clear();
    };
    var memForm = $_4gwcwf11ejd08mhb2.record($_3s1e2129jd08mhff.sketch(function (parts) {
      return {
        dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-serialised-dialog"></div>'),
        components: [Container.sketch({
            dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-serialised-dialog-chain" style="left: 0px; position: absolute;"></div>'),
            components: $_453g14w9jd08mgmy.map(spec.fields, function (field, i) {
              return i <= spec.maxFieldIndex ? Container.sketch({
                dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-serialised-dialog-screen"></div>'),
                components: $_453g14w9jd08mgmy.flatten([
                  [navigationButton(-1, 'previous', i > 0)],
                  [parts.field(field.name, field.spec)],
                  [navigationButton(+1, 'next', i < spec.maxFieldIndex)]
                ])
              }) : parts.field(field.name, field.spec);
            })
          })],
        formBehaviours: $_voa9kw4jd08mglm.derive([
          $_cnlikcz0jd08mgxw.orientation(function (dialog, message) {
            reposition(dialog, message);
          }),
          Keying.config({
            mode: 'special',
            focusIn: function (dialog) {
              focusInput(dialog);
            },
            onTab: function (dialog) {
              navigate(dialog, +1);
              return $_4izgwbwajd08mgn6.some(true);
            },
            onShiftTab: function (dialog) {
              navigate(dialog, -1);
              return $_4izgwbwajd08mgn6.some(true);
            }
          }),
          $_ejtkif11sjd08mhcv.config(formAdhocEvents, [
            $_eexaurw6jd08mgmg.runOnAttached(function (dialog, simulatedEvent) {
              resetState();
              var dotitems = memDots.get(dialog);
              Highlighting.highlightFirst(dotitems);
              spec.getInitialValue(dialog).each(function (v) {
                me.setValue(dialog, v);
              });
            }),
            $_eexaurw6jd08mgmg.runOnExecute(spec.onExecute),
            $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.transitionend(), function (dialog, simulatedEvent) {
              if (simulatedEvent.event().raw().propertyName === 'left') {
                focusInput(dialog);
              }
            }),
            $_eexaurw6jd08mgmg.run(navigateEvent, function (dialog, simulatedEvent) {
              var direction = simulatedEvent.event().direction();
              navigate(dialog, direction);
            })
          ])
        ])
      };
    }));
    var memDots = $_4gwcwf11ejd08mhb2.record({
      dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-dot-container"></div>'),
      behaviours: $_voa9kw4jd08mglm.derive([Highlighting.config({
          highlightClass: $_ete72zz1jd08mgy0.resolve('dot-active'),
          itemClass: $_ete72zz1jd08mgy0.resolve('dot-item')
        })]),
      components: $_453g14w9jd08mgmy.bind(spec.fields, function (_f, i) {
        return i <= spec.maxFieldIndex ? [$_3iuzq510qjd08mh7l.spec('<div class="${prefix}-dot-item ${prefix}-icon-full-dot ${prefix}-icon"></div>')] : [];
      })
    });
    return {
      dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-serializer-wrapper"></div>'),
      components: [
        memForm.asSpec(),
        memDots.asSpec()
      ],
      behaviours: $_voa9kw4jd08mglm.derive([
        Keying.config({
          mode: 'special',
          focusIn: function (wrapper) {
            var form = memForm.get(wrapper);
            Keying.focusIn(form);
          }
        }),
        $_ejtkif11sjd08mhcv.config(wrapperAdhocEvents, [
          $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.touchstart(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.set($_6yelh712bjd08mhfs.init(simulatedEvent.event().raw().touches[0].clientX));
          }),
          $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.touchmove(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.on(function (state) {
              simulatedEvent.event().prevent();
              spec.state.dialogSwipeState.set($_6yelh712bjd08mhfs.move(state, simulatedEvent.event().raw().touches[0].clientX));
            });
          }),
          $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.touchend(), function (wrapper) {
            spec.state.dialogSwipeState.on(function (state) {
              var dialog = memForm.get(wrapper);
              var direction = -1 * $_6yelh712bjd08mhfs.complete(state);
              navigate(dialog, direction);
            });
          })
        ])
      ])
    };
  };
  var $_47djg5124jd08mhe7 = { sketch: sketch$7 };

  var platform$1 = $_dymoxnwgjd08mgng.detect();
  var preserve$1 = function (f, editor) {
    var rng = editor.selection.getRng();
    f();
    editor.selection.setRng(rng);
  };
  var forAndroid = function (editor, f) {
    var wrapper = platform$1.os.isAndroid() ? preserve$1 : $_8zkcijwbjd08mgn8.apply;
    wrapper(f, editor);
  };
  var $_1n4thn12cjd08mhfu = { forAndroid: forAndroid };

  var getGroups = $_2crir4whjd08mgni.cached(function (realm, editor) {
    return [{
        label: 'the link group',
        items: [$_47djg5124jd08mhe7.sketch({
            fields: [
              $_3kncca11rjd08mhce.field('url', 'Type or paste URL'),
              $_3kncca11rjd08mhce.field('text', 'Link text'),
              $_3kncca11rjd08mhce.field('title', 'Link title'),
              $_3kncca11rjd08mhce.field('target', 'Link target'),
              $_3kncca11rjd08mhce.hidden('link')
            ],
            maxFieldIndex: [
              'url',
              'text',
              'title',
              'target'
            ].length - 1,
            getInitialValue: function () {
              return $_4izgwbwajd08mgn6.some($_780m1k11pjd08mhc6.getInfo(editor));
            },
            onExecute: function (dialog) {
              var info = me.getValue(dialog);
              $_780m1k11pjd08mhc6.applyInfo(editor, info);
              realm.restoreToolbar();
              editor.focus();
            }
          })]
      }];
  });
  var sketch$8 = function (realm, editor) {
    return $_9w4shzz2jd08mgy1.forToolbarStateAction(editor, 'link', 'link', function () {
      var groups = getGroups(realm, editor);
      realm.setContextToolbar(groups);
      $_1n4thn12cjd08mhfu.forAndroid(editor, function () {
        realm.focusToolbar();
      });
      $_780m1k11pjd08mhc6.query(editor).each(function (link) {
        editor.selection.select(link.dom());
      });
    });
  };
  var $_4l23ox11ojd08mhc1 = { sketch: sketch$8 };

  var DefaultStyleFormats = [
    {
      title: 'Headings',
      items: [
        {
          title: 'Heading 1',
          format: 'h1'
        },
        {
          title: 'Heading 2',
          format: 'h2'
        },
        {
          title: 'Heading 3',
          format: 'h3'
        },
        {
          title: 'Heading 4',
          format: 'h4'
        },
        {
          title: 'Heading 5',
          format: 'h5'
        },
        {
          title: 'Heading 6',
          format: 'h6'
        }
      ]
    },
    {
      title: 'Inline',
      items: [
        {
          title: 'Bold',
          icon: 'bold',
          format: 'bold'
        },
        {
          title: 'Italic',
          icon: 'italic',
          format: 'italic'
        },
        {
          title: 'Underline',
          icon: 'underline',
          format: 'underline'
        },
        {
          title: 'Strikethrough',
          icon: 'strikethrough',
          format: 'strikethrough'
        },
        {
          title: 'Superscript',
          icon: 'superscript',
          format: 'superscript'
        },
        {
          title: 'Subscript',
          icon: 'subscript',
          format: 'subscript'
        },
        {
          title: 'Code',
          icon: 'code',
          format: 'code'
        }
      ]
    },
    {
      title: 'Blocks',
      items: [
        {
          title: 'Paragraph',
          format: 'p'
        },
        {
          title: 'Blockquote',
          format: 'blockquote'
        },
        {
          title: 'Div',
          format: 'div'
        },
        {
          title: 'Pre',
          format: 'pre'
        }
      ]
    },
    {
      title: 'Alignment',
      items: [
        {
          title: 'Left',
          icon: 'alignleft',
          format: 'alignleft'
        },
        {
          title: 'Center',
          icon: 'aligncenter',
          format: 'aligncenter'
        },
        {
          title: 'Right',
          icon: 'alignright',
          format: 'alignright'
        },
        {
          title: 'Justify',
          icon: 'alignjustify',
          format: 'alignjustify'
        }
      ]
    }
  ];

  var findRoute = function (component, transConfig, transState, route) {
    return $_96dvjsx6jd08mgqy.readOptFrom(transConfig.routes(), route.start()).map($_8zkcijwbjd08mgn8.apply).bind(function (sConfig) {
      return $_96dvjsx6jd08mgqy.readOptFrom(sConfig, route.destination()).map($_8zkcijwbjd08mgn8.apply);
    });
  };
  var getTransition = function (comp, transConfig, transState) {
    var route = getCurrentRoute(comp, transConfig, transState);
    return route.bind(function (r) {
      return getTransitionOf(comp, transConfig, transState, r);
    });
  };
  var getTransitionOf = function (comp, transConfig, transState, route) {
    return findRoute(comp, transConfig, transState, route).bind(function (r) {
      return r.transition().map(function (t) {
        return {
          transition: $_8zkcijwbjd08mgn8.constant(t),
          route: $_8zkcijwbjd08mgn8.constant(r)
        };
      });
    });
  };
  var disableTransition = function (comp, transConfig, transState) {
    getTransition(comp, transConfig, transState).each(function (routeTransition) {
      var t = routeTransition.transition();
      $_5tvqrbxujd08mgt5.remove(comp.element(), t.transitionClass());
      $_auw0hixwjd08mgt8.remove(comp.element(), transConfig.destinationAttr());
    });
  };
  var getNewRoute = function (comp, transConfig, transState, destination) {
    return {
      start: $_8zkcijwbjd08mgn8.constant($_auw0hixwjd08mgt8.get(comp.element(), transConfig.stateAttr())),
      destination: $_8zkcijwbjd08mgn8.constant(destination)
    };
  };
  var getCurrentRoute = function (comp, transConfig, transState) {
    var el = comp.element();
    return $_auw0hixwjd08mgt8.has(el, transConfig.destinationAttr()) ? $_4izgwbwajd08mgn6.some({
      start: $_8zkcijwbjd08mgn8.constant($_auw0hixwjd08mgt8.get(comp.element(), transConfig.stateAttr())),
      destination: $_8zkcijwbjd08mgn8.constant($_auw0hixwjd08mgt8.get(comp.element(), transConfig.destinationAttr()))
    }) : $_4izgwbwajd08mgn6.none();
  };
  var jumpTo = function (comp, transConfig, transState, destination) {
    disableTransition(comp, transConfig, transState);
    if ($_auw0hixwjd08mgt8.has(comp.element(), transConfig.stateAttr()) && $_auw0hixwjd08mgt8.get(comp.element(), transConfig.stateAttr()) !== destination)
      transConfig.onFinish()(comp, destination);
    $_auw0hixwjd08mgt8.set(comp.element(), transConfig.stateAttr(), destination);
  };
  var fasttrack = function (comp, transConfig, transState, destination) {
    if ($_auw0hixwjd08mgt8.has(comp.element(), transConfig.destinationAttr())) {
      $_auw0hixwjd08mgt8.set(comp.element(), transConfig.stateAttr(), $_auw0hixwjd08mgt8.get(comp.element(), transConfig.destinationAttr()));
      $_auw0hixwjd08mgt8.remove(comp.element(), transConfig.destinationAttr());
    }
  };
  var progressTo = function (comp, transConfig, transState, destination) {
    fasttrack(comp, transConfig, transState, destination);
    var route = getNewRoute(comp, transConfig, transState, destination);
    getTransitionOf(comp, transConfig, transState, route).fold(function () {
      jumpTo(comp, transConfig, transState, destination);
    }, function (routeTransition) {
      disableTransition(comp, transConfig, transState);
      var t = routeTransition.transition();
      $_5tvqrbxujd08mgt5.add(comp.element(), t.transitionClass());
      $_auw0hixwjd08mgt8.set(comp.element(), transConfig.destinationAttr(), destination);
    });
  };
  var getState = function (comp, transConfig, transState) {
    var e = comp.element();
    return $_auw0hixwjd08mgt8.has(e, transConfig.stateAttr()) ? $_4izgwbwajd08mgn6.some($_auw0hixwjd08mgt8.get(e, transConfig.stateAttr())) : $_4izgwbwajd08mgn6.none();
  };
  var $_242da112ijd08mhh2 = {
    findRoute: findRoute,
    disableTransition: disableTransition,
    getCurrentRoute: getCurrentRoute,
    jumpTo: jumpTo,
    progressTo: progressTo,
    getState: getState
  };

  var events$8 = function (transConfig, transState) {
    return $_eexaurw6jd08mgmg.derive([
      $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        $_242da112ijd08mhh2.getCurrentRoute(component, transConfig, transState).each(function (route) {
          $_242da112ijd08mhh2.findRoute(component, transConfig, transState, route).each(function (rInfo) {
            rInfo.transition().each(function (rTransition) {
              if (raw.propertyName === rTransition.property()) {
                $_242da112ijd08mhh2.jumpTo(component, transConfig, transState, route.destination());
                transConfig.onTransition()(component, route);
              }
            });
          });
        });
      }),
      $_eexaurw6jd08mgmg.runOnAttached(function (comp, se) {
        $_242da112ijd08mhh2.jumpTo(comp, transConfig, transState, transConfig.initialState());
      })
    ]);
  };
  var $_g5kwmc12hjd08mhh0 = { events: events$8 };

  var TransitionSchema = [
    $_1mrawkx2jd08mgq2.defaulted('destinationAttr', 'data-transitioning-destination'),
    $_1mrawkx2jd08mgq2.defaulted('stateAttr', 'data-transitioning-state'),
    $_1mrawkx2jd08mgq2.strict('initialState'),
    $_6uz7ybytjd08mgwm.onHandler('onTransition'),
    $_6uz7ybytjd08mgwm.onHandler('onFinish'),
    $_1mrawkx2jd08mgq2.strictOf('routes', $_6eo7r6xhjd08mgrx.setOf($_2y9mlbx8jd08mgr7.value, $_6eo7r6xhjd08mgrx.setOf($_2y9mlbx8jd08mgr7.value, $_6eo7r6xhjd08mgrx.objOfOnly([$_1mrawkx2jd08mgq2.optionObjOfOnly('transition', [
        $_1mrawkx2jd08mgq2.strict('property'),
        $_1mrawkx2jd08mgq2.strict('transitionClass')
      ])]))))
  ];

  var createRoutes = function (routes) {
    var r = {};
    $_1xoayfx0jd08mgpm.each(routes, function (v, k) {
      var waypoints = k.split('<->');
      r[waypoints[0]] = $_96dvjsx6jd08mgqy.wrap(waypoints[1], v);
      r[waypoints[1]] = $_96dvjsx6jd08mgqy.wrap(waypoints[0], v);
    });
    return r;
  };
  var createBistate = function (first, second, transitions) {
    return $_96dvjsx6jd08mgqy.wrapAll([
      {
        key: first,
        value: $_96dvjsx6jd08mgqy.wrap(second, transitions)
      },
      {
        key: second,
        value: $_96dvjsx6jd08mgqy.wrap(first, transitions)
      }
    ]);
  };
  var createTristate = function (first, second, third, transitions) {
    return $_96dvjsx6jd08mgqy.wrapAll([
      {
        key: first,
        value: $_96dvjsx6jd08mgqy.wrapAll([
          {
            key: second,
            value: transitions
          },
          {
            key: third,
            value: transitions
          }
        ])
      },
      {
        key: second,
        value: $_96dvjsx6jd08mgqy.wrapAll([
          {
            key: first,
            value: transitions
          },
          {
            key: third,
            value: transitions
          }
        ])
      },
      {
        key: third,
        value: $_96dvjsx6jd08mgqy.wrapAll([
          {
            key: first,
            value: transitions
          },
          {
            key: second,
            value: transitions
          }
        ])
      }
    ]);
  };
  var Transitioning = $_voa9kw4jd08mglm.create({
    fields: TransitionSchema,
    name: 'transitioning',
    active: $_g5kwmc12hjd08mhh0,
    apis: $_242da112ijd08mhh2,
    extra: {
      createRoutes: createRoutes,
      createBistate: createBistate,
      createTristate: createTristate
    }
  });

  var generateFrom = function (spec, all) {
    var schema = $_453g14w9jd08mgmy.map(all, function (a) {
      return $_1mrawkx2jd08mgq2.field(a.name(), a.name(), $_dlh1w7x3jd08mgq8.asOption(), $_6eo7r6xhjd08mgrx.objOf([
        $_1mrawkx2jd08mgq2.strict('config'),
        $_1mrawkx2jd08mgq2.defaulted('state', $_ginglqxqjd08mgsw)
      ]));
    });
    var validated = $_6eo7r6xhjd08mgrx.asStruct('component.behaviours', $_6eo7r6xhjd08mgrx.objOf(schema), spec.behaviours).fold(function (errInfo) {
      throw new Error($_6eo7r6xhjd08mgrx.formatError(errInfo) + '\nComplete spec:\n' + $_ggze9axfjd08mgrt.stringify(spec, null, 2));
    }, $_8zkcijwbjd08mgn8.identity);
    return {
      list: all,
      data: $_1xoayfx0jd08mgpm.map(validated, function (blobOptionThunk) {
        var blobOption = blobOptionThunk();
        return $_8zkcijwbjd08mgn8.constant(blobOption.map(function (blob) {
          return {
            config: blob.config(),
            state: blob.state().init(blob.config())
          };
        }));
      })
    };
  };
  var getBehaviours = function (bData) {
    return bData.list;
  };
  var getData = function (bData) {
    return bData.data;
  };
  var $_2bakp412njd08mhin = {
    generateFrom: generateFrom,
    getBehaviours: getBehaviours,
    getData: getData
  };

  var getBehaviours$1 = function (spec) {
    var behaviours = $_96dvjsx6jd08mgqy.readOptFrom(spec, 'behaviours').getOr({});
    var keys = $_453g14w9jd08mgmy.filter($_1xoayfx0jd08mgpm.keys(behaviours), function (k) {
      return behaviours[k] !== undefined;
    });
    return $_453g14w9jd08mgmy.map(keys, function (k) {
      return spec.behaviours[k].me;
    });
  };
  var generateFrom$1 = function (spec, all) {
    return $_2bakp412njd08mhin.generateFrom(spec, all);
  };
  var generate$4 = function (spec) {
    var all = getBehaviours$1(spec);
    return generateFrom$1(spec, all);
  };
  var $_9g0q2612mjd08mhii = {
    generate: generate$4,
    generateFrom: generateFrom$1
  };

  var ComponentApi = $_asxw7nxsjd08mgt0.exactly([
    'getSystem',
    'config',
    'hasConfigured',
    'spec',
    'connect',
    'disconnect',
    'element',
    'syncComponents',
    'readState',
    'components',
    'events'
  ]);

  var SystemApi = $_asxw7nxsjd08mgt0.exactly([
    'debugInfo',
    'triggerFocus',
    'triggerEvent',
    'triggerEscape',
    'addToWorld',
    'removeFromWorld',
    'addToGui',
    'removeFromGui',
    'build',
    'getByUid',
    'getByDom',
    'broadcast',
    'broadcastOn'
  ]);

  function NoContextApi (getComp) {
    var fail = function (event) {
      return function () {
        throw new Error('The component must be in a context to send: ' + event + '\n' + $_c4961ry9jd08mguz.element(getComp().element()) + ' is not in context.');
      };
    };
    return SystemApi({
      debugInfo: $_8zkcijwbjd08mgn8.constant('fake'),
      triggerEvent: fail('triggerEvent'),
      triggerFocus: fail('triggerFocus'),
      triggerEscape: fail('triggerEscape'),
      build: fail('build'),
      addToWorld: fail('addToWorld'),
      removeFromWorld: fail('removeFromWorld'),
      addToGui: fail('addToGui'),
      removeFromGui: fail('removeFromGui'),
      getByUid: fail('getByUid'),
      getByDom: fail('getByDom'),
      broadcast: fail('broadcast'),
      broadcastOn: fail('broadcastOn')
    });
  }

  var byInnerKey = function (data, tuple) {
    var r = {};
    $_1xoayfx0jd08mgpm.each(data, function (detail, key) {
      $_1xoayfx0jd08mgpm.each(detail, function (value, indexKey) {
        var chain = $_96dvjsx6jd08mgqy.readOr(indexKey, [])(r);
        r[indexKey] = chain.concat([tuple(key, value)]);
      });
    });
    return r;
  };
  var $_bp3vyy12sjd08mhjl = { byInnerKey: byInnerKey };

  var behaviourDom = function (name, modification) {
    return {
      name: $_8zkcijwbjd08mgn8.constant(name),
      modification: modification
    };
  };
  var concat = function (chain, aspect) {
    var values = $_453g14w9jd08mgmy.bind(chain, function (c) {
      return c.modification().getOr([]);
    });
    return $_2y9mlbx8jd08mgr7.value($_96dvjsx6jd08mgqy.wrap(aspect, values));
  };
  var onlyOne = function (chain, aspect, order) {
    if (chain.length > 1)
      return $_2y9mlbx8jd08mgr7.error('Multiple behaviours have tried to change DOM "' + aspect + '". The guilty behaviours are: ' + $_ggze9axfjd08mgrt.stringify($_453g14w9jd08mgmy.map(chain, function (b) {
        return b.name();
      })) + '. At this stage, this ' + 'is not supported. Future releases might provide strategies for resolving this.');
    else if (chain.length === 0)
      return $_2y9mlbx8jd08mgr7.value({});
    else
      return $_2y9mlbx8jd08mgr7.value(chain[0].modification().fold(function () {
        return {};
      }, function (m) {
        return $_96dvjsx6jd08mgqy.wrap(aspect, m);
      }));
  };
  var duplicate = function (aspect, k, obj, behaviours) {
    return $_2y9mlbx8jd08mgr7.error('Mulitple behaviours have tried to change the _' + k + '_ "' + aspect + '"' + '. The guilty behaviours are: ' + $_ggze9axfjd08mgrt.stringify($_453g14w9jd08mgmy.bind(behaviours, function (b) {
      return b.modification().getOr({})[k] !== undefined ? [b.name()] : [];
    }), null, 2) + '. This is not currently supported.');
  };
  var safeMerge = function (chain, aspect) {
    var y = $_453g14w9jd08mgmy.foldl(chain, function (acc, c) {
      var obj = c.modification().getOr({});
      return acc.bind(function (accRest) {
        var parts = $_1xoayfx0jd08mgpm.mapToArray(obj, function (v, k) {
          return accRest[k] !== undefined ? duplicate(aspect, k, obj, chain) : $_2y9mlbx8jd08mgr7.value($_96dvjsx6jd08mgqy.wrap(k, v));
        });
        return $_96dvjsx6jd08mgqy.consolidate(parts, accRest);
      });
    }, $_2y9mlbx8jd08mgr7.value({}));
    return y.map(function (yValue) {
      return $_96dvjsx6jd08mgqy.wrap(aspect, yValue);
    });
  };
  var mergeTypes = {
    classes: concat,
    attributes: safeMerge,
    styles: safeMerge,
    domChildren: onlyOne,
    defChildren: onlyOne,
    innerHtml: onlyOne,
    value: onlyOne
  };
  var combine$1 = function (info, baseMod, behaviours, base) {
    var behaviourDoms = $_25kgk5wyjd08mgpk.deepMerge({}, baseMod);
    $_453g14w9jd08mgmy.each(behaviours, function (behaviour) {
      behaviourDoms[behaviour.name()] = behaviour.exhibit(info, base);
    });
    var byAspect = $_bp3vyy12sjd08mhjl.byInnerKey(behaviourDoms, behaviourDom);
    var usedAspect = $_1xoayfx0jd08mgpm.map(byAspect, function (values, aspect) {
      return $_453g14w9jd08mgmy.bind(values, function (value) {
        return value.modification().fold(function () {
          return [];
        }, function (v) {
          return [value];
        });
      });
    });
    var modifications = $_1xoayfx0jd08mgpm.mapToArray(usedAspect, function (values, aspect) {
      return $_96dvjsx6jd08mgqy.readOptFrom(mergeTypes, aspect).fold(function () {
        return $_2y9mlbx8jd08mgr7.error('Unknown field type: ' + aspect);
      }, function (merger) {
        return merger(values, aspect);
      });
    });
    var consolidated = $_96dvjsx6jd08mgqy.consolidate(modifications, {});
    return consolidated.map($_bzfvkmxkjd08mgsc.nu);
  };
  var $_6je36912rjd08mhj8 = { combine: combine$1 };

  var sortKeys = function (label, keyName, array, order) {
    var sliced = array.slice(0);
    try {
      var sorted = sliced.sort(function (a, b) {
        var aKey = a[keyName]();
        var bKey = b[keyName]();
        var aIndex = order.indexOf(aKey);
        var bIndex = order.indexOf(bKey);
        if (aIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + aKey + '.\nOrder specified: ' + $_ggze9axfjd08mgrt.stringify(order, null, 2));
        if (bIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + bKey + '.\nOrder specified: ' + $_ggze9axfjd08mgrt.stringify(order, null, 2));
        if (aIndex < bIndex)
          return -1;
        else if (bIndex < aIndex)
          return 1;
        else
          return 0;
      });
      return $_2y9mlbx8jd08mgr7.value(sorted);
    } catch (err) {
      return $_2y9mlbx8jd08mgr7.error([err]);
    }
  };
  var $_exwkqs12ujd08mhk3 = { sortKeys: sortKeys };

  var nu$7 = function (handler, purpose) {
    return {
      handler: handler,
      purpose: $_8zkcijwbjd08mgn8.constant(purpose)
    };
  };
  var curryArgs = function (descHandler, extraArgs) {
    return {
      handler: $_8zkcijwbjd08mgn8.curry.apply(undefined, [descHandler.handler].concat(extraArgs)),
      purpose: descHandler.purpose
    };
  };
  var getHandler = function (descHandler) {
    return descHandler.handler;
  };
  var $_2yncnq12vjd08mhka = {
    nu: nu$7,
    curryArgs: curryArgs,
    getHandler: getHandler
  };

  var behaviourTuple = function (name, handler) {
    return {
      name: $_8zkcijwbjd08mgn8.constant(name),
      handler: $_8zkcijwbjd08mgn8.constant(handler)
    };
  };
  var nameToHandlers = function (behaviours, info) {
    var r = {};
    $_453g14w9jd08mgmy.each(behaviours, function (behaviour) {
      r[behaviour.name()] = behaviour.handlers(info);
    });
    return r;
  };
  var groupByEvents = function (info, behaviours, base) {
    var behaviourEvents = $_25kgk5wyjd08mgpk.deepMerge(base, nameToHandlers(behaviours, info));
    return $_bp3vyy12sjd08mhjl.byInnerKey(behaviourEvents, behaviourTuple);
  };
  var combine$2 = function (info, eventOrder, behaviours, base) {
    var byEventName = groupByEvents(info, behaviours, base);
    return combineGroups(byEventName, eventOrder);
  };
  var assemble = function (rawHandler) {
    var handler = $_2j304sx1jd08mgpp.read(rawHandler);
    return function (component, simulatedEvent) {
      var args = Array.prototype.slice.call(arguments, 0);
      if (handler.abort.apply(undefined, args)) {
        simulatedEvent.stop();
      } else if (handler.can.apply(undefined, args)) {
        handler.run.apply(undefined, args);
      }
    };
  };
  var missingOrderError = function (eventName, tuples) {
    return new $_2y9mlbx8jd08mgr7.error(['The event (' + eventName + ') has more than one behaviour that listens to it.\nWhen this occurs, you must ' + 'specify an event ordering for the behaviours in your spec (e.g. [ "listing", "toggling" ]).\nThe behaviours that ' + 'can trigger it are: ' + $_ggze9axfjd08mgrt.stringify($_453g14w9jd08mgmy.map(tuples, function (c) {
        return c.name();
      }), null, 2)]);
  };
  var fuse$1 = function (tuples, eventOrder, eventName) {
    var order = eventOrder[eventName];
    if (!order)
      return missingOrderError(eventName, tuples);
    else
      return $_exwkqs12ujd08mhk3.sortKeys('Event: ' + eventName, 'name', tuples, order).map(function (sortedTuples) {
        var handlers = $_453g14w9jd08mgmy.map(sortedTuples, function (tuple) {
          return tuple.handler();
        });
        return $_2j304sx1jd08mgpp.fuse(handlers);
      });
  };
  var combineGroups = function (byEventName, eventOrder) {
    var r = $_1xoayfx0jd08mgpm.mapToArray(byEventName, function (tuples, eventName) {
      var combined = tuples.length === 1 ? $_2y9mlbx8jd08mgr7.value(tuples[0].handler()) : fuse$1(tuples, eventOrder, eventName);
      return combined.map(function (handler) {
        var assembled = assemble(handler);
        var purpose = tuples.length > 1 ? $_453g14w9jd08mgmy.filter(eventOrder, function (o) {
          return $_453g14w9jd08mgmy.contains(tuples, function (t) {
            return t.name() === o;
          });
        }).join(' > ') : tuples[0].name();
        return $_96dvjsx6jd08mgqy.wrap(eventName, $_2yncnq12vjd08mhka.nu(assembled, purpose));
      });
    });
    return $_96dvjsx6jd08mgqy.consolidate(r, {});
  };
  var $_wfpzf12tjd08mhjq = { combine: combine$2 };

  var toInfo = function (spec) {
    return $_6eo7r6xhjd08mgrx.asStruct('custom.definition', $_6eo7r6xhjd08mgrx.objOfOnly([
      $_1mrawkx2jd08mgq2.field('dom', 'dom', $_dlh1w7x3jd08mgq8.strict(), $_6eo7r6xhjd08mgrx.objOfOnly([
        $_1mrawkx2jd08mgq2.strict('tag'),
        $_1mrawkx2jd08mgq2.defaulted('styles', {}),
        $_1mrawkx2jd08mgq2.defaulted('classes', []),
        $_1mrawkx2jd08mgq2.defaulted('attributes', {}),
        $_1mrawkx2jd08mgq2.option('value'),
        $_1mrawkx2jd08mgq2.option('innerHtml')
      ])),
      $_1mrawkx2jd08mgq2.strict('components'),
      $_1mrawkx2jd08mgq2.strict('uid'),
      $_1mrawkx2jd08mgq2.defaulted('events', {}),
      $_1mrawkx2jd08mgq2.defaulted('apis', $_8zkcijwbjd08mgn8.constant({})),
      $_1mrawkx2jd08mgq2.field('eventOrder', 'eventOrder', $_dlh1w7x3jd08mgq8.mergeWith({
        'alloy.execute': [
          'disabling',
          'alloy.base.behaviour',
          'toggling'
        ],
        'alloy.focus': [
          'alloy.base.behaviour',
          'focusing',
          'keying'
        ],
        'alloy.system.init': [
          'alloy.base.behaviour',
          'disabling',
          'toggling',
          'representing'
        ],
        'input': [
          'alloy.base.behaviour',
          'representing',
          'streaming',
          'invalidating'
        ],
        'alloy.system.detached': [
          'alloy.base.behaviour',
          'representing'
        ]
      }), $_6eo7r6xhjd08mgrx.anyValue()),
      $_1mrawkx2jd08mgq2.option('domModification'),
      $_6uz7ybytjd08mgwm.snapshot('originalSpec'),
      $_1mrawkx2jd08mgq2.defaulted('debug.sketcher', 'unknown')
    ]), spec);
  };
  var getUid = function (info) {
    return $_96dvjsx6jd08mgqy.wrap($_9254j110njd08mh6y.idAttr(), info.uid());
  };
  var toDefinition = function (info) {
    var base = {
      tag: info.dom().tag(),
      classes: info.dom().classes(),
      attributes: $_25kgk5wyjd08mgpk.deepMerge(getUid(info), info.dom().attributes()),
      styles: info.dom().styles(),
      domChildren: $_453g14w9jd08mgmy.map(info.components(), function (comp) {
        return comp.element();
      })
    };
    return $_9ygbf2xljd08mgsm.nu($_25kgk5wyjd08mgpk.deepMerge(base, info.dom().innerHtml().map(function (h) {
      return $_96dvjsx6jd08mgqy.wrap('innerHtml', h);
    }).getOr({}), info.dom().value().map(function (h) {
      return $_96dvjsx6jd08mgqy.wrap('value', h);
    }).getOr({})));
  };
  var toModification = function (info) {
    return info.domModification().fold(function () {
      return $_bzfvkmxkjd08mgsc.nu({});
    }, $_bzfvkmxkjd08mgsc.nu);
  };
  var toApis = function (info) {
    return info.apis();
  };
  var toEvents = function (info) {
    return info.events();
  };
  var $_3ey84j12wjd08mhke = {
    toInfo: toInfo,
    toDefinition: toDefinition,
    toModification: toModification,
    toApis: toApis,
    toEvents: toEvents
  };

  var add$3 = function (element, classes) {
    $_453g14w9jd08mgmy.each(classes, function (x) {
      $_5tvqrbxujd08mgt5.add(element, x);
    });
  };
  var remove$6 = function (element, classes) {
    $_453g14w9jd08mgmy.each(classes, function (x) {
      $_5tvqrbxujd08mgt5.remove(element, x);
    });
  };
  var toggle$3 = function (element, classes) {
    $_453g14w9jd08mgmy.each(classes, function (x) {
      $_5tvqrbxujd08mgt5.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_453g14w9jd08mgmy.forall(classes, function (clazz) {
      return $_5tvqrbxujd08mgt5.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_453g14w9jd08mgmy.exists(classes, function (clazz) {
      return $_5tvqrbxujd08mgt5.has(element, clazz);
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
  var get$10 = function (element) {
    return $_7mj7wlxyjd08mgtk.supports(element) ? getNative(element) : $_7mj7wlxyjd08mgtk.get(element);
  };
  var $_b2zn7l12yjd08mhl1 = {
    add: add$3,
    remove: remove$6,
    toggle: toggle$3,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$10
  };

  var getChildren = function (definition) {
    if (definition.domChildren().isSome() && definition.defChildren().isSome()) {
      throw new Error('Cannot specify children and child specs! Must be one or the other.\nDef: ' + $_9ygbf2xljd08mgsm.defToStr(definition));
    } else {
      return definition.domChildren().fold(function () {
        var defChildren = definition.defChildren().getOr([]);
        return $_453g14w9jd08mgmy.map(defChildren, renderDef);
      }, function (domChildren) {
        return domChildren;
      });
    }
  };
  var renderToDom = function (definition) {
    var subject = $_3visdkwtjd08mgor.fromTag(definition.tag());
    $_auw0hixwjd08mgt8.setAll(subject, definition.attributes().getOr({}));
    $_b2zn7l12yjd08mhl1.add(subject, definition.classes().getOr([]));
    $_62cv66zsjd08mh10.setAll(subject, definition.styles().getOr({}));
    $_c574qmybjd08mgv4.set(subject, definition.innerHtml().getOr(''));
    var children = getChildren(definition);
    $_47o1kzy6jd08mguk.append(subject, children);
    definition.value().each(function (value) {
      $_hl3sv120jd08mhdz.set(subject, value);
    });
    return subject;
  };
  var renderDef = function (spec) {
    var definition = $_9ygbf2xljd08mgsm.nu(spec);
    return renderToDom(definition);
  };
  var $_4l2b2i12xjd08mhkp = { renderToDom: renderToDom };

  var build = function (spec) {
    var getMe = function () {
      return me;
    };
    var systemApi = Cell(NoContextApi(getMe));
    var info = $_6eo7r6xhjd08mgrx.getOrDie($_3ey84j12wjd08mhke.toInfo($_25kgk5wyjd08mgpk.deepMerge(spec, { behaviours: undefined })));
    var bBlob = $_9g0q2612mjd08mhii.generate(spec);
    var bList = $_2bakp412njd08mhin.getBehaviours(bBlob);
    var bData = $_2bakp412njd08mhin.getData(bBlob);
    var definition = $_3ey84j12wjd08mhke.toDefinition(info);
    var baseModification = { 'alloy.base.modification': $_3ey84j12wjd08mhke.toModification(info) };
    var modification = $_6je36912rjd08mhj8.combine(bData, baseModification, bList, definition).getOrDie();
    var modDefinition = $_bzfvkmxkjd08mgsc.merge(definition, modification);
    var item = $_4l2b2i12xjd08mhkp.renderToDom(modDefinition);
    var baseEvents = { 'alloy.base.behaviour': $_3ey84j12wjd08mhke.toEvents(info) };
    var events = $_wfpzf12tjd08mhjq.combine(bData, info.eventOrder(), bList, baseEvents).getOrDie();
    var subcomponents = Cell(info.components());
    var connect = function (newApi) {
      systemApi.set(newApi);
    };
    var disconnect = function () {
      systemApi.set(NoContextApi(getMe));
    };
    var syncComponents = function () {
      var children = $_4uhv6ey3jd08mgu3.children(item);
      var subs = $_453g14w9jd08mgmy.bind(children, function (child) {
        return systemApi.get().getByDom(child).fold(function () {
          return [];
        }, function (c) {
          return [c];
        });
      });
      subcomponents.set(subs);
    };
    var config = function (behaviour) {
      if (behaviour === $_4l6tow10fjd08mh4y.apiConfig())
        return info.apis();
      var b = bData;
      var f = $_erilttwzjd08mgpl.isFunction(b[behaviour.name()]) ? b[behaviour.name()] : function () {
        throw new Error('Could not find ' + behaviour.name() + ' in ' + $_ggze9axfjd08mgrt.stringify(spec, null, 2));
      };
      return f();
    };
    var hasConfigured = function (behaviour) {
      return $_erilttwzjd08mgpl.isFunction(bData[behaviour.name()]);
    };
    var readState = function (behaviourName) {
      return bData[behaviourName]().map(function (b) {
        return b.state.readState();
      }).getOr('not enabled');
    };
    var me = ComponentApi({
      getSystem: systemApi.get,
      config: config,
      hasConfigured: hasConfigured,
      spec: $_8zkcijwbjd08mgn8.constant(spec),
      readState: readState,
      connect: connect,
      disconnect: disconnect,
      element: $_8zkcijwbjd08mgn8.constant(item),
      syncComponents: syncComponents,
      components: subcomponents.get,
      events: $_8zkcijwbjd08mgn8.constant(events)
    });
    return me;
  };
  var $_7hqa3b12ljd08mhi5 = { build: build };

  var isRecursive = function (component, originator, target) {
    return $_ctdo1gw8jd08mgmp.eq(originator, component.element()) && !$_ctdo1gw8jd08mgmp.eq(originator, target);
  };
  var $_6krs0y12zjd08mhl5 = {
    events: $_eexaurw6jd08mgmg.derive([$_eexaurw6jd08mgmg.can($_30aqx5wwjd08mgpa.focus(), function (component, simulatedEvent) {
        var originator = simulatedEvent.event().originator();
        var target = simulatedEvent.event().target();
        if (isRecursive(component, originator, target)) {
          console.warn($_30aqx5wwjd08mgpa.focus() + ' did not get interpreted by the desired target. ' + '\nOriginator: ' + $_c4961ry9jd08mguz.element(originator) + '\nTarget: ' + $_c4961ry9jd08mguz.element(target) + '\nCheck the ' + $_30aqx5wwjd08mgpa.focus() + ' event handlers');
          return false;
        } else {
          return true;
        }
      })])
  };

  var make$1 = function (spec) {
    return spec;
  };
  var $_2pgnnt130jd08mhl9 = { make: make$1 };

  var buildSubcomponents = function (spec) {
    var components = $_96dvjsx6jd08mgqy.readOr('components', [])(spec);
    return $_453g14w9jd08mgmy.map(components, build$1);
  };
  var buildFromSpec = function (userSpec) {
    var spec = $_2pgnnt130jd08mhl9.make(userSpec);
    var components = buildSubcomponents(spec);
    var completeSpec = $_25kgk5wyjd08mgpk.deepMerge($_6krs0y12zjd08mhl5, spec, $_96dvjsx6jd08mgqy.wrap('components', components));
    return $_2y9mlbx8jd08mgr7.value($_7hqa3b12ljd08mhi5.build(completeSpec));
  };
  var text = function (textContent) {
    var element = $_3visdkwtjd08mgor.fromText(textContent);
    return external({ element: element });
  };
  var external = function (spec) {
    var extSpec = $_6eo7r6xhjd08mgrx.asStructOrDie('external.component', $_6eo7r6xhjd08mgrx.objOfOnly([
      $_1mrawkx2jd08mgq2.strict('element'),
      $_1mrawkx2jd08mgq2.option('uid')
    ]), spec);
    var systemApi = Cell(NoContextApi());
    var connect = function (newApi) {
      systemApi.set(newApi);
    };
    var disconnect = function () {
      systemApi.set(NoContextApi(function () {
        return me;
      }));
    };
    extSpec.uid().each(function (uid) {
      $_90bcgv10mjd08mh6p.writeOnly(extSpec.element(), uid);
    });
    var me = ComponentApi({
      getSystem: systemApi.get,
      config: $_4izgwbwajd08mgn6.none,
      hasConfigured: $_8zkcijwbjd08mgn8.constant(false),
      connect: connect,
      disconnect: disconnect,
      element: $_8zkcijwbjd08mgn8.constant(extSpec.element()),
      spec: $_8zkcijwbjd08mgn8.constant(spec),
      readState: $_8zkcijwbjd08mgn8.constant('No state'),
      syncComponents: $_8zkcijwbjd08mgn8.noop,
      components: $_8zkcijwbjd08mgn8.constant([]),
      events: $_8zkcijwbjd08mgn8.constant({})
    });
    return $_4l6tow10fjd08mh4y.premade(me);
  };
  var build$1 = function (rawUserSpec) {
    return $_4l6tow10fjd08mh4y.getPremade(rawUserSpec).fold(function () {
      var userSpecWithUid = $_25kgk5wyjd08mgpk.deepMerge({ uid: $_90bcgv10mjd08mh6p.generate('') }, rawUserSpec);
      return buildFromSpec(userSpecWithUid).getOrDie();
    }, function (prebuilt) {
      return prebuilt;
    });
  };
  var $_eg825h12kjd08mhhk = {
    build: build$1,
    premade: $_4l6tow10fjd08mh4y.premade,
    external: external,
    text: text
  };

  var hoverEvent = 'alloy.item-hover';
  var focusEvent = 'alloy.item-focus';
  var onHover = function (item) {
    if ($_6h5kwkygjd08mgvc.search(item.element()).isNone() || Focusing.isFocused(item)) {
      if (!Focusing.isFocused(item))
        Focusing.focus(item);
      $_f6t3w1wvjd08mgp1.emitWith(item, hoverEvent, { item: item });
    }
  };
  var onFocus = function (item) {
    $_f6t3w1wvjd08mgp1.emitWith(item, focusEvent, { item: item });
  };
  var $_2kl3x6134jd08mhlq = {
    hover: $_8zkcijwbjd08mgn8.constant(hoverEvent),
    focus: $_8zkcijwbjd08mgn8.constant(focusEvent),
    onHover: onHover,
    onFocus: onFocus
  };

  var builder = function (info) {
    return {
      dom: $_25kgk5wyjd08mgpk.deepMerge(info.dom(), { attributes: { role: info.toggling().isSome() ? 'menuitemcheckbox' : 'menuitem' } }),
      behaviours: $_25kgk5wyjd08mgpk.deepMerge($_voa9kw4jd08mglm.derive([
        info.toggling().fold(Toggling.revoke, function (tConfig) {
          return Toggling.config($_25kgk5wyjd08mgpk.deepMerge({ aria: { mode: 'checked' } }, tConfig));
        }),
        Focusing.config({
          ignore: info.ignoreFocus(),
          onFocus: function (component) {
            $_2kl3x6134jd08mhlq.onFocus(component);
          }
        }),
        Keying.config({ mode: 'execution' }),
        me.config({
          store: {
            mode: 'memory',
            initialValue: info.data()
          }
        })
      ]), info.itemBehaviours()),
      events: $_eexaurw6jd08mgmg.derive([
        $_eexaurw6jd08mgmg.runWithTarget($_30aqx5wwjd08mgpa.tapOrClick(), $_f6t3w1wvjd08mgp1.emitExecute),
        $_eexaurw6jd08mgmg.cutter($_6gw9slwxjd08mgph.mousedown()),
        $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.mouseover(), $_2kl3x6134jd08mhlq.onHover),
        $_eexaurw6jd08mgmg.run($_30aqx5wwjd08mgpa.focusItem(), Focusing.focus)
      ]),
      components: info.components(),
      domModification: info.domModification()
    };
  };
  var schema$10 = [
    $_1mrawkx2jd08mgq2.strict('data'),
    $_1mrawkx2jd08mgq2.strict('components'),
    $_1mrawkx2jd08mgq2.strict('dom'),
    $_1mrawkx2jd08mgq2.option('toggling'),
    $_1mrawkx2jd08mgq2.defaulted('itemBehaviours', {}),
    $_1mrawkx2jd08mgq2.defaulted('ignoreFocus', false),
    $_1mrawkx2jd08mgq2.defaulted('domModification', {}),
    $_6uz7ybytjd08mgwm.output('builder', builder)
  ];

  var builder$1 = function (detail) {
    return {
      dom: detail.dom(),
      components: detail.components(),
      events: $_eexaurw6jd08mgmg.derive([$_eexaurw6jd08mgmg.stopper($_30aqx5wwjd08mgpa.focusItem())])
    };
  };
  var schema$11 = [
    $_1mrawkx2jd08mgq2.strict('dom'),
    $_1mrawkx2jd08mgq2.strict('components'),
    $_6uz7ybytjd08mgwm.output('builder', builder$1)
  ];

  var owner$2 = 'item-widget';
  var partTypes = [$_eertgd10kjd08mh62.required({
      name: 'widget',
      overrides: function (detail) {
        return {
          behaviours: $_voa9kw4jd08mglm.derive([me.config({
              store: {
                mode: 'manual',
                getValue: function (component) {
                  return detail.data();
                },
                setValue: function () {
                }
              }
            })])
        };
      }
    })];
  var $_94uicg137jd08mhmb = {
    owner: $_8zkcijwbjd08mgn8.constant(owner$2),
    parts: $_8zkcijwbjd08mgn8.constant(partTypes)
  };

  var builder$2 = function (info) {
    var subs = $_fyge8g10ijd08mh5e.substitutes($_94uicg137jd08mhmb.owner(), info, $_94uicg137jd08mhmb.parts());
    var components = $_fyge8g10ijd08mh5e.components($_94uicg137jd08mhmb.owner(), info, subs.internals());
    var focusWidget = function (component) {
      return $_fyge8g10ijd08mh5e.getPart(component, info, 'widget').map(function (widget) {
        Keying.focusIn(widget);
        return widget;
      });
    };
    var onHorizontalArrow = function (component, simulatedEvent) {
      return $_7qxh4kzxjd08mh1r.inside(simulatedEvent.event().target()) ? $_4izgwbwajd08mgn6.none() : function () {
        if (info.autofocus()) {
          simulatedEvent.setSource(component.element());
          return $_4izgwbwajd08mgn6.none();
        } else {
          return $_4izgwbwajd08mgn6.none();
        }
      }();
    };
    return $_25kgk5wyjd08mgpk.deepMerge({
      dom: info.dom(),
      components: components,
      domModification: info.domModification(),
      events: $_eexaurw6jd08mgmg.derive([
        $_eexaurw6jd08mgmg.runOnExecute(function (component, simulatedEvent) {
          focusWidget(component).each(function (widget) {
            simulatedEvent.stop();
          });
        }),
        $_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.mouseover(), $_2kl3x6134jd08mhlq.onHover),
        $_eexaurw6jd08mgmg.run($_30aqx5wwjd08mgpa.focusItem(), function (component, simulatedEvent) {
          if (info.autofocus())
            focusWidget(component);
          else
            Focusing.focus(component);
        })
      ]),
      behaviours: $_voa9kw4jd08mglm.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: info.data()
          }
        }),
        Focusing.config({
          onFocus: function (component) {
            $_2kl3x6134jd08mhlq.onFocus(component);
          }
        }),
        Keying.config({
          mode: 'special',
          onLeft: onHorizontalArrow,
          onRight: onHorizontalArrow,
          onEscape: function (component, simulatedEvent) {
            if (!Focusing.isFocused(component) && !info.autofocus()) {
              Focusing.focus(component);
              return $_4izgwbwajd08mgn6.some(true);
            } else if (info.autofocus()) {
              simulatedEvent.setSource(component.element());
              return $_4izgwbwajd08mgn6.none();
            } else {
              return $_4izgwbwajd08mgn6.none();
            }
          }
        })
      ])
    });
  };
  var schema$12 = [
    $_1mrawkx2jd08mgq2.strict('uid'),
    $_1mrawkx2jd08mgq2.strict('data'),
    $_1mrawkx2jd08mgq2.strict('components'),
    $_1mrawkx2jd08mgq2.strict('dom'),
    $_1mrawkx2jd08mgq2.defaulted('autofocus', false),
    $_1mrawkx2jd08mgq2.defaulted('domModification', {}),
    $_fyge8g10ijd08mh5e.defaultUidsSchema($_94uicg137jd08mhmb.parts()),
    $_6uz7ybytjd08mgwm.output('builder', builder$2)
  ];

  var itemSchema$1 = $_6eo7r6xhjd08mgrx.choose('type', {
    widget: schema$12,
    item: schema$10,
    separator: schema$11
  });
  var configureGrid = function (detail, movementInfo) {
    return {
      mode: 'flatgrid',
      selector: '.' + detail.markers().item(),
      initSize: {
        numColumns: movementInfo.initSize().numColumns(),
        numRows: movementInfo.initSize().numRows()
      },
      focusManager: detail.focusManager()
    };
  };
  var configureMenu = function (detail, movementInfo) {
    return {
      mode: 'menu',
      selector: '.' + detail.markers().item(),
      moveOnTab: movementInfo.moveOnTab(),
      focusManager: detail.focusManager()
    };
  };
  var parts = [$_eertgd10kjd08mh62.group({
      factory: {
        sketch: function (spec) {
          var itemInfo = $_6eo7r6xhjd08mgrx.asStructOrDie('menu.spec item', itemSchema$1, spec);
          return itemInfo.builder()(itemInfo);
        }
      },
      name: 'items',
      unit: 'item',
      defaults: function (detail, u) {
        var fallbackUid = $_90bcgv10mjd08mh6p.generate('');
        return $_25kgk5wyjd08mgpk.deepMerge({ uid: fallbackUid }, u);
      },
      overrides: function (detail, u) {
        return {
          type: u.type,
          ignoreFocus: detail.fakeFocus(),
          domModification: { classes: [detail.markers().item()] }
        };
      }
    })];
  var schema$13 = [
    $_1mrawkx2jd08mgq2.strict('value'),
    $_1mrawkx2jd08mgq2.strict('items'),
    $_1mrawkx2jd08mgq2.strict('dom'),
    $_1mrawkx2jd08mgq2.strict('components'),
    $_1mrawkx2jd08mgq2.defaulted('eventOrder', {}),
    $_8tr5o010djd08mh4k.field('menuBehaviours', [
      Highlighting,
      me,
      Composing,
      Keying
    ]),
    $_1mrawkx2jd08mgq2.defaultedOf('movement', {
      mode: 'menu',
      moveOnTab: true
    }, $_6eo7r6xhjd08mgrx.choose('mode', {
      grid: [
        $_6uz7ybytjd08mgwm.initSize(),
        $_6uz7ybytjd08mgwm.output('config', configureGrid)
      ],
      menu: [
        $_1mrawkx2jd08mgq2.defaulted('moveOnTab', true),
        $_6uz7ybytjd08mgwm.output('config', configureMenu)
      ]
    })),
    $_6uz7ybytjd08mgwm.itemMarkers(),
    $_1mrawkx2jd08mgq2.defaulted('fakeFocus', false),
    $_1mrawkx2jd08mgq2.defaulted('focusManager', $_cbxweqzgjd08mgzq.dom()),
    $_6uz7ybytjd08mgwm.onHandler('onHighlight')
  ];
  var $_bmq9fm132jd08mhlc = {
    name: $_8zkcijwbjd08mgn8.constant('Menu'),
    schema: $_8zkcijwbjd08mgn8.constant(schema$13),
    parts: $_8zkcijwbjd08mgn8.constant(parts)
  };

  var focusEvent$1 = 'alloy.menu-focus';
  var $_1er0sn139jd08mhmj = { focus: $_8zkcijwbjd08mgn8.constant(focusEvent$1) };

  var make$2 = function (detail, components, spec, externals) {
    return $_25kgk5wyjd08mgpk.deepMerge({
      dom: $_25kgk5wyjd08mgpk.deepMerge(detail.dom(), { attributes: { role: 'menu' } }),
      uid: detail.uid(),
      behaviours: $_25kgk5wyjd08mgpk.deepMerge($_voa9kw4jd08mglm.derive([
        Highlighting.config({
          highlightClass: detail.markers().selectedItem(),
          itemClass: detail.markers().item(),
          onHighlight: detail.onHighlight()
        }),
        me.config({
          store: {
            mode: 'memory',
            initialValue: detail.value()
          }
        }),
        Composing.config({ find: $_8zkcijwbjd08mgn8.identity }),
        Keying.config(detail.movement().config()(detail, detail.movement()))
      ]), $_8tr5o010djd08mh4k.get(detail.menuBehaviours())),
      events: $_eexaurw6jd08mgmg.derive([
        $_eexaurw6jd08mgmg.run($_2kl3x6134jd08mhlq.focus(), function (menu, simulatedEvent) {
          var event = simulatedEvent.event();
          menu.getSystem().getByDom(event.target()).each(function (item) {
            Highlighting.highlight(menu, item);
            simulatedEvent.stop();
            $_f6t3w1wvjd08mgp1.emitWith(menu, $_1er0sn139jd08mhmj.focus(), {
              menu: menu,
              item: item
            });
          });
        }),
        $_eexaurw6jd08mgmg.run($_2kl3x6134jd08mhlq.hover(), function (menu, simulatedEvent) {
          var item = simulatedEvent.event().item();
          Highlighting.highlight(menu, item);
        })
      ]),
      components: components,
      eventOrder: detail.eventOrder()
    });
  };
  var $_d6fi8a138jd08mhmf = { make: make$2 };

  var Menu = $_88109v10ejd08mh4q.composite({
    name: 'Menu',
    configFields: $_bmq9fm132jd08mhlc.schema(),
    partFields: $_bmq9fm132jd08mhlc.parts(),
    factory: $_d6fi8a138jd08mhmf.make
  });

  var preserve$2 = function (f, container) {
    var ownerDoc = $_4uhv6ey3jd08mgu3.owner(container);
    var refocus = $_6h5kwkygjd08mgvc.active(ownerDoc).bind(function (focused) {
      var hasFocus = function (elem) {
        return $_ctdo1gw8jd08mgmp.eq(focused, elem);
      };
      return hasFocus(container) ? $_4izgwbwajd08mgn6.some(container) : $_cmjc72yijd08mgvh.descendant(container, hasFocus);
    });
    var result = f(container);
    refocus.each(function (oldFocus) {
      $_6h5kwkygjd08mgvc.active(ownerDoc).filter(function (newFocus) {
        return $_ctdo1gw8jd08mgmp.eq(newFocus, oldFocus);
      }).orThunk(function () {
        $_6h5kwkygjd08mgvc.focus(oldFocus);
      });
    });
    return result;
  };
  var $_15hsgb13djd08mhn3 = { preserve: preserve$2 };

  var set$7 = function (component, replaceConfig, replaceState, data) {
    $_9ab6qsy1jd08mgtr.detachChildren(component);
    $_15hsgb13djd08mhn3.preserve(function () {
      var children = $_453g14w9jd08mgmy.map(data, component.getSystem().build);
      $_453g14w9jd08mgmy.each(children, function (l) {
        $_9ab6qsy1jd08mgtr.attach(component, l);
      });
    }, component.element());
  };
  var insert = function (component, replaceConfig, insertion, childSpec) {
    var child = component.getSystem().build(childSpec);
    $_9ab6qsy1jd08mgtr.attachWith(component, child, insertion);
  };
  var append$2 = function (component, replaceConfig, replaceState, appendee) {
    insert(component, replaceConfig, $_u7ngdy2jd08mgu1.append, appendee);
  };
  var prepend$2 = function (component, replaceConfig, replaceState, prependee) {
    insert(component, replaceConfig, $_u7ngdy2jd08mgu1.prepend, prependee);
  };
  var remove$7 = function (component, replaceConfig, replaceState, removee) {
    var children = contents(component, replaceConfig);
    var foundChild = $_453g14w9jd08mgmy.find(children, function (child) {
      return $_ctdo1gw8jd08mgmp.eq(removee.element(), child.element());
    });
    foundChild.each($_9ab6qsy1jd08mgtr.detach);
  };
  var contents = function (component, replaceConfig) {
    return component.components();
  };
  var $_ciusym13cjd08mhmx = {
    append: append$2,
    prepend: prepend$2,
    remove: remove$7,
    set: set$7,
    contents: contents
  };

  var Replacing = $_voa9kw4jd08mglm.create({
    fields: [],
    name: 'replacing',
    apis: $_ciusym13cjd08mhmx
  });

  var transpose = function (obj) {
    return $_1xoayfx0jd08mgpm.tupleMap(obj, function (v, k) {
      return {
        k: v,
        v: k
      };
    });
  };
  var trace = function (items, byItem, byMenu, finish) {
    return $_96dvjsx6jd08mgqy.readOptFrom(byMenu, finish).bind(function (triggerItem) {
      return $_96dvjsx6jd08mgqy.readOptFrom(items, triggerItem).bind(function (triggerMenu) {
        var rest = trace(items, byItem, byMenu, triggerMenu);
        return $_4izgwbwajd08mgn6.some([triggerMenu].concat(rest));
      });
    }).getOr([]);
  };
  var generate$5 = function (menus, expansions) {
    var items = {};
    $_1xoayfx0jd08mgpm.each(menus, function (menuItems, menu) {
      $_453g14w9jd08mgmy.each(menuItems, function (item) {
        items[item] = menu;
      });
    });
    var byItem = expansions;
    var byMenu = transpose(expansions);
    var menuPaths = $_1xoayfx0jd08mgpm.map(byMenu, function (triggerItem, submenu) {
      return [submenu].concat(trace(items, byItem, byMenu, submenu));
    });
    return $_1xoayfx0jd08mgpm.map(items, function (path) {
      return $_96dvjsx6jd08mgqy.readOptFrom(menuPaths, path).getOr([path]);
    });
  };
  var $_63czsd13gjd08mho9 = { generate: generate$5 };

  function LayeredState () {
    var expansions = Cell({});
    var menus = Cell({});
    var paths = Cell({});
    var primary = Cell($_4izgwbwajd08mgn6.none());
    var toItemValues = Cell($_8zkcijwbjd08mgn8.constant([]));
    var clear = function () {
      expansions.set({});
      menus.set({});
      paths.set({});
      primary.set($_4izgwbwajd08mgn6.none());
    };
    var isClear = function () {
      return primary.get().isNone();
    };
    var setContents = function (sPrimary, sMenus, sExpansions, sToItemValues) {
      primary.set($_4izgwbwajd08mgn6.some(sPrimary));
      expansions.set(sExpansions);
      menus.set(sMenus);
      toItemValues.set(sToItemValues);
      var menuValues = sToItemValues(sMenus);
      var sPaths = $_63czsd13gjd08mho9.generate(menuValues, sExpansions);
      paths.set(sPaths);
    };
    var expand = function (itemValue) {
      return $_96dvjsx6jd08mgqy.readOptFrom(expansions.get(), itemValue).map(function (menu) {
        var current = $_96dvjsx6jd08mgqy.readOptFrom(paths.get(), itemValue).getOr([]);
        return [menu].concat(current);
      });
    };
    var collapse = function (itemValue) {
      return $_96dvjsx6jd08mgqy.readOptFrom(paths.get(), itemValue).bind(function (path) {
        return path.length > 1 ? $_4izgwbwajd08mgn6.some(path.slice(1)) : $_4izgwbwajd08mgn6.none();
      });
    };
    var refresh = function (itemValue) {
      return $_96dvjsx6jd08mgqy.readOptFrom(paths.get(), itemValue);
    };
    var lookupMenu = function (menuValue) {
      return $_96dvjsx6jd08mgqy.readOptFrom(menus.get(), menuValue);
    };
    var otherMenus = function (path) {
      var menuValues = toItemValues.get()(menus.get());
      return $_453g14w9jd08mgmy.difference($_1xoayfx0jd08mgpm.keys(menuValues), path);
    };
    var getPrimary = function () {
      return primary.get().bind(lookupMenu);
    };
    var getMenus = function () {
      return menus.get();
    };
    return {
      setContents: setContents,
      expand: expand,
      refresh: refresh,
      collapse: collapse,
      lookupMenu: lookupMenu,
      otherMenus: otherMenus,
      getPrimary: getPrimary,
      getMenus: getMenus,
      clear: clear,
      isClear: isClear
    };
  }

  var make$3 = function (detail, rawUiSpec) {
    var buildMenus = function (container, menus) {
      return $_1xoayfx0jd08mgpm.map(menus, function (spec, name) {
        var data = Menu.sketch($_25kgk5wyjd08mgpk.deepMerge(spec, {
          value: name,
          items: spec.items,
          markers: $_96dvjsx6jd08mgqy.narrow(rawUiSpec.markers, [
            'item',
            'selectedItem'
          ]),
          fakeFocus: detail.fakeFocus(),
          onHighlight: detail.onHighlight(),
          focusManager: detail.fakeFocus() ? $_cbxweqzgjd08mgzq.highlights() : $_cbxweqzgjd08mgzq.dom()
        }));
        return container.getSystem().build(data);
      });
    };
    var state = LayeredState();
    var setup = function (container) {
      var componentMap = buildMenus(container, detail.data().menus());
      state.setContents(detail.data().primary(), componentMap, detail.data().expansions(), function (sMenus) {
        return toMenuValues(container, sMenus);
      });
      return state.getPrimary();
    };
    var getItemValue = function (item) {
      return me.getValue(item).value;
    };
    var toMenuValues = function (container, sMenus) {
      return $_1xoayfx0jd08mgpm.map(detail.data().menus(), function (data, menuName) {
        return $_453g14w9jd08mgmy.bind(data.items, function (item) {
          return item.type === 'separator' ? [] : [item.data.value];
        });
      });
    };
    var setActiveMenu = function (container, menu) {
      Highlighting.highlight(container, menu);
      Highlighting.getHighlighted(menu).orThunk(function () {
        return Highlighting.getFirst(menu);
      }).each(function (item) {
        $_f6t3w1wvjd08mgp1.dispatch(container, item.element(), $_30aqx5wwjd08mgpa.focusItem());
      });
    };
    var getMenus = function (state, menuValues) {
      return $_cqt7vbyejd08mgva.cat($_453g14w9jd08mgmy.map(menuValues, state.lookupMenu));
    };
    var updateMenuPath = function (container, state, path) {
      return $_4izgwbwajd08mgn6.from(path[0]).bind(state.lookupMenu).map(function (activeMenu) {
        var rest = getMenus(state, path.slice(1));
        $_453g14w9jd08mgmy.each(rest, function (r) {
          $_5tvqrbxujd08mgt5.add(r.element(), detail.markers().backgroundMenu());
        });
        if (!$_9fqzedy7jd08mgun.inBody(activeMenu.element())) {
          Replacing.append(container, $_eg825h12kjd08mhhk.premade(activeMenu));
        }
        $_b2zn7l12yjd08mhl1.remove(activeMenu.element(), [detail.markers().backgroundMenu()]);
        setActiveMenu(container, activeMenu);
        var others = getMenus(state, state.otherMenus(path));
        $_453g14w9jd08mgmy.each(others, function (o) {
          $_b2zn7l12yjd08mhl1.remove(o.element(), [detail.markers().backgroundMenu()]);
          if (!detail.stayInDom())
            Replacing.remove(container, o);
        });
        return activeMenu;
      });
    };
    var expandRight = function (container, item) {
      var value = getItemValue(item);
      return state.expand(value).bind(function (path) {
        $_4izgwbwajd08mgn6.from(path[0]).bind(state.lookupMenu).each(function (activeMenu) {
          if (!$_9fqzedy7jd08mgun.inBody(activeMenu.element())) {
            Replacing.append(container, $_eg825h12kjd08mhhk.premade(activeMenu));
          }
          detail.onOpenSubmenu()(container, item, activeMenu);
          Highlighting.highlightFirst(activeMenu);
        });
        return updateMenuPath(container, state, path);
      });
    };
    var collapseLeft = function (container, item) {
      var value = getItemValue(item);
      return state.collapse(value).bind(function (path) {
        return updateMenuPath(container, state, path).map(function (activeMenu) {
          detail.onCollapseMenu()(container, item, activeMenu);
          return activeMenu;
        });
      });
    };
    var updateView = function (container, item) {
      var value = getItemValue(item);
      return state.refresh(value).bind(function (path) {
        return updateMenuPath(container, state, path);
      });
    };
    var onRight = function (container, item) {
      return $_7qxh4kzxjd08mh1r.inside(item.element()) ? $_4izgwbwajd08mgn6.none() : expandRight(container, item);
    };
    var onLeft = function (container, item) {
      return $_7qxh4kzxjd08mh1r.inside(item.element()) ? $_4izgwbwajd08mgn6.none() : collapseLeft(container, item);
    };
    var onEscape = function (container, item) {
      return collapseLeft(container, item).orThunk(function () {
        return detail.onEscape()(container, item);
      });
    };
    var keyOnItem = function (f) {
      return function (container, simulatedEvent) {
        return $_edahi9zmjd08mh0g.closest(simulatedEvent.getSource(), '.' + detail.markers().item()).bind(function (target) {
          return container.getSystem().getByDom(target).bind(function (item) {
            return f(container, item);
          });
        });
      };
    };
    var events = $_eexaurw6jd08mgmg.derive([
      $_eexaurw6jd08mgmg.run($_1er0sn139jd08mhmj.focus(), function (sandbox, simulatedEvent) {
        var menu = simulatedEvent.event().menu();
        Highlighting.highlight(sandbox, menu);
      }),
      $_eexaurw6jd08mgmg.runOnExecute(function (sandbox, simulatedEvent) {
        var target = simulatedEvent.event().target();
        return sandbox.getSystem().getByDom(target).bind(function (item) {
          var itemValue = getItemValue(item);
          if (itemValue.indexOf('collapse-item') === 0) {
            return collapseLeft(sandbox, item);
          }
          return expandRight(sandbox, item).orThunk(function () {
            return detail.onExecute()(sandbox, item);
          });
        });
      }),
      $_eexaurw6jd08mgmg.runOnAttached(function (container, simulatedEvent) {
        setup(container).each(function (primary) {
          Replacing.append(container, $_eg825h12kjd08mhhk.premade(primary));
          if (detail.openImmediately()) {
            setActiveMenu(container, primary);
            detail.onOpenMenu()(container, primary);
          }
        });
      })
    ].concat(detail.navigateOnHover() ? [$_eexaurw6jd08mgmg.run($_2kl3x6134jd08mhlq.hover(), function (sandbox, simulatedEvent) {
        var item = simulatedEvent.event().item();
        updateView(sandbox, item);
        expandRight(sandbox, item);
        detail.onHover()(sandbox, item);
      })] : []));
    var collapseMenuApi = function (container) {
      Highlighting.getHighlighted(container).each(function (currentMenu) {
        Highlighting.getHighlighted(currentMenu).each(function (currentItem) {
          collapseLeft(container, currentItem);
        });
      });
    };
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      behaviours: $_25kgk5wyjd08mgpk.deepMerge($_voa9kw4jd08mglm.derive([
        Keying.config({
          mode: 'special',
          onRight: keyOnItem(onRight),
          onLeft: keyOnItem(onLeft),
          onEscape: keyOnItem(onEscape),
          focusIn: function (container, keyInfo) {
            state.getPrimary().each(function (primary) {
              $_f6t3w1wvjd08mgp1.dispatch(container, primary.element(), $_30aqx5wwjd08mgpa.focusItem());
            });
          }
        }),
        Highlighting.config({
          highlightClass: detail.markers().selectedMenu(),
          itemClass: detail.markers().menu()
        }),
        Composing.config({
          find: function (container) {
            return Highlighting.getHighlighted(container);
          }
        }),
        Replacing.config({})
      ]), $_8tr5o010djd08mh4k.get(detail.tmenuBehaviours())),
      eventOrder: detail.eventOrder(),
      apis: { collapseMenu: collapseMenuApi },
      events: events
    };
  };
  var $_bofbfw13ejd08mhnd = {
    make: make$3,
    collapseItem: $_8zkcijwbjd08mgn8.constant('collapse-item')
  };

  var tieredData = function (primary, menus, expansions) {
    return {
      primary: primary,
      menus: menus,
      expansions: expansions
    };
  };
  var singleData = function (name, menu) {
    return {
      primary: name,
      menus: $_96dvjsx6jd08mgqy.wrap(name, menu),
      expansions: {}
    };
  };
  var collapseItem = function (text) {
    return {
      value: $_1rgeik10gjd08mh59.generate($_bofbfw13ejd08mhnd.collapseItem()),
      text: text
    };
  };
  var TieredMenu = $_88109v10ejd08mh4q.single({
    name: 'TieredMenu',
    configFields: [
      $_6uz7ybytjd08mgwm.onStrictKeyboardHandler('onExecute'),
      $_6uz7ybytjd08mgwm.onStrictKeyboardHandler('onEscape'),
      $_6uz7ybytjd08mgwm.onStrictHandler('onOpenMenu'),
      $_6uz7ybytjd08mgwm.onStrictHandler('onOpenSubmenu'),
      $_6uz7ybytjd08mgwm.onHandler('onCollapseMenu'),
      $_1mrawkx2jd08mgq2.defaulted('openImmediately', true),
      $_1mrawkx2jd08mgq2.strictObjOf('data', [
        $_1mrawkx2jd08mgq2.strict('primary'),
        $_1mrawkx2jd08mgq2.strict('menus'),
        $_1mrawkx2jd08mgq2.strict('expansions')
      ]),
      $_1mrawkx2jd08mgq2.defaulted('fakeFocus', false),
      $_6uz7ybytjd08mgwm.onHandler('onHighlight'),
      $_6uz7ybytjd08mgwm.onHandler('onHover'),
      $_6uz7ybytjd08mgwm.tieredMenuMarkers(),
      $_1mrawkx2jd08mgq2.strict('dom'),
      $_1mrawkx2jd08mgq2.defaulted('navigateOnHover', true),
      $_1mrawkx2jd08mgq2.defaulted('stayInDom', false),
      $_8tr5o010djd08mh4k.field('tmenuBehaviours', [
        Keying,
        Highlighting,
        Composing,
        Replacing
      ]),
      $_1mrawkx2jd08mgq2.defaulted('eventOrder', {})
    ],
    apis: {
      collapseMenu: function (apis, tmenu) {
        apis.collapseMenu(tmenu);
      }
    },
    factory: $_bofbfw13ejd08mhnd.make,
    extraApis: {
      tieredData: tieredData,
      singleData: singleData,
      collapseItem: collapseItem
    }
  });

  var scrollable = $_ete72zz1jd08mgy0.resolve('scrollable');
  var register = function (element) {
    $_5tvqrbxujd08mgt5.add(element, scrollable);
  };
  var deregister = function (element) {
    $_5tvqrbxujd08mgt5.remove(element, scrollable);
  };
  var $_2bo91013hjd08mhol = {
    register: register,
    deregister: deregister,
    scrollable: $_8zkcijwbjd08mgn8.constant(scrollable)
  };

  var getValue$4 = function (item) {
    return $_96dvjsx6jd08mgqy.readOptFrom(item, 'format').getOr(item.title);
  };
  var convert$1 = function (formats, memMenuThunk) {
    var mainMenu = makeMenu('Styles', [].concat($_453g14w9jd08mgmy.map(formats.items, function (k) {
      return makeItem(getValue$4(k), k.title, k.isSelected(), k.getPreview(), $_96dvjsx6jd08mgqy.hasKey(formats.expansions, getValue$4(k)));
    })), memMenuThunk, false);
    var submenus = $_1xoayfx0jd08mgpm.map(formats.menus, function (menuItems, menuName) {
      var items = $_453g14w9jd08mgmy.map(menuItems, function (item) {
        return makeItem(getValue$4(item), item.title, item.isSelected !== undefined ? item.isSelected() : false, item.getPreview !== undefined ? item.getPreview() : '', $_96dvjsx6jd08mgqy.hasKey(formats.expansions, getValue$4(item)));
      });
      return makeMenu(menuName, items, memMenuThunk, true);
    });
    var menus = $_25kgk5wyjd08mgpk.deepMerge(submenus, $_96dvjsx6jd08mgqy.wrap('styles', mainMenu));
    var tmenu = TieredMenu.tieredData('styles', menus, formats.expansions);
    return { tmenu: tmenu };
  };
  var makeItem = function (value, text, selected, preview, isMenu) {
    return {
      data: {
        value: value,
        text: text
      },
      type: 'item',
      dom: {
        tag: 'div',
        classes: isMenu ? [$_ete72zz1jd08mgy0.resolve('styles-item-is-menu')] : []
      },
      toggling: {
        toggleOnExecute: false,
        toggleClass: $_ete72zz1jd08mgy0.resolve('format-matches'),
        selected: selected
      },
      itemBehaviours: $_voa9kw4jd08mglm.derive(isMenu ? [] : [$_cnlikcz0jd08mgxw.format(value, function (comp, status) {
          var toggle = status ? Toggling.on : Toggling.off;
          toggle(comp);
        })]),
      components: [{
          dom: {
            tag: 'div',
            attributes: { style: preview },
            innerHtml: text
          }
        }]
    };
  };
  var makeMenu = function (value, items, memMenuThunk, collapsable) {
    return {
      value: value,
      dom: { tag: 'div' },
      components: [
        Button.sketch({
          dom: {
            tag: 'div',
            classes: [$_ete72zz1jd08mgy0.resolve('styles-collapser')]
          },
          components: collapsable ? [
            {
              dom: {
                tag: 'span',
                classes: [$_ete72zz1jd08mgy0.resolve('styles-collapse-icon')]
              }
            },
            $_eg825h12kjd08mhhk.text(value)
          ] : [$_eg825h12kjd08mhhk.text(value)],
          action: function (item) {
            if (collapsable) {
              var comp = memMenuThunk().get(item);
              TieredMenu.collapseMenu(comp);
            }
          }
        }),
        {
          dom: {
            tag: 'div',
            classes: [$_ete72zz1jd08mgy0.resolve('styles-menu-items-container')]
          },
          components: [Menu.parts().items({})],
          behaviours: $_voa9kw4jd08mglm.derive([$_ejtkif11sjd08mhcv.config('adhoc-scrollable-menu', [
              $_eexaurw6jd08mgmg.runOnAttached(function (component, simulatedEvent) {
                $_62cv66zsjd08mh10.set(component.element(), 'overflow-y', 'auto');
                $_62cv66zsjd08mh10.set(component.element(), '-webkit-overflow-scrolling', 'touch');
                $_2bo91013hjd08mhol.register(component.element());
              }),
              $_eexaurw6jd08mgmg.runOnDetached(function (component) {
                $_62cv66zsjd08mh10.remove(component.element(), 'overflow-y');
                $_62cv66zsjd08mh10.remove(component.element(), '-webkit-overflow-scrolling');
                $_2bo91013hjd08mhol.deregister(component.element());
              })
            ])])
        }
      ],
      items: items,
      menuBehaviours: $_voa9kw4jd08mglm.derive([Transitioning.config({
          initialState: 'after',
          routes: Transitioning.createTristate('before', 'current', 'after', {
            transition: {
              property: 'transform',
              transitionClass: 'transitioning'
            }
          })
        })])
    };
  };
  var sketch$9 = function (settings) {
    var dataset = convert$1(settings.formats, function () {
      return memMenu;
    });
    var memMenu = $_4gwcwf11ejd08mhb2.record(TieredMenu.sketch({
      dom: {
        tag: 'div',
        classes: [$_ete72zz1jd08mgy0.resolve('styles-menu')]
      },
      components: [],
      fakeFocus: true,
      stayInDom: true,
      onExecute: function (tmenu, item) {
        var v = me.getValue(item);
        settings.handle(item, v.value);
      },
      onEscape: function () {
      },
      onOpenMenu: function (container, menu) {
        var w = $_7qh6mb117jd08mha2.get(container.element());
        $_7qh6mb117jd08mha2.set(menu.element(), w);
        Transitioning.jumpTo(menu, 'current');
      },
      onOpenSubmenu: function (container, item, submenu) {
        var w = $_7qh6mb117jd08mha2.get(container.element());
        var menu = $_edahi9zmjd08mh0g.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var menuComp = container.getSystem().getByDom(menu).getOrDie();
        $_7qh6mb117jd08mha2.set(submenu.element(), w);
        Transitioning.progressTo(menuComp, 'before');
        Transitioning.jumpTo(submenu, 'after');
        Transitioning.progressTo(submenu, 'current');
      },
      onCollapseMenu: function (container, item, menu) {
        var submenu = $_edahi9zmjd08mh0g.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var submenuComp = container.getSystem().getByDom(submenu).getOrDie();
        Transitioning.progressTo(submenuComp, 'after');
        Transitioning.progressTo(menu, 'current');
      },
      navigateOnHover: false,
      openImmediately: true,
      data: dataset.tmenu,
      markers: {
        backgroundMenu: $_ete72zz1jd08mgy0.resolve('styles-background-menu'),
        menu: $_ete72zz1jd08mgy0.resolve('styles-menu'),
        selectedMenu: $_ete72zz1jd08mgy0.resolve('styles-selected-menu'),
        item: $_ete72zz1jd08mgy0.resolve('styles-item'),
        selectedItem: $_ete72zz1jd08mgy0.resolve('styles-selected-item')
      }
    }));
    return memMenu.asSpec();
  };
  var $_d6h4d412fjd08mhg7 = { sketch: sketch$9 };

  var getFromExpandingItem = function (item) {
    var newItem = $_25kgk5wyjd08mgpk.deepMerge($_96dvjsx6jd08mgqy.exclude(item, ['items']), { menu: true });
    var rest = expand(item.items);
    var newMenus = $_25kgk5wyjd08mgpk.deepMerge(rest.menus, $_96dvjsx6jd08mgqy.wrap(item.title, rest.items));
    var newExpansions = $_25kgk5wyjd08mgpk.deepMerge(rest.expansions, $_96dvjsx6jd08mgqy.wrap(item.title, item.title));
    return {
      item: newItem,
      menus: newMenus,
      expansions: newExpansions
    };
  };
  var getFromItem = function (item) {
    return $_96dvjsx6jd08mgqy.hasKey(item, 'items') ? getFromExpandingItem(item) : {
      item: item,
      menus: {},
      expansions: {}
    };
  };
  var expand = function (items) {
    return $_453g14w9jd08mgmy.foldr(items, function (acc, item) {
      var newData = getFromItem(item);
      return {
        menus: $_25kgk5wyjd08mgpk.deepMerge(acc.menus, newData.menus),
        items: [newData.item].concat(acc.items),
        expansions: $_25kgk5wyjd08mgpk.deepMerge(acc.expansions, newData.expansions)
      };
    }, {
      menus: {},
      expansions: {},
      items: []
    });
  };
  var $_9l9kzi13ijd08mhop = { expand: expand };

  var register$1 = function (editor, settings) {
    var isSelectedFor = function (format) {
      return function () {
        return editor.formatter.match(format);
      };
    };
    var getPreview = function (format) {
      return function () {
        var styles = editor.formatter.getCssText(format);
        return styles;
      };
    };
    var enrichSupported = function (item) {
      return $_25kgk5wyjd08mgpk.deepMerge(item, {
        isSelected: isSelectedFor(item.format),
        getPreview: getPreview(item.format)
      });
    };
    var enrichMenu = function (item) {
      return $_25kgk5wyjd08mgpk.deepMerge(item, {
        isSelected: $_8zkcijwbjd08mgn8.constant(false),
        getPreview: $_8zkcijwbjd08mgn8.constant('')
      });
    };
    var enrichCustom = function (item) {
      var formatName = $_1rgeik10gjd08mh59.generate(item.title);
      var newItem = $_25kgk5wyjd08mgpk.deepMerge(item, {
        format: formatName,
        isSelected: isSelectedFor(formatName),
        getPreview: getPreview(formatName)
      });
      editor.formatter.register(formatName, newItem);
      return newItem;
    };
    var formats = $_96dvjsx6jd08mgqy.readOptFrom(settings, 'style_formats').getOr(DefaultStyleFormats);
    var doEnrich = function (items) {
      return $_453g14w9jd08mgmy.map(items, function (item) {
        if ($_96dvjsx6jd08mgqy.hasKey(item, 'items')) {
          var newItems = doEnrich(item.items);
          return $_25kgk5wyjd08mgpk.deepMerge(enrichMenu(item), { items: newItems });
        } else if ($_96dvjsx6jd08mgqy.hasKey(item, 'format')) {
          return enrichSupported(item);
        } else {
          return enrichCustom(item);
        }
      });
    };
    return doEnrich(formats);
  };
  var prune = function (editor, formats) {
    var doPrune = function (items) {
      return $_453g14w9jd08mgmy.bind(items, function (item) {
        if (item.items !== undefined) {
          var newItems = doPrune(item.items);
          return newItems.length > 0 ? [item] : [];
        } else {
          var keep = $_96dvjsx6jd08mgqy.hasKey(item, 'format') ? editor.formatter.canApply(item.format) : true;
          return keep ? [item] : [];
        }
      });
    };
    var prunedItems = doPrune(formats);
    return $_9l9kzi13ijd08mhop.expand(prunedItems);
  };
  var ui = function (editor, formats, onDone) {
    var pruned = prune(editor, formats);
    return $_d6h4d412fjd08mhg7.sketch({
      formats: pruned,
      handle: function (item, value) {
        editor.undoManager.transact(function () {
          if (Toggling.isOn(item)) {
            editor.formatter.remove(value);
          } else {
            editor.formatter.apply(value);
          }
        });
        onDone();
      }
    });
  };
  var $_8bxa8412djd08mhfx = {
    register: register$1,
    ui: ui
  };

  var defaults = [
    'undo',
    'bold',
    'italic',
    'link',
    'image',
    'bullist',
    'styleselect'
  ];
  var extract$1 = function (rawToolbar) {
    var toolbar = rawToolbar.replace(/\|/g, ' ').trim();
    return toolbar.length > 0 ? toolbar.split(/\s+/) : [];
  };
  var identifyFromArray = function (toolbar) {
    return $_453g14w9jd08mgmy.bind(toolbar, function (item) {
      return $_erilttwzjd08mgpl.isArray(item) ? identifyFromArray(item) : extract$1(item);
    });
  };
  var identify = function (settings) {
    var toolbar = settings.toolbar !== undefined ? settings.toolbar : defaults;
    return $_erilttwzjd08mgpl.isArray(toolbar) ? identifyFromArray(toolbar) : extract$1(toolbar);
  };
  var setup = function (realm, editor) {
    var commandSketch = function (name) {
      return function () {
        return $_9w4shzz2jd08mgy1.forToolbarCommand(editor, name);
      };
    };
    var stateCommandSketch = function (name) {
      return function () {
        return $_9w4shzz2jd08mgy1.forToolbarStateCommand(editor, name);
      };
    };
    var actionSketch = function (name, query, action) {
      return function () {
        return $_9w4shzz2jd08mgy1.forToolbarStateAction(editor, name, query, action);
      };
    };
    var undo = commandSketch('undo');
    var redo = commandSketch('redo');
    var bold = stateCommandSketch('bold');
    var italic = stateCommandSketch('italic');
    var underline = stateCommandSketch('underline');
    var removeformat = commandSketch('removeformat');
    var link = function () {
      return $_4l23ox11ojd08mhc1.sketch(realm, editor);
    };
    var unlink = actionSketch('unlink', 'link', function () {
      editor.execCommand('unlink', null, false);
    });
    var image = function () {
      return $_hnjms11djd08mhau.sketch(editor);
    };
    var bullist = actionSketch('unordered-list', 'ul', function () {
      editor.execCommand('InsertUnorderedList', null, false);
    });
    var numlist = actionSketch('ordered-list', 'ol', function () {
      editor.execCommand('InsertOrderedList', null, false);
    });
    var fontsizeselect = function () {
      return $_9eq14a119jd08mha5.sketch(realm, editor);
    };
    var forecolor = function () {
      return $_e5b73g10sjd08mh80.sketch(realm, editor);
    };
    var styleFormats = $_8bxa8412djd08mhfx.register(editor, editor.settings);
    var styleFormatsMenu = function () {
      return $_8bxa8412djd08mhfx.ui(editor, styleFormats, function () {
        editor.fire('scrollIntoView');
      });
    };
    var styleselect = function () {
      return $_9w4shzz2jd08mgy1.forToolbar('style-formats', function (button) {
        editor.fire('toReading');
        realm.dropup().appear(styleFormatsMenu, Toggling.on, button);
      }, $_voa9kw4jd08mglm.derive([
        Toggling.config({
          toggleClass: $_ete72zz1jd08mgy0.resolve('toolbar-button-selected'),
          toggleOnExecute: false,
          aria: { mode: 'pressed' }
        }),
        Receiving.config({
          channels: $_96dvjsx6jd08mgqy.wrapAll([
            $_cnlikcz0jd08mgxw.receive($_ceaddvyojd08mgvu.orientationChanged(), Toggling.off),
            $_cnlikcz0jd08mgxw.receive($_ceaddvyojd08mgvu.dropupDismissed(), Toggling.off)
          ])
        })
      ]));
    };
    var feature = function (prereq, sketch) {
      return {
        isSupported: function () {
          return prereq.forall(function (p) {
            return $_96dvjsx6jd08mgqy.hasKey(editor.buttons, p);
          });
        },
        sketch: sketch
      };
    };
    return {
      undo: feature($_4izgwbwajd08mgn6.none(), undo),
      redo: feature($_4izgwbwajd08mgn6.none(), redo),
      bold: feature($_4izgwbwajd08mgn6.none(), bold),
      italic: feature($_4izgwbwajd08mgn6.none(), italic),
      underline: feature($_4izgwbwajd08mgn6.none(), underline),
      removeformat: feature($_4izgwbwajd08mgn6.none(), removeformat),
      link: feature($_4izgwbwajd08mgn6.none(), link),
      unlink: feature($_4izgwbwajd08mgn6.none(), unlink),
      image: feature($_4izgwbwajd08mgn6.none(), image),
      bullist: feature($_4izgwbwajd08mgn6.some('bullist'), bullist),
      numlist: feature($_4izgwbwajd08mgn6.some('numlist'), numlist),
      fontsizeselect: feature($_4izgwbwajd08mgn6.none(), fontsizeselect),
      forecolor: feature($_4izgwbwajd08mgn6.none(), forecolor),
      styleselect: feature($_4izgwbwajd08mgn6.none(), styleselect)
    };
  };
  var detect$4 = function (settings, features) {
    var itemNames = identify(settings);
    var present = {};
    return $_453g14w9jd08mgmy.bind(itemNames, function (iName) {
      var r = !$_96dvjsx6jd08mgqy.hasKey(present, iName) && $_96dvjsx6jd08mgqy.hasKey(features, iName) && features[iName].isSupported() ? [features[iName].sketch()] : [];
      present[iName] = true;
      return r;
    });
  };
  var $_5ie7jxypjd08mgvw = {
    identify: identify,
    setup: setup,
    detect: detect$4
  };

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_8zkcijwbjd08mgn8.constant(target),
      'x': $_8zkcijwbjd08mgn8.constant(x),
      'y': $_8zkcijwbjd08mgn8.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_8zkcijwbjd08mgn8.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_3visdkwtjd08mgor.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_8zkcijwbjd08mgn8.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_8zkcijwbjd08mgn8.curry(unbind, element, event, wrapped, useCapture) };
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
  var $_b9inr313ljd08mhp4 = {
    bind: bind$1,
    capture: capture
  };

  var filter$1 = $_8zkcijwbjd08mgn8.constant(true);
  var bind$2 = function (element, event, handler) {
    return $_b9inr313ljd08mhp4.bind(element, event, filter$1, handler);
  };
  var capture$1 = function (element, event, handler) {
    return $_b9inr313ljd08mhp4.capture(element, event, filter$1, handler);
  };
  var $_buvuih13kjd08mhp2 = {
    bind: bind$2,
    capture: capture$1
  };

  var INTERVAL = 50;
  var INSURANCE = 1000 / INTERVAL;
  var get$11 = function (outerWindow) {
    var isPortrait = outerWindow.matchMedia('(orientation: portrait)').matches;
    return { isPortrait: $_8zkcijwbjd08mgn8.constant(isPortrait) };
  };
  var getActualWidth = function (outerWindow) {
    var isIos = $_dymoxnwgjd08mgng.detect().os.isiOS();
    var isPortrait = get$11(outerWindow).isPortrait();
    return isIos && !isPortrait ? outerWindow.screen.height : outerWindow.screen.width;
  };
  var onChange = function (outerWindow, listeners) {
    var win = $_3visdkwtjd08mgor.fromDom(outerWindow);
    var poller = null;
    var change = function () {
      clearInterval(poller);
      var orientation = get$11(outerWindow);
      listeners.onChange(orientation);
      onAdjustment(function () {
        listeners.onReady(orientation);
      });
    };
    var orientationHandle = $_buvuih13kjd08mhp2.bind(win, 'orientationchange', change);
    var onAdjustment = function (f) {
      clearInterval(poller);
      var flag = outerWindow.innerHeight;
      var insurance = 0;
      poller = setInterval(function () {
        if (flag !== outerWindow.innerHeight) {
          clearInterval(poller);
          f($_4izgwbwajd08mgn6.some(outerWindow.innerHeight));
        } else if (insurance > INSURANCE) {
          clearInterval(poller);
          f($_4izgwbwajd08mgn6.none());
        }
        insurance++;
      }, INTERVAL);
    };
    var destroy = function () {
      orientationHandle.unbind();
    };
    return {
      onAdjustment: onAdjustment,
      destroy: destroy
    };
  };
  var $_a2auem13jjd08mhot = {
    get: get$11,
    onChange: onChange,
    getActualWidth: getActualWidth
  };

  function DelayedFunction (fun, delay) {
    var ref = null;
    var schedule = function () {
      var args = arguments;
      ref = setTimeout(function () {
        fun.apply(null, args);
        ref = null;
      }, delay);
    };
    var cancel = function () {
      if (ref !== null) {
        clearTimeout(ref);
        ref = null;
      }
    };
    return {
      cancel: cancel,
      schedule: schedule
    };
  }

  var SIGNIFICANT_MOVE = 5;
  var LONGPRESS_DELAY = 400;
  var getTouch = function (event) {
    if (event.raw().touches === undefined || event.raw().touches.length !== 1)
      return $_4izgwbwajd08mgn6.none();
    return $_4izgwbwajd08mgn6.some(event.raw().touches[0]);
  };
  var isFarEnough = function (touch, data) {
    var distX = Math.abs(touch.clientX - data.x());
    var distY = Math.abs(touch.clientY - data.y());
    return distX > SIGNIFICANT_MOVE || distY > SIGNIFICANT_MOVE;
  };
  var monitor = function (settings) {
    var startData = Cell($_4izgwbwajd08mgn6.none());
    var longpress = DelayedFunction(function (event) {
      startData.set($_4izgwbwajd08mgn6.none());
      settings.triggerEvent($_30aqx5wwjd08mgpa.longpress(), event);
    }, LONGPRESS_DELAY);
    var handleTouchstart = function (event) {
      getTouch(event).each(function (touch) {
        longpress.cancel();
        var data = {
          x: $_8zkcijwbjd08mgn8.constant(touch.clientX),
          y: $_8zkcijwbjd08mgn8.constant(touch.clientY),
          target: event.target
        };
        longpress.schedule(data);
        startData.set($_4izgwbwajd08mgn6.some(data));
      });
      return $_4izgwbwajd08mgn6.none();
    };
    var handleTouchmove = function (event) {
      longpress.cancel();
      getTouch(event).each(function (touch) {
        startData.get().each(function (data) {
          if (isFarEnough(touch, data))
            startData.set($_4izgwbwajd08mgn6.none());
        });
      });
      return $_4izgwbwajd08mgn6.none();
    };
    var handleTouchend = function (event) {
      longpress.cancel();
      var isSame = function (data) {
        return $_ctdo1gw8jd08mgmp.eq(data.target(), event.target());
      };
      return startData.get().filter(isSame).map(function (data) {
        return settings.triggerEvent($_30aqx5wwjd08mgpa.tap(), event);
      });
    };
    var handlers = $_96dvjsx6jd08mgqy.wrapAll([
      {
        key: $_6gw9slwxjd08mgph.touchstart(),
        value: handleTouchstart
      },
      {
        key: $_6gw9slwxjd08mgph.touchmove(),
        value: handleTouchmove
      },
      {
        key: $_6gw9slwxjd08mgph.touchend(),
        value: handleTouchend
      }
    ]);
    var fireIfReady = function (event, type) {
      return $_96dvjsx6jd08mgqy.readOptFrom(handlers, type).bind(function (handler) {
        return handler(event);
      });
    };
    return { fireIfReady: fireIfReady };
  };
  var $_3cd5v613rjd08mhq3 = { monitor: monitor };

  var monitor$1 = function (editorApi) {
    var tapEvent = $_3cd5v613rjd08mhq3.monitor({
      triggerEvent: function (type, evt) {
        editorApi.onTapContent(evt);
      }
    });
    var onTouchend = function () {
      return $_buvuih13kjd08mhp2.bind(editorApi.body(), 'touchend', function (evt) {
        tapEvent.fireIfReady(evt, 'touchend');
      });
    };
    var onTouchmove = function () {
      return $_buvuih13kjd08mhp2.bind(editorApi.body(), 'touchmove', function (evt) {
        tapEvent.fireIfReady(evt, 'touchmove');
      });
    };
    var fireTouchstart = function (evt) {
      tapEvent.fireIfReady(evt, 'touchstart');
    };
    return {
      fireTouchstart: fireTouchstart,
      onTouchend: onTouchend,
      onTouchmove: onTouchmove
    };
  };
  var $_1wvbix13qjd08mhq0 = { monitor: monitor$1 };

  var isAndroid6 = $_dymoxnwgjd08mgng.detect().os.version.major >= 6;
  var initEvents = function (editorApi, toolstrip, alloy) {
    var tapping = $_1wvbix13qjd08mhq0.monitor(editorApi);
    var outerDoc = $_4uhv6ey3jd08mgu3.owner(toolstrip);
    var isRanged = function (sel) {
      return !$_ctdo1gw8jd08mgmp.eq(sel.start(), sel.finish()) || sel.soffset() !== sel.foffset();
    };
    var hasRangeInUi = function () {
      return $_6h5kwkygjd08mgvc.active(outerDoc).filter(function (input) {
        return $_9323z1xxjd08mgti.name(input) === 'input';
      }).exists(function (input) {
        return input.dom().selectionStart !== input.dom().selectionEnd;
      });
    };
    var updateMargin = function () {
      var rangeInContent = editorApi.doc().dom().hasFocus() && editorApi.getSelection().exists(isRanged);
      alloy.getByDom(toolstrip).each((rangeInContent || hasRangeInUi()) === true ? Toggling.on : Toggling.off);
    };
    var listeners = [
      $_buvuih13kjd08mhp2.bind(editorApi.body(), 'touchstart', function (evt) {
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_buvuih13kjd08mhp2.bind(toolstrip, 'touchstart', function (evt) {
        editorApi.onTouchToolstrip();
      }),
      editorApi.onToReading(function () {
        $_6h5kwkygjd08mgvc.blur(editorApi.body());
      }),
      editorApi.onToEditing($_8zkcijwbjd08mgn8.noop),
      editorApi.onScrollToCursor(function (tinyEvent) {
        tinyEvent.preventDefault();
        editorApi.getCursorBox().each(function (bounds) {
          var cWin = editorApi.win();
          var isOutside = bounds.top() > cWin.innerHeight || bounds.bottom() > cWin.innerHeight;
          var cScrollBy = isOutside ? bounds.bottom() - cWin.innerHeight + 50 : 0;
          if (cScrollBy !== 0) {
            cWin.scrollTo(cWin.pageXOffset, cWin.pageYOffset + cScrollBy);
          }
        });
      })
    ].concat(isAndroid6 === true ? [] : [
      $_buvuih13kjd08mhp2.bind($_3visdkwtjd08mgor.fromDom(editorApi.win()), 'blur', function () {
        alloy.getByDom(toolstrip).each(Toggling.off);
      }),
      $_buvuih13kjd08mhp2.bind(outerDoc, 'select', updateMargin),
      $_buvuih13kjd08mhp2.bind(editorApi.doc(), 'selectionchange', updateMargin)
    ]);
    var destroy = function () {
      $_453g14w9jd08mgmy.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_678nhh13pjd08mhpn = { initEvents: initEvents };

  var autocompleteHack = function () {
    return function (f) {
      setTimeout(function () {
        f();
      }, 0);
    };
  };
  var resume = function (cWin) {
    cWin.focus();
    var iBody = $_3visdkwtjd08mgor.fromDom(cWin.document.body);
    var inInput = $_6h5kwkygjd08mgvc.active().exists(function (elem) {
      return $_453g14w9jd08mgmy.contains([
        'input',
        'textarea'
      ], $_9323z1xxjd08mgti.name(elem));
    });
    var transaction = inInput ? autocompleteHack() : $_8zkcijwbjd08mgn8.apply;
    transaction(function () {
      $_6h5kwkygjd08mgvc.active().each($_6h5kwkygjd08mgvc.blur);
      $_6h5kwkygjd08mgvc.focus(iBody);
    });
  };
  var $_m7wp713ujd08mhqn = { resume: resume };

  var safeParse = function (element, attribute) {
    var parsed = parseInt($_auw0hixwjd08mgt8.get(element, attribute), 10);
    return isNaN(parsed) ? 0 : parsed;
  };
  var $_7nibom13vjd08mhqu = { safeParse: safeParse };

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
        return $_4izgwbwajd08mgn6.none();
      }
    };
    var getOptionSafe = function (element) {
      return is(element) ? $_4izgwbwajd08mgn6.from(element.dom().nodeValue) : $_4izgwbwajd08mgn6.none();
    };
    var browser = $_dymoxnwgjd08mgng.detect().browser;
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

  var api$3 = NodeValue($_9323z1xxjd08mgti.isText, 'text');
  var get$12 = function (element) {
    return api$3.get(element);
  };
  var getOption = function (element) {
    return api$3.getOption(element);
  };
  var set$8 = function (element, value) {
    api$3.set(element, value);
  };
  var $_5931yl13yjd08mhr6 = {
    get: get$12,
    getOption: getOption,
    set: set$8
  };

  var getEnd = function (element) {
    return $_9323z1xxjd08mgti.name(element) === 'img' ? 1 : $_5931yl13yjd08mhr6.getOption(element).fold(function () {
      return $_4uhv6ey3jd08mgu3.children(element).length;
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
    return $_5931yl13yjd08mhr6.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_453g14w9jd08mgmy.contains(elementsWithCursorPosition, $_9323z1xxjd08mgti.name(elem));
  };
  var $_6n0upa13xjd08mhr4 = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var adt$4 = $_dv5x6ax4jd08mgqe.generate([
    { 'before': ['element'] },
    {
      'on': [
        'element',
        'offset'
      ]
    },
    { after: ['element'] }
  ]);
  var cata = function (subject, onBefore, onOn, onAfter) {
    return subject.fold(onBefore, onOn, onAfter);
  };
  var getStart = function (situ) {
    return situ.fold($_8zkcijwbjd08mgn8.identity, $_8zkcijwbjd08mgn8.identity, $_8zkcijwbjd08mgn8.identity);
  };
  var $_f54xre141jd08mhri = {
    before: adt$4.before,
    on: adt$4.on,
    after: adt$4.after,
    cata: cata,
    getStart: getStart
  };

  var type$1 = $_dv5x6ax4jd08mgqe.generate([
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
  var range$1 = $_2h5zjyxmjd08mgsp.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$1.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart$1 = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_3visdkwtjd08mgor.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_f54xre141jd08mhri.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart$1(selection);
    return $_4uhv6ey3jd08mgu3.defaultView(start);
  };
  var $_2ueh6f140jd08mhre = {
    domRange: type$1.domRange,
    relative: type$1.relative,
    exact: type$1.exact,
    exactFromRange: exactFromRange,
    range: range$1,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_4uhv6ey3jd08mgu3.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_3visdkwtjd08mgor.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_ctdo1gw8jd08mgmp.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_45aydk143jd08mhrq = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_453g14w9jd08mgmy.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_3visdkwtjd08mgor.fromDom(fragment);
  };
  var $_fcjgxe144jd08mhru = { fromElements: fromElements };

  var selectNodeContents = function (win, element) {
    var rng = win.document.createRange();
    selectNodeContentsUsing(rng, element);
    return rng;
  };
  var selectNodeContentsUsing = function (rng, element) {
    rng.selectNodeContents(element.dom());
  };
  var isWithin = function (outerRange, innerRange) {
    return innerRange.compareBoundaryPoints(outerRange.END_TO_START, outerRange) < 1 && innerRange.compareBoundaryPoints(outerRange.START_TO_END, outerRange) > -1;
  };
  var create$4 = function (win) {
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
    return $_3visdkwtjd08mgor.fromDom(fragment);
  };
  var toRect = function (rect) {
    return {
      left: $_8zkcijwbjd08mgn8.constant(rect.left),
      top: $_8zkcijwbjd08mgn8.constant(rect.top),
      right: $_8zkcijwbjd08mgn8.constant(rect.right),
      bottom: $_8zkcijwbjd08mgn8.constant(rect.bottom),
      width: $_8zkcijwbjd08mgn8.constant(rect.width),
      height: $_8zkcijwbjd08mgn8.constant(rect.height)
    };
  };
  var getFirstRect = function (rng) {
    var rects = rng.getClientRects();
    var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_4izgwbwajd08mgn6.some(rect).map(toRect) : $_4izgwbwajd08mgn6.none();
  };
  var getBounds = function (rng) {
    var rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_4izgwbwajd08mgn6.some(rect).map(toRect) : $_4izgwbwajd08mgn6.none();
  };
  var toString$1 = function (rng) {
    return rng.toString();
  };
  var $_vynpz145jd08mhrx = {
    create: create$4,
    replaceWith: replaceWith,
    selectNodeContents: selectNodeContents,
    selectNodeContentsUsing: selectNodeContentsUsing,
    relativeToNative: relativeToNative,
    exactToNative: exactToNative,
    deleteContents: deleteContents,
    cloneFragment: cloneFragment,
    getFirstRect: getFirstRect,
    getBounds: getBounds,
    isWithin: isWithin,
    toString: toString$1
  };

  var adt$5 = $_dv5x6ax4jd08mgqe.generate([
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
    return type($_3visdkwtjd08mgor.fromDom(range.startContainer), range.startOffset, $_3visdkwtjd08mgor.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_8zkcijwbjd08mgn8.constant(rng),
          rtl: $_4izgwbwajd08mgn6.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_2crir4whjd08mgni.cached(function () {
            return $_vynpz145jd08mhrx.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_2crir4whjd08mgni.cached(function () {
            return $_4izgwbwajd08mgn6.some($_vynpz145jd08mhrx.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_2crir4whjd08mgni.cached(function () {
            return $_vynpz145jd08mhrx.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_2crir4whjd08mgni.cached(function () {
            return $_4izgwbwajd08mgn6.some($_vynpz145jd08mhrx.exactToNative(win, finish, foffset, start, soffset));
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
        return adt$5.rtl($_3visdkwtjd08mgor.fromDom(rev.endContainer), rev.endOffset, $_3visdkwtjd08mgor.fromDom(rev.startContainer), rev.startOffset);
      }).getOrThunk(function () {
        return fromRange(win, adt$5.ltr, rng);
      });
    } else {
      return fromRange(win, adt$5.ltr, rng);
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
  var $_9inz42146jd08mhs1 = {
    ltr: adt$5.ltr,
    rtl: adt$5.rtl,
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
  var $_g288u1149jd08mhsl = {
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
    var length = $_5931yl13yjd08mhr6.get(textnode).length;
    var offset = $_g288u1149jd08mhsl.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate$1 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_cqt7vbyejd08mgva.findMap(rects, function (rect) {
      return $_g288u1149jd08mhsl.inRect(rect, x, y) ? $_4izgwbwajd08mgn6.some(rect) : $_4izgwbwajd08mgn6.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_3i3mnr14ajd08mhsm = { locate: locate$1 };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_4uhv6ey3jd08mgu3.children(node);
    return $_cqt7vbyejd08mgva.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_g288u1149jd08mhsl.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : $_4izgwbwajd08mgn6.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_9323z1xxjd08mgti.isText(node) ? $_3i3mnr14ajd08mhsm.locate : searchInChildren;
    return locator(doc, node, x, y);
  };
  var locate$2 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return locateNode(doc, node, boundedX, boundedY);
  };
  var $_f5nxym148jd08mhse = { locate: locate$2 };

  var first$3 = function (element) {
    return $_cmjc72yijd08mgvh.descendant(element, $_6n0upa13xjd08mhr4.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_6n0upa13xjd08mhr4.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_4uhv6ey3jd08mgu3.children(element);
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (predicate(child))
          return $_4izgwbwajd08mgn6.some(child);
        var res = descend(child);
        if (res.isSome())
          return res;
      }
      return $_4izgwbwajd08mgn6.none();
    };
    return descend(scope);
  };
  var $_gc8dnq14cjd08mhsu = {
    first: first$3,
    last: last$2
  };

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
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_gc8dnq14cjd08mhsu.first : $_gc8dnq14cjd08mhsu.last;
    return f(node).map(function (target) {
      return createCollapsedNode(doc, target, collapseDirection);
    });
  };
  var locateInEmpty = function (doc, node, x) {
    var rect = node.dom().getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    return $_4izgwbwajd08mgn6.some(createCollapsedNode(doc, node, collapseDirection));
  };
  var search$1 = function (doc, node, x) {
    var f = $_4uhv6ey3jd08mgu3.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_2cj60d14bjd08mhsr = { search: search$1 };

  var caretPositionFromPoint = function (doc, x, y) {
    return $_4izgwbwajd08mgn6.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
      if (pos.offsetNode === null)
        return $_4izgwbwajd08mgn6.none();
      var r = doc.dom().createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse();
      return $_4izgwbwajd08mgn6.some(r);
    });
  };
  var caretRangeFromPoint = function (doc, x, y) {
    return $_4izgwbwajd08mgn6.from(doc.dom().caretRangeFromPoint(x, y));
  };
  var searchTextNodes = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return $_f5nxym148jd08mhse.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_3visdkwtjd08mgor.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_2cj60d14bjd08mhsr.search(doc, elem, x);
      };
      return $_4uhv6ey3jd08mgu3.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_3visdkwtjd08mgor.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_2ueh6f140jd08mhre.range($_3visdkwtjd08mgor.fromDom(rng.startContainer), rng.startOffset, $_3visdkwtjd08mgor.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_1pp009147jd08mhsb = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_vynpz145jd08mhrx.create(win);
    var self = $_7fzh2owsjd08mgok.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_48w1m3zkjd08mh0b.descendants(ancestor, selector));
    return $_453g14w9jd08mgmy.filter(elements, function (elem) {
      $_vynpz145jd08mhrx.selectNodeContentsUsing(innerRange, elem);
      return $_vynpz145jd08mhrx.isWithin(outerRange, innerRange);
    });
  };
  var find$4 = function (win, selection, selector) {
    var outerRange = $_9inz42146jd08mhs1.asLtrRange(win, selection);
    var ancestor = $_3visdkwtjd08mgor.fromDom(outerRange.commonAncestorContainer);
    return $_9323z1xxjd08mgti.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_70tpi214djd08mhsx = { find: find$4 };

  var beforeSpecial = function (element, offset) {
    var name = $_9323z1xxjd08mgti.name(element);
    if ('input' === name)
      return $_f54xre141jd08mhri.after(element);
    else if (!$_453g14w9jd08mgmy.contains([
        'br',
        'img'
      ], name))
      return $_f54xre141jd08mhri.on(element, offset);
    else
      return offset === 0 ? $_f54xre141jd08mhri.before(element) : $_f54xre141jd08mhri.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_f54xre141jd08mhri.before, beforeSpecial, $_f54xre141jd08mhri.after);
    var finish = finishSitu.fold($_f54xre141jd08mhri.before, beforeSpecial, $_f54xre141jd08mhri.after);
    return $_2ueh6f140jd08mhre.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_2ueh6f140jd08mhre.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_3visdkwtjd08mgor.fromDom(rng.startContainer);
        var finish = $_3visdkwtjd08mgor.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_7sn9r714ejd08mht0 = {
    beforeSpecial: beforeSpecial,
    preprocess: preprocess,
    preprocessRelative: preprocessRelative,
    preprocessExact: preprocessExact
  };

  var doSetNativeRange = function (win, rng) {
    $_4izgwbwajd08mgn6.from(win.getSelection()).each(function (selection) {
      selection.removeAllRanges();
      selection.addRange(rng);
    });
  };
  var doSetRange = function (win, start, soffset, finish, foffset) {
    var rng = $_vynpz145jd08mhrx.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_70tpi214djd08mhsx.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_9inz42146jd08mhs1.diagnose(win, relative).match({
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
    var relative = $_7sn9r714ejd08mht0.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_7sn9r714ejd08mht0.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_2ueh6f140jd08mhre.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_vynpz145jd08mhrx.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_7sn9r714ejd08mht0.preprocess(selection);
    return $_9inz42146jd08mhs1.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return $_4izgwbwajd08mgn6.some($_2ueh6f140jd08mhre.range($_3visdkwtjd08mgor.fromDom(firstRng.startContainer), firstRng.startOffset, $_3visdkwtjd08mgor.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return $_4izgwbwajd08mgn6.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_3visdkwtjd08mgor.fromDom(selection.anchorNode);
    var focusNode = $_3visdkwtjd08mgor.fromDom(selection.focusNode);
    return $_45aydk143jd08mhrq.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? $_4izgwbwajd08mgn6.some($_2ueh6f140jd08mhre.range($_3visdkwtjd08mgor.fromDom(selection.anchorNode), selection.anchorOffset, $_3visdkwtjd08mgor.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_vynpz145jd08mhrx.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_vynpz145jd08mhrx.selectNodeContents(win, element);
    return $_2ueh6f140jd08mhre.range($_3visdkwtjd08mgor.fromDom(rng.startContainer), rng.startOffset, $_3visdkwtjd08mgor.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : $_4izgwbwajd08mgn6.none();
  };
  var get$13 = function (win) {
    return getExact(win).map(function (range) {
      return $_2ueh6f140jd08mhre.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect$1 = function (win, selection) {
    var rng = $_9inz42146jd08mhs1.asLtrRange(win, selection);
    return $_vynpz145jd08mhrx.getFirstRect(rng);
  };
  var getBounds$1 = function (win, selection) {
    var rng = $_9inz42146jd08mhs1.asLtrRange(win, selection);
    return $_vynpz145jd08mhrx.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_1pp009147jd08mhsb.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_9inz42146jd08mhs1.asLtrRange(win, selection);
    return $_vynpz145jd08mhrx.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$3 = function (win, selection) {
    var rng = $_9inz42146jd08mhs1.asLtrRange(win, selection);
    return $_vynpz145jd08mhrx.cloneFragment(rng);
  };
  var replace = function (win, selection, elements) {
    var rng = $_9inz42146jd08mhs1.asLtrRange(win, selection);
    var fragment = $_fcjgxe144jd08mhru.fromElements(elements, win.document);
    $_vynpz145jd08mhrx.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_9inz42146jd08mhs1.asLtrRange(win, selection);
    $_vynpz145jd08mhrx.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_ctdo1gw8jd08mgmp.eq(start, finish) && soffset === foffset;
  };
  var $_385m6m142jd08mhrl = {
    setExact: setExact,
    getExact: getExact,
    get: get$13,
    setRelative: setRelative,
    toNative: toNative,
    setToElement: setToElement,
    clear: clear$1,
    clone: clone$3,
    replace: replace,
    deleteAt: deleteAt,
    forElement: forElement,
    getFirstRect: getFirstRect$1,
    getBounds: getBounds$1,
    getAtPoint: getAtPoint,
    findWithin: findWithin,
    getAsString: getAsString,
    isCollapsed: isCollapsed
  };

  var COLLAPSED_WIDTH = 2;
  var collapsedRect = function (rect) {
    return {
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: $_8zkcijwbjd08mgn8.constant(COLLAPSED_WIDTH),
      height: rect.height
    };
  };
  var toRect$1 = function (rawRect) {
    return {
      left: $_8zkcijwbjd08mgn8.constant(rawRect.left),
      top: $_8zkcijwbjd08mgn8.constant(rawRect.top),
      right: $_8zkcijwbjd08mgn8.constant(rawRect.right),
      bottom: $_8zkcijwbjd08mgn8.constant(rawRect.bottom),
      width: $_8zkcijwbjd08mgn8.constant(rawRect.width),
      height: $_8zkcijwbjd08mgn8.constant(rawRect.height)
    };
  };
  var getRectsFromRange = function (range) {
    if (!range.collapsed) {
      return $_453g14w9jd08mgmy.map(range.getClientRects(), toRect$1);
    } else {
      var start_1 = $_3visdkwtjd08mgor.fromDom(range.startContainer);
      return $_4uhv6ey3jd08mgu3.parent(start_1).bind(function (parent) {
        var selection = $_2ueh6f140jd08mhre.exact(start_1, range.startOffset, parent, $_6n0upa13xjd08mhr4.getEnd(parent));
        var optRect = $_385m6m142jd08mhrl.getFirstRect(range.startContainer.ownerDocument.defaultView, selection);
        return optRect.map(collapsedRect).map($_453g14w9jd08mgmy.pure);
      }).getOr([]);
    }
  };
  var getRectangles = function (cWin) {
    var sel = cWin.getSelection();
    return sel !== undefined && sel.rangeCount > 0 ? getRectsFromRange(sel.getRangeAt(0)) : [];
  };
  var $_9bqhqd13wjd08mhqw = { getRectangles: getRectangles };

  var EXTRA_SPACING = 50;
  var data = 'data-' + $_ete72zz1jd08mgy0.resolve('last-outer-height');
  var setLastHeight = function (cBody, value) {
    $_auw0hixwjd08mgt8.set(cBody, data, value);
  };
  var getLastHeight = function (cBody) {
    return $_7nibom13vjd08mhqu.safeParse(cBody, data);
  };
  var getBoundsFrom = function (rect) {
    return {
      top: $_8zkcijwbjd08mgn8.constant(rect.top()),
      bottom: $_8zkcijwbjd08mgn8.constant(rect.top() + rect.height())
    };
  };
  var getBounds$2 = function (cWin) {
    var rects = $_9bqhqd13wjd08mhqw.getRectangles(cWin);
    return rects.length > 0 ? $_4izgwbwajd08mgn6.some(rects[0]).map(getBoundsFrom) : $_4izgwbwajd08mgn6.none();
  };
  var findDelta = function (outerWindow, cBody) {
    var last = getLastHeight(cBody);
    var current = outerWindow.innerHeight;
    return last > current ? $_4izgwbwajd08mgn6.some(last - current) : $_4izgwbwajd08mgn6.none();
  };
  var calculate = function (cWin, bounds, delta) {
    var isOutside = bounds.top() > cWin.innerHeight || bounds.bottom() > cWin.innerHeight;
    return isOutside ? Math.min(delta, bounds.bottom() - cWin.innerHeight + EXTRA_SPACING) : 0;
  };
  var setup$1 = function (outerWindow, cWin) {
    var cBody = $_3visdkwtjd08mgor.fromDom(cWin.document.body);
    var toEditing = function () {
      $_m7wp713ujd08mhqn.resume(cWin);
    };
    var onResize = $_buvuih13kjd08mhp2.bind($_3visdkwtjd08mgor.fromDom(outerWindow), 'resize', function () {
      findDelta(outerWindow, cBody).each(function (delta) {
        getBounds$2(cWin).each(function (bounds) {
          var cScrollBy = calculate(cWin, bounds, delta);
          if (cScrollBy !== 0) {
            cWin.scrollTo(cWin.pageXOffset, cWin.pageYOffset + cScrollBy);
          }
        });
      });
      setLastHeight(cBody, outerWindow.innerHeight);
    });
    setLastHeight(cBody, outerWindow.innerHeight);
    var destroy = function () {
      onResize.unbind();
    };
    return {
      toEditing: toEditing,
      destroy: destroy
    };
  };
  var $_bx2sug13tjd08mhqd = { setup: setup$1 };

  var getBodyFromFrame = function (frame) {
    return $_4izgwbwajd08mgn6.some($_3visdkwtjd08mgor.fromDom(frame.dom().contentWindow.document.body));
  };
  var getDocFromFrame = function (frame) {
    return $_4izgwbwajd08mgn6.some($_3visdkwtjd08mgor.fromDom(frame.dom().contentWindow.document));
  };
  var getWinFromFrame = function (frame) {
    return $_4izgwbwajd08mgn6.from(frame.dom().contentWindow);
  };
  var getSelectionFromFrame = function (frame) {
    var optWin = getWinFromFrame(frame);
    return optWin.bind($_385m6m142jd08mhrl.getExact);
  };
  var getFrame = function (editor) {
    return editor.getFrame();
  };
  var getOrDerive = function (name, f) {
    return function (editor) {
      var g = editor[name].getOrThunk(function () {
        var frame = getFrame(editor);
        return function () {
          return f(frame);
        };
      });
      return g();
    };
  };
  var getOrListen = function (editor, doc, name, type) {
    return editor[name].getOrThunk(function () {
      return function (handler) {
        return $_buvuih13kjd08mhp2.bind(doc, type, handler);
      };
    });
  };
  var toRect$2 = function (rect) {
    return {
      left: $_8zkcijwbjd08mgn8.constant(rect.left),
      top: $_8zkcijwbjd08mgn8.constant(rect.top),
      right: $_8zkcijwbjd08mgn8.constant(rect.right),
      bottom: $_8zkcijwbjd08mgn8.constant(rect.bottom),
      width: $_8zkcijwbjd08mgn8.constant(rect.width),
      height: $_8zkcijwbjd08mgn8.constant(rect.height)
    };
  };
  var getActiveApi = function (editor) {
    var frame = getFrame(editor);
    var tryFallbackBox = function (win) {
      var isCollapsed = function (sel) {
        return $_ctdo1gw8jd08mgmp.eq(sel.start(), sel.finish()) && sel.soffset() === sel.foffset();
      };
      var toStartRect = function (sel) {
        var rect = sel.start().dom().getBoundingClientRect();
        return rect.width > 0 || rect.height > 0 ? $_4izgwbwajd08mgn6.some(rect).map(toRect$2) : $_4izgwbwajd08mgn6.none();
      };
      return $_385m6m142jd08mhrl.getExact(win).filter(isCollapsed).bind(toStartRect);
    };
    return getBodyFromFrame(frame).bind(function (body) {
      return getDocFromFrame(frame).bind(function (doc) {
        return getWinFromFrame(frame).map(function (win) {
          var html = $_3visdkwtjd08mgor.fromDom(doc.dom().documentElement);
          var getCursorBox = editor.getCursorBox.getOrThunk(function () {
            return function () {
              return $_385m6m142jd08mhrl.get(win).bind(function (sel) {
                return $_385m6m142jd08mhrl.getFirstRect(win, sel).orThunk(function () {
                  return tryFallbackBox(win);
                });
              });
            };
          });
          var setSelection = editor.setSelection.getOrThunk(function () {
            return function (start, soffset, finish, foffset) {
              $_385m6m142jd08mhrl.setExact(win, start, soffset, finish, foffset);
            };
          });
          var clearSelection = editor.clearSelection.getOrThunk(function () {
            return function () {
              $_385m6m142jd08mhrl.clear(win);
            };
          });
          return {
            body: $_8zkcijwbjd08mgn8.constant(body),
            doc: $_8zkcijwbjd08mgn8.constant(doc),
            win: $_8zkcijwbjd08mgn8.constant(win),
            html: $_8zkcijwbjd08mgn8.constant(html),
            getSelection: $_8zkcijwbjd08mgn8.curry(getSelectionFromFrame, frame),
            setSelection: setSelection,
            clearSelection: clearSelection,
            frame: $_8zkcijwbjd08mgn8.constant(frame),
            onKeyup: getOrListen(editor, doc, 'onKeyup', 'keyup'),
            onNodeChanged: getOrListen(editor, doc, 'onNodeChanged', 'selectionchange'),
            onDomChanged: editor.onDomChanged,
            onScrollToCursor: editor.onScrollToCursor,
            onScrollToElement: editor.onScrollToElement,
            onToReading: editor.onToReading,
            onToEditing: editor.onToEditing,
            onToolbarScrollStart: editor.onToolbarScrollStart,
            onTouchContent: editor.onTouchContent,
            onTapContent: editor.onTapContent,
            onTouchToolstrip: editor.onTouchToolstrip,
            getCursorBox: getCursorBox
          };
        });
      });
    });
  };
  var $_1ocnqn14fjd08mht4 = {
    getBody: getOrDerive('getBody', getBodyFromFrame),
    getDoc: getOrDerive('getDoc', getDocFromFrame),
    getWin: getOrDerive('getWin', getWinFromFrame),
    getSelection: getOrDerive('getSelection', getSelectionFromFrame),
    getFrame: getFrame,
    getActiveApi: getActiveApi
  };

  var attr = 'data-ephox-mobile-fullscreen-style';
  var siblingStyles = 'display:none!important;';
  var ancestorPosition = 'position:absolute!important;';
  var ancestorStyles = 'top:0!important;left:0!important;margin:0' + '!important;padding:0!important;width:100%!important;';
  var bgFallback = 'background-color:rgb(255,255,255)!important;';
  var isAndroid = $_dymoxnwgjd08mgng.detect().os.isAndroid();
  var matchColor = function (editorBody) {
    var color = $_62cv66zsjd08mh10.get(editorBody, 'background-color');
    return color !== undefined && color !== '' ? 'background-color:' + color + '!important' : bgFallback;
  };
  var clobberStyles = function (container, editorBody) {
    var gatherSibilings = function (element) {
      var siblings = $_48w1m3zkjd08mh0b.siblings(element, '*');
      return siblings;
    };
    var clobber = function (clobberStyle) {
      return function (element) {
        var styles = $_auw0hixwjd08mgt8.get(element, 'style');
        var backup = styles === undefined ? 'no-styles' : styles.trim();
        if (backup === clobberStyle) {
          return;
        } else {
          $_auw0hixwjd08mgt8.set(element, attr, backup);
          $_auw0hixwjd08mgt8.set(element, 'style', clobberStyle);
        }
      };
    };
    var ancestors = $_48w1m3zkjd08mh0b.ancestors(container, '*');
    var siblings = $_453g14w9jd08mgmy.bind(ancestors, gatherSibilings);
    var bgColor = matchColor(editorBody);
    $_453g14w9jd08mgmy.each(siblings, clobber(siblingStyles));
    $_453g14w9jd08mgmy.each(ancestors, clobber(ancestorPosition + ancestorStyles + bgColor));
    var containerStyles = isAndroid === true ? '' : ancestorPosition;
    clobber(containerStyles + ancestorStyles + bgColor)(container);
  };
  var restoreStyles = function () {
    var clobberedEls = $_48w1m3zkjd08mh0b.all('[' + attr + ']');
    $_453g14w9jd08mgmy.each(clobberedEls, function (element) {
      var restore = $_auw0hixwjd08mgt8.get(element, attr);
      if (restore !== 'no-styles') {
        $_auw0hixwjd08mgt8.set(element, 'style', restore);
      } else {
        $_auw0hixwjd08mgt8.remove(element, 'style');
      }
      $_auw0hixwjd08mgt8.remove(element, attr);
    });
  };
  var $_dm4r7914gjd08mhtd = {
    clobberStyles: clobberStyles,
    restoreStyles: restoreStyles
  };

  var tag = function () {
    var head = $_edahi9zmjd08mh0g.first('head').getOrDie();
    var nu = function () {
      var meta = $_3visdkwtjd08mgor.fromTag('meta');
      $_auw0hixwjd08mgt8.set(meta, 'name', 'viewport');
      $_u7ngdy2jd08mgu1.append(head, meta);
      return meta;
    };
    var element = $_edahi9zmjd08mh0g.first('meta[name="viewport"]').getOrThunk(nu);
    var backup = $_auw0hixwjd08mgt8.get(element, 'content');
    var maximize = function () {
      $_auw0hixwjd08mgt8.set(element, 'content', 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0');
    };
    var restore = function () {
      if (backup !== undefined && backup !== null && backup.length > 0) {
        $_auw0hixwjd08mgt8.set(element, 'content', backup);
      } else {
        $_auw0hixwjd08mgt8.set(element, 'content', 'user-scalable=yes');
      }
    };
    return {
      maximize: maximize,
      restore: restore
    };
  };
  var $_cpg25l14hjd08mhtk = { tag: tag };

  var create$5 = function (platform, mask) {
    var meta = $_cpg25l14hjd08mhtk.tag();
    var androidApi = $_daqe5q12ajd08mhfm.api();
    var androidEvents = $_daqe5q12ajd08mhfm.api();
    var enter = function () {
      mask.hide();
      $_5tvqrbxujd08mgt5.add(platform.container, $_ete72zz1jd08mgy0.resolve('fullscreen-maximized'));
      $_5tvqrbxujd08mgt5.add(platform.container, $_ete72zz1jd08mgy0.resolve('android-maximized'));
      meta.maximize();
      $_5tvqrbxujd08mgt5.add(platform.body, $_ete72zz1jd08mgy0.resolve('android-scroll-reload'));
      androidApi.set($_bx2sug13tjd08mhqd.setup(platform.win, $_1ocnqn14fjd08mht4.getWin(platform.editor).getOrDie('no')));
      $_1ocnqn14fjd08mht4.getActiveApi(platform.editor).each(function (editorApi) {
        $_dm4r7914gjd08mhtd.clobberStyles(platform.container, editorApi.body());
        androidEvents.set($_678nhh13pjd08mhpn.initEvents(editorApi, platform.toolstrip, platform.alloy));
      });
    };
    var exit = function () {
      meta.restore();
      mask.show();
      $_5tvqrbxujd08mgt5.remove(platform.container, $_ete72zz1jd08mgy0.resolve('fullscreen-maximized'));
      $_5tvqrbxujd08mgt5.remove(platform.container, $_ete72zz1jd08mgy0.resolve('android-maximized'));
      $_dm4r7914gjd08mhtd.restoreStyles();
      $_5tvqrbxujd08mgt5.remove(platform.body, $_ete72zz1jd08mgy0.resolve('android-scroll-reload'));
      androidEvents.clear();
      androidApi.clear();
    };
    return {
      enter: enter,
      exit: exit
    };
  };
  var $_70cykl13ojd08mhpj = { create: create$5 };

  var MobileSchema = $_6eo7r6xhjd08mgrx.objOf([
    $_1mrawkx2jd08mgq2.strictObjOf('editor', [
      $_1mrawkx2jd08mgq2.strict('getFrame'),
      $_1mrawkx2jd08mgq2.option('getBody'),
      $_1mrawkx2jd08mgq2.option('getDoc'),
      $_1mrawkx2jd08mgq2.option('getWin'),
      $_1mrawkx2jd08mgq2.option('getSelection'),
      $_1mrawkx2jd08mgq2.option('setSelection'),
      $_1mrawkx2jd08mgq2.option('clearSelection'),
      $_1mrawkx2jd08mgq2.option('cursorSaver'),
      $_1mrawkx2jd08mgq2.option('onKeyup'),
      $_1mrawkx2jd08mgq2.option('onNodeChanged'),
      $_1mrawkx2jd08mgq2.option('getCursorBox'),
      $_1mrawkx2jd08mgq2.strict('onDomChanged'),
      $_1mrawkx2jd08mgq2.defaulted('onTouchContent', $_8zkcijwbjd08mgn8.noop),
      $_1mrawkx2jd08mgq2.defaulted('onTapContent', $_8zkcijwbjd08mgn8.noop),
      $_1mrawkx2jd08mgq2.defaulted('onTouchToolstrip', $_8zkcijwbjd08mgn8.noop),
      $_1mrawkx2jd08mgq2.defaulted('onScrollToCursor', $_8zkcijwbjd08mgn8.constant({ unbind: $_8zkcijwbjd08mgn8.noop })),
      $_1mrawkx2jd08mgq2.defaulted('onScrollToElement', $_8zkcijwbjd08mgn8.constant({ unbind: $_8zkcijwbjd08mgn8.noop })),
      $_1mrawkx2jd08mgq2.defaulted('onToEditing', $_8zkcijwbjd08mgn8.constant({ unbind: $_8zkcijwbjd08mgn8.noop })),
      $_1mrawkx2jd08mgq2.defaulted('onToReading', $_8zkcijwbjd08mgn8.constant({ unbind: $_8zkcijwbjd08mgn8.noop })),
      $_1mrawkx2jd08mgq2.defaulted('onToolbarScrollStart', $_8zkcijwbjd08mgn8.identity)
    ]),
    $_1mrawkx2jd08mgq2.strict('socket'),
    $_1mrawkx2jd08mgq2.strict('toolstrip'),
    $_1mrawkx2jd08mgq2.strict('dropup'),
    $_1mrawkx2jd08mgq2.strict('toolbar'),
    $_1mrawkx2jd08mgq2.strict('container'),
    $_1mrawkx2jd08mgq2.strict('alloy'),
    $_1mrawkx2jd08mgq2.state('win', function (spec) {
      return $_4uhv6ey3jd08mgu3.owner(spec.socket).dom().defaultView;
    }),
    $_1mrawkx2jd08mgq2.state('body', function (spec) {
      return $_3visdkwtjd08mgor.fromDom(spec.socket.dom().ownerDocument.body);
    }),
    $_1mrawkx2jd08mgq2.defaulted('translate', $_8zkcijwbjd08mgn8.identity),
    $_1mrawkx2jd08mgq2.defaulted('setReadOnly', $_8zkcijwbjd08mgn8.noop)
  ]);

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
  var $_alzm5u14kjd08mhu4 = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var sketch$10 = function (onView, translate) {
    var memIcon = $_4gwcwf11ejd08mhb2.record(Container.sketch({
      dom: $_3iuzq510qjd08mh7l.dom('<div aria-hidden="true" class="${prefix}-mask-tap-icon"></div>'),
      containerBehaviours: $_voa9kw4jd08mglm.derive([Toggling.config({
          toggleClass: $_ete72zz1jd08mgy0.resolve('mask-tap-icon-selected'),
          toggleOnExecute: false
        })])
    }));
    var onViewThrottle = $_alzm5u14kjd08mhu4.first(onView, 200);
    return Container.sketch({
      dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-disabled-mask"></div>'),
      components: [Container.sketch({
          dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-content-container"></div>'),
          components: [Button.sketch({
              dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-content-tap-section"></div>'),
              components: [memIcon.asSpec()],
              action: function (button) {
                onViewThrottle.throttle();
              },
              buttonBehaviours: $_voa9kw4jd08mglm.derive([Toggling.config({ toggleClass: $_ete72zz1jd08mgy0.resolve('mask-tap-icon-selected') })])
            })]
        })]
    });
  };
  var $_7pe5ri14jjd08mhtv = { sketch: sketch$10 };

  var produce = function (raw) {
    var mobile = $_6eo7r6xhjd08mgrx.asRawOrDie('Getting AndroidWebapp schema', MobileSchema, raw);
    $_62cv66zsjd08mh10.set(mobile.toolstrip, 'width', '100%');
    var onTap = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_eg825h12kjd08mhhk.build($_7pe5ri14jjd08mhtv.sketch(onTap, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    $_u7ngdy2jd08mgu1.append(mobile.container, mask.element());
    var mode = $_70cykl13ojd08mhpj.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: $_8zkcijwbjd08mgn8.noop,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_8zkcijwbjd08mgn8.noop
    };
  };
  var $_azdpjy13njd08mhpb = { produce: produce };

  var schema$14 = [
    $_1mrawkx2jd08mgq2.defaulted('shell', true),
    $_8tr5o010djd08mh4k.field('toolbarBehaviours', [Replacing])
  ];
  var enhanceGroups = function (detail) {
    return { behaviours: $_voa9kw4jd08mglm.derive([Replacing.config({})]) };
  };
  var partTypes$1 = [$_eertgd10kjd08mh62.optional({
      name: 'groups',
      overrides: enhanceGroups
    })];
  var $_g9mljo14njd08mhuv = {
    name: $_8zkcijwbjd08mgn8.constant('Toolbar'),
    schema: $_8zkcijwbjd08mgn8.constant(schema$14),
    parts: $_8zkcijwbjd08mgn8.constant(partTypes$1)
  };

  var factory$4 = function (detail, components, spec, _externals) {
    var setGroups = function (toolbar, groups) {
      getGroupContainer(toolbar).fold(function () {
        console.error('Toolbar was defined to not be a shell, but no groups container was specified in components');
        throw new Error('Toolbar was defined to not be a shell, but no groups container was specified in components');
      }, function (container) {
        Replacing.set(container, groups);
      });
    };
    var getGroupContainer = function (component) {
      return detail.shell() ? $_4izgwbwajd08mgn6.some(component) : $_fyge8g10ijd08mh5e.getPart(component, detail, 'groups');
    };
    var extra = detail.shell() ? {
      behaviours: [Replacing.config({})],
      components: []
    } : {
      behaviours: [],
      components: components
    };
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: extra.components,
      behaviours: $_25kgk5wyjd08mgpk.deepMerge($_voa9kw4jd08mglm.derive(extra.behaviours), $_8tr5o010djd08mh4k.get(detail.toolbarBehaviours())),
      apis: { setGroups: setGroups },
      domModification: { attributes: { role: 'group' } }
    };
  };
  var Toolbar = $_88109v10ejd08mh4q.composite({
    name: 'Toolbar',
    configFields: $_g9mljo14njd08mhuv.schema(),
    partFields: $_g9mljo14njd08mhuv.parts(),
    factory: factory$4,
    apis: {
      setGroups: function (apis, toolbar, groups) {
        apis.setGroups(toolbar, groups);
      }
    }
  });

  var schema$15 = [
    $_1mrawkx2jd08mgq2.strict('items'),
    $_6uz7ybytjd08mgwm.markers(['itemClass']),
    $_8tr5o010djd08mh4k.field('tgroupBehaviours', [Keying])
  ];
  var partTypes$2 = [$_eertgd10kjd08mh62.group({
      name: 'items',
      unit: 'item',
      overrides: function (detail) {
        return { domModification: { classes: [detail.markers().itemClass()] } };
      }
    })];
  var $_g4kxiv14pjd08mhv5 = {
    name: $_8zkcijwbjd08mgn8.constant('ToolbarGroup'),
    schema: $_8zkcijwbjd08mgn8.constant(schema$15),
    parts: $_8zkcijwbjd08mgn8.constant(partTypes$2)
  };

  var factory$5 = function (detail, components, spec, _externals) {
    return $_25kgk5wyjd08mgpk.deepMerge({ dom: { attributes: { role: 'toolbar' } } }, {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_25kgk5wyjd08mgpk.deepMerge($_voa9kw4jd08mglm.derive([Keying.config({
          mode: 'flow',
          selector: '.' + detail.markers().itemClass()
        })]), $_8tr5o010djd08mh4k.get(detail.tgroupBehaviours())),
      'debug.sketcher': spec['debug.sketcher']
    });
  };
  var ToolbarGroup = $_88109v10ejd08mh4q.composite({
    name: 'ToolbarGroup',
    configFields: $_g4kxiv14pjd08mhv5.schema(),
    partFields: $_g4kxiv14pjd08mhv5.parts(),
    factory: factory$5
  });

  var dataHorizontal = 'data-' + $_ete72zz1jd08mgy0.resolve('horizontal-scroll');
  var canScrollVertically = function (container) {
    container.dom().scrollTop = 1;
    var result = container.dom().scrollTop !== 0;
    container.dom().scrollTop = 0;
    return result;
  };
  var canScrollHorizontally = function (container) {
    container.dom().scrollLeft = 1;
    var result = container.dom().scrollLeft !== 0;
    container.dom().scrollLeft = 0;
    return result;
  };
  var hasVerticalScroll = function (container) {
    return container.dom().scrollTop > 0 || canScrollVertically(container);
  };
  var hasHorizontalScroll = function (container) {
    return container.dom().scrollLeft > 0 || canScrollHorizontally(container);
  };
  var markAsHorizontal = function (container) {
    $_auw0hixwjd08mgt8.set(container, dataHorizontal, 'true');
  };
  var hasScroll = function (container) {
    return $_auw0hixwjd08mgt8.get(container, dataHorizontal) === 'true' ? hasHorizontalScroll : hasVerticalScroll;
  };
  var exclusive = function (scope, selector) {
    return $_buvuih13kjd08mhp2.bind(scope, 'touchmove', function (event) {
      $_edahi9zmjd08mh0g.closest(event.target(), selector).filter(hasScroll).fold(function () {
        event.raw().preventDefault();
      }, $_8zkcijwbjd08mgn8.noop);
    });
  };
  var $_25af6114qjd08mhva = {
    exclusive: exclusive,
    markAsHorizontal: markAsHorizontal
  };

  function ScrollingToolbar () {
    var makeGroup = function (gSpec) {
      var scrollClass = gSpec.scrollable === true ? '${prefix}-toolbar-scrollable-group' : '';
      return {
        dom: $_3iuzq510qjd08mh7l.dom('<div aria-label="' + gSpec.label + '" class="${prefix}-toolbar-group ' + scrollClass + '"></div>'),
        tgroupBehaviours: $_voa9kw4jd08mglm.derive([$_ejtkif11sjd08mhcv.config('adhoc-scrollable-toolbar', gSpec.scrollable === true ? [$_eexaurw6jd08mgmg.runOnInit(function (component, simulatedEvent) {
              $_62cv66zsjd08mh10.set(component.element(), 'overflow-x', 'auto');
              $_25af6114qjd08mhva.markAsHorizontal(component.element());
              $_2bo91013hjd08mhol.register(component.element());
            })] : [])]),
        components: [Container.sketch({ components: [ToolbarGroup.parts().items({})] })],
        markers: { itemClass: $_ete72zz1jd08mgy0.resolve('toolbar-group-item') },
        items: gSpec.items
      };
    };
    var toolbar = $_eg825h12kjd08mhhk.build(Toolbar.sketch({
      dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-toolbar"></div>'),
      components: [Toolbar.parts().groups({})],
      toolbarBehaviours: $_voa9kw4jd08mglm.derive([
        Toggling.config({
          toggleClass: $_ete72zz1jd08mgy0.resolve('context-toolbar'),
          toggleOnExecute: false,
          aria: { mode: 'none' }
        }),
        Keying.config({ mode: 'cyclic' })
      ]),
      shell: true
    }));
    var wrapper = $_eg825h12kjd08mhhk.build(Container.sketch({
      dom: { classes: [$_ete72zz1jd08mgy0.resolve('toolstrip')] },
      components: [$_eg825h12kjd08mhhk.premade(toolbar)],
      containerBehaviours: $_voa9kw4jd08mglm.derive([Toggling.config({
          toggleClass: $_ete72zz1jd08mgy0.resolve('android-selection-context-toolbar'),
          toggleOnExecute: false
        })])
    }));
    var resetGroups = function () {
      Toolbar.setGroups(toolbar, initGroups.get());
      Toggling.off(toolbar);
    };
    var initGroups = Cell([]);
    var setGroups = function (gs) {
      initGroups.set(gs);
      resetGroups();
    };
    var createGroups = function (gs) {
      return $_453g14w9jd08mgmy.map(gs, $_8zkcijwbjd08mgn8.compose(ToolbarGroup.sketch, makeGroup));
    };
    var refresh = function () {
      Toolbar.refresh(toolbar);
    };
    var setContextToolbar = function (gs) {
      Toggling.on(toolbar);
      Toolbar.setGroups(toolbar, gs);
    };
    var restoreToolbar = function () {
      if (Toggling.isOn(toolbar)) {
        resetGroups();
      }
    };
    var focus = function () {
      Keying.focusIn(toolbar);
    };
    return {
      wrapper: $_8zkcijwbjd08mgn8.constant(wrapper),
      toolbar: $_8zkcijwbjd08mgn8.constant(toolbar),
      createGroups: createGroups,
      setGroups: setGroups,
      setContextToolbar: setContextToolbar,
      restoreToolbar: restoreToolbar,
      refresh: refresh,
      focus: focus
    };
  }

  var makeEditSwitch = function (webapp) {
    return $_eg825h12kjd08mhhk.build(Button.sketch({
      dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-mask-edit-icon ${prefix}-icon"></div>'),
      action: function () {
        webapp.run(function (w) {
          w.setReadOnly(false);
        });
      }
    }));
  };
  var makeSocket = function () {
    return $_eg825h12kjd08mhhk.build(Container.sketch({
      dom: $_3iuzq510qjd08mh7l.dom('<div class="${prefix}-editor-socket"></div>'),
      components: [],
      containerBehaviours: $_voa9kw4jd08mglm.derive([Replacing.config({})])
    }));
  };
  var showEdit = function (socket, switchToEdit) {
    Replacing.append(socket, $_eg825h12kjd08mhhk.premade(switchToEdit));
  };
  var hideEdit = function (socket, switchToEdit) {
    Replacing.remove(socket, switchToEdit);
  };
  var updateMode = function (socket, switchToEdit, readOnly, root) {
    var swap = readOnly === true ? Swapping.toAlpha : Swapping.toOmega;
    swap(root);
    var f = readOnly ? showEdit : hideEdit;
    f(socket, switchToEdit);
  };
  var $_7q4zxr14rjd08mhvg = {
    makeEditSwitch: makeEditSwitch,
    makeSocket: makeSocket,
    updateMode: updateMode
  };

  var getAnimationRoot = function (component, slideConfig) {
    return slideConfig.getAnimationRoot().fold(function () {
      return component.element();
    }, function (get) {
      return get(component);
    });
  };
  var getDimensionProperty = function (slideConfig) {
    return slideConfig.dimension().property();
  };
  var getDimension = function (slideConfig, elem) {
    return slideConfig.dimension().getDimension()(elem);
  };
  var disableTransitions = function (component, slideConfig) {
    var root = getAnimationRoot(component, slideConfig);
    $_b2zn7l12yjd08mhl1.remove(root, [
      slideConfig.shrinkingClass(),
      slideConfig.growingClass()
    ]);
  };
  var setShrunk = function (component, slideConfig) {
    $_5tvqrbxujd08mgt5.remove(component.element(), slideConfig.openClass());
    $_5tvqrbxujd08mgt5.add(component.element(), slideConfig.closedClass());
    $_62cv66zsjd08mh10.set(component.element(), getDimensionProperty(slideConfig), '0px');
    $_62cv66zsjd08mh10.reflow(component.element());
  };
  var measureTargetSize = function (component, slideConfig) {
    setGrown(component, slideConfig);
    var expanded = getDimension(slideConfig, component.element());
    setShrunk(component, slideConfig);
    return expanded;
  };
  var setGrown = function (component, slideConfig) {
    $_5tvqrbxujd08mgt5.remove(component.element(), slideConfig.closedClass());
    $_5tvqrbxujd08mgt5.add(component.element(), slideConfig.openClass());
    $_62cv66zsjd08mh10.remove(component.element(), getDimensionProperty(slideConfig));
  };
  var doImmediateShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_62cv66zsjd08mh10.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_62cv66zsjd08mh10.reflow(component.element());
    disableTransitions(component, slideConfig);
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
    slideConfig.onShrunk()(component);
  };
  var doStartShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_62cv66zsjd08mh10.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_62cv66zsjd08mh10.reflow(component.element());
    var root = getAnimationRoot(component, slideConfig);
    $_5tvqrbxujd08mgt5.add(root, slideConfig.shrinkingClass());
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
  };
  var doStartGrow = function (component, slideConfig, slideState) {
    var fullSize = measureTargetSize(component, slideConfig);
    var root = getAnimationRoot(component, slideConfig);
    $_5tvqrbxujd08mgt5.add(root, slideConfig.growingClass());
    setGrown(component, slideConfig);
    $_62cv66zsjd08mh10.set(component.element(), getDimensionProperty(slideConfig), fullSize);
    slideState.setExpanded();
    slideConfig.onStartGrow()(component);
  };
  var grow = function (component, slideConfig, slideState) {
    if (!slideState.isExpanded())
      doStartGrow(component, slideConfig, slideState);
  };
  var shrink = function (component, slideConfig, slideState) {
    if (slideState.isExpanded())
      doStartShrink(component, slideConfig, slideState);
  };
  var immediateShrink = function (component, slideConfig, slideState) {
    if (slideState.isExpanded())
      doImmediateShrink(component, slideConfig, slideState);
  };
  var hasGrown = function (component, slideConfig, slideState) {
    return slideState.isExpanded();
  };
  var hasShrunk = function (component, slideConfig, slideState) {
    return slideState.isCollapsed();
  };
  var isGrowing = function (component, slideConfig, slideState) {
    var root = getAnimationRoot(component, slideConfig);
    return $_5tvqrbxujd08mgt5.has(root, slideConfig.growingClass()) === true;
  };
  var isShrinking = function (component, slideConfig, slideState) {
    var root = getAnimationRoot(component, slideConfig);
    return $_5tvqrbxujd08mgt5.has(root, slideConfig.shrinkingClass()) === true;
  };
  var isTransitioning = function (component, slideConfig, slideState) {
    return isGrowing(component, slideConfig, slideState) === true || isShrinking(component, slideConfig, slideState) === true;
  };
  var toggleGrow = function (component, slideConfig, slideState) {
    var f = slideState.isExpanded() ? doStartShrink : doStartGrow;
    f(component, slideConfig, slideState);
  };
  var $_89mgbw14vjd08mhw3 = {
    grow: grow,
    shrink: shrink,
    immediateShrink: immediateShrink,
    hasGrown: hasGrown,
    hasShrunk: hasShrunk,
    isGrowing: isGrowing,
    isShrinking: isShrinking,
    isTransitioning: isTransitioning,
    toggleGrow: toggleGrow,
    disableTransitions: disableTransitions
  };

  var exhibit$5 = function (base, slideConfig) {
    var expanded = slideConfig.expanded();
    return expanded ? $_bzfvkmxkjd08mgsc.nu({
      classes: [slideConfig.openClass()],
      styles: {}
    }) : $_bzfvkmxkjd08mgsc.nu({
      classes: [slideConfig.closedClass()],
      styles: $_96dvjsx6jd08mgqy.wrap(slideConfig.dimension().property(), '0px')
    });
  };
  var events$9 = function (slideConfig, slideState) {
    return $_eexaurw6jd08mgmg.derive([$_eexaurw6jd08mgmg.run($_6gw9slwxjd08mgph.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        if (raw.propertyName === slideConfig.dimension().property()) {
          $_89mgbw14vjd08mhw3.disableTransitions(component, slideConfig, slideState);
          if (slideState.isExpanded())
            $_62cv66zsjd08mh10.remove(component.element(), slideConfig.dimension().property());
          var notify = slideState.isExpanded() ? slideConfig.onGrown() : slideConfig.onShrunk();
          notify(component, simulatedEvent);
        }
      })]);
  };
  var $_2ys5jr14ujd08mhvw = {
    exhibit: exhibit$5,
    events: events$9
  };

  var SlidingSchema = [
    $_1mrawkx2jd08mgq2.strict('closedClass'),
    $_1mrawkx2jd08mgq2.strict('openClass'),
    $_1mrawkx2jd08mgq2.strict('shrinkingClass'),
    $_1mrawkx2jd08mgq2.strict('growingClass'),
    $_1mrawkx2jd08mgq2.option('getAnimationRoot'),
    $_6uz7ybytjd08mgwm.onHandler('onShrunk'),
    $_6uz7ybytjd08mgwm.onHandler('onStartShrink'),
    $_6uz7ybytjd08mgwm.onHandler('onGrown'),
    $_6uz7ybytjd08mgwm.onHandler('onStartGrow'),
    $_1mrawkx2jd08mgq2.defaulted('expanded', false),
    $_1mrawkx2jd08mgq2.strictOf('dimension', $_6eo7r6xhjd08mgrx.choose('property', {
      width: [
        $_6uz7ybytjd08mgwm.output('property', 'width'),
        $_6uz7ybytjd08mgwm.output('getDimension', function (elem) {
          return $_7qh6mb117jd08mha2.get(elem) + 'px';
        })
      ],
      height: [
        $_6uz7ybytjd08mgwm.output('property', 'height'),
        $_6uz7ybytjd08mgwm.output('getDimension', function (elem) {
          return $_oqlu3zrjd08mh0y.get(elem) + 'px';
        })
      ]
    }))
  ];

  var init$4 = function (spec) {
    var state = Cell(spec.expanded());
    var readState = function () {
      return 'expanded: ' + state.get();
    };
    return BehaviourState({
      isExpanded: function () {
        return state.get() === true;
      },
      isCollapsed: function () {
        return state.get() === false;
      },
      setCollapsed: $_8zkcijwbjd08mgn8.curry(state.set, false),
      setExpanded: $_8zkcijwbjd08mgn8.curry(state.set, true),
      readState: readState
    });
  };
  var $_8dduwp14xjd08mhwi = { init: init$4 };

  var Sliding = $_voa9kw4jd08mglm.create({
    fields: SlidingSchema,
    name: 'sliding',
    active: $_2ys5jr14ujd08mhvw,
    apis: $_89mgbw14vjd08mhw3,
    state: $_8dduwp14xjd08mhwi
  });

  var build$2 = function (refresh, scrollIntoView) {
    var dropup = $_eg825h12kjd08mhhk.build(Container.sketch({
      dom: {
        tag: 'div',
        classes: $_ete72zz1jd08mgy0.resolve('dropup')
      },
      components: [],
      containerBehaviours: $_voa9kw4jd08mglm.derive([
        Replacing.config({}),
        Sliding.config({
          closedClass: $_ete72zz1jd08mgy0.resolve('dropup-closed'),
          openClass: $_ete72zz1jd08mgy0.resolve('dropup-open'),
          shrinkingClass: $_ete72zz1jd08mgy0.resolve('dropup-shrinking'),
          growingClass: $_ete72zz1jd08mgy0.resolve('dropup-growing'),
          dimension: { property: 'height' },
          onShrunk: function (component) {
            refresh();
            scrollIntoView();
            Replacing.set(component, []);
          },
          onGrown: function (component) {
            refresh();
            scrollIntoView();
          }
        }),
        $_cnlikcz0jd08mgxw.orientation(function (component, data) {
          disappear($_8zkcijwbjd08mgn8.noop);
        })
      ])
    }));
    var appear = function (menu, update, component) {
      if (Sliding.hasShrunk(dropup) === true && Sliding.isTransitioning(dropup) === false) {
        window.requestAnimationFrame(function () {
          update(component);
          Replacing.set(dropup, [menu()]);
          Sliding.grow(dropup);
        });
      }
    };
    var disappear = function (onReadyToShrink) {
      window.requestAnimationFrame(function () {
        onReadyToShrink();
        Sliding.shrink(dropup);
      });
    };
    return {
      appear: appear,
      disappear: disappear,
      component: $_8zkcijwbjd08mgn8.constant(dropup),
      element: dropup.element
    };
  };
  var $_4fs0m214sjd08mhvo = { build: build$2 };

  var isDangerous = function (event) {
    return event.raw().which === $_6inwuyzejd08mgzg.BACKSPACE()[0] && !$_453g14w9jd08mgmy.contains([
      'input',
      'textarea'
    ], $_9323z1xxjd08mgti.name(event.target()));
  };
  var isFirefox = $_dymoxnwgjd08mgng.detect().browser.isFirefox();
  var settingsSchema = $_6eo7r6xhjd08mgrx.objOfOnly([
    $_1mrawkx2jd08mgq2.strictFunction('triggerEvent'),
    $_1mrawkx2jd08mgq2.strictFunction('broadcastEvent'),
    $_1mrawkx2jd08mgq2.defaulted('stopBackspace', true)
  ]);
  var bindFocus = function (container, handler) {
    if (isFirefox) {
      return $_buvuih13kjd08mhp2.capture(container, 'focus', handler);
    } else {
      return $_buvuih13kjd08mhp2.bind(container, 'focusin', handler);
    }
  };
  var bindBlur = function (container, handler) {
    if (isFirefox) {
      return $_buvuih13kjd08mhp2.capture(container, 'blur', handler);
    } else {
      return $_buvuih13kjd08mhp2.bind(container, 'focusout', handler);
    }
  };
  var setup$2 = function (container, rawSettings) {
    var settings = $_6eo7r6xhjd08mgrx.asRawOrDie('Getting GUI events settings', settingsSchema, rawSettings);
    var pointerEvents = $_dymoxnwgjd08mgng.detect().deviceType.isTouch() ? [
      'touchstart',
      'touchmove',
      'touchend',
      'gesturestart'
    ] : [
      'mousedown',
      'mouseup',
      'mouseover',
      'mousemove',
      'mouseout',
      'click'
    ];
    var tapEvent = $_3cd5v613rjd08mhq3.monitor(settings);
    var simpleEvents = $_453g14w9jd08mgmy.map(pointerEvents.concat([
      'selectstart',
      'input',
      'contextmenu',
      'change',
      'transitionend',
      'dragstart',
      'dragover',
      'drop'
    ]), function (type) {
      return $_buvuih13kjd08mhp2.bind(container, type, function (event) {
        tapEvent.fireIfReady(event, type).each(function (tapStopped) {
          if (tapStopped)
            event.kill();
        });
        var stopped = settings.triggerEvent(type, event);
        if (stopped)
          event.kill();
      });
    });
    var onKeydown = $_buvuih13kjd08mhp2.bind(container, 'keydown', function (event) {
      var stopped = settings.triggerEvent('keydown', event);
      if (stopped)
        event.kill();
      else if (settings.stopBackspace === true && isDangerous(event)) {
        event.prevent();
      }
    });
    var onFocusIn = bindFocus(container, function (event) {
      var stopped = settings.triggerEvent('focusin', event);
      if (stopped)
        event.kill();
    });
    var onFocusOut = bindBlur(container, function (event) {
      var stopped = settings.triggerEvent('focusout', event);
      if (stopped)
        event.kill();
      setTimeout(function () {
        settings.triggerEvent($_30aqx5wwjd08mgpa.postBlur(), event);
      }, 0);
    });
    var defaultView = $_4uhv6ey3jd08mgu3.defaultView(container);
    var onWindowScroll = $_buvuih13kjd08mhp2.bind(defaultView, 'scroll', function (event) {
      var stopped = settings.broadcastEvent($_30aqx5wwjd08mgpa.windowScroll(), event);
      if (stopped)
        event.kill();
    });
    var unbind = function () {
      $_453g14w9jd08mgmy.each(simpleEvents, function (e) {
        e.unbind();
      });
      onKeydown.unbind();
      onFocusIn.unbind();
      onFocusOut.unbind();
      onWindowScroll.unbind();
    };
    return { unbind: unbind };
  };
  var $_7c979t150jd08mhxe = { setup: setup$2 };

  var derive$3 = function (rawEvent, rawTarget) {
    var source = $_96dvjsx6jd08mgqy.readOptFrom(rawEvent, 'target').map(function (getTarget) {
      return getTarget();
    }).getOr(rawTarget);
    return Cell(source);
  };
  var $_7txn1s152jd08mhxy = { derive: derive$3 };

  var fromSource = function (event, source) {
    var stopper = Cell(false);
    var cutter = Cell(false);
    var stop = function () {
      stopper.set(true);
    };
    var cut = function () {
      cutter.set(true);
    };
    return {
      stop: stop,
      cut: cut,
      isStopped: stopper.get,
      isCut: cutter.get,
      event: $_8zkcijwbjd08mgn8.constant(event),
      setSource: source.set,
      getSource: source.get
    };
  };
  var fromExternal = function (event) {
    var stopper = Cell(false);
    var stop = function () {
      stopper.set(true);
    };
    return {
      stop: stop,
      cut: $_8zkcijwbjd08mgn8.noop,
      isStopped: stopper.get,
      isCut: $_8zkcijwbjd08mgn8.constant(false),
      event: $_8zkcijwbjd08mgn8.constant(event),
      setTarget: $_8zkcijwbjd08mgn8.die(new Error('Cannot set target of a broadcasted event')),
      getTarget: $_8zkcijwbjd08mgn8.die(new Error('Cannot get target of a broadcasted event'))
    };
  };
  var fromTarget = function (event, target) {
    var source = Cell(target);
    return fromSource(event, source);
  };
  var $_b2nrob153jd08mhy1 = {
    fromSource: fromSource,
    fromExternal: fromExternal,
    fromTarget: fromTarget
  };

  var adt$6 = $_dv5x6ax4jd08mgqe.generate([
    { stopped: [] },
    { resume: ['element'] },
    { complete: [] }
  ]);
  var doTriggerHandler = function (lookup, eventType, rawEvent, target, source, logger) {
    var handler = lookup(eventType, target);
    var simulatedEvent = $_b2nrob153jd08mhy1.fromSource(rawEvent, source);
    return handler.fold(function () {
      logger.logEventNoHandlers(eventType, target);
      return adt$6.complete();
    }, function (handlerInfo) {
      var descHandler = handlerInfo.descHandler();
      var eventHandler = $_2yncnq12vjd08mhka.getHandler(descHandler);
      eventHandler(simulatedEvent);
      if (simulatedEvent.isStopped()) {
        logger.logEventStopped(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.stopped();
      } else if (simulatedEvent.isCut()) {
        logger.logEventCut(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.complete();
      } else
        return $_4uhv6ey3jd08mgu3.parent(handlerInfo.element()).fold(function () {
          logger.logNoParent(eventType, handlerInfo.element(), descHandler.purpose());
          return adt$6.complete();
        }, function (parent) {
          logger.logEventResponse(eventType, handlerInfo.element(), descHandler.purpose());
          return adt$6.resume(parent);
        });
    });
  };
  var doTriggerOnUntilStopped = function (lookup, eventType, rawEvent, rawTarget, source, logger) {
    return doTriggerHandler(lookup, eventType, rawEvent, rawTarget, source, logger).fold(function () {
      return true;
    }, function (parent) {
      return doTriggerOnUntilStopped(lookup, eventType, rawEvent, parent, source, logger);
    }, function () {
      return false;
    });
  };
  var triggerHandler = function (lookup, eventType, rawEvent, target, logger) {
    var source = $_7txn1s152jd08mhxy.derive(rawEvent, target);
    return doTriggerHandler(lookup, eventType, rawEvent, target, source, logger);
  };
  var broadcast = function (listeners, rawEvent, logger) {
    var simulatedEvent = $_b2nrob153jd08mhy1.fromExternal(rawEvent);
    $_453g14w9jd08mgmy.each(listeners, function (listener) {
      var descHandler = listener.descHandler();
      var handler = $_2yncnq12vjd08mhka.getHandler(descHandler);
      handler(simulatedEvent);
    });
    return simulatedEvent.isStopped();
  };
  var triggerUntilStopped = function (lookup, eventType, rawEvent, logger) {
    var rawTarget = rawEvent.target();
    return triggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, logger);
  };
  var triggerOnUntilStopped = function (lookup, eventType, rawEvent, rawTarget, logger) {
    var source = $_7txn1s152jd08mhxy.derive(rawEvent, rawTarget);
    return doTriggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, source, logger);
  };
  var $_f32gdw151jd08mhxq = {
    triggerHandler: triggerHandler,
    triggerUntilStopped: triggerUntilStopped,
    triggerOnUntilStopped: triggerOnUntilStopped,
    broadcast: broadcast
  };

  var closest$4 = function (target, transform, isRoot) {
    var delegate = $_cmjc72yijd08mgvh.closest(target, function (elem) {
      return transform(elem).isSome();
    }, isRoot);
    return delegate.bind(transform);
  };
  var $_6h0i6y156jd08mhyl = { closest: closest$4 };

  var eventHandler = $_2h5zjyxmjd08mgsp.immutable('element', 'descHandler');
  var messageHandler = function (id, handler) {
    return {
      id: $_8zkcijwbjd08mgn8.constant(id),
      descHandler: $_8zkcijwbjd08mgn8.constant(handler)
    };
  };
  function EventRegistry () {
    var registry = {};
    var registerId = function (extraArgs, id, events) {
      $_1xoayfx0jd08mgpm.each(events, function (v, k) {
        var handlers = registry[k] !== undefined ? registry[k] : {};
        handlers[id] = $_2yncnq12vjd08mhka.curryArgs(v, extraArgs);
        registry[k] = handlers;
      });
    };
    var findHandler = function (handlers, elem) {
      return $_90bcgv10mjd08mh6p.read(elem).fold(function (err) {
        return $_4izgwbwajd08mgn6.none();
      }, function (id) {
        var reader = $_96dvjsx6jd08mgqy.readOpt(id);
        return handlers.bind(reader).map(function (descHandler) {
          return eventHandler(elem, descHandler);
        });
      });
    };
    var filterByType = function (type) {
      return $_96dvjsx6jd08mgqy.readOptFrom(registry, type).map(function (handlers) {
        return $_1xoayfx0jd08mgpm.mapToArray(handlers, function (f, id) {
          return messageHandler(id, f);
        });
      }).getOr([]);
    };
    var find = function (isAboveRoot, type, target) {
      var readType = $_96dvjsx6jd08mgqy.readOpt(type);
      var handlers = readType(registry);
      return $_6h0i6y156jd08mhyl.closest(target, function (elem) {
        return findHandler(handlers, elem);
      }, isAboveRoot);
    };
    var unregisterId = function (id) {
      $_1xoayfx0jd08mgpm.each(registry, function (handlersById, eventName) {
        if (handlersById.hasOwnProperty(id))
          delete handlersById[id];
      });
    };
    return {
      registerId: registerId,
      unregisterId: unregisterId,
      filterByType: filterByType,
      find: find
    };
  }

  function Registry () {
    var events = EventRegistry();
    var components = {};
    var readOrTag = function (component) {
      var elem = component.element();
      return $_90bcgv10mjd08mh6p.read(elem).fold(function () {
        return $_90bcgv10mjd08mh6p.write('uid-', component.element());
      }, function (uid) {
        return uid;
      });
    };
    var failOnDuplicate = function (component, tagId) {
      var conflict = components[tagId];
      if (conflict === component)
        unregister(component);
      else
        throw new Error('The tagId "' + tagId + '" is already used by: ' + $_c4961ry9jd08mguz.element(conflict.element()) + '\nCannot use it for: ' + $_c4961ry9jd08mguz.element(component.element()) + '\n' + 'The conflicting element is' + ($_9fqzedy7jd08mgun.inBody(conflict.element()) ? ' ' : ' not ') + 'already in the DOM');
    };
    var register = function (component) {
      var tagId = readOrTag(component);
      if ($_96dvjsx6jd08mgqy.hasKey(components, tagId))
        failOnDuplicate(component, tagId);
      var extraArgs = [component];
      events.registerId(extraArgs, tagId, component.events());
      components[tagId] = component;
    };
    var unregister = function (component) {
      $_90bcgv10mjd08mh6p.read(component.element()).each(function (tagId) {
        components[tagId] = undefined;
        events.unregisterId(tagId);
      });
    };
    var filter = function (type) {
      return events.filterByType(type);
    };
    var find = function (isAboveRoot, type, target) {
      return events.find(isAboveRoot, type, target);
    };
    var getById = function (id) {
      return $_96dvjsx6jd08mgqy.readOpt(id)(components);
    };
    return {
      find: find,
      filter: filter,
      register: register,
      unregister: unregister,
      getById: getById
    };
  }

  var create$6 = function () {
    var root = $_eg825h12kjd08mhhk.build(Container.sketch({ dom: { tag: 'div' } }));
    return takeover(root);
  };
  var takeover = function (root) {
    var isAboveRoot = function (el) {
      return $_4uhv6ey3jd08mgu3.parent(root.element()).fold(function () {
        return true;
      }, function (parent) {
        return $_ctdo1gw8jd08mgmp.eq(el, parent);
      });
    };
    var registry = Registry();
    var lookup = function (eventName, target) {
      return registry.find(isAboveRoot, eventName, target);
    };
    var domEvents = $_7c979t150jd08mhxe.setup(root.element(), {
      triggerEvent: function (eventName, event) {
        return $_1x8vhay8jd08mguq.monitorEvent(eventName, event.target(), function (logger) {
          return $_f32gdw151jd08mhxq.triggerUntilStopped(lookup, eventName, event, logger);
        });
      },
      broadcastEvent: function (eventName, event) {
        var listeners = registry.filter(eventName);
        return $_f32gdw151jd08mhxq.broadcast(listeners, event);
      }
    });
    var systemApi = SystemApi({
      debugInfo: $_8zkcijwbjd08mgn8.constant('real'),
      triggerEvent: function (customType, target, data) {
        $_1x8vhay8jd08mguq.monitorEvent(customType, target, function (logger) {
          $_f32gdw151jd08mhxq.triggerOnUntilStopped(lookup, customType, data, target, logger);
        });
      },
      triggerFocus: function (target, originator) {
        $_90bcgv10mjd08mh6p.read(target).fold(function () {
          $_6h5kwkygjd08mgvc.focus(target);
        }, function (_alloyId) {
          $_1x8vhay8jd08mguq.monitorEvent($_30aqx5wwjd08mgpa.focus(), target, function (logger) {
            $_f32gdw151jd08mhxq.triggerHandler(lookup, $_30aqx5wwjd08mgpa.focus(), {
              originator: $_8zkcijwbjd08mgn8.constant(originator),
              target: $_8zkcijwbjd08mgn8.constant(target)
            }, target, logger);
          });
        });
      },
      triggerEscape: function (comp, simulatedEvent) {
        systemApi.triggerEvent('keydown', comp.element(), simulatedEvent.event());
      },
      getByUid: function (uid) {
        return getByUid(uid);
      },
      getByDom: function (elem) {
        return getByDom(elem);
      },
      build: $_eg825h12kjd08mhhk.build,
      addToGui: function (c) {
        add(c);
      },
      removeFromGui: function (c) {
        remove(c);
      },
      addToWorld: function (c) {
        addToWorld(c);
      },
      removeFromWorld: function (c) {
        removeFromWorld(c);
      },
      broadcast: function (message) {
        broadcast(message);
      },
      broadcastOn: function (channels, message) {
        broadcastOn(channels, message);
      }
    });
    var addToWorld = function (component) {
      component.connect(systemApi);
      if (!$_9323z1xxjd08mgti.isText(component.element())) {
        registry.register(component);
        $_453g14w9jd08mgmy.each(component.components(), addToWorld);
        systemApi.triggerEvent($_30aqx5wwjd08mgpa.systemInit(), component.element(), { target: $_8zkcijwbjd08mgn8.constant(component.element()) });
      }
    };
    var removeFromWorld = function (component) {
      if (!$_9323z1xxjd08mgti.isText(component.element())) {
        $_453g14w9jd08mgmy.each(component.components(), removeFromWorld);
        registry.unregister(component);
      }
      component.disconnect();
    };
    var add = function (component) {
      $_9ab6qsy1jd08mgtr.attach(root, component);
    };
    var remove = function (component) {
      $_9ab6qsy1jd08mgtr.detach(component);
    };
    var destroy = function () {
      domEvents.unbind();
      $_7x8x1ny5jd08mguh.remove(root.element());
    };
    var broadcastData = function (data) {
      var receivers = registry.filter($_30aqx5wwjd08mgpa.receive());
      $_453g14w9jd08mgmy.each(receivers, function (receiver) {
        var descHandler = receiver.descHandler();
        var handler = $_2yncnq12vjd08mhka.getHandler(descHandler);
        handler(data);
      });
    };
    var broadcast = function (message) {
      broadcastData({
        universal: $_8zkcijwbjd08mgn8.constant(true),
        data: $_8zkcijwbjd08mgn8.constant(message)
      });
    };
    var broadcastOn = function (channels, message) {
      broadcastData({
        universal: $_8zkcijwbjd08mgn8.constant(false),
        channels: $_8zkcijwbjd08mgn8.constant(channels),
        data: $_8zkcijwbjd08mgn8.constant(message)
      });
    };
    var getByUid = function (uid) {
      return registry.getById(uid).fold(function () {
        return $_2y9mlbx8jd08mgr7.error(new Error('Could not find component with uid: "' + uid + '" in system.'));
      }, $_2y9mlbx8jd08mgr7.value);
    };
    var getByDom = function (elem) {
      return $_90bcgv10mjd08mh6p.read(elem).bind(getByUid);
    };
    addToWorld(root);
    return {
      root: $_8zkcijwbjd08mgn8.constant(root),
      element: root.element,
      destroy: destroy,
      add: add,
      remove: remove,
      getByUid: getByUid,
      getByDom: getByDom,
      addToWorld: addToWorld,
      removeFromWorld: removeFromWorld,
      broadcast: broadcast,
      broadcastOn: broadcastOn
    };
  };
  var $_ghmrg514zjd08mhwx = {
    create: create$6,
    takeover: takeover
  };

  var READ_ONLY_MODE_CLASS = $_8zkcijwbjd08mgn8.constant($_ete72zz1jd08mgy0.resolve('readonly-mode'));
  var EDIT_MODE_CLASS = $_8zkcijwbjd08mgn8.constant($_ete72zz1jd08mgy0.resolve('edit-mode'));
  function OuterContainer (spec) {
    var root = $_eg825h12kjd08mhhk.build(Container.sketch({
      dom: { classes: [$_ete72zz1jd08mgy0.resolve('outer-container')].concat(spec.classes) },
      containerBehaviours: $_voa9kw4jd08mglm.derive([Swapping.config({
          alpha: READ_ONLY_MODE_CLASS(),
          omega: EDIT_MODE_CLASS()
        })])
    }));
    return $_ghmrg514zjd08mhwx.takeover(root);
  }

  function AndroidRealm (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_ete72zz1jd08mgy0.resolve('android-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_daqe5q12ajd08mhfm.api();
    var switchToEdit = $_7q4zxr14rjd08mhvg.makeEditSwitch(webapp);
    var socket = $_7q4zxr14rjd08mhvg.makeSocket();
    var dropup = $_4fs0m214sjd08mhvo.build($_8zkcijwbjd08mgn8.noop, scrollIntoView);
    alloy.add(toolbar.wrapper());
    alloy.add(socket);
    alloy.add(dropup.component());
    var setToolbarGroups = function (rawGroups) {
      var groups = toolbar.createGroups(rawGroups);
      toolbar.setGroups(groups);
    };
    var setContextToolbar = function (rawGroups) {
      var groups = toolbar.createGroups(rawGroups);
      toolbar.setContextToolbar(groups);
    };
    var focusToolbar = function () {
      toolbar.focus();
    };
    var restoreToolbar = function () {
      toolbar.restoreToolbar();
    };
    var init = function (spec) {
      webapp.set($_azdpjy13njd08mhpb.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        w.exit();
        Replacing.remove(socket, switchToEdit);
      });
    };
    var updateMode = function (readOnly) {
      $_7q4zxr14rjd08mhvg.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_8zkcijwbjd08mgn8.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_8zkcijwbjd08mgn8.constant(socket),
      dropup: $_8zkcijwbjd08mgn8.constant(dropup)
    };
  }

  var initEvents$1 = function (editorApi, iosApi, toolstrip, socket, dropup) {
    var saveSelectionFirst = function () {
      iosApi.run(function (api) {
        api.highlightSelection();
      });
    };
    var refreshIosSelection = function () {
      iosApi.run(function (api) {
        api.refreshSelection();
      });
    };
    var scrollToY = function (yTop, height) {
      var y = yTop - socket.dom().scrollTop;
      iosApi.run(function (api) {
        api.scrollIntoView(y, y + height);
      });
    };
    var scrollToElement = function (target) {
      scrollToY(iosApi, socket);
    };
    var scrollToCursor = function () {
      editorApi.getCursorBox().each(function (box) {
        scrollToY(box.top(), box.height());
      });
    };
    var clearSelection = function () {
      iosApi.run(function (api) {
        api.clearSelection();
      });
    };
    var clearAndRefresh = function () {
      clearSelection();
      refreshThrottle.throttle();
    };
    var refreshView = function () {
      scrollToCursor();
      iosApi.run(function (api) {
        api.syncHeight();
      });
    };
    var reposition = function () {
      var toolbarHeight = $_oqlu3zrjd08mh0y.get(toolstrip);
      iosApi.run(function (api) {
        api.setViewportOffset(toolbarHeight);
      });
      refreshIosSelection();
      refreshView();
    };
    var toEditing = function () {
      iosApi.run(function (api) {
        api.toEditing();
      });
    };
    var toReading = function () {
      iosApi.run(function (api) {
        api.toReading();
      });
    };
    var onToolbarTouch = function (event) {
      iosApi.run(function (api) {
        api.onToolbarTouch(event);
      });
    };
    var tapping = $_1wvbix13qjd08mhq0.monitor(editorApi);
    var refreshThrottle = $_alzm5u14kjd08mhu4.last(refreshView, 300);
    var listeners = [
      editorApi.onKeyup(clearAndRefresh),
      editorApi.onNodeChanged(refreshIosSelection),
      editorApi.onDomChanged(refreshThrottle.throttle),
      editorApi.onDomChanged(refreshIosSelection),
      editorApi.onScrollToCursor(function (tinyEvent) {
        tinyEvent.preventDefault();
        refreshThrottle.throttle();
      }),
      editorApi.onScrollToElement(function (event) {
        scrollToElement(event.element());
      }),
      editorApi.onToEditing(toEditing),
      editorApi.onToReading(toReading),
      $_buvuih13kjd08mhp2.bind(editorApi.doc(), 'touchend', function (touchEvent) {
        if ($_ctdo1gw8jd08mgmp.eq(editorApi.html(), touchEvent.target()) || $_ctdo1gw8jd08mgmp.eq(editorApi.body(), touchEvent.target())) {
        }
      }),
      $_buvuih13kjd08mhp2.bind(toolstrip, 'transitionend', function (transitionEvent) {
        if (transitionEvent.raw().propertyName === 'height') {
          reposition();
        }
      }),
      $_buvuih13kjd08mhp2.capture(toolstrip, 'touchstart', function (touchEvent) {
        saveSelectionFirst();
        onToolbarTouch(touchEvent);
        editorApi.onTouchToolstrip();
      }),
      $_buvuih13kjd08mhp2.bind(editorApi.body(), 'touchstart', function (evt) {
        clearSelection();
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_buvuih13kjd08mhp2.bind(editorApi.body(), 'click', function (event) {
        event.kill();
      }),
      $_buvuih13kjd08mhp2.bind(toolstrip, 'touchmove', function () {
        editorApi.onToolbarScrollStart();
      })
    ];
    var destroy = function () {
      $_453g14w9jd08mgmy.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_bgq7c15ajd08mhzg = { initEvents: initEvents$1 };

  var refreshInput = function (input) {
    var start = input.dom().selectionStart;
    var end = input.dom().selectionEnd;
    var dir = input.dom().selectionDirection;
    setTimeout(function () {
      input.dom().setSelectionRange(start, end, dir);
      $_6h5kwkygjd08mgvc.focus(input);
    }, 50);
  };
  var refresh = function (winScope) {
    var sel = winScope.getSelection();
    if (sel.rangeCount > 0) {
      var br = sel.getRangeAt(0);
      var r = winScope.document.createRange();
      r.setStart(br.startContainer, br.startOffset);
      r.setEnd(br.endContainer, br.endOffset);
      sel.removeAllRanges();
      sel.addRange(r);
    }
  };
  var $_2j6vhe15ejd08mi0n = {
    refreshInput: refreshInput,
    refresh: refresh
  };

  var resume$1 = function (cWin, frame) {
    $_6h5kwkygjd08mgvc.active().each(function (active) {
      if (!$_ctdo1gw8jd08mgmp.eq(active, frame)) {
        $_6h5kwkygjd08mgvc.blur(active);
      }
    });
    cWin.focus();
    $_6h5kwkygjd08mgvc.focus($_3visdkwtjd08mgor.fromDom(cWin.document.body));
    $_2j6vhe15ejd08mi0n.refresh(cWin);
  };
  var $_c00ass15djd08mi0g = { resume: resume$1 };

  function FakeSelection (win, frame) {
    var doc = win.document;
    var container = $_3visdkwtjd08mgor.fromTag('div');
    $_5tvqrbxujd08mgt5.add(container, $_ete72zz1jd08mgy0.resolve('unfocused-selections'));
    $_u7ngdy2jd08mgu1.append($_3visdkwtjd08mgor.fromDom(doc.documentElement), container);
    var onTouch = $_buvuih13kjd08mhp2.bind(container, 'touchstart', function (event) {
      event.prevent();
      $_c00ass15djd08mi0g.resume(win, frame);
      clear();
    });
    var make = function (rectangle) {
      var span = $_3visdkwtjd08mgor.fromTag('span');
      $_b2zn7l12yjd08mhl1.add(span, [
        $_ete72zz1jd08mgy0.resolve('layer-editor'),
        $_ete72zz1jd08mgy0.resolve('unfocused-selection')
      ]);
      $_62cv66zsjd08mh10.setAll(span, {
        left: rectangle.left() + 'px',
        top: rectangle.top() + 'px',
        width: rectangle.width() + 'px',
        height: rectangle.height() + 'px'
      });
      return span;
    };
    var update = function () {
      clear();
      var rectangles = $_9bqhqd13wjd08mhqw.getRectangles(win);
      var spans = $_453g14w9jd08mgmy.map(rectangles, make);
      $_47o1kzy6jd08mguk.append(container, spans);
    };
    var clear = function () {
      $_7x8x1ny5jd08mguh.empty(container);
    };
    var destroy = function () {
      onTouch.unbind();
      $_7x8x1ny5jd08mguh.remove(container);
    };
    var isActive = function () {
      return $_4uhv6ey3jd08mgu3.children(container).length > 0;
    };
    return {
      update: update,
      isActive: isActive,
      destroy: destroy,
      clear: clear
    };
  }

  var nu$8 = function (baseFn) {
    var data = $_4izgwbwajd08mgn6.none();
    var callbacks = [];
    var map = function (f) {
      return nu$8(function (nCallback) {
        get(function (data) {
          nCallback(f(data));
        });
      });
    };
    var get = function (nCallback) {
      if (isReady())
        call(nCallback);
      else
        callbacks.push(nCallback);
    };
    var set = function (x) {
      data = $_4izgwbwajd08mgn6.some(x);
      run(callbacks);
      callbacks = [];
    };
    var isReady = function () {
      return data.isSome();
    };
    var run = function (cbs) {
      $_453g14w9jd08mgmy.each(cbs, call);
    };
    var call = function (cb) {
      data.each(function (x) {
        setTimeout(function () {
          cb(x);
        }, 0);
      });
    };
    baseFn(set);
    return {
      get: get,
      map: map,
      isReady: isReady
    };
  };
  var pure$1 = function (a) {
    return nu$8(function (callback) {
      callback(a);
    });
  };
  var $_acg7u415hjd08mi0y = {
    nu: nu$8,
    pure: pure$1
  };

  var bounce = function (f) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      var me = this;
      setTimeout(function () {
        f.apply(me, args);
      }, 0);
    };
  };
  var $_94lkvb15ijd08mi10 = { bounce: bounce };

  var nu$9 = function (baseFn) {
    var get = function (callback) {
      baseFn($_94lkvb15ijd08mi10.bounce(callback));
    };
    var map = function (fab) {
      return nu$9(function (callback) {
        get(function (a) {
          var value = fab(a);
          callback(value);
        });
      });
    };
    var bind = function (aFutureB) {
      return nu$9(function (callback) {
        get(function (a) {
          aFutureB(a).get(callback);
        });
      });
    };
    var anonBind = function (futureB) {
      return nu$9(function (callback) {
        get(function (a) {
          futureB.get(callback);
        });
      });
    };
    var toLazy = function () {
      return $_acg7u415hjd08mi0y.nu(get);
    };
    return {
      map: map,
      bind: bind,
      anonBind: anonBind,
      toLazy: toLazy,
      get: get
    };
  };
  var pure$2 = function (a) {
    return nu$9(function (callback) {
      callback(a);
    });
  };
  var $_c93vky15gjd08mi0x = {
    nu: nu$9,
    pure: pure$2
  };

  var adjust = function (value, destination, amount) {
    if (Math.abs(value - destination) <= amount) {
      return $_4izgwbwajd08mgn6.none();
    } else if (value < destination) {
      return $_4izgwbwajd08mgn6.some(value + amount);
    } else {
      return $_4izgwbwajd08mgn6.some(value - amount);
    }
  };
  var create$7 = function () {
    var interval = null;
    var animate = function (getCurrent, destination, amount, increment, doFinish, rate) {
      var finished = false;
      var finish = function (v) {
        finished = true;
        doFinish(v);
      };
      clearInterval(interval);
      var abort = function (v) {
        clearInterval(interval);
        finish(v);
      };
      interval = setInterval(function () {
        var value = getCurrent();
        adjust(value, destination, amount).fold(function () {
          clearInterval(interval);
          finish(destination);
        }, function (s) {
          increment(s, abort);
          if (!finished) {
            var newValue = getCurrent();
            if (newValue !== s || Math.abs(newValue - destination) > Math.abs(value - destination)) {
              clearInterval(interval);
              finish(destination);
            }
          }
        });
      }, rate);
    };
    return { animate: animate };
  };
  var $_cb2qps15jjd08mi15 = {
    create: create$7,
    adjust: adjust
  };

  var findDevice = function (deviceWidth, deviceHeight) {
    var devices = [
      {
        width: 320,
        height: 480,
        keyboard: {
          portrait: 300,
          landscape: 240
        }
      },
      {
        width: 320,
        height: 568,
        keyboard: {
          portrait: 300,
          landscape: 240
        }
      },
      {
        width: 375,
        height: 667,
        keyboard: {
          portrait: 305,
          landscape: 240
        }
      },
      {
        width: 414,
        height: 736,
        keyboard: {
          portrait: 320,
          landscape: 240
        }
      },
      {
        width: 768,
        height: 1024,
        keyboard: {
          portrait: 320,
          landscape: 400
        }
      },
      {
        width: 1024,
        height: 1366,
        keyboard: {
          portrait: 380,
          landscape: 460
        }
      }
    ];
    return $_cqt7vbyejd08mgva.findMap(devices, function (device) {
      return deviceWidth <= device.width && deviceHeight <= device.height ? $_4izgwbwajd08mgn6.some(device.keyboard) : $_4izgwbwajd08mgn6.none();
    }).getOr({
      portrait: deviceHeight / 5,
      landscape: deviceWidth / 4
    });
  };
  var $_4pg4rh15mjd08mi1u = { findDevice: findDevice };

  var softKeyboardLimits = function (outerWindow) {
    return $_4pg4rh15mjd08mi1u.findDevice(outerWindow.screen.width, outerWindow.screen.height);
  };
  var accountableKeyboardHeight = function (outerWindow) {
    var portrait = $_a2auem13jjd08mhot.get(outerWindow).isPortrait();
    var limits = softKeyboardLimits(outerWindow);
    var keyboard = portrait ? limits.portrait : limits.landscape;
    var visualScreenHeight = portrait ? outerWindow.screen.height : outerWindow.screen.width;
    return visualScreenHeight - outerWindow.innerHeight > keyboard ? 0 : keyboard;
  };
  var getGreenzone = function (socket, dropup) {
    var outerWindow = $_4uhv6ey3jd08mgu3.owner(socket).dom().defaultView;
    var viewportHeight = $_oqlu3zrjd08mh0y.get(socket) + $_oqlu3zrjd08mh0y.get(dropup);
    var acc = accountableKeyboardHeight(outerWindow);
    return viewportHeight - acc;
  };
  var updatePadding = function (contentBody, socket, dropup) {
    var greenzoneHeight = getGreenzone(socket, dropup);
    var deltaHeight = $_oqlu3zrjd08mh0y.get(socket) + $_oqlu3zrjd08mh0y.get(dropup) - greenzoneHeight;
    $_62cv66zsjd08mh10.set(contentBody, 'padding-bottom', deltaHeight + 'px');
  };
  var $_8b5k9d15ljd08mi1o = {
    getGreenzone: getGreenzone,
    updatePadding: updatePadding
  };

  var fixture = $_dv5x6ax4jd08mgqe.generate([
    {
      fixed: [
        'element',
        'property',
        'offsetY'
      ]
    },
    {
      scroller: [
        'element',
        'offsetY'
      ]
    }
  ]);
  var yFixedData = 'data-' + $_ete72zz1jd08mgy0.resolve('position-y-fixed');
  var yFixedProperty = 'data-' + $_ete72zz1jd08mgy0.resolve('y-property');
  var yScrollingData = 'data-' + $_ete72zz1jd08mgy0.resolve('scrolling');
  var windowSizeData = 'data-' + $_ete72zz1jd08mgy0.resolve('last-window-height');
  var getYFixedData = function (element) {
    return $_7nibom13vjd08mhqu.safeParse(element, yFixedData);
  };
  var getYFixedProperty = function (element) {
    return $_auw0hixwjd08mgt8.get(element, yFixedProperty);
  };
  var getLastWindowSize = function (element) {
    return $_7nibom13vjd08mhqu.safeParse(element, windowSizeData);
  };
  var classifyFixed = function (element, offsetY) {
    var prop = getYFixedProperty(element);
    return fixture.fixed(element, prop, offsetY);
  };
  var classifyScrolling = function (element, offsetY) {
    return fixture.scroller(element, offsetY);
  };
  var classify = function (element) {
    var offsetY = getYFixedData(element);
    var classifier = $_auw0hixwjd08mgt8.get(element, yScrollingData) === 'true' ? classifyScrolling : classifyFixed;
    return classifier(element, offsetY);
  };
  var findFixtures = function (container) {
    var candidates = $_48w1m3zkjd08mh0b.descendants(container, '[' + yFixedData + ']');
    return $_453g14w9jd08mgmy.map(candidates, classify);
  };
  var takeoverToolbar = function (toolbar) {
    var oldToolbarStyle = $_auw0hixwjd08mgt8.get(toolbar, 'style');
    $_62cv66zsjd08mh10.setAll(toolbar, {
      position: 'absolute',
      top: '0px'
    });
    $_auw0hixwjd08mgt8.set(toolbar, yFixedData, '0px');
    $_auw0hixwjd08mgt8.set(toolbar, yFixedProperty, 'top');
    var restore = function () {
      $_auw0hixwjd08mgt8.set(toolbar, 'style', oldToolbarStyle || '');
      $_auw0hixwjd08mgt8.remove(toolbar, yFixedData);
      $_auw0hixwjd08mgt8.remove(toolbar, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverViewport = function (toolbarHeight, height, viewport) {
    var oldViewportStyle = $_auw0hixwjd08mgt8.get(viewport, 'style');
    $_2bo91013hjd08mhol.register(viewport);
    $_62cv66zsjd08mh10.setAll(viewport, {
      position: 'absolute',
      height: height + 'px',
      width: '100%',
      top: toolbarHeight + 'px'
    });
    $_auw0hixwjd08mgt8.set(viewport, yFixedData, toolbarHeight + 'px');
    $_auw0hixwjd08mgt8.set(viewport, yScrollingData, 'true');
    $_auw0hixwjd08mgt8.set(viewport, yFixedProperty, 'top');
    var restore = function () {
      $_2bo91013hjd08mhol.deregister(viewport);
      $_auw0hixwjd08mgt8.set(viewport, 'style', oldViewportStyle || '');
      $_auw0hixwjd08mgt8.remove(viewport, yFixedData);
      $_auw0hixwjd08mgt8.remove(viewport, yScrollingData);
      $_auw0hixwjd08mgt8.remove(viewport, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverDropup = function (dropup, toolbarHeight, viewportHeight) {
    var oldDropupStyle = $_auw0hixwjd08mgt8.get(dropup, 'style');
    $_62cv66zsjd08mh10.setAll(dropup, {
      position: 'absolute',
      bottom: '0px'
    });
    $_auw0hixwjd08mgt8.set(dropup, yFixedData, '0px');
    $_auw0hixwjd08mgt8.set(dropup, yFixedProperty, 'bottom');
    var restore = function () {
      $_auw0hixwjd08mgt8.set(dropup, 'style', oldDropupStyle || '');
      $_auw0hixwjd08mgt8.remove(dropup, yFixedData);
      $_auw0hixwjd08mgt8.remove(dropup, yFixedProperty);
    };
    return { restore: restore };
  };
  var deriveViewportHeight = function (viewport, toolbarHeight, dropupHeight) {
    var outerWindow = $_4uhv6ey3jd08mgu3.owner(viewport).dom().defaultView;
    var winH = outerWindow.innerHeight;
    $_auw0hixwjd08mgt8.set(viewport, windowSizeData, winH + 'px');
    return winH - toolbarHeight - dropupHeight;
  };
  var takeover$1 = function (viewport, contentBody, toolbar, dropup) {
    var outerWindow = $_4uhv6ey3jd08mgu3.owner(viewport).dom().defaultView;
    var toolbarSetup = takeoverToolbar(toolbar);
    var toolbarHeight = $_oqlu3zrjd08mh0y.get(toolbar);
    var dropupHeight = $_oqlu3zrjd08mh0y.get(dropup);
    var viewportHeight = deriveViewportHeight(viewport, toolbarHeight, dropupHeight);
    var viewportSetup = takeoverViewport(toolbarHeight, viewportHeight, viewport);
    var dropupSetup = takeoverDropup(dropup, toolbarHeight, viewportHeight);
    var isActive = true;
    var restore = function () {
      isActive = false;
      toolbarSetup.restore();
      viewportSetup.restore();
      dropupSetup.restore();
    };
    var isExpanding = function () {
      var currentWinHeight = outerWindow.innerHeight;
      var lastWinHeight = getLastWindowSize(viewport);
      return currentWinHeight > lastWinHeight;
    };
    var refresh = function () {
      if (isActive) {
        var newToolbarHeight = $_oqlu3zrjd08mh0y.get(toolbar);
        var dropupHeight_1 = $_oqlu3zrjd08mh0y.get(dropup);
        var newHeight = deriveViewportHeight(viewport, newToolbarHeight, dropupHeight_1);
        $_auw0hixwjd08mgt8.set(viewport, yFixedData, newToolbarHeight + 'px');
        $_62cv66zsjd08mh10.set(viewport, 'height', newHeight + 'px');
        $_62cv66zsjd08mh10.set(dropup, 'bottom', -(newToolbarHeight + newHeight + dropupHeight_1) + 'px');
        $_8b5k9d15ljd08mi1o.updatePadding(contentBody, viewport, dropup);
      }
    };
    var setViewportOffset = function (newYOffset) {
      var offsetPx = newYOffset + 'px';
      $_auw0hixwjd08mgt8.set(viewport, yFixedData, offsetPx);
      refresh();
    };
    $_8b5k9d15ljd08mi1o.updatePadding(contentBody, viewport, dropup);
    return {
      setViewportOffset: setViewportOffset,
      isExpanding: isExpanding,
      isShrinking: $_8zkcijwbjd08mgn8.not(isExpanding),
      refresh: refresh,
      restore: restore
    };
  };
  var $_2xikf015kjd08mi18 = {
    findFixtures: findFixtures,
    takeover: takeover$1,
    getYFixedData: getYFixedData
  };

  var animator = $_cb2qps15jjd08mi15.create();
  var ANIMATION_STEP = 15;
  var NUM_TOP_ANIMATION_FRAMES = 10;
  var ANIMATION_RATE = 10;
  var lastScroll = 'data-' + $_ete72zz1jd08mgy0.resolve('last-scroll-top');
  var getTop = function (element) {
    var raw = $_62cv66zsjd08mh10.getRaw(element, 'top').getOr(0);
    return parseInt(raw, 10);
  };
  var getScrollTop = function (element) {
    return parseInt(element.dom().scrollTop, 10);
  };
  var moveScrollAndTop = function (element, destination, finalTop) {
    return $_c93vky15gjd08mi0x.nu(function (callback) {
      var getCurrent = $_8zkcijwbjd08mgn8.curry(getScrollTop, element);
      var update = function (newScroll) {
        element.dom().scrollTop = newScroll;
        $_62cv66zsjd08mh10.set(element, 'top', getTop(element) + ANIMATION_STEP + 'px');
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_62cv66zsjd08mh10.set(element, 'top', finalTop + 'px');
        callback(destination);
      };
      animator.animate(getCurrent, destination, ANIMATION_STEP, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyScroll = function (element, destination) {
    return $_c93vky15gjd08mi0x.nu(function (callback) {
      var getCurrent = $_8zkcijwbjd08mgn8.curry(getScrollTop, element);
      $_auw0hixwjd08mgt8.set(element, lastScroll, getCurrent());
      var update = function (newScroll, abort) {
        var previous = $_7nibom13vjd08mhqu.safeParse(element, lastScroll);
        if (previous !== element.dom().scrollTop) {
          abort(element.dom().scrollTop);
        } else {
          element.dom().scrollTop = newScroll;
          $_auw0hixwjd08mgt8.set(element, lastScroll, newScroll);
        }
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_auw0hixwjd08mgt8.set(element, lastScroll, destination);
        callback(destination);
      };
      var distance = Math.abs(destination - getCurrent());
      var step = Math.ceil(distance / NUM_TOP_ANIMATION_FRAMES);
      animator.animate(getCurrent, destination, step, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyTop = function (element, destination) {
    return $_c93vky15gjd08mi0x.nu(function (callback) {
      var getCurrent = $_8zkcijwbjd08mgn8.curry(getTop, element);
      var update = function (newTop) {
        $_62cv66zsjd08mh10.set(element, 'top', newTop + 'px');
      };
      var finish = function () {
        update(destination);
        callback(destination);
      };
      var distance = Math.abs(destination - getCurrent());
      var step = Math.ceil(distance / NUM_TOP_ANIMATION_FRAMES);
      animator.animate(getCurrent, destination, step, update, finish, ANIMATION_RATE);
    });
  };
  var updateTop = function (element, amount) {
    var newTop = amount + $_2xikf015kjd08mi18.getYFixedData(element) + 'px';
    $_62cv66zsjd08mh10.set(element, 'top', newTop);
  };
  var moveWindowScroll = function (toolbar, viewport, destY) {
    var outerWindow = $_4uhv6ey3jd08mgu3.owner(toolbar).dom().defaultView;
    return $_c93vky15gjd08mi0x.nu(function (callback) {
      updateTop(toolbar, destY);
      updateTop(viewport, destY);
      outerWindow.scrollTo(0, destY);
      callback(destY);
    });
  };
  var $_3fdqi015fjd08mi0q = {
    moveScrollAndTop: moveScrollAndTop,
    moveOnlyScroll: moveOnlyScroll,
    moveOnlyTop: moveOnlyTop,
    moveWindowScroll: moveWindowScroll
  };

  function BackgroundActivity (doAction) {
    var action = Cell($_acg7u415hjd08mi0y.pure({}));
    var start = function (value) {
      var future = $_acg7u415hjd08mi0y.nu(function (callback) {
        return doAction(value).get(callback);
      });
      action.set(future);
    };
    var idle = function (g) {
      action.get().get(function () {
        g();
      });
    };
    return {
      start: start,
      idle: idle
    };
  }

  var scrollIntoView = function (cWin, socket, dropup, top, bottom) {
    var greenzone = $_8b5k9d15ljd08mi1o.getGreenzone(socket, dropup);
    var refreshCursor = $_8zkcijwbjd08mgn8.curry($_2j6vhe15ejd08mi0n.refresh, cWin);
    if (top > greenzone || bottom > greenzone) {
      $_3fdqi015fjd08mi0q.moveOnlyScroll(socket, socket.dom().scrollTop - greenzone + bottom).get(refreshCursor);
    } else if (top < 0) {
      $_3fdqi015fjd08mi0q.moveOnlyScroll(socket, socket.dom().scrollTop + top).get(refreshCursor);
    } else {
    }
  };
  var $_6op11k15ojd08mi24 = { scrollIntoView: scrollIntoView };

  var par = function (asyncValues, nu) {
    return nu(function (callback) {
      var r = [];
      var count = 0;
      var cb = function (i) {
        return function (value) {
          r[i] = value;
          count++;
          if (count >= asyncValues.length) {
            callback(r);
          }
        };
      };
      if (asyncValues.length === 0) {
        callback([]);
      } else {
        $_453g14w9jd08mgmy.each(asyncValues, function (asyncValue, i) {
          asyncValue.get(cb(i));
        });
      }
    });
  };
  var $_9hen2m15rjd08mi2d = { par: par };

  var par$1 = function (futures) {
    return $_9hen2m15rjd08mi2d.par(futures, $_c93vky15gjd08mi0x.nu);
  };
  var mapM = function (array, fn) {
    var futures = $_453g14w9jd08mgmy.map(array, fn);
    return par$1(futures);
  };
  var compose$1 = function (f, g) {
    return function (a) {
      return g(a).bind(f);
    };
  };
  var $_boo1h15qjd08mi2c = {
    par: par$1,
    mapM: mapM,
    compose: compose$1
  };

  var updateFixed = function (element, property, winY, offsetY) {
    var destination = winY + offsetY;
    $_62cv66zsjd08mh10.set(element, property, destination + 'px');
    return $_c93vky15gjd08mi0x.pure(offsetY);
  };
  var updateScrollingFixed = function (element, winY, offsetY) {
    var destTop = winY + offsetY;
    var oldProp = $_62cv66zsjd08mh10.getRaw(element, 'top').getOr(offsetY);
    var delta = destTop - parseInt(oldProp, 10);
    var destScroll = element.dom().scrollTop + delta;
    return $_3fdqi015fjd08mi0q.moveScrollAndTop(element, destScroll, destTop);
  };
  var updateFixture = function (fixture, winY) {
    return fixture.fold(function (element, property, offsetY) {
      return updateFixed(element, property, winY, offsetY);
    }, function (element, offsetY) {
      return updateScrollingFixed(element, winY, offsetY);
    });
  };
  var updatePositions = function (container, winY) {
    var fixtures = $_2xikf015kjd08mi18.findFixtures(container);
    var updates = $_453g14w9jd08mgmy.map(fixtures, function (fixture) {
      return updateFixture(fixture, winY);
    });
    return $_boo1h15qjd08mi2c.par(updates);
  };
  var $_f975kq15pjd08mi26 = { updatePositions: updatePositions };

  var input = function (parent, operation) {
    var input = $_3visdkwtjd08mgor.fromTag('input');
    $_62cv66zsjd08mh10.setAll(input, {
      opacity: '0',
      position: 'absolute',
      top: '-1000px',
      left: '-1000px'
    });
    $_u7ngdy2jd08mgu1.append(parent, input);
    $_6h5kwkygjd08mgvc.focus(input);
    operation(input);
    $_7x8x1ny5jd08mguh.remove(input);
  };
  var $_2kecjo15sjd08mi2g = { input: input };

  var VIEW_MARGIN = 5;
  var register$2 = function (toolstrip, socket, container, outerWindow, structure, cWin) {
    var scroller = BackgroundActivity(function (y) {
      return $_3fdqi015fjd08mi0q.moveWindowScroll(toolstrip, socket, y);
    });
    var scrollBounds = function () {
      var rects = $_9bqhqd13wjd08mhqw.getRectangles(cWin);
      return $_4izgwbwajd08mgn6.from(rects[0]).bind(function (rect) {
        var viewTop = rect.top() - socket.dom().scrollTop;
        var outside = viewTop > outerWindow.innerHeight + VIEW_MARGIN || viewTop < -VIEW_MARGIN;
        return outside ? $_4izgwbwajd08mgn6.some({
          top: $_8zkcijwbjd08mgn8.constant(viewTop),
          bottom: $_8zkcijwbjd08mgn8.constant(viewTop + rect.height())
        }) : $_4izgwbwajd08mgn6.none();
      });
    };
    var scrollThrottle = $_alzm5u14kjd08mhu4.last(function () {
      scroller.idle(function () {
        $_f975kq15pjd08mi26.updatePositions(container, outerWindow.pageYOffset).get(function () {
          var extraScroll = scrollBounds();
          extraScroll.each(function (extra) {
            socket.dom().scrollTop = socket.dom().scrollTop + extra.top();
          });
          scroller.start(0);
          structure.refresh();
        });
      });
    }, 1000);
    var onScroll = $_buvuih13kjd08mhp2.bind($_3visdkwtjd08mgor.fromDom(outerWindow), 'scroll', function () {
      if (outerWindow.pageYOffset < 0) {
        return;
      }
      scrollThrottle.throttle();
    });
    $_f975kq15pjd08mi26.updatePositions(container, outerWindow.pageYOffset).get($_8zkcijwbjd08mgn8.identity);
    return { unbind: onScroll.unbind };
  };
  var setup$3 = function (bag) {
    var cWin = bag.cWin();
    var ceBody = bag.ceBody();
    var socket = bag.socket();
    var toolstrip = bag.toolstrip();
    var toolbar = bag.toolbar();
    var contentElement = bag.contentElement();
    var keyboardType = bag.keyboardType();
    var outerWindow = bag.outerWindow();
    var dropup = bag.dropup();
    var structure = $_2xikf015kjd08mi18.takeover(socket, ceBody, toolstrip, dropup);
    var keyboardModel = keyboardType(bag.outerBody(), cWin, $_9fqzedy7jd08mgun.body(), contentElement, toolstrip, toolbar);
    var toEditing = function () {
      keyboardModel.toEditing();
      clearSelection();
    };
    var toReading = function () {
      keyboardModel.toReading();
    };
    var onToolbarTouch = function (event) {
      keyboardModel.onToolbarTouch(event);
    };
    var onOrientation = $_a2auem13jjd08mhot.onChange(outerWindow, {
      onChange: $_8zkcijwbjd08mgn8.noop,
      onReady: structure.refresh
    });
    onOrientation.onAdjustment(function () {
      structure.refresh();
    });
    var onResize = $_buvuih13kjd08mhp2.bind($_3visdkwtjd08mgor.fromDom(outerWindow), 'resize', function () {
      if (structure.isExpanding()) {
        structure.refresh();
      }
    });
    var onScroll = register$2(toolstrip, socket, bag.outerBody(), outerWindow, structure, cWin);
    var unfocusedSelection = FakeSelection(cWin, contentElement);
    var refreshSelection = function () {
      if (unfocusedSelection.isActive()) {
        unfocusedSelection.update();
      }
    };
    var highlightSelection = function () {
      unfocusedSelection.update();
    };
    var clearSelection = function () {
      unfocusedSelection.clear();
    };
    var scrollIntoView = function (top, bottom) {
      $_6op11k15ojd08mi24.scrollIntoView(cWin, socket, dropup, top, bottom);
    };
    var syncHeight = function () {
      $_62cv66zsjd08mh10.set(contentElement, 'height', contentElement.dom().contentWindow.document.body.scrollHeight + 'px');
    };
    var setViewportOffset = function (newYOffset) {
      structure.setViewportOffset(newYOffset);
      $_3fdqi015fjd08mi0q.moveOnlyTop(socket, newYOffset).get($_8zkcijwbjd08mgn8.identity);
    };
    var destroy = function () {
      structure.restore();
      onOrientation.destroy();
      onScroll.unbind();
      onResize.unbind();
      keyboardModel.destroy();
      unfocusedSelection.destroy();
      $_2kecjo15sjd08mi2g.input($_9fqzedy7jd08mgun.body(), $_6h5kwkygjd08mgvc.blur);
    };
    return {
      toEditing: toEditing,
      toReading: toReading,
      onToolbarTouch: onToolbarTouch,
      refreshSelection: refreshSelection,
      clearSelection: clearSelection,
      highlightSelection: highlightSelection,
      scrollIntoView: scrollIntoView,
      updateToolbarPadding: $_8zkcijwbjd08mgn8.noop,
      setViewportOffset: setViewportOffset,
      syncHeight: syncHeight,
      refreshStructure: structure.refresh,
      destroy: destroy
    };
  };
  var $_9hyl3q15bjd08mhzq = { setup: setup$3 };

  var stubborn = function (outerBody, cWin, page, frame) {
    var toEditing = function () {
      $_c00ass15djd08mi0g.resume(cWin, frame);
    };
    var toReading = function () {
      $_2kecjo15sjd08mi2g.input(outerBody, $_6h5kwkygjd08mgvc.blur);
    };
    var captureInput = $_buvuih13kjd08mhp2.bind(page, 'keydown', function (evt) {
      if (!$_453g14w9jd08mgmy.contains([
          'input',
          'textarea'
        ], $_9323z1xxjd08mgti.name(evt.target()))) {
        toEditing();
      }
    });
    var onToolbarTouch = function () {
    };
    var destroy = function () {
      captureInput.unbind();
    };
    return {
      toReading: toReading,
      toEditing: toEditing,
      onToolbarTouch: onToolbarTouch,
      destroy: destroy
    };
  };
  var timid = function (outerBody, cWin, page, frame) {
    var dismissKeyboard = function () {
      $_6h5kwkygjd08mgvc.blur(frame);
    };
    var onToolbarTouch = function () {
      dismissKeyboard();
    };
    var toReading = function () {
      dismissKeyboard();
    };
    var toEditing = function () {
      $_c00ass15djd08mi0g.resume(cWin, frame);
    };
    return {
      toReading: toReading,
      toEditing: toEditing,
      onToolbarTouch: onToolbarTouch,
      destroy: $_8zkcijwbjd08mgn8.noop
    };
  };
  var $_8o4oj215tjd08mi2n = {
    stubborn: stubborn,
    timid: timid
  };

  var create$8 = function (platform, mask) {
    var meta = $_cpg25l14hjd08mhtk.tag();
    var priorState = $_daqe5q12ajd08mhfm.value();
    var scrollEvents = $_daqe5q12ajd08mhfm.value();
    var iosApi = $_daqe5q12ajd08mhfm.api();
    var iosEvents = $_daqe5q12ajd08mhfm.api();
    var enter = function () {
      mask.hide();
      var doc = $_3visdkwtjd08mgor.fromDom(document);
      $_1ocnqn14fjd08mht4.getActiveApi(platform.editor).each(function (editorApi) {
        priorState.set({
          socketHeight: $_62cv66zsjd08mh10.getRaw(platform.socket, 'height'),
          iframeHeight: $_62cv66zsjd08mh10.getRaw(editorApi.frame(), 'height'),
          outerScroll: document.body.scrollTop
        });
        scrollEvents.set({ exclusives: $_25af6114qjd08mhva.exclusive(doc, '.' + $_2bo91013hjd08mhol.scrollable()) });
        $_5tvqrbxujd08mgt5.add(platform.container, $_ete72zz1jd08mgy0.resolve('fullscreen-maximized'));
        $_dm4r7914gjd08mhtd.clobberStyles(platform.container, editorApi.body());
        meta.maximize();
        $_62cv66zsjd08mh10.set(platform.socket, 'overflow', 'scroll');
        $_62cv66zsjd08mh10.set(platform.socket, '-webkit-overflow-scrolling', 'touch');
        $_6h5kwkygjd08mgvc.focus(editorApi.body());
        var setupBag = $_2h5zjyxmjd08mgsp.immutableBag([
          'cWin',
          'ceBody',
          'socket',
          'toolstrip',
          'toolbar',
          'dropup',
          'contentElement',
          'cursor',
          'keyboardType',
          'isScrolling',
          'outerWindow',
          'outerBody'
        ], []);
        iosApi.set($_9hyl3q15bjd08mhzq.setup(setupBag({
          cWin: editorApi.win(),
          ceBody: editorApi.body(),
          socket: platform.socket,
          toolstrip: platform.toolstrip,
          toolbar: platform.toolbar,
          dropup: platform.dropup.element(),
          contentElement: editorApi.frame(),
          cursor: $_8zkcijwbjd08mgn8.noop,
          outerBody: platform.body,
          outerWindow: platform.win,
          keyboardType: $_8o4oj215tjd08mi2n.stubborn,
          isScrolling: function () {
            return scrollEvents.get().exists(function (s) {
              return s.socket.isScrolling();
            });
          }
        })));
        iosApi.run(function (api) {
          api.syncHeight();
        });
        iosEvents.set($_bgq7c15ajd08mhzg.initEvents(editorApi, iosApi, platform.toolstrip, platform.socket, platform.dropup));
      });
    };
    var exit = function () {
      meta.restore();
      iosEvents.clear();
      iosApi.clear();
      mask.show();
      priorState.on(function (s) {
        s.socketHeight.each(function (h) {
          $_62cv66zsjd08mh10.set(platform.socket, 'height', h);
        });
        s.iframeHeight.each(function (h) {
          $_62cv66zsjd08mh10.set(platform.editor.getFrame(), 'height', h);
        });
        document.body.scrollTop = s.scrollTop;
      });
      priorState.clear();
      scrollEvents.on(function (s) {
        s.exclusives.unbind();
      });
      scrollEvents.clear();
      $_5tvqrbxujd08mgt5.remove(platform.container, $_ete72zz1jd08mgy0.resolve('fullscreen-maximized'));
      $_dm4r7914gjd08mhtd.restoreStyles();
      $_2bo91013hjd08mhol.deregister(platform.toolbar);
      $_62cv66zsjd08mh10.remove(platform.socket, 'overflow');
      $_62cv66zsjd08mh10.remove(platform.socket, '-webkit-overflow-scrolling');
      $_6h5kwkygjd08mgvc.blur(platform.editor.getFrame());
      $_1ocnqn14fjd08mht4.getActiveApi(platform.editor).each(function (editorApi) {
        editorApi.clearSelection();
      });
    };
    var refreshStructure = function () {
      iosApi.run(function (api) {
        api.refreshStructure();
      });
    };
    return {
      enter: enter,
      refreshStructure: refreshStructure,
      exit: exit
    };
  };
  var $_doklg4159jd08mhz4 = { create: create$8 };

  var produce$1 = function (raw) {
    var mobile = $_6eo7r6xhjd08mgrx.asRawOrDie('Getting IosWebapp schema', MobileSchema, raw);
    $_62cv66zsjd08mh10.set(mobile.toolstrip, 'width', '100%');
    $_62cv66zsjd08mh10.set(mobile.container, 'position', 'relative');
    var onView = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_eg825h12kjd08mhhk.build($_7pe5ri14jjd08mhtv.sketch(onView, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    var mode = $_doklg4159jd08mhz4.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: mode.refreshStructure,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_8zkcijwbjd08mgn8.noop
    };
  };
  var $_3k34ls158jd08mhyv = { produce: produce$1 };

  function IosRealm (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_ete72zz1jd08mgy0.resolve('ios-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_daqe5q12ajd08mhfm.api();
    var switchToEdit = $_7q4zxr14rjd08mhvg.makeEditSwitch(webapp);
    var socket = $_7q4zxr14rjd08mhvg.makeSocket();
    var dropup = $_4fs0m214sjd08mhvo.build(function () {
      webapp.run(function (w) {
        w.refreshStructure();
      });
    }, scrollIntoView);
    alloy.add(toolbar.wrapper());
    alloy.add(socket);
    alloy.add(dropup.component());
    var setToolbarGroups = function (rawGroups) {
      var groups = toolbar.createGroups(rawGroups);
      toolbar.setGroups(groups);
    };
    var setContextToolbar = function (rawGroups) {
      var groups = toolbar.createGroups(rawGroups);
      toolbar.setContextToolbar(groups);
    };
    var focusToolbar = function () {
      toolbar.focus();
    };
    var restoreToolbar = function () {
      toolbar.restoreToolbar();
    };
    var init = function (spec) {
      webapp.set($_3k34ls158jd08mhyv.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        Replacing.remove(socket, switchToEdit);
        w.exit();
      });
    };
    var updateMode = function (readOnly) {
      $_7q4zxr14rjd08mhvg.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_8zkcijwbjd08mgn8.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_8zkcijwbjd08mgn8.constant(socket),
      dropup: $_8zkcijwbjd08mgn8.constant(dropup)
    };
  }

  var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');

  var derive$4 = function (editor) {
    var base = $_96dvjsx6jd08mgqy.readOptFrom(editor.settings, 'skin_url').fold(function () {
      return EditorManager.baseURL + '/skins/' + 'lightgray';
    }, function (url) {
      return url;
    });
    return {
      content: base + '/content.mobile.min.css',
      ui: base + '/skin.mobile.min.css'
    };
  };
  var $_7nm5jb15ujd08mi2z = { derive: derive$4 };

  var fontSizes = [
    'x-small',
    'small',
    'medium',
    'large',
    'x-large'
  ];
  var fireChange$1 = function (realm, command, state) {
    realm.system().broadcastOn([$_ceaddvyojd08mgvu.formatChanged()], {
      command: command,
      state: state
    });
  };
  var init$5 = function (realm, editor) {
    var allFormats = $_1xoayfx0jd08mgpm.keys(editor.formatter.get());
    $_453g14w9jd08mgmy.each(allFormats, function (command) {
      editor.formatter.formatChanged(command, function (state) {
        fireChange$1(realm, command, state);
      });
    });
    $_453g14w9jd08mgmy.each([
      'ul',
      'ol'
    ], function (command) {
      editor.selection.selectorChanged(command, function (state, data) {
        fireChange$1(realm, command, state);
      });
    });
  };
  var $_6i41ai15wjd08mi33 = {
    init: init$5,
    fontSizes: $_8zkcijwbjd08mgn8.constant(fontSizes)
  };

  var fireSkinLoaded = function (editor) {
    var done = function () {
      editor._skinLoaded = true;
      editor.fire('SkinLoaded');
    };
    return function () {
      if (editor.initialized) {
        done();
      } else {
        editor.on('init', done);
      }
    };
  };
  var $_f45acs15xjd08mi37 = { fireSkinLoaded: fireSkinLoaded };

  var READING = $_8zkcijwbjd08mgn8.constant('toReading');
  var EDITING = $_8zkcijwbjd08mgn8.constant('toEditing');
  ThemeManager.add('mobile', function (editor) {
    var renderUI = function (args) {
      var cssUrls = $_7nm5jb15ujd08mi2z.derive(editor);
      if ($_3ie2n9ynjd08mgvt.isSkinDisabled(editor) === false) {
        editor.contentCSS.push(cssUrls.content);
        DOMUtils.DOM.styleSheetLoader.load(cssUrls.ui, $_f45acs15xjd08mi37.fireSkinLoaded(editor));
      } else {
        $_f45acs15xjd08mi37.fireSkinLoaded(editor)();
      }
      var doScrollIntoView = function () {
        editor.fire('scrollIntoView');
      };
      var wrapper = $_3visdkwtjd08mgor.fromTag('div');
      var realm = $_dymoxnwgjd08mgng.detect().os.isAndroid() ? AndroidRealm(doScrollIntoView) : IosRealm(doScrollIntoView);
      var original = $_3visdkwtjd08mgor.fromDom(args.targetNode);
      $_u7ngdy2jd08mgu1.after(original, wrapper);
      $_9ab6qsy1jd08mgtr.attachSystem(wrapper, realm.system());
      var findFocusIn = function (elem) {
        return $_6h5kwkygjd08mgvc.search(elem).bind(function (focused) {
          return realm.system().getByDom(focused).toOption();
        });
      };
      var outerWindow = args.targetNode.ownerDocument.defaultView;
      var orientation = $_a2auem13jjd08mhot.onChange(outerWindow, {
        onChange: function () {
          var alloy = realm.system();
          alloy.broadcastOn([$_ceaddvyojd08mgvu.orientationChanged()], { width: $_a2auem13jjd08mhot.getActualWidth(outerWindow) });
        },
        onReady: $_8zkcijwbjd08mgn8.noop
      });
      var setReadOnly = function (readOnlyGroups, mainGroups, ro) {
        if (ro === false) {
          editor.selection.collapse();
        }
        realm.setToolbarGroups(ro ? readOnlyGroups.get() : mainGroups.get());
        editor.setMode(ro === true ? 'readonly' : 'design');
        editor.fire(ro === true ? READING() : EDITING());
        realm.updateMode(ro);
      };
      var bindHandler = function (label, handler) {
        editor.on(label, handler);
        return {
          unbind: function () {
            editor.off(label);
          }
        };
      };
      editor.on('init', function () {
        realm.init({
          editor: {
            getFrame: function () {
              return $_3visdkwtjd08mgor.fromDom(editor.contentAreaContainer.querySelector('iframe'));
            },
            onDomChanged: function () {
              return { unbind: $_8zkcijwbjd08mgn8.noop };
            },
            onToReading: function (handler) {
              return bindHandler(READING(), handler);
            },
            onToEditing: function (handler) {
              return bindHandler(EDITING(), handler);
            },
            onScrollToCursor: function (handler) {
              editor.on('scrollIntoView', function (tinyEvent) {
                handler(tinyEvent);
              });
              var unbind = function () {
                editor.off('scrollIntoView');
                orientation.destroy();
              };
              return { unbind: unbind };
            },
            onTouchToolstrip: function () {
              hideDropup();
            },
            onTouchContent: function () {
              var toolbar = $_3visdkwtjd08mgor.fromDom(editor.editorContainer.querySelector('.' + $_ete72zz1jd08mgy0.resolve('toolbar')));
              findFocusIn(toolbar).each($_f6t3w1wvjd08mgp1.emitExecute);
              realm.restoreToolbar();
              hideDropup();
            },
            onTapContent: function (evt) {
              var target = evt.target();
              if ($_9323z1xxjd08mgti.name(target) === 'img') {
                editor.selection.select(target.dom());
                evt.kill();
              } else if ($_9323z1xxjd08mgti.name(target) === 'a') {
                var component = realm.system().getByDom($_3visdkwtjd08mgor.fromDom(editor.editorContainer));
                component.each(function (container) {
                  if (Swapping.isAlpha(container)) {
                    $_mihqmymjd08mgvs.openLink(target.dom());
                  }
                });
              }
            }
          },
          container: $_3visdkwtjd08mgor.fromDom(editor.editorContainer),
          socket: $_3visdkwtjd08mgor.fromDom(editor.contentAreaContainer),
          toolstrip: $_3visdkwtjd08mgor.fromDom(editor.editorContainer.querySelector('.' + $_ete72zz1jd08mgy0.resolve('toolstrip'))),
          toolbar: $_3visdkwtjd08mgor.fromDom(editor.editorContainer.querySelector('.' + $_ete72zz1jd08mgy0.resolve('toolbar'))),
          dropup: realm.dropup(),
          alloy: realm.system(),
          translate: $_8zkcijwbjd08mgn8.noop,
          setReadOnly: function (ro) {
            setReadOnly(readOnlyGroups, mainGroups, ro);
          }
        });
        var hideDropup = function () {
          realm.dropup().disappear(function () {
            realm.system().broadcastOn([$_ceaddvyojd08mgvu.dropupDismissed()], {});
          });
        };
        $_1x8vhay8jd08mguq.registerInspector('remove this', realm.system());
        var backToMaskGroup = {
          label: 'The first group',
          scrollable: false,
          items: [$_9w4shzz2jd08mgy1.forToolbar('back', function () {
              editor.selection.collapse();
              realm.exit();
            }, {})]
        };
        var backToReadOnlyGroup = {
          label: 'Back to read only',
          scrollable: false,
          items: [$_9w4shzz2jd08mgy1.forToolbar('readonly-back', function () {
              setReadOnly(readOnlyGroups, mainGroups, true);
            }, {})]
        };
        var readOnlyGroup = {
          label: 'The read only mode group',
          scrollable: true,
          items: []
        };
        var features = $_5ie7jxypjd08mgvw.setup(realm, editor);
        var items = $_5ie7jxypjd08mgvw.detect(editor.settings, features);
        var actionGroup = {
          label: 'the action group',
          scrollable: true,
          items: items
        };
        var extraGroup = {
          label: 'The extra group',
          scrollable: false,
          items: []
        };
        var mainGroups = Cell([
          backToReadOnlyGroup,
          actionGroup,
          extraGroup
        ]);
        var readOnlyGroups = Cell([
          backToMaskGroup,
          readOnlyGroup,
          extraGroup
        ]);
        $_6i41ai15wjd08mi33.init(realm, editor);
      });
      return {
        iframeContainer: realm.socket().element().dom(),
        editorContainer: realm.element().dom()
      };
    };
    return {
      getNotificationManagerImpl: function () {
        return {
          open: $_8zkcijwbjd08mgn8.identity,
          close: $_8zkcijwbjd08mgn8.noop,
          reposition: $_8zkcijwbjd08mgn8.noop,
          getArgs: $_8zkcijwbjd08mgn8.identity
        };
      },
      renderUI: renderUI
    };
  });
  function Theme () {
  }

  return Theme;

}());
})()
