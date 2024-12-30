import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: {
        type: String,
        default: "user",
        enum: ["user", "admin"], // Only allow specific roles
      },
      cartData: {
        type: [
          {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true },
          },
        ],
        default: [],
      },
    },
    { minimize: false }
  );

const userModel =mongoose.user || mongoose.model("user",userSchema);
export default userModel;