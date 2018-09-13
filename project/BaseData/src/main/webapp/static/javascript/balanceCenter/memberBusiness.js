var memberIds =[];
$(function(){
	 var _columns1 = [[
                    {field:'id',title:'选择',checkbox:true},
                    {field:'name',title:'名称',width:200}
                  ]];

    var itemUl = $('#item-ul');
    //memberIds.push('1');

    $('#module1').datagrid({
	    	url:"../../data/company.json",
	    	columns:_columns1,
			pagination:true,
			rownumbers:true,
			border:false,
			toolbar:'#toolbar1',
			pageSize:5,
			singleSelect: true,
			pageList:[5,10,15],
			fit:true,
			fitColumns:true,
			onLoadSuccess: function (data){
				if(data.code != undefined && data.code != 1){
					$.messager.show({
			            msg : data.desc,
			            title : '提示'
			        });
				}
				$(this).datagrid('clearSelections');
			},
			onCheck: function(rowIndex,rowData){
				var flag = true;
				for(var i=0; i<memberIds.length; i++){
					if(rowData.id == memberIds[i]){
						flag = false;
						break;
					}
				}
				if(flag){
					var str = "<li>"+
					          "<div class='itemdiv'>"+
					          "<span>"+rowData.name+"</span>"+
					          "<i class='item-del' data-id="+rowData.id+">x</i></div>"+
					          "</li>";
					memberIds.push(rowData.id);
					itemUl.append(str);
				}
			}
	    });

	 	itemUl.on("click","i.item-del", function(event) {
	 		var memberIndex = memberIds.indexOf($(this).attr('data-id'));  
		    if (memberIndex > -1) {  
		        memberIds.splice(memberIndex, 1);  
		    } 
		    $(this).parent().parent('li').remove();
		});

})