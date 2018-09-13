/**
 * 查询业务单据列表，返回page对象
 */
var global={};
global.sysId = "";
//global.accountSetId = ;
var accountSetId = "";
var accountSetCode = "";
var companyCode = "";
var compName = "";
var compId = "";
var type = "";
var paymentOrganId = "";
var proBranchId = "";
var proName = "";

function loadBill(){
	var selectType = $('#rdioType input[name="type"]:checked ').val();
	var t = $('#bill_type').combotree('tree');	// 获取树对象
	var n = t.tree('getSelected');
	var authBegain = $('#auditDateBegin').datetimebox('getValue');
	var authEnd = $('#auditDateEnd').datetimebox('getValue');
	window.parent.setBeginDate(authBegain);
	window.parent.setEndDate(authEnd);
	var ownerSys = $('#ownerSys').val();
	//global.sysId = ownerSys;
	if(n != null){
		typeid = n.id;
		//alert(typeid);
		$.ajax({  
	        url:"FiVoucherTempType!getBtypeByTempTypeId.do",  
	        data:{typeid:typeid,sysId:global.sysId},  
	        type:"post",  
	        success:function(data){  
	           if(data.success){
	              type = data.btype;
	              $('#dg').datagrid('options').queryParams = {
	          		billtype:type,
	          		companyCode:companyCode,
	          		type:selectType,
	          		compName:compName,
	          		compId:compId,
	          		typeid:typeid,
	          		accountSetId:accountSetId,
	          		sysId:global.sysId,
	          		auditDateBegin:authBegain,
	          		auditDateEnd:authEnd,
	          		paymentOrganId:paymentOrganId,
	          		proBranchId:proBranchId,
	          		accountSetCode:accountSetCode
	          	  };
	          	
	          	if(type == '日常报销'){
	          	   initGridRcbx();
	          	}
	          	else if(type == '领借款'){
	          		initGridLjk();
	          	}
	          	else if(type == '领借款还款'){
	          		initGridHk();
	          	}
	          	else if(type == '收款单' || type == '退款单' || type == '结转单' || type == '换票单' || type == '放款单' || type == '收结转'){
	          		initGridSK();
	          	}else if(type == '合同付款' && global.sysId==3){//成本与费用
	          		initGridHtfk();
	          	}else if(type == '付款记录' && global.sysId==2){//成本与费用
	          		initGridDdsfpCB();
	          	}
	          	else if(type == '单独收发票' && global.sysId==2 ){//成本与费用
	          		initGridDdsfpCB();
	          	}else if(type == '工程投入' && global.sysId==2 ){//成本与费用
	          		initGridDdsfpCB();
	          	}else if(type == '事项请示'){
	          		initGridLjk();
	          	}else{
	          		initGridHtfkCB();
	          	}
	           }else{
	        	   alert("无法匹配到业务对象");
	           }
	        }  
	   });
	}
   
	
};

$(function(){
	//initGridRcbx();
})
function loadTree(){
	/*var url=contextPath+"/FiVoucherTempType!loadTree.do?accountSetCode="+global.accountSetCode+"&sysId="+global.sysId+"&accountSetId="+global.accountSetId+"&companyId="+compId;
	alert(url);
	$("#bill_type").tree({
		url:url,
		onLoadSuccess:function(node){
			//if($("#tree1").tree("isLeaf",node.target)){
				$("#bmid").val(node.id);
				$("#bmid_name").text(node.text);
			//}
		}
	});
	$("#bill_type").combotree({url:url});
	$('#bill_type').treegrid('reload');*/
	window.parent.setCompanyId(compId);
	$("#bill_type").combotree({
		url: "FiVoucherTempType!loadTree.do?accountSetCode="+accountSetCode+"&accountSetId="+accountSetId+"&sysId="+global.sysId+"&companyId="+compId,
		valueField: 'id',
		textField: 'text',
		panelHeight: 100,
		onLoadSuccess:function(n,d){
			$('#bill_type').combotree('setValue', window.parent.typeId);
		},
	    onSelect:function (n) {
			$("#billTypeName").val(n.id);
			window.parent.setStandardRole(n.id);
		}
	});
}
/**
 * 日常报销列表
 * @param typeid
 */
