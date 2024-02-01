import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import "../User/user.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/actions/action";

function ProductTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState(10);

  const dispatch = useDispatch();
  const { products, totalPages } = useSelector((state) => state.products);

  useEffect(() => {
    try {
      const page = currentPage;
      const pageSize = entries ? entries : 10;
      dispatch(fetchProduct(page, pageSize, searchQuery));
    } catch (error) {
      console.log(error.message, "== = == = == = == error = = = == ");
    }
  }, [searchQuery, entries, dispatch]);

  const handleEntries = (e) => {
    const value = parseInt(e.target.value, 10);
    setEntries(value);
    setCurrentPage(1);
    dispatch(fetchProduct(1, value, searchQuery));
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage < totalPages) {
      dispatch(fetchProduct(currentPage + 1, entries, searchQuery));
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage > 1) {
      dispatch(fetchProduct(currentPage - 1, entries, searchQuery));
    }
  };

  const handlePageClick = (pageno) => {
    setCurrentPage(pageno);
    dispatch(fetchProduct(pageno, entries, searchQuery));
  };

  const renderPagination = () => {
    const paginationItems = [];

    paginationItems.push(
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button className="page-link" tabIndex="-1" onClick={handlePrevPage}>
          Previous
        </button>
      </li>
    );

    for (let i = 1; i <= totalPages; i++) {
      if (totalPages <= 3 || Math.abs(currentPage - i) <= 1) {
        paginationItems.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => handlePageClick(i)}>
              {i}
            </button>
          </li>
        );
      } else if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        paginationItems.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => handlePageClick(i)}>
              {i === 1 || i === totalPages ? "..." : i}
            </button>
          </li>
        );
      }
    }

    paginationItems.push(
      <li
        key="next"
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button className="page-link" onClick={handleNextPage}>
          Next
        </button>
      </li>
    );

    return paginationItems;
  };

  return (
    <div>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper container-xxl p-0">
          <div className="content-header row">
            <div className="content-header-left col-md-9 col-12 mb-2"></div>
          </div>
          <div className="content-body">
            <section id="basic-datatable">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div
                      id="DataTables_Table_0_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="card-header border-bottom p-1">
                        <div className="head-label">
                          <h6 className="mb-0">Product Data Table</h6>
                        </div>
                        <div className="dt-action-buttons text-end">
                          <div className="dt-buttons d-inline-flex">
                            <button
                              className="dt-button buttons-collection btn btn-outline-secondary dropdown-toggle me-2"
                              tabIndex="0"
                              aria-controls="DataTables_Table_0"
                              type="button"
                              aria-haspopup="true"
                            >
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-share font-small-4 me-50"
                                >
                                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                  <polyline points="16 6 12 2 8 6"></polyline>
                                  <line x1="12" y1="2" x2="12" y2="15"></line>
                                </svg>
                                Data Export
                              </span>
                            </button>
                            <button
                              className="dt-button create-new btn btn-primary"
                              tabIndex="0"
                              aria-controls="DataTables_Table_0"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#modals-slide-in"
                            >
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-plus me-50 font-small-4"
                                >
                                  <line x1="12" y1="5" x2="12" y2="19"></line>
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add New Record
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="pagination-container">
                        <div className="pagination-select">
                          <label>Show</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handleEntries}
                          >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="35">35</option>
                            <option value="50">50</option>
                          </select>
                          <label>Entry</label>
                        </div>

                        <div className="pagination-search">
                          <label>
                            Search:
                            <input
                              type="search"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </label>
                          {searchQuery && (
                            <i>
                              <X
                                className="x-icon"
                                onClick={() => setSearchQuery("")}
                              />
                            </i>
                          )}
                        </div>
                      </div>

                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                          </tr>
                        </thead>
                        {products?.map((one, index) => (
                          <tbody>
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{one.name}</td>
                              <td>{one.discription}</td>
                              <td>{one.quantity}</td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                      <nav aria-label="...">
                        <ul className="pagination">{renderPagination()}</ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Modal to add new record --> */}
              <div className="modal modal-slide-in fade" id="modals-slide-in">
                <div className="modal-dialog sidebar-sm">
                  <form className="add-new-record modal-content pt-0">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <div className="modal-header mb-1">
                      <h5 className="modal-title" id="exampleModalLabel">
                        New Record
                      </h5>
                    </div>
                    <div className="modal-body flex-grow-1">
                      <div className="mb-1">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control dt-full-name"
                          id="basic-icon-default-fullname"
                          placeholder="John Doe"
                          aria-label="John Doe"
                        />
                      </div>
                      <div className="mb-1">
                        <label className="form-label">Post</label>
                        <input
                          type="text"
                          id="basic-icon-default-post"
                          className="form-control dt-post"
                          placeholder="Web Developer"
                          aria-label="Web Developer"
                        />
                      </div>
                      <div className="mb-1">
                        <label className="form-label">Email</label>
                        <input
                          type="text"
                          id="basic-icon-default-email"
                          className="form-control dt-email"
                          placeholder="john.doe@example.com"
                          aria-label="john.doe@example.com"
                        />
                        <small className="form-text">
                          {" "}
                          You can use letters, numbers &amp; periods{" "}
                        </small>
                      </div>
                      <div className="mb-1">
                        <label className="form-label">Joining Date</label>
                        <input
                          type="text"
                          className="form-control dt-date flatpickr-input"
                          id="basic-icon-default-date"
                          placeholder="MM/DD/YYYY"
                          aria-label="MM/DD/YYYY"
                          readonly="readonly"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Salary</label>
                        <input
                          type="text"
                          id="basic-icon-default-salary"
                          className="form-control dt-salary"
                          placeholder="$12000"
                          aria-label="$12000"
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary data-submit me-1 waves-effect waves-float waves-light"
                      >
                        Submit
                      </button>
                      <button
                        type="reset"
                        className="btn btn-outline-secondary waves-effect"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTable;
