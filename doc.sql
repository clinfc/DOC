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

 Date: 18/05/2020 23:30:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '文章内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '文章内容表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (2, '# 水平居中布局\n\n### 方案一\n\n优点：兼容性好\n\n缺点：`text-algin`属性具有继承性\n\n```css \n.box {\n	text-align: center;\n}\n.item {\n	display: inline-block;\n}\n```\n\n### 方案二\n\n优点：只需对子级元素设置即可实现水平居中效果\n\n缺点：如果子集元素脱离文档流，`margin`属性将失效\n\n脱离文档流：`float: left|right; position: absolute|fixed`\n\n```css\n.item {\n	display: block|table;\n	margin: 0 auto;\n}\n```\n\n### 方案三 \n\n优点：无论父级元素是否脱离文档流,都不影响子集元素的水平居中效果 \n\n缺点：`transform`为`css3`属性,浏览器支持性不好 \n\n```css\n.box {\n	position: relative;\n}\n.item {\n	position: absolute;\n	left: 50%;\n	transform: translateX(-50%);\n}\n```\n\n# 垂直居中布局\n\n### 方案一\n\n优点：浏览器兼容性较好\n\n缺点：`vertical-algin`属性具有继承性\n\n```css\n.box {\n	display: table-cell;\n	vertical-align: middle;\n}\n```\n\n### 方案二\n\n优点：无论父级元素是否脱离文档流,都不影响子集元素的垂直居中效果\n\n缺点：`transform`为`css3`属性,浏览器支持性不好\n\n```css\n.box {\n	position: relative;\n}\n.item {\n	position: absolute;\n	top: 50%;\n	transform: translateY(-50%);\n}\n```\n\n### 方案三\n\n```css\n.box {\n	display: -webkit-box;\n	-webkit-box-pack: center;\n	-webkit-box-align: center;\n}\n```\n\n# 居中布局\n\n### 方案一\n\n```css\n.box {\n	position: relative;\n}\n.item {\n	position: absolute;\n	top: 50%;\n	left: 50%;\n	transform: translate(-50%, -50%);\n}\n```\n\n### 方案二\n\n```css\n.box {\n	position: relative;\n}\n.item {\n	position: absolute;\n	top: 0;\n	right: 0;\n	bottom: 0;\n	left: 0;\n	margin: 0;\n}\n```\n\n### 方案三\n\n```css\n.box {\n	display: flex;\n	align-items: center;\n	justify-content: center;\n}\n```\n\n### 方案四\n\n```css\n.box {\n	display: table-cell;\n	vertical-align: middle;\n}\n.item {\n	display: block;\n	margin: 0 auto;\n}\n```\n\n# 两列布局\n\n### 方案一\n\n优点：实现简单\n\n缺点一：`margin-left`值与`width`必须保持一致,高耦合\n\n缺点二：浮动元素与不浮动元素共存会存在浏览器兼容问题\n\n缺点三：自适应子集元素使用了clear属性，该子集元素将会跑偏\n\n```css\n.item-left {\n	width: 200px;\n	float: left;	float使其脱离文档流\n}\n.item-right {\n	margin-left: 200px;\n}\n```\n\n### 方案二\n\n缺点一：`margin-left`值与`width`必须保持一致,高耦合\n\n缺点二：代价增加,复杂度增加\n\n```css\n.item-left {\n	float: left;\n	width: 200px;\n	position: relative;\n}\n.item-right {\n	float: right;\n	width: 100%;\n	margin-left: -200px;\n}\n.item-right-child {}\n```\n\n### 方案三\n\n优点：简单易用\n\n缺点：`overflow`不仅开启了`BFC`模式,还会隐藏溢出内容\n\n```css\n.item-left {\n	width: 200px;\n	float: left;\n}\n.item-right {\n	// 开启BFC模式 - 当前元素的内部环境与外界完全隔离\n	overflow: hidden;\n}\n```\n\n### 方案三\n\n优点：兼容性好\n\n缺点：受`table`属性制约\n\n```css\n.box {\n	display: table;\n	table-layout: fixed;\n}\n.item-left {\n	display: table-cell;\n	width: 200px;\n}\n.item-right {\n	display: table-cell;\n}\n```\n\n### 方案四\n\n```css\n.box {\n	display: flex;\n}\n.item-left {\n	width: 200px;\n}\n.item-right {\n	flex-grow: 1;\n}\n```\n\n# 等分布局\n\n### 方案一\n\n```css\n.item {\n	float: left;\n	width: 20%;\n}\n```\n\n### 方案二\n\n```css\n.box {\n	width: 100%;\n	display: table;\n	table-layout: fixed;\n}\n.item {\n	width: 20%;\n	display: table-cell;\n}\n```\n\n# 一排显示\n\n```css\n.item {\n	position: absolute;\n}\n.item:nth-child(1) {\n	-webkit-transform: translate3d(0, 0, 0);\n}\n.item:nth-child(2) {\n	-webkit-transform: translate3d(100px, 0, 0);\n}\n```');

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
-- Table structure for auth_group
-- ----------------------------
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE `auth_group`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '名称',
  `auth` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '权力集合（authority group）',
  `status` enum('0','1') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态。0：禁用。1：正常',
  `explain` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '说明',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '权限组' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth_group
-- ----------------------------
INSERT INTO `auth_group` VALUES (1, 'user', '19,20', '1', '普通用户');
INSERT INTO `auth_group` VALUES (2, '超级管理员', '1,2,4,10,11,12,17,18,19,20,21,22,23', '1', '后台超级管理员');

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
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '文章标签' ROW_FORMAT = Dynamic;

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
INSERT INTO `tag` VALUES (18, 14, 'nosql');
INSERT INTO `tag` VALUES (19, 0, '解决思路');
INSERT INTO `tag` VALUES (21, 7, '布局');

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
  INDEX `content`(`content`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '文章标题表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of title
-- ----------------------------
INSERT INTO `title` VALUES (1, '布局', '4,7,21', 2);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `pass` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '密码',
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '邮箱',
  `qq` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT 'QQ',
  `create` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update` int(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  `delete` int(11) NOT NULL DEFAULT 0 COMMENT '删除时间',
  `auth` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '权力ID',
  `private_auth` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '私有权限',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`, `email`, `qq`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '李白', '', '22222222@qq.com', '', 0, 0, 0, 0, '');
INSERT INTO `user` VALUES (2, 'clin', 'clin1324', '1962109568@qq.com', '', 1589615417, 1589615417, 0, 0, '');

SET FOREIGN_KEY_CHECKS = 1;
