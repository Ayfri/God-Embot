const {Client, MessageEmbed} = require('discord.js');
const toEmbed = require('godembed');
const GodEmbed = new Client();
const prefix = 'embed.';


GodEmbed.login('Hi !').catch((err) => {
	console.log(err);
});


GodEmbed.once('ready', () => {
	console.log('Bot Ready !');
});

GodEmbed.on('message', async message => {
	if (message.system || message.author === GodEmbed.user || !message.content.startsWith(prefix)) {
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
		const command = args[0];
		
		switch (command) {
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
				helpEmbed.setAuthor('God Embot a bot to help you create embeds !');
				helpEmbed.setTitle('Bot Help');
				helpEmbed.setColor('#ff9900');
				helpEmbed.setFooter(`Do ${prefix}example to get an example !`);
				helpEmbed.addField('Commands', `
\`${prefix}help\` - Show you this help.
\`${prefix}example\` - Show you an example.
\`${prefix}new\` - Let you create a new embed.`);
				
				helpEmbed.addField('How this works ?', `This bot lets you create embeds with \`tags\`, \`$title\` is a tag, and you put text after, certain tags takes multiple arguments, you must separate the arguments with line breaks.
There are some tags with complex behaviors like \`$and\`, \`$end\` and others.
You can get information on all the tags with this documentation : [GodEmbed Documentation](https://github.com/CamilleAbella/GodEmbed/blob/master/Module/docs.md)
And there is also a presentation by the creator of the system here : [Npm package GodEmbed](https://www.npmjs.com/package/godembed)`);
				
				await message.channel.send(helpEmbed);
				break;
			
			case 'example':
			case 'exemple':
				const text = `
This is a comment, this will not be there in the embed.

$title A title. $end
You can add the '$end' tag to force the end of a tag.

$author Author of this embed.
https://cdn.discordapp.com/avatars/352176756922253321/8c603e2cd8b32d2f2bb4d6b1d5737285.png?size=2048
https://github.com/CamilleAbella

This tag takes multiple arguments ↑

$thumbnail https://cdn.discordapp.com/avatars/555419470894596096/c34e19339ea2c886a847dbf92a2dbb74.png?size=2048
$image https://cdn.discordapp.com/embed/avatars/0.png
$description Bla bla this is text.
I like trains.

$field This is the title of the field.
$and
This is the text.
If I don't add the \`$and\` tag, I can't make a multilines text field =)
The \`$and\` tag just force it to go the next argument.
$and
true $end

The 'true' above set the field to be 'inline', by default it is 'false'.

$field $blank
$blank

The '$blank' tag lets you let the argument be blank but not missing =)

$color #ffbb00
$footer The little text beneath =)
https://cdn.discordapp.com/avatars/386893236498857985/38a303c1b86d03ff2f74467d769ed1d4.png?size=2048`;
				
				const textEmbed = toEmbed(text);
				
				await message.channel.send(`\`\`\`pf\n${text}\`\`\``);
				await message.channel.send({embed: textEmbed.embed});
				break;
		}
	}
});

// todo make the avatar
