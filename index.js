const talk = require("./talk.js");

const talkSchema = {
  body: {
    type: "object",
    oneOf: [
      {required: ["text"]},
      {required: ["ssmlText"]},
    ],
    properties: {
      text: { type: "string", minLength: 1 },
      ssmlText: { type: "string", minLength: 1 },
      languageCode: { type: "string" },
      gender: { type: "string" }

    },
  },
};

async function bzbmTalk(fastify) {
  fastify.post("/bzmb-talk", { schema: talkSchema }, async (req, res) => {
    const { text, ssmlText, languageCode, gender } = req.body;
    const base64Mp3 = await talk(text, ssmlText, languageCode, gender);
    return base64Mp3;
  });
}

module.exports = { plugin: bzbmTalk };