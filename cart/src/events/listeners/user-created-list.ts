import { Message } from "node-nats-streaming";
import { Subject, Listener, UserRegisteredEvent } from "@hpshops/common";
import { queueGroupName } from "./queue-group-name";
import { User } from "../../models/user";
import { natsWrapper } from "../../nats-wrapper";

export class UserCreatedListener extends Listener<UserRegisteredEvent> {
  subject: Subject.UserRegistered = Subject.UserRegistered;
  queueGroupName = queueGroupName;

  async onMessage(data: UserRegisteredEvent["data"], msg: Message) {
    const { email, userId } = data;

    // console.log(name);
    // console.log(email);
    // console.log(userId);

    console.log("*************** USER CREATEDEDDDEDED");
    

    const user = User.build({ userId, email });

    await user.save();

    msg.ack();
  }
}
