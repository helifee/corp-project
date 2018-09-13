/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-03-17
 */

/**
 * 此文件实现动态地绘制审批人、抄送人和可阅读人的表格, 其中审批人和可阅读人的数据表格
 * 对应的tableID关键字为one, 抄送人对应的tableID关键字为two
 */

//定义全局的变量
var selectOneTRID = "";
var selectTwoTRID = "";
var returnPopId = "";  
var returnPopName = "";
var senderArr = ["发起人","发起人直接领导", "发起人顶级部门领导", "上一环节审批人直接领导", "上一环节审批人顶级部门领导"];
var typeItemArray = ["","人员","岗位","标准岗位","相对参与人","角色"];
var variableList; //表单变量列表

// --------------------  通用方法定义 begin -----------------------------

/**
 * 拓展Array的insert方法, 参数是index和item, 实现指定的位置插入item对象
 */
Array.prototype.insert = function (index, item){  
	this.splice(index, 0, item);  
};

/**
 * 该方法实现数组对象的比较,以对象的property为比较参数,在changeArraySort()方法使用到
 * @param property
 * @returns{Function}
 */
function compare(property){
   return function(a,b){
       var value1 = a[property];
       var value2 = b[property];
       return value1 - value2;
   }
}

/**
 * 实现将tempArray按照某个属性进行排序,然后重新对sort属性进行赋值,使sort为我们想要的数据
 * @param tempArray
 * @returns
 */
function changeArraySort(tempArray){
	var newArray = tempArray.sort(compare('sort'));
	for(var idx=0; idx<newArray.length; idx++){
		var item = newArray[idx];
		item.sort = idx+1;
	}
	return newArray;
}
//-----------通用方法定义 end ---------------------------

/**
 * 查询相关的表单数据列表
 */
function queryVariableList(busiObjectId){
	var paramData = new Object();
	paramData.flId = busiObjectId;//此参数暂时为1,等整个流程跑起来之后再修改为正确的值
	$.ajax({ //发送更新的ajax请求
	    type : "post",  
	    url : hostUrl+"flow/businessObjectVariable/queryBusiVariableListByTemlateId",    
	    dataType : "json",  
	    data : JSON.stringify(paramData),//将对象序列化成JSON字符串  ,
	    contentType : 'application/json;charset=utf-8', //设置请求头信息  
	    success : function(data){
	    	variableList = data.result;	
	    },  
	    error : function(data){  
	    	if(data.msg){
	    		alert(data.msg);
	    	}else{
	    		//alert("修改失败！");
	    	}
	    }  
	});
}
/**
 * 在blockIdx的表格中增加一列
 * @param blockIdx --one or two
 * @param itIdx -- 在第itIdx行插入数据
 */
function addRow(blockIdx,itIdx){
	var tableDataList = getTableAllTRTDData(blockIdx);
	if(tableDataList && tableDataList.length>0){
		console.log("addRow >> tableDataList"+JSON.stringify(tableDataList));
	}
	
	$.each(tableDataList,function(index,singleItem){//遍历mapList的数组数据
		singleItem.sort = singleItem.sort+1;
	});
	var newObj = new Object();
	newObj.blockIdx = blockIdx;
	//新增的对象默认: 角色-本公司
	newObj.sort = 100;
	newObj.participantType = "3";
	newObj.participantTypeName = "角色";
	newObj.participantScope = '312';
	newObj.participantScopeName = '本公司';
	tableDataList.push(newObj);
	//将数组重新排序, 然后绘制表格
	tableDataList = changeArraySort(tableDataList);
	redrawTBodyOfTable(blockIdx, tableDataList);
	$('html').getNiceScroll().show().resize();       //重置纵向滚动条
	singleSelectTR(blockIdx+"_"+tableDataList.length);
}

/**
 * 排序的通用处理逻辑
 * @param tableType
 * @param offset 上移-1.5 下移+1.5  置顶-100，置底+100
 */
function sortCommonAction(tableType, offset){
	var selectedRowID = selectOneTRID;
	var selItems = selectedRowID.split("_");
	var selectedNO = parseInt(selItems[1]);
	var tableDataList = getTableAllTRTDData(tableType);
	for(var i=0; i<tableDataList.length; i++){
		if(i+1 == selectedNO){
			var selectedObj = tableDataList[i];
			selectedObj.sort = selectedObj.sort + offset;
			//selectedObj.trSortId = selectedObj.trSortId + offset;
		}
	}
	tableDataList = changeArraySort(tableDataList);
	redrawTBodyOfTable(tableType, tableDataList);
	
	if(offset==1.5){//下移一位
		selectedNO++;
		if(selectedNO > tableDataList.length){
			selectedNO = tableDataList.length;
		}
	}else if(offset==-1.5){//上移一位
		selectedNO--;
		if(selectedNO <1){
			selectedNO = 1;
		}
	}
	if(offset==100){//置底
		selectedNO = tableDataList.length;
	}else if(offset==-100){//置顶
		selectedNO = 1; 
	}
	selectOneTRID = selItems[0]+"_"+selectedNO;
	var classText = "ui-row-ltr ui-state-highlight";
	$("#"+selectOneTRID).addClass(classText).siblings().removeClass(classText);
}

/**
 * 将某一行上移
 * @param tableType
 */
function upRow(tableType){
	sortCommonAction(tableType, -1.5);
} 

/**
 * 将某一行下移
 * @param tableType
 */
function downRow(tableType){
	sortCommonAction(tableType, 1.5);
}

/**
 * 将某一行置顶
 * @param tableType
 */
function topRow(tableType){
	sortCommonAction(tableType, -100);
}

/**
 * 将某一行置底
 * @param tableType
 */
function bottomRow(tableType){
	sortCommonAction(tableType, 100);
}

/**
 * 重绘某个表格
 * @param blockIdx
 */
function redrawTBodyOfTable(blockIdx, dataObjList){
	var tableObj = $("#table_"+blockIdx); 
	var firstTr = tableObj.find('tbody'); 
	firstTr.html("");//清除掉tbody标签内的所有html元素
	
	//循环dataObjList的数据进行绘制
	$.each(dataObjList,function(index,item){//遍历mapList的数组数据
		var scope = item.participantScope;
		var type = item.participantType;
		var blockIdx = item.blockIdx;
		var itIdx = item.sort;
		//1-绘制TR标签--绘制第一列的数据
		var row = $("<tr class=\"td-average\" id='"+blockIdx+"_"+itIdx+"' onclick=\"singleSelectTR(\'"+blockIdx+"_"+itIdx+"\')\"></tr>");
		var td1Header = "<td id='"+blockIdx+"_"+itIdx+"01' style=\"width: 25%\"><select class='form-control addInputWidth' id='type_"+blockIdx+"_"+itIdx+"' name='type_"+blockIdx+"_"+itIdx+"' onchange=\"typeSelectChange(this)\" >";
		var td1Middle = "";
		for(var i=1; i<=5; i++){
			if( type == i){
				td1Middle +="<option value ='"+i+"' selected='true'>"+typeItemArray[i]+"</option>";
			}else{
				td1Middle +="<option value ='"+i+"'>"+typeItemArray[i]+"</option>";
			}
		}
		var td1 = $(td1Header+td1Middle+"</select></td>"); 
		row.append(td1);
		
		//2-绘制第2列的数据
		var td2Header = "<td id='"+blockIdx+"_"+itIdx+"02' class=\"col_text\" style=\"width: 25%\"><div id='chooseType_"+blockIdx+"_"+itIdx+"'>";
		var td2Middle ="";
		var td3Middle ="";//第3列的中间部分的 
		var td3Classname = "class=\"radio-style\"";
		if(type == 3){//选择角色
			td3Classname = "class=\"form-inline\"";	
			console.log("getDiv2HtmlOfRoleType >>> item.status="+item.status);
			td2Middle = getDiv2HtmlOfRoleType(blockIdx, itIdx, item.participantIdName, item.participantId, item.status);
			td3Middle = getDiv3HtmlOfRoleType(blockIdx, itIdx, scope, item.paramValueName, item.paramValue);

			//去除标准岗位时，范围选择中“指定组织” update by dingguanghuai on 2017/11/02
			var _td3Middle = $(td3Middle);
			_td3Middle.find('option[value="316"]').remove();
			td3Middle = _td3Middle[0].outerHTML;
		}else if(type==1|| type==2){//选择人员或角色
			td2Middle = getDiv2HtmlOfChooseType(type, blockIdx, itIdx, scope);
			if(scope == "11" || scope=="21"){//指定人员或指定岗位
				if(scope == "11"){//人员的11范围类型
					var partIdText = item.participantId;
					if(partIdText.indexOf("&&")<0){//如果没有&&符号,说明未进行人员ID和岗位ID的拼接
						//paramValue是岗位ID
						if(item.paramValue && item.paramValue.length>1){
							item.participantId = partIdText+"&&"+item.paramValue;
							//console.log("选人控件中的人员已经有岗位信息 >> ="+item.participantId );
						}else{
							console.log("选人控件中的人员没有岗位信息,请重新选择!");
							//alert("选人控件中的人员没有岗位信息,请重新选择!");
						}
						
					}
				}
				console.log("getDiv3HtmlOfChooseTypeTextValue >>> participantIdName="+ item.participantIdName+"; participantId="+item.participantId+" item.status="+item.status);
				td3Middle = getDiv3HtmlOfChooseTypeTextValue(blockIdx, itIdx, scope, item.participantIdName, item.participantId, item.status);
			}else{//2-4 表单人员或表单岗位
				td3Middle = getDiv3HtmlOfChooseTypeFormValue(blockIdx, itIdx, scope, item.participantId);
			}
		}else if(type==4){
			td2Middle =  getDiv2HtmlOfSender(blockIdx, itIdx, item.participantScope);
		}else if(type==5){
			console.log("getDiv2HtmlOfCommonRole >>> item.status="+item.status);
			td2Middle =  getDiv2HtmlOfCommonRole(blockIdx, itIdx, item.participantIdName, item.participantId, item.status);
		}
		
		var td2 = $(td2Header + td2Middle +"</div></td>");
		row.append(td2);
		
		//2-绘制第2列的数据     
		var td3 = $("<td id='"+blockIdx+"_"+itIdx+"03' colspan=\"2\" style=\"width:50%\" class=\"clearfix\">" +
				"<div id='content_"+blockIdx+"_"+itIdx+"' "+td3Classname+" style=\"width:100%;\">"
				+td3Middle+"</div></td>"); 
		row.append(td3);
		tableObj.append(row);
		
		//动态初始化选择器
		$(tableObj).xljMultipleSelectorUtil();
	});
}

