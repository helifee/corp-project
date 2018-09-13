var url="../../";
/**
 * 关闭窗口
 * add by yongmei.xiao
 */
function closeWin() {
	window.close();
}
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

//选择父节点
$('.fatherNodeSelector').click(function() {
	 $(this).xljSingleSelector({
			title:'所属类别',//选择器标题，默认是'选择组织机构'
           selectorType:'officehouse',//选择器类型，默认是组织机构选择器
           immediatelyShow:true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
           treeUrl: baseUrl + "oa/office/officeHouse/getOfficeHouseTreeById?time=" + (+new Date()),
           targetId:"stockHouseId",//选择的数据的ID存储input域
           targetName:"houseName",//选择的数据的Name存储input域
           formatTreeJson:formatZTreeData,
           treeParam:{parentNodeId:null},
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
})

function formatZTreeData(arr) {
	
	$.each(arr, function(index, value){
		value.iconSkin = 'diy-group';
	});
	
	return arr;
};

//清除父类别内容
function empty(obj) {
	$(obj).siblings('input[name="stockCategoryId"]').val('');
	$(obj).siblings('input[name="stockCategory"]').val('');
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

/**
 * 初始化
 * add by yongmei.xiao
 */
$(document).ready(function(){
	 initUUId();	//初始化id
	 
	 /**
	  * 保存用品分类
	  * add by yongmei.xiao
	  */
	 $("#saveOfficeHouse").click(function () {
	 	submitForm();
	 });
	 $("#saveAndCloseOfficeHouse").click(function () {
	 	submitForm(true);
	 });
});


//提交数据  flag为标识  标识保存后是否关闭
function submitForm(flag) {
	var id=$("#id").val();
	var officeHouseArr= $("#officeInfoForm").serializeArray();
	var officeHouseDto={};
	for(var i in officeHouseArr){
		officeHouseDto[officeHouseArr[i].name]=officeHouseArr[i].value;
	}
	var url = baseUrl+"oa/office/officeInfo/save";
	
	
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: url,
		data:JSON.stringify(officeHouseDto),
		dataType:"JSON",
		success: function (result) {
			if(result && result.success) {
				$.xljUtils.tip('green', '数据保存成功！');
					if(flag === true) {	//保存并新增
						window.location.reload();
						initUUId();
					}else {	//保存并关闭
						closeWin();
					}
			}else {
				$.xljUtils.tip('red', '数据保存失败！');
			}
		}
	});
}
 

/**
 * 系统统一入口生成ID
 */
function initUUId(){
  var url = baseUrl+"generator/getGuuid"+"?time="+Math.random();
	$.ajax({
      type:'get',
      url:url,
      success: function(data) {
       var guuid=data.result;
	    $("#id").val(guuid);
   }
 });
}
