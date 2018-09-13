<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/xinyuan_style.css" type="text/css" />
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<script src="${pageContext.request.contextPath}/js/ext/adapter/ext/ext-base.js"></script>
<script src="${pageContext.request.contextPath}/js/ext/ext-all.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/ext/resources/css/xtheme-blue.css" />
<script src="${pageContext.request.contextPath}/js/application.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/jquery/jquery-1.7.2.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/jquery.loadmask.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/page/Upload/Upload-fiFileUpload.js" type="text/javascript"></script>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<base target="_self" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>附件上传</title>
	</head>
	<body>
		<script>
			var down_frame;
		</script>
		<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table_fj2" id="todoTable" style="line-height:100%">
			<tr id="titleTr" >
				<th style="text-align: center;font-weight: bold" id="uploadTh">
					附件信息
					<input id="staId" type="hidden" name="staId" value="${staId}" />
				</th>
				<th style="text-align: center;font-weight: bold;width: 60px;" id="addTh">
					<a href="#" title="增加附件"><img src="${pageContext.request.contextPath}/images/icon_add.png" id="addImg0" width="16" height="16" onclick="addRow('titleTr')" /> </a>
				</th>
			</tr>
			<!-- 如果已经上传过附件，则“添加”图片出现在第一个附件处 -->
			<s:if test="uploadList.size>0">
				<s:iterator value="uploadList" var="upload" status="stat">
					<tr id="fileAreadyTr${stat.index}">
						<td>
							<s:if test="#upload.isEncrypt=='true'">
								<a href="File!encrypt.ajax?id=${upload.id}" target="hidden_down_frame${stat.index}" onclick="showDownLoadMask();" title="${upload.fileName}"><app:TruncateTag size="${wordLimit}" src="${upload.fileName}"></app:TruncateTag>
							</s:if>
							<s:else>
								<a href="File!download.ajax?id=${upload.id}" title="${upload.fileName}"><app:TruncateTag size="${wordLimit}" src="${upload.fileName}"></app:TruncateTag>
							</s:else>
							<s:if test="#upload.isSafe==1">
								<img src="images/security.png" align="absmiddle" border="0" title="安全确认通过" />
							</s:if>
							<s:if test="#upload.isSafe==2">
								<img src="images/security_infected.png" align="absmiddle" border="0" title="安全确认-受感染文件" />
							</s:if>
							<s:if test="#upload.isSafe==3">
								<img src="images/security_error.png" align="absmiddle" border="0" title="安全确认异常" />
							</s:if>
							</a>
						</td>
						<td align="right" id="operationTd${stat.index}">
							<s:if test="#upload.isEncrypt=='true'">
								<a href="File!encrypt.ajax?id=${upload.id}" target="hidden_down_frame${stat.index}" onclick="showDownLoadMask();" title="下载"><img src="${pageContext.request.contextPath}/images/icon_downLoad.png" width="16" height="16" /> </a>
							</s:if>
							<s:else>
								<a href="File!download.ajax?id=${upload.id}" title="下载"><img src="${pageContext.request.contextPath}/images/icon_downLoad.png" width="16" height="16" /> </a>
							</s:else>
							<iframe name='hidden_down_frame${stat.index}' id="hidden_down_frame${stat.index}" style='display: none'></iframe>
							<a href="#" title="删除" onclick="deleteRowAndUploadInfo('fileAreadyTr${stat.index}',${upload.id});"><img src="${pageContext.request.contextPath}/images/icon_delete.png" width="16" height="16" /> </a>
							<%-- <a href="#" title="增加附件"><img src="${pageContext.request.contextPath}/images/icon_add.png" id="addImgAready${stat.index}" width="16" height="16" onclick="addRow('fileAreadyTr${stat.index}')" /> </a> --%>
						</td>
					</tr>
				</s:iterator>
			</s:if>
			<!-- 如果未上传过附件，则“添加”图片出现在上传行 -->
			<s:else>
				<tr id="fileTr0">
					<td id="fileTd0">
						<form action="Upload!upload2.ajax" id="form0" name="form0" encType="multipart/form-data" method="post" target="hidden_frame0">
							<input type="hidden" name="ownerId" value="${ownerId}" />
							<input type="hidden" name="category" value="${category}" />
							<input type="hidden" name="isScan" value="${isScan}" />
							<input type="hidden" name="isEncrypt" value="${isEncrypt}" />
							<input type="hidden" name="isDoAfter" value="${isDoAfter}" />
							<input type="hidden" name="luckyTime" value="${luckyTime}" />
							<input type="hidden" name="maskCode" value="${maskCode}" />
							<input type="hidden" name="filedataId" value="filedata0" />
							<input type="hidden" name="fileTdId" value="fileTd0" />
							<input type="hidden" name="operationTdId" value="operationTd0" />
							<input type="hidden" name="fileTrId" value="fileTr0" />
							<input type="hidden" name="fileLimit" value="${fileLimit}" />
							<input type="hidden" name="wordLimit" value="${wordLimit}" />
							<input type="hidden" name="source" value="${source}" />
							<table cellpadding="0" cellspacing="0" border="0" align="left" width="98%">
								<tr>
									<td align="left">
										<input type="file" id="filedata0" name="filedata" style="height: 22px;width: 98%;"/>
									</td>
									<td align="right" style="padding-left: 0;padding-right: 0;">
										<input type="button" value="上传" onclick="start_upload('form0','filedata0','${ownerId}','${category}','fileTd0','operationTd0')" />
									</td>
								</tr>
							</table>
							<iframe name='hidden_frame0' id="hidden_frame0" style='display: none'></iframe>
							<s:token></s:token>
						</form>
					</td>
					<td align="right" id="operationTd0">
						<%-- <a href="#" title="增加附件"><img src="${pageContext.request.contextPath}/images/icon_add.png" id="addImg0" width="16" height="16" onclick="addRow('fileTr0')" /> </a> --%>
					</td>
				</tr>
			</s:else>
			<s:if test="isNeedAlert==null||isNeedAlert=='true'">
				<tr id="alertTr" style="display: none;">
					<td align="left" colspan="2">
						<div style="word-wrap: break-word;word-break:break-all;">
							<span class="credb">备注：</span><br/>
							附件支持格式为：${includeType}<br/>
							附件大小限制为：${fileLimit}M
							<s:if test="userAlertMess=='true'">
								<br/>特别提醒：<span id="userAlertMessSpan"></span>
							</s:if>
						</div>
					</td>
				</tr>
			</s:if>
		</table>
		<script>
			var staId = '${staId}';
			var ownerId = '${ownerId}';
			var category = '${category}';
			var includeType = '${includeType}';
			var isScan = '${isScan}';
			var isEncrypt = '${isEncrypt}';
			var isDoAfter = '${isDoAfter}';
			var luckyTime = '${luckyTime}';
			var fileLimit = '${fileLimit}';
			var maskCode = '${maskCode}';
			var wordLimit = '${wordLimit}';
			var isAutoNext = '${isAutoNext}';
			var isParentReHeight = '${isParentReHeight}';
			var source = '${source}';
			var isCheckFileName = '${isCheckFileName}';
			var count=0;
			var uploadListSize = "<s:property value='uploadList.size'/>"
			var dt = new Date();
			function addRow(trObj){
				count++;
				var html="<tr id=\"fileTr"+count+"\">"+
							"<td id=\"fileTd"+count+"\">"+
								"<form action=\"Upload!upload2.ajax\" id=\"form"+count+"\" name=\"form"+count+"\" encType=\"multipart/form-data\" method=\"post\" target=\"hidden_frame"+count+"\" >"+
									"<input type=\"hidden\" name=\"ownerId\" value=\""+ownerId+"\"/>"+
									"<input type=\"hidden\" name=\"staId\" value=\""+staId+"\"/>"+
									"<input type=\"hidden\" name=\"category\" value=\""+category+"\"/>"+
									"<input type=\"hidden\" name=\"isScan\" value=\""+isScan+"\"/>"+
									"<input type=\"hidden\" name=\"isEncrypt\" value=\""+isEncrypt+"\"/>"+
									"<input type=\"hidden\" name=\"isDoAfter\" value=\""+isDoAfter+"\" />"+
									"<input type=\"hidden\" name=\"maskCode\" value=\""+maskCode+"\" />"+
									"<input type=\"hidden\" name=\"luckyTime\" value=\""+luckyTime+"\" />"+
									"<input type=\"hidden\" name=\"filedataId\" value=\"filedata"+count+"\"/>"+
									"<input type=\"hidden\" name=\"fileTdId\" value=\"fileTd"+count+"\"/>"+
									"<input type=\"hidden\" name=\"operationTdId\" value=\"operationTd"+count+"\"/>"+
									"<input type=\"hidden\" name=\"fileTrId\" value=\"fileTr"+count+"\"/>"+
									"<input type=\"hidden\" name=\"fileLimit\" value=\""+fileLimit+"\" />"+
									"<input type=\"hidden\" name=\"wordLimit\" value=\""+wordLimit+"\" />"+
									"<input type=\"hidden\" name=\"source\" value=\""+source+"\" />"+
									"<input type=\"hidden\" name=\"request_time\" value=\""+dt.getTime()+"\" />"+
									"<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\" width=\"98%\">"+
										"<tr>"+
											"<td align=\"left\">"+
												"<input type=\"file\" id=\"filedata"+count+"\" name=\"filedata\" style=\"height: 22px;width: 98%;\"/> "+
											"</td>"+
											"<td align=\"right\" style=\"padding-left: 0;padding-right: 0;\">"+
												"<input type=\"button\" value=\"上传\" onclick=\"start_upload('form"+count+"','filedata"+count+"','"+ownerId+"','"+category+"','fileTd"+count+"','operationTd"+count+"')\" />"+
											"</td>"+
										"</tr>"+
									"</table>"+
									"<iframe name='hidden_frame"+count+"' id=\"hidden_frame"+count+"\" style='display: none'></iframe>"+
								"</form>"+
							"</td>"+
							"<td align=\"right\" id=\"operationTd"+count+"\">"+
								"<a href=\"#\" title=\"删除\" onclick=\"deleteRow('fileTr"+count+"');\"><img src=\"\images/icon_delete.png\" width=\"16\" height=\"16\" /> </a>"+
								/* "<a href=\"#\" title=\"增加附件\"><img src=\"images/icon_add.png\" width=\"16\" height=\"16\" id=\"addImg"+count+"\" onclick=\"addRow('fileTr"+count+"')\" /> </a>"+ */
							"</td>"+
					"</tr>";
				$("#"+trObj).after(html);   
				//高度自适应
				window.frameElement.height = document.body.scrollHeight;
				//若需要父页面也高度自适应则进入以下程序
				if('true'==isParentReHeight){
					try{
						parent.window.frameElement.height = parent.document.body.scrollHeight;
					}catch(e){
					
					}
				}
			}
			
			//删除行
			function deleteRow(trObj){
				$("#"+trObj).remove();
				ifLast();
				//高度自适应
				window.frameElement.height = document.body.scrollHeight;
			  	//若需要父页面也高度自适应则进入以下程序
				if('true'==isParentReHeight){
					try{
						parent.window.frameElement.height = parent.document.body.scrollHeight;
					}catch(e){
					
					}
				}
			}
			
			//删除行且删除相应附件信息
			function deleteRowAndUploadInfo(trObj,uploadId){
				Ext.Ajax.request({
					url : 'upload!delete2.ajax',
					params : {
						id : uploadId,
						request_time : dt.getTime()
					},
					success : function(response) {
						var data = Ext.util.JSON.decode(response.responseText);
						if (data.success) {
							$("#"+trObj).remove();
							ifLast();
							//同步计数器
							initFileCount(category,ownerId,luckyTime);
							//高度自适应
							window.frameElement.height = document.body.scrollHeight;
						} else {
							Ext.MessageBox.alert('警告', '删除附件失败。');
						}
					}
				})
			}
			
			function ifLast(){
				//如果删到没有行了，则自动加一行
				var trs = $('#todoTable').find('tr');
				if(trs.length<=2){
					var html="<tr id=\"fileTr0\">"+
								"<td id=\"fileTd0\">"+
									"<form action=\"upload!upload2.ajax\" id=\"form0\" name=\"form0\" encType=\"multipart/form-data\" method=\"post\" target=\"hidden_frame0\" >"+
										"<input type=\"hidden\" name=\"ownerId\" value=\""+ownerId+"\"/>"+
										"<input type=\"hidden\" name=\"category\" value=\""+category+"\"/>"+
										 "<input type=\"hidden\" name=\"isScan\" value=\""+isScan+"\"/>"+
										"<input type=\"hidden\" name=\"isEncrypt\" value=\""+isEncrypt+"\"/>"+
										"<input type=\"hidden\" name=\"isDoAfter\" value=\""+isDoAfter+"\" />"+
										"<input type=\"hidden\" name=\"maskCode\" value=\""+maskCode+"\" />"+
										"<input type=\"hidden\" name=\"luckyTime\" value=\""+luckyTime+"\" />"+
										"<input type=\"hidden\" name=\"filedataId\" value=\"filedata0\"/>"+
										"<input type=\"hidden\" name=\"fileTdId\" value=\"fileTd0\"/>"+
										"<input type=\"hidden\" name=\"operationTdId\" value=\"operationTd0\"/>"+
										"<input type=\"hidden\" name=\"fileTrId\" value=\"fileTr0\"/>"+
										"<input type=\"hidden\" name=\"fileLimit\" value=\""+fileLimit+"\" />"+
										"<input type=\"hidden\" name=\"wordLimit\" value=\""+wordLimit+"\" />"+
										"<input type=\"hidden\" name=\"source\" value=\""+source+"\" />"+
										"<input type=\"hidden\" name=\"request_time\" value=\""+dt.getTime()+"\" />"+
										"<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\" width=\"98%\">"+
											"<tr>"+
												"<td align=\"left\">"+
													"<input type=\"file\" id=\"filedata0\" name=\"filedata\" style=\"height: 22px;width: 98%;\"/> "+
												"</td>"+
												"<td align=\"right\" style=\"padding-left: 0;padding-right: 0;\">"+
													"<input type=\"button\" value=\"上传\" onclick=\"start_upload('form0','filedata0','"+ownerId+"','"+category+"','fileTd0','operationTd0')\" />"+
												"</td>"+
											"</tr>"+
										"</table>"+
										"<iframe name='hidden_frame0' id=\"hidden_frame0\" style='display: none'></iframe>"+
									"</form>"+
								"</td>"+
								"<td align=\"right\" id=\"operationTd0\">"+
									/* "<a href=\"#\" title=\"增加附件\"><img src=\"images/icon_add.png\" width=\"16\" height=\"16\" id=\"addImg0\" onclick=\"addRow('fileTr0')\" /> </a>"+ */
								"</td>"+
							"</tr>";
					$("#titleTr").after(html);
				}
			}
			//若需要自动出现“浏览”，方便下一次上传，则自动添加一行
			if('true'==isAutoNext && uploadListSize>0){
				autoAddRow();
			}
			
			//同步计数器
			initFileCount(category,ownerId,luckyTime);
		</script>
	<jdt:PageMetaTag/>
	</body>
</html>