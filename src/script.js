import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

//Storage.configure({ level: 'public' });

//Get All tracks
let trackArray = [];
const getAllTracks = (track) => {
  // Get the track from S3

  Storage.get(track.key).then(() => {
    //console.log(track);
    trackArray.push(track);
    // console.log(trackArray);
    // console.log(newtrackArray);

    // return newtrackArray;
  });
};

console.log(trackArray);

//Load tracks
const audio = document.createElement('audio');
let trackIndex = 1;

function loadTrack(trackIndex) {
  audio.src = trackArray[trackIndex];

  audio.load();
}

loadTrack(trackIndex);

console.log(loadTrack(trackIndex));

//let Playing_song = false;
//play Track
function playTrack() {
  audio.play();
  // Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
// function pauseSong() {
//   audio.pause();
//   // Playing_song = false;
//   play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
// }

// checking.. the song is playing or not
// function justplay() {
//   if (Playing_song == false) {
//     playTrack();
//   } else {
//     pauseSong();
//   }
// }

//Event Listeners
playBtn.addEventListener('click', () => {
  // const isPlaying = music-container.classList.contains('play');
  console.log('play clicked');
  playTrack();

  // if (isPlaying) {
  //   pauseSong();
  // } else {
  //   playTrack();
  // }
});

//Display tracks on screen

let tracklist = document.querySelector('.tracklist');

const list = (track) => {
  Storage.get(track.key).then(() => {
    // console.log(track);
    let newListItem = document.createElement('li');
    newListItem.innerText = track.key;
    tracklist.appendChild(newListItem);
  });
};

// const createAudioPlayer = (track) => {

//     // create an audio element and add a source element to it
//     const audio = document.createElement('audio');
//     const source = document.createElement('source');

//     audio.appendChild(source);
//     // add controls to the audio element
//     audio.setAttribute('controls', '');
//     audio.setAttribute('volume', '');
//     // add the track source and type
//     source.setAttribute('src', result);
//     source.setAttribute('type', 'audio/mpeg');
//     // add the item to the page
//     document.querySelector('.tracks').appendChild(audio);
//   }

// select the upload form we created, and listen for a submit event on it
document.getElementById('upload-form').addEventListener('submit', (e) => {
  // don't refresh the page on submit
  e.preventDefault();
  // get the file from the file upload element, this will be an array.
  // we only want the first element
  const file = document.getElementById('file-upload').files[0];
  // put our file in storage, use the file's name as its S3 Key
  Storage.put(file.name, file, {
    progressCallback(progress) {
      console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    },
  })

    .then((item) => {
      console.log(item);
    })
    .catch((err) => console.error(err));
});

// Storage.list('')
//   .then((result) => {
//     result.forEach((item) => createAudioPlayer(item));
//   })
//   .catch((err) => console.error(err));

Storage.list('')
  .then((result) => {
    result.forEach((item) => getAllTracks(item));
  })
  .catch((err) => console.error(err));

Storage.list('').then((result) => {
  result.forEach((item) => list(item));
});

// Event listeners

// function open_list() {
//   tracklist.classList.toggle('active');
// }
