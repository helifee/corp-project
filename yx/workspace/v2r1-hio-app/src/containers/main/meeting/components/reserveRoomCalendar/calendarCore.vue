<template>
    <div class="meetingCalendarCss">
        <div id="meetingCalendar" ref="jqFullCalendarWrapper">

        </div>
    </div>

</template>

<script>

    // import '@/plugins/fullcalendar/locale.js'
    // import '@/plugins/fullcalendar/locale-all.js'


    const TYPES={
        AGENDA:{
            color:'rgba(246, 255, 237, 1)'
        },
        TASK:{
            color:'rgba(230, 247, 255, 1)'
        }
    }

    export default {
        name: "calendar-core",
        data(){
            let self=this
            return{
                calendarView:"month",
                fullCalendar:null
            }
        },
        created(){

        },
        beforeDestroy(){
            this.fullCalendar.fullCalendar('destroy')
        },
        async mounted(){

            await JZY.s.getScript('/static/fullCalendar/lunar.js')
            await JZY.s.getScript('/static/fullCalendar/fullcalendar.js')
            await JZY.s.getScript('/static/fullCalendar/locale.js')
            // TYPES:TYPES;
            // let lan=(await JZY.locale.getCurrentLanguage()).toLowerCase();
            let self=this;
            (function($){
                // alert($)
                self.$emit("initEnd");
                self.fullCalendar=$('#meetingCalendar').fullCalendar({
                    header: {
                        left: 'prev,next',
                        center: 'title',
                        right: 'month,agendaWeek'
                     },
                    navLinks: true, // can click day/week names to navigate views
                    editable: true,
                    eventLimit: true, // allow "more" link when too many events
                    events: [],
                    // eventSources: [{
                    //     // put your options and callbacks here
                    //     events: [
                    //         {
                    //             title: 'event1',
                    //             start: '2018-04-17 12:30:00',
                    //             end: '2018-04-17T14:30:00',
                    //
                    //         },
                    //         {
                    //             title: 'event2',
                    //             start: '2018-04-17',
                    //             end: '2018-04-18'
                    //         },
                    //         {
                    //             title: 'event3',
                    //             start: '2018-04-17 13:30:00',
                    //             end: '2018-04-17T14:30:00',
                    //             allDay: false // will make the time show
                    //         }
                    //     ],
                    //     color: 'black',     // an option!
                    //     textColor: 'yellow' // an option
                    // },{
                    //     events: [
                    //         {
                    //             title: 'event1',
                    //             start: '2018-04-17 12:30:00',
                    //             end: '2018-04-17T14:30:00',
                    //
                    //         },
                    //         {
                    //             title: 'event2',
                    //             start: '2018-04-19',
                    //             end: '2018-04-20'
                    //         }
                    //     ],
                    //     color: 'blue',     // an option!
                    //     textColor: 'yellow' // an option
                    // }],
                    defaultView: 'agendaWeek',
                    dayClick: function(date, allDay, jsEvent, view) {
                        self.$emit("calendarDayClick");
                        // console.log("dayClick")
                        // if (allDay) {
                        //     alert('Clicked on the entire day: ' + date);
                        // }else{
                        //     alert('Clicked on the slot: ' + date);
                        // }
                        // console.log( moment(date).startOf('week').format("YYYY-MM-DD"));
                        // console.log( moment(date).endOf('week').format("YYYY-MM-DD"));
                        // console.log( moment(date).startOf('month').format("YYYY-MM-DD"));

                        // console.log( moment(date).endOf('month').format("YYYY-MM-DD"));
                        // let a=self.fullCalendar.fullCalendar('date');
                        // console.log("ssss",a,moment(a.end).format("YYYY-MM-DD"),moment(a.start).format("YYYY-MM-DD"))
                        // debugger
                    },
                    eventClick: function(calEvent, jsEvent, view) {
                        self.$emit("calendarEventClick",calEvent);
                        // console.log("eventClick",calEvent,jsEvent)
                        // alert('Event: ' + JSON.stringify(calEvent));
                        // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                        // alert('View: ' + view.name);
                        // change the border color just for fun
                        // $(this).css('border-color', 'red');  //选择会变色

                    },
                })
                //  var a=self.fullCalendar.fullCalendar('getDate');
                // debugger
                // console.log("a:",a)
                // alert(jQuery( ".meetingCalendarCss .fc-header-toolbar .fc-center H2").text())
            })(jQuery);
        },
        methods:{
            setCalendarView(viewType){
                //切换视图
                this.fullCalendar.fullCalendar('changeView', viewType);
            },
            changeCurConten(type){
                //切换到下一个月、周或则日
                // console.log("change")
                if(type=="prev"){
                    this.fullCalendar.fullCalendar('prev');
                }else{
                    this.fullCalendar.fullCalendar('next');
                }
                // let  evtent=[
                //     {
                //         title: 'event1',
                //         start: '2018-04-16'
                //     },
                //     {
                //         title: 'event2',
                //         start: '2018-04-15',
                //         end: '2018-04-15'
                //     },
                //     {
                //         title: 'event3',
                //         start: '2010-01-09T12:30:00',
                //         allDay: false // will make the time show
                //     }
                // ]
                // this.fullCalendar.fullCalendar( 'removeEvents');
                // this.fullCalendar.fullCalendar('addEventSource',evtent)
            },
            changeEventSource(evtent){
                // evtent=[{
                //         title: 'event1',
                //         start: '2018-04-17 12:30:00',
                //         end: '2018-04-17T14:30:00',
                //        },
                //         {
                //             title: 'event2',
                //             start: '2018-04-17',
                //             end: '2018-04-18',
                //             color:'rgba(246, 255, 237, 1)',
                //             textColor:'red',
                //             borderColor:'red'
                //         },
                //         {
                //             title: 'event3',
                //             start: '2018-04-17 13:30:00',
                //             end: '2018-04-17T14:30:00',
                //             allDay: false // will make the time show
                //         }
                //     ]
                this.fullCalendar.fullCalendar( 'removeEvents');
                this.fullCalendar.fullCalendar('addEventSource', evtent);
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/plugins/fullcalendar.css';
    .meetingCalendarCss{
        .fc-content .fc-time{
            display: none;
        }
        .fc-toolbar.fc-header-toolbar{
            display: none;
        }
    }
</style>