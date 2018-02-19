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
  var $_a3rnw0wjjducwv31 = {
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

  var $_cp12t3wijducwv2w = {
    contextmenu: $_a3rnw0wjjducwv31.constant('contextmenu'),
    touchstart: $_a3rnw0wjjducwv31.constant('touchstart'),
    touchmove: $_a3rnw0wjjducwv31.constant('touchmove'),
    touchend: $_a3rnw0wjjducwv31.constant('touchend'),
    gesturestart: $_a3rnw0wjjducwv31.constant('gesturestart'),
    mousedown: $_a3rnw0wjjducwv31.constant('mousedown'),
    mousemove: $_a3rnw0wjjducwv31.constant('mousemove'),
    mouseout: $_a3rnw0wjjducwv31.constant('mouseout'),
    mouseup: $_a3rnw0wjjducwv31.constant('mouseup'),
    mouseover: $_a3rnw0wjjducwv31.constant('mouseover'),
    focusin: $_a3rnw0wjjducwv31.constant('focusin'),
    keydown: $_a3rnw0wjjducwv31.constant('keydown'),
    input: $_a3rnw0wjjducwv31.constant('input'),
    change: $_a3rnw0wjjducwv31.constant('change'),
    focus: $_a3rnw0wjjducwv31.constant('focus'),
    click: $_a3rnw0wjjducwv31.constant('click'),
    transitionend: $_a3rnw0wjjducwv31.constant('transitionend'),
    selectstart: $_a3rnw0wjjducwv31.constant('selectstart')
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
  var $_89w2qewljducwv35 = { cached: cached };

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
  var $_2tftpqwojducwv3d = {
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
      version: $_2tftpqwojducwv3d.unknown()
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
  var $_noxaewnjducwv37 = {
    unknown: unknown$1,
    nu: nu$1,
    edge: $_a3rnw0wjjducwv31.constant(edge),
    chrome: $_a3rnw0wjjducwv31.constant(chrome),
    ie: $_a3rnw0wjjducwv31.constant(ie),
    opera: $_a3rnw0wjjducwv31.constant(opera),
    firefox: $_a3rnw0wjjducwv31.constant(firefox),
    safari: $_a3rnw0wjjducwv31.constant(safari)
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
      version: $_2tftpqwojducwv3d.unknown()
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
  var $_7e6sbuwpjducwv3e = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_a3rnw0wjjducwv31.constant(windows),
    ios: $_a3rnw0wjjducwv31.constant(ios),
    android: $_a3rnw0wjjducwv31.constant(android),
    linux: $_a3rnw0wjjducwv31.constant(linux),
    osx: $_a3rnw0wjjducwv31.constant(osx),
    solaris: $_a3rnw0wjjducwv31.constant(solaris),
    freebsd: $_a3rnw0wjjducwv31.constant(freebsd)
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
      isiPad: $_a3rnw0wjjducwv31.constant(isiPad),
      isiPhone: $_a3rnw0wjjducwv31.constant(isiPhone),
      isTablet: $_a3rnw0wjjducwv31.constant(isTablet),
      isPhone: $_a3rnw0wjjducwv31.constant(isPhone),
      isTouch: $_a3rnw0wjjducwv31.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_a3rnw0wjjducwv31.constant(iOSwebview)
    };
  }

  var never$1 = $_a3rnw0wjjducwv31.never;
  var always$1 = $_a3rnw0wjjducwv31.always;
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
      toString: $_a3rnw0wjjducwv31.constant('none()')
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
  var $_e31jlowsjducwv3m = {
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
    return $_e31jlowsjducwv3m.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$1(browsers, userAgent).map(function (browser) {
      var version = $_2tftpqwojducwv3d.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$1(oses, userAgent).map(function (os) {
      var version = $_2tftpqwojducwv3d.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_2fn11nwrjducwv3j = {
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
  var $_91mnzmwwjducwv42 = {
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
  var $_f5a9x5wxjducwv43 = {
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
    return startsWith(str, prefix) ? $_91mnzmwwjducwv42.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_91mnzmwwjducwv42.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_91mnzmwwjducwv42.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_91mnzmwwjducwv42.addToEnd(str, prefix);
  };
  var contains$1 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_f5a9x5wxjducwv43.head(str).bind(function (head) {
      return $_f5a9x5wxjducwv43.tail(str).map(function (tail) {
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
  var $_2zs55cwvjducwv40 = {
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
      return $_2zs55cwvjducwv40.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_2zs55cwvjducwv40.contains(uastring, 'edge/') && $_2zs55cwvjducwv40.contains(uastring, 'chrome') && $_2zs55cwvjducwv40.contains(uastring, 'safari') && $_2zs55cwvjducwv40.contains(uastring, 'applewebkit');
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
        return $_2zs55cwvjducwv40.contains(uastring, 'chrome') && !$_2zs55cwvjducwv40.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_2zs55cwvjducwv40.contains(uastring, 'msie') || $_2zs55cwvjducwv40.contains(uastring, 'trident');
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
        return ($_2zs55cwvjducwv40.contains(uastring, 'safari') || $_2zs55cwvjducwv40.contains(uastring, 'mobile/')) && $_2zs55cwvjducwv40.contains(uastring, 'applewebkit');
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
        return $_2zs55cwvjducwv40.contains(uastring, 'iphone') || $_2zs55cwvjducwv40.contains(uastring, 'ipad');
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
  var $_evdhxqwujducwv3u = {
    browsers: $_a3rnw0wjjducwv31.constant(browsers),
    oses: $_a3rnw0wjjducwv31.constant(oses)
  };

  var detect$2 = function (userAgent) {
    var browsers = $_evdhxqwujducwv3u.browsers();
    var oses = $_evdhxqwujducwv3u.oses();
    var browser = $_2fn11nwrjducwv3j.detectBrowser(browsers, userAgent).fold($_noxaewnjducwv37.unknown, $_noxaewnjducwv37.nu);
    var os = $_2fn11nwrjducwv3j.detectOs(oses, userAgent).fold($_7e6sbuwpjducwv3e.unknown, $_7e6sbuwpjducwv3e.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_3xg1nnwmjducwv36 = { detect: detect$2 };

  var detect$3 = $_89w2qewljducwv35.cached(function () {
    var userAgent = navigator.userAgent;
    return $_3xg1nnwmjducwv36.detect(userAgent);
  });
  var $_f3swp0wkjducwv33 = { detect: detect$3 };

  var alloy = { tap: $_a3rnw0wjjducwv31.constant('alloy.tap') };
  var $_c92nqswhjducwv2r = {
    focus: $_a3rnw0wjjducwv31.constant('alloy.focus'),
    postBlur: $_a3rnw0wjjducwv31.constant('alloy.blur.post'),
    receive: $_a3rnw0wjjducwv31.constant('alloy.receive'),
    execute: $_a3rnw0wjjducwv31.constant('alloy.execute'),
    focusItem: $_a3rnw0wjjducwv31.constant('alloy.focus.item'),
    tap: alloy.tap,
    tapOrClick: $_f3swp0wkjducwv33.detect().deviceType.isTouch() ? alloy.tap : $_cp12t3wijducwv2w.click,
    longpress: $_a3rnw0wjjducwv31.constant('alloy.longpress'),
    sandboxClose: $_a3rnw0wjjducwv31.constant('alloy.sandbox.close'),
    systemInit: $_a3rnw0wjjducwv31.constant('alloy.system.init'),
    windowScroll: $_a3rnw0wjjducwv31.constant('alloy.system.scroll'),
    attachedToDom: $_a3rnw0wjjducwv31.constant('alloy.system.attached'),
    detachedFromDom: $_a3rnw0wjjducwv31.constant('alloy.system.detached'),
    changeTab: $_a3rnw0wjjducwv31.constant('alloy.change.tab'),
    dismissTab: $_a3rnw0wjjducwv31.constant('alloy.dismiss.tab')
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
  var $_9yomlywzjducwv46 = {
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
    var bothObjects = $_9yomlywzjducwv46.isObject(old) && $_9yomlywzjducwv46.isObject(nu);
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
  var $_5xeczzwyjducwv44 = {
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
  var $_2vh9dzx0jducwv47 = {
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
    emit(component, $_c92nqswhjducwv2r.execute());
  };
  var dispatch = function (component, target, event) {
    dispatchWith(component, target, event, {});
  };
  var dispatchWith = function (component, target, event, properties) {
    var data = $_5xeczzwyjducwv44.deepMerge({ target: target }, properties);
    component.getSystem().triggerEvent(event, target, $_2vh9dzx0jducwv47.map(data, $_a3rnw0wjjducwv31.constant));
  };
  var dispatchEvent = function (component, target, event, simulatedEvent) {
    component.getSystem().triggerEvent(event, target, simulatedEvent.event());
  };
  var dispatchFocus = function (component, target) {
    component.getSystem().triggerFocus(target, component.element());
  };
  var $_51mp15wgjducwv2k = {
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
      $_e31jlowsjducwv3m.each(fields, function (name, i) {
        struct[name] = $_a3rnw0wjjducwv31.constant(values[i]);
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
    if (!$_9yomlywzjducwv46.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_e31jlowsjducwv3m.each(array, function (a) {
      if (!$_9yomlywzjducwv46.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_e31jlowsjducwv3m.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_1fk4ldx7jducwv51 = {
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
    $_1fk4ldx7jducwv51.validateStrArr('required', required);
    $_1fk4ldx7jducwv51.validateStrArr('optional', optional);
    $_1fk4ldx7jducwv51.checkDupes(everything);
    return function (obj) {
      var keys = $_2vh9dzx0jducwv47.keys(obj);
      var allReqd = $_e31jlowsjducwv3m.forall(required, function (req) {
        return $_e31jlowsjducwv3m.contains(keys, req);
      });
      if (!allReqd)
        $_1fk4ldx7jducwv51.reqMessage(required, keys);
      var unsupported = $_e31jlowsjducwv3m.filter(keys, function (key) {
        return !$_e31jlowsjducwv3m.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_1fk4ldx7jducwv51.unsuppMessage(unsupported);
      var r = {};
      $_e31jlowsjducwv3m.each(required, function (req) {
        r[req] = $_a3rnw0wjjducwv31.constant(obj[req]);
      });
      $_e31jlowsjducwv3m.each(optional, function (opt) {
        r[opt] = $_a3rnw0wjjducwv31.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? Option.some(obj[opt]) : Option.none());
      });
      return r;
    };
  }

  var $_73sv11x4jducwv4t = {
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
  var $_eivl6dx8jducwv53 = { toArray: toArray };

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
  var $_brq8e7xcjducwv5e = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_brq8e7xcjducwv5e.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_f8d9ygxbjducwv5b = { getOrDie: getOrDie };

  var node = function () {
    var f = $_f8d9ygxbjducwv5b.getOrDie('Node');
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
  var $_2lkevgxajducwv5a = {
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
    return { dom: $_a3rnw0wjjducwv31.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return Option.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_dqo9uvxfjducwv5k = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_9axs52xgjducwv5o = {
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

  var ELEMENT = $_9axs52xgjducwv5o.ELEMENT;
  var DOCUMENT = $_9axs52xgjducwv5o.DOCUMENT;
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
    return bypassSelector(base) ? [] : $_e31jlowsjducwv3m.map(base.querySelectorAll(selector), $_dqo9uvxfjducwv5k.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? Option.none() : Option.from(base.querySelector(selector)).map($_dqo9uvxfjducwv5k.fromDom);
  };
  var $_a1a6ctxejducwv5f = {
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
    return $_e31jlowsjducwv3m.exists(elements, $_a3rnw0wjjducwv31.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_2lkevgxajducwv5a.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_f3swp0wkjducwv33.detect().browser;
  var contains$2 = browser.isIE() ? ieContains : regularContains;
  var $_3u3sm2x9jducwv54 = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains$2,
    is: $_a1a6ctxejducwv5f.is
  };

  var owner = function (element) {
    return $_dqo9uvxfjducwv5k.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_dqo9uvxfjducwv5k.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_dqo9uvxfjducwv5k.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return Option.from(dom.parentNode).map($_dqo9uvxfjducwv5k.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_e31jlowsjducwv3m.findIndex(kin, function (elem) {
        return $_3u3sm2x9jducwv54.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_9yomlywzjducwv46.isFunction(isRoot) ? isRoot : $_a3rnw0wjjducwv31.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_dqo9uvxfjducwv5k.fromDom(rawParent);
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
      return $_e31jlowsjducwv3m.filter(elements, function (x) {
        return !$_3u3sm2x9jducwv54.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return Option.from(dom.offsetParent).map($_dqo9uvxfjducwv5k.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.previousSibling).map($_dqo9uvxfjducwv5k.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.nextSibling).map($_dqo9uvxfjducwv5k.fromDom);
  };
  var prevSiblings = function (element) {
    return $_e31jlowsjducwv3m.reverse($_eivl6dx8jducwv53.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_eivl6dx8jducwv53.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_e31jlowsjducwv3m.map(dom.childNodes, $_dqo9uvxfjducwv5k.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return Option.from(children[index]).map($_dqo9uvxfjducwv5k.fromDom);
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
  var spot = $_73sv11x4jducwv4t.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_375a04x3jducwv4l = {
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
    var parent = $_375a04x3jducwv4l.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_375a04x3jducwv4l.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_375a04x3jducwv4l.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_375a04x3jducwv4l.firstChild(parent);
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
    $_375a04x3jducwv4l.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_f20r2yx2jducwv4k = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap
  };

  var before$1 = function (marker, elements) {
    $_e31jlowsjducwv3m.each(elements, function (x) {
      $_f20r2yx2jducwv4k.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_e31jlowsjducwv3m.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_f20r2yx2jducwv4k.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_e31jlowsjducwv3m.each(elements.slice().reverse(), function (x) {
      $_f20r2yx2jducwv4k.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_e31jlowsjducwv3m.each(elements, function (x) {
      $_f20r2yx2jducwv4k.append(parent, x);
    });
  };
  var $_f9ml5kxijducwv5s = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_e31jlowsjducwv3m.each($_375a04x3jducwv4l.children(element), function (rogue) {
      remove(rogue);
    });
  };
  var remove = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_375a04x3jducwv4l.children(wrapper);
    if (children.length > 0)
      $_f9ml5kxijducwv5s.before(wrapper, children);
    remove(wrapper);
  };
  var $_cdnwblxhjducwv5p = {
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
    return type(element) === $_9axs52xgjducwv5o.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_9axs52xgjducwv5o.ELEMENT);
  var isText = isType$1($_9axs52xgjducwv5o.TEXT);
  var isDocument = isType$1($_9axs52xgjducwv5o.DOCUMENT);
  var $_en9ft8xkjducwv5x = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var inBody = function (element) {
    var dom = $_en9ft8xkjducwv5x.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_89w2qewljducwv35.cached(function () {
    return getBody($_dqo9uvxfjducwv5k.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_dqo9uvxfjducwv5k.fromDom(body);
  };
  var $_8em3sbxjjducwv5v = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var fireDetaching = function (component) {
    $_51mp15wgjducwv2k.emit(component, $_c92nqswhjducwv2r.detachedFromDom());
    var children = component.components();
    $_e31jlowsjducwv3m.each(children, fireDetaching);
  };
  var fireAttaching = function (component) {
    var children = component.components();
    $_e31jlowsjducwv3m.each(children, fireAttaching);
    $_51mp15wgjducwv2k.emit(component, $_c92nqswhjducwv2r.attachedToDom());
  };
  var attach = function (parent, child) {
    attachWith(parent, child, $_f20r2yx2jducwv4k.append);
  };
  var attachWith = function (parent, child, insertion) {
    parent.getSystem().addToWorld(child);
    insertion(parent.element(), child.element());
    if ($_8em3sbxjjducwv5v.inBody(parent.element()))
      fireAttaching(child);
    parent.syncComponents();
  };
  var doDetach = function (component) {
    fireDetaching(component);
    $_cdnwblxhjducwv5p.remove(component.element());
    component.getSystem().removeFromWorld(component);
  };
  var detach = function (component) {
    var parent = $_375a04x3jducwv4l.parent(component.element()).bind(function (p) {
      return component.getSystem().getByDom(p).fold(Option.none, Option.some);
    });
    doDetach(component);
    parent.each(function (p) {
      p.syncComponents();
    });
  };
  var detachChildren = function (component) {
    var subs = component.components();
    $_e31jlowsjducwv3m.each(subs, doDetach);
    $_cdnwblxhjducwv5p.empty(component.element());
    component.syncComponents();
  };
  var attachSystem = function (element, guiSystem) {
    $_f20r2yx2jducwv4k.append(element, guiSystem.element());
    var children = $_375a04x3jducwv4l.children(guiSystem.element());
    $_e31jlowsjducwv3m.each(children, function (child) {
      guiSystem.getByDom(child).each(fireAttaching);
    });
  };
  var detachSystem = function (guiSystem) {
    var children = $_375a04x3jducwv4l.children(guiSystem.element());
    $_e31jlowsjducwv3m.each(children, function (child) {
      guiSystem.getByDom(child).each(fireDetaching);
    });
    $_cdnwblxhjducwv5p.remove(guiSystem.element());
  };
  var $_8dj4zcx1jducwv49 = {
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
    return $_375a04x3jducwv4l.children($_dqo9uvxfjducwv5k.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_e31jlowsjducwv3m.map(tags, function (x) {
      return $_dqo9uvxfjducwv5k.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_e31jlowsjducwv3m.map(texts, function (x) {
      return $_dqo9uvxfjducwv5k.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_e31jlowsjducwv3m.map(nodes, $_dqo9uvxfjducwv5k.fromDom);
  };
  var $_fa8i7wxpjducwv6e = {
    fromHtml: fromHtml$1,
    fromTags: fromTags,
    fromText: fromText$1,
    fromDom: fromDom$1
  };

  var get = function (element) {
    return element.dom().innerHTML;
  };
  var set = function (element, content) {
    var owner = $_375a04x3jducwv4l.owner(element);
    var docDom = owner.dom();
    var fragment = $_dqo9uvxfjducwv5k.fromDom(docDom.createDocumentFragment());
    var contentElements = $_fa8i7wxpjducwv6e.fromHtml(content, docDom);
    $_f9ml5kxijducwv5s.append(fragment, contentElements);
    $_cdnwblxhjducwv5p.empty(element);
    $_f20r2yx2jducwv4k.append(element, fragment);
  };
  var getOuter = function (element) {
    var container = $_dqo9uvxfjducwv5k.fromTag('div');
    var clone = $_dqo9uvxfjducwv5k.fromDom(element.dom().cloneNode(true));
    $_f20r2yx2jducwv4k.append(container, clone);
    return get(container);
  };
  var $_7rrdsexojducwv6c = {
    get: get,
    set: set,
    getOuter: getOuter
  };

  var rawSet = function (dom, key, value) {
    if ($_9yomlywzjducwv46.isString(value) || $_9yomlywzjducwv46.isBoolean(value) || $_9yomlywzjducwv46.isNumber(value)) {
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
    $_2vh9dzx0jducwv47.each(attrs, function (v, k) {
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
    return $_e31jlowsjducwv3m.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has(source, attr) && !has(destination, attr))
      set$1(destination, attr, get$1(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_en9ft8xkjducwv5x.isElement(source) || !$_en9ft8xkjducwv5x.isElement(destination))
      return;
    $_e31jlowsjducwv3m.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_6yofxrjducwv6k = {
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
    return $_dqo9uvxfjducwv5k.fromDom(original.dom().cloneNode(deep));
  };
  var shallow$1 = function (original) {
    return clone$1(original, false);
  };
  var deep$1 = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_dqo9uvxfjducwv5k.fromTag(tag);
    var attributes = $_6yofxrjducwv6k.clone(original);
    $_6yofxrjducwv6k.setAll(nu, attributes);
    return nu;
  };
  var copy = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_375a04x3jducwv4l.children(deep$1(original));
    $_f9ml5kxijducwv5s.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_f20r2yx2jducwv4k.before(original, nu);
    var children = $_375a04x3jducwv4l.children(original);
    $_f9ml5kxijducwv5s.append(nu, children);
    $_cdnwblxhjducwv5p.remove(original);
    return nu;
  };
  var $_am2x8lxqjducwv6i = {
    shallow: shallow$1,
    shallowAs: shallowAs,
    deep: deep$1,
    copy: copy,
    mutate: mutate
  };

  var getHtml = function (element) {
    var clone = $_am2x8lxqjducwv6i.shallow(element);
    return $_7rrdsexojducwv6c.getOuter(clone);
  };
  var $_4sfpxlxnjducwv69 = { getHtml: getHtml };

  var element = function (elem) {
    return $_4sfpxlxnjducwv69.getHtml(elem);
  };
  var $_9uv2jrxmjducwv68 = { element: element };

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
      isValue: $_a3rnw0wjjducwv31.always,
      isError: $_a3rnw0wjjducwv31.never,
      getOr: $_a3rnw0wjjducwv31.constant(o),
      getOrThunk: $_a3rnw0wjjducwv31.constant(o),
      getOrDie: $_a3rnw0wjjducwv31.constant(o),
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
      return $_a3rnw0wjjducwv31.die(message)();
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
      is: $_a3rnw0wjjducwv31.never,
      isValue: $_a3rnw0wjjducwv31.never,
      isError: $_a3rnw0wjjducwv31.always,
      getOr: $_a3rnw0wjjducwv31.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_a3rnw0wjjducwv31.noop,
      bind: bind,
      exists: $_a3rnw0wjjducwv31.never,
      forall: $_a3rnw0wjjducwv31.always,
      toOption: Option.none
    };
  };
  var Result = {
    value: value$1,
    error: error
  };

  var generate = function (cases) {
    if (!$_9yomlywzjducwv46.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_e31jlowsjducwv3m.each(cases, function (acase, count) {
      var keys = $_2vh9dzx0jducwv47.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_9yomlywzjducwv46.isArray(value)) {
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
          var branchKeys = $_2vh9dzx0jducwv47.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_e31jlowsjducwv3m.forall(constructors, function (reqKey) {
            return $_e31jlowsjducwv3m.contains(branchKeys, reqKey);
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
  var $_dmy3o8xwjducwv7a = { generate: generate };

  var comparison = $_dmy3o8xwjducwv7a.generate([
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
    $_e31jlowsjducwv3m.each(results, function (result) {
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
  var $_4ugwezxvjducwv78 = {
    partition: partition$1,
    compare: compare
  };

  var mergeValues = function (values, base) {
    return Result.value($_5xeczzwyjducwv44.deepMerge.apply(undefined, [base].concat(values)));
  };
  var mergeErrors = function (errors) {
    return $_a3rnw0wjjducwv31.compose(Result.error, $_e31jlowsjducwv3m.flatten)(errors);
  };
  var consolidateObj = function (objects, base) {
    var partitions = $_4ugwezxvjducwv78.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : mergeValues(partitions.values, base);
  };
  var consolidateArr = function (objects) {
    var partitions = $_4ugwezxvjducwv78.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : Result.value(partitions.values);
  };
  var $_d4a0d4xtjducwv6t = {
    consolidateObj: consolidateObj,
    consolidateArr: consolidateArr
  };

  var narrow = function (obj, fields) {
    var r = {};
    $_e31jlowsjducwv3m.each(fields, function (field) {
      if (obj[field] !== undefined && obj.hasOwnProperty(field))
        r[field] = obj[field];
    });
    return r;
  };
  var indexOnKey = function (array, key) {
    var obj = {};
    $_e31jlowsjducwv3m.each(array, function (a) {
      var keyValue = a[key];
      obj[keyValue] = a;
    });
    return obj;
  };
  var exclude = function (obj, fields) {
    var r = {};
    $_2vh9dzx0jducwv47.each(obj, function (v, k) {
      if (!$_e31jlowsjducwv3m.contains(fields, k)) {
        r[k] = v;
      }
    });
    return r;
  };
  var $_djdb6kxxjducwv7c = {
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
  var $_cwo3zpxyjducwv7h = {
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
    $_e31jlowsjducwv3m.each(keyvalues, function (kv) {
      r[kv.key] = kv.value;
    });
    return r;
  };
  var $_fjz44hxzjducwv7j = {
    wrap: wrap$1,
    wrapAll: wrapAll
  };

  var narrow$1 = function (obj, fields) {
    return $_djdb6kxxjducwv7c.narrow(obj, fields);
  };
  var exclude$1 = function (obj, fields) {
    return $_djdb6kxxjducwv7c.exclude(obj, fields);
  };
  var readOpt$1 = function (key) {
    return $_cwo3zpxyjducwv7h.readOpt(key);
  };
  var readOr$1 = function (key, fallback) {
    return $_cwo3zpxyjducwv7h.readOr(key, fallback);
  };
  var readOptFrom$1 = function (obj, key) {
    return $_cwo3zpxyjducwv7h.readOptFrom(obj, key);
  };
  var wrap$2 = function (key, value) {
    return $_fjz44hxzjducwv7j.wrap(key, value);
  };
  var wrapAll$1 = function (keyvalues) {
    return $_fjz44hxzjducwv7j.wrapAll(keyvalues);
  };
  var indexOnKey$1 = function (array, key) {
    return $_djdb6kxxjducwv7c.indexOnKey(array, key);
  };
  var consolidate = function (objs, base) {
    return $_d4a0d4xtjducwv6t.consolidateObj(objs, base);
  };
  var hasKey$1 = function (obj, key) {
    return $_cwo3zpxyjducwv7h.hasKey(obj, key);
  };
  var $_e7rlwgxsjducwv6r = {
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
  var $_4d6y5ey0jducwv7l = {
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
      return $_e31jlowsjducwv3m.find(lines, function (line) {
        return line.indexOf('alloy') > 0 && !$_e31jlowsjducwv3m.exists(path$1, function (p) {
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
    logEventCut: $_a3rnw0wjjducwv31.noop,
    logEventStopped: $_a3rnw0wjjducwv31.noop,
    logNoParent: $_a3rnw0wjjducwv31.noop,
    logEventNoHandlers: $_a3rnw0wjjducwv31.noop,
    logEventResponse: $_a3rnw0wjjducwv31.noop,
    write: $_a3rnw0wjjducwv31.noop
  };
  var monitorEvent = function (eventName, initialTarget, f) {
    var logger = debugging && (eventsMonitored === '*' || $_e31jlowsjducwv3m.contains(eventsMonitored, eventName)) ? function () {
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
          if ($_e31jlowsjducwv3m.contains([
              'mousemove',
              'mouseover',
              'mouseout',
              $_c92nqswhjducwv2r.systemInit()
            ], eventName))
            return;
          console.log(eventName, {
            event: eventName,
            target: initialTarget.dom(),
            sequence: $_e31jlowsjducwv3m.map(sequence, function (s) {
              if (!$_e31jlowsjducwv3m.contains([
                  'cut',
                  'stopped',
                  'response'
                ], s.outcome))
                return s.outcome;
              else
                return '{' + s.purpose + '} ' + s.outcome + ' at (' + $_9uv2jrxmjducwv68.element(s.target) + ')';
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
        '(element)': $_9uv2jrxmjducwv68.element(c.element()),
        '(initComponents)': $_e31jlowsjducwv3m.map(cSpec.components !== undefined ? cSpec.components : [], go),
        '(components)': $_e31jlowsjducwv3m.map(c.components(), go),
        '(bound.events)': $_2vh9dzx0jducwv47.mapToArray(c.events(), function (v, k) {
          return [k];
        }).join(', '),
        '(behaviours)': cSpec.behaviours !== undefined ? $_2vh9dzx0jducwv47.map(cSpec.behaviours, function (v, k) {
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
          var connections = $_2vh9dzx0jducwv47.keys(systems);
          return $_4d6y5ey0jducwv7l.findMap(connections, function (conn) {
            var connGui = systems[conn];
            return connGui.getByUid(uid).toOption().map(function (comp) {
              return $_e7rlwgxsjducwv6r.wrap($_9uv2jrxmjducwv68.element(comp.element()), inspectorInfo(comp));
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
  var $_9i75u4xljducwv5z = {
    logHandler: logHandler,
    noLogger: $_a3rnw0wjjducwv31.constant(ignoreEvent),
    getTrace: getTrace,
    monitorEvent: monitorEvent,
    isDebugging: $_a3rnw0wjjducwv31.constant(debugging),
    registerInspector: registerInspector
  };

  var isSource = function (component, simulatedEvent) {
    return $_3u3sm2x9jducwv54.eq(component.element(), simulatedEvent.event().target());
  };
  var $_2s3r90y5jducwv8e = { isSource: isSource };

  var adt = $_dmy3o8xwjducwv7a.generate([
    { strict: [] },
    { defaultedThunk: ['fallbackThunk'] },
    { asOption: [] },
    { asDefaultedOptionThunk: ['fallbackThunk'] },
    { mergeWithThunk: ['baseThunk'] }
  ]);
  var defaulted = function (fallback) {
    return adt.defaultedThunk($_a3rnw0wjjducwv31.constant(fallback));
  };
  var asDefaultedOption = function (fallback) {
    return adt.asDefaultedOptionThunk($_a3rnw0wjjducwv31.constant(fallback));
  };
  var mergeWith = function (base) {
    return adt.mergeWithThunk($_a3rnw0wjjducwv31.constant(base));
  };
  var $_2jq6gty8jducwv8w = {
    strict: adt.strict,
    asOption: adt.asOption,
    defaulted: defaulted,
    defaultedThunk: adt.defaultedThunk,
    asDefaultedOption: asDefaultedOption,
    asDefaultedOptionThunk: adt.asDefaultedOptionThunk,
    mergeWith: mergeWith,
    mergeWithThunk: adt.mergeWithThunk
  };

  var typeAdt = $_dmy3o8xwjducwv7a.generate([
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
  var fieldAdt = $_dmy3o8xwjducwv7a.generate([
    {
      field: [
        'name',
        'presence',
        'type'
      ]
    },
    { state: ['name'] }
  ]);
  var $_8anr5uyajducwv9m = {
    typeAdt: typeAdt,
    fieldAdt: fieldAdt
  };

  var json = function () {
    return $_f8d9ygxbjducwv5b.getOrDie('JSON');
  };
  var parse = function (obj) {
    return json().parse(obj);
  };
  var stringify = function (obj, replacer, space) {
    return json().stringify(obj, replacer, space);
  };
  var $_dl4ljnydjducwv9x = {
    parse: parse,
    stringify: stringify
  };

  var formatObj = function (input) {
    return $_9yomlywzjducwv46.isObject(input) && $_2vh9dzx0jducwv47.keys(input).length > 100 ? ' removed due to size' : $_dl4ljnydjducwv9x.stringify(input, null, 2);
  };
  var formatErrors = function (errors) {
    var es = errors.length > 10 ? errors.slice(0, 10).concat([{
        path: [],
        getErrorInfo: function () {
          return '... (only showing first ten failures)';
        }
      }]) : errors;
    return $_e31jlowsjducwv3m.map(es, function (e) {
      return 'Failed path: (' + e.path.join(' > ') + ')\n' + e.getErrorInfo();
    });
  };
  var $_axuwtgycjducwv9r = {
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
      return 'Could not find valid *strict* value for "' + key + '" in ' + $_axuwtgycjducwv9r.formatObj(obj);
    });
  };
  var missingKey = function (path, key) {
    return nu$3(path, function () {
      return 'Choice schema did not contain choice key: "' + key + '"';
    });
  };
  var missingBranch = function (path, branches, branch) {
    return nu$3(path, function () {
      return 'The chosen schema: "' + branch + '" did not exist in branches: ' + $_axuwtgycjducwv9r.formatObj(branches);
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
  var $_ex7wzuybjducwv9o = {
    missingStrict: missingStrict,
    missingKey: missingKey,
    missingBranch: missingBranch,
    unsupportedFields: unsupportedFields,
    custom: custom,
    toString: toString
  };

  var adt$1 = $_dmy3o8xwjducwv7a.generate([
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
    return adt$1.state(okey, $_a3rnw0wjjducwv31.constant(value));
  };
  var snapshot = function (okey) {
    return adt$1.state(okey, $_a3rnw0wjjducwv31.identity);
  };
  var strictAccess = function (path, obj, key) {
    return $_cwo3zpxyjducwv7h.readOptFrom(obj, key).fold(function () {
      return $_ex7wzuybjducwv9o.missingStrict(path, key, obj);
    }, Result.value);
  };
  var fallbackAccess = function (obj, key, fallbackThunk) {
    var v = $_cwo3zpxyjducwv7h.readOptFrom(obj, key).fold(function () {
      return fallbackThunk(obj);
    }, $_a3rnw0wjjducwv31.identity);
    return Result.value(v);
  };
  var optionAccess = function (obj, key) {
    return Result.value($_cwo3zpxyjducwv7h.readOptFrom(obj, key));
  };
  var optionDefaultedAccess = function (obj, key, fallback) {
    var opt = $_cwo3zpxyjducwv7h.readOptFrom(obj, key).map(function (val) {
      return val === true ? fallback(obj) : val;
    });
    return Result.value(opt);
  };
  var cExtractOne = function (path, obj, field, strength) {
    return field.fold(function (key, okey, presence, prop) {
      var bundle = function (av) {
        return prop.extract(path.concat([key]), strength, av).map(function (res) {
          return $_fjz44hxzjducwv7j.wrap(okey, strength(res));
        });
      };
      var bundleAsOption = function (optValue) {
        return optValue.fold(function () {
          var outcome = $_fjz44hxzjducwv7j.wrap(okey, strength(Option.none()));
          return Result.value(outcome);
        }, function (ov) {
          return prop.extract(path.concat([key]), strength, ov).map(function (res) {
            return $_fjz44hxzjducwv7j.wrap(okey, strength(Option.some(res)));
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
          return fallbackAccess(obj, key, $_a3rnw0wjjducwv31.constant({})).map(function (v) {
            return $_5xeczzwyjducwv44.deepMerge(base, v);
          }).bind(bundle);
        });
      }();
    }, function (okey, instantiator) {
      var state = instantiator(obj);
      return Result.value($_fjz44hxzjducwv7j.wrap(okey, strength(state)));
    });
  };
  var cExtract = function (path, obj, fields, strength) {
    var results = $_e31jlowsjducwv3m.map(fields, function (field) {
      return cExtractOne(path, obj, field, strength);
    });
    return $_d4a0d4xtjducwv6t.consolidateObj(results, {});
  };
  var value$2 = function (validator) {
    var extract = function (path, strength, val) {
      return validator(val, strength).fold(function (err) {
        return $_ex7wzuybjducwv9o.custom(path, err);
      }, Result.value);
    };
    var toString = function () {
      return 'val';
    };
    var toDsl = function () {
      return $_8anr5uyajducwv9m.typeAdt.itemOf(validator);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var getSetKeys = function (obj) {
    var keys = $_2vh9dzx0jducwv47.keys(obj);
    return $_e31jlowsjducwv3m.filter(keys, function (k) {
      return $_e7rlwgxsjducwv6r.hasKey(obj, k);
    });
  };
  var objOnly = function (fields) {
    var delegate = obj(fields);
    var fieldNames = $_e31jlowsjducwv3m.foldr(fields, function (acc, f) {
      return f.fold(function (key) {
        return $_5xeczzwyjducwv44.deepMerge(acc, $_e7rlwgxsjducwv6r.wrap(key, true));
      }, $_a3rnw0wjjducwv31.constant(acc));
    }, {});
    var extract = function (path, strength, o) {
      var keys = $_9yomlywzjducwv46.isBoolean(o) ? [] : getSetKeys(o);
      var extra = $_e31jlowsjducwv3m.filter(keys, function (k) {
        return !$_e7rlwgxsjducwv6r.hasKey(fieldNames, k);
      });
      return extra.length === 0 ? delegate.extract(path, strength, o) : $_ex7wzuybjducwv9o.unsupportedFields(path, extra);
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
      var fieldStrings = $_e31jlowsjducwv3m.map(fields, function (field) {
        return field.fold(function (key, okey, presence, prop) {
          return key + ' -> ' + prop.toString();
        }, function (okey, instantiator) {
          return 'state(' + okey + ')';
        });
      });
      return 'obj{\n' + fieldStrings.join('\n') + '}';
    };
    var toDsl = function () {
      return $_8anr5uyajducwv9m.typeAdt.objOf($_e31jlowsjducwv3m.map(fields, function (f) {
        return f.fold(function (key, okey, presence, prop) {
          return $_8anr5uyajducwv9m.fieldAdt.field(key, presence, prop);
        }, function (okey, instantiator) {
          return $_8anr5uyajducwv9m.fieldAdt.state(okey);
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
      var results = $_e31jlowsjducwv3m.map(array, function (a, i) {
        return prop.extract(path.concat(['[' + i + ']']), strength, a);
      });
      return $_d4a0d4xtjducwv6t.consolidateArr(results);
    };
    var toString = function () {
      return 'array(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_8anr5uyajducwv9m.typeAdt.arrOf(prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var setOf = function (validator, prop) {
    var validateKeys = function (path, keys) {
      return arr(value$2(validator)).extract(path, $_a3rnw0wjjducwv31.identity, keys);
    };
    var extract = function (path, strength, o) {
      var keys = $_2vh9dzx0jducwv47.keys(o);
      return validateKeys(path, keys).bind(function (validKeys) {
        var schema = $_e31jlowsjducwv3m.map(validKeys, function (vk) {
          return adt$1.field(vk, vk, $_2jq6gty8jducwv8w.strict(), prop);
        });
        return obj(schema).extract(path, strength, o);
      });
    };
    var toString = function () {
      return 'setOf(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_8anr5uyajducwv9m.typeAdt.setOf(validator, prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var func = function (args, schema, retriever) {
    var delegate = value$2(function (f, strength) {
      return $_9yomlywzjducwv46.isFunction(f) ? Result.value(function () {
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
        return $_8anr5uyajducwv9m.typeAdt.func(args, schema);
      }
    };
  };
  var thunk = function (desc, processor) {
    var getP = $_89w2qewljducwv35.cached(function () {
      return processor();
    });
    var extract = function (path, strength, val) {
      return getP().extract(path, strength, val);
    };
    var toString = function () {
      return getP().toString();
    };
    var toDsl = function () {
      return $_8anr5uyajducwv9m.typeAdt.thunk(desc);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var anyValue = value$2(Result.value);
  var arrOfObj = $_a3rnw0wjjducwv31.compose(arr, obj);
  var $_78itzpy9jducwv95 = {
    anyValue: $_a3rnw0wjjducwv31.constant(anyValue),
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
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.strict(), $_78itzpy9jducwv95.anyValue());
  };
  var strictOf = function (key, schema) {
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.strict(), schema);
  };
  var strictFunction = function (key) {
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.strict(), $_78itzpy9jducwv95.value(function (f) {
      return $_9yomlywzjducwv46.isFunction(f) ? Result.value(f) : Result.error('Not a function');
    }));
  };
  var forbid = function (key, message) {
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.asOption(), $_78itzpy9jducwv95.value(function (v) {
      return Result.error('The field: ' + key + ' is forbidden. ' + message);
    }));
  };
  var strictArrayOf = function (key, prop) {
    return strictOf(key, prop);
  };
  var strictObjOf = function (key, objSchema) {
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.strict(), $_78itzpy9jducwv95.obj(objSchema));
  };
  var strictArrayOfObj = function (key, objFields) {
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.strict(), $_78itzpy9jducwv95.arrOfObj(objFields));
  };
  var option = function (key) {
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.asOption(), $_78itzpy9jducwv95.anyValue());
  };
  var optionOf = function (key, schema) {
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.asOption(), schema);
  };
  var optionObjOf = function (key, objSchema) {
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.asOption(), $_78itzpy9jducwv95.obj(objSchema));
  };
  var optionObjOfOnly = function (key, objSchema) {
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.asOption(), $_78itzpy9jducwv95.objOnly(objSchema));
  };
  var defaulted$1 = function (key, fallback) {
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.defaulted(fallback), $_78itzpy9jducwv95.anyValue());
  };
  var defaultedOf = function (key, fallback, schema) {
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.defaulted(fallback), schema);
  };
  var defaultedObjOf = function (key, fallback, objSchema) {
    return $_78itzpy9jducwv95.field(key, key, $_2jq6gty8jducwv8w.defaulted(fallback), $_78itzpy9jducwv95.obj(objSchema));
  };
  var field = function (key, okey, presence, prop) {
    return $_78itzpy9jducwv95.field(key, okey, presence, prop);
  };
  var state = function (okey, instantiator) {
    return $_78itzpy9jducwv95.state(okey, instantiator);
  };
  var $_csfrqy7jducwv8r = {
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
    var fields = $_e7rlwgxsjducwv6r.readOptFrom(branches, ch);
    return fields.fold(function () {
      return $_ex7wzuybjducwv9o.missingBranch(path, branches, ch);
    }, function (fs) {
      return $_78itzpy9jducwv95.obj(fs).extract(path.concat(['branch: ' + ch]), strength, input);
    });
  };
  var choose = function (key, branches) {
    var extract = function (path, strength, input) {
      var choice = $_e7rlwgxsjducwv6r.readOptFrom(input, key);
      return choice.fold(function () {
        return $_ex7wzuybjducwv9o.missingKey(path, key);
      }, function (chosen) {
        return chooseFrom(path, strength, input, branches, chosen);
      });
    };
    var toString = function () {
      return 'chooseOn(' + key + '). Possible values: ' + $_2vh9dzx0jducwv47.keys(branches);
    };
    var toDsl = function () {
      return $_8anr5uyajducwv9m.typeAdt.choiceOf(key, branches);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var $_f3n8wiyfjducwva5 = { choose: choose };

  var anyValue$1 = $_78itzpy9jducwv95.value(Result.value);
  var arrOfObj$1 = function (objFields) {
    return $_78itzpy9jducwv95.arrOfObj(objFields);
  };
  var arrOfVal = function () {
    return $_78itzpy9jducwv95.arr(anyValue$1);
  };
  var arrOf = $_78itzpy9jducwv95.arr;
  var objOf = $_78itzpy9jducwv95.obj;
  var objOfOnly = $_78itzpy9jducwv95.objOnly;
  var setOf$1 = $_78itzpy9jducwv95.setOf;
  var valueOf = function (validator) {
    return $_78itzpy9jducwv95.value(function (v) {
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
    return extract(label, prop, $_a3rnw0wjjducwv31.constant, obj);
  };
  var asRaw = function (label, prop, obj) {
    return extract(label, prop, $_a3rnw0wjjducwv31.identity, obj);
  };
  var getOrDie$1 = function (extraction) {
    return extraction.fold(function (errInfo) {
      throw new Error(formatError(errInfo));
    }, $_a3rnw0wjjducwv31.identity);
  };
  var asRawOrDie = function (label, prop, obj) {
    return getOrDie$1(asRaw(label, prop, obj));
  };
  var asStructOrDie = function (label, prop, obj) {
    return getOrDie$1(asStruct(label, prop, obj));
  };
  var formatError = function (errInfo) {
    return 'Errors: \n' + $_axuwtgycjducwv9r.formatErrors(errInfo.errors) + '\n\nInput object: ' + $_axuwtgycjducwv9r.formatObj(errInfo.input);
  };
  var choose$1 = function (key, branches) {
    return $_f3n8wiyfjducwva5.choose(key, branches);
  };
  var thunkOf = function (desc, schema) {
    return $_78itzpy9jducwv95.thunk(desc, schema);
  };
  var funcOrDie = function (args, schema) {
    var retriever = function (output, strength) {
      return getOrDie$1(extract('()', schema, strength, output));
    };
    return $_78itzpy9jducwv95.func(args, schema, retriever);
  };
  var $_1cyy8vyejducwva0 = {
    anyValue: $_a3rnw0wjjducwv31.constant(anyValue$1),
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
    if (!$_e7rlwgxsjducwv6r.hasKey(parts, 'can') && !$_e7rlwgxsjducwv6r.hasKey(parts, 'abort') && !$_e7rlwgxsjducwv6r.hasKey(parts, 'run'))
      throw new Error('EventHandler defined by: ' + $_dl4ljnydjducwv9x.stringify(parts, null, 2) + ' does not have can, abort, or run!');
    return $_1cyy8vyejducwva0.asRawOrDie('Extracting event.handler', $_1cyy8vyejducwva0.objOfOnly([
      $_csfrqy7jducwv8r.defaulted('can', $_a3rnw0wjjducwv31.constant(true)),
      $_csfrqy7jducwv8r.defaulted('abort', $_a3rnw0wjjducwv31.constant(false)),
      $_csfrqy7jducwv8r.defaulted('run', $_a3rnw0wjjducwv31.noop)
    ]), parts);
  };
  var all$1 = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_e31jlowsjducwv3m.foldl(handlers, function (acc, handler) {
        return acc && f(handler).apply(undefined, args);
      }, true);
    };
  };
  var any = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_e31jlowsjducwv3m.foldl(handlers, function (acc, handler) {
        return acc || f(handler).apply(undefined, args);
      }, false);
    };
  };
  var read = function (handler) {
    return $_9yomlywzjducwv46.isFunction(handler) ? {
      can: $_a3rnw0wjjducwv31.constant(true),
      abort: $_a3rnw0wjjducwv31.constant(false),
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
      $_e31jlowsjducwv3m.each(handlers, function (handler) {
        handler.run.apply(undefined, args);
      });
    };
    return nu$4({
      can: can,
      abort: abort,
      run: run
    });
  };
  var $_65hzn4y6jducwv8h = {
    read: read,
    fuse: fuse,
    nu: nu$4
  };

  var derive = $_e7rlwgxsjducwv6r.wrapAll;
  var abort = function (name, predicate) {
    return {
      key: name,
      value: $_65hzn4y6jducwv8h.nu({ abort: predicate })
    };
  };
  var can = function (name, predicate) {
    return {
      key: name,
      value: $_65hzn4y6jducwv8h.nu({ can: predicate })
    };
  };
  var preventDefault = function (name) {
    return {
      key: name,
      value: $_65hzn4y6jducwv8h.nu({
        run: function (component, simulatedEvent) {
          simulatedEvent.event().prevent();
        }
      })
    };
  };
  var run = function (name, handler) {
    return {
      key: name,
      value: $_65hzn4y6jducwv8h.nu({ run: handler })
    };
  };
  var runActionExtra = function (name, action, extra) {
    return {
      key: name,
      value: $_65hzn4y6jducwv8h.nu({
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
        value: $_65hzn4y6jducwv8h.nu({
          run: function (component, simulatedEvent) {
            if ($_2s3r90y5jducwv8e.isSource(component, simulatedEvent))
              handler(component, simulatedEvent);
          }
        })
      };
    };
  };
  var redirectToUid = function (name, uid) {
    return run(name, function (component, simulatedEvent) {
      component.getSystem().getByUid(uid).each(function (redirectee) {
        $_51mp15wgjducwv2k.dispatchEvent(redirectee, redirectee.element(), name, simulatedEvent);
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
  var $_gd6bsky4jducwv8a = {
    derive: derive,
    run: run,
    preventDefault: preventDefault,
    runActionExtra: runActionExtra,
    runOnAttached: runOnSourceName($_c92nqswhjducwv2r.attachedToDom()),
    runOnDetached: runOnSourceName($_c92nqswhjducwv2r.detachedFromDom()),
    runOnInit: runOnSourceName($_c92nqswhjducwv2r.systemInit()),
    runOnExecute: runOnName($_c92nqswhjducwv2r.execute()),
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
  var $_s04hbygjducwva8 = {
    markAsBehaviourApi: markAsBehaviourApi,
    markAsExtraApi: markAsExtraApi,
    markAsSketchApi: markAsSketchApi,
    getAnnotation: getAnnotation
  };

  var nu$5 = $_73sv11x4jducwv4t.immutableBag(['tag'], [
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
    return $_dl4ljnydjducwv9x.stringify(raw, null, 2);
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
  var $_7nj8bfyijducwval = {
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
  var nu$6 = $_73sv11x4jducwv4t.immutableBag([], fields);
  var derive$1 = function (settings) {
    var r = {};
    var keys = $_2vh9dzx0jducwv47.keys(settings);
    $_e31jlowsjducwv3m.each(keys, function (key) {
      settings[key].each(function (v) {
        r[key] = v;
      });
    });
    return nu$6(r);
  };
  var modToStr = function (mod) {
    var raw = modToRaw(mod);
    return $_dl4ljnydjducwv9x.stringify(raw, null, 2);
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
        return $_e7rlwgxsjducwv6r.wrap(key, arr2);
      });
    }, function (arr1) {
      return oArr2.fold(function () {
        return $_e7rlwgxsjducwv6r.wrap(key, arr1);
      }, function (arr2) {
        return $_e7rlwgxsjducwv6r.wrap(key, arr2);
      });
    });
  };
  var merge$1 = function (defnA, mod) {
    var raw = $_5xeczzwyjducwv44.deepMerge({
      tag: defnA.tag(),
      classes: mod.classes().getOr([]).concat(defnA.classes().getOr([])),
      attributes: $_5xeczzwyjducwv44.merge(defnA.attributes().getOr({}), mod.attributes().getOr({})),
      styles: $_5xeczzwyjducwv44.merge(defnA.styles().getOr({}), mod.styles().getOr({}))
    }, mod.innerHtml().or(defnA.innerHtml()).map(function (innerHtml) {
      return $_e7rlwgxsjducwv6r.wrap('innerHtml', innerHtml);
    }).getOr({}), clashingOptArrays('domChildren', mod.domChildren(), defnA.domChildren()), clashingOptArrays('defChildren', mod.defChildren(), defnA.defChildren()), mod.value().or(defnA.value()).map(function (value) {
      return $_e7rlwgxsjducwv6r.wrap('value', value);
    }).getOr({}));
    return $_7nj8bfyijducwval.nu(raw);
  };
  var $_5ldw5hyhjducwvac = {
    nu: nu$6,
    derive: derive$1,
    merge: merge$1,
    modToStr: modToStr,
    modToRaw: modToRaw
  };

  var executeEvent = function (bConfig, bState, executor) {
    return $_gd6bsky4jducwv8a.runOnExecute(function (component) {
      executor(component, bConfig, bState);
    });
  };
  var loadEvent = function (bConfig, bState, f) {
    return $_gd6bsky4jducwv8a.runOnInit(function (component, simulatedEvent) {
      f(component, bConfig, bState);
    });
  };
  var create = function (schema, name, active, apis, extra, state) {
    var configSchema = $_1cyy8vyejducwva0.objOfOnly(schema);
    var schemaSchema = $_csfrqy7jducwv8r.optionObjOf(name, [$_csfrqy7jducwv8r.optionObjOfOnly('config', schema)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var createModes = function (modes, name, active, apis, extra, state) {
    var configSchema = modes;
    var schemaSchema = $_csfrqy7jducwv8r.optionObjOf(name, [$_csfrqy7jducwv8r.optionOf('config', modes)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var wrapApi = function (bName, apiFunction, apiName) {
    var f = function (component) {
      var args = arguments;
      return component.config({ name: $_a3rnw0wjjducwv31.constant(bName) }).fold(function () {
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
    return $_s04hbygjducwva8.markAsBehaviourApi(f, apiName, apiFunction);
  };
  var revokeBehaviour = function (name) {
    return {
      key: name,
      value: undefined
    };
  };
  var doCreate = function (configSchema, schemaSchema, name, active, apis, extra, state) {
    var getConfig = function (info) {
      return $_e7rlwgxsjducwv6r.hasKey(info, name) ? info[name]() : Option.none();
    };
    var wrappedApis = $_2vh9dzx0jducwv47.map(apis, function (apiF, apiName) {
      return wrapApi(name, apiF, apiName);
    });
    var wrappedExtra = $_2vh9dzx0jducwv47.map(extra, function (extraF, extraName) {
      return $_s04hbygjducwva8.markAsExtraApi(extraF, extraName);
    });
    var me = $_5xeczzwyjducwv44.deepMerge(wrappedExtra, wrappedApis, {
      revoke: $_a3rnw0wjjducwv31.curry(revokeBehaviour, name),
      config: function (spec) {
        var prepared = $_1cyy8vyejducwva0.asStructOrDie(name + '-config', configSchema, spec);
        return {
          key: name,
          value: {
            config: prepared,
            me: me,
            configAsRaw: $_89w2qewljducwv35.cached(function () {
              return $_1cyy8vyejducwva0.asRawOrDie(name + '-config', configSchema, spec);
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
          return $_e7rlwgxsjducwv6r.readOptFrom(active, 'exhibit').map(function (exhibitor) {
            return exhibitor(base, behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr($_5ldw5hyhjducwvac.nu({}));
      },
      name: function () {
        return name;
      },
      handlers: function (info) {
        return getConfig(info).bind(function (behaviourInfo) {
          return $_e7rlwgxsjducwv6r.readOptFrom(active, 'events').map(function (events) {
            return events(behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr({});
      }
    });
    return me;
  };
  var $_6i94u4y3jducwv7v = {
    executeEvent: executeEvent,
    loadEvent: loadEvent,
    create: create,
    createModes: createModes
  };

  var base = function (handleUnsupported, required) {
    return baseWith(handleUnsupported, required, {
      validate: $_9yomlywzjducwv46.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_1fk4ldx7jducwv51.validateStrArr('required', required);
    $_1fk4ldx7jducwv51.checkDupes(required);
    return function (obj) {
      var keys = $_2vh9dzx0jducwv47.keys(obj);
      var allReqd = $_e31jlowsjducwv3m.forall(required, function (req) {
        return $_e31jlowsjducwv3m.contains(keys, req);
      });
      if (!allReqd)
        $_1fk4ldx7jducwv51.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_e31jlowsjducwv3m.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_1fk4ldx7jducwv51.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_e31jlowsjducwv3m.filter(keys, function (key) {
      return !$_e31jlowsjducwv3m.contains(required, key);
    });
    if (unsupported.length > 0)
      $_1fk4ldx7jducwv51.unsuppMessage(unsupported);
  };
  var allowExtra = $_a3rnw0wjjducwv31.noop;
  var $_6m5f7tyljducwvat = {
    exactly: $_a3rnw0wjjducwv31.curry(base, handleExact),
    ensure: $_a3rnw0wjjducwv31.curry(base, allowExtra),
    ensureWith: $_a3rnw0wjjducwv31.curry(baseWith, allowExtra)
  };

  var BehaviourState = $_6m5f7tyljducwvat.ensure(['readState']);

  var init = function () {
    return BehaviourState({
      readState: function () {
        return 'No State required';
      }
    });
  };
  var $_8u70ojyjjducwvaq = { init: init };

  var derive$2 = function (capabilities) {
    return $_e7rlwgxsjducwv6r.wrapAll(capabilities);
  };
  var simpleSchema = $_1cyy8vyejducwva0.objOfOnly([
    $_csfrqy7jducwv8r.strict('fields'),
    $_csfrqy7jducwv8r.strict('name'),
    $_csfrqy7jducwv8r.defaulted('active', {}),
    $_csfrqy7jducwv8r.defaulted('apis', {}),
    $_csfrqy7jducwv8r.defaulted('extra', {}),
    $_csfrqy7jducwv8r.defaulted('state', $_8u70ojyjjducwvaq)
  ]);
  var create$1 = function (data) {
    var value = $_1cyy8vyejducwva0.asRawOrDie('Creating behaviour: ' + data.name, simpleSchema, data);
    return $_6i94u4y3jducwv7v.create(value.fields, value.name, value.active, value.apis, value.extra, value.state);
  };
  var modeSchema = $_1cyy8vyejducwva0.objOfOnly([
    $_csfrqy7jducwv8r.strict('branchKey'),
    $_csfrqy7jducwv8r.strict('branches'),
    $_csfrqy7jducwv8r.strict('name'),
    $_csfrqy7jducwv8r.defaulted('active', {}),
    $_csfrqy7jducwv8r.defaulted('apis', {}),
    $_csfrqy7jducwv8r.defaulted('extra', {}),
    $_csfrqy7jducwv8r.defaulted('state', $_8u70ojyjjducwvaq)
  ]);
  var createModes$1 = function (data) {
    var value = $_1cyy8vyejducwva0.asRawOrDie('Creating behaviour: ' + data.name, modeSchema, data);
    return $_6i94u4y3jducwv7v.createModes($_1cyy8vyejducwva0.choose(value.branchKey, value.branches), value.name, value.active, value.apis, value.extra, value.state);
  };
  var $_drwn8py2jducwv7n = {
    derive: derive$2,
    revoke: $_a3rnw0wjjducwv31.constant(undefined),
    noActive: $_a3rnw0wjjducwv31.constant({}),
    noApis: $_a3rnw0wjjducwv31.constant({}),
    noExtra: $_a3rnw0wjjducwv31.constant({}),
    noState: $_a3rnw0wjjducwv31.constant($_8u70ojyjjducwvaq),
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
    var value = $_6yofxrjducwv6k.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add = function (element, attr, id) {
    var old = read$1(element, attr);
    var nu = old.concat([id]);
    $_6yofxrjducwv6k.set(element, attr, nu.join(' '));
  };
  var remove$2 = function (element, attr, id) {
    var nu = $_e31jlowsjducwv3m.filter(read$1(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_6yofxrjducwv6k.set(element, attr, nu.join(' '));
    else
      $_6yofxrjducwv6k.remove(element, attr);
  };
  var $_7t6mvryqjducwvb7 = {
    read: read$1,
    add: add,
    remove: remove$2
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$2 = function (element) {
    return $_7t6mvryqjducwvb7.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_7t6mvryqjducwvb7.add(element, 'class', clazz);
  };
  var remove$3 = function (element, clazz) {
    return $_7t6mvryqjducwvb7.remove(element, 'class', clazz);
  };
  var toggle = function (element, clazz) {
    if ($_e31jlowsjducwv3m.contains(get$2(element), clazz)) {
      remove$3(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_g7dzimypjducwvb4 = {
    get: get$2,
    add: add$1,
    remove: remove$3,
    toggle: toggle,
    supports: supports
  };

  var add$2 = function (element, clazz) {
    if ($_g7dzimypjducwvb4.supports(element))
      element.dom().classList.add(clazz);
    else
      $_g7dzimypjducwvb4.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_g7dzimypjducwvb4.supports(element) ? element.dom().classList : $_g7dzimypjducwvb4.get(element);
    if (classList.length === 0) {
      $_6yofxrjducwv6k.remove(element, 'class');
    }
  };
  var remove$4 = function (element, clazz) {
    if ($_g7dzimypjducwvb4.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_g7dzimypjducwvb4.remove(element, clazz);
    cleanClass(element);
  };
  var toggle$1 = function (element, clazz) {
    return $_g7dzimypjducwvb4.supports(element) ? element.dom().classList.toggle(clazz) : $_g7dzimypjducwvb4.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_g7dzimypjducwvb4.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_g7dzimypjducwvb4.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_g7dzimypjducwvb4.add(element, clazz);
    };
    return Toggler(off, on, has$1(element, clazz));
  };
  var has$1 = function (element, clazz) {
    return $_g7dzimypjducwvb4.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_6jbzpfynjducwvb2 = {
    add: add$2,
    remove: remove$4,
    toggle: toggle$1,
    toggler: toggler,
    has: has$1
  };

  var swap = function (element, addCls, removeCls) {
    $_6jbzpfynjducwvb2.remove(element, removeCls);
    $_6jbzpfynjducwvb2.add(element, addCls);
  };
  var toAlpha = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.alpha(), swapConfig.omega());
  };
  var toOmega = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.omega(), swapConfig.alpha());
  };
  var clear = function (component, swapConfig, swapState) {
    $_6jbzpfynjducwvb2.remove(component.element(), swapConfig.alpha());
    $_6jbzpfynjducwvb2.remove(component.element(), swapConfig.omega());
  };
  var isAlpha = function (component, swapConfig, swapState) {
    return $_6jbzpfynjducwvb2.has(component.element(), swapConfig.alpha());
  };
  var isOmega = function (component, swapConfig, swapState) {
    return $_6jbzpfynjducwvb2.has(component.element(), swapConfig.omega());
  };
  var $_abugwcymjducwvaz = {
    toAlpha: toAlpha,
    toOmega: toOmega,
    isAlpha: isAlpha,
    isOmega: isOmega,
    clear: clear
  };

  var SwapSchema = [
    $_csfrqy7jducwv8r.strict('alpha'),
    $_csfrqy7jducwv8r.strict('omega')
  ];

  var Swapping = $_drwn8py2jducwv7n.create({
    fields: SwapSchema,
    name: 'swapping',
    apis: $_abugwcymjducwvaz
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
    return is(scope, a) ? Option.some(scope) : $_9yomlywzjducwv46.isFunction(isRoot) && isRoot(scope) ? Option.none() : ancestor(scope, a, isRoot);
  }

  var first$1 = function (predicate) {
    return descendant($_8em3sbxjjducwv5v.body(), predicate);
  };
  var ancestor = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_9yomlywzjducwv46.isFunction(isRoot) ? isRoot : $_a3rnw0wjjducwv31.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_dqo9uvxfjducwv5k.fromDom(element);
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
    return child$1($_dqo9uvxfjducwv5k.fromDom(element.parentNode), function (x) {
      return !$_3u3sm2x9jducwv54.eq(scope, x) && predicate(x);
    });
  };
  var child$1 = function (scope, predicate) {
    var result = $_e31jlowsjducwv3m.find(scope.dom().childNodes, $_a3rnw0wjjducwv31.compose(predicate, $_dqo9uvxfjducwv5k.fromDom));
    return result.map($_dqo9uvxfjducwv5k.fromDom);
  };
  var descendant = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_dqo9uvxfjducwv5k.fromDom(element.childNodes[i])))
          return Option.some($_dqo9uvxfjducwv5k.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return Option.none();
    };
    return descend(scope.dom());
  };
  var $_1w3f5syvjducwvbi = {
    first: first$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };

  var any$1 = function (predicate) {
    return $_1w3f5syvjducwvbi.first(predicate).isSome();
  };
  var ancestor$1 = function (scope, predicate, isRoot) {
    return $_1w3f5syvjducwvbi.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest$1 = function (scope, predicate, isRoot) {
    return $_1w3f5syvjducwvbi.closest(scope, predicate, isRoot).isSome();
  };
  var sibling$1 = function (scope, predicate) {
    return $_1w3f5syvjducwvbi.sibling(scope, predicate).isSome();
  };
  var child$2 = function (scope, predicate) {
    return $_1w3f5syvjducwvbi.child(scope, predicate).isSome();
  };
  var descendant$1 = function (scope, predicate) {
    return $_1w3f5syvjducwvbi.descendant(scope, predicate).isSome();
  };
  var $_dw8v4tyujducwvbh = {
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
    var doc = $_375a04x3jducwv4l.owner(element).dom();
    return element.dom() === doc.activeElement;
  };
  var active = function (_doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    return Option.from(doc.activeElement).map($_dqo9uvxfjducwv5k.fromDom);
  };
  var focusInside = function (element) {
    var doc = $_375a04x3jducwv4l.owner(element);
    var inside = active(doc).filter(function (a) {
      return $_dw8v4tyujducwvbh.closest(a, $_a3rnw0wjjducwv31.curry($_3u3sm2x9jducwv54.eq, element));
    });
    inside.fold(function () {
      focus(element);
    }, $_a3rnw0wjjducwv31.noop);
  };
  var search = function (element) {
    return active($_375a04x3jducwv4l.owner(element)).filter(function (e) {
      return element.dom().contains(e.dom());
    });
  };
  var $_3hn9p4ytjducwvbd = {
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
  var $_bxzoyjyzjducwvbu = { openLink: openLink };

  var isSkinDisabled = function (editor) {
    return editor.settings.skin === false;
  };
  var $_5omhruz0jducwvbv = { isSkinDisabled: isSkinDisabled };

  var formatChanged = 'formatChanged';
  var orientationChanged = 'orientationChanged';
  var dropupDismissed = 'dropupDismissed';
  var $_4fo430z1jducwvbw = {
    formatChanged: $_a3rnw0wjjducwv31.constant(formatChanged),
    orientationChanged: $_a3rnw0wjjducwv31.constant(orientationChanged),
    dropupDismissed: $_a3rnw0wjjducwv31.constant(dropupDismissed)
  };

  var chooseChannels = function (channels, message) {
    return message.universal() ? channels : $_e31jlowsjducwv3m.filter(channels, function (ch) {
      return $_e31jlowsjducwv3m.contains(message.channels(), ch);
    });
  };
  var events = function (receiveConfig) {
    return $_gd6bsky4jducwv8a.derive([$_gd6bsky4jducwv8a.run($_c92nqswhjducwv2r.receive(), function (component, message) {
        var channelMap = receiveConfig.channels();
        var channels = $_2vh9dzx0jducwv47.keys(channelMap);
        var targetChannels = chooseChannels(channels, message);
        $_e31jlowsjducwv3m.each(targetChannels, function (ch) {
          var channelInfo = channelMap[ch]();
          var channelSchema = channelInfo.schema();
          var data = $_1cyy8vyejducwva0.asStructOrDie('channel[' + ch + '] data\nReceiver: ' + $_9uv2jrxmjducwv68.element(component.element()), channelSchema, message.data());
          channelInfo.onReceive()(component, data);
        });
      })]);
  };
  var $_mdtlpz4jducwvcb = { events: events };

  var menuFields = [
    $_csfrqy7jducwv8r.strict('menu'),
    $_csfrqy7jducwv8r.strict('selectedMenu')
  ];
  var itemFields = [
    $_csfrqy7jducwv8r.strict('item'),
    $_csfrqy7jducwv8r.strict('selectedItem')
  ];
  var schema = $_1cyy8vyejducwva0.objOfOnly(itemFields.concat(menuFields));
  var itemSchema = $_1cyy8vyejducwva0.objOfOnly(itemFields);
  var $_apw9tnz7jducwvcy = {
    menuFields: $_a3rnw0wjjducwv31.constant(menuFields),
    itemFields: $_a3rnw0wjjducwv31.constant(itemFields),
    schema: $_a3rnw0wjjducwv31.constant(schema),
    itemSchema: $_a3rnw0wjjducwv31.constant(itemSchema)
  };

  var initSize = $_csfrqy7jducwv8r.strictObjOf('initSize', [
    $_csfrqy7jducwv8r.strict('numColumns'),
    $_csfrqy7jducwv8r.strict('numRows')
  ]);
  var itemMarkers = function () {
    return $_csfrqy7jducwv8r.strictOf('markers', $_apw9tnz7jducwvcy.itemSchema());
  };
  var menuMarkers = function () {
    return $_csfrqy7jducwv8r.strictOf('markers', $_apw9tnz7jducwvcy.schema());
  };
  var tieredMenuMarkers = function () {
    return $_csfrqy7jducwv8r.strictObjOf('markers', [$_csfrqy7jducwv8r.strict('backgroundMenu')].concat($_apw9tnz7jducwvcy.menuFields()).concat($_apw9tnz7jducwvcy.itemFields()));
  };
  var markers = function (required) {
    return $_csfrqy7jducwv8r.strictObjOf('markers', $_e31jlowsjducwv3m.map(required, $_csfrqy7jducwv8r.strict));
  };
  var onPresenceHandler = function (label, fieldName, presence) {
    var trace = $_9i75u4xljducwv5z.getTrace();
    return $_csfrqy7jducwv8r.field(fieldName, fieldName, presence, $_1cyy8vyejducwva0.valueOf(function (f) {
      return Result.value(function () {
        $_9i75u4xljducwv5z.logHandler(label, fieldName, trace);
        return f.apply(undefined, arguments);
      });
    }));
  };
  var onHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_2jq6gty8jducwv8w.defaulted($_a3rnw0wjjducwv31.noop));
  };
  var onKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_2jq6gty8jducwv8w.defaulted(Option.none));
  };
  var onStrictHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_2jq6gty8jducwv8w.strict());
  };
  var onStrictKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_2jq6gty8jducwv8w.strict());
  };
  var output$1 = function (name, value) {
    return $_csfrqy7jducwv8r.state(name, $_a3rnw0wjjducwv31.constant(value));
  };
  var snapshot$1 = function (name) {
    return $_csfrqy7jducwv8r.state(name, $_a3rnw0wjjducwv31.identity);
  };
  var $_5qmiobz6jducwvco = {
    initSize: $_a3rnw0wjjducwv31.constant(initSize),
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

  var ReceivingSchema = [$_csfrqy7jducwv8r.strictOf('channels', $_1cyy8vyejducwva0.setOf(Result.value, $_1cyy8vyejducwva0.objOfOnly([
      $_5qmiobz6jducwvco.onStrictHandler('onReceive'),
      $_csfrqy7jducwv8r.defaulted('schema', $_1cyy8vyejducwva0.anyValue())
    ])))];

  var Receiving = $_drwn8py2jducwv7n.create({
    fields: ReceivingSchema,
    name: 'receiving',
    active: $_mdtlpz4jducwvcb
  });

  var updateAriaState = function (component, toggleConfig) {
    var pressed = isOn(component, toggleConfig);
    var ariaInfo = toggleConfig.aria();
    ariaInfo.update()(component, ariaInfo, pressed);
  };
  var toggle$2 = function (component, toggleConfig, toggleState) {
    $_6jbzpfynjducwvb2.toggle(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var on = function (component, toggleConfig, toggleState) {
    $_6jbzpfynjducwvb2.add(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var off = function (component, toggleConfig, toggleState) {
    $_6jbzpfynjducwvb2.remove(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var isOn = function (component, toggleConfig) {
    return $_6jbzpfynjducwvb2.has(component.element(), toggleConfig.toggleClass());
  };
  var onLoad = function (component, toggleConfig, toggleState) {
    var api = toggleConfig.selected() ? on : off;
    api(component, toggleConfig, toggleState);
  };
  var $_dxapmxzajducwvdc = {
    onLoad: onLoad,
    toggle: toggle$2,
    isOn: isOn,
    on: on,
    off: off
  };

  var exhibit = function (base, toggleConfig, toggleState) {
    return $_5ldw5hyhjducwvac.nu({});
  };
  var events$1 = function (toggleConfig, toggleState) {
    var execute = $_6i94u4y3jducwv7v.executeEvent(toggleConfig, toggleState, $_dxapmxzajducwvdc.toggle);
    var load = $_6i94u4y3jducwv7v.loadEvent(toggleConfig, toggleState, $_dxapmxzajducwvdc.onLoad);
    return $_gd6bsky4jducwv8a.derive($_e31jlowsjducwv3m.flatten([
      toggleConfig.toggleOnExecute() ? [execute] : [],
      [load]
    ]));
  };
  var $_25ikdtz9jducwvd9 = {
    exhibit: exhibit,
    events: events$1
  };

  var updatePressed = function (component, ariaInfo, status) {
    $_6yofxrjducwv6k.set(component.element(), 'aria-pressed', status);
    if (ariaInfo.syncWithExpanded())
      updateExpanded(component, ariaInfo, status);
  };
  var updateSelected = function (component, ariaInfo, status) {
    $_6yofxrjducwv6k.set(component.element(), 'aria-selected', status);
  };
  var updateChecked = function (component, ariaInfo, status) {
    $_6yofxrjducwv6k.set(component.element(), 'aria-checked', status);
  };
  var updateExpanded = function (component, ariaInfo, status) {
    $_6yofxrjducwv6k.set(component.element(), 'aria-expanded', status);
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
    var rawTag = $_en9ft8xkjducwv5x.name(elem);
    var suffix = rawTag === 'input' && $_6yofxrjducwv6k.has(elem, 'type') ? ':' + $_6yofxrjducwv6k.get(elem, 'type') : '';
    return $_e7rlwgxsjducwv6r.readOptFrom(tagAttributes, rawTag + suffix);
  };
  var detectFromRole = function (component) {
    var elem = component.element();
    if (!$_6yofxrjducwv6k.has(elem, 'role'))
      return Option.none();
    else {
      var role = $_6yofxrjducwv6k.get(elem, 'role');
      return $_e7rlwgxsjducwv6r.readOptFrom(roleAttributes, role);
    }
  };
  var updateAuto = function (component, ariaInfo, status) {
    var attributes = detectFromRole(component).orThunk(function () {
      return detectFromTag(component);
    }).getOr([]);
    $_e31jlowsjducwv3m.each(attributes, function (attr) {
      $_6yofxrjducwv6k.set(component.element(), attr, status);
    });
  };
  var $_2jy22azcjducwvdl = {
    updatePressed: updatePressed,
    updateSelected: updateSelected,
    updateChecked: updateChecked,
    updateExpanded: updateExpanded,
    updateAuto: updateAuto
  };

  var ToggleSchema = [
    $_csfrqy7jducwv8r.defaulted('selected', false),
    $_csfrqy7jducwv8r.strict('toggleClass'),
    $_csfrqy7jducwv8r.defaulted('toggleOnExecute', true),
    $_csfrqy7jducwv8r.defaultedOf('aria', { mode: 'none' }, $_1cyy8vyejducwva0.choose('mode', {
      'pressed': [
        $_csfrqy7jducwv8r.defaulted('syncWithExpanded', false),
        $_5qmiobz6jducwvco.output('update', $_2jy22azcjducwvdl.updatePressed)
      ],
      'checked': [$_5qmiobz6jducwvco.output('update', $_2jy22azcjducwvdl.updateChecked)],
      'expanded': [$_5qmiobz6jducwvco.output('update', $_2jy22azcjducwvdl.updateExpanded)],
      'selected': [$_5qmiobz6jducwvco.output('update', $_2jy22azcjducwvdl.updateSelected)],
      'none': [$_5qmiobz6jducwvco.output('update', $_a3rnw0wjjducwv31.noop)]
    }))
  ];

  var Toggling = $_drwn8py2jducwv7n.create({
    fields: ToggleSchema,
    name: 'toggling',
    active: $_25ikdtz9jducwvd9,
    apis: $_dxapmxzajducwvdc
  });

  var format = function (command, update) {
    return Receiving.config({
      channels: $_e7rlwgxsjducwv6r.wrap($_4fo430z1jducwvbw.formatChanged(), {
        onReceive: function (button, data) {
          if (data.command === command) {
            update(button, data.state);
          }
        }
      })
    });
  };
  var orientation = function (onReceive) {
    return Receiving.config({ channels: $_e7rlwgxsjducwv6r.wrap($_4fo430z1jducwvbw.orientationChanged(), { onReceive: onReceive }) });
  };
  var receive = function (channel, onReceive) {
    return {
      key: channel,
      value: { onReceive: onReceive }
    };
  };
  var $_6h7r9izdjducwvdv = {
    format: format,
    orientation: orientation,
    receive: receive
  };

  var prefix = 'tinymce-mobile';
  var resolve$1 = function (p) {
    return prefix + '-' + p;
  };
  var $_513f6yzejducwvdz = {
    resolve: resolve$1,
    prefix: $_a3rnw0wjjducwv31.constant(prefix)
  };

  var focus$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_3hn9p4ytjducwvbd.focus(component.element());
      focusConfig.onFocus()(component);
    }
  };
  var blur$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_3hn9p4ytjducwvbd.blur(component.element());
    }
  };
  var isFocused = function (component) {
    return $_3hn9p4ytjducwvbd.hasFocus(component.element());
  };
  var $_um7e5zjjducwvef = {
    focus: focus$1,
    blur: blur$1,
    isFocused: isFocused
  };

  var exhibit$1 = function (base, focusConfig) {
    if (focusConfig.ignore())
      return $_5ldw5hyhjducwvac.nu({});
    else
      return $_5ldw5hyhjducwvac.nu({ attributes: { 'tabindex': '-1' } });
  };
  var events$2 = function (focusConfig) {
    return $_gd6bsky4jducwv8a.derive([$_gd6bsky4jducwv8a.run($_c92nqswhjducwv2r.focus(), function (component, simulatedEvent) {
        $_um7e5zjjducwvef.focus(component, focusConfig);
        simulatedEvent.stop();
      })]);
  };
  var $_armcmzijducwvee = {
    exhibit: exhibit$1,
    events: events$2
  };

  var FocusSchema = [
    $_5qmiobz6jducwvco.onHandler('onFocus'),
    $_csfrqy7jducwv8r.defaulted('ignore', false)
  ];

  var Focusing = $_drwn8py2jducwv7n.create({
    fields: FocusSchema,
    name: 'focusing',
    active: $_armcmzijducwvee,
    apis: $_um7e5zjjducwvef
  });

  var $_7xkdypzpjducwvfa = {
    BACKSPACE: $_a3rnw0wjjducwv31.constant([8]),
    TAB: $_a3rnw0wjjducwv31.constant([9]),
    ENTER: $_a3rnw0wjjducwv31.constant([13]),
    SHIFT: $_a3rnw0wjjducwv31.constant([16]),
    CTRL: $_a3rnw0wjjducwv31.constant([17]),
    ALT: $_a3rnw0wjjducwv31.constant([18]),
    CAPSLOCK: $_a3rnw0wjjducwv31.constant([20]),
    ESCAPE: $_a3rnw0wjjducwv31.constant([27]),
    SPACE: $_a3rnw0wjjducwv31.constant([32]),
    PAGEUP: $_a3rnw0wjjducwv31.constant([33]),
    PAGEDOWN: $_a3rnw0wjjducwv31.constant([34]),
    END: $_a3rnw0wjjducwv31.constant([35]),
    HOME: $_a3rnw0wjjducwv31.constant([36]),
    LEFT: $_a3rnw0wjjducwv31.constant([37]),
    UP: $_a3rnw0wjjducwv31.constant([38]),
    RIGHT: $_a3rnw0wjjducwv31.constant([39]),
    DOWN: $_a3rnw0wjjducwv31.constant([40]),
    INSERT: $_a3rnw0wjjducwv31.constant([45]),
    DEL: $_a3rnw0wjjducwv31.constant([46]),
    META: $_a3rnw0wjjducwv31.constant([
      91,
      93,
      224
    ]),
    F10: $_a3rnw0wjjducwv31.constant([121])
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
  var $_a1qpc3zujducwvfz = {
    cycleBy: cycleBy,
    cap: cap
  };

  var all$2 = function (predicate) {
    return descendants($_8em3sbxjjducwv5v.body(), predicate);
  };
  var ancestors = function (scope, predicate, isRoot) {
    return $_e31jlowsjducwv3m.filter($_375a04x3jducwv4l.parents(scope, isRoot), predicate);
  };
  var siblings$1 = function (scope, predicate) {
    return $_e31jlowsjducwv3m.filter($_375a04x3jducwv4l.siblings(scope), predicate);
  };
  var children$1 = function (scope, predicate) {
    return $_e31jlowsjducwv3m.filter($_375a04x3jducwv4l.children(scope), predicate);
  };
  var descendants = function (scope, predicate) {
    var result = [];
    $_e31jlowsjducwv3m.each($_375a04x3jducwv4l.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants(x, predicate));
    });
    return result;
  };
  var $_7glvt1zwjducwvg2 = {
    all: all$2,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var all$3 = function (selector) {
    return $_a1a6ctxejducwv5f.all(selector);
  };
  var ancestors$1 = function (scope, selector, isRoot) {
    return $_7glvt1zwjducwvg2.ancestors(scope, function (e) {
      return $_a1a6ctxejducwv5f.is(e, selector);
    }, isRoot);
  };
  var siblings$2 = function (scope, selector) {
    return $_7glvt1zwjducwvg2.siblings(scope, function (e) {
      return $_a1a6ctxejducwv5f.is(e, selector);
    });
  };
  var children$2 = function (scope, selector) {
    return $_7glvt1zwjducwvg2.children(scope, function (e) {
      return $_a1a6ctxejducwv5f.is(e, selector);
    });
  };
  var descendants$1 = function (scope, selector) {
    return $_a1a6ctxejducwv5f.all(selector, scope);
  };
  var $_7nc35uzvjducwvg0 = {
    all: all$3,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  var first$2 = function (selector) {
    return $_a1a6ctxejducwv5f.one(selector);
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_1w3f5syvjducwvbi.ancestor(scope, function (e) {
      return $_a1a6ctxejducwv5f.is(e, selector);
    }, isRoot);
  };
  var sibling$2 = function (scope, selector) {
    return $_1w3f5syvjducwvbi.sibling(scope, function (e) {
      return $_a1a6ctxejducwv5f.is(e, selector);
    });
  };
  var child$3 = function (scope, selector) {
    return $_1w3f5syvjducwvbi.child(scope, function (e) {
      return $_a1a6ctxejducwv5f.is(e, selector);
    });
  };
  var descendant$2 = function (scope, selector) {
    return $_a1a6ctxejducwv5f.one(selector, scope);
  };
  var closest$2 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_a1a6ctxejducwv5f.is, ancestor$2, scope, selector, isRoot);
  };
  var $_aojb3mzxjducwvg5 = {
    first: first$2,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var dehighlightAll = function (component, hConfig, hState) {
    var highlighted = $_7nc35uzvjducwvg0.descendants(component.element(), '.' + hConfig.highlightClass());
    $_e31jlowsjducwv3m.each(highlighted, function (h) {
      $_6jbzpfynjducwvb2.remove(h, hConfig.highlightClass());
      component.getSystem().getByDom(h).each(function (target) {
        hConfig.onDehighlight()(component, target);
      });
    });
  };
  var dehighlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    $_6jbzpfynjducwvb2.remove(target.element(), hConfig.highlightClass());
    if (wasHighlighted)
      hConfig.onDehighlight()(component, target);
  };
  var highlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    dehighlightAll(component, hConfig, hState);
    $_6jbzpfynjducwvb2.add(target.element(), hConfig.highlightClass());
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
    var items = $_7nc35uzvjducwvg0.descendants(component.element(), '.' + hConfig.itemClass());
    var itemComps = $_4d6y5ey0jducwv7l.cat($_e31jlowsjducwv3m.map(items, function (i) {
      return component.getSystem().getByDom(i).toOption();
    }));
    var targetComp = $_e31jlowsjducwv3m.find(itemComps, predicate);
    targetComp.each(function (c) {
      highlight(component, hConfig, hState, c);
    });
  };
  var isHighlighted = function (component, hConfig, hState, queryTarget) {
    return $_6jbzpfynjducwvb2.has(queryTarget.element(), hConfig.highlightClass());
  };
  var getHighlighted = function (component, hConfig, hState) {
    return $_aojb3mzxjducwvg5.descendant(component.element(), '.' + hConfig.highlightClass()).bind(component.getSystem().getByDom);
  };
  var getByIndex = function (component, hConfig, hState, index) {
    var items = $_7nc35uzvjducwvg0.descendants(component.element(), '.' + hConfig.itemClass());
    return Option.from(items[index]).fold(function () {
      return Result.error('No element found with index ' + index);
    }, component.getSystem().getByDom);
  };
  var getFirst = function (component, hConfig, hState) {
    return $_aojb3mzxjducwvg5.descendant(component.element(), '.' + hConfig.itemClass()).bind(component.getSystem().getByDom);
  };
  var getLast = function (component, hConfig, hState) {
    var items = $_7nc35uzvjducwvg0.descendants(component.element(), '.' + hConfig.itemClass());
    var last = items.length > 0 ? Option.some(items[items.length - 1]) : Option.none();
    return last.bind(component.getSystem().getByDom);
  };
  var getDelta = function (component, hConfig, hState, delta) {
    var items = $_7nc35uzvjducwvg0.descendants(component.element(), '.' + hConfig.itemClass());
    var current = $_e31jlowsjducwv3m.findIndex(items, function (item) {
      return $_6jbzpfynjducwvb2.has(item, hConfig.highlightClass());
    });
    return current.bind(function (selected) {
      var dest = $_a1qpc3zujducwvfz.cycleBy(selected, delta, 0, items.length - 1);
      return component.getSystem().getByDom(items[dest]);
    });
  };
  var getPrevious = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, -1);
  };
  var getNext = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, +1);
  };
  var $_2gqg6vztjducwvfn = {
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
    $_csfrqy7jducwv8r.strict('highlightClass'),
    $_csfrqy7jducwv8r.strict('itemClass'),
    $_5qmiobz6jducwvco.onHandler('onHighlight'),
    $_5qmiobz6jducwvco.onHandler('onDehighlight')
  ];

  var Highlighting = $_drwn8py2jducwv7n.create({
    fields: HighlightSchema,
    name: 'highlighting',
    apis: $_2gqg6vztjducwvfn
  });

  var dom = function () {
    var get = function (component) {
      return $_3hn9p4ytjducwvbd.search(component.element());
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
      component.getSystem().getByDom(element).fold($_a3rnw0wjjducwv31.noop, function (item) {
        Highlighting.highlight(component, item);
      });
    };
    return {
      get: get,
      set: set
    };
  };
  var $_4ss2xxzrjducwvfi = {
    dom: dom,
    highlights: highlights
  };

  var inSet = function (keys) {
    return function (event) {
      return $_e31jlowsjducwv3m.contains(keys, event.raw().which);
    };
  };
  var and = function (preds) {
    return function (event) {
      return $_e31jlowsjducwv3m.forall(preds, function (pred) {
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
  var $_44izm0100jducwvge = {
    inSet: inSet,
    and: and,
    is: is$1,
    isShift: isShift,
    isNotShift: $_a3rnw0wjjducwv31.not(isShift),
    isControl: isControl,
    isNotControl: $_a3rnw0wjjducwv31.not(isControl)
  };

  var basic = function (key, action) {
    return {
      matches: $_44izm0100jducwvge.is(key),
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
    var transition = $_e31jlowsjducwv3m.find(transitions, function (t) {
      return t.matches(event);
    });
    return transition.map(function (t) {
      return t.classification;
    });
  };
  var $_2pm2gbzzjducwvgb = {
    basic: basic,
    rule: rule,
    choose: choose$2
  };

  var typical = function (infoSchema, stateInit, getRules, getEvents, getApis, optFocusIn) {
    var schema = function () {
      return infoSchema.concat([
        $_csfrqy7jducwv8r.defaulted('focusManager', $_4ss2xxzrjducwvfi.dom()),
        $_5qmiobz6jducwvco.output('handler', me),
        $_5qmiobz6jducwvco.output('state', stateInit)
      ]);
    };
    var processKey = function (component, simulatedEvent, keyingConfig, keyingState) {
      var rules = getRules(component, simulatedEvent, keyingConfig, keyingState);
      return $_2pm2gbzzjducwvgb.choose(rules, simulatedEvent.event()).bind(function (rule) {
        return rule(component, simulatedEvent, keyingConfig, keyingState);
      });
    };
    var toEvents = function (keyingConfig, keyingState) {
      var otherEvents = getEvents(keyingConfig, keyingState);
      var keyEvents = $_gd6bsky4jducwv8a.derive(optFocusIn.map(function (focusIn) {
        return $_gd6bsky4jducwv8a.run($_c92nqswhjducwv2r.focus(), function (component, simulatedEvent) {
          focusIn(component, keyingConfig, keyingState, simulatedEvent);
          simulatedEvent.stop();
        });
      }).toArray().concat([$_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.keydown(), function (component, simulatedEvent) {
          processKey(component, simulatedEvent, keyingConfig, keyingState).each(function (_) {
            simulatedEvent.stop();
          });
        })]));
      return $_5xeczzwyjducwv44.deepMerge(otherEvents, keyEvents);
    };
    var me = {
      schema: schema,
      processKey: processKey,
      toEvents: toEvents,
      toApis: getApis
    };
    return me;
  };
  var $_83k7gnzqjducwvfd = { typical: typical };

  var cyclePrev = function (values, index, predicate) {
    var before = $_e31jlowsjducwv3m.reverse(values.slice(0, index));
    var after = $_e31jlowsjducwv3m.reverse(values.slice(index + 1));
    return $_e31jlowsjducwv3m.find(before.concat(after), predicate);
  };
  var tryPrev = function (values, index, predicate) {
    var before = $_e31jlowsjducwv3m.reverse(values.slice(0, index));
    return $_e31jlowsjducwv3m.find(before, predicate);
  };
  var cycleNext = function (values, index, predicate) {
    var before = values.slice(0, index);
    var after = values.slice(index + 1);
    return $_e31jlowsjducwv3m.find(after.concat(before), predicate);
  };
  var tryNext = function (values, index, predicate) {
    var after = values.slice(index + 1);
    return $_e31jlowsjducwv3m.find(after, predicate);
  };
  var $_8ez06j101jducwvgj = {
    cyclePrev: cyclePrev,
    cycleNext: cycleNext,
    tryPrev: tryPrev,
    tryNext: tryNext
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_11j90o104jducwvgy = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_9yomlywzjducwv46.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_11j90o104jducwvgy.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_11j90o104jducwvgy.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$2 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_2vh9dzx0jducwv47.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_2vh9dzx0jducwv47.each(css, function (v, k) {
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
    var v = r === '' && !$_8em3sbxjjducwv5v.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_11j90o104jducwvgy.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
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
    if ($_11j90o104jducwvgy.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_dqo9uvxfjducwv5k.fromTag(tag);
    set$2(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$5 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_6yofxrjducwv6k.has(element, 'style') && $_2zs55cwvjducwv40.trim($_6yofxrjducwv6k.get(element, 'style')) === '') {
      $_6yofxrjducwv6k.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_6yofxrjducwv6k.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_6yofxrjducwv6k.remove : $_6yofxrjducwv6k.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy$1 = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_11j90o104jducwvgy.isSupported(sourceDom) && $_11j90o104jducwvgy.isSupported(targetDom)) {
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
    if (!$_en9ft8xkjducwv5x.isElement(source) || !$_en9ft8xkjducwv5x.isElement(destination))
      return;
    $_e31jlowsjducwv3m.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_gbl0iz103jducwvgo = {
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
      if (!$_9yomlywzjducwv46.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_11j90o104jducwvgy.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_gbl0iz103jducwvgo.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_e31jlowsjducwv3m.foldl(properties, function (acc, property) {
        var val = $_gbl0iz103jducwvgo.get(element, property);
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
    return $_8em3sbxjjducwv5v.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
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
    $_gbl0iz103jducwvgo.set(element, 'max-height', absMax + 'px');
  };
  var $_giaj1z102jducwvgm = {
    set: set$3,
    get: get$4,
    getOuter: getOuter$1,
    setMax: setMax
  };

  var create$2 = function (cyclicField) {
    var schema = [
      $_csfrqy7jducwv8r.option('onEscape'),
      $_csfrqy7jducwv8r.option('onEnter'),
      $_csfrqy7jducwv8r.defaulted('selector', '[data-alloy-tabstop="true"]'),
      $_csfrqy7jducwv8r.defaulted('firstTabstop', 0),
      $_csfrqy7jducwv8r.defaulted('useTabstopAt', $_a3rnw0wjjducwv31.constant(true)),
      $_csfrqy7jducwv8r.option('visibilitySelector')
    ].concat([cyclicField]);
    var isVisible = function (tabbingConfig, element) {
      var target = tabbingConfig.visibilitySelector().bind(function (sel) {
        return $_aojb3mzxjducwvg5.closest(element, sel);
      }).getOr(element);
      return $_giaj1z102jducwvgm.get(target) > 0;
    };
    var findInitial = function (component, tabbingConfig) {
      var tabstops = $_7nc35uzvjducwvg0.descendants(component.element(), tabbingConfig.selector());
      var visibles = $_e31jlowsjducwv3m.filter(tabstops, function (elem) {
        return isVisible(tabbingConfig, elem);
      });
      return Option.from(visibles[tabbingConfig.firstTabstop()]);
    };
    var findCurrent = function (component, tabbingConfig) {
      return tabbingConfig.focusManager().get(component).bind(function (elem) {
        return $_aojb3mzxjducwvg5.closest(elem, tabbingConfig.selector());
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
      var tabstops = $_7nc35uzvjducwvg0.descendants(component.element(), tabbingConfig.selector());
      return findCurrent(component, tabbingConfig).bind(function (tabstop) {
        var optStopIndex = $_e31jlowsjducwv3m.findIndex(tabstops, $_a3rnw0wjjducwv31.curry($_3u3sm2x9jducwv54.eq, tabstop));
        return optStopIndex.bind(function (stopIndex) {
          return goFromTabstop(component, tabstops, stopIndex, tabbingConfig, cycle);
        });
      });
    };
    var goBackwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_8ez06j101jducwvgj.cyclePrev : $_8ez06j101jducwvgj.tryPrev;
      return go(component, simulatedEvent, tabbingConfig, navigate);
    };
    var goForwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_8ez06j101jducwvgj.cycleNext : $_8ez06j101jducwvgj.tryNext;
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
    var getRules = $_a3rnw0wjjducwv31.constant([
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.and([
        $_44izm0100jducwvge.isShift,
        $_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.TAB())
      ]), goBackwards),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.TAB()), goForwards),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.ESCAPE()), exit),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.and([
        $_44izm0100jducwvge.isNotShift,
        $_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.ENTER())
      ]), execute)
    ]);
    var getEvents = $_a3rnw0wjjducwv31.constant({});
    var getApis = $_a3rnw0wjjducwv31.constant({});
    return $_83k7gnzqjducwvfd.typical(schema, $_8u70ojyjjducwvaq.init, getRules, getEvents, getApis, Option.some(focusIn));
  };
  var $_g47seizojducwves = { create: create$2 };

  var AcyclicType = $_g47seizojducwves.create($_csfrqy7jducwv8r.state('cyclic', $_a3rnw0wjjducwv31.constant(false)));

  var CyclicType = $_g47seizojducwves.create($_csfrqy7jducwv8r.state('cyclic', $_a3rnw0wjjducwv31.constant(true)));

  var inside = function (target) {
    return $_en9ft8xkjducwv5x.name(target) === 'input' && $_6yofxrjducwv6k.get(target, 'type') !== 'radio' || $_en9ft8xkjducwv5x.name(target) === 'textarea';
  };
  var $_2kqhvo108jducwvhg = { inside: inside };

  var doDefaultExecute = function (component, simulatedEvent, focused) {
    $_51mp15wgjducwv2k.dispatch(component, focused, $_c92nqswhjducwv2r.execute());
    return Option.some(true);
  };
  var defaultExecute = function (component, simulatedEvent, focused) {
    return $_2kqhvo108jducwvhg.inside(focused) && $_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.SPACE())(simulatedEvent.event()) ? Option.none() : doDefaultExecute(component, simulatedEvent, focused);
  };
  var $_7dse9109jducwvhk = { defaultExecute: defaultExecute };

  var schema$1 = [
    $_csfrqy7jducwv8r.defaulted('execute', $_7dse9109jducwvhk.defaultExecute),
    $_csfrqy7jducwv8r.defaulted('useSpace', false),
    $_csfrqy7jducwv8r.defaulted('useEnter', true),
    $_csfrqy7jducwv8r.defaulted('useControlEnter', false),
    $_csfrqy7jducwv8r.defaulted('useDown', false)
  ];
  var execute = function (component, simulatedEvent, executeConfig, executeState) {
    return executeConfig.execute()(component, simulatedEvent, component.element());
  };
  var getRules = function (component, simulatedEvent, executeConfig, executeState) {
    var spaceExec = executeConfig.useSpace() && !$_2kqhvo108jducwvhg.inside(component.element()) ? $_7xkdypzpjducwvfa.SPACE() : [];
    var enterExec = executeConfig.useEnter() ? $_7xkdypzpjducwvfa.ENTER() : [];
    var downExec = executeConfig.useDown() ? $_7xkdypzpjducwvfa.DOWN() : [];
    var execKeys = spaceExec.concat(enterExec).concat(downExec);
    return [$_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet(execKeys), execute)].concat(executeConfig.useControlEnter() ? [$_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.and([
        $_44izm0100jducwvge.isControl,
        $_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.ENTER())
      ]), execute)] : []);
  };
  var getEvents = $_a3rnw0wjjducwv31.constant({});
  var getApis = $_a3rnw0wjjducwv31.constant({});
  var ExecutionType = $_83k7gnzqjducwvfd.typical(schema$1, $_8u70ojyjjducwvaq.init, getRules, getEvents, getApis, Option.none());

  var flatgrid = function (spec) {
    var dimensions = Cell(Option.none());
    var setGridSize = function (numRows, numColumns) {
      dimensions.set(Option.some({
        numRows: $_a3rnw0wjjducwv31.constant(numRows),
        numColumns: $_a3rnw0wjjducwv31.constant(numColumns)
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
      readState: $_a3rnw0wjjducwv31.constant({}),
      setGridSize: setGridSize,
      getNumRows: getNumRows,
      getNumColumns: getNumColumns
    });
  };
  var init$1 = function (spec) {
    return spec.state()(spec);
  };
  var $_beeaqo10bjducwvhx = {
    flatgrid: flatgrid,
    init: init$1
  };

  var onDirection = function (isLtr, isRtl) {
    return function (element) {
      return getDirection(element) === 'rtl' ? isRtl : isLtr;
    };
  };
  var getDirection = function (element) {
    return $_gbl0iz103jducwvgo.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_ceasbx10djducwvi7 = {
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
    var movement = $_ceasbx10djducwvi7.onDirection(moveLeft, moveRight);
    return useH(movement);
  };
  var east = function (moveLeft, moveRight) {
    var movement = $_ceasbx10djducwvi7.onDirection(moveRight, moveLeft);
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
  var $_3ztwrr10cjducwvi4 = {
    east: east,
    west: west,
    north: useV,
    south: useV,
    move: useV
  };

  var indexInfo = $_73sv11x4jducwv4t.immutableBag([
    'index',
    'candidates'
  ], []);
  var locate = function (candidates, predicate) {
    return $_e31jlowsjducwv3m.findIndex(candidates, predicate).map(function (index) {
      return indexInfo({
        index: index,
        candidates: candidates
      });
    });
  };
  var $_cqzh1610fjducwvig = { locate: locate };

  var visibilityToggler = function (element, property, hiddenValue, visibleValue) {
    var initial = $_gbl0iz103jducwvgo.get(element, property);
    if (initial === undefined)
      initial = '';
    var value = initial === hiddenValue ? visibleValue : hiddenValue;
    var off = $_a3rnw0wjjducwv31.curry($_gbl0iz103jducwvgo.set, element, property, initial);
    var on = $_a3rnw0wjjducwv31.curry($_gbl0iz103jducwvgo.set, element, property, value);
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
  var $_9hkmi10gjducwvij = {
    toggler: toggler$1,
    displayToggler: displayToggler,
    isVisible: isVisible
  };

  var locateVisible = function (container, current, selector) {
    var filter = $_9hkmi10gjducwvij.isVisible;
    return locateIn(container, current, selector, filter);
  };
  var locateIn = function (container, current, selector, filter) {
    var predicate = $_a3rnw0wjjducwv31.curry($_3u3sm2x9jducwv54.eq, current);
    var candidates = $_7nc35uzvjducwvg0.descendants(container, selector);
    var visible = $_e31jlowsjducwv3m.filter(candidates, $_9hkmi10gjducwvij.isVisible);
    return $_cqzh1610fjducwvig.locate(visible, predicate);
  };
  var findIndex$2 = function (elements, target) {
    return $_e31jlowsjducwv3m.findIndex(elements, function (elem) {
      return $_3u3sm2x9jducwv54.eq(target, elem);
    });
  };
  var $_37f9is10ejducwvi8 = {
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
      var newColumn = $_a1qpc3zujducwvfz.cycleBy(oldColumn, delta, 0, colsInRow - 1);
      return Option.some({
        row: $_a3rnw0wjjducwv31.constant(oldRow),
        column: $_a3rnw0wjjducwv31.constant(newColumn)
      });
    });
  };
  var cycleVertical = function (values, index, numRows, numCols, delta) {
    return withGrid(values, index, numCols, function (oldRow, oldColumn) {
      var newRow = $_a1qpc3zujducwvfz.cycleBy(oldRow, delta, 0, numRows - 1);
      var onLastRow = newRow === numRows - 1;
      var colsInRow = onLastRow ? values.length - newRow * numCols : numCols;
      var newCol = $_a1qpc3zujducwvfz.cap(oldColumn, 0, colsInRow - 1);
      return Option.some({
        row: $_a3rnw0wjjducwv31.constant(newRow),
        column: $_a3rnw0wjjducwv31.constant(newCol)
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
  var $_g2n65t10hjducwvim = {
    cycleDown: cycleDown,
    cycleUp: cycleUp,
    cycleLeft: cycleLeft,
    cycleRight: cycleRight
  };

  var schema$2 = [
    $_csfrqy7jducwv8r.strict('selector'),
    $_csfrqy7jducwv8r.defaulted('execute', $_7dse9109jducwvhk.defaultExecute),
    $_5qmiobz6jducwvco.onKeyboardHandler('onEscape'),
    $_csfrqy7jducwv8r.defaulted('captureTab', false),
    $_5qmiobz6jducwvco.initSize()
  ];
  var focusIn = function (component, gridConfig, gridState) {
    $_aojb3mzxjducwvg5.descendant(component.element(), gridConfig.selector()).each(function (first) {
      gridConfig.focusManager().set(component, first);
    });
  };
  var findCurrent = function (component, gridConfig) {
    return gridConfig.focusManager().get(component).bind(function (elem) {
      return $_aojb3mzxjducwvg5.closest(elem, gridConfig.selector());
    });
  };
  var execute$1 = function (component, simulatedEvent, gridConfig, gridState) {
    return findCurrent(component, gridConfig).bind(function (focused) {
      return gridConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var doMove = function (cycle) {
    return function (element, focused, gridConfig, gridState) {
      return $_37f9is10ejducwvi8.locateVisible(element, focused, gridConfig.selector()).bind(function (identified) {
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
  var moveLeft = doMove($_g2n65t10hjducwvim.cycleLeft);
  var moveRight = doMove($_g2n65t10hjducwvim.cycleRight);
  var moveNorth = doMove($_g2n65t10hjducwvim.cycleUp);
  var moveSouth = doMove($_g2n65t10hjducwvim.cycleDown);
  var getRules$1 = $_a3rnw0wjjducwv31.constant([
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.LEFT()), $_3ztwrr10cjducwvi4.west(moveLeft, moveRight)),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.RIGHT()), $_3ztwrr10cjducwvi4.east(moveLeft, moveRight)),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.UP()), $_3ztwrr10cjducwvi4.north(moveNorth)),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.DOWN()), $_3ztwrr10cjducwvi4.south(moveSouth)),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.and([
      $_44izm0100jducwvge.isShift,
      $_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.TAB())
    ]), handleTab),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.and([
      $_44izm0100jducwvge.isNotShift,
      $_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.TAB())
    ]), handleTab),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.ESCAPE()), doEscape),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.SPACE().concat($_7xkdypzpjducwvfa.ENTER())), execute$1)
  ]);
  var getEvents$1 = $_a3rnw0wjjducwv31.constant({});
  var getApis$1 = {};
  var FlatgridType = $_83k7gnzqjducwvfd.typical(schema$2, $_beeaqo10bjducwvhx.flatgrid, getRules$1, getEvents$1, getApis$1, Option.some(focusIn));

  var horizontal = function (container, selector, current, delta) {
    return $_37f9is10ejducwvi8.locateVisible(container, current, selector, $_a3rnw0wjjducwv31.constant(true)).bind(function (identified) {
      var index = identified.index();
      var candidates = identified.candidates();
      var newIndex = $_a1qpc3zujducwvfz.cycleBy(index, delta, 0, candidates.length - 1);
      return Option.from(candidates[newIndex]);
    });
  };
  var $_detd910jjducwviz = { horizontal: horizontal };

  var schema$3 = [
    $_csfrqy7jducwv8r.strict('selector'),
    $_csfrqy7jducwv8r.defaulted('getInitial', Option.none),
    $_csfrqy7jducwv8r.defaulted('execute', $_7dse9109jducwvhk.defaultExecute),
    $_csfrqy7jducwv8r.defaulted('executeOnMove', false)
  ];
  var findCurrent$1 = function (component, flowConfig) {
    return flowConfig.focusManager().get(component).bind(function (elem) {
      return $_aojb3mzxjducwvg5.closest(elem, flowConfig.selector());
    });
  };
  var execute$2 = function (component, simulatedEvent, flowConfig) {
    return findCurrent$1(component, flowConfig).bind(function (focused) {
      return flowConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$1 = function (component, flowConfig) {
    flowConfig.getInitial()(component).or($_aojb3mzxjducwvg5.descendant(component.element(), flowConfig.selector())).each(function (first) {
      flowConfig.focusManager().set(component, first);
    });
  };
  var moveLeft$1 = function (element, focused, info) {
    return $_detd910jjducwviz.horizontal(element, info.selector(), focused, -1);
  };
  var moveRight$1 = function (element, focused, info) {
    return $_detd910jjducwviz.horizontal(element, info.selector(), focused, +1);
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
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.LEFT().concat($_7xkdypzpjducwvfa.UP())), doMove$1($_3ztwrr10cjducwvi4.west(moveLeft$1, moveRight$1))),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.RIGHT().concat($_7xkdypzpjducwvfa.DOWN())), doMove$1($_3ztwrr10cjducwvi4.east(moveLeft$1, moveRight$1))),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.ENTER()), execute$2),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.SPACE()), execute$2)
    ];
  };
  var getEvents$2 = $_a3rnw0wjjducwv31.constant({});
  var getApis$2 = $_a3rnw0wjjducwv31.constant({});
  var FlowType = $_83k7gnzqjducwvfd.typical(schema$3, $_8u70ojyjjducwvaq.init, getRules$2, getEvents$2, getApis$2, Option.some(focusIn$1));

  var outcome = $_73sv11x4jducwv4t.immutableBag([
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
    var newColIndex = $_a1qpc3zujducwvfz.cycleBy(startCol, deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var cycleVertical$1 = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_a1qpc3zujducwvfz.cycleBy(startRow, deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_a1qpc3zujducwvfz.cap(colIndex, 0, colsInNextRow - 1);
    return toCell(matrix, nextRowIndex, nextColIndex);
  };
  var moveHorizontal = function (matrix, rowIndex, startCol, deltaCol) {
    var row = matrix[rowIndex];
    var colsInRow = row.length;
    var newColIndex = $_a1qpc3zujducwvfz.cap(startCol + deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var moveVertical = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_a1qpc3zujducwvfz.cap(startRow + deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_a1qpc3zujducwvfz.cap(colIndex, 0, colsInNextRow - 1);
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
  var $_f5vc0310ljducwvjk = {
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
    $_csfrqy7jducwv8r.strictObjOf('selectors', [
      $_csfrqy7jducwv8r.strict('row'),
      $_csfrqy7jducwv8r.strict('cell')
    ]),
    $_csfrqy7jducwv8r.defaulted('cycles', true),
    $_csfrqy7jducwv8r.defaulted('previousSelector', Option.none),
    $_csfrqy7jducwv8r.defaulted('execute', $_7dse9109jducwvhk.defaultExecute)
  ];
  var focusIn$2 = function (component, matrixConfig) {
    var focused = matrixConfig.previousSelector()(component).orThunk(function () {
      var selectors = matrixConfig.selectors();
      return $_aojb3mzxjducwvg5.descendant(component.element(), selectors.cell());
    });
    focused.each(function (cell) {
      matrixConfig.focusManager().set(component, cell);
    });
  };
  var execute$3 = function (component, simulatedEvent, matrixConfig) {
    return $_3hn9p4ytjducwvbd.search(component.element()).bind(function (focused) {
      return matrixConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var toMatrix = function (rows, matrixConfig) {
    return $_e31jlowsjducwv3m.map(rows, function (row) {
      return $_7nc35uzvjducwvg0.descendants(row, matrixConfig.selectors().cell());
    });
  };
  var doMove$2 = function (ifCycle, ifMove) {
    return function (element, focused, matrixConfig) {
      var move = matrixConfig.cycles() ? ifCycle : ifMove;
      return $_aojb3mzxjducwvg5.closest(focused, matrixConfig.selectors().row()).bind(function (inRow) {
        var cellsInRow = $_7nc35uzvjducwvg0.descendants(inRow, matrixConfig.selectors().cell());
        return $_37f9is10ejducwvi8.findIndex(cellsInRow, focused).bind(function (colIndex) {
          var allRows = $_7nc35uzvjducwvg0.descendants(element, matrixConfig.selectors().row());
          return $_37f9is10ejducwvi8.findIndex(allRows, inRow).bind(function (rowIndex) {
            var matrix = toMatrix(allRows, matrixConfig);
            return move(matrix, rowIndex, colIndex).map(function (next) {
              return next.cell();
            });
          });
        });
      });
    };
  };
  var moveLeft$3 = doMove$2($_f5vc0310ljducwvjk.cycleLeft, $_f5vc0310ljducwvjk.moveLeft);
  var moveRight$3 = doMove$2($_f5vc0310ljducwvjk.cycleRight, $_f5vc0310ljducwvjk.moveRight);
  var moveNorth$1 = doMove$2($_f5vc0310ljducwvjk.cycleUp, $_f5vc0310ljducwvjk.moveUp);
  var moveSouth$1 = doMove$2($_f5vc0310ljducwvjk.cycleDown, $_f5vc0310ljducwvjk.moveDown);
  var getRules$3 = $_a3rnw0wjjducwv31.constant([
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.LEFT()), $_3ztwrr10cjducwvi4.west(moveLeft$3, moveRight$3)),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.RIGHT()), $_3ztwrr10cjducwvi4.east(moveLeft$3, moveRight$3)),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.UP()), $_3ztwrr10cjducwvi4.north(moveNorth$1)),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.DOWN()), $_3ztwrr10cjducwvi4.south(moveSouth$1)),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.SPACE().concat($_7xkdypzpjducwvfa.ENTER())), execute$3)
  ]);
  var getEvents$3 = $_a3rnw0wjjducwv31.constant({});
  var getApis$3 = $_a3rnw0wjjducwv31.constant({});
  var MatrixType = $_83k7gnzqjducwvfd.typical(schema$4, $_8u70ojyjjducwvaq.init, getRules$3, getEvents$3, getApis$3, Option.some(focusIn$2));

  var schema$5 = [
    $_csfrqy7jducwv8r.strict('selector'),
    $_csfrqy7jducwv8r.defaulted('execute', $_7dse9109jducwvhk.defaultExecute),
    $_csfrqy7jducwv8r.defaulted('moveOnTab', false)
  ];
  var execute$4 = function (component, simulatedEvent, menuConfig) {
    return menuConfig.focusManager().get(component).bind(function (focused) {
      return menuConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$3 = function (component, menuConfig, simulatedEvent) {
    $_aojb3mzxjducwvg5.descendant(component.element(), menuConfig.selector()).each(function (first) {
      menuConfig.focusManager().set(component, first);
    });
  };
  var moveUp$1 = function (element, focused, info) {
    return $_detd910jjducwviz.horizontal(element, info.selector(), focused, -1);
  };
  var moveDown$1 = function (element, focused, info) {
    return $_detd910jjducwviz.horizontal(element, info.selector(), focused, +1);
  };
  var fireShiftTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_3ztwrr10cjducwvi4.move(moveUp$1)(component, simulatedEvent, menuConfig) : Option.none();
  };
  var fireTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_3ztwrr10cjducwvi4.move(moveDown$1)(component, simulatedEvent, menuConfig) : Option.none();
  };
  var getRules$4 = $_a3rnw0wjjducwv31.constant([
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.UP()), $_3ztwrr10cjducwvi4.move(moveUp$1)),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.DOWN()), $_3ztwrr10cjducwvi4.move(moveDown$1)),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.and([
      $_44izm0100jducwvge.isShift,
      $_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.TAB())
    ]), fireShiftTab),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.and([
      $_44izm0100jducwvge.isNotShift,
      $_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.TAB())
    ]), fireTab),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.ENTER()), execute$4),
    $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.SPACE()), execute$4)
  ]);
  var getEvents$4 = $_a3rnw0wjjducwv31.constant({});
  var getApis$4 = $_a3rnw0wjjducwv31.constant({});
  var MenuType = $_83k7gnzqjducwvfd.typical(schema$5, $_8u70ojyjjducwvaq.init, getRules$4, getEvents$4, getApis$4, Option.some(focusIn$3));

  var schema$6 = [
    $_5qmiobz6jducwvco.onKeyboardHandler('onSpace'),
    $_5qmiobz6jducwvco.onKeyboardHandler('onEnter'),
    $_5qmiobz6jducwvco.onKeyboardHandler('onShiftEnter'),
    $_5qmiobz6jducwvco.onKeyboardHandler('onLeft'),
    $_5qmiobz6jducwvco.onKeyboardHandler('onRight'),
    $_5qmiobz6jducwvco.onKeyboardHandler('onTab'),
    $_5qmiobz6jducwvco.onKeyboardHandler('onShiftTab'),
    $_5qmiobz6jducwvco.onKeyboardHandler('onUp'),
    $_5qmiobz6jducwvco.onKeyboardHandler('onDown'),
    $_5qmiobz6jducwvco.onKeyboardHandler('onEscape'),
    $_csfrqy7jducwv8r.option('focusIn')
  ];
  var getRules$5 = function (component, simulatedEvent, executeInfo) {
    return [
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.SPACE()), executeInfo.onSpace()),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.and([
        $_44izm0100jducwvge.isNotShift,
        $_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.ENTER())
      ]), executeInfo.onEnter()),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.and([
        $_44izm0100jducwvge.isShift,
        $_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.ENTER())
      ]), executeInfo.onShiftEnter()),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.and([
        $_44izm0100jducwvge.isShift,
        $_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.TAB())
      ]), executeInfo.onShiftTab()),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.and([
        $_44izm0100jducwvge.isNotShift,
        $_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.TAB())
      ]), executeInfo.onTab()),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.UP()), executeInfo.onUp()),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.DOWN()), executeInfo.onDown()),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.LEFT()), executeInfo.onLeft()),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.RIGHT()), executeInfo.onRight()),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.SPACE()), executeInfo.onSpace()),
      $_2pm2gbzzjducwvgb.rule($_44izm0100jducwvge.inSet($_7xkdypzpjducwvfa.ESCAPE()), executeInfo.onEscape())
    ];
  };
  var focusIn$4 = function (component, executeInfo) {
    return executeInfo.focusIn().bind(function (f) {
      return f(component, executeInfo);
    });
  };
  var getEvents$5 = $_a3rnw0wjjducwv31.constant({});
  var getApis$5 = $_a3rnw0wjjducwv31.constant({});
  var SpecialType = $_83k7gnzqjducwvfd.typical(schema$6, $_8u70ojyjjducwvaq.init, getRules$5, getEvents$5, getApis$5, Option.some(focusIn$4));

  var $_6x9879zmjducwven = {
    acyclic: AcyclicType.schema(),
    cyclic: CyclicType.schema(),
    flow: FlowType.schema(),
    flatgrid: FlatgridType.schema(),
    matrix: MatrixType.schema(),
    execution: ExecutionType.schema(),
    menu: MenuType.schema(),
    special: SpecialType.schema()
  };

  var Keying = $_drwn8py2jducwv7n.createModes({
    branchKey: 'mode',
    branches: $_6x9879zmjducwven,
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
        if (!$_e7rlwgxsjducwv6r.hasKey(keyState, 'setGridSize')) {
          console.error('Layout does not support setGridSize');
        } else {
          keyState.setGridSize(numRows, numColumns);
        }
      }
    },
    state: $_beeaqo10bjducwvhx
  });

  var field$1 = function (name, forbidden) {
    return $_csfrqy7jducwv8r.defaultedObjOf(name, {}, $_e31jlowsjducwv3m.map(forbidden, function (f) {
      return $_csfrqy7jducwv8r.forbid(f.name(), 'Cannot configure ' + f.name() + ' for ' + name);
    }).concat([$_csfrqy7jducwv8r.state('dump', $_a3rnw0wjjducwv31.identity)]));
  };
  var get$5 = function (data) {
    return data.dump();
  };
  var $_4ee1oc10ojducwvk5 = {
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
  var $_5tqzsa10rjducwvkr = { generate: generate$1 };

  var premadeTag = $_5tqzsa10rjducwvkr.generate('alloy-premade');
  var apiConfig = $_5tqzsa10rjducwvkr.generate('api');
  var premade = function (comp) {
    return $_e7rlwgxsjducwv6r.wrap(premadeTag, comp);
  };
  var getPremade = function (spec) {
    return $_e7rlwgxsjducwv6r.readOptFrom(spec, premadeTag);
  };
  var makeApi = function (f) {
    return $_s04hbygjducwva8.markAsSketchApi(function (component) {
      var args = Array.prototype.slice.call(arguments, 0);
      var spi = component.config(apiConfig);
      return f.apply(undefined, [spi].concat(args));
    }, f);
  };
  var $_ky4yd10qjducwvkl = {
    apiConfig: $_a3rnw0wjjducwv31.constant(apiConfig),
    makeApi: makeApi,
    premade: premade,
    getPremade: getPremade
  };

  var adt$2 = $_dmy3o8xwjducwv7a.generate([
    { required: ['data'] },
    { external: ['data'] },
    { optional: ['data'] },
    { group: ['data'] }
  ]);
  var fFactory = $_csfrqy7jducwv8r.defaulted('factory', { sketch: $_a3rnw0wjjducwv31.identity });
  var fSchema = $_csfrqy7jducwv8r.defaulted('schema', []);
  var fName = $_csfrqy7jducwv8r.strict('name');
  var fPname = $_csfrqy7jducwv8r.field('pname', 'pname', $_2jq6gty8jducwv8w.defaultedThunk(function (typeSpec) {
    return '<alloy.' + $_5tqzsa10rjducwvkr.generate(typeSpec.name) + '>';
  }), $_1cyy8vyejducwva0.anyValue());
  var fDefaults = $_csfrqy7jducwv8r.defaulted('defaults', $_a3rnw0wjjducwv31.constant({}));
  var fOverrides = $_csfrqy7jducwv8r.defaulted('overrides', $_a3rnw0wjjducwv31.constant({}));
  var requiredSpec = $_1cyy8vyejducwva0.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var externalSpec = $_1cyy8vyejducwva0.objOf([
    fFactory,
    fSchema,
    fName,
    fDefaults,
    fOverrides
  ]);
  var optionalSpec = $_1cyy8vyejducwva0.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var groupSpec = $_1cyy8vyejducwva0.objOf([
    fFactory,
    fSchema,
    fName,
    $_csfrqy7jducwv8r.strict('unit'),
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
    return part.fold($_a3rnw0wjjducwv31.identity, $_a3rnw0wjjducwv31.identity, $_a3rnw0wjjducwv31.identity, $_a3rnw0wjjducwv31.identity);
  };
  var convert = function (adtConstructor, partSpec) {
    return function (spec) {
      var data = $_1cyy8vyejducwva0.asStructOrDie('Converting part type', partSpec, spec);
      return adtConstructor(data);
    };
  };
  var $_9mzgbl10vjducwvli = {
    required: convert(adt$2.required, requiredSpec),
    external: convert(adt$2.external, externalSpec),
    optional: convert(adt$2.optional, optionalSpec),
    group: convert(adt$2.group, groupSpec),
    asNamedPart: asNamedPart,
    name: name$1,
    asCommon: asCommon,
    original: $_a3rnw0wjjducwv31.constant('entirety')
  };

  var placeholder = 'placeholder';
  var adt$3 = $_dmy3o8xwjducwv7a.generate([
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
    return $_e31jlowsjducwv3m.contains([placeholder], uiType);
  };
  var subPlaceholder = function (owner, detail, compSpec, placeholders) {
    if (owner.exists(function (o) {
        return o !== compSpec.owner;
      }))
      return adt$3.single(true, $_a3rnw0wjjducwv31.constant(compSpec));
    return $_e7rlwgxsjducwv6r.readOptFrom(placeholders, compSpec.name).fold(function () {
      throw new Error('Unknown placeholder component: ' + compSpec.name + '\nKnown: [' + $_2vh9dzx0jducwv47.keys(placeholders) + ']\nNamespace: ' + owner.getOr('none') + '\nSpec: ' + $_dl4ljnydjducwv9x.stringify(compSpec, null, 2));
    }, function (newSpec) {
      return newSpec.replace();
    });
  };
  var scan = function (owner, detail, compSpec, placeholders) {
    if (compSpec.uiType === placeholder)
      return subPlaceholder(owner, detail, compSpec, placeholders);
    else
      return adt$3.single(false, $_a3rnw0wjjducwv31.constant(compSpec));
  };
  var substitute = function (owner, detail, compSpec, placeholders) {
    var base = scan(owner, detail, compSpec, placeholders);
    return base.fold(function (req, valueThunk) {
      var value = valueThunk(detail, compSpec.config, compSpec.validated);
      var childSpecs = $_e7rlwgxsjducwv6r.readOptFrom(value, 'components').getOr([]);
      var substituted = $_e31jlowsjducwv3m.bind(childSpecs, function (c) {
        return substitute(owner, detail, c, placeholders);
      });
      return [$_5xeczzwyjducwv44.deepMerge(value, { components: substituted })];
    }, function (req, valuesThunk) {
      var values = valuesThunk(detail, compSpec.config, compSpec.validated);
      return values;
    });
  };
  var substituteAll = function (owner, detail, components, placeholders) {
    return $_e31jlowsjducwv3m.bind(components, function (c) {
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
      name: $_a3rnw0wjjducwv31.constant(label),
      required: required,
      used: used,
      replace: replace
    };
  };
  var substitutePlaces = function (owner, detail, components, placeholders) {
    var ps = $_2vh9dzx0jducwv47.map(placeholders, function (ph, name) {
      return oneReplace(name, ph);
    });
    var outcome = substituteAll(owner, detail, components, ps);
    $_2vh9dzx0jducwv47.each(ps, function (p) {
      if (p.used() === false && p.required()) {
        throw new Error('Placeholder: ' + p.name() + ' was not found in components list\nNamespace: ' + owner.getOr('none') + '\nComponents: ' + $_dl4ljnydjducwv9x.stringify(detail.components(), null, 2));
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
  var $_fdg5410wjducwvly = {
    single: adt$3.single,
    multiple: adt$3.multiple,
    isSubstitute: isSubstitute,
    placeholder: $_a3rnw0wjjducwv31.constant(placeholder),
    substituteAll: substituteAll,
    substitutePlaces: substitutePlaces,
    singleReplace: singleReplace
  };

  var combine = function (detail, data, partSpec, partValidated) {
    var spec = partSpec;
    return $_5xeczzwyjducwv44.deepMerge(data.defaults()(detail, partSpec, partValidated), partSpec, { uid: detail.partUids()[data.name()] }, data.overrides()(detail, partSpec, partValidated), { 'debug.sketcher': $_e7rlwgxsjducwv6r.wrap('part-' + data.name(), spec) });
  };
  var subs = function (owner, detail, parts) {
    var internals = {};
    var externals = {};
    $_e31jlowsjducwv3m.each(parts, function (part) {
      part.fold(function (data) {
        internals[data.pname()] = $_fdg5410wjducwvly.single(true, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        var partSpec = detail.parts()[data.name()]();
        externals[data.name()] = $_a3rnw0wjjducwv31.constant(combine(detail, data, partSpec[$_9mzgbl10vjducwvli.original()]()));
      }, function (data) {
        internals[data.pname()] = $_fdg5410wjducwvly.single(false, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        internals[data.pname()] = $_fdg5410wjducwvly.multiple(true, function (detail, _partSpec, _partValidated) {
          var units = detail[data.name()]();
          return $_e31jlowsjducwv3m.map(units, function (u) {
            return data.factory().sketch($_5xeczzwyjducwv44.deepMerge(data.defaults()(detail, u), u, data.overrides()(detail, u)));
          });
        });
      });
    });
    return {
      internals: $_a3rnw0wjjducwv31.constant(internals),
      externals: $_a3rnw0wjjducwv31.constant(externals)
    };
  };
  var $_3brl1e10ujducwvlb = { subs: subs };

  var generate$2 = function (owner, parts) {
    var r = {};
    $_e31jlowsjducwv3m.each(parts, function (part) {
      $_9mzgbl10vjducwvli.asNamedPart(part).each(function (np) {
        var g = doGenerateOne(owner, np.pname());
        r[np.name()] = function (config) {
          var validated = $_1cyy8vyejducwva0.asRawOrDie('Part: ' + np.name() + ' in ' + owner, $_1cyy8vyejducwva0.objOf(np.schema()), config);
          return $_5xeczzwyjducwv44.deepMerge(g, {
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
      uiType: $_fdg5410wjducwvly.placeholder(),
      owner: owner,
      name: pname
    };
  };
  var generateOne = function (owner, pname, config) {
    return {
      uiType: $_fdg5410wjducwvly.placeholder(),
      owner: owner,
      name: pname,
      config: config,
      validated: {}
    };
  };
  var schemas = function (parts) {
    return $_e31jlowsjducwv3m.bind(parts, function (part) {
      return part.fold(Option.none, Option.some, Option.none, Option.none).map(function (data) {
        return $_csfrqy7jducwv8r.strictObjOf(data.name(), data.schema().concat([$_5qmiobz6jducwvco.snapshot($_9mzgbl10vjducwvli.original())]));
      }).toArray();
    });
  };
  var names = function (parts) {
    return $_e31jlowsjducwv3m.map(parts, $_9mzgbl10vjducwvli.name);
  };
  var substitutes = function (owner, detail, parts) {
    return $_3brl1e10ujducwvlb.subs(owner, detail, parts);
  };
  var components = function (owner, detail, internals) {
    return $_fdg5410wjducwvly.substitutePlaces(Option.some(owner), detail, detail.components(), internals);
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
    $_e31jlowsjducwv3m.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]);
    });
    return $_2vh9dzx0jducwv47.map(r, $_a3rnw0wjjducwv31.constant);
  };
  var getAllParts = function (component, detail) {
    var system = component.getSystem();
    return $_2vh9dzx0jducwv47.map(detail.partUids(), function (pUid, k) {
      return $_a3rnw0wjjducwv31.constant(system.getByUid(pUid));
    });
  };
  var getPartsOrDie = function (component, detail, partKeys) {
    var r = {};
    var uids = detail.partUids();
    var system = component.getSystem();
    $_e31jlowsjducwv3m.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]).getOrDie();
    });
    return $_2vh9dzx0jducwv47.map(r, $_a3rnw0wjjducwv31.constant);
  };
  var defaultUids = function (baseUid, partTypes) {
    var partNames = names(partTypes);
    return $_e7rlwgxsjducwv6r.wrapAll($_e31jlowsjducwv3m.map(partNames, function (pn) {
      return {
        key: pn,
        value: baseUid + '-' + pn
      };
    }));
  };
  var defaultUidsSchema = function (partTypes) {
    return $_csfrqy7jducwv8r.field('partUids', 'partUids', $_2jq6gty8jducwv8w.mergeWithThunk(function (spec) {
      return defaultUids(spec.uid, partTypes);
    }), $_1cyy8vyejducwva0.anyValue());
  };
  var $_efrbru10tjducwvky = {
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
  var $_9x9pdh10yjducwvml = {
    prefix: $_a3rnw0wjjducwv31.constant(prefix$1),
    idAttr: $_a3rnw0wjjducwv31.constant(idAttr)
  };

  var prefix$2 = $_9x9pdh10yjducwvml.prefix();
  var idAttr$1 = $_9x9pdh10yjducwvml.idAttr();
  var write = function (label, elem) {
    var id = $_5tqzsa10rjducwvkr.generate(prefix$2 + label);
    $_6yofxrjducwv6k.set(elem, idAttr$1, id);
    return id;
  };
  var writeOnly = function (elem, uid) {
    $_6yofxrjducwv6k.set(elem, idAttr$1, uid);
  };
  var read$2 = function (elem) {
    var id = $_en9ft8xkjducwv5x.isElement(elem) ? $_6yofxrjducwv6k.get(elem, idAttr$1) : null;
    return Option.from(id);
  };
  var find$3 = function (container, id) {
    return $_aojb3mzxjducwvg5.descendant(container, id);
  };
  var generate$3 = function (prefix) {
    return $_5tqzsa10rjducwvkr.generate(prefix);
  };
  var revoke = function (elem) {
    $_6yofxrjducwv6k.remove(elem, idAttr$1);
  };
  var $_803ea810xjducwvmd = {
    revoke: revoke,
    write: write,
    writeOnly: writeOnly,
    read: read$2,
    find: find$3,
    generate: generate$3,
    attribute: $_a3rnw0wjjducwv31.constant(idAttr$1)
  };

  var getPartsSchema = function (partNames, _optPartNames, _owner) {
    var owner = _owner !== undefined ? _owner : 'Unknown owner';
    var fallbackThunk = function () {
      return [$_5qmiobz6jducwvco.output('partUids', {})];
    };
    var optPartNames = _optPartNames !== undefined ? _optPartNames : fallbackThunk();
    if (partNames.length === 0 && optPartNames.length === 0)
      return fallbackThunk();
    var partsSchema = $_csfrqy7jducwv8r.strictObjOf('parts', $_e31jlowsjducwv3m.flatten([
      $_e31jlowsjducwv3m.map(partNames, $_csfrqy7jducwv8r.strict),
      $_e31jlowsjducwv3m.map(optPartNames, function (optPart) {
        return $_csfrqy7jducwv8r.defaulted(optPart, $_fdg5410wjducwvly.single(false, function () {
          throw new Error('The optional part: ' + optPart + ' was not specified in the config, but it was used in components');
        }));
      })
    ]));
    var partUidsSchema = $_csfrqy7jducwv8r.state('partUids', function (spec) {
      if (!$_e7rlwgxsjducwv6r.hasKey(spec, 'parts')) {
        throw new Error('Part uid definition for owner: ' + owner + ' requires "parts"\nExpected parts: ' + partNames.join(', ') + '\nSpec: ' + $_dl4ljnydjducwv9x.stringify(spec, null, 2));
      }
      var uids = $_2vh9dzx0jducwv47.map(spec.parts, function (v, k) {
        return $_e7rlwgxsjducwv6r.readOptFrom(v, 'uid').getOrThunk(function () {
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
    var ps = partSchemas.length > 0 ? [$_csfrqy7jducwv8r.strictObjOf('parts', partSchemas)] : [];
    return ps.concat([
      $_csfrqy7jducwv8r.strict('uid'),
      $_csfrqy7jducwv8r.defaulted('dom', {}),
      $_csfrqy7jducwv8r.defaulted('components', []),
      $_5qmiobz6jducwvco.snapshot('originalSpec'),
      $_csfrqy7jducwv8r.defaulted('debug.sketcher', {})
    ]).concat(partUidsSchemas);
  };
  var asRawOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, spec, partUidsSchemas);
    return $_1cyy8vyejducwva0.asRawOrDie(label + ' [SpecSchema]', $_1cyy8vyejducwva0.objOfOnly(baseS.concat(schema)), spec);
  };
  var asStructOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, partUidsSchemas, spec);
    return $_1cyy8vyejducwva0.asStructOrDie(label + ' [SpecSchema]', $_1cyy8vyejducwva0.objOfOnly(baseS.concat(schema)), spec);
  };
  var extend = function (builder, original, nu) {
    var newSpec = $_5xeczzwyjducwv44.deepMerge(original, nu);
    return builder(newSpec);
  };
  var addBehaviours = function (original, behaviours) {
    return $_5xeczzwyjducwv44.deepMerge(original, behaviours);
  };
  var $_9ww5gw10zjducwvmo = {
    asRawOrDie: asRawOrDie$1,
    asStructOrDie: asStructOrDie$1,
    addBehaviours: addBehaviours,
    getPartsSchema: getPartsSchema,
    extend: extend
  };

  var single = function (owner, schema, factory, spec) {
    var specWithUid = supplyUid(spec);
    var detail = $_9ww5gw10zjducwvmo.asStructOrDie(owner, schema, specWithUid, [], []);
    return $_5xeczzwyjducwv44.deepMerge(factory(detail, specWithUid), { 'debug.sketcher': $_e7rlwgxsjducwv6r.wrap(owner, spec) });
  };
  var composite = function (owner, schema, partTypes, factory, spec) {
    var specWithUid = supplyUid(spec);
    var partSchemas = $_efrbru10tjducwvky.schemas(partTypes);
    var partUidsSchema = $_efrbru10tjducwvky.defaultUidsSchema(partTypes);
    var detail = $_9ww5gw10zjducwvmo.asStructOrDie(owner, schema, specWithUid, partSchemas, [partUidsSchema]);
    var subs = $_efrbru10tjducwvky.substitutes(owner, detail, partTypes);
    var components = $_efrbru10tjducwvky.components(owner, detail, subs.internals());
    return $_5xeczzwyjducwv44.deepMerge(factory(detail, components, specWithUid, subs.externals()), { 'debug.sketcher': $_e7rlwgxsjducwv6r.wrap(owner, spec) });
  };
  var supplyUid = function (spec) {
    return $_5xeczzwyjducwv44.deepMerge({ uid: $_803ea810xjducwvmd.generate('uid') }, spec);
  };
  var $_caelpo10sjducwvks = {
    supplyUid: supplyUid,
    single: single,
    composite: composite
  };

  var singleSchema = $_1cyy8vyejducwva0.objOfOnly([
    $_csfrqy7jducwv8r.strict('name'),
    $_csfrqy7jducwv8r.strict('factory'),
    $_csfrqy7jducwv8r.strict('configFields'),
    $_csfrqy7jducwv8r.defaulted('apis', {}),
    $_csfrqy7jducwv8r.defaulted('extraApis', {})
  ]);
  var compositeSchema = $_1cyy8vyejducwva0.objOfOnly([
    $_csfrqy7jducwv8r.strict('name'),
    $_csfrqy7jducwv8r.strict('factory'),
    $_csfrqy7jducwv8r.strict('configFields'),
    $_csfrqy7jducwv8r.strict('partFields'),
    $_csfrqy7jducwv8r.defaulted('apis', {}),
    $_csfrqy7jducwv8r.defaulted('extraApis', {})
  ]);
  var single$1 = function (rawConfig) {
    var config = $_1cyy8vyejducwva0.asRawOrDie('Sketcher for ' + rawConfig.name, singleSchema, rawConfig);
    var sketch = function (spec) {
      return $_caelpo10sjducwvks.single(config.name, config.configFields, config.factory, spec);
    };
    var apis = $_2vh9dzx0jducwv47.map(config.apis, $_ky4yd10qjducwvkl.makeApi);
    var extraApis = $_2vh9dzx0jducwv47.map(config.extraApis, function (f, k) {
      return $_s04hbygjducwva8.markAsExtraApi(f, k);
    });
    return $_5xeczzwyjducwv44.deepMerge({
      name: $_a3rnw0wjjducwv31.constant(config.name),
      partFields: $_a3rnw0wjjducwv31.constant([]),
      configFields: $_a3rnw0wjjducwv31.constant(config.configFields),
      sketch: sketch
    }, apis, extraApis);
  };
  var composite$1 = function (rawConfig) {
    var config = $_1cyy8vyejducwva0.asRawOrDie('Sketcher for ' + rawConfig.name, compositeSchema, rawConfig);
    var sketch = function (spec) {
      return $_caelpo10sjducwvks.composite(config.name, config.configFields, config.partFields, config.factory, spec);
    };
    var parts = $_efrbru10tjducwvky.generate(config.name, config.partFields);
    var apis = $_2vh9dzx0jducwv47.map(config.apis, $_ky4yd10qjducwvkl.makeApi);
    var extraApis = $_2vh9dzx0jducwv47.map(config.extraApis, function (f, k) {
      return $_s04hbygjducwva8.markAsExtraApi(f, k);
    });
    return $_5xeczzwyjducwv44.deepMerge({
      name: $_a3rnw0wjjducwv31.constant(config.name),
      partFields: $_a3rnw0wjjducwv31.constant(config.partFields),
      configFields: $_a3rnw0wjjducwv31.constant(config.configFields),
      sketch: sketch,
      parts: $_a3rnw0wjjducwv31.constant(parts)
    }, apis, extraApis);
  };
  var $_ehwl8210pjducwvkb = {
    single: single$1,
    composite: composite$1
  };

  var events$3 = function (optAction) {
    var executeHandler = function (action) {
      return $_gd6bsky4jducwv8a.run($_c92nqswhjducwv2r.execute(), function (component, simulatedEvent) {
        action(component);
        simulatedEvent.stop();
      });
    };
    var onClick = function (component, simulatedEvent) {
      simulatedEvent.stop();
      $_51mp15wgjducwv2k.emitExecute(component);
    };
    var onMousedown = function (component, simulatedEvent) {
      simulatedEvent.cut();
    };
    var pointerEvents = $_f3swp0wkjducwv33.detect().deviceType.isTouch() ? [$_gd6bsky4jducwv8a.run($_c92nqswhjducwv2r.tap(), onClick)] : [
      $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.click(), onClick),
      $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.mousedown(), onMousedown)
    ];
    return $_gd6bsky4jducwv8a.derive($_e31jlowsjducwv3m.flatten([
      optAction.map(executeHandler).toArray(),
      pointerEvents
    ]));
  };
  var $_4115uh110jducwvn0 = { events: events$3 };

  var factory = function (detail, spec) {
    var events = $_4115uh110jducwvn0.events(detail.action());
    var optType = $_e7rlwgxsjducwv6r.readOptFrom(detail.dom(), 'attributes').bind($_e7rlwgxsjducwv6r.readOpt('type'));
    var optTag = $_e7rlwgxsjducwv6r.readOptFrom(detail.dom(), 'tag');
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: detail.components(),
      events: events,
      behaviours: $_5xeczzwyjducwv44.deepMerge($_drwn8py2jducwv7n.derive([
        Focusing.config({}),
        Keying.config({
          mode: 'execution',
          useSpace: true,
          useEnter: true
        })
      ]), $_4ee1oc10ojducwvk5.get(detail.buttonBehaviours())),
      domModification: {
        attributes: $_5xeczzwyjducwv44.deepMerge(optType.fold(function () {
          return optTag.is('button') ? { type: 'button' } : {};
        }, function (t) {
          return {};
        }), { role: detail.role().getOr('button') })
      },
      eventOrder: detail.eventOrder()
    };
  };
  var Button = $_ehwl8210pjducwvkb.single({
    name: 'Button',
    factory: factory,
    configFields: [
      $_csfrqy7jducwv8r.defaulted('uid', undefined),
      $_csfrqy7jducwv8r.strict('dom'),
      $_csfrqy7jducwv8r.defaulted('components', []),
      $_4ee1oc10ojducwvk5.field('buttonBehaviours', [
        Focusing,
        Keying
      ]),
      $_csfrqy7jducwv8r.option('action'),
      $_csfrqy7jducwv8r.option('role'),
      $_csfrqy7jducwv8r.defaulted('eventOrder', {})
    ]
  });

  var exhibit$2 = function (base, unselectConfig) {
    return $_5ldw5hyhjducwvac.nu({
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
    return $_gd6bsky4jducwv8a.derive([$_gd6bsky4jducwv8a.abort($_cp12t3wijducwv2w.selectstart(), $_a3rnw0wjjducwv31.constant(true))]);
  };
  var $_feilbn112jducwvn7 = {
    events: events$4,
    exhibit: exhibit$2
  };

  var Unselecting = $_drwn8py2jducwv7n.create({
    fields: [],
    name: 'unselecting',
    active: $_feilbn112jducwvn7
  });

  var getAttrs = function (elem) {
    var attributes = elem.dom().attributes !== undefined ? elem.dom().attributes : [];
    return $_e31jlowsjducwv3m.foldl(attributes, function (b, attr) {
      if (attr.name === 'class')
        return b;
      else
        return $_5xeczzwyjducwv44.deepMerge(b, $_e7rlwgxsjducwv6r.wrap(attr.name, attr.value));
    }, {});
  };
  var getClasses = function (elem) {
    return Array.prototype.slice.call(elem.dom().classList, 0);
  };
  var fromHtml$2 = function (html) {
    var elem = $_dqo9uvxfjducwv5k.fromHtml(html);
    var children = $_375a04x3jducwv4l.children(elem);
    var attrs = getAttrs(elem);
    var classes = getClasses(elem);
    var contents = children.length === 0 ? {} : { innerHtml: $_7rrdsexojducwv6c.get(elem) };
    return $_5xeczzwyjducwv44.deepMerge({
      tag: $_en9ft8xkjducwv5x.name(elem),
      classes: classes,
      attributes: attrs
    }, contents);
  };
  var sketch = function (sketcher, html, config) {
    return sketcher.sketch($_5xeczzwyjducwv44.deepMerge({ dom: fromHtml$2(html) }, config));
  };
  var $_a4f2uv114jducwvne = {
    fromHtml: fromHtml$2,
    sketch: sketch
  };

  var dom$1 = function (rawHtml) {
    var html = $_2zs55cwvjducwv40.supplant(rawHtml, { prefix: $_513f6yzejducwvdz.prefix() });
    return $_a4f2uv114jducwvne.fromHtml(html);
  };
  var spec = function (rawHtml) {
    var sDom = dom$1(rawHtml);
    return { dom: sDom };
  };
  var $_4j6qzx113jducwvna = {
    dom: dom$1,
    spec: spec
  };

  var forToolbarCommand = function (editor, command) {
    return forToolbar(command, function () {
      editor.execCommand(command);
    }, {});
  };
  var getToggleBehaviours = function (command) {
    return $_drwn8py2jducwv7n.derive([
      Toggling.config({
        toggleClass: $_513f6yzejducwvdz.resolve('toolbar-button-selected'),
        toggleOnExecute: false,
        aria: { mode: 'pressed' }
      }),
      $_6h7r9izdjducwvdv.format(command, function (button, status) {
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
      dom: $_4j6qzx113jducwvna.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-' + clazz + ' ${prefix}-icon"></span>'),
      action: action,
      buttonBehaviours: $_5xeczzwyjducwv44.deepMerge($_drwn8py2jducwv7n.derive([Unselecting.config({})]), extraBehaviours)
    });
  };
  var $_1sb0dgzfjducwve1 = {
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
  var $_6tb9wd119jducwvog = {
    reduceBy: reduceBy,
    increaseBy: increaseBy,
    findValueOfX: findValueOfX
  };

  var changeEvent = 'slider.change.value';
  var isTouch = $_f3swp0wkjducwv33.detect().deviceType.isTouch();
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
    $_51mp15wgjducwv2k.emitWith(component, changeEvent, { value: value });
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
    var value = $_6tb9wd119jducwvog.findValueOfX(spectrumBounds, detail.min(), detail.max(), xValue, detail.stepSize(), detail.snapToGrid(), detail.snapStart());
    fireChange(spectrum, value);
  };
  var setXFromEvent = function (spectrum, detail, spectrumBounds, simulatedEvent) {
    return getEventX(simulatedEvent).map(function (xValue) {
      setToX(spectrum, spectrumBounds, detail, xValue);
      return xValue;
    });
  };
  var moveLeft$4 = function (spectrum, detail) {
    var newValue = $_6tb9wd119jducwvog.reduceBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var moveRight$4 = function (spectrum, detail) {
    var newValue = $_6tb9wd119jducwvog.increaseBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var $_6b49lb118jducwvo9 = {
    setXFromEvent: setXFromEvent,
    setToLedge: setToLedge,
    setToRedge: setToRedge,
    moveLeftFromRedge: moveLeftFromRedge,
    moveRightFromLedge: moveRightFromLedge,
    moveLeft: moveLeft$4,
    moveRight: moveRight$4,
    changeEvent: $_a3rnw0wjjducwv31.constant(changeEvent)
  };

  var platform = $_f3swp0wkjducwv33.detect();
  var isTouch$1 = platform.deviceType.isTouch();
  var edgePart = function (name, action) {
    return $_9mzgbl10vjducwvli.optional({
      name: '' + name + '-edge',
      overrides: function (detail) {
        var touchEvents = $_gd6bsky4jducwv8a.derive([$_gd6bsky4jducwv8a.runActionExtra($_cp12t3wijducwv2w.touchstart(), action, [detail])]);
        var mouseEvents = $_gd6bsky4jducwv8a.derive([
          $_gd6bsky4jducwv8a.runActionExtra($_cp12t3wijducwv2w.mousedown(), action, [detail]),
          $_gd6bsky4jducwv8a.runActionExtra($_cp12t3wijducwv2w.mousemove(), function (l, det) {
            if (det.mouseIsDown().get())
              action(l, det);
          }, [detail])
        ]);
        return { events: isTouch$1 ? touchEvents : mouseEvents };
      }
    });
  };
  var ledgePart = edgePart('left', $_6b49lb118jducwvo9.setToLedge);
  var redgePart = edgePart('right', $_6b49lb118jducwvo9.setToRedge);
  var thumbPart = $_9mzgbl10vjducwvli.required({
    name: 'thumb',
    defaults: $_a3rnw0wjjducwv31.constant({ dom: { styles: { position: 'absolute' } } }),
    overrides: function (detail) {
      return {
        events: $_gd6bsky4jducwv8a.derive([
          $_gd6bsky4jducwv8a.redirectToPart($_cp12t3wijducwv2w.touchstart(), detail, 'spectrum'),
          $_gd6bsky4jducwv8a.redirectToPart($_cp12t3wijducwv2w.touchmove(), detail, 'spectrum'),
          $_gd6bsky4jducwv8a.redirectToPart($_cp12t3wijducwv2w.touchend(), detail, 'spectrum')
        ])
      };
    }
  });
  var spectrumPart = $_9mzgbl10vjducwvli.required({
    schema: [$_csfrqy7jducwv8r.state('mouseIsDown', function () {
        return Cell(false);
      })],
    name: 'spectrum',
    overrides: function (detail) {
      var moveToX = function (spectrum, simulatedEvent) {
        var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
        $_6b49lb118jducwvo9.setXFromEvent(spectrum, detail, spectrumBounds, simulatedEvent);
      };
      var touchEvents = $_gd6bsky4jducwv8a.derive([
        $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.touchstart(), moveToX),
        $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.touchmove(), moveToX)
      ]);
      var mouseEvents = $_gd6bsky4jducwv8a.derive([
        $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.mousedown(), moveToX),
        $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.mousemove(), function (spectrum, se) {
          if (detail.mouseIsDown().get())
            moveToX(spectrum, se);
        })
      ]);
      return {
        behaviours: $_drwn8py2jducwv7n.derive(isTouch$1 ? [] : [
          Keying.config({
            mode: 'special',
            onLeft: function (spectrum) {
              $_6b49lb118jducwvo9.moveLeft(spectrum, detail);
              return Option.some(true);
            },
            onRight: function (spectrum) {
              $_6b49lb118jducwvo9.moveRight(spectrum, detail);
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
  var $_bf8p3q11djducwvot = {
    onLoad: onLoad$1,
    onUnload: onUnload,
    setValue: setValue,
    getValue: getValue
  };

  var events$5 = function (repConfig, repState) {
    var es = repConfig.resetOnDom() ? [
      $_gd6bsky4jducwv8a.runOnAttached(function (comp, se) {
        $_bf8p3q11djducwvot.onLoad(comp, repConfig, repState);
      }),
      $_gd6bsky4jducwv8a.runOnDetached(function (comp, se) {
        $_bf8p3q11djducwvot.onUnload(comp, repConfig, repState);
      })
    ] : [$_6i94u4y3jducwv7v.loadEvent(repConfig, repState, $_bf8p3q11djducwvot.onLoad)];
    return $_gd6bsky4jducwv8a.derive(es);
  };
  var $_6c7arm11cjducwvos = { events: events$5 };

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
  var $_f6g8ib11gjducwvp2 = {
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
    return $_e7rlwgxsjducwv6r.readOptFrom(dataset, key).fold(function () {
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
    $_csfrqy7jducwv8r.option('initialValue'),
    $_csfrqy7jducwv8r.strict('getFallbackEntry'),
    $_csfrqy7jducwv8r.strict('getDataKey'),
    $_csfrqy7jducwv8r.strict('setData'),
    $_5qmiobz6jducwvco.output('manager', {
      setValue: setValue$1,
      getValue: getValue$1,
      onLoad: onLoad$2,
      onUnload: onUnload$1,
      state: $_f6g8ib11gjducwvp2.dataset
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
    $_csfrqy7jducwv8r.strict('getValue'),
    $_csfrqy7jducwv8r.defaulted('setValue', $_a3rnw0wjjducwv31.noop),
    $_csfrqy7jducwv8r.option('initialValue'),
    $_5qmiobz6jducwvco.output('manager', {
      setValue: setValue$2,
      getValue: getValue$2,
      onLoad: onLoad$3,
      onUnload: $_a3rnw0wjjducwv31.noop,
      state: $_8u70ojyjjducwvaq.init
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
    $_csfrqy7jducwv8r.option('initialValue'),
    $_5qmiobz6jducwvco.output('manager', {
      setValue: setValue$3,
      getValue: getValue$3,
      onLoad: onLoad$4,
      onUnload: onUnload$2,
      state: $_f6g8ib11gjducwvp2.memory
    })
  ];

  var RepresentSchema = [
    $_csfrqy7jducwv8r.defaultedOf('store', { mode: 'memory' }, $_1cyy8vyejducwva0.choose('mode', {
      memory: MemoryStore,
      manual: ManualStore,
      dataset: DatasetStore
    })),
    $_5qmiobz6jducwvco.onHandler('onSetValue'),
    $_csfrqy7jducwv8r.defaulted('resetOnDom', false)
  ];

  var me = $_drwn8py2jducwv7n.create({
    fields: RepresentSchema,
    name: 'representing',
    active: $_6c7arm11cjducwvos,
    apis: $_bf8p3q11djducwvot,
    extra: {
      setValueFrom: function (component, source) {
        var value = me.getValue(source);
        me.setValue(component, value);
      }
    },
    state: $_f6g8ib11gjducwvp2
  });

  var isTouch$2 = $_f3swp0wkjducwv33.detect().deviceType.isTouch();
  var SliderSchema = [
    $_csfrqy7jducwv8r.strict('min'),
    $_csfrqy7jducwv8r.strict('max'),
    $_csfrqy7jducwv8r.defaulted('stepSize', 1),
    $_csfrqy7jducwv8r.defaulted('onChange', $_a3rnw0wjjducwv31.noop),
    $_csfrqy7jducwv8r.defaulted('onInit', $_a3rnw0wjjducwv31.noop),
    $_csfrqy7jducwv8r.defaulted('onDragStart', $_a3rnw0wjjducwv31.noop),
    $_csfrqy7jducwv8r.defaulted('onDragEnd', $_a3rnw0wjjducwv31.noop),
    $_csfrqy7jducwv8r.defaulted('snapToGrid', false),
    $_csfrqy7jducwv8r.option('snapStart'),
    $_csfrqy7jducwv8r.strict('getInitialValue'),
    $_4ee1oc10ojducwvk5.field('sliderBehaviours', [
      Keying,
      me
    ]),
    $_csfrqy7jducwv8r.state('value', function (spec) {
      return Cell(spec.min);
    })
  ].concat(!isTouch$2 ? [$_csfrqy7jducwv8r.state('mouseIsDown', function () {
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
    $_gbl0iz103jducwvgo.set(element, 'max-width', absMax + 'px');
  };
  var $_vvvkn11kjducwvpt = {
    set: set$4,
    get: get$6,
    getOuter: getOuter$2,
    setMax: setMax$1
  };

  var isTouch$3 = $_f3swp0wkjducwv33.detect().deviceType.isTouch();
  var sketch$1 = function (detail, components, spec, externals) {
    var range = detail.max() - detail.min();
    var getXCentre = function (component) {
      var rect = component.element().dom().getBoundingClientRect();
      return (rect.left + rect.right) / 2;
    };
    var getThumb = function (component) {
      return $_efrbru10tjducwvky.getPartOrDie(component, detail, 'thumb');
    };
    var getXOffset = function (slider, spectrumBounds, detail) {
      var v = detail.value().get();
      if (v < detail.min()) {
        return $_efrbru10tjducwvky.getPart(slider, detail, 'left-edge').fold(function () {
          return 0;
        }, function (ledge) {
          return getXCentre(ledge) - spectrumBounds.left;
        });
      } else if (v > detail.max()) {
        return $_efrbru10tjducwvky.getPart(slider, detail, 'right-edge').fold(function () {
          return spectrumBounds.width;
        }, function (redge) {
          return getXCentre(redge) - spectrumBounds.left;
        });
      } else {
        return (detail.value().get() - detail.min()) / range * spectrumBounds.width;
      }
    };
    var getXPos = function (slider) {
      var spectrum = $_efrbru10tjducwvky.getPartOrDie(slider, detail, 'spectrum');
      var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
      var sliderBounds = slider.element().dom().getBoundingClientRect();
      var xOffset = getXOffset(slider, spectrumBounds, detail);
      return spectrumBounds.left - sliderBounds.left + xOffset;
    };
    var refresh = function (component) {
      var pos = getXPos(component);
      var thumb = getThumb(component);
      var thumbRadius = $_vvvkn11kjducwvpt.get(thumb.element()) / 2;
      $_gbl0iz103jducwvgo.set(thumb.element(), 'left', pos - thumbRadius + 'px');
    };
    var changeValue = function (component, newValue) {
      var oldValue = detail.value().get();
      var thumb = getThumb(component);
      if (oldValue !== newValue || $_gbl0iz103jducwvgo.getRaw(thumb.element(), 'left').isNone()) {
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
      $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.touchstart(), function (slider, simulatedEvent) {
        detail.onDragStart()(slider, getThumb(slider));
      }),
      $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.touchend(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
      })
    ] : [
      $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.mousedown(), function (slider, simulatedEvent) {
        simulatedEvent.stop();
        detail.onDragStart()(slider, getThumb(slider));
        detail.mouseIsDown().set(true);
      }),
      $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.mouseup(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
        detail.mouseIsDown().set(false);
      })
    ];
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_5xeczzwyjducwv44.deepMerge($_drwn8py2jducwv7n.derive($_e31jlowsjducwv3m.flatten([
        !isTouch$3 ? [Keying.config({
            mode: 'special',
            focusIn: function (slider) {
              return $_efrbru10tjducwvky.getPart(slider, detail, 'spectrum').map(Keying.focusIn).map($_a3rnw0wjjducwv31.constant(true));
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
      ])), $_4ee1oc10ojducwvk5.get(detail.sliderBehaviours())),
      events: $_gd6bsky4jducwv8a.derive([
        $_gd6bsky4jducwv8a.run($_6b49lb118jducwvo9.changeEvent(), function (slider, simulatedEvent) {
          changeValue(slider, simulatedEvent.event().value());
        }),
        $_gd6bsky4jducwv8a.runOnAttached(function (slider, simulatedEvent) {
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
  var $_dqsgp211jjducwvpd = { sketch: sketch$1 };

  var Slider = $_ehwl8210pjducwvkb.composite({
    name: 'Slider',
    configFields: SliderSchema,
    partFields: SliderParts,
    factory: $_dqsgp211jjducwvpd.sketch,
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
    return $_1sb0dgzfjducwve1.forToolbar(clazz, function () {
      var items = makeItems();
      realm.setContextToolbar([{
          label: clazz + ' group',
          items: items
        }]);
    }, {});
  };
  var $_bzi2qh11ljducwvpv = { button: button };

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
      $_gbl0iz103jducwvgo.set(thumb.element(), 'background-color', color);
    };
    var onChange = function (slider, thumb, value) {
      var color = getColor(value);
      $_gbl0iz103jducwvgo.set(thumb.element(), 'background-color', color);
      spec.onChange(slider, thumb, color);
    };
    return Slider.sketch({
      dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-slider ${prefix}-hue-slider-container"></div>'),
      components: [
        Slider.parts()['left-edge']($_4j6qzx113jducwvna.spec('<div class="${prefix}-hue-slider-black"></div>')),
        Slider.parts().spectrum({
          dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-slider-gradient-container"></div>'),
          components: [$_4j6qzx113jducwvna.spec('<div class="${prefix}-slider-gradient"></div>')],
          behaviours: $_drwn8py2jducwv7n.derive([Toggling.config({ toggleClass: $_513f6yzejducwvdz.resolve('thumb-active') })])
        }),
        Slider.parts()['right-edge']($_4j6qzx113jducwvna.spec('<div class="${prefix}-hue-slider-white"></div>')),
        Slider.parts().thumb({
          dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_drwn8py2jducwv7n.derive([Toggling.config({ toggleClass: $_513f6yzejducwvdz.resolve('thumb-active') })])
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
      sliderBehaviours: $_drwn8py2jducwv7n.derive([$_6h7r9izdjducwvdv.orientation(Slider.refresh)])
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
    return $_bzi2qh11ljducwvpv.button(realm, 'color', function () {
      return makeItems(spec);
    });
  };
  var $_99ulj115jducwvnt = {
    makeItems: makeItems,
    sketch: sketch$2
  };

  var schema$7 = $_1cyy8vyejducwva0.objOfOnly([
    $_csfrqy7jducwv8r.strict('getInitialValue'),
    $_csfrqy7jducwv8r.strict('onChange'),
    $_csfrqy7jducwv8r.strict('category'),
    $_csfrqy7jducwv8r.strict('sizes')
  ]);
  var sketch$3 = function (rawSpec) {
    var spec = $_1cyy8vyejducwva0.asRawOrDie('SizeSlider', schema$7, rawSpec);
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
          $_513f6yzejducwvdz.resolve('slider-' + spec.category + '-size-container'),
          $_513f6yzejducwvdz.resolve('slider'),
          $_513f6yzejducwvdz.resolve('slider-size-container')
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
      sliderBehaviours: $_drwn8py2jducwv7n.derive([$_6h7r9izdjducwvdv.orientation(Slider.refresh)]),
      components: [
        Slider.parts().spectrum({
          dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-slider-size-container"></div>'),
          components: [$_4j6qzx113jducwvna.spec('<div class="${prefix}-slider-size-line"></div>')]
        }),
        Slider.parts().thumb({
          dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_drwn8py2jducwv7n.derive([Toggling.config({ toggleClass: $_513f6yzejducwvdz.resolve('thumb-active') })])
        })
      ]
    });
  };
  var $_e8feya11njducwvpy = { sketch: sketch$3 };

  var ancestor$3 = function (scope, transform, isRoot) {
    var element = scope.dom();
    var stop = $_9yomlywzjducwv46.isFunction(isRoot) ? isRoot : $_a3rnw0wjjducwv31.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_dqo9uvxfjducwv5k.fromDom(element);
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
  var $_cxe5d211pjducwvqh = {
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
    return $_e31jlowsjducwv3m.findIndex(candidates, function (v) {
      return v === size;
    });
  };
  var getRawOrComputed = function (isRoot, rawStart) {
    var optStart = $_en9ft8xkjducwv5x.isElement(rawStart) ? Option.some(rawStart) : $_375a04x3jducwv4l.parent(rawStart);
    return optStart.map(function (start) {
      var inline = $_cxe5d211pjducwvqh.closest(start, function (elem) {
        return $_gbl0iz103jducwvgo.getRaw(elem, 'font-size');
      }, isRoot);
      return inline.getOrThunk(function () {
        return $_gbl0iz103jducwvgo.get(start, 'font-size');
      });
    }).getOr('');
  };
  var getSize = function (editor) {
    var node = editor.selection.getStart();
    var elem = $_dqo9uvxfjducwv5k.fromDom(node);
    var root = $_dqo9uvxfjducwv5k.fromDom(editor.getBody());
    var isRoot = function (e) {
      return $_3u3sm2x9jducwv54.eq(root, e);
    };
    var elemSize = getRawOrComputed(isRoot, elem);
    return $_e31jlowsjducwv3m.find(candidates, function (size) {
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
  var $_18lpdp11ojducwvq5 = {
    candidates: $_a3rnw0wjjducwv31.constant(candidates),
    get: get$7,
    apply: apply$1
  };

  var sizes = $_18lpdp11ojducwvq5.candidates();
  var makeSlider$1 = function (spec) {
    return $_e8feya11njducwvpy.sketch({
      onChange: spec.onChange,
      sizes: sizes,
      category: 'font',
      getInitialValue: spec.getInitialValue
    });
  };
  var makeItems$1 = function (spec) {
    return [
      $_4j6qzx113jducwvna.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-small-font ${prefix}-icon"></span>'),
      makeSlider$1(spec),
      $_4j6qzx113jducwvna.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-large-font ${prefix}-icon"></span>')
    ];
  };
  var sketch$4 = function (realm, editor) {
    var spec = {
      onChange: function (value) {
        $_18lpdp11ojducwvq5.apply(editor, value);
      },
      getInitialValue: function () {
        return $_18lpdp11ojducwvq5.get(editor);
      }
    };
    return $_bzi2qh11ljducwvpv.button(realm, 'font-size', function () {
      return makeItems$1(spec);
    });
  };
  var $_8ernn811mjducwvpw = {
    makeItems: makeItems$1,
    sketch: sketch$4
  };

  var record = function (spec) {
    var uid = $_e7rlwgxsjducwv6r.hasKey(spec, 'uid') ? spec.uid : $_803ea810xjducwvmd.generate('memento');
    var get = function (any) {
      return any.getSystem().getByUid(uid).getOrDie();
    };
    var getOpt = function (any) {
      return any.getSystem().getByUid(uid).fold(Option.none, Option.some);
    };
    var asSpec = function () {
      return $_5xeczzwyjducwv44.deepMerge(spec, { uid: uid });
    };
    return {
      get: get,
      getOpt: getOpt,
      asSpec: asSpec
    };
  };
  var $_b457j11rjducwvqw = { record: record };

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
  var $_3uga4m11ujducwvrg = {
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
  var $_5vdjr511vjducwvri = {
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
    var f = $_f8d9ygxbjducwv5b.getOrDie('Blob');
    return new f(parts, properties);
  }

  function FileReader () {
    var f = $_f8d9ygxbjducwv5b.getOrDie('FileReader');
    return new f();
  }

  function Uint8Array (arr) {
    var f = $_f8d9ygxbjducwv5b.getOrDie('Uint8Array');
    return new f(arr);
  }

  var requestAnimationFrame = function (callback) {
    var f = $_f8d9ygxbjducwv5b.getOrDie('requestAnimationFrame');
    f(callback);
  };
  var atob = function (base64) {
    var f = $_f8d9ygxbjducwv5b.getOrDie('atob');
    return f(base64);
  };
  var $_4r0te0120jducwvrp = {
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
    var byteCharacters = $_4r0te0120jducwvrp.atob(base64);
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
      canvas = $_3uga4m11ujducwvrg.create($_5vdjr511vjducwvri.getWidth(image), $_5vdjr511vjducwvri.getHeight(image));
      context = $_3uga4m11ujducwvrg.get2dContext(canvas);
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
  var $_b0fmt811tjducwvr5 = {
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
    return $_b0fmt811tjducwvr5.blobToImage(image);
  };
  var imageToBlob$1 = function (blob) {
    return $_b0fmt811tjducwvr5.imageToBlob(blob);
  };
  var blobToDataUri$1 = function (blob) {
    return $_b0fmt811tjducwvr5.blobToDataUri(blob);
  };
  var blobToBase64$1 = function (blob) {
    return $_b0fmt811tjducwvr5.blobToBase64(blob);
  };
  var dataUriToBlobSync$1 = function (uri) {
    return $_b0fmt811tjducwvr5.dataUriToBlobSync(uri);
  };
  var uriToBlob$1 = function (uri) {
    return Option.from($_b0fmt811tjducwvr5.uriToBlob(uri));
  };
  var $_g38ap511sjducwvr2 = {
    blobToImage: blobToImage$1,
    imageToBlob: imageToBlob$1,
    blobToDataUri: blobToDataUri$1,
    blobToBase64: blobToBase64$1,
    dataUriToBlobSync: dataUriToBlobSync$1,
    uriToBlob: uriToBlob$1
  };

  var addImage = function (editor, blob) {
    $_g38ap511sjducwvr2.blobToBase64(blob).then(function (base64) {
      editor.undoManager.transact(function () {
        var cache = editor.editorUpload.blobCache;
        var info = cache.create($_5tqzsa10rjducwvkr.generate('mceu'), blob, base64);
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
    var memPicker = $_b457j11rjducwvqw.record({
      dom: pickerDom,
      events: $_gd6bsky4jducwv8a.derive([
        $_gd6bsky4jducwv8a.cutter($_cp12t3wijducwv2w.click()),
        $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.change(), function (picker, simulatedEvent) {
          extractBlob(simulatedEvent).each(function (blob) {
            addImage(editor, blob);
          });
        })
      ])
    });
    return Button.sketch({
      dom: $_4j6qzx113jducwvna.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-image ${prefix}-icon"></span>'),
      components: [memPicker.asSpec()],
      action: function (button) {
        var picker = memPicker.get(button);
        picker.element().dom().click();
      }
    });
  };
  var $_177ggh11qjducwvqn = { sketch: sketch$5 };

  var get$8 = function (element) {
    return element.dom().textContent;
  };
  var set$5 = function (element, value) {
    element.dom().textContent = value;
  };
  var $_4sro3j123jducwvs8 = {
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
    var text = $_4sro3j123jducwvs8.get(link);
    var url = $_6yofxrjducwv6k.get(link, 'href');
    var title = $_6yofxrjducwv6k.get(link, 'title');
    var target = $_6yofxrjducwv6k.get(link, 'target');
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
    var prevHref = $_6yofxrjducwv6k.get(link, 'href');
    var prevText = $_4sro3j123jducwvs8.get(link);
    return prevHref === prevText;
  };
  var getTextToApply = function (link, url, info) {
    return info.text.filter(isNotEmpty).fold(function () {
      return wasSimple(link) ? Option.some(url) : Option.none();
    }, Option.some);
  };
  var unlinkIfRequired = function (editor, info) {
    var activeLink = info.link.bind($_a3rnw0wjjducwv31.identity);
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
      var activeLink = info.link.bind($_a3rnw0wjjducwv31.identity);
      activeLink.fold(function () {
        var text = info.text.filter(isNotEmpty).getOr(url);
        editor.insertContent(editor.dom.createHTML('a', attrs, editor.dom.encode(text)));
      }, function (link) {
        var text = getTextToApply(link, url, info);
        $_6yofxrjducwv6k.setAll(link, attrs);
        text.each(function (newText) {
          $_4sro3j123jducwvs8.set(link, newText);
        });
      });
    });
  };
  var query = function (editor) {
    var start = $_dqo9uvxfjducwv5k.fromDom(editor.selection.getStart());
    return $_aojb3mzxjducwvg5.closest(start, 'a');
  };
  var $_f14h24122jducwvs1 = {
    getInfo: getInfo,
    applyInfo: applyInfo,
    query: query
  };

  var platform$1 = $_f3swp0wkjducwv33.detect();
  var preserve$1 = function (f, editor) {
    var rng = editor.selection.getRng();
    f();
    editor.selection.setRng(rng);
  };
  var forAndroid = function (editor, f) {
    var wrapper = platform$1.os.isAndroid() ? preserve$1 : $_a3rnw0wjjducwv31.apply;
    wrapper(f, editor);
  };
  var $_2icgsp124jducwvs9 = { forAndroid: forAndroid };

  var events$6 = function (name, eventHandlers) {
    var events = $_gd6bsky4jducwv8a.derive(eventHandlers);
    return $_drwn8py2jducwv7n.create({
      fields: [$_csfrqy7jducwv8r.strict('enabled')],
      name: name,
      active: { events: $_a3rnw0wjjducwv31.constant(events) }
    });
  };
  var config = function (name, eventHandlers) {
    var me = events$6(name, eventHandlers);
    return {
      key: name,
      value: {
        config: {},
        me: me,
        configAsRaw: $_a3rnw0wjjducwv31.constant({}),
        initialConfig: {},
        state: $_drwn8py2jducwv7n.noState()
      }
    };
  };
  var $_b8wy59126jducwvss = {
    events: events$6,
    config: config
  };

  var getCurrent = function (component, composeConfig, composeState) {
    return composeConfig.find()(component);
  };
  var $_f1qn98128jducwvsy = { getCurrent: getCurrent };

  var ComposeSchema = [$_csfrqy7jducwv8r.strict('find')];

  var Composing = $_drwn8py2jducwv7n.create({
    fields: ComposeSchema,
    name: 'composing',
    apis: $_f1qn98128jducwvsy
  });

  var factory$1 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_5xeczzwyjducwv44.deepMerge({
        tag: 'div',
        attributes: { role: 'presentation' }
      }, detail.dom()),
      components: detail.components(),
      behaviours: $_4ee1oc10ojducwvk5.get(detail.containerBehaviours()),
      events: detail.events(),
      domModification: detail.domModification(),
      eventOrder: detail.eventOrder()
    };
  };
  var Container = $_ehwl8210pjducwvkb.single({
    name: 'Container',
    factory: factory$1,
    configFields: [
      $_csfrqy7jducwv8r.defaulted('components', []),
      $_4ee1oc10ojducwvk5.field('containerBehaviours', []),
      $_csfrqy7jducwv8r.defaulted('events', {}),
      $_csfrqy7jducwv8r.defaulted('domModification', {}),
      $_csfrqy7jducwv8r.defaulted('eventOrder', {})
    ]
  });

  var factory$2 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      behaviours: $_5xeczzwyjducwv44.deepMerge($_drwn8py2jducwv7n.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: detail.getInitialValue()()
          }
        }),
        Composing.config({ find: Option.some })
      ]), $_4ee1oc10ojducwvk5.get(detail.dataBehaviours())),
      events: $_gd6bsky4jducwv8a.derive([$_gd6bsky4jducwv8a.runOnAttached(function (component, simulatedEvent) {
          me.setValue(component, detail.getInitialValue()());
        })])
    };
  };
  var DataField = $_ehwl8210pjducwvkb.single({
    name: 'DataField',
    factory: factory$2,
    configFields: [
      $_csfrqy7jducwv8r.strict('uid'),
      $_csfrqy7jducwv8r.strict('dom'),
      $_csfrqy7jducwv8r.strict('getInitialValue'),
      $_4ee1oc10ojducwvk5.field('dataBehaviours', [
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
  var $_ye2mx12ejducwvtn = {
    set: set$6,
    get: get$9
  };

  var schema$8 = [
    $_csfrqy7jducwv8r.option('data'),
    $_csfrqy7jducwv8r.defaulted('inputAttributes', {}),
    $_csfrqy7jducwv8r.defaulted('inputStyles', {}),
    $_csfrqy7jducwv8r.defaulted('type', 'input'),
    $_csfrqy7jducwv8r.defaulted('tag', 'input'),
    $_csfrqy7jducwv8r.defaulted('inputClasses', []),
    $_5qmiobz6jducwvco.onHandler('onSetValue'),
    $_csfrqy7jducwv8r.defaulted('styles', {}),
    $_csfrqy7jducwv8r.option('placeholder'),
    $_csfrqy7jducwv8r.defaulted('eventOrder', {}),
    $_4ee1oc10ojducwvk5.field('inputBehaviours', [
      me,
      Focusing
    ]),
    $_csfrqy7jducwv8r.defaulted('selectOnFocus', true)
  ];
  var behaviours = function (detail) {
    return $_5xeczzwyjducwv44.deepMerge($_drwn8py2jducwv7n.derive([
      me.config({
        store: {
          mode: 'manual',
          initialValue: detail.data().getOr(undefined),
          getValue: function (input) {
            return $_ye2mx12ejducwvtn.get(input.element());
          },
          setValue: function (input, data) {
            var current = $_ye2mx12ejducwvtn.get(input.element());
            if (current !== data) {
              $_ye2mx12ejducwvtn.set(input.element(), data);
            }
          }
        },
        onSetValue: detail.onSetValue()
      }),
      Focusing.config({
        onFocus: detail.selectOnFocus() === false ? $_a3rnw0wjjducwv31.noop : function (component) {
          var input = component.element();
          var value = $_ye2mx12ejducwvtn.get(input);
          input.dom().setSelectionRange(0, value.length);
        }
      })
    ]), $_4ee1oc10ojducwvk5.get(detail.inputBehaviours()));
  };
  var dom$2 = function (detail) {
    return {
      tag: detail.tag(),
      attributes: $_5xeczzwyjducwv44.deepMerge($_e7rlwgxsjducwv6r.wrapAll([{
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
  var $_cjrsao12djducwvte = {
    schema: $_a3rnw0wjjducwv31.constant(schema$8),
    behaviours: behaviours,
    dom: dom$2
  };

  var factory$3 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_cjrsao12djducwvte.dom(detail),
      components: [],
      behaviours: $_cjrsao12djducwvte.behaviours(detail),
      eventOrder: detail.eventOrder()
    };
  };
  var Input = $_ehwl8210pjducwvkb.single({
    name: 'Input',
    configFields: $_cjrsao12djducwvte.schema(),
    factory: factory$3
  });

  var exhibit$3 = function (base, tabConfig) {
    return $_5ldw5hyhjducwvac.nu({
      attributes: $_e7rlwgxsjducwv6r.wrapAll([{
          key: tabConfig.tabAttr(),
          value: 'true'
        }])
    });
  };
  var $_fg553f12gjducwvtp = { exhibit: exhibit$3 };

  var TabstopSchema = [$_csfrqy7jducwv8r.defaulted('tabAttr', 'data-alloy-tabstop')];

  var Tabstopping = $_drwn8py2jducwv7n.create({
    fields: TabstopSchema,
    name: 'tabstopping',
    active: $_fg553f12gjducwvtp
  });

  var clearInputBehaviour = 'input-clearing';
  var field$2 = function (name, placeholder) {
    var inputSpec = $_b457j11rjducwvqw.record(Input.sketch({
      placeholder: placeholder,
      onSetValue: function (input, data) {
        $_51mp15wgjducwv2k.emit(input, $_cp12t3wijducwv2w.input());
      },
      inputBehaviours: $_drwn8py2jducwv7n.derive([
        Composing.config({ find: Option.some }),
        Tabstopping.config({}),
        Keying.config({ mode: 'execution' })
      ]),
      selectOnFocus: false
    }));
    var buttonSpec = $_b457j11rjducwvqw.record(Button.sketch({
      dom: $_4j6qzx113jducwvna.dom('<button class="${prefix}-input-container-x ${prefix}-icon-cancel-circle ${prefix}-icon"></button>'),
      action: function (button) {
        var input = inputSpec.get(button);
        me.setValue(input, '');
      }
    }));
    return {
      name: name,
      spec: Container.sketch({
        dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-input-container"></div>'),
        components: [
          inputSpec.asSpec(),
          buttonSpec.asSpec()
        ],
        containerBehaviours: $_drwn8py2jducwv7n.derive([
          Toggling.config({ toggleClass: $_513f6yzejducwvdz.resolve('input-container-empty') }),
          Composing.config({
            find: function (comp) {
              return Option.some(inputSpec.get(comp));
            }
          }),
          $_b8wy59126jducwvss.config(clearInputBehaviour, [$_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.input(), function (iContainer) {
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
  var $_dk70fo125jducwvsc = {
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
    return $_e31jlowsjducwv3m.contains(nativeDisabled, $_en9ft8xkjducwv5x.name(component.element()));
  };
  var nativeIsDisabled = function (component) {
    return $_6yofxrjducwv6k.has(component.element(), 'disabled');
  };
  var nativeDisable = function (component) {
    $_6yofxrjducwv6k.set(component.element(), 'disabled', 'disabled');
  };
  var nativeEnable = function (component) {
    $_6yofxrjducwv6k.remove(component.element(), 'disabled');
  };
  var ariaIsDisabled = function (component) {
    return $_6yofxrjducwv6k.get(component.element(), 'aria-disabled') === 'true';
  };
  var ariaDisable = function (component) {
    $_6yofxrjducwv6k.set(component.element(), 'aria-disabled', 'true');
  };
  var ariaEnable = function (component) {
    $_6yofxrjducwv6k.set(component.element(), 'aria-disabled', 'false');
  };
  var disable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_6jbzpfynjducwvb2.add(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeDisable : ariaDisable;
    f(component);
  };
  var enable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_6jbzpfynjducwvb2.remove(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeEnable : ariaEnable;
    f(component);
  };
  var isDisabled = function (component) {
    return hasNative(component) ? nativeIsDisabled(component) : ariaIsDisabled(component);
  };
  var $_cui7o312ljducwvus = {
    enable: enable,
    disable: disable,
    isDisabled: isDisabled,
    onLoad: onLoad$5
  };

  var exhibit$4 = function (base, disableConfig, disableState) {
    return $_5ldw5hyhjducwvac.nu({ classes: disableConfig.disabled() ? disableConfig.disableClass().map($_e31jlowsjducwv3m.pure).getOr([]) : [] });
  };
  var events$7 = function (disableConfig, disableState) {
    return $_gd6bsky4jducwv8a.derive([
      $_gd6bsky4jducwv8a.abort($_c92nqswhjducwv2r.execute(), function (component, simulatedEvent) {
        return $_cui7o312ljducwvus.isDisabled(component, disableConfig, disableState);
      }),
      $_6i94u4y3jducwv7v.loadEvent(disableConfig, disableState, $_cui7o312ljducwvus.onLoad)
    ]);
  };
  var $_dimz4n12kjducwvup = {
    exhibit: exhibit$4,
    events: events$7
  };

  var DisableSchema = [
    $_csfrqy7jducwv8r.defaulted('disabled', false),
    $_csfrqy7jducwv8r.option('disableClass')
  ];

  var Disabling = $_drwn8py2jducwv7n.create({
    fields: DisableSchema,
    name: 'disabling',
    active: $_dimz4n12kjducwvup,
    apis: $_cui7o312ljducwvus
  });

  var owner$1 = 'form';
  var schema$9 = [$_4ee1oc10ojducwvk5.field('formBehaviours', [me])];
  var getPartName = function (name) {
    return '<alloy.field.' + name + '>';
  };
  var sketch$6 = function (fSpec) {
    var parts = function () {
      var record = [];
      var field = function (name, config) {
        record.push(name);
        return $_efrbru10tjducwvky.generateOne(owner$1, getPartName(name), config);
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
    var fieldParts = $_e31jlowsjducwv3m.map(partNames, function (n) {
      return $_9mzgbl10vjducwvli.required({
        name: n,
        pname: getPartName(n)
      });
    });
    return $_caelpo10sjducwvks.composite(owner$1, schema$9, fieldParts, make, spec);
  };
  var make = function (detail, components, spec) {
    return $_5xeczzwyjducwv44.deepMerge({
      'debug.sketcher': { 'Form': spec },
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_5xeczzwyjducwv44.deepMerge($_drwn8py2jducwv7n.derive([me.config({
          store: {
            mode: 'manual',
            getValue: function (form) {
              var optPs = $_efrbru10tjducwvky.getAllParts(form, detail);
              return $_2vh9dzx0jducwv47.map(optPs, function (optPThunk, pName) {
                return optPThunk().bind(Composing.getCurrent).map(me.getValue);
              });
            },
            setValue: function (form, values) {
              $_2vh9dzx0jducwv47.each(values, function (newValue, key) {
                $_efrbru10tjducwvky.getPart(form, detail, key).each(function (wrapper) {
                  Composing.getCurrent(wrapper).each(function (field) {
                    me.setValue(field, newValue);
                  });
                });
              });
            }
          }
        })]), $_4ee1oc10ojducwvk5.get(detail.formBehaviours())),
      apis: {
        getField: function (form, key) {
          return $_efrbru10tjducwvky.getPart(form, detail, key).bind(Composing.getCurrent);
        }
      }
    });
  };
  var $_152qbi12njducwvv3 = {
    getField: $_ky4yd10qjducwvkl.makeApi(function (apis, component, key) {
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
  var $_dio8jw12ojducwvva = {
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
  var $_9pssoi12pjducwvvd = {
    init: init$3,
    move: move,
    complete: complete
  };

  var sketch$7 = function (rawSpec) {
    var navigateEvent = 'navigateEvent';
    var wrapperAdhocEvents = 'serializer-wrapper-events';
    var formAdhocEvents = 'form-events';
    var schema = $_1cyy8vyejducwva0.objOf([
      $_csfrqy7jducwv8r.strict('fields'),
      $_csfrqy7jducwv8r.defaulted('maxFieldIndex', rawSpec.fields.length - 1),
      $_csfrqy7jducwv8r.strict('onExecute'),
      $_csfrqy7jducwv8r.strict('getInitialValue'),
      $_csfrqy7jducwv8r.state('state', function () {
        return {
          dialogSwipeState: $_dio8jw12ojducwvva.value(),
          currentScreen: Cell(0)
        };
      })
    ]);
    var spec = $_1cyy8vyejducwva0.asRawOrDie('SerialisedDialog', schema, rawSpec);
    var navigationButton = function (direction, directionName, enabled) {
      return Button.sketch({
        dom: $_4j6qzx113jducwvna.dom('<span class="${prefix}-icon-' + directionName + ' ${prefix}-icon"></span>'),
        action: function (button) {
          $_51mp15wgjducwv2k.emitWith(button, navigateEvent, { direction: direction });
        },
        buttonBehaviours: $_drwn8py2jducwv7n.derive([Disabling.config({
            disableClass: $_513f6yzejducwvdz.resolve('toolbar-navigation-disabled'),
            disabled: !enabled
          })])
      });
    };
    var reposition = function (dialog, message) {
      $_aojb3mzxjducwvg5.descendant(dialog.element(), '.' + $_513f6yzejducwvdz.resolve('serialised-dialog-chain')).each(function (parent) {
        $_gbl0iz103jducwvgo.set(parent, 'left', -spec.state.currentScreen.get() * message.width + 'px');
      });
    };
    var navigate = function (dialog, direction) {
      var screens = $_7nc35uzvjducwvg0.descendants(dialog.element(), '.' + $_513f6yzejducwvdz.resolve('serialised-dialog-screen'));
      $_aojb3mzxjducwvg5.descendant(dialog.element(), '.' + $_513f6yzejducwvdz.resolve('serialised-dialog-chain')).each(function (parent) {
        if (spec.state.currentScreen.get() + direction >= 0 && spec.state.currentScreen.get() + direction < screens.length) {
          $_gbl0iz103jducwvgo.getRaw(parent, 'left').each(function (left) {
            var currentLeft = parseInt(left, 10);
            var w = $_vvvkn11kjducwvpt.get(screens[0]);
            $_gbl0iz103jducwvgo.set(parent, 'left', currentLeft - direction * w + 'px');
          });
          spec.state.currentScreen.set(spec.state.currentScreen.get() + direction);
        }
      });
    };
    var focusInput = function (dialog) {
      var inputs = $_7nc35uzvjducwvg0.descendants(dialog.element(), 'input');
      var optInput = Option.from(inputs[spec.state.currentScreen.get()]);
      optInput.each(function (input) {
        dialog.getSystem().getByDom(input).each(function (inputComp) {
          $_51mp15wgjducwv2k.dispatchFocus(dialog, inputComp.element());
        });
      });
      var dotitems = memDots.get(dialog);
      Highlighting.highlightAt(dotitems, spec.state.currentScreen.get());
    };
    var resetState = function () {
      spec.state.currentScreen.set(0);
      spec.state.dialogSwipeState.clear();
    };
    var memForm = $_b457j11rjducwvqw.record($_152qbi12njducwvv3.sketch(function (parts) {
      return {
        dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-serialised-dialog"></div>'),
        components: [Container.sketch({
            dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-serialised-dialog-chain" style="left: 0px; position: absolute;"></div>'),
            components: $_e31jlowsjducwv3m.map(spec.fields, function (field, i) {
              return i <= spec.maxFieldIndex ? Container.sketch({
                dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-serialised-dialog-screen"></div>'),
                components: $_e31jlowsjducwv3m.flatten([
                  [navigationButton(-1, 'previous', i > 0)],
                  [parts.field(field.name, field.spec)],
                  [navigationButton(+1, 'next', i < spec.maxFieldIndex)]
                ])
              }) : parts.field(field.name, field.spec);
            })
          })],
        formBehaviours: $_drwn8py2jducwv7n.derive([
          $_6h7r9izdjducwvdv.orientation(function (dialog, message) {
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
          $_b8wy59126jducwvss.config(formAdhocEvents, [
            $_gd6bsky4jducwv8a.runOnAttached(function (dialog, simulatedEvent) {
              resetState();
              var dotitems = memDots.get(dialog);
              Highlighting.highlightFirst(dotitems);
              spec.getInitialValue(dialog).each(function (v) {
                me.setValue(dialog, v);
              });
            }),
            $_gd6bsky4jducwv8a.runOnExecute(spec.onExecute),
            $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.transitionend(), function (dialog, simulatedEvent) {
              if (simulatedEvent.event().raw().propertyName === 'left') {
                focusInput(dialog);
              }
            }),
            $_gd6bsky4jducwv8a.run(navigateEvent, function (dialog, simulatedEvent) {
              var direction = simulatedEvent.event().direction();
              navigate(dialog, direction);
            })
          ])
        ])
      };
    }));
    var memDots = $_b457j11rjducwvqw.record({
      dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-dot-container"></div>'),
      behaviours: $_drwn8py2jducwv7n.derive([Highlighting.config({
          highlightClass: $_513f6yzejducwvdz.resolve('dot-active'),
          itemClass: $_513f6yzejducwvdz.resolve('dot-item')
        })]),
      components: $_e31jlowsjducwv3m.bind(spec.fields, function (_f, i) {
        return i <= spec.maxFieldIndex ? [$_4j6qzx113jducwvna.spec('<div class="${prefix}-dot-item ${prefix}-icon-full-dot ${prefix}-icon"></div>')] : [];
      })
    });
    return {
      dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-serializer-wrapper"></div>'),
      components: [
        memForm.asSpec(),
        memDots.asSpec()
      ],
      behaviours: $_drwn8py2jducwv7n.derive([
        Keying.config({
          mode: 'special',
          focusIn: function (wrapper) {
            var form = memForm.get(wrapper);
            Keying.focusIn(form);
          }
        }),
        $_b8wy59126jducwvss.config(wrapperAdhocEvents, [
          $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.touchstart(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.set($_9pssoi12pjducwvvd.init(simulatedEvent.event().raw().touches[0].clientX));
          }),
          $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.touchmove(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.on(function (state) {
              simulatedEvent.event().prevent();
              spec.state.dialogSwipeState.set($_9pssoi12pjducwvvd.move(state, simulatedEvent.event().raw().touches[0].clientX));
            });
          }),
          $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.touchend(), function (wrapper) {
            spec.state.dialogSwipeState.on(function (state) {
              var dialog = memForm.get(wrapper);
              var direction = -1 * $_9pssoi12pjducwvvd.complete(state);
              navigate(dialog, direction);
            });
          })
        ])
      ])
    };
  };
  var $_e3580c12ijducwvtv = { sketch: sketch$7 };

  var getGroups = $_89w2qewljducwv35.cached(function (realm, editor) {
    return [{
        label: 'the link group',
        items: [$_e3580c12ijducwvtv.sketch({
            fields: [
              $_dk70fo125jducwvsc.field('url', 'Type or paste URL'),
              $_dk70fo125jducwvsc.field('text', 'Link text'),
              $_dk70fo125jducwvsc.field('title', 'Link title'),
              $_dk70fo125jducwvsc.field('target', 'Link target'),
              $_dk70fo125jducwvsc.hidden('link')
            ],
            maxFieldIndex: [
              'url',
              'text',
              'title',
              'target'
            ].length - 1,
            getInitialValue: function () {
              return Option.some($_f14h24122jducwvs1.getInfo(editor));
            },
            onExecute: function (dialog) {
              var info = me.getValue(dialog);
              $_f14h24122jducwvs1.applyInfo(editor, info);
              realm.restoreToolbar();
              editor.focus();
            }
          })]
      }];
  });
  var sketch$8 = function (realm, editor) {
    return $_1sb0dgzfjducwve1.forToolbarStateAction(editor, 'link', 'link', function () {
      var groups = getGroups(realm, editor);
      realm.setContextToolbar(groups);
      $_2icgsp124jducwvs9.forAndroid(editor, function () {
        realm.focusToolbar();
      });
      $_f14h24122jducwvs1.query(editor).each(function (link) {
        editor.selection.select(link.dom());
      });
    });
  };
  var $_dt84hw121jducwvrq = { sketch: sketch$8 };

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
    var schema = $_e31jlowsjducwv3m.map(all, function (a) {
      return $_csfrqy7jducwv8r.field(a.name(), a.name(), $_2jq6gty8jducwv8w.asOption(), $_1cyy8vyejducwva0.objOf([
        $_csfrqy7jducwv8r.strict('config'),
        $_csfrqy7jducwv8r.defaulted('state', $_8u70ojyjjducwvaq)
      ]));
    });
    var validated = $_1cyy8vyejducwva0.asStruct('component.behaviours', $_1cyy8vyejducwva0.objOf(schema), spec.behaviours).fold(function (errInfo) {
      throw new Error($_1cyy8vyejducwva0.formatError(errInfo) + '\nComplete spec:\n' + $_dl4ljnydjducwv9x.stringify(spec, null, 2));
    }, $_a3rnw0wjjducwv31.identity);
    return {
      list: all,
      data: $_2vh9dzx0jducwv47.map(validated, function (blobOptionThunk) {
        var blobOption = blobOptionThunk();
        return $_a3rnw0wjjducwv31.constant(blobOption.map(function (blob) {
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
  var $_b8hpje12wjducwvxg = {
    generateFrom: generateFrom,
    getBehaviours: getBehaviours,
    getData: getData
  };

  var getBehaviours$1 = function (spec) {
    var behaviours = $_e7rlwgxsjducwv6r.readOptFrom(spec, 'behaviours').getOr({});
    var keys = $_e31jlowsjducwv3m.filter($_2vh9dzx0jducwv47.keys(behaviours), function (k) {
      return behaviours[k] !== undefined;
    });
    return $_e31jlowsjducwv3m.map(keys, function (k) {
      return spec.behaviours[k].me;
    });
  };
  var generateFrom$1 = function (spec, all) {
    return $_b8hpje12wjducwvxg.generateFrom(spec, all);
  };
  var generate$4 = function (spec) {
    var all = getBehaviours$1(spec);
    return generateFrom$1(spec, all);
  };
  var $_8jsqdc12vjducwvxa = {
    generate: generate$4,
    generateFrom: generateFrom$1
  };

  var ComponentApi = $_6m5f7tyljducwvat.exactly([
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

  var SystemApi = $_6m5f7tyljducwvat.exactly([
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
        throw new Error('The component must be in a context to send: ' + event + '\n' + $_9uv2jrxmjducwv68.element(getComp().element()) + ' is not in context.');
      };
    };
    return SystemApi({
      debugInfo: $_a3rnw0wjjducwv31.constant('fake'),
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
    $_2vh9dzx0jducwv47.each(data, function (detail, key) {
      $_2vh9dzx0jducwv47.each(detail, function (value, indexKey) {
        var chain = $_e7rlwgxsjducwv6r.readOr(indexKey, [])(r);
        r[indexKey] = chain.concat([tuple(key, value)]);
      });
    });
    return r;
  };
  var $_bo4r0b131jducwvye = { byInnerKey: byInnerKey };

  var behaviourDom = function (name, modification) {
    return {
      name: $_a3rnw0wjjducwv31.constant(name),
      modification: modification
    };
  };
  var concat = function (chain, aspect) {
    var values = $_e31jlowsjducwv3m.bind(chain, function (c) {
      return c.modification().getOr([]);
    });
    return Result.value($_e7rlwgxsjducwv6r.wrap(aspect, values));
  };
  var onlyOne = function (chain, aspect, order) {
    if (chain.length > 1)
      return Result.error('Multiple behaviours have tried to change DOM "' + aspect + '". The guilty behaviours are: ' + $_dl4ljnydjducwv9x.stringify($_e31jlowsjducwv3m.map(chain, function (b) {
        return b.name();
      })) + '. At this stage, this ' + 'is not supported. Future releases might provide strategies for resolving this.');
    else if (chain.length === 0)
      return Result.value({});
    else
      return Result.value(chain[0].modification().fold(function () {
        return {};
      }, function (m) {
        return $_e7rlwgxsjducwv6r.wrap(aspect, m);
      }));
  };
  var duplicate = function (aspect, k, obj, behaviours) {
    return Result.error('Mulitple behaviours have tried to change the _' + k + '_ "' + aspect + '"' + '. The guilty behaviours are: ' + $_dl4ljnydjducwv9x.stringify($_e31jlowsjducwv3m.bind(behaviours, function (b) {
      return b.modification().getOr({})[k] !== undefined ? [b.name()] : [];
    }), null, 2) + '. This is not currently supported.');
  };
  var safeMerge = function (chain, aspect) {
    var y = $_e31jlowsjducwv3m.foldl(chain, function (acc, c) {
      var obj = c.modification().getOr({});
      return acc.bind(function (accRest) {
        var parts = $_2vh9dzx0jducwv47.mapToArray(obj, function (v, k) {
          return accRest[k] !== undefined ? duplicate(aspect, k, obj, chain) : Result.value($_e7rlwgxsjducwv6r.wrap(k, v));
        });
        return $_e7rlwgxsjducwv6r.consolidate(parts, accRest);
      });
    }, Result.value({}));
    return y.map(function (yValue) {
      return $_e7rlwgxsjducwv6r.wrap(aspect, yValue);
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
    var behaviourDoms = $_5xeczzwyjducwv44.deepMerge({}, baseMod);
    $_e31jlowsjducwv3m.each(behaviours, function (behaviour) {
      behaviourDoms[behaviour.name()] = behaviour.exhibit(info, base);
    });
    var byAspect = $_bo4r0b131jducwvye.byInnerKey(behaviourDoms, behaviourDom);
    var usedAspect = $_2vh9dzx0jducwv47.map(byAspect, function (values, aspect) {
      return $_e31jlowsjducwv3m.bind(values, function (value) {
        return value.modification().fold(function () {
          return [];
        }, function (v) {
          return [value];
        });
      });
    });
    var modifications = $_2vh9dzx0jducwv47.mapToArray(usedAspect, function (values, aspect) {
      return $_e7rlwgxsjducwv6r.readOptFrom(mergeTypes, aspect).fold(function () {
        return Result.error('Unknown field type: ' + aspect);
      }, function (merger) {
        return merger(values, aspect);
      });
    });
    var consolidated = $_e7rlwgxsjducwv6r.consolidate(modifications, {});
    return consolidated.map($_5ldw5hyhjducwvac.nu);
  };
  var $_8kjb39130jducwvxz = { combine: combine$1 };

  var sortKeys = function (label, keyName, array, order) {
    var sliced = array.slice(0);
    try {
      var sorted = sliced.sort(function (a, b) {
        var aKey = a[keyName]();
        var bKey = b[keyName]();
        var aIndex = order.indexOf(aKey);
        var bIndex = order.indexOf(bKey);
        if (aIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + aKey + '.\nOrder specified: ' + $_dl4ljnydjducwv9x.stringify(order, null, 2));
        if (bIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + bKey + '.\nOrder specified: ' + $_dl4ljnydjducwv9x.stringify(order, null, 2));
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
  var $_45qxae133jducwvyw = { sortKeys: sortKeys };

  var nu$7 = function (handler, purpose) {
    return {
      handler: handler,
      purpose: $_a3rnw0wjjducwv31.constant(purpose)
    };
  };
  var curryArgs = function (descHandler, extraArgs) {
    return {
      handler: $_a3rnw0wjjducwv31.curry.apply(undefined, [descHandler.handler].concat(extraArgs)),
      purpose: descHandler.purpose
    };
  };
  var getHandler = function (descHandler) {
    return descHandler.handler;
  };
  var $_3eyavb134jducwvz0 = {
    nu: nu$7,
    curryArgs: curryArgs,
    getHandler: getHandler
  };

  var behaviourTuple = function (name, handler) {
    return {
      name: $_a3rnw0wjjducwv31.constant(name),
      handler: $_a3rnw0wjjducwv31.constant(handler)
    };
  };
  var nameToHandlers = function (behaviours, info) {
    var r = {};
    $_e31jlowsjducwv3m.each(behaviours, function (behaviour) {
      r[behaviour.name()] = behaviour.handlers(info);
    });
    return r;
  };
  var groupByEvents = function (info, behaviours, base) {
    var behaviourEvents = $_5xeczzwyjducwv44.deepMerge(base, nameToHandlers(behaviours, info));
    return $_bo4r0b131jducwvye.byInnerKey(behaviourEvents, behaviourTuple);
  };
  var combine$2 = function (info, eventOrder, behaviours, base) {
    var byEventName = groupByEvents(info, behaviours, base);
    return combineGroups(byEventName, eventOrder);
  };
  var assemble = function (rawHandler) {
    var handler = $_65hzn4y6jducwv8h.read(rawHandler);
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
    return Result.error(['The event (' + eventName + ') has more than one behaviour that listens to it.\nWhen this occurs, you must ' + 'specify an event ordering for the behaviours in your spec (e.g. [ "listing", "toggling" ]).\nThe behaviours that ' + 'can trigger it are: ' + $_dl4ljnydjducwv9x.stringify($_e31jlowsjducwv3m.map(tuples, function (c) {
        return c.name();
      }), null, 2)]);
  };
  var fuse$1 = function (tuples, eventOrder, eventName) {
    var order = eventOrder[eventName];
    if (!order)
      return missingOrderError(eventName, tuples);
    else
      return $_45qxae133jducwvyw.sortKeys('Event: ' + eventName, 'name', tuples, order).map(function (sortedTuples) {
        var handlers = $_e31jlowsjducwv3m.map(sortedTuples, function (tuple) {
          return tuple.handler();
        });
        return $_65hzn4y6jducwv8h.fuse(handlers);
      });
  };
  var combineGroups = function (byEventName, eventOrder) {
    var r = $_2vh9dzx0jducwv47.mapToArray(byEventName, function (tuples, eventName) {
      var combined = tuples.length === 1 ? Result.value(tuples[0].handler()) : fuse$1(tuples, eventOrder, eventName);
      return combined.map(function (handler) {
        var assembled = assemble(handler);
        var purpose = tuples.length > 1 ? $_e31jlowsjducwv3m.filter(eventOrder, function (o) {
          return $_e31jlowsjducwv3m.contains(tuples, function (t) {
            return t.name() === o;
          });
        }).join(' > ') : tuples[0].name();
        return $_e7rlwgxsjducwv6r.wrap(eventName, $_3eyavb134jducwvz0.nu(assembled, purpose));
      });
    });
    return $_e7rlwgxsjducwv6r.consolidate(r, {});
  };
  var $_efvpd9132jducwvyj = { combine: combine$2 };

  var toInfo = function (spec) {
    return $_1cyy8vyejducwva0.asStruct('custom.definition', $_1cyy8vyejducwva0.objOfOnly([
      $_csfrqy7jducwv8r.field('dom', 'dom', $_2jq6gty8jducwv8w.strict(), $_1cyy8vyejducwva0.objOfOnly([
        $_csfrqy7jducwv8r.strict('tag'),
        $_csfrqy7jducwv8r.defaulted('styles', {}),
        $_csfrqy7jducwv8r.defaulted('classes', []),
        $_csfrqy7jducwv8r.defaulted('attributes', {}),
        $_csfrqy7jducwv8r.option('value'),
        $_csfrqy7jducwv8r.option('innerHtml')
      ])),
      $_csfrqy7jducwv8r.strict('components'),
      $_csfrqy7jducwv8r.strict('uid'),
      $_csfrqy7jducwv8r.defaulted('events', {}),
      $_csfrqy7jducwv8r.defaulted('apis', $_a3rnw0wjjducwv31.constant({})),
      $_csfrqy7jducwv8r.field('eventOrder', 'eventOrder', $_2jq6gty8jducwv8w.mergeWith({
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
      }), $_1cyy8vyejducwva0.anyValue()),
      $_csfrqy7jducwv8r.option('domModification'),
      $_5qmiobz6jducwvco.snapshot('originalSpec'),
      $_csfrqy7jducwv8r.defaulted('debug.sketcher', 'unknown')
    ]), spec);
  };
  var getUid = function (info) {
    return $_e7rlwgxsjducwv6r.wrap($_9x9pdh10yjducwvml.idAttr(), info.uid());
  };
  var toDefinition = function (info) {
    var base = {
      tag: info.dom().tag(),
      classes: info.dom().classes(),
      attributes: $_5xeczzwyjducwv44.deepMerge(getUid(info), info.dom().attributes()),
      styles: info.dom().styles(),
      domChildren: $_e31jlowsjducwv3m.map(info.components(), function (comp) {
        return comp.element();
      })
    };
    return $_7nj8bfyijducwval.nu($_5xeczzwyjducwv44.deepMerge(base, info.dom().innerHtml().map(function (h) {
      return $_e7rlwgxsjducwv6r.wrap('innerHtml', h);
    }).getOr({}), info.dom().value().map(function (h) {
      return $_e7rlwgxsjducwv6r.wrap('value', h);
    }).getOr({})));
  };
  var toModification = function (info) {
    return info.domModification().fold(function () {
      return $_5ldw5hyhjducwvac.nu({});
    }, $_5ldw5hyhjducwvac.nu);
  };
  var toApis = function (info) {
    return info.apis();
  };
  var toEvents = function (info) {
    return info.events();
  };
  var $_cd0upl135jducwvz3 = {
    toInfo: toInfo,
    toDefinition: toDefinition,
    toModification: toModification,
    toApis: toApis,
    toEvents: toEvents
  };

  var add$3 = function (element, classes) {
    $_e31jlowsjducwv3m.each(classes, function (x) {
      $_6jbzpfynjducwvb2.add(element, x);
    });
  };
  var remove$6 = function (element, classes) {
    $_e31jlowsjducwv3m.each(classes, function (x) {
      $_6jbzpfynjducwvb2.remove(element, x);
    });
  };
  var toggle$3 = function (element, classes) {
    $_e31jlowsjducwv3m.each(classes, function (x) {
      $_6jbzpfynjducwvb2.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_e31jlowsjducwv3m.forall(classes, function (clazz) {
      return $_6jbzpfynjducwvb2.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_e31jlowsjducwv3m.exists(classes, function (clazz) {
      return $_6jbzpfynjducwvb2.has(element, clazz);
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
    return $_g7dzimypjducwvb4.supports(element) ? getNative(element) : $_g7dzimypjducwvb4.get(element);
  };
  var $_g0t8c9137jducwvzt = {
    add: add$3,
    remove: remove$6,
    toggle: toggle$3,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$10
  };

  var getChildren = function (definition) {
    if (definition.domChildren().isSome() && definition.defChildren().isSome()) {
      throw new Error('Cannot specify children and child specs! Must be one or the other.\nDef: ' + $_7nj8bfyijducwval.defToStr(definition));
    } else {
      return definition.domChildren().fold(function () {
        var defChildren = definition.defChildren().getOr([]);
        return $_e31jlowsjducwv3m.map(defChildren, renderDef);
      }, function (domChildren) {
        return domChildren;
      });
    }
  };
  var renderToDom = function (definition) {
    var subject = $_dqo9uvxfjducwv5k.fromTag(definition.tag());
    $_6yofxrjducwv6k.setAll(subject, definition.attributes().getOr({}));
    $_g0t8c9137jducwvzt.add(subject, definition.classes().getOr([]));
    $_gbl0iz103jducwvgo.setAll(subject, definition.styles().getOr({}));
    $_7rrdsexojducwv6c.set(subject, definition.innerHtml().getOr(''));
    var children = getChildren(definition);
    $_f9ml5kxijducwv5s.append(subject, children);
    definition.value().each(function (value) {
      $_ye2mx12ejducwvtn.set(subject, value);
    });
    return subject;
  };
  var renderDef = function (spec) {
    var definition = $_7nj8bfyijducwval.nu(spec);
    return renderToDom(definition);
  };
  var $_724at1136jducwvze = { renderToDom: renderToDom };

  var build = function (spec) {
    var getMe = function () {
      return me;
    };
    var systemApi = Cell(NoContextApi(getMe));
    var info = $_1cyy8vyejducwva0.getOrDie($_cd0upl135jducwvz3.toInfo($_5xeczzwyjducwv44.deepMerge(spec, { behaviours: undefined })));
    var bBlob = $_8jsqdc12vjducwvxa.generate(spec);
    var bList = $_b8hpje12wjducwvxg.getBehaviours(bBlob);
    var bData = $_b8hpje12wjducwvxg.getData(bBlob);
    var definition = $_cd0upl135jducwvz3.toDefinition(info);
    var baseModification = { 'alloy.base.modification': $_cd0upl135jducwvz3.toModification(info) };
    var modification = $_8kjb39130jducwvxz.combine(bData, baseModification, bList, definition).getOrDie();
    var modDefinition = $_5ldw5hyhjducwvac.merge(definition, modification);
    var item = $_724at1136jducwvze.renderToDom(modDefinition);
    var baseEvents = { 'alloy.base.behaviour': $_cd0upl135jducwvz3.toEvents(info) };
    var events = $_efvpd9132jducwvyj.combine(bData, info.eventOrder(), bList, baseEvents).getOrDie();
    var subcomponents = Cell(info.components());
    var connect = function (newApi) {
      systemApi.set(newApi);
    };
    var disconnect = function () {
      systemApi.set(NoContextApi(getMe));
    };
    var syncComponents = function () {
      var children = $_375a04x3jducwv4l.children(item);
      var subs = $_e31jlowsjducwv3m.bind(children, function (child) {
        return systemApi.get().getByDom(child).fold(function () {
          return [];
        }, function (c) {
          return [c];
        });
      });
      subcomponents.set(subs);
    };
    var config = function (behaviour) {
      if (behaviour === $_ky4yd10qjducwvkl.apiConfig())
        return info.apis();
      var b = bData;
      var f = $_9yomlywzjducwv46.isFunction(b[behaviour.name()]) ? b[behaviour.name()] : function () {
        throw new Error('Could not find ' + behaviour.name() + ' in ' + $_dl4ljnydjducwv9x.stringify(spec, null, 2));
      };
      return f();
    };
    var hasConfigured = function (behaviour) {
      return $_9yomlywzjducwv46.isFunction(bData[behaviour.name()]);
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
      spec: $_a3rnw0wjjducwv31.constant(spec),
      readState: readState,
      connect: connect,
      disconnect: disconnect,
      element: $_a3rnw0wjjducwv31.constant(item),
      syncComponents: syncComponents,
      components: subcomponents.get,
      events: $_a3rnw0wjjducwv31.constant(events)
    });
    return me;
  };
  var $_4t4uzo12ujducwvww = { build: build };

  var isRecursive = function (component, originator, target) {
    return $_3u3sm2x9jducwv54.eq(originator, component.element()) && !$_3u3sm2x9jducwv54.eq(originator, target);
  };
  var $_5dd1g8138jducwvzx = {
    events: $_gd6bsky4jducwv8a.derive([$_gd6bsky4jducwv8a.can($_c92nqswhjducwv2r.focus(), function (component, simulatedEvent) {
        var originator = simulatedEvent.event().originator();
        var target = simulatedEvent.event().target();
        if (isRecursive(component, originator, target)) {
          console.warn($_c92nqswhjducwv2r.focus() + ' did not get interpreted by the desired target. ' + '\nOriginator: ' + $_9uv2jrxmjducwv68.element(originator) + '\nTarget: ' + $_9uv2jrxmjducwv68.element(target) + '\nCheck the ' + $_c92nqswhjducwv2r.focus() + ' event handlers');
          return false;
        } else {
          return true;
        }
      })])
  };

  var make$1 = function (spec) {
    return spec;
  };
  var $_f0jajj139jducww00 = { make: make$1 };

  var buildSubcomponents = function (spec) {
    var components = $_e7rlwgxsjducwv6r.readOr('components', [])(spec);
    return $_e31jlowsjducwv3m.map(components, build$1);
  };
  var buildFromSpec = function (userSpec) {
    var spec = $_f0jajj139jducww00.make(userSpec);
    var components = buildSubcomponents(spec);
    var completeSpec = $_5xeczzwyjducwv44.deepMerge($_5dd1g8138jducwvzx, spec, $_e7rlwgxsjducwv6r.wrap('components', components));
    return Result.value($_4t4uzo12ujducwvww.build(completeSpec));
  };
  var text = function (textContent) {
    var element = $_dqo9uvxfjducwv5k.fromText(textContent);
    return external({ element: element });
  };
  var external = function (spec) {
    var extSpec = $_1cyy8vyejducwva0.asStructOrDie('external.component', $_1cyy8vyejducwva0.objOfOnly([
      $_csfrqy7jducwv8r.strict('element'),
      $_csfrqy7jducwv8r.option('uid')
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
      $_803ea810xjducwvmd.writeOnly(extSpec.element(), uid);
    });
    var me = ComponentApi({
      getSystem: systemApi.get,
      config: Option.none,
      hasConfigured: $_a3rnw0wjjducwv31.constant(false),
      connect: connect,
      disconnect: disconnect,
      element: $_a3rnw0wjjducwv31.constant(extSpec.element()),
      spec: $_a3rnw0wjjducwv31.constant(spec),
      readState: $_a3rnw0wjjducwv31.constant('No state'),
      syncComponents: $_a3rnw0wjjducwv31.noop,
      components: $_a3rnw0wjjducwv31.constant([]),
      events: $_a3rnw0wjjducwv31.constant({})
    });
    return $_ky4yd10qjducwvkl.premade(me);
  };
  var build$1 = function (rawUserSpec) {
    return $_ky4yd10qjducwvkl.getPremade(rawUserSpec).fold(function () {
      var userSpecWithUid = $_5xeczzwyjducwv44.deepMerge({ uid: $_803ea810xjducwvmd.generate('') }, rawUserSpec);
      return buildFromSpec(userSpecWithUid).getOrDie();
    }, function (prebuilt) {
      return prebuilt;
    });
  };
  var $_8ylry212tjducwvwe = {
    build: build$1,
    premade: $_ky4yd10qjducwvkl.premade,
    external: external,
    text: text
  };

  var hoverEvent = 'alloy.item-hover';
  var focusEvent = 'alloy.item-focus';
  var onHover = function (item) {
    if ($_3hn9p4ytjducwvbd.search(item.element()).isNone() || Focusing.isFocused(item)) {
      if (!Focusing.isFocused(item))
        Focusing.focus(item);
      $_51mp15wgjducwv2k.emitWith(item, hoverEvent, { item: item });
    }
  };
  var onFocus = function (item) {
    $_51mp15wgjducwv2k.emitWith(item, focusEvent, { item: item });
  };
  var $_bgfd6a13djducww0k = {
    hover: $_a3rnw0wjjducwv31.constant(hoverEvent),
    focus: $_a3rnw0wjjducwv31.constant(focusEvent),
    onHover: onHover,
    onFocus: onFocus
  };

  var builder = function (info) {
    return {
      dom: $_5xeczzwyjducwv44.deepMerge(info.dom(), { attributes: { role: info.toggling().isSome() ? 'menuitemcheckbox' : 'menuitem' } }),
      behaviours: $_5xeczzwyjducwv44.deepMerge($_drwn8py2jducwv7n.derive([
        info.toggling().fold(Toggling.revoke, function (tConfig) {
          return Toggling.config($_5xeczzwyjducwv44.deepMerge({ aria: { mode: 'checked' } }, tConfig));
        }),
        Focusing.config({
          ignore: info.ignoreFocus(),
          onFocus: function (component) {
            $_bgfd6a13djducww0k.onFocus(component);
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
      events: $_gd6bsky4jducwv8a.derive([
        $_gd6bsky4jducwv8a.runWithTarget($_c92nqswhjducwv2r.tapOrClick(), $_51mp15wgjducwv2k.emitExecute),
        $_gd6bsky4jducwv8a.cutter($_cp12t3wijducwv2w.mousedown()),
        $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.mouseover(), $_bgfd6a13djducww0k.onHover),
        $_gd6bsky4jducwv8a.run($_c92nqswhjducwv2r.focusItem(), Focusing.focus)
      ]),
      components: info.components(),
      domModification: info.domModification()
    };
  };
  var schema$10 = [
    $_csfrqy7jducwv8r.strict('data'),
    $_csfrqy7jducwv8r.strict('components'),
    $_csfrqy7jducwv8r.strict('dom'),
    $_csfrqy7jducwv8r.option('toggling'),
    $_csfrqy7jducwv8r.defaulted('itemBehaviours', {}),
    $_csfrqy7jducwv8r.defaulted('ignoreFocus', false),
    $_csfrqy7jducwv8r.defaulted('domModification', {}),
    $_5qmiobz6jducwvco.output('builder', builder)
  ];

  var builder$1 = function (detail) {
    return {
      dom: detail.dom(),
      components: detail.components(),
      events: $_gd6bsky4jducwv8a.derive([$_gd6bsky4jducwv8a.stopper($_c92nqswhjducwv2r.focusItem())])
    };
  };
  var schema$11 = [
    $_csfrqy7jducwv8r.strict('dom'),
    $_csfrqy7jducwv8r.strict('components'),
    $_5qmiobz6jducwvco.output('builder', builder$1)
  ];

  var owner$2 = 'item-widget';
  var partTypes = [$_9mzgbl10vjducwvli.required({
      name: 'widget',
      overrides: function (detail) {
        return {
          behaviours: $_drwn8py2jducwv7n.derive([me.config({
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
  var $_rc2i413gjducww0y = {
    owner: $_a3rnw0wjjducwv31.constant(owner$2),
    parts: $_a3rnw0wjjducwv31.constant(partTypes)
  };

  var builder$2 = function (info) {
    var subs = $_efrbru10tjducwvky.substitutes($_rc2i413gjducww0y.owner(), info, $_rc2i413gjducww0y.parts());
    var components = $_efrbru10tjducwvky.components($_rc2i413gjducww0y.owner(), info, subs.internals());
    var focusWidget = function (component) {
      return $_efrbru10tjducwvky.getPart(component, info, 'widget').map(function (widget) {
        Keying.focusIn(widget);
        return widget;
      });
    };
    var onHorizontalArrow = function (component, simulatedEvent) {
      return $_2kqhvo108jducwvhg.inside(simulatedEvent.event().target()) ? Option.none() : function () {
        if (info.autofocus()) {
          simulatedEvent.setSource(component.element());
          return Option.none();
        } else {
          return Option.none();
        }
      }();
    };
    return $_5xeczzwyjducwv44.deepMerge({
      dom: info.dom(),
      components: components,
      domModification: info.domModification(),
      events: $_gd6bsky4jducwv8a.derive([
        $_gd6bsky4jducwv8a.runOnExecute(function (component, simulatedEvent) {
          focusWidget(component).each(function (widget) {
            simulatedEvent.stop();
          });
        }),
        $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.mouseover(), $_bgfd6a13djducww0k.onHover),
        $_gd6bsky4jducwv8a.run($_c92nqswhjducwv2r.focusItem(), function (component, simulatedEvent) {
          if (info.autofocus())
            focusWidget(component);
          else
            Focusing.focus(component);
        })
      ]),
      behaviours: $_drwn8py2jducwv7n.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: info.data()
          }
        }),
        Focusing.config({
          onFocus: function (component) {
            $_bgfd6a13djducww0k.onFocus(component);
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
    $_csfrqy7jducwv8r.strict('uid'),
    $_csfrqy7jducwv8r.strict('data'),
    $_csfrqy7jducwv8r.strict('components'),
    $_csfrqy7jducwv8r.strict('dom'),
    $_csfrqy7jducwv8r.defaulted('autofocus', false),
    $_csfrqy7jducwv8r.defaulted('domModification', {}),
    $_efrbru10tjducwvky.defaultUidsSchema($_rc2i413gjducww0y.parts()),
    $_5qmiobz6jducwvco.output('builder', builder$2)
  ];

  var itemSchema$1 = $_1cyy8vyejducwva0.choose('type', {
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
  var parts = [$_9mzgbl10vjducwvli.group({
      factory: {
        sketch: function (spec) {
          var itemInfo = $_1cyy8vyejducwva0.asStructOrDie('menu.spec item', itemSchema$1, spec);
          return itemInfo.builder()(itemInfo);
        }
      },
      name: 'items',
      unit: 'item',
      defaults: function (detail, u) {
        var fallbackUid = $_803ea810xjducwvmd.generate('');
        return $_5xeczzwyjducwv44.deepMerge({ uid: fallbackUid }, u);
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
    $_csfrqy7jducwv8r.strict('value'),
    $_csfrqy7jducwv8r.strict('items'),
    $_csfrqy7jducwv8r.strict('dom'),
    $_csfrqy7jducwv8r.strict('components'),
    $_csfrqy7jducwv8r.defaulted('eventOrder', {}),
    $_4ee1oc10ojducwvk5.field('menuBehaviours', [
      Highlighting,
      me,
      Composing,
      Keying
    ]),
    $_csfrqy7jducwv8r.defaultedOf('movement', {
      mode: 'menu',
      moveOnTab: true
    }, $_1cyy8vyejducwva0.choose('mode', {
      grid: [
        $_5qmiobz6jducwvco.initSize(),
        $_5qmiobz6jducwvco.output('config', configureGrid)
      ],
      menu: [
        $_csfrqy7jducwv8r.defaulted('moveOnTab', true),
        $_5qmiobz6jducwvco.output('config', configureMenu)
      ]
    })),
    $_5qmiobz6jducwvco.itemMarkers(),
    $_csfrqy7jducwv8r.defaulted('fakeFocus', false),
    $_csfrqy7jducwv8r.defaulted('focusManager', $_4ss2xxzrjducwvfi.dom()),
    $_5qmiobz6jducwvco.onHandler('onHighlight')
  ];
  var $_dan56213bjducww03 = {
    name: $_a3rnw0wjjducwv31.constant('Menu'),
    schema: $_a3rnw0wjjducwv31.constant(schema$13),
    parts: $_a3rnw0wjjducwv31.constant(parts)
  };

  var focusEvent$1 = 'alloy.menu-focus';
  var $_8b8xp213ijducww18 = { focus: $_a3rnw0wjjducwv31.constant(focusEvent$1) };

  var make$2 = function (detail, components, spec, externals) {
    return $_5xeczzwyjducwv44.deepMerge({
      dom: $_5xeczzwyjducwv44.deepMerge(detail.dom(), { attributes: { role: 'menu' } }),
      uid: detail.uid(),
      behaviours: $_5xeczzwyjducwv44.deepMerge($_drwn8py2jducwv7n.derive([
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
        Composing.config({ find: $_a3rnw0wjjducwv31.identity }),
        Keying.config(detail.movement().config()(detail, detail.movement()))
      ]), $_4ee1oc10ojducwvk5.get(detail.menuBehaviours())),
      events: $_gd6bsky4jducwv8a.derive([
        $_gd6bsky4jducwv8a.run($_bgfd6a13djducww0k.focus(), function (menu, simulatedEvent) {
          var event = simulatedEvent.event();
          menu.getSystem().getByDom(event.target()).each(function (item) {
            Highlighting.highlight(menu, item);
            simulatedEvent.stop();
            $_51mp15wgjducwv2k.emitWith(menu, $_8b8xp213ijducww18.focus(), {
              menu: menu,
              item: item
            });
          });
        }),
        $_gd6bsky4jducwv8a.run($_bgfd6a13djducww0k.hover(), function (menu, simulatedEvent) {
          var item = simulatedEvent.event().item();
          Highlighting.highlight(menu, item);
        })
      ]),
      components: components,
      eventOrder: detail.eventOrder()
    });
  };
  var $_dhwa7b13hjducww12 = { make: make$2 };

  var Menu = $_ehwl8210pjducwvkb.composite({
    name: 'Menu',
    configFields: $_dan56213bjducww03.schema(),
    partFields: $_dan56213bjducww03.parts(),
    factory: $_dhwa7b13hjducww12.make
  });

  var preserve$2 = function (f, container) {
    var ownerDoc = $_375a04x3jducwv4l.owner(container);
    var refocus = $_3hn9p4ytjducwvbd.active(ownerDoc).bind(function (focused) {
      var hasFocus = function (elem) {
        return $_3u3sm2x9jducwv54.eq(focused, elem);
      };
      return hasFocus(container) ? Option.some(container) : $_1w3f5syvjducwvbi.descendant(container, hasFocus);
    });
    var result = f(container);
    refocus.each(function (oldFocus) {
      $_3hn9p4ytjducwvbd.active(ownerDoc).filter(function (newFocus) {
        return $_3u3sm2x9jducwv54.eq(newFocus, oldFocus);
      }).orThunk(function () {
        $_3hn9p4ytjducwvbd.focus(oldFocus);
      });
    });
    return result;
  };
  var $_af2cyb13mjducww1p = { preserve: preserve$2 };

  var set$7 = function (component, replaceConfig, replaceState, data) {
    $_8dj4zcx1jducwv49.detachChildren(component);
    $_af2cyb13mjducww1p.preserve(function () {
      var children = $_e31jlowsjducwv3m.map(data, component.getSystem().build);
      $_e31jlowsjducwv3m.each(children, function (l) {
        $_8dj4zcx1jducwv49.attach(component, l);
      });
    }, component.element());
  };
  var insert = function (component, replaceConfig, insertion, childSpec) {
    var child = component.getSystem().build(childSpec);
    $_8dj4zcx1jducwv49.attachWith(component, child, insertion);
  };
  var append$2 = function (component, replaceConfig, replaceState, appendee) {
    insert(component, replaceConfig, $_f20r2yx2jducwv4k.append, appendee);
  };
  var prepend$2 = function (component, replaceConfig, replaceState, prependee) {
    insert(component, replaceConfig, $_f20r2yx2jducwv4k.prepend, prependee);
  };
  var remove$7 = function (component, replaceConfig, replaceState, removee) {
    var children = contents(component, replaceConfig);
    var foundChild = $_e31jlowsjducwv3m.find(children, function (child) {
      return $_3u3sm2x9jducwv54.eq(removee.element(), child.element());
    });
    foundChild.each($_8dj4zcx1jducwv49.detach);
  };
  var contents = function (component, replaceConfig) {
    return component.components();
  };
  var $_ci3qy613ljducww1i = {
    append: append$2,
    prepend: prepend$2,
    remove: remove$7,
    set: set$7,
    contents: contents
  };

  var Replacing = $_drwn8py2jducwv7n.create({
    fields: [],
    name: 'replacing',
    apis: $_ci3qy613ljducww1i
  });

  var transpose = function (obj) {
    return $_2vh9dzx0jducwv47.tupleMap(obj, function (v, k) {
      return {
        k: v,
        v: k
      };
    });
  };
  var trace = function (items, byItem, byMenu, finish) {
    return $_e7rlwgxsjducwv6r.readOptFrom(byMenu, finish).bind(function (triggerItem) {
      return $_e7rlwgxsjducwv6r.readOptFrom(items, triggerItem).bind(function (triggerMenu) {
        var rest = trace(items, byItem, byMenu, triggerMenu);
        return Option.some([triggerMenu].concat(rest));
      });
    }).getOr([]);
  };
  var generate$5 = function (menus, expansions) {
    var items = {};
    $_2vh9dzx0jducwv47.each(menus, function (menuItems, menu) {
      $_e31jlowsjducwv3m.each(menuItems, function (item) {
        items[item] = menu;
      });
    });
    var byItem = expansions;
    var byMenu = transpose(expansions);
    var menuPaths = $_2vh9dzx0jducwv47.map(byMenu, function (triggerItem, submenu) {
      return [submenu].concat(trace(items, byItem, byMenu, submenu));
    });
    return $_2vh9dzx0jducwv47.map(items, function (path) {
      return $_e7rlwgxsjducwv6r.readOptFrom(menuPaths, path).getOr([path]);
    });
  };
  var $_g49io613pjducww2w = { generate: generate$5 };

  function LayeredState () {
    var expansions = Cell({});
    var menus = Cell({});
    var paths = Cell({});
    var primary = Cell(Option.none());
    var toItemValues = Cell($_a3rnw0wjjducwv31.constant([]));
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
      var sPaths = $_g49io613pjducww2w.generate(menuValues, sExpansions);
      paths.set(sPaths);
    };
    var expand = function (itemValue) {
      return $_e7rlwgxsjducwv6r.readOptFrom(expansions.get(), itemValue).map(function (menu) {
        var current = $_e7rlwgxsjducwv6r.readOptFrom(paths.get(), itemValue).getOr([]);
        return [menu].concat(current);
      });
    };
    var collapse = function (itemValue) {
      return $_e7rlwgxsjducwv6r.readOptFrom(paths.get(), itemValue).bind(function (path) {
        return path.length > 1 ? Option.some(path.slice(1)) : Option.none();
      });
    };
    var refresh = function (itemValue) {
      return $_e7rlwgxsjducwv6r.readOptFrom(paths.get(), itemValue);
    };
    var lookupMenu = function (menuValue) {
      return $_e7rlwgxsjducwv6r.readOptFrom(menus.get(), menuValue);
    };
    var otherMenus = function (path) {
      var menuValues = toItemValues.get()(menus.get());
      return $_e31jlowsjducwv3m.difference($_2vh9dzx0jducwv47.keys(menuValues), path);
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
      return $_2vh9dzx0jducwv47.map(menus, function (spec, name) {
        var data = Menu.sketch($_5xeczzwyjducwv44.deepMerge(spec, {
          value: name,
          items: spec.items,
          markers: $_e7rlwgxsjducwv6r.narrow(rawUiSpec.markers, [
            'item',
            'selectedItem'
          ]),
          fakeFocus: detail.fakeFocus(),
          onHighlight: detail.onHighlight(),
          focusManager: detail.fakeFocus() ? $_4ss2xxzrjducwvfi.highlights() : $_4ss2xxzrjducwvfi.dom()
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
      return $_2vh9dzx0jducwv47.map(detail.data().menus(), function (data, menuName) {
        return $_e31jlowsjducwv3m.bind(data.items, function (item) {
          return item.type === 'separator' ? [] : [item.data.value];
        });
      });
    };
    var setActiveMenu = function (container, menu) {
      Highlighting.highlight(container, menu);
      Highlighting.getHighlighted(menu).orThunk(function () {
        return Highlighting.getFirst(menu);
      }).each(function (item) {
        $_51mp15wgjducwv2k.dispatch(container, item.element(), $_c92nqswhjducwv2r.focusItem());
      });
    };
    var getMenus = function (state, menuValues) {
      return $_4d6y5ey0jducwv7l.cat($_e31jlowsjducwv3m.map(menuValues, state.lookupMenu));
    };
    var updateMenuPath = function (container, state, path) {
      return Option.from(path[0]).bind(state.lookupMenu).map(function (activeMenu) {
        var rest = getMenus(state, path.slice(1));
        $_e31jlowsjducwv3m.each(rest, function (r) {
          $_6jbzpfynjducwvb2.add(r.element(), detail.markers().backgroundMenu());
        });
        if (!$_8em3sbxjjducwv5v.inBody(activeMenu.element())) {
          Replacing.append(container, $_8ylry212tjducwvwe.premade(activeMenu));
        }
        $_g0t8c9137jducwvzt.remove(activeMenu.element(), [detail.markers().backgroundMenu()]);
        setActiveMenu(container, activeMenu);
        var others = getMenus(state, state.otherMenus(path));
        $_e31jlowsjducwv3m.each(others, function (o) {
          $_g0t8c9137jducwvzt.remove(o.element(), [detail.markers().backgroundMenu()]);
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
          if (!$_8em3sbxjjducwv5v.inBody(activeMenu.element())) {
            Replacing.append(container, $_8ylry212tjducwvwe.premade(activeMenu));
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
      return $_2kqhvo108jducwvhg.inside(item.element()) ? Option.none() : expandRight(container, item);
    };
    var onLeft = function (container, item) {
      return $_2kqhvo108jducwvhg.inside(item.element()) ? Option.none() : collapseLeft(container, item);
    };
    var onEscape = function (container, item) {
      return collapseLeft(container, item).orThunk(function () {
        return detail.onEscape()(container, item);
      });
    };
    var keyOnItem = function (f) {
      return function (container, simulatedEvent) {
        return $_aojb3mzxjducwvg5.closest(simulatedEvent.getSource(), '.' + detail.markers().item()).bind(function (target) {
          return container.getSystem().getByDom(target).bind(function (item) {
            return f(container, item);
          });
        });
      };
    };
    var events = $_gd6bsky4jducwv8a.derive([
      $_gd6bsky4jducwv8a.run($_8b8xp213ijducww18.focus(), function (sandbox, simulatedEvent) {
        var menu = simulatedEvent.event().menu();
        Highlighting.highlight(sandbox, menu);
      }),
      $_gd6bsky4jducwv8a.runOnExecute(function (sandbox, simulatedEvent) {
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
      $_gd6bsky4jducwv8a.runOnAttached(function (container, simulatedEvent) {
        setup(container).each(function (primary) {
          Replacing.append(container, $_8ylry212tjducwvwe.premade(primary));
          if (detail.openImmediately()) {
            setActiveMenu(container, primary);
            detail.onOpenMenu()(container, primary);
          }
        });
      })
    ].concat(detail.navigateOnHover() ? [$_gd6bsky4jducwv8a.run($_bgfd6a13djducww0k.hover(), function (sandbox, simulatedEvent) {
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
      behaviours: $_5xeczzwyjducwv44.deepMerge($_drwn8py2jducwv7n.derive([
        Keying.config({
          mode: 'special',
          onRight: keyOnItem(onRight),
          onLeft: keyOnItem(onLeft),
          onEscape: keyOnItem(onEscape),
          focusIn: function (container, keyInfo) {
            state.getPrimary().each(function (primary) {
              $_51mp15wgjducwv2k.dispatch(container, primary.element(), $_c92nqswhjducwv2r.focusItem());
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
      ]), $_4ee1oc10ojducwvk5.get(detail.tmenuBehaviours())),
      eventOrder: detail.eventOrder(),
      apis: { collapseMenu: collapseMenuApi },
      events: events
    };
  };
  var $_62a2of13njducww1x = {
    make: make$3,
    collapseItem: $_a3rnw0wjjducwv31.constant('collapse-item')
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
      menus: $_e7rlwgxsjducwv6r.wrap(name, menu),
      expansions: {}
    };
  };
  var collapseItem = function (text) {
    return {
      value: $_5tqzsa10rjducwvkr.generate($_62a2of13njducww1x.collapseItem()),
      text: text
    };
  };
  var TieredMenu = $_ehwl8210pjducwvkb.single({
    name: 'TieredMenu',
    configFields: [
      $_5qmiobz6jducwvco.onStrictKeyboardHandler('onExecute'),
      $_5qmiobz6jducwvco.onStrictKeyboardHandler('onEscape'),
      $_5qmiobz6jducwvco.onStrictHandler('onOpenMenu'),
      $_5qmiobz6jducwvco.onStrictHandler('onOpenSubmenu'),
      $_5qmiobz6jducwvco.onHandler('onCollapseMenu'),
      $_csfrqy7jducwv8r.defaulted('openImmediately', true),
      $_csfrqy7jducwv8r.strictObjOf('data', [
        $_csfrqy7jducwv8r.strict('primary'),
        $_csfrqy7jducwv8r.strict('menus'),
        $_csfrqy7jducwv8r.strict('expansions')
      ]),
      $_csfrqy7jducwv8r.defaulted('fakeFocus', false),
      $_5qmiobz6jducwvco.onHandler('onHighlight'),
      $_5qmiobz6jducwvco.onHandler('onHover'),
      $_5qmiobz6jducwvco.tieredMenuMarkers(),
      $_csfrqy7jducwv8r.strict('dom'),
      $_csfrqy7jducwv8r.defaulted('navigateOnHover', true),
      $_csfrqy7jducwv8r.defaulted('stayInDom', false),
      $_4ee1oc10ojducwvk5.field('tmenuBehaviours', [
        Keying,
        Highlighting,
        Composing,
        Replacing
      ]),
      $_csfrqy7jducwv8r.defaulted('eventOrder', {})
    ],
    apis: {
      collapseMenu: function (apis, tmenu) {
        apis.collapseMenu(tmenu);
      }
    },
    factory: $_62a2of13njducww1x.make,
    extraApis: {
      tieredData: tieredData,
      singleData: singleData,
      collapseItem: collapseItem
    }
  });

  var findRoute = function (component, transConfig, transState, route) {
    return $_e7rlwgxsjducwv6r.readOptFrom(transConfig.routes(), route.start()).map($_a3rnw0wjjducwv31.apply).bind(function (sConfig) {
      return $_e7rlwgxsjducwv6r.readOptFrom(sConfig, route.destination()).map($_a3rnw0wjjducwv31.apply);
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
          transition: $_a3rnw0wjjducwv31.constant(t),
          route: $_a3rnw0wjjducwv31.constant(r)
        };
      });
    });
  };
  var disableTransition = function (comp, transConfig, transState) {
    getTransition(comp, transConfig, transState).each(function (routeTransition) {
      var t = routeTransition.transition();
      $_6jbzpfynjducwvb2.remove(comp.element(), t.transitionClass());
      $_6yofxrjducwv6k.remove(comp.element(), transConfig.destinationAttr());
    });
  };
  var getNewRoute = function (comp, transConfig, transState, destination) {
    return {
      start: $_a3rnw0wjjducwv31.constant($_6yofxrjducwv6k.get(comp.element(), transConfig.stateAttr())),
      destination: $_a3rnw0wjjducwv31.constant(destination)
    };
  };
  var getCurrentRoute = function (comp, transConfig, transState) {
    var el = comp.element();
    return $_6yofxrjducwv6k.has(el, transConfig.destinationAttr()) ? Option.some({
      start: $_a3rnw0wjjducwv31.constant($_6yofxrjducwv6k.get(comp.element(), transConfig.stateAttr())),
      destination: $_a3rnw0wjjducwv31.constant($_6yofxrjducwv6k.get(comp.element(), transConfig.destinationAttr()))
    }) : Option.none();
  };
  var jumpTo = function (comp, transConfig, transState, destination) {
    disableTransition(comp, transConfig, transState);
    if ($_6yofxrjducwv6k.has(comp.element(), transConfig.stateAttr()) && $_6yofxrjducwv6k.get(comp.element(), transConfig.stateAttr()) !== destination)
      transConfig.onFinish()(comp, destination);
    $_6yofxrjducwv6k.set(comp.element(), transConfig.stateAttr(), destination);
  };
  var fasttrack = function (comp, transConfig, transState, destination) {
    if ($_6yofxrjducwv6k.has(comp.element(), transConfig.destinationAttr())) {
      $_6yofxrjducwv6k.set(comp.element(), transConfig.stateAttr(), $_6yofxrjducwv6k.get(comp.element(), transConfig.destinationAttr()));
      $_6yofxrjducwv6k.remove(comp.element(), transConfig.destinationAttr());
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
      $_6jbzpfynjducwvb2.add(comp.element(), t.transitionClass());
      $_6yofxrjducwv6k.set(comp.element(), transConfig.destinationAttr(), destination);
    });
  };
  var getState = function (comp, transConfig, transState) {
    var e = comp.element();
    return $_6yofxrjducwv6k.has(e, transConfig.stateAttr()) ? Option.some($_6yofxrjducwv6k.get(e, transConfig.stateAttr())) : Option.none();
  };
  var $_39yoah13sjducww3a = {
    findRoute: findRoute,
    disableTransition: disableTransition,
    getCurrentRoute: getCurrentRoute,
    jumpTo: jumpTo,
    progressTo: progressTo,
    getState: getState
  };

  var events$8 = function (transConfig, transState) {
    return $_gd6bsky4jducwv8a.derive([
      $_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        $_39yoah13sjducww3a.getCurrentRoute(component, transConfig, transState).each(function (route) {
          $_39yoah13sjducww3a.findRoute(component, transConfig, transState, route).each(function (rInfo) {
            rInfo.transition().each(function (rTransition) {
              if (raw.propertyName === rTransition.property()) {
                $_39yoah13sjducww3a.jumpTo(component, transConfig, transState, route.destination());
                transConfig.onTransition()(component, route);
              }
            });
          });
        });
      }),
      $_gd6bsky4jducwv8a.runOnAttached(function (comp, se) {
        $_39yoah13sjducww3a.jumpTo(comp, transConfig, transState, transConfig.initialState());
      })
    ]);
  };
  var $_en5xx813rjducww39 = { events: events$8 };

  var TransitionSchema = [
    $_csfrqy7jducwv8r.defaulted('destinationAttr', 'data-transitioning-destination'),
    $_csfrqy7jducwv8r.defaulted('stateAttr', 'data-transitioning-state'),
    $_csfrqy7jducwv8r.strict('initialState'),
    $_5qmiobz6jducwvco.onHandler('onTransition'),
    $_5qmiobz6jducwvco.onHandler('onFinish'),
    $_csfrqy7jducwv8r.strictOf('routes', $_1cyy8vyejducwva0.setOf(Result.value, $_1cyy8vyejducwva0.setOf(Result.value, $_1cyy8vyejducwva0.objOfOnly([$_csfrqy7jducwv8r.optionObjOfOnly('transition', [
        $_csfrqy7jducwv8r.strict('property'),
        $_csfrqy7jducwv8r.strict('transitionClass')
      ])]))))
  ];

  var createRoutes = function (routes) {
    var r = {};
    $_2vh9dzx0jducwv47.each(routes, function (v, k) {
      var waypoints = k.split('<->');
      r[waypoints[0]] = $_e7rlwgxsjducwv6r.wrap(waypoints[1], v);
      r[waypoints[1]] = $_e7rlwgxsjducwv6r.wrap(waypoints[0], v);
    });
    return r;
  };
  var createBistate = function (first, second, transitions) {
    return $_e7rlwgxsjducwv6r.wrapAll([
      {
        key: first,
        value: $_e7rlwgxsjducwv6r.wrap(second, transitions)
      },
      {
        key: second,
        value: $_e7rlwgxsjducwv6r.wrap(first, transitions)
      }
    ]);
  };
  var createTristate = function (first, second, third, transitions) {
    return $_e7rlwgxsjducwv6r.wrapAll([
      {
        key: first,
        value: $_e7rlwgxsjducwv6r.wrapAll([
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
        value: $_e7rlwgxsjducwv6r.wrapAll([
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
        value: $_e7rlwgxsjducwv6r.wrapAll([
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
  var Transitioning = $_drwn8py2jducwv7n.create({
    fields: TransitionSchema,
    name: 'transitioning',
    active: $_en5xx813rjducww39,
    apis: $_39yoah13sjducww3a,
    extra: {
      createRoutes: createRoutes,
      createBistate: createBistate,
      createTristate: createTristate
    }
  });

  var scrollable = $_513f6yzejducwvdz.resolve('scrollable');
  var register = function (element) {
    $_6jbzpfynjducwvb2.add(element, scrollable);
  };
  var deregister = function (element) {
    $_6jbzpfynjducwvb2.remove(element, scrollable);
  };
  var $_4n5bgh13ujducww3p = {
    register: register,
    deregister: deregister,
    scrollable: $_a3rnw0wjjducwv31.constant(scrollable)
  };

  var getValue$4 = function (item) {
    return $_e7rlwgxsjducwv6r.readOptFrom(item, 'format').getOr(item.title);
  };
  var convert$1 = function (formats, memMenuThunk) {
    var mainMenu = makeMenu('Styles', [].concat($_e31jlowsjducwv3m.map(formats.items, function (k) {
      return makeItem(getValue$4(k), k.title, k.isSelected(), k.getPreview(), $_e7rlwgxsjducwv6r.hasKey(formats.expansions, getValue$4(k)));
    })), memMenuThunk, false);
    var submenus = $_2vh9dzx0jducwv47.map(formats.menus, function (menuItems, menuName) {
      var items = $_e31jlowsjducwv3m.map(menuItems, function (item) {
        return makeItem(getValue$4(item), item.title, item.isSelected !== undefined ? item.isSelected() : false, item.getPreview !== undefined ? item.getPreview() : '', $_e7rlwgxsjducwv6r.hasKey(formats.expansions, getValue$4(item)));
      });
      return makeMenu(menuName, items, memMenuThunk, true);
    });
    var menus = $_5xeczzwyjducwv44.deepMerge(submenus, $_e7rlwgxsjducwv6r.wrap('styles', mainMenu));
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
        classes: isMenu ? [$_513f6yzejducwvdz.resolve('styles-item-is-menu')] : []
      },
      toggling: {
        toggleOnExecute: false,
        toggleClass: $_513f6yzejducwvdz.resolve('format-matches'),
        selected: selected
      },
      itemBehaviours: $_drwn8py2jducwv7n.derive(isMenu ? [] : [$_6h7r9izdjducwvdv.format(value, function (comp, status) {
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
            classes: [$_513f6yzejducwvdz.resolve('styles-collapser')]
          },
          components: collapsable ? [
            {
              dom: {
                tag: 'span',
                classes: [$_513f6yzejducwvdz.resolve('styles-collapse-icon')]
              }
            },
            $_8ylry212tjducwvwe.text(value)
          ] : [$_8ylry212tjducwvwe.text(value)],
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
            classes: [$_513f6yzejducwvdz.resolve('styles-menu-items-container')]
          },
          components: [Menu.parts().items({})],
          behaviours: $_drwn8py2jducwv7n.derive([$_b8wy59126jducwvss.config('adhoc-scrollable-menu', [
              $_gd6bsky4jducwv8a.runOnAttached(function (component, simulatedEvent) {
                $_gbl0iz103jducwvgo.set(component.element(), 'overflow-y', 'auto');
                $_gbl0iz103jducwvgo.set(component.element(), '-webkit-overflow-scrolling', 'touch');
                $_4n5bgh13ujducww3p.register(component.element());
              }),
              $_gd6bsky4jducwv8a.runOnDetached(function (component) {
                $_gbl0iz103jducwvgo.remove(component.element(), 'overflow-y');
                $_gbl0iz103jducwvgo.remove(component.element(), '-webkit-overflow-scrolling');
                $_4n5bgh13ujducww3p.deregister(component.element());
              })
            ])])
        }
      ],
      items: items,
      menuBehaviours: $_drwn8py2jducwv7n.derive([Transitioning.config({
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
    var memMenu = $_b457j11rjducwvqw.record(TieredMenu.sketch({
      dom: {
        tag: 'div',
        classes: [$_513f6yzejducwvdz.resolve('styles-menu')]
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
        var w = $_vvvkn11kjducwvpt.get(container.element());
        $_vvvkn11kjducwvpt.set(menu.element(), w);
        Transitioning.jumpTo(menu, 'current');
      },
      onOpenSubmenu: function (container, item, submenu) {
        var w = $_vvvkn11kjducwvpt.get(container.element());
        var menu = $_aojb3mzxjducwvg5.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var menuComp = container.getSystem().getByDom(menu).getOrDie();
        $_vvvkn11kjducwvpt.set(submenu.element(), w);
        Transitioning.progressTo(menuComp, 'before');
        Transitioning.jumpTo(submenu, 'after');
        Transitioning.progressTo(submenu, 'current');
      },
      onCollapseMenu: function (container, item, menu) {
        var submenu = $_aojb3mzxjducwvg5.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var submenuComp = container.getSystem().getByDom(submenu).getOrDie();
        Transitioning.progressTo(submenuComp, 'after');
        Transitioning.progressTo(menu, 'current');
      },
      navigateOnHover: false,
      openImmediately: true,
      data: dataset.tmenu,
      markers: {
        backgroundMenu: $_513f6yzejducwvdz.resolve('styles-background-menu'),
        menu: $_513f6yzejducwvdz.resolve('styles-menu'),
        selectedMenu: $_513f6yzejducwvdz.resolve('styles-selected-menu'),
        item: $_513f6yzejducwvdz.resolve('styles-item'),
        selectedItem: $_513f6yzejducwvdz.resolve('styles-selected-item')
      }
    }));
    return memMenu.asSpec();
  };
  var $_2nvldo12sjducwvvq = { sketch: sketch$9 };

  var getFromExpandingItem = function (item) {
    var newItem = $_5xeczzwyjducwv44.deepMerge($_e7rlwgxsjducwv6r.exclude(item, ['items']), { menu: true });
    var rest = expand(item.items);
    var newMenus = $_5xeczzwyjducwv44.deepMerge(rest.menus, $_e7rlwgxsjducwv6r.wrap(item.title, rest.items));
    var newExpansions = $_5xeczzwyjducwv44.deepMerge(rest.expansions, $_e7rlwgxsjducwv6r.wrap(item.title, item.title));
    return {
      item: newItem,
      menus: newMenus,
      expansions: newExpansions
    };
  };
  var getFromItem = function (item) {
    return $_e7rlwgxsjducwv6r.hasKey(item, 'items') ? getFromExpandingItem(item) : {
      item: item,
      menus: {},
      expansions: {}
    };
  };
  var expand = function (items) {
    return $_e31jlowsjducwv3m.foldr(items, function (acc, item) {
      var newData = getFromItem(item);
      return {
        menus: $_5xeczzwyjducwv44.deepMerge(acc.menus, newData.menus),
        items: [newData.item].concat(acc.items),
        expansions: $_5xeczzwyjducwv44.deepMerge(acc.expansions, newData.expansions)
      };
    }, {
      menus: {},
      expansions: {},
      items: []
    });
  };
  var $_4u0ck913vjducww3s = { expand: expand };

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
      return $_5xeczzwyjducwv44.deepMerge(item, {
        isSelected: isSelectedFor(item.format),
        getPreview: getPreview(item.format)
      });
    };
    var enrichMenu = function (item) {
      return $_5xeczzwyjducwv44.deepMerge(item, {
        isSelected: $_a3rnw0wjjducwv31.constant(false),
        getPreview: $_a3rnw0wjjducwv31.constant('')
      });
    };
    var enrichCustom = function (item) {
      var formatName = $_5tqzsa10rjducwvkr.generate(item.title);
      var newItem = $_5xeczzwyjducwv44.deepMerge(item, {
        format: formatName,
        isSelected: isSelectedFor(formatName),
        getPreview: getPreview(formatName)
      });
      editor.formatter.register(formatName, newItem);
      return newItem;
    };
    var formats = $_e7rlwgxsjducwv6r.readOptFrom(settings, 'style_formats').getOr(DefaultStyleFormats);
    var doEnrich = function (items) {
      return $_e31jlowsjducwv3m.map(items, function (item) {
        if ($_e7rlwgxsjducwv6r.hasKey(item, 'items')) {
          var newItems = doEnrich(item.items);
          return $_5xeczzwyjducwv44.deepMerge(enrichMenu(item), { items: newItems });
        } else if ($_e7rlwgxsjducwv6r.hasKey(item, 'format')) {
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
      return $_e31jlowsjducwv3m.bind(items, function (item) {
        if (item.items !== undefined) {
          var newItems = doPrune(item.items);
          return newItems.length > 0 ? [item] : [];
        } else {
          var keep = $_e7rlwgxsjducwv6r.hasKey(item, 'format') ? editor.formatter.canApply(item.format) : true;
          return keep ? [item] : [];
        }
      });
    };
    var prunedItems = doPrune(formats);
    return $_4u0ck913vjducww3s.expand(prunedItems);
  };
  var ui = function (editor, formats, onDone) {
    var pruned = prune(editor, formats);
    return $_2nvldo12sjducwvvq.sketch({
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
  var $_62l6wp12qjducwvvf = {
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
    return $_e31jlowsjducwv3m.bind(toolbar, function (item) {
      return $_9yomlywzjducwv46.isArray(item) ? identifyFromArray(item) : extract$1(item);
    });
  };
  var identify = function (settings) {
    var toolbar = settings.toolbar !== undefined ? settings.toolbar : defaults;
    return $_9yomlywzjducwv46.isArray(toolbar) ? identifyFromArray(toolbar) : extract$1(toolbar);
  };
  var setup = function (realm, editor) {
    var commandSketch = function (name) {
      return function () {
        return $_1sb0dgzfjducwve1.forToolbarCommand(editor, name);
      };
    };
    var stateCommandSketch = function (name) {
      return function () {
        return $_1sb0dgzfjducwve1.forToolbarStateCommand(editor, name);
      };
    };
    var actionSketch = function (name, query, action) {
      return function () {
        return $_1sb0dgzfjducwve1.forToolbarStateAction(editor, name, query, action);
      };
    };
    var undo = commandSketch('undo');
    var redo = commandSketch('redo');
    var bold = stateCommandSketch('bold');
    var italic = stateCommandSketch('italic');
    var underline = stateCommandSketch('underline');
    var removeformat = commandSketch('removeformat');
    var link = function () {
      return $_dt84hw121jducwvrq.sketch(realm, editor);
    };
    var unlink = actionSketch('unlink', 'link', function () {
      editor.execCommand('unlink', null, false);
    });
    var image = function () {
      return $_177ggh11qjducwvqn.sketch(editor);
    };
    var bullist = actionSketch('unordered-list', 'ul', function () {
      editor.execCommand('InsertUnorderedList', null, false);
    });
    var numlist = actionSketch('ordered-list', 'ol', function () {
      editor.execCommand('InsertOrderedList', null, false);
    });
    var fontsizeselect = function () {
      return $_8ernn811mjducwvpw.sketch(realm, editor);
    };
    var forecolor = function () {
      return $_99ulj115jducwvnt.sketch(realm, editor);
    };
    var styleFormats = $_62l6wp12qjducwvvf.register(editor, editor.settings);
    var styleFormatsMenu = function () {
      return $_62l6wp12qjducwvvf.ui(editor, styleFormats, function () {
        editor.fire('scrollIntoView');
      });
    };
    var styleselect = function () {
      return $_1sb0dgzfjducwve1.forToolbar('style-formats', function (button) {
        editor.fire('toReading');
        realm.dropup().appear(styleFormatsMenu, Toggling.on, button);
      }, $_drwn8py2jducwv7n.derive([
        Toggling.config({
          toggleClass: $_513f6yzejducwvdz.resolve('toolbar-button-selected'),
          toggleOnExecute: false,
          aria: { mode: 'pressed' }
        }),
        Receiving.config({
          channels: $_e7rlwgxsjducwv6r.wrapAll([
            $_6h7r9izdjducwvdv.receive($_4fo430z1jducwvbw.orientationChanged(), Toggling.off),
            $_6h7r9izdjducwvdv.receive($_4fo430z1jducwvbw.dropupDismissed(), Toggling.off)
          ])
        })
      ]));
    };
    var feature = function (prereq, sketch) {
      return {
        isSupported: function () {
          return prereq.forall(function (p) {
            return $_e7rlwgxsjducwv6r.hasKey(editor.buttons, p);
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
    return $_e31jlowsjducwv3m.bind(itemNames, function (iName) {
      var r = !$_e7rlwgxsjducwv6r.hasKey(present, iName) && $_e7rlwgxsjducwv6r.hasKey(features, iName) && features[iName].isSupported() ? [features[iName].sketch()] : [];
      present[iName] = true;
      return r;
    });
  };
  var $_93gi6mz2jducwvbz = {
    identify: identify,
    setup: setup,
    detect: detect$4
  };

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_a3rnw0wjjducwv31.constant(target),
      'x': $_a3rnw0wjjducwv31.constant(x),
      'y': $_a3rnw0wjjducwv31.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_a3rnw0wjjducwv31.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_dqo9uvxfjducwv5k.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_a3rnw0wjjducwv31.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_a3rnw0wjjducwv31.curry(unbind, element, event, wrapped, useCapture) };
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
  var $_b9vcnk13yjducww49 = {
    bind: bind$1,
    capture: capture
  };

  var filter$1 = $_a3rnw0wjjducwv31.constant(true);
  var bind$2 = function (element, event, handler) {
    return $_b9vcnk13yjducww49.bind(element, event, filter$1, handler);
  };
  var capture$1 = function (element, event, handler) {
    return $_b9vcnk13yjducww49.capture(element, event, filter$1, handler);
  };
  var $_97dmhz13xjducww46 = {
    bind: bind$2,
    capture: capture$1
  };

  var INTERVAL = 50;
  var INSURANCE = 1000 / INTERVAL;
  var get$11 = function (outerWindow) {
    var isPortrait = outerWindow.matchMedia('(orientation: portrait)').matches;
    return { isPortrait: $_a3rnw0wjjducwv31.constant(isPortrait) };
  };
  var getActualWidth = function (outerWindow) {
    var isIos = $_f3swp0wkjducwv33.detect().os.isiOS();
    var isPortrait = get$11(outerWindow).isPortrait();
    return isIos && !isPortrait ? outerWindow.screen.height : outerWindow.screen.width;
  };
  var onChange = function (outerWindow, listeners) {
    var win = $_dqo9uvxfjducwv5k.fromDom(outerWindow);
    var poller = null;
    var change = function () {
      clearInterval(poller);
      var orientation = get$11(outerWindow);
      listeners.onChange(orientation);
      onAdjustment(function () {
        listeners.onReady(orientation);
      });
    };
    var orientationHandle = $_97dmhz13xjducww46.bind(win, 'orientationchange', change);
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
  var $_4nntl513wjducww3x = {
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
      settings.triggerEvent($_c92nqswhjducwv2r.longpress(), event);
    }, LONGPRESS_DELAY);
    var handleTouchstart = function (event) {
      getTouch(event).each(function (touch) {
        longpress.cancel();
        var data = {
          x: $_a3rnw0wjjducwv31.constant(touch.clientX),
          y: $_a3rnw0wjjducwv31.constant(touch.clientY),
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
        return $_3u3sm2x9jducwv54.eq(data.target(), event.target());
      };
      return startData.get().filter(isSame).map(function (data) {
        return settings.triggerEvent($_c92nqswhjducwv2r.tap(), event);
      });
    };
    var handlers = $_e7rlwgxsjducwv6r.wrapAll([
      {
        key: $_cp12t3wijducwv2w.touchstart(),
        value: handleTouchstart
      },
      {
        key: $_cp12t3wijducwv2w.touchmove(),
        value: handleTouchmove
      },
      {
        key: $_cp12t3wijducwv2w.touchend(),
        value: handleTouchend
      }
    ]);
    var fireIfReady = function (event, type) {
      return $_e7rlwgxsjducwv6r.readOptFrom(handlers, type).bind(function (handler) {
        return handler(event);
      });
    };
    return { fireIfReady: fireIfReady };
  };
  var $_dgqkm1144jducww5c = { monitor: monitor };

  var monitor$1 = function (editorApi) {
    var tapEvent = $_dgqkm1144jducww5c.monitor({
      triggerEvent: function (type, evt) {
        editorApi.onTapContent(evt);
      }
    });
    var onTouchend = function () {
      return $_97dmhz13xjducww46.bind(editorApi.body(), 'touchend', function (evt) {
        tapEvent.fireIfReady(evt, 'touchend');
      });
    };
    var onTouchmove = function () {
      return $_97dmhz13xjducww46.bind(editorApi.body(), 'touchmove', function (evt) {
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
  var $_ku3nt143jducww58 = { monitor: monitor$1 };

  var isAndroid6 = $_f3swp0wkjducwv33.detect().os.version.major >= 6;
  var initEvents = function (editorApi, toolstrip, alloy) {
    var tapping = $_ku3nt143jducww58.monitor(editorApi);
    var outerDoc = $_375a04x3jducwv4l.owner(toolstrip);
    var isRanged = function (sel) {
      return !$_3u3sm2x9jducwv54.eq(sel.start(), sel.finish()) || sel.soffset() !== sel.foffset();
    };
    var hasRangeInUi = function () {
      return $_3hn9p4ytjducwvbd.active(outerDoc).filter(function (input) {
        return $_en9ft8xkjducwv5x.name(input) === 'input';
      }).exists(function (input) {
        return input.dom().selectionStart !== input.dom().selectionEnd;
      });
    };
    var updateMargin = function () {
      var rangeInContent = editorApi.doc().dom().hasFocus() && editorApi.getSelection().exists(isRanged);
      alloy.getByDom(toolstrip).each((rangeInContent || hasRangeInUi()) === true ? Toggling.on : Toggling.off);
    };
    var listeners = [
      $_97dmhz13xjducww46.bind(editorApi.body(), 'touchstart', function (evt) {
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_97dmhz13xjducww46.bind(toolstrip, 'touchstart', function (evt) {
        editorApi.onTouchToolstrip();
      }),
      editorApi.onToReading(function () {
        $_3hn9p4ytjducwvbd.blur(editorApi.body());
      }),
      editorApi.onToEditing($_a3rnw0wjjducwv31.noop),
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
      $_97dmhz13xjducww46.bind($_dqo9uvxfjducwv5k.fromDom(editorApi.win()), 'blur', function () {
        alloy.getByDom(toolstrip).each(Toggling.off);
      }),
      $_97dmhz13xjducww46.bind(outerDoc, 'select', updateMargin),
      $_97dmhz13xjducww46.bind(editorApi.doc(), 'selectionchange', updateMargin)
    ]);
    var destroy = function () {
      $_e31jlowsjducwv3m.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_6ecbnj142jducww4u = { initEvents: initEvents };

  var safeParse = function (element, attribute) {
    var parsed = parseInt($_6yofxrjducwv6k.get(element, attribute), 10);
    return isNaN(parsed) ? 0 : parsed;
  };
  var $_ffblkk147jducww5v = { safeParse: safeParse };

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
    var browser = $_f3swp0wkjducwv33.detect().browser;
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

  var api$3 = NodeValue($_en9ft8xkjducwv5x.isText, 'text');
  var get$12 = function (element) {
    return api$3.get(element);
  };
  var getOption = function (element) {
    return api$3.getOption(element);
  };
  var set$8 = function (element, value) {
    api$3.set(element, value);
  };
  var $_c0rkp114ajducww67 = {
    get: get$12,
    getOption: getOption,
    set: set$8
  };

  var getEnd = function (element) {
    return $_en9ft8xkjducwv5x.name(element) === 'img' ? 1 : $_c0rkp114ajducww67.getOption(element).fold(function () {
      return $_375a04x3jducwv4l.children(element).length;
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
    return $_c0rkp114ajducww67.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_e31jlowsjducwv3m.contains(elementsWithCursorPosition, $_en9ft8xkjducwv5x.name(elem));
  };
  var $_akunn7149jducww64 = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var adt$4 = $_dmy3o8xwjducwv7a.generate([
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
    return situ.fold($_a3rnw0wjjducwv31.identity, $_a3rnw0wjjducwv31.identity, $_a3rnw0wjjducwv31.identity);
  };
  var $_b83ti714djducww6k = {
    before: adt$4.before,
    on: adt$4.on,
    after: adt$4.after,
    cata: cata,
    getStart: getStart
  };

  var type$1 = $_dmy3o8xwjducwv7a.generate([
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
  var range$1 = $_73sv11x4jducwv4t.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$1.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart$1 = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_dqo9uvxfjducwv5k.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_b83ti714djducww6k.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart$1(selection);
    return $_375a04x3jducwv4l.defaultView(start);
  };
  var $_agbdgg14cjducww6c = {
    domRange: type$1.domRange,
    relative: type$1.relative,
    exact: type$1.exact,
    exactFromRange: exactFromRange,
    range: range$1,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_375a04x3jducwv4l.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_dqo9uvxfjducwv5k.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_3u3sm2x9jducwv54.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_3mmxgr14fjducww6u = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_e31jlowsjducwv3m.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_dqo9uvxfjducwv5k.fromDom(fragment);
  };
  var $_1aewdq14gjducww6w = { fromElements: fromElements };

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
    return $_dqo9uvxfjducwv5k.fromDom(fragment);
  };
  var toRect = function (rect) {
    return {
      left: $_a3rnw0wjjducwv31.constant(rect.left),
      top: $_a3rnw0wjjducwv31.constant(rect.top),
      right: $_a3rnw0wjjducwv31.constant(rect.right),
      bottom: $_a3rnw0wjjducwv31.constant(rect.bottom),
      width: $_a3rnw0wjjducwv31.constant(rect.width),
      height: $_a3rnw0wjjducwv31.constant(rect.height)
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
  var $_53rkcn14hjducww6z = {
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

  var adt$5 = $_dmy3o8xwjducwv7a.generate([
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
    return type($_dqo9uvxfjducwv5k.fromDom(range.startContainer), range.startOffset, $_dqo9uvxfjducwv5k.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_a3rnw0wjjducwv31.constant(rng),
          rtl: Option.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_89w2qewljducwv35.cached(function () {
            return $_53rkcn14hjducww6z.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_89w2qewljducwv35.cached(function () {
            return Option.some($_53rkcn14hjducww6z.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_89w2qewljducwv35.cached(function () {
            return $_53rkcn14hjducww6z.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_89w2qewljducwv35.cached(function () {
            return Option.some($_53rkcn14hjducww6z.exactToNative(win, finish, foffset, start, soffset));
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
        return adt$5.rtl($_dqo9uvxfjducwv5k.fromDom(rev.endContainer), rev.endOffset, $_dqo9uvxfjducwv5k.fromDom(rev.startContainer), rev.startOffset);
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
  var $_atibc114ijducww75 = {
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
  var $_enhisf14ljducww7k = {
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
    var length = $_c0rkp114ajducww67.get(textnode).length;
    var offset = $_enhisf14ljducww7k.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate$1 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_4d6y5ey0jducwv7l.findMap(rects, function (rect) {
      return $_enhisf14ljducww7k.inRect(rect, x, y) ? Option.some(rect) : Option.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_eobxj714mjducww7l = { locate: locate$1 };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_375a04x3jducwv4l.children(node);
    return $_4d6y5ey0jducwv7l.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_enhisf14ljducww7k.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : Option.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_en9ft8xkjducwv5x.isText(node) ? $_eobxj714mjducww7l.locate : searchInChildren;
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
  var $_cmgxkz14kjducww7g = { locate: locate$2 };

  var first$3 = function (element) {
    return $_1w3f5syvjducwvbi.descendant(element, $_akunn7149jducww64.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_akunn7149jducww64.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_375a04x3jducwv4l.children(element);
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
  var $_4bxbpk14ojducww7r = {
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
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_4bxbpk14ojducww7r.first : $_4bxbpk14ojducww7r.last;
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
    var f = $_375a04x3jducwv4l.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_2zx9ux14njducww7p = { search: search$1 };

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
    return $_cmgxkz14kjducww7g.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_dqo9uvxfjducwv5k.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_2zx9ux14njducww7p.search(doc, elem, x);
      };
      return $_375a04x3jducwv4l.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_dqo9uvxfjducwv5k.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_agbdgg14cjducww6c.range($_dqo9uvxfjducwv5k.fromDom(rng.startContainer), rng.startOffset, $_dqo9uvxfjducwv5k.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_44nrt514jjducww7d = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_53rkcn14hjducww6z.create(win);
    var self = $_a1a6ctxejducwv5f.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_7nc35uzvjducwvg0.descendants(ancestor, selector));
    return $_e31jlowsjducwv3m.filter(elements, function (elem) {
      $_53rkcn14hjducww6z.selectNodeContentsUsing(innerRange, elem);
      return $_53rkcn14hjducww6z.isWithin(outerRange, innerRange);
    });
  };
  var find$4 = function (win, selection, selector) {
    var outerRange = $_atibc114ijducww75.asLtrRange(win, selection);
    var ancestor = $_dqo9uvxfjducwv5k.fromDom(outerRange.commonAncestorContainer);
    return $_en9ft8xkjducwv5x.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_d4254w14pjducww7v = { find: find$4 };

  var beforeSpecial = function (element, offset) {
    var name = $_en9ft8xkjducwv5x.name(element);
    if ('input' === name)
      return $_b83ti714djducww6k.after(element);
    else if (!$_e31jlowsjducwv3m.contains([
        'br',
        'img'
      ], name))
      return $_b83ti714djducww6k.on(element, offset);
    else
      return offset === 0 ? $_b83ti714djducww6k.before(element) : $_b83ti714djducww6k.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_b83ti714djducww6k.before, beforeSpecial, $_b83ti714djducww6k.after);
    var finish = finishSitu.fold($_b83ti714djducww6k.before, beforeSpecial, $_b83ti714djducww6k.after);
    return $_agbdgg14cjducww6c.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_agbdgg14cjducww6c.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_dqo9uvxfjducwv5k.fromDom(rng.startContainer);
        var finish = $_dqo9uvxfjducwv5k.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_4pg4lh14qjducww80 = {
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
    var rng = $_53rkcn14hjducww6z.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_d4254w14pjducww7v.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_atibc114ijducww75.diagnose(win, relative).match({
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
    var relative = $_4pg4lh14qjducww80.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_4pg4lh14qjducww80.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_agbdgg14cjducww6c.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_53rkcn14hjducww6z.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_4pg4lh14qjducww80.preprocess(selection);
    return $_atibc114ijducww75.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return Option.some($_agbdgg14cjducww6c.range($_dqo9uvxfjducwv5k.fromDom(firstRng.startContainer), firstRng.startOffset, $_dqo9uvxfjducwv5k.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return Option.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_dqo9uvxfjducwv5k.fromDom(selection.anchorNode);
    var focusNode = $_dqo9uvxfjducwv5k.fromDom(selection.focusNode);
    return $_3mmxgr14fjducww6u.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? Option.some($_agbdgg14cjducww6c.range($_dqo9uvxfjducwv5k.fromDom(selection.anchorNode), selection.anchorOffset, $_dqo9uvxfjducwv5k.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_53rkcn14hjducww6z.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_53rkcn14hjducww6z.selectNodeContents(win, element);
    return $_agbdgg14cjducww6c.range($_dqo9uvxfjducwv5k.fromDom(rng.startContainer), rng.startOffset, $_dqo9uvxfjducwv5k.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : Option.none();
  };
  var get$13 = function (win) {
    return getExact(win).map(function (range) {
      return $_agbdgg14cjducww6c.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect$1 = function (win, selection) {
    var rng = $_atibc114ijducww75.asLtrRange(win, selection);
    return $_53rkcn14hjducww6z.getFirstRect(rng);
  };
  var getBounds$1 = function (win, selection) {
    var rng = $_atibc114ijducww75.asLtrRange(win, selection);
    return $_53rkcn14hjducww6z.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_44nrt514jjducww7d.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_atibc114ijducww75.asLtrRange(win, selection);
    return $_53rkcn14hjducww6z.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$3 = function (win, selection) {
    var rng = $_atibc114ijducww75.asLtrRange(win, selection);
    return $_53rkcn14hjducww6z.cloneFragment(rng);
  };
  var replace = function (win, selection, elements) {
    var rng = $_atibc114ijducww75.asLtrRange(win, selection);
    var fragment = $_1aewdq14gjducww6w.fromElements(elements, win.document);
    $_53rkcn14hjducww6z.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_atibc114ijducww75.asLtrRange(win, selection);
    $_53rkcn14hjducww6z.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_3u3sm2x9jducwv54.eq(start, finish) && soffset === foffset;
  };
  var $_7w9mrt14ejducww6o = {
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
      width: $_a3rnw0wjjducwv31.constant(COLLAPSED_WIDTH),
      height: rect.height
    };
  };
  var toRect$1 = function (rawRect) {
    return {
      left: $_a3rnw0wjjducwv31.constant(rawRect.left),
      top: $_a3rnw0wjjducwv31.constant(rawRect.top),
      right: $_a3rnw0wjjducwv31.constant(rawRect.right),
      bottom: $_a3rnw0wjjducwv31.constant(rawRect.bottom),
      width: $_a3rnw0wjjducwv31.constant(rawRect.width),
      height: $_a3rnw0wjjducwv31.constant(rawRect.height)
    };
  };
  var getRectsFromRange = function (range) {
    if (!range.collapsed) {
      return $_e31jlowsjducwv3m.map(range.getClientRects(), toRect$1);
    } else {
      var start_1 = $_dqo9uvxfjducwv5k.fromDom(range.startContainer);
      return $_375a04x3jducwv4l.parent(start_1).bind(function (parent) {
        var selection = $_agbdgg14cjducww6c.exact(start_1, range.startOffset, parent, $_akunn7149jducww64.getEnd(parent));
        var optRect = $_7w9mrt14ejducww6o.getFirstRect(range.startContainer.ownerDocument.defaultView, selection);
        return optRect.map(collapsedRect).map($_e31jlowsjducwv3m.pure);
      }).getOr([]);
    }
  };
  var getRectangles = function (cWin) {
    var sel = cWin.getSelection();
    return sel !== undefined && sel.rangeCount > 0 ? getRectsFromRange(sel.getRangeAt(0)) : [];
  };
  var $_e09bwx148jducww5x = { getRectangles: getRectangles };

  var autocompleteHack = function () {
    return function (f) {
      setTimeout(function () {
        f();
      }, 0);
    };
  };
  var resume = function (cWin) {
    cWin.focus();
    var iBody = $_dqo9uvxfjducwv5k.fromDom(cWin.document.body);
    var inInput = $_3hn9p4ytjducwvbd.active().exists(function (elem) {
      return $_e31jlowsjducwv3m.contains([
        'input',
        'textarea'
      ], $_en9ft8xkjducwv5x.name(elem));
    });
    var transaction = inInput ? autocompleteHack() : $_a3rnw0wjjducwv31.apply;
    transaction(function () {
      $_3hn9p4ytjducwvbd.active().each($_3hn9p4ytjducwvbd.blur);
      $_3hn9p4ytjducwvbd.focus(iBody);
    });
  };
  var $_9mkvv914rjducww84 = { resume: resume };

  var EXTRA_SPACING = 50;
  var data = 'data-' + $_513f6yzejducwvdz.resolve('last-outer-height');
  var setLastHeight = function (cBody, value) {
    $_6yofxrjducwv6k.set(cBody, data, value);
  };
  var getLastHeight = function (cBody) {
    return $_ffblkk147jducww5v.safeParse(cBody, data);
  };
  var getBoundsFrom = function (rect) {
    return {
      top: $_a3rnw0wjjducwv31.constant(rect.top()),
      bottom: $_a3rnw0wjjducwv31.constant(rect.top() + rect.height())
    };
  };
  var getBounds$2 = function (cWin) {
    var rects = $_e09bwx148jducww5x.getRectangles(cWin);
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
    var cBody = $_dqo9uvxfjducwv5k.fromDom(cWin.document.body);
    var toEditing = function () {
      $_9mkvv914rjducww84.resume(cWin);
    };
    var onResize = $_97dmhz13xjducww46.bind($_dqo9uvxfjducwv5k.fromDom(outerWindow), 'resize', function () {
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
  var $_bysno9146jducww5n = { setup: setup$1 };

  var getBodyFromFrame = function (frame) {
    return Option.some($_dqo9uvxfjducwv5k.fromDom(frame.dom().contentWindow.document.body));
  };
  var getDocFromFrame = function (frame) {
    return Option.some($_dqo9uvxfjducwv5k.fromDom(frame.dom().contentWindow.document));
  };
  var getWinFromFrame = function (frame) {
    return Option.from(frame.dom().contentWindow);
  };
  var getSelectionFromFrame = function (frame) {
    var optWin = getWinFromFrame(frame);
    return optWin.bind($_7w9mrt14ejducww6o.getExact);
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
        return $_97dmhz13xjducww46.bind(doc, type, handler);
      };
    });
  };
  var toRect$2 = function (rect) {
    return {
      left: $_a3rnw0wjjducwv31.constant(rect.left),
      top: $_a3rnw0wjjducwv31.constant(rect.top),
      right: $_a3rnw0wjjducwv31.constant(rect.right),
      bottom: $_a3rnw0wjjducwv31.constant(rect.bottom),
      width: $_a3rnw0wjjducwv31.constant(rect.width),
      height: $_a3rnw0wjjducwv31.constant(rect.height)
    };
  };
  var getActiveApi = function (editor) {
    var frame = getFrame(editor);
    var tryFallbackBox = function (win) {
      var isCollapsed = function (sel) {
        return $_3u3sm2x9jducwv54.eq(sel.start(), sel.finish()) && sel.soffset() === sel.foffset();
      };
      var toStartRect = function (sel) {
        var rect = sel.start().dom().getBoundingClientRect();
        return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect$2) : Option.none();
      };
      return $_7w9mrt14ejducww6o.getExact(win).filter(isCollapsed).bind(toStartRect);
    };
    return getBodyFromFrame(frame).bind(function (body) {
      return getDocFromFrame(frame).bind(function (doc) {
        return getWinFromFrame(frame).map(function (win) {
          var html = $_dqo9uvxfjducwv5k.fromDom(doc.dom().documentElement);
          var getCursorBox = editor.getCursorBox.getOrThunk(function () {
            return function () {
              return $_7w9mrt14ejducww6o.get(win).bind(function (sel) {
                return $_7w9mrt14ejducww6o.getFirstRect(win, sel).orThunk(function () {
                  return tryFallbackBox(win);
                });
              });
            };
          });
          var setSelection = editor.setSelection.getOrThunk(function () {
            return function (start, soffset, finish, foffset) {
              $_7w9mrt14ejducww6o.setExact(win, start, soffset, finish, foffset);
            };
          });
          var clearSelection = editor.clearSelection.getOrThunk(function () {
            return function () {
              $_7w9mrt14ejducww6o.clear(win);
            };
          });
          return {
            body: $_a3rnw0wjjducwv31.constant(body),
            doc: $_a3rnw0wjjducwv31.constant(doc),
            win: $_a3rnw0wjjducwv31.constant(win),
            html: $_a3rnw0wjjducwv31.constant(html),
            getSelection: $_a3rnw0wjjducwv31.curry(getSelectionFromFrame, frame),
            setSelection: setSelection,
            clearSelection: clearSelection,
            frame: $_a3rnw0wjjducwv31.constant(frame),
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
  var $_esrxnf14sjducww8c = {
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
  var isAndroid = $_f3swp0wkjducwv33.detect().os.isAndroid();
  var matchColor = function (editorBody) {
    var color = $_gbl0iz103jducwvgo.get(editorBody, 'background-color');
    return color !== undefined && color !== '' ? 'background-color:' + color + '!important' : bgFallback;
  };
  var clobberStyles = function (container, editorBody) {
    var gatherSibilings = function (element) {
      var siblings = $_7nc35uzvjducwvg0.siblings(element, '*');
      return siblings;
    };
    var clobber = function (clobberStyle) {
      return function (element) {
        var styles = $_6yofxrjducwv6k.get(element, 'style');
        var backup = styles === undefined ? 'no-styles' : styles.trim();
        if (backup === clobberStyle) {
          return;
        } else {
          $_6yofxrjducwv6k.set(element, attr, backup);
          $_6yofxrjducwv6k.set(element, 'style', clobberStyle);
        }
      };
    };
    var ancestors = $_7nc35uzvjducwvg0.ancestors(container, '*');
    var siblings = $_e31jlowsjducwv3m.bind(ancestors, gatherSibilings);
    var bgColor = matchColor(editorBody);
    $_e31jlowsjducwv3m.each(siblings, clobber(siblingStyles));
    $_e31jlowsjducwv3m.each(ancestors, clobber(ancestorPosition + ancestorStyles + bgColor));
    var containerStyles = isAndroid === true ? '' : ancestorPosition;
    clobber(containerStyles + ancestorStyles + bgColor)(container);
  };
  var restoreStyles = function () {
    var clobberedEls = $_7nc35uzvjducwvg0.all('[' + attr + ']');
    $_e31jlowsjducwv3m.each(clobberedEls, function (element) {
      var restore = $_6yofxrjducwv6k.get(element, attr);
      if (restore !== 'no-styles') {
        $_6yofxrjducwv6k.set(element, 'style', restore);
      } else {
        $_6yofxrjducwv6k.remove(element, 'style');
      }
      $_6yofxrjducwv6k.remove(element, attr);
    });
  };
  var $_9qvh9f14tjducww8q = {
    clobberStyles: clobberStyles,
    restoreStyles: restoreStyles
  };

  var tag = function () {
    var head = $_aojb3mzxjducwvg5.first('head').getOrDie();
    var nu = function () {
      var meta = $_dqo9uvxfjducwv5k.fromTag('meta');
      $_6yofxrjducwv6k.set(meta, 'name', 'viewport');
      $_f20r2yx2jducwv4k.append(head, meta);
      return meta;
    };
    var element = $_aojb3mzxjducwvg5.first('meta[name="viewport"]').getOrThunk(nu);
    var backup = $_6yofxrjducwv6k.get(element, 'content');
    var maximize = function () {
      $_6yofxrjducwv6k.set(element, 'content', 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0');
    };
    var restore = function () {
      if (backup !== undefined && backup !== null && backup.length > 0) {
        $_6yofxrjducwv6k.set(element, 'content', backup);
      } else {
        $_6yofxrjducwv6k.set(element, 'content', 'user-scalable=yes');
      }
    };
    return {
      maximize: maximize,
      restore: restore
    };
  };
  var $_c0mcfg14ujducww8w = { tag: tag };

  var create$5 = function (platform, mask) {
    var meta = $_c0mcfg14ujducww8w.tag();
    var androidApi = $_dio8jw12ojducwvva.api();
    var androidEvents = $_dio8jw12ojducwvva.api();
    var enter = function () {
      mask.hide();
      $_6jbzpfynjducwvb2.add(platform.container, $_513f6yzejducwvdz.resolve('fullscreen-maximized'));
      $_6jbzpfynjducwvb2.add(platform.container, $_513f6yzejducwvdz.resolve('android-maximized'));
      meta.maximize();
      $_6jbzpfynjducwvb2.add(platform.body, $_513f6yzejducwvdz.resolve('android-scroll-reload'));
      androidApi.set($_bysno9146jducww5n.setup(platform.win, $_esrxnf14sjducww8c.getWin(platform.editor).getOrDie('no')));
      $_esrxnf14sjducww8c.getActiveApi(platform.editor).each(function (editorApi) {
        $_9qvh9f14tjducww8q.clobberStyles(platform.container, editorApi.body());
        androidEvents.set($_6ecbnj142jducww4u.initEvents(editorApi, platform.toolstrip, platform.alloy));
      });
    };
    var exit = function () {
      meta.restore();
      mask.show();
      $_6jbzpfynjducwvb2.remove(platform.container, $_513f6yzejducwvdz.resolve('fullscreen-maximized'));
      $_6jbzpfynjducwvb2.remove(platform.container, $_513f6yzejducwvdz.resolve('android-maximized'));
      $_9qvh9f14tjducww8q.restoreStyles();
      $_6jbzpfynjducwvb2.remove(platform.body, $_513f6yzejducwvdz.resolve('android-scroll-reload'));
      androidEvents.clear();
      androidApi.clear();
    };
    return {
      enter: enter,
      exit: exit
    };
  };
  var $_680r1f141jducww4r = { create: create$5 };

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
  var $_96lcvv14wjducww99 = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var sketch$10 = function (onView, translate) {
    var memIcon = $_b457j11rjducwvqw.record(Container.sketch({
      dom: $_4j6qzx113jducwvna.dom('<div aria-hidden="true" class="${prefix}-mask-tap-icon"></div>'),
      containerBehaviours: $_drwn8py2jducwv7n.derive([Toggling.config({
          toggleClass: $_513f6yzejducwvdz.resolve('mask-tap-icon-selected'),
          toggleOnExecute: false
        })])
    }));
    var onViewThrottle = $_96lcvv14wjducww99.first(onView, 200);
    return Container.sketch({
      dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-disabled-mask"></div>'),
      components: [Container.sketch({
          dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-content-container"></div>'),
          components: [Button.sketch({
              dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-content-tap-section"></div>'),
              components: [memIcon.asSpec()],
              action: function (button) {
                onViewThrottle.throttle();
              },
              buttonBehaviours: $_drwn8py2jducwv7n.derive([Toggling.config({ toggleClass: $_513f6yzejducwvdz.resolve('mask-tap-icon-selected') })])
            })]
        })]
    });
  };
  var $_fzr4wm14vjducww91 = { sketch: sketch$10 };

  var MobileSchema = $_1cyy8vyejducwva0.objOf([
    $_csfrqy7jducwv8r.strictObjOf('editor', [
      $_csfrqy7jducwv8r.strict('getFrame'),
      $_csfrqy7jducwv8r.option('getBody'),
      $_csfrqy7jducwv8r.option('getDoc'),
      $_csfrqy7jducwv8r.option('getWin'),
      $_csfrqy7jducwv8r.option('getSelection'),
      $_csfrqy7jducwv8r.option('setSelection'),
      $_csfrqy7jducwv8r.option('clearSelection'),
      $_csfrqy7jducwv8r.option('cursorSaver'),
      $_csfrqy7jducwv8r.option('onKeyup'),
      $_csfrqy7jducwv8r.option('onNodeChanged'),
      $_csfrqy7jducwv8r.option('getCursorBox'),
      $_csfrqy7jducwv8r.strict('onDomChanged'),
      $_csfrqy7jducwv8r.defaulted('onTouchContent', $_a3rnw0wjjducwv31.noop),
      $_csfrqy7jducwv8r.defaulted('onTapContent', $_a3rnw0wjjducwv31.noop),
      $_csfrqy7jducwv8r.defaulted('onTouchToolstrip', $_a3rnw0wjjducwv31.noop),
      $_csfrqy7jducwv8r.defaulted('onScrollToCursor', $_a3rnw0wjjducwv31.constant({ unbind: $_a3rnw0wjjducwv31.noop })),
      $_csfrqy7jducwv8r.defaulted('onScrollToElement', $_a3rnw0wjjducwv31.constant({ unbind: $_a3rnw0wjjducwv31.noop })),
      $_csfrqy7jducwv8r.defaulted('onToEditing', $_a3rnw0wjjducwv31.constant({ unbind: $_a3rnw0wjjducwv31.noop })),
      $_csfrqy7jducwv8r.defaulted('onToReading', $_a3rnw0wjjducwv31.constant({ unbind: $_a3rnw0wjjducwv31.noop })),
      $_csfrqy7jducwv8r.defaulted('onToolbarScrollStart', $_a3rnw0wjjducwv31.identity)
    ]),
    $_csfrqy7jducwv8r.strict('socket'),
    $_csfrqy7jducwv8r.strict('toolstrip'),
    $_csfrqy7jducwv8r.strict('dropup'),
    $_csfrqy7jducwv8r.strict('toolbar'),
    $_csfrqy7jducwv8r.strict('container'),
    $_csfrqy7jducwv8r.strict('alloy'),
    $_csfrqy7jducwv8r.state('win', function (spec) {
      return $_375a04x3jducwv4l.owner(spec.socket).dom().defaultView;
    }),
    $_csfrqy7jducwv8r.state('body', function (spec) {
      return $_dqo9uvxfjducwv5k.fromDom(spec.socket.dom().ownerDocument.body);
    }),
    $_csfrqy7jducwv8r.defaulted('translate', $_a3rnw0wjjducwv31.identity),
    $_csfrqy7jducwv8r.defaulted('setReadOnly', $_a3rnw0wjjducwv31.noop)
  ]);

  var produce = function (raw) {
    var mobile = $_1cyy8vyejducwva0.asRawOrDie('Getting AndroidWebapp schema', MobileSchema, raw);
    $_gbl0iz103jducwvgo.set(mobile.toolstrip, 'width', '100%');
    var onTap = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_8ylry212tjducwvwe.build($_fzr4wm14vjducww91.sketch(onTap, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    $_f20r2yx2jducwv4k.append(mobile.container, mask.element());
    var mode = $_680r1f141jducww4r.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: $_a3rnw0wjjducwv31.noop,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_a3rnw0wjjducwv31.noop
    };
  };
  var $_8c6dhu140jducww4l = { produce: produce };

  var schema$14 = [
    $_csfrqy7jducwv8r.defaulted('shell', true),
    $_4ee1oc10ojducwvk5.field('toolbarBehaviours', [Replacing])
  ];
  var enhanceGroups = function (detail) {
    return { behaviours: $_drwn8py2jducwv7n.derive([Replacing.config({})]) };
  };
  var partTypes$1 = [$_9mzgbl10vjducwvli.optional({
      name: 'groups',
      overrides: enhanceGroups
    })];
  var $_dn21ft150jducwwa3 = {
    name: $_a3rnw0wjjducwv31.constant('Toolbar'),
    schema: $_a3rnw0wjjducwv31.constant(schema$14),
    parts: $_a3rnw0wjjducwv31.constant(partTypes$1)
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
      return detail.shell() ? Option.some(component) : $_efrbru10tjducwvky.getPart(component, detail, 'groups');
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
      behaviours: $_5xeczzwyjducwv44.deepMerge($_drwn8py2jducwv7n.derive(extra.behaviours), $_4ee1oc10ojducwvk5.get(detail.toolbarBehaviours())),
      apis: { setGroups: setGroups },
      domModification: { attributes: { role: 'group' } }
    };
  };
  var Toolbar = $_ehwl8210pjducwvkb.composite({
    name: 'Toolbar',
    configFields: $_dn21ft150jducwwa3.schema(),
    partFields: $_dn21ft150jducwwa3.parts(),
    factory: factory$4,
    apis: {
      setGroups: function (apis, toolbar, groups) {
        apis.setGroups(toolbar, groups);
      }
    }
  });

  var schema$15 = [
    $_csfrqy7jducwv8r.strict('items'),
    $_5qmiobz6jducwvco.markers(['itemClass']),
    $_4ee1oc10ojducwvk5.field('tgroupBehaviours', [Keying])
  ];
  var partTypes$2 = [$_9mzgbl10vjducwvli.group({
      name: 'items',
      unit: 'item',
      overrides: function (detail) {
        return { domModification: { classes: [detail.markers().itemClass()] } };
      }
    })];
  var $_g3vmeo152jducwwaa = {
    name: $_a3rnw0wjjducwv31.constant('ToolbarGroup'),
    schema: $_a3rnw0wjjducwv31.constant(schema$15),
    parts: $_a3rnw0wjjducwv31.constant(partTypes$2)
  };

  var factory$5 = function (detail, components, spec, _externals) {
    return $_5xeczzwyjducwv44.deepMerge({ dom: { attributes: { role: 'toolbar' } } }, {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_5xeczzwyjducwv44.deepMerge($_drwn8py2jducwv7n.derive([Keying.config({
          mode: 'flow',
          selector: '.' + detail.markers().itemClass()
        })]), $_4ee1oc10ojducwvk5.get(detail.tgroupBehaviours())),
      'debug.sketcher': spec['debug.sketcher']
    });
  };
  var ToolbarGroup = $_ehwl8210pjducwvkb.composite({
    name: 'ToolbarGroup',
    configFields: $_g3vmeo152jducwwaa.schema(),
    partFields: $_g3vmeo152jducwwaa.parts(),
    factory: factory$5
  });

  var dataHorizontal = 'data-' + $_513f6yzejducwvdz.resolve('horizontal-scroll');
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
    $_6yofxrjducwv6k.set(container, dataHorizontal, 'true');
  };
  var hasScroll = function (container) {
    return $_6yofxrjducwv6k.get(container, dataHorizontal) === 'true' ? hasHorizontalScroll : hasVerticalScroll;
  };
  var exclusive = function (scope, selector) {
    return $_97dmhz13xjducww46.bind(scope, 'touchmove', function (event) {
      $_aojb3mzxjducwvg5.closest(event.target(), selector).filter(hasScroll).fold(function () {
        event.raw().preventDefault();
      }, $_a3rnw0wjjducwv31.noop);
    });
  };
  var $_9h33li153jducwwae = {
    exclusive: exclusive,
    markAsHorizontal: markAsHorizontal
  };

  function ScrollingToolbar () {
    var makeGroup = function (gSpec) {
      var scrollClass = gSpec.scrollable === true ? '${prefix}-toolbar-scrollable-group' : '';
      return {
        dom: $_4j6qzx113jducwvna.dom('<div aria-label="' + gSpec.label + '" class="${prefix}-toolbar-group ' + scrollClass + '"></div>'),
        tgroupBehaviours: $_drwn8py2jducwv7n.derive([$_b8wy59126jducwvss.config('adhoc-scrollable-toolbar', gSpec.scrollable === true ? [$_gd6bsky4jducwv8a.runOnInit(function (component, simulatedEvent) {
              $_gbl0iz103jducwvgo.set(component.element(), 'overflow-x', 'auto');
              $_9h33li153jducwwae.markAsHorizontal(component.element());
              $_4n5bgh13ujducww3p.register(component.element());
            })] : [])]),
        components: [Container.sketch({ components: [ToolbarGroup.parts().items({})] })],
        markers: { itemClass: $_513f6yzejducwvdz.resolve('toolbar-group-item') },
        items: gSpec.items
      };
    };
    var toolbar = $_8ylry212tjducwvwe.build(Toolbar.sketch({
      dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-toolbar"></div>'),
      components: [Toolbar.parts().groups({})],
      toolbarBehaviours: $_drwn8py2jducwv7n.derive([
        Toggling.config({
          toggleClass: $_513f6yzejducwvdz.resolve('context-toolbar'),
          toggleOnExecute: false,
          aria: { mode: 'none' }
        }),
        Keying.config({ mode: 'cyclic' })
      ]),
      shell: true
    }));
    var wrapper = $_8ylry212tjducwvwe.build(Container.sketch({
      dom: { classes: [$_513f6yzejducwvdz.resolve('toolstrip')] },
      components: [$_8ylry212tjducwvwe.premade(toolbar)],
      containerBehaviours: $_drwn8py2jducwv7n.derive([Toggling.config({
          toggleClass: $_513f6yzejducwvdz.resolve('android-selection-context-toolbar'),
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
      return $_e31jlowsjducwv3m.map(gs, $_a3rnw0wjjducwv31.compose(ToolbarGroup.sketch, makeGroup));
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
      wrapper: $_a3rnw0wjjducwv31.constant(wrapper),
      toolbar: $_a3rnw0wjjducwv31.constant(toolbar),
      createGroups: createGroups,
      setGroups: setGroups,
      setContextToolbar: setContextToolbar,
      restoreToolbar: restoreToolbar,
      refresh: refresh,
      focus: focus
    };
  }

  var makeEditSwitch = function (webapp) {
    return $_8ylry212tjducwvwe.build(Button.sketch({
      dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-mask-edit-icon ${prefix}-icon"></div>'),
      action: function () {
        webapp.run(function (w) {
          w.setReadOnly(false);
        });
      }
    }));
  };
  var makeSocket = function () {
    return $_8ylry212tjducwvwe.build(Container.sketch({
      dom: $_4j6qzx113jducwvna.dom('<div class="${prefix}-editor-socket"></div>'),
      components: [],
      containerBehaviours: $_drwn8py2jducwv7n.derive([Replacing.config({})])
    }));
  };
  var showEdit = function (socket, switchToEdit) {
    Replacing.append(socket, $_8ylry212tjducwvwe.premade(switchToEdit));
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
  var $_3w8s9n154jducwwao = {
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
    $_g0t8c9137jducwvzt.remove(root, [
      slideConfig.shrinkingClass(),
      slideConfig.growingClass()
    ]);
  };
  var setShrunk = function (component, slideConfig) {
    $_6jbzpfynjducwvb2.remove(component.element(), slideConfig.openClass());
    $_6jbzpfynjducwvb2.add(component.element(), slideConfig.closedClass());
    $_gbl0iz103jducwvgo.set(component.element(), getDimensionProperty(slideConfig), '0px');
    $_gbl0iz103jducwvgo.reflow(component.element());
  };
  var measureTargetSize = function (component, slideConfig) {
    setGrown(component, slideConfig);
    var expanded = getDimension(slideConfig, component.element());
    setShrunk(component, slideConfig);
    return expanded;
  };
  var setGrown = function (component, slideConfig) {
    $_6jbzpfynjducwvb2.remove(component.element(), slideConfig.closedClass());
    $_6jbzpfynjducwvb2.add(component.element(), slideConfig.openClass());
    $_gbl0iz103jducwvgo.remove(component.element(), getDimensionProperty(slideConfig));
  };
  var doImmediateShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_gbl0iz103jducwvgo.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_gbl0iz103jducwvgo.reflow(component.element());
    disableTransitions(component, slideConfig);
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
    slideConfig.onShrunk()(component);
  };
  var doStartShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_gbl0iz103jducwvgo.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_gbl0iz103jducwvgo.reflow(component.element());
    var root = getAnimationRoot(component, slideConfig);
    $_6jbzpfynjducwvb2.add(root, slideConfig.shrinkingClass());
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
  };
  var doStartGrow = function (component, slideConfig, slideState) {
    var fullSize = measureTargetSize(component, slideConfig);
    var root = getAnimationRoot(component, slideConfig);
    $_6jbzpfynjducwvb2.add(root, slideConfig.growingClass());
    setGrown(component, slideConfig);
    $_gbl0iz103jducwvgo.set(component.element(), getDimensionProperty(slideConfig), fullSize);
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
    return $_6jbzpfynjducwvb2.has(root, slideConfig.growingClass()) === true;
  };
  var isShrinking = function (component, slideConfig, slideState) {
    var root = getAnimationRoot(component, slideConfig);
    return $_6jbzpfynjducwvb2.has(root, slideConfig.shrinkingClass()) === true;
  };
  var isTransitioning = function (component, slideConfig, slideState) {
    return isGrowing(component, slideConfig, slideState) === true || isShrinking(component, slideConfig, slideState) === true;
  };
  var toggleGrow = function (component, slideConfig, slideState) {
    var f = slideState.isExpanded() ? doStartShrink : doStartGrow;
    f(component, slideConfig, slideState);
  };
  var $_dvxof158jducwwbc = {
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
    return expanded ? $_5ldw5hyhjducwvac.nu({
      classes: [slideConfig.openClass()],
      styles: {}
    }) : $_5ldw5hyhjducwvac.nu({
      classes: [slideConfig.closedClass()],
      styles: $_e7rlwgxsjducwv6r.wrap(slideConfig.dimension().property(), '0px')
    });
  };
  var events$9 = function (slideConfig, slideState) {
    return $_gd6bsky4jducwv8a.derive([$_gd6bsky4jducwv8a.run($_cp12t3wijducwv2w.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        if (raw.propertyName === slideConfig.dimension().property()) {
          $_dvxof158jducwwbc.disableTransitions(component, slideConfig, slideState);
          if (slideState.isExpanded())
            $_gbl0iz103jducwvgo.remove(component.element(), slideConfig.dimension().property());
          var notify = slideState.isExpanded() ? slideConfig.onGrown() : slideConfig.onShrunk();
          notify(component, simulatedEvent);
        }
      })]);
  };
  var $_gixpmu157jducwwb7 = {
    exhibit: exhibit$5,
    events: events$9
  };

  var SlidingSchema = [
    $_csfrqy7jducwv8r.strict('closedClass'),
    $_csfrqy7jducwv8r.strict('openClass'),
    $_csfrqy7jducwv8r.strict('shrinkingClass'),
    $_csfrqy7jducwv8r.strict('growingClass'),
    $_csfrqy7jducwv8r.option('getAnimationRoot'),
    $_5qmiobz6jducwvco.onHandler('onShrunk'),
    $_5qmiobz6jducwvco.onHandler('onStartShrink'),
    $_5qmiobz6jducwvco.onHandler('onGrown'),
    $_5qmiobz6jducwvco.onHandler('onStartGrow'),
    $_csfrqy7jducwv8r.defaulted('expanded', false),
    $_csfrqy7jducwv8r.strictOf('dimension', $_1cyy8vyejducwva0.choose('property', {
      width: [
        $_5qmiobz6jducwvco.output('property', 'width'),
        $_5qmiobz6jducwvco.output('getDimension', function (elem) {
          return $_vvvkn11kjducwvpt.get(elem) + 'px';
        })
      ],
      height: [
        $_5qmiobz6jducwvco.output('property', 'height'),
        $_5qmiobz6jducwvco.output('getDimension', function (elem) {
          return $_giaj1z102jducwvgm.get(elem) + 'px';
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
      setCollapsed: $_a3rnw0wjjducwv31.curry(state.set, false),
      setExpanded: $_a3rnw0wjjducwv31.curry(state.set, true),
      readState: readState
    });
  };
  var $_8pzhwd15ajducwwbp = { init: init$4 };

  var Sliding = $_drwn8py2jducwv7n.create({
    fields: SlidingSchema,
    name: 'sliding',
    active: $_gixpmu157jducwwb7,
    apis: $_dvxof158jducwwbc,
    state: $_8pzhwd15ajducwwbp
  });

  var build$2 = function (refresh, scrollIntoView) {
    var dropup = $_8ylry212tjducwvwe.build(Container.sketch({
      dom: {
        tag: 'div',
        classes: $_513f6yzejducwvdz.resolve('dropup')
      },
      components: [],
      containerBehaviours: $_drwn8py2jducwv7n.derive([
        Replacing.config({}),
        Sliding.config({
          closedClass: $_513f6yzejducwvdz.resolve('dropup-closed'),
          openClass: $_513f6yzejducwvdz.resolve('dropup-open'),
          shrinkingClass: $_513f6yzejducwvdz.resolve('dropup-shrinking'),
          growingClass: $_513f6yzejducwvdz.resolve('dropup-growing'),
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
        $_6h7r9izdjducwvdv.orientation(function (component, data) {
          disappear($_a3rnw0wjjducwv31.noop);
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
      component: $_a3rnw0wjjducwv31.constant(dropup),
      element: dropup.element
    };
  };
  var $_4z785f155jducwwaw = { build: build$2 };

  var isDangerous = function (event) {
    return event.raw().which === $_7xkdypzpjducwvfa.BACKSPACE()[0] && !$_e31jlowsjducwv3m.contains([
      'input',
      'textarea'
    ], $_en9ft8xkjducwv5x.name(event.target()));
  };
  var isFirefox = $_f3swp0wkjducwv33.detect().browser.isFirefox();
  var settingsSchema = $_1cyy8vyejducwva0.objOfOnly([
    $_csfrqy7jducwv8r.strictFunction('triggerEvent'),
    $_csfrqy7jducwv8r.strictFunction('broadcastEvent'),
    $_csfrqy7jducwv8r.defaulted('stopBackspace', true)
  ]);
  var bindFocus = function (container, handler) {
    if (isFirefox) {
      return $_97dmhz13xjducww46.capture(container, 'focus', handler);
    } else {
      return $_97dmhz13xjducww46.bind(container, 'focusin', handler);
    }
  };
  var bindBlur = function (container, handler) {
    if (isFirefox) {
      return $_97dmhz13xjducww46.capture(container, 'blur', handler);
    } else {
      return $_97dmhz13xjducww46.bind(container, 'focusout', handler);
    }
  };
  var setup$2 = function (container, rawSettings) {
    var settings = $_1cyy8vyejducwva0.asRawOrDie('Getting GUI events settings', settingsSchema, rawSettings);
    var pointerEvents = $_f3swp0wkjducwv33.detect().deviceType.isTouch() ? [
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
    var tapEvent = $_dgqkm1144jducww5c.monitor(settings);
    var simpleEvents = $_e31jlowsjducwv3m.map(pointerEvents.concat([
      'selectstart',
      'input',
      'contextmenu',
      'change',
      'transitionend',
      'dragstart',
      'dragover',
      'drop'
    ]), function (type) {
      return $_97dmhz13xjducww46.bind(container, type, function (event) {
        tapEvent.fireIfReady(event, type).each(function (tapStopped) {
          if (tapStopped)
            event.kill();
        });
        var stopped = settings.triggerEvent(type, event);
        if (stopped)
          event.kill();
      });
    });
    var onKeydown = $_97dmhz13xjducww46.bind(container, 'keydown', function (event) {
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
        settings.triggerEvent($_c92nqswhjducwv2r.postBlur(), event);
      }, 0);
    });
    var defaultView = $_375a04x3jducwv4l.defaultView(container);
    var onWindowScroll = $_97dmhz13xjducww46.bind(defaultView, 'scroll', function (event) {
      var stopped = settings.broadcastEvent($_c92nqswhjducwv2r.windowScroll(), event);
      if (stopped)
        event.kill();
    });
    var unbind = function () {
      $_e31jlowsjducwv3m.each(simpleEvents, function (e) {
        e.unbind();
      });
      onKeydown.unbind();
      onFocusIn.unbind();
      onFocusOut.unbind();
      onWindowScroll.unbind();
    };
    return { unbind: unbind };
  };
  var $_9qixk915djducwwcg = { setup: setup$2 };

  var derive$3 = function (rawEvent, rawTarget) {
    var source = $_e7rlwgxsjducwv6r.readOptFrom(rawEvent, 'target').map(function (getTarget) {
      return getTarget();
    }).getOr(rawTarget);
    return Cell(source);
  };
  var $_qq19u15fjducwwd2 = { derive: derive$3 };

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
      event: $_a3rnw0wjjducwv31.constant(event),
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
      cut: $_a3rnw0wjjducwv31.noop,
      isStopped: stopper.get,
      isCut: $_a3rnw0wjjducwv31.constant(false),
      event: $_a3rnw0wjjducwv31.constant(event),
      setTarget: $_a3rnw0wjjducwv31.die(new Error('Cannot set target of a broadcasted event')),
      getTarget: $_a3rnw0wjjducwv31.die(new Error('Cannot get target of a broadcasted event'))
    };
  };
  var fromTarget = function (event, target) {
    var source = Cell(target);
    return fromSource(event, source);
  };
  var $_dpboee15gjducwwd6 = {
    fromSource: fromSource,
    fromExternal: fromExternal,
    fromTarget: fromTarget
  };

  var adt$6 = $_dmy3o8xwjducwv7a.generate([
    { stopped: [] },
    { resume: ['element'] },
    { complete: [] }
  ]);
  var doTriggerHandler = function (lookup, eventType, rawEvent, target, source, logger) {
    var handler = lookup(eventType, target);
    var simulatedEvent = $_dpboee15gjducwwd6.fromSource(rawEvent, source);
    return handler.fold(function () {
      logger.logEventNoHandlers(eventType, target);
      return adt$6.complete();
    }, function (handlerInfo) {
      var descHandler = handlerInfo.descHandler();
      var eventHandler = $_3eyavb134jducwvz0.getHandler(descHandler);
      eventHandler(simulatedEvent);
      if (simulatedEvent.isStopped()) {
        logger.logEventStopped(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.stopped();
      } else if (simulatedEvent.isCut()) {
        logger.logEventCut(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.complete();
      } else
        return $_375a04x3jducwv4l.parent(handlerInfo.element()).fold(function () {
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
    var source = $_qq19u15fjducwwd2.derive(rawEvent, target);
    return doTriggerHandler(lookup, eventType, rawEvent, target, source, logger);
  };
  var broadcast = function (listeners, rawEvent, logger) {
    var simulatedEvent = $_dpboee15gjducwwd6.fromExternal(rawEvent);
    $_e31jlowsjducwv3m.each(listeners, function (listener) {
      var descHandler = listener.descHandler();
      var handler = $_3eyavb134jducwvz0.getHandler(descHandler);
      handler(simulatedEvent);
    });
    return simulatedEvent.isStopped();
  };
  var triggerUntilStopped = function (lookup, eventType, rawEvent, logger) {
    var rawTarget = rawEvent.target();
    return triggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, logger);
  };
  var triggerOnUntilStopped = function (lookup, eventType, rawEvent, rawTarget, logger) {
    var source = $_qq19u15fjducwwd2.derive(rawEvent, rawTarget);
    return doTriggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, source, logger);
  };
  var $_2tepoq15ejducwwcx = {
    triggerHandler: triggerHandler,
    triggerUntilStopped: triggerUntilStopped,
    triggerOnUntilStopped: triggerOnUntilStopped,
    broadcast: broadcast
  };

  var closest$4 = function (target, transform, isRoot) {
    var delegate = $_1w3f5syvjducwvbi.closest(target, function (elem) {
      return transform(elem).isSome();
    }, isRoot);
    return delegate.bind(transform);
  };
  var $_cf7gfc15jjducwwdn = { closest: closest$4 };

  var eventHandler = $_73sv11x4jducwv4t.immutable('element', 'descHandler');
  var messageHandler = function (id, handler) {
    return {
      id: $_a3rnw0wjjducwv31.constant(id),
      descHandler: $_a3rnw0wjjducwv31.constant(handler)
    };
  };
  function EventRegistry () {
    var registry = {};
    var registerId = function (extraArgs, id, events) {
      $_2vh9dzx0jducwv47.each(events, function (v, k) {
        var handlers = registry[k] !== undefined ? registry[k] : {};
        handlers[id] = $_3eyavb134jducwvz0.curryArgs(v, extraArgs);
        registry[k] = handlers;
      });
    };
    var findHandler = function (handlers, elem) {
      return $_803ea810xjducwvmd.read(elem).fold(function (err) {
        return Option.none();
      }, function (id) {
        var reader = $_e7rlwgxsjducwv6r.readOpt(id);
        return handlers.bind(reader).map(function (descHandler) {
          return eventHandler(elem, descHandler);
        });
      });
    };
    var filterByType = function (type) {
      return $_e7rlwgxsjducwv6r.readOptFrom(registry, type).map(function (handlers) {
        return $_2vh9dzx0jducwv47.mapToArray(handlers, function (f, id) {
          return messageHandler(id, f);
        });
      }).getOr([]);
    };
    var find = function (isAboveRoot, type, target) {
      var readType = $_e7rlwgxsjducwv6r.readOpt(type);
      var handlers = readType(registry);
      return $_cf7gfc15jjducwwdn.closest(target, function (elem) {
        return findHandler(handlers, elem);
      }, isAboveRoot);
    };
    var unregisterId = function (id) {
      $_2vh9dzx0jducwv47.each(registry, function (handlersById, eventName) {
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
      return $_803ea810xjducwvmd.read(elem).fold(function () {
        return $_803ea810xjducwvmd.write('uid-', component.element());
      }, function (uid) {
        return uid;
      });
    };
    var failOnDuplicate = function (component, tagId) {
      var conflict = components[tagId];
      if (conflict === component)
        unregister(component);
      else
        throw new Error('The tagId "' + tagId + '" is already used by: ' + $_9uv2jrxmjducwv68.element(conflict.element()) + '\nCannot use it for: ' + $_9uv2jrxmjducwv68.element(component.element()) + '\n' + 'The conflicting element is' + ($_8em3sbxjjducwv5v.inBody(conflict.element()) ? ' ' : ' not ') + 'already in the DOM');
    };
    var register = function (component) {
      var tagId = readOrTag(component);
      if ($_e7rlwgxsjducwv6r.hasKey(components, tagId))
        failOnDuplicate(component, tagId);
      var extraArgs = [component];
      events.registerId(extraArgs, tagId, component.events());
      components[tagId] = component;
    };
    var unregister = function (component) {
      $_803ea810xjducwvmd.read(component.element()).each(function (tagId) {
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
      return $_e7rlwgxsjducwv6r.readOpt(id)(components);
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
    var root = $_8ylry212tjducwvwe.build(Container.sketch({ dom: { tag: 'div' } }));
    return takeover(root);
  };
  var takeover = function (root) {
    var isAboveRoot = function (el) {
      return $_375a04x3jducwv4l.parent(root.element()).fold(function () {
        return true;
      }, function (parent) {
        return $_3u3sm2x9jducwv54.eq(el, parent);
      });
    };
    var registry = Registry();
    var lookup = function (eventName, target) {
      return registry.find(isAboveRoot, eventName, target);
    };
    var domEvents = $_9qixk915djducwwcg.setup(root.element(), {
      triggerEvent: function (eventName, event) {
        return $_9i75u4xljducwv5z.monitorEvent(eventName, event.target(), function (logger) {
          return $_2tepoq15ejducwwcx.triggerUntilStopped(lookup, eventName, event, logger);
        });
      },
      broadcastEvent: function (eventName, event) {
        var listeners = registry.filter(eventName);
        return $_2tepoq15ejducwwcx.broadcast(listeners, event);
      }
    });
    var systemApi = SystemApi({
      debugInfo: $_a3rnw0wjjducwv31.constant('real'),
      triggerEvent: function (customType, target, data) {
        $_9i75u4xljducwv5z.monitorEvent(customType, target, function (logger) {
          $_2tepoq15ejducwwcx.triggerOnUntilStopped(lookup, customType, data, target, logger);
        });
      },
      triggerFocus: function (target, originator) {
        $_803ea810xjducwvmd.read(target).fold(function () {
          $_3hn9p4ytjducwvbd.focus(target);
        }, function (_alloyId) {
          $_9i75u4xljducwv5z.monitorEvent($_c92nqswhjducwv2r.focus(), target, function (logger) {
            $_2tepoq15ejducwwcx.triggerHandler(lookup, $_c92nqswhjducwv2r.focus(), {
              originator: $_a3rnw0wjjducwv31.constant(originator),
              target: $_a3rnw0wjjducwv31.constant(target)
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
      build: $_8ylry212tjducwvwe.build,
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
      if (!$_en9ft8xkjducwv5x.isText(component.element())) {
        registry.register(component);
        $_e31jlowsjducwv3m.each(component.components(), addToWorld);
        systemApi.triggerEvent($_c92nqswhjducwv2r.systemInit(), component.element(), { target: $_a3rnw0wjjducwv31.constant(component.element()) });
      }
    };
    var removeFromWorld = function (component) {
      if (!$_en9ft8xkjducwv5x.isText(component.element())) {
        $_e31jlowsjducwv3m.each(component.components(), removeFromWorld);
        registry.unregister(component);
      }
      component.disconnect();
    };
    var add = function (component) {
      $_8dj4zcx1jducwv49.attach(root, component);
    };
    var remove = function (component) {
      $_8dj4zcx1jducwv49.detach(component);
    };
    var destroy = function () {
      domEvents.unbind();
      $_cdnwblxhjducwv5p.remove(root.element());
    };
    var broadcastData = function (data) {
      var receivers = registry.filter($_c92nqswhjducwv2r.receive());
      $_e31jlowsjducwv3m.each(receivers, function (receiver) {
        var descHandler = receiver.descHandler();
        var handler = $_3eyavb134jducwvz0.getHandler(descHandler);
        handler(data);
      });
    };
    var broadcast = function (message) {
      broadcastData({
        universal: $_a3rnw0wjjducwv31.constant(true),
        data: $_a3rnw0wjjducwv31.constant(message)
      });
    };
    var broadcastOn = function (channels, message) {
      broadcastData({
        universal: $_a3rnw0wjjducwv31.constant(false),
        channels: $_a3rnw0wjjducwv31.constant(channels),
        data: $_a3rnw0wjjducwv31.constant(message)
      });
    };
    var getByUid = function (uid) {
      return registry.getById(uid).fold(function () {
        return Result.error(new Error('Could not find component with uid: "' + uid + '" in system.'));
      }, Result.value);
    };
    var getByDom = function (elem) {
      return $_803ea810xjducwvmd.read(elem).bind(getByUid);
    };
    addToWorld(root);
    return {
      root: $_a3rnw0wjjducwv31.constant(root),
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
  var $_2jxo7515cjducwwc0 = {
    create: create$6,
    takeover: takeover
  };

  var READ_ONLY_MODE_CLASS = $_a3rnw0wjjducwv31.constant($_513f6yzejducwvdz.resolve('readonly-mode'));
  var EDIT_MODE_CLASS = $_a3rnw0wjjducwv31.constant($_513f6yzejducwvdz.resolve('edit-mode'));
  function OuterContainer (spec) {
    var root = $_8ylry212tjducwvwe.build(Container.sketch({
      dom: { classes: [$_513f6yzejducwvdz.resolve('outer-container')].concat(spec.classes) },
      containerBehaviours: $_drwn8py2jducwv7n.derive([Swapping.config({
          alpha: READ_ONLY_MODE_CLASS(),
          omega: EDIT_MODE_CLASS()
        })])
    }));
    return $_2jxo7515cjducwwc0.takeover(root);
  }

  function AndroidRealm (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_513f6yzejducwvdz.resolve('android-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_dio8jw12ojducwvva.api();
    var switchToEdit = $_3w8s9n154jducwwao.makeEditSwitch(webapp);
    var socket = $_3w8s9n154jducwwao.makeSocket();
    var dropup = $_4z785f155jducwwaw.build($_a3rnw0wjjducwv31.noop, scrollIntoView);
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
      webapp.set($_8c6dhu140jducww4l.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        w.exit();
        Replacing.remove(socket, switchToEdit);
      });
    };
    var updateMode = function (readOnly) {
      $_3w8s9n154jducwwao.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_a3rnw0wjjducwv31.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_a3rnw0wjjducwv31.constant(socket),
      dropup: $_a3rnw0wjjducwv31.constant(dropup)
    };
  }

  var input = function (parent, operation) {
    var input = $_dqo9uvxfjducwv5k.fromTag('input');
    $_gbl0iz103jducwvgo.setAll(input, {
      opacity: '0',
      position: 'absolute',
      top: '-1000px',
      left: '-1000px'
    });
    $_f20r2yx2jducwv4k.append(parent, input);
    $_3hn9p4ytjducwvbd.focus(input);
    operation(input);
    $_cdnwblxhjducwv5p.remove(input);
  };
  var $_fz5w0h15ojducwweh = { input: input };

  var refreshInput = function (input) {
    var start = input.dom().selectionStart;
    var end = input.dom().selectionEnd;
    var dir = input.dom().selectionDirection;
    setTimeout(function () {
      input.dom().setSelectionRange(start, end, dir);
      $_3hn9p4ytjducwvbd.focus(input);
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
  var $_8amhjb15qjducwweu = {
    refreshInput: refreshInput,
    refresh: refresh
  };

  var resume$1 = function (cWin, frame) {
    $_3hn9p4ytjducwvbd.active().each(function (active) {
      if (!$_3u3sm2x9jducwv54.eq(active, frame)) {
        $_3hn9p4ytjducwvbd.blur(active);
      }
    });
    cWin.focus();
    $_3hn9p4ytjducwvbd.focus($_dqo9uvxfjducwv5k.fromDom(cWin.document.body));
    $_8amhjb15qjducwweu.refresh(cWin);
  };
  var $_c61o9g15pjducwweq = { resume: resume$1 };

  var stubborn = function (outerBody, cWin, page, frame) {
    var toEditing = function () {
      $_c61o9g15pjducwweq.resume(cWin, frame);
    };
    var toReading = function () {
      $_fz5w0h15ojducwweh.input(outerBody, $_3hn9p4ytjducwvbd.blur);
    };
    var captureInput = $_97dmhz13xjducww46.bind(page, 'keydown', function (evt) {
      if (!$_e31jlowsjducwv3m.contains([
          'input',
          'textarea'
        ], $_en9ft8xkjducwv5x.name(evt.target()))) {
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
      $_3hn9p4ytjducwvbd.blur(frame);
    };
    var onToolbarTouch = function () {
      dismissKeyboard();
    };
    var toReading = function () {
      dismissKeyboard();
    };
    var toEditing = function () {
      $_c61o9g15pjducwweq.resume(cWin, frame);
    };
    return {
      toReading: toReading,
      toEditing: toEditing,
      onToolbarTouch: onToolbarTouch,
      destroy: $_a3rnw0wjjducwv31.noop
    };
  };
  var $_b6wnf415njducwweb = {
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
      var toolbarHeight = $_giaj1z102jducwvgm.get(toolstrip);
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
    var tapping = $_ku3nt143jducww58.monitor(editorApi);
    var refreshThrottle = $_96lcvv14wjducww99.last(refreshView, 300);
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
      $_97dmhz13xjducww46.bind(editorApi.doc(), 'touchend', function (touchEvent) {
        if ($_3u3sm2x9jducwv54.eq(editorApi.html(), touchEvent.target()) || $_3u3sm2x9jducwv54.eq(editorApi.body(), touchEvent.target())) {
        }
      }),
      $_97dmhz13xjducww46.bind(toolstrip, 'transitionend', function (transitionEvent) {
        if (transitionEvent.raw().propertyName === 'height') {
          reposition();
        }
      }),
      $_97dmhz13xjducww46.capture(toolstrip, 'touchstart', function (touchEvent) {
        saveSelectionFirst();
        onToolbarTouch(touchEvent);
        editorApi.onTouchToolstrip();
      }),
      $_97dmhz13xjducww46.bind(editorApi.body(), 'touchstart', function (evt) {
        clearSelection();
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_97dmhz13xjducww46.bind(editorApi.body(), 'click', function (event) {
        event.kill();
      }),
      $_97dmhz13xjducww46.bind(toolstrip, 'touchmove', function () {
        editorApi.onToolbarScrollStart();
      })
    ];
    var destroy = function () {
      $_e31jlowsjducwv3m.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_7ljqfd15rjducwwex = { initEvents: initEvents$1 };

  function FakeSelection (win, frame) {
    var doc = win.document;
    var container = $_dqo9uvxfjducwv5k.fromTag('div');
    $_6jbzpfynjducwvb2.add(container, $_513f6yzejducwvdz.resolve('unfocused-selections'));
    $_f20r2yx2jducwv4k.append($_dqo9uvxfjducwv5k.fromDom(doc.documentElement), container);
    var onTouch = $_97dmhz13xjducww46.bind(container, 'touchstart', function (event) {
      event.prevent();
      $_c61o9g15pjducwweq.resume(win, frame);
      clear();
    });
    var make = function (rectangle) {
      var span = $_dqo9uvxfjducwv5k.fromTag('span');
      $_g0t8c9137jducwvzt.add(span, [
        $_513f6yzejducwvdz.resolve('layer-editor'),
        $_513f6yzejducwvdz.resolve('unfocused-selection')
      ]);
      $_gbl0iz103jducwvgo.setAll(span, {
        left: rectangle.left() + 'px',
        top: rectangle.top() + 'px',
        width: rectangle.width() + 'px',
        height: rectangle.height() + 'px'
      });
      return span;
    };
    var update = function () {
      clear();
      var rectangles = $_e09bwx148jducww5x.getRectangles(win);
      var spans = $_e31jlowsjducwv3m.map(rectangles, make);
      $_f9ml5kxijducwv5s.append(container, spans);
    };
    var clear = function () {
      $_cdnwblxhjducwv5p.empty(container);
    };
    var destroy = function () {
      onTouch.unbind();
      $_cdnwblxhjducwv5p.remove(container);
    };
    var isActive = function () {
      return $_375a04x3jducwv4l.children(container).length > 0;
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
      $_e31jlowsjducwv3m.each(cbs, call);
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
  var $_6ayhoz15xjducwwg5 = { bounce: bounce };

  var nu$9 = function (baseFn) {
    var get = function (callback) {
      baseFn($_6ayhoz15xjducwwg5.bounce(callback));
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
  var $_d8zcmb15yjducwwg7 = {
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
    return $_4d6y5ey0jducwv7l.findMap(devices, function (device) {
      return deviceWidth <= device.width && deviceHeight <= device.height ? Option.some(device.keyboard) : Option.none();
    }).getOr({
      portrait: deviceHeight / 5,
      landscape: deviceWidth / 4
    });
  };
  var $_b0vqco161jducwwgw = { findDevice: findDevice };

  var softKeyboardLimits = function (outerWindow) {
    return $_b0vqco161jducwwgw.findDevice(outerWindow.screen.width, outerWindow.screen.height);
  };
  var accountableKeyboardHeight = function (outerWindow) {
    var portrait = $_4nntl513wjducww3x.get(outerWindow).isPortrait();
    var limits = softKeyboardLimits(outerWindow);
    var keyboard = portrait ? limits.portrait : limits.landscape;
    var visualScreenHeight = portrait ? outerWindow.screen.height : outerWindow.screen.width;
    return visualScreenHeight - outerWindow.innerHeight > keyboard ? 0 : keyboard;
  };
  var getGreenzone = function (socket, dropup) {
    var outerWindow = $_375a04x3jducwv4l.owner(socket).dom().defaultView;
    var viewportHeight = $_giaj1z102jducwvgm.get(socket) + $_giaj1z102jducwvgm.get(dropup);
    var acc = accountableKeyboardHeight(outerWindow);
    return viewportHeight - acc;
  };
  var updatePadding = function (contentBody, socket, dropup) {
    var greenzoneHeight = getGreenzone(socket, dropup);
    var deltaHeight = $_giaj1z102jducwvgm.get(socket) + $_giaj1z102jducwvgm.get(dropup) - greenzoneHeight;
    $_gbl0iz103jducwvgo.set(contentBody, 'padding-bottom', deltaHeight + 'px');
  };
  var $_7mwik3160jducwwgr = {
    getGreenzone: getGreenzone,
    updatePadding: updatePadding
  };

  var fixture = $_dmy3o8xwjducwv7a.generate([
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
  var yFixedData = 'data-' + $_513f6yzejducwvdz.resolve('position-y-fixed');
  var yFixedProperty = 'data-' + $_513f6yzejducwvdz.resolve('y-property');
  var yScrollingData = 'data-' + $_513f6yzejducwvdz.resolve('scrolling');
  var windowSizeData = 'data-' + $_513f6yzejducwvdz.resolve('last-window-height');
  var getYFixedData = function (element) {
    return $_ffblkk147jducww5v.safeParse(element, yFixedData);
  };
  var getYFixedProperty = function (element) {
    return $_6yofxrjducwv6k.get(element, yFixedProperty);
  };
  var getLastWindowSize = function (element) {
    return $_ffblkk147jducww5v.safeParse(element, windowSizeData);
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
    var classifier = $_6yofxrjducwv6k.get(element, yScrollingData) === 'true' ? classifyScrolling : classifyFixed;
    return classifier(element, offsetY);
  };
  var findFixtures = function (container) {
    var candidates = $_7nc35uzvjducwvg0.descendants(container, '[' + yFixedData + ']');
    return $_e31jlowsjducwv3m.map(candidates, classify);
  };
  var takeoverToolbar = function (toolbar) {
    var oldToolbarStyle = $_6yofxrjducwv6k.get(toolbar, 'style');
    $_gbl0iz103jducwvgo.setAll(toolbar, {
      position: 'absolute',
      top: '0px'
    });
    $_6yofxrjducwv6k.set(toolbar, yFixedData, '0px');
    $_6yofxrjducwv6k.set(toolbar, yFixedProperty, 'top');
    var restore = function () {
      $_6yofxrjducwv6k.set(toolbar, 'style', oldToolbarStyle || '');
      $_6yofxrjducwv6k.remove(toolbar, yFixedData);
      $_6yofxrjducwv6k.remove(toolbar, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverViewport = function (toolbarHeight, height, viewport) {
    var oldViewportStyle = $_6yofxrjducwv6k.get(viewport, 'style');
    $_4n5bgh13ujducww3p.register(viewport);
    $_gbl0iz103jducwvgo.setAll(viewport, {
      position: 'absolute',
      height: height + 'px',
      width: '100%',
      top: toolbarHeight + 'px'
    });
    $_6yofxrjducwv6k.set(viewport, yFixedData, toolbarHeight + 'px');
    $_6yofxrjducwv6k.set(viewport, yScrollingData, 'true');
    $_6yofxrjducwv6k.set(viewport, yFixedProperty, 'top');
    var restore = function () {
      $_4n5bgh13ujducww3p.deregister(viewport);
      $_6yofxrjducwv6k.set(viewport, 'style', oldViewportStyle || '');
      $_6yofxrjducwv6k.remove(viewport, yFixedData);
      $_6yofxrjducwv6k.remove(viewport, yScrollingData);
      $_6yofxrjducwv6k.remove(viewport, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverDropup = function (dropup, toolbarHeight, viewportHeight) {
    var oldDropupStyle = $_6yofxrjducwv6k.get(dropup, 'style');
    $_gbl0iz103jducwvgo.setAll(dropup, {
      position: 'absolute',
      bottom: '0px'
    });
    $_6yofxrjducwv6k.set(dropup, yFixedData, '0px');
    $_6yofxrjducwv6k.set(dropup, yFixedProperty, 'bottom');
    var restore = function () {
      $_6yofxrjducwv6k.set(dropup, 'style', oldDropupStyle || '');
      $_6yofxrjducwv6k.remove(dropup, yFixedData);
      $_6yofxrjducwv6k.remove(dropup, yFixedProperty);
    };
    return { restore: restore };
  };
  var deriveViewportHeight = function (viewport, toolbarHeight, dropupHeight) {
    var outerWindow = $_375a04x3jducwv4l.owner(viewport).dom().defaultView;
    var winH = outerWindow.innerHeight;
    $_6yofxrjducwv6k.set(viewport, windowSizeData, winH + 'px');
    return winH - toolbarHeight - dropupHeight;
  };
  var takeover$1 = function (viewport, contentBody, toolbar, dropup) {
    var outerWindow = $_375a04x3jducwv4l.owner(viewport).dom().defaultView;
    var toolbarSetup = takeoverToolbar(toolbar);
    var toolbarHeight = $_giaj1z102jducwvgm.get(toolbar);
    var dropupHeight = $_giaj1z102jducwvgm.get(dropup);
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
        var newToolbarHeight = $_giaj1z102jducwvgm.get(toolbar);
        var dropupHeight_1 = $_giaj1z102jducwvgm.get(dropup);
        var newHeight = deriveViewportHeight(viewport, newToolbarHeight, dropupHeight_1);
        $_6yofxrjducwv6k.set(viewport, yFixedData, newToolbarHeight + 'px');
        $_gbl0iz103jducwvgo.set(viewport, 'height', newHeight + 'px');
        $_gbl0iz103jducwvgo.set(dropup, 'bottom', -(newToolbarHeight + newHeight + dropupHeight_1) + 'px');
        $_7mwik3160jducwwgr.updatePadding(contentBody, viewport, dropup);
      }
    };
    var setViewportOffset = function (newYOffset) {
      var offsetPx = newYOffset + 'px';
      $_6yofxrjducwv6k.set(viewport, yFixedData, offsetPx);
      refresh();
    };
    $_7mwik3160jducwwgr.updatePadding(contentBody, viewport, dropup);
    return {
      setViewportOffset: setViewportOffset,
      isExpanding: isExpanding,
      isShrinking: $_a3rnw0wjjducwv31.not(isExpanding),
      refresh: refresh,
      restore: restore
    };
  };
  var $_ro20315zjducwwga = {
    findFixtures: findFixtures,
    takeover: takeover$1,
    getYFixedData: getYFixedData
  };

  var animator = $_d8zcmb15yjducwwg7.create();
  var ANIMATION_STEP = 15;
  var NUM_TOP_ANIMATION_FRAMES = 10;
  var ANIMATION_RATE = 10;
  var lastScroll = 'data-' + $_513f6yzejducwvdz.resolve('last-scroll-top');
  var getTop = function (element) {
    var raw = $_gbl0iz103jducwvgo.getRaw(element, 'top').getOr(0);
    return parseInt(raw, 10);
  };
  var getScrollTop = function (element) {
    return parseInt(element.dom().scrollTop, 10);
  };
  var moveScrollAndTop = function (element, destination, finalTop) {
    return Future.nu(function (callback) {
      var getCurrent = $_a3rnw0wjjducwv31.curry(getScrollTop, element);
      var update = function (newScroll) {
        element.dom().scrollTop = newScroll;
        $_gbl0iz103jducwvgo.set(element, 'top', getTop(element) + ANIMATION_STEP + 'px');
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_gbl0iz103jducwvgo.set(element, 'top', finalTop + 'px');
        callback(destination);
      };
      animator.animate(getCurrent, destination, ANIMATION_STEP, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyScroll = function (element, destination) {
    return Future.nu(function (callback) {
      var getCurrent = $_a3rnw0wjjducwv31.curry(getScrollTop, element);
      $_6yofxrjducwv6k.set(element, lastScroll, getCurrent());
      var update = function (newScroll, abort) {
        var previous = $_ffblkk147jducww5v.safeParse(element, lastScroll);
        if (previous !== element.dom().scrollTop) {
          abort(element.dom().scrollTop);
        } else {
          element.dom().scrollTop = newScroll;
          $_6yofxrjducwv6k.set(element, lastScroll, newScroll);
        }
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_6yofxrjducwv6k.set(element, lastScroll, destination);
        callback(destination);
      };
      var distance = Math.abs(destination - getCurrent());
      var step = Math.ceil(distance / NUM_TOP_ANIMATION_FRAMES);
      animator.animate(getCurrent, destination, step, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyTop = function (element, destination) {
    return Future.nu(function (callback) {
      var getCurrent = $_a3rnw0wjjducwv31.curry(getTop, element);
      var update = function (newTop) {
        $_gbl0iz103jducwvgo.set(element, 'top', newTop + 'px');
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
    var newTop = amount + $_ro20315zjducwwga.getYFixedData(element) + 'px';
    $_gbl0iz103jducwvgo.set(element, 'top', newTop);
  };
  var moveWindowScroll = function (toolbar, viewport, destY) {
    var outerWindow = $_375a04x3jducwv4l.owner(toolbar).dom().defaultView;
    return Future.nu(function (callback) {
      updateTop(toolbar, destY);
      updateTop(viewport, destY);
      outerWindow.scrollTo(0, destY);
      callback(destY);
    });
  };
  var $_fq4wwo15ujducwwfw = {
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
    var greenzone = $_7mwik3160jducwwgr.getGreenzone(socket, dropup);
    var refreshCursor = $_a3rnw0wjjducwv31.curry($_8amhjb15qjducwweu.refresh, cWin);
    if (top > greenzone || bottom > greenzone) {
      $_fq4wwo15ujducwwfw.moveOnlyScroll(socket, socket.dom().scrollTop - greenzone + bottom).get(refreshCursor);
    } else if (top < 0) {
      $_fq4wwo15ujducwwfw.moveOnlyScroll(socket, socket.dom().scrollTop + top).get(refreshCursor);
    } else {
    }
  };
  var $_78nba0163jducwwh2 = { scrollIntoView: scrollIntoView };

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
        $_e31jlowsjducwv3m.each(asyncValues, function (asyncValue, i) {
          asyncValue.get(cb(i));
        });
      }
    });
  };
  var $_1br5f3166jducwwhb = { par: par };

  var par$1 = function (futures) {
    return $_1br5f3166jducwwhb.par(futures, Future.nu);
  };
  var mapM = function (array, fn) {
    var futures = $_e31jlowsjducwv3m.map(array, fn);
    return par$1(futures);
  };
  var compose$1 = function (f, g) {
    return function (a) {
      return g(a).bind(f);
    };
  };
  var $_e9nly1165jducwwha = {
    par: par$1,
    mapM: mapM,
    compose: compose$1
  };

  var updateFixed = function (element, property, winY, offsetY) {
    var destination = winY + offsetY;
    $_gbl0iz103jducwvgo.set(element, property, destination + 'px');
    return Future.pure(offsetY);
  };
  var updateScrollingFixed = function (element, winY, offsetY) {
    var destTop = winY + offsetY;
    var oldProp = $_gbl0iz103jducwvgo.getRaw(element, 'top').getOr(offsetY);
    var delta = destTop - parseInt(oldProp, 10);
    var destScroll = element.dom().scrollTop + delta;
    return $_fq4wwo15ujducwwfw.moveScrollAndTop(element, destScroll, destTop);
  };
  var updateFixture = function (fixture, winY) {
    return fixture.fold(function (element, property, offsetY) {
      return updateFixed(element, property, winY, offsetY);
    }, function (element, offsetY) {
      return updateScrollingFixed(element, winY, offsetY);
    });
  };
  var updatePositions = function (container, winY) {
    var fixtures = $_ro20315zjducwwga.findFixtures(container);
    var updates = $_e31jlowsjducwv3m.map(fixtures, function (fixture) {
      return updateFixture(fixture, winY);
    });
    return $_e9nly1165jducwwha.par(updates);
  };
  var $_ezq7m164jducwwh5 = { updatePositions: updatePositions };

  var VIEW_MARGIN = 5;
  var register$2 = function (toolstrip, socket, container, outerWindow, structure, cWin) {
    var scroller = BackgroundActivity(function (y) {
      return $_fq4wwo15ujducwwfw.moveWindowScroll(toolstrip, socket, y);
    });
    var scrollBounds = function () {
      var rects = $_e09bwx148jducww5x.getRectangles(cWin);
      return Option.from(rects[0]).bind(function (rect) {
        var viewTop = rect.top() - socket.dom().scrollTop;
        var outside = viewTop > outerWindow.innerHeight + VIEW_MARGIN || viewTop < -VIEW_MARGIN;
        return outside ? Option.some({
          top: $_a3rnw0wjjducwv31.constant(viewTop),
          bottom: $_a3rnw0wjjducwv31.constant(viewTop + rect.height())
        }) : Option.none();
      });
    };
    var scrollThrottle = $_96lcvv14wjducww99.last(function () {
      scroller.idle(function () {
        $_ezq7m164jducwwh5.updatePositions(container, outerWindow.pageYOffset).get(function () {
          var extraScroll = scrollBounds();
          extraScroll.each(function (extra) {
            socket.dom().scrollTop = socket.dom().scrollTop + extra.top();
          });
          scroller.start(0);
          structure.refresh();
        });
      });
    }, 1000);
    var onScroll = $_97dmhz13xjducww46.bind($_dqo9uvxfjducwv5k.fromDom(outerWindow), 'scroll', function () {
      if (outerWindow.pageYOffset < 0) {
        return;
      }
      scrollThrottle.throttle();
    });
    $_ezq7m164jducwwh5.updatePositions(container, outerWindow.pageYOffset).get($_a3rnw0wjjducwv31.identity);
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
    var structure = $_ro20315zjducwwga.takeover(socket, ceBody, toolstrip, dropup);
    var keyboardModel = keyboardType(bag.outerBody(), cWin, $_8em3sbxjjducwv5v.body(), contentElement, toolstrip, toolbar);
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
    var onOrientation = $_4nntl513wjducww3x.onChange(outerWindow, {
      onChange: $_a3rnw0wjjducwv31.noop,
      onReady: structure.refresh
    });
    onOrientation.onAdjustment(function () {
      structure.refresh();
    });
    var onResize = $_97dmhz13xjducww46.bind($_dqo9uvxfjducwv5k.fromDom(outerWindow), 'resize', function () {
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
      $_78nba0163jducwwh2.scrollIntoView(cWin, socket, dropup, top, bottom);
    };
    var syncHeight = function () {
      $_gbl0iz103jducwvgo.set(contentElement, 'height', contentElement.dom().contentWindow.document.body.scrollHeight + 'px');
    };
    var setViewportOffset = function (newYOffset) {
      structure.setViewportOffset(newYOffset);
      $_fq4wwo15ujducwwfw.moveOnlyTop(socket, newYOffset).get($_a3rnw0wjjducwv31.identity);
    };
    var destroy = function () {
      structure.restore();
      onOrientation.destroy();
      onScroll.unbind();
      onResize.unbind();
      keyboardModel.destroy();
      unfocusedSelection.destroy();
      $_fz5w0h15ojducwweh.input($_8em3sbxjjducwv5v.body(), $_3hn9p4ytjducwvbd.blur);
    };
    return {
      toEditing: toEditing,
      toReading: toReading,
      onToolbarTouch: onToolbarTouch,
      refreshSelection: refreshSelection,
      clearSelection: clearSelection,
      highlightSelection: highlightSelection,
      scrollIntoView: scrollIntoView,
      updateToolbarPadding: $_a3rnw0wjjducwv31.noop,
      setViewportOffset: setViewportOffset,
      syncHeight: syncHeight,
      refreshStructure: structure.refresh,
      destroy: destroy
    };
  };
  var $_99o1yc15sjducwwf8 = { setup: setup$3 };

  var create$8 = function (platform, mask) {
    var meta = $_c0mcfg14ujducww8w.tag();
    var priorState = $_dio8jw12ojducwvva.value();
    var scrollEvents = $_dio8jw12ojducwvva.value();
    var iosApi = $_dio8jw12ojducwvva.api();
    var iosEvents = $_dio8jw12ojducwvva.api();
    var enter = function () {
      mask.hide();
      var doc = $_dqo9uvxfjducwv5k.fromDom(document);
      $_esrxnf14sjducww8c.getActiveApi(platform.editor).each(function (editorApi) {
        priorState.set({
          socketHeight: $_gbl0iz103jducwvgo.getRaw(platform.socket, 'height'),
          iframeHeight: $_gbl0iz103jducwvgo.getRaw(editorApi.frame(), 'height'),
          outerScroll: document.body.scrollTop
        });
        scrollEvents.set({ exclusives: $_9h33li153jducwwae.exclusive(doc, '.' + $_4n5bgh13ujducww3p.scrollable()) });
        $_6jbzpfynjducwvb2.add(platform.container, $_513f6yzejducwvdz.resolve('fullscreen-maximized'));
        $_9qvh9f14tjducww8q.clobberStyles(platform.container, editorApi.body());
        meta.maximize();
        $_gbl0iz103jducwvgo.set(platform.socket, 'overflow', 'scroll');
        $_gbl0iz103jducwvgo.set(platform.socket, '-webkit-overflow-scrolling', 'touch');
        $_3hn9p4ytjducwvbd.focus(editorApi.body());
        var setupBag = $_73sv11x4jducwv4t.immutableBag([
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
        iosApi.set($_99o1yc15sjducwwf8.setup(setupBag({
          cWin: editorApi.win(),
          ceBody: editorApi.body(),
          socket: platform.socket,
          toolstrip: platform.toolstrip,
          toolbar: platform.toolbar,
          dropup: platform.dropup.element(),
          contentElement: editorApi.frame(),
          cursor: $_a3rnw0wjjducwv31.noop,
          outerBody: platform.body,
          outerWindow: platform.win,
          keyboardType: $_b6wnf415njducwweb.stubborn,
          isScrolling: function () {
            return scrollEvents.get().exists(function (s) {
              return s.socket.isScrolling();
            });
          }
        })));
        iosApi.run(function (api) {
          api.syncHeight();
        });
        iosEvents.set($_7ljqfd15rjducwwex.initEvents(editorApi, iosApi, platform.toolstrip, platform.socket, platform.dropup));
      });
    };
    var exit = function () {
      meta.restore();
      iosEvents.clear();
      iosApi.clear();
      mask.show();
      priorState.on(function (s) {
        s.socketHeight.each(function (h) {
          $_gbl0iz103jducwvgo.set(platform.socket, 'height', h);
        });
        s.iframeHeight.each(function (h) {
          $_gbl0iz103jducwvgo.set(platform.editor.getFrame(), 'height', h);
        });
        document.body.scrollTop = s.scrollTop;
      });
      priorState.clear();
      scrollEvents.on(function (s) {
        s.exclusives.unbind();
      });
      scrollEvents.clear();
      $_6jbzpfynjducwvb2.remove(platform.container, $_513f6yzejducwvdz.resolve('fullscreen-maximized'));
      $_9qvh9f14tjducww8q.restoreStyles();
      $_4n5bgh13ujducww3p.deregister(platform.toolbar);
      $_gbl0iz103jducwvgo.remove(platform.socket, 'overflow');
      $_gbl0iz103jducwvgo.remove(platform.socket, '-webkit-overflow-scrolling');
      $_3hn9p4ytjducwvbd.blur(platform.editor.getFrame());
      $_esrxnf14sjducww8c.getActiveApi(platform.editor).each(function (editorApi) {
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
  var $_cmatic15mjducwwe1 = { create: create$8 };

  var produce$1 = function (raw) {
    var mobile = $_1cyy8vyejducwva0.asRawOrDie('Getting IosWebapp schema', MobileSchema, raw);
    $_gbl0iz103jducwvgo.set(mobile.toolstrip, 'width', '100%');
    $_gbl0iz103jducwvgo.set(mobile.container, 'position', 'relative');
    var onView = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_8ylry212tjducwvwe.build($_fzr4wm14vjducww91.sketch(onView, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    var mode = $_cmatic15mjducwwe1.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: mode.refreshStructure,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_a3rnw0wjjducwv31.noop
    };
  };
  var $_fwxc3n15ljducwwdv = { produce: produce$1 };

  function IosRealm (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_513f6yzejducwvdz.resolve('ios-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_dio8jw12ojducwvva.api();
    var switchToEdit = $_3w8s9n154jducwwao.makeEditSwitch(webapp);
    var socket = $_3w8s9n154jducwwao.makeSocket();
    var dropup = $_4z785f155jducwwaw.build(function () {
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
      webapp.set($_fwxc3n15ljducwwdv.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        Replacing.remove(socket, switchToEdit);
        w.exit();
      });
    };
    var updateMode = function (readOnly) {
      $_3w8s9n154jducwwao.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_a3rnw0wjjducwv31.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_a3rnw0wjjducwv31.constant(socket),
      dropup: $_a3rnw0wjjducwv31.constant(dropup)
    };
  }

  var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');

  var derive$4 = function (editor) {
    var base = $_e7rlwgxsjducwv6r.readOptFrom(editor.settings, 'skin_url').fold(function () {
      return EditorManager.baseURL + '/skins/' + 'lightgray';
    }, function (url) {
      return url;
    });
    return {
      content: base + '/content.mobile.min.css',
      ui: base + '/skin.mobile.min.css'
    };
  };
  var $_g5e41n167jducwwhd = { derive: derive$4 };

  var fontSizes = [
    'x-small',
    'small',
    'medium',
    'large',
    'x-large'
  ];
  var fireChange$1 = function (realm, command, state) {
    realm.system().broadcastOn([$_4fo430z1jducwvbw.formatChanged()], {
      command: command,
      state: state
    });
  };
  var init$5 = function (realm, editor) {
    var allFormats = $_2vh9dzx0jducwv47.keys(editor.formatter.get());
    $_e31jlowsjducwv3m.each(allFormats, function (command) {
      editor.formatter.formatChanged(command, function (state) {
        fireChange$1(realm, command, state);
      });
    });
    $_e31jlowsjducwv3m.each([
      'ul',
      'ol'
    ], function (command) {
      editor.selection.selectorChanged(command, function (state, data) {
        fireChange$1(realm, command, state);
      });
    });
  };
  var $_8gtr34169jducwwhe = {
    init: init$5,
    fontSizes: $_a3rnw0wjjducwv31.constant(fontSizes)
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
  var $_g5ykg116ajducwwhi = { fireSkinLoaded: fireSkinLoaded };

  var READING = $_a3rnw0wjjducwv31.constant('toReading');
  var EDITING = $_a3rnw0wjjducwv31.constant('toEditing');
  ThemeManager.add('mobile', function (editor) {
    var renderUI = function (args) {
      var cssUrls = $_g5e41n167jducwwhd.derive(editor);
      if ($_5omhruz0jducwvbv.isSkinDisabled(editor) === false) {
        editor.contentCSS.push(cssUrls.content);
        DOMUtils.DOM.styleSheetLoader.load(cssUrls.ui, $_g5ykg116ajducwwhi.fireSkinLoaded(editor));
      } else {
        $_g5ykg116ajducwwhi.fireSkinLoaded(editor)();
      }
      var doScrollIntoView = function () {
        editor.fire('scrollIntoView');
      };
      var wrapper = $_dqo9uvxfjducwv5k.fromTag('div');
      var realm = $_f3swp0wkjducwv33.detect().os.isAndroid() ? AndroidRealm(doScrollIntoView) : IosRealm(doScrollIntoView);
      var original = $_dqo9uvxfjducwv5k.fromDom(args.targetNode);
      $_f20r2yx2jducwv4k.after(original, wrapper);
      $_8dj4zcx1jducwv49.attachSystem(wrapper, realm.system());
      var findFocusIn = function (elem) {
        return $_3hn9p4ytjducwvbd.search(elem).bind(function (focused) {
          return realm.system().getByDom(focused).toOption();
        });
      };
      var outerWindow = args.targetNode.ownerDocument.defaultView;
      var orientation = $_4nntl513wjducww3x.onChange(outerWindow, {
        onChange: function () {
          var alloy = realm.system();
          alloy.broadcastOn([$_4fo430z1jducwvbw.orientationChanged()], { width: $_4nntl513wjducww3x.getActualWidth(outerWindow) });
        },
        onReady: $_a3rnw0wjjducwv31.noop
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
              return $_dqo9uvxfjducwv5k.fromDom(editor.contentAreaContainer.querySelector('iframe'));
            },
            onDomChanged: function () {
              return { unbind: $_a3rnw0wjjducwv31.noop };
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
              var toolbar = $_dqo9uvxfjducwv5k.fromDom(editor.editorContainer.querySelector('.' + $_513f6yzejducwvdz.resolve('toolbar')));
              findFocusIn(toolbar).each($_51mp15wgjducwv2k.emitExecute);
              realm.restoreToolbar();
              hideDropup();
            },
            onTapContent: function (evt) {
              var target = evt.target();
              if ($_en9ft8xkjducwv5x.name(target) === 'img') {
                editor.selection.select(target.dom());
                evt.kill();
              } else if ($_en9ft8xkjducwv5x.name(target) === 'a') {
                var component = realm.system().getByDom($_dqo9uvxfjducwv5k.fromDom(editor.editorContainer));
                component.each(function (container) {
                  if (Swapping.isAlpha(container)) {
                    $_bxzoyjyzjducwvbu.openLink(target.dom());
                  }
                });
              }
            }
          },
          container: $_dqo9uvxfjducwv5k.fromDom(editor.editorContainer),
          socket: $_dqo9uvxfjducwv5k.fromDom(editor.contentAreaContainer),
          toolstrip: $_dqo9uvxfjducwv5k.fromDom(editor.editorContainer.querySelector('.' + $_513f6yzejducwvdz.resolve('toolstrip'))),
          toolbar: $_dqo9uvxfjducwv5k.fromDom(editor.editorContainer.querySelector('.' + $_513f6yzejducwvdz.resolve('toolbar'))),
          dropup: realm.dropup(),
          alloy: realm.system(),
          translate: $_a3rnw0wjjducwv31.noop,
          setReadOnly: function (ro) {
            setReadOnly(readOnlyGroups, mainGroups, ro);
          }
        });
        var hideDropup = function () {
          realm.dropup().disappear(function () {
            realm.system().broadcastOn([$_4fo430z1jducwvbw.dropupDismissed()], {});
          });
        };
        $_9i75u4xljducwv5z.registerInspector('remove this', realm.system());
        var backToMaskGroup = {
          label: 'The first group',
          scrollable: false,
          items: [$_1sb0dgzfjducwve1.forToolbar('back', function () {
              editor.selection.collapse();
              realm.exit();
            }, {})]
        };
        var backToReadOnlyGroup = {
          label: 'Back to read only',
          scrollable: false,
          items: [$_1sb0dgzfjducwve1.forToolbar('readonly-back', function () {
              setReadOnly(readOnlyGroups, mainGroups, true);
            }, {})]
        };
        var readOnlyGroup = {
          label: 'The read only mode group',
          scrollable: true,
          items: []
        };
        var features = $_93gi6mz2jducwvbz.setup(realm, editor);
        var items = $_93gi6mz2jducwvbz.detect(editor.settings, features);
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
        $_8gtr34169jducwwhe.init(realm, editor);
      });
      return {
        iframeContainer: realm.socket().element().dom(),
        editorContainer: realm.element().dom()
      };
    };
    return {
      getNotificationManagerImpl: function () {
        return {
          open: $_a3rnw0wjjducwv31.identity,
          close: $_a3rnw0wjjducwv31.noop,
          reposition: $_a3rnw0wjjducwv31.noop,
          getArgs: $_a3rnw0wjjducwv31.identity
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
