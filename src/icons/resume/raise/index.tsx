import React from 'react'

const IconRaise: React.FC = () => {
  return (
    <svg width="212" height="78" viewBox="0 0 212 78" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.99934 63L210.999 63" stroke="url(#paint0_linear_16_450)" />
      <path
        d="M1 75C5.5 74 49.5 78 117 60C171.125 45.5667 207.501 3 211 3"
        stroke="url(#paint1_linear_16_450)"
        strokeWidth="5"
      />
      <circle cx="105.5" cy="62.5" r="9.5" fill="hsl(var(--primary))" />
      <defs>
        <linearGradient
          id="paint0_linear_16_450"
          x1="1.99934"
          y1="63.5"
          x2="210.999"
          y2="63.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#141414" />
          <stop offset="0.495" stopColor="#363636" />
          <stop offset="1" stopColor="#141414" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_16_450"
          x1="211"
          y1="3.50004"
          x2="9.00001"
          y2="114.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#141414" />
          <stop offset="0.3" stopColor="#FEDAB0" />
          <stop offset="0.699338" stopColor="hsl(var(--primary))" />
          <stop offset="0.995" stopColor="#141414" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default IconRaise
