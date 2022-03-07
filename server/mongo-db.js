const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://francoise:francoise@clusterclearfashion.o3uxo.mongodb.net?retryWrites=true&writeConcern=majority';
const MONGODB_DB_NAME = 'ClusterClearFashion';

let db=null

module.exports.connect = async () => { 
  try {
  let client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  db =  client.db(MONGODB_DB_NAME)
  console.log("connected to mongo");
  }
  catch(error){
      console.error(error);
  }
}


module.exports.insert = async (products)=>{ 
    try {
        const collection = db.collection('products');
        const result = await collection.insertMany(products, {'ordered': false});
        return result;
    } 
    catch (error) {
        console.log('everything is already insert')
       // console.error(error);
        //process.exit(1);
    };
    
};

module.exports.find = async (query) => {
    try {
      const collection = db.collection('products');
      const result = await collection.find(query).toArray();
      return result;

    } catch (error) {
      console.error(error);
      return null;
    }
  };

  module.exports.sort = async () => {
    try {
      const collection = db.collection('products');
      const result = await collection.find().sort({'price':1}).toArray();
      return result;

    } catch (error) {
      console.error(error);
      return null;
    }
  };
