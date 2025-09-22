'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { generateImage } from '../service'

import type React from 'react'

const ImageGenerationContainer: React.FC = () => {
  const [prompt, setPrompt] = useState('')

  const onGenerateImage = () => {
    generateImage(prompt).then((data) => {
      console.log(data)
    })
  }

  return (
    <div>
      <Input onChange={(e) => setPrompt(e.target.value)} placeholder="Enter prompt" value={prompt} />

      <Button onClick={onGenerateImage}>Generate</Button>
    </div>
  )
}

export default ImageGenerationContainer
