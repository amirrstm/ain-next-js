export interface Province {
  name: string
  _id: string
  cities: City[]
  latitude: number
  longitude: number
}

export interface City {
  name: string
  latitude: number
  longitude: number
}
