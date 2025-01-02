import { ReactNode } from "react";

interface ILayoutPageProps {
  children: ReactNode | undefined;
}

const LayoutPage: React.FC<ILayoutPageProps> = ({ children }) => {
  return (
    <div className="min-h-screen rounded-md border border-solid border-gray-200 bg-white p-4 dark:rounded-sm dark:border-dark-600 dark:bg-dark-700">
      {children}
    </div>
  );
};

export default LayoutPage;
