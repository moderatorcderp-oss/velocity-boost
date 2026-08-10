"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { User, Mail, Phone, MapPin, X, CheckCircle, ChevronDown, ChevronLeft } from "lucide-react";
import { countryCodes } from "@/utils/countryCodes";

const courseOptions = {
  "SAP Functional": [
    "SAP FICO", "SAP Ariba", "SAP MM", "SAP SD", "SAP HR/HCM",
    "SAP PP", "SAP QM", "SAP PM", "SAP PS", "SAP EWM",
    "SAP SCM", "SAP SUCCESSFACTOR", "SAP BTP", "SAP EHS",
    "SAP GRC", "SAP IBP"
  ],
  "SAP Technical": [
    "SAP ABAP", "SAP S/4 HANA", "SAP BW/BI", "SAP BASIS"
  ],
  "Data Visualization": [
    "Tableau", "Power BI", "SQL"
  ],
  "HR Courses": [
    "HR Training", "Core HR", "HR Payroll",
    "HR Management", "HR Generalist", "HR Analytics"
  ],
  "IT Courses": [
    "MASTERS IN DATA ANALYTICS", "MASTERS IN DATA SCIENCE",
    "MASTERS IN BUSINESS ANALYTICS", "Generative AI",
    "Full Stack Training", "JAVA",
    "Python", "Salesforce", "Software Development",
    "AWS", "Azure", "DevOps", "AIML"
  ]
};

// Shared input styling so every field stays visually consistent
const inputBase =
  "w-full rounded-xl border-[1.5px] bg-indigo-50/70 py-2.5 pl-9 pr-3 text-sm text-indigo-950 placeholder-indigo-300 outline-none transition focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-200";
const inputOk = "border-indigo-100";
const inputErr = "border-red-400 bg-red-50 focus:ring-red-100 focus:border-red-500";

