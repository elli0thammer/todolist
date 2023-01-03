import React from 'react';

type ObjectPropsType = {
    data: TasksPropsType,
}

type TasksPropsType = {
    title: string,
    tasks: TasksValuePropsType[],
    students: Array<string>
}

type TasksValuePropsType = {
    taskId: number,
    title: string,
    isDone: boolean
}

export function Tasks(props: ObjectPropsType) {
    return (
        <div>
            <h1>{props.data.title}</h1>
            <ul>
                {props.data.tasks.map((el) => {
                    return (
                        <li>{el.taskId} <input type={"checkbox"} checked={el.isDone}/><span>{el.title}</span></li>
                    )
                })}
            </ul>

            <ul>
                {props.data.students.map((el, id) => {
                    return (
                        <li>{props.data.students[id]}</li>
                    )
                })}
            </ul>
        </div>
    )
}
