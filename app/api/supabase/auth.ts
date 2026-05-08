import { env } from "../lib/env";
import { findUserByUnionId, upsertUser } from "../queries/users";
import type { InsertUser } from "@db/schema";
import * as jose from "jose";

type SupabaseUserResponse = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
    avatar_url?: string;
  };
};

type SupabaseJwtPayload = jose.JWTPayload & {
  email?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
    avatar_url?: string;
  };
};

let jwks: ReturnType<typeof jose.createRemoteJWKSet> | null = null;

function getJwks() {
  if (!jwks) {
    jwks = jose.createRemoteJWKSet(
      new URL(`${env.supabaseUrl}/auth/v1/.well-known/jwks.json`),
    );
  }
  return jwks;
}

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
    let unionId = "";
    let email: string | null = null;
    let meta: SupabaseUserResponse["user_metadata"] = {};

    const userHeaders: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };
    if (env.supabaseAnonKey) {
      userHeaders.apikey = env.supabaseAnonKey;
    }

    const resp = await fetch(`${env.supabaseUrl}/auth/v1/user`, {
      headers: userHeaders,
    });

    if (resp.ok) {
      const typed = (await resp.json()) as SupabaseUserResponse;
      unionId = typeof typed.id === "string" ? typed.id : "";
      email = typeof typed.email === "string" ? typed.email : null;
      meta = typed.user_metadata ?? {};
    } else {
      // Fallback: verify the JWT directly against Supabase JWKS.
      const { payload } = await jose.jwtVerify(token, getJwks(), {
        issuer: `${env.supabaseUrl}/auth/v1`,
      });
      const decoded = payload as SupabaseJwtPayload;
      unionId = typeof decoded.sub === "string" ? decoded.sub : "";
      email = typeof decoded.email === "string" ? decoded.email : null;
      meta = decoded.user_metadata ?? {};
    }

    if (!unionId) return null;

    const values: InsertUser = {
      unionId,
      email,
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
