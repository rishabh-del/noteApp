var logger = require('../logger');
var invoke = require('../invoke')
var queryMeds = require('../query');
//var DailyRotateFile = require("winston-daily-rotate-file");


/**
 * For creating Medical Document
 */
let submitNotes = async (data) => {

    console.log("data is:", data);
    try {
        const createNotes = await invoke(data);
        // console.log("meddoc ", meddoc);
        return { result: createNotes };

    } catch (err) {

        return { result: err };
    }

};


/**
 * 
 * For querying Medical Document
 */
let allNotes = async (req) => {

    // logger.info(req);


    try {
        const allNotesdata = await queryMeds(req, 'getHistoryForNotes');
        return { result: allNotesdata };


    } catch (err) {

        return { result: err };
    }

};

module.exports = { submitNotes, allNotes};