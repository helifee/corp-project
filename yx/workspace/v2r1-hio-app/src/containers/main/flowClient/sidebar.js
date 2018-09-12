let sidebar = {
    renderSidebar (graphStage, container) {
        var tbContainer = document.createElement('div');
        tbContainer.className = 'sidebar';
        // container.appendChild(tbContainer);

        jQuery(container).after(tbContainer);

        var sidebar = new mxToolbar(tbContainer);
        sidebar.enabled = false;

        this.insertCompsIntoSidebar(graphStage, sidebar);
    },

    // 设置组件并加入到侧边栏
    insertCompsIntoSidebar (graphStage, sidebar) {
        //setDefaultCellStyle(graphStage);
        var my = this;
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
            my.addSidebarItem(graphStage, sidebar, vertex, icon);
        };

        // addVertex('static/mxClient/images/editor/sidebar/s.png', 50, 50, 'start');
        addVertex('static/mxClient/images/editor/sidebar/block.png', 112, 48, 'task');
        addVertex('static/mxClient/images/editor/sidebar/c.png', 50, 50, 'fork');
        addVertex('static/mxClient/images/editor/sidebar/d.png', 50, 50, 'join');
        // addVertex('static/mxClient/images/editor/sidebar/f.png', 50, 50, 'end');
        // addVertex('static/mxClient/images/editor/sidebar/message.png', 50, 50, 'cc');

        addVertex = null;
    },

    // 增加左侧元素栏的子元素
    addSidebarItem (graphStage, sidebar, prototype, image) {
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
    }
    
}
export default sidebar;