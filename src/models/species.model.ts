import { Schema, model } from 'mongoose'
import { Species, SpeciesModel } from '../types/species.type'

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
    type: String,
    required: true,
    trim: true
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

export default model('Species', Species)
