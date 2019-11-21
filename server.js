const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
mongoose.connect("mongodb://localhost/thingsDB", { useNewUrlParser: true })

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const Schema = mongoose.Schema
const thingSchema = new Schema({
    text: String
})
const Thing = mongoose.model('Things', thingSchema)

app.get('/things', function(req, res) {
    Thing.find({}, function(err, things) {
        res.send(things)
    })
})

app.post('/thing', async function(req, res) {
    let thing = new Thing(req.body)
    await thing.save()
    res.end()
})

app.listen(3000, () => {console.log('running')})