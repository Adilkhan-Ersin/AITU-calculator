import { useState, useEffect } from 'react';

interface GradeInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

// A reusable component for our input fields to keep the code clean
const GradeInput = ({ label, value, onChange } : GradeInputProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
    <label className="text-foreground mb-1 sm:mb-0">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="0-100"
      className="w-full sm:w-32 bg-input text-accent-foreground p-2 rounded-md border border-foreground focus:outline-none focus:ring-1 focus:ring-ring"
    />
  </div>
);

// --- MAIN APP COMPONENT ---
function Programming() {
  // --- STATE FOR ALL GRADE INPUTS ---
  const [assignment1, setAssignment1] = useState('');
  const [assignment2, setAssignment2] = useState('');
  const [midtermQuiz, setMidtermQuiz] = useState('');

  const [assignment3, setAssignment3] = useState('');
  const [assignment4, setAssignment4] = useState('');
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
    const avgAssignments1 = (p(assignment1) + p(assignment2));
    const calculatedAtt1 = ((avgAssignments1) + (p(midtermQuiz))) / 3;
    setAttestation1(calculatedAtt1);

    // --- 2nd Attestation Calculation ---
    const avgAssignments2 = (p(assignment3) + p(assignment4));
    const calculatedAtt2 = ((avgAssignments2) + (p(endtermQuiz))) / 3;
    setAttestation2(calculatedAtt2);

    // --- Final Grade Calculation ---
    // Formula: 0.3 * 1st Att + 0.3 * 2nd Att + 0.4 * Final
    const calculatedFinal = (calculatedAtt1 * 0.3) + (calculatedAtt2 * 0.3) + (p(finalExam) * 0.4);
    setFinalGrade(calculatedFinal);

  }, [
    assignment1, assignment2, midtermQuiz,
    assignment3, assignment4, endtermQuiz, 
    finalExam
  ]);

  // --- JSX TO RENDER ---
  return (
    <div className="text-foreground font-sans px-4 pt-4 sm:px-8 sm:pt-8">
      <div className="max-w-4xl mx-auto">

        {/* --- RESULTS DISPLAY --- */}
        <div className="bg-card rounded-xl p-6 mb-8 shadow-lg border border-foreground">
          <h2 className="text-lg font-medium text-foreground text-center">
            Your Calculated Final Grade < br/>(B1-, Rakisheva Tolkyn)
          </h2>
          <p className="text-6xl font-bold text-center text-primary mt-2">
            {finalGrade.toFixed(2)}%
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div>
                <p className="text-foreground">1st Attestation Score</p>
                <p className="text-2xl font-semibold text-accent-foreground">{attestation1.toFixed(2)} / 100</p>
            </div>
            <div>
                <p className="text-foreground">2nd Attestation Score</p>
                <p className="text-2xl font-semibold text-accent-foreground">{attestation2.toFixed(2)} / 100</p>
            </div>
          </div>
        </div>

        {/* --- GRADE INPUTS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1st Attestation Column */}
            <div className="bg-card p-5 rounded-lg border border-foreground">
                <h3 className="text-2xl font-bold mb-4 text-center">1st Attestation (30%)</h3>
                <h4 className="font-semibold text-lg mb-2 text-foreground">Assignments (20%)</h4>
                <GradeInput label="CV presentation" value={assignment1} onChange={setAssignment1} />
                <GradeInput label="Speaking Cards" value={assignment2} onChange={setAssignment2} />
                <hr className="border-foreground my-4" />
                <h4 className="font-semibold text-lg mb-2 text-foreground">Midterm (10%)</h4>
                <GradeInput label="Quiz" value={midtermQuiz} onChange={setMidtermQuiz} />
            </div>

            {/* 2nd Attestation & Final Column */}
            <div>
                <div className="bg-card p-5 rounded-lg border border-foreground mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-center">2nd Attestation (30%)</h3>
                    <h4 className="font-semibold text-lg mb-2 text-foreground">Assignments (20%)</h4>
                    <GradeInput label="Case study" value={assignment3} onChange={setAssignment3} />
                    <GradeInput label="Pitch Speech" value={assignment4} onChange={setAssignment4} />
                    <hr className="border-foreground my-4" />
                    <h4 className="font-semibold text-lg mb-2 text-foreground">Endterm (10%)</h4>
                    <GradeInput label="Quiz" value={endtermQuiz} onChange={setEndtermQuiz} />
                </div>
                <div className="bg-card p-5 rounded-lg border border-foreground">
                    <h3 className="text-2xl font-bold mb-4 text-center">Final Exam (40%)</h3>
                    <GradeInput label="Speaking" value={finalExam} onChange={setFinalExam} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Programming;