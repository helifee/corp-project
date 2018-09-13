<template>
    <div>
        <actionsheet v-model="show" :menus="menus5" show-cancel @on-click-menu="click5"></actionsheet>
    </div>
</template>
<script>

    import { Actionsheet } from 'vux'
    export default {
        name:"callPhone",
        components: {
            Actionsheet
        },
        props:[],
        data () {
            return {
                show:false,
                menus5: {
                    'title.noop': ''
                }
            }
        },
        mounted(){

        },
        methods: {
            click5(){

            },
            callMethod(name,gendar,number){
                this.show = true;
                let tips = `<img src="${JZY.c.m_imgPath}/portrait_male.png" style="display: inline-block;vertical-align: middle;" width="56px" height="56px"/>
                <span style="font-size: 18px;color: #191919;margin-left: 8px">${name}</span><br/>
                <span style="color:#999;font-size:14px;margin: 20px 0 0 0;display: inline-block;">请选择要拨打的号码</span>`;
                this.menus5["title['noop']"] = tips;
                this.menus5.menu1 = '<a style="color: #009EFF" href="tel:'+number+'">'+number+'</a>';
            },
        }
    }
</script>