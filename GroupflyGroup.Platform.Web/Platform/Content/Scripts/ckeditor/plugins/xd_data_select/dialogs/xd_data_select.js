/**
 * 讯点智能表单  数据选择控件
 * @author tony 2012-08-15
 */
 
//显示数据映射源设置
function set_field_src(selectValue){
	var selectObj = jQuery('#fieldSrc');
	if(selectObj){
		var option_html = get_select_map_field(selectValue,'');
		selectObj.html(option_html);
	}
}

//获取映射字段
function get_select_map_field(selectValue,defaultValue){
	var option_html = '';

	if(selectValue && selectValue != '0'){
		var list_field = XD_LISTVIEW_CONFIG[selectValue]['table_field'];
		for(var i = 0; i < list_field.length; i++){
			var selected = '';
			if(list_field[i][0] === defaultValue){
				selected = 'selected';
			}
			option_html += ('<option value="' + list_field[i][0] + '" ' + selected + ' >' + list_field[i][1] + '</option>');
		}
	}
	
	return option_html;
}

//清空已设置的映射字段
function clear_select_map_field(){
	var tableDom = document.getElementById('map_tbl');
	if(tableDom){
		var tableRows = tableDom.rows;
		
		for(var i = 1; i < tableRows.length; i++){
			
			var trObj = jQuery(tableRows[i]);		
			trObj.remove();
		}
	}
}

//添加映射字段
function add_map_field(){
	var fieldObj = document.getElementById('fieldSrc');
	var fieldSrcDis =  fieldObj[fieldObj.selectedIndex].text;
	var fieldDes = document.getElementById('fieldDes').value;
	var fieldSearch = document.getElementById('fieldSel');
	if(fieldSrc && fieldSel){
		var trHtml = '<tr style="height:25px;">' +
						'<td style="text-align:center;height:25px;">' +
							fieldObj.value +
						'</td>' +
						'<td style="text-align:center;height:25px;">' +
							fieldSrcDis +
						'</td>' +
						'<td style="text-align:center;height:25px;">' +
							fieldDes +
						'</td>' +
						'<td style="text-align:center;height:25px;">' +
							(fieldSearch.checked ? '是' : '否') +
						'</td>' +
						'<td style="text-align:center;height:25px;">' +
							'<a href="#" style="color:blue;" onclick="del_map_field(this)">删除</a>' +
						'</td>' +
					'</tr>';
		jQuery('#map_tbl').append(trHtml);
	}
}

//删除行
function del_map_field(obj){	
	var userAgent = navigator.userAgent.toLowerCase();
	var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
	var del_tr=obj.parentNode.parentNode; 	
	if(is_moz){    
		del_tr.parentNode.removeChild(del_tr);  
	} else {    
		del_tr.removeNode(true);
	}
}

//获取映射字段值
function get_table_field(){
	var table_value = {data_field:'',data_fld_name:'',data_control:'',data_query:''};
	
	var tableDom = document.getElementById('map_tbl');
	if(tableDom){
		var trArray = tableDom.rows;
		
		if(trArray.length > 1){
			for(var i = 1; i < trArray.length; i++){
				var tr_obj = trArray[i];
				var cell_obj = tr_obj.cells;
				if(cell_obj[0].innerHTML){
					for(var j = 0; j < cell_obj.length; j++){
						switch(j){
							case 0: 
								table_value['data_field'] += (i != 1 ? ('`' + cell_obj[j].innerHTML) : cell_obj[j].innerHTML);
								break;
							case 1:
								table_value['data_fld_name'] += (i != 1 ? ('`' + cell_obj[j].innerHTML) : cell_obj[j].innerHTML);
								break;
							case 2:
								table_value['data_control'] += (i != 1 ? ('`' + cell_obj[j].innerHTML) : cell_obj[j].innerHTML);
								break;
							case 3:
								if(cell_obj[j].innerHTML == '是'){
									table_value['data_query'] += (i != 1 ? ('`1') : '1');
								} else {
									table_value['data_query'] += (i != 1 ? ('`0') : '0');
								}
								break;
						}
					}
				}
			}
		}
	}
	
	return table_value;
}

