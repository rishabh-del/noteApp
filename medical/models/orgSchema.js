var mongoose = require('mongoose');

const OrgSchema = new mongoose.Schema(
  {

    orgName: {
      type: String
    },
    chaincodeVersion: {

    type: String
    },
    port1:{
      type : Number
    },
    port2:{
        type : Number
      },
    port3:{
        type : Number
      },
  },
  { collection: 'orgdata' },
);

const Org = mongoose.model('Org', OrgSchema);
module.exports = { Org };