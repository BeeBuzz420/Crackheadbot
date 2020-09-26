const { Argument } = require("discord.js-commando");
const Command = require("../../classes/BaseCommand");

module.exports = class PollCommand extends Command {
  constructor(client) {
    super(client, {
      name: "poll",
      aliases: [],
      group: "fun",
      memberName: "poll",
      description: "Create polls 😌",
      args: [
        {
          key: "question",
          type: "string",
          prompt: "What is the poll question?",
        },
      ],
    });
  }
  async run(message, { question }) {
    const answersArg = new Argument(this.client, {
      key: "answers",
      type: "string",
      prompt: "What are the answers?",
      infinite: true,
    });
    const { value } = await answersArg.obtain(message);
    if (!value || !value.length) return;

    const answers = value;

    if (answers.length > 10) {
      message
        .reply(
          "The poll can't have more than 10 questions, I'm only using the first 10 questions"
        )
        .then((m) => m.delete({ timeout: 3000 }));
      answers = answers.slice(0, 10);
    }

    if (answers.includes("yes") && answers.includes("no")) {
      message.code("xl", question).then((message) => {
        message
          .react("👍")
          .then(() => message.react("👎"))
          .then(() => {
            if (answers.includes("maybe")) {
              message.react("👀");
            }
          });
      });
    } else {
      message
        .code(
          "xl",
          `${question}
==========================
${answers.map((a, i) => `${i + 1}. ${this.capitalize(a)}`).join("\n")}`
        )
        .then((message) => {
          answers.forEach((_, i) =>
            message.react(this.getQuestionEmoji(i + 1))
          );
        });
    }
  }

  getQuestionEmoji(number) {
    const emojis = {
      1: "1️⃣",
      2: "2️⃣",
      3: "3️⃣",
      4: "4️⃣",
      5: "5️⃣",
      6: "6️⃣",
      7: "7️⃣",
      8: "8️⃣",
      9: "9️⃣",
      10: "🔟",
    };
    return emojis[number];
  }

  capitalize(string) {
    let splitted = string.trim().split("");
    splitted[0] = splitted[0].toUpperCase();
    return splitted.join("");
  }
};
