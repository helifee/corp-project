/**
 * 组织机构列表
 * @author shiyong
 */
//全局参数
//组织机构树
var zTreeObj;
//按岗位的岗位jqgrid
var jqGridPost;
//按岗位的用户jqgrid
var jqGridPostUser;
//按用户的用户jqgrid
var jqGridUser;
//按用户的岗位jqgrid
var jqGridUserPost;
//按岗位已选择的岗位ID
var impostId ="";
//按用户已选择的用户ID
var imuserId ="";
//已选择的组织机构树的节点
var imtreeId;
//设置管辖范围自动带过去的组织机构Id
var imScopeOrgId;

//包含上下级组织0不包含，1包含
var includelow = "0";

//选中行Id
var userOnId;
var ppOnId;
//设置管辖范围选中行Id
var selectScopeId;

var xljUtilOrg = $.xljUtils;
//组织机构树 的参数配置
var setting = {
		view: {
            dblClickExpand: false,  
            showLine: false,
            selectedMulti: false,
            fontCss: getFontCss,
            nameIsHTML: true
        },  
	edit: {  
		enable: true,
		showRemoveBtn:false,
        showRenameBtn:showRenameBtn,
        drag: {  
            autoExpandTrigger: true,  
            prev: dropPrev,  
            inner: dropInner,  
            next: dropNext,
            isCopy: false,
            isMove: true
        }
        
    },  
    data: {
    	keep: {
			leaf: false,
			parent: true
		},
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeDrag: beforeDrag, //拖拽前：捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作  
        beforeDrop: beforeDrop, //拖拽中：捕获节点操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作  
        beforeDragOpen: beforeDragOpen, //拖拽到的目标节点是否展开：用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作  
        onDrag: onDrag, //捕获节点被拖拽的事件回调函数  
        onDrop: onDrop, //捕获节点拖拽操作结束的事件回调函数
        onCollapse: function(){
            $.xljUtils.treeResizeFn();
        },
        onExpand: onExpand, //捕获节点被展开的事件回调函数  
        beforeRename: zTreeBeforeRename,//编辑节点之前
        onRename: zTreeOnRename,//编辑节点之后
        onClick:zTreeOnClick //点击节点事件
        ,onRightClick:OnRightClick
    }  
};



//拖拽树的参数
var log, className = "dark", curDragNodes, autoExpandNode;
var source;
var target;
var type;
//树 搜索名称参数
var lastValue = "", nodeList = [], fontCss = {};

/**
 * 初始化按岗位的岗位列表
 */