/**
 * 选择某一行
 * @param obj
 */
function singleSelectTR(idText){
	var idValues = idText.split("_");
	if(idValues[0] == "one"){
		selectOneTRID = idText;
	}
	if(idValues[0] == "two"){
		selectTwoTRID = idText;
	}
	var trList = $("#tableTBody_"+idValues[0]).children("tr")
    for (var i=0;i<trList.length;i++) {
    	if(i+1 == idValues[1]){
    		var classText = "ui-row-ltr ui-state-highlight";
    		trList.eq(i).addClass(classText).siblings().removeClass(classText);
    		break;
    	}
    }
}

/**
 * 删除掉某一行
 * @param tableType
 */
function deleteRow(tableType){
	var idValus = selectOneTRID.split("_");
	var sortValue = parseInt(idValus[1]);
	sortValue--;
	if(sortValue<=1){
		sortValue = 1;
	}
	if("one" == tableType){
		$("#"+selectOneTRID).remove();
		selectOneTRID="";
		//showResultTextToLabel("one");
	}else if("two" == tableType){
		$("#"+selectTwoTRID).remove(); 
		selectTwoTRID="";
		//showResultTextToLabel("two");
	}	
	
	var tableDataList = getTableAllTRTDData(tableType);
	$.each(tableDataList,function(index,singleItem){//遍历mapList的数组数据
		singleItem.sort = singleItem.sort+1;
	});
	
	//将数组重新排序, 然后绘制表格
	tableDataList = changeArraySort(tableDataList);
	redrawTBodyOfTable(tableType, tableDataList);
	$('html').getNiceScroll().show().resize(); //重置纵向滚动条
	singleSelectTR(tableType+"_"+sortValue);
}


/**
 * 根据blockIdx的值获取表格的相关业务数据,放到对应的对象数组中
 * @param blockIdx--one or two
 */
function getTableAllTRTDData(blockIdx){
	var tempDataList = new Array();
	var trSort = 1;
	$("#tableTBody_"+blockIdx).find("tr").each(function(){
		var itemObj = new Object();
		var tdArr = $(this).children();
		var userType = tdArr.eq(0).find("select").val();//人员类型
		var userTypeText = tdArr.eq(0).find("select").find("option:selected").text();
		itemObj.blockIdx = blockIdx;
		if("one" == blockIdx){
			itemObj.type = "1";
		} else if("two" == blockIdx){
			itemObj.type = "2";
		}
		itemObj.sort = trSort;
		
		itemObj.participantTypeText = userTypeText;
		itemObj.participantType = userType;
		var div1Arr = tdArr.eq(1).children();
		var firstDiv = div1Arr[0];
		var firstIDText = firstDiv.id;//第二列的div的ID,即第一个ID chooseType__one_2
		
		var div2Arr = tdArr.eq(2).children();//获取第三列的数据
		var secondDiv = div2Arr[0];
		var secondIdText = secondDiv.id;//第三列的div的ID,即第二个ID// content_one_2
		if(userType==1 || userType==2){//人员或岗位,则读取第二列的数据
			//select类型读取数据@modified by peter
			var scopeIdText = firstIDText.replace("chooseType", "participantScope");
			//var participantScope = $("input:radio[name='"+scopeIdText+"']:checked").val();
			var participantScope = $("#"+scopeIdText).val();
			itemObj.participantScope = participantScope;
			//var participantScopeText = $("input:radio[name='"+scopeIdText+"']:checked").next("span").text();
			var participantScopeText = $("#"+ scopeIdText).find("option:selected").text();
			itemObj.chooseTypeText = participantScopeText;
			if(participantScope == "11" || participantScope == "21" ){//指定人员或指定岗位
				var participantIdName = secondIdText.replace("content","participantIdName");
				var participantIdNameValue = $("#"+participantIdName).val();
				itemObj.participantIdName = participantIdNameValue;
				
				var participantId = secondIdText.replace("content","participantId");
				var participantIdValue = $("#"+participantId).val();
				itemObj.participantId = participantIdValue;
				
				var status = secondIdText.replace("content","status");
				var statusValue = $("#"+status).val();
				itemObj.status = statusValue;
			}else{//获取表单人员或表单岗位的数据
				var formValueSelectId = secondIdText.replace("content","participantId");
				var selectedValue = $("#"+formValueSelectId).val();
				var selectedText = $("#"+formValueSelectId).find("option:selected").text();
				var selectedValueArray = selectedValue.split("&&");
				itemObj.participantId = selectedValueArray[0];
				itemObj.paramValue = selectedValueArray[1];
				itemObj.participantIdName = selectedText;
			}
		}else if(userType==3){//选择的是角色,读取第2行的角色数据
			var idNameText = firstIDText.replace("chooseType","participantIdName");
			itemObj.participantIdName = $("#"+idNameText).val();
			var idText = firstIDText.replace("chooseType","participantId");
			itemObj.participantId = $("#"+idText).val();
			//第三行的数据
			/*var scopeIdText = secondIdText.replace("content","participantScope");
			// radio类型的 读取数据
			var participantScope = $("input:radio[name='"+scopeIdText+"']:checked").val();
			itemObj.participantScope = participantScope;
			var participantScopeName = $("input:radio[name='"+scopeIdText+"']:checked").next("span").text();
			itemObj.participantScopeName = participantScopeName;*/
			
			//select类型读取数据@modified by peter
			var formValueSelectId = secondIdText.replace("content","participantScope");
			var participantScope =  $("#"+formValueSelectId).val();
			itemObj.participantScope = participantScope;
			var participantScopeName = $("#"+formValueSelectId).find("option:selected").text();
			itemObj.participantScopeName = participantScopeName;
			
			var statusId = secondIdText.replace("content","status");
			itemObj.status =  $("#"+statusId).val();
			
			if(participantScope == "316"){//如果是指定组织,还要再读输入框数据
				var inputText = secondIdText.replace("content","paramValueName");
				itemObj.paramValueName = $("#"+inputText).val();
				var inputTextId = secondIdText.replace("content","paramValue");
				itemObj.paramValue = $("#"+inputTextId).val();
			}
			if(participantScope == "317"){//如果是表达组织,还要再读下拉框的数据
				var formValueSelectId = secondIdText.replace("content","paramValue");
				var selectedValue = $("#"+formValueSelectId).val();
				var selectedText = $("#"+formValueSelectId).find("option:selected").text();
				itemObj.paramValue = selectedValue;
				itemObj.paramValueName = selectedText;
			}
			
			
		}else if(userType==4){//选择的是相对参与人,读取第2行的下拉框选择数据
			var senderText = firstIDText.replace("chooseType","participantScope");
			itemObj.participantScope = $("#"+senderText).val();
			itemObj.participantScopeName =  $("#"+senderText).find("option:selected").text();
		}else if(userType==5){//选择的是通用角色
			var idNameText = firstIDText.replace("chooseType","participantIdName");
			itemObj.participantIdName = $("#"+idNameText).val();
			var idText = firstIDText.replace("chooseType","participantId");
			itemObj.participantId = $("#"+idText).val();
			itemObj.participantScope = "51";
			
			var statusId = firstIDText.replace("chooseType","status");
			itemObj.status =  $("#"+statusId).val(); 
		}
		
		trSort++;
		tempDataList.push(itemObj);
	});
	
	return tempDataList;	
}

