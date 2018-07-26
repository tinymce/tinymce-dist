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
  var $_3fp80ea2jk26ig9s = {
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
  var $_6a0rcfa4jk26ig9t = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_3fp80ea2jk26ig9s.getMinWidth(editor);
    var minHeight = $_3fp80ea2jk26ig9s.getMinHeight(editor);
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
        $_6a0rcfa4jk26ig9t.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_6a0rcfa4jk26ig9t.getContent(editor));
  };
  var $_a3eu6ka1jk26ig9q = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_a3eu6ka1jk26ig9q.open(editor);
    });
  };
  var $_dqdf37a0jk26ig9p = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_a3eu6ka1jk26ig9q.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_a3eu6ka1jk26ig9q.open(editor);
      }
    });
  };
  var $_8leynxa5jk26ig9u = { register: register$1 };

  global.add('code', function (editor) {
    $_dqdf37a0jk26ig9p.register(editor);
    $_8leynxa5jk26ig9u.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
