
import React, { useState, useEffect, createContext, useContext } from 'react';

// --- Icons (Simplified for single file - in a real app, use a library like react-icons) ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const OrdersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>;
const LaundryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10s-4 4-7 0L12 2l-3 8-7 0 3-8"></path><path d="M17 18a5 5 0 0 0-10 0"></path><path d="M12 21.5V18"></path></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const AlertCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const ActivityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const TruckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const DollarSignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const BarChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>;
const UserCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const PackageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;


// --- Dummy Data (MANDATORY DUMMY DATA) ---
const userRoles = {
    ADMIN: 'Admin',
    CUSTOMER: 'Customer',
    SERVICE_PROVIDER: 'Service Provider'
};

const deliveryOptions = {
    DOORSTEP: 'Doorstep Delivery',
    CUSTOMER_PICKUP: 'Customer Pickup'
};

const orderStatuses = {
    CREATED: 'Created',
    ACCEPTED: 'Accepted',
    IRONING: 'Ironing',
    READY: 'Ready',
    DELIVERED: 'Delivered',
    PICKED: 'Picked',
    REJECTED: 'Rejected',
    PENDING_PAYMENT: 'Pending Payment'
};

const getStatusColorClass = (status) => {
    switch (status) {
        case orderStatuses.CREATED: return 'status-Created';
        case orderStatuses.ACCEPTED: return 'status-Accepted';
        case orderStatuses.IRONING: return 'status-Ironing';
        case orderStatuses.READY: return 'status-Ready';
        case orderStatuses.DELIVERED:
        case orderStatuses.PICKED: return 'status-Delivered'; // Use same for delivered/picked
        case orderStatuses.REJECTED: return 'status-Rejected';
        case orderStatuses.PENDING_PAYMENT: return 'status-PendingApproval';
        default: return '';
    }
};

const customers = [
    { id: 'cust101', name: 'Alice Smith', email: 'alice@example.com', address: '123 Oak Ave, City' },
    { id: 'cust102', name: 'Bob Johnson', email: 'bob@example.com', address: '456 Pine St, City' },
];

const serviceProviders = [
    { id: 'sp201', name: 'QuickIron Services', email: 'quickiron@example.com', phone: '555-1234', rating: 4.8, status: 'Active' },
    { id: 'sp202', name: 'SmoothPress Laundry', email: 'smoothpress@example.com', phone: '555-5678', rating: 4.5, status: 'Active' },
    { id: 'sp203', name: 'IronMate Solutions', email: 'ironmate@example.com', phone: '555-9012', rating: 4.2, status: 'On Hold' },
];

const clothesTypes = [
    { id: 'ct001', name: 'Shirt', pricePerUnit: 2.50 },
    { id: 'ct002', name: 'Trousers', pricePerUnit: 3.00 },
    { id: 'ct003', name: 'Dress', pricePerUnit: 5.00 },
    { id: 'ct004', name: 'Bed Linen', pricePerUnit: 7.00 },
    { id: 'ct005', name: 'Suit', pricePerUnit: 8.50 },
];

const generateOrderItems = () => {
    const items = [];
    const numItems = Math.floor(Math.random() * 3) + 1; // 1 to 3 unique items
    const availableClothes = [...clothesTypes];

    for (let i = 0; i < numItems; i++) {
        const randomIndex = Math.floor(Math.random() * availableClothes.length);
        const cloth = availableClothes.splice(randomIndex, 1)[0]; // Pick unique item
        const quantity = Math.floor(Math.random() * 5) + 1; // 1 to 5 quantity
        items.push({
            clothType: cloth.name,
            quantity: quantity,
            unitPrice: cloth.pricePerUnit,
            subtotal: quantity * cloth.pricePerUnit,
        });
    }
    return items;
};

const calculateOrderTotal = (items) => items.reduce((sum, item) => sum + item.subtotal, 0);

const generateTimeline = (status) => {
    const timeline = [{ stage: "Created", date: "2023-10-26T10:00:00Z" }];
    if (status === orderStatuses.ACCEPTED || status === orderStatuses.IRONING || status === orderStatuses.READY || status === orderStatuses.DELIVERED || status === orderStatuses.PICKED) {
        timeline.push({ stage: "Accepted", date: "2023-10-26T11:30:00Z" });
    }
    if (status === orderStatuses.IRONING || status === orderStatuses.READY || status === orderStatuses.DELIVERED || status === orderStatuses.PICKED) {
        timeline.push({ stage: "Ironing", date: "2023-10-26T14:00:00Z" });
    }
    if (status === orderStatuses.READY || status === orderStatuses.DELIVERED || status === orderStatuses.PICKED) {
        timeline.push({ stage: "Ready", date: "2023-10-27T09:00:00Z" });
    }
    if (status === orderStatuses.DELIVERED) {
        timeline.push({ stage: "Delivered", date: "2023-10-27T11:00:00Z" });
    }
    if (status === orderStatuses.PICKED) {
        timeline.push({ stage: "Customer Picked", date: "2023-10-27T10:30:00Z" });
    }
    if (status === orderStatuses.REJECTED) {
        timeline.push({ stage: "Rejected", date: "2023-10-26T12:00:00Z" });
    }
    return timeline;
};

const generateAuditLog = (orderId, status) => {
    const logs = [{
        id: `audit-${orderId}-1`,
        timestamp: "2023-10-26T10:00:00Z",
        action: "Order Created",
        user: "System/Customer (cust101)",
        details: `Order #${orderId} initiated.`
    }];
    if (status === orderStatuses.ACCEPTED) {
        logs.push({
            id: `audit-${orderId}-2`, timestamp: "2023-10-26T11:30:00Z", action: "Order Accepted", user: "Service Provider (sp201)", details: `Order #${orderId} accepted by QuickIron Services.`
        });
    }
    if (status === orderStatuses.IRONING) {
        logs.push({
            id: `audit-${orderId}-2`, timestamp: "2023-10-26T11:30:00Z", action: "Order Accepted", user: "Service Provider (sp201)", details: `Order #${orderId} accepted by QuickIron Services.`
        });
        logs.push({
            id: `audit-${orderId}-3`, timestamp: "2023-10-26T14:00:00Z", action: "Status Change", user: "Service Provider (sp201)", details: `Order #${orderId} status changed to Ironing.`
        });
    }
    if (status === orderStatuses.READY) {
        logs.push({
            id: `audit-${orderId}-2`, timestamp: "2023-10-26T11:30:00Z", action: "Order Accepted", user: "Service Provider (sp201)", details: `Order #${orderId} accepted by QuickIron Services.`
        });
        logs.push({
            id: `audit-${orderId}-3`, timestamp: "2023-10-26T14:00:00Z", action: "Status Change", user: "Service Provider (sp201)", details: `Order #${orderId} status changed to Ironing.`
        });
        logs.push({
            id: `audit-${orderId}-4`, timestamp: "2023-10-27T09:00:00Z", action: "Status Change", user: "Service Provider (sp201)", details: `Order #${orderId} status changed to Ready.`
        });
    }
    if (status === orderStatuses.DELIVERED) {
        logs.push({
            id: `audit-${orderId}-2`, timestamp: "2023-10-26T11:30:00Z", action: "Order Accepted", user: "Service Provider (sp201)", details: `Order #${orderId} accepted by QuickIron Services.`
        });
        logs.push({
            id: `audit-${orderId}-3`, timestamp: "2023-10-26T14:00:00Z", action: "Status Change", user: "Service Provider (sp201)", details: `Order #${orderId} status changed to Ironing.`
        });
        logs.push({
            id: `audit-${orderId}-4`, timestamp: "2023-10-27T09:00:00Z", action: "Status Change", user: "Service Provider (sp201)", details: `Order #${orderId} status changed to Ready.`
        });
        logs.push({
            id: `audit-${orderId}-5`, timestamp: "2023-10-27T11:00:00Z", action: "Status Change", user: "Service Provider (sp201)", details: `Order #${orderId} status changed to Delivered (Doorstep).`
        });
    }
    if (status === orderStatuses.PICKED) {
        logs.push({
            id: `audit-${orderId}-2`, timestamp: "2023-10-26T11:30:00Z", action: "Order Accepted", user: "Service Provider (sp201)", details: `Order #${orderId} accepted by QuickIron Services.`
        });
        logs.push({
            id: `audit-${orderId}-3`, timestamp: "2023-10-26T14:00:00Z", action: "Status Change", user: "Service Provider (sp201)", details: `Order #${orderId} status changed to Ironing.`
        });
        logs.push({
            id: `audit-${orderId}-4`, timestamp: "2023-10-27T09:00:00Z", action: "Status Change", user: "Service Provider (sp201)", details: `Order #${orderId} status changed to Ready.`
        });
        logs.push({
            id: `audit-${orderId}-5`, timestamp: "2023-10-27T10:30:00Z", action: "Status Change", user: "Service Provider (sp201)", details: `Order #${orderId} status changed to Picked (Customer Pickup).`
        });
    }
    if (status === orderStatuses.REJECTED) {
        logs.push({
            id: `audit-${orderId}-2`, timestamp: "2023-10-26T12:00:00Z", action: "Order Rejected", user: "Service Provider (sp202)", details: `Order #${orderId} rejected due to workload.`
        });
    }
    return logs;
};

