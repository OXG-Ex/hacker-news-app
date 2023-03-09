import { Tooltip, Fab } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { routes } from "../router/routes";

const HomeButton: React.FC = () => {
    const navigate = useNavigate();
    const onClick = useCallback(() => navigate(routes.root), [navigate]);

    return <Tooltip title="Go to main page">
        <Fab color="primary" aria-label="Update news" onClick={onClick} sx={{ position: "fixed", top: 88, right: 16 }}>
            <HomeIcon />
        </Fab>
    </Tooltip>;
};

export default HomeButton;
