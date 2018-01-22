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
  var never$1 = constant(false);
  var always$1 = constant(true);
  var $_88uun8wbjcq86lr5 = {
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
    never: never$1,
    always: always$1
  };

  var never = $_88uun8wbjcq86lr5.never;
  var always = $_88uun8wbjcq86lr5.always;
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
      is: never,
      isSome: never,
      isNone: always,
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
      exists: never,
      forall: always,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
      toString: $_88uun8wbjcq86lr5.constant('none()')
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
      isSome: always,
      isNone: never,
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
        return o.fold(never, function (b) {
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
  var $_2334kywajcq86lr3 = {
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
    return r === -1 ? $_2334kywajcq86lr3.none() : $_2334kywajcq86lr3.some(r);
  };
  var contains$1 = function (xs, x) {
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
        return $_2334kywajcq86lr3.some(x);
      }
    }
    return $_2334kywajcq86lr3.none();
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return $_2334kywajcq86lr3.some(i);
      }
    }
    return $_2334kywajcq86lr3.none();
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
      return !contains$1(a2, x);
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
    return xs.length === 0 ? $_2334kywajcq86lr3.none() : $_2334kywajcq86lr3.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? $_2334kywajcq86lr3.none() : $_2334kywajcq86lr3.some(xs[xs.length - 1]);
  };
  var $_54lr1fw9jcq86lqv = {
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
    contains: contains$1,
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
  var $_c1h7awejcq86lrb = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_c1h7awejcq86lrb.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_e5blaswdjcq86lr9 = { getOrDie: getOrDie };

  var node = function () {
    var f = $_e5blaswdjcq86lr9.getOrDie('Node');
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
  var $_imv83wcjcq86lr8 = {
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
  var $_8llfvcwhjcq86lre = { cached: cached };

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
    return nu$1(group(1), group(2));
  };
  var detect$2 = function (versionRegexes, agent) {
    var cleanedAgent = String(agent).toLowerCase();
    if (versionRegexes.length === 0)
      return unknown$1();
    return find$1(versionRegexes, cleanedAgent);
  };
  var unknown$1 = function () {
    return nu$1(0, 0);
  };
  var nu$1 = function (major, minor) {
    return {
      major: major,
      minor: minor
    };
  };
  var $_6k83y0wkjcq86lrk = {
    nu: nu$1,
    detect: detect$2,
    unknown: unknown$1
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
  var unknown = function () {
    return nu({
      current: undefined,
      version: $_6k83y0wkjcq86lrk.unknown()
    });
  };
  var nu = function (info) {
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
  var $_3oszckwjjcq86lrg = {
    unknown: unknown,
    nu: nu,
    edge: $_88uun8wbjcq86lr5.constant(edge),
    chrome: $_88uun8wbjcq86lr5.constant(chrome),
    ie: $_88uun8wbjcq86lr5.constant(ie),
    opera: $_88uun8wbjcq86lr5.constant(opera),
    firefox: $_88uun8wbjcq86lr5.constant(firefox),
    safari: $_88uun8wbjcq86lr5.constant(safari)
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
      version: $_6k83y0wkjcq86lrk.unknown()
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
  var $_dmkfaowljcq86lrm = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_88uun8wbjcq86lr5.constant(windows),
    ios: $_88uun8wbjcq86lr5.constant(ios),
    android: $_88uun8wbjcq86lr5.constant(android),
    linux: $_88uun8wbjcq86lr5.constant(linux),
    osx: $_88uun8wbjcq86lr5.constant(osx),
    solaris: $_88uun8wbjcq86lr5.constant(solaris),
    freebsd: $_88uun8wbjcq86lr5.constant(freebsd)
  };

  var DeviceType = function (os, browser, userAgent) {
    var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
    var isiPhone = os.isiOS() && !isiPad;
    var isAndroid3 = os.isAndroid() && os.version.major === 3;
    var isAndroid4 = os.isAndroid() && os.version.major === 4;
    var isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true;
    var isTouch = os.isiOS() || os.isAndroid();
    var isPhone = isTouch && !isTablet;
    var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
    return {
      isiPad: $_88uun8wbjcq86lr5.constant(isiPad),
      isiPhone: $_88uun8wbjcq86lr5.constant(isiPhone),
      isTablet: $_88uun8wbjcq86lr5.constant(isTablet),
      isPhone: $_88uun8wbjcq86lr5.constant(isPhone),
      isTouch: $_88uun8wbjcq86lr5.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_88uun8wbjcq86lr5.constant(iOSwebview)
    };
  };

  var detect$3 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return $_54lr1fw9jcq86lqv.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$3(browsers, userAgent).map(function (browser) {
      var version = $_6k83y0wkjcq86lrk.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$3(oses, userAgent).map(function (os) {
      var version = $_6k83y0wkjcq86lrk.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_ae3msmwnjcq86lru = {
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
  var $_fvupxfwqjcq86ls6 = {
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
    return str === '' ? $_2334kywajcq86lr3.none() : $_2334kywajcq86lr3.some(str.substr(0, 1));
  };
  var tail = function (str) {
    return str === '' ? $_2334kywajcq86lr3.none() : $_2334kywajcq86lr3.some(str.substring(1));
  };
  var $_2hu4rswrjcq86ls7 = {
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
    return startsWith(str, prefix) ? $_fvupxfwqjcq86ls6.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_fvupxfwqjcq86ls6.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_fvupxfwqjcq86ls6.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_fvupxfwqjcq86ls6.addToEnd(str, prefix);
  };
  var contains$2 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_2hu4rswrjcq86ls7.head(str).bind(function (head) {
      return $_2hu4rswrjcq86ls7.tail(str).map(function (tail) {
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
  var $_99go0uwpjcq86ls4 = {
    supplant: supplant,
    startsWith: startsWith,
    removeLeading: removeLeading,
    removeTrailing: removeTrailing,
    ensureLeading: ensureLeading,
    ensureTrailing: ensureTrailing,
    endsWith: endsWith,
    contains: contains$2,
    trim: trim,
    lTrim: lTrim,
    rTrim: rTrim,
    capitalize: capitalize
  };

  var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
  var checkContains = function (target) {
    return function (uastring) {
      return $_99go0uwpjcq86ls4.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_99go0uwpjcq86ls4.contains(uastring, 'edge/') && $_99go0uwpjcq86ls4.contains(uastring, 'chrome') && $_99go0uwpjcq86ls4.contains(uastring, 'safari') && $_99go0uwpjcq86ls4.contains(uastring, 'applewebkit');
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
        return $_99go0uwpjcq86ls4.contains(uastring, 'chrome') && !$_99go0uwpjcq86ls4.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_99go0uwpjcq86ls4.contains(uastring, 'msie') || $_99go0uwpjcq86ls4.contains(uastring, 'trident');
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
        return ($_99go0uwpjcq86ls4.contains(uastring, 'safari') || $_99go0uwpjcq86ls4.contains(uastring, 'mobile/')) && $_99go0uwpjcq86ls4.contains(uastring, 'applewebkit');
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
        return $_99go0uwpjcq86ls4.contains(uastring, 'iphone') || $_99go0uwpjcq86ls4.contains(uastring, 'ipad');
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
  var $_b2ktytwojcq86lrz = {
    browsers: $_88uun8wbjcq86lr5.constant(browsers),
    oses: $_88uun8wbjcq86lr5.constant(oses)
  };

  var detect$1 = function (userAgent) {
    var browsers = $_b2ktytwojcq86lrz.browsers();
    var oses = $_b2ktytwojcq86lrz.oses();
    var browser = $_ae3msmwnjcq86lru.detectBrowser(browsers, userAgent).fold($_3oszckwjjcq86lrg.unknown, $_3oszckwjjcq86lrg.nu);
    var os = $_ae3msmwnjcq86lru.detectOs(oses, userAgent).fold($_dmkfaowljcq86lrm.unknown, $_dmkfaowljcq86lrm.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_dol1j4wijcq86lrf = { detect: detect$1 };

  var detect = $_8llfvcwhjcq86lre.cached(function () {
    var userAgent = navigator.userAgent;
    return $_dol1j4wijcq86lrf.detect(userAgent);
  });
  var $_ggue51wgjcq86lrc = { detect: detect };

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
    return { dom: $_88uun8wbjcq86lr5.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return $_2334kywajcq86lr3.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_96tjzawtjcq86lsc = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_aray7uwujcq86lsj = {
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

  var ELEMENT = $_aray7uwujcq86lsj.ELEMENT;
  var DOCUMENT = $_aray7uwujcq86lsj.DOCUMENT;
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
    return bypassSelector(base) ? [] : $_54lr1fw9jcq86lqv.map(base.querySelectorAll(selector), $_96tjzawtjcq86lsc.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? $_2334kywajcq86lr3.none() : $_2334kywajcq86lr3.from(base.querySelector(selector)).map($_96tjzawtjcq86lsc.fromDom);
  };
  var $_3tq25qwsjcq86ls8 = {
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
    return $_54lr1fw9jcq86lqv.exists(elements, $_88uun8wbjcq86lr5.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_imv83wcjcq86lr8.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_ggue51wgjcq86lrc.detect().browser;
  var contains = browser.isIE() ? ieContains : regularContains;
  var $_1mhuz1w8jcq86lql = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains,
    is: $_3tq25qwsjcq86ls8.is
  };

  var isSource = function (component, simulatedEvent) {
    return $_1mhuz1w8jcq86lql.eq(component.element(), simulatedEvent.event().target());
  };
  var $_ab40a9w7jcq86lqh = { isSource: isSource };

  var $_d9eamdwxjcq86lss = {
    contextmenu: $_88uun8wbjcq86lr5.constant('contextmenu'),
    touchstart: $_88uun8wbjcq86lr5.constant('touchstart'),
    touchmove: $_88uun8wbjcq86lr5.constant('touchmove'),
    touchend: $_88uun8wbjcq86lr5.constant('touchend'),
    gesturestart: $_88uun8wbjcq86lr5.constant('gesturestart'),
    mousedown: $_88uun8wbjcq86lr5.constant('mousedown'),
    mousemove: $_88uun8wbjcq86lr5.constant('mousemove'),
    mouseout: $_88uun8wbjcq86lr5.constant('mouseout'),
    mouseup: $_88uun8wbjcq86lr5.constant('mouseup'),
    mouseover: $_88uun8wbjcq86lr5.constant('mouseover'),
    focusin: $_88uun8wbjcq86lr5.constant('focusin'),
    keydown: $_88uun8wbjcq86lr5.constant('keydown'),
    input: $_88uun8wbjcq86lr5.constant('input'),
    change: $_88uun8wbjcq86lr5.constant('change'),
    focus: $_88uun8wbjcq86lr5.constant('focus'),
    click: $_88uun8wbjcq86lr5.constant('click'),
    transitionend: $_88uun8wbjcq86lr5.constant('transitionend'),
    selectstart: $_88uun8wbjcq86lr5.constant('selectstart')
  };

  var alloy = { tap: $_88uun8wbjcq86lr5.constant('alloy.tap') };
  var $_d5i57fwwjcq86lsp = {
    focus: $_88uun8wbjcq86lr5.constant('alloy.focus'),
    postBlur: $_88uun8wbjcq86lr5.constant('alloy.blur.post'),
    receive: $_88uun8wbjcq86lr5.constant('alloy.receive'),
    execute: $_88uun8wbjcq86lr5.constant('alloy.execute'),
    focusItem: $_88uun8wbjcq86lr5.constant('alloy.focus.item'),
    tap: alloy.tap,
    tapOrClick: $_ggue51wgjcq86lrc.detect().deviceType.isTouch() ? alloy.tap : $_d9eamdwxjcq86lss.click,
    longpress: $_88uun8wbjcq86lr5.constant('alloy.longpress'),
    sandboxClose: $_88uun8wbjcq86lr5.constant('alloy.sandbox.close'),
    systemInit: $_88uun8wbjcq86lr5.constant('alloy.system.init'),
    windowScroll: $_88uun8wbjcq86lr5.constant('alloy.system.scroll'),
    attachedToDom: $_88uun8wbjcq86lr5.constant('alloy.system.attached'),
    detachedFromDom: $_88uun8wbjcq86lr5.constant('alloy.system.detached'),
    changeTab: $_88uun8wbjcq86lr5.constant('alloy.change.tab'),
    dismissTab: $_88uun8wbjcq86lr5.constant('alloy.dismiss.tab')
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
  var $_d1yi3wwzjcq86lsx = {
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
    var bothObjects = $_d1yi3wwzjcq86lsx.isObject(old) && $_d1yi3wwzjcq86lsx.isObject(nu);
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
  var $_9ymhaxwyjcq86lsv = {
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
        return $_2334kywajcq86lr3.some(x);
      }
    }
    return $_2334kywajcq86lr3.none();
  };
  var values = function (obj) {
    return mapToArray(obj, function (v) {
      return v;
    });
  };
  var size = function (obj) {
    return values(obj).length;
  };
  var $_3jdnysx0jcq86lsz = {
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
    emit(component, $_d5i57fwwjcq86lsp.execute());
  };
  var dispatch = function (component, target, event) {
    dispatchWith(component, target, event, {});
  };
  var dispatchWith = function (component, target, event, properties) {
    var data = $_9ymhaxwyjcq86lsv.deepMerge({ target: target }, properties);
    component.getSystem().triggerEvent(event, target, $_3jdnysx0jcq86lsz.map(data, $_88uun8wbjcq86lr5.constant));
  };
  var dispatchEvent = function (component, target, event, simulatedEvent) {
    component.getSystem().triggerEvent(event, target, simulatedEvent.event());
  };
  var dispatchFocus = function (component, target) {
    component.getSystem().triggerFocus(target, component.element());
  };
  var $_36xfsfwvjcq86lsk = {
    emit: emit,
    emitWith: emitWith,
    emitExecute: emitExecute,
    dispatch: dispatch,
    dispatchWith: dispatchWith,
    dispatchEvent: dispatchEvent,
    dispatchFocus: dispatchFocus
  };

  var generate = function (cases) {
    if (!$_d1yi3wwzjcq86lsx.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_54lr1fw9jcq86lqv.each(cases, function (acase, count) {
      var keys = $_3jdnysx0jcq86lsz.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_d1yi3wwzjcq86lsx.isArray(value)) {
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
          var branchKeys = $_3jdnysx0jcq86lsz.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_54lr1fw9jcq86lqv.forall(constructors, function (reqKey) {
            return $_54lr1fw9jcq86lqv.contains(branchKeys, reqKey);
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
  var $_9gltwzx4jcq86lts = { generate: generate };

  var adt = $_9gltwzx4jcq86lts.generate([
    { strict: [] },
    { defaultedThunk: ['fallbackThunk'] },
    { asOption: [] },
    { asDefaultedOptionThunk: ['fallbackThunk'] },
    { mergeWithThunk: ['baseThunk'] }
  ]);
  var defaulted$1 = function (fallback) {
    return adt.defaultedThunk($_88uun8wbjcq86lr5.constant(fallback));
  };
  var asDefaultedOption = function (fallback) {
    return adt.asDefaultedOptionThunk($_88uun8wbjcq86lr5.constant(fallback));
  };
  var mergeWith = function (base) {
    return adt.mergeWithThunk($_88uun8wbjcq86lr5.constant(base));
  };
  var $_a08fe7x3jcq86ltp = {
    strict: adt.strict,
    asOption: adt.asOption,
    defaulted: defaulted$1,
    defaultedThunk: adt.defaultedThunk,
    asDefaultedOption: asDefaultedOption,
    asDefaultedOptionThunk: adt.asDefaultedOptionThunk,
    mergeWith: mergeWith,
    mergeWithThunk: adt.mergeWithThunk
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
      return $_2334kywajcq86lr3.some(o);
    };
    return {
      is: is,
      isValue: $_88uun8wbjcq86lr5.constant(true),
      isError: $_88uun8wbjcq86lr5.constant(false),
      getOr: $_88uun8wbjcq86lr5.constant(o),
      getOrThunk: $_88uun8wbjcq86lr5.constant(o),
      getOrDie: $_88uun8wbjcq86lr5.constant(o),
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
      return $_88uun8wbjcq86lr5.die(message)();
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
      is: $_88uun8wbjcq86lr5.constant(false),
      isValue: $_88uun8wbjcq86lr5.constant(false),
      isError: $_88uun8wbjcq86lr5.constant(true),
      getOr: $_88uun8wbjcq86lr5.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_88uun8wbjcq86lr5.noop,
      bind: bind,
      exists: $_88uun8wbjcq86lr5.constant(false),
      forall: $_88uun8wbjcq86lr5.constant(true),
      toOption: $_2334kywajcq86lr3.none
    };
  };
  var $_74ri01x8jcq86luv = {
    value: value$1,
    error: error
  };

  var comparison = $_9gltwzx4jcq86lts.generate([
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
    $_54lr1fw9jcq86lqv.each(results, function (result) {
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
  var $_cpg1bax9jcq86lux = {
    partition: partition$1,
    compare: compare
  };

  var mergeValues = function (values, base) {
    return $_74ri01x8jcq86luv.value($_9ymhaxwyjcq86lsv.deepMerge.apply(undefined, [base].concat(values)));
  };
  var mergeErrors = function (errors) {
    return $_88uun8wbjcq86lr5.compose($_74ri01x8jcq86luv.error, $_54lr1fw9jcq86lqv.flatten)(errors);
  };
  var consolidateObj = function (objects, base) {
    var partitions = $_cpg1bax9jcq86lux.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : mergeValues(partitions.values, base);
  };
  var consolidateArr = function (objects) {
    var partitions = $_cpg1bax9jcq86lux.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : $_74ri01x8jcq86luv.value(partitions.values);
  };
  var $_acuxf8x7jcq86lui = {
    consolidateObj: consolidateObj,
    consolidateArr: consolidateArr
  };

  var narrow$1 = function (obj, fields) {
    var r = {};
    $_54lr1fw9jcq86lqv.each(fields, function (field) {
      if (obj[field] !== undefined && obj.hasOwnProperty(field))
        r[field] = obj[field];
    });
    return r;
  };
  var indexOnKey$1 = function (array, key) {
    var obj = {};
    $_54lr1fw9jcq86lqv.each(array, function (a) {
      var keyValue = a[key];
      obj[keyValue] = a;
    });
    return obj;
  };
  var exclude$1 = function (obj, fields) {
    var r = {};
    $_3jdnysx0jcq86lsz.each(obj, function (v, k) {
      if (!$_54lr1fw9jcq86lqv.contains(fields, k)) {
        r[k] = v;
      }
    });
    return r;
  };
  var $_ftriw1xajcq86luz = {
    narrow: narrow$1,
    exclude: exclude$1,
    indexOnKey: indexOnKey$1
  };

  var readOpt$1 = function (key) {
    return function (obj) {
      return obj.hasOwnProperty(key) ? $_2334kywajcq86lr3.from(obj[key]) : $_2334kywajcq86lr3.none();
    };
  };
  var readOr$1 = function (key, fallback) {
    return function (obj) {
      return readOpt$1(key)(obj).getOr(fallback);
    };
  };
  var readOptFrom$1 = function (obj, key) {
    return readOpt$1(key)(obj);
  };
  var hasKey$1 = function (obj, key) {
    return obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null;
  };
  var $_9lfgu9xbjcq86lv2 = {
    readOpt: readOpt$1,
    readOr: readOr$1,
    readOptFrom: readOptFrom$1,
    hasKey: hasKey$1
  };

  var wrap$1 = function (key, value) {
    var r = {};
    r[key] = value;
    return r;
  };
  var wrapAll$1 = function (keyvalues) {
    var r = {};
    $_54lr1fw9jcq86lqv.each(keyvalues, function (kv) {
      r[kv.key] = kv.value;
    });
    return r;
  };
  var $_b7vo7zxcjcq86lv5 = {
    wrap: wrap$1,
    wrapAll: wrapAll$1
  };

  var narrow = function (obj, fields) {
    return $_ftriw1xajcq86luz.narrow(obj, fields);
  };
  var exclude = function (obj, fields) {
    return $_ftriw1xajcq86luz.exclude(obj, fields);
  };
  var readOpt = function (key) {
    return $_9lfgu9xbjcq86lv2.readOpt(key);
  };
  var readOr = function (key, fallback) {
    return $_9lfgu9xbjcq86lv2.readOr(key, fallback);
  };
  var readOptFrom = function (obj, key) {
    return $_9lfgu9xbjcq86lv2.readOptFrom(obj, key);
  };
  var wrap = function (key, value) {
    return $_b7vo7zxcjcq86lv5.wrap(key, value);
  };
  var wrapAll = function (keyvalues) {
    return $_b7vo7zxcjcq86lv5.wrapAll(keyvalues);
  };
  var indexOnKey = function (array, key) {
    return $_ftriw1xajcq86luz.indexOnKey(array, key);
  };
  var consolidate = function (objs, base) {
    return $_acuxf8x7jcq86lui.consolidateObj(objs, base);
  };
  var hasKey = function (obj, key) {
    return $_9lfgu9xbjcq86lv2.hasKey(obj, key);
  };
  var $_1z89rrx6jcq86lub = {
    narrow: narrow,
    exclude: exclude,
    readOpt: readOpt,
    readOr: readOr,
    readOptFrom: readOptFrom,
    wrap: wrap,
    wrapAll: wrapAll,
    indexOnKey: indexOnKey,
    hasKey: hasKey,
    consolidate: consolidate
  };

  var json = function () {
    return $_e5blaswdjcq86lr9.getOrDie('JSON');
  };
  var parse = function (obj) {
    return json().parse(obj);
  };
  var stringify = function (obj, replacer, space) {
    return json().stringify(obj, replacer, space);
  };
  var $_4y3hcjxfjcq86lvf = {
    parse: parse,
    stringify: stringify
  };

  var formatObj = function (input) {
    return $_d1yi3wwzjcq86lsx.isObject(input) && $_3jdnysx0jcq86lsz.keys(input).length > 100 ? ' removed due to size' : $_4y3hcjxfjcq86lvf.stringify(input, null, 2);
  };
  var formatErrors = function (errors) {
    var es = errors.length > 10 ? errors.slice(0, 10).concat([{
        path: [],
        getErrorInfo: function () {
          return '... (only showing first ten failures)';
        }
      }]) : errors;
    return $_54lr1fw9jcq86lqv.map(es, function (e) {
      return 'Failed path: (' + e.path.join(' > ') + ')\n' + e.getErrorInfo();
    });
  };
  var $_fy24cxejcq86lv9 = {
    formatObj: formatObj,
    formatErrors: formatErrors
  };

  var nu$4 = function (path, getErrorInfo) {
    return $_74ri01x8jcq86luv.error([{
        path: path,
        getErrorInfo: getErrorInfo
      }]);
  };
  var missingStrict = function (path, key, obj) {
    return nu$4(path, function () {
      return 'Could not find valid *strict* value for "' + key + '" in ' + $_fy24cxejcq86lv9.formatObj(obj);
    });
  };
  var missingKey = function (path, key) {
    return nu$4(path, function () {
      return 'Choice schema did not contain choice key: "' + key + '"';
    });
  };
  var missingBranch = function (path, branches, branch) {
    return nu$4(path, function () {
      return 'The chosen schema: "' + branch + '" did not exist in branches: ' + $_fy24cxejcq86lv9.formatObj(branches);
    });
  };
  var unsupportedFields = function (path, unsupported) {
    return nu$4(path, function () {
      return 'There are unsupported fields: [' + unsupported.join(', ') + '] specified';
    });
  };
  var custom = function (path, err) {
    return nu$4(path, function () {
      return err;
    });
  };
  var toString = function (error) {
    return 'Failed path: (' + error.path.join(' > ') + ')\n' + error.getErrorInfo();
  };
  var $_6xoprbxdjcq86lv7 = {
    missingStrict: missingStrict,
    missingKey: missingKey,
    missingBranch: missingBranch,
    unsupportedFields: unsupportedFields,
    custom: custom,
    toString: toString
  };

  var typeAdt = $_9gltwzx4jcq86lts.generate([
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
  var fieldAdt = $_9gltwzx4jcq86lts.generate([
    {
      field: [
        'name',
        'presence',
        'type'
      ]
    },
    { state: ['name'] }
  ]);
  var $_8f12soxgjcq86lvg = {
    typeAdt: typeAdt,
    fieldAdt: fieldAdt
  };

  var adt$1 = $_9gltwzx4jcq86lts.generate([
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
    return adt$1.state(okey, $_88uun8wbjcq86lr5.constant(value));
  };
  var snapshot = function (okey) {
    return adt$1.state(okey, $_88uun8wbjcq86lr5.identity);
  };
  var strictAccess = function (path, obj, key) {
    return $_9lfgu9xbjcq86lv2.readOptFrom(obj, key).fold(function () {
      return $_6xoprbxdjcq86lv7.missingStrict(path, key, obj);
    }, $_74ri01x8jcq86luv.value);
  };
  var fallbackAccess = function (obj, key, fallbackThunk) {
    var v = $_9lfgu9xbjcq86lv2.readOptFrom(obj, key).fold(function () {
      return fallbackThunk(obj);
    }, $_88uun8wbjcq86lr5.identity);
    return $_74ri01x8jcq86luv.value(v);
  };
  var optionAccess = function (obj, key) {
    return $_74ri01x8jcq86luv.value($_9lfgu9xbjcq86lv2.readOptFrom(obj, key));
  };
  var optionDefaultedAccess = function (obj, key, fallback) {
    var opt = $_9lfgu9xbjcq86lv2.readOptFrom(obj, key).map(function (val) {
      return val === true ? fallback(obj) : val;
    });
    return $_74ri01x8jcq86luv.value(opt);
  };
  var cExtractOne = function (path, obj, field, strength) {
    return field.fold(function (key, okey, presence, prop) {
      var bundle = function (av) {
        return prop.extract(path.concat([key]), strength, av).map(function (res) {
          return $_b7vo7zxcjcq86lv5.wrap(okey, strength(res));
        });
      };
      var bundleAsOption = function (optValue) {
        return optValue.fold(function () {
          var outcome = $_b7vo7zxcjcq86lv5.wrap(okey, strength($_2334kywajcq86lr3.none()));
          return $_74ri01x8jcq86luv.value(outcome);
        }, function (ov) {
          return prop.extract(path.concat([key]), strength, ov).map(function (res) {
            return $_b7vo7zxcjcq86lv5.wrap(okey, strength($_2334kywajcq86lr3.some(res)));
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
          return fallbackAccess(obj, key, $_88uun8wbjcq86lr5.constant({})).map(function (v) {
            return $_9ymhaxwyjcq86lsv.deepMerge(base, v);
          }).bind(bundle);
        });
      }();
    }, function (okey, instantiator) {
      var state = instantiator(obj);
      return $_74ri01x8jcq86luv.value($_b7vo7zxcjcq86lv5.wrap(okey, strength(state)));
    });
  };
  var cExtract = function (path, obj, fields, strength) {
    var results = $_54lr1fw9jcq86lqv.map(fields, function (field) {
      return cExtractOne(path, obj, field, strength);
    });
    return $_acuxf8x7jcq86lui.consolidateObj(results, {});
  };
  var value = function (validator) {
    var extract = function (path, strength, val) {
      return validator(val).fold(function (err) {
        return $_6xoprbxdjcq86lv7.custom(path, err);
      }, $_74ri01x8jcq86luv.value);
    };
    var toString = function () {
      return 'val';
    };
    var toDsl = function () {
      return $_8f12soxgjcq86lvg.typeAdt.itemOf(validator);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var getSetKeys = function (obj) {
    var keys = $_3jdnysx0jcq86lsz.keys(obj);
    return $_54lr1fw9jcq86lqv.filter(keys, function (k) {
      return $_1z89rrx6jcq86lub.hasKey(obj, k);
    });
  };
  var objOnly = function (fields) {
    var delegate = obj(fields);
    var fieldNames = $_54lr1fw9jcq86lqv.foldr(fields, function (acc, f) {
      return f.fold(function (key) {
        return $_9ymhaxwyjcq86lsv.deepMerge(acc, $_1z89rrx6jcq86lub.wrap(key, true));
      }, $_88uun8wbjcq86lr5.constant(acc));
    }, {});
    var extract = function (path, strength, o) {
      var keys = $_d1yi3wwzjcq86lsx.isBoolean(o) ? [] : getSetKeys(o);
      var extra = $_54lr1fw9jcq86lqv.filter(keys, function (k) {
        return !$_1z89rrx6jcq86lub.hasKey(fieldNames, k);
      });
      return extra.length === 0 ? delegate.extract(path, strength, o) : $_6xoprbxdjcq86lv7.unsupportedFields(path, extra);
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
      var fieldStrings = $_54lr1fw9jcq86lqv.map(fields, function (field) {
        return field.fold(function (key, okey, presence, prop) {
          return key + ' -> ' + prop.toString();
        }, function (okey, instantiator) {
          return 'state(' + okey + ')';
        });
      });
      return 'obj{\n' + fieldStrings.join('\n') + '}';
    };
    var toDsl = function () {
      return $_8f12soxgjcq86lvg.typeAdt.objOf($_54lr1fw9jcq86lqv.map(fields, function (f) {
        return f.fold(function (key, okey, presence, prop) {
          return $_8f12soxgjcq86lvg.fieldAdt.field(key, presence, prop);
        }, function (okey, instantiator) {
          return $_8f12soxgjcq86lvg.fieldAdt.state(okey);
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
      var results = $_54lr1fw9jcq86lqv.map(array, function (a, i) {
        return prop.extract(path.concat(['[' + i + ']']), strength, a);
      });
      return $_acuxf8x7jcq86lui.consolidateArr(results);
    };
    var toString = function () {
      return 'array(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_8f12soxgjcq86lvg.typeAdt.arrOf(prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var setOf = function (validator, prop) {
    var validateKeys = function (path, keys) {
      return arr(value(validator)).extract(path, $_88uun8wbjcq86lr5.identity, keys);
    };
    var extract = function (path, strength, o) {
      var keys = $_3jdnysx0jcq86lsz.keys(o);
      return validateKeys(path, keys).bind(function (validKeys) {
        var schema = $_54lr1fw9jcq86lqv.map(validKeys, function (vk) {
          return adt$1.field(vk, vk, $_a08fe7x3jcq86ltp.strict(), prop);
        });
        return obj(schema).extract(path, strength, o);
      });
    };
    var toString = function () {
      return 'setOf(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_8f12soxgjcq86lvg.typeAdt.setOf(validator, prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var anyValue = value($_74ri01x8jcq86luv.value);
  var arrOfObj = $_88uun8wbjcq86lr5.compose(arr, obj);
  var $_6c9vdvx5jcq86ltw = {
    anyValue: $_88uun8wbjcq86lr5.constant(anyValue),
    value: value,
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
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.strict(), $_6c9vdvx5jcq86ltw.anyValue());
  };
  var strictOf = function (key, schema) {
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.strict(), schema);
  };
  var strictFunction = function (key) {
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.strict(), $_6c9vdvx5jcq86ltw.value(function (f) {
      return $_d1yi3wwzjcq86lsx.isFunction(f) ? $_74ri01x8jcq86luv.value(f) : $_74ri01x8jcq86luv.error('Not a function');
    }));
  };
  var forbid = function (key, message) {
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.asOption(), $_6c9vdvx5jcq86ltw.value(function (v) {
      return $_74ri01x8jcq86luv.error('The field: ' + key + ' is forbidden. ' + message);
    }));
  };
  var strictArrayOf = function (key, prop) {
    return strictOf(key, prop);
  };
  var strictObjOf = function (key, objSchema) {
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.strict(), $_6c9vdvx5jcq86ltw.obj(objSchema));
  };
  var strictArrayOfObj = function (key, objFields) {
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.strict(), $_6c9vdvx5jcq86ltw.arrOfObj(objFields));
  };
  var option = function (key) {
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.asOption(), $_6c9vdvx5jcq86ltw.anyValue());
  };
  var optionOf = function (key, schema) {
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.asOption(), schema);
  };
  var optionObjOf = function (key, objSchema) {
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.asOption(), $_6c9vdvx5jcq86ltw.obj(objSchema));
  };
  var optionObjOfOnly = function (key, objSchema) {
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.asOption(), $_6c9vdvx5jcq86ltw.objOnly(objSchema));
  };
  var defaulted = function (key, fallback) {
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.defaulted(fallback), $_6c9vdvx5jcq86ltw.anyValue());
  };
  var defaultedOf = function (key, fallback, schema) {
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.defaulted(fallback), schema);
  };
  var defaultedObjOf = function (key, fallback, objSchema) {
    return $_6c9vdvx5jcq86ltw.field(key, key, $_a08fe7x3jcq86ltp.defaulted(fallback), $_6c9vdvx5jcq86ltw.obj(objSchema));
  };
  var field = function (key, okey, presence, prop) {
    return $_6c9vdvx5jcq86ltw.field(key, okey, presence, prop);
  };
  var state = function (okey, instantiator) {
    return $_6c9vdvx5jcq86ltw.state(okey, instantiator);
  };
  var $_2a8tl5x2jcq86ltk = {
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
    defaulted: defaulted,
    defaultedOf: defaultedOf,
    defaultedObjOf: defaultedObjOf,
    field: field,
    state: state
  };

  var chooseFrom = function (path, strength, input, branches, ch) {
    var fields = $_1z89rrx6jcq86lub.readOptFrom(branches, ch);
    return fields.fold(function () {
      return $_6xoprbxdjcq86lv7.missingBranch(path, branches, ch);
    }, function (fs) {
      return $_6c9vdvx5jcq86ltw.obj(fs).extract(path.concat(['branch: ' + ch]), strength, input);
    });
  };
  var choose$1 = function (key, branches) {
    var extract = function (path, strength, input) {
      var choice = $_1z89rrx6jcq86lub.readOptFrom(input, key);
      return choice.fold(function () {
        return $_6xoprbxdjcq86lv7.missingKey(path, key);
      }, function (chosen) {
        return chooseFrom(path, strength, input, branches, chosen);
      });
    };
    var toString = function () {
      return 'chooseOn(' + key + '). Possible values: ' + $_3jdnysx0jcq86lsz.keys(branches);
    };
    var toDsl = function () {
      return $_8f12soxgjcq86lvg.typeAdt.choiceOf(key, branches);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var $_4y5yuhxijcq86lvn = { choose: choose$1 };

  var anyValue$1 = $_6c9vdvx5jcq86ltw.value($_74ri01x8jcq86luv.value);
  var arrOfObj$1 = function (objFields) {
    return $_6c9vdvx5jcq86ltw.arrOfObj(objFields);
  };
  var arrOfVal = function () {
    return $_6c9vdvx5jcq86ltw.arr(anyValue$1);
  };
  var arrOf = $_6c9vdvx5jcq86ltw.arr;
  var objOf = $_6c9vdvx5jcq86ltw.obj;
  var objOfOnly = $_6c9vdvx5jcq86ltw.objOnly;
  var setOf$1 = $_6c9vdvx5jcq86ltw.setOf;
  var valueOf = function (validator) {
    return $_6c9vdvx5jcq86ltw.value(validator);
  };
  var extract = function (label, prop, strength, obj) {
    return prop.extract([label], strength, obj).fold(function (errs) {
      return $_74ri01x8jcq86luv.error({
        input: obj,
        errors: errs
      });
    }, $_74ri01x8jcq86luv.value);
  };
  var asStruct = function (label, prop, obj) {
    return extract(label, prop, $_88uun8wbjcq86lr5.constant, obj);
  };
  var asRaw = function (label, prop, obj) {
    return extract(label, prop, $_88uun8wbjcq86lr5.identity, obj);
  };
  var getOrDie$1 = function (extraction) {
    return extraction.fold(function (errInfo) {
      throw new Error(formatError(errInfo));
    }, $_88uun8wbjcq86lr5.identity);
  };
  var asRawOrDie = function (label, prop, obj) {
    return getOrDie$1(asRaw(label, prop, obj));
  };
  var asStructOrDie = function (label, prop, obj) {
    return getOrDie$1(asStruct(label, prop, obj));
  };
  var formatError = function (errInfo) {
    return 'Errors: \n' + $_fy24cxejcq86lv9.formatErrors(errInfo.errors) + '\n\nInput object: ' + $_fy24cxejcq86lv9.formatObj(errInfo.input);
  };
  var choose = function (key, branches) {
    return $_4y5yuhxijcq86lvn.choose(key, branches);
  };
  var $_8bk232xhjcq86lvj = {
    anyValue: $_88uun8wbjcq86lr5.constant(anyValue$1),
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
    choose: choose
  };

  var nu$3 = function (parts) {
    if (!$_1z89rrx6jcq86lub.hasKey(parts, 'can') && !$_1z89rrx6jcq86lub.hasKey(parts, 'abort') && !$_1z89rrx6jcq86lub.hasKey(parts, 'run'))
      throw new Error('EventHandler defined by: ' + $_4y3hcjxfjcq86lvf.stringify(parts, null, 2) + ' does not have can, abort, or run!');
    return $_8bk232xhjcq86lvj.asRawOrDie('Extracting event.handler', $_8bk232xhjcq86lvj.objOfOnly([
      $_2a8tl5x2jcq86ltk.defaulted('can', $_88uun8wbjcq86lr5.constant(true)),
      $_2a8tl5x2jcq86ltk.defaulted('abort', $_88uun8wbjcq86lr5.constant(false)),
      $_2a8tl5x2jcq86ltk.defaulted('run', $_88uun8wbjcq86lr5.noop)
    ]), parts);
  };
  var all$1 = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_54lr1fw9jcq86lqv.foldl(handlers, function (acc, handler) {
        return acc && f(handler).apply(undefined, args);
      }, true);
    };
  };
  var any = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_54lr1fw9jcq86lqv.foldl(handlers, function (acc, handler) {
        return acc || f(handler).apply(undefined, args);
      }, false);
    };
  };
  var read = function (handler) {
    return $_d1yi3wwzjcq86lsx.isFunction(handler) ? {
      can: $_88uun8wbjcq86lr5.constant(true),
      abort: $_88uun8wbjcq86lr5.constant(false),
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
      $_54lr1fw9jcq86lqv.each(handlers, function (handler) {
        handler.run.apply(undefined, args);
      });
    };
    return nu$3({
      can: can,
      abort: abort,
      run: run
    });
  };
  var $_6yce3zx1jcq86lt4 = {
    read: read,
    fuse: fuse,
    nu: nu$3
  };

  var derive$1 = $_1z89rrx6jcq86lub.wrapAll;
  var abort = function (name, predicate) {
    return {
      key: name,
      value: $_6yce3zx1jcq86lt4.nu({ abort: predicate })
    };
  };
  var can = function (name, predicate) {
    return {
      key: name,
      value: $_6yce3zx1jcq86lt4.nu({ can: predicate })
    };
  };
  var preventDefault = function (name) {
    return {
      key: name,
      value: $_6yce3zx1jcq86lt4.nu({
        run: function (component, simulatedEvent) {
          simulatedEvent.event().prevent();
        }
      })
    };
  };
  var run = function (name, handler) {
    return {
      key: name,
      value: $_6yce3zx1jcq86lt4.nu({ run: handler })
    };
  };
  var runActionExtra = function (name, action, extra) {
    return {
      key: name,
      value: $_6yce3zx1jcq86lt4.nu({
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
        value: $_6yce3zx1jcq86lt4.nu({
          run: function (component, simulatedEvent) {
            if ($_ab40a9w7jcq86lqh.isSource(component, simulatedEvent))
              handler(component, simulatedEvent);
          }
        })
      };
    };
  };
  var redirectToUid = function (name, uid) {
    return run(name, function (component, simulatedEvent) {
      component.getSystem().getByUid(uid).each(function (redirectee) {
        $_36xfsfwvjcq86lsk.dispatchEvent(redirectee, redirectee.element(), name, simulatedEvent);
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
  var $_fpvm9zw6jcq86lqb = {
    derive: derive$1,
    run: run,
    preventDefault: preventDefault,
    runActionExtra: runActionExtra,
    runOnAttached: runOnSourceName($_d5i57fwwjcq86lsp.attachedToDom()),
    runOnDetached: runOnSourceName($_d5i57fwwjcq86lsp.detachedFromDom()),
    runOnInit: runOnSourceName($_d5i57fwwjcq86lsp.systemInit()),
    runOnExecute: runOnName($_d5i57fwwjcq86lsp.execute()),
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
  var getAnnotation = $_2334kywajcq86lr3.none;
  var $_5vx13sxjjcq86lvu = {
    markAsBehaviourApi: markAsBehaviourApi,
    markAsExtraApi: markAsExtraApi,
    markAsSketchApi: markAsSketchApi,
    getAnnotation: getAnnotation
  };

  var Immutable = function () {
    var fields = arguments;
    return function () {
      var values = new Array(arguments.length);
      for (var i = 0; i < values.length; i++)
        values[i] = arguments[i];
      if (fields.length !== values.length)
        throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
      var struct = {};
      $_54lr1fw9jcq86lqv.each(fields, function (name, i) {
        struct[name] = $_88uun8wbjcq86lr5.constant(values[i]);
      });
      return struct;
    };
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
    if (!$_d1yi3wwzjcq86lsx.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_54lr1fw9jcq86lqv.each(array, function (a) {
      if (!$_d1yi3wwzjcq86lsx.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_54lr1fw9jcq86lqv.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_18sgopxpjcq86lwk = {
    sort: sort$1,
    reqMessage: reqMessage,
    unsuppMessage: unsuppMessage,
    validateStrArr: validateStrArr,
    invalidTypeMessage: invalidTypeMessage,
    checkDupes: checkDupes
  };

  var MixedBag = function (required, optional) {
    var everything = required.concat(optional);
    if (everything.length === 0)
      throw new Error('You must specify at least one required or optional field.');
    $_18sgopxpjcq86lwk.validateStrArr('required', required);
    $_18sgopxpjcq86lwk.validateStrArr('optional', optional);
    $_18sgopxpjcq86lwk.checkDupes(everything);
    return function (obj) {
      var keys = $_3jdnysx0jcq86lsz.keys(obj);
      var allReqd = $_54lr1fw9jcq86lqv.forall(required, function (req) {
        return $_54lr1fw9jcq86lqv.contains(keys, req);
      });
      if (!allReqd)
        $_18sgopxpjcq86lwk.reqMessage(required, keys);
      var unsupported = $_54lr1fw9jcq86lqv.filter(keys, function (key) {
        return !$_54lr1fw9jcq86lqv.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_18sgopxpjcq86lwk.unsuppMessage(unsupported);
      var r = {};
      $_54lr1fw9jcq86lqv.each(required, function (req) {
        r[req] = $_88uun8wbjcq86lr5.constant(obj[req]);
      });
      $_54lr1fw9jcq86lqv.each(optional, function (opt) {
        r[opt] = $_88uun8wbjcq86lr5.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? $_2334kywajcq86lr3.some(obj[opt]) : $_2334kywajcq86lr3.none());
      });
      return r;
    };
  };

  var $_6nh3wxmjcq86lwg = {
    immutable: Immutable,
    immutableBag: MixedBag
  };

  var nu$6 = $_6nh3wxmjcq86lwg.immutableBag(['tag'], [
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
    return $_4y3hcjxfjcq86lvf.stringify(raw, null, 2);
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
  var $_4zss0zxljcq86lwc = {
    nu: nu$6,
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
  var nu$5 = $_6nh3wxmjcq86lwg.immutableBag([], fields);
  var derive$2 = function (settings) {
    var r = {};
    var keys = $_3jdnysx0jcq86lsz.keys(settings);
    $_54lr1fw9jcq86lqv.each(keys, function (key) {
      settings[key].each(function (v) {
        r[key] = v;
      });
    });
    return nu$5(r);
  };
  var modToStr = function (mod) {
    var raw = modToRaw(mod);
    return $_4y3hcjxfjcq86lvf.stringify(raw, null, 2);
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
        return $_1z89rrx6jcq86lub.wrap(key, arr2);
      });
    }, function (arr1) {
      return oArr2.fold(function () {
        return $_1z89rrx6jcq86lub.wrap(key, arr1);
      }, function (arr2) {
        return $_1z89rrx6jcq86lub.wrap(key, arr2);
      });
    });
  };
  var merge$1 = function (defnA, mod) {
    var raw = $_9ymhaxwyjcq86lsv.deepMerge({
      tag: defnA.tag(),
      classes: mod.classes().getOr([]).concat(defnA.classes().getOr([])),
      attributes: $_9ymhaxwyjcq86lsv.merge(defnA.attributes().getOr({}), mod.attributes().getOr({})),
      styles: $_9ymhaxwyjcq86lsv.merge(defnA.styles().getOr({}), mod.styles().getOr({}))
    }, mod.innerHtml().or(defnA.innerHtml()).map(function (innerHtml) {
      return $_1z89rrx6jcq86lub.wrap('innerHtml', innerHtml);
    }).getOr({}), clashingOptArrays('domChildren', mod.domChildren(), defnA.domChildren()), clashingOptArrays('defChildren', mod.defChildren(), defnA.defChildren()), mod.value().or(defnA.value()).map(function (value) {
      return $_1z89rrx6jcq86lub.wrap('value', value);
    }).getOr({}));
    return $_4zss0zxljcq86lwc.nu(raw);
  };
  var $_eej9y1xkjcq86lvz = {
    nu: nu$5,
    derive: derive$2,
    merge: merge$1,
    modToStr: modToStr,
    modToRaw: modToRaw
  };

  var executeEvent = function (bConfig, bState, executor) {
    return $_fpvm9zw6jcq86lqb.runOnExecute(function (component) {
      executor(component, bConfig, bState);
    });
  };
  var loadEvent = function (bConfig, bState, f) {
    return $_fpvm9zw6jcq86lqb.runOnInit(function (component, simulatedEvent) {
      f(component, bConfig, bState);
    });
  };
  var create$1 = function (schema, name, active, apis, extra, state) {
    var configSchema = $_8bk232xhjcq86lvj.objOfOnly(schema);
    var schemaSchema = $_2a8tl5x2jcq86ltk.optionObjOf(name, [$_2a8tl5x2jcq86ltk.optionObjOfOnly('config', schema)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var createModes$1 = function (modes, name, active, apis, extra, state) {
    var configSchema = modes;
    var schemaSchema = $_2a8tl5x2jcq86ltk.optionObjOf(name, [$_2a8tl5x2jcq86ltk.optionOf('config', modes)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var wrapApi = function (bName, apiFunction, apiName) {
    var f = function (component) {
      var args = arguments;
      return component.config({ name: $_88uun8wbjcq86lr5.constant(bName) }).fold(function () {
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
    return $_5vx13sxjjcq86lvu.markAsBehaviourApi(f, apiName, apiFunction);
  };
  var revokeBehaviour = function (name) {
    return {
      key: name,
      value: undefined
    };
  };
  var doCreate = function (configSchema, schemaSchema, name, active, apis, extra, state) {
    var getConfig = function (info) {
      return $_1z89rrx6jcq86lub.hasKey(info, name) ? info[name]() : $_2334kywajcq86lr3.none();
    };
    var wrappedApis = $_3jdnysx0jcq86lsz.map(apis, function (apiF, apiName) {
      return wrapApi(name, apiF, apiName);
    });
    var wrappedExtra = $_3jdnysx0jcq86lsz.map(extra, function (extraF, extraName) {
      return $_5vx13sxjjcq86lvu.markAsExtraApi(extraF, extraName);
    });
    var me = $_9ymhaxwyjcq86lsv.deepMerge(wrappedExtra, wrappedApis, {
      revoke: $_88uun8wbjcq86lr5.curry(revokeBehaviour, name),
      config: function (spec) {
        var prepared = $_8bk232xhjcq86lvj.asStructOrDie(name + '-config', configSchema, spec);
        return {
          key: name,
          value: {
            config: prepared,
            me: me,
            configAsRaw: $_8llfvcwhjcq86lre.cached(function () {
              return $_8bk232xhjcq86lvj.asRawOrDie(name + '-config', configSchema, spec);
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
          return $_1z89rrx6jcq86lub.readOptFrom(active, 'exhibit').map(function (exhibitor) {
            return exhibitor(base, behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr($_eej9y1xkjcq86lvz.nu({}));
      },
      name: function () {
        return name;
      },
      handlers: function (info) {
        return getConfig(info).bind(function (behaviourInfo) {
          return $_1z89rrx6jcq86lub.readOptFrom(active, 'events').map(function (events) {
            return events(behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr({});
      }
    });
    return me;
  };
  var $_gfgf52w5jcq86lps = {
    executeEvent: executeEvent,
    loadEvent: loadEvent,
    create: create$1,
    createModes: createModes$1
  };

  var base = function (handleUnsupported, required) {
    return baseWith(handleUnsupported, required, {
      validate: $_d1yi3wwzjcq86lsx.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_18sgopxpjcq86lwk.validateStrArr('required', required);
    $_18sgopxpjcq86lwk.checkDupes(required);
    return function (obj) {
      var keys = $_3jdnysx0jcq86lsz.keys(obj);
      var allReqd = $_54lr1fw9jcq86lqv.forall(required, function (req) {
        return $_54lr1fw9jcq86lqv.contains(keys, req);
      });
      if (!allReqd)
        $_18sgopxpjcq86lwk.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_54lr1fw9jcq86lqv.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_18sgopxpjcq86lwk.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_54lr1fw9jcq86lqv.filter(keys, function (key) {
      return !$_54lr1fw9jcq86lqv.contains(required, key);
    });
    if (unsupported.length > 0)
      $_18sgopxpjcq86lwk.unsuppMessage(unsupported);
  };
  var allowExtra = $_88uun8wbjcq86lr5.noop;
  var $_fa8vfuxsjcq86lws = {
    exactly: $_88uun8wbjcq86lr5.curry(base, handleExact),
    ensure: $_88uun8wbjcq86lr5.curry(base, allowExtra),
    ensureWith: $_88uun8wbjcq86lr5.curry(baseWith, allowExtra)
  };

  var BehaviourState = $_fa8vfuxsjcq86lws.ensure(['readState']);

  var init = function () {
    return BehaviourState({
      readState: function () {
        return 'No State required';
      }
    });
  };
  var $_ctyh8rxqjcq86lwp = { init: init };

  var derive = function (capabilities) {
    return $_1z89rrx6jcq86lub.wrapAll(capabilities);
  };
  var simpleSchema = $_8bk232xhjcq86lvj.objOfOnly([
    $_2a8tl5x2jcq86ltk.strict('fields'),
    $_2a8tl5x2jcq86ltk.strict('name'),
    $_2a8tl5x2jcq86ltk.defaulted('active', {}),
    $_2a8tl5x2jcq86ltk.defaulted('apis', {}),
    $_2a8tl5x2jcq86ltk.defaulted('extra', {}),
    $_2a8tl5x2jcq86ltk.defaulted('state', $_ctyh8rxqjcq86lwp)
  ]);
  var create = function (data) {
    var value = $_8bk232xhjcq86lvj.asRawOrDie('Creating behaviour: ' + data.name, simpleSchema, data);
    return $_gfgf52w5jcq86lps.create(value.fields, value.name, value.active, value.apis, value.extra, value.state);
  };
  var modeSchema = $_8bk232xhjcq86lvj.objOfOnly([
    $_2a8tl5x2jcq86ltk.strict('branchKey'),
    $_2a8tl5x2jcq86ltk.strict('branches'),
    $_2a8tl5x2jcq86ltk.strict('name'),
    $_2a8tl5x2jcq86ltk.defaulted('active', {}),
    $_2a8tl5x2jcq86ltk.defaulted('apis', {}),
    $_2a8tl5x2jcq86ltk.defaulted('extra', {}),
    $_2a8tl5x2jcq86ltk.defaulted('state', $_ctyh8rxqjcq86lwp)
  ]);
  var createModes = function (data) {
    var value = $_8bk232xhjcq86lvj.asRawOrDie('Creating behaviour: ' + data.name, modeSchema, data);
    return $_gfgf52w5jcq86lps.createModes($_8bk232xhjcq86lvj.choose(value.branchKey, value.branches), value.name, value.active, value.apis, value.extra, value.state);
  };
  var $_5q0i93w4jcq86lpj = {
    derive: derive,
    revoke: $_88uun8wbjcq86lr5.constant(undefined),
    noActive: $_88uun8wbjcq86lr5.constant({}),
    noApis: $_88uun8wbjcq86lr5.constant({}),
    noExtra: $_88uun8wbjcq86lr5.constant({}),
    noState: $_88uun8wbjcq86lr5.constant($_ctyh8rxqjcq86lwp),
    create: create,
    createModes: createModes
  };

  var Toggler = function (turnOff, turnOn, initial) {
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
  };

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
    return type(element) === $_aray7uwujcq86lsj.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_aray7uwujcq86lsj.ELEMENT);
  var isText = isType$1($_aray7uwujcq86lsj.TEXT);
  var isDocument = isType$1($_aray7uwujcq86lsj.DOCUMENT);
  var $_ggmo4uxxjcq86lxc = {
    name: name,
    type: type,
    value: value$2,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var rawSet = function (dom, key, value) {
    if ($_d1yi3wwzjcq86lsx.isString(value) || $_d1yi3wwzjcq86lsx.isBoolean(value) || $_d1yi3wwzjcq86lsx.isNumber(value)) {
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
    $_3jdnysx0jcq86lsz.each(attrs, function (v, k) {
      rawSet(dom, k, v);
    });
  };
  var get = function (element, key) {
    var v = element.dom().getAttribute(key);
    return v === null ? undefined : v;
  };
  var has$1 = function (element, key) {
    var dom = element.dom();
    return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
  };
  var remove$1 = function (element, key) {
    element.dom().removeAttribute(key);
  };
  var hasNone = function (element) {
    var attrs = element.dom().attributes;
    return attrs === undefined || attrs === null || attrs.length === 0;
  };
  var clone = function (element) {
    return $_54lr1fw9jcq86lqv.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has$1(source, attr) && !has$1(destination, attr))
      set(destination, attr, get(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_ggmo4uxxjcq86lxc.isElement(source) || !$_ggmo4uxxjcq86lxc.isElement(destination))
      return;
    $_54lr1fw9jcq86lqv.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_az3jjlxwjcq86lx1 = {
    clone: clone,
    set: set,
    setAll: setAll,
    get: get,
    has: has$1,
    remove: remove$1,
    hasNone: hasNone,
    transfer: transfer
  };

  var read$1 = function (element, attr) {
    var value = $_az3jjlxwjcq86lx1.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add$2 = function (element, attr, id) {
    var old = read$1(element, attr);
    var nu = old.concat([id]);
    $_az3jjlxwjcq86lx1.set(element, attr, nu.join(' '));
  };
  var remove$3 = function (element, attr, id) {
    var nu = $_54lr1fw9jcq86lqv.filter(read$1(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_az3jjlxwjcq86lx1.set(element, attr, nu.join(' '));
    else
      $_az3jjlxwjcq86lx1.remove(element, attr);
  };
  var $_8p1omjxzjcq86lxi = {
    read: read$1,
    add: add$2,
    remove: remove$3
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$1 = function (element) {
    return $_8p1omjxzjcq86lxi.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_8p1omjxzjcq86lxi.add(element, 'class', clazz);
  };
  var remove$2 = function (element, clazz) {
    return $_8p1omjxzjcq86lxi.remove(element, 'class', clazz);
  };
  var toggle$1 = function (element, clazz) {
    if ($_54lr1fw9jcq86lqv.contains(get$1(element), clazz)) {
      remove$2(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_iy6w1xyjcq86lxe = {
    get: get$1,
    add: add$1,
    remove: remove$2,
    toggle: toggle$1,
    supports: supports
  };

  var add = function (element, clazz) {
    if ($_iy6w1xyjcq86lxe.supports(element))
      element.dom().classList.add(clazz);
    else
      $_iy6w1xyjcq86lxe.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_iy6w1xyjcq86lxe.supports(element) ? element.dom().classList : $_iy6w1xyjcq86lxe.get(element);
    if (classList.length === 0) {
      $_az3jjlxwjcq86lx1.remove(element, 'class');
    }
  };
  var remove = function (element, clazz) {
    if ($_iy6w1xyjcq86lxe.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_iy6w1xyjcq86lxe.remove(element, clazz);
    cleanClass(element);
  };
  var toggle = function (element, clazz) {
    return $_iy6w1xyjcq86lxe.supports(element) ? element.dom().classList.toggle(clazz) : $_iy6w1xyjcq86lxe.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_iy6w1xyjcq86lxe.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_iy6w1xyjcq86lxe.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_iy6w1xyjcq86lxe.add(element, clazz);
    };
    return Toggler(off, on, has(element, clazz));
  };
  var has = function (element, clazz) {
    return $_iy6w1xyjcq86lxe.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_3nts6pxujcq86lwy = {
    add: add,
    remove: remove,
    toggle: toggle,
    toggler: toggler,
    has: has
  };

  var swap = function (element, addCls, removeCls) {
    $_3nts6pxujcq86lwy.remove(element, removeCls);
    $_3nts6pxujcq86lwy.add(element, addCls);
  };
  var toAlpha = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.alpha(), swapConfig.omega());
  };
  var toOmega = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.omega(), swapConfig.alpha());
  };
  var clear = function (component, swapConfig, swapState) {
    $_3nts6pxujcq86lwy.remove(component.element(), swapConfig.alpha());
    $_3nts6pxujcq86lwy.remove(component.element(), swapConfig.omega());
  };
  var isAlpha = function (component, swapConfig, swapState) {
    return $_3nts6pxujcq86lwy.has(component.element(), swapConfig.alpha());
  };
  var isOmega = function (component, swapConfig, swapState) {
    return $_3nts6pxujcq86lwy.has(component.element(), swapConfig.omega());
  };
  var $_87ow9oxtjcq86lwv = {
    toAlpha: toAlpha,
    toOmega: toOmega,
    isAlpha: isAlpha,
    isOmega: isOmega,
    clear: clear
  };

  var SwapSchema = [
    $_2a8tl5x2jcq86ltk.strict('alpha'),
    $_2a8tl5x2jcq86ltk.strict('omega')
  ];

  var Swapping = $_5q0i93w4jcq86lpj.create({
    fields: SwapSchema,
    name: 'swapping',
    apis: $_87ow9oxtjcq86lwv
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
  var $_fupf3ty4jcq86ly9 = { toArray: toArray };

  var owner = function (element) {
    return $_96tjzawtjcq86lsc.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_96tjzawtjcq86lsc.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_96tjzawtjcq86lsc.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return $_2334kywajcq86lr3.from(dom.parentNode).map($_96tjzawtjcq86lsc.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_54lr1fw9jcq86lqv.findIndex(kin, function (elem) {
        return $_1mhuz1w8jcq86lql.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_d1yi3wwzjcq86lsx.isFunction(isRoot) ? isRoot : $_88uun8wbjcq86lr5.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_96tjzawtjcq86lsc.fromDom(rawParent);
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
      return $_54lr1fw9jcq86lqv.filter(elements, function (x) {
        return !$_1mhuz1w8jcq86lql.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return $_2334kywajcq86lr3.from(dom.offsetParent).map($_96tjzawtjcq86lsc.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return $_2334kywajcq86lr3.from(dom.previousSibling).map($_96tjzawtjcq86lsc.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return $_2334kywajcq86lr3.from(dom.nextSibling).map($_96tjzawtjcq86lsc.fromDom);
  };
  var prevSiblings = function (element) {
    return $_54lr1fw9jcq86lqv.reverse($_fupf3ty4jcq86ly9.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_fupf3ty4jcq86ly9.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_54lr1fw9jcq86lqv.map(dom.childNodes, $_96tjzawtjcq86lsc.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return $_2334kywajcq86lr3.from(children[index]).map($_96tjzawtjcq86lsc.fromDom);
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
  var spot = $_6nh3wxmjcq86lwg.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_212hfgy3jcq86ly0 = {
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
    var parent = $_212hfgy3jcq86ly0.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_212hfgy3jcq86ly0.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_212hfgy3jcq86ly0.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_212hfgy3jcq86ly0.firstChild(parent);
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
    $_212hfgy3jcq86ly0.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap$2 = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_dm5y40y2jcq86lxy = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap$2
  };

  var before$1 = function (marker, elements) {
    $_54lr1fw9jcq86lqv.each(elements, function (x) {
      $_dm5y40y2jcq86lxy.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_54lr1fw9jcq86lqv.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_dm5y40y2jcq86lxy.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_54lr1fw9jcq86lqv.each(elements.slice().reverse(), function (x) {
      $_dm5y40y2jcq86lxy.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_54lr1fw9jcq86lqv.each(elements, function (x) {
      $_dm5y40y2jcq86lxy.append(parent, x);
    });
  };
  var $_8vrrody6jcq86lyd = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_54lr1fw9jcq86lqv.each($_212hfgy3jcq86ly0.children(element), function (rogue) {
      remove$4(rogue);
    });
  };
  var remove$4 = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_212hfgy3jcq86ly0.children(wrapper);
    if (children.length > 0)
      $_8vrrody6jcq86lyd.before(wrapper, children);
    remove$4(wrapper);
  };
  var $_2c4yszy5jcq86lya = {
    empty: empty,
    remove: remove$4,
    unwrap: unwrap
  };

  var inBody = function (element) {
    var dom = $_ggmo4uxxjcq86lxc.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_8llfvcwhjcq86lre.cached(function () {
    return getBody($_96tjzawtjcq86lsc.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_96tjzawtjcq86lsc.fromDom(body);
  };
  var $_3ngt01y7jcq86lyf = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var fireDetaching = function (component) {
    $_36xfsfwvjcq86lsk.emit(component, $_d5i57fwwjcq86lsp.detachedFromDom());
    var children = component.components();
    $_54lr1fw9jcq86lqv.each(children, fireDetaching);
  };
  var fireAttaching = function (component) {
    var children = component.components();
    $_54lr1fw9jcq86lqv.each(children, fireAttaching);
    $_36xfsfwvjcq86lsk.emit(component, $_d5i57fwwjcq86lsp.attachedToDom());
  };
  var attach = function (parent, child) {
    attachWith(parent, child, $_dm5y40y2jcq86lxy.append);
  };
  var attachWith = function (parent, child, insertion) {
    parent.getSystem().addToWorld(child);
    insertion(parent.element(), child.element());
    if ($_3ngt01y7jcq86lyf.inBody(parent.element()))
      fireAttaching(child);
    parent.syncComponents();
  };
  var doDetach = function (component) {
    fireDetaching(component);
    $_2c4yszy5jcq86lya.remove(component.element());
    component.getSystem().removeFromWorld(component);
  };
  var detach = function (component) {
    var parent = $_212hfgy3jcq86ly0.parent(component.element()).bind(function (p) {
      return component.getSystem().getByDom(p).fold($_2334kywajcq86lr3.none, $_2334kywajcq86lr3.some);
    });
    doDetach(component);
    parent.each(function (p) {
      p.syncComponents();
    });
  };
  var detachChildren = function (component) {
    var subs = component.components();
    $_54lr1fw9jcq86lqv.each(subs, doDetach);
    $_2c4yszy5jcq86lya.empty(component.element());
    component.syncComponents();
  };
  var attachSystem = function (element, guiSystem) {
    $_dm5y40y2jcq86lxy.append(element, guiSystem.element());
    var children = $_212hfgy3jcq86ly0.children(guiSystem.element());
    $_54lr1fw9jcq86lqv.each(children, function (child) {
      guiSystem.getByDom(child).each(fireAttaching);
    });
  };
  var detachSystem = function (guiSystem) {
    var children = $_212hfgy3jcq86ly0.children(guiSystem.element());
    $_54lr1fw9jcq86lqv.each(children, function (child) {
      guiSystem.getByDom(child).each(fireDetaching);
    });
    $_2c4yszy5jcq86lya.remove(guiSystem.element());
  };
  var $_9qj153y1jcq86lxo = {
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
    return $_212hfgy3jcq86ly0.children($_96tjzawtjcq86lsc.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_54lr1fw9jcq86lqv.map(tags, function (x) {
      return $_96tjzawtjcq86lsc.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_54lr1fw9jcq86lqv.map(texts, function (x) {
      return $_96tjzawtjcq86lsc.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_54lr1fw9jcq86lqv.map(nodes, $_96tjzawtjcq86lsc.fromDom);
  };
  var $_3vgt2xycjcq86lz8 = {
    fromHtml: fromHtml$1,
    fromTags: fromTags,
    fromText: fromText$1,
    fromDom: fromDom$1
  };

  var get$2 = function (element) {
    return element.dom().innerHTML;
  };
  var set$1 = function (element, content) {
    var owner = $_212hfgy3jcq86ly0.owner(element);
    var docDom = owner.dom();
    var fragment = $_96tjzawtjcq86lsc.fromDom(docDom.createDocumentFragment());
    var contentElements = $_3vgt2xycjcq86lz8.fromHtml(content, docDom);
    $_8vrrody6jcq86lyd.append(fragment, contentElements);
    $_2c4yszy5jcq86lya.empty(element);
    $_dm5y40y2jcq86lxy.append(element, fragment);
  };
  var getOuter = function (element) {
    var container = $_96tjzawtjcq86lsc.fromTag('div');
    var clone = $_96tjzawtjcq86lsc.fromDom(element.dom().cloneNode(true));
    $_dm5y40y2jcq86lxy.append(container, clone);
    return get$2(container);
  };
  var $_gd7aqmybjcq86lz7 = {
    get: get$2,
    set: set$1,
    getOuter: getOuter
  };

  var clone$1 = function (original, deep) {
    return $_96tjzawtjcq86lsc.fromDom(original.dom().cloneNode(deep));
  };
  var shallow$1 = function (original) {
    return clone$1(original, false);
  };
  var deep$1 = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_96tjzawtjcq86lsc.fromTag(tag);
    var attributes = $_az3jjlxwjcq86lx1.clone(original);
    $_az3jjlxwjcq86lx1.setAll(nu, attributes);
    return nu;
  };
  var copy = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_212hfgy3jcq86ly0.children(deep$1(original));
    $_8vrrody6jcq86lyd.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_dm5y40y2jcq86lxy.before(original, nu);
    var children = $_212hfgy3jcq86ly0.children(original);
    $_8vrrody6jcq86lyd.append(nu, children);
    $_2c4yszy5jcq86lya.remove(original);
    return nu;
  };
  var $_bqvff2ydjcq86lzb = {
    shallow: shallow$1,
    shallowAs: shallowAs,
    deep: deep$1,
    copy: copy,
    mutate: mutate
  };

  var getHtml = function (element) {
    var clone = $_bqvff2ydjcq86lzb.shallow(element);
    return $_gd7aqmybjcq86lz7.getOuter(clone);
  };
  var $_97grhvyajcq86lz3 = { getHtml: getHtml };

  var element = function (elem) {
    return $_97grhvyajcq86lz3.getHtml(elem);
  };
  var $_yz1udy9jcq86lz2 = { element: element };

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
    return $_2334kywajcq86lr3.none();
  };
  var liftN = function (arr, f) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      if (x.isSome()) {
        r.push(x.getOrDie());
      } else {
        return $_2334kywajcq86lr3.none();
      }
    }
    return $_2334kywajcq86lr3.some(f.apply(null, r));
  };
  var $_5pzzdmyejcq86lzc = {
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
      return $_54lr1fw9jcq86lqv.find(lines, function (line) {
        return line.indexOf('alloy') > 0 && !$_54lr1fw9jcq86lqv.exists(path$1, function (p) {
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
    logEventCut: $_88uun8wbjcq86lr5.noop,
    logEventStopped: $_88uun8wbjcq86lr5.noop,
    logNoParent: $_88uun8wbjcq86lr5.noop,
    logEventNoHandlers: $_88uun8wbjcq86lr5.noop,
    logEventResponse: $_88uun8wbjcq86lr5.noop,
    write: $_88uun8wbjcq86lr5.noop
  };
  var monitorEvent = function (eventName, initialTarget, f) {
    var logger = debugging && (eventsMonitored === '*' || $_54lr1fw9jcq86lqv.contains(eventsMonitored, eventName)) ? function () {
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
          if ($_54lr1fw9jcq86lqv.contains([
              'mousemove',
              'mouseover',
              'mouseout',
              $_d5i57fwwjcq86lsp.systemInit()
            ], eventName))
            return;
          console.log(eventName, {
            event: eventName,
            target: initialTarget.dom(),
            sequence: $_54lr1fw9jcq86lqv.map(sequence, function (s) {
              if (!$_54lr1fw9jcq86lqv.contains([
                  'cut',
                  'stopped',
                  'response'
                ], s.outcome))
                return s.outcome;
              else
                return '{' + s.purpose + '} ' + s.outcome + ' at (' + $_yz1udy9jcq86lz2.element(s.target) + ')';
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
        '(element)': $_yz1udy9jcq86lz2.element(c.element()),
        '(initComponents)': $_54lr1fw9jcq86lqv.map(cSpec.components !== undefined ? cSpec.components : [], go),
        '(components)': $_54lr1fw9jcq86lqv.map(c.components(), go),
        '(bound.events)': $_3jdnysx0jcq86lsz.mapToArray(c.events(), function (v, k) {
          return [k];
        }).join(', '),
        '(behaviours)': cSpec.behaviours !== undefined ? $_3jdnysx0jcq86lsz.map(cSpec.behaviours, function (v, k) {
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
          var connections = $_3jdnysx0jcq86lsz.keys(systems);
          return $_5pzzdmyejcq86lzc.findMap(connections, function (conn) {
            var connGui = systems[conn];
            return connGui.getByUid(uid).toOption().map(function (comp) {
              return $_1z89rrx6jcq86lub.wrap($_yz1udy9jcq86lz2.element(comp.element()), inspectorInfo(comp));
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
  var $_7jrm2oy8jcq86lyl = {
    logHandler: logHandler,
    noLogger: $_88uun8wbjcq86lr5.constant(ignoreEvent),
    getTrace: getTrace,
    monitorEvent: monitorEvent,
    isDebugging: $_88uun8wbjcq86lr5.constant(debugging),
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

  var ClosestOrAncestor = function (is, ancestor, scope, a, isRoot) {
    return is(scope, a) ? $_2334kywajcq86lr3.some(scope) : $_d1yi3wwzjcq86lsx.isFunction(isRoot) && isRoot(scope) ? $_2334kywajcq86lr3.none() : ancestor(scope, a, isRoot);
  };

  var first$1 = function (predicate) {
    return descendant$1($_3ngt01y7jcq86lyf.body(), predicate);
  };
  var ancestor$1 = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_d1yi3wwzjcq86lsx.isFunction(isRoot) ? isRoot : $_88uun8wbjcq86lr5.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_96tjzawtjcq86lsc.fromDom(element);
      if (predicate(el))
        return $_2334kywajcq86lr3.some(el);
      else if (stop(el))
        break;
    }
    return $_2334kywajcq86lr3.none();
  };
  var closest$1 = function (scope, predicate, isRoot) {
    var is = function (scope) {
      return predicate(scope);
    };
    return ClosestOrAncestor(is, ancestor$1, scope, predicate, isRoot);
  };
  var sibling$1 = function (scope, predicate) {
    var element = scope.dom();
    if (!element.parentNode)
      return $_2334kywajcq86lr3.none();
    return child$2($_96tjzawtjcq86lsc.fromDom(element.parentNode), function (x) {
      return !$_1mhuz1w8jcq86lql.eq(scope, x) && predicate(x);
    });
  };
  var child$2 = function (scope, predicate) {
    var result = $_54lr1fw9jcq86lqv.find(scope.dom().childNodes, $_88uun8wbjcq86lr5.compose(predicate, $_96tjzawtjcq86lsc.fromDom));
    return result.map($_96tjzawtjcq86lsc.fromDom);
  };
  var descendant$1 = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_96tjzawtjcq86lsc.fromDom(element.childNodes[i])))
          return $_2334kywajcq86lr3.some($_96tjzawtjcq86lsc.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return $_2334kywajcq86lr3.none();
    };
    return descend(scope.dom());
  };
  var $_1kg0jyijcq86lzk = {
    first: first$1,
    ancestor: ancestor$1,
    closest: closest$1,
    sibling: sibling$1,
    child: child$2,
    descendant: descendant$1
  };

  var any$1 = function (predicate) {
    return $_1kg0jyijcq86lzk.first(predicate).isSome();
  };
  var ancestor = function (scope, predicate, isRoot) {
    return $_1kg0jyijcq86lzk.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest = function (scope, predicate, isRoot) {
    return $_1kg0jyijcq86lzk.closest(scope, predicate, isRoot).isSome();
  };
  var sibling = function (scope, predicate) {
    return $_1kg0jyijcq86lzk.sibling(scope, predicate).isSome();
  };
  var child$1 = function (scope, predicate) {
    return $_1kg0jyijcq86lzk.child(scope, predicate).isSome();
  };
  var descendant = function (scope, predicate) {
    return $_1kg0jyijcq86lzk.descendant(scope, predicate).isSome();
  };
  var $_3qpwlbyhjcq86lzj = {
    any: any$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };

  var focus = function (element) {
    element.dom().focus();
  };
  var blur = function (element) {
    element.dom().blur();
  };
  var hasFocus = function (element) {
    var doc = $_212hfgy3jcq86ly0.owner(element).dom();
    return element.dom() === doc.activeElement;
  };
  var active = function (_doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    return $_2334kywajcq86lr3.from(doc.activeElement).map($_96tjzawtjcq86lsc.fromDom);
  };
  var focusInside = function (element) {
    var doc = $_212hfgy3jcq86ly0.owner(element);
    var inside = active(doc).filter(function (a) {
      return $_3qpwlbyhjcq86lzj.closest(a, $_88uun8wbjcq86lr5.curry($_1mhuz1w8jcq86lql.eq, element));
    });
    inside.fold(function () {
      focus(element);
    }, $_88uun8wbjcq86lr5.noop);
  };
  var search = function (element) {
    return active($_212hfgy3jcq86ly0.owner(element)).filter(function (e) {
      return element.dom().contains(e.dom());
    });
  };
  var $_907xlxygjcq86lzf = {
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
  var $_258uobymjcq86lzw = { openLink: openLink };

  var isSkinDisabled = function (editor) {
    return editor.settings.skin === false;
  };
  var $_19f0oynjcq86lzx = { isSkinDisabled: isSkinDisabled };

  var formatChanged = 'formatChanged';
  var orientationChanged = 'orientationChanged';
  var dropupDismissed = 'dropupDismissed';
  var $_cgqukwyojcq86lzy = {
    formatChanged: $_88uun8wbjcq86lr5.constant(formatChanged),
    orientationChanged: $_88uun8wbjcq86lr5.constant(orientationChanged),
    dropupDismissed: $_88uun8wbjcq86lr5.constant(dropupDismissed)
  };

  var chooseChannels = function (channels, message) {
    return message.universal() ? channels : $_54lr1fw9jcq86lqv.filter(channels, function (ch) {
      return $_54lr1fw9jcq86lqv.contains(message.channels(), ch);
    });
  };
  var events = function (receiveConfig) {
    return $_fpvm9zw6jcq86lqb.derive([$_fpvm9zw6jcq86lqb.run($_d5i57fwwjcq86lsp.receive(), function (component, message) {
        var channelMap = receiveConfig.channels();
        var channels = $_3jdnysx0jcq86lsz.keys(channelMap);
        var targetChannels = chooseChannels(channels, message);
        $_54lr1fw9jcq86lqv.each(targetChannels, function (ch) {
          var channelInfo = channelMap[ch]();
          var channelSchema = channelInfo.schema();
          var data = $_8bk232xhjcq86lvj.asStructOrDie('channel[' + ch + '] data\nReceiver: ' + $_yz1udy9jcq86lz2.element(component.element()), channelSchema, message.data());
          channelInfo.onReceive()(component, data);
        });
      })]);
  };
  var $_4d4c3ayrjcq86m0h = { events: events };

  var menuFields = [
    $_2a8tl5x2jcq86ltk.strict('menu'),
    $_2a8tl5x2jcq86ltk.strict('selectedMenu')
  ];
  var itemFields = [
    $_2a8tl5x2jcq86ltk.strict('item'),
    $_2a8tl5x2jcq86ltk.strict('selectedItem')
  ];
  var schema = $_8bk232xhjcq86lvj.objOfOnly(itemFields.concat(menuFields));
  var itemSchema = $_8bk232xhjcq86lvj.objOfOnly(itemFields);
  var $_eqbfq0yujcq86m14 = {
    menuFields: $_88uun8wbjcq86lr5.constant(menuFields),
    itemFields: $_88uun8wbjcq86lr5.constant(itemFields),
    schema: $_88uun8wbjcq86lr5.constant(schema),
    itemSchema: $_88uun8wbjcq86lr5.constant(itemSchema)
  };

  var initSize = $_2a8tl5x2jcq86ltk.strictObjOf('initSize', [
    $_2a8tl5x2jcq86ltk.strict('numColumns'),
    $_2a8tl5x2jcq86ltk.strict('numRows')
  ]);
  var itemMarkers = function () {
    return $_2a8tl5x2jcq86ltk.strictOf('markers', $_eqbfq0yujcq86m14.itemSchema());
  };
  var menuMarkers = function () {
    return $_2a8tl5x2jcq86ltk.strictOf('markers', $_eqbfq0yujcq86m14.schema());
  };
  var tieredMenuMarkers = function () {
    return $_2a8tl5x2jcq86ltk.strictObjOf('markers', [$_2a8tl5x2jcq86ltk.strict('backgroundMenu')].concat($_eqbfq0yujcq86m14.menuFields()).concat($_eqbfq0yujcq86m14.itemFields()));
  };
  var markers = function (required) {
    return $_2a8tl5x2jcq86ltk.strictObjOf('markers', $_54lr1fw9jcq86lqv.map(required, $_2a8tl5x2jcq86ltk.strict));
  };
  var onPresenceHandler = function (label, fieldName, presence) {
    var trace = $_7jrm2oy8jcq86lyl.getTrace();
    return $_2a8tl5x2jcq86ltk.field(fieldName, fieldName, presence, $_8bk232xhjcq86lvj.valueOf(function (f) {
      return $_74ri01x8jcq86luv.value(function () {
        $_7jrm2oy8jcq86lyl.logHandler(label, fieldName, trace);
        return f.apply(undefined, arguments);
      });
    }));
  };
  var onHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_a08fe7x3jcq86ltp.defaulted($_88uun8wbjcq86lr5.noop));
  };
  var onKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_a08fe7x3jcq86ltp.defaulted($_2334kywajcq86lr3.none));
  };
  var onStrictHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_a08fe7x3jcq86ltp.strict());
  };
  var onStrictKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_a08fe7x3jcq86ltp.strict());
  };
  var output$1 = function (name, value) {
    return $_2a8tl5x2jcq86ltk.state(name, $_88uun8wbjcq86lr5.constant(value));
  };
  var snapshot$1 = function (name) {
    return $_2a8tl5x2jcq86ltk.state(name, $_88uun8wbjcq86lr5.identity);
  };
  var $_5l2dbmytjcq86m0r = {
    initSize: $_88uun8wbjcq86lr5.constant(initSize),
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

  var ReceivingSchema = [$_2a8tl5x2jcq86ltk.strictOf('channels', $_8bk232xhjcq86lvj.setOf($_74ri01x8jcq86luv.value, $_8bk232xhjcq86lvj.objOfOnly([
      $_5l2dbmytjcq86m0r.onStrictHandler('onReceive'),
      $_2a8tl5x2jcq86ltk.defaulted('schema', $_8bk232xhjcq86lvj.anyValue())
    ])))];

  var Receiving = $_5q0i93w4jcq86lpj.create({
    fields: ReceivingSchema,
    name: 'receiving',
    active: $_4d4c3ayrjcq86m0h
  });

  var updateAriaState = function (component, toggleConfig) {
    var pressed = isOn(component, toggleConfig);
    var ariaInfo = toggleConfig.aria();
    ariaInfo.update()(component, ariaInfo, pressed);
  };
  var toggle$2 = function (component, toggleConfig, toggleState) {
    $_3nts6pxujcq86lwy.toggle(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var on = function (component, toggleConfig, toggleState) {
    $_3nts6pxujcq86lwy.add(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var off = function (component, toggleConfig, toggleState) {
    $_3nts6pxujcq86lwy.remove(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var isOn = function (component, toggleConfig) {
    return $_3nts6pxujcq86lwy.has(component.element(), toggleConfig.toggleClass());
  };
  var onLoad = function (component, toggleConfig, toggleState) {
    var api = toggleConfig.selected() ? on : off;
    api(component, toggleConfig, toggleState);
  };
  var $_ec0ty3yxjcq86m1k = {
    onLoad: onLoad,
    toggle: toggle$2,
    isOn: isOn,
    on: on,
    off: off
  };

  var exhibit = function (base, toggleConfig, toggleState) {
    return $_eej9y1xkjcq86lvz.nu({});
  };
  var events$1 = function (toggleConfig, toggleState) {
    var execute = $_gfgf52w5jcq86lps.executeEvent(toggleConfig, toggleState, $_ec0ty3yxjcq86m1k.toggle);
    var load = $_gfgf52w5jcq86lps.loadEvent(toggleConfig, toggleState, $_ec0ty3yxjcq86m1k.onLoad);
    return $_fpvm9zw6jcq86lqb.derive($_54lr1fw9jcq86lqv.flatten([
      toggleConfig.toggleOnExecute() ? [execute] : [],
      [load]
    ]));
  };
  var $_zmohgywjcq86m1e = {
    exhibit: exhibit,
    events: events$1
  };

  var updatePressed = function (component, ariaInfo, status) {
    $_az3jjlxwjcq86lx1.set(component.element(), 'aria-pressed', status);
    if (ariaInfo.syncWithExpanded())
      updateExpanded(component, ariaInfo, status);
  };
  var updateSelected = function (component, ariaInfo, status) {
    $_az3jjlxwjcq86lx1.set(component.element(), 'aria-selected', status);
  };
  var updateChecked = function (component, ariaInfo, status) {
    $_az3jjlxwjcq86lx1.set(component.element(), 'aria-checked', status);
  };
  var updateExpanded = function (component, ariaInfo, status) {
    $_az3jjlxwjcq86lx1.set(component.element(), 'aria-expanded', status);
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
    var rawTag = $_ggmo4uxxjcq86lxc.name(elem);
    var suffix = rawTag === 'input' && $_az3jjlxwjcq86lx1.has(elem, 'type') ? ':' + $_az3jjlxwjcq86lx1.get(elem, 'type') : '';
    return $_1z89rrx6jcq86lub.readOptFrom(tagAttributes, rawTag + suffix);
  };
  var detectFromRole = function (component) {
    var elem = component.element();
    if (!$_az3jjlxwjcq86lx1.has(elem, 'role'))
      return $_2334kywajcq86lr3.none();
    else {
      var role = $_az3jjlxwjcq86lx1.get(elem, 'role');
      return $_1z89rrx6jcq86lub.readOptFrom(roleAttributes, role);
    }
  };
  var updateAuto = function (component, ariaInfo, status) {
    var attributes = detectFromRole(component).orThunk(function () {
      return detectFromTag(component);
    }).getOr([]);
    $_54lr1fw9jcq86lqv.each(attributes, function (attr) {
      $_az3jjlxwjcq86lx1.set(component.element(), attr, status);
    });
  };
  var $_3xp3glyzjcq86m1v = {
    updatePressed: updatePressed,
    updateSelected: updateSelected,
    updateChecked: updateChecked,
    updateExpanded: updateExpanded,
    updateAuto: updateAuto
  };

  var ToggleSchema = [
    $_2a8tl5x2jcq86ltk.defaulted('selected', false),
    $_2a8tl5x2jcq86ltk.strict('toggleClass'),
    $_2a8tl5x2jcq86ltk.defaulted('toggleOnExecute', true),
    $_2a8tl5x2jcq86ltk.defaultedOf('aria', { mode: 'none' }, $_8bk232xhjcq86lvj.choose('mode', {
      'pressed': [
        $_2a8tl5x2jcq86ltk.defaulted('syncWithExpanded', false),
        $_5l2dbmytjcq86m0r.output('update', $_3xp3glyzjcq86m1v.updatePressed)
      ],
      'checked': [$_5l2dbmytjcq86m0r.output('update', $_3xp3glyzjcq86m1v.updateChecked)],
      'expanded': [$_5l2dbmytjcq86m0r.output('update', $_3xp3glyzjcq86m1v.updateExpanded)],
      'selected': [$_5l2dbmytjcq86m0r.output('update', $_3xp3glyzjcq86m1v.updateSelected)],
      'none': [$_5l2dbmytjcq86m0r.output('update', $_88uun8wbjcq86lr5.noop)]
    }))
  ];

  var Toggling = $_5q0i93w4jcq86lpj.create({
    fields: ToggleSchema,
    name: 'toggling',
    active: $_zmohgywjcq86m1e,
    apis: $_ec0ty3yxjcq86m1k
  });

  var format = function (command, update) {
    return Receiving.config({
      channels: $_1z89rrx6jcq86lub.wrap($_cgqukwyojcq86lzy.formatChanged(), {
        onReceive: function (button, data) {
          if (data.command === command) {
            update(button, data.state);
          }
        }
      })
    });
  };
  var orientation = function (onReceive) {
    return Receiving.config({ channels: $_1z89rrx6jcq86lub.wrap($_cgqukwyojcq86lzy.orientationChanged(), { onReceive: onReceive }) });
  };
  var receive = function (channel, onReceive) {
    return {
      key: channel,
      value: { onReceive: onReceive }
    };
  };
  var $_g86iz4z0jcq86m25 = {
    format: format,
    orientation: orientation,
    receive: receive
  };

  var prefix = 'tinymce-mobile';
  var resolve$1 = function (p) {
    return prefix + '-' + p;
  };
  var $_3fu6k5z1jcq86m28 = {
    resolve: resolve$1,
    prefix: $_88uun8wbjcq86lr5.constant(prefix)
  };

  var exhibit$1 = function (base, unselectConfig) {
    return $_eej9y1xkjcq86lvz.nu({
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
    return $_fpvm9zw6jcq86lqb.derive([$_fpvm9zw6jcq86lqb.abort($_d9eamdwxjcq86lss.selectstart(), $_88uun8wbjcq86lr5.constant(true))]);
  };
  var $_8q1hb5z4jcq86m2h = {
    events: events$2,
    exhibit: exhibit$1
  };

  var Unselecting = $_5q0i93w4jcq86lpj.create({
    fields: [],
    name: 'unselecting',
    active: $_8q1hb5z4jcq86m2h
  });

  var focus$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_907xlxygjcq86lzf.focus(component.element());
      focusConfig.onFocus()(component);
    }
  };
  var blur$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_907xlxygjcq86lzf.blur(component.element());
    }
  };
  var isFocused = function (component) {
    return $_907xlxygjcq86lzf.hasFocus(component.element());
  };
  var $_97qjs2z8jcq86m2w = {
    focus: focus$1,
    blur: blur$1,
    isFocused: isFocused
  };

  var exhibit$2 = function (base, focusConfig) {
    if (focusConfig.ignore())
      return $_eej9y1xkjcq86lvz.nu({});
    else
      return $_eej9y1xkjcq86lvz.nu({ attributes: { 'tabindex': '-1' } });
  };
  var events$3 = function (focusConfig) {
    return $_fpvm9zw6jcq86lqb.derive([$_fpvm9zw6jcq86lqb.run($_d5i57fwwjcq86lsp.focus(), function (component, simulatedEvent) {
        $_97qjs2z8jcq86m2w.focus(component, focusConfig);
        simulatedEvent.stop();
      })]);
  };
  var $_9a6221z7jcq86m2u = {
    exhibit: exhibit$2,
    events: events$3
  };

  var FocusSchema = [
    $_5l2dbmytjcq86m0r.onHandler('onFocus'),
    $_2a8tl5x2jcq86ltk.defaulted('ignore', false)
  ];

  var Focusing = $_5q0i93w4jcq86lpj.create({
    fields: FocusSchema,
    name: 'focusing',
    active: $_9a6221z7jcq86m2u,
    apis: $_97qjs2z8jcq86m2w
  });

  var $_d131r5zejcq86m3r = {
    BACKSPACE: $_88uun8wbjcq86lr5.constant([8]),
    TAB: $_88uun8wbjcq86lr5.constant([9]),
    ENTER: $_88uun8wbjcq86lr5.constant([13]),
    SHIFT: $_88uun8wbjcq86lr5.constant([16]),
    CTRL: $_88uun8wbjcq86lr5.constant([17]),
    ALT: $_88uun8wbjcq86lr5.constant([18]),
    CAPSLOCK: $_88uun8wbjcq86lr5.constant([20]),
    ESCAPE: $_88uun8wbjcq86lr5.constant([27]),
    SPACE: $_88uun8wbjcq86lr5.constant([32]),
    PAGEUP: $_88uun8wbjcq86lr5.constant([33]),
    PAGEDOWN: $_88uun8wbjcq86lr5.constant([34]),
    END: $_88uun8wbjcq86lr5.constant([35]),
    HOME: $_88uun8wbjcq86lr5.constant([36]),
    LEFT: $_88uun8wbjcq86lr5.constant([37]),
    UP: $_88uun8wbjcq86lr5.constant([38]),
    RIGHT: $_88uun8wbjcq86lr5.constant([39]),
    DOWN: $_88uun8wbjcq86lr5.constant([40]),
    INSERT: $_88uun8wbjcq86lr5.constant([45]),
    DEL: $_88uun8wbjcq86lr5.constant([46]),
    META: $_88uun8wbjcq86lr5.constant([
      91,
      93,
      224
    ]),
    F10: $_88uun8wbjcq86lr5.constant([121])
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
  var $_8zq5vjzjjcq86m4o = {
    cycleBy: cycleBy,
    cap: cap
  };

  var all$3 = function (predicate) {
    return descendants$1($_3ngt01y7jcq86lyf.body(), predicate);
  };
  var ancestors$1 = function (scope, predicate, isRoot) {
    return $_54lr1fw9jcq86lqv.filter($_212hfgy3jcq86ly0.parents(scope, isRoot), predicate);
  };
  var siblings$2 = function (scope, predicate) {
    return $_54lr1fw9jcq86lqv.filter($_212hfgy3jcq86ly0.siblings(scope), predicate);
  };
  var children$2 = function (scope, predicate) {
    return $_54lr1fw9jcq86lqv.filter($_212hfgy3jcq86ly0.children(scope), predicate);
  };
  var descendants$1 = function (scope, predicate) {
    var result = [];
    $_54lr1fw9jcq86lqv.each($_212hfgy3jcq86ly0.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants$1(x, predicate));
    });
    return result;
  };
  var $_fnsb3tzljcq86m4q = {
    all: all$3,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  var all$2 = function (selector) {
    return $_3tq25qwsjcq86ls8.all(selector);
  };
  var ancestors = function (scope, selector, isRoot) {
    return $_fnsb3tzljcq86m4q.ancestors(scope, function (e) {
      return $_3tq25qwsjcq86ls8.is(e, selector);
    }, isRoot);
  };
  var siblings$1 = function (scope, selector) {
    return $_fnsb3tzljcq86m4q.siblings(scope, function (e) {
      return $_3tq25qwsjcq86ls8.is(e, selector);
    });
  };
  var children$1 = function (scope, selector) {
    return $_fnsb3tzljcq86m4q.children(scope, function (e) {
      return $_3tq25qwsjcq86ls8.is(e, selector);
    });
  };
  var descendants = function (scope, selector) {
    return $_3tq25qwsjcq86ls8.all(selector, scope);
  };
  var $_bfivwnzkjcq86m4p = {
    all: all$2,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var first$2 = function (selector) {
    return $_3tq25qwsjcq86ls8.one(selector);
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_1kg0jyijcq86lzk.ancestor(scope, function (e) {
      return $_3tq25qwsjcq86ls8.is(e, selector);
    }, isRoot);
  };
  var sibling$2 = function (scope, selector) {
    return $_1kg0jyijcq86lzk.sibling(scope, function (e) {
      return $_3tq25qwsjcq86ls8.is(e, selector);
    });
  };
  var child$3 = function (scope, selector) {
    return $_1kg0jyijcq86lzk.child(scope, function (e) {
      return $_3tq25qwsjcq86ls8.is(e, selector);
    });
  };
  var descendant$2 = function (scope, selector) {
    return $_3tq25qwsjcq86ls8.one(selector, scope);
  };
  var closest$2 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_3tq25qwsjcq86ls8.is, ancestor$2, scope, selector, isRoot);
  };
  var $_66bqgjzmjcq86m4s = {
    first: first$2,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var dehighlightAll = function (component, hConfig, hState) {
    var highlighted = $_bfivwnzkjcq86m4p.descendants(component.element(), '.' + hConfig.highlightClass());
    $_54lr1fw9jcq86lqv.each(highlighted, function (h) {
      $_3nts6pxujcq86lwy.remove(h, hConfig.highlightClass());
      component.getSystem().getByDom(h).each(function (target) {
        hConfig.onDehighlight()(component, target);
      });
    });
  };
  var dehighlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    $_3nts6pxujcq86lwy.remove(target.element(), hConfig.highlightClass());
    if (wasHighlighted)
      hConfig.onDehighlight()(component, target);
  };
  var highlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    dehighlightAll(component, hConfig, hState);
    $_3nts6pxujcq86lwy.add(target.element(), hConfig.highlightClass());
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
    var items = $_bfivwnzkjcq86m4p.descendants(component.element(), '.' + hConfig.itemClass());
    var itemComps = $_5pzzdmyejcq86lzc.cat($_54lr1fw9jcq86lqv.map(items, function (i) {
      return component.getSystem().getByDom(i).toOption();
    }));
    var targetComp = $_54lr1fw9jcq86lqv.find(itemComps, predicate);
    targetComp.each(function (c) {
      highlight(component, hConfig, hState, c);
    });
  };
  var isHighlighted = function (component, hConfig, hState, queryTarget) {
    return $_3nts6pxujcq86lwy.has(queryTarget.element(), hConfig.highlightClass());
  };
  var getHighlighted = function (component, hConfig, hState) {
    return $_66bqgjzmjcq86m4s.descendant(component.element(), '.' + hConfig.highlightClass()).bind(component.getSystem().getByDom);
  };
  var getByIndex = function (component, hConfig, hState, index) {
    var items = $_bfivwnzkjcq86m4p.descendants(component.element(), '.' + hConfig.itemClass());
    return $_2334kywajcq86lr3.from(items[index]).fold(function () {
      return $_74ri01x8jcq86luv.error('No element found with index ' + index);
    }, component.getSystem().getByDom);
  };
  var getFirst = function (component, hConfig, hState) {
    return $_66bqgjzmjcq86m4s.descendant(component.element(), '.' + hConfig.itemClass()).bind(component.getSystem().getByDom);
  };
  var getLast = function (component, hConfig, hState) {
    var items = $_bfivwnzkjcq86m4p.descendants(component.element(), '.' + hConfig.itemClass());
    var last = items.length > 0 ? $_2334kywajcq86lr3.some(items[items.length - 1]) : $_2334kywajcq86lr3.none();
    return last.bind(component.getSystem().getByDom);
  };
  var getDelta = function (component, hConfig, hState, delta) {
    var items = $_bfivwnzkjcq86m4p.descendants(component.element(), '.' + hConfig.itemClass());
    var current = $_54lr1fw9jcq86lqv.findIndex(items, function (item) {
      return $_3nts6pxujcq86lwy.has(item, hConfig.highlightClass());
    });
    return current.bind(function (selected) {
      var dest = $_8zq5vjzjjcq86m4o.cycleBy(selected, delta, 0, items.length - 1);
      return component.getSystem().getByDom(items[dest]);
    });
  };
  var getPrevious = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, -1);
  };
  var getNext = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, +1);
  };
  var $_fpr0gkzijcq86m46 = {
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
    $_2a8tl5x2jcq86ltk.strict('highlightClass'),
    $_2a8tl5x2jcq86ltk.strict('itemClass'),
    $_5l2dbmytjcq86m0r.onHandler('onHighlight'),
    $_5l2dbmytjcq86m0r.onHandler('onDehighlight')
  ];

  var Highlighting = $_5q0i93w4jcq86lpj.create({
    fields: HighlightSchema,
    name: 'highlighting',
    apis: $_fpr0gkzijcq86m46
  });

  var dom = function () {
    var get = function (component) {
      return $_907xlxygjcq86lzf.search(component.element());
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
      component.getSystem().getByDom(element).fold($_88uun8wbjcq86lr5.noop, function (item) {
        Highlighting.highlight(component, item);
      });
    };
    return {
      get: get,
      set: set
    };
  };
  var $_1tmjp6zgjcq86m3y = {
    dom: dom,
    highlights: highlights
  };

  var inSet = function (keys) {
    return function (event) {
      return $_54lr1fw9jcq86lqv.contains(keys, event.raw().which);
    };
  };
  var and = function (preds) {
    return function (event) {
      return $_54lr1fw9jcq86lqv.forall(preds, function (pred) {
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
  var $_1lzs5rzpjcq86m4z = {
    inSet: inSet,
    and: and,
    is: is$1,
    isShift: isShift,
    isNotShift: $_88uun8wbjcq86lr5.not(isShift),
    isControl: isControl,
    isNotControl: $_88uun8wbjcq86lr5.not(isControl)
  };

  var basic = function (key, action) {
    return {
      matches: $_1lzs5rzpjcq86m4z.is(key),
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
    var transition = $_54lr1fw9jcq86lqv.find(transitions, function (t) {
      return t.matches(event);
    });
    return transition.map(function (t) {
      return t.classification;
    });
  };
  var $_dinbdfzojcq86m4w = {
    basic: basic,
    rule: rule,
    choose: choose$2
  };

  var typical = function (infoSchema, stateInit, getRules, getEvents, getApis, optFocusIn) {
    var schema = function () {
      return infoSchema.concat([
        $_2a8tl5x2jcq86ltk.defaulted('focusManager', $_1tmjp6zgjcq86m3y.dom()),
        $_5l2dbmytjcq86m0r.output('handler', me),
        $_5l2dbmytjcq86m0r.output('state', stateInit)
      ]);
    };
    var processKey = function (component, simulatedEvent, keyingConfig, keyingState) {
      var rules = getRules(component, simulatedEvent, keyingConfig, keyingState);
      return $_dinbdfzojcq86m4w.choose(rules, simulatedEvent.event()).bind(function (rule) {
        return rule(component, simulatedEvent, keyingConfig, keyingState);
      });
    };
    var toEvents = function (keyingConfig, keyingState) {
      var otherEvents = getEvents(keyingConfig, keyingState);
      var keyEvents = $_fpvm9zw6jcq86lqb.derive(optFocusIn.map(function (focusIn) {
        return $_fpvm9zw6jcq86lqb.run($_d5i57fwwjcq86lsp.focus(), function (component, simulatedEvent) {
          focusIn(component, keyingConfig, keyingState, simulatedEvent);
          simulatedEvent.stop();
        });
      }).toArray().concat([$_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.keydown(), function (component, simulatedEvent) {
          processKey(component, simulatedEvent, keyingConfig, keyingState).each(function (_) {
            simulatedEvent.stop();
          });
        })]));
      return $_9ymhaxwyjcq86lsv.deepMerge(otherEvents, keyEvents);
    };
    var me = {
      schema: schema,
      processKey: processKey,
      toEvents: toEvents,
      toApis: getApis
    };
    return me;
  };
  var $_a0yu9zfjcq86m3t = { typical: typical };

  var cyclePrev = function (values, index, predicate) {
    var before = $_54lr1fw9jcq86lqv.reverse(values.slice(0, index));
    var after = $_54lr1fw9jcq86lqv.reverse(values.slice(index + 1));
    return $_54lr1fw9jcq86lqv.find(before.concat(after), predicate);
  };
  var tryPrev = function (values, index, predicate) {
    var before = $_54lr1fw9jcq86lqv.reverse(values.slice(0, index));
    return $_54lr1fw9jcq86lqv.find(before, predicate);
  };
  var cycleNext = function (values, index, predicate) {
    var before = values.slice(0, index);
    var after = values.slice(index + 1);
    return $_54lr1fw9jcq86lqv.find(after.concat(before), predicate);
  };
  var tryNext = function (values, index, predicate) {
    var after = values.slice(index + 1);
    return $_54lr1fw9jcq86lqv.find(after, predicate);
  };
  var $_9ihv4mzqjcq86m52 = {
    cyclePrev: cyclePrev,
    cycleNext: cycleNext,
    tryPrev: tryPrev,
    tryNext: tryNext
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_8793fjztjcq86m5l = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_d1yi3wwzjcq86lsx.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_8793fjztjcq86m5l.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_8793fjztjcq86m5l.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$3 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_3jdnysx0jcq86lsz.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_3jdnysx0jcq86lsz.each(css, function (v, k) {
      v.fold(function () {
        internalRemove(dom, k);
      }, function (value) {
        internalSet(dom, k, value);
      });
    });
  };
  var get$4 = function (element, property) {
    var dom = element.dom();
    var styles = window.getComputedStyle(dom);
    var r = styles.getPropertyValue(property);
    var v = r === '' && !$_3ngt01y7jcq86lyf.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_8793fjztjcq86m5l.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
  };
  var getRaw = function (element, property) {
    var dom = element.dom();
    var raw = getUnsafeProperty(dom, property);
    return $_2334kywajcq86lr3.from(raw).filter(function (r) {
      return r.length > 0;
    });
  };
  var getAllRaw = function (element) {
    var css = {};
    var dom = element.dom();
    if ($_8793fjztjcq86m5l.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_96tjzawtjcq86lsc.fromTag(tag);
    set$3(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$5 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_az3jjlxwjcq86lx1.has(element, 'style') && $_99go0uwpjcq86ls4.trim($_az3jjlxwjcq86lx1.get(element, 'style')) === '') {
      $_az3jjlxwjcq86lx1.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_az3jjlxwjcq86lx1.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_az3jjlxwjcq86lx1.remove : $_az3jjlxwjcq86lx1.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy$1 = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_8793fjztjcq86m5l.isSupported(sourceDom) && $_8793fjztjcq86m5l.isSupported(targetDom)) {
      targetDom.style.cssText = sourceDom.style.cssText;
    }
  };
  var reflow = function (e) {
    return e.dom().offsetWidth;
  };
  var transferOne$1 = function (source, destination, style) {
    getRaw(source, style).each(function (value) {
      if (getRaw(destination, style).isNone())
        set$3(destination, style, value);
    });
  };
  var transfer$1 = function (source, destination, styles) {
    if (!$_ggmo4uxxjcq86lxc.isElement(source) || !$_ggmo4uxxjcq86lxc.isElement(destination))
      return;
    $_54lr1fw9jcq86lqv.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_8xsijozsjcq86m57 = {
    copy: copy$1,
    set: set$3,
    preserve: preserve,
    setAll: setAll$1,
    setOptions: setOptions,
    remove: remove$5,
    get: get$4,
    getRaw: getRaw,
    getAllRaw: getAllRaw,
    isValidValue: isValidValue,
    reflow: reflow,
    transfer: transfer$1
  };

  var Dimension = function (name, getOffset) {
    var set = function (element, h) {
      if (!$_d1yi3wwzjcq86lsx.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_8793fjztjcq86m5l.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_8xsijozsjcq86m57.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_54lr1fw9jcq86lqv.foldl(properties, function (acc, property) {
        var val = $_8xsijozsjcq86m57.get(element, property);
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
  };

  var api = Dimension('height', function (element) {
    return $_3ngt01y7jcq86lyf.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
  });
  var set$2 = function (element, h) {
    api.set(element, h);
  };
  var get$3 = function (element) {
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
    $_8xsijozsjcq86m57.set(element, 'max-height', absMax + 'px');
  };
  var $_69bysazrjcq86m55 = {
    set: set$2,
    get: get$3,
    getOuter: getOuter$1,
    setMax: setMax
  };

  var create$2 = function (cyclicField) {
    var schema = [
      $_2a8tl5x2jcq86ltk.option('onEscape'),
      $_2a8tl5x2jcq86ltk.option('onEnter'),
      $_2a8tl5x2jcq86ltk.defaulted('selector', '[data-alloy-tabstop="true"]'),
      $_2a8tl5x2jcq86ltk.defaulted('firstTabstop', 0),
      $_2a8tl5x2jcq86ltk.defaulted('useTabstopAt', $_88uun8wbjcq86lr5.constant(true)),
      $_2a8tl5x2jcq86ltk.option('visibilitySelector')
    ].concat([cyclicField]);
    var isVisible = function (tabbingConfig, element) {
      var target = tabbingConfig.visibilitySelector().bind(function (sel) {
        return $_66bqgjzmjcq86m4s.closest(element, sel);
      }).getOr(element);
      return $_69bysazrjcq86m55.get(target) > 0;
    };
    var findInitial = function (component, tabbingConfig) {
      var tabstops = $_bfivwnzkjcq86m4p.descendants(component.element(), tabbingConfig.selector());
      var visibles = $_54lr1fw9jcq86lqv.filter(tabstops, function (elem) {
        return isVisible(tabbingConfig, elem);
      });
      return $_2334kywajcq86lr3.from(visibles[tabbingConfig.firstTabstop()]);
    };
    var findCurrent = function (component, tabbingConfig) {
      return tabbingConfig.focusManager().get(component).bind(function (elem) {
        return $_66bqgjzmjcq86m4s.closest(elem, tabbingConfig.selector());
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
        return tabbingConfig.cyclic() ? $_2334kywajcq86lr3.some(true) : $_2334kywajcq86lr3.none();
      }, function (target) {
        tabbingConfig.focusManager().set(component, target);
        return $_2334kywajcq86lr3.some(true);
      });
    };
    var go = function (component, simulatedEvent, tabbingConfig, cycle) {
      var tabstops = $_bfivwnzkjcq86m4p.descendants(component.element(), tabbingConfig.selector());
      return findCurrent(component, tabbingConfig).bind(function (tabstop) {
        var optStopIndex = $_54lr1fw9jcq86lqv.findIndex(tabstops, $_88uun8wbjcq86lr5.curry($_1mhuz1w8jcq86lql.eq, tabstop));
        return optStopIndex.bind(function (stopIndex) {
          return goFromTabstop(component, tabstops, stopIndex, tabbingConfig, cycle);
        });
      });
    };
    var goBackwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_9ihv4mzqjcq86m52.cyclePrev : $_9ihv4mzqjcq86m52.tryPrev;
      return go(component, simulatedEvent, tabbingConfig, navigate);
    };
    var goForwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_9ihv4mzqjcq86m52.cycleNext : $_9ihv4mzqjcq86m52.tryNext;
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
    var getRules = $_88uun8wbjcq86lr5.constant([
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.and([
        $_1lzs5rzpjcq86m4z.isShift,
        $_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.TAB())
      ]), goBackwards),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.TAB()), goForwards),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.ESCAPE()), exit),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.and([
        $_1lzs5rzpjcq86m4z.isNotShift,
        $_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.ENTER())
      ]), execute)
    ]);
    var getEvents = $_88uun8wbjcq86lr5.constant({});
    var getApis = $_88uun8wbjcq86lr5.constant({});
    return $_a0yu9zfjcq86m3t.typical(schema, $_ctyh8rxqjcq86lwp.init, getRules, getEvents, getApis, $_2334kywajcq86lr3.some(focusIn));
  };
  var $_g2bsgqzdjcq86m3f = { create: create$2 };

  var AcyclicType = $_g2bsgqzdjcq86m3f.create($_2a8tl5x2jcq86ltk.state('cyclic', $_88uun8wbjcq86lr5.constant(false)));

  var CyclicType = $_g2bsgqzdjcq86m3f.create($_2a8tl5x2jcq86ltk.state('cyclic', $_88uun8wbjcq86lr5.constant(true)));

  var inside = function (target) {
    return $_ggmo4uxxjcq86lxc.name(target) === 'input' && $_az3jjlxwjcq86lx1.get(target, 'type') !== 'radio' || $_ggmo4uxxjcq86lxc.name(target) === 'textarea';
  };
  var $_2s396bzxjcq86m63 = { inside: inside };

  var doDefaultExecute = function (component, simulatedEvent, focused) {
    $_36xfsfwvjcq86lsk.dispatch(component, focused, $_d5i57fwwjcq86lsp.execute());
    return $_2334kywajcq86lr3.some(true);
  };
  var defaultExecute = function (component, simulatedEvent, focused) {
    return $_2s396bzxjcq86m63.inside(focused) && $_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.SPACE())(simulatedEvent.event()) ? $_2334kywajcq86lr3.none() : doDefaultExecute(component, simulatedEvent, focused);
  };
  var $_afn4ttzyjcq86m67 = { defaultExecute: defaultExecute };

  var schema$1 = [
    $_2a8tl5x2jcq86ltk.defaulted('execute', $_afn4ttzyjcq86m67.defaultExecute),
    $_2a8tl5x2jcq86ltk.defaulted('useSpace', false),
    $_2a8tl5x2jcq86ltk.defaulted('useEnter', true),
    $_2a8tl5x2jcq86ltk.defaulted('useControlEnter', false),
    $_2a8tl5x2jcq86ltk.defaulted('useDown', false)
  ];
  var execute = function (component, simulatedEvent, executeConfig, executeState) {
    return executeConfig.execute()(component, simulatedEvent, component.element());
  };
  var getRules = function (component, simulatedEvent, executeConfig, executeState) {
    var spaceExec = executeConfig.useSpace() && !$_2s396bzxjcq86m63.inside(component.element()) ? $_d131r5zejcq86m3r.SPACE() : [];
    var enterExec = executeConfig.useEnter() ? $_d131r5zejcq86m3r.ENTER() : [];
    var downExec = executeConfig.useDown() ? $_d131r5zejcq86m3r.DOWN() : [];
    var execKeys = spaceExec.concat(enterExec).concat(downExec);
    return [$_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet(execKeys), execute)].concat(executeConfig.useControlEnter() ? [$_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.and([
        $_1lzs5rzpjcq86m4z.isControl,
        $_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.ENTER())
      ]), execute)] : []);
  };
  var getEvents = $_88uun8wbjcq86lr5.constant({});
  var getApis = $_88uun8wbjcq86lr5.constant({});
  var ExecutionType = $_a0yu9zfjcq86m3t.typical(schema$1, $_ctyh8rxqjcq86lwp.init, getRules, getEvents, getApis, $_2334kywajcq86lr3.none());

  var flatgrid = function (spec) {
    var dimensions = Cell($_2334kywajcq86lr3.none());
    var setGridSize = function (numRows, numColumns) {
      dimensions.set($_2334kywajcq86lr3.some({
        numRows: $_88uun8wbjcq86lr5.constant(numRows),
        numColumns: $_88uun8wbjcq86lr5.constant(numColumns)
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
      readState: $_88uun8wbjcq86lr5.constant({}),
      setGridSize: setGridSize,
      getNumRows: getNumRows,
      getNumColumns: getNumColumns
    });
  };
  var init$1 = function (spec) {
    return spec.state()(spec);
  };
  var $_a15l3h100jcq86m6h = {
    flatgrid: flatgrid,
    init: init$1
  };

  var onDirection = function (isLtr, isRtl) {
    return function (element) {
      return getDirection(element) === 'rtl' ? isRtl : isLtr;
    };
  };
  var getDirection = function (element) {
    return $_8xsijozsjcq86m57.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_e8jqde102jcq86m6p = {
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
    var movement = $_e8jqde102jcq86m6p.onDirection(moveLeft, moveRight);
    return useH(movement);
  };
  var east = function (moveLeft, moveRight) {
    var movement = $_e8jqde102jcq86m6p.onDirection(moveRight, moveLeft);
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
  var $_6pktym101jcq86m6m = {
    east: east,
    west: west,
    north: useV,
    south: useV,
    move: useV
  };

  var indexInfo = $_6nh3wxmjcq86lwg.immutableBag([
    'index',
    'candidates'
  ], []);
  var locate = function (candidates, predicate) {
    return $_54lr1fw9jcq86lqv.findIndex(candidates, predicate).map(function (index) {
      return indexInfo({
        index: index,
        candidates: candidates
      });
    });
  };
  var $_ab5o8d104jcq86m71 = { locate: locate };

  var visibilityToggler = function (element, property, hiddenValue, visibleValue) {
    var initial = $_8xsijozsjcq86m57.get(element, property);
    if (initial === undefined)
      initial = '';
    var value = initial === hiddenValue ? visibleValue : hiddenValue;
    var off = $_88uun8wbjcq86lr5.curry($_8xsijozsjcq86m57.set, element, property, initial);
    var on = $_88uun8wbjcq86lr5.curry($_8xsijozsjcq86m57.set, element, property, value);
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
  var $_5er7cy105jcq86m78 = {
    toggler: toggler$1,
    displayToggler: displayToggler,
    isVisible: isVisible
  };

  var locateVisible = function (container, current, selector) {
    var filter = $_5er7cy105jcq86m78.isVisible;
    return locateIn(container, current, selector, filter);
  };
  var locateIn = function (container, current, selector, filter) {
    var predicate = $_88uun8wbjcq86lr5.curry($_1mhuz1w8jcq86lql.eq, current);
    var candidates = $_bfivwnzkjcq86m4p.descendants(container, selector);
    var visible = $_54lr1fw9jcq86lqv.filter(candidates, $_5er7cy105jcq86m78.isVisible);
    return $_ab5o8d104jcq86m71.locate(visible, predicate);
  };
  var findIndex$2 = function (elements, target) {
    return $_54lr1fw9jcq86lqv.findIndex(elements, function (elem) {
      return $_1mhuz1w8jcq86lql.eq(target, elem);
    });
  };
  var $_a62err103jcq86m6q = {
    locateVisible: locateVisible,
    locateIn: locateIn,
    findIndex: findIndex$2
  };

  var withGrid = function (values, index, numCols, f) {
    var oldRow = Math.floor(index / numCols);
    var oldColumn = index % numCols;
    return f(oldRow, oldColumn).bind(function (address) {
      var newIndex = address.row() * numCols + address.column();
      return newIndex >= 0 && newIndex < values.length ? $_2334kywajcq86lr3.some(values[newIndex]) : $_2334kywajcq86lr3.none();
    });
  };
  var cycleHorizontal = function (values, index, numRows, numCols, delta) {
    return withGrid(values, index, numCols, function (oldRow, oldColumn) {
      var onLastRow = oldRow === numRows - 1;
      var colsInRow = onLastRow ? values.length - oldRow * numCols : numCols;
      var newColumn = $_8zq5vjzjjcq86m4o.cycleBy(oldColumn, delta, 0, colsInRow - 1);
      return $_2334kywajcq86lr3.some({
        row: $_88uun8wbjcq86lr5.constant(oldRow),
        column: $_88uun8wbjcq86lr5.constant(newColumn)
      });
    });
  };
  var cycleVertical = function (values, index, numRows, numCols, delta) {
    return withGrid(values, index, numCols, function (oldRow, oldColumn) {
      var newRow = $_8zq5vjzjjcq86m4o.cycleBy(oldRow, delta, 0, numRows - 1);
      var onLastRow = newRow === numRows - 1;
      var colsInRow = onLastRow ? values.length - newRow * numCols : numCols;
      var newCol = $_8zq5vjzjjcq86m4o.cap(oldColumn, 0, colsInRow - 1);
      return $_2334kywajcq86lr3.some({
        row: $_88uun8wbjcq86lr5.constant(newRow),
        column: $_88uun8wbjcq86lr5.constant(newCol)
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
  var $_4uoigm106jcq86m7c = {
    cycleDown: cycleDown,
    cycleUp: cycleUp,
    cycleLeft: cycleLeft,
    cycleRight: cycleRight
  };

  var schema$2 = [
    $_2a8tl5x2jcq86ltk.strict('selector'),
    $_2a8tl5x2jcq86ltk.defaulted('execute', $_afn4ttzyjcq86m67.defaultExecute),
    $_5l2dbmytjcq86m0r.onKeyboardHandler('onEscape'),
    $_2a8tl5x2jcq86ltk.defaulted('captureTab', false),
    $_5l2dbmytjcq86m0r.initSize()
  ];
  var focusIn = function (component, gridConfig, gridState) {
    $_66bqgjzmjcq86m4s.descendant(component.element(), gridConfig.selector()).each(function (first) {
      gridConfig.focusManager().set(component, first);
    });
  };
  var findCurrent = function (component, gridConfig) {
    return gridConfig.focusManager().get(component).bind(function (elem) {
      return $_66bqgjzmjcq86m4s.closest(elem, gridConfig.selector());
    });
  };
  var execute$1 = function (component, simulatedEvent, gridConfig, gridState) {
    return findCurrent(component, gridConfig).bind(function (focused) {
      return gridConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var doMove = function (cycle) {
    return function (element, focused, gridConfig, gridState) {
      return $_a62err103jcq86m6q.locateVisible(element, focused, gridConfig.selector()).bind(function (identified) {
        return cycle(identified.candidates(), identified.index(), gridState.getNumRows().getOr(gridConfig.initSize().numRows()), gridState.getNumColumns().getOr(gridConfig.initSize().numColumns()));
      });
    };
  };
  var handleTab = function (component, simulatedEvent, gridConfig, gridState) {
    return gridConfig.captureTab() ? $_2334kywajcq86lr3.some(true) : $_2334kywajcq86lr3.none();
  };
  var doEscape = function (component, simulatedEvent, gridConfig, gridState) {
    return gridConfig.onEscape()(component, simulatedEvent);
  };
  var moveLeft = doMove($_4uoigm106jcq86m7c.cycleLeft);
  var moveRight = doMove($_4uoigm106jcq86m7c.cycleRight);
  var moveNorth = doMove($_4uoigm106jcq86m7c.cycleUp);
  var moveSouth = doMove($_4uoigm106jcq86m7c.cycleDown);
  var getRules$1 = $_88uun8wbjcq86lr5.constant([
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.LEFT()), $_6pktym101jcq86m6m.west(moveLeft, moveRight)),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.RIGHT()), $_6pktym101jcq86m6m.east(moveLeft, moveRight)),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.UP()), $_6pktym101jcq86m6m.north(moveNorth)),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.DOWN()), $_6pktym101jcq86m6m.south(moveSouth)),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.and([
      $_1lzs5rzpjcq86m4z.isShift,
      $_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.TAB())
    ]), handleTab),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.and([
      $_1lzs5rzpjcq86m4z.isNotShift,
      $_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.TAB())
    ]), handleTab),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.ESCAPE()), doEscape),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.SPACE().concat($_d131r5zejcq86m3r.ENTER())), execute$1)
  ]);
  var getEvents$1 = $_88uun8wbjcq86lr5.constant({});
  var getApis$1 = {};
  var FlatgridType = $_a0yu9zfjcq86m3t.typical(schema$2, $_a15l3h100jcq86m6h.flatgrid, getRules$1, getEvents$1, getApis$1, $_2334kywajcq86lr3.some(focusIn));

  var horizontal = function (container, selector, current, delta) {
    return $_a62err103jcq86m6q.locateVisible(container, current, selector, $_88uun8wbjcq86lr5.constant(true)).bind(function (identified) {
      var index = identified.index();
      var candidates = identified.candidates();
      var newIndex = $_8zq5vjzjjcq86m4o.cycleBy(index, delta, 0, candidates.length - 1);
      return $_2334kywajcq86lr3.from(candidates[newIndex]);
    });
  };
  var $_dwxl63108jcq86m7t = { horizontal: horizontal };

  var schema$3 = [
    $_2a8tl5x2jcq86ltk.strict('selector'),
    $_2a8tl5x2jcq86ltk.defaulted('getInitial', $_2334kywajcq86lr3.none),
    $_2a8tl5x2jcq86ltk.defaulted('execute', $_afn4ttzyjcq86m67.defaultExecute),
    $_2a8tl5x2jcq86ltk.defaulted('executeOnMove', false)
  ];
  var findCurrent$1 = function (component, flowConfig) {
    return flowConfig.focusManager().get(component).bind(function (elem) {
      return $_66bqgjzmjcq86m4s.closest(elem, flowConfig.selector());
    });
  };
  var execute$2 = function (component, simulatedEvent, flowConfig) {
    return findCurrent$1(component, flowConfig).bind(function (focused) {
      return flowConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$1 = function (component, flowConfig) {
    flowConfig.getInitial()(component).or($_66bqgjzmjcq86m4s.descendant(component.element(), flowConfig.selector())).each(function (first) {
      flowConfig.focusManager().set(component, first);
    });
  };
  var moveLeft$1 = function (element, focused, info) {
    return $_dwxl63108jcq86m7t.horizontal(element, info.selector(), focused, -1);
  };
  var moveRight$1 = function (element, focused, info) {
    return $_dwxl63108jcq86m7t.horizontal(element, info.selector(), focused, +1);
  };
  var doMove$1 = function (movement) {
    return function (component, simulatedEvent, flowConfig) {
      return movement(component, simulatedEvent, flowConfig).bind(function () {
        return flowConfig.executeOnMove() ? execute$2(component, simulatedEvent, flowConfig) : $_2334kywajcq86lr3.some(true);
      });
    };
  };
  var getRules$2 = function (_) {
    return [
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.LEFT().concat($_d131r5zejcq86m3r.UP())), doMove$1($_6pktym101jcq86m6m.west(moveLeft$1, moveRight$1))),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.RIGHT().concat($_d131r5zejcq86m3r.DOWN())), doMove$1($_6pktym101jcq86m6m.east(moveLeft$1, moveRight$1))),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.ENTER()), execute$2),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.SPACE()), execute$2)
    ];
  };
  var getEvents$2 = $_88uun8wbjcq86lr5.constant({});
  var getApis$2 = $_88uun8wbjcq86lr5.constant({});
  var FlowType = $_a0yu9zfjcq86m3t.typical(schema$3, $_ctyh8rxqjcq86lwp.init, getRules$2, getEvents$2, getApis$2, $_2334kywajcq86lr3.some(focusIn$1));

  var outcome = $_6nh3wxmjcq86lwg.immutableBag([
    'rowIndex',
    'columnIndex',
    'cell'
  ], []);
  var toCell = function (matrix, rowIndex, columnIndex) {
    return $_2334kywajcq86lr3.from(matrix[rowIndex]).bind(function (row) {
      return $_2334kywajcq86lr3.from(row[columnIndex]).map(function (cell) {
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
    var newColIndex = $_8zq5vjzjjcq86m4o.cycleBy(startCol, deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var cycleVertical$1 = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_8zq5vjzjjcq86m4o.cycleBy(startRow, deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_8zq5vjzjjcq86m4o.cap(colIndex, 0, colsInNextRow - 1);
    return toCell(matrix, nextRowIndex, nextColIndex);
  };
  var moveHorizontal = function (matrix, rowIndex, startCol, deltaCol) {
    var row = matrix[rowIndex];
    var colsInRow = row.length;
    var newColIndex = $_8zq5vjzjjcq86m4o.cap(startCol + deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var moveVertical = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_8zq5vjzjjcq86m4o.cap(startRow + deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_8zq5vjzjjcq86m4o.cap(colIndex, 0, colsInNextRow - 1);
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
  var moveLeft$3 = function (matrix, startRow, startCol) {
    return moveHorizontal(matrix, startRow, startCol, -1);
  };
  var moveRight$3 = function (matrix, startRow, startCol) {
    return moveHorizontal(matrix, startRow, startCol, +1);
  };
  var moveUp = function (matrix, startRow, startCol) {
    return moveVertical(matrix, startCol, startRow, -1);
  };
  var moveDown = function (matrix, startRow, startCol) {
    return moveVertical(matrix, startCol, startRow, +1);
  };
  var $_5p1bmr10ajcq86m8d = {
    cycleRight: cycleRight$1,
    cycleLeft: cycleLeft$1,
    cycleUp: cycleUp$1,
    cycleDown: cycleDown$1,
    moveLeft: moveLeft$3,
    moveRight: moveRight$3,
    moveUp: moveUp,
    moveDown: moveDown
  };

  var schema$4 = [
    $_2a8tl5x2jcq86ltk.strictObjOf('selectors', [
      $_2a8tl5x2jcq86ltk.strict('row'),
      $_2a8tl5x2jcq86ltk.strict('cell')
    ]),
    $_2a8tl5x2jcq86ltk.defaulted('cycles', true),
    $_2a8tl5x2jcq86ltk.defaulted('previousSelector', $_2334kywajcq86lr3.none),
    $_2a8tl5x2jcq86ltk.defaulted('execute', $_afn4ttzyjcq86m67.defaultExecute)
  ];
  var focusIn$2 = function (component, matrixConfig) {
    var focused = matrixConfig.previousSelector()(component).orThunk(function () {
      var selectors = matrixConfig.selectors();
      return $_66bqgjzmjcq86m4s.descendant(component.element(), selectors.cell());
    });
    focused.each(function (cell) {
      matrixConfig.focusManager().set(component, cell);
    });
  };
  var execute$3 = function (component, simulatedEvent, matrixConfig) {
    return $_907xlxygjcq86lzf.search(component.element()).bind(function (focused) {
      return matrixConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var toMatrix = function (rows, matrixConfig) {
    return $_54lr1fw9jcq86lqv.map(rows, function (row) {
      return $_bfivwnzkjcq86m4p.descendants(row, matrixConfig.selectors().cell());
    });
  };
  var doMove$2 = function (ifCycle, ifMove) {
    return function (element, focused, matrixConfig) {
      var move = matrixConfig.cycles() ? ifCycle : ifMove;
      return $_66bqgjzmjcq86m4s.closest(focused, matrixConfig.selectors().row()).bind(function (inRow) {
        var cellsInRow = $_bfivwnzkjcq86m4p.descendants(inRow, matrixConfig.selectors().cell());
        return $_a62err103jcq86m6q.findIndex(cellsInRow, focused).bind(function (colIndex) {
          var allRows = $_bfivwnzkjcq86m4p.descendants(element, matrixConfig.selectors().row());
          return $_a62err103jcq86m6q.findIndex(allRows, inRow).bind(function (rowIndex) {
            var matrix = toMatrix(allRows, matrixConfig);
            return move(matrix, rowIndex, colIndex).map(function (next) {
              return next.cell();
            });
          });
        });
      });
    };
  };
  var moveLeft$2 = doMove$2($_5p1bmr10ajcq86m8d.cycleLeft, $_5p1bmr10ajcq86m8d.moveLeft);
  var moveRight$2 = doMove$2($_5p1bmr10ajcq86m8d.cycleRight, $_5p1bmr10ajcq86m8d.moveRight);
  var moveNorth$1 = doMove$2($_5p1bmr10ajcq86m8d.cycleUp, $_5p1bmr10ajcq86m8d.moveUp);
  var moveSouth$1 = doMove$2($_5p1bmr10ajcq86m8d.cycleDown, $_5p1bmr10ajcq86m8d.moveDown);
  var getRules$3 = $_88uun8wbjcq86lr5.constant([
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.LEFT()), $_6pktym101jcq86m6m.west(moveLeft$2, moveRight$2)),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.RIGHT()), $_6pktym101jcq86m6m.east(moveLeft$2, moveRight$2)),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.UP()), $_6pktym101jcq86m6m.north(moveNorth$1)),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.DOWN()), $_6pktym101jcq86m6m.south(moveSouth$1)),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.SPACE().concat($_d131r5zejcq86m3r.ENTER())), execute$3)
  ]);
  var getEvents$3 = $_88uun8wbjcq86lr5.constant({});
  var getApis$3 = $_88uun8wbjcq86lr5.constant({});
  var MatrixType = $_a0yu9zfjcq86m3t.typical(schema$4, $_ctyh8rxqjcq86lwp.init, getRules$3, getEvents$3, getApis$3, $_2334kywajcq86lr3.some(focusIn$2));

  var schema$5 = [
    $_2a8tl5x2jcq86ltk.strict('selector'),
    $_2a8tl5x2jcq86ltk.defaulted('execute', $_afn4ttzyjcq86m67.defaultExecute),
    $_2a8tl5x2jcq86ltk.defaulted('moveOnTab', false)
  ];
  var execute$4 = function (component, simulatedEvent, menuConfig) {
    return menuConfig.focusManager().get(component).bind(function (focused) {
      return menuConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$3 = function (component, menuConfig, simulatedEvent) {
    $_66bqgjzmjcq86m4s.descendant(component.element(), menuConfig.selector()).each(function (first) {
      menuConfig.focusManager().set(component, first);
    });
  };
  var moveUp$1 = function (element, focused, info) {
    return $_dwxl63108jcq86m7t.horizontal(element, info.selector(), focused, -1);
  };
  var moveDown$1 = function (element, focused, info) {
    return $_dwxl63108jcq86m7t.horizontal(element, info.selector(), focused, +1);
  };
  var fireShiftTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_6pktym101jcq86m6m.move(moveUp$1)(component, simulatedEvent, menuConfig) : $_2334kywajcq86lr3.none();
  };
  var fireTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_6pktym101jcq86m6m.move(moveDown$1)(component, simulatedEvent, menuConfig) : $_2334kywajcq86lr3.none();
  };
  var getRules$4 = $_88uun8wbjcq86lr5.constant([
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.UP()), $_6pktym101jcq86m6m.move(moveUp$1)),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.DOWN()), $_6pktym101jcq86m6m.move(moveDown$1)),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.and([
      $_1lzs5rzpjcq86m4z.isShift,
      $_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.TAB())
    ]), fireShiftTab),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.and([
      $_1lzs5rzpjcq86m4z.isNotShift,
      $_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.TAB())
    ]), fireTab),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.ENTER()), execute$4),
    $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.SPACE()), execute$4)
  ]);
  var getEvents$4 = $_88uun8wbjcq86lr5.constant({});
  var getApis$4 = $_88uun8wbjcq86lr5.constant({});
  var MenuType = $_a0yu9zfjcq86m3t.typical(schema$5, $_ctyh8rxqjcq86lwp.init, getRules$4, getEvents$4, getApis$4, $_2334kywajcq86lr3.some(focusIn$3));

  var schema$6 = [
    $_5l2dbmytjcq86m0r.onKeyboardHandler('onSpace'),
    $_5l2dbmytjcq86m0r.onKeyboardHandler('onEnter'),
    $_5l2dbmytjcq86m0r.onKeyboardHandler('onShiftEnter'),
    $_5l2dbmytjcq86m0r.onKeyboardHandler('onLeft'),
    $_5l2dbmytjcq86m0r.onKeyboardHandler('onRight'),
    $_5l2dbmytjcq86m0r.onKeyboardHandler('onTab'),
    $_5l2dbmytjcq86m0r.onKeyboardHandler('onShiftTab'),
    $_5l2dbmytjcq86m0r.onKeyboardHandler('onUp'),
    $_5l2dbmytjcq86m0r.onKeyboardHandler('onDown'),
    $_5l2dbmytjcq86m0r.onKeyboardHandler('onEscape'),
    $_2a8tl5x2jcq86ltk.option('focusIn')
  ];
  var getRules$5 = function (component, simulatedEvent, executeInfo) {
    return [
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.SPACE()), executeInfo.onSpace()),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.and([
        $_1lzs5rzpjcq86m4z.isNotShift,
        $_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.ENTER())
      ]), executeInfo.onEnter()),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.and([
        $_1lzs5rzpjcq86m4z.isShift,
        $_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.ENTER())
      ]), executeInfo.onShiftEnter()),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.and([
        $_1lzs5rzpjcq86m4z.isShift,
        $_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.TAB())
      ]), executeInfo.onShiftTab()),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.and([
        $_1lzs5rzpjcq86m4z.isNotShift,
        $_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.TAB())
      ]), executeInfo.onTab()),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.UP()), executeInfo.onUp()),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.DOWN()), executeInfo.onDown()),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.LEFT()), executeInfo.onLeft()),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.RIGHT()), executeInfo.onRight()),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.SPACE()), executeInfo.onSpace()),
      $_dinbdfzojcq86m4w.rule($_1lzs5rzpjcq86m4z.inSet($_d131r5zejcq86m3r.ESCAPE()), executeInfo.onEscape())
    ];
  };
  var focusIn$4 = function (component, executeInfo) {
    return executeInfo.focusIn().bind(function (f) {
      return f(component, executeInfo);
    });
  };
  var getEvents$5 = $_88uun8wbjcq86lr5.constant({});
  var getApis$5 = $_88uun8wbjcq86lr5.constant({});
  var SpecialType = $_a0yu9zfjcq86m3t.typical(schema$6, $_ctyh8rxqjcq86lwp.init, getRules$5, getEvents$5, getApis$5, $_2334kywajcq86lr3.some(focusIn$4));

  var $_2cihfezbjcq86m37 = {
    acyclic: AcyclicType.schema(),
    cyclic: CyclicType.schema(),
    flow: FlowType.schema(),
    flatgrid: FlatgridType.schema(),
    matrix: MatrixType.schema(),
    execution: ExecutionType.schema(),
    menu: MenuType.schema(),
    special: SpecialType.schema()
  };

  var Keying = $_5q0i93w4jcq86lpj.createModes({
    branchKey: 'mode',
    branches: $_2cihfezbjcq86m37,
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
        if (!$_1z89rrx6jcq86lub.hasKey(keyState, 'setGridSize')) {
          console.error('Layout does not support setGridSize');
        } else {
          keyState.setGridSize(numRows, numColumns);
        }
      }
    },
    state: $_a15l3h100jcq86m6h
  });

  var field$1 = function (name, forbidden) {
    return $_2a8tl5x2jcq86ltk.defaultedObjOf(name, {}, $_54lr1fw9jcq86lqv.map(forbidden, function (f) {
      return $_2a8tl5x2jcq86ltk.forbid(f.name(), 'Cannot configure ' + f.name() + ' for ' + name);
    }).concat([$_2a8tl5x2jcq86ltk.state('dump', $_88uun8wbjcq86lr5.identity)]));
  };
  var get$5 = function (data) {
    return data.dump();
  };
  var $_flsnpp10djcq86m91 = {
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
  var $_f0a0c310gjcq86m9k = { generate: generate$1 };

  var premadeTag = $_f0a0c310gjcq86m9k.generate('alloy-premade');
  var apiConfig = $_f0a0c310gjcq86m9k.generate('api');
  var premade = function (comp) {
    return $_1z89rrx6jcq86lub.wrap(premadeTag, comp);
  };
  var getPremade = function (spec) {
    return $_1z89rrx6jcq86lub.readOptFrom(spec, premadeTag);
  };
  var makeApi = function (f) {
    return $_5vx13sxjjcq86lvu.markAsSketchApi(function (component) {
      var args = Array.prototype.slice.call(arguments, 0);
      var spi = component.config(apiConfig);
      return f.apply(undefined, [spi].concat(args));
    }, f);
  };
  var $_2sollz10fjcq86m9e = {
    apiConfig: $_88uun8wbjcq86lr5.constant(apiConfig),
    makeApi: makeApi,
    premade: premade,
    getPremade: getPremade
  };

  var adt$2 = $_9gltwzx4jcq86lts.generate([
    { required: ['data'] },
    { external: ['data'] },
    { optional: ['data'] },
    { group: ['data'] }
  ]);
  var fFactory = $_2a8tl5x2jcq86ltk.defaulted('factory', { sketch: $_88uun8wbjcq86lr5.identity });
  var fSchema = $_2a8tl5x2jcq86ltk.defaulted('schema', []);
  var fName = $_2a8tl5x2jcq86ltk.strict('name');
  var fPname = $_2a8tl5x2jcq86ltk.field('pname', 'pname', $_a08fe7x3jcq86ltp.defaultedThunk(function (typeSpec) {
    return '<alloy.' + $_f0a0c310gjcq86m9k.generate(typeSpec.name) + '>';
  }), $_8bk232xhjcq86lvj.anyValue());
  var fDefaults = $_2a8tl5x2jcq86ltk.defaulted('defaults', $_88uun8wbjcq86lr5.constant({}));
  var fOverrides = $_2a8tl5x2jcq86ltk.defaulted('overrides', $_88uun8wbjcq86lr5.constant({}));
  var requiredSpec = $_8bk232xhjcq86lvj.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var externalSpec = $_8bk232xhjcq86lvj.objOf([
    fFactory,
    fSchema,
    fName,
    fDefaults,
    fOverrides
  ]);
  var optionalSpec = $_8bk232xhjcq86lvj.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var groupSpec = $_8bk232xhjcq86lvj.objOf([
    fFactory,
    fSchema,
    fName,
    $_2a8tl5x2jcq86ltk.strict('unit'),
    fPname,
    fDefaults,
    fOverrides
  ]);
  var asNamedPart = function (part) {
    return part.fold($_2334kywajcq86lr3.some, $_2334kywajcq86lr3.none, $_2334kywajcq86lr3.some, $_2334kywajcq86lr3.some);
  };
  var name$1 = function (part) {
    var get = function (data) {
      return data.name();
    };
    return part.fold(get, get, get, get);
  };
  var asCommon = function (part) {
    return part.fold($_88uun8wbjcq86lr5.identity, $_88uun8wbjcq86lr5.identity, $_88uun8wbjcq86lr5.identity, $_88uun8wbjcq86lr5.identity);
  };
  var convert = function (adtConstructor, partSpec) {
    return function (spec) {
      var data = $_8bk232xhjcq86lvj.asStructOrDie('Converting part type', partSpec, spec);
      return adtConstructor(data);
    };
  };
  var $_8pawjq10kjcq86mak = {
    required: convert(adt$2.required, requiredSpec),
    external: convert(adt$2.external, externalSpec),
    optional: convert(adt$2.optional, optionalSpec),
    group: convert(adt$2.group, groupSpec),
    asNamedPart: asNamedPart,
    name: name$1,
    asCommon: asCommon,
    original: $_88uun8wbjcq86lr5.constant('entirety')
  };

  var placeholder = 'placeholder';
  var adt$3 = $_9gltwzx4jcq86lts.generate([
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
    return $_54lr1fw9jcq86lqv.contains([placeholder], uiType);
  };
  var subPlaceholder = function (owner, detail, compSpec, placeholders) {
    if (owner.exists(function (o) {
        return o !== compSpec.owner;
      }))
      return adt$3.single(true, $_88uun8wbjcq86lr5.constant(compSpec));
    return $_1z89rrx6jcq86lub.readOptFrom(placeholders, compSpec.name).fold(function () {
      throw new Error('Unknown placeholder component: ' + compSpec.name + '\nKnown: [' + $_3jdnysx0jcq86lsz.keys(placeholders) + ']\nNamespace: ' + owner.getOr('none') + '\nSpec: ' + $_4y3hcjxfjcq86lvf.stringify(compSpec, null, 2));
    }, function (newSpec) {
      return newSpec.replace();
    });
  };
  var scan = function (owner, detail, compSpec, placeholders) {
    if (compSpec.uiType === placeholder)
      return subPlaceholder(owner, detail, compSpec, placeholders);
    else
      return adt$3.single(false, $_88uun8wbjcq86lr5.constant(compSpec));
  };
  var substitute = function (owner, detail, compSpec, placeholders) {
    var base = scan(owner, detail, compSpec, placeholders);
    return base.fold(function (req, valueThunk) {
      var value = valueThunk(detail, compSpec.config, compSpec.validated);
      var childSpecs = $_1z89rrx6jcq86lub.readOptFrom(value, 'components').getOr([]);
      var substituted = $_54lr1fw9jcq86lqv.bind(childSpecs, function (c) {
        return substitute(owner, detail, c, placeholders);
      });
      return [$_9ymhaxwyjcq86lsv.deepMerge(value, { components: substituted })];
    }, function (req, valuesThunk) {
      var values = valuesThunk(detail, compSpec.config, compSpec.validated);
      return values;
    });
  };
  var substituteAll = function (owner, detail, components, placeholders) {
    return $_54lr1fw9jcq86lqv.bind(components, function (c) {
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
      name: $_88uun8wbjcq86lr5.constant(label),
      required: required,
      used: used,
      replace: replace
    };
  };
  var substitutePlaces = function (owner, detail, components, placeholders) {
    var ps = $_3jdnysx0jcq86lsz.map(placeholders, function (ph, name) {
      return oneReplace(name, ph);
    });
    var outcome = substituteAll(owner, detail, components, ps);
    $_3jdnysx0jcq86lsz.each(ps, function (p) {
      if (p.used() === false && p.required()) {
        throw new Error('Placeholder: ' + p.name() + ' was not found in components list\nNamespace: ' + owner.getOr('none') + '\nComponents: ' + $_4y3hcjxfjcq86lvf.stringify(detail.components(), null, 2));
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
  var $_eqzo0g10ljcq86maw = {
    single: adt$3.single,
    multiple: adt$3.multiple,
    isSubstitute: isSubstitute,
    placeholder: $_88uun8wbjcq86lr5.constant(placeholder),
    substituteAll: substituteAll,
    substitutePlaces: substitutePlaces,
    singleReplace: singleReplace
  };

  var combine = function (detail, data, partSpec, partValidated) {
    var spec = partSpec;
    return $_9ymhaxwyjcq86lsv.deepMerge(data.defaults()(detail, partSpec, partValidated), partSpec, { uid: detail.partUids()[data.name()] }, data.overrides()(detail, partSpec, partValidated), { 'debug.sketcher': $_1z89rrx6jcq86lub.wrap('part-' + data.name(), spec) });
  };
  var subs = function (owner, detail, parts) {
    var internals = {};
    var externals = {};
    $_54lr1fw9jcq86lqv.each(parts, function (part) {
      part.fold(function (data) {
        internals[data.pname()] = $_eqzo0g10ljcq86maw.single(true, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        var partSpec = detail.parts()[data.name()]();
        externals[data.name()] = $_88uun8wbjcq86lr5.constant(combine(detail, data, partSpec[$_8pawjq10kjcq86mak.original()]()));
      }, function (data) {
        internals[data.pname()] = $_eqzo0g10ljcq86maw.single(false, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        internals[data.pname()] = $_eqzo0g10ljcq86maw.multiple(true, function (detail, _partSpec, _partValidated) {
          var units = detail[data.name()]();
          return $_54lr1fw9jcq86lqv.map(units, function (u) {
            return data.factory().sketch($_9ymhaxwyjcq86lsv.deepMerge(data.defaults()(detail, u), u, data.overrides()(detail, u)));
          });
        });
      });
    });
    return {
      internals: $_88uun8wbjcq86lr5.constant(internals),
      externals: $_88uun8wbjcq86lr5.constant(externals)
    };
  };
  var $_9mrub10jjcq86mae = { subs: subs };

  var generate$2 = function (owner, parts) {
    var r = {};
    $_54lr1fw9jcq86lqv.each(parts, function (part) {
      $_8pawjq10kjcq86mak.asNamedPart(part).each(function (np) {
        var g = doGenerateOne(owner, np.pname());
        r[np.name()] = function (config) {
          var validated = $_8bk232xhjcq86lvj.asRawOrDie('Part: ' + np.name() + ' in ' + owner, $_8bk232xhjcq86lvj.objOf(np.schema()), config);
          return $_9ymhaxwyjcq86lsv.deepMerge(g, {
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
      uiType: $_eqzo0g10ljcq86maw.placeholder(),
      owner: owner,
      name: pname
    };
  };
  var generateOne = function (owner, pname, config) {
    return {
      uiType: $_eqzo0g10ljcq86maw.placeholder(),
      owner: owner,
      name: pname,
      config: config,
      validated: {}
    };
  };
  var schemas = function (parts) {
    return $_54lr1fw9jcq86lqv.bind(parts, function (part) {
      return part.fold($_2334kywajcq86lr3.none, $_2334kywajcq86lr3.some, $_2334kywajcq86lr3.none, $_2334kywajcq86lr3.none).map(function (data) {
        return $_2a8tl5x2jcq86ltk.strictObjOf(data.name(), data.schema().concat([$_5l2dbmytjcq86m0r.snapshot($_8pawjq10kjcq86mak.original())]));
      }).toArray();
    });
  };
  var names = function (parts) {
    return $_54lr1fw9jcq86lqv.map(parts, $_8pawjq10kjcq86mak.name);
  };
  var substitutes = function (owner, detail, parts) {
    return $_9mrub10jjcq86mae.subs(owner, detail, parts);
  };
  var components = function (owner, detail, internals) {
    return $_eqzo0g10ljcq86maw.substitutePlaces($_2334kywajcq86lr3.some(owner), detail, detail.components(), internals);
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
    $_54lr1fw9jcq86lqv.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]);
    });
    return $_3jdnysx0jcq86lsz.map(r, $_88uun8wbjcq86lr5.constant);
  };
  var getAllParts = function (component, detail) {
    var system = component.getSystem();
    return $_3jdnysx0jcq86lsz.map(detail.partUids(), function (pUid, k) {
      return $_88uun8wbjcq86lr5.constant(system.getByUid(pUid));
    });
  };
  var getPartsOrDie = function (component, detail, partKeys) {
    var r = {};
    var uids = detail.partUids();
    var system = component.getSystem();
    $_54lr1fw9jcq86lqv.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]).getOrDie();
    });
    return $_3jdnysx0jcq86lsz.map(r, $_88uun8wbjcq86lr5.constant);
  };
  var defaultUids = function (baseUid, partTypes) {
    var partNames = names(partTypes);
    return $_1z89rrx6jcq86lub.wrapAll($_54lr1fw9jcq86lqv.map(partNames, function (pn) {
      return {
        key: pn,
        value: baseUid + '-' + pn
      };
    }));
  };
  var defaultUidsSchema = function (partTypes) {
    return $_2a8tl5x2jcq86ltk.field('partUids', 'partUids', $_a08fe7x3jcq86ltp.mergeWithThunk(function (spec) {
      return defaultUids(spec.uid, partTypes);
    }), $_8bk232xhjcq86lvj.anyValue());
  };
  var $_8jdkda10ijcq86m9x = {
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

  var prefix$2 = 'alloy-id-';
  var idAttr$1 = 'data-alloy-id';
  var $_feovc210njcq86mbp = {
    prefix: $_88uun8wbjcq86lr5.constant(prefix$2),
    idAttr: $_88uun8wbjcq86lr5.constant(idAttr$1)
  };

  var prefix$1 = $_feovc210njcq86mbp.prefix();
  var idAttr = $_feovc210njcq86mbp.idAttr();
  var write = function (label, elem) {
    var id = $_f0a0c310gjcq86m9k.generate(prefix$1 + label);
    $_az3jjlxwjcq86lx1.set(elem, idAttr, id);
    return id;
  };
  var writeOnly = function (elem, uid) {
    $_az3jjlxwjcq86lx1.set(elem, idAttr, uid);
  };
  var read$2 = function (elem) {
    var id = $_ggmo4uxxjcq86lxc.isElement(elem) ? $_az3jjlxwjcq86lx1.get(elem, idAttr) : null;
    return $_2334kywajcq86lr3.from(id);
  };
  var find$3 = function (container, id) {
    return $_66bqgjzmjcq86m4s.descendant(container, id);
  };
  var generate$3 = function (prefix) {
    return $_f0a0c310gjcq86m9k.generate(prefix);
  };
  var revoke = function (elem) {
    $_az3jjlxwjcq86lx1.remove(elem, idAttr);
  };
  var $_crpkad10mjcq86mbh = {
    revoke: revoke,
    write: write,
    writeOnly: writeOnly,
    read: read$2,
    find: find$3,
    generate: generate$3,
    attribute: $_88uun8wbjcq86lr5.constant(idAttr)
  };

  var getPartsSchema = function (partNames, _optPartNames, _owner) {
    var owner = _owner !== undefined ? _owner : 'Unknown owner';
    var fallbackThunk = function () {
      return [$_5l2dbmytjcq86m0r.output('partUids', {})];
    };
    var optPartNames = _optPartNames !== undefined ? _optPartNames : fallbackThunk();
    if (partNames.length === 0 && optPartNames.length === 0)
      return fallbackThunk();
    var partsSchema = $_2a8tl5x2jcq86ltk.strictObjOf('parts', $_54lr1fw9jcq86lqv.flatten([
      $_54lr1fw9jcq86lqv.map(partNames, $_2a8tl5x2jcq86ltk.strict),
      $_54lr1fw9jcq86lqv.map(optPartNames, function (optPart) {
        return $_2a8tl5x2jcq86ltk.defaulted(optPart, $_eqzo0g10ljcq86maw.single(false, function () {
          throw new Error('The optional part: ' + optPart + ' was not specified in the config, but it was used in components');
        }));
      })
    ]));
    var partUidsSchema = $_2a8tl5x2jcq86ltk.state('partUids', function (spec) {
      if (!$_1z89rrx6jcq86lub.hasKey(spec, 'parts')) {
        throw new Error('Part uid definition for owner: ' + owner + ' requires "parts"\nExpected parts: ' + partNames.join(', ') + '\nSpec: ' + $_4y3hcjxfjcq86lvf.stringify(spec, null, 2));
      }
      var uids = $_3jdnysx0jcq86lsz.map(spec.parts, function (v, k) {
        return $_1z89rrx6jcq86lub.readOptFrom(v, 'uid').getOrThunk(function () {
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
    var ps = partSchemas.length > 0 ? [$_2a8tl5x2jcq86ltk.strictObjOf('parts', partSchemas)] : [];
    return ps.concat([
      $_2a8tl5x2jcq86ltk.strict('uid'),
      $_2a8tl5x2jcq86ltk.defaulted('dom', {}),
      $_2a8tl5x2jcq86ltk.defaulted('components', []),
      $_5l2dbmytjcq86m0r.snapshot('originalSpec'),
      $_2a8tl5x2jcq86ltk.defaulted('debug.sketcher', {})
    ]).concat(partUidsSchemas);
  };
  var asRawOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, spec, partUidsSchemas);
    return $_8bk232xhjcq86lvj.asRawOrDie(label + ' [SpecSchema]', $_8bk232xhjcq86lvj.objOfOnly(baseS.concat(schema)), spec);
  };
  var asStructOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, partUidsSchemas, spec);
    return $_8bk232xhjcq86lvj.asStructOrDie(label + ' [SpecSchema]', $_8bk232xhjcq86lvj.objOfOnly(baseS.concat(schema)), spec);
  };
  var extend = function (builder, original, nu) {
    var newSpec = $_9ymhaxwyjcq86lsv.deepMerge(original, nu);
    return builder(newSpec);
  };
  var addBehaviours = function (original, behaviours) {
    return $_9ymhaxwyjcq86lsv.deepMerge(original, behaviours);
  };
  var $_bfaj3810ojcq86mbs = {
    asRawOrDie: asRawOrDie$1,
    asStructOrDie: asStructOrDie$1,
    addBehaviours: addBehaviours,
    getPartsSchema: getPartsSchema,
    extend: extend
  };

  var single$1 = function (owner, schema, factory, spec) {
    var specWithUid = supplyUid(spec);
    var detail = $_bfaj3810ojcq86mbs.asStructOrDie(owner, schema, specWithUid, [], []);
    return $_9ymhaxwyjcq86lsv.deepMerge(factory(detail, specWithUid), { 'debug.sketcher': $_1z89rrx6jcq86lub.wrap(owner, spec) });
  };
  var composite$1 = function (owner, schema, partTypes, factory, spec) {
    var specWithUid = supplyUid(spec);
    var partSchemas = $_8jdkda10ijcq86m9x.schemas(partTypes);
    var partUidsSchema = $_8jdkda10ijcq86m9x.defaultUidsSchema(partTypes);
    var detail = $_bfaj3810ojcq86mbs.asStructOrDie(owner, schema, specWithUid, partSchemas, [partUidsSchema]);
    var subs = $_8jdkda10ijcq86m9x.substitutes(owner, detail, partTypes);
    var components = $_8jdkda10ijcq86m9x.components(owner, detail, subs.internals());
    return $_9ymhaxwyjcq86lsv.deepMerge(factory(detail, components, specWithUid, subs.externals()), { 'debug.sketcher': $_1z89rrx6jcq86lub.wrap(owner, spec) });
  };
  var supplyUid = function (spec) {
    return $_9ymhaxwyjcq86lsv.deepMerge({ uid: $_crpkad10mjcq86mbh.generate('uid') }, spec);
  };
  var $_csxz5310hjcq86m9m = {
    supplyUid: supplyUid,
    single: single$1,
    composite: composite$1
  };

  var singleSchema = $_8bk232xhjcq86lvj.objOfOnly([
    $_2a8tl5x2jcq86ltk.strict('name'),
    $_2a8tl5x2jcq86ltk.strict('factory'),
    $_2a8tl5x2jcq86ltk.strict('configFields'),
    $_2a8tl5x2jcq86ltk.defaulted('apis', {}),
    $_2a8tl5x2jcq86ltk.defaulted('extraApis', {})
  ]);
  var compositeSchema = $_8bk232xhjcq86lvj.objOfOnly([
    $_2a8tl5x2jcq86ltk.strict('name'),
    $_2a8tl5x2jcq86ltk.strict('factory'),
    $_2a8tl5x2jcq86ltk.strict('configFields'),
    $_2a8tl5x2jcq86ltk.strict('partFields'),
    $_2a8tl5x2jcq86ltk.defaulted('apis', {}),
    $_2a8tl5x2jcq86ltk.defaulted('extraApis', {})
  ]);
  var single = function (rawConfig) {
    var config = $_8bk232xhjcq86lvj.asRawOrDie('Sketcher for ' + rawConfig.name, singleSchema, rawConfig);
    var sketch = function (spec) {
      return $_csxz5310hjcq86m9m.single(config.name, config.configFields, config.factory, spec);
    };
    var apis = $_3jdnysx0jcq86lsz.map(config.apis, $_2sollz10fjcq86m9e.makeApi);
    var extraApis = $_3jdnysx0jcq86lsz.map(config.extraApis, function (f, k) {
      return $_5vx13sxjjcq86lvu.markAsExtraApi(f, k);
    });
    return $_9ymhaxwyjcq86lsv.deepMerge({
      name: $_88uun8wbjcq86lr5.constant(config.name),
      partFields: $_88uun8wbjcq86lr5.constant([]),
      configFields: $_88uun8wbjcq86lr5.constant(config.configFields),
      sketch: sketch
    }, apis, extraApis);
  };
  var composite = function (rawConfig) {
    var config = $_8bk232xhjcq86lvj.asRawOrDie('Sketcher for ' + rawConfig.name, compositeSchema, rawConfig);
    var sketch = function (spec) {
      return $_csxz5310hjcq86m9m.composite(config.name, config.configFields, config.partFields, config.factory, spec);
    };
    var parts = $_8jdkda10ijcq86m9x.generate(config.name, config.partFields);
    var apis = $_3jdnysx0jcq86lsz.map(config.apis, $_2sollz10fjcq86m9e.makeApi);
    var extraApis = $_3jdnysx0jcq86lsz.map(config.extraApis, function (f, k) {
      return $_5vx13sxjjcq86lvu.markAsExtraApi(f, k);
    });
    return $_9ymhaxwyjcq86lsv.deepMerge({
      name: $_88uun8wbjcq86lr5.constant(config.name),
      partFields: $_88uun8wbjcq86lr5.constant(config.partFields),
      configFields: $_88uun8wbjcq86lr5.constant(config.configFields),
      sketch: sketch,
      parts: $_88uun8wbjcq86lr5.constant(parts)
    }, apis, extraApis);
  };
  var $_6wocjl10ejcq86m96 = {
    single: single,
    composite: composite
  };

  var events$4 = function (optAction) {
    var executeHandler = function (action) {
      return $_fpvm9zw6jcq86lqb.run($_d5i57fwwjcq86lsp.execute(), function (component, simulatedEvent) {
        action(component);
        simulatedEvent.stop();
      });
    };
    var onClick = function (component, simulatedEvent) {
      simulatedEvent.stop();
      $_36xfsfwvjcq86lsk.emitExecute(component);
    };
    var onMousedown = function (component, simulatedEvent) {
      simulatedEvent.cut();
    };
    var pointerEvents = $_ggue51wgjcq86lrc.detect().deviceType.isTouch() ? [$_fpvm9zw6jcq86lqb.run($_d5i57fwwjcq86lsp.tap(), onClick)] : [
      $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.click(), onClick),
      $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.mousedown(), onMousedown)
    ];
    return $_fpvm9zw6jcq86lqb.derive($_54lr1fw9jcq86lqv.flatten([
      optAction.map(executeHandler).toArray(),
      pointerEvents
    ]));
  };
  var $_bsb7ki10pjcq86mc6 = { events: events$4 };

  var factory = function (detail, spec) {
    var events = $_bsb7ki10pjcq86mc6.events(detail.action());
    var optType = $_1z89rrx6jcq86lub.readOptFrom(detail.dom(), 'attributes').bind($_1z89rrx6jcq86lub.readOpt('type'));
    var optTag = $_1z89rrx6jcq86lub.readOptFrom(detail.dom(), 'tag');
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: detail.components(),
      events: events,
      behaviours: $_9ymhaxwyjcq86lsv.deepMerge($_5q0i93w4jcq86lpj.derive([
        Focusing.config({}),
        Keying.config({
          mode: 'execution',
          useSpace: true,
          useEnter: true
        })
      ]), $_flsnpp10djcq86m91.get(detail.buttonBehaviours())),
      domModification: {
        attributes: $_9ymhaxwyjcq86lsv.deepMerge(optType.fold(function () {
          return optTag.is('button') ? { type: 'button' } : {};
        }, function (t) {
          return {};
        }), { role: detail.role().getOr('button') })
      },
      eventOrder: detail.eventOrder()
    };
  };
  var Button = $_6wocjl10ejcq86m96.single({
    name: 'Button',
    factory: factory,
    configFields: [
      $_2a8tl5x2jcq86ltk.defaulted('uid', undefined),
      $_2a8tl5x2jcq86ltk.strict('dom'),
      $_2a8tl5x2jcq86ltk.defaulted('components', []),
      $_flsnpp10djcq86m91.field('buttonBehaviours', [
        Focusing,
        Keying
      ]),
      $_2a8tl5x2jcq86ltk.option('action'),
      $_2a8tl5x2jcq86ltk.option('role'),
      $_2a8tl5x2jcq86ltk.defaulted('eventOrder', {})
    ]
  });

  var getAttrs = function (elem) {
    var attributes = elem.dom().attributes !== undefined ? elem.dom().attributes : [];
    return $_54lr1fw9jcq86lqv.foldl(attributes, function (b, attr) {
      if (attr.name === 'class')
        return b;
      else
        return $_9ymhaxwyjcq86lsv.deepMerge(b, $_1z89rrx6jcq86lub.wrap(attr.name, attr.value));
    }, {});
  };
  var getClasses = function (elem) {
    return Array.prototype.slice.call(elem.dom().classList, 0);
  };
  var fromHtml$2 = function (html) {
    var elem = $_96tjzawtjcq86lsc.fromHtml(html);
    var children = $_212hfgy3jcq86ly0.children(elem);
    var attrs = getAttrs(elem);
    var classes = getClasses(elem);
    var contents = children.length === 0 ? {} : { innerHtml: $_gd7aqmybjcq86lz7.get(elem) };
    return $_9ymhaxwyjcq86lsv.deepMerge({
      tag: $_ggmo4uxxjcq86lxc.name(elem),
      classes: classes,
      attributes: attrs
    }, contents);
  };
  var sketch = function (sketcher, html, config) {
    return sketcher.sketch($_9ymhaxwyjcq86lsv.deepMerge({ dom: fromHtml$2(html) }, config));
  };
  var $_ftbvdv10rjcq86mce = {
    fromHtml: fromHtml$2,
    sketch: sketch
  };

  var dom$1 = function (rawHtml) {
    var html = $_99go0uwpjcq86ls4.supplant(rawHtml, { prefix: $_3fu6k5z1jcq86m28.prefix() });
    return $_ftbvdv10rjcq86mce.fromHtml(html);
  };
  var spec = function (rawHtml) {
    var sDom = dom$1(rawHtml);
    return { dom: sDom };
  };
  var $_caj4qv10qjcq86mca = {
    dom: dom$1,
    spec: spec
  };

  var forToolbarCommand = function (editor, command) {
    return forToolbar(command, function () {
      editor.execCommand(command);
    }, {});
  };
  var getToggleBehaviours = function (command) {
    return $_5q0i93w4jcq86lpj.derive([
      Toggling.config({
        toggleClass: $_3fu6k5z1jcq86m28.resolve('toolbar-button-selected'),
        toggleOnExecute: false,
        aria: { mode: 'pressed' }
      }),
      $_g86iz4z0jcq86m25.format(command, function (button, status) {
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
      dom: $_caj4qv10qjcq86mca.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-' + clazz + ' ${prefix}-icon"></span>'),
      action: action,
      buttonBehaviours: $_9ymhaxwyjcq86lsv.deepMerge($_5q0i93w4jcq86lpj.derive([Unselecting.config({})]), extraBehaviours)
    });
  };
  var $_4yx6ogz2jcq86m2a = {
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
  var $_7b1ukf10wjcq86mdj = {
    reduceBy: reduceBy,
    increaseBy: increaseBy,
    findValueOfX: findValueOfX
  };

  var changeEvent = 'slider.change.value';
  var isTouch$1 = $_ggue51wgjcq86lrc.detect().deviceType.isTouch();
  var getEventSource = function (simulatedEvent) {
    var evt = simulatedEvent.event().raw();
    if (isTouch$1 && evt.touches !== undefined && evt.touches.length === 1)
      return $_2334kywajcq86lr3.some(evt.touches[0]);
    else if (isTouch$1 && evt.touches !== undefined)
      return $_2334kywajcq86lr3.none();
    else if (!isTouch$1 && evt.clientX !== undefined)
      return $_2334kywajcq86lr3.some(evt);
    else
      return $_2334kywajcq86lr3.none();
  };
  var getEventX = function (simulatedEvent) {
    var spot = getEventSource(simulatedEvent);
    return spot.map(function (s) {
      return s.clientX;
    });
  };
  var fireChange = function (component, value) {
    $_36xfsfwvjcq86lsk.emitWith(component, changeEvent, { value: value });
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
    var value = $_7b1ukf10wjcq86mdj.findValueOfX(spectrumBounds, detail.min(), detail.max(), xValue, detail.stepSize(), detail.snapToGrid(), detail.snapStart());
    fireChange(spectrum, value);
  };
  var setXFromEvent = function (spectrum, detail, spectrumBounds, simulatedEvent) {
    return getEventX(simulatedEvent).map(function (xValue) {
      setToX(spectrum, spectrumBounds, detail, xValue);
      return xValue;
    });
  };
  var moveLeft$4 = function (spectrum, detail) {
    var newValue = $_7b1ukf10wjcq86mdj.reduceBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var moveRight$4 = function (spectrum, detail) {
    var newValue = $_7b1ukf10wjcq86mdj.increaseBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var $_cx8npw10vjcq86mdd = {
    setXFromEvent: setXFromEvent,
    setToLedge: setToLedge,
    setToRedge: setToRedge,
    moveLeftFromRedge: moveLeftFromRedge,
    moveRightFromLedge: moveRightFromLedge,
    moveLeft: moveLeft$4,
    moveRight: moveRight$4,
    changeEvent: $_88uun8wbjcq86lr5.constant(changeEvent)
  };

  var platform = $_ggue51wgjcq86lrc.detect();
  var isTouch = platform.deviceType.isTouch();
  var edgePart = function (name, action) {
    return $_8pawjq10kjcq86mak.optional({
      name: '' + name + '-edge',
      overrides: function (detail) {
        var touchEvents = $_fpvm9zw6jcq86lqb.derive([$_fpvm9zw6jcq86lqb.runActionExtra($_d9eamdwxjcq86lss.touchstart(), action, [detail])]);
        var mouseEvents = $_fpvm9zw6jcq86lqb.derive([
          $_fpvm9zw6jcq86lqb.runActionExtra($_d9eamdwxjcq86lss.mousedown(), action, [detail]),
          $_fpvm9zw6jcq86lqb.runActionExtra($_d9eamdwxjcq86lss.mousemove(), function (l, det) {
            if (det.mouseIsDown().get())
              action(l, det);
          }, [detail])
        ]);
        return { events: isTouch ? touchEvents : mouseEvents };
      }
    });
  };
  var ledgePart = edgePart('left', $_cx8npw10vjcq86mdd.setToLedge);
  var redgePart = edgePart('right', $_cx8npw10vjcq86mdd.setToRedge);
  var thumbPart = $_8pawjq10kjcq86mak.required({
    name: 'thumb',
    defaults: $_88uun8wbjcq86lr5.constant({ dom: { styles: { position: 'absolute' } } }),
    overrides: function (detail) {
      return {
        events: $_fpvm9zw6jcq86lqb.derive([
          $_fpvm9zw6jcq86lqb.redirectToPart($_d9eamdwxjcq86lss.touchstart(), detail, 'spectrum'),
          $_fpvm9zw6jcq86lqb.redirectToPart($_d9eamdwxjcq86lss.touchmove(), detail, 'spectrum'),
          $_fpvm9zw6jcq86lqb.redirectToPart($_d9eamdwxjcq86lss.touchend(), detail, 'spectrum')
        ])
      };
    }
  });
  var spectrumPart = $_8pawjq10kjcq86mak.required({
    schema: [$_2a8tl5x2jcq86ltk.state('mouseIsDown', function () {
        return Cell(false);
      })],
    name: 'spectrum',
    overrides: function (detail) {
      var moveToX = function (spectrum, simulatedEvent) {
        var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
        $_cx8npw10vjcq86mdd.setXFromEvent(spectrum, detail, spectrumBounds, simulatedEvent);
      };
      var touchEvents = $_fpvm9zw6jcq86lqb.derive([
        $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.touchstart(), moveToX),
        $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.touchmove(), moveToX)
      ]);
      var mouseEvents = $_fpvm9zw6jcq86lqb.derive([
        $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.mousedown(), moveToX),
        $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.mousemove(), function (spectrum, se) {
          if (detail.mouseIsDown().get())
            moveToX(spectrum, se);
        })
      ]);
      return {
        behaviours: $_5q0i93w4jcq86lpj.derive(isTouch ? [] : [
          Keying.config({
            mode: 'special',
            onLeft: function (spectrum) {
              $_cx8npw10vjcq86mdd.moveLeft(spectrum, detail);
              return $_2334kywajcq86lr3.some(true);
            },
            onRight: function (spectrum) {
              $_cx8npw10vjcq86mdd.moveRight(spectrum, detail);
              return $_2334kywajcq86lr3.some(true);
            }
          }),
          Focusing.config({})
        ]),
        events: isTouch ? touchEvents : mouseEvents
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
  var $_b8e998110jcq86mdx = {
    onLoad: onLoad$1,
    onUnload: onUnload,
    setValue: setValue,
    getValue: getValue
  };

  var events$5 = function (repConfig, repState) {
    var es = repConfig.resetOnDom() ? [
      $_fpvm9zw6jcq86lqb.runOnAttached(function (comp, se) {
        $_b8e998110jcq86mdx.onLoad(comp, repConfig, repState);
      }),
      $_fpvm9zw6jcq86lqb.runOnDetached(function (comp, se) {
        $_b8e998110jcq86mdx.onUnload(comp, repConfig, repState);
      })
    ] : [$_gfgf52w5jcq86lps.loadEvent(repConfig, repState, $_b8e998110jcq86mdx.onLoad)];
    return $_fpvm9zw6jcq86lqb.derive(es);
  };
  var $_2co4kt10zjcq86mdw = { events: events$5 };

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
  var $_dddj5d113jcq86meb = {
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
    return $_1z89rrx6jcq86lub.readOptFrom(dataset, key).fold(function () {
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
    $_2a8tl5x2jcq86ltk.option('initialValue'),
    $_2a8tl5x2jcq86ltk.strict('getFallbackEntry'),
    $_2a8tl5x2jcq86ltk.strict('getDataKey'),
    $_2a8tl5x2jcq86ltk.strict('setData'),
    $_5l2dbmytjcq86m0r.output('manager', {
      setValue: setValue$1,
      getValue: getValue$1,
      onLoad: onLoad$2,
      onUnload: onUnload$1,
      state: $_dddj5d113jcq86meb.dataset
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
    $_2a8tl5x2jcq86ltk.strict('getValue'),
    $_2a8tl5x2jcq86ltk.defaulted('setValue', $_88uun8wbjcq86lr5.noop),
    $_2a8tl5x2jcq86ltk.option('initialValue'),
    $_5l2dbmytjcq86m0r.output('manager', {
      setValue: setValue$2,
      getValue: getValue$2,
      onLoad: onLoad$3,
      onUnload: $_88uun8wbjcq86lr5.noop,
      state: $_ctyh8rxqjcq86lwp.init
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
    $_2a8tl5x2jcq86ltk.option('initialValue'),
    $_5l2dbmytjcq86m0r.output('manager', {
      setValue: setValue$3,
      getValue: getValue$3,
      onLoad: onLoad$4,
      onUnload: onUnload$2,
      state: $_dddj5d113jcq86meb.memory
    })
  ];

  var RepresentSchema = [
    $_2a8tl5x2jcq86ltk.defaultedOf('store', { mode: 'memory' }, $_8bk232xhjcq86lvj.choose('mode', {
      memory: MemoryStore,
      manual: ManualStore,
      dataset: DatasetStore
    })),
    $_5l2dbmytjcq86m0r.onHandler('onSetValue'),
    $_2a8tl5x2jcq86ltk.defaulted('resetOnDom', false)
  ];

  var me = $_5q0i93w4jcq86lpj.create({
    fields: RepresentSchema,
    name: 'representing',
    active: $_2co4kt10zjcq86mdw,
    apis: $_b8e998110jcq86mdx,
    extra: {
      setValueFrom: function (component, source) {
        var value = me.getValue(source);
        me.setValue(component, value);
      }
    },
    state: $_dddj5d113jcq86meb
  });

  var isTouch$2 = $_ggue51wgjcq86lrc.detect().deviceType.isTouch();
  var SliderSchema = [
    $_2a8tl5x2jcq86ltk.strict('min'),
    $_2a8tl5x2jcq86ltk.strict('max'),
    $_2a8tl5x2jcq86ltk.defaulted('stepSize', 1),
    $_2a8tl5x2jcq86ltk.defaulted('onChange', $_88uun8wbjcq86lr5.noop),
    $_2a8tl5x2jcq86ltk.defaulted('onInit', $_88uun8wbjcq86lr5.noop),
    $_2a8tl5x2jcq86ltk.defaulted('onDragStart', $_88uun8wbjcq86lr5.noop),
    $_2a8tl5x2jcq86ltk.defaulted('onDragEnd', $_88uun8wbjcq86lr5.noop),
    $_2a8tl5x2jcq86ltk.defaulted('snapToGrid', false),
    $_2a8tl5x2jcq86ltk.option('snapStart'),
    $_2a8tl5x2jcq86ltk.strict('getInitialValue'),
    $_flsnpp10djcq86m91.field('sliderBehaviours', [
      Keying,
      me
    ]),
    $_2a8tl5x2jcq86ltk.state('value', function (spec) {
      return Cell(spec.min);
    })
  ].concat(!isTouch$2 ? [$_2a8tl5x2jcq86ltk.state('mouseIsDown', function () {
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
    $_8xsijozsjcq86m57.set(element, 'max-width', absMax + 'px');
  };
  var $_95l2gy117jcq86mf0 = {
    set: set$4,
    get: get$6,
    getOuter: getOuter$2,
    setMax: setMax$1
  };

  var isTouch$3 = $_ggue51wgjcq86lrc.detect().deviceType.isTouch();
  var sketch$2 = function (detail, components, spec, externals) {
    var range = detail.max() - detail.min();
    var getXCentre = function (component) {
      var rect = component.element().dom().getBoundingClientRect();
      return (rect.left + rect.right) / 2;
    };
    var getThumb = function (component) {
      return $_8jdkda10ijcq86m9x.getPartOrDie(component, detail, 'thumb');
    };
    var getXOffset = function (slider, spectrumBounds, detail) {
      var v = detail.value().get();
      if (v < detail.min()) {
        return $_8jdkda10ijcq86m9x.getPart(slider, detail, 'left-edge').fold(function () {
          return 0;
        }, function (ledge) {
          return getXCentre(ledge) - spectrumBounds.left;
        });
      } else if (v > detail.max()) {
        return $_8jdkda10ijcq86m9x.getPart(slider, detail, 'right-edge').fold(function () {
          return spectrumBounds.width;
        }, function (redge) {
          return getXCentre(redge) - spectrumBounds.left;
        });
      } else {
        return (detail.value().get() - detail.min()) / range * spectrumBounds.width;
      }
    };
    var getXPos = function (slider) {
      var spectrum = $_8jdkda10ijcq86m9x.getPartOrDie(slider, detail, 'spectrum');
      var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
      var sliderBounds = slider.element().dom().getBoundingClientRect();
      var xOffset = getXOffset(slider, spectrumBounds, detail);
      return spectrumBounds.left - sliderBounds.left + xOffset;
    };
    var refresh = function (component) {
      var pos = getXPos(component);
      var thumb = getThumb(component);
      var thumbRadius = $_95l2gy117jcq86mf0.get(thumb.element()) / 2;
      $_8xsijozsjcq86m57.set(thumb.element(), 'left', pos - thumbRadius + 'px');
    };
    var changeValue = function (component, newValue) {
      var oldValue = detail.value().get();
      var thumb = getThumb(component);
      if (oldValue !== newValue || $_8xsijozsjcq86m57.getRaw(thumb.element(), 'left').isNone()) {
        detail.value().set(newValue);
        refresh(component);
        detail.onChange()(component, thumb, newValue);
        return $_2334kywajcq86lr3.some(true);
      } else {
        return $_2334kywajcq86lr3.none();
      }
    };
    var resetToMin = function (slider) {
      changeValue(slider, detail.min());
    };
    var resetToMax = function (slider) {
      changeValue(slider, detail.max());
    };
    var uiEventsArr = isTouch$3 ? [
      $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.touchstart(), function (slider, simulatedEvent) {
        detail.onDragStart()(slider, getThumb(slider));
      }),
      $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.touchend(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
      })
    ] : [
      $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.mousedown(), function (slider, simulatedEvent) {
        simulatedEvent.stop();
        detail.onDragStart()(slider, getThumb(slider));
        detail.mouseIsDown().set(true);
      }),
      $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.mouseup(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
        detail.mouseIsDown().set(false);
      })
    ];
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_9ymhaxwyjcq86lsv.deepMerge($_5q0i93w4jcq86lpj.derive($_54lr1fw9jcq86lqv.flatten([
        !isTouch$3 ? [Keying.config({
            mode: 'special',
            focusIn: function (slider) {
              return $_8jdkda10ijcq86m9x.getPart(slider, detail, 'spectrum').map(Keying.focusIn).map($_88uun8wbjcq86lr5.constant(true));
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
      ])), $_flsnpp10djcq86m91.get(detail.sliderBehaviours())),
      events: $_fpvm9zw6jcq86lqb.derive([
        $_fpvm9zw6jcq86lqb.run($_cx8npw10vjcq86mdd.changeEvent(), function (slider, simulatedEvent) {
          changeValue(slider, simulatedEvent.event().value());
        }),
        $_fpvm9zw6jcq86lqb.runOnAttached(function (slider, simulatedEvent) {
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
  var $_b75axt116jcq86meo = { sketch: sketch$2 };

  var Slider = $_6wocjl10ejcq86m96.composite({
    name: 'Slider',
    configFields: SliderSchema,
    partFields: SliderParts,
    factory: $_b75axt116jcq86meo.sketch,
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
    return $_4yx6ogz2jcq86m2a.forToolbar(clazz, function () {
      var items = makeItems();
      realm.setContextToolbar([{
          label: clazz + ' group',
          items: items
        }]);
    }, {});
  };
  var $_ggw23b118jcq86mf2 = { button: button };

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
      $_8xsijozsjcq86m57.set(thumb.element(), 'background-color', color);
    };
    var onChange = function (slider, thumb, value) {
      var color = getColor(value);
      $_8xsijozsjcq86m57.set(thumb.element(), 'background-color', color);
      spec.onChange(slider, thumb, color);
    };
    return Slider.sketch({
      dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-slider ${prefix}-hue-slider-container"></div>'),
      components: [
        Slider.parts()['left-edge']($_caj4qv10qjcq86mca.spec('<div class="${prefix}-hue-slider-black"></div>')),
        Slider.parts().spectrum({
          dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-slider-gradient-container"></div>'),
          components: [$_caj4qv10qjcq86mca.spec('<div class="${prefix}-slider-gradient"></div>')],
          behaviours: $_5q0i93w4jcq86lpj.derive([Toggling.config({ toggleClass: $_3fu6k5z1jcq86m28.resolve('thumb-active') })])
        }),
        Slider.parts()['right-edge']($_caj4qv10qjcq86mca.spec('<div class="${prefix}-hue-slider-white"></div>')),
        Slider.parts().thumb({
          dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_5q0i93w4jcq86lpj.derive([Toggling.config({ toggleClass: $_3fu6k5z1jcq86m28.resolve('thumb-active') })])
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
      sliderBehaviours: $_5q0i93w4jcq86lpj.derive([$_g86iz4z0jcq86m25.orientation(Slider.refresh)])
    });
  };
  var makeItems = function (spec) {
    return [makeSlider(spec)];
  };
  var sketch$1 = function (realm, editor) {
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
    return $_ggw23b118jcq86mf2.button(realm, 'color', function () {
      return makeItems(spec);
    });
  };
  var $_18hee10sjcq86mcx = {
    makeItems: makeItems,
    sketch: sketch$1
  };

  var schema$7 = $_8bk232xhjcq86lvj.objOfOnly([
    $_2a8tl5x2jcq86ltk.strict('getInitialValue'),
    $_2a8tl5x2jcq86ltk.strict('onChange'),
    $_2a8tl5x2jcq86ltk.strict('category'),
    $_2a8tl5x2jcq86ltk.strict('sizes')
  ]);
  var sketch$4 = function (rawSpec) {
    var spec = $_8bk232xhjcq86lvj.asRawOrDie('SizeSlider', schema$7, rawSpec);
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
          $_3fu6k5z1jcq86m28.resolve('slider-' + spec.category + '-size-container'),
          $_3fu6k5z1jcq86m28.resolve('slider'),
          $_3fu6k5z1jcq86m28.resolve('slider-size-container')
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
      sliderBehaviours: $_5q0i93w4jcq86lpj.derive([$_g86iz4z0jcq86m25.orientation(Slider.refresh)]),
      components: [
        Slider.parts().spectrum({
          dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-slider-size-container"></div>'),
          components: [$_caj4qv10qjcq86mca.spec('<div class="${prefix}-slider-size-line"></div>')]
        }),
        Slider.parts().thumb({
          dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_5q0i93w4jcq86lpj.derive([Toggling.config({ toggleClass: $_3fu6k5z1jcq86m28.resolve('thumb-active') })])
        })
      ]
    });
  };
  var $_avqrwe11ajcq86mf5 = { sketch: sketch$4 };

  var ancestor$3 = function (scope, transform, isRoot) {
    var element = scope.dom();
    var stop = $_d1yi3wwzjcq86lsx.isFunction(isRoot) ? isRoot : $_88uun8wbjcq86lr5.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_96tjzawtjcq86lsc.fromDom(element);
      var transformed = transform(el);
      if (transformed.isSome())
        return transformed;
      else if (stop(el))
        break;
    }
    return $_2334kywajcq86lr3.none();
  };
  var closest$3 = function (scope, transform, isRoot) {
    var current = transform(scope);
    return current.orThunk(function () {
      return isRoot(scope) ? $_2334kywajcq86lr3.none() : ancestor$3(scope, transform, isRoot);
    });
  };
  var $_750kpt11cjcq86mfu = {
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
    return $_2334kywajcq86lr3.from(candidates[index]);
  };
  var sizeToIndex = function (size) {
    return $_54lr1fw9jcq86lqv.findIndex(candidates, function (v) {
      return v === size;
    });
  };
  var getRawOrComputed = function (isRoot, rawStart) {
    var optStart = $_ggmo4uxxjcq86lxc.isElement(rawStart) ? $_2334kywajcq86lr3.some(rawStart) : $_212hfgy3jcq86ly0.parent(rawStart);
    return optStart.map(function (start) {
      var inline = $_750kpt11cjcq86mfu.closest(start, function (elem) {
        return $_8xsijozsjcq86m57.getRaw(elem, 'font-size');
      }, isRoot);
      return inline.getOrThunk(function () {
        return $_8xsijozsjcq86m57.get(start, 'font-size');
      });
    }).getOr('');
  };
  var getSize = function (editor) {
    var node = editor.selection.getStart();
    var elem = $_96tjzawtjcq86lsc.fromDom(node);
    var root = $_96tjzawtjcq86lsc.fromDom(editor.getBody());
    var isRoot = function (e) {
      return $_1mhuz1w8jcq86lql.eq(root, e);
    };
    var elemSize = getRawOrComputed(isRoot, elem);
    return $_54lr1fw9jcq86lqv.find(candidates, function (size) {
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
  var $_dvgaxu11bjcq86mfg = {
    candidates: $_88uun8wbjcq86lr5.constant(candidates),
    get: get$7,
    apply: apply$1
  };

  var sizes = $_dvgaxu11bjcq86mfg.candidates();
  var makeSlider$1 = function (spec) {
    return $_avqrwe11ajcq86mf5.sketch({
      onChange: spec.onChange,
      sizes: sizes,
      category: 'font',
      getInitialValue: spec.getInitialValue
    });
  };
  var makeItems$1 = function (spec) {
    return [
      $_caj4qv10qjcq86mca.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-small-font ${prefix}-icon"></span>'),
      makeSlider$1(spec),
      $_caj4qv10qjcq86mca.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-large-font ${prefix}-icon"></span>')
    ];
  };
  var sketch$3 = function (realm, editor) {
    var spec = {
      onChange: function (value) {
        $_dvgaxu11bjcq86mfg.apply(editor, value);
      },
      getInitialValue: function () {
        return $_dvgaxu11bjcq86mfg.get(editor);
      }
    };
    return $_ggw23b118jcq86mf2.button(realm, 'font-size', function () {
      return makeItems$1(spec);
    });
  };
  var $_2wglee119jcq86mf3 = {
    makeItems: makeItems$1,
    sketch: sketch$3
  };

  var record = function (spec) {
    var uid = $_1z89rrx6jcq86lub.hasKey(spec, 'uid') ? spec.uid : $_crpkad10mjcq86mbh.generate('memento');
    var get = function (any) {
      return any.getSystem().getByUid(uid).getOrDie();
    };
    var getOpt = function (any) {
      return any.getSystem().getByUid(uid).fold($_2334kywajcq86lr3.none, $_2334kywajcq86lr3.some);
    };
    var asSpec = function () {
      return $_9ymhaxwyjcq86lsv.deepMerge(spec, { uid: uid });
    };
    return {
      get: get,
      getOpt: getOpt,
      asSpec: asSpec
    };
  };
  var $_73qm4s11ejcq86mg7 = { record: record };

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
  var $_ghhcgy11hjcq86mh1 = {
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
  var $_1wxp0411ijcq86mh2 = {
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

  var Blob = function (parts, properties) {
    var f = $_e5blaswdjcq86lr9.getOrDie('Blob');
    return new f(parts, properties);
  };

  var FileReader = function () {
    var f = $_e5blaswdjcq86lr9.getOrDie('FileReader');
    return new f();
  };

  var Uint8Array = function (arr) {
    var f = $_e5blaswdjcq86lr9.getOrDie('Uint8Array');
    return new f(arr);
  };

  var requestAnimationFrame = function (callback) {
    var f = $_e5blaswdjcq86lr9.getOrDie('requestAnimationFrame');
    f(callback);
  };
  var atob = function (base64) {
    var f = $_e5blaswdjcq86lr9.getOrDie('atob');
    return f(base64);
  };
  var $_6asrrc11njcq86mh9 = {
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
  function imageToBlob$1(image) {
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
  function blobToImage$1(blob) {
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
    return new Promise(function (resolve) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        if (this.status == 200) {
          resolve(this.response);
        }
      };
      xhr.send();
    });
  }
  function dataUriToBlobSync$1(uri) {
    var data = uri.split(',');
    var matches = /data:([^;]+)/.exec(data[0]);
    if (!matches)
      return $_2334kywajcq86lr3.none();
    var mimetype = matches[1];
    var base64 = data[1];
    var sliceSize = 1024;
    var byteCharacters = $_6asrrc11njcq86mh9.atob(base64);
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
    return $_2334kywajcq86lr3.some(Blob(byteArrays, { type: mimetype }));
  }
  function dataUriToBlob(uri) {
    return new Promise(function (resolve, reject) {
      dataUriToBlobSync$1(uri).fold(function () {
        reject('uri is not base64: ' + uri);
      }, resolve);
    });
  }
  function uriToBlob$1(url) {
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
    return blobToImage$1(blob).then(function (image) {
      revokeImageUrl(image);
      var context, canvas;
      canvas = $_ghhcgy11hjcq86mh1.create($_1wxp0411ijcq86mh2.getWidth(image), $_1wxp0411ijcq86mh2.getHeight(image));
      context = $_ghhcgy11hjcq86mh1.get2dContext(canvas);
      context.drawImage(image, 0, 0);
      return canvas;
    });
  }
  function blobToDataUri$1(blob) {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }
  function blobToBase64$1(blob) {
    return blobToDataUri$1(blob).then(function (dataUri) {
      return dataUri.split(',')[1];
    });
  }
  function revokeImageUrl(image) {
    URL.revokeObjectURL(image.src);
  }
  var $_eflnm11gjcq86mgl = {
    blobToImage: blobToImage$1,
    imageToBlob: imageToBlob$1,
    blobToDataUri: blobToDataUri$1,
    blobToBase64: blobToBase64$1,
    dataUriToBlobSync: dataUriToBlobSync$1,
    canvasToBlob: canvasToBlob,
    canvasToDataURL: canvasToDataURL,
    blobToCanvas: blobToCanvas,
    uriToBlob: uriToBlob$1
  };

  var blobToImage = function (image) {
    return $_eflnm11gjcq86mgl.blobToImage(image);
  };
  var imageToBlob = function (blob) {
    return $_eflnm11gjcq86mgl.imageToBlob(blob);
  };
  var blobToDataUri = function (blob) {
    return $_eflnm11gjcq86mgl.blobToDataUri(blob);
  };
  var blobToBase64 = function (blob) {
    return $_eflnm11gjcq86mgl.blobToBase64(blob);
  };
  var dataUriToBlobSync = function (uri) {
    return $_eflnm11gjcq86mgl.dataUriToBlobSync(uri);
  };
  var uriToBlob = function (uri) {
    return $_2334kywajcq86lr3.from($_eflnm11gjcq86mgl.uriToBlob(uri));
  };
  var $_bbv3ln11fjcq86mgd = {
    blobToImage: blobToImage,
    imageToBlob: imageToBlob,
    blobToDataUri: blobToDataUri,
    blobToBase64: blobToBase64,
    dataUriToBlobSync: dataUriToBlobSync,
    uriToBlob: uriToBlob
  };

  var addImage = function (editor, blob) {
    $_bbv3ln11fjcq86mgd.blobToBase64(blob).then(function (base64) {
      editor.undoManager.transact(function () {
        var cache = editor.editorUpload.blobCache;
        var info = cache.create($_f0a0c310gjcq86m9k.generate('mceu'), blob, base64);
        cache.add(info);
        var img = editor.dom.createHTML('img', { src: info.blobUri() });
        editor.insertContent(img);
      });
    });
  };
  var extractBlob = function (simulatedEvent) {
    var event = simulatedEvent.event();
    var files = event.raw().target.files || event.raw().dataTransfer.files;
    return $_2334kywajcq86lr3.from(files[0]);
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
    var memPicker = $_73qm4s11ejcq86mg7.record({
      dom: pickerDom,
      events: $_fpvm9zw6jcq86lqb.derive([
        $_fpvm9zw6jcq86lqb.cutter($_d9eamdwxjcq86lss.click()),
        $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.change(), function (picker, simulatedEvent) {
          extractBlob(simulatedEvent).each(function (blob) {
            addImage(editor, blob);
          });
        })
      ])
    });
    return Button.sketch({
      dom: $_caj4qv10qjcq86mca.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-image ${prefix}-icon"></span>'),
      components: [memPicker.asSpec()],
      action: function (button) {
        var picker = memPicker.get(button);
        picker.element().dom().click();
      }
    });
  };
  var $_276c6n11djcq86mg0 = { sketch: sketch$5 };

  var get$8 = function (element) {
    return element.dom().textContent;
  };
  var set$5 = function (element, value) {
    element.dom().textContent = value;
  };
  var $_ckgssn11qjcq86mho = {
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
      link: $_2334kywajcq86lr3.none()
    };
  };
  var fromLink = function (link) {
    var text = $_ckgssn11qjcq86mho.get(link);
    var url = $_az3jjlxwjcq86lx1.get(link, 'href');
    var title = $_az3jjlxwjcq86lx1.get(link, 'title');
    var target = $_az3jjlxwjcq86lx1.get(link, 'target');
    return {
      url: defaultToEmpty(url),
      text: text !== url ? defaultToEmpty(text) : '',
      title: defaultToEmpty(title),
      target: defaultToEmpty(target),
      link: $_2334kywajcq86lr3.some(link)
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
    var prevHref = $_az3jjlxwjcq86lx1.get(link, 'href');
    var prevText = $_ckgssn11qjcq86mho.get(link);
    return prevHref === prevText;
  };
  var getTextToApply = function (link, url, info) {
    return info.text.filter(isNotEmpty).fold(function () {
      return wasSimple(link) ? $_2334kywajcq86lr3.some(url) : $_2334kywajcq86lr3.none();
    }, $_2334kywajcq86lr3.some);
  };
  var unlinkIfRequired = function (editor, info) {
    var activeLink = info.link.bind($_88uun8wbjcq86lr5.identity);
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
      var activeLink = info.link.bind($_88uun8wbjcq86lr5.identity);
      activeLink.fold(function () {
        var text = info.text.filter(isNotEmpty).getOr(url);
        editor.insertContent(editor.dom.createHTML('a', attrs, editor.dom.encode(text)));
      }, function (link) {
        var text = getTextToApply(link, url, info);
        $_az3jjlxwjcq86lx1.setAll(link, attrs);
        text.each(function (newText) {
          $_ckgssn11qjcq86mho.set(link, newText);
        });
      });
    });
  };
  var query = function (editor) {
    var start = $_96tjzawtjcq86lsc.fromDom(editor.selection.getStart());
    return $_66bqgjzmjcq86m4s.closest(start, 'a');
  };
  var $_3octtz11pjcq86mhg = {
    getInfo: getInfo,
    applyInfo: applyInfo,
    query: query
  };

  var events$6 = function (name, eventHandlers) {
    var events = $_fpvm9zw6jcq86lqb.derive(eventHandlers);
    return $_5q0i93w4jcq86lpj.create({
      fields: [$_2a8tl5x2jcq86ltk.strict('enabled')],
      name: name,
      active: { events: $_88uun8wbjcq86lr5.constant(events) }
    });
  };
  var config = function (name, eventHandlers) {
    var me = events$6(name, eventHandlers);
    return {
      key: name,
      value: {
        config: {},
        me: me,
        configAsRaw: $_88uun8wbjcq86lr5.constant({}),
        initialConfig: {},
        state: $_5q0i93w4jcq86lpj.noState()
      }
    };
  };
  var $_adfefz11sjcq86mif = {
    events: events$6,
    config: config
  };

  var getCurrent = function (component, composeConfig, composeState) {
    return composeConfig.find()(component);
  };
  var $_f6g0ok11ujcq86mik = { getCurrent: getCurrent };

  var ComposeSchema = [$_2a8tl5x2jcq86ltk.strict('find')];

  var Composing = $_5q0i93w4jcq86lpj.create({
    fields: ComposeSchema,
    name: 'composing',
    apis: $_f6g0ok11ujcq86mik
  });

  var factory$1 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_9ymhaxwyjcq86lsv.deepMerge({
        tag: 'div',
        attributes: { role: 'presentation' }
      }, detail.dom()),
      components: detail.components(),
      behaviours: $_flsnpp10djcq86m91.get(detail.containerBehaviours()),
      events: detail.events(),
      domModification: detail.domModification(),
      eventOrder: detail.eventOrder()
    };
  };
  var Container = $_6wocjl10ejcq86m96.single({
    name: 'Container',
    factory: factory$1,
    configFields: [
      $_2a8tl5x2jcq86ltk.defaulted('components', []),
      $_flsnpp10djcq86m91.field('containerBehaviours', []),
      $_2a8tl5x2jcq86ltk.defaulted('events', {}),
      $_2a8tl5x2jcq86ltk.defaulted('domModification', {}),
      $_2a8tl5x2jcq86ltk.defaulted('eventOrder', {})
    ]
  });

  var factory$2 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      behaviours: $_9ymhaxwyjcq86lsv.deepMerge($_5q0i93w4jcq86lpj.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: detail.getInitialValue()()
          }
        }),
        Composing.config({ find: $_2334kywajcq86lr3.some })
      ]), $_flsnpp10djcq86m91.get(detail.dataBehaviours())),
      events: $_fpvm9zw6jcq86lqb.derive([$_fpvm9zw6jcq86lqb.runOnAttached(function (component, simulatedEvent) {
          me.setValue(component, detail.getInitialValue()());
        })])
    };
  };
  var DataField = $_6wocjl10ejcq86m96.single({
    name: 'DataField',
    factory: factory$2,
    configFields: [
      $_2a8tl5x2jcq86ltk.strict('uid'),
      $_2a8tl5x2jcq86ltk.strict('dom'),
      $_2a8tl5x2jcq86ltk.strict('getInitialValue'),
      $_flsnpp10djcq86m91.field('dataBehaviours', [
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
  var $_avg2sa120jcq86mjb = {
    set: set$6,
    get: get$9
  };

  var schema$8 = [
    $_2a8tl5x2jcq86ltk.option('data'),
    $_2a8tl5x2jcq86ltk.defaulted('inputAttributes', {}),
    $_2a8tl5x2jcq86ltk.defaulted('inputStyles', {}),
    $_2a8tl5x2jcq86ltk.defaulted('type', 'input'),
    $_2a8tl5x2jcq86ltk.defaulted('tag', 'input'),
    $_2a8tl5x2jcq86ltk.defaulted('inputClasses', []),
    $_5l2dbmytjcq86m0r.onHandler('onSetValue'),
    $_2a8tl5x2jcq86ltk.defaulted('styles', {}),
    $_2a8tl5x2jcq86ltk.option('placeholder'),
    $_2a8tl5x2jcq86ltk.defaulted('eventOrder', {}),
    $_flsnpp10djcq86m91.field('inputBehaviours', [
      me,
      Focusing
    ]),
    $_2a8tl5x2jcq86ltk.defaulted('selectOnFocus', true)
  ];
  var behaviours = function (detail) {
    return $_9ymhaxwyjcq86lsv.deepMerge($_5q0i93w4jcq86lpj.derive([
      me.config({
        store: {
          mode: 'manual',
          initialValue: detail.data().getOr(undefined),
          getValue: function (input) {
            return $_avg2sa120jcq86mjb.get(input.element());
          },
          setValue: function (input, data) {
            var current = $_avg2sa120jcq86mjb.get(input.element());
            if (current !== data) {
              $_avg2sa120jcq86mjb.set(input.element(), data);
            }
          }
        },
        onSetValue: detail.onSetValue()
      }),
      Focusing.config({
        onFocus: detail.selectOnFocus() === false ? $_88uun8wbjcq86lr5.noop : function (component) {
          var input = component.element();
          var value = $_avg2sa120jcq86mjb.get(input);
          input.dom().setSelectionRange(0, value.length);
        }
      })
    ]), $_flsnpp10djcq86m91.get(detail.inputBehaviours()));
  };
  var dom$2 = function (detail) {
    return {
      tag: detail.tag(),
      attributes: $_9ymhaxwyjcq86lsv.deepMerge($_1z89rrx6jcq86lub.wrapAll([{
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
  var $_2r4o4y11zjcq86mj2 = {
    schema: $_88uun8wbjcq86lr5.constant(schema$8),
    behaviours: behaviours,
    dom: dom$2
  };

  var factory$3 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_2r4o4y11zjcq86mj2.dom(detail),
      components: [],
      behaviours: $_2r4o4y11zjcq86mj2.behaviours(detail),
      eventOrder: detail.eventOrder()
    };
  };
  var Input = $_6wocjl10ejcq86m96.single({
    name: 'Input',
    configFields: $_2r4o4y11zjcq86mj2.schema(),
    factory: factory$3
  });

  var exhibit$3 = function (base, tabConfig) {
    return $_eej9y1xkjcq86lvz.nu({
      attributes: $_1z89rrx6jcq86lub.wrapAll([{
          key: tabConfig.tabAttr(),
          value: 'true'
        }])
    });
  };
  var $_879a1i122jcq86mjf = { exhibit: exhibit$3 };

  var TabstopSchema = [$_2a8tl5x2jcq86ltk.defaulted('tabAttr', 'data-alloy-tabstop')];

  var Tabstopping = $_5q0i93w4jcq86lpj.create({
    fields: TabstopSchema,
    name: 'tabstopping',
    active: $_879a1i122jcq86mjf
  });

  var clearInputBehaviour = 'input-clearing';
  var field$2 = function (name, placeholder) {
    var inputSpec = $_73qm4s11ejcq86mg7.record(Input.sketch({
      placeholder: placeholder,
      onSetValue: function (input, data) {
        $_36xfsfwvjcq86lsk.emit(input, $_d9eamdwxjcq86lss.input());
      },
      inputBehaviours: $_5q0i93w4jcq86lpj.derive([
        Composing.config({ find: $_2334kywajcq86lr3.some }),
        Tabstopping.config({}),
        Keying.config({ mode: 'execution' })
      ]),
      selectOnFocus: false
    }));
    var buttonSpec = $_73qm4s11ejcq86mg7.record(Button.sketch({
      dom: $_caj4qv10qjcq86mca.dom('<button class="${prefix}-input-container-x ${prefix}-icon-cancel-circle ${prefix}-icon"></button>'),
      action: function (button) {
        var input = inputSpec.get(button);
        me.setValue(input, '');
      }
    }));
    return {
      name: name,
      spec: Container.sketch({
        dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-input-container"></div>'),
        components: [
          inputSpec.asSpec(),
          buttonSpec.asSpec()
        ],
        containerBehaviours: $_5q0i93w4jcq86lpj.derive([
          Toggling.config({ toggleClass: $_3fu6k5z1jcq86m28.resolve('input-container-empty') }),
          Composing.config({
            find: function (comp) {
              return $_2334kywajcq86lr3.some(inputSpec.get(comp));
            }
          }),
          $_adfefz11sjcq86mif.config(clearInputBehaviour, [$_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.input(), function (iContainer) {
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
          return $_2334kywajcq86lr3.none();
        }
      })
    };
  };
  var $_f0p6xu11rjcq86mhp = {
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
    return $_54lr1fw9jcq86lqv.contains(nativeDisabled, $_ggmo4uxxjcq86lxc.name(component.element()));
  };
  var nativeIsDisabled = function (component) {
    return $_az3jjlxwjcq86lx1.has(component.element(), 'disabled');
  };
  var nativeDisable = function (component) {
    $_az3jjlxwjcq86lx1.set(component.element(), 'disabled', 'disabled');
  };
  var nativeEnable = function (component) {
    $_az3jjlxwjcq86lx1.remove(component.element(), 'disabled');
  };
  var ariaIsDisabled = function (component) {
    return $_az3jjlxwjcq86lx1.get(component.element(), 'aria-disabled') === 'true';
  };
  var ariaDisable = function (component) {
    $_az3jjlxwjcq86lx1.set(component.element(), 'aria-disabled', 'true');
  };
  var ariaEnable = function (component) {
    $_az3jjlxwjcq86lx1.set(component.element(), 'aria-disabled', 'false');
  };
  var disable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_3nts6pxujcq86lwy.add(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeDisable : ariaDisable;
    f(component);
  };
  var enable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_3nts6pxujcq86lwy.remove(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeEnable : ariaEnable;
    f(component);
  };
  var isDisabled = function (component) {
    return hasNative(component) ? nativeIsDisabled(component) : ariaIsDisabled(component);
  };
  var $_7y1r59127jcq86mkh = {
    enable: enable,
    disable: disable,
    isDisabled: isDisabled,
    onLoad: onLoad$5
  };

  var exhibit$4 = function (base, disableConfig, disableState) {
    return $_eej9y1xkjcq86lvz.nu({ classes: disableConfig.disabled() ? disableConfig.disableClass().map($_54lr1fw9jcq86lqv.pure).getOr([]) : [] });
  };
  var events$7 = function (disableConfig, disableState) {
    return $_fpvm9zw6jcq86lqb.derive([
      $_fpvm9zw6jcq86lqb.abort($_d5i57fwwjcq86lsp.execute(), function (component, simulatedEvent) {
        return $_7y1r59127jcq86mkh.isDisabled(component, disableConfig, disableState);
      }),
      $_gfgf52w5jcq86lps.loadEvent(disableConfig, disableState, $_7y1r59127jcq86mkh.onLoad)
    ]);
  };
  var $_a91g2b126jcq86mkf = {
    exhibit: exhibit$4,
    events: events$7
  };

  var DisableSchema = [
    $_2a8tl5x2jcq86ltk.defaulted('disabled', false),
    $_2a8tl5x2jcq86ltk.option('disableClass')
  ];

  var Disabling = $_5q0i93w4jcq86lpj.create({
    fields: DisableSchema,
    name: 'disabling',
    active: $_a91g2b126jcq86mkf,
    apis: $_7y1r59127jcq86mkh
  });

  var owner$1 = 'form';
  var schema$9 = [$_flsnpp10djcq86m91.field('formBehaviours', [me])];
  var getPartName = function (name) {
    return '<alloy.field.' + name + '>';
  };
  var sketch$8 = function (fSpec) {
    var parts = function () {
      var record = [];
      var field = function (name, config) {
        record.push(name);
        return $_8jdkda10ijcq86m9x.generateOne(owner$1, getPartName(name), config);
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
    var fieldParts = $_54lr1fw9jcq86lqv.map(partNames, function (n) {
      return $_8pawjq10kjcq86mak.required({
        name: n,
        pname: getPartName(n)
      });
    });
    return $_csxz5310hjcq86m9m.composite(owner$1, schema$9, fieldParts, make, spec);
  };
  var make = function (detail, components, spec) {
    return $_9ymhaxwyjcq86lsv.deepMerge({
      'debug.sketcher': { 'Form': spec },
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_9ymhaxwyjcq86lsv.deepMerge($_5q0i93w4jcq86lpj.derive([me.config({
          store: {
            mode: 'manual',
            getValue: function (form) {
              var optPs = $_8jdkda10ijcq86m9x.getAllParts(form, detail);
              return $_3jdnysx0jcq86lsz.map(optPs, function (optPThunk, pName) {
                return optPThunk().bind(Composing.getCurrent).map(me.getValue);
              });
            },
            setValue: function (form, values) {
              $_3jdnysx0jcq86lsz.each(values, function (newValue, key) {
                $_8jdkda10ijcq86m9x.getPart(form, detail, key).each(function (wrapper) {
                  Composing.getCurrent(wrapper).each(function (field) {
                    me.setValue(field, newValue);
                  });
                });
              });
            }
          }
        })]), $_flsnpp10djcq86m91.get(detail.formBehaviours())),
      apis: {
        getField: function (form, key) {
          return $_8jdkda10ijcq86m9x.getPart(form, detail, key).bind(Composing.getCurrent);
        }
      }
    });
  };
  var $_djzc71129jcq86mkv = {
    getField: $_2sollz10fjcq86m9e.makeApi(function (apis, component, key) {
      return apis.getField(component, key);
    }),
    sketch: sketch$8
  };

  var revocable = function (doRevoke) {
    var subject = Cell($_2334kywajcq86lr3.none());
    var revoke = function () {
      subject.get().each(doRevoke);
    };
    var clear = function () {
      revoke();
      subject.set($_2334kywajcq86lr3.none());
    };
    var set = function (s) {
      revoke();
      subject.set($_2334kywajcq86lr3.some(s));
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
    var subject = Cell($_2334kywajcq86lr3.none());
    var revoke = function () {
      subject.get().each(function (s) {
        s.destroy();
      });
    };
    var clear = function () {
      revoke();
      subject.set($_2334kywajcq86lr3.none());
    };
    var set = function (s) {
      revoke();
      subject.set($_2334kywajcq86lr3.some(s));
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
    var subject = Cell($_2334kywajcq86lr3.none());
    var clear = function () {
      subject.set($_2334kywajcq86lr3.none());
    };
    var set = function (s) {
      subject.set($_2334kywajcq86lr3.some(s));
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
  var $_bysyeg12ajcq86ml9 = {
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
  var $_eneh8k12bjcq86mlc = {
    init: init$3,
    move: move,
    complete: complete
  };

  var sketch$7 = function (rawSpec) {
    var navigateEvent = 'navigateEvent';
    var wrapperAdhocEvents = 'serializer-wrapper-events';
    var formAdhocEvents = 'form-events';
    var schema = $_8bk232xhjcq86lvj.objOf([
      $_2a8tl5x2jcq86ltk.strict('fields'),
      $_2a8tl5x2jcq86ltk.defaulted('maxFieldIndex', rawSpec.fields.length - 1),
      $_2a8tl5x2jcq86ltk.strict('onExecute'),
      $_2a8tl5x2jcq86ltk.strict('getInitialValue'),
      $_2a8tl5x2jcq86ltk.state('state', function () {
        return {
          dialogSwipeState: $_bysyeg12ajcq86ml9.value(),
          currentScreen: Cell(0)
        };
      })
    ]);
    var spec = $_8bk232xhjcq86lvj.asRawOrDie('SerialisedDialog', schema, rawSpec);
    var navigationButton = function (direction, directionName, enabled) {
      return Button.sketch({
        dom: $_caj4qv10qjcq86mca.dom('<span class="${prefix}-icon-' + directionName + ' ${prefix}-icon"></span>'),
        action: function (button) {
          $_36xfsfwvjcq86lsk.emitWith(button, navigateEvent, { direction: direction });
        },
        buttonBehaviours: $_5q0i93w4jcq86lpj.derive([Disabling.config({
            disableClass: $_3fu6k5z1jcq86m28.resolve('toolbar-navigation-disabled'),
            disabled: !enabled
          })])
      });
    };
    var reposition = function (dialog, message) {
      $_66bqgjzmjcq86m4s.descendant(dialog.element(), '.' + $_3fu6k5z1jcq86m28.resolve('serialised-dialog-chain')).each(function (parent) {
        $_8xsijozsjcq86m57.set(parent, 'left', -spec.state.currentScreen.get() * message.width + 'px');
      });
    };
    var navigate = function (dialog, direction) {
      var screens = $_bfivwnzkjcq86m4p.descendants(dialog.element(), '.' + $_3fu6k5z1jcq86m28.resolve('serialised-dialog-screen'));
      $_66bqgjzmjcq86m4s.descendant(dialog.element(), '.' + $_3fu6k5z1jcq86m28.resolve('serialised-dialog-chain')).each(function (parent) {
        if (spec.state.currentScreen.get() + direction >= 0 && spec.state.currentScreen.get() + direction < screens.length) {
          $_8xsijozsjcq86m57.getRaw(parent, 'left').each(function (left) {
            var currentLeft = parseInt(left, 10);
            var w = $_95l2gy117jcq86mf0.get(screens[0]);
            $_8xsijozsjcq86m57.set(parent, 'left', currentLeft - direction * w + 'px');
          });
          spec.state.currentScreen.set(spec.state.currentScreen.get() + direction);
        }
      });
    };
    var focusInput = function (dialog) {
      var inputs = $_bfivwnzkjcq86m4p.descendants(dialog.element(), 'input');
      var optInput = $_2334kywajcq86lr3.from(inputs[spec.state.currentScreen.get()]);
      optInput.each(function (input) {
        dialog.getSystem().getByDom(input).each(function (inputComp) {
          $_36xfsfwvjcq86lsk.dispatchFocus(dialog, inputComp.element());
        });
      });
      var dotitems = memDots.get(dialog);
      Highlighting.highlightAt(dotitems, spec.state.currentScreen.get());
    };
    var resetState = function () {
      spec.state.currentScreen.set(0);
      spec.state.dialogSwipeState.clear();
    };
    var memForm = $_73qm4s11ejcq86mg7.record($_djzc71129jcq86mkv.sketch(function (parts) {
      return {
        dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-serialised-dialog"></div>'),
        components: [Container.sketch({
            dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-serialised-dialog-chain" style="left: 0px; position: absolute;"></div>'),
            components: $_54lr1fw9jcq86lqv.map(spec.fields, function (field, i) {
              return i <= spec.maxFieldIndex ? Container.sketch({
                dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-serialised-dialog-screen"></div>'),
                components: $_54lr1fw9jcq86lqv.flatten([
                  [navigationButton(-1, 'previous', i > 0)],
                  [parts.field(field.name, field.spec)],
                  [navigationButton(+1, 'next', i < spec.maxFieldIndex)]
                ])
              }) : parts.field(field.name, field.spec);
            })
          })],
        formBehaviours: $_5q0i93w4jcq86lpj.derive([
          $_g86iz4z0jcq86m25.orientation(function (dialog, message) {
            reposition(dialog, message);
          }),
          Keying.config({
            mode: 'special',
            focusIn: function (dialog) {
              focusInput(dialog);
            },
            onTab: function (dialog) {
              navigate(dialog, +1);
              return $_2334kywajcq86lr3.some(true);
            },
            onShiftTab: function (dialog) {
              navigate(dialog, -1);
              return $_2334kywajcq86lr3.some(true);
            }
          }),
          $_adfefz11sjcq86mif.config(formAdhocEvents, [
            $_fpvm9zw6jcq86lqb.runOnAttached(function (dialog, simulatedEvent) {
              resetState();
              var dotitems = memDots.get(dialog);
              Highlighting.highlightFirst(dotitems);
              spec.getInitialValue(dialog).each(function (v) {
                me.setValue(dialog, v);
              });
            }),
            $_fpvm9zw6jcq86lqb.runOnExecute(spec.onExecute),
            $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.transitionend(), function (dialog, simulatedEvent) {
              if (simulatedEvent.event().raw().propertyName === 'left') {
                focusInput(dialog);
              }
            }),
            $_fpvm9zw6jcq86lqb.run(navigateEvent, function (dialog, simulatedEvent) {
              var direction = simulatedEvent.event().direction();
              navigate(dialog, direction);
            })
          ])
        ])
      };
    }));
    var memDots = $_73qm4s11ejcq86mg7.record({
      dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-dot-container"></div>'),
      behaviours: $_5q0i93w4jcq86lpj.derive([Highlighting.config({
          highlightClass: $_3fu6k5z1jcq86m28.resolve('dot-active'),
          itemClass: $_3fu6k5z1jcq86m28.resolve('dot-item')
        })]),
      components: $_54lr1fw9jcq86lqv.bind(spec.fields, function (_f, i) {
        return i <= spec.maxFieldIndex ? [$_caj4qv10qjcq86mca.spec('<div class="${prefix}-dot-item ${prefix}-icon-full-dot ${prefix}-icon"></div>')] : [];
      })
    });
    return {
      dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-serializer-wrapper"></div>'),
      components: [
        memForm.asSpec(),
        memDots.asSpec()
      ],
      behaviours: $_5q0i93w4jcq86lpj.derive([
        Keying.config({
          mode: 'special',
          focusIn: function (wrapper) {
            var form = memForm.get(wrapper);
            Keying.focusIn(form);
          }
        }),
        $_adfefz11sjcq86mif.config(wrapperAdhocEvents, [
          $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.touchstart(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.set($_eneh8k12bjcq86mlc.init(simulatedEvent.event().raw().touches[0].clientX));
          }),
          $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.touchmove(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.on(function (state) {
              simulatedEvent.event().prevent();
              spec.state.dialogSwipeState.set($_eneh8k12bjcq86mlc.move(state, simulatedEvent.event().raw().touches[0].clientX));
            });
          }),
          $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.touchend(), function (wrapper) {
            spec.state.dialogSwipeState.on(function (state) {
              var dialog = memForm.get(wrapper);
              var direction = -1 * $_eneh8k12bjcq86mlc.complete(state);
              navigate(dialog, direction);
            });
          })
        ])
      ])
    };
  };
  var $_bazfo3124jcq86mjp = { sketch: sketch$7 };

  var platform$1 = $_ggue51wgjcq86lrc.detect();
  var preserve$1 = function (f, editor) {
    var rng = editor.selection.getRng();
    f();
    editor.selection.setRng(rng);
  };
  var forAndroid = function (editor, f) {
    var wrapper = platform$1.os.isAndroid() ? preserve$1 : $_88uun8wbjcq86lr5.apply;
    wrapper(f, editor);
  };
  var $_4ptwk112cjcq86mle = { forAndroid: forAndroid };

  var getGroups = $_8llfvcwhjcq86lre.cached(function (realm, editor) {
    return [{
        label: 'the link group',
        items: [$_bazfo3124jcq86mjp.sketch({
            fields: [
              $_f0p6xu11rjcq86mhp.field('url', 'Type or paste URL'),
              $_f0p6xu11rjcq86mhp.field('text', 'Link text'),
              $_f0p6xu11rjcq86mhp.field('title', 'Link title'),
              $_f0p6xu11rjcq86mhp.field('target', 'Link target'),
              $_f0p6xu11rjcq86mhp.hidden('link')
            ],
            maxFieldIndex: [
              'url',
              'text',
              'title',
              'target'
            ].length - 1,
            getInitialValue: function () {
              return $_2334kywajcq86lr3.some($_3octtz11pjcq86mhg.getInfo(editor));
            },
            onExecute: function (dialog) {
              var info = me.getValue(dialog);
              $_3octtz11pjcq86mhg.applyInfo(editor, info);
              realm.restoreToolbar();
              editor.focus();
            }
          })]
      }];
  });
  var sketch$6 = function (realm, editor) {
    return $_4yx6ogz2jcq86m2a.forToolbarStateAction(editor, 'link', 'link', function () {
      var groups = getGroups(realm, editor);
      realm.setContextToolbar(groups);
      $_4ptwk112cjcq86mle.forAndroid(editor, function () {
        realm.focusToolbar();
      });
      $_3octtz11pjcq86mhg.query(editor).each(function (link) {
        editor.selection.select(link.dom());
      });
    });
  };
  var $_fvkiix11ojcq86mhb = { sketch: sketch$6 };

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
    return $_1z89rrx6jcq86lub.readOptFrom(transConfig.routes(), route.start()).map($_88uun8wbjcq86lr5.apply).bind(function (sConfig) {
      return $_1z89rrx6jcq86lub.readOptFrom(sConfig, route.destination()).map($_88uun8wbjcq86lr5.apply);
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
          transition: $_88uun8wbjcq86lr5.constant(t),
          route: $_88uun8wbjcq86lr5.constant(r)
        };
      });
    });
  };
  var disableTransition = function (comp, transConfig, transState) {
    getTransition(comp, transConfig, transState).each(function (routeTransition) {
      var t = routeTransition.transition();
      $_3nts6pxujcq86lwy.remove(comp.element(), t.transitionClass());
      $_az3jjlxwjcq86lx1.remove(comp.element(), transConfig.destinationAttr());
    });
  };
  var getNewRoute = function (comp, transConfig, transState, destination) {
    return {
      start: $_88uun8wbjcq86lr5.constant($_az3jjlxwjcq86lx1.get(comp.element(), transConfig.stateAttr())),
      destination: $_88uun8wbjcq86lr5.constant(destination)
    };
  };
  var getCurrentRoute = function (comp, transConfig, transState) {
    var el = comp.element();
    return $_az3jjlxwjcq86lx1.has(el, transConfig.destinationAttr()) ? $_2334kywajcq86lr3.some({
      start: $_88uun8wbjcq86lr5.constant($_az3jjlxwjcq86lx1.get(comp.element(), transConfig.stateAttr())),
      destination: $_88uun8wbjcq86lr5.constant($_az3jjlxwjcq86lx1.get(comp.element(), transConfig.destinationAttr()))
    }) : $_2334kywajcq86lr3.none();
  };
  var jumpTo = function (comp, transConfig, transState, destination) {
    disableTransition(comp, transConfig, transState);
    if ($_az3jjlxwjcq86lx1.has(comp.element(), transConfig.stateAttr()) && $_az3jjlxwjcq86lx1.get(comp.element(), transConfig.stateAttr()) !== destination)
      transConfig.onFinish()(comp, destination);
    $_az3jjlxwjcq86lx1.set(comp.element(), transConfig.stateAttr(), destination);
  };
  var fasttrack = function (comp, transConfig, transState, destination) {
    if ($_az3jjlxwjcq86lx1.has(comp.element(), transConfig.destinationAttr())) {
      $_az3jjlxwjcq86lx1.set(comp.element(), transConfig.stateAttr(), $_az3jjlxwjcq86lx1.get(comp.element(), transConfig.destinationAttr()));
      $_az3jjlxwjcq86lx1.remove(comp.element(), transConfig.destinationAttr());
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
      $_3nts6pxujcq86lwy.add(comp.element(), t.transitionClass());
      $_az3jjlxwjcq86lx1.set(comp.element(), transConfig.destinationAttr(), destination);
    });
  };
  var getState = function (comp, transConfig, transState) {
    var e = comp.element();
    return $_az3jjlxwjcq86lx1.has(e, transConfig.stateAttr()) ? $_2334kywajcq86lr3.some($_az3jjlxwjcq86lx1.get(e, transConfig.stateAttr())) : $_2334kywajcq86lr3.none();
  };
  var $_b2srg612ijcq86mmm = {
    findRoute: findRoute,
    disableTransition: disableTransition,
    getCurrentRoute: getCurrentRoute,
    jumpTo: jumpTo,
    progressTo: progressTo,
    getState: getState
  };

  var events$8 = function (transConfig, transState) {
    return $_fpvm9zw6jcq86lqb.derive([
      $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        $_b2srg612ijcq86mmm.getCurrentRoute(component, transConfig, transState).each(function (route) {
          $_b2srg612ijcq86mmm.findRoute(component, transConfig, transState, route).each(function (rInfo) {
            rInfo.transition().each(function (rTransition) {
              if (raw.propertyName === rTransition.property()) {
                $_b2srg612ijcq86mmm.jumpTo(component, transConfig, transState, route.destination());
                transConfig.onTransition()(component, route);
              }
            });
          });
        });
      }),
      $_fpvm9zw6jcq86lqb.runOnAttached(function (comp, se) {
        $_b2srg612ijcq86mmm.jumpTo(comp, transConfig, transState, transConfig.initialState());
      })
    ]);
  };
  var $_4gmk3312hjcq86mml = { events: events$8 };

  var TransitionSchema = [
    $_2a8tl5x2jcq86ltk.defaulted('destinationAttr', 'data-transitioning-destination'),
    $_2a8tl5x2jcq86ltk.defaulted('stateAttr', 'data-transitioning-state'),
    $_2a8tl5x2jcq86ltk.strict('initialState'),
    $_5l2dbmytjcq86m0r.onHandler('onTransition'),
    $_5l2dbmytjcq86m0r.onHandler('onFinish'),
    $_2a8tl5x2jcq86ltk.strictOf('routes', $_8bk232xhjcq86lvj.setOf($_74ri01x8jcq86luv.value, $_8bk232xhjcq86lvj.setOf($_74ri01x8jcq86luv.value, $_8bk232xhjcq86lvj.objOfOnly([$_2a8tl5x2jcq86ltk.optionObjOfOnly('transition', [
        $_2a8tl5x2jcq86ltk.strict('property'),
        $_2a8tl5x2jcq86ltk.strict('transitionClass')
      ])]))))
  ];

  var createRoutes = function (routes) {
    var r = {};
    $_3jdnysx0jcq86lsz.each(routes, function (v, k) {
      var waypoints = k.split('<->');
      r[waypoints[0]] = $_1z89rrx6jcq86lub.wrap(waypoints[1], v);
      r[waypoints[1]] = $_1z89rrx6jcq86lub.wrap(waypoints[0], v);
    });
    return r;
  };
  var createBistate = function (first, second, transitions) {
    return $_1z89rrx6jcq86lub.wrapAll([
      {
        key: first,
        value: $_1z89rrx6jcq86lub.wrap(second, transitions)
      },
      {
        key: second,
        value: $_1z89rrx6jcq86lub.wrap(first, transitions)
      }
    ]);
  };
  var createTristate = function (first, second, third, transitions) {
    return $_1z89rrx6jcq86lub.wrapAll([
      {
        key: first,
        value: $_1z89rrx6jcq86lub.wrapAll([
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
        value: $_1z89rrx6jcq86lub.wrapAll([
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
        value: $_1z89rrx6jcq86lub.wrapAll([
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
  var Transitioning = $_5q0i93w4jcq86lpj.create({
    fields: TransitionSchema,
    name: 'transitioning',
    active: $_4gmk3312hjcq86mml,
    apis: $_b2srg612ijcq86mmm,
    extra: {
      createRoutes: createRoutes,
      createBistate: createBistate,
      createTristate: createTristate
    }
  });

  var generateFrom$1 = function (spec, all) {
    var schema = $_54lr1fw9jcq86lqv.map(all, function (a) {
      return $_2a8tl5x2jcq86ltk.field(a.name(), a.name(), $_a08fe7x3jcq86ltp.asOption(), $_8bk232xhjcq86lvj.objOf([
        $_2a8tl5x2jcq86ltk.strict('config'),
        $_2a8tl5x2jcq86ltk.defaulted('state', $_ctyh8rxqjcq86lwp)
      ]));
    });
    var validated = $_8bk232xhjcq86lvj.asStruct('component.behaviours', $_8bk232xhjcq86lvj.objOf(schema), spec.behaviours).fold(function (errInfo) {
      throw new Error($_8bk232xhjcq86lvj.formatError(errInfo) + '\nComplete spec:\n' + $_4y3hcjxfjcq86lvf.stringify(spec, null, 2));
    }, $_88uun8wbjcq86lr5.identity);
    return {
      list: all,
      data: $_3jdnysx0jcq86lsz.map(validated, function (blobOptionThunk) {
        var blobOption = blobOptionThunk();
        return $_88uun8wbjcq86lr5.constant(blobOption.map(function (blob) {
          return {
            config: blob.config(),
            state: blob.state().init(blob.config())
          };
        }));
      })
    };
  };
  var getBehaviours$1 = function (bData) {
    return bData.list;
  };
  var getData = function (bData) {
    return bData.data;
  };
  var $_8tikr412njcq86moa = {
    generateFrom: generateFrom$1,
    getBehaviours: getBehaviours$1,
    getData: getData
  };

  var getBehaviours = function (spec) {
    var behaviours = $_1z89rrx6jcq86lub.readOptFrom(spec, 'behaviours').getOr({});
    var keys = $_54lr1fw9jcq86lqv.filter($_3jdnysx0jcq86lsz.keys(behaviours), function (k) {
      return behaviours[k] !== undefined;
    });
    return $_54lr1fw9jcq86lqv.map(keys, function (k) {
      return spec.behaviours[k].me;
    });
  };
  var generateFrom = function (spec, all) {
    return $_8tikr412njcq86moa.generateFrom(spec, all);
  };
  var generate$4 = function (spec) {
    var all = getBehaviours(spec);
    return generateFrom(spec, all);
  };
  var $_cbk14j12mjcq86mo5 = {
    generate: generate$4,
    generateFrom: generateFrom
  };

  var ComponentApi = $_fa8vfuxsjcq86lws.exactly([
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

  var SystemApi = $_fa8vfuxsjcq86lws.exactly([
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

  var NoContextApi = function (getComp) {
    var fail = function (event) {
      return function () {
        throw new Error('The component must be in a context to send: ' + event + '\n' + $_yz1udy9jcq86lz2.element(getComp().element()) + ' is not in context.');
      };
    };
    return SystemApi({
      debugInfo: $_88uun8wbjcq86lr5.constant('fake'),
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
  };

  var byInnerKey = function (data, tuple) {
    var r = {};
    $_3jdnysx0jcq86lsz.each(data, function (detail, key) {
      $_3jdnysx0jcq86lsz.each(detail, function (value, indexKey) {
        var chain = $_1z89rrx6jcq86lub.readOr(indexKey, [])(r);
        r[indexKey] = chain.concat([tuple(key, value)]);
      });
    });
    return r;
  };
  var $_1qiu1m12sjcq86mpd = { byInnerKey: byInnerKey };

  var behaviourDom = function (name, modification) {
    return {
      name: $_88uun8wbjcq86lr5.constant(name),
      modification: modification
    };
  };
  var concat = function (chain, aspect) {
    var values = $_54lr1fw9jcq86lqv.bind(chain, function (c) {
      return c.modification().getOr([]);
    });
    return $_74ri01x8jcq86luv.value($_1z89rrx6jcq86lub.wrap(aspect, values));
  };
  var onlyOne = function (chain, aspect, order) {
    if (chain.length > 1)
      return $_74ri01x8jcq86luv.error('Multiple behaviours have tried to change DOM "' + aspect + '". The guilty behaviours are: ' + $_4y3hcjxfjcq86lvf.stringify($_54lr1fw9jcq86lqv.map(chain, function (b) {
        return b.name();
      })) + '. At this stage, this ' + 'is not supported. Future releases might provide strategies for resolving this.');
    else if (chain.length === 0)
      return $_74ri01x8jcq86luv.value({});
    else
      return $_74ri01x8jcq86luv.value(chain[0].modification().fold(function () {
        return {};
      }, function (m) {
        return $_1z89rrx6jcq86lub.wrap(aspect, m);
      }));
  };
  var duplicate = function (aspect, k, obj, behaviours) {
    return $_74ri01x8jcq86luv.error('Mulitple behaviours have tried to change the _' + k + '_ "' + aspect + '"' + '. The guilty behaviours are: ' + $_4y3hcjxfjcq86lvf.stringify($_54lr1fw9jcq86lqv.bind(behaviours, function (b) {
      return b.modification().getOr({})[k] !== undefined ? [b.name()] : [];
    }), null, 2) + '. This is not currently supported.');
  };
  var safeMerge = function (chain, aspect) {
    var y = $_54lr1fw9jcq86lqv.foldl(chain, function (acc, c) {
      var obj = c.modification().getOr({});
      return acc.bind(function (accRest) {
        var parts = $_3jdnysx0jcq86lsz.mapToArray(obj, function (v, k) {
          return accRest[k] !== undefined ? duplicate(aspect, k, obj, chain) : $_74ri01x8jcq86luv.value($_1z89rrx6jcq86lub.wrap(k, v));
        });
        return $_1z89rrx6jcq86lub.consolidate(parts, accRest);
      });
    }, $_74ri01x8jcq86luv.value({}));
    return y.map(function (yValue) {
      return $_1z89rrx6jcq86lub.wrap(aspect, yValue);
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
    var behaviourDoms = $_9ymhaxwyjcq86lsv.deepMerge({}, baseMod);
    $_54lr1fw9jcq86lqv.each(behaviours, function (behaviour) {
      behaviourDoms[behaviour.name()] = behaviour.exhibit(info, base);
    });
    var byAspect = $_1qiu1m12sjcq86mpd.byInnerKey(behaviourDoms, behaviourDom);
    var usedAspect = $_3jdnysx0jcq86lsz.map(byAspect, function (values, aspect) {
      return $_54lr1fw9jcq86lqv.bind(values, function (value) {
        return value.modification().fold(function () {
          return [];
        }, function (v) {
          return [value];
        });
      });
    });
    var modifications = $_3jdnysx0jcq86lsz.mapToArray(usedAspect, function (values, aspect) {
      return $_1z89rrx6jcq86lub.readOptFrom(mergeTypes, aspect).fold(function () {
        return $_74ri01x8jcq86luv.error('Unknown field type: ' + aspect);
      }, function (merger) {
        return merger(values, aspect);
      });
    });
    var consolidated = $_1z89rrx6jcq86lub.consolidate(modifications, {});
    return consolidated.map($_eej9y1xkjcq86lvz.nu);
  };
  var $_31yzgn12rjcq86mot = { combine: combine$1 };

  var sortKeys = function (label, keyName, array, order) {
    var sliced = array.slice(0);
    try {
      var sorted = sliced.sort(function (a, b) {
        var aKey = a[keyName]();
        var bKey = b[keyName]();
        var aIndex = order.indexOf(aKey);
        var bIndex = order.indexOf(bKey);
        if (aIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + aKey + '.\nOrder specified: ' + $_4y3hcjxfjcq86lvf.stringify(order, null, 2));
        if (bIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + bKey + '.\nOrder specified: ' + $_4y3hcjxfjcq86lvf.stringify(order, null, 2));
        if (aIndex < bIndex)
          return -1;
        else if (bIndex < aIndex)
          return 1;
        else
          return 0;
      });
      return $_74ri01x8jcq86luv.value(sorted);
    } catch (err) {
      return $_74ri01x8jcq86luv.error([err]);
    }
  };
  var $_6yygwo12ujcq86mpw = { sortKeys: sortKeys };

  var nu$7 = function (handler, purpose) {
    return {
      handler: handler,
      purpose: $_88uun8wbjcq86lr5.constant(purpose)
    };
  };
  var curryArgs = function (descHandler, extraArgs) {
    return {
      handler: $_88uun8wbjcq86lr5.curry.apply(undefined, [descHandler.handler].concat(extraArgs)),
      purpose: descHandler.purpose
    };
  };
  var getHandler = function (descHandler) {
    return descHandler.handler;
  };
  var $_1noqrw12vjcq86mq1 = {
    nu: nu$7,
    curryArgs: curryArgs,
    getHandler: getHandler
  };

  var behaviourTuple = function (name, handler) {
    return {
      name: $_88uun8wbjcq86lr5.constant(name),
      handler: $_88uun8wbjcq86lr5.constant(handler)
    };
  };
  var nameToHandlers = function (behaviours, info) {
    var r = {};
    $_54lr1fw9jcq86lqv.each(behaviours, function (behaviour) {
      r[behaviour.name()] = behaviour.handlers(info);
    });
    return r;
  };
  var groupByEvents = function (info, behaviours, base) {
    var behaviourEvents = $_9ymhaxwyjcq86lsv.deepMerge(base, nameToHandlers(behaviours, info));
    return $_1qiu1m12sjcq86mpd.byInnerKey(behaviourEvents, behaviourTuple);
  };
  var combine$2 = function (info, eventOrder, behaviours, base) {
    var byEventName = groupByEvents(info, behaviours, base);
    return combineGroups(byEventName, eventOrder);
  };
  var assemble = function (rawHandler) {
    var handler = $_6yce3zx1jcq86lt4.read(rawHandler);
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
    return new $_74ri01x8jcq86luv.error(['The event (' + eventName + ') has more than one behaviour that listens to it.\nWhen this occurs, you must ' + 'specify an event ordering for the behaviours in your spec (e.g. [ "listing", "toggling" ]).\nThe behaviours that ' + 'can trigger it are: ' + $_4y3hcjxfjcq86lvf.stringify($_54lr1fw9jcq86lqv.map(tuples, function (c) {
        return c.name();
      }), null, 2)]);
  };
  var fuse$1 = function (tuples, eventOrder, eventName) {
    var order = eventOrder[eventName];
    if (!order)
      return missingOrderError(eventName, tuples);
    else
      return $_6yygwo12ujcq86mpw.sortKeys('Event: ' + eventName, 'name', tuples, order).map(function (sortedTuples) {
        var handlers = $_54lr1fw9jcq86lqv.map(sortedTuples, function (tuple) {
          return tuple.handler();
        });
        return $_6yce3zx1jcq86lt4.fuse(handlers);
      });
  };
  var combineGroups = function (byEventName, eventOrder) {
    var r = $_3jdnysx0jcq86lsz.mapToArray(byEventName, function (tuples, eventName) {
      var combined = tuples.length === 1 ? $_74ri01x8jcq86luv.value(tuples[0].handler()) : fuse$1(tuples, eventOrder, eventName);
      return combined.map(function (handler) {
        var assembled = assemble(handler);
        var purpose = tuples.length > 1 ? $_54lr1fw9jcq86lqv.filter(eventOrder, function (o) {
          return $_54lr1fw9jcq86lqv.contains(tuples, function (t) {
            return t.name() === o;
          });
        }).join(' > ') : tuples[0].name();
        return $_1z89rrx6jcq86lub.wrap(eventName, $_1noqrw12vjcq86mq1.nu(assembled, purpose));
      });
    });
    return $_1z89rrx6jcq86lub.consolidate(r, {});
  };
  var $_cmyo4k12tjcq86mpi = { combine: combine$2 };

  var toInfo = function (spec) {
    return $_8bk232xhjcq86lvj.asStruct('custom.definition', $_8bk232xhjcq86lvj.objOfOnly([
      $_2a8tl5x2jcq86ltk.field('dom', 'dom', $_a08fe7x3jcq86ltp.strict(), $_8bk232xhjcq86lvj.objOfOnly([
        $_2a8tl5x2jcq86ltk.strict('tag'),
        $_2a8tl5x2jcq86ltk.defaulted('styles', {}),
        $_2a8tl5x2jcq86ltk.defaulted('classes', []),
        $_2a8tl5x2jcq86ltk.defaulted('attributes', {}),
        $_2a8tl5x2jcq86ltk.option('value'),
        $_2a8tl5x2jcq86ltk.option('innerHtml')
      ])),
      $_2a8tl5x2jcq86ltk.strict('components'),
      $_2a8tl5x2jcq86ltk.strict('uid'),
      $_2a8tl5x2jcq86ltk.defaulted('events', {}),
      $_2a8tl5x2jcq86ltk.defaulted('apis', $_88uun8wbjcq86lr5.constant({})),
      $_2a8tl5x2jcq86ltk.field('eventOrder', 'eventOrder', $_a08fe7x3jcq86ltp.mergeWith({
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
      }), $_8bk232xhjcq86lvj.anyValue()),
      $_2a8tl5x2jcq86ltk.option('domModification'),
      $_5l2dbmytjcq86m0r.snapshot('originalSpec'),
      $_2a8tl5x2jcq86ltk.defaulted('debug.sketcher', 'unknown')
    ]), spec);
  };
  var getUid = function (info) {
    return $_1z89rrx6jcq86lub.wrap($_feovc210njcq86mbp.idAttr(), info.uid());
  };
  var toDefinition = function (info) {
    var base = {
      tag: info.dom().tag(),
      classes: info.dom().classes(),
      attributes: $_9ymhaxwyjcq86lsv.deepMerge(getUid(info), info.dom().attributes()),
      styles: info.dom().styles(),
      domChildren: $_54lr1fw9jcq86lqv.map(info.components(), function (comp) {
        return comp.element();
      })
    };
    return $_4zss0zxljcq86lwc.nu($_9ymhaxwyjcq86lsv.deepMerge(base, info.dom().innerHtml().map(function (h) {
      return $_1z89rrx6jcq86lub.wrap('innerHtml', h);
    }).getOr({}), info.dom().value().map(function (h) {
      return $_1z89rrx6jcq86lub.wrap('value', h);
    }).getOr({})));
  };
  var toModification = function (info) {
    return info.domModification().fold(function () {
      return $_eej9y1xkjcq86lvz.nu({});
    }, $_eej9y1xkjcq86lvz.nu);
  };
  var toApis = function (info) {
    return info.apis();
  };
  var toEvents = function (info) {
    return info.events();
  };
  var $_4eu02r12wjcq86mq4 = {
    toInfo: toInfo,
    toDefinition: toDefinition,
    toModification: toModification,
    toApis: toApis,
    toEvents: toEvents
  };

  var add$3 = function (element, classes) {
    $_54lr1fw9jcq86lqv.each(classes, function (x) {
      $_3nts6pxujcq86lwy.add(element, x);
    });
  };
  var remove$6 = function (element, classes) {
    $_54lr1fw9jcq86lqv.each(classes, function (x) {
      $_3nts6pxujcq86lwy.remove(element, x);
    });
  };
  var toggle$3 = function (element, classes) {
    $_54lr1fw9jcq86lqv.each(classes, function (x) {
      $_3nts6pxujcq86lwy.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_54lr1fw9jcq86lqv.forall(classes, function (clazz) {
      return $_3nts6pxujcq86lwy.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_54lr1fw9jcq86lqv.exists(classes, function (clazz) {
      return $_3nts6pxujcq86lwy.has(element, clazz);
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
    return $_iy6w1xyjcq86lxe.supports(element) ? getNative(element) : $_iy6w1xyjcq86lxe.get(element);
  };
  var $_75zlxi12yjcq86mr0 = {
    add: add$3,
    remove: remove$6,
    toggle: toggle$3,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$10
  };

  var getChildren = function (definition) {
    if (definition.domChildren().isSome() && definition.defChildren().isSome()) {
      throw new Error('Cannot specify children and child specs! Must be one or the other.\nDef: ' + $_4zss0zxljcq86lwc.defToStr(definition));
    } else {
      return definition.domChildren().fold(function () {
        var defChildren = definition.defChildren().getOr([]);
        return $_54lr1fw9jcq86lqv.map(defChildren, renderDef);
      }, function (domChildren) {
        return domChildren;
      });
    }
  };
  var renderToDom = function (definition) {
    var subject = $_96tjzawtjcq86lsc.fromTag(definition.tag());
    $_az3jjlxwjcq86lx1.setAll(subject, definition.attributes().getOr({}));
    $_75zlxi12yjcq86mr0.add(subject, definition.classes().getOr([]));
    $_8xsijozsjcq86m57.setAll(subject, definition.styles().getOr({}));
    $_gd7aqmybjcq86lz7.set(subject, definition.innerHtml().getOr(''));
    var children = getChildren(definition);
    $_8vrrody6jcq86lyd.append(subject, children);
    definition.value().each(function (value) {
      $_avg2sa120jcq86mjb.set(subject, value);
    });
    return subject;
  };
  var renderDef = function (spec) {
    var definition = $_4zss0zxljcq86lwc.nu(spec);
    return renderToDom(definition);
  };
  var $_e4of1e12xjcq86mqn = { renderToDom: renderToDom };

  var build$1 = function (spec) {
    var getMe = function () {
      return me;
    };
    var systemApi = Cell(NoContextApi(getMe));
    var info = $_8bk232xhjcq86lvj.getOrDie($_4eu02r12wjcq86mq4.toInfo($_9ymhaxwyjcq86lsv.deepMerge(spec, { behaviours: undefined })));
    var bBlob = $_cbk14j12mjcq86mo5.generate(spec);
    var bList = $_8tikr412njcq86moa.getBehaviours(bBlob);
    var bData = $_8tikr412njcq86moa.getData(bBlob);
    var definition = $_4eu02r12wjcq86mq4.toDefinition(info);
    var baseModification = { 'alloy.base.modification': $_4eu02r12wjcq86mq4.toModification(info) };
    var modification = $_31yzgn12rjcq86mot.combine(bData, baseModification, bList, definition).getOrDie();
    var modDefinition = $_eej9y1xkjcq86lvz.merge(definition, modification);
    var item = $_e4of1e12xjcq86mqn.renderToDom(modDefinition);
    var baseEvents = { 'alloy.base.behaviour': $_4eu02r12wjcq86mq4.toEvents(info) };
    var events = $_cmyo4k12tjcq86mpi.combine(bData, info.eventOrder(), bList, baseEvents).getOrDie();
    var subcomponents = Cell(info.components());
    var connect = function (newApi) {
      systemApi.set(newApi);
    };
    var disconnect = function () {
      systemApi.set(NoContextApi(getMe));
    };
    var syncComponents = function () {
      var children = $_212hfgy3jcq86ly0.children(item);
      var subs = $_54lr1fw9jcq86lqv.bind(children, function (child) {
        return systemApi.get().getByDom(child).fold(function () {
          return [];
        }, function (c) {
          return [c];
        });
      });
      subcomponents.set(subs);
    };
    var config = function (behaviour) {
      if (behaviour === $_2sollz10fjcq86m9e.apiConfig())
        return info.apis();
      var b = bData;
      var f = $_d1yi3wwzjcq86lsx.isFunction(b[behaviour.name()]) ? b[behaviour.name()] : function () {
        throw new Error('Could not find ' + behaviour.name() + ' in ' + $_4y3hcjxfjcq86lvf.stringify(spec, null, 2));
      };
      return f();
    };
    var hasConfigured = function (behaviour) {
      return $_d1yi3wwzjcq86lsx.isFunction(bData[behaviour.name()]);
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
      spec: $_88uun8wbjcq86lr5.constant(spec),
      readState: readState,
      connect: connect,
      disconnect: disconnect,
      element: $_88uun8wbjcq86lr5.constant(item),
      syncComponents: syncComponents,
      components: subcomponents.get,
      events: $_88uun8wbjcq86lr5.constant(events)
    });
    return me;
  };
  var $_d4jejl12ljcq86mnl = { build: build$1 };

  var isRecursive = function (component, originator, target) {
    return $_1mhuz1w8jcq86lql.eq(originator, component.element()) && !$_1mhuz1w8jcq86lql.eq(originator, target);
  };
  var $_6xtpzi12zjcq86mr4 = {
    events: $_fpvm9zw6jcq86lqb.derive([$_fpvm9zw6jcq86lqb.can($_d5i57fwwjcq86lsp.focus(), function (component, simulatedEvent) {
        var originator = simulatedEvent.event().originator();
        var target = simulatedEvent.event().target();
        if (isRecursive(component, originator, target)) {
          console.warn($_d5i57fwwjcq86lsp.focus() + ' did not get interpreted by the desired target. ' + '\nOriginator: ' + $_yz1udy9jcq86lz2.element(originator) + '\nTarget: ' + $_yz1udy9jcq86lz2.element(target) + '\nCheck the ' + $_d5i57fwwjcq86lsp.focus() + ' event handlers');
          return false;
        } else {
          return true;
        }
      })])
  };

  var make$1 = function (spec) {
    return spec;
  };
  var $_1tdx7p130jcq86mr7 = { make: make$1 };

  var buildSubcomponents = function (spec) {
    var components = $_1z89rrx6jcq86lub.readOr('components', [])(spec);
    return $_54lr1fw9jcq86lqv.map(components, build);
  };
  var buildFromSpec = function (userSpec) {
    var spec = $_1tdx7p130jcq86mr7.make(userSpec);
    var components = buildSubcomponents(spec);
    var completeSpec = $_9ymhaxwyjcq86lsv.deepMerge($_6xtpzi12zjcq86mr4, spec, $_1z89rrx6jcq86lub.wrap('components', components));
    return $_74ri01x8jcq86luv.value($_d4jejl12ljcq86mnl.build(completeSpec));
  };
  var text = function (textContent) {
    var element = $_96tjzawtjcq86lsc.fromText(textContent);
    return external({ element: element });
  };
  var external = function (spec) {
    var extSpec = $_8bk232xhjcq86lvj.asStructOrDie('external.component', $_8bk232xhjcq86lvj.objOfOnly([
      $_2a8tl5x2jcq86ltk.strict('element'),
      $_2a8tl5x2jcq86ltk.option('uid')
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
      $_crpkad10mjcq86mbh.writeOnly(extSpec.element(), uid);
    });
    var me = ComponentApi({
      getSystem: systemApi.get,
      config: $_2334kywajcq86lr3.none,
      hasConfigured: $_88uun8wbjcq86lr5.constant(false),
      connect: connect,
      disconnect: disconnect,
      element: $_88uun8wbjcq86lr5.constant(extSpec.element()),
      spec: $_88uun8wbjcq86lr5.constant(spec),
      readState: $_88uun8wbjcq86lr5.constant('No state'),
      syncComponents: $_88uun8wbjcq86lr5.noop,
      components: $_88uun8wbjcq86lr5.constant([]),
      events: $_88uun8wbjcq86lr5.constant({})
    });
    return $_2sollz10fjcq86m9e.premade(me);
  };
  var build = function (rawUserSpec) {
    return $_2sollz10fjcq86m9e.getPremade(rawUserSpec).fold(function () {
      var userSpecWithUid = $_9ymhaxwyjcq86lsv.deepMerge({ uid: $_crpkad10mjcq86mbh.generate('') }, rawUserSpec);
      return buildFromSpec(userSpecWithUid).getOrDie();
    }, function (prebuilt) {
      return prebuilt;
    });
  };
  var $_7wb9no12kjcq86mn1 = {
    build: build,
    premade: $_2sollz10fjcq86m9e.premade,
    external: external,
    text: text
  };

  var hoverEvent = 'alloy.item-hover';
  var focusEvent = 'alloy.item-focus';
  var onHover = function (item) {
    if ($_907xlxygjcq86lzf.search(item.element()).isNone() || Focusing.isFocused(item)) {
      if (!Focusing.isFocused(item))
        Focusing.focus(item);
      $_36xfsfwvjcq86lsk.emitWith(item, hoverEvent, { item: item });
    }
  };
  var onFocus = function (item) {
    $_36xfsfwvjcq86lsk.emitWith(item, focusEvent, { item: item });
  };
  var $_2bhvw134jcq86mrn = {
    hover: $_88uun8wbjcq86lr5.constant(hoverEvent),
    focus: $_88uun8wbjcq86lr5.constant(focusEvent),
    onHover: onHover,
    onFocus: onFocus
  };

  var builder = function (info) {
    return {
      dom: $_9ymhaxwyjcq86lsv.deepMerge(info.dom(), { attributes: { role: info.toggling().isSome() ? 'menuitemcheckbox' : 'menuitem' } }),
      behaviours: $_9ymhaxwyjcq86lsv.deepMerge($_5q0i93w4jcq86lpj.derive([
        info.toggling().fold(Toggling.revoke, function (tConfig) {
          return Toggling.config($_9ymhaxwyjcq86lsv.deepMerge({ aria: { mode: 'checked' } }, tConfig));
        }),
        Focusing.config({
          ignore: info.ignoreFocus(),
          onFocus: function (component) {
            $_2bhvw134jcq86mrn.onFocus(component);
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
      events: $_fpvm9zw6jcq86lqb.derive([
        $_fpvm9zw6jcq86lqb.runWithTarget($_d5i57fwwjcq86lsp.tapOrClick(), $_36xfsfwvjcq86lsk.emitExecute),
        $_fpvm9zw6jcq86lqb.cutter($_d9eamdwxjcq86lss.mousedown()),
        $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.mouseover(), $_2bhvw134jcq86mrn.onHover),
        $_fpvm9zw6jcq86lqb.run($_d5i57fwwjcq86lsp.focusItem(), Focusing.focus)
      ]),
      components: info.components(),
      domModification: info.domModification()
    };
  };
  var schema$11 = [
    $_2a8tl5x2jcq86ltk.strict('data'),
    $_2a8tl5x2jcq86ltk.strict('components'),
    $_2a8tl5x2jcq86ltk.strict('dom'),
    $_2a8tl5x2jcq86ltk.option('toggling'),
    $_2a8tl5x2jcq86ltk.defaulted('itemBehaviours', {}),
    $_2a8tl5x2jcq86ltk.defaulted('ignoreFocus', false),
    $_2a8tl5x2jcq86ltk.defaulted('domModification', {}),
    $_5l2dbmytjcq86m0r.output('builder', builder)
  ];

  var builder$1 = function (detail) {
    return {
      dom: detail.dom(),
      components: detail.components(),
      events: $_fpvm9zw6jcq86lqb.derive([$_fpvm9zw6jcq86lqb.stopper($_d5i57fwwjcq86lsp.focusItem())])
    };
  };
  var schema$12 = [
    $_2a8tl5x2jcq86ltk.strict('dom'),
    $_2a8tl5x2jcq86ltk.strict('components'),
    $_5l2dbmytjcq86m0r.output('builder', builder$1)
  ];

  var owner$2 = 'item-widget';
  var partTypes = [$_8pawjq10kjcq86mak.required({
      name: 'widget',
      overrides: function (detail) {
        return {
          behaviours: $_5q0i93w4jcq86lpj.derive([me.config({
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
  var $_c5suf5137jcq86msa = {
    owner: $_88uun8wbjcq86lr5.constant(owner$2),
    parts: $_88uun8wbjcq86lr5.constant(partTypes)
  };

  var builder$2 = function (info) {
    var subs = $_8jdkda10ijcq86m9x.substitutes($_c5suf5137jcq86msa.owner(), info, $_c5suf5137jcq86msa.parts());
    var components = $_8jdkda10ijcq86m9x.components($_c5suf5137jcq86msa.owner(), info, subs.internals());
    var focusWidget = function (component) {
      return $_8jdkda10ijcq86m9x.getPart(component, info, 'widget').map(function (widget) {
        Keying.focusIn(widget);
        return widget;
      });
    };
    var onHorizontalArrow = function (component, simulatedEvent) {
      return $_2s396bzxjcq86m63.inside(simulatedEvent.event().target()) ? $_2334kywajcq86lr3.none() : function () {
        if (info.autofocus()) {
          simulatedEvent.setSource(component.element());
          return $_2334kywajcq86lr3.none();
        } else {
          return $_2334kywajcq86lr3.none();
        }
      }();
    };
    return $_9ymhaxwyjcq86lsv.deepMerge({
      dom: info.dom(),
      components: components,
      domModification: info.domModification(),
      events: $_fpvm9zw6jcq86lqb.derive([
        $_fpvm9zw6jcq86lqb.runOnExecute(function (component, simulatedEvent) {
          focusWidget(component).each(function (widget) {
            simulatedEvent.stop();
          });
        }),
        $_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.mouseover(), $_2bhvw134jcq86mrn.onHover),
        $_fpvm9zw6jcq86lqb.run($_d5i57fwwjcq86lsp.focusItem(), function (component, simulatedEvent) {
          if (info.autofocus())
            focusWidget(component);
          else
            Focusing.focus(component);
        })
      ]),
      behaviours: $_5q0i93w4jcq86lpj.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: info.data()
          }
        }),
        Focusing.config({
          onFocus: function (component) {
            $_2bhvw134jcq86mrn.onFocus(component);
          }
        }),
        Keying.config({
          mode: 'special',
          onLeft: onHorizontalArrow,
          onRight: onHorizontalArrow,
          onEscape: function (component, simulatedEvent) {
            if (!Focusing.isFocused(component) && !info.autofocus()) {
              Focusing.focus(component);
              return $_2334kywajcq86lr3.some(true);
            } else if (info.autofocus()) {
              simulatedEvent.setSource(component.element());
              return $_2334kywajcq86lr3.none();
            } else {
              return $_2334kywajcq86lr3.none();
            }
          }
        })
      ])
    });
  };
  var schema$13 = [
    $_2a8tl5x2jcq86ltk.strict('uid'),
    $_2a8tl5x2jcq86ltk.strict('data'),
    $_2a8tl5x2jcq86ltk.strict('components'),
    $_2a8tl5x2jcq86ltk.strict('dom'),
    $_2a8tl5x2jcq86ltk.defaulted('autofocus', false),
    $_2a8tl5x2jcq86ltk.defaulted('domModification', {}),
    $_8jdkda10ijcq86m9x.defaultUidsSchema($_c5suf5137jcq86msa.parts()),
    $_5l2dbmytjcq86m0r.output('builder', builder$2)
  ];

  var itemSchema$1 = $_8bk232xhjcq86lvj.choose('type', {
    widget: schema$13,
    item: schema$11,
    separator: schema$12
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
  var parts = [$_8pawjq10kjcq86mak.group({
      factory: {
        sketch: function (spec) {
          var itemInfo = $_8bk232xhjcq86lvj.asStructOrDie('menu.spec item', itemSchema$1, spec);
          return itemInfo.builder()(itemInfo);
        }
      },
      name: 'items',
      unit: 'item',
      defaults: function (detail, u) {
        var fallbackUid = $_crpkad10mjcq86mbh.generate('');
        return $_9ymhaxwyjcq86lsv.deepMerge({ uid: fallbackUid }, u);
      },
      overrides: function (detail, u) {
        return {
          type: u.type,
          ignoreFocus: detail.fakeFocus(),
          domModification: { classes: [detail.markers().item()] }
        };
      }
    })];
  var schema$10 = [
    $_2a8tl5x2jcq86ltk.strict('value'),
    $_2a8tl5x2jcq86ltk.strict('items'),
    $_2a8tl5x2jcq86ltk.strict('dom'),
    $_2a8tl5x2jcq86ltk.strict('components'),
    $_2a8tl5x2jcq86ltk.defaulted('eventOrder', {}),
    $_flsnpp10djcq86m91.field('menuBehaviours', [
      Highlighting,
      me,
      Composing,
      Keying
    ]),
    $_2a8tl5x2jcq86ltk.defaultedOf('movement', {
      mode: 'menu',
      moveOnTab: true
    }, $_8bk232xhjcq86lvj.choose('mode', {
      grid: [
        $_5l2dbmytjcq86m0r.initSize(),
        $_5l2dbmytjcq86m0r.output('config', configureGrid)
      ],
      menu: [
        $_2a8tl5x2jcq86ltk.defaulted('moveOnTab', true),
        $_5l2dbmytjcq86m0r.output('config', configureMenu)
      ]
    })),
    $_5l2dbmytjcq86m0r.itemMarkers(),
    $_2a8tl5x2jcq86ltk.defaulted('fakeFocus', false),
    $_2a8tl5x2jcq86ltk.defaulted('focusManager', $_1tmjp6zgjcq86m3y.dom()),
    $_5l2dbmytjcq86m0r.onHandler('onHighlight')
  ];
  var $_7lc319132jcq86mra = {
    name: $_88uun8wbjcq86lr5.constant('Menu'),
    schema: $_88uun8wbjcq86lr5.constant(schema$10),
    parts: $_88uun8wbjcq86lr5.constant(parts)
  };

  var focusEvent$1 = 'alloy.menu-focus';
  var $_1kdznb139jcq86msi = { focus: $_88uun8wbjcq86lr5.constant(focusEvent$1) };

  var make$2 = function (detail, components, spec, externals) {
    return $_9ymhaxwyjcq86lsv.deepMerge({
      dom: $_9ymhaxwyjcq86lsv.deepMerge(detail.dom(), { attributes: { role: 'menu' } }),
      uid: detail.uid(),
      behaviours: $_9ymhaxwyjcq86lsv.deepMerge($_5q0i93w4jcq86lpj.derive([
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
        Composing.config({ find: $_88uun8wbjcq86lr5.identity }),
        Keying.config(detail.movement().config()(detail, detail.movement()))
      ]), $_flsnpp10djcq86m91.get(detail.menuBehaviours())),
      events: $_fpvm9zw6jcq86lqb.derive([
        $_fpvm9zw6jcq86lqb.run($_2bhvw134jcq86mrn.focus(), function (menu, simulatedEvent) {
          var event = simulatedEvent.event();
          menu.getSystem().getByDom(event.target()).each(function (item) {
            Highlighting.highlight(menu, item);
            simulatedEvent.stop();
            $_36xfsfwvjcq86lsk.emitWith(menu, $_1kdznb139jcq86msi.focus(), {
              menu: menu,
              item: item
            });
          });
        }),
        $_fpvm9zw6jcq86lqb.run($_2bhvw134jcq86mrn.hover(), function (menu, simulatedEvent) {
          var item = simulatedEvent.event().item();
          Highlighting.highlight(menu, item);
        })
      ]),
      components: components,
      eventOrder: detail.eventOrder()
    });
  };
  var $_b310fn138jcq86mse = { make: make$2 };

  var Menu = $_6wocjl10ejcq86m96.composite({
    name: 'Menu',
    configFields: $_7lc319132jcq86mra.schema(),
    partFields: $_7lc319132jcq86mra.parts(),
    factory: $_b310fn138jcq86mse.make
  });

  var preserve$2 = function (f, container) {
    var ownerDoc = $_212hfgy3jcq86ly0.owner(container);
    var refocus = $_907xlxygjcq86lzf.active(ownerDoc).bind(function (focused) {
      var hasFocus = function (elem) {
        return $_1mhuz1w8jcq86lql.eq(focused, elem);
      };
      return hasFocus(container) ? $_2334kywajcq86lr3.some(container) : $_1kg0jyijcq86lzk.descendant(container, hasFocus);
    });
    var result = f(container);
    refocus.each(function (oldFocus) {
      $_907xlxygjcq86lzf.active(ownerDoc).filter(function (newFocus) {
        return $_1mhuz1w8jcq86lql.eq(newFocus, oldFocus);
      }).orThunk(function () {
        $_907xlxygjcq86lzf.focus(oldFocus);
      });
    });
    return result;
  };
  var $_acqrxa13djcq86msx = { preserve: preserve$2 };

  var set$7 = function (component, replaceConfig, replaceState, data) {
    $_9qj153y1jcq86lxo.detachChildren(component);
    $_acqrxa13djcq86msx.preserve(function () {
      var children = $_54lr1fw9jcq86lqv.map(data, component.getSystem().build);
      $_54lr1fw9jcq86lqv.each(children, function (l) {
        $_9qj153y1jcq86lxo.attach(component, l);
      });
    }, component.element());
  };
  var insert = function (component, replaceConfig, insertion, childSpec) {
    var child = component.getSystem().build(childSpec);
    $_9qj153y1jcq86lxo.attachWith(component, child, insertion);
  };
  var append$2 = function (component, replaceConfig, replaceState, appendee) {
    insert(component, replaceConfig, $_dm5y40y2jcq86lxy.append, appendee);
  };
  var prepend$2 = function (component, replaceConfig, replaceState, prependee) {
    insert(component, replaceConfig, $_dm5y40y2jcq86lxy.prepend, prependee);
  };
  var remove$7 = function (component, replaceConfig, replaceState, removee) {
    var children = contents(component, replaceConfig);
    var foundChild = $_54lr1fw9jcq86lqv.find(children, function (child) {
      return $_1mhuz1w8jcq86lql.eq(removee.element(), child.element());
    });
    foundChild.each($_9qj153y1jcq86lxo.detach);
  };
  var contents = function (component, replaceConfig) {
    return component.components();
  };
  var $_epvq3313cjcq86msr = {
    append: append$2,
    prepend: prepend$2,
    remove: remove$7,
    set: set$7,
    contents: contents
  };

  var Replacing = $_5q0i93w4jcq86lpj.create({
    fields: [],
    name: 'replacing',
    apis: $_epvq3313cjcq86msr
  });

  var transpose = function (obj) {
    return $_3jdnysx0jcq86lsz.tupleMap(obj, function (v, k) {
      return {
        k: v,
        v: k
      };
    });
  };
  var trace = function (items, byItem, byMenu, finish) {
    return $_1z89rrx6jcq86lub.readOptFrom(byMenu, finish).bind(function (triggerItem) {
      return $_1z89rrx6jcq86lub.readOptFrom(items, triggerItem).bind(function (triggerMenu) {
        var rest = trace(items, byItem, byMenu, triggerMenu);
        return $_2334kywajcq86lr3.some([triggerMenu].concat(rest));
      });
    }).getOr([]);
  };
  var generate$5 = function (menus, expansions) {
    var items = {};
    $_3jdnysx0jcq86lsz.each(menus, function (menuItems, menu) {
      $_54lr1fw9jcq86lqv.each(menuItems, function (item) {
        items[item] = menu;
      });
    });
    var byItem = expansions;
    var byMenu = transpose(expansions);
    var menuPaths = $_3jdnysx0jcq86lsz.map(byMenu, function (triggerItem, submenu) {
      return [submenu].concat(trace(items, byItem, byMenu, submenu));
    });
    return $_3jdnysx0jcq86lsz.map(items, function (path) {
      return $_1z89rrx6jcq86lub.readOptFrom(menuPaths, path).getOr([path]);
    });
  };
  var $_3gx6ad13gjcq86mu9 = { generate: generate$5 };

  var LayeredState = function () {
    var expansions = Cell({});
    var menus = Cell({});
    var paths = Cell({});
    var primary = Cell($_2334kywajcq86lr3.none());
    var toItemValues = Cell($_88uun8wbjcq86lr5.constant([]));
    var clear = function () {
      expansions.set({});
      menus.set({});
      paths.set({});
      primary.set($_2334kywajcq86lr3.none());
    };
    var isClear = function () {
      return primary.get().isNone();
    };
    var setContents = function (sPrimary, sMenus, sExpansions, sToItemValues) {
      primary.set($_2334kywajcq86lr3.some(sPrimary));
      expansions.set(sExpansions);
      menus.set(sMenus);
      toItemValues.set(sToItemValues);
      var menuValues = sToItemValues(sMenus);
      var sPaths = $_3gx6ad13gjcq86mu9.generate(menuValues, sExpansions);
      paths.set(sPaths);
    };
    var expand = function (itemValue) {
      return $_1z89rrx6jcq86lub.readOptFrom(expansions.get(), itemValue).map(function (menu) {
        var current = $_1z89rrx6jcq86lub.readOptFrom(paths.get(), itemValue).getOr([]);
        return [menu].concat(current);
      });
    };
    var collapse = function (itemValue) {
      return $_1z89rrx6jcq86lub.readOptFrom(paths.get(), itemValue).bind(function (path) {
        return path.length > 1 ? $_2334kywajcq86lr3.some(path.slice(1)) : $_2334kywajcq86lr3.none();
      });
    };
    var refresh = function (itemValue) {
      return $_1z89rrx6jcq86lub.readOptFrom(paths.get(), itemValue);
    };
    var lookupMenu = function (menuValue) {
      return $_1z89rrx6jcq86lub.readOptFrom(menus.get(), menuValue);
    };
    var otherMenus = function (path) {
      var menuValues = toItemValues.get()(menus.get());
      return $_54lr1fw9jcq86lqv.difference($_3jdnysx0jcq86lsz.keys(menuValues), path);
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
  };

  var make$3 = function (detail, rawUiSpec) {
    var buildMenus = function (container, menus) {
      return $_3jdnysx0jcq86lsz.map(menus, function (spec, name) {
        var data = Menu.sketch($_9ymhaxwyjcq86lsv.deepMerge(spec, {
          value: name,
          items: spec.items,
          markers: $_1z89rrx6jcq86lub.narrow(rawUiSpec.markers, [
            'item',
            'selectedItem'
          ]),
          fakeFocus: detail.fakeFocus(),
          onHighlight: detail.onHighlight(),
          focusManager: detail.fakeFocus() ? $_1tmjp6zgjcq86m3y.highlights() : $_1tmjp6zgjcq86m3y.dom()
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
      return $_3jdnysx0jcq86lsz.map(detail.data().menus(), function (data, menuName) {
        return $_54lr1fw9jcq86lqv.bind(data.items, function (item) {
          return item.type === 'separator' ? [] : [item.data.value];
        });
      });
    };
    var setActiveMenu = function (container, menu) {
      Highlighting.highlight(container, menu);
      Highlighting.getHighlighted(menu).orThunk(function () {
        return Highlighting.getFirst(menu);
      }).each(function (item) {
        $_36xfsfwvjcq86lsk.dispatch(container, item.element(), $_d5i57fwwjcq86lsp.focusItem());
      });
    };
    var getMenus = function (state, menuValues) {
      return $_5pzzdmyejcq86lzc.cat($_54lr1fw9jcq86lqv.map(menuValues, state.lookupMenu));
    };
    var updateMenuPath = function (container, state, path) {
      return $_2334kywajcq86lr3.from(path[0]).bind(state.lookupMenu).map(function (activeMenu) {
        var rest = getMenus(state, path.slice(1));
        $_54lr1fw9jcq86lqv.each(rest, function (r) {
          $_3nts6pxujcq86lwy.add(r.element(), detail.markers().backgroundMenu());
        });
        if (!$_3ngt01y7jcq86lyf.inBody(activeMenu.element())) {
          Replacing.append(container, $_7wb9no12kjcq86mn1.premade(activeMenu));
        }
        $_75zlxi12yjcq86mr0.remove(activeMenu.element(), [detail.markers().backgroundMenu()]);
        setActiveMenu(container, activeMenu);
        var others = getMenus(state, state.otherMenus(path));
        $_54lr1fw9jcq86lqv.each(others, function (o) {
          $_75zlxi12yjcq86mr0.remove(o.element(), [detail.markers().backgroundMenu()]);
          if (!detail.stayInDom())
            Replacing.remove(container, o);
        });
        return activeMenu;
      });
    };
    var expandRight = function (container, item) {
      var value = getItemValue(item);
      return state.expand(value).bind(function (path) {
        $_2334kywajcq86lr3.from(path[0]).bind(state.lookupMenu).each(function (activeMenu) {
          if (!$_3ngt01y7jcq86lyf.inBody(activeMenu.element())) {
            Replacing.append(container, $_7wb9no12kjcq86mn1.premade(activeMenu));
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
      return $_2s396bzxjcq86m63.inside(item.element()) ? $_2334kywajcq86lr3.none() : expandRight(container, item);
    };
    var onLeft = function (container, item) {
      return $_2s396bzxjcq86m63.inside(item.element()) ? $_2334kywajcq86lr3.none() : collapseLeft(container, item);
    };
    var onEscape = function (container, item) {
      return collapseLeft(container, item).orThunk(function () {
        return detail.onEscape()(container, item);
      });
    };
    var keyOnItem = function (f) {
      return function (container, simulatedEvent) {
        return $_66bqgjzmjcq86m4s.closest(simulatedEvent.getSource(), '.' + detail.markers().item()).bind(function (target) {
          return container.getSystem().getByDom(target).bind(function (item) {
            return f(container, item);
          });
        });
      };
    };
    var events = $_fpvm9zw6jcq86lqb.derive([
      $_fpvm9zw6jcq86lqb.run($_1kdznb139jcq86msi.focus(), function (sandbox, simulatedEvent) {
        var menu = simulatedEvent.event().menu();
        Highlighting.highlight(sandbox, menu);
      }),
      $_fpvm9zw6jcq86lqb.runOnExecute(function (sandbox, simulatedEvent) {
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
      $_fpvm9zw6jcq86lqb.runOnAttached(function (container, simulatedEvent) {
        setup(container).each(function (primary) {
          Replacing.append(container, $_7wb9no12kjcq86mn1.premade(primary));
          if (detail.openImmediately()) {
            setActiveMenu(container, primary);
            detail.onOpenMenu()(container, primary);
          }
        });
      })
    ].concat(detail.navigateOnHover() ? [$_fpvm9zw6jcq86lqb.run($_2bhvw134jcq86mrn.hover(), function (sandbox, simulatedEvent) {
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
      behaviours: $_9ymhaxwyjcq86lsv.deepMerge($_5q0i93w4jcq86lpj.derive([
        Keying.config({
          mode: 'special',
          onRight: keyOnItem(onRight),
          onLeft: keyOnItem(onLeft),
          onEscape: keyOnItem(onEscape),
          focusIn: function (container, keyInfo) {
            state.getPrimary().each(function (primary) {
              $_36xfsfwvjcq86lsk.dispatch(container, primary.element(), $_d5i57fwwjcq86lsp.focusItem());
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
      ]), $_flsnpp10djcq86m91.get(detail.tmenuBehaviours())),
      eventOrder: detail.eventOrder(),
      apis: { collapseMenu: collapseMenuApi },
      events: events
    };
  };
  var $_2pgizh13ejcq86mtb = {
    make: make$3,
    collapseItem: $_88uun8wbjcq86lr5.constant('collapse-item')
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
      menus: $_1z89rrx6jcq86lub.wrap(name, menu),
      expansions: {}
    };
  };
  var collapseItem = function (text) {
    return {
      value: $_f0a0c310gjcq86m9k.generate($_2pgizh13ejcq86mtb.collapseItem()),
      text: text
    };
  };
  var TieredMenu = $_6wocjl10ejcq86m96.single({
    name: 'TieredMenu',
    configFields: [
      $_5l2dbmytjcq86m0r.onStrictKeyboardHandler('onExecute'),
      $_5l2dbmytjcq86m0r.onStrictKeyboardHandler('onEscape'),
      $_5l2dbmytjcq86m0r.onStrictHandler('onOpenMenu'),
      $_5l2dbmytjcq86m0r.onStrictHandler('onOpenSubmenu'),
      $_5l2dbmytjcq86m0r.onHandler('onCollapseMenu'),
      $_2a8tl5x2jcq86ltk.defaulted('openImmediately', true),
      $_2a8tl5x2jcq86ltk.strictObjOf('data', [
        $_2a8tl5x2jcq86ltk.strict('primary'),
        $_2a8tl5x2jcq86ltk.strict('menus'),
        $_2a8tl5x2jcq86ltk.strict('expansions')
      ]),
      $_2a8tl5x2jcq86ltk.defaulted('fakeFocus', false),
      $_5l2dbmytjcq86m0r.onHandler('onHighlight'),
      $_5l2dbmytjcq86m0r.onHandler('onHover'),
      $_5l2dbmytjcq86m0r.tieredMenuMarkers(),
      $_2a8tl5x2jcq86ltk.strict('dom'),
      $_2a8tl5x2jcq86ltk.defaulted('navigateOnHover', true),
      $_2a8tl5x2jcq86ltk.defaulted('stayInDom', false),
      $_flsnpp10djcq86m91.field('tmenuBehaviours', [
        Keying,
        Highlighting,
        Composing,
        Replacing
      ]),
      $_2a8tl5x2jcq86ltk.defaulted('eventOrder', {})
    ],
    apis: {
      collapseMenu: function (apis, tmenu) {
        apis.collapseMenu(tmenu);
      }
    },
    factory: $_2pgizh13ejcq86mtb.make,
    extraApis: {
      tieredData: tieredData,
      singleData: singleData,
      collapseItem: collapseItem
    }
  });

  var scrollable = $_3fu6k5z1jcq86m28.resolve('scrollable');
  var register$1 = function (element) {
    $_3nts6pxujcq86lwy.add(element, scrollable);
  };
  var deregister = function (element) {
    $_3nts6pxujcq86lwy.remove(element, scrollable);
  };
  var $_8kkxki13hjcq86muj = {
    register: register$1,
    deregister: deregister,
    scrollable: $_88uun8wbjcq86lr5.constant(scrollable)
  };

  var getValue$4 = function (item) {
    return $_1z89rrx6jcq86lub.readOptFrom(item, 'format').getOr(item.title);
  };
  var convert$1 = function (formats, memMenuThunk) {
    var mainMenu = makeMenu('Styles', [].concat($_54lr1fw9jcq86lqv.map(formats.items, function (k) {
      return makeItem(getValue$4(k), k.title, k.isSelected(), k.getPreview(), $_1z89rrx6jcq86lub.hasKey(formats.expansions, getValue$4(k)));
    })), memMenuThunk, false);
    var submenus = $_3jdnysx0jcq86lsz.map(formats.menus, function (menuItems, menuName) {
      var items = $_54lr1fw9jcq86lqv.map(menuItems, function (item) {
        return makeItem(getValue$4(item), item.title, item.isSelected !== undefined ? item.isSelected() : false, item.getPreview !== undefined ? item.getPreview() : '', $_1z89rrx6jcq86lub.hasKey(formats.expansions, getValue$4(item)));
      });
      return makeMenu(menuName, items, memMenuThunk, true);
    });
    var menus = $_9ymhaxwyjcq86lsv.deepMerge(submenus, $_1z89rrx6jcq86lub.wrap('styles', mainMenu));
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
        classes: isMenu ? [$_3fu6k5z1jcq86m28.resolve('styles-item-is-menu')] : []
      },
      toggling: {
        toggleOnExecute: false,
        toggleClass: $_3fu6k5z1jcq86m28.resolve('format-matches'),
        selected: selected
      },
      itemBehaviours: $_5q0i93w4jcq86lpj.derive(isMenu ? [] : [$_g86iz4z0jcq86m25.format(value, function (comp, status) {
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
            classes: [$_3fu6k5z1jcq86m28.resolve('styles-collapser')]
          },
          components: collapsable ? [
            {
              dom: {
                tag: 'span',
                classes: [$_3fu6k5z1jcq86m28.resolve('styles-collapse-icon')]
              }
            },
            $_7wb9no12kjcq86mn1.text(value)
          ] : [$_7wb9no12kjcq86mn1.text(value)],
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
            classes: [$_3fu6k5z1jcq86m28.resolve('styles-menu-items-container')]
          },
          components: [Menu.parts().items({})],
          behaviours: $_5q0i93w4jcq86lpj.derive([$_adfefz11sjcq86mif.config('adhoc-scrollable-menu', [
              $_fpvm9zw6jcq86lqb.runOnAttached(function (component, simulatedEvent) {
                $_8xsijozsjcq86m57.set(component.element(), 'overflow-y', 'auto');
                $_8xsijozsjcq86m57.set(component.element(), '-webkit-overflow-scrolling', 'touch');
                $_8kkxki13hjcq86muj.register(component.element());
              }),
              $_fpvm9zw6jcq86lqb.runOnDetached(function (component) {
                $_8xsijozsjcq86m57.remove(component.element(), 'overflow-y');
                $_8xsijozsjcq86m57.remove(component.element(), '-webkit-overflow-scrolling');
                $_8kkxki13hjcq86muj.deregister(component.element());
              })
            ])])
        }
      ],
      items: items,
      menuBehaviours: $_5q0i93w4jcq86lpj.derive([Transitioning.config({
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
    var memMenu = $_73qm4s11ejcq86mg7.record(TieredMenu.sketch({
      dom: {
        tag: 'div',
        classes: [$_3fu6k5z1jcq86m28.resolve('styles-menu')]
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
        var w = $_95l2gy117jcq86mf0.get(container.element());
        $_95l2gy117jcq86mf0.set(menu.element(), w);
        Transitioning.jumpTo(menu, 'current');
      },
      onOpenSubmenu: function (container, item, submenu) {
        var w = $_95l2gy117jcq86mf0.get(container.element());
        var menu = $_66bqgjzmjcq86m4s.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var menuComp = container.getSystem().getByDom(menu).getOrDie();
        $_95l2gy117jcq86mf0.set(submenu.element(), w);
        Transitioning.progressTo(menuComp, 'before');
        Transitioning.jumpTo(submenu, 'after');
        Transitioning.progressTo(submenu, 'current');
      },
      onCollapseMenu: function (container, item, menu) {
        var submenu = $_66bqgjzmjcq86m4s.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var submenuComp = container.getSystem().getByDom(submenu).getOrDie();
        Transitioning.progressTo(submenuComp, 'after');
        Transitioning.progressTo(menu, 'current');
      },
      navigateOnHover: false,
      openImmediately: true,
      data: dataset.tmenu,
      markers: {
        backgroundMenu: $_3fu6k5z1jcq86m28.resolve('styles-background-menu'),
        menu: $_3fu6k5z1jcq86m28.resolve('styles-menu'),
        selectedMenu: $_3fu6k5z1jcq86m28.resolve('styles-selected-menu'),
        item: $_3fu6k5z1jcq86m28.resolve('styles-item'),
        selectedItem: $_3fu6k5z1jcq86m28.resolve('styles-selected-item')
      }
    }));
    return memMenu.asSpec();
  };
  var $_7uc9d512fjcq86mlq = { sketch: sketch$9 };

  var getFromExpandingItem = function (item) {
    var newItem = $_9ymhaxwyjcq86lsv.deepMerge($_1z89rrx6jcq86lub.exclude(item, ['items']), { menu: true });
    var rest = expand(item.items);
    var newMenus = $_9ymhaxwyjcq86lsv.deepMerge(rest.menus, $_1z89rrx6jcq86lub.wrap(item.title, rest.items));
    var newExpansions = $_9ymhaxwyjcq86lsv.deepMerge(rest.expansions, $_1z89rrx6jcq86lub.wrap(item.title, item.title));
    return {
      item: newItem,
      menus: newMenus,
      expansions: newExpansions
    };
  };
  var getFromItem = function (item) {
    return $_1z89rrx6jcq86lub.hasKey(item, 'items') ? getFromExpandingItem(item) : {
      item: item,
      menus: {},
      expansions: {}
    };
  };
  var expand = function (items) {
    return $_54lr1fw9jcq86lqv.foldr(items, function (acc, item) {
      var newData = getFromItem(item);
      return {
        menus: $_9ymhaxwyjcq86lsv.deepMerge(acc.menus, newData.menus),
        items: [newData.item].concat(acc.items),
        expansions: $_9ymhaxwyjcq86lsv.deepMerge(acc.expansions, newData.expansions)
      };
    }, {
      menus: {},
      expansions: {},
      items: []
    });
  };
  var $_7nx6xb13ijcq86mun = { expand: expand };

  var register = function (editor, settings) {
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
      return $_9ymhaxwyjcq86lsv.deepMerge(item, {
        isSelected: isSelectedFor(item.format),
        getPreview: getPreview(item.format)
      });
    };
    var enrichMenu = function (item) {
      return $_9ymhaxwyjcq86lsv.deepMerge(item, {
        isSelected: $_88uun8wbjcq86lr5.constant(false),
        getPreview: $_88uun8wbjcq86lr5.constant('')
      });
    };
    var enrichCustom = function (item) {
      var formatName = $_f0a0c310gjcq86m9k.generate(item.title);
      var newItem = $_9ymhaxwyjcq86lsv.deepMerge(item, {
        format: formatName,
        isSelected: isSelectedFor(formatName),
        getPreview: getPreview(formatName)
      });
      editor.formatter.register(formatName, newItem);
      return newItem;
    };
    var formats = $_1z89rrx6jcq86lub.readOptFrom(settings, 'style_formats').getOr(DefaultStyleFormats);
    var doEnrich = function (items) {
      return $_54lr1fw9jcq86lqv.map(items, function (item) {
        if ($_1z89rrx6jcq86lub.hasKey(item, 'items')) {
          var newItems = doEnrich(item.items);
          return $_9ymhaxwyjcq86lsv.deepMerge(enrichMenu(item), { items: newItems });
        } else if ($_1z89rrx6jcq86lub.hasKey(item, 'format')) {
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
      return $_54lr1fw9jcq86lqv.bind(items, function (item) {
        if (item.items !== undefined) {
          var newItems = doPrune(item.items);
          return newItems.length > 0 ? [item] : [];
        } else {
          var keep = $_1z89rrx6jcq86lub.hasKey(item, 'format') ? editor.formatter.canApply(item.format) : true;
          return keep ? [item] : [];
        }
      });
    };
    var prunedItems = doPrune(formats);
    return $_7nx6xb13ijcq86mun.expand(prunedItems);
  };
  var ui = function (editor, formats, onDone) {
    var pruned = prune(editor, formats);
    return $_7uc9d512fjcq86mlq.sketch({
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
  var $_g94yds12djcq86mlh = {
    register: register,
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
    return $_54lr1fw9jcq86lqv.bind(toolbar, function (item) {
      return $_d1yi3wwzjcq86lsx.isArray(item) ? identifyFromArray(item) : extract$1(item);
    });
  };
  var identify = function (settings) {
    var toolbar = settings.toolbar !== undefined ? settings.toolbar : defaults;
    return $_d1yi3wwzjcq86lsx.isArray(toolbar) ? identifyFromArray(toolbar) : extract$1(toolbar);
  };
  var setup = function (realm, editor) {
    var commandSketch = function (name) {
      return function () {
        return $_4yx6ogz2jcq86m2a.forToolbarCommand(editor, name);
      };
    };
    var stateCommandSketch = function (name) {
      return function () {
        return $_4yx6ogz2jcq86m2a.forToolbarStateCommand(editor, name);
      };
    };
    var actionSketch = function (name, query, action) {
      return function () {
        return $_4yx6ogz2jcq86m2a.forToolbarStateAction(editor, name, query, action);
      };
    };
    var undo = commandSketch('undo');
    var redo = commandSketch('redo');
    var bold = stateCommandSketch('bold');
    var italic = stateCommandSketch('italic');
    var underline = stateCommandSketch('underline');
    var removeformat = commandSketch('removeformat');
    var link = function () {
      return $_fvkiix11ojcq86mhb.sketch(realm, editor);
    };
    var unlink = actionSketch('unlink', 'link', function () {
      editor.execCommand('unlink', null, false);
    });
    var image = function () {
      return $_276c6n11djcq86mg0.sketch(editor);
    };
    var bullist = actionSketch('unordered-list', 'ul', function () {
      editor.execCommand('InsertUnorderedList', null, false);
    });
    var numlist = actionSketch('ordered-list', 'ol', function () {
      editor.execCommand('InsertOrderedList', null, false);
    });
    var fontsizeselect = function () {
      return $_2wglee119jcq86mf3.sketch(realm, editor);
    };
    var forecolor = function () {
      return $_18hee10sjcq86mcx.sketch(realm, editor);
    };
    var styleFormats = $_g94yds12djcq86mlh.register(editor, editor.settings);
    var styleFormatsMenu = function () {
      return $_g94yds12djcq86mlh.ui(editor, styleFormats, function () {
        editor.fire('scrollIntoView');
      });
    };
    var styleselect = function () {
      return $_4yx6ogz2jcq86m2a.forToolbar('style-formats', function (button) {
        editor.fire('toReading');
        realm.dropup().appear(styleFormatsMenu, Toggling.on, button);
      }, $_5q0i93w4jcq86lpj.derive([
        Toggling.config({
          toggleClass: $_3fu6k5z1jcq86m28.resolve('toolbar-button-selected'),
          toggleOnExecute: false,
          aria: { mode: 'pressed' }
        }),
        Receiving.config({
          channels: $_1z89rrx6jcq86lub.wrapAll([
            $_g86iz4z0jcq86m25.receive($_cgqukwyojcq86lzy.orientationChanged(), Toggling.off),
            $_g86iz4z0jcq86m25.receive($_cgqukwyojcq86lzy.dropupDismissed(), Toggling.off)
          ])
        })
      ]));
    };
    var feature = function (prereq, sketch) {
      return {
        isSupported: function () {
          return prereq.forall(function (p) {
            return $_1z89rrx6jcq86lub.hasKey(editor.buttons, p);
          });
        },
        sketch: sketch
      };
    };
    return {
      undo: feature($_2334kywajcq86lr3.none(), undo),
      redo: feature($_2334kywajcq86lr3.none(), redo),
      bold: feature($_2334kywajcq86lr3.none(), bold),
      italic: feature($_2334kywajcq86lr3.none(), italic),
      underline: feature($_2334kywajcq86lr3.none(), underline),
      removeformat: feature($_2334kywajcq86lr3.none(), removeformat),
      link: feature($_2334kywajcq86lr3.none(), link),
      unlink: feature($_2334kywajcq86lr3.none(), unlink),
      image: feature($_2334kywajcq86lr3.none(), image),
      bullist: feature($_2334kywajcq86lr3.some('bullist'), bullist),
      numlist: feature($_2334kywajcq86lr3.some('numlist'), numlist),
      fontsizeselect: feature($_2334kywajcq86lr3.none(), fontsizeselect),
      forecolor: feature($_2334kywajcq86lr3.none(), forecolor),
      styleselect: feature($_2334kywajcq86lr3.none(), styleselect)
    };
  };
  var detect$4 = function (settings, features) {
    var itemNames = identify(settings);
    var present = {};
    return $_54lr1fw9jcq86lqv.bind(itemNames, function (iName) {
      var r = !$_1z89rrx6jcq86lub.hasKey(present, iName) && $_1z89rrx6jcq86lub.hasKey(features, iName) && features[iName].isSupported() ? [features[iName].sketch()] : [];
      present[iName] = true;
      return r;
    });
  };
  var $_c4c70uypjcq86m02 = {
    identify: identify,
    setup: setup,
    detect: detect$4
  };

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_88uun8wbjcq86lr5.constant(target),
      'x': $_88uun8wbjcq86lr5.constant(x),
      'y': $_88uun8wbjcq86lr5.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_88uun8wbjcq86lr5.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_96tjzawtjcq86lsc.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_88uun8wbjcq86lr5.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_88uun8wbjcq86lr5.curry(unbind, element, event, wrapped, useCapture) };
  };
  var bind$2 = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, false);
  };
  var capture$1 = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, true);
  };
  var unbind = function (element, event, handler, useCapture) {
    element.dom().removeEventListener(event, handler, useCapture);
  };
  var $_f49gpb13ljcq86mv3 = {
    bind: bind$2,
    capture: capture$1
  };

  var filter$1 = $_88uun8wbjcq86lr5.constant(true);
  var bind$1 = function (element, event, handler) {
    return $_f49gpb13ljcq86mv3.bind(element, event, filter$1, handler);
  };
  var capture = function (element, event, handler) {
    return $_f49gpb13ljcq86mv3.capture(element, event, filter$1, handler);
  };
  var $_cduncz13kjcq86mv0 = {
    bind: bind$1,
    capture: capture
  };

  var INTERVAL = 50;
  var INSURANCE = 1000 / INTERVAL;
  var get$11 = function (outerWindow) {
    var isPortrait = outerWindow.matchMedia('(orientation: portrait)').matches;
    return { isPortrait: $_88uun8wbjcq86lr5.constant(isPortrait) };
  };
  var getActualWidth = function (outerWindow) {
    var isIos = $_ggue51wgjcq86lrc.detect().os.isiOS();
    var isPortrait = get$11(outerWindow).isPortrait();
    return isIos && !isPortrait ? outerWindow.screen.height : outerWindow.screen.width;
  };
  var onChange = function (outerWindow, listeners) {
    var win = $_96tjzawtjcq86lsc.fromDom(outerWindow);
    var poller = null;
    var change = function () {
      clearInterval(poller);
      var orientation = get$11(outerWindow);
      listeners.onChange(orientation);
      onAdjustment(function () {
        listeners.onReady(orientation);
      });
    };
    var orientationHandle = $_cduncz13kjcq86mv0.bind(win, 'orientationchange', change);
    var onAdjustment = function (f) {
      clearInterval(poller);
      var flag = outerWindow.innerHeight;
      var insurance = 0;
      poller = setInterval(function () {
        if (flag !== outerWindow.innerHeight) {
          clearInterval(poller);
          f($_2334kywajcq86lr3.some(outerWindow.innerHeight));
        } else if (insurance > INSURANCE) {
          clearInterval(poller);
          f($_2334kywajcq86lr3.none());
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
  var $_qig5713jjcq86mut = {
    get: get$11,
    onChange: onChange,
    getActualWidth: getActualWidth
  };

  var DelayedFunction = function (fun, delay) {
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
  };

  var SIGNIFICANT_MOVE = 5;
  var LONGPRESS_DELAY = 400;
  var getTouch = function (event) {
    if (event.raw().touches === undefined || event.raw().touches.length !== 1)
      return $_2334kywajcq86lr3.none();
    return $_2334kywajcq86lr3.some(event.raw().touches[0]);
  };
  var isFarEnough = function (touch, data) {
    var distX = Math.abs(touch.clientX - data.x());
    var distY = Math.abs(touch.clientY - data.y());
    return distX > SIGNIFICANT_MOVE || distY > SIGNIFICANT_MOVE;
  };
  var monitor$1 = function (settings) {
    var startData = Cell($_2334kywajcq86lr3.none());
    var longpress = DelayedFunction(function (event) {
      startData.set($_2334kywajcq86lr3.none());
      settings.triggerEvent($_d5i57fwwjcq86lsp.longpress(), event);
    }, LONGPRESS_DELAY);
    var handleTouchstart = function (event) {
      getTouch(event).each(function (touch) {
        longpress.cancel();
        var data = {
          x: $_88uun8wbjcq86lr5.constant(touch.clientX),
          y: $_88uun8wbjcq86lr5.constant(touch.clientY),
          target: event.target
        };
        longpress.schedule(data);
        startData.set($_2334kywajcq86lr3.some(data));
      });
      return $_2334kywajcq86lr3.none();
    };
    var handleTouchmove = function (event) {
      longpress.cancel();
      getTouch(event).each(function (touch) {
        startData.get().each(function (data) {
          if (isFarEnough(touch, data))
            startData.set($_2334kywajcq86lr3.none());
        });
      });
      return $_2334kywajcq86lr3.none();
    };
    var handleTouchend = function (event) {
      longpress.cancel();
      var isSame = function (data) {
        return $_1mhuz1w8jcq86lql.eq(data.target(), event.target());
      };
      return startData.get().filter(isSame).map(function (data) {
        return settings.triggerEvent($_d5i57fwwjcq86lsp.tap(), event);
      });
    };
    var handlers = $_1z89rrx6jcq86lub.wrapAll([
      {
        key: $_d9eamdwxjcq86lss.touchstart(),
        value: handleTouchstart
      },
      {
        key: $_d9eamdwxjcq86lss.touchmove(),
        value: handleTouchmove
      },
      {
        key: $_d9eamdwxjcq86lss.touchend(),
        value: handleTouchend
      }
    ]);
    var fireIfReady = function (event, type) {
      return $_1z89rrx6jcq86lub.readOptFrom(handlers, type).bind(function (handler) {
        return handler(event);
      });
    };
    return { fireIfReady: fireIfReady };
  };
  var $_55577n13rjcq86mw7 = { monitor: monitor$1 };

  var monitor = function (editorApi) {
    var tapEvent = $_55577n13rjcq86mw7.monitor({
      triggerEvent: function (type, evt) {
        editorApi.onTapContent(evt);
      }
    });
    var onTouchend = function () {
      return $_cduncz13kjcq86mv0.bind(editorApi.body(), 'touchend', function (evt) {
        tapEvent.fireIfReady(evt, 'touchend');
      });
    };
    var onTouchmove = function () {
      return $_cduncz13kjcq86mv0.bind(editorApi.body(), 'touchmove', function (evt) {
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
  var $_dukf0a13qjcq86mw0 = { monitor: monitor };

  var isAndroid6 = $_ggue51wgjcq86lrc.detect().os.version.major >= 6;
  var initEvents = function (editorApi, toolstrip, alloy) {
    var tapping = $_dukf0a13qjcq86mw0.monitor(editorApi);
    var outerDoc = $_212hfgy3jcq86ly0.owner(toolstrip);
    var isRanged = function (sel) {
      return !$_1mhuz1w8jcq86lql.eq(sel.start(), sel.finish()) || sel.soffset() !== sel.foffset();
    };
    var hasRangeInUi = function () {
      return $_907xlxygjcq86lzf.active(outerDoc).filter(function (input) {
        return $_ggmo4uxxjcq86lxc.name(input) === 'input';
      }).exists(function (input) {
        return input.dom().selectionStart !== input.dom().selectionEnd;
      });
    };
    var updateMargin = function () {
      var rangeInContent = editorApi.doc().dom().hasFocus() && editorApi.getSelection().exists(isRanged);
      alloy.getByDom(toolstrip).each((rangeInContent || hasRangeInUi()) === true ? Toggling.on : Toggling.off);
    };
    var listeners = [
      $_cduncz13kjcq86mv0.bind(editorApi.body(), 'touchstart', function (evt) {
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_cduncz13kjcq86mv0.bind(toolstrip, 'touchstart', function (evt) {
        editorApi.onTouchToolstrip();
      }),
      editorApi.onToReading(function () {
        $_907xlxygjcq86lzf.blur(editorApi.body());
      }),
      editorApi.onToEditing($_88uun8wbjcq86lr5.noop),
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
      $_cduncz13kjcq86mv0.bind($_96tjzawtjcq86lsc.fromDom(editorApi.win()), 'blur', function () {
        alloy.getByDom(toolstrip).each(Toggling.off);
      }),
      $_cduncz13kjcq86mv0.bind(outerDoc, 'select', updateMargin),
      $_cduncz13kjcq86mv0.bind(editorApi.doc(), 'selectionchange', updateMargin)
    ]);
    var destroy = function () {
      $_54lr1fw9jcq86lqv.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_d1uouj13pjcq86mvk = { initEvents: initEvents };

  var autocompleteHack = function () {
    return function (f) {
      setTimeout(function () {
        f();
      }, 0);
    };
  };
  var resume = function (cWin) {
    cWin.focus();
    var iBody = $_96tjzawtjcq86lsc.fromDom(cWin.document.body);
    var inInput = $_907xlxygjcq86lzf.active().exists(function (elem) {
      return $_54lr1fw9jcq86lqv.contains([
        'input',
        'textarea'
      ], $_ggmo4uxxjcq86lxc.name(elem));
    });
    var transaction = inInput ? autocompleteHack() : $_88uun8wbjcq86lr5.apply;
    transaction(function () {
      $_907xlxygjcq86lzf.active().each($_907xlxygjcq86lzf.blur);
      $_907xlxygjcq86lzf.focus(iBody);
    });
  };
  var $_91m6za13ujcq86mwp = { resume: resume };

  var safeParse = function (element, attribute) {
    var parsed = parseInt($_az3jjlxwjcq86lx1.get(element, attribute), 10);
    return isNaN(parsed) ? 0 : parsed;
  };
  var $_3cg0he13vjcq86mwv = { safeParse: safeParse };

  var NodeValue = function (is, name) {
    var get = function (element) {
      if (!is(element))
        throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
      return getOption(element).getOr('');
    };
    var getOptionIE10 = function (element) {
      try {
        return getOptionSafe(element);
      } catch (e) {
        return $_2334kywajcq86lr3.none();
      }
    };
    var getOptionSafe = function (element) {
      return is(element) ? $_2334kywajcq86lr3.from(element.dom().nodeValue) : $_2334kywajcq86lr3.none();
    };
    var browser = $_ggue51wgjcq86lrc.detect().browser;
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
  };

  var api$3 = NodeValue($_ggmo4uxxjcq86lxc.isText, 'text');
  var get$12 = function (element) {
    return api$3.get(element);
  };
  var getOption = function (element) {
    return api$3.getOption(element);
  };
  var set$8 = function (element, value) {
    api$3.set(element, value);
  };
  var $_bgn4ze13yjcq86mx8 = {
    get: get$12,
    getOption: getOption,
    set: set$8
  };

  var getEnd = function (element) {
    return $_ggmo4uxxjcq86lxc.name(element) === 'img' ? 1 : $_bgn4ze13yjcq86mx8.getOption(element).fold(function () {
      return $_212hfgy3jcq86ly0.children(element).length;
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
    return $_bgn4ze13yjcq86mx8.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_54lr1fw9jcq86lqv.contains(elementsWithCursorPosition, $_ggmo4uxxjcq86lxc.name(elem));
  };
  var $_21da1013xjcq86mx4 = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var adt$4 = $_9gltwzx4jcq86lts.generate([
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
  var getStart$1 = function (situ) {
    return situ.fold($_88uun8wbjcq86lr5.identity, $_88uun8wbjcq86lr5.identity, $_88uun8wbjcq86lr5.identity);
  };
  var $_flogu3141jcq86mxk = {
    before: adt$4.before,
    on: adt$4.on,
    after: adt$4.after,
    cata: cata,
    getStart: getStart$1
  };

  var type$1 = $_9gltwzx4jcq86lts.generate([
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
  var range$1 = $_6nh3wxmjcq86lwg.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$1.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_96tjzawtjcq86lsc.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_flogu3141jcq86mxk.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart(selection);
    return $_212hfgy3jcq86ly0.defaultView(start);
  };
  var $_abxyya140jcq86mxf = {
    domRange: type$1.domRange,
    relative: type$1.relative,
    exact: type$1.exact,
    exactFromRange: exactFromRange,
    range: range$1,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_212hfgy3jcq86ly0.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_96tjzawtjcq86lsc.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_1mhuz1w8jcq86lql.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_66xza1143jcq86mxv = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_54lr1fw9jcq86lqv.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_96tjzawtjcq86lsc.fromDom(fragment);
  };
  var $_3690x8144jcq86mxw = { fromElements: fromElements };

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
  var create$5 = function (win) {
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
    return $_96tjzawtjcq86lsc.fromDom(fragment);
  };
  var toRect$1 = function (rect) {
    return {
      left: $_88uun8wbjcq86lr5.constant(rect.left),
      top: $_88uun8wbjcq86lr5.constant(rect.top),
      right: $_88uun8wbjcq86lr5.constant(rect.right),
      bottom: $_88uun8wbjcq86lr5.constant(rect.bottom),
      width: $_88uun8wbjcq86lr5.constant(rect.width),
      height: $_88uun8wbjcq86lr5.constant(rect.height)
    };
  };
  var getFirstRect$1 = function (rng) {
    var rects = rng.getClientRects();
    var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_2334kywajcq86lr3.some(rect).map(toRect$1) : $_2334kywajcq86lr3.none();
  };
  var getBounds$2 = function (rng) {
    var rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_2334kywajcq86lr3.some(rect).map(toRect$1) : $_2334kywajcq86lr3.none();
  };
  var toString$1 = function (rng) {
    return rng.toString();
  };
  var $_2ep5v6145jcq86my0 = {
    create: create$5,
    replaceWith: replaceWith,
    selectNodeContents: selectNodeContents,
    selectNodeContentsUsing: selectNodeContentsUsing,
    relativeToNative: relativeToNative,
    exactToNative: exactToNative,
    deleteContents: deleteContents,
    cloneFragment: cloneFragment,
    getFirstRect: getFirstRect$1,
    getBounds: getBounds$2,
    isWithin: isWithin,
    toString: toString$1
  };

  var adt$5 = $_9gltwzx4jcq86lts.generate([
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
    return type($_96tjzawtjcq86lsc.fromDom(range.startContainer), range.startOffset, $_96tjzawtjcq86lsc.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_88uun8wbjcq86lr5.constant(rng),
          rtl: $_2334kywajcq86lr3.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_8llfvcwhjcq86lre.cached(function () {
            return $_2ep5v6145jcq86my0.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_8llfvcwhjcq86lre.cached(function () {
            return $_2334kywajcq86lr3.some($_2ep5v6145jcq86my0.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_8llfvcwhjcq86lre.cached(function () {
            return $_2ep5v6145jcq86my0.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_8llfvcwhjcq86lre.cached(function () {
            return $_2334kywajcq86lr3.some($_2ep5v6145jcq86my0.exactToNative(win, finish, foffset, start, soffset));
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
        return adt$5.rtl($_96tjzawtjcq86lsc.fromDom(rev.endContainer), rev.endOffset, $_96tjzawtjcq86lsc.fromDom(rev.startContainer), rev.startOffset);
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
  var $_32atzj146jcq86my5 = {
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
  var $_7fjcqd149jcq86myo = {
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
    var length = $_bgn4ze13yjcq86mx8.get(textnode).length;
    var offset = $_7fjcqd149jcq86myo.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate$2 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_5pzzdmyejcq86lzc.findMap(rects, function (rect) {
      return $_7fjcqd149jcq86myo.inRect(rect, x, y) ? $_2334kywajcq86lr3.some(rect) : $_2334kywajcq86lr3.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_fa9qag14ajcq86myq = { locate: locate$2 };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_212hfgy3jcq86ly0.children(node);
    return $_5pzzdmyejcq86lzc.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_7fjcqd149jcq86myo.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : $_2334kywajcq86lr3.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_ggmo4uxxjcq86lxc.isText(node) ? $_fa9qag14ajcq86myq.locate : searchInChildren;
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
  var $_dbfbka148jcq86myj = { locate: locate$1 };

  var first$3 = function (element) {
    return $_1kg0jyijcq86lzk.descendant(element, $_21da1013xjcq86mx4.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_21da1013xjcq86mx4.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_212hfgy3jcq86ly0.children(element);
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (predicate(child))
          return $_2334kywajcq86lr3.some(child);
        var res = descend(child);
        if (res.isSome())
          return res;
      }
      return $_2334kywajcq86lr3.none();
    };
    return descend(scope);
  };
  var $_e1gn4i14cjcq86mz2 = {
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
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_e1gn4i14cjcq86mz2.first : $_e1gn4i14cjcq86mz2.last;
    return f(node).map(function (target) {
      return createCollapsedNode(doc, target, collapseDirection);
    });
  };
  var locateInEmpty = function (doc, node, x) {
    var rect = node.dom().getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    return $_2334kywajcq86lr3.some(createCollapsedNode(doc, node, collapseDirection));
  };
  var search$1 = function (doc, node, x) {
    var f = $_212hfgy3jcq86ly0.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_f7rrle14bjcq86myy = { search: search$1 };

  var caretPositionFromPoint = function (doc, x, y) {
    return $_2334kywajcq86lr3.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
      if (pos.offsetNode === null)
        return $_2334kywajcq86lr3.none();
      var r = doc.dom().createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse();
      return $_2334kywajcq86lr3.some(r);
    });
  };
  var caretRangeFromPoint = function (doc, x, y) {
    return $_2334kywajcq86lr3.from(doc.dom().caretRangeFromPoint(x, y));
  };
  var searchTextNodes = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return $_dbfbka148jcq86myj.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_96tjzawtjcq86lsc.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_f7rrle14bjcq86myy.search(doc, elem, x);
      };
      return $_212hfgy3jcq86ly0.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_96tjzawtjcq86lsc.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_abxyya140jcq86mxf.range($_96tjzawtjcq86lsc.fromDom(rng.startContainer), rng.startOffset, $_96tjzawtjcq86lsc.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_fc8os8147jcq86myf = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_2ep5v6145jcq86my0.create(win);
    var self = $_3tq25qwsjcq86ls8.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_bfivwnzkjcq86m4p.descendants(ancestor, selector));
    return $_54lr1fw9jcq86lqv.filter(elements, function (elem) {
      $_2ep5v6145jcq86my0.selectNodeContentsUsing(innerRange, elem);
      return $_2ep5v6145jcq86my0.isWithin(outerRange, innerRange);
    });
  };
  var find$4 = function (win, selection, selector) {
    var outerRange = $_32atzj146jcq86my5.asLtrRange(win, selection);
    var ancestor = $_96tjzawtjcq86lsc.fromDom(outerRange.commonAncestorContainer);
    return $_ggmo4uxxjcq86lxc.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_72szzn14djcq86mz6 = { find: find$4 };

  var beforeSpecial = function (element, offset) {
    var name = $_ggmo4uxxjcq86lxc.name(element);
    if ('input' === name)
      return $_flogu3141jcq86mxk.after(element);
    else if (!$_54lr1fw9jcq86lqv.contains([
        'br',
        'img'
      ], name))
      return $_flogu3141jcq86mxk.on(element, offset);
    else
      return offset === 0 ? $_flogu3141jcq86mxk.before(element) : $_flogu3141jcq86mxk.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_flogu3141jcq86mxk.before, beforeSpecial, $_flogu3141jcq86mxk.after);
    var finish = finishSitu.fold($_flogu3141jcq86mxk.before, beforeSpecial, $_flogu3141jcq86mxk.after);
    return $_abxyya140jcq86mxf.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_abxyya140jcq86mxf.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_96tjzawtjcq86lsc.fromDom(rng.startContainer);
        var finish = $_96tjzawtjcq86lsc.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_6ewnzn14ejcq86mz9 = {
    beforeSpecial: beforeSpecial,
    preprocess: preprocess,
    preprocessRelative: preprocessRelative,
    preprocessExact: preprocessExact
  };

  var doSetNativeRange = function (win, rng) {
    $_2334kywajcq86lr3.from(win.getSelection()).each(function (selection) {
      selection.removeAllRanges();
      selection.addRange(rng);
    });
  };
  var doSetRange = function (win, start, soffset, finish, foffset) {
    var rng = $_2ep5v6145jcq86my0.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_72szzn14djcq86mz6.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_32atzj146jcq86my5.diagnose(win, relative).match({
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
    var relative = $_6ewnzn14ejcq86mz9.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_6ewnzn14ejcq86mz9.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_abxyya140jcq86mxf.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_2ep5v6145jcq86my0.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_6ewnzn14ejcq86mz9.preprocess(selection);
    return $_32atzj146jcq86my5.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return $_2334kywajcq86lr3.some($_abxyya140jcq86mxf.range($_96tjzawtjcq86lsc.fromDom(firstRng.startContainer), firstRng.startOffset, $_96tjzawtjcq86lsc.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return $_2334kywajcq86lr3.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_96tjzawtjcq86lsc.fromDom(selection.anchorNode);
    var focusNode = $_96tjzawtjcq86lsc.fromDom(selection.focusNode);
    return $_66xza1143jcq86mxv.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? $_2334kywajcq86lr3.some($_abxyya140jcq86mxf.range($_96tjzawtjcq86lsc.fromDom(selection.anchorNode), selection.anchorOffset, $_96tjzawtjcq86lsc.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_2ep5v6145jcq86my0.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_2ep5v6145jcq86my0.selectNodeContents(win, element);
    return $_abxyya140jcq86mxf.range($_96tjzawtjcq86lsc.fromDom(rng.startContainer), rng.startOffset, $_96tjzawtjcq86lsc.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : $_2334kywajcq86lr3.none();
  };
  var get$13 = function (win) {
    return getExact(win).map(function (range) {
      return $_abxyya140jcq86mxf.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect = function (win, selection) {
    var rng = $_32atzj146jcq86my5.asLtrRange(win, selection);
    return $_2ep5v6145jcq86my0.getFirstRect(rng);
  };
  var getBounds$1 = function (win, selection) {
    var rng = $_32atzj146jcq86my5.asLtrRange(win, selection);
    return $_2ep5v6145jcq86my0.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_fc8os8147jcq86myf.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_32atzj146jcq86my5.asLtrRange(win, selection);
    return $_2ep5v6145jcq86my0.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$3 = function (win, selection) {
    var rng = $_32atzj146jcq86my5.asLtrRange(win, selection);
    return $_2ep5v6145jcq86my0.cloneFragment(rng);
  };
  var replace = function (win, selection, elements) {
    var rng = $_32atzj146jcq86my5.asLtrRange(win, selection);
    var fragment = $_3690x8144jcq86mxw.fromElements(elements, win.document);
    $_2ep5v6145jcq86my0.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_32atzj146jcq86my5.asLtrRange(win, selection);
    $_2ep5v6145jcq86my0.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_1mhuz1w8jcq86lql.eq(start, finish) && soffset === foffset;
  };
  var $_8ua6kw142jcq86mxq = {
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
    getFirstRect: getFirstRect,
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
      width: $_88uun8wbjcq86lr5.constant(COLLAPSED_WIDTH),
      height: rect.height
    };
  };
  var toRect = function (rawRect) {
    return {
      left: $_88uun8wbjcq86lr5.constant(rawRect.left),
      top: $_88uun8wbjcq86lr5.constant(rawRect.top),
      right: $_88uun8wbjcq86lr5.constant(rawRect.right),
      bottom: $_88uun8wbjcq86lr5.constant(rawRect.bottom),
      width: $_88uun8wbjcq86lr5.constant(rawRect.width),
      height: $_88uun8wbjcq86lr5.constant(rawRect.height)
    };
  };
  var getRectsFromRange = function (range) {
    if (!range.collapsed) {
      return $_54lr1fw9jcq86lqv.map(range.getClientRects(), toRect);
    } else {
      var start_1 = $_96tjzawtjcq86lsc.fromDom(range.startContainer);
      return $_212hfgy3jcq86ly0.parent(start_1).bind(function (parent) {
        var selection = $_abxyya140jcq86mxf.exact(start_1, range.startOffset, parent, $_21da1013xjcq86mx4.getEnd(parent));
        var optRect = $_8ua6kw142jcq86mxq.getFirstRect(range.startContainer.ownerDocument.defaultView, selection);
        return optRect.map(collapsedRect).map($_54lr1fw9jcq86lqv.pure);
      }).getOr([]);
    }
  };
  var getRectangles = function (cWin) {
    var sel = cWin.getSelection();
    return sel !== undefined && sel.rangeCount > 0 ? getRectsFromRange(sel.getRangeAt(0)) : [];
  };
  var $_35tic13wjcq86mww = { getRectangles: getRectangles };

  var EXTRA_SPACING = 50;
  var data = 'data-' + $_3fu6k5z1jcq86m28.resolve('last-outer-height');
  var setLastHeight = function (cBody, value) {
    $_az3jjlxwjcq86lx1.set(cBody, data, value);
  };
  var getLastHeight = function (cBody) {
    return $_3cg0he13vjcq86mwv.safeParse(cBody, data);
  };
  var getBoundsFrom = function (rect) {
    return {
      top: $_88uun8wbjcq86lr5.constant(rect.top()),
      bottom: $_88uun8wbjcq86lr5.constant(rect.top() + rect.height())
    };
  };
  var getBounds = function (cWin) {
    var rects = $_35tic13wjcq86mww.getRectangles(cWin);
    return rects.length > 0 ? $_2334kywajcq86lr3.some(rects[0]).map(getBoundsFrom) : $_2334kywajcq86lr3.none();
  };
  var findDelta = function (outerWindow, cBody) {
    var last = getLastHeight(cBody);
    var current = outerWindow.innerHeight;
    return last > current ? $_2334kywajcq86lr3.some(last - current) : $_2334kywajcq86lr3.none();
  };
  var calculate = function (cWin, bounds, delta) {
    var isOutside = bounds.top() > cWin.innerHeight || bounds.bottom() > cWin.innerHeight;
    return isOutside ? Math.min(delta, bounds.bottom() - cWin.innerHeight + EXTRA_SPACING) : 0;
  };
  var setup$1 = function (outerWindow, cWin) {
    var cBody = $_96tjzawtjcq86lsc.fromDom(cWin.document.body);
    var toEditing = function () {
      $_91m6za13ujcq86mwp.resume(cWin);
    };
    var onResize = $_cduncz13kjcq86mv0.bind($_96tjzawtjcq86lsc.fromDom(outerWindow), 'resize', function () {
      findDelta(outerWindow, cBody).each(function (delta) {
        getBounds(cWin).each(function (bounds) {
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
  var $_7oihuw13tjcq86mwi = { setup: setup$1 };

  var getBodyFromFrame = function (frame) {
    return $_2334kywajcq86lr3.some($_96tjzawtjcq86lsc.fromDom(frame.dom().contentWindow.document.body));
  };
  var getDocFromFrame = function (frame) {
    return $_2334kywajcq86lr3.some($_96tjzawtjcq86lsc.fromDom(frame.dom().contentWindow.document));
  };
  var getWinFromFrame = function (frame) {
    return $_2334kywajcq86lr3.from(frame.dom().contentWindow);
  };
  var getSelectionFromFrame = function (frame) {
    var optWin = getWinFromFrame(frame);
    return optWin.bind($_8ua6kw142jcq86mxq.getExact);
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
        return $_cduncz13kjcq86mv0.bind(doc, type, handler);
      };
    });
  };
  var toRect$2 = function (rect) {
    return {
      left: $_88uun8wbjcq86lr5.constant(rect.left),
      top: $_88uun8wbjcq86lr5.constant(rect.top),
      right: $_88uun8wbjcq86lr5.constant(rect.right),
      bottom: $_88uun8wbjcq86lr5.constant(rect.bottom),
      width: $_88uun8wbjcq86lr5.constant(rect.width),
      height: $_88uun8wbjcq86lr5.constant(rect.height)
    };
  };
  var getActiveApi = function (editor) {
    var frame = getFrame(editor);
    var tryFallbackBox = function (win) {
      var isCollapsed = function (sel) {
        return $_1mhuz1w8jcq86lql.eq(sel.start(), sel.finish()) && sel.soffset() === sel.foffset();
      };
      var toStartRect = function (sel) {
        var rect = sel.start().dom().getBoundingClientRect();
        return rect.width > 0 || rect.height > 0 ? $_2334kywajcq86lr3.some(rect).map(toRect$2) : $_2334kywajcq86lr3.none();
      };
      return $_8ua6kw142jcq86mxq.getExact(win).filter(isCollapsed).bind(toStartRect);
    };
    return getBodyFromFrame(frame).bind(function (body) {
      return getDocFromFrame(frame).bind(function (doc) {
        return getWinFromFrame(frame).map(function (win) {
          var html = $_96tjzawtjcq86lsc.fromDom(doc.dom().documentElement);
          var getCursorBox = editor.getCursorBox.getOrThunk(function () {
            return function () {
              return $_8ua6kw142jcq86mxq.get(win).bind(function (sel) {
                return $_8ua6kw142jcq86mxq.getFirstRect(win, sel).orThunk(function () {
                  return tryFallbackBox(win);
                });
              });
            };
          });
          var setSelection = editor.setSelection.getOrThunk(function () {
            return function (start, soffset, finish, foffset) {
              $_8ua6kw142jcq86mxq.setExact(win, start, soffset, finish, foffset);
            };
          });
          var clearSelection = editor.clearSelection.getOrThunk(function () {
            return function () {
              $_8ua6kw142jcq86mxq.clear(win);
            };
          });
          return {
            body: $_88uun8wbjcq86lr5.constant(body),
            doc: $_88uun8wbjcq86lr5.constant(doc),
            win: $_88uun8wbjcq86lr5.constant(win),
            html: $_88uun8wbjcq86lr5.constant(html),
            getSelection: $_88uun8wbjcq86lr5.curry(getSelectionFromFrame, frame),
            setSelection: setSelection,
            clearSelection: clearSelection,
            frame: $_88uun8wbjcq86lr5.constant(frame),
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
  var $_ga2f0214fjcq86mzd = {
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
  var isAndroid = $_ggue51wgjcq86lrc.detect().os.isAndroid();
  var matchColor = function (editorBody) {
    var color = $_8xsijozsjcq86m57.get(editorBody, 'background-color');
    return color !== undefined && color !== '' ? 'background-color:' + color + '!important' : bgFallback;
  };
  var clobberStyles = function (container, editorBody) {
    var gatherSibilings = function (element) {
      var siblings = $_bfivwnzkjcq86m4p.siblings(element, '*');
      return siblings;
    };
    var clobber = function (clobberStyle) {
      return function (element) {
        var styles = $_az3jjlxwjcq86lx1.get(element, 'style');
        var backup = styles === undefined ? 'no-styles' : styles.trim();
        if (backup === clobberStyle) {
          return;
        } else {
          $_az3jjlxwjcq86lx1.set(element, attr, backup);
          $_az3jjlxwjcq86lx1.set(element, 'style', clobberStyle);
        }
      };
    };
    var ancestors = $_bfivwnzkjcq86m4p.ancestors(container, '*');
    var siblings = $_54lr1fw9jcq86lqv.bind(ancestors, gatherSibilings);
    var bgColor = matchColor(editorBody);
    $_54lr1fw9jcq86lqv.each(siblings, clobber(siblingStyles));
    $_54lr1fw9jcq86lqv.each(ancestors, clobber(ancestorPosition + ancestorStyles + bgColor));
    var containerStyles = isAndroid === true ? '' : ancestorPosition;
    clobber(containerStyles + ancestorStyles + bgColor)(container);
  };
  var restoreStyles = function () {
    var clobberedEls = $_bfivwnzkjcq86m4p.all('[' + attr + ']');
    $_54lr1fw9jcq86lqv.each(clobberedEls, function (element) {
      var restore = $_az3jjlxwjcq86lx1.get(element, attr);
      if (restore !== 'no-styles') {
        $_az3jjlxwjcq86lx1.set(element, 'style', restore);
      } else {
        $_az3jjlxwjcq86lx1.remove(element, 'style');
      }
      $_az3jjlxwjcq86lx1.remove(element, attr);
    });
  };
  var $_1xelzh14gjcq86mzm = {
    clobberStyles: clobberStyles,
    restoreStyles: restoreStyles
  };

  var tag = function () {
    var head = $_66bqgjzmjcq86m4s.first('head').getOrDie();
    var nu = function () {
      var meta = $_96tjzawtjcq86lsc.fromTag('meta');
      $_az3jjlxwjcq86lx1.set(meta, 'name', 'viewport');
      $_dm5y40y2jcq86lxy.append(head, meta);
      return meta;
    };
    var element = $_66bqgjzmjcq86m4s.first('meta[name="viewport"]').getOrThunk(nu);
    var backup = $_az3jjlxwjcq86lx1.get(element, 'content');
    var maximize = function () {
      $_az3jjlxwjcq86lx1.set(element, 'content', 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0');
    };
    var restore = function () {
      if (backup !== undefined && backup !== null && backup.length > 0) {
        $_az3jjlxwjcq86lx1.set(element, 'content', backup);
      } else {
        $_az3jjlxwjcq86lx1.set(element, 'content', 'user-scalable=yes');
      }
    };
    return {
      maximize: maximize,
      restore: restore
    };
  };
  var $_3g61og14hjcq86mzt = { tag: tag };

  var create$4 = function (platform, mask) {
    var meta = $_3g61og14hjcq86mzt.tag();
    var androidApi = $_bysyeg12ajcq86ml9.api();
    var androidEvents = $_bysyeg12ajcq86ml9.api();
    var enter = function () {
      mask.hide();
      $_3nts6pxujcq86lwy.add(platform.container, $_3fu6k5z1jcq86m28.resolve('fullscreen-maximized'));
      $_3nts6pxujcq86lwy.add(platform.container, $_3fu6k5z1jcq86m28.resolve('android-maximized'));
      meta.maximize();
      $_3nts6pxujcq86lwy.add(platform.body, $_3fu6k5z1jcq86m28.resolve('android-scroll-reload'));
      androidApi.set($_7oihuw13tjcq86mwi.setup(platform.win, $_ga2f0214fjcq86mzd.getWin(platform.editor).getOrDie('no')));
      $_ga2f0214fjcq86mzd.getActiveApi(platform.editor).each(function (editorApi) {
        $_1xelzh14gjcq86mzm.clobberStyles(platform.container, editorApi.body());
        androidEvents.set($_d1uouj13pjcq86mvk.initEvents(editorApi, platform.toolstrip, platform.alloy));
      });
    };
    var exit = function () {
      meta.restore();
      mask.show();
      $_3nts6pxujcq86lwy.remove(platform.container, $_3fu6k5z1jcq86m28.resolve('fullscreen-maximized'));
      $_3nts6pxujcq86lwy.remove(platform.container, $_3fu6k5z1jcq86m28.resolve('android-maximized'));
      $_1xelzh14gjcq86mzm.restoreStyles();
      $_3nts6pxujcq86lwy.remove(platform.body, $_3fu6k5z1jcq86m28.resolve('android-scroll-reload'));
      androidEvents.clear();
      androidApi.clear();
    };
    return {
      enter: enter,
      exit: exit
    };
  };
  var $_8fmy1u13ojcq86mvg = { create: create$4 };

  var MobileSchema = $_8bk232xhjcq86lvj.objOf([
    $_2a8tl5x2jcq86ltk.strictObjOf('editor', [
      $_2a8tl5x2jcq86ltk.strict('getFrame'),
      $_2a8tl5x2jcq86ltk.option('getBody'),
      $_2a8tl5x2jcq86ltk.option('getDoc'),
      $_2a8tl5x2jcq86ltk.option('getWin'),
      $_2a8tl5x2jcq86ltk.option('getSelection'),
      $_2a8tl5x2jcq86ltk.option('setSelection'),
      $_2a8tl5x2jcq86ltk.option('clearSelection'),
      $_2a8tl5x2jcq86ltk.option('cursorSaver'),
      $_2a8tl5x2jcq86ltk.option('onKeyup'),
      $_2a8tl5x2jcq86ltk.option('onNodeChanged'),
      $_2a8tl5x2jcq86ltk.option('getCursorBox'),
      $_2a8tl5x2jcq86ltk.strict('onDomChanged'),
      $_2a8tl5x2jcq86ltk.defaulted('onTouchContent', $_88uun8wbjcq86lr5.noop),
      $_2a8tl5x2jcq86ltk.defaulted('onTapContent', $_88uun8wbjcq86lr5.noop),
      $_2a8tl5x2jcq86ltk.defaulted('onTouchToolstrip', $_88uun8wbjcq86lr5.noop),
      $_2a8tl5x2jcq86ltk.defaulted('onScrollToCursor', $_88uun8wbjcq86lr5.constant({ unbind: $_88uun8wbjcq86lr5.noop })),
      $_2a8tl5x2jcq86ltk.defaulted('onScrollToElement', $_88uun8wbjcq86lr5.constant({ unbind: $_88uun8wbjcq86lr5.noop })),
      $_2a8tl5x2jcq86ltk.defaulted('onToEditing', $_88uun8wbjcq86lr5.constant({ unbind: $_88uun8wbjcq86lr5.noop })),
      $_2a8tl5x2jcq86ltk.defaulted('onToReading', $_88uun8wbjcq86lr5.constant({ unbind: $_88uun8wbjcq86lr5.noop })),
      $_2a8tl5x2jcq86ltk.defaulted('onToolbarScrollStart', $_88uun8wbjcq86lr5.identity)
    ]),
    $_2a8tl5x2jcq86ltk.strict('socket'),
    $_2a8tl5x2jcq86ltk.strict('toolstrip'),
    $_2a8tl5x2jcq86ltk.strict('dropup'),
    $_2a8tl5x2jcq86ltk.strict('toolbar'),
    $_2a8tl5x2jcq86ltk.strict('container'),
    $_2a8tl5x2jcq86ltk.strict('alloy'),
    $_2a8tl5x2jcq86ltk.state('win', function (spec) {
      return $_212hfgy3jcq86ly0.owner(spec.socket).dom().defaultView;
    }),
    $_2a8tl5x2jcq86ltk.state('body', function (spec) {
      return $_96tjzawtjcq86lsc.fromDom(spec.socket.dom().ownerDocument.body);
    }),
    $_2a8tl5x2jcq86ltk.defaulted('translate', $_88uun8wbjcq86lr5.identity),
    $_2a8tl5x2jcq86ltk.defaulted('setReadOnly', $_88uun8wbjcq86lr5.noop)
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
  var $_5w2e0v14kjcq86n0n = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var sketch$10 = function (onView, translate) {
    var memIcon = $_73qm4s11ejcq86mg7.record(Container.sketch({
      dom: $_caj4qv10qjcq86mca.dom('<div aria-hidden="true" class="${prefix}-mask-tap-icon"></div>'),
      containerBehaviours: $_5q0i93w4jcq86lpj.derive([Toggling.config({
          toggleClass: $_3fu6k5z1jcq86m28.resolve('mask-tap-icon-selected'),
          toggleOnExecute: false
        })])
    }));
    var onViewThrottle = $_5w2e0v14kjcq86n0n.first(onView, 200);
    return Container.sketch({
      dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-disabled-mask"></div>'),
      components: [Container.sketch({
          dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-content-container"></div>'),
          components: [Button.sketch({
              dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-content-tap-section"></div>'),
              components: [memIcon.asSpec()],
              action: function (button) {
                onViewThrottle.throttle();
              },
              buttonBehaviours: $_5q0i93w4jcq86lpj.derive([Toggling.config({ toggleClass: $_3fu6k5z1jcq86m28.resolve('mask-tap-icon-selected') })])
            })]
        })]
    });
  };
  var $_2xso314jjcq86n0a = { sketch: sketch$10 };

  var produce = function (raw) {
    var mobile = $_8bk232xhjcq86lvj.asRawOrDie('Getting AndroidWebapp schema', MobileSchema, raw);
    $_8xsijozsjcq86m57.set(mobile.toolstrip, 'width', '100%');
    var onTap = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_7wb9no12kjcq86mn1.build($_2xso314jjcq86n0a.sketch(onTap, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    $_dm5y40y2jcq86lxy.append(mobile.container, mask.element());
    var mode = $_8fmy1u13ojcq86mvg.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: $_88uun8wbjcq86lr5.noop,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_88uun8wbjcq86lr5.noop
    };
  };
  var $_ffuczp13njcq86mva = { produce: produce };

  var schema$14 = [
    $_2a8tl5x2jcq86ltk.defaulted('shell', true),
    $_flsnpp10djcq86m91.field('toolbarBehaviours', [Replacing])
  ];
  var enhanceGroups = function (detail) {
    return { behaviours: $_5q0i93w4jcq86lpj.derive([Replacing.config({})]) };
  };
  var partTypes$1 = [$_8pawjq10kjcq86mak.optional({
      name: 'groups',
      overrides: enhanceGroups
    })];
  var $_bgtguy14njcq86n17 = {
    name: $_88uun8wbjcq86lr5.constant('Toolbar'),
    schema: $_88uun8wbjcq86lr5.constant(schema$14),
    parts: $_88uun8wbjcq86lr5.constant(partTypes$1)
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
      return detail.shell() ? $_2334kywajcq86lr3.some(component) : $_8jdkda10ijcq86m9x.getPart(component, detail, 'groups');
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
      behaviours: $_9ymhaxwyjcq86lsv.deepMerge($_5q0i93w4jcq86lpj.derive(extra.behaviours), $_flsnpp10djcq86m91.get(detail.toolbarBehaviours())),
      apis: { setGroups: setGroups },
      domModification: { attributes: { role: 'group' } }
    };
  };
  var Toolbar = $_6wocjl10ejcq86m96.composite({
    name: 'Toolbar',
    configFields: $_bgtguy14njcq86n17.schema(),
    partFields: $_bgtguy14njcq86n17.parts(),
    factory: factory$4,
    apis: {
      setGroups: function (apis, toolbar, groups) {
        apis.setGroups(toolbar, groups);
      }
    }
  });

  var schema$15 = [
    $_2a8tl5x2jcq86ltk.strict('items'),
    $_5l2dbmytjcq86m0r.markers(['itemClass']),
    $_flsnpp10djcq86m91.field('tgroupBehaviours', [Keying])
  ];
  var partTypes$2 = [$_8pawjq10kjcq86mak.group({
      name: 'items',
      unit: 'item',
      overrides: function (detail) {
        return { domModification: { classes: [detail.markers().itemClass()] } };
      }
    })];
  var $_6yaalu14pjcq86n1f = {
    name: $_88uun8wbjcq86lr5.constant('ToolbarGroup'),
    schema: $_88uun8wbjcq86lr5.constant(schema$15),
    parts: $_88uun8wbjcq86lr5.constant(partTypes$2)
  };

  var factory$5 = function (detail, components, spec, _externals) {
    return $_9ymhaxwyjcq86lsv.deepMerge({ dom: { attributes: { role: 'toolbar' } } }, {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_9ymhaxwyjcq86lsv.deepMerge($_5q0i93w4jcq86lpj.derive([Keying.config({
          mode: 'flow',
          selector: '.' + detail.markers().itemClass()
        })]), $_flsnpp10djcq86m91.get(detail.tgroupBehaviours())),
      'debug.sketcher': spec['debug.sketcher']
    });
  };
  var ToolbarGroup = $_6wocjl10ejcq86m96.composite({
    name: 'ToolbarGroup',
    configFields: $_6yaalu14pjcq86n1f.schema(),
    partFields: $_6yaalu14pjcq86n1f.parts(),
    factory: factory$5
  });

  var dataHorizontal = 'data-' + $_3fu6k5z1jcq86m28.resolve('horizontal-scroll');
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
    $_az3jjlxwjcq86lx1.set(container, dataHorizontal, 'true');
  };
  var hasScroll = function (container) {
    return $_az3jjlxwjcq86lx1.get(container, dataHorizontal) === 'true' ? hasHorizontalScroll : hasVerticalScroll;
  };
  var exclusive = function (scope, selector) {
    return $_cduncz13kjcq86mv0.bind(scope, 'touchmove', function (event) {
      $_66bqgjzmjcq86m4s.closest(event.target(), selector).filter(hasScroll).fold(function () {
        event.raw().preventDefault();
      }, $_88uun8wbjcq86lr5.noop);
    });
  };
  var $_azjmdz14qjcq86n1o = {
    exclusive: exclusive,
    markAsHorizontal: markAsHorizontal
  };

  var ScrollingToolbar = function () {
    var makeGroup = function (gSpec) {
      var scrollClass = gSpec.scrollable === true ? '${prefix}-toolbar-scrollable-group' : '';
      return {
        dom: $_caj4qv10qjcq86mca.dom('<div aria-label="' + gSpec.label + '" class="${prefix}-toolbar-group ' + scrollClass + '"></div>'),
        tgroupBehaviours: $_5q0i93w4jcq86lpj.derive([$_adfefz11sjcq86mif.config('adhoc-scrollable-toolbar', gSpec.scrollable === true ? [$_fpvm9zw6jcq86lqb.runOnInit(function (component, simulatedEvent) {
              $_8xsijozsjcq86m57.set(component.element(), 'overflow-x', 'auto');
              $_azjmdz14qjcq86n1o.markAsHorizontal(component.element());
              $_8kkxki13hjcq86muj.register(component.element());
            })] : [])]),
        components: [Container.sketch({ components: [ToolbarGroup.parts().items({})] })],
        markers: { itemClass: $_3fu6k5z1jcq86m28.resolve('toolbar-group-item') },
        items: gSpec.items
      };
    };
    var toolbar = $_7wb9no12kjcq86mn1.build(Toolbar.sketch({
      dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-toolbar"></div>'),
      components: [Toolbar.parts().groups({})],
      toolbarBehaviours: $_5q0i93w4jcq86lpj.derive([
        Toggling.config({
          toggleClass: $_3fu6k5z1jcq86m28.resolve('context-toolbar'),
          toggleOnExecute: false,
          aria: { mode: 'none' }
        }),
        Keying.config({ mode: 'cyclic' })
      ]),
      shell: true
    }));
    var wrapper = $_7wb9no12kjcq86mn1.build(Container.sketch({
      dom: { classes: [$_3fu6k5z1jcq86m28.resolve('toolstrip')] },
      components: [$_7wb9no12kjcq86mn1.premade(toolbar)],
      containerBehaviours: $_5q0i93w4jcq86lpj.derive([Toggling.config({
          toggleClass: $_3fu6k5z1jcq86m28.resolve('android-selection-context-toolbar'),
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
      return $_54lr1fw9jcq86lqv.map(gs, $_88uun8wbjcq86lr5.compose(ToolbarGroup.sketch, makeGroup));
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
      wrapper: $_88uun8wbjcq86lr5.constant(wrapper),
      toolbar: $_88uun8wbjcq86lr5.constant(toolbar),
      createGroups: createGroups,
      setGroups: setGroups,
      setContextToolbar: setContextToolbar,
      restoreToolbar: restoreToolbar,
      refresh: refresh,
      focus: focus
    };
  };

  var makeEditSwitch = function (webapp) {
    return $_7wb9no12kjcq86mn1.build(Button.sketch({
      dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-mask-edit-icon ${prefix}-icon"></div>'),
      action: function () {
        webapp.run(function (w) {
          w.setReadOnly(false);
        });
      }
    }));
  };
  var makeSocket = function () {
    return $_7wb9no12kjcq86mn1.build(Container.sketch({
      dom: $_caj4qv10qjcq86mca.dom('<div class="${prefix}-editor-socket"></div>'),
      components: [],
      containerBehaviours: $_5q0i93w4jcq86lpj.derive([Replacing.config({})])
    }));
  };
  var showEdit = function (socket, switchToEdit) {
    Replacing.append(socket, $_7wb9no12kjcq86mn1.premade(switchToEdit));
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
  var $_9oyipw14rjcq86n1x = {
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
    $_75zlxi12yjcq86mr0.remove(root, [
      slideConfig.shrinkingClass(),
      slideConfig.growingClass()
    ]);
  };
  var setShrunk = function (component, slideConfig) {
    $_3nts6pxujcq86lwy.remove(component.element(), slideConfig.openClass());
    $_3nts6pxujcq86lwy.add(component.element(), slideConfig.closedClass());
    $_8xsijozsjcq86m57.set(component.element(), getDimensionProperty(slideConfig), '0px');
    $_8xsijozsjcq86m57.reflow(component.element());
  };
  var measureTargetSize = function (component, slideConfig) {
    setGrown(component, slideConfig);
    var expanded = getDimension(slideConfig, component.element());
    setShrunk(component, slideConfig);
    return expanded;
  };
  var setGrown = function (component, slideConfig) {
    $_3nts6pxujcq86lwy.remove(component.element(), slideConfig.closedClass());
    $_3nts6pxujcq86lwy.add(component.element(), slideConfig.openClass());
    $_8xsijozsjcq86m57.remove(component.element(), getDimensionProperty(slideConfig));
  };
  var doImmediateShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_8xsijozsjcq86m57.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_8xsijozsjcq86m57.reflow(component.element());
    disableTransitions(component, slideConfig);
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
    slideConfig.onShrunk()(component);
  };
  var doStartShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_8xsijozsjcq86m57.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_8xsijozsjcq86m57.reflow(component.element());
    var root = getAnimationRoot(component, slideConfig);
    $_3nts6pxujcq86lwy.add(root, slideConfig.shrinkingClass());
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
  };
  var doStartGrow = function (component, slideConfig, slideState) {
    var fullSize = measureTargetSize(component, slideConfig);
    var root = getAnimationRoot(component, slideConfig);
    $_3nts6pxujcq86lwy.add(root, slideConfig.growingClass());
    setGrown(component, slideConfig);
    $_8xsijozsjcq86m57.set(component.element(), getDimensionProperty(slideConfig), fullSize);
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
    return $_3nts6pxujcq86lwy.has(root, slideConfig.growingClass()) === true;
  };
  var isShrinking = function (component, slideConfig, slideState) {
    var root = getAnimationRoot(component, slideConfig);
    return $_3nts6pxujcq86lwy.has(root, slideConfig.shrinkingClass()) === true;
  };
  var isTransitioning = function (component, slideConfig, slideState) {
    return isGrowing(component, slideConfig, slideState) === true || isShrinking(component, slideConfig, slideState) === true;
  };
  var toggleGrow = function (component, slideConfig, slideState) {
    var f = slideState.isExpanded() ? doStartShrink : doStartGrow;
    f(component, slideConfig, slideState);
  };
  var $_dxzlok14vjcq86n2g = {
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
    return expanded ? $_eej9y1xkjcq86lvz.nu({
      classes: [slideConfig.openClass()],
      styles: {}
    }) : $_eej9y1xkjcq86lvz.nu({
      classes: [slideConfig.closedClass()],
      styles: $_1z89rrx6jcq86lub.wrap(slideConfig.dimension().property(), '0px')
    });
  };
  var events$9 = function (slideConfig, slideState) {
    return $_fpvm9zw6jcq86lqb.derive([$_fpvm9zw6jcq86lqb.run($_d9eamdwxjcq86lss.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        if (raw.propertyName === slideConfig.dimension().property()) {
          $_dxzlok14vjcq86n2g.disableTransitions(component, slideConfig, slideState);
          if (slideState.isExpanded())
            $_8xsijozsjcq86m57.remove(component.element(), slideConfig.dimension().property());
          var notify = slideState.isExpanded() ? slideConfig.onGrown() : slideConfig.onShrunk();
          notify(component, simulatedEvent);
        }
      })]);
  };
  var $_c5xwd614ujcq86n2c = {
    exhibit: exhibit$5,
    events: events$9
  };

  var SlidingSchema = [
    $_2a8tl5x2jcq86ltk.strict('closedClass'),
    $_2a8tl5x2jcq86ltk.strict('openClass'),
    $_2a8tl5x2jcq86ltk.strict('shrinkingClass'),
    $_2a8tl5x2jcq86ltk.strict('growingClass'),
    $_2a8tl5x2jcq86ltk.option('getAnimationRoot'),
    $_5l2dbmytjcq86m0r.onHandler('onShrunk'),
    $_5l2dbmytjcq86m0r.onHandler('onStartShrink'),
    $_5l2dbmytjcq86m0r.onHandler('onGrown'),
    $_5l2dbmytjcq86m0r.onHandler('onStartGrow'),
    $_2a8tl5x2jcq86ltk.defaulted('expanded', false),
    $_2a8tl5x2jcq86ltk.strictOf('dimension', $_8bk232xhjcq86lvj.choose('property', {
      width: [
        $_5l2dbmytjcq86m0r.output('property', 'width'),
        $_5l2dbmytjcq86m0r.output('getDimension', function (elem) {
          return $_95l2gy117jcq86mf0.get(elem) + 'px';
        })
      ],
      height: [
        $_5l2dbmytjcq86m0r.output('property', 'height'),
        $_5l2dbmytjcq86m0r.output('getDimension', function (elem) {
          return $_69bysazrjcq86m55.get(elem) + 'px';
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
      setCollapsed: $_88uun8wbjcq86lr5.curry(state.set, false),
      setExpanded: $_88uun8wbjcq86lr5.curry(state.set, true),
      readState: readState
    });
  };
  var $_3gkatp14xjcq86n36 = { init: init$4 };

  var Sliding = $_5q0i93w4jcq86lpj.create({
    fields: SlidingSchema,
    name: 'sliding',
    active: $_c5xwd614ujcq86n2c,
    apis: $_dxzlok14vjcq86n2g,
    state: $_3gkatp14xjcq86n36
  });

  var build$2 = function (refresh, scrollIntoView) {
    var dropup = $_7wb9no12kjcq86mn1.build(Container.sketch({
      dom: {
        tag: 'div',
        classes: $_3fu6k5z1jcq86m28.resolve('dropup')
      },
      components: [],
      containerBehaviours: $_5q0i93w4jcq86lpj.derive([
        Replacing.config({}),
        Sliding.config({
          closedClass: $_3fu6k5z1jcq86m28.resolve('dropup-closed'),
          openClass: $_3fu6k5z1jcq86m28.resolve('dropup-open'),
          shrinkingClass: $_3fu6k5z1jcq86m28.resolve('dropup-shrinking'),
          growingClass: $_3fu6k5z1jcq86m28.resolve('dropup-growing'),
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
        $_g86iz4z0jcq86m25.orientation(function (component, data) {
          disappear($_88uun8wbjcq86lr5.noop);
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
      component: $_88uun8wbjcq86lr5.constant(dropup),
      element: dropup.element
    };
  };
  var $_b7ulsd14sjcq86n24 = { build: build$2 };

  var isDangerous = function (event) {
    return event.raw().which === $_d131r5zejcq86m3r.BACKSPACE()[0] && !$_54lr1fw9jcq86lqv.contains([
      'input',
      'textarea'
    ], $_ggmo4uxxjcq86lxc.name(event.target()));
  };
  var isFirefox = $_ggue51wgjcq86lrc.detect().browser.isFirefox();
  var settingsSchema = $_8bk232xhjcq86lvj.objOfOnly([
    $_2a8tl5x2jcq86ltk.strictFunction('triggerEvent'),
    $_2a8tl5x2jcq86ltk.strictFunction('broadcastEvent'),
    $_2a8tl5x2jcq86ltk.defaulted('stopBackspace', true)
  ]);
  var bindFocus = function (container, handler) {
    if (isFirefox) {
      return $_cduncz13kjcq86mv0.capture(container, 'focus', handler);
    } else {
      return $_cduncz13kjcq86mv0.bind(container, 'focusin', handler);
    }
  };
  var bindBlur = function (container, handler) {
    if (isFirefox) {
      return $_cduncz13kjcq86mv0.capture(container, 'blur', handler);
    } else {
      return $_cduncz13kjcq86mv0.bind(container, 'focusout', handler);
    }
  };
  var setup$2 = function (container, rawSettings) {
    var settings = $_8bk232xhjcq86lvj.asRawOrDie('Getting GUI events settings', settingsSchema, rawSettings);
    var pointerEvents = $_ggue51wgjcq86lrc.detect().deviceType.isTouch() ? [
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
    var tapEvent = $_55577n13rjcq86mw7.monitor(settings);
    var simpleEvents = $_54lr1fw9jcq86lqv.map(pointerEvents.concat([
      'selectstart',
      'input',
      'contextmenu',
      'change',
      'transitionend',
      'dragstart',
      'dragover',
      'drop'
    ]), function (type) {
      return $_cduncz13kjcq86mv0.bind(container, type, function (event) {
        tapEvent.fireIfReady(event, type).each(function (tapStopped) {
          if (tapStopped)
            event.kill();
        });
        var stopped = settings.triggerEvent(type, event);
        if (stopped)
          event.kill();
      });
    });
    var onKeydown = $_cduncz13kjcq86mv0.bind(container, 'keydown', function (event) {
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
        settings.triggerEvent($_d5i57fwwjcq86lsp.postBlur(), event);
      }, 0);
    });
    var defaultView = $_212hfgy3jcq86ly0.defaultView(container);
    var onWindowScroll = $_cduncz13kjcq86mv0.bind(defaultView, 'scroll', function (event) {
      var stopped = settings.broadcastEvent($_d5i57fwwjcq86lsp.windowScroll(), event);
      if (stopped)
        event.kill();
    });
    var unbind = function () {
      $_54lr1fw9jcq86lqv.each(simpleEvents, function (e) {
        e.unbind();
      });
      onKeydown.unbind();
      onFocusIn.unbind();
      onFocusOut.unbind();
      onWindowScroll.unbind();
    };
    return { unbind: unbind };
  };
  var $_ffw30o150jcq86n3x = { setup: setup$2 };

  var derive$3 = function (rawEvent, rawTarget) {
    var source = $_1z89rrx6jcq86lub.readOptFrom(rawEvent, 'target').map(function (getTarget) {
      return getTarget();
    }).getOr(rawTarget);
    return Cell(source);
  };
  var $_dwlfez152jcq86n4o = { derive: derive$3 };

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
      event: $_88uun8wbjcq86lr5.constant(event),
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
      cut: $_88uun8wbjcq86lr5.noop,
      isStopped: stopper.get,
      isCut: $_88uun8wbjcq86lr5.constant(false),
      event: $_88uun8wbjcq86lr5.constant(event),
      setTarget: $_88uun8wbjcq86lr5.die(new Error('Cannot set target of a broadcasted event')),
      getTarget: $_88uun8wbjcq86lr5.die(new Error('Cannot get target of a broadcasted event'))
    };
  };
  var fromTarget = function (event, target) {
    var source = Cell(target);
    return fromSource(event, source);
  };
  var $_b4gr2f153jcq86n4r = {
    fromSource: fromSource,
    fromExternal: fromExternal,
    fromTarget: fromTarget
  };

  var adt$6 = $_9gltwzx4jcq86lts.generate([
    { stopped: [] },
    { resume: ['element'] },
    { complete: [] }
  ]);
  var doTriggerHandler = function (lookup, eventType, rawEvent, target, source, logger) {
    var handler = lookup(eventType, target);
    var simulatedEvent = $_b4gr2f153jcq86n4r.fromSource(rawEvent, source);
    return handler.fold(function () {
      logger.logEventNoHandlers(eventType, target);
      return adt$6.complete();
    }, function (handlerInfo) {
      var descHandler = handlerInfo.descHandler();
      var eventHandler = $_1noqrw12vjcq86mq1.getHandler(descHandler);
      eventHandler(simulatedEvent);
      if (simulatedEvent.isStopped()) {
        logger.logEventStopped(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.stopped();
      } else if (simulatedEvent.isCut()) {
        logger.logEventCut(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.complete();
      } else
        return $_212hfgy3jcq86ly0.parent(handlerInfo.element()).fold(function () {
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
    var source = $_dwlfez152jcq86n4o.derive(rawEvent, target);
    return doTriggerHandler(lookup, eventType, rawEvent, target, source, logger);
  };
  var broadcast = function (listeners, rawEvent, logger) {
    var simulatedEvent = $_b4gr2f153jcq86n4r.fromExternal(rawEvent);
    $_54lr1fw9jcq86lqv.each(listeners, function (listener) {
      var descHandler = listener.descHandler();
      var handler = $_1noqrw12vjcq86mq1.getHandler(descHandler);
      handler(simulatedEvent);
    });
    return simulatedEvent.isStopped();
  };
  var triggerUntilStopped = function (lookup, eventType, rawEvent, logger) {
    var rawTarget = rawEvent.target();
    return triggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, logger);
  };
  var triggerOnUntilStopped = function (lookup, eventType, rawEvent, rawTarget, logger) {
    var source = $_dwlfez152jcq86n4o.derive(rawEvent, rawTarget);
    return doTriggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, source, logger);
  };
  var $_9994l0151jcq86n4e = {
    triggerHandler: triggerHandler,
    triggerUntilStopped: triggerUntilStopped,
    triggerOnUntilStopped: triggerOnUntilStopped,
    broadcast: broadcast
  };

  var closest$4 = function (target, transform, isRoot) {
    var delegate = $_1kg0jyijcq86lzk.closest(target, function (elem) {
      return transform(elem).isSome();
    }, isRoot);
    return delegate.bind(transform);
  };
  var $_5vddf156jcq86n5c = { closest: closest$4 };

  var eventHandler = $_6nh3wxmjcq86lwg.immutable('element', 'descHandler');
  var messageHandler = function (id, handler) {
    return {
      id: $_88uun8wbjcq86lr5.constant(id),
      descHandler: $_88uun8wbjcq86lr5.constant(handler)
    };
  };
  var EventRegistry = function () {
    var registry = {};
    var registerId = function (extraArgs, id, events) {
      $_3jdnysx0jcq86lsz.each(events, function (v, k) {
        var handlers = registry[k] !== undefined ? registry[k] : {};
        handlers[id] = $_1noqrw12vjcq86mq1.curryArgs(v, extraArgs);
        registry[k] = handlers;
      });
    };
    var findHandler = function (handlers, elem) {
      return $_crpkad10mjcq86mbh.read(elem).fold(function (err) {
        return $_2334kywajcq86lr3.none();
      }, function (id) {
        var reader = $_1z89rrx6jcq86lub.readOpt(id);
        return handlers.bind(reader).map(function (descHandler) {
          return eventHandler(elem, descHandler);
        });
      });
    };
    var filterByType = function (type) {
      return $_1z89rrx6jcq86lub.readOptFrom(registry, type).map(function (handlers) {
        return $_3jdnysx0jcq86lsz.mapToArray(handlers, function (f, id) {
          return messageHandler(id, f);
        });
      }).getOr([]);
    };
    var find = function (isAboveRoot, type, target) {
      var readType = $_1z89rrx6jcq86lub.readOpt(type);
      var handlers = readType(registry);
      return $_5vddf156jcq86n5c.closest(target, function (elem) {
        return findHandler(handlers, elem);
      }, isAboveRoot);
    };
    var unregisterId = function (id) {
      $_3jdnysx0jcq86lsz.each(registry, function (handlersById, eventName) {
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
  };

  var Registry = function () {
    var events = EventRegistry();
    var components = {};
    var readOrTag = function (component) {
      var elem = component.element();
      return $_crpkad10mjcq86mbh.read(elem).fold(function () {
        return $_crpkad10mjcq86mbh.write('uid-', component.element());
      }, function (uid) {
        return uid;
      });
    };
    var failOnDuplicate = function (component, tagId) {
      var conflict = components[tagId];
      if (conflict === component)
        unregister(component);
      else
        throw new Error('The tagId "' + tagId + '" is already used by: ' + $_yz1udy9jcq86lz2.element(conflict.element()) + '\nCannot use it for: ' + $_yz1udy9jcq86lz2.element(component.element()) + '\n' + 'The conflicting element is' + ($_3ngt01y7jcq86lyf.inBody(conflict.element()) ? ' ' : ' not ') + 'already in the DOM');
    };
    var register = function (component) {
      var tagId = readOrTag(component);
      if ($_1z89rrx6jcq86lub.hasKey(components, tagId))
        failOnDuplicate(component, tagId);
      var extraArgs = [component];
      events.registerId(extraArgs, tagId, component.events());
      components[tagId] = component;
    };
    var unregister = function (component) {
      $_crpkad10mjcq86mbh.read(component.element()).each(function (tagId) {
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
      return $_1z89rrx6jcq86lub.readOpt(id)(components);
    };
    return {
      find: find,
      filter: filter,
      register: register,
      unregister: unregister,
      getById: getById
    };
  };

  var create$6 = function () {
    var root = $_7wb9no12kjcq86mn1.build(Container.sketch({ dom: { tag: 'div' } }));
    return takeover(root);
  };
  var takeover = function (root) {
    var isAboveRoot = function (el) {
      return $_212hfgy3jcq86ly0.parent(root.element()).fold(function () {
        return true;
      }, function (parent) {
        return $_1mhuz1w8jcq86lql.eq(el, parent);
      });
    };
    var registry = Registry();
    var lookup = function (eventName, target) {
      return registry.find(isAboveRoot, eventName, target);
    };
    var domEvents = $_ffw30o150jcq86n3x.setup(root.element(), {
      triggerEvent: function (eventName, event) {
        return $_7jrm2oy8jcq86lyl.monitorEvent(eventName, event.target(), function (logger) {
          return $_9994l0151jcq86n4e.triggerUntilStopped(lookup, eventName, event, logger);
        });
      },
      broadcastEvent: function (eventName, event) {
        var listeners = registry.filter(eventName);
        return $_9994l0151jcq86n4e.broadcast(listeners, event);
      }
    });
    var systemApi = SystemApi({
      debugInfo: $_88uun8wbjcq86lr5.constant('real'),
      triggerEvent: function (customType, target, data) {
        $_7jrm2oy8jcq86lyl.monitorEvent(customType, target, function (logger) {
          $_9994l0151jcq86n4e.triggerOnUntilStopped(lookup, customType, data, target, logger);
        });
      },
      triggerFocus: function (target, originator) {
        $_crpkad10mjcq86mbh.read(target).fold(function () {
          $_907xlxygjcq86lzf.focus(target);
        }, function (_alloyId) {
          $_7jrm2oy8jcq86lyl.monitorEvent($_d5i57fwwjcq86lsp.focus(), target, function (logger) {
            $_9994l0151jcq86n4e.triggerHandler(lookup, $_d5i57fwwjcq86lsp.focus(), {
              originator: $_88uun8wbjcq86lr5.constant(originator),
              target: $_88uun8wbjcq86lr5.constant(target)
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
      build: $_7wb9no12kjcq86mn1.build,
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
      if (!$_ggmo4uxxjcq86lxc.isText(component.element())) {
        registry.register(component);
        $_54lr1fw9jcq86lqv.each(component.components(), addToWorld);
        systemApi.triggerEvent($_d5i57fwwjcq86lsp.systemInit(), component.element(), { target: $_88uun8wbjcq86lr5.constant(component.element()) });
      }
    };
    var removeFromWorld = function (component) {
      if (!$_ggmo4uxxjcq86lxc.isText(component.element())) {
        $_54lr1fw9jcq86lqv.each(component.components(), removeFromWorld);
        registry.unregister(component);
      }
      component.disconnect();
    };
    var add = function (component) {
      $_9qj153y1jcq86lxo.attach(root, component);
    };
    var remove = function (component) {
      $_9qj153y1jcq86lxo.detach(component);
    };
    var destroy = function () {
      domEvents.unbind();
      $_2c4yszy5jcq86lya.remove(root.element());
    };
    var broadcastData = function (data) {
      var receivers = registry.filter($_d5i57fwwjcq86lsp.receive());
      $_54lr1fw9jcq86lqv.each(receivers, function (receiver) {
        var descHandler = receiver.descHandler();
        var handler = $_1noqrw12vjcq86mq1.getHandler(descHandler);
        handler(data);
      });
    };
    var broadcast = function (message) {
      broadcastData({
        universal: $_88uun8wbjcq86lr5.constant(true),
        data: $_88uun8wbjcq86lr5.constant(message)
      });
    };
    var broadcastOn = function (channels, message) {
      broadcastData({
        universal: $_88uun8wbjcq86lr5.constant(false),
        channels: $_88uun8wbjcq86lr5.constant(channels),
        data: $_88uun8wbjcq86lr5.constant(message)
      });
    };
    var getByUid = function (uid) {
      return registry.getById(uid).fold(function () {
        return $_74ri01x8jcq86luv.error(new Error('Could not find component with uid: "' + uid + '" in system.'));
      }, $_74ri01x8jcq86luv.value);
    };
    var getByDom = function (elem) {
      return $_crpkad10mjcq86mbh.read(elem).bind(getByUid);
    };
    addToWorld(root);
    return {
      root: $_88uun8wbjcq86lr5.constant(root),
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
  var $_ddcr8c14zjcq86n3i = {
    create: create$6,
    takeover: takeover
  };

  var READ_ONLY_MODE_CLASS = $_88uun8wbjcq86lr5.constant($_3fu6k5z1jcq86m28.resolve('readonly-mode'));
  var EDIT_MODE_CLASS = $_88uun8wbjcq86lr5.constant($_3fu6k5z1jcq86m28.resolve('edit-mode'));
  var OuterContainer = function (spec) {
    var root = $_7wb9no12kjcq86mn1.build(Container.sketch({
      dom: { classes: [$_3fu6k5z1jcq86m28.resolve('outer-container')].concat(spec.classes) },
      containerBehaviours: $_5q0i93w4jcq86lpj.derive([Swapping.config({
          alpha: READ_ONLY_MODE_CLASS(),
          omega: EDIT_MODE_CLASS()
        })])
    }));
    return $_ddcr8c14zjcq86n3i.takeover(root);
  };

  var AndroidRealm = function (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_3fu6k5z1jcq86m28.resolve('android-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_bysyeg12ajcq86ml9.api();
    var switchToEdit = $_9oyipw14rjcq86n1x.makeEditSwitch(webapp);
    var socket = $_9oyipw14rjcq86n1x.makeSocket();
    var dropup = $_b7ulsd14sjcq86n24.build($_88uun8wbjcq86lr5.noop, scrollIntoView);
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
      webapp.set($_ffuczp13njcq86mva.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        w.exit();
        Replacing.remove(socket, switchToEdit);
      });
    };
    var updateMode = function (readOnly) {
      $_9oyipw14rjcq86n1x.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_88uun8wbjcq86lr5.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_88uun8wbjcq86lr5.constant(socket),
      dropup: $_88uun8wbjcq86lr5.constant(dropup)
    };
  };

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
      var toolbarHeight = $_69bysazrjcq86m55.get(toolstrip);
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
    var tapping = $_dukf0a13qjcq86mw0.monitor(editorApi);
    var refreshThrottle = $_5w2e0v14kjcq86n0n.last(refreshView, 300);
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
      $_cduncz13kjcq86mv0.bind(editorApi.doc(), 'touchend', function (touchEvent) {
        if ($_1mhuz1w8jcq86lql.eq(editorApi.html(), touchEvent.target()) || $_1mhuz1w8jcq86lql.eq(editorApi.body(), touchEvent.target())) {
        }
      }),
      $_cduncz13kjcq86mv0.bind(toolstrip, 'transitionend', function (transitionEvent) {
        if (transitionEvent.raw().propertyName === 'height') {
          reposition();
        }
      }),
      $_cduncz13kjcq86mv0.capture(toolstrip, 'touchstart', function (touchEvent) {
        saveSelectionFirst();
        onToolbarTouch(touchEvent);
        editorApi.onTouchToolstrip();
      }),
      $_cduncz13kjcq86mv0.bind(editorApi.body(), 'touchstart', function (evt) {
        clearSelection();
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_cduncz13kjcq86mv0.bind(editorApi.body(), 'click', function (event) {
        event.kill();
      }),
      $_cduncz13kjcq86mv0.bind(toolstrip, 'touchmove', function () {
        editorApi.onToolbarScrollStart();
      })
    ];
    var destroy = function () {
      $_54lr1fw9jcq86lqv.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_3y80m515ajcq86n69 = { initEvents: initEvents$1 };

  var refreshInput = function (input) {
    var start = input.dom().selectionStart;
    var end = input.dom().selectionEnd;
    var dir = input.dom().selectionDirection;
    setTimeout(function () {
      input.dom().setSelectionRange(start, end, dir);
      $_907xlxygjcq86lzf.focus(input);
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
  var $_4nux8b15ejcq86n7m = {
    refreshInput: refreshInput,
    refresh: refresh
  };

  var resume$1 = function (cWin, frame) {
    $_907xlxygjcq86lzf.active().each(function (active) {
      if (!$_1mhuz1w8jcq86lql.eq(active, frame)) {
        $_907xlxygjcq86lzf.blur(active);
      }
    });
    cWin.focus();
    $_907xlxygjcq86lzf.focus($_96tjzawtjcq86lsc.fromDom(cWin.document.body));
    $_4nux8b15ejcq86n7m.refresh(cWin);
  };
  var $_g7gogp15djcq86n7h = { resume: resume$1 };

  var FakeSelection = function (win, frame) {
    var doc = win.document;
    var container = $_96tjzawtjcq86lsc.fromTag('div');
    $_3nts6pxujcq86lwy.add(container, $_3fu6k5z1jcq86m28.resolve('unfocused-selections'));
    $_dm5y40y2jcq86lxy.append($_96tjzawtjcq86lsc.fromDom(doc.documentElement), container);
    var onTouch = $_cduncz13kjcq86mv0.bind(container, 'touchstart', function (event) {
      event.prevent();
      $_g7gogp15djcq86n7h.resume(win, frame);
      clear();
    });
    var make = function (rectangle) {
      var span = $_96tjzawtjcq86lsc.fromTag('span');
      $_75zlxi12yjcq86mr0.add(span, [
        $_3fu6k5z1jcq86m28.resolve('layer-editor'),
        $_3fu6k5z1jcq86m28.resolve('unfocused-selection')
      ]);
      $_8xsijozsjcq86m57.setAll(span, {
        left: rectangle.left() + 'px',
        top: rectangle.top() + 'px',
        width: rectangle.width() + 'px',
        height: rectangle.height() + 'px'
      });
      return span;
    };
    var update = function () {
      clear();
      var rectangles = $_35tic13wjcq86mww.getRectangles(win);
      var spans = $_54lr1fw9jcq86lqv.map(rectangles, make);
      $_8vrrody6jcq86lyd.append(container, spans);
    };
    var clear = function () {
      $_2c4yszy5jcq86lya.empty(container);
    };
    var destroy = function () {
      onTouch.unbind();
      $_2c4yszy5jcq86lya.remove(container);
    };
    var isActive = function () {
      return $_212hfgy3jcq86ly0.children(container).length > 0;
    };
    return {
      update: update,
      isActive: isActive,
      destroy: destroy,
      clear: clear
    };
  };

  var nu$9 = function (baseFn) {
    var data = $_2334kywajcq86lr3.none();
    var callbacks = [];
    var map = function (f) {
      return nu$9(function (nCallback) {
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
      data = $_2334kywajcq86lr3.some(x);
      run(callbacks);
      callbacks = [];
    };
    var isReady = function () {
      return data.isSome();
    };
    var run = function (cbs) {
      $_54lr1fw9jcq86lqv.each(cbs, call);
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
  var pure$2 = function (a) {
    return nu$9(function (callback) {
      callback(a);
    });
  };
  var $_98p3ho15hjcq86n7x = {
    nu: nu$9,
    pure: pure$2
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
  var $_1ygq2x15ijcq86n7z = { bounce: bounce };

  var nu$8 = function (baseFn) {
    var get = function (callback) {
      baseFn($_1ygq2x15ijcq86n7z.bounce(callback));
    };
    var map = function (fab) {
      return nu$8(function (callback) {
        get(function (a) {
          var value = fab(a);
          callback(value);
        });
      });
    };
    var bind = function (aFutureB) {
      return nu$8(function (callback) {
        get(function (a) {
          aFutureB(a).get(callback);
        });
      });
    };
    var anonBind = function (futureB) {
      return nu$8(function (callback) {
        get(function (a) {
          futureB.get(callback);
        });
      });
    };
    var toLazy = function () {
      return $_98p3ho15hjcq86n7x.nu(get);
    };
    return {
      map: map,
      bind: bind,
      anonBind: anonBind,
      toLazy: toLazy,
      get: get
    };
  };
  var pure$1 = function (a) {
    return nu$8(function (callback) {
      callback(a);
    });
  };
  var $_d7asc215gjcq86n7w = {
    nu: nu$8,
    pure: pure$1
  };

  var adjust = function (value, destination, amount) {
    if (Math.abs(value - destination) <= amount) {
      return $_2334kywajcq86lr3.none();
    } else if (value < destination) {
      return $_2334kywajcq86lr3.some(value + amount);
    } else {
      return $_2334kywajcq86lr3.some(value - amount);
    }
  };
  var create$8 = function () {
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
  var $_8jsd8o15jjcq86n80 = {
    create: create$8,
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
    return $_5pzzdmyejcq86lzc.findMap(devices, function (device) {
      return deviceWidth <= device.width && deviceHeight <= device.height ? $_2334kywajcq86lr3.some(device.keyboard) : $_2334kywajcq86lr3.none();
    }).getOr({
      portrait: deviceHeight / 5,
      landscape: deviceWidth / 4
    });
  };
  var $_ahu6j15mjcq86n8t = { findDevice: findDevice };

  var softKeyboardLimits = function (outerWindow) {
    return $_ahu6j15mjcq86n8t.findDevice(outerWindow.screen.width, outerWindow.screen.height);
  };
  var accountableKeyboardHeight = function (outerWindow) {
    var portrait = $_qig5713jjcq86mut.get(outerWindow).isPortrait();
    var limits = softKeyboardLimits(outerWindow);
    var keyboard = portrait ? limits.portrait : limits.landscape;
    var visualScreenHeight = portrait ? outerWindow.screen.height : outerWindow.screen.width;
    return visualScreenHeight - outerWindow.innerHeight > keyboard ? 0 : keyboard;
  };
  var getGreenzone = function (socket, dropup) {
    var outerWindow = $_212hfgy3jcq86ly0.owner(socket).dom().defaultView;
    var viewportHeight = $_69bysazrjcq86m55.get(socket) + $_69bysazrjcq86m55.get(dropup);
    var acc = accountableKeyboardHeight(outerWindow);
    return viewportHeight - acc;
  };
  var updatePadding = function (contentBody, socket, dropup) {
    var greenzoneHeight = getGreenzone(socket, dropup);
    var deltaHeight = $_69bysazrjcq86m55.get(socket) + $_69bysazrjcq86m55.get(dropup) - greenzoneHeight;
    $_8xsijozsjcq86m57.set(contentBody, 'padding-bottom', deltaHeight + 'px');
  };
  var $_fnzxtr15ljcq86n8k = {
    getGreenzone: getGreenzone,
    updatePadding: updatePadding
  };

  var fixture = $_9gltwzx4jcq86lts.generate([
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
  var yFixedData = 'data-' + $_3fu6k5z1jcq86m28.resolve('position-y-fixed');
  var yFixedProperty = 'data-' + $_3fu6k5z1jcq86m28.resolve('y-property');
  var yScrollingData = 'data-' + $_3fu6k5z1jcq86m28.resolve('scrolling');
  var windowSizeData = 'data-' + $_3fu6k5z1jcq86m28.resolve('last-window-height');
  var getYFixedData = function (element) {
    return $_3cg0he13vjcq86mwv.safeParse(element, yFixedData);
  };
  var getYFixedProperty = function (element) {
    return $_az3jjlxwjcq86lx1.get(element, yFixedProperty);
  };
  var getLastWindowSize = function (element) {
    return $_3cg0he13vjcq86mwv.safeParse(element, windowSizeData);
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
    var classifier = $_az3jjlxwjcq86lx1.get(element, yScrollingData) === 'true' ? classifyScrolling : classifyFixed;
    return classifier(element, offsetY);
  };
  var findFixtures = function (container) {
    var candidates = $_bfivwnzkjcq86m4p.descendants(container, '[' + yFixedData + ']');
    return $_54lr1fw9jcq86lqv.map(candidates, classify);
  };
  var takeoverToolbar = function (toolbar) {
    var oldToolbarStyle = $_az3jjlxwjcq86lx1.get(toolbar, 'style');
    $_8xsijozsjcq86m57.setAll(toolbar, {
      position: 'absolute',
      top: '0px'
    });
    $_az3jjlxwjcq86lx1.set(toolbar, yFixedData, '0px');
    $_az3jjlxwjcq86lx1.set(toolbar, yFixedProperty, 'top');
    var restore = function () {
      $_az3jjlxwjcq86lx1.set(toolbar, 'style', oldToolbarStyle || '');
      $_az3jjlxwjcq86lx1.remove(toolbar, yFixedData);
      $_az3jjlxwjcq86lx1.remove(toolbar, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverViewport = function (toolbarHeight, height, viewport) {
    var oldViewportStyle = $_az3jjlxwjcq86lx1.get(viewport, 'style');
    $_8kkxki13hjcq86muj.register(viewport);
    $_8xsijozsjcq86m57.setAll(viewport, {
      position: 'absolute',
      height: height + 'px',
      width: '100%',
      top: toolbarHeight + 'px'
    });
    $_az3jjlxwjcq86lx1.set(viewport, yFixedData, toolbarHeight + 'px');
    $_az3jjlxwjcq86lx1.set(viewport, yScrollingData, 'true');
    $_az3jjlxwjcq86lx1.set(viewport, yFixedProperty, 'top');
    var restore = function () {
      $_8kkxki13hjcq86muj.deregister(viewport);
      $_az3jjlxwjcq86lx1.set(viewport, 'style', oldViewportStyle || '');
      $_az3jjlxwjcq86lx1.remove(viewport, yFixedData);
      $_az3jjlxwjcq86lx1.remove(viewport, yScrollingData);
      $_az3jjlxwjcq86lx1.remove(viewport, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverDropup = function (dropup, toolbarHeight, viewportHeight) {
    var oldDropupStyle = $_az3jjlxwjcq86lx1.get(dropup, 'style');
    $_8xsijozsjcq86m57.setAll(dropup, {
      position: 'absolute',
      bottom: '0px'
    });
    $_az3jjlxwjcq86lx1.set(dropup, yFixedData, '0px');
    $_az3jjlxwjcq86lx1.set(dropup, yFixedProperty, 'bottom');
    var restore = function () {
      $_az3jjlxwjcq86lx1.set(dropup, 'style', oldDropupStyle || '');
      $_az3jjlxwjcq86lx1.remove(dropup, yFixedData);
      $_az3jjlxwjcq86lx1.remove(dropup, yFixedProperty);
    };
    return { restore: restore };
  };
  var deriveViewportHeight = function (viewport, toolbarHeight, dropupHeight) {
    var outerWindow = $_212hfgy3jcq86ly0.owner(viewport).dom().defaultView;
    var winH = outerWindow.innerHeight;
    $_az3jjlxwjcq86lx1.set(viewport, windowSizeData, winH + 'px');
    return winH - toolbarHeight - dropupHeight;
  };
  var takeover$1 = function (viewport, contentBody, toolbar, dropup) {
    var outerWindow = $_212hfgy3jcq86ly0.owner(viewport).dom().defaultView;
    var toolbarSetup = takeoverToolbar(toolbar);
    var toolbarHeight = $_69bysazrjcq86m55.get(toolbar);
    var dropupHeight = $_69bysazrjcq86m55.get(dropup);
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
        var newToolbarHeight = $_69bysazrjcq86m55.get(toolbar);
        var dropupHeight_1 = $_69bysazrjcq86m55.get(dropup);
        var newHeight = deriveViewportHeight(viewport, newToolbarHeight, dropupHeight_1);
        $_az3jjlxwjcq86lx1.set(viewport, yFixedData, newToolbarHeight + 'px');
        $_8xsijozsjcq86m57.set(viewport, 'height', newHeight + 'px');
        $_8xsijozsjcq86m57.set(dropup, 'bottom', -(newToolbarHeight + newHeight + dropupHeight_1) + 'px');
        $_fnzxtr15ljcq86n8k.updatePadding(contentBody, viewport, dropup);
      }
    };
    var setViewportOffset = function (newYOffset) {
      var offsetPx = newYOffset + 'px';
      $_az3jjlxwjcq86lx1.set(viewport, yFixedData, offsetPx);
      refresh();
    };
    $_fnzxtr15ljcq86n8k.updatePadding(contentBody, viewport, dropup);
    return {
      setViewportOffset: setViewportOffset,
      isExpanding: isExpanding,
      isShrinking: $_88uun8wbjcq86lr5.not(isExpanding),
      refresh: refresh,
      restore: restore
    };
  };
  var $_es2av915kjcq86n84 = {
    findFixtures: findFixtures,
    takeover: takeover$1,
    getYFixedData: getYFixedData
  };

  var animator = $_8jsd8o15jjcq86n80.create();
  var ANIMATION_STEP = 15;
  var NUM_TOP_ANIMATION_FRAMES = 10;
  var ANIMATION_RATE = 10;
  var lastScroll = 'data-' + $_3fu6k5z1jcq86m28.resolve('last-scroll-top');
  var getTop = function (element) {
    var raw = $_8xsijozsjcq86m57.getRaw(element, 'top').getOr(0);
    return parseInt(raw, 10);
  };
  var getScrollTop = function (element) {
    return parseInt(element.dom().scrollTop, 10);
  };
  var moveScrollAndTop = function (element, destination, finalTop) {
    return $_d7asc215gjcq86n7w.nu(function (callback) {
      var getCurrent = $_88uun8wbjcq86lr5.curry(getScrollTop, element);
      var update = function (newScroll) {
        element.dom().scrollTop = newScroll;
        $_8xsijozsjcq86m57.set(element, 'top', getTop(element) + ANIMATION_STEP + 'px');
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_8xsijozsjcq86m57.set(element, 'top', finalTop + 'px');
        callback(destination);
      };
      animator.animate(getCurrent, destination, ANIMATION_STEP, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyScroll = function (element, destination) {
    return $_d7asc215gjcq86n7w.nu(function (callback) {
      var getCurrent = $_88uun8wbjcq86lr5.curry(getScrollTop, element);
      $_az3jjlxwjcq86lx1.set(element, lastScroll, getCurrent());
      var update = function (newScroll, abort) {
        var previous = $_3cg0he13vjcq86mwv.safeParse(element, lastScroll);
        if (previous !== element.dom().scrollTop) {
          abort(element.dom().scrollTop);
        } else {
          element.dom().scrollTop = newScroll;
          $_az3jjlxwjcq86lx1.set(element, lastScroll, newScroll);
        }
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_az3jjlxwjcq86lx1.set(element, lastScroll, destination);
        callback(destination);
      };
      var distance = Math.abs(destination - getCurrent());
      var step = Math.ceil(distance / NUM_TOP_ANIMATION_FRAMES);
      animator.animate(getCurrent, destination, step, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyTop = function (element, destination) {
    return $_d7asc215gjcq86n7w.nu(function (callback) {
      var getCurrent = $_88uun8wbjcq86lr5.curry(getTop, element);
      var update = function (newTop) {
        $_8xsijozsjcq86m57.set(element, 'top', newTop + 'px');
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
    var newTop = amount + $_es2av915kjcq86n84.getYFixedData(element) + 'px';
    $_8xsijozsjcq86m57.set(element, 'top', newTop);
  };
  var moveWindowScroll = function (toolbar, viewport, destY) {
    var outerWindow = $_212hfgy3jcq86ly0.owner(toolbar).dom().defaultView;
    return $_d7asc215gjcq86n7w.nu(function (callback) {
      updateTop(toolbar, destY);
      updateTop(viewport, destY);
      outerWindow.scrollTo(0, destY);
      callback(destY);
    });
  };
  var $_2izw3l15fjcq86n7o = {
    moveScrollAndTop: moveScrollAndTop,
    moveOnlyScroll: moveOnlyScroll,
    moveOnlyTop: moveOnlyTop,
    moveWindowScroll: moveWindowScroll
  };

  var BackgroundActivity = function (doAction) {
    var action = Cell($_98p3ho15hjcq86n7x.pure({}));
    var start = function (value) {
      var future = $_98p3ho15hjcq86n7x.nu(function (callback) {
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
  };

  var scrollIntoView = function (cWin, socket, dropup, top, bottom) {
    var greenzone = $_fnzxtr15ljcq86n8k.getGreenzone(socket, dropup);
    var refreshCursor = $_88uun8wbjcq86lr5.curry($_4nux8b15ejcq86n7m.refresh, cWin);
    if (top > greenzone || bottom > greenzone) {
      $_2izw3l15fjcq86n7o.moveOnlyScroll(socket, socket.dom().scrollTop - greenzone + bottom).get(refreshCursor);
    } else if (top < 0) {
      $_2izw3l15fjcq86n7o.moveOnlyScroll(socket, socket.dom().scrollTop + top).get(refreshCursor);
    } else {
    }
  };
  var $_19acu915ojcq86n90 = { scrollIntoView: scrollIntoView };

  var par$1 = function (asyncValues, nu) {
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
        $_54lr1fw9jcq86lqv.each(asyncValues, function (asyncValue, i) {
          asyncValue.get(cb(i));
        });
      }
    });
  };
  var $_3h1ann15rjcq86n99 = { par: par$1 };

  var par = function (futures) {
    return $_3h1ann15rjcq86n99.par(futures, $_d7asc215gjcq86n7w.nu);
  };
  var mapM = function (array, fn) {
    var futures = $_54lr1fw9jcq86lqv.map(array, fn);
    return par(futures);
  };
  var compose$1 = function (f, g) {
    return function (a) {
      return g(a).bind(f);
    };
  };
  var $_d10cr515qjcq86n97 = {
    par: par,
    mapM: mapM,
    compose: compose$1
  };

  var updateFixed = function (element, property, winY, offsetY) {
    var destination = winY + offsetY;
    $_8xsijozsjcq86m57.set(element, property, destination + 'px');
    return $_d7asc215gjcq86n7w.pure(offsetY);
  };
  var updateScrollingFixed = function (element, winY, offsetY) {
    var destTop = winY + offsetY;
    var oldProp = $_8xsijozsjcq86m57.getRaw(element, 'top').getOr(offsetY);
    var delta = destTop - parseInt(oldProp, 10);
    var destScroll = element.dom().scrollTop + delta;
    return $_2izw3l15fjcq86n7o.moveScrollAndTop(element, destScroll, destTop);
  };
  var updateFixture = function (fixture, winY) {
    return fixture.fold(function (element, property, offsetY) {
      return updateFixed(element, property, winY, offsetY);
    }, function (element, offsetY) {
      return updateScrollingFixed(element, winY, offsetY);
    });
  };
  var updatePositions = function (container, winY) {
    var fixtures = $_es2av915kjcq86n84.findFixtures(container);
    var updates = $_54lr1fw9jcq86lqv.map(fixtures, function (fixture) {
      return updateFixture(fixture, winY);
    });
    return $_d10cr515qjcq86n97.par(updates);
  };
  var $_fca2ul15pjcq86n92 = { updatePositions: updatePositions };

  var input = function (parent, operation) {
    var input = $_96tjzawtjcq86lsc.fromTag('input');
    $_8xsijozsjcq86m57.setAll(input, {
      opacity: '0',
      position: 'absolute',
      top: '-1000px',
      left: '-1000px'
    });
    $_dm5y40y2jcq86lxy.append(parent, input);
    $_907xlxygjcq86lzf.focus(input);
    operation(input);
    $_2c4yszy5jcq86lya.remove(input);
  };
  var $_f2g9f715sjcq86n9a = { input: input };

  var VIEW_MARGIN = 5;
  var register$2 = function (toolstrip, socket, container, outerWindow, structure, cWin) {
    var scroller = BackgroundActivity(function (y) {
      return $_2izw3l15fjcq86n7o.moveWindowScroll(toolstrip, socket, y);
    });
    var scrollBounds = function () {
      var rects = $_35tic13wjcq86mww.getRectangles(cWin);
      return $_2334kywajcq86lr3.from(rects[0]).bind(function (rect) {
        var viewTop = rect.top() - socket.dom().scrollTop;
        var outside = viewTop > outerWindow.innerHeight + VIEW_MARGIN || viewTop < -VIEW_MARGIN;
        return outside ? $_2334kywajcq86lr3.some({
          top: $_88uun8wbjcq86lr5.constant(viewTop),
          bottom: $_88uun8wbjcq86lr5.constant(viewTop + rect.height())
        }) : $_2334kywajcq86lr3.none();
      });
    };
    var scrollThrottle = $_5w2e0v14kjcq86n0n.last(function () {
      scroller.idle(function () {
        $_fca2ul15pjcq86n92.updatePositions(container, outerWindow.pageYOffset).get(function () {
          var extraScroll = scrollBounds();
          extraScroll.each(function (extra) {
            socket.dom().scrollTop = socket.dom().scrollTop + extra.top();
          });
          scroller.start(0);
          structure.refresh();
        });
      });
    }, 1000);
    var onScroll = $_cduncz13kjcq86mv0.bind($_96tjzawtjcq86lsc.fromDom(outerWindow), 'scroll', function () {
      if (outerWindow.pageYOffset < 0) {
        return;
      }
      scrollThrottle.throttle();
    });
    $_fca2ul15pjcq86n92.updatePositions(container, outerWindow.pageYOffset).get($_88uun8wbjcq86lr5.identity);
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
    var structure = $_es2av915kjcq86n84.takeover(socket, ceBody, toolstrip, dropup);
    var keyboardModel = keyboardType(bag.outerBody(), cWin, $_3ngt01y7jcq86lyf.body(), contentElement, toolstrip, toolbar);
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
    var onOrientation = $_qig5713jjcq86mut.onChange(outerWindow, {
      onChange: $_88uun8wbjcq86lr5.noop,
      onReady: structure.refresh
    });
    onOrientation.onAdjustment(function () {
      structure.refresh();
    });
    var onResize = $_cduncz13kjcq86mv0.bind($_96tjzawtjcq86lsc.fromDom(outerWindow), 'resize', function () {
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
      $_19acu915ojcq86n90.scrollIntoView(cWin, socket, dropup, top, bottom);
    };
    var syncHeight = function () {
      $_8xsijozsjcq86m57.set(contentElement, 'height', contentElement.dom().contentWindow.document.body.scrollHeight + 'px');
    };
    var setViewportOffset = function (newYOffset) {
      structure.setViewportOffset(newYOffset);
      $_2izw3l15fjcq86n7o.moveOnlyTop(socket, newYOffset).get($_88uun8wbjcq86lr5.identity);
    };
    var destroy = function () {
      structure.restore();
      onOrientation.destroy();
      onScroll.unbind();
      onResize.unbind();
      keyboardModel.destroy();
      unfocusedSelection.destroy();
      $_f2g9f715sjcq86n9a.input($_3ngt01y7jcq86lyf.body(), $_907xlxygjcq86lzf.blur);
    };
    return {
      toEditing: toEditing,
      toReading: toReading,
      onToolbarTouch: onToolbarTouch,
      refreshSelection: refreshSelection,
      clearSelection: clearSelection,
      highlightSelection: highlightSelection,
      scrollIntoView: scrollIntoView,
      updateToolbarPadding: $_88uun8wbjcq86lr5.noop,
      setViewportOffset: setViewportOffset,
      syncHeight: syncHeight,
      refreshStructure: structure.refresh,
      destroy: destroy
    };
  };
  var $_6chwzu15bjcq86n6i = { setup: setup$3 };

  var stubborn = function (outerBody, cWin, page, frame) {
    var toEditing = function () {
      $_g7gogp15djcq86n7h.resume(cWin, frame);
    };
    var toReading = function () {
      $_f2g9f715sjcq86n9a.input(outerBody, $_907xlxygjcq86lzf.blur);
    };
    var captureInput = $_cduncz13kjcq86mv0.bind(page, 'keydown', function (evt) {
      if (!$_54lr1fw9jcq86lqv.contains([
          'input',
          'textarea'
        ], $_ggmo4uxxjcq86lxc.name(evt.target()))) {
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
      $_907xlxygjcq86lzf.blur(frame);
    };
    var onToolbarTouch = function () {
      dismissKeyboard();
    };
    var toReading = function () {
      dismissKeyboard();
    };
    var toEditing = function () {
      $_g7gogp15djcq86n7h.resume(cWin, frame);
    };
    return {
      toReading: toReading,
      toEditing: toEditing,
      onToolbarTouch: onToolbarTouch,
      destroy: $_88uun8wbjcq86lr5.noop
    };
  };
  var $_36iygr15tjcq86n9j = {
    stubborn: stubborn,
    timid: timid
  };

  var create$7 = function (platform, mask) {
    var meta = $_3g61og14hjcq86mzt.tag();
    var priorState = $_bysyeg12ajcq86ml9.value();
    var scrollEvents = $_bysyeg12ajcq86ml9.value();
    var iosApi = $_bysyeg12ajcq86ml9.api();
    var iosEvents = $_bysyeg12ajcq86ml9.api();
    var enter = function () {
      mask.hide();
      var doc = $_96tjzawtjcq86lsc.fromDom(document);
      $_ga2f0214fjcq86mzd.getActiveApi(platform.editor).each(function (editorApi) {
        priorState.set({
          socketHeight: $_8xsijozsjcq86m57.getRaw(platform.socket, 'height'),
          iframeHeight: $_8xsijozsjcq86m57.getRaw(editorApi.frame(), 'height'),
          outerScroll: document.body.scrollTop
        });
        scrollEvents.set({ exclusives: $_azjmdz14qjcq86n1o.exclusive(doc, '.' + $_8kkxki13hjcq86muj.scrollable()) });
        $_3nts6pxujcq86lwy.add(platform.container, $_3fu6k5z1jcq86m28.resolve('fullscreen-maximized'));
        $_1xelzh14gjcq86mzm.clobberStyles(platform.container, editorApi.body());
        meta.maximize();
        $_8xsijozsjcq86m57.set(platform.socket, 'overflow', 'scroll');
        $_8xsijozsjcq86m57.set(platform.socket, '-webkit-overflow-scrolling', 'touch');
        $_907xlxygjcq86lzf.focus(editorApi.body());
        var setupBag = $_6nh3wxmjcq86lwg.immutableBag([
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
        iosApi.set($_6chwzu15bjcq86n6i.setup(setupBag({
          cWin: editorApi.win(),
          ceBody: editorApi.body(),
          socket: platform.socket,
          toolstrip: platform.toolstrip,
          toolbar: platform.toolbar,
          dropup: platform.dropup.element(),
          contentElement: editorApi.frame(),
          cursor: $_88uun8wbjcq86lr5.noop,
          outerBody: platform.body,
          outerWindow: platform.win,
          keyboardType: $_36iygr15tjcq86n9j.stubborn,
          isScrolling: function () {
            return scrollEvents.get().exists(function (s) {
              return s.socket.isScrolling();
            });
          }
        })));
        iosApi.run(function (api) {
          api.syncHeight();
        });
        iosEvents.set($_3y80m515ajcq86n69.initEvents(editorApi, iosApi, platform.toolstrip, platform.socket, platform.dropup));
      });
    };
    var exit = function () {
      meta.restore();
      iosEvents.clear();
      iosApi.clear();
      mask.show();
      priorState.on(function (s) {
        s.socketHeight.each(function (h) {
          $_8xsijozsjcq86m57.set(platform.socket, 'height', h);
        });
        s.iframeHeight.each(function (h) {
          $_8xsijozsjcq86m57.set(platform.editor.getFrame(), 'height', h);
        });
        document.body.scrollTop = s.scrollTop;
      });
      priorState.clear();
      scrollEvents.on(function (s) {
        s.exclusives.unbind();
      });
      scrollEvents.clear();
      $_3nts6pxujcq86lwy.remove(platform.container, $_3fu6k5z1jcq86m28.resolve('fullscreen-maximized'));
      $_1xelzh14gjcq86mzm.restoreStyles();
      $_8kkxki13hjcq86muj.deregister(platform.toolbar);
      $_8xsijozsjcq86m57.remove(platform.socket, 'overflow');
      $_8xsijozsjcq86m57.remove(platform.socket, '-webkit-overflow-scrolling');
      $_907xlxygjcq86lzf.blur(platform.editor.getFrame());
      $_ga2f0214fjcq86mzd.getActiveApi(platform.editor).each(function (editorApi) {
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
  var $_c18wdx159jcq86n5x = { create: create$7 };

  var produce$1 = function (raw) {
    var mobile = $_8bk232xhjcq86lvj.asRawOrDie('Getting IosWebapp schema', MobileSchema, raw);
    $_8xsijozsjcq86m57.set(mobile.toolstrip, 'width', '100%');
    $_8xsijozsjcq86m57.set(mobile.container, 'position', 'relative');
    var onView = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_7wb9no12kjcq86mn1.build($_2xso314jjcq86n0a.sketch(onView, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    var mode = $_c18wdx159jcq86n5x.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: mode.refreshStructure,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_88uun8wbjcq86lr5.noop
    };
  };
  var $_e28x4j158jcq86n5n = { produce: produce$1 };

  var IosRealm = function (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_3fu6k5z1jcq86m28.resolve('ios-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_bysyeg12ajcq86ml9.api();
    var switchToEdit = $_9oyipw14rjcq86n1x.makeEditSwitch(webapp);
    var socket = $_9oyipw14rjcq86n1x.makeSocket();
    var dropup = $_b7ulsd14sjcq86n24.build(function () {
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
      webapp.set($_e28x4j158jcq86n5n.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        Replacing.remove(socket, switchToEdit);
        w.exit();
      });
    };
    var updateMode = function (readOnly) {
      $_9oyipw14rjcq86n1x.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_88uun8wbjcq86lr5.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_88uun8wbjcq86lr5.constant(socket),
      dropup: $_88uun8wbjcq86lr5.constant(dropup)
    };
  };

  var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');

  var derive$4 = function (editor) {
    var base = $_1z89rrx6jcq86lub.readOptFrom(editor.settings, 'skin_url').fold(function () {
      return EditorManager.baseURL + '/skins/' + 'lightgray';
    }, function (url) {
      return url;
    });
    return {
      content: base + '/content.mobile.min.css',
      ui: base + '/skin.mobile.min.css'
    };
  };
  var $_fm7vdl15ujcq86n9s = { derive: derive$4 };

  var fontSizes = [
    'x-small',
    'small',
    'medium',
    'large',
    'x-large'
  ];
  var fireChange$1 = function (realm, command, state) {
    realm.system().broadcastOn([$_cgqukwyojcq86lzy.formatChanged()], {
      command: command,
      state: state
    });
  };
  var init$5 = function (realm, editor) {
    var allFormats = $_3jdnysx0jcq86lsz.keys(editor.formatter.get());
    $_54lr1fw9jcq86lqv.each(allFormats, function (command) {
      editor.formatter.formatChanged(command, function (state) {
        fireChange$1(realm, command, state);
      });
    });
    $_54lr1fw9jcq86lqv.each([
      'ul',
      'ol'
    ], function (command) {
      editor.selection.selectorChanged(command, function (state, data) {
        fireChange$1(realm, command, state);
      });
    });
  };
  var $_6do2o15wjcq86n9w = {
    init: init$5,
    fontSizes: $_88uun8wbjcq86lr5.constant(fontSizes)
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
  var $_bdq0nq15xjcq86na3 = { fireSkinLoaded: fireSkinLoaded };

  var READING = $_88uun8wbjcq86lr5.constant('toReading');
  var EDITING = $_88uun8wbjcq86lr5.constant('toEditing');
  ThemeManager.add('mobile', function (editor) {
    var renderUI = function (args) {
      var cssUrls = $_fm7vdl15ujcq86n9s.derive(editor);
      if ($_19f0oynjcq86lzx.isSkinDisabled(editor) === false) {
        editor.contentCSS.push(cssUrls.content);
        DOMUtils.DOM.styleSheetLoader.load(cssUrls.ui, $_bdq0nq15xjcq86na3.fireSkinLoaded(editor));
      } else {
        $_bdq0nq15xjcq86na3.fireSkinLoaded(editor)();
      }
      var doScrollIntoView = function () {
        editor.fire('scrollIntoView');
      };
      var wrapper = $_96tjzawtjcq86lsc.fromTag('div');
      var realm = $_ggue51wgjcq86lrc.detect().os.isAndroid() ? AndroidRealm(doScrollIntoView) : IosRealm(doScrollIntoView);
      var original = $_96tjzawtjcq86lsc.fromDom(args.targetNode);
      $_dm5y40y2jcq86lxy.after(original, wrapper);
      $_9qj153y1jcq86lxo.attachSystem(wrapper, realm.system());
      var findFocusIn = function (elem) {
        return $_907xlxygjcq86lzf.search(elem).bind(function (focused) {
          return realm.system().getByDom(focused).toOption();
        });
      };
      var outerWindow = args.targetNode.ownerDocument.defaultView;
      var orientation = $_qig5713jjcq86mut.onChange(outerWindow, {
        onChange: function () {
          var alloy = realm.system();
          alloy.broadcastOn([$_cgqukwyojcq86lzy.orientationChanged()], { width: $_qig5713jjcq86mut.getActualWidth(outerWindow) });
        },
        onReady: $_88uun8wbjcq86lr5.noop
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
              return $_96tjzawtjcq86lsc.fromDom(editor.contentAreaContainer.querySelector('iframe'));
            },
            onDomChanged: function () {
              return { unbind: $_88uun8wbjcq86lr5.noop };
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
              var toolbar = $_96tjzawtjcq86lsc.fromDom(editor.editorContainer.querySelector('.' + $_3fu6k5z1jcq86m28.resolve('toolbar')));
              findFocusIn(toolbar).each($_36xfsfwvjcq86lsk.emitExecute);
              realm.restoreToolbar();
              hideDropup();
            },
            onTapContent: function (evt) {
              var target = evt.target();
              if ($_ggmo4uxxjcq86lxc.name(target) === 'img') {
                editor.selection.select(target.dom());
                evt.kill();
              } else if ($_ggmo4uxxjcq86lxc.name(target) === 'a') {
                var component = realm.system().getByDom($_96tjzawtjcq86lsc.fromDom(editor.editorContainer));
                component.each(function (container) {
                  if (Swapping.isAlpha(container)) {
                    $_258uobymjcq86lzw.openLink(target.dom());
                  }
                });
              }
            }
          },
          container: $_96tjzawtjcq86lsc.fromDom(editor.editorContainer),
          socket: $_96tjzawtjcq86lsc.fromDom(editor.contentAreaContainer),
          toolstrip: $_96tjzawtjcq86lsc.fromDom(editor.editorContainer.querySelector('.' + $_3fu6k5z1jcq86m28.resolve('toolstrip'))),
          toolbar: $_96tjzawtjcq86lsc.fromDom(editor.editorContainer.querySelector('.' + $_3fu6k5z1jcq86m28.resolve('toolbar'))),
          dropup: realm.dropup(),
          alloy: realm.system(),
          translate: $_88uun8wbjcq86lr5.noop,
          setReadOnly: function (ro) {
            setReadOnly(readOnlyGroups, mainGroups, ro);
          }
        });
        var hideDropup = function () {
          realm.dropup().disappear(function () {
            realm.system().broadcastOn([$_cgqukwyojcq86lzy.dropupDismissed()], {});
          });
        };
        $_7jrm2oy8jcq86lyl.registerInspector('remove this', realm.system());
        var backToMaskGroup = {
          label: 'The first group',
          scrollable: false,
          items: [$_4yx6ogz2jcq86m2a.forToolbar('back', function () {
              editor.selection.collapse();
              realm.exit();
            }, {})]
        };
        var backToReadOnlyGroup = {
          label: 'Back to read only',
          scrollable: false,
          items: [$_4yx6ogz2jcq86m2a.forToolbar('readonly-back', function () {
              setReadOnly(readOnlyGroups, mainGroups, true);
            }, {})]
        };
        var readOnlyGroup = {
          label: 'The read only mode group',
          scrollable: true,
          items: []
        };
        var features = $_c4c70uypjcq86m02.setup(realm, editor);
        var items = $_c4c70uypjcq86m02.detect(editor.settings, features);
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
        $_6do2o15wjcq86n9w.init(realm, editor);
      });
      return {
        iframeContainer: realm.socket().element().dom(),
        editorContainer: realm.element().dom()
      };
    };
    return {
      getNotificationManagerImpl: function () {
        return {
          open: $_88uun8wbjcq86lr5.identity,
          close: $_88uun8wbjcq86lr5.noop,
          reposition: $_88uun8wbjcq86lr5.noop,
          getArgs: $_88uun8wbjcq86lr5.identity
        };
      },
      renderUI: renderUI
    };
  });
  var Theme = function () {
  };

  return Theme;

}());
})()
