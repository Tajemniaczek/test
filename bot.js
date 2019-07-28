const Discord = require("discord.js");
const bot = new Discord.Client()
const request = require('request');
const refresh = 300;
const token = "NjA1MDQ0NjA3NjEyNjE2NzA0.XT2xuA.2eidxvm6BhOCwDUBUbGnPaVoKD0";
const wyspaOff = "Wyspa OFF"
const info = [
    {
        "ip": '51.68.142.211:48143',
        "name": 'MustWinRP',
        "max": "64",
        "channelid": '605045709561004034',

    },{
        "ip": '',
        "name": 'siemav2',
        "max": "64",
        "channelid": '',
    },{
        "ip": '',
        "name": 'siemav3',
        "max": "64",
        "channelid": '',
    }
    
]


bot.on('ready', async () => {
    console.log("Zalogowano");
    setInterval(async () => {
        const channel = bot.channels.find('id', channelid);
        for (let i = 0; i < info.length; i++) {
            const channel = bot.channels.find('id', info[i].channelid)
            if (channel) {
                await request(`http://${info[i].ip}/info.json`, async (error) => {
                    if (error) {
                        channel.setName(wyspaOff);
                        bot.user.setActivity(wyspaOff, {
                            type: 'WATCHING',
                        });
                    } else {
                        await request(`http://${info[i].ip}/players.json`, async (error, response, playerss) => {
                            let players = JSON.parse(playerss);
                            channel.setName(`${info[i].name}: ${players.length}-${info[i].max}`);
                            bot.user.setActivity(`${players.length}/${info[i].max} graczy`, {
                                type: 'PLAYING',
                            });
                        });
                    }
                });
            } else {
                console.log(`Nie znaleziono kanału ${info[i].channelid}`);
            }
        }
    }, refresh * 1000);
});

bot.login(token);