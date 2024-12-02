import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Gifconverter, RecrusiveGif, ImageViewer, TagViewer, AudioViewer} from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/gif" element={<Gifconverter />}/>
        <Route path="/recrusive/:recrusive_id" element={<RecrusiveGif />}/>
        <Route path="/image/:image_id" element={<ImageViewer />} />
        <Route path="/tag/:tag_id" element={<TagViewer />} />
        <Route path="/audio" element={<AudioViewer />} />
      </Routes>
    </BrowserRouter>
  );
}