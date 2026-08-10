import SuccessStoriesCarousel from "./SuccessStoriesCarousel";

const STORIES = [
  {
    id: 1,
    name: "Preetesh Pardeshi",
    role: "SAP ABAP",
    image: "https://res.cloudinary.com/bropujss/image/upload/v1784182429/pic1pp_wtvqhw_gv9ejf.webp",
    lpa: "24 LPA",
    company: "AG Consultancy",
    companyLogo: "https://res.cloudinary.com/bropujss/image/upload/v1784183508/agconsultancy_rvgaxq_qpcprn.avif",
    rating: 5,
    placedIn: "Placed in 3 Months",
    testimonial:
      "The expert guidance and practical training prepared me exceptionally well. Every interview became easier because of the confidence I gained.",
    journey: [
      { title: "Training", desc: "Completed SAP ABAP training with industry experts" },
      { title: "Projects", desc: "Built real-time projects and gained hands-on experience" },
      { title: "Interview", desc: "Cleared technical rounds and HR interviews" },
      { title: "Placed", desc: "Successfully placed as SAP ABAP Consultant at AG Consultancy" },
    ],
  },
  {
    id: 2,
    name: "Nikhilesh Landge",
    role: "SAP SD",
    image: "https://res.cloudinary.com/bropujss/image/upload/v1784182533/pic2pp_ugfo1w_dtaotf.webp",
    lpa: "12 LPA",
    company: "CLTech",
    companyLogo: "https://res.cloudinary.com/bropujss/image/upload/v1784183410/cltech_xqeelh_kszm7t.avif",
    rating: 5,
    placedIn: "Placed in 4 Months",
    testimonial:
      "The mentors constantly supported my learning journey. Their practical approach and placement guidance helped me secure my dream opportunity successfully.",
    journey: [
      { title: "Training", desc: "Completed SAP SD training with industry experts" },
      { title: "Projects", desc: "Worked on real-time projects and gained hands-on experience" },
      { title: "Interview", desc: "Cleared technical rounds and HR interviews" },
      { title: "Placed", desc: "Successfully placed as SAP SD Consultant at CLTech" },
    ],
  },
  {
    id: 3,
    name: "Shubham Desale",
    role: "SAP MM",
    image: "https://res.cloudinary.com/bropujss/image/upload/v1784182641/pic3pp_xgown1_xcqm3q.webp",
    lpa: "9 LPA",
    company: "Deloitte",
    companyLogo: "https://res.cloudinary.com/bropujss/image/upload/v1784184610/deloitte_eslhm1_e2lsin.webp",
    rating: 5,
    placedIn: "Placed in 3 Months",
    testimonial:
      "Every learning session focused on practical implementation and interview readiness. That experience played a huge role in achieving my placement.",
    journey: [
      { title: "Training", desc: "Completed SAP MM training with industry experts" },
      { title: "Projects", desc: "Worked on real-time projects and gained hands-on experience" },
      { title: "Interview", desc: "Cleared technical rounds and HR interviews" },
      { title: "Placed", desc: "Successfully placed as SAP MM Consultant at Deloitte" },
    ],
  },
  {
    id: 4,
    name: "Nitesh Kumar",
    role: "SAP FICO",
    image: "https://res.cloudinary.com/bropujss/image/upload/v1784182727/pic4pp_v0iqs4_nt8vb1.webp",
    lpa: "15 LPA",
    company: "Market Legos",
    companyLogo: "https://res.cloudinary.com/bropujss/image/upload/v1784183045/marketlegos_asz8ud_e7zifc.avif",
    rating: 5,
    placedIn: "Placed in 3 Months",
    testimonial:
      "Excellent mentors, structured training, and continuous interview preparation made the entire placement process smooth. I achieved my career goal confidently.",
    journey: [
      { title: "Training", desc: "Completed SAP FICO training with industry experts" },
      { title: "Projects", desc: "Worked on real-time projects and gained hands-on experience" },
      { title: "Interview", desc: "Cleared technical rounds and HR interviews" },
      { title: "Placed", desc: "Successfully placed as SAP FICO Consultant at Market Legos" },
    ],
  },
  {
    id: 5,
    name: "Seshu Tamma",
    role: "SAP Security",
    image: "https://res.cloudinary.com/bropujss/image/upload/v1784182811/pic5pp_vllliw_h7zsmn.webp",
    lpa: "11 LPA",
    company: "Deloitte",
    companyLogo: "https://res.cloudinary.com/bropujss/image/upload/v1784184610/deloitte_eslhm1_e2lsin.webp",
    rating: 5,
    placedIn: "Placed in 4 Months",
    testimonial:
      "Real project Scenario exposure and dedicated mentoring helped strengthen my technical skills. I felt completely prepared while attending every interview round confidently.",
    journey: [
      { title: "Training", desc: "Completed SAP Security training with industry experts" },
      { title: "Projects", desc: "Worked on real-time projects and gained hands-on experience" },
      { title: "Interview", desc: "Cleared technical rounds and HR interviews" },
      { title: "Placed", desc: "Successfully placed as SAP Security Consultant at Deloitte" },
    ],
  },
  {
    id: 6,
    name: "Sai Srujan",
    role: "SAP FICO",
    image: "https://res.cloudinary.com/bropujss/image/upload/v1784203985/review_image_5_jjm78u_h8txiq.webp",
    lpa: "18 LPA",
    company: "Deloitte",
    companyLogo: "https://res.cloudinary.com/bropujss/image/upload/v1784184610/deloitte_eslhm1_e2lsin.webp",
    rating: 5,
    placedIn: "Placed in 3 Months",
    testimonial:
      "From classroom learning to mock interviews, every stage improved my confidence. The placement support exceeded my expectations throughout the complete journey.",
    journey: [
      { title: "Training", desc: "Completed SAP FICO training with industry experts" },
      { title: "Projects", desc: "Worked on real-time projects and gained hands-on experience" },
      { title: "Interview", desc: "Cleared technical rounds and HR interviews" },
      { title: "Placed", desc: "Successfully placed as SAP FICO Consultant at Deloitte" },
    ],
  },
];

export default function SuccessStories({ stories = STORIES }) {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 text-white">
      <div className="relative mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="inline-flex items-center gap-2 text-3xl font-extrabold sm:gap-3 sm:text-4xl lg:text-5xl">
            <span className="text-purple-400" aria-hidden>
              ✦
            </span>
            <span>
              Success{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Stories
              </span>
            </span>
            <span className="text-blue-400" aria-hidden>
              ✦
            </span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 sm:w-24" />
          <p className="mx-auto mt-4 max-w-md px-4 text-sm text-white/60 sm:text-base">
            Our alumni are making remarkable strides in top organizations
          </p>
        </div>

        {/* Interactive carousel — client-side */}
        <SuccessStoriesCarousel stories={stories} />
      </div>
    </section>
  );
}
