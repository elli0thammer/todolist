import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {
    changeTaskTC,
    removeTaskTC
} from "./state/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {AppDispatchType} from "./custom-hooks/ThunkHook";

type TaskPropsType = {
    task: TaskType,
    idToDo: string,
}
export const TaskWithRedux = React.memo(({task, idToDo}: TaskPropsType) => {
    let dispatch = useDispatch<AppDispatchType>()

    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        const thunk = changeTaskTC(task.id, {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}, idToDo)
        dispatch(thunk)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTC(task.id, {title: newValue}, idToDo))
    }, [dispatch, task.id, idToDo]);

    const onRemoveHandler = (idTask: string) => {
        const thunk = removeTaskTC(idToDo, idTask)
        dispatch(thunk)
    }

    return (
        <li key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox checked={task.status === TaskStatuses.Completed}
                      onChange={onChangeCheckboxHandler}
                      icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
            <EditableSpan title={task.title} onChangeAdd={onChangeTitleHandler}/>

            <IconButton aria-label="delete" onClick={() => onRemoveHandler(task.id)}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
});
