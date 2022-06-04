import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addlist from "./Components/Addlist";
import List from "./Components/List";
import Update from "./Components/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Addlist />} />
          <Route path="/list" element={<List />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
