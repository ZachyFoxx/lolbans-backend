import { ApiServer } from "../ApiServer";
import { status } from "./status";

export const registerRoutes = (server: ApiServer) => {
    const app = server.app;

    app.get("/", status);
};
