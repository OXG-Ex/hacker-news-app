import { Tooltip, Fab } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { routes } from "../router/routes";
import { FloatingButtonProps } from "./ReloadButton";

const HomeButton: React.FC<FloatingButtonProps> = ({ top, right }) => {
    const navigate = useNavigate();
    const onClick = useCallback(() => navigate(routes.root), [navigate]);

    return <Tooltip title="Go to main page">
        <Fab color="primary" aria-label="Update news" onClick={onClick} sx={{ position: "absolute", top: top || 88, right: right || 16 }}>
            <HomeIcon />
        </Fab>
    </Tooltip>;
};

export default HomeButton;
