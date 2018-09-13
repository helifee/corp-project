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
<title> ��ʱת��ҵ����ϸ </title>
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
                					<td colspan="6"><div  class="text_title"><span class="text_blue2">��ϸ��Ϣ</span></div></td>
                				</tr>
                				</table>
            				</div>
            				
            				<br/>
		            		<div align="center">
		              			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr><td colspan='4'>������Ϣģ��</td></tr>
									<tr><td class="text_details_L">���            </td><td class="text_details_R" style="width: 220;">${po.id          }</td>
									<td class="text_details_L">���ı�ʶ��      </td><td class="text_details_R" style="width: 220;">${po.msgId       }</td></tr> 
									<tr><td class="text_details_L">��ִ���ı�ʶ��  </td><td class="text_details_R" style="width: 220;">${po.recptMsgId  }</td> 
									<td class="text_details_L">֧��ҵ�����    </td><td class="text_details_R" style="width: 220;">${po.txId        }</td></tr> 
									<tr><td class="text_details_L">�˵��˱�ʶ��    </td><td class="text_details_R" style="width: 220;">${po.endToEndId  }</td> 
									<td class="text_details_L">ҵ�����ͱ���    </td><td class="text_details_R" style="width: 220;">${po.pmtTp       }</td></tr> 
									<tr><td class="text_details_L">���ִ���        </td><td class="text_details_R" style="width: 220;">${po.currencyCd  }</td> 
									<td class="text_details_L">�����        </td><td class="text_details_R" style="width: 220;">${po.amount      }</td></tr> 
									<tr><td class="text_details_L">ҵ�����ȼ�      </td><td class="text_details_R" style="width: 220;">${po.sttlmPrty   }</td> 
									<td class="text_details_L">ϵͳ������      </td><td class="text_details_R" style="width: 220;">${po.workDt      }</td></tr> 
									<tr><td class="text_details_L">ҵ�����ͱ��뼯  </td><td class="text_details_R" style="width: 220;">${po.pmtTpClctn  }</td> 
									<td class="text_details_L">ҵ��������뼯  </td><td class="text_details_R" style="width: 220;">${po.pmtKdClctn  }</td></tr> 
									<tr><td class="text_details_L">����������    </td><td class="text_details_R" style="width: 220;">${po.instgPty    }</td> 
									<td class="text_details_L">����ֱ�Ӳ������</td><td class="text_details_R" style="width: 220;">${po.instgDrctPty}</td></tr> 
									<tr><td colspan='4'>��������Ϣģ��</td></tr>
									<tr><td class="text_details_L">�������˺�      </td><td class="text_details_R" style="width: 220;">${po.dbtrAcct    }</td> 
									<td class="text_details_L">����������      </td><td class="text_details_R" style="width: 220;">${po.dbtrNm      }</td></tr> 
									<tr><td class="text_details_L">�����˵�ַ      </td><td class="text_details_R" style="width: 220;">${po.dbtrAddr    }</td>
									<td class="text_details_L">�����˿������к�</td><td class="text_details_R" style="width: 220;">${po.dbtrIssuer  }</td></tr> 
									<tr><td class="text_details_L">�����˿���������</td><td class="text_details_R" style="width: 220;">${po.dbtrIssuerNm}</td> 
									<td class="text_details_L">�����������к�  </td><td class="text_details_R" style="width: 220;">${po.dbtrMmbId   }</td></tr> 
									<tr><td class="text_details_L">�������к�      </td><td class="text_details_R" style="width: 220;">${po.dbtrBrnchId }</td> 
									<td class="text_details_L">����������      </td><td class="text_details_R" style="width: 220;">${po.dbtrBrnchNm }</td></tr>  
									<tr><td colspan='4'>�տ�����Ϣģ��</td></tr>
									<tr><td class="text_details_L">�տ����˺�      </td><td class="text_details_R" style="width: 220;">${po.cdtrAcct    }</td> 
									<td class="text_details_L">�տ�������      </td><td class="text_details_R" style="width: 220;">${po.cdtrNm      }</td></tr> 
									<tr><td class="text_details_L">�տ��˵�ַ      </td><td class="text_details_R" style="width: 220;">${po.cdtrAddr    }</td> 
									<td class="text_details_L">�տ��˿������к�</td><td class="text_details_R" style="width: 220;">${po.cdtrIssuer  }</td></tr> 
									<tr><td class="text_details_L">�տ��˿���������</td><td class="text_details_R" style="width: 220;">${po.cdtrIssuerNm}</td> 
									<td class="text_details_L">�տ��������к�  </td><td class="text_details_R" style="width: 220;">${po.cdtrMmbId   }</td></tr> 
									<tr><td class="text_details_L">�տ����к�      </td><td class="text_details_R" style="width: 220;">${po.cdtrBrnchId }</td>
									<td class="text_details_L">�տ�������      </td><td class="text_details_R" style="width: 220;">${po.cdtrBrnchNm }</td></tr> 
									<tr><td colspan='4'>������Ϣ</td></tr>
									<tr><td class="text_details_L">���������</td><td class="text_details_R" style="width: 220;">${po.spclPrmssnMmbId}</td> 
									<td class="text_details_L">��ӡ����  </td><td class="text_details_R" style="width: 220;">${po.printTimes     }</td></tr> 
									<tr><td class="text_details_L">���        </td><td class="text_details_R" style="width: 220;">${po.id      }</td>
									<td class="text_details_L">���ı�ʶ��  </td><td class="text_details_R" style="width: 220;">${po.msgId   }</td>
									</tr><tr><td class="text_details_L">�������κ�  </td><td class="text_details_R" style="width: 220;">${po.batchId }</td>
									<td class="text_details_L">ҵ���������</td><td class="text_details_R" style="width: 220;">${po.pmtKd   }</td>
									</tr><tr><td class="text_details_L">�����ʶ    </td><td class="text_details_R" style="width: 220;">${po.dbtCdtId}</td>
									<td class="text_details_L">��ע        </td><td class="text_details_R" style="width: 220;">${po.ustrd   }</td></tr>
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
