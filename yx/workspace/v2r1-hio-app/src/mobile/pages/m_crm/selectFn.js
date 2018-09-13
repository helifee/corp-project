/**
 * Created by Administrator on 2018/4/20.
 */
let selectFn = {
    initSelectFn(callback){
    $(function(){
        var hostUrl = JZY.c.xhrSetting.HOST.GLOBAL;
        $("body").delegate(".selectPerson", "click", function(e){
            e.preventDefault();
            e.stopPropagation();
            var that = this;
            var ids = $(this).attr("singleDataId");
            var type = $(this).attr("data-type") ?  $(this).attr("data-type") : "multi";
            if(type=="multi"){
                ids =  $(this).attr("multiDataId") ? $(this).attr("multiDataId").split(",") : "";
            }
            var data={};
            var url = hostUrl + '/sys/organization/queryTreeWithUser';
            var modal = $.selectModal({
                $input : $(that),
                selectionMethod: type,  //single  multi
                selectKey :{
                    val:  "user",
                    key : "type"
                },
                selectList : ids,
                componentType:1,
                param : {
                    url:url,
                    type: "POST",
                    param:data,
                    contentType:'application/json'
                },
                callback : function(data){
                    if(data){
                        console.log(data);
                        callback(data);

                    }
                }, close : function(modal){
                    modal.remove();
                }
            }).open();
        });

    });
} //这里相当于$(document).ready(function(){});
}
export default selectFn;