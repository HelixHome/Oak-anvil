interface LogoProps {
  light?: boolean
  size?: number
  sub?: boolean
  est?: boolean
}

export function Logo({ light = false, size = 1, sub = true, est = true }: LogoProps) {
  const ink = light ? 'rgba(247,245,241,0.92)' : 'var(--charcoal)'
  const muted = light ? 'rgba(247,245,241,0.7)' : 'var(--greige)'

  return (
    <div style={{ textAlign: 'center', lineHeight: 1, userSelect: 'none' }}>
      {est && (
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 9 * size, letterSpacing: '0.34em', color: muted, marginBottom: 7 * size, textTransform: 'uppercase' }}>
          Est. 2002
        </div>
      )}
      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 400, fontSize: 27 * size, letterSpacing: '0.18em', color: ink, paddingLeft: '0.18em' }}>
        OAK &amp; ANVIL
      </div>
      {sub && (
        <>
          <div style={{ width: 70 * size, height: 1, background: 'var(--taupe)', opacity: 0.85, margin: `${8 * size}px auto ${7 * size}px` }} />
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 8.5 * size, letterSpacing: '0.32em', color: muted, textTransform: 'uppercase' }}>
            The Considered Home
          </div>
        </>
      )}
    </div>
  )
}
