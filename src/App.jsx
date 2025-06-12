import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Main App Component
const App = () => {
    // State for mock performance data (would be fetched from backend)
    const [aerodynamicPerformanceData, setAerodynamicPerformanceData] = useState([]);
    // State for mock flagged components (would be fetched from backend)
    const [flaggedComponents, setFlaggedComponents] = useState([]);
    // State for mock telemetry data (placeholder for future integration)
    const [telemetryData, setTelemetryData] = useState([]);

    const [isLoadingAerodynamics, setIsLoadingAerodynamics] = useState(true);
    const [isLoadingTelemetry, setIsLoadingTelemetry] = useState(true); // New loading state for telemetry

    // Simulate fetching aerodynamic data
    useEffect(() => {
        setIsLoadingAerodynamics(true);
        // In a real application, you would make an API call here:
        // fetch('/api/aerodynamic_data')
        //     .then(response => response.json())
        //     .then(data => {
        //         setAerodynamicPerformanceData(data.performance);
        //         setFlaggedComponents(data.flagged);
        //         setIsLoadingAerodynamics(false);
        //     })
        //     .catch(error => {
        //         console.error("Error fetching aerodynamic data:", error);
        //         setIsLoadingAerodynamics(false);
        //     });

        // For now, use mock aerodynamic data
        const mockAerodynamicPerformance = [
            { name: 'Race 1', downforce: 1500, drag: 500 },
            { name: 'Race 2', downforce: 1480, drag: 510 },
            { name: 'Race 3', downforce: 1450, drag: 525 },
            { name: 'Race 4', downforce: 1420, drag: 540 },
            { name: 'Race 5', downforce: 1390, drag: 560 }, // Degradation visible here
            { name: 'Race 6', downforce: 1370, drag: 570 },
            { name: 'Race 7', downforce: 1350, drag: 580 },
        ];

        const mockFlagged = [
            { id: 'Front Wing R1', status: 'Degrading', loss: '2.5% Downforce', recommendation: 'Inspect mounting points' },
            { id: 'Rear Diffuser C3', status: 'Potential Wear', loss: '1.0% Efficiency', recommendation: 'Monitor closely' },
        ];

        // Simulate network delay for aerodynamic data
        setTimeout(() => {
            setAerodynamicPerformanceData(mockAerodynamicPerformance);
            setFlaggedComponents(mockFlagged);
            setIsLoadingAerodynamics(false);
        }, 1500);
    }, []);

    // Simulate fetching telemetry data (placeholder)
    useEffect(() => {
        setIsLoadingTelemetry(true);
        // In a real application, this would fetch actual telemetry data
        // For now, a mock message
        const mockTelemetry = [
            { id: 1, event: 'Brake Fade Detected', timestamp: '2025-06-12 10:01:00', details: 'Front left brake temperature exceeded threshold for 5s.' },
            { id: 2, event: 'Engine Knock Anomaly', timestamp: '2025-06-12 10:05:30', details: 'Minor engine knock detected, monitoring advised.' },
        ];

        // Simulate network delay for telemetry data
        setTimeout(() => {
            setTelemetryData(mockTelemetry);
            setIsLoadingTelemetry(false);
        }, 1000);
    }, []);


    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 font-inter">
            {/* Page Header */}
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-teal-400">F1 Performance Dashboard</h1>
                <p className="text-lg text-gray-400 mt-2">Integrating Aerodynamics and Telemetry for Optimal Race Strategy</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Aerodynamic Performance Section */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                        </svg>
                        Aerodynamic Performance Monitoring
                    </h2>
                    {isLoadingAerodynamics ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
                            <p className="ml-4 text-xl text-teal-400">Loading aerodynamic data...</p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-xl font-medium mb-3 text-white">Performance Trends (Downforce & Drag)</h3>
                            {/* Re-introducing the Recharts component */}
                            <div className="h-80 w-full mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={aerodynamicPerformanceData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                                        <XAxis dataKey="name" stroke="#cbd5e0" />
                                        <YAxis stroke="#cbd5e0" label={{ value: 'Value', angle: -90, position: 'insideLeft', fill: '#cbd5e0' }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '8px' }}
                                            labelStyle={{ color: '#edf2f7' }}
                                            itemStyle={{ color: '#a0aec0' }}
                                        />
                                        <Line type="monotone" dataKey="downforce" stroke="#8884d8" name="Downforce (N)" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="drag" stroke="#82ca9d" name="Drag (N)" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <h3 className="text-xl font-medium mb-3 text-white">Flagged Components</h3>
                            {flaggedComponents.length > 0 ? (
                                <ul className="space-y-3">
                                    {flaggedComponents.map((component, index) => (
                                        <li key={index} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                                            <div>
                                                <p className="text-lg font-medium text-red-400">{component.id}</p>
                                                <p className="text-sm text-gray-300">Status: <span className="font-semibold">{component.status}</span></p>
                                                <p className="text-sm text-gray-300">Loss: <span className="font-semibold">{component.loss}</span></p>
                                                <p className="text-sm text-gray-400 mt-1">Recommendation: {component.recommendation}</p>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.487 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400">No components currently flagged for attention.</p>
                            )}
                        </>
                    )}
                </div>

                {/* Telemetry Analysis Section */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                            <path d="M21 19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-3h18v3z"></path>
                            <line x1="12" y1="12" x2="12" y2="21"></line>
                        </svg>
                        F1 Telemetry Analysis Platform
                    </h2>
                    {isLoadingTelemetry ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-500"></div>
                            <p className="ml-4 text-xl text-lime-400">Loading telemetry data...</p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-xl font-medium mb-3 text-white">Recent Anomaly Detections</h3>
                            {telemetryData.length > 0 ? (
                                <ul className="space-y-3">
                                    {telemetryData.map((event, index) => (
                                        <li key={index} className="bg-gray-700 p-4 rounded-lg">
                                            <p className="text-lg font-medium text-yellow-400">{event.event}</p>
                                            <p className="text-sm text-gray-300">Timestamp: {event.timestamp}</p>
                                            <p className="text-sm text-gray-400 mt-1">Details: {event.details}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400">No recent telemetry anomalies detected.</p>
                            )}

                            {/* Placeholder for additional telemetry insights */}
                            <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
                                <h3 className="text-xl font-medium mb-3 text-white">Telemetry Insights & Predictions</h3>
                                <p className="text-gray-400">
                                    This section will display advanced insights from LSTM models for time-series analysis,
                                    including predictive maintenance and component wear analysis.
                                    Interactive time-series plots and detailed anomaly detection results will be presented here.
                                </p>
                                <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                                    View Full Telemetry Report
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* High Performance Car Visual Indicator */}
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center justify-center text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-white">High Performance Car Overview</h2>
                    {/* SVG for a simple, stylized car */}
                    <svg className="h-48 w-48 text-red-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 2H14L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9L10 2Z" fill="rgba(239, 68, 68, 0.2)" stroke="currentColor"/>
                        <circle cx="6" cy="17" r="2" fill="currentColor"/>
                        <circle cx="18" cy="17" r="2" fill="currentColor"/>
                        <line x1="6" y1="15" x2="6" y2="17" stroke="currentColor" strokeWidth="1.5"/>
                        <line x1="18" y1="15" x2="18" y2="17" stroke="currentColor" strokeWidth="1.5"/>
                        <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M7 9C7 9 8 7 12 7C16 7 17 9 17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p className="text-gray-400 text-lg">
                        This dashboard provides critical insights for maintaining peak performance of your high-performance vehicle.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Utilizing advanced models for aerodynamic prediction and component wear.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default App;