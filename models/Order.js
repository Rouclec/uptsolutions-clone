import { Schema, models, model } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'
import { randomUUID } from "crypto";
import validator from 'validator'

const orderSchema = new Schema({
    id: {
        type: String,
        default: randomUUID()
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
    paymentMethod: {
        type: String,
        enum: ['mtn-momo', 'orange-money'],
        default: 'mtn-momo'
    },
    deliverAddress: String,
    email: {
        type: String,
        require: [true, 'Please provide a contact email for this order'],
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide a valid phone number for this order'],
        validate: [validator.isMobilePhone, 'Please enter a valid phone number']
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
