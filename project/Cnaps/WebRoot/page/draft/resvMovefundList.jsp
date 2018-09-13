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
<title> 银行汇票来帐查询 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />	
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">


	function jiefu(){
		
	}

	function viewdetails(pmtgrpid,type,id){
		var newurl = "<%=path %>/draftManageAction.do?method=gotoTransDetails0&id="+id+"&type="+type+"&pmtgrpid="+pmtgrpid;
		viewDetails(newurl);	
	}
	
	function fmoney(s, n)//将数字转换成逗号分隔的样式,保留两位小数s:value,n:小数位数      
			{   
			    n = n > 0 && n <= 20 ? n : 2;   
			    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
			    var l = s.split(".")[0].split("").reverse(),   
			    r = s.split(".")[1];   
			    t = "";   
			    for(i = 0; i < l.length; i ++ )   
			    {   
			    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
			    }   
			    return t.split("").reverse().join("") + "." + r;   
			} 
</script>
<%
String type2=(String)request.getAttribute("type");
request.setAttribute("type",type2); 
String pmtkdAttr2=(String)request.getAttribute("pmtkdAttr");//业务种类
request.setAttribute("pmtkdAttr",pmtkdAttr2);
String status2=(String)request.getAttribute("stauts");
request.setAttribute("status",status2);
String direction2=(String)request.getAttribute("direction");
request.setAttribute("direction",direction2); 
System.out.println("type : "+type2+ "pmtkd:"+pmtkdAttr2+" status:"+status2+"  direction :"+direction2+"------------------------------------------------------------");
 %>
