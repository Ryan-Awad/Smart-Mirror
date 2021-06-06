module.exports = {
    parseCalBody: function(body) {
        let clear = body.clear;
        let day = body.day;
        let event;
        let importance;
        let cmdLine;

        if (clear) {
            cmdLine = `node cal.js -c ${day}`; // 'day' can also = "all"
        } else {
            event = body.event;
            importance = body.importance;

            cmdLine = `node cal.js -d ${day} -n ${event}`;
            if (importance != 0) {
                cmdLine += ` -i ${importance}`;
            }
        }

        return cmdLine;
    }
};