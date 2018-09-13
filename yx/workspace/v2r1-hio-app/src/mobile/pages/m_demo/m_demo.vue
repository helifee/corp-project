<template>
    <div class="bx-demo" style="height:100%;">

        <div style="height:100%;">



            <tab :line-width=2 active-color='#fc378c' v-model="index">
                <tab-item class="vux-center" :selected="demo2 === 1" @click="demo2 = 1">小于1屏</tab-item>
                <tab-item class="vux-center" :selected="demo2 === 2" @click="demo2 = 2">大于1屏</tab-item>
                <!--<tab-item class="vux-center" :selected="demo2 === 2" @click="demo2 = 2">http请求</tab-item>-->
                <!--<tab-item class="vux-center" :selected="demo2 === 3" @click="demo2 = 3">img等静态资源加载</tab-item>-->
                <!--<tab-item class="vux-center" :selected="demo2 === 4" @click="demo2 = 4">toast demo</tab-item>-->
            </tab>
            <swiper class="load-more-swiper" style="overflow-y:scroll;height:calc(100% - 44px );"
                    v-model="index"  :show-dots="false">
                <swiper-item style="height:100%;">

                    <!--<scroller lock-x :scrollbar-y='true'>-->
                        <!--<div class="box1">-->
                            <!--<div class="box1-item" v-for="i in 30"><span>{{' ' + i + ' '}}</span></div>-->
                        <!--</div>-->
                    <!--</scroller>-->

                    <!--aaa-->

                    <scroller
                            :pulldown-config="pulldownConfig"
                            lock-x 
                            height="-40"
                              @on-pulldown-loading="onScrollTop1"
                              :use-pulldown="true"
                              @on-scroll-bottom="onScrollBottom1"
                              ref="scrollerBottom"
                              :scroll-bottom-offst="200">
                        <div class="box2">
                            <!--<load-more v-if="onFetchingTop" tip="top loading"></load-more>-->


                            <div>评论以上的内容</div>
                            <div>评论以上的内容</div>
                            <div>评论以上的内容</div>
                            <div>评论以上的内容</div>
                            <div>评论以上的内容</div>
                            <p v-for="i in bottomCount">placeholder {{i}}</p>
                            <load-more v-if="onFetching" tip="获取更多"></load-more>
                            <divider v-if="isAllListLoaded">我是有底线的</divider>

                        </div>
                    </scroller>



                    <!--<div>-->
                        <!--<div style="display:block;margin-top:30px;">当前语言配置：{{currentLanguage}}</div>-->
                        <!--<div v-for="n in 50" style="display:block;margin-top:30px;">当前语言配置：{{currentLanguage}}</div>-->
                        <!--&lt;!&ndash;<div style="display:block;margin-top:30px;">加载本模块locale:{{ l('addToMyFavorite') }}</div>&ndash;&gt;-->
                        <!--&lt;!&ndash;<div style="display:block;margin-top:30px;">加载全局locale:{{l('{global.foo}')}}</div>&ndash;&gt;-->

                        <!--&lt;!&ndash;<button @click="JZY.locale.switchLanguage('en')">switch to english</button>&ndash;&gt;-->
                        <!--&lt;!&ndash;<button @click="JZY.locale.switchLanguage('zh-CN')">switch to chinese</button>&ndash;&gt;-->
                        <!--&lt;!&ndash;<button>js中locale用法参考文档：http://192.168.3.57:4000/archives/</button>&ndash;&gt;-->

                    <!--</div>-->
                </swiper-item>
                <swiper-item style="height: 100%">
                    <div>some other test</div>
                    <div>some other test</div>
                    <div>some other test</div>
                    <div>some other test</div>
                    <!--<div id="wrapper">-->
                        <!--<div id="scroller">-->
                            <!--<ul id="thelist">-->
                                <!--<li>Pretty row 1</li>-->
                                <!--<li>Pretty row 2</li>-->
                                <!--<li>Pretty row 3</li>-->
                                <!--<li>Pretty row 4</li>-->
                                <!--<li>Pretty row 5</li>-->
                                <!--<li>Pretty row 6</li>-->
                                <!--<li>Pretty row 7</li>-->
                                <!--<li>Pretty row 8</li>-->
                                <!--<li>Pretty row 9</li>-->
                                <!--<li>Pretty row 10</li>-->
                                <!--<li>Pretty row 11</li>-->
                                <!--<li>Pretty row 12</li>-->
                                <!--<li>Pretty row 13</li>-->
                                <!--<li>Pretty row 14</li>-->
                                <!--<li>Pretty row 15</li>-->
                                <!--<li>Pretty row 16</li>-->
                                <!--<li>Pretty row 17</li>-->
                                <!--<li>Pretty row 18</li>-->
                                <!--<li>Pretty row 19</li>-->
                                <!--<li>Pretty row 20</li>-->
                                <!--<li>Pretty row 21</li>-->
                                <!--<li>Pretty row 22</li>-->
                                <!--<li>Pretty row 23</li>-->
                                <!--<li>Pretty row 24</li>-->
                                <!--<li>Pretty row 25</li>-->
                                <!--<li>Pretty row 26</li>-->
                                <!--<li>Pretty row 27</li>-->
                                <!--<li>Pretty row 28</li>-->
                                <!--<li>Pretty row 29</li>-->
                                <!--<li>Pretty row 30</li>-->
                                <!--<li>Pretty row 31</li>-->
                                <!--<li>Pretty row 32</li>-->
                                <!--<li>Pretty row 33</li>-->
                                <!--<li>Pretty row 34</li>-->
                                <!--<li>Pretty row 35</li>-->
                                <!--<li>Pretty row 36</li>-->
                                <!--<li>Pretty row 37</li>-->
                                <!--<li>Pretty row 38</li>-->
                                <!--<li>Pretty row 39</li>-->
                                <!--<li>Pretty row 40</li>-->
                            <!--</ul>-->
                        <!--</div>-->
                    <!--</div>-->
                </swiper-item>
                <!--<swiper-item >-->
                    <!--<div style="margin-top:30px;">普通请求手段-->

                    <!---->
                            <!--<x-button @click.native="JZY.xhr.request('/test')">单独url字符串</x-button>-->

                            <!--<x-button @click.native="JZY.xhr.request({type:'post',url:'/test_post'})">对象格式的请求(写法1)</x-button>-->
                            <!--<x-button @click.native="JZY.xhr.post('/test_post',{foo:'bar'})">对象格式的请求(写法2)(.post方法只适用于单个请求)</x-button>-->

                            <!--<x-button @click.native="-->
                                            <!--JZY.xhr.request(['/test',{type:'post',url:'/test_post'}])-->
                                    <!--">数组格式的请求，字符串对象混用</x-button>-->

                            <!--<x-button @click.native="-->
                                     <!--JZY.xhr.request('/test_fail')-->
                                <!--">xhr.request一个失败的请求</x-button>-->

                            <!--<x-button @click.native="request404()">404的请求</x-button>-->
                            <!--<x-button @click.native="JZY.xhr.request(['/test_fail_get',{type:'post',url:'/test_fail_post'}])">并发请求超过2个请求，全部失败的默认情况</x-button>-->
                            <!--<x-button @click.native="-->
                                <!--JZY.xhr.requestPromises([JZY.xhr.request(['/test_fail_get']),-->
                                <!--JZY.xhr.request([{type:'post',url:'/test_fail_post'}])])">-->
                                <!--并发请求超过2个请求（promise arr），全部失败的默认情况</x-button>-->
                            <!--<x-button @click.native="custormRequestArrError()">模拟一批失败的请求，不让它报错，自己定义错误(2中写法)</x-button>-->

                    <!--</div>-->


                        <!--<div style="margin-top:30px;">使用绝对路径url-->


                            <!--<x-button @click.native="JZY.xhr.request('404')">url不加/直接请求本host（反模式，项目中请不要这样）</x-button>-->
                            <!--<x-button @click.native="request404()">使用http://开头即视为绝对路径（反模式，项目中请不要这样）</x-button>-->
                        <!--</div>-->

                        <!--<div style="margin-top:30px;">请求和赋值一体-->
                            <!--<x-button @click.native="testCallInterFaceAndSetData()">请求一批数据，并设定数据到vm上某个属性</x-button>-->
                            <!--<x-button @click.native="testCallInterFaceAndSetDataWithCache()">请求一批数据，并设定数据到vm上某个属性（带缓存）</x-button>-->
                        <!--</div>-->
                        <!--<div style="margin-top:30px;">缓存和节流-->
                            <!--<x-button @click.native="JZY.xhr.request('/test',true)">带缓存的请求(内存缓存)</x-button>-->
                            <!--<x-button @click.native="JZY.xhr.request('/test',true);JZY.xhr.request('/test',true)">同一个需要缓存的接口请求两次，network只显示一个（节流）</x-button>-->
                        <!--</div>-->
                        <!--<div style="margin-top:30px;">url转换过程的理解之自定义host-->
                            <!--<x-button @click.native="request404()">默认host</x-button>-->
                            <!--<x-button @click.native="JZY.xhr.hostRequest('/test','GLOBAL_TEST')">自定义host(推荐写法，也可通过调用request方法；此方法也支持缓存和错误控制)</x-button>-->
                        <!--</div>-->
                        <!--<div style="margin-top:30px;">向数据库post数据-->
                            <!--<x-button @click.native="JZY.xhr.post('/test_post',{foo:'bar'})">发起一个成功请求默认情况</x-button>-->

                            <!--<x-button @click.native="JZY.xhr.post('/test_fail',{foo:'bar'})">发起一个失败请求默认情况</x-button>-->
                            <!--<x-button @click.native="testFailPost()">发起一个失败请求，并不让它报错，自己定义错误警告</x-button>-->
                        <!--</div>-->
                        <!--<div style="margin-top:30px;">put和delete请求-->

                            <!--<x-button @click.native="JZY.xhr.put('/test_put')">put请求</x-button>-->
                            <!--<x-button @click.native="JZY.xhr.drop('/test_delete')">delete请求</x-button>-->
                        <!--</div>-->
                    <!---->
                    <!---->
                <!--</swiper-item>-->
                <!--<swiper-item>-->
                    <!--<img src="/mobilestatic/images/404.jpg" />-->
                    <!--<img :src="JZY.c.m_imgPath+'/404.jpg'" />-->
                <!--</swiper-item>-->
                <!--<swiper-item>-->
                    <!--<toast-demo></toast-demo>-->
                <!--</swiper-item>-->
            </swiper>
        </div>

    </div>
