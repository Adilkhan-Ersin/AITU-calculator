import { useState } from 'react';
import Navbar from './components/Navbar';
import Programming from './components/Programming';
import PlaceholderCalculator from './components/Placeholder';
import Footer from './components/Footer';

export default function App() {
  // Define the list of subjects available
  const subjects = ["Programming", "Sociology", "Discrete Math", "Psychology", "English", "ICT"];
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  const renderCalculator = () => {
    switch (selectedSubject) {
      case "Programming":
        return <Programming />;
      case "Sociology":
        return <PlaceholderCalculator subject="Sociology" />;
      case "Discrete Math":
        return <PlaceholderCalculator subject="Discrete Math" />;
      case "Psychology":
        return <PlaceholderCalculator subject="Psychology" />;
      case "English":
        return <PlaceholderCalculator subject="English" />;
      case "ICT":
        return <PlaceholderCalculator subject="ICT" />;
      default:
        return <p>Please select a subject</p>;
    }
  };
  return (
    <div className="text-dark min-h-screen font-sans">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-4">
          <h1 className="title-text text-4xl sm:text-5xl font-bold text-dark">
            Final Grade Calculator
          </h1>
          <p className="text-dark mt-2">
            Select a subject to calculate your grade in real-time. <br/>
            Made by <a href="https://t.me/Adlkhy" target="_blank" rel="noopener noreferrer" className="text-[#B95E82]">Adilkhan✨</a>.
          </p>
        </header>

        {/* --- NAVBAR for filtering --- */}
        <Navbar 
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject} // Pass the function to update the state
        />

        {/* --- DYNAMIC CONTENT AREA --- */}
        <main className="mt-8">
          {renderCalculator()}
        </main>
      </div>
      <Footer />
    </div>
  );
}
