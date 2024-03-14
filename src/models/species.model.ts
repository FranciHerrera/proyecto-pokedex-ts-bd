import { Schema, model } from 'mongoose'
import { Species, SpeciesModel } from '../types/species.type'
import { KIND_REFERENCE } from './kind.model'

export const SPECIES_REFERENCE = 'Species'

const Species = new Schema<Species, SpeciesModel>({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  kind: {
    type: Schema.Types.ObjectId,
    ref: KIND_REFERENCE
  },
  danger: {
    type: Number,
    required: true,
    trim: true
  },
  speed: {
    type: Number,
    required: true,
    trim: true
  }
})

export default model(SPECIES_REFERENCE, Species)
