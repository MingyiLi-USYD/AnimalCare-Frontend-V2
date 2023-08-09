import React, {useEffect, useState} from 'react';

function UsePage(request,pageSize=3) {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0);
    const loadMoreData = async () => {

        if (loading) {
            return;
        }
        setLoading(true);
        const {data: {records, current, total}, code} = await request(currentPage + 1, pageSize)
        if (code === 1) {
            setCurrentPage(current)
            setTotal(total)
            setData([...data, ...records])
        }
        setLoading(false)
    };
    useEffect(() => {
        loadMoreData();
    }, []);
    return {loading,data,currentPage,total,loadMoreData,setData}
}

export default UsePage;