
module.exports = { 
  detectFaces: async function detectFaces(fileName) {
    // [START vision_face_detection]
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
      projectId: 'bet on memes',
      keyFile: './Demo-0fb72e26e6fb.json'});
  
    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
  
    const [result] = await client.faceDetection(fileName);
    const faces = result.faceAnnotations;
    console.log('Faces:');
    faces.forEach((face, i) => {
      console.log(`  Face #${i + 1}:`);
      console.log(`    Joy: ${face.joyLikelihood}`);
      console.log(`    Anger: ${face.angerLikelihood}`);
      console.log(`    Sorrow: ${face.sorrowLikelihood}`);
      console.log(`    Surprise: ${face.surpriseLikelihood}`);
    });
    return faces;
    // [END vision_face_detection]
  }
}