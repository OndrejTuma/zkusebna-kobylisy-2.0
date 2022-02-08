import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vyplňte název kategorie']
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }
})

CategorySchema.virtual('id').get(function(){
  return this._id.toHexString()
})

export default mongoose.models.Category || mongoose.model('Category', CategorySchema)