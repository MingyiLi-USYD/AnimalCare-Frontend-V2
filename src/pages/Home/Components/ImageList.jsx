import { Image } from 'antd';
const ImageList = ({data}) => (

    <Image.PreviewGroup
        preview={{
            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
        }}

    >
        {
            data.map(item=> <Image key={item} height={150} src={"/common/download?name="+item} />)
        }
    </Image.PreviewGroup>

);
export default ImageList;