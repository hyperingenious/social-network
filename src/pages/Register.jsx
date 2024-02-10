import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Text, Paper, Group, Button, Anchor, Stack, Box, } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, fetchRegister, fetchSession } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [type, toggle] = useToggle(['register', 'login',]);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            userbio: '',
            password: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const { authenticated } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(
        function () {
            if (authenticated) navigate('/home');
            if (!authenticated) dispatch(fetchSession());
        },
        [dispatch, authenticated, navigate]
    );

    function onSubmit(e) {
        console.log(e)
        if (type === 'login') {
            dispatch(fetchLogin({ email: e.email, password: e.password }))
        }
        if (type === 'register') {
            dispatch(fetchRegister({ email: e.email, password: e.password, name: e.name, userbio: e.userbio }))
        }
    }

    return (
        <Box
            style={() => ({
                height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
            })}>
            <Paper radius="md" p="xl" mx={'xl'} withBorder maw={320}>
                <Text size="lg" fw={500} mb={'lg'} style={{ textAlign: 'center' }}>
                    Welcome, {type}
                </Text>

                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack>
                        {type === 'register' && (
                            <>
                                <TextInput
                                    color='grape'
                                    label="Name"
                                    placeholder="Your name"
                                    value={form.values.name}
                                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                    radius="md"
                                    maxLength={20}
                                />
                                <TextInput
                                    color='grape'
                                    label="User bio"
                                    placeholder="User Bio"
                                    value={form.values.userbio}
                                    onChange={(event) => form.setFieldValue('userbio', event.currentTarget.value)}
                                    radius="md"
                                    maxLength={50}
                                />
                            </>
                        )}

                        <TextInput
                            color='grape'
                            required
                            label="Email"
                            placeholder="hello@example.com"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                        />

                        <PasswordInput
                            color='grape'
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                        />
                    </Stack>

                    <Group justify="space-between" mt="lg">
                        <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Group justify="flex-end" w={'100%'}>
                            <Button type="submit" color='grape' radius="xl">
                                {upperFirst(type)}
                            </Button>
                        </Group>
                    </Group>
                </form>
            </Paper>
        </Box>
    );
}