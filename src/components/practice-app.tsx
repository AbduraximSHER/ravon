"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TongueGuide } from "@/components/tongue-guide";
import { VoiceRecorder } from "@/components/voice-recorder";
import {
  DAILY_PLAN,
  MISTAKES,
  STAGES,
  type StageId,
} from "@/lib/exercises";
import { useProgress } from "@/hooks/use-progress";

export function PracticeApp() {
  const progress = useProgress();
  const [view, setView] = useState<"home" | "stage" | "plan" | "mistakes">(
    "home",
  );
  const [activeItem, setActiveItem] = useState(0);

  const stage = useMemo(
    () => STAGES.find((s) => s.id === progress.activeStage) ?? STAGES[0],
    [progress.activeStage],
  );

  const stageIndex = STAGES.findIndex((s) => s.id === stage.id);
  const stageDone = stage.drills.every((d) =>
    progress.completedDrills.includes(d.id),
  );

  function openStage(id: StageId) {
    progress.setActiveStage(id);
    setActiveItem(0);
    setView("stage");
  }

  function goHome() {
    setView("home");
  }

  if (view === "plan") {
    return (
      <section className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <BackButton onClick={goHome} />
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-teal-950">
          Kunlik 10 daqiqa
        </h2>
        <p className="mt-2 text-teal-900/70">
          Har kuni shu tartibni saqlang. Uzun mashqdan ko‘ra qisqa va muntazam yaxshiroq.
        </p>
        <ol className="mt-8 space-y-4">
          {DAILY_PLAN.map((item, i) => (
            <li
              key={item.label}
              className="flex gap-4 border-b border-teal-900/10 pb-4"
            >
              <span className="font-[family-name:var(--font-display)] text-2xl text-teal-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-semibold text-teal-950">
                  {item.minutes} daq — {item.label}
                </p>
                <p className="text-sm text-teal-900/65">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  if (view === "mistakes") {
    return (
      <section className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <BackButton onClick={goHome} />
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-teal-950">
          Tez-tez uchraydigan xatolar
        </h2>
        <p className="mt-2 text-teal-900/70">
          Xato qilish — jarayonning bir qismi. Faqat yo‘nalishni tuzating.
        </p>
        <ul className="mt-8 space-y-6">
          {MISTAKES.map((m) => (
            <li key={m.title}>
              <h3 className="font-semibold text-teal-950">{m.title}</h3>
              <p className="mt-1 text-teal-900/70">{m.fix}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (view === "stage") {
    const drill = stage.drills[Math.min(activeItem, stage.drills.length - 1)];
    const done = progress.completedDrills.includes(drill.id);
    const sample = drill.items[0] ?? "ra";

    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <BackButton onClick={goHome} />
          <Badge variant="secondary" className="bg-teal-100 text-teal-900">
            Bosqich {stage.number}/5
          </Badge>
        </div>

        <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-teal-950 sm:text-4xl">
          {stage.title}
        </h2>
        <p className="mt-2 max-w-xl text-teal-900/70">{stage.goal}</p>

        {stage.id === "tayyorlov" || stage.id === "tebranish" ? (
          <TongueGuide className="mx-auto mt-6 w-full max-w-md" />
        ) : null}

        <div className="mt-8 space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-800/70">
            Qanday qilinadi
          </h3>
          <ol className="space-y-2">
            {stage.steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-teal-950/85">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-800 text-xs font-bold text-teal-50">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950/80">
            {stage.tip}
          </p>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-teal-950">
              Mashq {activeItem + 1}/{stage.drills.length}
            </h3>
            <div className="flex gap-1">
              <Button
                type="button"
                size="icon-sm"
                variant="outline"
                disabled={activeItem === 0}
                onClick={() => setActiveItem((n) => Math.max(0, n - 1))}
                aria-label="Oldingi mashq"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                type="button"
                size="icon-sm"
                variant="outline"
                disabled={activeItem >= stage.drills.length - 1}
                onClick={() =>
                  setActiveItem((n) => Math.min(stage.drills.length - 1, n + 1))
                }
                aria-label="Keyingi mashq"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          <p className="mt-1 font-semibold text-teal-900">{drill.title}</p>
          <p className="text-sm text-teal-900/65">{drill.hint}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-teal-700">
            Har birini {drill.reps} marta
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {drill.items.map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-xl bg-teal-900 px-4 py-3 font-[family-name:var(--font-display)] text-xl text-teal-50 transition hover:bg-teal-800 active:scale-[0.98]"
                onClick={() => {
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    const u = new SpeechSynthesisUtterance(item);
                    u.lang = "uz-UZ";
                    u.rate = 0.85;
                    window.speechSynthesis.cancel();
                    window.speechSynthesis.speak(u);
                  }
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-teal-900/50">
            Bosib eshiting (brauzer ovozi). Keyin o‘zingiz takrorlang.
          </p>

          <div className="mt-6">
            <VoiceRecorder prompt={sample} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {!done ? (
              <Button
                type="button"
                className="gap-1.5"
                onClick={() => progress.markPracticed(drill.id)}
              >
                <Check className="size-4" />
                Bugun shu mashqni qildim
              </Button>
            ) : (
              <Button
                type="button"
                variant="secondary"
                className="gap-1.5"
                onClick={() => progress.unmarkDrill(drill.id)}
              >
                <Check className="size-4" />
                Bajarildi — bekor qilish
              </Button>
            )}
            {activeItem < stage.drills.length - 1 ? (
              <Button
                type="button"
                variant="outline"
                className="gap-1.5"
                onClick={() => setActiveItem((n) => n + 1)}
              >
                Keyingi mashq
                <ArrowRight className="size-4" />
              </Button>
            ) : stageIndex < STAGES.length - 1 ? (
              <Button
                type="button"
                variant="outline"
                className="gap-1.5"
                onClick={() => openStage(STAGES[stageIndex + 1].id)}
              >
                Keyingi bosqich
                <ArrowRight className="size-4" />
              </Button>
            ) : null}
          </div>

          {stageDone && (
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-teal-800">
              <Sparkles className="size-4" />
              Bu bosqichdagi mashqlar belgilandi. Keyingisiga o‘ting!
            </p>
          )}
        </div>

        <p className="mt-10 text-sm leading-relaxed text-teal-900/60">{stage.why}</p>
      </section>
    );
  }

  return (
    <>
      <Hero
        percent={progress.percent}
        streak={progress.streakDays}
        onStart={() => openStage(progress.activeStage)}
        onPlan={() => setView("plan")}
      />

      <section
        id="bosqichlar"
        className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-teal-950">
              5 bosqich
            </h2>
            <p className="mt-1 text-teal-900/65">
              Tartib bilan boring. Oldingisini yaxshi his qilgach — keyingisi.
            </p>
          </div>
          <div className="min-w-[140px]">
            <div className="mb-1 flex justify-between text-xs text-teal-800/70">
              <span>Umumiy</span>
              <span>
                {progress.doneCount}/{progress.totalDrills}
              </span>
            </div>
            <Progress value={progress.percent} className="h-2" />
          </div>
        </div>

        <ul className="mt-8 space-y-0">
          {STAGES.map((s, i) => {
            const doneCount = s.drills.filter((d) =>
              progress.completedDrills.includes(d.id),
            ).length;
            const complete = doneCount === s.drills.length;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => openStage(s.id)}
                  className="group flex w-full items-center gap-4 border-b border-teal-900/10 py-5 text-left transition hover:bg-teal-50/60"
                >
                  <span className="font-[family-name:var(--font-display)] text-3xl text-teal-700/80 group-hover:text-teal-800">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-teal-950">
                      {s.title}
                    </span>
                    <span className="block truncate text-sm text-teal-900/60">
                      {s.goal}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-medium text-teal-800/70">
                    {complete ? "tayyor" : `${doneCount}/${s.drills.length}`}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-teal-800/40 transition group-hover:translate-x-0.5 group-hover:text-teal-800" />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => setView("mistakes")}>
            Xatolar va tuzatish
          </Button>
          <Button type="button" variant="outline" onClick={() => setView("plan")}>
            Kunlik reja
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="gap-1.5 text-teal-900/60"
            onClick={() => {
              if (confirm("Barcha progress o‘chirilsinmi?")) {
                progress.resetProgress();
              }
            }}
          >
            <RotateCcw className="size-3.5" />
            Progressni nolga
          </Button>
        </div>
      </section>
    </>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" variant="ghost" size="sm" onClick={onClick} className="gap-1 px-0">
      <ChevronLeft className="size-4" />
      Orqaga
    </Button>
  );
}

function Hero({
  percent,
  streak,
  onStart,
  onPlan,
}: {
  percent: number;
  streak: number;
  onStart: () => void;
  onPlan: () => void;
}) {
  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(45, 212, 191, 0.35), transparent 55%), radial-gradient(ellipse 70% 50% at 10% 80%, rgba(15, 118, 110, 0.18), transparent 50%), linear-gradient(165deg, #f3fbf8 0%, #e7f6f1 45%, #d9efe8 100%)",
        }}
      />
      <div
        aria-hidden
        className="wave-pattern pointer-events-none absolute inset-0 -z-10 opacity-40"
      />

      <div className="mx-auto grid min-h-[88vh] w-full max-w-5xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="animate-rise">
          <p className="font-[family-name:var(--font-display)] text-5xl tracking-tight text-teal-950 sm:text-6xl md:text-7xl">
            Ravon
          </p>
          <h1 className="mt-5 max-w-lg text-balance text-2xl font-medium leading-snug text-teal-950/90 sm:text-3xl">
            R harfini mashq bilan to‘g‘rilang
          </h1>
          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-teal-900/70 sm:text-lg">
            O‘zbekcha talaffuz uchun 5 bosqichli mashqlar — til joyi, tebranish,
            bo‘g‘in, so‘z va gap. Kuniga 10 daqiqa yetadi.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button type="button" size="lg" className="gap-2" onClick={onStart}>
              Mashqni boshlash
              <ArrowRight className="size-4" />
            </Button>
            <Button type="button" size="lg" variant="outline" onClick={onPlan}>
              Kunlik reja
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-teal-900/65">
            {streak > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Flame className="size-4 text-orange-500" />
                {streak} kun ketma-ket
              </span>
            )}
            <span>{percent}% mashqlar belgilandi</span>
          </div>
        </div>

        <div className="animate-rise-delayed relative">
          <TongueGuide className="w-full drop-shadow-sm" />
          <p className="mt-2 text-center text-sm text-teal-900/55">
            Til uchi + havo oqimi = R
          </p>
        </div>
      </div>
    </header>
  );
}
