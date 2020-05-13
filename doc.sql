/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : doc

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 13/05/2020 15:11:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(10) NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '文章内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '文章内容表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------

-- ----------------------------
-- Table structure for aside
-- ----------------------------
DROP TABLE IF EXISTS `aside`;
CREATE TABLE `aside`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '菜单名称',
  `to` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '/' COMMENT '路由链接',
  `icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '图标',
  `pid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父级ID',
  `status` enum('0','1') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '是否可见。1：是；0：否',
  `sort` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序，数字越小，权重越大',
  `type` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '菜单模块名',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `title`(`title`) USING BTREE,
  INDEX `type`(`type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '后台侧导航栏' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of aside
-- ----------------------------
INSERT INTO `aside` VALUES (1, '首页', '/admin', 'el-icon-s-home', 0, '1', 0, 'admin');
INSERT INTO `aside` VALUES (2, '菜单管理', '/admin/aside', 'el-icon-s-order', 0, '1', 2, 'admin');
INSERT INTO `aside` VALUES (4, '菜单列表', '/admin/aside/list', 'el-icon-arrow-right', 2, '1', 0, 'admin');
INSERT INTO `aside` VALUES (10, '标签管理', '/admin/tag', 'el-icon-collection-tag', 0, '1', 1, 'admin');
INSERT INTO `aside` VALUES (11, '用户管理', '/admin/account', 'el-icon-user-solid', 0, '1', 4, 'admin');
INSERT INTO `aside` VALUES (12, '用户列表', '/admin/account/list', 'el-icon-arrow-right', 11, '1', 0, 'admin');
INSERT INTO `aside` VALUES (17, '网站设置', '/admin/setting', 'el-icon-setting', 0, '1', 5, 'admin');
INSERT INTO `aside` VALUES (18, '菜单排序', '/admin/aside/sort', 'el-icon-arrow-right', 2, '1', 1, 'admin');
INSERT INTO `aside` VALUES (19, '个人中心', '/user', '', 0, '1', 6, 'user');
INSERT INTO `aside` VALUES (20, '常规设置', '/user/setting', '', 19, '1', 0, 'user');
INSERT INTO `aside` VALUES (21, '权限管理', '/admin/authority', 'iconfont icon-quanxian', 0, '1', 3, 'admin');
INSERT INTO `aside` VALUES (22, '权限分组', '/admin/authority/group', 'el-icon-arrow-right', 21, '1', 0, 'admin');
INSERT INTO `aside` VALUES (23, '用户权限', '/admin/authority/user', 'el-icon-arrow-right', 21, '1', 1, 'admin');

-- ----------------------------
-- Table structure for auth
-- ----------------------------
DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '名称',
  `auth` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '权力集合（authority group）',
  `status` enum('0','1') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态。0：禁用。1：正常',
  `explain` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '说明',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '权限组' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth
-- ----------------------------
INSERT INTO `auth` VALUES (1, '超级管理员', '1,2,4,10,11,12,17,18,19,20,21,22,23', '1', '后台超级管理员');
INSERT INTO `auth` VALUES (2, 'user', '19,20', '1', '普通用户');

-- ----------------------------
-- Table structure for authority
-- ----------------------------
DROP TABLE IF EXISTS `authority`;
CREATE TABLE `authority`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '权力类型 - 名称',
  `authority` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '权力集合',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of authority
-- ----------------------------

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `pid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父级ID',
  `name` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '标签名',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE,
  INDEX `pid`(`pid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '文章标签' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (4, 0, '前端');
INSERT INTO `tag` VALUES (5, 0, '后端');
INSERT INTO `tag` VALUES (6, 4, 'HTML');
INSERT INTO `tag` VALUES (7, 4, 'CSS');
INSERT INTO `tag` VALUES (12, 4, 'JavaScript');
INSERT INTO `tag` VALUES (13, 5, 'PHP');
INSERT INTO `tag` VALUES (14, 0, '数据库');
INSERT INTO `tag` VALUES (15, 14, 'MySQL');
INSERT INTO `tag` VALUES (16, 14, 'MongoDB');
INSERT INTO `tag` VALUES (17, 14, 'Redis');

-- ----------------------------
-- Table structure for title
-- ----------------------------
DROP TABLE IF EXISTS `title`;
CREATE TABLE `title`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '文章标题',
  `tags` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '文章标签',
  `content` int(10) NULL DEFAULT NULL COMMENT '文章内容 ID',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `content`(`content`) USING BTREE,
  CONSTRAINT `title_ibfk_1` FOREIGN KEY (`content`) REFERENCES `article` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '文章标题表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of title
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `pass` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '邮箱',
  `qq` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT 'QQ',
  `create` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update` int(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  `delete` int(11) NOT NULL DEFAULT 0 COMMENT '删除时间',
  `auth` int(10) NOT NULL COMMENT '权力ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`, `email`, `qq`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
