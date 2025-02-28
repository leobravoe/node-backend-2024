-- MySQL Script generated by MySQL Workbench
-- Thu Feb 27 17:02:04 2025
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema fornatto_db_2
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `fornatto_db_2` ;

-- -----------------------------------------------------
-- Schema fornatto_db_2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fornatto_db_2` DEFAULT CHARACTER SET utf8 ;
USE `fornatto_db_2` ;

-- -----------------------------------------------------
-- Table `fornatto_db_2`.`Mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fornatto_db_2`.`Mesa` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `numero` INT UNSIGNED NOT NULL,
  `estado` CHAR(1) NOT NULL,
  `dataAtualizacao` TIMESTAMP NULL,
  `dataCriacao` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fornatto_db_2`.`Pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fornatto_db_2`.`Pedido` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Mesa_id` BIGINT UNSIGNED NOT NULL,
  `estado` CHAR(1) NOT NULL,
  `dataAtualizacao` TIMESTAMP NULL,
  `dataCriacao` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Pedido_Mesa1_idx` (`Mesa_id` ASC),
  CONSTRAINT `fk_Pedido_Mesa1`
    FOREIGN KEY (`Mesa_id`)
    REFERENCES `fornatto_db_2`.`Mesa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fornatto_db_2`.`TipoProduto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fornatto_db_2`.`TipoProduto` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(255) NOT NULL,
  `dataAtualizacao` TIMESTAMP NULL,
  `dataCriacao` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fornatto_db_2`.`Produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fornatto_db_2`.`Produto` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `numero` INT UNSIGNED NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `TipoProduto_id` BIGINT UNSIGNED NOT NULL,
  `ingredientes` VARCHAR(255) NOT NULL,
  `dataAtualizacao` TIMESTAMP NULL,
  `dataCriacao` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Produto_TipoProduto_idx` (`TipoProduto_id` ASC),
  CONSTRAINT `fk_Produto_TipoProduto`
    FOREIGN KEY (`TipoProduto_id`)
    REFERENCES `fornatto_db_2`.`TipoProduto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fornatto_db_2`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fornatto_db_2`.`Usuario` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `dataAtualizacao` TIMESTAMP NULL,
  `dataCriacao` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fornatto_db_2`.`PedidoProduto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fornatto_db_2`.`PedidoProduto` (
  `Pedido_id` BIGINT UNSIGNED NOT NULL,
  `Produto_id` BIGINT UNSIGNED NOT NULL,
  `Usuario_id` BIGINT UNSIGNED NOT NULL,
  `precoVenda` DECIMAL(10,2) NOT NULL,
  `quantidade` INT UNSIGNED NOT NULL,
  `estadoValorAnulado` TINYINT UNSIGNED NOT NULL,
  `estadoPago` TINYINT UNSIGNED NOT NULL,
  `estadoCupomImpresso` TINYINT UNSIGNED NOT NULL,
  `estadoComandaImpressa` TINYINT UNSIGNED NOT NULL,
  `estadoRecebido` TINYINT UNSIGNED NOT NULL,
  `observacao` VARCHAR(255) NULL,
  `dataAtualizacao` TIMESTAMP NULL,
  `dataCriacao` TIMESTAMP NULL,
  PRIMARY KEY (`Pedido_id`, `Produto_id`),
  INDEX `fk_PedidoProduto_Pedido1_idx` (`Pedido_id` ASC),
  INDEX `fk_PedidoProduto_Usuario1_idx` (`Usuario_id` ASC),
  CONSTRAINT `fk_PedidoProduto_Produto1`
    FOREIGN KEY (`Produto_id`)
    REFERENCES `fornatto_db_2`.`Produto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PedidoProduto_Pedido1`
    FOREIGN KEY (`Pedido_id`)
    REFERENCES `fornatto_db_2`.`Pedido` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PedidoProduto_Usuario1`
    FOREIGN KEY (`Usuario_id`)
    REFERENCES `fornatto_db_2`.`Usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `fornatto_db_2`.`Mesa`
-- -----------------------------------------------------
START TRANSACTION;
USE `fornatto_db_2`;
INSERT INTO `fornatto_db_2`.`Mesa` (`id`, `numero`, `estado`, `dataAtualizacao`, `dataCriacao`) VALUES (1, 1, 'O', '2023-02-28 19:00:00', '2023-02-28 19:00:00');
INSERT INTO `fornatto_db_2`.`Mesa` (`id`, `numero`, `estado`, `dataAtualizacao`, `dataCriacao`) VALUES (2, 2, 'O', '2023-02-28 19:00:00', '2023-02-28 19:00:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `fornatto_db_2`.`Pedido`
-- -----------------------------------------------------
START TRANSACTION;
USE `fornatto_db_2`;
INSERT INTO `fornatto_db_2`.`Pedido` (`id`, `Mesa_id`, `estado`, `dataAtualizacao`, `dataCriacao`) VALUES (1, 1, 'I', '2023-02-28 19:00:00', '2023-02-28 19:00:00');
INSERT INTO `fornatto_db_2`.`Pedido` (`id`, `Mesa_id`, `estado`, `dataAtualizacao`, `dataCriacao`) VALUES (2, 1, 'A', '2023-02-28 19:00:00', '2023-02-28 19:00:00');
INSERT INTO `fornatto_db_2`.`Pedido` (`id`, `Mesa_id`, `estado`, `dataAtualizacao`, `dataCriacao`) VALUES (3, 2, 'A', '2023-02-28 19:00:00', '2023-02-28 19:00:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `fornatto_db_2`.`TipoProduto`
-- -----------------------------------------------------
START TRANSACTION;
USE `fornatto_db_2`;
INSERT INTO `fornatto_db_2`.`TipoProduto` (`id`, `descricao`, `dataAtualizacao`, `dataCriacao`) VALUES (1, 'Pizza', '2023-02-28 19:00:00', '2023-02-28 19:00:00');
INSERT INTO `fornatto_db_2`.`TipoProduto` (`id`, `descricao`, `dataAtualizacao`, `dataCriacao`) VALUES (2, 'Suco', '2023-02-28 19:00:00', '2023-02-28 19:00:00');
INSERT INTO `fornatto_db_2`.`TipoProduto` (`id`, `descricao`, `dataAtualizacao`, `dataCriacao`) VALUES (3, 'Cerveja', '2023-02-28 19:00:00', '2023-02-28 19:00:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `fornatto_db_2`.`Produto`
-- -----------------------------------------------------
START TRANSACTION;
USE `fornatto_db_2`;
INSERT INTO `fornatto_db_2`.`Produto` (`id`, `numero`, `nome`, `preco`, `TipoProduto_id`, `ingredientes`, `dataAtualizacao`, `dataCriacao`) VALUES (1, 1, 'Pepperoni', 50.50, 1, 'Pepperoni fatiado, queijo, cebola, pimentão, molho de tomate e orégano', '2023-02-28 19:00:00', '2023-02-28 19:00:00');
INSERT INTO `fornatto_db_2`.`Produto` (`id`, `numero`, `nome`, `preco`, `TipoProduto_id`, `ingredientes`, `dataAtualizacao`, `dataCriacao`) VALUES (2, 2, 'Laranja', 8.00, 2, 'Laranja, água e açucar', '2023-02-28 19:00:00', '2023-02-28 19:00:00');
INSERT INTO `fornatto_db_2`.`Produto` (`id`, `numero`, `nome`, `preco`, `TipoProduto_id`, `ingredientes`, `dataAtualizacao`, `dataCriacao`) VALUES (3, 3, 'Skol - Lata', 8.00, 3, 'Água, malte, milho e lúpulo. Alergênicos: Contém cevada e glúten', '2023-02-28 19:00:00', '2023-02-28 19:00:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `fornatto_db_2`.`Usuario`
-- -----------------------------------------------------
START TRANSACTION;
USE `fornatto_db_2`;
INSERT INTO `fornatto_db_2`.`Usuario` (`id`, `nome`, `email`, `senha`, `dataAtualizacao`, `dataCriacao`) VALUES (1, 'Usuário', 'user@user.com.br', '30681f7d19c53345de84040e40d4571aa6827182266c3d110785df10b703b5fb042b15e23a8d8e778271bd01028e675a815854e8e3cf8b01efcc989366f35143', '2023-03-12 20:00:00', '2023-03-12 20:00:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `fornatto_db_2`.`PedidoProduto`
-- -----------------------------------------------------
START TRANSACTION;
USE `fornatto_db_2`;
INSERT INTO `fornatto_db_2`.`PedidoProduto` (`Pedido_id`, `Produto_id`, `Usuario_id`, `precoVenda`, `quantidade`, `estadoValorAnulado`, `estadoPago`, `estadoCupomImpresso`, `estadoComandaImpressa`, `estadoRecebido`, `observacao`, `dataAtualizacao`, `dataCriacao`) VALUES (1, 1, 1, 50.50, 1, 0, 0, 0, 0, 0, 'Adicional de Bacon', '2023-03-12 20:00:00', '2023-03-12 20:00:00');
INSERT INTO `fornatto_db_2`.`PedidoProduto` (`Pedido_id`, `Produto_id`, `Usuario_id`, `precoVenda`, `quantidade`, `estadoValorAnulado`, `estadoPago`, `estadoCupomImpresso`, `estadoComandaImpressa`, `estadoRecebido`, `observacao`, `dataAtualizacao`, `dataCriacao`) VALUES (1, 2, 1, 8.00, 1, 0, 0, 0, 0, 0, 'Sem açucar', '2023-03-12 20:00:00', '2023-03-12 20:00:00');
INSERT INTO `fornatto_db_2`.`PedidoProduto` (`Pedido_id`, `Produto_id`, `Usuario_id`, `precoVenda`, `quantidade`, `estadoValorAnulado`, `estadoPago`, `estadoCupomImpresso`, `estadoComandaImpressa`, `estadoRecebido`, `observacao`, `dataAtualizacao`, `dataCriacao`) VALUES (2, 3, 1, 8.00, 10, 0, 0, 0, 0, 0, NULL, '2023-03-12 20:00:00', '2023-03-12 20:00:00');
INSERT INTO `fornatto_db_2`.`PedidoProduto` (`Pedido_id`, `Produto_id`, `Usuario_id`, `precoVenda`, `quantidade`, `estadoValorAnulado`, `estadoPago`, `estadoCupomImpresso`, `estadoComandaImpressa`, `estadoRecebido`, `observacao`, `dataAtualizacao`, `dataCriacao`) VALUES (2, 1, 1, 50.50, 2, 0, 0, 0, 0, 0, NULL, '2023-03-12 20:00:00', '2023-03-12 20:00:00');
INSERT INTO `fornatto_db_2`.`PedidoProduto` (`Pedido_id`, `Produto_id`, `Usuario_id`, `precoVenda`, `quantidade`, `estadoValorAnulado`, `estadoPago`, `estadoCupomImpresso`, `estadoComandaImpressa`, `estadoRecebido`, `observacao`, `dataAtualizacao`, `dataCriacao`) VALUES (3, 1, 1, 50.50, 1, 0, 0, 0, 0, 0, NULL, '2023-03-12 20:00:00', '2023-03-12 20:00:00');

COMMIT;

