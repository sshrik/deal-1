/*
drop database deal1;
CREATE DATABASE deal1;
*/
use deal_1;
CREATE TABLE users
(
    `id`        INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `userName`  VARCHAR(25)    NOT NULL    UNIQUE,
    `password`  VARCHAR(80)    NOT NULL,
    `area_1`    VARCHAR(10)    NOT NULL,
    `area_2`    VARCHAR(10)    NULL,
    PRIMARY KEY (id)
);

CREATE TABLE categories
(
    `id`      INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `name`    VARCHAR(20)    NOT NULL    UNIQUE,
    `imgSrc`  VARCHAR(60)    NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE products 
(
    `id`          INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `title`       VARCHAR(25)    NOT NULL,
    `uploadTime`  BIGINT UNSIGNED   NOT NULL,
    `price`       INT UNSIGNED   NOT NULL,
    `detail`      VARCHAR(500)   NOT NULL,
    `seller`      INT UNSIGNED   NOT NULL,
    `category`    INT UNSIGNED   NOT NULL,
    `viewCount`   INT UNSIGNED   NOT NULL,
    `nowSelling`  BOOLEAN        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (seller) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE productSpecs
(
    `id`        INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `productId` INT UNSIGNED   NOT NULL,
    `imgSrc`    VARCHAR(60)    NOT NULL,
    `isMain`    BOOLEAN        NOT NULL    DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (productId) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE likes
(
    `id`        INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `userId`    INT UNSIGNED   NOT NULL,
    `productId` INT UNSIGNED   NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE chats
(
    `id`        INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `sendName`  INT UNSIGNED   NOT NULL,
    `recvName`  INT UNSIGNED   NOT NULL,
    `productId` INT UNSIGNED   NOT NULL,
    `chatMsg`   VARCHAR(400)    NULL,
    `sendTime`  BIGINT UNSIGNED   NULL,
    `type`      VARCHAR(20)    NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (sendName) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (recvName) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE chatrooms
(
    `id`        INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `productId` INT UNSIGNED   NOT NULL,
    `user1`  INT UNSIGNED   NOT NULL,
    `user2`  INT UNSIGNED   NOT NULL,
    `lastview`  BIGINT UNSIGNED   NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user1) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user2) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);