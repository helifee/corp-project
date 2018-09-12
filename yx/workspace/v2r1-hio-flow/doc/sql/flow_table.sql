-- ----------------------------
-- Table structure for `flow_category`
-- ----------------------------
DROP TABLE IF EXISTS `flow_category`;
CREATE TABLE `flow_category` (
  `id` varchar(65) NOT NULL,
  `name` varchar(65) DEFAULT NULL,
  `sort` double DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(65) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(65) DEFAULT NULL,
  `concurrency_version` varchar(256) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_copy`
-- ----------------------------
DROP TABLE IF EXISTS `flow_copy`;
CREATE TABLE `flow_copy` (
  `id` varchar(65) NOT NULL,
  `copy_user` varchar(65) DEFAULT NULL,
  `flow_instance_id` varchar(65) DEFAULT NULL,
  `isRead` int(11) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL COMMENT '1表单上抄送、2环节上抄送、3抄送按钮',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(65) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(65) DEFAULT NULL,
  `concurrency_version` varchar(256) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_custom_form`
-- ----------------------------
DROP TABLE IF EXISTS `flow_custom_form`;
CREATE TABLE `flow_custom_form` (
  `id` varchar(64) NOT NULL COMMENT '主键',
  `code` varchar(255) DEFAULT NULL COMMENT '编码',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `type` int(11) DEFAULT NULL COMMENT '1:自定义表单 0：第三方表单',
  `data_save_url` varchar(255) DEFAULT NULL COMMENT '表单数据保存URL',
  `data_delete_url` varchar(255) DEFAULT NULL COMMENT '表单数据删除URL',
  `data_status_url` varchar(255) DEFAULT NULL COMMENT '表单状态更新URL',
  `call_back_param` varchar(255) DEFAULT NULL COMMENT '回调方法参数',
  `flow_template_code` varchar(64) DEFAULT NULL COMMENT '关联流程模板ID',
  `form_layout` text COMMENT '表单格式JSON',
  `form_properties` text COMMENT '表单显示列',
  `flow_properties` text COMMENT '流程中使用的属性',
  `status` int(1) DEFAULT NULL COMMENT '状态',
  `create_person_id` varchar(64) DEFAULT NULL COMMENT '创建者的ID或者CODE，唯一标识',
  `create_person_name` varchar(64) DEFAULT NULL COMMENT '创建者姓名',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_person_id` varchar(64) DEFAULT NULL COMMENT '更新者ID或者CODE',
  `update_person_name` varchar(64) DEFAULT NULL COMMENT '更新者姓名',
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `concurrency_version` int(11) DEFAULT NULL COMMENT '并发版本',
  `delflag` varchar(32) DEFAULT NULL COMMENT '逻辑删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='自定义表单';

-- ----------------------------
-- Table structure for `flow_custom_form_instance`
-- ----------------------------
DROP TABLE IF EXISTS `flow_custom_form_instance`;
CREATE TABLE `flow_custom_form_instance` (
  `id` varchar(64) NOT NULL COMMENT '主键',
  `form_title` varchar(500) DEFAULT NULL COMMENT '表单标题',
  `custom_form_id` varchar(64) DEFAULT NULL COMMENT '表单ID',
  `form_values` text COMMENT '表单值JSON',
  `instance_id` varchar(64) DEFAULT NULL COMMENT '流程实例id',
  `status` varchar(10) DEFAULT NULL COMMENT '状态 0 草稿  1 审批中  2审批完成',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_person_name` varchar(64) DEFAULT NULL COMMENT '创建者姓名',
  `create_person_id` varchar(64) DEFAULT NULL COMMENT '创建者的ID或者CODE，唯一标识',
  `update_person_id` varchar(64) DEFAULT NULL COMMENT '更新者ID或者CODE',
  `update_person_name` varchar(64) DEFAULT NULL COMMENT '更新者姓名',
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `concurrency_version` int(11) DEFAULT NULL COMMENT '并发版本',
  `delflag` varchar(32) DEFAULT NULL COMMENT '逻辑删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`),
  KEY `custom_form_id` (`custom_form_id`) USING BTREE,
  KEY `create_date` (`create_date`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='自定义表单实例';

-- ----------------------------
-- Table structure for `flow_follow_instance`
-- ----------------------------
DROP TABLE IF EXISTS `flow_follow_instance`;
CREATE TABLE `flow_follow_instance` (
  `id` varchar(65) NOT NULL,
  `flow_instance_id` varchar(65) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(65) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(65) DEFAULT NULL,
  `concurrency_version` varchar(256) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  `isFollow` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_form`
-- ----------------------------
DROP TABLE IF EXISTS `flow_form`;
CREATE TABLE `flow_form` (
  `id` varchar(65) NOT NULL,
  `business_id` varchar(65) DEFAULT NULL COMMENT '业务单据ID',
  `instance_id` varchar(65) DEFAULT NULL COMMENT '流程实例ID',
  `template_id` varchar(65) DEFAULT NULL COMMENT '模板ID',
  `attr_code` varchar(100) DEFAULT NULL COMMENT '表单属性编码',
  `attr_name` varchar(255) DEFAULT NULL COMMENT '表单属性名称',
  `attr_value` varchar(500) DEFAULT NULL COMMENT '表单属性值',
  `sort` double DEFAULT NULL COMMENT '属性排序',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(65) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(65) DEFAULT NULL,
  `concurrency_version` varchar(256) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_form_properties`
-- ----------------------------
DROP TABLE IF EXISTS `flow_form_properties`;
CREATE TABLE `flow_form_properties` (
  `id` varchar(65) NOT NULL,
  `flow_template_id` varchar(65) DEFAULT NULL,
  `attrCode` varchar(65) DEFAULT NULL,
  `attrType` varchar(65) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(65) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(65) DEFAULT NULL,
  `concurrency_version` varchar(65) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_instance`
-- ----------------------------
DROP TABLE IF EXISTS `flow_instance`;
CREATE TABLE `flow_instance` (
  `id` varchar(65) NOT NULL,
  `name` varchar(65) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `projectid` varchar(65) DEFAULT NULL,
  `flow_template_id` varchar(65) DEFAULT NULL,
  `custom_form_id` varchar(65) DEFAULT NULL COMMENT '表单定义ID',
  `business_id` varchar(65) DEFAULT NULL,
  `attachment_id` varchar(65) DEFAULT NULL COMMENT '附件url',
  `free_flow_nodes` text COMMENT '自由流环节信息',
  `create_date` datetime DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(65) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(65) DEFAULT NULL,
  `concurrency_version` varchar(65) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_instance_ac`
-- ----------------------------
DROP TABLE IF EXISTS `flow_instance_ac`;
CREATE TABLE `flow_instance_ac` (
  `id` varchar(65) NOT NULL,
  `flow_instance_id` varchar(65) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '加签名称',
  `state` int(11) DEFAULT '0',
  `type` int(11) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `source` int(11) DEFAULT '0',
  `node_type` int(11) DEFAULT NULL,
  `left_node_count` int(11) DEFAULT NULL COMMENT 'join节点使用',
  `template_node_id` varchar(65) DEFAULT NULL COMMENT '对应的模板环节ID',
  `pre_node_ids` varchar(255) DEFAULT NULL COMMENT '实例中前置环节ID集合',
  `next_node_ids` varchar(255) DEFAULT NULL COMMENT '实例中后置环节ID集合',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(65) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(65) DEFAULT NULL,
  `concurrency_version` varchar(256) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_instance_approval_record`
-- ----------------------------
DROP TABLE IF EXISTS `flow_instance_approval_record`;
CREATE TABLE `flow_instance_approval_record` (
  `id` varchar(65) NOT NULL,
  `flow_instance_id` varchar(65) DEFAULT NULL,
  `flow_instance_ac_id` varchar(65) DEFAULT NULL,
  `state` int(11) NOT NULL DEFAULT '0',
  `approval_user` varchar(65) DEFAULT NULL,
  `postId` varchar(65) DEFAULT NULL,
  `approval_opinion` int(11) DEFAULT NULL,
  `approval_description` varchar(65) DEFAULT NULL,
  `approval_time` timestamp NULL DEFAULT NULL,
  `reject_count` int(11) DEFAULT '0',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(65) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(65) DEFAULT NULL,
  `concurrency_version` varchar(256) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  `adminId` varchar(65) DEFAULT NULL COMMENT '管理员Id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_link_line`
-- ----------------------------
DROP TABLE IF EXISTS `flow_link_line`;
CREATE TABLE `flow_link_line` (
  `id` varchar(65) NOT NULL,
  `name` varchar(65) DEFAULT NULL,
  `display_name` varchar(65) DEFAULT NULL,
  `condition_formula` varchar(255) DEFAULT NULL COMMENT '条件公式',
  `condition_name` varchar(255) DEFAULT NULL COMMENT '公式值',
  `start_line` varchar(65) DEFAULT NULL COMMENT '开始线',
  `target_line` varchar(65) DEFAULT NULL COMMENT '目标线',
  `flow_template_id` varchar(65) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(65) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(65) DEFAULT NULL,
  `concurrency_version` varchar(256) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_template`
-- ----------------------------
DROP TABLE IF EXISTS `flow_template`;
CREATE TABLE `flow_template` (
  `id` varchar(65) NOT NULL,
  `name` varchar(65) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `free_or_template` varchar(255) DEFAULT NULL,
  `sort` double DEFAULT NULL COMMENT '排序',
  `flow_category_id` varchar(65) DEFAULT NULL,
  `code` varchar(65) DEFAULT NULL,
  `is_repeat` int(11) DEFAULT NULL,
  `flow_auto_complate` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(65) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(65) DEFAULT NULL,
  `concurrency_version` varchar(65) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_template_ac`
-- ----------------------------
DROP TABLE IF EXISTS `flow_template_ac`;
CREATE TABLE `flow_template_ac` (
  `id` varchar(65) NOT NULL,
  `name` varchar(65) DEFAULT NULL,
  `approval_type` int(11) DEFAULT NULL,
  `flow_template_id` varchar(65) DEFAULT NULL,
  `node_type` int(11) DEFAULT NULL,
  `node_sort` int(11) DEFAULT NULL,
  `node_id` varchar(65) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` varchar(65) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `overdue_time` int(11) DEFAULT NULL,
  `overdue_handle` varchar(256) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(65) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(65) DEFAULT NULL,
  `concurrency_version` varchar(256) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_template_ac_copy`
-- ----------------------------
DROP TABLE IF EXISTS `flow_template_ac_copy`;
CREATE TABLE `flow_template_ac_copy` (
  `id` varchar(65) NOT NULL,
  `userid` varchar(65) DEFAULT NULL,
  `flow_ac_id` varchar(65) DEFAULT NULL,
  `flow_template_id` varchar(65) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(65) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(65) DEFAULT NULL,
  `concurrency_version` varchar(256) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_template_approver`
-- ----------------------------
DROP TABLE IF EXISTS `flow_template_approver`;
CREATE TABLE `flow_template_approver` (
  `id` varchar(65) NOT NULL,
  `flow_template_id` varchar(65) DEFAULT NULL,
  `flow_ac_id` varchar(65) DEFAULT NULL,
  `approverId` varchar(256) DEFAULT NULL,
  `approval_type` int(11) DEFAULT NULL,
  `approval_type_name` varchar(256) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(256) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(256) DEFAULT NULL,
  `concurrency_version` varchar(256) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flow_template_role`
-- ----------------------------
DROP TABLE IF EXISTS `flow_template_role`;
CREATE TABLE `flow_template_role` (
  `id` varchar(65) NOT NULL,
  `flow_template_id` varchar(256) DEFAULT NULL,
  `choose_type` int(11) DEFAULT NULL,
  `root_id` varchar(65) DEFAULT NULL,
  `root_name` varchar(256) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_person_id` varchar(65) DEFAULT NULL,
  `create_person_name` varchar(256) DEFAULT NULL,
  `update_person_id` varchar(65) DEFAULT NULL,
  `update_person_name` varchar(256) DEFAULT NULL,
  `concurrency_version` varchar(256) DEFAULT NULL,
  `delflag` int(11) DEFAULT NULL,
  `choose_type_name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
