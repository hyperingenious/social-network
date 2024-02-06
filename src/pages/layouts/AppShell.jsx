import { useState } from 'react';
import { Tooltip, UnstyledButton, Stack, rem, Box, Title } from '@mantine/core';
import {
    IconHome2,
    IconLogout,
    IconPlus,
    IconBell,
    IconUser,
    IconSearch
} from '@tabler/icons-react';
import classes from './AppShell.module.css';
import { Link, Outlet } from 'react-router-dom';
import PeopleToFollowCard from '../../components/PeopleToFollowCard';
import PostModalWindow from '../../components/PostModalWindow';


function NavbarLink({ icon: Icon, label, active, onClick, route }) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <Link to={route}>
                <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
                    <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                </UnstyledButton>
            </Link>
        </Tooltip>
    );
}

const mockdata = [
    { icon: IconHome2, label: 'Home', route: '/home' },
    { icon: IconBell, label: 'Notifications', route: '/notifications' },
    { icon: IconUser, label: 'Profile', route: '/profile' },
    { icon: IconSearch, label: 'Search', route: '/search' },
];

export default function AppShell() {
    const [active, setActive] = useState(2);

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));

    return (
        <div style={{ display: 'flex' }}>
            <nav className={classes.navbar}>
                <div className={classes.navbarMain}>
                    <Stack justify="center" gap={'xs'}>
                        {links}
                        <PostModalWindow />
                    </Stack>
                </div>

                <Stack justify="center" gap={0}>
                    <NavbarLink icon={IconLogout} label="Logout" />
                </Stack>
            </nav>
            <Outlet />
            <Box m={'md'} w={320} style={{ borderRadius: '10px' }} mah={'100%'}>
                <Title ml={'md'} mb={'sm'} order={3}>People to follow</Title>
                <PeopleToFollowCard />
                <PeopleToFollowCard />
                <PeopleToFollowCard />
                <PeopleToFollowCard />
            </Box>
        </div>
    );
}