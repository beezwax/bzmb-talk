# bzmb-talk

A [bzBond-server](https://github.com/beezwax/bzBond/tree/main/packages/bzBond-server#bzbond-server) microbond to integrate with the Google Text To Speech API.

## Installation

On a server with bzBond-server installed run the following command:

`/var/www/bzbond-server/bin/install-microbond.sh bzmb-chat beezwax/bzmb-talk`

See the [bzBond-server documentation](https://github.com/beezwax/bzBond/tree/main/packages/bzBond-server#installing-microbonds) for more details on installation.

### Authentication

Generate application credentials in the Google Cloud console and place them in the following location
`/var/www/bzbond-server/sak.json`

## Usage

In a server-side FileMaker script run `bzBondRelay` script with parameters in the following format:

```
{
  "mode": "PERFORM_JAVASCRIPT",
  "route": "bzmb-talk",
  "customMethod": "POST",
  "customBody": {
     // Required (if ssml not present) The text to speak
    "text": "string",

    // Required (if text not present). The text to speak in ssml format
    "ssml": "string",

    // The language of the voice
    "languageCode": number,

    // The gender to speak in
    // possible values:
    "gender": "FEMALE",
    "gender": "MALE",

    // the name of the voice model to use
    "name": "string"
  }
}

```

An base64 formatted mp3 file of the resulting audio from the API can be accessed via `Get ( ScriptResult )`:
`JSONGetElement ( Get ( ScriptResult ); "response.result" )`