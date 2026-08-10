import React, { useState } from "react";
import { User, Mail, Smartphone, BookOpen, MapPin, ArrowRight, ChevronDown } from "lucide-react";

const IMG_URL =
    "https://res.cloudinary.com/djdhtkjhn/image/upload/v1785322878/Rform_new_image_d8vtfw.png";

function NeuField({ icon: Icon, placeholder, type = "text", isSelect = false, children }) {
    const baseStyle = {
        background: "#EEECE7",
        boxShadow:
            "inset 3px 3px 6px rgba(163,159,150,0.45), inset -3px -3px 6px rgba(255,255,255,0.85)",
    };

    if (isSelect) {
        return (
            <div
                className="relative w-full rounded-2xl flex items-center gap-4 px-5 py-4"
                style={baseStyle}
            >
                <Icon className="w-5 h-5 text-neutral-500 shrink-0" strokeWidth={1.6} />
                <select
                    defaultValue=""
                    className="w-full bg-transparent outline-none text-[15px] text-neutral-400 appearance-none cursor-pointer"
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {children}
                </select>
                <ChevronDown className="w-5 h-5 text-neutral-600 shrink-0 pointer-events-none" strokeWidth={1.8} />
            </div>
        );
    }

    return (
        <div
            className="w-full rounded-2xl flex items-center gap-4 px-5 py-4"
            style={baseStyle}
        >
            <Icon className="w-5 h-5 text-neutral-500 shrink-0" strokeWidth={1.6} />
            <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-transparent outline-none text-[15px] text-neutral-500 placeholder:text-neutral-400"
            />
        </div>
    );
}

export default function RegistrationForm() {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="min-h-full w-full flex items-center justify-center bg-[#EDEBE6] p-6">
            <div
                className="w-full max-w-5xl rounded-[28px] overflow-hidden flex flex-col md:flex-row"
                style={{
                    background: "#F1EFEA",
                    boxShadow:
                        "20px 20px 45px rgba(163,159,150,0.5), -20px -20px 45px rgba(255,255,255,0.9)",
                }}
            >
                {/* Left image panel */}
                <div className="md:w-1/2 w-full relative bg-[#F1EFEA] flex items-center justify-center p-4 md:p-6">
                    <img
                        src={IMG_URL}
                        alt="Connecting Dots ERP"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>

                {/* Right form panel */}
                <div className="md:w-1/2 w-full flex items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md flex flex-col gap-5">
                        <NeuField icon={User} placeholder="Full Name" />
                        <NeuField icon={Mail} placeholder="E-mail Address" type="email" />
                        <NeuField icon={Smartphone} placeholder="Mobile Number" type="tel" />
                        <NeuField icon={BookOpen} placeholder="Select a Course" isSelect>
                            <option value="data-science">Data Science</option>
                            <option value="full-stack">Full Stack Development</option>
                            <option value="digital-marketing">Digital Marketing</option>
                            <option value="sap">SAP</option>
                        </NeuField>
                        <NeuField icon={MapPin} placeholder="Add Your Location" />

                        {/* Checkbox */}
                        <label className="flex items-start gap-3 mt-1 cursor-pointer select-none">
                            <span
                                onClick={() => setAgreed(!agreed)}
                                className="mt-0.5 w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-colors"
                                style={{
                                    background: "#EEECE7",
                                    boxShadow: agreed
                                        ? "inset 2px 2px 4px rgba(163,159,150,0.5), inset -2px -2px 4px rgba(255,255,255,0.85)"
                                        : "inset 2px 2px 4px rgba(163,159,150,0.45), inset -2px -2px 4px rgba(255,255,255,0.85)",
                                }}
                            >
                                {agreed && (
                                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-blue-700" fill="none">
                                        <path
                                            d="M3 8.5L6.2 11.5L13 4.5"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </span>
                            <span className="text-[15px] text-neutral-600 leading-snug">
                                I agree to the{" "}
                                <a href="#" className="text-blue-600 hover:underline">
                                    terms and conditions
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-blue-600 hover:underline">
                                    privacy policy
                                </a>{" "}
                                of Connecting Dots ERP.
                            </span>
                        </label>

                        {/* Submit button */}
                        <button
                            type="button"
                            className="w-full rounded-2xl py-4 px-6 flex items-center justify-center gap-3 mt-1 font-semibold text-white text-[17px] transition-transform active:scale-[0.98]"
                            style={{
                                background: "linear-gradient(180deg, #3b6fe0 0%, #1a3fae 100%)",
                                boxShadow:
                                    "0 8px 18px rgba(26,63,174,0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
                            }}
                        >
                            Register Now
                            <span
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{
                                    background: "rgba(255,255,255,0.15)",
                                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4)",
                                }}
                            >
                                <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.2} />
                            </span>
                        </button>

                        <p className="text-center text-[15px] text-neutral-600">
                            Already have an account?{" "}
                            <a href="#" className="text-blue-600 font-medium hover:underline">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}