import { Request, Response, Router } from "express";

/**
 * Infraction methds
 * @param server
 */
export const infractions = () =>
    Router().get("/", async (req: Request, res: Response) => {
        return res.send("not implemented");

        /**
        const repo = server.connection.getRepository(Infraction);
        const count = await repo.count();

        if (req.query.p) {
            if (
                typeof req.query.p != "string" ||
                isNaN(parseInt(req.query.p as string)) ||
                parseInt(req.query.p as string) % 1 != 0
            ) {
                return badRequest(req, res);
            }

            const data = await repo
                .createQueryBuilder("paginator")
                .orderBy("paginator.id", "ASC")
                .skip((parseInt(req.query.p) - 1) * 50)
                .take(50)
                .getMany();

            return res.json(data);
        }

        return res.json({
            count,
            pages: Math.ceil(count / 50),
        });
        */
    });
