import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, X, MessageSquare, ShieldAlert, HeartPulse, HardHat, Bell } from 'lucide-react';
import API from '../api/api';
import { useLocation } from 'react-router-dom';

const AI_PROTOCOLS = {
    Ambulance: {
        name: "Medical Emergency Protocol",
        icon: <HeartPulse className="text-red-500" />,
        guidance: [
            "Keep the patient steady and do not move them unless there is immediate danger.",
            "Check for breathing and pulse. If absent, begin CPR if trained.",
            "Apply pressure to any site of active bleeding with a clean cloth.",
            "Stay on the line with the Command Center until the unit arrives."
        ]
    },
    Police: {
        name: "Security Threat Protocol",
        icon: <ShieldAlert className="text-blue-500" />,
        guidance: [
            "Find a secure, lockable location and stay out of sight.",
            "Keep all mobile devices on silent mode.",
            "Do not attempt to confront the threat yourself.",
            "Wait for the 'ALL CLEAR' signal from authorized Operatives."
        ]
    },
    Fire: {
        name: "Fire Suppression Protocol",
        icon: <HardHat className="text-orange-500" />,
        guidance: [
            "Evacuate the building immediately via the nearest fire exit.",
            "Stay low to the ground to avoid inhaling toxic smoke.",
            "Do not use elevators; use only the stairwells.",
            "Once outside, stay at the designated assembly point."
        ]
    },
    General: {
        name: "Standard Safety Protocol",
        icon: <Bot className="text-gray-500" />,
        guidance: [
            "Stay calm and remain at your current coordinates if safe.",
            "Ensure your mobile device remains charged.",
            "Prepare to describe the situation in detail to the arriving unit.",
            "The Bharat Command Network has been notified of your status."
        ]
    }
};

export default function TacticalAIChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [lastIncident, setLastIncident] = useState(null);
    const [hasNotifiedInitiated, setHasNotifiedInitiated] = useState(false);
    const [hasNotifiedResolved, setHasNotifiedResolved] = useState(false);
    const scrollRef = useRef(null);
    const location = useLocation();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Fetch latest incident and monitor status
    useEffect(() => {
        if (!token) return; // Only fetch incidents if token exists, but bot remains visible

        const checkStatus = async () => {
            try {
                const res = await API.get("/emergency/my");
                if (res.data && res.data.length > 0) {
                    const latest = res.data[0]; // Assuming sorted by date
                    setLastIncident(latest);

                    // Notification: Incident Initiated
                    if (!hasNotifiedInitiated && (latest.status === "Pending" || latest.status === "Accepted")) {
                        addSystemAlert(`INTEL_UPDATE: Your emergency report [UID_${latest._id.slice(-6).toUpperCase()}] has been successfully transmitted to the National Command Center. Awaiting verification.`);
                        setHasNotifiedInitiated(true);
                    }

                    // Notification: Incident Resolved
                    if (latest.status === "Resolved" && !hasNotifiedResolved) {
                        addSystemAlert(`MISSION_COMPLETE: Commanding Officer has officially neutralized and CONCLUDED your report [UID_${latest._id.slice(-6).toUpperCase()}]. The situation is archived.`);
                        setHasNotifiedResolved(true);
                    }
                }
            } catch (err) {
                console.error("Bot Status Check Failed", err);
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, [token, role, hasNotifiedInitiated, hasNotifiedResolved]);

    const addSystemAlert = (text) => {
        setMessages(prev => [...prev, {
            id: Date.now(),
            type: 'bot',
            isAlert: true,
            text: text
        }]);
        // Auto-open bot if it's a critical update
        if (!isOpen) setIsOpen(true);
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const eType = lastIncident?.emergencyType || 'General';
            const protocol = AI_PROTOCOLS[eType] || AI_PROTOCOLS.General;
            setMessages([
                {
                    id: 1,
                    type: 'bot',
                    text: `Tactical Assistant Online. Accessing ${eType} guidance protocols for Operative ${localStorage.getItem("name") || 'Unidentified'}...`,
                    protocol: protocol
                }
            ]);
        }
    }, [isOpen, lastIncident]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulated AI Intelligence
        setTimeout(() => {
            let botResponse = "Acknowledged. Updating Command Center with your Intel. Please follow the safety protocols listed above.";

            const lower = input.toLowerCase();
            if (lower.includes("help") || lower.includes("do")) {
                botResponse = "Focus on the primary safety protocols. The response unit is currently in transit to your coordinates.";
            } else if (lower.includes("scared") || lower.includes("afraid")) {
                botResponse = "Maintain tactical composure. The Bharat Digital Network is monitoring your telemetry. You are not alone.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className={`chatbot-system ${isOpen ? 'open' : ''}`}>
            {/* Toggle Button */}
            {!isOpen && (
                <button className="bot-toggle pulse" onClick={() => setIsOpen(true)}>
                    <Bot size={28} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bot-window card">
                    <div className="bot-header">
                        <div className="header-info">
                            <Bot size={20} className="text-red-500" />
                            <div>
                                <h4 className="tech-mono">BHARAT_AI_V1.0</h4>
                                <p className="status-online">UNIT_ACTIVE</p>
                            </div>
                        </div>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="bot-messages" ref={scrollRef}>
                        {messages.map((m) => (
                            <div key={m.id} className={`msg-wrapper ${m.type} ${m.isAlert ? 'system-alert' : ''}`}>
                                <div className={`msg-content ${m.type} ${m.isAlert ? 'alert' : ''}`}>
                                    {m.isAlert && <Bell size={14} style={{ marginBottom: '8px', color: 'var(--red)' }} />}
                                    {m.text}
                                    {m.protocol && (
                                        <div className="protocol-box">
                                            <div className="protocol-title">
                                                {m.protocol.icon}
                                                <span>{m.protocol.name}</span>
                                            </div>
                                            <ul className="protocol-list">
                                                {m.protocol.guidance.map((g, i) => (
                                                    <li key={i}>{g}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="msg-wrapper bot">
                                <div className="msg-content bot typing">
                                    Analyzing situational telemetry...
                                </div>
                            </div>
                        )}
                    </div>

                    <form className="bot-input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            className="bot-input"
                            placeholder="Request instructions..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="bot-send">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
