import type React from 'react'

const Loader: React.FC = () => {
  return (
    <svg preserveAspectRatio="xMidYMid" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle
          cx="50"
          cy="50"
          fill="none"
          r="32"
          stroke="#b488fc"
          strokeDasharray="50.26548245743669 50.26548245743669"
          strokeLinecap="round"
          strokeWidth="8"
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            type="rotate"
            values="0 50 50;360 50 50"
          ></animateTransform>
        </circle>
        <circle
          cx="50"
          cy="50"
          fill="none"
          r="23"
          stroke="#d5c4f1"
          strokeDasharray="36.12831551628262 36.12831551628262"
          strokeDashoffset="36.12831551628262"
          strokeLinecap="round"
          strokeWidth="8"
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            type="rotate"
            values="0 50 50;-360 50 50"
          ></animateTransform>
        </circle>
        <g></g>
      </g>
    </svg>
  )
}

export default Loader
