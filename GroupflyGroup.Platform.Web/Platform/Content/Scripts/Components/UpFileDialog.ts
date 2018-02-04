/// <reference path="UIComponentBase.ts" />
declare var WebUploader: any;

/** 文件上传 */
class UpFileDialog extends UIComponentBase {
    constructor() {
        super();
    }

    static elementName = "Gf-UpFileDialog".toLowerCase();

    protected createComponentBrowseState() {
        return null;
    }

    protected createComponentEditState() {
        return null;
    }

    /** 文件总大小限制 */
    get fileSizeLimit(){
        return this.getAttribute("fileSizeLimit");
    }
    set fileSizeLimit(val){
        this.setAttribute("fileSizeLimit",val);
    }
    /** 单个文件大小限制 */
    get fileSingleSizeLimit(){
        return this.getAttribute("fileSingleSizeLimit");
    }
    set fileSingleSizeLimit(val){
        this.setAttribute("fileSingleSizeLimit",val);
    }
    /** 文件数量限制 */
    get fileNumLimit(){
        return this.getAttribute("fileNumLimit");
    }
    set fileNumLimit(val){
        this.setAttribute("fileNumLimit",val);
    }
    /** mimeTypes */
    get mimeTypes(){
        return this.getAttribute("mimeTypes");
    }
    set mimeTypes(val){
        this.setAttribute("mimeTypes",val);
    }
    /** 文件扩展名 */
    get ext(){
        return this.getAttribute("ext");
    }
    set ext(val){
        this.setAttribute("ext",val);
    }
    /** 文件上传API */
    get upfileserver(){
        return this.getAttribute("upfileserver");
    }
    set upfileserver(val){
        this.setAttribute("upfileserver",val);
    }
    /** 目录名称 */
    get directoryname(){
        return this.getAttribute("directoryname");
    }
    set directoryname(val){
        this.setAttribute("directoryname",val);
    }
    /** 目录ID */
    get directoryid(){
        return this.getAttribute("directoryid");
    }
    set directoryid(val){
        this.setAttribute("directoryid",val);
    }
    
    /** 标题 */
    get title(){
        return this.getAttribute("title");
    }
    set title(val){
        this.setAttribute("title",val);
    }

    public onSubmit(handler:()=>void){
        this.addHook(EventNames.Submit, handler);
    }

    public open(){
        var div = this.get('div');
        $(div).dialog({
            title: this.title || '文件上传',
            width: this.width || 800,
            height: this.height || 600,
            closed: true,
            cache: false
        });
        var uploader=this.get('uploader');
        if(uploader){
            if($(".filelist li")[0]){
                $(".filelist li").each(function () {
                    var id = $(this).attr("id");
                    uploader.removeFile(id);
                });
            }
            else{
                this.get('updateTotalProgress')();
            }
            var uploaderPanel=this.get('uploaderPanel');
            $(uploaderPanel).remove();
        }
        this.initWebUploader();
        $(div).dialog('open'); 
    }

    public close(){
        $(this.get('div')).dialog('close'); 
    }

    protected created() {
        var element = this;
        element.addHook(EventNames.BeforeInit, function () {
            element.includeStyle($(document.body).attr("apppath") + "/Platform/Content/Scripts/webuploader/css/style.css");
            element.includeStyle($(document.body).attr("apppath") + "/Platform/Content/Scripts/webuploader/css/webuploader.css");
            element.includeJS($(document.body).attr("apppath") + "/Platform/Content/Scripts/webuploader/js/webuploader.js");
        });
        super.created();
    }

    protected connected(){        
        super.connected();
    }

