require(['jquery',
    'xljUtils',
    'xljMultipleSelector',
    baseUrl + 'flow/js/flow.js',
    'bootstrap-datetimepicker.zh-CN'], function ($,xljUtils,flowJs) {
    $(function() {

        // 点击附件
        $('.selectediting').on('mouseover',function(){
            $(this).find('.circle').css("border","1px solid #fff")

        });
        $('.selectediting').on('mouseout',function(){
            $(this).find('.circle').css("border","1px solid #46A7FF")

        });
        // 点击责任人
        $('.selectedit').on('mouseover',function(){
            $(this).find('.facolor').css("color","#fff")

        });
        $('.selectedit').on('mouseout',function(){
            $(this).find('.facolor').css("color","#46A7FF")

        });
        //tab切换
        $(".con-tit button").on("click",function(e){
            var index = $(this).index();
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            var tabboxs = $(this).parent().parent().find(".tabbox");
            tabboxs.hide();
            tabboxs.eq(index).show();
            e.stopPropagation();
        });
        $(".beginapproval button").on('click',function() {
            tabcontent($(".beginleft"),$(this));
        })
        $("#beginapproval .bigBtn").on('click',function() {
            tabcontent($(".lcbegin "),$(this));
        })
        $(".operationlist .radiobuttom1").on('click',function() {
            var contend = $('#operation_list').children();
            contend.eq(0).siblings().hide();
            contend.eq(0).show();
        })
        $(".operationlist .radiobuttom2").on('click',function() {
            var contend = $('#operation_list').children();
            contend.eq(1).siblings().hide();
            contend.eq(1).show();
        })
        $(".operationlist .radiobuttom3").on('click',function() {
            var contend = $('#operation_list').children();
            contend.eq(2).siblings().hide();
            contend.eq(2).show();
        })
        $(".operationlist .radiobuttom4").on('click',function() {
            var contend = $('#operation_list').children();
            contend.eq(3).siblings().hide();
            contend.eq(3).show();
        })
        // tab切换封装
        function tabcontent(self,_this) {
            var index =_this.index();

            var contend = self.children();
            console.log(contend)
            _this.addClass('active').siblings().removeClass('active');
            contend.eq(index).siblings().hide();
            contend.eq(index).show();
            if(index==0){//切换回审批记录tab时刷新业务表单解决ie在业务表单未加载完成时切换导致表单变形问题
                decorateIframe();
            }
        }
        // 编辑
        $('.editimg').on('click',function(){
            $(".settitle").find(".settitle-one").css("visibility","hidden");
            $(".edittitle").css("display","block")
            $(".edittitle").val($(".settitle").find(".settitle-one").text());
            $(".edittitle").on('blur',function(){
                $(".edittitle").css("display","none");
                $(".settitle").find(".settitle-one").css("visibility","visible");
                $(".settitle").find(".settitle-one").text($(".edittitle").val());
            })
        });
        //定义datatimepicker的日期格式
        $('.myInputTime').datetimepicker({
            language:  'zh-CN',
            format: 'yyyy-mm-dd hh:ii',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        });
    });
})

