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
                						<div  class="text_title"><span class="text_blue2">支票圈存管理详细信息</span></div>
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
				          <c:if test="${cem==null}">
				           
				             
				              <tr>
				                 <td  align="center" class="text_details_L">出错啦：详细信息显示失败！</td>
				              </tr>
				              
				          </c:if>
	                      <c:if test="${cem!=null}">
				           <tr>
			                   <td  class="text_details_L">序号：</td><td  class="text_details_R" >${cem.id}</td>
			                   <td  class="text_details_L">报文标识号：</td><td  class="text_details_R">${cem.msgid}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">发起参与机构行号：</td><td  class="text_details_R">${cem.instgpty}</td>
			                   <td  class="text_details_L">接收参与机构行号：</td><td  class="text_details_R">${cem.instdpty}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">发起直接参与机构：</td><td  class="text_details_R">
			               			  	 ${cem.instgdrctpty}
			               		</td>
			                   <td  class="text_details_L">接收直接参与机构：</td><td  class="text_details_R">
			                   		${cem.instddrctpty}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">原发起参与机构：</td><td  class="text_details_R"> ${cem.orgnlinstgpty}</td>
			               	  	<td  class="text_details_L">原报文标识号：</td><td  class="text_details_R">${cem.orgnlmsgid}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">原报文类型号：</td><td  class="text_details_R">${cem.orgnlmsgtpcd}</td>
			               		<td  class="text_details_L">支票圈存申请解除标识：</td><td  class="text_details_R">${cem.applyorccltp}</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">出票日期：</td>
			                   <td  class="text_details_R"  >
			                   ${cem.issuedt}
																
			                   </td>
			                    <td  class="text_details_L">支票号码： </td>
			                   <td  class="text_details_R"  >
			                  ${cem.notesno}								
			                   </td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">出票行行号：</td><td  class="text_details_R">	${cem.drawerbrnchid}</td>
			                   <td  class="text_details_L">出票人账号：</td><td  class="text_details_R">${cem.draweracct}</td>
			               </tr>
			               
			               <tr>
			                   <td  class="text_details_L">金额：</td><td  class="text_details_R"  >  ${cem.amount} </td> 
			                 <td  class="text_details_L">校验模式：</td><td  class="text_details_R"  >${cem.chckmd}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">校验密码：</td><td  class="text_details_R"  >  ${cem.chckcd} </td> 
			                 <td  class="text_details_L">支票正面图像长度：</td><td  class="text_details_R"  >${cem.imagefrontlngth}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">支票正面图像数据：</td><td  class="text_details_R"  >   </td> 
			                 <td  class="text_details_L">来往标识 ：</td><td  class="text_details_R"  >${cem.direction}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">支付交易组号：</td><td  class="text_details_R"  >  ${cem.pmtgrpid} </td> 
			                 <td  class="text_details_L">工作日期：</td><td  class="text_details_R"  >${cem.workdt}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">报文发送时间：</td><td  class="text_details_R"  >  ${cem.credttm} </td> 
			                 <td  class="text_details_L">回执报文标识号：</td><td  class="text_details_R"  >${cem.recptmsgid}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">回执报文时间：</td><td  class="text_details_R"  >  ${cem.recptdttm} </td> 
			                 <td  class="text_details_L">系统编号：</td><td  class="text_details_R"  >${cem.systemcd}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">备注：</td><td  class="text_details_R"  >  ${cem.ustrd} </td> 
			                 <td  class="text_details_L">业务状态：</td><td  class="text_details_R"  >${cem.status}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">处理状态：</td><td  class="text_details_R"  >  ${cem.prcsts} </td> 
			                 <td  class="text_details_L">处理码：</td><td  class="text_details_R"  >${cem.prccd}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">拒绝码：</td><td  class="text_details_R"  >  ${cem.rjctcd} </td> 
			                 <td  class="text_details_L">拒绝信息：</td><td  class="text_details_R"  >${cem.rjctinf}</td></tr>
				              <tr>
			                   <td  class="text_details_L">拒绝业务的参与机构行号：</td><td  class="text_details_R"  >  ${cem.rjctedptyid} </td> 
			                 <td  class="text_details_L">处理日期：</td><td  class="text_details_R"  >${cem.prcdt}</td></tr>
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
 