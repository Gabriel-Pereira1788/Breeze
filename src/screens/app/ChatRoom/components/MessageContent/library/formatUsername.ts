export function formatUsername(username: string) {
  if (username.length > 50) {
    return "@" + username.slice(0, 49) + "...";
  }

  return "@" + username;
}
