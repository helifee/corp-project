<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>出错了</title> 
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/xy_cost.css" /> 
    </head>
    <body> 
        <table id="data_table" width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="xy_01 mgb8" >
            <tr align="center" >
                <td><a href="javascript:void(0);" onclick="history.go(-1);">
                     <img src="${pageContext.request.contextPath}/images/500.jpg" alt="500" style="margin-top: 20px;margin-bottom: 20px;" /> 
                     </a> 
                </td>
            </tr>
            <tr align="center" >
                <td>
                        <a href="javascript:void(0);" onclick="document.getElementById('exceptionStack').style.display=''">查看错误详细信息</a> 
                </td>
            </tr> 
        </table>
        <div style="width: 80%;display: none;text-align: left;margin-left: 50px;" id="exceptionStack" >
             <s:property value="exceptionStack"/>
         </div> 
    </body>
</html>