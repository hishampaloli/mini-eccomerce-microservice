import { Publisher, Subject, ProductCreatedEvent } from "@hpshops/common";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  subject: Subject.ProductCreated = Subject.ProductCreated;
}