/**
 * 当角色选择下拉框的值发生变化时触发的事件
 * @param obj
 */
function roleTypeRadioChange(obj){
	var name = obj.id;
	var nameArr = name.split("_");
	var blockType = nameArr[1];
	var trSort = nameArr[2];
	var value = obj.value;
	var subDivId = name.replace("participantScope","subcontent");
    var subcontentDiv = $("#"+subDivId);
    subcontentDiv.html("");//将第2列的DIV清空
    
	if(value=="316"){
		subcontentDiv.html(getDiv3HtmlOfChooseTypeTextValue(blockType, trSort, value, '', '', ''));
	}else if(value=="317"){
		subcontentDiv.html(getDiv3HtmlOfChooseTypeFormValue(blockType, trSort, value, ''));
	}
	//showResultTextToLabel(blockType);
	var tableObj = $("#table_"+blockType);
	//动态初始化选择器
	$(tableObj).xljSingleSelectorUtil();
}

/**
 *人员和岗位的第二列下拉选择框的change事件
 * @param blockType
 * @param trSort
 * @param obj
 */
function scopeSelectChange(blockType , trSort, obj){
	var name = obj.name;
	var nameArr = name.split("_");
	var blockType = nameArr[1];
	var trSort = nameArr[2];
	var value = obj.value;
	var divId = name.replace("participantScope", "content");
	var div3Obj = $("#"+divId);
	div3Obj.html("");//将第3列的DIV清空
	if(value == "11" || value == "21"){//指定人员或岗位
		div3Obj.html( getDiv3HtmlOfChooseTypeTextValue(blockType, trSort, value, '', '','') );
	}else{//
		div3Obj.html( getDiv3HtmlOfChooseTypeFormValue(blockType, trSort, value, '') );
	}
	var tableObj = $("#table_"+blockType);
	//动态初始化选择器
	$(tableObj).xljMultipleSelectorUtil();
	//showResultTextToLabel(blockType);
}

/**
 * 表单数据的下拉框的change事件处理方法
 * @param obj--select标签本身
 * @param valueType 2-表单人员  4-表单岗位  7-表单组织
 */
function commonIDSelectChange(obj, valueType){//2-表单人员  4-表单岗位  7-表单组织
	var idText = obj.id;
	var selIndex = obj.options.selectedIndex;
	var selVal = obj.options[selIndex].value;
	var idItems = idText.split("_");
	var sortText = idItems[2];//1--tr的序号
	var sort = parseInt(sortText);
	var blockType = idItems[1];
	//showResultTextToLabel(blockType);
}

/**
 * 第一列的用户类型下拉框的change事件处理方法
 * @param obj --select标签本身
 */
function typeSelectChange(obj){
	var idText = obj.id;
	var selIndex = obj.options.selectedIndex;
	var selVal = obj.options[selIndex].value;
	//idText=userType_one_1
	var idItems = idText.split("_");
	var sortText = idItems[2];//1--tr的序号
	var sort = parseInt(sortText);
	var blockType = idItems[1];
	//根据选中的值对第二列做相应的调整
	var div2Obj = $("#table_"+blockType+" tr:eq("+(sort-1)+")>td:eq(1)>div"); 
	div2Obj.html("");//将第2列的DIV清空
	var div3Obj = $("#table_"+blockType+" tr:eq("+(sort-1)+")>td:eq(2)>div"); 
	div3Obj.html("");//将第3列的DIV清空
	if(1==selVal || 2==selVal){//选定的是1-人员 或2-岗位
		var tempValue = (selVal==1)?11:21;
		div2Obj.html( getDiv2HtmlOfChooseType(selVal, blockType, sort, tempValue) );
		$("#subcontent_"+blockType+"_"+sort).remove();
		//div3Obj.removeClass("radio-style");
		div3Obj.removeClass("form-inline");
		div3Obj.html( getDiv3HtmlOfChooseTypeTextValue(blockType, sort, tempValue, '', '', '') );
	}else if(3==selVal){//选定的是角色
		div2Obj.html( getDiv2HtmlOfRoleType(blockType, sort) );
		//class="form-inline"  class="radio-style"
		div3Obj.addClass("form-inline");
		var div3ObjHtml = div3Obj.html();
		div3Obj.html( getDiv3HtmlOfRoleType(blockType, sort, 2, '',''));
		//去除标准岗位时，范围选择中“指定组织” update by dingguanghuai on 2017/11/02
		div3Obj.find('select option[value="316"]').remove();
	}else if(4==selVal){//选定的是相对参与人
		div2Obj.html( getDiv2HtmlOfSender(blockType, sort,'41'));
		//showResultTextToLabel(blockType);	
	}else if(5==selVal){//选定的是通用角色
		div2Obj.html( getDiv2HtmlOfCommonRole(blockType, sort));
		//showResultTextToLabel(blockType);	
	}  
	var tableObj = $("#table_"+blockType);
	//动态初始化选择器
	$(tableObj).xljMultipleSelectorUtil();
}
/**
 * 根据type, blockType, trSort 返回角色类型的第二个div内容html代码
 * @param type
 * @param blockType
 * @param trSort
 */
function getDiv2HtmlOfSender(blockType, trSort, senderValue){
	var senderHeader = "<select class=\"form-control addInputWidth\" id='participantScope_"+blockType+"_"+trSort+"'" +
			" onchange=\"senderChange('"+blockType+"','"+trSort+"',this)\"" +
					" name='participantScope_"+blockType+"_"+trSort+"'>";
	for(var s=0; s<senderArr.length; s++){
		if(senderValue == 40+s){
			senderHeader += "<option value ='"+(40+s)+"' selected='selected'>"+senderArr[s]+"</option>";
		}else{
			senderHeader += "<option value ='"+(40+s)+"' >"+senderArr[s]+"</option>";
		}
	}
	senderHeader += "</select>"
	return senderHeader;
}

function senderChange(blockType , trSort, obj){
	//showResultTextToLabel(blockType);
}

/**
 * 根据type, blockType, trSort 返回角色类型的第二个div内容html代码
 * @param type
 * @param blockType
 * @param trSort aramValueName
 */
