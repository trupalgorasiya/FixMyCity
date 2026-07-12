import '../styles/FAQs.css'

function FAQs() {

  const faqs = [
    {
      question: "How do I submit a complaint?",
      answer:
        "Create an account, log in, select the complaint category, upload photos if available, and submit your complaint."
    },
    {
      question: "Can I track my complaint?",
      answer:
        "Yes. Every complaint receives a unique complaint ID that allows you to track its status in real time."
    },
    {
      question: "Who resolves the complaints?",
      answer:
        "Complaints are assigned to the appropriate municipal department and monitored until completion."
    },
    {
      question: "Is registration required?",
      answer:
        "Yes. Registration helps verify users and keeps your complaint history secure."
    },
    {
      question: "Can I upload images?",
      answer:
        "Yes. You can attach images to help authorities better understand the issue."
    }
  ];

  return (
    <div className="faq-page">

      <h1>Frequently Asked Questions</h1>

      <div className="faq-container">

        {faqs.map((item, index) => (

          <div className="faq-card" key={index}>

            <h3>{item.question}</h3>

            <p>{item.answer}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default FAQs;