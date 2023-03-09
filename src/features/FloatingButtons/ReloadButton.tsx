import { Tooltip, Fab } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import { useAppSelector } from "../../store/hooks";
import { getIsLoading } from "../../store/newsData/newsDataReducer";

export type ReloadButtonProps = {
    onClick: () => void;
};

const ReloadButton: React.FC<ReloadButtonProps> = ({ onClick }) => {
    const isNewsLoading = useAppSelector(getIsLoading);

    return <Tooltip title="Update news">
        <Fab color="primary" aria-label="Update news" onClick={onClick} sx={{ position: "absolute", top: 16, right: 16 }} hidden={!isNewsLoading}>
            <UpdateIcon />
        </Fab>
    </Tooltip>;
};

export default ReloadButton;