function getDiv3HtmlOfRoleType(blockType, trSort, roleType, paramValueName, paramValue){
	var orgArray = ["","本集团","本公司","本部门","本项目","本分期","指定组织","表单组织"];
	var htmlContent = "";
	/*var htmlHeader = "<input name='participantScope_"+blockType+"_"+trSort+"' type='radio'";
	var htmlEnder = " onchange=\"roleTypeRadioChange(this)\"  />";
	for(var oi=1; oi<=7; oi++){
		if(roleType==oi+310){//311, 312, 313, 314, 315, 316, 317
			htmlContent += htmlHeader +" value='31"+oi+"' checked "+htmlEnder+"<span>"+orgArray[oi]+"</span>";
		}else{
			htmlContent += htmlHeader +" value='31"+oi+"'"+ htmlEnder+"<span>"+orgArray[oi]+"</span>";
		}
	}*/
	/* -- -----------------------新修改为下拉框的部分begin----------------------------------- */
	var htmlHeader = "<select class=\"form-control\" style=\"width:50%;\" id='participantScope_"+blockType+"_"+trSort+"'" +
			" onchange=\"roleTypeRadioChange(this)\" > ";
	var htmlMiddle = "";
	for(var oi=1; oi<=7; oi++){
		if(roleType==oi+310){//311, 312, 313, 314, 315, 316, 317
			htmlMiddle += " <option value='31"+oi+"' selected >"+orgArray[oi]+"</option> ";
		}else{
			htmlMiddle += " <option value='31"+oi+"' >"+orgArray[oi]+"</option> ";
		}
	}
	htmlContent = htmlHeader + htmlMiddle + " </select>";
	/* -- -----------------------新修改为下拉框的部分end----------------------------------- */
	
	var moreHtml = "";
	if(roleType == "316"){//指定组织
		moreHtml = getDiv3HtmlOfChooseTypeTextValue(blockType, trSort, roleType, paramValueName, paramValue);
	}else if(roleType == "317"){//表单组织
		moreHtml = getDiv3HtmlOfChooseTypeFormValue(blockType, trSort, roleType, paramValue);
	}
	return htmlContent + "<div class=\"pull-right\" style=\"width:50%;\" id='subcontent_"+blockType+"_"+trSort+"'>"+moreHtml+"</div>";
}
/**
 * 根据type, blockType, trSort 返回角色类型的第二个div内容html代码
 * @param type
 * @param blockType
 * @param trSort
 */
function getDiv2HtmlOfRoleType(blockType, trSort, valueText, valueId, status){
	var valueHtml = "";
	var redFontHtml = "";
	var titleHintHtml = "";
	if(valueText && valueText.length>=1){
		valueHtml = "value='"+valueText+"'";
		titleHintHtml = " title=\""+valueText+"\" ";
		if(status=="0" || status==0){
			redFontHtml = " style=\"color:#FF0000;\" ";
		}
	}
	
	var valueIdHtml = "";
	if(valueId && valueId.length>=1){
		valueIdHtml = "value='"+valueId+"'";
	}
	
	return "<div class=\"input-group\" style=\"width:100%;\">"+
    "<input type=\"text\" class=\"form-control\" "+titleHintHtml+" "+redFontHtml+"  id='participantIdName_"+blockType+"_"+trSort+"'" +
    " name='participantIdName_"+blockType+"_"+trSort+"' " +
    " placeholder='请选择...' "+valueHtml+" readonly='true'>"+
    "<input type='hidden' id='participantId_"+blockType+"_"+trSort+"' name='participantId_"+blockType+"_"+trSort+"' "+valueIdHtml+"/>"+
    "<input type='hidden' id='status_"+blockType+"_"+trSort+"' name='status_"+blockType+"_"+trSort+"' value='"+status+"' />"+
    //"<span class=\"input-group-addon w28\" onclick=\"chooseOuterData('"+blockType+"','"+trSort+"','31')\" >" +
    "<span class=\"input-group-addon w28 multiple-selector\" id='participantId_"+blockType+"_"+trSort+"_31' data-selectorType='role' data-treeParam='{\"type\":1}'  data-savecallback=\"multiSelectorCallback\" data-title=\"选择标准岗位\">" +
    "<a href=\"javascript:void(0);\" class=\"fa fa-ellipsis-h\" aria-hidden=\"true\"></a></span></div>";
}

/**
 * 根据type, blockType, trSort 返回角色类型的第二个div内容html代码
 * @param type
 * @param blockType
 * @param trSort
 */
function getDiv2HtmlOfCommonRole(blockType, trSort, valueText, valueId, status){
	var valueHtml = "";
	var redFontHtml = "";
	var titleHintHtml = "";
	if(valueText && valueText.length>=1){
		valueHtml = "value='"+valueText+"'";
		titleHintHtml = " title=\""+valueText+"\" ";
		if(status=="0" || status==0){
			redFontHtml = " style=\"color:#FF0000;\" ";
		}
	}
	var valueIdHtml = "";
	if(valueId && valueId.length>=1){
		valueIdHtml = "value='"+valueId+"'";
	}
	
	return "<div class=\"input-group\" style=\"width:100%;\">"+
    "<input type=\"text\" class=\"form-control\" id='participantIdName_"+blockType+"_"+trSort+"' "+titleHintHtml+" "+redFontHtml+
    " name='participantIdName_"+blockType+"_"+trSort+"' "+" placeholder='请选择...' "+valueHtml+" readonly='true'>"+
    
    "<input type='hidden' id='participantId_"+blockType+"_"+trSort+"' name='participantId_"+blockType+"_"+trSort+"' "+valueIdHtml+"/>"+
    "<input type='hidden' id='status_"+blockType+"_"+trSort+"' name='status_"+blockType+"_"+trSort+"' value='"+status+"'/>"+
    //"<span class=\"input-group-addon w28\" onclick=\"chooseOuterData('"+blockType+"','"+trSort+"','31')\" >" +
    "<span class=\"input-group-addon w28 multiple-selector\" id='participantId_"+blockType+"_"+trSort+"_51' data-selectorType='role' data-treeParam='{\"type\":0}' data-savecallback=\"multiSelectorCallback\" >" +
    "<a href=\"javascript:void(0);\" class=\"fa fa-ellipsis-h\" aria-hidden=\"true\"></a></span></div>";
}


/**
 * 单选框的回调函数处理事件
 * @param data
 * @param ele
 */
function singleSelectorCallback(data, ele){
	var idText = ele.id;
	var idItems = idText.split("_");
	var idName = idItems[0];
	var blockType = idItems[1];
	var trSort = idItems[2];
	var busiType = idItems[3];
	var showTextId = "",hidenTextId="";
	var showTextId = "",hidenTextId="";
	var statusId = "status_"+blockType+"_"+trSort;
	if(busiType=="316"){
		showTextId = "paramValueName_"+blockType+"_"+trSort;
		hidenTextId = "paramValue_"+blockType+"_"+trSort;
		statusId = "statusValue_"+blockType+"_"+trSort;
	}else{
		showTextId = "participantIdName_"+blockType+"_"+trSort;
		hidenTextId = "participantId_"+blockType+"_"+trSort;
	}
	$("#"+showTextId).val(data.prefixName+"/"+data.name);
	$("#"+hidenTextId).val(data.id);
	$("#"+statusId).val("1");
	//showResultTextToLabel(blockType);
}

/**
 * 多选框的回调函数的处理逻辑
 * @param data
 * @param ele
 */
function multiSelectorCallback(data, ele){
	
	var idText = ele.id;
	var idItems = idText.split("_");
	var idName = idItems[0];
	var blockType = idItems[1];
	var trSort = idItems[2];
	var busiType = idItems[3];
	var showTextId = "",hidenTextId="";
	
	console.log("multiSelectorCallback--busiType="+busiType);
	if(data.length>=1){
		var firstItem = data[0];
		var statusTextId = "status_"+blockType+"_"+trSort;
		if(busiType=="316"){
			showTextId = "paramValueName_"+blockType+"_"+trSort;
			hidenTextId = "paramValue_"+blockType+"_"+trSort;
			statusTextId = "paramStatus_"+blockType+"_"+trSort;
		}else{
			showTextId = "participantIdName_"+blockType+"_"+trSort;
			hidenTextId = "participantId_"+blockType+"_"+trSort;
		}
		$("#"+showTextId).val(firstItem.name);
		$("#"+statusTextId).val("1");
		console.log("multiSelectorCallback statusTextId="+statusTextId+"=>>"+$("#"+statusTextId).val());
		if(busiType == "11"){//选择人员的情况,需要把对应的岗位带过去 postId
			$("#"+showTextId).val(firstItem.prefixName+"/"+firstItem.postName+"/"+firstItem.name);
			$("#"+hidenTextId).val(firstItem.userId+"&&"+firstItem.postId);
		}else if(busiType == "21" || busiType == "51" ){
			$("#"+showTextId).val(firstItem.prefixName+"/"+firstItem.name);
			$("#"+hidenTextId).val(firstItem.id);
		} else{
			$("#"+hidenTextId).val(firstItem.id);
		}
		
		if(busiType == "31"){
			$("#"+showTextId).val(firstItem.prefixName+"/"+firstItem.name);
		}
		
		if(data.length>1){
			for(var idx=1; idx<data.length; idx++){
				var nextItem = data[idx];
				addMoreRow(blockType, busiType, idx+0.5, nextItem);
			}
		}else{
			var tableDataList = getTableAllTRTDData(blockType);
			$.each(tableDataList,function(index,singleItem){//遍历mapList的数组数据
				singleItem.sort = singleItem.sort+1;
			});
			tableDataList = changeArraySort(tableDataList);
			redrawTBodyOfTable(blockType, tableDataList);
		}
		//showResultTextToLabel(blockType);
	}
} 

