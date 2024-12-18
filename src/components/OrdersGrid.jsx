import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersGrid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTruck, faCog, faCheckCircle, faTimesCircle, faCheck, faExclamationCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from '../Admin/AdminNavbar';

const statuses = ['waiting', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const statusIcons = {
  waiting: faClock,
  Processing: faCog,
  Shipped: faTruck,
  Delivered: faCheckCircle,
  Cancelled: faTimesCircle
};
const statusColors = {
  waiting: '#FFA500', 
  Processing: '#FFD700',
  Shipped: '#1E90FF', 
  Delivered: '#32CD32', 
  Cancelled: '#FF4500'
};

const paymentStatuses = ['pending', 'completed', 'Failed', 'Refunded'];
const paymentStatusIcons = {
  pending: faClock,
  completed: faCheck,
  Failed: faExclamationCircle,
  Refunded: faCreditCard
};
const paymentStatusColors = {
  pending: '#FFA500', 
  completed: '#32CD32', 
  Failed: '#FF4500', 
  Refunded: '#1E90FF'
};

const getRandomId = () => Math.random().toString(36).substr(2, 9);

const OrdersGrid = () => {
  const [rows, setRows] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedRows = response.data.map(order => ({
          id: getRandomId(),
          orderId: order.orderId,
          customerName: order.username,
          orderedItems: order.items.map(item => ({
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
          })),
          status: order.orderStatus || statuses[0],
          paymentStatus: order.paymentStatus || paymentStatuses[0],
          totalPrice: order.totalPrice,
          address: order.address
        }));
        setRows(fetchedRows);
      } catch (error) {
        console.error('Error fetching data:', error);
        setRows([]);
      }
    };

    fetchData();
  }, []);

  const handleEditRow = (id) => {
    setEditingRowId(id);
  };

  const handleSaveRow = async (id) => {
    const updatedRow = rows.find(row => row.id === id);
    try {
      await axios.put(`http://localhost:8080/api/orders/${updatedRow.orderId}/status`, {
        status: updatedRow.status
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setEditingRowId(null);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  const handleDeleteRow = async (id) => {
    const rowToDelete = rows.find(row => row.id === id);
    const numericId = Number(rowToDelete.id);
    try {
      await axios.delete(`http://localhost:8080/api/orders/delete/${numericId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleRowChange = (e, id) => {
    const { name, value } = e.target;
    setRows(rows.map((row) => (row.id === id ? { ...row, [name]: value } : row)));
  };

  return (
    <div className="admin-container">
      <AdminNavbar/>
      <div className="order-management">
        <p className='om'>Order Management</p>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Ordered Items</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {editingRowId === row.id ? (
                  <>
                    <td><input type="text" name="orderId" value={row.orderId} readOnly /></td>
                    <td><input type="text" name="customerName" value={row.customerName} readOnly required /></td>
                    <td>{row.orderedItems.map((item, index) => (
                      <div key={index} className="ordered-item-inputs">
                        <input type="text" name={`productName-${index}`} value={item.productName} readOnly required />
                        <input type="number" name={`quantity-${index}`} value={item.quantity} readOnly required />
                        <input type="number" name={`price-${index}`} value={item.price} readOnly required />
                      </div>
                    ))}</td>
                    <td><input type="text" name="totalPrice" value={row.totalPrice} readOnly required /></td>
                    <td>
                      <select name="status" value={row.status} onChange={(e) => handleRowChange(e, row.id)}>
                        {statuses.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ color: paymentStatusColors[row.paymentStatus] }}>
                      <FontAwesomeIcon icon={paymentStatusIcons[row.paymentStatus]} /> {row.paymentStatus}
                    </td>
                    <td><input type="text" name="address" value={row.address} readOnly required /></td>
                    <td><button className="save-btn" onClick={() => handleSaveRow(row.id)}>Save</button></td>
                  </>
                ) : (
                  <>
                    <td>{row.orderId}</td>
                    <td>{row.customerName}</td>
                    <td>{row.orderedItems.map((item, index) => (
                      <div key={index} className="ordered-item-details">
                        <p>{item.productName}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>Price: ₹{item.price.toFixed(2)}</p>
                      </div>
                    ))}</td>
                    <td>₹{row.totalPrice}</td>
                    <td style={{ color: statusColors[row.status] }}>
                      <FontAwesomeIcon icon={statusIcons[row.status]} /> {row.status}
                    </td>
                    <td style={{ color: paymentStatusColors[row.paymentStatus] }}>
                      <FontAwesomeIcon icon={paymentStatusIcons[row.paymentStatus]} /> {row.paymentStatus}
                    </td>
                    <td>{row.address}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEditRow(row.id)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDeleteRow(row.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersGrid;
