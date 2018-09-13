$(function () {
    function initLinkList() {
        $.ajax({
            type: 'post',
            url: '/platform-app/sys/sysLinkCenter/queryListGroup?_t='+new Date().getTime(),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8;',
            data:"{}",
            //async: false,
            success: function (data) {
                if (data.success) {
                    var arr = data.result;
                    for (var i = 0; i < arr.length; i++) {
                        if(i==3){
                            break;
                        }
                        var footerListDiv = $('<div class="footer_list"></div>');
                        $('#linkCenter').append(footerListDiv);
                        var children = arr[i];
                        for (var j = 0; j < children.length; j++) {
                        	 if(j==4){
                        		 
                        		 footerListDiv.append('<a href="javascript:void(0);" onclick="linkCenterMore()" data-placement="right"><span style="margin-left:30px;">更多</span></a>');
                                 break;							
                             }
                            var obj = children[j];
                            var id = obj.id;
                            var name = obj.name;
                            var url = obj.url;
                            var parentId = obj.parentId;
                            var icon=obj.icon;
                            var remark=obj.remark;
                            if(!obj.parentId){
                                var p = $('#linkCenter p[id="P_'+id+'"]');
                                if(p.length==0){
                                    var p = $('<p></p>');
                                    p.attr('id','P_'+id);
                                    //p.text(name);
                                    p.append("<span style='margin-left:30px;'>"+name+"</span>");

                                    footerListDiv.append(p);
                                }
                            }else {
                                var p = $('#linkCenter p[id="P_'+parentId+'"]');
                                if(p.length==0){
                                    var p = $('<p></p>');
                                    p.attr('id','P_'+parentId);
                                    p.append("<span style='margin-left:10px;'>"+name+"</span>");
                                    footerListDiv.append(p);
                                }
                                /*    <img src="data:image/jpeg;base64,'+con+'" style="width:20px;height:20px">*/
                                /*        */
                                var a = $('<a href="#" id="appendIcon'+j+'"></a>');
                                a.append("<span style='margin-left:30px;'>"+name+"</span>");

                                if(url&&url!=''){
                                    a.attr('href',url);
                                    a.attr('target','_blank');
                                }else{
                                	debugger;
                                	if(name=='问题反馈'){
                                		a.attr('href','linkCenter_static.html');
                                	}else{
                                		a.attr('href','javascript:void(0);');
                                		a.attr('data-popover','popover');
                                		a.attr('data-container','body');
                                		a.attr('data-placement','right');
                                		a.attr('data-content',remark);
                                		a.attr('data-original-title',name);
                                	}
                                }
                                footerListDiv.append(a);
                            }
                        }
                        
                        

                    }
                    $('a[data-popover]').popover();
                    $('a[data-popover]').on('click',function(){
                    	$(this).siblings().popover('hide');
                    });
                } else {
                    return data.msg;
                }
            },
            complete:function(){
            	   $.ajax({
                       type: 'get',
                       url: '/platform-app/sys/sysLinkCenter/getQRcode?_t='+new Date().getTime(),
                       success:function(data){
                    	   var result=data.result;
                    /*	   $('#linkCenter').append('<div class="footer_list"><p><span>'+result.name+'</span></p><img src="data:image/jpeg;base64,'+result.icon+'" style="width:80px;height:80px"></div>');*/
                    	   $('#linkCenter').append('<div class="footer_list"><img src="data:image/jpeg;base64,'+result.icon+'" style="width:80px;height:80px"></div>');
                       }
                       });
            }
        });
    }

    setTimeout(function () {
        initLinkList();
    },500);
});

function linkCenterMore(){
	window.open("/platform-app/content/linkCenter/linkCenter_list.html?linkCenterOpenWin=true&_t="+new Date().getTime());
}
