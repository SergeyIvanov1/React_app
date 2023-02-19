// import React, { useState, useEffect } from "react";
// import TutorialDataService from "../services/TutorialService";
// import { Link } from "react-router-dom";

// const TutorialsList = () => {
//     const [tutorials, setTutorials] = useState([]);
//     const [currentTutorial, setCurrentTutorial] = useState(null);
//     const [currentIndex, setCurrentIndex] = useState(-1);
//     const [searchTitle, setSearchTitle] = useState("");

//     useEffect(() => {
//         retrieveTutorials();
//     }, []);

//     const onChangeSearchTitle = e => {
//         const searchTitle = e.target.value;
//         setSearchTitle(searchTitle);
//     };

//     const retrieveTutorials = () => {
//         TutorialDataService.getAll()
//             .then(response => {
//                 setTutorials(response.data);
//                 console.log(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     };

//     const refreshList = () => {
//         retrieveTutorials();
//         setCurrentTutorial(null);
//         setCurrentIndex(-1);
//     };

//     const setActiveTutorial = (tutorial, index) => {
//         setCurrentTutorial(tutorial);
//         setCurrentIndex(index);
//     };

//     const removeAllTutorials = () => {
//         TutorialDataService.removeAll()
//             .then(response => {
//                 console.log(response.data);
//                 refreshList();
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     };

//     const findByTitle = () => {
//         TutorialDataService.findByTitle(searchTitle)
//             .then(response => {
//                 setTutorials(response.data);
//                 console.log(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     };

//     return (
//         <div className="list row">
//             <div className="col-md-8">
//                 <div className="input-group mb-3">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search by title"
//                         value={searchTitle}
//                         onChange={onChangeSearchTitle}
//                     />
//                     <div className="input-group-append">
//                         <button
//                             className="btn btn-outline-secondary"
//                             type="button"
//                             onClick={findByTitle}
//                         >
//                             Search
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-md-6">
//                 <h4>Tutorials List</h4>

//                 <ul className="list-group">
//                     {tutorials &&
//                         tutorials.map((tutorial, index) => (
//                             <li
//                                 className={
//                                     "list-group-item " + (index === currentIndex ? "active" : "")
//                                 }
//                                 onClick={() => setActiveTutorial(tutorial, index)}
//                                 key={index}
//                             >
//                                 {tutorial.title}
//                             </li>
//                         ))}
//                 </ul>

//                 <button
//                     className="m-3 btn btn-sm btn-danger"
//                     onClick={removeAllTutorials}
//                 >
//                     Remove All
//                 </button>
//             </div>
//             <div className="col-md-6">
//                 {currentTutorial ? (
//                     <div>
//                         <h4>Tutorial</h4>
//                         <div>
//                             <label>
//                                 <strong>Title:</strong>
//                             </label>{" "}
//                             {currentTutorial.title}
//                         </div>
//                         <div>
//                             <label>
//                                 <strong>Description:</strong>
//                             </label>{" "}
//                             {currentTutorial.description}
//                         </div>
//                         <div>
//                             <label>
//                                 <strong>Status:</strong>
//                             </label>{" "}
//                             {currentTutorial.published ? "Published" : "Pending"}
//                         </div>

//                         <div>Edit</div>
//                         <Link
//                             to={"/tutorials/" + currentTutorial.id}
//                             className="badge badge-warning">
//                             Edit
//                         </Link>
//                     </div>
//                 ) : (
//                     <div>
//                         <br />
//                         <p>Please click on a Tutorial...</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TutorialsList;

import React, { useState, useEffect, useMemo, useRef } from "react";
import TutorialDataService from "../services/TutorialService";
import { useTable } from "react-table";

const TutorialsList = (props) => {
  const [tutorials, setTutorials] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef();

  tutorialsRef.current = tutorials;

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setTutorials(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then((response) => {
        setTutorials(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openTutorial = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex].id;

    props.history.push("/tutorials/" + id);
  };

  const deleteTutorial = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex].id;

    TutorialDataService.remove(id)
      .then((response) => {
        props.history.push("/tutorials");

        let newTutorials = [...tutorialsRef.current];
        newTutorials.splice(rowIndex, 1);

        setTutorials(newTutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Status",
        accessor: "published",
        Cell: (props) => {
          return props.value ? "Published" : "Pending";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openTutorial(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteTutorial(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: tutorials,
  });

  return (
    
    <div className="list row">
      <div className="col-md-8">
      <br/>
        <div className="input-group mb-3">
        
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}/>

          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>Remove All</div>
      {/* <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllTutorials}>
        //   Remove All
        </button>
      </div> */}
    </div>
  );
};

export default TutorialsList;
