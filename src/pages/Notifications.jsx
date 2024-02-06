import { Box, Divider, Title } from "@mantine/core"
import ContentShell from "./layouts/ContentShell"
import NotificationCard from "../components/NotificationCard";

function Notifications() {
    return (
        <ContentShell>
            <Box p={'md'}>
                <Title order={3} mb={'sm'}>Notifications</Title>
                <Divider />
                <NotificationCard type={'comment'} />
                <NotificationCard type={'like'} />
                <NotificationCard type={'comment'} />
                <NotificationCard type={'repost'} />
                <NotificationCard type={'comment'} />
            </Box>
        </ContentShell>
    )
}

export default Notifications
