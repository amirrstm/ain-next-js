import { AppCategory } from '@/interface/AppCategory.model'

import axios from '@/lib/axios'
import ENDPOINTS from '@/lib/Endpoints'

export async function getAppCategories(url = ''): Promise<AppCategory[]> {
  try {
    const res = await axios.get<{ data: AppCategory[] }>(url, { params: { orderBy: { sort: 'DESC' } } })

    return res.data.data
  } catch (e) {
    throw e
  }
}

export const subscribeUser = async (email: string) => {
  try {
    const response = await axios.post(ENDPOINTS.USER.NEWSLETTER_SUBSCRIBE, { email })
    return response.data
  } catch (e) {
    throw e
  }
}

export const activateUserBasket = async () => {
  try {
    const response = await axios.put(ENDPOINTS.USER_ORDER.ACTIVATE, { is_active: true })
    return response.data
  } catch (e) {
    throw e
  }
}

export const declineSharedBasket = async (basket_item_ids: number[]) => {
  try {
    const response = await axios.post(ENDPOINTS.USER_ORDER.DECLINE, { basket_item_ids })
    return response.data
  } catch (e) {
    throw e
  }
}
