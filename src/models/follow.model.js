import mongoose, { Schema } from "mongoose";
import { User } from "../auth/user.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const followSchema = new Schema(
  {
    followerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    followeeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

followSchema.plugin(mongooseAggregatePaginate);

export const SocialFollow = mongoose.model("SocialFollow", followSchema);