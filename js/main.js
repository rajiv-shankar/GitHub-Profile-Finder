// jQuery

$(document).ready(function(){                 // callback fn, tells us when doc is ready, finished loading
  $('#searchUser').on('keyup', function(e){   // id='searchUser' in index.html
                                              // 'keyup' event handler (when key is pressed); e = event parameter
    let username = e.target.value;            // will be set to whatever is passed in

    // Make request to GitHub
    $.ajax({
      url:'https://api.github.com/users/'+username,   // send request to this url
      data:{                                          // w my OAuth credentials below
        client_id:'29edc531fa9d44d20587',
        client_secret:'9799db5c28acc2d9cd302518a21fde4398dcaea6'
      }
    }).done(function(user){                   // use template literals (ES6 syntax):
                                              // string literals allowing embedded expressions, w backtick (`) [see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals]
                                              // {added ES6 syntax highlighter "JavaScript NG", but dn work well}

      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{                                          // w my OAuth credentials below
          client_id:'29edc531fa9d44d20587',
          client_secret:'9799db5c28acc2d9cd302518a21fde4398dcaea6',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well">
              <div class="row">
              <div class="col-md-7">
                <strong>${repo.name}</strong>: ${repo.description}
              </div>
              <div class="col-md-3">

              </div>
              <div class="col-md-2">

              </div>
              </div>
            </div>
          `);
        });

      });

      $('#profile').html(`

        <div class="panel panel-default">

          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>

          <div class="panel-body">

            <div class="row">

              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a class="btn btn-primary btn-block" href="${user.html_url}" target="_blank">View Profile</a>
              </div>

              <div class="col-md-9">
                <span class="label label-default">Public Repos: ${user.public_repos}</span>
                <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                <span class="label label-success">Followers: ${user.followers}</span>
                <span class="label label-info">Following: ${user.following}</span>

                <br><br>

                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/Blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member since: ${user.created_at}</li>
                </ul>

              </div>
            </div>
          </div>
        </div>

        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>

        `);
    });                         // returns a promise?
  });
});

// console.log('key pressed')
// console.log(e.target.value)
// console.log(user)