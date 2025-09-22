import API from '@/lib/api'
import axios from '@/lib/axios'

export async function generateImage(prompt: string): Promise<string> {
  const res = await axios.post(API.IMAGE.GENERATE, { prompt })

  return res.data.data
}
