
var i = 1,j = 1;     //行号与列号
var oNewRow  ;    //定义插入行对象
var oNewCell1,oNewCell2,oNewCell3,oNewCell4;     //定义插入列对象
var listnum1 = 1;
	
//添加条件行
function AddRow()
{

i = document.getElementById("mytable").rows.length;
oNewRow = document.getElementById("mytable").insertRow(i);
oNewRow.id = j;
listnum1 = parseInt(listnum1)+1;
document.getElementById("listnum1").value = listnum1;
//添加第一列
oNewCell1 = document.getElementById("mytable").rows[i].insertCell(0);
//oNewCell1.style.backgroundColor="#FFFFFF"; 
oNewCell1.style.align="center";
oNewCell1.style.fontSize="12px";
oNewCell1.style.whiteSpace="normal";
oNewCell1.style.paddingRight="10px";
oNewCell1.style.textAlign="right";

oNewCell1.innerHTML = "分支机构清算行行号：";
//添加第二列

//添加第二列
oNewCell2 = document.getElementById("mytable").rows[i].insertCell(1);
oNewCell2.innerHTML = "<input type='text' name='fenzijigou' id='Value" + j + "'"+" value=\"\">";

oNewCell3 = document.getElementById("mytable").rows[i].insertCell(2);
oNewCell3.innerHTML ="<input type=button name=Del" + j + " class='button' value='删除'"+"onClick='DelCurrentRow(" + j + ");'>";
j++;

}

//删除行
function DelCurrentRow(j)
{
with(document.getElementById("mytable"))
{
for (var i=0;i<rows.length;i++)
{
if (rows[i].id == j)
{
deleteRow(i);

}
}
}
listnum1 = parseInt(listnum1)-1;
document.getElementById("listnum1").value = listnum1;
}