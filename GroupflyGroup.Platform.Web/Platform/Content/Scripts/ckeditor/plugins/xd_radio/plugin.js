/**
 * 单行输入框插件
 * @author tony
 */
CKEDITOR.plugins.add('xd_radio',
{
	init : function( editor )
	{
		var pluginName = 'xd_radio';
		editor.addCommand(pluginName,new CKEDITOR.dialogCommand(pluginName));
		editor.ui.addButton('xd_radio',{
											label:'单选按钮',
											command:pluginName
										});
		
		CKEDITOR.dialog.add(pluginName,this.path + 'dialogs/xd_radio.js');
		
		if ( editor.addMenuItems )
		{
			editor.addMenuItems(
				{
					xd_radio :
					{
						label : '单选按钮',
						command : 'xd_radio',
						group : 'image',
						icon : CKEDITOR.plugins.getPath('xd_radio') + 'radio.gif'
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
						
						if ( name == 'img' && img_type === 'radio'){
							return { xd_radio : CKEDITOR.TRISTATE_ON };
						}
					}
				});
		}

		editor.on( 'doubleclick', function( evt )
			{
				var element = evt.data.element;

				if ( element.is( 'img' ) )
					evt.data.dialog = 'xd_radio';
			});
	}
});
