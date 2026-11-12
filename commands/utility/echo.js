const { SlashCommandBuilder, ChannelType, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('echo').setDescription('Replies with the Arg')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Message repeated')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option
                .setName('salon')
                .setDescription('salon de destination')
                .setRequired(true)
        ),

    async execute(interaction) {
        const message = interaction.options.getString('message');
        const channel = interaction.options.getChannel('salon');

        await channel.send(` \`\`\`${message}\`\`\``);

        await interaction.reply({
            content: `Message envoyé dans ${channel}`,
            flags: MessageFlags.Ephemeral
        });
    }
}