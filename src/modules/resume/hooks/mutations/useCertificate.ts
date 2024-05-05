import { useParams } from 'next/navigation'

import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumeCertificate } from '../../interface/resume/resume.certificate'

export const useCertificate = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.CERTIFICATE(resumeId as string), createCertificate)

  return { trigger, isMutating }
}

export async function createCertificate(
  url = '',
  { arg }: { arg: { certificates: IResumeCertificate[] } },
): Promise<string> {
  try {
    const res = await axios.put<{ data: string }>(url, arg)

    return res.data.data
  } catch (e) {
    throw e
  }
}
