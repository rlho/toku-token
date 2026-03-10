import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type TokuRecordRow = {
  id: string;
  user_id: string;
  text: string;
  is_private: boolean;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
};
