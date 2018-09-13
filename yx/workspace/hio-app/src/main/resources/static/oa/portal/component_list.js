/**
 * @author dingguanghuai
 * @date 2017/03/25
 *
 */
var rowData;//当前选中数据
var rowDataBefore;//上一次选中数据
$(function () {
    //初始化组件列表
    initComponentGrid();
    //改变grid大小自适应
    $.xljUtils.resizeNestedGrid();

    //新建
    $('#createComponentBtn').on('click',function () {
        window.open('component_edit.html?act=create','_blank');
    });

    //更新
    $('#updateComponentBtn').on('click',function () {
        //获取选择行的id数组
        var ids=$('#componentList').jqGrid('getGridParam','selarrrow');
        if(ids.length>1) {
            $.xljUtils.tip('blue',"只能选择一行数据进行更新！");
            return;
        }

        //组件ID
        var componentId = $('#componentList').jqGrid('getGridParam','selrow');
        if(componentId){
            window.open('component_edit.html?act=update&componentId='+componentId,'_blank');
        }else{
            $.xljUtils.tip('blue',"请选择一条记录！")
        }

    });

    //删除
    $('#delsBtn').on('click',function () {
        var ids=$('#componentList').jqGrid('getGridParam','selarrrow');
        if(!ids||ids.length==0) {
            $.xljUtils.tip('blue',"请选择要删除的行！");
            return;
        }

        $.xljUtils.confirm('blue','确定要删除这'+ids.length+'条数据吗？',function () {
            ids = ids.join(",");
            if(ids&&ids!='') {
                $.ajax({
                    url:serviceUrl+'sys/portal/component/deleteBatch/'+ids,
                    type:'DELETE',
                    dataType:'JSON',
                    success:function (resultData ) {
                        if (resultData&&resultData.success) {
                            $.xljUtils.tip('green',"数据删除成功！");
                            $('#componentList').jqGrid().trigger("reloadGrid");
                        }else{
                            $.xljUtils.tip('red',"删除数据失败！");
                        }
                    }
                });
            }
        },true);
    });

    //预览
    $('#previewComponentBtn').on('click',function () {
        $("#previewComponentModal").find(".modal-body").html('');
        var idsVal = $('#componentList').jqGrid('getGridParam','selarrrow');
        if(idsVal.length>1) {
            $.xljUtils.tip('blue',"只能选择一行数据进行预览！");
            return;
        }

        var idVal = $('#componentList').jqGrid('getGridParam','selrow');

        if(idVal&&idVal!="") {
            var component = $('#componentList').jqGrid('getRowData',idVal);
            var portlet = assembleComponentList(component);
            portlet.find('.news_title a').hide();
            portlet.css({width:'100%',height:'100%'});
            portlet.find('.glyphicon-refresh').parent('a').click();
            var editObjData = $('#componentList').jqGrid().getRowData(idVal);
            var previewUrl = editObjData.contentUrl;

            $("#previewComponentModal").find(".modal-body").append(portlet);
            $('#previewComponentModal').modal('show');
        }else{
            $('#previewComponentModal').modal('hide');
            $.xljUtils.tip('blue',"请单击行选择要预览的组件！");
        }
    });

    //模糊查询按钮绑定事件
    $("#searchBtn").unbind('click').on('click',function () {
    	fuzzySearch();
    });
    //重置模糊搜索关键字
    $('#keywords').val('');
    //模糊查询按钮绑定回车键
    $(document).keydown(function(event){ 
    	if(event.keyCode==13){ 
    	$("#searchBtn").click(); 
    	  } 
    	}); 
});

/**
 * 初始化组件列表
 * @author dgh
 * @date 2017/03/22
 */
