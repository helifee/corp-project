function selectUser(){
					
					var url = "Orgn!index.do";
					
					var dto = {
						callBackFun : "getUserInfo",
						//saveUrl : "Orgn!save.do",
						selectedUserQueryMethod:"findByRoleId",
						minCount:1,
						maxCount:1,
						needBackUserInfo : 1
					};
					var dtoJson=encodeURI($.toJSON(dto));
					window.open(url+"?paramJsonStr="+dtoJson);
				}



function getUserInfo(userInfo) {
	var info="";
	for(var i=0; i<userInfo.length; i++){
		user = userInfo[i];
		var username=user.username;
		var userId=user.userid;
		info+=username+userId;
	}
	document.getElementById("userId").value = info;
}