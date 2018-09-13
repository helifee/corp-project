<template>
    <div>
        <!--<el-button @click="test()">change data arr</el-button>-->
        <schedule-core :schedule-query-params="{}" ref="schedule" :fullCalendarConfig="fullCalendarConfig"></schedule-core>
    </div>

</template>
<script>

    // 27399adceac243fd8130f9ccedaf88ae

    import scheduleCore from './schedule.core'
    export default {


        methods:{
            test(){

                this.$refs.schedule.fcInstance.fullCalendar( 'removeEvents');
                this.$refs.schedule.fcInstance.fullCalendar('addEventSource', [{
                    title: 'All Day Event',
                    start: '2018-03-01',
                    ...scheduleCore.TYPES.AGENDA
                }]);

                // this.$refs.schedule.fcInstance.fullCalendar('option', {
                //     event:[{
                //         title: 'All Day Event',
                //         start: '2018-03-01',
                //         ...scheduleCore.TYPES.AGENDA
                //     }]
                // });
            }
        },
        components:{
            scheduleCore
        },
        data(){
            let self=this
            return {

                fullCalendarConfig:{
                    // select:function(start, end){
                    //
                    //     // return false;
                    //     // let $jqFullCalendarWrapper=self.$refs.schedule.fcInstance
                    //     // var title = prompt('Event Title:');
                    //     // var eventData;
                    //     // if (title) {
                    //     //     eventData = {
                    //     //         title: title,
                    //     //         start: start,
                    //     //         end: end
                    //     //     };
                    //     //     $jqFullCalendarWrapper.fullCalendar('renderEvent', eventData, false); // stick? = true
                    //     // }
                    //     //
                    //     // $jqFullCalendarWrapper.fullCalendar('unselect');
                    // },
                    // events:[],
                    // events:[
                    //     {
                    //         title: 'All Day Event',
                    //         start: '2018-03-01',
                    //         ...scheduleCore.TYPES.AGENDA
                    //     },
                    //     {
                    //         title: 'Long Event',
                    //         start: '2018-03-07',
                    //         end: '2018-03-10',
                    //         ...scheduleCore.TYPES.TASK
                    //     }
                    //
                    //
                    //     // ,
                    //     // {
                    //     //     id: 999,
                    //     //     title: 'Repeating Event',
                    //     //     start: '2018-03-09T16:00:00'
                    //     // },
                    //     // {
                    //     //     id: 999,
                    //     //     title: 'Repeating Event',
                    //     //     start: '2018-03-16T16:00:00'
                    //     // },
                    //     // {
                    //     //     title: 'Conference',
                    //     //     start: '2018-03-11',
                    //     //     end: '2018-03-13'
                    //     // },
                    //     // {
                    //     //     title: 'Meeting',
                    //     //     start: '2018-03-12T10:30:00',
                    //     //     end: '2018-03-12T12:30:00'
                    //     // },
                    //     // {
                    //     //     title: 'Lunch',
                    //     //     start: '2018-03-12T12:00:00'
                    //     // },
                    //     // {
                    //     //     title: 'Meeting',
                    //     //     start: '2018-03-12T14:30:00'
                    //     // },
                    //     // {
                    //     //     title: 'Happy Hour',
                    //     //     start: '2018-03-12T17:30:00'
                    //     // },
                    //     // {
                    //     //     title: 'Dinner',
                    //     //     start: '2018-03-12T20:00:00'
                    //     // },
                    //     // {
                    //     //     title: 'Birthday Party',
                    //     //     start: '2018-03-13T07:00:00'
                    //     // },
                    //     // {
                    //     //     title: 'Click for Google',
                    //     //     url: 'http://google.com/',
                    //     //     start: '2018-03-28'
                    //     // },
                    //
                    // ]
                }
            }
        }
    }
</script>