/**
 * 添加多行的数据行
 * @param blockIdx
 * @param busiType
 * @param newSort
 * @param nextItem
 */
function addMoreRow(blockIdx, busiType, newSort, nextItem){
	var tableDataList = getTableAllTRTDData(blockIdx);
	$.each(tableDataList,function(index,singleItem){//遍历mapList的数组数据
		singleItem.sort = singleItem.sort+1;
	});
	var newObj = new Object();
	newObj.blockIdx = blockIdx;
	//新增的对象默认: 角色-本公司
	newObj.sort = 100+newSort;
	newObj.status = "1";
	if(busiType == "11"){
		newObj.participantType = "1";
		newObj.participantTypeName = "人员";
		newObj.participantScope = '11';
		newObj.participantScopeName = '指定人员';
		newObj.participantId = nextItem.userId+"&&"+nextItem.postId;//人员ID+岗位ID
		//newObj.participantIdName = nextItem.name;
		newObj.participantIdName = nextItem.prefixName+"/"+nextItem.postName+"/"+nextItem.name;
	}
	if(busiType == "21"){
		newObj.participantType = "2";
		newObj.participantTypeName = "岗位";
		newObj.participantScope = '21';
		newObj.participantScopeName = '指定岗位';
		newObj.participantId = nextItem.id;
		newObj.participantIdName = nextItem.prefixName+"/"+nextItem.name;
	}
	if(busiType == "31"){
		newObj.participantType = "3";
		newObj.participantTypeName = "角色";
		newObj.participantScope = '312';
		newObj.participantScopeName = '本公司';
		newObj.participantId = nextItem.id;
		//newObj.participantIdName = nextItem.name;
		newObj.participantIdName = nextItem.prefixName+"/"+nextItem.name;
	}
	if(busiType == "51"){
		newObj.participantType = "5";
		newObj.participantTypeName = "通用角色";
		/*newObj.participantScope = '312';
		newObj.participantScopeName = '本公司';*/
		newObj.participantId = nextItem.id;
		newObj.participantIdName = nextItem.prefixName+"/"+nextItem.name;
	}

	tableDataList.push(newObj);
	//将数组重新排序, 然后绘制表格
	tableDataList = changeArraySort(tableDataList);
	redrawTBodyOfTable(blockIdx, tableDataList);
}

//----------------------------------------------------------------------------
var selectd_blockType = "";
var selectd_trSort;
var selectd_busiType;

function chooseOuterData(blockType,trSort,busiType){
	var paramData = new Object();
	selectd_blockType = blockType;
	selectd_trSort = trSort;
	selectd_busiType = busiType;
	var title = "", busiUrl = "";
	if("11"==busiType){
		title = "指定人员的选择"; 
		busiUrl = hostUrl+"sys/org/user/getUserTree";
		paramData.userStatus = 1;
		paramData.userDelFlag = 0;
		paramData.rootStatus = 1;
		paramData.rootDelFlag = 0;
		paramData.orgStatus = 1;
		paramData.orgDelFlag = 0;
/*sys/org/user/getUserTree
目录父ID>parentId
目录禁用状态>rootStatus:0禁用，1启用
目录删除状态>rootDelFlag:0正常，1删除
组织禁用状态>orgStatus:0禁用，1启用
组织删除状态>orgDelFlag:0正常，1删除
用户禁用状态>userStatus:0禁用，1启用
用户删除状态>userDelFlag:0正常，1删除
*/
	}else if("21"==busiType){
		title = "指定岗位的选择";
		busiUrl = hostUrl+"sys/org/post/getPostTree";
		paramData.rootStatus = 1;
		paramData.rootDelFlag = 0;
		paramData.orgStatus = 1;
		paramData.orgDelFlag = 0;
		paramData.postStatus = 1;
		paramData.postDelFlag = 0;	
/*/sys/org/post/getPostTree
目录父ID>parentId
目录禁用状态>rootStatus:0禁用，1启用
目录删除状态>rootDelFlag:0正常，1删除
组织禁用状态>orgStatus:0禁用，1启用
组织删除状态>orgDelFlag:0正常，1删除
岗位禁用状态>postStatus:0禁用，1启用
岗位删除状态>postDelFlag:0正常，1删除
*/
	}else if("31"==busiType){
		title = "标准角色的选择";
		busiUrl = hostUrl+"sys/org/roleCatalog/getRoleTree";
		paramData.roleCataStatus = 1;
		paramData.roleCataDelFlag = 0;
		paramData.status = 1;
		paramData.delflag = 0;
/*
 sys/org/roleCatalog/getRoleTree
目录禁用状态>roleCataStatus:0禁用，1启用
目录删除状态>roleCataDelFlag:0正常，1删除
角色禁用状态>status:0禁用，1启用
角色删除状态>delflag:0正常，1删除
是否查询角色>isRole:Y是，N否(默认为Y)
角色类型>type:0虚拟角色，1标准角色
*/
	}else if("316"==busiType){
		title = "指定组织的选择";
		busiUrl = hostUrl+"sys/org/root/getTree";
		paramData.rootStatus = 1;
		paramData.rootDelFlag = 0;
		paramData.orgStatus = 1;
		paramData.orgDelFlag = 0;
/*目录禁用状态>rootStatus:0禁用，1启用
目录删除状态>rootDelFlag:0正常，1删除
组织禁用状态>orgStatus:0禁用，1启用
组织删除状态>orgDelFlag:0正常，1删除
*/
	}
	$("#modal-title").html(title);//修改标题
	$("#modalWindow").modal("show");
	queryzTree(busiUrl, paramData);
}

/**
 * 根据type, blockType, trSort 返回选择类型的第二个div内容html代码
 * @param type
 * @param blockType
 * @param trSort
 * @returns{String}
 */
function getDiv2HtmlOfChooseType(type, blockType, trSort, typeValue){
	var scopeHeader = "<select class=\"form-control addInputWidth\" id='participantScope_"+blockType+"_"+trSort+"'" +
	" onchange=\"scopeSelectChange('"+blockType+"','"+trSort+"',this)\"" +
			" name='participantScope_"+blockType+"_"+trSort+"'>";
	var dataIdArray;
	if(1==type){
		dataIdArray = ["11","12"];
		dataNameArray = ["指定人员","表单人员"];
	} else if(2==type){
		dataIdArray = ["21", "22"];
		dataNameArray = ["指定岗位","表单岗位"];
	}
	for(var idx=0; idx<2; idx++){
		if(typeValue == dataIdArray[idx]){
			scopeHeader += "<option value ='"+dataIdArray[idx]+"' selected='selected'>"+dataNameArray[idx]+"</option>";
		}else{
			scopeHeader += "<option value ='"+dataIdArray[idx]+"' >"+dataNameArray[idx]+"</option>";
		}
	}
	scopeHeader += "</select>";
	return scopeHeader;
}

/**
 * 根据blockType, trSort, typeValue 返回选择类型指定数据的第3个div内容html代码
 * @param blockType
 * @param trSort
 * @returns{String} 
 */ 
