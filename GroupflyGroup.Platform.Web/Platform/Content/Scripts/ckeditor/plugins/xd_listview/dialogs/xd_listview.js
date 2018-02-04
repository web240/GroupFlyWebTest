/**
 * 讯点表单智能设计器
 */

//插入行
function insert_row(){
	var tableDom = document.getElementById('tb_attr');
	
	if(tableDom){
		var data_table = document.getElementById('select_table');
		var opHtml = '';
		if(data_table){
			if(data_table.value !== '0'){
				opHtml = get_src_field_select(data_table.value);
			}
		}
	
		var rnum = tableDom.rows.length;  
		
		var trHtml = '<tr style="height:25px;">' +
									'<td style="text-align:center;height:25px;">'+rnum+'</td>' +
									'<td style="text-align:center;height:25px;">' +
										'<input type="text" size="20" value="" />' +
									'</td>' +
									'<td style="text-align:center;height:25px;">' +
										'<input type="text" size="5" value="" />' +
									'</td>' +
									'<td style="text-align:center;height:25px;">' +
										'<input type="checkbox" value="1" />' +
									'</td>' +
									'<td style="text-align:center;height:25px;">' +
										'<input type="text" size="20" value="" />' +
									'</td>' +
									'<td style="text-align:center;height:25px;">' +
										'<select>' +
											'<option value="text">单行输入框</option>' +
											'<option value="textarea">多行输入框</option>' +
											'<option value="select">下拉框</option>' +
											'<option value="radio">单选按钮</option>' + 
											'<option value="checkbox">复选框</option>' +
											'<option value="datetime">日期</option>' +
										'</select>' +
									'</td>' +
									'<td style="text-align:center;height:25px;">' +
										'<input type="text" size="30" value="" />' +
									'</td>';
   
		if(opHtml){
			trHtml += ('<td style="text-align:center;height:25px;">' +
							(opHtml ? ('<select>' + opHtml + '</select>') : '') +
						'</td>' + 
						'<td style="text-align:center;height:25px;">' +
							(opHtml ? ('<input type="checkbox" value="1" />查询') : '') +
						'</td>' +
					'</tr>');
		} else {
			trHtml += '</tr>';
		}
   
		 jQuery('#tb_attr').append(trHtml);
	}
}

//清空信息
function clear_listview(){
	var tableDom = document.getElementById('tb_attr');
	if(tableDom){
		var trArray = tableDom.rows;
		var trLength = trArray.length;
		
		if(trLength > 1){
			for(var i = trLength; i > 1; i--){
				tableDom.deleteRow(i-1);
			}
		}
		
		
		jQuery('#tb_attr').append('<tr style="height:25px;">' +
									'<td style="text-align:center;height:25px;">1</td>' +
									'<td style="text-align:center;height:25px;">' +
										'<input type="text" size="20" value="" />' +
									'</td>' +
									'<td style="text-align:center;height:25px;">' +
										'<input type="text" size="5" value="" />' +
									'</td>' +
									'<td style="text-align:center;height:25px;">' +
										'<input type="checkbox" value="1" />' +
									'</td>' +
									'<td style="text-align:center;height:25px;">' +
										'<input type="text" size="20" value="" />' +
									'</td>' +
									'<td style="text-align:center;height:25px;">' +
										'<select>' +
											'<option value="text">单行输入框</option>' +
											'<option value="textarea">多行输入框</option>' +
											'<option value="select">下拉框</option>' +
											'<option value="radio">单选按钮</option>' + 
											'<option value="checkbox">复选框</option>' +
											'<option value="datetime">日期</option>' +
										'</select>' +
									'</td>' +
									'<td style="text-align:center;height:25px;">' +
										'<input type="text" size="30" value="" />' +
									'</td>' +
								'</tr>'
								);
	}
}

