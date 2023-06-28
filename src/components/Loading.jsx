import { Spin } from 'antd';
const style = {
    margin: '20px 0',
    marginBottom: '20px',
    padding: '30px 50px',
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '4px',
    height: '70vh',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
};
const contentStyle ={
    padding: '50px',
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '4px',
}
const Loading = () => (
    <div style={style}>
        <Spin size={"large"} tip='Loading' >
            <div style={contentStyle} />
        </Spin>
    </div>
);
export default Loading;
