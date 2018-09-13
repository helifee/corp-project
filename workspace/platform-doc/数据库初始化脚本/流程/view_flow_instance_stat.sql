CREATE VIEW `view_flow_instance_stat` AS SELECT
	`pt_flow_instance_operate_log`.`instance_id` AS `instance_id`,
	`pt_flow_instance_operate_log`.`operator_ids` AS `operator_ids`,
	`pt_flow_instance_operate_log`.`company_id` AS `company_id`,
	`pt_flow_instance_operate_log`.`dept_id` AS `dept_id`,
	`pt_flow_instance_operate_log`.`operate_time` AS `start_date`,
	ifnull(
		`pt_flow_instance_operate_log`.`delete_time`,
		now()
	) AS `end_date`,
	timestampdiff(
		HOUR,
		`pt_flow_instance_operate_log`.`operate_time`,
		ifnull(
			`pt_flow_instance_operate_log`.`delete_time`,
			now()
		)
	) AS `hour_sum`
FROM
	`pt_flow_instance_operate_log`
WHERE
	(
		`pt_flow_instance_operate_log`.`operate_type` = 'TO_DO'
	)