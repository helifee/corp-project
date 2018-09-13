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
<title> 批量包查询 </title>
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
		//viewcheck(newurl,oldurl,"复核界面",document);
		
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
                						<div  class="text_title"><span class="text_blue2">支付业务往报查询--批量包</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">报文标识号</td>
				                  	<td  colspan="3">
				                   		<input type="text" name="po.msgid"  value="${condition.msgid }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">签发日期</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>
				                  	</td>
                					<td>
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
                				<tr>
				                	<td class="text_tablehead_b">报文编号</td>
				                  	<td  colspan="3">
				                   		<select name="po.msgtpid">
				                  			<option value="">请选择</option>
											<option value="hvps.111.001.01" ${condition.msgtpid eq  'hvps.111.001.01' ? 'selected' : ''}>	客户发起汇兑业务报文                             </option>
											<option value="hvps.112.001.01" ${condition.msgtpid eq  'hvps.112.001.01' ? 'selected' : ''}>	金融机构发起汇兑业务报文                           </option>
											<option value="hvps.141.001.01" ${condition.msgtpid eq  'hvps.141.001.01' ? 'selected' : ''}>	即时转账报文                                 </option>
											<option value="hvps.143.001.01" ${condition.msgtpid eq  'hvps.143.001.01' ? 'selected' : ''}>	PVP结算申请信息报文                            </option>
											<option value="hvps.144.001.01" ${condition.msgtpid eq  'hvps.144.001.01' ? 'selected' : ''}>	PVP结算应答信息报文                            </option>
											<option value="hvps.151.001.01" ${condition.msgtpid eq  'hvps.151.001.01' ? 'selected' : ''}>	申请清算银行汇票资金报文                           </option>
											<option value="hvps.152.001.01" ${condition.msgtpid eq  'hvps.152.001.01' ? 'selected' : ''}>	银行汇票全额兑付通知报文                           </option>
											<option value="hvps.153.001.01" ${condition.msgtpid eq  'hvps.153.001.01' ? 'selected' : ''}>	银行汇票申请退回业务报文                           </option>
											<option value="hvps.154.001.01" ${condition.msgtpid eq  'hvps.154.001.01' ? 'selected' : ''}>	取现回执报文                                 </option>
											<option value="hvps.631.001.01" ${condition.msgtpid eq  'hvps.631.001.01' ? 'selected' : ''}>	多边轧差净额结算报文                             </option>
											<option value="hvps.634.001.01" ${condition.msgtpid eq  'hvps.634.001.01' ? 'selected' : ''}>	多边净额业务撤销申请报文                           </option>
											<option value="hvps.710.001.01" ${condition.msgtpid eq  'hvps.710.001.01' ? 'selected' : ''}>	大额业务对账申请报文                             </option>
											<option value="hvps.712.001.01" ${condition.msgtpid eq  'hvps.712.001.01' ? 'selected' : ''}>	大额业务明细核对申请报文                           </option>
											<option value="hvps.714.001.01" ${condition.msgtpid eq  'hvps.714.001.01' ? 'selected' : ''}>	大额业务下载申请报文                             </option>
											<option value="beps.121.001.01" ${condition.msgtpid eq  'beps.121.001.01' ? 'selected' : ''}>	客户发起普通贷记业务报文                           </option>
											<option value="beps.122.001.01" ${condition.msgtpid eq  'beps.122.001.01' ? 'selected' : ''}>	金融机构发起普通贷记业务报文                         </option>
											<option value="beps.123.001.01" ${condition.msgtpid eq  'beps.123.001.01' ? 'selected' : ''}>	实时贷记业务报文                               </option>
											<option value="beps.124.001.01" ${condition.msgtpid eq  'beps.124.001.01' ? 'selected' : ''}>	实时贷记回执业务报文                             </option>
											<option value="beps.125.001.01" ${condition.msgtpid eq  'beps.125.001.01' ? 'selected' : ''}>	定期贷记业务报文                               </option>
											<option value="beps.127.001.01" ${condition.msgtpid eq  'beps.127.001.01' ? 'selected' : ''}>	普通借记业务报文                               </option>
											<option value="beps.128.001.01" ${condition.msgtpid eq  'beps.128.001.01' ? 'selected' : ''}>	普通借记业务回执报文                             </option>
											<option value="beps.130.001.01" ${condition.msgtpid eq  'beps.130.001.01' ? 'selected' : ''}>	CIS通用回执业务报文                            </option>
											<option value="beps.131.001.01" ${condition.msgtpid eq  'beps.131.001.01' ? 'selected' : ''}>	实时借记业务报文                               </option>
											<option value="beps.132.001.01" ${condition.msgtpid eq  'beps.132.001.01' ? 'selected' : ''}>	实时借记业务回执报文                             </option>
											<option value="beps.133.001.01" ${condition.msgtpid eq  'beps.133.001.01' ? 'selected' : ''}>	定期借记业务报文                               </option>
											<option value="beps.134.001.01" ${condition.msgtpid eq  'beps.134.001.01' ? 'selected' : ''}>	定期借记业务回执报文                             </option>
											<option value="beps.380.001.01" ${condition.msgtpid eq  'beps.380.001.01' ? 'selected' : ''}>	批量代收业务报文                               </option>
											<option value="beps.381.001.01" ${condition.msgtpid eq  'beps.381.001.01' ? 'selected' : ''}>	批量代收业务回执报文                             </option>
											<option value="beps.382.001.01" ${condition.msgtpid eq  'beps.382.001.01' ? 'selected' : ''}>	批量代付业务报文                               </option>
											<option value="beps.383.001.01" ${condition.msgtpid eq  'beps.383.001.01' ? 'selected' : ''}>	批量代付业务回执报文                             </option>
											<option value="beps.384.001.01" ${condition.msgtpid eq  'beps.384.001.01' ? 'selected' : ''}>	实时代收业务报文                               </option>
											<option value="beps.385.001.01" ${condition.msgtpid eq  'beps.385.001.01' ? 'selected' : ''}>	实时代收业务回执报文                             </option>
											<option value="beps.386.001.01" ${condition.msgtpid eq  'beps.386.001.01' ? 'selected' : ''}>	实时代付业务报文                               </option>
											<option value="beps.387.001.01" ${condition.msgtpid eq  'beps.387.001.01' ? 'selected' : ''}>	实时代付业务回执报文                             </option>
											<option value="beps.388.001.01" ${condition.msgtpid eq  'beps.388.001.01' ? 'selected' : ''}>	代收付业务拒绝通知报文                            </option>
											<option value="beps.389.001.01" ${condition.msgtpid eq  'beps.389.001.01' ? 'selected' : ''}>	代收付业务收付款确认报文                           </option>
											<option value="beps.390.001.01" ${condition.msgtpid eq  'beps.390.001.01' ? 'selected' : ''}>	批量代收代付撤销申请报文                           </option>
											<option value="beps.391.001.01" ${condition.msgtpid eq  'beps.391.001.01' ? 'selected' : ''}>	批量代收代付撤销应答报文                           </option>
											<option value="beps.392.001.01" ${condition.msgtpid eq  'beps.392.001.01' ? 'selected' : ''}>	批量客户签约协议管理报文                           </option>
											<option value="beps.393.001.01" ${condition.msgtpid eq  'beps.393.001.01' ? 'selected' : ''}>	批量客户签约协议管理应答报文                         </option>
											<option value="beps.394.001.01" ${condition.msgtpid eq  'beps.394.001.01' ? 'selected' : ''}>	批量客户账户信息查询报文                           </option>
											<option value="beps.395.001.01" ${condition.msgtpid eq  'beps.395.001.01' ? 'selected' : ''}>	批量客户账户查询应答报文                           </option>
											<option value="beps.396.001.01" ${condition.msgtpid eq  'beps.396.001.01' ? 'selected' : ''}>	主动缴款查询报文                               </option>
											<option value="beps.397.001.01" ${condition.msgtpid eq  'beps.397.001.01' ? 'selected' : ''}>	主动缴款查询应答报文                             </option>
											<option value="beps.398.001.01" ${condition.msgtpid eq  'beps.398.001.01' ? 'selected' : ''}>	主动缴款通知报文                               </option>
											<option value="beps.399.001.01" ${condition.msgtpid eq  'beps.399.001.01' ? 'selected' : ''}>	主动缴款通知应答报文                             </option>
											<option value="beps.401.001.01" ${condition.msgtpid eq  'beps.401.001.01' ? 'selected' : ''}>	客户账户实时查询报文                             </option>
											<option value="beps.402.001.01" ${condition.msgtpid eq  'beps.402.001.01' ? 'selected' : ''}>	客户账户实时查询应答报文                           </option>
											<option value="beps.403.001.01" ${condition.msgtpid eq  'beps.403.001.01' ? 'selected' : ''}>	发票打印申请报文                               </option>
											<option value="beps.404.001.01" ${condition.msgtpid eq  'beps.404.001.01' ? 'selected' : ''}>	发票打印回应报文                               </option>
											<option value="beps.411.001.01" ${condition.msgtpid eq  'beps.411.001.01' ? 'selected' : ''}>	借记业务止付申请报文                             </option>
											<option value="beps.412.001.01" ${condition.msgtpid eq  'beps.412.001.01' ? 'selected' : ''}>	借记业务止付应答报文                             </option>
											<option value="beps.413.001.01" ${condition.msgtpid eq  'beps.413.001.01' ? 'selected' : ''}>	实时业务冲正申请报文                             </option>
											<option value="beps.418.001.01" ${condition.msgtpid eq  'beps.418.001.01' ? 'selected' : ''}>	支票圈存管理报文                               </option>
											<option value="beps.419.001.01" ${condition.msgtpid eq  'beps.419.001.01' ? 'selected' : ''}>	支票圈存管理应答报文                             </option>
											<option value="beps.720.001.01" ${condition.msgtpid eq  'beps.720.001.01' ? 'selected' : ''}>	小额业务对账申请报文                             </option>
											<option value="beps.722.001.01" ${condition.msgtpid eq  'beps.722.001.01' ? 'selected' : ''}>	小额业务包明细核对申请报文                          </option>
											<option value="beps.724.001.01" ${condition.msgtpid eq  'beps.724.001.01' ? 'selected' : ''}>	小额业务包下载申请报文                            </option>
											<option value="nets.350.001.01" ${condition.msgtpid eq  'nets.350.001.01' ? 'selected' : ''}>	净借记限额查询申请报文                            </option>
											<option value="nets.353.001.01" ${condition.msgtpid eq  'nets.353.001.01' ? 'selected' : ''}>	净借记限额质押/授信额度分配管理报文                     </option>
											<option value="nets.354.001.01" ${condition.msgtpid eq  'nets.354.001.01' ? 'selected' : ''}>	净借记限额可用额度预警值设置报文                       </option>
											<option value="saps.357.001.01" ${condition.msgtpid eq  'saps.357.001.01' ? 'selected' : ''}>	质押融资管理报文                               </option>
											<option value="saps.358.001.01" ${condition.msgtpid eq  'saps.358.001.01' ? 'selected' : ''}>	人工质押融资申请报文                             </option>
											<option value="saps.361.001.01" ${condition.msgtpid eq  'saps.361.001.01' ? 'selected' : ''}>	清算账户余额警戒值设置申请报文                        </option>
											<option value="saps.363.001.01" ${condition.msgtpid eq  'saps.363.001.01' ? 'selected' : ''}>	清算排队查询申请报文                             </option>
											<option value="saps.365.001.01" ${condition.msgtpid eq  'saps.365.001.01' ? 'selected' : ''}>	清算排队管理申请报文                             </option>
											<option value="saps.366.001.01" ${condition.msgtpid eq  'saps.366.001.01' ? 'selected' : ''}>	清算账户信息查询申请报文                           </option>
											<option value="saps.368.001.01" ${condition.msgtpid eq  'saps.368.001.01' ? 'selected' : ''}>	开户单位全面流动性查询报文                          </option>
											<option value="saps.369.001.01" ${condition.msgtpid eq  'saps.369.001.01' ? 'selected' : ''}>	开户单位全面流动性应答报文                          </option>
											<option value="saps.370.001.01" ${condition.msgtpid eq  'saps.370.001.01' ? 'selected' : ''}>	清算账户开户申请报文                             </option>
											<option value="saps.371.001.01" ${condition.msgtpid eq  'saps.371.001.01' ? 'selected' : ''}>	清算账户维护申请报文                             </option>
											<option value="saps.373.001.01" ${condition.msgtpid eq  'saps.373.001.01' ? 'selected' : ''}>	清算账户资金池管理报文                            </option>
											<option value="saps.374.001.01" ${condition.msgtpid eq  'saps.374.001.01' ? 'selected' : ''}>	清算账户自动拆借管理申请报文                         </option>
											<option value="saps.375.001.01" ${condition.msgtpid eq  'saps.375.001.01' ? 'selected' : ''}>	清算账户自动拆借管理应答报文                         </option>
											<option value="nets.376.001.01" ${condition.msgtpid eq  'nets.376.001.01' ? 'selected' : ''}>	净借记限额圈存资金调增报文                          </option>
											<option value="nets.377.001.01" ${condition.msgtpid eq  'nets.377.001.01' ? 'selected' : ''}>	净借记限额圈存资金调减报文                          </option>
											<option value="nets.405.001.01" ${condition.msgtpid eq  'nets.405.001.01' ? 'selected' : ''}>	轧差排队查询申请报文                             </option>
											<option value="nets.407.001.01" ${condition.msgtpid eq  'nets.407.001.01' ? 'selected' : ''}>	轧差排队管理申请报文                             </option>
											<option value="saps.609.001.01" ${condition.msgtpid eq  'saps.609.001.01' ? 'selected' : ''}>	同城净额清算查询申请报文                           </option>
											<option value="saps.611.001.01" ${condition.msgtpid eq  'saps.611.001.01' ? 'selected' : ''}>	同城轧差净额清算业务报文                           </option>
											<option value="saps.612.001.01" ${condition.msgtpid eq  'saps.612.001.01' ? 'selected' : ''}>	单边业务报文                                 </option>
											<option value="saps.613.001.01" ${condition.msgtpid eq  'saps.613.001.01' ? 'selected' : ''}>	错账冲正业务报文                               </option>
											<option value="saps.614.001.01" ${condition.msgtpid eq  'saps.614.001.01' ? 'selected' : ''}>	资金池/自动拆借管理查询申请报文                       </option>
											<option value="saps.615.001.01" ${condition.msgtpid eq  'saps.615.001.01' ? 'selected' : ''}>	资金池/自动拆借管理查询应答报文                       </option>
											<option value="nets.617.001.01" ${condition.msgtpid eq  'nets.617.001.01' ? 'selected' : ''}>	轧差净额查询请求报文                             </option>
											<option value="saps.731.001.01" ${condition.msgtpid eq  'saps.731.001.01' ? 'selected' : ''}>	人民银行清算业务明细核对申请报文                       </option>
											<option value="saps.737.001.01" ${condition.msgtpid eq  'saps.737.001.01' ? 'selected' : ''}>	核对余额及工作日申请报文                           </option>
											<option value="ccms.303.001.02" ${condition.msgtpid eq  'ccms.303.001.02' ? 'selected' : ''}>	自由格式报文                                 </option>
											<option value="ccms.307.001.02" ${condition.msgtpid eq  'ccms.307.001.02' ? 'selected' : ''}>	业务撤销申请报文                               </option>
											<option value="ccms.308.001.02" ${condition.msgtpid eq  'ccms.308.001.02' ? 'selected' : ''}>	业务撤销应答报文                               </option>
											<option value="ccms.310.001.01" ${condition.msgtpid eq  'ccms.310.001.01' ? 'selected' : ''}>	通用非签名信息业务报文                            </option>
											<option value="ccms.311.001.01" ${condition.msgtpid eq  'ccms.311.001.01' ? 'selected' : ''}>	通用非签名信息业务应答报文                          </option>
											<option value="ccms.312.001.01" ${condition.msgtpid eq  'ccms.312.001.01' ? 'selected' : ''}>	通用签名信息业务报文                             </option>
											<option value="ccms.313.001.01" ${condition.msgtpid eq  'ccms.313.001.01' ? 'selected' : ''}>	通用签名信息业务应答报文                           </option>
											<option value="ccms.314.001.01" ${condition.msgtpid eq  'ccms.314.001.01' ? 'selected' : ''}>	业务查询报文                                 </option>
											<option value="ccms.315.001.01" ${condition.msgtpid eq  'ccms.315.001.01' ? 'selected' : ''}>	业务查复报文                                 </option>
											<option value="ccms.316.001.01" ${condition.msgtpid eq  'ccms.316.001.01' ? 'selected' : ''}>	业务状态查询申请报文                             </option>
											<option value="ccms.318.001.01" ${condition.msgtpid eq  'ccms.318.001.01' ? 'selected' : ''}>	业务退回申请报文                               </option>
											<option value="ccms.319.001.01" ${condition.msgtpid eq  'ccms.319.001.01' ? 'selected' : ''}>	业务退回应答报文                               </option>
											<option value="ccms.805.001.02" ${condition.msgtpid eq  'ccms.805.001.02' ? 'selected' : ''}>	登录/退出申请报文                              </option>
											<option value="ccms.807.001.02" ${condition.msgtpid eq  'ccms.807.001.02' ? 'selected' : ''}>	强制离线通知报文                               </option>
											<option value="ccms.903.001.02" ${condition.msgtpid eq  'ccms.903.001.02' ? 'selected' : ''}>	数字证书绑定管理通知报文                           </option>
											<option value="ccms.919.001.01" ${condition.msgtpid eq  'ccms.919.001.01' ? 'selected' : ''}>	数字证书下载申请报文                             </option>
											<option value="ccms.990.001.02" ${condition.msgtpid eq  'ccms.990.001.02' ? 'selected' : ''}>	通信级确认报文                                </option>
											<option value="ccms.991.001.01" ${condition.msgtpid eq  'ccms.991.001.01' ? 'selected' : ''}>	探测请求报文                                 </option>

				                  	</td>
				                  	<td  class="text_tablehead_b">业务类型</td>
				                  	<td colspan="3">
				                   		<select name="po.pmttp">
				                  			<option value="">请选择</option>
				                  			<option value="A100" ${condition.pmttp eq 'A100' ? 'selected' : '' }>普通汇兑</option>
				                  			<option value="A108" ${condition.pmttp eq 'A108' ? 'selected' : '' }>现金汇款</option>
				                  			<option value="A109" ${condition.pmttp eq 'A109' ? 'selected' : '' }>委托收款(划回)</option>
				                  			<option value="A110" ${condition.pmttp eq 'A110' ? 'selected' : '' }>托收承付(划回)</option>
				                  			<option value="A200" ${condition.pmttp eq 'A200' ? 'selected' : '' }>行间资金汇划</option>
				                  			<option value="A202" ${condition.pmttp eq 'A202' ? 'selected' : '' }>银行汇票</option>
				                  			<option value="A113" ${condition.pmttp eq 'A113' ? 'selected' : '' }>跨境支付</option>
				                  			<option value="A101" ${condition.pmttp eq 'A101' ? 'selected' : '' }>公益性资金汇划</option>
				                  			<option value="A102" ${condition.pmttp eq 'A102' ? 'selected' : '' }>国库汇款</option>
				                  			<option value="A104" ${condition.pmttp eq 'A104' ? 'selected' : '' }>国库资金贷记划拨</option>
				                  			<option value="B104" ${condition.pmttp eq 'B104' ? 'selected' : '' }>国库资金借记划拨</option>
				                  			<option value="A106" ${condition.pmttp eq 'A106' ? 'selected' : '' }>支取发行资金</option>
				                  			<option value="A307" ${condition.pmttp eq 'A307' ? 'selected' : '' }>国库资金国债兑付贷记划拨</option>
				                  			<option value="B307" ${condition.pmttp eq 'B307' ? 'selected' : '' }>国库资金国债兑付借记划拨</option>
				                  			<option value="A301" ${condition.pmttp eq 'A301' ? 'selected' : '' }>缴费业务</option>
				                  			<option value="A201" ${condition.pmttp eq 'A201' ? 'selected' : '' }>支票</option>
				                  			<option value="B100" ${condition.pmttp eq 'B100' ? 'selected' : '' }>普通借记</option>
				                  			<option value="B308" ${condition.pmttp eq 'B308' ? 'selected' : '' }>支票截留</option>
				                  			<option value="B309" ${condition.pmttp eq 'B309' ? 'selected' : '' }>通用票据截留</option>
				                  			<option value="C102" ${condition.pmttp eq 'C102' ? 'selected' : '' }>个人储蓄通存</option>
				                  			<option value="D102" ${condition.pmttp eq 'D102' ? 'selected' : '' }>个人储蓄通兑</option>
				                  			<option value="E100" ${condition.pmttp eq 'E100' ? 'selected' : '' }>定期贷记</option>
				                  			<option value="F100" ${condition.pmttp eq 'F100' ? 'selected' : '' }>定期借记</option>
				                  			<option value="A309" ${condition.pmttp eq 'A309' ? 'selected' : '' }>CIS通用票据业务回执</option>
				                  			<option value="A308" ${condition.pmttp eq 'A308' ? 'selected' : '' }>CIS支票业务回执</option>
				                  	</td>
                					<td>
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					               <tr>
					                   <td  align="center" class="text_listhead">报文标识号</td>
					                   <td  align="center" class="text_listhead">接收清算行</td>
					                  <td  align="center" class="text_listhead">报文编号</td>					                  
					                   <td  align="center" class="text_listhead">业务类型</td>
					                   <td  align="center" class="text_listhead">总金额</td>	
					                   <td  align="center" class="text_listhead">总笔数</td>
					                   <td  align="center" class="text_listhead">成功总金额</td>					                   
					                   
					                   <td  align="center" class="text_listhead">成功总笔数</td>						                   
					                   <td  align="center" class="text_listhead">状态</td>
					                   <td  align="center" class="text_listhead">明细</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										 <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard"> ${po.instddrctpty } </div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${po.msgtpid}-
								                  <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">大额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'hvps.112.001.01'}">大额机构普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">小额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.122.001.01'}">小额机构普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">普通借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">实时贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">实时借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.125.001.01'}">定期贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.133.001.01'}">定期借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.124.001.01'}">	实时贷记回执业务</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.128.001.01'}">	普通借记业务回执</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.132.001.01'}">	实时借记业务回执</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.134.001.01'}">	定期借记业务回执</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.130.001.01'}">	CIS通用回执业务报文</c:if>
								                  </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.pmttp }-
								                  <c:if test="${po.pmttp eq 'A100'}">普通汇兑</c:if>
							                  	 <c:if test="${po.pmttp eq 'A108'}">现金汇款</c:if>
								                  <c:if test="${po.pmttp eq 'A109'}">委托收款(划回)</c:if>
								                  <c:if test="${po.pmttp eq 'A110'}">托收承付(划回)</c:if>
								                   <c:if test="${po.pmttp eq 'A200'}">行间资金汇划</c:if>
								                   <c:if test="${po.pmttp eq 'A202'}">银行汇票</c:if>
								                  <c:if test="${po.pmttp eq 'A112'}">外汇清算</c:if>
								                  <c:if test="${po.pmttp eq 'A101'}">公益性资金汇划)</c:if>
								                  <c:if test="${po.pmttp eq 'A102'}">国库汇款</c:if>
								                  <c:if test="${po.pmttp eq 'A104'}">国库资金贷记划拨</c:if>
								                   <c:if test="${po.pmttp eq 'A106'}">支取发行资金</c:if>
								                  <c:if test="${po.pmttp eq 'A301'}">缴费业务</c:if>
								                  <c:if test="${po.pmttp eq 'A201'}">支票</c:if>
								                   <c:if test="${po.pmttp eq 'B100'}">普通借记</c:if>
								                   <c:if test="${po.pmttp eq 'B104'}">国库资金借记划拨</c:if>
								                   <c:if test="${po.pmttp eq 'B307'}">国库资金国债兑付借记划拨</c:if>
								                    <c:if test="${po.pmttp eq 'A307'}">国库资金国债兑付贷记划拨</c:if>
								                   
								                     <c:if test="${po.pmttp eq 'C102'}">个人储蓄通存</c:if>
								                      <c:if test="${po.pmttp eq 'D102'}">个人储蓄通兑</c:if>
								                      <c:if test="${po.pmttp eq 'D200'}">实时代收</c:if>
								                     <c:if test="${po.pmttp eq 'C101'}">实时代付</c:if>
								                     <c:if test="${po.pmttp eq 'C210'}">薪金报酬</c:if>
								                    <c:if test="${po.pmttp eq 'C100'}">实时贷记</c:if>
								                    <c:if test="${po.pmttp eq 'D100'}">实时借记</c:if>
								                    <c:if test="${po.pmttp eq 'D203'}">实时通用票据截留</c:if>
								                     <c:if test="${po.pmttp eq 'E100'}">定期贷记</c:if>
								                   <c:if test="${po.pmttp eq 'F100'}">定期借记</c:if>
								                   <c:if test="${po.pmttp eq 'B308'}">支票截留</c:if>
								                    <c:if test="${po.pmttp eq 'B309'}">通用票据截留</c:if>
								                    <c:if test="${po.pmttp eq 'A308'}">CIS支票业务回执</c:if>
								                    <c:if test="${po.pmttp eq 'A309'}">CIS通用票据业务回执</c:if>
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
							                	<c:if test="${po.prcsts eq 'PR91'}">待复核</c:if>
							                	
							                             <c:if test="${po.prcsts eq 'PR04' }">已清算</c:if>
																	<c:if test="${po.prcsts eq 'PR09' }">已拒绝</c:if>
																	<c:if test="${entity.status eq 'PR08' }">已撤销</c:if>
																	<c:if test="${po.prcsts eq 'PR09' }">已拒绝</c:if>
																	<c:if test="${po.prcsts eq 'PR21' }">已止付</c:if>
																	<c:if test="${po.prcsts eq 'PR22' }">已冲正</c:if>
																	<c:if test="${po.prcsts eq 'PR32' }">已超期</c:if>
																	<c:if test="${po.prcsts eq 'PR05' }">已成功</c:if>
																	<c:if test="${po.prcsts eq 'PR98' }">待确认    </c:if>
																	<c:if test="${po.prcsts eq 'PR90' }">新建      </c:if>
																	<c:if test="${po.prcsts eq 'PR81' }">待复核    </c:if>
																	<c:if test="${po.prcsts eq 'PR82' }">待审核    </c:if>
																	<c:if test="${po.prcsts eq 'PR83' }">待审批    </c:if>
																	<c:if test="${po.prcsts eq 'PR95' }">待组包    </c:if>
																	<c:if test="${po.prcsts eq 'PR96' }">待发送    </c:if>
																	<c:if test="${po.prcsts eq 'PR97' }">已发送    </c:if>
																	<c:if test="${po.prcsts eq 'PR11' }">已轧差排队</c:if>
																	<c:if test="${po.prcsts eq 'PR12' }">已清算排队</c:if>
																	<c:if test="${po.prcsts eq 'PR99' }">故障</c:if>
																	<c:if test="${po.prcsts eq 'PR03' }">已轧差</c:if>
																	<c:if test="${po.prcsts eq 'PR89' }">待回执 </c:if>
																	<c:if test="${po.prcsts eq 'PR88' }">已回执</c:if>
							                  </div></td> 
							                  <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#" onClick="viewdetails('${po.msgid}','${po.msgtpid}',${po.instddrctpty })"><u>明细</u></a>
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
