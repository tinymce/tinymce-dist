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
  var $_fw94akwjje5nvfbr = {
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

  var $_4z587jwije5nvfbn = {
    contextmenu: $_fw94akwjje5nvfbr.constant('contextmenu'),
    touchstart: $_fw94akwjje5nvfbr.constant('touchstart'),
    touchmove: $_fw94akwjje5nvfbr.constant('touchmove'),
    touchend: $_fw94akwjje5nvfbr.constant('touchend'),
    gesturestart: $_fw94akwjje5nvfbr.constant('gesturestart'),
    mousedown: $_fw94akwjje5nvfbr.constant('mousedown'),
    mousemove: $_fw94akwjje5nvfbr.constant('mousemove'),
    mouseout: $_fw94akwjje5nvfbr.constant('mouseout'),
    mouseup: $_fw94akwjje5nvfbr.constant('mouseup'),
    mouseover: $_fw94akwjje5nvfbr.constant('mouseover'),
    focusin: $_fw94akwjje5nvfbr.constant('focusin'),
    keydown: $_fw94akwjje5nvfbr.constant('keydown'),
    input: $_fw94akwjje5nvfbr.constant('input'),
    change: $_fw94akwjje5nvfbr.constant('change'),
    focus: $_fw94akwjje5nvfbr.constant('focus'),
    click: $_fw94akwjje5nvfbr.constant('click'),
    transitionend: $_fw94akwjje5nvfbr.constant('transitionend'),
    selectstart: $_fw94akwjje5nvfbr.constant('selectstart')
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
  var $_9nas7jwlje5nvfbw = { cached: cached };

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
  var $_3xlxxjwoje5nvfc0 = {
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
      version: $_3xlxxjwoje5nvfc0.unknown()
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
  var $_7owna8wnje5nvfby = {
    unknown: unknown$1,
    nu: nu$1,
    edge: $_fw94akwjje5nvfbr.constant(edge),
    chrome: $_fw94akwjje5nvfbr.constant(chrome),
    ie: $_fw94akwjje5nvfbr.constant(ie),
    opera: $_fw94akwjje5nvfbr.constant(opera),
    firefox: $_fw94akwjje5nvfbr.constant(firefox),
    safari: $_fw94akwjje5nvfbr.constant(safari)
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
      version: $_3xlxxjwoje5nvfc0.unknown()
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
  var $_akqxhawpje5nvfc1 = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_fw94akwjje5nvfbr.constant(windows),
    ios: $_fw94akwjje5nvfbr.constant(ios),
    android: $_fw94akwjje5nvfbr.constant(android),
    linux: $_fw94akwjje5nvfbr.constant(linux),
    osx: $_fw94akwjje5nvfbr.constant(osx),
    solaris: $_fw94akwjje5nvfbr.constant(solaris),
    freebsd: $_fw94akwjje5nvfbr.constant(freebsd)
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
      isiPad: $_fw94akwjje5nvfbr.constant(isiPad),
      isiPhone: $_fw94akwjje5nvfbr.constant(isiPhone),
      isTablet: $_fw94akwjje5nvfbr.constant(isTablet),
      isPhone: $_fw94akwjje5nvfbr.constant(isPhone),
      isTouch: $_fw94akwjje5nvfbr.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_fw94akwjje5nvfbr.constant(iOSwebview)
    };
  }

  var never$1 = $_fw94akwjje5nvfbr.never;
  var always$1 = $_fw94akwjje5nvfbr.always;
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
      toString: $_fw94akwjje5nvfbr.constant('none()')
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
  var $_1r8n3awsje5nvfcd = {
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
    return $_1r8n3awsje5nvfcd.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$1(browsers, userAgent).map(function (browser) {
      var version = $_3xlxxjwoje5nvfc0.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$1(oses, userAgent).map(function (os) {
      var version = $_3xlxxjwoje5nvfc0.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_98tcx1wrje5nvfc6 = {
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
  var $_96i164wwje5nvfcu = {
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
  var $_32e1bswxje5nvfcv = {
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
    return startsWith(str, prefix) ? $_96i164wwje5nvfcu.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_96i164wwje5nvfcu.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_96i164wwje5nvfcu.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_96i164wwje5nvfcu.addToEnd(str, prefix);
  };
  var contains$1 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_32e1bswxje5nvfcv.head(str).bind(function (head) {
      return $_32e1bswxje5nvfcv.tail(str).map(function (tail) {
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
  var $_53t6y4wvje5nvfcs = {
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
      return $_53t6y4wvje5nvfcs.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_53t6y4wvje5nvfcs.contains(uastring, 'edge/') && $_53t6y4wvje5nvfcs.contains(uastring, 'chrome') && $_53t6y4wvje5nvfcs.contains(uastring, 'safari') && $_53t6y4wvje5nvfcs.contains(uastring, 'applewebkit');
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
        return $_53t6y4wvje5nvfcs.contains(uastring, 'chrome') && !$_53t6y4wvje5nvfcs.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_53t6y4wvje5nvfcs.contains(uastring, 'msie') || $_53t6y4wvje5nvfcs.contains(uastring, 'trident');
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
        return ($_53t6y4wvje5nvfcs.contains(uastring, 'safari') || $_53t6y4wvje5nvfcs.contains(uastring, 'mobile/')) && $_53t6y4wvje5nvfcs.contains(uastring, 'applewebkit');
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
        return $_53t6y4wvje5nvfcs.contains(uastring, 'iphone') || $_53t6y4wvje5nvfcs.contains(uastring, 'ipad');
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
  var $_946gswwuje5nvfco = {
    browsers: $_fw94akwjje5nvfbr.constant(browsers),
    oses: $_fw94akwjje5nvfbr.constant(oses)
  };

  var detect$2 = function (userAgent) {
    var browsers = $_946gswwuje5nvfco.browsers();
    var oses = $_946gswwuje5nvfco.oses();
    var browser = $_98tcx1wrje5nvfc6.detectBrowser(browsers, userAgent).fold($_7owna8wnje5nvfby.unknown, $_7owna8wnje5nvfby.nu);
    var os = $_98tcx1wrje5nvfc6.detectOs(oses, userAgent).fold($_akqxhawpje5nvfc1.unknown, $_akqxhawpje5nvfc1.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_1lwii5wmje5nvfbx = { detect: detect$2 };

  var detect$3 = $_9nas7jwlje5nvfbw.cached(function () {
    var userAgent = navigator.userAgent;
    return $_1lwii5wmje5nvfbx.detect(userAgent);
  });
  var $_2m9vcuwkje5nvfbu = { detect: detect$3 };

  var alloy = { tap: $_fw94akwjje5nvfbr.constant('alloy.tap') };
  var $_8j7iltwhje5nvfbj = {
    focus: $_fw94akwjje5nvfbr.constant('alloy.focus'),
    postBlur: $_fw94akwjje5nvfbr.constant('alloy.blur.post'),
    receive: $_fw94akwjje5nvfbr.constant('alloy.receive'),
    execute: $_fw94akwjje5nvfbr.constant('alloy.execute'),
    focusItem: $_fw94akwjje5nvfbr.constant('alloy.focus.item'),
    tap: alloy.tap,
    tapOrClick: $_2m9vcuwkje5nvfbu.detect().deviceType.isTouch() ? alloy.tap : $_4z587jwije5nvfbn.click,
    longpress: $_fw94akwjje5nvfbr.constant('alloy.longpress'),
    sandboxClose: $_fw94akwjje5nvfbr.constant('alloy.sandbox.close'),
    systemInit: $_fw94akwjje5nvfbr.constant('alloy.system.init'),
    windowScroll: $_fw94akwjje5nvfbr.constant('alloy.system.scroll'),
    attachedToDom: $_fw94akwjje5nvfbr.constant('alloy.system.attached'),
    detachedFromDom: $_fw94akwjje5nvfbr.constant('alloy.system.detached'),
    changeTab: $_fw94akwjje5nvfbr.constant('alloy.change.tab'),
    dismissTab: $_fw94akwjje5nvfbr.constant('alloy.dismiss.tab')
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
  var $_130xdswzje5nvfcx = {
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
    var bothObjects = $_130xdswzje5nvfcx.isObject(old) && $_130xdswzje5nvfcx.isObject(nu);
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
  var $_1v3q5lwyje5nvfcw = {
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
  var $_3q4qwfx0je5nvfcy = {
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
    emit(component, $_8j7iltwhje5nvfbj.execute());
  };
  var dispatch = function (component, target, event) {
    dispatchWith(component, target, event, {});
  };
  var dispatchWith = function (component, target, event, properties) {
    var data = $_1v3q5lwyje5nvfcw.deepMerge({ target: target }, properties);
    component.getSystem().triggerEvent(event, target, $_3q4qwfx0je5nvfcy.map(data, $_fw94akwjje5nvfbr.constant));
  };
  var dispatchEvent = function (component, target, event, simulatedEvent) {
    component.getSystem().triggerEvent(event, target, simulatedEvent.event());
  };
  var dispatchFocus = function (component, target) {
    component.getSystem().triggerFocus(target, component.element());
  };
  var $_an9hm6wgje5nvfbd = {
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
      $_1r8n3awsje5nvfcd.each(fields, function (name, i) {
        struct[name] = $_fw94akwjje5nvfbr.constant(values[i]);
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
    if (!$_130xdswzje5nvfcx.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_1r8n3awsje5nvfcd.each(array, function (a) {
      if (!$_130xdswzje5nvfcx.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_1r8n3awsje5nvfcd.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_1h7nhzx7je5nvfds = {
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
    $_1h7nhzx7je5nvfds.validateStrArr('required', required);
    $_1h7nhzx7je5nvfds.validateStrArr('optional', optional);
    $_1h7nhzx7je5nvfds.checkDupes(everything);
    return function (obj) {
      var keys = $_3q4qwfx0je5nvfcy.keys(obj);
      var allReqd = $_1r8n3awsje5nvfcd.forall(required, function (req) {
        return $_1r8n3awsje5nvfcd.contains(keys, req);
      });
      if (!allReqd)
        $_1h7nhzx7je5nvfds.reqMessage(required, keys);
      var unsupported = $_1r8n3awsje5nvfcd.filter(keys, function (key) {
        return !$_1r8n3awsje5nvfcd.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_1h7nhzx7je5nvfds.unsuppMessage(unsupported);
      var r = {};
      $_1r8n3awsje5nvfcd.each(required, function (req) {
        r[req] = $_fw94akwjje5nvfbr.constant(obj[req]);
      });
      $_1r8n3awsje5nvfcd.each(optional, function (opt) {
        r[opt] = $_fw94akwjje5nvfbr.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? Option.some(obj[opt]) : Option.none());
      });
      return r;
    };
  }

  var $_f74ptsx4je5nvfdn = {
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
  var $_dmb1yhx8je5nvfdv = { toArray: toArray };

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
  var $_9zgecmxcje5nvfea = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_9zgecmxcje5nvfea.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_2yscqpxbje5nvfe4 = { getOrDie: getOrDie };

  var node = function () {
    var f = $_2yscqpxbje5nvfe4.getOrDie('Node');
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
  var $_8071hvxaje5nvfe3 = {
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
    return { dom: $_fw94akwjje5nvfbr.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return Option.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_4ivu2mxfje5nvfeg = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_66mdv8xgje5nvfek = {
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

  var ELEMENT = $_66mdv8xgje5nvfek.ELEMENT;
  var DOCUMENT = $_66mdv8xgje5nvfek.DOCUMENT;
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
    return bypassSelector(base) ? [] : $_1r8n3awsje5nvfcd.map(base.querySelectorAll(selector), $_4ivu2mxfje5nvfeg.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? Option.none() : Option.from(base.querySelector(selector)).map($_4ivu2mxfje5nvfeg.fromDom);
  };
  var $_2qbccdxeje5nvfed = {
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
    return $_1r8n3awsje5nvfcd.exists(elements, $_fw94akwjje5nvfbr.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_8071hvxaje5nvfe3.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_2m9vcuwkje5nvfbu.detect().browser;
  var contains$2 = browser.isIE() ? ieContains : regularContains;
  var $_8rsueix9je5nvfdw = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains$2,
    is: $_2qbccdxeje5nvfed.is
  };

  var owner = function (element) {
    return $_4ivu2mxfje5nvfeg.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_4ivu2mxfje5nvfeg.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_4ivu2mxfje5nvfeg.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return Option.from(dom.parentNode).map($_4ivu2mxfje5nvfeg.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_1r8n3awsje5nvfcd.findIndex(kin, function (elem) {
        return $_8rsueix9je5nvfdw.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_130xdswzje5nvfcx.isFunction(isRoot) ? isRoot : $_fw94akwjje5nvfbr.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_4ivu2mxfje5nvfeg.fromDom(rawParent);
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
      return $_1r8n3awsje5nvfcd.filter(elements, function (x) {
        return !$_8rsueix9je5nvfdw.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return Option.from(dom.offsetParent).map($_4ivu2mxfje5nvfeg.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.previousSibling).map($_4ivu2mxfje5nvfeg.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.nextSibling).map($_4ivu2mxfje5nvfeg.fromDom);
  };
  var prevSiblings = function (element) {
    return $_1r8n3awsje5nvfcd.reverse($_dmb1yhx8je5nvfdv.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_dmb1yhx8je5nvfdv.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_1r8n3awsje5nvfcd.map(dom.childNodes, $_4ivu2mxfje5nvfeg.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return Option.from(children[index]).map($_4ivu2mxfje5nvfeg.fromDom);
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
  var spot = $_f74ptsx4je5nvfdn.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_76yst9x3je5nvfde = {
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
    var parent = $_76yst9x3je5nvfde.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_76yst9x3je5nvfde.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_76yst9x3je5nvfde.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_76yst9x3je5nvfde.firstChild(parent);
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
    $_76yst9x3je5nvfde.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_hzekox2je5nvfdc = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap
  };

  var before$1 = function (marker, elements) {
    $_1r8n3awsje5nvfcd.each(elements, function (x) {
      $_hzekox2je5nvfdc.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_1r8n3awsje5nvfcd.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_hzekox2je5nvfdc.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_1r8n3awsje5nvfcd.each(elements.slice().reverse(), function (x) {
      $_hzekox2je5nvfdc.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_1r8n3awsje5nvfcd.each(elements, function (x) {
      $_hzekox2je5nvfdc.append(parent, x);
    });
  };
  var $_76ml55xije5nvfen = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_1r8n3awsje5nvfcd.each($_76yst9x3je5nvfde.children(element), function (rogue) {
      remove(rogue);
    });
  };
  var remove = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_76yst9x3je5nvfde.children(wrapper);
    if (children.length > 0)
      $_76ml55xije5nvfen.before(wrapper, children);
    remove(wrapper);
  };
  var $_7calf0xhje5nvfel = {
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
    return type(element) === $_66mdv8xgje5nvfek.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_66mdv8xgje5nvfek.ELEMENT);
  var isText = isType$1($_66mdv8xgje5nvfek.TEXT);
  var isDocument = isType$1($_66mdv8xgje5nvfek.DOCUMENT);
  var $_3imygaxkje5nvfes = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var inBody = function (element) {
    var dom = $_3imygaxkje5nvfes.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_9nas7jwlje5nvfbw.cached(function () {
    return getBody($_4ivu2mxfje5nvfeg.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_4ivu2mxfje5nvfeg.fromDom(body);
  };
  var $_3mo1igxjje5nvfep = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var fireDetaching = function (component) {
    $_an9hm6wgje5nvfbd.emit(component, $_8j7iltwhje5nvfbj.detachedFromDom());
    var children = component.components();
    $_1r8n3awsje5nvfcd.each(children, fireDetaching);
  };
  var fireAttaching = function (component) {
    var children = component.components();
    $_1r8n3awsje5nvfcd.each(children, fireAttaching);
    $_an9hm6wgje5nvfbd.emit(component, $_8j7iltwhje5nvfbj.attachedToDom());
  };
  var attach = function (parent, child) {
    attachWith(parent, child, $_hzekox2je5nvfdc.append);
  };
  var attachWith = function (parent, child, insertion) {
    parent.getSystem().addToWorld(child);
    insertion(parent.element(), child.element());
    if ($_3mo1igxjje5nvfep.inBody(parent.element()))
      fireAttaching(child);
    parent.syncComponents();
  };
  var doDetach = function (component) {
    fireDetaching(component);
    $_7calf0xhje5nvfel.remove(component.element());
    component.getSystem().removeFromWorld(component);
  };
  var detach = function (component) {
    var parent = $_76yst9x3je5nvfde.parent(component.element()).bind(function (p) {
      return component.getSystem().getByDom(p).fold(Option.none, Option.some);
    });
    doDetach(component);
    parent.each(function (p) {
      p.syncComponents();
    });
  };
  var detachChildren = function (component) {
    var subs = component.components();
    $_1r8n3awsje5nvfcd.each(subs, doDetach);
    $_7calf0xhje5nvfel.empty(component.element());
    component.syncComponents();
  };
  var attachSystem = function (element, guiSystem) {
    $_hzekox2je5nvfdc.append(element, guiSystem.element());
    var children = $_76yst9x3je5nvfde.children(guiSystem.element());
    $_1r8n3awsje5nvfcd.each(children, function (child) {
      guiSystem.getByDom(child).each(fireAttaching);
    });
  };
  var detachSystem = function (guiSystem) {
    var children = $_76yst9x3je5nvfde.children(guiSystem.element());
    $_1r8n3awsje5nvfcd.each(children, function (child) {
      guiSystem.getByDom(child).each(fireDetaching);
    });
    $_7calf0xhje5nvfel.remove(guiSystem.element());
  };
  var $_fap2yjx1je5nvfd1 = {
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
    return $_76yst9x3je5nvfde.children($_4ivu2mxfje5nvfeg.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_1r8n3awsje5nvfcd.map(tags, function (x) {
      return $_4ivu2mxfje5nvfeg.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_1r8n3awsje5nvfcd.map(texts, function (x) {
      return $_4ivu2mxfje5nvfeg.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_1r8n3awsje5nvfcd.map(nodes, $_4ivu2mxfje5nvfeg.fromDom);
  };
  var $_wtl9uxpje5nvffb = {
    fromHtml: fromHtml$1,
    fromTags: fromTags,
    fromText: fromText$1,
    fromDom: fromDom$1
  };

  var get = function (element) {
    return element.dom().innerHTML;
  };
  var set = function (element, content) {
    var owner = $_76yst9x3je5nvfde.owner(element);
    var docDom = owner.dom();
    var fragment = $_4ivu2mxfje5nvfeg.fromDom(docDom.createDocumentFragment());
    var contentElements = $_wtl9uxpje5nvffb.fromHtml(content, docDom);
    $_76ml55xije5nvfen.append(fragment, contentElements);
    $_7calf0xhje5nvfel.empty(element);
    $_hzekox2je5nvfdc.append(element, fragment);
  };
  var getOuter = function (element) {
    var container = $_4ivu2mxfje5nvfeg.fromTag('div');
    var clone = $_4ivu2mxfje5nvfeg.fromDom(element.dom().cloneNode(true));
    $_hzekox2je5nvfdc.append(container, clone);
    return get(container);
  };
  var $_dbp1tvxoje5nvffa = {
    get: get,
    set: set,
    getOuter: getOuter
  };

  var rawSet = function (dom, key, value) {
    if ($_130xdswzje5nvfcx.isString(value) || $_130xdswzje5nvfcx.isBoolean(value) || $_130xdswzje5nvfcx.isNumber(value)) {
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
    $_3q4qwfx0je5nvfcy.each(attrs, function (v, k) {
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
    return $_1r8n3awsje5nvfcd.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has(source, attr) && !has(destination, attr))
      set$1(destination, attr, get$1(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_3imygaxkje5nvfes.isElement(source) || !$_3imygaxkje5nvfes.isElement(destination))
      return;
    $_1r8n3awsje5nvfcd.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_awg6i3xrje5nvffg = {
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
    return $_4ivu2mxfje5nvfeg.fromDom(original.dom().cloneNode(deep));
  };
  var shallow$1 = function (original) {
    return clone$1(original, false);
  };
  var deep$1 = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_4ivu2mxfje5nvfeg.fromTag(tag);
    var attributes = $_awg6i3xrje5nvffg.clone(original);
    $_awg6i3xrje5nvffg.setAll(nu, attributes);
    return nu;
  };
  var copy = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_76yst9x3je5nvfde.children(deep$1(original));
    $_76ml55xije5nvfen.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_hzekox2je5nvfdc.before(original, nu);
    var children = $_76yst9x3je5nvfde.children(original);
    $_76ml55xije5nvfen.append(nu, children);
    $_7calf0xhje5nvfel.remove(original);
    return nu;
  };
  var $_fgzh7yxqje5nvffe = {
    shallow: shallow$1,
    shallowAs: shallowAs,
    deep: deep$1,
    copy: copy,
    mutate: mutate
  };

  var getHtml = function (element) {
    var clone = $_fgzh7yxqje5nvffe.shallow(element);
    return $_dbp1tvxoje5nvffa.getOuter(clone);
  };
  var $_898n84xnje5nvff6 = { getHtml: getHtml };

  var element = function (elem) {
    return $_898n84xnje5nvff6.getHtml(elem);
  };
  var $_awwr4fxmje5nvff5 = { element: element };

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
      isValue: $_fw94akwjje5nvfbr.always,
      isError: $_fw94akwjje5nvfbr.never,
      getOr: $_fw94akwjje5nvfbr.constant(o),
      getOrThunk: $_fw94akwjje5nvfbr.constant(o),
      getOrDie: $_fw94akwjje5nvfbr.constant(o),
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
      return $_fw94akwjje5nvfbr.die(message)();
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
      is: $_fw94akwjje5nvfbr.never,
      isValue: $_fw94akwjje5nvfbr.never,
      isError: $_fw94akwjje5nvfbr.always,
      getOr: $_fw94akwjje5nvfbr.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_fw94akwjje5nvfbr.noop,
      bind: bind,
      exists: $_fw94akwjje5nvfbr.never,
      forall: $_fw94akwjje5nvfbr.always,
      toOption: Option.none
    };
  };
  var Result = {
    value: value$1,
    error: error
  };

  var generate = function (cases) {
    if (!$_130xdswzje5nvfcx.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_1r8n3awsje5nvfcd.each(cases, function (acase, count) {
      var keys = $_3q4qwfx0je5nvfcy.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_130xdswzje5nvfcx.isArray(value)) {
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
          var branchKeys = $_3q4qwfx0je5nvfcy.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_1r8n3awsje5nvfcd.forall(constructors, function (reqKey) {
            return $_1r8n3awsje5nvfcd.contains(branchKeys, reqKey);
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
  var $_dj88xixwje5nvfg0 = { generate: generate };

  var comparison = $_dj88xixwje5nvfg0.generate([
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
    $_1r8n3awsje5nvfcd.each(results, function (result) {
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
  var $_cnml27xvje5nvffz = {
    partition: partition$1,
    compare: compare
  };

  var mergeValues = function (values, base) {
    return Result.value($_1v3q5lwyje5nvfcw.deepMerge.apply(undefined, [base].concat(values)));
  };
  var mergeErrors = function (errors) {
    return $_fw94akwjje5nvfbr.compose(Result.error, $_1r8n3awsje5nvfcd.flatten)(errors);
  };
  var consolidateObj = function (objects, base) {
    var partitions = $_cnml27xvje5nvffz.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : mergeValues(partitions.values, base);
  };
  var consolidateArr = function (objects) {
    var partitions = $_cnml27xvje5nvffz.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : Result.value(partitions.values);
  };
  var $_a81huzxtje5nvffp = {
    consolidateObj: consolidateObj,
    consolidateArr: consolidateArr
  };

  var narrow = function (obj, fields) {
    var r = {};
    $_1r8n3awsje5nvfcd.each(fields, function (field) {
      if (obj[field] !== undefined && obj.hasOwnProperty(field))
        r[field] = obj[field];
    });
    return r;
  };
  var indexOnKey = function (array, key) {
    var obj = {};
    $_1r8n3awsje5nvfcd.each(array, function (a) {
      var keyValue = a[key];
      obj[keyValue] = a;
    });
    return obj;
  };
  var exclude = function (obj, fields) {
    var r = {};
    $_3q4qwfx0je5nvfcy.each(obj, function (v, k) {
      if (!$_1r8n3awsje5nvfcd.contains(fields, k)) {
        r[k] = v;
      }
    });
    return r;
  };
  var $_2c2mz1xxje5nvfg7 = {
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
  var $_627651xyje5nvfgb = {
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
    $_1r8n3awsje5nvfcd.each(keyvalues, function (kv) {
      r[kv.key] = kv.value;
    });
    return r;
  };
  var $_edcxpxxzje5nvfge = {
    wrap: wrap$1,
    wrapAll: wrapAll
  };

  var narrow$1 = function (obj, fields) {
    return $_2c2mz1xxje5nvfg7.narrow(obj, fields);
  };
  var exclude$1 = function (obj, fields) {
    return $_2c2mz1xxje5nvfg7.exclude(obj, fields);
  };
  var readOpt$1 = function (key) {
    return $_627651xyje5nvfgb.readOpt(key);
  };
  var readOr$1 = function (key, fallback) {
    return $_627651xyje5nvfgb.readOr(key, fallback);
  };
  var readOptFrom$1 = function (obj, key) {
    return $_627651xyje5nvfgb.readOptFrom(obj, key);
  };
  var wrap$2 = function (key, value) {
    return $_edcxpxxzje5nvfge.wrap(key, value);
  };
  var wrapAll$1 = function (keyvalues) {
    return $_edcxpxxzje5nvfge.wrapAll(keyvalues);
  };
  var indexOnKey$1 = function (array, key) {
    return $_2c2mz1xxje5nvfg7.indexOnKey(array, key);
  };
  var consolidate = function (objs, base) {
    return $_a81huzxtje5nvffp.consolidateObj(objs, base);
  };
  var hasKey$1 = function (obj, key) {
    return $_627651xyje5nvfgb.hasKey(obj, key);
  };
  var $_17met3xsje5nvffn = {
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
  var $_3smncgy0je5nvfgg = {
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
      return $_1r8n3awsje5nvfcd.find(lines, function (line) {
        return line.indexOf('alloy') > 0 && !$_1r8n3awsje5nvfcd.exists(path$1, function (p) {
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
    logEventCut: $_fw94akwjje5nvfbr.noop,
    logEventStopped: $_fw94akwjje5nvfbr.noop,
    logNoParent: $_fw94akwjje5nvfbr.noop,
    logEventNoHandlers: $_fw94akwjje5nvfbr.noop,
    logEventResponse: $_fw94akwjje5nvfbr.noop,
    write: $_fw94akwjje5nvfbr.noop
  };
  var monitorEvent = function (eventName, initialTarget, f) {
    var logger = debugging && (eventsMonitored === '*' || $_1r8n3awsje5nvfcd.contains(eventsMonitored, eventName)) ? function () {
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
          if ($_1r8n3awsje5nvfcd.contains([
              'mousemove',
              'mouseover',
              'mouseout',
              $_8j7iltwhje5nvfbj.systemInit()
            ], eventName))
            return;
          console.log(eventName, {
            event: eventName,
            target: initialTarget.dom(),
            sequence: $_1r8n3awsje5nvfcd.map(sequence, function (s) {
              if (!$_1r8n3awsje5nvfcd.contains([
                  'cut',
                  'stopped',
                  'response'
                ], s.outcome))
                return s.outcome;
              else
                return '{' + s.purpose + '} ' + s.outcome + ' at (' + $_awwr4fxmje5nvff5.element(s.target) + ')';
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
        '(element)': $_awwr4fxmje5nvff5.element(c.element()),
        '(initComponents)': $_1r8n3awsje5nvfcd.map(cSpec.components !== undefined ? cSpec.components : [], go),
        '(components)': $_1r8n3awsje5nvfcd.map(c.components(), go),
        '(bound.events)': $_3q4qwfx0je5nvfcy.mapToArray(c.events(), function (v, k) {
          return [k];
        }).join(', '),
        '(behaviours)': cSpec.behaviours !== undefined ? $_3q4qwfx0je5nvfcy.map(cSpec.behaviours, function (v, k) {
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
          var connections = $_3q4qwfx0je5nvfcy.keys(systems);
          return $_3smncgy0je5nvfgg.findMap(connections, function (conn) {
            var connGui = systems[conn];
            return connGui.getByUid(uid).toOption().map(function (comp) {
              return $_17met3xsje5nvffn.wrap($_awwr4fxmje5nvff5.element(comp.element()), inspectorInfo(comp));
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
  var $_fj5lx3xlje5nvfeu = {
    logHandler: logHandler,
    noLogger: $_fw94akwjje5nvfbr.constant(ignoreEvent),
    getTrace: getTrace,
    monitorEvent: monitorEvent,
    isDebugging: $_fw94akwjje5nvfbr.constant(debugging),
    registerInspector: registerInspector
  };

  var isSource = function (component, simulatedEvent) {
    return $_8rsueix9je5nvfdw.eq(component.element(), simulatedEvent.event().target());
  };
  var $_8946zty5je5nvfh8 = { isSource: isSource };

  var adt = $_dj88xixwje5nvfg0.generate([
    { strict: [] },
    { defaultedThunk: ['fallbackThunk'] },
    { asOption: [] },
    { asDefaultedOptionThunk: ['fallbackThunk'] },
    { mergeWithThunk: ['baseThunk'] }
  ]);
  var defaulted = function (fallback) {
    return adt.defaultedThunk($_fw94akwjje5nvfbr.constant(fallback));
  };
  var asDefaultedOption = function (fallback) {
    return adt.asDefaultedOptionThunk($_fw94akwjje5nvfbr.constant(fallback));
  };
  var mergeWith = function (base) {
    return adt.mergeWithThunk($_fw94akwjje5nvfbr.constant(base));
  };
  var $_85q6v8y8je5nvfhq = {
    strict: adt.strict,
    asOption: adt.asOption,
    defaulted: defaulted,
    defaultedThunk: adt.defaultedThunk,
    asDefaultedOption: asDefaultedOption,
    asDefaultedOptionThunk: adt.asDefaultedOptionThunk,
    mergeWith: mergeWith,
    mergeWithThunk: adt.mergeWithThunk
  };

  var typeAdt = $_dj88xixwje5nvfg0.generate([
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
  var fieldAdt = $_dj88xixwje5nvfg0.generate([
    {
      field: [
        'name',
        'presence',
        'type'
      ]
    },
    { state: ['name'] }
  ]);
  var $_gatuwryaje5nvfif = {
    typeAdt: typeAdt,
    fieldAdt: fieldAdt
  };

  var json = function () {
    return $_2yscqpxbje5nvfe4.getOrDie('JSON');
  };
  var parse = function (obj) {
    return json().parse(obj);
  };
  var stringify = function (obj, replacer, space) {
    return json().stringify(obj, replacer, space);
  };
  var $_74gpplydje5nvfir = {
    parse: parse,
    stringify: stringify
  };

  var formatObj = function (input) {
    return $_130xdswzje5nvfcx.isObject(input) && $_3q4qwfx0je5nvfcy.keys(input).length > 100 ? ' removed due to size' : $_74gpplydje5nvfir.stringify(input, null, 2);
  };
  var formatErrors = function (errors) {
    var es = errors.length > 10 ? errors.slice(0, 10).concat([{
        path: [],
        getErrorInfo: function () {
          return '... (only showing first ten failures)';
        }
      }]) : errors;
    return $_1r8n3awsje5nvfcd.map(es, function (e) {
      return 'Failed path: (' + e.path.join(' > ') + ')\n' + e.getErrorInfo();
    });
  };
  var $_2sq23vycje5nvfil = {
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
      return 'Could not find valid *strict* value for "' + key + '" in ' + $_2sq23vycje5nvfil.formatObj(obj);
    });
  };
  var missingKey = function (path, key) {
    return nu$3(path, function () {
      return 'Choice schema did not contain choice key: "' + key + '"';
    });
  };
  var missingBranch = function (path, branches, branch) {
    return nu$3(path, function () {
      return 'The chosen schema: "' + branch + '" did not exist in branches: ' + $_2sq23vycje5nvfil.formatObj(branches);
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
  var $_5pk1q1ybje5nvfii = {
    missingStrict: missingStrict,
    missingKey: missingKey,
    missingBranch: missingBranch,
    unsupportedFields: unsupportedFields,
    custom: custom,
    toString: toString
  };

  var adt$1 = $_dj88xixwje5nvfg0.generate([
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
    return adt$1.state(okey, $_fw94akwjje5nvfbr.constant(value));
  };
  var snapshot = function (okey) {
    return adt$1.state(okey, $_fw94akwjje5nvfbr.identity);
  };
  var strictAccess = function (path, obj, key) {
    return $_627651xyje5nvfgb.readOptFrom(obj, key).fold(function () {
      return $_5pk1q1ybje5nvfii.missingStrict(path, key, obj);
    }, Result.value);
  };
  var fallbackAccess = function (obj, key, fallbackThunk) {
    var v = $_627651xyje5nvfgb.readOptFrom(obj, key).fold(function () {
      return fallbackThunk(obj);
    }, $_fw94akwjje5nvfbr.identity);
    return Result.value(v);
  };
  var optionAccess = function (obj, key) {
    return Result.value($_627651xyje5nvfgb.readOptFrom(obj, key));
  };
  var optionDefaultedAccess = function (obj, key, fallback) {
    var opt = $_627651xyje5nvfgb.readOptFrom(obj, key).map(function (val) {
      return val === true ? fallback(obj) : val;
    });
    return Result.value(opt);
  };
  var cExtractOne = function (path, obj, field, strength) {
    return field.fold(function (key, okey, presence, prop) {
      var bundle = function (av) {
        return prop.extract(path.concat([key]), strength, av).map(function (res) {
          return $_edcxpxxzje5nvfge.wrap(okey, strength(res));
        });
      };
      var bundleAsOption = function (optValue) {
        return optValue.fold(function () {
          var outcome = $_edcxpxxzje5nvfge.wrap(okey, strength(Option.none()));
          return Result.value(outcome);
        }, function (ov) {
          return prop.extract(path.concat([key]), strength, ov).map(function (res) {
            return $_edcxpxxzje5nvfge.wrap(okey, strength(Option.some(res)));
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
          return fallbackAccess(obj, key, $_fw94akwjje5nvfbr.constant({})).map(function (v) {
            return $_1v3q5lwyje5nvfcw.deepMerge(base, v);
          }).bind(bundle);
        });
      }();
    }, function (okey, instantiator) {
      var state = instantiator(obj);
      return Result.value($_edcxpxxzje5nvfge.wrap(okey, strength(state)));
    });
  };
  var cExtract = function (path, obj, fields, strength) {
    var results = $_1r8n3awsje5nvfcd.map(fields, function (field) {
      return cExtractOne(path, obj, field, strength);
    });
    return $_a81huzxtje5nvffp.consolidateObj(results, {});
  };
  var value$2 = function (validator) {
    var extract = function (path, strength, val) {
      return validator(val, strength).fold(function (err) {
        return $_5pk1q1ybje5nvfii.custom(path, err);
      }, Result.value);
    };
    var toString = function () {
      return 'val';
    };
    var toDsl = function () {
      return $_gatuwryaje5nvfif.typeAdt.itemOf(validator);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var getSetKeys = function (obj) {
    var keys = $_3q4qwfx0je5nvfcy.keys(obj);
    return $_1r8n3awsje5nvfcd.filter(keys, function (k) {
      return $_17met3xsje5nvffn.hasKey(obj, k);
    });
  };
  var objOnly = function (fields) {
    var delegate = obj(fields);
    var fieldNames = $_1r8n3awsje5nvfcd.foldr(fields, function (acc, f) {
      return f.fold(function (key) {
        return $_1v3q5lwyje5nvfcw.deepMerge(acc, $_17met3xsje5nvffn.wrap(key, true));
      }, $_fw94akwjje5nvfbr.constant(acc));
    }, {});
    var extract = function (path, strength, o) {
      var keys = $_130xdswzje5nvfcx.isBoolean(o) ? [] : getSetKeys(o);
      var extra = $_1r8n3awsje5nvfcd.filter(keys, function (k) {
        return !$_17met3xsje5nvffn.hasKey(fieldNames, k);
      });
      return extra.length === 0 ? delegate.extract(path, strength, o) : $_5pk1q1ybje5nvfii.unsupportedFields(path, extra);
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
      var fieldStrings = $_1r8n3awsje5nvfcd.map(fields, function (field) {
        return field.fold(function (key, okey, presence, prop) {
          return key + ' -> ' + prop.toString();
        }, function (okey, instantiator) {
          return 'state(' + okey + ')';
        });
      });
      return 'obj{\n' + fieldStrings.join('\n') + '}';
    };
    var toDsl = function () {
      return $_gatuwryaje5nvfif.typeAdt.objOf($_1r8n3awsje5nvfcd.map(fields, function (f) {
        return f.fold(function (key, okey, presence, prop) {
          return $_gatuwryaje5nvfif.fieldAdt.field(key, presence, prop);
        }, function (okey, instantiator) {
          return $_gatuwryaje5nvfif.fieldAdt.state(okey);
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
      var results = $_1r8n3awsje5nvfcd.map(array, function (a, i) {
        return prop.extract(path.concat(['[' + i + ']']), strength, a);
      });
      return $_a81huzxtje5nvffp.consolidateArr(results);
    };
    var toString = function () {
      return 'array(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_gatuwryaje5nvfif.typeAdt.arrOf(prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var setOf = function (validator, prop) {
    var validateKeys = function (path, keys) {
      return arr(value$2(validator)).extract(path, $_fw94akwjje5nvfbr.identity, keys);
    };
    var extract = function (path, strength, o) {
      var keys = $_3q4qwfx0je5nvfcy.keys(o);
      return validateKeys(path, keys).bind(function (validKeys) {
        var schema = $_1r8n3awsje5nvfcd.map(validKeys, function (vk) {
          return adt$1.field(vk, vk, $_85q6v8y8je5nvfhq.strict(), prop);
        });
        return obj(schema).extract(path, strength, o);
      });
    };
    var toString = function () {
      return 'setOf(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_gatuwryaje5nvfif.typeAdt.setOf(validator, prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var func = function (args, schema, retriever) {
    var delegate = value$2(function (f, strength) {
      return $_130xdswzje5nvfcx.isFunction(f) ? Result.value(function () {
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
        return $_gatuwryaje5nvfif.typeAdt.func(args, schema);
      }
    };
  };
  var thunk = function (desc, processor) {
    var getP = $_9nas7jwlje5nvfbw.cached(function () {
      return processor();
    });
    var extract = function (path, strength, val) {
      return getP().extract(path, strength, val);
    };
    var toString = function () {
      return getP().toString();
    };
    var toDsl = function () {
      return $_gatuwryaje5nvfif.typeAdt.thunk(desc);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var anyValue = value$2(Result.value);
  var arrOfObj = $_fw94akwjje5nvfbr.compose(arr, obj);
  var $_39n01yy9je5nvfhv = {
    anyValue: $_fw94akwjje5nvfbr.constant(anyValue),
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
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.strict(), $_39n01yy9je5nvfhv.anyValue());
  };
  var strictOf = function (key, schema) {
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.strict(), schema);
  };
  var strictFunction = function (key) {
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.strict(), $_39n01yy9je5nvfhv.value(function (f) {
      return $_130xdswzje5nvfcx.isFunction(f) ? Result.value(f) : Result.error('Not a function');
    }));
  };
  var forbid = function (key, message) {
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.asOption(), $_39n01yy9je5nvfhv.value(function (v) {
      return Result.error('The field: ' + key + ' is forbidden. ' + message);
    }));
  };
  var strictArrayOf = function (key, prop) {
    return strictOf(key, prop);
  };
  var strictObjOf = function (key, objSchema) {
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.strict(), $_39n01yy9je5nvfhv.obj(objSchema));
  };
  var strictArrayOfObj = function (key, objFields) {
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.strict(), $_39n01yy9je5nvfhv.arrOfObj(objFields));
  };
  var option = function (key) {
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.asOption(), $_39n01yy9je5nvfhv.anyValue());
  };
  var optionOf = function (key, schema) {
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.asOption(), schema);
  };
  var optionObjOf = function (key, objSchema) {
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.asOption(), $_39n01yy9je5nvfhv.obj(objSchema));
  };
  var optionObjOfOnly = function (key, objSchema) {
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.asOption(), $_39n01yy9je5nvfhv.objOnly(objSchema));
  };
  var defaulted$1 = function (key, fallback) {
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.defaulted(fallback), $_39n01yy9je5nvfhv.anyValue());
  };
  var defaultedOf = function (key, fallback, schema) {
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.defaulted(fallback), schema);
  };
  var defaultedObjOf = function (key, fallback, objSchema) {
    return $_39n01yy9je5nvfhv.field(key, key, $_85q6v8y8je5nvfhq.defaulted(fallback), $_39n01yy9je5nvfhv.obj(objSchema));
  };
  var field = function (key, okey, presence, prop) {
    return $_39n01yy9je5nvfhv.field(key, okey, presence, prop);
  };
  var state = function (okey, instantiator) {
    return $_39n01yy9je5nvfhv.state(okey, instantiator);
  };
  var $_1a8dv7y7je5nvfhl = {
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
    var fields = $_17met3xsje5nvffn.readOptFrom(branches, ch);
    return fields.fold(function () {
      return $_5pk1q1ybje5nvfii.missingBranch(path, branches, ch);
    }, function (fs) {
      return $_39n01yy9je5nvfhv.obj(fs).extract(path.concat(['branch: ' + ch]), strength, input);
    });
  };
  var choose = function (key, branches) {
    var extract = function (path, strength, input) {
      var choice = $_17met3xsje5nvffn.readOptFrom(input, key);
      return choice.fold(function () {
        return $_5pk1q1ybje5nvfii.missingKey(path, key);
      }, function (chosen) {
        return chooseFrom(path, strength, input, branches, chosen);
      });
    };
    var toString = function () {
      return 'chooseOn(' + key + '). Possible values: ' + $_3q4qwfx0je5nvfcy.keys(branches);
    };
    var toDsl = function () {
      return $_gatuwryaje5nvfif.typeAdt.choiceOf(key, branches);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var $_2iqo8ryfje5nvfiw = { choose: choose };

  var anyValue$1 = $_39n01yy9je5nvfhv.value(Result.value);
  var arrOfObj$1 = function (objFields) {
    return $_39n01yy9je5nvfhv.arrOfObj(objFields);
  };
  var arrOfVal = function () {
    return $_39n01yy9je5nvfhv.arr(anyValue$1);
  };
  var arrOf = $_39n01yy9je5nvfhv.arr;
  var objOf = $_39n01yy9je5nvfhv.obj;
  var objOfOnly = $_39n01yy9je5nvfhv.objOnly;
  var setOf$1 = $_39n01yy9je5nvfhv.setOf;
  var valueOf = function (validator) {
    return $_39n01yy9je5nvfhv.value(function (v) {
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
    return extract(label, prop, $_fw94akwjje5nvfbr.constant, obj);
  };
  var asRaw = function (label, prop, obj) {
    return extract(label, prop, $_fw94akwjje5nvfbr.identity, obj);
  };
  var getOrDie$1 = function (extraction) {
    return extraction.fold(function (errInfo) {
      throw new Error(formatError(errInfo));
    }, $_fw94akwjje5nvfbr.identity);
  };
  var asRawOrDie = function (label, prop, obj) {
    return getOrDie$1(asRaw(label, prop, obj));
  };
  var asStructOrDie = function (label, prop, obj) {
    return getOrDie$1(asStruct(label, prop, obj));
  };
  var formatError = function (errInfo) {
    return 'Errors: \n' + $_2sq23vycje5nvfil.formatErrors(errInfo.errors) + '\n\nInput object: ' + $_2sq23vycje5nvfil.formatObj(errInfo.input);
  };
  var choose$1 = function (key, branches) {
    return $_2iqo8ryfje5nvfiw.choose(key, branches);
  };
  var thunkOf = function (desc, schema) {
    return $_39n01yy9je5nvfhv.thunk(desc, schema);
  };
  var funcOrDie = function (args, schema) {
    var retriever = function (output, strength) {
      return getOrDie$1(extract('()', schema, strength, output));
    };
    return $_39n01yy9je5nvfhv.func(args, schema, retriever);
  };
  var $_8shw8ryeje5nvfis = {
    anyValue: $_fw94akwjje5nvfbr.constant(anyValue$1),
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
    if (!$_17met3xsje5nvffn.hasKey(parts, 'can') && !$_17met3xsje5nvffn.hasKey(parts, 'abort') && !$_17met3xsje5nvffn.hasKey(parts, 'run'))
      throw new Error('EventHandler defined by: ' + $_74gpplydje5nvfir.stringify(parts, null, 2) + ' does not have can, abort, or run!');
    return $_8shw8ryeje5nvfis.asRawOrDie('Extracting event.handler', $_8shw8ryeje5nvfis.objOfOnly([
      $_1a8dv7y7je5nvfhl.defaulted('can', $_fw94akwjje5nvfbr.constant(true)),
      $_1a8dv7y7je5nvfhl.defaulted('abort', $_fw94akwjje5nvfbr.constant(false)),
      $_1a8dv7y7je5nvfhl.defaulted('run', $_fw94akwjje5nvfbr.noop)
    ]), parts);
  };
  var all$1 = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_1r8n3awsje5nvfcd.foldl(handlers, function (acc, handler) {
        return acc && f(handler).apply(undefined, args);
      }, true);
    };
  };
  var any = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_1r8n3awsje5nvfcd.foldl(handlers, function (acc, handler) {
        return acc || f(handler).apply(undefined, args);
      }, false);
    };
  };
  var read = function (handler) {
    return $_130xdswzje5nvfcx.isFunction(handler) ? {
      can: $_fw94akwjje5nvfbr.constant(true),
      abort: $_fw94akwjje5nvfbr.constant(false),
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
      $_1r8n3awsje5nvfcd.each(handlers, function (handler) {
        handler.run.apply(undefined, args);
      });
    };
    return nu$4({
      can: can,
      abort: abort,
      run: run
    });
  };
  var $_12koz4y6je5nvfhb = {
    read: read,
    fuse: fuse,
    nu: nu$4
  };

  var derive = $_17met3xsje5nvffn.wrapAll;
  var abort = function (name, predicate) {
    return {
      key: name,
      value: $_12koz4y6je5nvfhb.nu({ abort: predicate })
    };
  };
  var can = function (name, predicate) {
    return {
      key: name,
      value: $_12koz4y6je5nvfhb.nu({ can: predicate })
    };
  };
  var preventDefault = function (name) {
    return {
      key: name,
      value: $_12koz4y6je5nvfhb.nu({
        run: function (component, simulatedEvent) {
          simulatedEvent.event().prevent();
        }
      })
    };
  };
  var run = function (name, handler) {
    return {
      key: name,
      value: $_12koz4y6je5nvfhb.nu({ run: handler })
    };
  };
  var runActionExtra = function (name, action, extra) {
    return {
      key: name,
      value: $_12koz4y6je5nvfhb.nu({
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
        value: $_12koz4y6je5nvfhb.nu({
          run: function (component, simulatedEvent) {
            if ($_8946zty5je5nvfh8.isSource(component, simulatedEvent))
              handler(component, simulatedEvent);
          }
        })
      };
    };
  };
  var redirectToUid = function (name, uid) {
    return run(name, function (component, simulatedEvent) {
      component.getSystem().getByUid(uid).each(function (redirectee) {
        $_an9hm6wgje5nvfbd.dispatchEvent(redirectee, redirectee.element(), name, simulatedEvent);
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
  var $_ge7gjjy4je5nvfh4 = {
    derive: derive,
    run: run,
    preventDefault: preventDefault,
    runActionExtra: runActionExtra,
    runOnAttached: runOnSourceName($_8j7iltwhje5nvfbj.attachedToDom()),
    runOnDetached: runOnSourceName($_8j7iltwhje5nvfbj.detachedFromDom()),
    runOnInit: runOnSourceName($_8j7iltwhje5nvfbj.systemInit()),
    runOnExecute: runOnName($_8j7iltwhje5nvfbj.execute()),
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
  var $_fazqxwygje5nvfj1 = {
    markAsBehaviourApi: markAsBehaviourApi,
    markAsExtraApi: markAsExtraApi,
    markAsSketchApi: markAsSketchApi,
    getAnnotation: getAnnotation
  };

  var nu$5 = $_f74ptsx4je5nvfdn.immutableBag(['tag'], [
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
    return $_74gpplydje5nvfir.stringify(raw, null, 2);
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
  var $_ffiyu0yije5nvfjf = {
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
  var nu$6 = $_f74ptsx4je5nvfdn.immutableBag([], fields);
  var derive$1 = function (settings) {
    var r = {};
    var keys = $_3q4qwfx0je5nvfcy.keys(settings);
    $_1r8n3awsje5nvfcd.each(keys, function (key) {
      settings[key].each(function (v) {
        r[key] = v;
      });
    });
    return nu$6(r);
  };
  var modToStr = function (mod) {
    var raw = modToRaw(mod);
    return $_74gpplydje5nvfir.stringify(raw, null, 2);
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
        return $_17met3xsje5nvffn.wrap(key, arr2);
      });
    }, function (arr1) {
      return oArr2.fold(function () {
        return $_17met3xsje5nvffn.wrap(key, arr1);
      }, function (arr2) {
        return $_17met3xsje5nvffn.wrap(key, arr2);
      });
    });
  };
  var merge$1 = function (defnA, mod) {
    var raw = $_1v3q5lwyje5nvfcw.deepMerge({
      tag: defnA.tag(),
      classes: mod.classes().getOr([]).concat(defnA.classes().getOr([])),
      attributes: $_1v3q5lwyje5nvfcw.merge(defnA.attributes().getOr({}), mod.attributes().getOr({})),
      styles: $_1v3q5lwyje5nvfcw.merge(defnA.styles().getOr({}), mod.styles().getOr({}))
    }, mod.innerHtml().or(defnA.innerHtml()).map(function (innerHtml) {
      return $_17met3xsje5nvffn.wrap('innerHtml', innerHtml);
    }).getOr({}), clashingOptArrays('domChildren', mod.domChildren(), defnA.domChildren()), clashingOptArrays('defChildren', mod.defChildren(), defnA.defChildren()), mod.value().or(defnA.value()).map(function (value) {
      return $_17met3xsje5nvffn.wrap('value', value);
    }).getOr({}));
    return $_ffiyu0yije5nvfjf.nu(raw);
  };
  var $_3hxngfyhje5nvfj4 = {
    nu: nu$6,
    derive: derive$1,
    merge: merge$1,
    modToStr: modToStr,
    modToRaw: modToRaw
  };

  var executeEvent = function (bConfig, bState, executor) {
    return $_ge7gjjy4je5nvfh4.runOnExecute(function (component) {
      executor(component, bConfig, bState);
    });
  };
  var loadEvent = function (bConfig, bState, f) {
    return $_ge7gjjy4je5nvfh4.runOnInit(function (component, simulatedEvent) {
      f(component, bConfig, bState);
    });
  };
  var create = function (schema, name, active, apis, extra, state) {
    var configSchema = $_8shw8ryeje5nvfis.objOfOnly(schema);
    var schemaSchema = $_1a8dv7y7je5nvfhl.optionObjOf(name, [$_1a8dv7y7je5nvfhl.optionObjOfOnly('config', schema)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var createModes = function (modes, name, active, apis, extra, state) {
    var configSchema = modes;
    var schemaSchema = $_1a8dv7y7je5nvfhl.optionObjOf(name, [$_1a8dv7y7je5nvfhl.optionOf('config', modes)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var wrapApi = function (bName, apiFunction, apiName) {
    var f = function (component) {
      var args = arguments;
      return component.config({ name: $_fw94akwjje5nvfbr.constant(bName) }).fold(function () {
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
    return $_fazqxwygje5nvfj1.markAsBehaviourApi(f, apiName, apiFunction);
  };
  var revokeBehaviour = function (name) {
    return {
      key: name,
      value: undefined
    };
  };
  var doCreate = function (configSchema, schemaSchema, name, active, apis, extra, state) {
    var getConfig = function (info) {
      return $_17met3xsje5nvffn.hasKey(info, name) ? info[name]() : Option.none();
    };
    var wrappedApis = $_3q4qwfx0je5nvfcy.map(apis, function (apiF, apiName) {
      return wrapApi(name, apiF, apiName);
    });
    var wrappedExtra = $_3q4qwfx0je5nvfcy.map(extra, function (extraF, extraName) {
      return $_fazqxwygje5nvfj1.markAsExtraApi(extraF, extraName);
    });
    var me = $_1v3q5lwyje5nvfcw.deepMerge(wrappedExtra, wrappedApis, {
      revoke: $_fw94akwjje5nvfbr.curry(revokeBehaviour, name),
      config: function (spec) {
        var prepared = $_8shw8ryeje5nvfis.asStructOrDie(name + '-config', configSchema, spec);
        return {
          key: name,
          value: {
            config: prepared,
            me: me,
            configAsRaw: $_9nas7jwlje5nvfbw.cached(function () {
              return $_8shw8ryeje5nvfis.asRawOrDie(name + '-config', configSchema, spec);
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
          return $_17met3xsje5nvffn.readOptFrom(active, 'exhibit').map(function (exhibitor) {
            return exhibitor(base, behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr($_3hxngfyhje5nvfj4.nu({}));
      },
      name: function () {
        return name;
      },
      handlers: function (info) {
        return getConfig(info).bind(function (behaviourInfo) {
          return $_17met3xsje5nvffn.readOptFrom(active, 'events').map(function (events) {
            return events(behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr({});
      }
    });
    return me;
  };
  var $_crsy8ry3je5nvfgq = {
    executeEvent: executeEvent,
    loadEvent: loadEvent,
    create: create,
    createModes: createModes
  };

  var base = function (handleUnsupported, required) {
    return baseWith(handleUnsupported, required, {
      validate: $_130xdswzje5nvfcx.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_1h7nhzx7je5nvfds.validateStrArr('required', required);
    $_1h7nhzx7je5nvfds.checkDupes(required);
    return function (obj) {
      var keys = $_3q4qwfx0je5nvfcy.keys(obj);
      var allReqd = $_1r8n3awsje5nvfcd.forall(required, function (req) {
        return $_1r8n3awsje5nvfcd.contains(keys, req);
      });
      if (!allReqd)
        $_1h7nhzx7je5nvfds.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_1r8n3awsje5nvfcd.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_1h7nhzx7je5nvfds.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_1r8n3awsje5nvfcd.filter(keys, function (key) {
      return !$_1r8n3awsje5nvfcd.contains(required, key);
    });
    if (unsupported.length > 0)
      $_1h7nhzx7je5nvfds.unsuppMessage(unsupported);
  };
  var allowExtra = $_fw94akwjje5nvfbr.noop;
  var $_gacga0ylje5nvfjm = {
    exactly: $_fw94akwjje5nvfbr.curry(base, handleExact),
    ensure: $_fw94akwjje5nvfbr.curry(base, allowExtra),
    ensureWith: $_fw94akwjje5nvfbr.curry(baseWith, allowExtra)
  };

  var BehaviourState = $_gacga0ylje5nvfjm.ensure(['readState']);

  var init = function () {
    return BehaviourState({
      readState: function () {
        return 'No State required';
      }
    });
  };
  var $_4ccr8byjje5nvfjj = { init: init };

  var derive$2 = function (capabilities) {
    return $_17met3xsje5nvffn.wrapAll(capabilities);
  };
  var simpleSchema = $_8shw8ryeje5nvfis.objOfOnly([
    $_1a8dv7y7je5nvfhl.strict('fields'),
    $_1a8dv7y7je5nvfhl.strict('name'),
    $_1a8dv7y7je5nvfhl.defaulted('active', {}),
    $_1a8dv7y7je5nvfhl.defaulted('apis', {}),
    $_1a8dv7y7je5nvfhl.defaulted('extra', {}),
    $_1a8dv7y7je5nvfhl.defaulted('state', $_4ccr8byjje5nvfjj)
  ]);
  var create$1 = function (data) {
    var value = $_8shw8ryeje5nvfis.asRawOrDie('Creating behaviour: ' + data.name, simpleSchema, data);
    return $_crsy8ry3je5nvfgq.create(value.fields, value.name, value.active, value.apis, value.extra, value.state);
  };
  var modeSchema = $_8shw8ryeje5nvfis.objOfOnly([
    $_1a8dv7y7je5nvfhl.strict('branchKey'),
    $_1a8dv7y7je5nvfhl.strict('branches'),
    $_1a8dv7y7je5nvfhl.strict('name'),
    $_1a8dv7y7je5nvfhl.defaulted('active', {}),
    $_1a8dv7y7je5nvfhl.defaulted('apis', {}),
    $_1a8dv7y7je5nvfhl.defaulted('extra', {}),
    $_1a8dv7y7je5nvfhl.defaulted('state', $_4ccr8byjje5nvfjj)
  ]);
  var createModes$1 = function (data) {
    var value = $_8shw8ryeje5nvfis.asRawOrDie('Creating behaviour: ' + data.name, modeSchema, data);
    return $_crsy8ry3je5nvfgq.createModes($_8shw8ryeje5nvfis.choose(value.branchKey, value.branches), value.name, value.active, value.apis, value.extra, value.state);
  };
  var $_gg4wg0y2je5nvfgj = {
    derive: derive$2,
    revoke: $_fw94akwjje5nvfbr.constant(undefined),
    noActive: $_fw94akwjje5nvfbr.constant({}),
    noApis: $_fw94akwjje5nvfbr.constant({}),
    noExtra: $_fw94akwjje5nvfbr.constant({}),
    noState: $_fw94akwjje5nvfbr.constant($_4ccr8byjje5nvfjj),
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
    var value = $_awg6i3xrje5nvffg.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add = function (element, attr, id) {
    var old = read$1(element, attr);
    var nu = old.concat([id]);
    $_awg6i3xrje5nvffg.set(element, attr, nu.join(' '));
  };
  var remove$2 = function (element, attr, id) {
    var nu = $_1r8n3awsje5nvfcd.filter(read$1(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_awg6i3xrje5nvffg.set(element, attr, nu.join(' '));
    else
      $_awg6i3xrje5nvffg.remove(element, attr);
  };
  var $_bha2sdyqje5nvfjx = {
    read: read$1,
    add: add,
    remove: remove$2
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$2 = function (element) {
    return $_bha2sdyqje5nvfjx.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_bha2sdyqje5nvfjx.add(element, 'class', clazz);
  };
  var remove$3 = function (element, clazz) {
    return $_bha2sdyqje5nvfjx.remove(element, 'class', clazz);
  };
  var toggle = function (element, clazz) {
    if ($_1r8n3awsje5nvfcd.contains(get$2(element), clazz)) {
      remove$3(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_fd7snjypje5nvfjv = {
    get: get$2,
    add: add$1,
    remove: remove$3,
    toggle: toggle,
    supports: supports
  };

  var add$2 = function (element, clazz) {
    if ($_fd7snjypje5nvfjv.supports(element))
      element.dom().classList.add(clazz);
    else
      $_fd7snjypje5nvfjv.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_fd7snjypje5nvfjv.supports(element) ? element.dom().classList : $_fd7snjypje5nvfjv.get(element);
    if (classList.length === 0) {
      $_awg6i3xrje5nvffg.remove(element, 'class');
    }
  };
  var remove$4 = function (element, clazz) {
    if ($_fd7snjypje5nvfjv.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_fd7snjypje5nvfjv.remove(element, clazz);
    cleanClass(element);
  };
  var toggle$1 = function (element, clazz) {
    return $_fd7snjypje5nvfjv.supports(element) ? element.dom().classList.toggle(clazz) : $_fd7snjypje5nvfjv.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_fd7snjypje5nvfjv.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_fd7snjypje5nvfjv.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_fd7snjypje5nvfjv.add(element, clazz);
    };
    return Toggler(off, on, has$1(element, clazz));
  };
  var has$1 = function (element, clazz) {
    return $_fd7snjypje5nvfjv.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_26dua8ynje5nvfjs = {
    add: add$2,
    remove: remove$4,
    toggle: toggle$1,
    toggler: toggler,
    has: has$1
  };

  var swap = function (element, addCls, removeCls) {
    $_26dua8ynje5nvfjs.remove(element, removeCls);
    $_26dua8ynje5nvfjs.add(element, addCls);
  };
  var toAlpha = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.alpha(), swapConfig.omega());
  };
  var toOmega = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.omega(), swapConfig.alpha());
  };
  var clear = function (component, swapConfig, swapState) {
    $_26dua8ynje5nvfjs.remove(component.element(), swapConfig.alpha());
    $_26dua8ynje5nvfjs.remove(component.element(), swapConfig.omega());
  };
  var isAlpha = function (component, swapConfig, swapState) {
    return $_26dua8ynje5nvfjs.has(component.element(), swapConfig.alpha());
  };
  var isOmega = function (component, swapConfig, swapState) {
    return $_26dua8ynje5nvfjs.has(component.element(), swapConfig.omega());
  };
  var $_425swnymje5nvfjp = {
    toAlpha: toAlpha,
    toOmega: toOmega,
    isAlpha: isAlpha,
    isOmega: isOmega,
    clear: clear
  };

  var SwapSchema = [
    $_1a8dv7y7je5nvfhl.strict('alpha'),
    $_1a8dv7y7je5nvfhl.strict('omega')
  ];

  var Swapping = $_gg4wg0y2je5nvfgj.create({
    fields: SwapSchema,
    name: 'swapping',
    apis: $_425swnymje5nvfjp
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
    return is(scope, a) ? Option.some(scope) : $_130xdswzje5nvfcx.isFunction(isRoot) && isRoot(scope) ? Option.none() : ancestor(scope, a, isRoot);
  }

  var first$1 = function (predicate) {
    return descendant($_3mo1igxjje5nvfep.body(), predicate);
  };
  var ancestor = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_130xdswzje5nvfcx.isFunction(isRoot) ? isRoot : $_fw94akwjje5nvfbr.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_4ivu2mxfje5nvfeg.fromDom(element);
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
    return child$1($_4ivu2mxfje5nvfeg.fromDom(element.parentNode), function (x) {
      return !$_8rsueix9je5nvfdw.eq(scope, x) && predicate(x);
    });
  };
  var child$1 = function (scope, predicate) {
    var result = $_1r8n3awsje5nvfcd.find(scope.dom().childNodes, $_fw94akwjje5nvfbr.compose(predicate, $_4ivu2mxfje5nvfeg.fromDom));
    return result.map($_4ivu2mxfje5nvfeg.fromDom);
  };
  var descendant = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_4ivu2mxfje5nvfeg.fromDom(element.childNodes[i])))
          return Option.some($_4ivu2mxfje5nvfeg.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return Option.none();
    };
    return descend(scope.dom());
  };
  var $_eew4a3yvje5nvfkb = {
    first: first$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };

  var any$1 = function (predicate) {
    return $_eew4a3yvje5nvfkb.first(predicate).isSome();
  };
  var ancestor$1 = function (scope, predicate, isRoot) {
    return $_eew4a3yvje5nvfkb.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest$1 = function (scope, predicate, isRoot) {
    return $_eew4a3yvje5nvfkb.closest(scope, predicate, isRoot).isSome();
  };
  var sibling$1 = function (scope, predicate) {
    return $_eew4a3yvje5nvfkb.sibling(scope, predicate).isSome();
  };
  var child$2 = function (scope, predicate) {
    return $_eew4a3yvje5nvfkb.child(scope, predicate).isSome();
  };
  var descendant$1 = function (scope, predicate) {
    return $_eew4a3yvje5nvfkb.descendant(scope, predicate).isSome();
  };
  var $_51q69uyuje5nvfka = {
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
    var doc = $_76yst9x3je5nvfde.owner(element).dom();
    return element.dom() === doc.activeElement;
  };
  var active = function (_doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    return Option.from(doc.activeElement).map($_4ivu2mxfje5nvfeg.fromDom);
  };
  var focusInside = function (element) {
    var doc = $_76yst9x3je5nvfde.owner(element);
    var inside = active(doc).filter(function (a) {
      return $_51q69uyuje5nvfka.closest(a, $_fw94akwjje5nvfbr.curry($_8rsueix9je5nvfdw.eq, element));
    });
    inside.fold(function () {
      focus(element);
    }, $_fw94akwjje5nvfbr.noop);
  };
  var search = function (element) {
    return active($_76yst9x3je5nvfde.owner(element)).filter(function (e) {
      return element.dom().contains(e.dom());
    });
  };
  var $_80e37iytje5nvfk6 = {
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
  var $_h5ncyzje5nvfkm = { openLink: openLink };

  var isSkinDisabled = function (editor) {
    return editor.settings.skin === false;
  };
  var $_4s15afz0je5nvfko = { isSkinDisabled: isSkinDisabled };

  var formatChanged = 'formatChanged';
  var orientationChanged = 'orientationChanged';
  var dropupDismissed = 'dropupDismissed';
  var $_bc0wawz1je5nvfko = {
    formatChanged: $_fw94akwjje5nvfbr.constant(formatChanged),
    orientationChanged: $_fw94akwjje5nvfbr.constant(orientationChanged),
    dropupDismissed: $_fw94akwjje5nvfbr.constant(dropupDismissed)
  };

  var chooseChannels = function (channels, message) {
    return message.universal() ? channels : $_1r8n3awsje5nvfcd.filter(channels, function (ch) {
      return $_1r8n3awsje5nvfcd.contains(message.channels(), ch);
    });
  };
  var events = function (receiveConfig) {
    return $_ge7gjjy4je5nvfh4.derive([$_ge7gjjy4je5nvfh4.run($_8j7iltwhje5nvfbj.receive(), function (component, message) {
        var channelMap = receiveConfig.channels();
        var channels = $_3q4qwfx0je5nvfcy.keys(channelMap);
        var targetChannels = chooseChannels(channels, message);
        $_1r8n3awsje5nvfcd.each(targetChannels, function (ch) {
          var channelInfo = channelMap[ch]();
          var channelSchema = channelInfo.schema();
          var data = $_8shw8ryeje5nvfis.asStructOrDie('channel[' + ch + '] data\nReceiver: ' + $_awwr4fxmje5nvff5.element(component.element()), channelSchema, message.data());
          channelInfo.onReceive()(component, data);
        });
      })]);
  };
  var $_8j7utkz4je5nvfl1 = { events: events };

  var menuFields = [
    $_1a8dv7y7je5nvfhl.strict('menu'),
    $_1a8dv7y7je5nvfhl.strict('selectedMenu')
  ];
  var itemFields = [
    $_1a8dv7y7je5nvfhl.strict('item'),
    $_1a8dv7y7je5nvfhl.strict('selectedItem')
  ];
  var schema = $_8shw8ryeje5nvfis.objOfOnly(itemFields.concat(menuFields));
  var itemSchema = $_8shw8ryeje5nvfis.objOfOnly(itemFields);
  var $_b70niiz7je5nvfln = {
    menuFields: $_fw94akwjje5nvfbr.constant(menuFields),
    itemFields: $_fw94akwjje5nvfbr.constant(itemFields),
    schema: $_fw94akwjje5nvfbr.constant(schema),
    itemSchema: $_fw94akwjje5nvfbr.constant(itemSchema)
  };

  var initSize = $_1a8dv7y7je5nvfhl.strictObjOf('initSize', [
    $_1a8dv7y7je5nvfhl.strict('numColumns'),
    $_1a8dv7y7je5nvfhl.strict('numRows')
  ]);
  var itemMarkers = function () {
    return $_1a8dv7y7je5nvfhl.strictOf('markers', $_b70niiz7je5nvfln.itemSchema());
  };
  var menuMarkers = function () {
    return $_1a8dv7y7je5nvfhl.strictOf('markers', $_b70niiz7je5nvfln.schema());
  };
  var tieredMenuMarkers = function () {
    return $_1a8dv7y7je5nvfhl.strictObjOf('markers', [$_1a8dv7y7je5nvfhl.strict('backgroundMenu')].concat($_b70niiz7je5nvfln.menuFields()).concat($_b70niiz7je5nvfln.itemFields()));
  };
  var markers = function (required) {
    return $_1a8dv7y7je5nvfhl.strictObjOf('markers', $_1r8n3awsje5nvfcd.map(required, $_1a8dv7y7je5nvfhl.strict));
  };
  var onPresenceHandler = function (label, fieldName, presence) {
    var trace = $_fj5lx3xlje5nvfeu.getTrace();
    return $_1a8dv7y7je5nvfhl.field(fieldName, fieldName, presence, $_8shw8ryeje5nvfis.valueOf(function (f) {
      return Result.value(function () {
        $_fj5lx3xlje5nvfeu.logHandler(label, fieldName, trace);
        return f.apply(undefined, arguments);
      });
    }));
  };
  var onHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_85q6v8y8je5nvfhq.defaulted($_fw94akwjje5nvfbr.noop));
  };
  var onKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_85q6v8y8je5nvfhq.defaulted(Option.none));
  };
  var onStrictHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_85q6v8y8je5nvfhq.strict());
  };
  var onStrictKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_85q6v8y8je5nvfhq.strict());
  };
  var output$1 = function (name, value) {
    return $_1a8dv7y7je5nvfhl.state(name, $_fw94akwjje5nvfbr.constant(value));
  };
  var snapshot$1 = function (name) {
    return $_1a8dv7y7je5nvfhl.state(name, $_fw94akwjje5nvfbr.identity);
  };
  var $_bnu93dz6je5nvflc = {
    initSize: $_fw94akwjje5nvfbr.constant(initSize),
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

  var ReceivingSchema = [$_1a8dv7y7je5nvfhl.strictOf('channels', $_8shw8ryeje5nvfis.setOf(Result.value, $_8shw8ryeje5nvfis.objOfOnly([
      $_bnu93dz6je5nvflc.onStrictHandler('onReceive'),
      $_1a8dv7y7je5nvfhl.defaulted('schema', $_8shw8ryeje5nvfis.anyValue())
    ])))];

  var Receiving = $_gg4wg0y2je5nvfgj.create({
    fields: ReceivingSchema,
    name: 'receiving',
    active: $_8j7utkz4je5nvfl1
  });

  var updateAriaState = function (component, toggleConfig) {
    var pressed = isOn(component, toggleConfig);
    var ariaInfo = toggleConfig.aria();
    ariaInfo.update()(component, ariaInfo, pressed);
  };
  var toggle$2 = function (component, toggleConfig, toggleState) {
    $_26dua8ynje5nvfjs.toggle(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var on = function (component, toggleConfig, toggleState) {
    $_26dua8ynje5nvfjs.add(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var off = function (component, toggleConfig, toggleState) {
    $_26dua8ynje5nvfjs.remove(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var isOn = function (component, toggleConfig) {
    return $_26dua8ynje5nvfjs.has(component.element(), toggleConfig.toggleClass());
  };
  var onLoad = function (component, toggleConfig, toggleState) {
    var api = toggleConfig.selected() ? on : off;
    api(component, toggleConfig, toggleState);
  };
  var $_g9u9u4zaje5nvflx = {
    onLoad: onLoad,
    toggle: toggle$2,
    isOn: isOn,
    on: on,
    off: off
  };

  var exhibit = function (base, toggleConfig, toggleState) {
    return $_3hxngfyhje5nvfj4.nu({});
  };
  var events$1 = function (toggleConfig, toggleState) {
    var execute = $_crsy8ry3je5nvfgq.executeEvent(toggleConfig, toggleState, $_g9u9u4zaje5nvflx.toggle);
    var load = $_crsy8ry3je5nvfgq.loadEvent(toggleConfig, toggleState, $_g9u9u4zaje5nvflx.onLoad);
    return $_ge7gjjy4je5nvfh4.derive($_1r8n3awsje5nvfcd.flatten([
      toggleConfig.toggleOnExecute() ? [execute] : [],
      [load]
    ]));
  };
  var $_el0xv1z9je5nvflu = {
    exhibit: exhibit,
    events: events$1
  };

  var updatePressed = function (component, ariaInfo, status) {
    $_awg6i3xrje5nvffg.set(component.element(), 'aria-pressed', status);
    if (ariaInfo.syncWithExpanded())
      updateExpanded(component, ariaInfo, status);
  };
  var updateSelected = function (component, ariaInfo, status) {
    $_awg6i3xrje5nvffg.set(component.element(), 'aria-selected', status);
  };
  var updateChecked = function (component, ariaInfo, status) {
    $_awg6i3xrje5nvffg.set(component.element(), 'aria-checked', status);
  };
  var updateExpanded = function (component, ariaInfo, status) {
    $_awg6i3xrje5nvffg.set(component.element(), 'aria-expanded', status);
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
    var rawTag = $_3imygaxkje5nvfes.name(elem);
    var suffix = rawTag === 'input' && $_awg6i3xrje5nvffg.has(elem, 'type') ? ':' + $_awg6i3xrje5nvffg.get(elem, 'type') : '';
    return $_17met3xsje5nvffn.readOptFrom(tagAttributes, rawTag + suffix);
  };
  var detectFromRole = function (component) {
    var elem = component.element();
    if (!$_awg6i3xrje5nvffg.has(elem, 'role'))
      return Option.none();
    else {
      var role = $_awg6i3xrje5nvffg.get(elem, 'role');
      return $_17met3xsje5nvffn.readOptFrom(roleAttributes, role);
    }
  };
  var updateAuto = function (component, ariaInfo, status) {
    var attributes = detectFromRole(component).orThunk(function () {
      return detectFromTag(component);
    }).getOr([]);
    $_1r8n3awsje5nvfcd.each(attributes, function (attr) {
      $_awg6i3xrje5nvffg.set(component.element(), attr, status);
    });
  };
  var $_cnuy3qzcje5nvfma = {
    updatePressed: updatePressed,
    updateSelected: updateSelected,
    updateChecked: updateChecked,
    updateExpanded: updateExpanded,
    updateAuto: updateAuto
  };

  var ToggleSchema = [
    $_1a8dv7y7je5nvfhl.defaulted('selected', false),
    $_1a8dv7y7je5nvfhl.strict('toggleClass'),
    $_1a8dv7y7je5nvfhl.defaulted('toggleOnExecute', true),
    $_1a8dv7y7je5nvfhl.defaultedOf('aria', { mode: 'none' }, $_8shw8ryeje5nvfis.choose('mode', {
      'pressed': [
        $_1a8dv7y7je5nvfhl.defaulted('syncWithExpanded', false),
        $_bnu93dz6je5nvflc.output('update', $_cnuy3qzcje5nvfma.updatePressed)
      ],
      'checked': [$_bnu93dz6je5nvflc.output('update', $_cnuy3qzcje5nvfma.updateChecked)],
      'expanded': [$_bnu93dz6je5nvflc.output('update', $_cnuy3qzcje5nvfma.updateExpanded)],
      'selected': [$_bnu93dz6je5nvflc.output('update', $_cnuy3qzcje5nvfma.updateSelected)],
      'none': [$_bnu93dz6je5nvflc.output('update', $_fw94akwjje5nvfbr.noop)]
    }))
  ];

  var Toggling = $_gg4wg0y2je5nvfgj.create({
    fields: ToggleSchema,
    name: 'toggling',
    active: $_el0xv1z9je5nvflu,
    apis: $_g9u9u4zaje5nvflx
  });

  var format = function (command, update) {
    return Receiving.config({
      channels: $_17met3xsje5nvffn.wrap($_bc0wawz1je5nvfko.formatChanged(), {
        onReceive: function (button, data) {
          if (data.command === command) {
            update(button, data.state);
          }
        }
      })
    });
  };
  var orientation = function (onReceive) {
    return Receiving.config({ channels: $_17met3xsje5nvffn.wrap($_bc0wawz1je5nvfko.orientationChanged(), { onReceive: onReceive }) });
  };
  var receive = function (channel, onReceive) {
    return {
      key: channel,
      value: { onReceive: onReceive }
    };
  };
  var $_1eacyhzdje5nvfmj = {
    format: format,
    orientation: orientation,
    receive: receive
  };

  var prefix = 'tinymce-mobile';
  var resolve$1 = function (p) {
    return prefix + '-' + p;
  };
  var $_1a91a2zeje5nvfmm = {
    resolve: resolve$1,
    prefix: $_fw94akwjje5nvfbr.constant(prefix)
  };

  var focus$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_80e37iytje5nvfk6.focus(component.element());
      focusConfig.onFocus()(component);
    }
  };
  var blur$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_80e37iytje5nvfk6.blur(component.element());
    }
  };
  var isFocused = function (component) {
    return $_80e37iytje5nvfk6.hasFocus(component.element());
  };
  var $_d6b62kzjje5nvfn3 = {
    focus: focus$1,
    blur: blur$1,
    isFocused: isFocused
  };

  var exhibit$1 = function (base, focusConfig) {
    if (focusConfig.ignore())
      return $_3hxngfyhje5nvfj4.nu({});
    else
      return $_3hxngfyhje5nvfj4.nu({ attributes: { 'tabindex': '-1' } });
  };
  var events$2 = function (focusConfig) {
    return $_ge7gjjy4je5nvfh4.derive([$_ge7gjjy4je5nvfh4.run($_8j7iltwhje5nvfbj.focus(), function (component, simulatedEvent) {
        $_d6b62kzjje5nvfn3.focus(component, focusConfig);
        simulatedEvent.stop();
      })]);
  };
  var $_7srty1zije5nvfn2 = {
    exhibit: exhibit$1,
    events: events$2
  };

  var FocusSchema = [
    $_bnu93dz6je5nvflc.onHandler('onFocus'),
    $_1a8dv7y7je5nvfhl.defaulted('ignore', false)
  ];

  var Focusing = $_gg4wg0y2je5nvfgj.create({
    fields: FocusSchema,
    name: 'focusing',
    active: $_7srty1zije5nvfn2,
    apis: $_d6b62kzjje5nvfn3
  });

  var $_2oe4idzpje5nvfnz = {
    BACKSPACE: $_fw94akwjje5nvfbr.constant([8]),
    TAB: $_fw94akwjje5nvfbr.constant([9]),
    ENTER: $_fw94akwjje5nvfbr.constant([13]),
    SHIFT: $_fw94akwjje5nvfbr.constant([16]),
    CTRL: $_fw94akwjje5nvfbr.constant([17]),
    ALT: $_fw94akwjje5nvfbr.constant([18]),
    CAPSLOCK: $_fw94akwjje5nvfbr.constant([20]),
    ESCAPE: $_fw94akwjje5nvfbr.constant([27]),
    SPACE: $_fw94akwjje5nvfbr.constant([32]),
    PAGEUP: $_fw94akwjje5nvfbr.constant([33]),
    PAGEDOWN: $_fw94akwjje5nvfbr.constant([34]),
    END: $_fw94akwjje5nvfbr.constant([35]),
    HOME: $_fw94akwjje5nvfbr.constant([36]),
    LEFT: $_fw94akwjje5nvfbr.constant([37]),
    UP: $_fw94akwjje5nvfbr.constant([38]),
    RIGHT: $_fw94akwjje5nvfbr.constant([39]),
    DOWN: $_fw94akwjje5nvfbr.constant([40]),
    INSERT: $_fw94akwjje5nvfbr.constant([45]),
    DEL: $_fw94akwjje5nvfbr.constant([46]),
    META: $_fw94akwjje5nvfbr.constant([
      91,
      93,
      224
    ]),
    F10: $_fw94akwjje5nvfbr.constant([121])
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
  var $_aev0v7zuje5nvfos = {
    cycleBy: cycleBy,
    cap: cap
  };

  var all$2 = function (predicate) {
    return descendants($_3mo1igxjje5nvfep.body(), predicate);
  };
  var ancestors = function (scope, predicate, isRoot) {
    return $_1r8n3awsje5nvfcd.filter($_76yst9x3je5nvfde.parents(scope, isRoot), predicate);
  };
  var siblings$1 = function (scope, predicate) {
    return $_1r8n3awsje5nvfcd.filter($_76yst9x3je5nvfde.siblings(scope), predicate);
  };
  var children$1 = function (scope, predicate) {
    return $_1r8n3awsje5nvfcd.filter($_76yst9x3je5nvfde.children(scope), predicate);
  };
  var descendants = function (scope, predicate) {
    var result = [];
    $_1r8n3awsje5nvfcd.each($_76yst9x3je5nvfde.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants(x, predicate));
    });
    return result;
  };
  var $_8fi5r2zwje5nvfou = {
    all: all$2,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var all$3 = function (selector) {
    return $_2qbccdxeje5nvfed.all(selector);
  };
  var ancestors$1 = function (scope, selector, isRoot) {
    return $_8fi5r2zwje5nvfou.ancestors(scope, function (e) {
      return $_2qbccdxeje5nvfed.is(e, selector);
    }, isRoot);
  };
  var siblings$2 = function (scope, selector) {
    return $_8fi5r2zwje5nvfou.siblings(scope, function (e) {
      return $_2qbccdxeje5nvfed.is(e, selector);
    });
  };
  var children$2 = function (scope, selector) {
    return $_8fi5r2zwje5nvfou.children(scope, function (e) {
      return $_2qbccdxeje5nvfed.is(e, selector);
    });
  };
  var descendants$1 = function (scope, selector) {
    return $_2qbccdxeje5nvfed.all(selector, scope);
  };
  var $_8xqdn0zvje5nvfot = {
    all: all$3,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  var first$2 = function (selector) {
    return $_2qbccdxeje5nvfed.one(selector);
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_eew4a3yvje5nvfkb.ancestor(scope, function (e) {
      return $_2qbccdxeje5nvfed.is(e, selector);
    }, isRoot);
  };
  var sibling$2 = function (scope, selector) {
    return $_eew4a3yvje5nvfkb.sibling(scope, function (e) {
      return $_2qbccdxeje5nvfed.is(e, selector);
    });
  };
  var child$3 = function (scope, selector) {
    return $_eew4a3yvje5nvfkb.child(scope, function (e) {
      return $_2qbccdxeje5nvfed.is(e, selector);
    });
  };
  var descendant$2 = function (scope, selector) {
    return $_2qbccdxeje5nvfed.one(selector, scope);
  };
  var closest$2 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_2qbccdxeje5nvfed.is, ancestor$2, scope, selector, isRoot);
  };
  var $_acyoduzxje5nvfox = {
    first: first$2,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var dehighlightAll = function (component, hConfig, hState) {
    var highlighted = $_8xqdn0zvje5nvfot.descendants(component.element(), '.' + hConfig.highlightClass());
    $_1r8n3awsje5nvfcd.each(highlighted, function (h) {
      $_26dua8ynje5nvfjs.remove(h, hConfig.highlightClass());
      component.getSystem().getByDom(h).each(function (target) {
        hConfig.onDehighlight()(component, target);
      });
    });
  };
  var dehighlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    $_26dua8ynje5nvfjs.remove(target.element(), hConfig.highlightClass());
    if (wasHighlighted)
      hConfig.onDehighlight()(component, target);
  };
  var highlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    dehighlightAll(component, hConfig, hState);
    $_26dua8ynje5nvfjs.add(target.element(), hConfig.highlightClass());
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
    var items = $_8xqdn0zvje5nvfot.descendants(component.element(), '.' + hConfig.itemClass());
    var itemComps = $_3smncgy0je5nvfgg.cat($_1r8n3awsje5nvfcd.map(items, function (i) {
      return component.getSystem().getByDom(i).toOption();
    }));
    var targetComp = $_1r8n3awsje5nvfcd.find(itemComps, predicate);
    targetComp.each(function (c) {
      highlight(component, hConfig, hState, c);
    });
  };
  var isHighlighted = function (component, hConfig, hState, queryTarget) {
    return $_26dua8ynje5nvfjs.has(queryTarget.element(), hConfig.highlightClass());
  };
  var getHighlighted = function (component, hConfig, hState) {
    return $_acyoduzxje5nvfox.descendant(component.element(), '.' + hConfig.highlightClass()).bind(component.getSystem().getByDom);
  };
  var getByIndex = function (component, hConfig, hState, index) {
    var items = $_8xqdn0zvje5nvfot.descendants(component.element(), '.' + hConfig.itemClass());
    return Option.from(items[index]).fold(function () {
      return Result.error('No element found with index ' + index);
    }, component.getSystem().getByDom);
  };
  var getFirst = function (component, hConfig, hState) {
    return $_acyoduzxje5nvfox.descendant(component.element(), '.' + hConfig.itemClass()).bind(component.getSystem().getByDom);
  };
  var getLast = function (component, hConfig, hState) {
    var items = $_8xqdn0zvje5nvfot.descendants(component.element(), '.' + hConfig.itemClass());
    var last = items.length > 0 ? Option.some(items[items.length - 1]) : Option.none();
    return last.bind(component.getSystem().getByDom);
  };
  var getDelta = function (component, hConfig, hState, delta) {
    var items = $_8xqdn0zvje5nvfot.descendants(component.element(), '.' + hConfig.itemClass());
    var current = $_1r8n3awsje5nvfcd.findIndex(items, function (item) {
      return $_26dua8ynje5nvfjs.has(item, hConfig.highlightClass());
    });
    return current.bind(function (selected) {
      var dest = $_aev0v7zuje5nvfos.cycleBy(selected, delta, 0, items.length - 1);
      return component.getSystem().getByDom(items[dest]);
    });
  };
  var getPrevious = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, -1);
  };
  var getNext = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, +1);
  };
  var $_bnaq7pztje5nvfog = {
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
    $_1a8dv7y7je5nvfhl.strict('highlightClass'),
    $_1a8dv7y7je5nvfhl.strict('itemClass'),
    $_bnu93dz6je5nvflc.onHandler('onHighlight'),
    $_bnu93dz6je5nvflc.onHandler('onDehighlight')
  ];

  var Highlighting = $_gg4wg0y2je5nvfgj.create({
    fields: HighlightSchema,
    name: 'highlighting',
    apis: $_bnaq7pztje5nvfog
  });

  var dom = function () {
    var get = function (component) {
      return $_80e37iytje5nvfk6.search(component.element());
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
      component.getSystem().getByDom(element).fold($_fw94akwjje5nvfbr.noop, function (item) {
        Highlighting.highlight(component, item);
      });
    };
    return {
      get: get,
      set: set
    };
  };
  var $_djz90tzrje5nvfo6 = {
    dom: dom,
    highlights: highlights
  };

  var inSet = function (keys) {
    return function (event) {
      return $_1r8n3awsje5nvfcd.contains(keys, event.raw().which);
    };
  };
  var and = function (preds) {
    return function (event) {
      return $_1r8n3awsje5nvfcd.forall(preds, function (pred) {
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
  var $_cyrd7a100je5nvfp5 = {
    inSet: inSet,
    and: and,
    is: is$1,
    isShift: isShift,
    isNotShift: $_fw94akwjje5nvfbr.not(isShift),
    isControl: isControl,
    isNotControl: $_fw94akwjje5nvfbr.not(isControl)
  };

  var basic = function (key, action) {
    return {
      matches: $_cyrd7a100je5nvfp5.is(key),
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
    var transition = $_1r8n3awsje5nvfcd.find(transitions, function (t) {
      return t.matches(event);
    });
    return transition.map(function (t) {
      return t.classification;
    });
  };
  var $_1ymgsqzzje5nvfp2 = {
    basic: basic,
    rule: rule,
    choose: choose$2
  };

  var typical = function (infoSchema, stateInit, getRules, getEvents, getApis, optFocusIn) {
    var schema = function () {
      return infoSchema.concat([
        $_1a8dv7y7je5nvfhl.defaulted('focusManager', $_djz90tzrje5nvfo6.dom()),
        $_bnu93dz6je5nvflc.output('handler', me),
        $_bnu93dz6je5nvflc.output('state', stateInit)
      ]);
    };
    var processKey = function (component, simulatedEvent, keyingConfig, keyingState) {
      var rules = getRules(component, simulatedEvent, keyingConfig, keyingState);
      return $_1ymgsqzzje5nvfp2.choose(rules, simulatedEvent.event()).bind(function (rule) {
        return rule(component, simulatedEvent, keyingConfig, keyingState);
      });
    };
    var toEvents = function (keyingConfig, keyingState) {
      var otherEvents = getEvents(keyingConfig, keyingState);
      var keyEvents = $_ge7gjjy4je5nvfh4.derive(optFocusIn.map(function (focusIn) {
        return $_ge7gjjy4je5nvfh4.run($_8j7iltwhje5nvfbj.focus(), function (component, simulatedEvent) {
          focusIn(component, keyingConfig, keyingState, simulatedEvent);
          simulatedEvent.stop();
        });
      }).toArray().concat([$_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.keydown(), function (component, simulatedEvent) {
          processKey(component, simulatedEvent, keyingConfig, keyingState).each(function (_) {
            simulatedEvent.stop();
          });
        })]));
      return $_1v3q5lwyje5nvfcw.deepMerge(otherEvents, keyEvents);
    };
    var me = {
      schema: schema,
      processKey: processKey,
      toEvents: toEvents,
      toApis: getApis
    };
    return me;
  };
  var $_ebbmowzqje5nvfo2 = { typical: typical };

  var cyclePrev = function (values, index, predicate) {
    var before = $_1r8n3awsje5nvfcd.reverse(values.slice(0, index));
    var after = $_1r8n3awsje5nvfcd.reverse(values.slice(index + 1));
    return $_1r8n3awsje5nvfcd.find(before.concat(after), predicate);
  };
  var tryPrev = function (values, index, predicate) {
    var before = $_1r8n3awsje5nvfcd.reverse(values.slice(0, index));
    return $_1r8n3awsje5nvfcd.find(before, predicate);
  };
  var cycleNext = function (values, index, predicate) {
    var before = values.slice(0, index);
    var after = values.slice(index + 1);
    return $_1r8n3awsje5nvfcd.find(after.concat(before), predicate);
  };
  var tryNext = function (values, index, predicate) {
    var after = values.slice(index + 1);
    return $_1r8n3awsje5nvfcd.find(after, predicate);
  };
  var $_3xxv3c101je5nvfp9 = {
    cyclePrev: cyclePrev,
    cycleNext: cycleNext,
    tryPrev: tryPrev,
    tryNext: tryNext
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_3cm38b104je5nvfpn = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_130xdswzje5nvfcx.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_3cm38b104je5nvfpn.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_3cm38b104je5nvfpn.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$2 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_3q4qwfx0je5nvfcy.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_3q4qwfx0je5nvfcy.each(css, function (v, k) {
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
    var v = r === '' && !$_3mo1igxjje5nvfep.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_3cm38b104je5nvfpn.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
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
    if ($_3cm38b104je5nvfpn.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_4ivu2mxfje5nvfeg.fromTag(tag);
    set$2(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$5 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_awg6i3xrje5nvffg.has(element, 'style') && $_53t6y4wvje5nvfcs.trim($_awg6i3xrje5nvffg.get(element, 'style')) === '') {
      $_awg6i3xrje5nvffg.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_awg6i3xrje5nvffg.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_awg6i3xrje5nvffg.remove : $_awg6i3xrje5nvffg.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy$1 = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_3cm38b104je5nvfpn.isSupported(sourceDom) && $_3cm38b104je5nvfpn.isSupported(targetDom)) {
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
    if (!$_3imygaxkje5nvfes.isElement(source) || !$_3imygaxkje5nvfes.isElement(destination))
      return;
    $_1r8n3awsje5nvfcd.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_98elm5103je5nvfpe = {
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
      if (!$_130xdswzje5nvfcx.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_3cm38b104je5nvfpn.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_98elm5103je5nvfpe.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_1r8n3awsje5nvfcd.foldl(properties, function (acc, property) {
        var val = $_98elm5103je5nvfpe.get(element, property);
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
    return $_3mo1igxjje5nvfep.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
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
    $_98elm5103je5nvfpe.set(element, 'max-height', absMax + 'px');
  };
  var $_b3c24w102je5nvfpc = {
    set: set$3,
    get: get$4,
    getOuter: getOuter$1,
    setMax: setMax
  };

  var create$2 = function (cyclicField) {
    var schema = [
      $_1a8dv7y7je5nvfhl.option('onEscape'),
      $_1a8dv7y7je5nvfhl.option('onEnter'),
      $_1a8dv7y7je5nvfhl.defaulted('selector', '[data-alloy-tabstop="true"]'),
      $_1a8dv7y7je5nvfhl.defaulted('firstTabstop', 0),
      $_1a8dv7y7je5nvfhl.defaulted('useTabstopAt', $_fw94akwjje5nvfbr.constant(true)),
      $_1a8dv7y7je5nvfhl.option('visibilitySelector')
    ].concat([cyclicField]);
    var isVisible = function (tabbingConfig, element) {
      var target = tabbingConfig.visibilitySelector().bind(function (sel) {
        return $_acyoduzxje5nvfox.closest(element, sel);
      }).getOr(element);
      return $_b3c24w102je5nvfpc.get(target) > 0;
    };
    var findInitial = function (component, tabbingConfig) {
      var tabstops = $_8xqdn0zvje5nvfot.descendants(component.element(), tabbingConfig.selector());
      var visibles = $_1r8n3awsje5nvfcd.filter(tabstops, function (elem) {
        return isVisible(tabbingConfig, elem);
      });
      return Option.from(visibles[tabbingConfig.firstTabstop()]);
    };
    var findCurrent = function (component, tabbingConfig) {
      return tabbingConfig.focusManager().get(component).bind(function (elem) {
        return $_acyoduzxje5nvfox.closest(elem, tabbingConfig.selector());
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
      var tabstops = $_8xqdn0zvje5nvfot.descendants(component.element(), tabbingConfig.selector());
      return findCurrent(component, tabbingConfig).bind(function (tabstop) {
        var optStopIndex = $_1r8n3awsje5nvfcd.findIndex(tabstops, $_fw94akwjje5nvfbr.curry($_8rsueix9je5nvfdw.eq, tabstop));
        return optStopIndex.bind(function (stopIndex) {
          return goFromTabstop(component, tabstops, stopIndex, tabbingConfig, cycle);
        });
      });
    };
    var goBackwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_3xxv3c101je5nvfp9.cyclePrev : $_3xxv3c101je5nvfp9.tryPrev;
      return go(component, simulatedEvent, tabbingConfig, navigate);
    };
    var goForwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_3xxv3c101je5nvfp9.cycleNext : $_3xxv3c101je5nvfp9.tryNext;
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
    var getRules = $_fw94akwjje5nvfbr.constant([
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.and([
        $_cyrd7a100je5nvfp5.isShift,
        $_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.TAB())
      ]), goBackwards),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.TAB()), goForwards),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.ESCAPE()), exit),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.and([
        $_cyrd7a100je5nvfp5.isNotShift,
        $_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.ENTER())
      ]), execute)
    ]);
    var getEvents = $_fw94akwjje5nvfbr.constant({});
    var getApis = $_fw94akwjje5nvfbr.constant({});
    return $_ebbmowzqje5nvfo2.typical(schema, $_4ccr8byjje5nvfjj.init, getRules, getEvents, getApis, Option.some(focusIn));
  };
  var $_errcjszoje5nvfnh = { create: create$2 };

  var AcyclicType = $_errcjszoje5nvfnh.create($_1a8dv7y7je5nvfhl.state('cyclic', $_fw94akwjje5nvfbr.constant(false)));

  var CyclicType = $_errcjszoje5nvfnh.create($_1a8dv7y7je5nvfhl.state('cyclic', $_fw94akwjje5nvfbr.constant(true)));

  var inside = function (target) {
    return $_3imygaxkje5nvfes.name(target) === 'input' && $_awg6i3xrje5nvffg.get(target, 'type') !== 'radio' || $_3imygaxkje5nvfes.name(target) === 'textarea';
  };
  var $_8k864o108je5nvfq3 = { inside: inside };

  var doDefaultExecute = function (component, simulatedEvent, focused) {
    $_an9hm6wgje5nvfbd.dispatch(component, focused, $_8j7iltwhje5nvfbj.execute());
    return Option.some(true);
  };
  var defaultExecute = function (component, simulatedEvent, focused) {
    return $_8k864o108je5nvfq3.inside(focused) && $_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.SPACE())(simulatedEvent.event()) ? Option.none() : doDefaultExecute(component, simulatedEvent, focused);
  };
  var $_bl5gcm109je5nvfq8 = { defaultExecute: defaultExecute };

  var schema$1 = [
    $_1a8dv7y7je5nvfhl.defaulted('execute', $_bl5gcm109je5nvfq8.defaultExecute),
    $_1a8dv7y7je5nvfhl.defaulted('useSpace', false),
    $_1a8dv7y7je5nvfhl.defaulted('useEnter', true),
    $_1a8dv7y7je5nvfhl.defaulted('useControlEnter', false),
    $_1a8dv7y7je5nvfhl.defaulted('useDown', false)
  ];
  var execute = function (component, simulatedEvent, executeConfig, executeState) {
    return executeConfig.execute()(component, simulatedEvent, component.element());
  };
  var getRules = function (component, simulatedEvent, executeConfig, executeState) {
    var spaceExec = executeConfig.useSpace() && !$_8k864o108je5nvfq3.inside(component.element()) ? $_2oe4idzpje5nvfnz.SPACE() : [];
    var enterExec = executeConfig.useEnter() ? $_2oe4idzpje5nvfnz.ENTER() : [];
    var downExec = executeConfig.useDown() ? $_2oe4idzpje5nvfnz.DOWN() : [];
    var execKeys = spaceExec.concat(enterExec).concat(downExec);
    return [$_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet(execKeys), execute)].concat(executeConfig.useControlEnter() ? [$_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.and([
        $_cyrd7a100je5nvfp5.isControl,
        $_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.ENTER())
      ]), execute)] : []);
  };
  var getEvents = $_fw94akwjje5nvfbr.constant({});
  var getApis = $_fw94akwjje5nvfbr.constant({});
  var ExecutionType = $_ebbmowzqje5nvfo2.typical(schema$1, $_4ccr8byjje5nvfjj.init, getRules, getEvents, getApis, Option.none());

  var flatgrid = function (spec) {
    var dimensions = Cell(Option.none());
    var setGridSize = function (numRows, numColumns) {
      dimensions.set(Option.some({
        numRows: $_fw94akwjje5nvfbr.constant(numRows),
        numColumns: $_fw94akwjje5nvfbr.constant(numColumns)
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
      readState: $_fw94akwjje5nvfbr.constant({}),
      setGridSize: setGridSize,
      getNumRows: getNumRows,
      getNumColumns: getNumColumns
    });
  };
  var init$1 = function (spec) {
    return spec.state()(spec);
  };
  var $_60kbp210bje5nvfqn = {
    flatgrid: flatgrid,
    init: init$1
  };

  var onDirection = function (isLtr, isRtl) {
    return function (element) {
      return getDirection(element) === 'rtl' ? isRtl : isLtr;
    };
  };
  var getDirection = function (element) {
    return $_98elm5103je5nvfpe.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_1hvu3z10dje5nvfqw = {
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
    var movement = $_1hvu3z10dje5nvfqw.onDirection(moveLeft, moveRight);
    return useH(movement);
  };
  var east = function (moveLeft, moveRight) {
    var movement = $_1hvu3z10dje5nvfqw.onDirection(moveRight, moveLeft);
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
  var $_83m6h910cje5nvfqt = {
    east: east,
    west: west,
    north: useV,
    south: useV,
    move: useV
  };

  var indexInfo = $_f74ptsx4je5nvfdn.immutableBag([
    'index',
    'candidates'
  ], []);
  var locate = function (candidates, predicate) {
    return $_1r8n3awsje5nvfcd.findIndex(candidates, predicate).map(function (index) {
      return indexInfo({
        index: index,
        candidates: candidates
      });
    });
  };
  var $_h7pex10fje5nvfr5 = { locate: locate };

  var visibilityToggler = function (element, property, hiddenValue, visibleValue) {
    var initial = $_98elm5103je5nvfpe.get(element, property);
    if (initial === undefined)
      initial = '';
    var value = initial === hiddenValue ? visibleValue : hiddenValue;
    var off = $_fw94akwjje5nvfbr.curry($_98elm5103je5nvfpe.set, element, property, initial);
    var on = $_fw94akwjje5nvfbr.curry($_98elm5103je5nvfpe.set, element, property, value);
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
  var $_cig3ul10gje5nvfr9 = {
    toggler: toggler$1,
    displayToggler: displayToggler,
    isVisible: isVisible
  };

  var locateVisible = function (container, current, selector) {
    var filter = $_cig3ul10gje5nvfr9.isVisible;
    return locateIn(container, current, selector, filter);
  };
  var locateIn = function (container, current, selector, filter) {
    var predicate = $_fw94akwjje5nvfbr.curry($_8rsueix9je5nvfdw.eq, current);
    var candidates = $_8xqdn0zvje5nvfot.descendants(container, selector);
    var visible = $_1r8n3awsje5nvfcd.filter(candidates, $_cig3ul10gje5nvfr9.isVisible);
    return $_h7pex10fje5nvfr5.locate(visible, predicate);
  };
  var findIndex$2 = function (elements, target) {
    return $_1r8n3awsje5nvfcd.findIndex(elements, function (elem) {
      return $_8rsueix9je5nvfdw.eq(target, elem);
    });
  };
  var $_4m81fb10eje5nvfqx = {
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
      var newColumn = $_aev0v7zuje5nvfos.cycleBy(oldColumn, delta, 0, colsInRow - 1);
      return Option.some({
        row: $_fw94akwjje5nvfbr.constant(oldRow),
        column: $_fw94akwjje5nvfbr.constant(newColumn)
      });
    });
  };
  var cycleVertical = function (values, index, numRows, numCols, delta) {
    return withGrid(values, index, numCols, function (oldRow, oldColumn) {
      var newRow = $_aev0v7zuje5nvfos.cycleBy(oldRow, delta, 0, numRows - 1);
      var onLastRow = newRow === numRows - 1;
      var colsInRow = onLastRow ? values.length - newRow * numCols : numCols;
      var newCol = $_aev0v7zuje5nvfos.cap(oldColumn, 0, colsInRow - 1);
      return Option.some({
        row: $_fw94akwjje5nvfbr.constant(newRow),
        column: $_fw94akwjje5nvfbr.constant(newCol)
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
  var $_a9mtko10hje5nvfrc = {
    cycleDown: cycleDown,
    cycleUp: cycleUp,
    cycleLeft: cycleLeft,
    cycleRight: cycleRight
  };

  var schema$2 = [
    $_1a8dv7y7je5nvfhl.strict('selector'),
    $_1a8dv7y7je5nvfhl.defaulted('execute', $_bl5gcm109je5nvfq8.defaultExecute),
    $_bnu93dz6je5nvflc.onKeyboardHandler('onEscape'),
    $_1a8dv7y7je5nvfhl.defaulted('captureTab', false),
    $_bnu93dz6je5nvflc.initSize()
  ];
  var focusIn = function (component, gridConfig, gridState) {
    $_acyoduzxje5nvfox.descendant(component.element(), gridConfig.selector()).each(function (first) {
      gridConfig.focusManager().set(component, first);
    });
  };
  var findCurrent = function (component, gridConfig) {
    return gridConfig.focusManager().get(component).bind(function (elem) {
      return $_acyoduzxje5nvfox.closest(elem, gridConfig.selector());
    });
  };
  var execute$1 = function (component, simulatedEvent, gridConfig, gridState) {
    return findCurrent(component, gridConfig).bind(function (focused) {
      return gridConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var doMove = function (cycle) {
    return function (element, focused, gridConfig, gridState) {
      return $_4m81fb10eje5nvfqx.locateVisible(element, focused, gridConfig.selector()).bind(function (identified) {
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
  var moveLeft = doMove($_a9mtko10hje5nvfrc.cycleLeft);
  var moveRight = doMove($_a9mtko10hje5nvfrc.cycleRight);
  var moveNorth = doMove($_a9mtko10hje5nvfrc.cycleUp);
  var moveSouth = doMove($_a9mtko10hje5nvfrc.cycleDown);
  var getRules$1 = $_fw94akwjje5nvfbr.constant([
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.LEFT()), $_83m6h910cje5nvfqt.west(moveLeft, moveRight)),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.RIGHT()), $_83m6h910cje5nvfqt.east(moveLeft, moveRight)),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.UP()), $_83m6h910cje5nvfqt.north(moveNorth)),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.DOWN()), $_83m6h910cje5nvfqt.south(moveSouth)),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.and([
      $_cyrd7a100je5nvfp5.isShift,
      $_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.TAB())
    ]), handleTab),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.and([
      $_cyrd7a100je5nvfp5.isNotShift,
      $_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.TAB())
    ]), handleTab),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.ESCAPE()), doEscape),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.SPACE().concat($_2oe4idzpje5nvfnz.ENTER())), execute$1)
  ]);
  var getEvents$1 = $_fw94akwjje5nvfbr.constant({});
  var getApis$1 = {};
  var FlatgridType = $_ebbmowzqje5nvfo2.typical(schema$2, $_60kbp210bje5nvfqn.flatgrid, getRules$1, getEvents$1, getApis$1, Option.some(focusIn));

  var horizontal = function (container, selector, current, delta) {
    return $_4m81fb10eje5nvfqx.locateVisible(container, current, selector, $_fw94akwjje5nvfbr.constant(true)).bind(function (identified) {
      var index = identified.index();
      var candidates = identified.candidates();
      var newIndex = $_aev0v7zuje5nvfos.cycleBy(index, delta, 0, candidates.length - 1);
      return Option.from(candidates[newIndex]);
    });
  };
  var $_bl3zbg10jje5nvfrp = { horizontal: horizontal };

  var schema$3 = [
    $_1a8dv7y7je5nvfhl.strict('selector'),
    $_1a8dv7y7je5nvfhl.defaulted('getInitial', Option.none),
    $_1a8dv7y7je5nvfhl.defaulted('execute', $_bl5gcm109je5nvfq8.defaultExecute),
    $_1a8dv7y7je5nvfhl.defaulted('executeOnMove', false)
  ];
  var findCurrent$1 = function (component, flowConfig) {
    return flowConfig.focusManager().get(component).bind(function (elem) {
      return $_acyoduzxje5nvfox.closest(elem, flowConfig.selector());
    });
  };
  var execute$2 = function (component, simulatedEvent, flowConfig) {
    return findCurrent$1(component, flowConfig).bind(function (focused) {
      return flowConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$1 = function (component, flowConfig) {
    flowConfig.getInitial()(component).or($_acyoduzxje5nvfox.descendant(component.element(), flowConfig.selector())).each(function (first) {
      flowConfig.focusManager().set(component, first);
    });
  };
  var moveLeft$1 = function (element, focused, info) {
    return $_bl3zbg10jje5nvfrp.horizontal(element, info.selector(), focused, -1);
  };
  var moveRight$1 = function (element, focused, info) {
    return $_bl3zbg10jje5nvfrp.horizontal(element, info.selector(), focused, +1);
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
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.LEFT().concat($_2oe4idzpje5nvfnz.UP())), doMove$1($_83m6h910cje5nvfqt.west(moveLeft$1, moveRight$1))),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.RIGHT().concat($_2oe4idzpje5nvfnz.DOWN())), doMove$1($_83m6h910cje5nvfqt.east(moveLeft$1, moveRight$1))),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.ENTER()), execute$2),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.SPACE()), execute$2)
    ];
  };
  var getEvents$2 = $_fw94akwjje5nvfbr.constant({});
  var getApis$2 = $_fw94akwjje5nvfbr.constant({});
  var FlowType = $_ebbmowzqje5nvfo2.typical(schema$3, $_4ccr8byjje5nvfjj.init, getRules$2, getEvents$2, getApis$2, Option.some(focusIn$1));

  var outcome = $_f74ptsx4je5nvfdn.immutableBag([
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
    var newColIndex = $_aev0v7zuje5nvfos.cycleBy(startCol, deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var cycleVertical$1 = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_aev0v7zuje5nvfos.cycleBy(startRow, deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_aev0v7zuje5nvfos.cap(colIndex, 0, colsInNextRow - 1);
    return toCell(matrix, nextRowIndex, nextColIndex);
  };
  var moveHorizontal = function (matrix, rowIndex, startCol, deltaCol) {
    var row = matrix[rowIndex];
    var colsInRow = row.length;
    var newColIndex = $_aev0v7zuje5nvfos.cap(startCol + deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var moveVertical = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_aev0v7zuje5nvfos.cap(startRow + deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_aev0v7zuje5nvfos.cap(colIndex, 0, colsInNextRow - 1);
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
  var $_5zxf0v10lje5nvfs6 = {
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
    $_1a8dv7y7je5nvfhl.strictObjOf('selectors', [
      $_1a8dv7y7je5nvfhl.strict('row'),
      $_1a8dv7y7je5nvfhl.strict('cell')
    ]),
    $_1a8dv7y7je5nvfhl.defaulted('cycles', true),
    $_1a8dv7y7je5nvfhl.defaulted('previousSelector', Option.none),
    $_1a8dv7y7je5nvfhl.defaulted('execute', $_bl5gcm109je5nvfq8.defaultExecute)
  ];
  var focusIn$2 = function (component, matrixConfig) {
    var focused = matrixConfig.previousSelector()(component).orThunk(function () {
      var selectors = matrixConfig.selectors();
      return $_acyoduzxje5nvfox.descendant(component.element(), selectors.cell());
    });
    focused.each(function (cell) {
      matrixConfig.focusManager().set(component, cell);
    });
  };
  var execute$3 = function (component, simulatedEvent, matrixConfig) {
    return $_80e37iytje5nvfk6.search(component.element()).bind(function (focused) {
      return matrixConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var toMatrix = function (rows, matrixConfig) {
    return $_1r8n3awsje5nvfcd.map(rows, function (row) {
      return $_8xqdn0zvje5nvfot.descendants(row, matrixConfig.selectors().cell());
    });
  };
  var doMove$2 = function (ifCycle, ifMove) {
    return function (element, focused, matrixConfig) {
      var move = matrixConfig.cycles() ? ifCycle : ifMove;
      return $_acyoduzxje5nvfox.closest(focused, matrixConfig.selectors().row()).bind(function (inRow) {
        var cellsInRow = $_8xqdn0zvje5nvfot.descendants(inRow, matrixConfig.selectors().cell());
        return $_4m81fb10eje5nvfqx.findIndex(cellsInRow, focused).bind(function (colIndex) {
          var allRows = $_8xqdn0zvje5nvfot.descendants(element, matrixConfig.selectors().row());
          return $_4m81fb10eje5nvfqx.findIndex(allRows, inRow).bind(function (rowIndex) {
            var matrix = toMatrix(allRows, matrixConfig);
            return move(matrix, rowIndex, colIndex).map(function (next) {
              return next.cell();
            });
          });
        });
      });
    };
  };
  var moveLeft$3 = doMove$2($_5zxf0v10lje5nvfs6.cycleLeft, $_5zxf0v10lje5nvfs6.moveLeft);
  var moveRight$3 = doMove$2($_5zxf0v10lje5nvfs6.cycleRight, $_5zxf0v10lje5nvfs6.moveRight);
  var moveNorth$1 = doMove$2($_5zxf0v10lje5nvfs6.cycleUp, $_5zxf0v10lje5nvfs6.moveUp);
  var moveSouth$1 = doMove$2($_5zxf0v10lje5nvfs6.cycleDown, $_5zxf0v10lje5nvfs6.moveDown);
  var getRules$3 = $_fw94akwjje5nvfbr.constant([
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.LEFT()), $_83m6h910cje5nvfqt.west(moveLeft$3, moveRight$3)),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.RIGHT()), $_83m6h910cje5nvfqt.east(moveLeft$3, moveRight$3)),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.UP()), $_83m6h910cje5nvfqt.north(moveNorth$1)),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.DOWN()), $_83m6h910cje5nvfqt.south(moveSouth$1)),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.SPACE().concat($_2oe4idzpje5nvfnz.ENTER())), execute$3)
  ]);
  var getEvents$3 = $_fw94akwjje5nvfbr.constant({});
  var getApis$3 = $_fw94akwjje5nvfbr.constant({});
  var MatrixType = $_ebbmowzqje5nvfo2.typical(schema$4, $_4ccr8byjje5nvfjj.init, getRules$3, getEvents$3, getApis$3, Option.some(focusIn$2));

  var schema$5 = [
    $_1a8dv7y7je5nvfhl.strict('selector'),
    $_1a8dv7y7je5nvfhl.defaulted('execute', $_bl5gcm109je5nvfq8.defaultExecute),
    $_1a8dv7y7je5nvfhl.defaulted('moveOnTab', false)
  ];
  var execute$4 = function (component, simulatedEvent, menuConfig) {
    return menuConfig.focusManager().get(component).bind(function (focused) {
      return menuConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$3 = function (component, menuConfig, simulatedEvent) {
    $_acyoduzxje5nvfox.descendant(component.element(), menuConfig.selector()).each(function (first) {
      menuConfig.focusManager().set(component, first);
    });
  };
  var moveUp$1 = function (element, focused, info) {
    return $_bl3zbg10jje5nvfrp.horizontal(element, info.selector(), focused, -1);
  };
  var moveDown$1 = function (element, focused, info) {
    return $_bl3zbg10jje5nvfrp.horizontal(element, info.selector(), focused, +1);
  };
  var fireShiftTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_83m6h910cje5nvfqt.move(moveUp$1)(component, simulatedEvent, menuConfig) : Option.none();
  };
  var fireTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_83m6h910cje5nvfqt.move(moveDown$1)(component, simulatedEvent, menuConfig) : Option.none();
  };
  var getRules$4 = $_fw94akwjje5nvfbr.constant([
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.UP()), $_83m6h910cje5nvfqt.move(moveUp$1)),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.DOWN()), $_83m6h910cje5nvfqt.move(moveDown$1)),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.and([
      $_cyrd7a100je5nvfp5.isShift,
      $_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.TAB())
    ]), fireShiftTab),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.and([
      $_cyrd7a100je5nvfp5.isNotShift,
      $_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.TAB())
    ]), fireTab),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.ENTER()), execute$4),
    $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.SPACE()), execute$4)
  ]);
  var getEvents$4 = $_fw94akwjje5nvfbr.constant({});
  var getApis$4 = $_fw94akwjje5nvfbr.constant({});
  var MenuType = $_ebbmowzqje5nvfo2.typical(schema$5, $_4ccr8byjje5nvfjj.init, getRules$4, getEvents$4, getApis$4, Option.some(focusIn$3));

  var schema$6 = [
    $_bnu93dz6je5nvflc.onKeyboardHandler('onSpace'),
    $_bnu93dz6je5nvflc.onKeyboardHandler('onEnter'),
    $_bnu93dz6je5nvflc.onKeyboardHandler('onShiftEnter'),
    $_bnu93dz6je5nvflc.onKeyboardHandler('onLeft'),
    $_bnu93dz6je5nvflc.onKeyboardHandler('onRight'),
    $_bnu93dz6je5nvflc.onKeyboardHandler('onTab'),
    $_bnu93dz6je5nvflc.onKeyboardHandler('onShiftTab'),
    $_bnu93dz6je5nvflc.onKeyboardHandler('onUp'),
    $_bnu93dz6je5nvflc.onKeyboardHandler('onDown'),
    $_bnu93dz6je5nvflc.onKeyboardHandler('onEscape'),
    $_1a8dv7y7je5nvfhl.option('focusIn')
  ];
  var getRules$5 = function (component, simulatedEvent, executeInfo) {
    return [
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.SPACE()), executeInfo.onSpace()),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.and([
        $_cyrd7a100je5nvfp5.isNotShift,
        $_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.ENTER())
      ]), executeInfo.onEnter()),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.and([
        $_cyrd7a100je5nvfp5.isShift,
        $_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.ENTER())
      ]), executeInfo.onShiftEnter()),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.and([
        $_cyrd7a100je5nvfp5.isShift,
        $_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.TAB())
      ]), executeInfo.onShiftTab()),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.and([
        $_cyrd7a100je5nvfp5.isNotShift,
        $_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.TAB())
      ]), executeInfo.onTab()),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.UP()), executeInfo.onUp()),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.DOWN()), executeInfo.onDown()),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.LEFT()), executeInfo.onLeft()),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.RIGHT()), executeInfo.onRight()),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.SPACE()), executeInfo.onSpace()),
      $_1ymgsqzzje5nvfp2.rule($_cyrd7a100je5nvfp5.inSet($_2oe4idzpje5nvfnz.ESCAPE()), executeInfo.onEscape())
    ];
  };
  var focusIn$4 = function (component, executeInfo) {
    return executeInfo.focusIn().bind(function (f) {
      return f(component, executeInfo);
    });
  };
  var getEvents$5 = $_fw94akwjje5nvfbr.constant({});
  var getApis$5 = $_fw94akwjje5nvfbr.constant({});
  var SpecialType = $_ebbmowzqje5nvfo2.typical(schema$6, $_4ccr8byjje5nvfjj.init, getRules$5, getEvents$5, getApis$5, Option.some(focusIn$4));

  var $_6ahxd2zmje5nvfnc = {
    acyclic: AcyclicType.schema(),
    cyclic: CyclicType.schema(),
    flow: FlowType.schema(),
    flatgrid: FlatgridType.schema(),
    matrix: MatrixType.schema(),
    execution: ExecutionType.schema(),
    menu: MenuType.schema(),
    special: SpecialType.schema()
  };

  var Keying = $_gg4wg0y2je5nvfgj.createModes({
    branchKey: 'mode',
    branches: $_6ahxd2zmje5nvfnc,
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
        if (!$_17met3xsje5nvffn.hasKey(keyState, 'setGridSize')) {
          console.error('Layout does not support setGridSize');
        } else {
          keyState.setGridSize(numRows, numColumns);
        }
      }
    },
    state: $_60kbp210bje5nvfqn
  });

  var field$1 = function (name, forbidden) {
    return $_1a8dv7y7je5nvfhl.defaultedObjOf(name, {}, $_1r8n3awsje5nvfcd.map(forbidden, function (f) {
      return $_1a8dv7y7je5nvfhl.forbid(f.name(), 'Cannot configure ' + f.name() + ' for ' + name);
    }).concat([$_1a8dv7y7je5nvfhl.state('dump', $_fw94akwjje5nvfbr.identity)]));
  };
  var get$5 = function (data) {
    return data.dump();
  };
  var $_4c10f910oje5nvfsu = {
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
  var $_b7bo6310rje5nvftj = { generate: generate$1 };

  var premadeTag = $_b7bo6310rje5nvftj.generate('alloy-premade');
  var apiConfig = $_b7bo6310rje5nvftj.generate('api');
  var premade = function (comp) {
    return $_17met3xsje5nvffn.wrap(premadeTag, comp);
  };
  var getPremade = function (spec) {
    return $_17met3xsje5nvffn.readOptFrom(spec, premadeTag);
  };
  var makeApi = function (f) {
    return $_fazqxwygje5nvfj1.markAsSketchApi(function (component) {
      var args = Array.prototype.slice.call(arguments, 0);
      var spi = component.config(apiConfig);
      return f.apply(undefined, [spi].concat(args));
    }, f);
  };
  var $_o5dj410qje5nvfte = {
    apiConfig: $_fw94akwjje5nvfbr.constant(apiConfig),
    makeApi: makeApi,
    premade: premade,
    getPremade: getPremade
  };

  var adt$2 = $_dj88xixwje5nvfg0.generate([
    { required: ['data'] },
    { external: ['data'] },
    { optional: ['data'] },
    { group: ['data'] }
  ]);
  var fFactory = $_1a8dv7y7je5nvfhl.defaulted('factory', { sketch: $_fw94akwjje5nvfbr.identity });
  var fSchema = $_1a8dv7y7je5nvfhl.defaulted('schema', []);
  var fName = $_1a8dv7y7je5nvfhl.strict('name');
  var fPname = $_1a8dv7y7je5nvfhl.field('pname', 'pname', $_85q6v8y8je5nvfhq.defaultedThunk(function (typeSpec) {
    return '<alloy.' + $_b7bo6310rje5nvftj.generate(typeSpec.name) + '>';
  }), $_8shw8ryeje5nvfis.anyValue());
  var fDefaults = $_1a8dv7y7je5nvfhl.defaulted('defaults', $_fw94akwjje5nvfbr.constant({}));
  var fOverrides = $_1a8dv7y7je5nvfhl.defaulted('overrides', $_fw94akwjje5nvfbr.constant({}));
  var requiredSpec = $_8shw8ryeje5nvfis.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var externalSpec = $_8shw8ryeje5nvfis.objOf([
    fFactory,
    fSchema,
    fName,
    fDefaults,
    fOverrides
  ]);
  var optionalSpec = $_8shw8ryeje5nvfis.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var groupSpec = $_8shw8ryeje5nvfis.objOf([
    fFactory,
    fSchema,
    fName,
    $_1a8dv7y7je5nvfhl.strict('unit'),
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
    return part.fold($_fw94akwjje5nvfbr.identity, $_fw94akwjje5nvfbr.identity, $_fw94akwjje5nvfbr.identity, $_fw94akwjje5nvfbr.identity);
  };
  var convert = function (adtConstructor, partSpec) {
    return function (spec) {
      var data = $_8shw8ryeje5nvfis.asStructOrDie('Converting part type', partSpec, spec);
      return adtConstructor(data);
    };
  };
  var $_5gmgi910vje5nvfue = {
    required: convert(adt$2.required, requiredSpec),
    external: convert(adt$2.external, externalSpec),
    optional: convert(adt$2.optional, optionalSpec),
    group: convert(adt$2.group, groupSpec),
    asNamedPart: asNamedPart,
    name: name$1,
    asCommon: asCommon,
    original: $_fw94akwjje5nvfbr.constant('entirety')
  };

  var placeholder = 'placeholder';
  var adt$3 = $_dj88xixwje5nvfg0.generate([
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
    return $_1r8n3awsje5nvfcd.contains([placeholder], uiType);
  };
  var subPlaceholder = function (owner, detail, compSpec, placeholders) {
    if (owner.exists(function (o) {
        return o !== compSpec.owner;
      }))
      return adt$3.single(true, $_fw94akwjje5nvfbr.constant(compSpec));
    return $_17met3xsje5nvffn.readOptFrom(placeholders, compSpec.name).fold(function () {
      throw new Error('Unknown placeholder component: ' + compSpec.name + '\nKnown: [' + $_3q4qwfx0je5nvfcy.keys(placeholders) + ']\nNamespace: ' + owner.getOr('none') + '\nSpec: ' + $_74gpplydje5nvfir.stringify(compSpec, null, 2));
    }, function (newSpec) {
      return newSpec.replace();
    });
  };
  var scan = function (owner, detail, compSpec, placeholders) {
    if (compSpec.uiType === placeholder)
      return subPlaceholder(owner, detail, compSpec, placeholders);
    else
      return adt$3.single(false, $_fw94akwjje5nvfbr.constant(compSpec));
  };
  var substitute = function (owner, detail, compSpec, placeholders) {
    var base = scan(owner, detail, compSpec, placeholders);
    return base.fold(function (req, valueThunk) {
      var value = valueThunk(detail, compSpec.config, compSpec.validated);
      var childSpecs = $_17met3xsje5nvffn.readOptFrom(value, 'components').getOr([]);
      var substituted = $_1r8n3awsje5nvfcd.bind(childSpecs, function (c) {
        return substitute(owner, detail, c, placeholders);
      });
      return [$_1v3q5lwyje5nvfcw.deepMerge(value, { components: substituted })];
    }, function (req, valuesThunk) {
      var values = valuesThunk(detail, compSpec.config, compSpec.validated);
      return values;
    });
  };
  var substituteAll = function (owner, detail, components, placeholders) {
    return $_1r8n3awsje5nvfcd.bind(components, function (c) {
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
      name: $_fw94akwjje5nvfbr.constant(label),
      required: required,
      used: used,
      replace: replace
    };
  };
  var substitutePlaces = function (owner, detail, components, placeholders) {
    var ps = $_3q4qwfx0je5nvfcy.map(placeholders, function (ph, name) {
      return oneReplace(name, ph);
    });
    var outcome = substituteAll(owner, detail, components, ps);
    $_3q4qwfx0je5nvfcy.each(ps, function (p) {
      if (p.used() === false && p.required()) {
        throw new Error('Placeholder: ' + p.name() + ' was not found in components list\nNamespace: ' + owner.getOr('none') + '\nComponents: ' + $_74gpplydje5nvfir.stringify(detail.components(), null, 2));
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
  var $_1w9d8910wje5nvfuy = {
    single: adt$3.single,
    multiple: adt$3.multiple,
    isSubstitute: isSubstitute,
    placeholder: $_fw94akwjje5nvfbr.constant(placeholder),
    substituteAll: substituteAll,
    substitutePlaces: substitutePlaces,
    singleReplace: singleReplace
  };

  var combine = function (detail, data, partSpec, partValidated) {
    var spec = partSpec;
    return $_1v3q5lwyje5nvfcw.deepMerge(data.defaults()(detail, partSpec, partValidated), partSpec, { uid: detail.partUids()[data.name()] }, data.overrides()(detail, partSpec, partValidated), { 'debug.sketcher': $_17met3xsje5nvffn.wrap('part-' + data.name(), spec) });
  };
  var subs = function (owner, detail, parts) {
    var internals = {};
    var externals = {};
    $_1r8n3awsje5nvfcd.each(parts, function (part) {
      part.fold(function (data) {
        internals[data.pname()] = $_1w9d8910wje5nvfuy.single(true, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        var partSpec = detail.parts()[data.name()]();
        externals[data.name()] = $_fw94akwjje5nvfbr.constant(combine(detail, data, partSpec[$_5gmgi910vje5nvfue.original()]()));
      }, function (data) {
        internals[data.pname()] = $_1w9d8910wje5nvfuy.single(false, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        internals[data.pname()] = $_1w9d8910wje5nvfuy.multiple(true, function (detail, _partSpec, _partValidated) {
          var units = detail[data.name()]();
          return $_1r8n3awsje5nvfcd.map(units, function (u) {
            return data.factory().sketch($_1v3q5lwyje5nvfcw.deepMerge(data.defaults()(detail, u), u, data.overrides()(detail, u)));
          });
        });
      });
    });
    return {
      internals: $_fw94akwjje5nvfbr.constant(internals),
      externals: $_fw94akwjje5nvfbr.constant(externals)
    };
  };
  var $_7feffv10uje5nvfu4 = { subs: subs };

  var generate$2 = function (owner, parts) {
    var r = {};
    $_1r8n3awsje5nvfcd.each(parts, function (part) {
      $_5gmgi910vje5nvfue.asNamedPart(part).each(function (np) {
        var g = doGenerateOne(owner, np.pname());
        r[np.name()] = function (config) {
          var validated = $_8shw8ryeje5nvfis.asRawOrDie('Part: ' + np.name() + ' in ' + owner, $_8shw8ryeje5nvfis.objOf(np.schema()), config);
          return $_1v3q5lwyje5nvfcw.deepMerge(g, {
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
      uiType: $_1w9d8910wje5nvfuy.placeholder(),
      owner: owner,
      name: pname
    };
  };
  var generateOne = function (owner, pname, config) {
    return {
      uiType: $_1w9d8910wje5nvfuy.placeholder(),
      owner: owner,
      name: pname,
      config: config,
      validated: {}
    };
  };
  var schemas = function (parts) {
    return $_1r8n3awsje5nvfcd.bind(parts, function (part) {
      return part.fold(Option.none, Option.some, Option.none, Option.none).map(function (data) {
        return $_1a8dv7y7je5nvfhl.strictObjOf(data.name(), data.schema().concat([$_bnu93dz6je5nvflc.snapshot($_5gmgi910vje5nvfue.original())]));
      }).toArray();
    });
  };
  var names = function (parts) {
    return $_1r8n3awsje5nvfcd.map(parts, $_5gmgi910vje5nvfue.name);
  };
  var substitutes = function (owner, detail, parts) {
    return $_7feffv10uje5nvfu4.subs(owner, detail, parts);
  };
  var components = function (owner, detail, internals) {
    return $_1w9d8910wje5nvfuy.substitutePlaces(Option.some(owner), detail, detail.components(), internals);
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
    $_1r8n3awsje5nvfcd.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]);
    });
    return $_3q4qwfx0je5nvfcy.map(r, $_fw94akwjje5nvfbr.constant);
  };
  var getAllParts = function (component, detail) {
    var system = component.getSystem();
    return $_3q4qwfx0je5nvfcy.map(detail.partUids(), function (pUid, k) {
      return $_fw94akwjje5nvfbr.constant(system.getByUid(pUid));
    });
  };
  var getPartsOrDie = function (component, detail, partKeys) {
    var r = {};
    var uids = detail.partUids();
    var system = component.getSystem();
    $_1r8n3awsje5nvfcd.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]).getOrDie();
    });
    return $_3q4qwfx0je5nvfcy.map(r, $_fw94akwjje5nvfbr.constant);
  };
  var defaultUids = function (baseUid, partTypes) {
    var partNames = names(partTypes);
    return $_17met3xsje5nvffn.wrapAll($_1r8n3awsje5nvfcd.map(partNames, function (pn) {
      return {
        key: pn,
        value: baseUid + '-' + pn
      };
    }));
  };
  var defaultUidsSchema = function (partTypes) {
    return $_1a8dv7y7je5nvfhl.field('partUids', 'partUids', $_85q6v8y8je5nvfhq.mergeWithThunk(function (spec) {
      return defaultUids(spec.uid, partTypes);
    }), $_8shw8ryeje5nvfis.anyValue());
  };
  var $_cqz5s610tje5nvftq = {
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
  var $_538pn910yje5nvfvj = {
    prefix: $_fw94akwjje5nvfbr.constant(prefix$1),
    idAttr: $_fw94akwjje5nvfbr.constant(idAttr)
  };

  var prefix$2 = $_538pn910yje5nvfvj.prefix();
  var idAttr$1 = $_538pn910yje5nvfvj.idAttr();
  var write = function (label, elem) {
    var id = $_b7bo6310rje5nvftj.generate(prefix$2 + label);
    $_awg6i3xrje5nvffg.set(elem, idAttr$1, id);
    return id;
  };
  var writeOnly = function (elem, uid) {
    $_awg6i3xrje5nvffg.set(elem, idAttr$1, uid);
  };
  var read$2 = function (elem) {
    var id = $_3imygaxkje5nvfes.isElement(elem) ? $_awg6i3xrje5nvffg.get(elem, idAttr$1) : null;
    return Option.from(id);
  };
  var find$3 = function (container, id) {
    return $_acyoduzxje5nvfox.descendant(container, id);
  };
  var generate$3 = function (prefix) {
    return $_b7bo6310rje5nvftj.generate(prefix);
  };
  var revoke = function (elem) {
    $_awg6i3xrje5nvffg.remove(elem, idAttr$1);
  };
  var $_6tom8d10xje5nvfvb = {
    revoke: revoke,
    write: write,
    writeOnly: writeOnly,
    read: read$2,
    find: find$3,
    generate: generate$3,
    attribute: $_fw94akwjje5nvfbr.constant(idAttr$1)
  };

  var getPartsSchema = function (partNames, _optPartNames, _owner) {
    var owner = _owner !== undefined ? _owner : 'Unknown owner';
    var fallbackThunk = function () {
      return [$_bnu93dz6je5nvflc.output('partUids', {})];
    };
    var optPartNames = _optPartNames !== undefined ? _optPartNames : fallbackThunk();
    if (partNames.length === 0 && optPartNames.length === 0)
      return fallbackThunk();
    var partsSchema = $_1a8dv7y7je5nvfhl.strictObjOf('parts', $_1r8n3awsje5nvfcd.flatten([
      $_1r8n3awsje5nvfcd.map(partNames, $_1a8dv7y7je5nvfhl.strict),
      $_1r8n3awsje5nvfcd.map(optPartNames, function (optPart) {
        return $_1a8dv7y7je5nvfhl.defaulted(optPart, $_1w9d8910wje5nvfuy.single(false, function () {
          throw new Error('The optional part: ' + optPart + ' was not specified in the config, but it was used in components');
        }));
      })
    ]));
    var partUidsSchema = $_1a8dv7y7je5nvfhl.state('partUids', function (spec) {
      if (!$_17met3xsje5nvffn.hasKey(spec, 'parts')) {
        throw new Error('Part uid definition for owner: ' + owner + ' requires "parts"\nExpected parts: ' + partNames.join(', ') + '\nSpec: ' + $_74gpplydje5nvfir.stringify(spec, null, 2));
      }
      var uids = $_3q4qwfx0je5nvfcy.map(spec.parts, function (v, k) {
        return $_17met3xsje5nvffn.readOptFrom(v, 'uid').getOrThunk(function () {
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
    var ps = partSchemas.length > 0 ? [$_1a8dv7y7je5nvfhl.strictObjOf('parts', partSchemas)] : [];
    return ps.concat([
      $_1a8dv7y7je5nvfhl.strict('uid'),
      $_1a8dv7y7je5nvfhl.defaulted('dom', {}),
      $_1a8dv7y7je5nvfhl.defaulted('components', []),
      $_bnu93dz6je5nvflc.snapshot('originalSpec'),
      $_1a8dv7y7je5nvfhl.defaulted('debug.sketcher', {})
    ]).concat(partUidsSchemas);
  };
  var asRawOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, spec, partUidsSchemas);
    return $_8shw8ryeje5nvfis.asRawOrDie(label + ' [SpecSchema]', $_8shw8ryeje5nvfis.objOfOnly(baseS.concat(schema)), spec);
  };
  var asStructOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, partUidsSchemas, spec);
    return $_8shw8ryeje5nvfis.asStructOrDie(label + ' [SpecSchema]', $_8shw8ryeje5nvfis.objOfOnly(baseS.concat(schema)), spec);
  };
  var extend = function (builder, original, nu) {
    var newSpec = $_1v3q5lwyje5nvfcw.deepMerge(original, nu);
    return builder(newSpec);
  };
  var addBehaviours = function (original, behaviours) {
    return $_1v3q5lwyje5nvfcw.deepMerge(original, behaviours);
  };
  var $_nhnh610zje5nvfvn = {
    asRawOrDie: asRawOrDie$1,
    asStructOrDie: asStructOrDie$1,
    addBehaviours: addBehaviours,
    getPartsSchema: getPartsSchema,
    extend: extend
  };

  var single = function (owner, schema, factory, spec) {
    var specWithUid = supplyUid(spec);
    var detail = $_nhnh610zje5nvfvn.asStructOrDie(owner, schema, specWithUid, [], []);
    return $_1v3q5lwyje5nvfcw.deepMerge(factory(detail, specWithUid), { 'debug.sketcher': $_17met3xsje5nvffn.wrap(owner, spec) });
  };
  var composite = function (owner, schema, partTypes, factory, spec) {
    var specWithUid = supplyUid(spec);
    var partSchemas = $_cqz5s610tje5nvftq.schemas(partTypes);
    var partUidsSchema = $_cqz5s610tje5nvftq.defaultUidsSchema(partTypes);
    var detail = $_nhnh610zje5nvfvn.asStructOrDie(owner, schema, specWithUid, partSchemas, [partUidsSchema]);
    var subs = $_cqz5s610tje5nvftq.substitutes(owner, detail, partTypes);
    var components = $_cqz5s610tje5nvftq.components(owner, detail, subs.internals());
    return $_1v3q5lwyje5nvfcw.deepMerge(factory(detail, components, specWithUid, subs.externals()), { 'debug.sketcher': $_17met3xsje5nvffn.wrap(owner, spec) });
  };
  var supplyUid = function (spec) {
    return $_1v3q5lwyje5nvfcw.deepMerge({ uid: $_6tom8d10xje5nvfvb.generate('uid') }, spec);
  };
  var $_35xg2j10sje5nvftl = {
    supplyUid: supplyUid,
    single: single,
    composite: composite
  };

  var singleSchema = $_8shw8ryeje5nvfis.objOfOnly([
    $_1a8dv7y7je5nvfhl.strict('name'),
    $_1a8dv7y7je5nvfhl.strict('factory'),
    $_1a8dv7y7je5nvfhl.strict('configFields'),
    $_1a8dv7y7je5nvfhl.defaulted('apis', {}),
    $_1a8dv7y7je5nvfhl.defaulted('extraApis', {})
  ]);
  var compositeSchema = $_8shw8ryeje5nvfis.objOfOnly([
    $_1a8dv7y7je5nvfhl.strict('name'),
    $_1a8dv7y7je5nvfhl.strict('factory'),
    $_1a8dv7y7je5nvfhl.strict('configFields'),
    $_1a8dv7y7je5nvfhl.strict('partFields'),
    $_1a8dv7y7je5nvfhl.defaulted('apis', {}),
    $_1a8dv7y7je5nvfhl.defaulted('extraApis', {})
  ]);
  var single$1 = function (rawConfig) {
    var config = $_8shw8ryeje5nvfis.asRawOrDie('Sketcher for ' + rawConfig.name, singleSchema, rawConfig);
    var sketch = function (spec) {
      return $_35xg2j10sje5nvftl.single(config.name, config.configFields, config.factory, spec);
    };
    var apis = $_3q4qwfx0je5nvfcy.map(config.apis, $_o5dj410qje5nvfte.makeApi);
    var extraApis = $_3q4qwfx0je5nvfcy.map(config.extraApis, function (f, k) {
      return $_fazqxwygje5nvfj1.markAsExtraApi(f, k);
    });
    return $_1v3q5lwyje5nvfcw.deepMerge({
      name: $_fw94akwjje5nvfbr.constant(config.name),
      partFields: $_fw94akwjje5nvfbr.constant([]),
      configFields: $_fw94akwjje5nvfbr.constant(config.configFields),
      sketch: sketch
    }, apis, extraApis);
  };
  var composite$1 = function (rawConfig) {
    var config = $_8shw8ryeje5nvfis.asRawOrDie('Sketcher for ' + rawConfig.name, compositeSchema, rawConfig);
    var sketch = function (spec) {
      return $_35xg2j10sje5nvftl.composite(config.name, config.configFields, config.partFields, config.factory, spec);
    };
    var parts = $_cqz5s610tje5nvftq.generate(config.name, config.partFields);
    var apis = $_3q4qwfx0je5nvfcy.map(config.apis, $_o5dj410qje5nvfte.makeApi);
    var extraApis = $_3q4qwfx0je5nvfcy.map(config.extraApis, function (f, k) {
      return $_fazqxwygje5nvfj1.markAsExtraApi(f, k);
    });
    return $_1v3q5lwyje5nvfcw.deepMerge({
      name: $_fw94akwjje5nvfbr.constant(config.name),
      partFields: $_fw94akwjje5nvfbr.constant(config.partFields),
      configFields: $_fw94akwjje5nvfbr.constant(config.configFields),
      sketch: sketch,
      parts: $_fw94akwjje5nvfbr.constant(parts)
    }, apis, extraApis);
  };
  var $_907xc510pje5nvft1 = {
    single: single$1,
    composite: composite$1
  };

  var events$3 = function (optAction) {
    var executeHandler = function (action) {
      return $_ge7gjjy4je5nvfh4.run($_8j7iltwhje5nvfbj.execute(), function (component, simulatedEvent) {
        action(component);
        simulatedEvent.stop();
      });
    };
    var onClick = function (component, simulatedEvent) {
      simulatedEvent.stop();
      $_an9hm6wgje5nvfbd.emitExecute(component);
    };
    var onMousedown = function (component, simulatedEvent) {
      simulatedEvent.cut();
    };
    var pointerEvents = $_2m9vcuwkje5nvfbu.detect().deviceType.isTouch() ? [$_ge7gjjy4je5nvfh4.run($_8j7iltwhje5nvfbj.tap(), onClick)] : [
      $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.click(), onClick),
      $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.mousedown(), onMousedown)
    ];
    return $_ge7gjjy4je5nvfh4.derive($_1r8n3awsje5nvfcd.flatten([
      optAction.map(executeHandler).toArray(),
      pointerEvents
    ]));
  };
  var $_5b1r45110je5nvfw6 = { events: events$3 };

  var factory = function (detail, spec) {
    var events = $_5b1r45110je5nvfw6.events(detail.action());
    var optType = $_17met3xsje5nvffn.readOptFrom(detail.dom(), 'attributes').bind($_17met3xsje5nvffn.readOpt('type'));
    var optTag = $_17met3xsje5nvffn.readOptFrom(detail.dom(), 'tag');
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: detail.components(),
      events: events,
      behaviours: $_1v3q5lwyje5nvfcw.deepMerge($_gg4wg0y2je5nvfgj.derive([
        Focusing.config({}),
        Keying.config({
          mode: 'execution',
          useSpace: true,
          useEnter: true
        })
      ]), $_4c10f910oje5nvfsu.get(detail.buttonBehaviours())),
      domModification: {
        attributes: $_1v3q5lwyje5nvfcw.deepMerge(optType.fold(function () {
          return optTag.is('button') ? { type: 'button' } : {};
        }, function (t) {
          return {};
        }), { role: detail.role().getOr('button') })
      },
      eventOrder: detail.eventOrder()
    };
  };
  var Button = $_907xc510pje5nvft1.single({
    name: 'Button',
    factory: factory,
    configFields: [
      $_1a8dv7y7je5nvfhl.defaulted('uid', undefined),
      $_1a8dv7y7je5nvfhl.strict('dom'),
      $_1a8dv7y7je5nvfhl.defaulted('components', []),
      $_4c10f910oje5nvfsu.field('buttonBehaviours', [
        Focusing,
        Keying
      ]),
      $_1a8dv7y7je5nvfhl.option('action'),
      $_1a8dv7y7je5nvfhl.option('role'),
      $_1a8dv7y7je5nvfhl.defaulted('eventOrder', {})
    ]
  });

  var exhibit$2 = function (base, unselectConfig) {
    return $_3hxngfyhje5nvfj4.nu({
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
    return $_ge7gjjy4je5nvfh4.derive([$_ge7gjjy4je5nvfh4.abort($_4z587jwije5nvfbn.selectstart(), $_fw94akwjje5nvfbr.constant(true))]);
  };
  var $_7fd73m112je5nvfwc = {
    events: events$4,
    exhibit: exhibit$2
  };

  var Unselecting = $_gg4wg0y2je5nvfgj.create({
    fields: [],
    name: 'unselecting',
    active: $_7fd73m112je5nvfwc
  });

  var getAttrs = function (elem) {
    var attributes = elem.dom().attributes !== undefined ? elem.dom().attributes : [];
    return $_1r8n3awsje5nvfcd.foldl(attributes, function (b, attr) {
      if (attr.name === 'class')
        return b;
      else
        return $_1v3q5lwyje5nvfcw.deepMerge(b, $_17met3xsje5nvffn.wrap(attr.name, attr.value));
    }, {});
  };
  var getClasses = function (elem) {
    return Array.prototype.slice.call(elem.dom().classList, 0);
  };
  var fromHtml$2 = function (html) {
    var elem = $_4ivu2mxfje5nvfeg.fromHtml(html);
    var children = $_76yst9x3je5nvfde.children(elem);
    var attrs = getAttrs(elem);
    var classes = getClasses(elem);
    var contents = children.length === 0 ? {} : { innerHtml: $_dbp1tvxoje5nvffa.get(elem) };
    return $_1v3q5lwyje5nvfcw.deepMerge({
      tag: $_3imygaxkje5nvfes.name(elem),
      classes: classes,
      attributes: attrs
    }, contents);
  };
  var sketch = function (sketcher, html, config) {
    return sketcher.sketch($_1v3q5lwyje5nvfcw.deepMerge({ dom: fromHtml$2(html) }, config));
  };
  var $_9peah1114je5nvfwj = {
    fromHtml: fromHtml$2,
    sketch: sketch
  };

  var dom$1 = function (rawHtml) {
    var html = $_53t6y4wvje5nvfcs.supplant(rawHtml, { prefix: $_1a91a2zeje5nvfmm.prefix() });
    return $_9peah1114je5nvfwj.fromHtml(html);
  };
  var spec = function (rawHtml) {
    var sDom = dom$1(rawHtml);
    return { dom: sDom };
  };
  var $_6mum2b113je5nvfwf = {
    dom: dom$1,
    spec: spec
  };

  var forToolbarCommand = function (editor, command) {
    return forToolbar(command, function () {
      editor.execCommand(command);
    }, {});
  };
  var getToggleBehaviours = function (command) {
    return $_gg4wg0y2je5nvfgj.derive([
      Toggling.config({
        toggleClass: $_1a91a2zeje5nvfmm.resolve('toolbar-button-selected'),
        toggleOnExecute: false,
        aria: { mode: 'pressed' }
      }),
      $_1eacyhzdje5nvfmj.format(command, function (button, status) {
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
      dom: $_6mum2b113je5nvfwf.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-' + clazz + ' ${prefix}-icon"></span>'),
      action: action,
      buttonBehaviours: $_1v3q5lwyje5nvfcw.deepMerge($_gg4wg0y2je5nvfgj.derive([Unselecting.config({})]), extraBehaviours)
    });
  };
  var $_5x6kkvzfje5nvfmo = {
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
  var $_g6627119je5nvfxs = {
    reduceBy: reduceBy,
    increaseBy: increaseBy,
    findValueOfX: findValueOfX
  };

  var changeEvent = 'slider.change.value';
  var isTouch = $_2m9vcuwkje5nvfbu.detect().deviceType.isTouch();
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
    $_an9hm6wgje5nvfbd.emitWith(component, changeEvent, { value: value });
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
    var value = $_g6627119je5nvfxs.findValueOfX(spectrumBounds, detail.min(), detail.max(), xValue, detail.stepSize(), detail.snapToGrid(), detail.snapStart());
    fireChange(spectrum, value);
  };
  var setXFromEvent = function (spectrum, detail, spectrumBounds, simulatedEvent) {
    return getEventX(simulatedEvent).map(function (xValue) {
      setToX(spectrum, spectrumBounds, detail, xValue);
      return xValue;
    });
  };
  var moveLeft$4 = function (spectrum, detail) {
    var newValue = $_g6627119je5nvfxs.reduceBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var moveRight$4 = function (spectrum, detail) {
    var newValue = $_g6627119je5nvfxs.increaseBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var $_2es0pe118je5nvfxk = {
    setXFromEvent: setXFromEvent,
    setToLedge: setToLedge,
    setToRedge: setToRedge,
    moveLeftFromRedge: moveLeftFromRedge,
    moveRightFromLedge: moveRightFromLedge,
    moveLeft: moveLeft$4,
    moveRight: moveRight$4,
    changeEvent: $_fw94akwjje5nvfbr.constant(changeEvent)
  };

  var platform = $_2m9vcuwkje5nvfbu.detect();
  var isTouch$1 = platform.deviceType.isTouch();
  var edgePart = function (name, action) {
    return $_5gmgi910vje5nvfue.optional({
      name: '' + name + '-edge',
      overrides: function (detail) {
        var touchEvents = $_ge7gjjy4je5nvfh4.derive([$_ge7gjjy4je5nvfh4.runActionExtra($_4z587jwije5nvfbn.touchstart(), action, [detail])]);
        var mouseEvents = $_ge7gjjy4je5nvfh4.derive([
          $_ge7gjjy4je5nvfh4.runActionExtra($_4z587jwije5nvfbn.mousedown(), action, [detail]),
          $_ge7gjjy4je5nvfh4.runActionExtra($_4z587jwije5nvfbn.mousemove(), function (l, det) {
            if (det.mouseIsDown().get())
              action(l, det);
          }, [detail])
        ]);
        return { events: isTouch$1 ? touchEvents : mouseEvents };
      }
    });
  };
  var ledgePart = edgePart('left', $_2es0pe118je5nvfxk.setToLedge);
  var redgePart = edgePart('right', $_2es0pe118je5nvfxk.setToRedge);
  var thumbPart = $_5gmgi910vje5nvfue.required({
    name: 'thumb',
    defaults: $_fw94akwjje5nvfbr.constant({ dom: { styles: { position: 'absolute' } } }),
    overrides: function (detail) {
      return {
        events: $_ge7gjjy4je5nvfh4.derive([
          $_ge7gjjy4je5nvfh4.redirectToPart($_4z587jwije5nvfbn.touchstart(), detail, 'spectrum'),
          $_ge7gjjy4je5nvfh4.redirectToPart($_4z587jwije5nvfbn.touchmove(), detail, 'spectrum'),
          $_ge7gjjy4je5nvfh4.redirectToPart($_4z587jwije5nvfbn.touchend(), detail, 'spectrum')
        ])
      };
    }
  });
  var spectrumPart = $_5gmgi910vje5nvfue.required({
    schema: [$_1a8dv7y7je5nvfhl.state('mouseIsDown', function () {
        return Cell(false);
      })],
    name: 'spectrum',
    overrides: function (detail) {
      var moveToX = function (spectrum, simulatedEvent) {
        var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
        $_2es0pe118je5nvfxk.setXFromEvent(spectrum, detail, spectrumBounds, simulatedEvent);
      };
      var touchEvents = $_ge7gjjy4je5nvfh4.derive([
        $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.touchstart(), moveToX),
        $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.touchmove(), moveToX)
      ]);
      var mouseEvents = $_ge7gjjy4je5nvfh4.derive([
        $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.mousedown(), moveToX),
        $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.mousemove(), function (spectrum, se) {
          if (detail.mouseIsDown().get())
            moveToX(spectrum, se);
        })
      ]);
      return {
        behaviours: $_gg4wg0y2je5nvfgj.derive(isTouch$1 ? [] : [
          Keying.config({
            mode: 'special',
            onLeft: function (spectrum) {
              $_2es0pe118je5nvfxk.moveLeft(spectrum, detail);
              return Option.some(true);
            },
            onRight: function (spectrum) {
              $_2es0pe118je5nvfxk.moveRight(spectrum, detail);
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
  var $_93k48q11dje5nvfy4 = {
    onLoad: onLoad$1,
    onUnload: onUnload,
    setValue: setValue,
    getValue: getValue
  };

  var events$5 = function (repConfig, repState) {
    var es = repConfig.resetOnDom() ? [
      $_ge7gjjy4je5nvfh4.runOnAttached(function (comp, se) {
        $_93k48q11dje5nvfy4.onLoad(comp, repConfig, repState);
      }),
      $_ge7gjjy4je5nvfh4.runOnDetached(function (comp, se) {
        $_93k48q11dje5nvfy4.onUnload(comp, repConfig, repState);
      })
    ] : [$_crsy8ry3je5nvfgq.loadEvent(repConfig, repState, $_93k48q11dje5nvfy4.onLoad)];
    return $_ge7gjjy4je5nvfh4.derive(es);
  };
  var $_dgr51v11cje5nvfy3 = { events: events$5 };

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
  var $_34oatt11gje5nvfyf = {
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
    return $_17met3xsje5nvffn.readOptFrom(dataset, key).fold(function () {
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
    $_1a8dv7y7je5nvfhl.option('initialValue'),
    $_1a8dv7y7je5nvfhl.strict('getFallbackEntry'),
    $_1a8dv7y7je5nvfhl.strict('getDataKey'),
    $_1a8dv7y7je5nvfhl.strict('setData'),
    $_bnu93dz6je5nvflc.output('manager', {
      setValue: setValue$1,
      getValue: getValue$1,
      onLoad: onLoad$2,
      onUnload: onUnload$1,
      state: $_34oatt11gje5nvfyf.dataset
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
    $_1a8dv7y7je5nvfhl.strict('getValue'),
    $_1a8dv7y7je5nvfhl.defaulted('setValue', $_fw94akwjje5nvfbr.noop),
    $_1a8dv7y7je5nvfhl.option('initialValue'),
    $_bnu93dz6je5nvflc.output('manager', {
      setValue: setValue$2,
      getValue: getValue$2,
      onLoad: onLoad$3,
      onUnload: $_fw94akwjje5nvfbr.noop,
      state: $_4ccr8byjje5nvfjj.init
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
    $_1a8dv7y7je5nvfhl.option('initialValue'),
    $_bnu93dz6je5nvflc.output('manager', {
      setValue: setValue$3,
      getValue: getValue$3,
      onLoad: onLoad$4,
      onUnload: onUnload$2,
      state: $_34oatt11gje5nvfyf.memory
    })
  ];

  var RepresentSchema = [
    $_1a8dv7y7je5nvfhl.defaultedOf('store', { mode: 'memory' }, $_8shw8ryeje5nvfis.choose('mode', {
      memory: MemoryStore,
      manual: ManualStore,
      dataset: DatasetStore
    })),
    $_bnu93dz6je5nvflc.onHandler('onSetValue'),
    $_1a8dv7y7je5nvfhl.defaulted('resetOnDom', false)
  ];

  var me = $_gg4wg0y2je5nvfgj.create({
    fields: RepresentSchema,
    name: 'representing',
    active: $_dgr51v11cje5nvfy3,
    apis: $_93k48q11dje5nvfy4,
    extra: {
      setValueFrom: function (component, source) {
        var value = me.getValue(source);
        me.setValue(component, value);
      }
    },
    state: $_34oatt11gje5nvfyf
  });

  var isTouch$2 = $_2m9vcuwkje5nvfbu.detect().deviceType.isTouch();
  var SliderSchema = [
    $_1a8dv7y7je5nvfhl.strict('min'),
    $_1a8dv7y7je5nvfhl.strict('max'),
    $_1a8dv7y7je5nvfhl.defaulted('stepSize', 1),
    $_1a8dv7y7je5nvfhl.defaulted('onChange', $_fw94akwjje5nvfbr.noop),
    $_1a8dv7y7je5nvfhl.defaulted('onInit', $_fw94akwjje5nvfbr.noop),
    $_1a8dv7y7je5nvfhl.defaulted('onDragStart', $_fw94akwjje5nvfbr.noop),
    $_1a8dv7y7je5nvfhl.defaulted('onDragEnd', $_fw94akwjje5nvfbr.noop),
    $_1a8dv7y7je5nvfhl.defaulted('snapToGrid', false),
    $_1a8dv7y7je5nvfhl.option('snapStart'),
    $_1a8dv7y7je5nvfhl.strict('getInitialValue'),
    $_4c10f910oje5nvfsu.field('sliderBehaviours', [
      Keying,
      me
    ]),
    $_1a8dv7y7je5nvfhl.state('value', function (spec) {
      return Cell(spec.min);
    })
  ].concat(!isTouch$2 ? [$_1a8dv7y7je5nvfhl.state('mouseIsDown', function () {
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
    $_98elm5103je5nvfpe.set(element, 'max-width', absMax + 'px');
  };
  var $_3mznm711kje5nvfza = {
    set: set$4,
    get: get$6,
    getOuter: getOuter$2,
    setMax: setMax$1
  };

  var isTouch$3 = $_2m9vcuwkje5nvfbu.detect().deviceType.isTouch();
  var sketch$1 = function (detail, components, spec, externals) {
    var range = detail.max() - detail.min();
    var getXCentre = function (component) {
      var rect = component.element().dom().getBoundingClientRect();
      return (rect.left + rect.right) / 2;
    };
    var getThumb = function (component) {
      return $_cqz5s610tje5nvftq.getPartOrDie(component, detail, 'thumb');
    };
    var getXOffset = function (slider, spectrumBounds, detail) {
      var v = detail.value().get();
      if (v < detail.min()) {
        return $_cqz5s610tje5nvftq.getPart(slider, detail, 'left-edge').fold(function () {
          return 0;
        }, function (ledge) {
          return getXCentre(ledge) - spectrumBounds.left;
        });
      } else if (v > detail.max()) {
        return $_cqz5s610tje5nvftq.getPart(slider, detail, 'right-edge').fold(function () {
          return spectrumBounds.width;
        }, function (redge) {
          return getXCentre(redge) - spectrumBounds.left;
        });
      } else {
        return (detail.value().get() - detail.min()) / range * spectrumBounds.width;
      }
    };
    var getXPos = function (slider) {
      var spectrum = $_cqz5s610tje5nvftq.getPartOrDie(slider, detail, 'spectrum');
      var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
      var sliderBounds = slider.element().dom().getBoundingClientRect();
      var xOffset = getXOffset(slider, spectrumBounds, detail);
      return spectrumBounds.left - sliderBounds.left + xOffset;
    };
    var refresh = function (component) {
      var pos = getXPos(component);
      var thumb = getThumb(component);
      var thumbRadius = $_3mznm711kje5nvfza.get(thumb.element()) / 2;
      $_98elm5103je5nvfpe.set(thumb.element(), 'left', pos - thumbRadius + 'px');
    };
    var changeValue = function (component, newValue) {
      var oldValue = detail.value().get();
      var thumb = getThumb(component);
      if (oldValue !== newValue || $_98elm5103je5nvfpe.getRaw(thumb.element(), 'left').isNone()) {
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
      $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.touchstart(), function (slider, simulatedEvent) {
        detail.onDragStart()(slider, getThumb(slider));
      }),
      $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.touchend(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
      })
    ] : [
      $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.mousedown(), function (slider, simulatedEvent) {
        simulatedEvent.stop();
        detail.onDragStart()(slider, getThumb(slider));
        detail.mouseIsDown().set(true);
      }),
      $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.mouseup(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
        detail.mouseIsDown().set(false);
      })
    ];
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_1v3q5lwyje5nvfcw.deepMerge($_gg4wg0y2je5nvfgj.derive($_1r8n3awsje5nvfcd.flatten([
        !isTouch$3 ? [Keying.config({
            mode: 'special',
            focusIn: function (slider) {
              return $_cqz5s610tje5nvftq.getPart(slider, detail, 'spectrum').map(Keying.focusIn).map($_fw94akwjje5nvfbr.constant(true));
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
      ])), $_4c10f910oje5nvfsu.get(detail.sliderBehaviours())),
      events: $_ge7gjjy4je5nvfh4.derive([
        $_ge7gjjy4je5nvfh4.run($_2es0pe118je5nvfxk.changeEvent(), function (slider, simulatedEvent) {
          changeValue(slider, simulatedEvent.event().value());
        }),
        $_ge7gjjy4je5nvfh4.runOnAttached(function (slider, simulatedEvent) {
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
  var $_czgmno11jje5nvfyx = { sketch: sketch$1 };

  var Slider = $_907xc510pje5nvft1.composite({
    name: 'Slider',
    configFields: SliderSchema,
    partFields: SliderParts,
    factory: $_czgmno11jje5nvfyx.sketch,
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
    return $_5x6kkvzfje5nvfmo.forToolbar(clazz, function () {
      var items = makeItems();
      realm.setContextToolbar([{
          label: clazz + ' group',
          items: items
        }]);
    }, {});
  };
  var $_5k4mo211lje5nvfzc = { button: button };

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
      $_98elm5103je5nvfpe.set(thumb.element(), 'background-color', color);
    };
    var onChange = function (slider, thumb, value) {
      var color = getColor(value);
      $_98elm5103je5nvfpe.set(thumb.element(), 'background-color', color);
      spec.onChange(slider, thumb, color);
    };
    return Slider.sketch({
      dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-slider ${prefix}-hue-slider-container"></div>'),
      components: [
        Slider.parts()['left-edge']($_6mum2b113je5nvfwf.spec('<div class="${prefix}-hue-slider-black"></div>')),
        Slider.parts().spectrum({
          dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-slider-gradient-container"></div>'),
          components: [$_6mum2b113je5nvfwf.spec('<div class="${prefix}-slider-gradient"></div>')],
          behaviours: $_gg4wg0y2je5nvfgj.derive([Toggling.config({ toggleClass: $_1a91a2zeje5nvfmm.resolve('thumb-active') })])
        }),
        Slider.parts()['right-edge']($_6mum2b113je5nvfwf.spec('<div class="${prefix}-hue-slider-white"></div>')),
        Slider.parts().thumb({
          dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_gg4wg0y2je5nvfgj.derive([Toggling.config({ toggleClass: $_1a91a2zeje5nvfmm.resolve('thumb-active') })])
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
      sliderBehaviours: $_gg4wg0y2je5nvfgj.derive([$_1eacyhzdje5nvfmj.orientation(Slider.refresh)])
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
    return $_5k4mo211lje5nvfzc.button(realm, 'color', function () {
      return makeItems(spec);
    });
  };
  var $_7fgtes115je5nvfwu = {
    makeItems: makeItems,
    sketch: sketch$2
  };

  var schema$7 = $_8shw8ryeje5nvfis.objOfOnly([
    $_1a8dv7y7je5nvfhl.strict('getInitialValue'),
    $_1a8dv7y7je5nvfhl.strict('onChange'),
    $_1a8dv7y7je5nvfhl.strict('category'),
    $_1a8dv7y7je5nvfhl.strict('sizes')
  ]);
  var sketch$3 = function (rawSpec) {
    var spec = $_8shw8ryeje5nvfis.asRawOrDie('SizeSlider', schema$7, rawSpec);
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
          $_1a91a2zeje5nvfmm.resolve('slider-' + spec.category + '-size-container'),
          $_1a91a2zeje5nvfmm.resolve('slider'),
          $_1a91a2zeje5nvfmm.resolve('slider-size-container')
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
      sliderBehaviours: $_gg4wg0y2je5nvfgj.derive([$_1eacyhzdje5nvfmj.orientation(Slider.refresh)]),
      components: [
        Slider.parts().spectrum({
          dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-slider-size-container"></div>'),
          components: [$_6mum2b113je5nvfwf.spec('<div class="${prefix}-slider-size-line"></div>')]
        }),
        Slider.parts().thumb({
          dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_gg4wg0y2je5nvfgj.derive([Toggling.config({ toggleClass: $_1a91a2zeje5nvfmm.resolve('thumb-active') })])
        })
      ]
    });
  };
  var $_2s0fym11nje5nvfze = { sketch: sketch$3 };

  var ancestor$3 = function (scope, transform, isRoot) {
    var element = scope.dom();
    var stop = $_130xdswzje5nvfcx.isFunction(isRoot) ? isRoot : $_fw94akwjje5nvfbr.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_4ivu2mxfje5nvfeg.fromDom(element);
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
  var $_9ls5yh11pje5nvg05 = {
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
    return $_1r8n3awsje5nvfcd.findIndex(candidates, function (v) {
      return v === size;
    });
  };
  var getRawOrComputed = function (isRoot, rawStart) {
    var optStart = $_3imygaxkje5nvfes.isElement(rawStart) ? Option.some(rawStart) : $_76yst9x3je5nvfde.parent(rawStart);
    return optStart.map(function (start) {
      var inline = $_9ls5yh11pje5nvg05.closest(start, function (elem) {
        return $_98elm5103je5nvfpe.getRaw(elem, 'font-size');
      }, isRoot);
      return inline.getOrThunk(function () {
        return $_98elm5103je5nvfpe.get(start, 'font-size');
      });
    }).getOr('');
  };
  var getSize = function (editor) {
    var node = editor.selection.getStart();
    var elem = $_4ivu2mxfje5nvfeg.fromDom(node);
    var root = $_4ivu2mxfje5nvfeg.fromDom(editor.getBody());
    var isRoot = function (e) {
      return $_8rsueix9je5nvfdw.eq(root, e);
    };
    var elemSize = getRawOrComputed(isRoot, elem);
    return $_1r8n3awsje5nvfcd.find(candidates, function (size) {
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
  var $_gh40qx11oje5nvfzo = {
    candidates: $_fw94akwjje5nvfbr.constant(candidates),
    get: get$7,
    apply: apply$1
  };

  var sizes = $_gh40qx11oje5nvfzo.candidates();
  var makeSlider$1 = function (spec) {
    return $_2s0fym11nje5nvfze.sketch({
      onChange: spec.onChange,
      sizes: sizes,
      category: 'font',
      getInitialValue: spec.getInitialValue
    });
  };
  var makeItems$1 = function (spec) {
    return [
      $_6mum2b113je5nvfwf.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-small-font ${prefix}-icon"></span>'),
      makeSlider$1(spec),
      $_6mum2b113je5nvfwf.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-large-font ${prefix}-icon"></span>')
    ];
  };
  var sketch$4 = function (realm, editor) {
    var spec = {
      onChange: function (value) {
        $_gh40qx11oje5nvfzo.apply(editor, value);
      },
      getInitialValue: function () {
        return $_gh40qx11oje5nvfzo.get(editor);
      }
    };
    return $_5k4mo211lje5nvfzc.button(realm, 'font-size', function () {
      return makeItems$1(spec);
    });
  };
  var $_2nkkky11mje5nvfzd = {
    makeItems: makeItems$1,
    sketch: sketch$4
  };

  var record = function (spec) {
    var uid = $_17met3xsje5nvffn.hasKey(spec, 'uid') ? spec.uid : $_6tom8d10xje5nvfvb.generate('memento');
    var get = function (any) {
      return any.getSystem().getByUid(uid).getOrDie();
    };
    var getOpt = function (any) {
      return any.getSystem().getByUid(uid).fold(Option.none, Option.some);
    };
    var asSpec = function () {
      return $_1v3q5lwyje5nvfcw.deepMerge(spec, { uid: uid });
    };
    return {
      get: get,
      getOpt: getOpt,
      asSpec: asSpec
    };
  };
  var $_afv5an11rje5nvg0s = { record: record };

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
  var $_5vx94u11uje5nvg1i = {
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
  var $_9i5vyt11vje5nvg1k = {
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
    var f = $_2yscqpxbje5nvfe4.getOrDie('Blob');
    return new f(parts, properties);
  }

  function FileReader () {
    var f = $_2yscqpxbje5nvfe4.getOrDie('FileReader');
    return new f();
  }

  function Uint8Array (arr) {
    var f = $_2yscqpxbje5nvfe4.getOrDie('Uint8Array');
    return new f(arr);
  }

  var requestAnimationFrame = function (callback) {
    var f = $_2yscqpxbje5nvfe4.getOrDie('requestAnimationFrame');
    f(callback);
  };
  var atob = function (base64) {
    var f = $_2yscqpxbje5nvfe4.getOrDie('atob');
    return f(base64);
  };
  var $_ex86gl120je5nvg1t = {
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
    var byteCharacters = $_ex86gl120je5nvg1t.atob(base64);
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
      canvas = $_5vx94u11uje5nvg1i.create($_9i5vyt11vje5nvg1k.getWidth(image), $_9i5vyt11vje5nvg1k.getHeight(image));
      context = $_5vx94u11uje5nvg1i.get2dContext(canvas);
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
  var $_2h9w8n11tje5nvg13 = {
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
    return $_2h9w8n11tje5nvg13.blobToImage(image);
  };
  var imageToBlob$1 = function (blob) {
    return $_2h9w8n11tje5nvg13.imageToBlob(blob);
  };
  var blobToDataUri$1 = function (blob) {
    return $_2h9w8n11tje5nvg13.blobToDataUri(blob);
  };
  var blobToBase64$1 = function (blob) {
    return $_2h9w8n11tje5nvg13.blobToBase64(blob);
  };
  var dataUriToBlobSync$1 = function (uri) {
    return $_2h9w8n11tje5nvg13.dataUriToBlobSync(uri);
  };
  var uriToBlob$1 = function (uri) {
    return Option.from($_2h9w8n11tje5nvg13.uriToBlob(uri));
  };
  var $_dnyvph11sje5nvg0z = {
    blobToImage: blobToImage$1,
    imageToBlob: imageToBlob$1,
    blobToDataUri: blobToDataUri$1,
    blobToBase64: blobToBase64$1,
    dataUriToBlobSync: dataUriToBlobSync$1,
    uriToBlob: uriToBlob$1
  };

  var addImage = function (editor, blob) {
    $_dnyvph11sje5nvg0z.blobToBase64(blob).then(function (base64) {
      editor.undoManager.transact(function () {
        var cache = editor.editorUpload.blobCache;
        var info = cache.create($_b7bo6310rje5nvftj.generate('mceu'), blob, base64);
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
    var memPicker = $_afv5an11rje5nvg0s.record({
      dom: pickerDom,
      events: $_ge7gjjy4je5nvfh4.derive([
        $_ge7gjjy4je5nvfh4.cutter($_4z587jwije5nvfbn.click()),
        $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.change(), function (picker, simulatedEvent) {
          extractBlob(simulatedEvent).each(function (blob) {
            addImage(editor, blob);
          });
        })
      ])
    });
    return Button.sketch({
      dom: $_6mum2b113je5nvfwf.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-image ${prefix}-icon"></span>'),
      components: [memPicker.asSpec()],
      action: function (button) {
        var picker = memPicker.get(button);
        picker.element().dom().click();
      }
    });
  };
  var $_ea54wj11qje5nvg0d = { sketch: sketch$5 };

  var get$8 = function (element) {
    return element.dom().textContent;
  };
  var set$5 = function (element, value) {
    element.dom().textContent = value;
  };
  var $_7il3pw123je5nvg2j = {
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
    var text = $_7il3pw123je5nvg2j.get(link);
    var url = $_awg6i3xrje5nvffg.get(link, 'href');
    var title = $_awg6i3xrje5nvffg.get(link, 'title');
    var target = $_awg6i3xrje5nvffg.get(link, 'target');
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
    var prevHref = $_awg6i3xrje5nvffg.get(link, 'href');
    var prevText = $_7il3pw123je5nvg2j.get(link);
    return prevHref === prevText;
  };
  var getTextToApply = function (link, url, info) {
    return info.text.filter(isNotEmpty).fold(function () {
      return wasSimple(link) ? Option.some(url) : Option.none();
    }, Option.some);
  };
  var unlinkIfRequired = function (editor, info) {
    var activeLink = info.link.bind($_fw94akwjje5nvfbr.identity);
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
      var activeLink = info.link.bind($_fw94akwjje5nvfbr.identity);
      activeLink.fold(function () {
        var text = info.text.filter(isNotEmpty).getOr(url);
        editor.insertContent(editor.dom.createHTML('a', attrs, editor.dom.encode(text)));
      }, function (link) {
        var text = getTextToApply(link, url, info);
        $_awg6i3xrje5nvffg.setAll(link, attrs);
        text.each(function (newText) {
          $_7il3pw123je5nvg2j.set(link, newText);
        });
      });
    });
  };
  var query = function (editor) {
    var start = $_4ivu2mxfje5nvfeg.fromDom(editor.selection.getStart());
    return $_acyoduzxje5nvfox.closest(start, 'a');
  };
  var $_5ibxlb122je5nvg22 = {
    getInfo: getInfo,
    applyInfo: applyInfo,
    query: query
  };

  var platform$1 = $_2m9vcuwkje5nvfbu.detect();
  var preserve$1 = function (f, editor) {
    var rng = editor.selection.getRng();
    f();
    editor.selection.setRng(rng);
  };
  var forAndroid = function (editor, f) {
    var wrapper = platform$1.os.isAndroid() ? preserve$1 : $_fw94akwjje5nvfbr.apply;
    wrapper(f, editor);
  };
  var $_t60e1124je5nvg2k = { forAndroid: forAndroid };

  var events$6 = function (name, eventHandlers) {
    var events = $_ge7gjjy4je5nvfh4.derive(eventHandlers);
    return $_gg4wg0y2je5nvfgj.create({
      fields: [$_1a8dv7y7je5nvfhl.strict('enabled')],
      name: name,
      active: { events: $_fw94akwjje5nvfbr.constant(events) }
    });
  };
  var config = function (name, eventHandlers) {
    var me = events$6(name, eventHandlers);
    return {
      key: name,
      value: {
        config: {},
        me: me,
        configAsRaw: $_fw94akwjje5nvfbr.constant({}),
        initialConfig: {},
        state: $_gg4wg0y2je5nvfgj.noState()
      }
    };
  };
  var $_ejbtwg126je5nvg3d = {
    events: events$6,
    config: config
  };

  var getCurrent = function (component, composeConfig, composeState) {
    return composeConfig.find()(component);
  };
  var $_enh0wb128je5nvg3j = { getCurrent: getCurrent };

  var ComposeSchema = [$_1a8dv7y7je5nvfhl.strict('find')];

  var Composing = $_gg4wg0y2je5nvfgj.create({
    fields: ComposeSchema,
    name: 'composing',
    apis: $_enh0wb128je5nvg3j
  });

  var factory$1 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_1v3q5lwyje5nvfcw.deepMerge({
        tag: 'div',
        attributes: { role: 'presentation' }
      }, detail.dom()),
      components: detail.components(),
      behaviours: $_4c10f910oje5nvfsu.get(detail.containerBehaviours()),
      events: detail.events(),
      domModification: detail.domModification(),
      eventOrder: detail.eventOrder()
    };
  };
  var Container = $_907xc510pje5nvft1.single({
    name: 'Container',
    factory: factory$1,
    configFields: [
      $_1a8dv7y7je5nvfhl.defaulted('components', []),
      $_4c10f910oje5nvfsu.field('containerBehaviours', []),
      $_1a8dv7y7je5nvfhl.defaulted('events', {}),
      $_1a8dv7y7je5nvfhl.defaulted('domModification', {}),
      $_1a8dv7y7je5nvfhl.defaulted('eventOrder', {})
    ]
  });

  var factory$2 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      behaviours: $_1v3q5lwyje5nvfcw.deepMerge($_gg4wg0y2je5nvfgj.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: detail.getInitialValue()()
          }
        }),
        Composing.config({ find: Option.some })
      ]), $_4c10f910oje5nvfsu.get(detail.dataBehaviours())),
      events: $_ge7gjjy4je5nvfh4.derive([$_ge7gjjy4je5nvfh4.runOnAttached(function (component, simulatedEvent) {
          me.setValue(component, detail.getInitialValue()());
        })])
    };
  };
  var DataField = $_907xc510pje5nvft1.single({
    name: 'DataField',
    factory: factory$2,
    configFields: [
      $_1a8dv7y7je5nvfhl.strict('uid'),
      $_1a8dv7y7je5nvfhl.strict('dom'),
      $_1a8dv7y7je5nvfhl.strict('getInitialValue'),
      $_4c10f910oje5nvfsu.field('dataBehaviours', [
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
  var $_b15brf12eje5nvg4e = {
    set: set$6,
    get: get$9
  };

  var schema$8 = [
    $_1a8dv7y7je5nvfhl.option('data'),
    $_1a8dv7y7je5nvfhl.defaulted('inputAttributes', {}),
    $_1a8dv7y7je5nvfhl.defaulted('inputStyles', {}),
    $_1a8dv7y7je5nvfhl.defaulted('type', 'input'),
    $_1a8dv7y7je5nvfhl.defaulted('tag', 'input'),
    $_1a8dv7y7je5nvfhl.defaulted('inputClasses', []),
    $_bnu93dz6je5nvflc.onHandler('onSetValue'),
    $_1a8dv7y7je5nvfhl.defaulted('styles', {}),
    $_1a8dv7y7je5nvfhl.option('placeholder'),
    $_1a8dv7y7je5nvfhl.defaulted('eventOrder', {}),
    $_4c10f910oje5nvfsu.field('inputBehaviours', [
      me,
      Focusing
    ]),
    $_1a8dv7y7je5nvfhl.defaulted('selectOnFocus', true)
  ];
  var behaviours = function (detail) {
    return $_1v3q5lwyje5nvfcw.deepMerge($_gg4wg0y2je5nvfgj.derive([
      me.config({
        store: {
          mode: 'manual',
          initialValue: detail.data().getOr(undefined),
          getValue: function (input) {
            return $_b15brf12eje5nvg4e.get(input.element());
          },
          setValue: function (input, data) {
            var current = $_b15brf12eje5nvg4e.get(input.element());
            if (current !== data) {
              $_b15brf12eje5nvg4e.set(input.element(), data);
            }
          }
        },
        onSetValue: detail.onSetValue()
      }),
      Focusing.config({
        onFocus: detail.selectOnFocus() === false ? $_fw94akwjje5nvfbr.noop : function (component) {
          var input = component.element();
          var value = $_b15brf12eje5nvg4e.get(input);
          input.dom().setSelectionRange(0, value.length);
        }
      })
    ]), $_4c10f910oje5nvfsu.get(detail.inputBehaviours()));
  };
  var dom$2 = function (detail) {
    return {
      tag: detail.tag(),
      attributes: $_1v3q5lwyje5nvfcw.deepMerge($_17met3xsje5nvffn.wrapAll([{
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
  var $_c98aik12dje5nvg3y = {
    schema: $_fw94akwjje5nvfbr.constant(schema$8),
    behaviours: behaviours,
    dom: dom$2
  };

  var factory$3 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_c98aik12dje5nvg3y.dom(detail),
      components: [],
      behaviours: $_c98aik12dje5nvg3y.behaviours(detail),
      eventOrder: detail.eventOrder()
    };
  };
  var Input = $_907xc510pje5nvft1.single({
    name: 'Input',
    configFields: $_c98aik12dje5nvg3y.schema(),
    factory: factory$3
  });

  var exhibit$3 = function (base, tabConfig) {
    return $_3hxngfyhje5nvfj4.nu({
      attributes: $_17met3xsje5nvffn.wrapAll([{
          key: tabConfig.tabAttr(),
          value: 'true'
        }])
    });
  };
  var $_3izzo312gje5nvg4g = { exhibit: exhibit$3 };

  var TabstopSchema = [$_1a8dv7y7je5nvfhl.defaulted('tabAttr', 'data-alloy-tabstop')];

  var Tabstopping = $_gg4wg0y2je5nvfgj.create({
    fields: TabstopSchema,
    name: 'tabstopping',
    active: $_3izzo312gje5nvg4g
  });

  var clearInputBehaviour = 'input-clearing';
  var field$2 = function (name, placeholder) {
    var inputSpec = $_afv5an11rje5nvg0s.record(Input.sketch({
      placeholder: placeholder,
      onSetValue: function (input, data) {
        $_an9hm6wgje5nvfbd.emit(input, $_4z587jwije5nvfbn.input());
      },
      inputBehaviours: $_gg4wg0y2je5nvfgj.derive([
        Composing.config({ find: Option.some }),
        Tabstopping.config({}),
        Keying.config({ mode: 'execution' })
      ]),
      selectOnFocus: false
    }));
    var buttonSpec = $_afv5an11rje5nvg0s.record(Button.sketch({
      dom: $_6mum2b113je5nvfwf.dom('<button class="${prefix}-input-container-x ${prefix}-icon-cancel-circle ${prefix}-icon"></button>'),
      action: function (button) {
        var input = inputSpec.get(button);
        me.setValue(input, '');
      }
    }));
    return {
      name: name,
      spec: Container.sketch({
        dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-input-container"></div>'),
        components: [
          inputSpec.asSpec(),
          buttonSpec.asSpec()
        ],
        containerBehaviours: $_gg4wg0y2je5nvfgj.derive([
          Toggling.config({ toggleClass: $_1a91a2zeje5nvfmm.resolve('input-container-empty') }),
          Composing.config({
            find: function (comp) {
              return Option.some(inputSpec.get(comp));
            }
          }),
          $_ejbtwg126je5nvg3d.config(clearInputBehaviour, [$_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.input(), function (iContainer) {
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
  var $_gij973125je5nvg2o = {
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
    return $_1r8n3awsje5nvfcd.contains(nativeDisabled, $_3imygaxkje5nvfes.name(component.element()));
  };
  var nativeIsDisabled = function (component) {
    return $_awg6i3xrje5nvffg.has(component.element(), 'disabled');
  };
  var nativeDisable = function (component) {
    $_awg6i3xrje5nvffg.set(component.element(), 'disabled', 'disabled');
  };
  var nativeEnable = function (component) {
    $_awg6i3xrje5nvffg.remove(component.element(), 'disabled');
  };
  var ariaIsDisabled = function (component) {
    return $_awg6i3xrje5nvffg.get(component.element(), 'aria-disabled') === 'true';
  };
  var ariaDisable = function (component) {
    $_awg6i3xrje5nvffg.set(component.element(), 'aria-disabled', 'true');
  };
  var ariaEnable = function (component) {
    $_awg6i3xrje5nvffg.set(component.element(), 'aria-disabled', 'false');
  };
  var disable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_26dua8ynje5nvfjs.add(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeDisable : ariaDisable;
    f(component);
  };
  var enable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_26dua8ynje5nvfjs.remove(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeEnable : ariaEnable;
    f(component);
  };
  var isDisabled = function (component) {
    return hasNative(component) ? nativeIsDisabled(component) : ariaIsDisabled(component);
  };
  var $_7bhqzx12lje5nvg60 = {
    enable: enable,
    disable: disable,
    isDisabled: isDisabled,
    onLoad: onLoad$5
  };

  var exhibit$4 = function (base, disableConfig, disableState) {
    return $_3hxngfyhje5nvfj4.nu({ classes: disableConfig.disabled() ? disableConfig.disableClass().map($_1r8n3awsje5nvfcd.pure).getOr([]) : [] });
  };
  var events$7 = function (disableConfig, disableState) {
    return $_ge7gjjy4je5nvfh4.derive([
      $_ge7gjjy4je5nvfh4.abort($_8j7iltwhje5nvfbj.execute(), function (component, simulatedEvent) {
        return $_7bhqzx12lje5nvg60.isDisabled(component, disableConfig, disableState);
      }),
      $_crsy8ry3je5nvfgq.loadEvent(disableConfig, disableState, $_7bhqzx12lje5nvg60.onLoad)
    ]);
  };
  var $_nvhfo12kje5nvg5w = {
    exhibit: exhibit$4,
    events: events$7
  };

  var DisableSchema = [
    $_1a8dv7y7je5nvfhl.defaulted('disabled', false),
    $_1a8dv7y7je5nvfhl.option('disableClass')
  ];

  var Disabling = $_gg4wg0y2je5nvfgj.create({
    fields: DisableSchema,
    name: 'disabling',
    active: $_nvhfo12kje5nvg5w,
    apis: $_7bhqzx12lje5nvg60
  });

  var owner$1 = 'form';
  var schema$9 = [$_4c10f910oje5nvfsu.field('formBehaviours', [me])];
  var getPartName = function (name) {
    return '<alloy.field.' + name + '>';
  };
  var sketch$6 = function (fSpec) {
    var parts = function () {
      var record = [];
      var field = function (name, config) {
        record.push(name);
        return $_cqz5s610tje5nvftq.generateOne(owner$1, getPartName(name), config);
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
    var fieldParts = $_1r8n3awsje5nvfcd.map(partNames, function (n) {
      return $_5gmgi910vje5nvfue.required({
        name: n,
        pname: getPartName(n)
      });
    });
    return $_35xg2j10sje5nvftl.composite(owner$1, schema$9, fieldParts, make, spec);
  };
  var make = function (detail, components, spec) {
    return $_1v3q5lwyje5nvfcw.deepMerge({
      'debug.sketcher': { 'Form': spec },
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_1v3q5lwyje5nvfcw.deepMerge($_gg4wg0y2je5nvfgj.derive([me.config({
          store: {
            mode: 'manual',
            getValue: function (form) {
              var optPs = $_cqz5s610tje5nvftq.getAllParts(form, detail);
              return $_3q4qwfx0je5nvfcy.map(optPs, function (optPThunk, pName) {
                return optPThunk().bind(Composing.getCurrent).map(me.getValue);
              });
            },
            setValue: function (form, values) {
              $_3q4qwfx0je5nvfcy.each(values, function (newValue, key) {
                $_cqz5s610tje5nvftq.getPart(form, detail, key).each(function (wrapper) {
                  Composing.getCurrent(wrapper).each(function (field) {
                    me.setValue(field, newValue);
                  });
                });
              });
            }
          }
        })]), $_4c10f910oje5nvfsu.get(detail.formBehaviours())),
      apis: {
        getField: function (form, key) {
          return $_cqz5s610tje5nvftq.getPart(form, detail, key).bind(Composing.getCurrent);
        }
      }
    });
  };
  var $_8cjjjm12nje5nvg6b = {
    getField: $_o5dj410qje5nvfte.makeApi(function (apis, component, key) {
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
  var $_1lzorw12oje5nvg6n = {
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
  var $_7uvv1u12pje5nvg6q = {
    init: init$3,
    move: move,
    complete: complete
  };

  var sketch$7 = function (rawSpec) {
    var navigateEvent = 'navigateEvent';
    var wrapperAdhocEvents = 'serializer-wrapper-events';
    var formAdhocEvents = 'form-events';
    var schema = $_8shw8ryeje5nvfis.objOf([
      $_1a8dv7y7je5nvfhl.strict('fields'),
      $_1a8dv7y7je5nvfhl.defaulted('maxFieldIndex', rawSpec.fields.length - 1),
      $_1a8dv7y7je5nvfhl.strict('onExecute'),
      $_1a8dv7y7je5nvfhl.strict('getInitialValue'),
      $_1a8dv7y7je5nvfhl.state('state', function () {
        return {
          dialogSwipeState: $_1lzorw12oje5nvg6n.value(),
          currentScreen: Cell(0)
        };
      })
    ]);
    var spec = $_8shw8ryeje5nvfis.asRawOrDie('SerialisedDialog', schema, rawSpec);
    var navigationButton = function (direction, directionName, enabled) {
      return Button.sketch({
        dom: $_6mum2b113je5nvfwf.dom('<span class="${prefix}-icon-' + directionName + ' ${prefix}-icon"></span>'),
        action: function (button) {
          $_an9hm6wgje5nvfbd.emitWith(button, navigateEvent, { direction: direction });
        },
        buttonBehaviours: $_gg4wg0y2je5nvfgj.derive([Disabling.config({
            disableClass: $_1a91a2zeje5nvfmm.resolve('toolbar-navigation-disabled'),
            disabled: !enabled
          })])
      });
    };
    var reposition = function (dialog, message) {
      $_acyoduzxje5nvfox.descendant(dialog.element(), '.' + $_1a91a2zeje5nvfmm.resolve('serialised-dialog-chain')).each(function (parent) {
        $_98elm5103je5nvfpe.set(parent, 'left', -spec.state.currentScreen.get() * message.width + 'px');
      });
    };
    var navigate = function (dialog, direction) {
      var screens = $_8xqdn0zvje5nvfot.descendants(dialog.element(), '.' + $_1a91a2zeje5nvfmm.resolve('serialised-dialog-screen'));
      $_acyoduzxje5nvfox.descendant(dialog.element(), '.' + $_1a91a2zeje5nvfmm.resolve('serialised-dialog-chain')).each(function (parent) {
        if (spec.state.currentScreen.get() + direction >= 0 && spec.state.currentScreen.get() + direction < screens.length) {
          $_98elm5103je5nvfpe.getRaw(parent, 'left').each(function (left) {
            var currentLeft = parseInt(left, 10);
            var w = $_3mznm711kje5nvfza.get(screens[0]);
            $_98elm5103je5nvfpe.set(parent, 'left', currentLeft - direction * w + 'px');
          });
          spec.state.currentScreen.set(spec.state.currentScreen.get() + direction);
        }
      });
    };
    var focusInput = function (dialog) {
      var inputs = $_8xqdn0zvje5nvfot.descendants(dialog.element(), 'input');
      var optInput = Option.from(inputs[spec.state.currentScreen.get()]);
      optInput.each(function (input) {
        dialog.getSystem().getByDom(input).each(function (inputComp) {
          $_an9hm6wgje5nvfbd.dispatchFocus(dialog, inputComp.element());
        });
      });
      var dotitems = memDots.get(dialog);
      Highlighting.highlightAt(dotitems, spec.state.currentScreen.get());
    };
    var resetState = function () {
      spec.state.currentScreen.set(0);
      spec.state.dialogSwipeState.clear();
    };
    var memForm = $_afv5an11rje5nvg0s.record($_8cjjjm12nje5nvg6b.sketch(function (parts) {
      return {
        dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-serialised-dialog"></div>'),
        components: [Container.sketch({
            dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-serialised-dialog-chain" style="left: 0px; position: absolute;"></div>'),
            components: $_1r8n3awsje5nvfcd.map(spec.fields, function (field, i) {
              return i <= spec.maxFieldIndex ? Container.sketch({
                dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-serialised-dialog-screen"></div>'),
                components: $_1r8n3awsje5nvfcd.flatten([
                  [navigationButton(-1, 'previous', i > 0)],
                  [parts.field(field.name, field.spec)],
                  [navigationButton(+1, 'next', i < spec.maxFieldIndex)]
                ])
              }) : parts.field(field.name, field.spec);
            })
          })],
        formBehaviours: $_gg4wg0y2je5nvfgj.derive([
          $_1eacyhzdje5nvfmj.orientation(function (dialog, message) {
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
          $_ejbtwg126je5nvg3d.config(formAdhocEvents, [
            $_ge7gjjy4je5nvfh4.runOnAttached(function (dialog, simulatedEvent) {
              resetState();
              var dotitems = memDots.get(dialog);
              Highlighting.highlightFirst(dotitems);
              spec.getInitialValue(dialog).each(function (v) {
                me.setValue(dialog, v);
              });
            }),
            $_ge7gjjy4je5nvfh4.runOnExecute(spec.onExecute),
            $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.transitionend(), function (dialog, simulatedEvent) {
              if (simulatedEvent.event().raw().propertyName === 'left') {
                focusInput(dialog);
              }
            }),
            $_ge7gjjy4je5nvfh4.run(navigateEvent, function (dialog, simulatedEvent) {
              var direction = simulatedEvent.event().direction();
              navigate(dialog, direction);
            })
          ])
        ])
      };
    }));
    var memDots = $_afv5an11rje5nvg0s.record({
      dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-dot-container"></div>'),
      behaviours: $_gg4wg0y2je5nvfgj.derive([Highlighting.config({
          highlightClass: $_1a91a2zeje5nvfmm.resolve('dot-active'),
          itemClass: $_1a91a2zeje5nvfmm.resolve('dot-item')
        })]),
      components: $_1r8n3awsje5nvfcd.bind(spec.fields, function (_f, i) {
        return i <= spec.maxFieldIndex ? [$_6mum2b113je5nvfwf.spec('<div class="${prefix}-dot-item ${prefix}-icon-full-dot ${prefix}-icon"></div>')] : [];
      })
    });
    return {
      dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-serializer-wrapper"></div>'),
      components: [
        memForm.asSpec(),
        memDots.asSpec()
      ],
      behaviours: $_gg4wg0y2je5nvfgj.derive([
        Keying.config({
          mode: 'special',
          focusIn: function (wrapper) {
            var form = memForm.get(wrapper);
            Keying.focusIn(form);
          }
        }),
        $_ejbtwg126je5nvg3d.config(wrapperAdhocEvents, [
          $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.touchstart(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.set($_7uvv1u12pje5nvg6q.init(simulatedEvent.event().raw().touches[0].clientX));
          }),
          $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.touchmove(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.on(function (state) {
              simulatedEvent.event().prevent();
              spec.state.dialogSwipeState.set($_7uvv1u12pje5nvg6q.move(state, simulatedEvent.event().raw().touches[0].clientX));
            });
          }),
          $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.touchend(), function (wrapper) {
            spec.state.dialogSwipeState.on(function (state) {
              var dialog = memForm.get(wrapper);
              var direction = -1 * $_7uvv1u12pje5nvg6q.complete(state);
              navigate(dialog, direction);
            });
          })
        ])
      ])
    };
  };
  var $_68a3vd12ije5nvg4p = { sketch: sketch$7 };

  var getGroups = $_9nas7jwlje5nvfbw.cached(function (realm, editor) {
    return [{
        label: 'the link group',
        items: [$_68a3vd12ije5nvg4p.sketch({
            fields: [
              $_gij973125je5nvg2o.field('url', 'Type or paste URL'),
              $_gij973125je5nvg2o.field('text', 'Link text'),
              $_gij973125je5nvg2o.field('title', 'Link title'),
              $_gij973125je5nvg2o.field('target', 'Link target'),
              $_gij973125je5nvg2o.hidden('link')
            ],
            maxFieldIndex: [
              'url',
              'text',
              'title',
              'target'
            ].length - 1,
            getInitialValue: function () {
              return Option.some($_5ibxlb122je5nvg22.getInfo(editor));
            },
            onExecute: function (dialog) {
              var info = me.getValue(dialog);
              $_5ibxlb122je5nvg22.applyInfo(editor, info);
              realm.restoreToolbar();
              editor.focus();
            }
          })]
      }];
  });
  var sketch$8 = function (realm, editor) {
    return $_5x6kkvzfje5nvfmo.forToolbarStateAction(editor, 'link', 'link', function () {
      var groups = getGroups(realm, editor);
      realm.setContextToolbar(groups);
      $_t60e1124je5nvg2k.forAndroid(editor, function () {
        realm.focusToolbar();
      });
      $_5ibxlb122je5nvg22.query(editor).each(function (link) {
        editor.selection.select(link.dom());
      });
    });
  };
  var $_2dz8zf121je5nvg1v = { sketch: sketch$8 };

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
    var schema = $_1r8n3awsje5nvfcd.map(all, function (a) {
      return $_1a8dv7y7je5nvfhl.field(a.name(), a.name(), $_85q6v8y8je5nvfhq.asOption(), $_8shw8ryeje5nvfis.objOf([
        $_1a8dv7y7je5nvfhl.strict('config'),
        $_1a8dv7y7je5nvfhl.defaulted('state', $_4ccr8byjje5nvfjj)
      ]));
    });
    var validated = $_8shw8ryeje5nvfis.asStruct('component.behaviours', $_8shw8ryeje5nvfis.objOf(schema), spec.behaviours).fold(function (errInfo) {
      throw new Error($_8shw8ryeje5nvfis.formatError(errInfo) + '\nComplete spec:\n' + $_74gpplydje5nvfir.stringify(spec, null, 2));
    }, $_fw94akwjje5nvfbr.identity);
    return {
      list: all,
      data: $_3q4qwfx0je5nvfcy.map(validated, function (blobOptionThunk) {
        var blobOption = blobOptionThunk();
        return $_fw94akwjje5nvfbr.constant(blobOption.map(function (blob) {
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
  var $_4g5uh12wje5nvg93 = {
    generateFrom: generateFrom,
    getBehaviours: getBehaviours,
    getData: getData
  };

  var getBehaviours$1 = function (spec) {
    var behaviours = $_17met3xsje5nvffn.readOptFrom(spec, 'behaviours').getOr({});
    var keys = $_1r8n3awsje5nvfcd.filter($_3q4qwfx0je5nvfcy.keys(behaviours), function (k) {
      return behaviours[k] !== undefined;
    });
    return $_1r8n3awsje5nvfcd.map(keys, function (k) {
      return spec.behaviours[k].me;
    });
  };
  var generateFrom$1 = function (spec, all) {
    return $_4g5uh12wje5nvg93.generateFrom(spec, all);
  };
  var generate$4 = function (spec) {
    var all = getBehaviours$1(spec);
    return generateFrom$1(spec, all);
  };
  var $_1i415i12vje5nvg8y = {
    generate: generate$4,
    generateFrom: generateFrom$1
  };

  var ComponentApi = $_gacga0ylje5nvfjm.exactly([
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

  var SystemApi = $_gacga0ylje5nvfjm.exactly([
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
        throw new Error('The component must be in a context to send: ' + event + '\n' + $_awwr4fxmje5nvff5.element(getComp().element()) + ' is not in context.');
      };
    };
    return SystemApi({
      debugInfo: $_fw94akwjje5nvfbr.constant('fake'),
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
    $_3q4qwfx0je5nvfcy.each(data, function (detail, key) {
      $_3q4qwfx0je5nvfcy.each(detail, function (value, indexKey) {
        var chain = $_17met3xsje5nvffn.readOr(indexKey, [])(r);
        r[indexKey] = chain.concat([tuple(key, value)]);
      });
    });
    return r;
  };
  var $_e528dw131je5nvgaa = { byInnerKey: byInnerKey };

  var behaviourDom = function (name, modification) {
    return {
      name: $_fw94akwjje5nvfbr.constant(name),
      modification: modification
    };
  };
  var concat = function (chain, aspect) {
    var values = $_1r8n3awsje5nvfcd.bind(chain, function (c) {
      return c.modification().getOr([]);
    });
    return Result.value($_17met3xsje5nvffn.wrap(aspect, values));
  };
  var onlyOne = function (chain, aspect, order) {
    if (chain.length > 1)
      return Result.error('Multiple behaviours have tried to change DOM "' + aspect + '". The guilty behaviours are: ' + $_74gpplydje5nvfir.stringify($_1r8n3awsje5nvfcd.map(chain, function (b) {
        return b.name();
      })) + '. At this stage, this ' + 'is not supported. Future releases might provide strategies for resolving this.');
    else if (chain.length === 0)
      return Result.value({});
    else
      return Result.value(chain[0].modification().fold(function () {
        return {};
      }, function (m) {
        return $_17met3xsje5nvffn.wrap(aspect, m);
      }));
  };
  var duplicate = function (aspect, k, obj, behaviours) {
    return Result.error('Mulitple behaviours have tried to change the _' + k + '_ "' + aspect + '"' + '. The guilty behaviours are: ' + $_74gpplydje5nvfir.stringify($_1r8n3awsje5nvfcd.bind(behaviours, function (b) {
      return b.modification().getOr({})[k] !== undefined ? [b.name()] : [];
    }), null, 2) + '. This is not currently supported.');
  };
  var safeMerge = function (chain, aspect) {
    var y = $_1r8n3awsje5nvfcd.foldl(chain, function (acc, c) {
      var obj = c.modification().getOr({});
      return acc.bind(function (accRest) {
        var parts = $_3q4qwfx0je5nvfcy.mapToArray(obj, function (v, k) {
          return accRest[k] !== undefined ? duplicate(aspect, k, obj, chain) : Result.value($_17met3xsje5nvffn.wrap(k, v));
        });
        return $_17met3xsje5nvffn.consolidate(parts, accRest);
      });
    }, Result.value({}));
    return y.map(function (yValue) {
      return $_17met3xsje5nvffn.wrap(aspect, yValue);
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
    var behaviourDoms = $_1v3q5lwyje5nvfcw.deepMerge({}, baseMod);
    $_1r8n3awsje5nvfcd.each(behaviours, function (behaviour) {
      behaviourDoms[behaviour.name()] = behaviour.exhibit(info, base);
    });
    var byAspect = $_e528dw131je5nvgaa.byInnerKey(behaviourDoms, behaviourDom);
    var usedAspect = $_3q4qwfx0je5nvfcy.map(byAspect, function (values, aspect) {
      return $_1r8n3awsje5nvfcd.bind(values, function (value) {
        return value.modification().fold(function () {
          return [];
        }, function (v) {
          return [value];
        });
      });
    });
    var modifications = $_3q4qwfx0je5nvfcy.mapToArray(usedAspect, function (values, aspect) {
      return $_17met3xsje5nvffn.readOptFrom(mergeTypes, aspect).fold(function () {
        return Result.error('Unknown field type: ' + aspect);
      }, function (merger) {
        return merger(values, aspect);
      });
    });
    var consolidated = $_17met3xsje5nvffn.consolidate(modifications, {});
    return consolidated.map($_3hxngfyhje5nvfj4.nu);
  };
  var $_avxgr9130je5nvg9v = { combine: combine$1 };

  var sortKeys = function (label, keyName, array, order) {
    var sliced = array.slice(0);
    try {
      var sorted = sliced.sort(function (a, b) {
        var aKey = a[keyName]();
        var bKey = b[keyName]();
        var aIndex = order.indexOf(aKey);
        var bIndex = order.indexOf(bKey);
        if (aIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + aKey + '.\nOrder specified: ' + $_74gpplydje5nvfir.stringify(order, null, 2));
        if (bIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + bKey + '.\nOrder specified: ' + $_74gpplydje5nvfir.stringify(order, null, 2));
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
  var $_f4jk0s133je5nvgau = { sortKeys: sortKeys };

  var nu$7 = function (handler, purpose) {
    return {
      handler: handler,
      purpose: $_fw94akwjje5nvfbr.constant(purpose)
    };
  };
  var curryArgs = function (descHandler, extraArgs) {
    return {
      handler: $_fw94akwjje5nvfbr.curry.apply(undefined, [descHandler.handler].concat(extraArgs)),
      purpose: descHandler.purpose
    };
  };
  var getHandler = function (descHandler) {
    return descHandler.handler;
  };
  var $_356xie134je5nvgaz = {
    nu: nu$7,
    curryArgs: curryArgs,
    getHandler: getHandler
  };

  var behaviourTuple = function (name, handler) {
    return {
      name: $_fw94akwjje5nvfbr.constant(name),
      handler: $_fw94akwjje5nvfbr.constant(handler)
    };
  };
  var nameToHandlers = function (behaviours, info) {
    var r = {};
    $_1r8n3awsje5nvfcd.each(behaviours, function (behaviour) {
      r[behaviour.name()] = behaviour.handlers(info);
    });
    return r;
  };
  var groupByEvents = function (info, behaviours, base) {
    var behaviourEvents = $_1v3q5lwyje5nvfcw.deepMerge(base, nameToHandlers(behaviours, info));
    return $_e528dw131je5nvgaa.byInnerKey(behaviourEvents, behaviourTuple);
  };
  var combine$2 = function (info, eventOrder, behaviours, base) {
    var byEventName = groupByEvents(info, behaviours, base);
    return combineGroups(byEventName, eventOrder);
  };
  var assemble = function (rawHandler) {
    var handler = $_12koz4y6je5nvfhb.read(rawHandler);
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
    return Result.error(['The event (' + eventName + ') has more than one behaviour that listens to it.\nWhen this occurs, you must ' + 'specify an event ordering for the behaviours in your spec (e.g. [ "listing", "toggling" ]).\nThe behaviours that ' + 'can trigger it are: ' + $_74gpplydje5nvfir.stringify($_1r8n3awsje5nvfcd.map(tuples, function (c) {
        return c.name();
      }), null, 2)]);
  };
  var fuse$1 = function (tuples, eventOrder, eventName) {
    var order = eventOrder[eventName];
    if (!order)
      return missingOrderError(eventName, tuples);
    else
      return $_f4jk0s133je5nvgau.sortKeys('Event: ' + eventName, 'name', tuples, order).map(function (sortedTuples) {
        var handlers = $_1r8n3awsje5nvfcd.map(sortedTuples, function (tuple) {
          return tuple.handler();
        });
        return $_12koz4y6je5nvfhb.fuse(handlers);
      });
  };
  var combineGroups = function (byEventName, eventOrder) {
    var r = $_3q4qwfx0je5nvfcy.mapToArray(byEventName, function (tuples, eventName) {
      var combined = tuples.length === 1 ? Result.value(tuples[0].handler()) : fuse$1(tuples, eventOrder, eventName);
      return combined.map(function (handler) {
        var assembled = assemble(handler);
        var purpose = tuples.length > 1 ? $_1r8n3awsje5nvfcd.filter(eventOrder, function (o) {
          return $_1r8n3awsje5nvfcd.contains(tuples, function (t) {
            return t.name() === o;
          });
        }).join(' > ') : tuples[0].name();
        return $_17met3xsje5nvffn.wrap(eventName, $_356xie134je5nvgaz.nu(assembled, purpose));
      });
    });
    return $_17met3xsje5nvffn.consolidate(r, {});
  };
  var $_ajd8wc132je5nvgaj = { combine: combine$2 };

  var toInfo = function (spec) {
    return $_8shw8ryeje5nvfis.asStruct('custom.definition', $_8shw8ryeje5nvfis.objOfOnly([
      $_1a8dv7y7je5nvfhl.field('dom', 'dom', $_85q6v8y8je5nvfhq.strict(), $_8shw8ryeje5nvfis.objOfOnly([
        $_1a8dv7y7je5nvfhl.strict('tag'),
        $_1a8dv7y7je5nvfhl.defaulted('styles', {}),
        $_1a8dv7y7je5nvfhl.defaulted('classes', []),
        $_1a8dv7y7je5nvfhl.defaulted('attributes', {}),
        $_1a8dv7y7je5nvfhl.option('value'),
        $_1a8dv7y7je5nvfhl.option('innerHtml')
      ])),
      $_1a8dv7y7je5nvfhl.strict('components'),
      $_1a8dv7y7je5nvfhl.strict('uid'),
      $_1a8dv7y7je5nvfhl.defaulted('events', {}),
      $_1a8dv7y7je5nvfhl.defaulted('apis', $_fw94akwjje5nvfbr.constant({})),
      $_1a8dv7y7je5nvfhl.field('eventOrder', 'eventOrder', $_85q6v8y8je5nvfhq.mergeWith({
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
      }), $_8shw8ryeje5nvfis.anyValue()),
      $_1a8dv7y7je5nvfhl.option('domModification'),
      $_bnu93dz6je5nvflc.snapshot('originalSpec'),
      $_1a8dv7y7je5nvfhl.defaulted('debug.sketcher', 'unknown')
    ]), spec);
  };
  var getUid = function (info) {
    return $_17met3xsje5nvffn.wrap($_538pn910yje5nvfvj.idAttr(), info.uid());
  };
  var toDefinition = function (info) {
    var base = {
      tag: info.dom().tag(),
      classes: info.dom().classes(),
      attributes: $_1v3q5lwyje5nvfcw.deepMerge(getUid(info), info.dom().attributes()),
      styles: info.dom().styles(),
      domChildren: $_1r8n3awsje5nvfcd.map(info.components(), function (comp) {
        return comp.element();
      })
    };
    return $_ffiyu0yije5nvfjf.nu($_1v3q5lwyje5nvfcw.deepMerge(base, info.dom().innerHtml().map(function (h) {
      return $_17met3xsje5nvffn.wrap('innerHtml', h);
    }).getOr({}), info.dom().value().map(function (h) {
      return $_17met3xsje5nvffn.wrap('value', h);
    }).getOr({})));
  };
  var toModification = function (info) {
    return info.domModification().fold(function () {
      return $_3hxngfyhje5nvfj4.nu({});
    }, $_3hxngfyhje5nvfj4.nu);
  };
  var toApis = function (info) {
    return info.apis();
  };
  var toEvents = function (info) {
    return info.events();
  };
  var $_3plsbh135je5nvgb5 = {
    toInfo: toInfo,
    toDefinition: toDefinition,
    toModification: toModification,
    toApis: toApis,
    toEvents: toEvents
  };

  var add$3 = function (element, classes) {
    $_1r8n3awsje5nvfcd.each(classes, function (x) {
      $_26dua8ynje5nvfjs.add(element, x);
    });
  };
  var remove$6 = function (element, classes) {
    $_1r8n3awsje5nvfcd.each(classes, function (x) {
      $_26dua8ynje5nvfjs.remove(element, x);
    });
  };
  var toggle$3 = function (element, classes) {
    $_1r8n3awsje5nvfcd.each(classes, function (x) {
      $_26dua8ynje5nvfjs.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_1r8n3awsje5nvfcd.forall(classes, function (clazz) {
      return $_26dua8ynje5nvfjs.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_1r8n3awsje5nvfcd.exists(classes, function (clazz) {
      return $_26dua8ynje5nvfjs.has(element, clazz);
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
    return $_fd7snjypje5nvfjv.supports(element) ? getNative(element) : $_fd7snjypje5nvfjv.get(element);
  };
  var $_ay0w16137je5nvgbx = {
    add: add$3,
    remove: remove$6,
    toggle: toggle$3,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$10
  };

  var getChildren = function (definition) {
    if (definition.domChildren().isSome() && definition.defChildren().isSome()) {
      throw new Error('Cannot specify children and child specs! Must be one or the other.\nDef: ' + $_ffiyu0yije5nvfjf.defToStr(definition));
    } else {
      return definition.domChildren().fold(function () {
        var defChildren = definition.defChildren().getOr([]);
        return $_1r8n3awsje5nvfcd.map(defChildren, renderDef);
      }, function (domChildren) {
        return domChildren;
      });
    }
  };
  var renderToDom = function (definition) {
    var subject = $_4ivu2mxfje5nvfeg.fromTag(definition.tag());
    $_awg6i3xrje5nvffg.setAll(subject, definition.attributes().getOr({}));
    $_ay0w16137je5nvgbx.add(subject, definition.classes().getOr([]));
    $_98elm5103je5nvfpe.setAll(subject, definition.styles().getOr({}));
    $_dbp1tvxoje5nvffa.set(subject, definition.innerHtml().getOr(''));
    var children = getChildren(definition);
    $_76ml55xije5nvfen.append(subject, children);
    definition.value().each(function (value) {
      $_b15brf12eje5nvg4e.set(subject, value);
    });
    return subject;
  };
  var renderDef = function (spec) {
    var definition = $_ffiyu0yije5nvfjf.nu(spec);
    return renderToDom(definition);
  };
  var $_6ln6qd136je5nvgbk = { renderToDom: renderToDom };

  var build = function (spec) {
    var getMe = function () {
      return me;
    };
    var systemApi = Cell(NoContextApi(getMe));
    var info = $_8shw8ryeje5nvfis.getOrDie($_3plsbh135je5nvgb5.toInfo($_1v3q5lwyje5nvfcw.deepMerge(spec, { behaviours: undefined })));
    var bBlob = $_1i415i12vje5nvg8y.generate(spec);
    var bList = $_4g5uh12wje5nvg93.getBehaviours(bBlob);
    var bData = $_4g5uh12wje5nvg93.getData(bBlob);
    var definition = $_3plsbh135je5nvgb5.toDefinition(info);
    var baseModification = { 'alloy.base.modification': $_3plsbh135je5nvgb5.toModification(info) };
    var modification = $_avxgr9130je5nvg9v.combine(bData, baseModification, bList, definition).getOrDie();
    var modDefinition = $_3hxngfyhje5nvfj4.merge(definition, modification);
    var item = $_6ln6qd136je5nvgbk.renderToDom(modDefinition);
    var baseEvents = { 'alloy.base.behaviour': $_3plsbh135je5nvgb5.toEvents(info) };
    var events = $_ajd8wc132je5nvgaj.combine(bData, info.eventOrder(), bList, baseEvents).getOrDie();
    var subcomponents = Cell(info.components());
    var connect = function (newApi) {
      systemApi.set(newApi);
    };
    var disconnect = function () {
      systemApi.set(NoContextApi(getMe));
    };
    var syncComponents = function () {
      var children = $_76yst9x3je5nvfde.children(item);
      var subs = $_1r8n3awsje5nvfcd.bind(children, function (child) {
        return systemApi.get().getByDom(child).fold(function () {
          return [];
        }, function (c) {
          return [c];
        });
      });
      subcomponents.set(subs);
    };
    var config = function (behaviour) {
      if (behaviour === $_o5dj410qje5nvfte.apiConfig())
        return info.apis();
      var b = bData;
      var f = $_130xdswzje5nvfcx.isFunction(b[behaviour.name()]) ? b[behaviour.name()] : function () {
        throw new Error('Could not find ' + behaviour.name() + ' in ' + $_74gpplydje5nvfir.stringify(spec, null, 2));
      };
      return f();
    };
    var hasConfigured = function (behaviour) {
      return $_130xdswzje5nvfcx.isFunction(bData[behaviour.name()]);
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
      spec: $_fw94akwjje5nvfbr.constant(spec),
      readState: readState,
      connect: connect,
      disconnect: disconnect,
      element: $_fw94akwjje5nvfbr.constant(item),
      syncComponents: syncComponents,
      components: subcomponents.get,
      events: $_fw94akwjje5nvfbr.constant(events)
    });
    return me;
  };
  var $_453d0b12uje5nvg8l = { build: build };

  var isRecursive = function (component, originator, target) {
    return $_8rsueix9je5nvfdw.eq(originator, component.element()) && !$_8rsueix9je5nvfdw.eq(originator, target);
  };
  var $_2zecsp138je5nvgc2 = {
    events: $_ge7gjjy4je5nvfh4.derive([$_ge7gjjy4je5nvfh4.can($_8j7iltwhje5nvfbj.focus(), function (component, simulatedEvent) {
        var originator = simulatedEvent.event().originator();
        var target = simulatedEvent.event().target();
        if (isRecursive(component, originator, target)) {
          console.warn($_8j7iltwhje5nvfbj.focus() + ' did not get interpreted by the desired target. ' + '\nOriginator: ' + $_awwr4fxmje5nvff5.element(originator) + '\nTarget: ' + $_awwr4fxmje5nvff5.element(target) + '\nCheck the ' + $_8j7iltwhje5nvfbj.focus() + ' event handlers');
          return false;
        } else {
          return true;
        }
      })])
  };

  var make$1 = function (spec) {
    return spec;
  };
  var $_dzsmme139je5nvgc5 = { make: make$1 };

  var buildSubcomponents = function (spec) {
    var components = $_17met3xsje5nvffn.readOr('components', [])(spec);
    return $_1r8n3awsje5nvfcd.map(components, build$1);
  };
  var buildFromSpec = function (userSpec) {
    var spec = $_dzsmme139je5nvgc5.make(userSpec);
    var components = buildSubcomponents(spec);
    var completeSpec = $_1v3q5lwyje5nvfcw.deepMerge($_2zecsp138je5nvgc2, spec, $_17met3xsje5nvffn.wrap('components', components));
    return Result.value($_453d0b12uje5nvg8l.build(completeSpec));
  };
  var text = function (textContent) {
    var element = $_4ivu2mxfje5nvfeg.fromText(textContent);
    return external({ element: element });
  };
  var external = function (spec) {
    var extSpec = $_8shw8ryeje5nvfis.asStructOrDie('external.component', $_8shw8ryeje5nvfis.objOfOnly([
      $_1a8dv7y7je5nvfhl.strict('element'),
      $_1a8dv7y7je5nvfhl.option('uid')
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
      $_6tom8d10xje5nvfvb.writeOnly(extSpec.element(), uid);
    });
    var me = ComponentApi({
      getSystem: systemApi.get,
      config: Option.none,
      hasConfigured: $_fw94akwjje5nvfbr.constant(false),
      connect: connect,
      disconnect: disconnect,
      element: $_fw94akwjje5nvfbr.constant(extSpec.element()),
      spec: $_fw94akwjje5nvfbr.constant(spec),
      readState: $_fw94akwjje5nvfbr.constant('No state'),
      syncComponents: $_fw94akwjje5nvfbr.noop,
      components: $_fw94akwjje5nvfbr.constant([]),
      events: $_fw94akwjje5nvfbr.constant({})
    });
    return $_o5dj410qje5nvfte.premade(me);
  };
  var build$1 = function (rawUserSpec) {
    return $_o5dj410qje5nvfte.getPremade(rawUserSpec).fold(function () {
      var userSpecWithUid = $_1v3q5lwyje5nvfcw.deepMerge({ uid: $_6tom8d10xje5nvfvb.generate('') }, rawUserSpec);
      return buildFromSpec(userSpecWithUid).getOrDie();
    }, function (prebuilt) {
      return prebuilt;
    });
  };
  var $_92nfmp12tje5nvg7w = {
    build: build$1,
    premade: $_o5dj410qje5nvfte.premade,
    external: external,
    text: text
  };

  var hoverEvent = 'alloy.item-hover';
  var focusEvent = 'alloy.item-focus';
  var onHover = function (item) {
    if ($_80e37iytje5nvfk6.search(item.element()).isNone() || Focusing.isFocused(item)) {
      if (!Focusing.isFocused(item))
        Focusing.focus(item);
      $_an9hm6wgje5nvfbd.emitWith(item, hoverEvent, { item: item });
    }
  };
  var onFocus = function (item) {
    $_an9hm6wgje5nvfbd.emitWith(item, focusEvent, { item: item });
  };
  var $_3kz0dj13dje5nvgcr = {
    hover: $_fw94akwjje5nvfbr.constant(hoverEvent),
    focus: $_fw94akwjje5nvfbr.constant(focusEvent),
    onHover: onHover,
    onFocus: onFocus
  };

  var builder = function (info) {
    return {
      dom: $_1v3q5lwyje5nvfcw.deepMerge(info.dom(), { attributes: { role: info.toggling().isSome() ? 'menuitemcheckbox' : 'menuitem' } }),
      behaviours: $_1v3q5lwyje5nvfcw.deepMerge($_gg4wg0y2je5nvfgj.derive([
        info.toggling().fold(Toggling.revoke, function (tConfig) {
          return Toggling.config($_1v3q5lwyje5nvfcw.deepMerge({ aria: { mode: 'checked' } }, tConfig));
        }),
        Focusing.config({
          ignore: info.ignoreFocus(),
          onFocus: function (component) {
            $_3kz0dj13dje5nvgcr.onFocus(component);
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
      events: $_ge7gjjy4je5nvfh4.derive([
        $_ge7gjjy4je5nvfh4.runWithTarget($_8j7iltwhje5nvfbj.tapOrClick(), $_an9hm6wgje5nvfbd.emitExecute),
        $_ge7gjjy4je5nvfh4.cutter($_4z587jwije5nvfbn.mousedown()),
        $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.mouseover(), $_3kz0dj13dje5nvgcr.onHover),
        $_ge7gjjy4je5nvfh4.run($_8j7iltwhje5nvfbj.focusItem(), Focusing.focus)
      ]),
      components: info.components(),
      domModification: info.domModification()
    };
  };
  var schema$10 = [
    $_1a8dv7y7je5nvfhl.strict('data'),
    $_1a8dv7y7je5nvfhl.strict('components'),
    $_1a8dv7y7je5nvfhl.strict('dom'),
    $_1a8dv7y7je5nvfhl.option('toggling'),
    $_1a8dv7y7je5nvfhl.defaulted('itemBehaviours', {}),
    $_1a8dv7y7je5nvfhl.defaulted('ignoreFocus', false),
    $_1a8dv7y7je5nvfhl.defaulted('domModification', {}),
    $_bnu93dz6je5nvflc.output('builder', builder)
  ];

  var builder$1 = function (detail) {
    return {
      dom: detail.dom(),
      components: detail.components(),
      events: $_ge7gjjy4je5nvfh4.derive([$_ge7gjjy4je5nvfh4.stopper($_8j7iltwhje5nvfbj.focusItem())])
    };
  };
  var schema$11 = [
    $_1a8dv7y7je5nvfhl.strict('dom'),
    $_1a8dv7y7je5nvfhl.strict('components'),
    $_bnu93dz6je5nvflc.output('builder', builder$1)
  ];

  var owner$2 = 'item-widget';
  var partTypes = [$_5gmgi910vje5nvfue.required({
      name: 'widget',
      overrides: function (detail) {
        return {
          behaviours: $_gg4wg0y2je5nvfgj.derive([me.config({
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
  var $_6m6rup13gje5nvgd9 = {
    owner: $_fw94akwjje5nvfbr.constant(owner$2),
    parts: $_fw94akwjje5nvfbr.constant(partTypes)
  };

  var builder$2 = function (info) {
    var subs = $_cqz5s610tje5nvftq.substitutes($_6m6rup13gje5nvgd9.owner(), info, $_6m6rup13gje5nvgd9.parts());
    var components = $_cqz5s610tje5nvftq.components($_6m6rup13gje5nvgd9.owner(), info, subs.internals());
    var focusWidget = function (component) {
      return $_cqz5s610tje5nvftq.getPart(component, info, 'widget').map(function (widget) {
        Keying.focusIn(widget);
        return widget;
      });
    };
    var onHorizontalArrow = function (component, simulatedEvent) {
      return $_8k864o108je5nvfq3.inside(simulatedEvent.event().target()) ? Option.none() : function () {
        if (info.autofocus()) {
          simulatedEvent.setSource(component.element());
          return Option.none();
        } else {
          return Option.none();
        }
      }();
    };
    return $_1v3q5lwyje5nvfcw.deepMerge({
      dom: info.dom(),
      components: components,
      domModification: info.domModification(),
      events: $_ge7gjjy4je5nvfh4.derive([
        $_ge7gjjy4je5nvfh4.runOnExecute(function (component, simulatedEvent) {
          focusWidget(component).each(function (widget) {
            simulatedEvent.stop();
          });
        }),
        $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.mouseover(), $_3kz0dj13dje5nvgcr.onHover),
        $_ge7gjjy4je5nvfh4.run($_8j7iltwhje5nvfbj.focusItem(), function (component, simulatedEvent) {
          if (info.autofocus())
            focusWidget(component);
          else
            Focusing.focus(component);
        })
      ]),
      behaviours: $_gg4wg0y2je5nvfgj.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: info.data()
          }
        }),
        Focusing.config({
          onFocus: function (component) {
            $_3kz0dj13dje5nvgcr.onFocus(component);
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
    $_1a8dv7y7je5nvfhl.strict('uid'),
    $_1a8dv7y7je5nvfhl.strict('data'),
    $_1a8dv7y7je5nvfhl.strict('components'),
    $_1a8dv7y7je5nvfhl.strict('dom'),
    $_1a8dv7y7je5nvfhl.defaulted('autofocus', false),
    $_1a8dv7y7je5nvfhl.defaulted('domModification', {}),
    $_cqz5s610tje5nvftq.defaultUidsSchema($_6m6rup13gje5nvgd9.parts()),
    $_bnu93dz6je5nvflc.output('builder', builder$2)
  ];

  var itemSchema$1 = $_8shw8ryeje5nvfis.choose('type', {
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
  var parts = [$_5gmgi910vje5nvfue.group({
      factory: {
        sketch: function (spec) {
          var itemInfo = $_8shw8ryeje5nvfis.asStructOrDie('menu.spec item', itemSchema$1, spec);
          return itemInfo.builder()(itemInfo);
        }
      },
      name: 'items',
      unit: 'item',
      defaults: function (detail, u) {
        var fallbackUid = $_6tom8d10xje5nvfvb.generate('');
        return $_1v3q5lwyje5nvfcw.deepMerge({ uid: fallbackUid }, u);
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
    $_1a8dv7y7je5nvfhl.strict('value'),
    $_1a8dv7y7je5nvfhl.strict('items'),
    $_1a8dv7y7je5nvfhl.strict('dom'),
    $_1a8dv7y7je5nvfhl.strict('components'),
    $_1a8dv7y7je5nvfhl.defaulted('eventOrder', {}),
    $_4c10f910oje5nvfsu.field('menuBehaviours', [
      Highlighting,
      me,
      Composing,
      Keying
    ]),
    $_1a8dv7y7je5nvfhl.defaultedOf('movement', {
      mode: 'menu',
      moveOnTab: true
    }, $_8shw8ryeje5nvfis.choose('mode', {
      grid: [
        $_bnu93dz6je5nvflc.initSize(),
        $_bnu93dz6je5nvflc.output('config', configureGrid)
      ],
      menu: [
        $_1a8dv7y7je5nvfhl.defaulted('moveOnTab', true),
        $_bnu93dz6je5nvflc.output('config', configureMenu)
      ]
    })),
    $_bnu93dz6je5nvflc.itemMarkers(),
    $_1a8dv7y7je5nvfhl.defaulted('fakeFocus', false),
    $_1a8dv7y7je5nvfhl.defaulted('focusManager', $_djz90tzrje5nvfo6.dom()),
    $_bnu93dz6je5nvflc.onHandler('onHighlight')
  ];
  var $_5haa7513bje5nvgc7 = {
    name: $_fw94akwjje5nvfbr.constant('Menu'),
    schema: $_fw94akwjje5nvfbr.constant(schema$13),
    parts: $_fw94akwjje5nvfbr.constant(parts)
  };

  var focusEvent$1 = 'alloy.menu-focus';
  var $_76dusj13ije5nvgdj = { focus: $_fw94akwjje5nvfbr.constant(focusEvent$1) };

  var make$2 = function (detail, components, spec, externals) {
    return $_1v3q5lwyje5nvfcw.deepMerge({
      dom: $_1v3q5lwyje5nvfcw.deepMerge(detail.dom(), { attributes: { role: 'menu' } }),
      uid: detail.uid(),
      behaviours: $_1v3q5lwyje5nvfcw.deepMerge($_gg4wg0y2je5nvfgj.derive([
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
        Composing.config({ find: $_fw94akwjje5nvfbr.identity }),
        Keying.config(detail.movement().config()(detail, detail.movement()))
      ]), $_4c10f910oje5nvfsu.get(detail.menuBehaviours())),
      events: $_ge7gjjy4je5nvfh4.derive([
        $_ge7gjjy4je5nvfh4.run($_3kz0dj13dje5nvgcr.focus(), function (menu, simulatedEvent) {
          var event = simulatedEvent.event();
          menu.getSystem().getByDom(event.target()).each(function (item) {
            Highlighting.highlight(menu, item);
            simulatedEvent.stop();
            $_an9hm6wgje5nvfbd.emitWith(menu, $_76dusj13ije5nvgdj.focus(), {
              menu: menu,
              item: item
            });
          });
        }),
        $_ge7gjjy4je5nvfh4.run($_3kz0dj13dje5nvgcr.hover(), function (menu, simulatedEvent) {
          var item = simulatedEvent.event().item();
          Highlighting.highlight(menu, item);
        })
      ]),
      components: components,
      eventOrder: detail.eventOrder()
    });
  };
  var $_3enm1x13hje5nvgdd = { make: make$2 };

  var Menu = $_907xc510pje5nvft1.composite({
    name: 'Menu',
    configFields: $_5haa7513bje5nvgc7.schema(),
    partFields: $_5haa7513bje5nvgc7.parts(),
    factory: $_3enm1x13hje5nvgdd.make
  });

  var preserve$2 = function (f, container) {
    var ownerDoc = $_76yst9x3je5nvfde.owner(container);
    var refocus = $_80e37iytje5nvfk6.active(ownerDoc).bind(function (focused) {
      var hasFocus = function (elem) {
        return $_8rsueix9je5nvfdw.eq(focused, elem);
      };
      return hasFocus(container) ? Option.some(container) : $_eew4a3yvje5nvfkb.descendant(container, hasFocus);
    });
    var result = f(container);
    refocus.each(function (oldFocus) {
      $_80e37iytje5nvfk6.active(ownerDoc).filter(function (newFocus) {
        return $_8rsueix9je5nvfdw.eq(newFocus, oldFocus);
      }).orThunk(function () {
        $_80e37iytje5nvfk6.focus(oldFocus);
      });
    });
    return result;
  };
  var $_22udc613mje5nvge6 = { preserve: preserve$2 };

  var set$7 = function (component, replaceConfig, replaceState, data) {
    $_fap2yjx1je5nvfd1.detachChildren(component);
    $_22udc613mje5nvge6.preserve(function () {
      var children = $_1r8n3awsje5nvfcd.map(data, component.getSystem().build);
      $_1r8n3awsje5nvfcd.each(children, function (l) {
        $_fap2yjx1je5nvfd1.attach(component, l);
      });
    }, component.element());
  };
  var insert = function (component, replaceConfig, insertion, childSpec) {
    var child = component.getSystem().build(childSpec);
    $_fap2yjx1je5nvfd1.attachWith(component, child, insertion);
  };
  var append$2 = function (component, replaceConfig, replaceState, appendee) {
    insert(component, replaceConfig, $_hzekox2je5nvfdc.append, appendee);
  };
  var prepend$2 = function (component, replaceConfig, replaceState, prependee) {
    insert(component, replaceConfig, $_hzekox2je5nvfdc.prepend, prependee);
  };
  var remove$7 = function (component, replaceConfig, replaceState, removee) {
    var children = contents(component, replaceConfig);
    var foundChild = $_1r8n3awsje5nvfcd.find(children, function (child) {
      return $_8rsueix9je5nvfdw.eq(removee.element(), child.element());
    });
    foundChild.each($_fap2yjx1je5nvfd1.detach);
  };
  var contents = function (component, replaceConfig) {
    return component.components();
  };
  var $_7k4n3x13lje5nvgdw = {
    append: append$2,
    prepend: prepend$2,
    remove: remove$7,
    set: set$7,
    contents: contents
  };

  var Replacing = $_gg4wg0y2je5nvfgj.create({
    fields: [],
    name: 'replacing',
    apis: $_7k4n3x13lje5nvgdw
  });

  var transpose = function (obj) {
    return $_3q4qwfx0je5nvfcy.tupleMap(obj, function (v, k) {
      return {
        k: v,
        v: k
      };
    });
  };
  var trace = function (items, byItem, byMenu, finish) {
    return $_17met3xsje5nvffn.readOptFrom(byMenu, finish).bind(function (triggerItem) {
      return $_17met3xsje5nvffn.readOptFrom(items, triggerItem).bind(function (triggerMenu) {
        var rest = trace(items, byItem, byMenu, triggerMenu);
        return Option.some([triggerMenu].concat(rest));
      });
    }).getOr([]);
  };
  var generate$5 = function (menus, expansions) {
    var items = {};
    $_3q4qwfx0je5nvfcy.each(menus, function (menuItems, menu) {
      $_1r8n3awsje5nvfcd.each(menuItems, function (item) {
        items[item] = menu;
      });
    });
    var byItem = expansions;
    var byMenu = transpose(expansions);
    var menuPaths = $_3q4qwfx0je5nvfcy.map(byMenu, function (triggerItem, submenu) {
      return [submenu].concat(trace(items, byItem, byMenu, submenu));
    });
    return $_3q4qwfx0je5nvfcy.map(items, function (path) {
      return $_17met3xsje5nvffn.readOptFrom(menuPaths, path).getOr([path]);
    });
  };
  var $_buj6ey13pje5nvgfm = { generate: generate$5 };

  function LayeredState () {
    var expansions = Cell({});
    var menus = Cell({});
    var paths = Cell({});
    var primary = Cell(Option.none());
    var toItemValues = Cell($_fw94akwjje5nvfbr.constant([]));
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
      var sPaths = $_buj6ey13pje5nvgfm.generate(menuValues, sExpansions);
      paths.set(sPaths);
    };
    var expand = function (itemValue) {
      return $_17met3xsje5nvffn.readOptFrom(expansions.get(), itemValue).map(function (menu) {
        var current = $_17met3xsje5nvffn.readOptFrom(paths.get(), itemValue).getOr([]);
        return [menu].concat(current);
      });
    };
    var collapse = function (itemValue) {
      return $_17met3xsje5nvffn.readOptFrom(paths.get(), itemValue).bind(function (path) {
        return path.length > 1 ? Option.some(path.slice(1)) : Option.none();
      });
    };
    var refresh = function (itemValue) {
      return $_17met3xsje5nvffn.readOptFrom(paths.get(), itemValue);
    };
    var lookupMenu = function (menuValue) {
      return $_17met3xsje5nvffn.readOptFrom(menus.get(), menuValue);
    };
    var otherMenus = function (path) {
      var menuValues = toItemValues.get()(menus.get());
      return $_1r8n3awsje5nvfcd.difference($_3q4qwfx0je5nvfcy.keys(menuValues), path);
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
      return $_3q4qwfx0je5nvfcy.map(menus, function (spec, name) {
        var data = Menu.sketch($_1v3q5lwyje5nvfcw.deepMerge(spec, {
          value: name,
          items: spec.items,
          markers: $_17met3xsje5nvffn.narrow(rawUiSpec.markers, [
            'item',
            'selectedItem'
          ]),
          fakeFocus: detail.fakeFocus(),
          onHighlight: detail.onHighlight(),
          focusManager: detail.fakeFocus() ? $_djz90tzrje5nvfo6.highlights() : $_djz90tzrje5nvfo6.dom()
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
      return $_3q4qwfx0je5nvfcy.map(detail.data().menus(), function (data, menuName) {
        return $_1r8n3awsje5nvfcd.bind(data.items, function (item) {
          return item.type === 'separator' ? [] : [item.data.value];
        });
      });
    };
    var setActiveMenu = function (container, menu) {
      Highlighting.highlight(container, menu);
      Highlighting.getHighlighted(menu).orThunk(function () {
        return Highlighting.getFirst(menu);
      }).each(function (item) {
        $_an9hm6wgje5nvfbd.dispatch(container, item.element(), $_8j7iltwhje5nvfbj.focusItem());
      });
    };
    var getMenus = function (state, menuValues) {
      return $_3smncgy0je5nvfgg.cat($_1r8n3awsje5nvfcd.map(menuValues, state.lookupMenu));
    };
    var updateMenuPath = function (container, state, path) {
      return Option.from(path[0]).bind(state.lookupMenu).map(function (activeMenu) {
        var rest = getMenus(state, path.slice(1));
        $_1r8n3awsje5nvfcd.each(rest, function (r) {
          $_26dua8ynje5nvfjs.add(r.element(), detail.markers().backgroundMenu());
        });
        if (!$_3mo1igxjje5nvfep.inBody(activeMenu.element())) {
          Replacing.append(container, $_92nfmp12tje5nvg7w.premade(activeMenu));
        }
        $_ay0w16137je5nvgbx.remove(activeMenu.element(), [detail.markers().backgroundMenu()]);
        setActiveMenu(container, activeMenu);
        var others = getMenus(state, state.otherMenus(path));
        $_1r8n3awsje5nvfcd.each(others, function (o) {
          $_ay0w16137je5nvgbx.remove(o.element(), [detail.markers().backgroundMenu()]);
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
          if (!$_3mo1igxjje5nvfep.inBody(activeMenu.element())) {
            Replacing.append(container, $_92nfmp12tje5nvg7w.premade(activeMenu));
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
      return $_8k864o108je5nvfq3.inside(item.element()) ? Option.none() : expandRight(container, item);
    };
    var onLeft = function (container, item) {
      return $_8k864o108je5nvfq3.inside(item.element()) ? Option.none() : collapseLeft(container, item);
    };
    var onEscape = function (container, item) {
      return collapseLeft(container, item).orThunk(function () {
        return detail.onEscape()(container, item);
      });
    };
    var keyOnItem = function (f) {
      return function (container, simulatedEvent) {
        return $_acyoduzxje5nvfox.closest(simulatedEvent.getSource(), '.' + detail.markers().item()).bind(function (target) {
          return container.getSystem().getByDom(target).bind(function (item) {
            return f(container, item);
          });
        });
      };
    };
    var events = $_ge7gjjy4je5nvfh4.derive([
      $_ge7gjjy4je5nvfh4.run($_76dusj13ije5nvgdj.focus(), function (sandbox, simulatedEvent) {
        var menu = simulatedEvent.event().menu();
        Highlighting.highlight(sandbox, menu);
      }),
      $_ge7gjjy4je5nvfh4.runOnExecute(function (sandbox, simulatedEvent) {
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
      $_ge7gjjy4je5nvfh4.runOnAttached(function (container, simulatedEvent) {
        setup(container).each(function (primary) {
          Replacing.append(container, $_92nfmp12tje5nvg7w.premade(primary));
          if (detail.openImmediately()) {
            setActiveMenu(container, primary);
            detail.onOpenMenu()(container, primary);
          }
        });
      })
    ].concat(detail.navigateOnHover() ? [$_ge7gjjy4je5nvfh4.run($_3kz0dj13dje5nvgcr.hover(), function (sandbox, simulatedEvent) {
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
      behaviours: $_1v3q5lwyje5nvfcw.deepMerge($_gg4wg0y2je5nvfgj.derive([
        Keying.config({
          mode: 'special',
          onRight: keyOnItem(onRight),
          onLeft: keyOnItem(onLeft),
          onEscape: keyOnItem(onEscape),
          focusIn: function (container, keyInfo) {
            state.getPrimary().each(function (primary) {
              $_an9hm6wgje5nvfbd.dispatch(container, primary.element(), $_8j7iltwhje5nvfbj.focusItem());
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
      ]), $_4c10f910oje5nvfsu.get(detail.tmenuBehaviours())),
      eventOrder: detail.eventOrder(),
      apis: { collapseMenu: collapseMenuApi },
      events: events
    };
  };
  var $_2s5sr513nje5nvgeg = {
    make: make$3,
    collapseItem: $_fw94akwjje5nvfbr.constant('collapse-item')
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
      menus: $_17met3xsje5nvffn.wrap(name, menu),
      expansions: {}
    };
  };
  var collapseItem = function (text) {
    return {
      value: $_b7bo6310rje5nvftj.generate($_2s5sr513nje5nvgeg.collapseItem()),
      text: text
    };
  };
  var TieredMenu = $_907xc510pje5nvft1.single({
    name: 'TieredMenu',
    configFields: [
      $_bnu93dz6je5nvflc.onStrictKeyboardHandler('onExecute'),
      $_bnu93dz6je5nvflc.onStrictKeyboardHandler('onEscape'),
      $_bnu93dz6je5nvflc.onStrictHandler('onOpenMenu'),
      $_bnu93dz6je5nvflc.onStrictHandler('onOpenSubmenu'),
      $_bnu93dz6je5nvflc.onHandler('onCollapseMenu'),
      $_1a8dv7y7je5nvfhl.defaulted('openImmediately', true),
      $_1a8dv7y7je5nvfhl.strictObjOf('data', [
        $_1a8dv7y7je5nvfhl.strict('primary'),
        $_1a8dv7y7je5nvfhl.strict('menus'),
        $_1a8dv7y7je5nvfhl.strict('expansions')
      ]),
      $_1a8dv7y7je5nvfhl.defaulted('fakeFocus', false),
      $_bnu93dz6je5nvflc.onHandler('onHighlight'),
      $_bnu93dz6je5nvflc.onHandler('onHover'),
      $_bnu93dz6je5nvflc.tieredMenuMarkers(),
      $_1a8dv7y7je5nvfhl.strict('dom'),
      $_1a8dv7y7je5nvfhl.defaulted('navigateOnHover', true),
      $_1a8dv7y7je5nvfhl.defaulted('stayInDom', false),
      $_4c10f910oje5nvfsu.field('tmenuBehaviours', [
        Keying,
        Highlighting,
        Composing,
        Replacing
      ]),
      $_1a8dv7y7je5nvfhl.defaulted('eventOrder', {})
    ],
    apis: {
      collapseMenu: function (apis, tmenu) {
        apis.collapseMenu(tmenu);
      }
    },
    factory: $_2s5sr513nje5nvgeg.make,
    extraApis: {
      tieredData: tieredData,
      singleData: singleData,
      collapseItem: collapseItem
    }
  });

  var findRoute = function (component, transConfig, transState, route) {
    return $_17met3xsje5nvffn.readOptFrom(transConfig.routes(), route.start()).map($_fw94akwjje5nvfbr.apply).bind(function (sConfig) {
      return $_17met3xsje5nvffn.readOptFrom(sConfig, route.destination()).map($_fw94akwjje5nvfbr.apply);
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
          transition: $_fw94akwjje5nvfbr.constant(t),
          route: $_fw94akwjje5nvfbr.constant(r)
        };
      });
    });
  };
  var disableTransition = function (comp, transConfig, transState) {
    getTransition(comp, transConfig, transState).each(function (routeTransition) {
      var t = routeTransition.transition();
      $_26dua8ynje5nvfjs.remove(comp.element(), t.transitionClass());
      $_awg6i3xrje5nvffg.remove(comp.element(), transConfig.destinationAttr());
    });
  };
  var getNewRoute = function (comp, transConfig, transState, destination) {
    return {
      start: $_fw94akwjje5nvfbr.constant($_awg6i3xrje5nvffg.get(comp.element(), transConfig.stateAttr())),
      destination: $_fw94akwjje5nvfbr.constant(destination)
    };
  };
  var getCurrentRoute = function (comp, transConfig, transState) {
    var el = comp.element();
    return $_awg6i3xrje5nvffg.has(el, transConfig.destinationAttr()) ? Option.some({
      start: $_fw94akwjje5nvfbr.constant($_awg6i3xrje5nvffg.get(comp.element(), transConfig.stateAttr())),
      destination: $_fw94akwjje5nvfbr.constant($_awg6i3xrje5nvffg.get(comp.element(), transConfig.destinationAttr()))
    }) : Option.none();
  };
  var jumpTo = function (comp, transConfig, transState, destination) {
    disableTransition(comp, transConfig, transState);
    if ($_awg6i3xrje5nvffg.has(comp.element(), transConfig.stateAttr()) && $_awg6i3xrje5nvffg.get(comp.element(), transConfig.stateAttr()) !== destination)
      transConfig.onFinish()(comp, destination);
    $_awg6i3xrje5nvffg.set(comp.element(), transConfig.stateAttr(), destination);
  };
  var fasttrack = function (comp, transConfig, transState, destination) {
    if ($_awg6i3xrje5nvffg.has(comp.element(), transConfig.destinationAttr())) {
      $_awg6i3xrje5nvffg.set(comp.element(), transConfig.stateAttr(), $_awg6i3xrje5nvffg.get(comp.element(), transConfig.destinationAttr()));
      $_awg6i3xrje5nvffg.remove(comp.element(), transConfig.destinationAttr());
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
      $_26dua8ynje5nvfjs.add(comp.element(), t.transitionClass());
      $_awg6i3xrje5nvffg.set(comp.element(), transConfig.destinationAttr(), destination);
    });
  };
  var getState = function (comp, transConfig, transState) {
    var e = comp.element();
    return $_awg6i3xrje5nvffg.has(e, transConfig.stateAttr()) ? Option.some($_awg6i3xrje5nvffg.get(e, transConfig.stateAttr())) : Option.none();
  };
  var $_b2k03e13sje5nvgg2 = {
    findRoute: findRoute,
    disableTransition: disableTransition,
    getCurrentRoute: getCurrentRoute,
    jumpTo: jumpTo,
    progressTo: progressTo,
    getState: getState
  };

  var events$8 = function (transConfig, transState) {
    return $_ge7gjjy4je5nvfh4.derive([
      $_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        $_b2k03e13sje5nvgg2.getCurrentRoute(component, transConfig, transState).each(function (route) {
          $_b2k03e13sje5nvgg2.findRoute(component, transConfig, transState, route).each(function (rInfo) {
            rInfo.transition().each(function (rTransition) {
              if (raw.propertyName === rTransition.property()) {
                $_b2k03e13sje5nvgg2.jumpTo(component, transConfig, transState, route.destination());
                transConfig.onTransition()(component, route);
              }
            });
          });
        });
      }),
      $_ge7gjjy4je5nvfh4.runOnAttached(function (comp, se) {
        $_b2k03e13sje5nvgg2.jumpTo(comp, transConfig, transState, transConfig.initialState());
      })
    ]);
  };
  var $_csuwvr13rje5nvgg0 = { events: events$8 };

  var TransitionSchema = [
    $_1a8dv7y7je5nvfhl.defaulted('destinationAttr', 'data-transitioning-destination'),
    $_1a8dv7y7je5nvfhl.defaulted('stateAttr', 'data-transitioning-state'),
    $_1a8dv7y7je5nvfhl.strict('initialState'),
    $_bnu93dz6je5nvflc.onHandler('onTransition'),
    $_bnu93dz6je5nvflc.onHandler('onFinish'),
    $_1a8dv7y7je5nvfhl.strictOf('routes', $_8shw8ryeje5nvfis.setOf(Result.value, $_8shw8ryeje5nvfis.setOf(Result.value, $_8shw8ryeje5nvfis.objOfOnly([$_1a8dv7y7je5nvfhl.optionObjOfOnly('transition', [
        $_1a8dv7y7je5nvfhl.strict('property'),
        $_1a8dv7y7je5nvfhl.strict('transitionClass')
      ])]))))
  ];

  var createRoutes = function (routes) {
    var r = {};
    $_3q4qwfx0je5nvfcy.each(routes, function (v, k) {
      var waypoints = k.split('<->');
      r[waypoints[0]] = $_17met3xsje5nvffn.wrap(waypoints[1], v);
      r[waypoints[1]] = $_17met3xsje5nvffn.wrap(waypoints[0], v);
    });
    return r;
  };
  var createBistate = function (first, second, transitions) {
    return $_17met3xsje5nvffn.wrapAll([
      {
        key: first,
        value: $_17met3xsje5nvffn.wrap(second, transitions)
      },
      {
        key: second,
        value: $_17met3xsje5nvffn.wrap(first, transitions)
      }
    ]);
  };
  var createTristate = function (first, second, third, transitions) {
    return $_17met3xsje5nvffn.wrapAll([
      {
        key: first,
        value: $_17met3xsje5nvffn.wrapAll([
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
        value: $_17met3xsje5nvffn.wrapAll([
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
        value: $_17met3xsje5nvffn.wrapAll([
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
  var Transitioning = $_gg4wg0y2je5nvfgj.create({
    fields: TransitionSchema,
    name: 'transitioning',
    active: $_csuwvr13rje5nvgg0,
    apis: $_b2k03e13sje5nvgg2,
    extra: {
      createRoutes: createRoutes,
      createBistate: createBistate,
      createTristate: createTristate
    }
  });

  var scrollable = $_1a91a2zeje5nvfmm.resolve('scrollable');
  var register = function (element) {
    $_26dua8ynje5nvfjs.add(element, scrollable);
  };
  var deregister = function (element) {
    $_26dua8ynje5nvfjs.remove(element, scrollable);
  };
  var $_8zn2oa13uje5nvggi = {
    register: register,
    deregister: deregister,
    scrollable: $_fw94akwjje5nvfbr.constant(scrollable)
  };

  var getValue$4 = function (item) {
    return $_17met3xsje5nvffn.readOptFrom(item, 'format').getOr(item.title);
  };
  var convert$1 = function (formats, memMenuThunk) {
    var mainMenu = makeMenu('Styles', [].concat($_1r8n3awsje5nvfcd.map(formats.items, function (k) {
      return makeItem(getValue$4(k), k.title, k.isSelected(), k.getPreview(), $_17met3xsje5nvffn.hasKey(formats.expansions, getValue$4(k)));
    })), memMenuThunk, false);
    var submenus = $_3q4qwfx0je5nvfcy.map(formats.menus, function (menuItems, menuName) {
      var items = $_1r8n3awsje5nvfcd.map(menuItems, function (item) {
        return makeItem(getValue$4(item), item.title, item.isSelected !== undefined ? item.isSelected() : false, item.getPreview !== undefined ? item.getPreview() : '', $_17met3xsje5nvffn.hasKey(formats.expansions, getValue$4(item)));
      });
      return makeMenu(menuName, items, memMenuThunk, true);
    });
    var menus = $_1v3q5lwyje5nvfcw.deepMerge(submenus, $_17met3xsje5nvffn.wrap('styles', mainMenu));
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
        classes: isMenu ? [$_1a91a2zeje5nvfmm.resolve('styles-item-is-menu')] : []
      },
      toggling: {
        toggleOnExecute: false,
        toggleClass: $_1a91a2zeje5nvfmm.resolve('format-matches'),
        selected: selected
      },
      itemBehaviours: $_gg4wg0y2je5nvfgj.derive(isMenu ? [] : [$_1eacyhzdje5nvfmj.format(value, function (comp, status) {
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
            classes: [$_1a91a2zeje5nvfmm.resolve('styles-collapser')]
          },
          components: collapsable ? [
            {
              dom: {
                tag: 'span',
                classes: [$_1a91a2zeje5nvfmm.resolve('styles-collapse-icon')]
              }
            },
            $_92nfmp12tje5nvg7w.text(value)
          ] : [$_92nfmp12tje5nvg7w.text(value)],
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
            classes: [$_1a91a2zeje5nvfmm.resolve('styles-menu-items-container')]
          },
          components: [Menu.parts().items({})],
          behaviours: $_gg4wg0y2je5nvfgj.derive([$_ejbtwg126je5nvg3d.config('adhoc-scrollable-menu', [
              $_ge7gjjy4je5nvfh4.runOnAttached(function (component, simulatedEvent) {
                $_98elm5103je5nvfpe.set(component.element(), 'overflow-y', 'auto');
                $_98elm5103je5nvfpe.set(component.element(), '-webkit-overflow-scrolling', 'touch');
                $_8zn2oa13uje5nvggi.register(component.element());
              }),
              $_ge7gjjy4je5nvfh4.runOnDetached(function (component) {
                $_98elm5103je5nvfpe.remove(component.element(), 'overflow-y');
                $_98elm5103je5nvfpe.remove(component.element(), '-webkit-overflow-scrolling');
                $_8zn2oa13uje5nvggi.deregister(component.element());
              })
            ])])
        }
      ],
      items: items,
      menuBehaviours: $_gg4wg0y2je5nvfgj.derive([Transitioning.config({
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
    var memMenu = $_afv5an11rje5nvg0s.record(TieredMenu.sketch({
      dom: {
        tag: 'div',
        classes: [$_1a91a2zeje5nvfmm.resolve('styles-menu')]
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
        var w = $_3mznm711kje5nvfza.get(container.element());
        $_3mznm711kje5nvfza.set(menu.element(), w);
        Transitioning.jumpTo(menu, 'current');
      },
      onOpenSubmenu: function (container, item, submenu) {
        var w = $_3mznm711kje5nvfza.get(container.element());
        var menu = $_acyoduzxje5nvfox.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var menuComp = container.getSystem().getByDom(menu).getOrDie();
        $_3mznm711kje5nvfza.set(submenu.element(), w);
        Transitioning.progressTo(menuComp, 'before');
        Transitioning.jumpTo(submenu, 'after');
        Transitioning.progressTo(submenu, 'current');
      },
      onCollapseMenu: function (container, item, menu) {
        var submenu = $_acyoduzxje5nvfox.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var submenuComp = container.getSystem().getByDom(submenu).getOrDie();
        Transitioning.progressTo(submenuComp, 'after');
        Transitioning.progressTo(menu, 'current');
      },
      navigateOnHover: false,
      openImmediately: true,
      data: dataset.tmenu,
      markers: {
        backgroundMenu: $_1a91a2zeje5nvfmm.resolve('styles-background-menu'),
        menu: $_1a91a2zeje5nvfmm.resolve('styles-menu'),
        selectedMenu: $_1a91a2zeje5nvfmm.resolve('styles-selected-menu'),
        item: $_1a91a2zeje5nvfmm.resolve('styles-item'),
        selectedItem: $_1a91a2zeje5nvfmm.resolve('styles-selected-item')
      }
    }));
    return memMenu.asSpec();
  };
  var $_43s5nl12sje5nvg78 = { sketch: sketch$9 };

  var getFromExpandingItem = function (item) {
    var newItem = $_1v3q5lwyje5nvfcw.deepMerge($_17met3xsje5nvffn.exclude(item, ['items']), { menu: true });
    var rest = expand(item.items);
    var newMenus = $_1v3q5lwyje5nvfcw.deepMerge(rest.menus, $_17met3xsje5nvffn.wrap(item.title, rest.items));
    var newExpansions = $_1v3q5lwyje5nvfcw.deepMerge(rest.expansions, $_17met3xsje5nvffn.wrap(item.title, item.title));
    return {
      item: newItem,
      menus: newMenus,
      expansions: newExpansions
    };
  };
  var getFromItem = function (item) {
    return $_17met3xsje5nvffn.hasKey(item, 'items') ? getFromExpandingItem(item) : {
      item: item,
      menus: {},
      expansions: {}
    };
  };
  var expand = function (items) {
    return $_1r8n3awsje5nvfcd.foldr(items, function (acc, item) {
      var newData = getFromItem(item);
      return {
        menus: $_1v3q5lwyje5nvfcw.deepMerge(acc.menus, newData.menus),
        items: [newData.item].concat(acc.items),
        expansions: $_1v3q5lwyje5nvfcw.deepMerge(acc.expansions, newData.expansions)
      };
    }, {
      menus: {},
      expansions: {},
      items: []
    });
  };
  var $_dpavlz13vje5nvggo = { expand: expand };

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
      return $_1v3q5lwyje5nvfcw.deepMerge(item, {
        isSelected: isSelectedFor(item.format),
        getPreview: getPreview(item.format)
      });
    };
    var enrichMenu = function (item) {
      return $_1v3q5lwyje5nvfcw.deepMerge(item, {
        isSelected: $_fw94akwjje5nvfbr.constant(false),
        getPreview: $_fw94akwjje5nvfbr.constant('')
      });
    };
    var enrichCustom = function (item) {
      var formatName = $_b7bo6310rje5nvftj.generate(item.title);
      var newItem = $_1v3q5lwyje5nvfcw.deepMerge(item, {
        format: formatName,
        isSelected: isSelectedFor(formatName),
        getPreview: getPreview(formatName)
      });
      editor.formatter.register(formatName, newItem);
      return newItem;
    };
    var formats = $_17met3xsje5nvffn.readOptFrom(settings, 'style_formats').getOr(DefaultStyleFormats);
    var doEnrich = function (items) {
      return $_1r8n3awsje5nvfcd.map(items, function (item) {
        if ($_17met3xsje5nvffn.hasKey(item, 'items')) {
          var newItems = doEnrich(item.items);
          return $_1v3q5lwyje5nvfcw.deepMerge(enrichMenu(item), { items: newItems });
        } else if ($_17met3xsje5nvffn.hasKey(item, 'format')) {
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
      return $_1r8n3awsje5nvfcd.bind(items, function (item) {
        if (item.items !== undefined) {
          var newItems = doPrune(item.items);
          return newItems.length > 0 ? [item] : [];
        } else {
          var keep = $_17met3xsje5nvffn.hasKey(item, 'format') ? editor.formatter.canApply(item.format) : true;
          return keep ? [item] : [];
        }
      });
    };
    var prunedItems = doPrune(formats);
    return $_dpavlz13vje5nvggo.expand(prunedItems);
  };
  var ui = function (editor, formats, onDone) {
    var pruned = prune(editor, formats);
    return $_43s5nl12sje5nvg78.sketch({
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
  var $_6xer2312qje5nvg6t = {
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
    return $_1r8n3awsje5nvfcd.bind(toolbar, function (item) {
      return $_130xdswzje5nvfcx.isArray(item) ? identifyFromArray(item) : extract$1(item);
    });
  };
  var identify = function (settings) {
    var toolbar = settings.toolbar !== undefined ? settings.toolbar : defaults;
    return $_130xdswzje5nvfcx.isArray(toolbar) ? identifyFromArray(toolbar) : extract$1(toolbar);
  };
  var setup = function (realm, editor) {
    var commandSketch = function (name) {
      return function () {
        return $_5x6kkvzfje5nvfmo.forToolbarCommand(editor, name);
      };
    };
    var stateCommandSketch = function (name) {
      return function () {
        return $_5x6kkvzfje5nvfmo.forToolbarStateCommand(editor, name);
      };
    };
    var actionSketch = function (name, query, action) {
      return function () {
        return $_5x6kkvzfje5nvfmo.forToolbarStateAction(editor, name, query, action);
      };
    };
    var undo = commandSketch('undo');
    var redo = commandSketch('redo');
    var bold = stateCommandSketch('bold');
    var italic = stateCommandSketch('italic');
    var underline = stateCommandSketch('underline');
    var removeformat = commandSketch('removeformat');
    var link = function () {
      return $_2dz8zf121je5nvg1v.sketch(realm, editor);
    };
    var unlink = actionSketch('unlink', 'link', function () {
      editor.execCommand('unlink', null, false);
    });
    var image = function () {
      return $_ea54wj11qje5nvg0d.sketch(editor);
    };
    var bullist = actionSketch('unordered-list', 'ul', function () {
      editor.execCommand('InsertUnorderedList', null, false);
    });
    var numlist = actionSketch('ordered-list', 'ol', function () {
      editor.execCommand('InsertOrderedList', null, false);
    });
    var fontsizeselect = function () {
      return $_2nkkky11mje5nvfzd.sketch(realm, editor);
    };
    var forecolor = function () {
      return $_7fgtes115je5nvfwu.sketch(realm, editor);
    };
    var styleFormats = $_6xer2312qje5nvg6t.register(editor, editor.settings);
    var styleFormatsMenu = function () {
      return $_6xer2312qje5nvg6t.ui(editor, styleFormats, function () {
        editor.fire('scrollIntoView');
      });
    };
    var styleselect = function () {
      return $_5x6kkvzfje5nvfmo.forToolbar('style-formats', function (button) {
        editor.fire('toReading');
        realm.dropup().appear(styleFormatsMenu, Toggling.on, button);
      }, $_gg4wg0y2je5nvfgj.derive([
        Toggling.config({
          toggleClass: $_1a91a2zeje5nvfmm.resolve('toolbar-button-selected'),
          toggleOnExecute: false,
          aria: { mode: 'pressed' }
        }),
        Receiving.config({
          channels: $_17met3xsje5nvffn.wrapAll([
            $_1eacyhzdje5nvfmj.receive($_bc0wawz1je5nvfko.orientationChanged(), Toggling.off),
            $_1eacyhzdje5nvfmj.receive($_bc0wawz1je5nvfko.dropupDismissed(), Toggling.off)
          ])
        })
      ]));
    };
    var feature = function (prereq, sketch) {
      return {
        isSupported: function () {
          return prereq.forall(function (p) {
            return $_17met3xsje5nvffn.hasKey(editor.buttons, p);
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
    return $_1r8n3awsje5nvfcd.bind(itemNames, function (iName) {
      var r = !$_17met3xsje5nvffn.hasKey(present, iName) && $_17met3xsje5nvffn.hasKey(features, iName) && features[iName].isSupported() ? [features[iName].sketch()] : [];
      present[iName] = true;
      return r;
    });
  };
  var $_565wguz2je5nvfkr = {
    identify: identify,
    setup: setup,
    detect: detect$4
  };

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_fw94akwjje5nvfbr.constant(target),
      'x': $_fw94akwjje5nvfbr.constant(x),
      'y': $_fw94akwjje5nvfbr.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_fw94akwjje5nvfbr.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_4ivu2mxfje5nvfeg.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_fw94akwjje5nvfbr.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_fw94akwjje5nvfbr.curry(unbind, element, event, wrapped, useCapture) };
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
  var $_egsjrg13yje5nvgh6 = {
    bind: bind$1,
    capture: capture
  };

  var filter$1 = $_fw94akwjje5nvfbr.constant(true);
  var bind$2 = function (element, event, handler) {
    return $_egsjrg13yje5nvgh6.bind(element, event, filter$1, handler);
  };
  var capture$1 = function (element, event, handler) {
    return $_egsjrg13yje5nvgh6.capture(element, event, filter$1, handler);
  };
  var $_9e26js13xje5nvgh3 = {
    bind: bind$2,
    capture: capture$1
  };

  var INTERVAL = 50;
  var INSURANCE = 1000 / INTERVAL;
  var get$11 = function (outerWindow) {
    var isPortrait = outerWindow.matchMedia('(orientation: portrait)').matches;
    return { isPortrait: $_fw94akwjje5nvfbr.constant(isPortrait) };
  };
  var getActualWidth = function (outerWindow) {
    var isIos = $_2m9vcuwkje5nvfbu.detect().os.isiOS();
    var isPortrait = get$11(outerWindow).isPortrait();
    return isIos && !isPortrait ? outerWindow.screen.height : outerWindow.screen.width;
  };
  var onChange = function (outerWindow, listeners) {
    var win = $_4ivu2mxfje5nvfeg.fromDom(outerWindow);
    var poller = null;
    var change = function () {
      clearInterval(poller);
      var orientation = get$11(outerWindow);
      listeners.onChange(orientation);
      onAdjustment(function () {
        listeners.onReady(orientation);
      });
    };
    var orientationHandle = $_9e26js13xje5nvgh3.bind(win, 'orientationchange', change);
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
  var $_9ew02y13wje5nvggw = {
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
      settings.triggerEvent($_8j7iltwhje5nvfbj.longpress(), event);
    }, LONGPRESS_DELAY);
    var handleTouchstart = function (event) {
      getTouch(event).each(function (touch) {
        longpress.cancel();
        var data = {
          x: $_fw94akwjje5nvfbr.constant(touch.clientX),
          y: $_fw94akwjje5nvfbr.constant(touch.clientY),
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
        return $_8rsueix9je5nvfdw.eq(data.target(), event.target());
      };
      return startData.get().filter(isSame).map(function (data) {
        return settings.triggerEvent($_8j7iltwhje5nvfbj.tap(), event);
      });
    };
    var handlers = $_17met3xsje5nvffn.wrapAll([
      {
        key: $_4z587jwije5nvfbn.touchstart(),
        value: handleTouchstart
      },
      {
        key: $_4z587jwije5nvfbn.touchmove(),
        value: handleTouchmove
      },
      {
        key: $_4z587jwije5nvfbn.touchend(),
        value: handleTouchend
      }
    ]);
    var fireIfReady = function (event, type) {
      return $_17met3xsje5nvffn.readOptFrom(handlers, type).bind(function (handler) {
        return handler(event);
      });
    };
    return { fireIfReady: fireIfReady };
  };
  var $_45i4b9144je5nvgie = { monitor: monitor };

  var monitor$1 = function (editorApi) {
    var tapEvent = $_45i4b9144je5nvgie.monitor({
      triggerEvent: function (type, evt) {
        editorApi.onTapContent(evt);
      }
    });
    var onTouchend = function () {
      return $_9e26js13xje5nvgh3.bind(editorApi.body(), 'touchend', function (evt) {
        tapEvent.fireIfReady(evt, 'touchend');
      });
    };
    var onTouchmove = function () {
      return $_9e26js13xje5nvgh3.bind(editorApi.body(), 'touchmove', function (evt) {
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
  var $_6nm0q8143je5nvgib = { monitor: monitor$1 };

  var isAndroid6 = $_2m9vcuwkje5nvfbu.detect().os.version.major >= 6;
  var initEvents = function (editorApi, toolstrip, alloy) {
    var tapping = $_6nm0q8143je5nvgib.monitor(editorApi);
    var outerDoc = $_76yst9x3je5nvfde.owner(toolstrip);
    var isRanged = function (sel) {
      return !$_8rsueix9je5nvfdw.eq(sel.start(), sel.finish()) || sel.soffset() !== sel.foffset();
    };
    var hasRangeInUi = function () {
      return $_80e37iytje5nvfk6.active(outerDoc).filter(function (input) {
        return $_3imygaxkje5nvfes.name(input) === 'input';
      }).exists(function (input) {
        return input.dom().selectionStart !== input.dom().selectionEnd;
      });
    };
    var updateMargin = function () {
      var rangeInContent = editorApi.doc().dom().hasFocus() && editorApi.getSelection().exists(isRanged);
      alloy.getByDom(toolstrip).each((rangeInContent || hasRangeInUi()) === true ? Toggling.on : Toggling.off);
    };
    var listeners = [
      $_9e26js13xje5nvgh3.bind(editorApi.body(), 'touchstart', function (evt) {
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_9e26js13xje5nvgh3.bind(toolstrip, 'touchstart', function (evt) {
        editorApi.onTouchToolstrip();
      }),
      editorApi.onToReading(function () {
        $_80e37iytje5nvfk6.blur(editorApi.body());
      }),
      editorApi.onToEditing($_fw94akwjje5nvfbr.noop),
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
      $_9e26js13xje5nvgh3.bind($_4ivu2mxfje5nvfeg.fromDom(editorApi.win()), 'blur', function () {
        alloy.getByDom(toolstrip).each(Toggling.off);
      }),
      $_9e26js13xje5nvgh3.bind(outerDoc, 'select', updateMargin),
      $_9e26js13xje5nvgh3.bind(editorApi.doc(), 'selectionchange', updateMargin)
    ]);
    var destroy = function () {
      $_1r8n3awsje5nvfcd.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_41sask142je5nvghr = { initEvents: initEvents };

  var safeParse = function (element, attribute) {
    var parsed = parseInt($_awg6i3xrje5nvffg.get(element, attribute), 10);
    return isNaN(parsed) ? 0 : parsed;
  };
  var $_2hbjs2147je5nvgiw = { safeParse: safeParse };

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
    var browser = $_2m9vcuwkje5nvfbu.detect().browser;
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

  var api$3 = NodeValue($_3imygaxkje5nvfes.isText, 'text');
  var get$12 = function (element) {
    return api$3.get(element);
  };
  var getOption = function (element) {
    return api$3.getOption(element);
  };
  var set$8 = function (element, value) {
    api$3.set(element, value);
  };
  var $_6swxmw14aje5nvgj9 = {
    get: get$12,
    getOption: getOption,
    set: set$8
  };

  var getEnd = function (element) {
    return $_3imygaxkje5nvfes.name(element) === 'img' ? 1 : $_6swxmw14aje5nvgj9.getOption(element).fold(function () {
      return $_76yst9x3je5nvfde.children(element).length;
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
    return $_6swxmw14aje5nvgj9.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_1r8n3awsje5nvfcd.contains(elementsWithCursorPosition, $_3imygaxkje5nvfes.name(elem));
  };
  var $_js3us149je5nvgj6 = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var adt$4 = $_dj88xixwje5nvfg0.generate([
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
    return situ.fold($_fw94akwjje5nvfbr.identity, $_fw94akwjje5nvfbr.identity, $_fw94akwjje5nvfbr.identity);
  };
  var $_9ol44414dje5nvgjp = {
    before: adt$4.before,
    on: adt$4.on,
    after: adt$4.after,
    cata: cata,
    getStart: getStart
  };

  var type$1 = $_dj88xixwje5nvfg0.generate([
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
  var range$1 = $_f74ptsx4je5nvfdn.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$1.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart$1 = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_4ivu2mxfje5nvfeg.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_9ol44414dje5nvgjp.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart$1(selection);
    return $_76yst9x3je5nvfde.defaultView(start);
  };
  var $_6slor914cje5nvgjj = {
    domRange: type$1.domRange,
    relative: type$1.relative,
    exact: type$1.exact,
    exactFromRange: exactFromRange,
    range: range$1,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_76yst9x3je5nvfde.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_4ivu2mxfje5nvfeg.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_8rsueix9je5nvfdw.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_c5qtes14fje5nvgk0 = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_1r8n3awsje5nvfcd.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_4ivu2mxfje5nvfeg.fromDom(fragment);
  };
  var $_4b9xqb14gje5nvgk2 = { fromElements: fromElements };

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
    return $_4ivu2mxfje5nvfeg.fromDom(fragment);
  };
  var toRect = function (rect) {
    return {
      left: $_fw94akwjje5nvfbr.constant(rect.left),
      top: $_fw94akwjje5nvfbr.constant(rect.top),
      right: $_fw94akwjje5nvfbr.constant(rect.right),
      bottom: $_fw94akwjje5nvfbr.constant(rect.bottom),
      width: $_fw94akwjje5nvfbr.constant(rect.width),
      height: $_fw94akwjje5nvfbr.constant(rect.height)
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
  var $_ben00j14hje5nvgk5 = {
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

  var adt$5 = $_dj88xixwje5nvfg0.generate([
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
    return type($_4ivu2mxfje5nvfeg.fromDom(range.startContainer), range.startOffset, $_4ivu2mxfje5nvfeg.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_fw94akwjje5nvfbr.constant(rng),
          rtl: Option.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_9nas7jwlje5nvfbw.cached(function () {
            return $_ben00j14hje5nvgk5.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_9nas7jwlje5nvfbw.cached(function () {
            return Option.some($_ben00j14hje5nvgk5.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_9nas7jwlje5nvfbw.cached(function () {
            return $_ben00j14hje5nvgk5.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_9nas7jwlje5nvfbw.cached(function () {
            return Option.some($_ben00j14hje5nvgk5.exactToNative(win, finish, foffset, start, soffset));
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
        return adt$5.rtl($_4ivu2mxfje5nvfeg.fromDom(rev.endContainer), rev.endOffset, $_4ivu2mxfje5nvfeg.fromDom(rev.startContainer), rev.startOffset);
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
  var $_etefvo14ije5nvgk9 = {
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
  var $_9oebv114lje5nvgkq = {
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
    var length = $_6swxmw14aje5nvgj9.get(textnode).length;
    var offset = $_9oebv114lje5nvgkq.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate$1 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_3smncgy0je5nvfgg.findMap(rects, function (rect) {
      return $_9oebv114lje5nvgkq.inRect(rect, x, y) ? Option.some(rect) : Option.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_csw25w14mje5nvgks = { locate: locate$1 };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_76yst9x3je5nvfde.children(node);
    return $_3smncgy0je5nvfgg.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_9oebv114lje5nvgkq.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : Option.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_3imygaxkje5nvfes.isText(node) ? $_csw25w14mje5nvgks.locate : searchInChildren;
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
  var $_9ift3114kje5nvgkk = { locate: locate$2 };

  var first$3 = function (element) {
    return $_eew4a3yvje5nvfkb.descendant(element, $_js3us149je5nvgj6.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_js3us149je5nvgj6.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_76yst9x3je5nvfde.children(element);
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
  var $_30q3yl14oje5nvgl3 = {
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
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_30q3yl14oje5nvgl3.first : $_30q3yl14oje5nvgl3.last;
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
    var f = $_76yst9x3je5nvfde.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_emg1qj14nje5nvgky = { search: search$1 };

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
    return $_9ift3114kje5nvgkk.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_4ivu2mxfje5nvfeg.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_emg1qj14nje5nvgky.search(doc, elem, x);
      };
      return $_76yst9x3je5nvfde.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_4ivu2mxfje5nvfeg.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_6slor914cje5nvgjj.range($_4ivu2mxfje5nvfeg.fromDom(rng.startContainer), rng.startOffset, $_4ivu2mxfje5nvfeg.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_36l2o614jje5nvgkh = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_ben00j14hje5nvgk5.create(win);
    var self = $_2qbccdxeje5nvfed.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_8xqdn0zvje5nvfot.descendants(ancestor, selector));
    return $_1r8n3awsje5nvfcd.filter(elements, function (elem) {
      $_ben00j14hje5nvgk5.selectNodeContentsUsing(innerRange, elem);
      return $_ben00j14hje5nvgk5.isWithin(outerRange, innerRange);
    });
  };
  var find$4 = function (win, selection, selector) {
    var outerRange = $_etefvo14ije5nvgk9.asLtrRange(win, selection);
    var ancestor = $_4ivu2mxfje5nvfeg.fromDom(outerRange.commonAncestorContainer);
    return $_3imygaxkje5nvfes.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_fk8a4u14pje5nvgl6 = { find: find$4 };

  var beforeSpecial = function (element, offset) {
    var name = $_3imygaxkje5nvfes.name(element);
    if ('input' === name)
      return $_9ol44414dje5nvgjp.after(element);
    else if (!$_1r8n3awsje5nvfcd.contains([
        'br',
        'img'
      ], name))
      return $_9ol44414dje5nvgjp.on(element, offset);
    else
      return offset === 0 ? $_9ol44414dje5nvgjp.before(element) : $_9ol44414dje5nvgjp.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_9ol44414dje5nvgjp.before, beforeSpecial, $_9ol44414dje5nvgjp.after);
    var finish = finishSitu.fold($_9ol44414dje5nvgjp.before, beforeSpecial, $_9ol44414dje5nvgjp.after);
    return $_6slor914cje5nvgjj.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_6slor914cje5nvgjj.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_4ivu2mxfje5nvfeg.fromDom(rng.startContainer);
        var finish = $_4ivu2mxfje5nvfeg.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_1ydsxv14qje5nvgl9 = {
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
    var rng = $_ben00j14hje5nvgk5.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_fk8a4u14pje5nvgl6.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_etefvo14ije5nvgk9.diagnose(win, relative).match({
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
    var relative = $_1ydsxv14qje5nvgl9.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_1ydsxv14qje5nvgl9.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_6slor914cje5nvgjj.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_ben00j14hje5nvgk5.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_1ydsxv14qje5nvgl9.preprocess(selection);
    return $_etefvo14ije5nvgk9.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return Option.some($_6slor914cje5nvgjj.range($_4ivu2mxfje5nvfeg.fromDom(firstRng.startContainer), firstRng.startOffset, $_4ivu2mxfje5nvfeg.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return Option.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_4ivu2mxfje5nvfeg.fromDom(selection.anchorNode);
    var focusNode = $_4ivu2mxfje5nvfeg.fromDom(selection.focusNode);
    return $_c5qtes14fje5nvgk0.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? Option.some($_6slor914cje5nvgjj.range($_4ivu2mxfje5nvfeg.fromDom(selection.anchorNode), selection.anchorOffset, $_4ivu2mxfje5nvfeg.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_ben00j14hje5nvgk5.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_ben00j14hje5nvgk5.selectNodeContents(win, element);
    return $_6slor914cje5nvgjj.range($_4ivu2mxfje5nvfeg.fromDom(rng.startContainer), rng.startOffset, $_4ivu2mxfje5nvfeg.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : Option.none();
  };
  var get$13 = function (win) {
    return getExact(win).map(function (range) {
      return $_6slor914cje5nvgjj.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect$1 = function (win, selection) {
    var rng = $_etefvo14ije5nvgk9.asLtrRange(win, selection);
    return $_ben00j14hje5nvgk5.getFirstRect(rng);
  };
  var getBounds$1 = function (win, selection) {
    var rng = $_etefvo14ije5nvgk9.asLtrRange(win, selection);
    return $_ben00j14hje5nvgk5.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_36l2o614jje5nvgkh.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_etefvo14ije5nvgk9.asLtrRange(win, selection);
    return $_ben00j14hje5nvgk5.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$3 = function (win, selection) {
    var rng = $_etefvo14ije5nvgk9.asLtrRange(win, selection);
    return $_ben00j14hje5nvgk5.cloneFragment(rng);
  };
  var replace = function (win, selection, elements) {
    var rng = $_etefvo14ije5nvgk9.asLtrRange(win, selection);
    var fragment = $_4b9xqb14gje5nvgk2.fromElements(elements, win.document);
    $_ben00j14hje5nvgk5.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_etefvo14ije5nvgk9.asLtrRange(win, selection);
    $_ben00j14hje5nvgk5.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_8rsueix9je5nvfdw.eq(start, finish) && soffset === foffset;
  };
  var $_bauc9314eje5nvgju = {
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
      width: $_fw94akwjje5nvfbr.constant(COLLAPSED_WIDTH),
      height: rect.height
    };
  };
  var toRect$1 = function (rawRect) {
    return {
      left: $_fw94akwjje5nvfbr.constant(rawRect.left),
      top: $_fw94akwjje5nvfbr.constant(rawRect.top),
      right: $_fw94akwjje5nvfbr.constant(rawRect.right),
      bottom: $_fw94akwjje5nvfbr.constant(rawRect.bottom),
      width: $_fw94akwjje5nvfbr.constant(rawRect.width),
      height: $_fw94akwjje5nvfbr.constant(rawRect.height)
    };
  };
  var getRectsFromRange = function (range) {
    if (!range.collapsed) {
      return $_1r8n3awsje5nvfcd.map(range.getClientRects(), toRect$1);
    } else {
      var start_1 = $_4ivu2mxfje5nvfeg.fromDom(range.startContainer);
      return $_76yst9x3je5nvfde.parent(start_1).bind(function (parent) {
        var selection = $_6slor914cje5nvgjj.exact(start_1, range.startOffset, parent, $_js3us149je5nvgj6.getEnd(parent));
        var optRect = $_bauc9314eje5nvgju.getFirstRect(range.startContainer.ownerDocument.defaultView, selection);
        return optRect.map(collapsedRect).map($_1r8n3awsje5nvfcd.pure);
      }).getOr([]);
    }
  };
  var getRectangles = function (cWin) {
    var sel = cWin.getSelection();
    return sel !== undefined && sel.rangeCount > 0 ? getRectsFromRange(sel.getRangeAt(0)) : [];
  };
  var $_ae3vro148je5nvgiy = { getRectangles: getRectangles };

  var autocompleteHack = function () {
    return function (f) {
      setTimeout(function () {
        f();
      }, 0);
    };
  };
  var resume = function (cWin) {
    cWin.focus();
    var iBody = $_4ivu2mxfje5nvfeg.fromDom(cWin.document.body);
    var inInput = $_80e37iytje5nvfk6.active().exists(function (elem) {
      return $_1r8n3awsje5nvfcd.contains([
        'input',
        'textarea'
      ], $_3imygaxkje5nvfes.name(elem));
    });
    var transaction = inInput ? autocompleteHack() : $_fw94akwjje5nvfbr.apply;
    transaction(function () {
      $_80e37iytje5nvfk6.active().each($_80e37iytje5nvfk6.blur);
      $_80e37iytje5nvfk6.focus(iBody);
    });
  };
  var $_g7x2xt14rje5nvglc = { resume: resume };

  var EXTRA_SPACING = 50;
  var data = 'data-' + $_1a91a2zeje5nvfmm.resolve('last-outer-height');
  var setLastHeight = function (cBody, value) {
    $_awg6i3xrje5nvffg.set(cBody, data, value);
  };
  var getLastHeight = function (cBody) {
    return $_2hbjs2147je5nvgiw.safeParse(cBody, data);
  };
  var getBoundsFrom = function (rect) {
    return {
      top: $_fw94akwjje5nvfbr.constant(rect.top()),
      bottom: $_fw94akwjje5nvfbr.constant(rect.top() + rect.height())
    };
  };
  var getBounds$2 = function (cWin) {
    var rects = $_ae3vro148je5nvgiy.getRectangles(cWin);
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
    var cBody = $_4ivu2mxfje5nvfeg.fromDom(cWin.document.body);
    var toEditing = function () {
      $_g7x2xt14rje5nvglc.resume(cWin);
    };
    var onResize = $_9e26js13xje5nvgh3.bind($_4ivu2mxfje5nvfeg.fromDom(outerWindow), 'resize', function () {
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
  var $_5trhyh146je5nvgip = { setup: setup$1 };

  var getBodyFromFrame = function (frame) {
    return Option.some($_4ivu2mxfje5nvfeg.fromDom(frame.dom().contentWindow.document.body));
  };
  var getDocFromFrame = function (frame) {
    return Option.some($_4ivu2mxfje5nvfeg.fromDom(frame.dom().contentWindow.document));
  };
  var getWinFromFrame = function (frame) {
    return Option.from(frame.dom().contentWindow);
  };
  var getSelectionFromFrame = function (frame) {
    var optWin = getWinFromFrame(frame);
    return optWin.bind($_bauc9314eje5nvgju.getExact);
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
        return $_9e26js13xje5nvgh3.bind(doc, type, handler);
      };
    });
  };
  var toRect$2 = function (rect) {
    return {
      left: $_fw94akwjje5nvfbr.constant(rect.left),
      top: $_fw94akwjje5nvfbr.constant(rect.top),
      right: $_fw94akwjje5nvfbr.constant(rect.right),
      bottom: $_fw94akwjje5nvfbr.constant(rect.bottom),
      width: $_fw94akwjje5nvfbr.constant(rect.width),
      height: $_fw94akwjje5nvfbr.constant(rect.height)
    };
  };
  var getActiveApi = function (editor) {
    var frame = getFrame(editor);
    var tryFallbackBox = function (win) {
      var isCollapsed = function (sel) {
        return $_8rsueix9je5nvfdw.eq(sel.start(), sel.finish()) && sel.soffset() === sel.foffset();
      };
      var toStartRect = function (sel) {
        var rect = sel.start().dom().getBoundingClientRect();
        return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect$2) : Option.none();
      };
      return $_bauc9314eje5nvgju.getExact(win).filter(isCollapsed).bind(toStartRect);
    };
    return getBodyFromFrame(frame).bind(function (body) {
      return getDocFromFrame(frame).bind(function (doc) {
        return getWinFromFrame(frame).map(function (win) {
          var html = $_4ivu2mxfje5nvfeg.fromDom(doc.dom().documentElement);
          var getCursorBox = editor.getCursorBox.getOrThunk(function () {
            return function () {
              return $_bauc9314eje5nvgju.get(win).bind(function (sel) {
                return $_bauc9314eje5nvgju.getFirstRect(win, sel).orThunk(function () {
                  return tryFallbackBox(win);
                });
              });
            };
          });
          var setSelection = editor.setSelection.getOrThunk(function () {
            return function (start, soffset, finish, foffset) {
              $_bauc9314eje5nvgju.setExact(win, start, soffset, finish, foffset);
            };
          });
          var clearSelection = editor.clearSelection.getOrThunk(function () {
            return function () {
              $_bauc9314eje5nvgju.clear(win);
            };
          });
          return {
            body: $_fw94akwjje5nvfbr.constant(body),
            doc: $_fw94akwjje5nvfbr.constant(doc),
            win: $_fw94akwjje5nvfbr.constant(win),
            html: $_fw94akwjje5nvfbr.constant(html),
            getSelection: $_fw94akwjje5nvfbr.curry(getSelectionFromFrame, frame),
            setSelection: setSelection,
            clearSelection: clearSelection,
            frame: $_fw94akwjje5nvfbr.constant(frame),
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
  var $_ag6edh14sje5nvglj = {
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
  var isAndroid = $_2m9vcuwkje5nvfbu.detect().os.isAndroid();
  var matchColor = function (editorBody) {
    var color = $_98elm5103je5nvfpe.get(editorBody, 'background-color');
    return color !== undefined && color !== '' ? 'background-color:' + color + '!important' : bgFallback;
  };
  var clobberStyles = function (container, editorBody) {
    var gatherSibilings = function (element) {
      var siblings = $_8xqdn0zvje5nvfot.siblings(element, '*');
      return siblings;
    };
    var clobber = function (clobberStyle) {
      return function (element) {
        var styles = $_awg6i3xrje5nvffg.get(element, 'style');
        var backup = styles === undefined ? 'no-styles' : styles.trim();
        if (backup === clobberStyle) {
          return;
        } else {
          $_awg6i3xrje5nvffg.set(element, attr, backup);
          $_awg6i3xrje5nvffg.set(element, 'style', clobberStyle);
        }
      };
    };
    var ancestors = $_8xqdn0zvje5nvfot.ancestors(container, '*');
    var siblings = $_1r8n3awsje5nvfcd.bind(ancestors, gatherSibilings);
    var bgColor = matchColor(editorBody);
    $_1r8n3awsje5nvfcd.each(siblings, clobber(siblingStyles));
    $_1r8n3awsje5nvfcd.each(ancestors, clobber(ancestorPosition + ancestorStyles + bgColor));
    var containerStyles = isAndroid === true ? '' : ancestorPosition;
    clobber(containerStyles + ancestorStyles + bgColor)(container);
  };
  var restoreStyles = function () {
    var clobberedEls = $_8xqdn0zvje5nvfot.all('[' + attr + ']');
    $_1r8n3awsje5nvfcd.each(clobberedEls, function (element) {
      var restore = $_awg6i3xrje5nvffg.get(element, attr);
      if (restore !== 'no-styles') {
        $_awg6i3xrje5nvffg.set(element, 'style', restore);
      } else {
        $_awg6i3xrje5nvffg.remove(element, 'style');
      }
      $_awg6i3xrje5nvffg.remove(element, attr);
    });
  };
  var $_5xiwz14tje5nvgls = {
    clobberStyles: clobberStyles,
    restoreStyles: restoreStyles
  };

  var tag = function () {
    var head = $_acyoduzxje5nvfox.first('head').getOrDie();
    var nu = function () {
      var meta = $_4ivu2mxfje5nvfeg.fromTag('meta');
      $_awg6i3xrje5nvffg.set(meta, 'name', 'viewport');
      $_hzekox2je5nvfdc.append(head, meta);
      return meta;
    };
    var element = $_acyoduzxje5nvfox.first('meta[name="viewport"]').getOrThunk(nu);
    var backup = $_awg6i3xrje5nvffg.get(element, 'content');
    var maximize = function () {
      $_awg6i3xrje5nvffg.set(element, 'content', 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0');
    };
    var restore = function () {
      if (backup !== undefined && backup !== null && backup.length > 0) {
        $_awg6i3xrje5nvffg.set(element, 'content', backup);
      } else {
        $_awg6i3xrje5nvffg.set(element, 'content', 'user-scalable=yes');
      }
    };
    return {
      maximize: maximize,
      restore: restore
    };
  };
  var $_1j7jfq14uje5nvgm3 = { tag: tag };

  var create$5 = function (platform, mask) {
    var meta = $_1j7jfq14uje5nvgm3.tag();
    var androidApi = $_1lzorw12oje5nvg6n.api();
    var androidEvents = $_1lzorw12oje5nvg6n.api();
    var enter = function () {
      mask.hide();
      $_26dua8ynje5nvfjs.add(platform.container, $_1a91a2zeje5nvfmm.resolve('fullscreen-maximized'));
      $_26dua8ynje5nvfjs.add(platform.container, $_1a91a2zeje5nvfmm.resolve('android-maximized'));
      meta.maximize();
      $_26dua8ynje5nvfjs.add(platform.body, $_1a91a2zeje5nvfmm.resolve('android-scroll-reload'));
      androidApi.set($_5trhyh146je5nvgip.setup(platform.win, $_ag6edh14sje5nvglj.getWin(platform.editor).getOrDie('no')));
      $_ag6edh14sje5nvglj.getActiveApi(platform.editor).each(function (editorApi) {
        $_5xiwz14tje5nvgls.clobberStyles(platform.container, editorApi.body());
        androidEvents.set($_41sask142je5nvghr.initEvents(editorApi, platform.toolstrip, platform.alloy));
      });
    };
    var exit = function () {
      meta.restore();
      mask.show();
      $_26dua8ynje5nvfjs.remove(platform.container, $_1a91a2zeje5nvfmm.resolve('fullscreen-maximized'));
      $_26dua8ynje5nvfjs.remove(platform.container, $_1a91a2zeje5nvfmm.resolve('android-maximized'));
      $_5xiwz14tje5nvgls.restoreStyles();
      $_26dua8ynje5nvfjs.remove(platform.body, $_1a91a2zeje5nvfmm.resolve('android-scroll-reload'));
      androidEvents.clear();
      androidApi.clear();
    };
    return {
      enter: enter,
      exit: exit
    };
  };
  var $_14zncu141je5nvghn = { create: create$5 };

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
  var $_6t6egh14wje5nvgmn = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var sketch$10 = function (onView, translate) {
    var memIcon = $_afv5an11rje5nvg0s.record(Container.sketch({
      dom: $_6mum2b113je5nvfwf.dom('<div aria-hidden="true" class="${prefix}-mask-tap-icon"></div>'),
      containerBehaviours: $_gg4wg0y2je5nvfgj.derive([Toggling.config({
          toggleClass: $_1a91a2zeje5nvfmm.resolve('mask-tap-icon-selected'),
          toggleOnExecute: false
        })])
    }));
    var onViewThrottle = $_6t6egh14wje5nvgmn.first(onView, 200);
    return Container.sketch({
      dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-disabled-mask"></div>'),
      components: [Container.sketch({
          dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-content-container"></div>'),
          components: [Button.sketch({
              dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-content-tap-section"></div>'),
              components: [memIcon.asSpec()],
              action: function (button) {
                onViewThrottle.throttle();
              },
              buttonBehaviours: $_gg4wg0y2je5nvfgj.derive([Toggling.config({ toggleClass: $_1a91a2zeje5nvfmm.resolve('mask-tap-icon-selected') })])
            })]
        })]
    });
  };
  var $_39hyh214vje5nvgme = { sketch: sketch$10 };

  var MobileSchema = $_8shw8ryeje5nvfis.objOf([
    $_1a8dv7y7je5nvfhl.strictObjOf('editor', [
      $_1a8dv7y7je5nvfhl.strict('getFrame'),
      $_1a8dv7y7je5nvfhl.option('getBody'),
      $_1a8dv7y7je5nvfhl.option('getDoc'),
      $_1a8dv7y7je5nvfhl.option('getWin'),
      $_1a8dv7y7je5nvfhl.option('getSelection'),
      $_1a8dv7y7je5nvfhl.option('setSelection'),
      $_1a8dv7y7je5nvfhl.option('clearSelection'),
      $_1a8dv7y7je5nvfhl.option('cursorSaver'),
      $_1a8dv7y7je5nvfhl.option('onKeyup'),
      $_1a8dv7y7je5nvfhl.option('onNodeChanged'),
      $_1a8dv7y7je5nvfhl.option('getCursorBox'),
      $_1a8dv7y7je5nvfhl.strict('onDomChanged'),
      $_1a8dv7y7je5nvfhl.defaulted('onTouchContent', $_fw94akwjje5nvfbr.noop),
      $_1a8dv7y7je5nvfhl.defaulted('onTapContent', $_fw94akwjje5nvfbr.noop),
      $_1a8dv7y7je5nvfhl.defaulted('onTouchToolstrip', $_fw94akwjje5nvfbr.noop),
      $_1a8dv7y7je5nvfhl.defaulted('onScrollToCursor', $_fw94akwjje5nvfbr.constant({ unbind: $_fw94akwjje5nvfbr.noop })),
      $_1a8dv7y7je5nvfhl.defaulted('onScrollToElement', $_fw94akwjje5nvfbr.constant({ unbind: $_fw94akwjje5nvfbr.noop })),
      $_1a8dv7y7je5nvfhl.defaulted('onToEditing', $_fw94akwjje5nvfbr.constant({ unbind: $_fw94akwjje5nvfbr.noop })),
      $_1a8dv7y7je5nvfhl.defaulted('onToReading', $_fw94akwjje5nvfbr.constant({ unbind: $_fw94akwjje5nvfbr.noop })),
      $_1a8dv7y7je5nvfhl.defaulted('onToolbarScrollStart', $_fw94akwjje5nvfbr.identity)
    ]),
    $_1a8dv7y7je5nvfhl.strict('socket'),
    $_1a8dv7y7je5nvfhl.strict('toolstrip'),
    $_1a8dv7y7je5nvfhl.strict('dropup'),
    $_1a8dv7y7je5nvfhl.strict('toolbar'),
    $_1a8dv7y7je5nvfhl.strict('container'),
    $_1a8dv7y7je5nvfhl.strict('alloy'),
    $_1a8dv7y7je5nvfhl.state('win', function (spec) {
      return $_76yst9x3je5nvfde.owner(spec.socket).dom().defaultView;
    }),
    $_1a8dv7y7je5nvfhl.state('body', function (spec) {
      return $_4ivu2mxfje5nvfeg.fromDom(spec.socket.dom().ownerDocument.body);
    }),
    $_1a8dv7y7je5nvfhl.defaulted('translate', $_fw94akwjje5nvfbr.identity),
    $_1a8dv7y7je5nvfhl.defaulted('setReadOnly', $_fw94akwjje5nvfbr.noop)
  ]);

  var produce = function (raw) {
    var mobile = $_8shw8ryeje5nvfis.asRawOrDie('Getting AndroidWebapp schema', MobileSchema, raw);
    $_98elm5103je5nvfpe.set(mobile.toolstrip, 'width', '100%');
    var onTap = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_92nfmp12tje5nvg7w.build($_39hyh214vje5nvgme.sketch(onTap, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    $_hzekox2je5nvfdc.append(mobile.container, mask.element());
    var mode = $_14zncu141je5nvghn.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: $_fw94akwjje5nvfbr.noop,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_fw94akwjje5nvfbr.noop
    };
  };
  var $_b31j2r140je5nvghe = { produce: produce };

  var schema$14 = [
    $_1a8dv7y7je5nvfhl.defaulted('shell', true),
    $_4c10f910oje5nvfsu.field('toolbarBehaviours', [Replacing])
  ];
  var enhanceGroups = function (detail) {
    return { behaviours: $_gg4wg0y2je5nvfgj.derive([Replacing.config({})]) };
  };
  var partTypes$1 = [$_5gmgi910vje5nvfue.optional({
      name: 'groups',
      overrides: enhanceGroups
    })];
  var $_cldhh6150je5nvgnf = {
    name: $_fw94akwjje5nvfbr.constant('Toolbar'),
    schema: $_fw94akwjje5nvfbr.constant(schema$14),
    parts: $_fw94akwjje5nvfbr.constant(partTypes$1)
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
      return detail.shell() ? Option.some(component) : $_cqz5s610tje5nvftq.getPart(component, detail, 'groups');
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
      behaviours: $_1v3q5lwyje5nvfcw.deepMerge($_gg4wg0y2je5nvfgj.derive(extra.behaviours), $_4c10f910oje5nvfsu.get(detail.toolbarBehaviours())),
      apis: { setGroups: setGroups },
      domModification: { attributes: { role: 'group' } }
    };
  };
  var Toolbar = $_907xc510pje5nvft1.composite({
    name: 'Toolbar',
    configFields: $_cldhh6150je5nvgnf.schema(),
    partFields: $_cldhh6150je5nvgnf.parts(),
    factory: factory$4,
    apis: {
      setGroups: function (apis, toolbar, groups) {
        apis.setGroups(toolbar, groups);
      }
    }
  });

  var schema$15 = [
    $_1a8dv7y7je5nvfhl.strict('items'),
    $_bnu93dz6je5nvflc.markers(['itemClass']),
    $_4c10f910oje5nvfsu.field('tgroupBehaviours', [Keying])
  ];
  var partTypes$2 = [$_5gmgi910vje5nvfue.group({
      name: 'items',
      unit: 'item',
      overrides: function (detail) {
        return { domModification: { classes: [detail.markers().itemClass()] } };
      }
    })];
  var $_dpjo4t152je5nvgnr = {
    name: $_fw94akwjje5nvfbr.constant('ToolbarGroup'),
    schema: $_fw94akwjje5nvfbr.constant(schema$15),
    parts: $_fw94akwjje5nvfbr.constant(partTypes$2)
  };

  var factory$5 = function (detail, components, spec, _externals) {
    return $_1v3q5lwyje5nvfcw.deepMerge({ dom: { attributes: { role: 'toolbar' } } }, {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_1v3q5lwyje5nvfcw.deepMerge($_gg4wg0y2je5nvfgj.derive([Keying.config({
          mode: 'flow',
          selector: '.' + detail.markers().itemClass()
        })]), $_4c10f910oje5nvfsu.get(detail.tgroupBehaviours())),
      'debug.sketcher': spec['debug.sketcher']
    });
  };
  var ToolbarGroup = $_907xc510pje5nvft1.composite({
    name: 'ToolbarGroup',
    configFields: $_dpjo4t152je5nvgnr.schema(),
    partFields: $_dpjo4t152je5nvgnr.parts(),
    factory: factory$5
  });

  var dataHorizontal = 'data-' + $_1a91a2zeje5nvfmm.resolve('horizontal-scroll');
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
    $_awg6i3xrje5nvffg.set(container, dataHorizontal, 'true');
  };
  var hasScroll = function (container) {
    return $_awg6i3xrje5nvffg.get(container, dataHorizontal) === 'true' ? hasHorizontalScroll : hasVerticalScroll;
  };
  var exclusive = function (scope, selector) {
    return $_9e26js13xje5nvgh3.bind(scope, 'touchmove', function (event) {
      $_acyoduzxje5nvfox.closest(event.target(), selector).filter(hasScroll).fold(function () {
        event.raw().preventDefault();
      }, $_fw94akwjje5nvfbr.noop);
    });
  };
  var $_fp9qvq153je5nvgny = {
    exclusive: exclusive,
    markAsHorizontal: markAsHorizontal
  };

  function ScrollingToolbar () {
    var makeGroup = function (gSpec) {
      var scrollClass = gSpec.scrollable === true ? '${prefix}-toolbar-scrollable-group' : '';
      return {
        dom: $_6mum2b113je5nvfwf.dom('<div aria-label="' + gSpec.label + '" class="${prefix}-toolbar-group ' + scrollClass + '"></div>'),
        tgroupBehaviours: $_gg4wg0y2je5nvfgj.derive([$_ejbtwg126je5nvg3d.config('adhoc-scrollable-toolbar', gSpec.scrollable === true ? [$_ge7gjjy4je5nvfh4.runOnInit(function (component, simulatedEvent) {
              $_98elm5103je5nvfpe.set(component.element(), 'overflow-x', 'auto');
              $_fp9qvq153je5nvgny.markAsHorizontal(component.element());
              $_8zn2oa13uje5nvggi.register(component.element());
            })] : [])]),
        components: [Container.sketch({ components: [ToolbarGroup.parts().items({})] })],
        markers: { itemClass: $_1a91a2zeje5nvfmm.resolve('toolbar-group-item') },
        items: gSpec.items
      };
    };
    var toolbar = $_92nfmp12tje5nvg7w.build(Toolbar.sketch({
      dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-toolbar"></div>'),
      components: [Toolbar.parts().groups({})],
      toolbarBehaviours: $_gg4wg0y2je5nvfgj.derive([
        Toggling.config({
          toggleClass: $_1a91a2zeje5nvfmm.resolve('context-toolbar'),
          toggleOnExecute: false,
          aria: { mode: 'none' }
        }),
        Keying.config({ mode: 'cyclic' })
      ]),
      shell: true
    }));
    var wrapper = $_92nfmp12tje5nvg7w.build(Container.sketch({
      dom: { classes: [$_1a91a2zeje5nvfmm.resolve('toolstrip')] },
      components: [$_92nfmp12tje5nvg7w.premade(toolbar)],
      containerBehaviours: $_gg4wg0y2je5nvfgj.derive([Toggling.config({
          toggleClass: $_1a91a2zeje5nvfmm.resolve('android-selection-context-toolbar'),
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
      return $_1r8n3awsje5nvfcd.map(gs, $_fw94akwjje5nvfbr.compose(ToolbarGroup.sketch, makeGroup));
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
      wrapper: $_fw94akwjje5nvfbr.constant(wrapper),
      toolbar: $_fw94akwjje5nvfbr.constant(toolbar),
      createGroups: createGroups,
      setGroups: setGroups,
      setContextToolbar: setContextToolbar,
      restoreToolbar: restoreToolbar,
      refresh: refresh,
      focus: focus
    };
  }

  var makeEditSwitch = function (webapp) {
    return $_92nfmp12tje5nvg7w.build(Button.sketch({
      dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-mask-edit-icon ${prefix}-icon"></div>'),
      action: function () {
        webapp.run(function (w) {
          w.setReadOnly(false);
        });
      }
    }));
  };
  var makeSocket = function () {
    return $_92nfmp12tje5nvg7w.build(Container.sketch({
      dom: $_6mum2b113je5nvfwf.dom('<div class="${prefix}-editor-socket"></div>'),
      components: [],
      containerBehaviours: $_gg4wg0y2je5nvfgj.derive([Replacing.config({})])
    }));
  };
  var showEdit = function (socket, switchToEdit) {
    Replacing.append(socket, $_92nfmp12tje5nvg7w.premade(switchToEdit));
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
  var $_9e1nmq154je5nvgo4 = {
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
    $_ay0w16137je5nvgbx.remove(root, [
      slideConfig.shrinkingClass(),
      slideConfig.growingClass()
    ]);
  };
  var setShrunk = function (component, slideConfig) {
    $_26dua8ynje5nvfjs.remove(component.element(), slideConfig.openClass());
    $_26dua8ynje5nvfjs.add(component.element(), slideConfig.closedClass());
    $_98elm5103je5nvfpe.set(component.element(), getDimensionProperty(slideConfig), '0px');
    $_98elm5103je5nvfpe.reflow(component.element());
  };
  var measureTargetSize = function (component, slideConfig) {
    setGrown(component, slideConfig);
    var expanded = getDimension(slideConfig, component.element());
    setShrunk(component, slideConfig);
    return expanded;
  };
  var setGrown = function (component, slideConfig) {
    $_26dua8ynje5nvfjs.remove(component.element(), slideConfig.closedClass());
    $_26dua8ynje5nvfjs.add(component.element(), slideConfig.openClass());
    $_98elm5103je5nvfpe.remove(component.element(), getDimensionProperty(slideConfig));
  };
  var doImmediateShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_98elm5103je5nvfpe.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_98elm5103je5nvfpe.reflow(component.element());
    disableTransitions(component, slideConfig);
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
    slideConfig.onShrunk()(component);
  };
  var doStartShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_98elm5103je5nvfpe.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_98elm5103je5nvfpe.reflow(component.element());
    var root = getAnimationRoot(component, slideConfig);
    $_26dua8ynje5nvfjs.add(root, slideConfig.shrinkingClass());
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
  };
  var doStartGrow = function (component, slideConfig, slideState) {
    var fullSize = measureTargetSize(component, slideConfig);
    var root = getAnimationRoot(component, slideConfig);
    $_26dua8ynje5nvfjs.add(root, slideConfig.growingClass());
    setGrown(component, slideConfig);
    $_98elm5103je5nvfpe.set(component.element(), getDimensionProperty(slideConfig), fullSize);
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
    return $_26dua8ynje5nvfjs.has(root, slideConfig.growingClass()) === true;
  };
  var isShrinking = function (component, slideConfig, slideState) {
    var root = getAnimationRoot(component, slideConfig);
    return $_26dua8ynje5nvfjs.has(root, slideConfig.shrinkingClass()) === true;
  };
  var isTransitioning = function (component, slideConfig, slideState) {
    return isGrowing(component, slideConfig, slideState) === true || isShrinking(component, slideConfig, slideState) === true;
  };
  var toggleGrow = function (component, slideConfig, slideState) {
    var f = slideState.isExpanded() ? doStartShrink : doStartGrow;
    f(component, slideConfig, slideState);
  };
  var $_bi7w42158je5nvgot = {
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
    return expanded ? $_3hxngfyhje5nvfj4.nu({
      classes: [slideConfig.openClass()],
      styles: {}
    }) : $_3hxngfyhje5nvfj4.nu({
      classes: [slideConfig.closedClass()],
      styles: $_17met3xsje5nvffn.wrap(slideConfig.dimension().property(), '0px')
    });
  };
  var events$9 = function (slideConfig, slideState) {
    return $_ge7gjjy4je5nvfh4.derive([$_ge7gjjy4je5nvfh4.run($_4z587jwije5nvfbn.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        if (raw.propertyName === slideConfig.dimension().property()) {
          $_bi7w42158je5nvgot.disableTransitions(component, slideConfig, slideState);
          if (slideState.isExpanded())
            $_98elm5103je5nvfpe.remove(component.element(), slideConfig.dimension().property());
          var notify = slideState.isExpanded() ? slideConfig.onGrown() : slideConfig.onShrunk();
          notify(component, simulatedEvent);
        }
      })]);
  };
  var $_dyqhuo157je5nvgon = {
    exhibit: exhibit$5,
    events: events$9
  };

  var SlidingSchema = [
    $_1a8dv7y7je5nvfhl.strict('closedClass'),
    $_1a8dv7y7je5nvfhl.strict('openClass'),
    $_1a8dv7y7je5nvfhl.strict('shrinkingClass'),
    $_1a8dv7y7je5nvfhl.strict('growingClass'),
    $_1a8dv7y7je5nvfhl.option('getAnimationRoot'),
    $_bnu93dz6je5nvflc.onHandler('onShrunk'),
    $_bnu93dz6je5nvflc.onHandler('onStartShrink'),
    $_bnu93dz6je5nvflc.onHandler('onGrown'),
    $_bnu93dz6je5nvflc.onHandler('onStartGrow'),
    $_1a8dv7y7je5nvfhl.defaulted('expanded', false),
    $_1a8dv7y7je5nvfhl.strictOf('dimension', $_8shw8ryeje5nvfis.choose('property', {
      width: [
        $_bnu93dz6je5nvflc.output('property', 'width'),
        $_bnu93dz6je5nvflc.output('getDimension', function (elem) {
          return $_3mznm711kje5nvfza.get(elem) + 'px';
        })
      ],
      height: [
        $_bnu93dz6je5nvflc.output('property', 'height'),
        $_bnu93dz6je5nvflc.output('getDimension', function (elem) {
          return $_b3c24w102je5nvfpc.get(elem) + 'px';
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
      setCollapsed: $_fw94akwjje5nvfbr.curry(state.set, false),
      setExpanded: $_fw94akwjje5nvfbr.curry(state.set, true),
      readState: readState
    });
  };
  var $_ey1lzd15aje5nvgpf = { init: init$4 };

  var Sliding = $_gg4wg0y2je5nvfgj.create({
    fields: SlidingSchema,
    name: 'sliding',
    active: $_dyqhuo157je5nvgon,
    apis: $_bi7w42158je5nvgot,
    state: $_ey1lzd15aje5nvgpf
  });

  var build$2 = function (refresh, scrollIntoView) {
    var dropup = $_92nfmp12tje5nvg7w.build(Container.sketch({
      dom: {
        tag: 'div',
        classes: $_1a91a2zeje5nvfmm.resolve('dropup')
      },
      components: [],
      containerBehaviours: $_gg4wg0y2je5nvfgj.derive([
        Replacing.config({}),
        Sliding.config({
          closedClass: $_1a91a2zeje5nvfmm.resolve('dropup-closed'),
          openClass: $_1a91a2zeje5nvfmm.resolve('dropup-open'),
          shrinkingClass: $_1a91a2zeje5nvfmm.resolve('dropup-shrinking'),
          growingClass: $_1a91a2zeje5nvfmm.resolve('dropup-growing'),
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
        $_1eacyhzdje5nvfmj.orientation(function (component, data) {
          disappear($_fw94akwjje5nvfbr.noop);
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
      component: $_fw94akwjje5nvfbr.constant(dropup),
      element: dropup.element
    };
  };
  var $_fhlzpo155je5nvgoe = { build: build$2 };

  var isDangerous = function (event) {
    return event.raw().which === $_2oe4idzpje5nvfnz.BACKSPACE()[0] && !$_1r8n3awsje5nvfcd.contains([
      'input',
      'textarea'
    ], $_3imygaxkje5nvfes.name(event.target()));
  };
  var isFirefox = $_2m9vcuwkje5nvfbu.detect().browser.isFirefox();
  var settingsSchema = $_8shw8ryeje5nvfis.objOfOnly([
    $_1a8dv7y7je5nvfhl.strictFunction('triggerEvent'),
    $_1a8dv7y7je5nvfhl.strictFunction('broadcastEvent'),
    $_1a8dv7y7je5nvfhl.defaulted('stopBackspace', true)
  ]);
  var bindFocus = function (container, handler) {
    if (isFirefox) {
      return $_9e26js13xje5nvgh3.capture(container, 'focus', handler);
    } else {
      return $_9e26js13xje5nvgh3.bind(container, 'focusin', handler);
    }
  };
  var bindBlur = function (container, handler) {
    if (isFirefox) {
      return $_9e26js13xje5nvgh3.capture(container, 'blur', handler);
    } else {
      return $_9e26js13xje5nvgh3.bind(container, 'focusout', handler);
    }
  };
  var setup$2 = function (container, rawSettings) {
    var settings = $_8shw8ryeje5nvfis.asRawOrDie('Getting GUI events settings', settingsSchema, rawSettings);
    var pointerEvents = $_2m9vcuwkje5nvfbu.detect().deviceType.isTouch() ? [
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
    var tapEvent = $_45i4b9144je5nvgie.monitor(settings);
    var simpleEvents = $_1r8n3awsje5nvfcd.map(pointerEvents.concat([
      'selectstart',
      'input',
      'contextmenu',
      'change',
      'transitionend',
      'dragstart',
      'dragover',
      'drop'
    ]), function (type) {
      return $_9e26js13xje5nvgh3.bind(container, type, function (event) {
        tapEvent.fireIfReady(event, type).each(function (tapStopped) {
          if (tapStopped)
            event.kill();
        });
        var stopped = settings.triggerEvent(type, event);
        if (stopped)
          event.kill();
      });
    });
    var onKeydown = $_9e26js13xje5nvgh3.bind(container, 'keydown', function (event) {
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
        settings.triggerEvent($_8j7iltwhje5nvfbj.postBlur(), event);
      }, 0);
    });
    var defaultView = $_76yst9x3je5nvfde.defaultView(container);
    var onWindowScroll = $_9e26js13xje5nvgh3.bind(defaultView, 'scroll', function (event) {
      var stopped = settings.broadcastEvent($_8j7iltwhje5nvfbj.windowScroll(), event);
      if (stopped)
        event.kill();
    });
    var unbind = function () {
      $_1r8n3awsje5nvfcd.each(simpleEvents, function (e) {
        e.unbind();
      });
      onKeydown.unbind();
      onFocusIn.unbind();
      onFocusOut.unbind();
      onWindowScroll.unbind();
    };
    return { unbind: unbind };
  };
  var $_gbh19f15dje5nvgq6 = { setup: setup$2 };

  var derive$3 = function (rawEvent, rawTarget) {
    var source = $_17met3xsje5nvffn.readOptFrom(rawEvent, 'target').map(function (getTarget) {
      return getTarget();
    }).getOr(rawTarget);
    return Cell(source);
  };
  var $_ehlgbz15fje5nvgr1 = { derive: derive$3 };

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
      event: $_fw94akwjje5nvfbr.constant(event),
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
      cut: $_fw94akwjje5nvfbr.noop,
      isStopped: stopper.get,
      isCut: $_fw94akwjje5nvfbr.constant(false),
      event: $_fw94akwjje5nvfbr.constant(event),
      setTarget: $_fw94akwjje5nvfbr.die(new Error('Cannot set target of a broadcasted event')),
      getTarget: $_fw94akwjje5nvfbr.die(new Error('Cannot get target of a broadcasted event'))
    };
  };
  var fromTarget = function (event, target) {
    var source = Cell(target);
    return fromSource(event, source);
  };
  var $_hrs5e15gje5nvgr5 = {
    fromSource: fromSource,
    fromExternal: fromExternal,
    fromTarget: fromTarget
  };

  var adt$6 = $_dj88xixwje5nvfg0.generate([
    { stopped: [] },
    { resume: ['element'] },
    { complete: [] }
  ]);
  var doTriggerHandler = function (lookup, eventType, rawEvent, target, source, logger) {
    var handler = lookup(eventType, target);
    var simulatedEvent = $_hrs5e15gje5nvgr5.fromSource(rawEvent, source);
    return handler.fold(function () {
      logger.logEventNoHandlers(eventType, target);
      return adt$6.complete();
    }, function (handlerInfo) {
      var descHandler = handlerInfo.descHandler();
      var eventHandler = $_356xie134je5nvgaz.getHandler(descHandler);
      eventHandler(simulatedEvent);
      if (simulatedEvent.isStopped()) {
        logger.logEventStopped(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.stopped();
      } else if (simulatedEvent.isCut()) {
        logger.logEventCut(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.complete();
      } else
        return $_76yst9x3je5nvfde.parent(handlerInfo.element()).fold(function () {
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
    var source = $_ehlgbz15fje5nvgr1.derive(rawEvent, target);
    return doTriggerHandler(lookup, eventType, rawEvent, target, source, logger);
  };
  var broadcast = function (listeners, rawEvent, logger) {
    var simulatedEvent = $_hrs5e15gje5nvgr5.fromExternal(rawEvent);
    $_1r8n3awsje5nvfcd.each(listeners, function (listener) {
      var descHandler = listener.descHandler();
      var handler = $_356xie134je5nvgaz.getHandler(descHandler);
      handler(simulatedEvent);
    });
    return simulatedEvent.isStopped();
  };
  var triggerUntilStopped = function (lookup, eventType, rawEvent, logger) {
    var rawTarget = rawEvent.target();
    return triggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, logger);
  };
  var triggerOnUntilStopped = function (lookup, eventType, rawEvent, rawTarget, logger) {
    var source = $_ehlgbz15fje5nvgr1.derive(rawEvent, rawTarget);
    return doTriggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, source, logger);
  };
  var $_fhmmis15eje5nvgqr = {
    triggerHandler: triggerHandler,
    triggerUntilStopped: triggerUntilStopped,
    triggerOnUntilStopped: triggerOnUntilStopped,
    broadcast: broadcast
  };

  var closest$4 = function (target, transform, isRoot) {
    var delegate = $_eew4a3yvje5nvfkb.closest(target, function (elem) {
      return transform(elem).isSome();
    }, isRoot);
    return delegate.bind(transform);
  };
  var $_dirw3915jje5nvgrq = { closest: closest$4 };

  var eventHandler = $_f74ptsx4je5nvfdn.immutable('element', 'descHandler');
  var messageHandler = function (id, handler) {
    return {
      id: $_fw94akwjje5nvfbr.constant(id),
      descHandler: $_fw94akwjje5nvfbr.constant(handler)
    };
  };
  function EventRegistry () {
    var registry = {};
    var registerId = function (extraArgs, id, events) {
      $_3q4qwfx0je5nvfcy.each(events, function (v, k) {
        var handlers = registry[k] !== undefined ? registry[k] : {};
        handlers[id] = $_356xie134je5nvgaz.curryArgs(v, extraArgs);
        registry[k] = handlers;
      });
    };
    var findHandler = function (handlers, elem) {
      return $_6tom8d10xje5nvfvb.read(elem).fold(function (err) {
        return Option.none();
      }, function (id) {
        var reader = $_17met3xsje5nvffn.readOpt(id);
        return handlers.bind(reader).map(function (descHandler) {
          return eventHandler(elem, descHandler);
        });
      });
    };
    var filterByType = function (type) {
      return $_17met3xsje5nvffn.readOptFrom(registry, type).map(function (handlers) {
        return $_3q4qwfx0je5nvfcy.mapToArray(handlers, function (f, id) {
          return messageHandler(id, f);
        });
      }).getOr([]);
    };
    var find = function (isAboveRoot, type, target) {
      var readType = $_17met3xsje5nvffn.readOpt(type);
      var handlers = readType(registry);
      return $_dirw3915jje5nvgrq.closest(target, function (elem) {
        return findHandler(handlers, elem);
      }, isAboveRoot);
    };
    var unregisterId = function (id) {
      $_3q4qwfx0je5nvfcy.each(registry, function (handlersById, eventName) {
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
      return $_6tom8d10xje5nvfvb.read(elem).fold(function () {
        return $_6tom8d10xje5nvfvb.write('uid-', component.element());
      }, function (uid) {
        return uid;
      });
    };
    var failOnDuplicate = function (component, tagId) {
      var conflict = components[tagId];
      if (conflict === component)
        unregister(component);
      else
        throw new Error('The tagId "' + tagId + '" is already used by: ' + $_awwr4fxmje5nvff5.element(conflict.element()) + '\nCannot use it for: ' + $_awwr4fxmje5nvff5.element(component.element()) + '\n' + 'The conflicting element is' + ($_3mo1igxjje5nvfep.inBody(conflict.element()) ? ' ' : ' not ') + 'already in the DOM');
    };
    var register = function (component) {
      var tagId = readOrTag(component);
      if ($_17met3xsje5nvffn.hasKey(components, tagId))
        failOnDuplicate(component, tagId);
      var extraArgs = [component];
      events.registerId(extraArgs, tagId, component.events());
      components[tagId] = component;
    };
    var unregister = function (component) {
      $_6tom8d10xje5nvfvb.read(component.element()).each(function (tagId) {
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
      return $_17met3xsje5nvffn.readOpt(id)(components);
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
    var root = $_92nfmp12tje5nvg7w.build(Container.sketch({ dom: { tag: 'div' } }));
    return takeover(root);
  };
  var takeover = function (root) {
    var isAboveRoot = function (el) {
      return $_76yst9x3je5nvfde.parent(root.element()).fold(function () {
        return true;
      }, function (parent) {
        return $_8rsueix9je5nvfdw.eq(el, parent);
      });
    };
    var registry = Registry();
    var lookup = function (eventName, target) {
      return registry.find(isAboveRoot, eventName, target);
    };
    var domEvents = $_gbh19f15dje5nvgq6.setup(root.element(), {
      triggerEvent: function (eventName, event) {
        return $_fj5lx3xlje5nvfeu.monitorEvent(eventName, event.target(), function (logger) {
          return $_fhmmis15eje5nvgqr.triggerUntilStopped(lookup, eventName, event, logger);
        });
      },
      broadcastEvent: function (eventName, event) {
        var listeners = registry.filter(eventName);
        return $_fhmmis15eje5nvgqr.broadcast(listeners, event);
      }
    });
    var systemApi = SystemApi({
      debugInfo: $_fw94akwjje5nvfbr.constant('real'),
      triggerEvent: function (customType, target, data) {
        $_fj5lx3xlje5nvfeu.monitorEvent(customType, target, function (logger) {
          $_fhmmis15eje5nvgqr.triggerOnUntilStopped(lookup, customType, data, target, logger);
        });
      },
      triggerFocus: function (target, originator) {
        $_6tom8d10xje5nvfvb.read(target).fold(function () {
          $_80e37iytje5nvfk6.focus(target);
        }, function (_alloyId) {
          $_fj5lx3xlje5nvfeu.monitorEvent($_8j7iltwhje5nvfbj.focus(), target, function (logger) {
            $_fhmmis15eje5nvgqr.triggerHandler(lookup, $_8j7iltwhje5nvfbj.focus(), {
              originator: $_fw94akwjje5nvfbr.constant(originator),
              target: $_fw94akwjje5nvfbr.constant(target)
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
      build: $_92nfmp12tje5nvg7w.build,
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
      if (!$_3imygaxkje5nvfes.isText(component.element())) {
        registry.register(component);
        $_1r8n3awsje5nvfcd.each(component.components(), addToWorld);
        systemApi.triggerEvent($_8j7iltwhje5nvfbj.systemInit(), component.element(), { target: $_fw94akwjje5nvfbr.constant(component.element()) });
      }
    };
    var removeFromWorld = function (component) {
      if (!$_3imygaxkje5nvfes.isText(component.element())) {
        $_1r8n3awsje5nvfcd.each(component.components(), removeFromWorld);
        registry.unregister(component);
      }
      component.disconnect();
    };
    var add = function (component) {
      $_fap2yjx1je5nvfd1.attach(root, component);
    };
    var remove = function (component) {
      $_fap2yjx1je5nvfd1.detach(component);
    };
    var destroy = function () {
      domEvents.unbind();
      $_7calf0xhje5nvfel.remove(root.element());
    };
    var broadcastData = function (data) {
      var receivers = registry.filter($_8j7iltwhje5nvfbj.receive());
      $_1r8n3awsje5nvfcd.each(receivers, function (receiver) {
        var descHandler = receiver.descHandler();
        var handler = $_356xie134je5nvgaz.getHandler(descHandler);
        handler(data);
      });
    };
    var broadcast = function (message) {
      broadcastData({
        universal: $_fw94akwjje5nvfbr.constant(true),
        data: $_fw94akwjje5nvfbr.constant(message)
      });
    };
    var broadcastOn = function (channels, message) {
      broadcastData({
        universal: $_fw94akwjje5nvfbr.constant(false),
        channels: $_fw94akwjje5nvfbr.constant(channels),
        data: $_fw94akwjje5nvfbr.constant(message)
      });
    };
    var getByUid = function (uid) {
      return registry.getById(uid).fold(function () {
        return Result.error(new Error('Could not find component with uid: "' + uid + '" in system.'));
      }, Result.value);
    };
    var getByDom = function (elem) {
      return $_6tom8d10xje5nvfvb.read(elem).bind(getByUid);
    };
    addToWorld(root);
    return {
      root: $_fw94akwjje5nvfbr.constant(root),
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
  var $_1g6pqn15cje5nvgpr = {
    create: create$6,
    takeover: takeover
  };

  var READ_ONLY_MODE_CLASS = $_fw94akwjje5nvfbr.constant($_1a91a2zeje5nvfmm.resolve('readonly-mode'));
  var EDIT_MODE_CLASS = $_fw94akwjje5nvfbr.constant($_1a91a2zeje5nvfmm.resolve('edit-mode'));
  function OuterContainer (spec) {
    var root = $_92nfmp12tje5nvg7w.build(Container.sketch({
      dom: { classes: [$_1a91a2zeje5nvfmm.resolve('outer-container')].concat(spec.classes) },
      containerBehaviours: $_gg4wg0y2je5nvfgj.derive([Swapping.config({
          alpha: READ_ONLY_MODE_CLASS(),
          omega: EDIT_MODE_CLASS()
        })])
    }));
    return $_1g6pqn15cje5nvgpr.takeover(root);
  }

  function AndroidRealm (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_1a91a2zeje5nvfmm.resolve('android-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_1lzorw12oje5nvg6n.api();
    var switchToEdit = $_9e1nmq154je5nvgo4.makeEditSwitch(webapp);
    var socket = $_9e1nmq154je5nvgo4.makeSocket();
    var dropup = $_fhlzpo155je5nvgoe.build($_fw94akwjje5nvfbr.noop, scrollIntoView);
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
      webapp.set($_b31j2r140je5nvghe.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        w.exit();
        Replacing.remove(socket, switchToEdit);
      });
    };
    var updateMode = function (readOnly) {
      $_9e1nmq154je5nvgo4.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_fw94akwjje5nvfbr.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_fw94akwjje5nvfbr.constant(socket),
      dropup: $_fw94akwjje5nvfbr.constant(dropup)
    };
  }

  var input = function (parent, operation) {
    var input = $_4ivu2mxfje5nvfeg.fromTag('input');
    $_98elm5103je5nvfpe.setAll(input, {
      opacity: '0',
      position: 'absolute',
      top: '-1000px',
      left: '-1000px'
    });
    $_hzekox2je5nvfdc.append(parent, input);
    $_80e37iytje5nvfk6.focus(input);
    operation(input);
    $_7calf0xhje5nvfel.remove(input);
  };
  var $_88njxx15oje5nvgsq = { input: input };

  var refreshInput = function (input) {
    var start = input.dom().selectionStart;
    var end = input.dom().selectionEnd;
    var dir = input.dom().selectionDirection;
    setTimeout(function () {
      input.dom().setSelectionRange(start, end, dir);
      $_80e37iytje5nvfk6.focus(input);
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
  var $_6z0acg15qje5nvgt2 = {
    refreshInput: refreshInput,
    refresh: refresh
  };

  var resume$1 = function (cWin, frame) {
    $_80e37iytje5nvfk6.active().each(function (active) {
      if (!$_8rsueix9je5nvfdw.eq(active, frame)) {
        $_80e37iytje5nvfk6.blur(active);
      }
    });
    cWin.focus();
    $_80e37iytje5nvfk6.focus($_4ivu2mxfje5nvfeg.fromDom(cWin.document.body));
    $_6z0acg15qje5nvgt2.refresh(cWin);
  };
  var $_ap7kpe15pje5nvgsv = { resume: resume$1 };

  var stubborn = function (outerBody, cWin, page, frame) {
    var toEditing = function () {
      $_ap7kpe15pje5nvgsv.resume(cWin, frame);
    };
    var toReading = function () {
      $_88njxx15oje5nvgsq.input(outerBody, $_80e37iytje5nvfk6.blur);
    };
    var captureInput = $_9e26js13xje5nvgh3.bind(page, 'keydown', function (evt) {
      if (!$_1r8n3awsje5nvfcd.contains([
          'input',
          'textarea'
        ], $_3imygaxkje5nvfes.name(evt.target()))) {
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
      $_80e37iytje5nvfk6.blur(frame);
    };
    var onToolbarTouch = function () {
      dismissKeyboard();
    };
    var toReading = function () {
      dismissKeyboard();
    };
    var toEditing = function () {
      $_ap7kpe15pje5nvgsv.resume(cWin, frame);
    };
    return {
      toReading: toReading,
      toEditing: toEditing,
      onToolbarTouch: onToolbarTouch,
      destroy: $_fw94akwjje5nvfbr.noop
    };
  };
  var $_apbt0u15nje5nvgsj = {
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
      var toolbarHeight = $_b3c24w102je5nvfpc.get(toolstrip);
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
    var tapping = $_6nm0q8143je5nvgib.monitor(editorApi);
    var refreshThrottle = $_6t6egh14wje5nvgmn.last(refreshView, 300);
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
      $_9e26js13xje5nvgh3.bind(editorApi.doc(), 'touchend', function (touchEvent) {
        if ($_8rsueix9je5nvfdw.eq(editorApi.html(), touchEvent.target()) || $_8rsueix9je5nvfdw.eq(editorApi.body(), touchEvent.target())) {
        }
      }),
      $_9e26js13xje5nvgh3.bind(toolstrip, 'transitionend', function (transitionEvent) {
        if (transitionEvent.raw().propertyName === 'height') {
          reposition();
        }
      }),
      $_9e26js13xje5nvgh3.capture(toolstrip, 'touchstart', function (touchEvent) {
        saveSelectionFirst();
        onToolbarTouch(touchEvent);
        editorApi.onTouchToolstrip();
      }),
      $_9e26js13xje5nvgh3.bind(editorApi.body(), 'touchstart', function (evt) {
        clearSelection();
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_9e26js13xje5nvgh3.bind(editorApi.body(), 'click', function (event) {
        event.kill();
      }),
      $_9e26js13xje5nvgh3.bind(toolstrip, 'touchmove', function () {
        editorApi.onToolbarScrollStart();
      })
    ];
    var destroy = function () {
      $_1r8n3awsje5nvfcd.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_a9o8lh15rje5nvgt6 = { initEvents: initEvents$1 };

  function FakeSelection (win, frame) {
    var doc = win.document;
    var container = $_4ivu2mxfje5nvfeg.fromTag('div');
    $_26dua8ynje5nvfjs.add(container, $_1a91a2zeje5nvfmm.resolve('unfocused-selections'));
    $_hzekox2je5nvfdc.append($_4ivu2mxfje5nvfeg.fromDom(doc.documentElement), container);
    var onTouch = $_9e26js13xje5nvgh3.bind(container, 'touchstart', function (event) {
      event.prevent();
      $_ap7kpe15pje5nvgsv.resume(win, frame);
      clear();
    });
    var make = function (rectangle) {
      var span = $_4ivu2mxfje5nvfeg.fromTag('span');
      $_ay0w16137je5nvgbx.add(span, [
        $_1a91a2zeje5nvfmm.resolve('layer-editor'),
        $_1a91a2zeje5nvfmm.resolve('unfocused-selection')
      ]);
      $_98elm5103je5nvfpe.setAll(span, {
        left: rectangle.left() + 'px',
        top: rectangle.top() + 'px',
        width: rectangle.width() + 'px',
        height: rectangle.height() + 'px'
      });
      return span;
    };
    var update = function () {
      clear();
      var rectangles = $_ae3vro148je5nvgiy.getRectangles(win);
      var spans = $_1r8n3awsje5nvfcd.map(rectangles, make);
      $_76ml55xije5nvfen.append(container, spans);
    };
    var clear = function () {
      $_7calf0xhje5nvfel.empty(container);
    };
    var destroy = function () {
      onTouch.unbind();
      $_7calf0xhje5nvfel.remove(container);
    };
    var isActive = function () {
      return $_76yst9x3je5nvfde.children(container).length > 0;
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
      $_1r8n3awsje5nvfcd.each(cbs, call);
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
  var $_1sry0m15xje5nvgup = { bounce: bounce };

  var nu$9 = function (baseFn) {
    var get = function (callback) {
      baseFn($_1sry0m15xje5nvgup.bounce(callback));
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
  var $_8ithr915yje5nvgus = {
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
    return $_3smncgy0je5nvfgg.findMap(devices, function (device) {
      return deviceWidth <= device.width && deviceHeight <= device.height ? Option.some(device.keyboard) : Option.none();
    }).getOr({
      portrait: deviceHeight / 5,
      landscape: deviceWidth / 4
    });
  };
  var $_fojcsb161je5nvgvb = { findDevice: findDevice };

  var softKeyboardLimits = function (outerWindow) {
    return $_fojcsb161je5nvgvb.findDevice(outerWindow.screen.width, outerWindow.screen.height);
  };
  var accountableKeyboardHeight = function (outerWindow) {
    var portrait = $_9ew02y13wje5nvggw.get(outerWindow).isPortrait();
    var limits = softKeyboardLimits(outerWindow);
    var keyboard = portrait ? limits.portrait : limits.landscape;
    var visualScreenHeight = portrait ? outerWindow.screen.height : outerWindow.screen.width;
    return visualScreenHeight - outerWindow.innerHeight > keyboard ? 0 : keyboard;
  };
  var getGreenzone = function (socket, dropup) {
    var outerWindow = $_76yst9x3je5nvfde.owner(socket).dom().defaultView;
    var viewportHeight = $_b3c24w102je5nvfpc.get(socket) + $_b3c24w102je5nvfpc.get(dropup);
    var acc = accountableKeyboardHeight(outerWindow);
    return viewportHeight - acc;
  };
  var updatePadding = function (contentBody, socket, dropup) {
    var greenzoneHeight = getGreenzone(socket, dropup);
    var deltaHeight = $_b3c24w102je5nvfpc.get(socket) + $_b3c24w102je5nvfpc.get(dropup) - greenzoneHeight;
    $_98elm5103je5nvfpe.set(contentBody, 'padding-bottom', deltaHeight + 'px');
  };
  var $_8id9xl160je5nvgv7 = {
    getGreenzone: getGreenzone,
    updatePadding: updatePadding
  };

  var fixture = $_dj88xixwje5nvfg0.generate([
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
  var yFixedData = 'data-' + $_1a91a2zeje5nvfmm.resolve('position-y-fixed');
  var yFixedProperty = 'data-' + $_1a91a2zeje5nvfmm.resolve('y-property');
  var yScrollingData = 'data-' + $_1a91a2zeje5nvfmm.resolve('scrolling');
  var windowSizeData = 'data-' + $_1a91a2zeje5nvfmm.resolve('last-window-height');
  var getYFixedData = function (element) {
    return $_2hbjs2147je5nvgiw.safeParse(element, yFixedData);
  };
  var getYFixedProperty = function (element) {
    return $_awg6i3xrje5nvffg.get(element, yFixedProperty);
  };
  var getLastWindowSize = function (element) {
    return $_2hbjs2147je5nvgiw.safeParse(element, windowSizeData);
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
    var classifier = $_awg6i3xrje5nvffg.get(element, yScrollingData) === 'true' ? classifyScrolling : classifyFixed;
    return classifier(element, offsetY);
  };
  var findFixtures = function (container) {
    var candidates = $_8xqdn0zvje5nvfot.descendants(container, '[' + yFixedData + ']');
    return $_1r8n3awsje5nvfcd.map(candidates, classify);
  };
  var takeoverToolbar = function (toolbar) {
    var oldToolbarStyle = $_awg6i3xrje5nvffg.get(toolbar, 'style');
    $_98elm5103je5nvfpe.setAll(toolbar, {
      position: 'absolute',
      top: '0px'
    });
    $_awg6i3xrje5nvffg.set(toolbar, yFixedData, '0px');
    $_awg6i3xrje5nvffg.set(toolbar, yFixedProperty, 'top');
    var restore = function () {
      $_awg6i3xrje5nvffg.set(toolbar, 'style', oldToolbarStyle || '');
      $_awg6i3xrje5nvffg.remove(toolbar, yFixedData);
      $_awg6i3xrje5nvffg.remove(toolbar, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverViewport = function (toolbarHeight, height, viewport) {
    var oldViewportStyle = $_awg6i3xrje5nvffg.get(viewport, 'style');
    $_8zn2oa13uje5nvggi.register(viewport);
    $_98elm5103je5nvfpe.setAll(viewport, {
      position: 'absolute',
      height: height + 'px',
      width: '100%',
      top: toolbarHeight + 'px'
    });
    $_awg6i3xrje5nvffg.set(viewport, yFixedData, toolbarHeight + 'px');
    $_awg6i3xrje5nvffg.set(viewport, yScrollingData, 'true');
    $_awg6i3xrje5nvffg.set(viewport, yFixedProperty, 'top');
    var restore = function () {
      $_8zn2oa13uje5nvggi.deregister(viewport);
      $_awg6i3xrje5nvffg.set(viewport, 'style', oldViewportStyle || '');
      $_awg6i3xrje5nvffg.remove(viewport, yFixedData);
      $_awg6i3xrje5nvffg.remove(viewport, yScrollingData);
      $_awg6i3xrje5nvffg.remove(viewport, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverDropup = function (dropup, toolbarHeight, viewportHeight) {
    var oldDropupStyle = $_awg6i3xrje5nvffg.get(dropup, 'style');
    $_98elm5103je5nvfpe.setAll(dropup, {
      position: 'absolute',
      bottom: '0px'
    });
    $_awg6i3xrje5nvffg.set(dropup, yFixedData, '0px');
    $_awg6i3xrje5nvffg.set(dropup, yFixedProperty, 'bottom');
    var restore = function () {
      $_awg6i3xrje5nvffg.set(dropup, 'style', oldDropupStyle || '');
      $_awg6i3xrje5nvffg.remove(dropup, yFixedData);
      $_awg6i3xrje5nvffg.remove(dropup, yFixedProperty);
    };
    return { restore: restore };
  };
  var deriveViewportHeight = function (viewport, toolbarHeight, dropupHeight) {
    var outerWindow = $_76yst9x3je5nvfde.owner(viewport).dom().defaultView;
    var winH = outerWindow.innerHeight;
    $_awg6i3xrje5nvffg.set(viewport, windowSizeData, winH + 'px');
    return winH - toolbarHeight - dropupHeight;
  };
  var takeover$1 = function (viewport, contentBody, toolbar, dropup) {
    var outerWindow = $_76yst9x3je5nvfde.owner(viewport).dom().defaultView;
    var toolbarSetup = takeoverToolbar(toolbar);
    var toolbarHeight = $_b3c24w102je5nvfpc.get(toolbar);
    var dropupHeight = $_b3c24w102je5nvfpc.get(dropup);
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
        var newToolbarHeight = $_b3c24w102je5nvfpc.get(toolbar);
        var dropupHeight_1 = $_b3c24w102je5nvfpc.get(dropup);
        var newHeight = deriveViewportHeight(viewport, newToolbarHeight, dropupHeight_1);
        $_awg6i3xrje5nvffg.set(viewport, yFixedData, newToolbarHeight + 'px');
        $_98elm5103je5nvfpe.set(viewport, 'height', newHeight + 'px');
        $_98elm5103je5nvfpe.set(dropup, 'bottom', -(newToolbarHeight + newHeight + dropupHeight_1) + 'px');
        $_8id9xl160je5nvgv7.updatePadding(contentBody, viewport, dropup);
      }
    };
    var setViewportOffset = function (newYOffset) {
      var offsetPx = newYOffset + 'px';
      $_awg6i3xrje5nvffg.set(viewport, yFixedData, offsetPx);
      refresh();
    };
    $_8id9xl160je5nvgv7.updatePadding(contentBody, viewport, dropup);
    return {
      setViewportOffset: setViewportOffset,
      isExpanding: isExpanding,
      isShrinking: $_fw94akwjje5nvfbr.not(isExpanding),
      refresh: refresh,
      restore: restore
    };
  };
  var $_25idpw15zje5nvguv = {
    findFixtures: findFixtures,
    takeover: takeover$1,
    getYFixedData: getYFixedData
  };

  var animator = $_8ithr915yje5nvgus.create();
  var ANIMATION_STEP = 15;
  var NUM_TOP_ANIMATION_FRAMES = 10;
  var ANIMATION_RATE = 10;
  var lastScroll = 'data-' + $_1a91a2zeje5nvfmm.resolve('last-scroll-top');
  var getTop = function (element) {
    var raw = $_98elm5103je5nvfpe.getRaw(element, 'top').getOr(0);
    return parseInt(raw, 10);
  };
  var getScrollTop = function (element) {
    return parseInt(element.dom().scrollTop, 10);
  };
  var moveScrollAndTop = function (element, destination, finalTop) {
    return Future.nu(function (callback) {
      var getCurrent = $_fw94akwjje5nvfbr.curry(getScrollTop, element);
      var update = function (newScroll) {
        element.dom().scrollTop = newScroll;
        $_98elm5103je5nvfpe.set(element, 'top', getTop(element) + ANIMATION_STEP + 'px');
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_98elm5103je5nvfpe.set(element, 'top', finalTop + 'px');
        callback(destination);
      };
      animator.animate(getCurrent, destination, ANIMATION_STEP, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyScroll = function (element, destination) {
    return Future.nu(function (callback) {
      var getCurrent = $_fw94akwjje5nvfbr.curry(getScrollTop, element);
      $_awg6i3xrje5nvffg.set(element, lastScroll, getCurrent());
      var update = function (newScroll, abort) {
        var previous = $_2hbjs2147je5nvgiw.safeParse(element, lastScroll);
        if (previous !== element.dom().scrollTop) {
          abort(element.dom().scrollTop);
        } else {
          element.dom().scrollTop = newScroll;
          $_awg6i3xrje5nvffg.set(element, lastScroll, newScroll);
        }
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_awg6i3xrje5nvffg.set(element, lastScroll, destination);
        callback(destination);
      };
      var distance = Math.abs(destination - getCurrent());
      var step = Math.ceil(distance / NUM_TOP_ANIMATION_FRAMES);
      animator.animate(getCurrent, destination, step, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyTop = function (element, destination) {
    return Future.nu(function (callback) {
      var getCurrent = $_fw94akwjje5nvfbr.curry(getTop, element);
      var update = function (newTop) {
        $_98elm5103je5nvfpe.set(element, 'top', newTop + 'px');
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
    var newTop = amount + $_25idpw15zje5nvguv.getYFixedData(element) + 'px';
    $_98elm5103je5nvfpe.set(element, 'top', newTop);
  };
  var moveWindowScroll = function (toolbar, viewport, destY) {
    var outerWindow = $_76yst9x3je5nvfde.owner(toolbar).dom().defaultView;
    return Future.nu(function (callback) {
      updateTop(toolbar, destY);
      updateTop(viewport, destY);
      outerWindow.scrollTo(0, destY);
      callback(destY);
    });
  };
  var $_6zkitz15uje5nvgua = {
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
    var greenzone = $_8id9xl160je5nvgv7.getGreenzone(socket, dropup);
    var refreshCursor = $_fw94akwjje5nvfbr.curry($_6z0acg15qje5nvgt2.refresh, cWin);
    if (top > greenzone || bottom > greenzone) {
      $_6zkitz15uje5nvgua.moveOnlyScroll(socket, socket.dom().scrollTop - greenzone + bottom).get(refreshCursor);
    } else if (top < 0) {
      $_6zkitz15uje5nvgua.moveOnlyScroll(socket, socket.dom().scrollTop + top).get(refreshCursor);
    } else {
    }
  };
  var $_5nyyh163je5nvgvl = { scrollIntoView: scrollIntoView };

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
        $_1r8n3awsje5nvfcd.each(asyncValues, function (asyncValue, i) {
          asyncValue.get(cb(i));
        });
      }
    });
  };
  var $_q2s2n166je5nvgvx = { par: par };

  var par$1 = function (futures) {
    return $_q2s2n166je5nvgvx.par(futures, Future.nu);
  };
  var mapM = function (array, fn) {
    var futures = $_1r8n3awsje5nvfcd.map(array, fn);
    return par$1(futures);
  };
  var compose$1 = function (f, g) {
    return function (a) {
      return g(a).bind(f);
    };
  };
  var $_8o3w3e165je5nvgvu = {
    par: par$1,
    mapM: mapM,
    compose: compose$1
  };

  var updateFixed = function (element, property, winY, offsetY) {
    var destination = winY + offsetY;
    $_98elm5103je5nvfpe.set(element, property, destination + 'px');
    return Future.pure(offsetY);
  };
  var updateScrollingFixed = function (element, winY, offsetY) {
    var destTop = winY + offsetY;
    var oldProp = $_98elm5103je5nvfpe.getRaw(element, 'top').getOr(offsetY);
    var delta = destTop - parseInt(oldProp, 10);
    var destScroll = element.dom().scrollTop + delta;
    return $_6zkitz15uje5nvgua.moveScrollAndTop(element, destScroll, destTop);
  };
  var updateFixture = function (fixture, winY) {
    return fixture.fold(function (element, property, offsetY) {
      return updateFixed(element, property, winY, offsetY);
    }, function (element, offsetY) {
      return updateScrollingFixed(element, winY, offsetY);
    });
  };
  var updatePositions = function (container, winY) {
    var fixtures = $_25idpw15zje5nvguv.findFixtures(container);
    var updates = $_1r8n3awsje5nvfcd.map(fixtures, function (fixture) {
      return updateFixture(fixture, winY);
    });
    return $_8o3w3e165je5nvgvu.par(updates);
  };
  var $_e3cpoo164je5nvgvo = { updatePositions: updatePositions };

  var VIEW_MARGIN = 5;
  var register$2 = function (toolstrip, socket, container, outerWindow, structure, cWin) {
    var scroller = BackgroundActivity(function (y) {
      return $_6zkitz15uje5nvgua.moveWindowScroll(toolstrip, socket, y);
    });
    var scrollBounds = function () {
      var rects = $_ae3vro148je5nvgiy.getRectangles(cWin);
      return Option.from(rects[0]).bind(function (rect) {
        var viewTop = rect.top() - socket.dom().scrollTop;
        var outside = viewTop > outerWindow.innerHeight + VIEW_MARGIN || viewTop < -VIEW_MARGIN;
        return outside ? Option.some({
          top: $_fw94akwjje5nvfbr.constant(viewTop),
          bottom: $_fw94akwjje5nvfbr.constant(viewTop + rect.height())
        }) : Option.none();
      });
    };
    var scrollThrottle = $_6t6egh14wje5nvgmn.last(function () {
      scroller.idle(function () {
        $_e3cpoo164je5nvgvo.updatePositions(container, outerWindow.pageYOffset).get(function () {
          var extraScroll = scrollBounds();
          extraScroll.each(function (extra) {
            socket.dom().scrollTop = socket.dom().scrollTop + extra.top();
          });
          scroller.start(0);
          structure.refresh();
        });
      });
    }, 1000);
    var onScroll = $_9e26js13xje5nvgh3.bind($_4ivu2mxfje5nvfeg.fromDom(outerWindow), 'scroll', function () {
      if (outerWindow.pageYOffset < 0) {
        return;
      }
      scrollThrottle.throttle();
    });
    $_e3cpoo164je5nvgvo.updatePositions(container, outerWindow.pageYOffset).get($_fw94akwjje5nvfbr.identity);
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
    var structure = $_25idpw15zje5nvguv.takeover(socket, ceBody, toolstrip, dropup);
    var keyboardModel = keyboardType(bag.outerBody(), cWin, $_3mo1igxjje5nvfep.body(), contentElement, toolstrip, toolbar);
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
    var onOrientation = $_9ew02y13wje5nvggw.onChange(outerWindow, {
      onChange: $_fw94akwjje5nvfbr.noop,
      onReady: structure.refresh
    });
    onOrientation.onAdjustment(function () {
      structure.refresh();
    });
    var onResize = $_9e26js13xje5nvgh3.bind($_4ivu2mxfje5nvfeg.fromDom(outerWindow), 'resize', function () {
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
      $_5nyyh163je5nvgvl.scrollIntoView(cWin, socket, dropup, top, bottom);
    };
    var syncHeight = function () {
      $_98elm5103je5nvfpe.set(contentElement, 'height', contentElement.dom().contentWindow.document.body.scrollHeight + 'px');
    };
    var setViewportOffset = function (newYOffset) {
      structure.setViewportOffset(newYOffset);
      $_6zkitz15uje5nvgua.moveOnlyTop(socket, newYOffset).get($_fw94akwjje5nvfbr.identity);
    };
    var destroy = function () {
      structure.restore();
      onOrientation.destroy();
      onScroll.unbind();
      onResize.unbind();
      keyboardModel.destroy();
      unfocusedSelection.destroy();
      $_88njxx15oje5nvgsq.input($_3mo1igxjje5nvfep.body(), $_80e37iytje5nvfk6.blur);
    };
    return {
      toEditing: toEditing,
      toReading: toReading,
      onToolbarTouch: onToolbarTouch,
      refreshSelection: refreshSelection,
      clearSelection: clearSelection,
      highlightSelection: highlightSelection,
      scrollIntoView: scrollIntoView,
      updateToolbarPadding: $_fw94akwjje5nvfbr.noop,
      setViewportOffset: setViewportOffset,
      syncHeight: syncHeight,
      refreshStructure: structure.refresh,
      destroy: destroy
    };
  };
  var $_2df8fp15sje5nvgtl = { setup: setup$3 };

  var create$8 = function (platform, mask) {
    var meta = $_1j7jfq14uje5nvgm3.tag();
    var priorState = $_1lzorw12oje5nvg6n.value();
    var scrollEvents = $_1lzorw12oje5nvg6n.value();
    var iosApi = $_1lzorw12oje5nvg6n.api();
    var iosEvents = $_1lzorw12oje5nvg6n.api();
    var enter = function () {
      mask.hide();
      var doc = $_4ivu2mxfje5nvfeg.fromDom(document);
      $_ag6edh14sje5nvglj.getActiveApi(platform.editor).each(function (editorApi) {
        priorState.set({
          socketHeight: $_98elm5103je5nvfpe.getRaw(platform.socket, 'height'),
          iframeHeight: $_98elm5103je5nvfpe.getRaw(editorApi.frame(), 'height'),
          outerScroll: document.body.scrollTop
        });
        scrollEvents.set({ exclusives: $_fp9qvq153je5nvgny.exclusive(doc, '.' + $_8zn2oa13uje5nvggi.scrollable()) });
        $_26dua8ynje5nvfjs.add(platform.container, $_1a91a2zeje5nvfmm.resolve('fullscreen-maximized'));
        $_5xiwz14tje5nvgls.clobberStyles(platform.container, editorApi.body());
        meta.maximize();
        $_98elm5103je5nvfpe.set(platform.socket, 'overflow', 'scroll');
        $_98elm5103je5nvfpe.set(platform.socket, '-webkit-overflow-scrolling', 'touch');
        $_80e37iytje5nvfk6.focus(editorApi.body());
        var setupBag = $_f74ptsx4je5nvfdn.immutableBag([
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
        iosApi.set($_2df8fp15sje5nvgtl.setup(setupBag({
          cWin: editorApi.win(),
          ceBody: editorApi.body(),
          socket: platform.socket,
          toolstrip: platform.toolstrip,
          toolbar: platform.toolbar,
          dropup: platform.dropup.element(),
          contentElement: editorApi.frame(),
          cursor: $_fw94akwjje5nvfbr.noop,
          outerBody: platform.body,
          outerWindow: platform.win,
          keyboardType: $_apbt0u15nje5nvgsj.stubborn,
          isScrolling: function () {
            return scrollEvents.get().exists(function (s) {
              return s.socket.isScrolling();
            });
          }
        })));
        iosApi.run(function (api) {
          api.syncHeight();
        });
        iosEvents.set($_a9o8lh15rje5nvgt6.initEvents(editorApi, iosApi, platform.toolstrip, platform.socket, platform.dropup));
      });
    };
    var exit = function () {
      meta.restore();
      iosEvents.clear();
      iosApi.clear();
      mask.show();
      priorState.on(function (s) {
        s.socketHeight.each(function (h) {
          $_98elm5103je5nvfpe.set(platform.socket, 'height', h);
        });
        s.iframeHeight.each(function (h) {
          $_98elm5103je5nvfpe.set(platform.editor.getFrame(), 'height', h);
        });
        document.body.scrollTop = s.scrollTop;
      });
      priorState.clear();
      scrollEvents.on(function (s) {
        s.exclusives.unbind();
      });
      scrollEvents.clear();
      $_26dua8ynje5nvfjs.remove(platform.container, $_1a91a2zeje5nvfmm.resolve('fullscreen-maximized'));
      $_5xiwz14tje5nvgls.restoreStyles();
      $_8zn2oa13uje5nvggi.deregister(platform.toolbar);
      $_98elm5103je5nvfpe.remove(platform.socket, 'overflow');
      $_98elm5103je5nvfpe.remove(platform.socket, '-webkit-overflow-scrolling');
      $_80e37iytje5nvfk6.blur(platform.editor.getFrame());
      $_ag6edh14sje5nvglj.getActiveApi(platform.editor).each(function (editorApi) {
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
  var $_1v11n815mje5nvgs8 = { create: create$8 };

  var produce$1 = function (raw) {
    var mobile = $_8shw8ryeje5nvfis.asRawOrDie('Getting IosWebapp schema', MobileSchema, raw);
    $_98elm5103je5nvfpe.set(mobile.toolstrip, 'width', '100%');
    $_98elm5103je5nvfpe.set(mobile.container, 'position', 'relative');
    var onView = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_92nfmp12tje5nvg7w.build($_39hyh214vje5nvgme.sketch(onView, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    var mode = $_1v11n815mje5nvgs8.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: mode.refreshStructure,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_fw94akwjje5nvfbr.noop
    };
  };
  var $_axecjf15lje5nvgs3 = { produce: produce$1 };

  function IosRealm (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_1a91a2zeje5nvfmm.resolve('ios-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_1lzorw12oje5nvg6n.api();
    var switchToEdit = $_9e1nmq154je5nvgo4.makeEditSwitch(webapp);
    var socket = $_9e1nmq154je5nvgo4.makeSocket();
    var dropup = $_fhlzpo155je5nvgoe.build(function () {
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
      webapp.set($_axecjf15lje5nvgs3.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        Replacing.remove(socket, switchToEdit);
        w.exit();
      });
    };
    var updateMode = function (readOnly) {
      $_9e1nmq154je5nvgo4.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_fw94akwjje5nvfbr.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_fw94akwjje5nvfbr.constant(socket),
      dropup: $_fw94akwjje5nvfbr.constant(dropup)
    };
  }

  var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');

  var derive$4 = function (editor) {
    var base = $_17met3xsje5nvffn.readOptFrom(editor.settings, 'skin_url').fold(function () {
      return EditorManager.baseURL + '/skins/' + 'lightgray';
    }, function (url) {
      return url;
    });
    return {
      content: base + '/content.mobile.min.css',
      ui: base + '/skin.mobile.min.css'
    };
  };
  var $_96lw2y167je5nvgw0 = { derive: derive$4 };

  var fontSizes = [
    'x-small',
    'small',
    'medium',
    'large',
    'x-large'
  ];
  var fireChange$1 = function (realm, command, state) {
    realm.system().broadcastOn([$_bc0wawz1je5nvfko.formatChanged()], {
      command: command,
      state: state
    });
  };
  var init$5 = function (realm, editor) {
    var allFormats = $_3q4qwfx0je5nvfcy.keys(editor.formatter.get());
    $_1r8n3awsje5nvfcd.each(allFormats, function (command) {
      editor.formatter.formatChanged(command, function (state) {
        fireChange$1(realm, command, state);
      });
    });
    $_1r8n3awsje5nvfcd.each([
      'ul',
      'ol'
    ], function (command) {
      editor.selection.selectorChanged(command, function (state, data) {
        fireChange$1(realm, command, state);
      });
    });
  };
  var $_cpmldj169je5nvgw3 = {
    init: init$5,
    fontSizes: $_fw94akwjje5nvfbr.constant(fontSizes)
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
  var $_5pb0lm16aje5nvgw8 = { fireSkinLoaded: fireSkinLoaded };

  var READING = $_fw94akwjje5nvfbr.constant('toReading');
  var EDITING = $_fw94akwjje5nvfbr.constant('toEditing');
  ThemeManager.add('mobile', function (editor) {
    var renderUI = function (args) {
      var cssUrls = $_96lw2y167je5nvgw0.derive(editor);
      if ($_4s15afz0je5nvfko.isSkinDisabled(editor) === false) {
        editor.contentCSS.push(cssUrls.content);
        DOMUtils.DOM.styleSheetLoader.load(cssUrls.ui, $_5pb0lm16aje5nvgw8.fireSkinLoaded(editor));
      } else {
        $_5pb0lm16aje5nvgw8.fireSkinLoaded(editor)();
      }
      var doScrollIntoView = function () {
        editor.fire('scrollIntoView');
      };
      var wrapper = $_4ivu2mxfje5nvfeg.fromTag('div');
      var realm = $_2m9vcuwkje5nvfbu.detect().os.isAndroid() ? AndroidRealm(doScrollIntoView) : IosRealm(doScrollIntoView);
      var original = $_4ivu2mxfje5nvfeg.fromDom(args.targetNode);
      $_hzekox2je5nvfdc.after(original, wrapper);
      $_fap2yjx1je5nvfd1.attachSystem(wrapper, realm.system());
      var findFocusIn = function (elem) {
        return $_80e37iytje5nvfk6.search(elem).bind(function (focused) {
          return realm.system().getByDom(focused).toOption();
        });
      };
      var outerWindow = args.targetNode.ownerDocument.defaultView;
      var orientation = $_9ew02y13wje5nvggw.onChange(outerWindow, {
        onChange: function () {
          var alloy = realm.system();
          alloy.broadcastOn([$_bc0wawz1je5nvfko.orientationChanged()], { width: $_9ew02y13wje5nvggw.getActualWidth(outerWindow) });
        },
        onReady: $_fw94akwjje5nvfbr.noop
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
              return $_4ivu2mxfje5nvfeg.fromDom(editor.contentAreaContainer.querySelector('iframe'));
            },
            onDomChanged: function () {
              return { unbind: $_fw94akwjje5nvfbr.noop };
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
              var toolbar = $_4ivu2mxfje5nvfeg.fromDom(editor.editorContainer.querySelector('.' + $_1a91a2zeje5nvfmm.resolve('toolbar')));
              findFocusIn(toolbar).each($_an9hm6wgje5nvfbd.emitExecute);
              realm.restoreToolbar();
              hideDropup();
            },
            onTapContent: function (evt) {
              var target = evt.target();
              if ($_3imygaxkje5nvfes.name(target) === 'img') {
                editor.selection.select(target.dom());
                evt.kill();
              } else if ($_3imygaxkje5nvfes.name(target) === 'a') {
                var component = realm.system().getByDom($_4ivu2mxfje5nvfeg.fromDom(editor.editorContainer));
                component.each(function (container) {
                  if (Swapping.isAlpha(container)) {
                    $_h5ncyzje5nvfkm.openLink(target.dom());
                  }
                });
              }
            }
          },
          container: $_4ivu2mxfje5nvfeg.fromDom(editor.editorContainer),
          socket: $_4ivu2mxfje5nvfeg.fromDom(editor.contentAreaContainer),
          toolstrip: $_4ivu2mxfje5nvfeg.fromDom(editor.editorContainer.querySelector('.' + $_1a91a2zeje5nvfmm.resolve('toolstrip'))),
          toolbar: $_4ivu2mxfje5nvfeg.fromDom(editor.editorContainer.querySelector('.' + $_1a91a2zeje5nvfmm.resolve('toolbar'))),
          dropup: realm.dropup(),
          alloy: realm.system(),
          translate: $_fw94akwjje5nvfbr.noop,
          setReadOnly: function (ro) {
            setReadOnly(readOnlyGroups, mainGroups, ro);
          }
        });
        var hideDropup = function () {
          realm.dropup().disappear(function () {
            realm.system().broadcastOn([$_bc0wawz1je5nvfko.dropupDismissed()], {});
          });
        };
        $_fj5lx3xlje5nvfeu.registerInspector('remove this', realm.system());
        var backToMaskGroup = {
          label: 'The first group',
          scrollable: false,
          items: [$_5x6kkvzfje5nvfmo.forToolbar('back', function () {
              editor.selection.collapse();
              realm.exit();
            }, {})]
        };
        var backToReadOnlyGroup = {
          label: 'Back to read only',
          scrollable: false,
          items: [$_5x6kkvzfje5nvfmo.forToolbar('readonly-back', function () {
              setReadOnly(readOnlyGroups, mainGroups, true);
            }, {})]
        };
        var readOnlyGroup = {
          label: 'The read only mode group',
          scrollable: true,
          items: []
        };
        var features = $_565wguz2je5nvfkr.setup(realm, editor);
        var items = $_565wguz2je5nvfkr.detect(editor.settings, features);
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
        $_cpmldj169je5nvgw3.init(realm, editor);
      });
      return {
        iframeContainer: realm.socket().element().dom(),
        editorContainer: realm.element().dom()
      };
    };
    return {
      getNotificationManagerImpl: function () {
        return {
          open: $_fw94akwjje5nvfbr.identity,
          close: $_fw94akwjje5nvfbr.noop,
          reposition: $_fw94akwjje5nvfbr.noop,
          getArgs: $_fw94akwjje5nvfbr.identity
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
