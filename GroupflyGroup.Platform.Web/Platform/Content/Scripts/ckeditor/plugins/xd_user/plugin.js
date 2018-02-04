/**
 * 讯点表单设计器   用户部门控件
 * author tony 2012-08-14
 */

CKEDITOR.plugins.add('xd_user',{
	init : function(editor){
		var pluginName = 'xd_user';
		
		editor.addCommand(pluginName,new CKEDITOR.dialogCommand(pluginName));
		editor.ui.addButton(pluginName,{
											label:'用户部门控件',
											command:pluginName,
											icon : CKEDITOR.plugins.getPath(pluginName) + 'user.gif'
										});
		
		CKEDITOR.dialog.add(pluginName,this.path + 'dialogs/xd_user.js');
		
		if ( editor.addMenuItems )
		{
			editor.addMenuItems(
				{
					xd_user :
					{
						label : '用户部门控件',
						command : 'xd_user',
						group : 'image',
						icon : CKEDITOR.plugins.getPath('xd_user') + 'user.gif'
					}
				});
		}
		
		if ( editor.contextMenu )
		{
			editor.contextMenu.addListener( function( element )
				{
					if ( element && !element.isReadOnly() )
					{
						var name = element.getName();
						var img_type = element.getAttribute('img_type');
						
						if ( name == 'img' && img_type === 'user'){
							return { xd_user : CKEDITOR.TRISTATE_ON };
						}
					}
				});
		}

		editor.on( 'doubleclick', function( evt )
			{
				var element = evt.data.element;

				if ( element.is( 'img' ) )
					evt.data.dialog = 'xd_user';
			});
	}
});