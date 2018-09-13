<template>
    <div class="vm-state-overview" :style="{ backgroundColor: color }">
        <h4>{{ title }}</h4>
        <p class="count">{{ count }}</p>
    </div>
</template>

<script>
export default {
  name: 'StateOverView',
  props: ['color', 'count', 'title']
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
    .vm-state-overview{
        color: #ffffff;
        flex: 1;
        margin: 22px;
        height: 132px;
        h4{
            float: left;
            width: 40%;
            font: 14px normal;
            line-height: 98px;
            padding-left: 22px;
            box-sizing: border-box;
        }
        p.count{
            float: left;
            width: 60%;
            text-align: center;
            font: 48px bold;
            display: inline-block;
            line-height: 32px;

        }
    }
</style>