    protected initWebUploader() {
        var element = this;
        var uploaderPanel = document.createElement("div");
        var toolbarid = element.get("toolbarid");
        element.set("uploaderPanel", uploaderPanel);
        $(uploaderPanel).addClass("container");
        $(uploaderPanel).append(`<div class="page-container">
                            <div class="uploader wu-example">
                                <span style="font-size:16px;font-weight:bolder;">当前目录：` + element.directoryname + `</span>
                                <span id="`+ toolbarid + `" style="float:right"></span>
                                <div class="queueList filled">
                                    <div  class="placeholder">
                                        <p>试试将电脑里的文件拖到此处上传<br />或将截图复制到此处  </p>
                                    </div>
                                </div>
                                <div class="statusBar">
                                    <div class="progress">
                                        <span class="text">0%</span>
                                        <span class="percentage"></span>
                                    </div>
                                    <div class="info"></div>
                                    <div class="btns">
                                        <div class="clearBtn">清空</div><div class="filePicker"></div><div class="uploadBtn">开始上传</div>
                                    </div>
                                </div>
                            </div>
                        </div>`);
        $(element.get('div')).append(uploaderPanel);
        var $wrap = $('.uploader'),

            // 图片容器
            $queue = $('<ul class="filelist"></ul>')
                .appendTo($wrap.find('.queueList')),

            // 状态栏，包括进度和控制按钮
            $statusBar = $wrap.find('.statusBar'),

            // 文件总体选择信息。
            $info = $statusBar.find('.info'),

            // 上传按钮
            $upload = $wrap.find('.uploadBtn'),

            // 没选择文件之前的内容。
            $placeHolder = $wrap.find('.placeholder'),

            // 总体进度条
            $progress = $statusBar.find('.progress').hide(),

            // 添加的文件数量
            fileCount = 0,

            // 添加的文件总大小
            //fileSize = 0,

            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,

            // 缩略图大小
            thumbnailWidth = 110 * ratio,
            thumbnailHeight = 110 * ratio,

            // 可能有pedding, ready, uploading, confirm, done.
            state = 'pedding',

            // 所有文件的进度信息，key为file id
            percentages = {},

            succeedFile = [],

            supportTransition = (function () {
                var s = document.createElement('p').style,
                    r = 'transition' in s ||
                        'WebkitTransition' in s ||
                        'MozTransition' in s ||
                        'msTransition' in s ||
                        'OTransition' in s;
                s = null;
                return r;
            })(),

            // WebUploader实例
            uploader;

        if (!WebUploader.Uploader.support()) {
            element.alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
            throw new Error('WebUploader does not support the browser you are using.');
        }
        // 实例化
        var accept = {};
        if (element.ext) {
            accept["extensions"] = element.ext;
        }
        if (element.mimeTypes) {
            accept["mimeTypes"] = element.mimeTypes;
        }
        uploader = WebUploader.create({
            fileNumLimit: parseInt(element.fileNumLimit || "100"),
            pick: {
                id: '.filePicker',
                label: '选择文件'
            },
            accept: accept,
            dnd: '.uploader .queueList',
            paste: document.body,

            // swf文件路径
            swf: $(document.body).attr("apppath") + '/Content/js/Uploader.swf',
            disableGlobalDnd: true,
            duplicate: true,
            chunked: false,
            threads: 1,
            server: element.upfileserver,
            fileSizeLimit: (parseInt(element.fileSizeLimit) || 500 * 1024) * 1024,    // 500 M
            fileSingleSizeLimit: (parseInt(element.fileSingleSizeLimit) || 100 * 1024) * 1024,    // 100 M
            //formData: { DirectoryId: "" }
        });


        uploader.onUploadProgress = function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress span');

            $percent.css('width', percentage * 100 + '%');
            percentages[file.id][1] = percentage;
            updateTotalProgress();
        };

        uploader.onBeforeFileQueued = function (file) {
            //file.id = control.GetUniqueId("File");
        };
        uploader.onFileQueued = function (file) {
            if (file.name == 'image' || file.name == 'image.png') {
                file.id = element.getUniqueId("");
                file.name = file.id;
            }
            fileCount++;
            //fileSize += file.size;

            if (fileCount === 1) {
                $placeHolder.addClass('element-invisible');
                $statusBar.show();
            }

            addFile(file);
            setState('ready');
            updateTotalProgress();
        };

