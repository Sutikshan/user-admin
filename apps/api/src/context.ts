import * as trpcStandalone from "@trpc/server/adapters/standalone";
import { db } from "./db";
import { verifyToken } from "./jwtUtils";

export async function createContext({
  req,
  res,
}: trpcStandalone.CreateHTTPContextOptions) {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const token = req.headers.authorization;

      if (!token) {
        return null;
      }

      const decodedToken = verifyToken(token);
      const user = await db.user.findById(decodedToken.id);

      console.log(user);
      return user;
    }
    return null;
  }

  const user = await getUserFromHeader();

  return {
    user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
