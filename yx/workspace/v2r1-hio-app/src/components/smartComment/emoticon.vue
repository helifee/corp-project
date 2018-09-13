<template>
    <div class="emoji-menu filterSlip_js comment-emoji">
        <div class="j_emojiMenuScr mCustomScrollbar _mCS_20 _mCS_5" auto-scroll="yes">
            <div id="mCSB_5" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
                 style="overflow-y:scroll;max-height: none;"
                 tabindex="0">
                <div id="mCSB_5_container" class="mCSB_container"
                     style="position: relative; top: 0px; left: 0px;"
                     dir="ltr">
                    <div id="mCSB_20" class="mCustomScrollBox mCS-darkblue mCSB_vertical mCSB_inside"
                         style="max-height: none;" tabindex="0">
                        <div id="mCSB_20_container" class="mCSB_container"
                             style="position: relative; top: 0px; left: 0px;" dir="ltr">

                            <a @click="$emit('insertEmoticon',item)" v-for="(item,index) in faces" :key="index" href="javascript:void(0)" :title="descs[index]">
                                <img :ref="'face__'+item" :src="require('./emoticon/'+item+'.png')" :alt="':'+item+':'" class="emoji-png mCS_img_loaded">

                                <!--'./emoticon/'+item+'.png'-->

                                <span class="label">{{':'+item+':'}}</span>
                            </a>



                        </div>
                        <div id="mCSB_20_scrollbar_vertical"
                             class="mCSB_scrollTools mCSB_20_scrollbar mCS-darkblue mCSB_scrollTools_vertical"
                             style="display: block;">
                            <div class="mCSB_draggerContainer">
                                <div id="mCSB_20_dragger_vertical" class="mCSB_dragger"
                                     style="position: absolute; min-height: 30px; top: 0px; display: block; height: 113px; max-height: 199px;"
                                     oncontextmenu="return false;">
                                    <div class="mCSB_dragger_bar" style="line-height: 30px;"></div>
                                </div>
                                <div class="mCSB_draggerRail"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mCSB_5_scrollbar_vertical"
                     class="mCSB_scrollTools mCSB_5_scrollbar mCS-light mCSB_scrollTools_vertical"
                     style="display: block;">
                    <div class="mCSB_draggerContainer">
                        <div id="mCSB_5_dragger_vertical" class="mCSB_dragger"
                             style="position: absolute; min-height: 30px; display: block; height: 93px; max-height: 199px; top: 0px;"
                             oncontextmenu="return false;">
                            <div class="mCSB_dragger_bar" style="line-height: 30px;"></div>
                        </div>
                        <div class="mCSB_draggerRail"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style>
    .emoji-menu {
        width: 100%;
        background: #fff;
        height: 211px;
        /*margin-left: 50px;*/
        border: 1px solid #d5d5d5;
        /*border-radius: 3px;*/
        /*-webkit-box-shadow: 0 0 15px rgba(0,0,0,0.125);*/
        /*-ms-box-shadow: 0 0 15px rgba(0,0,0,0.125);*/
        /*box-shadow: 0 0 15px rgba(0,0,0,0.125);*/
    }
    .emoji-menu > div {
        height: 210px;
        /*margin: 15px;*/
        border-bottom: 1px solid #f2f2f2;
    }

    .mCustomScrollbar {
        -ms-touch-action: none;
        touch-action: none;
    }

    .mCustomScrollBox {
        position: relative;
        overflow: hidden;
        height: 100%;
        max-width: 100%;
        outline: 0;
        direction: ltr;
    }

    .mCSB_container {
        overflow: hidden;
        width: auto;
        height: auto;
    }
    .emoji-menu a:hover{
        background:#8cc5ff;
    }
    .emoji-menu a {
        border-top: 1px solid #f2f2f2;
         border-left: 1px solid #f2f2f2;
        padding: 5px;
        display: block;
        float: left;

        color: #0088CC;
        text-decoration: none;

        cursor: pointer;
        background: transparent;
    }

    .emoji-menu img {
        width: 25px;
        vertical-align: middle;
        border: 0 none;
        max-width: 100%;
    }

    .emoji-menu a .label {
        display: none;
    }
</style>
<script>
    export default {
        mounted(){
            // console.log('this---sdfsdf----:',this,Object.keys(this.$refs))
            let map={}
            for(var i in this.$refs){
                if(i.startsWith('face_')){
                    let key=i.split('__')[1]
                    map[key]=this.$refs[i][0].getAttribute('src')
                }
            }
            // console.log("kcuf_u map:",map)
            this.imgSrcMap=map

            this.$emit('updateEmoticonSrcs',this.imgSrcMap)
        },
        methods:{
            handleEmojInsert(){

            }
        },
        data(){
            return {
                imgSrcMap:{},
                faces:["smile","smirk","sweat_smile","laughing","angry","anguished","astonished","blush","cold_sweat","confounded","confused","cry","relaxed","satisfied","scream","disappointed","dizzy_face","expressionless","fearful","flushed","wink","grin","grinning","triumph","unamused","sleepy","heart_eyes","heart","hushed","innocent","joy","kiss","kissing_heart","sweat","mask","moon","pensive","persevere","birthday","sob","sleeping","weary","sunglasses","sunny","thumbsup","thumbsdown","v","dog","watermelon","strawberry","rage","relieved","worried","yum","smiling_imp","imp","zap","zzz","punch","girl","rocket","man","woman","rice","ring","pig","soccer","hand","bomb","books","boy","bug","bulb","cat","cherries","chicken","clap","cloud","coffee","cow","watch","eyeglasses","eyes","facepunch","fire","four_leaf_clover","gem","ghost","gift","key","baby","basketball","bear","koala","beer","beetle","tada","tiger","train","mouse","muscle","ok_hand","pear","skull","pill","poop","pray","snake","snowman","alien"]
                ,descs:["开心","得意","尴尬","大笑","生气","惊讶","惊呆","害羞","冷汗","惊慌","困惑","哭","放松","满意","惊声尖叫","失望","晕眩","呆板","可怕","激动","眨眼","露齿笑","咧嘴笑","凯旋","不愉快","睡觉","羡慕","心","肃静","天真","欢欣","亲亲","飞吻","冷汗","戴口罩","月亮","忧郁","坚持己见","生日蛋糕","泪流满面","睡着了","厌烦","酷炫","太阳","强","弱","胜利","狗","西瓜","草莓","愤怒","宽慰","担心","美味","古灵精怪","顽皮","闪电","睡眠","拳头","女孩","火箭","男人","女人","米饭","戒指","猪头","足球","手掌","炸弹","书籍","男孩","爬虫","电灯泡","猫","樱桃","鸡","鼓掌","云","咖啡","奶牛","手表","眼镜","眼睛","握拳","火","四叶草","宝石","幽灵","礼物","钥匙","婴儿","篮球","熊","考拉","啤酒","甲壳虫","庆功","老虎","火车","老鼠","肌肉","OK","梨子","骷髅","药丸","便便","祈祷","蛇","雪人","外星人"]
            }
        }
    }
</script>
