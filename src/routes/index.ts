import { ApiServer } from "../ApiServer";
import { punishDetails } from "./punishdetails";
import { punishments } from "./punishments";
import { statistics } from "./statistics";
import { status } from "./status";
import { userDetails } from "./userdetails";

export const registerRoutes = (server: ApiServer) => {
    const app = server.app;

    app.get("/", status);

    app.use("/punishments", punishments(server));
    app.get("/punishDetails", punishDetails(server));

    app.get("/userDetails", userDetails(server));

    app.get("/statistics", statistics(server));
};
