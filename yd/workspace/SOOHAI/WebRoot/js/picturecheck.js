function CheckExt(obj) {
	var AllImgExt = ".jpg|.jpeg|.gif|.bmp|.png|"// 全部图片格式类型
	ErrMsg = "";
	FileMsg = "";
	var FileExt = "";
	HasChecked = false;
	if (obj.value == ""){
		this.ErrMsg="\n请选择一个图片";    
		return false;
	}
	FileExt = obj.value.substr(obj.value.lastIndexOf(".")).toLowerCase();
	if (AllImgExt != null && AllImgExt.indexOf(FileExt + "|") == -1) // 判断文件类型是否允许上传
	{
		ErrMsg = "\n该文件类型不允许上传。请上传 " + AllImgExt + " 类型的文件，当前文件类型为" + FileExt;
		alert(ErrMsg);
		return false;
	}

	return true;
}
