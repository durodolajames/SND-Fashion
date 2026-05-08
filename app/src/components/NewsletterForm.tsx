import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      setEmail("");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribe.mutate({ email: email.trim() });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
        Join the Culture
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2.5 bg-gray-50 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#e85d04]/20 placeholder:text-gray-400"
          required
        />
        <Button
          type="submit"
          disabled={subscribe.isPending}
          className="bg-[#e85d04] hover:bg-[#d15104] text-white rounded-full px-5"
        >
          {subscribe.isPending ? "..." : "Subscribe"}
        </Button>
      </div>
    </form>
  );
}
