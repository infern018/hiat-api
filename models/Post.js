const mongoose = require('mongoose');


const PostSchema  = mongoose.Schema({
    Code : {
        type: String,
        default:''
    },
    Sex : {
        type: String,
        default:''
    },
    Age : {
        type: String,
        default:''
    },
    BodyWeight : {
        type: String,
        default:null
    },
    BrainWeight : {
        type: String,
        default:null
    },
    Parts : {
        type: String,
        default:''
    },
    Staining : {
        type: String,
        default:''
    },
    SectionThickness : {
        type: String,
        default:null
    },
    PlaneOfSectioning : {
        type: String,
        default:''
    },
    Distance : {
        type: String,
        default:null
    }
});

module.exports = mongoose.model('Posts', PostSchema);