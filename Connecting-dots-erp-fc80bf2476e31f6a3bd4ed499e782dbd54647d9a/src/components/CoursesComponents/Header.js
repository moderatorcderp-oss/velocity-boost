// components/CoursesComponents/Header.js

"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { countryCodes } from '@/utils/countryCodes';
import styles from "@/styles/CoursesComponents/Header.module.css";
import Image from "next/image";
const Btnform = dynamic(() => import('@/components/HomePage/Btnform'), {
  ssr: false,
  loading: () => null
});


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
  "Digital Marketing": [
    "Advance Digital Marketing", "Pay Per Click Training",
    "Search Engine Optimization", "Social Media Marketing",
    "Advance Google Analytics Training"
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


// DSHeader now directly receives the 'data' prop (already processed with city placeholders replaced)
const DSHeader = ({ data }) => {
  const [formData, setFormData] = useState({ countryCode: "+91", contact: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [showForm, setShowForm] = useState(false);
  const [location, setLocation] = useState("");
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Clear status message after 5 seconds
  useEffect(() => {
    if (statusMessage.text) {
      const timer = setTimeout(() => {
        setStatusMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.locationContainer}`)) {
        setShowSuggestions(false);
        setShowCourseDropdown(false);
        setSelectedCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadCities = async () => {
      try {
        const citiesModule = await import("@/data/india-cities.json");
        const cities = citiesModule.default || citiesModule;
        const indianCities = cities.filter(
          (city) => city.country === "IN" || city.country === "India"
        );

        const uniqueLocations = [
          ...new Set(
            indianCities.map((c) =>
              c.subcountry ? `${c.name}, ${c.subcountry}` : c.name
            )
          ),
        ].sort();

        if (isMounted) {
          setLocationSuggestions(uniqueLocations);
        }
      } catch (error) {
        console.error("Error loading cities data:", error);
      }
    };

    loadCities();

    return () => {
      isMounted = false;
    };
  }, []);

  // If data is null or undefined, render a loading/error state
  if (!data) {
    return (
      <div className={styles.containerItDsHeader}>
        <p>Loading header data...</p> {/* Or a proper loader/error message */}
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "contact") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prevData) => ({ ...prevData, [name]: digitsOnly }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;

    setLocation(value);
    setIsLocationSelected(false);

    if (value.length > 0) {
      const filtered = locationSuggestions.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase())
      );

      const results = [...filtered.slice(0, 9)];

      // 🔥 ALWAYS add "Other"
      if (!results.includes("Other")) {
        results.push("Other");
      }

      setFilteredSuggestions(results);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };
  const handleSuggestionClick = (val) => {
    setLocation(val);
    setIsLocationSelected(true);
    setShowSuggestions(false);
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.contact) {
      setStatusMessage({
        text: "Please fill all required fields",
        type: "error",
      });
      return false;
    }

    const selectedCountry = countryCodes.find(
      (country) => country.code === formData.countryCode
    );

    if (!selectedCountry) {
      setStatusMessage({
        text: "Invalid country code",
        type: "error",
      });
      return false;
    }

    const { minLength, maxLength } = selectedCountry;

    if (
      formData.contact.length < minLength ||
      formData.contact.length > maxLength
    ) {
      setStatusMessage({
        text: `Phone number for ${selectedCountry.country} must be between ${minLength} and ${maxLength} digits`,
        type: "error",
      });
      return false;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(formData.contact)) {
      setStatusMessage({
        text: "Phone number must contain only digits",
        type: "error",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatusMessage({
        text: "Please enter a valid email address",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ text: "", type: "" });

    const isValidLocation =
      locationSuggestions.includes(location) || location === "Other";

    if (!isValidLocation || !isLocationSelected) {
      setStatusMessage({
        text: "Please select a location from dropdown only",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            location: location,
            course: formData.course,
            coursename: data.title,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Submission failed. Please try again.");
      }

      setStatusMessage({
        text: "Form submitted successfully!",
        type: "success",
      });

      setFormData({
        name: "",
        email: "",
        course: "", // You might want to pre-fill this based on 'data' prop
        countryCode: "+91",
        contact: "",
      });
    } catch (error) {
      setStatusMessage({
        text: error.message || "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className={styles.containerItDsHeader}>
      {/* Removed <Head> component here as metadata is handled by page.js */}

      {/* 🔹 Background Video */}
      {/* <video
        className={styles.backgroundVideo}
        src={data.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        fetchPriority="high"
        importance="high"
        loading="eager"
        decoding="async"
      /> */}

      <div className={styles.leftSectionItDs}>
        <h1>
          <span className={styles.dsHeaderSpan}>{data.title}</span>
        </h1>
        <h2>
          <span className={styles.dsHeaderSpan2}>{data.subtitle}</span>
        </h2>
        <p className="text-black">{data.description}</p>
        <ul className={styles.featuresItDs}>
          {data.features.map((feature, index) => (
            <li className={styles.featuresItDsli} key={index}>
              {feature}
            </li>
          ))}
        </ul>
        <div className={styles.alumniItDs}>
          <span>Find our Alumni at -</span>
          <div className={styles.alumniLogosItDs}>
            {data.alumni.map((company, index) => (
              <img
                key={index}
                src={company.logo}
                alt={`${company.name} logo`}
              />
            ))}
          </div>
        </div>
        <div className={styles.buttons}>
          {(() => {
            const isITTraining = data.buttons.some(b => b.courseName === "IT Training Program");
            if (isITTraining) {
              // IT Training Program: both buttons small and shifted up
              return (
                <div style={{ marginTop: '-12px', display: 'flex', gap: '1rem' }}>
                  {data.buttons.map((button, index) => (
                    <button
                      key={index}
                      className={`${index === 0 ? styles.buttonStyle1 : styles.buttonStyle2} ${styles.smallBtn}`}
                      onClick={handleButtonClick}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              );
            }
            // Default: normal buttons
            return data.buttons.map((button, index) => {
              const btnClass = `${index === 0 ? styles.buttonStyle1 : styles.buttonStyle2}`;
              return (
                <button
                  key={index}
                  className={btnClass}
                  onClick={handleButtonClick}
                >
                  {button.text}
                </button>
              );
            });
          })()}
        </div>
      </div>

      <div className={styles.rightSectionItDs}>
        <h3>{data.form.title}</h3>

        {statusMessage.text && (
          <div
            className={`${styles.statusMessage} ${styles[statusMessage.type]}`}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {(() => {
            return data.form?.inputs?.map((input, index) => {
              if (input.countryCode) {
                const selectedCountry = countryCodes.find(
                  (country) => country.code === formData.countryCode
                );
                const maxLength = selectedCountry?.maxLength || 10;
                return (
                  <div key={index} className={styles.phoneInputItDs}>
                    <div className={styles.countryCodeWrapper}>
                      <select
                        id="countryCode"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className={styles.selectCountryCode}
                        disabled={isSubmitting}
                      >
                        {countryCodes.map(({ code, country }) => (
                          <option key={code} value={code}>
                            {code} ({country})
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      placeholder="Enter phone number"
                      value={formData.contact}
                      onChange={handleChange}
                      maxLength={maxLength}
                      required
                      disabled={isSubmitting}
                      className={styles.input}
                    />
                  </div>
                );
              } else {

                if (input.name === "location") {
                  return (
                    <div
                      key={index}
                      className={styles.locationContainer}
                      style={{ position: "relative" }} // 🔥 REQUIRED
                    >
                      <div className={styles.inputWrapper}>
                        <input
                          type="text"
                          name="location"
                          value={location}
                          onChange={handleLocationChange}
                          onFocus={() => {
                            if (filteredSuggestions.length > 0) setShowSuggestions(true);
                          }}
                          className={styles.input}
                          placeholder="Enter your location"
                        />
                      </div>

                      {showSuggestions && filteredSuggestions.length > 0 && (
                        <div
                          className={styles.suggestionsDropdown}
                          onPointerDown={(e) => e.stopPropagation()}
                          style={{
                            position: "absolute",
                            right: "105%",
                            bottom: "0",                 // ✅ FIX (opens upward)
                            maxHeight: "320px",         // ✅ prevents overflow
                            overflowY: "auto",          // ✅ scroll instead of cut
                            width: "250px",
                            background: "#fff",
                            zIndex: 999,
                            borderRadius: "12px",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                            animation: "slideUpFade 0.25s ease"
                          }}
                        >
                          {filteredSuggestions.slice(0, 6).map((suggestion, i) => (
                            <div
                              key={i}
                              className={styles.dropdownItem}
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (input.type === "course") {
                  return (
                    <div
                      key={index}
                      className={styles.locationContainer}
                      style={{ position: "relative" }} // 🔥 REQUIRED
                    >

                      <div
                        className={styles.input}
                        onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#fff",
                          cursor: "pointer"
                        }}
                      >
                        <span style={{ color: formData.course ? "#000" : "#888" }}>
                          {formData.course || "Select Course"}
                        </span>

                        <span>{showCourseDropdown ? "▲" : "▼"}</span>
                      </div>

                      {showCourseDropdown && (
                        <div
                          className={styles.suggestionsDropdown}
                          onPointerDown={(e) => e.stopPropagation()}
                          style={{
                            position: "absolute",
                            right: "105%",
                            bottom: "0",                // ✅ FIX
                            maxHeight: "320px",
                            overflow: "visible",
                            width: "260px",
                            background: "#fff",
                            zIndex: 3000,
                            borderRadius: "12px",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                            animation: "slideUpFade 0.25s ease"
                          }}
                        >
                          {/* CATEGORY LIST */}
                          {!selectedCategory &&
                            Object.keys(courseOptions).map((category) => (
                              <div
                                key={category}
                                className={styles.dropdownCategory}
                                onPointerDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setSelectedCategory(category);
                                }}
                              >
                                {category}
                                <span className={styles.categoryArrow}>→</span>
                              </div>
                            ))
                          }

                          {/* COURSE LIST */}
                          {selectedCategory && (
                            <>
                              <div
                                className={styles.dropdownItem}
                                onPointerDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setSelectedCategory(null);
                                }}
                              >
                                ← Back
                              </div>

                              {courseOptions[selectedCategory].map((course) => (
                                <div
                                  key={course}
                                  className={styles.dropdownItem}
                                  onPointerDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setFormData((prev) => ({
                                      ...prev,
                                      course: course, // 🔥 ONLY selected value
                                    }));

                                    setShowCourseDropdown(false);
                                    setSelectedCategory(null);
                                  }}
                                >
                                  {course}
                                </div>
                              ))}

                              {/* 🔥 ADD OTHER OPTION */}
                              <div
                                className={styles.dropdownItem}
                                onPointerDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setFormData((prev) => ({
                                    ...prev,
                                    course: "Other",
                                  }));

                                  setShowCourseDropdown(false);
                                  setSelectedCategory(null);
                                }}
                              >
                                Other
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }


                // 🔥 ALL OTHER INPUTS (UNCHANGED)
                return (
                  <input
                    key={index}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    className={styles.input}
                    value={formData[input.name] || ""}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                );
              }
            });
          })()}

          <button
            type="submit"
            className={`${styles.submitButtonItDs} ${isSubmitting ? styles.loading : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.buttonText}>Submitting</span>
                <span className={styles.buttonLoader}></span>
              </>
            ) : (
              data.form.submitText
            )}
          </button>
        </form>
      </div>

      {showForm && <Btnform onClose={handleCloseForm} />}
    </div>
  );
};

export default DSHeader;
