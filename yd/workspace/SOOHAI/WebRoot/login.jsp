<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<html>
    <head>
    	<title>海景楼盘网</title>
    </head>
    <body>
        <div style="width: 300px;border-style: solid">
        	<p>登录:</p>
			<s:form action="loginserver" validate="true" >
                <s:textfield id="userid" label="用户ID" name="userID" size="15" maxlength = "6" />
                <s:password id="password" label="密码" name="passWord" size="17" maxlength="11"/>
            	<s:submit value="登录"></s:submit>
			</s:form>
            <s:property value="errormsg"/>
        </div>
    </body>

</html>
