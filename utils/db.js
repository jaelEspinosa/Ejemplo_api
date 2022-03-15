const mongoose = require('mongoose');

const urlDb = `mongodb+srv://jaelespinosa:66846684Ant@cluster0.cjzw5.mongodb.net/movies?retryWrites=true&w=majority`
const connect = async ()=>{
    try{
        await mongoose.connect(urlDb, {useNewUrlParser :true, useUnifiedTopology : true});
            console.log(`Connected with db succesfully`);
    }catch(error){
        console.log('Error to connect with db',error)
    };
}
module.exports = {connect};
