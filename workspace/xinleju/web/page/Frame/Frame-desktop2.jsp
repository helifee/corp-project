<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>招标采购首页</title>
		<link href="css/xinyuan_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/application.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
		<script type="text/javascript">
           $(function(){
               var total = '${dyCount}';
               if(!total){
                   total = 0;
               }
               $('#dy_count',$(parent.document)).html(total);
           });
        </script>
	</head>
	<body>
	    <s:set id="msgDb" value="@com.xinleju.erp.frame.models.Msg@MSG_TYPE_DB"></s:set>
        <s:set id="opTypeWd" value="@com.xinleju.erp.frame.models.Msg@OP_TYPE_WD"></s:set>
		<div style="height:208px;">
	        <table width="100%" border="0" cellpadding="0" cellspacing="1" class="idx_tb01_list">
	        	<tr>
	        		<th>标题</th>
	        		<th width="70" align="center">创建人</th>
	        		<th width="115" align="center">接收日期</th>
	        	</tr>
                <s:iterator value="page.items" var="item" status="stat">
                    <tr>
                       
                        <td>
                              <a title="<s:property value="#item.title"/>" href="#" onclick="openwindow('<s:property value="#item.url"/>','edit_project_wi',1270,0)">
                                  <s:property value="truncate(#item.title,52,'...')"/>
                              </a>
                        </td>
                        <td align="center" title="${item.loginName }"><s:property value="truncate(#item.loginName,10,'...')"/></td>
                        <td align="center">
                           <s:date name="#item.typedDate" format="yyyy-MM-dd"/>
                        </td>
                    </tr>
                </s:iterator>
			</table>
		</div>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="right" class="idxmore">
                    <a href="#" onclick="window.parent.location.href='Msg!index.do?msgDto.msgType=${msgDb}&msgDto.opType=${opTypeWd}'">更多&gt;</a>
                </td>
            </tr>
        </table>
		<jdt:PageMetaTag />
	</body>
</html>