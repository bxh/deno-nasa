import { Router } from "https://deno.land/x/oak@v6.4.1/mod.ts";
import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = "NASA Mission Control API";
});

router.get("/planets", (ctx) => {
    ctx.response.body = planets.getAll();
});

router.get("/launches", (ctx) => {
    ctx.response.body = launches.getAll();
});

router.post("/launches", async (ctx) => {
    const result = ctx.request.body();
    if(result.type == "json") {
        launches.addOne(await result.value);
        ctx.response.body = { success: true };
    }
    else {
        ctx.throw(400, "Body must be JSON.");
    }
});

router.get("/launches/:id", (ctx) => {
    if (ctx.params?.id) {
        const launchesList = launches.getOne(Number(ctx.params.id));
        if(launchesList) {
            ctx.response.body = launchesList;
        } else {
            ctx.throw(400, "Launche with that ID ddoesn't exist.");
        }
    }
});

router.delete("/launches/:id", (ctx) => {
    if (ctx.params?.id) {
        const result = launches.removeOne(Number(ctx.params.id));
        ctx.response.body = { success: result };
    }
});

export default router;