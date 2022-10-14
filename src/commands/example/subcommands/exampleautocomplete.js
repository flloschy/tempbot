module.exports = {
    shortdescription: "Autocomplete example",
    longdescription: "How to use Autocomplete with Tempbot",
    args: [
        {name:'example', description:'example', type:'STRING', required:true, autocomplete:true}
    ],

    //this gets called when new commandinteraction gets created
    execute: async function(interaction) {
        await interaction.editReply({content:"[Subcommand](1) got executed: " + __filename.split("\\").pop()});
    },
    autocomplete: async function(interaction) {
        let choices = ["Value1", "Value2", "Value3", "ValuE WiTh RanDom CapITAl LeTtErs", "FULL UPPERCASE STRING", "full lowercase string"]
        
        const focusedValue = interaction.options.getFocused()
        let filtered = choices.filter(choice => choice.toLowerCase().startsWith(focusedValue.toLowerCase()))
        if (filtered.length > 25) 
            filtered = filtered.slice(0, 24)
        await interaction.respond(filtered.map(choice => ({ name: choice, value: choice })))
    }
}