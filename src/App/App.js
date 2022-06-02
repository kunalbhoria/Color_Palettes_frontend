import React from "react";
import './App.css';

import { Routes, Route,useLocation,useNavigate} from "react-router-dom";
import colorSeeds from '../seeds/palettesColors';

import Palette from "./Palette";
import PaletteList from "./PaletteList";
import AddNewPalette from "./newPalette/AddNewPalette";
import SingleColorPalette from "./SingleColorPalette";
import ErrorPage from "./ErrorPage";
import {CSSTransition, TransitionGroup } from "react-transition-group";
// import ErrorBoundary from "./ErrorBoundary";

function App() {
let location = useLocation();
let navigate = useNavigate();
  return (<div>
<TransitionGroup>
  <CSSTransition key={location.key} classNames="page" timeout={300}>
      <Routes location={location}>
        <Route path="/"  element={<Page ><PaletteList /></Page>} />
        <Route path="/palette/:type/:paletteId" element={<Page ><Palette /></Page>} />
        <Route path="/palette/add/new" element={<Page ><AddNewPalette palettes={colorSeeds}  /></Page>} />
        <Route path="/palette/:type/:paletteId/:colorId" element={<Page ><SingleColorPalette  /></Page>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      </CSSTransition>
</TransitionGroup>
    </div>)
}

function Page(props){

  return  <section className="page">{props.children}</section> ;
  

}

export default App ;
