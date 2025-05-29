import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Job from './models/Job.js'; //Importazione del modello Job

const app = express(); //Creazione di un'applicazione Express


app.use(cors()); //Abilitazione del CORS per consentire richieste da altri domini  


//app.use(express.json());
//app.use('/api/jobs', jobRoutes);


mongoose.connect("mongodb://localhost:27017/Job", { useNewUrlParser: true}); //Connessione al database MongoDB


const db = mongoose.connection; //Restituzione della connessione al database(proprietà per gestire gli eventi di connessione)


db.once('open', () => {
    console.log("Connesso al database MongoDB con successo usando Mongoose!"); //Messaggio di conferma della connessione al database
}); 
db.on('error', (error) => {
    console.error('Errore di connessione MongoDB:', error);
});



app.listen(3000) //Avvio del server sulla porta 3000
