/**
 * 讯点智能表单  宏控件
 * @author tony 2012-08-14
 */

//显示SQL语句
function displaySQL(){
	var dataFld = document.getElementById('autoItemType').value;
	var dataSrc = document.getElementById('displaySql');
	if(dataFld === 'SYS_SQL' || dataFld === 'SYS_LIST_SQL'){
		if(dataSrc.style.display === 'none'){
			dataSrc.style.display = 'block';
		}
	} else {
		document.getElementById('autoSql').value = '';
		dataSrc.style.display = 'none';
	}
}
 
CKEDITOR.dialog.add('xd_auto',function(editor){
	
	var elements = [
					{
						id : 'autoName',
						type : 'text',
						widths : [ '80px','150px' ],
						labelLayout : 'horizontal',
						label : '宏控件名称：',
						labelStyle : 'font-weight:bold;text-align:right',
						style : 'width:150px;margin-left:2px;'
					},
					{
						type : 'hbox',
						widths : ['80px','200px'],
						children : 
						[
							{
								type : 'html',
								html : '<div style="font-weight:bold;text-align:right;width:70px;">宏控件类型：</div>'
							},
							{
								type : 'html',
								html : '<select id="autoItemType" onchange="displaySQL()">' +
											'<optgroup label="----单行输入框----">' +
												'<option value="SYS_DATE">当前日期，形如：1999-01-01</option>' +
												'<option value="SYS_DATE_CN">当前日期，形如：2009年1月1日</option>' +
												'<option value="SYS_DATE_CN_SHORT3">当前日期，形如：2009年</option>' +
												'<option value="SYS_DATE_CN_SHORT4">当前年份，形如：2009</option>' +
												'<option value="SYS_DATE_CN_SHORT1">当前日期，形如：2009年1月</option>' +
												'<option value="SYS_DATE_CN_SHORT2">当前日期，形如：1月1日</option>' +
												'<option value="SYS_TIME">当前时间</option>' +
												'<option value="SYS_DATETIME">当前日期+时间</option>' +
												'<option value="SYS_WEEK">当前星期中的第几天，形如：星期一</option>' +
												'<option value="SYS_USERID">当前用户ID</option>' +
												'<option value="SYS_USERNAME">当前用户姓名</option>' +
												'<option value="SYS_DEPTNAME">当前用户部门(长名称)</option>' +
												'<option value="SYS_DEPTNAME_SHORT">当前用户部门(短名称)</option>' +
												'<option value="SYS_USERPRIV">当前用户角色</option>' +
												'<option value="SYS_USERPRIVOTHER">当前用户辅助角色</option>' +
												'<option value="SYS_USERNAME_DATE">当前用户姓名+日期</option>' +
												'<option value="SYS_USERNAME_DATETIME">当前用户姓名+日期+时间</option>' +
												'<option value="SYS_FORMNAME">表单名称</option>' +
												'<option value="SYS_RUNNAME">工作名称/文号</option>' +
												'<option value="SYS_RUNDATE">流程开始日期</option>' +
												'<option value="SYS_RUNDATETIME">流程开始日期+时间</option>' +
												'<option value="SYS_RUNID">流水号</option>' +
												'<option value="SYS_AUTONUM">文号计数器</option>' +
												'<option value="SYS_IP">经办人IP地址</option>' +
												'<option value="SYS_MANAGER1">部门主管(本部门)</option>' +
												'<option value="SYS_MANAGER2">部门主管(上级部门)</option>' +
												'<option value="SYS_MANAGER3">部门主管(一级部门)</option>' +
												'<option value="SYS_SQL">来自SQL查询语句</option>' +
											'</optgroup>' +
											'<optgroup label="----下拉菜单----">' +
												'<option value="SYS_LIST_DEPT">部门列表</option>' +
												'<option value="SYS_LIST_USER">人员列表</option>' +
												'<option value="SYS_LIST_PRIV">角色列表</option>' +
												//'<option value="SYS_LIST_PRIV_ONLY">主角色列表</option>' +
												//'<option value="SYS_LIST_PRIV_OTHER">辅助角色列表</option>' +
												//'<option value="SYS_LIST_PRCSUSER1">流程设置所有经办人列表</option>' +
												//'<option value="SYS_LIST_PRCSUSER2">本步骤设置经办人列表</option>' +
												//'<option value="SYS_LIST_MANAGER1">部门主管(本部门)</option>' +
												//'<option value="SYS_LIST_MANAGER2">部门主管(上级部门)</option>' +
												//'<option value="SYS_LIST_MANAGER3">部门主管(一级部门)</option>' +
												'<option value="SYS_LIST_SQL">来自SQL查询语句的列表</option>' +
											'</optgroup>' +
										'</select>'
							}
						]
					},
					{
						type : 'html',
						html : '<div id="displaySql" style="display:none;" ><div><span style="font-weight:bold;vertical-align:top;">SQL查询语句:</span><textarea id="autoSql" rows="5" cols="40"></textarea></div><div style="color:red;">注意：SQL语句中的\'号需要用`替换</div></div>'
					},
					{
						id : 'autoFontSize',
						type : 'text',
						widths : [ '80px','150px' ],
						labelLayout : 'horizontal',
						label : '  字体大小：',
						labelStyle : 'font-weight:bold;text-align:right',
						style : 'width:150px;margin-left:15px;'
					},
					{
						id : 'autoWidth',
						type : 'text',
						widths : [ '80px','150px' ],
						labelLayout : 'horizontal',
						label : '宏控件宽度：',
						labelStyle : 'font-weight:bold',
						style : 'width:150px;margin-left:2px;'
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
		title : '宏控件属性',
		width : 300,
		height : 150,
		resizable : false,
		onShow : function(){
			delete this.xd_auto;

			var element = this.getParentEditor().getSelection().getSelectedElement();

			if ( element )
			{
				this.xd_auto = element;
				this.setupContent( element );
				
				this.getContentElement('xd_auto','autoName').setValue(element.getAttribute('title'));
				document.getElementById('autoItemType').value = element.getAttribute('datafld');
				document.getElementById('autoSql').value = element.getAttribute('datasrc');
				
				var styleString = element.getAttribute('style');
				var styleArray = styleString.split(';');
				for(var i = 0; i < styleArray.length; i++){
					var itemArray = styleArray[i].split(':');
					if(itemArray[0] === 'font-size'){
						this.getContentElement('xd_auto','autoFontSize').setValue(itemArray[1].substr(0,(itemArray[1].length - 2)));
					}
					if(itemArray[0] === 'width'){
						this.getContentElement('xd_auto','autoWidth').setValue(itemArray[1].substr(0,(itemArray[1].length - 2)));
					}
				}
				
				if(typeof(MODULE_CONFIG) !== 'undefined'){
					this.getContentElement('xd_auto','module_field').setValue(element.getAttribute('module_field'));
				}
			}
			
			displaySQL();
		},
		onOk : function(){
			var editor,
				element = this.xd_auto,
				isInsertMode = !element;

			if ( isInsertMode )
			{
				editor = this.getParentEditor();
				element = editor.document.createElement( 'input' );
				element.setAttribute( 'class', 'AUTO' );
				element.setAttribute('align','absMiddle');

				element.setAttribute('input_type','auto');
				element.setAttribute('value','XDCRO');
				
				var element_index = XD_FORM_ELEMENT_INDEX();
				
				element.setAttribute('name','DATA_' + element_index);
				element.setAttribute('id','DATA_' + element_index);
			
				
				editor.insertElement( element );
			}
			
			element.setAttribute('title',this.getContentElement('xd_auto','autoName').getValue());
			
			var styleString = '';
			var autoFontSize = this.getContentElement('xd_auto','autoFontSize').getValue();
			var autoWidth = this.getContentElement('xd_auto','autoWidth').getValue();
			if(autoFontSize){
				styleString += ('font-size:' + autoFontSize + 'px;');
			}
			if(autoWidth){
				styleString += ('width:' + autoWidth + 'px;');
			}
			element.setAttribute('style',styleString);
			element.setAttribute('datafld',document.getElementById('autoItemType').value);
			if(document.getElementById('displaySql').style.display !== 'none'){
				element.setAttribute('datasrc',document.getElementById('autoSql').value);
			} else {
				element.removeAttribute('datasrc');
			}
			
			element.setAttribute('element_type','xd_auto');
			
			if(typeof(MODULE_CONFIG) !== 'undefined'){
				element.setAttribute('module_field',this.getContentElement('xd_auto','module_field').getValue());
			}
			
			this.commitContent( { element : element } );
		},
		contents : 
		[
			{
				id : 'xd_auto',
				label : '宏控件',
				title : '宏控件',
				elements : elements
			}
		]
	};
	
});