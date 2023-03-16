# 数据库设计

群组
| 时间戳 | 撤回tag | 发送方 | 消息类型 | 内容 |
| ------ | ------- | ------ | -------- | ---- |
|        |         |        |          |      |
|        |         |        |          |      |
用户
| 用户ID | 昵称 | 密码 | 其他 |
| ------ | ---- | ---- | ---- |
|        |      |      |      |

群组-用户
| 接受方ID | 对应群组 | 最后消息时间 |
| -------- | -------- | ------------ |
|          |          |              |

### 用户表（users）
-   id：INT类型（主键），自动递增
-   username：VARCHAR(50)类型，不能为空，唯一性约束（UNIQUE）
-   password：VARCHAR(255)类型，不能为空
-   email：VARCHAR(255)类型，不能为空，唯一性约束（UNIQUE），应使用正则表达式约束满足电子邮件格式
-   created_at：TIMESTAMP类型，记录创建时间，应使用UTC时间存储

### 好友表（friends）
-   id：INT类型（主键），自动递增
-   user_id：INT类型（外键），关联用户表的id列
-   friend_id：INT类型（外键），关联用户表的id列
-   created_at：TIMESTAMP类型，记录创建时间，应使用UTC时间存储

### 聊天室表（chat_rooms）
-   id：INT类型（主键），自动递增
-   name：VARCHAR(50)类型，不能为空
-   created_at：TIMESTAMP类型，记录创建时间，应使用UTC时间存储

### 聊天室成员表（chat_room_members）
-   id：INT类型（主键），自动递增
-   user_id：INT类型（外键），关联用户表的id列
-   chat_room_id：INT类型（外键），关联聊天室表的id列
-   created_at：TIMESTAMP类型，记录创建时间，应使用UTC时间存储

### 消息表（messages）
-   id：INT类型（主键），自动递增
-   sender_id：INT类型（外键），关联用户表的id列，表示消息的发送者
-   chat_room_id：INT类型（外键），关联聊天室表的id列，表示消息所在的聊天室
-   content：TEXT类型，限制长度为1000个字符以内，不能为空
-   created_at：TIMESTAMP类型，记录创建时间，应使用UTC时间存储

-   用户表（users）：username和email列应该添加唯一性约束（UNIQUE），以确保不会有重复的值。可以在id、username、email上分别添加索引（INDEX），以便查询时快速查找。
-   好友表（friends）：user_id和friend_id列应该添加外键约束（FOREIGN KEY），以确保只有存在的用户才能成为好友。可以在user_id和friend_id上分别添加索引（INDEX），以便查询时快速查找。
-   聊天室成员表（chat_room_members）和消息表（messages）：chat_room_id列应该添加外键约束（FOREIGN KEY），以确保只有存在的聊天室才能添加成员和发送消息。可以在chat_room_id上添加索引（INDEX），以便查询时快速查找。
