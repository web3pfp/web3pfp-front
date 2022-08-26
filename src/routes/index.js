import React from 'react';
import { Routes, Route } from "react-router-dom";
import {pathList} from "./path";

import UserRoutes from "./UserRoutes";

import MainPage from "../pages/MainPage";
import GalleryPage from "../pages/GalleryPage";
import MintingPage from "../pages/MintingPage";
import ReplacePage from "../pages/ReplacePage";
import InfoPage from "../pages/InfoPage";

const Routers = () => {
    return (
        <>
            <Routes>
                <Route path={pathList.mainPage.path} element={<UserRoutes element={MainPage}/>}/>
                <Route path={pathList.gallery.path} element={<UserRoutes element={GalleryPage}/>}/>
                <Route path={pathList.minting.path} element={<UserRoutes element={MintingPage}/>}/>
                <Route path={pathList.replace.path} element={<UserRoutes element={ReplacePage}/>}/>
                <Route path={pathList.info.path} element={<UserRoutes element={InfoPage}/>}/>
                <Route path="*" element={<UserRoutes element={MainPage}/>}/>
            </Routes>
        </>
    );
};

export default Routers;