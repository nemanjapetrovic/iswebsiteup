function timeConversion(milliseconds) {
    if (!milliseconds) {
        return 'No data';
    }

    var seconds = (milliseconds / 1000).toFixed(1);
    if (seconds < 60) {
        return seconds + " Sec";
    }

    var minutes = (milliseconds / (1000 * 60)).toFixed(1);
    if (minutes < 60) {
        return minutes + " Min";
    }

    var hours = (milliseconds / (1000 * 60 * 60)).toFixed(1);
    if (hours < 24) {
        return hours + " Hrs";
    }

    var days = (milliseconds / (1000 * 60 * 60 * 24)).toFixed(1);
    return days + " Days"
};

function toDateTime(dateTime) {
    var retVal = (dateTime) ? new Date(dateTime).toLocaleString() : 'No data';
    return retVal;
};