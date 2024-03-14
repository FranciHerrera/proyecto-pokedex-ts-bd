import { Schema, model } from 'mongoose'
import { Kind, KindModel } from '../types/kind.type'

export const KIND_REFERENCE = 'Kind'

const Kind = new Schema<Kind, KindModel>({
  kind: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  }
})

export default model(KIND_REFERENCE, Kind)
