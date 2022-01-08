export const Colors = {
  black: "#171717",
  white: "#ffffff",
  gray: "#524f4e",
};

export const formatDate = (dateString: string) => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}/${month}/${day}`;
};

export const getSystemColor = (isDarkMode: boolean) => {
  return isDarkMode ? Colors.black : Colors.white;
};
