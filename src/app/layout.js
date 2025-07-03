import Navbar from '../component/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import './globals.css';

export const metadata = {
  title: 'Blog App',
  description: 'Next.js Blog App with Auth',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
