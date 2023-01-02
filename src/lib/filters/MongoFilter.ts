import { Types } from 'mongoose'

class MongoFilter {
  constructor(private readonly key: string, private readonly value: any) {}

  public getFilter() {
    const { key, value } = this
    
    if (key === 'id') {
      const covertedValue = Array.isArray(value) ? value.map(MongoFilter.getId) : MongoFilter.getId(value)

      return { _id: this.getValue(covertedValue) }
    }

    return { [key]: this.getValue(value) }
  }

  public static getId(value: string) {
    return new Types.ObjectId(value)
  }

  private getValue(value: any) {
    if (typeof value === 'string') {
      return { $regex: value, $options: 'i' }
    }
    
    if (Array.isArray(value)) {
      return { $in: value }
    }

    return value
  }
}

export default MongoFilter
