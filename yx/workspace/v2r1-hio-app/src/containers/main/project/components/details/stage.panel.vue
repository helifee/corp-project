<template>
    <div class="stagePanel" v-show="!isStageDetail">

        <el-row :gutter="24">
            <el-col :span="6">
                <div @click="stageDetail"  class="content">
                    <div class="up">
                        <p>招</p>
                    </div>
                    <div class="down">
                        <h5>招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段</h5>
                        <span class="task-number">（8）</span>
                        <p>一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段</p>
                        <div class="members">
                            <span><icon name="members" scale = "1.2" style="color:#46A7FF" ></icon></span>&nbsp;9
                        </div>
                        <span class="time">2018/02/30-2018/02/30</span>
                        <div class="operation">
                            <span class="el-icon-edit"  @click.stop="showEditStageDialog" style="color:#46A7FF"></span>
                            <span class="el-icon-close" @click.stop="stageDel" style="color: red"></span>
                        </div>
                    </div>
                </div >
            </el-col>
            <el-col :span="6">
                <div @click="stageDetail"  class="content">
                    <div class="up">
                        <p>招</p>
                    </div>
                    <div class="down">
                        <h5>招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段</h5>
                        <span class="task-number">（8）</span>
                        <p>一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段</p>
                        <div class="members">
                            <span><icon name="members" scale = "1.2" style="color:#46A7FF" ></icon></span>&nbsp;9
                        </div>
                        <span class="time">2018/02/30-2018/02/30</span>
                        <div class="operation">
                            <span class="el-icon-edit"  @click.stop="showEditStageDialog" style="color:#46A7FF"></span>
                            <span class="el-icon-close" @click.stop="stageDel" style="color: red"></span>
                        </div>
                    </div>
                </div >
            </el-col>
            <el-col :span="6">
                <div @click="stageDetail"  class="content">
                    <div class="up">
                        <p>招</p>
                    </div>
                    <div class="down">
                        <h5>招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段</h5>
                        <span class="task-number">（8）</span>
                        <p>一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段</p>
                        <div class="members">
                            <span><icon name="members" scale = "1.2" style="color:#46A7FF" ></icon></span>&nbsp;9
                        </div>
                        <span class="time">2018/02/30-2018/02/30</span>
                        <div class="operation">
                            <span class="el-icon-edit"  @click.stop="showEditStageDialog" style="color:#46A7FF"></span>
                            <span class="el-icon-close" @click.stop="stageDel" style="color: red"></span>
                        </div>
                    </div>
                </div >
            </el-col>
            <el-col :span="6">
                <div @click="stageDetail"  class="content">
                    <div class="up">
                        <p>招</p>
                    </div>
                    <div class="down">
                        <h5>招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段</h5>
                        <span class="task-number">（8）</span>
                        <p>一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段</p>
                        <div class="members">
                            <span><icon name="members" scale = "1.2" style="color:#46A7FF" ></icon></span>&nbsp;9
                        </div>
                        <span class="time">2018/02/30-2018/02/30</span>
                        <div class="operation">
                            <span class="el-icon-edit"  @click.stop="showEditStageDialog" style="color:#46A7FF"></span>
                            <span class="el-icon-close" @click.stop="stageDel" style="color: red"></span>
                        </div>
                    </div>
                </div >
            </el-col>
            <el-col :span="6">
                <div @click="stageDetail"  class="content">
                    <div class="up">
                        <p>招</p>
                    </div>
                    <div class="down">
                        <h5>招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段</h5>
                        <span class="task-number">（8）</span>
                        <p>一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段</p>
                        <div class="members">
                            <span><icon name="members" scale = "1.2" style="color:#46A7FF" ></icon></span>&nbsp;9
                        </div>
                        <span class="time">2018/02/30-2018/02/30</span>
                        <div class="operation">
                            <span class="el-icon-edit"  @click.stop="showEditStageDialog" style="color:#46A7FF"></span>
                            <span class="el-icon-close" @click.stop="stageDel" style="color: red"></span>
                        </div>
                    </div>
                </div >
            </el-col>
            <el-col :span="6">
                <div @click="stageDetail"  class="content">
                    <div class="up">
                        <p>招</p>
                    </div>
                    <div class="down">
                        <h5>招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段</h5>
                        <span class="task-number">（8）</span>
                        <p>一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段</p>
                        <div class="members">
                            <span><icon name="members" scale = "1.2" style="color:#46A7FF" ></icon></span>&nbsp;9
                        </div>
                        <span class="time">2018/02/30-2018/02/30</span>
                        <div class="operation">
                            <span class="el-icon-edit"  @click.stop="showEditStageDialog" style="color:#46A7FF"></span>
                            <span class="el-icon-close" @click.stop="stageDel" style="color: red"></span>
                        </div>
                    </div>
                </div >
            </el-col>
            <el-col :span="6">
                <div @click="stageDetail"  class="content">
                    <div class="up">
                        <p>招</p>
                    </div>
                    <div class="down">
                        <h5>招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段</h5>
                        <span class="task-number">（8）</span>
                        <p>一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段</p>
                        <div class="members">
                            <span><icon name="members" scale = "1.2" style="color:#46A7FF" ></icon></span>&nbsp;9
                        </div>
                        <span class="time">2018/02/30-2018/02/30</span>
                        <div class="operation">
                            <span class="el-icon-edit"  @click.stop="showEditStageDialog" style="color:#46A7FF"></span>
                            <span class="el-icon-close" @click.stop="stageDel" style="color: red"></span>
                        </div>
                    </div>
                </div >
            </el-col>
            <el-col :span="6">
                <div @click="stageDetail"  class="content">
                    <div class="up">
                        <p>招</p>
                    </div>
                    <div class="down">
                        <h5>招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段</h5>
                        <span class="task-number">（8）</span>
                        <p>一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段</p>
                        <div class="members">
                            <span><icon name="members" scale = "1.2" style="color:#46A7FF" ></icon></span>&nbsp;9
                        </div>
                        <span class="time">2018/02/30-2018/02/30</span>
                        <div class="operation">
                            <span class="el-icon-edit"  @click.stop="showEditStageDialog" style="color:#46A7FF"></span>
                            <span class="el-icon-close" @click.stop="stageDel" style="color: red"></span>
                        </div>
                    </div>
                </div >
            </el-col>
            <el-col :span="6">
                <div @click="stageDetail"  class="content">
                    <div class="up">
                        <p>招</p>
                    </div>
                    <div class="down">
                        <h5>招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段招标阶段</h5>
                        <span class="task-number">（8）</span>
                        <p>一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段一句话描述该阶段</p>
                        <div class="members">
                            <span><icon name="members" scale = "1.2" style="color:#46A7FF" ></icon></span>&nbsp;9
                        </div>
                        <span class="time">2018/02/30-2018/02/30</span>
                        <div class="operation">
                            <span class="el-icon-edit"  @click.stop="showEditStageDialog" style="color:#46A7FF"></span>
                            <span class="el-icon-close" @click.stop="stageDel" style="color: red"></span>
                        </div>
                    </div>
                </div >
            </el-col>

            <el-col :span="6">
                <div class="empty" @click="showCreatStageDialog">
                    <p>+创建阶段</p>
                </div>
            </el-col>
        </el-row>

        <el-button type=""  @click="" style="">加载更多</el-button>

    </div>
