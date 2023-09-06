import { Schema, models, model } from "mongoose";
import slugify from 'slugify';
import uniqueValidator from 'mongoose-unique-validator'

const roleSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this role"],
        unique: true,
    },
    code: {
        type: String,
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: "User",
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
}, {
    timestamps: true
});

roleSchema.plugin(uniqueValidator, {
    message: "{PATH} {VALUE} already in use, please try another!",
}); //enable beautifying on this schema

roleSchema.pre("save", function (next) {
    this.code = slugify(this.name, { lower: true });
    next();
});

export default models ? models.Role || model('Role', roleSchema) : model('Role', roleSchema)
