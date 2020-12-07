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