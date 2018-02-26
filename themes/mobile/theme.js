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
  var $_82nexzwjje4c0mss = {
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

  var $_2j5gqiwije4c0msm = {
    contextmenu: $_82nexzwjje4c0mss.constant('contextmenu'),
    touchstart: $_82nexzwjje4c0mss.constant('touchstart'),
    touchmove: $_82nexzwjje4c0mss.constant('touchmove'),
    touchend: $_82nexzwjje4c0mss.constant('touchend'),
    gesturestart: $_82nexzwjje4c0mss.constant('gesturestart'),
    mousedown: $_82nexzwjje4c0mss.constant('mousedown'),
    mousemove: $_82nexzwjje4c0mss.constant('mousemove'),
    mouseout: $_82nexzwjje4c0mss.constant('mouseout'),
    mouseup: $_82nexzwjje4c0mss.constant('mouseup'),
    mouseover: $_82nexzwjje4c0mss.constant('mouseover'),
    focusin: $_82nexzwjje4c0mss.constant('focusin'),
    keydown: $_82nexzwjje4c0mss.constant('keydown'),
    input: $_82nexzwjje4c0mss.constant('input'),
    change: $_82nexzwjje4c0mss.constant('change'),
    focus: $_82nexzwjje4c0mss.constant('focus'),
    click: $_82nexzwjje4c0mss.constant('click'),
    transitionend: $_82nexzwjje4c0mss.constant('transitionend'),
    selectstart: $_82nexzwjje4c0mss.constant('selectstart')
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
  var $_nse44wlje4c0msw = { cached: cached };

  var firstMatch = function (regexes, s) {
    for (var i = 0; i < regexes.length; i++) {
      var x = regexes[i];
      if (x.test(s))
        return x;
    }
    return undefined;
  };
  var find = function (regexes, agent) {
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
    return find(versionRegexes, cleanedAgent);
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
  var $_5l2xdrwoje4c0mt1 = {
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
      version: $_5l2xdrwoje4c0mt1.unknown()
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
  var $_bnmg9wwnje4c0msy = {
    unknown: unknown$1,
    nu: nu$1,
    edge: $_82nexzwjje4c0mss.constant(edge),
    chrome: $_82nexzwjje4c0mss.constant(chrome),
    ie: $_82nexzwjje4c0mss.constant(ie),
    opera: $_82nexzwjje4c0mss.constant(opera),
    firefox: $_82nexzwjje4c0mss.constant(firefox),
    safari: $_82nexzwjje4c0mss.constant(safari)
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
      version: $_5l2xdrwoje4c0mt1.unknown()
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
  var $_8jzffqwpje4c0mt3 = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_82nexzwjje4c0mss.constant(windows),
    ios: $_82nexzwjje4c0mss.constant(ios),
    android: $_82nexzwjje4c0mss.constant(android),
    linux: $_82nexzwjje4c0mss.constant(linux),
    osx: $_82nexzwjje4c0mss.constant(osx),
    solaris: $_82nexzwjje4c0mss.constant(solaris),
    freebsd: $_82nexzwjje4c0mss.constant(freebsd)
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
      isiPad: $_82nexzwjje4c0mss.constant(isiPad),
      isiPhone: $_82nexzwjje4c0mss.constant(isiPhone),
      isTablet: $_82nexzwjje4c0mss.constant(isTablet),
      isPhone: $_82nexzwjje4c0mss.constant(isPhone),
      isTouch: $_82nexzwjje4c0mss.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_82nexzwjje4c0mss.constant(iOSwebview)
    };
  }

  var never$1 = $_82nexzwjje4c0mss.never;
  var always$1 = $_82nexzwjje4c0mss.always;
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
      toString: $_82nexzwjje4c0mss.constant('none()')
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
  var Option = {
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
    return r === -1 ? Option.none() : Option.some(r);
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
  var find$1 = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return Option.some(x);
      }
    }
    return Option.none();
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return Option.some(i);
      }
    }
    return Option.none();
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
    return xs.length === 0 ? Option.none() : Option.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? Option.none() : Option.some(xs[xs.length - 1]);
  };
  var $_9880jxwsje4c0mtn = {
    map: map,
    each: each,
    eachr: eachr,
    partition: partition,
    filter: filter,
    groupBy: groupBy,
    indexOf: indexOf,
    foldr: foldr,
    foldl: foldl,
    find: find$1,
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

  var detect$1 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return $_9880jxwsje4c0mtn.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$1(browsers, userAgent).map(function (browser) {
      var version = $_5l2xdrwoje4c0mt1.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$1(oses, userAgent).map(function (os) {
      var version = $_5l2xdrwoje4c0mt1.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_9vfd47wrje4c0mta = {
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
  var $_f2urb9wwje4c0mub = {
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
    return str === '' ? Option.none() : Option.some(str.substr(0, 1));
  };
  var tail = function (str) {
    return str === '' ? Option.none() : Option.some(str.substring(1));
  };
  var $_7jub55wxje4c0muc = {
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
    return startsWith(str, prefix) ? $_f2urb9wwje4c0mub.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_f2urb9wwje4c0mub.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_f2urb9wwje4c0mub.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_f2urb9wwje4c0mub.addToEnd(str, prefix);
  };
  var contains$1 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_7jub55wxje4c0muc.head(str).bind(function (head) {
      return $_7jub55wxje4c0muc.tail(str).map(function (tail) {
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
  var $_7tbyfhwvje4c0mu9 = {
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
      return $_7tbyfhwvje4c0mu9.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_7tbyfhwvje4c0mu9.contains(uastring, 'edge/') && $_7tbyfhwvje4c0mu9.contains(uastring, 'chrome') && $_7tbyfhwvje4c0mu9.contains(uastring, 'safari') && $_7tbyfhwvje4c0mu9.contains(uastring, 'applewebkit');
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
        return $_7tbyfhwvje4c0mu9.contains(uastring, 'chrome') && !$_7tbyfhwvje4c0mu9.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_7tbyfhwvje4c0mu9.contains(uastring, 'msie') || $_7tbyfhwvje4c0mu9.contains(uastring, 'trident');
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
        return ($_7tbyfhwvje4c0mu9.contains(uastring, 'safari') || $_7tbyfhwvje4c0mu9.contains(uastring, 'mobile/')) && $_7tbyfhwvje4c0mu9.contains(uastring, 'applewebkit');
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
        return $_7tbyfhwvje4c0mu9.contains(uastring, 'iphone') || $_7tbyfhwvje4c0mu9.contains(uastring, 'ipad');
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
  var $_488xy0wuje4c0mtx = {
    browsers: $_82nexzwjje4c0mss.constant(browsers),
    oses: $_82nexzwjje4c0mss.constant(oses)
  };

  var detect$2 = function (userAgent) {
    var browsers = $_488xy0wuje4c0mtx.browsers();
    var oses = $_488xy0wuje4c0mtx.oses();
    var browser = $_9vfd47wrje4c0mta.detectBrowser(browsers, userAgent).fold($_bnmg9wwnje4c0msy.unknown, $_bnmg9wwnje4c0msy.nu);
    var os = $_9vfd47wrje4c0mta.detectOs(oses, userAgent).fold($_8jzffqwpje4c0mt3.unknown, $_8jzffqwpje4c0mt3.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_ch1cmgwmje4c0msx = { detect: detect$2 };

  var detect$3 = $_nse44wlje4c0msw.cached(function () {
    var userAgent = navigator.userAgent;
    return $_ch1cmgwmje4c0msx.detect(userAgent);
  });
  var $_3ye61iwkje4c0msu = { detect: detect$3 };

  var alloy = { tap: $_82nexzwjje4c0mss.constant('alloy.tap') };
  var $_270al8whje4c0msc = {
    focus: $_82nexzwjje4c0mss.constant('alloy.focus'),
    postBlur: $_82nexzwjje4c0mss.constant('alloy.blur.post'),
    receive: $_82nexzwjje4c0mss.constant('alloy.receive'),
    execute: $_82nexzwjje4c0mss.constant('alloy.execute'),
    focusItem: $_82nexzwjje4c0mss.constant('alloy.focus.item'),
    tap: alloy.tap,
    tapOrClick: $_3ye61iwkje4c0msu.detect().deviceType.isTouch() ? alloy.tap : $_2j5gqiwije4c0msm.click,
    longpress: $_82nexzwjje4c0mss.constant('alloy.longpress'),
    sandboxClose: $_82nexzwjje4c0mss.constant('alloy.sandbox.close'),
    systemInit: $_82nexzwjje4c0mss.constant('alloy.system.init'),
    windowScroll: $_82nexzwjje4c0mss.constant('alloy.system.scroll'),
    attachedToDom: $_82nexzwjje4c0mss.constant('alloy.system.attached'),
    detachedFromDom: $_82nexzwjje4c0mss.constant('alloy.system.detached'),
    changeTab: $_82nexzwjje4c0mss.constant('alloy.change.tab'),
    dismissTab: $_82nexzwjje4c0mss.constant('alloy.dismiss.tab')
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
  var $_85ige4wzje4c0muf = {
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
    var bothObjects = $_85ige4wzje4c0muf.isObject(old) && $_85ige4wzje4c0muf.isObject(nu);
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
  var $_55zfs1wyje4c0mue = {
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
        return Option.some(x);
      }
    }
    return Option.none();
  };
  var values = function (obj) {
    return mapToArray(obj, function (v) {
      return v;
    });
  };
  var size = function (obj) {
    return values(obj).length;
  };
  var $_czbu3jx0je4c0muh = {
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
    emit(component, $_270al8whje4c0msc.execute());
  };
  var dispatch = function (component, target, event) {
    dispatchWith(component, target, event, {});
  };
  var dispatchWith = function (component, target, event, properties) {
    var data = $_55zfs1wyje4c0mue.deepMerge({ target: target }, properties);
    component.getSystem().triggerEvent(event, target, $_czbu3jx0je4c0muh.map(data, $_82nexzwjje4c0mss.constant));
  };
  var dispatchEvent = function (component, target, event, simulatedEvent) {
    component.getSystem().triggerEvent(event, target, simulatedEvent.event());
  };
  var dispatchFocus = function (component, target) {
    component.getSystem().triggerFocus(target, component.element());
  };
  var $_dxxx79wgje4c0ms3 = {
    emit: emit,
    emitWith: emitWith,
    emitExecute: emitExecute,
    dispatch: dispatch,
    dispatchWith: dispatchWith,
    dispatchEvent: dispatchEvent,
    dispatchFocus: dispatchFocus
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
      $_9880jxwsje4c0mtn.each(fields, function (name, i) {
        struct[name] = $_82nexzwjje4c0mss.constant(values[i]);
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
    if (!$_85ige4wzje4c0muf.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_9880jxwsje4c0mtn.each(array, function (a) {
      if (!$_85ige4wzje4c0muf.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_9880jxwsje4c0mtn.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_ah3dk0x7je4c0mvu = {
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
    $_ah3dk0x7je4c0mvu.validateStrArr('required', required);
    $_ah3dk0x7je4c0mvu.validateStrArr('optional', optional);
    $_ah3dk0x7je4c0mvu.checkDupes(everything);
    return function (obj) {
      var keys = $_czbu3jx0je4c0muh.keys(obj);
      var allReqd = $_9880jxwsje4c0mtn.forall(required, function (req) {
        return $_9880jxwsje4c0mtn.contains(keys, req);
      });
      if (!allReqd)
        $_ah3dk0x7je4c0mvu.reqMessage(required, keys);
      var unsupported = $_9880jxwsje4c0mtn.filter(keys, function (key) {
        return !$_9880jxwsje4c0mtn.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_ah3dk0x7je4c0mvu.unsuppMessage(unsupported);
      var r = {};
      $_9880jxwsje4c0mtn.each(required, function (req) {
        r[req] = $_82nexzwjje4c0mss.constant(obj[req]);
      });
      $_9880jxwsje4c0mtn.each(optional, function (opt) {
        r[opt] = $_82nexzwjje4c0mss.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? Option.some(obj[opt]) : Option.none());
      });
      return r;
    };
  }

  var $_30d3z5x4je4c0mvj = {
    immutable: Immutable,
    immutableBag: MixedBag
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
  var $_89cpwmx8je4c0mvz = { toArray: toArray };

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
  var $_bzchvvxcje4c0mwk = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_bzchvvxcje4c0mwk.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_cl2owoxbje4c0mw9 = { getOrDie: getOrDie };

  var node = function () {
    var f = $_cl2owoxbje4c0mw9.getOrDie('Node');
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
  var $_24jucmxaje4c0mw8 = {
    documentPositionPreceding: documentPositionPreceding,
    documentPositionContainedBy: documentPositionContainedBy
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
    return { dom: $_82nexzwjje4c0mss.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return Option.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_gba6fcxfje4c0mwy = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_211ypoxgje4c0mx3 = {
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

  var ELEMENT = $_211ypoxgje4c0mx3.ELEMENT;
  var DOCUMENT = $_211ypoxgje4c0mx3.DOCUMENT;
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
    return bypassSelector(base) ? [] : $_9880jxwsje4c0mtn.map(base.querySelectorAll(selector), $_gba6fcxfje4c0mwy.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? Option.none() : Option.from(base.querySelector(selector)).map($_gba6fcxfje4c0mwy.fromDom);
  };
  var $_601jqgxeje4c0mwp = {
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
    return $_9880jxwsje4c0mtn.exists(elements, $_82nexzwjje4c0mss.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_24jucmxaje4c0mw8.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_3ye61iwkje4c0msu.detect().browser;
  var contains$2 = browser.isIE() ? ieContains : regularContains;
  var $_diemerx9je4c0mw0 = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains$2,
    is: $_601jqgxeje4c0mwp.is
  };

  var owner = function (element) {
    return $_gba6fcxfje4c0mwy.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_gba6fcxfje4c0mwy.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_gba6fcxfje4c0mwy.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return Option.from(dom.parentNode).map($_gba6fcxfje4c0mwy.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_9880jxwsje4c0mtn.findIndex(kin, function (elem) {
        return $_diemerx9je4c0mw0.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_85ige4wzje4c0muf.isFunction(isRoot) ? isRoot : $_82nexzwjje4c0mss.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_gba6fcxfje4c0mwy.fromDom(rawParent);
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
      return $_9880jxwsje4c0mtn.filter(elements, function (x) {
        return !$_diemerx9je4c0mw0.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return Option.from(dom.offsetParent).map($_gba6fcxfje4c0mwy.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.previousSibling).map($_gba6fcxfje4c0mwy.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.nextSibling).map($_gba6fcxfje4c0mwy.fromDom);
  };
  var prevSiblings = function (element) {
    return $_9880jxwsje4c0mtn.reverse($_89cpwmx8je4c0mvz.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_89cpwmx8je4c0mvz.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_9880jxwsje4c0mtn.map(dom.childNodes, $_gba6fcxfje4c0mwy.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return Option.from(children[index]).map($_gba6fcxfje4c0mwy.fromDom);
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
  var spot = $_30d3z5x4je4c0mvj.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_a90a93x3je4c0mv1 = {
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
    var parent = $_a90a93x3je4c0mv1.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_a90a93x3je4c0mv1.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_a90a93x3je4c0mv1.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_a90a93x3je4c0mv1.firstChild(parent);
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
    $_a90a93x3je4c0mv1.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_1r9l60x2je4c0mux = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap
  };

  var before$1 = function (marker, elements) {
    $_9880jxwsje4c0mtn.each(elements, function (x) {
      $_1r9l60x2je4c0mux.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_9880jxwsje4c0mtn.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_1r9l60x2je4c0mux.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_9880jxwsje4c0mtn.each(elements.slice().reverse(), function (x) {
      $_1r9l60x2je4c0mux.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_9880jxwsje4c0mtn.each(elements, function (x) {
      $_1r9l60x2je4c0mux.append(parent, x);
    });
  };
  var $_8mtzevxije4c0mx6 = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_9880jxwsje4c0mtn.each($_a90a93x3je4c0mv1.children(element), function (rogue) {
      remove(rogue);
    });
  };
  var remove = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_a90a93x3je4c0mv1.children(wrapper);
    if (children.length > 0)
      $_8mtzevxije4c0mx6.before(wrapper, children);
    remove(wrapper);
  };
  var $_2jced7xhje4c0mx4 = {
    empty: empty,
    remove: remove,
    unwrap: unwrap
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
    return type(element) === $_211ypoxgje4c0mx3.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_211ypoxgje4c0mx3.ELEMENT);
  var isText = isType$1($_211ypoxgje4c0mx3.TEXT);
  var isDocument = isType$1($_211ypoxgje4c0mx3.DOCUMENT);
  var $_2wng6bxkje4c0mxf = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var inBody = function (element) {
    var dom = $_2wng6bxkje4c0mxf.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_nse44wlje4c0msw.cached(function () {
    return getBody($_gba6fcxfje4c0mwy.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_gba6fcxfje4c0mwy.fromDom(body);
  };
  var $_1erg6wxjje4c0mxa = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var fireDetaching = function (component) {
    $_dxxx79wgje4c0ms3.emit(component, $_270al8whje4c0msc.detachedFromDom());
    var children = component.components();
    $_9880jxwsje4c0mtn.each(children, fireDetaching);
  };
  var fireAttaching = function (component) {
    var children = component.components();
    $_9880jxwsje4c0mtn.each(children, fireAttaching);
    $_dxxx79wgje4c0ms3.emit(component, $_270al8whje4c0msc.attachedToDom());
  };
  var attach = function (parent, child) {
    attachWith(parent, child, $_1r9l60x2je4c0mux.append);
  };
  var attachWith = function (parent, child, insertion) {
    parent.getSystem().addToWorld(child);
    insertion(parent.element(), child.element());
    if ($_1erg6wxjje4c0mxa.inBody(parent.element()))
      fireAttaching(child);
    parent.syncComponents();
  };
  var doDetach = function (component) {
    fireDetaching(component);
    $_2jced7xhje4c0mx4.remove(component.element());
    component.getSystem().removeFromWorld(component);
  };
  var detach = function (component) {
    var parent = $_a90a93x3je4c0mv1.parent(component.element()).bind(function (p) {
      return component.getSystem().getByDom(p).fold(Option.none, Option.some);
    });
    doDetach(component);
    parent.each(function (p) {
      p.syncComponents();
    });
  };
  var detachChildren = function (component) {
    var subs = component.components();
    $_9880jxwsje4c0mtn.each(subs, doDetach);
    $_2jced7xhje4c0mx4.empty(component.element());
    component.syncComponents();
  };
  var attachSystem = function (element, guiSystem) {
    $_1r9l60x2je4c0mux.append(element, guiSystem.element());
    var children = $_a90a93x3je4c0mv1.children(guiSystem.element());
    $_9880jxwsje4c0mtn.each(children, function (child) {
      guiSystem.getByDom(child).each(fireAttaching);
    });
  };
  var detachSystem = function (guiSystem) {
    var children = $_a90a93x3je4c0mv1.children(guiSystem.element());
    $_9880jxwsje4c0mtn.each(children, function (child) {
      guiSystem.getByDom(child).each(fireDetaching);
    });
    $_2jced7xhje4c0mx4.remove(guiSystem.element());
  };
  var $_ckx9tcx1je4c0mul = {
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
    return $_a90a93x3je4c0mv1.children($_gba6fcxfje4c0mwy.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_9880jxwsje4c0mtn.map(tags, function (x) {
      return $_gba6fcxfje4c0mwy.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_9880jxwsje4c0mtn.map(texts, function (x) {
      return $_gba6fcxfje4c0mwy.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_9880jxwsje4c0mtn.map(nodes, $_gba6fcxfje4c0mwy.fromDom);
  };
  var $_ed6i58xpje4c0myd = {
    fromHtml: fromHtml$1,
    fromTags: fromTags,
    fromText: fromText$1,
    fromDom: fromDom$1
  };

  var get = function (element) {
    return element.dom().innerHTML;
  };
  var set = function (element, content) {
    var owner = $_a90a93x3je4c0mv1.owner(element);
    var docDom = owner.dom();
    var fragment = $_gba6fcxfje4c0mwy.fromDom(docDom.createDocumentFragment());
    var contentElements = $_ed6i58xpje4c0myd.fromHtml(content, docDom);
    $_8mtzevxije4c0mx6.append(fragment, contentElements);
    $_2jced7xhje4c0mx4.empty(element);
    $_1r9l60x2je4c0mux.append(element, fragment);
  };
  var getOuter = function (element) {
    var container = $_gba6fcxfje4c0mwy.fromTag('div');
    var clone = $_gba6fcxfje4c0mwy.fromDom(element.dom().cloneNode(true));
    $_1r9l60x2je4c0mux.append(container, clone);
    return get(container);
  };
  var $_elgiv8xoje4c0my9 = {
    get: get,
    set: set,
    getOuter: getOuter
  };

  var rawSet = function (dom, key, value) {
    if ($_85ige4wzje4c0muf.isString(value) || $_85ige4wzje4c0muf.isBoolean(value) || $_85ige4wzje4c0muf.isNumber(value)) {
      dom.setAttribute(key, value + '');
    } else {
      console.error('Invalid call to Attr.set. Key ', key, ':: Value ', value, ':: Element ', dom);
      throw new Error('Attribute value was not simple');
    }
  };
  var set$1 = function (element, key, value) {
    rawSet(element.dom(), key, value);
  };
  var setAll = function (element, attrs) {
    var dom = element.dom();
    $_czbu3jx0je4c0muh.each(attrs, function (v, k) {
      rawSet(dom, k, v);
    });
  };
  var get$1 = function (element, key) {
    var v = element.dom().getAttribute(key);
    return v === null ? undefined : v;
  };
  var has = function (element, key) {
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
    return $_9880jxwsje4c0mtn.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has(source, attr) && !has(destination, attr))
      set$1(destination, attr, get$1(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_2wng6bxkje4c0mxf.isElement(source) || !$_2wng6bxkje4c0mxf.isElement(destination))
      return;
    $_9880jxwsje4c0mtn.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_f4kg3zxrje4c0myl = {
    clone: clone,
    set: set$1,
    setAll: setAll,
    get: get$1,
    has: has,
    remove: remove$1,
    hasNone: hasNone,
    transfer: transfer
  };

  var clone$1 = function (original, deep) {
    return $_gba6fcxfje4c0mwy.fromDom(original.dom().cloneNode(deep));
  };
  var shallow$1 = function (original) {
    return clone$1(original, false);
  };
  var deep$1 = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_gba6fcxfje4c0mwy.fromTag(tag);
    var attributes = $_f4kg3zxrje4c0myl.clone(original);
    $_f4kg3zxrje4c0myl.setAll(nu, attributes);
    return nu;
  };
  var copy = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_a90a93x3je4c0mv1.children(deep$1(original));
    $_8mtzevxije4c0mx6.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_1r9l60x2je4c0mux.before(original, nu);
    var children = $_a90a93x3je4c0mv1.children(original);
    $_8mtzevxije4c0mx6.append(nu, children);
    $_2jced7xhje4c0mx4.remove(original);
    return nu;
  };
  var $_ciolrexqje4c0myj = {
    shallow: shallow$1,
    shallowAs: shallowAs,
    deep: deep$1,
    copy: copy,
    mutate: mutate
  };

  var getHtml = function (element) {
    var clone = $_ciolrexqje4c0myj.shallow(element);
    return $_elgiv8xoje4c0my9.getOuter(clone);
  };
  var $_8ec15nxnje4c0mxz = { getHtml: getHtml };

  var element = function (elem) {
    return $_8ec15nxnje4c0mxz.getHtml(elem);
  };
  var $_63gwexxmje4c0mxw = { element: element };

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
      return Option.some(o);
    };
    return {
      is: is,
      isValue: $_82nexzwjje4c0mss.always,
      isError: $_82nexzwjje4c0mss.never,
      getOr: $_82nexzwjje4c0mss.constant(o),
      getOrThunk: $_82nexzwjje4c0mss.constant(o),
      getOrDie: $_82nexzwjje4c0mss.constant(o),
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
      return $_82nexzwjje4c0mss.die(message)();
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
      is: $_82nexzwjje4c0mss.never,
      isValue: $_82nexzwjje4c0mss.never,
      isError: $_82nexzwjje4c0mss.always,
      getOr: $_82nexzwjje4c0mss.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_82nexzwjje4c0mss.noop,
      bind: bind,
      exists: $_82nexzwjje4c0mss.never,
      forall: $_82nexzwjje4c0mss.always,
      toOption: Option.none
    };
  };
  var Result = {
    value: value$1,
    error: error
  };

  var generate = function (cases) {
    if (!$_85ige4wzje4c0muf.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_9880jxwsje4c0mtn.each(cases, function (acase, count) {
      var keys = $_czbu3jx0je4c0muh.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_85ige4wzje4c0muf.isArray(value)) {
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
          var branchKeys = $_czbu3jx0je4c0muh.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_9880jxwsje4c0mtn.forall(constructors, function (reqKey) {
            return $_9880jxwsje4c0mtn.contains(branchKeys, reqKey);
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
  var $_14nfsrxwje4c0mzb = { generate: generate };

  var comparison = $_14nfsrxwje4c0mzb.generate([
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
    $_9880jxwsje4c0mtn.each(results, function (result) {
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
  var $_44ti7cxvje4c0mz8 = {
    partition: partition$1,
    compare: compare
  };

  var mergeValues = function (values, base) {
    return Result.value($_55zfs1wyje4c0mue.deepMerge.apply(undefined, [base].concat(values)));
  };
  var mergeErrors = function (errors) {
    return $_82nexzwjje4c0mss.compose(Result.error, $_9880jxwsje4c0mtn.flatten)(errors);
  };
  var consolidateObj = function (objects, base) {
    var partitions = $_44ti7cxvje4c0mz8.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : mergeValues(partitions.values, base);
  };
  var consolidateArr = function (objects) {
    var partitions = $_44ti7cxvje4c0mz8.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : Result.value(partitions.values);
  };
  var $_80lud9xtje4c0myw = {
    consolidateObj: consolidateObj,
    consolidateArr: consolidateArr
  };

  var narrow = function (obj, fields) {
    var r = {};
    $_9880jxwsje4c0mtn.each(fields, function (field) {
      if (obj[field] !== undefined && obj.hasOwnProperty(field))
        r[field] = obj[field];
    });
    return r;
  };
  var indexOnKey = function (array, key) {
    var obj = {};
    $_9880jxwsje4c0mtn.each(array, function (a) {
      var keyValue = a[key];
      obj[keyValue] = a;
    });
    return obj;
  };
  var exclude = function (obj, fields) {
    var r = {};
    $_czbu3jx0je4c0muh.each(obj, function (v, k) {
      if (!$_9880jxwsje4c0mtn.contains(fields, k)) {
        r[k] = v;
      }
    });
    return r;
  };
  var $_cvp1agxxje4c0n02 = {
    narrow: narrow,
    exclude: exclude,
    indexOnKey: indexOnKey
  };

  var readOpt = function (key) {
    return function (obj) {
      return obj.hasOwnProperty(key) ? Option.from(obj[key]) : Option.none();
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
  var $_dg8ifrxyje4c0n07 = {
    readOpt: readOpt,
    readOr: readOr,
    readOptFrom: readOptFrom,
    hasKey: hasKey
  };

  var wrap$1 = function (key, value) {
    var r = {};
    r[key] = value;
    return r;
  };
  var wrapAll = function (keyvalues) {
    var r = {};
    $_9880jxwsje4c0mtn.each(keyvalues, function (kv) {
      r[kv.key] = kv.value;
    });
    return r;
  };
  var $_46iym2xzje4c0n0a = {
    wrap: wrap$1,
    wrapAll: wrapAll
  };

  var narrow$1 = function (obj, fields) {
    return $_cvp1agxxje4c0n02.narrow(obj, fields);
  };
  var exclude$1 = function (obj, fields) {
    return $_cvp1agxxje4c0n02.exclude(obj, fields);
  };
  var readOpt$1 = function (key) {
    return $_dg8ifrxyje4c0n07.readOpt(key);
  };
  var readOr$1 = function (key, fallback) {
    return $_dg8ifrxyje4c0n07.readOr(key, fallback);
  };
  var readOptFrom$1 = function (obj, key) {
    return $_dg8ifrxyje4c0n07.readOptFrom(obj, key);
  };
  var wrap$2 = function (key, value) {
    return $_46iym2xzje4c0n0a.wrap(key, value);
  };
  var wrapAll$1 = function (keyvalues) {
    return $_46iym2xzje4c0n0a.wrapAll(keyvalues);
  };
  var indexOnKey$1 = function (array, key) {
    return $_cvp1agxxje4c0n02.indexOnKey(array, key);
  };
  var consolidate = function (objs, base) {
    return $_80lud9xtje4c0myw.consolidateObj(objs, base);
  };
  var hasKey$1 = function (obj, key) {
    return $_dg8ifrxyje4c0n07.hasKey(obj, key);
  };
  var $_el09ksxsje4c0myu = {
    narrow: narrow$1,
    exclude: exclude$1,
    readOpt: readOpt$1,
    readOr: readOr$1,
    readOptFrom: readOptFrom$1,
    wrap: wrap$2,
    wrapAll: wrapAll$1,
    indexOnKey: indexOnKey$1,
    hasKey: hasKey$1,
    consolidate: consolidate
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
    return Option.none();
  };
  var liftN = function (arr, f) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      if (x.isSome()) {
        r.push(x.getOrDie());
      } else {
        return Option.none();
      }
    }
    return Option.some(f.apply(null, r));
  };
  var $_ce73q4y0je4c0n0c = {
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
      return $_9880jxwsje4c0mtn.find(lines, function (line) {
        return line.indexOf('alloy') > 0 && !$_9880jxwsje4c0mtn.exists(path$1, function (p) {
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
    logEventCut: $_82nexzwjje4c0mss.noop,
    logEventStopped: $_82nexzwjje4c0mss.noop,
    logNoParent: $_82nexzwjje4c0mss.noop,
    logEventNoHandlers: $_82nexzwjje4c0mss.noop,
    logEventResponse: $_82nexzwjje4c0mss.noop,
    write: $_82nexzwjje4c0mss.noop
  };
  var monitorEvent = function (eventName, initialTarget, f) {
    var logger = debugging && (eventsMonitored === '*' || $_9880jxwsje4c0mtn.contains(eventsMonitored, eventName)) ? function () {
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
          if ($_9880jxwsje4c0mtn.contains([
              'mousemove',
              'mouseover',
              'mouseout',
              $_270al8whje4c0msc.systemInit()
            ], eventName))
            return;
          console.log(eventName, {
            event: eventName,
            target: initialTarget.dom(),
            sequence: $_9880jxwsje4c0mtn.map(sequence, function (s) {
              if (!$_9880jxwsje4c0mtn.contains([
                  'cut',
                  'stopped',
                  'response'
                ], s.outcome))
                return s.outcome;
              else
                return '{' + s.purpose + '} ' + s.outcome + ' at (' + $_63gwexxmje4c0mxw.element(s.target) + ')';
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
        '(element)': $_63gwexxmje4c0mxw.element(c.element()),
        '(initComponents)': $_9880jxwsje4c0mtn.map(cSpec.components !== undefined ? cSpec.components : [], go),
        '(components)': $_9880jxwsje4c0mtn.map(c.components(), go),
        '(bound.events)': $_czbu3jx0je4c0muh.mapToArray(c.events(), function (v, k) {
          return [k];
        }).join(', '),
        '(behaviours)': cSpec.behaviours !== undefined ? $_czbu3jx0je4c0muh.map(cSpec.behaviours, function (v, k) {
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
          var connections = $_czbu3jx0je4c0muh.keys(systems);
          return $_ce73q4y0je4c0n0c.findMap(connections, function (conn) {
            var connGui = systems[conn];
            return connGui.getByUid(uid).toOption().map(function (comp) {
              return $_el09ksxsje4c0myu.wrap($_63gwexxmje4c0mxw.element(comp.element()), inspectorInfo(comp));
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
  var $_5hzmsmxlje4c0mxh = {
    logHandler: logHandler,
    noLogger: $_82nexzwjje4c0mss.constant(ignoreEvent),
    getTrace: getTrace,
    monitorEvent: monitorEvent,
    isDebugging: $_82nexzwjje4c0mss.constant(debugging),
    registerInspector: registerInspector
  };

  var isSource = function (component, simulatedEvent) {
    return $_diemerx9je4c0mw0.eq(component.element(), simulatedEvent.event().target());
  };
  var $_d3lw3ay5je4c0n1s = { isSource: isSource };

  var adt = $_14nfsrxwje4c0mzb.generate([
    { strict: [] },
    { defaultedThunk: ['fallbackThunk'] },
    { asOption: [] },
    { asDefaultedOptionThunk: ['fallbackThunk'] },
    { mergeWithThunk: ['baseThunk'] }
  ]);
  var defaulted = function (fallback) {
    return adt.defaultedThunk($_82nexzwjje4c0mss.constant(fallback));
  };
  var asDefaultedOption = function (fallback) {
    return adt.asDefaultedOptionThunk($_82nexzwjje4c0mss.constant(fallback));
  };
  var mergeWith = function (base) {
    return adt.mergeWithThunk($_82nexzwjje4c0mss.constant(base));
  };
  var $_df8fqwy8je4c0n2s = {
    strict: adt.strict,
    asOption: adt.asOption,
    defaulted: defaulted,
    defaultedThunk: adt.defaultedThunk,
    asDefaultedOption: asDefaultedOption,
    asDefaultedOptionThunk: adt.asDefaultedOptionThunk,
    mergeWith: mergeWith,
    mergeWithThunk: adt.mergeWithThunk
  };

  var typeAdt = $_14nfsrxwje4c0mzb.generate([
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
    },
    { thunk: ['description'] },
    {
      func: [
        'args',
        'outputSchema'
      ]
    }
  ]);
  var fieldAdt = $_14nfsrxwje4c0mzb.generate([
    {
      field: [
        'name',
        'presence',
        'type'
      ]
    },
    { state: ['name'] }
  ]);
  var $_23jt78yaje4c0n48 = {
    typeAdt: typeAdt,
    fieldAdt: fieldAdt
  };

  var json = function () {
    return $_cl2owoxbje4c0mw9.getOrDie('JSON');
  };
  var parse = function (obj) {
    return json().parse(obj);
  };
  var stringify = function (obj, replacer, space) {
    return json().stringify(obj, replacer, space);
  };
  var $_5mhtz1ydje4c0n4m = {
    parse: parse,
    stringify: stringify
  };

  var formatObj = function (input) {
    return $_85ige4wzje4c0muf.isObject(input) && $_czbu3jx0je4c0muh.keys(input).length > 100 ? ' removed due to size' : $_5mhtz1ydje4c0n4m.stringify(input, null, 2);
  };
  var formatErrors = function (errors) {
    var es = errors.length > 10 ? errors.slice(0, 10).concat([{
        path: [],
        getErrorInfo: function () {
          return '... (only showing first ten failures)';
        }
      }]) : errors;
    return $_9880jxwsje4c0mtn.map(es, function (e) {
      return 'Failed path: (' + e.path.join(' > ') + ')\n' + e.getErrorInfo();
    });
  };
  var $_fbwqmhycje4c0n4f = {
    formatObj: formatObj,
    formatErrors: formatErrors
  };

  var nu$3 = function (path, getErrorInfo) {
    return Result.error([{
        path: path,
        getErrorInfo: getErrorInfo
      }]);
  };
  var missingStrict = function (path, key, obj) {
    return nu$3(path, function () {
      return 'Could not find valid *strict* value for "' + key + '" in ' + $_fbwqmhycje4c0n4f.formatObj(obj);
    });
  };
  var missingKey = function (path, key) {
    return nu$3(path, function () {
      return 'Choice schema did not contain choice key: "' + key + '"';
    });
  };
  var missingBranch = function (path, branches, branch) {
    return nu$3(path, function () {
      return 'The chosen schema: "' + branch + '" did not exist in branches: ' + $_fbwqmhycje4c0n4f.formatObj(branches);
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
  var $_3mrgvfybje4c0n4d = {
    missingStrict: missingStrict,
    missingKey: missingKey,
    missingBranch: missingBranch,
    unsupportedFields: unsupportedFields,
    custom: custom,
    toString: toString
  };

  var adt$1 = $_14nfsrxwje4c0mzb.generate([
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
    return adt$1.state(okey, $_82nexzwjje4c0mss.constant(value));
  };
  var snapshot = function (okey) {
    return adt$1.state(okey, $_82nexzwjje4c0mss.identity);
  };
  var strictAccess = function (path, obj, key) {
    return $_dg8ifrxyje4c0n07.readOptFrom(obj, key).fold(function () {
      return $_3mrgvfybje4c0n4d.missingStrict(path, key, obj);
    }, Result.value);
  };
  var fallbackAccess = function (obj, key, fallbackThunk) {
    var v = $_dg8ifrxyje4c0n07.readOptFrom(obj, key).fold(function () {
      return fallbackThunk(obj);
    }, $_82nexzwjje4c0mss.identity);
    return Result.value(v);
  };
  var optionAccess = function (obj, key) {
    return Result.value($_dg8ifrxyje4c0n07.readOptFrom(obj, key));
  };
  var optionDefaultedAccess = function (obj, key, fallback) {
    var opt = $_dg8ifrxyje4c0n07.readOptFrom(obj, key).map(function (val) {
      return val === true ? fallback(obj) : val;
    });
    return Result.value(opt);
  };
  var cExtractOne = function (path, obj, field, strength) {
    return field.fold(function (key, okey, presence, prop) {
      var bundle = function (av) {
        return prop.extract(path.concat([key]), strength, av).map(function (res) {
          return $_46iym2xzje4c0n0a.wrap(okey, strength(res));
        });
      };
      var bundleAsOption = function (optValue) {
        return optValue.fold(function () {
          var outcome = $_46iym2xzje4c0n0a.wrap(okey, strength(Option.none()));
          return Result.value(outcome);
        }, function (ov) {
          return prop.extract(path.concat([key]), strength, ov).map(function (res) {
            return $_46iym2xzje4c0n0a.wrap(okey, strength(Option.some(res)));
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
          return fallbackAccess(obj, key, $_82nexzwjje4c0mss.constant({})).map(function (v) {
            return $_55zfs1wyje4c0mue.deepMerge(base, v);
          }).bind(bundle);
        });
      }();
    }, function (okey, instantiator) {
      var state = instantiator(obj);
      return Result.value($_46iym2xzje4c0n0a.wrap(okey, strength(state)));
    });
  };
  var cExtract = function (path, obj, fields, strength) {
    var results = $_9880jxwsje4c0mtn.map(fields, function (field) {
      return cExtractOne(path, obj, field, strength);
    });
    return $_80lud9xtje4c0myw.consolidateObj(results, {});
  };
  var value$2 = function (validator) {
    var extract = function (path, strength, val) {
      return validator(val, strength).fold(function (err) {
        return $_3mrgvfybje4c0n4d.custom(path, err);
      }, Result.value);
    };
    var toString = function () {
      return 'val';
    };
    var toDsl = function () {
      return $_23jt78yaje4c0n48.typeAdt.itemOf(validator);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var getSetKeys = function (obj) {
    var keys = $_czbu3jx0je4c0muh.keys(obj);
    return $_9880jxwsje4c0mtn.filter(keys, function (k) {
      return $_el09ksxsje4c0myu.hasKey(obj, k);
    });
  };
  var objOnly = function (fields) {
    var delegate = obj(fields);
    var fieldNames = $_9880jxwsje4c0mtn.foldr(fields, function (acc, f) {
      return f.fold(function (key) {
        return $_55zfs1wyje4c0mue.deepMerge(acc, $_el09ksxsje4c0myu.wrap(key, true));
      }, $_82nexzwjje4c0mss.constant(acc));
    }, {});
    var extract = function (path, strength, o) {
      var keys = $_85ige4wzje4c0muf.isBoolean(o) ? [] : getSetKeys(o);
      var extra = $_9880jxwsje4c0mtn.filter(keys, function (k) {
        return !$_el09ksxsje4c0myu.hasKey(fieldNames, k);
      });
      return extra.length === 0 ? delegate.extract(path, strength, o) : $_3mrgvfybje4c0n4d.unsupportedFields(path, extra);
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
      var fieldStrings = $_9880jxwsje4c0mtn.map(fields, function (field) {
        return field.fold(function (key, okey, presence, prop) {
          return key + ' -> ' + prop.toString();
        }, function (okey, instantiator) {
          return 'state(' + okey + ')';
        });
      });
      return 'obj{\n' + fieldStrings.join('\n') + '}';
    };
    var toDsl = function () {
      return $_23jt78yaje4c0n48.typeAdt.objOf($_9880jxwsje4c0mtn.map(fields, function (f) {
        return f.fold(function (key, okey, presence, prop) {
          return $_23jt78yaje4c0n48.fieldAdt.field(key, presence, prop);
        }, function (okey, instantiator) {
          return $_23jt78yaje4c0n48.fieldAdt.state(okey);
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
      var results = $_9880jxwsje4c0mtn.map(array, function (a, i) {
        return prop.extract(path.concat(['[' + i + ']']), strength, a);
      });
      return $_80lud9xtje4c0myw.consolidateArr(results);
    };
    var toString = function () {
      return 'array(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_23jt78yaje4c0n48.typeAdt.arrOf(prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var setOf = function (validator, prop) {
    var validateKeys = function (path, keys) {
      return arr(value$2(validator)).extract(path, $_82nexzwjje4c0mss.identity, keys);
    };
    var extract = function (path, strength, o) {
      var keys = $_czbu3jx0je4c0muh.keys(o);
      return validateKeys(path, keys).bind(function (validKeys) {
        var schema = $_9880jxwsje4c0mtn.map(validKeys, function (vk) {
          return adt$1.field(vk, vk, $_df8fqwy8je4c0n2s.strict(), prop);
        });
        return obj(schema).extract(path, strength, o);
      });
    };
    var toString = function () {
      return 'setOf(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_23jt78yaje4c0n48.typeAdt.setOf(validator, prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var func = function (args, schema, retriever) {
    var delegate = value$2(function (f, strength) {
      return $_85ige4wzje4c0muf.isFunction(f) ? Result.value(function () {
        var gArgs = Array.prototype.slice.call(arguments, 0);
        var allowedArgs = gArgs.slice(0, args.length);
        var o = f.apply(null, allowedArgs);
        return retriever(o, strength);
      }) : Result.error('Not a function');
    });
    return {
      extract: delegate.extract,
      toString: function () {
        return 'function';
      },
      toDsl: function () {
        return $_23jt78yaje4c0n48.typeAdt.func(args, schema);
      }
    };
  };
  var thunk = function (desc, processor) {
    var getP = $_nse44wlje4c0msw.cached(function () {
      return processor();
    });
    var extract = function (path, strength, val) {
      return getP().extract(path, strength, val);
    };
    var toString = function () {
      return getP().toString();
    };
    var toDsl = function () {
      return $_23jt78yaje4c0n48.typeAdt.thunk(desc);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var anyValue = value$2(Result.value);
  var arrOfObj = $_82nexzwjje4c0mss.compose(arr, obj);
  var $_4jkxycy9je4c0n35 = {
    anyValue: $_82nexzwjje4c0mss.constant(anyValue),
    value: value$2,
    obj: obj,
    objOnly: objOnly,
    arr: arr,
    setOf: setOf,
    arrOfObj: arrOfObj,
    state: adt$1.state,
    field: adt$1.field,
    output: output,
    snapshot: snapshot,
    thunk: thunk,
    func: func
  };

  var strict = function (key) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.strict(), $_4jkxycy9je4c0n35.anyValue());
  };
  var strictOf = function (key, schema) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.strict(), schema);
  };
  var strictFunction = function (key) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.strict(), $_4jkxycy9je4c0n35.value(function (f) {
      return $_85ige4wzje4c0muf.isFunction(f) ? Result.value(f) : Result.error('Not a function');
    }));
  };
  var forbid = function (key, message) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.asOption(), $_4jkxycy9je4c0n35.value(function (v) {
      return Result.error('The field: ' + key + ' is forbidden. ' + message);
    }));
  };
  var strictArrayOf = function (key, prop) {
    return strictOf(key, prop);
  };
  var strictObjOf = function (key, objSchema) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.strict(), $_4jkxycy9je4c0n35.obj(objSchema));
  };
  var strictArrayOfObj = function (key, objFields) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.strict(), $_4jkxycy9je4c0n35.arrOfObj(objFields));
  };
  var option = function (key) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.asOption(), $_4jkxycy9je4c0n35.anyValue());
  };
  var optionOf = function (key, schema) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.asOption(), schema);
  };
  var optionObjOf = function (key, objSchema) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.asOption(), $_4jkxycy9je4c0n35.obj(objSchema));
  };
  var optionObjOfOnly = function (key, objSchema) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.asOption(), $_4jkxycy9je4c0n35.objOnly(objSchema));
  };
  var defaulted$1 = function (key, fallback) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.defaulted(fallback), $_4jkxycy9je4c0n35.anyValue());
  };
  var defaultedOf = function (key, fallback, schema) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.defaulted(fallback), schema);
  };
  var defaultedObjOf = function (key, fallback, objSchema) {
    return $_4jkxycy9je4c0n35.field(key, key, $_df8fqwy8je4c0n2s.defaulted(fallback), $_4jkxycy9je4c0n35.obj(objSchema));
  };
  var field = function (key, okey, presence, prop) {
    return $_4jkxycy9je4c0n35.field(key, okey, presence, prop);
  };
  var state = function (okey, instantiator) {
    return $_4jkxycy9je4c0n35.state(okey, instantiator);
  };
  var $_9mxze0y7je4c0n2h = {
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
    var fields = $_el09ksxsje4c0myu.readOptFrom(branches, ch);
    return fields.fold(function () {
      return $_3mrgvfybje4c0n4d.missingBranch(path, branches, ch);
    }, function (fs) {
      return $_4jkxycy9je4c0n35.obj(fs).extract(path.concat(['branch: ' + ch]), strength, input);
    });
  };
  var choose = function (key, branches) {
    var extract = function (path, strength, input) {
      var choice = $_el09ksxsje4c0myu.readOptFrom(input, key);
      return choice.fold(function () {
        return $_3mrgvfybje4c0n4d.missingKey(path, key);
      }, function (chosen) {
        return chooseFrom(path, strength, input, branches, chosen);
      });
    };
    var toString = function () {
      return 'chooseOn(' + key + '). Possible values: ' + $_czbu3jx0je4c0muh.keys(branches);
    };
    var toDsl = function () {
      return $_23jt78yaje4c0n48.typeAdt.choiceOf(key, branches);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var $_87cyj8yfje4c0n4u = { choose: choose };

  var anyValue$1 = $_4jkxycy9je4c0n35.value(Result.value);
  var arrOfObj$1 = function (objFields) {
    return $_4jkxycy9je4c0n35.arrOfObj(objFields);
  };
  var arrOfVal = function () {
    return $_4jkxycy9je4c0n35.arr(anyValue$1);
  };
  var arrOf = $_4jkxycy9je4c0n35.arr;
  var objOf = $_4jkxycy9je4c0n35.obj;
  var objOfOnly = $_4jkxycy9je4c0n35.objOnly;
  var setOf$1 = $_4jkxycy9je4c0n35.setOf;
  var valueOf = function (validator) {
    return $_4jkxycy9je4c0n35.value(function (v) {
      return validator(v);
    });
  };
  var extract = function (label, prop, strength, obj) {
    return prop.extract([label], strength, obj).fold(function (errs) {
      return Result.error({
        input: obj,
        errors: errs
      });
    }, Result.value);
  };
  var asStruct = function (label, prop, obj) {
    return extract(label, prop, $_82nexzwjje4c0mss.constant, obj);
  };
  var asRaw = function (label, prop, obj) {
    return extract(label, prop, $_82nexzwjje4c0mss.identity, obj);
  };
  var getOrDie$1 = function (extraction) {
    return extraction.fold(function (errInfo) {
      throw new Error(formatError(errInfo));
    }, $_82nexzwjje4c0mss.identity);
  };
  var asRawOrDie = function (label, prop, obj) {
    return getOrDie$1(asRaw(label, prop, obj));
  };
  var asStructOrDie = function (label, prop, obj) {
    return getOrDie$1(asStruct(label, prop, obj));
  };
  var formatError = function (errInfo) {
    return 'Errors: \n' + $_fbwqmhycje4c0n4f.formatErrors(errInfo.errors) + '\n\nInput object: ' + $_fbwqmhycje4c0n4f.formatObj(errInfo.input);
  };
  var choose$1 = function (key, branches) {
    return $_87cyj8yfje4c0n4u.choose(key, branches);
  };
  var thunkOf = function (desc, schema) {
    return $_4jkxycy9je4c0n35.thunk(desc, schema);
  };
  var funcOrDie = function (args, schema) {
    var retriever = function (output, strength) {
      return getOrDie$1(extract('()', schema, strength, output));
    };
    return $_4jkxycy9je4c0n35.func(args, schema, retriever);
  };
  var $_98oa5zyeje4c0n4p = {
    anyValue: $_82nexzwjje4c0mss.constant(anyValue$1),
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
    choose: choose$1,
    thunkOf: thunkOf,
    funcOrDie: funcOrDie
  };

  var nu$4 = function (parts) {
    if (!$_el09ksxsje4c0myu.hasKey(parts, 'can') && !$_el09ksxsje4c0myu.hasKey(parts, 'abort') && !$_el09ksxsje4c0myu.hasKey(parts, 'run'))
      throw new Error('EventHandler defined by: ' + $_5mhtz1ydje4c0n4m.stringify(parts, null, 2) + ' does not have can, abort, or run!');
    return $_98oa5zyeje4c0n4p.asRawOrDie('Extracting event.handler', $_98oa5zyeje4c0n4p.objOfOnly([
      $_9mxze0y7je4c0n2h.defaulted('can', $_82nexzwjje4c0mss.constant(true)),
      $_9mxze0y7je4c0n2h.defaulted('abort', $_82nexzwjje4c0mss.constant(false)),
      $_9mxze0y7je4c0n2h.defaulted('run', $_82nexzwjje4c0mss.noop)
    ]), parts);
  };
  var all$1 = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_9880jxwsje4c0mtn.foldl(handlers, function (acc, handler) {
        return acc && f(handler).apply(undefined, args);
      }, true);
    };
  };
  var any = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_9880jxwsje4c0mtn.foldl(handlers, function (acc, handler) {
        return acc || f(handler).apply(undefined, args);
      }, false);
    };
  };
  var read = function (handler) {
    return $_85ige4wzje4c0muf.isFunction(handler) ? {
      can: $_82nexzwjje4c0mss.constant(true),
      abort: $_82nexzwjje4c0mss.constant(false),
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
      $_9880jxwsje4c0mtn.each(handlers, function (handler) {
        handler.run.apply(undefined, args);
      });
    };
    return nu$4({
      can: can,
      abort: abort,
      run: run
    });
  };
  var $_c2uy54y6je4c0n1w = {
    read: read,
    fuse: fuse,
    nu: nu$4
  };

  var derive = $_el09ksxsje4c0myu.wrapAll;
  var abort = function (name, predicate) {
    return {
      key: name,
      value: $_c2uy54y6je4c0n1w.nu({ abort: predicate })
    };
  };
  var can = function (name, predicate) {
    return {
      key: name,
      value: $_c2uy54y6je4c0n1w.nu({ can: predicate })
    };
  };
  var preventDefault = function (name) {
    return {
      key: name,
      value: $_c2uy54y6je4c0n1w.nu({
        run: function (component, simulatedEvent) {
          simulatedEvent.event().prevent();
        }
      })
    };
  };
  var run = function (name, handler) {
    return {
      key: name,
      value: $_c2uy54y6je4c0n1w.nu({ run: handler })
    };
  };
  var runActionExtra = function (name, action, extra) {
    return {
      key: name,
      value: $_c2uy54y6je4c0n1w.nu({
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
        value: $_c2uy54y6je4c0n1w.nu({
          run: function (component, simulatedEvent) {
            if ($_d3lw3ay5je4c0n1s.isSource(component, simulatedEvent))
              handler(component, simulatedEvent);
          }
        })
      };
    };
  };
  var redirectToUid = function (name, uid) {
    return run(name, function (component, simulatedEvent) {
      component.getSystem().getByUid(uid).each(function (redirectee) {
        $_dxxx79wgje4c0ms3.dispatchEvent(redirectee, redirectee.element(), name, simulatedEvent);
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
  var $_86uglly4je4c0n1n = {
    derive: derive,
    run: run,
    preventDefault: preventDefault,
    runActionExtra: runActionExtra,
    runOnAttached: runOnSourceName($_270al8whje4c0msc.attachedToDom()),
    runOnDetached: runOnSourceName($_270al8whje4c0msc.detachedFromDom()),
    runOnInit: runOnSourceName($_270al8whje4c0msc.systemInit()),
    runOnExecute: runOnName($_270al8whje4c0msc.execute()),
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
  var getAnnotation = Option.none;
  var $_4stm7wygje4c0n51 = {
    markAsBehaviourApi: markAsBehaviourApi,
    markAsExtraApi: markAsExtraApi,
    markAsSketchApi: markAsSketchApi,
    getAnnotation: getAnnotation
  };

  var nu$5 = $_30d3z5x4je4c0mvj.immutableBag(['tag'], [
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
    return $_5mhtz1ydje4c0n4m.stringify(raw, null, 2);
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
  var $_9n1m7pyije4c0n5k = {
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
  var nu$6 = $_30d3z5x4je4c0mvj.immutableBag([], fields);
  var derive$1 = function (settings) {
    var r = {};
    var keys = $_czbu3jx0je4c0muh.keys(settings);
    $_9880jxwsje4c0mtn.each(keys, function (key) {
      settings[key].each(function (v) {
        r[key] = v;
      });
    });
    return nu$6(r);
  };
  var modToStr = function (mod) {
    var raw = modToRaw(mod);
    return $_5mhtz1ydje4c0n4m.stringify(raw, null, 2);
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
        return $_el09ksxsje4c0myu.wrap(key, arr2);
      });
    }, function (arr1) {
      return oArr2.fold(function () {
        return $_el09ksxsje4c0myu.wrap(key, arr1);
      }, function (arr2) {
        return $_el09ksxsje4c0myu.wrap(key, arr2);
      });
    });
  };
  var merge$1 = function (defnA, mod) {
    var raw = $_55zfs1wyje4c0mue.deepMerge({
      tag: defnA.tag(),
      classes: mod.classes().getOr([]).concat(defnA.classes().getOr([])),
      attributes: $_55zfs1wyje4c0mue.merge(defnA.attributes().getOr({}), mod.attributes().getOr({})),
      styles: $_55zfs1wyje4c0mue.merge(defnA.styles().getOr({}), mod.styles().getOr({}))
    }, mod.innerHtml().or(defnA.innerHtml()).map(function (innerHtml) {
      return $_el09ksxsje4c0myu.wrap('innerHtml', innerHtml);
    }).getOr({}), clashingOptArrays('domChildren', mod.domChildren(), defnA.domChildren()), clashingOptArrays('defChildren', mod.defChildren(), defnA.defChildren()), mod.value().or(defnA.value()).map(function (value) {
      return $_el09ksxsje4c0myu.wrap('value', value);
    }).getOr({}));
    return $_9n1m7pyije4c0n5k.nu(raw);
  };
  var $_g96sqfyhje4c0n57 = {
    nu: nu$6,
    derive: derive$1,
    merge: merge$1,
    modToStr: modToStr,
    modToRaw: modToRaw
  };

  var executeEvent = function (bConfig, bState, executor) {
    return $_86uglly4je4c0n1n.runOnExecute(function (component) {
      executor(component, bConfig, bState);
    });
  };
  var loadEvent = function (bConfig, bState, f) {
    return $_86uglly4je4c0n1n.runOnInit(function (component, simulatedEvent) {
      f(component, bConfig, bState);
    });
  };
  var create = function (schema, name, active, apis, extra, state) {
    var configSchema = $_98oa5zyeje4c0n4p.objOfOnly(schema);
    var schemaSchema = $_9mxze0y7je4c0n2h.optionObjOf(name, [$_9mxze0y7je4c0n2h.optionObjOfOnly('config', schema)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var createModes = function (modes, name, active, apis, extra, state) {
    var configSchema = modes;
    var schemaSchema = $_9mxze0y7je4c0n2h.optionObjOf(name, [$_9mxze0y7je4c0n2h.optionOf('config', modes)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var wrapApi = function (bName, apiFunction, apiName) {
    var f = function (component) {
      var args = arguments;
      return component.config({ name: $_82nexzwjje4c0mss.constant(bName) }).fold(function () {
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
    return $_4stm7wygje4c0n51.markAsBehaviourApi(f, apiName, apiFunction);
  };
  var revokeBehaviour = function (name) {
    return {
      key: name,
      value: undefined
    };
  };
  var doCreate = function (configSchema, schemaSchema, name, active, apis, extra, state) {
    var getConfig = function (info) {
      return $_el09ksxsje4c0myu.hasKey(info, name) ? info[name]() : Option.none();
    };
    var wrappedApis = $_czbu3jx0je4c0muh.map(apis, function (apiF, apiName) {
      return wrapApi(name, apiF, apiName);
    });
    var wrappedExtra = $_czbu3jx0je4c0muh.map(extra, function (extraF, extraName) {
      return $_4stm7wygje4c0n51.markAsExtraApi(extraF, extraName);
    });
    var me = $_55zfs1wyje4c0mue.deepMerge(wrappedExtra, wrappedApis, {
      revoke: $_82nexzwjje4c0mss.curry(revokeBehaviour, name),
      config: function (spec) {
        var prepared = $_98oa5zyeje4c0n4p.asStructOrDie(name + '-config', configSchema, spec);
        return {
          key: name,
          value: {
            config: prepared,
            me: me,
            configAsRaw: $_nse44wlje4c0msw.cached(function () {
              return $_98oa5zyeje4c0n4p.asRawOrDie(name + '-config', configSchema, spec);
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
          return $_el09ksxsje4c0myu.readOptFrom(active, 'exhibit').map(function (exhibitor) {
            return exhibitor(base, behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr($_g96sqfyhje4c0n57.nu({}));
      },
      name: function () {
        return name;
      },
      handlers: function (info) {
        return getConfig(info).bind(function (behaviourInfo) {
          return $_el09ksxsje4c0myu.readOptFrom(active, 'events').map(function (events) {
            return events(behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr({});
      }
    });
    return me;
  };
  var $_3tqi4py3je4c0n0s = {
    executeEvent: executeEvent,
    loadEvent: loadEvent,
    create: create,
    createModes: createModes
  };

  var base = function (handleUnsupported, required) {
    return baseWith(handleUnsupported, required, {
      validate: $_85ige4wzje4c0muf.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_ah3dk0x7je4c0mvu.validateStrArr('required', required);
    $_ah3dk0x7je4c0mvu.checkDupes(required);
    return function (obj) {
      var keys = $_czbu3jx0je4c0muh.keys(obj);
      var allReqd = $_9880jxwsje4c0mtn.forall(required, function (req) {
        return $_9880jxwsje4c0mtn.contains(keys, req);
      });
      if (!allReqd)
        $_ah3dk0x7je4c0mvu.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_9880jxwsje4c0mtn.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_ah3dk0x7je4c0mvu.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_9880jxwsje4c0mtn.filter(keys, function (key) {
      return !$_9880jxwsje4c0mtn.contains(required, key);
    });
    if (unsupported.length > 0)
      $_ah3dk0x7je4c0mvu.unsuppMessage(unsupported);
  };
  var allowExtra = $_82nexzwjje4c0mss.noop;
  var $_cc3dhyylje4c0n5w = {
    exactly: $_82nexzwjje4c0mss.curry(base, handleExact),
    ensure: $_82nexzwjje4c0mss.curry(base, allowExtra),
    ensureWith: $_82nexzwjje4c0mss.curry(baseWith, allowExtra)
  };

  var BehaviourState = $_cc3dhyylje4c0n5w.ensure(['readState']);

  var init = function () {
    return BehaviourState({
      readState: function () {
        return 'No State required';
      }
    });
  };
  var $_4k95zoyjje4c0n5t = { init: init };

  var derive$2 = function (capabilities) {
    return $_el09ksxsje4c0myu.wrapAll(capabilities);
  };
  var simpleSchema = $_98oa5zyeje4c0n4p.objOfOnly([
    $_9mxze0y7je4c0n2h.strict('fields'),
    $_9mxze0y7je4c0n2h.strict('name'),
    $_9mxze0y7je4c0n2h.defaulted('active', {}),
    $_9mxze0y7je4c0n2h.defaulted('apis', {}),
    $_9mxze0y7je4c0n2h.defaulted('extra', {}),
    $_9mxze0y7je4c0n2h.defaulted('state', $_4k95zoyjje4c0n5t)
  ]);
  var create$1 = function (data) {
    var value = $_98oa5zyeje4c0n4p.asRawOrDie('Creating behaviour: ' + data.name, simpleSchema, data);
    return $_3tqi4py3je4c0n0s.create(value.fields, value.name, value.active, value.apis, value.extra, value.state);
  };
  var modeSchema = $_98oa5zyeje4c0n4p.objOfOnly([
    $_9mxze0y7je4c0n2h.strict('branchKey'),
    $_9mxze0y7je4c0n2h.strict('branches'),
    $_9mxze0y7je4c0n2h.strict('name'),
    $_9mxze0y7je4c0n2h.defaulted('active', {}),
    $_9mxze0y7je4c0n2h.defaulted('apis', {}),
    $_9mxze0y7je4c0n2h.defaulted('extra', {}),
    $_9mxze0y7je4c0n2h.defaulted('state', $_4k95zoyjje4c0n5t)
  ]);
  var createModes$1 = function (data) {
    var value = $_98oa5zyeje4c0n4p.asRawOrDie('Creating behaviour: ' + data.name, modeSchema, data);
    return $_3tqi4py3je4c0n0s.createModes($_98oa5zyeje4c0n4p.choose(value.branchKey, value.branches), value.name, value.active, value.apis, value.extra, value.state);
  };
  var $_bi2douy2je4c0n0f = {
    derive: derive$2,
    revoke: $_82nexzwjje4c0mss.constant(undefined),
    noActive: $_82nexzwjje4c0mss.constant({}),
    noApis: $_82nexzwjje4c0mss.constant({}),
    noExtra: $_82nexzwjje4c0mss.constant({}),
    noState: $_82nexzwjje4c0mss.constant($_4k95zoyjje4c0n5t),
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

  var read$1 = function (element, attr) {
    var value = $_f4kg3zxrje4c0myl.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add = function (element, attr, id) {
    var old = read$1(element, attr);
    var nu = old.concat([id]);
    $_f4kg3zxrje4c0myl.set(element, attr, nu.join(' '));
  };
  var remove$2 = function (element, attr, id) {
    var nu = $_9880jxwsje4c0mtn.filter(read$1(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_f4kg3zxrje4c0myl.set(element, attr, nu.join(' '));
    else
      $_f4kg3zxrje4c0myl.remove(element, attr);
  };
  var $_95ot1tyqje4c0n6e = {
    read: read$1,
    add: add,
    remove: remove$2
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$2 = function (element) {
    return $_95ot1tyqje4c0n6e.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_95ot1tyqje4c0n6e.add(element, 'class', clazz);
  };
  var remove$3 = function (element, clazz) {
    return $_95ot1tyqje4c0n6e.remove(element, 'class', clazz);
  };
  var toggle = function (element, clazz) {
    if ($_9880jxwsje4c0mtn.contains(get$2(element), clazz)) {
      remove$3(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_ftc5rvypje4c0n68 = {
    get: get$2,
    add: add$1,
    remove: remove$3,
    toggle: toggle,
    supports: supports
  };

  var add$2 = function (element, clazz) {
    if ($_ftc5rvypje4c0n68.supports(element))
      element.dom().classList.add(clazz);
    else
      $_ftc5rvypje4c0n68.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_ftc5rvypje4c0n68.supports(element) ? element.dom().classList : $_ftc5rvypje4c0n68.get(element);
    if (classList.length === 0) {
      $_f4kg3zxrje4c0myl.remove(element, 'class');
    }
  };
  var remove$4 = function (element, clazz) {
    if ($_ftc5rvypje4c0n68.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_ftc5rvypje4c0n68.remove(element, clazz);
    cleanClass(element);
  };
  var toggle$1 = function (element, clazz) {
    return $_ftc5rvypje4c0n68.supports(element) ? element.dom().classList.toggle(clazz) : $_ftc5rvypje4c0n68.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_ftc5rvypje4c0n68.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_ftc5rvypje4c0n68.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_ftc5rvypje4c0n68.add(element, clazz);
    };
    return Toggler(off, on, has$1(element, clazz));
  };
  var has$1 = function (element, clazz) {
    return $_ftc5rvypje4c0n68.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_7xiz2yynje4c0n63 = {
    add: add$2,
    remove: remove$4,
    toggle: toggle$1,
    toggler: toggler,
    has: has$1
  };

  var swap = function (element, addCls, removeCls) {
    $_7xiz2yynje4c0n63.remove(element, removeCls);
    $_7xiz2yynje4c0n63.add(element, addCls);
  };
  var toAlpha = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.alpha(), swapConfig.omega());
  };
  var toOmega = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.omega(), swapConfig.alpha());
  };
  var clear = function (component, swapConfig, swapState) {
    $_7xiz2yynje4c0n63.remove(component.element(), swapConfig.alpha());
    $_7xiz2yynje4c0n63.remove(component.element(), swapConfig.omega());
  };
  var isAlpha = function (component, swapConfig, swapState) {
    return $_7xiz2yynje4c0n63.has(component.element(), swapConfig.alpha());
  };
  var isOmega = function (component, swapConfig, swapState) {
    return $_7xiz2yynje4c0n63.has(component.element(), swapConfig.omega());
  };
  var $_8l9ig2ymje4c0n5y = {
    toAlpha: toAlpha,
    toOmega: toOmega,
    isAlpha: isAlpha,
    isOmega: isOmega,
    clear: clear
  };

  var SwapSchema = [
    $_9mxze0y7je4c0n2h.strict('alpha'),
    $_9mxze0y7je4c0n2h.strict('omega')
  ];

  var Swapping = $_bi2douy2je4c0n0f.create({
    fields: SwapSchema,
    name: 'swapping',
    apis: $_8l9ig2ymje4c0n5y
  });

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
    return is(scope, a) ? Option.some(scope) : $_85ige4wzje4c0muf.isFunction(isRoot) && isRoot(scope) ? Option.none() : ancestor(scope, a, isRoot);
  }

  var first$1 = function (predicate) {
    return descendant($_1erg6wxjje4c0mxa.body(), predicate);
  };
  var ancestor = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_85ige4wzje4c0muf.isFunction(isRoot) ? isRoot : $_82nexzwjje4c0mss.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_gba6fcxfje4c0mwy.fromDom(element);
      if (predicate(el))
        return Option.some(el);
      else if (stop(el))
        break;
    }
    return Option.none();
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
      return Option.none();
    return child$1($_gba6fcxfje4c0mwy.fromDom(element.parentNode), function (x) {
      return !$_diemerx9je4c0mw0.eq(scope, x) && predicate(x);
    });
  };
  var child$1 = function (scope, predicate) {
    var result = $_9880jxwsje4c0mtn.find(scope.dom().childNodes, $_82nexzwjje4c0mss.compose(predicate, $_gba6fcxfje4c0mwy.fromDom));
    return result.map($_gba6fcxfje4c0mwy.fromDom);
  };
  var descendant = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_gba6fcxfje4c0mwy.fromDom(element.childNodes[i])))
          return Option.some($_gba6fcxfje4c0mwy.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return Option.none();
    };
    return descend(scope.dom());
  };
  var $_1dgvyfyvje4c0n73 = {
    first: first$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };

  var any$1 = function (predicate) {
    return $_1dgvyfyvje4c0n73.first(predicate).isSome();
  };
  var ancestor$1 = function (scope, predicate, isRoot) {
    return $_1dgvyfyvje4c0n73.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest$1 = function (scope, predicate, isRoot) {
    return $_1dgvyfyvje4c0n73.closest(scope, predicate, isRoot).isSome();
  };
  var sibling$1 = function (scope, predicate) {
    return $_1dgvyfyvje4c0n73.sibling(scope, predicate).isSome();
  };
  var child$2 = function (scope, predicate) {
    return $_1dgvyfyvje4c0n73.child(scope, predicate).isSome();
  };
  var descendant$1 = function (scope, predicate) {
    return $_1dgvyfyvje4c0n73.descendant(scope, predicate).isSome();
  };
  var $_607chpyuje4c0n71 = {
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
    var doc = $_a90a93x3je4c0mv1.owner(element).dom();
    return element.dom() === doc.activeElement;
  };
  var active = function (_doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    return Option.from(doc.activeElement).map($_gba6fcxfje4c0mwy.fromDom);
  };
  var focusInside = function (element) {
    var doc = $_a90a93x3je4c0mv1.owner(element);
    var inside = active(doc).filter(function (a) {
      return $_607chpyuje4c0n71.closest(a, $_82nexzwjje4c0mss.curry($_diemerx9je4c0mw0.eq, element));
    });
    inside.fold(function () {
      focus(element);
    }, $_82nexzwjje4c0mss.noop);
  };
  var search = function (element) {
    return active($_a90a93x3je4c0mv1.owner(element)).filter(function (e) {
      return element.dom().contains(e.dom());
    });
  };
  var $_30zd9eytje4c0n6v = {
    hasFocus: hasFocus,
    focus: focus,
    blur: blur,
    active: active,
    search: search,
    focusInside: focusInside
  };

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var ThemeManager = tinymce.util.Tools.resolve('tinymce.ThemeManager');

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
  var $_gal684yzje4c0n7h = { openLink: openLink };

  var isSkinDisabled = function (editor) {
    return editor.settings.skin === false;
  };
  var $_9t0rdpz0je4c0n7j = { isSkinDisabled: isSkinDisabled };

  var formatChanged = 'formatChanged';
  var orientationChanged = 'orientationChanged';
  var dropupDismissed = 'dropupDismissed';
  var $_30j9u8z1je4c0n7k = {
    formatChanged: $_82nexzwjje4c0mss.constant(formatChanged),
    orientationChanged: $_82nexzwjje4c0mss.constant(orientationChanged),
    dropupDismissed: $_82nexzwjje4c0mss.constant(dropupDismissed)
  };

  var chooseChannels = function (channels, message) {
    return message.universal() ? channels : $_9880jxwsje4c0mtn.filter(channels, function (ch) {
      return $_9880jxwsje4c0mtn.contains(message.channels(), ch);
    });
  };
  var events = function (receiveConfig) {
    return $_86uglly4je4c0n1n.derive([$_86uglly4je4c0n1n.run($_270al8whje4c0msc.receive(), function (component, message) {
        var channelMap = receiveConfig.channels();
        var channels = $_czbu3jx0je4c0muh.keys(channelMap);
        var targetChannels = chooseChannels(channels, message);
        $_9880jxwsje4c0mtn.each(targetChannels, function (ch) {
          var channelInfo = channelMap[ch]();
          var channelSchema = channelInfo.schema();
          var data = $_98oa5zyeje4c0n4p.asStructOrDie('channel[' + ch + '] data\nReceiver: ' + $_63gwexxmje4c0mxw.element(component.element()), channelSchema, message.data());
          channelInfo.onReceive()(component, data);
        });
      })]);
  };
  var $_ermlkqz4je4c0n87 = { events: events };

  var menuFields = [
    $_9mxze0y7je4c0n2h.strict('menu'),
    $_9mxze0y7je4c0n2h.strict('selectedMenu')
  ];
  var itemFields = [
    $_9mxze0y7je4c0n2h.strict('item'),
    $_9mxze0y7je4c0n2h.strict('selectedItem')
  ];
  var schema = $_98oa5zyeje4c0n4p.objOfOnly(itemFields.concat(menuFields));
  var itemSchema = $_98oa5zyeje4c0n4p.objOfOnly(itemFields);
  var $_1oiu8hz7je4c0n93 = {
    menuFields: $_82nexzwjje4c0mss.constant(menuFields),
    itemFields: $_82nexzwjje4c0mss.constant(itemFields),
    schema: $_82nexzwjje4c0mss.constant(schema),
    itemSchema: $_82nexzwjje4c0mss.constant(itemSchema)
  };

  var initSize = $_9mxze0y7je4c0n2h.strictObjOf('initSize', [
    $_9mxze0y7je4c0n2h.strict('numColumns'),
    $_9mxze0y7je4c0n2h.strict('numRows')
  ]);
  var itemMarkers = function () {
    return $_9mxze0y7je4c0n2h.strictOf('markers', $_1oiu8hz7je4c0n93.itemSchema());
  };
  var menuMarkers = function () {
    return $_9mxze0y7je4c0n2h.strictOf('markers', $_1oiu8hz7je4c0n93.schema());
  };
  var tieredMenuMarkers = function () {
    return $_9mxze0y7je4c0n2h.strictObjOf('markers', [$_9mxze0y7je4c0n2h.strict('backgroundMenu')].concat($_1oiu8hz7je4c0n93.menuFields()).concat($_1oiu8hz7je4c0n93.itemFields()));
  };
  var markers = function (required) {
    return $_9mxze0y7je4c0n2h.strictObjOf('markers', $_9880jxwsje4c0mtn.map(required, $_9mxze0y7je4c0n2h.strict));
  };
  var onPresenceHandler = function (label, fieldName, presence) {
    var trace = $_5hzmsmxlje4c0mxh.getTrace();
    return $_9mxze0y7je4c0n2h.field(fieldName, fieldName, presence, $_98oa5zyeje4c0n4p.valueOf(function (f) {
      return Result.value(function () {
        $_5hzmsmxlje4c0mxh.logHandler(label, fieldName, trace);
        return f.apply(undefined, arguments);
      });
    }));
  };
  var onHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_df8fqwy8je4c0n2s.defaulted($_82nexzwjje4c0mss.noop));
  };
  var onKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_df8fqwy8je4c0n2s.defaulted(Option.none));
  };
  var onStrictHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_df8fqwy8je4c0n2s.strict());
  };
  var onStrictKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_df8fqwy8je4c0n2s.strict());
  };
  var output$1 = function (name, value) {
    return $_9mxze0y7je4c0n2h.state(name, $_82nexzwjje4c0mss.constant(value));
  };
  var snapshot$1 = function (name) {
    return $_9mxze0y7je4c0n2h.state(name, $_82nexzwjje4c0mss.identity);
  };
  var $_7lk9gdz6je4c0n8n = {
    initSize: $_82nexzwjje4c0mss.constant(initSize),
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

  var ReceivingSchema = [$_9mxze0y7je4c0n2h.strictOf('channels', $_98oa5zyeje4c0n4p.setOf(Result.value, $_98oa5zyeje4c0n4p.objOfOnly([
      $_7lk9gdz6je4c0n8n.onStrictHandler('onReceive'),
      $_9mxze0y7je4c0n2h.defaulted('schema', $_98oa5zyeje4c0n4p.anyValue())
    ])))];

  var Receiving = $_bi2douy2je4c0n0f.create({
    fields: ReceivingSchema,
    name: 'receiving',
    active: $_ermlkqz4je4c0n87
  });

  var updateAriaState = function (component, toggleConfig) {
    var pressed = isOn(component, toggleConfig);
    var ariaInfo = toggleConfig.aria();
    ariaInfo.update()(component, ariaInfo, pressed);
  };
  var toggle$2 = function (component, toggleConfig, toggleState) {
    $_7xiz2yynje4c0n63.toggle(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var on = function (component, toggleConfig, toggleState) {
    $_7xiz2yynje4c0n63.add(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var off = function (component, toggleConfig, toggleState) {
    $_7xiz2yynje4c0n63.remove(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var isOn = function (component, toggleConfig) {
    return $_7xiz2yynje4c0n63.has(component.element(), toggleConfig.toggleClass());
  };
  var onLoad = function (component, toggleConfig, toggleState) {
    var api = toggleConfig.selected() ? on : off;
    api(component, toggleConfig, toggleState);
  };
  var $_j4ldxzaje4c0n9l = {
    onLoad: onLoad,
    toggle: toggle$2,
    isOn: isOn,
    on: on,
    off: off
  };

  var exhibit = function (base, toggleConfig, toggleState) {
    return $_g96sqfyhje4c0n57.nu({});
  };
  var events$1 = function (toggleConfig, toggleState) {
    var execute = $_3tqi4py3je4c0n0s.executeEvent(toggleConfig, toggleState, $_j4ldxzaje4c0n9l.toggle);
    var load = $_3tqi4py3je4c0n0s.loadEvent(toggleConfig, toggleState, $_j4ldxzaje4c0n9l.onLoad);
    return $_86uglly4je4c0n1n.derive($_9880jxwsje4c0mtn.flatten([
      toggleConfig.toggleOnExecute() ? [execute] : [],
      [load]
    ]));
  };
  var $_9iu6gjz9je4c0n9g = {
    exhibit: exhibit,
    events: events$1
  };

  var updatePressed = function (component, ariaInfo, status) {
    $_f4kg3zxrje4c0myl.set(component.element(), 'aria-pressed', status);
    if (ariaInfo.syncWithExpanded())
      updateExpanded(component, ariaInfo, status);
  };
  var updateSelected = function (component, ariaInfo, status) {
    $_f4kg3zxrje4c0myl.set(component.element(), 'aria-selected', status);
  };
  var updateChecked = function (component, ariaInfo, status) {
    $_f4kg3zxrje4c0myl.set(component.element(), 'aria-checked', status);
  };
  var updateExpanded = function (component, ariaInfo, status) {
    $_f4kg3zxrje4c0myl.set(component.element(), 'aria-expanded', status);
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
    var rawTag = $_2wng6bxkje4c0mxf.name(elem);
    var suffix = rawTag === 'input' && $_f4kg3zxrje4c0myl.has(elem, 'type') ? ':' + $_f4kg3zxrje4c0myl.get(elem, 'type') : '';
    return $_el09ksxsje4c0myu.readOptFrom(tagAttributes, rawTag + suffix);
  };
  var detectFromRole = function (component) {
    var elem = component.element();
    if (!$_f4kg3zxrje4c0myl.has(elem, 'role'))
      return Option.none();
    else {
      var role = $_f4kg3zxrje4c0myl.get(elem, 'role');
      return $_el09ksxsje4c0myu.readOptFrom(roleAttributes, role);
    }
  };
  var updateAuto = function (component, ariaInfo, status) {
    var attributes = detectFromRole(component).orThunk(function () {
      return detectFromTag(component);
    }).getOr([]);
    $_9880jxwsje4c0mtn.each(attributes, function (attr) {
      $_f4kg3zxrje4c0myl.set(component.element(), attr, status);
    });
  };
  var $_bp6j3pzcje4c0na3 = {
    updatePressed: updatePressed,
    updateSelected: updateSelected,
    updateChecked: updateChecked,
    updateExpanded: updateExpanded,
    updateAuto: updateAuto
  };

  var ToggleSchema = [
    $_9mxze0y7je4c0n2h.defaulted('selected', false),
    $_9mxze0y7je4c0n2h.strict('toggleClass'),
    $_9mxze0y7je4c0n2h.defaulted('toggleOnExecute', true),
    $_9mxze0y7je4c0n2h.defaultedOf('aria', { mode: 'none' }, $_98oa5zyeje4c0n4p.choose('mode', {
      'pressed': [
        $_9mxze0y7je4c0n2h.defaulted('syncWithExpanded', false),
        $_7lk9gdz6je4c0n8n.output('update', $_bp6j3pzcje4c0na3.updatePressed)
      ],
      'checked': [$_7lk9gdz6je4c0n8n.output('update', $_bp6j3pzcje4c0na3.updateChecked)],
      'expanded': [$_7lk9gdz6je4c0n8n.output('update', $_bp6j3pzcje4c0na3.updateExpanded)],
      'selected': [$_7lk9gdz6je4c0n8n.output('update', $_bp6j3pzcje4c0na3.updateSelected)],
      'none': [$_7lk9gdz6je4c0n8n.output('update', $_82nexzwjje4c0mss.noop)]
    }))
  ];

  var Toggling = $_bi2douy2je4c0n0f.create({
    fields: ToggleSchema,
    name: 'toggling',
    active: $_9iu6gjz9je4c0n9g,
    apis: $_j4ldxzaje4c0n9l
  });

  var format = function (command, update) {
    return Receiving.config({
      channels: $_el09ksxsje4c0myu.wrap($_30j9u8z1je4c0n7k.formatChanged(), {
        onReceive: function (button, data) {
          if (data.command === command) {
            update(button, data.state);
          }
        }
      })
    });
  };
  var orientation = function (onReceive) {
    return Receiving.config({ channels: $_el09ksxsje4c0myu.wrap($_30j9u8z1je4c0n7k.orientationChanged(), { onReceive: onReceive }) });
  };
  var receive = function (channel, onReceive) {
    return {
      key: channel,
      value: { onReceive: onReceive }
    };
  };
  var $_9yraw2zdje4c0naj = {
    format: format,
    orientation: orientation,
    receive: receive
  };

  var prefix = 'tinymce-mobile';
  var resolve$1 = function (p) {
    return prefix + '-' + p;
  };
  var $_chdthezeje4c0nap = {
    resolve: resolve$1,
    prefix: $_82nexzwjje4c0mss.constant(prefix)
  };

  var focus$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_30zd9eytje4c0n6v.focus(component.element());
      focusConfig.onFocus()(component);
    }
  };
  var blur$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_30zd9eytje4c0n6v.blur(component.element());
    }
  };
  var isFocused = function (component) {
    return $_30zd9eytje4c0n6v.hasFocus(component.element());
  };
  var $_fl7njjzjje4c0nbf = {
    focus: focus$1,
    blur: blur$1,
    isFocused: isFocused
  };

  var exhibit$1 = function (base, focusConfig) {
    if (focusConfig.ignore())
      return $_g96sqfyhje4c0n57.nu({});
    else
      return $_g96sqfyhje4c0n57.nu({ attributes: { 'tabindex': '-1' } });
  };
  var events$2 = function (focusConfig) {
    return $_86uglly4je4c0n1n.derive([$_86uglly4je4c0n1n.run($_270al8whje4c0msc.focus(), function (component, simulatedEvent) {
        $_fl7njjzjje4c0nbf.focus(component, focusConfig);
        simulatedEvent.stop();
      })]);
  };
  var $_478vhtzije4c0nbd = {
    exhibit: exhibit$1,
    events: events$2
  };

  var FocusSchema = [
    $_7lk9gdz6je4c0n8n.onHandler('onFocus'),
    $_9mxze0y7je4c0n2h.defaulted('ignore', false)
  ];

  var Focusing = $_bi2douy2je4c0n0f.create({
    fields: FocusSchema,
    name: 'focusing',
    active: $_478vhtzije4c0nbd,
    apis: $_fl7njjzjje4c0nbf
  });

  var $_d4nliazpje4c0ncm = {
    BACKSPACE: $_82nexzwjje4c0mss.constant([8]),
    TAB: $_82nexzwjje4c0mss.constant([9]),
    ENTER: $_82nexzwjje4c0mss.constant([13]),
    SHIFT: $_82nexzwjje4c0mss.constant([16]),
    CTRL: $_82nexzwjje4c0mss.constant([17]),
    ALT: $_82nexzwjje4c0mss.constant([18]),
    CAPSLOCK: $_82nexzwjje4c0mss.constant([20]),
    ESCAPE: $_82nexzwjje4c0mss.constant([27]),
    SPACE: $_82nexzwjje4c0mss.constant([32]),
    PAGEUP: $_82nexzwjje4c0mss.constant([33]),
    PAGEDOWN: $_82nexzwjje4c0mss.constant([34]),
    END: $_82nexzwjje4c0mss.constant([35]),
    HOME: $_82nexzwjje4c0mss.constant([36]),
    LEFT: $_82nexzwjje4c0mss.constant([37]),
    UP: $_82nexzwjje4c0mss.constant([38]),
    RIGHT: $_82nexzwjje4c0mss.constant([39]),
    DOWN: $_82nexzwjje4c0mss.constant([40]),
    INSERT: $_82nexzwjje4c0mss.constant([45]),
    DEL: $_82nexzwjje4c0mss.constant([46]),
    META: $_82nexzwjje4c0mss.constant([
      91,
      93,
      224
    ]),
    F10: $_82nexzwjje4c0mss.constant([121])
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
  var $_7c0gqozuje4c0ne2 = {
    cycleBy: cycleBy,
    cap: cap
  };

  var all$2 = function (predicate) {
    return descendants($_1erg6wxjje4c0mxa.body(), predicate);
  };
  var ancestors = function (scope, predicate, isRoot) {
    return $_9880jxwsje4c0mtn.filter($_a90a93x3je4c0mv1.parents(scope, isRoot), predicate);
  };
  var siblings$1 = function (scope, predicate) {
    return $_9880jxwsje4c0mtn.filter($_a90a93x3je4c0mv1.siblings(scope), predicate);
  };
  var children$1 = function (scope, predicate) {
    return $_9880jxwsje4c0mtn.filter($_a90a93x3je4c0mv1.children(scope), predicate);
  };
  var descendants = function (scope, predicate) {
    var result = [];
    $_9880jxwsje4c0mtn.each($_a90a93x3je4c0mv1.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants(x, predicate));
    });
    return result;
  };
  var $_1y8jfszwje4c0ne5 = {
    all: all$2,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var all$3 = function (selector) {
    return $_601jqgxeje4c0mwp.all(selector);
  };
  var ancestors$1 = function (scope, selector, isRoot) {
    return $_1y8jfszwje4c0ne5.ancestors(scope, function (e) {
      return $_601jqgxeje4c0mwp.is(e, selector);
    }, isRoot);
  };
  var siblings$2 = function (scope, selector) {
    return $_1y8jfszwje4c0ne5.siblings(scope, function (e) {
      return $_601jqgxeje4c0mwp.is(e, selector);
    });
  };
  var children$2 = function (scope, selector) {
    return $_1y8jfszwje4c0ne5.children(scope, function (e) {
      return $_601jqgxeje4c0mwp.is(e, selector);
    });
  };
  var descendants$1 = function (scope, selector) {
    return $_601jqgxeje4c0mwp.all(selector, scope);
  };
  var $_43odwmzvje4c0ne4 = {
    all: all$3,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  var first$2 = function (selector) {
    return $_601jqgxeje4c0mwp.one(selector);
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_1dgvyfyvje4c0n73.ancestor(scope, function (e) {
      return $_601jqgxeje4c0mwp.is(e, selector);
    }, isRoot);
  };
  var sibling$2 = function (scope, selector) {
    return $_1dgvyfyvje4c0n73.sibling(scope, function (e) {
      return $_601jqgxeje4c0mwp.is(e, selector);
    });
  };
  var child$3 = function (scope, selector) {
    return $_1dgvyfyvje4c0n73.child(scope, function (e) {
      return $_601jqgxeje4c0mwp.is(e, selector);
    });
  };
  var descendant$2 = function (scope, selector) {
    return $_601jqgxeje4c0mwp.one(selector, scope);
  };
  var closest$2 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_601jqgxeje4c0mwp.is, ancestor$2, scope, selector, isRoot);
  };
  var $_bntfp0zxje4c0ne8 = {
    first: first$2,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var dehighlightAll = function (component, hConfig, hState) {
    var highlighted = $_43odwmzvje4c0ne4.descendants(component.element(), '.' + hConfig.highlightClass());
    $_9880jxwsje4c0mtn.each(highlighted, function (h) {
      $_7xiz2yynje4c0n63.remove(h, hConfig.highlightClass());
      component.getSystem().getByDom(h).each(function (target) {
        hConfig.onDehighlight()(component, target);
      });
    });
  };
  var dehighlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    $_7xiz2yynje4c0n63.remove(target.element(), hConfig.highlightClass());
    if (wasHighlighted)
      hConfig.onDehighlight()(component, target);
  };
  var highlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    dehighlightAll(component, hConfig, hState);
    $_7xiz2yynje4c0n63.add(target.element(), hConfig.highlightClass());
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
    var items = $_43odwmzvje4c0ne4.descendants(component.element(), '.' + hConfig.itemClass());
    var itemComps = $_ce73q4y0je4c0n0c.cat($_9880jxwsje4c0mtn.map(items, function (i) {
      return component.getSystem().getByDom(i).toOption();
    }));
    var targetComp = $_9880jxwsje4c0mtn.find(itemComps, predicate);
    targetComp.each(function (c) {
      highlight(component, hConfig, hState, c);
    });
  };
  var isHighlighted = function (component, hConfig, hState, queryTarget) {
    return $_7xiz2yynje4c0n63.has(queryTarget.element(), hConfig.highlightClass());
  };
  var getHighlighted = function (component, hConfig, hState) {
    return $_bntfp0zxje4c0ne8.descendant(component.element(), '.' + hConfig.highlightClass()).bind(component.getSystem().getByDom);
  };
  var getByIndex = function (component, hConfig, hState, index) {
    var items = $_43odwmzvje4c0ne4.descendants(component.element(), '.' + hConfig.itemClass());
    return Option.from(items[index]).fold(function () {
      return Result.error('No element found with index ' + index);
    }, component.getSystem().getByDom);
  };
  var getFirst = function (component, hConfig, hState) {
    return $_bntfp0zxje4c0ne8.descendant(component.element(), '.' + hConfig.itemClass()).bind(component.getSystem().getByDom);
  };
  var getLast = function (component, hConfig, hState) {
    var items = $_43odwmzvje4c0ne4.descendants(component.element(), '.' + hConfig.itemClass());
    var last = items.length > 0 ? Option.some(items[items.length - 1]) : Option.none();
    return last.bind(component.getSystem().getByDom);
  };
  var getDelta = function (component, hConfig, hState, delta) {
    var items = $_43odwmzvje4c0ne4.descendants(component.element(), '.' + hConfig.itemClass());
    var current = $_9880jxwsje4c0mtn.findIndex(items, function (item) {
      return $_7xiz2yynje4c0n63.has(item, hConfig.highlightClass());
    });
    return current.bind(function (selected) {
      var dest = $_7c0gqozuje4c0ne2.cycleBy(selected, delta, 0, items.length - 1);
      return component.getSystem().getByDom(items[dest]);
    });
  };
  var getPrevious = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, -1);
  };
  var getNext = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, +1);
  };
  var $_15bpvkztje4c0ndf = {
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
    $_9mxze0y7je4c0n2h.strict('highlightClass'),
    $_9mxze0y7je4c0n2h.strict('itemClass'),
    $_7lk9gdz6je4c0n8n.onHandler('onHighlight'),
    $_7lk9gdz6je4c0n8n.onHandler('onDehighlight')
  ];

  var Highlighting = $_bi2douy2je4c0n0f.create({
    fields: HighlightSchema,
    name: 'highlighting',
    apis: $_15bpvkztje4c0ndf
  });

  var dom = function () {
    var get = function (component) {
      return $_30zd9eytje4c0n6v.search(component.element());
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
      component.getSystem().getByDom(element).fold($_82nexzwjje4c0mss.noop, function (item) {
        Highlighting.highlight(component, item);
      });
    };
    return {
      get: get,
      set: set
    };
  };
  var $_dyd6v2zrje4c0ncu = {
    dom: dom,
    highlights: highlights
  };

  var inSet = function (keys) {
    return function (event) {
      return $_9880jxwsje4c0mtn.contains(keys, event.raw().which);
    };
  };
  var and = function (preds) {
    return function (event) {
      return $_9880jxwsje4c0mtn.forall(preds, function (pred) {
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
  var $_eserx7100je4c0nem = {
    inSet: inSet,
    and: and,
    is: is$1,
    isShift: isShift,
    isNotShift: $_82nexzwjje4c0mss.not(isShift),
    isControl: isControl,
    isNotControl: $_82nexzwjje4c0mss.not(isControl)
  };

  var basic = function (key, action) {
    return {
      matches: $_eserx7100je4c0nem.is(key),
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
    var transition = $_9880jxwsje4c0mtn.find(transitions, function (t) {
      return t.matches(event);
    });
    return transition.map(function (t) {
      return t.classification;
    });
  };
  var $_1puus1zzje4c0nei = {
    basic: basic,
    rule: rule,
    choose: choose$2
  };

  var typical = function (infoSchema, stateInit, getRules, getEvents, getApis, optFocusIn) {
    var schema = function () {
      return infoSchema.concat([
        $_9mxze0y7je4c0n2h.defaulted('focusManager', $_dyd6v2zrje4c0ncu.dom()),
        $_7lk9gdz6je4c0n8n.output('handler', me),
        $_7lk9gdz6je4c0n8n.output('state', stateInit)
      ]);
    };
    var processKey = function (component, simulatedEvent, keyingConfig, keyingState) {
      var rules = getRules(component, simulatedEvent, keyingConfig, keyingState);
      return $_1puus1zzje4c0nei.choose(rules, simulatedEvent.event()).bind(function (rule) {
        return rule(component, simulatedEvent, keyingConfig, keyingState);
      });
    };
    var toEvents = function (keyingConfig, keyingState) {
      var otherEvents = getEvents(keyingConfig, keyingState);
      var keyEvents = $_86uglly4je4c0n1n.derive(optFocusIn.map(function (focusIn) {
        return $_86uglly4je4c0n1n.run($_270al8whje4c0msc.focus(), function (component, simulatedEvent) {
          focusIn(component, keyingConfig, keyingState, simulatedEvent);
          simulatedEvent.stop();
        });
      }).toArray().concat([$_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.keydown(), function (component, simulatedEvent) {
          processKey(component, simulatedEvent, keyingConfig, keyingState).each(function (_) {
            simulatedEvent.stop();
          });
        })]));
      return $_55zfs1wyje4c0mue.deepMerge(otherEvents, keyEvents);
    };
    var me = {
      schema: schema,
      processKey: processKey,
      toEvents: toEvents,
      toApis: getApis
    };
    return me;
  };
  var $_e307aczqje4c0ncp = { typical: typical };

  var cyclePrev = function (values, index, predicate) {
    var before = $_9880jxwsje4c0mtn.reverse(values.slice(0, index));
    var after = $_9880jxwsje4c0mtn.reverse(values.slice(index + 1));
    return $_9880jxwsje4c0mtn.find(before.concat(after), predicate);
  };
  var tryPrev = function (values, index, predicate) {
    var before = $_9880jxwsje4c0mtn.reverse(values.slice(0, index));
    return $_9880jxwsje4c0mtn.find(before, predicate);
  };
  var cycleNext = function (values, index, predicate) {
    var before = values.slice(0, index);
    var after = values.slice(index + 1);
    return $_9880jxwsje4c0mtn.find(after.concat(before), predicate);
  };
  var tryNext = function (values, index, predicate) {
    var after = values.slice(index + 1);
    return $_9880jxwsje4c0mtn.find(after, predicate);
  };
  var $_c4c6em101je4c0neu = {
    cyclePrev: cyclePrev,
    cycleNext: cycleNext,
    tryPrev: tryPrev,
    tryNext: tryNext
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_en2lll104je4c0nfp = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_85ige4wzje4c0muf.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_en2lll104je4c0nfp.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_en2lll104je4c0nfp.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$2 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_czbu3jx0je4c0muh.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_czbu3jx0je4c0muh.each(css, function (v, k) {
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
    var v = r === '' && !$_1erg6wxjje4c0mxa.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_en2lll104je4c0nfp.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
  };
  var getRaw = function (element, property) {
    var dom = element.dom();
    var raw = getUnsafeProperty(dom, property);
    return Option.from(raw).filter(function (r) {
      return r.length > 0;
    });
  };
  var getAllRaw = function (element) {
    var css = {};
    var dom = element.dom();
    if ($_en2lll104je4c0nfp.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_gba6fcxfje4c0mwy.fromTag(tag);
    set$2(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$5 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_f4kg3zxrje4c0myl.has(element, 'style') && $_7tbyfhwvje4c0mu9.trim($_f4kg3zxrje4c0myl.get(element, 'style')) === '') {
      $_f4kg3zxrje4c0myl.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_f4kg3zxrje4c0myl.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_f4kg3zxrje4c0myl.remove : $_f4kg3zxrje4c0myl.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy$1 = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_en2lll104je4c0nfp.isSupported(sourceDom) && $_en2lll104je4c0nfp.isSupported(targetDom)) {
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
    if (!$_2wng6bxkje4c0mxf.isElement(source) || !$_2wng6bxkje4c0mxf.isElement(destination))
      return;
    $_9880jxwsje4c0mtn.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_81jggk103je4c0nf6 = {
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
      if (!$_85ige4wzje4c0muf.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_en2lll104je4c0nfp.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_81jggk103je4c0nf6.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_9880jxwsje4c0mtn.foldl(properties, function (acc, property) {
        var val = $_81jggk103je4c0nf6.get(element, property);
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
    return $_1erg6wxjje4c0mxa.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
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
    $_81jggk103je4c0nf6.set(element, 'max-height', absMax + 'px');
  };
  var $_ahi7ey102je4c0nf1 = {
    set: set$3,
    get: get$4,
    getOuter: getOuter$1,
    setMax: setMax
  };

  var create$2 = function (cyclicField) {
    var schema = [
      $_9mxze0y7je4c0n2h.option('onEscape'),
      $_9mxze0y7je4c0n2h.option('onEnter'),
      $_9mxze0y7je4c0n2h.defaulted('selector', '[data-alloy-tabstop="true"]'),
      $_9mxze0y7je4c0n2h.defaulted('firstTabstop', 0),
      $_9mxze0y7je4c0n2h.defaulted('useTabstopAt', $_82nexzwjje4c0mss.constant(true)),
      $_9mxze0y7je4c0n2h.option('visibilitySelector')
    ].concat([cyclicField]);
    var isVisible = function (tabbingConfig, element) {
      var target = tabbingConfig.visibilitySelector().bind(function (sel) {
        return $_bntfp0zxje4c0ne8.closest(element, sel);
      }).getOr(element);
      return $_ahi7ey102je4c0nf1.get(target) > 0;
    };
    var findInitial = function (component, tabbingConfig) {
      var tabstops = $_43odwmzvje4c0ne4.descendants(component.element(), tabbingConfig.selector());
      var visibles = $_9880jxwsje4c0mtn.filter(tabstops, function (elem) {
        return isVisible(tabbingConfig, elem);
      });
      return Option.from(visibles[tabbingConfig.firstTabstop()]);
    };
    var findCurrent = function (component, tabbingConfig) {
      return tabbingConfig.focusManager().get(component).bind(function (elem) {
        return $_bntfp0zxje4c0ne8.closest(elem, tabbingConfig.selector());
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
        return tabbingConfig.cyclic() ? Option.some(true) : Option.none();
      }, function (target) {
        tabbingConfig.focusManager().set(component, target);
        return Option.some(true);
      });
    };
    var go = function (component, simulatedEvent, tabbingConfig, cycle) {
      var tabstops = $_43odwmzvje4c0ne4.descendants(component.element(), tabbingConfig.selector());
      return findCurrent(component, tabbingConfig).bind(function (tabstop) {
        var optStopIndex = $_9880jxwsje4c0mtn.findIndex(tabstops, $_82nexzwjje4c0mss.curry($_diemerx9je4c0mw0.eq, tabstop));
        return optStopIndex.bind(function (stopIndex) {
          return goFromTabstop(component, tabstops, stopIndex, tabbingConfig, cycle);
        });
      });
    };
    var goBackwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_c4c6em101je4c0neu.cyclePrev : $_c4c6em101je4c0neu.tryPrev;
      return go(component, simulatedEvent, tabbingConfig, navigate);
    };
    var goForwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_c4c6em101je4c0neu.cycleNext : $_c4c6em101je4c0neu.tryNext;
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
    var getRules = $_82nexzwjje4c0mss.constant([
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.and([
        $_eserx7100je4c0nem.isShift,
        $_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.TAB())
      ]), goBackwards),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.TAB()), goForwards),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.ESCAPE()), exit),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.and([
        $_eserx7100je4c0nem.isNotShift,
        $_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.ENTER())
      ]), execute)
    ]);
    var getEvents = $_82nexzwjje4c0mss.constant({});
    var getApis = $_82nexzwjje4c0mss.constant({});
    return $_e307aczqje4c0ncp.typical(schema, $_4k95zoyjje4c0n5t.init, getRules, getEvents, getApis, Option.some(focusIn));
  };
  var $_cv7spazoje4c0nc2 = { create: create$2 };

  var AcyclicType = $_cv7spazoje4c0nc2.create($_9mxze0y7je4c0n2h.state('cyclic', $_82nexzwjje4c0mss.constant(false)));

  var CyclicType = $_cv7spazoje4c0nc2.create($_9mxze0y7je4c0n2h.state('cyclic', $_82nexzwjje4c0mss.constant(true)));

  var inside = function (target) {
    return $_2wng6bxkje4c0mxf.name(target) === 'input' && $_f4kg3zxrje4c0myl.get(target, 'type') !== 'radio' || $_2wng6bxkje4c0mxf.name(target) === 'textarea';
  };
  var $_autnim108je4c0ngi = { inside: inside };

  var doDefaultExecute = function (component, simulatedEvent, focused) {
    $_dxxx79wgje4c0ms3.dispatch(component, focused, $_270al8whje4c0msc.execute());
    return Option.some(true);
  };
  var defaultExecute = function (component, simulatedEvent, focused) {
    return $_autnim108je4c0ngi.inside(focused) && $_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.SPACE())(simulatedEvent.event()) ? Option.none() : doDefaultExecute(component, simulatedEvent, focused);
  };
  var $_gfvvox109je4c0ngm = { defaultExecute: defaultExecute };

  var schema$1 = [
    $_9mxze0y7je4c0n2h.defaulted('execute', $_gfvvox109je4c0ngm.defaultExecute),
    $_9mxze0y7je4c0n2h.defaulted('useSpace', false),
    $_9mxze0y7je4c0n2h.defaulted('useEnter', true),
    $_9mxze0y7je4c0n2h.defaulted('useControlEnter', false),
    $_9mxze0y7je4c0n2h.defaulted('useDown', false)
  ];
  var execute = function (component, simulatedEvent, executeConfig, executeState) {
    return executeConfig.execute()(component, simulatedEvent, component.element());
  };
  var getRules = function (component, simulatedEvent, executeConfig, executeState) {
    var spaceExec = executeConfig.useSpace() && !$_autnim108je4c0ngi.inside(component.element()) ? $_d4nliazpje4c0ncm.SPACE() : [];
    var enterExec = executeConfig.useEnter() ? $_d4nliazpje4c0ncm.ENTER() : [];
    var downExec = executeConfig.useDown() ? $_d4nliazpje4c0ncm.DOWN() : [];
    var execKeys = spaceExec.concat(enterExec).concat(downExec);
    return [$_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet(execKeys), execute)].concat(executeConfig.useControlEnter() ? [$_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.and([
        $_eserx7100je4c0nem.isControl,
        $_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.ENTER())
      ]), execute)] : []);
  };
  var getEvents = $_82nexzwjje4c0mss.constant({});
  var getApis = $_82nexzwjje4c0mss.constant({});
  var ExecutionType = $_e307aczqje4c0ncp.typical(schema$1, $_4k95zoyjje4c0n5t.init, getRules, getEvents, getApis, Option.none());

  var flatgrid = function (spec) {
    var dimensions = Cell(Option.none());
    var setGridSize = function (numRows, numColumns) {
      dimensions.set(Option.some({
        numRows: $_82nexzwjje4c0mss.constant(numRows),
        numColumns: $_82nexzwjje4c0mss.constant(numColumns)
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
      readState: $_82nexzwjje4c0mss.constant({}),
      setGridSize: setGridSize,
      getNumRows: getNumRows,
      getNumColumns: getNumColumns
    });
  };
  var init$1 = function (spec) {
    return spec.state()(spec);
  };
  var $_72t93l10bje4c0nhi = {
    flatgrid: flatgrid,
    init: init$1
  };

  var onDirection = function (isLtr, isRtl) {
    return function (element) {
      return getDirection(element) === 'rtl' ? isRtl : isLtr;
    };
  };
  var getDirection = function (element) {
    return $_81jggk103je4c0nf6.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_6e3zvq10dje4c0nhz = {
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
    var movement = $_6e3zvq10dje4c0nhz.onDirection(moveLeft, moveRight);
    return useH(movement);
  };
  var east = function (moveLeft, moveRight) {
    var movement = $_6e3zvq10dje4c0nhz.onDirection(moveRight, moveLeft);
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
  var $_4vcgbu10cje4c0nhv = {
    east: east,
    west: west,
    north: useV,
    south: useV,
    move: useV
  };

  var indexInfo = $_30d3z5x4je4c0mvj.immutableBag([
    'index',
    'candidates'
  ], []);
  var locate = function (candidates, predicate) {
    return $_9880jxwsje4c0mtn.findIndex(candidates, predicate).map(function (index) {
      return indexInfo({
        index: index,
        candidates: candidates
      });
    });
  };
  var $_90nxc310fje4c0nif = { locate: locate };

  var visibilityToggler = function (element, property, hiddenValue, visibleValue) {
    var initial = $_81jggk103je4c0nf6.get(element, property);
    if (initial === undefined)
      initial = '';
    var value = initial === hiddenValue ? visibleValue : hiddenValue;
    var off = $_82nexzwjje4c0mss.curry($_81jggk103je4c0nf6.set, element, property, initial);
    var on = $_82nexzwjje4c0mss.curry($_81jggk103je4c0nf6.set, element, property, value);
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
  var $_annthu10gje4c0nim = {
    toggler: toggler$1,
    displayToggler: displayToggler,
    isVisible: isVisible
  };

  var locateVisible = function (container, current, selector) {
    var filter = $_annthu10gje4c0nim.isVisible;
    return locateIn(container, current, selector, filter);
  };
  var locateIn = function (container, current, selector, filter) {
    var predicate = $_82nexzwjje4c0mss.curry($_diemerx9je4c0mw0.eq, current);
    var candidates = $_43odwmzvje4c0ne4.descendants(container, selector);
    var visible = $_9880jxwsje4c0mtn.filter(candidates, $_annthu10gje4c0nim.isVisible);
    return $_90nxc310fje4c0nif.locate(visible, predicate);
  };
  var findIndex$2 = function (elements, target) {
    return $_9880jxwsje4c0mtn.findIndex(elements, function (elem) {
      return $_diemerx9je4c0mw0.eq(target, elem);
    });
  };
  var $_8cbp1p10eje4c0ni1 = {
    locateVisible: locateVisible,
    locateIn: locateIn,
    findIndex: findIndex$2
  };

  var withGrid = function (values, index, numCols, f) {
    var oldRow = Math.floor(index / numCols);
    var oldColumn = index % numCols;
    return f(oldRow, oldColumn).bind(function (address) {
      var newIndex = address.row() * numCols + address.column();
      return newIndex >= 0 && newIndex < values.length ? Option.some(values[newIndex]) : Option.none();
    });
  };
  var cycleHorizontal = function (values, index, numRows, numCols, delta) {
    return withGrid(values, index, numCols, function (oldRow, oldColumn) {
      var onLastRow = oldRow === numRows - 1;
      var colsInRow = onLastRow ? values.length - oldRow * numCols : numCols;
      var newColumn = $_7c0gqozuje4c0ne2.cycleBy(oldColumn, delta, 0, colsInRow - 1);
      return Option.some({
        row: $_82nexzwjje4c0mss.constant(oldRow),
        column: $_82nexzwjje4c0mss.constant(newColumn)
      });
    });
  };
  var cycleVertical = function (values, index, numRows, numCols, delta) {
    return withGrid(values, index, numCols, function (oldRow, oldColumn) {
      var newRow = $_7c0gqozuje4c0ne2.cycleBy(oldRow, delta, 0, numRows - 1);
      var onLastRow = newRow === numRows - 1;
      var colsInRow = onLastRow ? values.length - newRow * numCols : numCols;
      var newCol = $_7c0gqozuje4c0ne2.cap(oldColumn, 0, colsInRow - 1);
      return Option.some({
        row: $_82nexzwjje4c0mss.constant(newRow),
        column: $_82nexzwjje4c0mss.constant(newCol)
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
  var $_bp8ihx10hje4c0nir = {
    cycleDown: cycleDown,
    cycleUp: cycleUp,
    cycleLeft: cycleLeft,
    cycleRight: cycleRight
  };

  var schema$2 = [
    $_9mxze0y7je4c0n2h.strict('selector'),
    $_9mxze0y7je4c0n2h.defaulted('execute', $_gfvvox109je4c0ngm.defaultExecute),
    $_7lk9gdz6je4c0n8n.onKeyboardHandler('onEscape'),
    $_9mxze0y7je4c0n2h.defaulted('captureTab', false),
    $_7lk9gdz6je4c0n8n.initSize()
  ];
  var focusIn = function (component, gridConfig, gridState) {
    $_bntfp0zxje4c0ne8.descendant(component.element(), gridConfig.selector()).each(function (first) {
      gridConfig.focusManager().set(component, first);
    });
  };
  var findCurrent = function (component, gridConfig) {
    return gridConfig.focusManager().get(component).bind(function (elem) {
      return $_bntfp0zxje4c0ne8.closest(elem, gridConfig.selector());
    });
  };
  var execute$1 = function (component, simulatedEvent, gridConfig, gridState) {
    return findCurrent(component, gridConfig).bind(function (focused) {
      return gridConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var doMove = function (cycle) {
    return function (element, focused, gridConfig, gridState) {
      return $_8cbp1p10eje4c0ni1.locateVisible(element, focused, gridConfig.selector()).bind(function (identified) {
        return cycle(identified.candidates(), identified.index(), gridState.getNumRows().getOr(gridConfig.initSize().numRows()), gridState.getNumColumns().getOr(gridConfig.initSize().numColumns()));
      });
    };
  };
  var handleTab = function (component, simulatedEvent, gridConfig, gridState) {
    return gridConfig.captureTab() ? Option.some(true) : Option.none();
  };
  var doEscape = function (component, simulatedEvent, gridConfig, gridState) {
    return gridConfig.onEscape()(component, simulatedEvent);
  };
  var moveLeft = doMove($_bp8ihx10hje4c0nir.cycleLeft);
  var moveRight = doMove($_bp8ihx10hje4c0nir.cycleRight);
  var moveNorth = doMove($_bp8ihx10hje4c0nir.cycleUp);
  var moveSouth = doMove($_bp8ihx10hje4c0nir.cycleDown);
  var getRules$1 = $_82nexzwjje4c0mss.constant([
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.LEFT()), $_4vcgbu10cje4c0nhv.west(moveLeft, moveRight)),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.RIGHT()), $_4vcgbu10cje4c0nhv.east(moveLeft, moveRight)),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.UP()), $_4vcgbu10cje4c0nhv.north(moveNorth)),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.DOWN()), $_4vcgbu10cje4c0nhv.south(moveSouth)),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.and([
      $_eserx7100je4c0nem.isShift,
      $_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.TAB())
    ]), handleTab),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.and([
      $_eserx7100je4c0nem.isNotShift,
      $_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.TAB())
    ]), handleTab),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.ESCAPE()), doEscape),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.SPACE().concat($_d4nliazpje4c0ncm.ENTER())), execute$1)
  ]);
  var getEvents$1 = $_82nexzwjje4c0mss.constant({});
  var getApis$1 = {};
  var FlatgridType = $_e307aczqje4c0ncp.typical(schema$2, $_72t93l10bje4c0nhi.flatgrid, getRules$1, getEvents$1, getApis$1, Option.some(focusIn));

  var horizontal = function (container, selector, current, delta) {
    return $_8cbp1p10eje4c0ni1.locateVisible(container, current, selector, $_82nexzwjje4c0mss.constant(true)).bind(function (identified) {
      var index = identified.index();
      var candidates = identified.candidates();
      var newIndex = $_7c0gqozuje4c0ne2.cycleBy(index, delta, 0, candidates.length - 1);
      return Option.from(candidates[newIndex]);
    });
  };
  var $_11t3zg10jje4c0njc = { horizontal: horizontal };

  var schema$3 = [
    $_9mxze0y7je4c0n2h.strict('selector'),
    $_9mxze0y7je4c0n2h.defaulted('getInitial', Option.none),
    $_9mxze0y7je4c0n2h.defaulted('execute', $_gfvvox109je4c0ngm.defaultExecute),
    $_9mxze0y7je4c0n2h.defaulted('executeOnMove', false)
  ];
  var findCurrent$1 = function (component, flowConfig) {
    return flowConfig.focusManager().get(component).bind(function (elem) {
      return $_bntfp0zxje4c0ne8.closest(elem, flowConfig.selector());
    });
  };
  var execute$2 = function (component, simulatedEvent, flowConfig) {
    return findCurrent$1(component, flowConfig).bind(function (focused) {
      return flowConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$1 = function (component, flowConfig) {
    flowConfig.getInitial()(component).or($_bntfp0zxje4c0ne8.descendant(component.element(), flowConfig.selector())).each(function (first) {
      flowConfig.focusManager().set(component, first);
    });
  };
  var moveLeft$1 = function (element, focused, info) {
    return $_11t3zg10jje4c0njc.horizontal(element, info.selector(), focused, -1);
  };
  var moveRight$1 = function (element, focused, info) {
    return $_11t3zg10jje4c0njc.horizontal(element, info.selector(), focused, +1);
  };
  var doMove$1 = function (movement) {
    return function (component, simulatedEvent, flowConfig) {
      return movement(component, simulatedEvent, flowConfig).bind(function () {
        return flowConfig.executeOnMove() ? execute$2(component, simulatedEvent, flowConfig) : Option.some(true);
      });
    };
  };
  var getRules$2 = function (_) {
    return [
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.LEFT().concat($_d4nliazpje4c0ncm.UP())), doMove$1($_4vcgbu10cje4c0nhv.west(moveLeft$1, moveRight$1))),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.RIGHT().concat($_d4nliazpje4c0ncm.DOWN())), doMove$1($_4vcgbu10cje4c0nhv.east(moveLeft$1, moveRight$1))),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.ENTER()), execute$2),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.SPACE()), execute$2)
    ];
  };
  var getEvents$2 = $_82nexzwjje4c0mss.constant({});
  var getApis$2 = $_82nexzwjje4c0mss.constant({});
  var FlowType = $_e307aczqje4c0ncp.typical(schema$3, $_4k95zoyjje4c0n5t.init, getRules$2, getEvents$2, getApis$2, Option.some(focusIn$1));

  var outcome = $_30d3z5x4je4c0mvj.immutableBag([
    'rowIndex',
    'columnIndex',
    'cell'
  ], []);
  var toCell = function (matrix, rowIndex, columnIndex) {
    return Option.from(matrix[rowIndex]).bind(function (row) {
      return Option.from(row[columnIndex]).map(function (cell) {
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
    var newColIndex = $_7c0gqozuje4c0ne2.cycleBy(startCol, deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var cycleVertical$1 = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_7c0gqozuje4c0ne2.cycleBy(startRow, deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_7c0gqozuje4c0ne2.cap(colIndex, 0, colsInNextRow - 1);
    return toCell(matrix, nextRowIndex, nextColIndex);
  };
  var moveHorizontal = function (matrix, rowIndex, startCol, deltaCol) {
    var row = matrix[rowIndex];
    var colsInRow = row.length;
    var newColIndex = $_7c0gqozuje4c0ne2.cap(startCol + deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var moveVertical = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_7c0gqozuje4c0ne2.cap(startRow + deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_7c0gqozuje4c0ne2.cap(colIndex, 0, colsInNextRow - 1);
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
  var $_9wrbfa10lje4c0nk3 = {
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
    $_9mxze0y7je4c0n2h.strictObjOf('selectors', [
      $_9mxze0y7je4c0n2h.strict('row'),
      $_9mxze0y7je4c0n2h.strict('cell')
    ]),
    $_9mxze0y7je4c0n2h.defaulted('cycles', true),
    $_9mxze0y7je4c0n2h.defaulted('previousSelector', Option.none),
    $_9mxze0y7je4c0n2h.defaulted('execute', $_gfvvox109je4c0ngm.defaultExecute)
  ];
  var focusIn$2 = function (component, matrixConfig) {
    var focused = matrixConfig.previousSelector()(component).orThunk(function () {
      var selectors = matrixConfig.selectors();
      return $_bntfp0zxje4c0ne8.descendant(component.element(), selectors.cell());
    });
    focused.each(function (cell) {
      matrixConfig.focusManager().set(component, cell);
    });
  };
  var execute$3 = function (component, simulatedEvent, matrixConfig) {
    return $_30zd9eytje4c0n6v.search(component.element()).bind(function (focused) {
      return matrixConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var toMatrix = function (rows, matrixConfig) {
    return $_9880jxwsje4c0mtn.map(rows, function (row) {
      return $_43odwmzvje4c0ne4.descendants(row, matrixConfig.selectors().cell());
    });
  };
  var doMove$2 = function (ifCycle, ifMove) {
    return function (element, focused, matrixConfig) {
      var move = matrixConfig.cycles() ? ifCycle : ifMove;
      return $_bntfp0zxje4c0ne8.closest(focused, matrixConfig.selectors().row()).bind(function (inRow) {
        var cellsInRow = $_43odwmzvje4c0ne4.descendants(inRow, matrixConfig.selectors().cell());
        return $_8cbp1p10eje4c0ni1.findIndex(cellsInRow, focused).bind(function (colIndex) {
          var allRows = $_43odwmzvje4c0ne4.descendants(element, matrixConfig.selectors().row());
          return $_8cbp1p10eje4c0ni1.findIndex(allRows, inRow).bind(function (rowIndex) {
            var matrix = toMatrix(allRows, matrixConfig);
            return move(matrix, rowIndex, colIndex).map(function (next) {
              return next.cell();
            });
          });
        });
      });
    };
  };
  var moveLeft$3 = doMove$2($_9wrbfa10lje4c0nk3.cycleLeft, $_9wrbfa10lje4c0nk3.moveLeft);
  var moveRight$3 = doMove$2($_9wrbfa10lje4c0nk3.cycleRight, $_9wrbfa10lje4c0nk3.moveRight);
  var moveNorth$1 = doMove$2($_9wrbfa10lje4c0nk3.cycleUp, $_9wrbfa10lje4c0nk3.moveUp);
  var moveSouth$1 = doMove$2($_9wrbfa10lje4c0nk3.cycleDown, $_9wrbfa10lje4c0nk3.moveDown);
  var getRules$3 = $_82nexzwjje4c0mss.constant([
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.LEFT()), $_4vcgbu10cje4c0nhv.west(moveLeft$3, moveRight$3)),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.RIGHT()), $_4vcgbu10cje4c0nhv.east(moveLeft$3, moveRight$3)),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.UP()), $_4vcgbu10cje4c0nhv.north(moveNorth$1)),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.DOWN()), $_4vcgbu10cje4c0nhv.south(moveSouth$1)),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.SPACE().concat($_d4nliazpje4c0ncm.ENTER())), execute$3)
  ]);
  var getEvents$3 = $_82nexzwjje4c0mss.constant({});
  var getApis$3 = $_82nexzwjje4c0mss.constant({});
  var MatrixType = $_e307aczqje4c0ncp.typical(schema$4, $_4k95zoyjje4c0n5t.init, getRules$3, getEvents$3, getApis$3, Option.some(focusIn$2));

  var schema$5 = [
    $_9mxze0y7je4c0n2h.strict('selector'),
    $_9mxze0y7je4c0n2h.defaulted('execute', $_gfvvox109je4c0ngm.defaultExecute),
    $_9mxze0y7je4c0n2h.defaulted('moveOnTab', false)
  ];
  var execute$4 = function (component, simulatedEvent, menuConfig) {
    return menuConfig.focusManager().get(component).bind(function (focused) {
      return menuConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$3 = function (component, menuConfig, simulatedEvent) {
    $_bntfp0zxje4c0ne8.descendant(component.element(), menuConfig.selector()).each(function (first) {
      menuConfig.focusManager().set(component, first);
    });
  };
  var moveUp$1 = function (element, focused, info) {
    return $_11t3zg10jje4c0njc.horizontal(element, info.selector(), focused, -1);
  };
  var moveDown$1 = function (element, focused, info) {
    return $_11t3zg10jje4c0njc.horizontal(element, info.selector(), focused, +1);
  };
  var fireShiftTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_4vcgbu10cje4c0nhv.move(moveUp$1)(component, simulatedEvent, menuConfig) : Option.none();
  };
  var fireTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_4vcgbu10cje4c0nhv.move(moveDown$1)(component, simulatedEvent, menuConfig) : Option.none();
  };
  var getRules$4 = $_82nexzwjje4c0mss.constant([
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.UP()), $_4vcgbu10cje4c0nhv.move(moveUp$1)),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.DOWN()), $_4vcgbu10cje4c0nhv.move(moveDown$1)),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.and([
      $_eserx7100je4c0nem.isShift,
      $_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.TAB())
    ]), fireShiftTab),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.and([
      $_eserx7100je4c0nem.isNotShift,
      $_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.TAB())
    ]), fireTab),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.ENTER()), execute$4),
    $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.SPACE()), execute$4)
  ]);
  var getEvents$4 = $_82nexzwjje4c0mss.constant({});
  var getApis$4 = $_82nexzwjje4c0mss.constant({});
  var MenuType = $_e307aczqje4c0ncp.typical(schema$5, $_4k95zoyjje4c0n5t.init, getRules$4, getEvents$4, getApis$4, Option.some(focusIn$3));

  var schema$6 = [
    $_7lk9gdz6je4c0n8n.onKeyboardHandler('onSpace'),
    $_7lk9gdz6je4c0n8n.onKeyboardHandler('onEnter'),
    $_7lk9gdz6je4c0n8n.onKeyboardHandler('onShiftEnter'),
    $_7lk9gdz6je4c0n8n.onKeyboardHandler('onLeft'),
    $_7lk9gdz6je4c0n8n.onKeyboardHandler('onRight'),
    $_7lk9gdz6je4c0n8n.onKeyboardHandler('onTab'),
    $_7lk9gdz6je4c0n8n.onKeyboardHandler('onShiftTab'),
    $_7lk9gdz6je4c0n8n.onKeyboardHandler('onUp'),
    $_7lk9gdz6je4c0n8n.onKeyboardHandler('onDown'),
    $_7lk9gdz6je4c0n8n.onKeyboardHandler('onEscape'),
    $_9mxze0y7je4c0n2h.option('focusIn')
  ];
  var getRules$5 = function (component, simulatedEvent, executeInfo) {
    return [
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.SPACE()), executeInfo.onSpace()),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.and([
        $_eserx7100je4c0nem.isNotShift,
        $_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.ENTER())
      ]), executeInfo.onEnter()),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.and([
        $_eserx7100je4c0nem.isShift,
        $_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.ENTER())
      ]), executeInfo.onShiftEnter()),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.and([
        $_eserx7100je4c0nem.isShift,
        $_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.TAB())
      ]), executeInfo.onShiftTab()),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.and([
        $_eserx7100je4c0nem.isNotShift,
        $_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.TAB())
      ]), executeInfo.onTab()),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.UP()), executeInfo.onUp()),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.DOWN()), executeInfo.onDown()),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.LEFT()), executeInfo.onLeft()),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.RIGHT()), executeInfo.onRight()),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.SPACE()), executeInfo.onSpace()),
      $_1puus1zzje4c0nei.rule($_eserx7100je4c0nem.inSet($_d4nliazpje4c0ncm.ESCAPE()), executeInfo.onEscape())
    ];
  };
  var focusIn$4 = function (component, executeInfo) {
    return executeInfo.focusIn().bind(function (f) {
      return f(component, executeInfo);
    });
  };
  var getEvents$5 = $_82nexzwjje4c0mss.constant({});
  var getApis$5 = $_82nexzwjje4c0mss.constant({});
  var SpecialType = $_e307aczqje4c0ncp.typical(schema$6, $_4k95zoyjje4c0n5t.init, getRules$5, getEvents$5, getApis$5, Option.some(focusIn$4));

  var $_f9tuvizmje4c0nbr = {
    acyclic: AcyclicType.schema(),
    cyclic: CyclicType.schema(),
    flow: FlowType.schema(),
    flatgrid: FlatgridType.schema(),
    matrix: MatrixType.schema(),
    execution: ExecutionType.schema(),
    menu: MenuType.schema(),
    special: SpecialType.schema()
  };

  var Keying = $_bi2douy2je4c0n0f.createModes({
    branchKey: 'mode',
    branches: $_f9tuvizmje4c0nbr,
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
        if (!$_el09ksxsje4c0myu.hasKey(keyState, 'setGridSize')) {
          console.error('Layout does not support setGridSize');
        } else {
          keyState.setGridSize(numRows, numColumns);
        }
      }
    },
    state: $_72t93l10bje4c0nhi
  });

  var field$1 = function (name, forbidden) {
    return $_9mxze0y7je4c0n2h.defaultedObjOf(name, {}, $_9880jxwsje4c0mtn.map(forbidden, function (f) {
      return $_9mxze0y7je4c0n2h.forbid(f.name(), 'Cannot configure ' + f.name() + ' for ' + name);
    }).concat([$_9mxze0y7je4c0n2h.state('dump', $_82nexzwjje4c0mss.identity)]));
  };
  var get$5 = function (data) {
    return data.dump();
  };
  var $_663n6m10oje4c0nl6 = {
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
  var $_e3nt9m10rje4c0nm2 = { generate: generate$1 };

  var premadeTag = $_e3nt9m10rje4c0nm2.generate('alloy-premade');
  var apiConfig = $_e3nt9m10rje4c0nm2.generate('api');
  var premade = function (comp) {
    return $_el09ksxsje4c0myu.wrap(premadeTag, comp);
  };
  var getPremade = function (spec) {
    return $_el09ksxsje4c0myu.readOptFrom(spec, premadeTag);
  };
  var makeApi = function (f) {
    return $_4stm7wygje4c0n51.markAsSketchApi(function (component) {
      var args = Array.prototype.slice.call(arguments, 0);
      var spi = component.config(apiConfig);
      return f.apply(undefined, [spi].concat(args));
    }, f);
  };
  var $_2n986r10qje4c0nls = {
    apiConfig: $_82nexzwjje4c0mss.constant(apiConfig),
    makeApi: makeApi,
    premade: premade,
    getPremade: getPremade
  };

  var adt$2 = $_14nfsrxwje4c0mzb.generate([
    { required: ['data'] },
    { external: ['data'] },
    { optional: ['data'] },
    { group: ['data'] }
  ]);
  var fFactory = $_9mxze0y7je4c0n2h.defaulted('factory', { sketch: $_82nexzwjje4c0mss.identity });
  var fSchema = $_9mxze0y7je4c0n2h.defaulted('schema', []);
  var fName = $_9mxze0y7je4c0n2h.strict('name');
  var fPname = $_9mxze0y7je4c0n2h.field('pname', 'pname', $_df8fqwy8je4c0n2s.defaultedThunk(function (typeSpec) {
    return '<alloy.' + $_e3nt9m10rje4c0nm2.generate(typeSpec.name) + '>';
  }), $_98oa5zyeje4c0n4p.anyValue());
  var fDefaults = $_9mxze0y7je4c0n2h.defaulted('defaults', $_82nexzwjje4c0mss.constant({}));
  var fOverrides = $_9mxze0y7je4c0n2h.defaulted('overrides', $_82nexzwjje4c0mss.constant({}));
  var requiredSpec = $_98oa5zyeje4c0n4p.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var externalSpec = $_98oa5zyeje4c0n4p.objOf([
    fFactory,
    fSchema,
    fName,
    fDefaults,
    fOverrides
  ]);
  var optionalSpec = $_98oa5zyeje4c0n4p.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var groupSpec = $_98oa5zyeje4c0n4p.objOf([
    fFactory,
    fSchema,
    fName,
    $_9mxze0y7je4c0n2h.strict('unit'),
    fPname,
    fDefaults,
    fOverrides
  ]);
  var asNamedPart = function (part) {
    return part.fold(Option.some, Option.none, Option.some, Option.some);
  };
  var name$1 = function (part) {
    var get = function (data) {
      return data.name();
    };
    return part.fold(get, get, get, get);
  };
  var asCommon = function (part) {
    return part.fold($_82nexzwjje4c0mss.identity, $_82nexzwjje4c0mss.identity, $_82nexzwjje4c0mss.identity, $_82nexzwjje4c0mss.identity);
  };
  var convert = function (adtConstructor, partSpec) {
    return function (spec) {
      var data = $_98oa5zyeje4c0n4p.asStructOrDie('Converting part type', partSpec, spec);
      return adtConstructor(data);
    };
  };
  var $_9i1x5a10vje4c0nn9 = {
    required: convert(adt$2.required, requiredSpec),
    external: convert(adt$2.external, externalSpec),
    optional: convert(adt$2.optional, optionalSpec),
    group: convert(adt$2.group, groupSpec),
    asNamedPart: asNamedPart,
    name: name$1,
    asCommon: asCommon,
    original: $_82nexzwjje4c0mss.constant('entirety')
  };

  var placeholder = 'placeholder';
  var adt$3 = $_14nfsrxwje4c0mzb.generate([
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
    return $_9880jxwsje4c0mtn.contains([placeholder], uiType);
  };
  var subPlaceholder = function (owner, detail, compSpec, placeholders) {
    if (owner.exists(function (o) {
        return o !== compSpec.owner;
      }))
      return adt$3.single(true, $_82nexzwjje4c0mss.constant(compSpec));
    return $_el09ksxsje4c0myu.readOptFrom(placeholders, compSpec.name).fold(function () {
      throw new Error('Unknown placeholder component: ' + compSpec.name + '\nKnown: [' + $_czbu3jx0je4c0muh.keys(placeholders) + ']\nNamespace: ' + owner.getOr('none') + '\nSpec: ' + $_5mhtz1ydje4c0n4m.stringify(compSpec, null, 2));
    }, function (newSpec) {
      return newSpec.replace();
    });
  };
  var scan = function (owner, detail, compSpec, placeholders) {
    if (compSpec.uiType === placeholder)
      return subPlaceholder(owner, detail, compSpec, placeholders);
    else
      return adt$3.single(false, $_82nexzwjje4c0mss.constant(compSpec));
  };
  var substitute = function (owner, detail, compSpec, placeholders) {
    var base = scan(owner, detail, compSpec, placeholders);
    return base.fold(function (req, valueThunk) {
      var value = valueThunk(detail, compSpec.config, compSpec.validated);
      var childSpecs = $_el09ksxsje4c0myu.readOptFrom(value, 'components').getOr([]);
      var substituted = $_9880jxwsje4c0mtn.bind(childSpecs, function (c) {
        return substitute(owner, detail, c, placeholders);
      });
      return [$_55zfs1wyje4c0mue.deepMerge(value, { components: substituted })];
    }, function (req, valuesThunk) {
      var values = valuesThunk(detail, compSpec.config, compSpec.validated);
      return values;
    });
  };
  var substituteAll = function (owner, detail, components, placeholders) {
    return $_9880jxwsje4c0mtn.bind(components, function (c) {
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
      name: $_82nexzwjje4c0mss.constant(label),
      required: required,
      used: used,
      replace: replace
    };
  };
  var substitutePlaces = function (owner, detail, components, placeholders) {
    var ps = $_czbu3jx0je4c0muh.map(placeholders, function (ph, name) {
      return oneReplace(name, ph);
    });
    var outcome = substituteAll(owner, detail, components, ps);
    $_czbu3jx0je4c0muh.each(ps, function (p) {
      if (p.used() === false && p.required()) {
        throw new Error('Placeholder: ' + p.name() + ' was not found in components list\nNamespace: ' + owner.getOr('none') + '\nComponents: ' + $_5mhtz1ydje4c0n4m.stringify(detail.components(), null, 2));
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
  var $_97f7j910wje4c0nnu = {
    single: adt$3.single,
    multiple: adt$3.multiple,
    isSubstitute: isSubstitute,
    placeholder: $_82nexzwjje4c0mss.constant(placeholder),
    substituteAll: substituteAll,
    substitutePlaces: substitutePlaces,
    singleReplace: singleReplace
  };

  var combine = function (detail, data, partSpec, partValidated) {
    var spec = partSpec;
    return $_55zfs1wyje4c0mue.deepMerge(data.defaults()(detail, partSpec, partValidated), partSpec, { uid: detail.partUids()[data.name()] }, data.overrides()(detail, partSpec, partValidated), { 'debug.sketcher': $_el09ksxsje4c0myu.wrap('part-' + data.name(), spec) });
  };
  var subs = function (owner, detail, parts) {
    var internals = {};
    var externals = {};
    $_9880jxwsje4c0mtn.each(parts, function (part) {
      part.fold(function (data) {
        internals[data.pname()] = $_97f7j910wje4c0nnu.single(true, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        var partSpec = detail.parts()[data.name()]();
        externals[data.name()] = $_82nexzwjje4c0mss.constant(combine(detail, data, partSpec[$_9i1x5a10vje4c0nn9.original()]()));
      }, function (data) {
        internals[data.pname()] = $_97f7j910wje4c0nnu.single(false, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        internals[data.pname()] = $_97f7j910wje4c0nnu.multiple(true, function (detail, _partSpec, _partValidated) {
          var units = detail[data.name()]();
          return $_9880jxwsje4c0mtn.map(units, function (u) {
            return data.factory().sketch($_55zfs1wyje4c0mue.deepMerge(data.defaults()(detail, u), u, data.overrides()(detail, u)));
          });
        });
      });
    });
    return {
      internals: $_82nexzwjje4c0mss.constant(internals),
      externals: $_82nexzwjje4c0mss.constant(externals)
    };
  };
  var $_970d3q10uje4c0nmv = { subs: subs };

  var generate$2 = function (owner, parts) {
    var r = {};
    $_9880jxwsje4c0mtn.each(parts, function (part) {
      $_9i1x5a10vje4c0nn9.asNamedPart(part).each(function (np) {
        var g = doGenerateOne(owner, np.pname());
        r[np.name()] = function (config) {
          var validated = $_98oa5zyeje4c0n4p.asRawOrDie('Part: ' + np.name() + ' in ' + owner, $_98oa5zyeje4c0n4p.objOf(np.schema()), config);
          return $_55zfs1wyje4c0mue.deepMerge(g, {
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
      uiType: $_97f7j910wje4c0nnu.placeholder(),
      owner: owner,
      name: pname
    };
  };
  var generateOne = function (owner, pname, config) {
    return {
      uiType: $_97f7j910wje4c0nnu.placeholder(),
      owner: owner,
      name: pname,
      config: config,
      validated: {}
    };
  };
  var schemas = function (parts) {
    return $_9880jxwsje4c0mtn.bind(parts, function (part) {
      return part.fold(Option.none, Option.some, Option.none, Option.none).map(function (data) {
        return $_9mxze0y7je4c0n2h.strictObjOf(data.name(), data.schema().concat([$_7lk9gdz6je4c0n8n.snapshot($_9i1x5a10vje4c0nn9.original())]));
      }).toArray();
    });
  };
  var names = function (parts) {
    return $_9880jxwsje4c0mtn.map(parts, $_9i1x5a10vje4c0nn9.name);
  };
  var substitutes = function (owner, detail, parts) {
    return $_970d3q10uje4c0nmv.subs(owner, detail, parts);
  };
  var components = function (owner, detail, internals) {
    return $_97f7j910wje4c0nnu.substitutePlaces(Option.some(owner), detail, detail.components(), internals);
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
    $_9880jxwsje4c0mtn.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]);
    });
    return $_czbu3jx0je4c0muh.map(r, $_82nexzwjje4c0mss.constant);
  };
  var getAllParts = function (component, detail) {
    var system = component.getSystem();
    return $_czbu3jx0je4c0muh.map(detail.partUids(), function (pUid, k) {
      return $_82nexzwjje4c0mss.constant(system.getByUid(pUid));
    });
  };
  var getPartsOrDie = function (component, detail, partKeys) {
    var r = {};
    var uids = detail.partUids();
    var system = component.getSystem();
    $_9880jxwsje4c0mtn.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]).getOrDie();
    });
    return $_czbu3jx0je4c0muh.map(r, $_82nexzwjje4c0mss.constant);
  };
  var defaultUids = function (baseUid, partTypes) {
    var partNames = names(partTypes);
    return $_el09ksxsje4c0myu.wrapAll($_9880jxwsje4c0mtn.map(partNames, function (pn) {
      return {
        key: pn,
        value: baseUid + '-' + pn
      };
    }));
  };
  var defaultUidsSchema = function (partTypes) {
    return $_9mxze0y7je4c0n2h.field('partUids', 'partUids', $_df8fqwy8je4c0n2s.mergeWithThunk(function (spec) {
      return defaultUids(spec.uid, partTypes);
    }), $_98oa5zyeje4c0n4p.anyValue());
  };
  var $_3zrx6s10tje4c0nmb = {
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
  var $_d1vg9e10yje4c0noq = {
    prefix: $_82nexzwjje4c0mss.constant(prefix$1),
    idAttr: $_82nexzwjje4c0mss.constant(idAttr)
  };

  var prefix$2 = $_d1vg9e10yje4c0noq.prefix();
  var idAttr$1 = $_d1vg9e10yje4c0noq.idAttr();
  var write = function (label, elem) {
    var id = $_e3nt9m10rje4c0nm2.generate(prefix$2 + label);
    $_f4kg3zxrje4c0myl.set(elem, idAttr$1, id);
    return id;
  };
  var writeOnly = function (elem, uid) {
    $_f4kg3zxrje4c0myl.set(elem, idAttr$1, uid);
  };
  var read$2 = function (elem) {
    var id = $_2wng6bxkje4c0mxf.isElement(elem) ? $_f4kg3zxrje4c0myl.get(elem, idAttr$1) : null;
    return Option.from(id);
  };
  var find$3 = function (container, id) {
    return $_bntfp0zxje4c0ne8.descendant(container, id);
  };
  var generate$3 = function (prefix) {
    return $_e3nt9m10rje4c0nm2.generate(prefix);
  };
  var revoke = function (elem) {
    $_f4kg3zxrje4c0myl.remove(elem, idAttr$1);
  };
  var $_23tun010xje4c0no9 = {
    revoke: revoke,
    write: write,
    writeOnly: writeOnly,
    read: read$2,
    find: find$3,
    generate: generate$3,
    attribute: $_82nexzwjje4c0mss.constant(idAttr$1)
  };

  var getPartsSchema = function (partNames, _optPartNames, _owner) {
    var owner = _owner !== undefined ? _owner : 'Unknown owner';
    var fallbackThunk = function () {
      return [$_7lk9gdz6je4c0n8n.output('partUids', {})];
    };
    var optPartNames = _optPartNames !== undefined ? _optPartNames : fallbackThunk();
    if (partNames.length === 0 && optPartNames.length === 0)
      return fallbackThunk();
    var partsSchema = $_9mxze0y7je4c0n2h.strictObjOf('parts', $_9880jxwsje4c0mtn.flatten([
      $_9880jxwsje4c0mtn.map(partNames, $_9mxze0y7je4c0n2h.strict),
      $_9880jxwsje4c0mtn.map(optPartNames, function (optPart) {
        return $_9mxze0y7je4c0n2h.defaulted(optPart, $_97f7j910wje4c0nnu.single(false, function () {
          throw new Error('The optional part: ' + optPart + ' was not specified in the config, but it was used in components');
        }));
      })
    ]));
    var partUidsSchema = $_9mxze0y7je4c0n2h.state('partUids', function (spec) {
      if (!$_el09ksxsje4c0myu.hasKey(spec, 'parts')) {
        throw new Error('Part uid definition for owner: ' + owner + ' requires "parts"\nExpected parts: ' + partNames.join(', ') + '\nSpec: ' + $_5mhtz1ydje4c0n4m.stringify(spec, null, 2));
      }
      var uids = $_czbu3jx0je4c0muh.map(spec.parts, function (v, k) {
        return $_el09ksxsje4c0myu.readOptFrom(v, 'uid').getOrThunk(function () {
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
    var ps = partSchemas.length > 0 ? [$_9mxze0y7je4c0n2h.strictObjOf('parts', partSchemas)] : [];
    return ps.concat([
      $_9mxze0y7je4c0n2h.strict('uid'),
      $_9mxze0y7je4c0n2h.defaulted('dom', {}),
      $_9mxze0y7je4c0n2h.defaulted('components', []),
      $_7lk9gdz6je4c0n8n.snapshot('originalSpec'),
      $_9mxze0y7je4c0n2h.defaulted('debug.sketcher', {})
    ]).concat(partUidsSchemas);
  };
  var asRawOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, spec, partUidsSchemas);
    return $_98oa5zyeje4c0n4p.asRawOrDie(label + ' [SpecSchema]', $_98oa5zyeje4c0n4p.objOfOnly(baseS.concat(schema)), spec);
  };
  var asStructOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, partUidsSchemas, spec);
    return $_98oa5zyeje4c0n4p.asStructOrDie(label + ' [SpecSchema]', $_98oa5zyeje4c0n4p.objOfOnly(baseS.concat(schema)), spec);
  };
  var extend = function (builder, original, nu) {
    var newSpec = $_55zfs1wyje4c0mue.deepMerge(original, nu);
    return builder(newSpec);
  };
  var addBehaviours = function (original, behaviours) {
    return $_55zfs1wyje4c0mue.deepMerge(original, behaviours);
  };
  var $_4xl4lv10zje4c0now = {
    asRawOrDie: asRawOrDie$1,
    asStructOrDie: asStructOrDie$1,
    addBehaviours: addBehaviours,
    getPartsSchema: getPartsSchema,
    extend: extend
  };

  var single = function (owner, schema, factory, spec) {
    var specWithUid = supplyUid(spec);
    var detail = $_4xl4lv10zje4c0now.asStructOrDie(owner, schema, specWithUid, [], []);
    return $_55zfs1wyje4c0mue.deepMerge(factory(detail, specWithUid), { 'debug.sketcher': $_el09ksxsje4c0myu.wrap(owner, spec) });
  };
  var composite = function (owner, schema, partTypes, factory, spec) {
    var specWithUid = supplyUid(spec);
    var partSchemas = $_3zrx6s10tje4c0nmb.schemas(partTypes);
    var partUidsSchema = $_3zrx6s10tje4c0nmb.defaultUidsSchema(partTypes);
    var detail = $_4xl4lv10zje4c0now.asStructOrDie(owner, schema, specWithUid, partSchemas, [partUidsSchema]);
    var subs = $_3zrx6s10tje4c0nmb.substitutes(owner, detail, partTypes);
    var components = $_3zrx6s10tje4c0nmb.components(owner, detail, subs.internals());
    return $_55zfs1wyje4c0mue.deepMerge(factory(detail, components, specWithUid, subs.externals()), { 'debug.sketcher': $_el09ksxsje4c0myu.wrap(owner, spec) });
  };
  var supplyUid = function (spec) {
    return $_55zfs1wyje4c0mue.deepMerge({ uid: $_23tun010xje4c0no9.generate('uid') }, spec);
  };
  var $_4wj6bo10sje4c0nm4 = {
    supplyUid: supplyUid,
    single: single,
    composite: composite
  };

  var singleSchema = $_98oa5zyeje4c0n4p.objOfOnly([
    $_9mxze0y7je4c0n2h.strict('name'),
    $_9mxze0y7je4c0n2h.strict('factory'),
    $_9mxze0y7je4c0n2h.strict('configFields'),
    $_9mxze0y7je4c0n2h.defaulted('apis', {}),
    $_9mxze0y7je4c0n2h.defaulted('extraApis', {})
  ]);
  var compositeSchema = $_98oa5zyeje4c0n4p.objOfOnly([
    $_9mxze0y7je4c0n2h.strict('name'),
    $_9mxze0y7je4c0n2h.strict('factory'),
    $_9mxze0y7je4c0n2h.strict('configFields'),
    $_9mxze0y7je4c0n2h.strict('partFields'),
    $_9mxze0y7je4c0n2h.defaulted('apis', {}),
    $_9mxze0y7je4c0n2h.defaulted('extraApis', {})
  ]);
  var single$1 = function (rawConfig) {
    var config = $_98oa5zyeje4c0n4p.asRawOrDie('Sketcher for ' + rawConfig.name, singleSchema, rawConfig);
    var sketch = function (spec) {
      return $_4wj6bo10sje4c0nm4.single(config.name, config.configFields, config.factory, spec);
    };
    var apis = $_czbu3jx0je4c0muh.map(config.apis, $_2n986r10qje4c0nls.makeApi);
    var extraApis = $_czbu3jx0je4c0muh.map(config.extraApis, function (f, k) {
      return $_4stm7wygje4c0n51.markAsExtraApi(f, k);
    });
    return $_55zfs1wyje4c0mue.deepMerge({
      name: $_82nexzwjje4c0mss.constant(config.name),
      partFields: $_82nexzwjje4c0mss.constant([]),
      configFields: $_82nexzwjje4c0mss.constant(config.configFields),
      sketch: sketch
    }, apis, extraApis);
  };
  var composite$1 = function (rawConfig) {
    var config = $_98oa5zyeje4c0n4p.asRawOrDie('Sketcher for ' + rawConfig.name, compositeSchema, rawConfig);
    var sketch = function (spec) {
      return $_4wj6bo10sje4c0nm4.composite(config.name, config.configFields, config.partFields, config.factory, spec);
    };
    var parts = $_3zrx6s10tje4c0nmb.generate(config.name, config.partFields);
    var apis = $_czbu3jx0je4c0muh.map(config.apis, $_2n986r10qje4c0nls.makeApi);
    var extraApis = $_czbu3jx0je4c0muh.map(config.extraApis, function (f, k) {
      return $_4stm7wygje4c0n51.markAsExtraApi(f, k);
    });
    return $_55zfs1wyje4c0mue.deepMerge({
      name: $_82nexzwjje4c0mss.constant(config.name),
      partFields: $_82nexzwjje4c0mss.constant(config.partFields),
      configFields: $_82nexzwjje4c0mss.constant(config.configFields),
      sketch: sketch,
      parts: $_82nexzwjje4c0mss.constant(parts)
    }, apis, extraApis);
  };
  var $_ct2klp10pje4c0nle = {
    single: single$1,
    composite: composite$1
  };

  var events$3 = function (optAction) {
    var executeHandler = function (action) {
      return $_86uglly4je4c0n1n.run($_270al8whje4c0msc.execute(), function (component, simulatedEvent) {
        action(component);
        simulatedEvent.stop();
      });
    };
    var onClick = function (component, simulatedEvent) {
      simulatedEvent.stop();
      $_dxxx79wgje4c0ms3.emitExecute(component);
    };
    var onMousedown = function (component, simulatedEvent) {
      simulatedEvent.cut();
    };
    var pointerEvents = $_3ye61iwkje4c0msu.detect().deviceType.isTouch() ? [$_86uglly4je4c0n1n.run($_270al8whje4c0msc.tap(), onClick)] : [
      $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.click(), onClick),
      $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.mousedown(), onMousedown)
    ];
    return $_86uglly4je4c0n1n.derive($_9880jxwsje4c0mtn.flatten([
      optAction.map(executeHandler).toArray(),
      pointerEvents
    ]));
  };
  var $_f65ebl110je4c0npb = { events: events$3 };

  var factory = function (detail, spec) {
    var events = $_f65ebl110je4c0npb.events(detail.action());
    var optType = $_el09ksxsje4c0myu.readOptFrom(detail.dom(), 'attributes').bind($_el09ksxsje4c0myu.readOpt('type'));
    var optTag = $_el09ksxsje4c0myu.readOptFrom(detail.dom(), 'tag');
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: detail.components(),
      events: events,
      behaviours: $_55zfs1wyje4c0mue.deepMerge($_bi2douy2je4c0n0f.derive([
        Focusing.config({}),
        Keying.config({
          mode: 'execution',
          useSpace: true,
          useEnter: true
        })
      ]), $_663n6m10oje4c0nl6.get(detail.buttonBehaviours())),
      domModification: {
        attributes: $_55zfs1wyje4c0mue.deepMerge(optType.fold(function () {
          return optTag.is('button') ? { type: 'button' } : {};
        }, function (t) {
          return {};
        }), { role: detail.role().getOr('button') })
      },
      eventOrder: detail.eventOrder()
    };
  };
  var Button = $_ct2klp10pje4c0nle.single({
    name: 'Button',
    factory: factory,
    configFields: [
      $_9mxze0y7je4c0n2h.defaulted('uid', undefined),
      $_9mxze0y7je4c0n2h.strict('dom'),
      $_9mxze0y7je4c0n2h.defaulted('components', []),
      $_663n6m10oje4c0nl6.field('buttonBehaviours', [
        Focusing,
        Keying
      ]),
      $_9mxze0y7je4c0n2h.option('action'),
      $_9mxze0y7je4c0n2h.option('role'),
      $_9mxze0y7je4c0n2h.defaulted('eventOrder', {})
    ]
  });

  var exhibit$2 = function (base, unselectConfig) {
    return $_g96sqfyhje4c0n57.nu({
      styles: {
        '-webkit-user-select': 'none',
        'user-select': 'none',
        '-ms-user-select': 'none',
        '-moz-user-select': '-moz-none'
      },
      attributes: { 'unselectable': 'on' }
    });
  };
  var events$4 = function (unselectConfig) {
    return $_86uglly4je4c0n1n.derive([$_86uglly4je4c0n1n.abort($_2j5gqiwije4c0msm.selectstart(), $_82nexzwjje4c0mss.constant(true))]);
  };
  var $_7pyaet112je4c0npi = {
    events: events$4,
    exhibit: exhibit$2
  };

  var Unselecting = $_bi2douy2je4c0n0f.create({
    fields: [],
    name: 'unselecting',
    active: $_7pyaet112je4c0npi
  });

  var getAttrs = function (elem) {
    var attributes = elem.dom().attributes !== undefined ? elem.dom().attributes : [];
    return $_9880jxwsje4c0mtn.foldl(attributes, function (b, attr) {
      if (attr.name === 'class')
        return b;
      else
        return $_55zfs1wyje4c0mue.deepMerge(b, $_el09ksxsje4c0myu.wrap(attr.name, attr.value));
    }, {});
  };
  var getClasses = function (elem) {
    return Array.prototype.slice.call(elem.dom().classList, 0);
  };
  var fromHtml$2 = function (html) {
    var elem = $_gba6fcxfje4c0mwy.fromHtml(html);
    var children = $_a90a93x3je4c0mv1.children(elem);
    var attrs = getAttrs(elem);
    var classes = getClasses(elem);
    var contents = children.length === 0 ? {} : { innerHtml: $_elgiv8xoje4c0my9.get(elem) };
    return $_55zfs1wyje4c0mue.deepMerge({
      tag: $_2wng6bxkje4c0mxf.name(elem),
      classes: classes,
      attributes: attrs
    }, contents);
  };
  var sketch = function (sketcher, html, config) {
    return sketcher.sketch($_55zfs1wyje4c0mue.deepMerge({ dom: fromHtml$2(html) }, config));
  };
  var $_es7ntu114je4c0nps = {
    fromHtml: fromHtml$2,
    sketch: sketch
  };

  var dom$1 = function (rawHtml) {
    var html = $_7tbyfhwvje4c0mu9.supplant(rawHtml, { prefix: $_chdthezeje4c0nap.prefix() });
    return $_es7ntu114je4c0nps.fromHtml(html);
  };
  var spec = function (rawHtml) {
    var sDom = dom$1(rawHtml);
    return { dom: sDom };
  };
  var $_azzecm113je4c0npn = {
    dom: dom$1,
    spec: spec
  };

  var forToolbarCommand = function (editor, command) {
    return forToolbar(command, function () {
      editor.execCommand(command);
    }, {});
  };
  var getToggleBehaviours = function (command) {
    return $_bi2douy2je4c0n0f.derive([
      Toggling.config({
        toggleClass: $_chdthezeje4c0nap.resolve('toolbar-button-selected'),
        toggleOnExecute: false,
        aria: { mode: 'pressed' }
      }),
      $_9yraw2zdje4c0naj.format(command, function (button, status) {
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
      dom: $_azzecm113je4c0npn.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-' + clazz + ' ${prefix}-icon"></span>'),
      action: action,
      buttonBehaviours: $_55zfs1wyje4c0mue.deepMerge($_bi2douy2je4c0n0f.derive([Unselecting.config({})]), extraBehaviours)
    });
  };
  var $_ehma3qzfje4c0nau = {
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
  var $_eecfyw119je4c0nr8 = {
    reduceBy: reduceBy,
    increaseBy: increaseBy,
    findValueOfX: findValueOfX
  };

  var changeEvent = 'slider.change.value';
  var isTouch = $_3ye61iwkje4c0msu.detect().deviceType.isTouch();
  var getEventSource = function (simulatedEvent) {
    var evt = simulatedEvent.event().raw();
    if (isTouch && evt.touches !== undefined && evt.touches.length === 1)
      return Option.some(evt.touches[0]);
    else if (isTouch && evt.touches !== undefined)
      return Option.none();
    else if (!isTouch && evt.clientX !== undefined)
      return Option.some(evt);
    else
      return Option.none();
  };
  var getEventX = function (simulatedEvent) {
    var spot = getEventSource(simulatedEvent);
    return spot.map(function (s) {
      return s.clientX;
    });
  };
  var fireChange = function (component, value) {
    $_dxxx79wgje4c0ms3.emitWith(component, changeEvent, { value: value });
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
    var value = $_eecfyw119je4c0nr8.findValueOfX(spectrumBounds, detail.min(), detail.max(), xValue, detail.stepSize(), detail.snapToGrid(), detail.snapStart());
    fireChange(spectrum, value);
  };
  var setXFromEvent = function (spectrum, detail, spectrumBounds, simulatedEvent) {
    return getEventX(simulatedEvent).map(function (xValue) {
      setToX(spectrum, spectrumBounds, detail, xValue);
      return xValue;
    });
  };
  var moveLeft$4 = function (spectrum, detail) {
    var newValue = $_eecfyw119je4c0nr8.reduceBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var moveRight$4 = function (spectrum, detail) {
    var newValue = $_eecfyw119je4c0nr8.increaseBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var $_ei81mu118je4c0nqy = {
    setXFromEvent: setXFromEvent,
    setToLedge: setToLedge,
    setToRedge: setToRedge,
    moveLeftFromRedge: moveLeftFromRedge,
    moveRightFromLedge: moveRightFromLedge,
    moveLeft: moveLeft$4,
    moveRight: moveRight$4,
    changeEvent: $_82nexzwjje4c0mss.constant(changeEvent)
  };

  var platform = $_3ye61iwkje4c0msu.detect();
  var isTouch$1 = platform.deviceType.isTouch();
  var edgePart = function (name, action) {
    return $_9i1x5a10vje4c0nn9.optional({
      name: '' + name + '-edge',
      overrides: function (detail) {
        var touchEvents = $_86uglly4je4c0n1n.derive([$_86uglly4je4c0n1n.runActionExtra($_2j5gqiwije4c0msm.touchstart(), action, [detail])]);
        var mouseEvents = $_86uglly4je4c0n1n.derive([
          $_86uglly4je4c0n1n.runActionExtra($_2j5gqiwije4c0msm.mousedown(), action, [detail]),
          $_86uglly4je4c0n1n.runActionExtra($_2j5gqiwije4c0msm.mousemove(), function (l, det) {
            if (det.mouseIsDown().get())
              action(l, det);
          }, [detail])
        ]);
        return { events: isTouch$1 ? touchEvents : mouseEvents };
      }
    });
  };
  var ledgePart = edgePart('left', $_ei81mu118je4c0nqy.setToLedge);
  var redgePart = edgePart('right', $_ei81mu118je4c0nqy.setToRedge);
  var thumbPart = $_9i1x5a10vje4c0nn9.required({
    name: 'thumb',
    defaults: $_82nexzwjje4c0mss.constant({ dom: { styles: { position: 'absolute' } } }),
    overrides: function (detail) {
      return {
        events: $_86uglly4je4c0n1n.derive([
          $_86uglly4je4c0n1n.redirectToPart($_2j5gqiwije4c0msm.touchstart(), detail, 'spectrum'),
          $_86uglly4je4c0n1n.redirectToPart($_2j5gqiwije4c0msm.touchmove(), detail, 'spectrum'),
          $_86uglly4je4c0n1n.redirectToPart($_2j5gqiwije4c0msm.touchend(), detail, 'spectrum')
        ])
      };
    }
  });
  var spectrumPart = $_9i1x5a10vje4c0nn9.required({
    schema: [$_9mxze0y7je4c0n2h.state('mouseIsDown', function () {
        return Cell(false);
      })],
    name: 'spectrum',
    overrides: function (detail) {
      var moveToX = function (spectrum, simulatedEvent) {
        var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
        $_ei81mu118je4c0nqy.setXFromEvent(spectrum, detail, spectrumBounds, simulatedEvent);
      };
      var touchEvents = $_86uglly4je4c0n1n.derive([
        $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.touchstart(), moveToX),
        $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.touchmove(), moveToX)
      ]);
      var mouseEvents = $_86uglly4je4c0n1n.derive([
        $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.mousedown(), moveToX),
        $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.mousemove(), function (spectrum, se) {
          if (detail.mouseIsDown().get())
            moveToX(spectrum, se);
        })
      ]);
      return {
        behaviours: $_bi2douy2je4c0n0f.derive(isTouch$1 ? [] : [
          Keying.config({
            mode: 'special',
            onLeft: function (spectrum) {
              $_ei81mu118je4c0nqy.moveLeft(spectrum, detail);
              return Option.some(true);
            },
            onRight: function (spectrum) {
              $_ei81mu118je4c0nqy.moveRight(spectrum, detail);
              return Option.some(true);
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
  var $_a1vff311dje4c0nrp = {
    onLoad: onLoad$1,
    onUnload: onUnload,
    setValue: setValue,
    getValue: getValue
  };

  var events$5 = function (repConfig, repState) {
    var es = repConfig.resetOnDom() ? [
      $_86uglly4je4c0n1n.runOnAttached(function (comp, se) {
        $_a1vff311dje4c0nrp.onLoad(comp, repConfig, repState);
      }),
      $_86uglly4je4c0n1n.runOnDetached(function (comp, se) {
        $_a1vff311dje4c0nrp.onUnload(comp, repConfig, repState);
      })
    ] : [$_3tqi4py3je4c0n0s.loadEvent(repConfig, repState, $_a1vff311dje4c0nrp.onLoad)];
    return $_86uglly4je4c0n1n.derive(es);
  };
  var $_fg3jmt11cje4c0nrn = { events: events$5 };

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
  var $_1e1z9j11gje4c0ns2 = {
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
    return $_el09ksxsje4c0myu.readOptFrom(dataset, key).fold(function () {
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
    $_9mxze0y7je4c0n2h.option('initialValue'),
    $_9mxze0y7je4c0n2h.strict('getFallbackEntry'),
    $_9mxze0y7je4c0n2h.strict('getDataKey'),
    $_9mxze0y7je4c0n2h.strict('setData'),
    $_7lk9gdz6je4c0n8n.output('manager', {
      setValue: setValue$1,
      getValue: getValue$1,
      onLoad: onLoad$2,
      onUnload: onUnload$1,
      state: $_1e1z9j11gje4c0ns2.dataset
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
    $_9mxze0y7je4c0n2h.strict('getValue'),
    $_9mxze0y7je4c0n2h.defaulted('setValue', $_82nexzwjje4c0mss.noop),
    $_9mxze0y7je4c0n2h.option('initialValue'),
    $_7lk9gdz6je4c0n8n.output('manager', {
      setValue: setValue$2,
      getValue: getValue$2,
      onLoad: onLoad$3,
      onUnload: $_82nexzwjje4c0mss.noop,
      state: $_4k95zoyjje4c0n5t.init
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
    $_9mxze0y7je4c0n2h.option('initialValue'),
    $_7lk9gdz6je4c0n8n.output('manager', {
      setValue: setValue$3,
      getValue: getValue$3,
      onLoad: onLoad$4,
      onUnload: onUnload$2,
      state: $_1e1z9j11gje4c0ns2.memory
    })
  ];

  var RepresentSchema = [
    $_9mxze0y7je4c0n2h.defaultedOf('store', { mode: 'memory' }, $_98oa5zyeje4c0n4p.choose('mode', {
      memory: MemoryStore,
      manual: ManualStore,
      dataset: DatasetStore
    })),
    $_7lk9gdz6je4c0n8n.onHandler('onSetValue'),
    $_9mxze0y7je4c0n2h.defaulted('resetOnDom', false)
  ];

  var me = $_bi2douy2je4c0n0f.create({
    fields: RepresentSchema,
    name: 'representing',
    active: $_fg3jmt11cje4c0nrn,
    apis: $_a1vff311dje4c0nrp,
    extra: {
      setValueFrom: function (component, source) {
        var value = me.getValue(source);
        me.setValue(component, value);
      }
    },
    state: $_1e1z9j11gje4c0ns2
  });

  var isTouch$2 = $_3ye61iwkje4c0msu.detect().deviceType.isTouch();
  var SliderSchema = [
    $_9mxze0y7je4c0n2h.strict('min'),
    $_9mxze0y7je4c0n2h.strict('max'),
    $_9mxze0y7je4c0n2h.defaulted('stepSize', 1),
    $_9mxze0y7je4c0n2h.defaulted('onChange', $_82nexzwjje4c0mss.noop),
    $_9mxze0y7je4c0n2h.defaulted('onInit', $_82nexzwjje4c0mss.noop),
    $_9mxze0y7je4c0n2h.defaulted('onDragStart', $_82nexzwjje4c0mss.noop),
    $_9mxze0y7je4c0n2h.defaulted('onDragEnd', $_82nexzwjje4c0mss.noop),
    $_9mxze0y7je4c0n2h.defaulted('snapToGrid', false),
    $_9mxze0y7je4c0n2h.option('snapStart'),
    $_9mxze0y7je4c0n2h.strict('getInitialValue'),
    $_663n6m10oje4c0nl6.field('sliderBehaviours', [
      Keying,
      me
    ]),
    $_9mxze0y7je4c0n2h.state('value', function (spec) {
      return Cell(spec.min);
    })
  ].concat(!isTouch$2 ? [$_9mxze0y7je4c0n2h.state('mouseIsDown', function () {
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
    $_81jggk103je4c0nf6.set(element, 'max-width', absMax + 'px');
  };
  var $_eze8yo11kje4c0nt6 = {
    set: set$4,
    get: get$6,
    getOuter: getOuter$2,
    setMax: setMax$1
  };

  var isTouch$3 = $_3ye61iwkje4c0msu.detect().deviceType.isTouch();
  var sketch$1 = function (detail, components, spec, externals) {
    var range = detail.max() - detail.min();
    var getXCentre = function (component) {
      var rect = component.element().dom().getBoundingClientRect();
      return (rect.left + rect.right) / 2;
    };
    var getThumb = function (component) {
      return $_3zrx6s10tje4c0nmb.getPartOrDie(component, detail, 'thumb');
    };
    var getXOffset = function (slider, spectrumBounds, detail) {
      var v = detail.value().get();
      if (v < detail.min()) {
        return $_3zrx6s10tje4c0nmb.getPart(slider, detail, 'left-edge').fold(function () {
          return 0;
        }, function (ledge) {
          return getXCentre(ledge) - spectrumBounds.left;
        });
      } else if (v > detail.max()) {
        return $_3zrx6s10tje4c0nmb.getPart(slider, detail, 'right-edge').fold(function () {
          return spectrumBounds.width;
        }, function (redge) {
          return getXCentre(redge) - spectrumBounds.left;
        });
      } else {
        return (detail.value().get() - detail.min()) / range * spectrumBounds.width;
      }
    };
    var getXPos = function (slider) {
      var spectrum = $_3zrx6s10tje4c0nmb.getPartOrDie(slider, detail, 'spectrum');
      var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
      var sliderBounds = slider.element().dom().getBoundingClientRect();
      var xOffset = getXOffset(slider, spectrumBounds, detail);
      return spectrumBounds.left - sliderBounds.left + xOffset;
    };
    var refresh = function (component) {
      var pos = getXPos(component);
      var thumb = getThumb(component);
      var thumbRadius = $_eze8yo11kje4c0nt6.get(thumb.element()) / 2;
      $_81jggk103je4c0nf6.set(thumb.element(), 'left', pos - thumbRadius + 'px');
    };
    var changeValue = function (component, newValue) {
      var oldValue = detail.value().get();
      var thumb = getThumb(component);
      if (oldValue !== newValue || $_81jggk103je4c0nf6.getRaw(thumb.element(), 'left').isNone()) {
        detail.value().set(newValue);
        refresh(component);
        detail.onChange()(component, thumb, newValue);
        return Option.some(true);
      } else {
        return Option.none();
      }
    };
    var resetToMin = function (slider) {
      changeValue(slider, detail.min());
    };
    var resetToMax = function (slider) {
      changeValue(slider, detail.max());
    };
    var uiEventsArr = isTouch$3 ? [
      $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.touchstart(), function (slider, simulatedEvent) {
        detail.onDragStart()(slider, getThumb(slider));
      }),
      $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.touchend(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
      })
    ] : [
      $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.mousedown(), function (slider, simulatedEvent) {
        simulatedEvent.stop();
        detail.onDragStart()(slider, getThumb(slider));
        detail.mouseIsDown().set(true);
      }),
      $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.mouseup(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
        detail.mouseIsDown().set(false);
      })
    ];
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_55zfs1wyje4c0mue.deepMerge($_bi2douy2je4c0n0f.derive($_9880jxwsje4c0mtn.flatten([
        !isTouch$3 ? [Keying.config({
            mode: 'special',
            focusIn: function (slider) {
              return $_3zrx6s10tje4c0nmb.getPart(slider, detail, 'spectrum').map(Keying.focusIn).map($_82nexzwjje4c0mss.constant(true));
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
      ])), $_663n6m10oje4c0nl6.get(detail.sliderBehaviours())),
      events: $_86uglly4je4c0n1n.derive([
        $_86uglly4je4c0n1n.run($_ei81mu118je4c0nqy.changeEvent(), function (slider, simulatedEvent) {
          changeValue(slider, simulatedEvent.event().value());
        }),
        $_86uglly4je4c0n1n.runOnAttached(function (slider, simulatedEvent) {
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
  var $_446hzv11jje4c0nsi = { sketch: sketch$1 };

  var Slider = $_ct2klp10pje4c0nle.composite({
    name: 'Slider',
    configFields: SliderSchema,
    partFields: SliderParts,
    factory: $_446hzv11jje4c0nsi.sketch,
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
    return $_ehma3qzfje4c0nau.forToolbar(clazz, function () {
      var items = makeItems();
      realm.setContextToolbar([{
          label: clazz + ' group',
          items: items
        }]);
    }, {});
  };
  var $_67b6dd11lje4c0nt8 = { button: button };

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
      $_81jggk103je4c0nf6.set(thumb.element(), 'background-color', color);
    };
    var onChange = function (slider, thumb, value) {
      var color = getColor(value);
      $_81jggk103je4c0nf6.set(thumb.element(), 'background-color', color);
      spec.onChange(slider, thumb, color);
    };
    return Slider.sketch({
      dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-slider ${prefix}-hue-slider-container"></div>'),
      components: [
        Slider.parts()['left-edge']($_azzecm113je4c0npn.spec('<div class="${prefix}-hue-slider-black"></div>')),
        Slider.parts().spectrum({
          dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-slider-gradient-container"></div>'),
          components: [$_azzecm113je4c0npn.spec('<div class="${prefix}-slider-gradient"></div>')],
          behaviours: $_bi2douy2je4c0n0f.derive([Toggling.config({ toggleClass: $_chdthezeje4c0nap.resolve('thumb-active') })])
        }),
        Slider.parts()['right-edge']($_azzecm113je4c0npn.spec('<div class="${prefix}-hue-slider-white"></div>')),
        Slider.parts().thumb({
          dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_bi2douy2je4c0n0f.derive([Toggling.config({ toggleClass: $_chdthezeje4c0nap.resolve('thumb-active') })])
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
      sliderBehaviours: $_bi2douy2je4c0n0f.derive([$_9yraw2zdje4c0naj.orientation(Slider.refresh)])
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
    return $_67b6dd11lje4c0nt8.button(realm, 'color', function () {
      return makeItems(spec);
    });
  };
  var $_8l799l115je4c0nqa = {
    makeItems: makeItems,
    sketch: sketch$2
  };

  var schema$7 = $_98oa5zyeje4c0n4p.objOfOnly([
    $_9mxze0y7je4c0n2h.strict('getInitialValue'),
    $_9mxze0y7je4c0n2h.strict('onChange'),
    $_9mxze0y7je4c0n2h.strict('category'),
    $_9mxze0y7je4c0n2h.strict('sizes')
  ]);
  var sketch$3 = function (rawSpec) {
    var spec = $_98oa5zyeje4c0n4p.asRawOrDie('SizeSlider', schema$7, rawSpec);
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
          $_chdthezeje4c0nap.resolve('slider-' + spec.category + '-size-container'),
          $_chdthezeje4c0nap.resolve('slider'),
          $_chdthezeje4c0nap.resolve('slider-size-container')
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
      sliderBehaviours: $_bi2douy2je4c0n0f.derive([$_9yraw2zdje4c0naj.orientation(Slider.refresh)]),
      components: [
        Slider.parts().spectrum({
          dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-slider-size-container"></div>'),
          components: [$_azzecm113je4c0npn.spec('<div class="${prefix}-slider-size-line"></div>')]
        }),
        Slider.parts().thumb({
          dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_bi2douy2je4c0n0f.derive([Toggling.config({ toggleClass: $_chdthezeje4c0nap.resolve('thumb-active') })])
        })
      ]
    });
  };
  var $_4at2k711nje4c0ntc = { sketch: sketch$3 };

  var ancestor$3 = function (scope, transform, isRoot) {
    var element = scope.dom();
    var stop = $_85ige4wzje4c0muf.isFunction(isRoot) ? isRoot : $_82nexzwjje4c0mss.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_gba6fcxfje4c0mwy.fromDom(element);
      var transformed = transform(el);
      if (transformed.isSome())
        return transformed;
      else if (stop(el))
        break;
    }
    return Option.none();
  };
  var closest$3 = function (scope, transform, isRoot) {
    var current = transform(scope);
    return current.orThunk(function () {
      return isRoot(scope) ? Option.none() : ancestor$3(scope, transform, isRoot);
    });
  };
  var $_cecb1o11pje4c0nu8 = {
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
    return Option.from(candidates[index]);
  };
  var sizeToIndex = function (size) {
    return $_9880jxwsje4c0mtn.findIndex(candidates, function (v) {
      return v === size;
    });
  };
  var getRawOrComputed = function (isRoot, rawStart) {
    var optStart = $_2wng6bxkje4c0mxf.isElement(rawStart) ? Option.some(rawStart) : $_a90a93x3je4c0mv1.parent(rawStart);
    return optStart.map(function (start) {
      var inline = $_cecb1o11pje4c0nu8.closest(start, function (elem) {
        return $_81jggk103je4c0nf6.getRaw(elem, 'font-size');
      }, isRoot);
      return inline.getOrThunk(function () {
        return $_81jggk103je4c0nf6.get(start, 'font-size');
      });
    }).getOr('');
  };
  var getSize = function (editor) {
    var node = editor.selection.getStart();
    var elem = $_gba6fcxfje4c0mwy.fromDom(node);
    var root = $_gba6fcxfje4c0mwy.fromDom(editor.getBody());
    var isRoot = function (e) {
      return $_diemerx9je4c0mw0.eq(root, e);
    };
    var elemSize = getRawOrComputed(isRoot, elem);
    return $_9880jxwsje4c0mtn.find(candidates, function (size) {
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
  var $_djkak611oje4c0ntr = {
    candidates: $_82nexzwjje4c0mss.constant(candidates),
    get: get$7,
    apply: apply$1
  };

  var sizes = $_djkak611oje4c0ntr.candidates();
  var makeSlider$1 = function (spec) {
    return $_4at2k711nje4c0ntc.sketch({
      onChange: spec.onChange,
      sizes: sizes,
      category: 'font',
      getInitialValue: spec.getInitialValue
    });
  };
  var makeItems$1 = function (spec) {
    return [
      $_azzecm113je4c0npn.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-small-font ${prefix}-icon"></span>'),
      makeSlider$1(spec),
      $_azzecm113je4c0npn.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-large-font ${prefix}-icon"></span>')
    ];
  };
  var sketch$4 = function (realm, editor) {
    var spec = {
      onChange: function (value) {
        $_djkak611oje4c0ntr.apply(editor, value);
      },
      getInitialValue: function () {
        return $_djkak611oje4c0ntr.get(editor);
      }
    };
    return $_67b6dd11lje4c0nt8.button(realm, 'font-size', function () {
      return makeItems$1(spec);
    });
  };
  var $_3s33v311mje4c0nta = {
    makeItems: makeItems$1,
    sketch: sketch$4
  };

  var record = function (spec) {
    var uid = $_el09ksxsje4c0myu.hasKey(spec, 'uid') ? spec.uid : $_23tun010xje4c0no9.generate('memento');
    var get = function (any) {
      return any.getSystem().getByUid(uid).getOrDie();
    };
    var getOpt = function (any) {
      return any.getSystem().getByUid(uid).fold(Option.none, Option.some);
    };
    var asSpec = function () {
      return $_55zfs1wyje4c0mue.deepMerge(spec, { uid: uid });
    };
    return {
      get: get,
      getOpt: getOpt,
      asSpec: asSpec
    };
  };
  var $_6d7e9k11rje4c0nuv = { record: record };

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
  var $_dl0y0211uje4c0nvt = {
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
  var $_1w8o7411vje4c0nvv = {
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
    var f = $_cl2owoxbje4c0mw9.getOrDie('Blob');
    return new f(parts, properties);
  }

  function FileReader () {
    var f = $_cl2owoxbje4c0mw9.getOrDie('FileReader');
    return new f();
  }

  function Uint8Array (arr) {
    var f = $_cl2owoxbje4c0mw9.getOrDie('Uint8Array');
    return new f(arr);
  }

  var requestAnimationFrame = function (callback) {
    var f = $_cl2owoxbje4c0mw9.getOrDie('requestAnimationFrame');
    f(callback);
  };
  var atob = function (base64) {
    var f = $_cl2owoxbje4c0mw9.getOrDie('atob');
    return f(base64);
  };
  var $_72g120je4c0nw5 = {
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
      return Option.none();
    var mimetype = matches[1];
    var base64 = data[1];
    var sliceSize = 1024;
    var byteCharacters = $_72g120je4c0nw5.atob(base64);
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
    return Option.some(Blob(byteArrays, { type: mimetype }));
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
      canvas = $_dl0y0211uje4c0nvt.create($_1w8o7411vje4c0nvv.getWidth(image), $_1w8o7411vje4c0nvv.getHeight(image));
      context = $_dl0y0211uje4c0nvt.get2dContext(canvas);
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
  function blobToArrayBuffer(blob) {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(blob);
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
  var $_5vjy8a11tje4c0nv9 = {
    blobToImage: blobToImage,
    imageToBlob: imageToBlob,
    blobToArrayBuffer: blobToArrayBuffer,
    blobToDataUri: blobToDataUri,
    blobToBase64: blobToBase64,
    dataUriToBlobSync: dataUriToBlobSync,
    canvasToBlob: canvasToBlob,
    canvasToDataURL: canvasToDataURL,
    blobToCanvas: blobToCanvas,
    uriToBlob: uriToBlob
  };

  var blobToImage$1 = function (image) {
    return $_5vjy8a11tje4c0nv9.blobToImage(image);
  };
  var imageToBlob$1 = function (blob) {
    return $_5vjy8a11tje4c0nv9.imageToBlob(blob);
  };
  var blobToDataUri$1 = function (blob) {
    return $_5vjy8a11tje4c0nv9.blobToDataUri(blob);
  };
  var blobToBase64$1 = function (blob) {
    return $_5vjy8a11tje4c0nv9.blobToBase64(blob);
  };
  var dataUriToBlobSync$1 = function (uri) {
    return $_5vjy8a11tje4c0nv9.dataUriToBlobSync(uri);
  };
  var uriToBlob$1 = function (uri) {
    return Option.from($_5vjy8a11tje4c0nv9.uriToBlob(uri));
  };
  var $_546my211sje4c0nv3 = {
    blobToImage: blobToImage$1,
    imageToBlob: imageToBlob$1,
    blobToDataUri: blobToDataUri$1,
    blobToBase64: blobToBase64$1,
    dataUriToBlobSync: dataUriToBlobSync$1,
    uriToBlob: uriToBlob$1
  };

  var addImage = function (editor, blob) {
    $_546my211sje4c0nv3.blobToBase64(blob).then(function (base64) {
      editor.undoManager.transact(function () {
        var cache = editor.editorUpload.blobCache;
        var info = cache.create($_e3nt9m10rje4c0nm2.generate('mceu'), blob, base64);
        cache.add(info);
        var img = editor.dom.createHTML('img', { src: info.blobUri() });
        editor.insertContent(img);
      });
    });
  };
  var extractBlob = function (simulatedEvent) {
    var event = simulatedEvent.event();
    var files = event.raw().target.files || event.raw().dataTransfer.files;
    return Option.from(files[0]);
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
    var memPicker = $_6d7e9k11rje4c0nuv.record({
      dom: pickerDom,
      events: $_86uglly4je4c0n1n.derive([
        $_86uglly4je4c0n1n.cutter($_2j5gqiwije4c0msm.click()),
        $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.change(), function (picker, simulatedEvent) {
          extractBlob(simulatedEvent).each(function (blob) {
            addImage(editor, blob);
          });
        })
      ])
    });
    return Button.sketch({
      dom: $_azzecm113je4c0npn.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-image ${prefix}-icon"></span>'),
      components: [memPicker.asSpec()],
      action: function (button) {
        var picker = memPicker.get(button);
        picker.element().dom().click();
      }
    });
  };
  var $_8755o711qje4c0nuj = { sketch: sketch$5 };

  var get$8 = function (element) {
    return element.dom().textContent;
  };
  var set$5 = function (element, value) {
    element.dom().textContent = value;
  };
  var $_70yu0f123je4c0nx2 = {
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
      link: Option.none()
    };
  };
  var fromLink = function (link) {
    var text = $_70yu0f123je4c0nx2.get(link);
    var url = $_f4kg3zxrje4c0myl.get(link, 'href');
    var title = $_f4kg3zxrje4c0myl.get(link, 'title');
    var target = $_f4kg3zxrje4c0myl.get(link, 'target');
    return {
      url: defaultToEmpty(url),
      text: text !== url ? defaultToEmpty(text) : '',
      title: defaultToEmpty(title),
      target: defaultToEmpty(target),
      link: Option.some(link)
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
    var prevHref = $_f4kg3zxrje4c0myl.get(link, 'href');
    var prevText = $_70yu0f123je4c0nx2.get(link);
    return prevHref === prevText;
  };
  var getTextToApply = function (link, url, info) {
    return info.text.filter(isNotEmpty).fold(function () {
      return wasSimple(link) ? Option.some(url) : Option.none();
    }, Option.some);
  };
  var unlinkIfRequired = function (editor, info) {
    var activeLink = info.link.bind($_82nexzwjje4c0mss.identity);
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
      var activeLink = info.link.bind($_82nexzwjje4c0mss.identity);
      activeLink.fold(function () {
        var text = info.text.filter(isNotEmpty).getOr(url);
        editor.insertContent(editor.dom.createHTML('a', attrs, editor.dom.encode(text)));
      }, function (link) {
        var text = getTextToApply(link, url, info);
        $_f4kg3zxrje4c0myl.setAll(link, attrs);
        text.each(function (newText) {
          $_70yu0f123je4c0nx2.set(link, newText);
        });
      });
    });
  };
  var query = function (editor) {
    var start = $_gba6fcxfje4c0mwy.fromDom(editor.selection.getStart());
    return $_bntfp0zxje4c0ne8.closest(start, 'a');
  };
  var $_23jykw122je4c0nwh = {
    getInfo: getInfo,
    applyInfo: applyInfo,
    query: query
  };

  var platform$1 = $_3ye61iwkje4c0msu.detect();
  var preserve$1 = function (f, editor) {
    var rng = editor.selection.getRng();
    f();
    editor.selection.setRng(rng);
  };
  var forAndroid = function (editor, f) {
    var wrapper = platform$1.os.isAndroid() ? preserve$1 : $_82nexzwjje4c0mss.apply;
    wrapper(f, editor);
  };
  var $_bkqdmt124je4c0nx4 = { forAndroid: forAndroid };

  var events$6 = function (name, eventHandlers) {
    var events = $_86uglly4je4c0n1n.derive(eventHandlers);
    return $_bi2douy2je4c0n0f.create({
      fields: [$_9mxze0y7je4c0n2h.strict('enabled')],
      name: name,
      active: { events: $_82nexzwjje4c0mss.constant(events) }
    });
  };
  var config = function (name, eventHandlers) {
    var me = events$6(name, eventHandlers);
    return {
      key: name,
      value: {
        config: {},
        me: me,
        configAsRaw: $_82nexzwjje4c0mss.constant({}),
        initialConfig: {},
        state: $_bi2douy2je4c0n0f.noState()
      }
    };
  };
  var $_d6mgrm126je4c0nxv = {
    events: events$6,
    config: config
  };

  var getCurrent = function (component, composeConfig, composeState) {
    return composeConfig.find()(component);
  };
  var $_136lc2128je4c0ny6 = { getCurrent: getCurrent };

  var ComposeSchema = [$_9mxze0y7je4c0n2h.strict('find')];

  var Composing = $_bi2douy2je4c0n0f.create({
    fields: ComposeSchema,
    name: 'composing',
    apis: $_136lc2128je4c0ny6
  });

  var factory$1 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_55zfs1wyje4c0mue.deepMerge({
        tag: 'div',
        attributes: { role: 'presentation' }
      }, detail.dom()),
      components: detail.components(),
      behaviours: $_663n6m10oje4c0nl6.get(detail.containerBehaviours()),
      events: detail.events(),
      domModification: detail.domModification(),
      eventOrder: detail.eventOrder()
    };
  };
  var Container = $_ct2klp10pje4c0nle.single({
    name: 'Container',
    factory: factory$1,
    configFields: [
      $_9mxze0y7je4c0n2h.defaulted('components', []),
      $_663n6m10oje4c0nl6.field('containerBehaviours', []),
      $_9mxze0y7je4c0n2h.defaulted('events', {}),
      $_9mxze0y7je4c0n2h.defaulted('domModification', {}),
      $_9mxze0y7je4c0n2h.defaulted('eventOrder', {})
    ]
  });

  var factory$2 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      behaviours: $_55zfs1wyje4c0mue.deepMerge($_bi2douy2je4c0n0f.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: detail.getInitialValue()()
          }
        }),
        Composing.config({ find: Option.some })
      ]), $_663n6m10oje4c0nl6.get(detail.dataBehaviours())),
      events: $_86uglly4je4c0n1n.derive([$_86uglly4je4c0n1n.runOnAttached(function (component, simulatedEvent) {
          me.setValue(component, detail.getInitialValue()());
        })])
    };
  };
  var DataField = $_ct2klp10pje4c0nle.single({
    name: 'DataField',
    factory: factory$2,
    configFields: [
      $_9mxze0y7je4c0n2h.strict('uid'),
      $_9mxze0y7je4c0n2h.strict('dom'),
      $_9mxze0y7je4c0n2h.strict('getInitialValue'),
      $_663n6m10oje4c0nl6.field('dataBehaviours', [
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
  var $_an41ue12eje4c0nzb = {
    set: set$6,
    get: get$9
  };

  var schema$8 = [
    $_9mxze0y7je4c0n2h.option('data'),
    $_9mxze0y7je4c0n2h.defaulted('inputAttributes', {}),
    $_9mxze0y7je4c0n2h.defaulted('inputStyles', {}),
    $_9mxze0y7je4c0n2h.defaulted('type', 'input'),
    $_9mxze0y7je4c0n2h.defaulted('tag', 'input'),
    $_9mxze0y7je4c0n2h.defaulted('inputClasses', []),
    $_7lk9gdz6je4c0n8n.onHandler('onSetValue'),
    $_9mxze0y7je4c0n2h.defaulted('styles', {}),
    $_9mxze0y7je4c0n2h.option('placeholder'),
    $_9mxze0y7je4c0n2h.defaulted('eventOrder', {}),
    $_663n6m10oje4c0nl6.field('inputBehaviours', [
      me,
      Focusing
    ]),
    $_9mxze0y7je4c0n2h.defaulted('selectOnFocus', true)
  ];
  var behaviours = function (detail) {
    return $_55zfs1wyje4c0mue.deepMerge($_bi2douy2je4c0n0f.derive([
      me.config({
        store: {
          mode: 'manual',
          initialValue: detail.data().getOr(undefined),
          getValue: function (input) {
            return $_an41ue12eje4c0nzb.get(input.element());
          },
          setValue: function (input, data) {
            var current = $_an41ue12eje4c0nzb.get(input.element());
            if (current !== data) {
              $_an41ue12eje4c0nzb.set(input.element(), data);
            }
          }
        },
        onSetValue: detail.onSetValue()
      }),
      Focusing.config({
        onFocus: detail.selectOnFocus() === false ? $_82nexzwjje4c0mss.noop : function (component) {
          var input = component.element();
          var value = $_an41ue12eje4c0nzb.get(input);
          input.dom().setSelectionRange(0, value.length);
        }
      })
    ]), $_663n6m10oje4c0nl6.get(detail.inputBehaviours()));
  };
  var dom$2 = function (detail) {
    return {
      tag: detail.tag(),
      attributes: $_55zfs1wyje4c0mue.deepMerge($_el09ksxsje4c0myu.wrapAll([{
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
  var $_1sjw0e12dje4c0nyx = {
    schema: $_82nexzwjje4c0mss.constant(schema$8),
    behaviours: behaviours,
    dom: dom$2
  };

  var factory$3 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_1sjw0e12dje4c0nyx.dom(detail),
      components: [],
      behaviours: $_1sjw0e12dje4c0nyx.behaviours(detail),
      eventOrder: detail.eventOrder()
    };
  };
  var Input = $_ct2klp10pje4c0nle.single({
    name: 'Input',
    configFields: $_1sjw0e12dje4c0nyx.schema(),
    factory: factory$3
  });

  var exhibit$3 = function (base, tabConfig) {
    return $_g96sqfyhje4c0n57.nu({
      attributes: $_el09ksxsje4c0myu.wrapAll([{
          key: tabConfig.tabAttr(),
          value: 'true'
        }])
    });
  };
  var $_7vqerj12gje4c0nze = { exhibit: exhibit$3 };

  var TabstopSchema = [$_9mxze0y7je4c0n2h.defaulted('tabAttr', 'data-alloy-tabstop')];

  var Tabstopping = $_bi2douy2je4c0n0f.create({
    fields: TabstopSchema,
    name: 'tabstopping',
    active: $_7vqerj12gje4c0nze
  });

  var clearInputBehaviour = 'input-clearing';
  var field$2 = function (name, placeholder) {
    var inputSpec = $_6d7e9k11rje4c0nuv.record(Input.sketch({
      placeholder: placeholder,
      onSetValue: function (input, data) {
        $_dxxx79wgje4c0ms3.emit(input, $_2j5gqiwije4c0msm.input());
      },
      inputBehaviours: $_bi2douy2je4c0n0f.derive([
        Composing.config({ find: Option.some }),
        Tabstopping.config({}),
        Keying.config({ mode: 'execution' })
      ]),
      selectOnFocus: false
    }));
    var buttonSpec = $_6d7e9k11rje4c0nuv.record(Button.sketch({
      dom: $_azzecm113je4c0npn.dom('<button class="${prefix}-input-container-x ${prefix}-icon-cancel-circle ${prefix}-icon"></button>'),
      action: function (button) {
        var input = inputSpec.get(button);
        me.setValue(input, '');
      }
    }));
    return {
      name: name,
      spec: Container.sketch({
        dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-input-container"></div>'),
        components: [
          inputSpec.asSpec(),
          buttonSpec.asSpec()
        ],
        containerBehaviours: $_bi2douy2je4c0n0f.derive([
          Toggling.config({ toggleClass: $_chdthezeje4c0nap.resolve('input-container-empty') }),
          Composing.config({
            find: function (comp) {
              return Option.some(inputSpec.get(comp));
            }
          }),
          $_d6mgrm126je4c0nxv.config(clearInputBehaviour, [$_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.input(), function (iContainer) {
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
          return Option.none();
        }
      })
    };
  };
  var $_ev0h0y125je4c0nx9 = {
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
    return $_9880jxwsje4c0mtn.contains(nativeDisabled, $_2wng6bxkje4c0mxf.name(component.element()));
  };
  var nativeIsDisabled = function (component) {
    return $_f4kg3zxrje4c0myl.has(component.element(), 'disabled');
  };
  var nativeDisable = function (component) {
    $_f4kg3zxrje4c0myl.set(component.element(), 'disabled', 'disabled');
  };
  var nativeEnable = function (component) {
    $_f4kg3zxrje4c0myl.remove(component.element(), 'disabled');
  };
  var ariaIsDisabled = function (component) {
    return $_f4kg3zxrje4c0myl.get(component.element(), 'aria-disabled') === 'true';
  };
  var ariaDisable = function (component) {
    $_f4kg3zxrje4c0myl.set(component.element(), 'aria-disabled', 'true');
  };
  var ariaEnable = function (component) {
    $_f4kg3zxrje4c0myl.set(component.element(), 'aria-disabled', 'false');
  };
  var disable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_7xiz2yynje4c0n63.add(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeDisable : ariaDisable;
    f(component);
  };
  var enable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_7xiz2yynje4c0n63.remove(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeEnable : ariaEnable;
    f(component);
  };
  var isDisabled = function (component) {
    return hasNative(component) ? nativeIsDisabled(component) : ariaIsDisabled(component);
  };
  var $_5igap712lje4c0o1e = {
    enable: enable,
    disable: disable,
    isDisabled: isDisabled,
    onLoad: onLoad$5
  };

  var exhibit$4 = function (base, disableConfig, disableState) {
    return $_g96sqfyhje4c0n57.nu({ classes: disableConfig.disabled() ? disableConfig.disableClass().map($_9880jxwsje4c0mtn.pure).getOr([]) : [] });
  };
  var events$7 = function (disableConfig, disableState) {
    return $_86uglly4je4c0n1n.derive([
      $_86uglly4je4c0n1n.abort($_270al8whje4c0msc.execute(), function (component, simulatedEvent) {
        return $_5igap712lje4c0o1e.isDisabled(component, disableConfig, disableState);
      }),
      $_3tqi4py3je4c0n0s.loadEvent(disableConfig, disableState, $_5igap712lje4c0o1e.onLoad)
    ]);
  };
  var $_c6x3fn12kje4c0o18 = {
    exhibit: exhibit$4,
    events: events$7
  };

  var DisableSchema = [
    $_9mxze0y7je4c0n2h.defaulted('disabled', false),
    $_9mxze0y7je4c0n2h.option('disableClass')
  ];

  var Disabling = $_bi2douy2je4c0n0f.create({
    fields: DisableSchema,
    name: 'disabling',
    active: $_c6x3fn12kje4c0o18,
    apis: $_5igap712lje4c0o1e
  });

  var owner$1 = 'form';
  var schema$9 = [$_663n6m10oje4c0nl6.field('formBehaviours', [me])];
  var getPartName = function (name) {
    return '<alloy.field.' + name + '>';
  };
  var sketch$6 = function (fSpec) {
    var parts = function () {
      var record = [];
      var field = function (name, config) {
        record.push(name);
        return $_3zrx6s10tje4c0nmb.generateOne(owner$1, getPartName(name), config);
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
    var fieldParts = $_9880jxwsje4c0mtn.map(partNames, function (n) {
      return $_9i1x5a10vje4c0nn9.required({
        name: n,
        pname: getPartName(n)
      });
    });
    return $_4wj6bo10sje4c0nm4.composite(owner$1, schema$9, fieldParts, make, spec);
  };
  var make = function (detail, components, spec) {
    return $_55zfs1wyje4c0mue.deepMerge({
      'debug.sketcher': { 'Form': spec },
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_55zfs1wyje4c0mue.deepMerge($_bi2douy2je4c0n0f.derive([me.config({
          store: {
            mode: 'manual',
            getValue: function (form) {
              var optPs = $_3zrx6s10tje4c0nmb.getAllParts(form, detail);
              return $_czbu3jx0je4c0muh.map(optPs, function (optPThunk, pName) {
                return optPThunk().bind(Composing.getCurrent).map(me.getValue);
              });
            },
            setValue: function (form, values) {
              $_czbu3jx0je4c0muh.each(values, function (newValue, key) {
                $_3zrx6s10tje4c0nmb.getPart(form, detail, key).each(function (wrapper) {
                  Composing.getCurrent(wrapper).each(function (field) {
                    me.setValue(field, newValue);
                  });
                });
              });
            }
          }
        })]), $_663n6m10oje4c0nl6.get(detail.formBehaviours())),
      apis: {
        getField: function (form, key) {
          return $_3zrx6s10tje4c0nmb.getPart(form, detail, key).bind(Composing.getCurrent);
        }
      }
    });
  };
  var $_ddft4t12nje4c0o1s = {
    getField: $_2n986r10qje4c0nls.makeApi(function (apis, component, key) {
      return apis.getField(component, key);
    }),
    sketch: sketch$6
  };

  var revocable = function (doRevoke) {
    var subject = Cell(Option.none());
    var revoke = function () {
      subject.get().each(doRevoke);
    };
    var clear = function () {
      revoke();
      subject.set(Option.none());
    };
    var set = function (s) {
      revoke();
      subject.set(Option.some(s));
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
    var subject = Cell(Option.none());
    var revoke = function () {
      subject.get().each(function (s) {
        s.destroy();
      });
    };
    var clear = function () {
      revoke();
      subject.set(Option.none());
    };
    var set = function (s) {
      revoke();
      subject.set(Option.some(s));
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
    var subject = Cell(Option.none());
    var clear = function () {
      subject.set(Option.none());
    };
    var set = function (s) {
      subject.set(Option.some(s));
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
  var $_6vqdu212oje4c0o1z = {
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
  var $_f0yxyo12pje4c0o23 = {
    init: init$3,
    move: move,
    complete: complete
  };

  var sketch$7 = function (rawSpec) {
    var navigateEvent = 'navigateEvent';
    var wrapperAdhocEvents = 'serializer-wrapper-events';
    var formAdhocEvents = 'form-events';
    var schema = $_98oa5zyeje4c0n4p.objOf([
      $_9mxze0y7je4c0n2h.strict('fields'),
      $_9mxze0y7je4c0n2h.defaulted('maxFieldIndex', rawSpec.fields.length - 1),
      $_9mxze0y7je4c0n2h.strict('onExecute'),
      $_9mxze0y7je4c0n2h.strict('getInitialValue'),
      $_9mxze0y7je4c0n2h.state('state', function () {
        return {
          dialogSwipeState: $_6vqdu212oje4c0o1z.value(),
          currentScreen: Cell(0)
        };
      })
    ]);
    var spec = $_98oa5zyeje4c0n4p.asRawOrDie('SerialisedDialog', schema, rawSpec);
    var navigationButton = function (direction, directionName, enabled) {
      return Button.sketch({
        dom: $_azzecm113je4c0npn.dom('<span class="${prefix}-icon-' + directionName + ' ${prefix}-icon"></span>'),
        action: function (button) {
          $_dxxx79wgje4c0ms3.emitWith(button, navigateEvent, { direction: direction });
        },
        buttonBehaviours: $_bi2douy2je4c0n0f.derive([Disabling.config({
            disableClass: $_chdthezeje4c0nap.resolve('toolbar-navigation-disabled'),
            disabled: !enabled
          })])
      });
    };
    var reposition = function (dialog, message) {
      $_bntfp0zxje4c0ne8.descendant(dialog.element(), '.' + $_chdthezeje4c0nap.resolve('serialised-dialog-chain')).each(function (parent) {
        $_81jggk103je4c0nf6.set(parent, 'left', -spec.state.currentScreen.get() * message.width + 'px');
      });
    };
    var navigate = function (dialog, direction) {
      var screens = $_43odwmzvje4c0ne4.descendants(dialog.element(), '.' + $_chdthezeje4c0nap.resolve('serialised-dialog-screen'));
      $_bntfp0zxje4c0ne8.descendant(dialog.element(), '.' + $_chdthezeje4c0nap.resolve('serialised-dialog-chain')).each(function (parent) {
        if (spec.state.currentScreen.get() + direction >= 0 && spec.state.currentScreen.get() + direction < screens.length) {
          $_81jggk103je4c0nf6.getRaw(parent, 'left').each(function (left) {
            var currentLeft = parseInt(left, 10);
            var w = $_eze8yo11kje4c0nt6.get(screens[0]);
            $_81jggk103je4c0nf6.set(parent, 'left', currentLeft - direction * w + 'px');
          });
          spec.state.currentScreen.set(spec.state.currentScreen.get() + direction);
        }
      });
    };
    var focusInput = function (dialog) {
      var inputs = $_43odwmzvje4c0ne4.descendants(dialog.element(), 'input');
      var optInput = Option.from(inputs[spec.state.currentScreen.get()]);
      optInput.each(function (input) {
        dialog.getSystem().getByDom(input).each(function (inputComp) {
          $_dxxx79wgje4c0ms3.dispatchFocus(dialog, inputComp.element());
        });
      });
      var dotitems = memDots.get(dialog);
      Highlighting.highlightAt(dotitems, spec.state.currentScreen.get());
    };
    var resetState = function () {
      spec.state.currentScreen.set(0);
      spec.state.dialogSwipeState.clear();
    };
    var memForm = $_6d7e9k11rje4c0nuv.record($_ddft4t12nje4c0o1s.sketch(function (parts) {
      return {
        dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-serialised-dialog"></div>'),
        components: [Container.sketch({
            dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-serialised-dialog-chain" style="left: 0px; position: absolute;"></div>'),
            components: $_9880jxwsje4c0mtn.map(spec.fields, function (field, i) {
              return i <= spec.maxFieldIndex ? Container.sketch({
                dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-serialised-dialog-screen"></div>'),
                components: $_9880jxwsje4c0mtn.flatten([
                  [navigationButton(-1, 'previous', i > 0)],
                  [parts.field(field.name, field.spec)],
                  [navigationButton(+1, 'next', i < spec.maxFieldIndex)]
                ])
              }) : parts.field(field.name, field.spec);
            })
          })],
        formBehaviours: $_bi2douy2je4c0n0f.derive([
          $_9yraw2zdje4c0naj.orientation(function (dialog, message) {
            reposition(dialog, message);
          }),
          Keying.config({
            mode: 'special',
            focusIn: function (dialog) {
              focusInput(dialog);
            },
            onTab: function (dialog) {
              navigate(dialog, +1);
              return Option.some(true);
            },
            onShiftTab: function (dialog) {
              navigate(dialog, -1);
              return Option.some(true);
            }
          }),
          $_d6mgrm126je4c0nxv.config(formAdhocEvents, [
            $_86uglly4je4c0n1n.runOnAttached(function (dialog, simulatedEvent) {
              resetState();
              var dotitems = memDots.get(dialog);
              Highlighting.highlightFirst(dotitems);
              spec.getInitialValue(dialog).each(function (v) {
                me.setValue(dialog, v);
              });
            }),
            $_86uglly4je4c0n1n.runOnExecute(spec.onExecute),
            $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.transitionend(), function (dialog, simulatedEvent) {
              if (simulatedEvent.event().raw().propertyName === 'left') {
                focusInput(dialog);
              }
            }),
            $_86uglly4je4c0n1n.run(navigateEvent, function (dialog, simulatedEvent) {
              var direction = simulatedEvent.event().direction();
              navigate(dialog, direction);
            })
          ])
        ])
      };
    }));
    var memDots = $_6d7e9k11rje4c0nuv.record({
      dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-dot-container"></div>'),
      behaviours: $_bi2douy2je4c0n0f.derive([Highlighting.config({
          highlightClass: $_chdthezeje4c0nap.resolve('dot-active'),
          itemClass: $_chdthezeje4c0nap.resolve('dot-item')
        })]),
      components: $_9880jxwsje4c0mtn.bind(spec.fields, function (_f, i) {
        return i <= spec.maxFieldIndex ? [$_azzecm113je4c0npn.spec('<div class="${prefix}-dot-item ${prefix}-icon-full-dot ${prefix}-icon"></div>')] : [];
      })
    });
    return {
      dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-serializer-wrapper"></div>'),
      components: [
        memForm.asSpec(),
        memDots.asSpec()
      ],
      behaviours: $_bi2douy2je4c0n0f.derive([
        Keying.config({
          mode: 'special',
          focusIn: function (wrapper) {
            var form = memForm.get(wrapper);
            Keying.focusIn(form);
          }
        }),
        $_d6mgrm126je4c0nxv.config(wrapperAdhocEvents, [
          $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.touchstart(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.set($_f0yxyo12pje4c0o23.init(simulatedEvent.event().raw().touches[0].clientX));
          }),
          $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.touchmove(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.on(function (state) {
              simulatedEvent.event().prevent();
              spec.state.dialogSwipeState.set($_f0yxyo12pje4c0o23.move(state, simulatedEvent.event().raw().touches[0].clientX));
            });
          }),
          $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.touchend(), function (wrapper) {
            spec.state.dialogSwipeState.on(function (state) {
              var dialog = memForm.get(wrapper);
              var direction = -1 * $_f0yxyo12pje4c0o23.complete(state);
              navigate(dialog, direction);
            });
          })
        ])
      ])
    };
  };
  var $_dsava912ije4c0nzo = { sketch: sketch$7 };

  var getGroups = $_nse44wlje4c0msw.cached(function (realm, editor) {
    return [{
        label: 'the link group',
        items: [$_dsava912ije4c0nzo.sketch({
            fields: [
              $_ev0h0y125je4c0nx9.field('url', 'Type or paste URL'),
              $_ev0h0y125je4c0nx9.field('text', 'Link text'),
              $_ev0h0y125je4c0nx9.field('title', 'Link title'),
              $_ev0h0y125je4c0nx9.field('target', 'Link target'),
              $_ev0h0y125je4c0nx9.hidden('link')
            ],
            maxFieldIndex: [
              'url',
              'text',
              'title',
              'target'
            ].length - 1,
            getInitialValue: function () {
              return Option.some($_23jykw122je4c0nwh.getInfo(editor));
            },
            onExecute: function (dialog) {
              var info = me.getValue(dialog);
              $_23jykw122je4c0nwh.applyInfo(editor, info);
              realm.restoreToolbar();
              editor.focus();
            }
          })]
      }];
  });
  var sketch$8 = function (realm, editor) {
    return $_ehma3qzfje4c0nau.forToolbarStateAction(editor, 'link', 'link', function () {
      var groups = getGroups(realm, editor);
      realm.setContextToolbar(groups);
      $_bkqdmt124je4c0nx4.forAndroid(editor, function () {
        realm.focusToolbar();
      });
      $_23jykw122je4c0nwh.query(editor).each(function (link) {
        editor.selection.select(link.dom());
      });
    });
  };
  var $_3in8ri121je4c0nw7 = { sketch: sketch$8 };

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

  var generateFrom = function (spec, all) {
    var schema = $_9880jxwsje4c0mtn.map(all, function (a) {
      return $_9mxze0y7je4c0n2h.field(a.name(), a.name(), $_df8fqwy8je4c0n2s.asOption(), $_98oa5zyeje4c0n4p.objOf([
        $_9mxze0y7je4c0n2h.strict('config'),
        $_9mxze0y7je4c0n2h.defaulted('state', $_4k95zoyjje4c0n5t)
      ]));
    });
    var validated = $_98oa5zyeje4c0n4p.asStruct('component.behaviours', $_98oa5zyeje4c0n4p.objOf(schema), spec.behaviours).fold(function (errInfo) {
      throw new Error($_98oa5zyeje4c0n4p.formatError(errInfo) + '\nComplete spec:\n' + $_5mhtz1ydje4c0n4m.stringify(spec, null, 2));
    }, $_82nexzwjje4c0mss.identity);
    return {
      list: all,
      data: $_czbu3jx0je4c0muh.map(validated, function (blobOptionThunk) {
        var blobOption = blobOptionThunk();
        return $_82nexzwjje4c0mss.constant(blobOption.map(function (blob) {
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
  var $_4vxm5z12wje4c0o5z = {
    generateFrom: generateFrom,
    getBehaviours: getBehaviours,
    getData: getData
  };

  var getBehaviours$1 = function (spec) {
    var behaviours = $_el09ksxsje4c0myu.readOptFrom(spec, 'behaviours').getOr({});
    var keys = $_9880jxwsje4c0mtn.filter($_czbu3jx0je4c0muh.keys(behaviours), function (k) {
      return behaviours[k] !== undefined;
    });
    return $_9880jxwsje4c0mtn.map(keys, function (k) {
      return spec.behaviours[k].me;
    });
  };
  var generateFrom$1 = function (spec, all) {
    return $_4vxm5z12wje4c0o5z.generateFrom(spec, all);
  };
  var generate$4 = function (spec) {
    var all = getBehaviours$1(spec);
    return generateFrom$1(spec, all);
  };
  var $_81bqct12vje4c0o5q = {
    generate: generate$4,
    generateFrom: generateFrom$1
  };

  var ComponentApi = $_cc3dhyylje4c0n5w.exactly([
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

  var SystemApi = $_cc3dhyylje4c0n5w.exactly([
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
        throw new Error('The component must be in a context to send: ' + event + '\n' + $_63gwexxmje4c0mxw.element(getComp().element()) + ' is not in context.');
      };
    };
    return SystemApi({
      debugInfo: $_82nexzwjje4c0mss.constant('fake'),
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
    $_czbu3jx0je4c0muh.each(data, function (detail, key) {
      $_czbu3jx0je4c0muh.each(detail, function (value, indexKey) {
        var chain = $_el09ksxsje4c0myu.readOr(indexKey, [])(r);
        r[indexKey] = chain.concat([tuple(key, value)]);
      });
    });
    return r;
  };
  var $_67gbc131je4c0o7b = { byInnerKey: byInnerKey };

  var behaviourDom = function (name, modification) {
    return {
      name: $_82nexzwjje4c0mss.constant(name),
      modification: modification
    };
  };
  var concat = function (chain, aspect) {
    var values = $_9880jxwsje4c0mtn.bind(chain, function (c) {
      return c.modification().getOr([]);
    });
    return Result.value($_el09ksxsje4c0myu.wrap(aspect, values));
  };
  var onlyOne = function (chain, aspect, order) {
    if (chain.length > 1)
      return Result.error('Multiple behaviours have tried to change DOM "' + aspect + '". The guilty behaviours are: ' + $_5mhtz1ydje4c0n4m.stringify($_9880jxwsje4c0mtn.map(chain, function (b) {
        return b.name();
      })) + '. At this stage, this ' + 'is not supported. Future releases might provide strategies for resolving this.');
    else if (chain.length === 0)
      return Result.value({});
    else
      return Result.value(chain[0].modification().fold(function () {
        return {};
      }, function (m) {
        return $_el09ksxsje4c0myu.wrap(aspect, m);
      }));
  };
  var duplicate = function (aspect, k, obj, behaviours) {
    return Result.error('Mulitple behaviours have tried to change the _' + k + '_ "' + aspect + '"' + '. The guilty behaviours are: ' + $_5mhtz1ydje4c0n4m.stringify($_9880jxwsje4c0mtn.bind(behaviours, function (b) {
      return b.modification().getOr({})[k] !== undefined ? [b.name()] : [];
    }), null, 2) + '. This is not currently supported.');
  };
  var safeMerge = function (chain, aspect) {
    var y = $_9880jxwsje4c0mtn.foldl(chain, function (acc, c) {
      var obj = c.modification().getOr({});
      return acc.bind(function (accRest) {
        var parts = $_czbu3jx0je4c0muh.mapToArray(obj, function (v, k) {
          return accRest[k] !== undefined ? duplicate(aspect, k, obj, chain) : Result.value($_el09ksxsje4c0myu.wrap(k, v));
        });
        return $_el09ksxsje4c0myu.consolidate(parts, accRest);
      });
    }, Result.value({}));
    return y.map(function (yValue) {
      return $_el09ksxsje4c0myu.wrap(aspect, yValue);
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
    var behaviourDoms = $_55zfs1wyje4c0mue.deepMerge({}, baseMod);
    $_9880jxwsje4c0mtn.each(behaviours, function (behaviour) {
      behaviourDoms[behaviour.name()] = behaviour.exhibit(info, base);
    });
    var byAspect = $_67gbc131je4c0o7b.byInnerKey(behaviourDoms, behaviourDom);
    var usedAspect = $_czbu3jx0je4c0muh.map(byAspect, function (values, aspect) {
      return $_9880jxwsje4c0mtn.bind(values, function (value) {
        return value.modification().fold(function () {
          return [];
        }, function (v) {
          return [value];
        });
      });
    });
    var modifications = $_czbu3jx0je4c0muh.mapToArray(usedAspect, function (values, aspect) {
      return $_el09ksxsje4c0myu.readOptFrom(mergeTypes, aspect).fold(function () {
        return Result.error('Unknown field type: ' + aspect);
      }, function (merger) {
        return merger(values, aspect);
      });
    });
    var consolidated = $_el09ksxsje4c0myu.consolidate(modifications, {});
    return consolidated.map($_g96sqfyhje4c0n57.nu);
  };
  var $_egqtxb130je4c0o6x = { combine: combine$1 };

  var sortKeys = function (label, keyName, array, order) {
    var sliced = array.slice(0);
    try {
      var sorted = sliced.sort(function (a, b) {
        var aKey = a[keyName]();
        var bKey = b[keyName]();
        var aIndex = order.indexOf(aKey);
        var bIndex = order.indexOf(bKey);
        if (aIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + aKey + '.\nOrder specified: ' + $_5mhtz1ydje4c0n4m.stringify(order, null, 2));
        if (bIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + bKey + '.\nOrder specified: ' + $_5mhtz1ydje4c0n4m.stringify(order, null, 2));
        if (aIndex < bIndex)
          return -1;
        else if (bIndex < aIndex)
          return 1;
        else
          return 0;
      });
      return Result.value(sorted);
    } catch (err) {
      return Result.error([err]);
    }
  };
  var $_58dk6b133je4c0o8d = { sortKeys: sortKeys };

  var nu$7 = function (handler, purpose) {
    return {
      handler: handler,
      purpose: $_82nexzwjje4c0mss.constant(purpose)
    };
  };
  var curryArgs = function (descHandler, extraArgs) {
    return {
      handler: $_82nexzwjje4c0mss.curry.apply(undefined, [descHandler.handler].concat(extraArgs)),
      purpose: descHandler.purpose
    };
  };
  var getHandler = function (descHandler) {
    return descHandler.handler;
  };
  var $_6xgglo134je4c0o8k = {
    nu: nu$7,
    curryArgs: curryArgs,
    getHandler: getHandler
  };

  var behaviourTuple = function (name, handler) {
    return {
      name: $_82nexzwjje4c0mss.constant(name),
      handler: $_82nexzwjje4c0mss.constant(handler)
    };
  };
  var nameToHandlers = function (behaviours, info) {
    var r = {};
    $_9880jxwsje4c0mtn.each(behaviours, function (behaviour) {
      r[behaviour.name()] = behaviour.handlers(info);
    });
    return r;
  };
  var groupByEvents = function (info, behaviours, base) {
    var behaviourEvents = $_55zfs1wyje4c0mue.deepMerge(base, nameToHandlers(behaviours, info));
    return $_67gbc131je4c0o7b.byInnerKey(behaviourEvents, behaviourTuple);
  };
  var combine$2 = function (info, eventOrder, behaviours, base) {
    var byEventName = groupByEvents(info, behaviours, base);
    return combineGroups(byEventName, eventOrder);
  };
  var assemble = function (rawHandler) {
    var handler = $_c2uy54y6je4c0n1w.read(rawHandler);
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
    return Result.error(['The event (' + eventName + ') has more than one behaviour that listens to it.\nWhen this occurs, you must ' + 'specify an event ordering for the behaviours in your spec (e.g. [ "listing", "toggling" ]).\nThe behaviours that ' + 'can trigger it are: ' + $_5mhtz1ydje4c0n4m.stringify($_9880jxwsje4c0mtn.map(tuples, function (c) {
        return c.name();
      }), null, 2)]);
  };
  var fuse$1 = function (tuples, eventOrder, eventName) {
    var order = eventOrder[eventName];
    if (!order)
      return missingOrderError(eventName, tuples);
    else
      return $_58dk6b133je4c0o8d.sortKeys('Event: ' + eventName, 'name', tuples, order).map(function (sortedTuples) {
        var handlers = $_9880jxwsje4c0mtn.map(sortedTuples, function (tuple) {
          return tuple.handler();
        });
        return $_c2uy54y6je4c0n1w.fuse(handlers);
      });
  };
  var combineGroups = function (byEventName, eventOrder) {
    var r = $_czbu3jx0je4c0muh.mapToArray(byEventName, function (tuples, eventName) {
      var combined = tuples.length === 1 ? Result.value(tuples[0].handler()) : fuse$1(tuples, eventOrder, eventName);
      return combined.map(function (handler) {
        var assembled = assemble(handler);
        var purpose = tuples.length > 1 ? $_9880jxwsje4c0mtn.filter(eventOrder, function (o) {
          return $_9880jxwsje4c0mtn.contains(tuples, function (t) {
            return t.name() === o;
          });
        }).join(' > ') : tuples[0].name();
        return $_el09ksxsje4c0myu.wrap(eventName, $_6xgglo134je4c0o8k.nu(assembled, purpose));
      });
    });
    return $_el09ksxsje4c0myu.consolidate(r, {});
  };
  var $_fel7i0132je4c0o7t = { combine: combine$2 };

  var toInfo = function (spec) {
    return $_98oa5zyeje4c0n4p.asStruct('custom.definition', $_98oa5zyeje4c0n4p.objOfOnly([
      $_9mxze0y7je4c0n2h.field('dom', 'dom', $_df8fqwy8je4c0n2s.strict(), $_98oa5zyeje4c0n4p.objOfOnly([
        $_9mxze0y7je4c0n2h.strict('tag'),
        $_9mxze0y7je4c0n2h.defaulted('styles', {}),
        $_9mxze0y7je4c0n2h.defaulted('classes', []),
        $_9mxze0y7je4c0n2h.defaulted('attributes', {}),
        $_9mxze0y7je4c0n2h.option('value'),
        $_9mxze0y7je4c0n2h.option('innerHtml')
      ])),
      $_9mxze0y7je4c0n2h.strict('components'),
      $_9mxze0y7je4c0n2h.strict('uid'),
      $_9mxze0y7je4c0n2h.defaulted('events', {}),
      $_9mxze0y7je4c0n2h.defaulted('apis', $_82nexzwjje4c0mss.constant({})),
      $_9mxze0y7je4c0n2h.field('eventOrder', 'eventOrder', $_df8fqwy8je4c0n2s.mergeWith({
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
      }), $_98oa5zyeje4c0n4p.anyValue()),
      $_9mxze0y7je4c0n2h.option('domModification'),
      $_7lk9gdz6je4c0n8n.snapshot('originalSpec'),
      $_9mxze0y7je4c0n2h.defaulted('debug.sketcher', 'unknown')
    ]), spec);
  };
  var getUid = function (info) {
    return $_el09ksxsje4c0myu.wrap($_d1vg9e10yje4c0noq.idAttr(), info.uid());
  };
  var toDefinition = function (info) {
    var base = {
      tag: info.dom().tag(),
      classes: info.dom().classes(),
      attributes: $_55zfs1wyje4c0mue.deepMerge(getUid(info), info.dom().attributes()),
      styles: info.dom().styles(),
      domChildren: $_9880jxwsje4c0mtn.map(info.components(), function (comp) {
        return comp.element();
      })
    };
    return $_9n1m7pyije4c0n5k.nu($_55zfs1wyje4c0mue.deepMerge(base, info.dom().innerHtml().map(function (h) {
      return $_el09ksxsje4c0myu.wrap('innerHtml', h);
    }).getOr({}), info.dom().value().map(function (h) {
      return $_el09ksxsje4c0myu.wrap('value', h);
    }).getOr({})));
  };
  var toModification = function (info) {
    return info.domModification().fold(function () {
      return $_g96sqfyhje4c0n57.nu({});
    }, $_g96sqfyhje4c0n57.nu);
  };
  var toApis = function (info) {
    return info.apis();
  };
  var toEvents = function (info) {
    return info.events();
  };
  var $_cufmai135je4c0o8r = {
    toInfo: toInfo,
    toDefinition: toDefinition,
    toModification: toModification,
    toApis: toApis,
    toEvents: toEvents
  };

  var add$3 = function (element, classes) {
    $_9880jxwsje4c0mtn.each(classes, function (x) {
      $_7xiz2yynje4c0n63.add(element, x);
    });
  };
  var remove$6 = function (element, classes) {
    $_9880jxwsje4c0mtn.each(classes, function (x) {
      $_7xiz2yynje4c0n63.remove(element, x);
    });
  };
  var toggle$3 = function (element, classes) {
    $_9880jxwsje4c0mtn.each(classes, function (x) {
      $_7xiz2yynje4c0n63.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_9880jxwsje4c0mtn.forall(classes, function (clazz) {
      return $_7xiz2yynje4c0n63.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_9880jxwsje4c0mtn.exists(classes, function (clazz) {
      return $_7xiz2yynje4c0n63.has(element, clazz);
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
    return $_ftc5rvypje4c0n68.supports(element) ? getNative(element) : $_ftc5rvypje4c0n68.get(element);
  };
  var $_eq5p18137je4c0oa8 = {
    add: add$3,
    remove: remove$6,
    toggle: toggle$3,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$10
  };

  var getChildren = function (definition) {
    if (definition.domChildren().isSome() && definition.defChildren().isSome()) {
      throw new Error('Cannot specify children and child specs! Must be one or the other.\nDef: ' + $_9n1m7pyije4c0n5k.defToStr(definition));
    } else {
      return definition.domChildren().fold(function () {
        var defChildren = definition.defChildren().getOr([]);
        return $_9880jxwsje4c0mtn.map(defChildren, renderDef);
      }, function (domChildren) {
        return domChildren;
      });
    }
  };
  var renderToDom = function (definition) {
    var subject = $_gba6fcxfje4c0mwy.fromTag(definition.tag());
    $_f4kg3zxrje4c0myl.setAll(subject, definition.attributes().getOr({}));
    $_eq5p18137je4c0oa8.add(subject, definition.classes().getOr([]));
    $_81jggk103je4c0nf6.setAll(subject, definition.styles().getOr({}));
    $_elgiv8xoje4c0my9.set(subject, definition.innerHtml().getOr(''));
    var children = getChildren(definition);
    $_8mtzevxije4c0mx6.append(subject, children);
    definition.value().each(function (value) {
      $_an41ue12eje4c0nzb.set(subject, value);
    });
    return subject;
  };
  var renderDef = function (spec) {
    var definition = $_9n1m7pyije4c0n5k.nu(spec);
    return renderToDom(definition);
  };
  var $_d8ovw6136je4c0o9f = { renderToDom: renderToDom };

  var build = function (spec) {
    var getMe = function () {
      return me;
    };
    var systemApi = Cell(NoContextApi(getMe));
    var info = $_98oa5zyeje4c0n4p.getOrDie($_cufmai135je4c0o8r.toInfo($_55zfs1wyje4c0mue.deepMerge(spec, { behaviours: undefined })));
    var bBlob = $_81bqct12vje4c0o5q.generate(spec);
    var bList = $_4vxm5z12wje4c0o5z.getBehaviours(bBlob);
    var bData = $_4vxm5z12wje4c0o5z.getData(bBlob);
    var definition = $_cufmai135je4c0o8r.toDefinition(info);
    var baseModification = { 'alloy.base.modification': $_cufmai135je4c0o8r.toModification(info) };
    var modification = $_egqtxb130je4c0o6x.combine(bData, baseModification, bList, definition).getOrDie();
    var modDefinition = $_g96sqfyhje4c0n57.merge(definition, modification);
    var item = $_d8ovw6136je4c0o9f.renderToDom(modDefinition);
    var baseEvents = { 'alloy.base.behaviour': $_cufmai135je4c0o8r.toEvents(info) };
    var events = $_fel7i0132je4c0o7t.combine(bData, info.eventOrder(), bList, baseEvents).getOrDie();
    var subcomponents = Cell(info.components());
    var connect = function (newApi) {
      systemApi.set(newApi);
    };
    var disconnect = function () {
      systemApi.set(NoContextApi(getMe));
    };
    var syncComponents = function () {
      var children = $_a90a93x3je4c0mv1.children(item);
      var subs = $_9880jxwsje4c0mtn.bind(children, function (child) {
        return systemApi.get().getByDom(child).fold(function () {
          return [];
        }, function (c) {
          return [c];
        });
      });
      subcomponents.set(subs);
    };
    var config = function (behaviour) {
      if (behaviour === $_2n986r10qje4c0nls.apiConfig())
        return info.apis();
      var b = bData;
      var f = $_85ige4wzje4c0muf.isFunction(b[behaviour.name()]) ? b[behaviour.name()] : function () {
        throw new Error('Could not find ' + behaviour.name() + ' in ' + $_5mhtz1ydje4c0n4m.stringify(spec, null, 2));
      };
      return f();
    };
    var hasConfigured = function (behaviour) {
      return $_85ige4wzje4c0muf.isFunction(bData[behaviour.name()]);
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
      spec: $_82nexzwjje4c0mss.constant(spec),
      readState: readState,
      connect: connect,
      disconnect: disconnect,
      element: $_82nexzwjje4c0mss.constant(item),
      syncComponents: syncComponents,
      components: subcomponents.get,
      events: $_82nexzwjje4c0mss.constant(events)
    });
    return me;
  };
  var $_b12tu312uje4c0o4w = { build: build };

  var isRecursive = function (component, originator, target) {
    return $_diemerx9je4c0mw0.eq(originator, component.element()) && !$_diemerx9je4c0mw0.eq(originator, target);
  };
  var $_cunx9o138je4c0oag = {
    events: $_86uglly4je4c0n1n.derive([$_86uglly4je4c0n1n.can($_270al8whje4c0msc.focus(), function (component, simulatedEvent) {
        var originator = simulatedEvent.event().originator();
        var target = simulatedEvent.event().target();
        if (isRecursive(component, originator, target)) {
          console.warn($_270al8whje4c0msc.focus() + ' did not get interpreted by the desired target. ' + '\nOriginator: ' + $_63gwexxmje4c0mxw.element(originator) + '\nTarget: ' + $_63gwexxmje4c0mxw.element(target) + '\nCheck the ' + $_270al8whje4c0msc.focus() + ' event handlers');
          return false;
        } else {
          return true;
        }
      })])
  };

  var make$1 = function (spec) {
    return spec;
  };
  var $_26vx98139je4c0oam = { make: make$1 };

  var buildSubcomponents = function (spec) {
    var components = $_el09ksxsje4c0myu.readOr('components', [])(spec);
    return $_9880jxwsje4c0mtn.map(components, build$1);
  };
  var buildFromSpec = function (userSpec) {
    var spec = $_26vx98139je4c0oam.make(userSpec);
    var components = buildSubcomponents(spec);
    var completeSpec = $_55zfs1wyje4c0mue.deepMerge($_cunx9o138je4c0oag, spec, $_el09ksxsje4c0myu.wrap('components', components));
    return Result.value($_b12tu312uje4c0o4w.build(completeSpec));
  };
  var text = function (textContent) {
    var element = $_gba6fcxfje4c0mwy.fromText(textContent);
    return external({ element: element });
  };
  var external = function (spec) {
    var extSpec = $_98oa5zyeje4c0n4p.asStructOrDie('external.component', $_98oa5zyeje4c0n4p.objOfOnly([
      $_9mxze0y7je4c0n2h.strict('element'),
      $_9mxze0y7je4c0n2h.option('uid')
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
      $_23tun010xje4c0no9.writeOnly(extSpec.element(), uid);
    });
    var me = ComponentApi({
      getSystem: systemApi.get,
      config: Option.none,
      hasConfigured: $_82nexzwjje4c0mss.constant(false),
      connect: connect,
      disconnect: disconnect,
      element: $_82nexzwjje4c0mss.constant(extSpec.element()),
      spec: $_82nexzwjje4c0mss.constant(spec),
      readState: $_82nexzwjje4c0mss.constant('No state'),
      syncComponents: $_82nexzwjje4c0mss.noop,
      components: $_82nexzwjje4c0mss.constant([]),
      events: $_82nexzwjje4c0mss.constant({})
    });
    return $_2n986r10qje4c0nls.premade(me);
  };
  var build$1 = function (rawUserSpec) {
    return $_2n986r10qje4c0nls.getPremade(rawUserSpec).fold(function () {
      var userSpecWithUid = $_55zfs1wyje4c0mue.deepMerge({ uid: $_23tun010xje4c0no9.generate('') }, rawUserSpec);
      return buildFromSpec(userSpecWithUid).getOrDie();
    }, function (prebuilt) {
      return prebuilt;
    });
  };
  var $_dzdkrz12tje4c0o45 = {
    build: build$1,
    premade: $_2n986r10qje4c0nls.premade,
    external: external,
    text: text
  };

  var hoverEvent = 'alloy.item-hover';
  var focusEvent = 'alloy.item-focus';
  var onHover = function (item) {
    if ($_30zd9eytje4c0n6v.search(item.element()).isNone() || Focusing.isFocused(item)) {
      if (!Focusing.isFocused(item))
        Focusing.focus(item);
      $_dxxx79wgje4c0ms3.emitWith(item, hoverEvent, { item: item });
    }
  };
  var onFocus = function (item) {
    $_dxxx79wgje4c0ms3.emitWith(item, focusEvent, { item: item });
  };
  var $_7ymx6x13dje4c0obc = {
    hover: $_82nexzwjje4c0mss.constant(hoverEvent),
    focus: $_82nexzwjje4c0mss.constant(focusEvent),
    onHover: onHover,
    onFocus: onFocus
  };

  var builder = function (info) {
    return {
      dom: $_55zfs1wyje4c0mue.deepMerge(info.dom(), { attributes: { role: info.toggling().isSome() ? 'menuitemcheckbox' : 'menuitem' } }),
      behaviours: $_55zfs1wyje4c0mue.deepMerge($_bi2douy2je4c0n0f.derive([
        info.toggling().fold(Toggling.revoke, function (tConfig) {
          return Toggling.config($_55zfs1wyje4c0mue.deepMerge({ aria: { mode: 'checked' } }, tConfig));
        }),
        Focusing.config({
          ignore: info.ignoreFocus(),
          onFocus: function (component) {
            $_7ymx6x13dje4c0obc.onFocus(component);
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
      events: $_86uglly4je4c0n1n.derive([
        $_86uglly4je4c0n1n.runWithTarget($_270al8whje4c0msc.tapOrClick(), $_dxxx79wgje4c0ms3.emitExecute),
        $_86uglly4je4c0n1n.cutter($_2j5gqiwije4c0msm.mousedown()),
        $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.mouseover(), $_7ymx6x13dje4c0obc.onHover),
        $_86uglly4je4c0n1n.run($_270al8whje4c0msc.focusItem(), Focusing.focus)
      ]),
      components: info.components(),
      domModification: info.domModification()
    };
  };
  var schema$10 = [
    $_9mxze0y7je4c0n2h.strict('data'),
    $_9mxze0y7je4c0n2h.strict('components'),
    $_9mxze0y7je4c0n2h.strict('dom'),
    $_9mxze0y7je4c0n2h.option('toggling'),
    $_9mxze0y7je4c0n2h.defaulted('itemBehaviours', {}),
    $_9mxze0y7je4c0n2h.defaulted('ignoreFocus', false),
    $_9mxze0y7je4c0n2h.defaulted('domModification', {}),
    $_7lk9gdz6je4c0n8n.output('builder', builder)
  ];

  var builder$1 = function (detail) {
    return {
      dom: detail.dom(),
      components: detail.components(),
      events: $_86uglly4je4c0n1n.derive([$_86uglly4je4c0n1n.stopper($_270al8whje4c0msc.focusItem())])
    };
  };
  var schema$11 = [
    $_9mxze0y7je4c0n2h.strict('dom'),
    $_9mxze0y7je4c0n2h.strict('components'),
    $_7lk9gdz6je4c0n8n.output('builder', builder$1)
  ];

  var owner$2 = 'item-widget';
  var partTypes = [$_9i1x5a10vje4c0nn9.required({
      name: 'widget',
      overrides: function (detail) {
        return {
          behaviours: $_bi2douy2je4c0n0f.derive([me.config({
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
  var $_8idqwd13gje4c0ocb = {
    owner: $_82nexzwjje4c0mss.constant(owner$2),
    parts: $_82nexzwjje4c0mss.constant(partTypes)
  };

  var builder$2 = function (info) {
    var subs = $_3zrx6s10tje4c0nmb.substitutes($_8idqwd13gje4c0ocb.owner(), info, $_8idqwd13gje4c0ocb.parts());
    var components = $_3zrx6s10tje4c0nmb.components($_8idqwd13gje4c0ocb.owner(), info, subs.internals());
    var focusWidget = function (component) {
      return $_3zrx6s10tje4c0nmb.getPart(component, info, 'widget').map(function (widget) {
        Keying.focusIn(widget);
        return widget;
      });
    };
    var onHorizontalArrow = function (component, simulatedEvent) {
      return $_autnim108je4c0ngi.inside(simulatedEvent.event().target()) ? Option.none() : function () {
        if (info.autofocus()) {
          simulatedEvent.setSource(component.element());
          return Option.none();
        } else {
          return Option.none();
        }
      }();
    };
    return $_55zfs1wyje4c0mue.deepMerge({
      dom: info.dom(),
      components: components,
      domModification: info.domModification(),
      events: $_86uglly4je4c0n1n.derive([
        $_86uglly4je4c0n1n.runOnExecute(function (component, simulatedEvent) {
          focusWidget(component).each(function (widget) {
            simulatedEvent.stop();
          });
        }),
        $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.mouseover(), $_7ymx6x13dje4c0obc.onHover),
        $_86uglly4je4c0n1n.run($_270al8whje4c0msc.focusItem(), function (component, simulatedEvent) {
          if (info.autofocus())
            focusWidget(component);
          else
            Focusing.focus(component);
        })
      ]),
      behaviours: $_bi2douy2je4c0n0f.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: info.data()
          }
        }),
        Focusing.config({
          onFocus: function (component) {
            $_7ymx6x13dje4c0obc.onFocus(component);
          }
        }),
        Keying.config({
          mode: 'special',
          onLeft: onHorizontalArrow,
          onRight: onHorizontalArrow,
          onEscape: function (component, simulatedEvent) {
            if (!Focusing.isFocused(component) && !info.autofocus()) {
              Focusing.focus(component);
              return Option.some(true);
            } else if (info.autofocus()) {
              simulatedEvent.setSource(component.element());
              return Option.none();
            } else {
              return Option.none();
            }
          }
        })
      ])
    });
  };
  var schema$12 = [
    $_9mxze0y7je4c0n2h.strict('uid'),
    $_9mxze0y7je4c0n2h.strict('data'),
    $_9mxze0y7je4c0n2h.strict('components'),
    $_9mxze0y7je4c0n2h.strict('dom'),
    $_9mxze0y7je4c0n2h.defaulted('autofocus', false),
    $_9mxze0y7je4c0n2h.defaulted('domModification', {}),
    $_3zrx6s10tje4c0nmb.defaultUidsSchema($_8idqwd13gje4c0ocb.parts()),
    $_7lk9gdz6je4c0n8n.output('builder', builder$2)
  ];

  var itemSchema$1 = $_98oa5zyeje4c0n4p.choose('type', {
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
  var parts = [$_9i1x5a10vje4c0nn9.group({
      factory: {
        sketch: function (spec) {
          var itemInfo = $_98oa5zyeje4c0n4p.asStructOrDie('menu.spec item', itemSchema$1, spec);
          return itemInfo.builder()(itemInfo);
        }
      },
      name: 'items',
      unit: 'item',
      defaults: function (detail, u) {
        var fallbackUid = $_23tun010xje4c0no9.generate('');
        return $_55zfs1wyje4c0mue.deepMerge({ uid: fallbackUid }, u);
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
    $_9mxze0y7je4c0n2h.strict('value'),
    $_9mxze0y7je4c0n2h.strict('items'),
    $_9mxze0y7je4c0n2h.strict('dom'),
    $_9mxze0y7je4c0n2h.strict('components'),
    $_9mxze0y7je4c0n2h.defaulted('eventOrder', {}),
    $_663n6m10oje4c0nl6.field('menuBehaviours', [
      Highlighting,
      me,
      Composing,
      Keying
    ]),
    $_9mxze0y7je4c0n2h.defaultedOf('movement', {
      mode: 'menu',
      moveOnTab: true
    }, $_98oa5zyeje4c0n4p.choose('mode', {
      grid: [
        $_7lk9gdz6je4c0n8n.initSize(),
        $_7lk9gdz6je4c0n8n.output('config', configureGrid)
      ],
      menu: [
        $_9mxze0y7je4c0n2h.defaulted('moveOnTab', true),
        $_7lk9gdz6je4c0n8n.output('config', configureMenu)
      ]
    })),
    $_7lk9gdz6je4c0n8n.itemMarkers(),
    $_9mxze0y7je4c0n2h.defaulted('fakeFocus', false),
    $_9mxze0y7je4c0n2h.defaulted('focusManager', $_dyd6v2zrje4c0ncu.dom()),
    $_7lk9gdz6je4c0n8n.onHandler('onHighlight')
  ];
  var $_38qjq213bje4c0oar = {
    name: $_82nexzwjje4c0mss.constant('Menu'),
    schema: $_82nexzwjje4c0mss.constant(schema$13),
    parts: $_82nexzwjje4c0mss.constant(parts)
  };

  var focusEvent$1 = 'alloy.menu-focus';
  var $_fqbomv13ije4c0oct = { focus: $_82nexzwjje4c0mss.constant(focusEvent$1) };

  var make$2 = function (detail, components, spec, externals) {
    return $_55zfs1wyje4c0mue.deepMerge({
      dom: $_55zfs1wyje4c0mue.deepMerge(detail.dom(), { attributes: { role: 'menu' } }),
      uid: detail.uid(),
      behaviours: $_55zfs1wyje4c0mue.deepMerge($_bi2douy2je4c0n0f.derive([
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
        Composing.config({ find: $_82nexzwjje4c0mss.identity }),
        Keying.config(detail.movement().config()(detail, detail.movement()))
      ]), $_663n6m10oje4c0nl6.get(detail.menuBehaviours())),
      events: $_86uglly4je4c0n1n.derive([
        $_86uglly4je4c0n1n.run($_7ymx6x13dje4c0obc.focus(), function (menu, simulatedEvent) {
          var event = simulatedEvent.event();
          menu.getSystem().getByDom(event.target()).each(function (item) {
            Highlighting.highlight(menu, item);
            simulatedEvent.stop();
            $_dxxx79wgje4c0ms3.emitWith(menu, $_fqbomv13ije4c0oct.focus(), {
              menu: menu,
              item: item
            });
          });
        }),
        $_86uglly4je4c0n1n.run($_7ymx6x13dje4c0obc.hover(), function (menu, simulatedEvent) {
          var item = simulatedEvent.event().item();
          Highlighting.highlight(menu, item);
        })
      ]),
      components: components,
      eventOrder: detail.eventOrder()
    });
  };
  var $_5dqx6q13hje4c0ocj = { make: make$2 };

  var Menu = $_ct2klp10pje4c0nle.composite({
    name: 'Menu',
    configFields: $_38qjq213bje4c0oar.schema(),
    partFields: $_38qjq213bje4c0oar.parts(),
    factory: $_5dqx6q13hje4c0ocj.make
  });

  var preserve$2 = function (f, container) {
    var ownerDoc = $_a90a93x3je4c0mv1.owner(container);
    var refocus = $_30zd9eytje4c0n6v.active(ownerDoc).bind(function (focused) {
      var hasFocus = function (elem) {
        return $_diemerx9je4c0mw0.eq(focused, elem);
      };
      return hasFocus(container) ? Option.some(container) : $_1dgvyfyvje4c0n73.descendant(container, hasFocus);
    });
    var result = f(container);
    refocus.each(function (oldFocus) {
      $_30zd9eytje4c0n6v.active(ownerDoc).filter(function (newFocus) {
        return $_diemerx9je4c0mw0.eq(newFocus, oldFocus);
      }).orThunk(function () {
        $_30zd9eytje4c0n6v.focus(oldFocus);
      });
    });
    return result;
  };
  var $_1se3r413mje4c0odh = { preserve: preserve$2 };

  var set$7 = function (component, replaceConfig, replaceState, data) {
    $_ckx9tcx1je4c0mul.detachChildren(component);
    $_1se3r413mje4c0odh.preserve(function () {
      var children = $_9880jxwsje4c0mtn.map(data, component.getSystem().build);
      $_9880jxwsje4c0mtn.each(children, function (l) {
        $_ckx9tcx1je4c0mul.attach(component, l);
      });
    }, component.element());
  };
  var insert = function (component, replaceConfig, insertion, childSpec) {
    var child = component.getSystem().build(childSpec);
    $_ckx9tcx1je4c0mul.attachWith(component, child, insertion);
  };
  var append$2 = function (component, replaceConfig, replaceState, appendee) {
    insert(component, replaceConfig, $_1r9l60x2je4c0mux.append, appendee);
  };
  var prepend$2 = function (component, replaceConfig, replaceState, prependee) {
    insert(component, replaceConfig, $_1r9l60x2je4c0mux.prepend, prependee);
  };
  var remove$7 = function (component, replaceConfig, replaceState, removee) {
    var children = contents(component, replaceConfig);
    var foundChild = $_9880jxwsje4c0mtn.find(children, function (child) {
      return $_diemerx9je4c0mw0.eq(removee.element(), child.element());
    });
    foundChild.each($_ckx9tcx1je4c0mul.detach);
  };
  var contents = function (component, replaceConfig) {
    return component.components();
  };
  var $_263ksq13lje4c0od7 = {
    append: append$2,
    prepend: prepend$2,
    remove: remove$7,
    set: set$7,
    contents: contents
  };

  var Replacing = $_bi2douy2je4c0n0f.create({
    fields: [],
    name: 'replacing',
    apis: $_263ksq13lje4c0od7
  });

  var transpose = function (obj) {
    return $_czbu3jx0je4c0muh.tupleMap(obj, function (v, k) {
      return {
        k: v,
        v: k
      };
    });
  };
  var trace = function (items, byItem, byMenu, finish) {
    return $_el09ksxsje4c0myu.readOptFrom(byMenu, finish).bind(function (triggerItem) {
      return $_el09ksxsje4c0myu.readOptFrom(items, triggerItem).bind(function (triggerMenu) {
        var rest = trace(items, byItem, byMenu, triggerMenu);
        return Option.some([triggerMenu].concat(rest));
      });
    }).getOr([]);
  };
  var generate$5 = function (menus, expansions) {
    var items = {};
    $_czbu3jx0je4c0muh.each(menus, function (menuItems, menu) {
      $_9880jxwsje4c0mtn.each(menuItems, function (item) {
        items[item] = menu;
      });
    });
    var byItem = expansions;
    var byMenu = transpose(expansions);
    var menuPaths = $_czbu3jx0je4c0muh.map(byMenu, function (triggerItem, submenu) {
      return [submenu].concat(trace(items, byItem, byMenu, submenu));
    });
    return $_czbu3jx0je4c0muh.map(items, function (path) {
      return $_el09ksxsje4c0myu.readOptFrom(menuPaths, path).getOr([path]);
    });
  };
  var $_el5gdm13pje4c0ofh = { generate: generate$5 };

  function LayeredState () {
    var expansions = Cell({});
    var menus = Cell({});
    var paths = Cell({});
    var primary = Cell(Option.none());
    var toItemValues = Cell($_82nexzwjje4c0mss.constant([]));
    var clear = function () {
      expansions.set({});
      menus.set({});
      paths.set({});
      primary.set(Option.none());
    };
    var isClear = function () {
      return primary.get().isNone();
    };
    var setContents = function (sPrimary, sMenus, sExpansions, sToItemValues) {
      primary.set(Option.some(sPrimary));
      expansions.set(sExpansions);
      menus.set(sMenus);
      toItemValues.set(sToItemValues);
      var menuValues = sToItemValues(sMenus);
      var sPaths = $_el5gdm13pje4c0ofh.generate(menuValues, sExpansions);
      paths.set(sPaths);
    };
    var expand = function (itemValue) {
      return $_el09ksxsje4c0myu.readOptFrom(expansions.get(), itemValue).map(function (menu) {
        var current = $_el09ksxsje4c0myu.readOptFrom(paths.get(), itemValue).getOr([]);
        return [menu].concat(current);
      });
    };
    var collapse = function (itemValue) {
      return $_el09ksxsje4c0myu.readOptFrom(paths.get(), itemValue).bind(function (path) {
        return path.length > 1 ? Option.some(path.slice(1)) : Option.none();
      });
    };
    var refresh = function (itemValue) {
      return $_el09ksxsje4c0myu.readOptFrom(paths.get(), itemValue);
    };
    var lookupMenu = function (menuValue) {
      return $_el09ksxsje4c0myu.readOptFrom(menus.get(), menuValue);
    };
    var otherMenus = function (path) {
      var menuValues = toItemValues.get()(menus.get());
      return $_9880jxwsje4c0mtn.difference($_czbu3jx0je4c0muh.keys(menuValues), path);
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
      return $_czbu3jx0je4c0muh.map(menus, function (spec, name) {
        var data = Menu.sketch($_55zfs1wyje4c0mue.deepMerge(spec, {
          value: name,
          items: spec.items,
          markers: $_el09ksxsje4c0myu.narrow(rawUiSpec.markers, [
            'item',
            'selectedItem'
          ]),
          fakeFocus: detail.fakeFocus(),
          onHighlight: detail.onHighlight(),
          focusManager: detail.fakeFocus() ? $_dyd6v2zrje4c0ncu.highlights() : $_dyd6v2zrje4c0ncu.dom()
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
      return $_czbu3jx0je4c0muh.map(detail.data().menus(), function (data, menuName) {
        return $_9880jxwsje4c0mtn.bind(data.items, function (item) {
          return item.type === 'separator' ? [] : [item.data.value];
        });
      });
    };
    var setActiveMenu = function (container, menu) {
      Highlighting.highlight(container, menu);
      Highlighting.getHighlighted(menu).orThunk(function () {
        return Highlighting.getFirst(menu);
      }).each(function (item) {
        $_dxxx79wgje4c0ms3.dispatch(container, item.element(), $_270al8whje4c0msc.focusItem());
      });
    };
    var getMenus = function (state, menuValues) {
      return $_ce73q4y0je4c0n0c.cat($_9880jxwsje4c0mtn.map(menuValues, state.lookupMenu));
    };
    var updateMenuPath = function (container, state, path) {
      return Option.from(path[0]).bind(state.lookupMenu).map(function (activeMenu) {
        var rest = getMenus(state, path.slice(1));
        $_9880jxwsje4c0mtn.each(rest, function (r) {
          $_7xiz2yynje4c0n63.add(r.element(), detail.markers().backgroundMenu());
        });
        if (!$_1erg6wxjje4c0mxa.inBody(activeMenu.element())) {
          Replacing.append(container, $_dzdkrz12tje4c0o45.premade(activeMenu));
        }
        $_eq5p18137je4c0oa8.remove(activeMenu.element(), [detail.markers().backgroundMenu()]);
        setActiveMenu(container, activeMenu);
        var others = getMenus(state, state.otherMenus(path));
        $_9880jxwsje4c0mtn.each(others, function (o) {
          $_eq5p18137je4c0oa8.remove(o.element(), [detail.markers().backgroundMenu()]);
          if (!detail.stayInDom())
            Replacing.remove(container, o);
        });
        return activeMenu;
      });
    };
    var expandRight = function (container, item) {
      var value = getItemValue(item);
      return state.expand(value).bind(function (path) {
        Option.from(path[0]).bind(state.lookupMenu).each(function (activeMenu) {
          if (!$_1erg6wxjje4c0mxa.inBody(activeMenu.element())) {
            Replacing.append(container, $_dzdkrz12tje4c0o45.premade(activeMenu));
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
      return $_autnim108je4c0ngi.inside(item.element()) ? Option.none() : expandRight(container, item);
    };
    var onLeft = function (container, item) {
      return $_autnim108je4c0ngi.inside(item.element()) ? Option.none() : collapseLeft(container, item);
    };
    var onEscape = function (container, item) {
      return collapseLeft(container, item).orThunk(function () {
        return detail.onEscape()(container, item);
      });
    };
    var keyOnItem = function (f) {
      return function (container, simulatedEvent) {
        return $_bntfp0zxje4c0ne8.closest(simulatedEvent.getSource(), '.' + detail.markers().item()).bind(function (target) {
          return container.getSystem().getByDom(target).bind(function (item) {
            return f(container, item);
          });
        });
      };
    };
    var events = $_86uglly4je4c0n1n.derive([
      $_86uglly4je4c0n1n.run($_fqbomv13ije4c0oct.focus(), function (sandbox, simulatedEvent) {
        var menu = simulatedEvent.event().menu();
        Highlighting.highlight(sandbox, menu);
      }),
      $_86uglly4je4c0n1n.runOnExecute(function (sandbox, simulatedEvent) {
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
      $_86uglly4je4c0n1n.runOnAttached(function (container, simulatedEvent) {
        setup(container).each(function (primary) {
          Replacing.append(container, $_dzdkrz12tje4c0o45.premade(primary));
          if (detail.openImmediately()) {
            setActiveMenu(container, primary);
            detail.onOpenMenu()(container, primary);
          }
        });
      })
    ].concat(detail.navigateOnHover() ? [$_86uglly4je4c0n1n.run($_7ymx6x13dje4c0obc.hover(), function (sandbox, simulatedEvent) {
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
      behaviours: $_55zfs1wyje4c0mue.deepMerge($_bi2douy2je4c0n0f.derive([
        Keying.config({
          mode: 'special',
          onRight: keyOnItem(onRight),
          onLeft: keyOnItem(onLeft),
          onEscape: keyOnItem(onEscape),
          focusIn: function (container, keyInfo) {
            state.getPrimary().each(function (primary) {
              $_dxxx79wgje4c0ms3.dispatch(container, primary.element(), $_270al8whje4c0msc.focusItem());
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
      ]), $_663n6m10oje4c0nl6.get(detail.tmenuBehaviours())),
      eventOrder: detail.eventOrder(),
      apis: { collapseMenu: collapseMenuApi },
      events: events
    };
  };
  var $_23dqf013nje4c0odz = {
    make: make$3,
    collapseItem: $_82nexzwjje4c0mss.constant('collapse-item')
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
      menus: $_el09ksxsje4c0myu.wrap(name, menu),
      expansions: {}
    };
  };
  var collapseItem = function (text) {
    return {
      value: $_e3nt9m10rje4c0nm2.generate($_23dqf013nje4c0odz.collapseItem()),
      text: text
    };
  };
  var TieredMenu = $_ct2klp10pje4c0nle.single({
    name: 'TieredMenu',
    configFields: [
      $_7lk9gdz6je4c0n8n.onStrictKeyboardHandler('onExecute'),
      $_7lk9gdz6je4c0n8n.onStrictKeyboardHandler('onEscape'),
      $_7lk9gdz6je4c0n8n.onStrictHandler('onOpenMenu'),
      $_7lk9gdz6je4c0n8n.onStrictHandler('onOpenSubmenu'),
      $_7lk9gdz6je4c0n8n.onHandler('onCollapseMenu'),
      $_9mxze0y7je4c0n2h.defaulted('openImmediately', true),
      $_9mxze0y7je4c0n2h.strictObjOf('data', [
        $_9mxze0y7je4c0n2h.strict('primary'),
        $_9mxze0y7je4c0n2h.strict('menus'),
        $_9mxze0y7je4c0n2h.strict('expansions')
      ]),
      $_9mxze0y7je4c0n2h.defaulted('fakeFocus', false),
      $_7lk9gdz6je4c0n8n.onHandler('onHighlight'),
      $_7lk9gdz6je4c0n8n.onHandler('onHover'),
      $_7lk9gdz6je4c0n8n.tieredMenuMarkers(),
      $_9mxze0y7je4c0n2h.strict('dom'),
      $_9mxze0y7je4c0n2h.defaulted('navigateOnHover', true),
      $_9mxze0y7je4c0n2h.defaulted('stayInDom', false),
      $_663n6m10oje4c0nl6.field('tmenuBehaviours', [
        Keying,
        Highlighting,
        Composing,
        Replacing
      ]),
      $_9mxze0y7je4c0n2h.defaulted('eventOrder', {})
    ],
    apis: {
      collapseMenu: function (apis, tmenu) {
        apis.collapseMenu(tmenu);
      }
    },
    factory: $_23dqf013nje4c0odz.make,
    extraApis: {
      tieredData: tieredData,
      singleData: singleData,
      collapseItem: collapseItem
    }
  });

  var findRoute = function (component, transConfig, transState, route) {
    return $_el09ksxsje4c0myu.readOptFrom(transConfig.routes(), route.start()).map($_82nexzwjje4c0mss.apply).bind(function (sConfig) {
      return $_el09ksxsje4c0myu.readOptFrom(sConfig, route.destination()).map($_82nexzwjje4c0mss.apply);
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
          transition: $_82nexzwjje4c0mss.constant(t),
          route: $_82nexzwjje4c0mss.constant(r)
        };
      });
    });
  };
  var disableTransition = function (comp, transConfig, transState) {
    getTransition(comp, transConfig, transState).each(function (routeTransition) {
      var t = routeTransition.transition();
      $_7xiz2yynje4c0n63.remove(comp.element(), t.transitionClass());
      $_f4kg3zxrje4c0myl.remove(comp.element(), transConfig.destinationAttr());
    });
  };
  var getNewRoute = function (comp, transConfig, transState, destination) {
    return {
      start: $_82nexzwjje4c0mss.constant($_f4kg3zxrje4c0myl.get(comp.element(), transConfig.stateAttr())),
      destination: $_82nexzwjje4c0mss.constant(destination)
    };
  };
  var getCurrentRoute = function (comp, transConfig, transState) {
    var el = comp.element();
    return $_f4kg3zxrje4c0myl.has(el, transConfig.destinationAttr()) ? Option.some({
      start: $_82nexzwjje4c0mss.constant($_f4kg3zxrje4c0myl.get(comp.element(), transConfig.stateAttr())),
      destination: $_82nexzwjje4c0mss.constant($_f4kg3zxrje4c0myl.get(comp.element(), transConfig.destinationAttr()))
    }) : Option.none();
  };
  var jumpTo = function (comp, transConfig, transState, destination) {
    disableTransition(comp, transConfig, transState);
    if ($_f4kg3zxrje4c0myl.has(comp.element(), transConfig.stateAttr()) && $_f4kg3zxrje4c0myl.get(comp.element(), transConfig.stateAttr()) !== destination)
      transConfig.onFinish()(comp, destination);
    $_f4kg3zxrje4c0myl.set(comp.element(), transConfig.stateAttr(), destination);
  };
  var fasttrack = function (comp, transConfig, transState, destination) {
    if ($_f4kg3zxrje4c0myl.has(comp.element(), transConfig.destinationAttr())) {
      $_f4kg3zxrje4c0myl.set(comp.element(), transConfig.stateAttr(), $_f4kg3zxrje4c0myl.get(comp.element(), transConfig.destinationAttr()));
      $_f4kg3zxrje4c0myl.remove(comp.element(), transConfig.destinationAttr());
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
      $_7xiz2yynje4c0n63.add(comp.element(), t.transitionClass());
      $_f4kg3zxrje4c0myl.set(comp.element(), transConfig.destinationAttr(), destination);
    });
  };
  var getState = function (comp, transConfig, transState) {
    var e = comp.element();
    return $_f4kg3zxrje4c0myl.has(e, transConfig.stateAttr()) ? Option.some($_f4kg3zxrje4c0myl.get(e, transConfig.stateAttr())) : Option.none();
  };
  var $_6wsit413sje4c0og1 = {
    findRoute: findRoute,
    disableTransition: disableTransition,
    getCurrentRoute: getCurrentRoute,
    jumpTo: jumpTo,
    progressTo: progressTo,
    getState: getState
  };

  var events$8 = function (transConfig, transState) {
    return $_86uglly4je4c0n1n.derive([
      $_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        $_6wsit413sje4c0og1.getCurrentRoute(component, transConfig, transState).each(function (route) {
          $_6wsit413sje4c0og1.findRoute(component, transConfig, transState, route).each(function (rInfo) {
            rInfo.transition().each(function (rTransition) {
              if (raw.propertyName === rTransition.property()) {
                $_6wsit413sje4c0og1.jumpTo(component, transConfig, transState, route.destination());
                transConfig.onTransition()(component, route);
              }
            });
          });
        });
      }),
      $_86uglly4je4c0n1n.runOnAttached(function (comp, se) {
        $_6wsit413sje4c0og1.jumpTo(comp, transConfig, transState, transConfig.initialState());
      })
    ]);
  };
  var $_fmx0d313rje4c0ofy = { events: events$8 };

  var TransitionSchema = [
    $_9mxze0y7je4c0n2h.defaulted('destinationAttr', 'data-transitioning-destination'),
    $_9mxze0y7je4c0n2h.defaulted('stateAttr', 'data-transitioning-state'),
    $_9mxze0y7je4c0n2h.strict('initialState'),
    $_7lk9gdz6je4c0n8n.onHandler('onTransition'),
    $_7lk9gdz6je4c0n8n.onHandler('onFinish'),
    $_9mxze0y7je4c0n2h.strictOf('routes', $_98oa5zyeje4c0n4p.setOf(Result.value, $_98oa5zyeje4c0n4p.setOf(Result.value, $_98oa5zyeje4c0n4p.objOfOnly([$_9mxze0y7je4c0n2h.optionObjOfOnly('transition', [
        $_9mxze0y7je4c0n2h.strict('property'),
        $_9mxze0y7je4c0n2h.strict('transitionClass')
      ])]))))
  ];

  var createRoutes = function (routes) {
    var r = {};
    $_czbu3jx0je4c0muh.each(routes, function (v, k) {
      var waypoints = k.split('<->');
      r[waypoints[0]] = $_el09ksxsje4c0myu.wrap(waypoints[1], v);
      r[waypoints[1]] = $_el09ksxsje4c0myu.wrap(waypoints[0], v);
    });
    return r;
  };
  var createBistate = function (first, second, transitions) {
    return $_el09ksxsje4c0myu.wrapAll([
      {
        key: first,
        value: $_el09ksxsje4c0myu.wrap(second, transitions)
      },
      {
        key: second,
        value: $_el09ksxsje4c0myu.wrap(first, transitions)
      }
    ]);
  };
  var createTristate = function (first, second, third, transitions) {
    return $_el09ksxsje4c0myu.wrapAll([
      {
        key: first,
        value: $_el09ksxsje4c0myu.wrapAll([
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
        value: $_el09ksxsje4c0myu.wrapAll([
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
        value: $_el09ksxsje4c0myu.wrapAll([
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
  var Transitioning = $_bi2douy2je4c0n0f.create({
    fields: TransitionSchema,
    name: 'transitioning',
    active: $_fmx0d313rje4c0ofy,
    apis: $_6wsit413sje4c0og1,
    extra: {
      createRoutes: createRoutes,
      createBistate: createBistate,
      createTristate: createTristate
    }
  });

  var scrollable = $_chdthezeje4c0nap.resolve('scrollable');
  var register = function (element) {
    $_7xiz2yynje4c0n63.add(element, scrollable);
  };
  var deregister = function (element) {
    $_7xiz2yynje4c0n63.remove(element, scrollable);
  };
  var $_1xck6b13uje4c0ohd = {
    register: register,
    deregister: deregister,
    scrollable: $_82nexzwjje4c0mss.constant(scrollable)
  };

  var getValue$4 = function (item) {
    return $_el09ksxsje4c0myu.readOptFrom(item, 'format').getOr(item.title);
  };
  var convert$1 = function (formats, memMenuThunk) {
    var mainMenu = makeMenu('Styles', [].concat($_9880jxwsje4c0mtn.map(formats.items, function (k) {
      return makeItem(getValue$4(k), k.title, k.isSelected(), k.getPreview(), $_el09ksxsje4c0myu.hasKey(formats.expansions, getValue$4(k)));
    })), memMenuThunk, false);
    var submenus = $_czbu3jx0je4c0muh.map(formats.menus, function (menuItems, menuName) {
      var items = $_9880jxwsje4c0mtn.map(menuItems, function (item) {
        return makeItem(getValue$4(item), item.title, item.isSelected !== undefined ? item.isSelected() : false, item.getPreview !== undefined ? item.getPreview() : '', $_el09ksxsje4c0myu.hasKey(formats.expansions, getValue$4(item)));
      });
      return makeMenu(menuName, items, memMenuThunk, true);
    });
    var menus = $_55zfs1wyje4c0mue.deepMerge(submenus, $_el09ksxsje4c0myu.wrap('styles', mainMenu));
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
        classes: isMenu ? [$_chdthezeje4c0nap.resolve('styles-item-is-menu')] : []
      },
      toggling: {
        toggleOnExecute: false,
        toggleClass: $_chdthezeje4c0nap.resolve('format-matches'),
        selected: selected
      },
      itemBehaviours: $_bi2douy2je4c0n0f.derive(isMenu ? [] : [$_9yraw2zdje4c0naj.format(value, function (comp, status) {
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
            classes: [$_chdthezeje4c0nap.resolve('styles-collapser')]
          },
          components: collapsable ? [
            {
              dom: {
                tag: 'span',
                classes: [$_chdthezeje4c0nap.resolve('styles-collapse-icon')]
              }
            },
            $_dzdkrz12tje4c0o45.text(value)
          ] : [$_dzdkrz12tje4c0o45.text(value)],
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
            classes: [$_chdthezeje4c0nap.resolve('styles-menu-items-container')]
          },
          components: [Menu.parts().items({})],
          behaviours: $_bi2douy2je4c0n0f.derive([$_d6mgrm126je4c0nxv.config('adhoc-scrollable-menu', [
              $_86uglly4je4c0n1n.runOnAttached(function (component, simulatedEvent) {
                $_81jggk103je4c0nf6.set(component.element(), 'overflow-y', 'auto');
                $_81jggk103je4c0nf6.set(component.element(), '-webkit-overflow-scrolling', 'touch');
                $_1xck6b13uje4c0ohd.register(component.element());
              }),
              $_86uglly4je4c0n1n.runOnDetached(function (component) {
                $_81jggk103je4c0nf6.remove(component.element(), 'overflow-y');
                $_81jggk103je4c0nf6.remove(component.element(), '-webkit-overflow-scrolling');
                $_1xck6b13uje4c0ohd.deregister(component.element());
              })
            ])])
        }
      ],
      items: items,
      menuBehaviours: $_bi2douy2je4c0n0f.derive([Transitioning.config({
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
    var memMenu = $_6d7e9k11rje4c0nuv.record(TieredMenu.sketch({
      dom: {
        tag: 'div',
        classes: [$_chdthezeje4c0nap.resolve('styles-menu')]
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
        var w = $_eze8yo11kje4c0nt6.get(container.element());
        $_eze8yo11kje4c0nt6.set(menu.element(), w);
        Transitioning.jumpTo(menu, 'current');
      },
      onOpenSubmenu: function (container, item, submenu) {
        var w = $_eze8yo11kje4c0nt6.get(container.element());
        var menu = $_bntfp0zxje4c0ne8.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var menuComp = container.getSystem().getByDom(menu).getOrDie();
        $_eze8yo11kje4c0nt6.set(submenu.element(), w);
        Transitioning.progressTo(menuComp, 'before');
        Transitioning.jumpTo(submenu, 'after');
        Transitioning.progressTo(submenu, 'current');
      },
      onCollapseMenu: function (container, item, menu) {
        var submenu = $_bntfp0zxje4c0ne8.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var submenuComp = container.getSystem().getByDom(submenu).getOrDie();
        Transitioning.progressTo(submenuComp, 'after');
        Transitioning.progressTo(menu, 'current');
      },
      navigateOnHover: false,
      openImmediately: true,
      data: dataset.tmenu,
      markers: {
        backgroundMenu: $_chdthezeje4c0nap.resolve('styles-background-menu'),
        menu: $_chdthezeje4c0nap.resolve('styles-menu'),
        selectedMenu: $_chdthezeje4c0nap.resolve('styles-selected-menu'),
        item: $_chdthezeje4c0nap.resolve('styles-item'),
        selectedItem: $_chdthezeje4c0nap.resolve('styles-selected-item')
      }
    }));
    return memMenu.asSpec();
  };
  var $_fvc8na12sje4c0o2p = { sketch: sketch$9 };

  var getFromExpandingItem = function (item) {
    var newItem = $_55zfs1wyje4c0mue.deepMerge($_el09ksxsje4c0myu.exclude(item, ['items']), { menu: true });
    var rest = expand(item.items);
    var newMenus = $_55zfs1wyje4c0mue.deepMerge(rest.menus, $_el09ksxsje4c0myu.wrap(item.title, rest.items));
    var newExpansions = $_55zfs1wyje4c0mue.deepMerge(rest.expansions, $_el09ksxsje4c0myu.wrap(item.title, item.title));
    return {
      item: newItem,
      menus: newMenus,
      expansions: newExpansions
    };
  };
  var getFromItem = function (item) {
    return $_el09ksxsje4c0myu.hasKey(item, 'items') ? getFromExpandingItem(item) : {
      item: item,
      menus: {},
      expansions: {}
    };
  };
  var expand = function (items) {
    return $_9880jxwsje4c0mtn.foldr(items, function (acc, item) {
      var newData = getFromItem(item);
      return {
        menus: $_55zfs1wyje4c0mue.deepMerge(acc.menus, newData.menus),
        items: [newData.item].concat(acc.items),
        expansions: $_55zfs1wyje4c0mue.deepMerge(acc.expansions, newData.expansions)
      };
    }, {
      menus: {},
      expansions: {},
      items: []
    });
  };
  var $_6vrq0q13vje4c0ohk = { expand: expand };

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
      return $_55zfs1wyje4c0mue.deepMerge(item, {
        isSelected: isSelectedFor(item.format),
        getPreview: getPreview(item.format)
      });
    };
    var enrichMenu = function (item) {
      return $_55zfs1wyje4c0mue.deepMerge(item, {
        isSelected: $_82nexzwjje4c0mss.constant(false),
        getPreview: $_82nexzwjje4c0mss.constant('')
      });
    };
    var enrichCustom = function (item) {
      var formatName = $_e3nt9m10rje4c0nm2.generate(item.title);
      var newItem = $_55zfs1wyje4c0mue.deepMerge(item, {
        format: formatName,
        isSelected: isSelectedFor(formatName),
        getPreview: getPreview(formatName)
      });
      editor.formatter.register(formatName, newItem);
      return newItem;
    };
    var formats = $_el09ksxsje4c0myu.readOptFrom(settings, 'style_formats').getOr(DefaultStyleFormats);
    var doEnrich = function (items) {
      return $_9880jxwsje4c0mtn.map(items, function (item) {
        if ($_el09ksxsje4c0myu.hasKey(item, 'items')) {
          var newItems = doEnrich(item.items);
          return $_55zfs1wyje4c0mue.deepMerge(enrichMenu(item), { items: newItems });
        } else if ($_el09ksxsje4c0myu.hasKey(item, 'format')) {
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
      return $_9880jxwsje4c0mtn.bind(items, function (item) {
        if (item.items !== undefined) {
          var newItems = doPrune(item.items);
          return newItems.length > 0 ? [item] : [];
        } else {
          var keep = $_el09ksxsje4c0myu.hasKey(item, 'format') ? editor.formatter.canApply(item.format) : true;
          return keep ? [item] : [];
        }
      });
    };
    var prunedItems = doPrune(formats);
    return $_6vrq0q13vje4c0ohk.expand(prunedItems);
  };
  var ui = function (editor, formats, onDone) {
    var pruned = prune(editor, formats);
    return $_fvc8na12sje4c0o2p.sketch({
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
  var $_906apc12qje4c0o27 = {
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
    return $_9880jxwsje4c0mtn.bind(toolbar, function (item) {
      return $_85ige4wzje4c0muf.isArray(item) ? identifyFromArray(item) : extract$1(item);
    });
  };
  var identify = function (settings) {
    var toolbar = settings.toolbar !== undefined ? settings.toolbar : defaults;
    return $_85ige4wzje4c0muf.isArray(toolbar) ? identifyFromArray(toolbar) : extract$1(toolbar);
  };
  var setup = function (realm, editor) {
    var commandSketch = function (name) {
      return function () {
        return $_ehma3qzfje4c0nau.forToolbarCommand(editor, name);
      };
    };
    var stateCommandSketch = function (name) {
      return function () {
        return $_ehma3qzfje4c0nau.forToolbarStateCommand(editor, name);
      };
    };
    var actionSketch = function (name, query, action) {
      return function () {
        return $_ehma3qzfje4c0nau.forToolbarStateAction(editor, name, query, action);
      };
    };
    var undo = commandSketch('undo');
    var redo = commandSketch('redo');
    var bold = stateCommandSketch('bold');
    var italic = stateCommandSketch('italic');
    var underline = stateCommandSketch('underline');
    var removeformat = commandSketch('removeformat');
    var link = function () {
      return $_3in8ri121je4c0nw7.sketch(realm, editor);
    };
    var unlink = actionSketch('unlink', 'link', function () {
      editor.execCommand('unlink', null, false);
    });
    var image = function () {
      return $_8755o711qje4c0nuj.sketch(editor);
    };
    var bullist = actionSketch('unordered-list', 'ul', function () {
      editor.execCommand('InsertUnorderedList', null, false);
    });
    var numlist = actionSketch('ordered-list', 'ol', function () {
      editor.execCommand('InsertOrderedList', null, false);
    });
    var fontsizeselect = function () {
      return $_3s33v311mje4c0nta.sketch(realm, editor);
    };
    var forecolor = function () {
      return $_8l799l115je4c0nqa.sketch(realm, editor);
    };
    var styleFormats = $_906apc12qje4c0o27.register(editor, editor.settings);
    var styleFormatsMenu = function () {
      return $_906apc12qje4c0o27.ui(editor, styleFormats, function () {
        editor.fire('scrollIntoView');
      });
    };
    var styleselect = function () {
      return $_ehma3qzfje4c0nau.forToolbar('style-formats', function (button) {
        editor.fire('toReading');
        realm.dropup().appear(styleFormatsMenu, Toggling.on, button);
      }, $_bi2douy2je4c0n0f.derive([
        Toggling.config({
          toggleClass: $_chdthezeje4c0nap.resolve('toolbar-button-selected'),
          toggleOnExecute: false,
          aria: { mode: 'pressed' }
        }),
        Receiving.config({
          channels: $_el09ksxsje4c0myu.wrapAll([
            $_9yraw2zdje4c0naj.receive($_30j9u8z1je4c0n7k.orientationChanged(), Toggling.off),
            $_9yraw2zdje4c0naj.receive($_30j9u8z1je4c0n7k.dropupDismissed(), Toggling.off)
          ])
        })
      ]));
    };
    var feature = function (prereq, sketch) {
      return {
        isSupported: function () {
          return prereq.forall(function (p) {
            return $_el09ksxsje4c0myu.hasKey(editor.buttons, p);
          });
        },
        sketch: sketch
      };
    };
    return {
      undo: feature(Option.none(), undo),
      redo: feature(Option.none(), redo),
      bold: feature(Option.none(), bold),
      italic: feature(Option.none(), italic),
      underline: feature(Option.none(), underline),
      removeformat: feature(Option.none(), removeformat),
      link: feature(Option.none(), link),
      unlink: feature(Option.none(), unlink),
      image: feature(Option.none(), image),
      bullist: feature(Option.some('bullist'), bullist),
      numlist: feature(Option.some('numlist'), numlist),
      fontsizeselect: feature(Option.none(), fontsizeselect),
      forecolor: feature(Option.none(), forecolor),
      styleselect: feature(Option.none(), styleselect)
    };
  };
  var detect$4 = function (settings, features) {
    var itemNames = identify(settings);
    var present = {};
    return $_9880jxwsje4c0mtn.bind(itemNames, function (iName) {
      var r = !$_el09ksxsje4c0myu.hasKey(present, iName) && $_el09ksxsje4c0myu.hasKey(features, iName) && features[iName].isSupported() ? [features[iName].sketch()] : [];
      present[iName] = true;
      return r;
    });
  };
  var $_9tt2e6z2je4c0n7o = {
    identify: identify,
    setup: setup,
    detect: detect$4
  };

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_82nexzwjje4c0mss.constant(target),
      'x': $_82nexzwjje4c0mss.constant(x),
      'y': $_82nexzwjje4c0mss.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_82nexzwjje4c0mss.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_gba6fcxfje4c0mwy.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_82nexzwjje4c0mss.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_82nexzwjje4c0mss.curry(unbind, element, event, wrapped, useCapture) };
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
  var $_eqwsmy13yje4c0oi1 = {
    bind: bind$1,
    capture: capture
  };

  var filter$1 = $_82nexzwjje4c0mss.constant(true);
  var bind$2 = function (element, event, handler) {
    return $_eqwsmy13yje4c0oi1.bind(element, event, filter$1, handler);
  };
  var capture$1 = function (element, event, handler) {
    return $_eqwsmy13yje4c0oi1.capture(element, event, filter$1, handler);
  };
  var $_5mzaiz13xje4c0ohy = {
    bind: bind$2,
    capture: capture$1
  };

  var INTERVAL = 50;
  var INSURANCE = 1000 / INTERVAL;
  var get$11 = function (outerWindow) {
    var isPortrait = outerWindow.matchMedia('(orientation: portrait)').matches;
    return { isPortrait: $_82nexzwjje4c0mss.constant(isPortrait) };
  };
  var getActualWidth = function (outerWindow) {
    var isIos = $_3ye61iwkje4c0msu.detect().os.isiOS();
    var isPortrait = get$11(outerWindow).isPortrait();
    return isIos && !isPortrait ? outerWindow.screen.height : outerWindow.screen.width;
  };
  var onChange = function (outerWindow, listeners) {
    var win = $_gba6fcxfje4c0mwy.fromDom(outerWindow);
    var poller = null;
    var change = function () {
      clearInterval(poller);
      var orientation = get$11(outerWindow);
      listeners.onChange(orientation);
      onAdjustment(function () {
        listeners.onReady(orientation);
      });
    };
    var orientationHandle = $_5mzaiz13xje4c0ohy.bind(win, 'orientationchange', change);
    var onAdjustment = function (f) {
      clearInterval(poller);
      var flag = outerWindow.innerHeight;
      var insurance = 0;
      poller = setInterval(function () {
        if (flag !== outerWindow.innerHeight) {
          clearInterval(poller);
          f(Option.some(outerWindow.innerHeight));
        } else if (insurance > INSURANCE) {
          clearInterval(poller);
          f(Option.none());
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
  var $_bzeoko13wje4c0ohq = {
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
      return Option.none();
    return Option.some(event.raw().touches[0]);
  };
  var isFarEnough = function (touch, data) {
    var distX = Math.abs(touch.clientX - data.x());
    var distY = Math.abs(touch.clientY - data.y());
    return distX > SIGNIFICANT_MOVE || distY > SIGNIFICANT_MOVE;
  };
  var monitor = function (settings) {
    var startData = Cell(Option.none());
    var longpress = DelayedFunction(function (event) {
      startData.set(Option.none());
      settings.triggerEvent($_270al8whje4c0msc.longpress(), event);
    }, LONGPRESS_DELAY);
    var handleTouchstart = function (event) {
      getTouch(event).each(function (touch) {
        longpress.cancel();
        var data = {
          x: $_82nexzwjje4c0mss.constant(touch.clientX),
          y: $_82nexzwjje4c0mss.constant(touch.clientY),
          target: event.target
        };
        longpress.schedule(data);
        startData.set(Option.some(data));
      });
      return Option.none();
    };
    var handleTouchmove = function (event) {
      longpress.cancel();
      getTouch(event).each(function (touch) {
        startData.get().each(function (data) {
          if (isFarEnough(touch, data))
            startData.set(Option.none());
        });
      });
      return Option.none();
    };
    var handleTouchend = function (event) {
      longpress.cancel();
      var isSame = function (data) {
        return $_diemerx9je4c0mw0.eq(data.target(), event.target());
      };
      return startData.get().filter(isSame).map(function (data) {
        return settings.triggerEvent($_270al8whje4c0msc.tap(), event);
      });
    };
    var handlers = $_el09ksxsje4c0myu.wrapAll([
      {
        key: $_2j5gqiwije4c0msm.touchstart(),
        value: handleTouchstart
      },
      {
        key: $_2j5gqiwije4c0msm.touchmove(),
        value: handleTouchmove
      },
      {
        key: $_2j5gqiwije4c0msm.touchend(),
        value: handleTouchend
      }
    ]);
    var fireIfReady = function (event, type) {
      return $_el09ksxsje4c0myu.readOptFrom(handlers, type).bind(function (handler) {
        return handler(event);
      });
    };
    return { fireIfReady: fireIfReady };
  };
  var $_1qjxea144je4c0oj9 = { monitor: monitor };

  var monitor$1 = function (editorApi) {
    var tapEvent = $_1qjxea144je4c0oj9.monitor({
      triggerEvent: function (type, evt) {
        editorApi.onTapContent(evt);
      }
    });
    var onTouchend = function () {
      return $_5mzaiz13xje4c0ohy.bind(editorApi.body(), 'touchend', function (evt) {
        tapEvent.fireIfReady(evt, 'touchend');
      });
    };
    var onTouchmove = function () {
      return $_5mzaiz13xje4c0ohy.bind(editorApi.body(), 'touchmove', function (evt) {
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
  var $_gh7jpw143je4c0oj4 = { monitor: monitor$1 };

  var isAndroid6 = $_3ye61iwkje4c0msu.detect().os.version.major >= 6;
  var initEvents = function (editorApi, toolstrip, alloy) {
    var tapping = $_gh7jpw143je4c0oj4.monitor(editorApi);
    var outerDoc = $_a90a93x3je4c0mv1.owner(toolstrip);
    var isRanged = function (sel) {
      return !$_diemerx9je4c0mw0.eq(sel.start(), sel.finish()) || sel.soffset() !== sel.foffset();
    };
    var hasRangeInUi = function () {
      return $_30zd9eytje4c0n6v.active(outerDoc).filter(function (input) {
        return $_2wng6bxkje4c0mxf.name(input) === 'input';
      }).exists(function (input) {
        return input.dom().selectionStart !== input.dom().selectionEnd;
      });
    };
    var updateMargin = function () {
      var rangeInContent = editorApi.doc().dom().hasFocus() && editorApi.getSelection().exists(isRanged);
      alloy.getByDom(toolstrip).each((rangeInContent || hasRangeInUi()) === true ? Toggling.on : Toggling.off);
    };
    var listeners = [
      $_5mzaiz13xje4c0ohy.bind(editorApi.body(), 'touchstart', function (evt) {
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_5mzaiz13xje4c0ohy.bind(toolstrip, 'touchstart', function (evt) {
        editorApi.onTouchToolstrip();
      }),
      editorApi.onToReading(function () {
        $_30zd9eytje4c0n6v.blur(editorApi.body());
      }),
      editorApi.onToEditing($_82nexzwjje4c0mss.noop),
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
      $_5mzaiz13xje4c0ohy.bind($_gba6fcxfje4c0mwy.fromDom(editorApi.win()), 'blur', function () {
        alloy.getByDom(toolstrip).each(Toggling.off);
      }),
      $_5mzaiz13xje4c0ohy.bind(outerDoc, 'select', updateMargin),
      $_5mzaiz13xje4c0ohy.bind(editorApi.doc(), 'selectionchange', updateMargin)
    ]);
    var destroy = function () {
      $_9880jxwsje4c0mtn.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_fi5u3z142je4c0oiq = { initEvents: initEvents };

  var safeParse = function (element, attribute) {
    var parsed = parseInt($_f4kg3zxrje4c0myl.get(element, attribute), 10);
    return isNaN(parsed) ? 0 : parsed;
  };
  var $_e9101n147je4c0ojw = { safeParse: safeParse };

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
        return Option.none();
      }
    };
    var getOptionSafe = function (element) {
      return is(element) ? Option.from(element.dom().nodeValue) : Option.none();
    };
    var browser = $_3ye61iwkje4c0msu.detect().browser;
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

  var api$3 = NodeValue($_2wng6bxkje4c0mxf.isText, 'text');
  var get$12 = function (element) {
    return api$3.get(element);
  };
  var getOption = function (element) {
    return api$3.getOption(element);
  };
  var set$8 = function (element, value) {
    api$3.set(element, value);
  };
  var $_dn0ry714aje4c0okg = {
    get: get$12,
    getOption: getOption,
    set: set$8
  };

  var getEnd = function (element) {
    return $_2wng6bxkje4c0mxf.name(element) === 'img' ? 1 : $_dn0ry714aje4c0okg.getOption(element).fold(function () {
      return $_a90a93x3je4c0mv1.children(element).length;
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
    return $_dn0ry714aje4c0okg.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_9880jxwsje4c0mtn.contains(elementsWithCursorPosition, $_2wng6bxkje4c0mxf.name(elem));
  };
  var $_5qhlg2149je4c0okd = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var adt$4 = $_14nfsrxwje4c0mzb.generate([
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
    return situ.fold($_82nexzwjje4c0mss.identity, $_82nexzwjje4c0mss.identity, $_82nexzwjje4c0mss.identity);
  };
  var $_1t1vyf14dje4c0oks = {
    before: adt$4.before,
    on: adt$4.on,
    after: adt$4.after,
    cata: cata,
    getStart: getStart
  };

  var type$1 = $_14nfsrxwje4c0mzb.generate([
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
  var range$1 = $_30d3z5x4je4c0mvj.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$1.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart$1 = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_gba6fcxfje4c0mwy.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_1t1vyf14dje4c0oks.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart$1(selection);
    return $_a90a93x3je4c0mv1.defaultView(start);
  };
  var $_cr39q14cje4c0oko = {
    domRange: type$1.domRange,
    relative: type$1.relative,
    exact: type$1.exact,
    exactFromRange: exactFromRange,
    range: range$1,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_a90a93x3je4c0mv1.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_gba6fcxfje4c0mwy.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_diemerx9je4c0mw0.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_ga4tg314fje4c0ol7 = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_9880jxwsje4c0mtn.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_gba6fcxfje4c0mwy.fromDom(fragment);
  };
  var $_5z1myc14gje4c0ol8 = { fromElements: fromElements };

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
    return $_gba6fcxfje4c0mwy.fromDom(fragment);
  };
  var toRect = function (rect) {
    return {
      left: $_82nexzwjje4c0mss.constant(rect.left),
      top: $_82nexzwjje4c0mss.constant(rect.top),
      right: $_82nexzwjje4c0mss.constant(rect.right),
      bottom: $_82nexzwjje4c0mss.constant(rect.bottom),
      width: $_82nexzwjje4c0mss.constant(rect.width),
      height: $_82nexzwjje4c0mss.constant(rect.height)
    };
  };
  var getFirstRect = function (rng) {
    var rects = rng.getClientRects();
    var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect) : Option.none();
  };
  var getBounds = function (rng) {
    var rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect) : Option.none();
  };
  var toString$1 = function (rng) {
    return rng.toString();
  };
  var $_1trhvs14hje4c0olb = {
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

  var adt$5 = $_14nfsrxwje4c0mzb.generate([
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
    return type($_gba6fcxfje4c0mwy.fromDom(range.startContainer), range.startOffset, $_gba6fcxfje4c0mwy.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_82nexzwjje4c0mss.constant(rng),
          rtl: Option.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_nse44wlje4c0msw.cached(function () {
            return $_1trhvs14hje4c0olb.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_nse44wlje4c0msw.cached(function () {
            return Option.some($_1trhvs14hje4c0olb.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_nse44wlje4c0msw.cached(function () {
            return $_1trhvs14hje4c0olb.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_nse44wlje4c0msw.cached(function () {
            return Option.some($_1trhvs14hje4c0olb.exactToNative(win, finish, foffset, start, soffset));
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
        return adt$5.rtl($_gba6fcxfje4c0mwy.fromDom(rev.endContainer), rev.endOffset, $_gba6fcxfje4c0mwy.fromDom(rev.startContainer), rev.startOffset);
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
  var $_9x658v14ije4c0oli = {
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
  var $_27vjh414lje4c0om0 = {
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
    var length = $_dn0ry714aje4c0okg.get(textnode).length;
    var offset = $_27vjh414lje4c0om0.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate$1 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_ce73q4y0je4c0n0c.findMap(rects, function (rect) {
      return $_27vjh414lje4c0om0.inRect(rect, x, y) ? Option.some(rect) : Option.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_1gmlwz14mje4c0om1 = { locate: locate$1 };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_a90a93x3je4c0mv1.children(node);
    return $_ce73q4y0je4c0n0c.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_27vjh414lje4c0om0.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : Option.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_2wng6bxkje4c0mxf.isText(node) ? $_1gmlwz14mje4c0om1.locate : searchInChildren;
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
  var $_2pe4c314kje4c0olu = { locate: locate$2 };

  var first$3 = function (element) {
    return $_1dgvyfyvje4c0n73.descendant(element, $_5qhlg2149je4c0okd.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_5qhlg2149je4c0okd.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_a90a93x3je4c0mv1.children(element);
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (predicate(child))
          return Option.some(child);
        var res = descend(child);
        if (res.isSome())
          return res;
      }
      return Option.none();
    };
    return descend(scope);
  };
  var $_9dozed14oje4c0om9 = {
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
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_9dozed14oje4c0om9.first : $_9dozed14oje4c0om9.last;
    return f(node).map(function (target) {
      return createCollapsedNode(doc, target, collapseDirection);
    });
  };
  var locateInEmpty = function (doc, node, x) {
    var rect = node.dom().getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    return Option.some(createCollapsedNode(doc, node, collapseDirection));
  };
  var search$1 = function (doc, node, x) {
    var f = $_a90a93x3je4c0mv1.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_fxzqnx14nje4c0om6 = { search: search$1 };

  var caretPositionFromPoint = function (doc, x, y) {
    return Option.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
      if (pos.offsetNode === null)
        return Option.none();
      var r = doc.dom().createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse();
      return Option.some(r);
    });
  };
  var caretRangeFromPoint = function (doc, x, y) {
    return Option.from(doc.dom().caretRangeFromPoint(x, y));
  };
  var searchTextNodes = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return $_2pe4c314kje4c0olu.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_gba6fcxfje4c0mwy.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_fxzqnx14nje4c0om6.search(doc, elem, x);
      };
      return $_a90a93x3je4c0mv1.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_gba6fcxfje4c0mwy.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_cr39q14cje4c0oko.range($_gba6fcxfje4c0mwy.fromDom(rng.startContainer), rng.startOffset, $_gba6fcxfje4c0mwy.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_3jtkt214jje4c0olr = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_1trhvs14hje4c0olb.create(win);
    var self = $_601jqgxeje4c0mwp.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_43odwmzvje4c0ne4.descendants(ancestor, selector));
    return $_9880jxwsje4c0mtn.filter(elements, function (elem) {
      $_1trhvs14hje4c0olb.selectNodeContentsUsing(innerRange, elem);
      return $_1trhvs14hje4c0olb.isWithin(outerRange, innerRange);
    });
  };
  var find$4 = function (win, selection, selector) {
    var outerRange = $_9x658v14ije4c0oli.asLtrRange(win, selection);
    var ancestor = $_gba6fcxfje4c0mwy.fromDom(outerRange.commonAncestorContainer);
    return $_2wng6bxkje4c0mxf.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_dyysuj14pje4c0omd = { find: find$4 };

  var beforeSpecial = function (element, offset) {
    var name = $_2wng6bxkje4c0mxf.name(element);
    if ('input' === name)
      return $_1t1vyf14dje4c0oks.after(element);
    else if (!$_9880jxwsje4c0mtn.contains([
        'br',
        'img'
      ], name))
      return $_1t1vyf14dje4c0oks.on(element, offset);
    else
      return offset === 0 ? $_1t1vyf14dje4c0oks.before(element) : $_1t1vyf14dje4c0oks.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_1t1vyf14dje4c0oks.before, beforeSpecial, $_1t1vyf14dje4c0oks.after);
    var finish = finishSitu.fold($_1t1vyf14dje4c0oks.before, beforeSpecial, $_1t1vyf14dje4c0oks.after);
    return $_cr39q14cje4c0oko.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_cr39q14cje4c0oko.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_gba6fcxfje4c0mwy.fromDom(rng.startContainer);
        var finish = $_gba6fcxfje4c0mwy.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_3dfsgv14qje4c0oml = {
    beforeSpecial: beforeSpecial,
    preprocess: preprocess,
    preprocessRelative: preprocessRelative,
    preprocessExact: preprocessExact
  };

  var doSetNativeRange = function (win, rng) {
    Option.from(win.getSelection()).each(function (selection) {
      selection.removeAllRanges();
      selection.addRange(rng);
    });
  };
  var doSetRange = function (win, start, soffset, finish, foffset) {
    var rng = $_1trhvs14hje4c0olb.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_dyysuj14pje4c0omd.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_9x658v14ije4c0oli.diagnose(win, relative).match({
      ltr: function (start, soffset, finish, foffset) {
        doSetRange(win, start, soffset, finish, foffset);
      },
      rtl: function (start, soffset, finish, foffset) {
        var selection = win.getSelection();
        if (selection.setBaseAndExtent) {
          selection.setBaseAndExtent(start.dom(), soffset, finish.dom(), foffset);
        } else if (selection.extend) {
          selection.collapse(start.dom(), soffset);
          selection.extend(finish.dom(), foffset);
        } else {
          doSetRange(win, finish, foffset, start, soffset);
        }
      }
    });
  };
  var setExact = function (win, start, soffset, finish, foffset) {
    var relative = $_3dfsgv14qje4c0oml.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_3dfsgv14qje4c0oml.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_cr39q14cje4c0oko.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_1trhvs14hje4c0olb.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_3dfsgv14qje4c0oml.preprocess(selection);
    return $_9x658v14ije4c0oli.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return Option.some($_cr39q14cje4c0oko.range($_gba6fcxfje4c0mwy.fromDom(firstRng.startContainer), firstRng.startOffset, $_gba6fcxfje4c0mwy.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return Option.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_gba6fcxfje4c0mwy.fromDom(selection.anchorNode);
    var focusNode = $_gba6fcxfje4c0mwy.fromDom(selection.focusNode);
    return $_ga4tg314fje4c0ol7.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? Option.some($_cr39q14cje4c0oko.range($_gba6fcxfje4c0mwy.fromDom(selection.anchorNode), selection.anchorOffset, $_gba6fcxfje4c0mwy.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_1trhvs14hje4c0olb.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_1trhvs14hje4c0olb.selectNodeContents(win, element);
    return $_cr39q14cje4c0oko.range($_gba6fcxfje4c0mwy.fromDom(rng.startContainer), rng.startOffset, $_gba6fcxfje4c0mwy.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : Option.none();
  };
  var get$13 = function (win) {
    return getExact(win).map(function (range) {
      return $_cr39q14cje4c0oko.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect$1 = function (win, selection) {
    var rng = $_9x658v14ije4c0oli.asLtrRange(win, selection);
    return $_1trhvs14hje4c0olb.getFirstRect(rng);
  };
  var getBounds$1 = function (win, selection) {
    var rng = $_9x658v14ije4c0oli.asLtrRange(win, selection);
    return $_1trhvs14hje4c0olb.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_3jtkt214jje4c0olr.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_9x658v14ije4c0oli.asLtrRange(win, selection);
    return $_1trhvs14hje4c0olb.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$3 = function (win, selection) {
    var rng = $_9x658v14ije4c0oli.asLtrRange(win, selection);
    return $_1trhvs14hje4c0olb.cloneFragment(rng);
  };
  var replace = function (win, selection, elements) {
    var rng = $_9x658v14ije4c0oli.asLtrRange(win, selection);
    var fragment = $_5z1myc14gje4c0ol8.fromElements(elements, win.document);
    $_1trhvs14hje4c0olb.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_9x658v14ije4c0oli.asLtrRange(win, selection);
    $_1trhvs14hje4c0olb.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_diemerx9je4c0mw0.eq(start, finish) && soffset === foffset;
  };
  var $_v5o0c14eje4c0okx = {
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
      width: $_82nexzwjje4c0mss.constant(COLLAPSED_WIDTH),
      height: rect.height
    };
  };
  var toRect$1 = function (rawRect) {
    return {
      left: $_82nexzwjje4c0mss.constant(rawRect.left),
      top: $_82nexzwjje4c0mss.constant(rawRect.top),
      right: $_82nexzwjje4c0mss.constant(rawRect.right),
      bottom: $_82nexzwjje4c0mss.constant(rawRect.bottom),
      width: $_82nexzwjje4c0mss.constant(rawRect.width),
      height: $_82nexzwjje4c0mss.constant(rawRect.height)
    };
  };
  var getRectsFromRange = function (range) {
    if (!range.collapsed) {
      return $_9880jxwsje4c0mtn.map(range.getClientRects(), toRect$1);
    } else {
      var start_1 = $_gba6fcxfje4c0mwy.fromDom(range.startContainer);
      return $_a90a93x3je4c0mv1.parent(start_1).bind(function (parent) {
        var selection = $_cr39q14cje4c0oko.exact(start_1, range.startOffset, parent, $_5qhlg2149je4c0okd.getEnd(parent));
        var optRect = $_v5o0c14eje4c0okx.getFirstRect(range.startContainer.ownerDocument.defaultView, selection);
        return optRect.map(collapsedRect).map($_9880jxwsje4c0mtn.pure);
      }).getOr([]);
    }
  };
  var getRectangles = function (cWin) {
    var sel = cWin.getSelection();
    return sel !== undefined && sel.rangeCount > 0 ? getRectsFromRange(sel.getRangeAt(0)) : [];
  };
  var $_bzh5ez148je4c0ojz = { getRectangles: getRectangles };

  var autocompleteHack = function () {
    return function (f) {
      setTimeout(function () {
        f();
      }, 0);
    };
  };
  var resume = function (cWin) {
    cWin.focus();
    var iBody = $_gba6fcxfje4c0mwy.fromDom(cWin.document.body);
    var inInput = $_30zd9eytje4c0n6v.active().exists(function (elem) {
      return $_9880jxwsje4c0mtn.contains([
        'input',
        'textarea'
      ], $_2wng6bxkje4c0mxf.name(elem));
    });
    var transaction = inInput ? autocompleteHack() : $_82nexzwjje4c0mss.apply;
    transaction(function () {
      $_30zd9eytje4c0n6v.active().each($_30zd9eytje4c0n6v.blur);
      $_30zd9eytje4c0n6v.focus(iBody);
    });
  };
  var $_d14k0s14rje4c0omr = { resume: resume };

  var EXTRA_SPACING = 50;
  var data = 'data-' + $_chdthezeje4c0nap.resolve('last-outer-height');
  var setLastHeight = function (cBody, value) {
    $_f4kg3zxrje4c0myl.set(cBody, data, value);
  };
  var getLastHeight = function (cBody) {
    return $_e9101n147je4c0ojw.safeParse(cBody, data);
  };
  var getBoundsFrom = function (rect) {
    return {
      top: $_82nexzwjje4c0mss.constant(rect.top()),
      bottom: $_82nexzwjje4c0mss.constant(rect.top() + rect.height())
    };
  };
  var getBounds$2 = function (cWin) {
    var rects = $_bzh5ez148je4c0ojz.getRectangles(cWin);
    return rects.length > 0 ? Option.some(rects[0]).map(getBoundsFrom) : Option.none();
  };
  var findDelta = function (outerWindow, cBody) {
    var last = getLastHeight(cBody);
    var current = outerWindow.innerHeight;
    return last > current ? Option.some(last - current) : Option.none();
  };
  var calculate = function (cWin, bounds, delta) {
    var isOutside = bounds.top() > cWin.innerHeight || bounds.bottom() > cWin.innerHeight;
    return isOutside ? Math.min(delta, bounds.bottom() - cWin.innerHeight + EXTRA_SPACING) : 0;
  };
  var setup$1 = function (outerWindow, cWin) {
    var cBody = $_gba6fcxfje4c0mwy.fromDom(cWin.document.body);
    var toEditing = function () {
      $_d14k0s14rje4c0omr.resume(cWin);
    };
    var onResize = $_5mzaiz13xje4c0ohy.bind($_gba6fcxfje4c0mwy.fromDom(outerWindow), 'resize', function () {
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
  var $_f0hxhn146je4c0ojm = { setup: setup$1 };

  var getBodyFromFrame = function (frame) {
    return Option.some($_gba6fcxfje4c0mwy.fromDom(frame.dom().contentWindow.document.body));
  };
  var getDocFromFrame = function (frame) {
    return Option.some($_gba6fcxfje4c0mwy.fromDom(frame.dom().contentWindow.document));
  };
  var getWinFromFrame = function (frame) {
    return Option.from(frame.dom().contentWindow);
  };
  var getSelectionFromFrame = function (frame) {
    var optWin = getWinFromFrame(frame);
    return optWin.bind($_v5o0c14eje4c0okx.getExact);
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
        return $_5mzaiz13xje4c0ohy.bind(doc, type, handler);
      };
    });
  };
  var toRect$2 = function (rect) {
    return {
      left: $_82nexzwjje4c0mss.constant(rect.left),
      top: $_82nexzwjje4c0mss.constant(rect.top),
      right: $_82nexzwjje4c0mss.constant(rect.right),
      bottom: $_82nexzwjje4c0mss.constant(rect.bottom),
      width: $_82nexzwjje4c0mss.constant(rect.width),
      height: $_82nexzwjje4c0mss.constant(rect.height)
    };
  };
  var getActiveApi = function (editor) {
    var frame = getFrame(editor);
    var tryFallbackBox = function (win) {
      var isCollapsed = function (sel) {
        return $_diemerx9je4c0mw0.eq(sel.start(), sel.finish()) && sel.soffset() === sel.foffset();
      };
      var toStartRect = function (sel) {
        var rect = sel.start().dom().getBoundingClientRect();
        return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect$2) : Option.none();
      };
      return $_v5o0c14eje4c0okx.getExact(win).filter(isCollapsed).bind(toStartRect);
    };
    return getBodyFromFrame(frame).bind(function (body) {
      return getDocFromFrame(frame).bind(function (doc) {
        return getWinFromFrame(frame).map(function (win) {
          var html = $_gba6fcxfje4c0mwy.fromDom(doc.dom().documentElement);
          var getCursorBox = editor.getCursorBox.getOrThunk(function () {
            return function () {
              return $_v5o0c14eje4c0okx.get(win).bind(function (sel) {
                return $_v5o0c14eje4c0okx.getFirstRect(win, sel).orThunk(function () {
                  return tryFallbackBox(win);
                });
              });
            };
          });
          var setSelection = editor.setSelection.getOrThunk(function () {
            return function (start, soffset, finish, foffset) {
              $_v5o0c14eje4c0okx.setExact(win, start, soffset, finish, foffset);
            };
          });
          var clearSelection = editor.clearSelection.getOrThunk(function () {
            return function () {
              $_v5o0c14eje4c0okx.clear(win);
            };
          });
          return {
            body: $_82nexzwjje4c0mss.constant(body),
            doc: $_82nexzwjje4c0mss.constant(doc),
            win: $_82nexzwjje4c0mss.constant(win),
            html: $_82nexzwjje4c0mss.constant(html),
            getSelection: $_82nexzwjje4c0mss.curry(getSelectionFromFrame, frame),
            setSelection: setSelection,
            clearSelection: clearSelection,
            frame: $_82nexzwjje4c0mss.constant(frame),
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
  var $_etjh6v14sje4c0on2 = {
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
  var isAndroid = $_3ye61iwkje4c0msu.detect().os.isAndroid();
  var matchColor = function (editorBody) {
    var color = $_81jggk103je4c0nf6.get(editorBody, 'background-color');
    return color !== undefined && color !== '' ? 'background-color:' + color + '!important' : bgFallback;
  };
  var clobberStyles = function (container, editorBody) {
    var gatherSibilings = function (element) {
      var siblings = $_43odwmzvje4c0ne4.siblings(element, '*');
      return siblings;
    };
    var clobber = function (clobberStyle) {
      return function (element) {
        var styles = $_f4kg3zxrje4c0myl.get(element, 'style');
        var backup = styles === undefined ? 'no-styles' : styles.trim();
        if (backup === clobberStyle) {
          return;
        } else {
          $_f4kg3zxrje4c0myl.set(element, attr, backup);
          $_f4kg3zxrje4c0myl.set(element, 'style', clobberStyle);
        }
      };
    };
    var ancestors = $_43odwmzvje4c0ne4.ancestors(container, '*');
    var siblings = $_9880jxwsje4c0mtn.bind(ancestors, gatherSibilings);
    var bgColor = matchColor(editorBody);
    $_9880jxwsje4c0mtn.each(siblings, clobber(siblingStyles));
    $_9880jxwsje4c0mtn.each(ancestors, clobber(ancestorPosition + ancestorStyles + bgColor));
    var containerStyles = isAndroid === true ? '' : ancestorPosition;
    clobber(containerStyles + ancestorStyles + bgColor)(container);
  };
  var restoreStyles = function () {
    var clobberedEls = $_43odwmzvje4c0ne4.all('[' + attr + ']');
    $_9880jxwsje4c0mtn.each(clobberedEls, function (element) {
      var restore = $_f4kg3zxrje4c0myl.get(element, attr);
      if (restore !== 'no-styles') {
        $_f4kg3zxrje4c0myl.set(element, 'style', restore);
      } else {
        $_f4kg3zxrje4c0myl.remove(element, 'style');
      }
      $_f4kg3zxrje4c0myl.remove(element, attr);
    });
  };
  var $_683hru14tje4c0ond = {
    clobberStyles: clobberStyles,
    restoreStyles: restoreStyles
  };

  var tag = function () {
    var head = $_bntfp0zxje4c0ne8.first('head').getOrDie();
    var nu = function () {
      var meta = $_gba6fcxfje4c0mwy.fromTag('meta');
      $_f4kg3zxrje4c0myl.set(meta, 'name', 'viewport');
      $_1r9l60x2je4c0mux.append(head, meta);
      return meta;
    };
    var element = $_bntfp0zxje4c0ne8.first('meta[name="viewport"]').getOrThunk(nu);
    var backup = $_f4kg3zxrje4c0myl.get(element, 'content');
    var maximize = function () {
      $_f4kg3zxrje4c0myl.set(element, 'content', 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0');
    };
    var restore = function () {
      if (backup !== undefined && backup !== null && backup.length > 0) {
        $_f4kg3zxrje4c0myl.set(element, 'content', backup);
      } else {
        $_f4kg3zxrje4c0myl.set(element, 'content', 'user-scalable=yes');
      }
    };
    return {
      maximize: maximize,
      restore: restore
    };
  };
  var $_1810im14uje4c0oo1 = { tag: tag };

  var create$5 = function (platform, mask) {
    var meta = $_1810im14uje4c0oo1.tag();
    var androidApi = $_6vqdu212oje4c0o1z.api();
    var androidEvents = $_6vqdu212oje4c0o1z.api();
    var enter = function () {
      mask.hide();
      $_7xiz2yynje4c0n63.add(platform.container, $_chdthezeje4c0nap.resolve('fullscreen-maximized'));
      $_7xiz2yynje4c0n63.add(platform.container, $_chdthezeje4c0nap.resolve('android-maximized'));
      meta.maximize();
      $_7xiz2yynje4c0n63.add(platform.body, $_chdthezeje4c0nap.resolve('android-scroll-reload'));
      androidApi.set($_f0hxhn146je4c0ojm.setup(platform.win, $_etjh6v14sje4c0on2.getWin(platform.editor).getOrDie('no')));
      $_etjh6v14sje4c0on2.getActiveApi(platform.editor).each(function (editorApi) {
        $_683hru14tje4c0ond.clobberStyles(platform.container, editorApi.body());
        androidEvents.set($_fi5u3z142je4c0oiq.initEvents(editorApi, platform.toolstrip, platform.alloy));
      });
    };
    var exit = function () {
      meta.restore();
      mask.show();
      $_7xiz2yynje4c0n63.remove(platform.container, $_chdthezeje4c0nap.resolve('fullscreen-maximized'));
      $_7xiz2yynje4c0n63.remove(platform.container, $_chdthezeje4c0nap.resolve('android-maximized'));
      $_683hru14tje4c0ond.restoreStyles();
      $_7xiz2yynje4c0n63.remove(platform.body, $_chdthezeje4c0nap.resolve('android-scroll-reload'));
      androidEvents.clear();
      androidApi.clear();
    };
    return {
      enter: enter,
      exit: exit
    };
  };
  var $_2t4k2m141je4c0oik = { create: create$5 };

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
  var $_63somu14wje4c0oou = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var sketch$10 = function (onView, translate) {
    var memIcon = $_6d7e9k11rje4c0nuv.record(Container.sketch({
      dom: $_azzecm113je4c0npn.dom('<div aria-hidden="true" class="${prefix}-mask-tap-icon"></div>'),
      containerBehaviours: $_bi2douy2je4c0n0f.derive([Toggling.config({
          toggleClass: $_chdthezeje4c0nap.resolve('mask-tap-icon-selected'),
          toggleOnExecute: false
        })])
    }));
    var onViewThrottle = $_63somu14wje4c0oou.first(onView, 200);
    return Container.sketch({
      dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-disabled-mask"></div>'),
      components: [Container.sketch({
          dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-content-container"></div>'),
          components: [Button.sketch({
              dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-content-tap-section"></div>'),
              components: [memIcon.asSpec()],
              action: function (button) {
                onViewThrottle.throttle();
              },
              buttonBehaviours: $_bi2douy2je4c0n0f.derive([Toggling.config({ toggleClass: $_chdthezeje4c0nap.resolve('mask-tap-icon-selected') })])
            })]
        })]
    });
  };
  var $_57756b14vje4c0ook = { sketch: sketch$10 };

  var MobileSchema = $_98oa5zyeje4c0n4p.objOf([
    $_9mxze0y7je4c0n2h.strictObjOf('editor', [
      $_9mxze0y7je4c0n2h.strict('getFrame'),
      $_9mxze0y7je4c0n2h.option('getBody'),
      $_9mxze0y7je4c0n2h.option('getDoc'),
      $_9mxze0y7je4c0n2h.option('getWin'),
      $_9mxze0y7je4c0n2h.option('getSelection'),
      $_9mxze0y7je4c0n2h.option('setSelection'),
      $_9mxze0y7je4c0n2h.option('clearSelection'),
      $_9mxze0y7je4c0n2h.option('cursorSaver'),
      $_9mxze0y7je4c0n2h.option('onKeyup'),
      $_9mxze0y7je4c0n2h.option('onNodeChanged'),
      $_9mxze0y7je4c0n2h.option('getCursorBox'),
      $_9mxze0y7je4c0n2h.strict('onDomChanged'),
      $_9mxze0y7je4c0n2h.defaulted('onTouchContent', $_82nexzwjje4c0mss.noop),
      $_9mxze0y7je4c0n2h.defaulted('onTapContent', $_82nexzwjje4c0mss.noop),
      $_9mxze0y7je4c0n2h.defaulted('onTouchToolstrip', $_82nexzwjje4c0mss.noop),
      $_9mxze0y7je4c0n2h.defaulted('onScrollToCursor', $_82nexzwjje4c0mss.constant({ unbind: $_82nexzwjje4c0mss.noop })),
      $_9mxze0y7je4c0n2h.defaulted('onScrollToElement', $_82nexzwjje4c0mss.constant({ unbind: $_82nexzwjje4c0mss.noop })),
      $_9mxze0y7je4c0n2h.defaulted('onToEditing', $_82nexzwjje4c0mss.constant({ unbind: $_82nexzwjje4c0mss.noop })),
      $_9mxze0y7je4c0n2h.defaulted('onToReading', $_82nexzwjje4c0mss.constant({ unbind: $_82nexzwjje4c0mss.noop })),
      $_9mxze0y7je4c0n2h.defaulted('onToolbarScrollStart', $_82nexzwjje4c0mss.identity)
    ]),
    $_9mxze0y7je4c0n2h.strict('socket'),
    $_9mxze0y7je4c0n2h.strict('toolstrip'),
    $_9mxze0y7je4c0n2h.strict('dropup'),
    $_9mxze0y7je4c0n2h.strict('toolbar'),
    $_9mxze0y7je4c0n2h.strict('container'),
    $_9mxze0y7je4c0n2h.strict('alloy'),
    $_9mxze0y7je4c0n2h.state('win', function (spec) {
      return $_a90a93x3je4c0mv1.owner(spec.socket).dom().defaultView;
    }),
    $_9mxze0y7je4c0n2h.state('body', function (spec) {
      return $_gba6fcxfje4c0mwy.fromDom(spec.socket.dom().ownerDocument.body);
    }),
    $_9mxze0y7je4c0n2h.defaulted('translate', $_82nexzwjje4c0mss.identity),
    $_9mxze0y7je4c0n2h.defaulted('setReadOnly', $_82nexzwjje4c0mss.noop)
  ]);

  var produce = function (raw) {
    var mobile = $_98oa5zyeje4c0n4p.asRawOrDie('Getting AndroidWebapp schema', MobileSchema, raw);
    $_81jggk103je4c0nf6.set(mobile.toolstrip, 'width', '100%');
    var onTap = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_dzdkrz12tje4c0o45.build($_57756b14vje4c0ook.sketch(onTap, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    $_1r9l60x2je4c0mux.append(mobile.container, mask.element());
    var mode = $_2t4k2m141je4c0oik.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: $_82nexzwjje4c0mss.noop,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_82nexzwjje4c0mss.noop
    };
  };
  var $_bnsa8i140je4c0oia = { produce: produce };

  var schema$14 = [
    $_9mxze0y7je4c0n2h.defaulted('shell', true),
    $_663n6m10oje4c0nl6.field('toolbarBehaviours', [Replacing])
  ];
  var enhanceGroups = function (detail) {
    return { behaviours: $_bi2douy2je4c0n0f.derive([Replacing.config({})]) };
  };
  var partTypes$1 = [$_9i1x5a10vje4c0nn9.optional({
      name: 'groups',
      overrides: enhanceGroups
    })];
  var $_7c2ril150je4c0opu = {
    name: $_82nexzwjje4c0mss.constant('Toolbar'),
    schema: $_82nexzwjje4c0mss.constant(schema$14),
    parts: $_82nexzwjje4c0mss.constant(partTypes$1)
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
      return detail.shell() ? Option.some(component) : $_3zrx6s10tje4c0nmb.getPart(component, detail, 'groups');
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
      behaviours: $_55zfs1wyje4c0mue.deepMerge($_bi2douy2je4c0n0f.derive(extra.behaviours), $_663n6m10oje4c0nl6.get(detail.toolbarBehaviours())),
      apis: { setGroups: setGroups },
      domModification: { attributes: { role: 'group' } }
    };
  };
  var Toolbar = $_ct2klp10pje4c0nle.composite({
    name: 'Toolbar',
    configFields: $_7c2ril150je4c0opu.schema(),
    partFields: $_7c2ril150je4c0opu.parts(),
    factory: factory$4,
    apis: {
      setGroups: function (apis, toolbar, groups) {
        apis.setGroups(toolbar, groups);
      }
    }
  });

  var schema$15 = [
    $_9mxze0y7je4c0n2h.strict('items'),
    $_7lk9gdz6je4c0n8n.markers(['itemClass']),
    $_663n6m10oje4c0nl6.field('tgroupBehaviours', [Keying])
  ];
  var partTypes$2 = [$_9i1x5a10vje4c0nn9.group({
      name: 'items',
      unit: 'item',
      overrides: function (detail) {
        return { domModification: { classes: [detail.markers().itemClass()] } };
      }
    })];
  var $_cmzdc1152je4c0oq2 = {
    name: $_82nexzwjje4c0mss.constant('ToolbarGroup'),
    schema: $_82nexzwjje4c0mss.constant(schema$15),
    parts: $_82nexzwjje4c0mss.constant(partTypes$2)
  };

  var factory$5 = function (detail, components, spec, _externals) {
    return $_55zfs1wyje4c0mue.deepMerge({ dom: { attributes: { role: 'toolbar' } } }, {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_55zfs1wyje4c0mue.deepMerge($_bi2douy2je4c0n0f.derive([Keying.config({
          mode: 'flow',
          selector: '.' + detail.markers().itemClass()
        })]), $_663n6m10oje4c0nl6.get(detail.tgroupBehaviours())),
      'debug.sketcher': spec['debug.sketcher']
    });
  };
  var ToolbarGroup = $_ct2klp10pje4c0nle.composite({
    name: 'ToolbarGroup',
    configFields: $_cmzdc1152je4c0oq2.schema(),
    partFields: $_cmzdc1152je4c0oq2.parts(),
    factory: factory$5
  });

  var dataHorizontal = 'data-' + $_chdthezeje4c0nap.resolve('horizontal-scroll');
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
    $_f4kg3zxrje4c0myl.set(container, dataHorizontal, 'true');
  };
  var hasScroll = function (container) {
    return $_f4kg3zxrje4c0myl.get(container, dataHorizontal) === 'true' ? hasHorizontalScroll : hasVerticalScroll;
  };
  var exclusive = function (scope, selector) {
    return $_5mzaiz13xje4c0ohy.bind(scope, 'touchmove', function (event) {
      $_bntfp0zxje4c0ne8.closest(event.target(), selector).filter(hasScroll).fold(function () {
        event.raw().preventDefault();
      }, $_82nexzwjje4c0mss.noop);
    });
  };
  var $_5t6kcx153je4c0oq9 = {
    exclusive: exclusive,
    markAsHorizontal: markAsHorizontal
  };

  function ScrollingToolbar () {
    var makeGroup = function (gSpec) {
      var scrollClass = gSpec.scrollable === true ? '${prefix}-toolbar-scrollable-group' : '';
      return {
        dom: $_azzecm113je4c0npn.dom('<div aria-label="' + gSpec.label + '" class="${prefix}-toolbar-group ' + scrollClass + '"></div>'),
        tgroupBehaviours: $_bi2douy2je4c0n0f.derive([$_d6mgrm126je4c0nxv.config('adhoc-scrollable-toolbar', gSpec.scrollable === true ? [$_86uglly4je4c0n1n.runOnInit(function (component, simulatedEvent) {
              $_81jggk103je4c0nf6.set(component.element(), 'overflow-x', 'auto');
              $_5t6kcx153je4c0oq9.markAsHorizontal(component.element());
              $_1xck6b13uje4c0ohd.register(component.element());
            })] : [])]),
        components: [Container.sketch({ components: [ToolbarGroup.parts().items({})] })],
        markers: { itemClass: $_chdthezeje4c0nap.resolve('toolbar-group-item') },
        items: gSpec.items
      };
    };
    var toolbar = $_dzdkrz12tje4c0o45.build(Toolbar.sketch({
      dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-toolbar"></div>'),
      components: [Toolbar.parts().groups({})],
      toolbarBehaviours: $_bi2douy2je4c0n0f.derive([
        Toggling.config({
          toggleClass: $_chdthezeje4c0nap.resolve('context-toolbar'),
          toggleOnExecute: false,
          aria: { mode: 'none' }
        }),
        Keying.config({ mode: 'cyclic' })
      ]),
      shell: true
    }));
    var wrapper = $_dzdkrz12tje4c0o45.build(Container.sketch({
      dom: { classes: [$_chdthezeje4c0nap.resolve('toolstrip')] },
      components: [$_dzdkrz12tje4c0o45.premade(toolbar)],
      containerBehaviours: $_bi2douy2je4c0n0f.derive([Toggling.config({
          toggleClass: $_chdthezeje4c0nap.resolve('android-selection-context-toolbar'),
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
      return $_9880jxwsje4c0mtn.map(gs, $_82nexzwjje4c0mss.compose(ToolbarGroup.sketch, makeGroup));
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
      wrapper: $_82nexzwjje4c0mss.constant(wrapper),
      toolbar: $_82nexzwjje4c0mss.constant(toolbar),
      createGroups: createGroups,
      setGroups: setGroups,
      setContextToolbar: setContextToolbar,
      restoreToolbar: restoreToolbar,
      refresh: refresh,
      focus: focus
    };
  }

  var makeEditSwitch = function (webapp) {
    return $_dzdkrz12tje4c0o45.build(Button.sketch({
      dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-mask-edit-icon ${prefix}-icon"></div>'),
      action: function () {
        webapp.run(function (w) {
          w.setReadOnly(false);
        });
      }
    }));
  };
  var makeSocket = function () {
    return $_dzdkrz12tje4c0o45.build(Container.sketch({
      dom: $_azzecm113je4c0npn.dom('<div class="${prefix}-editor-socket"></div>'),
      components: [],
      containerBehaviours: $_bi2douy2je4c0n0f.derive([Replacing.config({})])
    }));
  };
  var showEdit = function (socket, switchToEdit) {
    Replacing.append(socket, $_dzdkrz12tje4c0o45.premade(switchToEdit));
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
  var $_53wv9h154je4c0oqf = {
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
    $_eq5p18137je4c0oa8.remove(root, [
      slideConfig.shrinkingClass(),
      slideConfig.growingClass()
    ]);
  };
  var setShrunk = function (component, slideConfig) {
    $_7xiz2yynje4c0n63.remove(component.element(), slideConfig.openClass());
    $_7xiz2yynje4c0n63.add(component.element(), slideConfig.closedClass());
    $_81jggk103je4c0nf6.set(component.element(), getDimensionProperty(slideConfig), '0px');
    $_81jggk103je4c0nf6.reflow(component.element());
  };
  var measureTargetSize = function (component, slideConfig) {
    setGrown(component, slideConfig);
    var expanded = getDimension(slideConfig, component.element());
    setShrunk(component, slideConfig);
    return expanded;
  };
  var setGrown = function (component, slideConfig) {
    $_7xiz2yynje4c0n63.remove(component.element(), slideConfig.closedClass());
    $_7xiz2yynje4c0n63.add(component.element(), slideConfig.openClass());
    $_81jggk103je4c0nf6.remove(component.element(), getDimensionProperty(slideConfig));
  };
  var doImmediateShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_81jggk103je4c0nf6.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_81jggk103je4c0nf6.reflow(component.element());
    disableTransitions(component, slideConfig);
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
    slideConfig.onShrunk()(component);
  };
  var doStartShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_81jggk103je4c0nf6.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_81jggk103je4c0nf6.reflow(component.element());
    var root = getAnimationRoot(component, slideConfig);
    $_7xiz2yynje4c0n63.add(root, slideConfig.shrinkingClass());
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
  };
  var doStartGrow = function (component, slideConfig, slideState) {
    var fullSize = measureTargetSize(component, slideConfig);
    var root = getAnimationRoot(component, slideConfig);
    $_7xiz2yynje4c0n63.add(root, slideConfig.growingClass());
    setGrown(component, slideConfig);
    $_81jggk103je4c0nf6.set(component.element(), getDimensionProperty(slideConfig), fullSize);
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
    return $_7xiz2yynje4c0n63.has(root, slideConfig.growingClass()) === true;
  };
  var isShrinking = function (component, slideConfig, slideState) {
    var root = getAnimationRoot(component, slideConfig);
    return $_7xiz2yynje4c0n63.has(root, slideConfig.shrinkingClass()) === true;
  };
  var isTransitioning = function (component, slideConfig, slideState) {
    return isGrowing(component, slideConfig, slideState) === true || isShrinking(component, slideConfig, slideState) === true;
  };
  var toggleGrow = function (component, slideConfig, slideState) {
    var f = slideState.isExpanded() ? doStartShrink : doStartGrow;
    f(component, slideConfig, slideState);
  };
  var $_7lkkc1158je4c0orc = {
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
    return expanded ? $_g96sqfyhje4c0n57.nu({
      classes: [slideConfig.openClass()],
      styles: {}
    }) : $_g96sqfyhje4c0n57.nu({
      classes: [slideConfig.closedClass()],
      styles: $_el09ksxsje4c0myu.wrap(slideConfig.dimension().property(), '0px')
    });
  };
  var events$9 = function (slideConfig, slideState) {
    return $_86uglly4je4c0n1n.derive([$_86uglly4je4c0n1n.run($_2j5gqiwije4c0msm.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        if (raw.propertyName === slideConfig.dimension().property()) {
          $_7lkkc1158je4c0orc.disableTransitions(component, slideConfig, slideState);
          if (slideState.isExpanded())
            $_81jggk103je4c0nf6.remove(component.element(), slideConfig.dimension().property());
          var notify = slideState.isExpanded() ? slideConfig.onGrown() : slideConfig.onShrunk();
          notify(component, simulatedEvent);
        }
      })]);
  };
  var $_dyy134157je4c0or7 = {
    exhibit: exhibit$5,
    events: events$9
  };

  var SlidingSchema = [
    $_9mxze0y7je4c0n2h.strict('closedClass'),
    $_9mxze0y7je4c0n2h.strict('openClass'),
    $_9mxze0y7je4c0n2h.strict('shrinkingClass'),
    $_9mxze0y7je4c0n2h.strict('growingClass'),
    $_9mxze0y7je4c0n2h.option('getAnimationRoot'),
    $_7lk9gdz6je4c0n8n.onHandler('onShrunk'),
    $_7lk9gdz6je4c0n8n.onHandler('onStartShrink'),
    $_7lk9gdz6je4c0n8n.onHandler('onGrown'),
    $_7lk9gdz6je4c0n8n.onHandler('onStartGrow'),
    $_9mxze0y7je4c0n2h.defaulted('expanded', false),
    $_9mxze0y7je4c0n2h.strictOf('dimension', $_98oa5zyeje4c0n4p.choose('property', {
      width: [
        $_7lk9gdz6je4c0n8n.output('property', 'width'),
        $_7lk9gdz6je4c0n8n.output('getDimension', function (elem) {
          return $_eze8yo11kje4c0nt6.get(elem) + 'px';
        })
      ],
      height: [
        $_7lk9gdz6je4c0n8n.output('property', 'height'),
        $_7lk9gdz6je4c0n8n.output('getDimension', function (elem) {
          return $_ahi7ey102je4c0nf1.get(elem) + 'px';
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
      setCollapsed: $_82nexzwjje4c0mss.curry(state.set, false),
      setExpanded: $_82nexzwjje4c0mss.curry(state.set, true),
      readState: readState
    });
  };
  var $_emahaf15aje4c0orv = { init: init$4 };

  var Sliding = $_bi2douy2je4c0n0f.create({
    fields: SlidingSchema,
    name: 'sliding',
    active: $_dyy134157je4c0or7,
    apis: $_7lkkc1158je4c0orc,
    state: $_emahaf15aje4c0orv
  });

  var build$2 = function (refresh, scrollIntoView) {
    var dropup = $_dzdkrz12tje4c0o45.build(Container.sketch({
      dom: {
        tag: 'div',
        classes: $_chdthezeje4c0nap.resolve('dropup')
      },
      components: [],
      containerBehaviours: $_bi2douy2je4c0n0f.derive([
        Replacing.config({}),
        Sliding.config({
          closedClass: $_chdthezeje4c0nap.resolve('dropup-closed'),
          openClass: $_chdthezeje4c0nap.resolve('dropup-open'),
          shrinkingClass: $_chdthezeje4c0nap.resolve('dropup-shrinking'),
          growingClass: $_chdthezeje4c0nap.resolve('dropup-growing'),
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
        $_9yraw2zdje4c0naj.orientation(function (component, data) {
          disappear($_82nexzwjje4c0mss.noop);
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
      component: $_82nexzwjje4c0mss.constant(dropup),
      element: dropup.element
    };
  };
  var $_2mjm8t155je4c0oqv = { build: build$2 };

  var isDangerous = function (event) {
    return event.raw().which === $_d4nliazpje4c0ncm.BACKSPACE()[0] && !$_9880jxwsje4c0mtn.contains([
      'input',
      'textarea'
    ], $_2wng6bxkje4c0mxf.name(event.target()));
  };
  var isFirefox = $_3ye61iwkje4c0msu.detect().browser.isFirefox();
  var settingsSchema = $_98oa5zyeje4c0n4p.objOfOnly([
    $_9mxze0y7je4c0n2h.strictFunction('triggerEvent'),
    $_9mxze0y7je4c0n2h.strictFunction('broadcastEvent'),
    $_9mxze0y7je4c0n2h.defaulted('stopBackspace', true)
  ]);
  var bindFocus = function (container, handler) {
    if (isFirefox) {
      return $_5mzaiz13xje4c0ohy.capture(container, 'focus', handler);
    } else {
      return $_5mzaiz13xje4c0ohy.bind(container, 'focusin', handler);
    }
  };
  var bindBlur = function (container, handler) {
    if (isFirefox) {
      return $_5mzaiz13xje4c0ohy.capture(container, 'blur', handler);
    } else {
      return $_5mzaiz13xje4c0ohy.bind(container, 'focusout', handler);
    }
  };
  var setup$2 = function (container, rawSettings) {
    var settings = $_98oa5zyeje4c0n4p.asRawOrDie('Getting GUI events settings', settingsSchema, rawSettings);
    var pointerEvents = $_3ye61iwkje4c0msu.detect().deviceType.isTouch() ? [
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
    var tapEvent = $_1qjxea144je4c0oj9.monitor(settings);
    var simpleEvents = $_9880jxwsje4c0mtn.map(pointerEvents.concat([
      'selectstart',
      'input',
      'contextmenu',
      'change',
      'transitionend',
      'dragstart',
      'dragover',
      'drop'
    ]), function (type) {
      return $_5mzaiz13xje4c0ohy.bind(container, type, function (event) {
        tapEvent.fireIfReady(event, type).each(function (tapStopped) {
          if (tapStopped)
            event.kill();
        });
        var stopped = settings.triggerEvent(type, event);
        if (stopped)
          event.kill();
      });
    });
    var onKeydown = $_5mzaiz13xje4c0ohy.bind(container, 'keydown', function (event) {
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
        settings.triggerEvent($_270al8whje4c0msc.postBlur(), event);
      }, 0);
    });
    var defaultView = $_a90a93x3je4c0mv1.defaultView(container);
    var onWindowScroll = $_5mzaiz13xje4c0ohy.bind(defaultView, 'scroll', function (event) {
      var stopped = settings.broadcastEvent($_270al8whje4c0msc.windowScroll(), event);
      if (stopped)
        event.kill();
    });
    var unbind = function () {
      $_9880jxwsje4c0mtn.each(simpleEvents, function (e) {
        e.unbind();
      });
      onKeydown.unbind();
      onFocusIn.unbind();
      onFocusOut.unbind();
      onWindowScroll.unbind();
    };
    return { unbind: unbind };
  };
  var $_5dihkb15dje4c0ot1 = { setup: setup$2 };

  var derive$3 = function (rawEvent, rawTarget) {
    var source = $_el09ksxsje4c0myu.readOptFrom(rawEvent, 'target').map(function (getTarget) {
      return getTarget();
    }).getOr(rawTarget);
    return Cell(source);
  };
  var $_dbpuvw15fje4c0ots = { derive: derive$3 };

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
      event: $_82nexzwjje4c0mss.constant(event),
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
      cut: $_82nexzwjje4c0mss.noop,
      isStopped: stopper.get,
      isCut: $_82nexzwjje4c0mss.constant(false),
      event: $_82nexzwjje4c0mss.constant(event),
      setTarget: $_82nexzwjje4c0mss.die(new Error('Cannot set target of a broadcasted event')),
      getTarget: $_82nexzwjje4c0mss.die(new Error('Cannot get target of a broadcasted event'))
    };
  };
  var fromTarget = function (event, target) {
    var source = Cell(target);
    return fromSource(event, source);
  };
  var $_e02a7a15gje4c0oty = {
    fromSource: fromSource,
    fromExternal: fromExternal,
    fromTarget: fromTarget
  };

  var adt$6 = $_14nfsrxwje4c0mzb.generate([
    { stopped: [] },
    { resume: ['element'] },
    { complete: [] }
  ]);
  var doTriggerHandler = function (lookup, eventType, rawEvent, target, source, logger) {
    var handler = lookup(eventType, target);
    var simulatedEvent = $_e02a7a15gje4c0oty.fromSource(rawEvent, source);
    return handler.fold(function () {
      logger.logEventNoHandlers(eventType, target);
      return adt$6.complete();
    }, function (handlerInfo) {
      var descHandler = handlerInfo.descHandler();
      var eventHandler = $_6xgglo134je4c0o8k.getHandler(descHandler);
      eventHandler(simulatedEvent);
      if (simulatedEvent.isStopped()) {
        logger.logEventStopped(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.stopped();
      } else if (simulatedEvent.isCut()) {
        logger.logEventCut(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.complete();
      } else
        return $_a90a93x3je4c0mv1.parent(handlerInfo.element()).fold(function () {
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
    var source = $_dbpuvw15fje4c0ots.derive(rawEvent, target);
    return doTriggerHandler(lookup, eventType, rawEvent, target, source, logger);
  };
  var broadcast = function (listeners, rawEvent, logger) {
    var simulatedEvent = $_e02a7a15gje4c0oty.fromExternal(rawEvent);
    $_9880jxwsje4c0mtn.each(listeners, function (listener) {
      var descHandler = listener.descHandler();
      var handler = $_6xgglo134je4c0o8k.getHandler(descHandler);
      handler(simulatedEvent);
    });
    return simulatedEvent.isStopped();
  };
  var triggerUntilStopped = function (lookup, eventType, rawEvent, logger) {
    var rawTarget = rawEvent.target();
    return triggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, logger);
  };
  var triggerOnUntilStopped = function (lookup, eventType, rawEvent, rawTarget, logger) {
    var source = $_dbpuvw15fje4c0ots.derive(rawEvent, rawTarget);
    return doTriggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, source, logger);
  };
  var $_ch68y15eje4c0oth = {
    triggerHandler: triggerHandler,
    triggerUntilStopped: triggerUntilStopped,
    triggerOnUntilStopped: triggerOnUntilStopped,
    broadcast: broadcast
  };

  var closest$4 = function (target, transform, isRoot) {
    var delegate = $_1dgvyfyvje4c0n73.closest(target, function (elem) {
      return transform(elem).isSome();
    }, isRoot);
    return delegate.bind(transform);
  };
  var $_1agf8315jje4c0ouj = { closest: closest$4 };

  var eventHandler = $_30d3z5x4je4c0mvj.immutable('element', 'descHandler');
  var messageHandler = function (id, handler) {
    return {
      id: $_82nexzwjje4c0mss.constant(id),
      descHandler: $_82nexzwjje4c0mss.constant(handler)
    };
  };
  function EventRegistry () {
    var registry = {};
    var registerId = function (extraArgs, id, events) {
      $_czbu3jx0je4c0muh.each(events, function (v, k) {
        var handlers = registry[k] !== undefined ? registry[k] : {};
        handlers[id] = $_6xgglo134je4c0o8k.curryArgs(v, extraArgs);
        registry[k] = handlers;
      });
    };
    var findHandler = function (handlers, elem) {
      return $_23tun010xje4c0no9.read(elem).fold(function (err) {
        return Option.none();
      }, function (id) {
        var reader = $_el09ksxsje4c0myu.readOpt(id);
        return handlers.bind(reader).map(function (descHandler) {
          return eventHandler(elem, descHandler);
        });
      });
    };
    var filterByType = function (type) {
      return $_el09ksxsje4c0myu.readOptFrom(registry, type).map(function (handlers) {
        return $_czbu3jx0je4c0muh.mapToArray(handlers, function (f, id) {
          return messageHandler(id, f);
        });
      }).getOr([]);
    };
    var find = function (isAboveRoot, type, target) {
      var readType = $_el09ksxsje4c0myu.readOpt(type);
      var handlers = readType(registry);
      return $_1agf8315jje4c0ouj.closest(target, function (elem) {
        return findHandler(handlers, elem);
      }, isAboveRoot);
    };
    var unregisterId = function (id) {
      $_czbu3jx0je4c0muh.each(registry, function (handlersById, eventName) {
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
      return $_23tun010xje4c0no9.read(elem).fold(function () {
        return $_23tun010xje4c0no9.write('uid-', component.element());
      }, function (uid) {
        return uid;
      });
    };
    var failOnDuplicate = function (component, tagId) {
      var conflict = components[tagId];
      if (conflict === component)
        unregister(component);
      else
        throw new Error('The tagId "' + tagId + '" is already used by: ' + $_63gwexxmje4c0mxw.element(conflict.element()) + '\nCannot use it for: ' + $_63gwexxmje4c0mxw.element(component.element()) + '\n' + 'The conflicting element is' + ($_1erg6wxjje4c0mxa.inBody(conflict.element()) ? ' ' : ' not ') + 'already in the DOM');
    };
    var register = function (component) {
      var tagId = readOrTag(component);
      if ($_el09ksxsje4c0myu.hasKey(components, tagId))
        failOnDuplicate(component, tagId);
      var extraArgs = [component];
      events.registerId(extraArgs, tagId, component.events());
      components[tagId] = component;
    };
    var unregister = function (component) {
      $_23tun010xje4c0no9.read(component.element()).each(function (tagId) {
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
      return $_el09ksxsje4c0myu.readOpt(id)(components);
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
    var root = $_dzdkrz12tje4c0o45.build(Container.sketch({ dom: { tag: 'div' } }));
    return takeover(root);
  };
  var takeover = function (root) {
    var isAboveRoot = function (el) {
      return $_a90a93x3je4c0mv1.parent(root.element()).fold(function () {
        return true;
      }, function (parent) {
        return $_diemerx9je4c0mw0.eq(el, parent);
      });
    };
    var registry = Registry();
    var lookup = function (eventName, target) {
      return registry.find(isAboveRoot, eventName, target);
    };
    var domEvents = $_5dihkb15dje4c0ot1.setup(root.element(), {
      triggerEvent: function (eventName, event) {
        return $_5hzmsmxlje4c0mxh.monitorEvent(eventName, event.target(), function (logger) {
          return $_ch68y15eje4c0oth.triggerUntilStopped(lookup, eventName, event, logger);
        });
      },
      broadcastEvent: function (eventName, event) {
        var listeners = registry.filter(eventName);
        return $_ch68y15eje4c0oth.broadcast(listeners, event);
      }
    });
    var systemApi = SystemApi({
      debugInfo: $_82nexzwjje4c0mss.constant('real'),
      triggerEvent: function (customType, target, data) {
        $_5hzmsmxlje4c0mxh.monitorEvent(customType, target, function (logger) {
          $_ch68y15eje4c0oth.triggerOnUntilStopped(lookup, customType, data, target, logger);
        });
      },
      triggerFocus: function (target, originator) {
        $_23tun010xje4c0no9.read(target).fold(function () {
          $_30zd9eytje4c0n6v.focus(target);
        }, function (_alloyId) {
          $_5hzmsmxlje4c0mxh.monitorEvent($_270al8whje4c0msc.focus(), target, function (logger) {
            $_ch68y15eje4c0oth.triggerHandler(lookup, $_270al8whje4c0msc.focus(), {
              originator: $_82nexzwjje4c0mss.constant(originator),
              target: $_82nexzwjje4c0mss.constant(target)
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
      build: $_dzdkrz12tje4c0o45.build,
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
      if (!$_2wng6bxkje4c0mxf.isText(component.element())) {
        registry.register(component);
        $_9880jxwsje4c0mtn.each(component.components(), addToWorld);
        systemApi.triggerEvent($_270al8whje4c0msc.systemInit(), component.element(), { target: $_82nexzwjje4c0mss.constant(component.element()) });
      }
    };
    var removeFromWorld = function (component) {
      if (!$_2wng6bxkje4c0mxf.isText(component.element())) {
        $_9880jxwsje4c0mtn.each(component.components(), removeFromWorld);
        registry.unregister(component);
      }
      component.disconnect();
    };
    var add = function (component) {
      $_ckx9tcx1je4c0mul.attach(root, component);
    };
    var remove = function (component) {
      $_ckx9tcx1je4c0mul.detach(component);
    };
    var destroy = function () {
      domEvents.unbind();
      $_2jced7xhje4c0mx4.remove(root.element());
    };
    var broadcastData = function (data) {
      var receivers = registry.filter($_270al8whje4c0msc.receive());
      $_9880jxwsje4c0mtn.each(receivers, function (receiver) {
        var descHandler = receiver.descHandler();
        var handler = $_6xgglo134je4c0o8k.getHandler(descHandler);
        handler(data);
      });
    };
    var broadcast = function (message) {
      broadcastData({
        universal: $_82nexzwjje4c0mss.constant(true),
        data: $_82nexzwjje4c0mss.constant(message)
      });
    };
    var broadcastOn = function (channels, message) {
      broadcastData({
        universal: $_82nexzwjje4c0mss.constant(false),
        channels: $_82nexzwjje4c0mss.constant(channels),
        data: $_82nexzwjje4c0mss.constant(message)
      });
    };
    var getByUid = function (uid) {
      return registry.getById(uid).fold(function () {
        return Result.error(new Error('Could not find component with uid: "' + uid + '" in system.'));
      }, Result.value);
    };
    var getByDom = function (elem) {
      return $_23tun010xje4c0no9.read(elem).bind(getByUid);
    };
    addToWorld(root);
    return {
      root: $_82nexzwjje4c0mss.constant(root),
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
  var $_679toc15cje4c0osb = {
    create: create$6,
    takeover: takeover
  };

  var READ_ONLY_MODE_CLASS = $_82nexzwjje4c0mss.constant($_chdthezeje4c0nap.resolve('readonly-mode'));
  var EDIT_MODE_CLASS = $_82nexzwjje4c0mss.constant($_chdthezeje4c0nap.resolve('edit-mode'));
  function OuterContainer (spec) {
    var root = $_dzdkrz12tje4c0o45.build(Container.sketch({
      dom: { classes: [$_chdthezeje4c0nap.resolve('outer-container')].concat(spec.classes) },
      containerBehaviours: $_bi2douy2je4c0n0f.derive([Swapping.config({
          alpha: READ_ONLY_MODE_CLASS(),
          omega: EDIT_MODE_CLASS()
        })])
    }));
    return $_679toc15cje4c0osb.takeover(root);
  }

  function AndroidRealm (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_chdthezeje4c0nap.resolve('android-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_6vqdu212oje4c0o1z.api();
    var switchToEdit = $_53wv9h154je4c0oqf.makeEditSwitch(webapp);
    var socket = $_53wv9h154je4c0oqf.makeSocket();
    var dropup = $_2mjm8t155je4c0oqv.build($_82nexzwjje4c0mss.noop, scrollIntoView);
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
      webapp.set($_bnsa8i140je4c0oia.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        w.exit();
        Replacing.remove(socket, switchToEdit);
      });
    };
    var updateMode = function (readOnly) {
      $_53wv9h154je4c0oqf.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_82nexzwjje4c0mss.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_82nexzwjje4c0mss.constant(socket),
      dropup: $_82nexzwjje4c0mss.constant(dropup)
    };
  }

  var input = function (parent, operation) {
    var input = $_gba6fcxfje4c0mwy.fromTag('input');
    $_81jggk103je4c0nf6.setAll(input, {
      opacity: '0',
      position: 'absolute',
      top: '-1000px',
      left: '-1000px'
    });
    $_1r9l60x2je4c0mux.append(parent, input);
    $_30zd9eytje4c0n6v.focus(input);
    operation(input);
    $_2jced7xhje4c0mx4.remove(input);
  };
  var $_7cwmwj15oje4c0ovv = { input: input };

  var refreshInput = function (input) {
    var start = input.dom().selectionStart;
    var end = input.dom().selectionEnd;
    var dir = input.dom().selectionDirection;
    setTimeout(function () {
      input.dom().setSelectionRange(start, end, dir);
      $_30zd9eytje4c0n6v.focus(input);
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
  var $_g8i7ok15qje4c0owa = {
    refreshInput: refreshInput,
    refresh: refresh
  };

  var resume$1 = function (cWin, frame) {
    $_30zd9eytje4c0n6v.active().each(function (active) {
      if (!$_diemerx9je4c0mw0.eq(active, frame)) {
        $_30zd9eytje4c0n6v.blur(active);
      }
    });
    cWin.focus();
    $_30zd9eytje4c0n6v.focus($_gba6fcxfje4c0mwy.fromDom(cWin.document.body));
    $_g8i7ok15qje4c0owa.refresh(cWin);
  };
  var $_3mhnem15pje4c0ow1 = { resume: resume$1 };

  var stubborn = function (outerBody, cWin, page, frame) {
    var toEditing = function () {
      $_3mhnem15pje4c0ow1.resume(cWin, frame);
    };
    var toReading = function () {
      $_7cwmwj15oje4c0ovv.input(outerBody, $_30zd9eytje4c0n6v.blur);
    };
    var captureInput = $_5mzaiz13xje4c0ohy.bind(page, 'keydown', function (evt) {
      if (!$_9880jxwsje4c0mtn.contains([
          'input',
          'textarea'
        ], $_2wng6bxkje4c0mxf.name(evt.target()))) {
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
      $_30zd9eytje4c0n6v.blur(frame);
    };
    var onToolbarTouch = function () {
      dismissKeyboard();
    };
    var toReading = function () {
      dismissKeyboard();
    };
    var toEditing = function () {
      $_3mhnem15pje4c0ow1.resume(cWin, frame);
    };
    return {
      toReading: toReading,
      toEditing: toEditing,
      onToolbarTouch: onToolbarTouch,
      destroy: $_82nexzwjje4c0mss.noop
    };
  };
  var $_1ngjrz15nje4c0ovl = {
    stubborn: stubborn,
    timid: timid
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
      var toolbarHeight = $_ahi7ey102je4c0nf1.get(toolstrip);
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
    var tapping = $_gh7jpw143je4c0oj4.monitor(editorApi);
    var refreshThrottle = $_63somu14wje4c0oou.last(refreshView, 300);
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
      $_5mzaiz13xje4c0ohy.bind(editorApi.doc(), 'touchend', function (touchEvent) {
        if ($_diemerx9je4c0mw0.eq(editorApi.html(), touchEvent.target()) || $_diemerx9je4c0mw0.eq(editorApi.body(), touchEvent.target())) {
        }
      }),
      $_5mzaiz13xje4c0ohy.bind(toolstrip, 'transitionend', function (transitionEvent) {
        if (transitionEvent.raw().propertyName === 'height') {
          reposition();
        }
      }),
      $_5mzaiz13xje4c0ohy.capture(toolstrip, 'touchstart', function (touchEvent) {
        saveSelectionFirst();
        onToolbarTouch(touchEvent);
        editorApi.onTouchToolstrip();
      }),
      $_5mzaiz13xje4c0ohy.bind(editorApi.body(), 'touchstart', function (evt) {
        clearSelection();
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_5mzaiz13xje4c0ohy.bind(editorApi.body(), 'click', function (event) {
        event.kill();
      }),
      $_5mzaiz13xje4c0ohy.bind(toolstrip, 'touchmove', function () {
        editorApi.onToolbarScrollStart();
      })
    ];
    var destroy = function () {
      $_9880jxwsje4c0mtn.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_alaglh15rje4c0owd = { initEvents: initEvents$1 };

  function FakeSelection (win, frame) {
    var doc = win.document;
    var container = $_gba6fcxfje4c0mwy.fromTag('div');
    $_7xiz2yynje4c0n63.add(container, $_chdthezeje4c0nap.resolve('unfocused-selections'));
    $_1r9l60x2je4c0mux.append($_gba6fcxfje4c0mwy.fromDom(doc.documentElement), container);
    var onTouch = $_5mzaiz13xje4c0ohy.bind(container, 'touchstart', function (event) {
      event.prevent();
      $_3mhnem15pje4c0ow1.resume(win, frame);
      clear();
    });
    var make = function (rectangle) {
      var span = $_gba6fcxfje4c0mwy.fromTag('span');
      $_eq5p18137je4c0oa8.add(span, [
        $_chdthezeje4c0nap.resolve('layer-editor'),
        $_chdthezeje4c0nap.resolve('unfocused-selection')
      ]);
      $_81jggk103je4c0nf6.setAll(span, {
        left: rectangle.left() + 'px',
        top: rectangle.top() + 'px',
        width: rectangle.width() + 'px',
        height: rectangle.height() + 'px'
      });
      return span;
    };
    var update = function () {
      clear();
      var rectangles = $_bzh5ez148je4c0ojz.getRectangles(win);
      var spans = $_9880jxwsje4c0mtn.map(rectangles, make);
      $_8mtzevxije4c0mx6.append(container, spans);
    };
    var clear = function () {
      $_2jced7xhje4c0mx4.empty(container);
    };
    var destroy = function () {
      onTouch.unbind();
      $_2jced7xhje4c0mx4.remove(container);
    };
    var isActive = function () {
      return $_a90a93x3je4c0mv1.children(container).length > 0;
    };
    return {
      update: update,
      isActive: isActive,
      destroy: destroy,
      clear: clear
    };
  }

  var nu$8 = function (baseFn) {
    var data = Option.none();
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
      data = Option.some(x);
      run(callbacks);
      callbacks = [];
    };
    var isReady = function () {
      return data.isSome();
    };
    var run = function (cbs) {
      $_9880jxwsje4c0mtn.each(cbs, call);
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
  var LazyValue = {
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
  var $_70txq15xje4c0oy4 = { bounce: bounce };

  var nu$9 = function (baseFn) {
    var get = function (callback) {
      baseFn($_70txq15xje4c0oy4.bounce(callback));
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
      return LazyValue.nu(get);
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
  var Future = {
    nu: nu$9,
    pure: pure$2
  };

  var adjust = function (value, destination, amount) {
    if (Math.abs(value - destination) <= amount) {
      return Option.none();
    } else if (value < destination) {
      return Option.some(value + amount);
    } else {
      return Option.some(value - amount);
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
  var $_eb4o1815yje4c0oy6 = {
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
    return $_ce73q4y0je4c0n0c.findMap(devices, function (device) {
      return deviceWidth <= device.width && deviceHeight <= device.height ? Option.some(device.keyboard) : Option.none();
    }).getOr({
      portrait: deviceHeight / 5,
      landscape: deviceWidth / 4
    });
  };
  var $_7ma0xt161je4c0oyy = { findDevice: findDevice };

  var softKeyboardLimits = function (outerWindow) {
    return $_7ma0xt161je4c0oyy.findDevice(outerWindow.screen.width, outerWindow.screen.height);
  };
  var accountableKeyboardHeight = function (outerWindow) {
    var portrait = $_bzeoko13wje4c0ohq.get(outerWindow).isPortrait();
    var limits = softKeyboardLimits(outerWindow);
    var keyboard = portrait ? limits.portrait : limits.landscape;
    var visualScreenHeight = portrait ? outerWindow.screen.height : outerWindow.screen.width;
    return visualScreenHeight - outerWindow.innerHeight > keyboard ? 0 : keyboard;
  };
  var getGreenzone = function (socket, dropup) {
    var outerWindow = $_a90a93x3je4c0mv1.owner(socket).dom().defaultView;
    var viewportHeight = $_ahi7ey102je4c0nf1.get(socket) + $_ahi7ey102je4c0nf1.get(dropup);
    var acc = accountableKeyboardHeight(outerWindow);
    return viewportHeight - acc;
  };
  var updatePadding = function (contentBody, socket, dropup) {
    var greenzoneHeight = getGreenzone(socket, dropup);
    var deltaHeight = $_ahi7ey102je4c0nf1.get(socket) + $_ahi7ey102je4c0nf1.get(dropup) - greenzoneHeight;
    $_81jggk103je4c0nf6.set(contentBody, 'padding-bottom', deltaHeight + 'px');
  };
  var $_1vulhz160je4c0oyq = {
    getGreenzone: getGreenzone,
    updatePadding: updatePadding
  };

  var fixture = $_14nfsrxwje4c0mzb.generate([
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
  var yFixedData = 'data-' + $_chdthezeje4c0nap.resolve('position-y-fixed');
  var yFixedProperty = 'data-' + $_chdthezeje4c0nap.resolve('y-property');
  var yScrollingData = 'data-' + $_chdthezeje4c0nap.resolve('scrolling');
  var windowSizeData = 'data-' + $_chdthezeje4c0nap.resolve('last-window-height');
  var getYFixedData = function (element) {
    return $_e9101n147je4c0ojw.safeParse(element, yFixedData);
  };
  var getYFixedProperty = function (element) {
    return $_f4kg3zxrje4c0myl.get(element, yFixedProperty);
  };
  var getLastWindowSize = function (element) {
    return $_e9101n147je4c0ojw.safeParse(element, windowSizeData);
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
    var classifier = $_f4kg3zxrje4c0myl.get(element, yScrollingData) === 'true' ? classifyScrolling : classifyFixed;
    return classifier(element, offsetY);
  };
  var findFixtures = function (container) {
    var candidates = $_43odwmzvje4c0ne4.descendants(container, '[' + yFixedData + ']');
    return $_9880jxwsje4c0mtn.map(candidates, classify);
  };
  var takeoverToolbar = function (toolbar) {
    var oldToolbarStyle = $_f4kg3zxrje4c0myl.get(toolbar, 'style');
    $_81jggk103je4c0nf6.setAll(toolbar, {
      position: 'absolute',
      top: '0px'
    });
    $_f4kg3zxrje4c0myl.set(toolbar, yFixedData, '0px');
    $_f4kg3zxrje4c0myl.set(toolbar, yFixedProperty, 'top');
    var restore = function () {
      $_f4kg3zxrje4c0myl.set(toolbar, 'style', oldToolbarStyle || '');
      $_f4kg3zxrje4c0myl.remove(toolbar, yFixedData);
      $_f4kg3zxrje4c0myl.remove(toolbar, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverViewport = function (toolbarHeight, height, viewport) {
    var oldViewportStyle = $_f4kg3zxrje4c0myl.get(viewport, 'style');
    $_1xck6b13uje4c0ohd.register(viewport);
    $_81jggk103je4c0nf6.setAll(viewport, {
      position: 'absolute',
      height: height + 'px',
      width: '100%',
      top: toolbarHeight + 'px'
    });
    $_f4kg3zxrje4c0myl.set(viewport, yFixedData, toolbarHeight + 'px');
    $_f4kg3zxrje4c0myl.set(viewport, yScrollingData, 'true');
    $_f4kg3zxrje4c0myl.set(viewport, yFixedProperty, 'top');
    var restore = function () {
      $_1xck6b13uje4c0ohd.deregister(viewport);
      $_f4kg3zxrje4c0myl.set(viewport, 'style', oldViewportStyle || '');
      $_f4kg3zxrje4c0myl.remove(viewport, yFixedData);
      $_f4kg3zxrje4c0myl.remove(viewport, yScrollingData);
      $_f4kg3zxrje4c0myl.remove(viewport, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverDropup = function (dropup, toolbarHeight, viewportHeight) {
    var oldDropupStyle = $_f4kg3zxrje4c0myl.get(dropup, 'style');
    $_81jggk103je4c0nf6.setAll(dropup, {
      position: 'absolute',
      bottom: '0px'
    });
    $_f4kg3zxrje4c0myl.set(dropup, yFixedData, '0px');
    $_f4kg3zxrje4c0myl.set(dropup, yFixedProperty, 'bottom');
    var restore = function () {
      $_f4kg3zxrje4c0myl.set(dropup, 'style', oldDropupStyle || '');
      $_f4kg3zxrje4c0myl.remove(dropup, yFixedData);
      $_f4kg3zxrje4c0myl.remove(dropup, yFixedProperty);
    };
    return { restore: restore };
  };
  var deriveViewportHeight = function (viewport, toolbarHeight, dropupHeight) {
    var outerWindow = $_a90a93x3je4c0mv1.owner(viewport).dom().defaultView;
    var winH = outerWindow.innerHeight;
    $_f4kg3zxrje4c0myl.set(viewport, windowSizeData, winH + 'px');
    return winH - toolbarHeight - dropupHeight;
  };
  var takeover$1 = function (viewport, contentBody, toolbar, dropup) {
    var outerWindow = $_a90a93x3je4c0mv1.owner(viewport).dom().defaultView;
    var toolbarSetup = takeoverToolbar(toolbar);
    var toolbarHeight = $_ahi7ey102je4c0nf1.get(toolbar);
    var dropupHeight = $_ahi7ey102je4c0nf1.get(dropup);
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
        var newToolbarHeight = $_ahi7ey102je4c0nf1.get(toolbar);
        var dropupHeight_1 = $_ahi7ey102je4c0nf1.get(dropup);
        var newHeight = deriveViewportHeight(viewport, newToolbarHeight, dropupHeight_1);
        $_f4kg3zxrje4c0myl.set(viewport, yFixedData, newToolbarHeight + 'px');
        $_81jggk103je4c0nf6.set(viewport, 'height', newHeight + 'px');
        $_81jggk103je4c0nf6.set(dropup, 'bottom', -(newToolbarHeight + newHeight + dropupHeight_1) + 'px');
        $_1vulhz160je4c0oyq.updatePadding(contentBody, viewport, dropup);
      }
    };
    var setViewportOffset = function (newYOffset) {
      var offsetPx = newYOffset + 'px';
      $_f4kg3zxrje4c0myl.set(viewport, yFixedData, offsetPx);
      refresh();
    };
    $_1vulhz160je4c0oyq.updatePadding(contentBody, viewport, dropup);
    return {
      setViewportOffset: setViewportOffset,
      isExpanding: isExpanding,
      isShrinking: $_82nexzwjje4c0mss.not(isExpanding),
      refresh: refresh,
      restore: restore
    };
  };
  var $_fx8fal15zje4c0oyb = {
    findFixtures: findFixtures,
    takeover: takeover$1,
    getYFixedData: getYFixedData
  };

  var animator = $_eb4o1815yje4c0oy6.create();
  var ANIMATION_STEP = 15;
  var NUM_TOP_ANIMATION_FRAMES = 10;
  var ANIMATION_RATE = 10;
  var lastScroll = 'data-' + $_chdthezeje4c0nap.resolve('last-scroll-top');
  var getTop = function (element) {
    var raw = $_81jggk103je4c0nf6.getRaw(element, 'top').getOr(0);
    return parseInt(raw, 10);
  };
  var getScrollTop = function (element) {
    return parseInt(element.dom().scrollTop, 10);
  };
  var moveScrollAndTop = function (element, destination, finalTop) {
    return Future.nu(function (callback) {
      var getCurrent = $_82nexzwjje4c0mss.curry(getScrollTop, element);
      var update = function (newScroll) {
        element.dom().scrollTop = newScroll;
        $_81jggk103je4c0nf6.set(element, 'top', getTop(element) + ANIMATION_STEP + 'px');
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_81jggk103je4c0nf6.set(element, 'top', finalTop + 'px');
        callback(destination);
      };
      animator.animate(getCurrent, destination, ANIMATION_STEP, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyScroll = function (element, destination) {
    return Future.nu(function (callback) {
      var getCurrent = $_82nexzwjje4c0mss.curry(getScrollTop, element);
      $_f4kg3zxrje4c0myl.set(element, lastScroll, getCurrent());
      var update = function (newScroll, abort) {
        var previous = $_e9101n147je4c0ojw.safeParse(element, lastScroll);
        if (previous !== element.dom().scrollTop) {
          abort(element.dom().scrollTop);
        } else {
          element.dom().scrollTop = newScroll;
          $_f4kg3zxrje4c0myl.set(element, lastScroll, newScroll);
        }
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_f4kg3zxrje4c0myl.set(element, lastScroll, destination);
        callback(destination);
      };
      var distance = Math.abs(destination - getCurrent());
      var step = Math.ceil(distance / NUM_TOP_ANIMATION_FRAMES);
      animator.animate(getCurrent, destination, step, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyTop = function (element, destination) {
    return Future.nu(function (callback) {
      var getCurrent = $_82nexzwjje4c0mss.curry(getTop, element);
      var update = function (newTop) {
        $_81jggk103je4c0nf6.set(element, 'top', newTop + 'px');
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
    var newTop = amount + $_fx8fal15zje4c0oyb.getYFixedData(element) + 'px';
    $_81jggk103je4c0nf6.set(element, 'top', newTop);
  };
  var moveWindowScroll = function (toolbar, viewport, destY) {
    var outerWindow = $_a90a93x3je4c0mv1.owner(toolbar).dom().defaultView;
    return Future.nu(function (callback) {
      updateTop(toolbar, destY);
      updateTop(viewport, destY);
      outerWindow.scrollTo(0, destY);
      callback(destY);
    });
  };
  var $_bikxla15uje4c0oxp = {
    moveScrollAndTop: moveScrollAndTop,
    moveOnlyScroll: moveOnlyScroll,
    moveOnlyTop: moveOnlyTop,
    moveWindowScroll: moveWindowScroll
  };

  function BackgroundActivity (doAction) {
    var action = Cell(LazyValue.pure({}));
    var start = function (value) {
      var future = LazyValue.nu(function (callback) {
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
    var greenzone = $_1vulhz160je4c0oyq.getGreenzone(socket, dropup);
    var refreshCursor = $_82nexzwjje4c0mss.curry($_g8i7ok15qje4c0owa.refresh, cWin);
    if (top > greenzone || bottom > greenzone) {
      $_bikxla15uje4c0oxp.moveOnlyScroll(socket, socket.dom().scrollTop - greenzone + bottom).get(refreshCursor);
    } else if (top < 0) {
      $_bikxla15uje4c0oxp.moveOnlyScroll(socket, socket.dom().scrollTop + top).get(refreshCursor);
    } else {
    }
  };
  var $_3bb5yu163je4c0oza = { scrollIntoView: scrollIntoView };

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
        $_9880jxwsje4c0mtn.each(asyncValues, function (asyncValue, i) {
          asyncValue.get(cb(i));
        });
      }
    });
  };
  var $_7gf47c166je4c0ozo = { par: par };

  var par$1 = function (futures) {
    return $_7gf47c166je4c0ozo.par(futures, Future.nu);
  };
  var mapM = function (array, fn) {
    var futures = $_9880jxwsje4c0mtn.map(array, fn);
    return par$1(futures);
  };
  var compose$1 = function (f, g) {
    return function (a) {
      return g(a).bind(f);
    };
  };
  var $_9w3oet165je4c0ozm = {
    par: par$1,
    mapM: mapM,
    compose: compose$1
  };

  var updateFixed = function (element, property, winY, offsetY) {
    var destination = winY + offsetY;
    $_81jggk103je4c0nf6.set(element, property, destination + 'px');
    return Future.pure(offsetY);
  };
  var updateScrollingFixed = function (element, winY, offsetY) {
    var destTop = winY + offsetY;
    var oldProp = $_81jggk103je4c0nf6.getRaw(element, 'top').getOr(offsetY);
    var delta = destTop - parseInt(oldProp, 10);
    var destScroll = element.dom().scrollTop + delta;
    return $_bikxla15uje4c0oxp.moveScrollAndTop(element, destScroll, destTop);
  };
  var updateFixture = function (fixture, winY) {
    return fixture.fold(function (element, property, offsetY) {
      return updateFixed(element, property, winY, offsetY);
    }, function (element, offsetY) {
      return updateScrollingFixed(element, winY, offsetY);
    });
  };
  var updatePositions = function (container, winY) {
    var fixtures = $_fx8fal15zje4c0oyb.findFixtures(container);
    var updates = $_9880jxwsje4c0mtn.map(fixtures, function (fixture) {
      return updateFixture(fixture, winY);
    });
    return $_9w3oet165je4c0ozm.par(updates);
  };
  var $_43vcnk164je4c0ozf = { updatePositions: updatePositions };

  var VIEW_MARGIN = 5;
  var register$2 = function (toolstrip, socket, container, outerWindow, structure, cWin) {
    var scroller = BackgroundActivity(function (y) {
      return $_bikxla15uje4c0oxp.moveWindowScroll(toolstrip, socket, y);
    });
    var scrollBounds = function () {
      var rects = $_bzh5ez148je4c0ojz.getRectangles(cWin);
      return Option.from(rects[0]).bind(function (rect) {
        var viewTop = rect.top() - socket.dom().scrollTop;
        var outside = viewTop > outerWindow.innerHeight + VIEW_MARGIN || viewTop < -VIEW_MARGIN;
        return outside ? Option.some({
          top: $_82nexzwjje4c0mss.constant(viewTop),
          bottom: $_82nexzwjje4c0mss.constant(viewTop + rect.height())
        }) : Option.none();
      });
    };
    var scrollThrottle = $_63somu14wje4c0oou.last(function () {
      scroller.idle(function () {
        $_43vcnk164je4c0ozf.updatePositions(container, outerWindow.pageYOffset).get(function () {
          var extraScroll = scrollBounds();
          extraScroll.each(function (extra) {
            socket.dom().scrollTop = socket.dom().scrollTop + extra.top();
          });
          scroller.start(0);
          structure.refresh();
        });
      });
    }, 1000);
    var onScroll = $_5mzaiz13xje4c0ohy.bind($_gba6fcxfje4c0mwy.fromDom(outerWindow), 'scroll', function () {
      if (outerWindow.pageYOffset < 0) {
        return;
      }
      scrollThrottle.throttle();
    });
    $_43vcnk164je4c0ozf.updatePositions(container, outerWindow.pageYOffset).get($_82nexzwjje4c0mss.identity);
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
    var structure = $_fx8fal15zje4c0oyb.takeover(socket, ceBody, toolstrip, dropup);
    var keyboardModel = keyboardType(bag.outerBody(), cWin, $_1erg6wxjje4c0mxa.body(), contentElement, toolstrip, toolbar);
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
    var onOrientation = $_bzeoko13wje4c0ohq.onChange(outerWindow, {
      onChange: $_82nexzwjje4c0mss.noop,
      onReady: structure.refresh
    });
    onOrientation.onAdjustment(function () {
      structure.refresh();
    });
    var onResize = $_5mzaiz13xje4c0ohy.bind($_gba6fcxfje4c0mwy.fromDom(outerWindow), 'resize', function () {
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
      $_3bb5yu163je4c0oza.scrollIntoView(cWin, socket, dropup, top, bottom);
    };
    var syncHeight = function () {
      $_81jggk103je4c0nf6.set(contentElement, 'height', contentElement.dom().contentWindow.document.body.scrollHeight + 'px');
    };
    var setViewportOffset = function (newYOffset) {
      structure.setViewportOffset(newYOffset);
      $_bikxla15uje4c0oxp.moveOnlyTop(socket, newYOffset).get($_82nexzwjje4c0mss.identity);
    };
    var destroy = function () {
      structure.restore();
      onOrientation.destroy();
      onScroll.unbind();
      onResize.unbind();
      keyboardModel.destroy();
      unfocusedSelection.destroy();
      $_7cwmwj15oje4c0ovv.input($_1erg6wxjje4c0mxa.body(), $_30zd9eytje4c0n6v.blur);
    };
    return {
      toEditing: toEditing,
      toReading: toReading,
      onToolbarTouch: onToolbarTouch,
      refreshSelection: refreshSelection,
      clearSelection: clearSelection,
      highlightSelection: highlightSelection,
      scrollIntoView: scrollIntoView,
      updateToolbarPadding: $_82nexzwjje4c0mss.noop,
      setViewportOffset: setViewportOffset,
      syncHeight: syncHeight,
      refreshStructure: structure.refresh,
      destroy: destroy
    };
  };
  var $_7icddi15sje4c0ows = { setup: setup$3 };

  var create$8 = function (platform, mask) {
    var meta = $_1810im14uje4c0oo1.tag();
    var priorState = $_6vqdu212oje4c0o1z.value();
    var scrollEvents = $_6vqdu212oje4c0o1z.value();
    var iosApi = $_6vqdu212oje4c0o1z.api();
    var iosEvents = $_6vqdu212oje4c0o1z.api();
    var enter = function () {
      mask.hide();
      var doc = $_gba6fcxfje4c0mwy.fromDom(document);
      $_etjh6v14sje4c0on2.getActiveApi(platform.editor).each(function (editorApi) {
        priorState.set({
          socketHeight: $_81jggk103je4c0nf6.getRaw(platform.socket, 'height'),
          iframeHeight: $_81jggk103je4c0nf6.getRaw(editorApi.frame(), 'height'),
          outerScroll: document.body.scrollTop
        });
        scrollEvents.set({ exclusives: $_5t6kcx153je4c0oq9.exclusive(doc, '.' + $_1xck6b13uje4c0ohd.scrollable()) });
        $_7xiz2yynje4c0n63.add(platform.container, $_chdthezeje4c0nap.resolve('fullscreen-maximized'));
        $_683hru14tje4c0ond.clobberStyles(platform.container, editorApi.body());
        meta.maximize();
        $_81jggk103je4c0nf6.set(platform.socket, 'overflow', 'scroll');
        $_81jggk103je4c0nf6.set(platform.socket, '-webkit-overflow-scrolling', 'touch');
        $_30zd9eytje4c0n6v.focus(editorApi.body());
        var setupBag = $_30d3z5x4je4c0mvj.immutableBag([
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
        iosApi.set($_7icddi15sje4c0ows.setup(setupBag({
          cWin: editorApi.win(),
          ceBody: editorApi.body(),
          socket: platform.socket,
          toolstrip: platform.toolstrip,
          toolbar: platform.toolbar,
          dropup: platform.dropup.element(),
          contentElement: editorApi.frame(),
          cursor: $_82nexzwjje4c0mss.noop,
          outerBody: platform.body,
          outerWindow: platform.win,
          keyboardType: $_1ngjrz15nje4c0ovl.stubborn,
          isScrolling: function () {
            return scrollEvents.get().exists(function (s) {
              return s.socket.isScrolling();
            });
          }
        })));
        iosApi.run(function (api) {
          api.syncHeight();
        });
        iosEvents.set($_alaglh15rje4c0owd.initEvents(editorApi, iosApi, platform.toolstrip, platform.socket, platform.dropup));
      });
    };
    var exit = function () {
      meta.restore();
      iosEvents.clear();
      iosApi.clear();
      mask.show();
      priorState.on(function (s) {
        s.socketHeight.each(function (h) {
          $_81jggk103je4c0nf6.set(platform.socket, 'height', h);
        });
        s.iframeHeight.each(function (h) {
          $_81jggk103je4c0nf6.set(platform.editor.getFrame(), 'height', h);
        });
        document.body.scrollTop = s.scrollTop;
      });
      priorState.clear();
      scrollEvents.on(function (s) {
        s.exclusives.unbind();
      });
      scrollEvents.clear();
      $_7xiz2yynje4c0n63.remove(platform.container, $_chdthezeje4c0nap.resolve('fullscreen-maximized'));
      $_683hru14tje4c0ond.restoreStyles();
      $_1xck6b13uje4c0ohd.deregister(platform.toolbar);
      $_81jggk103je4c0nf6.remove(platform.socket, 'overflow');
      $_81jggk103je4c0nf6.remove(platform.socket, '-webkit-overflow-scrolling');
      $_30zd9eytje4c0n6v.blur(platform.editor.getFrame());
      $_etjh6v14sje4c0on2.getActiveApi(platform.editor).each(function (editorApi) {
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
  var $_5ahv6l15mje4c0ov7 = { create: create$8 };

  var produce$1 = function (raw) {
    var mobile = $_98oa5zyeje4c0n4p.asRawOrDie('Getting IosWebapp schema', MobileSchema, raw);
    $_81jggk103je4c0nf6.set(mobile.toolstrip, 'width', '100%');
    $_81jggk103je4c0nf6.set(mobile.container, 'position', 'relative');
    var onView = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_dzdkrz12tje4c0o45.build($_57756b14vje4c0ook.sketch(onView, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    var mode = $_5ahv6l15mje4c0ov7.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: mode.refreshStructure,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_82nexzwjje4c0mss.noop
    };
  };
  var $_44v71a15lje4c0ouz = { produce: produce$1 };

  function IosRealm (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_chdthezeje4c0nap.resolve('ios-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_6vqdu212oje4c0o1z.api();
    var switchToEdit = $_53wv9h154je4c0oqf.makeEditSwitch(webapp);
    var socket = $_53wv9h154je4c0oqf.makeSocket();
    var dropup = $_2mjm8t155je4c0oqv.build(function () {
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
      webapp.set($_44v71a15lje4c0ouz.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        Replacing.remove(socket, switchToEdit);
        w.exit();
      });
    };
    var updateMode = function (readOnly) {
      $_53wv9h154je4c0oqf.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_82nexzwjje4c0mss.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_82nexzwjje4c0mss.constant(socket),
      dropup: $_82nexzwjje4c0mss.constant(dropup)
    };
  }

  var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');

  var derive$4 = function (editor) {
    var base = $_el09ksxsje4c0myu.readOptFrom(editor.settings, 'skin_url').fold(function () {
      return EditorManager.baseURL + '/skins/' + 'lightgray';
    }, function (url) {
      return url;
    });
    return {
      content: base + '/content.mobile.min.css',
      ui: base + '/skin.mobile.min.css'
    };
  };
  var $_f072i3167je4c0ozq = { derive: derive$4 };

  var fontSizes = [
    'x-small',
    'small',
    'medium',
    'large',
    'x-large'
  ];
  var fireChange$1 = function (realm, command, state) {
    realm.system().broadcastOn([$_30j9u8z1je4c0n7k.formatChanged()], {
      command: command,
      state: state
    });
  };
  var init$5 = function (realm, editor) {
    var allFormats = $_czbu3jx0je4c0muh.keys(editor.formatter.get());
    $_9880jxwsje4c0mtn.each(allFormats, function (command) {
      editor.formatter.formatChanged(command, function (state) {
        fireChange$1(realm, command, state);
      });
    });
    $_9880jxwsje4c0mtn.each([
      'ul',
      'ol'
    ], function (command) {
      editor.selection.selectorChanged(command, function (state, data) {
        fireChange$1(realm, command, state);
      });
    });
  };
  var $_59jwjt169je4c0ozw = {
    init: init$5,
    fontSizes: $_82nexzwjje4c0mss.constant(fontSizes)
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
  var $_550yno16aje4c0p01 = { fireSkinLoaded: fireSkinLoaded };

  var READING = $_82nexzwjje4c0mss.constant('toReading');
  var EDITING = $_82nexzwjje4c0mss.constant('toEditing');
  ThemeManager.add('mobile', function (editor) {
    var renderUI = function (args) {
      var cssUrls = $_f072i3167je4c0ozq.derive(editor);
      if ($_9t0rdpz0je4c0n7j.isSkinDisabled(editor) === false) {
        editor.contentCSS.push(cssUrls.content);
        DOMUtils.DOM.styleSheetLoader.load(cssUrls.ui, $_550yno16aje4c0p01.fireSkinLoaded(editor));
      } else {
        $_550yno16aje4c0p01.fireSkinLoaded(editor)();
      }
      var doScrollIntoView = function () {
        editor.fire('scrollIntoView');
      };
      var wrapper = $_gba6fcxfje4c0mwy.fromTag('div');
      var realm = $_3ye61iwkje4c0msu.detect().os.isAndroid() ? AndroidRealm(doScrollIntoView) : IosRealm(doScrollIntoView);
      var original = $_gba6fcxfje4c0mwy.fromDom(args.targetNode);
      $_1r9l60x2je4c0mux.after(original, wrapper);
      $_ckx9tcx1je4c0mul.attachSystem(wrapper, realm.system());
      var findFocusIn = function (elem) {
        return $_30zd9eytje4c0n6v.search(elem).bind(function (focused) {
          return realm.system().getByDom(focused).toOption();
        });
      };
      var outerWindow = args.targetNode.ownerDocument.defaultView;
      var orientation = $_bzeoko13wje4c0ohq.onChange(outerWindow, {
        onChange: function () {
          var alloy = realm.system();
          alloy.broadcastOn([$_30j9u8z1je4c0n7k.orientationChanged()], { width: $_bzeoko13wje4c0ohq.getActualWidth(outerWindow) });
        },
        onReady: $_82nexzwjje4c0mss.noop
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
              return $_gba6fcxfje4c0mwy.fromDom(editor.contentAreaContainer.querySelector('iframe'));
            },
            onDomChanged: function () {
              return { unbind: $_82nexzwjje4c0mss.noop };
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
              var toolbar = $_gba6fcxfje4c0mwy.fromDom(editor.editorContainer.querySelector('.' + $_chdthezeje4c0nap.resolve('toolbar')));
              findFocusIn(toolbar).each($_dxxx79wgje4c0ms3.emitExecute);
              realm.restoreToolbar();
              hideDropup();
            },
            onTapContent: function (evt) {
              var target = evt.target();
              if ($_2wng6bxkje4c0mxf.name(target) === 'img') {
                editor.selection.select(target.dom());
                evt.kill();
              } else if ($_2wng6bxkje4c0mxf.name(target) === 'a') {
                var component = realm.system().getByDom($_gba6fcxfje4c0mwy.fromDom(editor.editorContainer));
                component.each(function (container) {
                  if (Swapping.isAlpha(container)) {
                    $_gal684yzje4c0n7h.openLink(target.dom());
                  }
                });
              }
            }
          },
          container: $_gba6fcxfje4c0mwy.fromDom(editor.editorContainer),
          socket: $_gba6fcxfje4c0mwy.fromDom(editor.contentAreaContainer),
          toolstrip: $_gba6fcxfje4c0mwy.fromDom(editor.editorContainer.querySelector('.' + $_chdthezeje4c0nap.resolve('toolstrip'))),
          toolbar: $_gba6fcxfje4c0mwy.fromDom(editor.editorContainer.querySelector('.' + $_chdthezeje4c0nap.resolve('toolbar'))),
          dropup: realm.dropup(),
          alloy: realm.system(),
          translate: $_82nexzwjje4c0mss.noop,
          setReadOnly: function (ro) {
            setReadOnly(readOnlyGroups, mainGroups, ro);
          }
        });
        var hideDropup = function () {
          realm.dropup().disappear(function () {
            realm.system().broadcastOn([$_30j9u8z1je4c0n7k.dropupDismissed()], {});
          });
        };
        $_5hzmsmxlje4c0mxh.registerInspector('remove this', realm.system());
        var backToMaskGroup = {
          label: 'The first group',
          scrollable: false,
          items: [$_ehma3qzfje4c0nau.forToolbar('back', function () {
              editor.selection.collapse();
              realm.exit();
            }, {})]
        };
        var backToReadOnlyGroup = {
          label: 'Back to read only',
          scrollable: false,
          items: [$_ehma3qzfje4c0nau.forToolbar('readonly-back', function () {
              setReadOnly(readOnlyGroups, mainGroups, true);
            }, {})]
        };
        var readOnlyGroup = {
          label: 'The read only mode group',
          scrollable: true,
          items: []
        };
        var features = $_9tt2e6z2je4c0n7o.setup(realm, editor);
        var items = $_9tt2e6z2je4c0n7o.detect(editor.settings, features);
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
        $_59jwjt169je4c0ozw.init(realm, editor);
      });
      return {
        iframeContainer: realm.socket().element().dom(),
        editorContainer: realm.element().dom()
      };
    };
    return {
      getNotificationManagerImpl: function () {
        return {
          open: $_82nexzwjje4c0mss.identity,
          close: $_82nexzwjje4c0mss.noop,
          reposition: $_82nexzwjje4c0mss.noop,
          getArgs: $_82nexzwjje4c0mss.identity
        };
      },
      renderUI: renderUI
    };
  });
  function Theme () {
  }

  return Theme;

}());
})();
