import { ApiServer } from "../ApiServer";
import { status } from "./status";
import { servers } from "./v1/servers";

export const registerRoutes = (server: ApiServer) => {
    const app = server.app;

    app.get("/", status);

    app.use("/servers", servers(server));
};
