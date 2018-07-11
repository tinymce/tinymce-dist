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
  var $_56x9cza2jjgw5lcq = {
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
  var $_7z3eoaa4jjgw5lcs = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_56x9cza2jjgw5lcq.getMinWidth(editor);
    var minHeight = $_56x9cza2jjgw5lcq.getMinHeight(editor);
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
        $_7z3eoaa4jjgw5lcs.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_7z3eoaa4jjgw5lcs.getContent(editor));
  };
  var $_9oni75a1jjgw5lco = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_9oni75a1jjgw5lco.open(editor);
    });
  };
  var $_eqhz8ba0jjgw5lcm = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_9oni75a1jjgw5lco.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_9oni75a1jjgw5lco.open(editor);
      }
    });
  };
  var $_vk2wza5jjgw5lcu = { register: register$1 };

  global.add('code', function (editor) {
    $_eqhz8ba0jjgw5lcm.register(editor);
    $_vk2wza5jjgw5lcu.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
