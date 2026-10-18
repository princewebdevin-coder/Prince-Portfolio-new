import "./styles/Certificates.css";

const certificates: {
  title: string;
  issuer: string;
  description: string;
  file: string;
}[] = [
  {
    title: "Applied Data Science with Python",
    issuer: "IBM Skills Network · Cognitive Class",
    description:
      "Completed the Applied Data Science with Python learning path.",
    file: "/certificates/Cognitive.pdf",
  },
  {
    title: "Machine Learning Basics",
    issuer: "IBM Skills Network · Cognitive Class",
    description:
      "Completed the Machine Learning Basics learning path.",
    file: "/certificates/Cognitive%20Class.pdf",
  },
];

const Certificates = () => {
  return (
    <section className="certificates-section section-container" id="certificates">
      <div className="certificates-intro">
        <span>PROOF OF PRACTICE</span>
        <h2>Certificates</h2>
      </div>
      {certificates.length > 0 ? (
        <div className="certificates-grid">
          {certificates.map((certificate) => (
            <a
              className="certificate-card"
              href={certificate.file}
              target="_blank"
              rel="noreferrer"
              key={certificate.title}
            >
              <span>{certificate.issuer}</span>
              <h3>{certificate.title}</h3>
              <p>{certificate.description}</p>
              <small>VIEW CERTIFICATE</small>
            </a>
          ))}
        </div>
      ) : (
        <p className="certificates-empty">
          Certificates will appear here soon.
        </p>
      )}
    </section>
  );
};

export default Certificates;