</template>
<script>

    export default {
        components: {

        },
        props: {
            stageList:{
                type:Array,
                required:false
            },
            isStageDetail:{
                type:Boolean,
                required:true
            }
        },
        data() {
            return {
            }
        },
        computed: {

        },
        filters:{
        },
        methods: {
            //创建阶段
            showCreatStageDialog(){
                this.$emit("showCreatStageDialog");
            },
            //编辑阶段
            showEditStageDialog(id){
                this.$emit("showEditStageDialog",id);
            },
            //删除阶段
            stageDel (){

                this.$confirm('删除该阶段, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //阶段详情
            stageDetail(id){
                this.$emit("stageDetail",id);
            }

        },
        watch: {
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    /*阶段*/
    .stagePanel{
        padding-top: 10px;
        text-align: center;
        .empty{
            width: 100%;
            min-width: 248px;
            height: 174px;
            border: 1px solid $theme-grey-input-border;
            box-sizing: border-box;
            border-radius: 3px;
            p{
                color: $theme-black-other;
                font-size: 12px;
                line-height: 174px;
                text-align: center;
                margin: 0;
                padding: 0;
                cursor: pointer;
            }
        }
        .empty:hover{
            border-color: $theme-blue;
            p{
                color: $theme-blue;
            }
        }
        .content{
            width: 100%;
            min-width: 248px;
            box-sizing: border-box;
            height: 174px;
            border: 1px solid #dddddd;
            border-radius: 3px;
            margin-bottom: 22px;
            position: relative;
            .up{
                height: 48px;
                line-height: 48px;
                background: $theme-blue-header;
                p{
                    font-size: 24px;
                    padding-left:16px;
                    color: $theme-blue;
                    margin: 0;
                    text-align: left;
                }
            }
            .down{
                h5{
                    color: $theme-black-title;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 42px;
                    text-align: left;
                    margin: 0;
                    padding: 0 0px 0  16px;
                    width: 60%;
                    box-sizing: border-box;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    float: left;
                }
                .task-number{

                    line-height: 42px;
                    text-align: left;
                    float: left;
                }
                p{
                    font-size: 12px;
                    color: $theme-grey-toast;
                    text-align: left;
                    padding: 0 16px;
                    margin: 0;
                    width: 80%;
                    box-sizing: border-box;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .members{
                    position: absolute;
                    right: 16px;
                    bottom: 36px;
                    color: $theme-blue;
                }
                .time{
                    position: absolute;
                    right: 16px;
                    bottom: 16px;
                    font-size: 12px;
                    color: $theme-black-other;
                }
                .operation{
                    /*display: none;*/
                    font-size: 24px;
                    position: absolute;
                    right: 16px;
                    bottom:88px;
                }
                /*&:hover{*/
                /*.operation{*/
                /*display: block;*/
                /*}*/
                /*}*/

            }
        }
        .content:hover{
            border-color: $theme-blue;
            .up{
                background-color: $theme-blue;
                p{
                    color: #ffffff;
                }
            }
        }
    }
</style>
