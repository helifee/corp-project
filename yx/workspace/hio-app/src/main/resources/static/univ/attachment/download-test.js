
$(function () {
    'use strict';
    var url = 'attachment/';
    
    /*function downloadAll() {
    	var saveData=[];
		
        var data1={"name":"1","fullName":"1.conf","path":"group1/M00/00/00/wKiZC1ij1cyAQ0zWAAAF9kETNbU94.conf"};  
        var data2={"name":"2","fullName":"2.jpg","path":"group1/M00/00/00/wKiZC1isHe2AflN4AABfm6hvV6A696.jpg"};  
        var data3={"name":"3","fullName":"3.zip","path":"group1/M00/00/00/wKiZC1irIkeAWka8AAc9Nx4lZAs201.zip"};  
        saveData.push(data1);  
        saveData.push(data2);         
        saveData.push(data3);         
        $.ajax({ 
            type:"POST", 
            url:url + "downloadAll", 
            dataType:"json",      
            contentType:"application/json",               
            data:JSON.stringify(saveData), 
            success:function(data){ 
            	if (data.success) {
            		var form1 = $('<form action="'+url+'doDownloadAll" method="post"/>').append($('<input type="hidden" name="filePath" value="'+ data.result + '"/>'));
            		var div1 = $('<div style="width:0;height:0;"/>').appendTo('body');
            		var div2 = div1.append(form1)
            		form1.submit();
            		div1.remove();
            	}
            }
         });
    }*/
    
    function downloadAll() {
    	var saveData=[];
		
        var data1={"name":"1","fullName":"1.conf","path":"group1/M00/00/00/ChEDyFjJGAWANf5BAAAFtTzeg5c.sample"};  
        var data2={"name":"2","fullName":"2.jpg","path":"group1/M00/00/00/ChEDyFjJGUKAcPfWAAvqH_kipG8325.jpg"};  
        var data3={"name":"3","fullName":"3.zip","path":"group1/M00/00/00/ChEDyFjJ9tWAahghAAZz7ydhW3I.09.zip"};
        saveData.push(data1);
		saveData.push(data2);
		saveData.push(data3);
        var form1 = $('<form action="'+url+'downloadAll" method="post"/>')
        	.append($('<input type="hidden" name="attListJson" value="'+ encodeURI(JSON.stringify(saveData)) + '"/>'));
		var div1 = $('<div style="width:0;height:0;"/>').appendTo('body');
		var div2 = div1.append(form1)
		form1.submit();
		div1.remove();
    }
    
    $('.download-all').on('click',downloadAll);
    $('.download-one').on('click',function(){
    	$.post(url + "getStorageIP", 
            {filePath:"group1/M00/00/00/wKiZC1irIkeAWka8AAc9Nx4lZAs201.zip"}, 
            function(data){ 
            	console.log(data);
            	if (data)
            		window.location.href = "http://"+data+":8080/group1/M00/00/00/wKiZC1irIkeAWka8AAc9Nx4lZAs201.zip";
            }
         );
    	
    	
    });
    
});
