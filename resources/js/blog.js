/* A Bunch Of Get ANd Post Requests To Modify / Change Blog */
/* Contents in realtime using websockets */
$(document).ready(() => {});

const saveChangesAbout = () => {
  const postData = { data: returnNewAbout() };
  $.post('/api/update/about', postData)
   .done(function(data) {
    console.log(data);
  });
}

const returnNewAbout = () => {
  let newAboutMe = [];
  const numberOfFields = 3;
  for (let i = 0; i < numberOfFields; i++) {
    const description = $(`#description${i}`).val();
    newAboutMe.push({content: description})
  }
  console.log(newAboutMe);
  return newAboutMe;
}

const populateAbout = () => {
  
}
