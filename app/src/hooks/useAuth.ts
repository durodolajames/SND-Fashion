import { trpc } from "@/providers/trpc";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { LOGIN_PATH } from "@/const";
import { supabase } from "@/lib/supabase";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = LOGIN_PATH } =
    options ?? {};
  const [hasSession, setHasSession] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  const navigate = useNavigate();

  const utils = trpc.useUtils();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = trpc.auth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const logout = useCallback(() => {
    // Optimistically clear auth UI state immediately so logout feels instant.
    setHasSession(false);
    setSessionChecked(true);
    utils.auth.me.setData(undefined, undefined);
    navigate(redirectPath, { replace: true });

    if (supabase) {
      void supabase.auth.signOut({ scope: "local" }).catch(() => {
        // ignore signOut errors; local UI state is already cleared
      });
    }
  }, [navigate, redirectPath, utils.auth.me]);

  useEffect(() => {
    if (!supabase) {
      setSessionChecked(true);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
      setSessionChecked(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setHasSession(!!session);
      setSessionChecked(true);

      if (event === "SIGNED_OUT") {
        utils.auth.me.setData(undefined, undefined);
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") {
        await refetch();
      }

      await utils.invalidate();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [utils, refetch]);

  const isAuthenticated = hasSession || !!user;
  const authLoading = isLoading || !sessionChecked;

  useEffect(() => {
    if (redirectOnUnauthenticated && !authLoading && !isAuthenticated) {
      const currentPath = window.location.pathname;
      if (currentPath !== redirectPath) {
        navigate(redirectPath);
      }
    }
  }, [redirectOnUnauthenticated, authLoading, isAuthenticated, navigate, redirectPath]);

  return useMemo(
    () => ({
      user: user ?? null,
      isAuthenticated,
      isLoading: authLoading,
      error,
      logout,
      refresh: refetch,
    }),
    [user, isAuthenticated, authLoading, error, logout, refetch],
  );
}
