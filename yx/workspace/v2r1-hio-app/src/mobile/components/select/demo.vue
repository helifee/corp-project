<template>
    <div>
        <div @click="open">选择人员</div>
        <div>
            <ul>
                <li v-for="(item,index) in list">
                    {{item.newname}}
                </li>
            </ul>
        </div>
        <selectUser 
        v-if="showSelect"
        :selectedList='demoList'
        :showType='showType'
        :active='active'
        @closeSelect="open()" 
        @setResult="getResult"></selectUser>
    </div>
</template>
<script>
   import selectUser from '@mobile/components/select/m_select.vue'

export default {
    components: {
            selectUser
        },
    data(){
        return {
           
            //external 显示外部
            //dept
            //role
            showType:[
                {"code":"person",
                    "multi" : true,
                    'serviceName':'GLOBAL.YANG_NING',
                    url:"/project/projectTeamPerson/queryProjectTeamPersonByProjectId/102241",
                    ajaxType:'GET'  //不传时默认POST
                },{
                    "code" : "external",
                    "multi" : true,
                },
                'dept',
                {"code":"role","multi" : true}
            ],
            // showType:["person","external",'dept'],
            active : "person",
            //自定义
            // showType:[{
            //         "code":  "person",
            //         "typeCode" : "type",
            //         "type" : "user",
            //         "multi" : true,
            //         "key" : "sid",
            //         "name" : "name"
            //         "child" : "children"
            //         "title" : "外部"
            //         },{
            //         "code":  "external",
            //         "typeCode" : "type",
            //         "multi" : true,
            //         "type" : "user",
            //         "key" : "sid",
            //         "name" : "name"
            //         "child" : "children"
            //         "title" : "内部"
            //         },
            //         {
            //         "code":  "dept",
            //         "type" : "dept",
            //         "multi" : true,
            //         "typeCode" : "type",
            //         "key" : "sid",
            //         "name" : "name"
            //         "child" : "children"
            //         "title" : "部门"
            //         },
            //         {
            //         "code":  "role",
            //         "type" : "role",
            //         "multi" : true,
            //         "typeCode" : "type",
            //         "key" : "sid",
            //         "name" : "name"
            //         "child" : "children"
            //         "title" : "角色"
            //         }
            //     ],
            showSelect : false,
            list : [],
            demoList : []
        }
    },
    methods:{
         open (){
             this.showSelect = !this.showSelect;
             this.demoList = [
                //  {
                //  type : "user",
                //  sid : "999",
                //  key : 'sid'
                // }
             ];
             this.list.forEach( element =>{
                 let type = element.type == "external" ? "user" : element.type;
                 this.demoList.push({
                     type : type || 'role',
                     sid : element.sid || element.roleId,
                     key : 'sid',
                     newname : element.newname
                 })
             }) 
         },
         getResult(item){
             this.list = item;
         }
     }   
}
</script>

