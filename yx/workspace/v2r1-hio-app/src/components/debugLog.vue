<template>
    <span style="color:red;" v-if="JZY.DEBUG_MODE">
        <slot></slot>
        <span>(此为调试信息，仅开发模式显示)</span>
    </span>
</template>