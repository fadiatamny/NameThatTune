const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
    .connect(url, options)
    .then(db => console.log(`conncted to: ${db.connection.name}`))
    .catch(err => console.log(`connection error:`, err))

let song = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    vid: {
        type: String,
        required: true
    }
});

let playlist = new mongoose.Schema({
    id : {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    songs: [song]
}, {
    timestamps: true,
});

playlist.static('getPlaylists', async function () {
    return await this.find({}, (err, res) => {
        if (err) throw err;
    });
});

playlist.static('getPlaylist', async function (id) {
    return await this.find({id: id}, (err, res) => {
        if (err) throw err;
    });
});

playlist.static('deletePlaylist', async function (id) {
    return await this.deleteOne({ _id: id }, (err) => {
        if (err) throw err;
    });
});

playlist.static('updatePlaylist', async function (obj) {
    return await this.updateOne({ _id: obj._id }, obj);
});

playlist.method('exists', async function () {
    return await this.model('Playlist').find({id:this.id},(err, res)=>{
        if(err) throw err;
    })
});

let PlaylistModel = mongoose.model('Playlist', playlist);
let SongModel = mongoose.model('Song',song);

module.exports = {PlaylistModel, SongModel};