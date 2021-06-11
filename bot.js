

const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);
//------------------------------------------------------------------------------------------------------------\\



  
client.on("guildMemberAdd", async (member) => {
member.roles.add(ayarlar.unregister)
member.setNickname(ayarlar.nick)

});




client.on("ready", async () => {
  let botVoiceChannel = client.channels.cache.get(ayarlar.botVoiceChannelID);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});




client.on("guildMemberAdd", member => {  
    const kanal = member.guild.channels.cache.find(r => r.id === (ayarlar.KayıtChat));
    const register = "<@&Register>"
    let vader = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - vader.createdAt.getTime();  
   
        var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
'0': `<a:0:809444319248252971>`,
'1': `<a:h1:809444326782140446>`,
'2': `<a:h2:809444335598436400>`,
'3': `<a:3:809444347715911690>`,
'4': `<a:h4:809444357211947078>`,                       
'5': `<a:h5:809444365327532102>`,
'6': `<a:hydra:809444374705733714>`,
'7': `<a:7:809444384479117312>`,
'8': `<a:8:809444390425985034>`,
'9': `<a:h9:809444399061794846>`}[d];
          })
        }
  
    var kontrol;
  if (kurulus < 1296000000) kontrol = '**__Hesap Durumu:__** ``Güvenilir Değil`` <a:hydrahayr:816551461219205160>'
  if (kurulus > 1296000000) kontrol = '**__Hesap Durumu:__** ``Güvenilir`` <a:hydratik:816899911126745118> '
    moment.locale("tr");
 
  
 const hydrafoto = new Discord.MessageAttachment("https://media.discordapp.net/attachments/789194952688533558/838711098252853268/ezgif-6-a3f0b668a00a.gif?width=331&height=182");
 const hgmesaj = (`
  <a:hydrayildizi3:791092780398673940> **__ Η Y Đ Я Λ__ Krallığına Hoşgeldin!** <a:hydrayildizi3:791092780398673940>
 
  <a:hydraok:828285900211224652> <@${vader.id}> \`{${vader.id}}\`, hesabın **__{`  + moment(member.user.createdAt).format("DD MMMM YYYY dddd") +`}__** tarihinde oluşturuldu 
 
  <a:hydraok:828285900211224652> Seninle beraber krallığımız `+üyesayısı+` kişiye ulaştı  
 
  <a:hydraok:828285900211224652> Unutma sunucu içerisinde ki ceza-i işlemler kuralları okuduğunu varsayarak gerçekleştirilecek.
 
  <a:hydraok:828285900211224652> Kaydını tamamlamak için herhangi bir \`V.Confirmed\` odasına girip ses teyit vermen yeterli 
 
  <a:hydraok:828285900211224652> Tagımızı {\`✵\`} alarak ailemizin bir parçası olabilirsin. Şimdiden iyi eğlenceler! <a:hydrayeniyil:791190276601282572> <a:hydrayeniyil:791190276601282572> 
 
  <a:hydraok:828285900211224652> `+ kontrol + ` 
  
  <a:hydraok:828285900211224652> <@&${ayarlar.KayıtYetkilisi}>
  `)


 kanal.send(hgmesaj,hydrafoto)


      
  
  
  //------------------------------------------------------------------------------------------------------------------------------------\\

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
     const kytsz = member.guild.roles.cache.find(r => r.id === (ayarlar.unregister)) 
     var rol = member.guild.roles.cache.get(ayarlar.şüpheli) 
     var jail = member.guild.roles.cache.get(ayarlar.jailRol)
     var kayıtsız = member.guild.roles.cache.get(kytsz) 
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
  setTimeout(() => {
  
  }, 50000)
  
  
     }
          else {
  
          }
      });

//------------------------------------------------------------------------------------------------------------------------------------\\


//-----------------------TAG-ROL----------------------\\     

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get(ayarlar.Guild); 
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = (ayarlar.tag); 
  var tagrol = (ayarlar.tagRol); 
  var logKanali = (ayarlar.tagLog); 

  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
  
  if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(``);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
    } catch(err) { console.error(err) };
  };
});

//----------------------TAG-KONTROL----------------------\\     

client.on("guildMemberAdd", member => {
  let sunucuid = (ayarlar.guild); 
  let tag = (ayarlar.tag); 
  let rol = (ayarlar.tagRol); 
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden ! <a:hydraalevv:808620322030878750>`)
      .setTimestamp()
     client.channels.cache.get(ayarlar.tagLog).send(tagalma)
}
})

//-----------------------TAG-KONTROL----------------------\\     
  

  
          
  
});