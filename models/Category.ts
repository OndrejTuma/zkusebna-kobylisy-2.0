import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vyplňte název kategorie']
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    // if category does not have a parent, we return empty string, but keep null in database
    transform: (v: any) => v == null ? '' : v
  }
})

CategorySchema.virtual('id').get(function(){
  return this._id.toHexString()
})

export default mongoose.models.Category || mongoose.model('Category', CategorySchema)