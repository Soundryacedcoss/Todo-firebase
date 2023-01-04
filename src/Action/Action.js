export const add_todo_success=(inputval)=>{
    return {
        type:"ADD_TODO_SUCCESS",
        payload:{
            id:Math.random(),
            inputval:inputval,
        }
    }
}
// action method for starting the fetching
export const add_todo_started=(inputval)=>{
    return {
        type:"ADD_TODO_STARTED",
    }
}
// Method for failture
export const add_todo_failure=()=>{
    return{
        type:"ADD_TODO_FAILURE"
    }
      
}
// method for delete
export const delete_todo=(id)=>{
  return {
    type:"DELETE_TODO",
    id
  }
}