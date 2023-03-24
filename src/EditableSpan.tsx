import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string,
    onChangeAdd: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("")

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };
    const activateViewMode = () => {
        setEditMode(false)
        props.onChangeAdd(title);
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    return (
        editMode
        ? <input value={title}
                 onBlur={activateViewMode}
                 onChange={onChangeTitleHandler}
                 autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}
