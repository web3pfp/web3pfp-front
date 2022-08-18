import React from 'react';
import { Routes, Route } from "react-router-dom";
import {pathList} from "./path";

import UserRoutes from "./UserRoutes";

import MainPage from "../pages/MainPage";
import GalleryPage from "../pages/GalleryPage";

const Routers = () => {
    return (
        <>
            <Routes>
                <Route path={pathList.mainPage.path} element={<UserRoutes element={MainPage}/>}/>
                <Route path={pathList.gallery.path} element={<UserRoutes element={GalleryPage}/>}/>
            </Routes>
        </>
    );
};

export default Routers;