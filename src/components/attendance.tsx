import { useState, useEffect } from "react";

// --- CONSTANTS ---
const totalWeeks = 10;
const hoursPerClass = 2;

// --- PROGRESS BAR COMPONENT ---
const ProgressBar = ({ percent }: { percent: number }) => {
  let color = "";
  if (percent < 70) color = "bg-red-500";
  else if (percent < 90) color = "bg-yellow-400";
  else color = "bg-green-500";

  return (
    <div className="w-full bg-gray-300 h-6 rounded-md overflow-hidden">
      <div
        className={`${color} h-full`}
        style={{ width: `${percent}%`, transition: "width 0.3s" }}
      />
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function AttendanceTracker() {
  const [classesPerWeek, setClassesPerWeek] = useState("2");
  const [missedClasses, setMissedClasses] = useState("0");
  const [attendancePercent, setAttendancePercent] = useState(100);
  const [totalHours, setTotalHours] = useState(2 * hoursPerClass * totalWeeks);
  const [missedHours, setMissedHours] = useState(0);

  useEffect(() => {
    const classesPerWeekNum = parseFloat(classesPerWeek) || 0;
    const missedClassesNum = parseFloat(missedClasses) || 0;

    const total = classesPerWeekNum * hoursPerClass * totalWeeks;
    const missed = missedClassesNum * hoursPerClass;
    const percent = total > 0 ? ((total - missed) / total) * 100 : 0;

    setTotalHours(total);
    setMissedHours(missed);
    setAttendancePercent(Math.max(0, percent));
  }, [classesPerWeek, missedClasses]);

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-xl border border-foreground shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Attendance Tracker
      </h1>

      {/* Input fields */}
      <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 mb-6">
        <div className="flex flex-col sm:flex-1">
          <label className="text-foreground font-semibold mb-1">
            Pairs per week:
          </label>
          <input
            type="number"
            min={0}
            value={classesPerWeek}
            onChange={(e) => setClassesPerWeek(e.target.value)}
            className="w-full p-2 rounded-md border border-foreground focus:outline-none focus:ring-1 focus:ring-ring bg-input"
          />
        </div>

        <div className="flex flex-col sm:flex-1 mt-2 sm:mt-0">
          <label className="text-foreground font-semibold mb-1">
            Missed pairs:
          </label>
          <input
            type="number"
            min={0}
            value={missedClasses}
            onChange={(e) => setMissedClasses(e.target.value)}
            className="w-full p-2 rounded-md border border-foreground focus:outline-none focus:ring-1 focus:ring-ring bg-input"
          />
        </div>
      </div>

      {/* Result */}
      <div className="text-center mb-4">
        <p className="text-lg text-foreground">Attendance:</p>
        <p className="text-4xl font-bold text-primary">
          {attendancePercent.toFixed(1)}%
        </p>
      </div>

      {/* Progress Bar */}
      <ProgressBar percent={attendancePercent} />

      {/* Info */}
      <div className="mt-4 text-sm text-foreground text-center space-y-1">
        <p>Total course hours: {totalHours}h</p>
        <p>Missed hours: {missedHours}h</p>
        <p>1 pair = {hoursPerClass} hours</p>
        <p>Total weeks: {totalWeeks}</p>
      </div>
    </div>
  );
}
