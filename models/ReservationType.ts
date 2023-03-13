import { ReservationType } from 'LocalTypes'
import { Schema, model, models, Model } from 'mongoose'

const ReservationTypeSchema = new Schema<ReservationType>({
  title: {
    type: String,
    required: [true, 'Vyplňte název typu rezervace']
  },
  discount: {
    type: Number,
    required: [true, 'Doplňte slevu']
  },
})

ReservationTypeSchema.virtual('id').get(function(){
  return this._id.toHexString()
})

export default (models.ReservationType as Model<ReservationType>) || model<ReservationType>('ReservationType', ReservationTypeSchema)