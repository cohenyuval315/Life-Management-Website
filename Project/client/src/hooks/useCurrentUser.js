import React from 'react'
import { useState } from 'react'

const useCurrentUser = (defaultValue) => {
    const [userData,setUserData] = useState(defaultValue);
    // use Context

    function addEntry();
    function removeEntry();
    function updateEntry();
    function filter();



  function push(element) {
    setArray(a => [...a, element])
  }

  function filter(callback) {
    setArray(a => a.filter(callback))
  }

  function update() {

  }



  return (
    <div>useCurrectUser</div>
  );
}

export default useCurrentUser