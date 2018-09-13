<template>
    <div class="linker-box">
        <mCrmHeader titleName="联系人" :isShowPlus="isShowPlus" v-on:rightClick="gotoAddPage"></mCrmHeader>
        <mCrmSearch></mCrmSearch>
        <div class="link-list">
            <div class="layer-zizu">
                <span>A</span>
                <span>B</span>
                <span>C</span>
                <span>D</span>
                <span>E</span>
                <span>F</span>
                <span>G</span>
                <span>H</span>
                <span>I</span>
                <span>G</span>
                <span>K</span>
                <span>L</span>
                <span>M</span>
                <span>N</span>
                <span>O</span>
                <span>P</span>
                <span>Q</span>
                <span>R</span>
                <span>S</span>
                <span>T</span>
                <span>U</span>
                <span>V</span>
                <span>W</span>
                <span>X</span>
                <span>Y</span>
                <span>Z</span>

            </div>
            <div class="item" v-for="(item,index) in list" :key="index">
                <div class="tit">{{index}}</div>
                <div class="p_con" v-for="(o,i) in item" :key="i"  :sid="o.sid" @click="gotoDetail(o.sid)">
                    <div :class="o.gendar==1?'p_box female':'p_box male'" >
                        <p><span>{{o.name}}</span><label>北京凯瑞联盟教育科技有限公司</label></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import mCrmHeader from '../../../components/m_crm_header.vue'
    import mCrmSearch from '../../../components/m_crm_search.vue'
    import mCrmService from '../m_crm_search/m_crm_bservice.js'
    import linkerData from '../../m_crm/linkerData.js'
    export default {
        name:"m_linker",
        components: {
            mCrmHeader,
            mCrmSearch
        },
        data () {
            return {
                list:[],
                isShowPlus:true,
                addUrl:"#/m_link/m_add_link"
            }
        },
        mounted(){
           this.getLinkerList();
        },
        methods: {
            getLinkerList(){
                mCrmService.getLinkerListAll().then((data)=>{
                    this.list = linkerData.getInviterFirst(data[0]).sortInviter;
                console.log("===========");
                    console.log(this.list);
              });
            },
            gotoAddPage(){
                window.location.href = this.addUrl;
            },
            gotoDetail(sid){
                this.$router.push({
                    name: 'm_link_detail',
                    query: {
                        id: sid
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    @import '../../../static/css/m_crm.scss';
    /*@import '~vux/src/styles/1px.less';*/
    /*@import '~vux/src/styles/center.less';*/
.linker-box{
    .link-list{
        position: relative;
        background: #F5F6F7;
    }
    .layer-zizu{
        width: 10px;
        position: absolute;
        right: 10px;
        top:6px;
        opacity: 0.5;
        text-align: center;
        line-height: 20px;
    }
    .layer-zizu span{
        display: block;
        font-size: 10px;
        color: #454546;
    }
    .link-list .item .tit{
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #A9AAAC;
        padding-left: 15px;
    }
    .link-list .item .p_con{
        overflow: hidden;
        padding-left: 15px;
        background-color: #fff;
    }
    .link-list .item .p_box{
        padding-left:50px;
    }
    .link-list .item .p_box.female{
        background: url("../../../static/images/portrait_female.png") left center no-repeat;
        background-size: 40px 40px;
    }
    .link-list .item .p_box.male{
        background: url("../../../static/images/portrait_male.png") left center no-repeat;
        background-size: 40px 40px;
    }
    .link-list .item .p_box p{
        padding: 10px 0;
        border-bottom: 1px solid #EDEDED;
    }
    .link-list .item .p_box span{
        font-size: 17px;
        color: #191919;
        line-height: 17px;
        display: block;
    }
    .link-list .item .p_box label{
        font-size: 12px;
        color: #A3A5A8;
    }
    .list{
        padding: 20px;
    }
    .list .item{
        padding-right: 20px;
        position: relative;
        margin-bottom: 20px;
    }
    .list .item p{
        line-height: 25px;
    }
    label{
        color: #999;
    }
    span{
        color: #333;
        margin-right: 20px;
    }
    .imgIcon{
        fill: $crm-a-color;
        position: absolute;
        right: 10px;
        top:5px;
    }
}

</style>