import supabase from "./supabase";
import { getUserDeviceType } from "@/helpers/userDeviceTypeDetector";

export async function createClick(url_id) {
  try {
    const device = getUserDeviceType();

    const response = await fetch("https://ipapi.co/json");
    const { city, region, country_name: country } = await response.json();
    const { data, error } = await supabase
      .from("clicks")
      .insert([
        {
          url_id: url_id,
          country: country?.toLowerCase(),
          region: region?.toLowerCase(),
          city: city?.toLowerCase(),
          device: device?.toLowerCase(),
        },
      ])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getClicksByURLId(url_id) {
  try {
    const { data, error } = await supabase
      .from("clicks")
      .select("*")
      .eq("url_id", url_id);

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}
