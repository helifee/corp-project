ALTER TABLE `flow_instance`
ADD COLUMN `instance_group_id`  varchar(255) NULL COMMENT '流程实例组：打回或退前后的实例为一组' AFTER `attachment_id`;

ALTER TABLE `flow_instance_approval_record`
ADD COLUMN `approval_user_type`  int NULL COMMENT '0 内部联系人 1外部联系人' AFTER `reject_count`;

ALTER TABLE `flow_custom_form_instance`
ADD COLUMN `businessId` varchar(64) NOT NULL COMMENT '业务主键' AFTER `id`