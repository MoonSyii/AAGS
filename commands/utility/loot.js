const { SlashCommandBuilder } = require('discord.js');

const table = require("./loot_data/item.json");
const channels = require("./loot_data/channels.json")

function concatTables(indexes) {
    return indexes.reduce((pool, index) => pool.concat(table[index]), [])
}

module.exports = {
    data: new SlashCommandBuilder().setName('loot').setDescription('Donne un objet random')
        .addChannelOption(option =>
            option.setName("salon").setDescription("Salon à roll").setRequired(true)),

        async execute(interaction) {
            const pool = concatTables(channels[interaction.options.getChannel("salon").id.toString()]);
            const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);

            let randomRoll = Math.random() * totalWeight ;

            let randomItem;
            for (const item of pool) {
                randomRoll -= item.weight

                if (randomRoll < 0) {
                    randomItem = item;
                    break;
                }

            }
            await interaction.reply(`Vous avez reçu : ${randomItem.name}`);
        },
    };