<template>
    <div style="height: 44px">
        <search
                @result-click="resultClick"
                @on-change="getResult"
                :results="results"
                v-model="value"
                position="static"
                auto-scroll-to-top
                @on-focus="onFocus"
                @on-cancel="onCancel"
                @on-submit="onSubmit"
                ref="search">
             <span slot="right" v-if="sureBtnShow" class="_crm_searcommon_sure">
                <span @click="searchFn">
                    确定
                </span>
            </span>
        </search>


    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import { Search } from 'vux'

    export default {
        name:"crmSearch",
        components: {
            Search
        },
        data () {
            return {
                results: [],
                value: '',
                sureBtnShow:false
            }
        },
        mounted(){
        },
        methods: {
            searchFn(){
                this.$emit("searchFn",this.value);
                this.results =  []
            },
            setFocus () {
                this.$refs.search.setFocus()
            },
            resultClick (item) {
                window.alert('you click the result item: ' + JSON.stringify(item))
            },
            getResult (val) {

            },
            onSubmit (val) {
                this.$refs.search.setBlur()
                this.$emit("searchFn",val);
            },
            onFocus (val) {
                this.sureBtnShow = true;
                if(val) this.value = val;
                console.log('on focus')
            },
            onCancel () {
                this.sureBtnShow = false;
                this.$emit("searchFn","");
            }
        }
    }
</script>

<style lang="scss">
    .weui-search-bar__cancel-btn{
        font-size: 16px;
        color: #666!important;
    }
    @import '../static/css/m_crm.scss';
</style>
<style lang="scss" scoped>
    ._crm_searcommon_sure{
        width:60px;
        line-height: 27px;
        text-align: center;
        color:#009EFF;
    }
</style>