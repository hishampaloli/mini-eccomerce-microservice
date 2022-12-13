import { Subject, Publisher, ProductUpdatedEvent } from "@hpshops/common";

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  subject: Subject.ProductUpdated = Subject.ProductUpdated;
}
