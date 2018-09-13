/**
 * Created by Huwl on 2017/5/3.
 */

$(function() {
    //左侧树加载
    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        },
        edit: {
            enable: false
        },
        view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false,
            fontCss: function(treeId, node) {
                return node.font ? node.font : {};
            },
            nameIsHTML: true
        },
        callback: {
            onClick: zTreeOnClick, //点击节点事件
        }
    };

    var zNodes =[
        { id:14, pId:0, name:"所有帖子"},
        { id:1, pId:0, name:"我的论坛", open:true, font:{'font-weight':'bold'}, click: false},
        { id:11, pId:1, name:"发表的帖子"},
        { id:12, pId:1, name:"参加的讨论"},
        { id:13, pId:1, name:"论坛用户信息"},
        { id:2, pId:0, name:"论坛首页", open:true, font:{'font-weight':'bold'}, click: false},
        { id:21, pId:2, name:"鑫苑大家谈", click:false},
        { id:22, pId:2, name:"总经理论坛", click:false},
        { id:23, pId:2, name:"规章制度释疑", click:false},
        { id:24, pId:2, name:"技术专业论坛", click:false},
        { id:25, pId:2, name:"房地产行情", click:false},
        { id:3, pId:0, name:"精华区", open:true, font:{'font-weight':'bold'}, click: false},
        { id:31, pId:3, name:"鑫苑大家谈"},
        { id:32, pId:3, name:"总经理论坛"},
        { id:33, pId:3, name:"规章制度释疑"},
        { id:34, pId:3, name:"技术专业论坛"},
        { id:35, pId:3, name:"房地产行情"},
        { id:36, pId:0, name:"搜索"},
        { id:4, pId:0, name:"论坛设置", open:true, font:{'font-weight':'bold'}, click: false},
        { id:41, pId:4, name:"论坛设置"},
        { id:42, pId:4, name:"板块分类设置"},
        { id:43, pId:4, name:"板块设置"},
        { id:44, pId:0, name:"禁言记录"}
    ];

    $.fn.zTree.init($("#zTreeDom"), setting, zNodes);
    //计算ztree宽度
    $(".slide-left .ztree").height(($(window).height()-107)+"px");

    getListData();  //拉取数据
})

function zTreeOnClick(event, treeId, treeNode, clickFlag) {
    if(!treeNode.isParent) {
        var obj = {};   //TODO 查询条件集合 查询条件需要和后台提供
        obj.treeId = treeId;
        obj.status = '1';
        obj.author = 'aaa';
        $("#bbs-list").jqGrid('setGridParam', {
            postData: obj
        }).trigger('reloadGrid');
    }
}

//构建模板列表
function getListData(queryCondition){
    queryCondition = queryCondition ? queryCondition : {'forumId':'','essence':'','title':''};
    var jqGrid = $("#bbs-list").jqGrid({
        url : serviceUrl + "bbs/bbsTopic/page",//TODO 获取数据的地址 前端测试接口 需要更换为后台真正接口
        datatype : "json",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        mtype: "POST",
        postData: queryCondition,
        jsonReader : {
            repeatitems: false
        },
        colModel : [
            {name:'id',label:'id',align:"center", sortable:false,hidden:true},
            // {name:'id',label:'序号',align:"center", formatter: function(a,b,c) {
            //     console.log(c)
            //     return a;
            // }},
            {name:'title',label:'主题',align:"center",sortable:false, width:350},
            {name:'forumId',label:'板块ID',align:"center",  sortable:false,hidden:true},
            {name:'forum',label:'板块',align:"center", sortable:false,width:200},
            {name:'createPersonName',label:'作者',align:"center",sortable:false, width:200},
            {name:'clickNum',label:'点击量',align:"center",sortable:false, width:100},
            {name:'replyNum',label:'回复数',align:"center",sortable:false, width:100},
            {name:'updateTime',label:'更新时间',align:"center",sortable:false, width:250},
            {name:'lasteplyUser',label:'最后回复',align:"center",sortable:false, width:150},
            {name:'lasteplyUserId',label:'最后回复人ID',align:"center",sortable:false, hidden:true}
        ],
        forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
        pager : '#pagered',//定义翻页用的导航栏，必须是有效的html元素
        rowNum : 20,//在grid上显示记录条数，这个参数是要被传递到后台
        rowList : [ 20, 50, 100, 200 ],//可供用户选择一页显示多少条
        viewrecords : true, //定义是否要显示总记录数
        autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度
        multiselect:true,//定义是否可以多选
        ondblClickRow: function(rowid,iRow,iCol,e) {    //双击弹出帖子的详细页面
            // console.log(rowid)
            window.open("bbs_detail.html?bbsId=" + rowid);
        },
        gridComplete:function(){
            $.xljUtils.resizeNestedGrid();
            $.xljUtils.addGridScroll();
        },
        loadError:function(xhr,status,error){
            $.xljUtils.getError(xhr.status);
        }
    });
}