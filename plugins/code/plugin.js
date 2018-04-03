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
  var $_6kzowa9ejfjlpcds = {
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
  var $_4rlu2x9gjfjlpcdt = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_6kzowa9ejfjlpcds.getMinWidth(editor);
    var minHeight = $_6kzowa9ejfjlpcds.getMinHeight(editor);
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
        $_4rlu2x9gjfjlpcdt.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_4rlu2x9gjfjlpcdt.getContent(editor));
  };
  var $_4hd5js9djfjlpcdr = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_4hd5js9djfjlpcdr.open(editor);
    });
  };
  var $_eq2dx19cjfjlpcdq = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_4hd5js9djfjlpcdr.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_4hd5js9djfjlpcdr.open(editor);
      }
    });
  };
  var $_a8kh0w9hjfjlpcdu = { register: register$1 };

  global.add('code', function (editor) {
    $_eq2dx19cjfjlpcdq.register(editor);
    $_a8kh0w9hjfjlpcdu.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
