import { Publisher, Subject, ProductDeletedEvent } from "@hpshops/common";

export class ProductDeletedPublisher extends Publisher<ProductDeletedEvent> {
  subject: Subject.ProductDeleted = Subject.ProductDeleted;
}
