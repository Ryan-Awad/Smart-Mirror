module.exports = {
    getDate: function(callback) {
        let dateObj = new Date();

        let day = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear();

        let hours = dateObj.getHours();
        let minutes = ('0' + dateObj.getMinutes()).slice(-2);

        callback([
            day,
            month,
            year,
            hours,
            minutes
        ])
    }
};