const Canvas = require("canvas");
const { MessageAttachment } = require("discord.js");

/**
 *
 * @param {Object} member Member object
 */
function createEmbed(member) {
  const embed = new Discord.MessageEmbed()
    .setTitle(`New member joined!`)
    .setDescription(`${member} joined!`)
    .setColor("RANDOM")
    .setThumbnail(member.user.displayAvatarURL());
  return embed;
}

/**
 *
 * @param {Object} member Member object
 */
async function createCard(member) {
  // Register fonts
  Canvas.registerFont("./data/fonts/Roboto-Regular.ttf", {
    family: "Roboto",
    weight: "regular",
    style: "normal",
  });

  Canvas.registerFont("./data/fonts/Roboto-Bold.ttf", {
    family: "Roboto",
    weight: "bold",
    style: "normal",
  });

  const canvas = Canvas.createCanvas(700, 450);

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#36393f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add username
  ctx.font = getCanvasFont(canvas, member.user.tag, 70, "username");
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(member.user.tag, canvas.width / 2, canvas.height / 1.5);

  // Add welcome message
  ctx.font = getCanvasFont(canvas, member.guild.name, 50, "servername");
  ctx.fillStyle = "#ffffff";
  ctx.shadowBlur = 10;
  ctx.textAlign = "center";
  ctx.fillText(
    `Welcome to ${member.guild.name}`,
    canvas.width / 2,
    canvas.height / 1.22
  );

  // Add "you're member #"
  let theText = `You're member #${member.guild.memberCount}`;

  ctx.font = getCanvasFont(canvas, theText, 40, "subtitle");
  ctx.fillStyle = "##6b6c6e";
  ctx.textAlign = "center";
  ctx.fillText(theText, canvas.width / 2, canvas.height / 1.06);

  ctx.shadowBlur = 0;
  // Draw cirle for the avatar
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 125, 100, 0, Math.PI * 2, true);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.closePath();
  ctx.clip();

  // Load avatar image
  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "png" })
  );

  // Draw image in the center of the card
  ctx.drawImage(avatar, (canvas.width - 200) / 2, 25, 200, 200);
  //ctx.drawImage(avatar, (canvas.width - avatar.width) / 2, 200)
  const card = canvas.toBuffer();

  return new MessageAttachment(card, "welcome.png");
}

function getCanvasFont(canvas, text = "", baseFontSize = 70, type = "") {
  const ctx = canvas.getContext("2d");

  let fontSize = baseFontSize;
  let minusWidth = 200;
  let bold = type == "username" ? "bold " : "";

  do {
    ctx.font = `${bold}${(fontSize -= 10)}px Roboto`;
  } while (ctx.measureText(text).width > canvas.width - minusWidth);

  return ctx.font;
}

module.exports = { createCard, createEmbed };