function initGridRcbx(){
	var url="/FiVoucher!loadBill.do?accountSetId="+accountSetId;
	$('#dg').datagrid({
		    loadMsg:'加载数据中......',
	        url: url,
	        toolbar: '#aa',
	        columns: [[{
	            field : 'ck',
	            checkbox:true
	            },
	            {
	                field: 'id',
	                title: 'id',
	                width: 40,
	                align: 'center'
	            },
	            {
	                field: 'vtheme',
	                title: '主题',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'vapplynum',
	                title: '票据编号',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'vapplicant',
	                title: '申请人',
	                width: 60
	            },
	            {
	                field: 'deptname',
	                title: '部门',
	                width: 80
	            },
	            {
	                field: 'vpayunit',
	                title: '付款单位',
	                width: 120
	            },
	            {
	                field: 'vbelongproject',
	                title: '所属项目',
	                width: 120
	            },
	            {
	                field: 'vskunit',
	                title: '收款单位',
	                width: 80

	            },
	            {
	                field: 'vpaytype',
	                title: '支付方式',
	                width: 40
	            },
	            {
	                field: 'nexpensemny',
	                title: '报销金额',
	                width: 60

	            },
	            {
	                field: 'nchmny',
	                title: '冲账金额',
	                width: 60

	            },
	            {
	                field: 'npaymny',
	                title: '应付金额',
	                width: 60

	            },
	            {
	                field: 'paybankname',
	                title: '付款银行',
	                width: 60

	            },
	            {
	                field: 'payaccountcode',
	                title: '付款账号',
	                width: 60

	            }
	        ]],
	        onDblClickCell: function (index, field, value) {
         		$(this).datagrid('beginEdit', index);
         		var ed = $(this).datagrid('getEditor', {index:index,field:field});
         		$(ed.target).focus();
            },
	        onLoadSuccess:function(data){   
	        	$('#dg').datagrid('doCellTip',{cls:{'background-color':'#CCCCCC'},delay:1000});   
		    },
	        fit: true,
	        border: false,
	        //pageSize:9999,
	        pageList:[100,200,300,500],
	        pagination: true,
	        singleSelect: false,
	        onDblClickRow:showBillInfo,
	        rownumber: true
	    });

	    var p = $('#dg').datagrid('getPager');
	    $(p).pagination({
	    	//pageSize:15,
	        beforePageText: '第',
	        afterPageText: '共{pages}页',
	        displayMsg: '显示{from}到{to},共{total}记录'
	    });
}

/**
 * 双击相关单据是打开单据详细页
 */
