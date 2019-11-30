const apiKey = process.env["AIRTABLE_API"];
const tableBase = process.env["AIRTABLE_BASE"];
const Airtable = require("airtable");
const base = new Airtable({ apiKey: apiKey }).base(tableBase);
const moment = require("moment");
module.exports = async function(context, req) {
    context.log("JavaScript HTTP trigger function processed a request.");

    if (req.query.fed) {
        var current = moment.utc().zone(7).format("YYYY-MM-DD HH:mm:ss");
        console.log(current);
        base("Feedings").create(
            [
                {
                    fields: {
                        Feeding: current
                    }
                }
            ],
            function(err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                records.forEach(function(record) {
                    console.log(record.getId());
                });
            }
        );
        return (context.res = {
            // status: 200, /* Defaults to 200 */
            body: "The bunnies were just fed"
        });
    }

    if (req.query.check) {
        const record = await base("Feedings")
            .select({
                maxRecords: 1,
                sort: [{ field: "Feeding", direction: "desc" }]
            })
            .all();

        const time = moment(record[0].get('Feeding')).format("MMM D, YYYY h:mm a");
        console.log(time);

        return (context.res = {
            body: "The bunnies were last fed at " + time
        });
    }

    return (context.res = {
        body: "Nothing happened"
    });
};
