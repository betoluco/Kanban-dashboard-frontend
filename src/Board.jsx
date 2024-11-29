import {useQuery} from '@apollo/client';

import Spinner from './Spinner';
import InternalServerError from './InternalServerError';
import Category from './Category';
import CreateCategory from './CreateCategory';
import {GET_KANBAN_DATA} from './queries';

function Dashboard(){
  const {loading, error, data} = useQuery(GET_KANBAN_DATA);
  
  if (loading) return <Spinner />;
  if (error) {
    console.error(error.message);
    return <InternalServerError />;
  }
  
  const categories = data.kanbanCategoriesList.map( (category) =>{
      const tasks =data.kanbanTasksList.filter(task =>{
        if(task.category === category.id) return task
      });
      return <Category key={category.id} name={category.id}  tasks={tasks}/>
    });
    
  return (
    <>
      <CreateCategory/>
      <h2 className="text-3xl mb-5">Categories</h2>
      <div className="flex justify-evenly">{categories}</div>
    </>
  ); 
}

export default Dashboard;