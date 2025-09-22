import useSWR from 'swr'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { ResponseModel } from '@/interface/General.model'
import type { DashboardStat } from '../interface'

function useDashboard(enabled?: boolean) {
  const { data, isLoading, mutate } = useSWR(!enabled ? undefined : API.DASHBOARD.HISTORY, getDashboard)

  return { data, isLoading, mutate }
}

export default useDashboard

export async function getDashboard(url = ''): Promise<DashboardStat[]> {
  const res = await axios.get<ResponseModel<DashboardStat[]>>(url)

  return res.data.data
}
