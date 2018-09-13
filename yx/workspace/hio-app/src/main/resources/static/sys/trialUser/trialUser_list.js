/**
 * Created by luoro on 2017/11/20.
 */
$(function(){
    //添加时间事件
    $('.form_datetime').datetimepicker({
        language: 'zh-CN', //语言
        format: 'yyyy-mm-dd',//显示格式  HH:ii:ss
        minView: "month",//设置只显示到月份
        initialDate: new Date(),//初始化当前日期
        autoclose: true,//选中自动关闭
        todayBtn: true//显示今日按钮
    })
    //页面加载完成之后执行
   pageInit();
    //页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    //重置模糊搜索关键字
    $('#searchBtn').val('');
    $('#searchBtn').on('click',function () {
        searchDate();
    });

});

function pageInit(){
    jQuery("#list2").jqGrid(
        {
            url: '/platform-app/sys/thirdPartyAuthentication/obtainTrialOrgUserList',
            ajaxGridOptions: {
                contentType: 'application/json'
            },
            mtype: "POST",
            contentType: "application/json",
            datatype: "json",
            postData: {},
            autowidth: true,
            rownumbers: true,
            jsonReader: {
                repeatitems: false

            },
            // colNames : [ 'id', '姓名','电话' ,'职务','公司名称' ,'所属行业', '员工数量','到期时间' ],
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',label : 'id',hidden:true,align : "center"},
                {name : 'name',label : '姓名',align : "center"},
                {name : 'phone',label : '电话',align : "center"},
                {name : 'duty',label : '职务',align : "center"},
                {name : 'companyName',label : '公司名称',align : "center"},
                {name : 'industry',label : '所属行业',align : "center", formatter: industryFormatter,unformat:industryUnformatter },
                {name : 'personNum',label : '员工数量',align : "center"},
                {name : 'createDate',label : '注册时间',align : "center"}
                // {name : 'dueTime',label : '到期时间',align : "center"}
            ],
            loadError:function(xhr,status,error){
                //异常处理
                // console.log(xhr.status);
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
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            rowNum: 20, //一页显示多少条
            rowList: [20, 50, 100, 200], //可供用户选择一页显示多少条
            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            viewrecords : true
        });

}
/**
 * <option value="1">房地产</option>
 <option value="2">建筑交通</option>
 <option value="3">生产制造</option>
 <option value="4">金融投资</option>
 <option value="5">互联网/电子商务</option>
 <option value="6">媒体广告</option>
 <option value="7">农林牧渔</option>
 <option value="8">餐饮服务</option>
 <option value="9">其他</option>
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {*}
 */
function industryFormatter(cellvalue, options, rowObject) {
    if(cellvalue == "1"){
        return "房地产";
    }else if(cellvalue == "2"){
        return "建筑交通";
    }else if(cellvalue == "3"){
        return "生产制造";
    }else if(cellvalue == "4"){
        return "金融投资";
    }else if(cellvalue == "5"){
        return "互联网/电子商务";
    }else if(cellvalue == "6"){
        return "媒体广告";
    }else if(cellvalue == "7"){
        return "农林牧渔";
    }else if(cellvalue == "8"){
        return "餐饮服务";
    }
    return "其他";
}
function industryUnformatter(cellvalue, options, rowObject) {
    if(cellvalue == "房地产"){
        return "1";
    }else if(cellvalue == "建筑交通"){
        return "2";
    }else if(cellvalue == "生产制造"){
        return  "3";
    }else if(cellvalue == "金融投资"){
        return "4";
    }else if(cellvalue == "互联网/电子商务"){
        return "5";
    }else if(cellvalue == "媒体广告"){
        return  "6";
    }else if(cellvalue == "农林牧渔"){
        return "7";
    }else if(cellvalue == "餐饮服务"){
        return "8";
    }
    return "暂无";
}
function searchDate(){
    var registerDate=$("#registerDate").val();
    jQuery("#list2").jqGrid("setGridParam",{postData:{'createDate':registerDate}}).trigger("reloadGrid");
}


