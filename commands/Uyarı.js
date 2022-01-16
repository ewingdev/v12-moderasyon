const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db")
const moment = require("moment")
const conf = require('../config.js');
const a = require('../config.js');

module.exports.run = async (client, message, args) => {

let reawEmbed = new Discord.MessageEmbed().setColor("f1f1f1").setFooter("Ewing bebeğim çok mükemmelsin :)").setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
let embed = reawEmbed;

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let sebep = args.splice(1).join(" ") || "Sebep belirtilmedi!";

if (!message.member.roles.cache.has(a.uyariSorumlusu) && !message.member.hasPermission("ADMINISTRATOR")) {
message.channel.send(reawEmbed.setDescription(` Bu komutu kullanmak için gerekli yetkilere sahip değilsiniz!`))

return;
};

if (!member) {
message.channel.send(reawEmbed.setDescription(` Geçerli bir üye belirtmelisiniz!`))
  
return;
};

if (member.id === message.author.id) {
message.channel.send(reawEmbed.setDescription(` Kendinize ceza veremezsiniz!`))
  
return;
};

if (message.member.roles.highest.position <= member.roles.highest.position) {
message.channel.send(reawEmbed.setDescription(` Belirttiğiniz üye sizden üst/eşit pozisyonda!`))
  
return;
};


message.channel.send(reawEmbed.setDescription(` ${member} kullanıcısı ${message.author} tarafından "${sebep}" sebebiyle atıldı!`));
message.guild.channels.cache.get(a.uyariLog).send(reawEmbed.setDescription(` ${member} kullanıcısı ${message.author} tarafından "${sebep}" sebebiyle atıldı!`));
db.add(`uyariSayi.${member.id}`, 1);
db.add(`uyariSayiYT.${message.author.id}`, 1)
db.push(`notlar.${member.id}`, {Ceza: "uyarı", Yetkili: message.author.id, Sebep: sebep})
};

exports.config = {
  name: "uyarı",
  guildOnly: true,
  aliases: ["not", "uyari"],
};
