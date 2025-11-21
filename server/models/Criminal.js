import mongoose from 'mongoose';

const CriminalSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [10, 'Age must be at least 10'],
    max: [120, 'Age must not exceed 120'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other'],
  },
  crimeType: {
    type: String,
    required: [true, 'Crime type is required'],
    enum: ['Theft', 'Assault', 'Fraud', 'Homicide', 'Other'],
  },
  status: {
    type: String,
    enum: ['Wanted', 'In Custody', 'Released'],
    default: 'In Custody',
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  dateArrested: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    validate: {
      validator: function (v) {
        if (!v) return true; // Allow empty imageUrl
        // Accept both URLs and Base64 encoded images
        return /^(https?:\/\/.+|data:image\/[a-zA-Z]+;base64,.+)/.test(v);
      },
      message: 'Image must be a valid URL or Base64 encoded data',
    },
  },
}, { timestamps: true });

export default mongoose.model('Criminal', CriminalSchema);
