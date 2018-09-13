<template>
    <div class="timeline-title">
        <div class="timeline-circle timeline-title-circle" :class="slotClass" :style="circleStyle" ref="others">
            <slot name="others" />
        </div>
        <slot />
    </div>
</template>

<script>
    import timelineItemBase from './timelineItemBase.vue'

    export default {
        extends: timelineItemBase,
    }
</script>