//封装列表信息
function set_tr_html(table_value,selectValue){
	if(table_value){
		var lv_title_array = table_value['lv_title'].split('`');
		var lv_size_array = table_value['lv_size'].split('`');
		var lv_sum_array = table_value['lv_sum'].split('`');
		var lv_cal_array = table_value['lv_cal'].split('`');
		var lv_coltype_array = table_value['lv_coltype'].split('`');
		var lv_value_array = table_value['lv_value'].split('`');
		var data_field_array = table_value['data_field'].split('`');
		var data_query_array = table_value['data_query'].split('`');
		
		var tableDom = document.getElementById('tb_attr');
		var trArray = tableDom.rows;
		var trLength = trArray.length;
		
		if(trLength > 1){
			for(var i = trLength; i > 1; i--){
				tableDom.deleteRow(i-1);
			}
		}
		
		for(var i = 0; i < lv_title_array.length; i++){
			var trHtml = '<tr style="height:25px;">' +
							'<td style="text-align:center;height:25px;">'+(i + 1)+'</td>' +
							'<td style="text-align:center;height:25px;">' +
								'<input type="text" size="20" value="'+lv_title_array[i]+'" />' +
							'</td>' +
							'<td style="text-align:center;height:25px;">' +
								'<input type="text" size="5" value="'+lv_size_array[i]+'" />' +
							'</td>' +
							'<td style="text-align:center;height:25px;">' +
								'<input type="checkbox" value="1" '+(lv_sum_array[i] === '1' ? 'checked' : '')+' />' +
							'</td>' +
							'<td style="text-align:center;height:25px;">' +
								'<input type="text" size="20" value="'+lv_cal_array[i]+'" />' +
							'</td>' +
							'<td style="text-align:center;height:25px;">' +
								'<select>' +
									'<option value="text" '+(lv_coltype_array[i] === 'text' ? 'selected' : '')+' >单行输入框</option>' +
									'<option value="textarea" '+(lv_coltype_array[i] === 'textarea' ? 'selected' : '')+' >多行输入框</option>' +
									'<option value="select" '+(lv_coltype_array[i] === 'select' ? 'selected' : '')+' >下拉框</option>' +
									'<option value="radio" '+(lv_coltype_array[i] === 'radio' ? 'selected' : '')+' >单选按钮</option>' + 
									'<option value="checkbox" '+(lv_coltype_array[i] === 'checkbox' ? 'selected' : '')+' >复选框</option>' +
									'<option value="datetime" '+(lv_coltype_array[i] === 'datetime' ? 'selected' : '')+' >日期</option>' +
								'</select>' +
							'</td>' +
							'<td style="text-align:center;height:25px;">' +
								'<input type="text" size="30" value="'+lv_value_array[i]+'" />' +
							'</td>';
			if(selectValue && selectValue !== '0'){
				trHtml += ('<td style="text-align:center;height:25px;">' +
								'<select>' +
									get_src_field_select(selectValue,data_field_array[i]) +
								'</select>' +
							'</td>' +
							'<td style="text-align:center;height:25px;">' +
								'<input type="checkbox" value="1" '+(data_query_array[i] === '1' ? 'checked' : '')+' />查询' +
							'</td>' +
						'</tr>');
			} else {
				trHtml += '</tr>';
			}
			jQuery('#tb_attr').append(trHtml);
		}
	}
}

