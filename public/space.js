const firebaseConfig = {
// removed for privacy
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  const imagesRef = db.collection('images');

  const storage = firebase.storage();

  imagesRef.onSnapshot( snapshot => {
      let update = snapshot.docChanges();
      console.log(update);
      update.forEach( image => {
          console.log(image);
          console.log(image.doc);
          console.log(image.doc.data());
        //   console.log(image.doc.data()).imageURL;
          const imgPath = image.doc.data().imageURL;
          hearts.push(new Heart(imgPath));
        //   addToGallery(imgPath);

      })
  })

const dropimage = document.querySelector('#dropimage');
// const dropsound = document.querySelector('#dropsound');
const gallery = document.querySelector('#gallery');

window.addEventListener('dragover', (e) => {
    e.preventDefault();
})

window.addEventListener('drop', (e) => {
    e.preventDefault();
})

dropimage.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const filesize = file.size / 1024 /1024;
    console.log(e.target);
    console.log(filesize);
    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
        let fileURL = reader.result;
        const metadata = { contentType : file.type};
        uploadFile(file, metadata);
        addToGallery(fileURL);
    })

    if(file){
        if(filesize > 1){
            alert('Please try an image under 1MB');
        } else {
            reader.readAsDataURL(file);
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

function uploadFile(file, metadata){
    const uniqueID = window.crypto.getRandomValues(new Uint32Array(1))[0]
    console.log(uniqueID);
    const filePath = `images/${uniqueID}.jpg`;
    const upload = storage.ref().child(filePath).put(file, metadata).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
            imagesRef.add({imageURL: downloadURL})
        })
    })
}
