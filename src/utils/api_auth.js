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

export async function updateAccount(userData) {
  try {
    const { data, error } = await supabase.auth.updateUser(userData);

    if (error) throw error;

    return data;
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

export async function resetPassword({ email, changePasswordToken }) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/change-password?reset_token=${changePasswordToken}`,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function changePassword(new_password) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: new_password,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function changeEmail({ newEmail, changeEmailToken }) {
  try {
    const { data, error } = await supabase.auth?.updateUser(
      {
        email: newEmail,
        data: {
          email: newEmail,
        },
      },
      {
        emailRedirectTo: `${window.location.origin}/verify-email-change?change_email_token=${changeEmailToken}`,
      }
    );

    if (error) throw error;

    return data?.user;
  } catch (error) {
    throw error;
  }
}
