import mongoose from 'mongoose'

const ReservationTypeSchema = new mongoose.Schema({
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

export default mongoose.models.ReservationType || mongoose.model('ReservationType', ReservationTypeSchema)