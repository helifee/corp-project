<template>
    <div class="m_view_wrap">
        <!--页面其他内容，详情什么的-->
        <div style="height:100px;background-color:red">
            www
        </div>


        <!--评论组件调用-->
        <!-- 参数说明如下：
            ref：固定样式，不用改
            businessId：业务id，具体的文章id
            commentUserId：//被评论人id，即业务组件的创建人id
            businessType：//业务分类，具体模块问后端开发人员，例如“0”是任务模块
            startCommentSwitch：boolean类型，是否开启评论的开关（或者直接去底部导航栏里footerList中的评论标签即可）
            dialogVisible：//默认是否显示评论输入框

            smartComment：显示评论输入框的事件，固定样式，不用改
            changeCommentVisible：关闭评论输入框的事件，固定样式，不用改
        -->
        <smart-comment-view
            ref="smartCommentView"
            :businessId="taskId"
            :commentUserId = 'taskLiableId'
            businessType="0"
            :startCommentSwitch = " fromPage !== 'set' "
            :dialogVisible="dialogVisible"
            @smartComment="smartComment"
            @changeCommentVisible="changeCommentVisible">
        </smart-comment-view>

        <!--底部导航栏组件调用-->
        <footer-view
            :footerList = "footerList"
            @create = "create"
            @smartComment="smartComment">
        </footer-view>



    </div>
</template>
<script>
    // import { XInput, Group,  } from 'vux'


    /*底部导航栏（操作）组件-局部引入*/
    import footerView from '@mobile/components/m_public/m_footer.vue'

    /*评论组件-局部引入*/
    import smartCommentView from '@mobile/components/m_smartComment/m_smartView.vue'
    

    export default {
        name:"listView",
        components: {
          // XInput,
          // Group,
          footerView,
          smartCommentView,
        },
        props: {
            //来自于哪个栏目
            fromPage: {
                type: String,
                default:'task'
            },
        },
        data () {
            return {
                footerList:[{
                  name:'创建任务',
                  value:'create',
                },{
                  name:'评论',
                  value:'smartComment',
                }],//底部固定导航栏

                dialogVisible:false,//是否显示评论输入框

                taskId:'350a4d2908934d17b95052c6abc2834d',
                taskLiableId:'100207',
            }
        },
        filters:{
        },
        methods: {
            //显示评论输入框，userId被评论人id（评论组件回调用的，直接拷贝粘贴即可）
            smartComment( userId = '' ){
                this.dialogVisible = true
                this.$nextTick(function(){
                    this.$refs.smartCommentView.focusAuto( userId )
                    this.dialogVisible = true
                })
            },
            //子组件回调，评论输入框的事件（评论组件回调用的，直接拷贝粘贴即可）
            changeCommentVisible:function(type = ''){
                this.dialogVisible = false
            },


            //创建任务，底部导航栏的回调方法，创建任务
            create(){
                alert('创建任务')
            },

            
        },
        mounted(){
            

        },
    }
</script>

<style lang="scss">
.m_view_wrap{
    
}
</style>
<style lang="scss" scoped>
.m_view_wrap{
    overflow-y: auto;
}
</style>