
$(function(){
    //首页
    var menuData_HP={"moduleId":"HP","moduleName":"首页","url":"hp/hp_00index.html"};
    //系统管理
    var menuData_SM={"moduleId":"SM","moduleName":"系统管理","url":"sm/index.html","menu":[
        {"menuName":"组织用户权限","menuItems":[
            {"menuItemName":"组织机构与用户","url":"sm/01_组织机构与用户.html"},
            {"menuItemName":"角色管理","url":"sm/02_角色管理.html"},
            {"menuItemName":"功能授权","url":"sm/03_功能授权.html"},
            {"menuItemName":"数据授权","url":"sm/04_数据授权.html"}
        ]},
        {"menuName":"工作流管理","menuItems":[
            {"menuItemName":"工作日历","url":"sm/10_工作日历.html"},
            {"menuItemName":"流程配置","url":"sm/11_流程配置.html"},
            {"menuItemName":"流程查询","url":"sm/12_流程查询.html"},
            {"menuItemName":"流程分析","url":"sm/13_流程分析.html"}
        ]},
        {"menuName":"系统设置","menuItems":[
            {"menuItemName":"密码策略","url":"sm/20_密码策略.html"},
            {"menuItemName":"单据编号管理","url":"sm/21_单据编号管理.html"},
            {"menuItemName":"短信服务配置","url":"sm/22_短信服务配置.html"},
            {"menuItemName":"邮件服务配置","url":"sm/23_邮件服务配置.html"},
            {"menuItemName":"自动任务配置","url":"sm/24_自动任务配置.html"},
            {"menuItemName":"操作日志","url":"sm/25_操作日志.html"}
        ]},
        {"menuName":"接口配置","menuItems":[
            {"menuItemName":"基础数据同步配置","url":"sm/30_基础数据同步配置.html"},
            {"menuItemName":"单点登录接口配置","url":"sm/31_单点登录接口配置.html"},
            {"menuItemName":"消息推送接口配置","url":"sm/32_消息推送接口配置.html"},
            {"menuItemName":"财务系统接口配置","url":"sm/33_财务系统接口配置.html"},
            {"menuItemName":"自定义接口配置","url":"sm/34_自定义接口配置.html"}
        ]}
    ]};
    //主数据
    var menuData_MD={"moduleId":"MD","moduleName":"主数据管理","url":"md/md_00index.html","menu":[
        {"menuName":"业务参数设置","menuItems":[
            {"menuItemName":"业务参数","url":"md/01_组织机构与用户.html"},
            {"menuItemName":"省份城市","url":"md/02_角色管理.html"}
        ]},
        {"menuName":"产品与项目主数据","menuItems":[
            {"menuItemName":"产品类型","url":"md/10_工作日历.html"},
            {"menuItemName":"项目档案","url":"md/11_流程配置.html"}
        ]},
        {"menuName":"供方主数据","menuItems":[
            {"menuItemName":"供方分类","url":"md/30_基础数据同步配置.html"},
            {"menuItemName":"供方档案","url":"md/31_单点登录接口配置.html"}
        ]},
        {"menuName":"客户主数据","menuItems":[
            {"menuItemName":"客户档案","url":"md/30_基础数据同步配置.html"}
        ]},
        {"menuName":"财务主数据","menuItems":[
            {"menuItemName":"公司法人","url":"md/30_基础数据同步配置.html"},
            {"menuItemName":"付款款项类型","url":"md/31_单点登录接口配置.html"},
            {"menuItemName":"结算方式","url":"md/32_消息推送接口配置.html"},
            {"menuItemName":"凭证类别","url":"md/33_财务系统接口配置.html"},
            {"menuItemName":"会计科目","url":"md/34_自定义接口配置.html"}
        ]}
    ]};

    var menuData_PL={"moduleId":"PL","moduleName":"计划管理","url":"pl/index.html","menu":[
        {"menuName":"业务参数设置","menuItems":[
            {"menuItemName":"管控设置","url":"pl/01_管控设置.html"},
            {"menuItemName":"流程启用控制","url":"pl/02_流程启用控制.html"},
            {"menuItemName":"推送设置","url":"pl/03_推送设置.html"},
            {"menuItemName":"公司排序","url":"pl/04_公司排序.html"},
            {"menuItemName":"批量替换人员","url":"pl/05_批量替换人员.html"}
        ]},
        {"menuName":"项目全景计划","menuItems":[
            {"menuItemName":"计划编制与调整","url":"pl/10_计划编制与调整.html"},
            {"menuItemName":"业务项汇报","url":"pl/11_业务项汇报.html"},
            {"menuItemName":"报表分析","url":"pl/12_报表分析.html"}
        ]},
        {"menuName":"项目专项计划","menuItems":[
            {"menuItemName":"计划编制与调整","url":"pl/20_计划编制与调整.html"},
            {"menuItemName":"业务项汇报","url":"pl/21_业务项汇报.html"},
            {"menuItemName":"报表分析","url":"pl/21_报表分析.html"}
        ]},
        {"menuName":"部门计划","menuItems":[
            {"menuItemName":"计划编制与调整","url":"pl/30_计划编制与调整.html"},
            {"menuItemName":"业务项汇报","url":"pl/31_业务项汇报.html"},
            {"menuItemName":"报表分析","url":"pl/32_报表分析.html"}
        ]}
    ]};

    //招标采购管理
    var menuData_PU={"moduleId":"PU","moduleName":"招标采购","url":"pu/index.html","menu":[
        {"menuName":"业务参数设置","menuItems":[
            {"menuItemName":"管控设置","url":"pu/01_管控设置.html"},
            {"menuItemName":"流程设置","url":"pu/02_流程设置.html"},
            {"menuItemName":"附件设置","url":"pu/03_附件设置.html"},
            {"menuItemName":"符合性评审项目","url":"pu/04_符合性评审项目.html"},
            {"menuItemName":"短信模板设置","url":"pu/05_短信模板设置.html"},
            {"menuItemName":"供方评估项设置","url":"pu/06_供方评估项设置.html"}
        ]},
        {"menuName":"供方管理","menuItems":[
            {"menuItemName":"供方分类","url":"pu/10_供方分类.html"},
            {"menuItemName":"供方资质","url":"pu/11_供方资质.html"},
            {"menuItemName":"供方注册","url":"pu/12_供方注册.html"},
            {"menuItemName":"供方审查","url":"pu/13_供方审查.html"},
            {"menuItemName":"现场考察","url":"pu/14_现场考察.html"},
            {"menuItemName":"供方评价","url":"pu/15_供方评价.html"},
            {"menuItemName":"供方查询","url":"pu/16_供方查询.html"}
        ]},
        {"menuName":"招标管理","menuItems":[
            {"menuItemName":"招标计划","url":"pu/20_招标计划.html"},
            {"menuItemName":"招标方案","url":"pu/21_招标方案.html"},
            {"menuItemName":"邀请招标（工程）","url":"pu/22_邀请招标（工程）.html"},
            {"menuItemName":"邀请招标（非工程）","url":"pu/23_邀请招标（非工程）.html"},
            {"menuItemName":"议标","url":"pu/24_议标.html"},
            {"menuItemName":"零星采购","url":"pu/25_零星采购.html"}
        ]},
        {"menuName":"供方门户","menuItems":[
            {"menuItemName":"供方注册","url":"pu/30_供方门户.html"},
            {"menuItemName":"供方门户","url":"pu/21_供方门户.html"}
        ]}
    ]};

    //成本管理
    var menuData_CO={"moduleId":"CO","moduleName":"成本管理","url":"co/index.html","menu":[
        {"menuName":"业务参数设置","menuItems":[
            {"menuItemName":"管控设置","url":"co/01_管控设置.html"},
            {"menuItemName":"模版设置","url":"co/02_模版设置.html"},
            {"menuItemName":"数据设置","url":"co/03_数据设置.html"}
        ]},
        {"menuName":"成本管理","menuItems":[
            {"menuItemName":"目标成本","url":"co/10_目标成本.html"},
            {"menuItemName":"合约规划","url":"co/11_合约规划.html"},
            {"menuItemName":"动态成本控制","url":"co/12_动态成本控制.html"},
            {"menuItemName":"产品动态成本","url":"co/13_产品动态成本.html"},
            {"menuItemName":"成本简报","url":"co/14_成本简报.html"}
        ]},
        {"menuName":"合同管理","menuItems":[
            {"menuItemName":"合同台账","url":"co/20_合同台账.html"},
            {"menuItemName":"变更签证管理","url":"co/21_变更签证管理.html"}
        ]},
        {"menuName":"付款管理","menuItems":[
            {"menuItemName":"合同付款","url":"co/30_合同付款.html"},
            {"menuItemName":"无文本合同付款","url":"co/31_无文本合同付款.html"},
            {"menuItemName":"代付管理","url":"co/32_代付管理.html"},
            {"menuItemName":"付款登记","url":"co/33_付款登记.html"}
        ]},
        {"menuName":"成本数据库","menuItems":[
            {"menuItemName":"成本测算","url":"co/40_成本测算.html"},
            {"menuItemName":"成本后评估","url":"co/41_成本后评估.html"},
            {"menuItemName":"成本指标库","url":"co/42_成本指标库.html"}
        ]},
        {"menuName":"成本报表","menuItems":[
            {"menuItemName":"成本报表","url":"co/50_成本报表.html"}
        ]}
    ]};


    //质量管理
    var menuData_QU={"moduleId":"QU","moduleName":"质量管理","url":"qu/index.html","menu":[
        {"menuName":"停止点检查","menuItems":[
            {"menuItemName":"集团停止点模板","url":"co/10_集团停止点模板.html"},
            {"menuItemName":"项目停止点定义","url":"co/11_项目停止点定义.html"},
            {"menuItemName":"停止点汇报","url":"co/12_停止点汇报.html"},
            {"menuItemName":"停止点查询","url":"co/13_停止点查询.html"}
        ]},
        {"menuName":"样板检查","menuItems":[
            {"menuItemName":"集团样板模板","url":"co/21_集团样板模板.html"},
            {"menuItemName":"项目样板定义","url":"co/22_项目样板定义.html"},
            {"menuItemName":"样板汇报","url":"co/23_样板汇报.html"},
            {"menuItemName":"样板查询","url":"co/24_样板查询.html"}
        ]},
        {"menuName":"材料检查","menuItems":[
            {"menuItemName":"材料合同","url":"co/30_材料合同.html"},
            {"menuItemName":"材料封样","url":"co/31_材料封样.html"},
            {"menuItemName":"材料验收","url":"co/32_材料验收.html"}
        ]},
        {"menuName":"日常检查","menuItems":[
            {"menuItemName":"日常检查","url":"co/40_成本测算.html"},
            {"menuItemName":"整改","url":"co/41_成本后评估.html"}
        ]}
    ]};

    var menuData=[menuData_HP,menuData_SM,menuData_MD,menuData_PL,menuData_PU,menuData_CO,menuData_QU];

    var oLogoBar=$("#erp_head_logoBar");//logo栏
    var oLogo=$("img.logo");//logo
    var oTopButton=$("span.topButton");//顶部按钮
    var oMenuBar=$("#erp_head_menuBar");//菜单条
    var oModule=$("#erp_head_menuBar_module");//当前显示的模块，点击模块清单中的某个模块时，将该模块置为当前模块
    var oModuleList=$("#erp_head_ModuleList").hide();//模块清单，在鼠标放在模块上时显示
    var oMenuList=$("#erp_head_menuBar_menuList");//菜单条上的菜单集合，在单击模块清单中的某个模块时，更新菜单集合
    var oMenuItemList=$("#erp_head_MenuItemList").hide();//菜单列表，点击菜单列表中的某个菜单，在“内容”区显示其对应的url
    var oNav=$("#erp_head_nav");//导航区
    var oUp=null;//上箭头，点击后隐藏表头区域
    var oDown=null;//下箭头，点击后显示表头区域
    var oIframe=$("#erp_body_iframe");//显示HTML文件的区域

    oMenuBar.addClass("menuBackground");
    oModule.addClass("moduleBackground");

    var ids=getCookie();
    showModuleAndMenu(ids.moduleId);//显示模块名及其菜单
    showNav(ids.moduleId,ids.menuId,ids.menuItemId);//在导航栏显示模块名称
    createModuleList();//创建模块清单（但不显示）
    //alert(menuData[ids.moduleId].url);
    loadHtmlFile(menuData[ids.moduleId].url);

    //单击logo返回首页
    oLogo.click(function(){
        var ids={"moduleId":0,"menuId":-1,"menuItemId":-1};
        showModuleAndMenu(ids.moduleId);
        showNav(ids.moduleId);
        loadHtmlFile(menuData[ids.moduleId].url);
        setCookie(ids);
    });

    function showModuleAndMenu(moduleId){//显示模块名及该模块下的菜单
        //显示模块名称
        oModule.html("");
        var oModuleId=$("<span></span>")
            .html(moduleId)
            .addClass("hide")
            .addClass("moduleId")
            .appendTo(oModule);
        var moduleName=menuData[moduleId].moduleName;
        var oModuleName=$("<span></span>")
            .addClass("moduleName")
            .html(moduleName+"&nbsp;∨")
            .appendTo(oModule);

        //显示该模块所属菜单列表
        oMenuList.html("");
        var oTable=$("<table></table>")
            .css("width","100%")
            .css("height","100%")
            .appendTo(oMenuList);
        var oTr=$("<tr></tr>")
            .appendTo(oTable);
        if(menuData[moduleId].menu){
            $.each(menuData[moduleId].menu,function(i,v){
                var oTd=$("<td></td>")
                    .css("text-align","center")
                    .addClass("menu")
                    .appendTo(oTr);
                $("<span></span>")
                    .addClass("menuId")
                    .addClass("hide")
                    .html(i)
                    .appendTo(oTd);
                $("<span></span>")
                    .addClass("menuName")
                    .html(v.menuName)
                    .appendTo(oTd);
            });
        }
        var oTdUpDown=$("<td id='erp_head_updown' ></td>")//显示/隐藏logo的按钮（图片）
            .css("text-align","right")
            .css("vertical-align","middle")
            .css("padding-right","5px")
            .appendTo(oTr);
        oUp=$("<img src='./img/up.png'/>")
            .attr("id","erp_head_up")
            .css("cursor","pointer")
            .addClass("icon")
            .appendTo(oTdUpDown);
        oDown=$("<img src='./img/down.png'/>")
            .attr("id","erp_head_down")
            .css("cursor","pointer")
            .addClass("icon")
            .appendTo(oTdUpDown);
        if(oLogoBar.is(":visible")){
            oUp.show();
            oDown.hide();
        }else{
            oUp.hide();
            oDown.show();
        }
    }

    /*               得到模块、菜单、菜单项的id和名称          */

    function getModuleIdNow(){//得到当前显示的模块id
        return parseInt(oNav.find("span.moduleId").html());
    }
    function getModuleNameNow(){//得到当前显示的模块的名称
        return oNav.find("span.moduleName").html();
    }
    function getMenuIdNow(){//得到当前显示的菜单id
        return parseInt(oNav.find("span.menuId").html());
    }
    function getMenuNameNow(){//得到当前显示的菜单的名称
        return oNav.find("span.menuName").html();
    }
    function getMenuItemIdNow(){//得到当前显示的菜单项id
        return parseInt(oNav.find("span.menuItemId").html());
    }
    function getMenuItemNameNow(){//得到当前显示的菜单项的名称
        return oNav.find("span.menuItemName").html();
    }
    function getModuleId(oTd){//模块清单上，根据模块所在的td得到该模块的序号
        return parseInt(oTd.find("span.moduleId").html());
    }
    function getModuleName(oTd){//模块清单上，根据模块所在的td得到该模块的名称
        return oTd.find("span.moduleName").html();
    }
    function getMenuId(oTd){//根据菜单所在的td得到该菜单的序号
        return parseInt(oTd.find("span.menuId").html());
    }
    function getMenuName(oTd){//根据菜单所在的td得到该菜单的名称
        return oTd.find("span.menuName").html();
    }
    function getMenuItemId(oTd){//根据菜单项所在的td得到该菜单项的序号
        return parseInt(oTd.find("span.menuItemId").html());
    }
    function getMenuItemName(oTd){//根据菜单项所在的td得到该菜单项的名称
        return oTd.find("span.menuItemName").html();
    }
    function getMenuIdByItem(oTd){//根据菜单项所在的td得到该菜单项所属菜单的序号
        return parseInt(oTd.find("span.menuId").html());
    }
    function getMenuNameByItem(oTd){//根据菜单项所在的td得到该菜单项所属菜单的名称
        return oTd.find("span.menuName").html();
    }


    /*       模块相关操作：经过/离开模块名称、创建模块列表、经过/离开/点击模块项名称时的操作               */

    oModule.mouseover(function(){//鼠标经过模块名称时
        $(this).removeClass("moduleBackground");
        $(this).addClass("moduleBackground_mousemove");
        createModuleList();
        oModuleList.show();
        //oModuleList.show();
    });

    oModule.mouseout(function(e){//鼠标离开模块名称时
        $(this).removeClass("moduleBackground_mousemove");
        $(this).addClass("moduleBackground");
        var x= e.pageX;
        var y= e.pageY;
        var x1=oModule.offset().left;
        var x2=x1+oModule.width();
        var y1=oModule.offset().top;
        var y2=oModuleList.offset().top+oModuleList.height();
        if(x<x1 || x>x2 || y<y1 || y>y2){
            oModuleList.hide();
        }
    });

    //单击当前模块名称时，返回该模块的首而
    oModule.click(function(){
        var moduleId=getModuleIdNow();//得到当前显示的模块的id
        showNav(moduleId); //显示导航内容
        loadHtmlFile(menuData[moduleId].url);//加载模块对应的HTML文件
        setCookie({"moduleId":moduleId,"menuId":-1,"menuItemId":-1});
        oModuleList.hide();
    });


    oModuleList.mouseout(function(e){//鼠标离开模块下拉列表时
        var x= e.pageX;
        var y= e.pageY;
        var x1=oModule.offset().left;
        var x2=x1+oModule.width();
        var y1=oModule.offset().top;
        var y2=oModuleList.offset().top+oModuleList.height()-2;
        if(x<x1 || x>x2 || y<y1 || y>y2){
            oModuleList.hide();
        }
    });

    oModuleList.delegate("td","mouseover",function(){//鼠标经过模块项名称时
        $(this).addClass("moduleItemBackground_mouseMove");
    });

    oModuleList.delegate("td","mouseout",function(){//鼠标离开模块项名称时
        $(this).removeClass("moduleItemBackground_mouseMove");
    });

    function createModuleList(){//生成模块列表的界面
        oModuleList.html("");
        var moduleLeft=oModule.offset().left;
        var moduleTop=oModule.offset().top+oModule.height()+3;
        var moduleWidth=oModule.width();
        oModuleList.css("position","absolute")
            .css("top",moduleTop)
            .css("left",moduleLeft)
            .css("width",moduleWidth)
            .addClass("moduleList");
        var oTable=$("<table></table>").appendTo(oModuleList);
        $.each(menuData,function(i,v){
            var oTr=$("<tr></tr>").appendTo(oTable);
            var oTd=$("<td></td>").appendTo(oTr)
                .css("vertical-align","middle")
                .css("text-align","left");
            var oNumber=$("<span></span>")
                .html(i)
                .addClass("hide")
                .addClass("moduleId")
                .appendTo(oTd);
            var oModuleName=$("<span></sapn>")
                .html(v.moduleName)
                .addClass("moduleName")
                .appendTo(oTd);
            if(i>0){
                oTd.addClass("dashed");
            }
        });
    };

    oModuleList.delegate("td","click",function(){//鼠标单击模块项名称时，更换模块及其相应的菜单
        oModuleList.hide();
        var moduleIdNow=getModuleIdNow();//得到当前显示的模块的id
        var moduleId=getModuleId($(this));//得到点击的模块的id
        if(moduleId!=moduleIdNow){
            showModuleAndMenu(moduleId);//显示所选择的模块和其所属菜单
            showNav(moduleId); //显示导航内容
            loadHtmlFile(menuData[moduleId].url);//加载模块对应的HTML文件
            setCookie({"moduleId":moduleId,"menuId":-1,"menuItemId":-1});
        }
    });

    /*                        菜单相关操作                                */

    oMenuList.delegate("td.menu","mouseover",function(){//鼠标经过菜单名称时
        $(this).addClass("menuBackground_mouseMove");
        createMenuItemList($(this));
        oMenuItemList.show();
    });
    oMenuList.delegate("td.menu","mouseout",function(e){//鼠标离开菜单名称时
        var oMenu=$(this);
        oMenu.removeClass("menuBackground_mouseMove");
        var x= e.pageX;
        var y= e.pageY;
        var x1=oMenu.offset().left;
        var x2=x1+oMenu.width();
        var y1=oMenu.offset().top;
        var y2=oMenuItemList.offset().top+oMenuItemList.height();
        if(x<x1 || x>x2 || y<y1 || y>y2){
            oMenuItemList.hide();
        }
    });

    function createMenuItemList(oMenu){//当鼠标停留在菜单名称上时，创建该菜单的菜单项清单
        var moduleId=getModuleIdNow();
        var menuId=getMenuId(oMenu);//获得菜单id
        var menuName=getMenuName(oMenu);//获得菜单名称
        var menuLeft=oMenu.offset().left;
        var menuTop=oMenu.offset().top+oMenu.height()+3;
        var menuWidth=oMenu.width();
        oMenuItemList.html("");
        oMenuItemList.css("position","absolute")
            .css("top",menuTop)
            .css("left",menuLeft)
            .css("width",menuWidth)
            .addClass("menuItemList");
        var oTable=$("<table></table>").appendTo(oMenuItemList);
        $.each(menuData[moduleId].menu[menuId].menuItems,function(i,v){
            var oTr=$("<tr></tr>").appendTo(oTable);
            var oTd=$("<td></td>").appendTo(oTr)
                .css("vertical-align","middle")
                .css("text-align","left")
                .addClass("menuItem");
            var oMenuId=$("<span></span>")
                .addClass("menuId")
                .addClass("hide")
                .html(menuId)
                .appendTo(oTd);
            var oMenuName=$("<span></span>")
                .addClass("menuName")
                .addClass("hide")
                .html(menuName)
                .appendTo(oTd);
            var oMenuItemId=$("<span></span>")
                .html(i)
                .addClass("hide")
                .addClass("menuItemId")
                .appendTo(oTd);
            var oMenuItemName=$("<span></sapn>")
                .html(v.menuItemName)
                .addClass("menuItemName")
                .appendTo(oTd);
            var oMenuItemUrl=$("<span></span>")
                .html(v.url)
                .addClass("hide")
                .appendTo(oTd);
            if(i>0){
                oTd.addClass("dashed");
            }
        });
    }

    oMenuItemList.delegate("td.menuItem","mousemove",function(){//鼠标移动到菜单项清单中的某一个菜单项上时
       $(this).addClass("menuItemBackground_mouseMove");
    });

    oMenuItemList.delegate("td.menuItem","mouseout",function(){//鼠标离开菜单项清单中的某一个菜单项上时
        $(this).removeClass("menuItemBackground_mouseMove");
    });

    oMenuItemList.mouseout(function(e){//鼠标离开菜单项下拉列表时
        var x= e.pageX;
        var y= e.pageY;
        var x1=oMenuItemList.offset().left;
        var x2=x1+oMenuItemList.width();
        var y1=oMenuItemList.offset().top;
        var y2=oMenuItemList.offset().top+oMenuItemList.height()-2;
        if(x<x1 || x>x2 || y<y1 || y>y2){
            oMenuItemList.hide();
        }
    });

    oMenuItemList.delegate("td.menuItem","click",function(){//单击某一菜单项时
        oTd=$(this);
        oMenuItemList.hide();
        var menuIdNow=getMenuIdNow();
        var menuItemIdNow=getMenuItemIdNow();
        var moduleId=getModuleIdNow();
        var menuId=getMenuIdByItem(oTd);
        var menuItemId=getMenuItemId(oTd);
        if((isNormal(menuIdNow) || menuIdNow!=menuId) || (isNormal(menuItemIdNow) || menuItemIdNow!=menuItemId)){
            showNav(moduleId,menuId,menuItemId);
            loadHtmlFile(menuData[moduleId].menu[menuId].menuItems[menuItemId].url);//加载菜单项对应的HTML文件
            setCookie({"moduleId":moduleId,"menuId":menuId,"menuItemId":menuItemId});
        }
    });

    function showNav(moduleId,menuId,menuItemId){//在导航区显示内容（先清空原有内容）
        //alert(moduleId+","+moduleName+","+menuId+","+menuName+","+menuItemId+","+menuItemName);
        var seprator=" > ";
        var moduleName=menuData[moduleId].moduleName;
        var menuName;
        var menuItemName;
        oNav.html("");
        $("<span></span>").html(moduleId).appendTo(oNav).addClass("moduleId").addClass("hide");
        $("<span></span>").html(moduleName).appendTo(oNav).addClass("moduleName");
        if(isNormal(menuId) && menuId!=-1){
            menuName=menuData[moduleId].menu[menuId].menuName;
            $("<span></span>").html(menuId).appendTo(oNav).addClass("menuId").addClass("hide");
            $("<span></span>").html(seprator+menuName).appendTo(oNav).addClass("menuName");
        }
        if(isNormal(menuItemId) && menuItemId!=-1){
            menuItemName=menuData[moduleId].menu[menuId].menuItems[menuItemId].menuItemName;
            $("<span></span>").html(menuItemId).appendTo(oNav).addClass("menuItemId").addClass("hide");
            $("<span></span>").html(seprator+menuItemName).appendTo(oNav).addClass("menuItemName");
        }
    }

    oMenuList.delegate("#erp_head_up","click",function(){
        oLogoBar.hide(1000);
        //oMenuBar.hide(1000);
        oDown.show();
        oUp.hide();
    });

    oMenuList.delegate("#erp_head_down","click",function(){
        oLogoBar.show(1000);
        //oMenuBar.show(1000);
        oUp.show();
        oDown.hide();
    });


    function loadHtmlFile(url){
        oIframe.attr("src",url);
    }

    function setCookie(ids){//将模块id存入cookie。
        $.cookie("moduleId", ids.moduleId);
        $.cookie("menuId",ids.menuId);
        $.cookie("menuItemId",ids.menuItemId);
    }

    function getCookie(){//从cookie中得到模块id、菜单id、菜单项id。
        var moduleId= parseInt($.cookie("moduleId"));
        if(!isNormal(moduleId)){
            moduleId=0;
        }
        var menuId= parseInt($.cookie("menuId"));
        if(!isNormal(menuId)){
            menuId=-1;
        }
        var menuItemId= parseInt($.cookie("menuItemId"));
        if(!isNormal(menuItemId)){
            menuItemId=-1;
        }
        return {"moduleId":moduleId,"menuId":menuId,"menuItemId":menuItemId};
    }

    function isNormal(tmp){//判断数据是否非NaN、undefined、null
        if (isNaN(tmp) || typeof(tmp) == "undefined" || (!tmp && typeof(tmp)!="undefined" && tmp!=0)){
            return false;
        }else{
            return true;
        }
    }

});

function SetCwinHeight(obj)
{
    var cwin=obj;
    if (document.getElementById)
    {
        if (cwin && !window.opera)
        {
            if (cwin.contentDocument && cwin.contentDocument.body.offsetHeight)
                cwin.height = cwin.contentDocument.body.offsetHeight + 20; //FF NS
            else if(cwin.Document && cwin.Document.body.scrollHeight)
                cwin.height = cwin.Document.body.scrollHeight + 10;//IE
        }
        else
        {
            if(cwin.contentWindow.document && cwin.contentWindow.document.body.scrollHeight)
                cwin.height = cwin.contentWindow.document.body.scrollHeight;//Opera
        }
    }
}
/*
 SM	系统管理
 MD	主数据管理
 SQ	面积管控
 LI	土地投资
 PL	计划管理
 DE	设计管理
 PU	招采管理
 CO	成本管理
 EX	费用管理
 MS	移动案场
 SA	销售管理
 QU	质量管理
 OA	办公自动化
 BI	商业智能
 MA	移动应用
 */