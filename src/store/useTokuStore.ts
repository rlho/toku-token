"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase, TokuRecordRow } from "@/lib/supabase";
import { getAnonymousId } from "@/lib/anonymousId";

export type TokuRecord = {
  id: string;
  userId: string;
  text: string;
  date: string;
  isPrivate: boolean;
  latitude: number | null;
  longitude: number | null;
  imageUrl: string | null;
  likeCount: number;
  likedByMe: boolean;
};

function rowToRecord(row: TokuRecordRow, likeCount: number, likedByMe: boolean): TokuRecord {
  const d = new Date(row.created_at);
  const date = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
  return {
    id: row.id,
    userId: row.user_id,
    text: row.text,
    date,
    isPrivate: row.is_private,
    latitude: row.latitude,
    longitude: row.longitude,
    imageUrl: row.image_url,
    likeCount,
    likedByMe,
  };
}

export function useTokuStore(userId?: string) {
  const [records, setRecords] = useState<TokuRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [tokuCount, setTokuCount] = useState(0);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    const anonId = getAnonymousId();

    const { data: recordData, error } = await supabase
      .from("toku_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !recordData) {
      setLoading(false);
      return;
    }

    // Fetch like counts
    const recordIds = recordData.map((r) => r.id);
    const { data: likeData } = await supabase
      .from("toku_likes")
      .select("record_id, anonymous_id")
      .in("record_id", recordIds.length > 0 ? recordIds : ["_none_"]);

    const likeCounts: Record<string, number> = {};
    const myLikes: Record<string, boolean> = {};
    (likeData ?? []).forEach((l) => {
      likeCounts[l.record_id] = (likeCounts[l.record_id] ?? 0) + 1;
      if (l.anonymous_id === anonId) {
        myLikes[l.record_id] = true;
      }
    });

    setRecords(
      recordData.map((r) => rowToRecord(r, likeCounts[r.id] ?? 0, myLikes[r.id] ?? false))
    );
    setLoading(false);
  }, []);

  const fetchTokuCount = useCallback(async () => {
    if (!userId) return;
    const { count } = await supabase
      .from("toku_records")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);
    setTokuCount(count ?? 0);
  }, [userId]);

  useEffect(() => {
    fetchRecords();
    fetchTokuCount();
  }, [fetchRecords, fetchTokuCount]);

  const addRecord = useCallback(
    async (text: string, isPrivate: boolean, location?: { lat: number; lng: number }, imageFile?: File) => {
      if (!userId) return false;

      let imageUrl: string | null = null;
      if (imageFile) {
        const ext = imageFile.name.split(".").pop() || "jpg";
        const path = `${userId}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("toku-images")
          .upload(path, imageFile);
        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from("toku-images")
            .getPublicUrl(path);
          imageUrl = urlData.publicUrl;
        }
      }

      const { error } = await supabase.from("toku_records").insert({
        user_id: userId,
        text,
        is_private: isPrivate,
        latitude: location?.lat ?? null,
        longitude: location?.lng ?? null,
        image_url: imageUrl,
      });

      if (!error) {
        await fetchRecords();
        await fetchTokuCount();
        return true;
      }
      return false;
    },
    [userId, fetchRecords, fetchTokuCount]
  );

  const toggleLike = useCallback(
    async (recordId: string) => {
      const anonId = getAnonymousId();

      // Check if already liked
      const { data: existing } = await supabase
        .from("toku_likes")
        .select("id")
        .eq("record_id", recordId)
        .eq("anonymous_id", anonId)
        .maybeSingle();

      if (existing) {
        await supabase.from("toku_likes").delete().eq("id", existing.id);
      } else {
        await supabase.from("toku_likes").insert({
          record_id: recordId,
          anonymous_id: anonId,
        });
      }

      await fetchRecords();
    },
    [fetchRecords]
  );

  return {
    records,
    tokuCount,
    loading,
    addRecord,
    toggleLike,
    refetch: fetchRecords,
  };
}
