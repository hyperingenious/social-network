import { Group, Avatar, Text, Button, Box } from '@mantine/core';
import classes from './PeopleToFollowCard.module.css';

export default function PeopleToFollowCard() {
    return (
        <Box className={classes.user}>
            <Group gap={0}>
                <Avatar mr={'xs'}
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                    radius="xl"
                />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        Harriette Spoonlicker
                    </Text>

                    <Text c="dimmed" size="xs" fw={500}>
                        @Jlaniu                    </Text>
                </div>

                <Button variant="filled" size='xs' color="grape" radius="xl">Follow</Button>
            </Group>
        </Box>
    );
}