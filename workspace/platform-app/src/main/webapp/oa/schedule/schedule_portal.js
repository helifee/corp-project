/**
 * Created by admin on 2017/6/13.
 */
$(function () {
	   initPesonalCalendar();
	    initEvents();
});

    /**
     * 初始化日历排程控件
     */
    function initPesonalCalendar() {
        var initialLocaleCode = 'zh-cn';
        var currentDate = new Date();
        var scrollTime = (currentDate.getHours()<10?('0'+currentDate.getHours()):currentDate.getHours())+':00:00';
            /*+(currentDate.getMinutes()<10?('0'+currentDate.getMinutes()):currentDate.getMinutes())+':'
            +(currentDate.getSeconds()<10?('0'+currentDate.getSeconds()):currentDate.getSeconds());*/
        $('#calendar').fullCalendar({
            header: {
                left: 'today',
                center: 'prev title next',
                right: 'agendaWeek,month'
            },
            defaultView: 'agendaWeek',
            defaultDate:new Date(),
            scrollTime:scrollTime,
            locale: initialLocaleCode,
            height:$(window).height()-100,
            navLinks: false,
            editable: false,
            selectable: true,
            eventLimit: true,
            businessHours:false,
            slotDuration:'00:15:00',
            slotLabelFormat:'HH:mm',

            /*loading: function(bool) {
                $('#loading').toggle(bool);
            },*/
            eventRender: function(event, el) {
                // render the timezone offset below the event title
                if (event.start.hasZone()) {
                    el.find('.fc-title').after(
                        $('<div class="tzo"/>').text(event.start.format('Z'))
                    );
                }
            },
            dayClick: function(date, jsEvent, view) {
                var newdate= date.format('YYYY-MM-DD');
                window.open("schedule_list.html?date="+newdate);
            },
            select: function(startDate, endDate) {
                console.log('select', startDate.format(), endDate.format());
            },
            /*eventClick:function (calEvent, jsEvent, view) {
                var workScheduleId = calEvent.id;
                if(workScheduleId.indexOf('_')>-1) {
                    workScheduleId = workScheduleId.substring(workScheduleId.indexOf('_')+1);
                }

                if(calEvent.type=='PERSONAL_PROCEEDING'||calEvent.type=='MEETING'){
                    window.open('schedule_edit.html?act=view&workScheduleId='+workScheduleId);
                }else{
                	  window.open('../taskPackageDispatch/taskPackageDispatch_edit.html?dispatchId='+workScheduleId);
                }
            },*/
            eventRender: function(event, element) {
                element.css({'cursor':'pointer'});
                function eventClick() {
                    var workScheduleId = event.id;
                    if(workScheduleId.indexOf('_')>-1) {
                        workScheduleId = workScheduleId.substring(workScheduleId.indexOf('_')+1);
                    }

                    if(event.type=='PERSONAL_PROCEEDING'||event.type=='MEETING'){
                        window.open('schedule_edit.html?act=view&workScheduleId='+workScheduleId);
                    }else{
                        window.open('../taskPackageDispatch/taskPackageDispatch_edit.html?dispatchId='+workScheduleId);
                    }
                }
                element.off('click').on('click',eventClick);
                var startTime = event.start;
                var endTime = event.end;
                //startTime+'—'+endTime
                element.find('.fc-time').text('');
                element.attr('title',event.title);

                var removeSpan = $('<span class="eventRemove glyphicon glyphicon-remove"></span>');
                removeSpan.css({
                    position: 'absolute',
                    top: '1px',
                    right: '0',
                    'font-size': '8px',
                    color: '#FFFFFF',
                    'z-index':'333'
                });
                var scheduleType = event.type;
                var id = event.id;
                removeSpan.on('mouseover',function () {
                    element.off('click');
                });

                removeSpan.on('mouseout',function () {
                    element.on('click',eventClick);
                });
                removeSpan.on('click',function () {

                    if(scheduleType=='TASK'){
                        $.xljUtils.tip('blue','任务类日程不能删除！');
                        return;
                    }
                    /*else if(scheduleType=='MEETING') {
                        $.xljUtils.tip('blue','会议类日程不能删除！');
                        return;
                    }*/

                    $.xljUtils.confirm('blue','确定要删除这个日程吗？',function () {
                        $.ajax({
                            url: hostUrl + "oa/workSchedule/delete/" + id,
                            type: 'DELETE',
                            dataType: 'JSON',
                            success: function (resultData) {
                                if (resultData && resultData.success) {
                                    $.xljUtils.tip('blue', "数据删除成功！");
                                    $('#calendar').fullCalendar('removeEvents',event.id);
                                } else {
                                    $.xljUtils.tip('red', "删除数据失败！");
                                }
                            },
                            error:function (xhr) {
                                $.xljUtils.tip('red','数据删除失败！');
                            }
                        });
                    },true);

                });
                element.find('.fc-content').append(removeSpan)
            }
        });
        var addScheduleBtn = $('<button type="button" class="fc-button fc-state-default fc-corner-left fc-corner-right ">新建日程</button>');
        addScheduleBtn.on('click',addSchedule);
        $(".fc-left").append(addScheduleBtn);
    
    }
 


    /**
     * 新建日程
     */
    function addSchedule(){
        window.open("schedule_edit.html?act=create");
    }

    /**
     * 初始化日历事件
     */
    function initEvents() {
        $.ajax({
            type:'POST',
            url:hostUrl + 'oa/workSchedule/queryListByUser',
            data: JSON.stringify({}),
            dataType: "json",
            contentType: 'application/json',
            success: function (returnData) {
                if(returnData&&returnData.success){
                    var result = returnData.result;
                    addEventsToCalendar(result);
                }
            }
        });
    }


    /**
     * 向日历中添加事件
     * @param result
     */
    function addEventsToCalendar(result) {
        if(result&&$.isArray(result)){
            var events = [];
            for (var i = 0; i < result.length; i++) {
                var obj = result[i];
                var event = {};
                event.title = obj.content;
                event.content = obj.content;

                if(obj.beginTime.lastIndexOf('.')!=-1){
                    obj.beginTime = obj.beginTime.substring(0,obj.beginTime.lastIndexOf('.'));
                }

                if(obj.endTime.lastIndexOf('.')!=-1){
                    obj.endTime = obj.endTime.substring(0,obj.endTime.lastIndexOf('.'));
                }

                event.beginTime = obj.beginTime;
                event.endTime = obj.endTime;
                if(obj.endTime && obj.beginTime && (new Date(obj.endTime.replace(/-/g,"/")).getDate()>new Date(obj.beginTime.replace(/-/g,"/")).getDate())){
                    event.start = obj.beginTime.replace(/-/g,"/");
                    event.end = obj.endTime.replace(/-/g,"/");
                    event.end = moment(moment(new Date(obj.endTime.replace(/-/g,"/")).getTime()+1*24*60*60*1000).format('YYYY-MM-DD')).format('YYYY-MM-DDTHH:mm:ss');
                    event.allDay=true;
                }else{
                    if(!event.endTime||$.trim(event.endTime)==''){
                        event.start = obj.beginTime.substring(0,10);
                    }else{
                        event.start = obj.beginTime.replace(' ','T');
                        event.end = obj.endTime.replace(' ','T');
                    }
                }

                event.type = obj.type;
                event.repetitionFrequency = obj.repetitionFrequency;//频率
                event.periodTaskNum = obj.periodTaskNum;
                event.periodBeginTime = obj.periodBeginTime;
                event.periodEndTime = obj.periodEndTime;
                event.taskOwner = obj.taskOwner;
                event.taskOwnerId = obj.taskOwnerId;
                event.frequencyType = obj.frequencyType;//频率类型
                event.status = obj.status;
                event.businessSource = obj.source;
                event.periodProceeding = obj.periodProceeding;
                event.taskOwner = obj.taskOwner;
                event.taskOwnerId = obj.taskOwnerId;
                event.id = obj.id;
                var tempDate = event.endTime?(event.endTime.replace('T',' ').replace(/-/g,'/')):null;
                if(tempDate&&tempDate.indexOf('.')!=-1) {
                    tempDate =tempDate.substring(0,tempDate.indexOf("."));
                }
                if(event.type=='PERSONAL_PROCEEDING'){
                    if(event.end && new Date(tempDate).getTime()>new Date().getTime()) {
                        event.color = 'orange';
                    }else{
                        event.color = 'gray';
                    }
                }else if(event.type=='TASK'){
                    if(event.status=='2'){
                    	 event.color = 'gray';
                    }else{
                    	event.color = 'orange';
                    }
                    /*if(event.end && new Date(tempDate).getTime()>new Date().getTime()) {
                        event.color = 'orange';
                    }else{
                        event.color = 'gray';
                    }*/
                }else if(event.type=='MEETING'){
                	   if(event.end && new Date(tempDate).getTime()>new Date().getTime()) {
                           event.color = 'orange';
                       }else{
                           event.color = 'gray';
                       }
                }
                events.push(event);
            }
        }

        $('#calendar').fullCalendar( 'addEventSource', events );
    }

