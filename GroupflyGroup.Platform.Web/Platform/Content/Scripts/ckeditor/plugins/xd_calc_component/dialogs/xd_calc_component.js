/**
 * 讯点智能表单  计算控件
 * @author tony 2012-08-14
 */

//显示公式说明
function displayRemark(){
	var displayDom = document.getElementById('displayRemark');
	if(displayDom){
		if(displayDom.style.display === 'none'){
			displayDom.style.display = 'block';
		} else {
			displayDom.style.display = 'none';
		}
	}
}
 
CKEDITOR.dialog.add('xd_calc_component',function(editor){
    //var mathbase = 'abcdefghijklmnopqrxtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //var Id = mathbase.charAt(parseInt(Math.random() * mathbase.length + 1)) + new Date();

    var Id = "calc" + new Date().getTime();

    var elements = [
                    {
                        id: 'Id',
                        type: 'text',
                        widths: ['85px', '150px'],
                        label: '组件Id：',
                        labelLayout: 'horizontal',
                        labelStyle: 'font-weight:bold',
                        'default': Id,
                        style: 'width:150px;margin-left:25px'
                    },
					{
						id : 'calcName',
						type : 'text',
						widths: ['85px', '325px'],
						label : '控件名称：',
						labelLayout : 'horizontal',
						labelStyle : 'font-weight:bold',
						style: 'width:325px;margin-left:25px;display:none;'
					},

					{
						id : 'calcValue',
						type : 'textarea',
						widths: ['85px', '325px'],
						rows : '5',
						cols : '45',
						label : '计算公式：',
						labelLayout : 'horizontal',
						labelStyle : 'font-weight:bold',
						style: 'width:325px;margin-left:25px;'
					},
					{
						type : 'html',
						widths : ['10%','80%'],
						html: '<div style="text-align:center;width:300px;;display:none">&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" style="color:blue;" onclick="displayRemark()">查看计算公式填写说明</a></div>'
					},
					{
						type : 'html',
						widths : ['10px','300px'],
						html : '<div id="displayRemark" style="width:340px;height:150px;overflow-x:scroll;float:right;font-size: 10pt;font-family:宋体;color:blue;display:none;text-align:left;">' +
								'计算公式支持+ - * / ^和英文括号以及特定计算<br>函数，例如:(数值1+数值2)*数值3-ABS(数值4)<br>' +
								'其中数值1、数值2等为表单控件名称。<br>' +
								'<b>当前版本所支持的计算函数：</b><br>' +
								'1、MAX(数值1,数值2,数值3...) 输出最大值,<br>&nbsp;&nbsp;&nbsp;&nbsp;英文逗号分割;<br>' +
								'2、MIN(数值1,数值2,数值3...) 输出最小值,<br>&nbsp;&nbsp;&nbsp;&nbsp;英文逗号分割;<br>' +
								'3、ABS(数值1) 输出绝对值;<br>' +
								'4、MOD(数值1,数值2) 计算数值1和数值2的余数;<br>' +
								'5、AVG(数值1,数值2,数值3) 输出平均值;<br>' +
								'6、RMB(数值1) 输出人民币大写形式，<br>&nbsp;&nbsp;&nbsp;&nbsp;数值范围0～9999999999.99;<br>' +
								'7、DAY(日期1-日期2) 输出时间差的整数天数;<br>' +
								'8、HOUR(日期1-日期2) 输出时间差的小时数;<br>' +
								'9、DATE(日期1-日期2) 输出时间差，<br>&nbsp;&nbsp;&nbsp;&nbsp;形如：xx天xx小时xx分xx秒;<br>' +
								'10、LIST(列表控件名,第几列) 计算列表控件<br>指定列的和;<br>' +
								'<b>注意：参与日期计算的控件必须为日期类型<br>或者日期+时间类型。</b><br>' +
								'</div>'
					},
					{
						id : 'calcPrec',
						type : 'text',
						'default' : '4',
						widths: ['85px', '150px'],
						label : '计算结果精度：',
						labelLayout : 'horizontal',
						labelStyle : 'font-weight:bold',
						style: 'width:150px;margin-left:25px'
					},
					{
						id : 'calcFontSize',
						type : 'text',
						widths: ['85px', '150px'],
						label : '字体大小：',
						labelLayout : 'horizontal',
						labelStyle : 'font-weight:bold',
						style: 'width:150px;margin-left:25px'
					},
					{
						id : 'calcWidth',
						type : 'text',
						widths: ['85px', '150px'],
						label : '控件宽度：',
						labelLayout : 'horizontal',
						labelStyle : 'font-weight:bold',
						style: 'width:150px;margin-left:25px'
					},
					{
						id : 'calcHeight',
						type : 'text',
						widths: ['85px', '150px'],
						label : '控件高度：',
						labelLayout : 'horizontal',
						labelStyle : 'font-weight:bold',
						style: 'width:150px;margin-left:25px'
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
		title : '计算控件属性',
		width : 350,
		height : 300,
		resizable : false,
		style : 'overflow:scroll',
		onShow : function(){
			delete this.xd_calc_component;

			var element = this.getParentEditor().getSelection().getSelectedElement();

			if ( element )
			{
				this.xd_calc_component = element;
				this.setupContent( element );
				
				this.getContentElement('xd_calc_component','calcName').setValue(element.getAttribute('title'));
				this.getContentElement('xd_calc_component','calcValue').setValue(element.getAttribute('value'));
				this.getContentElement('xd_calc_component', 'calcPrec').setValue(element.getAttribute('prec'));
				this.getContentElement('xd_calc_component', 'Id').setValue(element.getAttribute('id'));
				
				var styleString = element.getAttribute('style');
				var styleArray = styleString.split(';');
				for(var i = 0; i < styleArray.length; i++){
					var itemArray = styleArray[i].split(':');
					if (itemArray[0] === 'font-size') {
						this.getContentElement('xd_calc_component','calcFontSize').setValue(itemArray[1].substr(0,(itemArray[1].length - 2)));
					}
					if(itemArray[0] === 'width'){
						this.getContentElement('xd_calc_component','calcWidth').setValue(itemArray[1].substr(0,(itemArray[1].length - 2)));
					}
					if(itemArray[0] === 'height'){
						this.getContentElement('xd_calc_component','calcHeight').setValue(itemArray[1].substr(0,(itemArray[1].length - 2)));
					}
				}
				
				if(typeof(MODULE_CONFIG) !== 'undefined'){
					this.getContentElement('xd_calc_component','module_field').setValue(element.getAttribute('module_field'));
				}
			}
		},
		onOk : function(){
			var editor,
				element = this.xd_calc_component,
				isInsertMode = !element;

			if ( isInsertMode )
			{
				editor = this.getParentEditor();
				element = editor.document.createElement( 'input' );
				element.setAttribute( 'class', 'CALCU' );
				element.setAttribute('align','absMiddle');

				element.setAttribute('input_type','calc');
				
				var element_index = XD_FORM_ELEMENT_INDEX();
				
				element.setAttribute('name','DATA_' + element_index);
				//element.setAttribute('id','DATA_' + element_index);
			
				
				editor.insertElement( element );
			}
			
			element.setAttribute('id', this.getContentElement('xd_calc_component', 'Id').getValue());
			element.setAttribute('title',this.getContentElement('xd_calc_component','calcName').getValue());
			element.setAttribute('value',this.getContentElement('xd_calc_component','calcValue').getValue());
			element.setAttribute('prec',this.getContentElement('xd_calc_component','calcPrec').getValue());
			
			var styleString = '';
			var calcuFontSize = this.getContentElement('xd_calc_component','calcFontSize').getValue();
			var calcuWidth = this.getContentElement('xd_calc_component','calcWidth').getValue();
			var calcuHeight = this.getContentElement('xd_calc_component','calcHeight').getValue();
			if(calcuFontSize){
				styleString += ('font-size:' + calcuFontSize + 'px;');
			}
			if(calcuWidth){
				styleString += ('width:' + calcuWidth + 'px;');
			}
			if(calcuHeight){
				styleString += ('height:' + calcuHeight + 'px;');
			}
			element.setAttribute('style',styleString);
			
			element.setAttribute('element_type','xd_calc_component');
			
			if(typeof(MODULE_CONFIG) !== 'undefined'){
				element.setAttribute('module_field',this.getContentElement('xd_calc_component','module_field').getValue());
			}
			
			this.commitContent( { element : element } );
		},
		contents : 
		[
			{
				id : 'xd_calc_component',
				label : '计算控件属性',
				title : '计算控件属性',
				elements : elements
			}
		]
	};
	
});