import locale from '@/locale/locale.js'
import enLan from 'element-ui/lib/locale/lang/en'
import zhCNLan from 'element-ui/lib/locale/lang/zh-CN'
// import zhTWLan from 'element-ui/lib/locale/lang/zh-TW'
import elementUILocale from 'element-ui/lib/locale'
import customElementUILocale from '@/plugins/element-ui/src/locale';


let lanMap={
    'zh-CN':zhCNLan,
    // 'zh-TW':zhTWLan,
    'en':enLan
}




;(async function(){
    let lan=await locale.getCurrentLanguage();
// 设置语言
    elementUILocale.use(lanMap[lan])
    customElementUILocale.use(lanMap[lan])
})();