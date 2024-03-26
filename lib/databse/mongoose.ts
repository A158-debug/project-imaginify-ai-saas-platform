import mongoose,{ Mongoose} from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection{
    conn:Mongoose|null;
    promise:Promise<Mongoose> | null;
}

let cached:MongooseConnection = (global as any).mongoose;

// if not cached before
if(!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

export  const connectToDatabase = async () => {
    // console.log('MONGODB_URL',MONGODB_URL);
    // console.log('cached.conn',cached.conn);
    if(cached.conn)  return cached.conn;
    
    if(!MONGODB_URL) throw new Error('MONGODB_URL is not defined');

    cached.promise =  cached.promise || mongoose.connect(MONGODB_URL, {dbName:'imaginify',bufferCommands:false});

    cached.conn = await cached.promise;
    // console.log('cached.conn',cached.conn);
    return cached.conn;
}