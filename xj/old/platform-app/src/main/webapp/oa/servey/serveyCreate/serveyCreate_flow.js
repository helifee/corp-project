/**
 * Create by ztf on 2017/7/8
 */
var urlParamJson = $.xljUtils.getUrlParams();
$(function () {
    
    /**
     * 初始化表单数据
     */
    function initFormData() {
	    var idVal = urlParamJson.businessId;
	    initFile(idVal);
	    $.ajax({
	        url:hostUrl+'oa/servey/serveyCreate/get/'+idVal+'?time='+Math.random(),
	        type:'GET',
	        dataType:'JSON',
	        success:function (resultData) {
	            if(resultData&&resultData.success){
	                var result = resultData.result;
	                for(var item in result) {
	                    $('#'+item+'').html(result[item]);
	                }
	                var serveyCategory = result["serveyCategory"];
	                if(serveyCategory != null){
	                	 $("#parentName").html(serveyCategory.name);
	                }
	               
	                var multipleSurveys = result["serveyMultipleSurveys"];
	                $('input[name=multipleSurveys][value="'+multipleSurveys+'"]').prop('checked',true);
	                
	                var serveyPartyList = result["serveyPartyList"];
	                var serveyQuestionList = result["serveyQuestionList"];
	                var readers = new Array();
	                var participants = new Array();
	                var closingNotices = new Array();
	                if(serveyPartyList != null){
	                    for(var i =0;i<serveyPartyList.length;i++){
	                    	if(serveyPartyList[i].type == "PARTY"){
	                    		if(serveyPartyList[i].partyName != null && serveyPartyList[i].partyName !=""){
	                    			participants.push(serveyPartyList[i].partyName);
	                    		}
	                    	}else if(serveyPartyList[i].type == "READER"){
	                    		if(serveyPartyList[i].partyName != null && serveyPartyList[i].partyName !=""){
	                    			readers.push(serveyPartyList[i].partyName);
	                    		}
	                    	}else if(serveyPartyList[i].type == "NOTICE"){
	                    		if(serveyPartyList[i].partyName != null && serveyPartyList[i].partyName !=""){
	                    			closingNotices.push(serveyPartyList[i].partyName);
	                    		}
	                    	}
	                    	
	                    }
	                    $("#participant").html(participants.join(","));
	                    $("#reader").html(readers.join(","));
	                    $("#closingNotice").html(closingNotices.join(","));
	                }
	                var tableClumns = "";
	                if(serveyQuestionList!= null){
	                	for(var i =0;i<serveyQuestionList.length;i++){
	                		tableClumns = tableClumns + "<tr class='form-tr'>";
	                		tableClumns = tableClumns + "<td class='w20' name='questionNum'>"+serveyQuestionList[i].questionNum+"</td>";
	                    	tableClumns = tableClumns + "<td class='w60' name='question'>"+serveyQuestionList[i].question+"</td>";
	                    	tableClumns = tableClumns + "<td class='w20' name='serveyQuestionInfo'>"+getQuestionNameByCode(serveyQuestionList[i].questionTypeCode)+"</td>";
	                    	tableClumns = tableClumns + "</tr>";
	                    }
	                }
	                $("#serveyCreateAdd").append(tableClumns);
	                initCategoryTree(result["serveyCategoryId"]);
	                resizeIframe();
	            }
	        }
	    });
    }
    initFormData();
	// $(window.parent.document.getElementById('bizForm')).width('99%');
    $('body').css({'min-width':'100%'});
});

function getQuestionNameByCode(code){
	if(code == "SINGLE_SELECT"){
		return "单选题";
	}else if(code == "MULTI_SELECT"){
		return "多选题";
	}else if(code == "QA"){
		return "问答题";
	}else if(code == "GRADE_SUBJECT"){
		return "评分题";
	}else if(code == "MATRIX_MULTI_SELECT"){
		return "矩阵多选题";
	}else if(code == "MATRIX_SINGLE_SELECT"){
		return "矩阵单选题";
	}else if(code == "MATRIX_GRADE_SUBJECT"){
		return "矩阵评分题";
	}
}

function initCategoryTree(delId) {
    $('#parentSpan').on('click',function () {
        $(this).xljSingleSelector({
            title:'调查分类',
            selectorType:'serveyCategory',
            targetId:'parentId',
            targetName:'parentName',
            treeUrl:hostUrl+'oa/servey/serveyCategory/queryList',
            treeSettings:{
                "data":{
                    "simpleData":{
                        "enable":true,
                        "idKey":"id",
                        "pIdKey":"parentId",
                        "rootPId":null
                    }
                },
                callback:{
                    onNodeCreated:function (event,treeId,treeNode) {
                        if(delId==treeNode.id){
                            $.fn.zTree.getZTreeObj(treeId).removeNode(treeNode,false);
                        }

                    }
                }

            },
            immediatelyShow:true
        });
    });
}


/**
 * 初始化附件
 */
function initFile(rowId) {
	
    try{
        $('#documentAttachments').xljAttachment({
            appId: '1',
            businessId: rowId,
            categoryId: '1',
            mode: 'view',
            singleUpload: false,
			hideButtonsWithNoFile:true,
			loadFilesDone:function () {
				resizeIframe();
			}
        });
    }catch (e){

    }
}

/**
 * 计算iframe高度自适应
 */
function resizeIframe() {
	/*if(document.bizForm) {
		var b_height = Math.max(document.bizForm.document.body.scrollHeight,document.bizForm.document.body.clientHeight);
		
		var b_iframe = document.getElementById("bizForm");
		$(b_iframe).height(b_height);
	}
	if (!$.isEmptyObject(document.bizForm) && $(document.bizForm.document).find('#form-composer')) {
		$(document.bizForm.document).find('#form-composer').width($(document.bizForm).width())
	}*/
	
	/*if (window.parent&&window.parent.document.bizForm){
		var bizForm = window.parent.document.bizForm;
		$(window.parent.document.getElementById('bizForm')).height(bizForm.document.getElementsByTagName('body')[0].scrollHeight);
	}else {
		// ff
		var iframeBody = $(window.parent.document.documentElement).find("#bizForm");
			iframeBody.height(iframeBody[0].contentDocument.body.scrollHeight+20);
		// var iframeBody = document.getElementById('bizForm').contentDocument.body;
		// b_height = Math.max(iframeBody.scrollHeight, iframeBody.clientHeight);
	}*/
	var topWinSrc;
	try{
		topWinSrc = window.top.location.href;
		if(topWinSrc.indexOf('#')!=-1){
			topWinSrc = topWinSrc.substring(0,topWinSrc.indexOf('#'));
		}
		window.top.location = topWinSrc + '#flowTopHeight='+window.document.body.scrollHeight;
	}catch(e){
		topWinSrc = $.xljUtils.getUrlParam('topWinSrc');
		if(topWinSrc){
			window.top.location = topWinSrc + '#flowTopHeight='+window.document.body.scrollHeight;
		}
	}

}
