import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import BasicInfo from './Components/BasicInfo';
import EnteredDetails from './Components/EnteredDetails';
import ThankYouPage from './Components/ThankYouPage';

function App() {
  const initBasicData = JSON.parse(localStorage.getItem('data')) || {};

  const [basicData, setBasicData] = useState(initBasicData);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(basicData));
  }, [basicData]);

  const addBasicData = (name, email, contact, jobDescription, personSkills1, personSkills2, embeddings) => {
    const myBasicData = {
      name: name,
      email: email,
      contact: contact,
      jobDescription: jobDescription,
      personSkills1: personSkills1,
      personSkills2: personSkills2,
      embeddings: embeddings 
    };

    setBasicData(myBasicData);
    localStorage.setItem("data", JSON.stringify(myBasicData));
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<BasicInfo addBasicData={addBasicData} />} />
        <Route path='/details' element={<EnteredDetails data={basicData} />} />
        <Route path='/thanks' element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
