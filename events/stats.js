const client = require("../index");

client.on("ready", async () => {
   
    

    setInterval( async() =>{
        const guild_id = client.config.guild_id
        let guild_members = await client.guilds.cache.get(guild_id).members.fetch({ withPresences: true })
        const guild = await client.guilds.cache.get(guild_id)

        let onlineMembers = {
         online: await guild_members.filter((online) => online.presence?.status === "online" && online.roles.cache.has(client.config.role["stats_role"])).size,
         idle: await guild_members.filter((online) => online.presence?.status === "idle" && online.roles.cache.has(client.config.role["stats_role"])).size,
         dnd: await guild_members.filter((online) => online.presence?.status === "dnd" && online.roles.cache.has(client.config.role["stats_role"])).size
        }
        const channel = await guild.channels.cache.get(client.config.channels["all_members"]["id"]);
        const channel1 = await guild.channels.cache.get(client.config.channels["members_role"]["id"]);
        if(!channel || !channel1) return;

       channel.setName(client.config.channels["all_members"]["name"].replace("{count}", guild.memberCount));
       channel1.setName(client.config.channels["members_role"]["name"].replace(`{count}`,onlineMembers.online + onlineMembers.idle + onlineMembers.dnd));
    }, 900000);

});
