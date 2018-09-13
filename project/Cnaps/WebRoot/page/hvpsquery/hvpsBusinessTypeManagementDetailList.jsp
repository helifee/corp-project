<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title></title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/check.js"></script>
<script type="text/javascript"></script>
</head>
<body >
   <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">				
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF;" ><br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								<br></td>
								<td>
									<div align="center">
									<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">业务种类与类型管理详细信息</span></div>
                					</td>
                				</tr>
                			</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head" >
											
											<tr>
												<td height="30">
													<div align="center">
													<br/><br/><br/>
														<table class="tbcolor">
				          <c:if test="${cmt==null}">
				           
				             
				              <tr>
				                 <td  align="center" class="text_details_L">出错啦：详细信息显示失败！</td>
				              </tr>
				              
				          </c:if>
	                      <c:if test="${cmt!=null}">
				           <tr>
			                   <td  class="text_details_L">序号：</td><td  class="text_details_R" >${cmt.id}</td>
			                   <td  class="text_details_L">报文标识号：</td><td  class="text_details_R">${cmt.msgid}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">报文发送时间：</td><td  class="text_details_R">${cmt.credttm}</td>
			                   <td  class="text_details_L">发起参与机构行号：</td><td  class="text_details_R">${cmt.instgpty}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">接收参与机构行号：</td><td  class="text_details_R">
			               			  	 ${cmt.instdpty}
			               		</td>
			                   <td  class="text_details_L">发起直接参与机构：</td><td  class="text_details_R">
			                   		${cmt.instgdrctpty}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">接收直接参与机构：</td><td  class="text_details_R"> ${cmt.instddrctpty}</td>
			               	  	<td  class="text_details_L">系统编号：</td><td  class="text_details_R">${cmt.systemcd}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">变更类型：</td><td  class="text_details_R">${cmt.changetp}</td>
			               		<td  class="text_details_L">生效类型：</td><td  class="text_details_R">${cmt.effectivetp}</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">生效日期：</td>
			                   <td  class="text_details_R"  >
			                   ${cmt.effectivedt}
																
			                   </td>
			                    <td  class="text_details_L">失效日期： </td>
			                   <td  class="text_details_R"  >
			                  ${cmt.ineffectivedt}								
			                   </td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">业务类型编码集：</td><td  class="text_details_R">	${cmt.pmttpclctn}</td>
			                   <td  class="text_details_L">业务类型编码集名称：</td><td  class="text_details_R">${cmt.pmttpclctnname}</td>
			               </tr>
			               
			               <tr>
			                   <td  class="text_details_L">业务种类编码集：</td><td  class="text_details_R"  >  ${cmt.pmtkdclctn} </td> 
			                 <td  class="text_details_L">业务种类编码集名称：</td><td  class="text_details_R"  >${cmt.pmtkdclctnname}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">报文类型编码集：</td><td  class="text_details_R"  >  ${cmt.msgtpidclctn} </td> 
			                 <td  class="text_details_L">报文类型编码集名称：</td><td  class="text_details_R"  >${cmt.msgtpidclctnname}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">备注：</td><td  class="text_details_R"  >  ${cmt.ustrd} </td> 
			                 <td  class="text_details_L">状态：</td><td  class="text_details_R"  >${cmt.status}</td></tr>
				
				          </c:if>
	                       
	 					</table>
	 				 <br />
                   <br></div></td>
				</tr>
			</table>
		</div>
	<br></td>
	</tr>
	</table>
	<br></td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);"><br></td>
	</tr>
</table>
</body>
</html>
 