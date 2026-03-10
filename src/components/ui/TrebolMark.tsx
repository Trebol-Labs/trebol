interface TrebolMarkProps {
  color?: string
  size?: number | string
  className?: string
}

export default function TrebolMark({
  color = 'var(--sage)',
  size = 34,
  className,
}: TrebolMarkProps) {
  return (
    <svg
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {/* stem */}
      <line
        x1="50" y1="68" x2="50" y2="49"
        stroke={color} strokeWidth="2.6" strokeLinecap="round"
      />
      {/* top petal */}
      <path
        d="M50 48 C46 36 36 30 32 38 C28 47 38 54 50 48Z"
        fill="none" stroke={color} strokeWidth="2.4"
      />
      {/* right petal */}
      <path
        d="M50 48 C62 44 70 34 64 28 C58 22 50 34 50 48Z"
        fill="none" stroke={color} strokeWidth="2.4"
      />
      {/* bottom petal */}
      <path
        d="M50 48 C54 60 64 66 68 58 C72 50 62 43 50 48Z"
        fill="none" stroke={color} strokeWidth="2.4"
      />
      {/* left petal */}
      <path
        d="M50 48 C38 52 30 62 36 68 C42 74 50 62 50 48Z"
        fill="none" stroke={color} strokeWidth="2.4"
      />
      {/* center veins */}
      <line x1="50" y1="48" x2="36" y2="39" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity=".55"/>
      <line x1="50" y1="48" x2="62" y2="30" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity=".55"/>
      <line x1="50" y1="48" x2="64" y2="57" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity=".55"/>
      <line x1="50" y1="48" x2="37" y2="65" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity=".55"/>
      {/* robot head */}
      <rect x="24" y="67" width="52" height="44" rx="9" ry="9" fill="none" stroke={color} strokeWidth="2.7"/>
      {/* ears */}
      <rect x="13" y="78" width="11" height="15" rx="3" fill="none" stroke={color} strokeWidth="2.3"/>
      <rect x="76" y="78" width="11" height="15" rx="3" fill="none" stroke={color} strokeWidth="2.3"/>
      {/* eyes */}
      <circle cx="38" cy="83" r="6" fill="none" stroke={color} strokeWidth="2.3"/>
      <circle cx="62" cy="83" r="6" fill="none" stroke={color} strokeWidth="2.3"/>
      {/* mouth */}
      <rect x="39" y="97" width="22" height="6" rx="2" fill="none" stroke={color} strokeWidth="2.1"/>
    </svg>
  )
}
