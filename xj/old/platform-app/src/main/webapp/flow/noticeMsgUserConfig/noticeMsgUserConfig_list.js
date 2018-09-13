/**
 * @author luorongxin
 */
var rowData;//当前选中数据
var rowDataBefore;//上一次选中数据
var openUrl="noticeMsgUserConfig_edit.html";//编辑页
/**
 * 初始化
 */
$(function(){
 //加载grid
 pageInit();
 //页面加载完毕后更改grid宽高
 $.xljUtils.resizeNestedGrid();
 //重置模糊搜索关键字
 $('#keywords').val('');
 // 按钮事件绑定
 $("#updateBtn").unbind('click').on('click',function () {
  editNoticeMsgUserConfig();
 });
 //删除
 $("#delsBtn").unbind('click').on('click',function () {
  del();
 });
 //新增
 $("#addBtn").unbind('click').on('click',function () {
  addNoticeMsgUserConfig();
 });
 //模糊查询按钮绑定回车键
 $(document).keydown(function(event){
  if(event.keyCode==13){
   $("#searchBtn").click();
  }
 });
 //禁用所有按钮的默认行为
 $('.btn').click(function() {
  return false;
 });
 //阻止默认行为
 $('.btn').click(function(e) {
  e.preventDefault();
 });

});
/**
 * 模糊查询: 名字或者编码
 */
function fuzzySearch(){
 var param = $('#keywords').val();
 if(param!=null&&param!=''){
  $("#list").jqGrid('setGridParam',{postData:{'param':param},url:baseUrl+'/oa/sys/sysFloatWindow/fuzzySearch'}).trigger('reloadGrid');
 }else{
  $('#list').jqGrid('setGridParam',{url:baseUrl+'/oa/sys/sysFloatWindow/queryList'}).trigger("reloadGrid");
 }
};

/**
 * 加载浮动窗口列表
 */
function pageInit(){
 $.xljUtils.initJqGrid({
  gridSelecter:"#list",
  url : baseUrl+'/flow/sysNoticeMsgUserConfig/queryList',//创建完成之后请求数据的url
  datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
  mtype : "post",//向后台请求数据的ajax的类型。可选post,get
  ajaxGridOptions: { contentType: 'application/json' },
  contentType : "application/json",
  autowidth:true,
  colNames : [ 'id', '接收人' ,'接收人账号','数据库实例' , '推送消息地址', '修改消息地址'],
  colModel : [
   {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true},
   {name : 'userName',label : '接收人',editable:true,width : 60,sortable:false,align:'center'},
   {name : 'loginName',label : '接收人账号',editable:true,width : 60,sortable:false,align:'center'},
   {name : 'tendCode',label : '数据库实例',editable:true,width : 60,sortable:false,align:'center'},
   {name : 'postUrl',label : '推送消息地址',editable:true,width : 60,sortable:false,align:'center'},
   {name : 'modifyUrl',label : '修改消息地址',editable:true,width : 60,sortable:false,align:'center'}
  ],
  multiselect : true,
  multiboxonly:true,
  rownumbers:true,
  jsonReader : {
   root:"result",
   repeatitems : false
  },
  ondblClickRow:function(rowid){
//            	window.open(openUrl+"?oper=detail&id="+rowid);
   //跳转编辑页
   rowData = $('#list').jqGrid('getRowData',rowid);
   window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));

  },
  onCellSelect: function(){
   if(rowDataBefore!=null&&rowDataBefore!='undefined'){
    //重新选择行时清除上一次选中行的样式
    $('#list '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
   }
  },
  rowNum:-1,
  loadError:function(xhr,status,error){
   //异常处理
   console.log(xhr.status);
   if(xhr.status==404){
    pop_tip_open("red","请求url有误！");
    return;
   }
   if(xhr.status==405){
    pop_tip_open("red","请求方法有误！");
    return;
   }
   pop_tip_open("red","服务异常,请联系管理员！");


  },
  loadComplete:function(xhr){
   console.log(xhr);
   if(!xhr.success){
    switch (xhr.code) {
     case "50000":
      pop_tip_open("red",xhr.msg);
      break;
     case "50001":
      pop_tip_open("red",xhr.msg);
      break;
     case "50002":
      pop_tip_open("blue",xhr.msg);
      break;
     case "50003":
      pop_tip_open("red",xhr.msg);
      break;

     default:
      pop_tip_open("red","查询数据失败！");
      break;
    }
   }else{
    //success
   }
  }
 });
}

