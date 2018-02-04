/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
    //config.uiColor = '#AADC6E';

    //config.removeButtons = 'Save,About,Flash';
    //config.removePlugins = 'elementspath';
    config.allowedContent = true;
    config.resize_maxWidth = 1000;

    // Set the most common block elements.
    //config.format_tags = 'p;h1;h2;h3;pre';

    // Simplify the dialog windows.
    config.removeDialogTabs = 'image:advanced;flash:advanced;link:advanced';
    
    config.toolbar = "CustomerForm,MyToolbar";
    config.toolbar_CustomerForm = [['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'],
             ['TextColor', 'BGColor', 'HelloWorld']];

   //config.toolbar = "MyToolbar";
    config.toolbar_MyToolbar = [['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'],
             ['TextColor', 'BGColor']];
 

    config.toolbar_None = [];
    config.extraPlugins = 'resize,xd_property,xd_listview,xd_calc_property,xd_calc_component,xd_view,wfpromt';// xd_flow,xd_auto,xd_data_select,xd_calendar,xd_user,HelloWorld,xd_textfield,xd_textarea,xd_listmenu,xd_radio,xd_checkbox,
    config.resize_dir = 'both';

   //config.extraPlugins = 'htmlbuttons';
    config.pasteFromWordRemoveFontStyles = false;
    config.pasteFromWordRemoveStyles = false;
};
