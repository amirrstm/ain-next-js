import React from 'react'

const Loader: React.FC = () => {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle
          strokeLinecap="round"
          fill="none"
          strokeDasharray="50.26548245743669 50.26548245743669"
          stroke="#b488fc"
          strokeWidth="8"
          r="32"
          cy="50"
          cx="50"
        >
          <animateTransform
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            repeatCount="indefinite"
            dur="1s"
            type="rotate"
            attributeName="transform"
          ></animateTransform>
        </circle>
        <circle
          strokeLinecap="round"
          fill="none"
          strokeDashoffset="36.12831551628262"
          strokeDasharray="36.12831551628262 36.12831551628262"
          stroke="#d5c4f1"
          strokeWidth="8"
          r="23"
          cy="50"
          cx="50"
        >
          <animateTransform
            values="0 50 50;-360 50 50"
            keyTimes="0;1"
            repeatCount="indefinite"
            dur="1s"
            type="rotate"
            attributeName="transform"
          ></animateTransform>
        </circle>
        <g></g>
      </g>
    </svg>
  )
}

export default Loader
