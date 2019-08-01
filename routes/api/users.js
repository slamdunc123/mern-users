const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route GET api/users
// @desc Get all users
// @access Public

router.get('/', (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users));
});

// @route POST api/users
// @desc Create an user
// @access Public

router.post('/', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    role: req.body.role
  });

  newUser.save().then(user => res.json(user));
});

// @route DELETE api/users
// @desc Delete an user
// @access Public

router.delete('/:id', (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then(user => res.send(user))
    .catch(err => res.status(404).json({ success: false }));
});

// @route UPDATE api/users
// @desc Update an user
// @access Public

router.put('/:id', (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      User.findOne({ _id: req.params.id }).then(user => {
        res.json(user);
      });
    })
    // .then(user => res.send(user).then(() => res.json({ success: true })))
    // .then(console.log('update detected'))
    .catch(err => res.status(404).json({ success: false }));
});
// router.route('/:id').put((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(user => {
//       user.username = req.body.username;
//       // exercise.description = req.body.description;
//       // exercise.duration = Number(req.body.duration);
//       // exercise.date = Date.parse(req.body.date);

//       exercise
//         .save()
//         .then(() => res.json('User updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
