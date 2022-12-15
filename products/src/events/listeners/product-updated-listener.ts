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
      console.log(id);

      const product = await Product.findByIdAndUpdate(id);
      console.log("><<<<<<<<<<<<<");

      if (product) {
        const product = await Product.findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        msg.ack();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
