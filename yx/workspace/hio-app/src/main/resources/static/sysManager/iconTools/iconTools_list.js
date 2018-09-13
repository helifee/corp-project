/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _logoList = {
        ns : "_logoList",
        dataPar:{
            rowData:null,
            rowDataBefore:null
        },
        /**
         * 加载页面数据
         */
        loadPageData:function(){
            var my = this;
            jQuery("#list2").jqGrid({
                url: serviceUrl+'sys/iconTools/page',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",
                contentType : "application/json",
                datatype : "json",
                autowidth:true,
                multiselect:true,
                autowidth:true,
                rownumbers:true,
                jsonReader : {
                    repeatitems : false
                },
                colNames: ['ID','编码', '名称', '图标'],
                colModel: [
                    {name: 'id', index: 'id', width: 55, hidden: true},
                    {name: 'code', index: 'code'},
                    {name: 'name', index: 'name'},
                    {name : 'url',label : '图标',align : "center",formatter:function(icon){
                        if(icon){
                            return '<img src="'+icon+'" style="width:32px;height:30px">';
                        }else{
                            return "";
                        }
                    }}
                ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
                pager : '#pager2',//表格页脚的占位符(一般是div)的id
                ondblClickRow:function(rowid){
                    window.open("iconTools_edit.html?type=edit&id="+rowid);
                },
                onSelectRow: function (rowid) {
                    my.dataPar.rowData = $('#list2').jqGrid('getRowData',rowid);
                },
                onCellSelect: function(){
                    if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
                        //重新选择行时清除上一次选中行的样式
                        $('#list2 '+'#'+my.dataPar.rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    my.dataPar.rowDataBefore = my.dataPar.rowData;
                    if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
                        //添加回显选中行样式
                        $('#list2').setSelection(my.dataPar.rowDataBefore.id,true);
                        $('#list2 '+'#'+my.dataPar.rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
                },
                viewrecords : true,
                loadError:function(xhr,status,error){
                    //异常处理
                    if(xhr.status==404){
                        pop_tip_open("red","请求url有误！");
                        return;
                    }
                    if(xhr.status==405){
                        pop_tip_open("red","请求方法有误！");
                        return;
                    }
                    pop_tip_open("red","网络异常,请联系管理员！");
                },
                loadComplete:function(xhr){
                    if(!xhr.success){
                        if(xhr.code=="50000"||xhr.code=="50001"||xhr.code=="50003"){
                            pop_tip_open("red",xhr.msg);
                            return;
                        }
                        if(xhr.code=="50002"){
                            pop_tip_open("blue",xhr.msg);
                            return;
                        }
                        pop_tip_open("red","查询数据失败！");
                    }else{
                        //success
                    }
                }

            });
        },
        /**
         * open维护页面
         */
        toAddBill:function(){
            window.open("iconTools_edit.html?type=add");
        },
        /**
         * open维护页面
         */
        toUpdateBill:function(){
            var ids=$('#list2').jqGrid('getGridParam','selarrrow');
            if(!ids||ids.length==0) {
                pop_tip_open("blue","请选择要修改的规则类型行");
                return;
            }
            if(ids.length>1){
                pop_tip_open("blue","请选择一行！");
                return;
            }
            this.dataPar.rowData = $('#list2').jqGrid('getRowData',ids);
            window.open("iconTools_edit.html?type=edit&id="+ids);
        },
        /**
         * 删除数据
         */
        deleteBill:function(){
            var my = this;
            var ids=$('#list2').jqGrid('getGridParam','selarrrow');
            if(!ids||ids.length==0) {
                pop_tip_open("blue","请选择要删除规则类型的行！");
                return;
            }
            var prevId = $("#list2 #" + ids).prev()[0].id;
            pop_text_open("blue",'确认要删除这'+ids.length+'条数据吗？',function(){
                $.ajax({
                    url:serviceUrl+"sys/iconTools/deletePseudoBatch/"+ids,
                    type:'DELETE',
                    dataType:'JSON',
                    success:function (resultData ) {
                        if (resultData&&resultData.success) {
                            pop_tip_open("green","删除数据成功！");
                            my.dataPar.rowData = $("#list2").jqGrid("getRowData",prevId);
                            $('#list2').jqGrid().trigger("reloadGrid");
                        }else{
                            pop_tip_open("red","删除数据失败！");
                        }
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        pop_tip_open("red","服务异常,请联系管理员！");
                    }
                });
            },function(){});
        },
        reloadGrid:function(id){
            var my = this;
            if(null!=id&&""!=id){
                my.dataPar.rowData = {id:id};
            }
            $('#list2').jqGrid().trigger("reloadGrid");
        },
        /**
         * 装载过滤查询的条件
         */
        searchDate:function(){
            var corname=$("#corname").val();
            jQuery("#list2").jqGrid("setGridParam",{postData:{code:corname,name:corname},page:1}).trigger("reloadGrid");
        },
        /**
         * 渲染grid数据样式
         */
        addCellAttr:function (rowId, val, rowObject, cm, rdata) {
            if(rowObject.status == "0" ){
                return "style='color:red'";
            }
        },
        /**
         * 模糊查询支持回车事件
         */
        bindSearchDate:function(){
            var my = this;
            $("#corname").keyup(function(event){
                if(event.keyCode ==13){
                    my.searchDate();
                }
            });
        },
        /**
         * 页面初始化
         */
        pageInit:function(){
            //支持回车事件
            this.bindSearchDate();
            //初始化数据
            this.loadPageData();
            //页面加载完毕后更改grid宽高
            $.xljUtils.resizeNestedGrid();
        }
    };
    $(_logoList.pageInit());
    window[_logoList.ns] = _logoList;
})(window,document);











