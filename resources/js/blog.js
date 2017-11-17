/* A Bunch Of Get ANd Post Requests To Modify / Change Blog */
/* Contents in realtime using websockets */
$(document).ready(() => {
  const check = window.location.pathname.includes('/admin/edit/posts');
  if (check) {
    $.get('/api/getAllPosts', (result) => {
      for (let i = result.data.length - 1; i >= 0; i--) {
        $('#allPosts').append(postCard(result.data[i], i));
      }
    });
  }
});

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

const postCard = (data, index) => {
  return (`<div class="col-sm-8 col-md-4 col-lg-3 ">
      <div onclick="redirectTo(${index})" class="card shadow">
        <img class="card-img-top img-fluid" src=${data.images[0].url} alt="Card image cap">
        <div class="card-block">
          <br />
          <div class="contain-card">
            <h4 class="card-title">${data.title}</h4>
            <p class="card-text">${data.subheading}</p>
          </div>
       </div>
       <br />
       <blockquote class="blockquote contain-card">Click To Edit Post</blockquote>
       <div class="card-footer text-center">
        <small class="text-muted">
          Date Created: ${formatDate(data.date)}
        </small>
      </div>
    </div>
  </div>`);
}

const formatDate = (date) => {
  return date.substring(0, 10);
}

const redirectTo = (urlIndex) => {
  window.location.href = `/admin/edit/post/${urlIndex+1}`;
}
