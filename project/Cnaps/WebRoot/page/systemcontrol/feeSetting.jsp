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
<title>����������</title>

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
						<div  class="text_title"><span class="text_blue2">����������</span></div>		
									</td>
  </tr>
  </table>
  <table width="95%"  align="center" cellpadding="0" cellspacing="0"  class="table_head">
  <tr>
    <td colspan="10"><span class="text_tablehead">&nbsp;</span></td>
	
  </tr>
  <tr>
    <td colspan="10"><span class="text_tablehead">ͨ �� �� ��</span></td>
	
  </tr>
  <tr><td colspan="10">&nbsp;</td></tr>
  <tr>
    <td ><span class="">����</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>������</option>
    		<option>������</option>
    		<option>������</option>
    	</select>
    </td>
    <td ><span class="">��֧����</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>����֧��</option>
    		<option>����֧��</option>
    		<option>����֧��</option>
    	</select>
    </td>
    <td ><span class="">ҵ������</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option value="A108" ${condition.pmttp eq 'A108' ? 'selected' : '' }>�ֽ���</option>
				                  			<option value="A109" ${condition.pmttp eq 'A109' ? 'selected' : '' }>ί���տ�(����)</option>
				                  			<option value="B100" ${condition.pmttp eq 'B100' ? 'selected' : '' }>��ͨ���ҵ��</option>
				                  			<option value="C102" ${condition.pmttp eq 'C102' ? 'selected' : '' }>���˴���ͨ��ҵ��</option>
				                  			<option value="D102" ${condition.pmttp eq 'D102' ? 'selected' : '' }>���˴���ͨ��ҵ��</option>
				                  			<option value="E100" ${condition.pmttp eq 'E100' ? 'selected' : '' }>��ͨ���ڴ���ҵ��</option>
    	</select>
    </td>
    <td ><span class="">�������</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>�����ͨ����</option>
    		<option>��ͨ���</option>
    		<option>���ڴ���</option>
    		<option>���ڽ��</option>
    	</select>
    </td>
  </tr>
  <tr>
  	<td ><span class="">���㷽ʽ</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>���ʼ���</option>
    		<option>�����ʼ���</option>
    	</select>
    </td>
    
  </tr>
  <tr>
  	<td align="right" colspan="7">
	  <input name="shezhi" type="button" value="����" class="button"/>	  </td>
	   <td > <input name="cahxun" type="button" value="��ѯ" class="button"/>	  </td>
	  <td colspan="2">&nbsp;</td>
  </tr>
  <tr><td colspan="10">&nbsp;</td></tr>
