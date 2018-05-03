(function () {
var hr = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_6tro91c7jgqkptlu = { register: register };

  var register$1 = function (editor) {
    editor.addButton('hr', {
      icon: 'hr',
      tooltip: 'Horizontal line',
      cmd: 'InsertHorizontalRule'
    });
    editor.addMenuItem('hr', {
      icon: 'hr',
      text: 'Horizontal line',
      cmd: 'InsertHorizontalRule',
      context: 'insert'
    });
  };
  var $_a6mihvc8jgqkptlw = { register: register$1 };

  global.add('hr', function (editor) {
    $_6tro91c7jgqkptlu.register(editor);
    $_a6mihvc8jgqkptlw.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