function showBillInfo(rowIndex, rowData){
	
	var rcbx_detail_url = "/ex/expensexecute/dayexpense/dayexpense!todayEdit.do";
	var htfk_detail_url = "/ex/expensexecute/conpayapply/conpayapply!editPage.do";
	var ljk_detail_url = "/ex/expensexecute/borrowmon/$%7BpageContext.request.contextPath%7D/expensexecute/borrowmon/borrowmon!editdblShenpi.do";
	//var ljkhk_detail_url = "http://127.0.0.1:100/ex/expensexecute/payregister/$%7BpageContext.request.contextPath%7D/expensexecute/payregister/payregister!loginfk.do?payregist={"biscanedit":0,"bisoverrule":0,"condmap":null,"corpid":10,"corpname":"","dapplydate":"2016-04-22","dapprovedate":"","deptid":58,"deptname":"","dimportdate":"","dpaydate":"","dr":0,"id":6125,"importstatus":0,"napplymny":1000,"npaymny":0,"operatorid":0,"payformid":"","paystatus":2,"reverse1":"","reverse10":0,"reverse11":"","reverse12":"","reverse13":"","reverse2":"","reverse3":"","reverse4":"","reverse5":"","reverse6":0,"reverse7":0,"reverse8":0,"reverse9":0,"selected":false,"sourceid":5988,"ts":"","userValue":null,"vapprovecode":"","vapproveid":0,"vapprovenote":"","vapprovestatus":"","vbusinesscode":"JTBB-XXLC-2016-4-0083","vbusinesstype":"日常报销","vcategory":"","vendstatus":0,"voperator":"ç³»ç»ç®¡çå","vsourcetype":"","vtheme":"rrrr"}&";
	
	var sa_url = "sa/feebusiness/szgl/szgl_djcx!toDetail.do?id=";
	var bill_id = rowData.id;
	var corp_id = rowData.corpid;
	var dept_id = rowData.deptid;
	var t = $('#bill_type').combotree('tree');	// 获取树对象
	var n = t.tree('getSelected');
	var type = n.text;
	var hostn = window.location.host;
	if(type == "日常报销"){
		window.open("http://"+hostn+rcbx_detail_url+"?id="+bill_id+"&corpid="+corp_id+"&deptid="+dept_id);
	}
	if(type == "合同付款"){
		window.open("http://"+hostn+htfk_detail_url+"?id="+bill_id+"&corpid="+corp_id);
	}
	if(type == "领借款"){
		window.open("http://"+hostn+ljk_detail_url+"?borrowid="+bill_id+"&corpid="+corp_id);
	}
	
	if(type=="收款单" || type=="退款单" || type=="结转单" || type=="换票单"){
		window.open("http://"+hostn+"/"+sa_url+bill_id);
	}
}

/**
 * 合同付款
 */

function initGridHtfk(){
	var url=contextPath+"/FiVoucher!loadBill.do?accountSetId="+accountSetId;
	$('#dg').datagrid({
		    loadMsg:'加载数据中......',
	        url: url,
	        toolbar: '#aa',
	        columns: [[{
	            field : 'ck',
	            checkbox:true
	            },
	            {
	                field: 'id',
	                title: 'id',
	                width: 40,
	                align: 'center'
	            },
	            /*{
	                field: 'mergeNum',
	                title: '单据合并号',
	                width: 120,
	                align: 'center',
	                editor: {
	                    type: 'text'
	                }
	            },*/
	            {
	                field: 'vcontname',
	                title: '合同名称',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'vapplynum',
	                title: '编号',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'vapplicant',
	                title: '申请人',
	                width: 60
	            },
	            {
	                field: 'deptname',
	                title: '部门',
	                width: 150
	            },
	            {
	                field: 'vpayunit',
	                title: '付款单位',
	                width: 200
	            },
	            {
	                field: 'vpayapptype',
	                title: '付款审批类型',
	                width: 200
	            },
	            {
	                field: 'vbelongproject',
	                title: '所属项目',
	                width: 120
	            },
	            {
	                field: 'vgetunit',
	                title: '收款单位',
	                width: 200

	            },
	            {
	                field: 'vpaytype',
	                title: '支付方式',
	                width: 40
	            },
	            {
	                field: 'napplymny',
	                title: '申请金额',
	                width: 60

	            },
	            {
	                field: 'nrushmny',
	                title: '冲账金额',
	                width: 60

	            },
	            {
	                field: 'npaymny',
	                title: '应付金额',
	                width: 60
	            },
	            {
	                field: 'paybankname',
	                title: '付款银行',
	                width: 60

	            },
	            {
	                field: 'payaccountcode',
	                title: '付款账号',
	                width: 60

	            }
	        ]],
	        onDblClickCell: function (index, field, value) {
         		$(this).datagrid('beginEdit', index);
         		var ed = $(this).datagrid('getEditor', {index:index,field:field});
         		$(ed.target).focus();
            },
	        onLoadSuccess:function(data){   
	        	$('#dg').datagrid('doCellTip',{cls:{'background-color':'#CCCCCC'},delay:1000});   
		    },
	        fit: true,
	        border: false,
	        //pageSize:9999,
	        pageList:[100,200,300,500],
	        pagination: true,
	        singleSelect: false,
	        rownumber: true
	    });

	    var p = $('#dg').datagrid('getPager');
	    $(p).pagination({
	        beforePageText: '第',
	        afterPageText: '共{pages}页',
	        displayMsg: '显示{from}到{to},共{total}记录'
	    });
}

