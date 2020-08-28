// 'use strict';
// var os = require('os');
// const util = require('util');

// const exec = util.promisify(require('child_process').exec);

// const fs = require('fs');
// /**
//    * TODO(developer): Uncomment the following lines before running the sample.
//    */
// // Bucket where the file resides
// var filepath = os.homedir() + '/' + 'medicalpoc/medical/backend';

// const bucketName = 'pdf_to_text_bucket';
// // Path to PDF file within bucket

// const fileName = 'sample.pdf';
// // The folder to store the results
// const outputPrefix = 'results';
// detectPdfText(bucketName, fileName, outputPrefix)

// async function detectPdfText(bucketName, fileName, outputPrefix) {
//   // Imports the Google Cloud client libraries
//   const vision = require('@google-cloud/vision').v1;
//   // Imports the Google Cloud client library.
//   const { Storage } = require('@google-cloud/storage');

//   // Instantiates a client. If you don't specify credentials when constructing
//   // the client, the client library will look for credentials in the
//   // environment.
//   const storage = new Storage();
//   var query = `
//   gsutil rm gs://pdf_to_text_bucket/
//   gsutil cp -r  ${filepath}/${fileName} gs://pdf_to_text_bucket/
//   `;
//     console.log(query);
//     await exec(query).then(function (response) {
  
  
//       console.log("exec result : ", response.stdout.search("Error"));
  
//     }).catch(function (err) {
//       throw err;
//     });
//   try {
//     // Makes an authenticated API request.
//     const results = await storage.getBuckets();

//     const [buckets] = results;

//     console.log('Buckets:');
//     buckets.forEach(bucket => {
//       console.log(bucket.name);
//     });
//   } catch (err) {
//     console.error('ERROR:', err);
//   }
//   // Creates a client
//   const client = new vision.ImageAnnotatorClient();
 
//   /**
//    * TODO(developer): Uncomment the following lines before running the sample.
//    */
//   // Bucket where the file resides
//   // const bucketName = 'my-bucket';
//   // Path to PDF file within bucket
//   // const fileName = 'path/to/document.pdf';
//   // The folder to store the results
//   // const outputPrefix = 'results'
//   //var file_name = 'Report_' + now.getTime() + '.pdf'
//   //var destination = os.homedir() + '/' + 'medicalpoc/medical'

//   const gcsSourceUri = `gs://${bucketName}/${fileName}`;
//   const gcsDestinationUri = `gs://${bucketName}/${outputPrefix}/`;

//   console.log('Json saved to: ');

//   const inputConfig = {
//     // Supported mime_types are: 'application/pdf' and 'image/tiff'
//     mimeType: 'application/pdf',
//     gcsSource: {
//       uri: gcsSourceUri,
//     },
//   };
//   const outputConfig = {
//     gcsDestination: {
//       uri: gcsDestinationUri,
//     },
//   };

 
 
//   const features = [{ type: 'DOCUMENT_TEXT_DETECTION' }];
//   const request = {
//     requests: [
//       {
//         inputConfig: inputConfig,
//         features: features,
//         outputConfig: outputConfig,
//       },
//     ],
//   };

//   const [operation] = await client.asyncBatchAnnotateFiles(request);
//   const [filesResponse] = await operation.promise();
//   const destinationUri =
//     filesResponse.responses[0].outputConfig.gcsDestination.uri;

//   var query = `
// gsutil cp -r ${destinationUri} ${filepath}/textDocument/
// `;
//   console.log(query);
//   await exec(query).then(function (response) {


//     console.log("exec result : ", response.stdout.search("Error"));

//   }).catch(function (err) {
//     throw err;
//   });
//   //console.log('Json saved to: ' + destinationUri);
//   let rawdata = fs.readFileSync(filepath + "/" + "textDocument/results/output-1-to-1.json");
//   let student = JSON.parse(rawdata);
//   console.log(student.responses[0].fullTextAnnotation.text);

// }


