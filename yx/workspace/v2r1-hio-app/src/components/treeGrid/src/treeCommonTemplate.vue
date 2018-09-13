<style>
    .fw-tree-table .el-checkbox__inner::after,.fw-tree-table .el-checkbox__inner{
        transition:none
    }
    .tree-table-parent-with-data .el-table__empty-block{
        display:none;
    }
    .tree-table-parent-with-data .tree-label.radio-tree-label,.checkbox-tree-label{
        max-width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        height: 14px;
        line-height: 12px;
    }
    .tree-table-parent-with-data .tree-label.checkbox-tree-label{
        max-width: 150px;
        /* overflow: hidden; */
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        height: 12px;
        line-height: 12px;
    }
</style>
<template>
    <div>
        <Component is="el-table-column" ref="tableColumn" :prop="vm.prop" :label="vm.label" :width="vm.width" :show-overflow-tooltip="vm.showOverflowTooltip">
            <template slot-scope="scope">

            <!--v-if="vm.isInitialDataTransformEnd"-->
            <span v-if="scope.row.$extra" v-show=" !scope.row.hasOwnProperty('isShow') || scope.row.isShow === vm.isShow " :style="{paddingLeft : vm.paddingLeft(scope.row)}">

                <i @click.prevent="vm.toggleExpandChildsByIndex(scope.$index)" v-if="vm.remote || (vm.showArraw&&vm.hasChild(scope.row))" :class="vm.icon(scope.row)"></i>

                    <!--允许勾选情况-->
                    <span v-bind:style="{marginLeft:vm.hasChild(scope.row)?'0':'18px'}" v-if="vm.enableCheck">
                        <span v-if="!vm.isVirtualTree" >
                            <!--vm.disabledDeepth.includes(scope.row.deepth)||-->
                            <!--如果disabled deepth数组中包含该deepth,或者该节点时一个文件夹，但是声明了enableCheckedFolder=false(不允许勾选文件夹)-->
                            <span @click="$nextTick(function(){ !vm.isNodeDisabled(scope.row) && (vm.$emit('checkboxClick',scope.row)) })">
                                <el-checkbox :disabled="vm.isNodeDisabled(scope.row) || scope.row.iDisabled"
                                             @change="vm.handleTreeCheckboxClick(scope.row,scope.$index)"
                                             :indeterminate="scope.row.$extra.indeterminate"
                                             v-if="vm.enableCheckedMultiple"
                                             v-model="scope.row[vm.checkedKey]"></el-checkbox>
                            </span>


                            <!--处理有checkbox的多选-->
                            <span :title="scope.row[vm.prop]" class="tree-label checkbox-tree-label" style="cursor:pointer;"
                                  v-if="!vm.isVirtualTree&&vm.enableCheckedMultiple" @click="vm.handleLabelClick(scope.row)">
                                {{scope.row[vm.prop]}}
                                <slot :row="scope.row"></slot>
                            </span>

                            <!--处理单选-->
                            <span v-if="!vm.enableCheckedMultiple">
                                <span @click="$nextTick(function(){ !vm.isNodeDisabled(scope.row) && (vm.$emit('radioClick',scope.row)) })">
                                    <el-radio-group v-model="vm.radioTreeKeyModel">
                                        <el-radio :disabled="vm.isNodeDisabled(scope.row)|| scope.row.iDisabled" :label="scope.row[vm.treeKey]">
                                            &nbsp;
                                        </el-radio>
                                    </el-radio-group>
                                </span>

                                <span :title="scope.row[vm.prop]" class="tree-label radio-tree-label" @click="vm.handleLabelClick(scope.row)">{{scope.row[vm.prop]}}</span>
                                <slot :row="scope.row"></slot>

                            </span>

                        </span>
                        <span v-if="vm.isVirtualTree" class="tree-label" :title="scope.row[vm.prop]">
                            <el-checkbox
                                :disabled="vm.isNodeDisabled(scope.row)"
                                :indeterminate="scope.row.$extra.indeterminate"
                                v-model="scope.row[vm.checkedKey]">{{scope.row[vm.prop]}}</el-checkbox>
                        </span>

                    </span>

                    <!--不允许勾选时情况-->
                    <span v-bind:style="{marginLeft:vm.hasChild(scope.row)?'0':'18px'}" v-if="!vm.enableCheck">
                        <span :title="scope.row[vm.prop]" class="tree-label"  :style="{ cursor:vm.treeLableCursor}"  @click="vm.handleLabelClick(scope.row)">{{scope.row[vm.prop]}}</span>
                        <slot :row="scope.row"></slot>
                    </span>

                </span>



            </template>
        </Component>
    </div>

</template>
<script>
    export default {
        props:{
            vm:Object
        },
        mounted(){
            // console.info(this.vm)
        }
    }
</script>
