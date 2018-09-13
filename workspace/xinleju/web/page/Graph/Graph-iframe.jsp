<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="css/app.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>

	</head>
	<body style="margin: 0px;padding: 0px">
		<div style="width: 100%;padding-bottom: 20px;padding-top: 20px;text-align: center;">
			<img usemap="#newbook" src="Graph!show.do?fiId=${fiId}" border="0" id="img" />
		</div>

		<div id="message" style="padding-top:20px;text-align: center;padding-bottom: 3px">
			<label style="background-color:#e4e4e4;width: 60px;border: 1px;border-style: solid;">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</label>
			&nbsp;
			<span style="font-size:9pt">未开始</span>&nbsp;
			<label style="background-color:#fc0;width: 60px;border: 1px;border-style: solid;">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</label>
			&nbsp;
			<span style="font-size:9pt">运行中</span>&nbsp;

			<label style="background-color:#690;width: 60px;border: 1px;border-style: solid;">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</label>
			&nbsp;
			<span style="font-size:9pt">已结束</span>&nbsp;
			
			<label style="background-color:red;width: 60px;border: 1px;border-style: solid;">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</label>
			&nbsp;
			<span style="font-size:9pt">已作废</span>&nbsp;
		</div>

		<s:iterator value="#request.pointList" id="point" status="stat">
			<s:if test="#point[12]==4">
				<s:set id="color" value="'white'"></s:set>
			</s:if>
			<s:else>
				<s:set id="color" value=""></s:set>
			</s:else>
			<div class="imgSelect" id="img_${stat.index}" l="<s:property value="#point[0]"/>" t="<s:property value="#point[1]"/>" w="<s:property value="#point[2]"/>" h="<s:property value="#point[3]"/>" style="text-align:center;position: absolute;left:<s:property value="#point[0]"/>px;top:<s:property value="#point[1]"/>px;width:<s:property value="#point[2]"/>px;height:<s:property value="#point[3]"/>px">
				<div style="width:100%;font-size:9pt;color: ${color};${point[12]};font-family: 微软雅黑,宋体;height:<s:property value="#point[3]"/>px;line-height:<s:property value="#point[3]"/>px">
					<span style="cursor:pointer;" onclick="openNode(<s:property value="#point[11]"/>)"><s:property value="#point[4]" />
					</span>
				</div>
			</div>
		</s:iterator>
		<script type="text/javascript">
		
			
			var i = 0;
			var ri = false;
			
			var timer = null;
			$(document).ready(function(){
				position();
				timer = setInterval("position()",100);
				
				<s:iterator value="#request.pointList" id="point" status="stat">
				$("#trigger_${stat.index}").powerFloat();
				</s:iterator>


			});
			
 			function position(){
 				
 				if(!ri){
 					ri = true;
 	 				if(i++ == 50){
 	 					timer = window.clearInterval(timer);
 	 				}

	 				var top = $("#img").offset().top;
					var left = $("#img").offset().left;

	 				
					$(".imgSelect").each(function(i){
						
						var t = (parseInt($(this).attr("t")) + parseInt(top));
						var l = (parseInt($(this).attr("l" )) + parseInt(left));
						
						$(this).offset({ top: t, left: l});
			 		});
	 				
 					ri = false;
 				}
 			}
		</script>
	</body>
</html>