function getDiv3HtmlOfChooseTypeTextValue(blockType, trSort, typeValue, paramValueName, paramValue, status){
	var valueNameHtml = "";
	var redFontHtml = "";
	var titleHintHtml = "";
	if(paramValueName && paramValueName.length>=1){
		valueNameHtml = " value='"+paramValueName+"'";
		titleHintHtml = " title='"+paramValueName+"' ";
		if(status=="0" || status==0){
			redFontHtml = " style=\"color:#FF0000;\" ";
		}
	}
	
	console.log("getDiv3HtmlOfChooseTypeTextValue  paramValueName="+paramValueName+";  titleHintHtml="+titleHintHtml);
	
	if(status=="0" || status==0){
		status = "0";
	}else{
		status = "1";
	}
	
	var valueHtml = "";
	if(paramValue && paramValue.length>=1){
		valueHtml = " value='"+paramValue+"'";
	}
	
	var idText = "participantId";
	if("316" == typeValue){
		idText = "paramValue";
	}
	if("11" == typeValue || "21" == typeValue){
		var roleText = " data-selectorType='person' ";
		roleText += " data-treeparam='{userStatus:true}' ";
		if("21" == typeValue){
			roleText = " data-selectorType='post' ";
		}
		return "<div class=\"input-group addInputWidth\" style=\"width:100%\">"+
        "<input type=\"text\" "+titleHintHtml+"  "+redFontHtml+" class=\"form-control\" id='"+idText+"Name_"+blockType+"_"+trSort+"'" +
        " name='"+idText+"Name_"+blockType+"_"+trSort+"' placeholder='请选择...' "+valueNameHtml+" readonly='true'>"+
        " <input type='hidden' id='"+idText+"_"+blockType+"_"+trSort+"' name='"+idText+"_"+blockType+"_"+trSort+"' "+valueHtml+" readonly='true'/>"+
        " <input type='hidden' id='status_"+blockType+"_"+trSort+"' name='status_"+blockType+"_"+trSort+"' value='"+status+"' readonly='true'/>"+
        //"<span class=\"input-group-addon w28\" onclick=\"chooseOuterData('"+blockType+"','"+trSort+"','"+typeValue+"')\" >" +
        "<span class=\"input-group-addon w28 multiple-selector\" targetId='"+idText+"Name_"+blockType+"_"+trSort+"' id='participantIdDiv_"+blockType+"_"+trSort+"_"+typeValue+"' "+roleText+"  data-savecallback=\"multiSelectorCallback\" >" +
        "<a href=\"javascript:void(0);\" class=\"fa fa-ellipsis-h\" aria-hidden=\"true\"></a></span></div>";
	}else{
		return "<div class=\"input-group\" style=\"float:right;width:100%;\">"+
		"<input type=\"text\" class=\"form-control\" id='"+idText+"Name_"+blockType+"_"+trSort+"' " +
		" name='"+idText+"Name_"+blockType+"_"+trSort+"' placeholder='请选择...' "+titleHintHtml+"  "+redFontHtml+" "+valueNameHtml+" readonly='true' >"+
		" <input type='hidden' id='"+idText+"_"+blockType+"_"+trSort+"' name='"+idText+"_"+blockType+"_"+trSort+"' "+valueHtml+" readonly='true'/>"+
		" <input type='hidden' id='statusValue_"+blockType+"_"+trSort+"' name='statusValue_"+blockType+"_"+trSort+"' value='"+status+"' readonly='true'/>"+
		 //"<span class=\"input-group-addon w28\" onclick=\"chooseOuterData('"+blockType+"','"+trSort+"','"+typeValue+"')\" >" +
		 "<span class=\"input-group-addon w28 single-selector\" id='participantIdDiv_"+blockType+"_"+trSort+"_"+typeValue+"' data-selectorType='org' data-savecallback=\"singleSelectorCallback\" >" +
		 "<a href=\"javascript:void(0);\" class=\"fa fa-ellipsis-h\" aria-hidden=\"true\"></a></span></div>";
	}
	
}

/**
 * 根据blockType, trSort, typeValue 返回选择类型表单数据的第3个div内容html代码
 * @param blockType
 * @param trSort
 * @returns{String}
 */
function getDiv3HtmlOfChooseTypeFormValue(blockType, trSort, typeValue, selectedValue){
	var idText = "participantId";
	if("317" == typeValue){
		idText = "paramValue";
	}
	var headerContent = "<select class=\"form-control addInputWidth\"" +
			" id='"+idText+"_"+blockType+"_"+trSort+"' name='"+idText+"_"+blockType+"_"+trSort+"' " +
			" onchange=\"commonIDSelectChange(this, "+typeValue+")\" >";//formValueChange
	var middleContent = ""; 
	$.each(variableList,function(index,item){//遍历mapList的数组数据
		//console.log("index="+index+">>> item="+JSON.stringify(item));
		var keyName = item.keyName;
		if(!keyName || keyName=="" || keyName==null || keyName=="null"){
			keyName = item.code;
		}
		if(selectedValue==item.id || selectedValue==item.id+"&&"+keyName){
			middleContent += "<option value="+item.id+"&&"+keyName+" selected>"+item.name+"</option>";
		}else{
			middleContent += "<option value="+item.id+"&&"+keyName+">"+item.name+"</option>";
		}
		
	});//$.each(resultList
 	return headerContent + middleContent + "</select>";
}

/**
 * 获取通用表格的可直接提交的数据,
 * @param tableKey: tableId的关键字 one/two
 * @param flId: 模板ID
 * @param acId: 环节ID
 * @param readFlag: 是否为可阅读人
 */
function getSubmitDataListofCommonTable(tableKey, flId, acId, readFlag){
	var tempList = getTableAllTRTDData(tableKey);
	var dataList = new Array();
	$.each(tempList,function(index,item){//遍历mapList的数组数据
		var participant = new Object();
		////type flId acId paramValue  sort
		participant.flId = flId;
		if(readFlag==true){//可阅读人不需要设置acId
			participant.type = 3;
		}else{//审批人和抄送人需要设置acId
			participant.type = item.type;
			participant.acId = acId;
		}
		participant.sort = item.sort;
		if(item.paramValue && item.paramValue.length >=1){
			participant.paramValue = item.paramValue;
		}
		if(item.participantId && item.participantId.length >=1){
			participant.participantId = item.participantId;
		}
		//participantId  participantType  participantScope  
		participant.participantType = item.participantType;
		participant.participantScope = item.participantScope;
		//针对人员类型的11范围进行特殊的调整
		if(participant.participantType == "1" && participant.participantScope=="11"){
			var partIdText = participant.participantId;
			if(partIdText.indexOf("&&")>0){
				var valueArray = partIdText.split("&&");
				participant.participantId = valueArray[0];
				participant.paramValue = valueArray[1];
			}
			//console.log("participant json="+JSON.stringify(participant));
		}
		dataList.push(participant);
	});
	return dataList;
}

/**
 * 实现在表格下方显示该表格所有的选择项的组合文本描述
 * @param blockType
 */
/*function showResultTextToLabel(blockType){
	var dataList = getTableAllTRTDData(blockType);
	var showDataText = "";
	$.each(dataList,function(index,item){//遍历mapList的数组数据
		var userType = item.participantType;
		var userTypeText = "";
		var scopeText = getParticipantScopeText(item.participantScope);
		if(userType == "1"){
			userTypeText = item.participantIdName+"/"+scopeText+"(人员)";
		}else if(userType == "2"){
			userTypeText = item.participantIdName+"/"+scopeText+"(岗位)";;
		}else if(userType == 3){
			var scope = item.participantScope;
			var roleHeader = item.participantIdName;
			if(scope == "316" || scope == "317"){
				roleHeader = item.participantIdName+"/"+item.paramValueName;
			}
			userTypeText = roleHeader +"/"+scopeText+"(角色)";
		}else if(userType == 4){
			var senderText = getParticipantScopeText(item.participantScope);
			userTypeText = senderText+"(相对参与人)";
		}else if(userType == 5){//通用角色
			var senderText = getParticipantScopeText(item.participantScope);
			userTypeText = item.participantIdName+"/"+senderText;
		}
		showDataText += userTypeText+";<br> ";
	});
	北京公司/成本部/张三（人员）;<br/>北京公司/财务经理（岗位）;<br/>成本经理/本公司（角色）；<br/>
	成本经理/指定组织/北京公司（角色）；<br/>成本经理/单据组织/北京公司（角色）；<br/>
	经办人（表单人员）；<br/>部门会计（表单岗位）<br/>
	$("#showResultText_"+blockType).html(showDataText);
}*/

/**
 * 根据chooseType返回对应的中文业务术语
 * @param chooseType
 * @returns
 */
function getParticipantScopeText(chooseType){
	var numValues = ["11","12","21","22",//4
	                 "31","311","312","313",  "314","315","316","317"//8
	                 ,"40","41","42","43","44"//5
	                 ,"51"];//1
	
	var typeNames = ["指定人员","表单人员","指定岗位","表单岗位"//4
	                 ,"指定角色","本集团","本公司","本部门",  "本项目","本分期","指定组织","表单组织"
	                 ,"发起人","发起人直接领导","发起人顶级部门领导", "上一环节审批人直接领导","上一环节审批人顶级部门领导",
	                 "通用角色"];
	var idx = jQuery.inArray(chooseType+"", numValues);
	return typeNames[idx];
}

