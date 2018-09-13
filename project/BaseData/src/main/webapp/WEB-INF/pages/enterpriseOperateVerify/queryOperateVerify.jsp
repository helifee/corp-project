<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>运营审核查询</title>

    <link href="${www_url}/static/css/base.initial.css" rel="stylesheet">
    <link href="${www_url}/static/css/base.common.css" rel="stylesheet">
    <link href="${www_url}/static/css/enterprise-infomation.css" rel="stylesheet">
    <link href="${www_url}/static/css/datepicker3.css" rel="stylesheet">
</head>
<body>

	<div class="site-main clearfix " >
        <div class="site-main-inner clearfix">
            <div class="site-main-filter clearfix">
                <div class="hd">
                    <h1>企业信息</h1>
                </div>
                <form id="operateVerifyForm" method="post">
                <div class="md clearfix">
                        <ul class="clearfix">
                            <li>
								<div class="site-main-filter-box  project-xlg" >
                                    <label>企业编号</label>
                                    <input class="text" type="text" name="queryEid">
                                </div>
                                <div class="site-main-filter-box  project-xlg" >
                                    <label>企业名称</label>
                                    <input class="text" type="text" name="queryEname">
                                </div>
                                <div class="site-main-filter-box  project-primary">
                                    <label>操作类型</label>
                                    <select name="select" class="select" id="opeType">
                                        <option selected="selected">全部</option>
                                        <c:forEach var="opeType" items="${operateTypeEnum}">
                                        	<option value="${opeType.value}">${opeType.name}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div class="site-main-filter-box  project-small" id="event_period">
                                    <label>到期时间</label>
                                    <input class="text" type="text" id="eDueStartDate">
                                    <span class="interval">至</span>
                                    <input class="text" type="text" id="eDueEndDate">
                                </div>
                            </li>
                        </ul>
                </div>
                </form>
                <div class="bd">
                    <a id="querySumbit" href="#" class="btn btn-primary btn-xs mr10 w60">查询</a>
                    <a href="#" class="btn btn-default btn-xs w60">导出</a>
                </div>
                
            </div>
            <div class="site-main-list-block clearfix" >
                <div class="main" >
                    <table class="table table-bordered clearfix" width="100%">
                          <thead>
                            <tr>
                              <th scope="col">企业编号</th>
                              <th scope="col">企业名称</th>
                              <th scope="col">企业状态</th>
                              <th scope="col">审核状态</th>
                              <th scope="col">到期时间</th>
                              <th scope="col">操作</th>
                            </tr>
                          </thead>
                          <tbody id="showDatas">
                          	<!-- 列表数据 以json数据 渲染 填充 -->
                          </tbody>
                    </table>
                </div>
                <div class="pager clearfix " id="pageDatas">
                		<!-- 分页数据 渲染 -->
                		
                        <!-- 
                        <ul class="pagination">
                            <li class="previous"><a href="#"><i></i></a></li>
                            <li class="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li class="next"><a href="#"><i></i></a></li>
                         </ul> 
                         -->
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade business-management-model" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="business-management-model-detail">
      <div class="modal-dialog modal-lg">
        <div class="modal-content business-managementlogin-form-area">
                <div class="modal-header">
                  <ul class="business-management-tab-head clearfix">
                      <li class="active"><p>基本信息</p><i></i></li>
                      <li><p>经营信息</p><i></i></li>
                      <li><p>联系人信息</p><i></i></li>
                      <li><p>产品选择</p></li>
                  </ul>
                </div>
                <form>
                <input type="hidden" id="eid">
                <div class="modal-body business-management-tab-content">

                        <div class="basic-information">
                            <ul class="clearfix">
                                <li class="clearfix">
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>企业名称</label>
                                        <input class="text" type="text" id="ename1">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>企业简称</label>
                                        <input class="text" type="text" name="eshortname">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>组织机构代码证号</label>
                                        <input class="text" type="text" name="orgInstdId">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>开户许可证核准号 </label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>ICP证编号 </label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>企业类型</label>
                                        <input class="text" type="text">
                                    </div>   
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>内/外部企业</label>
                                        <input class="text" type="text" name="etype">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>营业执照注册号</label>
                                        <input class="text" type="text" name="elicenseId">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>税务登记证号</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-small" id="event_period">
                                        <label><i>*</i>企业到期时间</label>
                                        <input class="text" type="text">
                                        <span class="interval">至</span>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>税务登记证号</label>
                                        <textarea class="textarea" rows="2"></textarea>
                                    </div>
                                </li>
                            </ul>
                            <div class="line-dashed-l"></div>
                            <ul class="clearfix">
                                <li class="clearfix">
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>法人代表名</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>法定代表人证件类型</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>法定代表人证件号码</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-small" id="event_period">
                                        <label><i>*</i>营业期限</label>
                                        <input class="text" type="text">
                                        <span class="interval">至</span>
                                        <input class="text" type="text">
                                    </div>
   
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>注册资本</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-small" id="event_period">
                                        <label><i>*</i>成立日期</label>
                                        <input class="text" type="text">
                                        <span class="interval">至</span>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>住所</label>
                                        <input class="text" type="text">
                                    </div>
                                </li>
                            </ul>
                            <div class="line-dashed-xl"></div>
                            
                        </div>

                        <div class="run-information">
                                <ul class="clearfix">
                                    <li class="clearfix">
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>企业名称</label>
                                            <input class="text" type="text" id="ename2">
                                            <!-- <em class="error">名称错误</em> -->
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>具体地址</label>
                                            <input class="text" type="text" name="detailAddr">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>营业地段</label>
                                            <input class="text" type="text">
                                        </div> 
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>行业大类</label>
                                            <select name="select" class="select">
                                                <option>请选择</option>
                                                <option>类型一</option>
                                                <option>类型二</option>
                                            </select>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>行业细分</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>网站地址</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>企业电话</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>信用级别</label>
                                            <input class="text" type="text">
                                        </div>   
                                    </li>
                                    <li>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>节假日营业</label>
                                            <input class="text" type="text" name="holidayBiz">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>员工人数</label>
                                            <input class="text" type="text" name="employeeNo">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>企业行业描述</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>经营范围（主业）</label>
                                            <textarea class="textarea" rows="2"></textarea>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>经营范围（副业）</label>
                                            <textarea class="textarea" rows="2"></textarea>
                                        </div>
                                    </li>
                                </ul>
                                <div class="line-dashed-xl"></div>
                        </div>
                        <div class="contacts-information clearfix">
                            <ul class="clearfix" id="esContact1"  style="display: none">
                                <div class="title">联系人（1） </div>
                                <li>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>类型</label>
                                       <input class="text" type="text">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>姓名</label>
                                       <input class="text" type="text" name="contactorNm1">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>邮箱</label>
                                       <input class="text" type="text">
                                   </div>  
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>手机</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>座机</label>
                                        <input class="text" type="text">
                                    </div>  
                                    <div class="site-main-filter-box  project-lg">
                                        <label>传真</label>
                                        <input class="text" type="text">
                                    </div>    
                                </li>
                            </ul>
                            <ul class="clearfix" id="esContact2"  style="display: none">
                                <div class="title">联系人（2 ） </div>
                                <li>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>类型</label>
                                       <input class="text" type="text">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>姓名</label>
                                       <input class="text" type="text">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>邮箱</label>
                                       <input class="text" type="text">
                                   </div>  
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>手机</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>座机</label>
                                        <input class="text" type="text">
                                    </div>  
                                    <div class="site-main-filter-box  project-lg">
                                        <label>传真</label>
                                        <input class="text" type="text">
                                    </div>    
                                </li>
                            </ul>  
                            <ul class="clearfix" id="esContact3"  style="display: none;">
                                <div class="title">联系人（3 ） </div>
                                <li>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>类型</label>
                                       <input class="text" type="text">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>姓名</label>
                                       <input class="text" type="text">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>邮箱</label>
                                       <input class="text" type="text">
                                   </div>  
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>手机</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>座机</label>
                                        <input class="text" type="text">
                                    </div>  
                                    <div class="site-main-filter-box  project-lg">
                                        <label>传真</label>
                                        <input class="text" type="text">
                                    </div>    
                                </li>
                            </ul>  
                            <ul class="clearfix" id="esContact4"  style="display: none;">
                                <div class="title">联系人（4 ） </div>
                                <li>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>类型</label>
                                       <input class="text" type="text">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>姓名</label>
                                       <input class="text" type="text">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>邮箱</label>
                                       <input class="text" type="text">
                                   </div>  
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>手机</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>座机</label>
                                        <input class="text" type="text">
                                    </div>  
                                    <div class="site-main-filter-box  project-lg">
                                        <label>传真</label>
                                        <input class="text" type="text">
                                    </div>    
                                </li>
                            </ul>  
                        </div>
                        <div class="product-selection">
                            <div class="hd"><i>*</i>产品选择设置</div>
                            <ul class="clearfix">
                                <li><input type="checkbox" class="checkbox">企业付款</li>
                                <li><input type="checkbox" class="checkbox">代发工资</li>
                                <li><input type="checkbox" class="checkbox">企业报销</li>
                                <li><input type="checkbox" class="checkbox">资金划拨</li>
                            </ul>
                            <div class="line-dashed-xxl"></div>
                        </div>
                </div>
                </form>
                <div class="modal-footer">
                    <div class="modal-approval-box clearfix">
                        <div class="title">意见审核</div>
                        <textarea class="textarea" rows="3" id="comment"></textarea>
                    </div>
                    <button onclick="javascript:verify('1')" type="button" class="btn btn-primary btn-xs mr10 w80">审核通过</button>
                    <button onclick="javascript:verify('2')" type="button" class="btn btn-primary btn-xs mr10 w80">审核拒绝</button>
                    <button type="button" class="btn btn-default btn-xs mr10 w80" data-dismiss="modal">取消</button>
                </div>
              </div>
      </div>
    </div>

