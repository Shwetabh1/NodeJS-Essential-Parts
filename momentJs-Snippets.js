let formattedDate = moment(payload.dob.value, 'MM/DD/YYYY').format(mirthDate.COMMA_DELIMITED_DATE_FORMATS.NO_TIME);
// TODO use mirth-date module.
function formatDateAndTime(t, outFormat = 'MM/DD/YYYY, HH:mm A', inFormat = 'YYYY-MM-DD[T]HH:mm:ss.SSSZ') {
    if (_.isPlainObject(t) && _.get(t, 'value')) {
        return moment(t.value, inFormat).format(outFormat);
    } else if (_.isString(t)) {
        return moment(t, inFormat).format(outFormat);
    } else {
        return 'No Date';
    }
}

function formatDate(t, outFormat = 'MM/DD/YYYY', inFormat = 'YYYY-MM-DD[T]HH:mm:ss.SSSZ') {
    return formatDateAndTime(t, outFormat, inFormat);
}

function formatDates(t1, t2) {
    let formattedT1 = formatDate(t1);
    let formattedT2 = formatDate(t2);
    return `${formattedT1 === 'No Date' ? 'No Start Date' : formattedT1} - ${formattedT2 === 'No Date' ? 'No End Date' : formattedT2}`;
}