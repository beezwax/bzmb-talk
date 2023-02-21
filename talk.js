const textToSpeech = require('@google-cloud/text-to-speech');

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = "/var/www/bzbond-server/sak.json";
// process.env['GOOGLE_APPLICATION_CREDENTIALS'] = "sak.json";

const talk = async (text, ssml, languageCode, gender, name) => {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();
  // Construct the request
  languageCode = languageCode ? languageCode : "en-US";
  const ssmlGender = gender ? gender : "NEUTRAL";
  const input = {};
  if (text) {
    input.text = text;
  } else if (ssml){
    input.ssml = ssml;
  }
  const request = {
    input,
    // Select the language and SSML voice gender (optional)
    voice: {languageCode, ssmlGender, name},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  return response.audioContent.toString('base64');
};

module.exports = talk;