function initJqGridPost(){
    var ubody = "sys/org/post/queryPostListByOrgId";
    var uall = hostUrl+ubody;
    //创建jqGrid组件
    jqGridPost = jQuery("#listPost").jqGrid(
        {
            url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            contentType : "application/json",
            postData:{"orgId":"","ifDownPost":"0"},
            datatype : "json",
            rownumbers: true,
			width:$('.mytable').width(),
			height:$('.mytable').height()-45,
            jsonReader : {
                root:"result"
            },
            multiselect: true,//复选框   
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',label : '序号',width : 55,align : "center" ,hidden : true},
                {name : 'prefixName',label : '所属机构',width : 360,align : "center"},
                {name : 'name',label : '岗位名称',width : 180,align : "center"},
                {name : 'type',label : '岗位类型',width : 180,align : "center", formatter:postTypeFmatter},
                {name : 'leaderId',label : '直属领导岗位',width : 207,align : "center",hidden : true},
//                {name : 'leaderPrefixName',label : '直属领导岗位所属组织',width : 207,align : "center"},
                {name : 'leaderName',label : '直属领导岗位',width : 207,align : "center"}
            ],
            rowNum : -1,//一页显示多少条
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            onCellSelect:function(rowid){
            onCellSelect:function(rowid, index, contents, event){
            	var flag=false;
            	var ids=$(this).jqGrid('getGridParam','selarrrow');
            	$.each(ids, function(i,val){
           			if(rowid == val){
           				flag=true;//之前被选中，现在被取消
           			}
            	});
            	if(flag){
            		rowid="";
            	}
//            	ppOnId=rowid;
            	var queryData={
            			"postId":rowid
            	};
            	jqGridPostUser.jqGrid("setGridParam", { postData: queryData }).trigger("reloadGrid");
            },
            loadError:function(xhr,status,error){
            	pop_tip_open("red","初始化按岗位的岗位列表请求失败");
            },
            gridComplete: function(){
	           	 if(ppOnId.length >0){
//	        		 $(this).jqGrid("setSelection",ppOnId);
	           		$.each(ppOnId, function(i,val){
	           			$(this).jqGrid("setSelection",val);
	            	});
	        	 }else{
	        		 $(this).jqGrid("setSelection",ppOnId);
	        	 }
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
				
	        },
			gridComplete: function () {
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
			},
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}
/**
 * 初始化按岗位的人员列表
 */
function initJqGridPostUser(){
    var ubody = "sys/org/user/queryUserListByPostId";
    var uall = hostUrl+ubody;
    jqGridPostUser = jQuery("#listPostUser").jqGrid({
        url: uall,
        ajaxGridOptions: { contentType: 'application/json' },
        mtype : "POST",
        contentType : "application/json",
        datatype : "json",
		width:$('.mytable').width(),
		height:$('.mytable').height()-45,
        postData:{"postId":""},
        loadonce:false,
        jsonReader : {
            root:"result"
        },
        rownumbers: true,
        colModel : [
            {name : 'id',label : '序号',width : '5%',align : "center",hidden : true},
            {name : 'realName',label : '用户名',width : '20%',align : "center",cellattr: addCellAttr},
            {name : 'loginName',label : '登录账号',width : '20%',align : "center"},
            {name : 'type',label : '用户类型',width : '10%',align : "center",formatter:jqGridPostUserTypeFmatter},
            {name : 'status',label : '状态',width : '10%',align : "center",formatter:statusFmatter,cellattr: addCellAttr},
            {name : 'createDate',label : '创建时间',width : '15%',align : "center"},
            {name : 'mobile',label : '手机号',width : '15%',align : "center"}
        ],
        loadError:function(xhr,status,error){
        	pop_tip_open("red","初始化按岗位的岗位列表请求失败");
        },
		gridComplete: function () {
			$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
		},
       rowNum : -1,//一页显示多少条
        viewrecords : true
    });
}

/**
 * 追加表格数据，模拟分页
 * TODO
 */
//初始化数据
var pageFlag=true;
var limit=50;//每页条数，更改只需更改此参数
var start=limit;//下拉分页初始条数
function addGridPage(){
	var gridH=$('#ascrail2000');
	var gridHight=$('#ascrail2000').height();
	var scroll=gridH.find('div')[0];
	var top=$(scroll).css('top').replace('px','');
	var sH=$('#ascrail2000 div').height();
	if(gridHight-top-sH<=30 && pageFlag){
		pageFlag=false;
		var queryDataUser=getUserQuery();
		queryDataUser.start=start;
		queryDataUser.limit=limit;
		//请求数据
		var ubody = "sys/org/user/queryUserListByOrgId";
		var uall = hostUrl+ubody;
		$.ajax({
			type:'POST',
			url:uall,
			dataType:'json',
			contentType:'application/json',
			data:JSON.stringify(queryDataUser),
			success: function(json) {
				if(json.success == true){
					var dataRow=json.result;
					if(dataRow.length>0){
						jqGridUser.jqGrid("addRowData","id", dataRow, "last");
						pageFlag=true;
						start=start+limit;
						if(isUpdateUser==true){
							updateUserGridSort();
						}
					}
				}else{
					pop_tip_open("red",json.msg);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				pop_tip_open("red","查询列表请求失败");
			}
		})
	}
}
/**
 * 初始化人员jqgrid数据
 */
var postQueryKey;
function initJqGridUser(){
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl+ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listUser").jqGrid(
        {
            url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            contentType : "application/json",
            postData:{"orgId":"","includelow":"0","fristLimit":limit},
            datatype : "json",
			width:$('.mytable').width(),
			height:$('.mytable').height()-45,
			jsonReader : {
                root:"result"
            },
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                {name : 'realName',label : '用户名',width : 90,align : "center",cellattr: addCellAttr},
                {name : 'loginName',label : '账号',width : 90,align : "center"},
                {name : 'belongOrgId',label : '所属机构',width : 164,align : "center",hidden : true},
                {name : 'prefixName',label : '所属机构',width : 164,align : "center"},
                {name : 'type',label : '用户类型',width : 90,align : "center",formatter:jqGridPostUserTypeFmatter},
                {name : 'createDate',label : '创建时间',width : 120,align : "center"},
                {name : 'status',label : '状态',width : 90,align : "center",formatter:statusFmatter,cellattr: addCellAttr},
                {name : 'mobile',label : '手机号',width : 134,align : "center"},
                {name : 'sort',label : '排序号',width : 60,align : "center",editable : true},
            ],
            rowNum : -1,//一页显示多少条 -1全部
            rownumWidth:55,
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
            onCellSelect:function(rowid){
            	selectScopeId="";
            	postQueryKey=$("#postQueryKey").val();
                var queryData={
                    "userId":rowid,
                    "postQueryKey":postQueryKey
                };
                jqGridUserPost.jqGrid("setGridParam", { postData: queryData }).trigger("reloadGrid");

            },
            gridComplete: function(){
            	 if(userOnId){
            		 $(this).jqGrid("setSelection",userOnId);
            	 }
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
				
            },
            ondblClickRow:function(rowid){
            	editUserType = 1;
    			edit_userId=rowid;
    			window.open('user_edit.html');
            },
            loadError:function(xhr,status,error){
            	pop_tip_open("red","初始化人员列表请求失败");
            },
            viewrecords : true
        });
}

/**
 * 初始化按用户下岗位jqgrid数据
 */
function initJqGridUserPost(){
    var ubody = "sys/org/post/queryPostListByUserId";
    var uall = hostUrl+ubody;
    jqGridUserPost = jQuery("#listUserPost").jqGrid({
        url: uall,
        ajaxGridOptions: { contentType: 'application/json' },
        mtype : "POST",
        contentType : "application/json",
        datatype : "json",
		width:$('.mytable').width(),
		height:$('.mytable').height()-45,
        postData:{"userId":""},
        loadonce:false,
        jsonReader : {
            root:"result"
        },
        rownumbers: true,
//        multiselect: true,//复选框
        colModel : [
				//{name : 'id',label : '序号',width : 55,align : "center",hidden : true},
				{name : 'id',label : '序号',width : 55,align : "center",hidden : true},
				{name : 'tragtId',label : '目标id',width : 55,align : "center",hidden : true},
				{name : 'refId',label : '所属组织机构Id',width : 55,align : "center",hidden : true},
				{name : 'prefixName',label : '所属机构',width : 360,align : "center"},
				//{name : 'name',label : '角色名称',width : 100,align : "center"},
				{name : 'roleId',label : '岗位名称',width : 100,align : "center",hidden : true},
				{name : 'roleName',label : '岗位名称',width : 100,align : "center",cellattr: addCellAttr},
				//{name : 'type',label : '角色类型',width : 100,align : "center", formatter:postTypeFmatter},
				//{name : 'roleType',label : '角色类型',width : 100,align : "center"},
				{name : 'roleTypeId',label : '类型',width : 100,align : "center",formatter:roleTypeFmatter},
				{name : 'leaderId',label : '直属领导岗位id',width : 207,align : "center",hidden : true},
				{name : 'leaderName',label : '直属领导岗位',width : 207,align : "center"},
				{name : 'status',label : '状态',width : 80,align : "center",hidden : true},
				{name : 'isDefault',label : '是否主岗',width : 80,align : "center", formatter:isDfaultFmatter}
				//{name : 'orgIds',label : '管辖范围Ids',align : "center",hidden : true},
				//{name : 'orgNames',label : '管辖范围',width : 80,align : "center"}
        ],
        rowNum : -1,//一页显示多少条
        gridComplete: function(){
			 if(selectScopeId){
				 $(this).jqGrid("setSelection",selectScopeId);
			 }
			$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
       },
        loadError:function(xhr,status,error){
        	pop_tip_open("red","初始化按用户下岗位列表请求失败");
        },
//        rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
//        pager : '#pager5',
        viewrecords : true
    });
}

/**
 * 根据用户ID删除用户
 */
function delUserById(){
	//选中用户
	var ids=jqGridUser.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择用户");
	}else{
		pop_text_open("blue",'确认删除这个用户吗？',function(){
			var urlBody = "sys/org/user/deletePseudoBatch/"+ids;
			var urlAll = hostUrl + urlBody;
			$.ajax({
				type:'DELETE',
				url:urlAll,
				async: false,
				dataType:'json',
				contentType:'application/json',
				data:"{}",
				success: function(json) {
					if(json.success == true){
						pop_tip_open("green","删除成功");
						//焦点上移
		            	var lastId = '';
						if($("#listUser #"+ids).prev().length >0){
							lastId=$("#listUser #"+ids).prev()[0].id;//获取选择数据上一行的ID
						}
						if(lastId!='' && lastId!=null){
							userOnId=lastId;
						}
						userQuery();
					}else{
						pop_tip_open("red",json.msg);
					}
					
					var lastId = '';
					if($("#listUser #"+ids).prev().length >0){
						lastId=$("#listUser #"+ids).prev()[0].id;//获取选择数据上一行的ID
					}
					if(lastId!='' && lastId!=null){
						userOnId=lastId;
					}
				},error:function(XMLHttpRequest, textStatus, errorThrown){
					pop_tip_open("red","删除用户请求失败");
				}
			})
		},true);
	}
}

/**
 * 删除组织
 */
function delOrgAndCheck(){
	hideRMenu();
	var nodes = zTreeObj.getSelectedNodes();
//	console.log(nodes[0].children);
	if(nodes.length != 1 ){
		pop_tip_open("blue","请选择一个组织机构");
		return false;
	}/*else if(nodes[0].children!=null && nodes[0].children.length >0){
		pop_tip_open("blue","存在下级节点，不可删除");
		return false;
	}*/else if(nodes[0].type == 'cata'){
		pop_tip_open("blue","根目录不可删除");
		return false;
	}else{
		pop_text_open("blue",'确定删除此组织及其下级组织吗？',function(){
	        var urlBody = "sys/org/orgnazation/deletePseudo/"+nodes[0].id;
	        var urlAll = hostUrl + urlBody;
	        $.ajax({
	        	type:'DELETE',
	        	url:urlAll,
	        	async: false,
	        	dataType:'json',
	        	contentType:'application/json',
	        	data:'{}',
	        	success: function(json) {
	        		if(json.success == true){
	        			var fNode=nodes[0].getParentNode();//父节点
	        			var preNode=nodes[0].getPreNode();//上一个节点
	        			//删除选中的节点及其子节点
	        			zTreeObj.removeChildNodes(nodes[0]);
	        			zTreeObj.removeNode(nodes[0]);
	        			if(fNode.children==null || fNode.children.length ==0){
	        				fNode.isParent=false;
	        				zTreeObj.updateNode(fNode);
	        			}
	        			//焦点上移
	        			if(preNode!=null){
	        				zTreeObj.selectNode(preNode);
	        			}else{
	        				zTreeObj.selectNode(fNode);
	        			}
	        			pop_tip_open("green","删除成功");
	        		}else{
	        			pop_tip_open("red",json.msg);
	        		}
	        	},error:function(XMLHttpRequest, textStatus, errorThrown){
	        		pop_tip_open("red","删除组织机构请求失败");
	        	}
	        })
	    },true);
	}
}

/**
 * 禁用或启用组织
 */
