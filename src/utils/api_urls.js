import supabase, { supabaseUrl } from "./supabase";
import { uploadFile } from "./api_bucket";

export async function createNewShortURL({
  userId,
  title,
  longURL,
  customURL,
  qrCode,
}) {
  try {
    const short_url = Math.random().toString(36).substring(2, 6);
    const fileName = `${userId}/qr-${short_url}`;

    await uploadFile({
      bucket_name: "qr_codes",
      path: fileName,
      file: qrCode,
    });

    const qr_code_url = `${supabaseUrl}/storage/v1/object/public/qr_codes/${fileName}`;

    const { data, error: shortURLError } = await supabase
      .from("urls")
      .insert([
        {
          user_id: userId,
          title: title,
          original_url: longURL,
          custom_url: customURL || null,
          short_url,
          qr_code_url,
        },
      ])
      .select();

    if (shortURLError) throw shortURLError;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLongURL(url_slug) {
  try {
    const { data, error: longURLError } = await supabase
      .from("urls")
      .select("id, original_url")
      .or(`short_url.eq.${url_slug},custom_url.eq.${url_slug}`)
      .single();

    if (longURLError) throw longURLError;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteURL(url_id) {
  try {
    const { data, error } = await supabase
      .from("urls")
      .delete()
      .eq("id", url_id)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}