<table width="95%"  align="center" cellpadding="0" cellspacing="0"  class="table_head">
  
  <tr><td colspan="8">&nbsp;</td></tr>
  
  
 
  
  <tr>
    <td colspan="10"><span class="">�����շ�</span><br /></td>
	
  </tr>
  
  <tr >
    <td colspan="10">
	<div class="table_body">
	<table  class="tbcolor" width="100%">
      <tr class="text_listhead">
        <td class="text_tablehead_b" ><div align="center">���õȼ�</div></td>
        <td class="text_tablehead_b"><div align="center">��ʼֵ</div></td>
        <td class="text_tablehead_b"><div align="center">��</div></td>
        <td class="text_tablehead_b"><div align="center">��ֵֹ</div></td>
        <td class="text_tablehead_b"><div align="center">���</div></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">�ȼ�1</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="0.00"/></td>
        <td bordercolor="#999999"><div align="center">��</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield"  value="1000.00"/></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="10.00" /></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">�ȼ�2</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield"  value="1000.00"/></td>
        <td bordercolor="#999999"><div align="center">��</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="3000.00" /></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="20.00" /></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">�ȼ�3</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="3000.00" /></td>
        <td bordercolor="#999999"><div align="center">��</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="6000.00" /></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="30.00"/></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">�ȼ�4</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="6000.00"/></td>
        <td bordercolor="#999999"><div align="center">��</div></td>
        <td bordercolor="#999999">����</td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="40.00" /></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">�ʵ��</div></td>
        <td bordercolor="#999999" colspan="4" align="left"><input type="text" name="textfield" value="100.00"/></td>
      </tr>
      <tr>
      <td bordercolor="#999999"><div align="center">��ؼ���</div></td>
        <td bordercolor="#999999" colspan="4" align="left"><input type="text" name="textfield2" value="100.00"/></td>
      </tr>
    </table>
	</div>	</td>
  </tr>
   <tr><td colspan="8">&nbsp;</td></tr>
  <tr>
    <td colspan="8"><span class="">�������շ�</span><br /></td>
	
  </tr>
  <tr >
    <td colspan="10">
	<div class="table_body">
	<table class="tbcolor" width="100%">
      <tr  class="text_listhead">
       
        <td  colspan="2" align="center">����ֵ</td>
        <td align="center">���</td>
        <td align="center" >���</td>
      </tr>
      <tr  class="text_list">
      
        <td colspan="2" align="center">2%</td>
        <td align="center"><input type="text" name="textfield" value="50.00"/></td>
        <td><input type="text" name="textfield" value="10.00" /></td>
      </tr>
      <tr  class="text_list">
        <td colspan="2"><div align="center" >�ʵ��</div></td>
        <td>
          <div align="center">
            <input type="text" name="textfield3" value="100.00" />
            </div></td>
            <td>&nbsp;</td>
        
       
      </tr>
      <tr>
      <td colspan="2"><div align="center">��ؼ���</div></td>
        <td>
          <div align="center">
            <input type="text" name="textfield4" value="100.00"/>
            </div></td>
            <td>&nbsp;</td>
      </tr>
      </table></div></td></tr>
  <tr><td colspan="10">&nbsp;</td></tr>
  <tr>
    <td colspan="10"><span class="text_tablehead">�� �� �� �� ��</span></td>
	
  </tr>
 <tr><td colspan="10">&nbsp;</td></tr>
   <tr>
    <td ><span class="">����</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>������</option>
    		<option>������</option>
    		<option>������</option>
    	</select>
    </td>
    <td ><span class="">��֧����</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>����֧��</option>
    		<option>����֧��</option>
    		<option>����֧��</option>
    	</select>
    </td>
    <td ><span class="">ҵ������</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option value="A108" ${condition.pmttp eq 'A108' ? 'selected' : '' }>�ֽ���</option>
				                  			<option value="A109" ${condition.pmttp eq 'A109' ? 'selected' : '' }>ί���տ�(����)</option>
				                  			<option value="B100" ${condition.pmttp eq 'B100' ? 'selected' : '' }>��ͨ���ҵ��</option>
				                  			<option value="C102" ${condition.pmttp eq 'C102' ? 'selected' : '' }>���˴���ͨ��ҵ��</option>
				                  			<option value="D102" ${condition.pmttp eq 'D102' ? 'selected' : '' }>���˴���ͨ��ҵ��</option>
				                  			<option value="E100" ${condition.pmttp eq 'E100' ? 'selected' : '' }>��ͨ���ڴ���ҵ��</option>
    	</select>
    </td>
    	<td ><span class="">�������</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>�����ͨ����</option>
    		<option>��ͨ���</option>
    		<option>���ڴ���</option>
    		<option>���ڽ��</option>
    	</select>
    </td>
  </tr>
  <tr>
   <td ><span class="">�ͻ���</span><br /></td>
    <td >
    	<input type="text" name="t" value="" style="width:100px;"/>
    </td>
  <td ><span class="">�շѷ�ʽ</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>��ĩ�ۼ��շ�</option>
    		<option>һ�����շ�</option>
    	</select>
    </td>
  	<td ><span class="">���㷽ʽ</span><br /></td>
    <td >
    	<select style="width:100px;">
    		<option>���ʼ���</option>
    		<option>�����ʼ���</option>
    	</select>
    </td>
    <td ><span class="">����</span><br /></td>
    <td >
    	<input type="radio" name="rad1" style="width:20px;" />����<input type="radio" name="rad1" style="width:20px;" checked/>�Ǽ���
    </td>
   
    <td colspan="4"></td>
  </tr>
  <tr>
  	<td align="right" colspan="7">
	  <input name="shezhi" type="button" value="����" class="button"/>	  </td>
	   <td > <input name="cahxun" type="button" value="��ѯ" class="button"/>	  </td>
	  <td colspan="2">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="10"><span class="">�����Ż��շ�</span><br /></td>
	
  </tr>
  
  <tr >
    <td colspan="10">
	<div class="table_body">
	<table  class="tbcolor" width="100%">
      <tr class="text_listhead">
        <td class="text_tablehead_b" ><div align="center">���õȼ�</div></td>
        <td class="text_tablehead_b"><div align="center">��ʼֵ</div></td>
        <td class="text_tablehead_b"><div align="center">��</div></td>
        <td class="text_tablehead_b"><div align="center">��ֵֹ</div></td>
        <td class="text_tablehead_b"><div align="center">���</div></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">�ȼ�1</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="0.00"/></td>
        <td bordercolor="#999999"><div align="center">��</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield"  value="1000.00"/></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="10.00" /></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">�ȼ�2</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield"  value="1000.00"/></td>
        <td bordercolor="#999999"><div align="center">��</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="3000.00" /></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="20.00" /></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">�ȼ�3</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="3000.00" /></td>
        <td bordercolor="#999999"><div align="center">��</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="6000.00" /></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="30.00"/></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">�ȼ�4</div></td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="6000.00"/></td>
        <td bordercolor="#999999"><div align="center">��</div></td>
        <td bordercolor="#999999">����</td>
        <td bordercolor="#999999"><input type="text" name="textfield" value="40.00" /></td>
      </tr>
      <tr  class="text_list">
        <td bordercolor="#999999"><div align="center">�ʵ��</div></td>
        <td bordercolor="#999999" colspan="4" align="left"><input type="text" name="textfield" value="100.00"/></td>
      </tr>
      <tr>
      <td bordercolor="#999999"><div align="center">��ؼ���</div></td>
        <td bordercolor="#999999" colspan="4" align="left"><input type="text" name="textfield2" value="100.00"/></td>
      </tr>
    </table>
	</div>	</td>
  </tr>
   <tr><td colspan="8">&nbsp;</td></tr>
  <tr>
    <td colspan="8"><span class="">�������Ż��շ�</span><br /></td>
	
  </tr>
  <tr >
    <td colspan="10">
	<div class="table_body">
	<table class="tbcolor" width="100%">
      <tr  class="text_listhead">
       
        <td  colspan="2" align="center">����ֵ</td>
        <td align="center">���</td>
        <td align="center" >���</td>
      </tr>
      <tr  class="text_list">
      
        <td colspan="2" align="center">2%</td>
        <td align="center"><input type="text" name="textfield" value="50.00"/></td>
        <td><input type="text" name="textfield" value="10.00" /></td>
      </tr>
      <tr  class="text_list">
        <td colspan="2"><div align="center" >�ʵ��</div></td>
        <td>
          <div align="center">
            <input type="text" name="textfield3" value="100.00" />
            </div></td>
            <td>&nbsp;</td>
        
       
      </tr>
      <tr>
      <td colspan="2"><div align="center">��ؼ���</div></td>
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

