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
  var $_2tza3v9ajducwqlw = {
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
  var $_19ekt49cjducwqlx = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_2tza3v9ajducwqlw.getMinWidth(editor);
    var minHeight = $_2tza3v9ajducwqlw.getMinHeight(editor);
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
        $_19ekt49cjducwqlx.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_19ekt49cjducwqlx.getContent(editor));
  };
  var $_db57nb99jducwqlv = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_db57nb99jducwqlv.open(editor);
    });
  };
  var $_ffhlfw98jducwqlt = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_db57nb99jducwqlv.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_db57nb99jducwqlv.open(editor);
      }
    });
  };
  var $_9yxf8n9djducwqlz = { register: register$1 };

  PluginManager.add('code', function (editor) {
    $_ffhlfw98jducwqlt.register(editor);
    $_9yxf8n9djducwqlz.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
