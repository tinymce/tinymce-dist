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
  var $_18cpqd9ojgqkpt8v = {
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
  var $_6zhgce9qjgqkpt8x = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_18cpqd9ojgqkpt8v.getMinWidth(editor);
    var minHeight = $_18cpqd9ojgqkpt8v.getMinHeight(editor);
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
        $_6zhgce9qjgqkpt8x.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_6zhgce9qjgqkpt8x.getContent(editor));
  };
  var $_g2zeqn9njgqkpt8t = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_g2zeqn9njgqkpt8t.open(editor);
    });
  };
  var $_870xkp9mjgqkpt8r = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_g2zeqn9njgqkpt8t.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_g2zeqn9njgqkpt8t.open(editor);
      }
    });
  };
  var $_axnw3s9rjgqkpt8z = { register: register$1 };

  global.add('code', function (editor) {
    $_870xkp9mjgqkpt8r.register(editor);
    $_axnw3s9rjgqkpt8z.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
