import { CategoryItem } from 'LocalTypes'
import { Schema, model, models } from 'mongoose'

const CategorySchema = new Schema<CategoryItem>({
  title: {
    type: String,
    required: [true, 'Vyplňte název kategorie']
  },
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    // if category does not have a parent, we return empty string, but keep null in database
    transform: (v: CategoryItem) => v == null ? '' : v
  }
})

CategorySchema.virtual('id').get(function(){
  return this._id.toHexString()
})

export default models.Category || model<CategoryItem>('Category', CategorySchema)