function lockOrUnLockOrg(status){
	hideRMenu();
	var nodes = zTreeObj.getSelectedNodes();
//	console.log(nodes[0].children);
	if(nodes.length != 1 ){
		pop_tip_open("blue","请选择一个组织机构");
		return false;
	}else{
		if(nodes[0].type == 'cata'){
			pop_tip_open("blue","不能从根目录进行禁用启用");
			return false;
		}
		var data={
				orgId:nodes[0].id,
				status:status
		};
		var statusStr=status==0?"禁用":"启用";
		var urlBody = "sys/org/orgnazation/updateOrgStatus";
		var urlAll = hostUrl + urlBody;
		$.ajax({
			type:'PUT',
			url:urlAll,
			dataType:'json',
			contentType:'application/json',
			data:JSON.stringify(data),
			success: function(json) {
				if(json.success == true){
					lockOrUnNodes(status, nodes[0]);
					pop_tip_open("green",statusStr+"成功");
				}else{
					pop_tip_open("red",json.msg);
				}
			},error:function(XMLHttpRequest, textStatus, errorThrown){
				pop_tip_open("red",statusStr+"请求失败");
			}
		})
	}
}
/**
 * 用户模糊查询
 */
function userQuery(userType){
	resetParam();
	var queryDataUser=getUserQuery(userType);
	jqGridUser.jqGrid("setGridParam", { postData: queryDataUser }).trigger("reloadGrid");
	var queryDataUserPost={
			"userId":userOnId
			};
	selectScopeId="";
	jqGridUserPost.jqGrid("setGridParam", { postData: queryDataUserPost }).trigger("reloadGrid");
}
//重置
function resetParam(){
	pageFlag=true;
	noPost=null;
	userStatus=null;
	start=limit;
}
var noPost=null;
var userStatus=null;
/**
 * 获取用户查询条件
 * @param queryDataUser
 */
function getUserQuery(userType){
	userQueryKey=$("#userQueryKey").val();
	var nodes = zTreeObj.getSelectedNodes();
	var queryDataUser={};
	if(userType !=null && userType !=undefined && userType==0){
		userStatus=0;
		noPost=null;
		userOnId="";
	}else if(userType !=null && userType !=undefined && userType==1){
		userStatus=null;
		noPost=0;
		userOnId="";
	}
	queryDataUser={
			userStatus:userStatus,
			noPost:noPost
	};
	if(nodes.length < 1 ){
		queryDataUser.orgId="";
	}else{
		if(nodes[0].type == 'cata'){
			queryDataUser.orgId="";
		}else{
			queryDataUser.orgId=nodes[0].id;
		}
	}
	queryDataUser.includelow=includelow;
	queryDataUser.userQueryKey=userQueryKey;
	queryDataUser.fristLimit=limit;
	return queryDataUser;
}
/**
 * 岗位模糊查询
 */
function postQuery(rowId){
	//选中用户
	var ids=jqGridUser.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择用户");
	}else{
		//模糊查询值
		postQueryKey=$("#postQueryKey").val();
		var queryData={
			"userId":ids,
			"postQueryKey":postQueryKey
		};
		selectScopeId=rowId;
		jqGridUserPost.jqGrid("setGridParam", { postData: queryData }).trigger("reloadGrid");
	}
}
/**
 * 按岗位--岗位模糊查询
 */
function orgPostQuery(){
	//选中组织
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		pop_tip_open("blue","请先选择组织机构");
	}else{
		if(nodes[0].type == 'cata'){
			if($("#postDiv")[0].style.display == "block"){
				pop_tip_open("blue","不能选择根目录");
			}
			return false;
		}
		var treeorgId = nodes[0].id;
		
		if(treeorgId == "" || treeorgId == null){
			pop_tip_open("blue","请选择组织");
		}else{
			//模糊查询值
			orgPostQueryKey=$("#orgPostQueryKey").val();
			var queryDataPost={
				"orgId":treeorgId,
				"orgPostQueryKey":orgPostQueryKey,
				ifDownPost:ifDownPost
			};
			jqGridPost.jqGrid("setGridParam", { postData: queryDataPost }).trigger("reloadGrid");
			var queryDataPostUser={
				"postId":""
			};
			jqGridPostUser.jqGrid("setGridParam", { postData: queryDataPostUser }).trigger("reloadGrid");
		}
	}
}
/**
 * 设置主岗
 */
function setDefaultPost(){
	var rowId=jqGridUserPost.jqGrid('getGridParam','selrow');
	if(null == rowId){
		pop_tip_open("blue","请选择岗位");
	}else{
		var rowData = jqGridUserPost.jqGrid('getRowData',rowId);
		if(rowData.roleTypeId=="虚拟角色"){
			pop_tip_open("blue","虚拟角色不可设置主岗");
			return false;
		}
		var userId=jqGridUser.jqGrid('getGridParam','selrow');
		var dataJson={
				id:rowData.id,
				userId:userId
		};
		var urlBody = "sys/org/postUser/setDefaultPost";
	    var urlAll = hostUrl + urlBody;
		$.ajax({
	        type:'PUT',
	        url:urlAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(dataJson),
	        success: function(json) {
	        	selectScopeId=rowId;
	            if(json.success == true){
	            	pop_tip_open("green","设置成功");
	            	postQuery(rowId);
	            }else{
	            	pop_tip_open("red",json.msg);
	            }
	        },error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","设置主岗请求失败");
	        }
	    })
	}
}

/**
 * 设置显示编辑按钮
 * @param treeId
 * @param treeNode
 * @returns {Boolean}
 */
function showRenameBtn(treeId, treeNode) {
	if(treeNode.type == "cata"){
		return false;
	}else{
		return true;
	}
}

/**
 * 用于捕获节点编辑名称结束（Input 失去焦点 或 按下 Enter 键）之后，更新节点名称数据之前的事件回调函数，并且根据返回值确定是否允许更改名称的操作
 * @param treeId
 * @param treeNode
 * @param newName
 * @param isCancel
 * @returns {Boolean}
 */
