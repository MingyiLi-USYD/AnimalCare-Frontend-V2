import React from 'react';
import './Friend.less'
import FriendList from "./FriendList";
import DetailInfo from "./DetailInfo";

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
