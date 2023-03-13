import { ReservationItem } from 'LocalTypes'
import { Schema, model, models, Model } from 'mongoose'

const ItemSchema = new Schema<ReservationItem>({
  title: {
    type: String,
    required: [true, 'Vyplňte název položky']
  },
  code: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: [true, 'Vyplňte cenu položky'],
  },
  active: {
    type: Boolean,
  },
  image: {
    type: Schema.Types.Mixed,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Položka musí patřit do kategorie'],
  },
})

ItemSchema.virtual('id').get(function(){
  return this._id.toHexString()
})

export default (models.Item as Model<ReservationItem>) || model<ReservationItem>('Item', ItemSchema)