const ordersData = [
    {
        id: 'ORD001', customerId: 'cust101', serviceProviderId: 'sp201',
        deliveryOption: deliveryOptions.DOORSTEP, status: orderStatuses.DELIVERED,
        items: generateOrderItems(), createdAt: '2023-10-26T10:00:00Z',
        deliveryAddress: '123 Oak Ave, City', pickupDate: '2023-10-26', deliveryDate: '2023-10-27',
        slaDueDate: '2023-10-27T12:00:00Z'
    },
    {
        id: 'ORD002', customerId: 'cust102', serviceProviderId: 'sp202',
        deliveryOption: deliveryOptions.CUSTOMER_PICKUP, status: orderStatuses.READY,
        items: generateOrderItems(), createdAt: '2023-10-26T11:00:00Z',
        pickupDate: '2023-10-26', deliveryDate: 'N/A',
        slaDueDate: '2023-10-27T10:00:00Z'
    },
    {
        id: 'ORD003', customerId: 'cust101', serviceProviderId: 'sp201',
        deliveryOption: deliveryOptions.DOORSTEP, status: orderStatuses.IRONING,
        items: generateOrderItems(), createdAt: '2023-10-26T13:00:00Z',
        deliveryAddress: '123 Oak Ave, City', pickupDate: '2023-10-26', deliveryDate: '2023-10-27',
        slaDueDate: '2023-10-27T15:00:00Z'
    },
    {
        id: 'ORD004', customerId: 'cust102', serviceProviderId: 'sp202',
        deliveryOption: deliveryOptions.CUSTOMER_PICKUP, status: orderStatuses.ACCEPTED,
        items: generateOrderItems(), createdAt: '2023-10-27T09:00:00Z',
        pickupDate: '2023-10-27', deliveryDate: 'N/A',
        slaDueDate: '2023-10-28T09:00:00Z'
    },
    {
        id: 'ORD005', customerId: 'cust101', serviceProviderId: null, // No SP yet
        deliveryOption: deliveryOptions.DOORSTEP, status: orderStatuses.CREATED,
        items: generateOrderItems(), createdAt: '2023-10-27T10:30:00Z',
        deliveryAddress: '123 Oak Ave, City', pickupDate: '2023-10-27', deliveryDate: '2023-10-28',
        slaDueDate: '2023-10-28T12:00:00Z'
    },
    {
        id: 'ORD006', customerId: 'cust101', serviceProviderId: 'sp203',
        deliveryOption: deliveryOptions.DOORSTEP, status: orderStatuses.REJECTED,
        items: generateOrderItems(), createdAt: '2023-10-27T11:00:00Z',
        deliveryAddress: '123 Oak Ave, City', pickupDate: '2023-10-27', deliveryDate: '2023-10-28',
        slaDueDate: '2023-10-28T12:00:00Z'
    },
    {
        id: 'ORD007', customerId: 'cust102', serviceProviderId: 'sp201',
        deliveryOption: deliveryOptions.DOORSTEP, status: orderStatuses.ACCEPTED,
        items: generateOrderItems(), createdAt: '2023-10-27T14:00:00Z',
        deliveryAddress: '456 Pine St, City', pickupDate: '2023-10-27', deliveryDate: '2023-10-28',
        slaDueDate: '2023-10-28T16:00:00Z'
    },
    {
        id: 'ORD008', customerId: 'cust101', serviceProviderId: 'sp202',
        deliveryOption: deliveryOptions.CUSTOMER_PICKUP, status: orderStatuses.IRONING,
        items: generateOrderItems(), createdAt: '2023-10-28T09:00:00Z',
        pickupDate: '2023-10-28', deliveryDate: 'N/A',
        slaDueDate: '2023-10-29T10:00:00Z'
    },
];

const enrichedOrders = ordersData.map(order => ({
    ...order,
    customerName: customers.find(c => c.id === order.customerId)?.name || 'N/A',
    serviceProviderName: serviceProviders.find(sp => sp.id === order.serviceProviderId)?.name || 'Unassigned',
    totalAmount: calculateOrderTotal(order.items),
    timeline: generateTimeline(order.status),
    auditLog: generateAuditLog(order.id, order.status),
}));


