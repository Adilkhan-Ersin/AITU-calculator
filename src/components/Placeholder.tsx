export default function PlaceholderCalculator({ subject } : { subject: string }) {
  return (
    <div className="rounded-xl bg-[#FEF3E2] p-8 text-center border border-dark">
      <h2 className="text-3xl font-bold mb-4">{subject} Calculator</h2>
      <p className="text-dark">
        The detailed grade calculator for this subject has not been built yet.
      </p>
    </div>
  );
}