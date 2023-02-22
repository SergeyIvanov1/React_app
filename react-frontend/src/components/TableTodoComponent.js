import React, { useState, useEffect, useMemo, useRef } from "react";
import TaskService from "../services/TaskService";
import { useTable } from "react-table";

const TableTodoComponent = (props) => {
  const [tasks, setTasks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tasksRef = useRef();

  tasksRef.current = tasks;

  useEffect(() => {
    retrieveTasks();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTasks = () => {
    TaskService.getAll()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTasks();
  };

  const removeAllTasks = () => {
    TaskService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TaskService.findByTitle(searchTitle)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openTutorial = (rowIndex) => {
    const id = tasksRef.current[rowIndex].id;

    props.history.push("/tasks/" + id);
  };

  const deleteTutorial = (rowIndex) => {
    const id = tasksRef.current[rowIndex].id;

    TaskService.remove(id)
      .then((response) => {
        props.history.push("/tasks");

        let newTutorials = [...tasksRef.current];
        newTutorials.splice(rowIndex, 1);

        setTasks(newTutorials);
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
      // {
      //   Header: "Content",
      //   accessor: "content",
      // },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },    
      {
        Header: "Hours",
        accessor: "hours",
      },
      {
        Header: "Tags",
        accessor: "tags",
      },
      
      // {
      //   Header: "Status",
      //   accessor: "published",
      //   Cell: (props) => {
      //     return props.value ? "Published" : "Pending";
      //   },
      // },
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
    data: tasks,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">

          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle} />
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

        <table className="table table-striped table-bordered" {...getTableProps()}>

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
                      <td {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllTasks}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default TableTodoComponent;
