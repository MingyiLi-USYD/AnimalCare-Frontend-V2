import React from 'react';

function Interaction({children,number}) {
    return (
        <div>
            {children}
              <span style={{margin:'0 5px'}}>
                  {
                      number
                  }
              </span>
        </div>
    );
}

export default Interaction;