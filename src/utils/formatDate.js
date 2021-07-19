import { formatRelative } from 'date-fns/esm';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

export function formatRelativeDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export function formatDateToNow(seconds) {
  return formatDistanceToNowStrict(new Date(seconds * 1000));
}
