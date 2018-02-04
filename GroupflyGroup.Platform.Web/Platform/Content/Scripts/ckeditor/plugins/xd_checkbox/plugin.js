/**
 * 单行输入框插件
 * @author tony
 */
CKEDITOR.plugins.add('xd_checkbox',
{
	init : function( editor )
	{
		var pluginName = 'xd_checkbox';
		editor.addCommand(pluginName,new CKEDITOR.dialogCommand(pluginName));
		editor.ui.addButton('xd_checkbox',{
											label:'复选框',
											command:pluginName
										});
		
		CKEDITOR.dialog.add(pluginName,this.path + 'dialogs/xd_checkbox.js');
	}
});
