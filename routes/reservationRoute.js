const express =require ('express');
const reservation =require ('../models/reservationModel');
const { isAuth, isAdmin } =require ('../util');

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const reservations = await reservation.find({}).populate('user');
  res.send(reservations);
});
router.get("/mine", isAuth, async (req, res) => {
  const reservations = await reservation.find({ user: req.user._id });
  res.send(reservations);
});

router.get("/:id", isAuth, async (req, res) => {
  const reservation = await reservation.findOne({ _id: req.params.id });
  if (reservation) {
    res.send(reservation);
  } else {
    res.status(404).send("reservation Not Found.")
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const reservation = await reservation.findOne({ _id: req.params.id });
  if (reservation) {
    const deletedreservation = await reservation.remove();
    res.send(deletedreservation);
  } else {
    res.status(404).send("reservation Not Found.")
  }
});

router.post("/", isAuth, async (req, res) => {
  const newreservation = new reservation({
    reservationItems: req.body.reservationItems,
    user: req.user._id,
    totallits: req.body.totallits,
  });
  const newreservationCreated = await newreservation.save();
  res.status(201).send({ message: "New reservation Created", data: newreservationCreated });
});

router.put("/:id/check", isAuth, async (req, res) => {
  const reservation = await reservation.findById(req.params.id);
  if (reservation) {
    reservation.isChecked = true;
    reservation.checkedAt = Date.now();
    reservation.reserved = {
      reservedResult: {
        doctorID: req.body.doctorID,
        reservationID: req.body.reservationID,
        reservedID: req.body.reservedID
      }
    }
    const updatedreservation = await reservation.save();
    res.send({ message: 'reservation checked.', reservation: updatedreservation });
  } else {
    res.status(404).send({ message: 'reservation not found.' })
  }
});

module.exports= router;