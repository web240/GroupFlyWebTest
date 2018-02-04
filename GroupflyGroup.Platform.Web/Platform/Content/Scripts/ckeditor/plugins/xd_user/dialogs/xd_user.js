/**
 * 讯点智能表单  用户部门控件
 * @author tony 2012-08-14
 */

CKEDITOR.dialog.add('xd_user',function(editor){
	
	
	return {
		title : '用户部门控件属性',
		width : 300,
		height : 150,
		resizable : false,
		onShow: function () {
			delete this.xd_user;

			var element = this.getParentEditor().getSelection().getSelectedElement();

			if ( element )
			{
				this.xd_user = element;
				this.setupContent( element );
				
				this.getContentElement('xd_user','userName').setValue(element.getAttribute('title'));
				this.getContentElement('xd_user','userType').setValue(element.getAttribute('user_type'));
			}
		},
		onOk : function(){
			var editor,
				element = this.xd_user,
				isInsertMode = !element;

			if ( isInsertMode )
			{
				editor = this.getParentEditor();
				element = editor.document.createElement( 'img' );
				element.setAttribute( 'class', 'DEPTUSER' );
				element.setAttribute('align','absMiddle');

				element.setAttribute('img_type','user');
				element.setAttribute('src', CKEDITOR.plugins.getPath("xd_user") + 'user.gif');
				
				var element_index = XD_FORM_ELEMENT_INDEX();
				
				element.setAttribute('name','DATA_' + element_index);
				element.setAttribute('id','DATA_' + element_index);
			
				
				editor.insertElement( element );
			}
			
			element.setAttribute('title',this.getContentElement('xd_user','userName').getValue());
			element.setAttribute('user_type',this.getContentElement('xd_user','userType').getValue());
			
			element.setAttribute('element_type','xd_user');
			
			this.commitContent( { element : element } );
		},
		contents : 
		[
			{
				id : 'xd_user',
				label : '用户部门控件属性',
				title : '用户部门控件属性',
				elements : 
				[
					{
						id : 'userName',
						type : 'text',
						widths : ['30%','50%'],
						label : '对应的输入框控件名称：',
						labelLayout : 'horizontal',
						labelStyle : 'font-weight:bold'
					},
					
					{
						id : 'userType',
						type : 'select',
						widths : ['47%','50%'],
						label : '选择类型：',
						labelLayout : 'horizontal',
						labelStyle : 'font-weight:bold',
						items : 
						[
							['选择部门','dept'],
							['选择人员','user']
						]
					},
					{
						type : 'html',
						html : '<div style="font-size: 10pt;font-family:宋体;color:blue;word-wrap:break-word;width:280px;">' +
								'<span style="font-weight:bold;">说明：</span>选择的人员将回填到该输入框中，可配合自动<br>选人规则中的“从表单字段选择”功能使用。</div>'
					}
				]
			}
		]
	};
	
});