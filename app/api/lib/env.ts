import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

function requiredOneOf(names: string[]): string {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      `Missing required environment variable: one of ${names.join(" or ")}`,
    );
  }

  return "";
}

export const env = {
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: required("DATABASE_URL"),
  supabaseUrl: required("SUPABASE_URL"),
  supabaseAnonKey: requiredOneOf([
    "SUPABASE_ANON_KEY",
    "VITE_SUPABASE_ANON_KEY",
  ]),
  // Legacy fields kept optional for backward-compatible compilation.
  appId: process.env.APP_ID ?? "",
  appSecret: process.env.APP_SECRET ?? "",
  kimiAuthUrl: process.env.KIMI_AUTH_URL ?? "",
  kimiOpenUrl: process.env.KIMI_OPEN_URL ?? "",
  ownerUnionId: process.env.OWNER_UNION_ID ?? "",
};
