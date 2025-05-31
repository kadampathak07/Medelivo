import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const stores = [
    { id: 1, name: "MedPlus - Downtown", lat: 28.7041, lon: 77.1025, city: "Delhi" },
    { id: 2, name: "Apollo Pharmacy", lat: 28.5355, lon: 77.3910, city: "Noida" },
    { id: 3, name: "Guardian Pharmacy", lat: 28.4595, lon: 77.0266, city: "Gurgaon" },
    { id: 4, name: "MedLife", lat: 19.0760, lon: 72.8777, city: "Mumbai" },
];

const StoreSelect = ({ user, onStoreSelect }) => {
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        if (user) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        let minDistance = Infinity;
                        let closestStore = null;

                        stores.forEach((store) => {
                            const distance = getDistance(latitude, longitude, store.lat, store.lon);
                            if (distance < minDistance) {
                                minDistance = distance;
                                closestStore = store;
                            }
                        });

                        setSelectedStore(closestStore);
                        onStoreSelect(closestStore);
                    },
                    (error) => console.error("Error getting location:", error),
                    { enableHighAccuracy: true }
                );
            }
        }
    }, [user, onStoreSelect]);

    const handleStoreChange = (event) => {
        const store = stores.find((s) => s.id === parseInt(event.target.value));
        setSelectedStore(store);
        onStoreSelect(store);
    };

    return (
        <div className="flex items-center text-gray-700">
            <FaMapMarkerAlt size={20} className="mr-2 text-blue-600" />
            <select
                value={selectedStore ? selectedStore.id : ""}
                onChange={handleStoreChange}
                className="border rounded-md px-2 py-1 bg-white"
            >
                <option value="">Select Store</option>
                {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                        {store.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StoreSelect;
