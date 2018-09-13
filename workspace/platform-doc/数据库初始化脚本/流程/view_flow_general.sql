CREATE VIEW `view_flow_general` AS SELECT
	`a`.`id` AS `id`,
	`a`.`create_person_id` AS `create_person_id`,
	`a`.`create_person_name` AS `create_person_name`,
	`a`.`create_org_id` AS `create_org_id`,
	`a`.`create_org_name` AS `create_org_name`,
	`a`.`create_company_id` AS `create_company_id`,
	`a`.`create_company_name` AS `create_company_name`,
	`a`.`create_date` AS `create_date`,
	`a`.`update_person_id` AS `update_person_id`,
	`a`.`update_person_name` AS `update_person_name`,
	`a`.`update_date` AS `update_date`,
	`a`.`delflag` AS `delflag`,
	`a`.`concurrency_version` AS `concurrency_version`,
	`a`.`code` AS `code`,
	`a`.`post_is_null` AS `post_is_null`,
	`a`.`approval_person_is_null` AS `approval_person_is_null`,
	`a`.`post_multi_person` AS `post_multi_person`,
	`a`.`retract` AS `retract`,
	`a`.`use_status` AS `use_status`,
	`a`.`remark` AS `remark`,
	`a`.`status` AS `status`,
	`a`.`name` AS `name`,
	`a`.`flow_title` AS `flow_title`,
	`a`.`title_update` AS `title_update`,
	`a`.`app_id` AS `app_id`,
	`a`.`business_object_id` AS `business_object_id`,
	`a`.`is_defualt` AS `is_defualt`,
	`a`.`version` AS `version`,
	`a`.`sort` AS `sort`,
	`a`.`approval_repeat` AS `approval_repeat`,
	`a`.`disable_date` AS `disable_date`,
	`a`.`disable_person_id` AS `disable_person_id`,
	`a`.`disable_person_name` AS `disable_person_name`,
	`a`.`tend_id` AS `tend_id`
FROM
	(
		`view_flow_code_version` `aa`
		JOIN `pt_flow_fl` `a`
	)
WHERE
	(
		(`a`.`code` = `aa`.`code`)
		AND (
			`a`.`version` = `aa`.`verison`
		)
		AND (`a`.`delflag` = 0)
		AND (`a`.`use_status` = 1)
	)