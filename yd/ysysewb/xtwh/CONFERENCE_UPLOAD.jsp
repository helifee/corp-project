<%@ page contentType="text/html; charset=UTF-8" language="java" import="java.io.*,java.awt.Image,java.awt.image.*,com.sun.image.codec.jpeg.*,java.sql.*,com.jspsmart.upload.*,java.util.*"%>
<%
SmartUpload mySmartUpload =new SmartUpload();
long file_size_max=4000000;
String fileName2="",ext="",testvar="";
//应保证在根目录中有此目录的存在
String url="upload/";      
//初始化
mySmartUpload.initialize(pageContext);
//只允许上载此类文件
try {
		mySmartUpload.setAllowedFilesList("jpg");
		//上载文件 
		mySmartUpload.upload();
} 
catch (Exception e){
		out.println("<script language = javascript>alert('只允许上传.jpg类型图片文件');"); 
		out.println("location.href='CONFERENCE_TYPE.jsp'</script>");
}
try{
    com.jspsmart.upload.File myFile = mySmartUpload.getFiles().getFile(0);
    if (myFile.isMissing()){
    		out.println("<script language = javascript>alert('请选择上传文件。');"); 
				out.println("location.href='CONFERENCE_TYPE.jsp'</script>");
    }
    else{
      String myFileName=myFile.getFileName(); //取得上载的文件的文件名
   		ext= myFile.getFileExt();      //取得后缀名
   		int file_size=myFile.getSize();     //取得文件的大小  
   		String saveurl="";
   		if(file_size<file_size_max){
    			/*//更改文件名，取得当前上传时间的毫秒数值
    			Calendar calendar = Calendar.getInstance();
    			String filename = String.valueOf(calendar.getTimeInMillis()); */
    			String filename = "conference_map";
    			saveurl=request.getRealPath("/")+url;
    			saveurl+=filename+"."+ext;          //保存路径
    			myFile.saveAs(saveurl,mySmartUpload.SAVE_PHYSICAL);
    			//out.print(filename);
    			out.println("<script language = javascript>alert('上传成功。');"); 
					out.println("location.href='CONFERENCE_TYPE.jsp'</script>");
   		}
   		else{
    			out.println("<script language = javascript>alert('上传文件大小不能超过"+(file_size_max/1000)+"K');"); 
					out.println("location.href='CONFERENCE_TYPE.jsp'</script>");
   		}
  	}
}
catch (Exception e){
	e.toString();
}%> 