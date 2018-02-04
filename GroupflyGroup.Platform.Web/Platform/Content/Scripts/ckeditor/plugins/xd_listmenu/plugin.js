/**
 * 单行输入框插件
 * @author tony
 */
CKEDITOR.plugins.add('xd_listmenu',
{
	init : function( editor )
	{
		var pluginName = 'xd_listmenu';
		editor.addCommand(pluginName,new CKEDITOR.dialogCommand(pluginName));
		editor.ui.addButton('xd_listmenu',{
											label:'多行输入框',
											command:pluginName
										});
		
		CKEDITOR.dialog.add(pluginName,this.path + 'dialogs/xd_listmenu.js');
	}
});
