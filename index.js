const {Client, MessageEmbed} = require('discord.js');
const toEmbed = require('godembed');
const {token, example, explication} = require('./statics.json');
const GodEmbot = new Client();
const prefix = 'embed.';

GodEmbot.login(token).catch((err) => {
	console.log(err);
});

GodEmbot.once('ready', () => {
	console.log('Bot Ready !');
	GodEmbot.user.setActivity(`creating embeds | ${prefix}`);
});

GodEmbot.on('message', async message => {
	if (message.system || message.author === GodEmbot.user || !message.content.startsWith(prefix)) {
		return false;
	}
	
	if (message.guild) {
		const permissions = message.guild.me.permissions;
		if ( !permissions.has('SEND_MESSAGES')) {
			if (permissions.has('ADD_REACTIONS')) {
				await message.react('❌');
				await message.react('✍️');
			} else {
				await message.author.send('Hi, I\'m here to say to you that I can\'t send messages, I don\'t have the proper permission, you can say it to the owner, or an admin to help me gain missing permissions ^^\'');
			}
		}
	}
	
	if (message.content.startsWith(prefix)) {
		const args = message.content.slice(prefix.length).trim().split(/\s+/g);
		
		switch (args[0]) {
			case 'create':
			case 'new':
				const {embed, errors} = toEmbed(args.slice(1).join(' '));
				if (embed.length > 0) {
					await message.channel.send({embed});
				}
				if (errors.length > 0) {
					await message.channel.send(`\`\`\`js\n${errors.join('\n')}\`\`\``);
				}
				
				break;
			
			case 'help':
				const helpEmbed = new MessageEmbed();
				helpEmbed.setAuthor('God Embot a bot to help you create embeds !', 'https://cdn.discordapp.com/avatars/690980350976851969/bf0597a340543494cc252310e49239da.png?size=2048');
				helpEmbed.setTitle('Bot Help');
				helpEmbed.setColor('#ff9900');
				helpEmbed.setFooter(`Do ${prefix}example to get an example !`);
				helpEmbed.addField('Commands', `
\`${prefix}help\` - Shows you this help.
\`${prefix}example\` - Shows you an example.
\`${prefix}new\` - Let you create a new embed.`);
				
				helpEmbed.addField('How this works ?', explication);
				
				await message.channel.send(helpEmbed);
				break;
			
			case 'example':
			case 'exemple':
				const textEmbed = toEmbed(example);
				
				await message.channel.send(`\`\`\`pf\n${example}\`\`\``);
				await message.channel.send({embed: textEmbed.embed});
				break;
		}
	}
	
	GodEmbot.guilds.cache.clear()
	message.channel.messages.cache.clear();	
});
