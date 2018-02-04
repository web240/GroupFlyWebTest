/**
 * 讯点智能表单设计器  listview
 */

CKEDITOR.plugins.add('xd_listview',{
	
	init : function(editor){
		var pluginName = 'xd_listview';
		editor.addCommand(pluginName,new CKEDITOR.dialogCommand(pluginName));
		editor.ui.addButton('xd_listview',{
											label:'列表控件',
											command:pluginName,
											icon : CKEDITOR.plugins.getPath('xd_listview') + 'listview.gif'
										});
		
		CKEDITOR.dialog.add(pluginName,this.path + 'dialogs/xd_listview.js');
		
		if ( editor.addMenuItems )
		{
			editor.addMenuItems(
				{
					xd_listview :
					{
						label : '列表控件',
						command : 'xd_listview',
						group : 'image',
						icon : CKEDITOR.plugins.getPath('xd_listview') + 'listview.gif'
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
						
						if ( name == 'img' && img_type === 'listview'){
							return { xd_listview : CKEDITOR.TRISTATE_ON };
						}
					}
				});
		}

		editor.on( 'doubleclick', function( evt )
			{
				var element = evt.data.element;
				var element_type = element.getAttribute('element_type');
				
				if ( element.is( 'img' ) && element_type === 'xd_listview')
					evt.data.dialog = 'xd_listview';
			});
	}
});