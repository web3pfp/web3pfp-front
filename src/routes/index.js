import React from 'react';
import { Routes, Route } from "react-router-dom";
import {pathList} from "./path";

import UserRoutes from "./UserRoutes";

import MainPage from "../pages/MainPage";
import GalleryPage from "../pages/GalleryPage";
import MintingPage from "../pages/MintingPage";
import ReplacePage from "../pages/ReplacePage";
import InfoPage from "../pages/InfoPage";
import LegalPage from "../pages/LegalPage";

const Routers = () => {
    return (
        <>
            <Routes>
                <Route path={pathList.mainPage.path} element={<UserRoutes element={MainPage}/>}/>
                <Route path={pathList.gallery.path} element={<UserRoutes element={GalleryPage}/>}/>
                <Route path={pathList.minting.path} element={<UserRoutes element={MintingPage}/>}/>
                <Route path={pathList.replace.path} element={<UserRoutes element={ReplacePage}/>}/>
                <Route path={pathList.info.path} element={<UserRoutes element={InfoPage}/>}/>
                <Route path={pathList.privacy.path} element={<UserRoutes element={LegalPage} page="privacy"/>}/>
                <Route path={pathList.terms.path} element={<UserRoutes element={LegalPage} page="terms"/>}/>
                <Route path={pathList.disclaimer.path} element={<UserRoutes element={LegalPage} page="disclaimer"/>}/>
                <Route path={pathList.cookies.path} element={<UserRoutes element={LegalPage} page="cookies"/>}/>
                <Route path="*" element={<UserRoutes element={MainPage}/>}/>
            </Routes>
        </>
    );
};

export default Routers;