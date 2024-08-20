// const AuthLayout = ({ children }: { children: React.ReactNode }) => {
//     return <div className="bg-red-500 h-full">{children}</div>;
// };

// export default AuthLayout;

import React, { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
  }

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      {children}
    </div>
  );
};

export default AuthLayout;