function initComponentGrid() {

     $.xljUtils.initJqGrid({
        gridSelecter:"#componentList",
        url: serviceUrl+'sys/portal/component/page',
        ajaxGridOptions: { contentType: 'application/json' },
        mtype : "POST",
        contentType : "application/json",
        datatype : "json",
        /*width:$('.container-all').width(),
        height:$(window).height() - $('.xj-main-breadcrumbs').outerHeight() - $('.xj-main-advanced').outerHeight() - $('.xj-main-dimsearch').outerHeight(),*/
        postData:{'sortFields':JSON.stringify({"createDate":"desc"})},
        multiboxonly: true,
        multiselect:true,
        autowidth:true,
        rownumbers:true,
        jsonReader : {
            repeatitems: false
        },
        colNames:['ID','标题','编码', '图标','内容URL','内容类型','描述','分类','显示关闭','显示最大化','显示最小化','显示删除','显示刷新','显示移动','创建日期'],
        colModel:[
            {name:'id',index:'id', width:55,hidden:true,sortable:false},
            {name:'title',index:'title', width:100,sortable:false},
            {name:'code',index:'code', width:90,sortable:false},
            {name:'titleIcon',index:'titleIcon', width:90,align : "center",sortable:false,formatter:function(titleIcon){
            	if(titleIcon){
            		return '<img src="data:image/jpeg;base64,'+titleIcon+'" style="width:30px;height:30px">';
            	}else{
            		return "";
            	}
            }},
            {name:'contentUrl',index:'contentUrl', width:90,sortable:false},
            {name:'contentType',index:'contentType', width:90,hidden:true,sortable:false},
            {name:'description',index:'description', width:90,sortable:false},
            {name:'categoryId',index:'categoryId', width:90,hidden:true,sortable:false},
            {name:'displayClose',index:'displayClose', width:90,formatter:trueOrFalseFormatter,hidden:true,sortable:false},
            {name:'displayMax',index:'displayMax', width:90,formatter:trueOrFalseFormatter,hidden:true,sortable:false},
            {name:'displayMin',index:'displayMin', width:90,formatter:trueOrFalseFormatter,hidden:true,sortable:false},
            {name:'displayDelete',index:'displayDelete', width:90,formatter:trueOrFalseFormatter,hidden:true,sortable:false},
            {name:'displayRefresh',index:'displayRefresh', width:90,formatter:trueOrFalseFormatter,hidden:true,sortable:false},
            {name:'displayMove',index:'displayMove', width:90,formatter:trueOrFalseFormatter,hidden:true,sortable:false},
            {name:'createDate',index:'createDate', width:90,sortable:false}
        ],
        ondblClickRow: function(rowid,iRow,iCol,e){
            window.open('component_edit.html?act=update&componentId='+rowid,'_blank');
        },
        rowNum : 20,//一页显示多少条
        rowList : [ 20, 50, 100, 200 ],//可供用户选择一页显示多少条
        pager : '#componentPager',//表格页脚的占位符(一般是div)的id
        viewrecords : true,
        loadError:function (xhr,status,error) {
            $.xljUtils.tip('red',"数据加载失败！");
        },
        loadComplete:function(xhr){
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
	$.xljUtils.setAddedRowId('#componentList', rowId);
}

/**
 * jqGrid字段格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {*}
 */
function trueOrFalseFormatter(cellvalue, options, rowObject) {
    if(cellvalue){
        return "是";
    }else {
        return "否";
    }
}

/**
 * 模糊查询: 编码/标题
 */
function fuzzySearch(){
    var searchInputVal = $("#keywords").val();
    var queryDataObj =  $('#componentList').jqGrid('getGridParam','postData');
    var queryData = {};
    queryData.sortFields = queryDataObj.sortFields;
    if(searchInputVal!='') {
        queryData.title = searchInputVal;
        queryData.code = searchInputVal;
        queryData.fuzzyQueryFields = JSON.stringify(['title','code']);
    }

    delete queryDataObj.title;
    delete queryDataObj.code;
    delete queryDataObj.fuzzyQueryFields;
    delete queryDataObj.sortFields;

    jQuery("#componentList").jqGrid('setGridParam', {postData: queryData,page:1}).trigger('reloadGrid');
};
/**
 * 刷新grid
 * */
function reloadGrid(rowId){
	$('#componentList').jqGrid().trigger("reloadGrid");
    // setTimeout(function () {
    //     if(rowId){
    //         $('#componentList').jqGrid('setSelection',rowId);
    //     }
    // },1500);
}

/**
 * 刷新组件内容
 * @param btn
 */
function refreshPortlet(btn,contentUrl) {
    try{
        if(contentUrl&&contentUrl.indexOf('?')!=-1){
            contentUrl = contentUrl + '&_t='+new Date().getTime();
        }else{
            contentUrl = contentUrl + '?_t='+new Date().getTime();
        }
        $(btn).parents('div.groupnews_container').find('.component-content').load(contentUrl,function () {
            var portlet = $(btn).parents('div.groupnews_container');
            var footer = portlet.find('.footer');
            if(footer.length>0) {
                portlet.css({
                    border:'none',
                    'background-color':footer.css('background-color')
                })
            }

            var copyright = portlet.find('.copyright');
            if(copyright.length>0) {
                copyright.css({'margin-top':'10px'});
                portlet.css({
                    border:'none',
                    'background-color':copyright.css('background-color')
                })
            }
        });
    }catch (e){

    }
}

/**
 * 组装组件列表
 * @param component
 */
function assembleComponentList(component) {
    var liObj = $('<li></li>');
    liObj.addClass('dropable-cs');

    var spanIconObj = $('<span></span>');
    spanIconObj.addClass('glyphicon');
    spanIconObj.addClass('glyphicon-cog');
    liObj.append(spanIconObj);

    var spanTextObj = $('<span></span>');
    spanTextObj.addClass('glyphicon-class');
    spanTextObj.text(component.title);
    liObj.append(spanTextObj);

    //拖拽容器
    var divObj = $('<div class="resizable-cs"></div>');
    liObj.append(divObj);

    //组件容器
    var groupNewsContainerObj = $('<div class="groupnews_container"></div>');
    groupNewsContainerObj.attr('data-contentUrl',component.contentUrl);
    groupNewsContainerObj.attr('data-title',component.title);
    groupNewsContainerObj.attr('id',component.componentId);
    divObj.append(groupNewsContainerObj);

    //
    var fullWidthObj = $('<div class="fullWidth"></div>');
    groupNewsContainerObj.append(fullWidthObj);

    //标题容器
    var newsTitleObj = $('<div class="news_title clearfix"></div>');
    fullWidthObj.append(newsTitleObj);

    //标题
    var titleSpanObj = $('<span><img src="../../common/img/arrow_mini.png" alt="">'+component.title+'</span>');
    //titleSpanObj.text(component.title);
    newsTitleObj.append(titleSpanObj);

    //更多按钮
    //var moreLinkObj = $('<a href="#" class="news_more">更多</a>');
    /*if(component.moreUrl&&component.moreUrl!=''){
     var reg = /^(http:\/\/)/;
     component.moreUrl = reg.test(component.moreUrl)?component.moreUrl:('http://'+window.location.host+component.moreUrl);
     //moreLinkObj.attr('href',component.moreUrl);
     }else{
     moreLinkObj.attr('href','javascript:void(0)');
     }*/
    //newsTitleObj.append(moreLinkObj);

    //组件内容
    var contentObj = $('<div class="component-content"></div>');
    contentObj.css({'min-heihgt':'260px'});
    fullWidthObj.append(contentObj);

    //操作按钮栏
    var toolsObj = $('<div class="component-tools"></div>');
    toolsObj.css({
        position: 'absolute',
        right: '0',
        top: '0px',
        border: 'none',
        height: '40px',
        //width: '5%',
        'z-index': '5',
        //'background-color': '#333',
        filter:'alpha(Opacity=80)',
        '-moz-opacity':'0.3',
        'opacity': '0.3'
        //display:'none'
    });
    fullWidthObj.append(toolsObj);

    //操作按钮
    var toolsGroupObj = $('<div class="pull-right"></div>');
    toolsGroupObj.css({'line-height':'40px'});
    toolsObj.append(toolsGroupObj);
    //删除按钮
    var delObj = $('<a href="javascript:void(0);" class="news_more" title="删除" ><i class="glyphicon glyphicon-remove"></i> </a>');
    delObj.attr('onclick','removePortlet(this,"'+component.title+'")');
    delObj.css({
        float:'right',
        'margin-right':'10px',
        color: '#fff'
    });
    //toolsGroupObj.append(delObj);

    //移动按钮
    var moveObj = $('<a href="javascript:void(0);" class="news_more move" title="移动" ><i class="glyphicon glyphicon-move"></i> </a>');
    moveObj.css({
        cursor:'move',
        float:'right',
        'margin-right':'10px',
        color: '#fff'
    });
    //toolsGroupObj.append(moveObj);

    //刷新按钮
    var refreshObj = $('<a href="javascript:void(0);" class="news_more" title="刷新" ><i class="glyphicon glyphicon-refresh"></i> </a>');
    refreshObj.attr('onclick','refreshPortlet(this,"'+component.contentUrl+'")');
    refreshObj.css({
        float:'right',
        'margin-right':'10px',
        color: '#333',
        display:'none'
    });
    toolsGroupObj.append(refreshObj);

    //编辑组件属性按钮
    var editObj = $('<a href="javascript:void(0);" class="news_more" title="编辑组件属性" ><i class="glyphicon glyphicon-edit"></i> </a>');
    editObj.attr('onclick','editComponentAttr(this)');
    editObj.css({
        float:'right',
        'margin-right':'10px',
        color: '#fff'
    });
    //toolsGroupObj.append(editObj);

    //更多按钮
    var moreObj = $('<a href="javascript:void(0);" class="news_more" title="更多" ><i class="glyphicon glyphicon-th-list"></i> </a>');
    if(component.moreUrl&&component.moreUrl!=''){
        var reg = /^(http:\/\/)/;
        component.moreUrl = reg.test(component.moreUrl)?component.moreUrl:('http://'+window.location.host+component.moreUrl);
        moreObj.attr('href',component.moreUrl);
        moreObj.attr('target','_blank');
    }
    moreObj.css({
        float:'right',
        'margin-right':'10px',
        color: '#333'
    });
    toolsGroupObj.append(moreObj);

    return divObj;
}

