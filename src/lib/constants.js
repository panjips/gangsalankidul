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

export const selisihDate = (date1) => {
  let date2 = new Date();
  let timeDiff = date2 - new Date(date1);
  let dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (dayDiff === 0) {
    return "Hari ini";
  } else if (dayDiff === 1) {
    return "Kemarin";
  } else if (dayDiff < 30) {
    return dayDiff + " hari lalu";
  } else if (dayDiff < 365) {
    let monthDiff = Math.floor(dayDiff / 30);
    return monthDiff + " bulan lalu";
  } else {
    let yearDiff = Math.floor(dayDiff / 365);
    return yearDiff + " tahun lalu";
  }
};
