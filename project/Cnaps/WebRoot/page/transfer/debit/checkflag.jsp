 <%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>
<%
	String path = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
 <title>���ڽ�Ǹ�������ϸ</title> 
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>

<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
	<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript">
 
 
  
	 function queryDetail(url){

	document.forms[0].action=getRootPath()+url;
	document.forms[0].submit();
	
}
	function xiugaibc(){
		if(confirm("ȷ��Ҫ������")){
			ckeckwethornull();
		}
	}
	
	function detailAdd(path){
	 
	
	 var url = getRootPath()+path;
	 
 	var i = createWin("wind","���ڽ�Ǹ���������",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/RegularDebitChildrenAction.do?method=queryList&id=${PrntId}&pmtgrpid=${pmtgrpid}&checkflag=checkflag";
			return true;
	 	});
 	i.show();
}
	function detailView(path){
	 
	
	 var url = getRootPath()+path;
	 
 	var i = createWin("wind","��ϸ�鿴",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/RegularDebitChildrenAction.do?method=queryList&id=${PrntId}&pmtgrpid=${pmtgrpid}&checkflag=checkflag";
			return true;
	 	});
 	i.show();
}
function queryDelete(url){

	document.forms[0].action=getRootPath()+url;
	document.forms[0].submit();
	
}	
</script>

</head>
<body  >




<html:form method="post" action="/transfer/RegularCreditChildrenAction.do?method=queryDetail&id=${parentid}">
	<input id="business_name" type="hidden" value="regularDebitSigned">
	<input id="repeatmark" type="hidden" value="0">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left">&nbsp;</h5>
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
             <table width="95%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                <td  >
                  	<div class="text_title"><span class="text_blue2"> �������б�</span></div>
                 </td>
                 
                </tr>
              </table>
			
              <table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
                   <tr>
				             <!--         <td  align="center" class="text_listhead">���</td>
				                   <td  align="center" class="text_listhead">�������</td> --> 
				                   <td  align="center" class="text_listhead">�������ʺ�</td>
				                   <td  align="center" class="text_listhead">����������</td>				                  
				                   <td  align="center" class="text_listhead">�����˿������к�</td>
				                   <td  align="center" class="text_listhead">�����˿���������</td>
				                   <td  align="center" class="text_listhead">�������к�</td>
				                   <td  align="center" class="text_listhead">����������</td>
				                   <td  align="center" class="text_listhead">���</td>
				                   <%-- 
				                   	<td  align="center" class="text_listhead">����</td>
				       --%>
				       				 
				                </tr> 
                <logic:present name="queryList">
                <logic:iterate id="po" name="queryList">
                  
               	  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
                       	     <!--             <td  class="text_list"><div class="gridCell_standard">${po.id}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.prntid}</td>-->
						                  <td  class="text_list"><div class="gridCell_standard">${po.dbtracct}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.dbtrnm}</td>
						                   <td  class="text_list"><div class="gridCell_standard">${po.dbtrissuer}</td>
						                   <td  class="text_list"><div class="gridCell_standard">${po.dbtrissuernm}</td>
						                  
						                  <td  class="text_list"><div class="gridCell_standard">${po.dbtrbrnchid}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.dbtrbrnchnm}</td>
						                  <td  class="text_list"><div class="gridCell_standard" align="right">
						                  	<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.dtlAmt}" />
						                </td>
							             <%-- 
							              <td  class="text_list">
							                  
							                <a href="#" onclick="detailView('/RegularDebitChildrenAction.do?method=personDetail&id=${po.id}')">��ϸ</a>&nbsp;
             								 	 
							                  </td>
						             --%>
					                  </tr>
              				</logic:iterate>
                </logic:present>
             </table> 
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














 