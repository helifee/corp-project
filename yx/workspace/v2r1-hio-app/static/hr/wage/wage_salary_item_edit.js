/**
 * Created by ciic on 2017/6/19.
 */
;(function ($,window,document,undefined) {

    var openType;//打开方式  1修改 0新增
    var itemType;//项目类别
    var showClassify;//选中的工资条显示项ID，方便值回显
    var itemDataSource;//选择的数据来源
    var fouceList;//聚焦表格

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //计算高度
    window.resizeHeight = function () {
        var w_h = $(window).height();
        //右侧table
        $(".con-table .mytable").height((w_h-70)+"px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height()-45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    };


    //查询用户功能权限
    window.queryAuth = function(){
        $.ajax({
            type:'POST',
            url:hostUrl+"auth/authData/queryAuthorizationBtnList",
            dataType:'JSON',
            contentType:'application/json',
            async:false,//设置为同步
            data:JSON.stringify({"menuCode":"hr_salary"}),
            success:function(json){
                var list=json.result;
                if(list!=null&&list.length>0) {
                    $.each(list,function(index,value){
                        for(var key in value){
                            if(key=="code"&&value[key]=="2"){//编辑权限
                                $("#saveBtn").show();//保存
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };


    //页面初始化
    window.initSalaryForm  = function () {

        //打开方式：0新增，1修改
        openType = localStorage.getItem('openType');
        if (openType && openType != undefined && openType != 'undefined' && openType != null) {
            openType = JSON.parse(openType);
        }
        //项目类别
        itemType = localStorage.getItem('itemType');
        if (itemType && itemType != undefined && itemType != 'undefined' && itemType != null) {
            itemType = JSON.parse(itemType);
        }

        //要手动remove
        // localStorage.removeItem('openType');
        // localStorage.removeItem('itemType');

        //设置面板
        setFormProperty(openType,itemType);

        if(openType==1) {   //编辑
            getSalaryItemById();
            $("#saveBtn").unbind('click').on('click', function () {
                $("#salaryItemFrom").attr("data-validate-success","updateSave()");
                $("#salaryItemFrom").submit();
            });
        } else if(openType==0) { //新增
            initUuid();
            $("#saveBtn").unbind('click').on('click', function () {
                $("#salaryItemFrom").attr("data-validate-success","addSave()");
                $("#salaryItemFrom").submit();
            });
        }
    };

    //新增保存
    window.addSave = function () {
        var salaryItemArr= $("#salaryItemFrom").serializeArray();
        var salaryItemDto={};
        //过滤掉不必要的参数
        for(var i in salaryItemArr){
            if(salaryItemArr[i].name=="id") {
                salaryItemDto.id=salaryItemArr[i].value;
                salaryItemDto.sid=salaryItemArr[i].value;
            }else if(salaryItemArr[i].name=="name"||salaryItemArr[i].name=="itemPerce"||salaryItemArr[i].name=="itemProperty"||salaryItemArr[i].name=="status") {
                salaryItemDto[salaryItemArr[i].name]=salaryItemArr[i].value;
            } else if(salaryItemArr[i].name=="itemType"||salaryItemArr[i].name=="taxRule"||salaryItemArr[i].name=="showClassify"||salaryItemArr[i].name=="itemDataSource") {
                salaryItemDto[salaryItemArr[i].name]=salaryItemArr[i].value;
            }
        }

        var tempId = $("#id").val();
        salaryItemDto.id = tempId;
        salaryItemDto.sid = tempId;
        salaryItemDto.type = $("#type").val();

        //如果是新增加津贴公式，则单独为津贴公式设置对应关系：实际出勤天数
        if(itemType==SALARY_ITEM_TYPE_AllOWANCE) {
            salaryItemDto.correspond = "actual_working_days";
        }
        salaryItemDto.delflag=0;
        if(tempId!=null&&tempId!='') {
            $.ajax({
                type: "POST",
                url: hostUrl + "wage/wageSalaryItem/saveSalaryItem",
                data: JSON.stringify(salaryItemDto),
                dataType: "JSON",
                contentType: "application/json",
                success: function (resultData) {
                    if (resultData != null) {
                        var successFlag = resultData.success;
                        var result = resultData.result;
                        var message = resultData.message;
                        if (successFlag) {
                            $.xljUtils.tip("green", "薪资项新增保存成功！");
                            localStorage.setItem('gotoTab', JSON.stringify(fouceList));//跳转至个税页签
                            localStorage.setItem('editId', JSON.stringify($("#id").val()));//修改主键ID
                            window.history.go(-1);
                        } else {
                            pop_tip_open("blue", message);
                        }
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "薪资项新增请求失败");
                }
            });
        }
    };

    //修改保存
    window.updateSave = function () {
        var salaryItemArr= $("#salaryItemFrom").serializeArray();
        var salaryItemDto={};
        //过滤掉不必要的参数
        for(var i in salaryItemArr){
            if(salaryItemArr[i].name=="name"||salaryItemArr[i].name=="itemPerce"||salaryItemArr[i].name=="itemProperty"||salaryItemArr[i].name=="status") {
                salaryItemDto[salaryItemArr[i].name]=salaryItemArr[i].value;
            } else if(salaryItemArr[i].name=="itemType"||salaryItemArr[i].name=="taxRule"||salaryItemArr[i].name=="showClassify"||salaryItemArr[i].name=="itemDataSource") {
                salaryItemDto[salaryItemArr[i].name]=salaryItemArr[i].value;
            }
        }
        salaryItemDto.delflag=0;
        var tempId = $("#id").val();
        salaryItemDto.id = tempId;
        salaryItemDto.type = $("#type").val();//数据类型固定为小数
        if(tempId!=null&&tempId!='') {
            $.ajax({
                type: "PUT",
                url:hostUrl+ "wage/wageSalaryItem/updateSalaryItem/"+tempId,
                data:JSON.stringify(salaryItemDto),
                dataType: "JSON",
                contentType:"application/json",
                success: function(resultData){
                    if(resultData!=null) {
                        var successFlag = resultData.success;
                        var result = resultData.result;
                        var message = resultData.message;
                        if(successFlag) {
                            $.xljUtils.tip("green","薪资项修改保存成功！");
                            localStorage.setItem('gotoTab',JSON.stringify(fouceList));//跳转至个税页签
                            localStorage.setItem('editId',JSON.stringify(tempId));//修改主键ID
                            window.history.go(-1);
                        }else {
                            pop_tip_open("blue",message);
                        }
                    }
                },error:function(XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "薪资项修改请求失败");
                }
            });
        }

    };

    //初始化主键
    window.initUuid = function () {
        var uBody = "generator/getGuuid"+"?time="+Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type:'GET',
            url:uAll,
            success: function(data) {
                var guuid=data.result;
                $("#id").val(guuid);
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        })
    };

    //根据项目id获取记录
    window.getSalaryItemById = function () {

        var editId = localStorage.getItem('editId');

        if (editId != null && editId != '' && editId != 'undefined') {
            editId = JSON.parse(editId);
            $.ajax({
                type:'get',
                url:hostUrl +"sys/sysInfoItem/get/"+editId,
                success: function(data) {
                    $("#id").val(data.result.sid);
                    $("#name").val(data.result.name);
                    $("#itemPerce").val(data.result.itemPerce);
                    $("#itemProperty").val(data.result.itemProperty);
                    $("#status").val(data.result.status);
                    $("#itemType").val(data.result.itemType);
                    $("#taxRule").val(data.result.taxRule);
                    //工资条显示分类
                    showClassify = data.result.showClassify;
                    if(showClassify!=null&&showClassify.showClassify!='') {
                        $("input[name='showClassify'][value='"+ showClassify +"']").prop("checked",true);  //根据Value值设置Radio为选中状态
                    }
                    //数据来源处理
                    itemDataSource = data.result.itemDataSource;
                    if(itemDataSource!=null&&itemDataSource!='') {
                        $("input[name='itemDataSource'][value='"+ itemDataSource +"']").prop("checked",true);  //根据Value值设置Radio为选中状态
                    }

                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    pop_tip_open("red","初始化薪资项请求失败");
                }
            });
        } else {
            pop_tip_open("blue","数据初始化失败!");
        }
        //要手动remove
        // localStorage.removeItem('editId');
    };

    //设置面板属性
    window.setFormProperty = function (openType,itemType) {

        //新增对固定项进行赋默认值
        if(openType==0) { //新增,赋默认值
            $("#itemProperty").val("2");
            $("#status").val("1");
            $("#itemType").val(itemType);
        }

        //固定项目：(只能修改，不能被新增) 只能维护名称、工资条显示分类和小数位数、状态
        if(itemType==SALARY_ITEM_TYPE_SALARY) {
            $("#name").removeAttr("disabled");
            $("#itemPerce").removeAttr("disabled");
            $("#status").removeAttr("disabled");
            $("#taxRule").prop("disabled","disabled");
            $("#itemProperty").prop("disabled","disabled");
            $("#itemType").prop("disabled","disabled");

            fouceList = "salaryItemList";
        }
        //津贴项目可以维护名称、小数位数、工资条显示分类、状态、计税规则
        else if(itemType==SALARY_ITEM_TYPE_AllOWANCE) {
            $("#name").removeAttr("disabled");
            $("#itemPerce").removeAttr("disabled");
            $("#status").removeAttr("disabled");
            $("#taxRule").removeAttr("disabled");
            $("#itemProperty").prop("disabled","disabled");
            $("#itemType").prop("disabled","disabled");
            fouceList = "allowanceItemList";
        }
        //奖金项目可以进行新增、修改、删除，同时新增和修改时可以维护名称、小数位数、工资条显示分类、状态、计税规则
        else if(itemType==SALARY_ITEM_TYPE_BONUS) {
            $("#name").removeAttr("disabled");
            $("#itemPerce").removeAttr("disabled");
            $("#status").removeAttr("disabled");
            $("#taxRule").removeAttr("disabled");
            $("#itemProperty").prop("disabled","disabled");
            $("#itemType").prop("disabled","disabled");
            fouceList = "bonusItemList";
        }
        //考勤项目可以修改和公式设置，修改时只能修改工资条显示分类
        else if(itemType==SALARY_ITEM_TYPE_KQ) {
            $("#name").prop("disabled","disabled");
            $("#itemPerce").prop("disabled","disabled");
            $("#taxRule").prop("disabled","disabled");
            $("#itemProperty").prop("disabled","disabled");
            $("#itemType").prop("disabled","disabled");
            $("#status").removeAttr("disabled");

            fouceList = "kqItemList";
        }
        //社保项目可以修改，修改时只能修改工资条显示分类
        else if(itemType==SALARY_ITEM_TYPE_SI) {
            $("#name").prop("disabled","disabled");
            $("#itemPerce").prop("disabled","disabled");
            $("#taxRule").prop("disabled","disabled");
            $("#status").removeAttr("disabled");
            $("#itemProperty").prop("disabled","disabled");
            $("#itemType").prop("disabled","disabled");
            fouceList = "siItemList";
        }
        //其他项目只能新增、修改、删除，同时新增和修改时可以维护名称、小数位数、工资条显示分类
        else if(itemType==SALARY_ITEM_TYPE_OTHER) {
            $("#name").removeAttr("disabled");
            $("#itemPerce").removeAttr("disabled");
            $("#status").removeAttr("disabled");
            $("#taxRule").removeAttr("disabled");
            $("#itemProperty").prop("disabled","disabled");
            $("#itemType").prop("disabled","disabled");
            fouceList = "otherItemList";
        }
    };

    //返回上一级
    window.goBackByWageBasics = function () {
        localStorage.setItem('gotoTab',JSON.stringify(fouceList));//跳转至个税页签
        localStorage.setItem('editId', JSON.stringify($("#id").val()));//修改主键ID
        window.history.go(-1);
    };


    $(function () {

        //按钮权限控制
        queryAuth();

        resizeHeight();//设置高度

        initSalaryForm();

        resizeGrid(); //设置宽度

        //选择数据来源后进行相关处理
        $("input:radio[name=itemDataSource]").change(function () {

            var temp = $(this).val();

            //按类别进行数据来源控制
            //固定项目：不能被修改，只能为调定薪
            if(itemType==SALARY_ITEM_TYPE_SALARY&&itemDataSource!=null&&itemDataSource!='') {
                pop_tip_open("blue","固定项目的数据来源只能为调定薪，不能被更改!");
                //还原工资条显示分类
                $("input[name='itemDataSource'][value='"+ itemDataSource +"']").prop("checked",true);
            }
            //津贴项目：项目数据来源只能为公式计算、手工输入
            else if(itemType==SALARY_ITEM_TYPE_AllOWANCE) {
                if(temp!=SALARY_ITEM_SOURCE_IMPORT&&temp!=SALARY_ITEM_SOURCE_FORMULA) {
                    pop_tip_open("blue","津贴项目的数据来源只能为手工输入或公式计算!");
                    if(itemDataSource!=null&&itemDataSource!='') {
                        $("input[name='itemDataSource'][value='"+ itemDataSource +"']").prop("checked",true);
                    }else {
                        $("input[name='itemDataSource'][value='"+ temp +"']").prop("checked",false);
                    }
                }
            }
            //奖金项目：项目数据来源只能为工输入
            else if(itemType==SALARY_ITEM_TYPE_BONUS) {
                if(temp!=SALARY_ITEM_SOURCE_IMPORT&&temp!=SALARY_ITEM_SOURCE_FORMULA) {
                    pop_tip_open("blue","奖金项目的数据来源只能为手工输入或公式计算!");
                    if(itemDataSource!=null&&itemDataSource!='') {
                        $("input[name='itemDataSource'][value='"+ itemDataSource +"']").prop("checked",true);
                    }else {
                        $("input[name='itemDataSource'][value='"+ temp +"']").prop("checked",false);
                    }
                }
            }
            //考勤项目：项目数据来源只能为公式计算、手工输入
            else if(itemType==SALARY_ITEM_TYPE_KQ&&itemDataSource!=null&&itemDataSource!='') {
                //
                if(temp!=SALARY_ITEM_SOURCE_IMPORT&&temp!=SALARY_ITEM_SOURCE_FORMULA) {
                    pop_tip_open("blue","考勤项目的数据来源只能为手工输入或公式计算!");
                    if(itemDataSource!=null&&itemDataSource!='') {
                        $("input[name='itemDataSource'][value='"+ itemDataSource +"']").prop("checked",true);
                    }else {
                        $("input[name='itemDataSource'][value='"+ temp +"']").prop("checked",false);
                    }
                }
            }
            //社保：项目数据来源不能被修改
            else if(itemType==SALARY_ITEM_TYPE_SI) {
                pop_tip_open("blue","社保公积金项目的数据来源不能被修改!");
                if(itemDataSource!=null&&itemDataSource!='') {
                    $("input[name='itemDataSource'][value='"+ itemDataSource +"']").prop("checked",true);
                }else {
                    $("input[name='itemDataSource'][value='"+ temp +"']").prop("checked",false);
                }
            }
            //其他项目：项目数据来源不能被修改
            else if(itemType==SALARY_ITEM_TYPE_OTHER) {
                if(temp!=SALARY_ITEM_SOURCE_IMPORT) {
                    pop_tip_open("blue","其他项目的数据来源只能为手工输入!");
                    if(itemDataSource!=null&&itemDataSource!='') {
                        $("input[name='itemDataSource'][value='"+ itemDataSource +"']").prop("checked",true);
                    }else {
                        $("input[name='itemDataSource'][value='"+ temp +"']").prop("checked",false);
                    }
                }
            }
        });


        //禁用所有按钮的默认行为，即刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });

        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });

    });


})(jQuery, window, document)