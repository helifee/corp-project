/**
 * author:zhangfangzhi
 * date:20170516
 */
var screeing;	//查询条件回显
var comId;		//公司id
var proId;		//项目id
var comName;	//公司名称
var proName;	//项目名称
var qiId;		//分期id
var groupId;	//组团id
var groupName;	//组团名称
$(function(){
    //公司下拉 
    getCompanySelectData();
    //查询回显
    initScreeing();
});

/**
 * 公司下拉
 */
function getCompanySelectData(){
	$.ajax({
        type:'POST',
        url:hostUrl+'pl/plCompany/queryCompany',
        dataType:'json',
        data:JSON.stringify({}),
        async:false,
        contentType:'application/json',
        success: function(json) {
	      	if(json.success){
	      		data=json.result;
	      		var bodyData = {};
	      		for (var o in data){
	      			$("#selectCompany").append("<option value='"+data[o].id+"'>"+data[o].name+"</option>")  
	      		}
	      	}else{
	      		pop_tip_open("red",json.msg);
	      	}
        },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
    });
}

/**
 * 项目下拉
 */
function selectProject(st){
	$.ajax({
        type:'POST',
        url:hostUrl+'pl/projectOption/projectPeriod',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'companyId':st.val()}),
        success: function(json) {
	      	if(json.success){
	      		data=json.result;
	      		var bodyData = {};
	      		for (var o in data){
	      			$("#selectProject").append("<option value='"+data[o].id+"'>"+data[o].projectName+"</option>")  
	      		}
	      	}else{
	      		pop_tip_open("red",json.msg);
	      	}
        },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
    });
}

/**
 * 组团下拉
 */
function selectGroup(st){
	$.ajax({
        type:'POST',
        url:hostUrl+'pl/plGroup/queryGroupByQiId',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'qiId':st.val()}),
        success: function(json) {
	      	if(json.success){
	      		data=json.result;
	      		var bodyData = {};
	      		for (var o in data){
	      			$("#selectGroup").append("<option value='"+data[o].id+"'>"+data[o].name+"</option>")  
	      		}
	      	}else{
	      		pop_tip_open("red",json.msg);
	      	}
        },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
    });
}

/**
 * 查询条件回显
 */
function initScreeing(){
	$.ajax({
        type:'POST',
        url:hostUrl+'pl/plScreeing/queryScreeing',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'businessType':55}),
        success: function(json) {
        	if(json.success){
	      		var data=json.result;
	      		screeing=data;
	      		if(data){
	      			if(data.companyId) {
	      				comId=data.companyId;
	      				comName = data.companyName;
	      			}
	      			if(data.projectId) {
	      				proId=data.projectId;
	      				proName = data.projectName;
	      			}
	      			if(data.qiId) {
	      				qiId = data.qiId;
	      			}
	      			if(data.groupId) {
	      				groupId = data.groupId;
	      				groupName = data.groupName;
	      			}
	      			queryByC_P(comId, proId, qiId);
	      		}
	      	}else{
	      		pop_tip_open("red",json.msg);
	      	}
        },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
    });
}

/**
 * 保存查询条件
 */
function toSaveScreen(){
	$.ajax({
        type:'POST',
        url:hostUrl+'pl/plGroup/queryGroupByQiId',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'qiId':st.val()}),
        success: function(json) {
	      	if(json.success){
	      		data=json.result;
	      		var bodyData = {};
	      		for (var o in data){
	      			$("#selectGroup").append("<option value='"+data[o].id+"'>"+data[o].name+"</option>")  
	      		}
	      	}else{
	      		pop_tip_open("red",json.msg);
	      	}
        },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
    });
}
