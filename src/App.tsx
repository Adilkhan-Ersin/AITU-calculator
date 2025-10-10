import { useState, useEffect } from 'react';

interface GradeInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

// A reusable component for our input fields to keep the code clean
const GradeInput = ({ label, value, onChange } : GradeInputProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
    <label className="text-dark mb-1 sm:mb-0">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="0-100"
      className="w-full sm:w-32 bg-[#FEF3E2] text-dark p-2 rounded-md border border-dark focus:outline-none focus:ring-2 focus:ring-[#B95E82]"
    />
  </div>
);

// --- MAIN APP COMPONENT ---
function App() {
  // --- STATE FOR ALL GRADE INPUTS ---
  // Pre-filled with your known grades
  const [assignment1, setAssignment1] = useState('');
  const [assignment2, setAssignment2] = useState('');
  const [assignment3, setAssignment3] = useState('');
  const [midtermQuiz, setMidtermQuiz] = useState('');
  const [midtermPractical, setMidtermPractical] = useState('');

  const [assignment4, setAssignment4] = useState('');
  const [assignment5, setAssignment5] = useState('');
  const [assignment6, setAssignment6] = useState('');
  const [endtermQuiz, setEndtermQuiz] = useState('');
  const [endtermPractical, setEndtermPractical] = useState('');

  const [finalExam, setFinalExam] = useState('');

  // --- STATE FOR CALCULATED RESULTS ---
  const [attestation1, setAttestation1] = useState(0);
  const [attestation2, setAttestation2] = useState(0);
  const [finalGrade, setFinalGrade] = useState(0);

  // --- CALCULATION LOGIC ---
  useEffect(() => {
    // Helper function to parse input strings to numbers, defaulting to 0
    const p = (val: string) => parseFloat(val) || 0;

    // --- 1st Attestation Calculation ---
    const avgAssignments1 = (p(assignment1) + p(assignment2) + p(assignment3)) / 3;
    const midtermScore = (((p(midtermQuiz) / 100) * 15) + ((p(midtermPractical) / 100) * 25)) / 40 * 100;
    const calculatedAtt1 = (avgAssignments1 * 0.6) + (midtermScore * 0.4);
    setAttestation1(calculatedAtt1);

    // --- 2nd Attestation Calculation ---
    const avgAssignments2 = (p(assignment4) + p(assignment5) + p(assignment6)) / 3;
    const endtermScore = (((p(endtermQuiz) / 100) * 15) + ((p(endtermPractical) / 100) * 25)) / 40 * 100;
    const calculatedAtt2 = (avgAssignments2 * 0.6) + (endtermScore * 0.4);
    setAttestation2(calculatedAtt2);

    // --- Final Grade Calculation ---
    // Formula: 0.3 * 1st Att + 0.3 * 2nd Att + 0.4 * Final
    const calculatedFinal = (calculatedAtt1 * 0.3) + (calculatedAtt2 * 0.3) + (p(finalExam) * 0.4);
    setFinalGrade(calculatedFinal);

  }, [
    assignment1, assignment2, assignment3, midtermQuiz, midtermPractical,
    assignment4, assignment5, assignment6, endtermQuiz, endtermPractical,
    finalExam
  ]);

  // --- JSX TO RENDER ---
  return (
    <div className="bg-[#FFECC0] text-dark min-h-screen font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* --- HEADER --- */}
        <header className="text-center mb-8">
          <h1 className="title-text text-4xl sm:text-5xl font-bold">
            Final Grade Calculator
          </h1>
          <p className="text-dark mt-2">
            Enter your scores to see your final grade in real-time. <br/>
            Made by <a href="https://t.me/Adlkhy" target="_blank" rel="noopener noreferrer" className="text-[#B95E82] hover:underline">Adilkhan❤️</a>.
          </p>
        </header>

        {/* --- RESULTS DISPLAY --- */}
        <div className="bg-[#FFC29B] rounded-xl p-6 mb-8 shadow-lg border border-dark">
          <h2 className="text-lg font-medium text-dark text-center">
            Your Calculated Final Grade
          </h2>
          <p className="text-6xl font-bold text-center text-[#B95E82] mt-2">
            {finalGrade.toFixed(2)}%
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div>
                <p className="text-dark">1st Attestation Score</p>
                <p className="text-2xl font-semibold text-[#B95E82]">{attestation1.toFixed(2)} / 100</p>
            </div>
            <div>
                <p className="text-dark">2nd Attestation Score</p>
                <p className="text-2xl font-semibold text-[#B95E82]">{attestation2.toFixed(2)} / 100</p>
            </div>
          </div>
        </div>

        {/* --- GRADE INPUTS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1st Attestation Column */}
            <div className="bg-[#FFC29B] p-5 rounded-lg border border-dark">
                <h3 className="text-2xl font-bold mb-4 text-center">1st Attestation (30%)</h3>
                <h4 className="font-semibold text-lg mb-2 text-dark">Assignments (60%)</h4>
                <GradeInput label="Assignment 1" value={assignment1} onChange={setAssignment1} />
                <GradeInput label="Assignment 2" value={assignment2} onChange={setAssignment2} />
                <GradeInput label="Assignment 3" value={assignment3} onChange={setAssignment3} />
                <hr className="border-dark my-4" />
                <h4 className="font-semibold text-lg mb-2 text-dark">Midterm (40%)</h4>
                <GradeInput label="Quiz (15pts)" value={midtermQuiz} onChange={setMidtermQuiz} />
                <GradeInput label="Practical Exam (25pts)" value={midtermPractical} onChange={setMidtermPractical} />
            </div>

            {/* 2nd Attestation & Final Column */}
            <div>
                <div className="bg-[#FFC29B] p-5 rounded-lg border border-dark mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-center">2nd Attestation (30%)</h3>
                    <h4 className="font-semibold text-lg mb-2 text-dark">Assignments (60%)</h4>
                    <GradeInput label="Assignment 4" value={assignment4} onChange={setAssignment4} />
                    <GradeInput label="Assignment 5" value={assignment5} onChange={setAssignment5} />
                    <GradeInput label="Assignment 6" value={assignment6} onChange={setAssignment6} />
                    <hr className="border-dark my-4" />
                    <h4 className="font-semibold text-lg mb-2 text-dark">Endterm (40%)</h4>
                    <GradeInput label="Quiz (15pts)" value={endtermQuiz} onChange={setEndtermQuiz} />
                    <GradeInput label="Practical Exam (25pts)" value={endtermPractical} onChange={setEndtermPractical} />
                </div>
                <div className="bg-[#FFC29B] p-5 rounded-lg border border-dark">
                    <h3 className="text-2xl font-bold mb-4 text-center">Final Exam (40%)</h3>
                    <GradeInput label="MCQ Exam" value={finalExam} onChange={setFinalExam} />
                </div>
            </div>
        </div>
      </div>
    <footer className="mt-12">
      <div className='max-w-4xl mx-auto flex justify-center gap-x-4'>
        <a href="https://www.instagram.com/adilikecious/" target="_blank" rel="noopener noreferrer"><img src="/instagram.svg" className="w-10" alt="Instagram" /></a>
        <a href="https://t.me/Adlkhy" target="_blank" rel="noopener noreferrer"><img src="/telegram.svg" className="w-10" alt="Telegram" /></a>
        <a href="mailto:253209@astanait.edu.kz" target="_blank" rel="noopener noreferrer"><img src="/envelope.svg" className="w-10" alt="Email" /></a>
      </div>
      <p className="text-center text-dark text-sm mt-4">
        &copy; 2025 Adilkhan. All rights couldn't be reserved. 
      </p>
    </footer>
    </div>
  );
}

export default App;