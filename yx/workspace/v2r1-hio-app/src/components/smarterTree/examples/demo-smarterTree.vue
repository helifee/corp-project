<template>
    <div>




        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane name="!警告" label="!警告">
                <el-alert style="margin-bottom:10px;" title="demo文件请查看源码文件夹下的examples" type="warning" :closable="false"></el-alert>

                <el-alert style="margin-bottom:10px;" title="在集此插件和相关demo之前，请认真阅读软件依赖并正确配置" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="插件依赖于el-table，请务必保证el-table中data是嵌套结构的数据" type="error" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="暂不支持异步远程加载数信息（基于需求要求的灵活度，实现此功能将会非常复杂）；后续有需求再考虑" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="若想支持勾选，请务必确保渲染tree table挂载前checked属性已存在且开启enable-check" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="父节点数据和子组件表格数据未建立起双向绑定关系，若建立，则开发难度非常大，
                甚至不一定能实现;初始数据仅作为tree table入口数据，后续所有需要访问的数据（例如源数据中可能变化的数据）
                请务必以getCheckedNodes getAllNodes方法获取的为准" type="error" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="由于性能 技术 实现难度等各种考量，源数据 视图树 虚拟树三者无法建立起相互
双向绑定关系，若您的业务数据中存在非只读的值，请确保值变化后手动调用updateRows方法更新相关状态;
例如：" type="error" :closable="false">
                    <pre>
                        @change = "$refs.treeGrid.updateRows([scope.row],['testBool'])"

                    </pre>
                </el-alert>
                <el-alert style="margin-bottom:10px;" title="根据需求做组件最小化功能，若不够强大后期有需求了可升级" type="warning" :closable="false"></el-alert>

            </el-tab-pane>
            <el-tab-pane name="demo" label="demo">


                <!--<el-input placeholder="输入文字搜索tree中内容" v-model="searchStr" type="search" @change="handleSearchChange()"></el-input>-->


                <div style="width:80%;">

                    <!--<smarter-input-select-->
                        <!--placeholder="选择单据网点"-->
                        <!--ref="smarterInputSelect1"-->
                        <!--:value="1"-->
                        <!--labelKey="label"-->

                    <!--&gt;-->
                        <smarter-tree
                            checked-key="selected"
                            :disabled-deepth="[1]"
                            @mounted="$refs.treeGrid.refreshTreeTable(lianHangData)"
                            ref="treeGrid"
                            expand-all
                            :checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"
                            :enable-check="enableCheck"
                            :enableCheckedFolder="enableCheckedFolder"
                            tree-key="permissionId"
                            prop="orgName" label="选择网点"
                        >
                            <template slot-scope="scope">
                                <span style="margin-left:30px;">
                                    path:{{scope.row.$extra.path}}
                                </span>
                            </template>

                        </smarter-tree>

                    <el-button @click="log($refs.treeGrid.getAllNodes())">console.log所有节点(包括未选中)</el-button>
                    <el-button @click="enableCheck=!enableCheck">toggle enableCheck</el-button>
                    <el-button @click="insertChildsTest()">为第三行插入几个孩子</el-button>
                    <!--</smarter-input-select>-->




                    <!--<smarter-tree-->
                        <!--:enable-filter="true"-->
                        <!--:enable-path="false"-->
                        <!--@labelClick="handleLabelClick"-->
                        <!--ref="treeGrid"-->
                        <!--tree-key="treeId"-->
                        <!--checked-key="selected"-->
                        <!--:enable-checked-folder="enableCheckedFolder"-->
                        <!--:update-virtual-tree-method="updateVirtualTreeMethod"-->
                        <!--:checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"-->
                        <!--:enable-checked-multiple="true"-->
                        <!--:auto-expand-checked-nodes="autoExpandCheckedNodes"-->
                        <!--:enable-check="enableCheck"-->
                        <!--prop="label" label="labelname">-->

                    <!--</smarter-tree>-->
                </div>


                <el-alert title="注意:本组件支持多种布尔类型配置，两两组合可产生非常多的配置结果，
                短期内根本无法对所有配置情况进行严格测试所以可能有bug请大家多多理解。
                以下按钮仅提供一些效果预览不保证属性变更后完全正常运行。但能保证的是初始数据配置完毕后正常运行" :closable="false" type="warning"></el-alert>

                <el-button @click="refreshDataTest()">渲染数据</el-button>
                <!--<el-button @click="enableCheckedFolder=!enableCheckedFolder">toggle是否允许选中文件夹(当前值:{{enableCheckedFolder}})</el-button>-->
                <!--<el-button @click="checkedAllChildsWhenParentChecked=!checkedAllChildsWhenParentChecked">toggle是否勾选父组件时选中所有子组件(当前值:{{checkedAllChildsWhenParentChecked}})</el-button>-->
                <!--<el-button @click="enableCheckedMultiple=!enableCheckedMultiple">toggle是否允许多选(当前值:{{enableCheckedMultiple}})</el-button>-->
                <!--<el-button @click="autoExpandCheckedNodes=!autoExpandCheckedNodes">toggle自动展开选中的节点(当前值:{{autoExpandCheckedNodes}})</el-button>-->
                <!--<el-button @click="$refs.treeGrid.expandAllNodes()">展开所有节点</el-button>-->
                <!--<el-button @click="log($refs.treeGrid.getAllNodes())">console.log所有节点(包括未选中)</el-button>-->
                <!--<el-button @click="log($refs.treeGrid.getCheckedNodes())">console.log所有选中节点</el-button>-->
                <!--<el-button @click="enableCheck=!enableCheck">toggle开启勾选(当前值:{{enableCheck}})</el-button>-->

                <!--checkedAllChildsWhenParentChecked:true,-->
                <!--enableCheckedMultiple:true,-->
                <!--autoExpandCheckedNodes:true,-->
                <!--enableCheck:true,-->

                <el-alert title="demo到此结束，只保证此处以上代码能跑" :closable="false" type="warning"></el-alert>

                数据调试：
                <el-table v-if="$refs.treeGrid&&$refs.treeGrid.$refs.smarterTree"
                          :data="$refs.treeGrid.$refs.smarterTree.store.states._data">
                    <el-table-column label="path"   width="180">
                        <template slot-scope="scope">
                            {{scope.row.$extra.path}}
                        </template>
                    </el-table-column>
                    <!--<el-table-column label="additional checkbox demo">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-checkbox @change="$refs.treeGrid.updateRows([scope.row],['testBool'])" v-model="scope.row.testBool">{{scope.row.testBool?'选中了':'没选中'}}</el-checkbox>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column label="index">
                        <template slot-scope="scope">
                            {{scope.$index}}
                        </template>
                    </el-table-column>
                    <el-table-column label="deepth" prop="$extra.deepth"></el-table-column>
                    <el-table-column label="treeKey" prop="permissionId"></el-table-column>
                    <el-table-column label="childsNum" prop="$extra.childsNum"></el-table-column>
                    <el-table-column label="parentId" prop="$extra.parentId"></el-table-column>
                    <el-table-column label="ancestorId" prop="$extra.ancestorId"></el-table-column>
                    <!--<el-table-column label="disabled?" prop="$extra.disabled"></el-table-column>-->
                    <el-table-column label="idPath?" prop="$extra.idPath"></el-table-column>

                    <el-table-column label="disabled?">
                        <template slot-scope="scope">{{scope.row.$extra.disabled?'yes':'no'}}</template>
                    </el-table-column>
                    <el-table-column label="hasChildren">
                        <template slot-scope="scope">{{scope.row.$extra.hasChildren?'yes':'no'}}</template>
                    </el-table-column>
                    <el-table-column label="expanded">
                        <template slot-scope="scope">{{scope.row.$extra.expanded?'yes':'no'}}</template>
                    </el-table-column>
                    <el-table-column label="checked?">
                        <template slot-scope="scope">{{scope.row.selected?'yes':'no'}}</template>
                    </el-table-column>
                    <el-table-column label="indeterminate?">
                        <template slot-scope="scope">{{scope.row.$extra.indeterminate?'yes':'no'}}</template>
                    </el-table-column>

                </el-table>


                <el-button @click="updateVirtualTreeMethod()">手动更新虚拟tree</el-button>
                <pre>
                    (
                    下面这棵树是上面那棵树对应的虚拟节点，用于比对二者状态保持清晰思路，
                    除测试同学外请自行忽略下面所有东西;请不要对下面的树进行任何操作以免影响效果正确性);
                    因为此产品尚属不成熟阶段，随时需要对突如其来的bug调试
                    下方树测试要点：上面的树有任何变化后下面的树中每一行若存在于上面的树，则必须和上面的树状态一致
                </pre>

                <el-table :data="virutalModel" is-virtual-tree border>



                    <!--<smarter-tree-->
                            <!--checked-key="selected"-->
                            <!--:disabled-deepth="[1]"-->
                            <!--@mounted="$refs.treeGrid.refreshTreeTable(lianHangData)"-->
                            <!--ref="treeGrid"-->
                            <!--:expand-all="true"-->
                            <!--:checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"-->
                            <!--:enable-check="enableCheck"-->
                            <!--:enableCheckedFolder="enableCheckedFolder"-->
                            <!--tree-key="permissionId"-->
                            <!--prop="orgName" label="选择网点"-->
                    <!--&gt;-->
                    <!--</smarter-tree>-->

                    <tree-grid
                        is-virtual-tree
                        checked-key="selected"
                        :disabled-deepth="[1]"
                        tree-key="permissionId"
                        @labelClick="handleLabelClick"
                        :enable-checked-folder="enableCheckedFolder"
                        :checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"
                        :enable-checked-multiple="enableCheckedMultiple"
                        :auto-expand-checked-nodes="autoExpandCheckedNodes"
                        :enable-check="enableCheck"
                        prop="orgName" label="labelname"></tree-grid>



                    <el-table-column label="path"   width="180">
                        <template slot-scope="scope">
                            {{scope.row.$extra.path}}
                        </template>
                    </el-table-column>
                    <!--<el-table-column label="additional checkbox demo">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-checkbox @change="$refs.treeGrid.updateRows([scope.row],['testBool'])" v-model="scope.row.testBool">{{scope.row.testBool?'选中了':'没选中'}}</el-checkbox>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column label="index">
                        <template slot-scope="scope">
                            {{scope.$index}}
                        </template>
                    </el-table-column>
                    <el-table-column label="deepth" prop="$extra.deepth"></el-table-column>
                    <el-table-column label="treeKey" prop="permissionId"></el-table-column>
                    <el-table-column label="childsNum" prop="$extra.childsNum"></el-table-column>
                    <el-table-column label="parentId" prop="$extra.parentId"></el-table-column>
                    <el-table-column label="ancestorId" prop="$extra.ancestorId"></el-table-column>
                    <!--<el-table-column label="disabled?" prop="$extra.disabled"></el-table-column>-->
                    <el-table-column label="idPath?" prop="$extra.idPath"></el-table-column>

                    <el-table-column label="disabled?">
                        <template slot-scope="scope">{{scope.row.$extra.disabled?'yes':'no'}}</template>
                    </el-table-column>
                    <el-table-column label="hasChildren">
                        <template slot-scope="scope">{{scope.row.$extra.hasChildren?'yes':'no'}}</template>
                    </el-table-column>
                    <el-table-column label="expanded">
                        <template slot-scope="scope">{{scope.row.$extra.expanded?'yes':'no'}}</template>
                    </el-table-column>
                    <el-table-column label="checked?">
                        <template slot-scope="scope">{{scope.row.selected?'yes':'no'}}</template>
                    </el-table-column>
                    <el-table-column label="indeterminate?">
                        <template slot-scope="scope">{{scope.row.$extra.indeterminate?'yes':'no'}}</template>
                    </el-table-column>

                    <!--<el-table-column label="description & path"   width="180">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.description}}<br>-->
                            <!--{{scope.row.$extra.path}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="additional checkbox demo">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-checkbox v-model="scope.row.testBool">{{scope.row.testBool?'选中了':'没选中'}}</el-checkbox>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="index">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.$index}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="deepth" prop="$extra.deepth"></el-table-column>-->
                    <!--<el-table-column label="treeKey" prop="treeId"></el-table-column>-->
                    <!--<el-table-column label="childsNum" prop="$extra.childsNum"></el-table-column>-->
                    <!--<el-table-column label="parentId" prop="$extra.parentId"></el-table-column>-->

                    <!--<el-table-column label="hasChildren">-->
                        <!--<template slot-scope="scope">{{scope.row.$extra.hasChildren?'yes':'no'}}</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="expanded">-->
                        <!--<template slot-scope="scope">{{scope.row.$extra.expanded?'yes':'no'}}</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="checked?">-->
                        <!--<template slot-scope="scope">{{scope.row.checked?'yes':'no'}}</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="indeterminate?">-->
                        <!--<template slot-scope="scope">{{scope.row.$extra.indeterminate?'yes':'no'}}</template>-->
                    <!--</el-table-column>-->


                </el-table>



                <hr/>


                <!--<el-tree-->
                    <!--:data="data2"-->
                    <!--show-checkbox-->
                    <!--default-expand-all-->
                    <!--node-key="id"-->
                    <!--ref="tree"-->
                    <!--highlight-current-->
                    <!--:props="defaultProps">-->
                <!--</el-tree>-->

                <!--<div class="buttons">-->
                    <!--<el-button @click="getCheckedNodes">通过 node 获取</el-button>-->
                    <!--<el-button @click="getCheckedKeys">通过 key 获取</el-button>-->
                    <!--<el-button @click="setCheckedNodes">通过 node 设置</el-button>-->
                    <!--<el-button @click="setCheckedKeys">通过 key 设置</el-button>-->
                    <!--<el-button @click="resetChecked">清空</el-button>-->
                <!--</div>-->




                <!--<el-select v-model="value7" placeholder="请选择">-->
                    <!--<el-option-group-->
                        <!--v-for="group in options3"-->
                        <!--:key="group.label"-->
                        <!--:label="group.label">-->
                        <!--<el-option-->
                            <!--v-for="item in group.options"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-option-group>-->
                <!--</el-select>-->

                <!--<el-select v-model="value6" placeholder="请选择">-->
                    <!--<el-option-->
                        <!--v-for="item in cities"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                        <!--<span style="float: left">{{ item.label }}</span>-->
                        <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
                        <!--<el-button>aaa</el-button><br>-->
                        <!--<el-button>aaa</el-button><br>-->
                        <!--<el-button>aaa</el-button><br>-->
                        <!--<el-button>aaa</el-button><br>-->
                    <!--</el-option>-->
                <!--</el-select>-->



            </el-tab-pane>
            <!--<el-tab-pane label="docs">-->
                <!--<iframe class="no-border-iframe" src="https://www.zybuluo.com/dbx142857/note/919668"></iframe>-->
            <!--</el-tab-pane>-->

            <!--<el-tab-pane label="下载demo代码">-->
            <!--<a target="_blank" download="fwTreeGrid.vue" href="/downloadSource/fwSmarterTree.vue">下载源码(若点击无效请在请窗口打开)</a><br>-->
            <!--<a target="_blank" download="demo.vue" href="/downloadDemo/demo-fwSmarterTree.vue">下载demo(若点击无效请在请窗口打开)</a><br>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="软件依赖">-->
                <!--<el-alert :closable="false" style="margin-bottom:10px;" title="tree table组件以及该组件所依赖的所有东西" type="success"></el-alert>-->
            <!--</el-tab-pane>-->
        </el-tabs>







    </div>

