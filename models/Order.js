import { Schema, models, model } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'
import { nanoid } from "nanoid";

const orderSchema = new Schema({
    id: {
        type: String,
        default: nanoid(10)
    },
    documents: [
        {
            type: Schema.ObjectId,
            ref: 'Document'
        }
    ],
    amount: Number,
    status: {
        type: String,
        enum: ['pending', 'completed', 'rejected'],
        default: 'pending'
    },
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    method: {
        type: String,
        enum: ['mtn-momo', 'orange-money'],
        default: 'mtn-momo'
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

orderSchema.plugin(uniqueValidator, {
    message: "{PATH} {VALUE} already in use, please try another!",
}); //enable beautifying on this schema

export default models ? models.Order || model('Order', orderSchema) : model('Order', orderSchema)
