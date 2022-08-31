
# node图书管理系统



<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->



## Endpoints

* [用户](#)
    1. [注册用户](#1-)
    1. [查找所有用户信息](#2-)
    1. [根据用户或者邮箱查找数据](#3-)
    1. [用户登录](#4-)
    1. [修改用户信息](#5-)
* [账户](#)
    1. [账户充值和消费](#1--1)
    1. [获取所有用户余额之和](#2--1)
    1. [获取充值/消费数据](#3--1)
    1. [获取用户充值/消费信息](#4--1)
    1. [获取个人资产余额](#5--1)
* [公告](#)
    1. [发布公告](#1--2)
    1. [查看全部公告](#2--2)
* [图书](#)
    1. [查看所有图书信息](#1--3)
    1. [上架新书](#2--3)
    1. [根据书名作者出版社查看新书](#3--2)
    1. [借书](#4--2)
    1. [还书](#5--2)

--------



## 用户



### 1. 注册用户



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/register
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| username | yanlifei | 用户名 |
| password | yanlifei | 密码 |
| rights | administer | 用户权限 |



### 2. 查找所有用户信息



***Endpoint:***

```bash
Method: POST
Type: 
URL: http://localhost:3001/findAllUser
```



### 3. 根据用户或者邮箱查找数据



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/findUserByUsernameOrEmail
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| username | username |  |



### 4. 用户登录



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/login
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| username | admin |  |
| password | admin |  |



### 5. 修改用户信息



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/modifyUser
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZmFiYmMzOS04NGZkLTQ5YzktYTlkOC0xZjUwY2RkYTE5NmEiLCJ1c2VyTmFtZSI6InRlc3Rtb2RpZnkiLCJlbWFpbCI6InVuZGVmaW5lZCIsInJpZ2h0cyI6ImFkbWluaXN0ZXIiLCJpYXQiOjE2NjEyNDgxNzEsImV4cCI6MTY2MTMzNDU3MX0.nvCATlrOthpj-391t3DlERkaR0CPyzRtS9AJsoSyKfs |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| userName | testmodify01 |  |
| password | testmodify01 |  |
| email | testmodify01 |  |
| sex | male |  |
| address | 安徽安庆 |  |



## 账户



### 1. 账户充值和消费



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/recharge
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZmFiYmMzOS04NGZkLTQ5YzktYTlkOC0xZjUwY2RkYTE5NmEiLCJ1c2VyTmFtZSI6InRlc3Rtb2RpZnkwMSIsImVtYWlsIjoidGVzdG1vZGlmeTAxIiwicmlnaHRzIjoiYWRtaW5pc3RlciIsImlhdCI6MTY2MTI1NzYxMywiZXhwIjoxNjYxMzQ0MDEzfQ.qDuaSKOXKX-rSMkvIX_aKPK_1Zlp7Nz6zbhJUHXM0lc |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| rechargeAmount | 110 |  |



### 2. 获取所有用户余额之和



***Endpoint:***

```bash
Method: POST
Type: 
URL: http://localhost:3001/getTotalAssets
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmYzE3ZjlhOC1lOGQ3LTQ1YjQtYTFjZC02YjA0OTAwZDBmNTQiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJlbWFpbDAxIiwicmlnaHRzIjoiYWRtaW5pc3RlciIsImlhdCI6MTY2MTIzMzk5MSwiZXhwIjoxNjYxMzIwMzkxfQ.8H-VnFjOgACCNerhxqxa16AlfgfjrpnQjpt2fM0W5L4 |  |



### 3. 获取充值/消费数据



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/getAllRecharge
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmYzE3ZjlhOC1lOGQ3LTQ1YjQtYTFjZC02YjA0OTAwZDBmNTQiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJlbWFpbDAxIiwicmlnaHRzIjoiYWRtaW5pc3RlciIsImlhdCI6MTY2MTIzMzk5MSwiZXhwIjoxNjYxMzIwMzkxfQ.8H-VnFjOgACCNerhxqxa16AlfgfjrpnQjpt2fM0W5L4 |  |



***Body:***



### 4. 获取用户充值/消费信息



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/getSelfRecharge
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI3ZjRmYTc1Yi1jMjIzLTQ5NTctOWU5OC02ZTVjNmFlYTVlMjEiLCJ1c2VyTmFtZSI6InVzZXJuYW1lIiwiZW1haWwiOiJlbWFpbCIsInJpZ2h0cyI6ImFkbWluaXN0ZXIiLCJpYXQiOjE2NjEyMzQ2NDYsImV4cCI6MTY2MTMyMTA0Nn0.A8626H7i3jJzLFfzGgJ1EzOJMNehdsbNNinm42cx3nk |  |



***Body:***



### 5. 获取个人资产余额



***Endpoint:***

```bash
Method: POST
Type: 
URL: http://localhost:3001/getSelfAssets
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI3ZjRmYTc1Yi1jMjIzLTQ5NTctOWU5OC02ZTVjNmFlYTVlMjEiLCJ1c2VyTmFtZSI6InVzZXJuYW1lIiwiZW1haWwiOiJlbWFpbCIsInJpZ2h0cyI6ImFkbWluaXN0ZXIiLCJpYXQiOjE2NjEyMzQ2NDYsImV4cCI6MTY2MTMyMTA0Nn0.A8626H7i3jJzLFfzGgJ1EzOJMNehdsbNNinm42cx3nk |  |



## 公告



### 1. 发布公告



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/publish
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization |  |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| title | 我自己的图书馆开业啦！ |  |
| content | 最新优惠，消费满100可打八折！ |  |



### 2. 查看全部公告



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/getAllNotice
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmYzE3ZjlhOC1lOGQ3LTQ1YjQtYTFjZC02YjA0OTAwZDBmNTQiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJlbWFpbDAxIiwicmlnaHRzIjoiYWRtaW5pc3RlciIsImlhdCI6MTY2MTI2MDQxOCwiZXhwIjoxNjYxMzQ2ODE4fQ.EBAf4_APIRZOAheHtvJxfSHZm_DyTODKcx6fMNcBOl4 |  |



***Body:***



## 图书



### 1. 查看所有图书信息



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/getAllBook
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIwYmY2ODEwZC0xYTNmLTRkNzYtYTA3MC1hYzExNGNjZTRmODIiLCJ1c2VyTmFtZSI6InlhbmxpZmVpIiwiZW1haWwiOiJ1bmRlZmluZWQiLCJyaWdodHMiOiJhZG1pbmlzdGVyIiwiaWF0IjoxNjYxMzE1Mjc3LCJleHAiOjE2NjE0MDE2Nzd9.2cuMYivxM59JRRVKwUlGph-elLMfGWTZCT4UGfI8VJI |  |



***Body:***



### 2. 上架新书



***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: http://localhost:3001/addBook
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIwYmY2ODEwZC0xYTNmLTRkNzYtYTA3MC1hYzExNGNjZTRmODIiLCJ1c2VyTmFtZSI6InlhbmxpZmVpIiwiZW1haWwiOiJ1bmRlZmluZWQiLCJyaWdodHMiOiJhZG1pbmlzdGVyIiwiaWF0IjoxNjYxMzE1Mjc3LCJleHAiOjE2NjE0MDE2Nzd9.2cuMYivxM59JRRVKwUlGph-elLMfGWTZCT4UGfI8VJI |  |



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| bookCover |  | 文件 |
| bookName | 结衣 | 书名 |
| surplus | 1 | 剩余数量 |
| price | 50000 | 价格 |
| borrowPrice | 5000 | 借书价格/天 |
| author | 新垣结衣 |  |



### 3. 根据书名作者出版社查看新书



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/findBook
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIwYmY2ODEwZC0xYTNmLTRkNzYtYTA3MC1hYzExNGNjZTRmODIiLCJ1c2VyTmFtZSI6InlhbmxpZmVpIiwiZW1haWwiOiJ1bmRlZmluZWQiLCJyaWdodHMiOiJhZG1pbmlzdGVyIiwiaWF0IjoxNjYxNDEwNTE2LCJleHAiOjE2NjE0OTY5MTZ9.2oDiog-NoaHmPSZAU9bFWlwK8UzY0c8lZH4K8hc89aw |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| bookName | 三 | 书名 |
| author | 吴 | 作者 |
| publisher | undefined | 出版社 |



### 4. 借书



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/borrowBook
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmYzE3ZjlhOC1lOGQ3LTQ1YjQtYTFjZC02YjA0OTAwZDBmNTQiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJlbWFpbDAxIiwicmlnaHRzIjoiYWRtaW5pc3RlciIsImlhdCI6MTY2MTY5ODA2MCwiZXhwIjoxNjYxNzg0NDYwfQ.pFAbvkSlBn9qNyPtFHrnDJ0P365Y55HPADuTA3TrvqY |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| bookID | uuid03 |  |



### 5. 还书



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:3001/returnBook
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIwYmY2ODEwZC0xYTNmLTRkNzYtYTA3MC1hYzExNGNjZTRmODIiLCJ1c2VyTmFtZSI6InlhbmxpZmVpIiwiZW1haWwiOiJ1bmRlZmluZWQiLCJyaWdodHMiOiJhZG1pbmlzdGVyIiwiaWF0IjoxNjYxOTQ1NTc3LCJleHAiOjE2NjIwMzE5Nzd9.DL8srXV3R2czqwtKyeUqOOZv9r-usIJlNVYvAOPAMeQ |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| bookID | uuid03 |  |



---
[Back to top](#node)

>Generated at 2022-08-31 21:08:40 by [docgen](https://github.com/thedevsaddam/docgen)
