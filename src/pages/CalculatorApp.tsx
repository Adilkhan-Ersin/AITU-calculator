import { useState } from "react";
import { Navbar08 } from "../components/Navbar2";
import Footer from "../components/Footer";
import Programming from "../components/Programming";
import English from "../components/English";
import Sociology from "../components/Sociology";
import DiscreteMath from "../components/DiscreateMath";
import Psychology from "../components/Psychology";
import ICT from "../components/ICT";
import Dynamic from "../components/Dynamic";
import Budget from "../components/Budget";
import Attendance from "../components/Attendance";
import GPA from "../components/GPA";

export default function MainCalculator() {
  const subjects = [
    "Dynamic",
    "Programming",
    "Sociology",
    "Discrete Math",
    "Psychology",
    "English",
    "ICT",
    "Attendance",
    "GPA",
    "Budget",
  ];
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

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
      case "Attendance":
        return <Attendance />;
      case "Budget":
        return <Budget />;
      case "GPA":
        return <GPA />;
      default:
        return <p>Please select a subject</p>;
    }
  };

  return (
    <>
      <Navbar08
        subjects={subjects}
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
      />
      <div className="text-foreground min-h-screen font-sans">
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
          <header className="text-center flex flex-col items-center">
            {selectedSubject !== "Budget" &&
              selectedSubject !== "Attendance" && (
                <h1 className="title-text mb-1 text-4xl sm:text-5xl font-bold text-foreground">
                  Final Grade Calculator
                </h1>
              )}
            {selectedSubject === "Budget" && (
              <h1 className="title-text mb-1 text-4xl sm:text-5xl font-bold text-foreground">
                Budget Calculator
              </h1>
            )}
            {selectedSubject === "Attendance" && (
              <h1 className="title-text mb-1 text-4xl sm:text-5xl font-bold text-foreground">
                Attendance Tracker
              </h1>
            )}
            {selectedSubject !== "Budget" &&
              selectedSubject !== "Dynamic" &&
              selectedSubject !== "Attendance" && (
                <div>
                  <p className="font-semibold md:text-xl mb-2 max-w-4xl">
                    🎓 Select a subject to calculate your grade in real-time.
                  </p>
                  <p className="text-foreground bg-background my-2 rounded-xl p-3 shadow-lg border border-foreground max-w-4xl ">
                    This grade calculator is based on the{" "}
                    <strong>official syllabus</strong> and grading scheme, but
                    please note that it may not be <strong>100%</strong>{" "}
                    accurate.
                  </p>
                </div>
              )}
            {selectedSubject === "Budget" && (
              <p className="font-semibold md:text-xl mb-2 max-w-4xl">
                💵 Calculate your budget in real-time.
              </p>
            )}
            {selectedSubject === "Attendance" && (
              <p className="font-semibold md:text-xl mb-2 max-w-4xl">
                📅 Track your attendance in real-time.
              </p>
            )}
            {selectedSubject === "Dynamic" && (
              <p className="font-semibold md:text-xl mb-2 max-w-[300px] md:max-w-[700px]">
                Create your own calculator using syllabus. <br />
                <span className="font-normal text-lg">
                  In the future you will be able to save and share it.
                </span>
              </p>
            )}
          </header>

          <main className="">{renderCalculator()}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
