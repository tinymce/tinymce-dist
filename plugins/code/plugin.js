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
  var $_1rtjn491jd08mcd3 = {
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
  var $_7aor5l93jd08mcd4 = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_1rtjn491jd08mcd3.getMinWidth(editor);
    var minHeight = $_1rtjn491jd08mcd3.getMinHeight(editor);
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
        $_7aor5l93jd08mcd4.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_7aor5l93jd08mcd4.getContent(editor));
  };
  var $_bxutnt90jd08mcd2 = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_bxutnt90jd08mcd2.open(editor);
    });
  };
  var $_3u5z508zjd08mcd1 = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_bxutnt90jd08mcd2.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_bxutnt90jd08mcd2.open(editor);
      }
    });
  };
  var $_rija594jd08mcd5 = { register: register$1 };

  PluginManager.add('code', function (editor) {
    $_3u5z508zjd08mcd1.register(editor);
    $_rija594jd08mcd5.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})()
