<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<html>
    <head>
    	<title>远东公司内部网</title>
    </head>
    <body>
        <div style="width: 300px;border-style: solid">
        	<p>登录:</p>
			<s:form action="domainlogin"  namespace="/common">
                <s:textfield id="userid" label="用户ID" name="userId" size="15" maxlength = "15" />
                <s:password id="password" label="密码" name="password" size="17" maxlength="100"/>
            	<s:submit value="登录"></s:submit>
			</s:form>
            <s:property value="errormsg"/>
        </div>
    </body>

</html>

