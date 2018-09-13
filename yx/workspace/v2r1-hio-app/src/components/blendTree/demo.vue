<template>
  <div style="width:80%;margin:30px auto;border:1px solid #ccc;padding:30px;">
    <!--混合树组件-->
    <!--

    一、入参说明如下：
    1、ref：Strng类型，组件的引用名称，必填且不重复；
    2、enable-checked-multiple：Boolean类型，开启多选模式，默认true，即可以多选
    3、filterDataUrl：Object类型，选人接口的切换，此对象三个属性都为空或者不添加此对象，默认调用后端固定人员接口；
    4、tagButtons：Array类型，['user','dept','role','userOutside']，可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）；
    5、activeTab：String类型，组件初始化进入的tab标签，默认进入user页面；
    6、workStatus：Number类型，查询人员范围，默认1，即只查在职人员。0-查询未确认人员；1-只查在职人员；2-查询离职人员；3-查询未邀请人员；4-包含未确认和在职人员；5-包含离职和在职人员;6-包含未确认、在职、离职;
    7、readOnly:Boolean类型，只读模式，默认false是可编辑模式；true：不允许添加和删除人员；
    8、resultDataListShow: Boolean类型，结果列表是否显示，默认true展示，组合树返回已选数据项，是否展示
    9、fromMoudle：String类型，默认为空''，如果是日程的共享人选择，此参数为'schedule'即可，其他人无视此属性；
    10、selectedDataToTree：Object类型，已选数据对象，其属性包括“userList、deptList、roleList、userOutsideList”四项，每个数组中的对象，必须包含两个属性，sid和name传入，如下所示：
        selectedDataToTree = {//已选树节点
          userList:[{
            sid:'100207',
            name:'许国平'
          },{
            sid: '100676',
            name: '杜百兴'
          }],
          deptList:[{
            sid: '1004',
            name: '人事部'
          }],
          roleList:[{//建议角色入参统一为sid和name，但是也兼容之前的入参方式roleId、roleName。
            sid: '1001',
            name: '系统管理员'
          }],
          // roleList:[{//此方式也兼容
          //   roleId: '1001',
          //   roleName: '系统管理员'
          // }],
          userOutsideList:[]
        },

    二、插槽说明：
    1、目前唯一的插槽“add_button”是点击的图标，其中click方法是打开组件弹出窗的事件，写法固定（替换组件的引用名称即可）

    三、输出说明：
    1、getDataFromTree：该方法接收组件的返回值；方法的参数是Object类型，其属性包括“userList、deptList、roleList、userOutsideList”四项，每项是一个对象数组，必返回，可为空；如下所示：
        // obj样例数据如下：
            obj = {
                "userList":[
                    {
                        "nodeId":"100208",
                        "name":"对面的",
                        "realName":"对面的",
                        "email":"",
                        "sex":"男",
                        "workStatus":"job",
                        "organizationName":"pc牛逼团队",
                        "position":null,
                        "mobile":"17610178770",
                        "organizationId":"1001",
                        "imUserId":"3cc30cf2a2a143ae84bac17167c3174a",
                        "isLeader":null,
                        "isDefault":null,
                        "resourceImgUrl":null,
                        "pinyinFirst":"dmd",
                        "pinyinFull":"duimiande",
                        "sid":"100208",
                        "type":"user",
                        "state":true
                    },
                    {
                        "nodeId":"100345",
                        "name":"刘根斌",
                        "realName":"刘根斌",
                        "email":"",
                        "sex":"男",
                        "workStatus":"job",
                        "organizationName":"pc牛逼团队",
                        "position":null,
                        "mobile":"18610798015",
                        "organizationId":"1001",
                        "imUserId":"aaf7846718a04f5096b117b6f27eaa19",
                        "isLeader":null,
                        "isDefault":null,
                        "resourceImgUrl":null,
                        "pinyinFirst":"lgb",
                        "pinyinFull":"liugenbin",
                        "sid":"100345",
                        "type":"user",
                        "state":true
                    }
                ],
                "deptList":[
                    {
                        "parentId":"1001",
                        "nodeId":"9",
                        "children":[

                        ],
                        "name":"销售部",
                        "sort":1,
                        "code":"001001",
                        "prefixSort":"A00001-B00001",
                        "prefixId":"1001/1002",
                        "status":"1",
                        "prefixName":"pc牛逼团队/销售部",
                        "type":"dept",
                        "imUserId":null,
                        "sex":null,
                        "email":null,
                        "mobile":null,
                        "pinyinFirst":null,
                        "pinyinFull":"xiaoshoubu",
                        "userCount":"0",
                        "canSelected":false,
                        "default":false,
                        "sid":"1002",
                        "state":true
                    },
                    {
                        "parentId":"1001",
                        "nodeId":"11",
                        "children":[

                        ],
                        "name":"人事部",
                        "sort":3,
                        "code":"001003",
                        "prefixSort":"A00001-B00003",
                        "prefixId":"1001/1004",
                        "status":"1",
                        "prefixName":"pc牛逼团队/人事部",
                        "type":"dept",
                        "imUserId":null,
                        "sex":null,
                        "email":null,
                        "mobile":null,
                        "pinyinFirst":null,
                        "pinyinFull":"renshibu",
                        "userCount":"2",
                        "canSelected":false,
                        "default":false,
                        "sid":"1004",
                        "state":true
                    }
                ],
                "roleList":[
                    {
                        "roleId":"1002",
                        "roleName":"销售员",
                        "roleUserCount":"0",
                        "createTime":"2018-05-14 18:16:00",
                        "roleRemark":"销售员",
                        "sid":"1002",
                        "name":"销售员",
                        "type":"role",
                        "state":true
                    },
                    {
                        "roleId":"1001",
                        "roleName":"系统管理员",
                        "roleUserCount":"7",
                        "createTime":"2018-05-14 18:16:00",
                        "roleRemark":"超级管理员",
                        "sid":"1001",
                        "name":"系统管理员",
                        "type":"role",
                        "state":true
                    }
                ],
                "userOutsideList":[
                    {
                        "nodeId":"100107",
                        "name":"外部联系人",
                        "realName":"外部联系人",
                        "email":"",
                        "sex":"男",
                        "workStatus":"job",
                        "organizationName":"外部联系人",
                        "position":"哈哈哈",
                        "mobile":"18514476718",
                        "organizationId":"-1",
                        "imUserId":"b59cc32247b04102a59b68dd99868d82",
                        "isLeader":null,
                        "isDefault":null,
                        "resourceImgUrl":null,
                        "pinyinFirst":"wblxr",
                        "pinyinFull":"waibulianxiren",
                        "externalLabel":"",
                        "externalCompany":"外部公司哈哈哈哈",
                        "sid":"100107",
                        "type":"userOutside",
                        "state":true
                    }
                ]
            }
    四、注意事项：
    1、同一页面同时使用两棵以上的混合树组件，建议独立多次引入此组件，不掺和的原则；
    2、入参selectedDataToTree：千万不要在组件树输出的方法中动态修改此入参，正确用法是在mounted中copy一个此入参，在输出方法中将组件的返回值深拷贝给copy变量，在表单提交的时候，用copy变量即可；
    3、其他待续。。。

    -->

    <!--全局组件的使用-->
    <blend-tree
        ref= "xxxTree"
        :enable-checked-multiple = "enableCheckedMultiple"
        :filterDataUrl = "filterDataUrl"
        :tagButtons="tagButtons"
        :activeTab = "activeTab"
        :workStatus = "workStatus"
        :readOnly = "readOnly"
        :resultDataListShow = "resultDataListShow"
        :fromMoudle="fromMoudle"
        :selectedDataToTree = "selectedDataToTree"
        @getDataFromTree = "getDataFromTree">
        <!--添加按钮图标的插槽-->
        <div slot="add_button">
          <i class="el-icon-circle-plus" @click.stop = "$refs.xxxTree.blendTreeDialogShow()"></i>
        </div>
        <!--日程共享人专用-->
        <template slot-scope="user">
            <span class="tmpl">
              <el-checkbox v-if="user.data.hasOwnProperty('scheduleTitleShow')" v-model="user.data.scheduleTitleShow"></el-checkbox>
            </span>
        </template>
    </blend-tree>

    <!--不用插槽的情况下，触发组件的方式-->
    <el-button @click="$refs.xxxTree.blendTreeDialogShow()">open混合树(触发方式2)</el-button>

