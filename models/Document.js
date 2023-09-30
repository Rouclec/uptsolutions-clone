import { Schema, models, model } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'
import { randomUUID } from "crypto";

const documentSchema = new Schema({
    id: {
        type: String,
        default: randomUUID()
    },
    name: {
        type: String,
        required: [true, "Please enter the document name"],
    },
    pages: {
        type: String,
        default: 'All',
        // enum: ['', 'All', 'Some pages']
    },
    coverPage: {
        type: String,
        default: 'Normal',
        enum: ['', 'Normal', 'Hard page']
    },
    paperType: {
        type: String,
        default: 'Normal',
        enum: ['', 'Normal', 'Glossy']
    },
    paperSize: {
        type: String,
        default: 'A4',
        enum: ['', 'A4', 'A3', 'A5']
    },
    numberOfCopies: {
        type: Number,
        default: 1
    },
    orientation: {
        type: String,
        default: 'Potrait',
        enum: ['', 'Landscape', 'Potrait']
    },
    printSides: {
        type: String,
        deafult: 'Recto',
        enum: ['', 'Recto', 'Recto Veso']
    },
    printColor: {
        type: Boolean,
        default: false
    },
    amount: Number,
    pagesPerSheet: {
        type: Number,
        default: 1,
    },
    printingType: {
        type: String,
        default: 'Plain',
    },
    bindingType: {
        type: String,
        default: "No binding",
        enum: ['', 'No binding', 'Spiral', 'Slide binding', 'Normal gum', 'Hard gum']
    },
    description: {
        type: String
    },
    file: {
        type: String,
        required: [true, 'Please select a file for this document']
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'paid', 'printed']
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
});

documentSchema.plugin(uniqueValidator, {
    message: "{PATH} {VALUE} already in use, please try another!",
}); //enable beautifying on this schema

export default models ? models.Document || model('Document', documentSchema) : model('Document', documentSchema)
