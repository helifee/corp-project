$(function(){
//   var url = "../../data/bCenterList.json";
   var url = baseUrl + "/settle/unEnableList";
   var _columns = [[
          {field:'id',title:'ID',width: '10%',hidden:true}, 
          {field:'text',title:'结算中心',width:'15%',sortable:true},
          {field:'centerCorpName',tilte:'中心企业',width:'15%'},
          {field:'status',title:'审核状态',width:'15%',formatter: function(value, row, index) {
             if(value == '1'){
               return '待审核';
             }else if(value == '2'){
               return "审核通过"
             }else if(value == '3'){
               return "审核拒绝";
             }
          }},  
          {field:'opation',title:'操作说明',width:'15%',formatter: function(value, row, index) {
             if(value == 'new'){
               return '新增';
             }else if(value == 'del'){
               return "删除"
             }else if(value == 'update'){
               return "修改";
             }else if(value == 'qiye'){
               return "配置成员企业";
             }
          }},
          {field:'action',title:'操作',width:'15%',formatter : function(value, row, index) {
           var str = '';
           if(row.status =='1'){
               str += '修改';
               str +=" ";
               str +='删除';
           }else{
            console.log(row.opation);
               if(row.opation == 'qiye'){
                  str += '<a href="javascript:void(0)" onclick=setMemberBusiness('+row.id+')>配置成员企业</a>';
               }else{
                  str += '<a href="javascript:void(0)" onclick=myEdit('+row.id+')>修改</a>';
               }
               str +=" ";
               str +='<a href="javascript:void(0)" onclick=myDelete('+row.id+')>删除</a>';
           }
           return str;
          }}
      ]];
     bodyLoad('module','toolbar',url,_columns);
 });


/** 修改*/
function myEdit(id){  
    parent.$.modalDialog({
        title : '修改结算中心',
        width : 350,
        height : 200,
        href : 'add.html',
        onLoad:function(){
            var f = parent.$.modalDialog.handler.find("#form");
            $.ajax({
                url : "../../data/editSettle.json?id="+id,
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
                f.attr("action",'../../data/save.json');
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

//删除
function myDelete(id){
    $.messager.confirm('请确认', '您要删除当前记录？', function(r) {
        if (r) {
            $.ajax({
                    url : '../../data/save.json',
                    data : {id:id},
                    cache : false,
                    dataType : "json",
                    success : function(result) {
                        if(result.code =='1'){
                            $('#module').datagrid('reload');
                            $.messager.show({
                                title : '提示',
                                msg : '操作成功'
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
function setMemberBusiness(id){
    $.ajax({
        url:'../../data/editMember.json',
        data: {'id':id},
        cache : false,
        dataType : "json",
        success:function(data){
            if(data.code == '1'){
                parent.$.modalDialog({
                title : "配置成员企业",
                width : 500,
                height : 500,
                href : 'memberBusiness.html',
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
                                    url : '../../data/save.json',
                                    data : {'id':id,
                                            'memberIds':memberIds.join(',')},
                                    cache : false,
                                    dataType : "json",
                                    success : function(result) {
                                        if(result.code =='1'){
                                            //设置完成后修改按钮和文本显示状态
                                            $('#module').datagrid('reload');
                                            $.messager.show({
                                                title : '提示',
                                                msg : '操作成功'
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