//封装列表信息
function init_data_select_tab(table_value){
	if(table_value){
		var data_field_array = table_value['data_field'].split('`');
		var data_fld_name_array = table_value['data_fld_name'].split('`');
		var data_control_array = table_value['data_control'].split('`');
		var data_query_array = table_value['data_query'].split('`');
		
		var tableDom = document.getElementById('map_tbl');
		var trArray = tableDom.rows;
		var trLength = trArray.length;
		
		if(trLength > 1){
			for(var i = trLength; i > 1; i--){
				tableDom.deleteRow(i-1);
			}
		}
		
		for(var i = 0; i < data_field_array.length; i++){
			var trHtml = '<tr style="height:25px;">' +
							'<td style="text-align:center;height:25px;">' +
								data_field_array[i] +
							'</td>' +
							'<td style="text-align:center;height:25px;">' +
								data_fld_name_array[i] +
							'</td>' +
							'<td style="text-align:center;height:25px;">' +
								data_control_array[i] +
							'</td>' +
							'<td style="text-align:center;height:25px;">' +
								(data_query_array[i] == '0' ? '否' : '是') +
							'</td>' +
							'<td style="text-align:center;height:25px;">' +
								'<a href="#" style="color:blue;" onclick="del_map_field(this)">删除</a>' +
							'</td>' +
						'</tr>';
			jQuery('#map_tbl').append(trHtml);
		}
	}
}

 
CKEDITOR.dialog.add('xd_data_select',function(editor){
	var selectSrc = [['---选择数据源---','0']];
	if(XD_LISTVIEW_CONFIG){
		for(var key in XD_LISTVIEW_CONFIG){
			var item = XD_LISTVIEW_CONFIG[key];
			selectSrc.push([item['table_name'],key]);
		}
	}
	
	return {
		title : '数据选择控件',
		width : 500,
		height : 300,
		resizable : false,
		style : 'overflow:scroll',
		onShow : function(){
			delete this.xd_data_select;
			
			var element = this.getParentEditor().getSelection().getSelectedElement();
			
			document.getElementById('fieldSrc').value = '';
			document.getElementById('fieldDes').value = '';
			document.getElementById('fieldSel').checked = false;
			
			clear_select_map_field();
			
			if ( element )
			{
				this.xd_data_select = element;
				//this.setupContent( element );
				alert('zheli');
				set_field_src(element.getAttribute('data_table'));
				this.getContentElement('xd_data_select','dselectName').setValue(element.getAttribute('title'));
				if(element.getAttribute('data_type') == '0'){
					document.getElementById('dselectType1').checked = true;
				} else {
					document.getElementById('dselectType2').checked = true;
				}
				this.getContentElement('xd_data_select','dselectSrc').setValue(element.getAttribute('data_table'));
				
				var table_value = {
									'data_field' : element.getAttribute('data_field'),
									'data_fld_name' : element.getAttribute('data_fld_name'),
									'data_control' : element.getAttribute('data_control'),
									'data_query' : element.getAttribute('data_query')
								};
				init_data_select_tab(table_value);
			}
		},
		onOk : function(){
			var editor,
				element = this.xd_data_select,
				isInsertMode = !element;

			if ( isInsertMode )
			{
				editor = this.getParentEditor();
				element = editor.document.createElement( 'button' );
				element.setAttribute( 'class', 'DATASELECT' );
				element.setAttribute('align','absMiddle');

				element.setAttribute('button_type','data_select');
				
				var element_index = XD_FORM_ELEMENT_INDEX();
				
				element.setAttribute('name','DATA_' + element_index);
				element.setAttribute('id','DATA_' + element_index);
				
				element.setAttribute('element_type','xd_data_select');
			
				
				editor.insertElement( element );
			}
			
			element.setAttribute('title',this.getContentElement('xd_data_select','dselectName').getValue());
			element.setHtml(this.getContentElement('xd_data_select','dselectName').getValue());
			
			element.setAttribute('data_table',this.getContentElement('xd_data_select','dselectSrc').getValue());
			element.setAttribute('data_type',(document.getElementById('dselectType1').checked ? '0' : '1'));
			
			var tableValue = get_table_field();
			element.setAttribute('data_field',tableValue['data_field']);
			element.setAttribute('data_fld_name',tableValue['data_fld_name']);
			element.setAttribute('data_control',tableValue['data_control']);
			element.setAttribute('data_query',tableValue['data_query']);
			
			
			this.commitContent( { element : element } );
		},
		contents : 
		[
			{
				id : 'xd_data_select',
				label : '数据选择控件属性',
				title : '数据选择控件',
				elements : 
				[
					{
						id : 'dselectName',
						type : 'text',
						widths : ['100px','300px'],
						label : '控件名称：',
						labelStyle : 'font-weight:bold;',
						labelLayout : 'horizontal',
						style : 'width:300px;margin-left:25px;'
					},
					{
						type : 'hbox',
						widths : ['100px','400px'],
						children :
						[
							{
								type : 'html',
								html : '<div style="font-weight:bold;">数据选择方式：</div>'
							},
							{
								type : 'html',
								html : '<div><input type="radio" id="dselectType1" name="dselectType" value="1" checked />弹出窗口选择&nbsp;&nbsp;' +
											'<input type="radio" id="dselectType2" name="dselectType" value="2" />根据录入项自动关联'
							}
						]
					},
					{
						id : 'dselectSrc',
						type : 'select',
						widths : ['100px','230px'],
						label : '数据来源：',
						labelStyle : 'font-weight:bold',
						labelLayout : 'horizontal',
						style : 'width:230px;margin-left:25px;',
						items : selectSrc,
						onChange : function(){
							//显示隐射字段
							var selectValue = this.getValue();
							set_field_src(selectValue);
							
							//清空字段映射信息
							clear_select_map_field();
						}
					},
					{
						type : 'html',
						html : '<div id="fieldAssociate" style="width:350px;text-align:center;">' +
								'<div><span style="font-weight:bold;width:150px;">添加映射关系：</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 
									'<select id="fieldSrc"></select>-' +
									'<input type="text" size="15" id="fieldDes" />' +
									'<input type="checkbox" id="fieldSel" value="1" />查询' +
									'&nbsp;<a href="javascript:void(0);" onclick="add_map_field()" style="color:blue;">添加</a>' +
								'</div>' +
								'<div style="width:480px;margin-top:5px;margin-left:10px;height:200px;overflow-y:scroll;">' +
									'<table id="map_tbl" border="1" style="width:380px" align="center">' +
										'<tbody>' +
											'<tr style="height:25px;">' +
												'<th style="width:80px;text-align:center;">数据库字段</th>' +
												'<th style="width:80px;text-align:center;">字段名称</th>' +
												'<th style="width:80px;text-align:center;">映射控件名称</th>' +
												'<th style="width:80px;text-align:center;">作为查询字段</th>' +
												'<th style="width:80px;text-align:center;">操作</th>' +
											'</tr>' +
										'</tbody>' +
									'</table>' +
								'</div>'
					}
				]
			}
		]
	};
	
});