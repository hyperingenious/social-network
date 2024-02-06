import { Avatar, Box, Divider, Group, Text } from "@mantine/core";
import classes from './NotificationCard.module.css';
import { IconHeartFilled, IconMessageCircle2, IconRepeat } from "@tabler/icons-react";

function Icon({ type }) {
    return (
        <>
            {
                type === 'like' &&
                <IconHeartFilled size={30} stroke={1.5} style={{ color: "#c2255c" }} />
            }
            {
                type === 'comment' &&
                <IconMessageCircle2 size={30} stroke={1.5} style={{ color: "#099268" }} />
            }
            {
                type === 'repost' &&
                <IconRepeat size={30} stroke={1.5} style={{ color: "#0c8599" }} />
            }
        </>
    )
}


function NotificationCard({ type }) {
    return (
        <>
            <Box className={classes.user}>
                <Group gap={0}>
                    <Group align="start">
                        <Icon type={type} />
                        <Group style={{ flexDirection: 'column' }} gap={'sm'}>
                            <Group gap={0}>
                                <Avatar mr={'xs'}
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                                    radius="xl"
                                />
                                <div style={{ flex: 1 }}>
                                    <Text size="sm" fw={500}>Harriette Spoonlicker</Text>
                                    <Text c="dimmed" size="xs" fw={500}>@Jlaniu</Text>
                                </div>
                            </Group>
                            <Text c={'dimmed'} size="sm" fw={500}>
                                {type === 'like' ? 'like' : null
                                    || type === 'comment' ? 'commented' : null || 'repost'} one of your post</Text>
                        </Group>
                    </Group>
                </Group>

            </Box>
            <Divider />
        </>
    )
}

export default NotificationCard
