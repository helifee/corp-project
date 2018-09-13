<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>

<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>小额异常明细查询列表 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
			type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>

<script language="javascript">

	
	function viewdetails(chckDt,pmtTp){
		var newurl = "<%=path %>/DuizhangAction.do?method=duizhangExceptionprocDetal&systemcd=HVPS&chckdt="+chckDt+"&pmtTp="+pmtTp;
		viewDetails(newurl);	
	}
	function confirm(){
		if(VForm.Validate()){
			  document.forms[0].submit();
		}
		
	}
</script>

</head>
<body>
<html:form  method="post" action="/DuizhangAction.do?method=duizhangExceptionproc">
<input type="hidden" name="systemcd" value="HVPS"/>
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
					</td>
					<td  width="194" ></td>
					<td  width="270"  ></td>				
					</tr>
				</table>
			</td>
			<td width="8" ></td>
		</tr>
	  	<tr valign="top">
	    	<td >
	    	<td >
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	          			<td width="10">&nbsp;</td>
	          			<td>
	          				<div align="center">
											<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">小额异常查询明细</span></div>
                					</td>
                				</tr>
                			</table>
											</div>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					                <tr class="text_listhead">
					                   <td  align="center" class="text_listhead">支付业务组号</td>
					                    <td  align="center" class="text_listhead">支付业务序号</td>
					                   <td  align="center" class="text_listhead">业务类型编码</td>	
					                   <td  align="center" class="text_listhead">报文标识号</td>
					                    <td  align="center" class="text_listhead">报文类型编码</td>
					                    <td  align="center" class="text_listhead">汇款金额</td>
					                   <td  align="center" class="text_listhead">总金额</td>	
					                   <td  align="center" class="text_listhead">轧差日期</td>
					                    <td  align="center" class="text_listhead">轧差场次</td>
					                    <td  align="center" class="text_listhead">清算日期</td>
					                   <td  align="center" class="text_listhead">业务状态</td>	
					                   <td  align="center" class="text_listhead">来往标识</td>
					                    <td  align="center" class="text_listhead">申请人账号</td>
					                   <td  align="center" class="text_listhead">发起参与机构</td>
					                   <td  align="center" class="text_listhead">操作</td>
					                </tr>
					             	<c:forEach items="${entity.duizhangList}" var="po">
					             		<tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='FFFFD0'" bgcolor="FFFFD0">
							                  <td  class="text_list"><div class="gridCell_standard">${entity.pmtGrpId }</div></td>
							                    <td  class="text_list"><div class="gridCell_standard">${entity.txId}</div></td>
							                 <td  class="text_list"><div class="gridCell_standard">${entity.pmtTp }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${entity.txId}</div></td>
							                 <td  class="text_list"><div class="gridCell_standard">${entity.msgId }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${entity.msgTpCd}</div></td>
							                 <td  class="text_list"><div class="gridCell_standard">${entity.amount }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${entity.totalAmt}</div></td>
							                 <td  class="text_list"><div class="gridCell_standard">${entity.netgDt }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${entity.netgRnd}</div></td>
							                 <td  class="text_list"><div class="gridCell_standard">${entity.sttlmDt }</div></td>
							                    <td  class="text_list"><div class="gridCell_standard">${entity.status}</div></td>
							                 <td  class="text_list"><div class="gridCell_standard">${entity.direction }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${entity.status}</div></td>
							                 <td  class="text_list"><div class="gridCell_standard">${entity.direction }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${entity.instgPty }</div></td>
							                  <td  class="text_list"><div align="center"><span class="text_list">
                                              	<%-- 
                                               <a href="#"   onClick="viewdetails('${entity.chckdt }','${po.pmtTp }')"><u>操作</u></a></span></div>
                                              	--%>
                                              </td>
						                  </tr>
					             	</c:forEach>
					                
		                		</table>
		             		</div>
		             		              
	            		</td>
	        		</tr>
					<tr>  
			    		<td></td>      
					   	<td>
					       	<table width="100%" border="0" cellpadding="0" cellspacing="0">
					        	<tr>
					          		<td><jsp:include page="/page/common/Page.jsp"/></td>
					          	</tr>
				         	</table>
				        </td>
			     		<td></td>
		     		</tr>
	    		</table>
	    	</td>
	    	<td >
	    	</td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
