/**
 * 讯点表单设计器   计算控件
 * author tony 2012-08-14
 */

CKEDITOR.plugins.add('xd_view',{
	init : function(editor){
		var pluginName = 'xd_view';
		
		editor.addCommand(pluginName,new CKEDITOR.dialogCommand(pluginName));
		editor.ui.addButton(pluginName,{
											label:'属性控件',
											command:pluginName,
											icon: CKEDITOR.plugins.getPath(pluginName) + 'view.gif'
										});
		
		CKEDITOR.dialog.add(pluginName,this.path + 'dialogs/xd_view.js');
		
		if ( editor.addMenuItems )
		{
			editor.addMenuItems(
				{
					xd_view :
					{
						label : '属性控件',
						command : 'xd_view',
						group : 'textfield',
						icon: CKEDITOR.plugins.getPath('xd_view') + 'view.gif'
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
							return { xd_view : CKEDITOR.TRISTATE_ON };
						}
					}
				});
		}

		editor.on( 'doubleclick', function( evt )
			{
				var element = evt.data.element;
				var element_type = element.getAttribute('element_type');

				if ( element.is( 'img' ) && element_type == 'xd_view')
					evt.data.dialog = 'xd_view';
			});
	}
});