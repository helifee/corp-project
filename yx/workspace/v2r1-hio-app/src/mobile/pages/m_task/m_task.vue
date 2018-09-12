<template>
    <div class="m_task m_task_wrap">
      <!--页头，tab标签切换-->
      <tab :line-width='2' active-color='#009EFF' v-model="taskTabActiveIndex" style="margin-bottom: 10px">
        <tab-item class="vux-center" :selected="taskTabActive === item" v-for="(item, index) in taskList" @on-item-click="tabClick(item,index)" :key="index">{{item}}</tab-item>
      </tab>

      <!--task列表-->
      <!-- scrollTop: {{scrollTop}} -->
      <load-more class="reflash_newdata" tip="加载最新数据" :show-loading="false" v-if="tableData.length > 0"></load-more>
          
      <scroller lock-x scrollbar-y  height="-110px" :scroll-bottom-offset="-50" @on-scroll="onScroll" @on-scroll-bottom="onScrollBottom"  ref="scrollerEvent">
          <swiper class="task_list_content" v-model="taskTabActiveIndex" :show-dots="false" :min-moving-distance="120" :height="taskListHeight">
            <swiper-item v-for="(item, index) in taskList" :key="index">
              <div class="table" :name="index">
                  <task-list-view
                    :data ="tableData"
                    :moduleName='taskTabActiveName'
                    @setTaskFollow = "setTaskFollow"
                    @refleshTable = "refleshTable">
                  </task-list-view>
              </div>
              <!-- <div class="tab-swiper vux-center">{{item}} Container</div> -->
            </swiper-item>
          </swiper>

          <load-more tip="loading" v-if="moreData"></load-more>

          <load-more tip="没有更多数据" :show-loading="false" v-else></load-more>

      </scroller>
      <!-- <x-button type="primary" @click.native="$refs.scrollerEvent.reset({top:0})">回到首页</x-button> -->



      <!-- <div class="box">
        <x-button @click.native="taskTabActiveIndex=0" :disabled="taskTabActiveIndex === 0" type="primary">go to 0</x-button>
        <x-button @click.native="taskTabActiveIndex=1" :disabled="taskTabActiveIndex === 1" type="primary">go to 1</x-button>

        <x-button @click.native="addTab" :disabled="taskList.length === 5" type="primary">Add tab item</x-button>
        <x-button @click.native="removeTab" :disabled="taskList.length <= 2" type="primary">Remove tab item</x-button>
        <x-button @click.native="next" type="primary">Active next current: {{taskTabActiveIndex}}</x-button>
        <x-button @click.native="prev" type="primary">Active prev current: {{taskTabActiveIndex}}</x-button>
      </div> -->

      <footer-view
        :footerList = "footerList"
        @create = "create"
        @filter = "filter">
      </footer-view>


      <!--任务筛选弹出窗-->
      <actionsheet
          v-model="showFilterOperate"
          :menus="moreFilterList"
          @on-click-menu="clickMoreOperate"
          @on-click-menu-delete="onDeleteMoreOperate"
          show-cancel>
          <div slot="header"><p style="color: #999;font-size: 15px">筛选</p></div>
      </actionsheet>

    </div>
</template>

<script>
    import { Tab, TabItem, XButton, Swiper, SwiperItem, Scroller, LoadMore, AlertModule, Actionsheet, } from 'vux'
    import taskListView from '@mobile/pages/m_task/components/m_taskListView.vue'
    import footerView from '@mobile/components/m_public/m_footer.vue'
    import { getTaskList, getAdminTaskList, setFollow, setCancelFollow, } from '@mobile/pages/m_task/getData'

