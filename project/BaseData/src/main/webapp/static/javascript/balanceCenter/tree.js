var treeId = '0';
$(function(){
	/**
	 * 左侧树加载
	 */
    $('#tree').tree({
    	url: baseUrl+'/settle/tree',
        onClick:function(node){
        	//点击节点，节点id保存在treeId中
        	treeId = node.id;
        	//根据节点启用禁用状态 控制添加按钮显示隐藏
        	setBaseAttr(node);

           $('#module').datagrid('load',{id : node.id});
        },

        //加载成功后默认展开第一级
        onLoadSuccess:function(node, data){
            if(data[0].id == '001'){ //判断是否是根节点，如果是根节点才展开第一级
            	var rootNode = $('#tree').tree('find', data[0].id);
            	$('#tree').tree("expand",rootNode.target);
        	}
        }
     });

    var _columns = [[
                    {field:'id',title:'选择',hidden:true},
                    {field:'name',title:'名称',width:200}
                  ]];
    var url = baseUrl+'/settle/getmembercorp';

    bodyLoad('module','toolbar',url,_columns,'','id','asc')
});

//控制右侧的按钮和文本内容
function setBaseAttr(node){
    if(node.status!=0 && !node.deleted){
        $("#toolBarBtn").hide();
    }else{
        $("#toolBarBtn").show();
    }
   $("#centerCorpName").html(node.centerCorpName);
   $("#status").html(node.status ==0 ?"正常":"禁用");
}

/** 新增*/
function myAdd(title,width,height,doUrl,saveUrl){
      parent.$.modalDialog({
        title : title,
        width : width,
        height : height,
        href : doUrl,
        onLoad:function(){
            //设置默认所属类别
            var parentId = parent.$.modalDialog.handler.find("#parentId");
            parentId.val(treeId);
        },
        buttons : [{
            text : '保存',
            handler : function() {
                parent.$.modalDialog.openner= $grid;
                var f = parent.$.modalDialog.handler.find("#form");
                f.attr("action",saveUrl);
                f.submit();
            }
        }, 
        {
            text : '取消',
            handler : function() {
                parent.$.modalDialog.handler.dialog('destroy');
                parent.$.modalDialog.handler = undefined;
            }
        }]
    });
}
/** 修改*/
function myEdit(title,width,height,doUrl,queryUrl,saveUrl){  
    //判断选中记录非空
    if (treeId == '' || treeId == 0) {
        $.messager.show({
            msg : '跟节点不能进行修改操作。',
            title : '提示'
        });
        return;
    }
    parent.$.modalDialog({
        title : title,
        width : width,
        height : height,
        href : doUrl,
        onLoad:function(){
            var f = parent.$.modalDialog.handler.find("#form");
            $.ajax({
                url : queryUrl+"?id="+treeId,
                cache : false,
                dataType : "json",
                success : function(result) {
                    f.form("load", result);
                }
            });
        },
        buttons : [{
            text : '保存',
            handler : function() {
                parent.$.modalDialog.openner= $grid;
                var f = parent.$.modalDialog.handler.find("#form");
                f.attr("action",saveUrl);
                f.submit();
            }
        },{
            text : '取消',
            handler : function() {
                parent.$.modalDialog.handler.dialog('destroy');
                parent.$.modalDialog.handler = undefined;
            }
        }]
    });      
}

//设置启用 停用状态
function setSettleStatus(url,status){
    //判断选中记录非空
    if (treeId == '' || treeId == 0) {
        $.messager.show({
            msg : '跟节点不能进行相关操作。',
            title : '提示'
        });
        return;
    }
    var msg = "删除";
    if(status == 1){
        msg = "停用";
    }else if(status == 0){
        msg = "启用";
    }
    $.messager.confirm('请确认', '您要'+msg+'当前所选记录？', function(r) {
        if (r) {
            $.ajax({
                    url : url,
                    data : {id:treeId,'status':status},
                    cache : false,
                    dataType : "json",
                    success : function(result) {
                        if(result.code =='1'){
                            var node = $('#tree').tree('getSelected');
                            $('#tree').tree('update', {
                                target: node.target,
                                status:1
                            });
                            //设置完成后修改按钮和文本显示状态
                            setBaseAttr(node);
                            $('#module').datagrid('reload');
                            $.messager.show({
                                title : '提示',
                                msg : '操作成功,数据进入待审核状态'
                            });
                        }else{
                            $.messager.show({
                                title : '提示',
                                msg : result.desc
                            });
                        }
                    },
                    error:function(){
                        $.messager.show({
                            title : '提示',
                            msg : '操作失败'
                        });
                    }
                });
        }
    });
}

//配置成员企业
function setMemberBusiness(){
    if (treeId == '' || treeId == 0) {
        $.messager.show({
            msg : '跟节点不能进行相关操作。',
            title : '提示'
        });
        return;
    }
    $.ajax({
        url: baseUrl + '/settle/editMember',
        data: {'id':treeId},
        cache : false,
        dataType : "json",
        success:function(data){
            if(data.code == '1'){
                parent.$.modalDialog({
                title : "配置成员企业",
                width : 500,
                height : 500,
                href : 'memberBusiness.jsp',
                onLoad:function(){
                    parent.$.modalDialog.handler.find("#text").html(data.text);
                    parent.$.modalDialog.handler.find("#centerCorpName").html(data.centerCorpName);
                    var checkedItem =  parent.$.modalDialog.handler.find("#item-ul");
                    for(var i=0; i<data.member.length;i++){
                        var str = "<li>"+
                              "<div class='itemdiv'>"+
                              "<span>"+data.member[i].name+"</span>"+
                              "<i class='item-del' data-id="+data.member[i].id+">x</i></div>"+
                              "</li>";
                        memberIds.push(data.member[i].id);
                        checkedItem.append(str);
                    }
                },
                buttons : [{
                    text : '提交审核',
                    handler : function() {
                        // 发送请求
                        $.messager.confirm('请确认', '您要更改成员企业记录？', function(r) {
                            if (r) {
                                $.ajax({
                                    url : baseUrl + '/settle/saveMember',
                                    data : {'id':treeId,
                                            'memberIds':memberIds.join(',')},
                                    cache : false,
                                    dataType : "json",
                                    success : function(result) {
                                        if(result.code =='1'){
                                            var node = $('#tree').tree('getSelected');
                                            $('#tree').tree('update', {
                                                target: node.target,
                                                status:1
                                            });
                                            //设置完成后修改按钮和文本显示状态
                                            setBaseAttr(node);
                                            $('#module').datagrid('reload');
                                            $.messager.show({
                                                title : '提示',
                                                msg : '操作成功,数据进入待审核状态'
                                            });
                                            parent.$.modalDialog.handler.dialog('destroy');
                                            parent.$.modalDialog.handler = undefined;
                                        }else{
                                            $.messager.show({
                                                title : '提示',
                                                msg : result.desc
                                            });
                                        }
                                    },
                                    error:function(){
                                        $.messager.show({
                                            title : '提示',
                                            msg : '操作失败'
                                        });
                                    }
                                });
                            }
                        });
                    }
                }, 
                {
                    text : '取消',
                    handler : function() {
                        parent.$.modalDialog.handler.dialog('destroy');
                        parent.$.modalDialog.handler = undefined;
                    }
                }]
            });
            }   
        },
        error:function(data){

        }
    });
}