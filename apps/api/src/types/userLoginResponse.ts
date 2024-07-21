import { z } from "zod";

// Schema for when success is true
const successTrueSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  token: z.string(),
  user: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),

    userName: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});

// Schema for when success is false
const successFalseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});
const schema = z.union([successTrueSchema, successFalseSchema]);

export default schema;
