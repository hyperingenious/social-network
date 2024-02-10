import { Group, Avatar, Text, Button, Box } from '@mantine/core';
import classes from './PeopleToFollowCard.module.css';
import { useToggle } from '@mantine/hooks';
import { extractInitials } from '../helpers/helpers';
import { followUser, unfollowUser } from '../supabase/features/followUser';
import { useSelector } from 'react-redux';

export default function PeopleToFollowCard({ toFollow }) {
    const [value, toggle] = useToggle(['Follow', 'Following']);
    const { auth: { authDetails: { id } } } = useSelector((store) => store);

    async function handleFollowUnfollow() {
        toggle();
        if (value === 'Follow') {
            await followUser({ follower: id, following: toFollow.id });
        }
        if (value === 'Following') { await unfollowUser({ follower: id, following: toFollow.id }) }
    }

    return (
        <Box className={classes.user}>
            <Group gap={0}>
                <Avatar mr={'xs'} color="cyan" radius="xl">{extractInitials(toFollow.name)}</Avatar>
                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {toFollow.name}
                    </Text>
                </div>

                <Button variant={value === 'Follow' ? 'filled' : 'outline'} size='xs' color="grape" onClick={handleFollowUnfollow} radius="xl">
                    {value}
                </Button>
            </Group>
        </Box>
    );
}