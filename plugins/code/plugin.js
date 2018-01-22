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
  var $_7c3dku91jcq86i25 = {
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
  var $_7rbjcx93jcq86i26 = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_7c3dku91jcq86i25.getMinWidth(editor);
    var minHeight = $_7c3dku91jcq86i25.getMinHeight(editor);
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
        $_7rbjcx93jcq86i26.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_7rbjcx93jcq86i26.getContent(editor));
  };
  var $_alw2xe90jcq86i24 = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_alw2xe90jcq86i24.open(editor);
    });
  };
  var $_6iwd6j8zjcq86i23 = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_alw2xe90jcq86i24.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_alw2xe90jcq86i24.open(editor);
      }
    });
  };
  var $_28lr9v94jcq86i27 = { register: register$1 };

  PluginManager.add('code', function (editor) {
    $_6iwd6j8zjcq86i23.register(editor);
    $_28lr9v94jcq86i27.register(editor);
    return {};
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
