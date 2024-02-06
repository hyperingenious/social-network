import { ActionIcon, Avatar, Group, Stack, Text, Title } from '@mantine/core';
import classes from './PostCard.module.css';
import { IconHeart, IconMessageCircle2, IconRepeat } from '@tabler/icons-react';

function PostCard() {
    return (
        <Group className={classes.postCard}>
            <Group gap={'xs'} align='start' wrap='no-wrap'>
                <Avatar color="grape" size={'md'} radius="xl">MK</Avatar>
                <Stack
                    align="flex-start" gap={'4'}
                >
                    <Group gap={'xs'}><Title order={6} c={'white'}>Saurav Meghwal</Title>
                        <Text c={'dimmed'} size='sm' fw={400}>
                            4 Feb
                        </Text>
                    </Group>
                    <Text size='md' c={'white'} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptatem beatae maiores corrupti aspernatur voluptas nulla, enim atque cum, itaque rem aliquam at esse, animi molestias sit ullam dolorem modi earum a hello well friend I'm the skeleotn returning from the dead determined to be relevent again so I'm folld. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae veritatis mollitia quaerat.</Text>
                    <Group gap={150} w={'100%'} mt={'xs'}>

                        <Group gap={0}>
                            <ActionIcon variant="transparent" color="gray" radius="xl" aria-label="Settings">
                                <IconMessageCircle2 style={{ width: '85%', height: '85%', stroke:'white' }} stroke={2}/>
                            </ActionIcon>
                            <Text>23</Text>
                        </Group>

                        <Group gap={0}>
                            <ActionIcon variant="transparent" color="gray" radius="xl" aria-label="Settings">
                                <IconRepeat style={{ width: '85%', height: '85%', stroke:'white' }} stroke={2} />
                            </ActionIcon>
                            <Text>23</Text>

                        </Group>

                        <Group gap={0}>
                            <ActionIcon variant="transparent" color="gray" radius="xl" aria-label="Settings">
                                <IconHeart style={{ width: '85%', height: '85%', stroke:'white' }} stroke={2} />
                            </ActionIcon>
                            <Text>23</Text>
                        </Group>
                    </Group>
                </Stack>
            </Group>
        </Group>
    )
}

export default PostCard