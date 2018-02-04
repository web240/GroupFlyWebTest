/**
 * 讯点表单设计器   流式布局
 * author tony 2012-08-14
 */



//(function () {
//    //Section 1 : 按下自定义按钮时执行的代码 
//   ,
//    //Section 2 : 创建自定义按钮、绑定方法 
//    b = 'linkbutton';
//    CKEDITOR.plugins.add(b, {
//        init: function (editor) {
//            editor.addCommand(b, a);
//            editor.ui.addButton('linkbutton', {
//                label: 'Link Button',
//                icon: this.path + 'flow.gif',
//                command: b
//            });
//        }
//    });
//})();



//(function () {
//    //Section 1 : 按下自定义按钮时执行的代码 
//    var a = {
//        exec: function (editor) {
//            alert("这是自定义按钮");
//        }
//    },
//    //Section 2 : 创建自定义按钮、绑定方法 
//    b = 'linkbutton';
//    CKEDITOR.plugins.add(b, {
//        init: function (editor) {
//            var pluginName = 'xd_flow';
//            editor.addCommand(pluginName, a);
//            editor.ui.addButton(pluginName, {
//                label: 'Link Button',
//                icon: CKEDITOR.plugins.getPath(pluginName) + 'flow.gif',
//                command: b
//            });
//        }
//    });
//})();



var a = {
    exec: function (editor) {
        //alert("这是自定义按钮");
        debugger;


        //CKEDITOR.replace('editor1',
        //{
        //    toolbar:
        //    [
        //        ['Styles', 'Format'],
        //        ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', '-', 'About']
        //    ]
        //});


        CKEDITOR.editorConfig = function( config ) {  
        
            editor.toolbar =  [['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'],
              ['TextColor', 'BGColor', 'HelloWorld']];
        };

        

        //editor.toolbar = "CustomerForm";
        //editor.toolbar_CustomerForm = [['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'],
        //         ['TextColor', 'BGColor', 'HelloWorld']];

        //editor.toolbar =  [['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'],
          //  ['TextColor', 'BGColor', 'HelloWorld']];

        //CKEDITOR.replace(editor.name, {
        //        language: 'zh-cn',//简体中文   
        //        width: 610,                                        //宽度
        //        height: 340                                           //高度
        //        //toolbar://工具栏设置               随便取舍
        //        //[
        //        //['Source', 'Maximize', '-', 'Save', 'NewPage', 'Preview', '-', 'Templates'],
        //        //['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord'],
        //        //['Undo', 'Redo', '-', 'Find', 'Replace', '-', , 'Table', 'HorizontalRule', '-', 'SelectAll', 'RemoveFormat'],
        //        //'/',
        //        //['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
        //        //['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
        //        //['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        //        //['Link', 'Unlink', 'Anchor'],
        //        //['Image', 'Flash', 'Smiley', 'SpecialChar', 'PageBreak'],
        //        //['Styles', 'Format', 'Font', 'FontSize'],
        //        //['TextColor', 'BGColor']
        //        //]
        //    });
        


        //CKEDITOR.on('instanceReady', function (ev) { ev.editor.execCommand('toolbarCollapse'); });

        ////editor.insertHtml("");
        //if (editor.readOnly == false) {
        //    editor.setReadOnly("readonly", "readonly");
        //    editor.insertHtml("");
        //} else
        //    if (editor.readOnly == "readonly") {
        //        editor.setReadOnly("readonly", false);
        //    }
        //CKEDITOR.instances['content'].setReadOnly("readonly", "readonly");
    }
}


CKEDITOR.plugins.add('xd_flow',{
	init : function(editor){
		var pluginName = 'xd_flow';
		
		editor.addCommand(pluginName, a);
		editor.ui.addButton(pluginName,{
											label:'流失布局',
											command:pluginName,
											icon: CKEDITOR.plugins.getPath(pluginName) + 'flow.gif'
										});
		
		//CKEDITOR.dialog.add(pluginName,this.path + 'dialogs/xd_flow.js');

	}
});