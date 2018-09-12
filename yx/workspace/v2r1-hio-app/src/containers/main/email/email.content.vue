<template>
  <div class="emailContent">
    <el-row class="conTitle">
      <el-col :span="18" class="textLeft">{{$route.path}}{{emailcontent.title}}</el-col>
      <el-col :span="6" class="textRight">
        <el-button  size="small">{{l('{emailLocale.content.replay}')}}</el-button>
      </el-col>
    </el-row>
    <div class="conDetail">
      <ul class="conHead" >
          <li><label>{{l('{emailLocale.content.sender}')}}：</label><span>{{emailcontent.sender}}</span></li>
        <li><label>{{l('{emailLocale.content.receiver}')}}：</label><span>{{emailcontent.receiver}}</span></li>
        <li><label>{{l('{emailLocale.content.date}')}}：</label><span>{{emailcontent.date}}</span></li>
      </ul>
        <section class="content">
          <article>
            <p>
              感谢您使用 iCloud。我们在此与您分享有关中国内地 iCloud 服务的重要信息。

              Apple 近日宣布与中国互联网服务公司云上贵州大数据产业发展有限公司（云上贵州）合作，为中国内地客户提供 iCloud 服务。此举将有助于我们继续提升 iCloud 服务的速度与可靠性，并遵守中国法规。

              自2018年2月28日起，与您的 Apple ID相关联的 iCloud 服务将转由“云上贵州”运营。使用这些服务及您通过 iCloud 存储的所有数据（包括照片、视频、文稿和备份等）都将受到 iCloud（由云上贵州运营）条款与条件的约束。除此变更外，您的 iCloud 将无间断地继续为您提供服务。

              如果您不是居住在中国内地的中国公民，您可以编辑您 Apple ID 的国家或地区设置，以反映您当前所在的国家或地区，并在 Apple 当前条款与条件的约束下继续使用 iCloud。了解更多有关更改您 Apple ID 、iTunes Store 或 App Store 的国家或地区的信息，请参阅 iCloud（由云上贵州运营）常见问题。

              如果您是居住在中国内地的中国公民，但不想使用 iCloud（由云上贵州运营），请前往 https://www.icloud.com/optout 停用您的 iCloud 帐户。

              如有疑问，请参阅 iCloud（由云上贵州运营）常见问题。如果您需要帮助，请联系 Apple 支持。

              感谢您使用 iCloud。我们在此与您分享有关中国内地 iCloud 服务的重要信息。

              Apple 近日宣布与中国互联网服务公司云上贵州大数据产业发展有限公司（云上贵州）合作，为中国内地客户提供 iCloud 服务。此举将有助于我们继续提升 iCloud 服务的速度与可靠性，并遵守中国法规。

              自2018年2月28日起，与您的 Apple ID相关联的 iCloud 服务将转由“云上贵州”运营。使用这些服务及您通过 iCloud 存储的所有数据（包括照片、视频、文稿和备份等）都将受到 iCloud（由云上贵州运营）条款与条件的约束。除此变更外，您的 iCloud 将无间断地继续为您提供服务。

              如果您不是居住在中国内地的中国公民，您可以编辑您 Apple ID 的国家或地区设置，以反映您当前所在的国家或地区，并在 Apple 当前条款与条件的约束下继续使用 iCloud。了解更多有关更改您 Apple ID 、iTunes Store 或 App Store 的国家或地区的信息，请参阅 iCloud（由云上贵州运营）常见问题。

              如果您是居住在中国内地的中国公民，但不想使用 iCloud（由云上贵州运营），请前往 https://www.icloud.com/optout 停用您的 iCloud 帐户。

              如有疑问，请参阅 iCloud（由云上贵州运营）常见问题。如果您需要帮助，请联系 Apple 支持。
            </p>
          </article>
        </section>
      <div class="conAttachment">
        <div class="attaline">
           <span class="line"></span>
           <div><span>{{l('{emailLocale.content.attachment}')}}（1）</span></div>
        </div>
        <el-row>
          <el-col :span="12" v-for="(item,index) in fileList" :key="index" >
            <a :href="item.url" :download="item.name">
             <div class="atta">
                 <i class="el-icon-picture attaImg"></i>
                 <div class="attaName">
                   <p>{{item.name}}</p>
                   <p>{{item.size}}</p>
                 </div>
             </div>
            </a>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>

</template>

<script>
  const emailcontent={
    id:"1111",
    sender:"App Store&ltAppStore@new.itunes.com&gt",
    title:"致中国内地iCloud用户的重要通知致中的重要致中国内地iCloud用户的重要通知致中的重要",
    date:"2018年1月27日 09:29 (周六)",
    receiver:"App Store&ltAppStore@new.itunes.com&gt,AppStore@new.itunes.com"
  }
    export default {
        name: "emailContent",
        data(){
          return{
            emailcontent,
            fileList: [{name: '博洋草书3500_0.JPG',size:'22.5M', url: 'https://fuss10.elemecdn.com'},
              {name: 'food2.jpeg',size:'100kb', url: 'https://fuss10.elemecdn.com'},
              {name:'test.jpg',size:'100kb',url:'/images/myw3schoolimage.jpg'},
              {name:'test.jpg',size:'100kb',url:'/images/myw3schoolimage.jpg'}
            ]
          }
        },
        props:["eTitle"],
        mounted(){
          // console.log(this.$route.params)
        }
    }
</script>

<style scoped lang="scss">
.emailContent{
  height: 100%;
  .conTitle {
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    border-bottom: 1px solid #ebeef5;
    font-weight: 600;
    font-size: 18px;
    .textRight {
      text-align: right;
    }
    .textLeft{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .conDetail{
    position: absolute;
    height: calc(100% - 60px);
    overflow: auto;
    width:100%;
    color: rgba(51, 51, 51, 0.647058823529412);
    .conHead{
      padding:  10px;
      font-size: 12px;
      line-height: 24px;
      border-bottom: 1px solid #ebeef5;
    }
    .content{
      padding: 20px 10px;
      font-size: 14px;
      line-height: 36px;
    }
    .conAttachment{
      font-size: 13px;
      margin-bottom: 20px;
      .attaline{
        position: relative;
        margin: 20px 10px;
        .line{
          display: inline-block;
          height: 1px;
          background: #ebeef5;
          width: 100%;
        }
        div{
          position: absolute;
          top: 5px;
          width: 100%;
          text-align: center;
          span{
            background: #fff;
          }
        }
      }
      .atta{
        background-color: rgba(242, 242, 242, 1);
        margin:5px 10px;
        height: 50px;
        color: #333333;
        line-height: 50px;
        .attaImg{
          color: #8c0615;
          font-size: 32px;
          margin-top: 9px;
        }
        .attaName{
          display: inline-block;
          width: calc(100% - 42px);
          p{
            line-height: 16px;
            height: 16px;
          }
        }
      }
    }
  }

}
</style>
