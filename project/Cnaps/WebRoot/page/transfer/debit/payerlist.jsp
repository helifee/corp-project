
<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean"
	prefix="bean"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html"
	prefix="html"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic"
	prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>
<%
	String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
		<title>定期借记付款人明细</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css"
			type="text/css" media="screen,projection" />
		<script type="text/javascript">
 
 
  
	 function queryDetail(url){

	document.forms[0].action=getRootPath()+url;
	document.forms[0].submit();
	
}
	function xiugaibc(){
		if(confirm("确定要更改吗？")){
			ckeckwethornull();
		}
	}
	
	function detailAdd(pmtgrpid,id,pmtkd){
	 
	
		 var url = getRootPath()+"/RegularDebitChildrenAction.do?method=beForsaveChild&pmtgrpid="+pmtgrpid+"&id="+id+"&pmtkd="+pmtkd;
		 var i = createWinByHeiWid("wind","定期借记付款人增加", url,400,'90%');
	 	i.on("beforedestroy",function(){
		 		window.location.href=getRootPath()
					+ "/RegularDebitChildrenAction.do?method=queryList&id="+id+"&pmtkd="+pmtkd;
				return true;
		 	});
	 	i.show();
	}
	function detailView(prntId,id,pmtgrpid,pmtkd,flag){
		var url;
		 if("edit"==flag){
		  	url = getRootPath()+"/RegularDebitChildrenAction.do?method=gotoDetailEdit&pmtkd="+pmtkd+"&parentid="+prntId+"&id="+id;
		 }else if("detel"==flag){
		 	url = getRootPath()+"/RegularDebitChildrenAction.do?method=deleteChild&PrntId="+prntId+"&id="+id+"&pmtgrpid="+pmtgrpid;
		 }else{
		 	url = getRootPath()+"/RegularDebitChildrenAction.do?method=personDetail&id="+id;
		 }
	
	 	var i =  createWinByHeiWid("wind","明细查看", url,400,'90%');
	 	i.on("beforedestroy",function(){
		 		window.location.href=getRootPath()
					+ "/RegularDebitChildrenAction.do?method=queryList&id="+prntId+"&pmtgrpid="+pmtgrpid;
				return true;
		 	});
	 	i.show();
	}

function queryDelete(url){

	document.forms[0].action=getRootPath()+url;
	document.forms[0].submit();
	
}	
function nullsubmit1()
{
	   var msg = "@";
	  var file= document.getElementById("file");
	  if(isNull(trim(file.value))){
					msg += file.title+"文件不能为空！@";
				}
				var boo = msgSplit(msg);
				if(boo){
				
					this.document.forms[0].submit();
				}
		
	 
}
function querysubmit(pmtgrpid,id) 
{
	  document.forms[0].action=getRootPath()+"/RegularDebitChildrenAction.do?method=queryList&pmtgrpid="+pmtgrpid+"&id="+id;
	document.forms[0].submit();
	 
}

