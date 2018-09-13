$(function() {
	officeManager('#storageRecord', 2);
	officeManager('#priceSummary', 3);
	
	var urlParam = $.xljUtils.getUrlParams();
    var act, id;
    if(urlParam){
   	 act = urlParam.act;
   	 id = urlParam.id;
    }
	getOfficeRecordInfo(id);	//获取用品信息
	$('#officeSupplyInfoForm input,#officeSupplyInfoForm select,#officeSupplyInfoForm button').attr('disabled', true);
	
	//标签按钮切换
	$('.officeManager button').click(function() {
		var _this = $(this);
		var index = _this.index();
		_this.siblings().removeClass('active');
		_this.addClass('active');
		$('.office-item').removeClass('active');
		$('.office-item').eq(index).addClass('active');
		
		$.xljUtils.resizeNestedGrid();
	})
	
	

	//初始化日期控件
	$.fn.datetimepicker.dates['zh'] = {  
        days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],  
        daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],  
        daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],  
        months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],  
        monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],  
        meridiem:    ["上午", "下午"],  
        //suffix:      ["st", "nd", "rd", "th"],  
        today:       "今天"  
    };  
	
	//初始化日期控件
	$(".form_datetime").datetimepicker({
    	language:'zh',  
        format: "yyyy-mm-dd hh:ii",
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		startView: 2,
		forceParse: 0,
        showMeridian: 1
    });
	
	//删除按钮
	$('.deleteStore').click(function() {
		if(window.confirm("您真的要删除所选记录吗？")) {
			$.ajax({
	        	   type: "delete",
	        	   url: hostUrl + "oa/office/officeRecord/delete/" + id,
	        	   dataType:"json",
	        	   success: function(result){
	        		   if(result.success) {
	        			   $.xljUtils.tip("red", "删除成功")
	        			   window.opener.location.reload();  
	        			   window.close();
	        		   }
	        	   }
	    	 });
		}
	});
	
	//关闭按钮
	$(".closeWin").click(function() {
		closeWin();
	})
	
	//编辑按钮
	$(".editStore").click(function() {
		$('#officeSupplyInfoForm input,#officeSupplyInfoForm select,#officeSupplyInfoForm button').removeAttr('disabled');
		$('.ctrl-1').hide();
		$('.ctrl-2').show();
		
		$('.empty').click(function(){
			 var _this =$(this);
			 _this.siblings('input[name="parentNodeIdBak"]').val('');
			 _this.siblings('input[name="parentNodeId"]').val('');
		 });
		
		//选择父节点
		 $('.fatherNodeSelector').click(function() {
			 $(this).xljSingleSelector({
					title:'用品类别',//选择器标题，默认是'选择组织机构'
		            selectorType:'org',//选择器类型，默认是组织机构选择器
		            immediatelyShow:true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
		            treeUrl: baseUrl + "oa/office/officeHouse/getOfficeHouseTreeById/null?t=" + (+new Date()),
		            targetId:"parentNodeId",//选择的数据的ID存储input域
		            targetName:"parentNodeIdBak",//选择的数据的Name存储input域
		            formatTreeJson:formatZTreeData,
		            ajaxType: "GET",
		            treeSettings:{
		            	data:{
							simpleData: {
								enable: true,
								idKey: 'id',
								pIdKey: 'parentId'
							}
						}
		            }
				});
		 });
		
	})
	
	//保存办公用品信息
	$('.saveResult').click(function() {
		var officeSupplyInfoFormArr= $("#officeSupplyInfoForm").serializeArray();
		var formDataDto={};
		for(var i in officeSupplyInfoFormArr){
			formDataDto[officeSupplyInfoFormArr[i].name]=officeSupplyInfoFormArr[i].value;
		}
		$.ajax({
			url: hostUrl + "oa/office/officeRecord/update/" + id,
			type: "PUT",
			dataType:"JSON",
			data: JSON.stringify(formDataDto),
			contentType: "application/json",
			success: function(data) {
				if(data.success) {
					$.xljUtils.tip("green", "修改成功")
     			   window.opener.location.reload();  
//     			   window.close();
     		   }  
			}
		})
	})
	
	//调整库存按钮
	$('.changeStore').click(function(){ 
		openNewWindow("officeGrantRecord_ediltStockNum.html?id="+id);
	});

	//上传图片
	$('.addImg').click(function() {
		$('#uploadImg').click();
	})
	$('#uploadImg').change(function() {
		var uploadImg = $(this).get(0).files[0];
		var file = new FileReader();
		file.onload = function() {
			$('.upload-img-view').html('<img src="' + this.result + '"/>');
		}
		file.readAsDataURL(uploadImg);
	})
	$('.deleteImg').click(function() {
		$('#uploadImg').val('');
		$('.upload-img-view').html('');
	})
	
