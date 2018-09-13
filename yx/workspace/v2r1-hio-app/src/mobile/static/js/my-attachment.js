let upload = {
    fileNewUploadArray:[],
    fileNum:0,
    fileUrl:JZY.c.xhrSetting.HOST.GLOBAL+"/disk/attachmentTemp/upload",
    headers:{'authorization':sessionStorage.getItem('authorization')},
    initFn(param,callback){
        let self = this;
        self.fileNewUploadArray = [];
        $("#uploadImage").on("change", function() {

            var all= !!this.files ? this.files : [];
            if (!all.length || !window.FileReader) return;

            var reader = new FileReader();
            var album=[];
            var length=all.length;
            self.loadingShowStyle();
            //self.fileUrl = self.hostUrl+ 'univ/attachment/attachmentTemp/upload';
            var i=0;
            var recur=function(){
                reader.readAsDataURL(all[i]);
                var One=all[i];
                reader.onload=function(e){
                    One.data=this.result;
                    //self.resouce = this.result;
                    album.push(One);
                    i++;
                    if(i<length){
                        recur();
                    }else{
                        this.value = '';
                        //self.renderAttach(album,callback);
                    };
                };
                reader.onloadend=function(e){
                    self.fileNum++;
                    console.log(e);
                };
                reader.onerror=function(e){
                    console.log("error",e);
                };
            };
            recur();
        }).fileupload({
            url: self.fileUrl,
            sequentialUploads: true,
            headers:self.headers,
            formData:{appId:param.appId, businessId:param.businessId, categoryId:param.categoryId,type:'file'},

        }).bind('fileuploaddone', function (e, data) {
            //data.result.result[0]是保存成功后返回的完整的信息，用户下一步的删除或提交操作,要妥善处理
            var result;
            if(data.result.message=="success"){
                result = data.result.result;
            }else{
                self.loadingHideStyle();
            }
            if(result){
                console.log(result);
                var fileDataItem = result.file;
                console.log(fileDataItem);
                self.fileNewUploadArray.push(fileDataItem);
                if(callback) callback(self.fileNewUploadArray);
                setTimeout(self.loadingHideStyle(),500);
            }
        });
    },

    //页面加载中...
    loadingShowStyle:function(text){
        $("body").css("overflow","hidden");
        var scrollTop = $(window).scrollTop();
        var top =  $(window).height()/2;
        $(".loading").eq(0).show();
        $(".loading").eq(0).find(".load-box").show();
        $(".loading").eq(0).css("top",scrollTop+"px");
        $(".loading .load-box").css("top",top+"px");
        if(text) $(".loading .load-box .textWaiting").html(text);
    },
    loadingHideStyle:function(){
        $("body").css("overflow","auto");
        $(".loading").eq(0).hide();
        $(".loading").eq(0).find(".load-box").hide();
    },
    checkIsHasNewAttach(fileNewUploadArray){
        let paramKeyArr = ["appId","businessId","name","type","extendName","fullName","url","path","fileSize","categoryId"];
        if(!fileNewUploadArray.length) return null;
        fileNewUploadArray.forEach((n,i)=>{
            Object.keys(n).forEach((item,index)=>{
                if(paramKeyArr.indexOf(item)<0){
                    delete n[item];
                }
            })
        })
        return fileNewUploadArray;

    }
}
export default upload;