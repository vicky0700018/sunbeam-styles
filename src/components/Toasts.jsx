import { useStore } from "@/store/StoreProvider";

export default function Toasts() {
  const { toasts } = useStore();

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`animate-in fade-in slide-in-from-bottom-2 rounded-2xl px-4 py-3 text-sm font-bold shadow-lift ${
            t.tone === "info"
              ? "bg-card text-foreground"
              : t.tone === "error"
                ? "bg-destructive text-destructive-foreground"
                : "bg-ink text-cream"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
