/**
 * Dashed-gold placeholder describing a photo still to be shot.
 * Replace with a real <Image> once the photography is ready.
 */
export function PhotoSuggestion({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-2.5 rounded-lg border-[1.5px] border-dashed border-gold-400 bg-[color-mix(in_srgb,var(--gold-200)_24%,var(--cream-100))] px-6 py-7 text-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-800">
        Photo suggestion
      </p>
      <p className="text-fine max-w-[30ch] text-[17px] leading-[1.5] text-ink-600">
        {children}
      </p>
    </div>
  );
}