/**
 * 合同付款
 */

function initGridHtfkCB(){
	var url=contextPath+"/FiVoucher!loadBill.do?accountSetId="+accountSetId;
	$('#dg').datagrid({
		    loadMsg:'加载数据中......',
	        url: url,
	        toolbar: '#aa',
	        columns: [[{
	            field : 'ck',
	            checkbox:true
	            },
	            {
	                field: 'id',
	                title: 'id',
	                width: 40,
	                align: 'center'
	            },
	            {
	                field: 'appNmae',
	                title: '主题',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'contractName',
	                title: '合同名称',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'contractCode',
	                title: '编号',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'partyBOrgn_Name',
	                title: '供应商',
	                width: 200
	            },
	            {
	                field: 'payment_Orgn',
	                title: '付款单位',
	                width: 150
	            },
	            {
	                field: 'receive_Orgn',
	                title: '收款单位',
	                width: 200
	            },
	            {
	                field: 'apply_Orgn',
	                title: '申请部门',
	                width: 200
	            },
	            {
	                field: 'project_use_amount',
	                title: '项目部使用金额',
	                width: 120
	            },
	            {
	                field: 'sales_use_amount',
	                title: '售楼处使用金额',
	                width: 200

	            },
	            {
	                field: 'builder_use_amount',
	                title: '施工方使用金额',
	                width: 100
	            },
	            {
	                field: 'company_use_amount',
	                title: '公司使用金额',
	                width: 100

	            },
	            {
	                field: 'deduct_amount',
	                title: '本次代扣金额',
	                width: 60

	            },
	            {
	                field: 'fine_amount',
	                title: '本次罚款金额',
	                width: 60
	            }
	        ]],
	        onDblClickCell: function (index, field, value) {
         		$(this).datagrid('beginEdit', index);
         		var ed = $(this).datagrid('getEditor', {index:index,field:field});
         		$(ed.target).focus();
            },
	        onLoadSuccess:function(data){   
	        	$('#dg').datagrid('doCellTip',{cls:{'background-color':'#CCCCCC'},delay:1000});   
		    },
	        fit: true,
	        border: false,
	        //pageSize:9999,
	        pageList:[100,200,300,500],
	        pagination: true,
	        singleSelect: false,
	        rownumber: true
	    });

	    var p = $('#dg').datagrid('getPager');
	    $(p).pagination({
	        beforePageText: '第',
	        afterPageText: '共{pages}页',
	        displayMsg: '显示{from}到{to},共{total}记录'
	    });
}

/**
 * 领借款
 */
