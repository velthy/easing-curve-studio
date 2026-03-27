interface RalphWiggumProps {
  style?: React.CSSProperties
}

export function RalphWiggum({ style }: RalphWiggumProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {/* Ears */}
      <ellipse cx="5" cy="27" rx="4.5" ry="5.5" fill="#FED90F" stroke="#1a0a00" strokeWidth="1.2" />
      <ellipse cx="43" cy="27" rx="4.5" ry="5.5" fill="#FED90F" stroke="#1a0a00" strokeWidth="1.2" />

      {/* Head */}
      <circle cx="24" cy="27" r="20" fill="#FED90F" stroke="#1a0a00" strokeWidth="1.5" />

      {/* Hair */}
      <path
        d="M13 11 Q14 5 17 9 Q18 3 21 7 Q22 2 24 6 Q26 2 28 7 Q30 3 31 9 Q34 5 35 11"
        fill="#C8943A"
        stroke="#1a0a00"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Left eye */}
      <ellipse cx="17" cy="22" rx="5.5" ry="6" fill="white" stroke="#1a0a00" strokeWidth="1" />
      <circle cx="17.5" cy="22.5" r="3.5" fill="#6699CC" />
      <circle cx="17.5" cy="22.5" r="2" fill="#1a1a2e" />
      <circle cx="16.5" cy="21" r="1" fill="white" />

      {/* Right eye */}
      <ellipse cx="31" cy="22" rx="5.5" ry="6" fill="white" stroke="#1a0a00" strokeWidth="1" />
      <circle cx="31.5" cy="22.5" r="3.5" fill="#6699CC" />
      <circle cx="31.5" cy="22.5" r="2" fill="#1a1a2e" />
      <circle cx="30.5" cy="21" r="1" fill="white" />

      {/* Nose */}
      <ellipse cx="24" cy="29" rx="2.5" ry="2" fill="#E8B000" stroke="#1a0a00" strokeWidth="0.7" />
      <circle cx="23" cy="29.5" r="0.7" fill="#B88000" />
      <circle cx="25" cy="29.5" r="0.7" fill="#B88000" />

      {/* Mouth */}
      <path
        d="M17 34 Q24 39.5 31 34"
        stroke="#1a0a00"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Teeth */}
      <path
        d="M19 34.2 Q24 37 29 34.2 L29 33.5 Q24 33.5 19 33.5 Z"
        fill="white"
        stroke="#1a0a00"
        strokeWidth="0.5"
      />

      {/* Cheeks */}
      <ellipse cx="10" cy="32" rx="3.5" ry="2" fill="#FF9999" opacity="0.45" />
      <ellipse cx="38" cy="32" rx="3.5" ry="2" fill="#FF9999" opacity="0.45" />
    </svg>
  )
}
