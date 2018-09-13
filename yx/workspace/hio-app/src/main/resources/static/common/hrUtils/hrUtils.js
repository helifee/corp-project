/**
 * 人力系统hrUtils.js
 * 方法总体顺序为系统指标、代码、机构、岗位、人员、业务模块
 * @author anss
 * @date 2017/6/18
 */

(function ($) {
    if (!$.hrUtils) {
        $.extend({hrUtils: {}});
    }
    $.extend($.hrUtils, {
        //字符串滤空
        filterNull:function (str) {
            var s = "";
            if (!str||str==undefined||str == null || "null"==(str.trim())) {
                s = "";
            } else {
                s = new String(str.trim());
            }
            return s;
        },
        //验证用户信息
        verifUserInfo: function () {
            var msg="";
            $.ajax({
                url: serviceUrl + "sys/sysApply/verifUserInfo?time=" + Math.random(),
                type: 'GET',
                dataType: 'JSON',
                async: false,
                success: function (data) {
                    if (data.success) {
                        // msg = data.msg;
                    }else{//验证失败返回提示信息
                        msg = data.msg;
                    }
                },
                error: function () {
                    msg="服务异常，请联系管理员";
                }
            });
            return msg;
        },
        /**
         * 通过审批单id获取审批单信息
         */
        getSysApplyById: function (applyId) {
            var sysApplyDto;
            //不为空，查询
            if (applyId != undefined && applyId != null && applyId != '') {
                $.ajax({
                    type: 'get',
                    async: false,
                    url: serviceUrl + "sys/sysApply/get/" + applyId + "?time=" + Math.random(),
                    success: function (data) {
                        sysApplyDto = data.result;
                    }
                });
            }
            return sysApplyDto;
        },
        //查询hr系统登录人信息
        getHREmpInfo: function () {
            var personInfoDto;
            $.ajax({
                url: serviceUrl + "emp/empPersonInfo/getHREmpInfo?time=" + Math.random(),
                type: 'GET',
                dataType: 'JSON',
                async: false,
                success: function (data) {
                    if (data.success) {
                        personInfoDto = data.result;
                    }
                }
            });
            return personInfoDto;
        },
        /**
         * 指标项翻译
         * @param setName 指标集名称
         * @param itemCode 指标项编码，即字段名
         */
        getHRInfoNameById: function (setName,itemCode) {
            var name = '';
            var postData={};
            postData.setName=setName;
            postData.itemCode=itemCode;
            //不为空，查询翻译
            if ((setName != undefined && setName != null && setName != '')&&(itemCode != undefined && itemCode != null && itemCode != '')) {
                $.ajax({
                    url: serviceUrl + "sys/sysInfoItem/getNameBySetNameItemCode",
                    type: 'post',
                    contentType: 'application/json',
                    dataType: 'JSON',
                    data: JSON.stringify(postData),
                    async: false,
                    success: function (data) {
                        if (data.success) {
                            name = data.result;
                        }
                    }
                });
            }
            return name = (name == null ? '' : name);
        },
        /**
         * 获取代码信息
         */
        getHRCodeById: function (itemId) {
            var codeDto;
            //不为空，查询
            if (itemId != undefined && itemId != null && itemId != '') {
                $.ajax({
                    type: 'get',
                    async: false,
                    url: serviceUrl + "sys/sysCodeItem/get/" + itemId + "?time=" + Math.random(),
                    success: function (data) {
                        codeDto = data.result;
                    }
                });
            }
            return codeDto;
        },
        //代码项翻译
        getHRCodeNameById: function (itemId) {
            var name = '';
            //不为空，查询翻译
            if (itemId != undefined && itemId != null && itemId != '') {
                $.ajax({
                    url: serviceUrl + "sys/sysCodeItem/getNameById/" + itemId+"?time=" + Math.random(),
                    type: 'GET',
                    dataType: 'JSON',
                    async: false,
                    success: function (data) {
                        if (data.success) {
                            name = data.result;
                        }
                    }
                });
            }
            return name = (name == null ? '' : name);
        },
        //根据代码集id和代码项名称获取代码项id
        getHRCodeIdByName: function (codeId, name) {
            var itemId;
            $.ajax({
                url: serviceUrl + "sys/sysCodeItem/getSysCodeItemById",
                type: 'POST',
                dataType: 'JSON',
                async: false,
                contentType: 'application/json',
                data: JSON.stringify({"code_set_id": codeId, "name": name}),
                success: function (data) {
                    if (data.success) {
                        var result = data.result;
                        itemId = result[0].id;
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log(xhr);
                }
            });

            itemId = (itemId == null ? '' : itemId);
            return itemId;
        },
        /**
         * 查询按钮权限
         */
        getBtnAuth: function (code) {
            $.ajax({
                type: 'POST',
                url: serviceUrl + "sys/sysUserInfo/queryAuthorizationBtnList",
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({"menuCode": code}),
                success: function (json) {
                    var list = json.result;
                    $.each(list, function (index, value) {
                        for (var key in value) {
                            if (key == "code" && value[key] == "xzAuthBtn") {
                                alert(value[key] + ' ' + key);
                            }
                        }
                    });
                },
                error: function () {

                    alert("error");
                }
            })
        },
        //获取系统参数
        getHRSysParamByKey: function (paraKey) {
            var paraValue;
            //不为空，查询取值
            if (paraKey != undefined && paraKey != null && paraKey != '') {
                $.ajax({
                    url: serviceUrl + "sys/sysParameter/getValueByKey/" + paraKey+"?time=" + Math.random(),
                    type: 'GET',
                    dataType: 'JSON',
                    async: false,
                    success: function (data) {
                        if (data.success) {
                            paraValue = data.result;
                        }
                    }
                });
            }
            return paraValue;
        },
        /**
         * 获取申请单编号
         * @param numType 单据类型
         * @returns {*}
         */
        getApplyCodeByType: function (numType) {
            var applyCode;
            var uBody = "sys/sysSerialNumber/getValueByType/" + numType + "?time=" + Math.random();
            var uAll = serviceUrl + uBody;
            $.ajax({
                type: 'get',
                url: uAll,
                dataType: 'JSON',
                async: false,
                success: function (data) {
                    applyCode = data.result;
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "初始化指标集请求失败");
                }
            });
            return applyCode;
        },
        /**
         * 获取机构信息
         */
        getOrgById: function (orgId) {
            var orgDto;
            $.ajax({
                type: 'get',
                async: false,
                url: serviceUrl + "org/org/get/" + orgId + "?time=" + Math.random(),
                success: function (data) {
                    orgDto = data.result;
                }
            });
            return orgDto;
        },
        //机构翻译
        getHROrgNameById: function (orgId) {
            var orgName = "";
            //不为空，查询翻译
            if (orgId != undefined && orgId != null && orgId != '') {
                $.ajax({
                    url: serviceUrl + "org/org/getNameById/" + orgId+"?time=" + Math.random(),
                    type: 'GET',
                    dataType: 'JSON',
                    async: false,
                    success: function (data) {
                        if (data.success) {
                            orgName = data.result;
                        }
                    }
                });
            }
            return orgName;
        },
        //通过机构id获取机构编码
        getHROrgCodeById: function (orgId) {
            var orgCode;
            $.ajax({
                url: serviceUrl + "org/org/getNameByCode/" + orgId+"?time=" + Math.random(),
                type: 'GET',
                dataType: 'JSON',
                async: false,
                success: function (data) {
                    if (data.success) {
                        orgCode = data.result;
                    }
                }
            });
            return orgCode;
        },
        //机构全路径翻译
        getHRPrefixOrgNameById: function (orgId) {
            var orgName = "";
            //不为空，查询翻译
            if (orgId != undefined && orgId != null && orgId != '') {
                $.ajax({
                    url: serviceUrl + "org/org/getPrefixNameById/" + orgId+"?time=" + Math.random(),
                    type: 'GET',
                    dataType: 'JSON',
                    async: false,
                    success: function (data) {
                        if (data.success) {
                            orgName = data.result;
                        }
                    }
                });
            }
            return orgName;
        },
        //获取机构所属一级公司
        getHROrgCompanyById: function (deptId) {
            var postData = {};
            postData.deptId = deptId;
            var orgId;
            $.ajax({
                url: serviceUrl + "org/org/queryListBelong",
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(postData),
                dataType: 'JSON',
                async: false,
                success: function (data) {
                    if (data.success) {
                        orgId = data.result;
                    }
                }
            });
            return orgId;
        },
        /**
         * 机构名称重复了么
         * orgId 自己的id
         * parentId 父id
         * name 要起的名字
         */
        isOrgNameRepeat: function (postData) {
            var isRepeat = true;
            $.ajax({
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(postData),
                async: false,
                url: serviceUrl + "org/org/queryOrgNameByParentId",
                success: function (data) {
                    isRepeat = data.result;
                }
            });
            return isRepeat;
        },
        //岗位翻译-机构下岗位
        getHRPostNameById: function (orgPostId) {
            var postName = "";
            //不为空，查询翻译
            if (orgPostId != undefined && orgPostId != null && orgPostId != '') {
                $.ajax({
                    url: serviceUrl + "org/orgPostRelation/getPostNameById/" + orgPostId+"?time=" + Math.random(),
                    type: 'GET',
                    dataType: 'JSON',
                    async: false,
                    success: function (data) {
                        if (data.success) {
                            postName = data.result;
                        }
                    }
                });
            }
            return postName;
        },
        //岗位翻译-标准岗位
        getPostNameById: function (postId) {
            var postName = "";
            //不为空，查询翻译
            if (postId != undefined && postId != null && postId != '') {
                $.ajax({
                    url: serviceUrl + "org/post/getNameById/" + postId+"?time=" + Math.random(),
                    type: 'GET',
                    dataType: 'JSON',
                    async: false,
                    success: function (data) {
                        if (data.success) {
                            postName = data.result;
                        }
                    }
                });
            }
            return postName;
        },
        /**
         * 获取岗位信息
         */
        getPostById: function (postId) {
            var postDto;
            //不为空，查询
            if (postId != undefined && postId != null && postId != '') {
                $.ajax({
                    type: 'get',
                    async: false,
                    url: serviceUrl + "org/post/get/" + postId + "?time=" + Math.random(),
                    success: function (data) {
                        postDto = data.result;
                    }
                });
            }
            return postDto;
        },
        //根据人员id获取人员信息
        getHRPersonInfoById: function (personId) {
            var personDto = "";
            //不为空，查询翻译
            if (personId != undefined && personId != null && personId.trim() != '') {
                $.ajax({
                    url: serviceUrl + "emp/empPersonInfo/get/" + personId+"?time=" + Math.random(),
                    type: 'GET',
                    dataType: 'JSON',
                    async: false,
                    success: function (data) {
                        if (data.success) {
                            if(data.result!=null){
                                personDto = data.result;
                            }
                        }
                    }
                });
            }
            return personDto;
        },
        //人员翻译
        getHRPersonNameById: function (personId) {
            var personName = "";
            //不为空，查询翻译
            if (personId != undefined && personId != null && personId.trim() != '') {
                $.ajax({
                    url: serviceUrl + "emp/empPersonInfo/get/" + personId+"?time=" + Math.random(),
                    type: 'GET',
                    dataType: 'JSON',
                    async: false,
                    success: function (data) {
                        if (data.success) {
                            if(data.result!=null){
                                personName = data.result.name;
                            }
                        }
                    }
                });
            }
            return personName;
        },
        //考勤请假类型翻译
        getKqHolidayTypeNameById: function (typeId) {
            var typeName = "";
            //不为空，查询翻译
            if (typeId != undefined && typeId != null && typeId != '') {
                $.ajax({
                    url: serviceUrl + "kq/hrKqHolidaytypeSetting/get/" + typeId+"?time=" + Math.random(),
                    type: 'GET',
                    dataType: 'JSON',
                    async: false,
                    success: function (data) {
                        if (data.success) {
                            typeName = data.result.name;
                        }
                    }
                });
            }
            return typeName;
        },
        //聚焦节点
        focusNode:function(idsVal) {
            var id="";
            if (idsVal == null && idsVal == "" && idsVal == undefined){
                return;
            }
            var le = idsVal.length;
            //$("#60f66e3500714a7eb5ff36f826cf22ba .jqgrid-rownum").text();
            //对list进行排序
            var vList = new Array();
            for(var i=0;i<le;i++){
                vList.push({rowNum:$("#"+idsVal[i]+" .jqgrid-rownum").text(),id:idsVal[i]});
            }
            vList.sort(function (a,b) {
                return a.rowNum - b.rowNum;
            });
            //alert(JSON.stringify(vList));return;
            var v = new Array();
            var v2 = new Array();
            for(var i=0;i<vList.length;i++){
                v.push(vList[i].id);
                v2.push(vList[i].rowNum);
            }
            /*alert(v+"========="+JSON.stringify(vList));
             return;*/
            var idsVal = v;
            if(le > 1){
                var rowId = idsVal[le-1];//最后一个id
                var rowId2 = idsVal[0];//第一个id
                //alert($("#"+rowId+"").find(":input[role='checkbox']").is(":checked"));
                if($("#"+rowId+" + tr").prev().text() == ''){
                    for(var i = le-1;i>=0;i--){
                        if(i > 0){
                            if(v2[i] != parseInt(v2[i-1])+parseInt(1)){
                                /*$("#"+idsVal[i]+"").prev().find(":input[role='checkbox']").prop('checked',true);
                                $("#"+idsVal[i]+"").prev().find(":input[role='checkbox']").trigger("click");*/
                                return idsVal[i-1];
                            }
                        }else{
                            //表示最后一条数据，聚焦到上一个节点
                            /*$("#"+rowId2+"").prev().find(":input[role='checkbox']").prop('checked',true);
                            $("#"+rowId2+"").prev().find(":input[role='checkbox']").trigger("click");*/
                            return $("#"+rowId2+"").prev().attr("id");
                        }
                    }
                }else {
                    /*$("#"+rowId+" + tr").find(":input[role='checkbox']").prop('checked',true);
                    $("#"+rowId+" + tr").find(":input[role='checkbox']").trigger("click");*/
                    return  $("#"+rowId+" + tr").attr("id");
                }
            }else {
                var rowId = idsVal[0];
                if ($("#"+rowId+" + tr").text() == '' && $("#"+rowId+"").prev().text() == ''){
                    return null;
                }
                if($("#"+rowId+" + tr").prev().text() == ''){
                    //表示最后一条数据，聚焦到上一个节点
                    /*$("#"+rowId+"").prev().find(":input[role='checkbox']").prop('checked',true);
                    $("#"+rowId+"").prev().find(":input[role='checkbox']").trigger("click");*/
                    return $("#"+rowId+"").prev().attr("id");
                }else {
                    /*$("#"+rowId+" + tr :input[role='checkbox']").prop('checked',true);
                    $("#"+rowId+" + tr :input[role='checkbox']").trigger("click");*/
                    return $("#"+rowId+" + tr").attr("id");
                }
            }
        },
    });
})(jQuery);
