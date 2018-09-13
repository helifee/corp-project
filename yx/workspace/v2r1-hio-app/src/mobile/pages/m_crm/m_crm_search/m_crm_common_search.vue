<template>

  <div class="m_crm_b_searchPage">
    <search
        class="_crm_searCommon"
        @result-click="resultClick"
        @on-change="getResult"
        v-model="value"
        :placeholder="placeholder"
        @on-focus="onFocus"
        @on-cancel="onCancel"
        @on-submit="onSubmit"
        ref="search">
        <span slot="right" v-if="type" class="_crm_searcommon_sure">
            <span @click="searchFn">
                确定
            </span>
        </span>
        <slot name="searchResultPage"></slot>
    </search>
    <!-- <span class="_crm_searcommon_sure">确定</span> -->
  </div>
  
</template>
<script>

    import { Search, Group, Cell, XButton, Panel } from 'vux'

    export default {
        name: "crm_search",
        components: {
            Search,
            Group,
            Cell,
            XButton,
            Panel
        },
        props:{
            placeholder : {
                type : String
            },
            type : {
                type : Boolean
            }
        },
        methods: {
            searchFn(){
                this.$emit('searchResult', this.value,this.$refs.search);
            },
            getSelected(item){
                this.$emit("mySelected",item)
            },
            setFocus () {
                this.$refs.search.setFocus()
            },
            resultClick (item) {
                window.alert('you click the result item: ' + JSON.stringify(item))
            },
            getResult (val) {
                // this.$emit('searchResult', val,this.$refs.search);
            },
            onSubmit () {
                this.$refs.search.setBlur()
                this.list = [{
                    title:"kkkkkk"
                }]
            },
            onFocus () {
                this.$emit('onFocus');
            },
            onCancel () {
                this.$emit('onCancel');
            }
        },
        data () {
            return {
                value: '',
            }
        }
    }   
</script>

<style lang="scss">
    /*@import '~vux/src/styles/1px.less';*/
    /*@import '~vux/src/styles/center.less';*/
    .m_crm_b_searchPage{
        .weui-search-bar__cancel-btn{
            font-size: 16px;
            color: #666 !important;
        }
        .weui-search-bar{
            ._crm_searcommon_sure{
                display: none
            }
        }
        .weui-search-bar_focusing{
            ._crm_searcommon_sure{
                display: block
            }
        }
    }
    
</style>

<style lang="scss" scoped>
    @import '../../../static/css/n_myCss.scss';
</style>