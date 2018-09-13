<template>
    <div>


        <el-tabs v-model="activeName" type="border-card">
            <!--<el-tab-pane name="!警告" label="!警告">-->
                <!--<el-alert :closable="false" type="error"-->
                          <!--title="该demo是tree组件和smarter-input-select组件的组合体，文档请查阅这俩组件"></el-alert>-->
                <!--<el-alert style="margin-bottom:10px;" title="demo文件请查看源码文件夹下的examples" type="warning"-->
                          <!--:closable="false"></el-alert>-->
                <!--<el-alert style="margin-bottom:10px;" title="在集此插件和相关demo之前，请认真阅读软件依赖并正确配置" type="warning"-->
                          <!--:closable="false"></el-alert>-->
                <!--<el-alert style="margin-bottom:10px;" title="所有组件，指令秉承功能优先，样式随后的政策" type="warning"-->
                          <!--:closable="false"></el-alert>-->

                <!--<el-alert style="margin-bottom:10px;" title="根据需求做组件最小化功能，若不够强大后期有需求了可升级" type="warning"-->
                          <!--:closable="false"></el-alert>-->

            <!--</el-tab-pane>-->
            <el-tab-pane name="demo" label="demo">


                <fw-smarter-input-select
                    ref="nbSelect"

                    title="对应客户"
                    :enable-create="false"
                    placeholder="请选择一个客户"
                    :loading="isLoadingThinkData"
                    :value="inputValue"
                    labelKey="label"
                    isShowKey="isShow"
                >
                    <template slot-scope="scope">
                        <div>


                            <fw-smarter-input-select


                                :enable-pagination="false"
                                @inputChange="fetchThinkData"
                                @selectChange="handleThinkDataClick"
                                title="test title"
                                :enable-create="true"
                                placeholder="请输入查询名称"
                                :data="thinkData"
                                :loading="isLoadingThinkData"
                                :value="inputValue"
                                labelKey="label"
                            >
                                <template slot-scope="scope">
                                    <span style="float: left">{{ scope.row.label }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ scope.$index }}</span>
                                </template>

                            </fw-smarter-input-select>

                            <el-button @click="handleQueryClick()" style="float:right;">查询</el-button>

                            <!--<el-row>-->
                                <!--<el-col :span="20">-->

                                    <!---->

                                <!--</el-col>-->
                                <!--<el-col :span="4">-->
                                    <!---->
                                <!--</el-col>-->
                            <!--</el-row>-->
                            <div style="min-height:300px;">
                                <span v-if="isLoadingButtonQueryData">
                                    查询中，请稍后...
                                </span>


                                <ul v-if="!isLoadingButtonQueryData" class="smarter-select-queryed-content el-scrollbar__view el-select-dropdown__list" style="position: relative;">
                                    <!--<div class="resize-triggers">-->
                                    <!--<div class="expand-trigger">-->
                                    <!--<div style="width: 217px; height: 49px;"></div>-->
                                    <!--</div>-->
                                    <!--<div class="contract-trigger"></div>-->
                                    <!--</div>&lt;!&ndash;&ndash;&gt;-->
                                    <li @click="handleQueryLiClick(item,index)"
                                        :key="Math.random()"
                                        v-for="(item,index) in queryedContentData" class="el-select-dropdown__item">

                                        <span style="float: left">{{ item.label }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">{{index }}</span>
                                    </li>
                                </ul>


                            </div>
                        </div>
                    </template>

                </fw-smarter-input-select>


            </el-tab-pane>


            <!--<el-tab-pane label="软件依赖">-->


                <!--依赖于smarter-input-select和smarter-tree所依赖的所有东西-->
            <!--</el-tab-pane>-->
        </el-tabs>


    </div>


</template>
<style lang="less" type="text/less">
.filter-input-wrapper .el-input{
    width:100%;
}
    .smarter-select-queryed-content li:hover{
        bvackground:orange;
    }
</style>
<script>
    export default {
        props: {},
        mounted() {
//            let parseUrl = function (href) {
//                var url = href || location.href
//                var a = document.createElement('a')
//                a.href = url
//                var ret = {},
//                    seg = a.search.replace(/^\?/, '').split('&'),
//                    len = seg.length, i = 0, s
//                for (; i < len; i++) {
//                    if (!seg[i]) {
//                        continue
//                    }
//                    s = seg[i].split('=')
//                    ret[s[0]] = s[1]
//                }
//                return ret
//            }
//            let urlQueryMap = parseUrl()
//            this.activeName = urlQueryMap.tab || '!警告'
//            console.log('urlQueryMap-:', urlQueryMap)
//            console.log("$refs.treeGrid", this.$refs.treeGrid)
            this.constructor.prototype.BX && this.BX.call(this, 'setCurrentVM')
        },
        methods: {
            handleQueryLiClick(item,index){

                this.inputValue=item.label

                this.closePopover()
                console.log('handleQueryLiClick----:',arguments)
            },
            closePopover(){
                try{
                    this.$refs.nbSelect.$el.querySelector('input').click()
                }catch(e){}
            },
            handleQueryClick(){

                this.isLoadingButtonQueryData=true

                setTimeout(()=>{
                    this.queryedContentData = [
                        {
                            label: 'label11111',
                            value: 'value11111111111111',
                            isShow: false
                        }, {
                            label: 'label2222',
                            value: 'value222222222232'
                        }, {
                            label: 'label3333',
                            value: 'value44444'
                        },{
                            label:'asdfsfdsfds',
                            value:'sdfsdfsdfsdf'
                        }
                    ]

                    this.isLoadingButtonQueryData = false
                },500)
            },
            // handleInputChange(val) {
            //     console.log('handleInputChange---:', arguments)
            //     this.inputValue = val
            //     this.fetchThinkData(val)
            // },
            handleThinkDataClick(obj, index) {
                alert('think data clicked')
                // this.inputValue = obj.value
                console.log(" handle select change obj and index:", obj, index)
            },
            fetchThinkData(query) {
                console.log('remote method query:', query)
                query = query.trim()
                if (!query) {
                    return false
                }

                // if(this.isLoadingThinkData==false){
                //
                // }

                this.isLoadingThinkData = true

                // this.BX.s.requestTMS('api/testTimeout')


                setTimeout(() => {

                    this.thinkData = [
                        {
                            label: 'label1',
                            value: 'value1',
                            isShow: false
                        }, {
                            label: 'label2',
                            value: 'value2'
                        }, {
                            label: 'label3',
                            value: 'value3'
                        }
                    ]

                    this.isLoadingThinkData = false
                }, 1000)
            },

        },
        data() {
            return {
                thinkData: [],
                queryedContentData: [],
                isLoadingThinkData: false,
                isLoadingButtonQueryData: false,
                inputValue: '',


                activeName: 'demo'
            }
        },
        computed: {},
        watch: {}
    }
</script>
