const mongoose=require ('mongoose');


const reservedSchema = {
  reservedMethod: { type: String, required: true }
};

const reservationItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  lits: { type: String, required: true },
  hopital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hopital',
    required: true
  },
});

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reservationItems: [reservationItemSchema],
  reserved: reservedSchema,

  totallits: { type: Number },
  isCheked: { type: Boolean, default: false },
  chekedAt: { type: Date },
  liveredAt: { type: Date },
}, {
  timestamps: true
});

const reservationModel = mongoose.model("reservation", reservationSchema);
module.exports= reservationModel;