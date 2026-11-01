/** <svg class="ic"><use href="#i-…"/></svg> from the shared sprite */
export default function Icon({ id, className = 'ic', hidden = true }: { id: string; className?: string; hidden?: boolean }) {
  return (
    <svg className={className} aria-hidden={hidden ? 'true' : undefined}>
      <use href={`#i-${id}`} />
    </svg>
  );
}
