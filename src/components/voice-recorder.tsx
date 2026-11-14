"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "recording" | "ready" | "denied" | "unsupported";

export function VoiceRecorder({ prompt }: { prompt: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  async function start() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setStatus("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        setStatus("ready");
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRef.current = recorder;
      recorder.start();
      setStatus("recording");
    } catch {
      setStatus("denied");
    }
  }

  function stop() {
    mediaRef.current?.stop();
  }

  function clear() {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setStatus("idle");
  }

  return (
    <div className="rounded-2xl border border-teal-900/10 bg-white/70 p-4 backdrop-blur">
      <p className="text-sm text-teal-950/70">
        O‘zingizni yozib tinglang: <span className="font-semibold text-teal-950">{prompt}</span>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {status !== "recording" ? (
          <Button type="button" size="sm" onClick={start} className="gap-1.5">
            <Mic className="size-4" />
            Yozish
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={stop}
            className="gap-1.5"
          >
            <Square className="size-3.5 fill-current" />
            To‘xtatish
          </Button>
        )}
        {audioUrl && (
          <>
            <audio controls src={audioUrl} className="h-9 max-w-full" />
            <Button type="button" size="sm" variant="ghost" onClick={clear} className="gap-1.5">
              <Trash2 className="size-4" />
              O‘chirish
            </Button>
          </>
        )}
      </div>
      {status === "recording" && (
        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-rose-700">
          <span className="size-2 animate-pulse rounded-full bg-rose-600" />
          Yozilmoqda…
        </p>
      )}
      {status === "denied" && (
        <p className="mt-2 text-sm text-amber-800">
          Mikrofon ruxsati kerak. Brauzer sozlamalaridan ruxsat bering.
        </p>
      )}
      {status === "unsupported" && (
        <p className="mt-2 text-sm text-amber-800">
          Bu brauzer yozib olishni qo‘llab-quvvatlamaydi. Chrome yoki Edge sinab ko‘ring.
        </p>
      )}
      {status === "ready" && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-teal-800">
          <Play className="size-3.5" />
          Tinglang: R aniq eshitiladimi?
        </p>
      )}
    </div>
  );
}