function zTreeBeforeRename(treeId, treeNode, newName, isCancel) {
	if(newName == ""){
		pop_tip_open("blue","名称不能为空");
		return false;
	}
	if(newName.length > 200){
		pop_tip_open("blue","名称长度不能大于200");
		return false;
	}
	var pNode = treeNode.getParentNode();
	var prefixNames = "";
	var prefixIds = "";
	if(pNode!=null){
		if(pNode.type == "cata"){
			prefixNames = newName;
			prefixIds = treeNode.id;
		}else{
			prefixNames = pNode.prefixName+"/"+newName;
			prefixIds = pNode.prefixId+"/"+treeNode.id;
		}
	}else{
		prefixNames = newName;
		prefixIds = treeNode.id;
	}
	var urlBody = "sys/org/orgnazation/update/"+treeNode.id;
    var urlAll = hostUrl + urlBody;
    newName=$.xljUtils.htmlEncode(newName);
    prefixNames=$.xljUtils.htmlEncode(prefixNames);
    var updatedata ={
			name:newName,
			prefixName:prefixNames,
			prefixId:prefixIds
	};
	$.ajax({
		type:'PUT',
        url:urlAll,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(updatedata),
        success: function(json) {
            if(json.success == true){
            	pop_tip_open("green","修改成功");
            	return true;
            }else{
            	pop_tip_open("blue",json.msg);
            	return false;
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","修改组织名称请求失败");
        	return false;
        }
    })
}

/**
 * 用于捕获节点编辑名称结束之后的事件回调函数。
 * @param event
 * @param treeId
 * @param treeNode
 * @param isCancel
 */
function zTreeOnRename(event, treeId, treeNode, isCancel) {
	
//	alert(treeNode.id + ", " + treeNode.name);
}





/**
 * 拖拽回调方法
 */
function getFont(treeId, node) {
    return node.font ? node.font : {};
}
/**
 * 拖拽到目标节点时，设置是否允许移动到目标节点前面的操作
 * @param treeId
 * @param nodes
 * @param targetNode
 * @returns {Boolean}
 */
function dropPrev(treeId, nodes, targetNode) {  
    var pNode = targetNode.getParentNode();  
    if (pNode && pNode.dropInner === false) {  
        return false;  
    } else {  
        for (var i=0,l=curDragNodes.length; i<l; i++) {  
            var curPNode = curDragNodes[i].getParentNode();  
            if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {  
                return false;  
            }  
        }  
    }  
    return true;  
}
/**
 * 拖拽到目标节点时，设置是否允许成为目标节点的子节点
 * @param treeId
 * @param nodes
 * @param targetNode
 * @returns {Boolean}
 */
function dropInner(treeId, nodes, targetNode) {  
    if (targetNode && targetNode.dropInner === false) {  
        return false;  
    } else {  
        for (var i=0,l=curDragNodes.length; i<l; i++) {  
            if (!targetNode && curDragNodes[i].dropRoot === false) {  
                return false;  
            } else if (curDragNodes[i].parentTId && curDragNodes[i].getParentNode() !== targetNode && curDragNodes[i].getParentNode().childOuter === false) {  
                return false;  
            }  
        }  
    }  
    return true;  
} 
/**
 * 拖拽到目标节点时，设置是否允许移动到目标节点后面的操作
 * @param treeId
 * @param nodes
 * @param targetNode
 * @returns {Boolean}
 */
function dropNext(treeId, nodes, targetNode) {  
    var pNode = targetNode.getParentNode();  
    if (pNode && pNode.dropInner === false) {  
        return false;  
    } else {  
        for (var i=0,l=curDragNodes.length; i<l; i++) {  
            var curPNode = curDragNodes[i].getParentNode();  
            if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {  
                return false;  
            }  
        }  
    }  
    return true;  
}  

/**
 * 拖拽前：捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作  
 * @param treeId
 * @param treeNodes
 * @returns {Boolean}
 */
function beforeDrag(treeId, treeNodes) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" beforeDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes." );
	for (var i=0,l=treeNodes.length; i<l; i++) {
		if (treeNodes[i].drag === false) {
			curDragNodes = null;
			return false;
		} else if (treeNodes[i].parentTId && treeNodes[i].getParentNode().childDrag === false) {
			curDragNodes = null;
			return false;
		}
	}
	curDragNodes = treeNodes;
	return true;
}
/**
 * 拖拽到的目标节点是否展开：用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作  
 * @param treeId
 * @param treeNode
 * @returns {Boolean}
 */
function beforeDragOpen(treeId, treeNode) {
	autoExpandNode = treeNode;
	return true;
}
/**
 * 拖拽中：捕获节点操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作  
 * @param treeId
 * @param treeNodes
 * @param targetNode
 * @param moveType
 * @param isCopy
 * @returns {Boolean}
 */
function beforeDrop(treeId, treeNodes, targetNode, moveType, isCopy) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" beforeDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
	showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is "+ (isCopy==null? "cancel" : isCopy ? "copy" : "move"));
	//更改组织机构树组织机构顺序
	var urlBody = "sys/org/orgnazation/updateOrgSort";
    var urlAll = hostUrl + urlBody;
    var data ={
    		source:treeNodes[0],
    		target:targetNode,
    		type:moveType
    }
    var ret = false;
    $.ajax({
        type:'POST',
        url:urlAll,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(data),
        success: function(json) {
            if(json.success == true){
            	pop_tip_open("green",json.msg);
            	ret = true;
            }else{
            	pop_tip_open("blue",json.msg);
            	ret = false;
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","拖拽树请求失败");
        }
    })
	return ret;
}
/**
 * 捕获节点被拖拽的事件回调函数  
 * @param event
 * @param treeId
 * @param treeNodes
 */
function onDrag(event, treeId, treeNodes) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" onDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes." );
}
/**
 * 捕获节点拖拽操作结束的事件回调函数  
 * @param event
 * @param treeId
 * @param treeNodes
 * @param targetNode
 * @param moveType
 * @param isCopy
 */
function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" onDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
	showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is "+ (isCopy==null? "cancel" : isCopy ? "copy" : "move"))
}
/**
 * 捕获节点被展开的事件回调函数  
 * @param event
 * @param treeId
 * @param treeNode
 */
function onExpand(event, treeId, treeNode) {
	if (treeNode === autoExpandNode) {
		className = (className === "dark" ? "":"dark");
		showLog("[ "+getTime()+" onExpand ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name);
	}
    $.xljUtils.treeResizeFn();
}
//用户模糊查询
var userQueryKey;
/**
 * 组织机构树点击节点事件
 */
function zTreeOnClick(event, treeId, treeNode) {
	var treeorgId = "";
	if(treeNode.type == "cata"){
		treeorgId="";
	}else{
		treeorgId=treeNode.id;
	}
	//将选中行设置为空
	userOnId ="";
	//将引入用户和引入岗位的ID设置为空
	imuserId = "";
	impostId = "";
	imtreeId = treeorgId;
	selectScopeId = "";
	/*var queryDataPost={
			"orgId":treeorgId
			};
	var queryDataPostUser={
			"postId":""
			};
	jqGridPost.jqGrid("setGridParam", { postData: queryDataPost }).trigger("reloadGrid");
	jqGridPostUser.jqGrid("setGridParam", { postData: queryDataPostUser }).trigger("reloadGrid");*/
	orgPostQuery();
	userOnId="";
	userQuery();
}



/**
 * 树搜索方法，聚集焦点
 * 
 */

function focusKey(e) {
	if (key.hasClass("empty")) {
		key.removeClass("empty");
	}
}
/**
 * 树搜索方法，失去焦点
 * 
 */
function blurKey(e) {
	if (key.get(0).value === "") {
		key.addClass("empty");
	}
}
/**
 * 树搜索方法，点击图片
 * 
 */
function clickRadio() {
	/*lastValue = "";
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	var value = $.trim(key.get(0).value);
	//如果搜索框内无内容，不进行搜索，展开所有节点
	if(value == ""){
		zTree.expandAll(true);
		$.xljUtils.treeResizeFn();
	}else{
		searchNode();
	}*/
	 $.xljUtils._searchTreeBtnEvent(key,zTreeObj);
}
/**
 * 搜索节点
 * @param e
 */
function searchNode(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
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
			zTree.expandNode(parentNode,true,false,false,true);
			
		}
	}
	updateNodes(true);
	
}
/**
 * 改变父节点或子节点样式
 * @param status 0禁用，1启用
 * @param node 节点
 */
function lockOrUnNodes(status,node) {
	var zTree=$.fn.zTree.getZTreeObj("treeDemo");
	if(status == 0){
		lockAllChildrenNodes(node,zTree);
	}else{
		unLockAllParentNodes(node,zTree);
	}
}
/**
 * 禁用所有子节点
 * @param treeNode
 * @param result
 * @returns
 */
function lockAllChildrenNodes(treeNode,zTree){
	treeNode.status="0";
	zTree.updateNode(treeNode);
	var childrenNodes = treeNode.children;
	if (childrenNodes) {
		for (var i = 0; i < childrenNodes.length; i++) {
			//递归
			lockAllChildrenNodes(childrenNodes[i],zTree);
		}
	}
}
/**
 * 启用所有父节点
 * @param treeNode
 * @param result
 * @returns
 */
function unLockAllParentNodes(treeNode,zTree){
	treeNode.status=1;
	zTree.updateNode(treeNode);
	var pNode = treeNode.getParentNode();
	if(pNode!=null){
		unLockAllParentNodes(pNode,zTree);
	}
}

/**
 * 刷新tree节点
 * @param highlight
 */
function updateNodes(highlight) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	for( var i=0, l=nodeList.length; i<l; i++) {
		nodeList[i].highlight = highlight;
		zTree.updateNode(nodeList[i]);
	}
}
/**
 * 个性化文字样式，只针对 zTree 在节点上显示的对象
 * @param treeId
 * @param treeNode
 * @returns
 */
