import mongoose from "mongoose";

const { Schema } = mongoose;

const problemSchema = new Schema({
      title:{
        type:String,
        require:true
      },
      description:{
        type:String,
        require:true
      },
      difficulty:{
        type:String,
        enums:['easy','medium','hard']
      },
      tags:{
        type:String,
        enums:['array','linkedList','graph','dp'],
        require:true
      },
      visibleTestCases:[{
        input:{
            type:String,
            required:true
        },
        output:{
            type:String,
            required:true
        },
        explanation:{
            type:String,
            required:true
        }}],
     hiddentTestCases:[{
             input:{
            type:String,
            required:true
        },
        output:{
            type:String,
            required:true
        }}],
        startCode:[
            {
                language:{
                    type:String,
                    required:true
                },
                initialCode:{
                    type:String,
                    required:true
                }}],

       problemCreator:{
          type:Schema.Types.ObjectId,
          ref:'user',
          required:true
       },
       referenceSolution:[{
        language:{
            type:String,
            required:true
        },
        completeCode:{
            type:String,
            required:true
        }
       }]        
        

})

const problem = mongoose.model('problem',problemSchema);
export default problem;