import supabase from "./supabase";

export async function createAccount({ name, email, password }) {
  try {
    const { data: userData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (signUpError) throw signUpError;

    return userData;
  } catch (error) {
    throw error;
  }
}

export async function logIn({ email, password }) {
  try {
    if (!email || !password) {
      throw new Error("Please fill in all required fields to continue.");
    }

    const { data: userData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) throw signInError;

    return userData?.user;
  } catch (error) {
    throw error;
  }
}

export async function logOut() {
  try {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) throw signOutError;
  } catch (error) {
    throw error;
  }
}
