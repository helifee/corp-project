/**
 * 系统模块常量
 */
//审批状态
var APPLY_STATUS;
var APPLY_STATUS_DRAFT;//草稿
var APPLY_STATUS_INAPPROVAL;//审批中
var APPLY_STATUS_ENDAPPROVAL;//审批完成
//审批类型
var APPLY_TYPE;
var APPLY_TYPE_JSJJ;//晋升晋级
var APPLY_TYPE_RYRZ;//人员入职
var APPLY_TYPE_YGZZ; //员工转正
var APPLY_TYPE_RYLZ;//人员离职
var APPLY_TYPE_JGBZ;//机构编制
var APPLY_TYPE_HTXX;//合同签订
var APPLY_TYPE_HTXQ;//合同续签
var APPLY_TYPE_HTBG;//合同变更
var APPLY_TYPE_HTJC;//合同解除
var APPLY_TYPE_HTZZ;//合同终止
var APPLY_TYPE_KQWDK;//考勤未打卡
var APPLY_TYPE_KQQJ;//考勤请假
var APPLY_TYPE_KQCC;//考勤出差
var APPLY_TYPE_XZZE;//薪资总额
var APPLY_TYPE_XZSH;//薪资审核
var APPLY_TYPE_EXAMPAPER;//需求申请
var APPLY_TYPE_CALCULATE;//公积金审核申请
var APPLY_TYPE_OFFER_APPROVAL;//招聘模块offer审核
//岗位类型
var POST_TYPE;
//职级
var RANK;
//审批访问的路径
var SPURL;
//业务对象编码-机构编制
var BOCODE_JGBZ;
//模板编码-机构编制申请单
var FLCODE_JGBZ;
//培训需求业务对象编码
var BOCODE_EXAMPAPER;
//培训需求流程模板编码
var FLCODE_EXAMPAPER;
//业务对象编码-考勤未打卡
var BOCODE_KQWDK;
//模板编码-考勤未打卡
var FLCODE_KQWDK;
//业务对象编码-考勤请假
var BOCODE_KQQJ;
//模板编码-考勤未打卡
var FLCODE_KQQJ;
//业务对象编码-考勤出差
var BOCODE_KQCC;
//模板编码-考勤出差
var FLCODE_KQCC;
//业务对象编码-薪资审核
var BOCODE_XZSH;
//模板编码-薪资审核
var FLCODE_XZSH;
//业务对象编码-公积金审核
var BOCODE_CALCULATE;
//模板编码-公积金审核
var FLCODE_CALCULATE;
//模版编码-人员入职申请单
var FLCODE_RYRZ;
//业务对象编码-人员入职业务对象
var BOCODE_RYRZ;
//模版编码-人员晋升晋级申请单
var FLCODE_JSJJ;
//模版编码-人员离职申请单
var FLCODE_RYLZ;
//模版编码-人员转正申请单
var FLCODE_RYZZ;
//模版编码-人员调动申请单
var FLCODE_RYDD;
//业务对象编码-招聘需求
var BOCODE_ZPXQ;
//模板编码-招聘需求
var FLCODE_ZPXQ;
//业务对象编码-offer审核
var BOCODE_OFFERCHK;
//模板编码-offer审核
var FLCODE_OFFERCHK;
//业务对象编码-调定薪审核
var BOCODE_TDX;
//模板编码-调定薪审核
var FLCODE_TDX;

//附件服务地址
var ATTACH_SERVERADDR;
//附件分类
var ATTACH_TYPE;
//附件-人员类
var ATTACH_TYPE_PERSON;
//附件-合同类
var ATTACH_TYPE_CONT;
//附件-考勤请假类
var ATTACH_TYPE_KQQJ;
//附件-课件类
var ATTACH_TYPE_COURSEWARE;
//附件-考勤出差
var ATTACH_TYPE_KQCC;
//附件-考勤未打卡
var ATTACH_TYPE_KQWDK;

//业务对象编码-薪资总额
var BOCODE_XZZE;

//消息展示页面的路径
var MSG_URL;

//百度地图
var DB_MAP_AK;

