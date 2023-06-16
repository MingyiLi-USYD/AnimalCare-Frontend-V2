/*
import {Avatar, Carousel, Modal} from 'antd';
import { useEffect } from 'react';
import { connect, useRequest } from 'umi';
import {getPetDetail} from '../../../services/api';
import {useParams} from "../../../.umi/exports";
const PetDetail = (props) => {
  const params = useParams();
  const { id } = params;
  const { run, loading, data } = useRequest(getPetDetail());
  useEffect(() => {
    open && run(`/api/pet/${petId}`);
  }, [open]);
  return (
    <>
      {data && (
        <Modal
          footer={[]}
          title="Pet Detail Modal"
          open={props.open}
          onCancel={() => {
            props.dispatch({
              type: 'PetModel/closeModal',
            });
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div>
              <Avatar size={64} src={`/common/download?name=${data.petAvatar}`}/>
              <h2>{data.petName}</h2>
              <p>{data.petDescription}</p>
            </div>
            <div style={{ marginTop: '50px' }}>
              <Carousel>
                {data.petImageList.map((url, index) => (
                  <div key={index} style={{ width: '100%', height: '300px' }}>
                    <img
                      src={`/common/download?name=${url}`}
                      alt="Pet Photo 1"
                      style={{ width: '100%', height: '300px' }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default connect(({ PetModel }) => {
  return { ...PetModel };
})(PetDetail);
*/
