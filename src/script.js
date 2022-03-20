import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

//Storage.configure({ level: 'public' });

//Get All tracks

const getAllTracks = (track) => {
  // Get the track from S3
  Storage.get(track).then(() => {
    console.log(track);
  });
};

//getAllTracks();

console.log(getAllTracks());
//Display tracks on screen

let tracklist = document.querySelector('.tracklist');

// const list = (track) => {
//   Storage.get(track.key).then(() => {
//     console.log(track);
//     // let newListItem = document.createElement('li');
//     // newListItem.innerText = track.key;
//     // tracklist.appendChild(newListItem);
//   });
// };

// const createAudioPlayer = (track) => {
//   // Get the track from S3
//   Storage.get(track.key).then((result) => {
//     //console.log(track.key);
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

// Storage.list('')
//   .then((result) => {
//     result.forEach((item) => createAudioPlayer(item));
//   })
//   .catch((err) => console.error(err));

Storage.list('').then((result) => {
  result.forEach((item) => list(item));
});
