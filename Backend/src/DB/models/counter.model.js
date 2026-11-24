import { model, Schema } from "mongoose";

const counterSchema = new Schema({
    _id: String,
    sequence: {
        type: Number,
        default: 0
    }
});

const CounterModel = model("Counter", counterSchema);

export default CounterModel