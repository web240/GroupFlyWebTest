/**
 * 表单  属性控件
 * @author eric 2017-08-07
 */


CKEDITOR.dialog.add('xd_property',function(editor){
	
    var elements = [
                    {
                        id: 'Id',
                        type: 'text',
                        widths: ['85px', '325px'],
                        label: '组件Id：',
                        labelLayout: 'horizontal',
                        labelStyle: 'font-weight:bold',
                        style: 'width:150px;margin-left:25px'
                    },
					{
						id : 'propertyName',
						type : 'text',
						widths: ['85px', '325px'],
						labelLayout : 'horizontal',
						label : '属性名称：',
						labelStyle : 'font-weight:bold;text-align:right',
						style: 'width:350px;margin-left:2px;display:none;'
					},
                    {
                        id: 'propertyText',
                        type: 'text',
                        widths: ['85px', '325px'],
                        labelLayout: 'horizontal',
                        label: '属性1全称：',
                        labelStyle: 'font-weight:bold;text-align:right',
                        style: 'width:350px;margin-left:2px;'
                    },
                    {
                        id: 'propertyId',
                        type: 'text',
                        widths: ['85px', '325px'],
                        labelLayout: 'horizontal',
                        label: '属性id：',
                        labelStyle: 'font-weight:bold;text-align:right',
                        style: 'width:350px;margin-left:2px;'
                    },


                    {
                        id: 'parentId',
                        type: 'text',
                        widths: ['85px', '325px'],
                        labelLayout: 'horizontal',
                        label: '属性全称：',
                        labelStyle: 'font-weight:bold;text-align:right',
                        style: 'width:350px;margin-left:2px;display:none;'
                    },
                    {
                        id: 'Pathname',
                        type: 'textarea',
                        widths: ['85px', '325px'],
                        labelLayout: 'horizontal',
                        label: '属性来源：',
                        labelStyle: 'font-weight:bold;text-align:right',
                        style: 'width:350px;margin-left:2px;'
                    },
					{
						id : 'propertyFontSize',
						type : 'text',
						widths: ['85px', '325px'],
						labelLayout : 'horizontal',
						label : '字体大小：',
						labelStyle : 'font-weight:bold;text-align:right',
						style : 'width:350px;margin-left:2px;'
					},
					{
						id : 'propertyWidth',
						type : 'text',
						widths: ['85px', '325px'],
						labelLayout : 'horizontal',
						label : '控件宽度：',
						labelStyle : 'font-weight:bold',
						style: 'width:350px;margin-left:2px;'
					}
				];	
	return {
		title : '属性控件',
		width : 350,
		height : 150,
		resizable : false,
		onShow : function(){
			delete this.xd_property;

			var element = this.getParentEditor().getSelection().getSelectedElement();

			if ( element )
			{
				this.xd_property = element;
				this.setupContent( element );
				
				this.getContentElement('xd_property', 'Id').setValue(element.getAttribute('id'));
				this.getContentElement('xd_property', 'propertyText').setValue(element.getAttribute('value'));
				this.getContentElement('xd_property', 'propertyName').setValue(element.getAttribute('propertyname'));
				this.getContentElement('xd_property', 'propertyId').setValue(element.getAttribute('propertyid'));
				this.getContentElement('xd_property', 'parentId').setValue(element.getAttribute('parentid'));
				this.getContentElement('xd_property', 'Pathname').setValue(element.getAttribute('pathname'));

				
				var styleString = element.getAttribute('style');
				var styleArray = styleString.split(';');
				for(var i = 0; i < styleArray.length; i++){
					var itemArray = styleArray[i].split(':');
					if(itemArray[0] === 'font-size'){
						this.getContentElement('xd_property','propertyFontSize').setValue(itemArray[1].substr(0,(itemArray[1].length - 2)));
					}
					if(itemArray[0] === 'width'){
						this.getContentElement('xd_property','propertyWidth').setValue(itemArray[1].substr(0,(itemArray[1].length - 2)));
					}
				}
			}
		},
		onOk : function(){
			var editor,
				element = this.xd_property,
				isInsertMode = !element;

			if (isInsertMode) {
			    editor = this.getParentEditor();
			    element = editor.document.createElement('input');
			    element.setAttribute('element_type', 'xd_property');
			    element.setAttribute('class', 'PROPERTY');
			    element.setAttribute('align', 'absMiddle');
			    element.setAttribute('input_type', 'property');

			    var element_index = XD_FORM_ELEMENT_INDEX();
			    element.setAttribute('name', 'DATA_' + element_index);
			    //element.setAttribute('id', 'DATA_' + element_index);

			    editor.insertElement(element);
			} else {
			    element.setAttribute('element_type', 'xd_property');
			}
			element.setAttribute('value', this.getContentElement('xd_property', 'propertyText').getValue());
			element.setAttribute('propertyname', this.getContentElement('xd_property', 'propertyName').getValue());
			element.setAttribute('propertyid', this.getContentElement('xd_property', 'propertyId').getValue());
			element.setAttribute('id', this.getContentElement('xd_property', 'Id').getValue());
			element.setAttribute('parentid', this.getContentElement('xd_property', 'parentId').getValue());
			element.setAttribute('pathname', this.getContentElement('xd_property', 'Pathname').getValue());
			
			var styleString = '';
			var propertyFontSize = this.getContentElement('xd_property','propertyFontSize').getValue();
			var propertyWidth = this.getContentElement('xd_property','propertyWidth').getValue();
			if(propertyFontSize){
				styleString += ('font-size:' + propertyFontSize + 'px;');
			}
			if(propertyWidth){
				styleString += ('width:' + propertyWidth + 'px;');
			}
			element.setAttribute('style', styleString);

			this.commitContent( { element : element } );
		},
		contents : 
		[
			{
				id : 'xd_property',
				label : '属性控件',
				title : '属性控件',
				elements : elements
			}
		]
	};
	
});