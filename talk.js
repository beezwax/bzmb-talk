const textToSpeech = require('@google-cloud/text-to-speech');

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = "/var/www/bzbond-server/sak.json";
// process.env['GOOGLE_APPLICATION_CREDENTIALS'] = "sak.json";

const talk = async (text, ssml, languageCode, gender, name) => {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();
  // Construct the request
  languageCode = languageCode ? languageCode : "en-US";
  const input = {};
  if (text) {
    input.text = text;
  } else if (ssml){
    input.ssml = ssml;
  }
  const voice = {languageCode};
  if(name) {
    voice.name = name;
  } else if(gender) {
    voice.ssmlGender = gender;
  }
  const request = {
    input,
    // language and SSML voice gender (optional), voice name
    voice,
    // type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  try {
    const [response] = await client.synthesizeSpeech(request);
    return response.audioContent.toString('base64');
  } catch (error) {
    throw error;
  }
};

module.exports = talk;