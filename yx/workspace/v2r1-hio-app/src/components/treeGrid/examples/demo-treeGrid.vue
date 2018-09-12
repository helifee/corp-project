<template>
    <div>


        <el-alert title="自定义方法过滤表格中内容demo请参考更聪明的tree" :closable="false" type="warning"></el-alert>



        <el-tabs v-model="activeName" type="border-card">
            <!--<el-tab-pane name="!警告" label="!警告">-->
                <!--<el-alert style="margin-bottom:10px;" title="demo文件请查看源码文件夹下的examples" type="warning" :closable="false"></el-alert>-->

                <!--<el-alert style="margin-bottom:10px;" title="在集此插件和相关demo之前，请认真阅读软件依赖并正确配置" type="warning" :closable="false"></el-alert>-->
                <!--<el-alert style="margin-bottom:10px;" title="所有组件，指令秉承功能优先，样式随后的政策" type="warning" :closable="false"></el-alert>-->

                <!--<el-alert style="margin-bottom:10px;" title="插件依赖于el-table，请务必保证el-table中data是嵌套结构的数据" type="error" :closable="false"></el-alert>-->
                <!--<el-alert style="margin-bottom:10px;" title="暂不支持异步远程加载数信息（基于需求要求的灵活度，实现此功能将会非常复杂）；后续有需求再考虑" type="warning" :closable="false"></el-alert>-->
                <!--<el-alert style="margin-bottom:10px;" title="若想支持勾选，请务必确保渲染tree table挂载前checked属性已存在且开启enable-check" type="warning" :closable="false"></el-alert>-->
                <!--<el-alert style="margin-bottom:10px;" title="父节点数据和子组件表格数据未建立起双向绑定关系，若建立，则开发难度非常大，-->
                <!--甚至不一定能实现;初始数据仅作为tree table入口数据，后续所有需要访问的数据（例如源数据中可能变化的数据）-->
                <!--请务必以getCheckedNodes getAllNodes方法获取的为准" type="error" :closable="false"></el-alert>-->
                <!--<el-alert style="margin-bottom:10px;" title="由于性能 技术 实现难度等各种考量，源数据 视图树 虚拟树三者无法建立起相互-->
