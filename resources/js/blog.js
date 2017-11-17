/* A Bunch Of Get ANd Post Requests To Modify / Change Blog */
/* Contents in realtime using websockets */
$(document).ready(() => {});

const saveChangesAbout = () => {
  const postData = {
    data: returnNewAbout()
  };
  $.post('/api/update/about', postData).done((data) => {
    $('#adminMessage').append(showWarningMessage('Success!!', 'About Me Page Has Been Updated'));
    $(`#about`).val('');
    setTimeout(() => {
      $('#successMessage').remove();
    }, 3000);
  });
}

const returnNewAbout = () => {
  return $('#about').val();
}

const showWarningMessage = (heading, body) => {
  return (`<div id="successMessage" class="container">
    <div class="alert alert-success" role="alert">
      <strong>${heading}</strong> ${body}
    </div>
  </div>`);
};
