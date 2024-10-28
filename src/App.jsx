import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Gifconverter, RecrusiveGif} from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/gif" element={<Gifconverter />}/>
        <Route path="/recrusive" element={<RecrusiveGif />}/>
      </Routes>
    </BrowserRouter>
  );
}