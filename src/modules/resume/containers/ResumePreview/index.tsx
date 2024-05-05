'use client'

import { useParams } from 'next/navigation'

import React from 'react'

const ResumePreviewContainer: React.FC = () => {
  const { resumeId } = useParams()

  return (
    <div className="flex items-center justify-center p-10">
      <div className="bg-white rounded-md overflow-hidden py-10">
        <iframe
          referrerPolicy="no-referrer"
          className="w-[816px] h-[1056px]"
          src={`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/public/resume/${resumeId}`}
        />
      </div>
    </div>
  )
}

export default ResumePreviewContainer
