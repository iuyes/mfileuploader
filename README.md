mfileuploader
=============

imageUpload
无线web端文件异步上传(支持android 2.2+,ios6+)

###特点
* 支持android2.2+和ios6+的文件异步上传
* 差异化处理
* 支持文件进度回调(ios6+，Android4+部分浏览器)，文件信息读取，文件选择、上传、结束和错误处理

###使用方法

####html

    <form method="post" id="uploadForm">
        <input type="file" name="file" id="fileEl" accept="image/*">
    </form>
    
    
####js代码

    //新建对象，传入file，form元素以及服务端action
    var fileUploader = new MFileUploader({
        fileEl:document.querySelector("#fileEl"),
        action:"/fileUpload",
        formEl:document.querySelector("#uploadForm")
    });
    //选择文件或更改文件后触发，返回选择文件的File对象
    fileUploader.onFileSelect = function(file){
        console.log(file);
    };
    //文件开始上传时触发
    fileUploader.onFileStartUpload = function(){
        console.log("start upload");
    };
    //上传错误时触发，回调参数为Error对象
    fileUploader.onFileUploadError = function(error){
        console.log("upload error:",error);
    };
    /*
        文件上传进度,ios6+支持,android 4部分浏览器支持(chrome支持)
        progress:(float)上传进度 0-1
        speed:(string)上传速度
        event:progress对象
    **/
    fileUploader.onFileUploading = function(progress,speed,event){
        console.log("progress:" + progress + " " + speed);
    };
    //上传结束时触发(注意此时只是上传完成，ajax请求并没有完成)
    fileUploader.onFileUploadEnd = function(){
        console.log("upload end");
    };
    //ajax请求完成，返回服务端responseText
    fileUploader.onFileUpLoaded = function(responsText){
        console.log("xhr end:"+responsText);
    };
    //上传
    fileUploader.upload();
    
###demo
<a href="http://cnalpha.duapp.com/" target="_blank">demo</a>
