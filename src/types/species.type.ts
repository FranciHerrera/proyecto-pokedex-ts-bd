import type { Model } from 'mongoose'

export type Species = {
  id?: string
  name: string
  description: string
  kind: string
  danger: number
  speed: number
}

export type SpeciesModel = Model<Species>