</script>

	</head>
	<body>




		<html:form method="post" enctype="multipart/form-data"
			action="/RegularDebitChildrenAction.do?method=batchSave&pmtkd=${pmtkd}&id=${PrntId}">
			<input id="business_name" type="hidden" value="regularDebitSigned">
			<input id="repeatmark" type="hidden" value="0">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td width="8" height="48"></td>
					<td>
						<table width="100%" height="48" border="0" cellpadding="0"
							cellspacing="0">
							<tr>
								<td width="360" class="text_tablehead_b">
									<h5 align="left">
										&nbsp;
									</h5>
								</td>
								<td width="194"></td>
								<td width="270"></td>
							</tr>
						</table>
					</td>
					<td width="8"></td>
				</tr>
				<tr valign="top">
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);"></td>
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table width="95%"  border="0" cellpadding="0"
											cellspacing="0">
											<tr>
												<td >
													
													<div  class="text_title"><span class="text_blue2">付款人列表信息</span></div>
												</td>
												<td width="781"></td>
											</tr>
										</table>
										<table width="95%" border="0" cellpadding="0" cellspacing="0"
											style="border: 1px #B3B3B3 solid; padding: 3px; background: #F2F2F2;">
											<tr>
												<td width="30">
													&nbsp;
												</td>

												<td width="30">
													&nbsp;

												</td>
											</tr>
											<tr>

												<td class="text_tablehead_b">
													金额
												</td>
												<td>
													<html:text property="poDetails.dtlAmt" maxlength="20" />
												</td>
												<td class="text_tablehead_b">
													付款人账号
												</td>
												<td>
													<html:text property="poDetails.dbtracct" maxlength="32" />
												</td>
												<td>
													<input name="query" type="button" class="button" value="查询"
														onclick="querysubmit('${pmtgrpid}','${PrntId}')" />

												</td>
											</tr>
											<tr>
												<td width="30">
													&nbsp;

												</td>

												<td width="30">
													&nbsp;

												</td>


											</tr>
											
										</table>
										 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
               <tr>
                
                 
			        	<td class="text_tablehead_b">&nbsp;
			        	  单条导入
			        	</td>
			        	<td>&nbsp;
			         	   <input name="addButton" type="button" class="button"
														value="新 增"
														onClick="detailAdd('${pmtgrpid}','${PrntId}','${pmtkd }')" />
						</td>
                </tr>  
                <tr>
                	<td class="text_tablehead_b"> 
			        	  批量导入
			        	</td>
			        	
			        	<td>
			        	<input name="zcxfiles" type="file" id="file" size="1" value="批量导入" />
						<input name="query" type="button" class="button" value="导 入" onclick="nullsubmit1()" />
			        	</td>
			        	 
                </tr>
			   </table>
										
										
										<table width="761" height="23" border="0" cellpadding="0"
											cellspacing="0">
											<tr>
												<td width="41"></td>
												<td width="41" align="center"></td>
												<td width="414">
													<div align="right">
													</div>
												</td>
											</tr>
										</table>

										<table width="95%" border="0" cellpadding="0" cellspacing="0"
											class="tbcolor">
											<tr>
												<!--         <td  align="center" class="text_listhead">序号</td>
				                   <td  align="center" class="text_listhead">关联序号</td> -->
												<td align="center" class="text_listhead">
													付款人帐号
												</td>

												<td align="center" class="text_listhead">
													付款行行号
												</td>
												<td align="center" class="text_listhead">
													付款行行名
												</td>
												<td align="center" class="text_listhead">
													金额
												</td>
												<td align="center" class="text_listhead">
													操作
												</td>


											</tr>
											<logic:present name="queryList">
												<logic:iterate id="po" name="queryList">

													<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
														onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
														bgcolor="E6E6E6">
														<!--             <td  class="text_list"><div class="gridCell_standard">${po.id}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.prntid}</td>-->
														<td class="text_list">
															<div class="gridCell_standard">
																${po.dbtracct}
														</td>

														<td class="text_list">
															<div class="gridCell_standard">
																${po.dbtrbrnchid}
														</td>
														<td class="text_list">
															<div class="gridCell_standard">
																${po.dbtrbrnchnm}
														</td>
														<td class="text_list">
															<div class="gridCell_standard">


																<fmt:formatNumber
																	pattern="###,###,###,###,###,###,##0.00"
																	value="${po.dtlAmt}" />
														</td>
														<td class="text_list">

															<a href="#"
																onclick="detailView('${PrntId}','${po.id}','${pmtgrpid}','${pmtkd }','view')">明细</a>&nbsp;
															<a href="#"
																onclick="detailView('${PrntId}','${po.id}','${pmtgrpid}','${pmtkd }','edit')"">修改</a>&nbsp;
															<a href="#"
																onclick="detailView('${PrntId}','${po.id}','${pmtgrpid}','${pmtkd }','detel')"">删除</a>


														</td>

													</tr>
												</logic:iterate>
												 <logic:empty name="queryList">
								                  	<tr>
								                		<td colspan="9" align="center"><font color="red">没有符合条件的记录!</font></td>
								                	</tr>
								                  </logic:empty>  
											</logic:present>
										</table>
							</tr>
							<tr>
								<td></td>
								<td>
									<table width="100%" border="0" cellpadding="0" cellspacing="0">
										<tr>
											<td><jsp:include page="/page/common/Page.jsp" /></td>
										</tr>
									</table>
								</td>
								<td></td>
							</tr>
						</table>
					</td>
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);"></td>

				</tr>
			</table>




















		</html:form>

	</body>
</html>














