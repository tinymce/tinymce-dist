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
  var $_eflgpxa2jkmcduho = {
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
  var $_8flteaa4jkmcduhr = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_eflgpxa2jkmcduho.getMinWidth(editor);
    var minHeight = $_eflgpxa2jkmcduho.getMinHeight(editor);
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
        $_8flteaa4jkmcduhr.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_8flteaa4jkmcduhr.getContent(editor));
  };
  var $_1t3809a1jkmcduhn = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_1t3809a1jkmcduhn.open(editor);
    });
  };
  var $_471po0a0jkmcduhm = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_1t3809a1jkmcduhn.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_1t3809a1jkmcduhn.open(editor);
      }
    });
  };
  var $_4pay2da5jkmcduhs = { register: register$1 };

  global.add('code', function (editor) {
    $_471po0a0jkmcduhm.register(editor);
    $_4pay2da5jkmcduhs.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
