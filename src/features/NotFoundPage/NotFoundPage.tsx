import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Container, Stack, Typography } from '@mui/material';

const NotFoundPage: React.FC = () => {
    return <Container>
        <Stack direction='column' justifyContent="center" alignItems="center" sx={{ pt: "50px" }}>
            <SentimentVeryDissatisfiedIcon color="primary" sx={{ fontSize: "210px" }} />
            <Typography variant="h3" color="primary.main">Page not found</Typography>
        </Stack>

    </Container>;
};

export default NotFoundPage;