/**
 * 设置新增行ID到jqgrid
 * @param rowId
 * @returns
 */
function setJqGridAddedRowId(rowId) {
 $.xljUtils.setAddedRowId('#list', rowId);
}


/**
 */
var popup
function addNoticeMsgUserConfig(){
 var rowId=$('#list').jqGrid("getGridParam","selrow");
 rowData = $('#list').jqGrid('getRowData',rowId);
 popup = window.open(openUrl+"?oper=add&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));
}


/**
 * 编辑菜单
 * @param
 */
function editNoticeMsgUserConfig(){
 var idsVal = $('#list').jqGrid('getGridParam','selarrrow');
 if(idsVal&&idsVal!="") {
  if(idsVal.length>1) {
   pop_tip_open("blue","只能选择一行数据进行编辑！");
   return;
  }else{
   var rowId=$('#list').jqGrid("getGridParam","selrow");
   rowData = $('#list').jqGrid('getRowData',rowId);
//			 	 pop_text_open("blue", "进入【" + rowData.name + "】的编辑状态吗？", function(){
//			 		 window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));
//			 	 },true);
   window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));
  }
 }else{
  pop_tip_open("blue","请选择要修改的数据！");
 }
}


/**
 * 状态修改
 * @param n
 */
function changeState(n){
 var idsVal = $('#list').jqGrid('getGridParam','selarrrow');
 if(idsVal&&idsVal!="") {
  if(idsVal.length>1) {
   pop_tip_open("blue","只能选择一行数据进行状态更新！");
   return;
  }
  var idVal = $('#list').jqGrid('getGridParam','selrow');
  rowData = $('#list').jqGrid('getRowData',idVal);
  //不进行同样状态的操作
  if(n==false&&rowData.state=='false'){
   pop_tip_open("blue","该记录已禁用！");
   return;
  }
  if(n==true&&rowData.state=='true'){
   pop_tip_open("blue","该记录已启用！");
   return;
  }
  $.ajax({
   url:baseUrl+"/flow/sysNoticeMsgUserConfig/update/"+idVal,
   type:'PUT',
   dataType:'JSON',
   contentType:'application/json',
   data:JSON.stringify({'id':idVal,'state':n}),
   success:function (xhr,textStatus ) {
    console.log(xhr);
    if (xhr){
     if(xhr.success) {
      pop_tip_open("green","状态修改成功！");
      $('#list').jqGrid().trigger("reloadGrid");
     }else{
      if(xhr.code=="50000"){
       pop_tip_open("red",xhr.msg);
       return;
      }
      pop_tip_open("red","状态修改失败！");
     }
    }else{
     pop_tip_open("red","服务异常,请联系管理员！");
    }

   },
   error: function(xhr, textStatus, errorThrown) {
    console.log(xhr);
    pop_tip_open("red","服务异常,请联系管理员！");
   }

  });
 }else{
  pop_tip_open("blue","请选择要操作的数据！");
 }
}
/**
 * 删除浮动窗口
 */
function del(){

 var idsVal = $('#list').jqGrid('getGridParam','selarrrow');
 if(idsVal&&idsVal!="") {
  pop_text_open("blue", "确认要删除这【" +idsVal.length + "】条数据吗？",function(){
   $.ajax({
    url:baseUrl+"/flow/sysNoticeMsgUserConfig/deleteBatch/"+idsVal,
    type:'DELETE',
    dataType:'JSON',
    contentType:'application/json',
    data:JSON.stringify({}),
    success:function (xhr,textStatus ) {
     console.log(xhr);
     if (xhr){
      if(xhr.success) {
       pop_tip_open("green","数据删除成功！");
       $('#list').jqGrid().trigger("reloadGrid");
      }else{
       if(xhr.code=="50000"){
        pop_tip_open("red",xhr.msg);
        return;
       }
       pop_tip_open("red","数据删除失败！");
      }
     }else{
      pop_tip_open("red","服务异常,请联系管理员！");
     }
    },
    error: function(xhr, textStatus, errorThrown) {
     console.log(xhr);
     pop_tip_open("red","服务异常,请联系管理员！");
    }
   });
  },true);
  return;
 }else{
  pop_tip_open("blue","请选择要删除的数据！");
 }
}

function reloadGrid(){
 pop_tip_open("green","数据操作成功！");
 $('#list').jqGrid().trigger("reloadGrid");
}
