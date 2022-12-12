import { Publisher, Subject, ProfileCreatedEvent } from "@hpshops/common";

export class ProfileCreatedPublisher extends Publisher<ProfileCreatedEvent> {
  subject: Subject.ProfileCreated = Subject.ProfileCreated;
}
