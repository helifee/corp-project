var rowData;//当前选中数据
var rowDataBefore;
$(function(){
	   switchPage();
       //执行公式列表划过及选中背景色变换效果
       formulaEffect();

       $('.tabs').height($(window).height() - $('.expand-search').outerHeight() - $('.tabContainer').outerHeight() - 5);
       $('.busiType').height($(window).height() - $('.expand-search').outerHeight() - $('.tabContainer').outerHeight() - $('.importDiv').outerHeight() - $('.busiTitle').outerHeight()- 2);
       pageInit();
});

/**
 * tab页切换
 */
 function resizeHeight(){
//左侧  头部底部为60px  title类 为50px
var w_h = $(window).height();
//右侧table
$(".con-table .mytable").height((w_h-180)/2+"px");
}
function switchPage() {
    $('.tabbtn').click(function() {
        $('.tabcontent').css('display','none');
        var index = $(this).index();
        $('.tabbtn').removeClass('active');
        $(this).addClass('active');
        var tabitem = $('.tabcontent')[index];
        $(tabitem).css('display','block');
    })
}
/**
 * 公式列表划过及选中背景色变换效果
 */
function formulaEffect() {
    $('.formularTable tr').click(function() {
        $(this).css({"color":"#fff","background-color":"#46A7FF"}).siblings().css({"color":"#333","background-color":"transparent"});
    });
}
function pageInit(){
	getFinanceSystem();
}

function getFinanceSystem(){
	$.ajax({
		   url:serviceUrl+"finance/sysRegister/queryList",
		   data:"{}",
	       type:'POST',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData){
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               if(successFlag) {
	            	  for(var o in result){
	            		  $("#selectFinanceSystem").append('<option value="'+result[o].id+'">'+result[o].fiSysName+'</option>')
	            	  }
	               }else {
	            		pop_tip_open("red",resultData.msg);
	               }
	           }
	       },
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        },
	        complete:function(){
	        	alert();
	        	getAccounSetList();
	        }
	});
	
}

function getAccounSetList(){
	var financeSys=$("#selectFinanceSystem").val();
	var data={
			registerId:financeSys
	  }
	$.ajax({
		   url:serviceUrl+"finance/accountSet/queryAccounSetList",
		   data:JSON.stringify(data),
	       type:'POST',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData){
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               consloe.log(result);
	               if(successFlag) {
	            	  for(var o in result){
	            		  $("#selectCompany").append('<option value="'+result[o].id+'">'+result[o].name+'</option>')
	            	  }
	               }else {
	            		pop_tip_open("red",resultData.msg);
	               }
	           }
	       },
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        },
	        complete:function(){
	        }
	});
	
	
};

