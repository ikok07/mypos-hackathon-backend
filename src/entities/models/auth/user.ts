import { z } from "zod";

export const roleScheme = z.array(
  z.union([z.literal("admin"), z.literal("user")])
);
export const userScheme = z
  .object({
    email: z.string().email(),
    email_verified: z.boolean(),
    given_name: z.string(),
    family_name: z.string(),
    name: z.string(),
    "urn:zitadel:iam:org:project:roles": z.record(z.record(z.string())),
  })
  .transform((fields) => {
    const { "urn:zitadel:iam:org:project:roles": rolesRecord, ...rest } =
      fields;

    const { data, error } = roleScheme.safeParse(Object.keys(rolesRecord));
    return {
      ...rest,
      roles: error ? {} : data,
    };
  });

export type User = z.infer<typeof userScheme>;
