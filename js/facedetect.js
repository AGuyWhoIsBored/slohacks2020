// hooks into the Google Cloud Vision API to recognize person's emotions via facial recognition

module.exports = { 
  detectFaces: async function detectFaces(fileName) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
      projectId: 'bet on memes',
      keyFile: './api/googlecloudkey.json'});
  
    const [result] = await client.faceDetection(fileName);
    const faces = result.faceAnnotations;
    // console.log('Faces:');
    // faces.forEach((face, i) => {
    //   console.log(`  Face #${i + 1}:`);
    //   console.log(`    Joy: ${face.joyLikelihood}`);
    //   console.log(`    Anger: ${face.angerLikelihood}`);
    //   console.log(`    Sorrow: ${face.sorrowLikelihood}`);
    //   console.log(`    Surprise: ${face.surpriseLikelihood}`);
    // });
    return faces;
  }
}