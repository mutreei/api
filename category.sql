/*
SQLyog Ultimate v10.00 Beta1
MySQL - 8.0.26 : Database - library
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`library` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `library`;

/*Table structure for table `books` */

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `bookid` char(40) NOT NULL COMMENT '图书id',
  `bookname` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '图书名',
  `author` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '作者',
  `bookCover` char(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '图书封面照片地址',
  `publisher` char(20) DEFAULT NULL COMMENT '出版社',
  `bookType` enum('战争','爱情','生活','理想','幽默','短片合集','知识') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '图书类型',
  `surplus` int DEFAULT NULL COMMENT '剩余该图书数量',
  `price` int NOT NULL COMMENT '价格',
  `borrowPrice` int NOT NULL COMMENT '借阅价格/天',
  PRIMARY KEY (`bookid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `books` */

insert  into `books`(`bookid`,`bookname`,`author`,`bookCover`,`publisher`,`bookType`,`surplus`,`price`,`borrowPrice`) values ('0b7b5a3f-10ba-4fdc-a707-5de7c3242734','结衣','新垣结衣','http://127.0.0.1:3001/public/images/结衣.jpeg',NULL,NULL,1,50000,5000),('1025bebb-8368-41fb-bbd4-ceb81428fd08','react','facebook','http://127.0.0.1:3001/public/images/react.jpeg',NULL,NULL,11,10,100),('3aedbdaf-afed-4bb7-aa74-edff7118d8b2','react','facebook','http://127.0.0.1:3001/public/images/react.jpeg',NULL,NULL,11,10,100),('8aab9a37-ff4c-41f1-b007-00df522182b3','google','不知道','http://127.0.0.1:3001/public/images/google.jpeg','',NULL,9,50,5),('a396fa17-43b4-4eb6-a190-4f8f88bac82e','react','facebook','http://127.0.0.1:3001/public/images/react.jpeg',NULL,NULL,11,10,100),('a7396746-3501-46c2-be80-bcc05ec6b510','asd','as','http://127.0.0.1:3001/public/images/asd.jpeg',NULL,NULL,3,123,12),('c82a1145-8bbc-4104-ad0e-b92f11d99e53','react','facebook','http://127.0.0.1:3001/public/images/react.jpeg',NULL,NULL,11,10,100),('f8812617-9c4e-4435-b687-95a6fb044c9d','react','facebook','http://127.0.0.1:3001/public/images/react.jpeg',NULL,NULL,11,10,100),('ff0bcafa-e924-4b59-9543-b8ca185d9acd','自我管理','小明','http://127.0.0.1:3001/public/images/自我管理.jpeg',NULL,NULL,100,38,9),('uuid01','水浒传','施耐庵','http://localhost:3001/public/images/水浒传.jpeg','',NULL,6,30,5),('uuid02','三国演义','罗贯中','http://localhost:3001/public/images/三国演义.jpeg','',NULL,4,40,6),('uuid03','西游记','吴承恩','http://localhost:3001/public/images/西游记.jpeg','',NULL,6,50,8),('uuid04','红楼梦','曹雪芹','http://localhost:3001/public/images/红楼梦.jpeg','',NULL,7,60,10);

/*Table structure for table `borrow` */

DROP TABLE IF EXISTS `borrow`;

CREATE TABLE `borrow` (
  `userID` char(40) DEFAULT NULL COMMENT '借阅人ID',
  `username` char(20) DEFAULT NULL COMMENT '借阅人name',
  `bookID` char(40) DEFAULT NULL COMMENT '借阅书籍ID',
  `bookName` char(20) DEFAULT NULL COMMENT '借阅人name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `borrow` */

insert  into `borrow`(`userID`,`username`,`bookID`,`bookName`) values ('88d4998a-8036-473c-937f-4daca88f3de3','reader','uuid03','西游记'),('88d4998a-8036-473c-937f-4daca88f3de3','reader','uuid01','水浒传'),('88d4998a-8036-473c-937f-4daca88f3de3','reader','uuid02','三国演义'),('88d4998a-8036-473c-937f-4daca88f3de3','reader','uuid02','三国演义');

/*Table structure for table `notice` */

DROP TABLE IF EXISTS `notice`;

CREATE TABLE `notice` (
  `time` timestamp(6) NOT NULL COMMENT '公告发布时间',
  `title` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公告标题',
  `content` varchar(140) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公告内容',
  `publisherID` char(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公告发布者ID',
  `publisherName` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公告发布者name',
  PRIMARY KEY (`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `notice` */

insert  into `notice`(`time`,`title`,`content`,`publisherID`,`publisherName`) values ('2022-08-23 21:10:52.000000','我自己的图书馆开业啦！','最新优惠，消费满100可打八折！','ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01'),('2022-08-24 12:30:43.000000','中秋快乐！','全场八折起售','0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei'),('2023-02-08 13:52:54.000000','端午感恩大回馈','全场六折起','fc17f9a8-e8d7-45b4-a1cd-6b04900d0f54','admin'),('2023-02-08 13:57:47.000000','发布公告','123','fc17f9a8-e8d7-45b4-a1cd-6b04900d0f54','admin');

/*Table structure for table `recharge` */

DROP TABLE IF EXISTS `recharge`;

CREATE TABLE `recharge` (
  `userID` char(40) NOT NULL COMMENT '充值/消费用户账号',
  `userName` char(20) NOT NULL COMMENT '充值/消费用户昵称',
  `amount` int NOT NULL COMMENT '充值/消费金额',
  `time` timestamp(6) NOT NULL COMMENT '充值/消费时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `recharge` */

insert  into `recharge`(`userID`,`userName`,`amount`,`time`) values ('asd','asd',10,'2022-08-22 22:03:44.000000'),('7f4fa75b-c223-4957-9e98-6e5c6aea5e21','undefined',100,'2022-08-22 23:44:53.000000'),('7f4fa75b-c223-4957-9e98-6e5c6aea5e21','undefined',100,'2022-08-22 23:46:02.000000'),('7f4fa75b-c223-4957-9e98-6e5c6aea5e21','undefined',100,'2022-08-22 23:46:59.000000'),('7f4fa75b-c223-4957-9e98-6e5c6aea5e21','undefined',100,'2022-08-22 23:47:13.000000'),('7f4fa75b-c223-4957-9e98-6e5c6aea5e21','undefined',100,'2022-08-22 23:49:01.000000'),('7f4fa75b-c223-4957-9e98-6e5c6aea5e21','undefined',100,'2022-08-22 23:49:25.000000'),('7f4fa75b-c223-4957-9e98-6e5c6aea5e21','username',100,'2022-08-22 23:51:03.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',100,'2022-08-23 20:28:06.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',100,'2022-08-23 20:29:30.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',100,'2022-08-23 20:29:48.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',100,'2022-08-23 20:30:58.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',100,'2022-08-23 20:32:32.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',100,'2022-08-23 20:32:47.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',100,'2022-08-23 20:34:14.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',105,'2022-08-23 20:34:24.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',105,'2022-08-23 20:36:34.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',105,'2022-08-23 20:36:54.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',105,'2022-08-23 20:37:38.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',105,'2022-08-23 20:38:05.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',110,'2022-08-23 20:38:15.000000'),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','testmodify01',110,'2022-08-23 20:39:30.000000'),('0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei',110,'2022-08-24 12:29:40.000000'),('0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei',-8,'2022-08-31 19:49:57.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',110,'2023-01-14 17:42:17.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',20,'2023-01-14 17:42:23.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-50,'2023-01-14 17:42:29.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',1000,'2023-01-16 16:49:27.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',100,'2023-01-16 20:11:59.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',40,'2023-01-16 20:34:06.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-40,'2023-01-16 20:35:48.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-100,'2023-01-16 20:39:39.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-30,'2023-01-17 16:21:30.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-30,'2023-01-17 16:26:36.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-10,'2023-01-17 19:55:27.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-60,'2023-01-17 19:56:11.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-10,'2023-01-17 19:56:57.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-10,'2023-01-17 19:57:42.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-5,'2023-01-17 19:59:59.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-60,'2023-01-17 20:00:21.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-60,'2023-01-17 20:00:34.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-5,'2023-01-17 20:02:56.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-6,'2023-01-17 20:13:03.000000'),('88d4998a-8036-473c-937f-4daca88f3de3','reader',-10,'2023-01-18 21:15:37.000000');

/*Table structure for table `record` */

DROP TABLE IF EXISTS `record`;

CREATE TABLE `record` (
  `bookName` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '借的书名',
  `time` timestamp(6) NULL DEFAULT NULL COMMENT '还书时间',
  `readerID` char(40) NOT NULL COMMENT '借阅人id',
  `readerName` char(20) NOT NULL COMMENT '借阅人姓名',
  `type` enum('borrow','buy','return') NOT NULL COMMENT '操作类型（借阅/归还/购买）'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `record` */

insert  into `record`(`bookName`,`time`,`readerID`,`readerName`,`type`) values ('三国演义','2022-08-25 16:09:48.000000','0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei','borrow'),('西游记','2022-08-29 09:59:58.000000','fc17f9a8-e8d7-45b4-a1cd-6b04900d0f54','admin','borrow'),('西游记','2022-08-30 21:50:23.000000','fc17f9a8-e8d7-45b4-a1cd-6b04900d0f54','undefined','return'),('三国演义','2022-08-31 19:33:35.000000','0bf6810d-1a3f-4d76-a070-ac114cce4f82','undefined','return'),('西游记','2022-08-31 19:36:55.000000','0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei','borrow'),('西游记','2022-08-31 19:37:02.000000','0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei','return'),('西游记','2022-08-31 19:47:07.000000','0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei','borrow'),('西游记','2022-08-31 19:47:08.000000','0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei','borrow'),('西游记','2022-08-31 19:47:17.000000','0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei','return'),('西游记','2022-08-31 19:48:10.000000','0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei','borrow'),('西游记','2022-08-31 19:48:13.000000','0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei','return'),('西游记','2022-08-31 19:49:55.000000','0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei','borrow'),('西游记','2022-08-31 19:49:57.000000','0bf6810d-1a3f-4d76-a070-ac114cce4f82','yanlifei','return'),('google','2023-01-16 17:01:55.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','borrow'),('水浒传','2023-01-16 17:23:55.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','borrow'),('三国演义','2023-01-17 17:01:38.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','borrow'),('红楼梦','2023-01-17 18:09:57.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','borrow'),('google','2023-01-17 19:55:27.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','return'),('红楼梦','2023-01-17 19:56:57.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','return'),('水浒传','2023-01-17 19:57:42.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','return'),('google','2023-01-17 19:59:53.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','borrow'),('google','2023-01-17 19:59:59.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','return'),('google','2023-01-17 20:01:31.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','borrow'),('水浒传','2023-01-17 20:02:45.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','borrow'),('三国演义','2023-01-17 20:02:46.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','borrow'),('西游记','2023-01-17 20:02:48.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','borrow'),('水浒传','2023-01-17 20:02:56.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','return'),('三国演义','2023-01-17 20:13:03.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','return'),('水浒传','2023-01-18 21:15:32.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','borrow'),('google','2023-01-18 21:15:37.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','return'),('三国演义','2023-01-18 22:06:22.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','borrow'),('三国演义','2023-02-02 14:10:43.000000','88d4998a-8036-473c-937f-4daca88f3de3','reader','borrow');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userID` char(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `username` char(20) NOT NULL COMMENT '用户名',
  `password` char(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `email` varchar(30) DEFAULT NULL COMMENT '用户邮箱',
  `registerTime` timestamp(6) NULL DEFAULT NULL COMMENT '用户注册时间',
  `loginTime` timestamp(6) NULL DEFAULT NULL COMMENT '用户上次登录时间',
  `rights` enum('administer','reader') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'reader' COMMENT '用户权限（管理员，消费者）',
  `sex` enum('male','female','unknow') DEFAULT 'unknow' COMMENT '用户性别',
  `address` varchar(40) DEFAULT NULL,
  `balance` int DEFAULT '0' COMMENT '用户余额',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`userID`,`username`,`password`,`email`,`registerTime`,`loginTime`,`rights`,`sex`,`address`,`balance`) values ('88d4998a-8036-473c-937f-4daca88f3de3','reader','1de9b0a30075ae8c303eb420c103c320','lifei9.yan@gmail.com','2022-08-22 22:03:44.000000','2023-02-09 13:40:55.000000','reader','male','安徽省合肥市',714),('fc17f9a8-e8d7-45b4-a1cd-6b04900d0f54','admin','21232f297a57a5a743894a0e4a801fc3','email01','2022-08-22 22:03:33.000000','2023-02-09 13:23:42.000000','administer','male',NULL,1000),('ffabbc39-84fd-49c9-a9d8-1f50cdda196a','yanlifei','6ef7d51f72abc6ae1fab31956658833f','lifei9.yan@gmail.com','2022-08-23 17:46:02.000000','2022-08-31 19:32:57.000000','administer','male','安徽省合肥市',1445);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