</head>
<body>
<html:form  method="post" action="/draftManageAction.do?method=querySendxml">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ><br></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
					<br></td>
					<td  width="194" ><br></td>
					<td  width="270"  ><br></td>				
					</tr>
				</table>
			<br></td>
			<td width="8" ><br></td>
		</tr>
	  	<tr valign="top">
	    	<td >
	    	<br><td >
	      			<input type="hidden" name="po.direction" size="32" maxlength="32" value="O"/> <!-- 往账 -->
	      			<input type="hidden" name="po.status" size="32" maxlength="32" value="PR04"/> <!-- 业务状态 已清算 -->
	      			<input type="hidden" name="po.pmttp" size="32" maxlength="32" value="A202"/> <!-- 业务类型 银行汇票 -->
	      			<input type="hidden" name="pmtkdAttr" size="32" maxlength="32" value="${pmtkdAttr}"/> <!-- 业务种类  -->
	      		<table width="100%" border="0" cellspacing="0" cellpadding="O">
	      			<tr>
                		<td colspan="6">&nbsp;<br></td>
                	</tr>
	        		<tr>
	          			<td >&nbsp;<br></td>
	          			<td>
	          			<div  align="center">
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">银行汇票来帐查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;<br></td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">支付交易序号<br></td>
				                  	<td  colspan="2">
				                   		<input type="text" name="po.startid"  value="${condition.startid }"/>-<input type="text" name="po.endid"   value="${condition.endid }"/>

				                  	<br></td>
				                  	
				                  	<td class="text_tablehead_b">
												汇票种类
											</td>
											<td>
												<select  name="po.notestp" id="po.notestp" style="width:180px;" title="汇票种类">
												<option value=""  selected="selected">请选择</option>
																<option value="CT00"  >可转让汇票</option>
																<option value="CT01"  >不可转让汇票</option>
																<option value="CT02"  >现金汇票</option>
																</select>
											</td>
				                  	
				                  	<td>&nbsp;</td>
				                 </tr>
				                 <tr>
				                  	<td  class="text_tablehead_b">出票日期<br></td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>-<input type="text" name="po.enddate" class="Wdate" onclick="WdatePicker()" value="${condition.enddate }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">票据号码<br></td>
				                  	<td >
				                   		<input type="text" name="po.endtoend" value="${condition.endtoend}"/>
				                  	</td>
				                   	
				                  	<td>&nbsp;</td>
				                </tr> 
				                <tr>
				                	<td class="text_tablehead_b">出票金额<br></td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.startamount" value="${condition.startamount }"/>-<input type="text" name="po.endamount" value="${condition.endamount }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">汇票密押<br></td>
				                  	<td >
				                   		<input type="text" name="po.billSeal" value="${condition.billSeal}"/>
				                  	</td>
				                </tr>
				                <tr><td class="text_tablehead_b"><br></td>
				                  	<td colspan="2">
				                  	</td>
				                  	<td>
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  	</td></tr>
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					             <tr  class="text_listhead">
					             
					                  <td   >支付交易序号<br></td>
					                  <td   >业务种类<br></td>
					                   <!--<td   >汇票种类<br></td>-->
					                   <td   >票据号码 <br></td>
					                  <td   >汇票密押 <br></td>
					                  <td   >结算金额 <br></td>					                  
					                  <!--<td>签发行行号<br></td> -->
					                  <td   >业务状态<br></td>
					                  <td   >汇票状态<br></td>
					                   <td   >
													<u>操&nbsp;作</u>
					                    <br></td>
					                  </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  ><div >${po.txid }</div></td>
							                  <td  ><div >
																	<c:if test="${po.pmtkd eq'02902'}">资金清算	</c:if>
																	<c:if test="${po.pmtkd eq'02903'}">资金多余划回	</c:if>
																	<c:if test="${po.pmtkd eq'02904'}">资金未用退回	</c:if>
							                  </div></td>
							                 <!--   <td  ><div >
							                  <c:if test="${po.notestp eq 'CT00'}">可转让汇票</c:if>
								                  <c:if test="${po.notestp eq 'CT01'}">不可转让汇票</c:if>
								                  <c:if test="${po.notestp eq 'CT02'}">现金汇票</c:if>
							                  </div></td>-->
							                  <td  ><div >${po.endtoendid }</div></td>
							                   <td   >${po.billSeal} <br></td>
							                   <td  ><div >
							                   <fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount}" />
							                   </div></td>
							                     <!--<td  ><div >${po.dbtrissuer}</div></td>-->
							                      <td  ><div >
													<c:if test="${po.status eq 'PR04' }">已清算</c:if>
													<c:if test="${po.status eq 'PR09' }">已拒绝</c:if>
													<c:if test="${po.status eq 'PR08' }">已撤销</c:if>
													<c:if test="${po.status eq 'PR21' }">已止付</c:if>
													<c:if test="${po.status eq 'PR22' }">已冲正</c:if>
													<c:if test="${po.status eq 'PR32' }">已超期</c:if>
													<c:if test="${po.status eq 'PR05' }">已成功</c:if>
													<c:if test="${po.status eq 'PR98' }">待确认    </c:if>
													<c:if test="${po.status eq 'PR90' }">新建      </c:if>
													<c:if test="${po.status eq 'PR81' }">待复核    </c:if>
													<c:if test="${po.status eq 'PR82' }">待审核    </c:if>
													<c:if test="${po.status eq 'PR83' }">待审批    </c:if>
													<c:if test="${po.status eq 'PR95' }">待组包    </c:if>
													<c:if test="${po.status eq 'PR96' }">待发送    </c:if>
													<c:if test="${po.status eq 'PR97' }">已发送    </c:if>
													<c:if test="${po.status eq 'PR11' }">已轧差排队</c:if> 
													<c:if test="${po.status eq 'PR12' }">已清算排队</c:if> 
													<c:if test="${po.status eq 'PR99' }">故障</c:if>
													<c:if test="${po.status eq 'PR03' }">已轧差</c:if> 
													<c:if test="${po.status eq 'PR89' }">待回执 </c:if>
													<c:if test="${po.status eq 'PR88' }">已回执</c:if>
												</div></td>
												<td><div>${po.status}</div></td>
                                               <td  ><div ><span >
                                               <c:if test="${type eq '1'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>申请清算</u></a>
							                  </c:if>
							                  <c:if test="${type eq '2'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>退&nbsp;回</u></a>
							                  </c:if>
							                  <c:if test="${type eq '3'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>挂&nbsp;失</u></a>
							                  </c:if>
							                  <c:if test="${type eq '4'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>退回解付</u></a>
							                  </c:if>
							                  <c:if test="${type eq '5'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>退回解付</u></a>
							                  </c:if>
							                  <c:if test="${type eq '6'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>解&nbsp;付</u></a>
							                  </c:if>
							                  <c:if test="${type eq '7'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>解&nbsp;付</u></a>
							                  </c:if>
							                  <c:if test="${type eq '8'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>解&nbsp;挂</u></a>
							                  </c:if>
							                  <c:if test="${type eq '9'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>挂失维护</u></a>
							                  </c:if>
							                  <c:if test="${type eq '10'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')')"><u>解&nbsp;付</u></a>
							                  </c:if>
							                  <c:if test="${type eq 'query'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>明&nbsp;细</u></a>
							                  </c:if>
							                   <c:if test="${type eq '11'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>明&nbsp;细</u></a>
							                  </c:if>
							                    <c:if test="${type eq '12'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>明&nbsp;细</u></a>
							                  </c:if>
                                                </span></div>
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
		             	</div>
		             	</td>
		             	</tr>
					<tr>  
			    		<td><br></td>      
					   	<td>
					       	<table width="100%" border="0" cellpadding="0" cellspacing="0">
					        	<tr>
					          		<td><jsp:include page="/page/common/Page.jsp"/><br></td>
					          	</tr>
				         	</table>
				        <br></td>
			     		<td><br></td>
		     		</tr>
	    		</table>
	    	<br></td>
	    	<td ><br></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
