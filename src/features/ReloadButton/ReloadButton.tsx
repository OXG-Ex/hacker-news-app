import { Snackbar, Tooltip, Fab } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import { useAppSelector } from "../../store/hooks";
import { getIsLoading } from "../../store/newsData/newsDataReducer";

export type ReloadButtonProps = {
    onClick: () => void;
};

const ReloadButton: React.FC<ReloadButtonProps> = ({ onClick }) => {
    const isNewsLoading = useAppSelector(getIsLoading);

    return <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={!isNewsLoading}
        transitionDuration={1000}
    >
        <Tooltip title="Update news">
            <Fab color="primary" aria-label="Update news" onClick={onClick}>
                <UpdateIcon />
            </Fab>
        </Tooltip>
    </Snackbar>;
};

export default ReloadButton;
