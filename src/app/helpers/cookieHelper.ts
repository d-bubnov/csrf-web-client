import { CookieEntry } from "../models/cookieEntry";

export const getCookie = (name: string): string | null => {
  let cookieValue = null;
  if (name && document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let index = 0; index < cookies.length; index++) {
      const cookie = cookies[index].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}
  
export const getAllCookies = (): CookieEntry[] => {
  const result: CookieEntry[] = [];
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');

    for (let index = 0; index < cookies.length; index++) {
      const [ name, value ] = cookies[index].trim().split('=');
      result.push({ name, value });
    }
  }

  return result;
}
