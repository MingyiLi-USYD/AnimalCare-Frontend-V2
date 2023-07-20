import React from 'react';
import './friend.less'
import FriendList from "./friendList";
import DetailInfo from "./detailInfo";

const Friend = () => {
 return (
     <div
         className={"friendsContainer"}
     >
         <div className={'friend-fixed-div'} >
             <FriendList/>
         </div>
         <div className={'friend-flexible-div'}>
             <DetailInfo/>
         </div>
     </div>

 );
};
export default Friend;
