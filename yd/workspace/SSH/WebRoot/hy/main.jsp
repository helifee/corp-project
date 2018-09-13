<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%> 
<jsp:include page="/hy/logincheck.jsp" />
<html>
    <head>
    	<title>welcome</title>
        <sx:head debug = "true"/>
    </head>

			
    <body>
		<s:include value="../common/topmenu.jsp" />
		<p>
			登录成功！
		</p>
		
		<s:bean name="com.ysys.www.hy.action.LoginAction">

	         <table>
		     	<tr>
		         	<td>
		         		用户ID：<s:property value="#session.userinfo.userID" />
		         	</td>
		         </tr>
		         <tr>
		         	<td>
						用户名：<s:property value="#session.userinfo.userName" />
		         	</td>
		         </tr>
	         </table>
	         <table>
	         	<tr>
	         		<td>
	         		<s:url action="logout" id="logoutUrl"></s:url>
						<s:a href="%{logoutUrl}">注销</s:a>
	         		</td>
	         	</tr>
	         </table>
	         <table>
	         	<tr>
	         		<td>
	         		<s:url action="conferenceinit" id="conferencenameUrl"></s:url>
						<s:a href="%{conferencenameUrl}">会议室预约一览画面</s:a>
	         		</td>
	         	</tr>
	         </table>

	         <table>
	         	<tr>
	         		<td>
	         		<s:url action="distributeaction" id="distributeUrl"></s:url>
		         	  <s:a href="%{distributeUrl}" >会议室分布</s:a> 
	         		
	         		</td>
	         	</tr>
	         </table>
	         
	        
	         <table>
	         	<tr>
	         		<td>
	         		<s:url action="staticsMain" id="statisticsactionUrl"></s:url>
		         	  <s:a href="%{statisticsactionUrl}" >预约统计</s:a> 
	         		
	         		</td>
	         	</tr>
	         </table>
	         <!-- 会议室预约画面 -->
	         <table>
	         	<tr>
	         		<td>
	         		<s:url action="yuyue" id="yuyueUrl"></s:url>
	         		<s:a href="%{yuyueUrl}">会议室预约</s:a>
	         		</td>
	         	</tr>
	         </table>
	         
	         <!-- 会议室预约画面 -->
	         <table>
	         	<tr>
	         		<td>
	         		<s:url action="yuyueModifyInit" id="yuyueUrl"></s:url>
	         		<s:a href="%{yuyueUrl}">会议室预约修改</s:a>
	         		</td>
	         	</tr>
	         </table>
	         
	         <!-- 会议室人员一览 -->
	         <table>
	         	<tr>
	         		<td>
	         		<s:url action="hyattendinfo" id="attendUrl"></s:url>
	         		<s:a href="%{attendUrl}">参加会议人员一览</s:a>
	         		</td>
	         	</tr>
	         </table>
			 <!-- 预约会议确认回执 -->
	         <table>
	         	<tr>
	         		<td>
	         		<s:url action="hyaffirmattend" id="affirmattendUrl"></s:url>
	         		<s:a href="%{affirmattendUrl}">预约会议确认回执</s:a>
	         		</td>
	         	</tr>
	         </table>
	         <table>
		         <tr>
		         	<td>
		         		
		         		<a href="/SSH/config-browser/index.action">config-browser</a>
		         		
		         	</td>
		         </tr>
	         </table>
	         
	          <table>
	         	<tr>
	         		<td>
	         		<s:url action="distributeUpdateSrollAction" id="distributeUrl"></s:url>
		         	  <s:a href="%{distributeUrl}" >会议室更新_scoll</s:a> 
	         		
	         		</td>
	         	</tr>
	         </table>
	         
	         <table>
	         	<tr>
	         		<td>
	         		<s:url action="distributeUpdatePageAction" id="distributeUrl"></s:url>
		         	  <s:a href="%{distributeUrl}" >会议室更新_page</s:a> 
	         		
	         		</td>
	         	</tr>
	         </table>
	         
         </s:bean>
    </body>
</html>
         