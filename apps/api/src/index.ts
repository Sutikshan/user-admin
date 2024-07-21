import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { createContext } from "./context";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

const appRouter = router({
  user: userRouter, // put procedures under "user" namespace
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext,
});

server.listen(process.env.PORT ?? 3001);

console.log("Server is running on ", process.env.PORT ?? 3001);
