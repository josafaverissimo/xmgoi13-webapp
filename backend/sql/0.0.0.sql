use atacadao;

drop table if exists xmg_smg13;
create table xmg_smg13 (
    id int(11) unsigned auto_increment primary key,
    productCode int(11) unique not null,
    productDigit int(11) not null,
    productDescription varchar(300) not null,
    productPacking varchar(100) not null,
    productStockEmb1 int(11) not null,
    productStockEmb9 int(11) not null,
    productSalePrice decimal(8,2) not null
);

drop table if exists xmg_smg13_metadata;
create table xmg_smg13_metadata (
    id int(11) unsigned auto_increment primary key,
    smg13Filename varchar(100),
    createdAt datetime not null
);

drop table if exists xmg_customers;
create table xmg_customers (
    id int(11) unsigned auto_increment primary key,
    name varchar(200) not null,
    socialReason varchar(200),
    cnpj varchar(14),
    phone varchar(11),
    email varchar(200),
    createdAt datetime,
    lastPurchaseDay datetime
);

