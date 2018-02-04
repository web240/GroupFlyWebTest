/**
 * 讯点智能表单设计器   checkbox
 * @author tony 2012-08-10
 */
 
CKEDITOR.dialog.add( 'xd_checkbox', function( editor )
{

	var elements = [
					{
						id : 'txtName',
						type : 'text',
						label : '控件名称',
						'default' : '',
						accessKey : 'N'
					},
					{
						id : 'txtValue',
						type : 'text',
						label : '选定值',
						'default' : '',
						accessKey : 'V',
						setup : function( element )
						{
							var value = element.getAttribute( 'value' );
							// IE Return 'on' as default attr value.
							this.setValue(  CKEDITOR.env.ie && value == 'on' ? '' : value  );
						},
						commit : function( data )
						{
							var element = data.element,
								value = this.getValue();

							if ( value && !( CKEDITOR.env.ie && value == 'on' ) )
								element.setAttribute( 'value', value );
							else
							{
								if ( CKEDITOR.env.ie )
								{
									// Remove attribute 'value' of checkbox (#4721).
									var checkbox = new CKEDITOR.dom.element( 'input', element.getDocument() );
									element.copyAttributes( checkbox, { value: 1 } );
									checkbox.replace( element );
									editor.getSelection().selectElement( checkbox );
									data.element = checkbox;
								}
								else
									element.removeAttribute( 'value' );
							}
						}
					},
					{
						id : 'cmbSelected',
						type : 'checkbox',
						label : '已勾选',
						'default' : '',
						accessKey : 'S',
						value : "checked",
						setup : function( element )
						{
							this.setValue( element.getAttribute( 'checked' ) );
						},
						commit : function( data )
						{
							var element = data.element;

							if ( CKEDITOR.env.ie )
							{
								var isElementChecked = !!element.getAttribute( 'checked' ),
									isChecked = !!this.getValue();

								if ( isElementChecked != isChecked )
								{
									var replace = CKEDITOR.dom.element.createFromHtml( '<input type="checkbox"'
										   + ( isChecked ? ' checked="checked"' : '' )
										   + '/>', editor.document );

									element.copyAttributes( replace, { type : 1, checked : 1 } );
									replace.replace( element );
									editor.getSelection().selectElement( replace );
									data.element = replace;
								}
							}
							else
							{
								var value = this.getValue();
								if ( value )
									element.setAttribute( 'checked', 'checked' );
								else
									element.removeAttribute( 'checked' );
							}
						}
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
		title : '复选框属性设置',
		minWidth : 300,
		minHeight : 140,
		resizable : false,
		onShow : function()
		{
			delete this.checkbox;

			var element = this.getParentEditor().getSelection().getSelectedElement();

			if ( element && element.getAttribute( 'type' ) == 'checkbox' )
			{
				this.checkbox = element;
				this.setupContent( element );
				
				this.getContentElement('xd_checkbox','txtName').setValue(element.getAttribute('title'));
				
				if(typeof(MODULE_CONFIG) !== 'undefined'){
					this.getContentElement('xd_checkbox','module_field').setValue(element.getAttribute('module_field'));
				}
			}
		},
		onOk : function()
		{
			var editor,
				element = this.checkbox,
				isInsertMode = !element;

			if ( isInsertMode )
			{
				editor = this.getParentEditor();
				element = editor.document.createElement( 'input' );
				element.setAttribute( 'type', 'checkbox' );
				
				
				var element_index = XD_FORM_ELEMENT_INDEX();
				
				element.setAttribute('name','DATA_' + element_index);
				element.setAttribute('id','DATA_' + element_index);
			
				
				editor.insertElement( element );
			}
			
			element.setAttribute('title',this.getContentElement('xd_checkbox','txtName').getValue());
			
			element.setAttribute('element_type','xd_checkbox');
			
			if(typeof(MODULE_CONFIG) !== 'undefined'){
				element.setAttribute('module_field',this.getContentElement('xd_checkbox','module_field').getValue());
			}
			
			this.commitContent( { element : element } );
		},
		contents : [
			{
				id : 'xd_checkbox',
				label : '复选框属性',
				title : '复选框属性',
				startupFocus : 'txtName',
				elements : elements
			}
		]
	};
});