function getFontCss(treeId, treeNode) {
	/*return (!!treeNode.highlight) ? {color:'#A60000', "font-weight":"bold"} : {color:"#333", "font-weight":"normal"} | (treeNode.status&&treeNode.status=='0') ?
	        {'color':'#CD0000'} :
	        {color:"#333", "font-weight":"normal",'font-style':'normal'};*/
	/*return (treeNode.highlight) ?
		    {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'italic', "font-weight":"bold"} :
		        {color:"#333", "font-weight":"normal",'font-style':'normal'} | (treeNode.status&&treeNode.status=='0') ?
		        {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'normal', 'color':'#CD0000'} :
		        {color:"#333", "font-weight":"normal",'font-style':'normal'};*/
	return (treeNode.highlight&&treeNode.highlight=='true') ?
            {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'italic', "font-weight":"bold"} :
                {color:"#333", "font-weight":"normal",'font-style':'normal'} | (treeNode.status&&treeNode.status=='0') ?
                {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'normal', 'color':'#CD0000'} :
                {color:"#333", "font-weight":"normal",'font-style':'normal'};
}


/**
 * 拖拽显示日志
 */
function showLog(str) {
	if (!log) log = $("#log");
	log.append("<li class='"+className+"'>"+str+"</li>");
	if(log.children("li").length > 8) {
		log.get(0).removeChild(log.children("li")[0]);
	}
}
/**
 * 获取时间
 * @returns {String}
 */
function getTime() {
	var now= new Date(),
	h=now.getHours(),
	m=now.getMinutes(),
	s=now.getSeconds(),
	ms=now.getMilliseconds();
	return (h+":"+m+":"+s+ " " +ms);
}
/**
 * TODO设置拖拽时父节点自动展开是否触发 onExpand 事件回调函数
 */
function setTrigger() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.setting.edit.drag.autoExpandTrigger = $("#callbackTrigger").attr("checked");
}



/**
 * 递归设置树的图片样式
 */
function recursionArray(arr) {
	//所属的分类 diy-group 目录 diy-company 集团和公司;diy-program 项目和分期;diy-department 部门;
    for(var i in arr) {
    	if(arr[i].type == "zb" || arr[i].type == "company") {
            arr[i].iconSkin = "diy-company";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "dept" ) {
            arr[i].iconSkin = "diy-department";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "group" ) {
            arr[i].iconSkin = "diy-program";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "branch" ) {
            arr[i].iconSkin = "diy-program";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "cata" ) {
        	arr[i].iconSkin = "diy-group";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        } 
    }
};
//树搜索定义的输入框
var key = $("#key");
/**
 * 获取组织机构树
 */
function getOrgTree() {
	//获取组织机构树地址
    var urlBody = "sys/org/root/getOrgTreeByType";
    var urlAll = hostUrl + urlBody;
    var jsonData={
    		rootDelFlag:0,
    		orgDelFlag:0,
    		type:"all"
    };
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(jsonData),
        success: function(json) {
        	//返回的数据节点
            var zNodes = json.result;
            //设置图片样式
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);

            var nodes = zTreeObj.getNodes();
            //默认展开第一个节点
            zTreeObj.expandNode(nodes[0], true, false, false,false);
            key = $("#key");
            /*
			key.bind("focus", focusKey)
			.bind("blur", blurKey)
			.bind("propertychange", searchNode)
			.bind("input", searchNode);*/
            $.xljUtils._searchTreeInputEvent(key,zTreeObj);
            
            
			setTimeout(function(){
				$.xljUtils.addTreeScroll('ztree-box');
				$.xljUtils.treeResizeFn();
			},300);
			
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","获取组织机构树请求失败");
        }
    })
}



//点击的组织机构树的节点
var importroleOrgNode;
/**
 * 打开引入标准岗位方法
 */
function openImportRole(){
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		pop_tip_open("blue","请先选择组织机构");
	}else{
		if(nodes[0].type == 'cata'){
			pop_tip_open("blue","不能选择根目录");
			return false;
		}
		importroleOrgNode = nodes[0];
		window.open("organization_importrole.html");
	}
	
}
/**
 * 打开引入岗位方法
 */
function openImportPost(){
	var ids=jqGridUser.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择用户");
	}else{
		imuserId = ids;
		window.open("organization_importpost.html");
	}
	
}
/**
 * 引入用户
 */
function openImportUser(){
	//获取选择的岗位
	var ids=jqGridPost.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择岗位");
	}else{
		impostId = ids;
		window.open("organization_importuser.html");
	}
	
}

/**
 * 移除标准岗位
 */
function deleteRole(){
	//多选框获取IDS
	var ids=jqGridPost.jqGrid('getGridParam','selarrrow');
	//单选行获取一个ID
//	var ids=jqGridPost.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择岗位");
	}else{
		pop_text_open("blue","确定要移除这"+ids.length+"个标准岗位吗？",function(){
			var uBody = "sys/org/post/deletePseudoBatch/"+ids;
		    var uAll = hostUrl + uBody;
			$.ajax({
		        type:'DELETE',
		        url:uAll,
		        dataType:'json',
//		        contentType:'application/json',
//		        data:'{}',
		        success: function(json) {
		        	if(json.success == true){
		            	pop_tip_open("green",json.msg);
		            	orgPostQuery();
		            }else{
		            	pop_tip_open("red",json.msg);
		            }
		        },error:function(XMLHttpRequest, textStatus, errorThrown){
		        	pop_tip_open("red","移除标准岗位请求失败");
		        }
		    })
		},function(){
			
		});
	}
}

/**
 * 移除用户一岗多用户
 */
function deleteUser(){
	//多选框获取IDS
//	var ids=jqGridPostUser.jqGrid('getGridParam','selarrrow');
	//单选移除用户id
	var ids=jqGridPostUser.jqGrid('getGridParam','selrow');
	var list = new Array();
	if(null == ids){
		pop_tip_open("blue","请选择用户");
	}else{
		list.push(ids);
		//岗位ID
		var post_ids=jqGridPost.jqGrid('getGridParam','selrow');
		if(list.length == 0){
			pop_tip_open("blue","请选择用户");
		}else{
			pop_text_open("blue",'确定要移除这条用户吗？',function(){
				var deletedata ={
						userIds:list,
						postIds:post_ids,
						type:"users"
				}
				var uBody = "sys/org/postUser/deleteBatchByUserOrPostIds";
			    var uAll = hostUrl + uBody;
				$.ajax({
					type:'POST',
			        url:uAll,
			        async: false,
			        dataType:'json',
			        contentType:'application/json',
			        data:JSON.stringify(deletedata),
			        success: function(json) {
			            if(json.success == true){
			            	pop_tip_open("green",json.msg);
			            	var queryDataPostUser={
			            			"postId":post_ids
			            			};
			            	jqGridPostUser.jqGrid("setGridParam", { postData: queryDataPostUser }).trigger("reloadGrid");
			            }else{
			            	pop_tip_open("red",json.msg);
			            }
			        },error:function(XMLHttpRequest, textStatus, errorThrown){
			        	pop_tip_open("red","移除用户请求失败");
			        }
			    })
			},function(){
				
			});
		}
	}
}

/**
 * 移除岗位一用户多岗
 */
