import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    fileurl: {
        type: String,
        required: true
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true });

const fileModel = mongoose.model("File", fileSchema);
export default fileModel;
