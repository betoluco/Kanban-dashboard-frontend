import {useState} from 'react';
import {useMutation } from '@apollo/client';

import {CREATE_CATEGORY, GET_KANBAN_DATA} from './queries';

const CreateCategory = props =>{
  const [createCategory, { data, loading, error }] = useMutation(CREATE_CATEGORY,{
    refetchQueries: [GET_KANBAN_DATA],
    awaitRefetchQueries: true,
  });
  const [text, setText] = useState("");
  
  const handleTextChange = event =>{
    setText(event.target.value);
  };
  
  if (error) {console.error(error.message);}
  
  const handleCreateCategory = async () =>{
    event.preventDefault();
    try{
      const result = await createCategory({
        variables: {id: text}
      });
      
      if (result.data.createKanbanCategory.ok){
        setText("");
        
      }
      
    } catch (err) {console.error(err);}
  };

  return(
    <form onSubmit={handleCreateCategory} className="flex mb-5">
      <button 
      type="submit" 
      className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-3">
        Add category
      </button>
      <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" 
        placeholder="New Category" 
        value={text}
        onChange={handleTextChange}
        />
    </form>
  );
};

export default CreateCategory;