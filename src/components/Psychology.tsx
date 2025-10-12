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
  const [quiz, setQuiz] = useState('');
  const [independedStudy, setIndependedStudy] = useState('');
  const [practice, setPractice] = useState('');
  const [midtermQuiz, setMidtermQuiz] = useState('');

  const [quiz2, setQuiz2] = useState('');
  const [independedStudy2, setIndependedStudy2] = useState('');
  const [practice2, setPractice2] = useState('');
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
    const avgAssignments1 = (((p(independedStudy) + p(quiz)) / 100) * 4) + ((p(practice) / 100) * 14);
    const midtermScore = (p(midtermQuiz) / 100) * 8;
    const calculatedAtt1 = ((avgAssignments1) + (midtermScore)) * 100 / 30;
    setAttestation1(calculatedAtt1);

    // --- 2nd Attestation Calculation ---
    const avgAssignments2 = (((p(independedStudy2) + p(quiz2)) / 100) * 4) + ((p(practice2) / 100) * 14);
    const endtermScore = (p(endtermQuiz) / 100) * 8;
    const calculatedAtt2 = ((avgAssignments2) + (endtermScore)) * 100 / 30;
    setAttestation2(calculatedAtt2);

    // --- Final Grade Calculation ---
    // Formula: 0.3 * 1st Att + 0.3 * 2nd Att + 0.4 * Final
    const calculatedFinal = (calculatedAtt1 * 0.3) + (calculatedAtt2 * 0.3) + (p(finalExam) * 0.4);
    setFinalGrade(calculatedFinal);

  }, [
    independedStudy, quiz, practice, midtermQuiz,
    independedStudy2, practice2, quiz2, endtermQuiz,
    finalExam
  ]);

  // --- JSX TO RENDER ---
  return (
    <div className="bg-[#FFECC0] text-dark font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">

        {/* --- RESULTS DISPLAY --- */}
        <div className="bg-[#FFC29B] rounded-xl p-6 mb-8 shadow-lg border border-dark">
          <h2 className="text-lg font-medium text-dark text-center">
            Your Calculated Final Grade < br/> (Nursulu Belessova)
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
                <h4 className="font-semibold text-lg mb-2 text-dark">Assignments (70%)</h4>
                <GradeInput label="Learn" value={quiz} onChange={setQuiz} />
                <GradeInput label="Independent Study" value={independedStudy} onChange={setIndependedStudy} />
                <GradeInput label="Practice" value={practice} onChange={setPractice} />
                <hr className="border-dark my-4" />
                <h4 className="font-semibold text-lg mb-2 text-dark">Midterm (30%)</h4>
                <GradeInput label="Quiz" value={midtermQuiz} onChange={setMidtermQuiz} />
            </div>

            {/* 2nd Attestation & Final Column */}
            <div>
                <div className="bg-[#FFC29B] p-5 rounded-lg border border-dark mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-center">2nd Attestation (30%)</h3>
                    <h4 className="font-semibold text-lg mb-2 text-dark">Assignments (70%)</h4>
                    <GradeInput label="Learn" value={quiz2} onChange={setQuiz2} />
                    <GradeInput label="Independent Study" value={independedStudy2} onChange={setIndependedStudy2} />
                    <GradeInput label="Practice" value={practice2} onChange={setPractice2} />
                    <hr className="border-dark my-4" />
                    <h4 className="font-semibold text-lg mb-2 text-dark">Endterm (30%)</h4>
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