<script src="${www_url}/static/javascript/jquery-1.11.2.min.js"></script>
<script src="${www_url}/static/javascript/common.js"></script>
<script src="${www_url}/static/javascript/Management-Tab.js"></script>
<script src="${www_url}/static/javascript/datepicker.js"></script>
<script src="${www_url}/static/javascript/datepicker.zh-CN.min.js"></script>
<script type="text/javascript">
(function(){
    $('#event_period input').datepicker({
        language: "zh-CN"
    });

})();
</script>

<script type="text/javascript">
	var PAGE_SIZE = 20;			// 每页显示多少条

    $(function(){
    
    $("#table-btn-group").each(function(){
        $(this).find(".table-dropdown-toggle").mouseenter(function(){
            $(this).find(".table-dropdown-menu").fadeIn("fast");
        });
        $(this).find(".table-dropdown-toggle").mouseleave(function(){
            $(this).find(".table-dropdown-menu").fadeOut("fast");
        });
    });
    
    // 初始列表数据
    $.ajax({
		url:"${www_url}/operateVerify/queryOperateVerifyDatas",
		type:"POST",
		//async:false,
		data:{
		},
		success:function(data){
			// 列表渲染数据
			render(data.datas);
			
			// 分页 渲染  id="pageDatas"
			/* 
			var totalPages = data.totalPages;						// 总页数
			var currentPageNO = data.currentPageNO;					// 当前页码
			var firstResult  = (currentPageNO-1) * PAGE_SIZE;		// 从第几条记录开始查询
			var pageStr = "<ul class='pagination'>"
						 + "<li class='previous'><a href='#'><i></i></a></li>";
			for(var i=0; i=1; i++){
				
			} 
			*/
			
			
		}
	});
    
});
    
    
    
