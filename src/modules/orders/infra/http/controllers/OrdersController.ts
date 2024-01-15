import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';

export default class OrdersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return res.json(order);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return res.json(order);
  }
}
