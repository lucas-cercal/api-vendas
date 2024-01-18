import { DataSource } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';

import { CreateProducts1703249772374 } from './migrations/1703249772374-CreateProducts';
import { CreateUsers1703773845722 } from './migrations/1703773845722-CreateUsers';
import { CreateUserTokens1704206117721 } from './migrations/1704206117721-CreateUserTokens';
import { CreateCustomers1704310436691 } from './migrations/1704310436691-CreateCustomers';
import { CreateOrders1704374392060 } from './migrations/1704374392060-CreateOrders';
import { AddCustomerIdToOrders1704374877285 } from './migrations/1704374877285-AddCustomerIdToOrders';
import { CreateOrdersProducts1704376712248 } from './migrations/1704376712248-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1704377160772 } from './migrations/1704377160772-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1704378000779 } from './migrations/1704378000779-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1703249772374,
    CreateUsers1703773845722,
    CreateUserTokens1704206117721,
    CreateCustomers1704310436691,
    CreateOrders1704374392060,
    AddCustomerIdToOrders1704374877285,
    CreateOrdersProducts1704376712248,
    AddOrderIdToOrdersProducts1704377160772,
    AddProductIdToOrdersProducts1704378000779,
  ],
});
