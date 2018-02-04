/**
 * 讯点智能表单设计器 listmenu
 */
 
 
CKEDITOR.dialog.add( 'xd_radio', function( editor )
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
						style : 'width:250px'
					},
					{
						id : 'txtValue',
						type : 'text',
						widths : [ '25%','75%' ],
						labelLayout : 'horizontal',
						label : '初始值',
						style : 'width:250px',
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
						type : 'html',
						html : '<span>' + CKEDITOR.tools.htmlEncode( '列表值' ) + '</span>'
					},
					{
						type : 'hbox',
						widths : [ '115px', '115px' ],
						children :
						[
							{
								type : 'vbox',
								children :
								[
									{
										id : 'txtOptName',
										type : 'text',
										label : '单选按钮选项',
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
												//values = dialog.getContentElement( 'xd_radio', 'cmbValue' ),
												optName = dialog.getContentElement( 'xd_radio', 'txtOptName' ),
												//optValue = dialog.getContentElement( 'xd_radio', 'txtOptValue' ),
												iIndex = getSelectedIndex( this );

											//setSelectedIndex( values, iIndex );
											optName.setValue( this.getValue() );
											//optValue.setValue( values.getValue() );
										},
										/*
										setup : function( name, element )
										{
											if ( name == 'clear' )
												removeAllOptions( this );
											else if ( name == 'img' )
												addOption( this, element.getText(), element.getText(),
													this.getDialog().getParentEditor().document );
										},*/
										commit : function( element )
										{
											var dialog = this.getDialog(),
												optionsNames = getOptions( this ),
												//optionsValues = getOptions( dialog.getContentElement( 'xd_radio', 'cmbValue' ) ),
												selectValue = dialog.getContentElement( 'xd_radio', 'txtValue' ).getValue();

											removeAllOptions( element );
											
											var radio_field = '';
											var optionArray = optionsNames.$;
											if(optionArray){
												for(var i = 0; i < optionArray.length; i++){
													radio_field += (radio_field ? ('`' + optionArray[i].value) : optionArray[i].value);
												}
											}
											element.setAttribute('radio_field',radio_field);
											
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
												optName = dialog.getContentElement( 'xd_radio', 'txtOptName' ),
												//optValue = dialog.getContentElement( 'xd_radio', 'txtOptValue' ),
												names = dialog.getContentElement( 'xd_radio', 'cmbName' );
												//values = dialog.getContentElement( 'xd_radio', 'cmbValue' );

											addOption(names, optName.getValue(), optName.getValue(), dialog.getParentEditor().document );
											//addOption(values, optValue.getValue(), optValue.getValue(), dialog.getParentEditor().document );

											optName.setValue( "" );
											//optValue.setValue( "" );
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
												optName = dialog.getContentElement( 'xd_radio', 'txtOptName' ),
												//optValue = dialog.getContentElement( 'xd_radio', 'txtOptValue' ),
												names = dialog.getContentElement( 'xd_radio', 'cmbName' ),
												//values = dialog.getContentElement( 'xd_radio', 'cmbValue' ),
												iIndex = getSelectedIndex( names );

											if ( iIndex >= 0 )
											{
												modifyOption( names, iIndex, optName.getValue(), optName.getValue() );
												//modifyOption( values, iIndex, optValue.getValue(), optValue.getValue() );
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
												names = dialog.getContentElement( 'xd_radio', 'cmbName' );
												//values = dialog.getContentElement( 'xd_radio', 'cmbValue' );

											changeOptionPosition( names, -1, dialog.getParentEditor().document );
											//changeOptionPosition( values, -1, dialog.getParentEditor().document );
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
												names = dialog.getContentElement( 'xd_radio', 'cmbName' );
												//values = dialog.getContentElement( 'xd_radio', 'cmbValue' );

											changeOptionPosition( names, 1, dialog.getParentEditor().document );
											//changeOptionPosition( values, 1, dialog.getParentEditor().document );
										}
									}
								]
							}
						]
					},
					{
						type : 'hbox',
						widths : [ '40%', '60%'],
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
										//values = dialog.getContentElement( 'xd_radio', 'cmbValue' ),
										names = dialog.getContentElement( 'xd_radio', 'cmbName' ),
										txtValue = dialog.getContentElement( 'xd_radio', 'txtValue' );
									txtValue.setValue( names.getValue() );
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
										names = dialog.getContentElement( 'xd_radio', 'cmbName' ),
										//values = dialog.getContentElement( 'xd_radio', 'cmbValue' ),
										optName = dialog.getContentElement( 'xd_radio', 'txtOptName' );
										//optValue = dialog.getContentElement( 'xd_radio', 'txtOptValue' );

									removeSelectedOptions( names );
									//removeSelectedOptions( values );

									optName.setValue( "" );
									//optValue.setValue( "" );
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
		title : '单选按钮',
		minWidth : CKEDITOR.env.ie ? 350 : 285,
		minHeight : CKEDITOR.env.ie ? 320 : 300,
		resizable : false,
		onShow : function()
		{
			delete this.selectBox;
			this.setupContent( 'clear' );
			var element = this.getParentEditor().getSelection().getSelectedElement();
			
			var combo = this.getContentElement('xd_radio','cmbName');
			
			if ( element && element.getName() == "img" )
			{
				this.selectBox = element;
				this.setupContent( element.getName(), element );

				// Load Options into dialog.
				/*var objOptions = getOptions( element );
				for ( var i = 0 ; i < objOptions.count() ; i++ )
					this.setupContent( 'option', objOptions.getItem( i ) );
				*/
				this.getContentElement('xd_radio','txtName').setValue(element.getAttribute('title'));
				this.getContentElement('xd_radio','txtValue').setValue(element.getAttribute('radio_checked'));
				
				//设置单选按钮选项
				var radio_field = element.getAttribute('radio_field');
				if(radio_field){
					var items = radio_field.split('`');
					if(items){
						for(var i = 0; i < items.length; i++){
							addOption( this,items[i], items[i],this.getParentEditor().document );
							if(items[i] == element.getAttribute('radio_checked')){
								setSelectedIndex(combo,i);
								this.getContentElement('xd_radio','txtOptName').setValue(items[i]);
							}
						}
					}
				}
				
				if(typeof(MODULE_CONFIG) !== 'undefined'){
					this.getContentElement('xd_radio','module_field').setValue(element.getAttribute('module_field'));
				}
			} else {
				removeAllOptions(combo);
			}
			
			
			
		},
		onOk : function()
		{
			var editor = this.getParentEditor(),
				element = this.selectBox,
				isInsertMode = !element;
			
			if ( isInsertMode ){
				element = editor.document.createElement( 'img' );
				element.setAttribute( 'class', 'DEPTUSER' );
				element.setAttribute('align','absMiddle');

				element.setAttribute('img_type','radio');
				element.setAttribute('src', CKEDITOR.plugins.getPath("xd_radio") + 'radio.gif');
			}
				
			if(isInsertMode){
				var element_index = XD_FORM_ELEMENT_INDEX();
				
				element.setAttribute('name','DATA_' + element_index);
				element.setAttribute('id','DATA_' + element_index);
			}
			
			element.setAttribute('title',this.getContentElement('xd_radio','txtName').getValue());	
			element.setAttribute('radio_checked',this.getContentElement('xd_radio','txtValue').getValue());	
			
			element.setAttribute('element_type','xd_radio');
			
			if(typeof(MODULE_CONFIG) !== 'undefined'){
				element.setAttribute('module_field',this.getContentElement('xd_radio','module_field').getValue());
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
				id : 'xd_radio',
				label : '单选按钮',
				title : '单选按钮',
				accessKey : '',
				elements : elements
			}
		]
	};
});
