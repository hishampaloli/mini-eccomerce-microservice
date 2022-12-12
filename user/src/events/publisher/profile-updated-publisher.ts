import { Publisher, Subject, ProfileUpdatedEvent } from "@hpshops/common";

export class ProfileUpdatedPublisher extends Publisher<ProfileUpdatedEvent> {
  subject: Subject.ProfileUpdated = Subject.ProfileUpdated;
}
