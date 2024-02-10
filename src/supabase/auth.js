import { notifications } from "@mantine/notifications";
import { supabase } from "./supabase";

export async function signUp({ name, userbio, email, password }) {

  let { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    throw error
  }

  // Creating a user table
  const { error: userError } = await supabase
    .from('UserTable')
    .insert([
      { id: data.user.id, created_at: new Date().toISOString(), username: name.split(' ').join(''), name, user_bio: userbio },
    ])
    .select()
  if (userError) {
    throw userError;
  }


  notifications.show({
    title: 'Account has been registred',
    message: 'Check email to verify account',
  })
  window.location.reload();
  
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error);

  notifications.show({
    title: 'Logged in successfull ',
    message: 'Welcome back!',
  })
  window.location.reload();

  return data;
}

export async function logout(navigate) {
  let { error } = await supabase.auth.signOut();
  if (error) throw error;
  navigate('/register')
  notifications.show({
    title: 'Logout ',
    message: 'User logged out successfully',
  })
  return null;
}

export async function getUser() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) throw Error("Session not found, login in again");

  await supabase.auth.getUser();

  return data.session.user;
}