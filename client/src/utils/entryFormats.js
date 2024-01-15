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

export const getLongDate = (date) => {
  return moment(date).format('MMMM Do YYYY');
};

export const getInputDateFormat = (date) => {
  return moment(date).format('YYYY-MM-DD');
};