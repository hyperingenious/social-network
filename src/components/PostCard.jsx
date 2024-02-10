import { ActionIcon, Avatar, Button, Divider, Group, Modal, Stack, Text, Textarea, Title } from '@mantine/core';
import classes from './PostCard.module.css';
import { IconHeart, IconHeartFilled, IconMessageCircle2 } from '@tabler/icons-react';
import { extractInitials, formatDate } from '../helpers/helpers'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unLikePost } from '../supabase/features/likePost';
import { useDisclosure, useToggle } from '@mantine/hooks';
import { commentPost } from '../supabase/features/commentPost';
import { fetchReadComments } from '../redux/commentSlice';

function PostCard({ postDetails }) {
    const { auth: { authDetails: { id } } } = useSelector(store => store)
    const [opened, { open, close }] = useDisclosure(false);
    const [postComment, setPostComment] = useState('')

    const [likeCounter, setLikeCounter] = useState(postDetails.like)
    const [likeToggle, setLikeToggle] = useState(false)

    const [value, toggle] = useToggle([false, true])

    async function handleLikeClick() {
        if (!likeToggle) {
            setLikeCounter(like => Number(like) + 1);
            setLikeToggle(true);
            await likePost({ id, postid: postDetails.postid })
        }
        if (likeToggle) {
            setLikeCounter(like => Number(like) - 1)
            setLikeToggle(false)
            await unLikePost({ id, postid: postDetails.postid })
        }
    }

    async function handleCommentClick() {
        if (postComment.length === 0) return;
        await commentPost({ postid: postDetails.postid, id, comment: postComment, close })
    }

    return (
        <>
            <Group className={classes.postCard}>
                <Group gap={'xs'} align='start' wrap='no-wrap'>
                    <Avatar color="grape" size={'md'} radius="xl">{extractInitials(postDetails.name)}</Avatar>
                    <Stack
                        align="flex-start" gap={'4'}
                    >
                        <Group gap={'xs'}><Title order={6} c={'white'}>{postDetails.name}</Title>
                            <Text c={'dimmed'} size='sm' fw={400}>
                                {formatDate(postDetails.created_at)}
                            </Text>
                        </Group>
                        <Text size='md' c={'white'} onClick={toggle} >{postDetails.post_content}</Text>
                        <Group gap={150} w={'100%'} mt={'xs'}>

                            <Group gap={0} onClick={open}>
                                <ActionIcon variant="transparent" color="gray" radius="xl" aria-label="Settings">
                                    <IconMessageCircle2 style={{ width: '85%', height: '85%', stroke: 'white' }} stroke={2} />
                                </ActionIcon>
                                <Text>{postDetails.comment}</Text>
                            </Group>

                            <Group gap={0} onClick={handleLikeClick}>
                                <ActionIcon variant="transparent" color="gray" radius="xl" aria-label="Settings">
                                    {!likeToggle && <IconHeart style={{ width: '85%', height: '85%', stroke: 'white' }} stroke={2} />}
                                    {likeToggle && <IconHeartFilled style={{ width: '85%', height: '85%', stroke: 'white' }} stroke={2} />}
                                </ActionIcon>
                                <Text>{likeCounter}</Text>
                            </Group>
                        </Group>
                        <Divider />
                        {value && <Comments postid={postDetails.postid} />}
                    </Stack>
                </Group>
            </Group>


            <Modal opened={opened} onClose={close} radius={'md'} fw={500} centered>
                <Group>
                    <Avatar color="grape" mr={'xs'} radius="xl">{extractInitials(postDetails.name)}</Avatar>
                    <Textarea
                        value={postComment}
                        onChange={e => setPostComment(e.target.value)}
                        w={'100%'}
                        variant="unstyled"
                        size="lg"
                        fw={400}
                        autosize
                        placeholder="Write Comment"
                        maxLength={280}
                    />
                </Group>
                <Group justify="end">
                    <Button variant="filled" color="grape" radius="xl" onClick={handleCommentClick}>Comment</Button>
                </Group>
            </Modal>
        </>
    )
}

function Comments({ postid }) {
    const dispatch = useDispatch();
    const { comment: { comments } } = useSelector(store => store)

    useEffect(function () {
        dispatch(fetchReadComments(postid))
    }, [dispatch, postid])

    if (comments.length === 0) return null;
    if (comments.length > 0)
        return (
            <Stack w={'100%'} style={{ borderTop: '1px solid gray' }} >
                <Title order={4} my={'sm'}>Comments</Title>
                {
                    comments.map((comm, i) =>
                        <Stack key={i}
                            align="flex-start" gap={'4'}
                        >
                            <Avatar color="cyan" size={'md'} radius="xl">{extractInitials(comm.name)}</Avatar>
                            <Group gap={'xs'}><Title order={6} c={'white'}>{comm.name}</Title>
                                <Text c={'dimmed'} size='sm' fw={400}>
                                    {formatDate(comm.created_at)}
                                </Text>
                            </Group>
                            <Text size='md' c={'white'} >{comm.comment}</Text>
                        </Stack>
                    )
                }
            </Stack>
        )
}

export default PostCard