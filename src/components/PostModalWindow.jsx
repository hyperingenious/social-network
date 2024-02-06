import { Avatar, Box, Modal, Textarea, Tooltip, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import classes from './PostModalWindow.module.css'

function PostModalWindow() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} radius={'md'} fw={500} centered>
                <Avatar mr={'xs'}
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                    radius="xl"
                />
                <Textarea
                    variant="unstyled"
                    size="lg"
                    fw={500}
                    autosize
                    placeholder="Create post"
                />
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
