const _ = require('lodash');
const fs = require('fs');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe : 'Title of note',
  demand : true,
  alias : 't'
};


const argv = yargs
  .command('add','Add a new note',{
    title : titleOptions,
    body : {
      describe : 'Body of note',
      demand : true,
      alias : 'b'
    }
  })
  .command('list','list all notes')
  .command('read','read a new note',{
    title : titleOptions
  })
  .command('remove','remove a note',{
    title : titleOptions
  })
  .argv;
var command = argv._[0]; //process.argv[2];

if(command === 'add'){
  var note = notes.addNotes(argv.title , argv.body);
  if(note){
    console.log("Note Added successfully");
    notes.logNote(note);
  }else{
    console.log("Error while adding note");
  }
}else if(command === 'list'){
  var allNotes = notes.getAll();
  allNotes.forEach((note) => {
    notes.logNote(note);
  });
}else if(command === 'remove'){
  var noteRemove = notes.removeNote(argv.title);
  var message = noteRemove ? "Remove successfully" : "Note Found";

  console.log(message);


}else if(command === 'read'){
  var note = notes.getNote(argv.title);
  if(note){
    console.log("Note Found")
    notes.logNote(note);
  }else{
    console.log("Note not found");
  }
}else{
  console.log("Command not recognised");
}
