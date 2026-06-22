export default function TrainerPanel({ note }) {
  if (!note) return null;

  // Split note into blocks by \n\n
  const blocks = note.split('\n\n').filter(Boolean);

  return (
    <aside
      role="complementary"
      aria-label="Notes formateur"
      className="border-t border-amber-500/30 bg-amber-950/20 px-6 py-4 animate-slide-up"
    >
      <div className="flex items-start gap-3 max-w-5xl mx-auto">
        <span className="text-amber-400 text-lg shrink-0 mt-0.5">🎤</span>
        <div className="flex-1 min-w-0">
          <p className="text-amber-300 text-xs font-bold uppercase tracking-wide mb-2">Notes formateur</p>
          <div className="space-y-1.5">
            {blocks.map((block, i) => (
              <p key={i} className="text-amber-900 text-sm leading-relaxed whitespace-pre-line">
                {block}
              </p>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
