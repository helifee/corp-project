<%@ page language="java" contentType="text/html; charset=utf8" pageEncoding="utf8"%>
<!doctype html>
<html lang="zh">
<head>
	<meta charset="UTF-8" />
    <title>鑫乐居ERP移动审批</title>
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="stylesheet" href="css/mui.min.css">
	<title>选择用户</title>
   	<script src="js/app.js"></script>
   	<script src="js/mui.min.js"></script>
   	<script src="js/template.js"></script>
    <script src="js/mui.pullToRefresh.js"></script>
    <script src="js/mui.pullToRefresh.material.js"></script>
    <script src="js/jquery-1.11.3.min.js"></script>

</head>
<body>
		<div id="background" class="background" style="display: none;"></div> 
		<div id="progressBar1" class="progressBar" style="display: none; ">正在加载中，请稍等...</div>
	<div class="mui-content">
		<div class="mui-content-padded" style="margin: 15px;">
			<h5>用户搜索框：</h5>
			<div class="mui-input-row mui-search">
				<input id="search" type="search" class="mui-input-clear" placeholder="输入用户名或首字母">
			</div>
			<ul class="mui-table-view" id="userTable">
			</ul>
				<div class="mui-button-row">
					<button type="button" class="mui-btn mui-btn-primary" onclick="return false;" id="confirm">确认</button>&nbsp;&nbsp;
					<button type="button" class="mui-btn mui-btn-danger" onclick="return false;" id="cancel">取消</button>
				</div>
		</div>
	</div>
</body>
 <script type="text/javascript">

		mui.init({
			swipeBack:true //启用右滑关闭功能
		});
		var isMuti='${param.isMuti}';
		var userId='${param.userId}';
		//var userId='liufeng';
		var templateId=isMuti=="1"?"checkboxTemplate":"radioTemplate";
		var selectArray=new Array();
		var backUrl=document.referrer;
		//alert("选择人页面isMuti----"+isMuti);

	/* 	if(url.indexOf("&back=selectUser")>-1){
			alert("123");
			backUrl=url.substring(0,url.indexOf("&back=selectUser"));
		}else{
			alert("456");
			backUrl=url;
		} */
	/* 	$(function(){
			//$("#search").keyup(function(data){
		
		}); */
		//点击确定按钮
		$("#confirm").bind("tap",function(){
			//alert("000000"+"${param.rebackUrl}");
			//alert("000000"+"${param.rebackGoUrl}");
			var params="";
			var goback="";
			//alert("000000backUrl:::::"+backUrl);
			if(backUrl.indexOf("&selectUser=")>-1){
				//if(false){
				//alert("11111111:::::"+backUrl);
				var newArray=new Array();
				var newArray1=new Array();
				newArray=backUrl.split("&selectUser=");
				var start=newArray[0];
				newArray1=start.split("&isMuti=");
				var start1 = newArray1[0]+"&isMuti="+isMuti+"&";
				var end=newArray[1];
				//alert("start::::"+start+"------end:"+end);
				//params=encodeURIComponent(JSON.stringify(selectArray));
				/*
				var tex=decodeURIComponent(end);
				 var result=JSON.stringify(tex).replace(/\\/g,'').replace("\"[","").replace("]\"","");
				 var st=result.split("},{");
				 if(st.length>1){
					 //alert("222222:::::"+backUrl);
					 for (var i = 0; i < st.length; i++) {
						 if(i==0){
							 var tm=JSON.parse(st[i]+"}"); 
						 }else if(i==st.length-1){
							 var tm=JSON.parse("{"+st[i]); 
						 }else{
							 var tm=JSON.parse("{"+st[i]+"}"); 
						 }
						 selectArray.push(tm);
					}
				 }else{
					 //alert("3333333:::::"+backUrl);
					 var tm=JSON.parse(result); 
					 selectArray.push(tm);
				 }
				 */
				params=encodeURIComponent(JSON.stringify(selectArray));
				goback=start1+"&selectUser="+params;
				//alert("goback66666:::::::"+goback);
			} else{
				//alert("44444:::::"+backUrl);
				if(selectArray.length){
					//alert("55555:::::"+backUrl);
					params=encodeURIComponent(JSON.stringify(selectArray));
				}
				goback=backUrl+"&back=${param.rebackUrl}&isMuti="+isMuti+"&selectUser="+params;
				//alert("goback7777:::::::"+goback);
			}
			
			   setTimeout(function() {
			window.location.href =goback;
			         },1000);
});


