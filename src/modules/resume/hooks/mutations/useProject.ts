import { useParams } from 'next/navigation'

import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumeProject } from '../../interface/resume/resume.project'

export const useProject = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.PROJECT(resumeId as string), createProject)

  return { trigger, isMutating }
}

export async function createProject(url = '', { arg }: { arg: { projects: IResumeProject[] } }): Promise<string> {
  try {
    const res = await axios.put<{ data: string }>(url, arg)

    return res.data.data
  } catch (e) {
    throw e
  }
}
