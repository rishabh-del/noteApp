/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

'use strict';
const shim = require('fabric-shim');
const util = require('util');

let Chaincode = class {

  // The Init method is called when the Smart Contract 'fabcar' is instantiated by the blockchain network
  // Best practice is to have any Ledger initialization in separate function -- see initLedger()
  async Init(stub) {
    console.info('=========== Instantiated fabcar chaincode ===========');
    return shim.success();
  }

  // The Invoke method is called as a result of an application request to run the Smart Contract
  // 'fabcar'. The calling application program has also specified the particular smart contract
  // function to be called, with arguments
  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);

    let method = this[ret.fcn];
    if (!method) {
      console.error('no function of name:' + ret.fcn + ' found');
      throw new Error('Received unknown function ' + ret.fcn + ' invocation');
    }
    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }

  // async queryCar(stub, args) {
  //   if (args.length != 1) {
  //     throw new Error('Incorrect number of arguments. Expecting CarNumber ex: CAR01');
  //   }
  //   let carNumber = args[0];

  //   let carAsBytes = await stub.getState(carNumber); //get the car from chaincode state
  //   if (!carAsBytes || carAsBytes.toString().length <= 0) {
  //     throw new Error(carNumber + ' does not exist: ');
  //   }
  //   console.log(carAsBytes.toString());
  //   return carAsBytes;
  // }

  async initLedger(stub, args) {
    console.info('============= START : Initialize Ledger ===========');
    let notes = [];
    notes.push({
      make: 'Toyota'
    });
    notes.push({
      make: 'Ford'
    });
    for (let i = 0; i < notes.length; i++) {
      notes[i].docType = 'note';
      await stub.putState('NOTE' + i, Buffer.from(JSON.stringify(notes[i])));
      console.info('Added <--> ', notes[i]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  async createNotes(stub, args) {
    console.info('============= START : Create Notes ===========');
    if (args.length != 2) {
      throw new Error('Incorrect number of arguments. Expecting 2');
    }

    var note = {
      docType: 'note',
      make: args[1]
    };

    await stub.putState(args[0], Buffer.from(JSON.stringify(note)));
    console.info('Added <--> ', note);
    console.info('============= END : Create Car ===========');
  }


  // async getHistoryForNotes(stub, args, thisClass) {

  //   if (args.length < 1) {
  //     throw new Error('Incorrect number of arguments. Expecting 1')
  //   }
  //   let marbleName = args[0];
  //   console.info('- start getHistoryForKey: %s\n', marbleName);

  //   let resultsIterator = await stub.getHistoryForKey(marbleName);
  //   let method = thisClass['getAllResults'];
  //   let results = await method(resultsIterator, true);

  //   return Buffer.from(JSON.stringify(results));
  // }


  async queryAllnotes(stub, args) {

    let startKey = 'choice1';
    let endKey = 'choice999';

    let iterator = await stub.getStateByRange(startKey, endKey);

    let allResults = [];
    while (true) {
      let res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};
        console.log(res.value.value.toString('utf8'));

        jsonRes.Key = res.value.key;
        try {
          jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
        } catch (err) {
          console.log(err);
          jsonRes.Record = res.value.value.toString('utf8');
        }
        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await iterator.close();
        console.info(allResults);
        return Buffer.from(JSON.stringify(allResults));
      }
    }
  }

  async changeNotes(stub, args) {
    console.info('============= START : changeCarOwner ===========');
    if (args.length != 2) {
      throw new Error('Incorrect number of arguments. Expecting 2');
    }

    let noteAsBytes = await stub.getState(args[0]);
    let note = JSON.parse(noteAsBytes);
    note.make = args[1];

    await stub.putState(args[0], Buffer.from(JSON.stringify(note)));
    console.info('============= END : changeCarOwner ===========');
  }
};

shim.start(new Chaincode());
