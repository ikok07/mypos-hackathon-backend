import { Context, Next } from "hono";
import { protectWebhook } from "../../../../middlewares/protect-webhook.ts";
import { z } from "zod";
import axios from "axios";
import { getInjection } from "../../../../../di/container.ts";
import { successResponse } from "../../../../../entities/utils/handlers/successResponse.ts";
import { ApiError } from "../../../../../entities/models/errors/ApiError.ts";

const requestBodySchema = z.object({
    type: z.literal("user.created"),
    data: z.object({
        id: z.string(),
        email_addresses: z.array(
            z.object({
                email_address: z.string().email(),
            })
        ),
        phone_numbers: z.array(
            z.object({
                phone_number: z.string(),
            })
        ),
        first_name: z.string().min(1),
        last_name: z.string().min(1),
        image_url: z.string().url().nullable(),
    }),
});

export async function userCreatedWebhookHandler(c: Context, next: Next) {
    const payload = await c.req.text();
    const result = protectWebhook(
        c,
        Deno.env.get("USER_CREATED_WEBHOOK_SECRET")!,
        payload
    );
    if (!result) throw new ApiError("Unauthorized", 401);

    const { data: body, error: bodyError } = requestBodySchema.safeParse(
        JSON.parse(payload)
    );
    if (bodyError) throw new ApiError("Invalid body", 400);

    const updateUserMetadataUseCase = getInjection(
        "IUpdateUserMetadataUseCase"
    );
    await updateUserMetadataUseCase(body.data.id, {
        publicMetadata: {
            roles: ["user"],
        },
    });

    const createProfileUseCase = getInjection("ICreateProfileUseCase");
    await createProfileUseCase({
        id: body.data.id,
        name: `${body.data.first_name} ${body.data.last_name}`,
        email: body.data.email_addresses[0].email_address,
        phone: body.data.phone_numbers[0].phone_number,
    });

    const createProfileBalanceUseCase = getInjection(
        "ICreateProfileBalanceUseCase"
    );
    await createProfileBalanceUseCase({
        profile_id: body.data.id,
        amount_bgn: 0,
        amount_credits: 0,
    });

    return successResponse(c);
}
