import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-12">
        {children}
      </main>
      <Footer />
    </>
  );
} 