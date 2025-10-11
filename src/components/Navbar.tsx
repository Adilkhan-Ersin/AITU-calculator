export default function Navbar({ subjects, selectedSubject, onSelectSubject }: { subjects: string[], selectedSubject: string, onSelectSubject: (subject: string) => void }) {
  return (
    <nav className="flex justify-center items-center py-4 border-y-2 border-dark border-dashed">
      <ul className="flex flex-wrap gap-2 sm:gap-x-4 justify-center">
        {subjects.map((subject) => (
          <li key={subject}>
            <button
              onClick={() => onSelectSubject(subject)}
              // Dynamically apply classes based on whether the button's subject is selected
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-dark md:text-sm text-xs font-semibold transition-colors ${
                selectedSubject === subject 
                  ? 'bg-[#B95E82] text-dark' 
                  : 'bg-[#FFC29B] text-dark hover:bg-[#B95E82]'
              }`}
            >
              {subject}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}