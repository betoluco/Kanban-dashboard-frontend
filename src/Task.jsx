import {useMutation } from '@apollo/client';

import {DELETE_TASK, GET_KANBAN_DATA} from './queries';

const Task = props =>{
    const [deleteTask, { data, loading, error }] = useMutation(DELETE_TASK,{
        refetchQueries: [GET_KANBAN_DATA],
        awaitRefetchQueries: true,
    });
    
    const handleDeleteTask = async () =>{
        event.preventDefault();
        try{
            const result = await deleteTask({
                variables: {
                    id: props.id,
                    category: props.category
                }
            });
        } catch (err) {console.error(err);}
    };
    
    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 relative">
            <div className="px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-800">{props.title}</h1>
                <button
                className="text-gray-400 hover:text-gray-600 font-bold  transition duration-200"
                onClick={handleDeleteTask}   
                aria-label="Close"
                >
                    ✕
                </button>
            </div>
            <div className="px-6 pb-4">
                <p className="text-gray-600">{props.description}</p>
            </div>
        </div>
    )
};

export default Task;