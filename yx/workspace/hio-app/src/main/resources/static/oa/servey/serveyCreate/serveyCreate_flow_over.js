/**
 * Create by ztf on 2017/6/20
 */
var urlParamJson = $.xljUtils.getUrlParams();
$(window).resize(function(){
	resizeTbody();
});
function resizeTbody(){
	$(".tbody-box").height($(window).height()-350+"px");
}
$(function () {
	$("#subjectInfo").hide();
	resizeTbody();
	$(".tit-btns button").on("click",function(e){
		$(this).addClass("active");
		e.stopPropagation();
	});
	$(".modal-title .yulan").mouseenter(function(){
		$(this).next().show();
	}).mouseleave(function(){
		$(this).next().hide();
	});

    /**
     * 初始化表单数据
     */
    function initFormData() {
        if(urlParamJson.act=='create'){
            $('#editTitle').text('问卷创建-查看');
            initCategoryTree();
        }else if(urlParamJson.act=='update'){
            $('#editTitle').text('问卷创建-查看');
            var idVal = urlParamJson.id;
            initFile(idVal);
            initserveyCreate(idVal,1);
        }
    }
    initFormData();
    resizeIframe();
    
    /**
     * 多页签切换
     */
    $(".con-tit button").on("click",function(e){
    	var index = $(this).index();
    	var name = $(this).attr("name");
    	$(this).siblings().removeClass("active");
    	$(this).addClass("active");
        e.stopPropagation();
        selectType = name;
        console.info("多页签切换  >>selectType="+selectType);
    	if(name == "questionnaire"){
    		$("#serveyInfo").show();
    		$("#subjectInfo").hide();
    	}else if(name == "topic"){
    		$("#subjectInfo").show();
    		$("#serveyInfo").hide();
    	}
        resizeTbodyBox();
    });
    
    //关闭窗口
    $('#closeWindowBtn').on('click',function () {
    	window.open("","_self","");
        window.close();
    });
});


function initserveyCreate(idVal,type){
	$.ajax({
        url:serviceUrl+'oa/servey/serveyCreate/get/'+idVal+'?time='+Math.random(),
        type:'GET',
        dataType:'JSON',
        success:function (resultData) {
            if(resultData&&resultData.success){
                var result = resultData.result;
                for(var item in result) {
                    $('input[name="'+item+'"]').val(result[item]);
                }
                $("#description").val(result["description"]);
                var serveyCategory = result["serveyCategory"];
                if(serveyCategory != null){
                	 $("#parentName").val(serveyCategory.name);
                	 $("#parentId").val(serveyCategory.id);
                }
                
                var multipleSurveys = result["serveyMultipleSurveys"];
                $('input[name=multipleSurveys][value="'+multipleSurveys+'"]').prop('checked',true);
                
                var serveyPartyList = result["serveyPartyList"];
                var serveyQuestionList = result["serveyQuestionList"];
                var readers = new Array();
                var readersId = new Array();
                var participants = new Array();
                var participantsId = new Array();
                var closingNotices = new Array();
                var closingNoticeId = new Array();
                if(serveyPartyList != null){
                    for(var i =0;i<serveyPartyList.length;i++){
                    	if(serveyPartyList[i].type == "PARTY"){
                    		if(serveyPartyList[i].partyId != null && serveyPartyList[i].partyId !=""){
                    			participantsId.push(serveyPartyList[i].partyId);
                    		}
                    		if(serveyPartyList[i].partyName != null && serveyPartyList[i].partyName !=""){
                    			participants.push(serveyPartyList[i].partyName);
                    		}
                    	}else if(serveyPartyList[i].type == "READER"){
                    		if(serveyPartyList[i].partyId != null && serveyPartyList[i].partyId !=""){
                    			readersId.push(serveyPartyList[i].partyId);
                    		}
                    		if(serveyPartyList[i].partyName != null && serveyPartyList[i].partyName !=""){
                    			readers.push(serveyPartyList[i].partyName);
                    		}
                    	}else if(serveyPartyList[i].type == "NOTICE"){
                    		if(serveyPartyList[i].partyId != null && serveyPartyList[i].partyId !=""){
                    			closingNoticeId.push(serveyPartyList[i].partyId);
                    		}
                    		if(serveyPartyList[i].partyName != null && serveyPartyList[i].partyName !=""){
                    			closingNotices.push(serveyPartyList[i].partyName);
                    		}
                    	}
                    	
                    }
                    $("#participant").val(participants.join(","));
                    $("#reader").val(readers.join(","));
                    $("#participantId").val(participantsId.join(","));
                    $("#readerId").val(readersId.join(","));
                    $("#closingNoticeId").val(closingNoticeId.join(","));
                    $("#closingNotice").val(closingNotices.join(","));
                }
                var tableClumns = "";
                if(serveyQuestionList!= null){
                	for(var i =0;i<serveyQuestionList.length;i++){
                		tableClumns = tableClumns + "<tr >";
                		tableClumns = tableClumns + "<td class='w20' name='questionNum'>"+serveyQuestionList[i].questionNum+"</td>";
                    	tableClumns = tableClumns + "<td class='w60' name='question'>"+serveyQuestionList[i].question+"</td>";
                    	tableClumns = tableClumns + "<td class='w20' name='serveyQuestionInfo'>"+getQuestionNameByCode(serveyQuestionList[i].questionTypeCode)+"</td>";
                    	tableClumns = tableClumns + "</tr>";
                    }
                }
                $("#serveyCreateAdd").append(tableClumns);
                addTbodyBoxScroll();
            	resizeTbodyBox();
                if(type==1){
                	initCategoryTree(result["serveyCategoryId"]);
                }
            }
        }
    });
}


function initCategoryTree(delId) {
    $('#parentSpan').on('click',function () {
        $('#parentSpan').xljSingleSelector({
            title:'调查分类',
            selectorType:'serveyCategory',
            targetId:'parentId',
            targetName:'parentName',
            treeUrl:serviceUrl+'oa/servey/serveyCategory/queryList',
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

function closeWin(aa,resultData) {
    if(resultData.success) {
        window.close();
    }
}

function testCallback(data) {
    console.info(data);
}

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
	}else if(code == "SEPERATOR_LINE"){
		return "分页符";
	}
}

function addTbodyBoxScroll(){
	$(".tbody-box").niceScroll({
		autohidemode: false,
		cursorcolor: "#eee",
		cursorwidth: "6px", // 滚动条的宽度，单位：便素
		cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
		horizrailenabled: true, // nicescroll可以管理水平滚动
		background: "#fff"
	});
}
function resizeTbodyBox(){
	$(".tbody-box").getNiceScroll().show().resize();
}

function emptyDateObject1(dateIdText,dateId){
	$("#"+dateIdText).val("");
	$("#"+dateId).val("");
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
            isAsyncSubmit: false
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
	try{
        if (window.parent&&window.parent.document.bizForm){
            var bizForm = window.parent.document.bizForm;
            $(window.parent.document.getElementById('bizForm')).height(bizForm.document.body.scrollHeight+100);
        }else {
            // ff
            var iframeBody = $(window.parent.document.documentElement).find("#bizForm");
            iframeBody.height(iframeBody[0].contentDocument.body.scrollHeight+20);
        }
    }catch (e){

    }

}
