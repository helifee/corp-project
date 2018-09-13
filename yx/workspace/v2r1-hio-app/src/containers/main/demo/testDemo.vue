<template>
        <span>

            <!---->
            <!--<el-table :data="data">-->
                <!--<el-table-column>-->
                    <!--<template slot-scope="scope">-->
                        <!--{{scope.row.test}}-->
                        <!---->
                        <!--<el-switch v-model="data[scope.$index].test"></el-switch>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            <!--</el-table>-->








            <!--input:<el-input v-model="searchStr"></el-input>-->
            <!--it works-->











            <!--{{list.join(',')}}<br>-->


            <!--{{searchedList.join(',,,,,')}}-->

        </span>
</template>
<style>

</style>
<script>



    let a={
        personList:[
            {
                sharedShowId:'sdf'
            },
            {
                foo:'bar1'
            }

        ]


    }




    export default {
        computed: {

        },

        components:{

        },
        methods: {

        },
        computed:{


            searchedList(){
                if(this.searchStr.trim()==""){
                    return this.list
                }else{
                    return this.list.filter((item)=>{
                        return item.includes(this.searchStr)
                    })
                }
            }


        },
        props: {

            list:Array


            // value: {
            //
            //     type: [Object],
            //     default: {}
            // }
        },
        beforeCreate() {

        },
        data() {

            return {

                data:[
                    {
                        test:true
                    },
                    {
                        test:false
                    }
                ],

                searchStr:''

            }
        },

        mounted() {



            this.JZY.call(this,'setCurrentVM')
        },

    }
</script>
