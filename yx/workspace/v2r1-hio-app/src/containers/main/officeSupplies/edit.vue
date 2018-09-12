<template>
    <div class="wrap">
        <edit-office :form = "form"></edit-office>
    </div>
</template>

<script>
    JZY.locale.add('officeLocale',require('./office.locale'))
    import editOffice from '@Main/officeSupplies/components/edit/edit.office.vue'
    export default{
        components:{
            editOffice
        },
        methods:{

        },
        data(){
            return {
                form:{
                    category:'',
                    name:'',
                    number:'',
                    specification:'',
                    brand:'',
                    unit:'',
                    remarks:''
                },
            }
        },
        mounted (){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        padding: 22px;

    }

</style>
