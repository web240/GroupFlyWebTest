/**
 * 讯点表单设计器   计算控件
 * author tony 2012-08-14
 */

CKEDITOR.plugins.add('xd_property',{
	init : function(editor){
		var pluginName = 'xd_property';
		
		editor.addCommand(pluginName,new CKEDITOR.dialogCommand(pluginName));
		editor.ui.addButton(pluginName,{
											label:'属性控件',
											command:pluginName,
											icon: CKEDITOR.plugins.getPath(pluginName) + 'property.gif'
										});
		
		CKEDITOR.dialog.add(pluginName,this.path + 'dialogs/xd_property.js');
		
		if ( editor.addMenuItems )
		{
			editor.addMenuItems(
				{
					xd_property :
					{
						label : '属性控件',
						command : 'xd_property',
						group : 'textfield',
						icon: CKEDITOR.plugins.getPath('xd_property') + 'property.gif'
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
						var input_type = element.getAttribute('input_type');
						
						if ( name == 'input' && input_type === 'property'){
							return { xd_property : CKEDITOR.TRISTATE_ON };
						}
					}
				});
		}

		editor.on( 'doubleclick', function( evt )
			{
				var element = evt.data.element;
				var element_type = element.getAttribute('element_type');

				if ( element.is( 'input' ) && element_type == 'xd_property')
					evt.data.dialog = 'xd_property';
			});
	}
});