//----------------------- 模态弹出框部分  begin ----------------------------------
/**
 * 将模态弹出框选中的数据传回给页面,并关闭模态弹出层
 */
function submitAndCloseModelWindow(){
	var showTextId = "",hidenTextId="";
	if(selectd_busiType=="316"){
		showTextId = "paramValueName_"+selectd_blockType+"_"+selectd_trSort;
		hidenTextId = "paramValue_"+selectd_blockType+"_"+selectd_trSort;
	}else{
		showTextId = "participantIdName_"+selectd_blockType+"_"+selectd_trSort;
		hidenTextId = "participantId_"+selectd_blockType+"_"+selectd_trSort;
	}
	$("#"+showTextId).val(returnPopName);
	$("#"+hidenTextId).val(returnPopId);
	returnPopId = "";
	returnPopName = "";
	closeModelWindow();
	//showResultTextToLabel(selectd_blockType);
}

/**
 * 直接关闭模态弹出层
 */
function closeModelWindow(){
	$("#modalWindow").modal("hide");
}
//------------------------ 模态弹出框部分  end ----------------------------------

//----------------------- zTree 配置部分  begin ----------------------------------
//zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）

//ztree的setting参数
var setting ={
		view:{
			dblClickExpand: false,  
			showLine: true,  
			selectedMulti: true,
			//fontCss: getFont,
			fontCss: getFontCss,
			nameIsHTML: true
		},  
		edit:{  
			enable: true,
			showRemoveBtn:false,
			showRenameBtn:false,
			drag:{  
				autoExpandTrigger: true,  
				prev: null,  
				inner: null,  
				next: null,
				isCopy: false,
				isMove: false
			}
		 },  
		data:{
			keep:{
				leaf: true,
				parent: true
			},
			simpleData:{
				enable: true
			}
		},
		callback:{  
	        onClick: zTreeOnClick, //点击节点事件
	        beforeDrag: null, //拖拽前：捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作  
	        beforeDrop: null, //拖拽中：捕获节点操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作  
	        beforeDragOpen: null, //拖拽到的目标节点是否展开：用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作  
	        onDrag: null, //捕获节点被拖拽的事件回调函数  
	        onDrop: null, //捕获节点拖拽操作结束的事件回调函数  
	        onExpand: null //捕获节点被展开的事件回调函数  
		}  
};

/**
 * 重写getFontCss的函数
 * @param treeId
 * @param treeNode
 * @returns
 */
function getFontCss(treeId, treeNode){
	return (!!treeNode.highlight) ?{color:"#A60000", "font-weight":"bold"} :{color:"#333", "font-weight":"normal"};
}

/**
 * 递归树匹配节点icon
 * @param arr
 */
function recursionArray(arr){
  for(var i in arr){
  	if(arr[i].pId == 0){
          arr[i].icon = "../../sys/css/zTreeStyle/img/diy/main.png";
    }else{
          arr[i].icon = "../../sys/css/zTreeStyle/img/diy/1_open.png";
    } 
  }
}

/**
 * 处理节点点击事件
 * @param event
 * @param treeId
 * @param treeNode
 */
function zTreeOnClick(event, treeId, treeNode){
	returnPopId = treeNode.id;
	returnPopName = treeNode.name;
}

/**
 * 隐藏或显示Tree
 */
$('.sidebar-toggle').click(function(){
    if($('body').hasClass('sidebar-collapse')){
        $('.collapse_btn_container').css('borderBottom','1px solid #ddd').children('span').show();
        $('#zTreeId').css('display','block');
        $(this).children('span').removeClass('glyphicon-menu-right').addClass('glyphicon-menu-left');
    }else{
        $('.collapse_btn_container').css('borderBottom','0px').children('span').hide();
        $('#zTreeId').css('display','none');
        $(this).children('span').removeClass('glyphicon-menu-left').addClass('glyphicon-menu-right');
    }
});


var key;
var lastValue = "", nodeList = [], fontCss ={};

/**
 * 获取业务对象树的通用方法
 * @param busiUrl
 */
function queryzTree(busiUrl, paramData){
	$.ajax({
	  type: "post",
	  url:busiUrl,
	  dataType:"json",
	  contentType: "application/json;charset=utf-8",
	  data: JSON.stringify(paramData),
	  success: function(json){
	      var zNodes = json.result;
	      recursionArray(zNodes);
	      zTreeObj = $.fn.zTree.init($("#zTreeId"), setting, zNodes);
	     
	      //-----对二级和三级节点自动展开----begin----
	      var treeObj = $.fn.zTree.getZTreeObj("zTreeId");
          var nodes = treeObj.getNodes();
          for (var i = 0; i < nodes.length; i++){ //设置节点展开
              treeObj.expandNode(nodes[i], true, false, true);//展开二级节点
              var pNode = nodes[i];
              if(pNode.isParent){
            	  var subnodes = pNode.children;
            	  for(var j=0; j<subnodes.length; j++){
            		  treeObj.expandNode(subnodes[j], true, false, true);//展开三级节点
            	  }
              }
          }// //-----对二级和三级节点自动展开----end----
          
          //------------------处理输入框关键字--------------------------------
          key = $("#key");
          key.bind("focus", focusKey).bind("blur", blurKey)
			.bind("propertychange", searchNode).bind("input", searchNode);
	  }
	})
}

/**
 * focusKey事件的处理方法
 * @param e
 */
function focusKey(e){
	if (key.hasClass("empty")){
		key.removeClass("empty");
	}
}

/**
 * blurKey事件的处理方法
 * @param e
 */
function blurKey(e){
	if (key.get(0).value === ""){
		key.addClass("empty");
	}
}

/**
 * searchNode事件的处理方法
 * @param e
 */
function searchNode(e){
	var zTree = $.fn.zTree.getZTreeObj("zTreeId");
	var keyType = "name";
	var value = $.trim(key.get(0).value);
	if (lastValue === value) return;
	lastValue = value;
	if (value === "") return;
	updateNodes(false);
	
	nodeList = zTree.getNodesByParamFuzzy(keyType, value);
	for(var i=0;i<nodeList.length;i++){
		var node=nodeList[i];
		var parentNode=node.getParentNode();
		if(parentNode && !parentNode.open){
			zTree.expandNode(parentNode,true,false,false,false);
		}
	}
	updateNodes(true);
}

/**
 * 对节点进行高亮显示
 * @param highlight
 */
function updateNodes(highlight){
	var zTree = $.fn.zTree.getZTreeObj("zTreeId");
	for( var i=0, l=nodeList.length; i<l; i++){
		nodeList[i].highlight = highlight;
		zTree.updateNode(nodeList[i]);
	}
}
//----------------------- zTree 配置部分  end ----------------------------------

//---------------------  回写显示部分通用的逻辑   begin -----------------------------
//var userKey = "user";
var postUserKey = "postUser";

var userArray = new Array();
var postKey = "post";
var postArray = new Array();
var roleKey = "role";
var roleArray = new Array();
var orgKey = "org";
var orgArray = new Array();
var formValueIdArray = new Array();//表单变量的ID数组
var formValueNameArray = new Array();//表单变量的name数组
var resDataIdArray = new Array();//指定资源的ID数组
var resDataNameArray = new Array();//指定资源的name数组
var resDataStatusArray = new Array();//指定资源的status数组
/**
 * 获取表单变量的数据列表
 */
function queryFormValueList(busiObjectId){
	var paramData ={delflag:false, businessObjectId: busiObjectId}; //{ delflag:false };
	$.ajax({ //发送更新的ajax请求
	    type: "POST",  
	    url: hostUrl+"flow/businessObjectVariable/queryList",    
	    dataType:"json",  
	    async: false,
	    data:  JSON.stringify(paramData),//此处必须JSON.stringify(paramData)
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){
	    	variableList = data.result;
	    	
	    	//先清空数组的数据,然后压入查询到的数据
	    	formValueIdArray.length = 0;
	    	formValueNameArray.length = 0;
	    	$.each(variableList,function(index, item){//遍历mapList的数组数据
	    		formValueIdArray.push(item.id); 
	    		formValueNameArray.push(item.name);
	    	});//$.each(appList	
	    },  
	    error: function(data){  
	    	if(data.msg){
	    		alert(data.msg);
	    	}else{
	    		alert("查询业务变量列表数据的接口异常");
	    	}
	    }  
	});//end-for $.ajax({
}

