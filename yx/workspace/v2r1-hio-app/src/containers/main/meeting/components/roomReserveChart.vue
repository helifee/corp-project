<!--参考官网教程中的“在 webpack 中使用 ECharts”-->
<!--http://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts-->
<template>
    <div id="refRoomChart" ></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入提示框和图例组件和title
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
    export default {
        name: "room-chart",
        props:{
            chartData:{
                required:true
            }
        },
        data(){
            return{
                setOption:{
                    grid:{
                        left: "1%",
                        right:"1%",
                        bottom: '1%',
                        top: '8px',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        min: 0,
                        max: 24,
                        interval: 1,
                        name: 'h',
                    },
                    yAxis: {
                        type: 'category',
                        splitLine: {
                            show: true
                        },
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    series: this.chartData
                }
            }

        },
        watch:{
            chartData(){
                this.myChart.clear();
                this.setOption.series=this.chartData;
                this.myChart.setOption(this.setOption)
            }
        },
        mounted(){
            // 初始化echarts实例
            this.myChart = echarts.init(document.getElementById('refRoomChart'));
            // 绘制图表
            this.myChart.setOption(this.setOption)
            // this.myChart.setOption({
            //     // title: {
            //     //     text: '世界人口总量',
            //     //     show:false
            //     // },
            //     // tooltip: {
            //     //     trigger: 'axis',
            //     //     axisPointer: {
            //     //         type: 'shadow'
            //     //     },
            //     //     formatter: function (params) {
            //     //         console.log("params:"+params)
            //     //         var tar;
            //     //         if (params[1].value != '-') {
            //     //             tar = params[1];
            //     //         }
            //     //         else {
            //     //             tar = params[0];
            //     //         }
            //     //         return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
            //     //
            //     //     }
            //     // },
            //     // legend: {
            //     //     data: ['2011年', '2012年'],
            //     //     show:false,
            //     // },
            //     grid: {
            //         left: '1%',
            //         right: '1%',
            //         bottom: '1%',
            //         top: '8px',
            //         containLabel: true
            //     },
            //     xAxis: {
            //         type: 'value',
            //         min: 0,
            //         max: 24,
            //         interval: 1,
            //         name: 'h',
            //     },
            //     yAxis: {
            //         type: 'category',
            //         splitLine: {
            //             show: true
            //         },
            //         data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            //     },
            //     series: this.chartData
            //     // series: [
            //     //     {
            //     //         type: 'bar',
            //     //         stack: '总量',
            //     //         itemStyle: {
            //     //             normal: {
            //     //                 barBorderColor: 'rgba(0,0,0,0)',
            //     //                 color: 'rgba(0,0,0,0)'
            //     //             },
            //     //             emphasis: {
            //     //                 barBorderColor: 'rgba(0,0,0,0)',
            //     //                 color: 'rgba(0,0,0,0)'
            //     //             }
            //     //         },
            //     //         data: [4.2, 8, 2, 7, 16]
            //     //     },
            //     //     {
            //     //         type: 'bar',
            //     //         stack: '总量',
            //     //         data: [1.5, 5, 2, '-', 8]
            //     //     },
            //     //     {
            //     //         type: 'bar',
            //     //         stack: 'test',
            //     //         itemStyle: {
            //     //             normal: {
            //     //                 barBorderColor: 'rgba(0,0,0,0)',
            //     //                 color: 'rgba(0,0,0,0)'
            //     //             },
            //     //             emphasis: {
            //     //                 barBorderColor: 'rgba(0,0,0,0)',
            //     //                 color: 'rgba(0,0,0,0)'
            //     //             }
            //     //         },
            //     //         data: [2, 10, 2, 9, 15]
            //     //     },
            //     //     {
            //     //         type: 'bar',
            //     //         stack: 'test',
            //     //         data: [6, 3, 1, 12, 5]
            //     //     },{
            //     //         type: 'bar',
            //     //         stack: 'test1',
            //     //         itemStyle: {
            //     //             normal: {
            //     //                 barBorderColor: 'rgba(0,0,0,0)',
            //     //                 color: 'rgba(0,0,0,0)'
            //     //             },
            //     //             emphasis: {
            //     //                 barBorderColor: 'rgba(0,0,0,0)',
            //     //                 color: 'rgba(0,0,0,0)'
            //     //             }
            //     //         },
            //     //         data: [15, 10, 2, 9, 0]
            //     //     },
            //     //     {
            //     //         type: 'bar',
            //     //         stack: 'test1',
            //     //         data: [4, 3, 4, 12, 5]
            //     //     }
            //     // ]
            // });

        },

        methods: {

        }
    }
</script>

<style scoped>

</style>
