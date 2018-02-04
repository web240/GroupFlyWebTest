CKEDITOR.plugins.add('wfpromt', {
    requires: ['richcombo'],
    init: function (editor) {
        var pluginName = 'wfpromt';
        var config = editor.config,
            lang = editor.lang.format;
        editor.ui.addRichCombo('photogalleries', {
            label: "布局方式",
            title: "布局方式",
            //voiceLabel: "布局方式",
            className: 'cke_format',
            multiSelect: false,
            //icon: CKEDITOR.plugins.getPath('wfpromt') + 'photo-list-horizontal.png',

            panel: {
                //css: [config.contentsCss, CKEDITOR.getUrl(editor.skinPath + 'editor.css')],
                css: [CKEDITOR.skin.getPath("editor")],
                voiceLabel: lang.panelVoiceLabel
            },

            init: function () {
                this.startGroup("布局方式");
                var list = this;

                list.add("FlowLayout", "流式布局", "流式布局");
                list.add("FixLayout", "固定坐标布局", "固定坐标布局");
                list.add("CustomLayout", "自定义布局", "自定义布局");
                //$("#_photogalleries option:selected").each(function (index, value) {
                //    console.log(index, value);
                //    list.add("FlowLayout", "流式布局", "流式布局");
                //    list.add("FixLayout", "固定坐标布局", "固定坐标布局");
                //    list.add("CustomLayout", "自定义布局", "自定义布局");
                //});
            },

            onClick: function (value) {
                editor.focus();
                editor.fire('saveSnapshot');
                editor.insertHtml(value);
                editor.setData("");
                editor.fire('saveSnapshot');
            }
        });
    }
});