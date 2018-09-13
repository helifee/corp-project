<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
	///page/uploadFile/uploadfile.jsp
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 基础数据导入 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript">

</script>
</head>
<body>

 <html:form enctype="multipart/form-data" action="fileAction.do"> 


	<input id="business_name" type="hidden" value="querybook">
	<input id="repeatmark" type="hidden" value="0" />




	<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					
					<td></td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">基础数据导入</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		<div class="table_body">
                                                     <div class="table_content">
                                                      <table >
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
                                                      </tr>
															
															<tr>
																<td class="text_tablehead_b" >
																		文件上传
																</td>
																<td>
																   <select name="param" id="param">
				                   			                             
				                   			                             <option value="301">公共参数数据文件(301)</option>
				                   			                             <option value="306">业务金额上限参数文件(306)</option>
				                   			                             <option value="307">报文编号与业务种类对照关系文件(307)</option>
				                   			                             <option value="417">业务权限信息文件(417)</option>
				                   			                             <option value="401">行名行号文件(401)</option>
				                   			                             <option value="403">基础数据文件(403)</option>
				                   			                             <option value="407">CIS代理关系文件(407)</option>
				                   			                             <option value="411">节点运行状态文件(411)</option>
				                   			                             <option value="423">参与者运行状态文件(423)</option>
				                   			                             <option value="414">参与者数字证书绑定信息文件(414)</option>
				                   		                             </select>
																</td>
																<td>
																	 <html:file property="myFile"/><p> 
																 </td>
																
																
															</tr>
														
															
																
															</table>
                                                 </div>
                                                 <div class="table_content" align="center">
                                                 <br />
									
									<input type="submit" class="button" value="上传" />
										<br />
										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										<br />
										<br />
                                                     </div>
                                                    </div>
                                           </td>
                                         </tr>
                                      </table>
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table> 
</html:form>
</body>
</html>
