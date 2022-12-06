const mongoose=require('mongoose')


var WeSchema = mongoose.Schema({
    Location: {
        type: {
          type: String
        },
        coordinates: [Number] 
      }
    });
WeSchema.index({Location: '2dsphere' });

module.exports=mongoose.model('location',WeSchema);