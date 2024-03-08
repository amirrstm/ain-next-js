import useSWRInfinite from 'swr/infinite'

import { ResponseModel } from '@/interface/General.model'

import axios from '@/lib/axios'
import ENDPOINTS from '@/lib/Endpoints'

import { IHistory } from '../interface'

const getKey = (pageIndex: number, previous: ResponseModel<IHistory[]>) =>
  previous && previous._metadata.pagination.totalPage === previous._metadata.pagination.page
    ? null
    : ENDPOINTS.HISTORY.GET(pageIndex + 1)

function useHistory() {
  return useSWRInfinite(getKey, getHistory, { revalidateOnFocus: false })
}

export default useHistory

export async function getHistory(url = ''): Promise<ResponseModel<IHistory[]>> {
  try {
    const res = await axios.get<ResponseModel<IHistory[]>>(url)

    return res.data
  } catch (e) {
    throw e
  }
}
