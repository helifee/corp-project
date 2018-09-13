export default {
    eventClick: function (calEvent, jsEvent, view) {


        JZY.s.clog('cal ev:', calEvent, jsEvent);


        if (calEvent.isShowTitle == '1') {

            JZY.u.warningMsg('\n' +
                '对不起！\n' +
                '您不具有对当前对象访的访问权限');
            return false
        }


        if (calEvent.VM.isTask(calEvent)) {

            JZY.router.push('/task/detail/' + calEvent.taskId)
        } else {
            calEvent.VM.queryScheduleDetailById(calEvent.scheduleId, calEvent)
                .then(() => {
                    calEvent.VM.currentViewTask = null;
                    calEvent.VM.currentScheduleId = calEvent.scheduleId;
                });
        }

    },

    selectable: true,
    weekNumbers: true,
    selectHelper: true,
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
    },
    allDaySlot: false,
    defaultDate: JZY.u.formatTime(new Date()).split(' ')[0].split('/').join('-'),
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: []
}