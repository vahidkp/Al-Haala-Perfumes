interface NoteIconProps {
  name: string
  className?: string
  size?: number
}

type NoteKey =
  | 'citrus'
  | 'pepper'
  | 'cardamom'
  | 'rose'
  | 'saffron'
  | 'oud'
  | 'amber'
  | 'musk'
  | 'vanilla'
  | 'jasmine'
  | 'lavender'
  | 'wood'
  | 'vetiver'
  | 'default'

const noteSvgs: Record<NoteKey, React.ReactNode> = {
  // Citrus — bergamot, lemon, orange
  citrus: (
    <>
      <circle cx="12" cy="13.5" r="6.5" />
      <path d="M12 7V4" />
      <path d="M12 4c1.5 0 2.5 1 3 2" />
    </>
  ),
  // Pink pepper — peppercorn cluster
  pepper: (
    <>
      <circle cx="9" cy="10.5" r="2" />
      <circle cx="15" cy="11" r="2" />
      <circle cx="11" cy="15.5" r="2" />
      <circle cx="15.5" cy="15.5" r="1.5" />
    </>
  ),
  // Cardamom — green pod
  cardamom: (
    <>
      <path d="M12 3c-3.5 4-3.5 14 0 18 3.5-4 3.5-14 0-18Z" />
      <path d="M12 5v14" />
    </>
  ),
  // Rose — spiral bud with stem
  rose: (
    <>
      <circle cx="12" cy="9" r="4.5" />
      <path d="M12 9a2 2 0 1 1 0 .01" />
      <path d="M10.5 7.5a3.2 3.2 0 0 1 3 0" />
      <path d="M12 13.5V20" />
      <path d="M9 18l3-1 3 1" />
    </>
  ),
  // Saffron — radiating threads
  saffron: (
    <>
      <circle cx="12" cy="12" r="1.2" />
      <path d="M12 11 7 6" />
      <path d="M12 11l5-5" />
      <path d="M11 12H4" />
      <path d="M13 12h7" />
      <path d="M11.5 13 8 20" />
      <path d="M12.5 13l3.5 7" />
    </>
  ),
  // Oud — stylised tree
  oud: (
    <>
      <path d="M12 21v-6" />
      <path d="M12 15c-2 0-4-1.5-4-4 1.5 0 4 0 4 4Z" />
      <path d="M12 15c2 0 4-1.5 4-4-1.5 0-4 0-4 4Z" />
      <path d="M12 11c-1.5 0-3-1-3-3 1 0 3 0 3 3Z" />
      <path d="M12 11c1.5 0 3-1 3-3-1 0-3 0-3 3Z" />
      <path d="M12 8c-1 0-2-1-2-2.5 1 0 2 .5 2 2.5Z" />
      <path d="M12 8c1 0 2-1 2-2.5-1 0-2 .5-2 2.5Z" />
    </>
  ),
  // Amber — droplet
  amber: (
    <>
      <path d="M12 3c3 4.5 6 8 6 11.5a6 6 0 0 1-12 0C6 11 9 7.5 12 3Z" />
      <path d="M9 13.5c0 1.6 1 2.8 2.4 3.2" strokeOpacity=".5" />
    </>
  ),
  // Musk — soft wisp / cloud
  musk: (
    <>
      <path d="M5 14a3.2 3.2 0 0 1 3.2-3.2c.2-2.3 2-3.8 4.3-3.8s3.9 1.5 4.3 3.6A3 3 0 0 1 19 13.5a3 3 0 0 1-3 3H8a3 3 0 0 1-3-2.5Z" />
    </>
  ),
  // Vanilla — orchid pod with seeds
  vanilla: (
    <>
      <path d="M10 4c-1.5 4-1.5 12 0 16 .5 1.2 1.2 1.6 2 1.6s1.5-.4 2-1.6c1.5-4 1.5-12 0-16C13.5 2.8 12.8 2.4 12 2.4s-1.5.4-2 1.6Z" />
      <path d="M10.8 8.5h2.4M10.8 12h2.4M10.8 15.5h2.4" strokeOpacity=".6" />
    </>
  ),
  // Jasmine — five-petal flower
  jasmine: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 10V5" />
      <path d="M12 14v5" />
      <path d="M10 12H5" />
      <path d="M14 12h5" />
      <path d="m10.5 10.5-3.2-3.2" />
      <path d="m13.5 13.5 3.2 3.2" />
      <path d="m13.5 10.5 3.2-3.2" />
      <path d="m10.5 13.5-3.2 3.2" />
    </>
  ),
  // Lavender — sprig
  lavender: (
    <>
      <path d="M12 4v7" />
      <circle cx="12" cy="6" r="1" />
      <circle cx="10" cy="8" r="1" />
      <circle cx="14" cy="8" r="1" />
      <circle cx="9" cy="10" r="1" />
      <circle cx="15" cy="10" r="1" />
      <path d="M12 12v9" />
      <path d="m9 14 3-1 3 1" strokeOpacity=".6" />
    </>
  ),
  // Sandalwood / cedar / generic wood
  wood: (
    <>
      <rect x="6" y="4" width="12" height="16" rx="1.5" />
      <path d="M9 4v16M15 4v16" strokeOpacity=".5" />
      <path d="M6 10h12M6 14h12" strokeOpacity=".35" />
    </>
  ),
  // Vetiver — tall grass
  vetiver: (
    <>
      <path d="M6 21V11" />
      <path d="M9 21V7" />
      <path d="M12 21V4" />
      <path d="M15 21V7" />
      <path d="M18 21V11" />
    </>
  ),
  // Fallback — diamond sparkle
  default: (
    <>
      <path d="m12 4 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
    </>
  ),
}

const matchers: Array<[RegExp, NoteKey]> = [
  [/(bergamot|lemon|lime|orange|citrus|mandarin|grapefruit|neroli|petitgrain)/i, 'citrus'],
  [/(pepper|peppercorn)/i, 'pepper'],
  [/(cardamom|coriander|nutmeg|clove|cinnamon|spice)/i, 'cardamom'],
  [/(rose|peony)/i, 'rose'],
  [/saffron/i, 'saffron'],
  [/(oud|agarwood|patchouli)/i, 'oud'],
  [/amber/i, 'amber'],
  [/musk/i, 'musk'],
  [/(vanilla|tonka|benzoin)/i, 'vanilla'],
  [/(jasmine|gardenia|lily|tuberose|magnolia)/i, 'jasmine'],
  [/lavender/i, 'lavender'],
  [/(sandalwood|cedar|cedarwood|wood)/i, 'wood'],
  [/(vetiver|grass)/i, 'vetiver'],
]

function getNoteKey(name: string): NoteKey {
  return matchers.find(([re]) => re.test(name))?.[1] ?? 'default'
}

export default function NoteIcon({ name, className, size = 20 }: NoteIconProps) {
  const key = getNoteKey(name)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {noteSvgs[key]}
    </svg>
  )
}
