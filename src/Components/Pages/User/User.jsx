import React, { useState, useEffect } from "react";
import { X } from "react-feather";
import "./user.css";
import ExportData from "../../Utils/ExportData";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/action";

function User() {
  var auth = JSON.parse(sessionStorage.getItem("token"));

  const [searchData, setSearchData] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { users, totalPages } = useSelector((state) => state.users);

  useEffect(() => {
    try {
      const page = 1;
      const pageSize = entries ? entries : 10;
      dispatch(fetchUsers(page, pageSize, searchData, auth));
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }, [searchData, entries, dispatch]);

  const handlePrePage = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage > 1) {
      dispatch(fetchUsers(currentPage - 1, entries, searchData, auth));
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage < totalPages) {
      dispatch(fetchUsers(currentPage + 1, entries, searchData, auth));
    }
  };

  const handleEntriesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setEntries(value);
    setCurrentPage(1);
    dispatch(fetchUsers(1, value, searchData, auth));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(fetchUsers(pageNumber, entries, searchData, auth));
  };

  const renderPagination = () => {
    const paginationItems = [];

    // Show Previous button
    paginationItems.push(
      <li
        key="prev"
        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
      >
        <button className="page-link" tabIndex="-1" onClick={handlePrePage}>
          Previous
        </button>
      </li>
    );

    // Show page numbers
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

    // Show Next button
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
      <div className="app-content content ">
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
                          <h6 className="mb-0">User Data Table</h6>
                        </div>
                        <div className="dt-action-buttons text-end">
                          <div className="dt-buttons d-inline-flex">
                            <ExportData
                              apiData={users ? users : []}
                              fileName={"User"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="pagination-container">
                        <div className="pagination-select">
                          <label>Show</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handleEntriesChange}
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
                              value={searchData}
                              onChange={(e) => setSearchData(e.target.value)}
                            />
                          </label>

                          {searchData && (
                            <i>
                              <X
                                className="x-icon"
                                onClick={() => setSearchData("")}
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

                        {users?.map((one, index) => (
                          <tbody key={index}>
                            <tr>
                              <th scope="row">
                                {(currentPage - 1) * entries + index + 1}
                              </th>
                              <td>{one?.name}</td>
                              <td>{one?.email}</td>
                              <td>{one?.phoneNumber}</td>
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
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
