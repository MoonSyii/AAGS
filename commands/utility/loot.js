const { SlashCommandBuilder } = require('discord.js');

const table = require("./item.json");

const totalWeight = table.reduce((sum, item) => sum + item.weight, 0);

module.exports = {
    data: new SlashCommandBuilder().setName('loot').setDescription('Donne un objet random'),
        async execute(interaction) {
            let randomRoll = Math.random() * totalWeight ;

            let randomItem;
            for (const item of table) {
                randomRoll -= item.weight

                if (randomRoll < 0) {
                    randomItem = item;
                    break;
                }

            }
            await interaction.reply(`Vous avez reçu : ${randomItem.name}`);
        },
    };