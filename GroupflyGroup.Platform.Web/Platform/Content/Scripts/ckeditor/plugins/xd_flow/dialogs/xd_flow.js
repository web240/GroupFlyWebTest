/**
 * 表单  视图控件
 * @author eric 2017-08-07
 */


CKEDITOR.dialog.add('xd_flow',function(editor){
	
	var elements = [
					{
						id : 'flowName',
						type : 'text',
						widths: ['85px', '325px'],
						labelLayout : 'horizontal',
						label : '视图名称：',
						labelStyle: 'font-weight:bold;text-align:right;',
						style: 'width:350px;margin-left:2px;display:none;'
					},
                    {
                        id: 'flowText',
                        type: 'text',
                        widths: ['85px', '325px'],
                        labelLayout: 'horizontal',
                        label: '视图全称：',
                        labelStyle: 'font-weight:bold;text-align:right',
                        style: 'width:350px;margin-left:2px;display:none;'
                    },
                    {
                        id: 'flowId',
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
						id : 'flowWidth',
						type : 'text',
						widths: ['85px', '325px'],
						labelLayout : 'horizontal',
						label : '控件宽度：',
						labelStyle : 'font-weight:bold',
						style: 'width:350px;margin-left:2px'
					},
					{
					    id: 'flowHeight',
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
			delete this.xd_flow;

			var element = this.getParentEditor().getSelection().getSelectedElement();

			if ( element )
			{
				this.xd_flow = element;
				this.setupContent( element );
				
				this.getContentElement('xd_flow', 'flowText').setValue(element.getAttribute('value'));
				this.getContentElement('xd_flow', 'flowName').setValue(element.getAttribute('flowname'));
				this.getContentElement('xd_flow', 'flowId').setValue(element.getAttribute('flowid'));
				this.getContentElement('xd_flow', 'parentId').setValue(element.getAttribute('parentid'));
				this.getContentElement('xd_flow', 'pathName').setValue(element.getAttribute('pathname'));

				
				var styleString = element.getAttribute('style');
				var styleArray = styleString.split(';');
				for(var i = 0; i < styleArray.length; i++){
					var itemArray = styleArray[i].split(':');
					if(itemArray[0] === 'width'){
						this.getContentElement('xd_flow','flowWidth').setValue(itemArray[1].substr(0,(itemArray[1].length - 2)));
					}
					if (itemArray[0] === 'height') {
					    this.getContentElement('xd_flow', 'flowHeight').setValue(itemArray[1].substr(0, (itemArray[1].length - 2)));
					}
				}
			}
		},
		onOk : function(){
			var editor,
				element = this.xd_flow,
				isInsertMode = !element;

			if (isInsertMode) {
			    editor = this.getParentEditor();
			    element = editor.document.createElement('img');
			    element.setAttribute('class', 'CALENDAR');
			    element.setAttribute('align', 'absMiddle');
			    element.setAttribute('element_type', 'xd_flow');

			    element.setAttribute('src', CKEDITOR.plugins.getPath("xd_flow") + 'flow.jpg');
			    element.setAttribute('img_type', 'date');

			    var element_index = XD_FORM_ELEMENT_INDEX();

			    element.setAttribute('name', 'DATA_' + element_index);
			    element.setAttribute('id', 'DATA_' + element_index);

			    editor.insertElement(element);
			} else {
			    element.setAttribute('element_type', 'xd_flow');
			}

			element.setAttribute('value', this.getContentElement('xd_flow', 'flowText').getValue());
			element.setAttribute('flowname', this.getContentElement('xd_flow', 'flowName').getValue());
			element.setAttribute('flowid', this.getContentElement('xd_flow', 'flowId').getValue());
			element.setAttribute('parentid', this.getContentElement('xd_flow', 'parentId').getValue());
			element.setAttribute('pathname', this.getContentElement('xd_flow', 'pathName').getValue());
			
			var styleString = '';
			var flowHeight = this.getContentElement('xd_flow', 'flowHeight').getValue();
			var flowWidth = this.getContentElement('xd_flow','flowWidth').getValue();
			if (flowHeight) {
			    styleString += ('height:' + flowHeight + 'px;');
			}
			if(flowWidth){
				styleString += ('width:' + flowWidth + 'px;');
			}
			element.setAttribute('style', styleString);

			this.commitContent( { element : element } );
		},
		contents : 
		[
			{
				id : 'xd_flow',
				label : '视图控件',
				title : '视图控件',
				elements : elements
			}
		]
	};
	
});