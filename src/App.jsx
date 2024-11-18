import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Gifconverter, RecrusiveGif, ImageViewer} from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/gif" element={<Gifconverter />}/>
        <Route path="/recrusive" element={<RecrusiveGif />}/>
        <Route path="/image/:image_id" element={<ImageViewer />} />
      </Routes>
    </BrowserRouter>
  );
}