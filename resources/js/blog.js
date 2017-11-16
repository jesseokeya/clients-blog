/* A Bunch Of Get ANd Post Requests To Modify / Change Blog */
/* Contents in realtime using websockets */
$(document).ready(() => {});

const saveChangesAbout = () => {
  const postData = {
    data: returnNewAbout()
  };
  $.post('/api/update/about', postData).done((data) => {
    $('#adminMessage').append(showWarningMessage('Success!!', 'About Me Page Has Been Updated'));
    const numberOfFields = 3;
    for (let i = 0; i < numberOfFields; i++) {
      const description = $(`#description${i}`).val('');
    }
    setTimeout(() => {
      $('#successMessage').remove();
    }, 3000);
  });
}

const returnNewAbout = () => {
  let newAboutMe = [];
  const numberOfFields = 3;
  for (let i = 0; i < numberOfFields; i++) {
    const description = $(`#description${i}`).val();
    newAboutMe.push({content: description})
  }
  return newAboutMe;
}

const showWarningMessage = (heading, body) => {
  return (`<div id="successMessage" class="container">
    <div class="alert alert-success" role="alert">
      <strong>${heading}</strong> ${body}
    </div>
  </div>`);
};
