export default function Footer() {
  return (
    <footer className="text-dark relative w-full pb-5 font-sans">
      <div className='max-w-4xl mx-auto flex justify-center gap-x-4'>
        <a href="https://www.instagram.com/adilikecious/" target="_blank" rel="noopener noreferrer"><img src="/instagram.svg" className="w-10 hover:scale-110 transition-all" alt="Instagram" /></a>
        <a href="https://t.me/safemys" target="_blank" rel="noopener noreferrer"><img src="/telegram.svg" className="w-10 hover:scale-110 transition-all" alt="Telegram" /></a>
        <a href="mailto:253209@astanait.edu.kz" target="_blank" rel="noopener noreferrer"><img src="/envelope.svg" className="w-10 hover:scale-110 transition-all" alt="Email" /></a>
      </div>
      <p className="text-center text-dark text-sm mt-4">
        &copy; 2025. All rights couldn't be reserved. 
      </p>
    </footer>
  );
}