/**
 * @author luorongxin
 */
var id;//编辑的菜单id
var name;//编辑的名称
var pname;//父级菜单名
var oper;//操作
var rowData;//选中的系统菜单
var uuid;
var url;//提交表单的地址
var type;//提交表单的方法
var menuSelector;
$(function () {
    function initPortalSelector() {
        //选择所属门户
        $('#portalSelectorEle').xljMultipleSelector({
            title:'选择所属门户',//选择器标题，默认是'选择组织机构'
            selectorType:'portalSelector',//选择器类型，默认是组织机构选择器
            immediatelyShow:false,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
            gridTitle:'门户列表',//列表标题，默认是'组织列表'
            treeTitle:'门户',//树标题，默认是'组织列表'
            treeUrl:hostUrl + 'oa/portal/portalPage/queryList?_t='+new Date().getTime(),
            treeParam:{'portalPageOwner':'_NA_','delflag':false,sidx:'priority',sord:'desc'},
            treeSettings:{
                data:{
                    key:{
                        name:'portalPageName'
                    }
                }
            },
            targetId:'portalId',//选择的数据的ID存储input域ID
            targetName:'portalName',//选择的数据的Name存储input域ID
            gridColNames:['ID','名称','名称','编号','描述'],
            gridColModel:[
                {name : 'id',width : 100,align : "center",hidden : true},
                {name : 'name',width : 90,align : "center",formatter:function (cellvalue, options, rowObject) {
                    return rowObject.portalPageName;
                }},
                {name : 'portalPageName',width : 90,align : "center",hidden:true},
                {name : 'portalPageCode',width : 90,align : "center"},
                {name : 'portalPageDesc',width : 150,align : "center"}
            ],
            /**
             * 保存回调函数
             * @param selectedData 已选择的数据json对象
             * @param ele 绑定选择器的对象
             */
            saveCallback:function (selectedData,ele) {
                console.info(selectedData);
            }
        });
    }

    //初始化
    initPage();

    initPortalSelector();

    //页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    //加载系统菜单选择组件
    menuSelector = $('#target00').xljSingleSelector({
        title: '选择系统菜单',//选择器标题，默认是'选择组织机构'
        selectorType: 'menu',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；person表示人员选择器；post表示岗位选择器；role表示角色选择器；menu表示菜单选择器
        /**
         * 保存回调函数
         * @param selectDatas 已选择的数据json对象
         */
        saveCallback: function (selectData,ele) {
            var _proUrl = selectData.resourceurl;
            if(_proUrl.indexOf("?")==-1){
                _proUrl = _proUrl+"?btnMenuCode="+selectData.code;
            }else{
                _proUrl = _proUrl+"&btnMenuCode="+selectData.code;
            }

            if(selectData.type=='APPSystem'){
                _proUrl += '&_proCode='+selectData.code;
            }else{
                _proUrl += '&_proCode='+getLevelOneNode(selectData).code + '&_menuCode='+selectData.code;
            }

            $('#menuName').val(selectData.name);
            $('#url').val(_proUrl);
            $('#resourceId').val(selectData.id);
            if (selectData.type == "RESOURCE") {
                $('#resourceName').val("菜单");
            } else if (selectData.type == "APPSystem") {
                $('#resourceName').val("系统");
            }
        }
    });

    $('#removePortal').on('click',function () {
        $('#portalId').val('');
        $('#portalName').val('');
    });
});

function getLevelOneNode(node) {
    var pnode = node.getParentNode();
    if(pnode){
        node = getLevelOneNode(pnode);
    }
    return node;
}

function newFile(target) {
    //判断文件类型
    var filePath = target.value;
    if(filePath!=""){
        var fileType=(filePath.substr(filePath.lastIndexOf("."))).toLowerCase();
        if(fileType!=".jpg"&&fileType!=".gif"&&fileType!=".jpeg"&& fileType!=".png"){
            pop_tip_open("blue","您上传图片的类型不符合(.jpg|.jpeg|.gif|.png)！");
            clearPic();
            return false;
        }
    }

    document.getElementById('newImg').setAttribute('width',"80px");
    document.getElementById('newImg').setAttribute('hight',"80px");
    try{
        var windowURL = window.URL || window.webkitURL;
        var loadImg = windowURL.createObjectURL(document.getElementById('photoPic').files[0]);
        document.getElementById('newImg').setAttribute('src',loadImg);
    }catch(e){
        document.getElementById('newImg').setAttribute('src',"../../common/img/default.png");
        var div = document.getElementById('newImg');
        document.getElementById('photoPic').select();
        document.getElementById('photoPic').blur();
        top.parent.document.body.focus();
        var src = document.selection.createRange().text;
        div.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
    }
    $('#newImg').next().html("");
    $('#newImg').next().append("<a href='javascript:void(0)' onclick='clearPic()'>删除</a>");
    $("#isDelPic").val("1");
    $('#newImg').show();
}
function clearPic(){
    $("#newImg").removeAttr("width");
    $("#newImg").removeAttr("height");
    $('#newImg').next().html("");
    $("#isDelPic").val("0");
    $('#newImg').hide();
    $('#photoPic').replaceWith('<input type="file" id="photoPic"  onchange="newFile(this)" name="image" multiple="true" class="" accept="image/*"/>');
}

