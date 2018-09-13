var zTreeObj;
// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    view: {
        fontCss: getFont,
        nameIsHTML: true
    }
};
// zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
//var zNodes =[
//    { id:1, pId:0, name:"标准角色", open:true, iconSkin:"diy01",font:{'font-weight':'bold','color':'#000'}},
//    { id:11, pId:1, name:"集团级角色", open:true, iconSkin:"diy01",font:{'font-weight':'bold','color':'#000'}},
//    { id:111, pId:11, name:"品质监管部", iconSkin:"diy01",font:{'font-weight':'bold','color':'#000'}},
//    { id:1111, pId:111, name:"集团品质管理总经理",iconSkin:"diy02", font:{'color':'#000'}},
//    { id:1112, pId:111, name:"集团品质管理副总经理",iconSkin:"diy02", font:{'color':'#000'}},
//    { id:112, pId:11, name:"运营中心",iconSkin:"diy01",font:{'font-weight':'bold','color':'#000'}},
//    { id:1121, pId:112, name:"集团运营助理",iconSkin:"diy02", font:{'color':'#000'}},
//    { id:1122, pId:112, name:"执行总裁",iconSkin:"diy02", font:{'color':'#000'}},
//    { id:1123, pId:112, name:"总裁助理（运营）",iconSkin:"diy02", font:{'color':'#000'}},
//    { id:123, pId:11, name:"法务部",iconSkin:"diy02",font:{'color':'#000'}},
//    { id:124, pId:11, name:"行政部",iconSkin:"diy02",font:{'color':'#000'}},
//    { id:125, pId:11, name:"总裁办",iconSkin:"diy02",font:{'color':'#000'}},
//    { id:12, pId:1, name:"公司级角色", open:true, iconSkin:"diy01",font:{'font-weight':'bold','color':'#000'}},
//    { id:121, pId:12, name:"总经办", iconSkin:"diy01",font:{'font-weight':'bold','color':'#000'}},
//    { id:1211, pId:121, name:"城市总经理",iconSkin:"diy02", font:{'color':'#000'}},
//    { id:1212, pId:121, name:"城市副总经理",iconSkin:"diy02", font:{'color':'#000'}},
//    { id:122, pId:12, name:"行政与人办资源部", iconSkin:"diy01",font:{'font-weight':'bold','color':'#000'}},
//    { id:1221, pId:122, name:"城市行人部负责人",iconSkin:"diy02", font:{'color':'#000'}},
//    { id:123, pId:12, name:"财务管理部", iconSkin:"diy01",font:{'font-weight':'bold','color':'#000'}},
//    { id:1231, pId:123, name:"财务总经理",iconSkin:"diy02", font:{'color':'#000'}},
//];
function getFont(treeId, node) {

    return node.font ? node.font : {};
}
function recursionArray(arr) {
    for(var i in arr) {
        if(arr[i].children.length > 0) {
            arr[i].icon = "css/zTreeStyle/img/diy/main.png";
            recursionArray(arr[i].children);
        }else{
            arr[i].icon = "css/zTreeStyle/img/diy/12.png";
        }
    }
};

//获取组织机构树
function getOrgTree() {
    $.ajax({
        type:'POST',
        url:'http://192.168.3.84:8080/platform-app/sys/org/root/getTree',
        dataType:'json',
        contentType:'application/json',
        data:'{}',
        success: function(json) {
            var zNodes = json.result;
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        }
    })
}
getOrgTree();