$("#querySumbit").click(function(){
	
	var opeType = $("#opeType").val();
	if(opeType == "-1"){
		opeType = null;
	}
	
	//ajax提交数据 
    $.ajax({
		url:"${www_url}/operateVerify/queryOperateVerifyDatas",
		type:"POST",
		async:false,
		data:{
			eId:$("input[name='queryEid']").val(),						// 企业编号
			eName:$("input[name='queryEname']").val(),					// 企业名称
			opeType:null,										// 操作类型
			//joinStartDate:,										// 入网开始日期	格式 yyyy-MM-dd
			//joinEndDate:,											// 入网结束日期	格式 yyyy-MM-dd
			eDueStartDate:$("#eDueStartDate").val(),				// 到期开始日期	格式 yyyy-MM-dd
			eDueEndDate:$("#eDueEndDate").val()						// 到期结束日期	格式 yyyy-MM-dd
		},
		success:function(data){
			// 列表渲染数据
			render(data.datas);
		}
	});
	
	
});

// 列表渲染 
function render(datas){
	if(datas.length > 0){
		var result = "";
		$.each(datas,function(index,json){
			var edueDate = "";
			if(json.edueDate !=null && json.edueDate !=""){
				var date = new Date(json.edueDate);
				edueDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate());
			}
			// tr奇数行/偶数行 样式渲染
			var firstTr = "<tr class='color-odd'>";
			if(index % 2 ==0){
				firstTr = "<tr>";
			}
			result +=  firstTr  
				 + "<td>"+ json.eid +"</td>"
				 + "<td>"+ json.ename+"</td>"
				 + "<td>"+ json.estatus+"</td>"
				 + "<td>"+ json.chkStatus+"</td>"
				 + "<td>"+ edueDate+"</td>"
				 + "<td><a href='javascript:void(0)' onclick='javascript:getEsEnterpriseInfoChktempByEid("+ json.eid +")' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#business-management-model-detail'>审核</a></td>"
				 + "</tr>";
			$("#showDatas").html(result);
        });
		
	}else{
		$("#showDatas").html("<tr><td colspan='6'>没有符合条件的数据！</td></tr>");
	}
}

 // 审核时加载数据
 function getEsEnterpriseInfoChktempByEid(eid){
   $.ajax({
		url:"${www_url}/operateVerify/getEsEnterpriseInfoChktempByEid",
		//type:"POST",
		async:false,
		data:{
			eid:eid						// 企业编号
		},
		success:function(data){
			$('#business-management-model-detail').on('show.bs.modal', function (e) {
				// 设置隐藏域的值
				$("#eid").val(data.chktemp.eid);
				//    1. 基本信息 
				$("#ename1").val(data.chktemp.ename);									// 企业名称
				$("input[name='etype']").val(data.etype);								// 企业分类(内/外部企业)
				$("input[name='eshortname']").val(data.chktemp.eshortname);				// 企业简称
				$("input[name='elicenseId']").val(data.chktemp.elicenseId);				// 营业执照注册号
				
				// ...
				
				//   2. 经营信息
				$("#ename2").val(data.chktemp.ename);									// 企业名称
				$("input[name='holidayBiz']").val(data.chktemp.holidayBiz);				// 节假日营业
				$("input[name='detailAddr']").val(data.chktemp.detailAddr);				// 具体地址
				$("input[name='employeeNo']").val(data.chktemp.employeeNo);				// 员工人数
				
				//   3. 联系人信息
				console.log(data.contactInfoChktemps);
				var contactInfo = data.contactInfoChktemps;
				var len = contactInfo.length;
				for(var i=0;i<len;i++){
					var index = i+1;
					$("#esContact"+index).show();
					$("input[name='contactorNm"+ index +"']").val(contactInfo[i].contactorNm);	// 姓名
					// 渲染表单元素
				}
			});
			//$('#business-management-model-detail').modal('hideen');
		}
	}); 
	   
}
 
 // 审核操作，审核通过(1)/审核拒绝(2)
 function verify(verifyStatus){
	  $.ajax({
			url:"${www_url}/operateVerify/verify",
			type:'POST',
			//dataType:'json',
			async:false,
			data:{
				eid:$("#eid").val(),					// 企业编号
				verifyStatus:verifyStatus,				// 审核状态
				comment:$("#comment").val()				// 审核意见
			},
			success:function(data){
				if(data){
					$("#comment").val("");				// 清除审核意见 
					$('#business-management-model-detail').modal('hide');// 关闭窗口
					// 列表渲染数据
					render(data.datas);
				}else{
					alert("审核失败!");
				}
			}
		}); 
 }


</script>
</body>
</html>