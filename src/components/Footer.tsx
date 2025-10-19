// import necessary libraries and icons
export default function Footer() {
  return (
    <footer className="text-foreground relative w-full p-4 sm:p-8 font-sans">
      <div className="mb-4 sm:mb-8 p-4 bg-card rounded-lg border border-foreground">
        <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">ФОРМУЛА РАСЧЁТА ИТОГОВОЙ ОЦЕНКИ:</h3>
        <ul className="list-disc list-inside text-foreground text-sm sm:text-base space-y-1 mb-3">
          <li>Тотал = (регмид * 0,3) + (регэнд * 0,3) + (файнал * 0,4 )</li>
          <li>Регтерм = (регмид + регэнд) / 2</li>
        </ul>
        <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">УСЛОВИЯ ДОПУСКА / КРИТЕРИЙ:</h3>
        <ul className="list-disc list-inside text-sm sm:text-base text-foreground space-y-1 mb-3">
          <li>Тотал больше 90 — повышенная стипендия (60к)</li>
          <li>Тотал меньше 70 — минус стипендия</li>
          <li>Тотал меньше 50 — летник</li>
          <li>Регтерм меньше 50 — летник</li>
          <li>РегМид (1st Attestation Score) меньше 25 — летник</li>
          <li>РегЭнд (2nd Attestation Score) меньше 25 — летник</li>
        </ul>
        <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">При обнаружении списывания — <span className="text-primary">ОТЧИСЛЕНИЕ.</span></h3>
      </div>
      <p className="text-center text-foreground text-sm mt-4">
        &copy; 2025. All rights couldn't be reserved. 
      </p>
    </footer>
  );
}
