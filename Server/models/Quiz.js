const mongoose = require('mongoose');



const quizSchema = new mongoose.Schema({
  
    quizName: String,
    quizType: String,
    createdAt: { type: Date, default: Date.now },
    questions: [{
        text: String,
        options: [String],
        correctOptionIndex: Number
    }],
    status: {
        type: String,
        enum: ['draft', 'live', 'expired'],
        default: 'draft'
      },
    timer: Number,
    impressions: { type: Number, default: 0 }
},


);

module.exports = mongoose.model('Quiz', quizSchema);
