
var i = 1,j = 1;     //�к����к�
var oNewRow  ;    //��������ж���
var oNewCell1,oNewCell2,oNewCell3,oNewCell4;     //��������ж���
var listnum1 = 1;
	
//���������
function AddRow()
{

i = document.getElementById("mytable").rows.length;
oNewRow = document.getElementById("mytable").insertRow(i);
oNewRow.id = j;
listnum1 = parseInt(listnum1)+1;
document.getElementById("listnum1").value = listnum1;
//��ӵ�һ��
oNewCell1 = document.getElementById("mytable").rows[i].insertCell(0);
//oNewCell1.style.backgroundColor="#FFFFFF"; 
oNewCell1.style.align="center";

oNewCell1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ֱ�Ӳ��������";

oNewCell2 = document.getElementById("mytable").rows[i].insertCell(1);
oNewCell2.innerHTML ="<input type='text' name='mmbcd' id='Value" + j + "'"+" value=\"\" maxlength='14' onkeyup='fun_number(this)' onblur='fun_number(this)'><span  class='STYLE1'>&nbsp*&nbsp</span><input type='button' class='button' name=Del" + j + " value='ɾ��'"+"onClick='DelCurrentRow(" + j + ");'>";

j++;

}

//ɾ����
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