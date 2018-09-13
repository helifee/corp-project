<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>主数据</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="css/bootstrap/js/html5shiv.min.js"></script>
      <script src="css/bootstrap/js/respond.min.js"></script>
    <![endif]-->
    
    <script type="text/javascript" src="page/Designer/Designer-listFl.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
    <style>
    	.md_index{
    		
    		
    	}
    	
    	.index_table_wraper{
    		height:247px;
    		/**border-color:#bbb;
    		border-width:1px;
    		border-style:solid;**/
    		margin-bottom:20px;
    		padding:2px;
    	}
    	
    	.md_index_table{
    	}
    	
    	table{
    		font-size:12px;
    		table-layout:fixed;
    	}
    	table > caption {
	    	background:#F2F2F2;
	    	color:#333; 
	    	font-weight:bold;
	    	font-size:12px;
	    	padding-left:10px;
    		border-top-color: #ddd; 
    		border-right-color: #ddd; 
    		border-left-color: #ddd; 
    		border-top-width: 1px; 
    		border-right-width: 1px; 
    		border-left-width: 1px; 
    		border-top-style: solid; 
    		border-right-style: solid; 
    		border-left-style: solid;
    	}
    	
    	table > caption > span {
    		float:right;
    		padding-right:5px;
    	}
    	
    	table > caption > span > a{
    	}
    	table thead {
    		background:#F2F2F2;
    		color:#333; 
    		margin-top:2px;
    		margin-left:2px;
    		margin-right:2px;    		
    		font-size:12px;
    	}
    	table tbody{
    		margin-bottom:2px;
    		margin-left:2px;
    		margin-right:2px;
    		}
    		
       table thead tr th{
		  width:100px;
	   }
	   
	   .table-bordered thead tr th{
		  width:70px;
		  border-bottom:none;
		  border-bottom-width: 0px;
	   }
	
	   td{
		    text-overflow:ellipsis; /* for IE */        
	        -moz-text-overflow: ellipsis; /* for Firefox,mozilla */        
	        overflow:hidden;       
	        white-space: nowrap;      
	        text-align:left;
	   }
	   
	   .panel-heading {
	   		font-size:12px;
	   }
	   
	   .nopower {
	   		border-radius:0px;
	   		-webkit-box-shadow: none;
  			box-shadow: none; 
	   }
	   .full_height {
	   		height:239px;
	   }
	   
	   .height_34 {
	   		height:34px;
	   		color:#333; 
	   }
	   
	   .line_height_170 {
	   		line-height:170px;
	   		color:red; 
	   }
	   
	   .bold {
	   		font-weight: bold
	   }
	  
    </style>
  </head>
  <body>
    <div class="container-fluid" style="overflow:hidden;">
	  <div class="row">
	   	 <div class="col-md-6 md_index">
	   	 	<div class="index_table_wraper" id="user_wraper">
	   	 		<!-- 
	   	 		<div class="panel panel-default nopower full_height">
				  <div class="panel-heading height_34 bold">用户管理</div>
				  <div class="panel-body">
				   <p class="text-center line_height_170 bold">您没有权限访问 </p>
				  </div>
				</div>
				 -->
				<table class="table table-hover table-bordered md_index_table" id="user_list_table">
	 				<caption>用户管理<span><a href="User!index.do"  style="cursor:pointer;">更多>></a></span></caption>
	 				<thead>
	                   <tr>
	                      <th>用户名称</th>      
	                      <th>用户代码</th>
	                      <th>移动电话</th>
	                      <th>职务</th>               
	                    </tr>
	                  </thead>
	                  <tbody>
	                  </tbody>
				</table>
			</div>
		 </div>
 		 <div class="col-md-6 md_index">
 		 	<div class="index_table_wraper" id="biz_auth_wraper">
	 		 	<table class="table table-hover table-bordered md_index_table" id="biz_auth_table">
	 				<caption>数据授权<span><a href="BizAuth!index.do"  style="cursor:pointer;">更多>></a></span></caption>
	 				<thead>
	                   <tr>
	                      <th>控制点</th>      
	                      <th>维度</th>
	                      <th>范围</th>
	                    </tr>
	                  </thead>
	                  <tbody>
	                  </tbody>
				</table>
			</div>
		 </div>
	  </div>
	   <div class="row">
	   	<div class="col-md-6 md_index">
	   		<div class="index_table_wraper" id="ct_wraper">
		   		<table class="table table-hover table-bordered md_index_table" id="ct_list_table">
	 				<caption>流程模板查询<span><a href="Ct!index.do"  style="cursor:pointer;">更多>></a></span></caption>
	 				<thead>
	                   <tr>
	                      <th>名称</th>      
	                      <th>编码 </th>
	                      <th>版本号</th>
	                      <th>流程类型</th>
	                      <th>业务对象</th>
	                      <th>状态</th>
	                      <th>默认</th>	                     
	                    </tr>
	                  </thead>
	                  <tbody>
	                  </tbody>
				</table>
			</div>
		</div>
  		<div class="col-md-6 md_index">
  			<div class="index_table_wraper" id="todo_fi_wraper">
	  			<table class="table table-hover table-bordered md_index_table" id="todo_fi_table">
	 				<caption>流程实例查询<span><a href="TodoFi!allFiList.do"  style="cursor:pointer;">更多>></a></span></caption>
	 				<thead>
	                   <tr>
	                      <th>标题 </th>      
	                      <th>流程类别</th>
	                      <th>编号</th>
	                      <th>机构</th>
	                      <th>申请人</th>
	                      <th>申请时间</th>
	                    </tr>
	                  </thead>
	                  <tbody>
	                  </tbody>
				</table>
			</div>
  		</div>
	  </div>
	</div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script type="text/javascript" src="js/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script type="text/javascript" src="css/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="page/App/App-smIndex.js?t=<%=System.currentTimeMillis()%>"></script>
  </body>
</html>
