import {useState} from 'react';
import {useMutation } from '@apollo/client';

import {CREATE_TASK, GET_KANBAN_DATA} from './queries';

const CreateTask = props => {
    const [createTask, { data, loading, error }] = useMutation(CREATE_TASK,{
        refetchQueries: [GET_KANBAN_DATA],
        awaitRefetchQueries: true,
    });
    const [hideForm, setHideForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    
    if (error) {console.error(error.message);}
    
    const handleFormDataChange = event =>{
        const {name, value} = event.target;
        setFormData((prevData) =>({
            ...prevData,
            [name]: value
        }));
    }
    
    const handleHideForm = () =>{
        setHideForm(!hideForm)
        setFormData({ title: '', description: ''})
    }
    
    const handleCreateTask = async () =>{
        event.preventDefault();
        try{
            const result = await createTask({
                variables: {
                    category: props.category,
                    title: formData.title,
                    description: formData.description
                }
            });
      
            if (result.data.createKanbanTask.ok){
                setFormData({ title: '', description: ''});
                setHideForm(!hideForm);
            }
        
        } catch (err) {console.error(err);}
    };
    
    return (
        <>
            <button onClick={handleHideForm} className="w-fit bg-green-500 text-white font-bold py-2 px-4 rounded mr-3 mb-5">new task</button>
            {hideForm && 
                <form onSubmit={handleCreateTask} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-5">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input 
                        onChange={handleFormDataChange}
                        value={formData.title}
                        type="text" 
                        id="title"
                        name="title" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " 
                        required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea 
                        onChange={handleFormDataChange}
                        value={formData.description}
                        id="description"
                        name="description" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " 
                        rows="5" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                        type="submit" 
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                            Create task
                        </button>
                    </div>
                </form>
            }
        </>
    );
};

export default CreateTask;