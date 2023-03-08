import { Routes, Route } from "react-router-dom";
import { MainPage } from "../MainPage/MainPage";
import { routes } from "./routes";

export const Router: React.FC = () => {
    return <Routes>
        <Route path={routes.root} element={<MainPage />} />
        {/* <Route path={routes.news} element={<News />} />*/}
    </Routes>;
};
