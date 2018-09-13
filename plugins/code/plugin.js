(function () {
var code = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var getMinWidth = function (editor) {
    return editor.getParam('code_dialog_width', 600);
  };
  var getMinHeight = function (editor) {
    return editor.getParam('code_dialog_height', Math.min(global$1.DOM.getViewPort().h - 200, 500));
  };
  var $_6gtem7a1jm0o6au5 = {
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
  var $_d7h09ta3jm0o6au7 = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_6gtem7a1jm0o6au5.getMinWidth(editor);
    var minHeight = $_6gtem7a1jm0o6au5.getMinHeight(editor);
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
        $_d7h09ta3jm0o6au7.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_d7h09ta3jm0o6au7.getContent(editor));
  };
  var $_7ki18ua0jm0o6au4 = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_7ki18ua0jm0o6au4.open(editor);
    });
  };
  var $_c01p2k9zjm0o6au3 = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_7ki18ua0jm0o6au4.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_7ki18ua0jm0o6au4.open(editor);
      }
    });
  };
  var $_1geckda4jm0o6au8 = { register: register$1 };

  global.add('code', function (editor) {
    $_c01p2k9zjm0o6au3.register(editor);
    $_1geckda4jm0o6au8.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
