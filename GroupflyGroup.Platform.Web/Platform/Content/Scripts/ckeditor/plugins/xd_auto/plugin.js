/**
 * 讯点表单设计器   计算控件
 * author tony 2012-08-14
 */

CKEDITOR.plugins.add('xd_auto',{
	init : function(editor){
		var pluginName = 'xd_auto';
		
		editor.addCommand(pluginName,new CKEDITOR.dialogCommand(pluginName));
		editor.ui.addButton(pluginName,{
											label:'宏控件',
											command:pluginName,
											icon : CKEDITOR.plugins.getPath(pluginName) + 'auto.gif'
										});
		
		CKEDITOR.dialog.add(pluginName,this.path + 'dialogs/xd_auto.js');
		
		if ( editor.addMenuItems )
		{
			editor.addMenuItems(
				{
					xd_auto :
					{
						label : '宏控件',
						command : 'xd_auto',
						group : 'textfield',
						icon : CKEDITOR.plugins.getPath('xd_auto') + 'auto.gif'
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
						
						if ( name == 'input' && input_type === 'auto'){
							return { xd_auto : CKEDITOR.TRISTATE_ON };
						}
					}
				});
		}

		editor.on( 'doubleclick', function( evt )
			{
				var element = evt.data.element;
				var element_type = element.getAttribute('element_type');

				if ( element.is( 'input' ) && element_type == 'xd_auto')
					evt.data.dialog = 'xd_auto';
			});
	}
});