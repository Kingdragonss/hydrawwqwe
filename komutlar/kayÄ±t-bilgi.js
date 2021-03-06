const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')
const datab = require('quick.db')

module.exports.run = async (client, message, args) => {
  
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  if(!message.member.roles.cache.has(ayarlar.KayıtYetkilisi) && (message.member.roles.cache.has(ayarlar.üstYetkiliRolü)) && (!message.member.hasPermission("ADMINISTRATOR")))  return message.channel.send(new Discord.MessageEmbed().setDescription(`**Gerekli yetikiye sahip değilsin.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
 
  let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    

  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
  
    if(!kullanıcı) {

    let erkek = datab.fetch(`yetkili.${message.author.id}.erkek`);
    let kadın = datab.fetch(`yetkili.${message.author.id}.kadın`);
    let kayıtlar = datab.fetch(`yetkili.${message.author.id}.toplam`);  
    

    if(erkek === null) erkek = "0"
    if(erkek === undefined) erkek = "0"
    if(kadın === null) kadın = "0"
    if(kadın === undefined) kadın = "0"
    if(kayıtlar === null) kayıtlar = "0"
    if(kayıtlar === undefined) kayıtlar = "0"

    const kayıtlar2 = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL ({ dynamic: true}))
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor("#ff0000")
    .setImage('https://images-ext-2.discordapp.net/external/eDTQgIHVGj9Qvlh1gCDFdkZcbyGM4YTZ-_MIBj6Rijw/%3Fwidth%3D238%26height%3D202/https/images-ext-1.discordapp.net/external/keOmqfDdQg_q8G6dd2TCx2LJzY8JHcDC5Ivty9RcpYY/https/media.discordapp.net/attachments/789194952688533558/803543295753453568/ezgif-3-6ab7341e25b3.gif?width=190&height=162')
    .setDescription(`
    <a:hydracrown3:816355855179841557> • **Toplam Kayıtlar:**  \`${kayıtlar}\`
    <a:hydracrown3:816355855179841557> • **Toplam Erkek Kayıtların:** \`${erkek}\`
    <a:hydracrown3:816355855179841557> • **Toplam Kadın Kayıtların:** \`${kadın}\`
    `)
    .setColor("0x2f3136")
    return message.channel.send(kayıtlar2)
      
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 

};


  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
if(kullanıcı) {
let erkek1 = await datab.fetch(`yetkili.${kullanıcı.id}.erkek`) 
let kadin1 = await datab.fetch(`yetkili.${kullanıcı.id}.kadın`) 
let kayıtlar1 = await datab.fetch(`yetkili.${kullanıcı.id}.toplam`);  
    

if(kayıtlar1 === null) kayıtlar1 = "0"
if(kayıtlar1 === undefined) kayıtlar1 = "0"
if(erkek1 === null) erkek1 = "0"
if(erkek1 === undefined) erkek1 = "0"
if(kadin1 === null) kadin1 = "0"
if(kadin1 === undefined) kadin1 = "0"
const kayıtlar3 = new Discord.MessageEmbed()
.setThumbnail(kullanıcı.avatarURL ({ dynamic: true})) 
.setAuthor(`${kullanıcı.username}`)
.setDescription(`• Toplam Kayıtların: \`${kayıtlar1}\`
• Toplam Erkek Kayıtların: \`${erkek1}\`
• Toplam Kadın Kayıtların: \`${kadin1}\`
`)
.setColor("0x2f3136")
return message.channel.send(kayıtlar3)
  
  }
  
  
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["stat", "kayıtlar", "kayıt-kontrol"],
    permLvl: 0,
}

exports.help = {
      name: "stat"
  
}