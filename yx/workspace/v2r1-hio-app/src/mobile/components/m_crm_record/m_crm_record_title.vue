<template>
    <div class="r_title">
        <h2>
            {{titleName}}
            <span v-if="isShowPlus" v-on:click="locationHref">+</span>
        </h2>
    </div>
</template>
<script>
  

    export default {
        name:"m_ctitle",
        components: {
            
        },
        mounted(){
            // console.log(this.$el.getAttribute('operationUrl'));
            // let url = this.$el.getAttribute('operationUrl')
        },
        props: ['titleName','isShowPlus'],
        data () {
            
            return {

            }
        },
        methods: {
            locationHref(){
                let url = this.$el.getAttribute('operationUrl');
                location.href = url;
            }
        }
    }
</script>

<style lang="scss" scoped>
    
.r_title{font-size: 1rem; font-weight: normal;
    span{
        float:right;
    }
}
</style>