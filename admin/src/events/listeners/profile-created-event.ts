import { Message } from "node-nats-streaming";
import { Subject, Listener, ProfileCreatedEvent } from "@hpshops/common";
import { queueGroupName } from "./queue-group-name";
import { User } from "../../models/user";

export class ProfileCreatedListener extends Listener<ProfileCreatedEvent> {
  subject: Subject.ProfileCreated = Subject.ProfileCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProfileCreatedEvent["data"], msg: Message) {
    const { name, email, userId, version, image, address,isBlocked } = data;

    const user = User.build({
      address,
      email,
      name,
      image,
      userId,
      isBlocked
    });

    await user.save();

    msg.ack();
  }
}
