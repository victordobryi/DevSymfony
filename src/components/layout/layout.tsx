import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 to-blue-200 items-center justify-center'>
      <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg'>
        <h1 className='text-3xl font-bold text-center text-indigo-700 mb-8'>Факты о числах</h1>
        <main className='flex-1 flex items-center justify-center p-4'>{children}</main>
      </div>
    </div>
  );
};
