const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongoUri = 'mongodb+srv://Aarthis09:Aarthi1234@cluster0.kexotzh.mongodb.net/HospitalAppointment?retryWrites=true&w=majority&appName=Cluster00';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define a schema and model for vaccination appointments
const vaccinationSchema = new mongoose.Schema({
  title: String,
  start: String
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
  { vaccine: 'Hepatitis A & B', schedule: ['18+'] },
  { vaccine: 'MMR', schedule: ['18+', 'Born after 1957'] },
  { vaccine: 'Varicella', schedule: ['18+', 'No evidence of immunity'] },
];

app.get('/api/vaccinations', async (req, res) => {
  try {
    const vaccinations = await Vaccination.find();
    res.json(vaccinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/vaccinations', async (req, res) => {
  const newVaccination = new Vaccination(req.body);
  try {
    const savedVaccination = await newVaccination.save();
    res.status(201).json(savedVaccination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/vaccine-schedule', (req, res) => {
  res.json(vaccineSchedule);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
