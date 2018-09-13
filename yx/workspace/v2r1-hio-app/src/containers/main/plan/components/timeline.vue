<template>
    <div>
        <ul class="timeline" ref="timeline">
            <slot />
        </ul>
    </div>
</template>

<script>
    export default{
        name: 'timeline',
        props:[

        ],
        methods:{

        },
        data(){
            return {

            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .timeline {
        padding: 0;
        position: relative;
        list-style: none;
        color: #37414a;
        -webkit-font-smoothing: antialiased;
        margin: 10px 20px;
    }

    .timeline:after {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        width: 1px;
        height: 100%;
        background-color: #dbdde0;
    }

    .timeline-item {
        position: relative;
        margin: 1.5em 0 0 28px;
        padding: 1.5em;
        border-bottom: 1px dotted #dbdde0;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .timeline-item:last-child {
        border-bottom: none;
    }
    .timeline-circle {
        position: absolute;
        top: .28em;
        left: -34px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #dbdde0;
        background-color: rgba(69, 167, 254, 1);
        z-index: 1;
        box-sizing: content-box;
    }

    .timeline-title {
        position: relative;
        display: inline-block;
        /**
         * BFC inline-block 元素与其兄弟元素、子元素和父元素的外边距都不会折叠（包括其父元素和子元素）
         */
        color: #37414a;
        cursor: crosshair;
        margin: -.15em 0 15px 28px
    }
    .timeline-title:not(:first-child) {
        margin-top: 28px;
    }
    .timeline-title-circle {
        left: -36px;
        top: .15em;
        width: 16px;
        height: 16px;
        background-color: #fff;
    }
    .timeline-others {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        top: .2em;
        left: -48px;
        border: none;
        color: #ffffff;
        /*background-color: #fff;*/
    }
</style>