/**
 * 初始化页面
 */
function initPage() {
    //获取url参数
    id = $.xljUtils.getUrlParam("id");
    name = decodeURI(escape($.xljUtils.getUrlParam("name")));
    pname = decodeURI(escape($.xljUtils.getUrlParam("pname")));
    oper = $.xljUtils.getUrlParam("oper");
    //重置表单
    $('#naviMenuForm')[0].reset();
    $("#closeMenuBtn").on("click", function () {
        document.getElementById("naviMenuForm").reset();
        $("#naviMenuForm :input[type='hidden']").val("");
    });
    //类型切换
    $('#type').change(function () {
        var p1 = $(this).children('option:selected').val();//这就是selected的值
        if (p1 == '0') {
            $('#typeName').val('系统菜单');
            //菜单、链接只读
            $('#url').prop('readonly', true);
            $('#menuName').prop('readonly', true);
            $('#menuName').val('');
            $('#url').val('');
            $('#target00').show();//弹出菜单modal
        } else if (p1 == '1') {
            $('#typeName').val('自定义菜单');
            //链接、菜单自定义可编辑
            $('#url').val('');
            $('#menuName').val('');
            $('#menuName').prop('readonly', false);
            $('#url').prop('readonly', false);
            $('#resourceName').val('');
            $('#resourceId').val('');
            $('#target00').hide();//隐藏菜单modal
        }
        $('#type').val(p1);
    });
    //绑定按钮事件
    //保存菜单
    $("#saveMenuBtn").unbind('click').on('click', function () {
        $("#naviMenuForm").attr("data-validate-success","submitForm()");
        $("#naviMenuForm").submit();
    });
    //关闭当前页面
    $("#closeMenuBtn").unbind('click').on('click', function () {
        window.close();
    });
    //父级信息只读
    $('#parentName').prop('readonly', 'readonly');
    //新增操作
    if (oper == "add") {
        //隐藏预览图片dom
        $('#newImg').hide();

        $('title').text("导航菜单-新增");
        $(".xj-form-title").text("导航菜单-新增");
      //  $('#naviMenuForm').attr('action', baseUrl + '/oa/sys/sysNaviMenu/save');
        $("input[type=radio][name=state][value=true]").prop('checked', true);
        //初始化UUID
        $.ajax({
            type: "GET",
            url: "../../oa/content/contentChild/getGuuid?_time="+new Date().getTime(),
            dataType: "json",
            async:false,
            success: function (resultValue) {
                console.info(resultValue);
                uuid = resultValue.result;
                $('#id').val(uuid);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });

        if (id != 'undefined') {
            //二级数据添加父级信息
            $('#parentId').val(id);
            $('#parentName').val(name);

            if(window.opener&&$.isFunction(window.opener.getSelectRowData)){
                var rowData = window.opener.getSelectRowData(id);
                $('#portalId').val(rowData.portalId);
                $('#portalName').val(rowData.portalName);
            }
            //$('#portalSelectorEle').unbind('click');
        }



        //修改操作
    } else if (oper == "edit") {
        $('title').text("导航菜单-修改");
        $(".xj-form-title").text("导航菜单-修改");
        editNaviMenu(id);

        //查看明细
    } else if (oper == "detail") {
        $('title').text("导航菜单-明细");
        $(".xj-form-title").text("导航菜单-明细");
        detailNaviMenu(id);
    }
}
/**
 * 编辑菜单
 * @param
 */
function editNaviMenu(id) {
    var formElements = $("#naviMenuForm").serializeArray();
    $.ajax({
        type: 'GET',
        url: baseUrl + "/oa/sys/sysNaviMenu/get/" + id + '?time=' + Math.random(),
        //data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (xhr, textStatus) {
            if (xhr) {
                if (xhr.success) {
                    var editObjData = xhr.result;
                    for (var item in editObjData) {
                        if(item=='linkType'){
                            $('#naviMenuForm input[name="linkType"][value="'+editObjData.linkType+'"]')[0].checked=true;
                            continue;
                        }

                        if(item=='state'){
                            $('input[name="state"][value="'+editObjData.state+'"]')[0].checked=true;
                            $('input[name="state"]').attr('disabled',true);
                            continue;
                        }

                        if (item == 'type') {
                            var inputVal = editObjData.type;
                            var selecter = document.getElementById("type");
                            if (inputVal == '0') {
                                selecter.options[0].selected = true;
                                $('#url').prop('readonly', true);
                                $('#target00').show();//弹出菜单modal
                            } else if (inputVal == '1') {
                                selecter.options[1].selected = true;
                                $('#menuName').prop('readonly', false);
                                $('#url').prop('readonly', false);
                                $('#target00').hide();//隐藏菜单modal
                            }
                            continue;
                        }
                        if(item == 'image'){
                            if(editObjData.image){
                                document.getElementById('newImg').setAttribute('src',"data:image/jpeg;base64,"+editObjData.image);
                                document.getElementById('newImg').setAttribute('width',"80px");
                                document.getElementById('newImg').setAttribute('hight',"80px");
                                $('#newImg').next().append("<a href='javascript:void(0)' onclick='clearPic()'>删除</a>");
                                $("#isDelPic").val("1");
                            }else{
                                //隐藏预览图片dom
                                $('#newImg').hide();
                            }
                            continue;
                        }
                        $("#naviMenuForm :input[name='" + item + "']").val(editObjData[item]);
                    }
                    $("#naviMenuForm :input[name='parentName']").val(pname);

                    var parentId = $('#parentId').val();
                    if(parentId!=''&&$.xljUtils.getUrlParams().oper=='add'){
                        try {
                            if(window.opener&&$.isFunction(window.opener.getSelectRowData)){
                                var rowData = window.opener.getSelectRowData(parentId);
                                $('#portalId').val(rowData.portalId);
                                $('#portalName').val(rowData.portalName);
                            }
                            //$('#portalSelectorEle').unbind('click');
                        } catch(e) {

                        }

                    }
                } else {
                    //异常处理
                    switch (xhr.code) {
                        case "50000":
                            $.xljUtils.tip("red", xhr.msg);
                            break;
                        case "50002":
                            $.xljUtils.tip("red", xhr.msg);
                            break;
                        default:
                            $.xljUtils.tip("red", "服务异常,请联系管理员！");
                            break;
                    }
                }

            } else {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }
    });

}


/**
 * 表单保存提交
 */
function submitForm() {
    var  url = hostUrl+"oa/sys/sysNaviMenu/save";
    if(oper=="add"){
    }else{
        url = hostUrl+"oa/sys/sysNaviMenu/update";
    }
    var ajax_option={
        url:url,//form 的action
        type:"post",  //form 的method方法
        //beforeSubmit:checkUppro,  //在表达提交前执行的验证函数
        contentType: "application/x-www-form-urlencoded; charset=utf-8",   //设置编码集
        success:function(data){  //表单提交成功后执行的函数
            formSubmitCallBack(data);
        }
    };
    $('#naviMenuForm').ajaxSubmit(ajax_option);
}
/**
 * form表单提交回掉方法
 */
function formSubmitCallBack(resultData){
    resultData = JSON.parse(resultData);
    if(resultData) {
        var successFlag = resultData.success;
        var result = resultData.result;
        var msg = resultData.msg;
        if (successFlag) {
            if (window.opener != null) {
                //window.opener.setJqGridAddedRowId($('#id').val());
                //刷新父页面grid
                window.opener.reloadGrid($('#id').val());
            }
            document.getElementById("naviMenuForm").reset();
            window.close();
        } else {
            switch (resultData.code) {
                case "50000":
                    $.xljUtils.tip("red", resultData.msg);
                    break;
                case "50001":
                    $.xljUtils.tip("red", resultData.msg);
                    break;
                case "50002":
                    $.xljUtils.tip("blue", resultData.msg);
                    break;
                case "50003":
                    $.xljUtils.tip("red", resultData.msg);
                    break;
                case "50006":
                    $.xljUtils.tip("red", resultData.msg);
                    break;
                default:
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    break;
            }
        }
    }
}

/**
 * 模糊查询: 名字或者编码
 */
function fuzzySearch() {
    $('#list2').jqGrid().trigger("reloadGrid");

};
function empty(){
	$("#parentId").val("");
	$("#parentName").val("");


}