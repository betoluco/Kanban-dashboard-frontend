import {useMutation } from '@apollo/client';

import CreateTask from './CreateTask';
import Task from './Task';
import {DELETE_CATEGORY, GET_KANBAN_DATA} from './queries';

const Category = props =>{
  const [deleteCategory, { data, loading, error }] = useMutation(DELETE_CATEGORY,{
    refetchQueries: [GET_KANBAN_DATA],
    awaitRefetchQueries: true,
  });
  
  if (error) {console.error(error.message);}
  
  const handleDeleteCategory = async (id) =>{
    try{
      const result = await deleteCategory({
        variables: {id}
      });
    } catch (err) {console.error(err);}
  };
  
  const tasks = props.tasks.map(task =>{
    return (
      <Task 
      key={task.id} 
      id={task.id} 
      category={task.category} 
      title={task.title} 
      description={task.description} />
    );
  });
  
  
  return (
    <div className="w-80 min-h-44 border-2 px-2 rounded">
      <div className="flex justify-between mb-5">
        <h2 className="text-xl  border-b-1 mb-2">{props.name}</h2>
        <button onClick={() => handleDeleteCategory(props.name)}>
          <span 
          className="block bg-stone-800 w-6 h-1 rounded-sm -mb-[4px] -rotate-45">
          </span>
          <span 
          className="block bg-stone-800 w-6 h-1 rounded-sm rotate-45">
          </span>
        </button>
      </div>
      <CreateTask category={props.name}/>
      {tasks}
    </div>
  );
};

export default Category;