const DownloadSyllabusForm = ({ onClose, course }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    location: "",
    countryCode: "+91",
    course: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const locationInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const courseDropdownRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // Load location data
  useEffect(() => {
    let isMounted = true;

    const loadLocationData = async () => {
      try {
        setIsLoadingCities(true);
        const citiesModule = await import("@/data/india-cities.json");
        const cities = citiesModule.default || citiesModule;

        const indianCities = cities.filter(city =>
          city.country === 'IN' || city.country === 'India'
        );

        const majorInternationalCities = cities.filter(city =>
          ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'SG', 'AE', 'JP'].includes(city.country) &&
          city.population > 500000
        );

        const allLocations = [
          ...indianCities.map(city =>
            city.subcountry ? `${city.name}, ${city.subcountry}` : city.name
          ),
          ...majorInternationalCities.map(city =>
            `${city.name}, ${city.country}`
          ),
          'Remote',
          'Work from Home',
          'Multiple Locations',
          'Willing to Relocate'
        ];

        const uniqueLocations = [...new Set(allLocations)]
          .filter(location => location && location.trim())
          .sort((a, b) => {
            const aIsIndian = !a.includes(',') || a.includes('India');
            const bIsIndian = !b.includes(',') || b.includes('India');

            if (aIsIndian && !bIsIndian) return -1;
            if (!aIsIndian && bIsIndian) return 1;

            return a.localeCompare(b);
          });

        if (isMounted) {
          setLocationSuggestions(uniqueLocations);
        }

      } catch (error) {
        console.error('Error loading cities data:', error);
        if (isMounted) {
          setLocationSuggestions([
            'Mumbai, Maharashtra', 'Delhi', 'Bangalore, Karnataka',
            'Hyderabad, Telangana', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal',
            'Pune, Maharashtra', 'Ahmedabad, Gujarat', 'Jaipur, Rajasthan',
            'Remote', 'Work from Home'
          ]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingCities(false);
        }
      }
    };

    loadLocationData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle location input changes
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, location: value }));

    if (value.length > 0) {
      const filtered = locationSuggestions.filter(suggestion => {
        const suggestionLower = suggestion.toLowerCase();
        const valueLower = value.toLowerCase();

        return suggestionLower.includes(valueLower) ||
          suggestionLower.split(',')[0].trim().startsWith(valueLower);
      });

      filtered.sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const valueLower = value.toLowerCase();

        const aExact = aLower === valueLower;
        const bExact = bLower === valueLower;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;

        const aStarts = aLower.startsWith(valueLower);
        const bStarts = bLower.startsWith(valueLower);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return a.localeCompare(b);
      });

      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestion(-1);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }

    if (errors.location) {
      setErrors(prev => ({ ...prev, location: undefined }));
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({ ...prev, location: suggestion }));
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    setActiveSuggestion(-1);
  };

  // Handle keyboard navigation
  const handleLocationKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(filteredSuggestions[activeSuggestion]);
        }
        break;
      case 'Escape':
      case 'Tab':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }

      // Close course dropdown
      if (
        courseDropdownRef.current &&
        !courseDropdownRef.current.contains(event.target)
      ) {
        setShowCourseDropdown(false);
        setSelectedCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Form validation
  const validate = () => {
    const newErrors = {};
    const { name, email, contact, countryCode, location } = formData;

    if (!name?.trim()) {
      newErrors.name = "Name is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const selectedCountry = countryCodes.find((c) => c.code === countryCode);
    if (selectedCountry) {
      const { minLength, maxLength } = selectedCountry;
      const contactDigits = contact.replace(/\D/g, "");

      if (!contactDigits || contactDigits.length < minLength || contactDigits.length > maxLength) {
        newErrors.contact = `Please enter a valid ${minLength === maxLength ? minLength : `${minLength}-${maxLength}`
          }-digit number for ${selectedCountry.country}`;
      }
    } else {
      if (!contact || !/^\d{7,15}$/.test(contact.replace(/\D/g, ""))) {
        newErrors.contact = "Please enter a valid phone number";
      }
    }

    if (!location?.trim()) {
      newErrors.location = "Location is required";
    } else if (location.length > 100) {
      newErrors.location = "Location seems too long";
    }

    if (!formData.course) {
      newErrors.course = "Please select a course";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === "contact" ? value.replace(/\D/g, "") : value;

    setFormData(prev => ({ ...prev, [name]: processedValue }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      ...formData,
      coursename: formData.course,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        console.error("API URL environment variable is not set.");
        alert("Configuration error. Cannot submit form.");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(`${apiUrl}/api/submit`, payload);
      console.log("Form submitted successfully:", response.data);

      setShowThankYou(true);
      setFormData({
        name: "",
        email: "",
        contact: "",
        location: "",
        countryCode: "+91",
        course: "",
      });
      setErrors({});

      setTimeout(() => {
        setShowThankYou(false);
        if (onClose) onClose();
      }, 3000);

    } catch (error) {
      setIsSubmitting(false);
      console.error("Form submission error:", error);

      let errorMessage = "An error occurred while submitting. Please try again.";
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          errorMessage = error.response?.data?.message || "Submission failed. Please check your input values.";
        } else if (error.request) {
          errorMessage = "Cannot reach the server. Please check your internet connection.";
        }
      }
      alert(errorMessage);
    }
  };

  const selectedCountry = countryCodes.find(
    (country) => country.code === formData.countryCode
  );
  const placeholderText = selectedCountry
    ? `Enter ${selectedCountry.minLength === selectedCountry.maxLength
      ? selectedCountry.minLength
      : `${selectedCountry.minLength}-${selectedCountry.maxLength}`
    } digit number`
    : "Enter phone number";

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white/10 p-5 backdrop-blur-sm">
      <div className="relative z-[10001] flex max-h-[92vh] w-full max-w-[440px] flex-col overflow-y-auto overflow-x-hidden rounded-3xl bg-white shadow-[0_25px_60px_-15px_rgba(76,29,149,0.45)]">

        <button
          onClick={onClose}
          aria-label="Close form"
          className="absolute right-3.5 top-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:rotate-90 hover:bg-white/35"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-indigo-700 via-violet-700 to-blue-600 px-7 pt-8 text-center">
          <div className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <img
            src="https://res.cloudinary.com/bropujss/image/upload/v1783687070/logo_rju9sa_scdui4.webp"
            alt="Connecting Dots ERP Logo"
            className="relative mx-auto mb-3.5 h-auto max-w-[150px] brightness-0 invert"
          />
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 px-6 py-6">

          {/* Name + Email */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-wide text-violet-800">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="pointer-events-none absolute left-3 text-violet-500" size={14} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  aria-required="true"
                  className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
                />
              </div>
              {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wide text-violet-800">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="pointer-events-none absolute left-3 text-violet-500" size={14} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  aria-required="true"
                  className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                />
              </div>
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact" className="text-[11px] font-semibold uppercase tracking-wide text-violet-800">
              Phone Number
            </label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-24 flex-none rounded-xl border-[1.5px] border-indigo-100 bg-indigo-50/70 px-2 py-2.5 text-[13px] text-indigo-950 outline-none transition focus:border-violet-500 focus:bg-white"
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {`${code} (${country})`}
                  </option>
                ))}
              </select>
              <div className="relative flex flex-1 items-center">
                <Phone className="pointer-events-none absolute left-3 text-violet-500" size={14} />
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder={placeholderText}
                  maxLength={selectedCountry?.maxLength || 15}
                  aria-required="true"
                  className={`${inputBase} ${errors.contact ? inputErr : inputOk}`}
                />
              </div>
            </div>
            {errors.contact && <span className="text-xs text-red-500">{errors.contact}</span>}
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="location" className="text-[11px] font-semibold uppercase tracking-wide text-violet-800">
              Location
            </label>
            <div className="relative">
              <div className="relative flex items-center">
                <MapPin className="pointer-events-none absolute left-3 text-violet-500" size={14} />
                <input
                  ref={locationInputRef}
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleLocationChange}
                  onKeyDown={handleLocationKeyDown}
                  onFocus={() => {
                    if (formData.location.length > 0 && filteredSuggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  placeholder={isLoadingCities ? "Loading..." : "Enter your city"}
                  disabled={isLoadingCities}
                  autoComplete="off"
                  aria-required="true"
                  className={`${inputBase} ${errors.location ? inputErr : inputOk} disabled:cursor-not-allowed disabled:opacity-70`}
                />
                {isLoadingCities && (
                  <span className="absolute right-3 h-3.5 w-3.5 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600" />
                )}
              </div>

              {showSuggestions && filteredSuggestions.length > 0 && !isLoadingCities && (
                <div
                  ref={suggestionsRef}
                  className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-56 overflow-y-auto rounded-xl border border-indigo-100 bg-white p-1.5 shadow-[0_12px_28px_-8px_rgba(76,29,149,0.28)]"
                >
                  {filteredSuggestions.slice(0, 6).map((suggestion, index) => {
                    const isInternational =
                      suggestion.includes(', US') ||
                      suggestion.includes(', UK') ||
                      suggestion.includes(', CA') ||
                      suggestion.includes(', AU');
                    const isSpecial = ['Remote', 'Work from Home', 'Multiple Locations', 'Willing to Relocate'].includes(suggestion);

                    return (
                      <div
                        key={`${suggestion}-${index}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        onMouseEnter={() => setActiveSuggestion(index)}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-[13.5px] text-indigo-900 transition ${
                          index === activeSuggestion ? "bg-violet-100" : "hover:bg-violet-50"
                        }`}
                      >
                        <span className="text-[13px]">{isSpecial ? '💼' : isInternational ? '🌍' : '📍'}</span>
                        <span className="flex-1">{suggestion}</span>
                      </div>
                    );
                  })}
                  {filteredSuggestions.length > 6 && (
                    <div className="px-2.5 py-2 text-center text-xs text-violet-400">
                      +{filteredSuggestions.length - 6} more...
                    </div>
                  )}
                </div>
              )}
            </div>
            {errors.location && <span className="text-xs text-red-500">{errors.location}</span>}
          </div>

          {/* Course */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-violet-800">Select Course</label>

            <div className="relative" ref={courseDropdownRef}>
              <div
                onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl border-[1.5px] bg-indigo-50/70 py-2.5 pl-3.5 pr-3 text-sm text-indigo-950 transition ${
                  errors.course ? inputErr : inputOk
                }`}
              >
                <span className={formData.course ? "" : "text-indigo-300"}>
                  {formData.course || "Select a course"}
                </span>
                <ChevronDown
                  size={15}
                  className={`text-violet-500 transition-transform ${showCourseDropdown ? "rotate-180" : ""}`}
                />
              </div>

              {showCourseDropdown && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-64 overflow-y-auto rounded-xl border border-indigo-100 bg-white p-1.5 shadow-[0_12px_28px_-8px_rgba(76,29,149,0.28)]">
                  {!selectedCategory &&
                    Object.keys(courseOptions).map((category) => (
                      <div
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className="cursor-pointer rounded-lg px-2.5 py-2 text-[13.5px] font-medium text-indigo-900 transition hover:bg-violet-50"
                      >
                        {category}
                      </div>
                    ))}

                  {selectedCategory && (
                    <>
                      <div
                        onClick={() => setSelectedCategory(null)}
                        className="flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-2 text-[13px] font-medium text-violet-600 transition hover:bg-violet-50"
                      >
                        <ChevronLeft size={14} /> Back
                      </div>

                      {courseOptions[selectedCategory].map((c) => (
                        <div
                          key={c}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, course: c }));
                            setShowCourseDropdown(false);
                            setSelectedCategory(null);
                          }}
                          className="cursor-pointer rounded-lg px-2.5 py-2 text-[13.5px] text-indigo-900 transition hover:bg-violet-50"
                        >
                          {c}
                        </div>
                      ))}

                      <div
                        onClick={() => {
                          setFormData(prev => ({ ...prev, course: "Other" }));
                          setShowCourseDropdown(false);
                          setSelectedCategory(null);
                        }}
                        className="cursor-pointer rounded-lg px-2.5 py-2 text-[13.5px] text-indigo-900 transition hover:bg-violet-50"
                      >
                        Other
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            {errors.course && <span className="text-xs text-red-500">{errors.course}</span>}
          </div>

          {/* Submit */}
          <div className="mt-1">
            <button
              type="submit"
              disabled={isSubmitting || isLoadingCities}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-700 via-violet-600 to-blue-600 bg-[length:160%_160%] bg-left py-3 text-[15px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(76,29,149,0.55)] transition hover:bg-right hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-8px_rgba(76,29,149,0.65)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-[#0f0c29]/70 backdrop-blur-sm">
          <div className="max-w-[320px] rounded-2xl bg-white px-8 py-9 text-center shadow-[0_25px_60px_-15px_rgba(76,29,149,0.5)]">
            <CheckCircle size={40} color="#28a745" className="mx-auto" />
            <h2 className="mt-3.5 mb-1.5 text-xl font-bold text-indigo-950">Thank You!</h2>
            <p className="text-sm text-indigo-400">Your message has been successfully submitted.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadSyllabusForm;