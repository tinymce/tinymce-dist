(function () {
var hr = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_bx06y5cnjjgw5lpl = { register: register };

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
  var $_36rarxcojjgw5lpm = { register: register$1 };

  global.add('hr', function (editor) {
    $_bx06y5cnjjgw5lpl.register(editor);
    $_36rarxcojjgw5lpm.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
