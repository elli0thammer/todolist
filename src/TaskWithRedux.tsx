import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TaskPropsType = {
    task: TaskType,
    idToDo: string,
}
export const TaskWithRedux = React.memo( ({task, idToDo}: TaskPropsType) => {
    let dispatch = useDispatch()

    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.idTask, newIsDoneValue, idToDo))
    }

    const onChangeTitleHandler = useCallback( (newValue: string) => {
        dispatch(changeTaskTitleAC(task.idTask, newValue, idToDo))
    }, [dispatch, task.idTask, idToDo]);

    const onRemoveHandler = (ID: string) => {
        dispatch(removeTaskAC(ID, idToDo))
    }

    return (
        <li key={task.idTask} className={task.isDone ? "is-done" : ""}>
            <Checkbox checked={task.isDone}
                      onChange={onChangeCheckboxHandler}
                      icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
            <EditableSpan title={task.title} onChangeAdd={onChangeTitleHandler}/>

            <IconButton aria-label="delete" onClick={() => onRemoveHandler(task.idTask)}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
} );
