<template>
    <div>
        <div class="news-box">
            <div class="tit">
                <h3>{{baseInfo.title}}</h3>
                <p><span class="fl"><span>发布人: {{baseInfo.createPersonName}}</span></span><span class="fr">{{publishDate}}</span></p>
            </div>
            <div class="con" id="con">
            </div>
        </div>
    </div>

</template>
<script>
   import mService from '../../pages/m_details/m_details_service'
   import u from '../../m_util'
    export default {
        components: {
        },
        data () {
            return {
                id:"",
                baseInfo:{},
                publishDate:""
            }
        },
        mounted(){
            this.id = this.$route.query.id;
            console.log(this.id);

            if(this.id){
                //获取基本信息
                this.getBaseInfo();
            }
        },

        methods: {
            getBaseInfo(){
                mService.getNewsInfoDetails(this.id).then((data)=>{
                    console.log(data)
                    this.baseInfo = data[0];
                    if(this.baseInfo.publishDate){
                        this.publishDate = u.handleTimeNoSecondFn(this.baseInfo.publishDate);
                    }

                    var str = this.baseInfo.newsContent;
                    if(str){
                        let div = document.createElement('div');
                        div.innerHTML = str;
                        let con = document.getElementById('con');
                        con.appendChild(div);
                    }
                 });

            },
        }
    }
</script>
<style lang="scss">
@import '../../static/css/m_crm.scss';
</style>
<style lang="scss">
    .news-box{
        padding: 15px;
        ul li,ol li {
            list-style: inherit;
        }
        img{
            max-width: 100%!important;
        }
        em{
            font-style: italic;
        }
        .list-paddingleft-1{padding-left:0}
        .list-paddingleft-2{padding-left:20px}
        .list-paddingleft-3{padding-left:40px}
        ol{
            margin:0;padding:0;
            list-style: auto;
            li{
                clear:both;
                list-style: auto;
            }
        }
        ul{
            margin:0;padding:0;
            list-style: auto;
            li{
                clear:both;
                list-style: auto;
            }
        }
        .tit{
            margin:20px 0;
            p{
                overflow: hidden;
            }
        }
        h3{
            font-size: 22px;
            color: #191919;
            line-height: 32px;
            margin-bottom:20px;
        }
        .tit span{
            font-size: 14px;
            color: #A3A5A8;
            line-height: 16px;
        }
        .con{
            font-size: 16px;
            color: #3C3C3C;
            line-height: 32px;
        }
    }
</style>