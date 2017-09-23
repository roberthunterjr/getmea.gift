const router = require('express').Router();
const User = require('../../app/models/user');
const List = require('../../app/models/list')
const Item = require('../../app/models/item')
const bodyParser = require('body-parser');




router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// router.get('/', (req, res) => {
//   res.send('API Server');
// });
//
// router.get('/hello', (req, res) => {
//   res.send({
//     name: 'World'
//   });
// });

//get all users
router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    res.send({users})
  })
})

//create a new user when user signs up
router.post('/signup', (req, res) => {
  console.log(req.body)
  var username = req.body.username;
  var password = req.body.password;

  //check to see if username is in database
  User.findOne({username: username})
  .exec(function (err, user) {
    //if not, create a new user and save into db
    if(!user) {
      var newUser = new User({
        username: username,
        password: password
      })
      newUser.save(function (err, newUser) {
        if (err) {
          res.status(500).send(err)
        } else {
          res.send({newUser})
        }
      })
      //else tell the user the account already exists
    } else {
        console.log('Account already exists');
        res.redirect('/');
      }
  })
})

//get all the lists from the user
router.get('/:user/list', (req, res) => {
  List.find().exec((err, lists) => {
    res.send({lists})
  })
})

router.post('/:user/list', (req, res) => {
  console.log(req.body)
  var title = req.body.title;
  var secret = req.body.secret;

  List.findOne({title: title})
  .exec(function (err, list) {
    var newList = new List({
      title: title,
      secret: secret
    })
    newList.save(function (err, newList) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send({newList})
      }
    })
  })
})

//get all items in list from user
router.get('/:user/:list/item', (req, res) => {
  Item.find().exec((err, items) => {
    res.send({items})
  })
})

//add an item to the list (specific to the user)
router.post('/:user/:list/item', (req, res) => {
  var title = req.body.title;
  var price = req.body.price;
  var comments = req.body.comments;
  var url = req.body.url;
  var imageUrl = req.body.secret;
  var timestamp = req.body.timestamp;
  var purchased = req.body.purchased;

  Item.findOne({title: title})
  .exec(function (err, item) {
    var newItem = new Item({
      title: title,
      price: price,
      comments: comments,
      url: url,
      image_url: imageUrl
    })
    newItem.save(function (err, newItem) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send({newItem})
      }
    })

  })
})


module.exports = router;
