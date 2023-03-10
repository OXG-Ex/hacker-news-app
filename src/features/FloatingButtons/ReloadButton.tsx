import { Tooltip, Fab, Fade } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import { useAppSelector } from "../../store/hooks";
import { getIsLoading } from "../../store/newsData/newsDataReducer";

export type FloatingButtonProps = {
    top?: number;
    right?: number;
};

export type ReloadButtonProps = FloatingButtonProps & {
    onClick: () => void;
};

const ReloadButton: React.FC<ReloadButtonProps> = ({ onClick }) => {
    const isLoading = useAppSelector(getIsLoading);

    return <Fade in={!isLoading}>
        <Tooltip title="Update news">
            <Fab color="primary" aria-label="Update news" onClick={onClick} sx={{ position: "absolute", top: 16, right: 16 }}>
                <UpdateIcon />
            </Fab>
        </Tooltip>
    </Fade>;
};

export default ReloadButton;
