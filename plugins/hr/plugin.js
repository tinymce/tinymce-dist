(function () {
var hr = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_9evne2bjjcq86ibu = { register: register };

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
  var $_f0yufybkjcq86ibv = { register: register$1 };

  PluginManager.add('hr', function (editor) {
    $_9evne2bjjcq86ibu.register(editor);
    $_f0yufybkjcq86ibv.register(editor);
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
