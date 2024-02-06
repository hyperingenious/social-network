import { Card, Avatar, Text, Group, Button } from '@mantine/core';
import classes from './ProfileCard.module.css';

const stats = [
    { value: '34K', label: 'Followers' },
    { value: '187', label: 'Follows' },
    { value: '1.6K', label: 'Posts' },
];

export default function ProfileCard() {
    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text ta="center" fz="lg" fw={500}>
                {stat.value}
            </Text>
            <Text ta="center" fz="sm" c="dimmed" lh={1}>
                {stat.label}
            </Text>
        </div>
    ));

    return (
        <Card padding="xl" radius="md" className={classes.card} bg={'#242424'}>
            <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                size={80}
                radius={80}
                mx="auto"
                mt={-30}
                className={classes.avatar}
            />
            <Text ta="center" fz="lg" fw={500} mt="sm">
                Bill Headbanger
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, repellendus.
            </Text>
            <Group mt="md" justify="center" gap={30}>
                {items}
            </Group>
            <Button fullWidth radius="md" mt="xl" size="md" variant="default">
                Following
            </Button>
        </Card>
    );
}