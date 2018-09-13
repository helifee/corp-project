<template>
       <div>

           <el-dialog title="这是一个父组件里的dialog，其中内容为add-email-account子组件" :visible="true">
               <add-email-account @nextStep="handleNextStep"></add-email-account>
           </el-dialog>



           <!--<terminal>-->

           <!--</terminal>-->
       </div>
</template>
<style>

</style>
<script>

    import terminal from '../../../components/terminal/components/terminal'
    import addEmailAccount from './addEmailAccount'

    export default {
        computed: {

        },

        components:{
            terminal,
            addEmailAccount
        },
        methods: {

            handleNextStep(form){
                console.log('next step from-:',form)
            }
        },
        props: {


            // value: {
            //
            //     type: [Object],
            //     default: {}
            // }
        },
        beforeCreate() {

        },
        created(){

        },
        data() {



            return {

                data:[
                    {
                        a:'sdfsdf',
                        isHover:false
                    }
                ]
            }
        },

        beforeDestroy(){

        },
        destroyed(){

        },
        mounted() {



        },

    }
</script>
