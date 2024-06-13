import { port } from "./config.js";
import { connectToDb } from "./db.js";
import app from "./app.js";

async function main(){
    await connectToDb();
    //! mandar el puerto de configuracion
    app.listen(port);
    //!
    console.log('Server on port: ', port);
    console.log('http://localhost:3000/');

}

main();