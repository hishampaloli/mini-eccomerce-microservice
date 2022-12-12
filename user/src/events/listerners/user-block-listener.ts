import { Message } from "node-nats-streaming";
import { Subject, Listener, UserBlockEvent } from "@hpshops/common";
import { queueGroupName } from "./queue-group-name";
import { User } from "../../models/user";
import { natsWrapper } from "../../nats-wrapper";

export class UserBlockListener extends Listener<UserBlockEvent> {
  subject: Subject.UseBlock = Subject.UseBlock;
  queueGroupName = queueGroupName;

  async onMessage(data: UserBlockEvent["data"], msg: Message) {
    const { userId, isBlocked } = data;

    const user = await User.findById(userId);

    if (user) {
      user.isBlocked = isBlocked;
      await user.save();
      msg.ack();
    }
  }
}
