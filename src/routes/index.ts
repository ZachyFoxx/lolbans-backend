import { ApiServer } from "../ApiServer";
import { status } from "./status";
import { v1 } from "./v1";

export const registerRoutes = (server: ApiServer) => {
    const app = server.app;

    // Register verion routes
    // "/" path will default to current API version.
    app.use("/v1", v1);
    app.use("/", v1);

    app.get("/", status);
};
