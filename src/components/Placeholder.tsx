import type { CSSProperties } from 'react'
import type { Tone } from '@/types'

const TONES: Record<Tone, { bg: string; ink: string }> = {
  sand:  { bg: '#E6E0D5', ink: '#9A9082' },
  bone:  { bg: '#ECE8E0', ink: '#A49C8E' },
  stone: { bg: '#D7D0C3', ink: '#8C8475' },
  deep:  { bg: '#3A362F', ink: '#8E8678' },
  char:  { bg: '#2B2B2B', ink: '#776F62' },
}

interface PlaceholderProps {
  label: string
  tone?: Tone
  className?: string
  style?: CSSProperties
  sub?: string
  zoom?: boolean
  anchor?: 'center' | 'bottom'
}

export function Placeholder({ label, tone = 'sand', className = '', style = {}, sub, zoom = false, anchor = 'center' }: PlaceholderProps) {
  const t = TONES[tone]
  const light = tone === 'deep' || tone === 'char'

  const labelBox: CSSProperties = anchor === 'bottom'
    ? { position: 'absolute', left: 0, right: 0, bottom: 26, textAlign: 'center', padding: '0 24px', pointerEvents: 'none' }
    : { textAlign: 'center', padding: '0 24px', pointerEvents: 'none' }

  return (
    <div
      className={`oa-ph${zoom ? ' oa-ph-zoom' : ''}${className ? ' ' + className : ''}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: t.bg,
        backgroundImage: `repeating-linear-gradient(135deg, ${light ? 'rgba(255,255,255,0.018)' : 'rgba(43,43,43,0.022)'} 0 1px, transparent 1px 26px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <div style={labelBox}>
        <div className="mono" style={{ color: t.ink, opacity: 0.92 }}>{label}</div>
        {sub && <div className="mono" style={{ color: t.ink, opacity: 0.55, marginTop: 6, fontSize: 9 }}>{sub}</div>}
      </div>
      <Corner pos="tl" ink={t.ink} />
      <Corner pos="tr" ink={t.ink} />
      <Corner pos="bl" ink={t.ink} />
      <Corner pos="br" ink={t.ink} />
    </div>
  )
}

function Corner({ pos, ink }: { pos: 'tl' | 'tr' | 'bl' | 'br'; ink: string }) {
  const o = 16
  const base: CSSProperties = { position: 'absolute', width: 8, height: 8, borderColor: ink, opacity: 0.4, pointerEvents: 'none' }
  const edges = {
    tl: { top: o, left: o, borderTop: '1px solid', borderLeft: '1px solid' },
    tr: { top: o, right: o, borderTop: '1px solid', borderRight: '1px solid' },
    bl: { bottom: o, left: o, borderBottom: '1px solid', borderLeft: '1px solid' },
    br: { bottom: o, right: o, borderBottom: '1px solid', borderRight: '1px solid' },
  }
  return <span style={{ ...base, ...edges[pos] }} />
}
