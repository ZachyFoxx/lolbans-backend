import { ApiServer } from "../ApiServer";
import { infractions } from "./infractions";
import { status } from "./status";

export const registerRoutes = (server: ApiServer) => {
    const app = server.app;

    app.get("/", status);
    app.use("/infractions", infractions(server));
};
