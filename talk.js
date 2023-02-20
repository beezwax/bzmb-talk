const textToSpeech = require('@google-cloud/text-to-speech');
// const fs = require('fs');
// const util = require('util');

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = "/var/www/bzbond-server/sak.json";
// process.env['GOOGLE_APPLICATION_CREDENTIALS'] = "sak.json";

const talk = async (text, ssmlText, languageCode, gender) => {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();
  // Construct the request
  languageCode = languageCode ? languageCode : "en-US";
  const ssmlGender = gender ? gender : "NEUTRAL";
  const input = {};
  if (text) {
    input[text] = text;
  } else if (ssmlText){
    input[ssmlText] = ssmlText;
  }
  const request = {
    input,
    // Select the language and SSML voice gender (optional)
    voice: {languageCode, ssmlGender},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  return response.audioContent.toString('base64');
  // Write the binary audio content to a local file
  // const writeFile = util.promisify(fs.writeFile);
  // await writeFile('output.mp3', response.audioContent, 'binary');
  // console.log('Audio content written to file: output.mp3');
};

module.exports = talk;