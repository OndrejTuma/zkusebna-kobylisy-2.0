import mongoose from 'mongoose'

const GoogleCalendarSchema = new mongoose.Schema({
  refresh_token: {
    type: String,
    required: [true, 'Please provide a refresh token'],
  },
  calendar_id: {
    type: String,
    required: false,
  }
})

export default mongoose.models.GoogleCalendar || mongoose.model('GoogleCalendar', GoogleCalendarSchema)