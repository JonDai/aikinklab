import dynamic from 'next/dynamic';

// Lazy load TestEngine as it's heavy and only needed on this page
const TestEngine = dynamic(() => import('@/components/test/TestEngine').then(mod => ({ default: mod.TestEngine })), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/10 animate-pulse" />
        <div className="h-4 w-32 mx-auto bg-surface-700/50 animate-pulse rounded" />
        <div className="h-2 w-24 mx-auto mt-2 bg-surface-800/50 animate-pulse rounded" />
      </div>
    </div>
  ),
  ssr: false
});

export default function TestPage() {
  return <TestEngine />;
}