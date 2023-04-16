import React from 'react'

const Loading = () => {
  return (
    <svg
    width={34}
    height={34}
    viewBox="-1.76 -1.76 19.52 19.52"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="mx-auto my-auto  hds-flight-icon--animation-loading"
    stroke="#000"
    strokeWidth={0}
  >
    <g fill="#000" fillRule="evenodd" clipRule="evenodd" stroke="none">
      <path
        d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
        opacity={0.2}
      />
      <path d="M7.25.75A.75.75 0 0 1 8 0a8 8 0 0 1 8 8 .75.75 0 0 1-1.5 0A6.5 6.5 0 0 0 8 1.5a.75.75 0 0 1-.75-.75z" />
    </g>
  </svg>
  )
}

export default Loading
