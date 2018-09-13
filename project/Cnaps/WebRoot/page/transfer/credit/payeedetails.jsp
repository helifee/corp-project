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
 <title>定期贷记收款人明细</title> 
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
	<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
 <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
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
	
	function detailAdd(pmtkd,parentid){
	 
	
	 var url = getRootPath()+'/transfer/RegularCreditChildrenAction.do?method=goaddChild&pmtkd='+pmtkd+'&id='+parentid;
	 var i = createWinByHeiWid("wind","定期贷记收款人增加", url,400,'90%');
 	
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/transfer/RegularCreditChildrenAction.do?method=queryDetail&id="+parentid+"&pmtkd="+pmtkd;
			return true;
	 	});
 	i.show();
}
	function detailView(pmtkd,parentid,id,flag){
		var url;
		 if("detel"==flag){
		 	url =getRootPath()+"/transfer/RegularCreditChildrenAction.do?method=deleteChild&parentid="+parentid+"&id="+id;
		 }else if("edit"==flag){
		  	url = getRootPath()+"/transfer/RegularCreditChildrenAction.do?method=editPayee&pmtkd="+pmtkd+"&parentid="+parentid+"&id="+id;
		 }else {
		 	url = getRootPath()+'/transfer/RegularCreditChildrenAction.do?method=personDetail&id='+id;
		 }
	 
	 	 var i =  createWinByHeiWid("wind","明细查看", url,400,'90%');
	 	i.on("beforedestroy",function(){
		 		window.location.href=getRootPath()
					+ "/transfer/RegularCreditChildrenAction.do?method=queryDetail&id="+parentid+"&pmtkd="+pmtkd;
				return true;
		 	});
	 	i.show();
	}



function queryDelete(url){

	document.forms[0].action=getRootPath()+url;
	document.forms[0].submit();
	
}	
function nullsubmit1()
{           var msg = "@";
	  var file= document.getElementById("file");
	  if(isNull(trim(file.value))){
					msg += file.title+"文件不能为空！@";
				}
				var boo = msgSplit(msg);
				if(boo){
				
					this.document.forms[0].submit();
				}
	
	 
}
function querysubmit(pmtkd,parentid) 
{
	  document.forms[0].action=getRootPath()+"/transfer/RegularCreditChildrenAction.do?method=queryDetail&pmtkd="+pmtkd+"&id="+parentid;
	document.forms[0].submit();
	 
}
</script>

</head>
<body  >




<html:form method="post" enctype="multipart/form-data" action="/transfer/RegularCreditChildrenAction.do?method=batchSave&id=${parentid}&pmtkd=${pmtkd}">
	<input id="business_name" type="hidden" value="regularDebitSigned">
	<input id="repeatmark" type="hidden" value="0">
	
 
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left">&nbsp;</h5>
							</td>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
  <tr valign="top">
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
            <div align="center">
             <table width="95%"  border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="134" >
                  		<div  class="text_title"><span class="text_blue2">收款人列表信息</span></div>
                 </td><td width="781"></td>
                </tr>
                 
              </table>
             
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
                 <tr>     
			           <td class="text_tablehead_b"  colspan="3">&nbsp;</td>   		
				                    
				                  	 <td  >&nbsp;</td> 
                </tr>            
                 <tr>
               
              		<td class="text_tablehead_b">单笔金额</td>
             		 <td   >
				                  		<html:text property="regularCreditPersonDetail.money" maxlength="20" />
				                  	</td>
              		<td class="text_tablehead_b">收款人账号</td>
                   <td   >
				                  		<html:text property="regularCreditPersonDetail.receAcount" maxlength="32" />
				   </td>
				   <td   >
				                  	 <input name="query" type="button" class="button" value="查询"  onclick="querysubmit('${pmtkd}','${parentid}')"/>
				   </td>
			           </tr>
			           
                
                
                   <tr>     
			           <td class="text_tablehead_b"  colspan="3">&nbsp;</td>   		
				                    
				                  	 <td  >&nbsp;</td> 
                </tr>            
              </table>
               <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
               <tr>
                
                 
			        	<td class="text_tablehead_b">&nbsp;
			        	  单条导入
			        	</td>
			        	<td>&nbsp;
			         	    <input name="addButton" type="button" class="button" value="新 增" onClick="detailAdd('${pmtkd}','${parentid}')"/>
			        	 
			        	</td>
                </tr>  
                <tr>
                	<td class="text_tablehead_b"> 
			        	  批量导入
			        	</td>
			        	
			        	<td>
			        	<input name=zcxfiles"	  type="file" id="file" size="1" value="批量导入" title="批量导入" /> 
			        	<input name="query" type="button" class="button" value="导 入"  onclick="nullsubmit1('${pmtkd}','${parentid}')"/>
						
			        	</td>
			        	 
                </tr>
			   </table>
              
              
              
              <table width="761" height="23" border="0" cellpadding="0" cellspacing="0">
                <tr >
                <td width="41"   ></td>
                <td width="41" align="center"></td>
                <td width="414" ><div align="right">
                </div></td>
                </tr>
              </table>
              
              <table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
                <tr> 
                             <td  align="center" class="text_listhead">收款人账号</td>
				                   <td  align="center" class="text_listhead">收款人名称</td>					                  
				                   <td  align="center" class="text_listhead">收款行行号</td>
				                   <td  align="center" class="text_listhead">收款人开户行行号</td>
				                   <td  align="center" class="text_listhead">单笔金额</td>
				                   <td  align="center" class="text_listhead">操作</td>
				       				 
                </tr>
                <logic:present name="payeedetailsList">
                <logic:iterate id="po" name="payeedetailsList">
                    <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
             
              
                    	                  <td  class="text_list"><div class="gridCell_standard">${po.receAcount}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.receName}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.cdtrBrnchId}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.receOpenBankNum}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.money}</td>
						            		 
                 
                   <td  class="text_list">
                      <div align="center">
                      <span class="text_list"> 
                    
             								<a href="#" onclick="detailView('${pmtkd}','${parentid}','${po.id}','view')">明细</a>&nbsp;
             								<a href="#" onclick="detailView('${pmtkd}','${parentid}','${po.id}','edit')">修改</a>&nbsp;
             							<!--   	<a href="#" onclick="queryDelete('/transfer/RegularCreditAction.do?method=queryDelete&flag=deleteChild&id=${po.id}')">删除</a>-->
             								<a href="#"onclick="detailView('${pmtkd}','${parentid}','${po.id}','detel')">删除</a>
						                 
						                                   
                      </span>
                      </div>
                 </td>
                 
                </tr>
				</logic:iterate>
				 <logic:empty name="payeedetailsList">
					                  	<tr>
					                		<td colspan="9" align="center"><font color="red">没有符合条件的记录!</font></td>
					                	</tr>
					                  </logic:empty>    
                </logic:present>
             </table></td>
        </tr>
		<tr>  
	      <td></td>      
	      <td>
	            <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td><jsp:include page="/page/common/Page.jsp"/></td>
        </tr>
      </table>	      </td>
	      <td></td>
	      </tr>
    </table>    </td>
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	
  </tr>  
</table>
</html:form>
  
</body>
</html>














