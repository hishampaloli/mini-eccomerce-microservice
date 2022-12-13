import { Message } from "node-nats-streaming";
import { Subject, Listener, ProductDeletedEvent } from "@hpshops/common";
import { queueGroupName } from "./queue-group-name";
import { Product } from "../../models/products";
import { natsWrapper } from "../../nats-wrapper";

export class ProductDeletedListener extends Listener<ProductDeletedEvent> {
  subject: Subject.ProductDeleted = Subject.ProductDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductDeletedEvent["data"], msg: Message) {
    const { id } = data;

    try {
      const product = await Product.findByIdAndDelete(id);
      console.log("DELETED");
      
      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
