(function () {
var visualblocks = (function () {
  'use strict';

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

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var fireVisualBlocks = function (editor, state) {
    editor.fire('VisualBlocks', { state: state });
  };
  var $_9u3n18qtjd08mfh4 = { fireVisualBlocks: fireVisualBlocks };

  var isEnabledByDefault = function (editor) {
    return editor.getParam('visualblocks_default_state', false);
  };
  var getContentCss = function (editor) {
    return editor.settings.visualblocks_content_css;
  };
  var $_eo79a8qujd08mfha = {
    isEnabledByDefault: isEnabledByDefault,
    getContentCss: getContentCss
  };

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var cssId = DOMUtils.DOM.uniqueId();
  var load = function (doc, url) {
    var linkElements = Tools.toArray(doc.getElementsByTagName('link'));
    var matchingLinkElms = Tools.grep(linkElements, function (head) {
      return head.id === cssId;
    });
    if (matchingLinkElms.length === 0) {
      var linkElm = DOMUtils.DOM.create('link', {
        id: cssId,
        rel: 'stylesheet',
        href: url
      });
      doc.getElementsByTagName('head')[0].appendChild(linkElm);
    }
  };
  var $_41bvurqvjd08mfhc = { load: load };

  var toggleVisualBlocks = function (editor, pluginUrl, enabledState) {
    var dom = editor.dom;
    var contentCss = $_eo79a8qujd08mfha.getContentCss(editor);
    $_41bvurqvjd08mfhc.load(editor.getDoc(), contentCss ? contentCss : pluginUrl + '/css/visualblocks.css');
    dom.toggleClass(editor.getBody(), 'mce-visualblocks');
    enabledState.set(!enabledState.get());
    $_9u3n18qtjd08mfh4.fireVisualBlocks(editor, enabledState.get());
  };
  var $_1n58g6qsjd08mfh2 = { toggleVisualBlocks: toggleVisualBlocks };

  var register = function (editor, pluginUrl, enabledState) {
    editor.addCommand('mceVisualBlocks', function () {
      $_1n58g6qsjd08mfh2.toggleVisualBlocks(editor, pluginUrl, enabledState);
    });
  };
  var $_7rhs1pqrjd08mfgx = { register: register };

  var setup = function (editor, pluginUrl, enabledState) {
    editor.on('PreviewFormats AfterPreviewFormats', function (e) {
      if (enabledState.get()) {
        editor.dom.toggleClass(editor.getBody(), 'mce-visualblocks', e.type === 'afterpreviewformats');
      }
    });
    editor.on('init', function () {
      if ($_eo79a8qujd08mfha.isEnabledByDefault(editor)) {
        $_1n58g6qsjd08mfh2.toggleVisualBlocks(editor, pluginUrl, enabledState);
      }
    });
    editor.on('remove', function () {
      editor.dom.removeClass(editor.getBody(), 'mce-visualblocks');
    });
  };
  var $_1wotzvqyjd08mfhf = { setup: setup };

  var toggleActiveState = function (editor, enabledState) {
    return function (e) {
      var ctrl = e.control;
      ctrl.active(enabledState.get());
      editor.on('VisualBlocks', function (e) {
        ctrl.active(e.state);
      });
    };
  };
  var register$1 = function (editor, enabledState) {
    editor.addButton('visualblocks', {
      active: false,
      title: 'Show blocks',
      cmd: 'mceVisualBlocks',
      onPostRender: toggleActiveState(editor, enabledState)
    });
    editor.addMenuItem('visualblocks', {
      text: 'Show blocks',
      cmd: 'mceVisualBlocks',
      onPostRender: toggleActiveState(editor, enabledState),
      selectable: true,
      context: 'view',
      prependToContext: true
    });
  };
  var $_bpg57xqzjd08mfhg = { register: register$1 };

  PluginManager.add('visualblocks', function (editor, pluginUrl) {
    var enabledState = Cell(false);
    $_7rhs1pqrjd08mfgx.register(editor, pluginUrl, enabledState);
    $_bpg57xqzjd08mfhg.register(editor, enabledState);
    $_1wotzvqyjd08mfhf.setup(editor, pluginUrl, enabledState);
  });
  function Plugin () {
  }

  return Plugin;

}());
})()