//	$('#imgUpload').xljAttachment({appId:'1',businessId:'122',categoryId:'1',mode:'add'});
	
	
	//选择所属类别

	
	 


});

function formatZTreeData(arr) {
	
	$.each(arr, function(index, value){
		value.iconSkin = 'diy-group';
	});
	
	return arr;
};

/**
 * 关闭窗口
 * add by yongmei.xiao
 */
function closeWin() {
	window.close();
}

//获取办公用品信息
function getOfficeRecordInfo(id) {
	$.ajax({
		url: hostUrl + "oa/office/officeRecord/get/" + id,
		type: "GET",
		success: function(data) {
			if(data && data.success && data.result) {
				var result = data.result;
				$('#stockName').val(result.stockName);
				$('#stockNum').val(result.stockNum);
				$('#stockSpecifications').val(result.stockSpecifications);
				$('#stockBrand').val(result.stockBrand);
				$('#buyPrice').val(result.buyPrice);
				$('#meteringUnit').val(result.meteringUnit);
				$('#stockCount').val(result.stockCount);
				$('#tendId').val(result.tendId);
			}
		}
	})
}


/**
 * 日期格式化
 * add by yongmei.xiao
 */
function formatDate(date) {
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var CurrentDate = "";
	//初始化时间 
	//Year= day.getYear();//有火狐下2008年显示108的bug 
	Year = date.getFullYear();//ie火狐下都可
	Month = date.getMonth() + 1;
	Day = date.getDate();
	Hour = date.getHours(); 
	Minute = date.getMinutes(); 
	// Second = day.getSeconds(); 
	CurrentDate += Year + "-";
	if (Month >= 10) {
	CurrentDate += Month + "-";
	} else {
	CurrentDate += "0" + Month + "-";
	}
	if (Day >= 10) {
	CurrentDate += Day;
	} else {
	CurrentDate += "0" + Day;
	}
	return CurrentDate + " " + Hour + ":" +  Minute;
}


function officeManager(id, status) {
	var colModelArr, url;
	if(status == 2) {	//入库记录
		url = hostUrl + 'oa/office/officeGrantRecord/queryList';
		colModelArr = [
            {name:'id',label:'id', index:'id', key:true, width:55,hidden:true},
            {name : 'numberCode',label : '序号',width : 75, align:"center"},
            {name:'stockCount',label:'入库数量',index:'stockCount', width:100},
            {name:'price',label:'入库单价',index:'price', width:90},
            {name:'stockBrand',label:'品牌',index:'stockBrand', width:90},
            {name:'sum',label:'增减总金额',index:'sum', width:90},
            {name:'createPersonName',label:'录入者',index:'createPersonName', width:90},
            {name:'createDate',label:'入库时间',index:'createDate', width:90}
        ]
	}else if(status == 3) {	//价格汇总记录
		url = hostUrl + 'oa/office/officeGrantRecord/queryList';
		colModelArr = [
            {name:'id',label:'序号', index:'id', width:55,hidden:true},
            {name : 'numberCode',label : '序号',width : 75, align:"center"},
            {name:'stockName',label:'名称', index:'stockName', width:100},
            {name:'stockCategory',label:'所属类别', index:'stockCategory', width:90},
            {name:'stockSpecifications',label:'规格', index:'stockSpecifications', width:90},
            {name:'stockBrand',label:'品牌', index:'stockBrand', width:90},
            {name:'meteringUnit',label:'单位', index:'meteringUnit', width:90}
        ]
	}
	
	jQuery(id + 'Rowgrid').jqGrid({
        url: url,
        ajaxGridOptions: { 
        	contentType: 'application/json'
        },
        mtype : "POST",
        contentType : "application/json",
        datatype : "json",
        jsonReader : {
            root: "result"
        },
        autowidth:true,
        colModel:colModelArr,
        rowNum : -1,//一页显示多少条
        rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
        pager : id + 'Pagered',//表格页脚的占位符(一般是div)的id
        rownumbers:true,
        viewrecords : true,
        multiboxonly : true,
        multiselect: true,
        loadError:function (xhr,status,error) {
            $.xljUtils.tip('red',"数据加载失败！");
        },
        gridComplete: function() {
//        	$.xljUtils.resizeNestedGrid();
        	$.xljUtils.addGridScroll();
        }
    });
}