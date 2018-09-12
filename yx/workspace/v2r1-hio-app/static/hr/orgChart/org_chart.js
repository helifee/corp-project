/**
 * 机构图js
 * lixd
 */
var oc;
//机构信息
var orgData;
// 是否显示导出按钮  默认不显示
var ifExportButtonShow = false;
//上来就执行
$(function () {
    // var v = 'leaderId,personNum';
    //默认全选
    $('#showInfo option').each(function(){
        // if(v.indexOf(','+this.value+',')!=-1){
            this.selected=true;
        // }
    });
    $('#showInfo').multipleSelect({
        width: '150px',
        filter: false,//不过滤
        addTitle: true,
        minimumCountSelected: 10
    });
    var orgId=$.xljUtils.getUrlParam("orgId");
    //获取机构信息
    getOrgInfo(orgId);
    //渲染机构图
    orgchart();
    // $.mockjax({
    //     url: '/orgchart/initdata',
    //     responseTime: 1000,
    //     contentType: 'application/json',
    //     responseText: orgData
    // });

  //查询用户功能权限
  $.ajax({
      type:'POST',
      url:hostUrl+"auth/authData/queryAuthorizationBtnList",
      dataType:'JSON',
      contentType:'application/json',
      async: false,//设置为同步
      data:JSON.stringify({"menuCode":"hr_org"}),
      success:function(json){
          var list=json.result;
          if(list!=null&&list.length>0) {
              $.each(list,function(index,value){
                  for(var key in value){
                      if(key=="code"&&value[key]=="2"){//编辑权限
                          ifExportButtonShow = true;//只有导出权限可以显示导出按钮
                          $('#exportBtn').attr('style','display:block');
                      }
                  }
              });
          }
      },
      error:function(){
      }
  });

    //导出
    $('#exportBtn').click(function (e) {
        oc.export('机构图','jpg');
    });

    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //清除input框内容
    $('#valueEmpty').click(function (e) {
        e.preventDefault();
        $(this).parents('.input-group').children('input').val('');
        var data={};
        data.id='';
        data.name='';
        orgCallback(data);
    });
});
/**
 * 机构回调函数
 * @param data
 */
function orgCallback(data) {
    var orgId = data.id;
    var orgName = data.name;
    $('#orgId').val(orgId);
    $('#orgName').val(orgName);
    //机构切换 触发查询
    getOrgInfo(orgId);
    //通过新数据源，重载构建机构图
    console.time('切换转化展示用时');
    //展开层级
    var level=$('#level').val();
    oc.init({'data': orgData,'nodeTemplate': nodeTemplate,'depth': level});
    console.time('切换转化展示用时');
    changeShowInfo();
}
/**
 * 更改展示级别
 */
function changeLevel() {
    //展开层级
    var level=$('#level').val();
    oc.init({'data': orgData,'depth': level});
    changeShowInfo();
}
/**
 * 切换展示信息
 */
function changeShowInfo() {
    //获取希望展示的信息
    var showInfo=$('#showInfo').val();
    var typeStr="";
    if(showInfo!=null&&showInfo.length>0){
        for(var i=0;i<showInfo.length;i++){
            if(typeStr.length>0){
                typeStr+=',';
            }
            typeStr+=showInfo[i];
        }
    }
    //切换负责人
    if(typeStr.indexOf("leaderId")>-1){
        $('.leaderId').attr('style','display:inline');
    }else{
        $('.leaderId').attr('style','display:none');
    }
    //切换人数
    if(typeStr.indexOf("personNum")>-1){
        $('.personNum').attr('style','display:inline');
    }else{
        $('.personNum').attr('style','display:none');
    }

}
/**
 * 获取机构信息
 * @param orgId 所选择的机构id
 */
function getOrgInfo(orgId) {
    var jsonData = {
        rootDelFlag: 0,
        orgDelFlag: 0,
        parentId: orgId
    };
    console.time('查询机构图信息用时');
    $.ajax({
        type: 'POST',
        url: hostUrl + "org/orgRoot/getOrgChart",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(jsonData),
        async: false,
        success: function (xhr) {
            //返回的数据节点
            var zNodes = xhr.result;
            // console.info(zNodes[0]);
            //转化为json的形式展示
            orgData = zNodes[0];
            $('#orgId').val(orgData.id);//回显
            $('#orgName').val(orgData.name);//回显
            console.timeEnd('查询机构图信息用时');
            //展示机构图
            // orgchart();
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "获取组织机构树请求失败");
        }
    });
}
/**
 * 自定义模板
 * @param data
 * @returns {string}
 */
var nodeTemplate = function(data) {
    console.info(data);
    var leaderId=$.hrUtils.filterNull(data.leaderId);
    if(""==leaderId){
        leaderId="(负责人空缺)";
    }
    var personNum=$.hrUtils.filterNull(data.personNum);
    personNum="人数"+personNum;
    // return `
    //     <div class="title">${data.name}</div>
    //     <div class="content"><span class="leaderId">`+leaderId+`</span>&nbsp;<span class="personNum">`+personNum+`</span></div>
    //   `;
    return '<div class="title">'+data.name+'</div>'+
        '<div class="content"><span class="leaderId">'+leaderId+'</span>&nbsp;<span class="personNum" style="color: blue" onclick="openEmpList('+data.id+')">'+personNum+'</span></div>';
};

/**
 * 打开人员列表
 * @param orgId
 */
function openEmpList(orgId){
    openPa("../org/org_emp_list.html?orgId="+orgId+"");
}

function orgchart() {
//todo 查询权限
    var w_h = $(window).height();
    $("#chart-container").height((w_h - 99) + "px");
    console.time('初次转化展示用时');
    oc = $('#chart-container').orgchart({
        'data': orgData,
        'pan': false,//缩
        'zoom': false,//放
        'depth': 2,//层级
        // 'nodeContent': 'title',//节点内容
        'nodeTemplate': nodeTemplate,
        // 'exportButton': ifExportButtonShow,//是否添加导出按钮
        // 'exportFilename': '机构图',//导出文件名称
        // 'exportFileextension': 'jpg'//扩展名
        // 'createNode': function($node, data) {
        //     $node.on('click', function (event) {
        //         if (!$(event.target).is('.edge, .toggleBtn')) {
        //             var $this = $(this);
        //             var $chart = $this.closest('.orgchart');
        //             var newX = window.parseInt(($chart.outerWidth(true) / 2) - ($this.offset().left - $chart.offset().left) - ($this.outerWidth(true) / 2));
        //             var newY = window.parseInt(($chart.outerHeight(true) / 2) - ($this.offset().top - $chart.offset().top) - ($this.outerHeight(true) / 2));
        //             $chart.css('transform', 'matrix(1, 0, 0, 1, ' + newX + ', ' + newY + ')');
        //         }
        //     });
        // }
    });
    oc.$chartContainer.on('touchmove', function (event) {
        event.preventDefault();
    });
    console.timeEnd('初次转化展示用时');
}