<!--双向绑定关系，若您的业务数据中存在非只读的值，请确保值变化后手动调用updateRows方法更新相关状态;-->
<!--例如：" type="error" :closable="false">-->
                    <!--<pre>-->
                        <!--@change = "$refs.treeGrid.updateRows([scope.row],['testBool'])"-->

                    <!--</pre>-->
                <!--</el-alert>-->
                <!--<el-alert style="margin-bottom:10px;" title="根据需求做组件最小化功能，若不够强大后期有需求了可升级" type="warning" :closable="false"></el-alert>-->

            <!--</el-tab-pane>-->
            <el-tab-pane name="demo" label="demo">


                <div>高级关联设置：</div>
                <el-checkbox v-model="advancedRelevanceStrategyTest.onChecked.syncParents">选中时同步父</el-checkbox>
                <el-checkbox  v-model="advancedRelevanceStrategyTest.onChecked.syncChilds">选中时同步子</el-checkbox>
                <el-checkbox v-model="advancedRelevanceStrategyTest.onCancelChecked.syncParents">取消选中时同步父</el-checkbox>
                <el-checkbox v-model="advancedRelevanceStrategyTest.onCancelChecked.syncChilds">取消选中时同步子</el-checkbox>

                <el-button @click="log(JSON.stringify(advancedRelevanceStrategyTest))">log 关联策略advancedRelevanceStrategyTest</el-button>


                <el-table :data="tableData" border>
                    <tree-grid
                        :advancedRelevanceStrategy="advancedRelevanceStrategyTest"
                        ref="PCref"
                        prop="resourceName"
                        label="权限名称"
                        :expand-all="false"
                        tree-key="id"
                        :autoExpandCheckedNodes="false"
                        :enable-check="true"
                        checked-key="check"
                        :checked-all-childs-when-parent-checked="true"
                        child-key="childrds"
                        width="300">
                    </tree-grid>
                    <el-table-column prop="check" label="是否有权限"   width="180">
                        <template slot-scope="scope">
                            {{scope.row.check === true ? '√' : '×'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="resourceDesc" label="功能描述"   width="180"></el-table-column>
                    <el-table-column prop="type" label="权限类型">
                        <template slot-scope="scope">
                            {{scope.row.type}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="$refs.PCref.deleteRowsByIds([scope.row.id])">delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>




                <!--<el-tree-->
                    <!--:data="data2"-->
                    <!--show-checkbox-->
                    <!--node-key="id"-->
                    <!--:default-expanded-keys="[2, 3]"-->
                    <!--:default-checked-keys="[2,5]"-->
                    <!--:props="defaultProps">-->
                <!--</el-tree>-->




                <!--<el-button @click="lightId1">-->
                    <!--手动点亮id为1的-->
                <!--</el-button>-->


                <el-button @click="log($refs.treeGrid.getAllNodes())">console.log所有节点(包括未选中)</el-button>

                <!--<el-tree-->
                    <!--:data="bigData"-->
                    <!--show-checkbox-->
                    <!--node-key="id"-->
                    <!--:default-expanded-keys="[]"-->
                    <!--:default-checked-keys="[10348]"-->
                    <!--:props="defaultProps">-->
                <!--</el-tree>-->
                <div>高级关联设置：</div>
                <el-checkbox v-model="advancedRelevanceStrategy.onChecked.syncParents">选中时同步父</el-checkbox>
                <el-checkbox  v-model="advancedRelevanceStrategy.onChecked.syncChilds">选中时同步子</el-checkbox>
                <el-checkbox v-model="advancedRelevanceStrategy.onCancelChecked.syncParents">取消选中时同步父</el-checkbox>
                <el-checkbox v-model="advancedRelevanceStrategy.onCancelChecked.syncChilds">取消选中时同步子</el-checkbox>

                <el-button @click="log(JSON.stringify(advancedRelevanceStrategy))">log 关联策略</el-button>
                <!--advancedRelevanceStrategy:{-->
                <!--onChecked:{-->
                <!--syncParents:true,-->
                <!--syncChilds:true,-->
                <!--},-->
                <!--onCancelChecked:{-->
                <!--syncParents:true,-->
                <!--syncChilds:true,-->
                <!--}-->
                <!--},-->


                <!--<el-table v-if="urlQueryMap" height="1200" :data="model" border>-->

                    <!--&lt;!&ndash;<tree-grid&ndash;&gt;-->
                        <!--&lt;!&ndash;:update-virtual-tree-method="updateVirtualTreeMethod"&ndash;&gt;-->

                        <!--&lt;!&ndash;@mounted="$refs.treeGrid.refreshTreeTable(bigData.result[urlQueryMap.data=='app'?'APP':'PC'])"&ndash;&gt;-->
                        <!--&lt;!&ndash;:advancedRelevanceStrategy="advancedRelevanceStrategy"&ndash;&gt;-->
                        <!--&lt;!&ndash;ref="treeGrid"&ndash;&gt;-->
                        <!--&lt;!&ndash;prop="resourceName"&ndash;&gt;-->
                        <!--&lt;!&ndash;label="权限名称"&ndash;&gt;-->
                        <!--&lt;!&ndash;:expand-all="false"&ndash;&gt;-->
                        <!--&lt;!&ndash;tree-key="permissionId"&ndash;&gt;-->
                        <!--&lt;!&ndash;:enableCheckedMultiple="true"&ndash;&gt;-->
                        <!--&lt;!&ndash;:autoExpandCheckedNodes="true"&ndash;&gt;-->
                        <!--&lt;!&ndash;:enable-check="true"&ndash;&gt;-->
                        <!--&lt;!&ndash;checked-key="state"&ndash;&gt;-->
                        <!--&lt;!&ndash;:checked-all-childs-when-parent-checked="true"&ndash;&gt;-->
                        <!--&lt;!&ndash;child-key="childFuncs"&ndash;&gt;-->
                        <!--&lt;!&ndash;width="300">&ndash;&gt;-->
                    <!--&lt;!&ndash;</tree-grid>&ndash;&gt;-->



                    <!--&lt;!&ndash;<tree-grid&ndash;&gt;-->
                        <!--&lt;!&ndash;@mounted="$refs.abc.refreshTreeTable(abcData)"&ndash;&gt;-->
                        <!--&lt;!&ndash;ref="abc"&ndash;&gt;-->
                        <!--&lt;!&ndash;prop="resourceName"&ndash;&gt;-->
                        <!--&lt;!&ndash;label="权限名称"&ndash;&gt;-->
                        <!--&lt;!&ndash;:expand-all="false"&ndash;&gt;-->
                        <!--&lt;!&ndash;checked-key="state"&ndash;&gt;-->
                        <!--&lt;!&ndash;:autoExpandCheckedNodes="false"&ndash;&gt;-->
                        <!--&lt;!&ndash;:enable-check="true"&ndash;&gt;-->
                        <!--&lt;!&ndash;child-key="childFuncs"&ndash;&gt;-->
                        <!--&lt;!&ndash;width="400">&ndash;&gt;-->
                    <!--&lt;!&ndash;</tree-grid>&ndash;&gt;-->

                    <!--&lt;!&ndash;<tree-grid&ndash;&gt;-->

                        <!--&lt;!&ndash;@labelClick="handleLabelClick"&ndash;&gt;-->
                        <!--&lt;!&ndash;disabled-key="iDisabled"&ndash;&gt;-->
                        <!--&lt;!&ndash;ref="treeGrid"&ndash;&gt;-->
                        <!--&lt;!&ndash;checked-key="selectedd"&ndash;&gt;-->
                        <!--&lt;!&ndash;:custom-prop="customProp"&ndash;&gt;-->
                        <!--&lt;!&ndash;:update-virtual-tree-method="updateVirtualTreeMethod"&ndash;&gt;-->
                        <!--&lt;!&ndash;prop="label"&ndash;&gt;-->
                        <!--&lt;!&ndash;label="权限名称"&ndash;&gt;-->
                        <!--&lt;!&ndash;:enable-checked-folder="enableCheckedFolder"&ndash;&gt;-->
                        <!--&lt;!&ndash;:checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"&ndash;&gt;-->
                        <!--&lt;!&ndash;:enable-checked-multiple="false"&ndash;&gt;-->
                        <!--&lt;!&ndash;:auto-expand-checked-nodes="autoExpandCheckedNodes"&ndash;&gt;-->
                        <!--&lt;!&ndash;:enable-check="enableCheck"&ndash;&gt;-->
                        <!--&lt;!&ndash;:expand-all="true"&ndash;&gt;-->
                        <!--&lt;!&ndash;child-key="children"&ndash;&gt;-->
                        <!--&lt;!&ndash;width="400">&ndash;&gt;-->
                    <!--&lt;!&ndash;</tree-grid>&ndash;&gt;-->

                    <!--&lt;!&ndash;checkedAllChildsWhenParentChecked:true,&ndash;&gt;-->
                    <!--&lt;!&ndash;enableCheckedMultiple:true,&ndash;&gt;-->
                    <!--&lt;!&ndash;enableCheckedFolder:true,&ndash;&gt;-->
                    <!--&lt;!&ndash;autoExpandCheckedNodes:true,&ndash;&gt;-->
                    <!--&lt;!&ndash;enableCheck:true,&ndash;&gt;-->



                    <!--&lt;!&ndash;<tree-grid&ndash;&gt;-->
                        <!--&lt;!&ndash;:expand-all="true"&ndash;&gt;-->
                        <!--&lt;!&ndash;@labelClick="handleLabelClick"&ndash;&gt;-->
                        <!--&lt;!&ndash;ref="treeGrid"&ndash;&gt;-->
                        <!--&lt;!&ndash;child-key="childFuncs"&ndash;&gt;-->
                        <!--&lt;!&ndash;tree-key="id"&ndash;&gt;-->
                        <!--&lt;!&ndash;checked-key="state"&ndash;&gt;-->
                        <!--&lt;!&ndash;:enable-checked-folder="enableCheckedFolder"&ndash;&gt;-->
                        <!--&lt;!&ndash;:update-virtual-tree-method="updateVirtualTreeMethod"&ndash;&gt;-->
                        <!--&lt;!&ndash;:checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"&ndash;&gt;-->
                        <!--&lt;!&ndash;:enable-checked-multiple="enableCheckedMultiple"&ndash;&gt;-->
                        <!--&lt;!&ndash;:auto-expand-checked-nodes="autoExpandCheckedNodes"&ndash;&gt;-->
                        <!--&lt;!&ndash;:enable-check="enableCheck"&ndash;&gt;-->
                        <!--&lt;!&ndash;prop="resourceName" label="labelname"></tree-grid>&ndash;&gt;-->
                    <!--<el-table-column label="check">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.check?'y':'n'}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="path"   width="180">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.$extra.path}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="idPath"   width="180">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.$extra.idPath}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--&lt;!&ndash;<el-table-column width="80" label="test">&ndash;&gt;-->
                        <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-checkbox @change="$refs.treeGrid.updateRows([scope.row],['testBool'])" v-model="scope.row.testBool">{{scope.row.testBool?'y':'n'}}</el-checkbox>&ndash;&gt;-->
                        <!--&lt;!&ndash;</template>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
                    <!--<el-table-column width="45" label="index">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.$index}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column width="40" label="deepth" prop="$extra.deepth"></el-table-column>-->
                    <!--&lt;!&ndash;<el-table-column width="40" label="indexInMemoryTree" prop="$extra.indexInMemoryTree"></el-table-column>&ndash;&gt;-->
                    <!--<el-table-column width="60" label="treeKey" prop="id"></el-table-column>-->
                    <!--<el-table-column width="40" label="childsNum" prop="$extra.childsNum"></el-table-column>-->
                    <!--<el-table-column width="60" label="parentId" prop="$extra.parentId"></el-table-column>-->

                    <!--<el-table-column width="40" label="hasChildren">-->
                        <!--<template slot-scope="scope">{{scope.row.$extra.hasChildren?'y':'n'}}</template>-->
                    <!--</el-table-column>-->
                    <!--&lt;!&ndash;<el-table-column width="40" label="expanded">&ndash;&gt;-->
                        <!--&lt;!&ndash;<template slot-scope="scope">{{scope.row.$extra.expanded?'y':'n'}}</template>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
                    <!--<el-table-column width="40" label="checked?">-->
                        <!--<template slot-scope="scope">{{scope.row.selected?'y':'n'}}</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column width="40" label="indeterminate?">-->
                        <!--<template slot-scope="scope">{{scope.row.$extra.indeterminate?'y':'n'}}</template>-->
                    <!--</el-table-column>-->

                    <!--&lt;!&ndash;<el-table-column label="childTreeKeys">&ndash;&gt;-->
                        <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
                            <!--&lt;!&ndash;{{scope.row.$extra.childTreeKeys.join(',')}}&ndash;&gt;-->
                        <!--&lt;!&ndash;</template>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->




                <!--</el-table>-->

                <el-alert title="注意:本组件支持多种布尔类型配置，两两组合可产生非常多的配置结果，
                短期内根本无法对所有配置情况进行严格测试所以可能有bug请大家多多理解。
                以下按钮仅提供一些效果预览不保证属性变更后完全正常运行。但能保证的是初始数据配置完毕后正常运行" :closable="false" type="warning"></el-alert>


                    <!--<el-button @click="refreshDataTest()">渲染数据</el-button>-->
                    <el-button @click="refreshDataTest1()">渲染空数据</el-button>
                <el-button @click="$refs.treeGrid.clearCheckedNodes()">清除所有选中节点</el-button>
                <el-button @click="updateRowsTest()">log所有数据，然后更改第一条数据的type字段，然后log所有数据</el-button>
                <!--<el-button @click="insertFourSiblingsTest()">给第11行增加2个兄弟</el-button>-->
                <!--<el-button @click="insertTwoChildrenTest()">给第11行增加2个儿子（包含儿子所有嵌套共4条数据）</el-button>-->
                <!--<el-button @click="enableCheckedFolder=!enableCheckedFolder">toggle是否允许选中文件夹(当前值:{{enableCheckedFolder}})</el-button>-->
                <!--<el-button @click="checkedAllChildsWhenParentChecked=!checkedAllChildsWhenParentChecked">toggle是否勾选父组件时选中所有子组件(当前值:{{checkedAllChildsWhenParentChecked}})</el-button>-->
                <!--<el-button @click="enableCheckedMultiple=!enableCheckedMultiple">toggle是否允许多选(当前值:{{enableCheckedMultiple}})</el-button>-->
                <!--<el-button @click="autoExpandCheckedNodes=!autoExpandCheckedNodes">toggle自动展开选中的节点(当前值:{{autoExpandCheckedNodes}})</el-button>-->
                <el-button @click="$refs.PCref.expandAllNodes()">展开所有节点</el-button>
                <el-button @click="log($refs.treeGrid.getAllNodes())">console.log所有节点(包括未选中)</el-button>
                <el-button @click="log('all checked nodes:',$refs.treeGrid.getCheckedNodes())">console.log所有选中节点(不包括父节点)</el-button>
                <el-button @click="log('all checked nodes:',$refs.treeGrid.getCheckedNodes(true))">console.log所有选中节点(包括父节点)</el-button>
                <el-button @click="reRenderTreeByCheckedNodes()">获取所有选中节点，包含父节点，并用新获取到的节点重新渲染整棵树</el-button>
                <el-button @click="log('all checked nodes:',$refs.treeGrid.getCheckedNodes(true,'INDEX'))">console.log所有选中节点的index(包括父节点)</el-button>
                <el-button @click="log('all checked nodes:',$refs.treeGrid.getCheckedNodes(true,'ID'))">console.log所有选中节点的treeKey(id)(包括父节点)</el-button>

                <!--<el-button @click="enableCheck=!enableCheck">toggle开启勾选(当前值:{{enableCheck}})</el-button>-->

                <!--checkedAllChildsWhenParentChecked:true,-->
                <!--enableCheckedMultiple:true,-->
                <!--autoExpandCheckedNodes:true,-->
                <!--enableCheck:true,-->

                <el-alert title="demo到此结束，只保证此处以上代码能跑" :closable="false" type="warning"></el-alert>

                <el-button @click="updateVirtualTreeMethod()">手动更新虚拟tree</el-button>
                <pre>
                    (
                    下面这棵树是上面那棵树对应的虚拟节点，用于比对二者状态保持清晰思路，
                    除测试同学外请自行忽略下面所有东西;请不要对下面的树进行任何操作以免影响效果正确性);
                    因为此产品尚属不成熟阶段，随时需要对突如其来的bug调试
                    下方树测试要点：上面的树有任何变化后下面的树中每一行若存在于上面的树，则必须和上面的树状态一致
                </pre>

                <el-table :data="virutalModel" border>

                    <tree-grid
                        is-virtual-tree
                        prop="resourceName"
                        label="权限名称"
                        :expand-all="false"
                        tree-key="permissionId"
                        :autoExpandCheckedNodes="false"
                        :enable-check="true"
                        checked-key="state"
                        :checked-all-childs-when-parent-checked="false"
                        child-key="childFuncs"
                        width="300">
                    </tree-grid>

                    <!--<tree-grid-->
                        <!--is-virtual-tree-->
                        <!--prop="label"-->
                        <!--checked-key="state"-->

                        <!--label="权限名称"-->
                        <!--:enable-check="enableCheck"-->
                        <!--child-key="children"-->
                        <!--width="400">-->
                    <!--</tree-grid>-->

                    <!--<tree-grid-->
                        <!--checked-key="state"-->
                        <!--tree-key="id"-->
                        <!--@labelClick="handleLabelClick"-->
                        <!--:enable-checked-folder="enableCheckedFolder"-->
                        <!--:checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"-->
                        <!--:enable-checked-multiple="enableCheckedMultiple"-->
                        <!--:auto-expand-checked-nodes="autoExpandCheckedNodes"-->
                        <!--:enable-check="enableCheck"-->
                        <!--prop="resourceName" label="labelname"></tree-grid>-->
                    <el-table-column label="是否选中">
                        <template slot-scope="scope">
                            <div>
                                <el-button @click="log(scope)">{{scope.row.check?'y':'n'}}</el-button>

                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="path">
                        <template slot-scope="scope">{{scope.row.$extra.path}}</template>
                    </el-table-column>
                    <el-table-column label="idPath"   width="180">
                        <template slot-scope="scope">
                            {{scope.row.$extra.idPath}}
                        </template>
                    </el-table-column>
                    <!--<el-table-column width="80" label="test">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-checkbox @change="$refs.treeGrid.updateRows([scope.row],['testBool'])" v-model="scope.row.testBool">{{scope.row.testBool?'y':'n'}}</el-checkbox>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column width="45" label="index">
                        <template slot-scope="scope">
                            {{scope.$index}}
                        </template>
                    </el-table-column>
                    <el-table-column width="40" label="deepth" prop="$extra.deepth"></el-table-column>
                    <!--<el-table-column width="40" label="indexInMemoryTree" prop="$extra.indexInMemoryTree"></el-table-column>-->
                    <el-table-column width="60" label="treeKey" prop="id"></el-table-column>
                    <el-table-column width="40" label="childsNum" prop="$extra.childsNum"></el-table-column>
                    <el-table-column width="40" label="ancestorId" prop="$extra.ancestorId"></el-table-column>
                    <el-table-column width="60" label="parentId" prop="$extra.parentId"></el-table-column>

                    <el-table-column width="40" label="hasChildren">
                        <template slot-scope="scope">{{scope.row.$extra.hasChildren?'yes':'no'}}</template>
                    </el-table-column>
                    <el-table-column width="40" label="expanded">
                        <template slot-scope="scope">{{scope.row.$extra.expanded?'yes':'no'}}</template>
                    </el-table-column>
                    <!--<el-table-column width="40" label="checked?">-->
                        <!--<template slot-scope="scope">{{scope.row.selected?'yes':'no'}}</template>-->
                    <!--</el-table-column>-->
                    <el-table-column width="40" label="indeterminate?">
                        <template slot-scope="scope">{{scope.row.$extra.indeterminate?'yes':'no'}}</template>
                    </el-table-column>

                    <!--<el-table-column label="childTreeKeys">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.$extra.childTreeKeys.join(',')}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->


                </el-table>



                <hr/>







                <el-select v-model="value7" placeholder="请选择">
                    <el-option-group
                        v-for="group in options3"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>

                <el-select v-model="value6" placeholder="请选择">
                    <el-option
                        v-for="item in cities"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        <el-button>aaa</el-button><br>
                        <el-button>aaa</el-button><br>
                        <el-button>aaa</el-button><br>
                        <el-button>aaa</el-button><br>
                    </el-option>
                </el-select>



            </el-tab-pane>
            <!--<el-tab-pane label="docs">-->
                <!--<iframe class="no-border-iframe" src="https://www.zybuluo.com/dbx142857/note/919668"></iframe>-->
            <!--</el-tab-pane>-->

            <!--<el-tab-pane label="下载demo代码">-->
                <!--<a target="_blank" download="fwTreeGrid.vue" href="/downloadSource/fwTreeGrid.vue">下载源码(若点击无效请在请窗口打开)</a><br>-->
                <!--<a target="_blank" download="demo.vue" href="/downloadDemo/demo-fwTreeGrid.vue">下载demo(若点击无效请在请窗口打开)</a><br>-->
                <!--<a target="_blank" download="fwUtil.vue" href="/downloadSource/fwUtil.js">下载fwUtil(若点击无效请在请窗口打开)</a><br>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="软件依赖">-->
                <!--<el-alert :closable="false" style="margin-bottom:10px;" title="fwUtil.js" type="success"></el-alert>-->
                <!--<el-alert :closable="false" style="margin-bottom:10px;" title="fwTreeCommonTemplate.js" type="success"></el-alert>-->


                <!--<el-alert :closable="false" style="margin-bottom:10px;" title="VUE" type="success"></el-alert>-->
                <!--<el-alert :closable="false" style="margin-bottom:10px;" title="element-ui/lib/table" type="success"></el-alert>-->
                <!--<el-alert :closable="false" style="margin-bottom:10px;" title="element-ui/lib/table-column" type="success"></el-alert>-->
                <!--<el-alert :closable="false" style="margin-bottom:10px;" title="element-ui/lib/checkbox" type="success"></el-alert>-->
                <!--<el-alert :closable="false" style="margin-bottom:10px;" title="element-ui/lib/radio" type="success"></el-alert>-->
            <!--</el-tab-pane>-->
        </el-tabs>







    </div>



