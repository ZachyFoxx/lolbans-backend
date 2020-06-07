import { createConnection } from "typeorm";

import { Infraction } from "../entities/Infraction";

(async () => {
    console.log("Generating test data...");

    const infractions = [];
    for (let i = 0; i < 100; i++) {
        infractions.push(
            new Infraction(
                i,
                "ban",
                Math.floor(Math.random() * 100).toString(),
                Math.floor(Math.random() * 100).toString(),
                Math.floor(Math.random() * 100)
            )
        );
    }

    console.log("Connecting to database...");
    const conn = await createConnection();
    await conn.synchronize();
    const repo = conn.getRepository(Infraction);

    console.log("Saving data...");
    await repo.save(infractions);

    console.log("Done.");
    await conn.close();
})();
