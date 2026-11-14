"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { STAGES, type StageId } from "@/lib/exercises";

const STORAGE_KEY = "ravon-progress-v1";

type ProgressState = {
  completedDrills: string[];
  activeStage: StageId;
  streakDays: number;
  lastPracticeDate: string | null;
};

const defaultState: ProgressState = {
  completedDrills: [],
  activeStage: "tayyorlov",
  streakDays: 0,
  lastPracticeDate: null,
};

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function load(): ProgressState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as ProgressState;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

function save(state: ProgressState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function mergeProgress(saved: ProgressState, current: ProgressState): ProgressState {
  const completedDrills = Array.from(
    new Set([...saved.completedDrills, ...current.completedDrills]),
  );
  return {
    ...saved,
    completedDrills,
    streakDays: Math.max(saved.streakDays, current.streakDays),
    lastPracticeDate: current.lastPracticeDate ?? saved.lastPracticeDate,
    activeStage: current.activeStage !== defaultState.activeStage
      ? current.activeStage
      : saved.activeStage,
  };
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(defaultState);
  const booted = useRef(false);

  useEffect(() => {
    setState((current) => {
      const merged = mergeProgress(load(), current);
      save(merged);
      return merged;
    });
    booted.current = true;
  }, []);

  const markPracticed = useCallback((drillId: string) => {
    setState((prev) => {
      const today = todayKey();
      let streakDays = prev.streakDays;
      if (prev.lastPracticeDate !== today) {
        streakDays =
          prev.lastPracticeDate === yesterdayKey()
            ? prev.streakDays + 1
            : 1;
      }
      const completedDrills = prev.completedDrills.includes(drillId)
        ? prev.completedDrills
        : [...prev.completedDrills, drillId];
      const next = {
        ...prev,
        completedDrills,
        streakDays,
        lastPracticeDate: today,
      };
      save(next);
      return next;
    });
  }, []);

  const unmarkDrill = useCallback((drillId: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        completedDrills: prev.completedDrills.filter((id) => id !== drillId),
      };
      save(next);
      return next;
    });
  }, []);

  const setActiveStage = useCallback((stage: StageId) => {
    setState((prev) => {
      const next = { ...prev, activeStage: stage };
      if (booted.current) save(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    save(defaultState);
    setState(defaultState);
  }, []);

  const totalDrills = STAGES.reduce((n, s) => n + s.drills.length, 0);
  const doneCount = state.completedDrills.length;
  const percent = Math.round((doneCount / totalDrills) * 100);

  return {
    ...state,
    totalDrills,
    doneCount,
    percent,
    markPracticed,
    unmarkDrill,
    setActiveStage,
    resetProgress,
  };
}
