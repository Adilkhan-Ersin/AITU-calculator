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
function Programming() {
  // --- STATE FOR ALL GRADE INPUTS ---
  // Pre-filled with your known grades
  const [assignment1, setAssignment1] = useState('');
  const [assignment2, setAssignment2] = useState('');
  const [quiz, setQuiz] = useState('');
  const [sis, setSis] = useState('');
  const [midtermQuiz, setMidtermQuiz] = useState('');

  const [assignment3, setAssignment3] = useState('');
  const [assignment4, setAssignment4] = useState('');
  const [quiz2, setQuiz2] = useState('');
  const [sis2, setSis2] = useState('');
  const [endtermQuiz, setEndtermQuiz] = useState('');

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
    const avgAssignments1 = (((p(assignment1) + p(assignment2)) / 100) * 20) + (((p(quiz) + p(sis)) / 100) * 10);
    const midtermScore = (p(midtermQuiz) / 100) * 40;
    const calculatedAtt1 = (avgAssignments1) + (midtermScore);
    setAttestation1(calculatedAtt1);

    // --- 2nd Attestation Calculation ---
    const avgAssignments2 = (((p(assignment3) + p(assignment4)) / 100) * 20) + (((p(quiz2) + p(sis2)) / 100) * 10);
    const endtermScore = (p(endtermQuiz) / 100) * 40;
    const calculatedAtt2 = (avgAssignments2) + (endtermScore);
    setAttestation2(calculatedAtt2);

    // --- Final Grade Calculation ---
    // Formula: 0.3 * 1st Att + 0.3 * 2nd Att + 0.4 * Final
    const calculatedFinal = (calculatedAtt1 * 0.3) + (calculatedAtt2 * 0.3) + (p(finalExam) * 0.4);
    setFinalGrade(calculatedFinal);

  }, [
    assignment1, assignment2, quiz, sis, midtermQuiz,
    assignment3, assignment4, quiz2, sis2, endtermQuiz,
    finalExam
  ]);

  // --- JSX TO RENDER ---
  return (
    <div className="bg-[#FFECC0] text-dark font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">

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
                <GradeInput label="Quiz" value={quiz} onChange={setQuiz} />
                <GradeInput label="SIS" value={sis} onChange={setSis} />
                <hr className="border-dark my-4" />
                <h4 className="font-semibold text-lg mb-2 text-dark">Midterm (40%)</h4>
                <GradeInput label="Quiz" value={midtermQuiz} onChange={setMidtermQuiz} />
            </div>

            {/* 2nd Attestation & Final Column */}
            <div>
                <div className="bg-[#FFC29B] p-5 rounded-lg border border-dark mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-center">2nd Attestation (30%)</h3>
                    <h4 className="font-semibold text-lg mb-2 text-dark">Assignments (60%)</h4>
                    <GradeInput label="Assignment 3" value={assignment3} onChange={setAssignment3} />
                    <GradeInput label="Assignment 4" value={assignment4} onChange={setAssignment4} />
                    <GradeInput label="Quiz" value={quiz2} onChange={setQuiz2} />
                    <GradeInput label="SIS" value={sis2} onChange={setSis2} />
                    <hr className="border-dark my-4" />
                    <h4 className="font-semibold text-lg mb-2 text-dark">Endterm (40%)</h4>
                    <GradeInput label="Quiz" value={endtermQuiz} onChange={setEndtermQuiz} />
                </div>
                <div className="bg-[#FFC29B] p-5 rounded-lg border border-dark">
                    <h3 className="text-2xl font-bold mb-4 text-center">Final Exam (40%)</h3>
                    <GradeInput label="MCQ Exam" value={finalExam} onChange={setFinalExam} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Programming;