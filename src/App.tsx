import { useState } from 'react';
import Programming from './components/Programming';
import English from './components/English';
import Sociology from './components/Sociology';
import DiscreteMath from './components/DiscreateMath'
import Psychology from './components/Psychology';
import ICT from './components/ICT';
import Dynamic from './components/Dynamic';
import Budget from './components/Budget';
import { ThemeProvider } from './components/theme-provider';
import { Navbar08 } from './components/Navbar2';
import Footer from './components/Footer';

export default function App() {
  const subjects = ["Dynamic", "Programming", "Sociology", "Discrete Math", "Psychology", "English", "ICT", "Budget"];
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  
  // Function to render the appropriate calculator based on selected subject
  const renderCalculator = () => {
    switch (selectedSubject) {
      case "Dynamic":
        return <Dynamic />;
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
      case "Budget":
        return <Budget />;
      default:
        return <p>Please select a subject</p>;
    }
  };

  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <Navbar08 
        subjects={subjects}
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
      />
      <div className="text-foreground min-h-screen font-sans">
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
          <header className="text-center flex flex-col items-center">
            {selectedSubject !== "Budget" && (
              <h1 className="title-text mb-1 text-4xl sm:text-5xl font-bold text-foreground">
                Final Grade Calculator
              </h1>
            )}
            {selectedSubject === "Budget" && (
              <h1 className="title-text mb-1 text-4xl sm:text-5xl font-bold text-foreground">
                Budget Calculator
              </h1>
            )}
            {selectedSubject !== "Budget" && selectedSubject !== "Dynamic" && (
              <div>
                <p className="font-semibold md:text-xl mb-2 max-w-[300px] md:max-w-[700px]">🎓 Select a subject to calculate your grade in real-time.</p>
                <p className="text-foreground bg-background my-2 rounded-xl p-3 shadow-lg border border-foreground max-w-[305px] md:max-w-3xl">
                  <span className="">This grade calculator is based on the <strong>official syllabus</strong> and grading scheme, but please note that it may not be 
                  <strong className='pl-1'>100% </strong>accurate. Teachers may occasionally adjust their grading policies or syllabus details. </span> <br />
                </p>
              </div>
            )}
            {selectedSubject === "Budget" && (
              <p className="font-semibold md:text-xl mb-2 max-w-[300px] md:max-w-[700px]">💵 Calculate your budget in real-time.</p>
            )}
            {selectedSubject === "Dynamic" && (
              <p className="font-semibold md:text-xl mb-2 max-w-[300px] md:max-w-[700px]">Create your own calculator using syllabus.</p>
            )}
          </header>

          <main className="">
            {renderCalculator()}
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}