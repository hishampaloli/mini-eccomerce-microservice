import { Message } from "node-nats-streaming";
import { Subject, Listener, UserRegisteredEvent } from "@hpshops/common";
import { queueGroupName } from "./queue-group-name";
import { User } from "../../models/user";
import { ProfileCreatedPublisher } from "../publisher/profile-created-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class UserCreatedListener extends Listener<UserRegisteredEvent> {
  subject: Subject.UserRegistered = Subject.UserRegistered;
  queueGroupName = queueGroupName;

  async onMessage(data: UserRegisteredEvent["data"], msg: Message) {
    const { name, email, userId, version } = data;

    // console.log(name);
    // console.log(email);
    // console.log(userId);

    const user = User.build({
      address: "please add an address",
      email: email,
      name: name,
      image:
        "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png",
      userId,
      isBlocked: false,
    });

    await user.save();

    if (user) {
      await new ProfileCreatedPublisher(natsWrapper.client).publish({
        address: user.address,
        email: user.email,
        name: user.name,
        image: user.image,
        version: user.version,
        userId: user.id,
        isBlocked: user.isBlocked,
      });

      console.log("PROFILE:CREATED PUBLISHED");
    }

    msg.ack();
  }
}
