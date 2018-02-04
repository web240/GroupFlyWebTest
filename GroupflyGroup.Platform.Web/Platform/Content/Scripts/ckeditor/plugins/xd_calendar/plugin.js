/**
 * 讯点表单设计器   calendar
 * author tony 2012-08-14
 */

CKEDITOR.plugins.add('xd_calendar',{
	init : function(editor){
		var pluginName = 'xd_calendar';
		
		editor.addCommand(pluginName,new CKEDITOR.dialogCommand(pluginName));
		editor.ui.addButton(pluginName,{
											label:'日历控件',
											command:pluginName,
											icon : CKEDITOR.plugins.getPath(pluginName) + 'calendar.gif'
										});
		
		CKEDITOR.dialog.add(pluginName,this.path + 'dialogs/xd_calendar.js');
		
		if ( editor.addMenuItems )
		{
			editor.addMenuItems(
				{
					xd_calendar :
					{
						label : '日历控件',
						command : 'xd_calendar',
						group : 'image',
						icon : CKEDITOR.plugins.getPath('xd_calendar') + 'calendar.gif'
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
						
						if ( name == 'img' && img_type === 'date'){
						
							return { xd_calendar : CKEDITOR.TRISTATE_ON };
							//return { xd_listview : CKEDITOR.TRISTATE_ON };
						}
					}
				});
		}

		editor.on( 'doubleclick', function( evt )
			{
				var element = evt.data.element;

				if ( element.is( 'img' ) )
					evt.data.dialog = 'xd_calendar';
			});
	}
});