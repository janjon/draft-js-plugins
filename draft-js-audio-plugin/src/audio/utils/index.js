import insertDataBlock from './insertDataBlock';

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  const seconds = Math.floor(totalSeconds - (hours * 3600) - (minutes * 60));
  let result = hours < 1 ? '' : `${hours}:`;
  result += minutes;
  result += `:${seconds < 10 ? `0${seconds}` : seconds}`;
  return result;
}
export {
  formatTime,
  insertDataBlock
};