function initGridLjk(){
	var url=contextPath+"/FiVoucher!loadBill.do?accountSetId="+accountSetId;
	$('#dg').datagrid({
		    loadMsg:'加载数据中......',
	        url: url,
	        toolbar: '#aa',
	        columns: [[{
	            field : 'ck',
	            checkbox:true
	            },
	            {
	                field: 'id',
	                title: 'id',
	                width: 40,
	                align: 'center'
	            },
	            {
	                field: 'vtheme',
	                title: '票据编号',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'vborrowcode',
	                title: '票据编号',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'vapplicant',
	                title: '申请人',
	                width: 60
	            },
	            {
	                field: 'deptname',
	                title: '部门',
	                width: 100
	            },
	            {
	                field: 'vpayunit',
	                title: '付款单位',
	                width: 160
	            },
	            {
	                field: 'vbelongproject',
	                title: '所属项目',
	                width: 120
	            },
	            {
	                field: 'vreceiveunit',
	                title: '收款单位',
	                width: 80

	            },
	            {
	                field: 'vpaytype',
	                title: '支付方式',
	                width: 60
	            },
	            {
	                field: 'paybankname',
	                title: '付款银行',
	                width: 60

	            },
	            {
	                field: 'payaccountcode',
	                title: '付款账号',
	                width: 60

	            },
	            {
	                field: 'nborrowmny',
	                title: '领借金额',
	                width: 60

	            },
	            {
	                field: 'vborrowattr',
	                title: '领借属性',
	                width: 100

	            }
	        ]],
	        onDblClickCell: function (index, field, value) {
         		$(this).datagrid('beginEdit', index);
         		var ed = $(this).datagrid('getEditor', {index:index,field:field});
         		$(ed.target).focus();
            },
	        onLoadSuccess:function(data){   
	        	$('#dg').datagrid('doCellTip',{cls:{'background-color':'#CCCCCC'},delay:1000});   
		    },
	        fit: true,
	        border: false,
	        pagination: true,
	        //pageSize:9999,
	        pageList:[100,200,300,500],
	        singleSelect: false,
	        rownumber: true
	    });

	    var p = $('#dg').datagrid('getPager');
	    $(p).pagination({
	        beforePageText: '第',
	        afterPageText: '共{pages}页',
	        displayMsg: '显示{from}到{to},共{total}记录'
	    });
}


/*
 * 销售====收款
 */

function initGridSK(){
	
	var url=contextPath+"/FiVoucher!loadBill.do?accountSetId="+accountSetId;
	$('#dg').datagrid({
		    loadMsg:'加载数据中......',
	        url: url,
	        toolbar: '#aa',
	        columns: [[{
	            field : 'ck',
	            checkbox:true
	            },
	            {
	                field: 'id',
	                title: 'id',
	                width: 60,
	                align: 'center'
	            },
	            {
	                field: 'houseno',
	                title: '房间名称',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'dmakebilldate',
	                title: '票据日期',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'vbilltype',
	                title: '单据类型',
	                width: 120
	            },
	            {
	                field: 'vpjtype',
	                title: '票据类型',
	                width: 100
	            },
	            {
	                field: 'vpjno',
	                title: '票据号',
	                width: 160
	            },
	            {
	                field: 'nskmny',
	                title: '金额',
	                width: 120
	            },
	            {
	                field: 'vjkrname',
	                title: '交款人',
	                width: 120
	            },
	            {
	                field: 'kprname',
	                title: '开票人',
	                width: 120
	            },
	            {
	                field: 'vapproveid',
	                title: '审核人',
	                width: 120
	            },
	            {
	                field: 'dapprovedate',
	                title: '审核日期',
	                width: 120
	            }	
	        ]],
	        onDblClickCell: function (index, field, value) {
         		$(this).datagrid('beginEdit', index);
         		var ed = $(this).datagrid('getEditor', {index:index,field:field});
         		$(ed.target).focus();
            },
	        onLoadSuccess:function(data){   
	        	$('#dg').datagrid('doCellTip',{cls:{'background-color':'#CCCCCC'},delay:1000});   
		    },
	        fit: true,
	        border: false,
	        pagination: true,
	        //pageSize:15,
	        pageList:[100,200,300,500],
	        singleSelect: false,
	        rownumber: true
	    });

	    var p = $('#dg').datagrid('getPager');
	    $(p).pagination({
	        beforePageText: '第',
	        afterPageText: '共{pages}页',
	        displayMsg: '显示{from}到{to},共{total}记录'
	    });
	
	
}

/**
 * 还款
 */
