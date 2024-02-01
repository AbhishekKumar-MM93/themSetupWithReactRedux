import React from "react";
import { TrendingUp, User, Box, DollarSign } from "react-feather";

function Dashboard() {
  return (
    <div>
      {/* <!-- BEGIN: Main Menu--> */}
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper container-xxl p-0">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              <div className="row match-height">
                <div className="col-xl-12 col-md-6 col-12">
                  <div className="card card-statistics">
                    <div className="card-body statistics-body">
                      <div className="row">
                        <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div className="d-flex flex-row">
                            <div className="avatar bg-light-primary me-2">
                              <div className="avatar-content">
                                <TrendingUp />
                              </div>
                            </div>
                            <div className="my-auto">
                              <h4 className="fw-bolder mb-0">230k</h4>
                              <p className="card-text font-small-3 mb-0">
                                Sales
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div className="d-flex flex-row">
                            <div className="avatar bg-light-info me-2">
                              <div className="avatar-content">
                                <User />
                              </div>
                            </div>
                            <div className="my-auto">
                              <h4 className="fw-bolder mb-0">8.549k</h4>
                              <p className="card-text font-small-3 mb-0">
                                Customers
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                          <div className="d-flex flex-row">
                            <div className="avatar bg-light-danger me-2">
                              <div className="avatar-content">
                                <Box />
                              </div>
                            </div>
                            <div className="my-auto">
                              <h4 className="fw-bolder mb-0">1.423k</h4>
                              <p className="card-text font-small-3 mb-0">
                                Products
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12">
                          <div className="d-flex flex-row">
                            <div className="avatar bg-light-success me-2">
                              <div className="avatar-content">
                                <DollarSign />
                              </div>
                            </div>
                            <div className="my-auto">
                              <h4 className="fw-bolder mb-0">$9745</h4>
                              <p className="card-text font-small-3 mb-0">
                                Revenue
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--/ Statistics Card --> */}
              </div>
            </section>
            {/* <!-- Dashboard Ecommerce ends --> */}
          </div>
        </div>
      </div>
      {/* <!-- END: Main Menu--> */}
    </div>
  );
}

export default Dashboard;