        uploader.onFileDequeued = function (file) {
            fileCount--;
            //fileSize -= file.size;

            if (!fileCount) {
                setState('pedding');
            }

            removeFile(file);
            updateTotalProgress();

        };
        uploader.onUploadBeforeSend = function (obj, data, headers) {
            if (element.directoryid) {
                data["DirectoryId"] = element.directoryid;
            }

        };
        uploader.onUploadAccept = function (obj, response) {
            if (response.IsSuccess) {
                succeedFile.push(obj.file.id);
            }
            else {
                element.alert(response.Message);
                return false;
            }
        };
        uploader.on('all', function (type) {
            var stats;
            switch (type) {
                case 'uploadFinished':
                    setState('confirm');
                    break;

                case 'startUpload':
                    setState('uploading');
                    break;

                case 'stopUpload':
                    setState('paused');
                    break;

            }
        });
        uploader.on('uploadBeforeSend', function (object, data, headers) {
            element.fireHook(EventNames.UploadBeforeSend, [object, data, headers])
        });


        uploader.onError = function (code) {
            var text = '';
            switch (code) {
                case 'F_DUPLICATE': text = '该文件已经被选择了!';
                    break;
                case 'Q_EXCEED_NUM_LIMIT': text = '上传文件数量超过限制!';
                    break;
                case 'F_EXCEED_SIZE': text = '文件大小超过限制!(' + (parseInt(element.fileSingleSizeLimit) || 100 * 1024) + 'KB)';
                    break;
                case 'Q_EXCEED_SIZE_LIMIT': text = '所有文件总大小超过限制!(' + (parseInt(element.fileSizeLimit) || 500 * 1024) + 'KB)';
                    break;
                case 'Q_TYPE_DENIED': text = '文件类型不正确或者是空文件!';
                    break;
                default: text = '未知错误!';
                    break;
            }
            element.alert(text);
        };
        $upload.on('click', function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }

