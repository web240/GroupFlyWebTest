(function () {
    function HelloWorldDialog(editor) {

        return {
            title: '对谁说Hello',
            minWidth: 300,
            minHeight: 80,
            buttons: [
            CKEDITOR.dialog.okButton,
            CKEDITOR.dialog.cancelButton],
            contents:
            [
                {
                    id: 'info',
                    label: '名字',
                    title: '名字',
                    elements:
                    [
                        {
                            id: 'text',
                            type: 'text',
                            style: 'width: 50%;',
                            label: '名字',
                            'default': '',
                            required: true,
                            validate: CKEDITOR.dialog.validate.notEmpty('名字不能为空'),
                            commit: function (editor) {
                                var text = ' ' + this.getValue();
                                editor.insertHtml(text);
                            }
                        }
                    ]
                }
            ],
            //弹出窗显示事件  
            onShow: function () {

                var selection = editor.getSelection();
                var element = selection.getStartElement();
                if (!element || element.getName() != 'input' || element.getAttribute('type') != 'text') {
                    this.insertMode = true;
                } else {
                    this.insertMode = false;
                }

                this.element = element;
                if (!this.insertMode) {
                    this.setupContent(this.element);
                }

            },
            onOk: function () {
                this.commitContent(editor);
            },
            resizable: CKEDITOR.DIALOG_RESIZE_HEIGHT
        };
    }

    CKEDITOR.dialog.add('HelloWorld', function (editor) {
        return HelloWorldDialog(editor);
    });
})();