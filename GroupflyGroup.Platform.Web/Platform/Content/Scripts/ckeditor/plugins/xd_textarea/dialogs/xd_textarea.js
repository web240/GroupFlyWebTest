/**
 * 讯点智能表单设计器   textfield
 * @author tony 2012-08-07
 */
CKEDITOR.dialog.add( 'xd_textarea', function( editor )
{
	var elements = [
					{
						type : 'hbox',
						widths : ['50%','50%'],
						children : 
						[
							{
								id : 'txtName',
								type : 'text',
								label : '控件名称'
							},
							{
								id : 'txtFontSize',
								type : 'text',
								label : '字体大小'
							}
						]
					},
					{
						type : 'hbox',
						widths : ['50%','50%'],
						children : 
						[
							{
								id : 'txtCols',
								type : 'text',
								label : '控件宽度'
							},
							{
								id : 'txtRows',
								type : 'text',
								label : '控件高度'
							}
						]
					},
					{
						id : 'txtValue',
						type : 'textarea',
						label : '默认值'
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
		title : '多行输入框属性',
		minWidth : 250,
		minHeight : 200,
		resizable : false,
		onShow : function()
		{
			delete this.textField;

			var element = this.getParentEditor().getSelection().getSelectedElement();
			
			//给表单赋值
			if(element){
				this.textField = element;
				
				this.getContentElement('xd_textarea','txtName').setValue(element.getAttribute('title'));
				this.getContentElement('xd_textarea','txtCols').setValue(element.getAttribute('cols'));
				this.getContentElement('xd_textarea','txtRows').setValue(element.getAttribute('rows'));
				this.getContentElement('xd_textarea','txtValue').setValue(element.getAttribute('defaultValue'));
				
				//样式属性
				var styleString = element.getAttribute('style');
				if(styleString){
					var styleArray = styleString.split(';');
					var txtFontSize = '';
					console.log(styleArray);
					for(var i = 0; i < styleArray.length; i++){
						var valueArray = styleArray[i].split(':');
						if(valueArray[0].Trim() === 'font-size'){
							txtFontSize = valueArray[1].substr(0,valueArray[1].length - 2);
						}
					}
					this.getContentElement('xd_textarea','txtFontSize').setValue(txtFontSize);
				}
				
				if(typeof(MODULE_CONFIG) !== 'undefined'){
					this.getContentElement('xd_textarea','module_field').setValue(element.getAttribute('module_field'));
				}
			}
		},
		onOk : function()
		{
			var editor,
				element = this.textField,
				isInsertMode = !element;

			if ( isInsertMode )
			{
				editor = this.getParentEditor();
				element = editor.document.createElement( 'textarea' );
			}
			
			//设置属性
			element.setAttribute('title',this.getContentElement('xd_textarea','txtName').getValue());
			element.setAttribute('cols',this.getContentElement('xd_textarea','txtCols').getValue());
			element.setAttribute('rows',this.getContentElement('xd_textarea','txtRows').getValue());
			element.setAttribute('defaultValue',this.getContentElement('xd_textarea','txtValue').getValue());
			
			var txtFontSize = this.getContentElement('xd_textarea','txtFontSize').getValue();
			var styleString = '';
			if(txtFontSize){
				styleString += ('font-size:' + txtFontSize + 'px;');
			}
			if(styleString){
				element.setAttribute('style',styleString);
			}
			
			if(isInsertMode){
				var element_index = XD_FORM_ELEMENT_INDEX();
				
				element.setAttribute('name','DATA_' + element_index);
				element.setAttribute('id','DATA_' + element_index);
			}
			
			element.setAttribute('element_type','xd_textarea');
			
			if(typeof(MODULE_CONFIG) !== 'undefined'){
				element.setAttribute('module_field',this.getContentElement('xd_textarea','module_field').getValue());
			}
			
			if ( isInsertMode )
				editor.insertElement( element );
			this.commitContent( { element : element } );
		},
		onLoad : function()
		{
			
		},
		contents : [
			{
				id : 'xd_textarea',
				label : '表单元素',
				title : '多行输入框属性',
				elements : elements
			}
		]
	};
});