/**
 * 获取指定日期所有事件
 * @param selectDay
 * @returns {*|jQuery}
 */
function getSelectDayEvents(selectDay) {
    var events = $('#calendar').fullCalendar( 'clientEvents',function (event) {
        //var startStr = event.start.format('YYYY/MM/DD');
        var startStr = event.beginTime?(event.beginTime.replace('T',' ').replace(/-/g,'/')):null;
        if(startStr.indexOf('.')!=-1) {
            startStr =startStr.substring(0,startStr.indexOf("."));
        }
        var endStr = event.endTime?(event.endTime.replace('T',' ').replace(/-/g,'/')):null;
        if(endStr.indexOf('.')!=-1) {
            endStr =endStr.substring(0,endStr.indexOf("."));
        }
        var tempBeginDate = new Date(startStr);
        var tempEndDate = new Date(endStr);
        var start = new Date(selectDay.replace(/-/g,'/')+' 00:00:00');
        var end = new Date(selectDay.replace(/-/g,'/')+' 23:59:59');

        return tempBeginDate.getTime()<=end.getTime()&&tempEndDate.getTime()>=start.getTime();
    });

    return events;
}

function reloadWin() {
    window.location.reload();
}
function reloadEvent() {
	$('#calendar').fullCalendar( 'removeEvents');
	initEvents();
}