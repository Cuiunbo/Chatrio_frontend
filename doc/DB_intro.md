# 数据库设计

### 用户表（users）
-   user_id：INT类型（主键），自增，唯一
-   user_name：VARCHAR(50)类型，不能为空
-   password：VARCHAR(50)类型，不能为空
-   email：VARCHAR(255)类型，不能为空，唯一性约束（UNIQUE），应使用正则表达式约束满足电子邮件格式

### 聊天室表（chat_rooms）
-   room_id：INT类型（主键），自增，唯一
-   room_name：VARCHAR(50)类型，不能为空

### 聊天室成员表（chat_room_members）
-   user_id：INT类型（外键），关联用户表的id列
-   chat_room_id：INT类型（外键），关联聊天室表的id列

### 消息表（messages）
-   message_id：INT类型（主键），自动递增
-   user_id：INT类型（外键），关联用户表的id列，表示消息的发送者
-   room_id：INT类型（外键），关联聊天室表的id列，表示消息所在的聊天室
-   is_text：BOOLEAN类型，标志内容是否为文本，非空
-   content：TEXT类型，限制长度为500个字符以内，不能为空
-   is_recalled：BOOLEAN类型，标志是否撤回
-   created_at：TIMESTAMP类型，记录创建时间，应使用UTC时间存储
