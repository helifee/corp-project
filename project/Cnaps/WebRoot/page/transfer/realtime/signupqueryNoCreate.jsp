<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";	
%>
  
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>无标题文档</title>
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/systemGroupManage/queryGroup.js"></script>
 <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
function querysignupList(){

	document.forms[0].action=getRootPath()+"/transfer/PaySignupQueryAction.do?method=queryList";
	document.forms[0].submit();
	
}
	function viewdetailss(id){
	
		var newurl = "<%=path %>/transfer/PaySignupQueryAction.do?method=queryDetail&id="+id;
		viewDetails(newurl);	
	}
	function addView(){
	
	var url = getRootPath()+"/page/transfer/realtime/paySignupCreate.jsp";
	
 	var i = createWin("wind","新增机构",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/transfer/PaySignupQueryAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
function repairView(path){
	
	var url = path;
	 
 	var i = createWin("wind","协议修改",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/transfer/PaySignupQueryAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}

function detailClient(id){
     //alert(id);
	//document.forms[0].action=getRootPath()+"/transfer/RealTimeCreditAction.do?method=CreditDetail&id="+id;
	document.forms[0].action=getRootPath()+id;
	document.forms[0].submit();
}

</script>
</head>

<body>
























<html:form method="post" action="/transfer/PaySignupQueryAction.do?method=queryList">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left"> </h5>
							</td>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
  <tr valign="top">
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
            <div align="center">
             <table width="95%" height="22" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="134" style="background-image:url('<%=path%>/image/psimage.jpg');"><div align="left"><span class="text_blue2">查询条件</span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
                <tr>
                  <td width="120" height="40" class="text_tablehead_b">签约人帐号</td>
                  <td width="120"><div align="left">
                    
                   <html:text property="payAccount"> </html:text>
                  </div></td>  
                  <td class="text_tablehead_b"  >
																		生效日期
																</td>
																<td >
					 <html:text  property="po.activeDate"        styleClass="Wdate"	  onclick="WdatePicker()" 	>  </html:text>
																 
																</td>
                  
                  <td class="text_tablehead_b" >
																	 签约类型
																</td>
																<td >
																	<html:select  property="po.signUpType"  >
																	<html:option value="A">通兑</html:option>
																	<html:option value="B">通兑和账户查询</html:option>
																	<html:option value="C"> 账户查询</html:option>
																		 
																	</html:select>
																	 
																</td>
                   
                  
                </tr>  
                <tr>
                <td  colspan="6" align="center">
                  <input name="query" type="button" class="button" value="查 询"  onclick="querysignupList()"/> 
                 
                  </td>
                </tr>           
              </table>
              <table width="761" height="23" border="0" cellpadding="0" cellspacing="0">
                <tr >
                <td width="41"   ></td>
                <td width="41" align="center"></td>
                <td width="414" ><div align="right">
                </div></td>
                </tr>
              </table>
              
              <table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
                <tr>
                      
                  <td   align="center" class="text_listhead">签约人名称</td>
                  <td   align="center" class="text_listhead">签约账号</td>
                  <td   align="center" class="text_listhead">签约类型</td>
                  <td   align="center" class="text_listhead">签约状态</td>
                  <td   align="center" class="text_listhead">生效日期</td>
                 <td   align="center" class="text_listhead">失效日期</td>
                  <td   align="center" class="text_listhead">明细查看</td>
                </tr>
                <logic:present name="queryList">
                <logic:iterate id="hvpsfront141" name="queryList">
                  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
             
                   
                  <td  class="text_list">${hvpsfront141.name}</td>
                  <td  class="text_list">${hvpsfront141.payAccount}</td>
                  <td  class="text_list">
                  <c:if test="${hvpsfront141.signUpType=='A'}">通兑</c:if>
                  <c:if test="${hvpsfront141.signUpType=='B'}">通兑和账户查询</c:if>
                  <c:if test="${hvpsfront141.signUpType=='C'}">账户查询</c:if>
             

                  
                  </td>
                  <td  class="text_list">
                
                  <c:if test="${hvpsfront141.contractSts=='CS00'}">协议生效</c:if> 
  <c:if test="${hvpsfront141.contractSts=='CS01'}">协议失效</c:if> 
  <c:if test="${hvpsfront141.contractSts=='CS02'}">协议删除</c:if> 
  <c:if test="${hvpsfront141.contractSts=='CS03'}">协议未生效</c:if> 
                  </td>
                  <td  class="text_list">${hvpsfront141.activeDate}</td>
                 <td  class="text_list">${hvpsfront141.unactiveDate}</td>
                 
                  <td  class="text_list">
                      <div align="center">
                      <span class="text_list"> 
                        <a href="#"   onClick="viewDetails('<%=path %>/transfer/PaySignupQueryAction.do?method=queryDetail&id=${hvpsfront141.id}')"><u>明细</u></a>
                           
                      </span>
                      </div>
                 </td>
              
                </tr>
				</logic:iterate>
                </logic:present>
             </table></td>
        </tr>
		<tr>  
	      <td></td>      
	      <td>
	            <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td><jsp:include page="/page/common/Page.jsp"/></td>
        </tr>
      </table>	      </td>
	      <td></td>
	      </tr>
    </table>    </td>
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	
  </tr>  
</table>
</html:form>

























</body>
</html>
