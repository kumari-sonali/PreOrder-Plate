import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import Getorder from '../order/updateOrder';
import UpdateOrder from '../order/updateOrder';
const UpdateOrderpage = () => {
    return (
        <div>
       <Navbar/>
       <UpdateOrder/>
       </div>
    );
};

export default UpdateOrderpage;
