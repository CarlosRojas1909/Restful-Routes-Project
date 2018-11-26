const methodOverRide = require('method-override'),
          bodyParser = require('body-parser'),
            mongoose = require('mongoose'),
             express = require('express'),
                 app = express(),
                 port = process.env.PORT || 3000;

//Setting up my App
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(methodOverRide('_method'));

//Setting up mongoose
mongoose.connect('mongodb://localhost:27017/dogs_database', {useNewUrlParser: true});

const mySchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const MyModel = mongoose.model('Dog', mySchema); //Blog is my collection name
//======================================================================
// MyModel.create({
//     title: 'The first Dog blog',
//     image:'https://www.petmd.com/sites/default/files/over-active-dog-211592482.jpg',
//     body: 'here is the most loving dog breed ever'
// },function(err,doc){
//     if(err) {
//         console.log('someathing went wrong')
//     } else {
//         console.log(doc);
//     }
// })

//Route
app.get('/',function(req, res) {
    res.redirect('/dogs')
})

// INDEX Route
app.get('/dogs', function(req, res) {
    MyModel.find({},function(err, docs){
        if(err){
            console.log(err)
        } else {
            res.render('index', {alldogs: docs})
            
        }
    })
    
})

//NEW Route
app.get('/dogs/new', function(req, res) {
    res.render('new')

})     

//CREATE Route
app.post('/dogs',function(req, res) {
    MyModel.create(req.body.blog, function(err, doc) {
        if(err) {
            console.log('something went wrong')
        } else {
            res.redirect('/dogs')
        }
    })
})

// SHOW Route
app.get('/dogs/:id', function(req, res) {
    MyModel.findById(req.params.id, function(err, doc) {
        if(err) {
            console.log('something went wrong')
        } else {
            res.render('show', {showdog: doc})
        }
    })
    

})

//EDIT Route
app.get('/dogs/:id/edit', function(req, res) {
    MyModel.findById(req.params.id, function(err, doc) {
        if(err) {
            console.log('something went wrong')
        } else {
            res.render('edit', {editblog: doc})
        }
    })
})

// UPDATE Route
app.put('/dogs/:id?', function(req, res){
    MyModel.findByIdAndUpdate(req.params.id, req.body.editblog, function (err, doc) {
        if(err) {
            console.log('something went wrong')
        } else {
            res.redirect('/dogs/' + req.params.id)
        }
    } )
})

// DELETE Route
app.delete('/dogs/:id?', function (req, res) {
    MyModel.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log('something went wrong')
        } else {
            res.redirect('/dogs')
        }
    }) 
})

//Port Listen
app.listen(port, function(req, res){
    console.log('Server has started!')
})


             