function initGridHk(){
	var url=contextPath+"/FiVoucher!loadBill.do?accountSetId="+accountSetId;
	$('#dg').datagrid({
		    loadMsg:'加载数据中......',
	        url: url,
	        toolbar: '#aa',
	        columns: [[{
	            field : 'ck',
	            	checkbox:true
	            },
	            {
	                field: 'vrepaycode',
	                title: '还款编号',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'nrushmny',
	                title: '冲账金额',
	                width: 100,
	                align: 'center'
	            },
	            {
	                field: 'vrepayperson',
	                title: '还款人',
	                width: 100
	            },
	            {
	                field: 'drepaydate',
	                title: '还款日期',
	                width: 100
	            },
	            {
	                field: 'vborrowcode',
	                title: '借款编号',
	                width: 150,
	                align: 'center'
	            },
	            {
	                field: 'npaymny',
	                title: '支付金额',
	                width: 100
	            },
	            {
	                field: 'vapplicant',
	                title: '申请人',
	                width: 100
	            }
	        ]],
	        onDblClickCell: function (index, field, value) {
         		$(this).datagrid('beginEdit', index);
         		var ed = $(this).datagrid('getEditor', {index:index,field:field});
         		$(ed.target).focus();
            },
	        fit: true,
	        border: false,
	        pagination: true,
	        //pageSize:15,
	        pageList:[100,200,300,500],
	        singleSelect: false,
	        rownumber: true
	    });

	    var p = $('#dg').datagrid('getPager');
	    $(p).pagination({
	        beforePageText: '第',
	        afterPageText: '共{pages}页',
	        displayMsg: '显示{from}到{to},共{total}记录'
	    });
}

/**
 * 单独收发票
 */

function initGridDdsfpCB(){
	var url=contextPath+"/FiVoucher!loadBill.do?accountSetId="+accountSetId;
	$('#dg').datagrid({
		    loadMsg:'加载数据中......',
	        url: url,
	        toolbar: '#aa',
	        columns: [[{
	            field : 'ck',
	            checkbox:true
	            },
	            {
	                field: 'id',
	                title: 'id',
	                width: 40,
	                align: 'center'
	            },
	            {
	                field: 'contractName',
	                title: '主题',
	                width: 200,
	                align: 'center'
	            },
	            {
	                field: 'contractCode',
	                title: '编号',
	                width: 120,
	                align: 'center'
	            },
	            {
	                field: 'billType',
	                title: '业务类型',
	                width: 100
	            },
	            {
	                field: 'bill_Money',
	                title: '金额',
	                width: 80
	            },
	            {
	                field: 'bill_Id',
	                title: '发票编号',
	                width: 150
	            }
	            
	        ]],
	        onDblClickRow:showCoBillInfo,
	        onLoadSuccess:function(data){   
	        	$('#dg').datagrid('doCellTip',{cls:{'background-color':'#CCCCCC'},delay:1000});   
		    },
	        fit: true,
	        border: false,
	        //pageSize:9999,
	        pageList:[100,200,300,500],
	        pagination: true,
	        singleSelect: false,
	        rownumber: true
	    });

	    var p = $('#dg').datagrid('getPager');
	    $(p).pagination({
	        beforePageText: '第',
	        afterPageText: '共{pages}页',
	        displayMsg: '显示{from}到{to},共{total}记录'
	    });
}

function showCoBillInfo(rowIndex, rowData){
	//"web/PaymentInstead!edit.do?paymentApply.id=" // 合同付款
	//var co_url = "web/PaymentRegist!payRegistView.do?paymentRegist.id=";
	var coUrl = "";
	if(rowData.billType=='无文本合同'){
		coUrl = "web/NoContractPayment!edit.do?id=" ;
	}else if(rowData.billType=='补录开发费用'){
		coUrl = "web/DevelopCost!edit.do?paymentApply.id=" ;
	}else if(rowData.billType=='单独收发票'){
		coUrl = "web/Invoice!edit.do?invoice.id=" ;
	}else if(rowData.billType=='产值'){
		coUrl = "web/Production!edit.do?production.contractId="+rowData.contractId+"&production.id=" ;
	}else if(rowData.billType=='代付管理'){
		coUrl = "web/PaymentInstead!edit.do?paymentApply.id=";
	}else{
		coUrl = "web/ContractPayment!edit.do?paymentApply.id=";
	}
	window.open($("#contextPath").val()+coUrl+rowData.id);
}

