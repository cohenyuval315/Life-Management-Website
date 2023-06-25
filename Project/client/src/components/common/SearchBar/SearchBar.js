import React, {useState,useEffect, useRef,useCallback} from 'react'
import { Icons } from '../../../assets/index.js';
import './SearchBar.css'

const SearchBar = ({data,searchedData,objectKey,setSearchData}) => {
    console.log(data,objectKey,setSearchData)
    const [searchValue, setSearchValue] = useState('');

    // useCallback(node => {
    //     if (node !== null) {
    //         //fetch(...)   load data
    //     }
    // },[]);
    function onClear(){
        setSearchValue('')
    }

    const onChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSearchValue(e.target.value);
        handleSearch()
    };

    function handleSearch(){
        if (searchValue && searchValue.length > 0) {
            const newData = data&&data.filter((item) => {
                return item[`${objectKey}`].match(searchValue);
            });
            
            setSearchData(searchedData)
        }
    }

    useEffect(() => {
      handleSearch()
    }, [searchValue])

    useEffect(() => {
      handleSearch()
    }, [])

    // useEffect(() => {
    //   onClear()
    // }, [data])

        return (
                <div className='search-bar-container'>
                    <div className='search-bar-icon'>
                        {Icons.MagnifyingGlass}
                    </div>
                    <div className='search-bar-input-div'>
                        <input
                        className='search-bar-input'
                        type="search"
                        placeholder="Search here"
                        results="0"
                        onChange={evt => onChange(evt)}
                        value={searchValue}
                        onKeyDown={(e)=>e.stopPropagation()}
                         />
                    </div>
                </div>)
};

export default SearchBar;