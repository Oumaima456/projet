const express =require ('express');
const Hopital =require ('../models/hopitalModel');
const { isAuth, isAdmin } =require ('../util');

const router = express.Router();

router.get("/", async (req, res) => {
  const adresse = req.query.adresse ? { adresse: req.query.adresse } : {};
  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {};
 
  const hopitals = await Hopital.find({ ...adresse, ...searchKeyword });
  res.send(hopitals);
});

router.get("/:id", async (req, res) => {
  const hopital = await Hopital.findOne({ _id: req.params.id });
  if (hopital) {
    res.send(hopital);
  } else {
    res.status(404).send({ message: "hopital Not Found." });
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const hopitalId = req.params.id;
  const hopital = await Hopital.findById(hopitalId);
  if (hopital) {
    hopital.name = req.body.name;
    hopital.lits = req.body.lits;
    hopital.image = req.body.image;
    hopital.tel = req.body.tel;
    hopital.adresse = req.body.adresse;
    hopital.dispo = req.body.dispo;
    hopital.description = req.body.description;
    const updatedhopital = await hopital.save();
    if (updatedhopital) {
      return res.status(200).send({ message: 'hopital Updated', data: updatedhopital });
    }
  }
  return res.status(500).send({ message: ' Error in Updating hopital.' });

});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedhopital = await Hopital.findById(req.params.id);
  if (deletedhopital) {
    await deletedhopital.remove();
    res.send({ message: "hopital Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
});


router.post("/", isAuth, isAdmin, async (req, res) => {
  const hopital = new Hopital({
    name: req.body.name,
    lits: req.body.lits,
    image: req.body.image,
    tel: req.body.tel,
    adresse: req.body.adresse,
    dispo: req.body.dispo,
    description: req.body.description,
    
  });
  const newhopital = await hopital.save();
  if (newhopital) {
    return res.status(201).send({ message: 'New hopital Created', data: newhopital });
  }
  return res.status(500).send({ message: ' Error in Creating hopital.' });
})


module.exports= router;