import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    if (!supabase) {
      toast.error("Supabase auth is not configured");
      return;
    }
    setIsGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    setIsGoogleLoading(false);
    if (error) {
      toast.error(error.message);
    }
  };

  const sendMagicLink = async () => {
    if (!supabase) {
      toast.error("Supabase auth is not configured");
      return;
    }
    if (!email.trim()) {
      toast.error("Enter your email address");
      return;
    }

    setIsSendingLink(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    setIsSendingLink(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Magic link sent. Check your email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!isSupabaseConfigured && (
            <p className="text-sm text-red-500">
              Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in env.
            </p>
          )}
          <Button
            className="w-full"
            size="lg"
            onClick={signInWithGoogle}
            disabled={isGoogleLoading || !isSupabaseConfigured}
          >
            {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
          </Button>

          <div className="relative text-center text-xs text-gray-400 py-1">
            <span className="bg-white px-2 relative z-10">or</span>
            <div className="absolute left-0 right-0 top-1/2 border-t -z-0" />
          </div>

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={sendMagicLink}
            disabled={isSendingLink || !isSupabaseConfigured}
          >
            {isSendingLink ? "Sending..." : "Send Magic Link"}
          </Button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Back to Store
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
