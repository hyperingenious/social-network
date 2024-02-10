import { Card, Avatar, Text, Group } from '@mantine/core';
import classes from './ProfileCard.module.css';
import { extractInitials } from '../helpers/helpers';
import { Link } from 'react-router-dom';


export default function ProfileCard({ profileBio }) {
    return (
        <Card padding="xl" radius="md" className={classes.card} bg={'#242424'}>
            <Avatar
                size={80}
                color="grape"
                radius={80}
                mx="auto"
                mt={-30}
                className={classes.avatar}
            >{extractInitials(profileBio.name)}</Avatar>
            <Text ta="center" fz="lg" fw={500} mt="sm">
                {profileBio.name}
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
                {profileBio.user_bio}
            </Text>
            <Group mt="md" justify="center" gap={30}>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {profileBio.followers}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Followers
                    </Text>
                </div >
                <div>

                    <Text ta="center" fz="lg" fw={500}>
                        {profileBio.following}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>Following</Text>
                </div>

                <div>
                    <Text ta="center" fz="lg" fw={500}>{profileBio.posts}</Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Posts
                    </Text>
                </div>
            </Group>
        </Card>
    );
}