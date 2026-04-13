import "../src/index.css";
import "../src/App.css";
import Navbar from "../src/components/Navbar";
import SmoothScroll from "../src/components/SmoothScroll";
import Events from "../src/components/Events";

export const metadata = {
  title: "X-Celsior'26",
  description: "St. Xavier's Collegiate School Technology Festival",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <div className="app-container">
            <Navbar />
            <Events />
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
