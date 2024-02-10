import { Avatar, Box, Button, Group, Modal, Textarea, Tooltip, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import classes from './PostModalWindow.module.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreatePost } from "../redux/postSlice";

function PostModalWindow() {
    const [opened, { open, close }] = useDisclosure(false);
    const [postContent, setPostContent] = useState('')
    const dispatch = useDispatch();
    const { auth: { authDetails: { id } }, post: { status } } = useSelector(store => store)

    function handleCreatePost() {
        if (postContent.length === 0)
            return;
        dispatch(fetchCreatePost({ id, postContent, close }))
        setPostContent('')
    }

    return (
        <>
            <Modal opened={opened} onClose={close} radius={'md'} fw={500} centered>
                <Group>
                    <Avatar mr={'xs'}
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                        radius="xl"
                    />
                    <Textarea
                        value={postContent}
                        onChange={e => setPostContent(e.target.value)}
                        w={'100%'}
                        variant="unstyled"
                        size="lg"
                        fw={400}
                        autosize
                        placeholder="Create post"
                        maxLength={280}
                    />
                </Group>
                <Group justify="end">
                    <Button loading={status === 'loading'} variant="filled" color="grape" onClick={handleCreatePost} radius="xl">Post</Button>
                </Group>
            </Modal>

            <Tooltip onClick={open} label={'Create Post'} position="right" transitionProps={{ duration: 0 }}>
                <Box className={classes.createPost}>
                    <IconPlus style={{ width: rem(25), height: rem(25) }} stroke={2} />
                </Box>
            </Tooltip>
        </>
    );
}

export default PostModalWindow
