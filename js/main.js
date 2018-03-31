// jQuery + AJAX

$(document).ready(function(){                 // callback fn, tells us when doc is ready, finished loading
  $('#searchUser').on('keyup', function(e){   // id='searchUser' in index.html
                                              // 'keyup' event handler (when key is pressed); e = event parameter
    let username = e.target.value;            // set to whatever is passed into searchUser

    // Make 1st request to GitHub API [for data fr url below]
    $.ajax({
      url:'https://api.github.com/users/'+username,   // send request to this url
      data:{                                          // w my OAuth credentials
        client_id:'29edc531fa9d44d20587',
        client_secret:'9799db5c28acc2d9cd302518a21fde4398dcaea6'
      }
    }).done(function(user){

      // Make 2nd AJAX request (from inside "done" for 1st request) for repos [as url is different]
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'29edc531fa9d44d20587',
          client_secret:'9799db5c28acc2d9cd302518a21fde4398dcaea6',
          sort: 'created: asc',               // sort by 'date: latest first'
          per_page: 5                         // and keep only 5
        }
      }).done(function(repos){                // returns repos
        $.each(repos, function(index, repo){  // loop thru repos array, and place in repos div (bottom)
          $('#repos').append(`
            <div class="well">
              <div class="row">

                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>

                <div class="col-md-3">
                  <span class="label label-primary">Forks: ${repo.forks_count}</span>
                  <span class="label label-success">Watchers: ${repo.watchers_count}</span>
                  <span class="label label-info">Stars: ${repo.stargazers_count}</span>
                </div>

                <div class="col-md-2">
                  <a class="btn btn-default" href="${repo.html_url}" target="_blank">Repo Page</a>
                </div>

              </div>
            </div>
          `);  // 'append' adds to list, 'well' gives grey background
        });

      });

      // use template literals (ES6 syntax) - string literals allowing embedded expressions, w backtick (`) [see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals]
      // {added ES6 syntax highlighter "JavaScript NG", but dn work well}
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
                <span class="label label-default">Public Repos: &nbsp;${user.public_repos}</span>
                <span class="label label-primary">Public Gists: &nbsp;${user.public_gists}</span>
                <span class="label label-success">Followers: &nbsp;${user.followers}</span>
                <span class="label label-info">Following: &nbsp;${user.following}</span>

                <br><br>

                <ul class="list-group">
                  <li class="list-group-item">Company: &nbsp;${user.company}</li>
                  <li class="list-group-item">Website/Blog: &nbsp;${user.blog}</li>
                  <li class="list-group-item">Location: &nbsp;${user.location}</li>
                  <li class="list-group-item">Member since: &nbsp;${user.created_at}</li>
                  <li class="list-group-item">Email: &nbsp;${user.email}</li>
                  <li class="list-group-item">Bio: &nbsp;${user.bio}</li>
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