export default function PlaceholderCalculator({ subject } : { subject: string }) {
  return (
    <div className="rounded-xl bg-background p-8 text-center border border-foreground">
      <h2 className="text-3xl font-bold mb-4">{subject} Calculator</h2>
      <p className="text-foreground">
        The detailed grade calculator for this subject has not been built yet.
      </p>
    </div>
  );
}