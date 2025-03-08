import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 -z-10 bg-[url('/images/background.jpg')] bg-cover bg-no-repeat bg-center bg-fixed brightness-75">
      {children}
    </div>
  );
}
