function createStylesForComment() {
  var sheet = document.createElement("style");
  sheet.innerHTML = `
  .mivishal-p-2 {
    padding: 0.5rem !important;
  }

  .mivishal-p-3 {
    padding: 1rem !important;
  }

  .mivishal-ml-3 {
    margin-left: 1rem !important;
  }

  .mivishal-mr-4 {
    margin-right: 1.5rem !important;
  }

  .mivishal-row {
    display: flex;
    flex-wrap: wrap;
  }

  .mivishal-col {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }

  .mivishal-col-1 {
    flex: 0 0 8.3333333333%;
    max-width: 8.3333333333%;
  }
  
  .mivishal-col-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }

  .mivishal-justify-content-end {
    justify-content: flex-end !important;
  }

  .mivishal-form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .mivishal-btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    background-color: #fed136;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  button {
    background-color: #BDBDBD;
  }
  .comment {
    border-bottom: 1px solid #d3d3d3;
  }

  .comment__user-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    background-color: #d8e2dc;
    border-radius: 4px;
  }

  .comment__user-icon .fa-user {
    color: #2a9d8f;
  }

  .comment__user-name {
    font-weight: 700;
  }

  .comment__date {
    font-size: 0.8em;
    color: #d3d3d3;
  }

  .comment__content {
    font-size: 0.9em;
    font-weight: 300;
  }

  .fa-star {
    font-size: 16px;
    color: #d3d3d3;
    cursor: pointer;
  }

  .fa-star[data-prefix="fas"] {
    color: #fed136;
  }

  .comment__user-rating .fa-star {
    font-size: 14px;
    cursor: default;
  }
  `;

  return sheet;
}

function createScripts() {
  var script = document.createElement('script');
  script.src = 'https://use.fontawesome.com/releases/v5.15.1/js/all.js';
  script.crossOrigin = 'anonymous';

  return script;
}

function createBootstrapLink() {
  var link = document.createElement('link');
  link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css';
  link.rel = 'stylesheet';
  link.integrity = 'sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0';
  link.crossOrigin = 'anonymous';
  
  return link;
}

function getRatingsComponent(containerId, rating, static) {
  return `
  <div class="mivishal-row row" id="comment__ratings__star-container${containerId ? "-" + containerId : ""}">
    <div ${!static ? 'onclick="onClickStar(1)"' : ''}>
      <i class="${rating >= 1 ? 'fas' : 'far'} fa-star"></i>
    </div>
    <div ${!static ? 'onclick="onClickStar(2)"' : ''}>
      <i class="${rating >= 2 ? 'fas' : 'far'} fa-star"></i>
    </div>
    <div ${!static ? 'onclick="onClickStar(3)"' : ''}>
      <i class="${rating >= 3 ? 'fas' : 'far'} fa-star"></i>
    </div>
    <div ${!static ? 'onclick="onClickStar(4)"' : ''}>
      <i class="${rating >= 4 ? 'fas' : 'far'} fa-star"></i>
    </div>
    <div ${!static ? 'onclick="onClickStar(5)"' : ''}>
      <i class="${rating >= 5 ? 'fas' : 'far'} fa-star"></i>
    </div>
  </div>
  `
}

function addRatingsComponent(container, rating) {
  for (var i=1; i<=5; ++i) {
    if (i <= rating) {
      container.appendChild(getStar(i, 'solid'));
    } else {
      container.appendChild(getStar(i, 'outlined'));
    }
  }
}

function createCommentBox() {
  var ele = document.createElement("DIV");
  ele.innerHTML = `
  <div class="container">
    <div class="mivishal-row row">
      <h3>Comments</h3>
    </div>
    <div class="mivishal-row row">
      <div class="mivishal-col-3 col-3 comment__ratings">
        <div class="mivishal-row row">
          <h5>Overall Rating</h5>
        </div>
        <input id="comment-rating-value" hidden value="0" />
        ${getRatingsComponent()}
      </div>
      <div class="mivishal-col col">
        <textarea rows="4" class="mivishal-form-control form-control" name="comment" id="mivishal-review-comment"></textarea>
      </div>
    </div>
    <div class="mivishal-row row mivishal-justify-content-end mivishal-p-2">
      <button type="button" class="mivishal-btn btn btn-primary" onclick="onClickAddComment()">Add</button>
    </div>
  </div>
  `;

  return ele;
}

function getStar(position, type) {
  var star = document.createElement('div');
  star.setAttribute('onclick', `onClickStar(${position})`);
  star.innerHTML = `<i class="${type === 'solid' ? 'fas' : 'far'} fa-star"></i>`;

  return star;
}

function onClickStar(rating) {
  var starContainer = document.getElementById('comment__ratings__star-container');
  var valueInput = document.getElementById('comment-rating-value');
  valueInput.value = rating;
  while (starContainer.firstChild) {
    starContainer.removeChild(starContainer.firstChild);
  }
  addRatingsComponent(starContainer, rating);
}

function createComment(commentId, username, comment, rating, createAt) {
  var ele = document.createElement("DIV");
  ele.innerHTML = `
  <div class="container">
    <div class="mivishal-row row comment mivishal-p-3">
      <div class="mivishal-col-1 col-1">
        <div class="comment__user-icon">
          <i class="fas fa-user"></i>
        </div>
      </div>
      <div class="mivishal-col col mivishal-ml-3">
        <div class="mivishal-row row">
          <div class="comment__user-name mivishal-mr-4">
            ${username}
          </div>
          <div class="comment__user-rating mivishal-mr-4">
            ${getRatingsComponent(commentId, rating, true)}
          </div>
          <div class="comment__date">
            ${createAt}
          </div>
        </div>
        <div class="mivishal-row row comment__content">
          ${comment}
        </div>
      </div>
    </div>
  </div>
  `;

  return ele;
}

function showCommentBox() {
  var threadRoot = document.getElementById('mivishal-review-thread');
  threadRoot.appendChild(createScripts());
  threadRoot.appendChild(createStylesForComment());
  threadRoot.appendChild(createCommentBox());
}

function showComments(comments) {
  var commentsRoot = document.createElement('div');
  commentsRoot.id = 'mivishal-comments-root';

  comments.forEach(c => {
    var ele = createComment(c.id, c.user_name, c.comment, (c.rating || 0), c.created_at);
    commentsRoot.appendChild(ele);
  });

  var threadRoot = document.getElementById('mivishal-review-thread');
  threadRoot.appendChild(commentsRoot);
}

function refereshComments(comments) {
  var commentsRoot = document.getElementById('mivishal-comments-root');
  if (commentsRoot) {
    commentsRoot.remove();
  }
  showComments(comments);
}

function getComments() {
  fetch(`https://mivishal.com/services/reviews.php?requrl=${miVishalReviewConfig.pageUrl}`, {
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => {
    refereshComments(json);
  });
}

function onClickAddComment() {
  var comment = document.getElementById('mivishal-review-comment').value;
  var rating = document.getElementById('comment-rating-value').value;
  var user = JSON.parse(localStorage.getItem('user'));
  
  fetch(`https://mivishal.com/services/reviews.php?requrl=${miVishalReviewConfig.pageUrl}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      userId: user.userid,
      username: user.username,
      comment,
      rating
    })
  })
  .then(res => {
    if (res.ok) {
      document.getElementById('mivishal-review-comment').value = '';
      getComments();
      onClickStar(0);
    }
  });
}

(function() {
  if (window.miVishalReviewConfig && localStorage.getItem('user')) {
    showCommentBox();
    getComments();
  }
})();