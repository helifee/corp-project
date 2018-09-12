<template>
    <div class="m_list_view_wrap">
        <group title="">
          <cell v-for="(item,index) in data" :key="index" :title="item.taskName">
            <div class="list_icon" slot="icon" :style="{'background-color': color }">
                <icon  name="m_task_list" scale="1.5"></icon>
            </div>
            <div class="list_desc" slot="inline-desc">
                <p>负责人：{{item.taskLiableName}}</p>
                <!-- <p>项目进度：{{item.taskProgress}}</p> -->
                <p>到期日：{{ item.endDate | formatEendDateByMoment }}</p>
            </div>
            <div class="list_right" solt="value">
                <span class="state">
                    {{item.taskStatus | state}}
                </span>
                <span class="concerned" @click="setTaskFollow(index, item)">
                    <x-icon class="orange" type="ios-star" size="22" v-if="item.isfollow"></x-icon>
                    <x-icon class="orange" type="ios-star-outline" size="22" v-else="item.isfollow"></x-icon>
                </span>
            </div>
          </cell>
        </group>
    </div>
</template>
<script>
    import moment from 'moment'
    import { Group, Cell, XButton, Swiper, SwiperItem, Scroller, LoadMore, AlertModule, } from 'vux'
    export default {
        name:"listView",
        components: {
          Group,
          Cell,
          XButton,
          Swiper,
          SwiperItem,
          Scroller,
          LoadMore,
        },
        props: {
            //来自于哪个栏目
            moduleName: {
                type: String,
                default:'task'
            },
            data:{
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
            state (value){
                //任务状态 ：0未完成、1已完成、2已关闭、3超期
                switch (value) {
                    case '0':
                        return '未完成';
                    case '1':
                        return '已完成';
                    case '2':
                        return '已关闭';
                    case '3':
                        return '超期';
                    default:
                        return '--';
                }
            },
            formatEendDateByMoment (value){
                return moment(value).format("YYYY-MM-DD")
            },
        },
        methods: {
            //关注任务
            async setTaskFollow(index,row){
                this.$emit('setTaskFollow',row)
            },
        },
        mounted(){
        },
    }
</script>

<style lang="scss">
.m_list_view_wrap{
    .weui-cells{
        margin-top:0px;
        .weui-cell{
            padding: 12px 15px 18px 15px;
            .vux-cell-bd.vux-cell-primary{
                width:calc(100% - 50px - 70px)
            }
            .vux-label{
                width:auto;
                height:30px;
                line-height:30px;
                color:#191919;
                font-size:15px;
                display:block;
                overflow:hidden;
                white-space:nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.m_list_view_wrap{
    .demo{
        line-height:96px;
        height:96px;
    }
    .list_desc{
        line-height:18px;
        color:#999;
        font-size: 12px;
        p{
            width:100%;
            height:18px;
            display:block;
            overflow:hidden;
            white-space:nowrap;
            text-overflow: ellipsis;
        }
    }
    .list_icon{
        width:30px;
        height:30px;
        line-height:30px;
        text-align:center;
        background-color:#0ABF86;
        color:#fff;
        border-radius:50%;
        margin-right:20px;
        position: relative;
        svg{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .list_right{
        width:70px;
        height:22px;
        line-height:22px;
        text-align:left;
        position: relative;
        .state{
            font-size:12px;
            position: absolute;
            top: 50%;
            left: 0px;
            transform: translateY(-50%);
        }
        .concerned{
            width:22px;
            position: absolute;
            top: 50%;
            right: 0px;
            transform: translateY(-50%);
            svg{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .orange{
                fill: #F9A82E;
            }
        }
    }
}
</style>