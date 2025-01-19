import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  const divStyle = {
    backgroundImage: `url('/images/background.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    filter: 'brightness(70%)', // Add tint by adjusting brightness
  };

  return (
    <div className="fixed inset-0 z-[-1] " style={divStyle}>
      {children}
    </div>
  );
}