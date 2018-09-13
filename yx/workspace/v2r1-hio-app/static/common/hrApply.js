/**
 * 构造表单数据
 * @returns {{}}
 */
window.ehrApplyData = function () {
    var result = {};
    var flag = check();
    if (flag == true) {
        result.success = true;
        result.message = "成功";
        result.data = getData();
        return result;
    } else {
        result.success = false;
        result.message = "失败";
        result.data = null;
        return result;
    }

};

/**
 * 时间戳转换
 * @param {*} date 
 */
function timetrans(date){
    //如果date为13位不需要乘1000
    // var date = new Date(date*1000);
    var date = new Date(date);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
    // return Y+M+D;
}
/***
 获得业务数据
 **/
window.getFlowVal = function () {
    var dataValue = {};
    $("[isFlowVar='true']").each(function () {
        var key = $(this).attr('name');
        var valueType = $(this).attr('valueType') || 'str';

        var childValue = {};
        if ($(this).val() == undefined || $(this).val() == null || $(this).val() == '') {
            childValue['value'] = $(this).text();
        } else {
            childValue['value'] = $(this).val();
        }

        // 针对type，进行类型转换
        switch (valueType) {
            case 'int':
            case 'float':
                childValue['value'] = 1 * childValue['value'];
                break;
            case 'bool':
                childValue['value'] = childValue['value'] == 'true';
                break;
        }

        childValue['valueType'] = valueType;

        dataValue[key] = childValue;
    });
    return dataValue;
};

/**
 先校验，再返回数据
 */
window.getData = function () {
    var dataValue = {};
    $("[isData='true']").each(function () {
        var key = $(this).attr('name');
        var valueType = $(this).attr('valueType') || 'str';
        var isFlowVar = $(this).attr('isFlowVar') == 'true';
        var name = $(this).attr('alias') || '';

        var childValue = {};
        if ($(this).val() == undefined || $(this).val() == null || $(this).val() == '') {
            childValue['value'] = $(this).text();
        } else {
            childValue['value'] = $(this).val();
        }

        // 针对type，进行类型转换
        switch (valueType) {
            case 'int':
            case 'float':
                childValue['value'] = 1 * childValue['value'];
                break;
            case 'bool':
                childValue['value'] = childValue['value'] == 'true';
                break;
        }

        childValue['valueType'] = valueType;
        childValue['isFlowVar'] = isFlowVar;
        childValue['name'] = name;
        dataValue[key] = childValue;
    });
    //适配andriod、ios、锤子 不同型号，日期字段的处理
    if (dataValue['applyEndDate'] != undefined && dataValue['applyEndDate'] != '') {
        var applyEndDate = dataValue['applyEndDate']['value'];
        var applyEndTime = dataValue["applyEndTime"]['value'];
        var applyStartDate = dataValue['applyStartDate']['value'];
        var applyStartTime = dataValue["applyStartTime"]['value'];
        applyEndDate = applyEndDate + " " + applyEndTime;
        applyStartDate = applyStartDate + " " + applyStartTime;

        var stampEndDate = new Date(applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime();
        // dataValue["applyEndDate"]['value'] = timetrans(stampEndDate);
        dataValue["applyEndDate"]['value'] = stampEndDate;

        var stampStartDate = new Date(applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime();
        // dataValue["applyStartDate"]['value'] = timetrans(stampStartDate);
        dataValue["applyStartDate"]['value'] = stampStartDate;
    }
    return dataValue;
   // var result = {};
    //根据标签属性校验标签的非空
    /* $("[check='true']").each(function () {
            $("#applicationForm").attr("data-validate-success", "")//进行表单的非空校验并提示
            if($(this).val() == undefined || $(this).val() == null ||$(this).val() == ''){
                result.success = false;
                result.message = "操作失败";
                result.data = null;
               return result;
            } else {

            }
        })*/
    //走每个页面的写好的校验
  /*  var flag = check();
    if (flag == true) {
        result.seccess = true;
        result.message = "成功";
        result.data = ehrApplyData();
        return ehrApplyData();
        ;
    }*/
    /* else {
     result.success = false;
     result.message = "操作失败";
     result.data = null;
       return result;
     }*/
};
