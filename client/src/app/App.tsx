import React, { useState } from "react";
import Routes from "../routes/Routes";
import { Viewer } from "../lib/types";

import "antd/dist/antd.css";
import "./style.css";

const initialViewer: Viewer = {
    "id": null,
    "token": null,
    "avatar": null,
    "hasWallet": null,
    "didRequest": false,
};

const App = () => {
    const [viewer, setViewer] = useState<Viewer>(initialViewer);
    console.log(viewer, "viewer");
    
    return (
        <>
            <Routes 
                setViewer={setViewer}
            />
        </>
    );
};

export default App;