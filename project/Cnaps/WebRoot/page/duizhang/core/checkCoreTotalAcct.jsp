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
<title>���Ķ��˲�ѯ�б� </title>
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

	
	function bufa(frontno){
		var newurl = "<%=path %>/DuizhangAction.do?method=sendCoreBuFaApp&frontno="+frontno;
		viewDetails(newurl);	
	}
	function chongzheng(backno){
		var newurl = "<%=path %>/DuizhangAction.do?method=sendCoreChongzhengApp&backno="+backno;
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
<html:form  method="post" action="/DuizhangAction.do?method=duizhangCoreAcct">
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
                						<div  class="text_title"><span class="text_blue2">���Ķ��˲�ѯ</span></div>
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
				                  		<input name="query" type="button" class="button" value="�� ��"  onclick="confirm()"/> 
				                  	</td>
				                </tr> 
            				</table>
            				<br>
		            		<div align="center"><br>
		              			<table width="95%" class="tbcolor">
					               <tr class="text_listhead">
					                 <td  >�����˺�</td>
					                 <td  >��������</td>
					                 <td  >ǰ����ˮ��</td>
					                 <td  >ǰ�ü�������</td>
					                 <td  >ǰ�ü�¼������ˮ��</td>
					                 <td  >���˽��</td>	
					                 <td  >������ˮ��</td>
					                 <td  >���ļ�������</td>
					                 <td  >���ļ��˽��</td>
					                 <td  >���ļ�¼ǰ����ˮ��</td>
					                 <td  >֧���������</td>
					                 <td  >֧���������</td>
					                 <td  >����</td>
					               </tr>
					             
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										   <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  ><div class="gridCell_standard">${po.chargeAcct }</div></td>
							                  <td  ><div class="gridCell_standard">
							                  	<c:if test="${po.financialPrcTp eq '01' }">����</c:if>
							                  	<c:if test="${po.financialPrcTp eq '02' }">����</c:if>
							                  	<c:if test="${po.financialPrcTp eq '03' }">�������������</c:if>
							                  	<c:if test="${po.financialPrcTp eq '04' }">����ȡ��</c:if>
							                  	<c:if test="${po.financialPrcTp eq '05' }">���ճ���</c:if>
							                  </div></td>
							                  <td  ><div class="gridCell_standard">${po.mbfeFinancialSrlNmb }</div></td>
							                  <td  ><div class="gridCell_standard">${po.hostFinancialPrcDt }</div></td>
							                  <td  ><div class="gridCell_standard">${po.hostFinancialSrlNmb }</div></td>
							                
							                  <td  ><div class="gridCell_standard">
							                  	<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.totalAmt }"/>
							                  </div></td>
							                  <td  ><div class="gridCell_standard">${po.backno }</div></td>
							                  <td  ><div class="gridCell_standard">${po.backdt }</div></td>
							                  <td  ><div class="gridCell_standard">
							                  	<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.backamt }"/>
							                  </div></td>
							                  <td  ><div class="gridCell_standard">${po.frontno }</div></td>
							                  <td  ><div class="gridCell_standard">${po.pmtGrpId }</div></td>
							                  <td  ><div class="gridCell_standard">${po.txId }</div></td>
							                   <td  ><div align="center">
							                    <span >
							                    <c:if test="${po.frontno==null|| po.frontno=='' }">
							                    	<a href="#"  onClick="bufa('${po.mbfeFinancialSrlNmb }')"><u>����</u></a>
							                    </c:if>
							                     <c:if test="${po.hostFinancialSrlNmb==null|| po.hostFinancialSrlNmb=='' }">
							                    	<a href="#" onClick="chongzheng('${po.backno }')"><u>����</u></a>
							                    </c:if>
							                    		
							                    </span>
	                                            
                                              </div>
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
	    	<td >
	    	</td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
