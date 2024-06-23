export const deslugify = (slug) => {
  let realName = slug.replace(/-/g, " ");
  realName = realName.replace(/\b\w/g, (char) => char.toUpperCase());
  return realName;
};

export const getExternalNews = async (tpye) => {
  try {
    const response = await fetch(`api/external?type=${tpye}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    return null;
  }
};

export const toNanosecond = (date) => {
  return date?.seconds * 1000 + date?.nanoseconds / 1000000;
};

export const getPathImageFromURL = (url) => {
  return url.split("/o/")[1].split("?")[0].replaceAll("%2F", "/");
};
