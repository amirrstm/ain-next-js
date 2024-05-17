'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { generateImage } from '../service'

const ImageGenerationContainer: React.FC = () => {
  const [prompt, setPrompt] = useState('')

  const onGenerateImage = () => {
    generateImage(prompt).then(data => {
      console.log(data)
    })
  }

  return (
    <div>
      <Input placeholder="Enter prompt" value={prompt} onChange={e => setPrompt(e.target.value)} />

      <Button onClick={onGenerateImage}>Generate</Button>
    </div>
  )
}

export default ImageGenerationContainer
