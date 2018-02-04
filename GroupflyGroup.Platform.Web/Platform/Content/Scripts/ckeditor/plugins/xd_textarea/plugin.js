/**
 * 单行输入框插件
 * @author tony
 */
CKEDITOR.plugins.add('xd_textarea',
{
	init : function( editor )
	{
		var pluginName = 'xd_textarea';
		editor.addCommand(pluginName,new CKEDITOR.dialogCommand(pluginName));
		editor.ui.addButton('xd_textarea',{
											label:'多行输入框',
											command:pluginName
										});
		
		CKEDITOR.dialog.add(pluginName,this.path + 'dialogs/xd_textarea.js');
	}
});
