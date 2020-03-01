// hooks into the Google Cloud Vision API to recognize person's emotions via facial recognition

module.exports = { 
  detectFaces: async function detectFaces(fileName) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client and annotate face data
    const client = new vision.ImageAnnotatorClient({
      projectId: 'bet on memes',
      keyFile: './api/googlecloudkey.json'});
    const [result] = await client.faceDetection(fileName);
    const faces = result.faceAnnotations;
    return faces;
  }
}