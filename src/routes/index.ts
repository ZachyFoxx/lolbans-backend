import { ApiServer } from "../ApiServer";
import { punishDetails } from "./punishDetails";
import { punishments } from "./punishments";
import { statistics } from "./statistics";
import { statisticsTimed } from "./statisticsTimed";
import { status } from "./status";
import { users } from "./users";

export const registerRoutes = (server: ApiServer) => {
    const app = server.app;

    app.get("/", status);

    app.use("/punishments", punishments(server));
    app.get("/punishments/:id", punishDetails(server));

    app.get("/users/:uuid", users(server));

    app.get("/statistics", statistics(server));
    app.get("/statistics/timed", statisticsTimed(server));
};
