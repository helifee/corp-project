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
<title> ��������ѯ </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />	
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
			type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewdetails(id,msgtpid,instddrctpty){
		var newurl = "<%=path %>/TransProcessAction.do?method=queryPKGInfoDetail&pmtgrpid="+id+"&msgtpid="+msgtpid+"&instddrctpty="+instddrctpty;
		var oldurl = "<%=path %>/TransProcessAction.do?method=queryPKGInfo";
		viewDetails(newurl);
		//viewcheck(newurl,oldurl,"���˽���",document);
		
	}
</script>
</head>
<body>
<html:form  method="post"  action="/TransProcessAction.do?method=queryPKGInfo">
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
	      		<table width="100%" border="0" cellspacing="0" cellpadding="O">
	      			<tr>
                		<td colspan="6">&nbsp;</td>
                	</tr>
	        		<tr>
	          			<td >&nbsp;</td>
	          			<td>
	          			<div  align="center">
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">֧��ҵ��������ѯ--������</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">���ı�ʶ��</td>
				                  	<td  colspan="3">
				                   		<input type="text" name="po.msgid"  value="${condition.msgid }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">ǩ������</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>
				                  	</td>
                					<td>
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
                				<tr>
				                	<td class="text_tablehead_b">���ı��</td>
				                  	<td  colspan="3">
				                   		<select name="po.msgtpid">
				                  			<option value="">��ѡ��</option>
											<option value="hvps.111.001.01" ${condition.msgtpid eq  'hvps.111.001.01' ? 'selected' : ''}>	�ͻ�������ҵ����                             </option>
											<option value="hvps.112.001.01" ${condition.msgtpid eq  'hvps.112.001.01' ? 'selected' : ''}>	���ڻ���������ҵ����                           </option>
											<option value="hvps.141.001.01" ${condition.msgtpid eq  'hvps.141.001.01' ? 'selected' : ''}>	��ʱת�˱���                                 </option>
											<option value="hvps.143.001.01" ${condition.msgtpid eq  'hvps.143.001.01' ? 'selected' : ''}>	PVP����������Ϣ����                            </option>
											<option value="hvps.144.001.01" ${condition.msgtpid eq  'hvps.144.001.01' ? 'selected' : ''}>	PVP����Ӧ����Ϣ����                            </option>
											<option value="hvps.151.001.01" ${condition.msgtpid eq  'hvps.151.001.01' ? 'selected' : ''}>	�����������л�Ʊ�ʽ���                           </option>
											<option value="hvps.152.001.01" ${condition.msgtpid eq  'hvps.152.001.01' ? 'selected' : ''}>	���л�Ʊȫ��Ҹ�֪ͨ����                           </option>
											<option value="hvps.153.001.01" ${condition.msgtpid eq  'hvps.153.001.01' ? 'selected' : ''}>	���л�Ʊ�����˻�ҵ����                           </option>
											<option value="hvps.154.001.01" ${condition.msgtpid eq  'hvps.154.001.01' ? 'selected' : ''}>	ȡ�ֻ�ִ����                                 </option>
											<option value="hvps.631.001.01" ${condition.msgtpid eq  'hvps.631.001.01' ? 'selected' : ''}>	����������㱨��                             </option>
											<option value="hvps.634.001.01" ${condition.msgtpid eq  'hvps.634.001.01' ? 'selected' : ''}>	��߾���ҵ�������뱨��                           </option>
											<option value="hvps.710.001.01" ${condition.msgtpid eq  'hvps.710.001.01' ? 'selected' : ''}>	���ҵ��������뱨��                             </option>
											<option value="hvps.712.001.01" ${condition.msgtpid eq  'hvps.712.001.01' ? 'selected' : ''}>	���ҵ����ϸ�˶����뱨��                           </option>
											<option value="hvps.714.001.01" ${condition.msgtpid eq  'hvps.714.001.01' ? 'selected' : ''}>	���ҵ���������뱨��                             </option>
											<option value="beps.121.001.01" ${condition.msgtpid eq  'beps.121.001.01' ? 'selected' : ''}>	�ͻ�������ͨ����ҵ����                           </option>
											<option value="beps.122.001.01" ${condition.msgtpid eq  'beps.122.001.01' ? 'selected' : ''}>	���ڻ���������ͨ����ҵ����                         </option>
											<option value="beps.123.001.01" ${condition.msgtpid eq  'beps.123.001.01' ? 'selected' : ''}>	ʵʱ����ҵ����                               </option>
											<option value="beps.124.001.01" ${condition.msgtpid eq  'beps.124.001.01' ? 'selected' : ''}>	ʵʱ���ǻ�ִҵ����                             </option>
											<option value="beps.125.001.01" ${condition.msgtpid eq  'beps.125.001.01' ? 'selected' : ''}>	���ڴ���ҵ����                               </option>
											<option value="beps.127.001.01" ${condition.msgtpid eq  'beps.127.001.01' ? 'selected' : ''}>	��ͨ���ҵ����                               </option>
											<option value="beps.128.001.01" ${condition.msgtpid eq  'beps.128.001.01' ? 'selected' : ''}>	��ͨ���ҵ���ִ����                             </option>
											<option value="beps.130.001.01" ${condition.msgtpid eq  'beps.130.001.01' ? 'selected' : ''}>	CISͨ�û�ִҵ����                            </option>
											<option value="beps.131.001.01" ${condition.msgtpid eq  'beps.131.001.01' ? 'selected' : ''}>	ʵʱ���ҵ����                               </option>
											<option value="beps.132.001.01" ${condition.msgtpid eq  'beps.132.001.01' ? 'selected' : ''}>	ʵʱ���ҵ���ִ����                             </option>
											<option value="beps.133.001.01" ${condition.msgtpid eq  'beps.133.001.01' ? 'selected' : ''}>	���ڽ��ҵ����                               </option>
											<option value="beps.134.001.01" ${condition.msgtpid eq  'beps.134.001.01' ? 'selected' : ''}>	���ڽ��ҵ���ִ����                             </option>
											<option value="beps.380.001.01" ${condition.msgtpid eq  'beps.380.001.01' ? 'selected' : ''}>	��������ҵ����                               </option>
											<option value="beps.381.001.01" ${condition.msgtpid eq  'beps.381.001.01' ? 'selected' : ''}>	��������ҵ���ִ����                             </option>
											<option value="beps.382.001.01" ${condition.msgtpid eq  'beps.382.001.01' ? 'selected' : ''}>	��������ҵ����                               </option>
											<option value="beps.383.001.01" ${condition.msgtpid eq  'beps.383.001.01' ? 'selected' : ''}>	��������ҵ���ִ����                             </option>
											<option value="beps.384.001.01" ${condition.msgtpid eq  'beps.384.001.01' ? 'selected' : ''}>	ʵʱ����ҵ����                               </option>
											<option value="beps.385.001.01" ${condition.msgtpid eq  'beps.385.001.01' ? 'selected' : ''}>	ʵʱ����ҵ���ִ����                             </option>
											<option value="beps.386.001.01" ${condition.msgtpid eq  'beps.386.001.01' ? 'selected' : ''}>	ʵʱ����ҵ����                               </option>
											<option value="beps.387.001.01" ${condition.msgtpid eq  'beps.387.001.01' ? 'selected' : ''}>	ʵʱ����ҵ���ִ����                             </option>
											<option value="beps.388.001.01" ${condition.msgtpid eq  'beps.388.001.01' ? 'selected' : ''}>	���ո�ҵ��ܾ�֪ͨ����                            </option>
											<option value="beps.389.001.01" ${condition.msgtpid eq  'beps.389.001.01' ? 'selected' : ''}>	���ո�ҵ���ո���ȷ�ϱ���                           </option>
											<option value="beps.390.001.01" ${condition.msgtpid eq  'beps.390.001.01' ? 'selected' : ''}>	�������մ����������뱨��                           </option>
											<option value="beps.391.001.01" ${condition.msgtpid eq  'beps.391.001.01' ? 'selected' : ''}>	�������մ�������Ӧ����                           </option>
											<option value="beps.392.001.01" ${condition.msgtpid eq  'beps.392.001.01' ? 'selected' : ''}>	�����ͻ�ǩԼЭ�������                           </option>
											<option value="beps.393.001.01" ${condition.msgtpid eq  'beps.393.001.01' ? 'selected' : ''}>	�����ͻ�ǩԼЭ�����Ӧ����                         </option>
											<option value="beps.394.001.01" ${condition.msgtpid eq  'beps.394.001.01' ? 'selected' : ''}>	�����ͻ��˻���Ϣ��ѯ����                           </option>
											<option value="beps.395.001.01" ${condition.msgtpid eq  'beps.395.001.01' ? 'selected' : ''}>	�����ͻ��˻���ѯӦ����                           </option>
											<option value="beps.396.001.01" ${condition.msgtpid eq  'beps.396.001.01' ? 'selected' : ''}>	�����ɿ��ѯ����                               </option>
											<option value="beps.397.001.01" ${condition.msgtpid eq  'beps.397.001.01' ? 'selected' : ''}>	�����ɿ��ѯӦ����                             </option>
											<option value="beps.398.001.01" ${condition.msgtpid eq  'beps.398.001.01' ? 'selected' : ''}>	�����ɿ�֪ͨ����                               </option>
											<option value="beps.399.001.01" ${condition.msgtpid eq  'beps.399.001.01' ? 'selected' : ''}>	�����ɿ�֪ͨӦ����                             </option>
											<option value="beps.401.001.01" ${condition.msgtpid eq  'beps.401.001.01' ? 'selected' : ''}>	�ͻ��˻�ʵʱ��ѯ����                             </option>
											<option value="beps.402.001.01" ${condition.msgtpid eq  'beps.402.001.01' ? 'selected' : ''}>	�ͻ��˻�ʵʱ��ѯӦ����                           </option>
											<option value="beps.403.001.01" ${condition.msgtpid eq  'beps.403.001.01' ? 'selected' : ''}>	��Ʊ��ӡ���뱨��                               </option>
											<option value="beps.404.001.01" ${condition.msgtpid eq  'beps.404.001.01' ? 'selected' : ''}>	��Ʊ��ӡ��Ӧ����                               </option>
											<option value="beps.411.001.01" ${condition.msgtpid eq  'beps.411.001.01' ? 'selected' : ''}>	���ҵ��ֹ�����뱨��                             </option>
											<option value="beps.412.001.01" ${condition.msgtpid eq  'beps.412.001.01' ? 'selected' : ''}>	���ҵ��ֹ��Ӧ����                             </option>
											<option value="beps.413.001.01" ${condition.msgtpid eq  'beps.413.001.01' ? 'selected' : ''}>	ʵʱҵ��������뱨��                             </option>
											<option value="beps.418.001.01" ${condition.msgtpid eq  'beps.418.001.01' ? 'selected' : ''}>	֧ƱȦ�������                               </option>
											<option value="beps.419.001.01" ${condition.msgtpid eq  'beps.419.001.01' ? 'selected' : ''}>	֧ƱȦ�����Ӧ����                             </option>
											<option value="beps.720.001.01" ${condition.msgtpid eq  'beps.720.001.01' ? 'selected' : ''}>	С��ҵ��������뱨��                             </option>
											<option value="beps.722.001.01" ${condition.msgtpid eq  'beps.722.001.01' ? 'selected' : ''}>	С��ҵ�����ϸ�˶����뱨��                          </option>
											<option value="beps.724.001.01" ${condition.msgtpid eq  'beps.724.001.01' ? 'selected' : ''}>	С��ҵ����������뱨��                            </option>
											<option value="nets.350.001.01" ${condition.msgtpid eq  'nets.350.001.01' ? 'selected' : ''}>	������޶��ѯ���뱨��                            </option>
											<option value="nets.353.001.01" ${condition.msgtpid eq  'nets.353.001.01' ? 'selected' : ''}>	������޶���Ѻ/���Ŷ�ȷ��������                     </option>
											<option value="nets.354.001.01" ${condition.msgtpid eq  'nets.354.001.01' ? 'selected' : ''}>	������޶���ö��Ԥ��ֵ���ñ���                       </option>
											<option value="saps.357.001.01" ${condition.msgtpid eq  'saps.357.001.01' ? 'selected' : ''}>	��Ѻ���ʹ�����                               </option>
											<option value="saps.358.001.01" ${condition.msgtpid eq  'saps.358.001.01' ? 'selected' : ''}>	�˹���Ѻ�������뱨��                             </option>
											<option value="saps.361.001.01" ${condition.msgtpid eq  'saps.361.001.01' ? 'selected' : ''}>	�����˻�����ֵ�������뱨��                        </option>
											<option value="saps.363.001.01" ${condition.msgtpid eq  'saps.363.001.01' ? 'selected' : ''}>	�����ŶӲ�ѯ���뱨��                             </option>
											<option value="saps.365.001.01" ${condition.msgtpid eq  'saps.365.001.01' ? 'selected' : ''}>	�����Ŷӹ������뱨��                             </option>
											<option value="saps.366.001.01" ${condition.msgtpid eq  'saps.366.001.01' ? 'selected' : ''}>	�����˻���Ϣ��ѯ���뱨��                           </option>
											<option value="saps.368.001.01" ${condition.msgtpid eq  'saps.368.001.01' ? 'selected' : ''}>	������λȫ�������Բ�ѯ����                          </option>
											<option value="saps.369.001.01" ${condition.msgtpid eq  'saps.369.001.01' ? 'selected' : ''}>	������λȫ��������Ӧ����                          </option>
											<option value="saps.370.001.01" ${condition.msgtpid eq  'saps.370.001.01' ? 'selected' : ''}>	�����˻��������뱨��                             </option>
											<option value="saps.371.001.01" ${condition.msgtpid eq  'saps.371.001.01' ? 'selected' : ''}>	�����˻�ά�����뱨��                             </option>
											<option value="saps.373.001.01" ${condition.msgtpid eq  'saps.373.001.01' ? 'selected' : ''}>	�����˻��ʽ�ع�����                            </option>
											<option value="saps.374.001.01" ${condition.msgtpid eq  'saps.374.001.01' ? 'selected' : ''}>	�����˻��Զ����������뱨��                         </option>
											<option value="saps.375.001.01" ${condition.msgtpid eq  'saps.375.001.01' ? 'selected' : ''}>	�����˻��Զ�������Ӧ����                         </option>
											<option value="nets.376.001.01" ${condition.msgtpid eq  'nets.376.001.01' ? 'selected' : ''}>	������޶�Ȧ���ʽ��������                          </option>
											<option value="nets.377.001.01" ${condition.msgtpid eq  'nets.377.001.01' ? 'selected' : ''}>	������޶�Ȧ���ʽ��������                          </option>
											<option value="nets.405.001.01" ${condition.msgtpid eq  'nets.405.001.01' ? 'selected' : ''}>	�����ŶӲ�ѯ���뱨��                             </option>
											<option value="nets.407.001.01" ${condition.msgtpid eq  'nets.407.001.01' ? 'selected' : ''}>	�����Ŷӹ������뱨��                             </option>
											<option value="saps.609.001.01" ${condition.msgtpid eq  'saps.609.001.01' ? 'selected' : ''}>	ͬ�Ǿ��������ѯ���뱨��                           </option>
											<option value="saps.611.001.01" ${condition.msgtpid eq  'saps.611.001.01' ? 'selected' : ''}>	ͬ�����������ҵ����                           </option>
											<option value="saps.612.001.01" ${condition.msgtpid eq  'saps.612.001.01' ? 'selected' : ''}>	����ҵ����                                 </option>
											<option value="saps.613.001.01" ${condition.msgtpid eq  'saps.613.001.01' ? 'selected' : ''}>	���˳���ҵ����                               </option>
											<option value="saps.614.001.01" ${condition.msgtpid eq  'saps.614.001.01' ? 'selected' : ''}>	�ʽ��/�Զ��������ѯ���뱨��                       </option>
											<option value="saps.615.001.01" ${condition.msgtpid eq  'saps.615.001.01' ? 'selected' : ''}>	�ʽ��/�Զ��������ѯӦ����                       </option>
											<option value="nets.617.001.01" ${condition.msgtpid eq  'nets.617.001.01' ? 'selected' : ''}>	������ѯ������                             </option>
											<option value="saps.731.001.01" ${condition.msgtpid eq  'saps.731.001.01' ? 'selected' : ''}>	������������ҵ����ϸ�˶����뱨��                       </option>
											<option value="saps.737.001.01" ${condition.msgtpid eq  'saps.737.001.01' ? 'selected' : ''}>	�˶������������뱨��                           </option>
											<option value="ccms.303.001.02" ${condition.msgtpid eq  'ccms.303.001.02' ? 'selected' : ''}>	���ɸ�ʽ����                                 </option>
											<option value="ccms.307.001.02" ${condition.msgtpid eq  'ccms.307.001.02' ? 'selected' : ''}>	ҵ�������뱨��                               </option>
											<option value="ccms.308.001.02" ${condition.msgtpid eq  'ccms.308.001.02' ? 'selected' : ''}>	ҵ����Ӧ����                               </option>
											<option value="ccms.310.001.01" ${condition.msgtpid eq  'ccms.310.001.01' ? 'selected' : ''}>	ͨ�÷�ǩ����Ϣҵ����                            </option>
											<option value="ccms.311.001.01" ${condition.msgtpid eq  'ccms.311.001.01' ? 'selected' : ''}>	ͨ�÷�ǩ����Ϣҵ��Ӧ����                          </option>
											<option value="ccms.312.001.01" ${condition.msgtpid eq  'ccms.312.001.01' ? 'selected' : ''}>	ͨ��ǩ����Ϣҵ����                             </option>
											<option value="ccms.313.001.01" ${condition.msgtpid eq  'ccms.313.001.01' ? 'selected' : ''}>	ͨ��ǩ����Ϣҵ��Ӧ����                           </option>
											<option value="ccms.314.001.01" ${condition.msgtpid eq  'ccms.314.001.01' ? 'selected' : ''}>	ҵ���ѯ����                                 </option>
											<option value="ccms.315.001.01" ${condition.msgtpid eq  'ccms.315.001.01' ? 'selected' : ''}>	ҵ��鸴����                                 </option>
											<option value="ccms.316.001.01" ${condition.msgtpid eq  'ccms.316.001.01' ? 'selected' : ''}>	ҵ��״̬��ѯ���뱨��                             </option>
											<option value="ccms.318.001.01" ${condition.msgtpid eq  'ccms.318.001.01' ? 'selected' : ''}>	ҵ���˻����뱨��                               </option>
											<option value="ccms.319.001.01" ${condition.msgtpid eq  'ccms.319.001.01' ? 'selected' : ''}>	ҵ���˻�Ӧ����                               </option>
											<option value="ccms.805.001.02" ${condition.msgtpid eq  'ccms.805.001.02' ? 'selected' : ''}>	��¼/�˳����뱨��                              </option>
											<option value="ccms.807.001.02" ${condition.msgtpid eq  'ccms.807.001.02' ? 'selected' : ''}>	ǿ������֪ͨ����                               </option>
											<option value="ccms.903.001.02" ${condition.msgtpid eq  'ccms.903.001.02' ? 'selected' : ''}>	����֤��󶨹���֪ͨ����                           </option>
											<option value="ccms.919.001.01" ${condition.msgtpid eq  'ccms.919.001.01' ? 'selected' : ''}>	����֤���������뱨��                             </option>
											<option value="ccms.990.001.02" ${condition.msgtpid eq  'ccms.990.001.02' ? 'selected' : ''}>	ͨ�ż�ȷ�ϱ���                                </option>
											<option value="ccms.991.001.01" ${condition.msgtpid eq  'ccms.991.001.01' ? 'selected' : ''}>	̽��������                                 </option>

				                  	</td>
				                  	<td  class="text_tablehead_b">ҵ������</td>
				                  	<td colspan="3">
				                   		<select name="po.pmttp">
				                  			<option value="">��ѡ��</option>
				                  			<option value="A100" ${condition.pmttp eq 'A100' ? 'selected' : '' }>��ͨ���</option>
				                  			<option value="A108" ${condition.pmttp eq 'A108' ? 'selected' : '' }>�ֽ���</option>
				                  			<option value="A109" ${condition.pmttp eq 'A109' ? 'selected' : '' }>ί���տ�(����)</option>
				                  			<option value="A110" ${condition.pmttp eq 'A110' ? 'selected' : '' }>���ճи�(����)</option>
				                  			<option value="A200" ${condition.pmttp eq 'A200' ? 'selected' : '' }>�м��ʽ�㻮</option>
				                  			<option value="A202" ${condition.pmttp eq 'A202' ? 'selected' : '' }>���л�Ʊ</option>
				                  			<option value="A113" ${condition.pmttp eq 'A113' ? 'selected' : '' }>�羳֧��</option>
				                  			<option value="A101" ${condition.pmttp eq 'A101' ? 'selected' : '' }>�������ʽ�㻮</option>
				                  			<option value="A102" ${condition.pmttp eq 'A102' ? 'selected' : '' }>������</option>
				                  			<option value="A104" ${condition.pmttp eq 'A104' ? 'selected' : '' }>�����ʽ���ǻ���</option>
				                  			<option value="B104" ${condition.pmttp eq 'B104' ? 'selected' : '' }>�����ʽ��ǻ���</option>
				                  			<option value="A106" ${condition.pmttp eq 'A106' ? 'selected' : '' }>֧ȡ�����ʽ�</option>
				                  			<option value="A307" ${condition.pmttp eq 'A307' ? 'selected' : '' }>�����ʽ��ծ�Ҹ����ǻ���</option>
				                  			<option value="B307" ${condition.pmttp eq 'B307' ? 'selected' : '' }>�����ʽ��ծ�Ҹ���ǻ���</option>
				                  			<option value="A301" ${condition.pmttp eq 'A301' ? 'selected' : '' }>�ɷ�ҵ��</option>
				                  			<option value="A201" ${condition.pmttp eq 'A201' ? 'selected' : '' }>֧Ʊ</option>
				                  			<option value="B100" ${condition.pmttp eq 'B100' ? 'selected' : '' }>��ͨ���</option>
				                  			<option value="B308" ${condition.pmttp eq 'B308' ? 'selected' : '' }>֧Ʊ����</option>
				                  			<option value="B309" ${condition.pmttp eq 'B309' ? 'selected' : '' }>ͨ��Ʊ�ݽ���</option>
				                  			<option value="C102" ${condition.pmttp eq 'C102' ? 'selected' : '' }>���˴���ͨ��</option>
				                  			<option value="D102" ${condition.pmttp eq 'D102' ? 'selected' : '' }>���˴���ͨ��</option>
				                  			<option value="E100" ${condition.pmttp eq 'E100' ? 'selected' : '' }>���ڴ���</option>
				                  			<option value="F100" ${condition.pmttp eq 'F100' ? 'selected' : '' }>���ڽ��</option>
				                  			<option value="A309" ${condition.pmttp eq 'A309' ? 'selected' : '' }>CISͨ��Ʊ��ҵ���ִ</option>
				                  			<option value="A308" ${condition.pmttp eq 'A308' ? 'selected' : '' }>CIS֧Ʊҵ���ִ</option>
				                  	</td>
                					<td>
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					               <tr>
					                   <td  align="center" class="text_listhead">���ı�ʶ��</td>
					                   <td  align="center" class="text_listhead">����������</td>
					                  <td  align="center" class="text_listhead">���ı��</td>					                  
					                   <td  align="center" class="text_listhead">ҵ������</td>
					                   <td  align="center" class="text_listhead">�ܽ��</td>	
					                   <td  align="center" class="text_listhead">�ܱ���</td>
					                   <td  align="center" class="text_listhead">�ɹ��ܽ��</td>					                   
					                   
					                   <td  align="center" class="text_listhead">�ɹ��ܱ���</td>						                   
					                   <td  align="center" class="text_listhead">״̬</td>
					                   <td  align="center" class="text_listhead">��ϸ</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										 <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard"> ${po.instddrctpty } </div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${po.msgtpid}-
								                  <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">���ͻ���ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'hvps.112.001.01'}">��������ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">С��ͻ���ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.122.001.01'}">С�������ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">��ͨ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">ʵʱ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">ʵʱ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.125.001.01'}">���ڴ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.133.001.01'}">���ڽ��</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.124.001.01'}">	ʵʱ���ǻ�ִҵ��</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.128.001.01'}">	��ͨ���ҵ���ִ</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.132.001.01'}">	ʵʱ���ҵ���ִ</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.134.001.01'}">	���ڽ��ҵ���ִ</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.130.001.01'}">	CISͨ�û�ִҵ����</c:if>
								                  </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.pmttp }-
								                  <c:if test="${po.pmttp eq 'A100'}">��ͨ���</c:if>
							                  	 <c:if test="${po.pmttp eq 'A108'}">�ֽ���</c:if>
								                  <c:if test="${po.pmttp eq 'A109'}">ί���տ�(����)</c:if>
								                  <c:if test="${po.pmttp eq 'A110'}">���ճи�(����)</c:if>
								                   <c:if test="${po.pmttp eq 'A200'}">�м��ʽ�㻮</c:if>
								                   <c:if test="${po.pmttp eq 'A202'}">���л�Ʊ</c:if>
								                  <c:if test="${po.pmttp eq 'A112'}">�������</c:if>
								                  <c:if test="${po.pmttp eq 'A101'}">�������ʽ�㻮)</c:if>
								                  <c:if test="${po.pmttp eq 'A102'}">������</c:if>
								                  <c:if test="${po.pmttp eq 'A104'}">�����ʽ���ǻ���</c:if>
								                   <c:if test="${po.pmttp eq 'A106'}">֧ȡ�����ʽ�</c:if>
								                  <c:if test="${po.pmttp eq 'A301'}">�ɷ�ҵ��</c:if>
								                  <c:if test="${po.pmttp eq 'A201'}">֧Ʊ</c:if>
								                   <c:if test="${po.pmttp eq 'B100'}">��ͨ���</c:if>
								                   <c:if test="${po.pmttp eq 'B104'}">�����ʽ��ǻ���</c:if>
								                   <c:if test="${po.pmttp eq 'B307'}">�����ʽ��ծ�Ҹ���ǻ���</c:if>
								                    <c:if test="${po.pmttp eq 'A307'}">�����ʽ��ծ�Ҹ����ǻ���</c:if>
								                   
								                     <c:if test="${po.pmttp eq 'C102'}">���˴���ͨ��</c:if>
								                      <c:if test="${po.pmttp eq 'D102'}">���˴���ͨ��</c:if>
								                      <c:if test="${po.pmttp eq 'D200'}">ʵʱ����</c:if>
								                     <c:if test="${po.pmttp eq 'C101'}">ʵʱ����</c:if>
								                     <c:if test="${po.pmttp eq 'C210'}">н�𱨳�</c:if>
								                    <c:if test="${po.pmttp eq 'C100'}">ʵʱ����</c:if>
								                    <c:if test="${po.pmttp eq 'D100'}">ʵʱ���</c:if>
								                    <c:if test="${po.pmttp eq 'D203'}">ʵʱͨ��Ʊ�ݽ���</c:if>
								                     <c:if test="${po.pmttp eq 'E100'}">���ڴ���</c:if>
								                   <c:if test="${po.pmttp eq 'F100'}">���ڽ��</c:if>
								                   <c:if test="${po.pmttp eq 'B308'}">֧Ʊ����</c:if>
								                    <c:if test="${po.pmttp eq 'B309'}">ͨ��Ʊ�ݽ���</c:if>
								                    <c:if test="${po.pmttp eq 'A308'}">CIS֧Ʊҵ���ִ</c:if>
								                    <c:if test="${po.pmttp eq 'A309'}">CISͨ��Ʊ��ҵ���ִ</c:if>
								                  </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  <c:choose>
							                  		<c:when test="${po.ctrlsum eq '0.00' }">&nbsp;0.00</c:when>
							                  		<c:otherwise>
							                  		<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.ctrlsum }"/>
							                  		</c:otherwise>
							                  		</c:choose>
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.nboftxs }
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  		<c:choose>
							                  		<c:when test="${po.ornglctrlsum eq '0.00' }">&nbsp;0.00</c:when>
							                  		<c:otherwise>
							                  		<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.ornglctrlsum}"/>
							                  		</c:otherwise>
							                  		</c:choose>
							                  </div></td>
							                  
							                  <td  class="text_list"><div class="gridCell_standard">${po.ornglnboftxs }
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.prcsts}-
							                	<c:if test="${po.prcsts eq 'PR91'}">������</c:if>
							                	
							                             <c:if test="${po.prcsts eq 'PR04' }">������</c:if>
																	<c:if test="${po.prcsts eq 'PR09' }">�Ѿܾ�</c:if>
																	<c:if test="${entity.status eq 'PR08' }">�ѳ���</c:if>
																	<c:if test="${po.prcsts eq 'PR09' }">�Ѿܾ�</c:if>
																	<c:if test="${po.prcsts eq 'PR21' }">��ֹ��</c:if>
																	<c:if test="${po.prcsts eq 'PR22' }">�ѳ���</c:if>
																	<c:if test="${po.prcsts eq 'PR32' }">�ѳ���</c:if>
																	<c:if test="${po.prcsts eq 'PR05' }">�ѳɹ�</c:if>
																	<c:if test="${po.prcsts eq 'PR98' }">��ȷ��    </c:if>
																	<c:if test="${po.prcsts eq 'PR90' }">�½�      </c:if>
																	<c:if test="${po.prcsts eq 'PR81' }">������    </c:if>
																	<c:if test="${po.prcsts eq 'PR82' }">�����    </c:if>
																	<c:if test="${po.prcsts eq 'PR83' }">������    </c:if>
																	<c:if test="${po.prcsts eq 'PR95' }">�����    </c:if>
																	<c:if test="${po.prcsts eq 'PR96' }">������    </c:if>
																	<c:if test="${po.prcsts eq 'PR97' }">�ѷ���    </c:if>
																	<c:if test="${po.prcsts eq 'PR11' }">�������Ŷ�</c:if>
																	<c:if test="${po.prcsts eq 'PR12' }">�������Ŷ�</c:if>
																	<c:if test="${po.prcsts eq 'PR99' }">����</c:if>
																	<c:if test="${po.prcsts eq 'PR03' }">������</c:if>
																	<c:if test="${po.prcsts eq 'PR89' }">����ִ </c:if>
																	<c:if test="${po.prcsts eq 'PR88' }">�ѻ�ִ</c:if>
							                  </div></td> 
							                  <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#" onClick="viewdetails('${po.msgid}','${po.msgtpid}',${po.instddrctpty })"><u>��ϸ</u></a>
                                               </td>				                  
						                  </tr>  
					                  </logic:iterate> 
					                   <logic:empty name="queryList">
					                  	<tr>
					                		<td colspan="9" align="center"><font color="red">û�з��������ļ�¼!</font></td>
					                	</tr>
					                  </logic:empty>                    
					                </logic:present>
					               
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
	    	
	  	</tr>  
	</table>
</html:form>
</body>
</html>
