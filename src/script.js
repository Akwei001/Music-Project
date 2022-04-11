import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const musicContainer = document.querySelector('.music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
//const audio = document.createElement('audio');

//Storage.configure({ level: 'public' });

// //Get All tracks
// let trackArray = [];
// const getAllTracks = (track) => {
//   // Get the track from S3

//   Storage.get(track.key).then(() => {
//     //console.log(track);
//     trackArray.push(track);
//     // console.log(trackArray);
//     // console.log(newtrackArray);

//     // return newtrackArray;
//   });
// };

// console.log(trackArray);

// //Load tracks
// const audio = document.createElement('audio');
// const source = document.createElement('source');
// source.setAttribute('src', 'trackArray.key');
// source.setAttribute('type', 'audio/mpeg');

// let trackIndex = 1;

// function loadTrack(trackIndex) {
//   audio.source = trackArray[trackIndex];
//   console.log(audio.source);
//   audio.load();
// }

// loadTrack(trackIndex);

// console.log(loadTrack(trackIndex));

//let Playing_song = false;
//play Track
function playTrack() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
  // Playing_song = true;
}

// //pause song
// function pauseSong() {
//   musicContainer.classList.remove('play');
//   playBtn.querySelector('i.fas').classList.add('fa-play');
//   playBtn.querySelector('i.fas').classList.remove('fa-pause');

//   audio.pause();
// }

// // checking.. the song is playing or not
// // function justplay() {
// //   if (Playing_song == false) {
// //     playTrack();
// //   } else {
// //     pauseSong();
// //   }
// // }

// //Event Listeners

// // let isPlaying = musicContainer.classList.contains('play');

// // let isPlaying = false;

playBtn.addEventListener('click', () => {
  //const isPlaying = musicContainer.classList.contains('play');
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

const List = (track) => {
  Storage.get(track.key).then(() => {
    // console.log(track);
    let newListItem = document.createElement('li');
    newListItem.innerText = track.key;
    tracklist.appendChild(newListItem);
  });
};

const createNewAudio = (track) => {
  Storage.get(track.key).then((result) => {
    // console.log(result);
    console.log(track.key);
    const audio = document.createElement('audio');
    const source = document.createElement('source');
    audio.appendChild(source);
    //  add the track source and type
    source.setAttribute('src', result);
    console.log(track.key);
    source.setAttribute('type', 'audio/mpeg');
    audio.setAttribute('controls', '');
    // add the item to the page
    document.querySelector('.test').appendChild(audio);
  });
};

// const createAudioPlayer = (track) => {
//   // Get the track from S3
//   Storage.get(track.key).then((result) => {
//     // create an audio element and add a source element to it
//     const audio = document.createElement('audio');
//     const source = document.createElement('source');
//     audio.appendChild(source);
//     // add controls to the audio element
//     // audio.setAttribute('controls', '');
//     // add the track source and type
//     source.setAttribute('src', result);
//     source.setAttribute('type', 'audio/mpeg');
//     // add the item to the page
//     document.querySelector('.music-container').appendChild(audio);
//   });
// };

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

//

// Storage.list('')
//   .then((result) => {
//     result.forEach((item) => getAllTracks(item));
//   })
//   .catch((err) => console.error(err));

Storage.list('').then((result) => {
  result.forEach((item) => List(item));
});

Storage.list('').then((result) => {
  createNewAudio(
    result.map(() => {
      [];
    })
  );
  console.log(result[1].key);
});

console.log(createNewAudio);
// let Trackresult = [];
// console.log(Trackresult);
// // let finalResult = [];

// Storage.list('')
//   .then((result) => {
//     List(result);
//     console.log(result[1].key);

//     Trackresult = result;
//     console.log(Trackresult[1]);
//   })
//   .catch((err) => console.error(err));

// Trackresult = finalResult;
// console.log(finalResult);

// Event listeners
