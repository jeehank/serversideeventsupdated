import "../src/index.css";
import "../src/App.css";
import Navbar from "../src/components/Navbar";
import SmoothScroll from "../src/components/SmoothScroll";

export const metadata = {
  title: "tmp-app",
  description: "Next.js Migration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <div className="app-container">
            <Navbar />
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
