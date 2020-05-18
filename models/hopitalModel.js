const mongoose =require ('mongoose');

const hopitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  tel: { type: String, required: true },
  lits: { type: Number, default: 0, required: true },
  adresse: { type: String, required: true },
  dispo: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
 
});

const HopitalModel = mongoose.model("Hopital", hopitalSchema);

module.exports= HopitalModel;