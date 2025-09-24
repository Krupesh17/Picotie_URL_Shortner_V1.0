import supabase from "./supabase";

export async function uploadFile({ bucket_name, path, file }) {
  try {
    const { error: storageError } = await supabase.storage
      .from(bucket_name)
      .upload(path, file);

    if (storageError) throw storageError;
  } catch (error) {
    throw error;
  }
}

export async function deleteFile({ bucket_name, path }) {
  try {
    const { error: storageError } = await supabase.storage
      .from(bucket_name)
      .remove([path]);

    if (storageError) throw storageError;
  } catch (error) {
    throw error;
  }
}
