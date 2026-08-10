"use client";

import { useState, useEffect, useRef } from "react";
import styles from "@/styles/Stickyform.module.css";
import { usePathname } from "next/navigation";

// Define countryCodes array with phone number length requirements
const countryCodes = [
  { code: "+1", country: "US", minLength: 10, maxLength: 10 },
  { code: "+91", country: "IN", minLength: 10, maxLength: 10 },
  { code: "+44", country: "GB", minLength: 10, maxLength: 11 },
  { code: "+61", country: "AU", minLength: 9, maxLength: 9 },
  { code: "+81", country: "JP", minLength: 10, maxLength: 11 },
  { code: "+49", country: "DE", minLength: 10, maxLength: 11 },
  { code: "+33", country: "FR", minLength: 9, maxLength: 9 },
  { code: "+86", country: "CN", minLength: 11, maxLength: 11 },
  { code: "+7", country: "RU", minLength: 10, maxLength: 10 },
  { code: "+39", country: "IT", minLength: 9, maxLength: 10 },
  { code: "+55", country: "BR", minLength: 10, maxLength: 11 },
  { code: "+34", country: "ES", minLength: 9, maxLength: 9 },
  { code: "+27", country: "ZA", minLength: 9, maxLength: 9 },
  { code: "+971", country: "AE", minLength: 9, maxLength: 9 },
  { code: "+62", country: "ID", minLength: 10, maxLength: 12 },
  { code: "+90", country: "TR", minLength: 10, maxLength: 10 },
  { code: "+82", country: "KR", minLength: 9, maxLength: 10 },
  { code: "+60", country: "MY", minLength: 9, maxLength: 10 },
  { code: "+31", country: "NL", minLength: 9, maxLength: 9 },
  { code: "+52", country: "MX", minLength: 10, maxLength: 10 },
];

