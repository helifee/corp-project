

var MONTH_PAY=[232.33,218.34,199.25,206.54,211.99,224.96];


var poll=function (fn, callback, errback, timeout, interval) {
    let endTime = Number(new Date()) + (timeout || 200000)
    interval = interval || 100

    function p() {
        // If the condition is met, we're done!
        if (fn()) {
            callback()
        }
        // If the condition isn't met but the timeout hasn't elapsed, go again
        else if (Number(new Date()) < endTime) {
            setTimeout(p, interval)
        }
        // Didn't match and too much time, reject!
        else {
            errback(new Error('timed out for ' + fn + ': ' + arguments))
        }
    }

    p()
};
poll(()=>{
    return document.getElementById('DrawZ');
},()=>{

    try{
        console.log('jquery loaded');
        var numFun= ()=> (Math.random()*30+200).toFixed(2),
            num=MONTH_PAY[MONTH_PAY.length-1]||numFun(),
            rest=(num-188).toFixed(2),
            $=window.jQuery;


        console.log('num--:',num)

        $('#MainAreaVo tr:first td:last').html(num);
        $('#FEE_TOTAL').html('￥'+num);
        $('#FEE_BASE').html(188.00);
        $('#FEE_GSM').html(rest);

        $('#feiyong_table td').each(function(index,dom){
            if(index%2==1 && index>6){
                $(dom).find('span').html('0.00');
            }
        });

        var img1=document.getElementById('DrawZ'),
            img2=document.querySelector('#DrawB'),
            src1=img1.src,
            src2=img2.src,

            img2FirstPercent=Math.round(188/num*100),
            img2SecondPercent=Math.round(100-img2FirstPercent)

        img2.src='/PortalCMOD/DrawB?show=1%2C1+%CC%D7%B2%CD%BC%B0%B9%CC%B6%A8%B7%D1%2C'+img2FirstPercent+'.00%3A2%2C2+%CC%D7%B2%CD%CD%E2%D3%EF%D2%F4%CD%A8%D0%C5%B7%D1%2C'+img2SecondPercent+'.00%3A3%2C3+%CC%D7%B2%CD%CD%E2%C9%CF%CD%F8%B7%D1%2C0.00%3A4%2C4+%CC%D7%B2%CD%CD%E2%B6%CC%D0%C5%2F%B2%CA%D0%C5%B7%D1%2C0.00%3A5%2C5+%D4%F6%D6%B5%D2%B5%CE%F1%B7%D1%2C0.00%3A6%2C6+%B4%FA%CA%D5%D2%B5%CE%F1%B7%D1%2C0.00%3A7%2C7+%C6%E4%CB%FB%B7%D1%D3%C3%2C0.00'

        var firstSplit='%2C%B7%D1%D3%C3%2C',
            lastSplit='%3A',

            replaceIndex=0,
            reg=new RegExp(firstSplit+'.*?'+lastSplit,'gi'),
            newSrc1=(src1+lastSplit).replace(reg,(str)=>{

                str=firstSplit+(MONTH_PAY[replaceIndex]||num)+lastSplit;
                console.log('str--:',str);
                replaceIndex++;
                return str;

            });

        img1.src=newSrc1.substring(0,newSrc1.length-lastSplit.length);
    }catch(e){
        console.warn('catch one e:',e)
    }

},()=>{

},100000,300)






// /PortalCMOD/DrawB?show=1%2C1+%CC%D7%B2%CD%BC%B0%B9%CC%B6%A8%B7%D1%2C84.00%3A2%2C2+%CC%D7%B2%CD%CD%E2%D3%EF%D2%F4%CD%A8%D0%C5%B7%D1%2C16.00%3A3%2C3+%CC%D7%B2%CD%CD%E2%C9%CF%CD%F8%B7%D1%2C0.00%3A4%2C4+%CC%D7%B2%CD%CD%E2%B6%CC%D0%C5%2F%B2%CA%D0%C5%B7%D1%2C0.00%3A5%2C5+%D4%F6%D6%B5%D2%B5%CE%F1%B7%D1%2C0.00%3A6%2C6+%B4%FA%CA%D5%D2%B5%CE%F1%B7%D1%2C0.00%3A7%2C7+%C6%E4%CB%FB%B7%D1%D3%C3%2C0.00











