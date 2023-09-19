import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const updatePlaybackTime = throttle(function (data) {
  const currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

player.on('timeupdate', updatePlaybackTime);

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime !== null) {
  player
    .setCurrentTime(parseFloat(savedTime))
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
