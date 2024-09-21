export const base_url = "http://127.0.0.1:8080";

export function getValueFromCookie(cookie_exported: string) {
  const cookie_exported_splited = cookie_exported.split(";");
  if (cookie_exported_splited.length < 1) return null;
  const only_key_value = cookie_exported_splited[0];
  if (!only_key_value) return null;
  const only_key_value_splited = only_key_value.split("=");
  if (cookie_exported_splited.length < 2) return null;
  const value = only_key_value_splited[1];
  if (!value) return null;
  return value;
}
