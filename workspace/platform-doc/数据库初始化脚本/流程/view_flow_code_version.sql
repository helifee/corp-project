CREATE VIEW `view_flow_code_version` AS SELECT
	`pt_flow_fl`.`code` AS `code`,
	max(`pt_flow_fl`.`version`) AS `verison`
FROM
	`pt_flow_fl`
WHERE
	(
		(`pt_flow_fl`.`delflag` = 0)
		AND (
			`pt_flow_fl`.`use_status` = 1
		)
	)
GROUP BY
	`pt_flow_fl`.`code`