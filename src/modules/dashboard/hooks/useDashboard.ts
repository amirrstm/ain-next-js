import useSWR from 'swr'

import { ResponseModel } from '@/interface/General.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { DashboardStat } from '../interface'

function useDashboard(enabled?: boolean) {
  const { data, isLoading, mutate } = useSWR(!enabled ? undefined : API.DASHBOARD.HISTORY, getDashboard)

  return { data, mutate, isLoading }
}

export default useDashboard

export async function getDashboard(url = ''): Promise<DashboardStat[]> {
  try {
    const res = await axios.get<ResponseModel<DashboardStat[]>>(url)

    return res.data.data
  } catch (e) {
    throw e
  }
}
