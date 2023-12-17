const About = () => {
  return (
    <div
      className="
          flex flex-col justify-start items-center gap-y-4
          max-w-xl
          leading-relaxed
          "
    >
      <h2
        className="
          text-xl font-bold
          "
      >
        Let AFRY <img src="/afry.svg" alt="afry logo" className="w-5 inline -translate-y-0.5" />
        &nbsp;powered by <b className="text-tm-red">Trend Micro</b> secure your company's&nbsp;
        priceless <b className="text-azure-blue">Azure cloud environment</b> from malicious third
        party files from with a robust, innovative and quick solution.
      </h2>
      <p>
        The <b>Secure Documents Pipeline (SDP)</b> is a robust and innovative solution designed to
        safeguard your company's Azure cloud environment from malicious files and malware. This
        state-of-the-art security system ensures comprehensive protection by implementing a
        dual-scan approach on every file uploaded to the endpoint.
      </p>
      <p>
        <b>Firstly</b>, the SDP employs the&nbsp;
        <b className="text-tm-red">File Storage Security</b> scanner that quickly scan the file for
        patterns that efficiently identifies known threats, for a fast and reliable first line of
        defense.
      </p>
      <p>
        <b>Secondly</b>, for complete security assurance, the SDP features the&nbsp;
        <b className="text-tm-red">Deep Discovery Analyzer</b>. This advanced component runs each
        file in a secure sandbox environment, meticulously analyzing its behavior and
        characteristics to detect and neutralize even the most sophisticated and unseen threats.
      </p>
      <p>
        With the <b>Secure Documents Pipeline</b>, you can trust that your company's integrity is
        shielded with the most thorough and cutting-edge security measures, keeping your data safe
        and your operations uninterrupted.
      </p>
    </div>
  );
};

export default About;
