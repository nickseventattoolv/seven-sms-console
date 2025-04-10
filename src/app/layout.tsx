import './globals.css';
import Matrix from './components/Matrix';

export const metadata = {
  title: 'Seven Tattoo Studio SMS Console',
  description: 'Send secure messages with style',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen text-white font-sans overflow-hidden">
        {/* Matrix background behind everything */}
        <div className="absolute inset-0 -z-10">
          <Matrix />
        </div>

        {/* Main content above background */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

