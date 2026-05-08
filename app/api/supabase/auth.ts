import { env } from "../lib/env";
import { findUserByUnionId, upsertUser } from "../queries/users";
import type { InsertUser } from "@db/schema";

type SupabaseUserResponse = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
    avatar_url?: string;
  };
};

function getBearerToken(headers: Headers): string | null {
  const auth = headers.get("authorization");
  if (!auth || !auth.toLowerCase().startsWith("bearer ")) {
    return null;
  }
  return auth.slice(7).trim();
}

export async function authenticateRequest(headers: Headers) {
  if (!env.supabaseUrl) {
    return null;
  }

  const token = getBearerToken(headers);
  if (!token) {
    return null;
  }

  try {
    const resp = await fetch(`${env.supabaseUrl}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: env.supabaseAnonKey,
      },
    });

    if (!resp.ok) {
      return null;
    }

    const typed = (await resp.json()) as SupabaseUserResponse;
    const unionId = typeof typed.id === "string" ? typed.id : "";
    if (!unionId) {
      return null;
    }

    const meta = typed.user_metadata ?? {};
    const values: InsertUser = {
      unionId,
      email: typeof typed.email === "string" ? typed.email : null,
      name:
        typeof meta.full_name === "string"
          ? meta.full_name
          : typeof meta.name === "string"
            ? meta.name
            : null,
      avatar: typeof meta.avatar_url === "string" ? meta.avatar_url : null,
      lastSignInAt: new Date(),
    };

    await upsertUser(values);
    return findUserByUnionId(unionId);
  } catch {
    return null;
  }
}
