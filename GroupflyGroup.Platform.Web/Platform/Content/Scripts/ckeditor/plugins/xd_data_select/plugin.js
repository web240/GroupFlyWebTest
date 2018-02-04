/**
 * 讯点表单设计器   数据选择控件
 * author tony 2012-08-15
 */

CKEDITOR.plugins.add('xd_data_select',{
	init : function(editor){
		var pluginName = 'xd_data_select';
		
		editor.addCommand(pluginName,new CKEDITOR.dialogCommand(pluginName));
		editor.ui.addButton(pluginName,{
											label:'数据选择控件',
											command:pluginName,
											icon : CKEDITOR.plugins.getPath(pluginName) + 'data.gif'
										});
		
		CKEDITOR.dialog.add(pluginName,this.path + 'dialogs/xd_data_select.js');
		/*
		if ( editor.addMenuItems )
		{
			editor.addMenuItems(
				{
					xd_data_select :
					{
						label : '数据选择控件',
						command : 'xd_data_select',
						group : 'image',
						icon : CKEDITOR.plugins.getPath('xd_data_select') + 'data.gif'
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
						var button_type = element.getAttribute('button_type');
						
						if ( name == 'button' && button_type === 'data_select'){
							return { xd_data_select : CKEDITOR.TRISTATE_ON };
						}
					}
				});
		}

		editor.on( 'doubleclick', function( evt )
			{
				var element = evt.data.element;

				if ( element.is( 'button' ) )
					evt.data.dialog = 'xd_data_select';
			});*/
	}
});