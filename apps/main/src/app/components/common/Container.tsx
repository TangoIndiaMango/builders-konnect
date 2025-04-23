import React from 'react';
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={`relative w-full px-10 py-5 bg-white min-h-[120px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