function deletePost(){
	//多选框获取IDS
//	var ids=jqGridUserPost.jqGrid('getGridParam','selarrrow');
	var ids=jqGridUserPost.jqGrid('getGridParam','selrow');
	var list = new Array();
	if(null == ids){
		pop_tip_open("blue","请选择岗位");
	}else{
		list.push(ids);
		//userID
		var user_ids=jqGridUser.jqGrid('getGridParam','selrow');
		if(list.length == 0){
			pop_tip_open("blue","请选择岗位");
		}else{
			pop_text_open("blue",'确定要移除这条岗位吗？',function(){
				var deletedata ={
						userIds:user_ids,
						postIds:list,
						type:"posts"
				}
				var uBody = "sys/org/postUser/deleteBatchByUserOrPostIds";
			    var uAll = hostUrl + uBody;
				$.ajax({
					type:'POST',
			        url:uAll,
			        async: false,
			        dataType:'json',
			        contentType:'application/json',
			        data:JSON.stringify(deletedata),
			        success: function(json) {
			        	selectScopeId = "";
			            if(json.success == true){
			            	var queryDataUserPost={
			            			"userId":user_ids
			            			};
			            	jqGridUserPost.jqGrid("setGridParam", { postData: queryDataUserPost }).trigger("reloadGrid");
			            	pop_tip_open("green",json.msg);
			            }else{
			            	pop_tip_open("red",json.msg);
			            }
			        },error:function(XMLHttpRequest, textStatus, errorThrown){
			        	pop_tip_open("red","移除岗位请求失败");
			        }
			    })
		    },function(){
		    });
		}
	}
	
}

var scope_userId;
var scope_postId;
var scope_orgIds;
var scope_orgNames;
/**
 * 设置管辖范围
 */
function userPostScope(){
	//多选框获取IDS
//	var ids=jqGridUserPost.jqGrid('getGridParam','selarrrow');
	//单选获取ID
	var ids=jqGridUserPost.jqGrid('getGridParam','selrow');
	if(null == ids){
		pop_tip_open("blue","请选择岗位");
	}else{
		//userID
		var user_id=jqGridUser.jqGrid('getGridParam','selrow');
		//获取岗位行数据，准备获取现有的管辖范围
		var rowData = jqGridUserPost.jqGrid('getRowData',ids);
		if(rowData.roleTypeId == "虚拟角色"){
			pop_tip_open("blue","虚拟角色不能设置管辖范围");
		}else{
			selectScopeId = ids;
			var rowData = jqGridUserPost.jqGrid('getRowData',ids);
			imScopeOrgId = rowData.refId;
			
			scope_userId = user_id;
			//scope_postId = ids[0];
			scope_postId = rowData.tragtId;
			scope_orgIds = rowData.orgIds;
			scope_orgNames = rowData.orgNames;
			window.open("organization_importorg.html");
		}
		
	}
	
}
//跳转修改页面时父页面选中的tree节点组织Id
var edit_orgId;
//组织机构新增、修改打开方式：0新增，1修改。默认新增
var editType=0;
//组织机构或者用户新增默认带的选中的节点
var orgNode;
//组织机构根节点目录
var orgRootNode;
/**
 * 新增和修改组织方法
 * @param sign 跳转信号0新增，1修改
 */
function editOrgInfo(sign){
	hideRMenu();
	if(sign == 1){
		editType = 1;
		var nodes = zTreeObj.getSelectedNodes();
		if(nodes.length < 1 ){
			pop_tip_open("blue","请先选择组织机构");
		}else{
			var allNodes = zTreeObj.getNodes();
			var rootNode = allNodes[0];
			if(rootNode.id == nodes[0].id){
				pop_tip_open("blue","根目录不允许修改");
			}else{
				edit_orgId = nodes[0].id;
				window.open("organization_edit.html");
			}
		}
	}else{
		var allNodes = zTreeObj.getNodes();
		orgRootNode = allNodes[0];
		var nodes = zTreeObj.getSelectedNodes();
		if(nodes.length < 1 ){
		}else{
			orgNode = nodes[0];
		}
		editType = 0;
		window.open("organization_edit.html");
	}
	
}


//修改用户的Id
var edit_userId;
//用户新增、修改打开方式：0新增，1修改。默认新增
var editUserType=0;
/**
 * 新增和修改用户方法
 * @param sign 跳转信号0新增，1修改
 */
function editUserInfo(sign){
	if(sign == 1){
		editUserType = 1;
		var ids=jqGridUser.jqGrid('getGridParam','selrow');
		if(ids == "" || ids == null){
			pop_tip_open("blue","请选择用户");
		}else{
			edit_userId=ids;
			window.open('user_edit.html');
		}
	}else{
		var allNodes = zTreeObj.getNodes();
		orgRootNode = allNodes[0];
		var nodes = zTreeObj.getSelectedNodes();
		if(nodes.length < 1 ){
		}else{
			orgNode = nodes[0];
		}
		editUserType = 0;
		window.open("user_edit.html");
	}
}
var updateUserId;
//修改用户信息(没用，待排查)
function updateUserInfo(){
	var ids=jqGridPost.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择用户");
	}else{
		updateAppId = ids;
		window.open("appupdate.html");
	}
}

/**
 * 跳转功能授权和数据授权
 * @param sign 跳转信号1功能授权，0数据授权
 */
function showAuthFromUser(sign){
	if(sign == 1){
		var ids=jqGridUser.jqGrid('getGridParam','selrow');
		if(ids == "" || ids == null){
			pop_tip_open("blue","请选择用户");
		}else{
			var dataParam={
					authFunUserId:ids
			};
			window.parent.childParamCache(dataParam);
			window.parent.switchPro("PT","QXGL");
		}
	}else if(sign == 0){
		var ids=jqGridUser.jqGrid('getGridParam','selrow');
		if(ids == "" || ids == null){
			pop_tip_open("blue","请选择用户");
		}else{
			var dataParam={
					authDataUserId:ids
			};
			window.parent.childParamCache(dataParam);
			window.parent.switchPro("PT","SJSQ");
		}
	}
}

/**
 * 修改用户状态
 * @param status 0禁用 1启用
 */
function updatestatus(status){
	var ids=jqGridUser.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择用户");
	}else{
		var updatedata ={
				id:ids,
				status:status
		};
		if(status == 0){
			updatedata.disableTime=new Date().getTime();
		}
		var uBody = "sys/org/user/update/"+ids;
	    var uAll = hostUrl + uBody;
		$.ajax({
			type:'PUT',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(updatedata),
	        success: function(json) {
	            if(json.success == true){
	            	pop_tip_open("green",json.msg);
	            	var nodes = zTreeObj.getSelectedNodes();
	            	userOnId = ids;
	            	userQuery();
	            }else{
	            	pop_tip_open("red",json.msg);
	            }
	        },error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","修改用户状态请求失败");
	        }
	    })
	}
}

/**
 * 同步单个人员数据
 * @param status 0禁用 1启用
 */
function syncData(){
	var ids=jqGridUser.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择用户");
	}else{
//		var updatedata ={
//				id:ids,
//				status:status
//		};
//		if(status == 0){
//			updatedata.disableTime=new Date().getTime();
//		}
		var uBody = "sys/sync/syncData/syncDataOne/"+ids;
	    var uAll = hostUrl + uBody;
		$.ajax({
			type:'POST',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:{},
	        success: function(json) {
	            if(json.success == true){
	            }else{
	            }
	        },error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","修改用户状态请求失败");
	        }
	    })
	}
}
var isUpdateUser=false;
/**
 * 修改用户排序号
 */
function updateUserGridSort(){
	var obj=jqGridUser.jqGrid("getRowData");
	if(obj==null ||obj.length==0){
		pop_tip_open("blue","当前无用户可修改排序号");
		return false;
	}
	/*jQuery(obj).each(function(){
		jqGridUser.jqGrid('editRow', this.id);
	});*/
	var l=obj.length;
	for (var i=l-1;i>=0;i--){
		jqGridUser.jqGrid('editRow', obj[i].id,{focusField:false});
	}
	isUpdateUser=true;
	/*if(obj.length >0){
		$("#"+obj[0].id+"_sort").focus();
	}*/
}
function checksave(result) {
    if (result.responseText == "") {
      alert("Update is missing!");
      return false;
    }
    return true;
  }
/**
 * 保存用户排序号
 */