//    '任务管理'

    export default{
        name:"m_task",
        components: {
          Tab,
          TabItem,
          XButton,
          Swiper,
          SwiperItem,
          Scroller,
          LoadMore,
          Actionsheet,
          taskListView,
          footerView,
        },
        data(){
            return {
                taskList: ['我创建的', '我负责的', '我参与的', '我关注的', '共享给我的', ],
                taskListHeight: '960px',
                taskTabActive: '我创建的',
                taskTabActiveName: 'task',//模块名称
                taskTabActiveIndex: 0,


                scrollTop: 0,//上下滚动的位置距离
                onTopState: false,//是否滚动到顶部加载最新
                onFetching: false,//是否滚动到底部

                moreData:false,//有更多数据


                tableData:[],//我创建的列表数据

                inputSearch:{//搜索缓存
                  taskName:'',//任务名称
                  taskStatus:''//任务状态
                },
                pageNum:'1', //当前页码
                pageCount:10, //分页大小
                dataTotal: 0,   //数据总条数

                footerList:[{
                  name:'创建任务',
                  value:'create',
                },{
                  name:'筛选任务',
                  value:'filter',
                }],//底部固定导航栏

                showFilterOperate:false,//任务筛选弹出窗
                taskStatus:'',//缓存任务状态
                moreFilterList: {
                   // 'title.noop': '更多',
                    '$a$': '<span style="color: #1AAD19 ">全部</span>',
                    '$a$0': '未完成',
                    '$a$1': '已完成',
                    '$a$2': '已关闭',
                    '$a$3': '超期'
                },
                // {
                //     label: '全部',
                //     value: ''
                // }, {
                //     label: '未完成',
                //     value: '0'
                // }, {
                //     label: '已完成',
                //     value: '1'
                // }, {
                //     label: '已关闭',
                //     value: '2'
                // }, {
                //     label: '超期',
                //     value: '3'
                // }
                orgType: '',//1为正常企业 2为合作企业；
            }
        },
        props:{
          projectId:{//项目模块调用此组件用的项目id
            type:String,
            default:''
          },
        },
        beforeCreated(){
        },
        methods:{
            /**
             * 获取任务列表
             * type操作类型 0：我创建的 1：我负责的 2：我参与的 3：我关注的 4：共享给我的
             * taskStatus任务状态 0:未完成 1:已完成 2:已关闭 3:超期
            */
            async getTaskListData( {type = this.taskTabActiveIndex ,projectId = this.projectId ,taskName = '' ,taskStatus = this.taskStatus ,pageNum = '1' ,pageCount=10 ,orderby = [] } = {} ){
                let res = {}
                // alert(this.taskTabActiveName)
                if (this.taskTabActiveName == 'set') {
                  res = await getAdminTaskList( taskName ,taskStatus ,pageNum ,pageCount ,orderby )
                }else{
                  res = await getTaskList( type.toString() ,projectId ,taskName ,taskStatus ,pageNum ,pageCount ,orderby  , this.taskTabActiveName)
                }
                this.dataTotal = res[0].total //数据总条数
                if (res[0].list.length != 0) {
                  // this.$emit('getPageTotal',res[0].total)  //给项目调用任务组件回传list总数
                  this.tableData = [ ...this.tableData, ...res[0].list ]
                }
                // debugger
                //动态设置内容高度，获取的数据list的条数
                this.setScrollHeihgt( this.tableData.length )
            },
            //查询任务
            searchTaskList( taskStatus = '' ){
              // console.info(obj)
              // this.inputSearch = { //缓存搜索记录
              //   taskName:obj.taskName,
              //   taskStatus:obj.taskStatus
              // }
              this.tableData = []
              this.taskStatus = taskStatus   //缓存搜索记录
              this.getTaskListData( {'taskStatus':taskStatus } )

            },
            //任务列表排序
            sortTaskList(orderby){
              // console.log(orderby)
              this.getTaskListData( {'taskName':this.inputSearch.taskName,'taskStatus':this.inputSearch.taskStatus, 'pageNum':this.pageNum, 'pageCount':this.pageCount ,'orderby':[orderby]} )
            },
            //刷新table，刷新右侧导航栏里的条数
            refleshTable( { pageNum = '1' ,pageCount=10 } = {} ){
              this.pageNum = pageNum
              this.pageCount = pageCount
              this.getTaskListData( { 'taskName':this.inputSearch.taskName,'taskStatus':this.inputSearch.taskStatus, 'pageNum':pageNum, 'pageCount':pageCount } )
            },
            //关注任务
            async setTaskFollow(row){
                if (row.isfollow == false) {//关注
                    let res = await setFollow(row.taskId)
                    console.info(res[0])
                    if (res[0] == 1 ) {
                        row.isfollow = true
                        this.showModuleAuto('','关注成功')
                        // if (this.moduleName == 'concern') {//关注模块需要刷新table
                        //     this.$emit('refleshTable',page)
                        // }
                    }
                }else{//取消关注
                    let res = await setCancelFollow(row.taskId)
                    console.info(res[0])
                    if (res[0] == 1 ) {
                        row.isfollow = false
                        this.showModuleAuto( '','取消关注成功')
                        // if (this.moduleName == 'concern') {//关注模块需要刷新table
                        //     this.$emit('refleshTable',page)
                        // }
                    }
                }
                console.info(row.isfollow)
            },
            //创建任务
            create(){
              // alert('创建任务')
              this.$router.push({
                path:'/m_task/m_create_task'
              })
            },
            //筛选任务
            filter(){
              this.showFilterOperate = true
            },
            //任务筛选选项点击事件,执行相应的操作
            clickMoreOperate (key) {
              const tempKey = key.split('$a$')[1]
              // debugger
              if ( tempKey !== undefined ) {
                this.searchTaskList( tempKey )
              }
            },
            //关闭任务筛选弹出窗事件
            onDeleteMoreOperate () {
              this.showFilterOperate = false
            },
            
            //获取当前模块名称
            getModuleName (value){
                switch (value) {
                    case 0:
                        return 'task';
                    case 1:
                        return 'own';
                    case 2:
                        return 'join';
                    case 3:
                        return 'concern';
                    case 4:
                        return 'share';
                    case 5:
                        return 'set';
                    default:
                        return '--';
                }
            },
            //tab标签的切换事件
            tabClick( item ,index ){
              this.taskTabActive = item
              this.taskTabActiveIndex = index
              this.tableData = []
              // console.info(this.taskTabActiveIndex)
            },
            // addTab () {
            //   if (this.taskList.length < 5) {
            //     this.taskList = list().slice(0, this.taskList.length + 1)
            //   }
            // },
            // removeTab () {
            //   if (this.taskList.length > 1) {
            //     this.taskList = list().slice(0, this.taskList.length - 1)
            //   }
            // },
            // next () {
            //   if (this.taskTabActiveIndex === this.taskList.length - 1) {
            //     this.taskTabActiveIndex = 0
            //   } else {
            //     ++this.taskTabActiveIndex
            //   }
            // },
            // prev () {
            //   if (this.taskTabActiveIndex === 0) {
            //     this.taskTabActiveIndex = this.taskList.length - 1
            //   } else {
            //     --this.taskTabActiveIndex
            //   }
            // },

            //上下滚动事件
            onScroll (pos) {
              this.scrollTop = pos.top
              if ( this.scrollTop < -50 ) {//下拉加载最新的事件
                
                if (this.onTopState) {
                  // do nothing
                } else {
                  this.onTopState = true
                  setTimeout(() => {
                    //动态加载内容
                    // this.tableData = []
                    // this.scrollTop = 0
                    // this.pageNum = '1' //当前页码
                    // this.pageCount = 10 //分页大小
                    // this.dataTotal =  0  //数据总条数

                    // this.getTaskListData() //获取各模块的数据列表


                    this.$nextTick(() => {
                      //动态设置内容高度
                      // this.setScrollHeihgt()
                      //设置滚动的位置
                      this.$refs.scrollerEvent.reset()
                    })
                    this.onTopState = false
                  }, 2000)
                }

              }
            },
            //上下滚动，是否滚动到底部事件
            onScrollBottom () {
              console.info('上下滚动，是否滚动到底部事件')
              if (this.onFetching) {
                // do nothing
              } else {//上拉加载更多的事件
                //动态加载内容
                if (this.dataTotal !=0 && Number(this.pageNum)*this.pageCount < this.dataTotal) {

                  this.onFetching = true
                  this.moreData = true
                  const page = {
                      pageNum:(++this.pageNum).toString(),
                      pageCount:this.pageCount
                  }
                  this.refleshTable( page )

                  //获取数据list的条数
                  const listCount = Number(this.pageNum)*this.pageCount < this.dataTotal ? Number(this.pageNum)*this.pageCount : this.dataTotal
                  this.$nextTick(() => {
                    //动态设置内容高度,新获取的数据list的条数
                    this.setScrollHeihgt( listCount )
                    //设置滚动的位置，滚动到下一个10条的第一条位置
                    this.$refs.scrollerEvent.reset({top: this.scrollTop + 96 })

                    this.onFetching = false
                    this.moreData = false
                  })

                }else{
                  this.moreData = false
                }
              }
            },
            //设置datalist的高度，count当前数据的总条数
            setScrollHeihgt( count = 0 ){
                let container = this.$refs.scrollerEvent//滚动最外层div对象
                let containerContent = this.$refs.scrollerEvent.$children['0'].$el.children['0']//内容区域dom对象
                console.info( document.documentElement.clientHeight )


                // let viewH = container.clientHeight;//可见高度
                let contentH = container.$el.scrollHeight;//内容高度 
                // alert(container.styles.height)
                container.styles.height =  document.documentElement.clientHeight - 110 +'px';
                // alert(container.styles.height)
                //当前已加载内容的高度
                this.taskListHeight = count * 96  + 'px';

                // debugger
                containerContent.style.height = this.taskListHeight 
            },

            //显示alert弹出窗
            showModule ( title = '' ,content = '' ) {
              AlertModule.show({
                title: title,
                content: content,
                onShow () {
                  console.log('Module: I\'m showing')
                },
                onHide () {
                  console.log('Module: I\'m hiding now')
                }
              })
            },
            showModuleAuto ( title = '' ,content = '' ) {
              this.showModule( title, content )
              setTimeout(() => {
                AlertModule.hide()
              }, 3000)
            },


        },
        mounted(){
            document.title = '我的任务'
            let taskSet = JZY.s.hasMenuPermisson('task_manage','modify');
            if(taskSet){
                this.taskList.push('任务管理')
            }
            //初始化数据
            this.getTaskListData()

            this.$nextTick(() => {
              //设置滚动的位置
              this.$refs.scrollerEvent.reset({top: 0})
              // debugger
            })


            //orgType，1为正常企业 2为合作企业
            this.orgType = this.$route.query.orgType
            if( this.orgType == 1 ){
                this.footerList = [{
                  name:'创建任务',
                  value:'create',
                },{
                  name:'筛选任务',
                  value:'filter',
                }]
            }else if( this.orgType == 2 ){
                this.footerList = [{
                  name:'筛选任务',
                  value:'filter',
                }]//底部固定导航栏
            }
        },
        watch:{
          taskTabActiveIndex(newValue, oldValue){

              this.scrollTop = 0
              this.pageNum = '1' //当前页码
              this.pageCount = 10 //分页大小
              this.dataTotal =  0  //数据总条数


              this.taskTabActiveName = this.getModuleName( newValue )

              this.tableData = []
              this.getTaskListData() //获取各模块的数据列表
              this.$nextTick(() => {
                //动态设置内容高度,获取的数据list的条数
                // this.setScrollHeihgt( this.tableData.length )
                //设置滚动的位置
                this.$refs.scrollerEvent.reset({ top:0 })
                // debugger
              })
          },
          taskStatus(newValue, oldValue){
            console.info(newValue)
            console.info(oldValue)
            this.moreFilterList = [{
              label: '全部',
              type: newValue === '' ? 'primary':'',
              value: '$a$'
            },{
              label: '未完成',
              type: newValue === '0' ? 'primary':'',
              value: '$a$0'
            },{
              label: '已完成',
              type: newValue === '1' ? 'primary':'',
              value: '$a$1'
            },{
              label: '已关闭',
              type: newValue === '2' ? 'primary':'',
              value: '$a$2'
            },{
              label: '超期',
              type: newValue === '3' ? 'primary':'',
              value: '$a$3'
            }]
          },
          data:{
    　　　　handler(newValue, oldValue) {
                // console.info(oldValue)
                console.info("newValue",newValue)
    　　　　},
    　　　　deep: true
          },
        }
    }
</script>
<style lang="scss">
.m_task.m_task_wrap{
  position:relative;
  border-top: 1px solid #D9D9D9;
    .reflash_newdata{
      position: absolute;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
    }
    .vux-tab-warp{
      margin-bottom:10px;
    }
    .task_list_content{
      overflow: auto;
    }
    .weui-actionsheet__action{
        .weui-actionsheet__cell{
            color: #999999;
        }
    }
}
</style>