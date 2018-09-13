<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>

  <HTML>  
  <title>管理者初期画面（張瑜）</title>
 <script language="javascript" type="text/javascript">
 //隐藏附件文本框
	function show(){
	if(document.getElementById("sp1").style.display=="none"){
		document.getElementById("sp1").style.display="";
	}else{
		if(document.getElementById("sp2").style.display=="none"){
			document.getElementById("sp2").style.display="";
		}else{
			if(document.getElementById("sp3").style.display=="none"){
				document.getElementById("sp3").style.display="";
			}else{
				if(document.getElementById("sp4").style.display=="none"){
					document.getElementById("sp4").style.display="";
				}else{
					if(document.getElementById("sp5").style.display=="none"){
						document.getElementById("sp5").style.display="";
					}else{
						alert("no more file can be selected");
					}
				}
			}
		}
	}
	
}
function setNone(filename,divename){
	document.getElementById(filename).value="";
	document.getElementById(divename).style.display="none";
    document.getElementById(divename).outerHTML=document.getElementById(divename).outerHTML ;
<%-- 将file本框内容清空--%>
}
//清空页面的内容

function resetemail_Emailaction(){

	targetForm = document.forms[0];
	targetForm.action="resetemail";
	targetForm.submit();
}


</script> 
 <script language="JavaScript" type="text/javascript" src="Login.js"></script>
  <BODY  background=imag\vb.jpg>   
  
  <s:form name="popupForm">
<table   width="100%"   border="0">   
      <tr>
      </tr>
        <tr>
      </tr>
        <tr>
      </tr>
        <tr>
      </tr>
        <tr>
      </tr>
      
          <tr>
        
              <td   width="22%" height="30">受信者  (<B>To</B>):　</td>  
              <td> 
               
                  <s:textfield  name="raddress_b" id="raddress_b" size="50" /> 
                <input type="button" value="查找" name="B1" onclick="find();"  >
                </td>
             

             
            
          </tr>  
          <tr> 
           
           </tr>
           <tr>     
              <td>送信者（from）:</td>   
              <td><input   name="from"   size="25"></td>   
          </tr>   
          <tr>     
              <td   height="19">密送(<B>Cc</B>):(暂无)</td>   
              <td><input   type="text"   name="textfield"></td>   
          </tr>   
          <tr>     
              <td>密送(<B>Bcc</B>):(暂无)</td>   
              <td><input   type="text"   name="textfield2"></td>   
          </tr>   
          <tr>     
              <td>主題：</td>   
              <td>
             
              <s:textfield name="subject"   size="50" />
       
              </td>   
          </tr>   
          <tr>     
              <td>内容：</td>   
              <td><s:textarea name="text" rows="10" cols="60"/></td>   
          </tr>   
          <tr>     
              <td>付属文書:</td> 
                <td>
                     
              <!-- 
                <br />
                <form onsubmit="return true;" action="/struts2/test/upload.action" method="post" enctype="multipart/form-data">
                <span id="files"> <input type='file' name='affixPath' />
                <input type="button" onclick="addComponent();" value="添加文件" />
                <p/>
             
                </span>
                </form>
     	      -->
                 <!--  增加附件操作-->
					<input name="file1"  type='file'></input>
				 <input value="add" type="button" onclick="show()"></input>	
				 
				<div id="sp1" STYLE="display:none">
					<input name="file1" id='affixPath'type='file'></input>
					<input value="clear" type="button" onclick="setNone('affixPath','sp1')" ></input>
				</div>
				<div id="sp2" STYLE="display:none">
					<input name="file1" id="affixPath2" type="file"></input>
					<input value="clear" type="button" onclick="setNone('affixPath2','sp2')" ></input>
				</div>
				<div id="sp3" STYLE="display:none">
					<input name="file1" id="affixPath1" type="file"></input>
					<input value="clear" type="button" onclick="setNone('affixPath1','sp3')" ></input>
				</div>
				<div id="sp4" STYLE="display:none">
					<input name="file1" id="affixPath3" type="file"></input>
					<input value="clear" type="button" onclick="setNone('affixPath3','sp4')" ></input>
				</div>
				<div id="sp5" STYLE="display:none">
					<input name="file1" id="affixPath5" type="file"></input>
					<input value="clear" type="button" onclick="setNone('affixPath5','sp5')" ></input>
				</div>

          </td>   
              
          </tr>   
          <tr>
              <td>&nbsp;</td>   
              <td><input type="button" value="送信" name="B1" onclick="send(); ">
                  <input type="button" value="消去"  name="b2" onclick="javascript: resetemail_Emailaction();"/>
             </td>
               </tr> 
          
          
          <tr>     
              <td>&nbsp;</td>   
              <td>&nbsp;</td>   
          </tr>   
          <tr>     
              <td>&nbsp;</td>   
              <td>&nbsp;</td>   
          </tr>  
          
      </table>   
         <tr> 
             <td>
             <p align=center><font size=2></font><a href="ManageUser03_init.action">戻る</a></p>
         </td>
         </tr>


   </s:form>
  </BODY>   
  </HTML>