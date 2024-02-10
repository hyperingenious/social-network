import { useEffect, useState } from 'react';
import { Tooltip, UnstyledButton, Stack, rem, Box, Title, Loader, Group } from '@mantine/core';
import {
    IconHome2,
    IconLogout,
    IconUser,
    IconSearch,
    IconUsersGroup
} from '@tabler/icons-react';
import classes from './AppShell.module.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import PeopleToFollowCard from '../../components/PeopleToFollowCard';
import PostModalWindow from '../../components/PostModalWindow';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeFeedPosts } from '../../redux/postSlice';
import { fetchPeopleToFollow } from '../../redux/peopleToFollowSlice';
import { fetchLogout } from '../../redux/authSlice';

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
    { icon: IconUser, label: 'Profile', route: '/profile' },
    { icon: IconSearch, label: 'Search', route: '/search' },
];

export default function AppShell() {
    const [active, setActive] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { auth: { authenticated, authDetails }, peopleToFollow: { status, peopleToFollow } } = useSelector((store) => store);

    useEffect(() => {
        if (!authenticated) { navigate('/register'); return }
        dispatch(fetchHomeFeedPosts())

        if (peopleToFollow.length === 0) {
            dispatch(fetchPeopleToFollow(authDetails.id))
        }
    }, [dispatch, navigate, authenticated, authDetails, peopleToFollow])

    const [screenSize, setScreenSize] = useState('large');

    useEffect(() => {
        const handleResize = () => {
            const newScreenSize = window.innerWidth <= 740 ? 'small' : 'large';
            setScreenSize(newScreenSize);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));

    function handleLogout() {
        dispatch(fetchLogout(navigate))
    }

    return (<>
        {screenSize === 'small' &&
            <>
                <Group w={'100%'} justify='space-around' p={'md'} style={{
                    position: 'fixed',
                    bottom: 0,
                    background: '#242424',
                    zIndex: 10
                }}>
                    <Link to={'/home'}>
                        <IconHome2 />
                    </Link>
                    <Link to={'/profile'}>
                        <IconUser />
                    </Link>
                    <Link to={'/peopleToFollow'}>
                        <IconUsersGroup />
                    </Link>
                    <Link to={'/logout'} onClick={handleLogout}>
                        <IconLogout />
                    </Link>
                </Group>

                <div style={{
                    position: 'fixed',
                    bottom: '7rem', right: '3rem'
                }}
                ><PostModalWindow /></div>
            </>}

        {authenticated && <div style={{ display: 'flex' }}>
            {
                screenSize === 'large' &&
                <nav className={classes.navbar}>
                    <div className={classes.navbarMain}>
                        <Stack justify="center" gap={'xs'}>
                            {links}
                            <PostModalWindow />
                        </Stack>
                    </div>

                    <Stack justify="center" gap={0} >
                        <Tooltip label={'logout'} position="right" transitionProps={{ duration: 0 }}>
                            <div onClick={handleLogout} className={classes.link} data-active={active || undefined}>
                                <IconLogout style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                            </div>
                        </Tooltip>
                    </Stack>
                </nav>}

            <Outlet />

            {
                screenSize === 'large' &&
                <>
                    {
                        status === 'loading' &&
                        <Box m={'md'} w={320} style={{ borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} mah={'100%'}>
                            <Loader />
                        </Box>
                    }

                    {status === 'finished' &&
                        <Box m={'md'} w={320} style={{ borderRadius: '10px' }} mah={'100%'}>
                            <Title ml={'md'} mb={'sm'} order={3}>People to follow</Title>
                            {
                                peopleToFollow.map((toFollow, i) => {
                                    if (toFollow.isFollowing) return null;
                                    if (!toFollow.isFollowing) { return <PeopleToFollowCard toFollow={toFollow} key={i} /> }
                                })
                            }
                        </Box>
                    }
                </>
            }
        </div>}
    </>
    );
}