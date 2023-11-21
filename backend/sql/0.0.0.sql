use atacadao;

create table xmg_smg13 (
    id int(11) unsigned auto_increment primary key,
    productCode int(11) unique,
    productDigit int(11),
    productDescription varchar(300),
    productPacking varchar(100),
    productStockEmb1 int(11),
    productStockEmb9 int(11),
    productSalePrice decimal(5,2)
);