
<template>
  <div>
      <netDiskListItem :list="list" >
          <!-- <netDiskListItem :list="list.children" ></netDiskListItem> -->
      </netDiskListItem>
  </div>
</template>

<script>

    JZY.locale.add('m_netDiskLocale',require('./m_netDisk.locale'))
    import netDiskListItem from './m_listitem.vue'


    export default {
       name : "net_disk_list",
       props : ['list','errorimg'],
       components: {
           netDiskListItem
        },
       methods: {
        
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