//获取列表的所有设置值
function get_list_value(){

	var table_value = {lv_title:'',lv_size:'',lv_sum:'',lv_cal:'',lv_coltype:'',lv_value:'',data_field:'',data_query:''};
	
	var tableDom = document.getElementById('tb_attr');
	if(tableDom){
		var trArray = tableDom.rows;
		
		if(trArray.length > 1){
			for(var i = 1; i < trArray.length; i++){
				var tr_obj = trArray[i];
				var cell_obj = tr_obj.cells;
				if(cell_obj[1].children[0].value){
					for(var j = 1; j < cell_obj.length; j++){
						var cellArray = cell_obj[j].children;
						switch(j){
							case 1: 
								table_value['lv_title'] += (i != 1 ? ('`' + cellArray[0].value) : cellArray[0].value);
								break;
							case 2:
								table_value['lv_size'] += (i != 1 ? ('`' + cellArray[0].value) : cellArray[0].value);
								break;
							case 3:
								if(cellArray[0].checked){
									table_value['lv_sum'] += (i != 1 ? ('`1') : '1');
								} else {
									table_value['lv_sum'] += (i != 1 ? ('`0') : '0');
								}
								break;
							case 4:
								table_value['lv_cal'] += (i != 1 ? ('`' + cellArray[0].value) : cellArray[0].value);
								break;
							case 5:
								table_value['lv_coltype'] += (i != 1 ? ('`' + cellArray[0].value) : cellArray[0].value);
								break;
							case 6:
								table_value['lv_value'] += (i != 1 ? ('`' + cellArray[0].value) : cellArray[0].value);
								break;
							case 7:
								table_value['data_field'] += (i != 1 ? ('`' + cellArray[0].value) : cellArray[0].value);
								break;
							case 8:
								if(cellArray[0].checked){
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

//显示数据映射源设置
function display_map_field(selectValue){
	var tableDom = document.getElementById('tb_attr');
	if(tableDom){
		var tableRows = tableDom.rows;
		
		for(var i = 0; i < tableRows.length; i++){
			
			var trObj = jQuery(tableRows[i]);		
			//如果已经存在映射字段和查询字段删除
			
			if(selectValue !== '0'){
				var trTds = tableRows[i].cells;
				if(trTds.length > 7){
					jQuery(trTds[trTds.length - 1]).remove();
					jQuery(trTds[trTds.length - 1]).remove();
				}
			
				if(i == 0){
					trObj.append('<th style="text-align:center;height:25px;" width="15%">映射字段</th>' +
									'<th style="text-align:center;height:25px;" width="7%">查询值</th>');
				} else {
					trObj.append('<td style="text-align:center;height:25px;">' +
									'<select>' +
										get_src_field_select(selectValue) +
									'</select>' +
								 '</td>' +
								 '<td style="text-align:center;height:25px;">' +
									'<input type="checkbox" value="1" />查询' +
								 '</td>'
								 );
				}
			} else {
				var trTds = tableRows[i].cells;
				if(trTds.length > 7){
					jQuery(trTds[trTds.length -1]).remove();
					jQuery(trTds[trTds.length - 1]).remove();
				}
			}
		}
	}
}

//获取外部数据源字段下拉框
function get_src_field_select(select_field,defaultValue){
	var option_html = '';

	if(select_field && select_field != '0'){
		option_html = '<option value="0"';
		if(!defaultValue){
			option_html += ' selected >请选择映射字段</option>';
		} else {
			option_html += '>请选择映射字段</option>';
		}
		
		var list_field = XD_LISTVIEW_CONFIG[select_field]['table_field'];
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
 
CKEDITOR.dialog.add( 'xd_listview', function( editor ){
	var table_html = 
					 '<div style="text-align:center"><span>列表属性</span></div>' +
					 '<div style="width:700px;">' +
						'<div>' +
							'<input type="button" onclick="insert_row()" value="添加行" />' +
						'</div>' +
						'<div style="width:900px;height:250px;overflow-x:scroll;"><table id="tb_attr" border="1" style="width:880px;" >' +
							'<tr style="height:25px;">' +
								'<th style="text-align:center;height:25px;" width="3%">序号</th>' +
								'<th style="text-align:center;height:25px;" width="10%">列表控件表头名称</th>' +
								'<th style="text-align:center;height:25px;" width="5%">宽度</th>' +
								'<th style="text-align:center;height:25px;" width="10%">合计</th>' +
								'<th style="text-align:center;height:25px;" width="15%">计算公式</th>' +
								'<th style="text-align:center;height:25px;" width="15%">类型</th>' +
								'<th style="text-align:center;height:25px;" width="20%">值(多个值之间用英文逗号分隔)</th>' +
								'<th style="text-align:center;height:25px;display:none;" width="15%">映射字段</th>' +
								'<th style="text-align:center;height:25px;display:none;" width="7%">查询值</th>' +
							'</tr>' +
							'<tr style="height:25px;">' +
								'<td style="text-align:center;height:25px;">1</td>' +
								'<td style="text-align:center;height:25px;">' +
									'<input type="text" size="20" value="" />' +
								'</td>' +
								'<td style="text-align:center;height:25px;">' +
									'<input type="text" size="5" value="" />' +
								'</td>' +
								'<td style="text-align:center;height:25px;">' +
									'<input type="checkbox" value="1" />' +
								'</td>' +
								'<td style="text-align:center;height:25px;">' +
									'<input type="text" size="20" value="" />' +
								'</td>' +
								'<td style="text-align:center;height:25px;">' +
									'<select>' +
										'<option value="text">单行输入框</option>' +
										'<option value="textarea">多行输入框</option>' +
										'<option value="select">下拉框</option>' +
										'<option value="radio">单选按钮</option>' + 
										'<option value="checkbox">复选框</option>' +
										'<option value="datetime">日期</option>' +
									'</select>' +
								'</td>' +
								'<td style="text-align:center;height:25px;">' +
									'<input type="text" size="30" value="" />' +
								'</td>' +
							'</tr>' +
						'</table></div>' +
					'</div>';
					
	var dataSelect = [['---选择数据源---','0']];
	//if(XD_LISTVIEW_CONFIG){
	//	for(var key in XD_LISTVIEW_CONFIG){
	//		var item = XD_LISTVIEW_CONFIG[key];
	//		dataSelect.push([item['table_name'],key]);
	//	}
	//}
	

	return {
		title : '列表控件属性',
		width : 900,
		height : 250,
		resizable : false,
		onShow: function () {
			clear_listview();
			
			delete this.listview;

			var element = this.getParentEditor().getSelection().getSelectedElement();

			if ( element )
			{
				this.listview = element;
				this.setupContent( element );
				
				//设置列表的值
				var table_value = {lv_title:'',lv_size:'',lv_sum:'',lv_cal:'',lv_coltype:'',lv_value:'',data_field:'',data_query:''};
				table_value['lv_title'] = element.getAttribute('lv_title');
				table_value['lv_size'] = element.getAttribute('lv_size');
				table_value['lv_sum'] = element.getAttribute('lv_sum');
				table_value['lv_cal'] = element.getAttribute('lv_cal');
				table_value['lv_coltype'] = element.getAttribute('lv_coltype');
				table_value['lv_value'] = element.getAttribute('lv_value');
				table_value['data_field'] = element.getAttribute('data_field');
				table_value['data_query'] = element.getAttribute('data_query');
				
				this.getContentElement('xd_listview','data_table').setValue(element.getAttribute('data_table'));
				
				set_tr_html(table_value,element.getAttribute('data_table'));
				
				this.getContentElement('xd_listview','txtName').setValue(element.getAttribute('title'));
			}
		},
		onOk : function(){
			var editor,
				element = this.listview,
				isInsertMode = !element;

			if ( isInsertMode )
			{
				editor = this.getParentEditor();
				element = editor.document.createElement( 'img' );
				element.setAttribute( 'class', 'LISTVIEW' );
				element.setAttribute('align','absMiddle');
				element.setAttribute('title',this.getContentElement('xd_listview','txtName').getValue());
				element.setAttribute('src', CKEDITOR.plugins.getPath("xd_listview") + 'listview.gif');
				element.setAttribute('img_type','listview');
				
				var element_index = XD_FORM_ELEMENT_INDEX();
				
				element.setAttribute('name','DATA_' + element_index);
				element.setAttribute('id','DATA_' + element_index);
			
				
				editor.insertElement( element );
			}
			
			var table_value = get_list_value();
			element.setAttribute('lv_title',table_value['lv_title']);
			element.setAttribute('lv_size',table_value['lv_size']);
			element.setAttribute('lv_sum',table_value['lv_sum']);
			element.setAttribute('lv_cal',table_value['lv_cal']);
			element.setAttribute('lv_coltype',table_value['lv_coltype']);
			element.setAttribute('lv_value',table_value['lv_value']);
			element.setAttribute('data_table',this.getContentElement('xd_listview','data_table').getValue());
			element.setAttribute('data_field',table_value['data_field']);
			element.setAttribute('data_query',table_value['data_query']);
			
			element.setAttribute('element_type','xd_listview');
			
			element.setAttribute('title',this.getContentElement('xd_listview','txtName').getValue());
			
			this.commitContent( { element : element } );
		},
		contents : [
			{
				id : 'xd_listview',
				label : '列表控件属性',
				title : '列表控件属性',
				elements : 
				[
					{
						id : 'txtName',
						type : 'text',
						label : '控件名称：',
						widths : ['5%','100px'],
						labelLayout : 'horizontal',
						labelStyle : 'font-weight:bold',
						style : 'width:250px'
					},
					{
						id : 'data_table',
						type : 'select',
						widths : ['5%','100px'],
						label : '数据来源：',
						labelLayout : 'horizontal',
						labelStyle : 'font-weight:bold',
						style : 'width:180px',
						'default' : '0',
						items : dataSelect,
						onChange : function(){
							//显示隐射字段
							var selectValue = this.getValue();
							display_map_field(selectValue);
							
							document.getElementById('select_table').value = selectValue;
						}
					},
					{
						type : 'html',
						html : '<div style="color:red"><hr>计算公式说明：<br />用[1] [2] [3]等代表某列的数值。运算符支持+,-,*,/,%等。<hr></div>'
					},
					{
						type : 'html',
						html : table_html
					},
					{
						type : 'html',
						html : '<div><input type="hidden" id = "select_table" value="" /></div>'
					}
				]
			}
		]
	};
});