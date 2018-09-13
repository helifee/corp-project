<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <title>SSH連携（DBアクセス）</title>
    </head>
    <body>
        <h3>Search data from DB(UserMst) by userid: </h3>
        <s:form action="SimpleDBAccess">
            UserID : <s:textfield name="userid" />
            <s:submit />
        </s:form>
    </body>
</html>