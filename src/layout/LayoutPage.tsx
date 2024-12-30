import { ReactNode } from "react";

interface ILayoutPageProps {
  children: ReactNode | undefined;
}

const LayoutPage: React.FC<ILayoutPageProps> = ({ children }) => {
  return (
    <div className="dark:bg-dark-700 dark:border-dark-400 min-h-screen rounded-md border border-solid border-gray-200 bg-white p-3">
      {children}
    </div>
  );
};

export default LayoutPage;
