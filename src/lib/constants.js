export const deslugify = (slug) => {
  let realName = slug.replace(/-/g, " ");
  realName = realName.replace(/\b\w/g, (char) => char.toUpperCase());
  return realName;
};
