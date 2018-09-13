<%@ page contentType="text/html; charset=gbk" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>

<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";	
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>手续费设置</title>

<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"
			media="screen,projection" />	
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/systemManager/systemRoleManage/queryRole.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
</head>
<body>
<table align="center">
<tr><td colspan="5">&nbsp;</td></tr>
<tr><td colspan="5">&nbsp;</td></tr>
<tr>
<td  colspan="4">&nbsp;</td>
<td align="center">
<table width="95%"  align="center" cellpadding="0" cellspacing="0"  >
  <tr>
					 <td  >
						<div  class="text_title"><span class="text_blue2">手续费设置</span></div>		
									</td>
  </tr>
  </table>
  <table width="95%"  align="center" cellpadding="0" cellspacing="0"  class="table_head">
  <tr>
    <td colspan="10"><span class="text_tablehead">&nbsp;</span></td>
	
  </tr>
  <tr>
    <td colspan="10"><span class="text_tablehead">通 用 设 置</span></td>
	
  </tr>
  <tr><td colspan="10">&nbsp;</td></tr>
  <tr>
    <td ><span class="">地区</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>朝阳区</option>
    		<option>海淀区</option>
    		<option>崇文区</option>
    	</select>
    </td>
    <td ><span class="">分支机构</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>朝阳支行</option>
    		<option>海淀支行</option>
    		<option>崇文支行</option>
    	</select>
    </td>
    <td ><span class="">业务类型</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option value="A108" ${condition.pmttp eq 'A108' ? 'selected' : '' }>现金汇款</option>
				                  			<option value="A109" ${condition.pmttp eq 'A109' ? 'selected' : '' }>委托收款(划回)</option>
				                  			<option value="B100" ${condition.pmttp eq 'B100' ? 'selected' : '' }>普通借记业务</option>
				                  			<option value="C102" ${condition.pmttp eq 'C102' ? 'selected' : '' }>个人储蓄通存业务</option>
				                  			<option value="D102" ${condition.pmttp eq 'D102' ? 'selected' : '' }>个人储蓄通兑业务</option>
				                  			<option value="E100" ${condition.pmttp eq 'E100' ? 'selected' : '' }>普通定期贷记业务</option>
    	</select>
    </td>
    <td ><span class="">交易类别</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>大额普通贷记</option>
    		<option>普通借记</option>
    		<option>定期贷记</option>
    		<option>定期借记</option>
    	</select>
    </td>
  </tr>
  <tr>
  	<td ><span class="">计算方式</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>按笔计算</option>
    		<option>按比率计算</option>
    	</select>
    </td>
    
  </tr>
  <tr>
  	<td align="right" colspan="7">
	  <input name="shezhi" type="button" value="设置" class="button"/>	  </td>
	   <td > <input name="cahxun" type="button" value="查询" class="button"/>	  </td>
	  <td colspan="2">&nbsp;</td>
  </tr>
  <tr><td colspan="10">&nbsp;</td></tr>
