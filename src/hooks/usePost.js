import React, {useState} from 'react';

function UsePost(props) {
    const [fileList, setFileList] = useState([]);
    const [text,setText] = useState('')
    const [index, setIndex] = useState(0)
    return {fileList,setFileList,text,setText,index,setIndex}
}

export default UsePost;