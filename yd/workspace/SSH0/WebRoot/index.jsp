<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%> 

<html>
    <head>
        <sx:head   debug = "true"/>
        <script type="text/javascript">
        	dojo.event.topic.subscribe("/list", function(data, type, request) {
                if(type == "load") {
                }

          	});
        	dojo.event.topic.subscribe("/save", function(data, type, request) {
                if(type == "load") {
                    dojo.byId("id").value = "";
                    dojo.byId("name").value = "";
                    dojo.byId("isbm").value = "";
                    dojo.byId("author").value = "";
                }
            });

            dojo.event.topic.subscribe("/edit", function(data, type, request) {
                if(type == "before") {
                    var id = data.split("_")[1];
                    var tr = dojo.byId("row_"+id);
                    var tds = tr.getElementsByTagName("td");

                    dojo.byId("id").value = id;
                    dojo.byId("name").value = dojo.string.trim(dojo.dom.textContent(tds[0]));
                    dojo.byId("isbm").value = dojo.string.trim(dojo.dom.textContent(tds[1]));
                    dojo.byId("author").value = dojo.string.trim(dojo.dom.textContent(tds[2]));
                }
            });
        </script>
    </head>
    <body>
        <s:url action="list" id="descrsUrl"/>

        <div style="width: 300px;border-style: solid">
            <div style="text-align: right;">
                <sx:a  notifyTopics="/refresh">Refresh</sx:a>
            </div>
            <sx:div id="books"  href="%{descrsUrl}" loadingText="Loading" listenTopics="/refresh"/>
        </div>

        <br/>

        <div style="width: 300px;border-style: solid">
            <p>Book Data</p>
            <s:form action="save" >
                <s:textfield id="id" name="book.id" cssStyle="display:none"/>
                <s:textfield id="name" label="Name" name="book.name"/>
                <s:textfield id="isbm" label="ISBN" name="book.isbm"/>
                <s:textfield id="author" label="Author" name="book.author"/>
                <sx:submit  targets="books" notifyTopics="/save"/>
            </s:form>
        </div>
    </body>
</html>

