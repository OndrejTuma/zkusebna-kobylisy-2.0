import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
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
    type: String,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Položka musí patřit do kategorie'],
  },
})

ItemSchema.virtual('id').get(function(){
  return this._id.toHexString()
})

export default mongoose.models.Item || mongoose.model('Item', ItemSchema)