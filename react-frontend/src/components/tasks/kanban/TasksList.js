import React, { useState, useEffect } from "react";
import TaskService from "../../../services/TaskService";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
// import CustomAvatar from '../TableComponents/CustomAvatar'
// import { ReactComponent as RedArrow } from '../../assets/icons/High.svg'
// import { ReactComponent as YellowArrow } from '../../assets/icons/Medium.svg'
// import { ReactComponent as BlueArrow } from '../../assets/icons/Low.svg'

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const TasksList = () => {
    useEffect(() => {
        retrieveTasks();
    }, []);

    const [tasks, setTasks] = useState([]);
    const columnsFromBackend = {
        [uuidv4()]: {
            title: 'To-do',
            items: tasks,
        },
        [uuidv4()]: {
            title: 'In Progress',
            items: [],
        },
        [uuidv4()]: {
            title: 'Done',
            items: [],
        },
    };


    const [currentTask, setCurrentTask] = useState(null);
    // const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const [columns, setColumns] = useState(columnsFromBackend);

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveTasks = () => {
        TaskService.getAll()
            .then(response => {
                setTasks(response.data);
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveTasks();
        setCurrentTask(null);
        // setCurrentIndex(-1);
    };

    // const setActiveTask = (task, index) => {
    //     setCurrentTask(task);
    //     setCurrentIndex(index);
    // };

    const removeAllTasks = () => {
        TaskService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        TaskService.findByTitle(searchTitle)
            .then(response => {
                setTasks(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div >
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

            <div className="col-md-6">
                <h4>Tasks List</h4>

                {/* создаем контейнер с column контейнерами, в которых будут таск контейнеры */}
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>

                    {/* создаем стили для DragDropContext контейнера */}
                    <Container>
                        {/* создаем стили для Column контейнера */}
                        <TaskColumnStyles>

                            {/* заполняем DragDropContext columns. В каждом Column выводим таск компонент */}
                            {Object.entries(columns).map(([columnId, column], index) => {
                                return (
                                    // работаем с областью Column. У каждой области назначаем columnId
                                    <Droppable key={columnId} droppableId={columnId}>

                                        {(provided, snapshot) => (

                                            <TaskList ref={provided.innerRef}
                                                {...provided.droppableProps}>

                                                {/* заголовок Column */}
                                                <Title>{column.title}</Title>
                                                {column.items.map((item, index) => (

                                                    // Добавляем перетаскиваемый компонент
                                                    <TaskCard key={item} item={item} index={index} />
                                                ))}
                                                {/* здесь происходит заполнение области, если забирается компонент */}
                                                {provided.placeholder}
                                            </TaskList>
                                        )}
                                    </Droppable>
                                );
                            })}
                        </TaskColumnStyles>
                    </Container>
                </DragDropContext>
            </div>          
        </div>
    );
};

export default TasksList;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>

