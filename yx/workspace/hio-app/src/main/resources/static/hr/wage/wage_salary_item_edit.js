/**
 * Created by ciic on 2017/6/19.
 */
;(function ($,window,document,undefined) {

    var item_data;//所有薪资项记录
    var si_item_data;//所有社保项纪录
    var setId = $("#set_id").val();//指标集ID
    var selectItemId;//选中的ID。方便后期选择非社保项进行回显
    var sourceSelectId;//选中的数据来源ID，方便值回显
    var showClassify;//选中的工资条显示项ID，方便值回显

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //计算高度
    window.resizeHeight = function () {
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h-140)+"px");
        //右侧table
        $(".con-table .mytable").height((w_h-70)+"px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height()-45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    };

    //新增初始化右侧面板
    window.add = function () {
        $(".node_name").css("color","black");
        initUuid();
        $("#item_id").val("");   //将默认项目的id清空。
        $("#item_name").val("");
        $("#item_length").val("");
        $("#item_perce").val("");
        $("#addSiItemCode").val("");//code值，方便社保选项回显
        $("#type option:contains('请选择')").prop("selected", true);
        $("#item_type option:contains('请选择')").prop("selected", true);

        //清空项目来源选项
        var itemDataSource=$('input:radio[name="item_data_source"]:checked').val();//项目来源选项
        if(itemDataSource!=null&&itemDataSource!='') {
            $("input[name='item_data_source'][value='"+ itemDataSource +"']").prop("checked",false);  //取消选中的项目数据来源
        }

        //清空工资条显示分类
        var tempShowClassify=$('input:radio[name="show_classify"]:checked').val();//工资条显示分类
        if(tempShowClassify!=null&&tempShowClassify!='') {
            $("input[name='show_classify'][value='"+ tempShowClassify +"']").prop("checked",false);  //取消选中的项目数据来源
        }

        showClassify = "";
        sourceSelectId = "";
        selectItemId = "";        //数据来源选择还原,方便选择数据来源为非社保项后进行数据回显
        document.getElementById('siDiv').style.visibility = 'hidden';//设置为隐藏 社保选择
        $("#item_property").val("2");//新增，项目属性只能为自定义项
        //根据项目属性进行当前面板处理
        setProperty("2","add");
    };

    //保存
    window.save = function () {
        var item_id = $("#item_id").val();//获取ID，判断是新增还是修改。如果是新增则id取hidden_id
        //检验数据格式是否正确
        var name = $("#item_name").val();
        var type =$("#type").val();
        var itemLength = $("#item_length").val();
        var itemPerce = $("#item_perce").val();
        var itemType = $("#item_type").val();
        var itemProperty = $("#item_property").val();
        var code = $("#addSiItemCode").val(); //带上code值,如果是社保项则直接获取
        var itemDataSource=$('input:radio[name="item_data_source"]:checked').val();//项目来源选项
        var tempShowClassify=$('input:radio[name="show_classify"]:checked').val();//工资条显示分类
        var re_1 = /^[1-9]{0,1}[0-9]{1,1}$/;
        if(name==""||name==null){
            pop_tip_open("blue","请填写项目名称！");
            return;
        }else if(name.length>100){
            pop_tip_open("blue","项目名称长度不能超过100");
            return;
        }else if(type=="请选择"||type==""||type==null){
            pop_tip_open("blue","请填写数据类型！");
            return;
        }else if(itemType=="请选择"||itemType==""||itemType==null){
            pop_tip_open("blue","请填写项目类型！");
            return;
        }
        else if(itemDataSource==null){
            pop_tip_open("blue","请填写项目数据来源!");
            return;
        }
        else if(tempShowClassify==null){
            pop_tip_open("blue","请填写工资条显示分类!");
            return;
        }
        //其中项目类型和数据来源必须匹配
        if(itemType==1) {
            if((itemDataSource!='0'||itemDataSource!=0)&&(itemDataSource!=='1'||itemDataSource!=1)) {
                pop_tip_open("blue","项目类型为薪资项时，数据来源只能为手工输入或者公式计算！");
                return;
            }
        }else if(itemType==2&&(itemDataSource!=2||itemDataSource!='2')) {
            pop_tip_open("blue","项目类型为补助标准时，数据来源只能为补助标准！");
            return;
        }else if(itemType==3&&(itemDataSource!=3||itemDataSource!='3')) {
            pop_tip_open("blue","项目类型为薪资标准时，数据来源只能为薪资标准！");
            return;
        }else if(itemType==4) {
            pop_tip_open("blue","无法新建税率表薪资项！");
            return;
        }else if(itemType==5&&(itemDataSource!=5||itemDataSource!='5')) {
            pop_tip_open("blue","项目类型为社保时，数据来源只能为社保！");
            return;
        }else if(itemType==6&&(itemDataSource!=6||itemDataSource!='6')) {
            pop_tip_open("blue","项目类型为考勤时，数据来源只能为考勤！");
            return;
        }

        //属性为自定义修改或新增时，根据数据类型判断小数位数和数据长度
        if(itemProperty=='2'||itemProperty==2||item_id==null||item_id=="") {
            if(type!=8) {
                //新增时如果不是金钱类型，则不需要进行校验存储，进行提示
                if(item_id==null||item_id==""){
                    if(itemLength!=""&&itemLength!=null){
                        // pop_tip_open("blue","数据类型为非金钱类型，则数据长度应为空！");
                        pop_tip_open("blue","数据类型为非小数类型，则数据长度应为空！");
                        return;
                    }else if(itemPerce!=""&&itemPerce!=null){
                        // pop_tip_open("blue","数据类型为非金钱类型，则小数位数应为空！");
                        pop_tip_open("blue","数据类型为非小数类型，则小数位数应为空！");
                        return;
                    }
                }
            }else {
                if(itemLength==""||itemLength==null){
                    pop_tip_open("blue","请填写数据长度！");
                    return;
                }else if(itemPerce==""||itemPerce==null){
                    pop_tip_open("blue","请填写小数位数！");
                    return;
                }else if(!re_1.test(itemPerce)){
                    pop_tip_open("blue","小数位数的格式不正确！");
                    return;
                }else if(!re_1.test(itemLength)){
                    pop_tip_open("blue","数据长度的格式不正确！");
                    return;
                }else if(parseInt(itemLength)>20||parseInt(itemLength)<1){
                    pop_tip_open("blue","数据长度只能是1到20之间！");
                    return;
                }else if(parseInt(itemPerce)>6||parseInt(itemPerce)<0){
                    pop_tip_open("blue","小数位数只能是0到6之间！");
                    return;
                }
                else if(parseInt(itemLength)<parseInt(itemPerce)){
                    pop_tip_open("blue","小数位数必须小于数据长度！");
                    return;
                }
            }
        }

        var dto = {name:name,type:type,code:code,itemLength:itemLength,itemPerce:itemPerce,itemType:itemType,itemProperty:itemProperty,itemDataSource:itemDataSource,showClassify:tempShowClassify,setId:setId};
        dto.delflag=false;
        /****************************** 新增保存开始 ***********************************/
        if(item_id==null||item_id==""){ //item_id为空则表示新增，id取隐藏ID：hide_id
            //判断名称是否重复
            if(item_data!=null&&item_data!='') {
                for(var i=0;i<item_data.length;i++){
                    if(name==item_data[i].name){
                        pop_tip_open("blue","该项目名称应存在！");
                        return;
                    }
                }
            }
            dto.id = $("#hide_id").val();
            addSave(dto);
        }
        /****************************** 新增保存结束 ***********************************/

        /****************************** 修改保存开始 ***********************************/
        else{
            for(var i=0;i<item_data.length;i++){
                //判断名称是否重复
                if(name==item_data[i].name&&item_id!=item_data[i].id){
                    pop_tip_open("blue","该项目名称已存在，保存失败！");
                    return;
                }
            }
            //如果所属项目为系统项，则只能被修改名称
            if(itemProperty==3||itemProperty=='3') {
                //只能别修改名称
                var showMsg = '系统项只能被修改名称，是否确定保存？';
                if(itemType==5||itemType=='5') {
                    showMsg = "引入的社保项只能被修改名称，是否确定保存？";
                }

                pop_text_open("blue",showMsg,function(){
                    var tempDto = {};
                    tempDto.id = item_id;
                    tempDto.delflag = false;
                    tempDto.name = name;
                    updateSave(tempDto);
                },true);
            }
            //如果为自定义项，则直接进行保存
            else {
                for(var i=0;i<item_data.length;i++){
                    //数据长度和小数位数只能越改越大
                    if(type==8&&(item_id==item_data[i].id)) {
                        if(itemLength<item_data[i].itemLength) {
                            pop_tip_open("blue","数据长度只能越改越大，保存失败！");
                            return;
                        }
                        if(itemPerce<item_data[i].itemPerce) {
                            pop_tip_open("blue","小数位数只能越改越大，保存失败！");
                            return;
                        }
                    }
                }
                dto.id = item_id;
                updateSave(dto);
            }
        }
        /****************************** 修改保存结束 ***********************************/
    }

    //新增保存
    window.addSave = function (dto) {
        $.ajax({
            type: "POST",
            url:serviceUrl+ "wage/wageAccountSalaryItem/saveSalaryItem",
            data: JSON.stringify(dto),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                pop_tip_open("green","保存成功！");
                $("#item_id").val($("#hide_id").val());
                $("#item_name").val(dto.name);
                $("#item_length").val(dto.itemLength);
                $("#item_perce").val(dto.itemPerce);

                $("#type").val(type);
                $("#item_type").val(dto.itemType);

                //数据来源处理
                sourceSelectId = dto.itemDataSource;
                if(dto.itemDataSource!=null&&dto.itemDataSource!='') {
                    $("input[name='item_data_source'][value='"+ dto.itemDataSource +"']").prop("checked",true);  //选中的项目数据来源
                }
                //工资条分类显示处理
                showClassify = dto.showClassify;
                if(dto.showClassify!=null&&dto.showClassify!='') {
                    $("input[name='show_classify'][value='"+ dto.showClassify +"']").prop("checked",true);  //选中的工资条显示分类
                }

                $("#item_property").val(dto.itemProperty);
                getitems($("#hide_id").val())
            }
        });
    }

    //修改保存
    window.updateSave = function (dto) {
        $.ajax({
            type: "PUT",
            url:serviceUrl+ "wage/wageAccountSalaryItem/updateSalaryItem/"+$("#item_id").val(),
            data: JSON.stringify(dto),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                pop_tip_open("green","保存成功！");
                getitems($("#item_id").val());
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }
        });
    }

    //选择数据来源为非社保后进行面板设置  此方法上面也在调用
    window.setSiHide = function () {
        //设置为可编辑
        setProperty("2","add");
        document.getElementById('siDiv').style.visibility = 'hidden';//设置为隐藏
    };

    //删除薪资项
    window.itemDel = function () {
        var item_property = $("#item_property").val();

        if($("#item_id").val()==null||$("#item_id").val()=='') {
            pop_tip_open("blue","请选择需要删除的薪资项！");
            return;
        }

        if(item_property=="3"){
            pop_tip_open("blue","系统项不可以删除！");
            return;
        }
        pop_text_open("blue",'确定删除此薪资项吗？',function(){
            $.ajax({
                type: "DELETE",
                // url:serviceUrl+ "sys/sysInfoItem/delete/"+$("#item_id").val(),
                url:serviceUrl+ "wage/wageAccountSalaryItem/delSalaryItem/"+$("#item_id").val(),
                // data: JSON.stringify(dto),
                dataType: "JSON",
                contentType:"application/json",
                success: function(resultData){
                    if(resultData) {
                        var successFlag = resultData.success;
                        var result = resultData.result;
                        var msg = resultData.msg;
                        if(successFlag) {
                            pop_tip_open("green","删除成功！");
                            getitems();
                        }else {
                            pop_tip_open("blue",msg);
                        }
                    }
                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    pop_tip_open("red","数据删除请求失败");
                }
            });
        },true);
    };

    //初始化主键
    window.initUuid = function () {
        var uBody = "sys/uuid/generator/getGuuid"+"?time="+Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type:'GET',
            url:uAll,
            success: function(data) {
                var guuid=data.result;
                $("#hide_id").val(guuid);
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        })
    };

    /**
     * 根据项目类型控制小数长度和小数位数
     * 数据类型处理：如果数据类型不是金钱型，则将小数长度和小数位数置灰
     */
    window.setType = function (type) {
        //前端进行数据类型切换
        if(type==-1||type=='-1') {
            type = $("#type").val();
        }
        //具体值具体判断
        if(type==8||type=='8') {
            $("#item_length").prop("disabled",false);
            $("#item_perce").prop("disabled",false);
        }else {
            $("#item_length").val("");
            $("#item_perce").val("");
            $("#item_length").prop("disabled",true);
            $("#item_perce").prop("disabled",true);
        }
    };

    //根据项目属性设置相关面板
    window.setProperty = function (property,czflag) {
        if(property==3||property=='3') { //系统项
            $("#type").prop("disabled","disabled");
            $("#item_length").prop("disabled","disabled");
            $("#item_perce").prop("disabled","disabled");
            $("#item_type").prop("disabled","disabled");
            //项目来源选项如果是社保项，则不能被修改数据长度和小数位数且显示对应关系
            var itemDataSource=$('input:radio[name="item_data_source"]:checked').val();
            if(itemDataSource == '5' || itemDataSource == 5) {
                //如果右侧为社保项，则显示对应关系
                initSiItem( $("#addSiItemCode").val());
            }else {
                document.getElementById('siDiv').style.visibility = 'hidden';//设置为隐藏 社保选择
            }
        }else { //自定义项
            if(czflag=="add") {
                //如果是点击新增，则还原数据类型状态
                $("#type").removeAttr("disabled");
                $("#item_perce").removeAttr("disabled");
                $("#item_type").removeAttr("disabled");
                $("#item_length").removeAttr("disabled");
            }else  if(czflag=="update") { //修改
                $("#type").prop("disabled","disabled"); //数据类型都不能被修改
                //项目来源选项如果是社保项，则不能被修改数据长度和小数位数且显示对应关系
                var itemDataSource=$('input:radio[name="item_data_source"]:checked').val();
                if(itemDataSource == '5' || itemDataSource == 5) {
                    $("#item_length").prop("disabled","disabled");
                    $("#item_perce").prop("disabled","disabled");
                    $("#item_type").prop("disabled","disabled");
                    //如果右侧为社保项，则显示对应关系
                    initSiItem( $("#addSiItemCode").val());
                }else {
                    $("#item_perce").removeAttr("disabled");
                    $("#item_type").removeAttr("disabled");
                    $("#item_length").removeAttr("disabled");
                    document.getElementById('siDiv').style.visibility = 'hidden';//设置为隐藏 社保选择
                    setType(-1);
                }
            } else if (czflag=="addBySiItem") { //社保，且数据来源选择社保
                document.getElementById('siDiv').style.visibility = 'visible';//设置为显示社保选择
                $("#item_length").prop("disabled","disabled");
                $("#item_perce").prop("disabled","disabled");
                $("#item_type").prop("disabled","disabled");
                $("#type").prop("disabled","disabled"); //数据类型都不能被修改
                $("#siSelect").removeAttr("disabled");
            }

        }
    };

    $(function () {

        resizeHeight();//设置高度
        resizeGrid(); //设置宽度

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


    //返回上一级
    window.goBack = function () {
        window.history.go(-1);
    };


})(jQuery, window, document)