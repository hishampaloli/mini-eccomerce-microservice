import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { ProfileCreatedListener } from "./events/listeners/profile-created-event";
import { ProfileUpdateListener } from "./events/listeners/profile-updated-event";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await natsWrapper.connect(
      "ticketing",
      process.env.NATS_CLIENT_ID,
      "http://nats-srv:4222"
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connetion closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new ProfileCreatedListener(natsWrapper.client).listen();
    new ProfileUpdateListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to USER MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
