(function () {
var code = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var getMinWidth = function (editor) {
    return editor.getParam('code_dialog_width', 600);
  };
  var getMinHeight = function (editor) {
    return editor.getParam('code_dialog_height', Math.min(DOMUtils.DOM.getViewPort().h - 200, 500));
  };
  var $_1786od9aje4c0fu9 = {
    getMinWidth: getMinWidth,
    getMinHeight: getMinHeight
  };

  var setContent = function (editor, html) {
    editor.focus();
    editor.undoManager.transact(function () {
      editor.setContent(html);
    });
    editor.selection.setCursorLocation();
    editor.nodeChanged();
  };
  var getContent = function (editor) {
    return editor.getContent({ source_view: true });
  };
  var $_6s2j4v9cje4c0fub = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_1786od9aje4c0fu9.getMinWidth(editor);
    var minHeight = $_1786od9aje4c0fu9.getMinHeight(editor);
    var win = editor.windowManager.open({
      title: 'Source code',
      body: {
        type: 'textbox',
        name: 'code',
        multiline: true,
        minWidth: minWidth,
        minHeight: minHeight,
        spellcheck: false,
        style: 'direction: ltr; text-align: left'
      },
      onSubmit: function (e) {
        $_6s2j4v9cje4c0fub.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_6s2j4v9cje4c0fub.getContent(editor));
  };
  var $_28hg7h99je4c0fu6 = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_28hg7h99je4c0fu6.open(editor);
    });
  };
  var $_bxey4z98je4c0fu3 = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_28hg7h99je4c0fu6.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_28hg7h99je4c0fu6.open(editor);
      }
    });
  };
  var $_1hfkwa9dje4c0fuc = { register: register$1 };

  PluginManager.add('code', function (editor) {
    $_bxey4z98je4c0fu3.register(editor);
    $_1hfkwa9dje4c0fuc.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
