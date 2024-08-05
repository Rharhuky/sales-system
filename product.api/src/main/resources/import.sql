INSERT INTO categories (ID, DESCRIPTION) VALUES (1, 'Books');
INSERT INTO categories (ID, DESCRIPTION) VALUES (2, 'Computing');
INSERT INTO categories (ID, DESCRIPTION) VALUES (3, 'Smartphones');

INSERT INTO suppliers (id, name) VALUES (1, 'Amazon');
INSERT INTO suppliers (id, name) VALUES (2, 'Mercado Livre');

INSERT INTO products (id, name, fk_supplier, fk_category, quantity_available) VALUES (1, 'Effective Java', 1, 1, 8);

INSERT INTO products (id, name, fk_supplier, fk_category, quantity_available) VALUES (2, 'Acer nitro', 2, 2, 5);
INSERT INTO products (id, name, fk_supplier, fk_category, quantity_available) VALUES (3, 'Iphone 13 Pro max', 2, 2, 3);
