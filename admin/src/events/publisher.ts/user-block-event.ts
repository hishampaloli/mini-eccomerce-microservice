import { Publisher, Subject, UserBlockEvent } from "@hpshops/common";

export class UserBlockPublisher extends Publisher<UserBlockEvent> {
  subject: Subject.UseBlock = Subject.UseBlock;
}
