import { useState, useEffect } from "react";

const totalWeeks = 10;
const hoursPerClass = 2;

const ProgressBar = ({ percent }: { percent: number }) => {
  let color = "";
  if (percent < 70) color = "bg-red-400";
  else if (percent < 90) color = "bg-yellow-400";
  else color = "bg-green-400";

  return (
    <div className="w-full bg-accent h-6 rounded-md overflow-hidden">
      <div
        className={`${color} h-full`}
        style={{ width: `${percent}%`, transition: "width 0.3s" }}
      />
    </div>
  );
};

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
    <div className="px-4 pt-4 sm:px-8 sm:pt-8">
      <div className="bg-card rounded-xl p-6 shadow-lg border border-foreground">
      <h3 className="text-xl font-bold text-foreground mb-3">Attendance Tracker</h3>

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

      <div className="text-center mb-4">
        <p className="text-lg text-foreground">Attendance:</p>
        <p className="text-4xl font-bold text-primary">
          {attendancePercent.toFixed(1)}%
        </p>
      </div>

      <ProgressBar percent={attendancePercent} />

      <div className="mt-4 text-sm grid grid-cols-1 sm:grid-cols-2 sm:gap-1 text-foreground text-left">
        <p>Total course hours: {totalHours}h</p>
        <p>Missed hours: {missedHours}h</p>
        <p>1 pair = {hoursPerClass} hours</p>
        <p>Total weeks: {totalWeeks}</p>
      </div>
      <div className="mt-2 text-sm text-foreground text-right">
        <p>Credits to <a href="https://t.me/Ferum_m" className="text-primary" target="_blank" rel="noopener noreferrer">Ferumm</a></p>
      </div>
      </div>
    </div>
  );
}