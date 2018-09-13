console.info('>> module "sidebar" is loaded');
define(function () {
    var renderSidebar = function (graphStage, container) {
        var tbContainer = document.createElement('div');
        tbContainer.className = 'sidebar';
        container.appendChild(tbContainer);

        var sidebar = new mxToolbar(tbContainer);
        sidebar.enabled = false;

        insertCompsIntoSidebar(graphStage, sidebar);
    };

    // 设置组件并加入到侧边栏
    var insertCompsIntoSidebar = function (graphStage, sidebar) {
        //setDefaultCellStyle(graphStage);

        var addVertex = function (icon, w, h, style) {
            var defaultValue = null;
            var vertex = new mxCell(defaultValue, new mxGeometry(0, 0, w, h), style);
            var encoder = new mxCodec();
            var node = encoder.encode(vertex);

            if(style=='start'){
                defaultValue = '开始';
                node.setAttribute('nodeType','start');
            }
            if(style=='end'){
                defaultValue = '结束';
                node.setAttribute('nodeType','end');
            }
            if(style=='fork'){
                defaultValue = '条件网关';
                node.setAttribute('nodeType','fork');
            }
            if(style=='join'){
                defaultValue = '聚合网关';
                node.setAttribute('nodeType','join');
            }
            if(style=='task'){
                defaultValue = '新节点';
                node.setAttribute('nodeType','task');
            }
            if(style=='cc'){
                defaultValue = '抄送';
                node.setAttribute('nodeType','cc');
            }

            var xml = mxUtils.getXml(node);
            var doc = mxUtils.parseXml(xml);
            var codec = new mxCodec(doc);
            var elt = doc.documentElement;
            var cells = [];

            while (elt != null)
            {
                cells.push(codec.decode(elt));
                elt = elt.nextSibling;
            }
            vertex = cells[0];
            vertex.setValue(defaultValue);
            vertex.setVertex(true);
            addSidebarItem(graphStage, sidebar, vertex, icon);
        };

        addVertex('images/editor/sidebar/start.png', 40, 40, 'start');
        addVertex('images/editor/sidebar/block.png', 100, 40, 'task');
        addVertex('images/editor/sidebar/condition.png', 50, 50, 'fork');
        addVertex('images/editor/sidebar/dispatch.png', 50, 50, 'join');
        addVertex('images/editor/sidebar/over.png', 40, 40, 'end');
        addVertex('images/editor/sidebar/message.png', 50, 50, 'cc');

        addVertex = null;
    };

    // 增加左侧元素栏的子元素
    var addSidebarItem = function (graphStage, sidebar, prototype, image) {
        var funct = function (graphStage, evt, cell) {
            graphStage.stopEditing(false);

            var pt = graphStage.getPointForEvent(evt);
            var vertex = graphStage.getModel().cloneCell(prototype);
            vertex.geometry.x = pt.x;
            vertex.geometry.y = pt.y;

            graphStage.setSelectionCells(graphStage.importCells([vertex], 0, 0, cell));
        };

        // Creates the image which is used as the drag icon (preview)
        var img = sidebar.addMode(null, image, funct);
        mxUtils.makeDraggable(img, graphStage, funct);
        img = null;
    };

    return {
        renderSidebar: renderSidebar
    };
});