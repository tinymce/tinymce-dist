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
  var $_bdsc1g9aje5nvbkf = {
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
  var $_87my539cje5nvbkg = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_bdsc1g9aje5nvbkf.getMinWidth(editor);
    var minHeight = $_bdsc1g9aje5nvbkf.getMinHeight(editor);
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
        $_87my539cje5nvbkg.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_87my539cje5nvbkg.getContent(editor));
  };
  var $_agyp9q99je5nvbke = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_agyp9q99je5nvbke.open(editor);
    });
  };
  var $_9tzgyf98je5nvbkd = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_agyp9q99je5nvbke.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_agyp9q99je5nvbke.open(editor);
      }
    });
  };
  var $_e0a13c9dje5nvbkh = { register: register$1 };

  PluginManager.add('code', function (editor) {
    $_9tzgyf98je5nvbkd.register(editor);
    $_e0a13c9dje5nvbkh.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
