<template>
    <div class="group_tree">
        <group-tree
          :selectedDeptsToTree="deptList"
          :selectedRolesToTree="roleList"
          :selectedUsersToTree="userList"
          :tagButtons="tagButtons"
          @getDataFromGroupTree = "getDataFromGroupTree"
        >
        </group-tree>
    </div>
</template>

<script>
    export default{
        data(){
            return {
              tagButtons:['dept','role','user'],//部门、角色、用户，默认三个，可不传值
              deptList:[{//已选择的部门
                sid:'1002',
                name:'市场部'
              },{
                sid:'1003',
                name:'人事部'
              }],
              roleList:[{//已选择的角色
                  roleId:'1003',
                  roleName:'销售经理'
              }],
              userList:[{//已选择的用户
                // nodeId:'e08fa8dcfb0f443fb8d09437e7a60aca',
                sid:'1000',
                name:'创建者'
              }],


            }
        },
        methods:{
          //接收组合树组件的返回值
          getDataFromGroupTree:function(obj){
            console.info("getDataFromGroupTree")
            console.info(obj)
          },
        },
    }
</script>
<style scoped lang="scss">
</style>