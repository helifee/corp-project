//附件各个方法
let s = {
    getAttachments(param){
        let url = "disk/attachment/queryList";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    //删除附件
    deleteAttach(param){
        let url = "disk/attachment/deletefile";
        url = JZY.xhr.transformUrl(url,'',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    //保存附件
    saveUploadAttach(arr){
        let url = "disk/attachment/saveBatch";
        url = JZY.xhr.transformUrl(url,'',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:arr,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    }
}
export default s;