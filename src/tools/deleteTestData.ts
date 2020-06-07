import { createConnection } from "typeorm";

import { Infraction } from "../entities/Infraction";

(async () => {
    console.log("Connecting to database...");
    const conn = await createConnection();
    // await conn.synchronize();
    const repo = conn.getRepository(Infraction);

    console.log("Deleting data...");
    await repo.delete("*");

    const count = await repo.count();
    if (count != 0) {
        console.warn("Deletion failed.");
    }

    console.log("Done.");
    await conn.close();
})();