function onSelectPageFunc(pageNumber, pageSize){
	 $("#pageNumber").val(pageNumber);
	 $("#pageSize").val(pageSize);
	 loadBill();
}

/**
 * 得到当前编辑的行号
 * @param target
 * @returns
 */
function getRowIndex(target){
	var tr = $(target).closest('tr.datagrid-row');
	//alert(tr.attr('datagrid-row-index'));
	return parseInt(tr.attr('datagrid-row-index'));
}


function createVouchar(flag){
	var rows=$('#dg').datagrid("getSelections");
	$('#dg').datagrid('endEdit', getRowIndex(rows));
	//var row = $("#dg").datagrid("getSelected");
	//得到当前所选行的索引
	var t = $('#bill_type').combotree('tree');	// 获取树对象
	var n = t.tree('getSelected');

	var type_id;
	if(n != null){
		type_id = n.id;
	}
	
	if(rows.length>0){
		$.messager.alert("信息", "正在生成请稍等。。。", "info");
		$('.panel-tool-close').hide();
		$('.messager-button').hide();
		var url=contextPath+"/FiVoucher!createVoucher.do?accountSetId="+accountSetId+"&typeId="+type_id+"&accountSetCode"+accountSetCode
			+"&companyId="+compId+"&btype="+encodeURI(encodeURI(type))+"&flag="+flag;
		var ids="";
		var mergeNums = "";
		for(var i=0;i<rows.length;++i){
			var index = $("#dg").datagrid("getRowIndex",rows[i]);
			$('#dg').datagrid('endEdit', index);
			
			ids+=rows[i].id+",";
			//ids+=rows[i].regId+",";//费用测试
			//alert(rows[i].mergeNum);
			/*if(rows[i].mergeNum == ''){
				mergeNums+= " "+",";
			}else{
				mergeNums+=rows[i].mergeNum+",";
			}*/
			
			//return false;
		}
		$.get(url,{ids:ids,mergeNums:mergeNums,billType:$("#billType").val(),sysId:global.sysId,accountSetCode:accountSetCode,companyId:compId},function(result){
			$(".messager-body").window('close');
			$('.panel-tool-close').show();
			if(result.success){
				$.messager.alert("信息","生成凭证成功!","info",function(){
					loadBill();
				});
			}else{
				$.messager.alert('信息',result.msg.join('<br>'),'error');
			}
		},'json');
	}else{
		$.messager.alert("信息","请选择至少一条数据操作!");
	}
	
}

function noCreateVouchar(){
	var rows=$('#dg').datagrid("getSelections");
	$('#dg').datagrid('endEdit', getRowIndex(rows));
	//var row = $("#dg").datagrid("getSelected");
	//得到当前所选行的索引
	var t = $('#bill_type').combotree('tree');	// 获取树对象
	var n = t.tree('getSelected');

	var type_id;
	if(n != null){
		type_id = n.id;
	}
	//alert(type_id);
	if(rows.length>0){
		var url=contextPath+"/FiVoucher!noCreateVoucher.do?accountSetId="+accountSetId+"&typeId="+type_id+"&accountSetCode"+accountSetCode
			+"&companyId="+compId+"&btype="+encodeURI(encodeURI(type));
		var ids="";
		var mergeNums = "";
		for(var i=0;i<rows.length;++i){
			var index = $("#dg").datagrid("getRowIndex",rows[i]);
			$('#dg').datagrid('endEdit', index);
			
			ids+=rows[i].id+",";
		}
		$.get(url,{ids:ids,mergeNums:mergeNums,billType:$("#billType").val(),sysId:global.sysId,accountSetCode:accountSetCode,companyId:compId},function(result){
			if(result.success){
				$.messager.alert("信息","操作成功!","info",function(){
					loadBill();
				});
			}else{
				$.messager.alert('信息',"操作失败!",'error');
			}
		},'json');
	}else{
		$.messager.alert("信息","请选择至少一条数据操作!");
	}
	
}


