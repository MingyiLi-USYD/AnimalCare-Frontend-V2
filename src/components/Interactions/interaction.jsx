import React from 'react';
import './interaction.less'

function Interaction({children,number,active}) {
    return (
        <div className={active?'active-color':''}>

            {children}
              <span className={`interaction `}>
                  {
                      number
                  }
              </span>
        </div>
    );
}

export default Interaction;