function saveUserGridSort(){
	var obj=jqGridUser.jqGrid("getRowData");
	if(obj==null ||obj.length==0){
		pop_tip_open("blue","当前无用户可保存排序号");
		return false;
	}
	var saveData=[];
	var i=0;
	var sortVal,res;
	var res=0;
	jQuery(obj).each(function(){
		sortVal=$("#"+this.id+"_sort").val();
		if(sortVal == undefined ){
			res=2;
			return false;
		}
		if(sortVal == "" || sortVal == null){
		}else{
			if((/^(\+|-)?\d+$/.test( sortVal ))&& sortVal >=0){
				//jqGridUser.jqGrid('saveRow', this.id);
			}else{
				res = 1;
				return false;
			}
		}
	});
	if(res==1){
		pop_tip_open("blue","排序号只能输入正整数，包含0");
		return false;
	}
	if(res==2){
		pop_tip_open("blue","请先修改排序号");
		return false;
	}
	jQuery(obj).each(function(){
		jqGridUser.jqGrid('saveRow', this.id);
	});
	isUpdateUser=false;
	var obj1=jqGridUser.jqGrid("getRowData");
	jQuery(obj1).each(function(){
		if(this.sort && this.sort >=0){
			saveData[i]={
					id:this.id,
					sort:this.sort
			};
			i++;
		}
	});
	if(saveData ==null || saveData.length==0){
		pop_tip_open("blue","当前无用户可保存排序号");
		return false;
	}
	var urlBody = "sys/org/user/saveUsersSort";
    var urlAll = hostUrl + urlBody;
    var jsonData={
    		users:saveData
    };
	$.ajax({
        type:'POST',
        url:urlAll,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(jsonData),
        success: function(json) {
            if(json.success == true){
            	pop_tip_open("green","保存成功");
            	userOnId="";
            	userQuery();
            }else{
            	pop_tip_open("red",json.msg);
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","保存排序号请求失败");
        }
    })
}

/**
 * 用户类型数据格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function jqGridPostUserTypeFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "普通用户";
	}else if(cellvalue == "2"){
		return "管理员";
	}else if(cellvalue == "3"){
		return "超级管理员";
	}else if(cellvalue == "0"){
		return "非用户";
	}
}

/**
 * 岗位类型数据格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function postTypeFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "company"){
		return "公司";
	}else if(cellvalue == "dept"){
		return "部门";
	}else if(cellvalue == "group"){
		return "项目";
	}else if(cellvalue == "branch"){
		return "分期";
	}else if(cellvalue == "zb"){
		return "集团";
	}
}

/**
 * 状态数据格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function statusFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "启用";
	}else if(cellvalue == "0"){
		return "禁用";
	}
}

/**
 * 是否主岗数据格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function isDfaultFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "是";
	}else if(cellvalue == "0"){
		return "否";
	}else{
		return "否";
	}
}
/**
 * 角色类型数据格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function roleTypeFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "0"){
		return "虚拟角色";
	}else if(cellvalue == "1"){
		return "标准岗位";
	}
}

/**
 * 样式格式化
 * @param rowId
 * @param val
 * @param rowObject
 * @param cm
 * @param rdata
 * @returns {String}
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}

/**
 * 包含下级组织刷新用户数据
 * @param obj
 */
function includelowOrg(obj){
	includelow = obj;
	userOnId="";
	userQuery();
}
/**
 * 包含下级组织刷新岗位数据
 * @param obj
 */
function includelowOrgPost(){
	orgPostQuery();
}

/**
 * 设置领导岗位
 * @param data
 */
function postCallback(data) {
	//获取选择的岗位
	var ids=jqGridPost.jqGrid('getGridParam','selarrrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择岗位");
	}else{
		var leaderId='';
		if(data!=null&&data!=''){
			leaderId=data.id;
		}
		var list=[];
		$.each(ids, function(i,val){      
			var updatedata ={
					id:val,
					leaderId:leaderId
			};
			list[i]=updatedata;
		}); 
		var jdata={
				list:list
		}
		var uBody = "sys/org/post/updateBatchLeaderId";
//		var uBody = "sys/org/post/update/"+ids;
	    var uAll = hostUrl + uBody;
		$.ajax({
			type:'PUT',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(jdata),
	        success: function(json) {
	            if(json.success == true){
	            	pop_tip_open("green",json.msg);
	            	orgPostQuery();
	            	ppOnId=ids;
	            	
	            }else{
	            	pop_tip_open("red",json.msg);
	            }
	        },error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","设置领导岗位请求失败");
	        }
	    })
	}
}

/**
 * 组织树模糊查询回车事件
 */
/*$("#key").keydown(function(e) {
	if (e.keyCode == 13) {
		searchNode();
		event=arguments.callee.caller.arguments[0] || window.event;
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
	}
});*/
/**
 * 用户模糊查询回车事件
 */
$("#userQueryKey").keydown(function(e) {
	if (e.keyCode == 13) {
		userOnId="";
		userQuery();
		event=arguments.callee.caller.arguments[0] || window.event;
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
	}
});
/**
 * 岗位模糊查询回车事件
 */
$("#postQueryKey").keydown(function(e) {
	if (e.keyCode == 13) {
		postQuery();
		event=arguments.callee.caller.arguments[0] || window.event;
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
	}
});
/**
 * 按岗位--岗位模糊查询回车事件
 */
$("#orgPostQueryKey").keydown(function(e) {
	if (e.keyCode == 13) {
		orgPostQuery();
		event=arguments.callee.caller.arguments[0] || window.event;
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
	}
});


//---------------------------------------------
var rightNode;//右键事件节点
var copyNode;//复制节点
var pasteNode;//粘贴节点
//在ztree上的右击事件  
function OnRightClick(event, treeId, treeNode) {  
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {  
//        showRMenu("root", event.clientX, event.clientY);  
    } else if (treeNode && !treeNode.noR) {  
    	var treeObj=$.fn.zTree.getZTreeObj("treeDemo");
    	treeObj.selectNode(treeNode);
    	var offBottom=document.documentElement.clientHeight - $("#"+treeNode.tId).offset().top;
    	var x=$("#"+treeNode.tId+"_a").width();
    	var box=$(".ztree-box").width();
    	if(x+104 <box){
    		x=x+50;
    	}
    	if(x>box){
    		x=box-60;
    	}
    	var y=$("#"+treeNode.tId).offset().top+28;
    	if(offBottom < 203 ){
    		y=y-189;
    	}
    	//rightNode=treeNode;
    	showRMenu("node", x, y);
    }  
}  
var rMenu=$("#rMenu");
//显示右键菜单  
function showRMenu(type, x, y) {  
    $("#rMenu ul").show();  
    rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"}); //设置右键菜单的位置、可见
    $("body").bind("mousedown", onBodyMouseDown);  
}  
//隐藏右键菜单  
function hideRMenu() {  
    if (rMenu) rMenu.css({"visibility": "hidden"}); //设置右键菜单不可见  
    $("body").unbind("mousedown", onBodyMouseDown);  
}  
//鼠标按下事件  
function onBodyMouseDown(event){  
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {  
        rMenu.css({"visibility" : "hidden"});  
    }  
}  

/**
 * 复制组织结构
 */
function copyOrg(){
	hideRMenu();
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		pop_tip_open("blue","请先选择组织机构");
	}else{
		rightNode=nodes[0];
		if(rightNode.type == 'cata'){
			pop_tip_open("blue","根目录不可复制");
			return false;
		}
		copyNode=rightNode;
	}
}
/**
 * 粘贴组织结构
 */
