// import { useState, useEffect } from 'react';

// // --- TYPE DEFINITIONS ---
// interface GradeItem {
//   id: string;
//   name: string;
//   score: string;
//   points: string; // Represents the maximum possible score or weight
// }

// // --- REUSABLE COMPONENTS ---

// // A dynamic input field for each grade item
// const GradeItemInput = ({ item, onUpdate, onRemove } : { item: GradeItem; onUpdate: (id: string, field: string, value: string) => void; onRemove: (id: string) => void }) => (
//   <div className="flex flex-col sm:flex-row items-center gap-2 mb-3">
//     <input
//       type="text"
//       value={item.name}
//       onChange={(e) => onUpdate(item.id, 'name', e.target.value)}
//       placeholder="Item Name (e.g., Quiz)"
//       className="flex-grow bg-[#FEF3E2] text-dark p-2 rounded-md border border-dark focus:outline-none focus:ring-2 focus:ring-[#B95E82]"
//     />
//     <div className="flex items-center gap-2">
//       <input
//         type="number"
//         value={item.score}
//         onChange={(e) => onUpdate(item.id, 'score', e.target.value)}
//         placeholder="Score"
//         className="w-24 bg-[#FEF3E2] text-dark p-2 rounded-md border border-dark focus:outline-none focus:ring-2 focus:ring-[#B95E82]"
//       />
//       <span className="text-dark font-bold">/</span>
//       <input
//         type="number"
//         value={item.points}
//         onChange={(e) => onUpdate(item.id, 'points', e.target.value)}
//         placeholder="Points"
//         className="w-24 bg-[#FEF3E2] text-dark p-2 rounded-md border border-dark focus:outline-none focus:ring-2 focus:ring-[#B95E82]"
//       />
//     </div>
//     <button
//         onClick={() => onRemove(item.id)}
//         className="bg-red-500 hover:bg-red-600 text-white font-bold h-9 w-9 flex items-center justify-center rounded-md transition-colors"
//         aria-label="Remove Item"
//       >
//         &times;
//     </button>
//   </div>
// );

// // A reusable section for each category (Attestation 1, 2, etc.)
// const GradeCategory = ({ title, weight, items, setItems } : { title: string; weight: number; items: GradeItem[]; setItems: (items: GradeItem[]) => void }) => {
//   const addItem = () => {
//     const newItem = {
//       id: crypto.randomUUID(),
//       name: `Assignment ${items.length + 1}`,
//       score: '',
//       points: '',
//     };
//     setItems([...items, newItem]);
//   };

//   const updateItem = (id, field, value) => {
//     setItems(items.map(it => it.id === id ? { ...it, [field]: value } : it));
//   };

//   const removeItem = (id) => {
//     setItems(items.filter(it => it.id !== id));
//   };

//   return (
//     <div className="bg-[#FFC29B] p-5 rounded-lg border border-dark">
//       <h3 className="text-2xl font-bold mb-4 text-center">{title} ({weight}%)</h3>
//       <div className="space-y-3">
//         {items.map(item => (
//           <GradeItemInput
//             key={item.id}
//             item={item}
//             onUpdate={updateItem}
//             onRemove={removeItem}
//           />
//         ))}
//       </div>
//       <button
//         onClick={addItem}
//         className="text-[#B95E82] hover:underline mt-4 font-semibold"
//       >
//         + Add Item
//       </button>
//     </div>
//   );
// };


// // --- MAIN DYNAMIC CALCULATOR COMPONENT ---
// export default function ProgrammingCalculator() {
//   // --- STATE FOR DYNAMIC GRADE ITEMS ---
//   const [attestation1Items, setAttestation1Items] = useState<GradeItem[]>([]);
//   const [attestation2Items, setAttestation2Items] = useState<GradeItem[]>([]);
//   const [finalExamItems, setFinalExamItems] = useState<GradeItem[]>([]);

//   // --- STATE FOR CALCULATED RESULTS ---
//   const [attestation1Score, setAttestation1Score] = useState(0);
//   const [attestation2Score, setAttestation2Score] = useState(0);
//   const [finalExamScore, setFinalExamScore] = useState(0);
//   const [finalGrade, setFinalGrade] = useState(0);

//   // --- CALCULATION LOGIC ---
//   useEffect(() => {
//     const p = (val) => parseFloat(val) || 0;

//     // Helper function to calculate the score for a category
//     const calculateCategoryScore = (items) => {
//       let totalScore = 0;
//       let totalPoints = 0;

//       items.forEach(item => {
//         const score = p(item.score);
//         const points = p(item.points);
//         if (points > 0) {
//           totalScore += score;
//           totalPoints += points;
//         }
//       });
//       // Return score as a percentage (0-100)
//       return totalPoints > 0 ? (totalScore / totalPoints) * 100 : 0;
//     };

//     const att1 = calculateCategoryScore(attestation1Items);
//     const att2 = calculateCategoryScore(attestation2Items);
//     const final = calculateCategoryScore(finalExamItems);

//     setAttestation1Score(att1);
//     setAttestation2Score(att2);
//     setFinalExamScore(final);

//     // Final Grade Calculation (30% Att1, 30% Att2, 40% Final)
//     const calculatedFinal = (att1 * 0.3) + (att2 * 0.3) + (final * 0.4);
//     setFinalGrade(calculatedFinal);

//   }, [attestation1Items, attestation2Items, finalExamItems]);

//   return (
//     <div>
//       {/* --- RESULTS DISPLAY --- */}
//       <div className="bg-[#FFC29B] rounded-xl p-6 mb-8 shadow-lg border border-dark">
//         <h2 className="text-lg font-medium text-dark text-center">
//           Your Calculated Final Grade
//         </h2>
//         <p className="text-6xl font-bold text-center text-[#B95E82] mt-2">
//           {finalGrade.toFixed(2)}%
//         </p>
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
//           <div>
//             <p className="text-dark">1st Attestation</p>
//             <p className="text-2xl font-semibold text-[#B95E82]">{attestation1Score.toFixed(2)}%</p>
//           </div>
//           <div>
//             <p className="text-dark">2nd Attestation</p>
//             <p className="text-2xl font-semibold text-[#B95E82]">{attestation2Score.toFixed(2)}%</p>
//           </div>
//            <div>
//             <p className="text-dark">Final Exam</p>
//             <p className="text-2xl font-semibold text-[#B95E82]">{finalExamScore.toFixed(2)}%</p>
//           </div>
//         </div>
//       </div>

//       {/* --- GRADE INPUTS --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <GradeCategory
//           title="1st Attestation"
//           weight={30}
//           items={attestation1Items}
//           setItems={setAttestation1Items}
//         />
//         <GradeCategory
//           title="2nd Attestation"
//           weight={30}
//           items={attestation2Items}
//           setItems={setAttestation2Items}
//         />
//         <div className="lg:col-span-2">
//             <GradeCategory
//               title="Final Exam"
//               weight={40}
//               items={finalExamItems}
//               setItems={setFinalExamItems}
//             />
//         </div>
//       </div>
//     </div>
//   );
// }
