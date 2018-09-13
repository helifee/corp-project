<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title>通用信息查询明细</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/common/check.js"></script>
		<script type="text/javascript">

			 
		</script>
		
	</head>
	<body >
 
	<form>
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
                						<div  class="text_title"><span class="text_blue2">明细信息</span></div>
                					</td>
                				</tr>
                			</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head" >
											
											<tr>
												<td height="30">
													<div align="center">
													<br/><br/><br/>
														<table class="tbcolor"><tr><td  class="text_details_L">序号            ：</td><td  class="text_details_R" >${entity.id            }</td>
								<td  class="text_details_L">工作日期        ：</td><td  class="text_details_R" >${entity.workdate       }</td>
								</tr><tr><td  class="text_details_L">来往标识        ：</td><td  class="text_details_R" >${entity.direction     }</td>
								<td  class="text_details_L">支付交易组号    ：</td><td  class="text_details_R" >${entity.pmtGrpId      }</td>
								</tr><tr><td  class="text_details_L">报文标识号      ：</td><td  class="text_details_R" >${entity.msgid         }</td>
								<td  class="text_details_L">报文发送时间    ：</td><td  class="text_details_R" >${entity.credttm       }</td>
								</tr><tr><td  class="text_details_L">回执报文标识号  ：</td><td  class="text_details_R" >${entity.resultmsgid    }</td>
								<td  class="text_details_L">回复报文时间    ：</td><td  class="text_details_R" >${entity.resultdttm     }</td>
								</tr><tr><td  class="text_details_L">发起参与机构行号：</td><td  class="text_details_R" >${entity.sendindrctpty      }</td>
								<td  class="text_details_L">接收参与机构行号：</td><td  class="text_details_R" >${entity.recvindrctpty      }</td>
								</tr><tr><td  class="text_details_L">发起直接参与机构：</td><td  class="text_details_R" >${entity.senddrctpty  }</td>
								<td  class="text_details_L">接收直接参与机构：</td><td  class="text_details_R" >${entity.recvdrctpty  }</td>
								</tr><tr><td  class="text_details_L">系统编号        ：</td><td  class="text_details_R" >${entity.systemcode      }</td>
								<td  class="text_details_L">备注            ：</td><td  class="text_details_R" >${entity.remarkinfo         }</td>
								</tr><tr><td  class="text_details_L">业务类型编码    ：</td><td  class="text_details_R" >${entity.ctgypurpcd         }</td>
								<td  class="text_details_L">业务种类编码    ：</td><td  class="text_details_R" >${entity.txtpcd         }</td>
								</tr><tr><td  class="text_details_L">信息标题        ：</td><td  class="text_details_R" >${entity.title        }</td>
								<td  class="text_details_L">信息内容        ：</td><td  class="text_details_R" >${entity.content      }</td>
								</tr><tr><td  class="text_details_L">附件长度        ：</td><td  class="text_details_R" >${entity.attachmentlength   }</td>
								<td  class="text_details_L">附件名称        ：</td><td  class="text_details_R" >${entity.attachmentname    }</td>
								</tr><tr><td  class="text_details_L">附件内容        ：</td><td  class="text_details_R" >${entity.attachmentcontent }</td>
								<td  class="text_details_L">业务状态        ：</td><td  class="text_details_R" >${entity.pmtsts        }</td>
								</tr><tr><td  class="text_details_L">业务处理码      ：</td><td  class="text_details_R" >${entity.procode         }</td>
								<td  class="text_details_L">业务拒绝信息    ：</td><td  class="text_details_R" >${entity.rjctdesc       }</td>
								</tr><tr><td  class="text_details_L">业务处理参与机构：</td><td  class="text_details_R" >${entity.rjctedPtyId   }</td></tr>
	 									</table>
													  
													 <br />
													 
												<br></td>
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
			</form> 
	

 


 
	
	
	
	
	
	
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	
	
	
	
	
	
	
	
	
	
	
	 
	
	
	
	
	
	
	
	
	
	
	 
	</body>
</html>
 