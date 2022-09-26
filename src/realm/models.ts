import { ObjectSchema } from "realm"

export const TasksSchema:ObjectSchema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        Text: 'string',
        Status: 'string?'
    }
}

export const UsersSchema: ObjectSchema = {
    name: 'Users',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        FirstName: 'string',
        Surname: 'string'
    }
}