<template>
    <div>


        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane name="!警告" label="!警告">
                <el-alert :closable="false" type="error"
                          title="该demo是tree组件和smarter-input-select组件的组合体，文档请查阅这俩组件"></el-alert>
                <el-alert style="margin-bottom:10px;" title="demo文件请查看源码文件夹下的examples" type="warning"
                          :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="在集此插件和相关demo之前，请认真阅读软件依赖并正确配置" type="warning"
                          :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="所有组件，指令秉承功能优先，样式随后的政策" type="warning"
                          :closable="false"></el-alert>

                <el-alert style="margin-bottom:10px;" title="根据需求做组件最小化功能，若不够强大后期有需求了可升级" type="warning"
                          :closable="false"></el-alert>

            </el-tab-pane>
            <el-tab-pane name="demo" label="demo">


                <smarter-tree
                    @mounted="$refs.treeGrid.refreshTreeTable(model)"
                    ref="treeGrid"
                    :disabled-deepth="[1]"
                    :checked-all-childs-when-parent-checked="false"
                    :enable-check="true"
                    :autoExpandCheckedNodes="true"
                    :enableCheckedFolder="true"
                    tree-key="permissionId"
                    prop="orgName" label="选择网点"
                    checked-key="selected"
                    :enable-filter="true"
                    @checkboxClick="confirmOrg"


                >
                </smarter-tree>

                <smarter-tree
                @mounted="$refs.treeGrid1.refreshTreeTable(model)"
                ref="treeGrid1"
                :disabled-deepth="[1]"
                :checked-all-childs-when-parent-checked="false"
                :enable-check="true"
                :autoExpandCheckedNodes="true"
                :enableCheckedFolder="true"
                tree-key="permissionId"
                prop="orgName" label="选择网点"
                checked-key="selected"
                :enable-filter="true"
                @checkboxClick="confirmOrg"


                >
                </smarter-tree>


                <smarter-input-select
                ref="smarterInputSelect1"
                :value="orgName"
                labelKey="label"
                >


                <!--<smarter-tree-->
                <!--@mounted="$refs.treeGrid.refreshTreeTable(model)"-->
                <!--ref="treeGrid"-->
                <!--:disabled-deepth="[1]"-->
                <!--:checked-all-childs-when-parent-checked="false"-->
                <!--:enable-check="true"-->
                <!--:autoExpandCheckedNodes="true"-->
                <!--:enableCheckedFolder="true"-->
                <!--tree-key="permissionId"-->
                <!--prop="orgName" label="选择网点"-->
                <!--checked-key="selected"-->
                <!--:enable-filter="true"-->
                <!--@checkboxClick="confirmOrg"-->


                <!--&gt;-->
                <!--</smarter-tree>-->

                    <smarter-tree
                        @mounted="$refs.treeGrid2.refreshTreeTable(model)"
                        ref="treeGrid2"
                        :checked-all-childs-when-parent-checked="false"
                        :enable-check="true"
                        :autoExpandCheckedNodes="true"
                        :enableCheckedFolder="true"
                        tree-key="permissionId"
                        prop="orgName" label="选择网点"
                        checked-key="selected"
                        :enable-filter="true"
                        @checkboxClick="confirmOrg"


                    >
                    </smarter-tree>
                <!--<el-button @click="logCheckedNodes()">log checked nodes</el-button>-->



                </smarter-input-select>


                <!--<smarter-input-select-->
                <!--ref="smarterInputSelect1"-->
                <!--@inputChange="handleInputChange"-->
                <!--@selectChange="handleSelectChange"-->
                <!--title="点击节点label试试"-->
                <!--:enable-create="false"-->
                <!--placeholder="请选择一个节点"-->
                <!--:data="destinationData"-->
                <!--:loading="isLoadingDestination"-->
                <!--:value="destName"-->
                <!--labelKey="label"-->
                <!--isShowKey="isShow"-->
                <!--&gt;-->
                <!--<template slot-scope="scope">-->
                <!--&lt;!&ndash;:data="model"&ndash;&gt;-->
                <!--<smarter-tree-->

                <!--enable-filter-->
                <!--@mounted="$refs.treeGrid.refreshTreeTable(model)"-->
                <!--@labelClick="handleCheckboxClick"-->
                <!--ref="treeGrid"-->
                <!--tree-key="treeId"-->
                <!--checked-key="selected"-->
                <!--:enable-checked-folder="enableCheckedFolder"-->
                <!--:checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"-->
                <!--:enable-checked-multiple="enableCheckedMultiple"-->
                <!--:auto-expand-checked-nodes="autoExpandCheckedNodes"-->
                <!--:enable-check="enableCheck"-->
                <!--prop="label" label="labelname">-->

                <!--</smarter-tree>-->

                <!--<el-button @click="$refs.smarterInputSelect1.hidePopOver()">hidePopOver</el-button>-->
                <!--</template>-->

                <!--</smarter-input-select>-->


                <el-table v-if="1==2" :data="virutalModel" is-virtual-tree border>
                    <tree-grid
                        is-virtual-tree
                        checked-key="selected"
                        tree-key="treeId"
                        :checked-all-childs-when-parent-checked="false"
                        :enable-check="true"
                        :enableCheckedFolder="true"

                        prop="label" label="labelname"></tree-grid>
                    <el-table-column label="description & path" width="180">
                        <template slot-scope="scope">
                            {{scope.row.description}}<br>
                            {{scope.row.$extra.path}}
                        </template>
                    </el-table-column>
                    <el-table-column label="additional checkbox demo">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.testBool">{{scope.row.testBool?'选中了':'没选中'}}</el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="index">
                        <template slot-scope="scope">
                            {{scope.$index}}
                        </template>
                    </el-table-column>
                    <el-table-column label="deepth" prop="$extra.deepth"></el-table-column>
                    <el-table-column label="treeKey" prop="treeId"></el-table-column>
                    <el-table-column label="childsNum" prop="$extra.childsNum"></el-table-column>
                    <el-table-column label="parentId" prop="$extra.parentId"></el-table-column>

                    <el-table-column label="hasChildren">
                        <template slot-scope="scope">{{scope.row.$extra.hasChildren?'yes':'no'}}</template>
                    </el-table-column>
                    <el-table-column label="expanded">
                        <template slot-scope="scope">{{scope.row.$extra.expanded?'yes':'no'}}</template>
                    </el-table-column>
                    <el-table-column label="checked?">
                        <template slot-scope="scope">{{scope.row.checked?'yes':'no'}}</template>
                    </el-table-column>
                    <el-table-column label="indeterminate?">
                        <template slot-scope="scope">{{scope.row.$extra.indeterminate?'yes':'no'}}</template>
                    </el-table-column>


                </el-table>


            </el-tab-pane>


            <!--<el-tab-pane label="软件依赖">-->


            <!--依赖于smarter-input-select和smarter-tree所依赖的所有东西-->
            <!--</el-tab-pane>-->
        </el-tabs>


    </div>