//事件代理
$("#userTable").delegate("input","change",function(){
	var $this=$(this);
	var name=$this.attr("data-name");
	if($this.is(":checked")){
		var item={name:name,value:$this.val()};
		selectArray.push(item);
	}else{
		//删除一个元素
		for(var i=0;i<selectArray.length;i++){
			if(selectArray[i].name==name){
				selectArray.splice(i, 1);
			}
		}
	}
});
//点击取消按钮
$("#cancel").bind("tap",function(){
//alert("${param.rebackUrl}");
   setTimeout(function() {
window.location.href = backUrl+"&back=${param.rebackUrl}&isMuti="+isMuti+"#selectUserAnchor";
                 },1000);
});
$("#search").bind('input propertychange', function(data) {
var $this=$(this);
if($this.val()&&$this.val().length>0){
	var url="${pageContext.request.contextPath}/user/getUserByOrgnAndKey";
	$.get(url,{key:$this.val(),orgn:''},function(data){
		if(data.success){
			var frag="";
			var users=data.users;
			//var deptList=data.deptList;
			for(var i=0;i<data.users.length;i++){
				//var dept=deptList[i];
				//frag+=template(templateId,{user:users[i],deptName:dept?dept.name:""});
				var department = users[i].position;
			//	alert(department);
				if(!isNaN(department)){
					department = "";
				}
				frag+=template(templateId,{user:users[i],deptName:department});
			}
			$("#userTable").empty().append(frag);
		}else{
			alert("加载数据报错！");
		}
	},'json');
}else{
//initUserList();
}
});
		//初始化查询本部门用户
		function initUserList(){}
		//	var ul="${pageContext.request.contextPath}/user/getByLoginname?loginname="+userId;
	/* 	$.ajax({
		    type:"GET",
			url:ul,
			async:false,
		     dataType:'json',
			  beforeSend: function(){
				  ajaxLoading.show();
	            },
			  success:function(data){
				  if(data.success){
						var frag="";
						var users=data.users;
						for(var i=0;i<data.users.length;i++){
							var department = users[i].position;
							if(!isNaN(department)){
								department = "";
							}
							frag+=template(templateId,{user:users[i],deptName:department});
							console.log("frag:" + frag);
						}
						$("#userTable").empty().append(frag);
			  }
			  },
		      error:function(){
		    	//  alert("加载数据错误，请退出！");
		      },//请求出错
		      complete: function(){
		    	  ajaxLoading.hide();
	            },
			});
			 */

    </script>
    <script type="text/html" id="radioTemplate">
		<li class="mui-table-view-cell mui-radio mui-left">
			<input name="radio" type="radio" value="{{user.id}}" data-name="{{user.realName}}">{{user.realName}}
			<p class="mui-ellipsis">{{deptName}}</p>
		</li>
	</script>
    <script type="text/html" id="checkboxTemplate">
		<li class="mui-table-view-cell mui-checkbox mui-left">
			<input name="checkbox" type="checkbox" value="{{user.id}}" data-name="{{user.realName}}">{{user.realName}} 
			<p class="mui-ellipsis">{{deptName}}</p>
		</li>
	</script>
    <script type="text/html" id="buttonTemplate">
		<button type="button" class="mui-btn mui-btn-danger mui-btn-outlined" data-name="{{name}}" data-value="{{value}}">删除	
			<span class="mui-icon mui-icon-trash"></span>
		</button>
	</script>
</html>