//自执行函数，重参数获取，防止明码申明不安全
$(function () {

    var paramsList = getSysParameters();
    if (paramsList != undefined && paramsList != null) {
        //迭代参数列表
        $.each(paramsList, function (n, value) {
            var key = value.paraKey;
            if (key != null) {
                //取值
                if (key == 'APPLY_STATUS') {
                    APPLY_STATUS = value.paraValue;
                } else if (key == 'APPLY_STATUS_DRAFT') {
                    APPLY_STATUS_DRAFT = value.paraValue;
                } else if (key == 'APPLY_STATUS_INAPPROVAL') {
                    APPLY_STATUS_INAPPROVAL = value.paraValue;
                } else if (key == 'APPLY_STATUS_ENDAPPROVAL') {
                    APPLY_STATUS_ENDAPPROVAL = value.paraValue;
                } else if (key == 'APPLY_TYPE') {
                    APPLY_TYPE = value.paraValue;
                } else if (key == 'APPLY_TYPE_JSJJ') {
                    APPLY_TYPE_JSJJ = value.paraValue;
                } else if (key == 'APPLY_TYPE_RYRZ') {
                    APPLY_TYPE_RYRZ = value.paraValue;
                } else if (key == 'APPLY_TYPE_YGZZ') {
                    APPLY_TYPE_YGZZ = value.paraValue;
                } else if (key == 'APPLY_TYPE_RYLZ') {
                    APPLY_TYPE_RYLZ = value.paraValue;
                } else if (key == 'APPLY_TYPE_JGBZ') {
                    APPLY_TYPE_JGBZ = value.paraValue;
                } else if (key == 'APPLY_TYPE_HTXX') {
                    APPLY_TYPE_HTXX = value.paraValue;
                } else if (key == 'APPLY_TYPE_HTXQ') {
                    APPLY_TYPE_HTXQ = value.paraValue;
                } else if (key == 'APPLY_TYPE_HTBG') {
                    APPLY_TYPE_HTBG = value.paraValue;
                } else if (key == 'APPLY_TYPE_HTJC') {
                    APPLY_TYPE_HTJC = value.paraValue;
                } else if (key == 'APPLY_TYPE_HTZZ') {
                    APPLY_TYPE_HTZZ = value.paraValue;
                } else if (key == 'APPLY_TYPE_KQWDK') {
                    APPLY_TYPE_KQWDK = value.paraValue;
                } else if (key == 'APPLY_TYPE_KQQJ') {
                    APPLY_TYPE_KQQJ = value.paraValue;
                } else if (key == 'APPLY_TYPE_KQCC') {
                    APPLY_TYPE_KQCC = value.paraValue;
                } else if (key == 'APPLY_TYPE_XZSH') {
                    APPLY_TYPE_XZSH = value.paraValue;
                } else if (key == 'APPLY_TYPE_CALCULATE') {
                    APPLY_TYPE_CALCULATE = value.paraValue;
                } else if (key == 'APPLY_TYPE_OFFER_APPROVAL') {
                    APPLY_TYPE_OFFER_APPROVAL = value.paraValue;
                } else if (key == 'POST_TYPE') {
                    POST_TYPE = value.paraValue;
                } else if (key == 'RANK') {
                    RANK = value.paraValue;
                } else if (key == 'SPURL') {
                    SPURL = value.paraValue;
                } else if (key == 'BOCODE_JGBZ') {
                    BOCODE_JGBZ = value.paraValue;
                } else if (key == 'FLCODE_JGBZ') {
                    FLCODE_JGBZ = value.paraValue;
                } else if (key == 'BOCODE_EXAMPAPER') {
                    BOCODE_EXAMPAPER = value.paraValue;
                } else if (key == 'FLCODE_EXAMPAPER') {
                    FLCODE_EXAMPAPER = value.paraValue;
                } else if (key == 'BOCODE_KQWDK') {
                    BOCODE_KQWDK = value.paraValue;
                } else if (key == 'FLCODE_KQWDK') {
                    FLCODE_KQWDK = value.paraValue;
                } else if (key == 'BOCODE_KQQJ') {
                    BOCODE_KQQJ = value.paraValue;
                } else if (key == 'FLCODE_KQQJ') {
                    FLCODE_KQQJ = value.paraValue;
                } else if (key == 'BOCODE_KQCC') {
                    BOCODE_KQCC = value.paraValue;
                } else if (key == 'FLCODE_KQCC') {
                    FLCODE_KQCC = value.paraValue;
                } else if (key == 'BOCODE_XZSH') {
                    BOCODE_XZSH = value.paraValue;
                } else if (key == 'FLCODE_XZSH') {
                    FLCODE_XZSH = value.paraValue;
                } else if (key == 'BOCODE_CALCULATE') {
                    BOCODE_CALCULATE = value.paraValue;
                } else if (key == 'FLCODE_CALCULATE') {
                    FLCODE_CALCULATE = value.paraValue;
                } else if (key == 'BOCODE_RYRZ') {
                    BOCODE_RYRZ = value.paraValue;
                } else if (key == 'FLCODE_RYRZ') {
                    FLCODE_RYRZ = value.paraValue;
                } else if (key == 'FLCODE_JSJJ') {
                    FLCODE_JSJJ = value.paraValue;
                } else if (key == 'ATTACH_SERVERADDR') {
                    ATTACH_SERVERADDR = value.paraValue;
                } else if (key == 'ATTACH_TYPE') {
                    ATTACH_TYPE = value.paraValue;
                } else if (key == 'ATTACH_TYPE_PERSON') {
                    ATTACH_TYPE_PERSON = value.paraValue;
                } else if (key == 'ATTACH_TYPE_CONT') {
                    ATTACH_TYPE_CONT = value.paraValue;
                } else if (key == 'ATTACH_TYPE_KQQJ') {
                    ATTACH_TYPE_KQQJ = value.paraValue;
                } else if (key == 'ATTACH_TYPE_COURSEWARE') {
                    ATTACH_TYPE_COURSEWARE = value.paraValue;
                } else if (key == 'ATTACH_TYPE_KQCC') {
                    ATTACH_TYPE_KQCC = value.paraValue;
                } else if (key == 'ATTACH_TYPE_KQWDK') {
                    ATTACH_TYPE_KQWDK = value.paraValue;
                } else if (key == 'FLCODE_RYLZ') {
                    FLCODE_RYLZ = value.paraValue;
                } else if (key == 'FLCODE_RYZZ') {
                    FLCODE_RYZZ = value.paraValue;
                } else if (key == 'FLCODE_TDX') {
                    FLCODE_TDX = value.paraValue;
                } else if (key == 'FLCODE_RYDD') {
                    FLCODE_RYDD = value.paraValue;
                } else if (key == 'APPLY_TYPE_XZZE') {
                    APPLY_TYPE_XZZE = value.paraValue;
                } else if (key == 'BOCODE_XZZE') {
                    BOCODE_XZZE = value.paraValue;
                } else if (key == 'MSG_URL') {
                    MSG_URL = value.paraValue;
                } else if (key == 'BOCODE_ZPXQ') {
                    BOCODE_ZPXQ = value.paraValue;
                } else if (key == 'FLCODE_ZPXQ') {
                    FLCODE_ZPXQ = value.paraValue;
                } else if (key == 'BOCODE_OFFERCHK') {
                    BOCODE_OFFERCHK = value.paraValue;
                } else if (key == 'FLCODE_OFFERCHK') {
                    FLCODE_OFFERCHK = value.paraValue;
                } else if (key == 'DB_MAP_AK') {
                    DB_MAP_AK = value.paraValue;
                }
            }
        });

    }
});

/**
 * 加载参数缓存
 * 避免一个页面多次请求
 */
function getSysParameters() {
    var paramsList;
    var postData = {};
    //适配移动端手动切库
    var tendId=$.xljUtils.getUrlParam("tendId");
    postData.tendId=tendId;
    $.ajax({
        type: 'post',
        url: hostUrl + "/sys/sysParameter/queryList",
        dataType: 'JSON',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify(postData),
        success: function (data) {
            if (data.success) {
                paramsList = data.result;
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            //pop_tip_open("red", "初始化参数缓存请求失败"); 
        }
    });
    return paramsList;
}