</template>
<style lang="less" type="text/less">

</style>
<script>
    import util from '../../util'
    export default {
        props: {},
        mounted() {
            let parseUrl = function (href) {
                var url = href || location.href
                var a = document.createElement('a')
                a.href = url
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length, i = 0, s
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue
                    }
                    s = seg[i].split('=')
                    ret[s[0]] = s[1]
                }
                return ret
            }
            let urlQueryMap = parseUrl()
            this.activeName = urlQueryMap.tab || '!警告'
            console.log('urlQueryMap-:', urlQueryMap)
            console.log("$refs.treeGrid", this.$refs.treeGrid)
            this.constructor.prototype.BX && this.BX.call(this, 'setCurrentVM')
        },
        methods: {
            confirmOrg() {

            },
            updateVirtualTreeMethod() {
                this.virutalModel = BX.u.copy(this.$refs.treeGrid.getVirtualTreeNodes())
            },
            logCheckedNodes() {
                console.log('this.$refs.treeGrid.getCheckedNodes()', this.$refs.treeGrid.getCheckedNodes())
            },
            handleInputChange(val) {
                console.log('handleInputChange---:', arguments)
                this.destName = val
                this.destinationRemoteMethod(val)
            },
            handleSelectChange(obj, index) {
                this.destName = obj.value
                console.log(" handle select change obj and index:", obj, index)
            },
            destinationRemoteMethod(query) {
                console.log('remote method query:', query)
                query = query.trim()
                if (!query) {
                    return false
                }

                // if(this.isLoadingDestination==false){
                //
                // }

                this.isLoadingDestination = true

                // this.BX.s.requestTMS('api/testTimeout')


                setTimeout(() => {

                    this.destinationData = [
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

                    this.isLoadingDestination = false
                }, 1000)
            },
            handleCheckboxClick(node) {


//                this.destName = arguments[0].label
//                console.log('handle label click args:', arguments)
//                this.$refs.smarterInputSelect1.hidePopOver()
                this.orgName = this.$refs.treeGrid.getCheckedNodes(true, (row) => {
                    return row.companyName
                }).join(',')

//                this.orgName=node.companyName
            },
        },
        data() {
            return {
                util:util,
                disabledDeepth: [1],
                virutalModel: [],
                orgName: '',
                destinationData: [],
                isLoadingDestination: false,
                destName: '',
                checkedAllChildsWhenParentChecked: true,
                enableCheckedMultiple: true,
                enableCheckedFolder: true,
                autoExpandCheckedNodes: true,
                enableCheck: true,
                model:
                    [{
                        "permissionId": 118,
                        "orgCode": "YWDY000000009",
                        "orgName": "德邦物流",
                        "childOrgs": [{
                            "permissionId": 119,
                            "orgCode": "YWDY000000010",
                            "orgName": "北京网点",
                            "childOrgs": [{
                                "permissionId": 120,
                                "orgCode": "YWDY000000011",
                                "orgName": "回龙观网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }, {
                                "permissionId": 121,
                                "orgCode": "YWDY000000012",
                                "orgName": "西二旗网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }],
                            "currentOrg": "1",
                            "children": [{
                                "permissionId": 120,
                                "orgCode": "YWDY000000011",
                                "orgName": "回龙观网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }, {
                                "permissionId": 121,
                                "orgCode": "YWDY000000012",
                                "orgName": "西二旗网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }],
                            "selected": true
                        }, {
                            "permissionId": 130,
                            "orgCode": "YWDY000000020",
                            "orgName": "郑州网点",
                            "childOrgs": [{
                                "permissionId": 131,
                                "orgCode": "YWDY000000021",
                                "orgName": "金明网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }, {
                                "permissionId": 132,
                                "orgCode": "YWDY000000022",
                                "orgName": "龙湖网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }],
                            "currentOrg": "0",
                            "children": [{
                                "permissionId": 131,
                                "orgCode": "YWDY000000021",
                                "orgName": "金明网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }, {
                                "permissionId": 132,
                                "orgCode": "YWDY000000022",
                                "orgName": "龙湖网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }],
                            "selected": false
                        }],
                        "currentOrg": "0",
                        "children": [{
                            "permissionId": 119,
                            "orgCode": "YWDY000000010",
                            "orgName": "北京网点",
                            "childOrgs": [{
                                "permissionId": 120,
                                "orgCode": "YWDY000000011",
                                "orgName": "回龙观网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }, {
                                "permissionId": 121,
                                "orgCode": "YWDY000000012",
                                "orgName": "西二旗网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }],
                            "currentOrg": "1",
                            "children": [{
                                "permissionId": 120,
                                "orgCode": "YWDY000000011",
                                "orgName": "回龙观网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }, {
                                "permissionId": 121,
                                "orgCode": "YWDY000000012",
                                "orgName": "西二旗网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }],
                            "selected": true
                        }, {
                            "permissionId": 130,
                            "orgCode": "YWDY000000020",
                            "orgName": "郑州网点",
                            "childOrgs": [{
                                "permissionId": 131,
                                "orgCode": "YWDY000000021",
                                "orgName": "金明网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }, {
                                "permissionId": 132,
                                "orgCode": "YWDY000000022",
                                "orgName": "龙湖网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }],
                            "currentOrg": "0",
                            "children": [{
                                "permissionId": 131,
                                "orgCode": "YWDY000000021",
                                "orgName": "金明网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }, {
                                "permissionId": 132,
                                "orgCode": "YWDY000000022",
                                "orgName": "龙湖网点",
                                "childOrgs": [],
                                "currentOrg": "0"
                            }],
                            "selected": false
                        }],
                        "selected": false
                    }]

//                    [{
//                        "companyId": "1",
//                        disabled:true,
//                        "companyName": "科通集团物流有很公司",
//                        "branchCompanys": [{
//                            "companyId": "2",
//                            "dots": [{"dotId": 3, "dotName": "海淀网点", "label": "海淀网点", "treeId": 3}, {
//                                "dotId": 4,
//                                "dotName": "朝阳网点",
//                                "label": "朝阳网点",
//                                "treeId": 4
//                            }],
//                            "companyName": "北京分拨中心",
//                            "label": "北京分拨中心",
//                            "treeId": "2",
//                            "children": [{"dotId": 3, "dotName": "海淀网点", "label": "海淀网点", "treeId": 3}, {
//                                "dotId": 4,
//                                "dotName": "朝阳网点",
//                                "label": "朝阳网点",
//                                "treeId": 4
//                            }]
//                        }, {
//                            "companyId": "3",
//                            "dots": [{"dotId": 6, "dotName": "上海网点二", "label": "上海网点二", "treeId": 6}, {}],
//                            "companyName": "上海分拨中心",
//                            "label": "上海分拨中心",
//                            "treeId": "3",
//                            "children": [{"dotId": 6, "dotName": "上海网点二", "label": "上海网点二", "treeId": 6}, {}]
//                        }],
//                        "label": "科通集团物流有很公司",
//                        "treeId": "1",
//                        "children": [{
//                            "companyId": "2",
//                            "dots": [{"dotId": 3, "dotName": "海淀网点", "label": "海淀网点", "treeId": 3}, {
//                                "dotId": 4,
//                                "dotName": "朝阳网点",
//                                "label": "朝阳网点",
//                                "treeId": 4
//                            }],
//                            "companyName": "北京分拨中心",
//                            "label": "北京分拨中心",
//                            "treeId": "2",
//                            // "children": [{"dotId": 3, "dotName": "海淀网点", "label": "海淀网点", "treeId": 3}, {
//                            //     "dotId": 4,
//                            //     "dotName": "朝阳网点",
//                            //     "label": "朝阳网点",
//                            //     "treeId": 4
//                            // }]
//                        }, {
//                            "companyId": "3",
//                            "dots": [{"dotId": 6, "dotName": "上海网点二", "label": "上海网点二", "treeId": 6}, {}],
//                            "companyName": "上海分拨中心",
//                            "label": "上海分拨中心",
//                            "treeId": "3",
//                            // "children": [{"dotId": 6, "dotName": "上海网点二", "label": "上海网点二", "treeId": 6}, {}]
//                        }]
//                    }]
                ,


                //     [{
                //
                //     "treeId": 1,
                //     "label": "System",
                //     "selected":false,"url":null,testBool:true,
                //     "description": "System Manager",
                //     "children": [{
                //         "treeId": 2,
                //         "label": "base",
                //         "selected":false,"url":null,testBool:true,
                //         "description": "Base Manager",
                //         "children": [{
                //             "treeId": 3,
                //
                //             "label": "Menus",
                //             "selected":false,"url":"/menus",
                //             "description": "menu manager",
                //             "children":[{
                //                 "treeId": 17,
                //                 "label": "Menus17-test",
                //                 "selected":false,"url":"/menus17",
                //                 "description": "menu manager17",
                //             }]
                //         }, {
                //             "treeId": 4,
                //             "label": "Rolessssssss",
                //             "selected":false,"url":"/roles",
                //             "description": "Role Manager",
                //         }, {
                //             "treeId": 5,
                //             "label": "Userssssss",
                //             "selected":true,"url":"/users",
                //             "description": "User Manager",
                //         }]
                //     }]
                // }, {
                //     "treeId": 6,
                //     "label": "Customs",
                //     "selected":false,"url":null,testBool:true,
                //     "description": "Custom Manager",
                //     "children": [{
                //         "treeId": 7,
                //         "label": "CustomList-test",
                //         "selected":false,"url":"/customs",
                //         "description": "CustomList",
                //     }]
                // }, {
                //     "treeId": 8,
                //     "label": "Templates",
                //     "selected":true,"url":null,testBool:true,
                //     "description": "Template Manager",
                //     "children": [{
                //         "treeId": 9,
                //         "label": "TemplateList",
                //         "selected":true,"url":"/doc_templates",
                //         "description": "Template Manager",
                //     }]
                // }, {
                //     "treeId": 10,
                //     "label": "Bussiness",
                //     "selected":true,"url":null,testBool:true,
                //     "description": "Bussiness Manager",
                //     "children": [{
                //         "treeId": 11,
                //         "label": "BussinessList",
                //         "selected":true,"url":null,testBool:true,
                //         "description": "BussinessList",
                //         "children": [{
                //             "treeId": 12,
                //             "label": "Currenciesssssssss",
                //             "selected":true,"url":"/currencies",
                //             "description": "Currencies",
                //         }, {
                //             "treeId": 13,
                //             "label": "Dealtypesaaaaaaa",
                //             "selected":true,"url":"/dealtypes",
                //             "description": "Dealtypes",
                //         }]
                //     }, {
                //         "treeId": 14,
                //         "label": "Products",
                //         "selected":true,"url":null,testBool:true,
                //         "description": "Products",
                //         "children": [{
                //             "treeId": 15,
                //             "label": "ProductTypes",
                //             "selected":true,"url":"/productTypes",
                //             "description": "ProductTypes",
                //         }, {
                //             "treeId": 16,
                //             "label": "ProductList",
                //             "selected":true,"url":"/products",
                //             "description": "ProductList",
                //         }]
                //     }]
                // }],
                activeName: '!警告'
            }
        },
        computed: {},
        watch: {}
    }
</script>
