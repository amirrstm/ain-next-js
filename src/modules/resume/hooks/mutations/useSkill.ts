import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { IResumeSkill } from '../../interface/resume/resume.skill'

export const useSkill = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.SKILL(resumeId as string), createSkill)

  return { isMutating, trigger }
}

export async function createSkill(url = '', { arg }: { arg: { skills: IResumeSkill[] } }): Promise<string> {
  const res = await axios.put<{ data: string }>(url, arg)

  return res.data.data
}
