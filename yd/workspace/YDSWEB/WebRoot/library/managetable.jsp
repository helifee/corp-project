<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<div class="span-23 margin_top_2">
 <div class="span-22 last " >
 	<table id="bookreturnmxtbl" class=" text_center midintro grid ellipsis">
 		<tr>
          <th class="percent_12">ISBN号</th>
          <th class="percent_10">图书名称</th>
          <th class="percent_10">第几册/册数</th>
          <th class="percent_10">作者</th>
          <th class="percent_10">出版社</th>
          <th class="percent_10">图书分类</th>
          <th id="tbl_purse" class="percent_6">捐书人</th>
          <th class="percent_8">出版日期</th>
          <th class="percent_10">简介</th>
          <th class="percent_8">图书状态</th>
          <th class="percent_6">操作</th>
        </tr>
        <s:iterator value="bookmanageList" status="manageid">
        <tr id="row${manageid.index}" class="none">
            <td id="col_isbn${manageid.index}">
	            <s:textfield theme="simple" id="isbn%{#manageid.index}" name="isbn" maxlength="13" onblur="isbnSearch(%{#manageid.index},'isbn','isbn_h');" onfocus="this.select();"/>
	            <s:hidden id="tbl_isbn_h%{#manageid.index}" name="isbn" cssClass="none"/>
	            <div class="text_left">
	            <s:label theme="simple" id="isbn_h%{#manageid.index}" name="isbn" cssClass="none"></s:label>
	            </div>
            </td>
            <td id="col_bookname${manageid.index}"  title="${bookname}">
            	<s:textfield theme="simple" maxlength="40" id="bookname%{#manageid.index}" name="bookname" onblur="bookChange(%{#manageid.index},'bookname','bookname_h');" onfocus="this.select();"/>
            	<s:hidden id="bookname_h%{#manageid.index}" name="bookname" cssClass="none"/>
	        </td>
            <td id="col_volume${manageid.index}">
		        <div class="cell_val prepend-h">
	            	<s:textfield theme="simple" id="volumenum%{#manageid.index}" name="volumenum" maxlength="2" cssClass="" onfocus="addEvent(this,'Number'); this.select();" onblur="volumeCheck(%{#manageid.index},'volumenum','volumenum_h');"/>
	            	<s:hidden id="volumenum_h%{#manageid.index}" name="volumenum" cssClass="none" />
	            	<s:hidden id="tbl_volumenum_h%{#manageid.index}" name="volumenum" />
		        </div>
		        <div class="cell_18 text_left line_h"><s:label  theme="simple" value="/"/></div>
		        <div class="cell_val">
		            <s:textfield theme="simple" id="bookvolume%{#manageid.index}" name="bookvolume" maxlength="2" cssClass="" onfocus="addEvent(this,'Number'); this.select();" onblur="volumeCheck(%{#manageid.index},'bookvolume','bookvolume_h');"/>
            		<s:hidden id="bookvolume_h%{#manageid.index}" name="bookvolume" cssClass="none"/>
		            <s:hidden id="tbl_bookvolume_h%{#manageid.index}" name="bookvolume" />
		        </div>
            </td>
            <td id="col_author${manageid.index}" title="${bookauthor}">
		        <s:textfield theme="simple" maxlength="40" id="bookauthor%{#manageid.index}" name="bookauthor" onfocus="this.select();" onblur="changeCheck(%{#manageid.index},'bookauthor','bookauthor_h');"/>
            	<s:hidden id="bookauthor_h%{#manageid.index}" name="bookauthor" cssClass="none"/>
            </td>
            <td id="col_pub${manageid.index}" title="${bookpublisher}">
		        <s:textfield theme="simple" maxlength="40" id="bookpublisher%{#manageid.index}" name="bookpublisher" onfocus="this.select();" onblur="changeCheck(%{#manageid.index},'bookpublisher','bookpublisher_h');"/>
            	<s:hidden id="bookpublisher_h%{#manageid.index}"  cssClass="none" name="bookpublisher"/>
            </td>
            <td id="col_class${manageid.index}" title="${booksortname}">
	            <s:select theme="simple" id="tbl_bookclass%{#manageid.index}" name="booksort" cssClass="span-2 none" list="booksortlist" listKey="classid" listValue="classname" onblur="sortChange2(%{#manageid.index},'tbl_bookclass','tbl_bookclass_h');"/>
            	<s:hidden id="tbl_bookclass_h%{#manageid.index}" name="booksort" cssClass="none"/>
            	<s:textfield theme="simple" id="booksortname%{#manageid.index}" onclick="sortChange1(%{#manageid.index});" name="booksortname" />
            </td>
            <td id="col_purse${manageid.index}">
           		<s:textfield theme="simple" id="tbl_pursename%{#manageid.index}" name="pursename"  onclick="changeId(%{#manageid.index});"/>
           		<s:textfield theme="simple" id="tbl_purseid%{#manageid.index}" name="purseid" maxlength="6" cssClass="none" onfocus="addEvent(this,'Number');" onblur="changeName(%{#manageid.index},'tbl_purseid','purseid_h');"/>
	            <s:hidden id="tbl_pursename_h%{#manageid.index}" name="pursename"/>
	            <s:hidden id="tbl_purseid_h%{#manageid.index}" name="purseid"/>
            	<s:hidden id="pursename_h%{#manageid.index}" name="pursename" cssClass="none"/>
            	<s:hidden id="purseid_h%{#manageid.index}" name="purseid" cssClass="none"/>
            </td>
            <td id="col_publishdate${manageid.index}">
	            <s:textfield theme="simple" maxlength="10" id="bookpublishdate%{#manageid.index}" name="bookpublishdate"  onclick="dateChange(%{#manageid.index},'bookpublishdate','bookpublishdate_h')" onchange="changeCheck(%{#manageid.index},'bookpublishdate','bookpublishdate_h');"/>
            	<s:hidden id="bookpublishdate_h%{#manageid.index}"  cssClass="none" name="bookpublishdate"/>
            </td>
            <td id="col_summary${manageid.index}" title="${booksummary}">
	            <s:textfield theme="simple" maxlength="2000" id="booksummary%{#manageid.index}" name="booksummary" onfocus="this.select();" onblur="changeCheck(%{#manageid.index},'booksummary','booksummary_h');"/>
            	<s:hidden id="booksummary_h%{#manageid.index}" name="booksummary" cssClass="none"/>
            </td>
            <td id="col_loanTF${manageid.index}">
            	<s:property value="loanTF"/>
	            <s:hidden id="loanTF%{#manageid.index}" name="loanFlg"/>
            </td>
            <td id="col_delete${manageid.index}">
	            <s:div id="del%{#manageid.index}" cssClass="center">
	            <s:a theme="simple" href='#this' onfocus="this.blur();" onclick="changeDel(%{#manageid.index});">删除</s:a>
	            </s:div>
	            <s:div id="canceldel%{#manageid.index}" cssClass="center none">
	            <s:a theme="simple" href='#this' onfocus="this.blur();" onclick="changeDel(%{#manageid.index});">取消删除</s:a>
	            </s:div>
	            <s:hidden id="delflg%{#manageid.index}" name="delflg" value="0"> </s:hidden>
            	<s:hidden id="updflg%{#manageid.index}" name="updflg" value="0"> </s:hidden>
            	<s:hidden id="bookid%{#manageid.index}" name="bookid"> </s:hidden>
            </td>
        </tr>
        </s:iterator>
 	</table>
        <div id="linebottem" class="border_library none"></div>
 	
	<s:hidden id="currentpage" name="pageNumber"></s:hidden>
	<s:hidden id="pageCount" name="pageCount"></s:hidden>
	<s:hidden id="goodsCount" name="totalCount"></s:hidden>
	<s:hidden id="allbooksCount" name="allbooksNum" value="%{allbooksNum}"></s:hidden>
    <s:hidden id="loanNum" name="loanNum" value="%{loanNum}"></s:hidden>
    <div class="span-22 margin_top_2 margin_left_20">
    	<div class="span-7 margin_top_2 ">
            <s:label id="b" name="b" theme="simple" value=""/>
        </div>
	    <div class="span-14 margin_top_2 ">
	    
		
	    	总计:<s:label id="totalCount" name="totalCount"/>件&nbsp;
	    	当前页:<s:label id="pageNum" name="pageNumber"/>/<s:label id="pageCount" name="pageCount"/>页&nbsp;  
	    	<a id="firstpage" href="#this" onclick="changePage('first');" >首页</a>
	    	<a id="backpage" href="#this" onclick="changePage('back');" >上一页</a>
	    	<label id="ellipsis1" class="ellipsis1"><font color="#FF6600" >...</font></label>
	    	
	    	 <a id="page1" href="#this" style="text-decoration: none" onclick="changePage(this);" ></a>
	         <a id="page2" href="#this" style="text-decoration: none" onclick="changePage(this);" ></a>
	         <label id="page3" class="page3"></label>
	         <a id="page4" href="#this" style="text-decoration: none" onclick="changePage(this);" ></a>
	         <a id="page5" href="#this" style="text-decoration: none" onclick="changePage(this);" ></a>
		    
	    	<label id="ellipsis2" class="ellipsis2"><font color="#FF6600" >...</font></label>
	    	<a id="nextpage" href="#this" onclick="changePage('next');" >下一页</a>
	    	<a id="lastpage" href="#this" onclick="changePage('last');" >尾页</a>
			
	    </div>
    </div>
    
 </div>
</div>
