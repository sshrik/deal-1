/* drop database deal_1;
CREATE DATABASE deal_1; */
use deal_1;
CREATE TABLE users
(
    `id`        INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `userName`  VARCHAR(25)    NOT NULL    UNIQUE,
    `password`  VARCHAR(20)    NOT NULL,
    `area_1`    VARCHAR(10)    NOT NULL,
    `area_2`    VARCHAR(10)    NULL,
    PRIMARY KEY (id)
);

CREATE TABLE categories
(
    `id`      INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `name`    VARCHAR(20)    NOT NULL    UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE products 
(
    `id`          INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `title`       VARCHAR(25)    NOT NULL,
    `uploadTime`  INT UNSIGNED   NOT NULL,
    `price`       INT UNSIGNED   NOT NULL,
    `detail`      VARCHAR(500)   NOT NULL,
    `seller`      VARCHAR(25)    NOT NULL,
    `category`    VARCHAR(20)    NOT NULL,
    `viewCount`   INT UNSIGNED   NOT NULL,
    `nowSelling`  BOOLEAN        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (seller) REFERENCES users(userName) ON UPDATE CASCADE,
    FOREIGN KEY (category) REFERENCES categories(name) ON UPDATE CASCADE
);

CREATE TABLE productSpecs
(
    `id`        INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `productId` INT UNSIGNED   NOT NULL,
    `imgSrc`    VARCHAR(60)    NOT NULL,
    `isMain`    BOOLEAN        NOT NULL    DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (productId) REFERENCES products(id) ON UPDATE CASCADE
);

CREATE TABLE likes
(
    `id`        INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `userId`    VARCHAR(25)    NOT NULL,
    `productId` INT UNSIGNED   NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(userName) ON UPDATE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON UPDATE CASCADE
);

CREATE TABLE chats
(
    `id`        INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `sendName`  VARCHAR(25)    NOT NULL,
    `recvName`  VARCHAR(25)    NOT NULL,
    `productId` INT UNSIGNED   NOT NULL,
    `chatMsg`   VARCHAR(400)    NULL,
    `sendTime`  INT UNSIGNED   NULL,
    `type`      VARCHAR(20)    NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (sendName) REFERENCES users(userName) ON UPDATE CASCADE,
    FOREIGN KEY (recvName) REFERENCES users(userName) ON UPDATE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON UPDATE CASCADE
);

CREATE TABLE chatrooms
(
    `id`        INT UNSIGNED   NOT NULL    AUTO_INCREMENT,
    `productId` INT UNSIGNED   NOT NULL,
    `userName`  VARCHAR(25)    NOT NULL,
    `lastview`  INT UNSIGNED   NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userName) REFERENCES users(userName) ON UPDATE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON UPDATE CASCADE
);