import { useState } from 'react';
import Navbar from './components/Navbar';
import Programming from './components/Programming';
import English from './components/English';
import Sociology from './components/Sociology';
import DiscreteMath from './components/DiscreateMath'
import Psychology from './components/Psychology';
import ICT from './components/ICT';
// import Dynamic from './components/Dynamic';
import PlaceholderCalculator from './components/Placeholder';
import Footer from './components/Footer';

export default function App() {
  const subjects = ["Programming", "Sociology", "Discrete Math", "Psychology", "English", "ICT", "Dynamic"];
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  const renderCalculator = () => {
    switch (selectedSubject) {
      case "Programming":
        return <Programming />;
      case "Sociology":
        return <Sociology />;
      case "Discrete Math":
        return <DiscreteMath />;
      case "Psychology":
        return <Psychology />;
      case "English":
        return <English />;
      case "ICT":
        return <ICT />;
      case "Dynamic":
        return <PlaceholderCalculator subject={"Dynamic"} />;
      default:
        return <p>Please select a subject</p>;
    }
  };
  return (
    <div className="text-dark min-h-screen font-sans">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="text-center flex flex-col items-center mb-4">
          <h1 className="title-text mb-1 text-4xl sm:text-5xl font-bold text-dark">
            Final Grade Calculator
          </h1>
          <p className="font-semibold md:text-xl mb-2 max-w-[300px] md:max-w-[700px]">🎓 Select a subject to calculate your grade in real-time.</p>
          <p className="text-dark bg-[#FEF3E2] my-2 rounded-xl p-3 shadow-lg border border-dark max-w-[305px] md:max-w-3xl">
            <span className="">This grade calculator is based on the <strong>official syllabus</strong> and grading scheme, but please note that it may not be 
            <strong className='pl-1'>100% </strong>accurate. Teachers may occasionally adjust their grading policies or syllabus details. </span> <br />
            Made by <a href="https://t.me/Adlkhy" target="_blank" rel="noopener noreferrer" className="text-[#B95E82]">Adilkhan✨</a>.
          </p>
        </header>

        <Navbar 
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject} // Pass the function to update the state
        />

        <main className="mt-8">
          {renderCalculator()}
        </main>
      </div>
      <Footer />
    </div>
  );
}
