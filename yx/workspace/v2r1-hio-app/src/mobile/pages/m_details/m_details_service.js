// import r from "@main/utils/xhr.js"
let s = {
    //获取任务详情
    getTaskInfoDetails(taskId,tendId){
        let url = "oa/task/queryTaskDetails/"+taskId+"/"+tendId;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'get',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    getMeetingInfoDetails(id){
        let url = "oa/meeting/meetingInfo/get/"+id;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'get',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    getNewsInfoDetails(id){
        let url = "oa/news/read/"+id;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'get',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
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

}
export default s;