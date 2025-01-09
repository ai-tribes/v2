import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { MainLayoutProps } from './MainLayout.types';

export function MainLayout({ children, headerProps = {}, footerProps = {} }: MainLayoutProps) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header {...headerProps} />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer {...footerProps} />
    </div>
  );
} 