<p>--------------------------------------------------------我是分界线----------------------------------------------------------</p>
    <!--同一页面同时使用第二棵混合树组件-->
    <!--混合树2-->
    <blend-tree
        ref= "xxxTree2"
        :selectedDataToTree = "selectedDataToTree2"
        :enable-checked-multiple = "enableCheckedMultiple2"
        :tagButtons="tagButtons2"
        :activeTab = "activeTab2"
        @getDataFromTree = "getDataFromTree2">
    </blend-tree>
    <el-button @click="$refs.xxxTree2.blendTreeDialogShow()">open混合树2(点击打开)</el-button>

<p>--------------------------------------------------------我是分界线----------------------------------------------------------</p>

    <h1>以下为高级用法，前期可不用或少用，有坑</h1>

    <!-- 以下为高级用法，前期可不用或少用，有坑 -->
    <el-button @click="xxxTreeChange">动态切换xxxTree的入参</el-button>
    <el-button @click="xxxTreeChange2">动态切换xxxTree的入参2</el-button>


  </div>
</template>

<script>
    export default{
        data(){
            return {
              selectedDataToTree:{//已选树节点
                userList:[{
                  sid: '100676',
                  name: '杜百兴杜百兴杜百兴杜百兴杜百兴',
                  name1: '杜百兴1',
                  name2: '杜百兴2',
                  scheduleTitleShow:true
                }],
                deptList:[{
                  sid: '1004',
                  name: '人事部'
                }],
                roleList:[{//建议角色入参统一为sid和name，但是也兼容之前的入参方式roleId、roleName。
                  sid: '1001',
                  name: '系统管理员'
                }],
                // roleList:[{//此方式也兼容
                //   roleId: '1001',
                //   roleName: '系统管理员'
                // }],
                userOutsideList:[]
              },
              workStatus:1,//人员状态，默认值是1，0-查询未确认人员；1-只查在职人员；2-查询离职人员；3-查询未邀请人员；4-包含未确认和在职人员；5-包含离职和在职人员;6-包含未确认、在职、离职;7、在职、离职 （包含删除人员）
              enableCheckedMultiple:false,//人员树是否可以多选
              tagButtons:['user','dept','role','userOutside'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
              activeTab:'dept',//初始化激活的tab标签
              readOnly:false,//只读模式，默认false是可编辑模式；true：不允许添加和删除人员
              resultDataListShow:true,//组合树返回已选数据项，是否展示，默认true展示
              fromMoudle:'schedule',//日程共享人专用


              filterDataUrl:{
                host:'',
                type:'',
                url:''
              },//过滤数据源，获取新data的接口。通过watch此对象实现的动态加载树


              selectedDataToTree2:{//已选树节点
                userList:[{
                  sid: '1001',
                  name: '裴银辉'
                }],
              },
              enableCheckedMultiple2:true,//人员树是否可以多选
              tagButtons2:['user'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
              activeTab2:'user',//初始化激活的tab标签
              
            }
        },
        methods:{

          //接收混合树组件的返回值
          getDataFromTree( obj = {} ){
            console.info(obj)
            console.info(JSON.stringify(obj))
            // debugger
          },

          //接收混合树组件的返回值
          getDataFromTree2( obj = {} ){
            console.info(obj)
            console.info(JSON.stringify(obj))
            // debugger
          },







          //以下为高级用法，前期可不用或少用，有坑


          //动态切换xxxTree的入参
          xxxTreeChange(){
            // this.selectedDataToTree = {//已选树节点
            //   userList:[{
            //       sid: '1001',
            //       name: '裴银辉'
            //     }],
            //   deptList:[],
            //   roleList:[],
            //   userOutsideList:[]
            // }
            this.enableCheckedMultiple = false//人员树不可以多选
            this.activeTab = 'userOutside'//初始化激活的tab标签
            this.tagButtons = ['user','userOutside']//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人

            // this.filterDataUrl.url = '/project/projectTeamPerson/queryProjectTeamPersonByProjectIdBak20180628/2654406'
            this.filterDataUrl = {
                host:'GLOBAL.YANG_NING',
                type:'get',
                 url:'/project/projectTeamPerson/queryProjectTeamPersonByProjectIdBak20180628/2654406'
                // url:'/project/projectTeamPerson/queryProjectTeamPersonByProjectId/2654406'
            },

            this.$refs.xxxTree.blendTreeDialogShow()
          },

          //动态切换xxxTree的入参2
          xxxTreeChange2(){
            this.selectedDataToTree = {//已选树节点
              userList:[{
                  sid: '100676',
                  name: '杜百兴'
                }],
              deptList:[{
                sid: 10,
                name: '三级 1-1-2 部门'
              }],
              roleList:[],
              userOutsideList:[]
            }
            this.enableCheckedMultiple = true//人员树是否可以多选
            this.activeTab = 'user'//初始化激活的tab标签
            this.tagButtons = ['user']//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人


            this.filterDataUrl = {
              host:'',
              type:'',
              url:''
            }

            this.$refs.xxxTree.blendTreeDialogShow()
          },
          
        },
        mounted(){

        },
    }
</script>
<style scoped lang="scss">
</style>