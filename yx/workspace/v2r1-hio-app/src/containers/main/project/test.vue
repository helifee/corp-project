<template>
    <div class="wrap">
        <ol>
            <todo-item
                    v-for="item in groceryList"
                    :todo="item"
                    :key="item.id">
            </todo-item>
        </ol>
    </div>
</template>

<script>

    import todoItem from '@Main/project/demo.vue'

    export default{
        components: {
            todoItem,
        },
        methods:{
            incrementTotal: function () {
                this.total += 1
            }
        },
        data(){
            return {
                total:'0',
                groceryList: [
                    { id: 0, text: '蔬菜' },
                    { id: 1, text: '奶酪' },
                    { id: 2, text: '随便其它什么人吃的东西' }
                ]
            }
        },
        computed: {

        },
        watch: {

        },

        mounted(){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        overflow: hidden;
        height: 100%;
        overflow-y: auto;
        background: #ffffff;




        }

</style>
