<template>
    <div class="dept_user approve">
        <el-tree
          :data="data2"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          ref="tree"
          highlight-current
          @check-change="handleCheckChange"
          :props="defaultProps">
        </el-tree>
        <!-- <div class="buttons">
          <el-button @click="getCheckedNodes">通过 node 获取</el-button>
          <el-button @click="getCheckedKeys">通过 key 获取</el-button>
          <el-button @click="setCheckedNodes">通过 node 设置</el-button>
          <el-button @click="setCheckedKeys">通过 key 设置</el-button>
          <el-button @click="resetChecked">清空</el-button>
        </div> -->
    </div>
</template>

<script>
    import config from '@/config/index.js'
    import mockData from '@MockData'

    export default{
        props: ['userListSelected'],
        data(){
            return {
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
            }
        },
        methods:{
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
                this.setUserSelectedList();
            },
            getCheckedNodes() {
                console.log(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
            },
            setCheckedNodes() {
                this.$refs.tree.setCheckedNodes([{
                  id: 5,
                  label: '二级 2-1'
                }, {
                  id: 9,
                  label: '三级 1-1-1'
                }]);
            },
            setCheckedKeys() {
                this.$refs.tree.setCheckedKeys([3]);
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
                // this.setUserSelectedList();
            },
            setUserSelectedList(){
                let newValue = this.$refs.tree.getCheckedNodes();
                // console.info(newValue)
                newValue = newValue.filter(function(item) {
                    return !item.hasOwnProperty('children');
                });
                this.$emit('update:userListSelected', newValue)
            },
            setCheckedByKeys(ids) {// 通过ids(数组)去设置选中
                this.$refs.tree.setCheckedKeys(ids);
            },
        },
        mounted(){
            this.setUserSelectedList();
            window.vue = this //chrome中console调试用，完事后可删除
        }
    }
</script>
<style scoped lang="scss">
$color:#303133;
$borderColor:#dcdfe6;
$blueColor:#409EFF;
.dept_user.approve{
  
  
}
</style>