            if (state === 'ready') {
                uploader.upload();
            } else if (state === 'paused') {
                uploader.upload();
            } else if (state === 'uploading') {
                uploader.stop();
            }
        });

        $(".clearBtn").on('click', function () {
            $(".filelist li").each(function () {
                var id = $(this).attr("id");
                uploader.removeFile(id);
            });
        });
        $info.on('click', '.retry', function () {
            uploader.retry();
        });

        // 当有文件添加进来时执行，负责view的创建
        function addFile(file) {
            var $li = $('<li id="' + file.id + '">' +
                '<p class="title">' + file.name + '</p>' +
                '<p class="imgWrap"></p>' +
                '<p class="progress"><span></span></p>' +
                '</li>'),

                $btns = $('<div class="file-panel">' +
                    '<span class="cancel">删除</span>' +
                    '<span class="rotateRight">向右旋转</span>' +
                    '<span class="rotateLeft">向左旋转</span></div>').appendTo($li),
                $prgress = $li.find('p.progress span'),
                $wrap = $li.find('p.imgWrap'),
                $info = $('<p class="error"></p>'),

                showError = function (code) {
                    var text;
                    switch (code) {
                        case 'exceed_size':
                            text = '文件大小超出';
                            break;

                        case 'interrupt':
                            text = '上传暂停';
                            break;

                        default:
                            text = '上传失败，请重试';
                            break;
                    }

                    $info.text(text).appendTo($li);
                };

            if (file.getStatus() === 'invalid') {
                showError(file.statusText);
            } else {
                // lazyload
                $wrap.text('预览中');
                uploader.makeThumb(file, function (error, src) {
                    if (error) {
                        $wrap.text('不能预览');
                        $btns.find('.rotateRight,.rotateLeft').remove();
                        return;
                    }

                    var img = $('<img src="' + src + '">');
                    $wrap.empty().append(img);
                }, thumbnailWidth, thumbnailHeight);

                percentages[file.id] = [file.size, 0];
                file.rotation = 0;
            }

            file.on('statuschange', function (cur, prev) {
                if (prev === 'progress') {
                    $prgress.hide().width(0);
                }

                // 成功
                if (cur === 'error' || cur === 'invalid') {
                    //console.log(file.statusText);
                    showError(file.statusText);
                    percentages[file.id][1] = 1;
                } else if (cur === 'interrupt') {
                    showError('interrupt');
                } else if (cur === 'queued') {
                    percentages[file.id][1] = 0;
                } else if (cur === 'progress') {
                    $info.remove();
                    $prgress.css('display', 'block');
                } else if (cur === 'complete') {
                    $li.off('mouseenter mouseleave');
                    $btns.remove();
                    $li.append('<span class="success"></span>');
                }

                $li.removeClass('state-' + prev).addClass('state-' + cur);
            });

            $li.on('mouseenter', function () {
                $btns.stop().animate({ height: 30 });
            });

            $li.on('mouseleave', function () {
                $btns.stop().animate({ height: 0 });
            });

            $btns.on('click', 'span', function () {
                var index = $(this).index(),
                    deg;

                switch (index) {
                    case 0:
                        uploader.removeFile(file);
                        return;

                    case 1:
                        file.rotation += 90;
                        break;

                    case 2:
                        file.rotation -= 90;
                        break;
                }
                if (supportTransition) {
                    deg = 'rotate(' + file.rotation + 'deg)';
                    $wrap.css({
                        '-webkit-transform': deg,
                        '-mos-transform': deg,
                        '-o-transform': deg,
                        'transform': deg
                    });
                } else {
                    $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
                }
            });

            $li.appendTo($queue);
        }

        // 负责view的销毁
        function removeFile(file) {
            var $li = $('#' + file.id);

            delete percentages[file.id];
            updateTotalProgress();
            $li.off().find('.file-panel').off().end().remove();
        }

        var updateTotalProgress = function () {
            var loaded = 0,
                total = 0,
                spans = $progress.children(),
                percent;

            $.each(percentages, function (k, v) {
                total += v[0];
                loaded += v[0] * v[1];
            });

            percent = total ? loaded / total : 0;

            spans.eq(0).text(Math.round(percent * 100) + '%');
            spans.eq(1).css('width', Math.round(percent * 100) + '%');
            updateStatus();
        }

        function updateStatus() {
            var text = '', stats;

            if (state === 'ready') {
                text = '选中' + fileCount + '个文件。';
            } else if (state === 'confirm') {
                stats = uploader.getStats();
                if (stats.uploadFailNum) {
                    text = '已成功上传' + stats.successNum + '个文件，' +
                        stats.uploadFailNum + '个文件上传失败'
                }

            } else {
                stats = uploader.getStats();
                text = '共' + fileCount + '个文件，已上传' + stats.successNum + '个文件';

                if (stats.uploadFailNum) {
                    text += '，失败' + stats.uploadFailNum + '个文件';
                }
            }

            $info.html(text);
        }

        function setState(val) {
            var file, stats;

            if (val === state) {
                return;
            }

            $upload.removeClass('state-' + state);
            $upload.addClass('state-' + val);
            state = val;

            switch (state) {
                case 'pedding':
                    $placeHolder.removeClass('element-invisible');
                    $queue.parent().removeClass('filled');
                    $queue.hide();
                    //$statusBar.addClass('element-invisible');
                    uploader.refresh();
                    break;

                case 'ready':
                    $placeHolder.addClass('element-invisible');
                    $queue.parent().addClass('filled');
                    $queue.show();
                    uploader.refresh();
                    break;

                case 'uploading':
                    $progress.show();
                    $upload.text('暂停上传');
                    break;

                case 'paused':
                    $progress.show();
                    $upload.text('继续上传');
                    break;

                case 'confirm':
                    element.fireHook(EventNames.Submit);
                    $progress.hide();
                    $upload.text('开始上传');//.addClass('disabled');
                    stats = uploader.getStats();
                    if (stats.successNum && !stats.uploadFailNum) {
                        setState('finish');
                        return;
                    }

                    break;
                case 'finish':
                    stats = uploader.getStats();
                    if (stats.successNum) {
                        //alert('上传成功');
                    } else {
                        // 没有成功的图片，重设
                        state = 'done';
                        location.reload();
                    }

                    break;
            }

            updateStatus();
        }

        $upload.addClass('state-' + state);

        updateTotalProgress();
        element.set("uploader", uploader);
        element.set("updateTotalProgress", updateTotalProgress)
    }

    onRender() {
        
        var element = this;
        var div = document.createElement("div");
        element.set("div", div);
       

        var toolbarid = element.getUniqueId("toolbar");
        element.set("toolbarid", toolbarid);

        $(div).css("padding", "2px");
        $(div).dialog({
            title: element.title || '文件上传',
            width: element.width || 800,
            height: element.height || 600,
            closed: true,
            cache: false,
            modal: true
        });
        return div;
    }

}
UpFileDialog.register();