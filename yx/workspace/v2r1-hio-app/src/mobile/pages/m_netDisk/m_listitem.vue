
<template>
  <div>
      <li v-for="item in list" v-on:click="selectItem(item)">
        <div>
            <div><img v-bind:src="item.src" @error="onImgError"></div>  
            <div>
                <h2>{{ item.title }}</h2>
                <p>{{ item.desc }}</p>
            </div>
        </div>
      </li>
  </div>
</template>

<script>

    JZY.locale.add('m_netDiskLocale',require('./m_netDisk.locale'))
    // import { Panel } from 'vux'


    export default {
       name : "net_disk_list_item",
       props : ['list','errorimg'],
       methods: {
            onImgError (item, $event) {
                item.srcElement.src = this.errorimg;
            },
            selectItem (item) {
                
            }
        },
        data () {

            return {
                
            }
        },
       
    }
</script>

<style lang="scss">

    .netListBox{
        
        
    }



</style>