var invoke = require('../invoke')
var queryMeds = require('../query');
//var DailyRotateFile = require("winston-daily-rotate-file");


/**
 * For creating note Document
 */
let submitNotes = async (data) => {

    console.log("data is:", data);
    try {
        const createNotes = await invoke('createNotes',data);
        // console.log("meddoc ", meddoc);
        return { result: createNotes };

    } catch (err) {

        return { result: err };
    }

};

/**
 * For creating note Document
 */
let changeNotes = async (data) => {

    console.log("data is:", data);
    try {
        const changeNotes = await invoke('changeNotes',data);
        // console.log("meddoc ", meddoc);
        return { result: changeNotes };

    } catch (err) {

        return { result: err };
    }

};

/**
 * 
 * For querying note Document
 */
let removeNote = async (data) => {

    // logger.info(req);

    console.log("data is:", data);
    try {
        const removeNote = await invoke('changeNotes', data);
        // console.log("meddoc ", meddoc);
        return { result: removeNote };

    } catch (err) {

        return { result: err };
    }

};
/**
 * 
 * For querying note Document
 */
let allNotes = async () => {

    // logger.info(req);


    try {
        const allNotesdata = await queryMeds('queryAllnotes');
        return { result: allNotesdata };


    } catch (err) {

        return { result: err };
    }

};

module.exports = { submitNotes, allNotes, changeNotes, removeNote};