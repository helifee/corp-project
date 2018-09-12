<template>
    <div class="m_task m_task_wrap">
      <load-more class="reflash_newdata" tip="加载最新数据" :show-loading="false"  v-if="tableData.length > 0"></load-more>
      <scroller lock-x scrollbar-y  height="-60px" :scroll-bottom-offset="-50" @on-scroll="onScroll" @on-scroll-bottom="onScrollBottom"  ref="scrollerEvent">
          <div class="table">
              <task-list-view
                :data ="tableData"
                :moduleName='taskTabActiveName'
                @setTaskFollow = "setTaskFollow"
                @refleshTable = "refleshTable">
              </task-list-view>
          </div>

          <load-more tip="loading" v-if="moreData"></load-more>

          <load-more tip="没有更多数据" :show-loading="false" v-else></load-more>

      </scroller>
      
      <footer-view
              v-if="permission"
        :footerList = "footerList"
        @create = "create">
      </footer-view>
    </div>
</template>

<script>
    import { Tab, TabItem, XButton, Swiper, SwiperItem, Scroller, LoadMore, AlertModule, } from 'vux'
    import taskListView from '@mobile/pages/m_task/components/m_taskListView.vue'
    import footerView from '@mobile/components/m_public/m_footer.vue'
    import { getTaskFromProjectList, getAdminTaskList, setFollow, setCancelFollow, } from '@mobile/pages/m_task/getData'

    const list = () => []
    
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
          taskListView,
          footerView,
        },
        data(){
            return {
                taskList: list(),
                permission:'',
                taskListHeight: '960px',
                taskTabActive: '我创建的',
                taskTabActiveName: 'taskForProject',//模块名称
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
                }],//底部固定导航栏


                projectId:'',//项目模块调用此组件用的项目id
                projectName:'',//项目名称

                orgType: this.$route.query.orgType,//1为正常企业 2为合作企业；

            }
        },
        props:{
          
        },
        created(){
          this.projectId = this.$route.query.projectId  //从路由获取参数：项目id
//            4==共享人的时候没有创建权限
          this.permission = this.$route.query.permission!=4?true:false
        },
        methods:{
            /**
             * 获取任务列表
             * type操作类型 0：我创建的 1：我负责的 2：我参与的 3：我关注的 4：共享给我的
             * taskStatus任务状态 0:未完成 1:已完成 2:已关闭 3:超期
            */
            async getTaskListData( { projectId = this.projectId ,taskName = '' ,createPersonList = [] ,beginTime = '' , endTime = '', pageNum = '1' ,pageCount=10 ,orderby = [] } = {} ){
                let res = await getTaskFromProjectList( projectId ,taskName ,createPersonList , beginTime ,endTime ,pageNum ,pageCount ,orderby )
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
            searchTaskList(obj){
              // console.info(obj)
              this.inputSearch = { //缓存搜索记录
                taskName:obj.taskName,
                taskStatus:obj.taskStatus
              }
              this.getTaskListData( {'taskName':obj.taskName } )
            },
            //任务列表排序
            sortTaskList(orderby){
              // console.log(orderby)
              this.getTaskListData( {'taskName':this.inputSearch.taskName, 'pageNum':this.pageNum, 'pageCount':this.pageCount ,'orderby':[orderby]} )
            },
            //刷新table，刷新右侧导航栏里的条数
            refleshTable( { pageNum = '1' ,pageCount=10 } = {} ){
              this.pageNum = pageNum
              this.pageCount = pageCount
              this.getTaskListData( { 'taskName':this.inputSearch.taskName,'pageNum':pageNum, 'pageCount':pageCount } )
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
            async create(){
              // alert('创建任务')
              this.$router.push({
                path:'/m_task/m_create_task?projectId='+this.projectId
              })

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

                // let viewH = container.clientHeight;//可见高度
                let contentH = container.$el.scrollHeight;//内容高度 

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
            //初始化数据
            this.getTaskListData()

            this.$nextTick(() => {
              //设置滚动的位置
              this.$refs.scrollerEvent.reset({top: 0})
              // debugger
            })

            document.title = '任务列表'

            //orgType，1为正常企业 2为合作企业
            this.orgType = this.$route.query.orgType
            if( this.orgType == 1 ){
                this.footerList = [{
                  name:'创建任务',
                  value:'create',
                }]
            }else if( this.orgType == 2 ){
                this.footerList = []//底部固定导航栏
            }
        },
        watch:{
          taskTabActiveIndex(newValue, oldValue){

              this.tableData = []
              this.scrollTop = 0
              this.pageNum = '1' //当前页码
              this.pageCount = 10 //分页大小
              this.dataTotal =  0  //数据总条数


              this.taskTabActiveName = this.getModuleName( newValue )

              this.getTaskListData() //获取各模块的数据列表
              this.$nextTick(() => {
                //动态设置内容高度,获取的数据list的条数
                // this.setScrollHeihgt( this.tableData.length )
                //设置滚动的位置
                this.$refs.scrollerEvent.reset({ top:0 })
                // debugger
              })
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
<style scoped lang="scss">
.m_task.m_task_wrap{
  position:relative;
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
}
</style>