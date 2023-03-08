import { loadNews } from "../../sagas/newsSagaActions";
import { useAppDispatch } from "../../store/hooks";

export const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();

    dispatch(loadNews());
    return <div></div>;
};
