<style>
    .bx-debug div{
        margin-bottom:50px;
    }

    .bx-debug{

    position: fixed;
    width: 100%;
    height: 440px;
    /* margin-bottom: 300px; */
    background: #d1dbe5;
    overflow-y: scroll;
    z-index: 99999;
    opacity: 0.7;
    color: red;
    bottom: 0;
    /* text-align: right; */
    width: 400px;
    right: 20px;
    }
</style>
<template>
    <div class="bx-debug">
        <el-tabs type="border-card">
            <el-tab-pane :key="index" v-for="(key,index) in keys" :label="key">
                <button @click="handleDataClick(u.getDataByModel(vm,key))">console.log当前数据</button>
                <div>
                    <pre>
                        {{u.getDataByModel(vm,key)}}
                    </pre>
                </div>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    let u={
        getDataByModel: function ($scope, modelStr, otherWiseVal) {
            console.log("vm data viewer getDataByModel--:",arguments)
            otherWiseVal = otherWiseVal || null

            if(!$scope){
                return otherWiseVal
            }

            var arr = modelStr.split('.'), len = arr.length, result = $scope
            // console.log('len:',len)
            if (len === 1) {
                // if($scope.hasOwnProperty(arr[0])) {
                //     return $scope[arr[0]]
                // }
                // else if($scope.result && $scope.result[arr[0]]) {
                //     return $scope.result[arr[0]]
                // }
                return $scope.hasOwnProperty(arr[0])?$scope[arr[0]]:otherWiseVal
            } else if (len > 1) {
                var isError = false
                for (var i in arr) {
                    if (typeof(result[arr[i]]) === 'undefined') {
                        isError = true
                        break
                    } else {
                        result = result[arr[i]]
                    }
                }
                if (isError) {
                    return otherWiseVal
                } else {
                    return result
                }
            } else if (len === 0) {
                return otherWiseVal
            }
        },
    }
    export default {

        props:{
            vm:Object,
            keys:Array
        },
        mounted(){


        },
        methods:{
            handleDataClick(data){
                console.log("log begin",data)
                console.table('table data:',data)
                // try{
                //     data=JSON.parse(JSON.stringify(data))
                //     console.table('data-----',data)
                // }catch(e){
                //     console.log('你点击的data:',data)
                // }
            }
        },
        data(){
            return {
                u:u,
                resizeConfig:{
                    direction:'east',
                    className:'east-resize',
                    alwaysShow:true,
                    // minHeight:35,
                    // minTop:100,
                    minWidth:10,
                    maxWidth:1920,
                    onClick(){
                        console.log('click args:',arguments)
                    },
                    onChange:function(options){

                        console.log('size has been changed:',options)
                    }
                }
            }
        },
        computed:{

        },
        watch:{

        }
    }
</script>
