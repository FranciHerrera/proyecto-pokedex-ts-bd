import type { Model } from 'mongoose'

export type Kind = {
  id?: string
  kind: string
}

export type KindModel = Model<Kind>
