const talk = require("./talk.js");

const talkSchema = {
  body: {
    type: "object",
    properties: {
      text: { type: "string", minLength: 1 },
      ssml: { type: "string", minLength: 1 },
      languageCode: { type: "string" },
      gender: { type: "string" },
      name: { type: "string" }
    },
    oneOf: [
      {required: ["text"]},
      {required: ["ssml"]}
    ],
  },
};

async function bzbmTalk(fastify) {
  fastify.post("/bzmb-talk", { schema: talkSchema }, async (req, res) => {
    const { text, ssml, languageCode, gender, name } = req.body;
    try {
      const base64Mp3 = await talk(text, ssml, languageCode, gender, name);
      res
        .code(200)
        .send(base64Mp3);
    } catch (error) {
      res
        .code(500)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(error);
    }
    // const base64Mp3 = await talk(text, ssml, languageCode, gender, name);
    // return base64Mp3;
  });
}

module.exports = { plugin: bzbmTalk };