</template>

<script>
    import lianHangData from './lianHangData'
    export default {
        data(){
            return {
                lianHangData:lianHangData,
                checkedAllChildsWhenParentChecked:true,
                enableCheck:true,
                enableCheckedFolder:true,
                disabledDeepth:[1],


                activeName:'demo',
                searchStr:'',
//                checkedAllChildsWhenParentChecked:true,
                enableCheckedMultiple:false,
//                enableCheckedFolder:true,
                autoExpandCheckedNodes:true,
//                enableCheck:true,

                // :enable-checked-folder="checkedAllChildsWhenParentChecked"
                // :enable-checked-multiple="enableCheckedMultiple"
                // :auto-expand-checked-nodes="autoExpandCheckedNodes"
                // :enable-check="enableCheck"

                cities: [{
                    value: 'Beijing',
                    label: '北京'
                }, {
                    value: 'Shanghai',
                    label: '上海'
                }, {
                    value: 'Nanjing',
                    label: '南京'
                }, {
                    value: 'Chengdu',
                    label: '成都'
                }, {
                    value: 'Shenzhen',
                    label: '深圳'
                }, {
                    value: 'Guangzhou',
                    label: '广州'
                }],
                value6: '',
                options3: [{
                    label: '热门城市',
                    options: [{
                        options: [{
                            value: 'Shanghai',
                            label: '上海'
                        }, {
                            value: 'Beijing',
                            label: '北京'
                        }],
                        label: '上海'
                    }, {
                        value: 'Beijing',
                        label: '北京'
                    }]
                }, {
                    label: '城市名',
                    options: [{
                        value: 'Chengdu',
                        label: '成都'
                    }, {
                        value: 'Shenzhen',
                        label: '深圳'
                    }, {
                        value: 'Guangzhou',
                        label: '广州'
                    }, {
                        value: 'Dalian',
                        label: '大连'
                    }]
                }],
                value7: '',

                virutalModel:[],
                model:
                [],

                data2: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        mounted(){
            window.SMARTER_TREE_DEMO=this

            let parseUrl= function (href) {
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
            let urlQueryMap=parseUrl()
            this.activeName=urlQueryMap.tab||'!警告'
            console.log('urlQueryMap-:',urlQueryMap)
            console.log("$refs.treeGrid",this.$refs.treeGrid)
            this.constructor.prototype.BX&&this.BX.call(this,'setCurrentVM')
        },
        methods:{
            insertChildsTest(){


                let ref=this.$refs.treeGrid,
                    index=2,
                    childs=JZY.u.copy(lianHangData),
                    loop=(item)=>{
                        item.permissionId=item.permissionId+'a'
                        item.orgName=item.orgName+'a'

                        if(item.hasOwnProperty('children') && item.children.length>0){
                            item.children.forEach(loop)
                        }

                    }


                    childs.forEach(loop)

                JZY.s.clog('childs--:',childs)


                ref.insertChildRows(2,childs)
                // ref.insertChildRows(ref.getAllNodes()[2].permissionId,childs)



            },
            refreshDataTest(){
                this.$refs.treeGrid.refreshTreeTable(
                    [{

                        "treeId": 1,
                        "label": "System",
                        "selected":false,"url":null,testBool:true,
                        "description": "System Manager",
                        "children": [{
                            "treeId": 2,
                            "label": "base",
                            "selected":true,"url":null,testBool:true,
                            "description": "Base Manager",
                            "children": [{
                                "treeId": 3,

                                "label": "Menus",
                                "selected":false,"url":"/menus",
                                "description": "menu manager",
                                "children":[{
                                    "treeId": 17,
                                    "label": "Menus17-test",
                                    "selected":false,"url":"/menus17",
                                    "description": "menu manager17",
                                }]
                            }, {
                                "treeId": 4,
                                "label": "Rolessssssss",
                                "selected":false,"url":"/roles",
                                "description": "Role Manager",
                            }, {
                                "treeId": 5,
                                "label": "Userssssss",
                                "selected":false,"url":"/users",
                                "description": "User Manager",
                            }]
                        }]
                    }, {
                        "treeId": 6,
                        "label": "Customs",
                        "selected":false,"url":null,testBool:true,
                        "description": "Custom Manager",
                        "children": [{
                            "treeId": 7,
                            "label": "CustomList-test",
                            "selected":false,"url":"/customs",
                            "description": "CustomList",
                        }]
                    }, {
                        "treeId": 8,
                        "label": "Templates",
                        "selected":false,"url":null,testBool:true,
                        "description": "Template Manager",
                        "children": [{
                            "treeId": 9,
                            "label": "TemplateList",
                            "selected":true,"url":"/doc_templates",
                            "description": "Template Manager",
                        }]
                    }, {
                        "treeId": 10,
                        "label": "Bussiness",
                        "selected":false,"url":null,testBool:true,
                        "description": "Bussiness Manager",
                        "children": [{
                            "treeId": 11,
                            "label": "BussinessList",
                            "selected":false,"url":null,testBool:true,
                            "description": "BussinessList",
                            "children": [{
                                "treeId": 12,
                                "label": "Currenciesssssssss",
                                "selected":false,"url":"/currencies",
                                "description": "Currencies",
                            }, {
                                "treeId": 13,
                                "label": "Dealtypesaaaaaaa",
                                "selected":false,"url":"/dealtypes",
                                "description": "Dealtypes",
                            }]
                        }, {
                            "treeId": 14,
                            "label": "Products",
                            "selected":false,"url":null,testBool:true,
                            "description": "Products",
                            "children": [{
                                "treeId": 15,
                                "label": "ProductTypes",
                                "selected":false,"url":"/productTypes",
                                "description": "ProductTypes",
                            }, {
                                "treeId": 16,
                                "label": "ProductList",
                                "selected":false,"url":"/products",
                                "description": "ProductList",
                            }]
                        }]
                    }]
                )
            },
            handleSearchChange(item,s){
                // base  esab ESAB
                return item.label.split('').reverse().join('').toLowerCase().includes(s.toLocaleString())
                // return item.label.includes(s)
            },
            log(){
                for(var i=0;i<arguments.length;i++){
                    console.log('第'+(i+1)+'个参数:',arguments[i])
                }
            },
            updateVirtualTreeMethod(){
                this.virutalModel=JZY.u.copy(this.$refs.treeGrid.getVirtualTreeNodes())
            },
            handleLabelClick(){
                console.log('handle label click args:',arguments)
            },
            getCheckedNodes() {
                console.log(this.$refs.tree.getCheckedNodes())
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys())
            },
            setCheckedNodes() {
                this.$refs.tree.setCheckedNodes([{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 9,
                    label: '三级 1-1-1'
                }])
            },
            setCheckedKeys() {
                this.$refs.tree.setCheckedKeys([3])
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([])
            },

            remote(row,callback){
                setTimeout(function() {
                    callback(row.children)
                },500)
            }
        }
    }
</script>
