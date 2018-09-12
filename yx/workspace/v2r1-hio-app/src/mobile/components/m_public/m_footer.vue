<template>
    <div class="m_footer_view_wrap">
        <tabbar>

          <tabbar-item v-for="(item,index) in footerList" :key="index" @on-item-click = "goLink(item.value)">
            <span slot="label">{{item.name}}</span>
          </tabbar-item>

          <!-- <tabbar-item>
            <icon slot="icon"  name="m_task_list" scale="1.5"></icon>
            <span slot="label">Wechat</span>
          </tabbar-item>
          <tabbar-item show-dot>
            <span slot="label">Message</span>
          </tabbar-item>
          <tabbar-item selected link="/component/demo">
            <span slot="label">Explore</span>
          </tabbar-item>
          <tabbar-item badge="2">
            <span slot="label">News</span>
          </tabbar-item> -->
        </tabbar>
    </div>
</template>
<script>
    import { Tabbar, TabbarItem, } from 'vux'
    export default {
        name:"footerView",
        components: {
            Tabbar,
            TabbarItem, 
        },
        props: {
            //来自于哪个栏目
            moduleName: {
                type: String,
                default:'task'
            },
            footerList:{
                type:Array,
                default:function(){
                    return []
                }
            }
        },
        data () {
            return {
                color:'#0ABF86'
            }
        },
        filters:{
        },
        methods: {
            //导航标签的点击事件
            goLink(type = ''){
                // alert(type)
                this.$emit(type)
            }
        },
        mounted(){
        },
    }
</script>

<style lang="scss">
.m_footer_view_wrap{
    .weui-tabbar{
        position: fixed;
        background: #fff;
        // z-index: 5400;
        .weui-tabbar__label{
            color: #009EFF;
            font-size:14px;
        }
        .weui-bar__item_on{
            .weui-tabbar__label{
                color: #009EFF;
            }
        }
        .weui-tabbar__item + .weui-tabbar__item{
            position:relative;
            &:before{
                content: " ";
                width: 2px;
                height: 30px;
                position: absolute;
                top: 10px;
                left: 0px;
                background-color: #EDEDED;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.m_footer_view_wrap{
    .demo{

    }
}
</style>