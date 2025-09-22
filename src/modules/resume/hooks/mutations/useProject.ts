import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { IResumeProject } from '../../interface/resume/resume.project'

export const useProject = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.PROJECT(resumeId as string), createProject)

  return { isMutating, trigger }
}

export async function createProject(url = '', { arg }: { arg: { projects: IResumeProject[] } }): Promise<string> {
  const res = await axios.put<{ data: string }>(url, arg)

  return res.data.data
}
