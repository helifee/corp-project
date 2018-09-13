<template>
    <el-menu
            :router="true"
            :default-active="defaultActive"
            :default-openeds="openeds"
            class="el-menu-vertical-demo"
        >
        <el-menu-item index="/news">
            <i class="el-icon-menu"></i>
            <span slot="title">{{l('{newsLocale.menu.allArticle.title}')}}</span>
        </el-menu-item>
        <el-menu-item :index="'/news/classification/'+item.sid" v-for="item in columnsList" :key="item.id" style="padding-left: 54px;">
            <!--<i class="el-icon-menu"></i>-->
            <span slot="title">{{item.name}}({{item.newsCount}})</span>
            <!--{{item.id}}&#45;&#45;-->
        </el-menu-item>
        <el-menu-item index="/news/column" v-if="JZY.s.hasMenuPermisson('news_manage','modify')">
            <i class="el-icon-setting"></i>
            <span slot="title">{{l('{newsLocale.menu.settings.title}')}}</span>
        </el-menu-item>

    </el-menu>
</template>
<script type="text/javascript">
    import {mapMutations,mapGetters} from 'vuex'
    import {getNewsTypeList} from '@Main/news/getData.js'
    export default{
        data() {
            return{
                openeds:['/news'],
                defaultActive:JZY.s.getPathName(),//当前激活的菜单
            }

        },
        created(){

        },
        computed:{
            ...mapGetters({
                columnsList:'columnsList'
            })
        },
        methods:{
            initData(){
//                this.newsColumn = [...newsColumnData];
//                this.updateNewsColumn(this.newsColumn);
            },
            ...mapMutations({
                updateColumn:'UPDATE_COLUMN'
            }),
            async rqNewsTypeList(){
                let res = await getNewsTypeList();
                this.updateColumn(res);
//                console.log(res,"resres")
            },


        },
        created(){
            this.rqNewsTypeList();
        },
        watch:{
            $route(to) {
                if (to.params.hasOwnProperty('column') && to.params.column != '') {
                    if(to.params.column == 'all'){
                        this.defaultActive = '/news'
                    }else{
                        this.defaultActive = '/news/classification/'+to.params.column
                    }

                }else if(!to.params.hasOwnProperty('column')){
                    this.defaultActive = '/news'
                }else{
                    this.defaultActive = to.path
                }
            }
        },
        mounted(){
        if (this.$route.params.hasOwnProperty('column') && this.$route.params.column != '') {
            if(this.$route.params.column == 'all'){
                this.defaultActive = '/news'
            }else{
                this.defaultActive = '/news/classification/'+this.$route.params.column
            }

        }else if(!this.$route.params.hasOwnProperty('column')){
            this.defaultActive = '/news'
        }else{
            this.defaultActive = this.$route.path
        }
    }
    }

</script>
