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
<title>����쳣��ѯ�б� </title>
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
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">����쳣��ѯ�б�</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head" >
                				<tr>
				                  	<td width="120" height="40" class="text_tablehead_b">�������ڣ�</td>
				                  	<td width="120"><div align="left">
					                  	<input  type="text" name="chckdt"  value="${chckdt }" readonly="readonly" title="��������" style="width: 180px;"
											class="Wdate" onclick="WdatePicker()" />
											<span name="validate" dataName="chckdt" dataType="Empty" msg="�������ڲ���Ϊ�գ�" class="STYLE1"></span>
									</td>								
				                   	<td  width="90" height="40" class="text_tablehead_b"></td>
				                   	<td  colspan="4" align="center">
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="confirm()"/> 
				                  	</td>
				                </tr> 
            				</table>
            				<br>
		            		<div align="center"><br>
		              			<table width="95%"  class="tbcolor">
					                <tr class="text_listhead">
					                   <td  >ҵ������</td>
					                    <td  >�����쳣�ܱ���</td>
					                   <td  >�����쳣�ܱ���</td>	
					                   <td  >��ϸ</td>
					                </tr>
					             	<c:forEach items="${entity.duizhangList}" var="po">
					             		<tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  ><div class="gridCell_standard">
							                  	<c:if test="${po.pmtTp eq 'A100'}">��ͨ���                  </c:if>
												<c:if test="${po.pmtTp eq 'A108'}">�ֽ���                  </c:if>
												<c:if test="${po.pmtTp eq 'A109'}">ί���տ���أ�          </c:if>
												<c:if test="${po.pmtTp eq 'A110'}">���ճи������أ�          </c:if>
												<c:if test="${po.pmtTp eq 'A201'}">֧Ʊ                      </c:if>
												<c:if test="${po.pmtTp eq 'A202'}">���л�Ʊ                  </c:if>
												<c:if test="${po.pmtTp eq 'A111'}">��ҵ��Ʊ                  </c:if>
												<c:if test="${po.pmtTp eq 'A112'}">�������                  </c:if>
												<c:if test="${po.pmtTp eq 'A113'}">�羳֧��                  </c:if>
												<c:if test="${po.pmtTp eq 'A101'}">�������ʽ�㻮            </c:if>
												<c:if test="${po.pmtTp eq 'A114'}">���п�����Ʊ�ݽ��������</c:if>
												<c:if test="${po.pmtTp eq 'A102'}">������                  </c:if>
												<c:if test="${po.pmtTp eq 'A307'}">�����ʽ��ծ�Ҹ����ǻ���  </c:if>
												<c:if test="${po.pmtTp eq 'A105'}">�˻�                      </c:if>
												<c:if test="${po.pmtTp eq 'A104'}">�����ʽ���ǻ���          </c:if>
												<c:if test="${po.pmtTp eq 'A103'}">����ͬ�ǽ�����������      </c:if>
												<c:if test="${po.pmtTp eq 'A106'}">֧ȡ���л���              </c:if>
												<c:if test="${po.pmtTp eq 'A113'}">�羳֧��                  </c:if>
												<c:if test="${po.pmtTp eq 'A115'}">�ٴ���                    </c:if>
												<c:if test="${po.pmtTp eq 'A114'}">���п�����Ʊ�ݽ��������</c:if>
												<c:if test="${po.pmtTp eq 'A200'}">�м��ʽ�㻮            </c:if>
												<c:if test="${po.pmtTp eq 'A307'}">�����ʽ��ծ�Ҹ����ǻ���</c:if>
												<c:if test="${po.pmtTp eq 'G101'}">�����г����׽���        </c:if>
												<c:if test="${po.pmtTp eq 'G102'}">ծȯ�г����׽���        </c:if>
												<c:if test="${po.pmtTp eq 'G103'}">ծȯ���С��Ҹ������滮��</c:if>
												<c:if test="${po.pmtTp eq 'G104'}">���п������      </c:if>
												<c:if test="${po.pmtTp eq 'G105'}">������ҵ��Ʊ�ʽ�����</c:if>
												<c:if test="${po.pmtTp eq 'G106'}">��㽻���г�����</c:if>
												<c:if test="${po.pmtTp eq 'G107'}">�ʽ�ؽ���</c:if>
												<c:if test="${po.pmtTp eq 'G108'}">�����Զ����</c:if>
												<c:if test="${po.pmtTp eq 'G109'}">��Ѻ����</c:if>
												<c:if test="${po.pmtTp eq 'H010'}">��㽻�������</c:if>
												<c:if test="${po.pmtTp eq 'H011'}">֤ȯ���������</c:if>
												<c:if test="${po.pmtTp eq 'H012'}">����ϵͳ�����</c:if>
												<c:if test="${po.pmtTp eq 'K001'}"> ��ѯ��</c:if>
												<c:if test="${po.pmtTp eq 'K002'}"> �鸴��</c:if>
							                  </div></td>
							                    <td  ><div class="gridCell_standard">${po.sendExceptionNum }</div></td>
							                 <td  ><div class="gridCell_standard">${po.recvExceptionNum }</div></td>
							                  <td  ><div align="center"><span >
                                               <a href="#"   onClick="viewdetails('${entity.chckdt }','${po.pmtTp }')"><u>��ϸ</u></a></span></div>
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
