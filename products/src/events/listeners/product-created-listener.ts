import { Message } from "node-nats-streaming";
import { Subject, Listener, ProductCreatedEvent } from "@hpshops/common";
import { queueGroupName } from "./queue-group-name";
import { Product } from "../../models/products";
import { natsWrapper } from "../../nats-wrapper";


export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subject.ProductCreated = Subject.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductCreatedEvent["data"], msg: Message) {
    const { description, id, image, price, stock, title } = data;

    try {
      const product = Product.build({
        description,
        id,
        image,
        price,
        stock,
        title,
      });

      await product.save();
      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
