const {
  EmbedBuilder,
  Collection,
  PermissionsBitField,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  ButtonBuilder,
  Embed,
  AttachmentBuilder,
  SelectMenuBuilder,
} = require("discord.js");
const ms = require("ms");
const client = require("..");
const config = require("../utils/config.json");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max + 1);
}
client.on("interactionCreate", async (interaction) => {
  const slashCommand = client.slashCommands.get(interaction.commandName);
  if (interaction.type == 5) {
    if (interaction.customId == "ticket_1") {
      await interaction.reply({
        content: `Tworzenie ticketa...`,
        components: [],
        embeds: [],
        ephemeral: true,
      });
      const bot_dev_answer_1 =
        interaction.fields.getTextInputValue("ticket_answer_1");
      const bot_dev_answer_2 =
        interaction.fields.getTextInputValue("ticket_answer_2");

      const bot_dev_label_1 =
        client.config.modals["ticket_gui"]["1"]["label_1"];
      const bot_dev_label_2 =
        client.config.modals["ticket_gui"]["1"]["label_2"];

      /// check limit channel on category
      const category = await interaction.message.guild.channels.cache.get(
        client.config.category["CHANNEL_TICKET_1"],
      ); /// category tickets
      if (category.children.size === 50)
        return interaction.editReply({
          content: client.config.messages["MAX_CHANNEL_IN_CATEGORY"],
          components: [],
          embeds: [],
          ephemeral: true,
        });

      let sup = interaction.guild.roles.cache.get(
        client.config.role["TICKET_1_ACCESS_ROLE"],
      ); // ticket access role
      let ticket_user_username = client.users.cache.find(
        (user) => user.id === interaction.member.id,
      ).username;

      /// check limit tickets
      let ticket_channel_check = await interaction.guild.channels.cache.filter(
        (channel) =>
          channel.name.substring(0, 6) === "ticket" &&
          channel.topic === interaction.member.id &&
          channel.parentId === category.id,
      );
      if (ticket_channel_check.size > 0) {
        return interaction.editReply({
          content: `Już masz otwartego ticketa!`,
          components: [],
          embeds: [],
          ephemeral: true,
        });
      }
      /// Create channel
      const ticket_channel = await interaction.guild.channels.create({
        name: `ticket-${ticket_user_username}`,
        type: 0,
        parent: category,
        topic: interaction.member.id,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.member.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
          {
            id: sup,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
        ],
      });
      await interaction.editReply({
        content: `Twoj ticket -> ${ticket_channel}`,
        embeds: [],
        components: [],
        ephemeral: true,
      });
      const informationEmbed = new EmbedBuilder()
        .setColor(client.config.embeds["ticket_embed_1"]["color"])
        .setTitle(client.config.embeds["ticket_embed_1"]["title"])
        .setDescription(
          client.config.embeds["ticket_embed_1"]["description"]
            .replace("{member}", interaction.member)
            .replace("{memberId}", interaction.member.id)
            .replace(
              "{stworzono}",
              `<t:${(interaction.member.user.createdTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace(
              "{dolaczyl}",
              `<t:${(interaction.member.joinedTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace(
              "{ticketStworzono}",
              `<t:${(ticket_channel.createdTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace("{category}", `${ticket_channel.parent.name}`),
        )
        .addFields(
          { name: bot_dev_label_1, value: bot_dev_answer_1 },
          { name: bot_dev_label_2, value: bot_dev_answer_2 },
        );
      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("delete-ticket-btn")
          .setEmoji("<:zamknij:1207044997510201344>")
          .setLabel("Kliknij aby zamknąć ticketa")
          .setStyle(1),
      );
      await ticket_channel.send({
        content: `${interaction.member}`,
        embeds: [informationEmbed],
        components: [buttons],
      });
    } else if (interaction.customId == "ticket_2") {
      await interaction.reply({
        content: `Tworzenie ticketa...`,
        components: [],
        embeds: [],
        ephemeral: true,
      });
      const bot_dev_answer_1 =
        interaction.fields.getTextInputValue("ticket_answer_1");
      const bot_dev_answer_2 =
        interaction.fields.getTextInputValue("ticket_answer_2");
      const bot_dev_answer_3 =
        interaction.fields.getTextInputValue("ticket_answer_3");
      const bot_dev_answer_4 =
        interaction.fields.getTextInputValue("ticket_answer_4");
      const bot_dev_answer_5 =
        interaction.fields.getTextInputValue("ticket_answer_5");

      const bot_dev_label_1 =
        client.config.modals["ticket_gui"]["2"]["label_1"];
      const bot_dev_label_2 =
        client.config.modals["ticket_gui"]["2"]["label_2"];
      const bot_dev_label_3 =
        client.config.modals["ticket_gui"]["2"]["label_3"];
      const bot_dev_label_4 =
        client.config.modals["ticket_gui"]["2"]["label_4"];
      const bot_dev_label_5 =
        client.config.modals["ticket_gui"]["2"]["label_5"];

      /// check limit channel on category
      const category = await interaction.message.guild.channels.cache.get(
        client.config.category["CHANNEL_TICKET_2"],
      ); /// category tickets
      if (category.children.size === 50)
        return interaction.editReply({
          content: client.config.messages["MAX_CHANNEL_IN_CATEGORY"],
          components: [],
          embeds: [],
          ephemeral: true,
        });

      let sup = interaction.guild.roles.cache.get(
        client.config.role["TICKET_2_ACCESS_ROLE"],
      ); // ticket access role
      let ticket_user_username = client.users.cache.find(
        (user) => user.id === interaction.member.id,
      ).username;

      /// check limit tickets
      let ticket_channel_check = await interaction.guild.channels.cache.filter(
        (channel) =>
          channel.name.substring(0, 6) === "ticket" &&
          channel.topic === interaction.member.id &&
          channel.parentId === category.id,
      );
      if (ticket_channel_check.size > 0) {
        return interaction.editReply({
          content: `Już masz otwartego ticketa!`,
          components: [],
          embeds: [],
          ephemeral: true,
        });
      }
      /// Create channel
      const ticket_channel = await interaction.guild.channels.create({
        name: `ticket-${ticket_user_username}`,
        type: 0,
        parent: category,
        topic: interaction.member.id,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.member.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
          {
            id: sup,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
        ],
      });
      await interaction.editReply({
        content: `Twoj ticket -> ${ticket_channel}`,
        embeds: [],
        components: [],
        ephemeral: true,
      });
      const informationEmbed = new EmbedBuilder()
        .setColor(client.config.embeds["ticket_embed_2"]["color"])
        .setTitle(client.config.embeds["ticket_embed_2"]["title"])
        .setDescription(
          client.config.embeds["ticket_embed_2"]["description"]
            .replace("{member}", interaction.member)
            .replace("{memberId}", interaction.member.id)
            .replace(
              "{stworzono}",
              `<t:${(interaction.member.user.createdTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace(
              "{dolaczyl}",
              `<t:${(interaction.member.joinedTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace(
              "{ticketStworzono}",
              `<t:${(ticket_channel.createdTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace("{category}", `${ticket_channel.parent.name}`),
        )
        .addFields(
          { name: bot_dev_label_1, value: bot_dev_answer_1 },
          { name: bot_dev_label_2, value: bot_dev_answer_2 },
          { name: bot_dev_label_3, value: bot_dev_answer_3 },
          { name: bot_dev_label_4, value: bot_dev_answer_4 },
          { name: bot_dev_label_5, value: bot_dev_answer_5 },
        );
      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("delete-ticket-btn")
          .setEmoji("🔒")
          .setLabel("Kliknij aby zamknąć ticketa")
          .setStyle(2),
      );
      await ticket_channel.send({
        content: `${interaction.member}`,
        embeds: [informationEmbed],
        components: [buttons],
      });
    } else if (interaction.customId == "ticket_3") {
      await interaction.reply({
        content: `Tworzenie ticketa...`,
        components: [],
        embeds: [],
        ephemeral: true,
      });
      const bot_dev_answer_1 =
        interaction.fields.getTextInputValue("ticket_answer_1");
      const bot_dev_answer_2 =
        interaction.fields.getTextInputValue("ticket_answer_2");
      const bot_dev_answer_3 =
        interaction.fields.getTextInputValue("ticket_answer_3");
      const bot_dev_answer_4 =
        interaction.fields.getTextInputValue("ticket_answer_4");
      const bot_dev_answer_5 =
        interaction.fields.getTextInputValue("ticket_answer_5");

      const bot_dev_label_1 =
        client.config.modals["ticket_gui"]["3"]["label_1"];
      const bot_dev_label_2 =
        client.config.modals["ticket_gui"]["3"]["label_2"];
      const bot_dev_label_3 =
        client.config.modals["ticket_gui"]["3"]["label_3"];
      const bot_dev_label_4 =
        client.config.modals["ticket_gui"]["3"]["label_4"];
      const bot_dev_label_5 =
        client.config.modals["ticket_gui"]["3"]["label_5"];

      /// check limit channel on category
      const category = await interaction.message.guild.channels.cache.get(
        client.config.category["CHANNEL_TICKET_3"],
      ); /// category tickets
      if (category.children.size === 50)
        return interaction.editReply({
          content: client.config.messages["MAX_CHANNEL_IN_CATEGORY"],
          components: [],
          embeds: [],
          ephemeral: true,
        });

      let sup = interaction.guild.roles.cache.get(
        client.config.role["TICKET_3_ACCESS_ROLE"],
      ); // ticket access role
      let ticket_user_username = client.users.cache.find(
        (user) => user.id === interaction.member.id,
      ).username;

      /// check limit tickets
      let ticket_channel_check = await interaction.guild.channels.cache.filter(
        (channel) =>
          channel.name.substring(0, 6) === "ticket" &&
          channel.topic === interaction.member.id &&
          channel.parentId === category.id,
      );
      if (ticket_channel_check.size > 0) {
        return interaction.editReply({
          content: `Już masz otwartego ticketa!`,
          components: [],
          embeds: [],
          ephemeral: true,
        });
      }
      /// Create channel
      const ticket_channel = await interaction.guild.channels.create({
        name: `ticket-${ticket_user_username}`,
        type: 0,
        parent: category,
        topic: interaction.member.id,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.member.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
          {
            id: sup,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
        ],
      });
      await interaction.editReply({
        content: `Twoj ticket -> ${ticket_channel}`,
        embeds: [],
        components: [],
        ephemeral: true,
      });
      const informationEmbed = new EmbedBuilder()
        .setColor(client.config.embeds["ticket_embed_3"]["color"])
        .setTitle(client.config.embeds["ticket_embed_3"]["title"])
        .setDescription(
          client.config.embeds["ticket_embed_3"]["description"]
            .replace("{member}", interaction.member)
            .replace("{memberId}", interaction.member.id)
            .replace(
              "{stworzono}",
              `<t:${(interaction.member.user.createdTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace(
              "{dolaczyl}",
              `<t:${(interaction.member.joinedTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace(
              "{ticketStworzono}",
              `<t:${(ticket_channel.createdTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace("{category}", `${ticket_channel.parent.name}`),
        )
        .addFields(
          { name: bot_dev_label_1, value: bot_dev_answer_1 },
          { name: bot_dev_label_2, value: bot_dev_answer_2 },
          { name: bot_dev_label_3, value: bot_dev_answer_3 },
          { name: bot_dev_label_4, value: bot_dev_answer_4 },
          { name: bot_dev_label_5, value: bot_dev_answer_5 },
        );
      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("delete-ticket-btn")
          .setEmoji("🔒")
          .setLabel("Kliknij aby zamknąć ticketa")
          .setStyle(2),
      );
      await ticket_channel.send({
        content: `${interaction.member}`,
        embeds: [informationEmbed],
        components: [buttons],
      });
    } else if (interaction.customId == "ticket_4") {
      await interaction.reply({
        content: `Tworzenie ticketa...`,
        components: [],
        embeds: [],
        ephemeral: true,
      });
      const bot_dev_answer_1 =
        interaction.fields.getTextInputValue("ticket_answer_1");
      const bot_dev_answer_2 =
        interaction.fields.getTextInputValue("ticket_answer_2");
      const bot_dev_answer_3 =
        interaction.fields.getTextInputValue("ticket_answer_3");
      const bot_dev_answer_4 =
        interaction.fields.getTextInputValue("ticket_answer_4");
      const bot_dev_answer_5 =
        interaction.fields.getTextInputValue("ticket_answer_5");

      const bot_dev_label_1 =
        client.config.modals["ticket_gui"]["4"]["label_1"];
      const bot_dev_label_2 =
        client.config.modals["ticket_gui"]["4"]["label_2"];
      const bot_dev_label_3 =
        client.config.modals["ticket_gui"]["4"]["label_3"];
      const bot_dev_label_4 =
        client.config.modals["ticket_gui"]["4"]["label_4"];
      const bot_dev_label_5 =
        client.config.modals["ticket_gui"]["4"]["label_5"];

      /// check limit channel on category
      const category = await interaction.message.guild.channels.cache.get(
        client.config.category["CHANNEL_TICKET_4"],
      ); /// category tickets
      if (category.children.size === 50)
        return interaction.editReply({
          content: client.config.messages["MAX_CHANNEL_IN_CATEGORY"],
          components: [],
          embeds: [],
          ephemeral: true,
        });

      let sup = interaction.guild.roles.cache.get(
        client.config.role["TICKET_4_ACCESS_ROLE"],
      ); // ticket access role
      let ticket_user_username = client.users.cache.find(
        (user) => user.id === interaction.member.id,
      ).username;

      /// check limit tickets
      let ticket_channel_check = await interaction.guild.channels.cache.filter(
        (channel) =>
          channel.name.substring(0, 6) === "ticket" &&
          channel.topic === interaction.member.id &&
          channel.parentId === category.id,
      );
      if (ticket_channel_check.size > 0) {
        return interaction.editReply({
          content: `Już masz otwartego ticketa!`,
          components: [],
          embeds: [],
          ephemeral: true,
        });
      }
      /// Create channel
      const ticket_channel = await interaction.guild.channels.create({
        name: `ticket-${ticket_user_username}`,
        type: 0,
        parent: category,
        topic: interaction.member.id,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.member.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
          {
            id: sup,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
        ],
      });
      await interaction.editReply({
        content: `Twoj ticket -> ${ticket_channel}`,
        embeds: [],
        components: [],
        ephemeral: true,
      });
      const informationEmbed = new EmbedBuilder()
        .setColor(client.config.embeds["ticket_embed_4"]["color"])
        .setTitle(client.config.embeds["ticket_embed_4"]["title"])
        .setDescription(
          client.config.embeds["ticket_embed_4"]["description"]
            .replace("{member}", interaction.member)
            .replace("{memberId}", interaction.member.id)
            .replace(
              "{stworzono}",
              `<t:${(interaction.member.user.createdTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace(
              "{dolaczyl}",
              `<t:${(interaction.member.joinedTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace(
              "{ticketStworzono}",
              `<t:${(ticket_channel.createdTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace("{category}", `${ticket_channel.parent.name}`),
        )
        .addFields(
          { name: bot_dev_label_1, value: bot_dev_answer_1 },
          { name: bot_dev_label_2, value: bot_dev_answer_2 },
          { name: bot_dev_label_3, value: bot_dev_answer_3 },
          { name: bot_dev_label_4, value: bot_dev_answer_4 },
          { name: bot_dev_label_5, value: bot_dev_answer_5 },
        );
      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("delete-ticket-btn")
          .setEmoji("🔒")
          .setLabel("Kliknij aby zamknąć ticketa")
          .setStyle(2),
      );
      await ticket_channel.send({
        content: `${interaction.member}`,
        embeds: [informationEmbed],
        components: [buttons],
      });
    } else if (interaction.customId == "ticket_5") {
      await interaction.reply({
        content: `Tworzenie ticketa...`,
        components: [],
        embeds: [],
        ephemeral: true,
      });
      const bot_dev_answer_1 =
        interaction.fields.getTextInputValue("ticket_answer_1");
      const bot_dev_answer_2 =
        interaction.fields.getTextInputValue("ticket_answer_2");
      const bot_dev_answer_3 =
        interaction.fields.getTextInputValue("ticket_answer_3");
      const bot_dev_answer_4 =
        interaction.fields.getTextInputValue("ticket_answer_4");
      const bot_dev_answer_5 =
        interaction.fields.getTextInputValue("ticket_answer_5");

      const bot_dev_label_1 =
        client.config.modals["ticket_gui"]["5"]["label_1"];
      const bot_dev_label_2 =
        client.config.modals["ticket_gui"]["5"]["label_2"];
      const bot_dev_label_3 =
        client.config.modals["ticket_gui"]["5"]["label_3"];
      const bot_dev_label_4 =
        client.config.modals["ticket_gui"]["5"]["label_4"];
      const bot_dev_label_5 =
        client.config.modals["ticket_gui"]["5"]["label_5"];

      /// check limit channel on category
      const category = await interaction.message.guild.channels.cache.get(
        client.config.category["CHANNEL_TICKET_5"],
      ); /// category tickets
      if (category.children.size === 50)
        return interaction.editReply({
          content: client.config.messages["MAX_CHANNEL_IN_CATEGORY"],
          components: [],
          embeds: [],
          ephemeral: true,
        });

      let sup = interaction.guild.roles.cache.get(
        client.config.role["TICKET_5_ACCESS_ROLE"],
      ); // ticket access role
      let ticket_user_username = client.users.cache.find(
        (user) => user.id === interaction.member.id,
      ).username;

      /// check limit tickets
      let ticket_channel_check = await interaction.guild.channels.cache.filter(
        (channel) =>
          channel.name.substring(0, 6) === "ticket" &&
          channel.topic === interaction.member.id &&
          channel.parentId === category.id,
      );
      if (ticket_channel_check.size > 0) {
        return interaction.editReply({
          content: `Już masz otwartego ticketa!`,
          components: [],
          embeds: [],
          ephemeral: true,
        });
      }
      /// Create channel
      const ticket_channel = await interaction.guild.channels.create({
        name: `ticket-${ticket_user_username}`,
        type: 0,
        parent: category,
        topic: interaction.member.id,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.member.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
          {
            id: sup,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
        ],
      });
      await interaction.editReply({
        content: `Twoj ticket -> ${ticket_channel}`,
        embeds: [],
        components: [],
        ephemeral: true,
      });
      const informationEmbed = new EmbedBuilder()
        .setColor(client.config.embeds["ticket_embed_5"]["color"])
        .setTitle(client.config.embeds["ticket_embed_5"]["title"])
        .setDescription(
          client.config.embeds["ticket_embed_5"]["description"]
            .replace("{member}", interaction.member)
            .replace("{memberId}", interaction.member.id)
            .replace(
              "{stworzono}",
              `<t:${(interaction.member.user.createdTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace(
              "{dolaczyl}",
              `<t:${(interaction.member.joinedTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace(
              "{ticketStworzono}",
              `<t:${(ticket_channel.createdTimestamp / 1000).toFixed(0)}:R>`,
            )
            .replace("{category}", `${ticket_channel.parent.name}`),
        )
        .addFields(
          { name: bot_dev_label_1, value: bot_dev_answer_1 },
          { name: bot_dev_label_2, value: bot_dev_answer_2 },
          { name: bot_dev_label_3, value: bot_dev_answer_3 },
          { name: bot_dev_label_4, value: bot_dev_answer_4 },
          { name: bot_dev_label_5, value: bot_dev_answer_5 },
        );
      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("delete-ticket-btn")
          .setEmoji("🔒")
          .setLabel("Kliknij aby zamknąć ticketa")
          .setStyle(2),
      );
      await ticket_channel.send({
        content: `${interaction.member}`,
        embeds: [informationEmbed],
        components: [buttons],
      });
    }
  } else if (interaction.type == 2) {
    if (!slashCommand)
      return client.slashCommands.delete(interaction.commandName);
    try {
      await slashCommand.run(client, interaction);
    } catch (error) {
      console.log(error);
    }
  } else if (interaction.type == 3) {
    if (interaction.customId.substring(0, 8) == "asdjsadj")
      return interaction.update({
        content: `${client.config.message["no_verify"]}`,
        ephemeral: true,
        components: [],
      });
    if (interaction.customId === "verify-btn") {
      if (interaction.member.roles.cache.has(client.config.role["verify"])) {
        interaction.update({
          content: `${client.config.message["already_verifed"]}`,
          ephemeral: true,
        });
      } else {
        interaction.update({
          content: `${client.config.message["succesfully_verifed"]}`,
          ephemeral: true,
        });
        interaction.member.roles.add(client.config.role["verify"]);
      }
    }
    if (interaction.customId === "verify-btn1") {
      if (interaction.member.roles.cache.has(client.config.role["verify"])) {
        interaction.reply({
          content: `${client.config.message["already_verifed"]}`,
          ephemeral: true,
        });
      } else {
        const emotes = [
          "🐒",
          "🦊",
          "🦁",
          "🦓",
          "🦄",
          "🐃",
          "🐬",
          "🐹",
          "🐨",
          "🐓",
          "🦉",
          "🐬",
          "🐝",
          "💐",
          "🌵",
          "🦐",
          "⚡",
          "❄️",
          "🎄",
          "🔥",
          "🍌",
          "🥜",
          "🍗",
          "🥘",
          "🍙",
        ];
        let kolor = 0;
        let delfin = false;
        shuffle(emotes);
        const row1 = new ActionRowBuilder();
        const row2 = new ActionRowBuilder();
        const row3 = new ActionRowBuilder();
        const row4 = new ActionRowBuilder();
        const row5 = new ActionRowBuilder();
        /*.addComponents(
					new ButtonBuilder()
					.setCustomId('verify-btn')
					.setLabel(client.config.buttons["verify"]["label"])
					.setStyle(client.config.buttons["verify"]["style"]),               
				);*/
        for (let i = 1; i < 26; i++) {
          if (i < 6) {
            if (emotes[i - 1] == "🐬" && delfin == false) {
              kolor = getRandomInt(4);
              row1.addComponents(
                new ButtonBuilder()
                  .setCustomId("verify-btn")
                  .setLabel(`${emotes[i - 1]}`)
                  .setStyle(kolor),
              );
              delfin = true;
            } else {
              if (emotes[i - 1] == "🐬") {
                if (kolor == 3) {
                  row1.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(3),
                  );
                } else if (kolor == 3) {
                  row1.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(4),
                  );
                } else {
                  row1.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(kolor - 1),
                  );
                }
              } else {
                row1.addComponents(
                  new ButtonBuilder()
                    .setCustomId("asdjsadj" + i)
                    .setLabel(`${emotes[i - 1]}`)
                    .setStyle(getRandomInt(4)),
                );
              }
            }
          } else if (i < 11) {
            if (emotes[i - 1] == "🐬" && delfin == false) {
              kolor = getRandomInt(4);
              row2.addComponents(
                new ButtonBuilder()
                  .setCustomId("verify-btn")
                  .setLabel(`${emotes[i - 1]}`)
                  .setStyle(kolor),
              );
              delfin = true;
            } else {
              if (emotes[i - 1] == "🐬") {
                if (kolor == 3) {
                  row2.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(3),
                  );
                } else if (kolor == 3) {
                  row2.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(4),
                  );
                } else {
                  row2.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(kolor - 1),
                  );
                }
              } else {
                row2.addComponents(
                  new ButtonBuilder()
                    .setCustomId("asdjsadj" + i)
                    .setLabel(`${emotes[i - 1]}`)
                    .setStyle(getRandomInt(4)),
                );
              }
            }
          } else if (i < 16) {
            if (emotes[i - 1] == "🐬" && delfin == false) {
              kolor = getRandomInt(3);
              row3.addComponents(
                new ButtonBuilder()
                  .setCustomId("verify-btn")
                  .setLabel(`${emotes[i - 1]}`)
                  .setStyle(kolor),
              );
              delfin = true;
            } else {
              if (emotes[i - 1] == "🐬") {
                if (kolor == 4) {
                  row3.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(3),
                  );
                } else if (kolor == 3) {
                  row3.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(4),
                  );
                } else {
                  row3.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(kolor - 1),
                  );
                }
              } else {
                row3.addComponents(
                  new ButtonBuilder()
                    .setCustomId("asdjsadj" + i)
                    .setLabel(`${emotes[i - 1]}`)
                    .setStyle(getRandomInt(4)),
                );
              }
            }
          } else if (i < 21) {
            if (emotes[i - 1] == "🐬" && delfin == false) {
              kolor = getRandomInt(4);
              row4.addComponents(
                new ButtonBuilder()
                  .setCustomId("verify-btn")
                  .setLabel(`${emotes[i - 1]}`)
                  .setStyle(kolor),
              );
              delfin = true;
            } else {
              if (emotes[i - 1] == "🐬") {
                if (kolor == 4) {
                  row4.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(3),
                  );
                } else if (kolor == 3) {
                  row4.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(4),
                  );
                } else {
                  row4.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(kolor - 1),
                  );
                }
              } else {
                row4.addComponents(
                  new ButtonBuilder()
                    .setCustomId("asdjsadj" + i)
                    .setLabel(`${emotes[i - 1]}`)
                    .setStyle(getRandomInt(4)),
                );
              }
            }
          } else if (i < 26) {
            if (emotes[i - 1] == "🐬" && delfin == false) {
              kolor = getRandomInt(4);
              row5.addComponents(
                new ButtonBuilder()
                  .setCustomId("verify-btn")
                  .setLabel(`${emotes[i - 1]}`)
                  .setStyle(kolor),
              );
              delfin = true;
            } else {
              if (emotes[i - 1] == "🐬") {
                if (kolor == 4) {
                  row5.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(3),
                  );
                } else if (kolor == 3) {
                  row5.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(4),
                  );
                } else {
                  row5.addComponents(
                    new ButtonBuilder()
                      .setCustomId("asdjsadj" + i)
                      .setLabel(`${emotes[i - 1]}`)
                      .setStyle(kolor - 1),
                  );
                }
              } else {
                row5.addComponents(
                  new ButtonBuilder()
                    .setCustomId("asdjsadj" + i)
                    .setLabel(`${emotes[i - 1]}`)
                    .setStyle(getRandomInt(4)),
                );
              }
            }
          }
        }
        if (kolor == 1) {
          kolor = "**niebieski**";
        } else if (kolor == 2) {
          kolor = "**szary**";
        } else if (kolor == 3) {
          kolor = "**zielony**";
        } else if (kolor == 4) {
          kolor = "**czerwony**";
        }
        interaction.reply({
          content: `Naciśnij ${kolor} przycisk z delfinem (\`🐬\`)`,
          components: [row1, row2, row3, row4, row5],
          ephemeral: true,
        });
      }
    } else if (interaction.customId === "reset-embed-btn") {
      if (
        interaction.member.roles.cache.has(client.config.role["embed_role"]) ||
        interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator,
        )
      ) {
        const embed = new EmbedBuilder().setDescription(`text`);
        interaction.message.edit({ embeds: [embed] });
        interaction.reply(`Zresetowano embeda`);
        setTimeout(() => {
          interaction.deleteReply();
        }, 3000);
      }
    } else if (interaction.customId === "send-embed-btn") {
      if (
        interaction.member.roles.cache.has(client.config.role["embed_role"]) ||
        interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator,
        )
      ) {
        if (interaction.message.embeds[0]) {
          await interaction.reply(`Wyslij id kanalu`);
          const member = interaction.member;
          const filter = (m) => m.member.id === member.id;

          const channel_question = await interaction.channel
            .awaitMessages({ filter, max: 1, time: 1000 * 30 })
            .catch((err) => {});

          let channel_answer = await channel_question.first();

          /// Checking whether the user has provided an answer
          if (!channel_answer) {
            return interaction.channel
              .send(`Czas  na odpowiedz minął`)
              .catch((err) => {});
          }
          let odp = channel_answer.content;
          await channel_answer.delete().catch((err) => {}); /// delete user answer
          await interaction.deleteReply().catch((err) => {}); /// delete first message
          let numb = odp.match(/\d/g);
          if (!numb)
            return interaction.message.channel.send(
              "Nie znalazłem kanału o tym id",
            );
          if (numb.length >= 18 && numb.length >= 20)
            return interaction.message.channel.send(
              "Nie znalazłem kanału o tym id",
            );
          numb = numb.join("");
          const channelSend =
            await interaction.message.guild.channels.cache.get(`${numb}`);
          if (!channelSend)
            return interaction.message.channel.send(
              "Nie znalazłem kanału o tym id",
            );

          channelSend.send({ embeds: [interaction.message.embeds[0]] });
        }
      }
    } else if (interaction.customId === "selected-menu-embed") {
      if (
        interaction.member.roles.cache.has(client.config.role["embed_role"]) ||
        interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator,
        )
      ) {
        if (interaction.values[0] === "setTitle") {
          await interaction.reply({ content: `Give title` });
          const member = interaction.member;
          const filter = (m) => m.member.id === member.id;

          const title_question = await interaction.channel
            .awaitMessages({ filter, max: 1, time: 1000 * 30 })
            .catch((err) => {});

          let title_answer = await title_question.first();

          /// Checking whether the user has provided an answer
          if (!title_answer) {
            return interaction.channel
              .send(`Czas  na odpowiedz minął`)
              .catch((err) => {});
          }
          let titleSet = title_answer.content;
          await title_answer.delete().catch((err) => {}); /// delete user answer
          await interaction.deleteReply().catch((err) => {}); /// delete first message

          const embed = new EmbedBuilder(interaction.message.embeds[0].data);

          if (titleSet.length > 255) {
            return interaction.channel
              .send(`Error -> Maksymalna liczba znakow to 255`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }

          if (titleSet.length == 0) {
            return interaction.channel.send(`Error -> :?`).then((msg) => {
              setTimeout(() => {
                msg.delete().catch((error) => {
                  if (error.code !== 10008) {
                    console.error("Error - msg delete", error);
                  }
                });
              }, 3000);
            });
          }
          embed.setTitle(`${titleSet}`);
          interaction.message.edit({ embeds: [embed] });
        } else if (interaction.values[0] === "setColor") {
          await interaction.reply({ content: `Give color (HEX)` });
          const member = interaction.member;
          const filter = (m) => m.member.id === member.id;
          const color_question = await interaction.channel
            .awaitMessages({ filter, max: 1, time: 1000 * 30 })
            .catch((err) => {});

          let color_answer = await color_question.first();

          /// Checking whether the user has provided an answer
          if (!color_answer) {
            return interaction.channel
              .send(`Czas  na odpowiedz minął`)
              .catch((err) => {});
          }
          let setColor = color_answer.content;
          await color_answer.delete().catch((err) => {}); /// delete user answer
          await interaction.deleteReply().catch((err) => {}); /// delete first message
          const embed = new EmbedBuilder(interaction.message.embeds[0].data);

          if (setColor.length != 7) {
            return interaction.channel
              .send(`Error -> Wrong Color`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }

          if (setColor.substring(0, 1) != "#") {
            return interaction.channel
              .send(`Error -> Wrong Color`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }

          embed.setColor(`${setColor}`);
          interaction.message.edit({ embeds: [embed] });
        } else if (interaction.values[0] === "setURL") {
          await interaction.reply({ content: `Give URL` });
          const member = interaction.member;
          const filter = (m) => m.member.id === member.id;
          const url_question = await interaction.channel
            .awaitMessages({ filter, max: 1, time: 1000 * 30 })
            .catch((err) => {});

          let url_answer = await url_question.first();

          /// Checking whether the user has provided an answer
          if (!url_answer) {
            return interaction.channel
              .send(`Czas  na odpowiedz minął`)
              .catch((err) => {});
          }
          let setURL = url_answer.content;
          await url_answer.delete().catch((err) => {}); /// delete user answer
          await interaction.deleteReply().catch((err) => {}); /// delete first message
          const embed = new EmbedBuilder(interaction.message.embeds[0].data);

          if (setURL.length == 0) {
            return interaction.channel
              .send(`Error -> Wrong URL`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }

          if (
            setURL.substring(0, 4) === "http" ||
            setURL.substring(0, 5) === "https"
          ) {
            let url;

            try {
              url = new URL(setURL);
              embed.setURL(`${setURL}`);
              interaction.message.edit({ embeds: [embed] });
            } catch (_) {
              return interaction.channel
                .send(`Error -> Wrong URL`)
                .then((msg) => {
                  setTimeout(() => {
                    msg.delete().catch((error) => {
                      if (error.code !== 10008) {
                        console.error("Error - msg delete", error);
                      }
                    });
                  }, 3000);
                });
            }
          } else {
            return interaction.channel
              .send(`Error -> Wrong URL`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }
        } else if (interaction.values[0] === "setAuthor") {
          await interaction.reply({ content: `Give Author` });
          const member = interaction.member;
          const filter = (m) => m.member.id === member.id;
          const author_question = await interaction.channel
            .awaitMessages({ filter, max: 1, time: 1000 * 30 })
            .catch((err) => {});

          let author_answ = await author_question.first();

          /// author_question whether the user has provided an answer
          if (!author_answ) {
            return interaction.channel
              .send(`Czas  na odpowiedz minął`)
              .catch((err) => {});
          }
          let setAuthor = author_answ.content;
          await author_answ.delete().catch((err) => {}); /// delete user answer
          await interaction.deleteReply().catch((err) => {}); /// delete first message
          const embed = new EmbedBuilder(interaction.message.embeds[0].data);

          if (setAuthor.length == 0) {
            return interaction.channel
              .send(`Error -> Wrong Author`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }

          if (setAuthor.length > 255) {
            return interaction.channel
              .send(`Error -> Maksymalna liczba znakow to 255`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }

          embed.setAuthor({ name: `${setAuthor}` });
          interaction.message.edit({ embeds: [embed] });
        } else if (interaction.values[0] === "setDescription") {
          await interaction.reply({ content: `Give Description` });
          const member = interaction.member;
          const filter = (m) => m.member.id === member.id;
          const desc_question = await interaction.channel
            .awaitMessages({ filter, max: 1, time: 1000 * 30 })
            .catch((err) => {});

          let desc_answ = await desc_question.first();

          /// author_question whether the user has provided an answer
          if (!desc_answ) {
            return interaction.channel
              .send(`Czas  na odpowiedz minął`)
              .catch((err) => {});
          }
          let setDesc = desc_answ.content;
          await desc_answ.delete().catch((err) => {}); /// delete user answer
          await interaction.deleteReply().catch((err) => {}); /// delete first message
          const embed = new EmbedBuilder(interaction.message.embeds[0].data);

          if (setDesc.length == 0) {
            return interaction.channel
              .send(`Error -> Wrong Description`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }

          if (setDesc.length > 4095) {
            return interaction.channel
              .send(`Error -> Maksymalna liczba znakow to 4095`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }

          embed.setDescription(`${setDesc}`);
          interaction.message.edit({ embeds: [embed] });
        } else if (interaction.values[0] === "setThumbnail") {
          await interaction.reply({ content: `Give URL` });
          const member = interaction.member;
          const filter = (m) => m.member.id === member.id;
          const thumb_question = await interaction.channel
            .awaitMessages({ filter, max: 1, time: 1000 * 30 })
            .catch((err) => {});

          let thumb_answ = await thumb_question.first();

          if (!thumb_answ) {
            return interaction.channel
              .send(`Czas  na odpowiedz minął`)
              .catch((err) => {});
          }
          let setThumb = thumb_answ.content;
          await thumb_answ.delete().catch((err) => {}); /// delete user answer
          await interaction.deleteReply().catch((err) => {}); /// delete first message
          const embed = new EmbedBuilder(interaction.message.embeds[0].data);

          if (setThumb.length == 0) {
            return interaction.channel
              .send(`Error -> Wrong URL`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }

          if (
            setThumb.substring(0, 4) === "http" ||
            setThumb.substring(0, 5) === "https"
          ) {
            let url;

            try {
              url = new URL(setThumb);
              embed.setThumbnail(`${setThumb}`);
              interaction.message.edit({ embeds: [embed] });
            } catch (_) {
              return interaction.channel
                .send(`Error -> Wrong URL`)
                .then((msg) => {
                  setTimeout(() => {
                    msg.delete().catch((error) => {
                      if (error.code !== 10008) {
                        console.error("Error - msg delete", error);
                      }
                    });
                  }, 3000);
                });
            }
          } else {
            return interaction.channel
              .send(`Error -> Wrong URL`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }
        } else if (interaction.values[0] === "setImage") {
          await interaction.reply({ content: `Give me URL to image` });
          const member = interaction.member;
          const filter = (m) => m.member.id === member.id;
          const image_question = await interaction.channel
            .awaitMessages({ filter, max: 1, time: 1000 * 30 })
            .catch((err) => {});

          let image_answ = await image_question.first();

          if (!image_answ) {
            return interaction.channel
              .send(`Czas  na odpowiedz minął`)
              .catch((err) => {});
          }
          let setImage = image_answ.content;
          await image_answ.delete().catch((err) => {}); /// delete user answer
          await interaction.deleteReply().catch((err) => {}); /// delete first message
          const embed = new EmbedBuilder(interaction.message.embeds[0].data);

          if (setImage.length == 0) {
            return interaction.channel
              .send(`Error -> Wrong URL`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }

          if (
            setImage.substring(0, 4) === "http" ||
            setImage.substring(0, 5) === "https"
          ) {
            let url;

            try {
              url = new URL(setImage);
              embed.setImage(`${setImage}`);
              interaction.message.edit({ embeds: [embed] });
            } catch (_) {
              return interaction.channel
                .send(`Error -> Wrong URL`)
                .then((msg) => {
                  setTimeout(() => {
                    msg.delete().catch((error) => {
                      if (error.code !== 10008) {
                        console.error("Error - msg delete", error);
                      }
                    });
                  }, 3000);
                });
            }
          } else {
            return interaction.channel
              .send(`Error -> Wrong URL`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }
        } else if (interaction.values[0] === "setFooter") {
          await interaction.reply({ content: `Give me a footer` });
          const member = interaction.member;
          const filter = (m) => m.member.id === member.id;
          const footer_question = await interaction.channel
            .awaitMessages({ filter, max: 1, time: 1000 * 30 })
            .catch((err) => {});

          let footer_answ = await footer_question.first();

          if (!footer_answ) {
            return interaction.channel
              .send(`Czas  na odpowiedz minął`)
              .catch((err) => {});
          }
          let setFooter = footer_answ.content;
          await footer_answ.delete().catch((err) => {}); /// delete user answer
          await interaction.deleteReply().catch((err) => {}); /// delete first message
          const embed = new EmbedBuilder(interaction.message.embeds[0].data);

          if (setFooter.length == 0) {
            return interaction.channel
              .send(`Error -> Wrong Footer`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }
          if (setFooter.length > 2048) {
            return interaction.channel
              .send(`Error -> Max Character is 2048`)
              .then((msg) => {
                setTimeout(() => {
                  msg.delete().catch((error) => {
                    if (error.code !== 10008) {
                      console.error("Error - msg delete", error);
                    }
                  });
                }, 3000);
              });
          }

          embed.setFooter({ text: `${setFooter}` });
          interaction.message.edit({ embeds: [embed] });
        } else {
          interaction.reply(`Unknown option`);
          setTimeout(() => {
            interaction.deleteReply();
          }, 3000);
        }
      }
    } else if (interaction.customId === "selected-menu-ticket") {
      if (interaction.values[0] === "1") {
        const back_dev_modal = new ModalBuilder()
          .setCustomId("ticket_1")
          .setTitle(client.config.modals["ticket_gui"]["1"]["title"]);
        const back_dev_input_1 = new TextInputBuilder()
          .setCustomId("ticket_answer_1")
          .setLabel(client.config.modals["ticket_gui"]["1"]["label_1"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["1"]["placeholder_1"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_2 = new TextInputBuilder()
          .setCustomId("ticket_answer_2")
          .setLabel(client.config.modals["ticket_gui"]["1"]["label_2"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["1"]["placeholder_2"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_modal_1 = new ActionRowBuilder().addComponents(
          back_dev_input_1,
        );
        const back_dev_modal_2 = new ActionRowBuilder().addComponents(
          back_dev_input_2,
        );
        back_dev_modal.addComponents(back_dev_modal_1, back_dev_modal_2);
        await interaction.showModal(back_dev_modal);
      } else if (interaction.values[0] === "2") {
        const back_dev_modal = new ModalBuilder()
          .setCustomId("ticket_2")
          .setTitle(client.config.modals["ticket_gui"]["2"]["title"]);
        const back_dev_input_1 = new TextInputBuilder()
          .setCustomId("ticket_answer_1")
          .setLabel(client.config.modals["ticket_gui"]["2"]["label_1"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["2"]["placeholder_1"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_2 = new TextInputBuilder()
          .setCustomId("ticket_answer_2")
          .setLabel(client.config.modals["ticket_gui"]["2"]["label_2"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["2"]["placeholder_2"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_3 = new TextInputBuilder()
          .setCustomId("ticket_answer_3")
          .setLabel(client.config.modals["ticket_gui"]["2"]["label_3"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["2"]["placeholder_3"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_4 = new TextInputBuilder()
          .setCustomId("ticket_answer_4")
          .setLabel(client.config.modals["ticket_gui"]["2"]["label_4"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["2"]["placeholder_4"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_5 = new TextInputBuilder()
          .setCustomId("ticket_answer_5")
          .setLabel(client.config.modals["ticket_gui"]["2"]["label_5"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["2"]["placeholder_5"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_modal_1 = new ActionRowBuilder().addComponents(
          back_dev_input_1,
        );
        const back_dev_modal_2 = new ActionRowBuilder().addComponents(
          back_dev_input_2,
        );
        const back_dev_modal_3 = new ActionRowBuilder().addComponents(
          back_dev_input_3,
        );
        const back_dev_modal_4 = new ActionRowBuilder().addComponents(
          back_dev_input_4,
        );
        const back_dev_modal_5 = new ActionRowBuilder().addComponents(
          back_dev_input_5,
        );
        back_dev_modal.addComponents(
          back_dev_modal_1,
          back_dev_modal_2,
          back_dev_modal_3,
          back_dev_modal_4,
          back_dev_modal_5,
        );
        await interaction.showModal(back_dev_modal);
      } else if (interaction.values[0] === "3") {
        const back_dev_modal = new ModalBuilder()
          .setCustomId("ticket_3")
          .setTitle(client.config.modals["ticket_gui"]["3"]["title"]);
        const back_dev_input_1 = new TextInputBuilder()
          .setCustomId("ticket_answer_1")
          .setLabel(client.config.modals["ticket_gui"]["3"]["label_1"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["3"]["placeholder_1"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_2 = new TextInputBuilder()
          .setCustomId("ticket_answer_2")
          .setLabel(client.config.modals["ticket_gui"]["3"]["label_2"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["3"]["placeholder_2"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_3 = new TextInputBuilder()
          .setCustomId("ticket_answer_3")
          .setLabel(client.config.modals["ticket_gui"]["3"]["label_3"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["3"]["placeholder_3"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_4 = new TextInputBuilder()
          .setCustomId("ticket_answer_4")
          .setLabel(client.config.modals["ticket_gui"]["3"]["label_4"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["3"]["placeholder_4"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_5 = new TextInputBuilder()
          .setCustomId("ticket_answer_5")
          .setLabel(client.config.modals["ticket_gui"]["3"]["label_5"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["3"]["placeholder_5"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_modal_1 = new ActionRowBuilder().addComponents(
          back_dev_input_1,
        );
        const back_dev_modal_2 = new ActionRowBuilder().addComponents(
          back_dev_input_2,
        );
        const back_dev_modal_3 = new ActionRowBuilder().addComponents(
          back_dev_input_3,
        );
        const back_dev_modal_4 = new ActionRowBuilder().addComponents(
          back_dev_input_4,
        );
        const back_dev_modal_5 = new ActionRowBuilder().addComponents(
          back_dev_input_5,
        );
        back_dev_modal.addComponents(
          back_dev_modal_1,
          back_dev_modal_2,
          back_dev_modal_3,
          back_dev_modal_4,
          back_dev_modal_5,
        );
        await interaction.showModal(back_dev_modal);
      } else if (interaction.values[0] === "4") {
        const back_dev_modal = new ModalBuilder()
          .setCustomId("ticket_4")
          .setTitle(client.config.modals["ticket_gui"]["4"]["title"]);
        const back_dev_input_1 = new TextInputBuilder()
          .setCustomId("ticket_answer_1")
          .setLabel(client.config.modals["ticket_gui"]["4"]["label_1"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["4"]["placeholder_1"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_2 = new TextInputBuilder()
          .setCustomId("ticket_answer_2")
          .setLabel(client.config.modals["ticket_gui"]["4"]["label_2"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["4"]["placeholder_2"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_3 = new TextInputBuilder()
          .setCustomId("ticket_answer_3")
          .setLabel(client.config.modals["ticket_gui"]["4"]["label_3"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["4"]["placeholder_3"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_4 = new TextInputBuilder()
          .setCustomId("ticket_answer_4")
          .setLabel(client.config.modals["ticket_gui"]["4"]["label_4"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["4"]["placeholder_4"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_5 = new TextInputBuilder()
          .setCustomId("ticket_answer_5")
          .setLabel(client.config.modals["ticket_gui"]["4"]["label_5"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["4"]["placeholder_5"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_modal_1 = new ActionRowBuilder().addComponents(
          back_dev_input_1,
        );
        const back_dev_modal_2 = new ActionRowBuilder().addComponents(
          back_dev_input_2,
        );
        const back_dev_modal_3 = new ActionRowBuilder().addComponents(
          back_dev_input_3,
        );
        const back_dev_modal_4 = new ActionRowBuilder().addComponents(
          back_dev_input_4,
        );
        const back_dev_modal_5 = new ActionRowBuilder().addComponents(
          back_dev_input_5,
        );
        back_dev_modal.addComponents(
          back_dev_modal_1,
          back_dev_modal_2,
          back_dev_modal_3,
          back_dev_modal_4,
          back_dev_modal_5,
        );
        await interaction.showModal(back_dev_modal);
      } else if (interaction.values[0] === "5") {
        const back_dev_modal = new ModalBuilder()
          .setCustomId("ticket_5")
          .setTitle(client.config.modals["ticket_gui"]["5"]["title"]);
        const back_dev_input_1 = new TextInputBuilder()
          .setCustomId("ticket_answer_1")
          .setLabel(client.config.modals["ticket_gui"]["5"]["label_1"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["5"]["placeholder_1"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_2 = new TextInputBuilder()
          .setCustomId("ticket_answer_2")
          .setLabel(client.config.modals["ticket_gui"]["5"]["label_2"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["5"]["placeholder_2"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_3 = new TextInputBuilder()
          .setCustomId("ticket_answer_3")
          .setLabel(client.config.modals["ticket_gui"]["5"]["label_3"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["5"]["placeholder_3"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_4 = new TextInputBuilder()
          .setCustomId("ticket_answer_4")
          .setLabel(client.config.modals["ticket_gui"]["5"]["label_4"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["5"]["placeholder_4"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_input_5 = new TextInputBuilder()
          .setCustomId("ticket_answer_5")
          .setLabel(client.config.modals["ticket_gui"]["5"]["label_5"])
          .setMaxLength(4000)
          .setPlaceholder(
            client.config.modals["ticket_gui"]["5"]["placeholder_5"],
          )
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph);
        const back_dev_modal_1 = new ActionRowBuilder().addComponents(
          back_dev_input_1,
        );
        const back_dev_modal_2 = new ActionRowBuilder().addComponents(
          back_dev_input_2,
        );
        const back_dev_modal_3 = new ActionRowBuilder().addComponents(
          back_dev_input_3,
        );
        const back_dev_modal_4 = new ActionRowBuilder().addComponents(
          back_dev_input_4,
        );
        const back_dev_modal_5 = new ActionRowBuilder().addComponents(
          back_dev_input_5,
        );
        back_dev_modal.addComponents(
          back_dev_modal_1,
          back_dev_modal_2,
          back_dev_modal_3,
          back_dev_modal_4,
          back_dev_modal_5,
        );
        await interaction.showModal(back_dev_modal);
      }
    } else if (interaction.customId === "delete-ticket-btn") {
      if (
        !(
          interaction.member.roles.cache.has(
            config.role["TICKET_1_ACCESS_ROLE"],
          ) ||
          interaction.member.roles.cache.has(
            config.role["TICKET_2_ACCESS_ROLE"],
          ) ||
          interaction.member.roles.cache.has(
            config.role["TICKET_3_ACCESS_ROLE"],
          ) ||
          interaction.member.roles.cache.has(
            config.role["TICKET_4_ACCESS_ROLE"],
          ) ||
          interaction.member.roles.cache.has(
            config.role["TICKET_5_ACCESS_ROLE"],
          )
        )
      )
        return;
      await interaction.reply(`Tworzenie transcripta...`);
      await interaction.channel.messages.fetch().then(async (messages) => {
        const moment = require("moment");
        const handleTime = (timestamp) =>
          moment(timestamp)
            .format("DD/MM/YYYY - hh:mm:ss a")
            .replace("pm", "PM")
            .replace("am", "AM");
        let i = 0;
        let hastebin_content = interaction.channel.name;
        for (let message of messages.reverse()) {
          i++;
          hastebin_content =
            hastebin_content +
            "\n" +
            handleTime(message[1].createdTimestamp) +
            " | " +
            message[1].author.tag +
            ": " +
            message[1].content;
          if (message[1].embeds.length > 0) {
            for (let i = 0; i < message[1].embeds.length; i++) {
              hastebin_content =
                hastebin_content +
                "\n ! EMBED ! " +
                message[1].embeds[i].description;
              for (let i1 = 0; i1 < message[1].embeds[i].fields.length; i1++) {
                hastebin_content =
                  hastebin_content +
                  `Nazwa: ` +
                  message[1].embeds[i].fields[i1].name +
                  "\n" +
                  `Wartość: ` +
                  message[1].embeds[i].fields[i1].value;
              }
            }
          }
          if (message[1].attachments.size > 0) {
            await message[1].attachments.forEach((url) => {
              hastebin_content =
                hastebin_content + "\n ! ATTACHMENTS ! " + url.proxyURL;
            });
          }
        }
        const file = new AttachmentBuilder(
          await Buffer.from(hastebin_content, "utf-8"),
          { name: `${interaction.channel.name}.txt` },
        );

        await interaction.guild.channels.cache
          .get(config.channels["LOGS_TICKET"])
          .send({ content: interaction.channel.id, files: [file] });
      });
      await interaction.channel.send(
        `Kanal zostanie usuniety w ciagu 5 sekund`,
      );
      setTimeout(() => {
        if (interaction.channel) {
          interaction.channel.delete().catch((err) => {});
        }
      }, 5000);
    } else if (interaction.customId === "sklep-btn-1") {
      const embed = new EmbedBuilder()
        .setColor(client.config.embeds["sklep-user"]["color"])
        .setTitle(client.config.embeds["sklep-user"]["title"])
        .setDescription(client.config.embeds["sklep-user"]["description"])
        .setImage(client.config.embeds["sklep-user"]["image"]);
      interaction.reply({ embeds: [embed], ephemeral: true });
    } else if (interaction.customId === "sklep-btn-2") {
      const embed = new EmbedBuilder()
        .setColor(client.config.embeds["sklep2-user"]["color"])
        .setTitle(client.config.embeds["sklep2-user"]["title"])
        .setDescription(client.config.embeds["sklep2-user"]["description"])
        .setImage(client.config.embeds["sklep2-user"]["image"]);
      interaction.reply({ embeds: [embed], ephemeral: true });
    } else if (interaction.customId === "sklep-btn-3") {
      const embed = new EmbedBuilder()
        .setColor(client.config.embeds["sklep3-user"]["color"])
        .setTitle(client.config.embeds["sklep3-user"]["title"])
        .setDescription(client.config.embeds["sklep3-user"]["description"])
        .setImage(client.config.embeds["sklep3-user"]["image"]);
      interaction.reply({ embeds: [embed], ephemeral: true });
    } else if (
      interaction.customId === "ankieta-odpowiedz-1" ||
      interaction.customId === "ankieta-odpowiedz-2"
    ) {
      const fs = require("fs-extra");
      let embed = interaction.message.embeds[0].description;
      let button1 = interaction.message.components[0].components[0].disabled;
      let button2 = interaction.message.components[0].components[1].disabled;
      const start = embed.indexOf("<t:");
      const koniec = embed.indexOf(":R");
      const czas = embed.substring(start + 3, koniec);
      if (new Date().getTime() / 1000 > czas) {
        if (button1 == false || button2 == false) {
          const button_1 = new ButtonBuilder(
            interaction.message.components[0].components[0].data,
          );
          const button_2 = new ButtonBuilder(
            interaction.message.components[0].components[1].data,
          );
          button_1.setDisabled(true);
          button_2.setDisabled(true);
          let nmr = parseInt(
            button_1.data.label.substring(
              button_1.data.label.indexOf(`1: `) + 3,
            ),
          );
          let nmr2 = parseInt(
            button_2.data.label.substring(
              button_2.data.label.indexOf(`2: `) + 3,
            ),
          );
          button_1.setLabel(
            `1: ` + nmr + `(${((nmr / (nmr + nmr2)) * 100).toFixed(2)}%)`,
          );
          button_2.setLabel(
            `2: ` + nmr2 + `(${((nmr2 / (nmr + nmr2)) * 100).toFixed(2)}%)`,
          );
          if (nmr == 0) {
            button_1.setLabel(`1: 0(0.00%)`);
          }
          if (nmr2 == 0) {
            button_2.setLabel(`2: 0(0.00%)`);
          }
          const row = new ActionRowBuilder().addComponents(button_1, button_2);
          fs.remove(`./${interaction.message.id}.json`);
          interaction.message.edit({ components: [row] });
        }
        return interaction.reply({
          content: client.config.message["ankieta_koniec"],
          ephemeral: true,
        });
      } else {
        await fs
          .pathExists(`./${interaction.message.id}.json`)
          .then(async (exists) => {
            if (exists == false) {
              let data = `${interaction.member.id},`;
              await fs
                .writeJson(`./${interaction.message.id}.json`, data, {
                  name: `${interaction.message.id}`,
                })
                .then(async () => {
                  let data = `${interaction.member.id},`;
                  await fs
                    .writeJson(`./${interaction.message.id}.json`, data, {
                      name: `${interaction.message.id}`,
                    })
                    .then(() => {
                      let id = interaction.customId.substring(18, 19);
                      let btn = null;
                      let btn2 = null;
                      if (id == 1) {
                        btn = new ButtonBuilder(
                          interaction.message.components[0].components[0].data,
                        );
                        btn2 = new ButtonBuilder(
                          interaction.message.components[0].components[1].data,
                        );

                        let nmr = btn.data.label.substring(
                          btn.data.label.indexOf(`${id}: `) + 3,
                        );
                        let label = btn.data.label.substring(0, 3);
                        btn.setLabel(label + `${parseInt(nmr) + 1}`);
                        const row = new ActionRowBuilder().addComponents(
                          btn,
                          btn2,
                        );
                        interaction.message.edit({ components: [row] });
                        return interaction.reply({
                          content: client.config.message["dodano_glos"],
                          ephemeral: true,
                        });
                      } else {
                        btn = new ButtonBuilder(
                          interaction.message.components[0].components[1].data,
                        );
                        btn2 = new ButtonBuilder(
                          interaction.message.components[0].components[0].data,
                        );
                        let nmr = btn.data.label.substring(
                          btn.data.label.indexOf(`${id}: `) + 3,
                        );
                        let label = btn.data.label.substring(0, 3);
                        btn.setLabel(label + `${parseInt(nmr) + 1}`);
                        const row = new ActionRowBuilder().addComponents(
                          btn2,
                          btn,
                        );
                        interaction.message.edit({ components: [row] });
                        return interaction.reply({
                          content: client.config.message["dodano_glos"],
                          ephemeral: true,
                        });
                      }
                    });
                });
            } else {
              await fs.readJson(
                `./${interaction.message.id}.json`,
                async (err, txt) => {
                  if (err) console.error(err);
                  if (txt.includes(`${interaction.member.id}`)) {
                    return interaction.reply({
                      content: client.config.message["oddano_juz_glos"],
                      ephemeral: true,
                    });
                  } else {
                    let data = txt + `${interaction.member.id},`;
                    await fs
                      .writeJson(`./${interaction.message.id}.json`, data, {
                        name: `${interaction.message.id}`,
                      })
                      .then(() => {
                        let id = interaction.customId.substring(18, 19);
                        let btn = null;
                        let btn2 = null;
                        if (id == 1) {
                          btn = new ButtonBuilder(
                            interaction.message.components[0].components[0].data,
                          );
                          btn2 = new ButtonBuilder(
                            interaction.message.components[0].components[1].data,
                          );

                          let nmr = btn.data.label.substring(
                            btn.data.label.indexOf(`${id}: `) + 3,
                          );
                          let label = btn.data.label.substring(0, 3);
                          btn.setLabel(label + `${parseInt(nmr) + 1}`);
                          const row = new ActionRowBuilder().addComponents(
                            btn,
                            btn2,
                          );
                          interaction.message.edit({ components: [row] });
                          return interaction.reply({
                            content: client.config.message["dodano_glos"],
                            ephemeral: true,
                          });
                        } else {
                          btn = new ButtonBuilder(
                            interaction.message.components[0].components[1].data,
                          );
                          btn2 = new ButtonBuilder(
                            interaction.message.components[0].components[0].data,
                          );
                          let nmr = btn.data.label.substring(
                            btn.data.label.indexOf(`${id}: `) + 3,
                          );
                          let label = btn.data.label.substring(0, 3);
                          btn.setLabel(label + `${parseInt(nmr) + 1}`);
                          const row = new ActionRowBuilder().addComponents(
                            btn2,
                            btn,
                          );
                          interaction.message.edit({ components: [row] });
                          return interaction.reply({
                            content: client.config.message["dodano_glos"],
                            ephemeral: true,
                          });
                        }
                      });
                  }
                },
              );
            }
          });
      }
    }
  }
});
