const Discord = require('discord.js')
const client = new Discord.Client()

/*
    D0wzy - 2020

    Website: https://dowzy.fr/
    GitHub: https://github.com/D0wzy/
    VoltBot: https://voltbot.xyz/
*/
class Main {
    constructor() {
        this.sniperInterval;
    }

    setVanityURL(url, guild) {
        fetch(`https://discord.com/api/v8/guilds/${guild.id}/vanity-url`, {
            "credentials": "include",
            "headers": {
                "accept": "*/*",
                "authorization": client.token,
                "content-type": "application/json",
            },
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": JSON.stringify({
                "code": url
            }),
            "method": "PATCH",
            "mode": "cors"
        });
    }
    checkVanityURL(url) {

    }

    startSnipe(url, guild) {
        this.sniperInterval = setInterval(async () => {
            this.setVanityURL(url, guild)
        }, 1000)
    }

    stopSnipe() {
        return clearInterval(this.sniperInterval)
    }
}
const prefix = "!"


let handler = new Main()

client.on('message', async (message) => {
    let messageArray = message.content.split(" ");
    const args1 = message.content.slice(prefix.length).split(/ +/);
    const command = args1.shift().toLowerCase();
    let args = messageArray.slice(1);

    if (command === "start-snipe") {
        let url = args[0]
        new Main().startSnipe(url)

        if (!message.guild.features.includes('VANITY_URL')) {
            return message.reply("Vous ne possedez pas l'options VANITY_URL")
        }

        message.reply(`Je commance à snipe l'URL ${url} dés maintenant`)
        console.log(`[INFO] Start sniping the url ${url} !`);
    }

    if (command === "stop-snipe") {
        handler.stopSnipe()
    }

})
client.login("Super secret token here")
