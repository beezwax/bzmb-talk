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

async function bztalk(fastify) {
  fastify.get("/bzmb-talk", { schema: talkSchema }, (req, res) => {
    const { text } = req.body;
    const base64Mp3 = talk(text);
    return base64Mp3;
  });
}

module.exports = { plugin: bztalk };