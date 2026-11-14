import { PracticeApp } from "@/components/practice-app";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <PracticeApp />
      <footer className="mt-auto border-t border-teal-900/10 px-4 py-8 text-center text-sm text-teal-900/50 sm:px-6">
        <p>
          Ravon — uyda mashq uchun. Og‘ir nutq muammosi bo‘lsa, logopedga murojaat
          qiling.
        </p>
      </footer>
    </main>
  );
}
