import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* Current Internship */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Analytics with AI Intern</h4>
                <h5>BharatCares × AICTE × IBM SkillsBuild</h5>
              </div>
              <h3>2026</h3>
            </div>

            <p>
              Currently participating in a 6-week industry-focused internship
              covering data analytics, data preprocessing, exploratory data
              analysis, predictive analytics, machine learning, visualization,
              and AI-driven insights through hands-on project work.
            </p>
          </div>

          {/* AI Prompt Engineering */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Prompt Engineering Intern</h4>
                <h5>InAmigos Foundation</h5>
              </div>
              <h3>AUG 2026</h3>
            </div>

            <p>
              Successfully completed an AI Prompt Engineering internship,
              developing practical skills in prompt design and working with
              generative AI concepts for creating more effective AI-driven
              solutions.
            </p>
          </div>

          {/* Generative AI */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Virtual Intern — Generative AI</h4>
                <h5>IBMMooc / IBM Developer Skills Network</h5>
              </div>
              <h3>FEB–MAR 2026</h3>
            </div>

            <p>
              Successfully completed a virtual internship focused on
              Generative AI, gaining hands-on exposure to AI concepts and
              developing an understanding of how generative AI can be applied
              to real-world problems.
            </p>
          </div>

          {/* Skills */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Science & AI</h4>
                <h5>Projects & Continuous Learning</h5>
              </div>
              <h3>NOW</h3>
            </div>

            <p>
              Building practical AI and data science projects across machine
              learning, predictive analytics, data visualization, Generative
              AI, and intelligent automation—turning data and AI concepts into
              useful, production-oriented solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;