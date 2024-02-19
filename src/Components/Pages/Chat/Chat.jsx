import React from "react";

function Chat() {
  return (
    <div>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper container-xxl p-0">
          <div className="content-header row">
            <div className="content-header-left col-md-9 col-12 mb-2"></div>
          </div>
          <div className="content-body"></div>

          <div class="sidebar-left">
            <div class="sidebar">
              {/* <!-- Admin user profile area --> */}

              {/* <!-- User Details end --> */}
            </div>
            {/* <!--/ Admin user profile area --> */}

            {/* <!-- Chat Sidebar area --> */}
            <div class="sidebar-content">
              {/* <!-- Sidebar header start --> */}
              <div class="chat-fixed-search">
                <div class="d-flex align-items-center w-100">
                  <div class="sidebar-profile-toggle">
                    <div class="avatar avatar-border">
                      <img
                        src="../../../app-assets/images/portrait/small/avatar-s-11.jpg"
                        alt="user_avatar"
                        height="42"
                        width="42"
                      />
                      <span class="avatar-status-online"></span>
                    </div>
                  </div>
                  <div class="input-group input-group-merge ms-1 w-100">
                    <span class="input-group-text round">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-search text-muted"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </span>
                    <input
                      type="text"
                      class="form-control round"
                      id="chat-search"
                      placeholder="Search or start a new chat"
                      aria-label="Search..."
                      aria-describedby="chat-search"
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Sidebar header end --> */}

              {/* <!-- Sidebar Users start --> */}
              <div
                id="users-list"
                class="chat-user-list-wrapper list-group ps ps--active-y "
              >
                <h4 class="chat-list-title">Chats</h4>
                <ul class="chat-users-list chat-list media-list">
                  <li class="active">
                    <span class="avatar">
                      <img
                        src="../../../app-assets/images/portrait/small/avatar-s-3.jpg"
                        height="42"
                        width="42"
                        alt="Generic placeholder image"
                      />
                      <span class="avatar-status-offline"></span>
                    </span>
                    <div class="chat-info flex-grow-1">
                      <h5 class="mb-0">Elizabeth Elliott</h5>
                      <p class="card-text text-truncate">
                        Cake pie jelly jelly beans. Marzipan lemon drops halvah
                        cake. Pudding cookie lemon drops icing
                      </p>
                    </div>
                    <div class="chat-meta text-nowrap">
                      <small class="float-end mb-25 chat-time">4:14 PM</small>
                    </div>
                  </li>
                  <li class="">
                    <span class="avatar">
                      <img
                        src="../../../app-assets/images/portrait/small/avatar-s-7.jpg"
                        height="42"
                        width="42"
                        alt="Generic placeholder image"
                      />
                      <span class="avatar-status-busy"></span>
                    </span>
                    <div class="chat-info flex-grow-1">
                      <h5 class="mb-0">Kristopher Candy</h5>
                      <p class="card-text text-truncate">
                        Cake pie jelly jelly beans. Marzipan lemon drops halvah
                        cake. Pudding cookie lemon drops icing
                      </p>
                    </div>
                    <div class="chat-meta text-nowrap">
                      <small class="float-end mb-25 chat-time">9:09 AM</small>
                    </div>
                  </li>
                  <li class="">
                    <span class="avatar">
                      <img
                        src="../../../app-assets/images/portrait/small/avatar-s-8.jpg"
                        height="42"
                        width="42"
                        alt="Generic placeholder image"
                      />
                      <span class="avatar-status-away"></span>
                    </span>
                    <div class="chat-info flex-grow-1">
                      <h5 class="mb-0">Sarah Woods</h5>
                      <p class="card-text text-truncate">
                        Cake pie jelly jelly beans. Marzipan lemon drops halvah
                        cake. Pudding cookie lemon drops icing.
                      </p>
                    </div>
                    <div class="chat-meta text-nowrap">
                      <small class="float-end mb-25 chat-time">5:48 PM</small>
                    </div>
                  </li>
                  <li class="no-results" style={{ display: "list-item" }}>
                    <h6 class="mb-0">No Chats Found</h6>
                  </li>
                </ul>

                <h4 class="chat-list-title">Contacts</h4>
                <ul class="chat-users-list contact-list media-list">
                  <li>
                    <span class="avatar">
                      <img
                        src="../../../app-assets/images/portrait/small/avatar-s-7.jpg"
                        height="42"
                        width="42"
                        alt="Generic placeholder image"
                      />
                    </span>
                    <div class="chat-info">
                      <h5 class="mb-0">Jenny Perich</h5>
                      <p class="card-text text-truncate">
                        Tart dragée carrot cake chocolate bar. Chocolate cake
                        jelly beans caramels tootsie roll candy canes.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span class="avatar">
                      <img
                        src="../../../app-assets/images/portrait/small/avatar-s-5.jpg"
                        height="42"
                        width="42"
                        alt="Generic placeholder image"
                      />
                    </span>
                    <div class="chat-info">
                      <h5 class="mb-0">Sarah Montgomery</h5>
                      <p class="card-text text-truncate">
                        Tootsie roll sesame snaps biscuit icing jelly-o biscuit
                        chupa chups powder.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span class="avatar">
                      <img
                        src="../../../app-assets/images/portrait/small/avatar-s-9.jpg"
                        height="42"
                        width="42"
                        alt="Generic placeholder image"
                      />
                    </span>
                    <div class="chat-info">
                      <h5 class="mb-0">Heather Howell</h5>
                      <p class="card-text text-truncate">
                        Tart cookie dragée sesame snaps halvah. Fruitcake sugar
                        plum gummies cheesecake toffee.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span class="avatar">
                      <img
                        src="../../../app-assets/images/portrait/small/avatar-s-7.jpg"
                        height="42"
                        width="42"
                        alt="Generic placeholder image"
                      />
                    </span>
                    <div class="chat-info">
                      <h5 class="mb-0">Kelly Reyes</h5>
                      <p class="card-text text-truncate">
                        Wafer toffee tart jelly cake croissant chocolate bar
                        cupcake donut. Fruitcake gingerbread tiramisu sweet
                        jelly-o.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span class="avatar">
                      <img
                        src="../../../app-assets/images/portrait/small/avatar-s-15.jpg"
                        height="42"
                        width="42"
                        alt="Generic placeholder image"
                      />
                    </span>
                    <div class="chat-info">
                      <h5 class="mb-0">Kristopher Candy</h5>
                      <p class="card-text text-truncate">
                        Marzipan bonbon chocolate bar biscuit lemon drops muffin
                        jelly-o sweet jujubes.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span class="avatar">
                      <img
                        src="../../../app-assets/images/portrait/small/avatar-s-14.jpg"
                        height="42"
                        width="42"
                        alt="Generic placeholder image"
                      />
                    </span>
                    <div class="chat-info">
                      <h5 class="mb-0">Vincent Nelson</h5>
                      <p class="card-text text-truncate">
                        Toffee gummi bears sugar plum gummi bears chocolate bar
                        donut. Pudding cookie lemon drops icing
                      </p>
                    </div>
                  </li>
                  <li>
                    <span class="avatar">
                      <img
                        src="../../../app-assets/images/portrait/small/avatar-s-17.jpg"
                        height="42"
                        width="42"
                        alt="Generic placeholder image"
                      />
                    </span>
                    <div class="chat-info">
                      <h5 class="mb-0">Jimmy Parker</h5>
                      <p class="card-text text-truncate">
                        Powder halvah jelly beans topping caramels muffin dragée
                        lollipop oat cake.
                      </p>
                    </div>
                  </li>

                  <li class="no-results" style={{ display: "list-item" }}>
                    <h6 class="mb-0">No Contacts Found</h6>
                  </li>
                </ul>
              </div>
              {/* <!-- Sidebar Users end --> */}
            </div>
            {/* <!--/ Chat Sidebar area --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