const hiddenPaths = ['/dashboard', '/superadmin', '/AdminLogin'];
const getApiBaseUrl = () => (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const OTHER_LOCATION = "Other";
const EXTRA_LOCATIONS = [
  "Pune, Maharashtra",
  "Mumbai, Maharashtra",
  "Thane, Maharashtra",
  "Navi Mumbai, Maharashtra",
  "Pimpri-Chinchwad, Maharashtra",
  "Hinjewadi, Pune",
  "Wakad, Pune",
  "Baner, Pune",
  "Kharadi, Pune",
  "Viman Nagar, Pune",
  "Hadapsar, Pune",
  "Kothrud, Pune",
  "Andheri, Mumbai",
  "Bandra, Mumbai",
  "Powai, Mumbai",
  "Dadar, Mumbai",
  "Borivali, Mumbai",
  "Bangalore, Karnataka",
  "Whitefield, Bengaluru",
  "Electronic City, Bengaluru",
  "Hyderabad, Telangana",
  "HITEC City, Hyderabad",
  "Gachibowli, Hyderabad",
  "Chennai, Tamil Nadu",
  "Delhi",
  "New Delhi",
  "Gurugram, Haryana",
  "Noida, Uttar Pradesh",
  "Ahmedabad, Gujarat",
  "Surat, Gujarat",
  "Vadodara, Gujarat",
  "Indore, Madhya Pradesh",
  "Bhopal, Madhya Pradesh",
  "Jaipur, Rajasthan",
  "Kolkata, West Bengal",
  "Nagpur, Maharashtra",
  "Nashik, Maharashtra",
  "Raipur, Chhattisgarh",
  "Chandigarh",
  "Kochi, Kerala",
  "Coimbatore, Tamil Nadu",
  "Remote",
  "Work from Home",
  "Hybrid",
  "Multiple Locations",
  "Willing to Relocate",
  OTHER_LOCATION,
];

const buildLocationOptions = (cities) => {
  const indianCities = cities.filter(
    (city) => city.country === "IN" || city.country === "India"
  );
  const majorInternationalCities = cities.filter(
    (city) =>
      ["US", "UK", "CA", "AU", "DE", "FR", "SG", "AE", "JP"].includes(
        city.country
      ) && city.population > 500000
  );

  const allLocations = [
    ...indianCities.map((city) =>
      city.subcountry ? `${city.name}, ${city.subcountry}` : city.name
    ),
    ...majorInternationalCities.map((city) => `${city.name}, ${city.country}`),
    ...EXTRA_LOCATIONS,
  ];

  return [...new Set(allLocations)]
    .filter((location) => location && location.trim())
    .sort((a, b) => {
      if (a === OTHER_LOCATION) return 1;
      if (b === OTHER_LOCATION) return -1;
      return a.localeCompare(b);
    });
};

const getLocationMatches = (value, suggestions) => {
  const search = value.trim().toLowerCase();

  if (!search) {
    return [
      ...EXTRA_LOCATIONS.filter((location) => location !== OTHER_LOCATION).slice(0, 9),
      OTHER_LOCATION,
    ];
  }

  const filtered = suggestions.filter((suggestion) => {
    if (suggestion === OTHER_LOCATION) return false;
    const suggestionLower = suggestion.toLowerCase();
    return (
      suggestionLower.includes(search) ||
      suggestionLower.split(",")[0].trim().startsWith(search)
    );
  });

  return [...filtered.slice(0, 9), OTHER_LOCATION];
};

const SCROLL_SHOW_THRESHOLD = 500;

function Stickyform() {
  // --- ALL HOOKS MUST BE DECLARED AT THE TOP LEVEL ---
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    course: "",
    email: "",
    location: "",
    countryCode: "+91",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true); // State to control visibility based on scroll/path
  const [hasScrolledPastThreshold, setHasScrolledPastThreshold] = useState(false); // Only show after 800px of scroll
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const footerRef = useRef(null);
  const locationInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const pathname = usePathname(); // usePathname is a hook

  // Check if current path is an admin path (derived from pathname)
  const isAdminPath = pathname && hiddenPaths.some(path => pathname.startsWith(path));


  // --- useEffects (must be after useState, useRef, etc.) ---

  // Effect to find the footer element (runs once on mount)
  useEffect(() => {
    const footerElement = document.querySelector("footer");
    if (footerElement) {
      footerRef.current = footerElement;
    }
  }, []); // Empty dependency array means it runs once on mount

  // Effect to reveal the form only once the page has been scrolled past
  // SCROLL_SHOW_THRESHOLD (800px). Before that, it stays hidden regardless
  // of the other visibility rules.
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setHasScrolledPastThreshold(window.scrollY > SCROLL_SHOW_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll(); // check initial scroll position on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFormVisible || isMobileView || locationSuggestions.length > 0) {
      return;
    }

    let isMounted = true;

    const loadLocationData = async () => {
      try {
        setIsLoadingCities(true);
        const citiesModule = await import("@/data/india-cities.json");
        const cities = citiesModule.default || citiesModule;

        if (!isMounted) return;

        setLocationSuggestions(buildLocationOptions(cities));
      } catch (error) {
        console.error("Error loading location suggestions:", error);
        setLocationSuggestions([...new Set(EXTRA_LOCATIONS)]);
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
  }, [isFormVisible, isMobileView, locationSuggestions.length]);

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect to handle resize and footer visibility using IntersectionObserver
  useEffect(() => {
    const shouldHideBasedOnPath = hiddenPaths.some(path => pathname?.startsWith(path));

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);

      if (isMobile || shouldHideBasedOnPath) {
        setIsFormVisible(false);
      }
    };

    const observerCallback = ([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) {
        setIsFormVisible(false);
      } else {
        setIsFormVisible(!shouldHideBasedOnPath);
      }
    };

    const observer =
      footerRef.current && !shouldHideBasedOnPath
        ? new IntersectionObserver(observerCallback, { root: null, threshold: 0 })
        : null;

    if (observer && footerRef.current) {
      observer.observe(footerRef.current);
    }

    const initialIsMobile = window.innerWidth <= 768;
    setIsMobileView(initialIsMobile);
    if (initialIsMobile || shouldHideBasedOnPath) {
      setIsFormVisible(false);
    } else if (!observer) {
      setIsFormVisible(true);
    }

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
    };
  }, [pathname]);


  // --- Conditional Return (MUST BE AFTER ALL HOOKS) ---
  // If on admin page, don't render the component's JSX at all
  if (isAdminPath) {
    return null;
  }

  // --- Rest of the component logic and render ---

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      // Allow only digits for phone numbers
      const digitsOnly = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: digitsOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      // Use undefined or null to clear the specific error
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, location: value });
    setIsLocationSelected(false);

    if (errors.location) {
      setErrors({ ...errors, location: undefined });
    }

    const matches = getLocationMatches(value, locationSuggestions);
    setFilteredSuggestions(matches);
    setShowSuggestions(matches.length > 0);
    setActiveSuggestion(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData({ ...formData, location: suggestion });
    setIsLocationSelected(true);
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    setActiveSuggestion(-1);
    locationInputRef.current?.focus();
  };

  const openLocationDropdown = () => {
    const matches = getLocationMatches(formData.location, locationSuggestions);
    setFilteredSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  };

  const handleLocationKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (activeSuggestion >= 0) {
          e.preventDefault();
          handleSuggestionClick(filteredSuggestions[activeSuggestion]);
        }
        break;
      case "Escape":
      case "Tab":
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
    }
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, contact, countryCode, course, location } = formData;

    // Basic trim and presence checks
    if (!name.trim()) newErrors.name = "Name is required";
     else if (name.trim().length < 2) newErrors.name = "Name must be at least 2 characters"; // Added min length validation


    if (!email.trim()) newErrors.email = "Email is required";
    if (!course) newErrors.course = "Please select a course";
    const isValidLocation =
      locationSuggestions.includes(location) || location === OTHER_LOCATION;
    if (!location.trim()) newErrors.location = "Location is required";
    else if (!isLocationSelected || !isValidLocation)
      newErrors.location = "Please select a location from the dropdown";
    else if (location.length > 100) newErrors.location = "Location seems too long";

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailPattern.test(email.trim())) // Check format only if email is not empty
      newErrors.email = "Please enter a valid email address";

    // Contact number validation based on country code
    const selectedCountry = countryCodes.find((c) => c.code === countryCode);
    if (selectedCountry) {
      const { minLength, maxLength } = selectedCountry;
      const contactDigits = contact.replace(/\D/g, ""); // Ensure we validate digits only

      if (!contactDigits) { // Check if contact is empty after removing non-digits
         newErrors.contact = "Contact number is required";
      } else if (contactDigits.length < minLength || contactDigits.length > maxLength) {
        newErrors.contact = `Enter a valid ${minLength === maxLength ? minLength : `${minLength}-${maxLength}`}-digit number for ${selectedCountry.country}`;
      } else if (!/^\d+$/.test(contactDigits)) { // Double-check it only contains digits
         newErrors.contact = "Phone number should contain only digits";
      }
    } else {
      newErrors.contact = "Please select a valid country code"; // Should not happen with the select dropdown
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors before validating
    setErrors({});

    if (!validate()) {
      console.warn("Validation failed:", errors); // Log errors for debugging
      // Errors state is already set by validate()
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true); // Show loading state

    const submissionData = {
      name: formData.name.trim(),
      contact: formData.contact, // contact is already digits-only
      countryCode: formData.countryCode,
      email: formData.email.trim(),
      coursename: formData.course,
      location: formData.location.trim(),
    };

    try {
      // --- Send data to backend API ---
      const apiUrl = getApiBaseUrl();
      if (!apiUrl) {
        console.error("API URL (NEXT_PUBLIC_API_URL) is not set.");
        alert("Configuration error. Cannot submit form.");
        setIsSubmitting(false);
        return;
      }

      const submitEndpoint = `${apiUrl}/api/submit`;

      const response = await fetch(submitEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(
          responseData?.message || `Submission failed with status ${response.status}.`
        );
        error.status = response.status;
        error.responseData = responseData;
        throw error;
      }

      // --- Handle.Success (Status 2xx) ---
      console.info("Form submitted successfully:", responseData);
      alert(responseData.message || "Thank You! Form successfully submitted."); // Use alert for success

      setShowPopup(true);
      // Hide popup after 3 seconds
      const popupTimer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);


      // Reset form fields on successful submission
      setFormData({
        name: "",
        contact: "",
        course: "",
        email: "",
        location: "",
        countryCode: "+91", // Reset to default
      });
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setActiveSuggestion(-1);
      setIsLocationSelected(false);
      // Optionally reset form visibility after submission if desired
      // setIsFormVisible(false);

      return () => clearTimeout(popupTimer); // Cleanup timer


    } catch (error) {
      console.error("Submission error:", error); // Detailed error log

      let errorMessage =
        "An error occurred while submitting. Please try again."; // Default message

      if (error?.responseData?.message) {
        errorMessage = error.responseData.message;
      } else if (error?.status) {
        errorMessage = `Submission failed due to a server issue (Status: ${error.status}). Please try again later.`;
      } else {
        errorMessage = "Cannot reach the server. Please check your connection.";
      }

      alert(errorMessage); // Show error message using alert

    } finally {
      setIsSubmitting(false);
    }
  };

  // Find the selected country to display length requirements in placeholder
  const selectedCountry = countryCodes.find(
    (country) => country.code === formData.countryCode
  );
  const contactPlaceholder = selectedCountry
    ? `Enter ${
        selectedCountry.minLength === selectedCountry.maxLength
          ? selectedCountry.minLength
          : `${selectedCountry.minLength}-${selectedCountry.maxLength}`
      } digits`
    : "Enter phone number";

  // --- FINAL RENDER LOGIC ---
  // Component returns null if it's an admin path (check happens after all hooks)
  // Otherwise, it renders the form if visible based on scroll/resize state,
  // and only once the page has been scrolled past SCROLL_SHOW_THRESHOLD.
  return (
    <>
      {/* Only render the form container if not mobile, form is visible,
          AND the user has scrolled past the threshold */}
      {!isMobileView && isFormVisible && hasScrolledPastThreshold && (
        <div className={`${styles.stickyformContainer} transition-all duration-300 ease-in-out`}>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={styles.contactFormS}
            noValidate // Disable default browser validation
          >
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="E.g., Ram"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? styles.inputError : ""} // Apply error class
                  required // HTML5 validation hint (JS validation handles actual logic)
                  maxLength="50"
                  aria-required="true" // ARIA attributes for accessibility
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.name && ( // Display error message
                  <span
                    id="name-error"
                    className={styles.errorText} // Use errorText class
                    role="alert"
                  >
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email" // Use type="email" for better mobile keyboards
                  id="email"
                  name="email"
                  placeholder="E.g., ram@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles.inputError : ""}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <span
                    id="email-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact" className={styles.formLabel}>
                  Contact Number <span className={styles.required}>*</span>
                </label>
                <div className={styles.contactField}>
                  <select
                    id="countryCode"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    aria-label="Select Country Code"
                     disabled={isSubmitting}
                  >
                    {countryCodes.map(({ code, country }) => (
                      <option key={code} value={code}>
                        ({code}) {country}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel" // Use type="tel" for mobile keyboard optimization
                    inputMode="numeric" // Hint for numeric keyboard
                    id="contact"
                    name="contact"
                    placeholder={contactPlaceholder}
                    value={formData.contact}
                    onChange={handleChange}
                    className={errors.contact ? styles.inputError : ""}
                    maxLength={selectedCountry?.maxLength || 15} // Apply max length based on selected country
                    required
                    aria-required="true"
                    aria-invalid={!!errors.contact}
                    aria-describedby={
                      errors.contact ? "contact-error" : undefined
                    }
                    disabled={isSubmitting}
                  />
                </div>
                {errors.contact && (
                  <span
                    id="contact-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.contact}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="course" className={styles.formLabel}>
                  Course <span className={styles.required}>*</span>
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={errors.course ? styles.inputError : ""}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.course}
                  aria-describedby={errors.course ? "course-error" : undefined}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    Select a course
                  </option>
                  <option value="SAP Course">SAP Course</option>
                  <option value="IT Course">IT Course</option>
                  <option value="Data Visualization">Data Visualization</option>
                  <option value="HR Course">HR Course</option>
                  {/* Add more course options as needed */}
                </select>
                {errors.course && (
                  <span
                    id="course-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.course}
                  </span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="location" className={styles.formLabel}>
                  Location <span className={styles.required}>*</span>
                </label>
                <div className={styles.locationField}>
                  <input
                    ref={locationInputRef}
                    type="text"
                    id="location"
                    name="location"
                    placeholder={isLoadingCities ? "Loading..." : "E.g., Pune"}
                    value={formData.location}
                    onChange={handleLocationChange}
                    onKeyDown={handleLocationKeyDown}
                    onFocus={openLocationDropdown}
                    className={`${errors.location ? styles.inputError : ""} ${
                      !isLocationSelected && formData.location ? styles.inputWarning : ""
                    }`}
                    required
                    maxLength="100"
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={!!errors.location}
                    aria-describedby={errors.location ? "location-error" : undefined}
                    disabled={isSubmitting || isLoadingCities}
                  />
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div
                      ref={suggestionsRef}
                      className={styles.suggestionsDropdown}
                      role="listbox"
                    >
                      {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                        <button
                          type="button"
                          key={`${suggestion}-${index}`}
                          className={`${styles.suggestionItem} ${
                            index === activeSuggestion ? styles.suggestionActive : ""
                          }`}
                          onClick={() => handleSuggestionClick(suggestion)}
                          onMouseEnter={() => setActiveSuggestion(index)}
                          role="option"
                          aria-selected={index === activeSuggestion}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {!isLocationSelected && formData.location && !errors.location && (
                  <span className={styles.helperText}>
                    Select a location from the dropdown.
                  </span>
                )}
                {errors.location && (
                  <span
                    id="location-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.location}
                  </span>
                )}
              </div>
              {/* Submit Button - Make it a formGroup for consistent layout */}
              <div className={styles.formGroup} style={{ alignSelf: 'flex-end' }}> {/* Align button to the bottom */}
                <button
                  className={`${styles.button} ${styles.primaryButton}`} // Use your button styles
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" /> Loading...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Success Popup */}
      {showPopup && (
        <div className={styles.popup}>Thank you for submitting!</div>
      )}
    </>
  );
}

export default Stickyform;