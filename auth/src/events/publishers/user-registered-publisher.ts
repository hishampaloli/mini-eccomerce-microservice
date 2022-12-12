import { Publisher, Subject, UserRegisteredEvent } from "@hpshops/common";

export class UserRegisteredPublisher extends Publisher<UserRegisteredEvent> {
  subject: Subject.UserRegistered = Subject.UserRegistered;
}
