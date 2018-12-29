const fs = require('fs');

var fetchNotes = () => {
  try{
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }catch(e){
    console.log("File doesn't exists");
    return [];
  }


};





var saveNote = (notes) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};


var logNote = (note) => {
  console.log("-------------");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
  console.log("-------------");

}


var addNotes = (title,body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };



  var duplicateNote = notes.filter((note) => {
    return note.title === title
  });

  if(duplicateNote.length === 0){
    notes.push(note);
    saveNote(notes);
    return note;
  }else{
    console.log("Already have note with same name");
  }



};

var getAll = () => {
  console.log('getting all notes');
  return fetchNotes();
};

var getNote = (noteName) => {
  console.log('Reading ', noteName);
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => {
    return note.title === noteName
  });
  return filteredNotes[0];
};

var removeNote = (noteName) => {
  console.log('Removing ', noteName);
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note)=>{
    return note.title !== noteName
  });
  saveNote(filteredNotes);

  return notes.length !== filteredNotes.length;

};

module.exports = {
  addNotes,
  getAll,
  getNote,
  removeNote,
  logNote
}
