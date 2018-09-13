// 计数器 e.g：0/50

let curLenClass='textarea-limiter-cur-len',
    wrapperClass='textarea-limiter-wrapper'

function getModelValueByVnode(vnode){
    let value

    if (vnode.data.model.value === null){
        value=''
    }else{
        value=vnode.data.model.value
    }
    return value
}
export default {
    install(Vue){
        Vue.directive('textarea-limiter',{
            inserted(el, binding,vnode) {
                
                if(el.nodeName.toUpperCase()=='TEXTAREA'){
                    el=el.parentNode
                }
                let position=window.getComputedStyle(el).position
                if(!'relative absolute fixed'.split(' ').includes(position)){
                    el.style.position='relative'
                }
                
                // console.log('kcuf_u el--:',el)
                var span = document.createElement('span')
                span.classList.add(wrapperClass)

                // let value=getModelValueByVnode(vnode)
                //
                // if (vnode.data.model.value === null){
                //     value=''
                // }else{
                //     value=vnode.data.model.value
                // }

                setTimeout(()=>{
                    (function () {
                        // Create the <style> tag
                        var style = document.createElement('style');

                        // Add a media (and/or media query) here if you'd like!
                        // style.setAttribute('media', 'screen')
                        // style.setAttribute('media', 'only screen and (max-width : 1024px)')

                        // WebKit hack :(
                        style.appendChild(document.createTextNode(''));

                        // Add the <style> element to the page
                        document.head.appendChild(style);

                        return style.sheet;
                    })().insertRule('.'+wrapperClass+' {position:absolute;bottom:-5px;right:10px; } ', 0);
                })

                

                binding.fwCurrentValueLen = getModelValueByVnode(vnode).length
                // binding.fwCurrentValueLen = value.length
                span.innerHTML = '<i class="'+curLenClass+'">' + binding.fwCurrentValueLen + '</i>/' + (vnode.componentInstance.$attrs.maxlength||150)
                el.appendChild(span)





            },
            update(el, binding,vnode) {
                // if (vnode.data.model.value === null) return
                binding.fwCurrentValueLen = getModelValueByVnode(vnode).length
                // binding.fwCurrentValueLen = vnode.data.model.value.length
                let nowNumDom = el.getElementsByClassName(curLenClass)[0]
                nowNumDom.innerText = binding.fwCurrentValueLen

                if(binding.fwCurrentValueLen>=(vnode.componentInstance.$attrs.maxlength||150)){
                    nowNumDom.style.color='red'
                }else{
                    nowNumDom.style.color='#606266'
                }

            }
        })
    }
}