</template>
<script>

    import abcData from './testData'
    import testData1220 from './testData1220'
    // import util from '@FWUI/util'
//    import bigData from './bigDataTest'
//     let  bigData=require('./bigDataTest.js')

    import bigData from './bigDataTest.js'






    export default {

        data(){
            return {
                urlQueryMap:null,
                tableData:[],
                advancedRelevanceStrategyTest:{
                    onChecked:{
                        syncParents:true,
                        syncChilds:true,

                    },
                    onCancelChecked:{
                        syncParents:true,
                        syncChilds:true,
                    }
                },
                advancedRelevanceStrategy:{
                    onChecked:{
                        syncParents:true,
                        syncChilds:true,

                    },
                    onCancelChecked:{
                        syncParents:true,
                        syncChilds:true,
                    }
                },
                testData1220:testData1220.result.PC.concat(testData1220.result.APP).concat(testData1220.result.RF).slice(0,1),
                // testData1220:testData1220.result.PC.concat(testData1220.result.APP).concat(testData1220.result.RF),
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
                },
//                defaultProps: {
//                    children: 'childFuncs',
//                    label: 'resourceName'
//                },
                bigData:bigData,
                abcData:abcData,
                customProp:{
                  iDisabled(node){
                      console.log('custom prop this:',this,node)
                      return node.$extra.deepth>1
                  }
                },
                activeName:'demo',
                checkedAllChildsWhenParentChecked:true,
                enableCheckedMultiple:true,
                enableCheckedFolder:true,
                autoExpandCheckedNodes:true,
                enableCheck:true,
                expandAll:false,

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
                // model:[{checked:false,"id":1,"groupId":1,"permissionId":1,"resourceName":"业务系统管理","resourceDesc":null,"belong":null,"parentId":-1,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":14,"groupId":1,"permissionId":4,"resourceName":"组织管理","resourceDesc":null,"belong":null,"parentId":1,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":2,"groupId":1,"permissionId":10,"resourceName":"管理员管理","resourceDesc":null,"belong":null,"parentId":4,"url":null,"tag":null,"subject":"PC","type":"菜单分组名称","status":1,"childFuncs":[{"id":28,"groupId":1,"permissionId":18,"resourceName":"管理员管理","resourceDesc":null,"belong":null,"parentId":10,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":81,"groupId":1,"permissionId":71,"resourceName":"新增","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":82,"groupId":1,"permissionId":72,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":83,"groupId":1,"permissionId":73,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":84,"groupId":1,"permissionId":74,"resourceName":"启用","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":85,"groupId":1,"permissionId":75,"resourceName":"停用","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":86,"groupId":1,"permissionId":76,"resourceName":"锁定","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":87,"groupId":1,"permissionId":77,"resourceName":"解锁","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":88,"groupId":1,"permissionId":78,"resourceName":"重置密码","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":90,"groupId":1,"permissionId":80,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":29,"groupId":1,"permissionId":19,"resourceName":"集团管理员功能管理","resourceDesc":null,"belong":null,"parentId":10,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":93,"groupId":1,"permissionId":83,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":19,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]}]},{"id":19,"groupId":1,"permissionId":9,"resourceName":"组织结构定义","resourceDesc":null,"belong":null,"parentId":4,"url":null,"tag":null,"subject":"PC","type":"菜单分组名称","status":1,"childFuncs":[]},{"id":20,"groupId":1,"permissionId":10,"resourceName":"管理员管理","resourceDesc":null,"belong":null,"parentId":4,"url":null,"tag":null,"subject":"PC","type":"菜单分组名称","status":1,"childFuncs":[{"id":28,"groupId":1,"permissionId":18,"resourceName":"管理员管理","resourceDesc":null,"belong":null,"parentId":10,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":81,"groupId":1,"permissionId":71,"resourceName":"新增","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":82,"groupId":1,"permissionId":72,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":83,"groupId":1,"permissionId":73,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":84,"groupId":1,"permissionId":74,"resourceName":"启用","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":85,"groupId":1,"permissionId":75,"resourceName":"停用","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":86,"groupId":1,"permissionId":76,"resourceName":"锁定","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":87,"groupId":1,"permissionId":77,"resourceName":"解锁","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":88,"groupId":1,"permissionId":78,"resourceName":"重置密码","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":90,"groupId":1,"permissionId":80,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":29,"groupId":1,"permissionId":19,"resourceName":"集团管理员功能管理","resourceDesc":null,"belong":null,"parentId":10,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":93,"groupId":1,"permissionId":83,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":19,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]}]},{"id":21,"groupId":1,"permissionId":11,"resourceName":"业务委托关系定义","resourceDesc":null,"belong":null,"parentId":4,"url":null,"tag":null,"subject":"PC","type":"菜单分组名称","status":1,"childFuncs":[]}]}]},{"id":11,"groupId":1,"permissionId":1,"resourceName":"业务系统管理","resourceDesc":null,"belong":null,"parentId":-1,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":14,"groupId":1,"permissionId":4,"resourceName":"组织管理","resourceDesc":null,"belong":null,"parentId":1,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":2,"groupId":1,"permissionId":10,"resourceName":"管理员管理","resourceDesc":null,"belong":null,"parentId":4,"url":null,"tag":null,"subject":"PC","type":"菜单分组名称","status":1,"childFuncs":[{"id":28,"groupId":1,"permissionId":18,"resourceName":"管理员管理","resourceDesc":null,"belong":null,"parentId":10,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":81,"groupId":1,"permissionId":71,"resourceName":"新增","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":82,"groupId":1,"permissionId":72,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":83,"groupId":1,"permissionId":73,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":84,"groupId":1,"permissionId":74,"resourceName":"启用","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":85,"groupId":1,"permissionId":75,"resourceName":"停用","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":86,"groupId":1,"permissionId":76,"resourceName":"锁定","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":87,"groupId":1,"permissionId":77,"resourceName":"解锁","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":88,"groupId":1,"permissionId":78,"resourceName":"重置密码","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":90,"groupId":1,"permissionId":80,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":29,"groupId":1,"permissionId":19,"resourceName":"集团管理员功能管理","resourceDesc":null,"belong":null,"parentId":10,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":93,"groupId":1,"permissionId":83,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":19,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]}]},{"id":19,"groupId":1,"permissionId":9,"resourceName":"组织结构定义","resourceDesc":null,"belong":null,"parentId":4,"url":null,"tag":null,"subject":"PC","type":"菜单分组名称","status":1,"childFuncs":[]},{"id":20,"groupId":1,"permissionId":10,"resourceName":"管理员管理","resourceDesc":null,"belong":null,"parentId":4,"url":null,"tag":null,"subject":"PC","type":"菜单分组名称","status":1,"childFuncs":[{"id":28,"groupId":1,"permissionId":18,"resourceName":"管理员管理","resourceDesc":null,"belong":null,"parentId":10,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":81,"groupId":1,"permissionId":71,"resourceName":"新增","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":82,"groupId":1,"permissionId":72,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":83,"groupId":1,"permissionId":73,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":84,"groupId":1,"permissionId":74,"resourceName":"启用","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":85,"groupId":1,"permissionId":75,"resourceName":"停用","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":86,"groupId":1,"permissionId":76,"resourceName":"锁定","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":87,"groupId":1,"permissionId":77,"resourceName":"解锁","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":88,"groupId":1,"permissionId":78,"resourceName":"重置密码","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":90,"groupId":1,"permissionId":80,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":18,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":29,"groupId":1,"permissionId":19,"resourceName":"集团管理员功能管理","resourceDesc":null,"belong":null,"parentId":10,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":93,"groupId":1,"permissionId":83,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":19,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]}]},{"id":21,"groupId":1,"permissionId":11,"resourceName":"业务委托关系定义","resourceDesc":null,"belong":null,"parentId":4,"url":null,"tag":null,"subject":"PC","type":"菜单分组名称","status":1,"childFuncs":[]}]}]},{"id":12,"groupId":1,"permissionId":2,"resourceName":"基础平台管理","resourceDesc":null,"belong":null,"parentId":-1,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":13,"groupId":1,"permissionId":3,"resourceName":"权限管理","resourceDesc":null,"belong":null,"parentId":2,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":15,"groupId":1,"permissionId":5,"resourceName":"用户管理","resourceDesc":null,"belong":null,"parentId":3,"url":null,"tag":null,"subject":"PC","type":"菜单分组名称","status":1,"childFuncs":[{"id":5,"groupId":1,"permissionId":15,"resourceName":"用户管理","resourceDesc":null,"belong":null,"parentId":5,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":8,"groupId":1,"permissionId":61,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":0,"childFuncs":[]},{"id":9,"groupId":1,"permissionId":62,"resourceName":"启用","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":0,"childFuncs":[]},{"id":49,"groupId":1,"permissionId":39,"resourceName":"新增","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":60,"groupId":1,"permissionId":50,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":71,"groupId":1,"permissionId":61,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":72,"groupId":1,"permissionId":62,"resourceName":"启用","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":73,"groupId":1,"permissionId":63,"resourceName":"停用","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":74,"groupId":1,"permissionId":64,"resourceName":"锁定","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":75,"groupId":1,"permissionId":65,"resourceName":"解锁","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":76,"groupId":1,"permissionId":66,"resourceName":"重置密码","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":25,"groupId":1,"permissionId":15,"resourceName":"用户管理","resourceDesc":null,"belong":null,"parentId":5,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":8,"groupId":1,"permissionId":61,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":0,"childFuncs":[]},{"id":9,"groupId":1,"permissionId":62,"resourceName":"启用","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":0,"childFuncs":[]},{"id":49,"groupId":1,"permissionId":39,"resourceName":"新增","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":60,"groupId":1,"permissionId":50,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":71,"groupId":1,"permissionId":61,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":72,"groupId":1,"permissionId":62,"resourceName":"启用","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":73,"groupId":1,"permissionId":63,"resourceName":"停用","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":74,"groupId":1,"permissionId":64,"resourceName":"锁定","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":75,"groupId":1,"permissionId":65,"resourceName":"解锁","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":76,"groupId":1,"permissionId":66,"resourceName":"重置密码","resourceDesc":null,"belong":null,"parentId":15,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]}]},{"id":16,"groupId":1,"permissionId":6,"resourceName":"角色管理","resourceDesc":null,"belong":null,"parentId":3,"url":null,"tag":null,"subject":"PC","type":"菜单分组名称","status":1,"childFuncs":[{"id":4,"groupId":1,"permissionId":14,"resourceName":"角色管理","resourceDesc":null,"belong":null,"parentId":6,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":31,"groupId":1,"permissionId":21,"resourceName":"新增","resourceDesc":null,"belong":null,"parentId":14,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[{"id":32,"groupId":1,"permissionId":22,"resourceName":"功能权限","resourceDesc":null,"belong":null,"parentId":21,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":33,"groupId":1,"permissionId":23,"resourceName":"组织权限","resourceDesc":null,"belong":null,"parentId":21,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":50,"groupId":1,"permissionId":40,"resourceName":"角色","resourceDesc":null,"belong":null,"parentId":21,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":51,"groupId":1,"permissionId":41,"resourceName":"添加角色","resourceDesc":null,"belong":null,"parentId":40,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":52,"groupId":1,"permissionId":42,"resourceName":"时效调整","resourceDesc":null,"belong":null,"parentId":40,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":53,"groupId":1,"permissionId":43,"resourceName":"特殊授权","resourceDesc":null,"belong":null,"parentId":21,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":6,"groupId":1,"permissionId":59,"resourceName":"分配数据权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":0,"childFuncs":[{"id":7,"groupId":1,"permissionId":60,"resourceName":"调增数据权限","resourceDesc":null,"belong":null,"parentId":59,"url":null,"tag":null,"subject":"PC","type":"按钮","status":0,"childFuncs":[]},{"id":70,"groupId":1,"permissionId":60,"resourceName":"调增数据权限","resourceDesc":null,"belong":null,"parentId":59,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":54,"groupId":1,"permissionId":44,"resourceName":"功能权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":56,"groupId":1,"permissionId":46,"resourceName":"组织权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":58,"groupId":1,"permissionId":48,"resourceName":"数据权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":59,"groupId":1,"permissionId":49,"resourceName":"添加数据权限","resourceDesc":null,"belong":null,"parentId":48,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":65,"groupId":1,"permissionId":55,"resourceName":"分配功能权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":66,"groupId":1,"permissionId":56,"resourceName":"调整权限","resourceDesc":null,"belong":null,"parentId":55,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":67,"groupId":1,"permissionId":57,"resourceName":"分配组织权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":68,"groupId":1,"permissionId":58,"resourceName":"调整组织权限","resourceDesc":null,"belong":null,"parentId":57,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":69,"groupId":1,"permissionId":59,"resourceName":"分配数据权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":7,"groupId":1,"permissionId":60,"resourceName":"调增数据权限","resourceDesc":null,"belong":null,"parentId":59,"url":null,"tag":null,"subject":"PC","type":"按钮","status":0,"childFuncs":[]},{"id":70,"groupId":1,"permissionId":60,"resourceName":"调增数据权限","resourceDesc":null,"belong":null,"parentId":59,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]}]},{"id":89,"groupId":1,"permissionId":79,"resourceName":"调整管理集团","resourceDesc":null,"belong":null,"parentId":21,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":42,"groupId":1,"permissionId":32,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":14,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[{"id":43,"groupId":1,"permissionId":33,"resourceName":"功能权限","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":44,"groupId":1,"permissionId":34,"resourceName":"组织权限","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":45,"groupId":1,"permissionId":35,"resourceName":"用户","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":46,"groupId":1,"permissionId":36,"resourceName":"调整用户","resourceDesc":null,"belong":null,"parentId":35,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":47,"groupId":1,"permissionId":37,"resourceName":"调整用户时效","resourceDesc":null,"belong":null,"parentId":35,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":61,"groupId":1,"permissionId":51,"resourceName":"分配角色","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":62,"groupId":1,"permissionId":52,"resourceName":"调整角色","resourceDesc":null,"belong":null,"parentId":51,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":63,"groupId":1,"permissionId":53,"resourceName":"时效调整","resourceDesc":null,"belong":null,"parentId":51,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":64,"groupId":1,"permissionId":54,"resourceName":"特殊授权","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":91,"groupId":1,"permissionId":81,"resourceName":"调整管理时效","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":92,"groupId":1,"permissionId":82,"resourceName":"调整管理集团","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":48,"groupId":1,"permissionId":38,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":14,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":24,"groupId":1,"permissionId":14,"resourceName":"角色管理","resourceDesc":null,"belong":null,"parentId":6,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":31,"groupId":1,"permissionId":21,"resourceName":"新增","resourceDesc":null,"belong":null,"parentId":14,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[{"id":32,"groupId":1,"permissionId":22,"resourceName":"功能权限","resourceDesc":null,"belong":null,"parentId":21,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":33,"groupId":1,"permissionId":23,"resourceName":"组织权限","resourceDesc":null,"belong":null,"parentId":21,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":50,"groupId":1,"permissionId":40,"resourceName":"角色","resourceDesc":null,"belong":null,"parentId":21,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":51,"groupId":1,"permissionId":41,"resourceName":"添加角色","resourceDesc":null,"belong":null,"parentId":40,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":52,"groupId":1,"permissionId":42,"resourceName":"时效调整","resourceDesc":null,"belong":null,"parentId":40,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":53,"groupId":1,"permissionId":43,"resourceName":"特殊授权","resourceDesc":null,"belong":null,"parentId":21,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":6,"groupId":1,"permissionId":59,"resourceName":"分配数据权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":0,"childFuncs":[{"id":7,"groupId":1,"permissionId":60,"resourceName":"调增数据权限","resourceDesc":null,"belong":null,"parentId":59,"url":null,"tag":null,"subject":"PC","type":"按钮","status":0,"childFuncs":[]},{"id":70,"groupId":1,"permissionId":60,"resourceName":"调增数据权限","resourceDesc":null,"belong":null,"parentId":59,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":54,"groupId":1,"permissionId":44,"resourceName":"功能权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":56,"groupId":1,"permissionId":46,"resourceName":"组织权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":58,"groupId":1,"permissionId":48,"resourceName":"数据权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":59,"groupId":1,"permissionId":49,"resourceName":"添加数据权限","resourceDesc":null,"belong":null,"parentId":48,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":65,"groupId":1,"permissionId":55,"resourceName":"分配功能权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":66,"groupId":1,"permissionId":56,"resourceName":"调整权限","resourceDesc":null,"belong":null,"parentId":55,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":67,"groupId":1,"permissionId":57,"resourceName":"分配组织权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":68,"groupId":1,"permissionId":58,"resourceName":"调整组织权限","resourceDesc":null,"belong":null,"parentId":57,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":69,"groupId":1,"permissionId":59,"resourceName":"分配数据权限","resourceDesc":null,"belong":null,"parentId":43,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":7,"groupId":1,"permissionId":60,"resourceName":"调增数据权限","resourceDesc":null,"belong":null,"parentId":59,"url":null,"tag":null,"subject":"PC","type":"按钮","status":0,"childFuncs":[]},{"id":70,"groupId":1,"permissionId":60,"resourceName":"调增数据权限","resourceDesc":null,"belong":null,"parentId":59,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]}]},{"id":89,"groupId":1,"permissionId":79,"resourceName":"调整管理集团","resourceDesc":null,"belong":null,"parentId":21,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":42,"groupId":1,"permissionId":32,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":14,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[{"id":43,"groupId":1,"permissionId":33,"resourceName":"功能权限","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":44,"groupId":1,"permissionId":34,"resourceName":"组织权限","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":45,"groupId":1,"permissionId":35,"resourceName":"用户","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":46,"groupId":1,"permissionId":36,"resourceName":"调整用户","resourceDesc":null,"belong":null,"parentId":35,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":47,"groupId":1,"permissionId":37,"resourceName":"调整用户时效","resourceDesc":null,"belong":null,"parentId":35,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":61,"groupId":1,"permissionId":51,"resourceName":"分配角色","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[{"id":62,"groupId":1,"permissionId":52,"resourceName":"调整角色","resourceDesc":null,"belong":null,"parentId":51,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":63,"groupId":1,"permissionId":53,"resourceName":"时效调整","resourceDesc":null,"belong":null,"parentId":51,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":64,"groupId":1,"permissionId":54,"resourceName":"特殊授权","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":91,"groupId":1,"permissionId":81,"resourceName":"调整管理时效","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":92,"groupId":1,"permissionId":82,"resourceName":"调整管理集团","resourceDesc":null,"belong":null,"parentId":32,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":48,"groupId":1,"permissionId":38,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":14,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]}]},{"id":17,"groupId":1,"permissionId":7,"resourceName":"授权管理","resourceDesc":null,"belong":null,"parentId":3,"url":null,"tag":null,"subject":"PC","type":"菜单分组名称","status":1,"childFuncs":[{"id":30,"groupId":1,"permissionId":20,"resourceName":"数据权限分配","resourceDesc":null,"belong":null,"parentId":7,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":77,"groupId":1,"permissionId":67,"resourceName":"权限调整","resourceDesc":null,"belong":null,"parentId":20,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":78,"groupId":1,"permissionId":68,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":20,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]},{"id":79,"groupId":1,"permissionId":69,"resourceName":"角色","resourceDesc":null,"belong":null,"parentId":20,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]},{"id":80,"groupId":1,"permissionId":70,"resourceName":"用户","resourceDesc":null,"belong":null,"parentId":20,"url":null,"tag":null,"subject":"PC","type":"页签","status":1,"childFuncs":[]}]}]},{"id":18,"groupId":1,"permissionId":8,"resourceName":"权限设置","resourceDesc":null,"belong":null,"parentId":3,"url":null,"tag":null,"subject":"PC","type":"菜单分组名称","status":1,"childFuncs":[{"id":3,"groupId":1,"permissionId":13,"resourceName":"权限参数配置-按钮/页签权限启用","resourceDesc":null,"belong":null,"parentId":8,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":95,"groupId":1,"permissionId":85,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":13,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":10,"groupId":1,"permissionId":16,"resourceName":"管理维度启用","resourceDesc":null,"belong":null,"parentId":8,"url":null,"tag":null,"subject":"PC","type":"菜单","status":0,"childFuncs":[]},{"id":22,"groupId":1,"permissionId":12,"resourceName":"权限参数配置-集团级参数设置","resourceDesc":null,"belong":null,"parentId":8,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":94,"groupId":1,"permissionId":84,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":12,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":23,"groupId":1,"permissionId":13,"resourceName":"权限参数配置-按钮/页签权限启用","resourceDesc":null,"belong":null,"parentId":8,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[{"id":95,"groupId":1,"permissionId":85,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":13,"url":null,"tag":null,"subject":"PC","type":"按钮","status":1,"childFuncs":[]}]},{"id":26,"groupId":1,"permissionId":16,"resourceName":"管理维度启用","resourceDesc":null,"belong":null,"parentId":8,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[]},{"id":27,"groupId":1,"permissionId":17,checked:false,"resourceName":"系统权限启用","resourceDesc":null,"belong":null,"parentId":8,"url":null,"tag":null,"subject":"PC","type":"菜单","status":1,"childFuncs":[]}]}]}]}],
                model: [
                //     {
                //     "id": 1,
                //     "label": "System",
                //     "selected":false,"url":null,testBool:true,
                //     "description": "System Manager",
                //     "children": [{
                //         "id": 2,
                //         "label": "base",
                //         "selected":false,"url":null,testBool:true,
                //         "description": "Base Manager",
                //         "children": [{
                //             "id": 3,
                //
                //             "label": "Menus",
                //             "selected":false,"url":"/menus",
                //             "description": "menu manager",
                //             "children":[{
                //                 "id": 17,
                //                 "label": "Menus17",
                //                 "selected":false,"url":"/menus17",
                //                 "description": "menu manager17",
                //             }]
                //         }, {
                //             "id": 4,
                //             "label": "Rolessssssss",
                //             "selected":false,"url":"/roles",
                //             "description": "Role Manager",
                //         }, {
                //             "id": 5,
                //             "label": "Userssssss",
                //             "selected":false,"url":"/users",
                //             "description": "User Manager",
                //         }]
                //     }]
                // }, {
                //     "id": 6,
                //     "label": "Customs",
                //     "selected":false,"url":null,testBool:true,
                //     "description": "Custom Manager",
                //     "children": [{
                //         "id": 7,
                //         "label": "CustomList",
                //         "selected":false,"url":"/customs",
                //         "description": "CustomList",
                //     }]
                // }, {
                //     "id": 8,
                //     "label": "Templates",
                //     "selected":false,"url":null,testBool:true,
                //     "description": "Template Manager",
                //     "children": [{
                //         "id": 9,
                //         "label": "TemplateList",
                //         "selected":true,"url":"/doc_templates",
                //         "description": "Template Manager",
                //     }]
                // }, {
                //     "id": 10,
                //     "label": "Bussiness",
                //     "selected":true,"url":null,testBool:true,
                //     "description": "Bussiness Manager",
                //     "children": [{
                //         "id": 11,
                //         "label": "BussinessList",
                //         "selected":true,"url":null,testBool:true,
                //         "description": "BussinessList",
                //         "children": [{
                //             "id": 12,
                //             "label": "Currenciesssssssss",
                //             "selected":true,"url":"/currencies",
                //             "description": "Currencies",
                //         }, {
                //             "id": 13,
                //             "label": "Dealtypesaaaaaaa",
                //             "selected":true,"url":"/dealtypes",
                //             "description": "Dealtypes",
                //         }]
                //     }, {
                //         "id": 14,
                //         "label": "Products",
                //         "selected":true,"url":null,testBool:true,
                //         "description": "Products",
                //         "children": [{
                //             "id": 15,
                //             "label": "ProductTypes",
                //             "selected":true,"url":"/productTypes",
                //             "description": "ProductTypes",
                //         }, {
                //             "id": 16,
                //             "label": "ProductList",
                //             "selected":true,"url":"/products",
                //             "description": "ProductList",
                //         }]
                //     }]
                // }
                ],


            }
        },
        mounted(){


            window.TREE_GRID_DEMO=this

//
//
//
            // setTimeout(()=>{

            // console.log('this.testData1220---:',this.testData1220)


                this.$refs.PCref.refreshTreeTable(this.testData1220)
                this.advancedRelevanceStrategyTest.onChecked.syncChilds=true
            // },2000)
//
//
//
//
//             let parseUrl= function (href) {
//                 var url = href || location.href
//                 var a = document.createElement('a')
//                 a.href = url
//                 var ret = {},
//                     seg = a.search.replace(/^\?/, '').split('&'),
//                     len = seg.length, i = 0, s
//                 for (; i < len; i++) {
//                     if (!seg[i]) {
//                         continue
//                     }
//                     s = seg[i].split('=')
//                     ret[s[0]] = s[1]
//                 }
//                 return ret
//             }
//             let urlQueryMap=parseUrl()
//             this.activeName=urlQueryMap.tab||'!警告'
//             this.urlQueryMap=urlQueryMap
//             console.log('urlQueryMap-:',urlQueryMap)
//             console.log("$refs.treeGrid",this.$refs.treeGrid)
//
//
//
// //                this.bigData=bigData.result[urlQueryMap.data=='app'?'APP':'PC']
//
//
// //        @mounted="$refs.treeGrid.refreshTreeTable(bigData)"
//
//
//
//
//             this.constructor.prototype.BX&&this.BX.call(this,'setCurrentVM')
        },
        methods:{
            lightId1(){
                let self=this
                this.$refs.treeGrid.changeSelectedRadio(1)
                setTimeout(function(){ self.log('all checked nodes:',self.$refs.treeGrid.getCheckedNodes()) })
            },
            updateRowsTest(){
                let allNodes=this.$refs.treeGrid.getAllNodes()
              console.log('all nodes:',JSON.stringify(allNodes))

                allNodes[0].type=allNodes[0].type+'a'
                 allNodes[0].state=!allNodes[0].state

//                this.$refs.treeGrid.changeSelectedRadio(allNodes[0].id)

//                this.$refs.treeGrid.updateRows([
//                    {
//                        index:0,
//                        updateFields:{
//                            type:allNodes[0].type+'a',
//                            state:!allNodes[0].state
//                        }
//                    }
//                ])

                this.$refs.treeGrid.updateRows([allNodes[0]],['type','state'])

                this.updateVirtualTreeMethod()

                console.log('all nodes again:',JSON.stringify(this.$refs.treeGrid.getAllNodes()))
            },
            reRenderTreeByCheckedNodes(){
                let allCheckedNodes=this.$refs.PCref.getCheckedNodes(true)

                console.log('allCheckedNodes---:',allCheckedNodes)

                this.$refs.PCref.refreshTreeTable(allCheckedNodes,false)
            },
            refreshDataTest1(){
                this.$refs.treeGrid.refreshTreeTable([])
            },
            refreshDataTest(){

                // this.$refs.treeGrid.refreshTreeTable([{"id":11,"groupId":1,"permissionId":1,"resourceName":"业务系统管理","resourceDesc":null,"belong":null,"parentId":-1,"url":"","tag":"1","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":14,"groupId":1,"permissionId":4,"resourceName":"组织管理","resourceDesc":null,"belong":null,"parentId":1,"url":"","tag":"4","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":19,"groupId":1,"permissionId":9,"resourceName":"组织结构定义","resourceDesc":null,"belong":null,"parentId":4,"url":"","tag":"9","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[]},{"id":20,"groupId":1,"permissionId":10,"resourceName":"管理员管理","resourceDesc":null,"belong":null,"parentId":4,"url":"","tag":"10","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":28,"groupId":1,"permissionId":18,"resourceName":"管理员管理","resourceDesc":null,"belong":null,"parentId":10,"url":"","tag":"18","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":81,"groupId":1,"permissionId":71,"resourceName":"新增","resourceDesc":null,"belong":null,"parentId":18,"url":"","tag":"71","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[{"id":89,"groupId":1,"permissionId":79,"resourceName":"调整管理集团","resourceDesc":null,"belong":null,"parentId":71,"url":"","tag":"79","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]},{"id":82,"groupId":1,"permissionId":72,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":18,"url":"","tag":"72","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[{"id":91,"groupId":1,"permissionId":81,"resourceName":"调整管理时效","resourceDesc":null,"belong":null,"parentId":72,"url":"","tag":"81","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":92,"groupId":1,"permissionId":82,"resourceName":"调整管理集团","resourceDesc":null,"belong":null,"parentId":72,"url":"","tag":"82","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]},{"id":83,"groupId":1,"permissionId":73,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":18,"url":"","tag":"73","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":84,"groupId":1,"permissionId":74,"resourceName":"启用","resourceDesc":null,"belong":null,"parentId":18,"url":"","tag":"74","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":85,"groupId":1,"permissionId":75,"resourceName":"停用","resourceDesc":null,"belong":null,"parentId":18,"url":"","tag":"75","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":86,"groupId":1,"permissionId":76,"resourceName":"锁定","resourceDesc":null,"belong":null,"parentId":18,"url":"","tag":"76","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":87,"groupId":1,"permissionId":77,"resourceName":"解锁","resourceDesc":null,"belong":null,"parentId":18,"url":"","tag":"77","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":88,"groupId":1,"permissionId":78,"resourceName":"重置密码","resourceDesc":null,"belong":null,"parentId":18,"url":"","tag":"78","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":90,"groupId":1,"permissionId":80,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":18,"url":"","tag":"80","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]},{"id":29,"groupId":1,"permissionId":19,"resourceName":"集团管理员功能管理","resourceDesc":null,"belong":null,"parentId":10,"url":"","tag":"19","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":93,"groupId":1,"permissionId":83,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":19,"url":"","tag":"83","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]}]},{"id":21,"groupId":1,"permissionId":11,"resourceName":"业务委托关系定义","resourceDesc":null,"belong":null,"parentId":4,"url":"","tag":"11","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[]}]}]},{"id":12,"groupId":1,"permissionId":2,"resourceName":"基础平台管理","resourceDesc":null,"belong":null,"parentId":-1,"url":"","tag":"2","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":13,"groupId":1,"permissionId":3,"resourceName":"权限管理","resourceDesc":null,"belong":null,"parentId":2,"url":"","tag":"3","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":15,"groupId":1,"permissionId":5,"resourceName":"用户管理","resourceDesc":null,"belong":null,"parentId":3,"url":"","tag":"5","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":25,"groupId":1,"permissionId":15,"resourceName":"用户管理","resourceDesc":null,"belong":null,"parentId":5,"url":"/permission/userManage","tag":"15","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":49,"groupId":1,"permissionId":39,"resourceName":"新增","resourceDesc":null,"belong":null,"parentId":15,"url":"","tag":"userManager_add","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[{"id":50,"groupId":1,"permissionId":40,"resourceName":"角色","resourceDesc":null,"belong":null,"parentId":39,"url":"","tag":"userManager_add_role","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[{"id":51,"groupId":1,"permissionId":41,"resourceName":"添加角色","resourceDesc":null,"belong":null,"parentId":40,"url":"","tag":"userManager_add_role_addRole","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":52,"groupId":1,"permissionId":42,"resourceName":"时效调整","resourceDesc":null,"belong":null,"parentId":40,"url":"","tag":"userManager_add_role_adjustTime","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]},{"id":53,"groupId":1,"permissionId":43,"resourceName":"特殊授权","resourceDesc":null,"belong":null,"parentId":39,"url":"","tag":"userManager_add_spcialAuth","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[{"id":54,"groupId":1,"permissionId":44,"resourceName":"功能权限","resourceDesc":null,"belong":null,"parentId":43,"url":"","tag":"userManager_add_spcialAuth_func","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[{"id":55,"groupId":1,"permissionId":45,"resourceName":"添加权限","resourceDesc":null,"belong":null,"parentId":44,"url":"","tag":"45","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]},{"id":56,"groupId":1,"permissionId":46,"resourceName":"组织权限","resourceDesc":null,"belong":null,"parentId":43,"url":"","tag":"userManager_add_spcialAuth_org","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[{"id":57,"groupId":1,"permissionId":47,"resourceName":"添加组织权限","resourceDesc":null,"belong":null,"parentId":46,"url":"","tag":"47","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]},{"id":58,"groupId":1,"permissionId":48,"resourceName":"数据权限","resourceDesc":null,"belong":null,"parentId":43,"url":"","tag":"userManager_add_spcialAuth_data","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[{"id":59,"groupId":1,"permissionId":49,"resourceName":"添加数据权限","resourceDesc":null,"belong":null,"parentId":48,"url":"","tag":"49","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]}]}]},{"id":60,"groupId":1,"permissionId":50,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":15,"url":"","tag":"userManager_list_update","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[{"id":61,"groupId":1,"permissionId":51,"resourceName":"分配角色","resourceDesc":null,"belong":null,"parentId":50,"url":"","tag":"51","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[{"id":62,"groupId":1,"permissionId":52,"resourceName":"调整角色","resourceDesc":null,"belong":null,"parentId":51,"url":"","tag":"52","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":63,"groupId":1,"permissionId":53,"resourceName":"时效调整","resourceDesc":null,"belong":null,"parentId":51,"url":"","tag":"53","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]},{"id":64,"groupId":1,"permissionId":54,"resourceName":"特殊授权","resourceDesc":null,"belong":null,"parentId":50,"url":"","tag":"54","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[{"id":65,"groupId":1,"permissionId":55,"resourceName":"分配功能权限","resourceDesc":null,"belong":null,"parentId":54,"url":"","tag":"55","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[{"id":66,"groupId":1,"permissionId":56,"resourceName":"调整权限","resourceDesc":null,"belong":null,"parentId":55,"url":"","tag":"56","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]},{"id":67,"groupId":1,"permissionId":57,"resourceName":"分配组织权限","resourceDesc":null,"belong":null,"parentId":54,"url":"","tag":"57","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[{"id":68,"groupId":1,"permissionId":58,"resourceName":"调整组织权限","resourceDesc":null,"belong":null,"parentId":57,"url":"","tag":"58","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]},{"id":69,"groupId":1,"permissionId":59,"resourceName":"分配数据权限","resourceDesc":null,"belong":null,"parentId":54,"url":"","tag":"59","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[{"id":70,"groupId":1,"permissionId":60,"resourceName":"调增数据权限","resourceDesc":null,"belong":null,"parentId":59,"url":"","tag":"60","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]}]}]},{"id":71,"groupId":1,"permissionId":61,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":15,"url":"","tag":"userManager_list_delete","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":72,"groupId":1,"permissionId":62,"resourceName":"启用","resourceDesc":null,"belong":null,"parentId":15,"url":"","tag":"userManager_list_up","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":73,"groupId":1,"permissionId":63,"resourceName":"停用","resourceDesc":null,"belong":null,"parentId":15,"url":"","tag":"userManager_list_down","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":74,"groupId":1,"permissionId":64,"resourceName":"锁定","resourceDesc":null,"belong":null,"parentId":15,"url":"","tag":"userManager_list_lock","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":75,"groupId":1,"permissionId":65,"resourceName":"解锁","resourceDesc":null,"belong":null,"parentId":15,"url":"","tag":"userManager_list_unlock","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":76,"groupId":1,"permissionId":66,"resourceName":"重置密码","resourceDesc":null,"belong":null,"parentId":15,"url":"","tag":"userManager_list_reset","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]}]},{"id":16,"groupId":1,"permissionId":6,"resourceName":"角色管理","resourceDesc":null,"belong":null,"parentId":3,"url":"","tag":"6","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":24,"groupId":1,"permissionId":14,"resourceName":"角色管理","resourceDesc":null,"belong":null,"parentId":6,"url":"","tag":"14","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":31,"groupId":1,"permissionId":21,"resourceName":"新增","resourceDesc":null,"belong":null,"parentId":14,"url":"","tag":"21","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[{"id":32,"groupId":1,"permissionId":22,"resourceName":"功能权限","resourceDesc":null,"belong":null,"parentId":21,"url":"","tag":"22","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[]},{"id":33,"groupId":1,"permissionId":23,"resourceName":"组织权限","resourceDesc":null,"belong":null,"parentId":21,"url":"","tag":"23","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[]}]},{"id":42,"groupId":1,"permissionId":32,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":14,"url":"","tag":"32","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[{"id":43,"groupId":1,"permissionId":33,"resourceName":"功能权限","resourceDesc":null,"belong":null,"parentId":32,"url":"","tag":"33","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[]},{"id":44,"groupId":1,"permissionId":34,"resourceName":"组织权限","resourceDesc":null,"belong":null,"parentId":32,"url":"","tag":"34","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[]},{"id":45,"groupId":1,"permissionId":35,"resourceName":"用户","resourceDesc":null,"belong":null,"parentId":32,"url":"","tag":"35","subject":"PC","type":"页签","status":0,"state":true,"childFuncs":[{"id":46,"groupId":1,"permissionId":36,"resourceName":"调整用户","resourceDesc":null,"belong":null,"parentId":35,"url":"","tag":"36","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]},{"id":47,"groupId":1,"permissionId":37,"resourceName":"调整用户时效","resourceDesc":null,"belong":null,"parentId":35,"url":"","tag":"37","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]}]},{"id":48,"groupId":1,"permissionId":38,"resourceName":"删除","resourceDesc":null,"belong":null,"parentId":14,"url":"","tag":"38","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]}]},{"id":17,"groupId":1,"permissionId":7,"resourceName":"授权管理","resourceDesc":null,"belong":null,"parentId":3,"url":"","tag":"7","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[]},{"id":18,"groupId":1,"permissionId":8,"resourceName":"权限设置","resourceDesc":null,"belong":null,"parentId":3,"url":"","tag":"8","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":22,"groupId":1,"permissionId":12,"resourceName":"权限参数配置-集团级参数设置","resourceDesc":null,"belong":null,"parentId":8,"url":"","tag":"12","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":94,"groupId":1,"permissionId":84,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":12,"url":"","tag":"84","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]},{"id":23,"groupId":1,"permissionId":13,"resourceName":"权限参数配置-按钮/页签权限启用","resourceDesc":null,"belong":null,"parentId":8,"url":"","tag":"13","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[{"id":95,"groupId":1,"permissionId":85,"resourceName":"修改","resourceDesc":null,"belong":null,"parentId":13,"url":"","tag":"85","subject":"PC","type":"按钮","status":0,"state":true,"childFuncs":[]}]},{"id":26,"groupId":1,"permissionId":16,"resourceName":"管理维度启用","resourceDesc":null,"belong":null,"parentId":8,"url":"","tag":"16","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[]},{"id":27,"groupId":1,"permissionId":17,"resourceName":"系统权限启用","resourceDesc":null,"belong":null,"parentId":8,"url":"","tag":"17","subject":"PC","type":"菜单","status":0,"state":true,"childFuncs":[]}]}]}]}]
                // )

                this.$refs.treeGrid.refreshTreeTable([{
                    "id": 1,
                    "label": "System"+Math.random().toFixed(2),
                    "selected":true,"url":null,testBool:true,
                    "description": "System Manager",
                    "children": [{
                        "id": 2,
                        "label": "base",
                        "selected":false,"url":null,testBool:true,
                        "description": "Base Manager",
                        "children": [{
                            "id": 3,

                            "label": "Menus",
                            "selected":true,"url":"/menus",
                            "description": "menu manager",
                            "children":[{
                                "id": 17,
                                "label": "Menus17",
                                "selected":false,"url":"/menus17",
                                "description": "menu manager17",
                            }]
                        }, {
                            "id": 4,
                            "label": "Rolessssssss",
                            "selected":false,"url":"/roles",
                            "description": "Role Manager",
                        }, {
                            "id": 5,
                            "label": "Userssssss",
                            "selected":false,"url":"/users",
                            "description": "User Manager",
                        }]
                    }]
                }, {
                    "id": 6,
                    "label": "Customs",
                    "selected":false,"url":null,testBool:true,
                    "description": "Custom Manager",
                    "children": [{
                        "id": 7,
                        "label": "CustomList",
                        "selected":false,"url":"/customs",
                        "description": "CustomList",
                    }]
                }, {
                    "id": 8,
                    "label": "Templates",
                    "selected":false,"url":null,testBool:true,
                    "description": "Template Manager",
                    "children": [{
                        "id": 9,
                        "label": "TemplateList",
                        "selected":true,"url":"/doc_templates",
                        "description": "Template Manager",
                    }]
                }, {
                    "id": 10,
                    "label": "Bussiness",
                    "selected":true,"url":null,testBool:true,
                    "description": "Bussiness Manager",
                    "children": [{
                        "id": 11,
                        "label": "BussinessList",
                        "selected":true,"url":null,testBool:true,
                        "description": "BussinessList",
                        "children": [{
                            "id": 12,
                            "label": "Currenciesssssssss",
                            "selected":true,"url":"/currencies",
                            "description": "Currencies",
                        }, {
                            "id": 13,
                            "label": "Dealtypesaaaaaaa",
                            "selected":true,"url":"/dealtypes",
                            "description": "Dealtypes",
                        }]
                    }, {
                        "id": 14,
                        "label": "Products",
                        "selected":true,"url":null,testBool:true,
                        "description": "Products",
                        "children": [{
                            "id": 15,
                            "label": "ProductTypes",
                            "selected":true,"url":"/productTypes",
                            "description": "ProductTypes",
                        }, {
                            "id": 16,
                            "label": "ProductList",
                            "selected":true,"url":"/products",
                            "description": "ProductList",
                        }]
                    }]
                }])
            },
            insertTwoChildrenTest(){
                this.$refs.treeGrid.insertChildRows(10,[{
                    "id": 12333,
                    "label": "Currenciessssssssaaaaaaaaaaaa",
                    "selected":true,"url":"/currencies",
                    "description": "Currenciesaa",


                    children:[
                        {
                            "id": 12333444,
                            "label": "Currenciesssssssscccc",
                            "selected":true,"url":"/currencies",
                            "description": "Currenciesccc",
                            children:[
                                {
                                    "id": 1233666,
                                    "label": "Currenciesdddddddddd",
                                    "selected":true,"url":"/currencies",
                                    "description": "Currencieddddddddd",
                                }
                            ]
                        }
                    ]

                }, {
                    "id": 13333333,
                    "label": "Dealtypesaaaaaaaaa",
                    "selected":true,"url":"/dealtypes",
                    "description": "Dealtypesaa",
                }])
            },
            insertFourSiblingsTest(){

                this.$refs.treeGrid.insertSiblingRows(10,[{
                    "id": 12333,
                    "label": "Currenciessssssssaaaaaaaaaaaa",
                    "selected":true,"url":"/currencies",
                    "description": "Currenciesaa",


                    children:[
                        {
                            "id": 12333444,
                            "label": "Currenciesssssssscccc",
                            "selected":true,"url":"/currencies",
                            "description": "Currenciesccc",
                            children:[
                                {
                                    "id": 1233666,
                                    "label": "Currenciesdddddddddd",
                                    "selected":true,"url":"/currencies",
                                    "description": "Currencieddddddddd",
                                }
                            ]
                        }
                    ]

                }, {
                    "id": 13333333,
                    "label": "Dealtypesaaaaaaaaa",
                    "selected":true,"url":"/dealtypes",
                    "description": "Dealtypesaa",
                }])
            },
            log(){
                for(var i=0;i<arguments.length;i++){
                    console.log('第'+(i+1)+'个参数----------:',arguments[i])
                }
            },
            updateVirtualTreeMethod(){
              this.virutalModel=JZY.u.copy(this.$refs.PCref.getVirtualTreeNodes())
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
