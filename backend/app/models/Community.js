import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // which user added it
    },
    title: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String },
    content: { type: String, required: true },
    images: [String],
    likes: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }],
    comments: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      text: { type: String, required: true },
      author: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }],
    shares: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Community", communitySchema);
