const talk = require("./talk.js");

const talkSchema = {
  body: {
    type: "object",
    required: ["text"],
    properties: {
      text: { type: "string", minLength: 1 },
      languageCode: { type: "string" },
      gender: { type: "string" }

    },
  },
};

async function bzbmTalk(fastify) {
  fastify.post("/bzmb-talk", { schema: talkSchema }, async (req, res) => {
    const { text, languageCode, gender } = req.body;
    const base64Mp3 = await talk(text, languageCode, gender);
    return base64Mp3;
  });
}

module.exports = { plugin: bzbmTalk };