// --- Context for global state (Theme, Auth, Navigation, Toast) ---
const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [currentUserRole, setCurrentUserRole] = useState(userRoles.CUSTOMER); // Default role for demo
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentView, setCurrentView] = useState('DASHBOARD'); // 'DASHBOARD', 'ORDERS_LIST', 'ORDER_DETAIL', 'CREATE_ORDER_FORM', 'PARTNERS_LIST', 'PARTNER_DETAIL', 'CREATE_PARTNER_FORM', 'RATE_SETUP_FORM'
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [mockOrders, setMockOrders] = useState(enrichedOrders);
    const [mockPartners, setMockPartners] = useState(serviceProviders);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    const showToast = (message, type = 'info') => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 5000); // Auto-dismiss after 5 seconds
    };

    const navigateTo = (view, id = null) => {
        setCurrentView(view);
        setSelectedRecordId(id);
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setMockOrders(prevOrders => prevOrders.map(order =>
            order.id === orderId ? { ...order, status: newStatus, timeline: generateTimeline(newStatus), auditLog: generateAuditLog(orderId, newStatus) } : order
        ));
        showToast(`Order ${orderId} status updated to ${newStatus}!`, 'success');
        navigateTo('ORDER_DETAIL', orderId); // Stay on detail page after action
    };

    const addOrder = (newOrder) => {
        const id = `ORD${String(mockOrders.length + 1).padStart(3, '0')}`;
        const newOrderWithId = {
            ...newOrder,
            id: id,
            customerId: 'cust101', // Assume customer places it
            serviceProviderId: null, // Initially unassigned
            createdAt: new Date().toISOString(),
            slaDueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days SLA
            status: orderStatuses.CREATED,
            items: newOrder.items.map(item => ({
                ...item,
                subtotal: item.quantity * clothesTypes.find(ct => ct.name === item.clothType).pricePerUnit
            })),
        };
        const items = newOrderWithId.items;
        newOrderWithId.totalAmount = calculateOrderTotal(items);
        newOrderWithId.timeline = generateTimeline(newOrderWithId.status);
        newOrderWithId.auditLog = generateAuditLog(newOrderWithId.id, newOrderWithId.status);

        setMockOrders(prevOrders => [newOrderWithId, ...prevOrders]);
        showToast(`Order ${id} placed successfully!`, 'success');
        navigateTo('ORDERS_LIST');
    };

    const addPartner = (newPartner) => {
        const id = `sp${String(mockPartners.length + 1).padStart(3, '0')}`;
        const partnerWithId = { ...newPartner, id: id, status: 'Active', rating: 0 };
        setMockPartners(prevPartners => [partnerWithId, ...prevPartners]);
        showToast(`Partner ${newPartner.name} added successfully!`, 'success');
        navigateTo('PARTNERS_LIST');
    };

    const updatePartner = (updatedPartner) => {
        setMockPartners(prevPartners => prevPartners.map(p => p.id === updatedPartner.id ? updatedPartner : p));
        showToast(`Partner ${updatedPartner.name} updated successfully!`, 'success');
        navigateTo('PARTNER_DETAIL', updatedPartner.id);
    };

    const assignServiceProvider = (orderId, spId) => {
        const sp = mockPartners.find(p => p.id === spId);
        if (!sp) return;
        setMockOrders(prevOrders => prevOrders.map(order =>
            order.id === orderId ? { ...order, serviceProviderId: spId, serviceProviderName: sp.name, status: orderStatuses.ACCEPTED, timeline: generateTimeline(orderStatuses.ACCEPTED), auditLog: generateAuditLog(orderId, orderStatuses.ACCEPTED) } : order
        ));
        showToast(`Order ${orderId} assigned to ${sp.name}!`, 'success');
        navigateTo('ORDER_DETAIL', orderId);
    };

    const contextValue = {
        currentUserRole, setCurrentUserRole,
        isLoggedIn, setIsLoggedIn,
        isDarkMode, setIsDarkMode,
        currentView, navigateTo,
        selectedRecordId,
        showToast,
        notifications,
        mockOrders,
        mockPartners,
        updateOrderStatus,
        addOrder,
        addPartner,
        updatePartner,
        assignServiceProvider,
        clothesTypes, // For forms
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// --- Reusable Components ---

const Button = ({ children, variant = 'primary', onClick, icon: Icon, type = 'button', className = '' }) => (
    <button type={type} onClick={onClick} className={`button button-${variant} ${className}`}>
        {Icon && <Icon />}
        {children}
    </button>
);

const KPICard = ({ title, value, trend, trendType, icon: Icon }) => (
    <div className="kpi-card">
        <div className="kpi-card-header">
            <span>{title}</span>
            {Icon && <div className="kpi-card-icon"><Icon /></div>}
        </div>
        <div className="kpi-card-value">{value}</div>
        {trend && (
            <div className={`kpi-card-trend ${trendType}`}>
                {trendType === 'positive' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>}
                {trendType === 'negative' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>}
                <span>{trend}</span>
            </div>
        )}
    </div>
);

const Card = ({ children, onClick, status, headerContent, footerContent, className = '' }) => (
    <div className={`card ${status ? getStatusColorClass(status) : ''} ${className}`} onClick={onClick}>
        {headerContent && <div className="card-header">{headerContent}</div>}
        <div className="card-content">{children}</div>
        {footerContent && <div className="card-footer">{footerContent}</div>}
    </div>
);

const StatusBadge = ({ status }) => (
    <span className={`status-badge ${getStatusColorClass(status)}`}>
        {status}
    </span>
);

const ChartPlaceholder = ({ title }) => (
    <div className="chart-container">
        <h3>{title}</h3>
        <p>Animated Chart Placeholder</p>
    </div>
);

const ToastNotification = ({ notification }) => {
    const iconMap = {
        success: <CheckIcon />,
        info: <InfoIcon />,
        warning: <AlertCircleIcon />,
        error: <XIcon />, // Reusing X for error, or a specific error icon
    };

    return (
        <div className={`toast ${notification.type}`}>
            <div className="toast-icon">{iconMap[notification.type]}</div>
            <div>{notification.message}</div>
        </div>
    );
};

const AccordionPanel = ({ title, children, isOpen, onToggle }) => (
    <div className="accordion-panel">
        <div className={`accordion-header ${isOpen ? 'active' : ''}`} onClick={onToggle}>
            <span>{title}</span>
            {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </div>
        <div className={`accordion-content ${isOpen ? 'active' : ''}`}>
            {children}
        </div>
    </div>
);

// --- Forms ---
const OrderForm = () => {
    const { navigateTo, addOrder, clothesTypes, showToast } = useContext(AppContext);
    const [formData, setFormData] = useState({
        deliveryOption: deliveryOptions.DOORSTEP,
        deliveryAddress: '',
        pickupDate: new Date().toISOString().split('T')[0],
        items: [{ clothType: clothesTypes[0]?.name || '', quantity: 1 }],
    });
    const [errors, setErrors] = useState({});
    const [openPanel, setOpenPanel] = useState('order_details');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = formData.items.map((item, i) =>
            i === index ? { ...item, [name]: name === 'quantity' ? parseInt(value) || 0 : value } : item
        );
        setFormData(prev => ({ ...prev, items: newItems }));
        setErrors(prev => ({ ...prev, items: '' }));
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { clothType: clothesTypes[0]?.name || '', quantity: 1 }]
        }));
    };

    const removeItem = (index) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (formData.deliveryOption === deliveryOptions.DOORSTEP && !formData.deliveryAddress) {
            newErrors.deliveryAddress = 'Delivery address is required for doorstep delivery.';
        }
        if (formData.items.length === 0) {
            newErrors.items = 'At least one item is required.';
        }
        formData.items.forEach((item, index) => {
            if (!item.clothType) newErrors[`item-${index}-clothType`] = 'Cloth type is required.';
            if (item.quantity <= 0) newErrors[`item-${index}-quantity`] = 'Quantity must be positive.';
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            addOrder(formData);
        } else {
            showToast('Please correct the form errors.', 'error');
        }
    };

    const isCustomer = useContext(AppContext).currentUserRole === userRoles.CUSTOMER;
    if (!isCustomer) {
        return <div className="full-screen-view"><p>Access Denied: Only customers can place orders.</p><Button onClick={() => navigateTo('DASHBOARD')}>Back to Dashboard</Button></div>;
    }

    return (
        <div className="full-screen-view">
            <div className="form-container">
                <div className="detail-page-header">
                    <h1><OrdersIcon /> Place New Order</h1>
                    <Button onClick={() => navigateTo('DASHBOARD')} variant="secondary">Back to Dashboard</Button>
                </div>
                <form onSubmit={handleSubmit}>
                    <AccordionPanel
                        title="Order Details"
                        isOpen={openPanel === 'order_details'}
                        onToggle={() => setOpenPanel(openPanel === 'order_details' ? '' : 'order_details')}
                    >
                        <div className="form-field">
                            <label htmlFor="deliveryOption">Delivery Option *</label>
                            <select id="deliveryOption" name="deliveryOption" value={formData.deliveryOption} onChange={handleInputChange} required>
                                <option value={deliveryOptions.DOORSTEP}>{deliveryOptions.DOORSTEP}</option>
                                <option value={deliveryOptions.CUSTOMER_PICKUP}>{deliveryOptions.CUSTOMER_PICKUP}</option>
                            </select>
                            {errors.deliveryOption && <p className="error-message">{errors.deliveryOption}</p>}
                        </div>
                        {formData.deliveryOption === deliveryOptions.DOORSTEP && (
                            <div className="form-field">
                                <label htmlFor="deliveryAddress">Delivery Address *</label>
                                <input type="text" id="deliveryAddress" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleInputChange} placeholder="Enter delivery address" required={formData.deliveryOption === deliveryOptions.DOORSTEP} />
                                {errors.deliveryAddress && <p className="error-message">{errors.deliveryAddress}</p>}
                            </div>
                        )}
                        <div className="form-field">
                            <label htmlFor="pickupDate">Preferred Pickup Date *</label>
                            <input type="date" id="pickupDate" name="pickupDate" value={formData.pickupDate} onChange={handleInputChange} required />
                            {errors.pickupDate && <p className="error-message">{errors.pickupDate}</p>}
                        </div>
                    </AccordionPanel>

                    <AccordionPanel
                        title="Items to Iron"
                        isOpen={openPanel === 'items'}
                        onToggle={() => setOpenPanel(openPanel === 'items' ? '' : 'items')}
                    >
                        {formData.items.map((item, index) => (
                            <div key={index} className="flex-row gap-md mb-md align-center" style={{ border: '1px dashed var(--color-border-light)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-md)' }}>
                                <div className="form-field flex-grow-1" style={{ marginBottom: 0 }}>
                                    <label>Cloth Type</label>
                                    <select name="clothType" value={item.clothType} onChange={(e) => handleItemChange(index, e)} required>
                                        {clothesTypes.map(ct => <option key={ct.id} value={ct.name}>{ct.name} (${ct.pricePerUnit.toFixed(2)}/unit)</option>)}
                                    </select>
                                    {errors[`item-${index}-clothType`] && <p className="error-message">{errors[`item-${index}-clothType`]}</p>}
                                </div>
                                <div className="form-field" style={{ width: '100px', marginBottom: 0 }}>
                                    <label>Quantity</label>
                                    <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} min="1" required />
                                    {errors[`item-${index}-quantity`] && <p className="error-message">{errors[`item-${index}-quantity`]}</p>}
                                </div>
                                <Button type="button" variant="danger" onClick={() => removeItem(index)} className="mt-lg">
                                    <XIcon />
                                </Button>
                            </div>
                        ))}
                        {errors.items && <p className="error-message mb-md">{errors.items}</p>}
                        <Button type="button" onClick={addItem} icon={PlusIcon} variant="secondary">Add Another Item</Button>
                    </AccordionPanel>

                    <div className="form-actions">
                        <Button type="submit" variant="primary">Place Order</Button>
                        <Button type="button" onClick={() => navigateTo('DASHBOARD')} variant="secondary">Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const PartnerSetupForm = ({ partnerId }) => {
    const { navigateTo, addPartner, updatePartner, mockPartners, showToast } = useContext(AppContext);
    const isEditing = !!partnerId;
    const existingPartner = isEditing ? mockPartners.find(p => p.id === partnerId) : null;

    const [formData, setFormData] = useState(
        isEditing && existingPartner
            ? { ...existingPartner }
            : { name: '', email: '', phone: '', status: 'Active', rating: 0 }
    );
    const [errors, setErrors] = useState({});
    const [openPanel, setOpenPanel] = useState('partner_details');

    useEffect(() => {
        if (isEditing && !existingPartner) {
            showToast('Partner not found for editing.', 'error');
            navigateTo('PARTNERS_LIST');
        }
    }, [isEditing, existingPartner, navigateTo, showToast]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Partner name is required.';
        if (!formData.email.trim()) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (isEditing) {
                updatePartner(formData);
            } else {
                addPartner(formData);
            }
        } else {
            showToast('Please correct the form errors.', 'error');
        }
    };

    const isAdmin = useContext(AppContext).currentUserRole === userRoles.ADMIN;
    if (!isAdmin) {
        return <div className="full-screen-view"><p>Access Denied: Only Admins can manage partners.</p><Button onClick={() => navigateTo('DASHBOARD')}>Back to Dashboard</Button></div>;
    }

    return (
        <div className="full-screen-view">
            <div className="form-container">
                <div className="detail-page-header">
                    <h1><UsersIcon /> {isEditing ? `Edit Partner: ${existingPartner?.name}` : 'Setup New Partner'}</h1>
                    <Button onClick={() => navigateTo('PARTNERS_LIST')} variant="secondary">Back to Partners</Button>
                </div>
                <form onSubmit={handleSubmit}>
                    <AccordionPanel
                        title="Partner Information"
                        isOpen={openPanel === 'partner_details'}
                        onToggle={() => setOpenPanel(openPanel === 'partner_details' ? '' : 'partner_details')}
                    >
                        <div className="form-field">
                            <label htmlFor="name">Partner Name *</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="phone">Phone *</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                            {errors.phone && <p className="error-message">{errors.phone}</p>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="status">Status</label>
                            <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                                <option value="Active">Active</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </AccordionPanel>
                    <div className="form-actions">
                        <Button type="submit" variant="primary">{isEditing ? 'Update Partner' : 'Add Partner'}</Button>
                        <Button type="button" onClick={() => navigateTo('PARTNERS_LIST')} variant="secondary">Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const RateSetupForm = () => {
    const { navigateTo, clothesTypes, showToast } = useContext(AppContext);
    const [rates, setRates] = useState(clothesTypes.map(c => ({ ...c, newPrice: c.pricePerUnit.toFixed(2) })));
    const [errors, setErrors] = useState({});

    const handlePriceChange = (id, e) => {
        const value = e.target.value;
        setRates(prevRates => prevRates.map(rate =>
            rate.id === id ? { ...rate, newPrice: value } : rate
        ));
        setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        rates.forEach(rate => {
            const price = parseFloat(rate.newPrice);
            if (isNaN(price) || price <= 0) {
                newErrors[rate.id] = 'Price must be a positive number.';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // In a real app, this would dispatch an action to update global state or hit an API
            showToast('Pricing rates updated successfully! (Demo update)', 'success');
            console.log('Updated rates:', rates.map(r => ({ id: r.id, name: r.name, price: parseFloat(r.newPrice) })));
            navigateTo('DASHBOARD');
        } else {
            showToast('Please correct the form errors.', 'error');
        }
    };

    const isAdmin = useContext(AppContext).currentUserRole === userRoles.ADMIN;
    if (!isAdmin) {
        return <div className="full-screen-view"><p>Access Denied: Only Admins can set rates.</p><Button onClick={() => navigateTo('DASHBOARD')}>Back to Dashboard</Button></div>;
    }

    return (
        <div className="full-screen-view">
            <div className="form-container">
                <div className="detail-page-header">
                    <h1><DollarSignIcon /> Setup Pricing Rates</h1>
                    <Button onClick={() => navigateTo('DASHBOARD')} variant="secondary">Back to Dashboard</Button>
                </div>
                <form onSubmit={handleSubmit}>
                    <AccordionPanel
                        title="Cloth Type Pricing"
                        isOpen={true}
                        onToggle={() => {}} // Always open for this form
                    >
                        {rates.map(rate => (
                            <div key={rate.id} className="form-field flex-row align-center gap-md">
                                <label htmlFor={`price-${rate.id}`} style={{ width: '150px', flexShrink: 0 }}>{rate.name}</label>
                                <input
                                    type="number"
                                    id={`price-${rate.id}`}
                                    name={`price-${rate.id}`}
                                    value={rate.newPrice}
                                    onChange={(e) => handlePriceChange(rate.id, e)}
                                    min="0.01"
                                    step="0.01"
                                    required
                                    className="flex-grow-1"
                                />
                                {errors[rate.id] && <p className="error-message">{errors[rate.id]}</p>}
                            </div>
                        ))}
                    </AccordionPanel>
                    <div className="form-actions">
                        <Button type="submit" variant="primary">Save Rates</Button>
                        <Button type="button" onClick={() => navigateTo('DASHBOARD')} variant="secondary">Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const OrderUpdateForm = ({ orderId }) => {
    const { navigateTo, mockOrders, updateOrderStatus, assignServiceProvider, mockPartners, showToast } = useContext(AppContext);
    const existingOrder = mockOrders.find(o => o.id === orderId);

    const [formData, setFormData] = useState({
        status: existingOrder?.status || '',
        serviceProviderId: existingOrder?.serviceProviderId || ''
    });
    const [errors, setErrors] = useState({});
    const [openPanel, setOpenPanel] = useState('status_update');

    useEffect(() => {
        if (!existingOrder) {
            showToast('Order not found for updating.', 'error');
            navigateTo('ORDERS_LIST');
        } else {
            setFormData({
                status: existingOrder.status,
                serviceProviderId: existingOrder.serviceProviderId || ''
            });
        }
    }, [orderId, existingOrder, navigateTo, showToast]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (formData.status === orderStatuses.ACCEPTED && !formData.serviceProviderId) {
            newErrors.serviceProviderId = 'Service Provider must be assigned if order is accepted.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm() && existingOrder) {
            if (formData.status !== existingOrder.status) {
                updateOrderStatus(orderId, formData.status);
            }
            if (formData.serviceProviderId && formData.serviceProviderId !== existingOrder.serviceProviderId) {
                assignServiceProvider(orderId, formData.serviceProviderId);
            }
            navigateTo('ORDER_DETAIL', orderId); // Go back to detail
        } else {
            showToast('Please correct the form errors.', 'error');
        }
    };

    const isServiceProvider = useContext(AppContext).currentUserRole === userRoles.SERVICE_PROVIDER;
    const isAdmin = useContext(AppContext).currentUserRole === userRoles.ADMIN;

    if (!isServiceProvider && !isAdmin) {
        return <div className="full-screen-view"><p>Access Denied: Only Service Providers or Admins can update orders.</p><Button onClick={() => navigateTo('DASHBOARD')}>Back to Dashboard</Button></div>;
    }

    if (!existingOrder) return null;

    const availableStatuses = [
        orderStatuses.CREATED, orderStatuses.ACCEPTED, orderStatuses.IRONING,
        orderStatuses.READY, orderStatuses.DELIVERED, orderStatuses.PICKED,
        orderStatuses.REJECTED
    ];
    // Service provider can only update status to a 'next' logical state
    const currentStatusIndex = availableStatuses.indexOf(existingOrder.status);
    const spUpdatableStatuses = availableStatuses.slice(currentStatusIndex, currentStatusIndex + 3); // Current, and next two logical statuses

    return (
        <div className="full-screen-view">
            <div className="form-container">
                <div className="detail-page-header">
                    <h1><EditIcon /> Update Order: {orderId}</h1>
                    <Button onClick={() => navigateTo('ORDER_DETAIL', orderId)} variant="secondary">Back to Order Details</Button>
                </div>
                <form onSubmit={handleSubmit}>
                    <AccordionPanel
                        title="Order Status & Assignment"
                        isOpen={openPanel === 'status_update'}
                        onToggle={() => setOpenPanel(openPanel === 'status_update' ? '' : 'status_update')}
                    >
                        <div className="form-field">
                            <label htmlFor="status">Update Status *</label>
                            <select id="status" name="status" value={formData.status} onChange={handleInputChange} required>
                                {isServiceProvider ? (
                                    spUpdatableStatuses.map(s => <option key={s} value={s}>{s}</option>)
                                ) : (
                                    availableStatuses.map(s => <option key={s} value={s}>{s}</option>)
                                )}
                            </select>
                            {errors.status && <p className="error-message">{errors.status}</p>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="serviceProviderId">Assign Service Provider</label>
                            <select id="serviceProviderId" name="serviceProviderId" value={formData.serviceProviderId || ''} onChange={handleInputChange}>
                                <option value="">Select Service Provider</option>
                                {mockPartners.map(sp => (
                                    <option key={sp.id} value={sp.id}>{sp.name}</option>
                                ))}
                            </select>
                            {errors.serviceProviderId && <p className="error-message">{errors.serviceProviderId}</p>}
                        </div>
                    </AccordionPanel>
                    <div className="form-actions">
                        <Button type="submit" variant="primary">Update Order</Button>
                        <Button type="button" onClick={() => navigateTo('ORDER_DETAIL', orderId)} variant="secondary">Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Dashboards ---
const AdminDashboard = () => {
    const { mockOrders, navigateTo, currentUserRole } = useContext(AppContext);
    const isAdmin = currentUserRole === userRoles.ADMIN;

    const totalOrders = mockOrders.length;
    const revenue = mockOrders.filter(o => o.status === orderStatuses.DELIVERED || o.status === orderStatuses.PICKED).reduce((sum, order) => sum + order.totalAmount, 0);
    const deliveredCount = mockOrders.filter(o => o.deliveryOption === deliveryOptions.DOORSTEP && (o.status === orderStatuses.DELIVERED || o.status === orderStatuses.READY)).length;
    const pickupCount = mockOrders.filter(o => o.deliveryOption === deliveryOptions.CUSTOMER_PICKUP && (o.status === orderStatuses.PICKED || o.status === orderStatuses.READY)).length;
    
    // Avg Turnaround Time (TAT) - simplified calculation for demo
    const completedOrders = mockOrders.filter(o => o.status === orderStatuses.DELIVERED || o.status === orderStatuses.PICKED);
    const totalTATMinutes = completedOrders.reduce((sum, order) => {
        const created = new Date(order.createdAt);
        const completedTimelineEntry = order.timeline.find(t => t.stage === orderStatuses.DELIVERED || t.stage === orderStatuses.PICKED);
        if (completedTimelineEntry) {
            const completed = new Date(completedTimelineEntry.date);
            return sum + (completed.getTime() - created.getTime()) / (1000 * 60); // Difference in minutes
        }
        return sum;
    }, 0);
    const avgTAT = completedOrders.length > 0 ? (totalTATMinutes / completedOrders.length / 60).toFixed(1) : 'N/A'; // TAT in hours

    const recentActivities = mockOrders
        .flatMap(order => order.auditLog.map(log => ({ ...log, orderId: order.id, customerName: order.customerName, serviceProviderName: order.serviceProviderName })))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);

    if (!isAdmin) {
        return <div className="main-content"><p>Access Denied: You do not have permission to view this dashboard.</p></div>;
    }

    return (
        <div className="main-content">
            <h2 className="section-header">Admin Dashboard</h2>
            <div className="kpi-grid">
                <KPICard title="Total Orders" value={totalOrders} trend="+5% WoW" trendType="positive" icon={OrdersIcon} />
                <KPICard title="Total Revenue" value={`$${revenue.toFixed(2)}`} trend="+8% WoW" trendType="positive" icon={DollarSignIcon} />
                <KPICard title="Avg Turnaround Time" value={`${avgTAT} hrs`} trend="-2% DoD" trendType="positive" icon={ClockIcon} />
                <KPICard title="Doorstep Deliveries" value={deliveredCount} trend="+3% DoD" trendType="positive" icon={TruckIcon} />
                <KPICard title="Customer Pickups" value={pickupCount} trend="0% DoD" trendType="neutral" icon={PackageIcon} />
            </div>

            <div className="card-grid mb-lg">
                <ChartPlaceholder title="Revenue Trend (Admin)" />
                <ChartPlaceholder title="Turnaround Time Gauge (Admin)" />
                <ChartPlaceholder title="Delivery vs Pickup (Admin)" />
            </div>

            <div className="section-header">
                <h2>Recent Activities</h2>
            </div>
            <div className="recent-activities-panel">
                {recentActivities.length > 0 ? (
                    recentActivities.map(activity => (
                        <div key={activity.id} className="activity-item">
                            <div className="activity-icon-wrapper"><ActivityIcon /></div>
                            <div className="activity-info">
                                <strong>{activity.action}</strong> for Order <a href="#" onClick={() => navigateTo('ORDER_DETAIL', activity.orderId)}>{activity.orderId}</a>
                                <p style={{fontSize: '0.9em', color: 'var(--color-text-light)'}}>{activity.details}</p>
                            </div>
                            <span className="activity-time">{new Date(activity.timestamp).toLocaleString()}</span>
                        </div>
                    ))
                ) : (
                    <p>No recent activities.</p>
                )}
            </div>
        </div>
    );
};

const CustomerDashboard = () => {
    const { mockOrders, currentUserRole, navigateTo } = useContext(AppContext);
    const isCustomer = currentUserRole === userRoles.CUSTOMER;

    const customerOrders = mockOrders.filter(o => o.customerId === 'cust101'); // Assuming logged in as cust101 for demo
    const ordersPlaced = customerOrders.length;
    const ordersReady = customerOrders.filter(o => o.status === orderStatuses.READY || o.status === orderStatuses.DELIVERED || o.status === orderStatuses.PICKED).length;

    const recentActivities = customerOrders
        .flatMap(order => order.auditLog.filter(log => ['Order Placed', 'Order Ready', 'Delivery Scheduled'].some(s => log.action.includes(s))).map(log => ({ ...log, orderId: order.id })))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);


    if (!isCustomer) {
        return <div className="main-content"><p>Access Denied: You do not have permission to view this dashboard.</p></div>;
    }

    return (
        <div className="main-content">
            <h2 className="section-header">My Dashboard</h2>
            <div className="kpi-grid">
                <KPICard title="Orders Placed" value={ordersPlaced} icon={OrdersIcon} />
                <KPICard title="Orders Ready" value={ordersReady} icon={LaundryIcon} />
            </div>

            <div className="card-grid mb-lg">
                <ChartPlaceholder title="My Order Status (Customer)" />
            </div>

            <div className="section-header">
                <h2>My Recent Orders</h2>
                <Button onClick={() => navigateTo('CREATE_ORDER_FORM')} icon={PlusIcon}>Place New Order</Button>
            </div>
            <div className="card-grid">
                {customerOrders.length > 0 ? (
                    customerOrders.slice(0, 6).map(order => ( // Show up to 6 recent orders
                        <Card
                            key={order.id}
                            onClick={() => navigateTo('ORDER_DETAIL', order.id)}
                            status={order.status}
                            headerContent={<h4>Order #{order.id}</h4>}
                            footerContent={<span>Placed: {new Date(order.createdAt).toLocaleDateString()}</span>}
                        >
                            <p><strong>Status:</strong> <StatusBadge status={order.status} /></p>
                            <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                            <p><strong>Delivery:</strong> {order.deliveryOption}</p>
                            {order.serviceProviderName && <p><strong>Provider:</strong> {order.serviceProviderName}</p>}
                        </Card>
                    ))
                ) : (
                    <div className="text-center" style={{ gridColumn: '1 / -1' }}>
                        <p className="text-xl mb-lg">No orders placed yet!</p>
                        <Button onClick={() => navigateTo('CREATE_ORDER_FORM')} icon={PlusIcon}>Place Your First Order</Button>
                    </div>
                )}
            </div>

            <div className="section-header mt-xl">
                <h2>My Recent Activities</h2>
            </div>
            <div className="recent-activities-panel">
                {recentActivities.length > 0 ? (
                    recentActivities.map(activity => (
                        <div key={activity.id} className="activity-item">
                            <div className="activity-icon-wrapper"><ActivityIcon /></div>
                            <div className="activity-info">
                                <strong>{activity.action}</strong> for Order <a href="#" onClick={() => navigateTo('ORDER_DETAIL', activity.orderId)}>{activity.orderId}</a>
                                <p style={{fontSize: '0.9em', color: 'var(--color-text-light)'}}>{activity.details}</p>
                            </div>
                            <span className="activity-time">{new Date(activity.timestamp).toLocaleString()}</span>
                        </div>
                    ))
                ) : (
                    <p>No recent activities.</p>
                )}
            </div>
        </div>
    );
};

const ServiceProviderDashboard = () => {
    const { mockOrders, currentUserRole, navigateTo } = useContext(AppContext);
    const isServiceProvider = currentUserRole === userRoles.SERVICE_PROVIDER;

    const myProvider = serviceProviders.find(sp => sp.id === 'sp201'); // Assuming logged in as sp201 for demo
    const myOrders = mockOrders.filter(o => o.serviceProviderId === myProvider?.id);

    const ordersReceived = myOrders.length;
    const ordersInProgress = myOrders.filter(o => o.status === orderStatuses.ACCEPTED || o.status === orderStatuses.IRONING).length;
    const ordersCompleted = myOrders.filter(o => o.status === orderStatuses.READY || o.status === orderStatuses.DELIVERED || o.status === orderStatuses.PICKED).length;
    const deliveriesScheduled = myOrders.filter(o => o.deliveryOption === deliveryOptions.DOORSTEP && o.status === orderStatuses.READY).length;

    const recentActivities = myOrders
        .flatMap(order => order.auditLog.filter(log => ['Order Accepted', 'Order Completed', 'Delivery Completed'].some(s => log.action.includes(s))).map(log => ({ ...log, orderId: order.id })))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);

    if (!isServiceProvider) {
        return <div className="main-content"><p>Access Denied: You do not have permission to view this dashboard.</p></div>;
    }

    return (
        <div className="main-content">
            <h2 className="section-header">Service Provider Dashboard: {myProvider?.name}</h2>
            <div className="kpi-grid">
                <KPICard title="Orders Received" value={ordersReceived} icon={OrdersIcon} />
                <KPICard title="Orders In Progress" value={ordersInProgress} icon={LaundryIcon} />
                <KPICard title="Orders Completed" value={ordersCompleted} icon={CheckIcon} />
                <KPICard title="Deliveries Scheduled" value={deliveriesScheduled} icon={TruckIcon} />
            </div>

            <div className="card-grid mb-lg">
                <ChartPlaceholder title="Orders by Status (Service Provider)" />
                <ChartPlaceholder title="Daily Volume Trend (Service Provider)" />
                <ChartPlaceholder title="Delivery vs Pickup (Service Provider)" />
            </div>

            <div className="section-header">
                <h2>My Work Queue</h2>
            </div>
            <div className="card-grid">
                {myOrders.filter(o => o.status !== orderStatuses.DELIVERED && o.status !== orderStatuses.PICKED && o.status !== orderStatuses.REJECTED).length > 0 ? (
                    myOrders.filter(o => o.status !== orderStatuses.DELIVERED && o.status !== orderStatuses.PICKED && o.status !== orderStatuses.REJECTED).slice(0, 6).map(order => (
                        <Card
                            key={order.id}
                            onClick={() => navigateTo('ORDER_DETAIL', order.id)}
                            status={order.status}
                            headerContent={<h4>Order #{order.id}</h4>}
                            footerContent={<span>Due: {new Date(order.slaDueDate).toLocaleDateString()}</span>}
                        >
                            <p><strong>Status:</strong> <StatusBadge status={order.status} /></p>
                            <p><strong>Customer:</strong> {order.customerName}</p>
                            <p><strong>Delivery:</strong> {order.deliveryOption}</p>
                        </Card>
                    ))
                ) : (
                    <div className="text-center" style={{ gridColumn: '1 / -1' }}>
                        <p className="text-xl mb-lg">No active orders in your queue!</p>
                    </div>
                )}
            </div>

            <div className="section-header mt-xl">
                <h2>My Recent Activities</h2>
            </div>
            <div className="recent-activities-panel">
                {recentActivities.length > 0 ? (
                    recentActivities.map(activity => (
                        <div key={activity.id} className="activity-item">
                            <div className="activity-icon-wrapper"><ActivityIcon /></div>
                            <div className="activity-info">
                                <strong>{activity.action}</strong> for Order <a href="#" onClick={() => navigateTo('ORDER_DETAIL', activity.orderId)}>{activity.orderId}</a>
                                <p style={{fontSize: '0.9em', color: 'var(--color-text-light)'}}>{activity.details}</p>
                            </div>
                            <span className="activity-time">{new Date(activity.timestamp).toLocaleString()}</span>
                        </div>
                    ))
                ) : (
                    <p>No recent activities.</p>
                )}
            </div>
        </div>
    );
};


// --- Record Lists (Card Grids) ---
const OrdersList = () => {
    const { currentUserRole, mockOrders, navigateTo, mockPartners } = useContext(AppContext);
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterDelivery, setFilterDelivery] = useState('All');
    const [filterPartner, setFilterPartner] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    let filteredOrders = mockOrders;

    // RBAC for data visibility
    if (currentUserRole === userRoles.CUSTOMER) {
        filteredOrders = filteredOrders.filter(order => order.customerId === 'cust101'); // Assume logged in as cust101
    } else if (currentUserRole === userRoles.SERVICE_PROVIDER) {
        filteredOrders = filteredOrders.filter(order => order.serviceProviderId === 'sp201'); // Assume logged in as sp201
    }

    if (filterStatus !== 'All') {
        filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
    }
    if (filterDelivery !== 'All') {
        filteredOrders = filteredOrders.filter(order => order.deliveryOption === filterDelivery);
    }
    if (currentUserRole === userRoles.ADMIN && filterPartner !== 'All') {
        filteredOrders = filteredOrders.filter(order => order.serviceProviderId === filterPartner);
    }

    if (searchTerm) {
        filteredOrders = filteredOrders.filter(order =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.serviceProviderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.deliveryAddress?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }


    const isCustomer = currentUserRole === userRoles.CUSTOMER;
    const isServiceProvider = currentUserRole === userRoles.SERVICE_PROVIDER;
    const isAdmin = currentUserRole === userRoles.ADMIN;

    if (!isCustomer && !isServiceProvider && !isAdmin) {
        return <div className="main-content"><p>Access Denied: You do not have permission to view orders.</p></div>;
    }

    return (
        <div className="main-content">
            <div className="section-header">
                <h2>All Orders</h2>
                {isCustomer && <Button onClick={() => navigateTo('CREATE_ORDER_FORM')} icon={PlusIcon}>Place New Order</Button>}
                {isAdmin && <Button onClick={() => alert('Export to Excel/PDF (Admin)')} variant="secondary">Export</Button>}
            </div>

            <div className="flex-row gap-md mb-lg align-center">
                <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flexGrow: 1, maxWidth: '300px' }}
                />
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="All">All Statuses</option>
                    {Object.values(orderStatuses).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={filterDelivery} onChange={(e) => setFilterDelivery(e.target.value)}>
                    <option value="All">All Delivery Options</option>
                    {Object.values(deliveryOptions).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {isAdmin && (
                    <select value={filterPartner} onChange={(e) => setFilterPartner(e.target.value)}>
                        <option value="All">All Partners</option>
                        {mockPartners.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                )}
            </div>

            <div className="card-grid">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <Card
                            key={order.id}
                            onClick={() => navigateTo('ORDER_DETAIL', order.id)}
                            status={order.status}
                            headerContent={
                                <>
                                    <h4>Order #{order.id}</h4>
                                    <StatusBadge status={order.status} />
                                </>
                            }
                            footerContent={<span>Created: {new Date(order.createdAt).toLocaleDateString()}</span>}
                        >
                            <p><strong>Customer:</strong> {order.customerName}</p>
                            <p><strong>Provider:</strong> {order.serviceProviderName}</p>
                            <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                            <p><strong>Delivery:</strong> {order.deliveryOption}</p>
                            <p><strong>SLA Due:</strong> {new Date(order.slaDueDate).toLocaleDateString()}</p>
                        </Card>
                    ))
                ) : (
                    <div className="text-center" style={{ gridColumn: '1 / -1' }}>
                        <p className="text-xl mb-lg">No orders match your criteria.</p>
                        {isCustomer && <Button onClick={() => navigateTo('CREATE_ORDER_FORM')} icon={PlusIcon}>Place New Order</Button>}
                    </div>
                )}
            </div>
        </div>
    );
};

const PartnersList = () => {
    const { currentUserRole, mockPartners, navigateTo } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    let filteredPartners = mockPartners;

    if (filterStatus !== 'All') {
        filteredPartners = filteredPartners.filter(p => p.status === filterStatus);
    }
    if (searchTerm) {
        filteredPartners = filteredPartners.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    const isAdmin = currentUserRole === userRoles.ADMIN;

    if (!isAdmin) {
        return <div className="main-content"><p>Access Denied: Only Admins can view partners.</p></div>;
    }

    return (
        <div className="main-content">
            <div className="section-header">
                <h2>Ironing Partners</h2>
                <Button onClick={() => navigateTo('CREATE_PARTNER_FORM')} icon={PlusIcon}>Add New Partner</Button>
            </div>

            <div className="flex-row gap-md mb-lg align-center">
                <input
                    type="text"
                    placeholder="Search partners..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flexGrow: 1, maxWidth: '300px' }}
                />
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <div className="card-grid">
                {filteredPartners.length > 0 ? (
                    filteredPartners.map(partner => (
                        <Card
                            key={partner.id}
                            onClick={() => navigateTo('PARTNER_DETAIL', partner.id)}
                            status={partner.status === 'Active' ? orderStatuses.ACCEPTED : orderStatuses.CREATED} // Map partner status to card status colors
                            headerContent={
                                <>
                                    <h4>{partner.name}</h4>
                                    <StatusBadge status={partner.status} />
                                </>
                            }
                            footerContent={<span>Rating: {partner.rating.toFixed(1)}/5</span>}
                        >
                            <p><strong>Email:</strong> {partner.email}</p>
                            <p><strong>Phone:</strong> {partner.phone}</p>
                            <p><strong>Orders Handled:</strong> {mockOrders.filter(o => o.serviceProviderId === partner.id).length}</p>
                        </Card>
                    ))
                ) : (
                    <div className="text-center" style={{ gridColumn: '1 / -1' }}>
                        <p className="text-xl mb-lg">No partners match your criteria.</p>
                        <Button onClick={() => navigateTo('CREATE_PARTNER_FORM')} icon={PlusIcon}>Add New Partner</Button>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- Record Detail Views (Full-screen) ---
const OrderDetail = ({ orderId }) => {
    const { navigateTo, mockOrders, currentUserRole, updateOrderStatus, showToast } = useContext(AppContext);
    const order = mockOrders.find(o => o.id === orderId);

    const isCustomer = currentUserRole === userRoles.CUSTOMER;
    const isServiceProvider = currentUserRole === userRoles.SERVICE_PROVIDER;
    const isAdmin = currentUserRole === userRoles.ADMIN;

    useEffect(() => {
        if (!order) {
            showToast(`Order ${orderId} not found.`, 'error');
            navigateTo('ORDERS_LIST');
        } else if (isCustomer && order.customerId !== 'cust101') { // RBAC for record-level security
            showToast('Access Denied: You do not have permission to view this order.', 'error');
            navigateTo('ORDERS_LIST');
        } else if (isServiceProvider && order.serviceProviderId !== 'sp201' && order.status === orderStatuses.CREATED) { // SP can't see unassigned or other SP's orders
             showToast('Access Denied: You do not have permission to view this order.', 'error');
             navigateTo('ORDERS_LIST');
        }
    }, [order, orderId, navigateTo, currentUserRole, showToast, isCustomer, isServiceProvider]);

    if (!order || (isCustomer && order.customerId !== 'cust101') || (isServiceProvider && order.serviceProviderId !== 'sp201' && order.status === orderStatuses.CREATED)) {
        return null; // Redirect handled by useEffect
    }

    const handleAction = (action) => {
        switch (action) {
            case 'ACCEPT_ORDER':
                // In a real app, this would assign the SP to the order
                updateOrderStatus(order.id, orderStatuses.ACCEPTED);
                break;
            case 'MARK_IRONING':
                updateOrderStatus(order.id, orderStatuses.IRONING);
                break;
            case 'MARK_READY':
                updateOrderStatus(order.id, orderStatuses.READY);
                break;
            case 'MARK_DELIVERED':
                updateOrderStatus(order.id, orderStatuses.DELIVERED);
                break;
            case 'MARK_PICKED':
                updateOrderStatus(order.id, orderStatuses.PICKED);
                break;
            case 'REJECT_ORDER':
                updateOrderStatus(order.id, orderStatuses.REJECTED);
                break;
            case 'EDIT_ORDER':
                navigateTo('EDIT_ORDER_FORM', order.id);
                break;
            default:
                break;
        }
    };

    const getAvailableActions = () => {
        const actions = [];
        if (isAdmin || isServiceProvider) {
            if (order.status === orderStatuses.CREATED && !order.serviceProviderId) {
                actions.push(<Button key="accept" variant="primary" onClick={() => handleAction('EDIT_ORDER')}>Accept Order / Assign SP</Button>);
            } else if (order.status === orderStatuses.ACCEPTED) {
                actions.push(<Button key="ironing" variant="primary" onClick={() => handleAction('MARK_IRONING')}>Mark as Ironing</Button>);
            } else if (order.status === orderStatuses.IRONING) {
                actions.push(<Button key="ready" variant="primary" onClick={() => handleAction('MARK_READY')}>Mark as Ready</Button>);
            } else if (order.status === orderStatuses.READY) {
                if (order.deliveryOption === deliveryOptions.DOORSTEP) {
                    actions.push(<Button key="delivered" variant="primary" onClick={() => handleAction('MARK_DELIVERED')}>Mark as Delivered</Button>);
                } else {
                    actions.push(<Button key="picked" variant="primary" onClick={() => handleAction('MARK_PICKED')}>Mark as Picked</Button>);
                }
            }
            if (order.status !== orderStatuses.REJECTED && order.status !== orderStatuses.DELIVERED && order.status !== orderStatuses.PICKED) {
                 actions.push(<Button key="edit" variant="secondary" onClick={() => handleAction('EDIT_ORDER')}>Update Order</Button>);
            }
        }
        if (isAdmin && (order.status !== orderStatuses.DELIVERED && order.status !== orderStatuses.PICKED)) {
             actions.push(<Button key="reject" variant="danger" onClick={() => handleAction('REJECT_ORDER')}>Reject Order</Button>);
        }
        return actions;
    };

    return (
        <div className="full-screen-view">
            <div>
                <div className="detail-page-header">
                    <h1>Order #{order.id} <StatusBadge status={order.status} /></h1>
                    <div className="detail-page-actions">
                        {getAvailableActions()}
                        <Button onClick={() => navigateTo('ORDERS_LIST')} variant="secondary">Back to Orders</Button>
                    </div>
                </div>

                <div className="detail-card-grid">
                    <div className="detail-main-info">
                        <div className="detail-section-card">
                            <h3>Order Info</h3>
                            <div className="detail-item"><span className="detail-item-label">Customer:</span> <span className="detail-item-value">{order.customerName} ({order.customerId})</span></div>
                            <div className="detail-item"><span className="detail-item-label">Service Provider:</span> <span className="detail-item-value">{order.serviceProviderName}</span></div>
                            <div className="detail-item"><span className="detail-item-label">Created:</span> <span className="detail-item-value">{new Date(order.createdAt).toLocaleString()}</span></div>
                            <div className="detail-item"><span className="detail-item-label">Delivery Option:</span> <span className="detail-item-value">{order.deliveryOption}</span></div>
                            {order.deliveryOption === deliveryOptions.DOORSTEP && (
                                <div className="detail-item"><span className="detail-item-label">Delivery Address:</span> <span className="detail-item-value">{order.deliveryAddress}</span></div>
                            )}
                            <div className="detail-item"><span className="detail-item-label">Pickup Date:</span> <span className="detail-item-value">{order.pickupDate}</span></div>
                            {order.deliveryDate !== 'N/A' && order.deliveryDate && order.deliveryOption === deliveryOptions.DOORSTEP && (
                                <div className="detail-item"><span className="detail-item-label">Est. Delivery Date:</span> <span className="detail-item-value">{order.deliveryDate}</span></div>
                            )}
                        </div>

                        <div className="detail-section-card">
                            <h3>Pricing & Items</h3>
                            <div className="detail-item"><span className="detail-item-label">Total Amount:</span> <span className="detail-item-value font-bold">${order.totalAmount.toFixed(2)}</span></div>
                            <h4>Items:</h4>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index} style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                                        {item.clothType}: {item.quantity} units @ ${item.unitPrice.toFixed(2)} each = ${item.subtotal.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="detail-sidebar">
                        <div className="detail-section-card mb-lg">
                            <h3>Workflow Timeline</h3>
                            <div className="workflow-stepper">
                                {Object.values(orderStatuses).filter(s => s !== orderStatuses.PENDING_PAYMENT).map((stage, index) => {
                                    const stageCompleted = order.timeline.some(t => t.stage === stage || (stage === orderStatuses.READY && (t.stage === orderStatuses.DELIVERED || t.stage === orderStatuses.PICKED)));
                                    const isActive = order.status === stage || (stage === orderStatuses.READY && (order.status === orderStatuses.DELIVERED || order.status === orderStatuses.PICKED)); // Special handling for Ready being active until final step
                                    const isFinalStage = (stage === orderStatuses.DELIVERED || stage === orderStatuses.PICKED);

                                    // Determine if current stage is the one corresponding to the order's actual status
                                    const isCurrentExactStage = order.status === stage || (stage === orderStatuses.DELIVERED && order.status === orderStatuses.DELIVERED) || (stage === orderStatuses.PICKED && order.status === orderStatuses.PICKED) || (stage === orderStatuses.READY && (order.status === orderStatuses.READY || order.status === orderStatuses.DELIVERED || order.status === orderStatuses.PICKED));

                                    // Display SLA if it's the current active stage or a future stage
                                    const showSla = (isCurrentExactStage || index > Object.values(orderStatuses).indexOf(order.status)) && !stageCompleted;
                                    const slaBreached = showSla && new Date(order.slaDueDate) < new Date(); // Simplified SLA check

                                    const stageDate = order.timeline.find(t => t.stage === stage || (stage === orderStatuses.READY && (t.stage === orderStatuses.DELIVERED || t.stage === orderStatuses.PICKED)))?.date;

                                    return (
                                        <div key={stage} className="workflow-step">
                                            <div className={`workflow-step-icon ${stageCompleted ? 'completed' : (isActive ? 'active' : '')}`}>
                                                {stageCompleted ? <CheckIcon size={16} /> : (index + 1)}
                                            </div>
                                            <div className="workflow-step-content">
                                                <h4>{stage}</h4>
                                                <p>{stageDate ? `Completed: ${new Date(stageDate).toLocaleString()}` : `Expected: ${new Date(order.slaDueDate).toLocaleDateString()}`}</p>
                                                {showSla && (
                                                    <p className={`status-badge ${slaBreached ? 'status-Rejected' : 'status-Accepted'}`} style={{ marginTop: '5px' }}>
                                                        {slaBreached ? 'SLA BREACHED!' : `SLA: ${new Date(order.slaDueDate).toLocaleDateString()}`}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {(isAdmin || isServiceProvider) && ( // RBAC: Only Admin/SP can see audit logs
                            <div className="detail-section-card">
                                <h3>Audit Log</h3>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    <table className="audit-log-table">
                                        <thead>
                                            <tr>
                                                <th>Time</th>
                                                <th>Action</th>
                                                <th>User</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.auditLog.map(log => (
                                                <tr key={log.id}>
                                                    <td>{new Date(log.timestamp).toLocaleTimeString()}</td>
                                                    <td>{log.action}</td>
                                                    <td>{log.user.split('/')[0]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PartnerDetail = ({ partnerId }) => {
    const { navigateTo, mockPartners, currentUserRole } = useContext(AppContext);
    const partner = mockPartners.find(p => p.id === partnerId);

    const isAdmin = currentUserRole === userRoles.ADMIN;

    useEffect(() => {
        if (!partner) {
            alert(`Partner ${partnerId} not found.`);
            navigateTo('PARTNERS_LIST');
        }
    }, [partner, partnerId, navigateTo]);

    if (!partner) return null;

    if (!isAdmin) { // RBAC
        return <div className="full-screen-view"><p>Access Denied: Only Admins can view partner details.</p><Button onClick={() => navigateTo('DASHBOARD')}>Back to Dashboard</Button></div>;
    }

    return (
        <div className="full-screen-view">
            <div>
                <div className="detail-page-header">
                    <h1>Partner: {partner.name} <StatusBadge status={partner.status === 'Active' ? orderStatuses.ACCEPTED : orderStatuses.CREATED} /></h1>
                    <div className="detail-page-actions">
                        <Button onClick={() => navigateTo('EDIT_PARTNER_FORM', partner.id)} variant="primary" icon={EditIcon}>Edit Partner</Button>
                        <Button onClick={() => navigateTo('PARTNERS_LIST')} variant="secondary">Back to Partners</Button>
                    </div>
                </div>

                <div className="detail-card-grid">
                    <div className="detail-main-info">
                        <div className="detail-section-card">
                            <h3>Partner Information</h3>
                            <div className="detail-item"><span className="detail-item-label">ID:</span> <span className="detail-item-value">{partner.id}</span></div>
                            <div className="detail-item"><span className="detail-item-label">Email:</span> <span className="detail-item-value">{partner.email}</span></div>
                            <div className="detail-item"><span className="detail-item-label">Phone:</span> <span className="detail-item-value">{partner.phone}</span></div>
                            <div className="detail-item"><span className="detail-item-label">Rating:</span> <span className="detail-item-value">{partner.rating.toFixed(1)}/5</span></div>
                            <div className="detail-item"><span className="detail-item-label">Status:</span> <span className="detail-item-value">{partner.status}</span></div>
                        </div>

                        {/* Related records: Orders handled by this partner */}
                        <div className="detail-section-card">
                            <h3>Orders Handled</h3>
                            <div className="card-grid" style={{ gridTemplateColumns: '1fr 1fr' }}> {/* Smaller grid for related cards */}
                                {enrichedOrders.filter(o => o.serviceProviderId === partner.id).slice(0, 4).map(order => (
                                    <Card
                                        key={order.id}
                                        onClick={() => navigateTo('ORDER_DETAIL', order.id)}
                                        status={order.status}
                                        headerContent={<h4>Order #{order.id}</h4>}
                                        footerContent={<span>Status: {order.status}</span>}
                                    >
                                        <p><strong>Customer:</strong> {order.customerName}</p>
                                        <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                                    </Card>
                                ))}
                                {enrichedOrders.filter(o => o.serviceProviderId === partner.id).length === 0 && (
                                    <p className="text-center" style={{ gridColumn: '1 / -1' }}>No orders assigned to this partner yet.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="detail-sidebar">
                        <div className="detail-section-card">
                            <h3>Compliance Documents (Dummy)</h3>
                            <ul>
                                <li className="mb-sm"><a href="#" onClick={() => showToast('Previewing Partner Agreement...', 'info')}>Partner Agreement.pdf</a></li>
                                <li className="mb-sm"><a href="#" onClick={() => showToast('Previewing Business License...', 'info')}>Business License.pdf</a></li>
                                <li className="mb-sm"><a href="#" onClick={() => showToast('No data for Insurace Policy yet.', 'warning')}>Insurance Policy.pdf</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main Application Structure ---
const Header = () => {
    const { currentUserRole, setCurrentUserRole, isDarkMode, setIsDarkMode, navigateTo, notifications } = useContext(AppContext);

    const handleRoleChange = (e) => {
        setCurrentUserRole(e.target.value);
        navigateTo('DASHBOARD'); // Reset view to dashboard on role change
    };

    const unreadNotifications = notifications.length;

    return (
        <header className="header">
            <div className="header-logo">
                <LaundryIcon />
                IronEclipse
            </div>
            <div className="header-search">
                <SearchIcon />
                <input type="text" placeholder="Search orders, partners, customers..." />
            </div>
            <div className="header-actions">
                <Button onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? <SunIcon /> : <MoonIcon />}
                </Button>
                <div style={{ position: 'relative' }}>
                    <Button onClick={() => navigateTo('NOTIFICATIONS')}>
                        <BellIcon />
                    </Button>
                    {unreadNotifications > 0 && (
                        <span style={{
                            position: 'absolute', top: '-5px', right: '-5px',
                            backgroundColor: 'var(--status-red)', color: 'white',
                            borderRadius: '50%', width: '20px', height: '20px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.75em', fontWeight: 'bold'
                        }}>{unreadNotifications}</span>
                    )}
                </div>
                <div className="user-avatar">AD</div> {/* Dummy avatar */}
                <select value={currentUserRole} onChange={handleRoleChange} style={{ marginLeft: 'var(--spacing-md)' }}>
                    {Object.values(userRoles).map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>
        </header>
    );
};

const Sidebar = () => {
    const { currentUserRole, currentView, navigateTo } = useContext(AppContext);

    const navItems = {
        [userRoles.ADMIN]: [
            { name: 'Dashboard', view: 'DASHBOARD', icon: HomeIcon },
            { name: 'All Orders', view: 'ORDERS_LIST', icon: OrdersIcon },
            { name: 'Partners', view: 'PARTNERS_LIST', icon: UsersIcon },
            { name: 'Rate Setup', view: 'RATE_SETUP_FORM', icon: DollarSignIcon },
            { name: 'Settings', view: 'SETTINGS', icon: SettingsIcon, disabled: true }, // Disabled for demo
        ],
        [userRoles.CUSTOMER]: [
            { name: 'My Dashboard', view: 'DASHBOARD', icon: HomeIcon },
            { name: 'My Orders', view: 'ORDERS_LIST', icon: OrdersIcon },
            { name: 'Place Order', view: 'CREATE_ORDER_FORM', icon: PlusIcon },
            { name: 'Settings', view: 'SETTINGS', icon: SettingsIcon, disabled: true },
        ],
        [userRoles.SERVICE_PROVIDER]: [
            { name: 'My Dashboard', view: 'DASHBOARD', icon: HomeIcon },
            { name: 'My Orders Queue', view: 'ORDERS_LIST', icon: OrdersIcon },
            { name: 'Settings', view: 'SETTINGS', icon: SettingsIcon, disabled: true },
        ],
    };

    const items = navItems[currentUserRole] || [];

    return (
        <aside className="sidebar">
            <h3 className="mb-md">Main Menu</h3>
            <nav className="sidebar-nav">
                {items.map(item => (
                    <Button
                        key={item.view}
                        onClick={() => !item.disabled && navigateTo(item.view)}
                        className={`sidebar-nav-item ${currentView === item.view ? 'active' : ''}`}
                        disabled={item.disabled}
                    >
                        {item.icon && <item.icon />}
                        <span>{item.name}</span>
                    </Button>
                ))}
            </nav>
        </aside>
    );
};

const NotificationsTray = () => {
    const { notifications } = useContext(AppContext);
    return (
        <div className="toast-container">
            {notifications.map((n) => (
                <ToastNotification key={n.id} notification={n} />
            ))}
        </div>
    );
};

function App() {
    const { currentUserRole, currentView, selectedRecordId, isLoggedIn, navigateTo } = useContext(AppContext);

    if (!isLoggedIn) {
        // Simple Login Page Placeholder
        return (
            <div className="full-screen-view" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className="form-container" style={{ maxWidth: '400px', textAlign: 'center' }}>
                    <h2>Welcome to IronEclipse</h2>
                    <p className="mb-lg">Please login to continue.</p>
                    <Button variant="primary" onClick={() => navigateTo('DASHBOARD')}>Login as Customer (Demo)</Button>
                    <Button variant="secondary" onClick={() => navigateTo('DASHBOARD')} style={{ marginLeft: 'var(--spacing-md)' }}>Login as Admin (Demo)</Button>
                </div>
            </div>
        );
    }

    const renderMainContent = () => {
        switch (currentView) {
            case 'DASHBOARD':
                if (currentUserRole === userRoles.ADMIN) return <AdminDashboard />;
                if (currentUserRole === userRoles.CUSTOMER) return <CustomerDashboard />;
                if (currentUserRole === userRoles.SERVICE_PROVIDER) return <ServiceProviderDashboard />;
                return <div className="main-content"><p>Select a role to view dashboard.</p></div>;

            case 'ORDERS_LIST':
                return <OrdersList />;
            case 'PARTNERS_LIST':
                return <PartnersList />;

            case 'ORDER_DETAIL':
                return <OrderDetail orderId={selectedRecordId} />;
            case 'PARTNER_DETAIL':
                return <PartnerDetail partnerId={selectedRecordId} />;

            case 'CREATE_ORDER_FORM':
                return <OrderForm />;
            case 'CREATE_PARTNER_FORM':
                return <PartnerSetupForm partnerId={null} />;
            case 'EDIT_PARTNER_FORM':
                return <PartnerSetupForm partnerId={selectedRecordId} />;
            case 'RATE_SETUP_FORM':
                return <RateSetupForm />;
            case 'EDIT_ORDER_FORM': // Using for SP Order update
                return <OrderUpdateForm orderId={selectedRecordId} />;

            case 'SETTINGS':
                return (
                    <div className="full-screen-view">
                         <div className="form-container" style={{textAlign: 'center'}}>
                            <h2>Settings</h2>
                            <p>Coming Soon! This section is under development.</p>
                            <Button onClick={() => navigateTo('DASHBOARD')} variant="secondary">Back to Dashboard</Button>
                        </div>
                    </div>
                );
            case 'NOTIFICATIONS':
                return (
                    <div className="full-screen-view">
                         <div className="form-container" style={{maxWidth: '600px'}}>
                            <div className="detail-page-header">
                                <h1><BellIcon /> Notifications</h1>
                                <Button onClick={() => navigateTo('DASHBOARD')} variant="secondary">Back to Dashboard</Button>
                            </div>
                            {notifications.length > 0 ? (
                                notifications.map(n => <div key={n.id} className={`toast ${n.type}`} style={{position: 'static', animation: 'none', marginBottom: 'var(--spacing-sm)'}}><div className="toast-icon">{n.type === 'success' ? <CheckIcon /> : n.type === 'info' ? <InfoIcon /> : <AlertCircleIcon />}</div> {n.message}</div>)
                            ) : (
                                <p className="text-center">No recent notifications.</p>
                            )}
                        </div>
                    </div>
                );
            default:
                return <div className="main-content"><p>Page not found or role not assigned for this view.</p></div>;
        }
    };

    return (
        <div className="app-container">
            <Header />
            <div className="main-layout">
                <Sidebar />
                {renderMainContent()}
            </div>
            <NotificationsTray />
        </div>
    );
}

export default function AppWrapper() {
    return (
        <AppProvider>
            <App />
        </AppProvider>
    );
}