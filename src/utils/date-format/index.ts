export const dateFormatByMonth = (date: Date): string => {
    const month = [
      'yanvar',
      'fevral',
      'mart',
      'aprel',
      'may',
      'iyun',
      'iyul',
      'avgust',
      'sentabr',
      'oktabr',
      'noyabr',
      'dekabr'
    ];
    const year = date.getFullYear();
    return `${date.getDate()} ${month[date.getMonth()]}, ${year}-yil`;
  };
  
export const dateFormat = (date: Date, separator: string = '.'): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return day + separator + month + separator + year;
};
  