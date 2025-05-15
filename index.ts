import { bootstrap } from "./src/externals/server";

bootstrap()
  .catch((error) => {
    console.error("Error starting the server:", error);
  })
  .finally(() => {
    console.log("Server has been shut down.");
  });
