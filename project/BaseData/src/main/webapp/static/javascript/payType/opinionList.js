
	$(function(){
  	 var url = "opinionList.json";
  	 var _columns = [[
  	 
  	                 {field:'id',title:'序号',width:'5',checkbox:true},  
				      {field:'payType',title:'支付类型',width:'100'}, 
				     {field:'auditStatus',title:'审核状态',width:'100',formatter: function(value,row,index){
								if (value == '1'){
									return '审核通过';
								}else if(value =='2'){
									return '待审核';
								} else {
									return '审核拒绝';
								}
							}},
				      {field:'operateType',title:'操作说明',width:'100',formatter: function(value,row,index){
                if (value == '1'){
                  return '新增';
                }else if(value =='2'){
                  return '修改';
                } else {
                  return '删除';
                }
              }},},  				    
					  {field:'action',title:'操作',width:'100',formatter : function(value, row, index) {
						 var str = '';
						 str +=$.formatString('<a href="javascript:void(0)" onclick="verify('+row.id+')">审核</a>', row.id);
						 return str;
						}}]]; 
  	 bodyLoad('module','toolbar',url,_columns);
  });

	/** 审核*/
function verify(id){  
    parent.$.modalDialog({
        title : '审核',
        width :450,
        height :400,
        href : 'opinion.html',
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
            text : '拒绝',
            handler : function() {
                subVerify(1);
            }
        },{
            text : '通过',
            handler : function() {
                subVerify(0);
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

//点击审核操作
function subVerify(verifyState){
    parent.$.modalDialog.openner= $grid;
    var id = parent.$.modalDialog.handler.find("#id").val();
    var shyj = parent.$.modalDialog.handler.find("#shyj").val();
    $.ajax({
      url : "../../data/save.json",
      data:{'id':id,'shyj':shyj,'shzt':verifyState},
      cache : false,
      dataType : "json",
      success : function(result) {
          if(result.code =='1'){
              parent.$.modalDialog.openner.datagrid('reload');//之所以能在这里调用到parent.$.modalDialog.openner_datagrid这个对象，是因为role.jsp页面预定义好了
              parent.$.modalDialog.handler.dialog('close');
              parent.$.messager.show({
                title : "提示",
                msg : "操作成功",
                timeout : 1000 * 2
              });
            }else{
              parent.$.messager.show({
                title : "提示",
                msg : result.desc,
                timeout : 1000 * 2
              });
            }
      }
  });
}

