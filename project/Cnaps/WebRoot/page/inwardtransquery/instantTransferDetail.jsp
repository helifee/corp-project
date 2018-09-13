<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 即时转账业务明细 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
</head>
<body>
<html:form  method="post" action="/instantTransferAction.do?method=querySendxml">
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
	      			<input type="hidden" name="po.direction" size="32" maxlength="32" value="I"/>
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	          			<td width="6">&nbsp;</td>
	          			</tr>
	          			<tr>
	          			<td >&nbsp;</td>
	          			<td>
	          			<div align="center">
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6"><div  class="text_title"><span class="text_blue2">明细信息</span></div></td>
                				</tr>
                				</table>
            				</div>
            				
            				<br/>
		            		<div align="center">
		              			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr><td colspan='4'>公共信息模块</td></tr>
									<tr><td class="text_details_L">序号            </td><td class="text_details_R" style="width: 220;">${po.id          }</td>
									<td class="text_details_L">报文标识号      </td><td class="text_details_R" style="width: 220;">${po.msgId       }</td></tr> 
									<tr><td class="text_details_L">回执报文标识号  </td><td class="text_details_R" style="width: 220;">${po.recptMsgId  }</td> 
									<td class="text_details_L">支付业务序号    </td><td class="text_details_R" style="width: 220;">${po.txId        }</td></tr> 
									<tr><td class="text_details_L">端到端标识号    </td><td class="text_details_R" style="width: 220;">${po.endToEndId  }</td> 
									<td class="text_details_L">业务类型编码    </td><td class="text_details_R" style="width: 220;">${po.pmtTp       }</td></tr> 
									<tr><td class="text_details_L">币种代码        </td><td class="text_details_R" style="width: 220;">${po.currencyCd  }</td> 
									<td class="text_details_L">汇款金额        </td><td class="text_details_R" style="width: 220;">${po.amount      }</td></tr> 
									<tr><td class="text_details_L">业务优先级      </td><td class="text_details_R" style="width: 220;">${po.sttlmPrty   }</td> 
									<td class="text_details_L">系统工作日      </td><td class="text_details_R" style="width: 220;">${po.workDt      }</td></tr> 
									<tr><td class="text_details_L">业务类型编码集  </td><td class="text_details_R" style="width: 220;">${po.pmtTpClctn  }</td> 
									<td class="text_details_L">业务种类编码集  </td><td class="text_details_R" style="width: 220;">${po.pmtKdClctn  }</td></tr> 
									<tr><td class="text_details_L">发起参与机构    </td><td class="text_details_R" style="width: 220;">${po.instgPty    }</td> 
									<td class="text_details_L">发起直接参与机构</td><td class="text_details_R" style="width: 220;">${po.instgDrctPty}</td></tr> 
									<tr><td colspan='4'>付款人信息模块</td></tr>
									<tr><td class="text_details_L">付款人账号      </td><td class="text_details_R" style="width: 220;">${po.dbtrAcct    }</td> 
									<td class="text_details_L">付款人名称      </td><td class="text_details_R" style="width: 220;">${po.dbtrNm      }</td></tr> 
									<tr><td class="text_details_L">付款人地址      </td><td class="text_details_R" style="width: 220;">${po.dbtrAddr    }</td>
									<td class="text_details_L">付款人开户行行号</td><td class="text_details_R" style="width: 220;">${po.dbtrIssuer  }</td></tr> 
									<tr><td class="text_details_L">付款人开户行行名</td><td class="text_details_R" style="width: 220;">${po.dbtrIssuerNm}</td> 
									<td class="text_details_L">付款清算行行号  </td><td class="text_details_R" style="width: 220;">${po.dbtrMmbId   }</td></tr> 
									<tr><td class="text_details_L">付款行行号      </td><td class="text_details_R" style="width: 220;">${po.dbtrBrnchId }</td> 
									<td class="text_details_L">付款行行名      </td><td class="text_details_R" style="width: 220;">${po.dbtrBrnchNm }</td></tr>  
									<tr><td colspan='4'>收款人信息模块</td></tr>
									<tr><td class="text_details_L">收款人账号      </td><td class="text_details_R" style="width: 220;">${po.cdtrAcct    }</td> 
									<td class="text_details_L">收款人名称      </td><td class="text_details_R" style="width: 220;">${po.cdtrNm      }</td></tr> 
									<tr><td class="text_details_L">收款人地址      </td><td class="text_details_R" style="width: 220;">${po.cdtrAddr    }</td> 
									<td class="text_details_L">收款人开户行行号</td><td class="text_details_R" style="width: 220;">${po.cdtrIssuer  }</td></tr> 
									<tr><td class="text_details_L">收款人开户行行名</td><td class="text_details_R" style="width: 220;">${po.cdtrIssuerNm}</td> 
									<td class="text_details_L">收款清算行行号  </td><td class="text_details_R" style="width: 220;">${po.cdtrMmbId   }</td></tr> 
									<tr><td class="text_details_L">收款行行号      </td><td class="text_details_R" style="width: 220;">${po.cdtrBrnchId }</td>
									<td class="text_details_L">收款行行名      </td><td class="text_details_R" style="width: 220;">${po.cdtrBrnchNm }</td></tr> 
									<tr><td colspan='4'>其他信息</td></tr>
									<tr><td class="text_details_L">特许参与者</td><td class="text_details_R" style="width: 220;">${po.spclPrmssnMmbId}</td> 
									<td class="text_details_L">打印次数  </td><td class="text_details_R" style="width: 220;">${po.printTimes     }</td></tr> 
									<tr><td class="text_details_L">序号        </td><td class="text_details_R" style="width: 220;">${po.id      }</td>
									<td class="text_details_L">报文标识号  </td><td class="text_details_R" style="width: 220;">${po.msgId   }</td>
									</tr><tr><td class="text_details_L">交易批次号  </td><td class="text_details_R" style="width: 220;">${po.batchId }</td>
									<td class="text_details_L">业务种类编码</td><td class="text_details_R" style="width: 220;">${po.pmtKd   }</td>
									</tr><tr><td class="text_details_L">借贷标识    </td><td class="text_details_R" style="width: 220;">${po.dbtCdtId}</td>
									<td class="text_details_L">备注        </td><td class="text_details_R" style="width: 220;">${po.ustrd   }</td></tr>
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
	    	<td></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
