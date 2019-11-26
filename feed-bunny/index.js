module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.fed) {
        return context.res = {
            // status: 200, /* Defaults to 200 */
            body: 'The bunnies were just fed' 
        };
    }

    if (req.query.check) {
        return context.res = {
            body: 'Just checking if the bunnies were fed today'
        }
    }

    context.res = {
        body: 'Nothing happened'
    }
};