const talk = require("./talk.js");

const talkSchema = {
  body: {
    type: "object",
    required: ["text"],
    properties: {
      text: { type: "string", minLength: 1 },
    },
  },
};

async function bzbmTalk(fastify) {
  fastify.post("/bzmb-talk", { schema: talkSchema }, async (req, res) => {
    const { text } = req.body;
    const base64Mp3 = await talk(text);
    return base64Mp3;
  });
}

module.exports = { plugin: bzbmTalk };