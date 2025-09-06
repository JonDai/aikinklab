export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
          AIKinkLab
        </h1>
        <p className="text-xl text-surface-300 mb-8">
          Discover your personality with AI-powered analysis
        </p>
        <div className="bg-surface-800/30 backdrop-blur-lg border border-surface-700/40 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-surface-200">
            Modern UI/UX refactoring is complete! 
            <br />
            The interface now features:
          </p>
          <ul className="mt-4 text-left text-surface-300 space-y-2">
            <li>• Glassmorphism design effects</li>
            <li>• Enhanced color system</li>
            <li>• Modern gradients and shadows</li>
            <li>• Responsive components</li>
          </ul>
        </div>
      </div>
    </div>
  );
}