const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./botconfig.json");
const fs = require("fs");
const fivem = require('fivem-api');
const mysql = require('mysql');
const db = require('quick.db');
const request = require('request');
const { kanalstatuswiad , sloty } = require('./botconfig.json');
const delay = require('delay');

const channelid = "692284255081857065";
const refresh = 10;
const wyspaIp = "151.80.47.145:30120"; 
const wyspaOff = "Wyspa OFF"
const maxPlayers = '70';
const wyspaName = 'status';




bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});
	

//TESTOWE///

// bot.on("ready", async () => {
// 	    fivem.getServerInfo("51.83.71.65:30120").then(async server  => {
//     bot.user.setActivity(server.players.length + "/32").catch(async error => {
// bot.user.setActivity("Serwer Offline")})
// }, 10*1000).catch((err) => console.log(err)); 
// });


  //STATUS//

  //nie polecam mieć dwóch statusów serwera odpalonych na raz


// bot.on("ready", async () => {
//         bot.channels.find('id', config.kanal).fetchMessage(config.wiadomoscid).then(msg1 => {
//             setInterval(async () => {

//               fivem.getServerInfo(config.ipserwera).then(async server => {
//                   let embed = new Discord.RichEmbed()
//                   .setTitle(server.infos.vars.sv_hostname)
//                   .addField('Adres:', config.ipserwera, true)
//                   .addField('Gracze:', server.players.length, true)
//                   .setColor('blue')
//                   .setFooter(config.nazwaserwera, bot.user.displayAvatarURL)
//                   .setTimestamp();
//                   msg1.edit(embed);
//               }).catch(async error => {
//                   let embed = new Discord.RichEmbed()
//                   .setTitle('SERWER WYLACZONY')
//                   .addField('Adres:', config.ipserwera, true)
//                   .setFooter(config.nazwaserwera, bot.user.displayAvatarURL)
//                   .setTimestamp();
//                   msg1.edit(embed);
//               })
//
//             }, 10*1000);
//         })
//   });



//bot.on("ready", async () => {
//
  //  const channel = bot.channels.get(config.kanalst);
//
  //  const message = await channel.fetchMessage(config.wiadomoscst);
//
  //  setInterval(async () => {
    //  request(`http://${config.ipst}/players.json`, async (error, _, body) => {	
      //  if (error){
//
  //            const embed = new Discord.RichEmbed()
//
  //                .setColor(`${config.kolorst}`)
    //              .setTitle('SERWER WYLACZONY')
//
  //                .addField('Adres:', `${config.ipst}`, true)
//
  //                .setFooter(`${config.nazwafoost}`,bot.user.displayAvatarURL)
    //              .setTimestamp();
//
  //                return await message.edit(embed);
//
  //         }
//
  //        const players = JSON.parse(body);
//
  //        playersStringList = [];
//
  //        let buff = "";
//
  //        for(const player of players){
    //          const paddedId = new String(player.id).padStart(3, '0');
//
  //            const steamHex = player.identifiers[0];
//
  //            const playerString = `${paddedId}     ${player.name}(${steamHex})\n`;
//
  //            if((buff.length + playerString.length) > 1024) {
//
  //                playersStringList.push(buff);
//
  //              buff = "";
//
  //            }
    //          buff += playerString;
//
  //        }
//
  //        playersStringList.push(buff);
//
  //        const embed = new Discord.RichEmbed()
//
  //            .setColor(`${config.kolorst}`)
//
  //            .setTitle(`${config.nazwaglst}`)
//
  //              .addField("Adres:", `${config.ipst}`, true)
//
  //            .addField("Gracze:",`${players.length}/${config.maksst}`, true)
//
  //            .setFooter(`${config.nazwafoost}`,bot.user.displayAvatarURL)
//
  //            .setTimestamp();
//
  //        for(let i = 0; i < playersStringList.length; i++){
//
  //            embed.addField(`Lista ${i +1}/${playersStringList.length}`, playersStringList[i]);
//
  //        }
//
  //        return await message.edit(embed);
//
  //             
//
  //    });
//
  //},10 * 1000);
//
//})

  bot.setInterval(async () => {
    const channel = bot.channels.find(x => x.name === (kanalstatuswiad))
    //channel.bulkDelete(100)
    if (channel) {
        await request(`http://151.80.47.145:30120/info.json`, async (error, response, body) => {
            if (error) {
              try {
    const channel = bot.channels.find(x => x.name === (kanalstatuswiad))
    var idwiad = "692283859496337469"
    channel.fetchMessage(idwiad).then(messagea => {
              const niedziala = new Discord.RichEmbed()
              .setTitle('Obywatele:')
              .setColor('#00abff')
              .addField(`Status:`, `**Serwer aktualnie wyłączony!**`, true)
              .setImage(`https://media.discordapp.net/attachments/699161561863946260/724698564575494164/XLifeRP-LOGO.png`)
              .setTimestamp()
              .setFooter('XLifeRP.PL ©',)
      
              messagea.edit(niedziala);
            })
            } catch(error) {
              console.log('\x1b[41m%s\x1b[0m', 'Wystapil blad\n');
            }
            } else {
                await request(`http://151.80.47.145:30120/players.json`, async (error, response, playerss) => {
                   var nick = ""
                   var id = ""
                    let players = JSON.parse(playerss);
                    var start = JSON.parse(playerss)
                    if (start == null || start == []) {
                      var e = 0
                    } else {
                      var e = start.length;
                    }
                    const channel = bot.channels.find(x => x.name === (kanalstatuswiad))
                    var idwiad = "692283859496337469"
                    channel.fetchMessage(idwiad).then(messagea => {
                      start.forEach(function (element) {
                      nick += `\n${element.name}`
                      id += `\n${element.id}`
                  })
                    const status = new Discord.RichEmbed()
                        .setTitle(`Obywatele: ${players.length}/${sloty} `)
            .setColor('#00abff')
                        .addField(`ID:`, `${id}`, true)
                        .addField(`Nick:`, `${nick}`, true)
                        .setImage(`https://media.discordapp.net/attachments/699161561863946260/724698564575494164/XLifeRP-LOGO.png`)
                        .setTimestamp()
                        .setFooter('XLifeRP.PL ©',);
            
                        messagea.edit(status);
                      })
                    });
                }
            });
  
    } else {
        console.log(`Nie znaleziono kanaĹ‚u ${channelid}`);
    }
  }, 20 * 1000);

  bot.on('ready', async () => {
    console.log("Zalogowano");
    setInterval(async () => {
        const channel = bot.channels.find('id', channelid);
        if (channel) {
            await request(`http://${wyspaIp}/info.json`, async (error) => {
                if (error) {
                    channel.setName(wyspaOff);
                    bot.user.setActivity(wyspaOff, {
                        type: 'WATCHING',
                    });
                } else {
                    await request(`http://${wyspaIp}/players.json`, async (error, response, playerss) => {
                        let players = JSON.parse(playerss);
                        channel.setName(`${wyspaName}: ${players.length}/${maxPlayers}`);
                        bot.user.setActivity(`${players.length}/${maxPlayers} graczy`, {
                            type: 'PLAYING',
                        });
                    });
                }
            });
        } else {
            console.log(`Nie znaleziono kanału ${channelid}`);
        }
    }, refresh * 1000);
});






  bot.on("ready", async () => {
    console.log(`${bot.user.username} jest dostępny na ${bot.guilds.size} serwerach!`);
    bot.user.setActivity("Potrzebujesz Pomocy? Napisz Do Mnie!", {type: "WATCHING"});
  
  });

bot.login(config.token);
