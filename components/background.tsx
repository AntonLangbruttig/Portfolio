import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex-1"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        filter: 'brightness(70%)', // Add tint by adjusting brightness
      }}
    >
      {children}
    </div>
  );
}