function pasteOrg(){
	hideRMenu();
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		pop_tip_open("blue","请先选择组织机构");
	}else{
		if(!copyNode){
			pop_tip_open("blue","请先复制组织结构");
			return false;
		}
		rightNode=nodes[0];
		pasteNode=rightNode;
		pop_text_open("blue","确定要复制【"+copyNode.name+"】到【"+pasteNode.name+"】吗？",function(){
			easyDialog.close();
			//判断节点是否可以复制
			if(copyNode.type == "zb" || copyNode.type == "company") {
				if(!(pasteNode.type == "zb" || pasteNode.type == "company" ||pasteNode.type == "cata")){
					pop_tip_open("blue","公司和集团只能设置在集团或公司下");
					return false;
				}
			}else if(copyNode.type == "dept" ) {
				if(!(pasteNode.type == "zb" || pasteNode.type == "company"|| pasteNode.type == "dept")){
					pop_tip_open("blue","部门只能设置在集团、公司、部门下");
					return false;
				}
			}else if(copyNode.type == "group" ) {
				if(!(pasteNode.type == "zb" || pasteNode.type == "company")){
					pop_tip_open("blue","项目只能设置在集团或公司下");
					return false;
				}
			}else if(copyNode.type == "branch" ) {
				if(pasteNode.type != "group"){
					pop_tip_open("blue","分期只能设置在项目下");
					return false;
				}
			} 
			var data={
					copyId:copyNode.id
			};
			if(pasteNode.type!= 'cata'){
				data.pasteId=pasteNode.id;
			}
			var urlBody = "sys/org/orgnazation/copyAndPasteOrg";
			var urlAll = hostUrl + urlBody;
			$.ajax({
				type:'POST',
				url:urlAll,
				dataType:'json',
				contentType:'application/json',
				data:JSON.stringify(data),
				success: function(json) {
					if(json.success == true){
						var treeObj=$.fn.zTree.getZTreeObj("treeDemo");
						//复制节点
						var resNodes=treeObj.copyNode(pasteNode, copyNode, "inner");
						var data=json.result;
						updataCopyNode(data,resNodes);
						//修改节点
					    zTreeObj.updateNode(resNodes);
						//console.log(copyNode.name+"<-----,粘贴成功---->"+pasteNode.name);
					}else{
						pop_tip_open("red",json.msg);
					}
				},error:function(XMLHttpRequest, textStatus, errorThrown){
					pop_tip_open("red","粘贴请求失败");
				}
			})
	    },true);
	}
	
}
/**
 * 更新复制出的节点的属性
 * @param data
 * @param node
 */
function updataCopyNode(data,node) {
	var key =node.id;
	var newNode=data[key];
	node.id=newNode.id;
	node.parentId=newNode.parentId;
	node.code=newNode.code;
	node.prefixId=newNode.prefixId;
	node.prefixName=newNode.prefixName;
	
    if(node.children.length > 0) {
    	var arr=node.children;
    	for(var i in arr){
    		updataCopyNode(data,arr[i]);
    	}
    }
}
//---------------------------------------------

var ifDownPost="0";

$(function () {

	//miying样式初始化需要
    resizeHeight();
    //初始化组织机构树
    getOrgTree();
    //初始化人员jqgrid数据
    initJqGridUser();
    //初始化根据人员查询岗位jqgrid数据
    initJqGridUserPost();
    //初始化按岗位的岗位数据
    initJqGridPost();
    //初始化按岗位的用户数据
    initJqGridPostUser();
    //是否包含上下级
    $('#includelowOrgUser').on('click', function (event) {
    	if($(this).attr('class').indexOf('checkd') > 0){
    		includelowOrg("1");
    	}else{
    		includelowOrg("0");
    	}
//    	
//        if ($(this).attr("checked",true)) {//这里就可以判断当前是否被选择了
//          $(this).iCheck('uncheck');//如果已选择，可以用iCheck取消选择
//        } else {
//          $(this).iCheck('check');//如果没选择，可以用iCheck美化选择
//        }
 });
    //是否包含上下级
    $('#includelowOrgPost').on('click', function (event) {
    	if($(this).attr('class').indexOf('checkd') > 0){
    		ifDownPost="1";
    		includelowOrgPost();
    	}else{
    		ifDownPost="0";
    		includelowOrgPost();
    	}
    });
    $("#leaderButton").on('click',function(){
    	//获取选择的岗位
    	var ids=jqGridPost.jqGrid('getGridParam','selrow');
    	if(ids == "" || ids == null){
    		pop_tip_open("blue","请选择岗位");
    		return false;
    	}else{
    		var rowData =jqGridPost.jqGrid('getRowData',ids);
    		$("#_leaderId").val(rowData.leaderId);
    		$(this).xljSingleSelector({
				title:'选择领导岗位',//选择器标题，默认是'选择组织机构'
	            selectorType:'post',//选择器类型，默认是组织机构选择器
	            immediatelyShow:true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
	            treeUrl:'',
	            treeParam:'',//生成zTree树的参数
	            targetId:'_leaderId',//选择的数据的ID存储input域
//	            targetName:'leaderName',//选择的数据的Name存储input域
	            ajaxType: 'POST',	//ajax的type 默认为post
	            /**
	             * 保存回调函数
	             * @param selectDatas 已选择的数据json对象
	             * @param ele 绑定选择器的对象
	             */
	            saveCallback:postCallback,
	            formatTreeJson:function(data){return data;},
	            treeSettings:{}
			});
    	}
	});
    //清楚领导岗位
    $("#delLeaderButton").on('click',function(){
    	postCallback(null);
    });
    //下拉加载
    $('.ui-jqgrid-bdiv').bind("scroll", function (event){  
    	addGridPage();
    });
    
});

/*
*
* miying add
* */
/* 点击查询 出现 隐藏search框 */
$(".my-search-btn").on("click",function(e){
	var w_h = $(window).height();
    $(this).parent().parent().next().toggle();
    $(".searchBox").is(':hidden') ? $(".slide-left .ztree-box").height((w_h-90)+"px"):$(".slide-left .ztree-box").height((w_h-141)+"px");
    e.stopPropagation();
});
//计算高度
function resizeHeight(){
    //左侧  头部底部为60px  title类 为50px
	var w_h = $(window).height();
    $(".slide-left .ztree-box").height((w_h-90)+"px");
    //右侧table
    $(".con-table .mytable").height((w_h-180)/2+"px");
}
//计算表格宽度
function resizeGrid(){
	var mytable;
	if($(".con-tit .byuser").hasClass("active")){
		mytable = $(".mytable").eq(0);
	}else{
		mytable = $(".mytable").eq(2);
	}
	$(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(mytable).height()-45);
	$(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(mytable).width()-2, true);
	$.xljUtils.gridResizeFn();
	//$(".ui-jqgrid-bdiv").height(($(".mytable").height()-45)+"px");
	//$(".ui-jqgrid-bdiv").height(($(".mytable").width())+"px");
}
//grid 自适应宽度
$(window).resize(function(){
    resizeHeight();
	resizeGrid();
});

/*展开收起*/
$(".expend-col").on("click",function(){
	$(this).toggleClass("col");
	var mytable = $(this).parents(".con-table").find(".tableStyle").eq(0);
	var mytable1 = $(this).parents(".con-table").find(".tableStyle").eq(1);
	var my_h = mytable.height();
	if($(this).hasClass("col")){
		mytable.height(my_h*2);
		mytable.find(".ui-jqgrid-bdiv table").setGridHeight($(mytable).height()-45);
		mytable1.hide();
	}else{
		mytable.height(my_h/2);
		mytable.find(".ui-jqgrid-bdiv table").setGridHeight($(mytable).height()-45);
		mytable1.show();
	}
	$.xljUtils.gridResizeFn();
});

//表格上面 按岗位 切换
$(".right-content .con-tit button").on("click",function(e){
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    if($(this).attr('class').indexOf('byuser') > 0){
    	$("#userDiv").css("display","block");//按用户的display属性设置为block（显示）
    	$("#postDiv").css("display","none");//按岗位的display属性设置为none（隐藏）
    }else{
    	$("#userDiv").css("display","none");//按用户的display属性设置为none（隐藏）
		$("#postDiv").css("display","block");//按岗位的display属性设置为block（显示）
    }
	$.xljUtils.gridResizeFn();
    e.stopPropagation();
});
//checkbox
$("#includelowOrgUser").on("click",function(e){
    $(this).toggleClass("checkd");
    e.stopPropagation();
});
$("#includelowOrgPost").on("click",function(e){
	$(this).toggleClass("checkd");
	e.stopPropagation();
});