function dateFormatter(value,row,index){
	if(value && value.length){
		return value.substring(0,10);
	}else{
		return "";
	}
}


/**  
 * 扩展两个方法  
 */  
$.extend($.fn.datagrid.methods, {
    /**
     * 开打提示功能
     * @param {} jq
     * @param {} params 提示消息框的样式
     * @return {}
     */
    doCellTip:function (jq, params) {
        function showTip(showParams, td, e, dg) {
            //无文本，不提示。
            if ($(td).text() == "") return;
            params = params || {};
            var options = dg.data('datagrid');
            var styler = 'style="';
            if(showParams.width){
                styler = styler + "width:" + showParams.width + ";";
            }
            if(showParams.maxWidth){
                styler = styler + "max-width:" + showParams.maxWidth + ";";
            }
            if(showParams.minWidth){
                styler = styler + "min-width:" + showParams.minWidth + ";";
            }
            styler = styler + '"';
            showParams.content = '<div class="tipcontent" ' + styler + '>' + showParams.content + '</div>';
            $(td).tooltip({
                content:showParams.content,
                trackMouse:true,
                position:params.position,
                onHide:function () {
                    $(this).tooltip('destroy');
                },
                onShow:function () {
                    var tip = $(this).tooltip('tip');
                    if(showParams.tipStyler){
                        tip.css(showParams.tipStyler);
                    }
                    if(showParams.contentStyler){
                        tip.find('div.tipcontent').css(showParams.contentStyler);
                    }
                }
            }).tooltip('show');
        };
        return jq.each(function () {
            var grid = $(this);
            var options = $(this).data('datagrid');
            if (!options.tooltip) {
                var panel = grid.datagrid('getPanel').panel('panel');
                panel.find('.datagrid-body').each(function () {
                    var delegateEle = $(this).find('> div.datagrid-body-inner').length ? $(this).find('> div.datagrid-body-inner')[0] : this;
                    $(delegateEle).undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove').delegate('td[field]', {
                        'mouseover':function (e) {
                            //if($(this).attr('field')===undefined) return;
                            var that = this;
                            var setField = null;
                            if(params.specialShowFields && params.specialShowFields.sort){
                                for(var i=0; i<params.specialShowFields.length; i++){
                                    if(params.specialShowFields[i].field == $(this).attr('field')){
                                        setField = params.specialShowFields[i];
                                    }
                                }
                            }
                            if(setField==null){
                                options.factContent = $(this).find('>div').clone().css({'margin-left':'-5000px', 'width':'auto', 'display':'inline', 'position':'absolute'}).appendTo('body');
                                var factContentWidth = options.factContent.width();
                                params.content = $(this).text();
                                if (params.onlyShowInterrupt) {
                                    if (factContentWidth > $(this).width()) {
                                        showTip(params, this, e, grid);
                                    }
                                } else {
                                    showTip(params, this, e, grid);
                                }
                            }else{
                                panel.find('.datagrid-body').each(function(){
                                    var trs = $(this).find('tr[datagrid-row-index="' + $(that).parent().attr('datagrid-row-index') + '"]');
                                    trs.each(function(){
                                        var td = $(this).find('> td[field="' + setField.showField + '"]');
                                        if(td.length){
                                            params.content = td.text();
                                        }
                                    });
                                });
                                showTip(params, this, e, grid);
                            }
                        },
                        'mouseout':function (e) {
                            if (options.factContent) {
                                options.factContent.remove();
                                options.factContent = null;
                            }
                        }
                    });
                });
            }
        });
    },
    /**
     * 关闭消息提示功能（基于1.3.3版本）
     * @param {} jq
     * @return {}
     */
    cancelCellTip:function (jq) {
        return jq.each(function () {
            var data = $(this).data('datagrid');
            if (data.factContent) {
                data.factContent.remove();
                data.factContent = null;
            }
            var panel = $(this).datagrid('getPanel').panel('panel');
            panel.find('.datagrid-body').undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove')
        });
    }
});


