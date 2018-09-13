/**
 * create by zhangfangzhi on 2017/12/08
 */
$(function () {
    var nodeTypeObj = {
        'start':1,
        'task':2,
        'end':3,
        'join':4,
        'fork':5,
        'connector':6,
        'cc':7
    };

    //初始化模板表单变量列表
    var initVariableList = function () {
        if(window.parent&&$.isFunction(window.parent.getVariableListDef)){
            var variableListDef = window.parent.getVariableListDef();
            $.when(variableListDef).done(function (variableList) {
                window.variableList = variableList;
            });
        }
    };
    initVariableList();

    //抄送人设置方式更改事件
    $('#_flAcForm :input[name="isAddLabel"]').on('change',function () {
        var isAddLabel = $(this).val();
        if("0" == isAddLabel){
            $("#copyForPartnerDiv").show();
        }else{
            $("#copyForPartnerDiv").hide();
        }
    });

    //初始化表单数据
    var initFormData = function () {
        var selCell = window.parent.getSelectCell();
        var nodeType = selCell.nodeType;
        var label = selCell.value;
        var mxObjectId = selCell.mxObjectId;
        var nodeId = mxObjectId.replace('mxCell#','');
        var extra = selCell.extra;
        if(extra){
            extra = JSON.parse(extra);
        }else{
            extra = {};
        }
        extra.id=selCell.id;
        extra.name = selCell.value;
        extra.code = selCell.nodeType+'_'+nodeId;
        extra.acType = nodeTypeObj[nodeType];
        extra.nodeId = nodeId;
        $("#name").removeAttr("readonly");
        $("#code").removeAttr("readonly");
        $("#hiddenPartTwo").show();
        for(var item in extra){
            var value = extra[item];
            if(item=='isAddLabel'){
                if(value){
                    $('#_flAcForm :input[name="'+item+'"][value="1"]')[0].checked = true;
                }else{
                    $('#_flAcForm :input[name="'+item+'"][value="0"]')[0].checked = true;
                }
            }else{
                var inputObj = $('#_flAcForm :input[name="'+item+'"]');
                if($(inputObj[0]).attr('type')=='radio'){
                    $('#_flAcForm :input[name="'+item+'"][value="'+value+'"]')[0].checked = true;
                }else{
                    $('#_flAcForm :input[name="'+item+'"]').val(value);
                }
            }
        }
        $(':input[name="isAddLabel"]:checked').change();
    };
    initFormData();

    //初始化抄送人列表
    var initPartnerList = function () {
        var selCell= window.parent.getSelectCell();
        //抄送人
        var copyForPartnerArr = selCell.ccPerson&&selCell.ccPerson!=''?JSON.parse(selCell.ccPerson):[];
        batchAddRows('_copyForPartnerTb',copyForPartnerArr);
    };
    initPartnerList();

    //保存节点信息
    window.saveAcFormData = function(){
        var formDataArray = $("#_flAcForm").serializeArray();
        var acBaseInfo = {};
        for(var i in formDataArray){
            var name = formDataArray[i].name;
            //需要过滤掉参与人的所有字段
            if (name == 'isAddLabel') {
                acBaseInfo[name] = formDataArray[i].value == "1" ? true : false;
            }else{
                acBaseInfo[name]=formDataArray[i].value;
            }
        }
        acBaseInfo.delflag = false;

        //获取抄送人
        var copyForPartnerArr;
        if(!acBaseInfo.isAddLabel){
        	copyForPartnerArr = getFlPartnerData('_copyForPartnerTb','2',null,acBaseInfo.id);
        }

        delete acBaseInfo.id;

        var cell = window.parent.getSelectCell();
        cell.extra = JSON.stringify(acBaseInfo);
        cell.ccPerson = JSON.stringify(copyForPartnerArr?copyForPartnerArr:[]);
        cell.value = acBaseInfo.name;
        window.parent.updateCellAttr(cell.id,'value',acBaseInfo.name);
        window.parent.closeFrameWnd();
    };

    //初始化页面操作按钮事件
    var initBtnAction = function () {
        //抄送人设置列表头部按钮事件
        btns = $('#copyForPartnerDiv .btns-group').find('button');
        $.each(btns,function (i,btnObj) {
            var btnId = $(btnObj).attr('id');
            $('#'+btnId).on('click',function () {
                switch (btnId){
                    case 'deleteCopyForPartnerBtn':
                        deleteRow('_copyForPartnerTb');
                        break;
                    case 'addCopyForPartnerBtn':
                        addRow('_copyForPartnerTb');
                        break;
                }
            });
        });

        //保存
        $('#saveBtn').on('click',function () {
            $("#_flAcForm").attr('data-validate-success','saveAcFormData()');
            $("#_flAcForm").submit();
        });
    };
    initBtnAction();

});