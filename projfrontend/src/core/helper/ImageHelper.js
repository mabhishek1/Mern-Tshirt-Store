import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product={product},maxHeight="500px",maxWidth="100%" }) => {
  const imageurl = product
    ? `${API}/product/photo/getPhoto/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className="rounded border border-success p-2">
      <img
        
        src={imageurl}
        alt="photo"
        style={{ maxHeight: maxHeight, maxWidth: maxWidth,float:"right",minHeight:"200px" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;