</template>



<script>

    // JZY.locale.add('m_demoLocale',require('./m_demo.locale'))
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,Group,
        Cell,
        LoadMore } from 'vux'
    const list = () => ['精选', '美食', '电影', '酒店', '外卖']
    import { Scroller } from 'vux'
    import toastDemo from './toastDemo.vue'

    export default {
        components: {
            Scroller,
            toastDemo,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
            Group,
            Cell,
            LoadMore
        },
        data () {
            return {
                isAllListLoaded:false,
                pulldownConfig:{
                    content: '下滑刷新',
                    height: 60,
                    autoRefresh: false,
                    downContent: '下滑刷新',
                    upContent: '松开手以刷新',
                    loadingContent: '加载中...',
                },
                showList1: true,
                scrollTop: 0,
                onFetching: false,
                onFetchingTop:false,
                bottomCount: 40,
                testData1:{
                    outerFoo:{
                        innerFoo:null
                    }
                },
                currentLanguage:'',
                index01: 0,
                list2: list(),
                demo2: '美食',
                list3: ['收到的消息', '发出的消息'],
                demo3: '收到的消息',
                list4: ['正在放映', '即将上映'],
                demo4: '即将上映',
                demoDisabled: 'A',
                index: 0,
                index2:0,
                getBarWidth: function (index) {
                    return (index + 1) * 22 + 'px'
                }
            }
        },
        async mounted(){

            // await JZY.s.getScript('http://cubiq.org/dropbox/iscroll4/src/iscroll.js')
            //
            // var myScroll = new iScroll('wrapper');

            JZY.locale.getCurrentLanguage()
                .then((res)=>{
                    this.currentLanguage=res
                })
        },
        methods: {
            onScrollBottom1 () {
                if(this.isAllListLoaded){
                    return false
                }
                if (this.onFetching) {
                    // do nothing
                } else {
                    this.onFetching = true
                    setTimeout(() => {
                        this.bottomCount += 10

                        if(this.bottomCount>40){
                            this.isAllListLoaded=true
                        }

                        this.$nextTick(() => {
                            this.$refs.scrollerBottom.reset()
                        })
                        this.onFetching = false
                    }, 1000)
                }
            },
            onScrollTop1 () {
                console.log('on scroll top was invoked')
                if (this.onFetchingTop) {
                    // do nothing
                } else {
                    this.onFetchingTop = true
                    setTimeout(() => {

                        this.$refs.scrollerBottom.donePulldown()
                        console.log("on scroll top was invoked")
                        this.onFetchingTop = false
                    }, 1000)
                }
            },
            onScroll (pos) {
                this.scrollTop = pos.top
            },
            onCellClick () {
                window.alert('cell click')
            },
            onClickButton () {
                window.alert('click')
            },
            changeList () {
                this.showList1 = false
                this.$nextTick(() => {
                    this.$refs.scroller.reset({
                        top: 0
                    })
                })
            },
            testCallInterFaceAndSetDataWithCache(){
                JZY.xhr.callInterfaceAndSetData({type:'post',url:'/test_post'},this.testData1,'outerFoo.innerFoo',true)
                    .then((res)=>{
                        JZY.s.clog('res--:',res,this.testData1)
                    })
            },
            testCallInterFaceAndSetData(){

                // JZY.xhr.callInterfaceAndSetData({type:'post',url:'/test_post'},testData1,'outerFoo',true)"

                JZY.xhr.callInterfaceAndSetData('/test',this.testData1,'outerFoo.innerFoo')
                    .then((res)=>{
                        JZY.s.clog('res--:',res)
                    })
            },
            custormRequestArrError(){
                JZY.xhr.requestPromises([JZY.xhr.request(['/test_fail_get'],false,false),
                    JZY.xhr.request([{type:'post',url:'/test_fail_post'}],false,false)],false)

                    .catch((e)=>{
                        alert("this is my custom error1")
                    })


                JZY.xhr.request(['/test_fail_get',{type:'post',url:'/test_fail_post'}],false,false)
                    .catch((e)=>{
                        alert("this is my custom error2")
                    })

            },
            request404(){

                JZY.xhr.request({type:'post',url:location.origin+'/404'})
            },
            testFailPost(){



                this.JZY.xhr.post('/test_fail',{foo:'bar'},{alertError:false}).then((e)=>{
                    alert('成功')
                }).catch((e)=>{
                    alert("fail")
                })

                this.JZY.xhr.post('/test_post',{foo:'bar'},{alertError:false}).then((e)=>{
                    alert('成功')
                }).catch((e)=>{
                    alert("fail")
                })
            },
            switchTabItem (index) {
                console.log('on-before-index-change', index)
                this.$vux.loading.show({
                    text: 'loading'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                    this.index01 = index
                }, 1000)
            },
            onItemClick (index) {
                console.log('on item click:', index)
            },
            addTab () {
                if (this.list2.length < 5) {
                    this.list2 = list().slice(0, this.list2.length + 1)
                }
            },
            removeTab () {
                if (this.list2.length > 1) {
                    this.list2 = list().slice(0, this.list2.length - 1)
                }
            },
            next () {
                if (this.index === this.list2.length - 1) {
                    this.index = 0
                } else {
                    ++this.index
                }
            },
            prev () {
                if (this.index === 0) {
                    this.index = this.list2.length - 1
                } else {
                    --this.index
                }
            }
        }
    }
</script>

<style lang="scss">
    /*@import '~vux/src/styles/1px.less';*/
    /*@import '~vux/src/styles/center.less';*/



    /*.load-more-swiper .vux-swiper{*/
        /*height:100% !important;*/
    /*}*/

    .bx-demo{

        .vux-slider > .vux-swiper{
            overflow:visible;
        }



    }



</style>