"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase, TokuRecordRow } from "@/lib/supabase";

export type TokuRecord = {
  id: string;
  userId: string;
  text: string;
  date: string;
  isPrivate: boolean;
  latitude: number | null;
  longitude: number | null;
};

function rowToRecord(row: TokuRecordRow): TokuRecord {
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
  };
}

export function useTokuStore(userId?: string) {
  const [records, setRecords] = useState<TokuRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [tokuCount, setTokuCount] = useState(0);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("toku_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRecords(data.map(rowToRecord));
    }
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
    async (text: string, isPrivate: boolean, location?: { lat: number; lng: number }) => {
      if (!userId) return false;

      const { error } = await supabase.from("toku_records").insert({
        user_id: userId,
        text,
        is_private: isPrivate,
        latitude: location?.lat ?? null,
        longitude: location?.lng ?? null,
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

  return {
    records,
    tokuCount,
    loading,
    addRecord,
    refetch: fetchRecords,
  };
}
