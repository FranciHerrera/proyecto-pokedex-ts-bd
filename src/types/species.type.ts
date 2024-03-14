import type { Model } from 'mongoose'
import { Kind, KindModel } from './kind.type'

export type Species = {
  id?: string
  name: string
  description: string
  kind: Kind
  danger: number
  speed: number
}

export type SpeciesModel = Model<Species>
