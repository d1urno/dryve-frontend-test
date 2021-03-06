export interface Car {
  evaluation_type: string
  version_uuid: string
  mileage: number
  model_year: number
  name: string
  transmission_type: string
  fuel_type: string
  vehicle_uuid: string
  model_name: string
  manufacturing_year: number
  version_name: string
  image: string
  brand_name: string
  ad_selling_price: number
  model_uuid: string
  brand_uuid: string
}

export interface Client {
  [key: string]: string | number
  id: number
  name: string
  last_name: string
  status: string
  email: string
  phone: string
  extra_phone: string
  cep: string
  avenue: string
  number: string
  complement: string
  neighbourhood: string
  city: string
  state: string
}

export interface Intention {
  id: number
  name: string
  quantity: number
  image: string
  hq: string
}
