import React, { useState, useEffect } from "react";
import { X } from "react-feather";
import { addUser, allUserApi } from "../../Api/Allapi";
import "./user.css";
import ExportData from "../../Utils/ExportData";
import { toast } from "react-toastify";

function User() {
  const [searchData, setSearchData] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entries, setEntries] = useState(10);
  const [sendData, setSendData] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      var auth = JSON.parse(sessionStorage.getItem("token"));

      try {
        const page = currentPage;
        const pageSize = entries ? entries : 10;
        const usersData = await allUserApi(page, pageSize, searchData, auth); // Pass search query
        setUsers(usersData.body);
        setTotalPages(usersData.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchUsers();
  }, [currentPage, entries, searchData]);

  const handlePrePage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleEntriesChange = (e) => {
    setEntries(e.target.value);
    // Reset current page to 1 when changing the number of entries
    setCurrentPage(1);
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
                        <ul className="pagination">
                          <li
                            className={`page-item ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              tabIndex="-1"
                              onClick={handlePrePage}
                            >
                              Previous
                            </button>
                          </li>

                          {currentPage > 1 && (
                            <li className="page-item">
                              <a className="page-link" href="#">
                                {currentPage - 1}
                              </a>
                            </li>
                          )}

                          <li className={`page-item active`}>
                            <a className="page-link" href="#">
                              {currentPage}
                              <span className="sr-only">{currentPage}</span>
                            </a>
                          </li>

                          {currentPage < totalPages && (
                            <li className="page-item">
                              <a className="page-link" href="#">
                                {currentPage + 1}
                              </a>
                            </li>
                          )}

                          <li
                            className={`page-item ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={handleNextPage}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
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
