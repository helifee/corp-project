/**
 * @author luorongxin
 */
$(function () {

    /**
     * 获取启用的菜单树
     */
    function getTree() {
        $.ajax({
            type: 'POST',
            url: serviceUrl + 'oa/sys/sysNaviMenu/getTree/ENABLED?_t='+new Date().getTime(),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8;',
            //async:false,
            data: JSON.stringify({}),
            success: function (returnResult) {
                if (returnResult) {
                    if (returnResult.success) {
                        var zNodes = returnResult.result;
                        recursionArray(zNodes);
                    } else {

                        $.xljUtils.tip("red", "查询数据失败！");
                    }
                } else {
                    $.xljUtils.tip("red", "导航菜单服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "导航菜单服务异常,请联系管理员！");
            }

        })
    }

    //初始化树
    setTimeout(function () {
        getTree();
    },500);


    function getUserInfo() {
        var result;
        $.ajax({
            url:serviceUrl + 'oa/sys/sysNaviMenu/getUserInfo?_t='+new Date().getTime(),
            type:'GET',
            async:false,
            dataType:'JSON',
            success:function (resultData) {
                if(resultData&&resultData.success){

                     result = resultData.result;
//                    if(result) {
//                        userName = result.loginName;
//                    }else{
//                        $.xljUtils.tip('red','导航菜单信息获取失败，请联系管理员！');
//                    }

                }else{
                    $.xljUtils.tip('red','导航菜单信息获取失败，请联系管理员！');
                }
            },
            error:function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        });

        return result;
        
    }

    /**
     * 遍历匹配拼接菜单  type: 0 系统菜单 1 自定义菜单
     */
    function recursionArray(arr) {
        var result = getUserInfo();
        var userName = result.userLoginName;
        var sessionId = result.sessionId;
        var enUserName = result.enUserName;
        var encorpCode = result.corpCode;
        var dateString = result.dateString;
        var mortgageLoginName  =result.mortgageLoginName;
        var LLOALoginName = result.LLOALoginName;
        var count = 0;
        $('.oa-nav-container').html('');
        for (var i in arr) {
            var img = arr[i].icon;
            var name = $.xljUtils.htmlDecode(arr[i].name);
            var id = arr[i].id;
            var url = $.xljUtils.htmlDecode(arr[i].url);
            var pid = arr[i].pid;
            var linkType = arr[i].linkType;
            if (!arr[i].parentId || arr[i].parentId == "0") {

                var p;
                p = $('.oa-nav-container').find('p[id="p_title_'+id+'"]');
                if(p.length==0){
                	p = $('<p class="p_l_title" data-toggle="collapse"  aria-expanded="true" aria-controls="collapseExample"></p>');
                    p.text(name);
                    p.attr('id','p_title_'+id);
                    p.attr('data-target','#ul_'+id);
                    p.css({cursor:'pointer'});
                }

                var ul;
                ul = $('.oa-nav-container').find('ul[id="ul_'+id+'"]');
                if(ul.length==0){
                    ul = $('<ul class="p_l_ul"></ul>');
                    ul.attr('id','ul_'+id);

                }

                if(count==0){
                    $('.oa-nav-container').append(p);
                    $('.oa-nav-container').append(ul);
                }else {
                    var midDiv = $('<div class="wuye"></div>');
                    midDiv.append(p);
                    midDiv.append(ul);
                    $('.oa-nav-container').append(midDiv);
                }

                count++;

            } else {
                if (arr[i].type == '1') {
                    //name = arr[i].resourceName;
                    //url = url + getParam();
                	//判断该userName是否需要加密，如果需要加密，则要加密处理
                	if(url == "http://zj.xyre.com/sysLogin.do?V=1&UserId=#[userName]"){
                	}
                	if(url != "" && url.indexOf("?") > 0 && url.indexOf("home") > 0){
                		var targetNum = url.indexOf("?");
                    	var homeStr = url.substr(targetNum+1,6);
                    	var home = homeStr.split("=")[1];
                    	//var corpCode = "xyre";
                        if(home == "z"){
	                        //var resultUserInfo = getEncryptUserInfo(userName,corpCode);
	                        //var enUserName = resultUserInfo.enUserName;
	                    	//var encorpCode = resultUserInfo.corpCode;
	                    	url = url.replace('#[userName]',enUserName);
	                        url = url.replace('#[corpCode]',encorpCode);
                    	}else if(home == "h"){
                    		//var resultUserInfo = getEncryptUserInfo(userName,corpCode);
                    		//var enUserName = resultUserInfo.enUserName;
                            url = url.replace('#[userName]',enUserName);
                    	}else{
                    		if(url.indexOf("lanlin") > 0){
                    			//var resultUserInfo = getEncryptUserInfo(userName,null);
                        		//var enUserName = resultUserInfo.enUserName;
                        		url = url.replace('#[userName]',enUserName);
                    		}else if(url.indexOf("mortgage")>0){//按揭管理系统
                                url = url.replace('#[userName]',mortgageLoginName);
                            }else if(url.indexOf("LLOA")>0){//lianlinOA系统
                                url = url.replace('#[userName]',LLOALoginName);
                            }else {
                    			url = url.replace('#[userName]',userName);
                    			url = url.replace('#[sessionId]',sessionId);
                    		}
                    	}
                	}else{
                		if(url.indexOf("lanlin") > 0){
                			//var resultUserInfo = getEncryptUserInfo(userName,null);
                    		//var enUserName = resultUserInfo.enUserName;
                    		url = url.replace('#[userName]',enUserName);
                		}else if(url.indexOf("mortgage")>0){//按揭管理系统
                            url = url.replace('#[userName]',mortgageLoginName);
                        }else if(url.indexOf("LLOA")>0){//lianlinOA系统
                            url = url.replace('#[userName]',LLOALoginName);
                        }else {
                			url = url.replace('#[userName]',userName);
                			url = url.replace('#[sessionId]',sessionId);
                		}
                		
                	}
                }
                pid = arr[i].parentId;

                var p;
                p = $('.oa-nav-container').find('p[id="p_title_'+pid+'"]');
                if(p.length==0){
                    p = $('<p class="p_l_title" data-toggle="collapse"  aria-expanded="true" aria-controls="collapseExample"></p>');
                    p.text(name);
                    p.attr('id','p_title_'+pid);
                    p.attr('data-target','#ul_'+id);
                    p.css({cursor:'pointer'});
                    
                    var ul = $('<ul class="p_l_ul"></ul>');
                    ul.attr('id','ul_'+pid);

                    var midDiv = $('<div class="wuye"></div>');
                    midDiv.append(p);
                    midDiv.append(ul);
                    $('.oa-nav-container').append(midDiv);
                }

                var ul;
                ul = $('.oa-nav-container').find('ul[id="ul_'+pid+'"]');
                if(ul.length>0){
                    var li = $('<li></li>');
                    var a = $('<a href="javascript:void(0)"></a>');
                    a.attr('data-href',url);
                    if(linkType=='OUTTER'){
                        a.attr('data-linktype','OUTTER');
                    }
                    a.on('click',function () {
                        var href = $(this).attr('data-href');
                        var dataLinkType = $(this).attr('data-linktype');
                        if(dataLinkType=='OUTTER'){
                            //a.attr('target','_blank');
                            window.open(href);
                        }
                        var aLink = href;
                        aLink = aLink.substring(aLink.indexOf('?'));
                        aLink = aLink.replace("?", "").replace(/&/g, "\",\"");
                        aLink = aLink.replace(/=/g, '":"');
                        var menuUrlObj ;
                        if (aLink != "") {
                            menuUrlObj = JSON.parse('{"' + aLink + '"}');
                        }
                        if(menuUrlObj._proCode&&!menuUrlObj._menuCode){
                            window.parent.switchPro(menuUrlObj._proCode);
                        }else if(menuUrlObj._proCode&&menuUrlObj._menuCode){
                            window.parent.switchPro(menuUrlObj._proCode,menuUrlObj._menuCode);
                        }else{
                            window.location.href = href;
                        }
                        //window.location.href =
                    });
                    a.text(name);
                    li.append(a);
                    ul.append(li);
                }


            }
        }

    }
});


