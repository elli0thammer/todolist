import {action} from "@storybook/addon-actions";
import {Meta, StoryObj} from "@storybook/react";
import {EditableSpan} from "../EditableSpan";

const meta: Meta<typeof EditableSpan> = {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        onChangeAdd: {
            description: 'changed span',
        },
    },
    args: {
        title: 'Text',
        onChangeAdd: action('Span was checked')
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
};
