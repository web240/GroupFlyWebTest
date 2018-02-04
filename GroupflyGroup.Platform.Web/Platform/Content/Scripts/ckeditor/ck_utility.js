/**
 * 讯点智能表单设计器 工具类
 * @author tony 2012-08-08
 */

//对域名进行替换
(function()
{
	var d = document.domain ;

	while ( true )
	{
		// Test if we can access a parent property.
		try
		{
			var test = window.parent.document.domain ;
			break ;
		}
		catch( e ) {}

		// Remove a domain part: www.mytest.example.com => mytest.example.com => example.com ...
		d = d.replace( /.*?(?:\.|$)/, '' ) ;

		if ( d.length == 0 )
			break ;		// It was not able to detect the domain.

		try
		{
			document.domain = d ;
		}
		catch (e)
		{
			break ;
		}
	}
})() ;

//根据ID获取DOM元素
function GetE( elementId )
{
	return document.getElementById( elementId )  ;
}

//显示
function ShowE( element, isVisible )
{
	if ( typeof( element ) == 'string' )
		element = GetE( element ) ;
	element.style.display = isVisible ? '' : 'none' ;
}

//设置CKEditor元素的属性
function SetAttribute( element, attName, attValue )
{
	if ( attValue == null || attValue.length == 0 )
		element.removeAttribute( attName ) ;			// 0 : Case Insensitive
	else
		element.setAttribute( attName, attValue ) ;	// 0 : Case Insensitive
}

//根据属性名获取CKEditor元素的属性
function GetAttribute( element, attName, valueIfNull )
{
	var oAtt = element.attributes[attName] ;

	if ( oAtt == null || !oAtt.specified )
		return valueIfNull ? valueIfNull : '' ;

	var oValue = element.getAttribute( attName ) ;

	if ( oValue == null )
		oValue = oAtt.nodeValue ;

	return ( oValue == null ? valueIfNull : oValue ) ;
}

//选择一个CKEditor元素
function SelectField( elementId )
{
	var element = GetE( elementId ) ;
	element.focus() ;

	// element.select may not be available for some fields (like <select>).
	if ( element.select )
		element.select() ;
}

//校验数字
var IsDigit = ( function()
	{
		var KeyIdentifierMap =
		{
			End			: 35,
			Home		: 36,
			Left		: 37,
			Right		: 39,
			'U+00007F'	: 46		// Delete
		} ;

		return function ( e )
			{
				if ( !e )
					e = event ;

				var iCode = ( e.keyCode || e.charCode ) ;

				if ( !iCode && e.keyIdentifier && ( e.keyIdentifier in KeyIdentifierMap ) )
						iCode = KeyIdentifierMap[ e.keyIdentifier ] ;

				return (
						( iCode >= 48 && iCode <= 57 )		// Numbers
						|| (iCode >= 35 && iCode <= 40)		// Arrows, Home, End
						|| iCode == 8						// Backspace
						|| iCode == 46						// Delete
						|| iCode == 9						// Tab
				) ;
			}
	} )() ;

String.prototype.Trim = function()
{
	return this.replace( /(^\s*)|(\s*$)/g, '' ) ;
}

String.prototype.StartsWith = function( value )
{
	return ( this.substr( 0, value.length ) == value ) ;
}

String.prototype.Remove = function( start, length )
{
	var s = '' ;

	if ( start > 0 )
		s = this.substring( 0, start ) ;

	if ( start + length < this.length )
		s += this.substring( start + length , this.length ) ;

	return s ;
}

String.prototype.ReplaceAll = function( searchArray, replaceArray )
{
	var replaced = this ;

	for ( var i = 0 ; i < searchArray.length ; i++ )
	{
		replaced = replaced.replace( searchArray[i], replaceArray[i] ) ;
	}

	return replaced ;
}

function OpenFileBrowser( url, width, height )
{
	// oEditor must be defined.

	var iLeft = ( oEditor.FCKConfig.ScreenWidth  - width ) / 2 ;
	var iTop  = ( oEditor.FCKConfig.ScreenHeight - height ) / 2 ;

	var sOptions = "toolbar=no,status=no,resizable=yes,dependent=yes,scrollbars=yes" ;
	sOptions += ",width=" + width ;
	sOptions += ",height=" + height ;
	sOptions += ",left=" + iLeft ;
	sOptions += ",top=" + iTop ;

	window.open( url, 'CKBrowseWindow', sOptions ) ;
}

// Copy all the attributes from one node to the other, kinda like a clone
// But oSkipAttributes is an object with the attributes that must NOT be copied
function CopyAttributes( oSource, oDest, oSkipAttributes )
{
	var aAttributes = oSource.attributes ;

	for ( var n = 0 ; n < aAttributes.length ; n++ )
	{
		var oAttribute = aAttributes[n] ;

		if ( oAttribute.specified )
		{
			var sAttName = oAttribute.nodeName ;
			// We can set the type only once, so do it with the proper value, not copying it.
			if ( sAttName in oSkipAttributes )
				continue ;

			var sAttValue = oSource.getAttribute( sAttName, 2 ) ;
			if ( sAttValue == null )
				sAttValue = oAttribute.nodeValue ;

			oDest.setAttribute( sAttName, sAttValue, 0 ) ;	// 0 : Case Insensitive
		}
	}
	// The style:
	if ( oSource.style.cssText !== '' )
		oDest.style.cssText = oSource.style.cssText ;
}


//自动生成表单元素id和name
function XD_FORM_ELEMENT_INDEX(ck_editor){
	//var ck_data = XD_FORM_EDITOR.getData();
	
	var element_index = 1;
	
	//if(ck_data){
	//	for(var i = 1000; i >= 1; i--){
	//		if(ck_data.indexOf('DATA_' + i) >= 0){
	//			element_index = i + 1;
	//			break;
	//		}
	//	}
	//}
	var timestamp = (new Date()).valueOf();
	return timestamp;
}




