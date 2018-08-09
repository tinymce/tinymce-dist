(function () {
var hr = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_agtgdrcnjkmcdux2 = { register: register };

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
  var $_4c3f2acojkmcdux3 = { register: register$1 };

  global.add('hr', function (editor) {
    $_agtgdrcnjkmcdux2.register(editor);
    $_4c3f2acojkmcdux3.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
