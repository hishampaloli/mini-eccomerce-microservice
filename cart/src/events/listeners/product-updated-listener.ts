import { Message } from "node-nats-streaming";
import { Subject, Listener, ProductUpdatedEvent } from "@hpshops/common";
import { queueGroupName } from "./queue-group-name";
import { Product } from "../../models/products";
import { natsWrapper } from "../../nats-wrapper";

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  subject: Subject.ProductUpdated = Subject.ProductUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductUpdatedEvent["data"], msg: Message) {
    const { description, id, image, price, stock, title } = data;

    try {

      const product = await Product.findById(id);

      if (product) {
        if (description) product.description = description;
        if (image) product.image = image;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (title) product.title = title;

        await product.save();
        msg.ack();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