<table width="95%"  align="center" cellpadding="0" cellspacing="0"  class="table_head">
  
  <tr><td colspan="8">&nbsp;</td></tr>
  
  
 
  
  <tr>
    <td colspan="10"><span class="">按笔收费</span><br /></td>
	
  </tr>
  
  <tr >
    <td colspan="10">
	<div class="table_body">
	<table  class="tbcolor" width="100%">
      <tr class="text_listhead">
        <td class="text_tablehead_b" ><div align="center">费用等级</div></td>
        <td class="text_tablehead_b"><div align="center">起始值</div></td>
        <td class="text_tablehead_b"><div align="center">至</div></td>
        <td class="text_tablehead_b"><div align="center">截止值</div></td>
        <td class="text_tablehead_b"><div align="center">金额</div></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">等级1</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="0.00"/></td>
        <td bordercolor="#999999"><div align="center">至</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield"  value="1000.00"/></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="10.00" /></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">等级2</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield"  value="1000.00"/></td>
        <td bordercolor="#999999"><div align="center">至</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="3000.00" /></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="20.00" /></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">等级3</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="3000.00" /></td>
        <td bordercolor="#999999"><div align="center">至</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="6000.00" /></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="30.00"/></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">等级4</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="6000.00"/></td>
        <td bordercolor="#999999"><div align="center">至</div></td>
        <td bordercolor="#999999">以上</td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="40.00" /></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">邮电费</div></td>
        <td bordercolor="#999999" colspan="4" align="left"><input type="text" name="textfield" value="100.00"/></td>
      </tr>
      <tr>
      <td bordercolor="#999999"><div align="center">异地加收</div></td>
        <td bordercolor="#999999" colspan="4" align="left"><input type="text" name="textfield2" value="100.00"/></td>
      </tr>
    </table>
	</div>	</td>
  </tr>
   <tr><td colspan="8">&nbsp;</td></tr>
  <tr>
    <td colspan="8"><span class="">按比率收费</span><br /></td>
	
  </tr>
  <tr >
    <td colspan="10">
	<div class="table_body">
	<table class="tbcolor" width="100%">
      <tr  class="text_listhead">
       
        <td  colspan="2" align="center">比率值</td>
        <td align="center">最高</td>
        <td align="center" >最低</td>
      </tr>
      <tr  class="text_list">
      
        <td colspan="2" align="center">2%</td>
        <td align="center"><input type="text" name="textfield" value="50.00"/></td>
        <td><input type="text" name="textfield" value="10.00" /></td>
      </tr>
      <tr  class="text_list">
        <td colspan="2"><div align="center" >邮电费</div></td>
        <td>
          <div align="center">
            <input type="text" name="textfield3" value="100.00" />
            </div></td>
            <td>&nbsp;</td>
        
       
      </tr>
      <tr>
      <td colspan="2"><div align="center">异地加收</div></td>
        <td>
          <div align="center">
            <input type="text" name="textfield4" value="100.00"/>
            </div></td>
            <td>&nbsp;</td>
      </tr>
      </table></div></td></tr>
  <tr><td colspan="10">&nbsp;</td></tr>
  <tr>
    <td colspan="10"><span class="text_tablehead">个 性 化 设 置</span></td>
	
  </tr>
 <tr><td colspan="10">&nbsp;</td></tr>
   <tr>
    <td ><span class="">地区</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>朝阳区</option>
    		<option>海淀区</option>
    		<option>崇文区</option>
    	</select>
    </td>
    <td ><span class="">分支机构</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>朝阳支行</option>
    		<option>海淀支行</option>
    		<option>崇文支行</option>
    	</select>
    </td>
    <td ><span class="">业务类型</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option value="A108" ${condition.pmttp eq 'A108' ? 'selected' : '' }>现金汇款</option>
				                  			<option value="A109" ${condition.pmttp eq 'A109' ? 'selected' : '' }>委托收款(划回)</option>
				                  			<option value="B100" ${condition.pmttp eq 'B100' ? 'selected' : '' }>普通借记业务</option>
				                  			<option value="C102" ${condition.pmttp eq 'C102' ? 'selected' : '' }>个人储蓄通存业务</option>
				                  			<option value="D102" ${condition.pmttp eq 'D102' ? 'selected' : '' }>个人储蓄通兑业务</option>
				                  			<option value="E100" ${condition.pmttp eq 'E100' ? 'selected' : '' }>普通定期贷记业务</option>
    	</select>
    </td>
    	<td ><span class="">交易类别</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>大额普通贷记</option>
    		<option>普通借记</option>
    		<option>定期贷记</option>
    		<option>定期借记</option>
    	</select>
    </td>
  </tr>
  <tr>
   <td ><span class="">客户号</span><br /></td>
    <td >
    	<input type="text" name="t" value="" style="width:100px;"/>
    </td>
  <td ><span class="">收费方式</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>月末累计收费</option>
    		<option>一次性收费</option>
    	</select>
    </td>
  	<td ><span class="">计算方式</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>按笔计算</option>
    		<option>按比率计算</option>
    	</select>
    </td>
    <td ><span class="">减免</span><br /></td>
    <td >
    	<input type="radio" name="rad1" style="width:20px;" />减免<input type="radio" name="rad1" style="width:20px;" checked/>非减免
    </td>
   
    <td colspan="4"></td>
  </tr>
  <tr>
  	<td align="right" colspan="7">
	  <input name="shezhi" type="button" value="设置" class="button"/>	  </td>
	   <td > <input name="cahxun" type="button" value="查询" class="button"/>	  </td>
	  <td colspan="2">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="10"><span class="">按笔优惠收费</span><br /></td>
	
  </tr>
  
  <tr >
    <td colspan="10">
	<div class="table_body">
	<table  class="tbcolor" width="100%">
      <tr class="text_listhead">
        <td class="text_tablehead_b" ><div align="center">费用等级</div></td>
        <td class="text_tablehead_b"><div align="center">起始值</div></td>
        <td class="text_tablehead_b"><div align="center">至</div></td>
        <td class="text_tablehead_b"><div align="center">截止值</div></td>
        <td class="text_tablehead_b"><div align="center">金额</div></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">等级1</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="0.00"/></td>
        <td bordercolor="#999999"><div align="center">至</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield"  value="1000.00"/></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="10.00" /></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">等级2</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield"  value="1000.00"/></td>
        <td bordercolor="#999999"><div align="center">至</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="3000.00" /></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="20.00" /></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">等级3</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="3000.00" /></td>
        <td bordercolor="#999999"><div align="center">至</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="6000.00" /></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="30.00"/></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">等级4</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="6000.00"/></td>
        <td bordercolor="#999999"><div align="center">至</div></td>
        <td bordercolor="#999999">以上</td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="40.00" /></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">邮电费</div></td>
        <td bordercolor="#999999" colspan="4" align="left"><input type="text" name="textfield" value="100.00"/></td>
      </tr>
      <tr>
      <td bordercolor="#999999"><div align="center">异地加收</div></td>
        <td bordercolor="#999999" colspan="4" align="left"><input type="text" name="textfield2" value="100.00"/></td>
      </tr>
    </table>
	</div>	</td>
  </tr>
   <tr><td colspan="8">&nbsp;</td></tr>
  <tr>
    <td colspan="8"><span class="">按比率优惠收费</span><br /></td>
	
  </tr>
  <tr >
    <td colspan="10">
	<div class="table_body">
	<table class="tbcolor" width="100%">
      <tr  class="text_listhead">
       
        <td  colspan="2" align="center">比率值</td>
        <td align="center">最高</td>
        <td align="center" >最低</td>
      </tr>
      <tr  class="text_list">
      
        <td colspan="2" align="center">2%</td>
        <td align="center"><input type="text" name="textfield" value="50.00"/></td>
        <td><input type="text" name="textfield" value="10.00" /></td>
      </tr>
      <tr  class="text_list">
        <td colspan="2"><div align="center" >邮电费</div></td>
        <td>
          <div align="center">
            <input type="text" name="textfield3" value="100.00" />
            </div></td>
            <td>&nbsp;</td>
        
       
      </tr>
      <tr>
      <td colspan="2"><div align="center">异地加收</div></td>
        <td>
          <div align="center">
            <input type="text" name="textfield4" value="100.00"/>
            </div></td>
            <td>&nbsp;</td>
      </tr>
      </table></div></td></tr>
  
  
  
  
    </table>
    <br/><br/>
    
    
  
	
<br/><br/>


</body>
</html>

