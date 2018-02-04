/**
 * 讯点智能表单设计器 listmenu
 */

//级联菜单设置说明 
function xd_listmenu_tip(){
	var associatetip = document.getElementById('xd_listmenu_aossociatetip');
	if(associatetip.style.display === 'none'){
		associatetip.style.display = 'block';
	} else {
		associatetip.style.display = 'none';
	}
}
 
 
CKEDITOR.dialog.add( 'xd_listmenu', function( editor )
{
	//添加select选项
	function addOption( combo, optionText, optionValue, documentObject, index )
	{
		combo = getSelect( combo );
		var oOption;
		if ( documentObject )
			oOption = documentObject.createElement( "OPTION" );
		else
			oOption = document.createElement( "OPTION" );

		if ( combo && oOption && oOption.getName() == 'option' )
		{
			if ( CKEDITOR.env.ie ) {
				if ( !isNaN( parseInt( index, 10) ) )
					combo.$.options.add( oOption.$, index );
				else
					combo.$.options.add( oOption.$ );

				oOption.$.innerHTML = optionText.length > 0 ? optionText : '';
				oOption.$.value     = optionValue;
			}
			else
			{
				if ( index !== null && index < combo.getChildCount() )
					combo.getChild( index < 0 ? 0 : index ).insertBeforeMe( oOption );
				else
					combo.append( oOption );

				oOption.setText( optionText.length > 0 ? optionText : '' );
				oOption.setValue( optionValue );
			}
		}
		else
			return false;

		return oOption;
	}
	//删除所有的可选值
	function removeSelectedOptions( combo )
	{
		combo = getSelect( combo );

		// Save the selected index
		var iSelectedIndex = getSelectedIndex( combo );

		// Remove all selected options.
		for ( var i = combo.getChildren().count() - 1 ; i >= 0 ; i-- )
		{
			if ( combo.getChild( i ).$.selected )
				combo.getChild( i ).remove();
		}

		// Reset the selection based on the original selected index.
		setSelectedIndex( combo, iSelectedIndex );
	}
	//Modify option  from a SELECT object.
	function modifyOption( combo, index, title, value )
	{
		combo = getSelect( combo );
		if ( index < 0 )
			return false;
		var child = combo.getChild( index );
		child.setText( title );
		child.setValue( value );
		return child;
	}
	function removeAllOptions( combo )
	{
		combo = getSelect( combo );
		while ( combo.getChild( 0 ) && combo.getChild( 0 ).remove() )
		{ /*jsl:pass*/ }
	}
	// Moves the selected option by a number of steps (also negative).
	function changeOptionPosition( combo, steps, documentObject )
	{
		combo = getSelect( combo );
		var iActualIndex = getSelectedIndex( combo );
		if ( iActualIndex < 0 )
			return false;

		var iFinalIndex = iActualIndex + steps;
		iFinalIndex = ( iFinalIndex < 0 ) ? 0 : iFinalIndex;
		iFinalIndex = ( iFinalIndex >= combo.getChildCount() ) ? combo.getChildCount() - 1 : iFinalIndex;

		if ( iActualIndex == iFinalIndex )
			return false;

		var oOption = combo.getChild( iActualIndex ),
			sText	= oOption.getText(),
			sValue	= oOption.getValue();

		oOption.remove();

		oOption = addOption( combo, sText, sValue, ( !documentObject ) ? null : documentObject, iFinalIndex );
		setSelectedIndex( combo, iFinalIndex );
		return oOption;
	}
	function getSelectedIndex( combo )
	{
		combo = getSelect( combo );
		return combo ? combo.$.selectedIndex : -1;
	}
	function setSelectedIndex( combo, index )
	{
		combo = getSelect( combo );
		if ( index < 0 )
			return null;
		var count = combo.getChildren().count();
		combo.$.selectedIndex = ( index >= count ) ? ( count - 1 ) : index;
		return combo;
	}
	function getOptions( combo )
	{
		combo = getSelect( combo );
		return combo ? combo.getChildren() : false;
	}
	function getSelect( obj )
	{
		if ( obj && obj.domId && obj.getInputElement().$ )				// Dialog element.
			return  obj.getInputElement();
		else if ( obj && obj.$ )
			return obj;
		return false;
	}
	
	var elements = [
					{
						id : 'txtName',
						type : 'text',
						widths : [ '25%','75%' ],
						labelLayout : 'horizontal',
						label : '控件名称',
						'default' : '',
						accessKey : 'N',
						style : 'width:350px'
					},
					{
						id : 'txtValue',
						type : 'text',
						widths : [ '25%','75%' ],
						labelLayout : 'horizontal',
						label : '初始值',
						style : 'width:350px',
						'default' : '',
						className : 'cke_disabled',
						onLoad : function()
						{
							this.getInputElement().setAttribute( 'readOnly', true );
						},
						setup : function( name, element )
						{
							if ( name == 'clear' )
								this.setValue( '' );
							else if ( name == 'option' && element.getAttribute( 'selected' ) )
								this.setValue( element.$.value );
						}
					},
					{
						type : 'hbox',
						widths : [ '175px', '170px' ],
						children :
						[
							{
								id : 'txtSize',
								type : 'text',
								labelLayout : 'horizontal',
								label : '高度',
								'default' : '',
								accessKey : 'S',
								style : 'width:175px',
								validate: function()
								{
									var func = CKEDITOR.dialog.validate.integer( editor.lang.common.validateNumberFailed );
									return ( ( this.getValue() === '' ) || func.apply( this ) );
								},
								setup : function( name, element )
								{
									if ( name == 'select' )
										this.setValue( element.getAttribute( 'size' ) || '' );
									if ( CKEDITOR.env.webkit )
										this.getInputElement().setStyle( 'width', '86px' );
								},
								commit : function( element )
								{
									if ( this.getValue() )
										element.setAttribute( 'size', this.getValue() );
									else
										element.removeAttribute( 'size' );
								}
							},
							{
								type : 'html',
								html : '<span>' + CKEDITOR.tools.htmlEncode( editor.lang.select.lines ) + '</span>'
							}
						]
					},
					/*
					{
						type : 'hbox',
						widths : ['50%','50%'],
						children : 
						[
							{
								id : 'listAssociate',
								type : 'text',
								width : ['25%','75%'],
								style : 'width:210px',
								labelLayout : 'horizontal',
								label : '关联子菜单'
							},
							{
								type : 'html',
								html : '<a href="javascript:void(0);" onclick="xd_listmenu_tip()" style="color:blue;">说明</a>'
							}
						]
					},
					{
						id : 'listDescribe',
						type : 'html',
						html : '<div id="xd_listmenu_aossociatetip" style="display:none;color:red;">若关联子菜单，需要子下拉菜单设置的时候在每个选项后加上<br />特殊标记以记录与父菜单关系，形如“子菜单项目|父菜单项目”，<br />则父菜单发生变化，子菜单会随之自动刷新筛选。</div>'
					},*/
					{
						type : 'html',
						html : '<span>' + CKEDITOR.tools.htmlEncode( '列表值' ) + '</span>'
					},
					{
						type : 'hbox',
						widths : [ '115px', '115px' ,'100px' ],
						children :
						[
							{
								type : 'vbox',
								children :
								[
									{
										id : 'txtOptName',
										type : 'text',
										label : '选项文本',
										style : 'width:115px',
										setup : function( name, element )
										{
											if ( name == 'clear' )
												this.setValue( "" );
										}
									},
									{
										type : 'select',
										id : 'cmbName',
										label : '',
										title : '',
										size : 5,
										style : 'width:115px;height:75px',
										items : [],
										onChange : function()
										{
											var dialog = this.getDialog(),
												values = dialog.getContentElement( 'xd_listmenu', 'cmbValue' ),
												optName = dialog.getContentElement( 'xd_listmenu', 'txtOptName' ),
												optValue = dialog.getContentElement( 'xd_listmenu', 'txtOptValue' ),
												iIndex = getSelectedIndex( this );

											setSelectedIndex( values, iIndex );
											optName.setValue( this.getValue() );
											optValue.setValue( values.getValue() );
										},
										setup : function( name, element )
										{
											if ( name == 'clear' )
												removeAllOptions( this );
											else if ( name == 'option' )
												addOption( this, element.getText(), element.getText(),
													this.getDialog().getParentEditor().document );
										},
										commit : function( element )
										{
											var dialog = this.getDialog(),
												optionsNames = getOptions( this ),
												optionsValues = getOptions( dialog.getContentElement( 'xd_listmenu', 'cmbValue' ) ),
												selectValue = dialog.getContentElement( 'xd_listmenu', 'txtValue' ).getValue();

											removeAllOptions( element );

											for ( var i = 0 ; i < optionsNames.count() ; i++ )
											{
												var oOption = addOption( element, optionsNames.getItem( i ).getValue(),
													optionsValues.getItem( i ).getValue(), dialog.getParentEditor().document );
												if ( optionsValues.getItem( i ).getValue() == selectValue )
												{
													oOption.setAttribute( 'selected', 'selected' );
													oOption.selected = true;
												}
											}
										}
									}
								]
							},
							{
								type : 'vbox',
								children :
								[
									{
										id : 'txtOptValue',
										type : 'text',
										label : '选项值',
										style : 'width:115px',
										setup : function( name, element )
										{
											if ( name == 'clear' )
												this.setValue( "" );
										}
									},
									{
										type : 'select',
										id : 'cmbValue',
										label : '',
										size : 5,
										style : 'width:115px;height:75px',
										items : [],
										onChange : function()
										{
											var dialog = this.getDialog(),
												names = dialog.getContentElement( 'xd_listmenu', 'cmbName' ),
												optName = dialog.getContentElement( 'xd_listmenu', 'txtOptName' ),
												optValue = dialog.getContentElement( 'xd_listmenu', 'txtOptValue' ),
												iIndex = getSelectedIndex( this );

											setSelectedIndex( names, iIndex );
											optName.setValue( names.getValue() );
											optValue.setValue( this.getValue() );
										},
										setup : function( name, element )
										{
											if ( name == 'clear' )
												removeAllOptions( this );
											else if ( name == 'option' )
											{
												var oValue	= element.getValue();
												addOption( this, oValue, oValue,
													this.getDialog().getParentEditor().document );
												if ( element.getAttribute( 'selected' ) == 'selected' )
													this.getDialog().getContentElement( 'xd_listmenu', 'txtValue' ).setValue( oValue );
											}
										}
									}
								]
							},
							{
								type : 'vbox',
								padding : 5,
								children :
								[
									{
										type : 'button',
										id : 'btnAdd',
										style : '',
										label : '添加',
										title : '添加',
										style : 'width:100%;',
										onClick : function()
										{
											//Add new option.
											var dialog = this.getDialog(),
												parentEditor = dialog.getParentEditor(),
												optName = dialog.getContentElement( 'xd_listmenu', 'txtOptName' ),
												optValue = dialog.getContentElement( 'xd_listmenu', 'txtOptValue' ),
												names = dialog.getContentElement( 'xd_listmenu', 'cmbName' ),
												values = dialog.getContentElement( 'xd_listmenu', 'cmbValue' );

											addOption(names, optName.getValue(), optName.getValue(), dialog.getParentEditor().document );
											addOption(values, optValue.getValue(), optValue.getValue(), dialog.getParentEditor().document );

											optName.setValue( "" );
											optValue.setValue( "" );
										}
									},
									{
										type : 'button',
										id : 'btnModify',
										label : '修改',
										title : '修改',
										style : 'width:100%;',
										onClick : function()
										{
											//Modify selected option.
											var dialog = this.getDialog(),
												optName = dialog.getContentElement( 'xd_listmenu', 'txtOptName' ),
												optValue = dialog.getContentElement( 'xd_listmenu', 'txtOptValue' ),
												names = dialog.getContentElement( 'xd_listmenu', 'cmbName' ),
												values = dialog.getContentElement( 'xd_listmenu', 'cmbValue' ),
												iIndex = getSelectedIndex( names );

											if ( iIndex >= 0 )
											{
												modifyOption( names, iIndex, optName.getValue(), optName.getValue() );
												modifyOption( values, iIndex, optValue.getValue(), optValue.getValue() );
											}
										}
									},
									{
										type : 'button',
										id : 'btnUp',
										style : 'width:100%;',
										label : '上移',
										title : '上移',
										onClick : function()
										{
											//Move up.
											var dialog = this.getDialog(),
												names = dialog.getContentElement( 'xd_listmenu', 'cmbName' ),
												values = dialog.getContentElement( 'xd_listmenu', 'cmbValue' );

											changeOptionPosition( names, -1, dialog.getParentEditor().document );
											changeOptionPosition( values, -1, dialog.getParentEditor().document );
										}
									},
									{
										type : 'button',
										id : 'btnDown',
										style : 'width:100%;',
										label : '下移',
										title : '下移',
										onClick : function()
										{
											//Move down.
											var dialog = this.getDialog(),
												names = dialog.getContentElement( 'xd_listmenu', 'cmbName' ),
												values = dialog.getContentElement( 'xd_listmenu', 'cmbValue' );

											changeOptionPosition( names, 1, dialog.getParentEditor().document );
											changeOptionPosition( values, 1, dialog.getParentEditor().document );
										}
									}
								]
							}
						]
					},
					{
						type : 'hbox',
						widths : [ '40%', '20%', '40%' ],
						children :
						[
							{
								type : 'button',
								id : 'btnSetValue',
								label : '设为初始化时选定值',
								title : '设为初始化时选定值',
								onClick : function()
								{
									//Set as default value.
									var dialog = this.getDialog(),
										values = dialog.getContentElement( 'xd_listmenu', 'cmbValue' ),
										txtValue = dialog.getContentElement( 'xd_listmenu', 'txtValue' );
									txtValue.setValue( values.getValue() );
								}
							},
							{
								type : 'button',
								id : 'btnDelete',
								label : '删除',
								title : '删除',
								onClick : function()
								{
									// Delete option.
									var dialog = this.getDialog(),
										names = dialog.getContentElement( 'xd_listmenu', 'cmbName' ),
										values = dialog.getContentElement( 'xd_listmenu', 'cmbValue' ),
										optName = dialog.getContentElement( 'xd_listmenu', 'txtOptName' ),
										optValue = dialog.getContentElement( 'xd_listmenu', 'txtOptValue' );

									removeSelectedOptions( names );
									removeSelectedOptions( values );

									optName.setValue( "" );
									optValue.setValue( "" );
								}
							},
							{
								id : 'chkMulti',
								type : 'checkbox',
								label : '允许多选',
								'default' : '',
								accessKey : 'M',
								value : "checked",
								setup : function( name, element )
								{
									if ( name == 'select' )
										this.setValue( element.getAttribute( 'multiple' ) );
									if ( CKEDITOR.env.webkit )
										this.getElement().getParent().setStyle( 'vertical-align', 'middle' );
								},
								commit : function( element )
								{
									if ( this.getValue() )
										element.setAttribute( 'multiple', this.getValue() );
									else
										element.removeAttribute( 'multiple' );
								}
							}
						]
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
		title : '下拉菜单属性',
		minWidth : CKEDITOR.env.ie ? 460 : 395,
		minHeight : CKEDITOR.env.ie ? 320 : 300,
		resizable : false,
		onShow : function()
		{
			delete this.selectBox;
			this.setupContent( 'clear' );
			var element = this.getParentEditor().getSelection().getSelectedElement();
			if ( element && element.getName() == "select" )
			{
				this.selectBox = element;
				this.setupContent( element.getName(), element );

				// Load Options into dialog.
				var objOptions = getOptions( element );
				for ( var i = 0 ; i < objOptions.count() ; i++ )
					this.setupContent( 'option', objOptions.getItem( i ) );
				
				this.getContentElement('xd_listmenu','txtName').setValue(element.getAttribute('title'));
				
				if(typeof(MODULE_CONFIG) !== 'undefined'){
					this.getContentElement('xd_listmenu','module_field').setValue(element.getAttribute('module_field'));
				}
			}
			
		},
		onOk : function()
		{
			var editor = this.getParentEditor(),
				element = this.selectBox,
				isInsertMode = !element;
			
			if ( isInsertMode )
				element = editor.document.createElement( 'select' );
				
			if(isInsertMode){
				var element_index = XD_FORM_ELEMENT_INDEX();
				
				element.setAttribute('name','DATA_' + element_index);
				element.setAttribute('id','DATA_' + element_index);
			}
			
			element.setAttribute('title',this.getContentElement('xd_listmenu','txtName').getValue());	
			
			element.setAttribute('element_type','xd_listmenu');
			
			if(typeof(MODULE_CONFIG) !== 'undefined'){
				element.setAttribute('module_field',this.getContentElement('xd_listmenu','module_field').getValue());
			}
			
			this.commitContent( element );

			if ( isInsertMode )
			{
				editor.insertElement( element );
				if ( CKEDITOR.env.ie )
				{
					var sel = editor.getSelection(),
						bms = sel.createBookmarks();
					setTimeout(function()
					{
						sel.selectBookmarks( bms );
					}, 0 );
				}
			}
		},
		contents : [
			{
				id : 'xd_listmenu',
				label : '下拉菜单表单属性',
				title : '下拉菜单属性设置',
				accessKey : '',
				elements : elements
			}
		]
	};
});
