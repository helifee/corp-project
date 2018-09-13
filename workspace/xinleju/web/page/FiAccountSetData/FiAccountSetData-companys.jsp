<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=10;IE=8;" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" /> 
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<link href="css/jeasyui_form.css" rel="stylesheet" type="text/css" />
		<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css"/>
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="js/ajax.js"></script>
		<script type="text/javascript" src="js/TemplateWindow.js"></script>

    <style>
        body {
            font-size: 12px
        }
    </style>
    <script type="text/javascript">
        var lcType;
        $(function () {
            queryData(0);
        });

        function getData() {		
            var data = $('#pttg').datagrid("getChecked")[0];
            return {name: data.name,code:data.code,id:data.id};
        }

        function queryData(type) {
        	var name = '${pageContext.request.getParameter("name")}';
            var id = '${pageContext.request.getParameter("id")}';
          $('#pttg').datagrid({
        	 height:395, 
        	 url:'FiAccountSetData!loadCompanys.do',
        	 pagination:false,
        	 onDblClickRow: function () {
        		if(name!=''&&name!=undefined){
           		  	window.parent.firstunitpDialogOpenDBClick(name,id);
        		}else{
        			window.parent.payunitDialogOpenDBClick();
        		}
 		     }
          });
        }
        
        function changeselect(id){
            $(id).children('img').attr('src','${pageContext.request.contextPath}/images/selected.png');
        	$(id).siblings('span').children('img').attr('src','${pageContext.request.contextPath}/images/unselect.png');
        	var value = $(id).text();
        	var ichangetype = 0;
        	if(value.indexOf('付款单位')>0){
        		ichangetype=0;
        	}
        	
        	queryData(ichangetype);
        }
      function doSearch(){
    	  
    	  var name = '${pageContext.request.getParameter("name")}';
          var id = '${pageContext.request.getParameter("id")}';
          var payunitname = $("#payunitname").val();
            $('#pttg').datagrid({
      	      height:395, 
      	      url:encodeURI('${pageContext.request.contextPath}/expensexecute/contract/contract!findPayUnit.do?payUnitType=0'+'&corpid='+$("#corpid").val()+"&payunitname="+payunitname),
         	  pagination:false,
      	      onDblClickRow: function () {
	      		if(name!=''&&name!=undefined){
	         		  	window.parent.firstunitpDialogOpenDBClick(name,id);
	      		}else{
	      			window.parent.payunitDialogOpenDBClick();
	      		}
		     }
        });
      }  
        
    </script>
</head>
<body style="padding: 5px;background-color: #FAFAFA">
<input type="hidden" id="corpid" value="<%=request.getParameter("corpid") %>"/>
		 <div>
		 <span onclick="changeselect(this);" >公司名称</span>&nbsp;&nbsp;&nbsp;
		<!--  <input type="text"  id="payunitname" style="width:150px;" class="serachinput" value="名称" onfocus="$(this).val('');" onblur="doSearch();"/> -->
		 <i class='fa fa-search' style=" color:#00F;cursor:pointer; font-size:13px; margin-left:5px;" onclick="doSearch();"></i>
		 </div> 
	     <%-- <span onclick="changeselect(this);">
	     <img id="gys" src="${pageContext.request.contextPath}/images/unselect.png" /> 供应商</span>
	     <span onclick="changeselect(this);">
	     <img id="grzh" src="${pageContext.request.contextPath}/images/unselect.png" /> 个人账户</span> --%>
	     <input type="hidden" name="ichangetype" id="ichangetype" value="0"/>
<div class="easyui-layout" data-options="fit:true,border:false">

    <div data-options="region:'center'">
    	
        <table id="pttg" data-options="singleSelect:true,border:false,rownumbers:true,fit:false">
				<thead>
					<tr>
					<!-- data-options="field:'id',hidden:true,align:'center',halign:'center'" -->
						<th field="name" width="350">名称</th>
						<th field="id" hidden="hidden">id</th>
					</tr>
				</thead>
			</table>
        
    </div>
</div>

</body>
</html>
