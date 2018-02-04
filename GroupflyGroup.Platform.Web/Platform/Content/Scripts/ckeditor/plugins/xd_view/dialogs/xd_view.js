/**
 * 表单  视图控件
 * @author eric 2017-08-07
 */


CKEDITOR.dialog.add('xd_view',function(editor){
	
	var elements = [
					{
						id : 'viewName',
						type : 'text',
						widths: ['85px', '325px'],
						labelLayout : 'horizontal',
						label : '视图名称：',
						labelStyle: 'font-weight:bold;text-align:right;',
						style: 'width:350px;margin-left:2px;display:none;'
					},
                    {
                        id: 'viewText',
                        type: 'text',
                        widths: ['85px', '325px'],
                        labelLayout: 'horizontal',
                        label: '视图全称：',
                        labelStyle: 'font-weight:bold;text-align:right',
                        style: 'width:350px;margin-left:2px;display:none;'
                    },
                    {
                        id: 'viewId',
                        type: 'text',
                        widths: ['85px', '325px'],
                        labelLayout: 'horizontal',
                        label: '视图id：',
                        labelStyle: 'font-weight:bold;text-align:right',
                        style: 'width:350px;margin-left:2px;'
                    },
                    {
                        id: 'parentId',
                        type: 'text',
                        widths: ['85px', '325px'],
                        labelLayout: 'horizontal',
                        label: '视图全称：',
                        labelStyle: 'font-weight:bold;text-align:right',
                        style: 'width:350px;margin-left:2px;display:none;'
                    },
                    {
                        id: 'pathName',
                        type: 'textarea',
                        widths: ['85px', '325px'],
                        labelLayout: 'horizontal',
                        label: '视图来源：',
                        labelStyle: 'font-weight:bold;text-align:right',
                        style: 'width:350px;margin-left:2px;'
                    },
					{
						id : 'viewWidth',
						type : 'text',
						widths: ['85px', '325px'],
						labelLayout : 'horizontal',
						label : '控件宽度：',
						labelStyle : 'font-weight:bold',
						style: 'width:350px;margin-left:2px'
					},
					{
					    id: 'viewHeight',
					    type: 'text',
					    widths: ['85px', '325px'],
					    label: '控件高度：',
					    labelLayout: 'horizontal',
					    labelStyle: 'font-weight:bold',
					    style: 'width:350px;margin-left:2px'
					}
				];	
	return {
		title : '视图控件',
		width : 350,
		height : 150,
		resizable : false,
		onShow : function(){
			delete this.xd_view;

			var element = this.getParentEditor().getSelection().getSelectedElement();

			if ( element )
			{
				this.xd_view = element;
				this.setupContent( element );
				
				this.getContentElement('xd_view', 'viewText').setValue(element.getAttribute('value'));
				this.getContentElement('xd_view', 'viewName').setValue(element.getAttribute('viewname'));
				this.getContentElement('xd_view', 'viewId').setValue(element.getAttribute('viewid'));
				this.getContentElement('xd_view', 'parentId').setValue(element.getAttribute('parentid'));
				this.getContentElement('xd_view', 'pathName').setValue(element.getAttribute('pathname'));

				
				var styleString = element.getAttribute('style');
				var styleArray = styleString.split(';');
				for(var i = 0; i < styleArray.length; i++){
					var itemArray = styleArray[i].split(':');
					if(itemArray[0] === 'width'){
						this.getContentElement('xd_view','viewWidth').setValue(itemArray[1].substr(0,(itemArray[1].length - 2)));
					}
					if (itemArray[0] === 'height') {
					    this.getContentElement('xd_view', 'viewHeight').setValue(itemArray[1].substr(0, (itemArray[1].length - 2)));
					}
				}
			}
		},
		onOk : function(){
			var editor,
				element = this.xd_view,
				isInsertMode = !element;

			if (isInsertMode) {
			    editor = this.getParentEditor();
			    element = editor.document.createElement('img');
			    element.setAttribute('class', 'CALENDAR');
			    element.setAttribute('align', 'absMiddle');
			    element.setAttribute('element_type', 'xd_view');

			    element.setAttribute('src', CKEDITOR.plugins.getPath("xd_view") + 'view.jpg');
			    element.setAttribute('img_type', 'date');

			    var element_index = XD_FORM_ELEMENT_INDEX();

			    element.setAttribute('name', 'DATA_' + element_index);
			    element.setAttribute('id', 'DATA_' + element_index);

			    editor.insertElement(element);
			} else {
			    element.setAttribute('element_type', 'xd_view');
			}

			element.setAttribute('value', this.getContentElement('xd_view', 'viewText').getValue());
			element.setAttribute('viewname', this.getContentElement('xd_view', 'viewName').getValue());
			element.setAttribute('viewid', this.getContentElement('xd_view', 'viewId').getValue());
			element.setAttribute('parentid', this.getContentElement('xd_view', 'parentId').getValue());
			element.setAttribute('pathname', this.getContentElement('xd_view', 'pathName').getValue());
			
			var styleString = '';
			var viewHeight = this.getContentElement('xd_view', 'viewHeight').getValue();
			var viewWidth = this.getContentElement('xd_view','viewWidth').getValue();
			if (viewHeight) {
			    styleString += ('height:' + viewHeight + 'px;');
			}
			if(viewWidth){
				styleString += ('width:' + viewWidth + 'px;');
			}
			element.setAttribute('style', styleString);

			this.commitContent( { element : element } );
		},
		contents : 
		[
			{
				id : 'xd_view',
				label : '视图控件',
				title : '视图控件',
				elements : elements
			}
		]
	};
	
});