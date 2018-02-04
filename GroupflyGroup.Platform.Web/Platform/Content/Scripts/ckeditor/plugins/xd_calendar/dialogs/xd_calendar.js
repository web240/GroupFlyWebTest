/**
 * 讯点智能表单  日历控件
 * @author tony 2012-08-14
 */

CKEDITOR.dialog.add('xd_calendar',function(editor){
	
	var elements = [
					{
						id : 'txtName',
						type : 'text',
						widths : ['30%','70%'],
						label : '输入控件名称：',
						labelLayout : 'horizontal',
						labelStyle : 'font-weight:bold'
					},
					{
						id : 'txtType',
						type : 'select',
						widths : ['30%','50%'],
						label : '输入格式类型：',
						labelLayout : 'horizontal',
						labelStyle : 'font-weight:bold',
						items : 
						[
							['日期，形如：2012-08-14','yyyy-MM-dd'],
							['日期，形如：2012-08-14 13:00:00','yyyy-MM-dd HH:mm:ss']
							//,
							//['自定义格式','auto']
						],
						onChange : function(){
							
						}
					},
					{
						type : 'html',
						html : '<div style="color:red;">' +
									'<span style="font-weight:bold;">说明:</span><br />日历控件选择的日期、时间将回填到输入框中，<br />自定义日期格式参考php手册中的日期格式说明' +
								'</div>'
					}
				];
	
	var dataSelect = [['---选择数据源---','0']];
	if(typeof(MODULE_CONFIG) !== 'undefined'){
		for(var key in MODULE_CONFIG){
			var item = MODULE_CONFIG[key];
			dataSelect.push([item,key]);
		}
		elements.push({
					id : 'module_field',
					type : 'select',
					widths : ['5%','100px'],
					label : '业务表单字段：',
					labelLayout : 'horizontal',
					labelStyle : 'font-weight:bold',
					style : 'width:150px',
					'default' : '0',
					items : dataSelect
				});
	}
	
	return {
		title : '日历控件属性',
		width : 300,
		height : 150,
		resizable : false,
		onShow : function(){
			delete this.xd_calendar;

			var element = this.getParentEditor().getSelection().getSelectedElement();

			if ( element )
			{
				this.xd_calendar = element;
				this.setupContent( element );
				
				this.getContentElement('xd_calendar','txtName').setValue(element.getAttribute('title'));
				this.getContentElement('xd_calendar','txtType').setValue(element.getAttribute('date_type'));
				
				if(typeof(MODULE_CONFIG) !== 'undefined'){
					this.getContentElement('xd_calendar','module_field').setValue(element.getAttribute('module_field'));
				}
			}
		},
		onOk : function(){
			var editor,
				element = this.xd_calendar,
				isInsertMode = !element;

			if ( isInsertMode )
			{
				editor = this.getParentEditor();
				element = editor.document.createElement( 'img' );
				element.setAttribute( 'class', 'CALENDAR' );
				element.setAttribute('align','absMiddle');

				element.setAttribute('src', CKEDITOR.plugins.getPath("xd_calendar") + 'calendar.gif');
				element.setAttribute('img_type','date');
				
				var element_index = XD_FORM_ELEMENT_INDEX();
				
				element.setAttribute('name','DATA_' + element_index);
				element.setAttribute('id','DATA_' + element_index);
			
				
				editor.insertElement( element );
			}
			
			element.setAttribute('title',this.getContentElement('xd_calendar','txtName').getValue());
			element.setAttribute('date_type',this.getContentElement('xd_calendar','txtType').getValue());
			
			element.setAttribute('element_type','xd_calendar');
			
			if(typeof(MODULE_CONFIG) !== 'undefined'){
				element.setAttribute('module_field',this.getContentElement('xd_calendar','module_field').getValue());
			}
			
			this.commitContent( { element : element } );
		},
		contents : 
		[
			{
				id : 'xd_calendar',
				label : '日历控件属性',
				title : '日历控件属性',
				elements : elements
			}
		]
	};
	
});