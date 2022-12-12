import { Message } from "node-nats-streaming";
import { Subject, Listener, ProfileUpdatedEvent } from "@hpshops/common";
import { queueGroupName } from "./queue-group-name";
import { User } from "../../models/user";

export class ProfileUpdateListener extends Listener<ProfileUpdatedEvent> {
  subject: Subject.ProfileUpdated = Subject.ProfileUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProfileUpdatedEvent["data"], msg: Message) {
    const { userId, image, address } = data;

    const user = await User.findById(userId);

    if (user) {
      user.image = image;
      user.address = address;

      await user.save();
    }

    msg.ack();
  }
}