function queryFormValueListByVariableIds(variableIds){
	var paramData ={delflag:false, variableIds: variableIds.join(",")}; 
	$.ajax({ //发送更新的ajax请求
	    type: "POST",  
	    url: hostUrl+"flow/businessObjectVariable/queryListByParamMap",    
	    dataType:"json",  
	    async: false,
	    data:  JSON.stringify(paramData),//此处必须JSON.stringify(paramData)
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){
	    	variableList = data.result;
	    	
	    	//先清空数组的数据,然后压入查询到的数据
	    	formValueIdArray.length = 0;
	    	formValueNameArray.length = 0;
	    	$.each(variableList,function(index, item){//遍历mapList的数组数据
	    		formValueIdArray.push(item.id); 
	    		formValueNameArray.push(item.name);
	    	});//$.each(appList	
	    },  
	    error: function(data){  
	    	if(data.msg){
	    		alert(data.msg);
	    	}else{
	    		alert("查询业务变量列表数据的接口异常");
	    	}
	    }  
	});
}

/**
 * 根据给定的参数查询,查询对应的资源数据列表
 * @param paramData：给定的参数
 */
function queryResDataList(paramData){
	var postdata={ paramData:paramData };
	$.ajax({ //发送更新的ajax请求
	    type: "POST",  
	    url: hostUrl+"sys/org/orgnazation/queryResListByIds?_t="+new Date().getTime(),    
	    dataType:"json",  
	    async: false,
	    data:  JSON.stringify(postdata),//此处必须JSON.stringify(paramData)
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){
	    	var resDataList = data.result;
	    	//先清空数组的数据, 然后压入查询到的数据    
	    	resDataIdArray.length = 0;
	    	resDataNameArray.length = 0;  
	    	resDataStatusArray.length = 0; 
	    	$.each(resDataList,function(index, item){//遍历mapList的数组数据
	    		resDataIdArray.push(item.id); 
	    		resDataNameArray.push(item.prefixName);
	    		if(item.status==0 || item.status=="0" ){
	    			item.status = "0";
	    		}else{
	    			item.status = "1";
	    		}
	    		resDataStatusArray.push(item.status);
	    	});//$.each(appList	
	    },  
	    error: function(data){  
	    	if(data.msg){
	    		alert(data.msg);
	    	}else{
	    		alert("查询资源数据的接口异常");
	    	}
	    }  
	});//end-for $.ajax({
}

/**
 * 为查询资源数据准备查询参数(user/post/role/org)
 * @param personList: 获取到的参与人数据
 */
function prepareParamDataForResData(personList){
	for(var idx=0; idx<personList.length; idx++){
		var item = personList[idx];
		var scope = item.participantScope;
		scope = scope+"";
		if(scope == "11"){//指定人员
			userArray.push(item.participantId+"&&"+item.paramValue);
			//userArray.push(item.participantId);
		}else if(scope == "21"){//指定岗位
			postArray.push(item.participantId);
		}else if(scope.startWith("31") || scope == "51"){//选择了角色
			roleArray.push(item.participantId);
			if(scope=="316"){
				orgArray.push(item.paramValue);
			}
		}
	}
	var typeArray = [postUserKey, postKey, roleKey, orgKey];
	var idArray = [userArray, postArray, roleArray, orgArray];
	var paramArray = new Array();
	for(var i=0; i<typeArray.length; i++){
		var idItemArray = idArray[i];
		if(idItemArray.length>0){
			var obj = new Object();
			obj.type = typeArray[i];
			obj.ids = idArray[i];
			paramArray.push(obj);
		}
	}
	return paramArray;
}

/**
 *  对查询数据进行后处理加工,以便进行Table TR TD的展示
 *  此方法是table tr td中通用的
 * @param resultList 
 * @returns 返回经加工处理的数据列表
 */
function getDataListAfterPostDataProcess(resultList, businessObjectId){
	if(!resultList || resultList.length==0){//如果为空或没有数据,则不进行处理
		return;
	}
	var paramArray = prepareParamDataForResData(resultList);//先准备查询的数据
	queryFormValueList(businessObjectId);
	queryResDataList(paramArray);
	$.each(resultList,function(index,item){//遍历resultList的数组数据
 	   item.participantTypeText = typeItemArray[item.participantType];
 	   item.participantScopeName = getParticipantScopeText(item.participantScope);
 	   var scope = item.participantScope;
 	   
 	   if(scope == "11" || scope == "21" || scope.startWith("31") || scope == "51"){
 		   item.participantIdName = getResDataText(item.participantId);
 		   item.status = getResDataStatus(item.participantId);
 		   if(scope == "316"){
 			  item.paramValueName = getResDataText(item.paramValue);
 			  item.status = getResDataStatus(item.paramValue);
 			  console.log("316--- item.status="+item.status);
 		   }
 		  console.log("getDataListAfterPostDataProcess >>>Name="+item.participantTypeText+" status="+item.status);
 	   }else if(scope == "12" || scope == "22"){
 		   item.participantIdName = getFormValueText(item.participantId);
 	   }else if(scope == "317"){
 		   item.paramValueName = getFormValueText(item.paramValue);
 	   }
 	   if(item.type=="1" || item.type =="3"){
 		  item.blockIdx ="one";
 	   }else{
 		  item.blockIdx ="two";
 	   }
 	});	
	return resultList;
}

//批量修改可阅读人前的获取可阅读人的数据
function getReaderDataListForBatchModify(resultList){
	if(!resultList || resultList.length==0){//如果为空或没有数据,则不进行处理
		return;
	}
	var paramArray = prepareParamDataForResData(resultList);//先准备查询的数据
	var variableIds = new Array();
	for(var idx=0; idx<resultList.length; idx++){
		var itemData = resultList[idx];
		var scope = itemData.participantScope;
		if(scope == "12" || scope == "22"){
			variableIds.push(itemData.participantId);
	 	}else if(scope == "317"){
	 		variableIds.push(itemData.paramValue);
	 	}
	}
	//console.log("variableIds="+JSON.stringify(variableIds));
	if(variableIds && variableIds.length>0){
		queryFormValueListByVariableIds(variableIds);
	}
	
	queryResDataList(paramArray);
	$.each(resultList,function(index,item){//遍历resultList的数组数据
 	   item.participantTypeText = typeItemArray[item.participantType];
 	   item.participantScopeName = getParticipantScopeText(item.participantScope);
 	   var scope = item.participantScope;
 	   if(scope == "11" || scope == "21" || scope.startWith("31")){
 		   item.participantIdName = getResDataText(item.participantId);
 		   item.status = getResDataStatus(item.participantId);
 		   if(scope == "316"){
 			  item.paramValueName = getResDataText(item.paramValue);
 			  item.status = getResDataStatus(item.paramValue);
 			  console.log("001-0002 >>> item.status="+item.status);
 		   }
 	   }else if(scope == "12" || scope == "22"){
 		   item.participantIdName = getFormValueText(item.participantId);
 	   }else if(scope == "317"){
 		   item.paramValueName = getFormValueText(item.paramValue);
 	   }
 	   
 	});	
	return resultList;
}

/**
 * 根据表单的ID获得对应的ID值
 * @param formValueId
 * @returns{String}
 */
function getFormValueText(formValueId){
	var idx = jQuery.inArray(formValueId, formValueIdArray);
	var retText = formValueNameArray[idx];
	if(!retText){
		retText = "暂无";
	}
	return retText;
}

/**
 * 根据资源数组的ID,获取对应的Name值
 * @param resDataId
 * @returns ID对应的Name值
 */
function getResDataText(resDataId){
	var idx = jQuery.inArray(resDataId, resDataIdArray);
	var retText = resDataNameArray[idx];
	if(!retText){
		retText = "暂无";
	}
	return retText;
}

/**
 * 根据资源数组的ID,获取对应的Name值
 * @param resDataId
 * @returns ID对应的Name值
 */
function getResDataStatus(resDataId){
	var idx = jQuery.inArray(resDataId, resDataIdArray);
	var retStatus = resDataStatusArray[idx];
	if(retStatus !="1" || retStatus!=1){
		retStatus = "0";
	}
	return retStatus;
}

//----------------------  回写显示部分通用的逻辑   end -----------------------------