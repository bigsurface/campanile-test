const firebaseConfig = {
    apiKey: "AIzaSyDYn52SoVR5X7Fz5-sYl6FzbJHnzrD0oro",
    authDomain: "campanile-test.firebaseapp.com",
    databaseURL: "https://campanile-test.firebaseio.com",
    projectId: "campanile-test",
    storageBucket: "campanile-test.appspot.com",
    messagingSenderId: "1010494201064",
    appId: "1:1010494201064:web:6107823cb64e67c41cfd5d"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const soundsRef = db.collection('sounds');
  const imagesRef = db.collection('images');
  const storage = firebase.storage();

  



  imagesRef.onSnapshot( snapshot => {
      let imgupdate = snapshot.docChanges();
      console.log(imgupdate);
      imgupdate.forEach( image => {
          console.log(image);
          console.log(image.doc);
          console.log(image.doc.data());
        //   console.log(image.doc.data()).imageURL;
          const imgPath = image.doc.data().imageURL;
          hearts.push(new Heart(imgPath));
        //   addToGallery(imgPath);
      })
  })

  soundsRef.onSnapshot( snapshot => {
      let soundupdate = snapshot.docChanges();
      console.log(soundupdate);
      soundupdate.forEach( sound => {
          console.log(sound.doc.data());
          const soundPath = sound.doc.data().soundURL;
          console.log(soundPath);
          downloadSound(soundPath);
          // waveforms.push( new WaveForm(soundPath));
      })
  })

const dropimage = document.querySelector('#dropimage');
const dropsound = document.querySelector('#dropsound');
const gallery = document.querySelector('#gallery');
let buffers = [];
let soundFileData;
let soundFileDatas = [];
let numBuffers = 0;

window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext;
const context = newAudioContext();
const master = context.createGain();
master.connect(context.destination);

window.addEventListener('dragover', (e) => {
    e.preventDefault();
})

window.addEventListener('drop', (e) => {
    e.preventDefault();
})

dropimage.addEventListener('drop', (e) => {
    e.preventDefault();
    const imgfile = e.dataTransfer.files[0];
    const imgfilesize = imgfile.size / 1024 /1024;
    console.log(e.target);
    console.log(imgfilesize);
    const imgreader = new FileReader();

    imgreader.addEventListener('load', (e) => {
        let imgfileURL = imgreader.result;
        const imgmetadata = { contentType : imgfile.type};
        uploadImgFile(imgfile, imgmetadata);
        addToGallery(imgfileURL);
    })

    if(imgfile){
        if(imgfilesize > 1){
            alert('Please try an image under 1MB');
        } else {
            imgreader.readAsDataURL(imgfile);
        }
    }
})

dropsound.addEventListener('drop', (e) => {
    e.preventDefault();
    const soundfile =  e.dataTransfer.files[0];
    const soundfileSize = soundfile.size / 1024 / 1024;
    const soundreader = new FileReader();

    soundreader.addEventListener('load', (e) => {
        let soundfileURL = soundreader.result;
        const soundmetadata = { contentType : file.type};

        uploadSoundFile(soundfile, soundmetadata);
        
        // addToGallery(soundfileURL);
    })

    if(soundfile){
        if(soundfileSize > 1){
            alert('file must be smaller than 1 MB');
        } else {
            soundreader.readAsDataURL(soundfile);
        }
    }
})

function addToGallery(url){
    const newGalleryItem = document.createElement('div');
    newGalleryItem.className = 'img-item';
    const imgElement = document.createElement('img');
    imgElement.src = url;
    newGalleryItem.appendChild(imgElement);
    gallery.appendChild(newGalleryItem);
}

function uploadImgFile(imgfile, imgmetadata){
    const uniqueimgID = window.crypto.getRandomValues(new Uint32Array(1))[0]
    console.log(uniqueimgID);
    const imgfilePath = `images/${uniqueimgID}.jpg`;
    const uploadimgfile = storage.ref().child(imgfilePath).put(imgfile, imgmetadata).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
            imagesRef.add({imageURL: downloadURL})
        })
    })
}

function uploadSoundFile(soundfile, soundmetadata){
    const uniquesoundID = window.crypto.getRandomValues(new Uint32Array(1))[0]
    console.log(uniquesoundID);
    const soundfilePath = `sounds/${uniquesoundID}.mp3`;
    const uploadsoundfile = storage.ref().child(soundfilePath).put(soundfile, soundmetadata).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
            soundsRef.add({soundURL: downloadURL})
        })
    })
}

function downloadSound(url){
    console.log(url);
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
        const blob = xhr.response;
        console.log(blob);
        loadSound(blob);
    };
    xhr.open('GET', url);
    xhr.send();
}

function loadSound(blob){
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.addEventListener('load', (e) => {
        const array = reader.result;
        context.decodeAudioData(array, (b) => {

            buffers[numBuffers] = b;
            console.log(buffers[numBuffers]);
            console.log(b);
            soundFileData = buffers[numBuffers].getChannelData(0);
            soundFileDatas.push(soundFileData)
            numBuffers++


            // if(soundFileDatas.length < numTracks){
            //     soundFileDatas.push(soundFileData)
            //     numBuffers++
            // }
            
            console.log(buffers);

        },function(){
            console.log('loading failed');
            alert('loading failed');
        });
    })  
    
}