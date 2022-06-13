import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const WarningSchema = new Schema(
    {
        type: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        label: {
            type: String,
            lowercase: true,
            trim: true,
            unique: false,
        },
    },
    {
        collection: 'warnings',
    },
);

WarningSchema.plugin(timestamps);

WarningSchema.index({ createdAt: 1, updatedAt: 1 });

export const Warning = mongoose.model('Warning', WarningSchema);
export const WarningTC = composeWithMongoose(Warning);
