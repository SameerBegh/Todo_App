import React from "react";
import { Route, Routes } from "react-router-dom";
import Container from "./Components/Container";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Container />} />
      </Routes>
    </>
  );
}
export default App;
