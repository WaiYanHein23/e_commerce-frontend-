import React from "react";

const Shipping = ({ activeTab }) => {
  // Mock data for shipping
  const shippingInfo = [
    {
      id: 1,
      orderId: 1001,
      status: "Shipped",
      trackingNumber: "TN123456789",
    },
    {
      id: 2,
      orderId: 1002,
      status: "In Transit",
      trackingNumber: "TN987654321",
    },
    {
      id: 3,
      orderId: 1003,
      status: "Delivered",
      trackingNumber: "TN456789123",
    },
    {
      id: 4,
      orderId: 1007,
      status: "Delivered",
      trackingNumber: "TN456789123",
    },
  ];

  return (
    <div>
      {" "}
      {activeTab === "shipping" && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Shipping ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tracking Number
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {shippingInfo.map((shipping) => (
                  <tr key={shipping.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      #{shipping.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      #{shipping.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {shipping.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipping.trackingNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shipping;
