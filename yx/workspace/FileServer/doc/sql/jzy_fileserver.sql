/*
Navicat MySQL Data Transfer

Source Server         : 192.168.3.179
Source Server Version : 50717
Source Host           : 192.168.3.179:3306
Source Database       : jzy_fileserver

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-08-21 13:57:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `files`
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `file_id` varchar(32) NOT NULL,
  `md5` varchar(32) DEFAULT NULL,
  `file_name` varchar(20) DEFAULT NULL,
  `file_type` varchar(20) DEFAULT NULL,
  `upload_time` datetime DEFAULT NULL,
  `file_location` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for `print_task`
-- ----------------------------
DROP TABLE IF EXISTS `print_task`;
CREATE TABLE `print_task` (
  `id` int(32) unsigned NOT NULL AUTO_INCREMENT,
  `task_prior` int(11) DEFAULT NULL,
  `input_type` int(11) DEFAULT NULL,
  `output_type` int(11) DEFAULT NULL,
  `send_page_notify` int(11) DEFAULT NULL,
  `file_src_path` varchar(200) DEFAULT NULL,
  `file_dest_path` varchar(200) DEFAULT NULL,
  `gen_thumb` int(11) DEFAULT NULL,
  `task_status` varchar(20) DEFAULT NULL,
  `page_count` int(11) DEFAULT NULL,
  `file_id` varchar(32) DEFAULT NULL,
  `printer_host` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `index_status` (`task_status`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for `task_details`
-- ----------------------------
DROP TABLE IF EXISTS `task_details`;
CREATE TABLE `task_details` (
  `id` int(32) unsigned NOT NULL AUTO_INCREMENT,
  `task_id` int(32) unsigned DEFAULT NULL,
  `file_id` varchar(20) DEFAULT NULL,
  `page_index` int(11) DEFAULT NULL,
  `image_type` int(11) DEFAULT NULL,
  `path` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for `user_file`
-- ----------------------------
DROP TABLE IF EXISTS `user_file`;
CREATE TABLE `user_file` (
  `id` varchar(32) NOT NULL,
  `application_code` varchar(20) DEFAULT NULL,
  `file_id` varchar(32) DEFAULT NULL,
  `upload_time` datetime DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  `file_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
