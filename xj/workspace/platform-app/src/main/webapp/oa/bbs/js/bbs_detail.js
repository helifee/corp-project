/**
 * Created by lenovo on 2017/5/3.
 */
$(function() {

    //收藏按钮
    $('#com-quick-collect-bbs').click(function() {

    })

    //返回顶部按钮的是否显示
    $(window).scroll(function(){
        backTopShow();
    });
    backTopShow();

    //返回顶部按钮点击事件
    $('#com-d-top-a').click(function() {
        $('body,html').animate({scrollTop:0},100);
        return false;
    })

    getData(1);    //拉取数据

})

function backTopShow() {
    if ($(window).scrollTop() > 100){
        $("#com-d-top-a").addClass('show');
    }else {
        $("#com-d-top-a").removeClass('show');
    }

    var target = $(".xj-bbs-detail-title");

    var mainOffsetTop = target.offset().top;
    var mainHeight = target.height();
    var winHeight = $(window).height();
    var winScrollTop = $(window).scrollTop();

    //判断标题是否在可视区
    if(winScrollTop > mainOffsetTop + mainHeight ||
        winScrollTop <　mainOffsetTop - winHeight) { //不在可视区内
        $('.xj-bbs-detail-title-fixed').fadeIn(500);
    }else {
        $('.xj-bbs-detail-title-fixed').fadeOut(500);
    }
}



function getData(p) {
    var ajaxUtil = new AjaxUtil({
        url: hostUrl + "bbs/testData/bbs_detail.json",//TODO 获取数据的地址 前端测试接口 需要更换为后台真正接口
        data: {
            index: p ? p : 1
        },
        templateObj: '#bbs-template',	//页面模板id
        pagination: false,	//是否分页
        dataHandler: function(data) {   //数据处理
            var result = [];
            _.each(data, function(ele, index, list) {
                var obj = {};
                obj.topic = ele.topic ? 'topic' : '';
                obj.post_id = ele.post_id;
                obj.username = ele.username;
                obj.level = ele.level;
                obj.source = ele.source;
                obj.job = ele.job;
                obj.submitArticlaNums = ele.submitArticlaNums;
                obj.score = ele.score;

                obj.floor = ele.floor;
                obj.time = ele.time;
                obj.role = ele.isFloorHost ? '楼主' : '#' + ele.floor;
                obj.content = ele.content;
                obj.feedbackNums = ele.isFloorHost ? '回帖数量: ' + ele.feedbackNums : '';


                result.push(obj);
            });
            return result;
        },
        callbackHandler: function() {

        },
        pagerHandler: function(p) {
            getData(p);
        },
        wrapperClass: 'list-msg'
    });
    ajaxUtil.init();
}