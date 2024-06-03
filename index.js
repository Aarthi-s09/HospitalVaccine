const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://Aarthis09:Aarthi1234@cluster0.kexotzh.mongodb.net/HospitalAppointment?retryWrites=true&w=majority&appName=Cluster00', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const vaccinationSchema = new mongoose.Schema({
  title: String,
  start: String,
});

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);

const vaccineSchedule = [
  { vaccine: 'BCG', schedule: ['Birth'] },
  { vaccine: 'Hep B', schedule: ['Birth', '06 weeks', '06 months'] },
  { vaccine: 'OPV', schedule: ['06 weeks', '09 months'] },
  { vaccine: 'DTP', schedule: ['06 weeks', '10 weeks', '14 weeks'] },
  { vaccine: 'IPV', schedule: ['06 weeks', '14 weeks'] },
  { vaccine: 'HIB', schedule: ['06 weeks', '10 weeks', '14 weeks'] },
  { vaccine: 'Rota V', schedule: ['06 weeks', '10 weeks'] },
  { vaccine: 'PCV', schedule: ['06 weeks', '10 weeks', '14 weeks'] },
  { vaccine: 'MMR', schedule: ['09-12 months'] },
  { vaccine: 'Typhoid', schedule: [] },
  { vaccine: 'Hep A', schedule: ['12 months'] },
  { vaccine: 'COVID-19', schedule: ['18+'] },
  { vaccine: 'Influenza', schedule: ['18+', '65+'] },
  { vaccine: 'Pneumococcal', schedule: ['65+'] },
  { vaccine: 'Shingles', schedule: ['50+'] },
  { vaccine: 'HPV', schedule: ['18-26'] },
  { vaccine: 'Tdap', schedule: ['18+', 'Every 10 years'] },
  { vaccine: 'Meningococcal', schedule: ['18+', 'College students'] },
  { vaccine: 'Hepatitis A & B', schedule: ['18+', 'No evidence of immunity'] },
];

app.get('/api/vaccine-schedule', (req, res) => {
  res.json(vaccineSchedule);
});

app.get('/api/vaccinations', async (req, res) => {
  const vaccinations = await Vaccination.find();
  res.json(vaccinations);
});

app.post('/api/vaccinations', async (req, res) => {
  const newVaccination = new Vaccination(req.body);
  await newVaccination.save();
  res.json(newVaccination);
});

app.delete('/api/vaccinations/:id', async (req, res) => {
  const { id } = req.params;
  await Vaccination.findByIdAndDelete(id);
  res.sendStatus(204);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
