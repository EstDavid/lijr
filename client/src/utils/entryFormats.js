import moment from 'moment';

export const getDate = (entry) => {
  return entry.journaledDate ? entry.journaledDate : entry.updatedAt;
};

export const getShortDate = (entry) => {
  return moment(getDate(entry)).format('MMM Do');
};

export const getYear = (entry) => {
  return moment(getDate(entry)).format('YYYY');
};