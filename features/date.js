module.exports = {
    getDate: function(callback) {
        var dateObj = new Date();

        var day = dateObj.getDate();
        var month = dateObj.getMonth() + 1;
        var year = dateObj.getFullYear();

        var hours = dateObj.getHours();
        var minutes = ('0' + dateObj.getMinutes()).slice(-2);

        callback([
            day,
            month,
            year,
            hours,
            minutes
        ])
    }
};