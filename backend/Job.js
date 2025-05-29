/*import mongoose from 'mongoose'; //Importazione di mongoose per la gestione del database MongoDB


const jobSchema = new mongoose.Schema({
  Titolo: String,
  Azienda: String,
  Locazione: String,
  Categoria: String, 
  Descrizione: String,
  Ruolo: String,   //Azienda o Utente
});


export default mongoose.model('Job', jobSchema); //Esportazione del modello Job per altri file
// Questo modello rappresenta la struttura dei documenti nella collezione "jobs" nel database MongoDB
*/

import mongoose from 'mongoose';


const jobSchema = new mongoose.Schema({
  Titolo: String,
  Azienda: String,
  Locazione: String,
  Categoria: String, 
  Descrizione: String,
  Ruolo: String,
});

const Job = mongoose.model('Job', jobSchema);
export default Job;