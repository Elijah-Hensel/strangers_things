const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";
const logoutButton = `<button type="button" id="logout-btn" class="btn btn-sm btn-outline-primary">LOG OUT</button>`;
const loginButton = `<button type="button" id="login-btn" class="btn btn-sm btn-outline-primary">LOG IN</button>`;
const signupButton = `<button type="button" id="signup-btn" class="btn btn-sm btn-outline-primary">SIGN UP</button>`;
const messageButton = `<button type="button" id="message-btn" class="btn btn-sm btn-outline-primary">MESSAGES</button>`;
const head = `<div id="title"><h3 class="animate__animated animate__backInRight">STRANGER'S THINGS</h3></div>`;
const subNav = `
              <nav class="sub-nav">
                <form class="search-form" action="/search">
                  <input type="text" id="mySearch" name="search-term" placeholder="search">
                  <!-- <button type="click"><i class="search-button">search</i></button> -->
                </form>

              </nav>
`;
const postsButton = `<button type="button" id="posts-btn" class="btn btn-sm btn-outline-primary">POSTS</button>`;
const token = localStorage.getItem("token");

const renderLogoutButton = () => {
  $(".right-buttons").append(logoutButton);
};

const renderLoginButton = () => {
  $(".right-buttons").append(loginButton);
};

const renderSignupButton = () => {
  $(".right-buttons").append(signupButton);
};

const renderMessageButton = () => {
  $(".right-buttons").append(messageButton);
};

const renderPostButton = () => {
  $(".right-buttons").append(postsButton);
  $("#posts-btn").on("click", () => {
    window.location.href = "/posts";
  });
};

const renderPage = () => {
  $("#navbar").append(subNav, head);
  if (localStorage.getItem("token")) {
    renderLogoutButton();
    renderMessageButton();
  } else if (!localStorage.getItem("token")) {
    renderLoginButton();
    renderSignupButton();
  }
};

const rightButtonListeners = () => {
  $("#logout-btn").on("click", function () {
    localStorage.clear();
    localStorage.setItem("loggedIn", false);
    $("#logout-btn, #message-btn, #message, #message-element").remove();
    $("#my-posts").text(`LOG IN to create posts!`);
    renderLoginButton();
    renderSignupButton();
    rightButtonListeners();
  });

  $("#sign-up").on("submit", async function (event) {
    event.preventDefault();
    try {
      const username = $("#username").val();
      const password = $("#password").val();
      const confirmPassword = $("#confirm-password").val();
      if (password === confirmPassword) {
        const response = await getUserToken(username, password);
        $("#sign-up-div").slideUp();
        isLoggedIn();
        window.location.href = "/index.html";
        return response;
      } else {
        alert("Your passwords are not the same. Try again!");
      }
    } catch (err) {
      throw err;
    }
  });

  $("#login-btn").click(() => {
    window.location.href = "/login";
  });

  $("#signup-btn").click(() => {
    window.location.href = "/register";
  });

  $("#message-btn").click(() => {
    window.location.href = "/messages";
  });
};

$(document).ready(function () {
  $("#mySearch").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $(".card").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

renderPage();
rightButtonListeners();
