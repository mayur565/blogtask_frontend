import Navbar from '../component/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "@/context/AuthContext";
import './globals.css';

export const metadata = {
  title: 'Blog App',
  description: 'Next.js Blog App with Auth',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
