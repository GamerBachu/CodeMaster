import React from 'react'
import { Link } from 'react-router';

const List = () => {
  return (
    <div>
        
        <Link to={"/planner/create/0"}>Create</Link><br></br>
        <Link to={"/planner/update/0123123"}>update</Link><br></br>
        <Link to={"/planner/delete/asdqwe"}>delete</Link><br></br>

    </div>
  )
}

export default List