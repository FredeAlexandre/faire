export function deleteCookie(name: string): void {
  const cookies = document.cookie
    .split("; ")
    .reduce<Record<string, string>>((acc, cookie) => {
      const [key, value] = cookie.split("=");
      if (key && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

  if (cookies[name]) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
