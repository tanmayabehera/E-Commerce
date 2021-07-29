import React from "react";
import Card from "../UI/Card";

/**
 * @author
 * @function PriceDetails
 **/

const PriceDetails = (props) => {
    return (
        <Card headerleft={"Price Details"} style={{ maxWidth: "380px" }}>
            <div
                style={{
                    padding: "15px",
                    boxSizing: "border-box",
                }}
            >
                <div className="flexRow sb" style={{ margin: "20px 0" }}>
                    <div>Price ({props.totalItem} items)</div>
                    <div>{props.totalPrice}</div>
                </div>
                <div className="flexRow sb" style={{ margin: "20px 0" }}>
                    <div>Delivery Charges</div>
                    <div>FREE</div>
                </div>
                <div className="flexRow sb" style={{
                    margin: "20px 0", borderTop: "1px dashed",
                    justifyContent:"space-between",
                    fontWeight: "500",
                    fontSize: "18px"
                }}>
                    <div style={{margin: "20px 0",}}>Total Amount</div>
                    <div style={{margin: "20px 0",}}>{props.totalPrice}</div>
                </div>
            </div>
        </Card>
    );
};

export default PriceDetails;