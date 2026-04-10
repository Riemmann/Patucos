import Link from "next/link"

export function LegalFooter() {
  return (
    <div className="flex items-center justify-center gap-3 py-2 text-[10px] text-muted-foreground/50">
      <Link href="/legal/privacidad" className="hover:text-muted-foreground transition-colors">Privacidad</Link>
      <span>·</span>
      <Link href="/legal/aviso-legal" className="hover:text-muted-foreground transition-colors">Aviso Legal</Link>
    </div>
  )
}
