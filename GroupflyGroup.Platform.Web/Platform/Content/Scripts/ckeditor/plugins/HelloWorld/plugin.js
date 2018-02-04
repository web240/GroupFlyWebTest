 (function() {

CKEDITOR.plugins.add('HelloWorld', {
    init: function (editor) {
        var pluginName = 'HelloWorld';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/HelloWorld.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton(pluginName,
        {
            label: 'Hello',
            command: pluginName,
            icon: this.path + 'images/hello.png'
        });
    }
});


//CKEDITOR.ui.button = function (definition) {
//    // Copy all definition properties to this object.
//    CKEDITOR.tools.extend(this, definition,
//        // Set defaults.
//        {
//            title: definition.label,
//            className: definition.className || (definition.command && 'cke_button_' + definition.command) || '',
//            click: definition.click || function (editor) {
//                editor.execCommand(definition.command);
//            }
//        });

//    this._ = {};
//};



})();