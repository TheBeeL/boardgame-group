import Navbar from "@components/Navbar";
import AuthContext from "app/AuthContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <AuthContext>
          <div className="container pt-2 pb-5">
            <Navbar className="mb-2" />
            {children}
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
