import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
  refresh_token: {
    type: String,
    required: [true, 'Please provide a refresh token'],
  },
  access_token: {
    type: String,
    required: [true, 'Please provide a refresh token'],
  }
})

export default mongoose.models.Token || mongoose.model('Token', TokenSchema)