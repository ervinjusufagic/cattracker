export const Colors = {
  black: "#171717",
  white: "#ffffff",
  gray: "#524f4e",
};

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return `${year}/${month}/${day}`;
};

export const getSystemColor = (isDarkMode: boolean) => {
  return isDarkMode ? Colors.black : Colors.white;
};
