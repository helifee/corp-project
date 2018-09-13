$(function(){
  	 var url = "../data/books.json";
  	 var _columns = [[{field:'id',title:'id',checkbox:true,title:''},   
				      {field:'name',title:'名称',width:'10%',sortable:true},   
				      {field:'author',title:'作者',width:'15%'}, 
				      {field:'pubState',title:'发布状态',width:'10%',formatter: function(value,row,index){
							if (value == '1'){
								return '已发布';
							}else if(value ==3){
								return '';
							} else {
								return '未发布';
							}
						}},  
				      {field:'pubTime',title:'发布时间',width:'25%'},  
				      {field:'price',title:'价格',width:'25%',sortable:true},
				      {field:'action',title:'操作',width:'10%',formatter : function(value, row, index) {
						 var str = '';
						 str += $.formatString('<a href="javascript:void(0)" onclick=myupdate(\'{0}\')>编辑</a>', row.id);
						 return str;
						}}
				      ]];

  	 bodyLoad('module','toolbar',url,_columns);

  });
 
 function myupdate(id){
  	alert(id);
  }